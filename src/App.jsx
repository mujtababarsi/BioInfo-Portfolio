import React, { useState, useEffect, useRef } from 'react';
import { 
  Dna, Terminal, Database, Github, Mail, ExternalLink, ChevronRight, 
  Code2, Award, FlaskConical, Microscope, Cpu, Menu, X, MapPin, 
  Phone, CheckCircle2, Sparkles, Send, Loader2, BrainCircuit, 
  Volume2, User, Cloud, Activity, FileText, Layers, Globe, ArrowRight,
  Home, ChevronUp, ChevronDown, Briefcase, Calendar, Code, Layout, Linkedin
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from 'framer-motion';

// --- CONFIGURATION & CONSTANTS ---
const PROFILE_IMAGE_URL = "./me.png"; 

// --------------------------------------------------------------------------
// API KEY CONFIGURATION
// Since you have fixed the .env location, this logic will now correctly
// pull the key from VITE_GEMINI_API_KEY.
// --------------------------------------------------------------------------
const getApiKey = () => {
  // 1. Check Vite (Standard for your project)
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) {
      return import.meta.env.VITE_GEMINI_API_KEY;
    }
  } catch (e) { /* ignore */ }
  
  // 2. Check Create-React-App (Fallback support)
  try {
    if (typeof process !== 'undefined' && process.env?.REACT_APP_GEMINI_API_KEY) {
      return process.env.REACT_APP_GEMINI_API_KEY;
    }
  } catch (e) { /* ignore */ }

  return ""; 
};

const apiKey = getApiKey();

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
    title: "Scanpy Single-Cell Analysis",
    tools: "Python | Scanpy | Jupyter Notebook",
    desc: "Conducted scRNA-seq downstream analysis on six PBMC samples to identify transcriptomic differences between COVID-19 patients and healthy controls.",
    tags: ["scRNA-seq", "COVID-19", "Scanpy"],
    features: ["Quality Control Pipeline", "Dimensionality Reduction", "Cell-type Prediction"],
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/mujtababarsi/Scanpy-scRNA-seq-Analysis" 
  },
  {
    title: "Covid 19 scRNA-seq & Spatial Transcriptomics Integration",
    tools: "Python | Scanpy | Scanorama",
    desc: "Integrated spatial datasets with single-cell RNA-seq references using the Scanorama algorithm for accurate batch correction and cell-type mapping.",
    tags: ["Spatial", "Integration", "Scanorama"],
    features: ["Batch Correction", "Tissue Mapping", "High-Performance Vis"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/mujtababarsi/Covid-19-single-cell-analysis-Scanpy"
  },
  {
    title: "Memory-Efficient scRNA-seq (Scarf)",
    tools: "Python | Scarf | Zarr | Dask",
    desc: "Optimised analysis for a 10x Genomics 5K PBMC dataset using the Scarf package, leveraging Zarr and Dask for low-memory data chunking.",
    tags: ["Big Data", "Dask", "Zarr"],
    features: ["Low-Memory Chunking", "KNN Mapping", "Reference Projection"],
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/mujtababarsi/Scarf-workflow-PBMC"
  },
  {
    title: "Data Visualisation with ggplot2",
    tools: "R | RStudio | ggplot2 | Tidyverse",
    desc: "Generated publication-quality visualisations using the \"Grammar of Graphics\" framework to translate raw data into insightful graphical representations.",
    tags: ["R", "ggplot2", "EDA"],
    features: ["Publication Quality", "Exploratory Analysis", "Complex Faceting"],
    image: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=800&auto=format&fit=crop",
    link: "https://github.com/mujtababarsi/R-and-rstudio-Data-visualisation-with-ggplot2"
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

// --- ANIMATION VARIANTS (Stable) ---
// Top-level section entrance
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
  }
};

// Standard Container - Staggers children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

