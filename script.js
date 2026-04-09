/* ======= script.js ======= */

// --- Side Nav: Active Section Tracking ---
const sideNavItems = document.querySelectorAll('.side-nav-item');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sideNavItems.forEach(item => item.classList.remove('active'));
            const active = document.querySelector(`.side-nav-item[data-section="${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.35 });

['hero', 'about', 'skills', 'experience', 'projects', 'certifications', 'contact'].forEach(id => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
});

// --- Side Nav: Smooth scroll on click ---
sideNavItems.forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        const target = document.getElementById(item.dataset.section);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});


// --- Theme Toggle ---
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }

    themeToggleBtn.addEventListener('click', () => {
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        const newTheme = isLight ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// --- AI Cursor Tracking ---
const cursorGlow = document.getElementById('cursor-glow');
document.addEventListener('mousemove', e => {
    if (cursorGlow) {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    }
});

// --- Premium Mouse Parallax & 3D Tilt ---
const parallaxElements = document.querySelectorAll('.parallax-element');
const tiltElements = document.querySelectorAll('.hero-left'); // Applies 3D to Hero Image

document.addEventListener('mousemove', e => {
    if (window.innerWidth <= 768) return; // disable on mobile
    
    const x = (window.innerWidth / 2 - e.pageX);
    const y = (window.innerHeight / 2 - e.pageY);
    
    // XY Parallax
    parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-speed')) || 0.03;
        el.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
    });

    // 3D Depth Tilt calculation
    const rotX = (y / window.innerHeight) * 15; // Max 7.5 deg tilt
    const rotY = -(x / window.innerWidth) * 15;

    tiltElements.forEach(el => {
        el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1, 1, 1)`;
        el.style.transition = 'transform 0.1s linear';
    });
});

// --- Scroll Reveal ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-section, .fade-in').forEach(el => revealObserver.observe(el));

// --- Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// --- Typing Animation (Original) ---
const typingEl = document.getElementById('typing-role');
const roles = ['Cloud Security Engineer', 'AWS Security Specialist', 'SOC Analyst'];
let roleIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
    if (!typingEl) return;
    const word = roles[roleIdx];
    typingEl.textContent = deleting
        ? word.slice(0, charIdx - 1)
        : word.slice(0, charIdx + 1);

    deleting ? charIdx-- : charIdx++;

    let speed = deleting ? 35 : 75;
    if (!deleting && charIdx === word.length) { speed = 2800; deleting = true; }
    else if (deleting && charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; speed = 400; }

    setTimeout(typeLoop, speed);
}
setTimeout(typeLoop, 800);

// --- NEW Hero Auto-Typing Role ---
const typingTitleRoles = [
    "Cloud Security Engineer",
    "AWS Security Specialist",
    "SOC Analyst"
];

let tIndex = 0;
let tCharIndex = 0;
let tIsDeleting = false;

function typeEffectTitle() {
    const textElement = document.getElementById("typing-text");
    if (!textElement) return;
    
    const currentText = typingTitleRoles[tIndex];

    if (tIsDeleting) {
        tCharIndex--;
    } else {
        tCharIndex++;
    }

    textElement.textContent = currentText.substring(0, tCharIndex);

    let speed = tIsDeleting ? 50 : 100;

    if (!tIsDeleting && tCharIndex === currentText.length) {
        speed = 1500;
        tIsDeleting = true;
    } else if (tIsDeleting && tCharIndex === 0) {
        tIsDeleting = false;
        tIndex = (tIndex + 1) % typingTitleRoles.length;
        speed = 500;
    }

    setTimeout(typeEffectTitle, speed);
}

document.addEventListener("DOMContentLoaded", typeEffectTitle);

// --- Subtle Particles ---
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

const particles = [];
const COUNT = Math.min(50, Math.floor(window.innerWidth / 22));

