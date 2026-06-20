require('dotenv').config();

const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { Resend } = require('resend');
const fs = require('fs/promises');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const ADMISSIONS_EMAIL = process.env.SCHOOL_ADMISSIONS_EMAIL || 'imsujal16@gmail.com';
const DATA_DIR = process.env.VERCEL ? '/tmp' : path.join(__dirname, 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'admission-enquiries.jsonl');

app.set('trust proxy', 1);
app.disable('x-powered-by');
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: '*' })); // Allow cross-origin requests from Vercel frontend
app.use(express.json({ limit: '25kb' }));
app.use(express.urlencoded({ extended: false, limit: '25kb' }));

app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 25,
  standardHeaders: 'draft-7',
  legacyHeaders: false
}));

function clean(value) {
  return String(value || '').trim().replace(/\s+/g, ' ');
}

function cleanMultiline(value) {
  return String(value || '').trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeText(value) {
  return String(value || '');
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateAdmissionEnquiry(body) {
  const enquiry = {
    firstName: clean(body.firstName),
    lastName: clean(body.lastName),
    dateOfBirth: clean(body.dateOfBirth),
    gender: clean(body.gender),
    applyingForGrade: clean(body.applyingForGrade),
    previousSchool: clean(body.previousSchool),
    parentGuardianName: clean(body.parentGuardianName),
    relation: clean(body.relation),
    phoneNumber: clean(body.phoneNumber),
    emailAddress: clean(body.emailAddress).toLowerCase(),
    residentialAddress: cleanMultiline(body.residentialAddress),
    messageQuery: cleanMultiline(body.messageQuery)
  };

  const requiredFields = [
    ['firstName', 'First Name'],
    ['lastName', 'Last Name'],
    ['dateOfBirth', 'Date of Birth'],
    ['gender', 'Gender'],
    ['applyingForGrade', 'Applying for Grade'],
    ['parentGuardianName', 'Parent/Guardian Name'],
    ['relation', 'Relation'],
    ['phoneNumber', 'Phone Number'],
    ['emailAddress', 'Email Address'],
    ['residentialAddress', 'Residential Address']
  ];

  const errors = [];
  for (const [key, label] of requiredFields) {
    if (!enquiry[key]) errors.push(`${label} is required.`);
  }

  if (enquiry.emailAddress && !isEmail(enquiry.emailAddress)) {
    errors.push('Email Address must be valid.');
  }

  const digitsOnly = enquiry.phoneNumber.replace(/\D/g, '');
  if (enquiry.phoneNumber && digitsOnly.length < 10) {
    errors.push('Phone Number must contain at least 10 digits.');
  }

  if (enquiry.dateOfBirth) {
    const dob = new Date(`${enquiry.dateOfBirth}T00:00:00.000Z`);
    if (Number.isNaN(dob.getTime())) {
      errors.push('Date of Birth must be valid.');
    } else if (dob > new Date()) {
      errors.push('Date of Birth cannot be in the future.');
    }
  }

  enquiry.phoneNumber = digitsOnly || enquiry.phoneNumber;
  enquiry.submissionTimestamp = new Date().toISOString();

  return { enquiry, errors };
}

async function getTransporter() {
  const required = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    console.warn(`Missing SMTP environment variable(s): ${missing.join(', ')}. Using Ethereal test account...`);
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: (process.env.SMTP_PASS || '').replace(/\s+/g, '')
    },
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 10000
  });
}

