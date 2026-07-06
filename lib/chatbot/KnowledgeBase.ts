import type { KnowledgeEntry } from './types';

export const knowledgeBase: KnowledgeEntry[] = [

  // ── OVERVIEW ─────────────────────────────────────────────────────────────
  {
    id: 'overview',
    title: 'About Nirmaan Public School',
    intent: 'overview',
    summary: 'Nirmaan Public School (NPS) is a premier English-medium institution in Aliganj Bazar, Sultanpur, Uttar Pradesh — offering classes from Playgroup through Grade 10.',
    details: [
      'Tagline: Learn · Grow · Succeed.',
      'Our guiding philosophy: "विद्या ददाति विनयम्" — Education gives humility. True education shapes character, not just careers.',
      'NPS prioritises quality education, modern smart classrooms, strong values, and holistic development.',
      'Established under the vision of Founder Mr. Rajesh Dubey "Nirmaan" (Advocate), the school serves the Sultanpur region with 10+ years of excellence.',
      'Over 600 happy students, 25+ expert teachers, and 11 grade levels — 100% English medium from Day 1.',
    ],
    keywords: ['school', 'overview', 'about', 'nirmaan', 'nps', 'english medium', 'motto', 'tagline', 'what is', 'history', 'sultanpur'],
    aliases: ['who are you', 'tell me about school', 'about nps', 'what school is this', 'school info'],
    links: [
      { label: 'About Us', href: '/about.html', variant: 'primary' },
      { label: 'Academics', href: '/academics.html' },
    ],
  },

  // ── MISSION & VALUES ──────────────────────────────────────────────────────
  {
    id: 'mission',
    title: 'Mission, Vision & Core Values',
    intent: 'overview',
    summary: 'NPS exists to provide every child with a world-class education that shapes brilliant minds and compassionate characters ready to lead tomorrow\'s world.',
    details: [
      'Mission: To provide quality education that shapes not just brilliant minds, but strong, compassionate characters ready to lead tomorrow\'s world.',
      'Core Value 1 — Character Building: Integrity, discipline, empathy, and moral values that shape responsible citizens.',
      'Core Value 2 — Holistic Development: Academic excellence meets creative expression, physical fitness, and social skills.',
      'Core Value 3 — Safe & Nurturing Environment: CCTV surveillance, trained security, and child-safe campus ensure protection and warmth.',
      'Core Value 4 — Academic Excellence: Rigorous National Curriculum, smart classrooms, and activity-based learning drive exceptional results.',
    ],
    keywords: ['mission', 'vision', 'values', 'value', 'character', 'holistic', 'excellence', 'nurturing', 'philosophy', 'goals', 'objectives'],
    aliases: ['school mission', 'what do you believe in', 'school philosophy', 'school goals', 'why choose nps'],
    links: [
      { label: 'About Us', href: '/about.html#mission', variant: 'primary' },
    ],
    related: ['overview', 'leadership'],
  },

  // ── SCHOOL STORY ──────────────────────────────────────────────────────────
  {
    id: 'story',
    title: 'School History & Story',
    intent: 'overview',
    summary: 'NPS was founded with a singular vision — to bring quality, English-medium education to the families of Sultanpur and surrounding communities.',
    details: [
      'Founded by Mr. Rajesh Dubey "Nirmaan" (Advocate) with 10+ years of excellence in education.',
      'Located at Aliganj Bazar, Sultanpur (U.P.) 227805 — our campus has grown from a small school into a thriving institution serving hundreds of students.',
      'We follow the National Curriculum, offering comprehensive education from Playgroup through Grade 10.',
      'Modern campus features smart classrooms, dedicated activity spaces, and a safe, nurturing environment.',
      'English Medium — full English instruction from the very first day, even in Playgroup.',
    ],
    keywords: ['history', 'story', 'founded', 'legacy', 'origin', 'established', 'background', 'when', 'how old', 'started'],
    aliases: ['school history', 'how old is school', 'when was nps founded', 'school background', 'tell me the story'],
    links: [
      { label: 'Our Story', href: '/about.html#story', variant: 'primary' },
      { label: 'About Us', href: '/about.html' },
    ],
  },

  // ── LEADERSHIP & MESSAGES ──────────────────────────────────────────────────
  {
    id: 'leadership',
    title: 'School Leadership',
    intent: 'leadership',
    summary: 'NPS is guided by an experienced and dedicated leadership team committed to academic excellence and student welfare. You can ask for specific messages from the Founder, Director, Manager, or Principal.',
    details: [
      'Founder: Mr. Rajesh Dubey "Nirmaan" (Advocate) — M.A., L.L.B.',
      'Director: Mr. Ajay Kumar Dubey — M.Sc. (Chemistry), B.Ed., L.L.B.',
      'Manager: Mr. Satyendra Panday — Language Expert',
      'Principal: Mr. Faizan Ahmad Ansari — M.A., B.Ed.'
    ],
    keywords: ['leadership', 'head', 'management team', 'who runs', 'visionaries'],
    aliases: ['who runs the school', 'management team', 'school head'],
    links: [{ label: 'Meet Our Leadership', href: '/about.html#leadership', variant: 'primary' }],
  },

  {
    id: 'founder_message',
    title: 'Message from the Founder',
    intent: 'leadership',
    summary: 'Message from Mr. Rajesh Dubey "Nirmaan" (Advocate), Founder of Nirmaan Public School (M.A., L.L.B.)',
    details: [
      "Nowadays every parent wants to provide their child with the best education — an education through which the child can build their life, move ahead, and adapt to changing times. For this reason, parents make every possible effort to give their children a good education. They enroll them in reputed educational institutions and spend substantial fees. This is necessary.\n\nHowever, our responsibility does not end there. Today we often see that parents do not have enough time for their children. Most parents only talk to their children and do not try to understand their problems. Today, we must change this traditional way of thinking and fully cooperate with our children. We need to make them aware of what is right and wrong in life. It is just as important to teach children what they should not do as it is to teach them what they should do.\n\nWe save money for our children, but I request you not to leave only wealth for them. Instead, make them capable and educated. Friends, some decisions in life give immediate results, while some decisions bear fruit later. Therefore, I request you to support me in building a better future for your children. Friends, a single step has taught us that one step can take us further. Come, let us work together to educate our children and make their future bright."
    ],
    keywords: ['founder', 'rajesh dubey', 'founder message', 'nirmaan'],
    aliases: ['who founded', 'founder message', 'message from founder', 'rajesh dubey message'],
    links: [{ label: 'About the Founder', href: '/about.html#leadership', variant: 'primary' }],
  },

  {
    id: 'director_message',
    title: 'Message from the Director',
    intent: 'leadership',
    summary: 'Message from Mr. Ajay Kumar Dubey, Director of Nirmaan Public School (M.Sc. Chemistry, B.Ed., L.L.B.)',
    details: [
      "Time is extremely important in the field of education for providing children with a better future. Primary education is especially important because it forms the foundation of a child's future. However, most parents focus more on their children's higher education and often overlook the importance of primary education. Today, many parents pay attention to higher studies, but they underestimate the significance of primary education.\n\nJust think about it: how can a strong building be constructed on a weak foundation? A tree can bear good fruit only when its roots are strong. If the roots are weak, the tree may be destroyed by storms. Similarly, if a child's primary education is not strong, how can we expect them to have a bright future? How will they be prepared to face competition? How will they establish themselves in society? And how will they become an inspiration for future generations?\n\nTherefore, I humbly request you to pay special attention to your children's primary education. Come, let us move forward together. Let us take one step forward. Take a step toward building a bright future for your children."
    ],
    keywords: ['director', 'ajay dubey', 'ajay kumar', 'director message'],
    aliases: ['director message', 'message from director', 'who is the director', 'ajay dubey message'],
    links: [{ label: 'About the Director', href: '/about.html#leadership', variant: 'primary' }],
  },

  {
    id: 'manager_message',
    title: 'Message from the Manager',
    intent: 'leadership',
    summary: 'Message from Mr. Satyendra Panday, Manager of Nirmaan Public School (Language Expert)',
    details: [
      "Today, education is no longer limited to books alone. In this era of globalization, competition has increased tremendously, and the role of technology has become extremely important.\n\nThe intellectual development of children now requires the support of technology. God has gifted every child with a unique talent. It is our responsibility to identify that talent and help children progress in their chosen fields.\n\nOur goal should be to use modern technological tools such as Smart Classrooms and Computer Labs to prepare children for the future. These technologies provide a strong foundation for their intellectual growth and learning. Understanding this responsibility, it has become essential to provide children with education that is meaningful and aligned with their abilities and talents."
    ],
    keywords: ['manager', 'satyendra panday', 'manager message'],
    aliases: ['manager message', 'message from manager', 'who is the manager', 'satyendra panday message'],
    links: [{ label: 'About the Manager', href: '/about.html#leadership', variant: 'primary' }],
  },

  {
    id: 'principal_message',
    title: 'Message from the Principal',
    intent: 'leadership',
    summary: 'Message from Mr. Faizan Ahmad Ansari, Principal of Nirmaan Public School (M.A., B.Ed.)',
    details: [
      "Education is extremely important for modern society. It is the foundation of a successful life and plays a vital role in the mental development of children, helping them become responsible and capable citizens.\n\nEducation builds a better society. It makes children cultured, aware, and self-reliant. Through education, children are empowered from an early age and are given opportunities to achieve their goals. Education also helps develop good values, discipline, and positive habits in children.\n\nChildren are the future of the world. Therefore, education is of great importance to them. Their knowledge and abilities will keep the world alive and prosperous. For this reason, please ensure that your children receive a proper education. 'No Knowledge Without College.'"
    ],
    keywords: ['principal', 'headmaster', 'faizan ansari', 'faizan ahmad', 'principal message'],
    aliases: ['principal message', 'message from principal', 'who is the principal', 'faizan ansari message'],
    links: [{ label: 'About the Principal', href: '/about.html#leadership', variant: 'primary' }],
  },

  // ── FACULTY ───────────────────────────────────────────────────────────────
  {
    id: 'faculty',
    title: 'Our Teachers & Faculty',
    intent: 'overview',
    summary: 'NPS has 25+ qualified, experienced educators who are mentors, role models, and lifelong learners — the true backbone of the NPS experience.',
    details: [
      'Qualified, certified educators with years of teaching experience across all subjects and grade levels.',
      'Caring mentors who nurture each student\'s emotional and intellectual growth.',
      'Trained in smart classroom technology, digital-age pedagogy, and activity-based learning methods.',
      'Continuous professional development — teachers attend regular training workshops to stay current.',
      '25+ expert teachers serving 600+ students across 11 grade levels.',
    ],
    keywords: ['teachers', 'faculty', 'staff', 'educators', 'mentor', 'teaching staff', 'how many teachers', 'qualified'],
    aliases: ['how many teachers', 'are teachers good', 'teacher quality', 'experienced teachers'],
    links: [{ label: 'Our Faculty', href: '/about.html#faculty', variant: 'primary' }],
  },

  // ── STATS ─────────────────────────────────────────────────────────────────
  {
    id: 'stats',
    title: 'School at a Glance',
    intent: 'overview',
    summary: 'NPS by the numbers: 600+ happy students, 25+ expert teachers, 11 grade levels, 100% English medium.',
    details: [
      '600+ happy students currently enrolled.',
      '25+ expert, qualified teachers.',
      '11 grade levels — from Playgroup to Grade 10.',
      '100% English medium instruction throughout.',
      '10+ years of excellence in education.',
    ],
    keywords: ['stats', 'statistics', 'how many students', 'strength', 'size', 'numbers', 'at a glance', 'enrollment'],
    aliases: ['how many students', 'school size', 'student strength', 'numbers'],
    links: [{ label: 'About NPS', href: '/about.html#stats', variant: 'primary' }],
  },

  // ── ADMISSIONS ────────────────────────────────────────────────────────────
  {
    id: 'admissions',
    title: 'Admissions 2026–27',
    intent: 'admissions',
    summary: 'Admissions for the 2026–27 academic session are now open. Seats are limited — 75% already filled! Early application is strongly encouraged.',
    details: [
      'Admissions are OPEN for 2026-27. 75% of seats are already filled — don\'t wait!',
      'Step 1 — Enquiry Form: Complete and submit the Admission Enquiry Form online or at the school office.',
      'Step 2 — Document Submission: Bring all required documents to the admissions desk.',
      'Step 3 — Interaction or Assessment: The child attends a brief, friendly session with school staff.',
      'Step 4 — Final Confirmation: The admissions team contacts the parent to confirm the seat.',
      'The team will contact you within 24 hours of form submission.',
    ],
    keywords: ['admission', 'admissions', 'apply', 'enroll', 'enrol', 'seat', 'seats', 'form', 'enquiry', '2026', '2027', 'open', 'registration'],
    aliases: ['i want admission', 'how do i apply', 'admission process', 'join school', 'how to enroll', 'get admission'],
    links: [
      { label: 'Apply Now', href: '/admissions.html', variant: 'primary' },
      { label: 'Admission Form', href: '/admissions.html#apply-form' },
      { label: 'Call Office', href: 'tel:9918225511' },
    ],
    related: ['documents', 'fees', 'timings', 'age'],
  },

  // ── AGE CRITERIA ──────────────────────────────────────────────────────────
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
      'Grades 2 to 10: Admissions are based on standard age progression and successful completion of the previous academic year.',
      'All ages are calculated as of April 1, 2026.',
    ],
    keywords: ['age', 'criteria', 'eligible', 'eligibility', 'dob', 'date of birth', 'april', 'age limit', 'minimum age', 'how old'],
    aliases: ['age limit', 'minimum age', 'child age', 'my child age', 'what age for playgroup', 'age requirement'],
    links: [{ label: 'Eligibility Details', href: '/admissions.html#eligibility', variant: 'primary' }],
  },

  // ── CLASSES OFFERED ───────────────────────────────────────────────────────
  {
    id: 'classes',
    title: 'Classes Offered',
    intent: 'academics',
    summary: 'NPS offers a full range of classes from Playgroup and Nursery through KG and up to Grade 10.',
    details: [
      'Early Childhood: Playgroup, Nursery, KG I, and KG II.',
      'Primary School: Grades 1 through 5.',
      'Middle School: Grades 6 through 8.',
      'Secondary School: Grades 9 and 10.',
      'All classes are English medium under the National Curriculum.',
    ],
    keywords: ['classes', 'class', 'grade', 'grades', 'playgroup', 'nursery', 'kg', 'primary', 'middle', 'secondary', 'grade 10', 'grade 9', 'standard', 'which grades'],
    aliases: ['which classes', 'class available', 'grades available', 'standards offered', 'do you have grade 10', 'upto which grade'],
    links: [
      { label: 'Academics', href: '/academics.html', variant: 'primary' },
      { label: 'Admissions', href: '/admissions.html' },
    ],
  },

  // ── DOCUMENTS ─────────────────────────────────────────────────────────────
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
      'Vaccination or medical record (optional but recommended).',
    ],
    keywords: ['documents', 'document', 'certificate', 'birth', 'photo', 'photograph', 'aadhaar', 'aadhar', 'tc', 'transfer', 'report card', 'address proof', 'papers', 'required'],
    aliases: ['what papers', 'required papers', 'admission documents', 'what to bring', 'documents needed'],
    links: [
      { label: 'Eligibility', href: '/admissions.html#eligibility', variant: 'primary' },
      { label: 'Apply Now', href: '/admissions.html#apply-form' },
    ],
  },

  // ── ENTRANCE TEST ─────────────────────────────────────────────────────────
  {
    id: 'entrance',
    title: 'Entrance Test & Assessment',
    intent: 'admissions',
    summary: 'NPS does not conduct a formal entrance examination. A friendly interaction session is used for younger grades.',
    details: [
      'For Playgroup, Nursery, and KG: a brief, informal interaction with the child in a relaxed setting — no written test required.',
      'For Grades 1–5: a short written assessment in basic English and Mathematics to help place the child in the right learning group.',
      'For Grades 6–10: a basic subject assessment may be conducted to ensure proper grade placement.',
      'The assessment is designed to be stress-free and child-friendly — used for placement, not rejection.',
      'Parents must attend a brief orientation session before final confirmation of admission.',
    ],
    keywords: ['entrance', 'test', 'exam', 'assessment', 'interview', 'screening', 'evaluation', 'written test', 'entrance exam'],
    aliases: ['is there an entrance test', 'entrance exam', 'admission test', 'do you take exam', 'is there a test'],
    links: [
      { label: 'Admission Process', href: '/admissions.html', variant: 'primary' },
      { label: 'Contact Office', href: '/contact.html' },
    ],
  },

  // ── FEES ──────────────────────────────────────────────────────────────────
  {
    id: 'fees',
    title: 'Fee Structure',
    intent: 'fees',
    summary: 'Detailed fee information is not published online. Please contact the school office for the current fee schedule.',
    details: [
      'For the complete fee structure, visit the school office or call 991-822-5511.',
      'NPS believes quality education should be accessible — scholarship and concession options may be available.',
      'Office hours: Monday–Friday 8:00 AM–3:00 PM, Saturday 8:00 AM–1:00 PM.',
    ],
    keywords: ['fee', 'fees', 'cost', 'price', 'charges', 'scholarship', 'payment', 'concession', 'monthly fee', 'annual fee', 'how much'],
    aliases: ['school fees', 'admission fee', 'monthly fee', 'how much cost', 'fee structure', 'what are the fees'],
    links: [
      { label: 'Contact Office', href: '/contact.html', variant: 'primary' },
      { label: 'Call 991-822-5511', href: 'tel:9918225511' },
    ],
  },

  // ── CURRICULUM / ACADEMICS OVERVIEW ──────────────────────────────────────
  {
    id: 'academics',
    title: 'Curriculum & Teaching Methods',
    intent: 'academics',
    summary: 'NPS follows the National Curriculum from Playgroup to Grade 10 — a holistic programme blending modern pedagogy with timeless values.',
    details: [
      'Curriculum structure: Four progressive stages — Early Childhood → Primary → Middle School → Secondary (up to Grade 10).',
      'Activity-based and inquiry-driven learning across all grades.',
      'Communicative English instruction with emphasis on spoken fluency from the earliest classes.',
      'Creative expression — art, music, drama, and public speaking — integrated throughout.',
      'Continuous and comprehensive assessment, minimising exam-only pressure.',
      'Science comes alive through laboratory experiments, observation, and discovery.',
    ],
    keywords: ['academics', 'academic', 'curriculum', 'syllabus', 'study', 'subjects', 'learning', 'assessment', 'national curriculum', 'teaching', 'education'],
    aliases: ['what curriculum', 'how do students learn', 'education system', 'what subjects', 'academic program'],
    links: [{ label: 'Explore Academics', href: '/academics.html', variant: 'primary' }],
  },

  // ── SUBJECTS BY STAGE ────────────────────────────────────────────────────
  {
    id: 'subjects',
    title: 'Subjects by Grade Stage',
    intent: 'academics',
    summary: 'Subjects are carefully selected for each stage to build knowledge progressively from Early Childhood through Secondary.',
    details: [
      'Early Childhood (Playgroup–KG II): English Language, Maths, Environmental Studies, Hindi, Art & Craft, Physical Education.',
      'Primary (Grades 1–5): English, Mathematics, Science, Social Studies, Hindi, Computer, General Knowledge (GK).',
      'Middle School (Grades 6–8): English Literature, Mathematics, Physics, Chemistry, Biology, History, Geography, Hindi.',
      'Secondary (Grades 9–10): English, Mathematics, Science, Social Science, Hindi, Computer Science.',
    ],
    keywords: ['subjects', 'subject', 'english', 'maths', 'mathematics', 'science', 'hindi', 'computer', 'physics', 'chemistry', 'biology', 'history', 'geography', 'gk'],
    aliases: ['what subjects are taught', 'which subjects', 'school subjects', 'do you teach science', 'is there computer class'],
    links: [{ label: 'Academics Page', href: '/academics.html', variant: 'primary' }],
  },

  // ── TEACHING METHODOLOGY ─────────────────────────────────────────────────
  {
    id: 'teaching-methods',
    title: 'Teaching Methods & Learning Philosophy',
    intent: 'academics',
    summary: 'NPS uses 6 proven teaching methods to ensure no child is left behind and every learner thrives.',
    details: [
      '01 — Activity-Based Learning: Hands-on experiments, group projects, and real-world problem solving.',
      '02 — Child-Centred Approach: Personalized attention recognises each child\'s unique learning style.',
      '03 — Communicative Learning: English-medium instruction with emphasis on spoken fluency and confident expression.',
      '04 — Inquiry-Based Science: Lab experiments and observation that nurture analytical thinking.',
      '05 — Creative Expression: Art, music, drama, and writing integrated into the curriculum.',
      '06 — Continuous Assessment: Regular formative assessments to identify learning gaps early.',
    ],
    keywords: ['teaching', 'method', 'approach', 'learning', 'activity', 'child centered', 'communicative', 'inquiry', 'assessment', 'creative', 'methodology', 'pedagogy'],
    aliases: ['how do you teach', 'teaching method', 'learning approach', 'classroom methods'],
    links: [{ label: 'Our Approach', href: '/academics.html#methodology', variant: 'primary' }],
  },

  // ── SMART CLASSROOMS ─────────────────────────────────────────────────────
  {
    id: 'facilities',
    title: 'Smart Classrooms & Facilities',
    intent: 'facilities',
    summary: 'Every classroom at NPS is equipped with smart technology — LED Interactive Smart Boards, multimedia learning modules, and campus-wide high-speed internet.',
    details: [
      'LED Interactive Smart Boards in every classroom for immersive, visual learning.',
      'Multimedia learning modules aligned with the National Curriculum.',
      'Campus-wide high-speed internet connectivity.',
      'Gamified learning apps and digital assessments.',
      'Dedicated activity spaces for arts, sports, and co-curricular programmes.',
      'CCTV surveillance and trained security throughout the campus.',
    ],
    keywords: ['facilities', 'facility', 'infrastructure', 'smart classroom', 'smart class', 'classroom', 'led', 'technology', 'computer', 'lab', 'labs', 'campus', 'digital', 'interactive', 'board'],
    aliases: ['computer lab', 'do you have labs', 'school building', 'campus facilities', 'smart board', 'what facilities', 'infrastructure'],
    links: [
      { label: 'Smart Classrooms', href: '/academics.html#smart', variant: 'primary' },
      { label: 'Gallery', href: '/gallery.html' },
    ],
  },

  // ── CO-CURRICULAR ACTIVITIES ──────────────────────────────────────────────
  {
    id: 'sports',
    title: 'Sports & Co-Curricular Activities',
    intent: 'sports',
    summary: 'NPS offers 8 vibrant co-curricular categories — from sports and music to debates and environmental clubs.',
    details: [
      '🏆 Academic Competitions: Olympiads, quizzes, and inter-school competitions.',
      '⚽ Sports & Athletics: Cricket, football, badminton, athletics, and general physical education.',
      '🎨 Art & Craft: Painting, drawing, pottery, and creative design.',
      '🎭 Drama & Theatre: Plays, skits, and annual cultural performances.',
      '🎵 Music & Dance: Classical, folk, and contemporary music and dance.',
      '🗣️ Public Speaking: Debates, speeches, and elocution competitions.',
      '📚 Book Club & Reading: Fostering a love for literature and storytelling.',
      '🌿 Environmental Club: Eco-awareness, gardening, and sustainability projects.',
    ],
    keywords: ['sports', 'ground', 'athletics', 'cricket', 'football', 'badminton', 'games', 'activity', 'activities', 'dance', 'music', 'drama', 'art', 'club', 'debate', 'elocution', 'co curricular', 'extracurricular', 'olympiad'],
    aliases: ['playground', 'sports facilities', 'co curricular', 'extra curricular', 'what activities', 'does school have sports'],
    links: [
      { label: 'Co-Curricular Activities', href: '/academics.html#cocurricular', variant: 'primary' },
      { label: 'Sports Gallery', href: '/gallery.html' },
    ],
  },

  // ── SAFETY ───────────────────────────────────────────────────────────────
  {
    id: 'safety',
    title: 'Safety & Security',
    intent: 'safety',
    summary: 'Student safety is a non-negotiable priority at NPS. The campus is secured with multiple layers of protection.',
    details: [
      'CCTV surveillance covers all key areas of the campus.',
      'Trained security personnel are present throughout school hours.',
      'Strict visitor protocols ensure only authorised individuals can access the premises.',
      'Child-safe infrastructure and a nurturing environment for every student.',
    ],
    keywords: ['safety', 'safe', 'security', 'secure', 'cctv', 'visitor', 'protocol', 'child safe', 'is it safe', 'protection'],
    aliases: ['is school safe', 'security facilities', 'child safety', 'cctv cameras', 'school security'],
    links: [{ label: 'Contact & FAQ', href: '/contact.html#faq', variant: 'primary' }],
  },

  // ── TRANSPORT ─────────────────────────────────────────────────────────────
  {
    id: 'transport',
    title: 'Transport & Bus Service',
    intent: 'transport',
    summary: 'NPS provides a transport facility for students. For specific routes and area coverage, please contact the school office directly.',
    details: [
      'Route and pickup details are updated each academic session.',
      'Call 991-822-5511 or visit the office for the current list of routes and stops.',
      'Office hours: Monday–Friday 8:00 AM–3:00 PM, Saturday 8:00 AM–1:00 PM.',
    ],
    keywords: ['transport', 'bus', 'van', 'route', 'pickup', 'drop', 'vehicle', 'cab', 'conveyance'],
    aliases: ['school bus', 'bus route', 'van facility', 'pickup service', 'is there transport', 'how to reach school'],
    links: [
      { label: 'Contact Office', href: '/contact.html#faq', variant: 'primary' },
      { label: 'Call Now', href: 'tel:9918225511' },
    ],
  },

  // ── CONTACT ───────────────────────────────────────────────────────────────
  {
    id: 'contact',
    title: 'Contact Information',
    intent: 'contact',
    summary: 'You can reach NPS by phone, WhatsApp, email, or by visiting the school campus directly.',
    details: [
      'Phone: 991-822-5511.',
      'Email: info@nirmaanpublicschool.in.',
      'Address: Aliganj Bazar, Sultanpur, Uttar Pradesh 227805.',
      'No prior appointment is needed for a visit during office hours.',
      'WhatsApp: Chat directly with the admissions team via the link below.',
    ],
    keywords: ['contact', 'phone', 'call', 'email', 'address', 'location', 'directions', 'whatsapp', 'visit', 'where', 'reach', 'number'],
    aliases: ['where is school', 'contact number', 'school address', 'how to reach', 'school phone number', 'email school'],
    links: [
      { label: 'Contact Page', href: '/contact.html', variant: 'primary' },
      { label: '💬 WhatsApp', href: 'https://api.whatsapp.com/send/?phone=919918225511&text&type=phone_number&app_absent=0' },
      { label: 'Call', href: 'tel:9918225511' },
      { label: 'Email', href: 'mailto:info@nirmaanpublicschool.in' },
    ],
  },

  // ── TIMINGS ───────────────────────────────────────────────────────────────
  {
    id: 'timings',
    title: 'Office Hours & School Timings',
    intent: 'timings',
    summary: 'The school office is open Monday to Friday, 8:00 AM–3:00 PM, and on Saturday, 8:00 AM–1:00 PM.',
    details: [
      'Monday–Friday: 8:00 AM to 3:00 PM.',
      'Saturday: 8:00 AM to 1:00 PM.',
      'Closed on Sundays and public holidays.',
      'Parents are welcome to walk in during office hours for enquiries, campus tours, or meetings with staff.',
      'No prior appointment is required for a general visit.',
    ],
    keywords: ['timing', 'timings', 'time', 'office hours', 'school timings', 'open', 'closed', 'sunday', 'holiday', 'visit hours', 'working hours', 'when'],
    aliases: ['when open', 'school time', 'office time', 'visiting hours', 'school schedule', 'what time'],
    links: [{ label: 'Contact', href: '/contact.html', variant: 'primary' }],
  },

  // ── GALLERY ───────────────────────────────────────────────────────────────
  {
    id: 'gallery',
    title: 'School Gallery',
    intent: 'gallery',
    summary: 'The NPS Gallery is a visual showcase of campus life — from smart classrooms and annual day celebrations to sports events.',
    details: [
      'Browse media by category: Campus Tour, Annual Day, Sports, Photos, and Videos.',
      'Includes photo highlights, event recordings, and campus tour videos.',
      'Updated regularly with new events and school milestones.',
      'Also follow us on Instagram, Facebook, and YouTube for the latest school moments.',
    ],
    keywords: ['gallery', 'photo', 'photos', 'image', 'images', 'video', 'videos', 'event', 'events', 'annual day', 'campus tour', 'pictures', 'see school'],
    aliases: ['show gallery', 'school photos', 'campus video', 'events photos', 'see pictures'],
    links: [{ label: 'Open Gallery', href: '/gallery.html', variant: 'primary' }],
  },

  // ── NEWS & NOTICES ────────────────────────────────────────────────────────
  {
    id: 'news',
    title: 'News & Notices',
    intent: 'overview',
    summary: 'The school shares updates, event announcements, and notices through its website and social media channels.',
    details: [
      'Current notice: Admissions Open for the 2026–27 academic session — limited seats, 75% already filled.',
      'Follow the school on Instagram, Facebook, and YouTube for the latest events, results, and campus updates.',
      'Visit the Contact page for the most recent announcements.',
    ],
    keywords: ['news', 'notice', 'notices', 'announcement', 'updates', 'latest', 'current', 'events'],
    aliases: ['school news', 'latest notice', 'announcements', 'any updates', 'what is happening'],
    links: [
      { label: 'Contact', href: '/contact.html', variant: 'primary' },
      { label: 'Gallery', href: '/gallery.html' },
    ],
  },

  // ── SOCIAL MEDIA ──────────────────────────────────────────────────────────
  {
    id: 'social',
    title: 'Social Media & Online Presence',
    intent: 'contact',
    summary: 'Stay connected with NPS on social media for the latest updates, event photos, campus videos, and school news.',
    details: [
      '💬 WhatsApp: Chat directly with the school admissions team.',
      '📸 Instagram: @nirmaan_public_school — daily highlights and student moments.',
      '📘 Facebook: Nirmaan Public School Aliganj — events, notices, and announcements.',
      '▶️ YouTube: @nirmanpublicschoolaliganj4860 — campus tours, annual day videos, and more.',
    ],
    keywords: ['social media', 'social', 'instagram', 'facebook', 'youtube', 'whatsapp', 'follow', 'online', 'channel', 'video', 'videos', 'connect', 'media', 'subscribe'],
    aliases: ['school instagram', 'school facebook', 'school youtube', 'whatsapp number', 'follow school', 'social links', 'online presence', 'find you online'],
    links: [
      { label: '💬 WhatsApp', href: 'https://api.whatsapp.com/send/?phone=919918225511&text&type=phone_number&app_absent=0', variant: 'primary' },
      { label: '📸 Instagram', href: 'https://www.instagram.com/nirmaan_public_school/' },
      { label: '📘 Facebook', href: 'https://www.facebook.com/nirmaan.public.school.aliganj/' },
      { label: '▶️ YouTube', href: 'https://www.youtube.com/@nirmanpublicschoolaliganj4860/videos' },
    ],
  },

];