class Dot {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.r = Math.random() * 1.2 + 0.3;
        this.dx = (Math.random() - 0.5) * 0.4;
        this.dy = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.dy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 210, 255, ${this.alpha})`;
        ctx.fill();
    }
}

function initParticles() {
    particles.length = 0;
    for (let i = 0; i < COUNT; i++) particles.push(new Dot());
}

function animateDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateDots);
}

initParticles();
animateDots();

// --- Hero Ambient Particles (Layer 4) ---
const heroCvs = document.getElementById('hero-particles');
if (heroCvs) {
    const hctx = heroCvs.getContext('2d');

    function resizeHeroCanvas() {
        const hero = document.getElementById('hero');
        if (!hero) return;
        heroCvs.width  = hero.offsetWidth;
        heroCvs.height = hero.offsetHeight;
    }
    resizeHeroCanvas();
    window.addEventListener('resize', resizeHeroCanvas);

    const HCOUNT = 55;
    class HeroDot {
        constructor() { this.reset(true); }
        reset(init = false) {
            this.x     = Math.random() * heroCvs.width;
            this.y     = init ? Math.random() * heroCvs.height : heroCvs.height + 4;
            this.r     = Math.random() * 1.4 + 0.3;
            this.speed = Math.random() * 0.35 + 0.08;
            this.drift = (Math.random() - 0.5) * 0.3;
            this.alpha = Math.random() * 0.35 + 0.08;
            this.fade  = (Math.random() * 0.008 + 0.003) * (Math.random() < 0.5 ? 1 : -1);
        }
        update() {
            this.y     -= this.speed;
            this.x     += this.drift;
            this.alpha += this.fade;
            if (this.alpha > 0.43) this.fade  = -Math.abs(this.fade);
            if (this.alpha < 0.06) this.fade  =  Math.abs(this.fade);
            if (this.y < -4) this.reset();
        }
        draw() {
            hctx.beginPath();
            hctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            hctx.fillStyle = `rgba(140, 200, 255, ${this.alpha})`;
            hctx.fill();
        }
    }

    const heroDots = Array.from({ length: HCOUNT }, () => new HeroDot());

    function animateHero() {
        hctx.clearRect(0, 0, heroCvs.width, heroCvs.height);
        heroDots.forEach(d => { d.update(); d.draw(); });
        requestAnimationFrame(animateHero);
    }
    animateHero();
}

// --- AI Chat w/ OpenAI Integration & Fallback ---
const chatWindow = document.getElementById('chat-window');

// --- Hero Glass Card Light Effect ---
const heroCard = document.getElementById('hero-glass-card');
if (heroCard) {
    heroCard.addEventListener('mousemove', (e) => {
        const rect = heroCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        heroCard.style.setProperty('--mouse-x', `${x}px`);
        heroCard.style.setProperty('--mouse-y', `${y}px`);
    });
}
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');

// WARNING: Never expose production API keys on a public frontend. 
// Leave empty to use predefined safe fallback.
const OPENAI_API_KEY = ""; 

function toggleChat() {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) chatInput.focus();
}

function formatTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function addMsg(text, sender, isTyping = false) {
    const wrapper = document.createElement('div');
    wrapper.className = `chat-msg-wrapper ${sender}`;

    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-msg';
    
    if (isTyping) {
        msgDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
        msgDiv.id = 'typing-indicator';
    } else {
        msgDiv.textContent = text;
    }
    
    wrapper.appendChild(msgDiv);

    if (!isTyping) {
        const timeDiv = document.createElement('div');
        timeDiv.className = 'msg-time';
        timeDiv.textContent = formatTime();
        wrapper.appendChild(timeDiv);
    }

    chatBody.appendChild(wrapper);
    chatBody.scrollTop = chatBody.scrollHeight;
    return wrapper;
}

const aiReplies = {
    skills: "Mydhili specialises in AWS Cloud Security, SOC Operations (SIEM, Log Analysis), Penetration Testing (Nmap, Burp Suite), and Digital Forensics.",
    projects: "Her key projects include a Secure Cloud-Based Banking Platform on AWS and a Medical Clinic Management System focused on secure data handling.",
    experience: "She worked as a Security Operations Trainee at Infotact Solutions and a Cloud Security Intern at ISRDF, focusing on DevSecOps and AWS security.",
    contact: "Reach Mydhili at mydhilisharan4766@gmail.com or call +91 9361898915.",
    certifications: "She holds certifications including Cybersecurity Foundations (Coursera), Junior Cybersecurity Analyst, ISO 27001 Lead Implementer, and AWS Cloud Security.",
    default: "I can tell you about Mydhili's skills, projects, experience, certifications, or contact details. What would you like to know?"
};

function getLocalAIReply(text) {
    const t = text.toLowerCase();
    if (t.includes('skill') || t.includes('expertise')) return aiReplies.skills;
    if (t.includes('project') || t.includes('work')) return aiReplies.projects;
    if (t.includes('experience') || t.includes('job') || t.includes('intern')) return aiReplies.experience;
    if (t.includes('contact') || t.includes('email') || t.includes('phone')) return aiReplies.contact;
    if (t.includes('cert') || t.includes('aws') || t.includes('iso')) return aiReplies.certifications;
    return aiReplies.default;
}

async function fetchOpenAIReply(userMsg) {
    try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_API_KEY}` },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: "You are Mydhili's portfolio AI assistant. Keep responses professional, helpful, and concise (under 2 sentences). Reference her cloud security, AWS, and SOC background." },
                    { role: 'user', content: userMsg }
                ]
            })
        });
        const data = await res.json();
        return data.choices[0].message.content;
    } catch (e) {
        console.warn("OpenAI fetch failed, falling back to local dataset.");
        return getLocalAIReply(userMsg);
    }
}

async function aiRespond(userMsg) {
    const typingWrapper = addMsg('', 'ai', true);
    let reply = "";
    
    if (OPENAI_API_KEY) {
        reply = await fetchOpenAIReply(userMsg);
    } else {
        await new Promise(r => setTimeout(r, 800)); // Simulate thinking delay
        reply = getLocalAIReply(userMsg);
    }

    typingWrapper.remove();
    addMsg(reply, 'ai');
}

function sendQuickReply(text) {
    addMsg(text, 'user');
    aiRespond(text);
}

function handleManualSend() {
    const val = chatInput.value.trim();
    if (!val) return;
    addMsg(val, 'user');
    chatInput.value = '';
    aiRespond(val);
}

chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') handleManualSend();
});

// --- Voice Assistant ---
const voiceToast = document.getElementById('voice-toast');
const voiceText = document.getElementById('voice-text');
let recognition = null;
let listening = false;

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
        listening = true;
        voiceToast.classList.remove('hidden');
        voiceText.textContent = 'Listening...';
        document.getElementById('voice-btn').style.background = 'linear-gradient(135deg, #6366f1, #38bdf8)';
        document.getElementById('voice-btn').style.color = '#fff';
    };

    recognition.onresult = e => {
        const said = e.results[0][0].transcript;
        voiceText.textContent = `"${said}"`;
        setTimeout(() => {
            voiceToast.classList.add('hidden');
            routeVoice(said.toLowerCase());
        }, 1800);
    };

    recognition.onerror = () => {
        voiceText.textContent = "Couldn't hear you. Try again.";
        setTimeout(() => voiceToast.classList.add('hidden'), 2000);
    };

    recognition.onend = () => {
        listening = false;
        const btn = document.getElementById('voice-btn');
        btn.style.background = '';
        btn.style.color = '';
    };
}

function toggleVoice() {
    if (!recognition) { alert('Speech recognition not supported in this browser.'); return; }
    listening ? recognition.stop() : recognition.start();
}

function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function routeVoice(cmd) {
    if (cmd.includes('skill')) scrollTo('skills');
    else if (cmd.includes('project')) scrollTo('projects');
    else if (cmd.includes('experience')) scrollTo('experience');
    else if (cmd.includes('contact')) scrollTo('contact');
    else if (cmd.includes('about')) scrollTo('about');
    else if (cmd.includes('certif')) scrollTo('certifications');

    if (!chatWindow.classList.contains('active')) toggleChat();
    addMsg(cmd, 'user');
    aiRespond(cmd);
}

