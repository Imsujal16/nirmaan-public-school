const contactLine = 'For the most accurate current information, please contact the school office at 991-822-5511.';

const publicPages = [
  { label: 'Home', href: '/index.html' },
  { label: 'About Us', href: '/about.html' },
  { label: 'Academics', href: '/academics.html' },
  { label: 'Admissions', href: '/admissions.html' },
  { label: 'Contact Us', href: '/contact.html' },
  { label: 'Gallery', href: '/gallery.html' }
];

const restrictedKeywords = [
  'admin',
  'dashboard',
  'cms',
  'login',
  'password',
  'database',
  'student record',
  'student records',
  'private',
  'backend',
  'panel',
  'edit notice',
  'upload',
  'delete',
  'manage'
];

const topics = [
  {
    id: 'overview',
    title: 'School Overview',
    keywords: ['school', 'overview', 'about', 'nirmaan', 'nps', 'medium', 'english', 'tagline', 'motto'],
    answer: 'Nirmaan Public School is an English-medium school in Aliganj Bazar, Sultanpur, Uttar Pradesh. The school offers education from Playgroup to Grade 10 under the National Curriculum, with a focus on quality education, smart classrooms, character building, and holistic development. The school tagline is Learn · Grow · Succeed.',
    links: ['/index.html', '/about.html']
  },
  {
    id: 'contact',
    title: 'Contact Details',
    keywords: ['contact', 'phone', 'call', 'mobile', 'email', 'whatsapp', 'address', 'location', 'where', 'visit', 'directions'],
    answer: 'You can contact Nirmaan Public School at 991-822-5511. The public email address is info@nirmaanpublicschool.in. The school is located at Aliganj Bazar, Sultanpur, Uttar Pradesh 227805. Parents are welcome to visit during office hours.',
    links: ['/contact.html']
  },
  {
    id: 'hours',
    title: 'Office Hours and School Visits',
    keywords: ['school timings', 'office hours', 'visiting hours', 'hours', 'timing', 'timings', 'time', 'open', 'closed', 'sunday', 'holiday', 'visit', 'appointment', 'tour'],
    answer: 'Office hours are Monday to Friday from 8:00 AM to 3:00 PM, and Saturday from 8:00 AM to 1:00 PM. The office is closed on Sundays and public holidays. Parents can visit during office hours for a campus tour, faculty interaction, or admission enquiry. No appointment is mentioned as required on the public website.',
    links: ['/contact.html']
  },
  {
    id: 'admissions',
    title: 'Admissions 2026-27',
    keywords: ['admission', 'admissions', 'apply', 'enroll', 'enrol', 'enquiry', 'form', 'seat', 'seats', '2026', '2027'],
    answer: 'Admissions are open for the 2026-27 academic session with limited seats. The process is: fill the enquiry form online or visit the school office, submit required documents, attend an interaction session or assessment where applicable, then confirm admission and pay the applicable fees. The admissions team says they will contact parents soon after the enquiry is submitted.',
    links: ['/admissions.html']
  },
  {
    id: 'classes',
    title: 'Classes Offered',
    keywords: ['class', 'classes', 'grade', 'grades', 'playgroup', 'nursery', 'kg', 'kindergarten', 'primary', 'middle', 'secondary'],
    answer: 'Nirmaan Public School offers Playgroup, Nursery, KG I, KG II, and Grade 1 through Grade 10. The academic stages are Early Childhood, Primary School, Middle School, and Secondary School.',
    links: ['/index.html', '/academics.html', '/admissions.html']
  },
  {
    id: 'age',
    title: 'Admission Age Criteria',
    keywords: ['age', 'criteria', 'eligible', 'eligibility', 'birth', 'dob', 'april'],
    answer: 'The admission age criteria shown on the public website is as of April 1, 2026: Playgroup 3-4 years, Nursery 4-5 years, KG I 5-6 years, KG II 6-7 years, Grade 1 7-8 years, and Grade 2-10 based on age plus previous grade.',
    links: ['/admissions.html#eligibility']
  },
  {
    id: 'documents',
    title: 'Admission Documents',
    keywords: ['document', 'documents', 'certificate', 'birth certificate', 'photo', 'photograph', 'aadhar', 'aadhaar', 'transfer certificate', 'tc', 'report card', 'address proof', 'vaccination'],
    answer: 'Documents listed for admission are: child birth certificate, 4 recent passport-size photographs, previous school report card or transfer certificate for Grade 2 and above, parent or guardian Aadhaar card photocopy, address proof such as Aadhaar/Voter ID/utility bill, and medical or vaccination record if available.',
    links: ['/admissions.html#eligibility']
  },
  {
    id: 'entrance-test',
    title: 'Entrance Test and Interaction',
    keywords: ['entrance', 'test', 'exam', 'assessment', 'interaction', 'interview', 'orientation'],
    answer: 'There is no formal entrance exam for Playgroup to Grade 5; the public website mentions a friendly interaction. For Grades 6-10, a basic subject assessment may be conducted to ensure proper grade placement. Parents must attend a brief orientation session before final confirmation.',
    links: ['/admissions.html#eligibility', '/contact.html#faq']
  },
  {
    id: 'fees',
    title: 'Fees and Scholarships',
    keywords: ['fee', 'fees', 'cost', 'charges', 'scholarship', 'scholarships', 'concession', 'payment'],
    answer: `The detailed fee structure and scholarship information are not published on the public website. ${contactLine}`,
    links: ['/admissions.html#eligibility', '/contact.html']
  },
  {
    id: 'curriculum',
    title: 'Curriculum',
    keywords: ['curriculum', 'cbse', 'syllabus', 'academic', 'academics', 'study', 'subjects'],
    answer: 'The public website describes the school curriculum as the National Curriculum, covering Playgroup through Grade 10. It is structured across Early Childhood, Primary, Middle, and Secondary stages, with smart classrooms, activity-based learning, continuous assessment, and holistic development.',
    links: ['/academics.html']
  },
  {
    id: 'academics',
    title: 'Academic Stages',
    keywords: ['early childhood', 'primary', 'middle school', 'secondary', 'grade 1', 'grade 5', 'grade 6', 'grade 8', 'grade 9', 'grade 10'],
    answer: 'The academic stages are: Early Childhood Education for Playgroup, Nursery, KG I and KG II; Primary School for Grades 1-5; Middle School for Grades 6-8; and Secondary School for Grades 9-10.',
    links: ['/academics.html']
  },
  {
    id: 'teaching-methods',
    title: 'Teaching Methods',
    keywords: ['teaching', 'method', 'learning', 'activity', 'child centered', 'communicative', 'science', 'assessment', 'creative'],
    answer: 'The school describes its learning philosophy as activity-based learning, child-centered teaching, communicative learning, inquiry-based science, creative expression, and continuous assessment. The aim is to support different learning styles and help students grow without unnecessary pressure.',
    links: ['/academics.html#method']
  },
  {
    id: 'facilities',
    title: 'Facilities and Infrastructure',
    keywords: ['facility', 'facilities', 'infrastructure', 'smart class', 'smart classroom', 'led', 'technology', 'computer', 'lab', 'campus', 'classroom'],
    answer: 'Publicly listed facilities include smart classrooms with LED interactive smart boards, multimedia learning modules, digital instruction, activity spaces, and a safe campus. The website emphasizes technology-powered classrooms and a nurturing learning environment.',
    links: ['/academics.html#smart', '/about.html']
  },
  {
    id: 'safety',
    title: 'Student Safety',
    keywords: ['safe', 'safety', 'security', 'secure', 'cctv', 'visitor', 'protocol', 'child-safe'],
    answer: 'The public website says student safety is a top priority. It mentions CCTV surveillance, trained security personnel at entry points, child-safe infrastructure, and strict visitor protocols.',
    links: ['/index.html', '/contact.html#faq']
  },
  {
    id: 'activities',
    title: 'Co-Curricular Activities',
    keywords: ['activity', 'activities', 'sports', 'art', 'craft', 'music', 'dance', 'drama', 'theatre', 'debate', 'speaking', 'book club', 'environmental club', 'competition'],
    answer: 'Co-curricular activities include academic competitions, sports and athletics, art and craft, drama and theatre, music and dance, public speaking, book club and reading, and environmental club activities.',
    links: ['/academics.html#cocurricular']
  },
  {
    id: 'transport',
    title: 'Transport Facility',
    keywords: ['transport', 'bus', 'route', 'routes', 'pickup', 'drop', 'van'],
    answer: `The public website does not list transport routes or area-wise availability. It asks parents to contact the school office for current transport route information. ${contactLine}`,
    links: ['/contact.html#faq']
  },
  {
    id: 'leadership',
    title: 'Leadership Team',
    keywords: ['founder', 'director', 'manager', 'principal', 'leadership', 'head', 'message', 'story'],
    answer: 'The leadership team listed publicly includes Founder Mr. Rajesh Dubey “Nirmaan” (Advocate), Director Mr. Ajay Kumar Dubey, Manager Mr. Satyendra Panday, and Principal Mr. Faizan Ahmad Ansari. The About page includes leadership messages and the school story.',
    links: ['/about.html']
  },
  {
    id: 'mission-values',
    title: 'Mission, Vision and Values',
    keywords: ['mission', 'vision', 'value', 'values', 'character', 'holistic', 'excellence', 'nurturing'],
    answer: 'The school mission is to provide quality education that shapes strong minds and compassionate character. Publicly listed values include character building, holistic development, a safe and nurturing environment, and academic excellence.',
    links: ['/about.html']
  },
  {
    id: 'stats',
    title: 'School at a Glance',
    keywords: ['students', 'teachers', 'stats', 'number', 'strength', 'how many'],
    answer: 'The About page lists NPS at a glance as 600+ happy students, 25+ expert teachers, 11 grade levels, and 100% English medium education.',
    links: ['/about.html#stats']
  },
  {
    id: 'gallery',
    title: 'Gallery and Events',
    keywords: ['gallery', 'photo', 'photos', 'video', 'videos', 'event', 'events', 'annual day', 'sports day', 'campus tour', 'image', 'images'],
    answer: 'The public Gallery page shows campus tour media, annual day, smart classes, sports, videos, and student life moments. The Contact page says social media is used for updates, events, and school news.',
    links: ['/gallery.html']
  },
  {
    id: 'news-notices',
    title: 'News and Notices',
    keywords: ['news', 'notice', 'notices', 'announcement', 'announcements', 'updates'],
    answer: 'There is no separate public News or Notices page in the current website files. Public notices visible on the site mainly mention Admissions Open 2026-27 and limited seats. For the latest updates, follow the school social media links or contact the office at 991-822-5511.',
    links: ['/contact.html']
  },
  {
    id: 'social',
    title: 'Social Media',
    keywords: ['facebook', 'instagram', 'youtube', 'social', 'follow'],
    answer: 'The public website links to the school on Facebook, Instagram, YouTube, and WhatsApp. The Contact page says social media is used for school updates, events, and news.',
    links: ['/contact.html', '/gallery.html']
  }
];

module.exports = {
  contactLine,
  publicPages,
  restrictedKeywords,
  topics,
  fallbackAnswer: `I can answer questions based only on the public Nirmaan Public School website. I could not find that detail in the public pages. ${contactLine}`
};
