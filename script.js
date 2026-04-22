import {
    db,
    collection,
    getDocs,
    deleteDoc,
    doc
} from "./firebase.js";

/* ---------------- SAFE INIT ---------------- */
window.addEventListener("load", () => {
    try {
        if (window.AOS) AOS.init();
    } catch (e) {
        console.error("AOS Error:", e);
    }

    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
    }

    loadProjects();
});

/* ---------------- MENU ---------------- */
window.toggleMenu = function () {
    document.getElementById("menu")?.classList.toggle("active");
};

window.closeMenu = function () {
    document.getElementById("menu")?.classList.remove("active");
};

/* ---------------- TYPING ---------------- */
const words = [
    "High-Converting Websites",
    "Modern Web Apps",
    "Business Solutions"
];

let i = 0, j = 0, isDeleting = false;

function type() {
    const el = document.getElementById("typing");
    if (!el) return;

    const current = words[i];

    j = isDeleting ? j - 1 : j + 1;

    el.textContent = current.substring(0, j);

    if (!isDeleting && j === current.length) {
        isDeleting = true;
        return setTimeout(type, 1200);
    }

    if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
    }

    setTimeout(type, isDeleting ? 50 : 100);
}

type();

/* ---------------- PARTICLES SAFE ---------------- */
window.addEventListener("load", () => {
    if (window.particlesJS) {
        particlesJS("particles-js", {
            particles: {
                number: { value: 90 },
                color: { value: "#38bdf8" },
                size: { value: 3 },
                move: { speed: 1.5 },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#38bdf8",
                    opacity: 0.3
                }
            }
        });
    }
});

/* ---------------- SCROLL BUTTON ---------------- */
window.addEventListener("scroll", () => {
    const btn = document.getElementById("backToTop");
    if (!btn) return;

    btn.classList.toggle("show", window.scrollY > 300);
});

/* ---------------- ANIMATIONS ---------------- */
if (window.gsap) {
    gsap.from(".hero h1", {
        y: 60,
        opacity: 0,
        duration: 1.2
    });

    gsap.from(".hero p", {
        y: 30,
        opacity: 0,
        delay: 0.3
    });

    gsap.from(".hero-btns a", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.2
    });

    gsap.from(".work-card", {
        scrollTrigger: ".grid",
        y: 50,
        opacity: 0,
        stagger: 0.2
    });
}

/* ---------------- LOAD PROJECTS ---------------- */
async function loadProjects() {
    const container = document.getElementById("projects");
    if (!container) return;

    const snapshot = await getDocs(collection(db, "projects"));

    container.innerHTML = "";

    let index = 0;
    snapshot.forEach((docSnap) => {
        const p = docSnap.data();

        container.innerHTML += `
            <div class="work-card" data-aos="fade-up" data-aos-delay="${(index % 3) * 100}">
                <h3>✨ ${p.title}</h3>
                <p>${p.description}</p>
            </div>
        `;
        index++;
    });
}

/* ---------------- DELETE ---------------- */
async function deleteProject(id) {
    await deleteDoc(doc(db, "projects", id));
    loadProjects();
}

/* ---------------- GLOBALS ---------------- */
window.deleteProject = deleteProject;

/* ---------------- PREMIUM FEATURES ---------------- */
window.addEventListener("load", () => {
    // 1. CUSTOM GLOWING CURSOR
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    if (cursor && cursorFollower && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = `${mouseX}px`;
            cursor.style.top = `${mouseY}px`;
        });

        function animateCursor() {
            followerX += (mouseX - followerX) * 0.2;
            followerY += (mouseY - followerY) * 0.2;
            cursorFollower.style.left = `${followerX}px`;
            cursorFollower.style.top = `${followerY}px`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    // 2. 3D TILT EFFECT ON CARDS
    document.querySelectorAll('.card, .work-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -15;
            const rotateY = ((x - centerX) / centerX) * 15;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
        });
    });

    // 3. ANIMATED COUNTING STATS
    const stats = document.querySelectorAll('.stat-count');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetEl = entry.target;
                const text = targetEl.getAttribute('data-target');
                const targetNum = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[0-9]/g, '');
                
                let currentNum = 0;
                const duration = 2000;
                const stepTime = Math.max(Math.floor(duration / targetNum), 10);
                
                const timer = setInterval(() => {
                    currentNum += Math.ceil(targetNum / (duration / stepTime));
                    if (currentNum >= targetNum) {
                        currentNum = targetNum;
                        clearInterval(timer);
                    }
                    targetEl.innerText = currentNum + suffix;
                }, stepTime);
                
                obs.unobserve(targetEl);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        stat.setAttribute('data-target', stat.innerText);
        stat.innerText = "0" + stat.innerText.replace(/[0-9]/g, '');
        observer.observe(stat);
    });

    // 5. MOUSE PARALLAX ON FLOATING SHAPES
    const shapes = document.querySelectorAll('.shape');
    if (shapes.length > 0 && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 20;
                if (window.gsap) {
                    gsap.to(shape, {
                        x: x * speed,
                        y: y * speed,
                        duration: 1,
                        ease: "power2.out"
                    });
                }
            });
        });
    }

    // 7. HOW WE WORK PROCESS LINE
    const processSection = document.getElementById('process');
    if (processSection) {
        const line = document.querySelector('.process-line');
        const processObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (window.innerWidth <= 768) {
                    line.style.height = '100%';
                } else {
                    line.style.width = '100%';
                }
                processObserver.disconnect();
            }
        }, { threshold: 0.5 });
        processObserver.observe(processSection);
    }
});
