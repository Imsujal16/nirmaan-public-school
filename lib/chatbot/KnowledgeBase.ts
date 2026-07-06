import type { KnowledgeEntry } from './types';

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: 'overview',
    title: 'About Nirmaan Public School',
    intent: 'overview',
    summary: 'Nirmaan Public School (NPS) is a premier English-medium institution in Aliganj Bazar, Sultanpur, Uttar Pradesh — offering classes from Playgroup through Grade 10.',
    details: [
      'Tagline: Learn · Grow · Succeed.',
      'NPS prioritises quality education, modern smart classrooms, strong values, and holistic development.',
      'Established under the vision of Founder Mr. Rajesh Dubey "Nirmaan", the school serves the Sultanpur region.'
    ],
    keywords: ['school', 'overview', 'about', 'nirmaan', 'nps', 'english medium', 'motto', 'tagline'],
    aliases: ['who are you', 'tell me about school', 'about nps'],
    links: [
      { label: 'About Us', href: '/about.html', variant: 'primary' },
      { label: 'Academics', href: '/academics.html' }
    ]
  },
  {
    id: 'admissions',
    title: 'Admissions 2026–27',
    intent: 'admissions',
    summary: 'Admissions for the 2026–27 academic session are now open. Seats are limited, so early application is encouraged.',
    details: [
      'Step 1 — Enquiry Form: Complete and submit the Admission Enquiry Form online or at the school office.',
      'Step 2 — Document Submission: Bring all required documents to the admissions desk.',
      'Step 3 — Interaction or Assessment: The child attends a brief, friendly session with school staff.',
      'Step 4 — Final Confirmation: The admissions team contacts the parent to confirm the seat.'
    ],
    keywords: ['admission', 'admissions', 'apply', 'enroll', 'enrol', 'seat', 'seats', 'form', 'enquiry', '2026', '2027'],
    aliases: ['i want admission', 'how do i apply', 'admission process', 'join school'],
    links: [
      { label: 'Apply Now', href: '/admissions.html', variant: 'primary' },
      { label: 'Admission Form', href: '/admissions.html#apply-form' },
      { label: 'Call Office', href: 'tel:9918225511' }
    ],
    related: ['documents', 'fees', 'timings']
  },
  {
    id: 'classes',
    title: 'Classes Offered',
    intent: 'academics',
    summary: 'NPS offers a full range of classes from Playgroup and Nursery through KG and up to Grade 10.',
    details: [
      'Early Childhood: Playgroup, Nursery, KG I, and KG II.',
      'Primary School: Grades 1 through 5.',
      'Middle School: Grades 6 through 8.',
      'Secondary School: Grades 9 and 10.'
    ],
    keywords: ['classes', 'class', 'grade', 'grades', 'playgroup', 'nursery', 'kg', 'primary', 'middle', 'secondary'],
    aliases: ['which classes', 'class available', 'grades available', 'standards offered'],
    links: [
      { label: 'Academics', href: '/academics.html', variant: 'primary' },
      { label: 'Admissions', href: '/admissions.html' }
    ]
  },
  {
    id: 'documents',
    title: 'Required Admission Documents',
    intent: 'documents',
    summary: 'Please bring the following documents when applying for admission at NPS.',
    details: [
      'Child\'s birth certificate (original + one photocopy).',
      '4 recent passport-size photographs of the child.',
      'Previous school report card or Transfer Certificate (required for Grade 2 and above).',
      'Parent or guardian Aadhaar card (photocopy).',
      'Proof of residence — Aadhaar, Voter ID, or a recent utility bill.',
      'Vaccination or medical record (optional but recommended).'
    ],
    keywords: ['documents', 'document', 'certificate', 'birth', 'photo', 'photograph', 'aadhaar', 'aadhar', 'tc', 'transfer', 'report card', 'address proof'],
    aliases: ['what papers', 'required papers', 'admission documents'],
    links: [
      { label: 'Eligibility', href: '/admissions.html#eligibility', variant: 'primary' },
      { label: 'Apply Now', href: '/admissions.html#apply-form' }
    ]
  },
  {
    id: 'age',
    title: 'Age Criteria for Admission',
    intent: 'admissions',
    summary: 'The minimum age for each class is calculated as of April 1, 2026.',
    details: [
      'Playgroup: child must be 3–4 years old.',
      'Nursery: child must be 4–5 years old.',
      'KG I: child must be 5–6 years old.',
      'KG II: child must be 6–7 years old.',
      'Grade 1: child must be 7–8 years old.',
      'Grades 2 to 10: Admissions are based on standard age progression and successful completion of the previous academic year.'
    ],
    keywords: ['age', 'criteria', 'eligible', 'eligibility', 'dob', 'date of birth', 'april'],
    aliases: ['age limit', 'minimum age', 'child age'],
    links: [{ label: 'Eligibility Details', href: '/admissions.html#eligibility', variant: 'primary' }]
  },
  {
    id: 'entrance',
    title: 'Entrance Test & Assessment',
    intent: 'admissions',
    summary: 'NPS does not conduct a formal entrance examination. Instead, we use a friendly interaction session to understand the child\'s readiness.',
    details: [
      'For Playgroup, Nursery, and KG: a brief, informal interaction with the child in a relaxed setting — no written test required.',
      'For Grades 1 and above: a short written assessment in basic English and Mathematics to help place the child in the right learning group.',
      'The assessment is designed to be stress-free and child-friendly.',
      'Results are used solely for appropriate class placement, not for rejection.'
    ],
    keywords: ['entrance', 'test', 'exam', 'assessment', 'interview', 'screening', 'evaluation', 'written test'],
    aliases: ['is there an entrance test', 'entrance exam', 'admission test', 'do you take exam'],
    links: [
      { label: 'Admission Process', href: '/admissions.html', variant: 'primary' },
      { label: 'Contact Office', href: '/contact.html' }
    ]
  },
  {
    id: 'fees',
    title: 'Fee Structure',
    intent: 'fees',
    summary: 'Detailed fee information is not published on the public website. Please contact the school office for the current fee schedule.',
    details: [
      'For the complete fee structure, visit the school office or call 991-822-5511.',
      'NPS believes quality education should be accessible — scholarship and concession options may be available.',
      'Office hours: Monday–Friday 8:00 AM–3:00 PM, Saturday 8:00 AM–1:00 PM.'
    ],
    keywords: ['fee', 'fees', 'cost', 'price', 'charges', 'scholarship', 'payment', 'concession'],
    aliases: ['school fees', 'admission fee', 'monthly fee', 'how much cost'],
    links: [
      { label: 'Contact Office', href: '/contact.html', variant: 'primary' },
      { label: 'Call 991-822-5511', href: 'tel:9918225511' }
    ]
  },
  {
    id: 'academics',
    title: 'Curriculum & Teaching Methods',
    intent: 'academics',
    summary: 'NPS follows the National Curriculum from Playgroup to Grade 10, delivered through modern, student-centred teaching methods.',
    details: [
      'Curriculum stages: Early Childhood → Primary → Middle School → Secondary (up to Grade 10).',
      'Activity-based and inquiry-driven learning across all grades.',
      'Communicative English instruction from the earliest classes.',
      'Creative expression — art, drama, and public speaking — integrated throughout.',
      'Continuous and comprehensive assessment, minimising exam-only pressure.'
    ],
    keywords: ['academics', 'academic', 'curriculum', 'syllabus', 'study', 'subjects', 'learning', 'assessment', 'national curriculum'],
    aliases: ['what curriculum', 'how do students learn', 'education system'],
    links: [{ label: 'Explore Academics', href: '/academics.html', variant: 'primary' }]
  },
  {
    id: 'facilities',
    title: 'Campus & Facilities',
    intent: 'facilities',
    summary: 'NPS offers smart classrooms, multimedia learning modules, digital instruction, dedicated activity spaces, and a safe campus environment.',
    details: [
      'Smart classrooms with interactive multimedia learning technology in every room.',
      'Digital instruction tools to support visual, hands-on, and activity-based learning.',
      'Specialised spaces for arts, sports, and co-curricular activities.',
      'CCTV surveillance and trained security personnel throughout the campus.',
      'Child-safe infrastructure designed for comfort, safety, and active participation.'
    ],
    keywords: ['facilities', 'facility', 'infrastructure', 'smart classroom', 'smart class', 'classroom', 'led', 'technology', 'computer', 'lab', 'labs', 'library', 'campus'],
    aliases: ['computer lab', 'science lab', 'do you have labs', 'school building', 'campus facilities'],
    links: [
      { label: 'Smart Classrooms', href: '/academics.html#smart', variant: 'primary' },
      { label: 'Gallery', href: '/gallery.html' }
    ]
  },
  {
    id: 'transport',
    title: 'Transport & Bus Service',
    intent: 'transport',
    summary: 'NPS provides a transport facility for students. For specific routes and area coverage, please contact the school office directly.',
    details: [
      'Route and pickup details are updated each academic session.',
      'Call 991-822-5511 or visit the office for the current list of routes and stops.',
      'Office hours: Monday–Friday 8:00 AM–3:00 PM, Saturday 8:00 AM–1:00 PM.'
    ],
    keywords: ['transport', 'bus', 'van', 'route', 'pickup', 'drop', 'vehicle', 'cab'],
    aliases: ['school bus', 'bus route', 'van facility', 'pickup service'],
    links: [
      { label: 'Contact Office', href: '/contact.html#faq', variant: 'primary' },
      { label: 'Call Now', href: 'tel:9918225511' }
    ]
  },
  {
    id: 'sports',
    title: 'Sports & Co-Curricular Activities',
    intent: 'sports',
    summary: 'NPS offers a wide range of sports and co-curricular activities to support every child\'s growth beyond the classroom.',
    details: [
      'Sports: cricket, football, badminton, athletics, and general physical education.',
      'Creative arts: drawing, painting, art and craft.',
      'Performing arts: drama, music, and dance.',
      'Communication skills: debates, elocution, and public speaking.',
      'Clubs: Book Club and Environmental Club for student-led learning.'
    ],
    keywords: ['sports', 'ground', 'athletics', 'cricket', 'football', 'badminton', 'games', 'activity', 'activities', 'dance', 'music', 'drama', 'art'],
    aliases: ['playground', 'sports facilities', 'co curricular', 'extra curricular'],
    links: [
      { label: 'Co-Curricular Activities', href: '/academics.html#cocurricular', variant: 'primary' },
      { label: 'Sports Gallery', href: '/gallery.html' }
    ]
  },
  {
    id: 'gallery',
    title: 'School Gallery',
    intent: 'gallery',
    summary: 'The NPS Gallery is a visual showcase of campus life — from smart classrooms and annual day celebrations to sports events.',
    details: [
      'Browse media by category: Campus Tour, Annual Day, Smart Classes, Sports, and Videos.',
      'Includes photo highlights, event recordings, and campus tour videos.',
      'Updated regularly with new events and school milestones.'
    ],
    keywords: ['gallery', 'photo', 'photos', 'image', 'images', 'video', 'videos', 'event', 'events', 'annual day', 'campus tour'],
    aliases: ['show gallery', 'school photos', 'campus video', 'events photos'],
    links: [{ label: 'Open Gallery', href: '/gallery.html', variant: 'primary' }]
  },
  {
    id: 'contact',
    title: 'Contact Information',
    intent: 'contact',
    summary: 'You can reach NPS by phone, email, or by visiting the school campus directly.',
    details: [
      'Phone: 991-822-5511.',
      'Email: info@nirmaanpublicschool.in.',
      'Address: Aliganj Bazar, Sultanpur, Uttar Pradesh 227805.',
      'No prior appointment is needed for a visit during office hours.'
    ],
    keywords: ['contact', 'phone', 'call', 'email', 'address', 'location', 'directions', 'whatsapp', 'visit', 'where'],
    aliases: ['where is school', 'contact number', 'school address', 'how to reach'],
    links: [
      { label: 'Contact Page', href: '/contact.html', variant: 'primary' },
      { label: '💬 WhatsApp', href: 'https://api.whatsapp.com/send/?phone=919918225511&text&type=phone_number&app_absent=0' },
      { label: 'Call', href: 'tel:9918225511' },
      { label: 'Email', href: 'mailto:info@nirmaanpublicschool.in' }
    ]
  },
  {
    id: 'timings',
    title: 'Office Hours',
    intent: 'timings',
    summary: 'The school office is open Monday to Friday, 8:00 AM–3:00 PM, and on Saturday, 8:00 AM–1:00 PM.',
    details: [
      'The office is closed on Sundays and on public holidays.',
      'Parents are welcome to walk in during office hours for enquiries, campus tours, or meetings with staff.',
      'No prior appointment is required for a general visit.'
    ],
    keywords: ['timing', 'timings', 'time', 'office hours', 'school timings', 'open', 'closed', 'sunday', 'holiday', 'visit hours'],
    aliases: ['when open', 'school time', 'office time', 'visiting hours'],
    links: [{ label: 'Contact', href: '/contact.html', variant: 'primary' }]
  },
  {
    id: 'leadership',
    title: 'School Leadership',
    intent: 'leadership',
    summary: 'NPS is guided by an experienced and dedicated leadership team committed to academic excellence and student welfare.',
    details: [
      'Founder: Mr. Rajesh Dubey "Nirmaan" (Advocate).',
      'Director: Mr. Ajay Kumar Dubey.',
      'Manager: Mr. Satyendra Panday.',
      'Principal: Mr. Faizan Ahmad Ansari.',
      'The Principal\'s message and leadership profiles are available on the About page.'
    ],
    keywords: ['principal', 'headmaster', 'head teacher', 'founder', 'director', 'manager', 'leadership', 'message', 'vision'],
    aliases: ['principal message', 'headmaster message', 'school head', 'founder message'],
    links: [{ label: 'Meet Our Leadership', href: '/about.html#leadership', variant: 'primary' }]
  },
  {
    id: 'safety',
    title: 'Safety & Security',
    intent: 'safety',
    summary: 'Student safety is a non-negotiable priority at NPS. The campus is secured with multiple layers of protection.',
    details: [
      'CCTV surveillance covers all key areas of the campus.',
      'Trained security personnel are present throughout school hours.',
      'Strict visitor protocols ensure only authorised individuals can access the premises.',
      'Child-safe infrastructure and a nurturing environment for every student.'
    ],
    keywords: ['safety', 'safe', 'security', 'secure', 'cctv', 'visitor', 'protocol', 'child safe'],
    aliases: ['is school safe', 'security facilities', 'child safety'],
    links: [{ label: 'Contact & FAQ', href: '/contact.html#faq', variant: 'primary' }]
  },
  {
    id: 'news',
    title: 'News & Notices',
    intent: 'overview',
    summary: 'The school shares updates, event announcements, and notices through its website banner and social media channels.',
    details: [
      'Current notice: Admissions Open for the 2026–27 academic session — limited seats available.',
      'Follow the school on social media for the latest events, results, and campus updates.',
      'Visit the Contact page for the most recent announcements.'
    ],
    keywords: ['news', 'notice', 'notices', 'announcement', 'updates', 'latest'],
    aliases: ['school news', 'latest notice', 'announcements'],
    links: [
      { label: 'Contact', href: '/contact.html', variant: 'primary' },
      { label: 'Gallery', href: '/gallery.html' }
    ]
  },
  {
    id: 'social',
    title: 'Social Media & Online Presence',
    intent: 'contact',
    summary: 'Stay connected with NPS on social media for the latest updates, event photos, campus videos, and school news.',
    details: [
      '💬 WhatsApp: Chat directly with the school admissions team.',
      '📸 Instagram: @nirmaan_public_school — daily highlights and student moments.',
      '📘 Facebook: Nirmaan Public School Aliganj — events, notices, and announcements.',
      '▶️ YouTube: @nirmanpublicschoolaliganj4860 — campus tours, annual day videos, and more.'
    ],
    keywords: ['social media', 'social', 'instagram', 'facebook', 'youtube', 'whatsapp', 'follow', 'online', 'channel', 'video', 'videos', 'connect', 'media'],
    aliases: ['school instagram', 'school facebook', 'school youtube', 'whatsapp number', 'follow school', 'social links', 'online presence'],
    links: [
      { label: '💬 WhatsApp', href: 'https://api.whatsapp.com/send/?phone=919918225511&text&type=phone_number&app_absent=0', variant: 'primary' },
      { label: '📸 Instagram', href: 'https://www.instagram.com/nirmaan_public_school/' },
      { label: '📘 Facebook', href: 'https://www.facebook.com/nirmaan.public.school.aliganj/' },
      { label: '▶️ YouTube', href: 'https://www.youtube.com/@nirmanpublicschoolaliganj4860/videos' }
    ]
  }
];

