// Site copy. Accuracy notes from the content bank:
// - Lunabotics is design stage only: "designed" / "leading the architecture", never "built" or "deployed".
// - No accuracy number for the ECG project.
// - Sherpa is labeled "HackGT 2026" only (did not place, no role title).

export const profile = {
  first: 'Mario',
  last: 'Sinclair',
  origin: { city: 'Kingston', country: 'Jamaica', code: 'KIN' },
  home: { city: 'Tampa', state: 'FL', code: 'TPA' },
  school: 'University of South Florida',
  degree: 'B.S. Computer Science',
  grad: 'May 2027',
  gpa: '3.81',
  deansList: ['Fall 2023', 'Spring 2024', 'Fall 2024'],
  languages: ['English', 'Japanese'],
  email: 'mario.sinclairbz@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/mario-sinclair/',
    github: 'https://github.com/MarioSinclair',
    resume: '/Mario_Sinclair_Resume.pdf',
  },
  coursework: [
    'Data Structures', 'Algorithms', 'Generative AI (graduate, CIS 6930)', 'Computer Vision', 'Control of Mobile Robots',
    'Software Engineering', 'Operating Systems', 'Embedded Systems', 'Computer Architecture', 'Secure Coding',
    'Object-Oriented Programming', 'AWS Academy Cloud Foundations',
  ],
  interests: [
    { label: 'Investing', text: 'Company deep dives: free cash flow, DCF models, and checking guidance against the numbers.' },
    { label: 'Robotics', text: 'Autonomous navigation, from costmaps to SLAM.' },
    { label: 'Travel', text: 'Sixteen cities so far, with three more booked.' },
    { label: 'Food', text: 'Eating my way through every city I visit.' },
  ],
};

// Hero status board
export const statusBoard = [
  { flight: 'MS26', dest: 'Delta Air Lines', sub: 'Data engineering intern · May to Aug 2026', gate: 'ATL', status: 'LANDED', tone: 'g' },
  { flight: 'MS25', dest: 'USF RARE Lab', sub: 'Robotics research · Sep 2025 to now', gate: 'TPA', status: 'IN FLIGHT', tone: 'y' },
  { flight: 'MS26', dest: 'NASA Lunabotics', sub: 'Leading software architecture · design phase', gate: 'TPA', status: 'BOARDING', tone: 'y', blink: true },
  { flight: 'MS27', dest: 'B.S. Computer Science', sub: 'University of South Florida · GPA 3.81', gate: 'USF', status: 'ON TIME' },
];

// Experience as boarding passes. state: landed | inflight | boarding
export const experience = [
  {
    id: 'delta', flight: 'MS 26', org: 'Delta Air Lines', role: 'Data Engineering Intern', team: 'Compliance System Management',
    from: 'May 26', to: 'Aug 26', dates: 'May to Aug 2026', gate: 'Atlanta, GA', seat: 'Data Eng', extra: ['Fleet', '900+ aircraft'],
    group: 'Summer', state: 'landed',
    highlights: [
      'Built SQL ELT pipelines in Palantir Foundry for maintenance data across 900+ aircraft.',
      'Built SQL data models behind Power BI dashboards for engineering directors, cutting query time by 30%.',
      'Wrote a TypeScript automation that replaced a manual aircraft-bridging workflow, saving about 15 hours a week.',
    ],
    more: [
      'Built a Python data validation framework (schema, null and anomaly checks) that catches bad records before they reach reports.',
      'Migrated three Skywise dashboards (Line Maintenance, Cabin Maintenance, OSR) after their source table was replaced, rewriting the SQL and reconciling every metric against historical results.',
      'Extended a GTF/APU engine status report (Power Automate, Office Scripts) to also track CFM56-7B and CFM56-5B engines.',
      'Rebuilt a broken maintenance programs report in Pipeline Builder, joining in alternate stock numbers from component relationship datasets.',
      'Fixed broken automations other teams relied on, including a weekly tool with a swapped variable assignment and broken row incrementing.',
      'Wrote Excel Office Scripts macros for an engine team (serial-number fixes, part filtering, duplicate detection) and documented each tool.',
      'Used Kiro for AI-assisted development of Python tools, including a Smartsheet tracker that matches parent and child engine records.',
    ],
    stack: ['Palantir Foundry', 'Pipeline Builder', 'Skywise', 'SQL', 'Python', 'TypeScript', 'Power BI', 'Power Automate'],
  },
  {
    id: 'rare', flight: 'MS 25', org: 'USF RARE Lab', role: 'Undergraduate Research Assistant', team: 'Reality, Autonomy and Robot Experience Lab',
    from: 'Sep 25', to: 'Now', dates: 'Sep 2025 to now', gate: 'Tampa, FL', seat: 'Research', extra: ['Robots', 'Go2 · Fetch · R1'],
    group: 'Research', state: 'inflight',
    highlights: [
      'Building projected AR (CompenHR projector compensation) for uneven surfaces, mounted on a Fetch, a Unitree Go2 and a Unitree R1.',
      'Built a ROS2/Nav2 navigation stack on a Unitree Go2 robot dog, reaching 70% success across 10 physical-robot trials.',
      'Wrote a C++ ROS1 action server and client that moves the Fetch a set distance using odometry, tested in Gazebo first.',
    ],
    more: [
      'Debugged CycloneDDS/UDP networking between the Go2’s onboard Jetson and lab machines, and containerized remote RViz2 with Docker over SSH.',
      'Built and ran a fog-screen projection system for search-and-rescue displays.',
    ],
    stack: ['ROS2', 'Nav2', 'ROS1', 'C++', 'Python', 'Docker', 'Gazebo', 'CycloneDDS'],
  },
  {
    id: 'lunabotics', flight: 'MS 26', org: 'NASA Lunabotics · IEEE RAS', role: 'Software Team, Architecture Lead', team: 'Autonomous lunar excavation robot',
    from: 'Aug 26', to: 'Now', dates: 'Aug 2026 to now', gate: 'Tampa, FL', seat: 'Software', extra: ['Phase', 'Design'],
    group: 'Design', state: 'boarding',
    highlights: [
      'Leading software architecture for an autonomous lunar excavation robot, with a team of about 5.',
      'Helped define the software subsystems (3 modules, 9 units) and designed the ROS 2 node and topic graph.',
      'Drove the core stack decisions: ROS 2 on a Jetson Orin Nano Super, micro-ROS motor control, FAST-LIO2 LiDAR SLAM and Gazebo simulation.',
    ],
    more: [],
    stack: ['ROS 2 Humble', 'micro-ROS', 'FAST-LIO2', 'Nav2', 'RealSense', 'Gazebo Fortress'],
  },
];