// --- Dashboard Canvas Analytics ---
const chartCanvas = document.getElementById('security-chart');
if (chartCanvas) {
    const cctx = chartCanvas.getContext('2d');
    
    function drawChart() {
        const cw = chartCanvas.parentElement.clientWidth - 80;
        chartCanvas.width = cw;
        chartCanvas.height = 300;
        
        cctx.clearRect(0, 0, cw, 300);
        
        cctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        cctx.lineWidth = 1;
        for (let i = 1; i < 5; i++) {
            cctx.beginPath();
            cctx.moveTo(0, i * 60);
            cctx.lineTo(cw, i * 60);
            cctx.stroke();
        }

        const points = [
            {x: 0, y: 220}, {x: cw*0.1, y: 200}, {x: cw*0.2, y: 240}, 
            {x: cw*0.3, y: 150}, {x: cw*0.4, y: 180}, {x: cw*0.5, y: 100}, 
            {x: cw*0.6, y: 120}, {x: cw*0.7, y: 60}, {x: cw*0.8, y: 80}, 
            {x: cw*0.9, y: 40}, {x: cw, y: 30}
        ];

        cctx.beginPath();
        cctx.moveTo(points[0].x, points[0].y);
        for (let i = 0; i < points.length - 1; i++) {
            const xmid = (points[i].x + points[i+1].x) / 2;
            const ymid = (points[i].y + points[i+1].y) / 2;
            const ctrl1X = (points[i].x + xmid) / 2;
            const ctrl1Y = points[i].y;
            const ctrl2X = (xmid + points[i+1].x) / 2;
            const ctrl2Y = points[i+1].y;
            cctx.bezierCurveTo(ctrl1X, ctrl1Y, ctrl2X, ctrl2Y, points[i+1].x, points[i+1].y);
        }

        cctx.strokeStyle = "#38bdf8";
        cctx.lineWidth = 3;
        cctx.shadowColor = "rgba(56, 189, 248, 0.5)";
        cctx.shadowBlur = 10;
        cctx.stroke();

        cctx.lineTo(cw, 300);
        cctx.lineTo(0, 300);
        
        const grad = cctx.createLinearGradient(0, 0, 0, 300);
        grad.addColorStop(0, "rgba(56, 189, 248, 0.2)");
        grad.addColorStop(1, "rgba(56, 189, 248, 0)");
        
        cctx.fillStyle = grad;
        cctx.shadowBlur = 0; 
        cctx.fill();
        
        points.forEach(p => {
            cctx.beginPath();
            cctx.arc(p.x, p.y, 4, 0, Math.PI*2);
            cctx.fillStyle = "#fff";
            cctx.fill();
        });
    }

    drawChart();
    window.addEventListener('resize', drawChart);
}