// Stable Container - Visible immediately, staggers children
const stableContainerVariants = {
  hidden: { opacity: 1 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

// Card Variant for Stability - Staggers its own list items
const cardStaggerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

// Item cascade animation
const itemVariants = {
  hidden: { opacity: 0, y: 15, x: -10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};

// --- UTILITIES ---

async function callGemini(prompt, systemInstruction = "") {
  // Check if API key is configured (essential for external deployment)
  if (!apiKey) {
    console.error("Gemini API Key is missing. Please check your .env file configuration.");
    return "Configuration Error: API Key is missing. Please ensure you have a .env file in your root folder with VITE_GEMINI_API_KEY defined.";
  }

  // Use the supported preview model
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  // Only add systemInstruction if it is provided to avoid API errors with empty text
  if (systemInstruction) {
    payload.systemInstruction = { parts: [{ text: systemInstruction }] };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
  } catch (err) {
    console.error("Gemini API Error:", err);
    return "Error generating response. Please check if your API key is valid.";
  }
}

// --- SUB-COMPONENTS ---

function ParallaxBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 20]);
    
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
       <motion.div style={{ y: y1, rotate }} className="absolute top-[5%] right-[-5%] w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-3xl opacity-50" />
       <motion.div style={{ y: y2, rotate: rotate }} className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-indigo-100/20 rounded-full blur-3xl opacity-50" />
    </div>
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      variants={sectionVariants}
      className="mb-6 text-center px-4"
    >
      <h2 className="text-xl md:text-2xl font-bold text-[#1d1d1f] tracking-tight">
        {title}
      </h2>
      <div className="w-12 h-1 bg-[#0071e3]/20 mx-auto rounded-full my-3" />
      {subtitle && (
        <p className="text-[#86868b] max-w-lg mx-auto text-xs md:text-sm font-medium leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

function ProfilePicHolder() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-48 h-56 md:w-56 md:h-64 shrink-0">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-full h-full bg-white rounded-[2rem] shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] overflow-hidden p-2 ring-1 ring-black/5"
      >
        <div className="w-full h-full bg-[#F5F5F7] rounded-[1.5rem] overflow-hidden relative">
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

function AIProjectInsight({ project, onOpenChange }) {
  const [insight, setInsight] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Notify parent component when modal state changes
  useEffect(() => {
    if (onOpenChange) {
      onOpenChange(isOpen);
    }
  }, [isOpen, onOpenChange]);

  async function getInsight() {
    if (insight) {
        setIsOpen(true);
        return;
    }
    setLoading(true);
    const res = await callGemini(`Suggest a future technical direction for the project: "${project.title}" which uses ${project.tools}.`, "You are a Senior Bioinformatics Advisor. Be concise.");
    setInsight(res);
    setLoading(false);
    setIsOpen(true);
  }

  return (
    <>
      <div className="mt-3 pt-3 border-t border-black/5 w-full">
        <button 
          onClick={getInsight} 
          disabled={loading} 
          className="flex items-center gap-2 text-[10px] font-bold text-[#0071e3] uppercase tracking-widest hover:text-[#005bb5] transition-colors group w-full justify-center py-2 hover:bg-blue-50/50 rounded-lg"
        >
          {loading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} className="group-hover:scale-110 transition-transform" />} 
          <span>{insight ? "View AI Insight" : "Generate AI Insight"}</span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="absolute inset-0 z-50 bg-white/95 p-6 flex flex-col text-left rounded-[2.5rem]"
          >
             <div className="flex justify-between items-center mb-4 border-b border-black/5 pb-2">
                <div className="flex items-center gap-2 text-[#0071e3]">
                   <Sparkles size={16} />
                   <span className="text-[11px] font-bold uppercase tracking-widest">AI Analysis</span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-black/5 rounded-full text-[#86868b] transition-colors"
                >
                  <X size={18} />
                </button>
             </div>
             
             <div className="flex-grow overflow-y-auto custom-scrollbar pr-1">
                <p className="text-[13px] leading-relaxed text-[#1d1d1f] font-medium">
                  {insight}
                </p>
             </div>
             
             <div className="mt-4 pt-3 border-t border-black/5 text-center">
                <p className="text-[10px] text-[#86868b]">Generated by Gemini 2.0 Flash</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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

function Navbar({ scrollTo }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', id: 'home' },
    { name: 'Me', id: 'me' },
    { name: 'Expertise', id: 'expertise' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled 
          ? 'bg-white/70 backdrop-blur-xl saturate-180 border-b border-black/5 py-3 supports-[backdrop-filter]:bg-white/60' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer opacity-90 hover:opacity-100 transition-opacity" 
          onClick={() => scrollTo('home')}
        >
          <Dna className="text-[#0071e3] w-6 h-6" strokeWidth={2.5} />
          <span className="font-semibold text-[14px] tracking-wide uppercase text-[#1d1d1f]">M. Elmugtaba</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <button 
              key={l.id} 
              onClick={() => scrollTo(l.id)} 
              className="text-[#1d1d1f] hover:text-[#0071e3] text-[13px] font-medium transition-colors tracking-wide"
            >
              {l.name}
            </button>
          ))}
          <a 
            href="mailto:Mujtababarsi@mail.com" 
            className="bg-[#1d1d1f] text-white px-5 py-2 rounded-full text-[12px] font-medium tracking-wide hover:bg-[#333] transition-all hover:scale-105 active:scale-95 shadow-sm"
          >
            Contact
          </a>
        </div>
        
        <button className="md:hidden text-[#1d1d1f]" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={24}/> : <Menu size={24}/>}</button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: 'auto', opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }} 
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-black/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {links.map(l => (
                <button 
                  key={l.id} 
                  onClick={() => { scrollTo(l.id); setIsOpen(false); }} 
                  className="text-left font-medium text-[#1d1d1f] text-[15px]"
                >
                  {l.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function TypewriterText() {
  const segments = [
    { text: '"Bridging ', bold: false },
    { text: "clinical science", bold: true },
    { text: " and ", bold: false },
    { text: "computational data", bold: true },
    { text: ". I aim to redefine the frontier of discovery: using ", bold: false },
    { text: "pharmaceutical insight", bold: true },
    { text: " to frame the essential biological questions and ", bold: false },
    { text: "computational innovation", bold: true },
    { text: " to manifest the data-driven answers that make ", bold: false },
    { text: "medicine a reality", bold: true },
    { text: '."', bold: false },
  ];

  const [textState, setTextState] = useState({ segmentIndex: 0, charIndex: 0 });
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.5 });

  useEffect(() => { if (!isInView) setTextState({ segmentIndex: 0, charIndex: 0 }); }, [isInView]);

  useEffect(() => {
    if (!isInView || textState.segmentIndex >= segments.length) return;
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
      <div className="invisible pointer-events-none select-none" aria-hidden="true">
        {segments.map((seg, i) => <span key={`ghost-${i}`} className={seg.bold ? "font-semibold" : ""}>{seg.text}</span>)}
      </div>
      <div className="absolute top-0 left-0 w-full h-full">
        {segments.map((seg, i) => {
          if (i < textState.segmentIndex) return <span key={i} className={seg.bold ? "font-semibold text-black" : ""}>{seg.text}</span>;
          if (i === textState.segmentIndex) return <span key={i} className={seg.bold ? "font-semibold text-black" : ""}>{seg.text.slice(0, textState.charIndex)}<span className="animate-pulse inline-block w-0.5 h-5 bg-[#0071e3] align-middle ml-0.5"></span></span>;
          return null;
        })}
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 cursor-pointer bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm ring-1 ring-black/5 transition-all hover:scale-105 active:scale-95">
        <Dna className="text-[#0071e3] w-5 h-5" strokeWidth={2.5} />
        <span className="font-semibold text-[13px] tracking-wide uppercase text-[#1d1d1f]">M. Elmugtaba</span>
      </div>
      <a href="mailto:Mujtababarci@gmail.com" className="pointer-events-auto bg-[#1d1d1f] text-white px-5 py-2.5 rounded-full text-[12px] font-medium tracking-wide shadow-lg hover:scale-105 active:scale-95 transition-all">Contact</a>
    </header>
  );
}

function Dock({ activeSection, scrollTo, isVisible, setIsVisible }) {
  const links = [
    { id: 'home', icon: <Home size={20} />, label: 'Home' },
    { id: 'me', icon: <User size={20} />, label: 'Bio' },
    { id: 'expertise', icon: <Dna size={20} />, label: 'Expertise' },
    { id: 'projects', icon: <Layers size={20} />, label: 'Projects' },
    { id: 'experience', icon: <Terminal size={20} />, label: 'Exp' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 1, y: 0, x: "-50%" }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20,
        x: "-50%",
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      onMouseEnter={() => setIsVisible(true)}
      // FIXED: CENTERED with left-1/2 and motion x: "-50%" to avoid transform conflicts
      className="fixed bottom-5 left-1/2 z-50 flex items-center gap-4 px-6 py-3 bg-white/70 backdrop-blur-xl saturate-150 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] ring-1 ring-white/50 border border-white/20"
    >
      {links.map((link) => (
        <button
          key={link.id}
          onClick={() => scrollTo(link.id)}
          className={`relative p-3 rounded-full transition-all duration-300 group ${
            activeSection === link.id 
              ? 'bg-[#0071e3] text-white shadow-md scale-110' // Reverted to Blue accent
              : 'text-[#86868b] hover:bg-black/5 hover:text-[#1d1d1f]' // Reverted to gray text
          }`}
          aria-label={link.label}
        >
          {React.cloneElement(link.icon, { strokeWidth: 2.5 })}
          {/* Hover Label */}
          <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#1d1d1f] text-white text-[10px] font-medium px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg border border-white/10">{link.label}</span>
        </button>
      ))}
    </motion.div>
  );
}

function SectionProgress({ activeSection, scrollTo }) {
  const sections = ['home', 'me', 'expertise', 'projects', 'experience', 'education'];
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
      {sections.map((id) => (
        <button key={id} onClick={() => scrollTo(id)} className="group relative flex items-center justify-center w-3 h-3">
          <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeSection === id ? 'bg-[#0071e3] scale-150' : 'bg-[#d2d2d7] group-hover:bg-[#86868b]'}`} />
        </button>
      ))}
    </div>
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
  
  // Track specific interaction states to manage auto-slide intelligently
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const isHovering = useRef(false);
    
  // Experience State - using selection instead of scroll
  const [selectedExpIndex, setSelectedExpIndex] = useState(0);

  // Smart Toggle Logic
  const [controlsVisible, setControlsVisible] = useState(true);
  const scrollTimeoutRef = useRef(null);

  // Scroll Animations hooks
  const { scrollYProgress } = useScroll({ container: mainContainerRef });
  // Parallax transform for blobs
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const blobRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  // Helper function to handle visibility
  const showDockTemporarily = () => {
    setControlsVisible(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 1000);
  };

  // Add global event listeners for interactions
  useEffect(() => {
    const handleActivity = (e) => {
      if (e.type === 'mousemove') {
        showDockTemporarily();
      } else if (e.type === 'keydown') {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space', 'PageUp', 'PageDown'].includes(e.code)) {
          showDockTemporarily();
        }
      }
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // --- PROJECTS LOGIC ---
  const stopAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
  };

  const startAutoSlide = () => {
    stopAutoSlide();
    // CRITICAL FIX: Only start sliding if NO modal is open AND user is NOT hovering
    if (isAiModalOpen || isHovering.current) return;
    
    autoSlideRef.current = setInterval(() => {
      setProjectIndex((prev) => (prev + 2) % PROJECTS.length);
    }, 6000);
  };

  // Effect to manage slide state when AI modal state changes
  useEffect(() => {
    if (isAiModalOpen) {
      stopAutoSlide();
    } else if (!isHovering.current) {
      // Only restart if not hovering (e.g. user closed modal but moved mouse out)
      startAutoSlide();
    }
  }, [isAiModalOpen]);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const handleManualNextProject = () => {
    setProjectIndex((prev) => (prev + 2) % PROJECTS.length);
    startAutoSlide(); 
  };

  const handleMouseEnter = () => {
    isHovering.current = true;
    stopAutoSlide();
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    // Delay start slightly to avoid jitter if accidentally moving out and back in
    startAutoSlide();
  };
    
  const visibleProjects = PROJECTS.slice(projectIndex, projectIndex + 2);

  // --- EXPERIENCE LOGIC (INTERVAL BASED CAROUSEL) ---
  // Re-added for continuous flow
    
  // Scroll Spy Logic for Active Section
  const handleScroll = (e) => {
    const container = e.target;
    const scrollPosition = container.scrollTop + (container.clientHeight / 2); 
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

    // Trigger dock visibility on scroll
    showDockTemporarily();
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
      <Dock 
        activeSection={activeSection} 
        scrollTo={scrollTo} 
        isVisible={controlsVisible} 
        setIsVisible={setControlsVisible} 
      />
      <SectionProgress activeSection={activeSection} scrollTo={scrollTo} />

      {/* HERO Section */}
      <section id="home" className="snap-start min-h-screen relative pt-32 md:pt-40 pb-20 bg-[#F5F5F7] flex items-start justify-center">
        <ParallaxBackground />
        <div className="max-w-5xl mx-auto px-6 w-full relative z-10">
          <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={containerVariants}
             className="grid lg:grid-cols-2 gap-8 items-center"
          >
            
            {/* Left Side */}
            <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <ProfilePicHolder />
              
              <div className="mt-6 flex flex-col items-center lg:items-start w-full space-y-3">
                <h1 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] tracking-tight leading-[1.05]">
                  Mohamed <span className="text-[#86868b]">Elmugtaba</span>
                </h1>
                
                <p className="text-lg md:text-xl font-medium text-[#1d1d1f] tracking-tight">
                  Bioinformatician | Pharmacist
                </p>
                
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-black/5 mt-2">
                  <span className="w-2 h-2 rounded-full bg-[#34C759]" />
                  <span className="text-[12px] font-medium text-[#1d1d1f] tracking-wide">Available for Collaboration</span>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Justified Brief Content */}
            <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="text-lg md:text-xl text-[#1d1d1f] font-normal leading-relaxed tracking-tight max-w-lg mb-8 text-justify hyphens-auto">
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

          </motion.div>
        </div>
      </section>

      {/* ME Section - ENHANCED VISUALS */}
      <section id="me" className="snap-start min-h-screen pt-28 pb-16 bg-gradient-to-br from-white via-indigo-50/10 to-blue-50/10 flex items-start justify-center relative overflow-hidden">
        <ParallaxBackground />
          
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <SectionHeading title="At the Intersection of Pharmacy & Bioinformatics" subtitle="Bridging clinical expertise with computational precision." />
          <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={containerVariants}
             className="grid lg:grid-cols-2 gap-10 items-start"
          >
            
            <motion.div variants={itemVariants} className="space-y-5 bg-white/60 backdrop-blur-sm p-8 rounded-[2rem] border border-white/50 shadow-sm">
              <div className="flex items-center gap-2 text-[#0071e3]">
                <FileText size={22} strokeWidth={1.5} />
                <span className="text-[12px] font-semibold uppercase tracking-widest">Bio</span>
              </div>
              <p className="text-[15px] md:text-base text-[#1d1d1f] leading-relaxed text-justify hyphens-auto font-normal">
                {summaryFull}
              </p>
            </motion.div>

            {/* Apple Health-style Chart Card - ENHANCED */}
            <motion.div variants={itemVariants} className="bg-white/60 backdrop-blur-xl border border-white/50 p-6 rounded-[2.5rem] relative overflow-hidden shadow-xl ring-1 ring-black/5">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <div className="bg-[#0071e3] p-1.5 rounded-md text-white"><Terminal size={16} /></div>
                  <span className="font-semibold text-[15px] text-[#1d1d1f]">Sequencing Depth</span>
                </div>
                <span className="text-[12px] font-medium text-[#86868b] uppercase tracking-wide">Real-time</span>
              </div>
              <div className="h-52" style={{ height: 208, width: '100%' }}>
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
          </motion.div>
        </div>
      </section>

      {/* AREAS OF EXPERTISE - ENHANCED DESIGN */}
      <section id="expertise" className="snap-start min-h-screen pt-28 pb-16 bg-gradient-to-b from-white to-blue-50/30 flex items-start justify-center relative overflow-hidden">
        <ParallaxBackground />

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <SectionHeading title="Areas of Expertise" />
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-4"
          >
            {AREAS_OF_EXPERTISE.map((area, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: "0 20px 40px -12px rgba(0,0,0,0.1)" }}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-[2rem] border border-black/5 h-full flex flex-col relative group shadow-sm"
              >
                {/* Icon Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-[#0071e3] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm border border-blue-100/50">
                      {React.cloneElement(area.icon, { size: 20, strokeWidth: 1.5 })}
                  </div>
                  <h3 className="text-lg font-bold text-[#1d1d1f] tracking-tight">{area.title}</h3>
                </div>

                {/* Description */}
                <p className="text-[#424245] text-[13px] leading-relaxed mb-6 font-medium">
                  {area.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {area.items.map((item, i) => (
                    <span key={i} className="px-3 py-1 bg-[#F5F5F7] text-[#1d1d1f] text-[11px] font-semibold rounded-lg border border-black/5 group-hover:border-blue-100 hover:bg-[#0071e3] hover:text-white transition-all duration-300 cursor-default">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TECHNICAL SKILLS - ENHANCED DESIGN */}
      <section className="snap-start min-h-screen pt-28 pb-16 bg-white flex items-start justify-center relative">
         {/* Subtle technical grid background pattern */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
         <ParallaxBackground />

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <SectionHeading title="Technical Skills" />
          <motion.div 
            variants={stableContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {SKILLS.map((skill, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -5 }}
                className="bg-[#F5F5F7]/80 backdrop-blur-xl p-6 rounded-[2.5rem] h-full ring-1 ring-black/5 hover:ring-black/10 transition-all duration-300 relative overflow-hidden group"
              >
                {/* Decorative Corner Gradient */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-[3rem] pointer-events-none" />

                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-10 h-10 bg-white rounded-2xl text-[#0071e3] shadow-sm flex items-center justify-center ring-1 ring-black/5 group-hover:scale-105 transition-transform duration-300">
                    {React.cloneElement(skill.icon, { strokeWidth: 1.5, size: 20 })}
                  </div>
                  <h3 className="text-lg font-bold text-[#1d1d1f] tracking-tight">{skill.category}</h3>
                </div>

                <div className="space-y-3 relative z-10">
                  {skill.items.map((item, i) => (
                    <motion.div 
                      key={i}
                      variants={itemVariants}
                      className="flex items-center gap-3 group/item"
                    >
                      <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm text-[#0071e3] group-hover/item:scale-110 transition-transform ring-1 ring-black/5">
                        <CheckCircle2 size={10} strokeWidth={3} /> 
                      </div>
                      <span className="text-[#1d1d1f] font-medium text-[14px] group-hover/item:text-[#0071e3] transition-colors">
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROJECTS: RESTORED TO LIGHT THEME - ENHANCED (DEPTH TEXTURE) */}
      <section id="projects" className="snap-start min-h-screen pt-12 pb-12 bg-[#F5F5F7] flex items-start justify-center relative overflow-hidden">
        <ParallaxBackground />
          
        <div className="max-w-4xl mx-auto px-6 w-full relative z-10">
          <div className="mb-8 text-center px-4">
             <h2 className="text-xl md:text-2xl font-bold text-[#1d1d1f] tracking-tight">Selected Projects</h2>
             <div className="w-12 h-1 bg-[#0071e3]/20 mx-auto rounded-full my-3" />
          </div>
            
          {/* Fixed height container to prevent layout shifts - Reduced height */}
          <div 
            className="relative grid grid-cols-1 h-[29rem] md:h-[26rem]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          > 
            <AnimatePresence initial={false}>
              <motion.div 
                key={projectIndex} 
                className="grid grid-cols-1 md:grid-cols-2 gap-6 col-start-1 row-start-1 w-full h-full" 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {visibleProjects.map((p, idx) => (
                  <div 
                    key={p.title} 
                    className="relative bg-gradient-to-br from-white to-[#F2F2F7] rounded-[2.5rem] p-5 flex flex-col h-full border border-white/80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.08)] ring-1 ring-black/5 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] hover:scale-[1.02] transition-all duration-500 group overflow-hidden"
                  >
                    {/* Compact Image - Reduced Height */}
                    <div className="h-32 w-full rounded-2xl overflow-hidden mb-3 border border-black/5 bg-white shadow-inner relative group-hover:scale-[1.02] transition-transform duration-500 shrink-0">
                        <div className={`w-full h-full transform transition-transform duration-500 group-hover:scale-110 flex items-center justify-center text-[#86868b]`}>
                           {p.image ? <img src={p.image} alt={p.title} className="w-full h-full object-cover" /> : <Globe size={48} />}
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                    </div>

                    <div className="flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-1 h-10">
                             <h3 className="text-sm font-bold text-[#1d1d1f] leading-tight group-hover:text-[#0071e3] transition-colors line-clamp-2">{p.title}</h3>
                             <div className="bg-[#0071e3]/10 p-1.5 rounded-lg text-[#0071e3] shrink-0">
                                <Code size={14} />
                             </div>
                        </div>

                        <div className="mb-2 h-4">
                          <p className="text-[#0071e3] text-[10px] font-bold uppercase tracking-wide truncate">{p.tools}</p>
                        </div>
                        
                        {/* Reduced description height approx 3 lines */}
                        <p className="text-[#424245] text-[12px] leading-relaxed line-clamp-2 md:line-clamp-3 mb-3 flex-grow font-medium h-[3.6rem]">
                          {p.desc}
                        </p>
                        
                        {/* Features List (Compact) - Reduced margin */}
                        {p.features && (
                            <ul className="mb-3 space-y-1 h-10">
                                {p.features.slice(0,2).map((feat, i) => (
                                    <li key={i} className="flex items-center gap-2 text-[10px] text-[#424245]/80 font-medium truncate">
                                        <div className="w-1 h-1 rounded-full bg-[#0071e3] shrink-0" /> {feat}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="flex gap-2 mt-auto">
                            <a 
                               href={p.link}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="w-full bg-[#1d1d1f] hover:bg-[#0071e3] text-white text-[13px] font-bold py-3 rounded-xl transition-all shadow-md shadow-black/10 hover:shadow-blue-500/40 flex items-center justify-center gap-2 active:scale-95 group/btn"
                            >
                               View Project <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                            </a>
                       </div>

                       {/* Add the AI Insight Component here */}
                       <AIProjectInsight project={p} onOpenChange={setIsAiModalOpen} />
                   </div>
                 </div>
               ))}
             </motion.div>
           </AnimatePresence>

            {/* Floating Navigation Button (Blue Accent) */}
            <button 
              onClick={handleManualNextProject}
              className="absolute top-1/2 -right-10 md:-right-14 transform -translate-y-1/2 z-20 bg-white text-[#0071e3] p-3 rounded-full shadow-lg border border-black/5 transition-all hover:scale-110 active:scale-95"
              aria-label="Next Projects"
            >
              <ArrowRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>

      {/* EXPERIENCE - ENHANCED VISUALS */}
      <section id="experience" className="snap-start min-h-screen pt-20 pb-16 bg-white flex items-start justify-center relative">
        <ParallaxBackground />
        <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
          <SectionHeading title="Professional Experience" />

          <motion.div 
             initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={containerVariants}
             className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 h-[26rem]"
          >
            {/* LEFT: TIMELINE LIST */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
              {EXPERIENCE.map((exp, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedExpIndex(idx)}
                  className={`text-left p-4 rounded-[1.5rem] transition-all duration-300 border group ${
                    selectedExpIndex === idx 
                      ? 'bg-[#F5F5F7] border-[#0071e3]/20 shadow-inner' 
                      : 'bg-white border-transparent hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <div className={`w-2 h-2 rounded-full transition-colors ${selectedExpIndex === idx ? 'bg-[#0071e3] ring-4 ring-[#0071e3]/20' : 'bg-[#d2d2d7] group-hover:bg-[#86868b]'}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${selectedExpIndex === idx ? 'text-[#0071e3]' : 'text-[#86868b]'}`}>
                      {exp.period}
                    </span>
                  </div>
                  <h4 className={`text-[15px] font-bold ${selectedExpIndex === idx ? 'text-[#1d1d1f]' : 'text-[#424245]'}`}>
                    {exp.role}
                  </h4>
                  <p className="text-[11px] text-[#86868b] truncate font-medium">{exp.org}</p>
                </button>
              ))}
            </motion.div>

            {/* RIGHT: DETAIL CARD */}
            <div className="relative h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedExpIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-gradient-to-br from-[#F9F9FB] to-white border border-black/5 rounded-[2.5rem] p-8 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] flex flex-col justify-center relative overflow-hidden"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -bottom-10 -right-10 text-gray-50 opacity-50 transform rotate-12 pointer-events-none">
                      <Briefcase size={200} strokeWidth={0.5} />
                  </div>

                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="p-3.5 bg-white rounded-2xl text-[#0071e3] shadow-sm border border-black/5">
                      <Briefcase size={24} strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#1d1d1f] tracking-tight">{EXPERIENCE[selectedExpIndex].role}</h3>
                      <p className="text-[#0071e3] font-semibold text-base">{EXPERIENCE[selectedExpIndex].org}</p>
                    </div>
                  </div>
                  
                  <div className="w-full h-[1px] bg-gradient-to-r from-black/5 to-transparent mb-6 relative z-10" />
                  
                  <p className="text-[15px] text-[#424245] leading-relaxed font-medium relative z-10">
                    {EXPERIENCE[selectedExpIndex].description}
                  </p>

                  <div className="mt-8 flex gap-3 relative z-10">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#1d1d1f] text-xs font-semibold border border-black/5 shadow-sm">
                         <Calendar size={14} className="text-[#86868b]" /> {EXPERIENCE[selectedExpIndex].period}
                      </span>
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#1d1d1f] text-xs font-semibold border border-black/5 shadow-sm">
                         <MapPin size={14} className="text-[#86868b]" /> Khartoum, Sudan
                      </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* EDUCATION - ENHANCED CARD */}
      <section id="education" className="snap-start min-h-screen pt-28 pb-16 bg-gradient-to-tr from-blue-50/50 via-white to-blue-50/50 flex items-start justify-center">
        <ParallaxBackground />
        <div className="max-w-4xl mx-auto px-6 w-full relative z-10">
          <SectionHeading title="Education" />
          {EDUCATION_DATA.map((edu, idx) => (
            <motion.div 
               key={idx} 
               initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={sectionVariants}
               className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-white/50 text-center md:text-left relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50/50 to-transparent rounded-bl-full pointer-events-none" />
              
              <div className="flex flex-col md:flex-row justify-between mb-8 items-center md:items-start gap-4 relative z-10">
                <div>
                  <h3 className="text-2xl font-bold text-[#1d1d1f] tracking-tight">{edu.degree}</h3>
                  <p className="text-[#0071e3] font-semibold mt-1.5 text-lg">{edu.school} | {edu.location}</p>
                </div>
                <span className="text-xs font-bold text-[#86868b] bg-[#F5F5F7] px-5 py-2 rounded-full border border-black/5 tracking-wide">{edu.period}</span>
              </div>
              <div className="pt-8 border-t border-black/5 relative z-10">
                <p className="text-[11px] font-bold text-[#86868b] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#0071e3] rounded-full" />
                    Core Curriculum
                </p>
                <p className="text-[#1d1d1f] leading-relaxed text-[15px] font-medium">{edu.details}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS & PROFESSIONAL DEVELOPMENT - ENHANCED CARDS */}
      <section className="snap-start min-h-screen pt-16 pb-32 bg-white relative flex items-start justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />
        <ParallaxBackground />
          
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <SectionHeading title="Certifications & Professional Development" />
          <motion.div 
            variants={stableContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="grid md:grid-cols-2 gap-5"
          >
            {CERTIFICATES_PARTS.map((part, idx) => (
              <motion.div 
                key={idx} 
                variants={cardStaggerVariants}
                className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] p-6 border border-black/5 shadow-sm hover:shadow-lg transition-all duration-500 group flex flex-col h-full"
              >
                <div className="mb-4 pb-3 border-b border-gray-100 flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl text-[#0071e3] shadow-inner">
                    {idx === 0 ? <Cpu size={24} strokeWidth={1.5} /> : <Award size={24} strokeWidth={1.5} />}
                  </div>
                  <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition-colors">
                    {part.title}
                  </h3>
                </div>
                <div className="space-y-2 flex-grow">
                  {part.items.map((cert, i) => (
                    <motion.div 
                      key={i} 
                      variants={itemVariants}
                      className="group/item p-3 rounded-2xl border border-transparent hover:border-blue-100 bg-transparent hover:shadow-sm cursor-default flex items-start gap-3 hover:bg-gray-50"
                    >
                      <div className="mt-1.5 w-1.5 h-4 rounded-full bg-gray-200 group-hover/item:bg-[#0071e3] group-hover/item:scale-y-110 transition-all shrink-0" />
                      <p className="text-[14px] font-medium text-[#424245] group-hover/item:text-[#1d1d1f] leading-snug transition-colors">
                        {cert}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ADDITIONAL INFO - VISUALLY ENHANCED BENTO LAYOUT */}
      <section className="snap-start min-h-screen pt-28 pb-10 bg-gradient-to-br from-slate-50 to-gray-100 flex items-start justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl opacity-60" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="max-w-5xl mx-auto px-6 w-full relative z-10 flex flex-col h-full justify-between">
          <div>
            <SectionHeading title="Personal Details" />
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.2 }} variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              
              {/* Card 1: Identity & Connect */}
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="md:col-span-1 bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] border border-white/60 relative overflow-hidden group ring-1 ring-black/5"
              >
                  <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0071e3]/5 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
                  
                  <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-white shadow-xl mb-6 group-hover:scale-105 transition-transform duration-500">
                      <img src={PROFILE_IMAGE_URL} alt="Profile" onError={(e) => e.target.style.display = 'none'} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100 -z-10">
                        <User size={32} className="text-gray-400" />
                      </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-[#1d1d1f] tracking-tight">M. Elmugtaba</h3>
                  <p className="text-xs font-medium text-[#0071e3] mt-1 mb-6">Bioinformatician & Pharmacist</p>
                  
                  <div className="flex gap-3 w-full justify-center relative z-10">
                    <a href="mailto:Mujtababarci@gmail.com" className="p-3 rounded-full bg-white text-[#1d1d1f] hover:bg-[#0071e3] hover:text-white transition-all duration-300 shadow-sm border border-black/5">
                      <Mail size={18} strokeWidth={2} />
                    </a>
                    <a href="https://github.com/mujtababarsi" target="_blank" className="p-3 rounded-full bg-white text-[#1d1d1f] hover:bg-[#0071e3] hover:text-white transition-all duration-300 shadow-sm border border-black/5">
                      <Github size={18} strokeWidth={2} />
                    </a>
                  </div>
              </motion.div>

              {/* Card 2: Details Grid */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Location */}
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 flex flex-col justify-between shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] border border-white/60 ring-1 ring-black/5 group"
                  >
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0071e3] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <MapPin size={20} strokeWidth={2} />
                      </div>
                      <div>
                          <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">Location</span>
                          <p className="text-lg font-bold text-[#1d1d1f] mt-1 tracking-tight">{ADDITIONAL_INFO.location}</p>
                          <p className="text-[12px] text-[#86868b] font-medium mt-1">Open to Relocation</p>
                      </div>
                  </motion.div>

                  {/* Languages */}
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 flex flex-col justify-between shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] border border-white/60 ring-1 ring-black/5 group"
                  >
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Globe size={20} strokeWidth={2} />
                      </div>
                      <div>
                          <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">Languages</span>
                          <p className="text-lg font-bold text-[#1d1d1f] mt-1 tracking-tight">{ADDITIONAL_INFO.languages}</p>
                          <p className="text-[12px] text-[#86868b] font-medium mt-1">Native & Professional</p>
                      </div>
                  </motion.div>

                  {/* Status/Visa - Wide Card */}
                  <motion.div 
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="sm:col-span-2 bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-6 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.05)] border border-white/60 ring-1 ring-black/5 group"
                  >
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex-shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Activity size={24} strokeWidth={2} />
                      </div>
                      <div>
                          <span className="text-[10px] font-bold text-[#86868b] uppercase tracking-widest">Professional Status</span>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 mt-2">
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                                <p className="text-[14px] font-semibold text-[#1d1d1f]">Transferable Iqama</p>
                              </div>
                              <div className="hidden sm:block w-px h-5 bg-black/10" />
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                                <p className="text-[14px] font-semibold text-[#1d1d1f]">Valid Driver License</p>
                              </div>
                          </div>
                      </div>
                  </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Integrated Footer Content */}
          <div className="mt-12 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center md:items-end gap-6 pb-4">
            <div className="flex flex-col gap-2 items-center md:items-start text-center md:text-left">
               <p className="text-[11px] text-[#86868b] font-medium tracking-wide">
                 Copyright © {new Date().getFullYear()} Mohamed Elmugtaba. All rights reserved.
               </p>
               <p className="text-[11px] text-[#86868b] font-medium tracking-wide">
                 Designed & Developed by M. Elmugtaba
               </p>
               <div className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity mt-1">
                 <MapPin size={14} strokeWidth={1.5} className="text-[#1d1d1f]" />
                 <span className="text-[11px] text-[#424245] font-medium">Riyadh, KSA</span>
               </div>
            </div>
            <div className="flex items-center gap-5">
               <a 
                 href="https://github.com/mujtababarsi" 
                 target="_blank" 
                 rel="noreferrer"
                 className="text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-300"
                 aria-label="GitHub"
               >
                 <Github size={16} strokeWidth={1.5} />
               </a>
               <a 
                 href="mailto:Mujtababarci@gmail.com" 
                 className="text-[#86868b] hover:text-[#1d1d1f] transition-colors duration-300"
                 aria-label="Email"
               >
                 <Mail size={16} strokeWidth={1.5} />
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button - Apple Style */}
      <motion.button 
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          pointerEvents: 'auto'
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        onMouseEnter={() => setControlsVisible(true)}
        onClick={() => setIsAiOpen(true)} 
        className="fixed bottom-5 right-5 z-40 bg-black/80 backdrop-blur-md text-white p-4 rounded-full shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all group flex items-center gap-0 overflow-hidden hover:pr-6 border border-white/10"
      >
        <Sparkles size={22} />
        <span className="max-w-0 group-hover:max-w-xs transition-all duration-300 overflow-hidden whitespace-nowrap font-medium text-[15px] pl-0 group-hover:pl-3">Ask AI</span>
      </motion.button>

      <AICopilotModal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </div>
  );
}