// Projects for the ticket kiosk. kind: live | award | progress | build
export const projects = [
  {
    id: 'sherpa', code: 'SHP', name: 'Sherpa', tagline: 'Safe night-walking navigation', when: 'Sep 2026', context: 'HackGT 2026', kind: 'live', badge: 'Live',
    points: [
      'Custom weighted Dijkstra routing over a 10,600-edge campus graph (OSMnx, NetworkX), built from 3,637 streetlights, 806 sidewalk segments, 307 ADA entrances and 122 emergency towers in Georgia Tech GIS data.',
      'Safest routes cut poorly lit walking by 63% (187 m to 69 m) for a median +8.5% distance across 80 random trips.',
      'Fixed map data errors (entrances for 18 buildings, 20 stairs-only doors, 4.3 km of restored paths), raising stair-free routes from 67% to 80% across 351 routes.',
      'Flask REST API (10 endpoints), Supabase PostgreSQL with Row Level Security and .edu-only sign-in, live bus arrivals every 3 seconds, Meta Muse Spark with a Claude fallback, and turn-by-turn voice navigation with rerouting.',
    ],
    note: 'Two-person team. I built all of the software; my teammate built the landing page and demo.',
    stack: ['Python', 'Flask', 'NetworkX', 'OSMnx', 'Supabase', 'MapLibre GL', 'JavaScript', 'Render'],
    links: [{ label: 'Live site', href: 'https://appsherpa.tech' }, { label: 'GitHub', href: 'https://github.com/MarioSinclair/Sherpa' }],
  },
  {
    id: 'triagebot', code: 'TRG', name: 'TriageBot', tagline: 'LLM agent for bug triage', when: 'Oct 2026', context: 'Research lab tooling', kind: 'build', badge: 'New',
    points: [
      'LLM agent with tool use on the Claude API that sorts a research lab’s GitHub issues by category (3D CAD, electrical, paperwork, documentation, software) and severity, and flags duplicates.',
      'Tested on about 300 closed issues: 78% top-1 and 80% top-3 category accuracy, 97% duplicate detection.',
    ],
    stack: ['Claude API', 'Tool use', 'LLM evaluation'],
    links: [],
  },
  {
    id: 'ppe', code: 'PPE', name: 'PPE Checkpoint', tagline: 'Real-time safety gate', when: 'Sep 2026', context: 'Hackathon', kind: 'build', badge: 'Hackathon',
    points: [
      'Face recognition identifies the worker, a YOLO11 model checks 4 PPE items (hardhat, vest, gloves, safety glasses), and a Raspberry Pi servo gate opens only when everything is confirmed.',
      'Custom dataset with 1,200+ hand-labeled bounding boxes; YOLO11s fine-tuned for 60 epochs; about 20 FPS on a laptop CPU.',
      'Fail-closed state machine with timeouts and 5-frame confirmation per item, spoken feedback naming the missing item, and a FastAPI + SQLite dashboard logging every check.',
    ],
    note: 'I built the ML and software side; a teammate built the gate hardware.',
    stack: ['YOLO11', 'Face recognition', 'FastAPI', 'SQLite', 'Raspberry Pi'],
    links: [],
  },
  {
    id: 'equibull', code: 'EQB', name: 'EquiBull AI', tagline: 'Credit readiness platform', when: 'Oct 2025', context: 'InnoTech AI Hackathon (NSBE 2025)', kind: 'award', badge: '2nd place',
    points: [
      'Credit readiness platform built on 1,000+ HMDA mortgage records (Python, R), with a fine-tuned Gemini 2.5 Flash model on Vertex AI and Tableau/Power BI dashboards.',
      'I worked on the data pipeline, model fine-tuning and API integration.',
    ],
    stack: ['Python', 'R', 'Gemini 2.5 Flash', 'Vertex AI', 'Tableau', 'Power BI'],
    links: [],
  },
  {
    id: 'ecg', code: 'ECG', name: 'ECG Classification', tagline: 'Comparing ECG classifiers', when: 'Fall 2025', context: 'Coursework', kind: 'build', badge: 'ML',
    points: [
      'Trained and compared ECG classifiers in PyTorch on 83,736 images and 65,425 signal segments (ResNet18 transfer learning, ECG-FM with LoRA and adapters).',
      'Caught a frozen model predicting one class 90% of the time and fixed it to a balanced 46/54 split with end-to-end training.',
    ],
    stack: ['PyTorch', 'ResNet18', 'ECG-FM', 'LoRA'],
    links: [],
  },
  {
    id: 'vida', code: 'VDA', name: 'VIDA', tagline: 'Medication dispenser prototype', when: '2026 to now', context: 'Hardware prototype', kind: 'progress', badge: 'In progress',
    points: [
      'Tabletop pill dispenser with ESP32 firmware and a Raspberry Pi 5 host, I2C sensors, a load cell, and stepper and servo motors.',
      'Wrote the hardware build plan and software spec.',
    ],
    stack: ['ESP32', 'Raspberry Pi 5', 'I2C', 'Stepper + servo'],
    links: [],
  },
  {
    id: 'nsbe', code: 'NSB', name: 'USF NSBE Website', tagline: 'Chapter site for 300+ members', when: 'Jan 2025 to now', context: 'NSBE at USF', kind: 'live', badge: 'Live', image: 'nsbe',
    points: ['Led a 2-person team building the site for a 300+ member chapter, with continuous deployment on Vercel.'],
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    links: [{ label: 'usfnsbe.com', href: 'https://www.usfnsbe.com/' }, { label: 'GitHub', href: 'https://github.com/MarioSinclair/NSBE-LandingPage' }],
  },
  {
    id: 'memecrafter', code: 'MEM', name: 'MemeCrafter', tagline: 'Multimodal caption generator', when: 'Fall 2025', context: 'With Lovesh Kumar', kind: 'build', badge: 'ML',
    points: ['Multimodal meme caption generator built with teammate Lovesh Kumar: EasyOCR + BLIP-2 + GPT-2 with LoRA fine-tuning.'],
    stack: ['EasyOCR', 'BLIP-2', 'GPT-2', 'LoRA'],
    links: [],
  },
  {
    id: 'optionscope', code: 'OPT', name: 'OptionScope', tagline: 'Options pricing tool', when: 'May 2025 to now', context: 'Personal project', kind: 'build', badge: 'Side project',
    points: [
      'Black-Scholes pricing with Greeks visualizations (Python, FastAPI/Flask, NumPy, React, Chart.js).',
      'Extended with a PySpark job on Databricks that ingests daily market data and computes prices and Greeks, scheduled by an Apache Airflow DAG that loads results into SQL.',
    ],
    stack: ['Python', 'FastAPI', 'NumPy', 'React', 'Chart.js', 'PySpark', 'Databricks', 'Airflow'],
    links: [],
  },
];


export const crew = [
  {
    id: 'gdg', org: 'Google Developer Group at USF', short: 'GDG', role: 'Finance Chair', dates: 'Jun 2026 to now', logo: 'gdg',
    points: ['868-member chapter.', 'Secured $9K in sponsorships for HackUSF 2026 and DevFest 2025.', 'Led engineering for 450+ attendees across events.'],
  },
  {
    id: 'shpe', org: 'SHPE at USF', short: 'SHPE', role: 'Technical Director', dates: 'Sep 2025 to Apr 2026', logo: 'shpe',
    points: ['Helped organize HackJam and HackaBull, USF’s largest hackathons (410+ participants).', 'Taught an Intro to React workshop to 70+ students.'],
  },
  {
    id: 'nsbe', org: 'NSBE at USF', short: 'NSBE', role: 'Conference Planning Chair', dates: 'Jan 2025 to Apr 2026', logo: 'nsbe',
    points: ['Led national convention planning for 30+ students.', 'Organized a Honeywell workshop (40+).', 'Organized Engineering Expo outreach for 5,000+ K-12 students.'],
  },
];