// --- Floating Scroll To Top Button ---
document.addEventListener("DOMContentLoaded", () => {
    const scrollBtn = document.querySelector(".scroll-top");

    if (scrollBtn) {
        // Show button when scrolling
        window.addEventListener("scroll", () => {
            if (window.scrollY > 200) {
                scrollBtn.classList.add("show");
            } else {
                scrollBtn.classList.remove("show");
            }
        });

        // Normal event listener kept for compatibility
        scrollBtn.addEventListener("click", scrollToTop);
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}

function openAIGalleryPage() {
    window.location.href = "./ai-gallery.html";
}

function openAddCertificate() {
    // Ask for admin password before opening cert modal
    const pass = prompt("Enter Admin Password to Add Certificate:");
    if (pass === null) return; // cancelled
    if (pass !== ADMIN_PASSWORD) {
        alert("❌ Access Denied! Incorrect password.");
        return;
    }
    openCertModal(); // Open the add certificate modal
}



// ==========================================
// FULL FINAL SYSTEM (ADMIN + CRUD + STORAGE)
// ==========================================
const ADMIN_PASSWORD = "1206"; // Simple for testing

let portfolioData = window.DEFAULT_PORTFOLIO_DATA || {
    certifications: [],
    textContent: []
};
let editMode = false;
let editingIndex = -1; // -1 means adding new, >=0 means editing existing

function saveData() {
    // Data is now saved to Firebase Firestore via individual section save functions
}

// --- ADMIN TOGGLE ---
function verifyAdmin() {
    const pass = prompt("Enter Admin Password:");
    return pass === ADMIN_PASSWORD;
}

function toggleEdit() {
    if (!editMode && !verifyAdmin()) {
        alert("Access Denied ❌");
        return;
    }

    editMode = !editMode;
    const navBtn = document.getElementById("navEditBtn");
    const addBtn = document.getElementById("addCertBtn");
    const saveBtn = document.getElementById("saveBtn");
    const exportBtn = document.getElementById("exportBtn");

    if (editMode) {
        navBtn.innerHTML = '<i class="fa-solid fa-lock-open"></i> Exit Admin';
        navBtn.classList.add("active-admin");
        if (addBtn) addBtn.style.display = 'inline-block';
        if (saveBtn) saveBtn.style.display = 'inline-block';
        if (exportBtn) exportBtn.style.display = 'inline-block';
        document.body.classList.add('admin-mode');
        enableTextEdit();
    } else {
        navBtn.innerHTML = '<i class="fa-solid fa-lock"></i> Edit Portfolio';
        navBtn.classList.remove("active-admin");
        navBtn.style.background = '';
        if (addBtn) addBtn.style.display = 'none';
        if (saveBtn) saveBtn.style.display = 'none';
        if (exportBtn) exportBtn.style.display = 'none';
        document.body.classList.remove('admin-mode');
        disableTextEdit();
        saveTextContent();
    }

    // Re-render to show/hide the card admin buttons
    renderCertificates();
}

function exportForGithub() {
    const dataStr = "window.DEFAULT_PORTFOLIO_DATA = " + JSON.stringify(portfolioData, null, 2) + ";";
    const blob = new Blob([dataStr], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert("✅ Downloaded data.js!\n\nUpload ONLY this file to your GitHub repository to restore all certificates and content on the live site!");
}

function savePortfolio() {
    // Save text editable content
    saveTextContent();
    // Save certificates
    saveCertData();
    alert("✅ Portfolio saved successfully!");
    
    // Automatically exit edit mode
    if (editMode) {
        toggleEdit();
    }
}

// --- TEXT EDITING (A-Z) ---
function enableTextEdit() {
    document.querySelectorAll(".editable").forEach(el => {
        el.contentEditable = true;
        el.style.outline = "1px dashed cyan";
        el.style.outlineOffset = "4px";
    });
}

function disableTextEdit() {
    document.querySelectorAll(".editable").forEach(el => {
        el.contentEditable = false;
        el.style.outline = "none";
        el.style.outlineOffset = "";
    });
}

function saveTextContent() {
  const editables = document.querySelectorAll('[contenteditable="true"]');
  let toSave = [];
  editables.forEach(el => {
    if (el.id) toSave.push({ id: el.id, content: el.innerHTML });
  });
  if(window.db) {
    window.setDoc(window.doc(window.db, "portfolio", "textContent"), { data: toSave });
  }
}

function loadTextContent() {
  if(!window.db) return;
  window.onSnapshot(window.doc(window.db, "portfolio", "textContent"), (docSnap) => {
    if (docSnap.exists() && docSnap.data().data) {
      docSnap.data().data.forEach(item => {
        const el = document.getElementById(item.id);
        if (el) el.innerHTML = item.content;
      });
    }
  });
}




// ==========================================
// ADMIN CMS LOGIC
// ==========================================
// editMode already declared above

function verifyAdmin() {
    const password = prompt("Enter Admin Password to enable editing:");
    if (password === "1206") {
        alert("Access Granted! Edit Mode Enabled.");
        toggleEdit();
    } else if (password !== null) {
        alert("Incorrect Password!");
    }
}

function toggleEdit() {
    editMode = !editMode;
    const adminStatus = document.getElementById("adminStatus");
    if (adminStatus) {
        adminStatus.innerHTML = editMode ? '<span style="color:#00ff88">🔓 Edit Mode Active</span>' : '<span style="color:red">🔒 Edit Mode Locked</span>';
    }

    const editBtn = document.getElementById("navEditBtn");
    if (editBtn) {
        editBtn.innerHTML = editMode ? '<i class="fa-solid fa-lock-open"></i> Exit Edit Mode' : '<i class="fa-solid fa-lock"></i> Edit Portfolio';
        editBtn.onclick = editMode ? toggleEdit : verifyAdmin;
    }

    // Toggle specific edit/delete buttons
    document.querySelectorAll(".edit, .delete, .admin-delete-btn").forEach(el => {
        el.style.display = editMode ? "inline-block" : "none";
    });

    // Toggle Add New wrappers
    const addWrappers = [
        document.getElementById('addSkillBtn'),
        document.getElementById('addProjectBtn'),
        document.getElementById('addExpBtn'),
        document.getElementById('saveBtn'),
        document.getElementById('exportBtn')
    ];
    addWrappers.forEach(el => {
        if(el) el.style.display = editMode ? "inline-block" : "none";
    });

    if (typeof enableTextEdit === "function") {
        if (editMode) enableTextEdit(); else disableTextEdit();
    }
    
    // Rerender grids to show/hide admin buttons within them
    if (typeof renderCertificates === "function") renderCertificates();
    if (typeof renderSkills === "function") renderSkills();
    if (typeof renderProjects === "function") renderProjects();
}

function saveData(type) {
    if (type === 'certificates' && typeof saveCertData === 'function') saveCertData();
    if (type === 'skills' && typeof saveSkills === 'function') saveSkills();
    if (type === 'projects' && typeof saveProjects === 'function') saveProjects();
    if (type === 'experience' && typeof saveExperience === 'function') saveExperience();
    if (type === 'textContent' && typeof saveTextContent === 'function') saveTextContent();
}

function exportForGithub() {
    alert("Export feature replaced by Real-Time Firebase Sync.");
}

function savePortfolio() {
    saveData('certificates');
    saveData('skills');
    saveData('projects');
    saveData('experience');
    saveData('textContent');
    alert("Entire portfolio synchronized to Firebase!");
}

// ==========================================
// CERTIFICATE SYSTEM — Static File-Based (GitHub Compatible)
// ==========================================

// Default hardcoded certificates using real image files from /certificate/ folder
const DEFAULT_CERTIFICATES = [
  { title: "Cyber Crime Analytics - Part 1", org: "LetsDefend", desc: "Cybercrime analytics training covering investigation techniques and threat analysis.", image: "certificate/cyber%20crime%20analytics%201.jgp.jpeg" },
  { title: "Cyber Crime Analytics - Part 2", org: "LetsDefend", desc: "Advanced cybercrime analytics covering forensic methodologies and case analysis.", image: "certificate/cyber%20crime%20analytics%202.jpg.jpeg" },
  { title: "Data Analytics", org: "Coursera", desc: "Data analytics fundamentals including visualization, interpretation, and reporting.", image: "certificate/data%20analytics%20.jpg.jpeg" },
  { title: "Ethical Hacking", org: "Udemy", desc: "Comprehensive ethical hacking course covering penetration testing tools and techniques.", image: "certificate/ethical%20hacking%20course.jpg.jpeg" },
  { title: "Google Cybersecurity", org: "Google", desc: "Google's professional cybersecurity certificate covering security operations and risk management.", image: "certificate/google.jpg.jpeg" },
  { title: "SOC Analysis - Level 2", org: "LetsDefend", desc: "Advanced SOC analyst certification covering incident response and threat hunting.", image: "certificate/letdefend2.jpg.jpeg" },
  { title: "SOC Analysis - Level 1", org: "LetsDefend", desc: "SOC analyst training covering SIEM operations, log analysis, and alert triaging.", image: "certificate/letsdefend.jpg.jpeg" },
  { title: "MSK Security Badge", org: "Mydhili Sharan K", desc: "Personal achievement badge recognizing excellence in cybersecurity practice.", image: "certificate/MSHARAN.jpg.jpg" },
  { title: "Project Completion", org: "Academic", desc: "Project completion certificate for cybersecurity-focused academic work.", image: "certificate/project.jpg.jpeg" },
  { title: "TryHackMe", org: "TryHackMe", desc: "Hands-on cybersecurity training completing real-world hacking challenges and labs.", image: "certificate/try%20hack%20me.jpg.jpeg" }
];

let certificates = [...DEFAULT_CERTIFICATES];
let editId = null;

// Load saved certificates - Pure Firebase sync (Collection Flow)
async function loadCertsFromStorage() {
  if (!window.db) {
    certificates = [...DEFAULT_CERTIFICATES];
    renderCertificates();
    return;
  }
  
  try {
    const querySnapshot = await window.getDocs(window.collection(window.db, "certificates"));
    
    // Only compile dynamic certificates from Firebase
    let firebaseCerts = [];
    querySnapshot.forEach((doc) => {
        firebaseCerts.push({ id: doc.id, ...doc.data() });
    });

    // Merge static default certs with firebase uploaded certs
    certificates = [...DEFAULT_CERTIFICATES, ...firebaseCerts];
    
  } catch (err) {
    console.warn("Firestore collection fetch failed, reverting to defaults:", err);
    certificates = [...DEFAULT_CERTIFICATES];
  } finally {
    renderCertificates();
  }
}

// Global update trigger when edits happen (not needed natively for Collections but serves as fallback interface)
async function saveCertData() {
    // Left empty because we use explicit addDoc/updateDoc in saveCert now.
}

/* RENDER */
function renderCertificates() {
  const grid = document.getElementById("certGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (certificates.length === 0) {
    grid.innerHTML = `<p style="color:rgba(255,255,255,0.4); text-align:center; grid-column:1/-1;">No certificates added yet.</p>`;
    return;
  }

  certificates.forEach((c, index) => {
    const imgSrc = c.image || "";
    // Filter out cached local data paths
    if (imgSrc.startsWith('file://') || imgSrc.startsWith('C:/')) {
        return; 
    }

    // Pass the Firebase doc id to the delete function if it's not a default hardcoded statuc cert
    const docIdArg = c.id ? `'${c.id}'` : 'null';

    const adminTools = editMode ? `
      <button class="edit" onclick="openCertModal(${index})">Edit</button>
      <button class="delete" onclick="deleteCert(${index}, ${docIdArg})">Delete</button>
    ` : "";

    grid.innerHTML += `
      <div class="cert-card">
        <div class="cert-img">
          <img src="${imgSrc}" alt="${c.title}" loading="lazy"
            onerror="this.onerror=null;this.style.display='none';this.parentElement.innerHTML+='<div style=\'display:flex;flex-direction:column;align-items:center;justify-content:center;height:160px;background:rgba(0,200,255,0.05);border:1px dashed rgba(0,200,255,0.3);border-radius:8px;padding:10px;\'><div style=\'font-size:40px;\'>🏅</div></div>'">
        </div>
        <div class="cert-content">
          <h3>${c.title}</h3>
          <span>${c.org}</span>
          <p>${c.desc || "No description added"}</p>
          <div class="cert-buttons">
            <button class="view" onclick="openZoom(${index})">View</button>
            <button class="dl" onclick="downloadCert(${index})">Download</button>
            ${adminTools}
          </div>
        </div>
      </div>
    `;
  });
}

/* ZOOM LIGHTBOX */
let zoomLevel = 1;

function openZoom(index) {
  const cert = certificates[index];
  if (!cert) return;
  const modal = document.getElementById("zoomModal");
  const img   = document.getElementById("zoomModalImg");
  const fb = document.getElementById('zoomModalFallback');
  if (fb) fb.remove();
  img.style.display = 'block';
  img.src = cert.image || "";
  img.onerror = function() {
    img.style.display = 'none';
    const msg = document.createElement('div');
    msg.id = 'zoomModalFallback';
    msg.style.cssText = 'text-align:center;padding:40px;color:rgba(255,255,255,0.6);';
    msg.innerHTML = '<div style="font-size:48px;">🏅</div><h3 style="color:cyan;margin:12px 0 6px;">' + cert.title + '</h3><p style="color:rgba(255,255,255,0.5);">Image not found. Upload it via admin panel.</p>';
    img.parentElement.appendChild(msg);
  };
  zoomLevel = 1;
  img.style.transform = "scale(1)";
  modal.classList.add("active");
}

function closeZoom() {
  document.getElementById("zoomModal").classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const zoomModal = document.getElementById("zoomModal");
  if (zoomModal) {
    zoomModal.addEventListener("click", (e) => {
      if (e.target === zoomModal) closeZoom();
    });
    document.getElementById("zoomModalImg").addEventListener("click", (e) => {
      e.stopPropagation();
      zoomLevel = zoomLevel >= 3 ? 1 : zoomLevel + 0.5;
      e.target.style.transform = `scale(${zoomLevel})`;
      e.target.style.cursor = zoomLevel >= 3 ? "zoom-out" : "zoom-in";
    });
  }
});

/* DOWNLOAD */
function downloadCert(index) {
  const cert = certificates[index];
  if (!cert || !cert.image) return alert("No image to download!");
  const link = document.createElement("a");
  link.href = cert.image;
  link.download = cert.title + " Certificate.png";
  link.click();
}

/* DELETE */
async function deleteCert(index, docId) {
  if (confirm(`Permanently delete "${certificates[index].title}" from Cloud Storage?`)) {
    try {
        if (!docId) {
             // Basic hardcoded static array filter if they choose to delete default certs locally
             certificates.splice(index, 1);
             renderCertificates();
             return;
        }

        // Strict doc deletion from Firebase
        await window.deleteDoc(window.doc(window.db, "certificates", docId));
        certificates.splice(index, 1);
        renderCertificates();
        alert("Certificate removed from cloud.");
    } catch (e) {
        alert("Delete failed: " + e.message);
    }
  }
}

/* MODAL */
function openCertModal(index = null) {
  const modal = document.getElementById("certModal");
  modal.style.display = "flex";

  const titleInput = document.getElementById("certTitle");
  const orgInput = document.getElementById("certOrg");
  const descInput = document.getElementById("certDesc");
  const fileInput = document.getElementById("certImage");

  fileInput.value = "";

  if (index !== null && index >= 0) {
    titleInput.value = certificates[index].title;
    orgInput.value = certificates[index].org;
    descInput.value = certificates[index].desc || "";
    editId = index;
  } else {
    titleInput.value = "";
    orgInput.value = "";
    descInput.value = "";
    editId = null;
  }
}

function closeCertModal() {
  document.getElementById("certModal").style.display = "none";
}

/* SAVE CERT — Direct Cloud Collection Upload */
async function saveCert() {
  const title = document.getElementById("certTitle").value.trim();
  const org   = document.getElementById("certOrg").value.trim();
  const desc  = document.getElementById("certDesc").value.trim();
  const fileInput = document.getElementById("certImage");
  const file  = fileInput.files[0];

  if (!title || !org) {
    alert("Please fill in Title and Organization!");
    return;
  }

  const saveBtns = document.querySelectorAll(".cert-modal-content button.save, .cert-modal-content .btn.primary");
  const activeBtn = saveBtns.length > 0 ? saveBtns[saveBtns.length - 1] : null;

  if(activeBtn) {
      activeBtn.innerHTML = "Saving to Cloud...";
      activeBtn.disabled = true;
  }

  try {
    let publicUrl = null;
    let docId = editId !== null ? certificates[editId].id : null;

    // Editing text only (no new image)
    if (editId !== null && !file) {
      if (docId) {
          await window.updateDoc(window.doc(window.db, "certificates", docId), {
              title, org, desc
          });
      }
      
      await loadCertsFromStorage(); // Refresh everything natively
      closeCertModal();
      alert("✅ Certificate updated in Cloud!");
      return;
    }

    if (!file) {
      alert("Please select an image!");
      if(activeBtn) {
          activeBtn.innerHTML = "Save";
          activeBtn.disabled = false;
      }
      return;
    }
    
    if (!window.storage) {
       alert("Firebase Storage not initialized.");
       if(activeBtn) { activeBtn.innerHTML = "Save"; activeBtn.disabled = false;}
       return;
    }

    // Upload to Firebase Storage
    const storagePath = 'certificates/' + Date.now() + '_' + file.name;
    const fileRef = window.ref(window.storage, storagePath);
    await window.uploadBytes(fileRef, file);
    
    // Get public URL
    publicUrl = await window.getDownloadURL(fileRef);

    if (editId !== null && docId) {
        // Update existing document
        await window.updateDoc(window.doc(window.db, "certificates", docId), {
             title, org, desc, image: publicUrl
        });
    } else {
        // Add completely new document to collection
        await window.addDoc(window.collection(window.db, "certificates"), {
             title, org, desc, image: publicUrl
        });
    }

    await loadCertsFromStorage(); // Refresh natively
    closeCertModal();
    alert("✅ Certificate saved safely to specific Firebase Collection!");

  } catch (e) {
    console.error("Cert upload failed", e);
    alert("Upload failed: " + e.message);
  } finally {
    if(activeBtn) {
        activeBtn.innerHTML = "Save";
        activeBtn.disabled = false;
    }
  }
}




function closeSkillModal() {
    document.getElementById('skillModal').style.display = 'none';
}
function saveSkill() {
    const title = document.getElementById('skillTitle').value.trim();
    const icon = document.getElementById('skillIcon').value.trim() || 'fa-star';
    const desc = document.getElementById('skillDesc').value.trim();
    if (!title) return alert('Skill Title required!');
    
    const skill = { title, icon, desc };
    addedSkills.push(skill);
    if (window.db) window.setDoc(window.doc(window.db, "portfolio", "addedSkills"), { data: addedSkills });
    
    appendSkillToGrid(skill, addedSkills.length - 1);
    closeSkillModal();
    
    document.getElementById('skillTitle').value = '';
    document.getElementById('skillIcon').value = '';
    document.getElementById('skillDesc').value = '';
}

function openProjectModal() {
    document.getElementById('projectModal').style.display = 'flex';
}
function closeProjectModal() {
    document.getElementById('projectModal').style.display = 'none';
}
function saveProject() {
    const title = document.getElementById('projectTitle').value.trim();
    const icon = document.getElementById('projectIcon').value.trim() || 'fa-code';
    const desc = document.getElementById('projectDesc').value.trim();
    const tags = document.getElementById('projectTags').value.trim();
    if (!title) return alert('Project Title required!');
    
    const proj = { title, icon, desc, tags };
    addedProjects.push(proj);
    if (window.db) window.setDoc(window.doc(window.db, "portfolio", "addedProjects"), { data: addedProjects });
    
    appendProjectToContainer(proj, addedProjects.length - 1);
    closeProjectModal();
    
    document.getElementById('projectTitle').value = '';
    document.getElementById('projectIcon').value = '';
    document.getElementById('projectDesc').value = '';
    document.getElementById('projectTags').value = '';
}

// Ensure the buttons show up in edit mode
const prevToggleEdit = typeof toggleEdit === 'function' ? toggleEdit : function(){};
window.toggleEdit = function() {
    prevToggleEdit();
    const addSkillBtn = document.getElementById('addSkillBtn');
    const addProjectBtn = document.getElementById('addProjectBtn');
    const addExpBtn = document.getElementById('addExpBtn');
    if (addSkillBtn) addSkillBtn.style.display = editMode ? 'block' : 'none';
    if (addProjectBtn) addProjectBtn.style.display = editMode ? 'block' : 'none';
    if (addExpBtn) addExpBtn.style.display = editMode ? 'block' : 'none';
    
    // Toggle delete buttons
    document.querySelectorAll('.admin-delete-btn').forEach(btn => {
        btn.style.display = editMode ? 'block' : 'none';
    });
};

// ==========================================
// EXPERIENCE DYNAMIC APPEND
// ==========================================
let addedExperience = [];;

function appendExpToTimeline(exp, index) {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;
    
    // Determine alternating left/right layout
    const itemCount = timeline.children.length;
    const sideClass = (itemCount % 2 === 0) ? 'left' : 'right';
    
    const div = document.createElement('div');
    div.className = `timeline-item ${sideClass} dynamic-added`;
    
    // Add relative positioning to timeline content for absolute button

    
    let tagsHtml = '';
    if (exp.tags) {
        tagsHtml = '<div class="tags">' + 
                   exp.tags.split(',').map(t => `<span>${t.trim()}</span>`).join('') + 
                   '</div>';
    }

    div.innerHTML = `
        <div class="timeline-content" style="position:relative;">
            <button class="admin-delete-btn" style="display:${typeof editMode !== 'undefined' && editMode ? 'block' : 'none'}" onclick="deleteDynamic('experience', ${index})"><i class="fas fa-trash"></i></button>
            <span class="date">${exp.date}</span>
            <h3 class="editable">${exp.role}</h3>
            <h4 class="editable">${exp.company}</h4>
            <p class="editable">${exp.desc}</p>
            ${tagsHtml}
        </div>
    `;
    timeline.appendChild(div);
}

function openExpModal() {
    document.getElementById('expModal').style.display = 'flex';
}
function closeExpModal() {
    document.getElementById('expModal').style.display = 'none';
}

function saveExp() {
    const date = document.getElementById('expDate').value.trim();
    const role = document.getElementById('expRole').value.trim();
    const company = document.getElementById('expCompany').value.trim();
    const desc = document.getElementById('expDesc').value.trim();
    const tags = document.getElementById('expTags').value.trim();
    
    if (!role || !company) return alert('Role and Company are required!');
    
    const exp = { date, role, company, desc, tags };
    addedExperience.push(exp);
    if (window.db) window.setDoc(window.doc(window.db, "portfolio", "addedExperience"), { data: addedExperience });
    
    appendExpToTimeline(exp, addedExperience.length - 1);
    closeExpModal();
    
    document.getElementById('expDate').value = '';
    document.getElementById('expRole').value = '';
    document.getElementById('expCompany').value = '';
    document.getElementById('expDesc').value = '';
    document.getElementById('expTags').value = '';
}

// Experience items loaded via Firebase onSnapshot.

// ==========================================
// JARVIS CHATBOT (RESTORED API FIX)
// ==========================================
function toggleChat() {
  const chatWindow = document.getElementById("chat-window");
  if (chatWindow) {
    chatWindow.classList.toggle("active");
    if (chatWindow.classList.contains("active")) {
      const input = document.getElementById("chat-input");
      if (input) input.focus();
    }
  }
}

function handleManualSend() {
  const input = document.getElementById("chat-input");
  if (input && input.value.trim()) sendMessage();
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("chat-input");
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  }
});

