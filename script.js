// AOS
AOS.init();

// MOBILE MENU
function toggleMenu() {
    document.getElementById("menu").classList.toggle("active");
}

// TYPING EFFECT
const words = [
    "High-Converting Websites",
    "Modern Web Apps",
    "Business Solutions"
];

let i = 0;
let j = 0;
let current = "";
let isDeleting = false;

function type() {
    current = words[i];

    if (isDeleting) {
        j--;
    } else {
        j++;
    }

    document.getElementById("typing").textContent =
        current.substring(0, j);

    if (!isDeleting && j === current.length) {
        isDeleting = true;
        setTimeout(type, 1200);
        return;
    }

    if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
    }

    setTimeout(type, isDeleting ? 50 : 100);
}

type();

// PARTICLES
particlesJS("particles-js", {
    particles: {
        number: { value: 70 },
        size: { value: 3 },
        move: { speed: 2 },
        line_linked: {
            enable: true,
            distance: 150
        }
    }
});
