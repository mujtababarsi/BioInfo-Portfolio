import React, { useState, useEffect, useRef } from 'react';
import { 
  Dna, Terminal, Database, Github, Mail, ExternalLink, ChevronRight, 
  Code2, Award, FlaskConical, Microscope, Cpu, Menu, X, MapPin, 
  Phone, CheckCircle2, Sparkles, Send, Loader2, BrainCircuit, 
  Volume2, User, Cloud, Activity, FileText, Layers, Globe
} from 'lucide-react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURATION & CONSTANTS ---
const PROFILE_IMAGE_URL = "/me.png"; // Updated to PNG
const apiKey = ""; 

const GENOMIC_DATA = [
  { pos: 0, depth: 45 }, { pos: 100, depth: 52 }, { pos: 200, depth: 89 },
  { pos: 300, depth: 120 }, { pos: 400, depth: 40 }, { pos: 500, depth: 65 },
  { pos: 600, depth: 150 }, { pos: 700, depth: 95 }, { pos: 800, depth: 30 }
];

// Updated summary with HEAVY bold styling
const summaryBrief = (
  <>
    <span className="font-black text-black">Bioinformatics Professional & Pharmacist</span> bridging clinical science and computational data. I aim to redefine the frontier of discovery: using <span className="font-black text-black">pharmaceutical insight</span> to frame the essential biological questions and <span className="font-black text-black">computational innovation</span> to manifest the data-driven answers that make <span className="font-black text-black">precision medicine a reality</span>.
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
    title: "Bioinformatics",
    items: ["Single-Cell RNA-seq", "NGS Workflows", "Spatial Transcriptomics", "Multi-omic Analysis"],
    icon: <Dna className="w-6 h-6" />
  },
  {
    title: "Pharmaceutical Science",
    items: ["Clinical Pharmacology", "Precision Medicine", "Mechanism of Action", "Drug Efficacy & Safety"],
    icon: <FlaskConical className="w-6 h-6" />
  },
  {
    title: "Operations & Cloud",
    items: ["Digital Transformation", "Process Optimisation", "Data Governance", "AI/ML Innovation"],
    icon: <Cloud className="w-6 h-6" />
  }
];

const SKILLS = [
  { 
    category: "Languages & Scripting", 
    icon: <Code2 className="w-5 h-5" />, 
    items: ["Python", "R Language", "Bash Scripting", "Linux CLI"] 
  },
  { 
    category: "Bioinformatics Tools", 
    icon: <Microscope className="w-5 h-5" />, 
    items: ["Scanpy", "Scarf", "Scanorama", "Nextflow", "Zarr", "Dask"] 
  },
  { 
    category: "Data Environments", 
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
    <div className="mb-14 text-center">
      <motion.h2 
        initial={{ opacity: 0, y: 10 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] mb-4 tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[#86868b] max-w-2xl mx-auto text-xl md:text-2xl font-normal leading-relaxed"
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
    <div className="mt-6 pt-5 border-t border-[#F5F5F7] w-full">
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

function Footer() {
  return (
    <footer className="py-16 bg-[#F5F5F7] border-t border-[#d2d2d7]/50 relative">
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

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1d1d1f] selection:bg-[#0071e3]/20 relative antialiased">
      <Navbar scrollTo={scrollTo} />

      {/* HERO Section */}
      <section id="home" className="relative pt-32 pb-24 bg-[#F5F5F7] min-h-[90vh] flex items-center scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            
            {/* Left Side */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <ProfilePicHolder />
              
              <div className="mt-10 flex flex-col items-center lg:items-start w-full space-y-4">
                <h1 className="text-5xl md:text-7xl font-semibold text-[#1d1d1f] tracking-tight leading-[1.05]">
                  Mohamed <br/><span className="text-[#86868b]">Elmugtaba</span>
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

            {/* Right Side - Justified Brief Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} 
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <p className="text-xl md:text-2xl text-[#1d1d1f] font-normal leading-relaxed tracking-tight max-w-lg mb-10 text-justify hyphens-auto">
                {summaryBrief}
              </p>
              
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
      <section id="me" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
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

            {/* Apple Health-style Chart Card */}
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

      {/* AREAS OF EXPERTISE - Smart Tags Layout */}
      <section id="expertise" className="py-24 bg-[#F5F5F7] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
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
                <div className="flex flex-wrap gap-2 content-start">
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

      {/* TECHNICAL SKILLS - Apple List Style */}
      <section className="py-24 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Technical Skills" />
          <div className="grid md:grid-cols-3 gap-8">
            {SKILLS.map((skill, idx) => (
              <div key={idx} className="bg-[#F5F5F7] p-8 rounded-[2rem] h-full ring-1 ring-black/5">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-white rounded-xl text-[#0071e3] shadow-sm">{React.cloneElement(skill.icon, { strokeWidth: 2, size: 22 })}</div>
                  <h3 className="text-lg font-semibold text-[#1d1d1f]">{skill.category}</h3>
                </div>
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

      {/* PROJECTS - Large Cards */}
      <section id="projects" className="py-24 bg-[#F5F5F7] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeading title="Selected Projects" />
          <div className="grid md:grid-cols-2 gap-8">
            {PROJECTS.map((p, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="bg-white rounded-[2.5rem] p-10 flex flex-col h-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] ring-1 ring-black/5 overflow-hidden relative group"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0071e3] to-[#40a0ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-2">{p.title}</h3>
                <div className="text-[13px] font-semibold text-[#0071e3] mb-6 uppercase tracking-wider">{p.tools}</div>
                <p className="text-[#424245] mb-8 flex-grow text-[16px] leading-relaxed font-normal">{p.desc}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {p.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-[#F5F5F7] text-[#1d1d1f] text-[12px] font-medium rounded-full border border-black/5">
                      {tag}
                    </span>
                  ))}
                </div>
                <AIProjectInsight project={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE - Timeline Minimalist */}
      <section id="experience" className="py-24 bg-white scroll-mt-24">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading title="Professional Experience" />
          <div className="space-y-12 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-[#F5F5F7] md:before:hidden">
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="relative pl-12 md:pl-0">
                <div className="md:hidden absolute left-4 top-1.5 w-2 h-2 rounded-full bg-[#0071e3] ring-4 ring-white" />
                <div className="bg-[#F5F5F7] p-8 md:p-10 rounded-[2rem] ring-1 ring-black/5 hover:bg-[#F0F0F2] transition-colors">
                  <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 md:items-center">
                    <div>
                      <h4 className="text-2xl font-semibold text-[#1d1d1f]">{exp.role}</h4>
                      <p className="text-[#0071e3] font-medium text-[17px] mt-1">{exp.org}</p>
                    </div>
                    <span className="text-[12px] font-semibold text-[#86868b] bg-white px-4 py-1.5 rounded-full border border-black/5 w-fit">{exp.period}</span>
                  </div>
                  <p className="text-[#424245] text-[16px] leading-relaxed font-normal">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="py-24 bg-[#F5F5F7] scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
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

      {/* CERTIFICATIONS & PROFESSIONAL DEVELOPMENT - Leveled Up Design */}
      <section className="py-24 bg-white scroll-mt-24 border-t border-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">
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

      {/* ADDITIONAL INFO - Bento Small Cards */}
      <section className="py-24 bg-[#F5F5F7] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
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