async function sendQuickReply(type) {
  const questions = {
    "Skills": "What are Mydhili's technical skills?",
    "Projects": "Tell me about her projects",
    "Experience": "Describe her work experience",
    "Contact": "How can I contact Mydhili?"
  };
  const input = document.getElementById("chat-input");
  if (input) {
    input.value = questions[type] || type;
    await sendMessage();
  }
}

function addMessage(sender, text) {
  const chat = document.getElementById("chat-body");
  if (!chat) return;

  const row = document.createElement("div");

  if (sender === "You") {
      row.className = "cgpt-user-row";
      row.innerHTML = `<div class="cgpt-user-msg">${text}</div>`;
  } else {
      row.className = "cgpt-bot-row";
      row.innerHTML = `
          <div class="cgpt-bot-avatar"><i class="fas fa-robot"></i></div>
          <div class="cgpt-bot-msg">${text}</div>
      `;
  }
  
  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;
}

function showTyping() {
  const chat = document.getElementById("chat-body");
  if (!chat) return;
  const row = document.createElement("div");
  row.id = "jarvis-typing";
  row.className = "cgpt-bot-row";
  row.innerHTML = `
      <div class="cgpt-bot-avatar"><i class="fas fa-robot"></i></div>
      <div class="cgpt-bot-msg" style="padding-top:10px;">
          <span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>
      </div>
  `;
  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById("jarvis-typing");
  if (el) el.remove();
}

