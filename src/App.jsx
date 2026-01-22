import React, { useState, useEffect, useRef } from 'react';
import { 
  Dna, Terminal, Database, Github, Mail, ExternalLink, ChevronRight, 
  Code2, Award, FlaskConical, Microscope, Cpu, Menu, X, MapPin, 
  Phone, CheckCircle2, Sparkles, Send, Loader2, BrainCircuit, 
  Volume2, User, Cloud, Activity, FileText, Layers, Globe, ArrowRight,
  Home, ChevronUp, ChevronDown, Briefcase, Calendar
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { motion, AnimatePresence, useInView } from 'framer-motion'; // Added useInView

// --- CONFIGURATION & CONSTANTS ---
// FIX: Using './' ensures the image loads correctly on GitHub Pages sub-directories
const PROFILE_IMAGE_URL = "./me.png"; 
const apiKey = ""; 

const GENOMIC_DATA = [
  { pos: 0, depth: 45 }, { pos: 100, depth: 52 }, { pos: 200, depth: 89 },
  { pos: 300, depth: 120 }, { pos: 400, depth: 40 }, { pos: 500, depth: 65 },
  { pos: 600, depth: 150 }, { pos: 700, depth: 95 }, { pos: 800, depth: 30 }
];

const summaryBrief = (
  <>
    <span className="font-semibold text-black">Bioinformatics Professional & Pharmacist</span> bridging clinical science and computational data. I aim to redefine the frontier of discovery: using <span className="font-semibold text-black">pharmaceutical insight</span> to frame the essential biological questions and <span className="font-semibold text-black">computational innovation</span> to manifest the data-driven answers that make <span className="font-semibold text-black">precision medicine a reality</span>.
  </>
);

const summaryFull = (
  <>
    I am a <span className="font-bold">Bioinformatics Professional and Pharmacist</span> bridging clinical science and computational data. My career is built on a unique feedback loop: leveraging <span className="font-bold">pharmaceutical expertise</span> to frame critical biological questions and utilising <span className="font-bold">advanced bioinformatics</span> to manifest the data-driven answers that make <span className="font-bold">precision medicine a reality</span>.
    <br /><br />
    I specialise in the development of <span className="font-bold">scalable Single-Cell and NGS workflows</span>, with a focus on transforming complex genomic datasets into <span className="font-bold">actionable therapeutic insights</span>. My goal is to stay at the leading edge of <span className="font-bold">global computational trends</span>—harnessing tools like <span className="font-bold">Nextflow</span> and high-performance pipelines to accelerate discovery and drive the future of personalised healthcare.
  </>
);

const AREAS_OF_EXPERTISE = [
  {
    title: "Genomic Data Science",
    description: "Unraveling cellular heterogeneity through high-dimensional single-cell and spatial transcriptomics to map the fundamental architecture of disease.",
    items: ["Single-Cell RNA-seq", "NGS Workflows", "Spatial Transcriptomics", "Multi-omic Analysis"],
    icon: <Dna className="w-6 h-6" />
  },
  {
    title: "Precision Pharmacology",
    description: "Bridging the gap between molecular mechanisms and therapeutic outcomes to accelerate the discovery of safer, more effective drugs.",
    items: ["Clinical Pharmacology", "Precision Medicine", "Mechanism of Action", "Drug Efficacy & Safety"],
    icon: <FlaskConical className="w-6 h-6" />
  },
  {
    title: "Digital Infrastructure",
    description: "Architecting scalable, secure computational environments that drive digital transformation and ensure reproducibility in research.",
    items: ["Digital Transformation", "Process Optimisation", "Data Governance", "AI/ML Innovation"],
    icon: <Cloud className="w-6 h-6" />
  }
];

const SKILLS = [
  { 
    category: "Languages & Scripting", 
    description: "The syntax of discovery.",
    icon: <Code2 className="w-5 h-5" />, 
    items: ["Python", "R Language", "Bash Scripting", "Linux CLI"] 
  },
  { 
    category: "Bioinformatics Tools", 
    description: "Instruments of precision.",
    icon: <Microscope className="w-5 h-5" />, 
    items: ["Scanpy", "Scarf", "Scanorama", "Nextflow", "Zarr", "Dask"] 
  },
  { 
    category: "Data Environments", 
    description: "Platforms for scale.",
    icon: <Database className="w-5 h-5" />, 
    items: ["Jupyter Notebook", "RStudio", "Conda", "GCP Foundations"] 
  }
];

const PROJECTS = [
  {
    title: "Covid-19 Single-Cell Analysis",
    tools: "Python | Scanpy | Jupyter Notebook",
    desc: "Conducted scRNA-seq downstream analysis on six PBMC samples to identify transcriptomic differences between COVID-19 patients and healthy controls. Engineered a comprehensive pipeline encompassing quality control, dimensionality reduction, clustering, differential expression, and cell-type prediction.",
    tags: ["scRNA-seq", "COVID-19", "Scanpy"]
  },
  {
    title: "Spatial Transcriptomics & scRNA-seq Integration",
    tools: "Python | Scanpy | Scanorama",
    desc: "Integrated spatial datasets with single-cell RNA-seq references using the Scanorama algorithm for accurate batch correction and cell-type mapping. Developed advanced visualisations to map gene expression within original tissue architectures, successfully preserving spatial biological context.",
    tags: ["Spatial", "Integration", "Scanorama"]
  },
  {
    title: "Memory-Efficient scRNA-seq Analysis (Scarf)",
    tools: "Python | Scarf | Zarr | Dask",
    desc: "Optimised analysis for a 10x Genomics 5K PBMC dataset using the Scarf package, leveraging Zarr and Dask for low-memory data chunking. Applied KNN mapping and label transfer techniques to embed target cells onto reference manifolds.",
    tags: ["Big Data", "Dask", "Zarr"]
  },
  {
    title: "Data Visualisation with ggplot2",
    tools: "R | RStudio | ggplot2 | Tidyverse",
    desc: "Generated publication-quality visualisations using the \"Grammar of Graphics\" framework to translate raw data into insightful graphical representations. Executed Exploratory Data Analysis (EDA) utilising distribution plots, correlation analysis, and complex faceted layouts.",
    tags: ["R", "ggplot2", "EDA"]
  }
];

const EXPERIENCE = [
  {
    role: "Scientific Engagement Officer",
    org: "Salmawit Co. Ltd",
    period: "2021 - 2022",
    description: "Synthesised complex clinical trial data and mechanism-of-action studies for healthcare professionals. Evaluated peer-reviewed medical literature and genomic studies to provide technical insights on drug efficacy. Served as a technical liaison, translating biological findings into therapeutic insights for clinical practice."
  },
  {
    role: "Production Supervisor",
    org: "Blue Nile Pharmaceutical Factory",
    period: "2019 - 2021",
    description: "Engineered a 4x increase in manufacturing throughput by optimising production cycles and workflows. Led cross-functional teams to troubleshoot complex bottlenecks during high-volume scaling. Managed end-to-end manufacturing processes in strict adherence to GMP standards."
  },
  {
    role: "Medical Representative",
    org: "Aurobindo Pharma and Bioderma",
    period: "2016 - 2018",
    description: "Communicated technical product features and clinical benefits to healthcare professionals through scientific presentations. Interpreted multidimensional clinical studies to resolve complex medical inquiries regarding therapeutic data. Conducted systematic analysis of healthcare data to identify emerging clinical trends."
  },
  {
    role: "Clinical Pharmacist",
    org: "Sudan Military Hospital & Wenji Pharmacy",
    period: "2015 - 2016",
    description: "Processed and dispensed prescription medications with 100% accuracy, verifying dosages and interactions. Provided clinical counselling to patients on medication use and side effect management to ensure adherence. Monitored pharmaceutical inventory and controlled substances in coordination with medical professionals."
  }
];

const EDUCATION_DATA = [
  {
    degree: "Bachelor of science: Pharmacy",
    school: "NATIONAL RIBAT UNIVERSITY",
    location: "Khartoum, Sudan",
    period: "2010 - 2015",
    details: "Pharmacology, Clinical Pharmacology, Biochemistry, Pharmacognosy, Pharmaceutics, Pharmaceutical Management, Microbiology, Organic Chemistry and Analytical Chemistry."
  }
];

const CERTIFICATES_PARTS = [
  {
    title: "Bioinformatics & Computational Science",
    items: [
      "Bioinformatics for Biologists: Linux, BASH Scripting, and R",
      "Kaggle Python Certification: Data science syntax and structures",
      "Introduction to Bioinformatics: Genomic analysis and sequence processing",
      "Google Cloud Digital Leader (Badge): Foundational cloud transformation, infrastructure, and AI/ML innovation",
      "National Bioinformatics Infrastructure Sweden (NBIS): Workshops and Training"
    ]
  },
  {
    title: "Pharmaceutical Operations & Strategy",
    items: [
      "Drug Information Resources: Evidence-based research and clinical databases",
      "Total Quality Management: Process optimisation and quality standards",
      "Basic Pharmaceutical Marketing: Strategic communication and product positioning"
    ]
  }
];

const ADDITIONAL_INFO = {
  languages: "Arabic, English",
  location: "Riyadh, KSA",
  visa: "Transferable Iqama | Valid Driver license"
};

// --- UTILITIES ---

async function callGemini(prompt, systemInstruction = "") {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] }
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    return result.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
  } catch (err) {
    return "Error generating response.";
  }
}