// Resend fallback for cloud platforms that block SMTP
async function sendViaResend({ from, to, replyTo, subject, text, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY not set — cannot fallback to Resend.');

  const resend = new Resend(apiKey);
  const fromAddr = process.env.RESEND_FROM || 'Nirmaan Public School <onboarding@resend.dev>';

  const { data, error } = await resend.emails.send({
    from: fromAddr,
    to: Array.isArray(to) ? to : [to],
    replyTo,
    subject,
    html,
    text
  });

  if (error) throw new Error(error.message || 'Resend API error');
  console.log('[Resend] Email sent, id:', data?.id);
  return data;
}

// Smart send: tries SMTP first, falls back to Resend if SMTP fails
async function sendEmail(mailOptions) {
  // Try SMTP first (works on local / VPS)
  try {
    const transporter = await getTransporter();
    const result = await transporter.sendMail(mailOptions);
    console.log('[SMTP] Email sent to:', mailOptions.to);
    return result;
  } catch (smtpErr) {
    console.warn('[SMTP] Failed:', smtpErr.message);
  }

  // Fallback to Resend (works on Vercel / Render / Railway)
  if (process.env.RESEND_API_KEY) {
    console.log('[Fallback] Trying Resend API...');
    return sendViaResend(mailOptions);
  }

  throw new Error('Both SMTP and Resend failed. No email could be sent.');
}

function renderFieldRows(enquiry) {
  const fields = [
    ['First Name', enquiry.firstName],
    ['Last Name', enquiry.lastName],
    ['Date of Birth', enquiry.dateOfBirth],
    ['Gender', enquiry.gender],
    ['Applying for Grade', enquiry.applyingForGrade],
    ['Previous School', enquiry.previousSchool || 'Not provided'],
    ['Parent/Guardian Name', enquiry.parentGuardianName],
    ['Relation', enquiry.relation],
    ['Phone Number', enquiry.phoneNumber],
    ['Email Address', enquiry.emailAddress],
    ['Residential Address', enquiry.residentialAddress],
    ['Message/Query', enquiry.messageQuery || 'Not provided'],
    ['Submission Timestamp', enquiry.submissionTimestamp]
  ];

  return fields.map(([label, value]) => `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;background:#f8fafc;font-weight:700;color:#334155;width:220px;">${escapeHtml(label)}</td>
      <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#0f172a;white-space:pre-line;">${escapeHtml(value)}</td>
    </tr>
  `).join('');
}

function adminEmailHtml(enquiry) {
  const studentName = `${enquiry.firstName} ${enquiry.lastName}`;

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f5f9;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:720px;background:#ffffff;border:1px solid #dbe3ef;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:#0f1f5c;color:#ffffff;padding:26px 30px;">
                <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#f5a623;font-weight:700;">Admission Enquiry</div>
                <h1 style="margin:8px 0 0;font-size:24px;line-height:1.3;">New Admission Enquiry - ${escapeHtml(studentName)}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 30px;">
                <p style="margin:0 0 18px;font-size:15px;line-height:1.6;color:#334155;">A parent has submitted the Admission Enquiry Form. The complete submission is below.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:8px;border-collapse:separate;border-spacing:0;overflow:hidden;">
                  ${renderFieldRows(enquiry)}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function parentEmailHtml(enquiry) {
  const studentName = `${enquiry.firstName} ${enquiry.lastName}`;

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f5f9;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border:1px solid #dbe3ef;border-radius:12px;overflow:hidden;">
            <tr>
              <td style="background:#0f1f5c;color:#ffffff;padding:28px 30px;">
                <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#f5a623;font-weight:700;">Nirmaan Public School</div>
                <h1 style="margin:8px 0 0;font-size:24px;line-height:1.3;">Admission Enquiry Received</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:30px;">
                <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">Dear ${escapeHtml(enquiry.parentGuardianName)},</p>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">Thank you for your admission enquiry. We confirm that your submission has been received successfully.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:22px 0;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
                  <tr>
                    <td style="padding:14px 16px;background:#f8fafc;font-weight:700;color:#334155;width:180px;">Student Name</td>
                    <td style="padding:14px 16px;color:#0f172a;">${escapeHtml(studentName)}</td>
                  </tr>
                  <tr>
                    <td style="padding:14px 16px;background:#f8fafc;font-weight:700;color:#334155;border-top:1px solid #e5e7eb;">Grade Applied For</td>
                    <td style="padding:14px 16px;color:#0f172a;border-top:1px solid #e5e7eb;">${escapeHtml(enquiry.applyingForGrade)}</td>
                  </tr>
                </table>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">Our admissions office will review the details and contact you soon.</p>
                <p style="margin:24px 0 0;font-size:16px;line-height:1.6;">Regards,<br><strong>Admissions Office</strong><br>Nirmaan Public School</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildPlainText(enquiry, parentCopy = false) {
  const studentName = `${enquiry.firstName} ${enquiry.lastName}`;

  if (parentCopy) {
    return [
      `Dear ${enquiry.parentGuardianName},`,
      '',
      'Thank you for your admission enquiry. Your submission has been received successfully.',
      `Student Name: ${studentName}`,
      `Grade Applied For: ${enquiry.applyingForGrade}`,
      '',
      'Our admissions office will contact you soon.',
      '',
      'Regards,',
      'Admissions Office',
      'Nirmaan Public School'
    ].join('\n');
  }

  return [
    `New Admission Enquiry - ${studentName}`,
    '',
    `First Name: ${enquiry.firstName}`,
    `Last Name: ${enquiry.lastName}`,
    `Date of Birth: ${enquiry.dateOfBirth}`,
    `Gender: ${enquiry.gender}`,
    `Applying for Grade: ${enquiry.applyingForGrade}`,
    `Previous School: ${enquiry.previousSchool || 'Not provided'}`,
    `Parent/Guardian Name: ${enquiry.parentGuardianName}`,
    `Relation: ${enquiry.relation}`,
    `Phone Number: ${enquiry.phoneNumber}`,
    `Email Address: ${enquiry.emailAddress}`,
    `Residential Address: ${escapeText(enquiry.residentialAddress)}`,
    `Message/Query: ${enquiry.messageQuery || 'Not provided'}`,
    `Submission Timestamp: ${enquiry.submissionTimestamp}`
  ].join('\n');
}

async function saveEnquiry(enquiry) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.appendFile(ENQUIRIES_FILE, `${JSON.stringify(enquiry)}\n`, 'utf8');
}

app.post('/api/admission-enquiries', async (req, res) => {
  const { enquiry, errors } = validateAdmissionEnquiry(req.body || {});

  if (errors.length) {
    return res.status(400).json({
      success: false,
      message: 'Please correct the highlighted fields and try again.',
      errors
    });
  }

  try {
    await saveEnquiry(enquiry);
  } catch (error) {
    console.error('Admission enquiry persistence failed:', error);
    return res.status(500).json({
      success: false,
      message: 'We could not process the enquiry right now. Please try again.'
    });
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER || '"Nirmaan Public School" <no-reply@ethereal.email>';
  const studentName = `${enquiry.firstName} ${enquiry.lastName}`;
  const adminMail = {
    from,
    to: ADMISSIONS_EMAIL,
    replyTo: enquiry.emailAddress,
    subject: `New Admission Enquiry - ${studentName}`,
    text: buildPlainText(enquiry),
    html: adminEmailHtml(enquiry)
  };
  const parentMail = {
    from,
    to: enquiry.emailAddress,
    replyTo: ADMISSIONS_EMAIL,
    subject: 'Admission Enquiry Received',
    text: buildPlainText(enquiry, true),
    html: parentEmailHtml(enquiry)
  };

  const [adminResult, parentResult] = await Promise.allSettled([
    sendEmail(adminMail),
    sendEmail(parentMail)
  ]);

  if (adminResult.status === 'rejected') {
    console.error('[Email] Admin email failed:', adminResult.reason?.message);
    return res.status(502).json({
      success: false,
      message: 'Your enquiry could not be delivered right now. Please call us at 991-822-5511.'
    });
  }

  if (parentResult.status === 'rejected') {
    console.warn('[Email] Parent confirmation failed (non-fatal):', parentResult.reason?.message);
  }

  return res.status(200).json({
    success: true,
    message: 'Admission enquiry submitted successfully.'
  });
});

/* ============================================================
   POST /api/contact — Contact Page "Send Us a Message" Form
   ============================================================ */
const CONTACT_EMAIL = process.env.SCHOOL_CONTACT_EMAIL || ADMISSIONS_EMAIL;

function validateContactForm(body) {
  const msg = {
    name:    clean(body.name),
    phone:   clean(body.phone),
    email:   clean(body.email).toLowerCase(),
    subject: clean(body.subject),
    message: cleanMultiline(body.message)
  };

  const errors = [];
  if (!msg.name)    errors.push('Your Name is required.');
  if (!msg.phone)   errors.push('Phone Number is required.');
  if (!msg.subject) errors.push('Subject is required.');
  if (!msg.message) errors.push('Message is required.');

  if (msg.email && !isEmail(msg.email)) {
    errors.push('Email Address must be valid.');
  }

  const digitsOnly = msg.phone.replace(/\D/g, '');
  if (msg.phone && digitsOnly.length < 10) {
    errors.push('Phone Number must contain at least 10 digits.');
  }

  msg.phone = digitsOnly || msg.phone;
  msg.submissionTimestamp = new Date().toISOString();

  return { msg, errors };
}

function contactAdminEmailHtml(msg) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f5f9;padding:28px 12px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #dbe3ef;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:#0f1f5c;color:#ffffff;padding:26px 30px;">
              <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#f5a623;font-weight:700;">Website Contact Form</div>
              <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;">New Message — ${escapeHtml(msg.subject)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 30px;">
              <p style="margin:0 0 18px;font-size:15px;color:#334155;">Someone contacted you via the website contact form. Details below.</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e5e7eb;border-radius:8px;border-collapse:separate;border-spacing:0;overflow:hidden;">
                ${[
                  ['Name',       escapeHtml(msg.name)],
                  ['Phone',      escapeHtml(msg.phone)],
                  ['Email',      escapeHtml(msg.email || 'Not provided')],
                  ['Subject',    escapeHtml(msg.subject)],
                  ['Submitted',  escapeHtml(msg.submissionTimestamp)]
                ].map(([l,v]) => `<tr>
                  <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;background:#f8fafc;font-weight:700;color:#334155;width:160px;">${l}</td>
                  <td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#0f172a;">${v}</td>
                </tr>`).join('')}
                <tr>
                  <td style="padding:12px 16px;background:#f8fafc;font-weight:700;color:#334155;vertical-align:top;">Message</td>
                  <td style="padding:12px 16px;color:#0f172a;white-space:pre-line;">${escapeHtml(msg.message)}</td>
                </tr>
              </table>
              ${msg.email ? `<p style="margin:20px 0 0;font-size:14px;color:#64748b;">Reply directly to this email to respond to <strong>${escapeHtml(msg.name)}</strong>.</p>` : ''}
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function contactConfirmEmailHtml(msg) {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f5f9;padding:28px 12px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:1px solid #dbe3ef;border-radius:12px;overflow:hidden;">
          <tr>
            <td style="background:#0f1f5c;color:#ffffff;padding:28px 30px;">
              <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#f5a623;font-weight:700;">Nirmaan Public School</div>
              <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;">We've Received Your Message!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:30px;">
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">Dear <strong>${escapeHtml(msg.name)}</strong>,</p>
              <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">Thank you for reaching out to us. We have received your message regarding <strong>"${escapeHtml(msg.subject)}"</strong> and will get back to you as soon as possible — usually within the same business day.</p>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:22px 0;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
                <tr>
                  <td style="padding:14px 16px;background:#f8fafc;font-weight:700;color:#334155;width:140px;">Subject</td>
                  <td style="padding:14px 16px;color:#0f172a;">${escapeHtml(msg.subject)}</td>
                </tr>
                <tr>
                  <td style="padding:14px 16px;background:#f8fafc;font-weight:700;color:#334155;border-top:1px solid #e5e7eb;">Phone</td>
                  <td style="padding:14px 16px;color:#0f172a;border-top:1px solid #e5e7eb;">${escapeHtml(msg.phone)}</td>
                </tr>
              </table>
              <p style="margin:0 0 8px;font-size:15px;color:#334155;">Need an immediate response? Call us directly:</p>
              <p style="margin:0 0 24px;font-size:18px;font-weight:700;color:#0f1f5c;">📞 991-822-5511</p>
              <p style="margin:0;font-size:16px;line-height:1.6;">Warm regards,<br><strong>Nirmaan Public School</strong><br><span style="color:#64748b;font-size:14px;">Aliganj Bazar, Sultanpur, U.P. 227805</span></p>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

app.post('/api/contact', async (req, res) => {
  const { msg, errors } = validateContactForm(req.body || {});

  if (errors.length) {
    return res.status(400).json({ success: false, message: errors[0], errors });
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER || '"Nirmaan Public School" <no-reply@ethereal.email>';

  const adminMail = {
    from,
    to: CONTACT_EMAIL,
    replyTo: msg.email || undefined,
    subject: `[Contact Form] ${msg.subject} — ${msg.name}`,
    text: [
      `Name: ${msg.name}`,
      `Phone: ${msg.phone}`,
      `Email: ${msg.email || 'Not provided'}`,
      `Subject: ${msg.subject}`,
      `Message:\n${msg.message}`,
      `Submitted: ${msg.submissionTimestamp}`
    ].join('\n'),
    html: contactAdminEmailHtml(msg)
  };

  const [adminResult] = await Promise.allSettled([sendEmail(adminMail)]);

  if (adminResult.status === 'rejected') {
    console.error('[Contact] Admin email failed:', adminResult.reason?.message);
    return res.status(502).json({
      success: false,
      message: 'Your message could not be delivered right now. Please call us at 991-822-5511.'
    });
  }

  // Send confirmation to user only if they provided an email
  if (msg.email) {
    const confirmMail = {
      from,
      to: msg.email,
      replyTo: CONTACT_EMAIL,
      subject: 'We received your message — Nirmaan Public School',
      text: `Dear ${msg.name},\n\nThank you for contacting Nirmaan Public School. We received your message about "${msg.subject}" and will reply shortly.\n\nFor urgent matters call: 991-822-5511\n\nRegards,\nNirmaan Public School\nAliganj Bazar, Sultanpur, U.P. 227805`,
      html: contactConfirmEmailHtml(msg)
    };
    Promise.allSettled([sendEmail(confirmMail)]).catch(() => {}); // fire-and-forget, non-blocking
  }

  return res.status(200).json({
    success: true,
    message: 'Your message has been sent! We\'ll get back to you soon.'
  });
});


app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],
  index: 'index.html'
}));

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not found.' });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Nirmaan Public School website running at http://localhost:${PORT}`);
  });
}

module.exports = app;