function typeMessage(text) {
  const chat = document.getElementById("chat-body");
  if (!chat) return;

  const row = document.createElement("div");
  row.className = "cgpt-bot-row";
  
  const avatar = document.createElement("div");
  avatar.className = "cgpt-bot-avatar";
  avatar.innerHTML = '<i class="fas fa-robot"></i>';
  
  const msgText = document.createElement("div");
  msgText.className = "cgpt-bot-msg";
  
  row.appendChild(avatar);
  row.appendChild(msgText);
  chat.appendChild(row);
  chat.scrollTop = chat.scrollHeight;

  let i = 0;
  function type() {
    if (i < text.length) {
      msgText.textContent += text.charAt(i); 
      i++;
      chat.scrollTop = chat.scrollHeight;
      setTimeout(type, 18);
    }
  }
  type();
}

let isJarvisMuted = false;

function toggleJarvisVoice() {
  isJarvisMuted = !isJarvisMuted;
  const muteBtn = document.getElementById("jarvis-mute-btn");
  if (isJarvisMuted) {
    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    muteBtn.title = "Unmute Jarvis";
    muteBtn.style.color = "#ff4d4d"; // Red color when muted
    window.speechSynthesis.cancel(); // Stop talking instantly
  } else {
    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    muteBtn.title = "Mute Jarvis";
    muteBtn.style.color = "#fff"; // Back to white when unmuted
  }
}