// --- SUB-COMPONENTS ---

function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-8 text-center px-4">
      <motion.h2 
        initial={{ opacity: 0, y: 10 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        className="text-2xl md:text-3xl font-bold text-[#1d1d1f] tracking-tight"
      >
        {title}
      </motion.h2>
      
      <div className="w-12 h-1 bg-[#0071e3]/20 mx-auto rounded-full my-4" />

      {subtitle && (
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#86868b] max-w-xl mx-auto text-sm md:text-base font-medium leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

function ProfilePicHolder() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-56 h-64 md:w-64 md:h-72 shrink-0">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-full h-full bg-white rounded-[2.5rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] overflow-hidden p-2 ring-1 ring-black/5"
      >
        <div className="w-full h-full bg-[#F5F5F7] rounded-[2rem] overflow-hidden relative">
          {PROFILE_IMAGE_URL && !imgError ? (
            <img 
              src={PROFILE_IMAGE_URL} 
              alt="Mohamed Elmugtaba" 
              onError={() => setImgError(true)}
              className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-700 ease-out" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#86868b]"><User size={50} strokeWidth={1.5} /></div>
          )}
        </div>
      </motion.div>
      <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-lg z-20 border border-slate-50">
        <div className="bg-[#34C759] w-3.5 h-3.5 rounded-full ring-2 ring-white animate-pulse" />
      </div>
    </div>
  );
}

function AIProjectInsight({ project }) {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);

  async function getInsight() {
    setLoading(true);
    const res = await callGemini(`Suggest a future technical direction for the project: "${project.title}" which uses ${project.tools}.`, "You are a Senior Bioinformatics Advisor. Be concise.");
    setInsight(res);
    setLoading(false);
  }

  return (
    <div className="mt-6 pt-5 border-t border-[#F5F5F7] w-full mt-auto">
      {!insight ? (
        <button onClick={getInsight} disabled={loading} className="flex items-center gap-2 text-[12px] font-semibold text-[#0071e3] uppercase tracking-wider hover:text-[#005bb5] transition-colors group">
          {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} className="group-hover:scale-110 transition-transform" />} 
          <span>Generate AI Insight</span>
        </button>
      ) : (
        <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-[15px] text-[#86868b] bg-[#F5F5F7] p-5 rounded-2xl leading-relaxed">
          <span className="font-semibold text-[#1d1d1f] block mb-1 uppercase text-[11px] tracking-widest">AI Suggestion</span> 
          {insight}
        </motion.div>
      )}
    </div>
  );
}

function AICopilotModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([{ role: 'ai', text: "Hello. I'm Mohamed's Digital Assistant. How can I help you understand his work?" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [messages]);

  async function handleSend() {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    const context = `
      Name: Mohamed Elmugtaba
      Role: Bioinformatics Professional & Pharmacist
      Summary: ${EXPERIENCE.map(e => `${e.role} at ${e.org}`).join(", ")}
      Skills: ${SKILLS.map(s => s.items.join(", ")).join(", ")}
    `;
    const res = await callGemini(userMsg, `You are the Digital Twin of Mohamed Elmugtaba. Answer questions based on this profile: ${context}. Keep answers professional and concise.`);
    setMessages(prev => [...prev, { role: 'ai', text: res }]);
    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/20 backdrop-blur-md" 
        onClick={onClose} 
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="bg-white/80 backdrop-blur-xl saturate-150 w-full max-w-lg rounded-[2rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] overflow-hidden relative flex flex-col h-[600px] border border-white/40 ring-1 ring-black/5"
      >
        <div className="bg-white/50 border-b border-black/5 p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#0071e3] to-[#40a0ff] flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <BrainCircuit size={16} />
            </div>
            <h3 className="font-semibold text-[15px] text-[#1d1d1f]">Research Assistant</h3>
          </div>
          <button onClick={onClose} className="p-2 bg-[#F5F5F7] rounded-full text-[#86868b] hover:bg-[#e8e8ed] transition-colors"><X size={18} /></button>
        </div>
        
        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-[16px] leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-[#0071e3] text-white rounded-tr-sm' : 'bg-white text-[#1d1d1f] rounded-tl-sm border border-black/5'}`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (<div className="flex items-center gap-2 text-[#86868b] text-[13px] px-2"><Loader2 size={14} className="animate-spin" /> Thinking...</div>)}
        </div>
        
        <div className="p-5 border-t border-black/5 bg-white/50">
          <div className="relative">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              onKeyPress={(e) => e.key === 'Enter' && handleSend()} 
              placeholder="Ask about my research..." 
              className="w-full pl-5 pr-12 py-3.5 rounded-full border-none bg-white ring-1 ring-black/10 focus:ring-2 focus:ring-[#0071e3] focus:outline-none text-[16px] text-[#1d1d1f] shadow-sm placeholder:text-[#86868b]" 
            />
            <button 
              onClick={handleSend} 
              disabled={!input.trim()}
              className="absolute right-2 top-2 p-1.5 bg-[#0071e3] text-white rounded-full hover:bg-[#005bb5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={16} className="ml-0.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- NEW COMPONENT: Typewriter Text for Hero with Layout Stabilization & View Trigger ---
function TypewriterText() {
  const segments = [
    { text: "Bioinformatics Professional & Pharmacist", bold: true },
    { text: " bridging clinical science and computational data. I aim to redefine the frontier of discovery: using ", bold: false },
    { text: "pharmaceutical insight", bold: true },
    { text: " to frame the essential biological questions and ", bold: false },
    { text: "computational innovation", bold: true },
    { text: " to manifest the data-driven answers that make ", bold: false },
    { text: "precision medicine a reality", bold: true },
    { text: ".", bold: false },
  ];

  const [textState, setTextState] = useState({
    segmentIndex: 0,
    charIndex: 0,
  });

  const containerRef = useRef(null);
  // Trigger when 50% of the element is visible
  const isInView = useInView(containerRef, { amount: 0.5 });

  // Reset state when out of view so it's ready to type again when scrolled into view
  useEffect(() => {
    if (!isInView) {
      setTextState({ segmentIndex: 0, charIndex: 0 });
    }
  }, [isInView]);

  // Fast typing speed (10ms)
  useEffect(() => {
    // Only run if visible
    if (!isInView) return;
    
    if (textState.segmentIndex >= segments.length) return;

    const timeout = setTimeout(() => {
      setTextState((prev) => {
        const currentSegment = segments[prev.segmentIndex];
        if (prev.charIndex < currentSegment.text.length) {
          return { ...prev, charIndex: prev.charIndex + 1 };
        } else {
          return { segmentIndex: prev.segmentIndex + 1, charIndex: 0 };
        }
      });
    }, 10); 

    return () => clearTimeout(timeout);
  }, [textState, segments.length, isInView]);

  return (
    <div ref={containerRef} className="relative">
      {/* GHOST ELEMENT (INVISIBLE COPY) 
         This renders the full text invisibly to force the container 
         to the correct height immediately, preventing layout shift.
      */}
      <div className="invisible pointer-events-none select-none" aria-hidden="true">
        {segments.map((seg, i) => (
          <span key={`ghost-${i}`} className={seg.bold ? "font-semibold" : ""}>{seg.text}</span>
        ))}
      </div>

      {/* ANIMATED TEXT OVERLAY 
         This sits exactly on top of the ghost element.
      */}
      <div className="absolute top-0 left-0 w-full h-full">
        {segments.map((seg, i) => {
          if (i < textState.segmentIndex) {
            return <span key={i} className={seg.bold ? "font-semibold text-black" : ""}>{seg.text}</span>;
          }
          if (i === textState.segmentIndex) {
            return (
              <span key={i} className={seg.bold ? "font-semibold text-black" : ""}>
                {seg.text.slice(0, textState.charIndex)}
                <span className="animate-pulse inline-block w-0.5 h-5 bg-[#0071e3] align-middle ml-0.5"></span>
              </span>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 cursor-pointer bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm ring-1 ring-black/5">
        <Dna className="text-[#0071e3] w-5 h-5" strokeWidth={2.5} />
        <span className="font-semibold text-[13px] tracking-wide uppercase text-[#1d1d1f]">M. Elmugtaba</span>
      </div>
      <a href="mailto:Mujtababarsi@mail.com" className="pointer-events-auto bg-[#1d1d1f] text-white px-5 py-2.5 rounded-full text-[12px] font-medium tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all">
        Contact
      </a>
    </header>
  );
}

function Dock({ activeSection, scrollTo }) {
  const links = [
    { id: 'home', icon: <Home size={20} />, label: 'Home' },
    { id: 'me', icon: <User size={20} />, label: 'Bio' },
    { id: 'expertise', icon: <Dna size={20} />, label: 'Expertise' },
    { id: 'projects', icon: <Layers size={20} />, label: 'Projects' },
    { id: 'experience', icon: <Terminal size={20} />, label: 'Exp' },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 bg-white/70 backdrop-blur-xl saturate-150 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] ring-1 ring-white/50 border border-white/20">
      {links.map((link) => (
        <button
          key={link.id}
          onClick={() => scrollTo(link.id)}
          className={`relative p-3 rounded-full transition-all duration-300 group ${
            activeSection === link.id 
              ? 'bg-[#0071e3] text-white shadow-md scale-110' 
              : 'text-[#86868b] hover:bg-black/5 hover:text-[#1d1d1f]'
          }`}
          aria-label={link.label}
        >
          {React.cloneElement(link.icon, { strokeWidth: 2 })}
          {/* Hover Label */}
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1d1d1f] text-white text-[10px] font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            {link.label}
          </span>
        </button>
      ))}
    </div>
  );
}

function SectionProgress({ activeSection, scrollTo }) {
  const sections = ['home', 'me', 'expertise', 'projects', 'experience', 'education'];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
      {sections.map((id) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className="group relative flex items-center justify-center w-3 h-3"
        >
          <div 
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              activeSection === id ? 'bg-[#0071e3] scale-150' : 'bg-[#d2d2d7] group-hover:bg-[#86868b]'
            }`} 
          />
        </button>
      ))}
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-16 bg-[#F5F5F7] border-t border-[#d2d2d7]/50 relative snap-start">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-8 opacity-80">
          <Dna className="text-[#86868b] w-6 h-6" />
          <p className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">M. Elmugtaba</p>
        </div>
        
        <div className="flex gap-8 mb-8">
           <a href="https://github.com/mujtababarsi" target="_blank" className="text-[#424245] hover:text-[#1d1d1f] transition-colors text-[13px] font-medium">GitHub</a>
           <a href="mailto:Mujtababarsi@mail.com" className="text-[#424245] hover:text-[#1d1d1f] transition-colors text-[13px] font-medium">Email</a>
           <a href="#" className="text-[#424245] hover:text-[#1d1d1f] transition-colors text-[13px] font-medium">LinkedIn</a>
        </div>
        
        <p className="text-[12px] text-[#86868b]">
          Designed with Apple-inspired precision. Built with React & Tailwind.
        </p>
      </div>
    </footer>
  );
}

// --- MAIN APP COMPONENT ---

export default function App() {
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const mainContainerRef = useRef(null);

  // Projects State
  const [projectIndex, setProjectIndex] = useState(0);
  const autoSlideRef = useRef(null);
  
  // Experience State - using selection instead of scroll
  const [selectedExpIndex, setSelectedExpIndex] = useState(0);

  // --- PROJECTS LOGIC ---
  const resetAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      setProjectIndex((prev) => (prev + 2) % PROJECTS.length);
    }, 6000); 
  };

  useEffect(() => {
    resetAutoSlide();
    return () => clearInterval(autoSlideRef.current);
  }, []);

  const handleManualNextProject = () => {
    setProjectIndex((prev) => (prev + 2) % PROJECTS.length);
    resetAutoSlide(); 
  };
  
  const visibleProjects = PROJECTS.slice(projectIndex, projectIndex + 2);

  // Scroll Spy Logic for Active Section
  const handleScroll = (e) => {
    const container = e.target;
    const scrollPosition = container.scrollTop + (container.clientHeight / 2); // Check middle of screen
    
    const sections = ['home', 'me', 'expertise', 'projects', 'experience', 'education'];
    
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={mainContainerRef}
      onScroll={handleScroll}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-white font-sans text-[#1d1d1f] selection:bg-[#0071e3]/20 relative antialiased"
    >
      <Header />
      <Dock activeSection={activeSection} scrollTo={scrollTo} />
      <SectionProgress activeSection={activeSection} scrollTo={scrollTo} />

      {/* HERO Section */}
      <section id="home" className="snap-start min-h-screen relative pt-20 pb-24 bg-[#F5F5F7] flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <ProfilePicHolder />
              <div className="mt-10 flex flex-col items-center lg:items-start w-full space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight leading-[1.1]">
                  Mohamed <span className="text-[#86868b] font-medium">Elmugtaba</span>
                </h1>
                <p className="text-xl md:text-2xl font-medium text-[#1d1d1f] tracking-tight">
                  Bioinformatician | Pharmacist
                </p>
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-black/5 mt-2">
                  <span className="w-2 h-2 rounded-full bg-[#34C759]" />
                  <span className="text-[12px] font-medium text-[#1d1d1f] tracking-wide">Available for projects</span>
                </div>
              </div>
            </motion.div>
            {/* Right Side */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} 
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              {/* NOTE: Changed from <p> to <div> to allow internal div structure from TypewriterText */}
              <div className="text-xl md:text-2xl text-[#1d1d1f] font-normal leading-relaxed tracking-tight max-w-lg mb-10 text-justify hyphens-auto">
                <TypewriterText />
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 w-full">
                <button 
                  onClick={() => scrollTo('me')} 
                  className="bg-[#0071e3] text-white px-8 py-4 rounded-full font-medium text-[16px] hover:bg-[#0077ED] transition-all flex items-center gap-2 active:scale-[0.98]"
                >
                  Meet Me <ChevronRight size={18} />
                </button>
                <div className="flex gap-3">
                  <a href="https://github.com/mujtababarsi" target="_blank" className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-[#1d1d1f] hover:text-[#0071e3] transition-colors border border-black/5 hover:border-[#0071e3]/20 shadow-sm"><Github size={22} /></a>
                  <a href="mailto:Mujtababarsi@mail.com" className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-[#1d1d1f] hover:text-[#0071e3] transition-colors border border-black/5 hover:border-[#0071e3]/20 shadow-sm"><Mail size={22} /></a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ME Section */}
      <section id="me" className="snap-start min-h-screen py-12 bg-white flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <SectionHeading title="At the Intersection of Pharmacy & Bioinformatics" subtitle="Bridging clinical expertise with computational precision." />
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              className="space-y-6"
            >
              <div className="flex items-center gap-2 text-[#0071e3]">
                <FileText size={22} strokeWidth={1.5} />
                <span className="text-[12px] font-semibold uppercase tracking-widest">Bio</span>
              </div>
              <p className="text-[19px] text-[#1d1d1f] leading-relaxed text-justify hyphens-auto font-normal">
                {summaryFull}
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              viewport={{ once: true }} 
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="bg-[#F5F5F7] p-8 rounded-[2.5rem] relative overflow-hidden ring-1 ring-black/5"
            >
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <div className="bg-[#0071e3] p-1.5 rounded-md text-white"><Terminal size={16} /></div>
                  <span className="font-semibold text-[15px] text-[#1d1d1f]">Sequencing Depth</span>
                </div>
                <span className="text-[12px] font-medium text-[#86868b] uppercase tracking-wide">Real-time</span>
              </div>
              <div className="h-64" style={{ height: 300, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={GENOMIC_DATA}>
                    <defs>
                      <linearGradient id="cMe" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0071e3" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0071e3" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA" />
                    <XAxis dataKey="pos" hide />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: 'rgba(255,255,255,0.9)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', color: '#1d1d1f', fontSize: '13px', padding: '10px 15px', backdropFilter: 'blur(10px)' }} 
                      cursor={{ stroke: '#86868b', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area type="monotone" dataKey="depth" stroke="#0071e3" strokeWidth={3} fillOpacity={1} fill="url(#cMe)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AREAS OF EXPERTISE */}
      <section id="expertise" className="snap-start min-h-screen py-12 bg-slate-50 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <SectionHeading title="Areas of Expertise" />
          <div className="grid md:grid-cols-3 gap-6">
            {AREAS_OF_EXPERTISE.map((area, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white p-6 rounded-[1.5rem] shadow-sm ring-1 ring-black/5 h-full flex flex-col"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 bg-[#F5F5F7] rounded-xl text-[#0071e3]">
                     {React.cloneElement(area.icon, { size: 24, strokeWidth: 1.5 })}
                  </div>
                  <h3 className="text-xl font-semibold text-[#1d1d1f]">{area.title}</h3>
                </div>
                <p className="text-[#86868b] text-sm leading-relaxed mb-6 font-medium">
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-2 content-start mt-auto">
                  {area.items.map((item, i) => (
                    <span key={i} className="px-3 py-1.5 bg-[#F5F5F7] text-[#1d1d1f] text-[13px] font-medium rounded-lg border border-black/5 hover:bg-[#E8E8ED] transition-colors cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECHNICAL SKILLS */}
      <section className="snap-start min-h-screen py-12 bg-white flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <SectionHeading title="Technical Skills" />
          <div className="grid md:grid-cols-3 gap-8">
            {SKILLS.map((skill, idx) => (
              <div key={idx} className="bg-[#F5F5F7] p-8 rounded-[2rem] h-full ring-1 ring-black/5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white rounded-xl text-[#0071e3] shadow-sm">{React.cloneElement(skill.icon, { strokeWidth: 2, size: 22 })}</div>
                  <h3 className="text-lg font-semibold text-[#1d1d1f]">{skill.category}</h3>
                </div>
                <p className="text-xs font-medium text-[#86868b] uppercase tracking-wide mb-6 ml-1">
                  {skill.description}
                </p>
                <ul className="space-y-4">
                  {skill.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#1d1d1f] font-medium text-[16px]">
                      <CheckCircle2 size={18} className="text-[#0071e3] flex-shrink-0" strokeWidth={2.5} /> 
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="snap-start min-h-screen py-16 bg-stone-50 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <SectionHeading title="Selected Projects" />
          
          <div className="relative grid grid-cols-1 min-h-[24rem]"> 
            <AnimatePresence initial={false}>
              <motion.div 
                key={projectIndex} 
                className="grid md:grid-cols-2 gap-8 col-start-1 row-start-1 w-full" 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {visibleProjects.map((p, idx) => (
                  <div 
                    key={p.title} 
                    className="bg-white rounded-[2.5rem] p-8 flex flex-col h-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] ring-1 ring-black/5 overflow-hidden relative group hover:scale-[1.01] transition-transform duration-300 min-h-[22rem]"
                  >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0071e3] to-[#40a0ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-2">{p.title}</h3>
                    <div className="text-[13px] font-semibold text-[#0071e3] mb-6 uppercase tracking-wider">{p.tools}</div>
                    
                    <p className="text-[#424245] mb-8 flex-grow text-[16px] leading-relaxed font-normal line-clamp-4">
                      {p.desc}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-[#F5F5F7] text-[#1d1d1f] text-[12px] font-medium rounded-full border border-black/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <AIProjectInsight project={p} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            <button 
              onClick={handleManualNextProject}
              className="absolute top-1/2 -right-6 md:-right-12 transform -translate-y-1/2 z-20 bg-white text-[#0071e3] p-4 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border border-black/5"
              aria-label="Next Projects"
            >
              <ArrowRight size={24} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>

      {/* EXPERIENCE - UPDATED SECTION */}
      <section id="experience" className="snap-start min-h-screen py-16 bg-white flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-6 w-full relative">
          <SectionHeading title="Professional Experience" />

          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 h-[30rem]">
            {/* LEFT: TIMELINE LIST */}
            <div className="flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
              {EXPERIENCE.map((exp, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedExpIndex(idx)}
                  className={`text-left p-4 rounded-2xl transition-all duration-300 border ${
                    selectedExpIndex === idx 
                      ? 'bg-[#F5F5F7] border-[#0071e3]/20 shadow-sm' 
                      : 'bg-white border-transparent hover:bg-[#F5F5F7]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1">
                    <div className={`w-2 h-2 rounded-full ${selectedExpIndex === idx ? 'bg-[#0071e3]' : 'bg-[#d2d2d7]'}`} />
                    <span className={`text-xs font-bold uppercase tracking-wider ${selectedExpIndex === idx ? 'text-[#0071e3]' : 'text-[#86868b]'}`}>
                      {exp.period}
                    </span>
                  </div>
                  <h4 className={`text-lg font-bold ${selectedExpIndex === idx ? 'text-[#1d1d1f]' : 'text-[#424245]'}`}>
                    {exp.role}
                  </h4>
                  <p className="text-sm text-[#86868b] truncate">{exp.org}</p>
                </button>
              ))}
            </div>

            {/* RIGHT: DETAIL CARD */}
            <div className="relative h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedExpIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-white/80 backdrop-blur-xl border border-black/5 rounded-[2.5rem] p-10 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] flex flex-col justify-center"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-[#0071e3]/10 rounded-2xl text-[#0071e3]">
                      <Briefcase size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#1d1d1f]">{EXPERIENCE[selectedExpIndex].role}</h3>
                      <p className="text-[#0071e3] font-medium text-lg">{EXPERIENCE[selectedExpIndex].org}</p>
                    </div>
                  </div>
                  
                  <div className="w-full h-[1px] bg-black/5 mb-6" />
                  
                  <p className="text-lg text-[#424245] leading-relaxed">
                    {EXPERIENCE[selectedExpIndex].description}
                  </p>

                  <div className="mt-8 flex gap-3">
                     <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F7] text-[#1d1d1f] text-sm font-medium border border-black/5">
                        <Calendar size={14} className="text-[#86868b]" /> {EXPERIENCE[selectedExpIndex].period}
                     </span>
                     <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5F5F7] text-[#1d1d1f] text-sm font-medium border border-black/5">
                        <MapPin size={14} className="text-[#86868b]" /> Riyadh, KSA
                     </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="snap-start min-h-screen py-12 bg-blue-50/30 flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 w-full">
          <SectionHeading title="Education" />
          {EDUCATION_DATA.map((edu, idx) => (
            <div key={idx} className="bg-white p-12 rounded-[2.5rem] shadow-sm ring-1 ring-black/5 text-center md:text-left">
              <div className="flex flex-col md:flex-row justify-between mb-8 items-center md:items-start gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-[#1d1d1f]">{edu.degree}</h3>
                  <p className="text-[#0071e3] font-medium mt-1">{edu.school} | {edu.location}</p>
                </div>
                <span className="text-sm font-medium text-[#86868b] bg-[#F5F5F7] px-4 py-1.5 rounded-full">{edu.period}</span>
              </div>
              <div className="pt-8 border-t border-[#F5F5F7]">
                <p className="text-[13px] font-semibold text-[#86868b] uppercase tracking-widest mb-4">Core Curriculum</p>
                <p className="text-[#1d1d1f] leading-relaxed text-[16px]">{edu.details}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS & PROFESSIONAL DEVELOPMENT */}
      <section className="snap-start min-h-screen py-12 bg-white border-t border-[#F5F5F7] flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <SectionHeading title="Certifications & Professional Development" />
          <div className="grid md:grid-cols-2 gap-16">
            {CERTIFICATES_PARTS.map((part, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="mb-6 pb-4 border-b border-[#F5F5F7]">
                  <h3 className="text-xl font-semibold text-[#1d1d1f] tracking-tight flex items-center gap-2">
                    {idx === 0 ? <Cpu size={22} className="text-[#0071e3]" /> : <Award size={22} className="text-[#0071e3]" />}
                    {part.title}
                  </h3>
                </div>
                <div className="space-y-3">
                  {part.items.map((cert, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 4, backgroundColor: "#F5F5F7" }} 
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="group p-4 rounded-2xl border border-[#F5F5F7] flex items-start gap-4 transition-all duration-300 cursor-default"
                    >
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-[#d2d2d7] group-hover:bg-[#0071e3] transition-colors shrink-0" />
                      <p className="text-[16px] font-medium text-[#424245] group-hover:text-[#1d1d1f] leading-snug transition-colors">
                        {cert}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADDITIONAL INFO */}
      <section className="snap-start min-h-screen py-12 bg-zinc-100 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <SectionHeading title="Details" />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
             <div className="bg-white p-8 rounded-[2rem] text-center shadow-sm ring-1 ring-black/5 flex flex-col items-center justify-center h-48">
                <Globe className="text-[#0071e3] mb-4" size={32} strokeWidth={1.5} />
                <h4 className="font-semibold text-[13px] text-[#86868b] uppercase tracking-widest mb-2">Languages</h4>
                <p className="text-[#1d1d1f] font-medium text-xl">{ADDITIONAL_INFO.languages}</p>
             </div>
             <div className="bg-white p-8 rounded-[2rem] text-center shadow-sm ring-1 ring-black/5 flex flex-col items-center justify-center h-48">
                <MapPin className="text-[#0071e3] mb-4" size={32} strokeWidth={1.5} />
                <h4 className="font-semibold text-[13px] text-[#86868b] uppercase tracking-widest mb-2">Location</h4>
                <p className="text-[#1d1d1f] font-medium text-xl">{ADDITIONAL_INFO.location}</p>
             </div>
             <div className="bg-white p-8 rounded-[2rem] text-center shadow-sm ring-1 ring-black/5 flex flex-col items-center justify-center h-48">
                <Activity className="text-[#0071e3] mb-4" size={32} strokeWidth={1.5} />
                <h4 className="font-semibold text-[13px] text-[#86868b] uppercase tracking-widest mb-2">Visa Status</h4>
                <p className="text-[#1d1d1f] font-medium text-[15px] leading-tight max-w-[180px]">{ADDITIONAL_INFO.visa}</p>
             </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Floating Action Button - Apple Style */}
      <button 
        onClick={() => setIsAiOpen(true)} 
        className="fixed bottom-8 right-8 z-40 bg-black/80 backdrop-blur-md text-white p-4 rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all group flex items-center gap-0 overflow-hidden hover:pr-6 border border-white/10"
      >
        <Sparkles size={22} />
        <span className="max-w-0 group-hover:max-w-xs transition-all duration-300 overflow-hidden whitespace-nowrap font-medium text-[15px] pl-0 group-hover:pl-3">Ask AI</span>
      </button>

      <AICopilotModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}