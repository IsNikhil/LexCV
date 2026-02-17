import { ResumeData } from "@/app/types/resume";

export const sampleResumeData: ResumeData = {
  personalInfo: {
    name: "Nikhil Shah",
    email: "nikhilrksha@gmail.com",
    phone: "",
    location: "Hammond, LA",
    linkedin: "linkedin.com/in/nikhilsha",
    github: "github.com/IsNikhil",
    website: "nikhilshah.com.np",
  },
  summary:
    "Computer Science student at Southeastern Louisiana University with hands-on experience in full-stack development, embedded systems, and technical support. Passionate about building software that solves real problems — from web apps to autonomous robotics.",
  experience: [
    {
      id: "exp-1",
      company: "Northshore Regional STEM Center",
      title: "Student Engineer",
      startDate: "Aug 2025",
      endDate: "Present",
      location: "Hammond, LA",
      bullets: [
        "Collaborated with engineers and faculty to develop and maintain technical systems and web-based tools.",
        "Configured and troubleshot software and hardware including VR platforms, robotics systems, and Raspberry Pi.",
      ],
    },
    {
      id: "exp-2",
      company: "University Network Administration",
      title: "Client Connectivity Operator",
      startDate: "Aug 2024",
      endDate: "Oct 2024",
      location: "Hammond, LA",
      bullets: [
        "Diagnosed and resolved software, hardware, and network connectivity issues in a production environment.",
        "Documented incidents and resolutions using structured troubleshooting workflows.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "Southeastern Louisiana University",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "Aug 2023",
      endDate: "May 2028",
      gpa: "",
      location: "Hammond, LA",
    },
  ],
  skills: [
    { id: "sk-1", category: "Languages", items: ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "SQL"] },
    { id: "sk-2", category: "Frameworks", items: ["React", "Node.js", "ASP.NET Core"] },
    { id: "sk-3", category: "Tools", items: ["Git", "GitHub", "Linux", "VS Code", "Arduino"] },
  ],
  projects: [
    {
      id: "proj-0",
      name: "LexCV — Resume Builder",
      technologies: "Next.js, TypeScript, Tailwind CSS, html2canvas, jsPDF",
      bullets: [
        "Built a full-stack resume builder with a live two-panel editor and A4 preview that updates in real time as users type.",
        "Implemented one-click PDF export using html2canvas and jsPDF with a DOM-clone strategy for accurate off-screen rendering.",
      ],
    },
    {
      id: "proj-1",
      name: "BloodBridge",
      technologies: "React, TypeScript, ASP.NET Core, SQL Server",
      bullets: [
        "Built a full-stack blood donation platform connecting donors and recipients with RESTful APIs and authentication.",
        "Managed database persistence and deployment following software engineering best practices.",
      ],
    },
    {
      id: "proj-2",
      name: "Autonomous Robotics Systems",
      technologies: "Python, C++, Arduino, Jetson Nano",
      bullets: [
        "Developed autonomous navigation integrating hardware sensors and computer vision pipelines.",
        "Validated real-time decision-making logic across multiple embedded environments.",
      ],
    },
    {
      id: "proj-3",
      name: "Game Projects — Tic-Tac-Toe & Drive-It",
      technologies: "Java, JavaScript, HTML5 Canvas",
      bullets: [
        "Built interactive games using OOP, structured logic, and state management across desktop and browser.",
      ],
    },
  ],
};