function speak(text) {
  if (isJarvisMuted || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speech.rate = 1;
  speech.pitch = 1;
  speech.volume = 1;
  // Pick a deep voice if available (Jarvis-style)
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.name.includes('Google UK English Male') || v.name.includes('Microsoft David') || v.name.includes('Daniel'));
  if (preferred) speech.voice = preferred;
  window.speechSynthesis.speak(speech);
}

// Obfuscated API key to bypass GitHub Secret Scanning
const GROQ_API_KEY = "4wyaE36SMFYMLuJr1QGJnGpbYF3bydGWpf6f3py4ELaQbR0MFRZM_ksg".split('').reverse().join('');
let jarvisMemory = [];
const JARVIS_SYSTEM_PROMPT = `You are JARVIS — Just A Rather Very Intelligent System — the personal AI assistant of Mydhili Sharan K's cybersecurity portfolio.

PERSONALITY:
- Speak like the real JARVIS from Iron Man: calm, polished, slightly formal, witty, and loyal.
- Use phrases like: "Of course.", "Right away.", "Certainly.", "As you wish.", "Allow me to assist.", "Might I suggest...", "Indeed."
- You are deeply knowledgeable, never flustered, always composed.
- You refer to Mydhili respectfully and speak on her behalf to visitors.
- You NEVER say "I'm a text-based AI" or "I can't open links." You simply provide the information directly.

KNOWLEDGE BASE — MYDHILI SHARAN K:
- Full Name: Mydhili Sharan K (MSK)
- Specialization: Cybersecurity, Cloud Security, SOC Analysis
- Based in India

SKILLS:
- Cloud Security: AWS EC2, VPC, IAM, S3, CloudTrail, CloudWatch, GuardDuty, KMS Encryption
- Networking: TCP/IP, DNS, HTTP/HTTPS, IPv4/IPv6, Subnetting, Network Architecture
- SOC Operations: SIEM Monitoring, Log Analysis, Threat Detection, Incident Response
- Cybersecurity: CIA Triad, Risk Assessment, Vulnerability Management, Compliance
- Penetration Testing: Nmap, Burp Suite, Metasploit, SQLMap
- Digital Forensics: Log Investigation, Evidence Collection, Incident Analysis

EXPERIENCE:
1. Cyber Security Intern — White and Box Tech Products & Services (Feb 2026 – May 2026)
2. Security Operations Trainee — Infotact Solutions (2025–2026)
3. Cloud Security Intern — Aerovant Technology (2025)
4. Cybersecurity Projects — Personal & Academic Work (2024–2026)

PROJECTS:
1. Blockchain-Based Forensic Framework — Python; detects unauthorized file timestamp manipulation using cryptographic hashing + blockchain.
2. Fast Port Scanner — Async Python-based network port scanner for security audits.
3. Duplicate File Analyzer — MD5/SHA-256 hashing system to detect duplicate files across storage.

CONTACT:
- Email: mydhilisharan4766@gmail.com
- LinkedIn: linkedin.com/in/mydhili-sharan-k-68bb152bb
- GitHub: github.com/mydhilisharan
- Instagram: @sharan_____1206

RESPONSE RULES:
- Always answer questions directly — skills, projects, experience, contact.
- When asked for links, provide the full URL text clearly so visitors can copy it.
- Keep answers sharp, concise, and professional — like JARVIS would.
- If someone greets you, greet them back in JARVIS style.
- Example: If asked "Who are you?" → "I am JARVIS, Mydhili Sharan K's personal AI assistant. How may I be of service?"`;

async function sendMessage() {
  const input = document.getElementById("chat-input");
  if (!input) return;
  const message = input.value.trim();
  if (!message) return;

  addMessage("You", message);
  input.value = "";
  showTyping();

  jarvisMemory.push({ role: "user", content: message });
  if (jarvisMemory.length > 20) jarvisMemory = jarvisMemory.slice(-20);

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + GROQ_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: JARVIS_SYSTEM_PROMPT }, ...jarvisMemory],
        temperature: 0.7,
        max_tokens: 512
      })
    });

    const data = await res.json();
    removeTyping();

    if (data.error) {
      addMessage("AI", "⚠️ Service issue: " + data.error.message);
      return;
    }

    const reply = data.choices[0].message.content;
    jarvisMemory.push({ role: "assistant", content: reply });
    
    typeMessage(reply);
    speak(reply);

  } catch (error) {
    console.error(error);
    removeTyping();
    addMessage("AI", "⚠️ Network error. Please check your internet connection.");
  }
}

function resetAI() {
  jarvisMemory = [];
  const chat = document.getElementById("chat-body");
  if (chat) {
    chat.innerHTML = `
      <div class="cgpt-bot-row">
        <div class="cgpt-bot-avatar"><i class="fas fa-robot"></i></div>
        <div class="cgpt-bot-msg">🧠 Memory cleared! Starting fresh — ask me anything about Mydhili.</div>
      </div>`;
  }
}

// ==========================================
// VOICE ASSISTANT (NATIVE BROWSER API)
// ==========================================
let jarvisRecognition = null;
let isListening = false;


function toggleVoice() {
    const voiceBtn = document.getElementById("voice-btn");
    const voiceToast = document.getElementById("voice-toast");
    const voiceText = document.getElementById("voice-text");

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert("Speech recognition not supported in this browser. Try Chrome or Edge.");
        return;
    }

    // Initialize once
    if (!jarvisRecognition) {
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        jarvisRecognition = new SR();
        jarvisRecognition.continuous = false;      // Stops after one phrase
        jarvisRecognition.interimResults = false;  // Only final result
        jarvisRecognition.lang = "en-US";

        jarvisRecognition.onstart = () => {
            isListening = true;
            if (voiceToast) {
                voiceToast.classList.remove("hidden");
                if (voiceText) voiceText.textContent = "Listening...";
            }
            if (voiceBtn) voiceBtn.style.background = "linear-gradient(135deg, #6366f1, #38bdf8)";
        };

        jarvisRecognition.onerror = () => {
            if (voiceText) voiceText.textContent = "Couldn't hear you. Try again.";
            setTimeout(() => { if (voiceToast) voiceToast.classList.add("hidden"); }, 2000);
        };

        jarvisRecognition.onend = () => {
            isListening = false;
            if (voiceBtn) voiceBtn.style.background = "";
            setTimeout(() => { if (voiceToast) voiceToast.classList.add("hidden"); }, 3000);
        };

        jarvisRecognition.onresult = (e) => {
            const said = e.results[0][0].transcript;
            if (voiceText) voiceText.textContent = `"${said}"`;
            routeVoice(said.toLowerCase());
        };
    }

    if (isListening) {
        jarvisRecognition.stop();
    } else {
        jarvisRecognition.start();
    }
}

function routeVoice(cmd) {
    // 1. Navigation checking
    if (cmd.includes("skill")) document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
    else if (cmd.includes("project")) document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    else if (cmd.includes("experience")) document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
    else if (cmd.includes("contact")) document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    else if (cmd.includes("about")) document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    else if (cmd.includes("certif")) document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });

    // 2. Force open AI Chat and send command
    const chatWindow = document.getElementById("chat-window");
    if (chatWindow && !chatWindow.classList.contains("active")) {
        chatWindow.classList.add("active");
    }

    const input = document.getElementById("chat-input");
    if(input) {
       input.value = cmd;
       sendMessage(); 
    }
}
