document.addEventListener('DOMContentLoaded', function() {
    
    particlesJS("particles-js", {
        "particles": { "number": { "value": 50 }, "color": { "value": "#64ffda" }, "shape": { "type": "circle" }, "opacity": { "value": 0.3, "random": true }, "size": { "value": 3, "random": true }, "line_linked": { "enable": false }, "move": { "enable": true, "speed": 1, "direction": "none", "out_mode": "out" } },
        "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": true, "mode": "repulse" } }, "modes": { "bubble": { "distance": 250, "size": 0, "duration": 2, "opacity": 0, "speed": 3 }, "repulse": { "distance": 400, "duration": 0.4 } } }, "retina_detect": true
    });

    // LOGIKA MUSIC 
    const enterButton = document.getElementById('enter-button');
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const music = document.getElementById('background-music');
    const toggleButton = document.getElementById('music-toggle');
    let isPlaying = false;

    enterButton.addEventListener('click', () => {
        gsap.to(splashScreen, {
            duration: 1,
            opacity: 0,
            ease: "power3.inOut",
            onComplete: () => {
                splashScreen.style.display = 'none';
                mainContent.style.display = 'block';
                
                // PLAY musik
                music.play().then(() => {
                    isPlaying = true;
                    toggleButton.textContent = '🔊';
                }).catch(error => console.log("Autoplay musik gagal."));
                
                startMainContentAnimations();
            }
        });
    });

    toggleButton.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            toggleButton.textContent = '🔇';
        } else {
            music.play();
            toggleButton.textContent = '🔊';
        }
        isPlaying = !isPlaying;
    });

    gsap.registerPlugin(ScrollTrigger);

    function startMainContentAnimations() {
        const homeTl = gsap.timeline();
        homeTl.from('.biodata .logo', { duration: 0.8, opacity: 0, y: -30, ease: 'power3.out' })
              .from('.biodata .name', { duration: 0.8, opacity: 0, x: -50, ease: 'power3.out' }, "-=0.5")
              .from('.biodata .details', { duration: 0.5, opacity: 0, x: -30, stagger: 0.2, ease: 'power3.out' }, "-=0.6")
              .from('.three-d-container', { duration: 1.5, opacity: 0, scale: 0.5, ease: 'elastic.out(1, 0.5)' }, "-=0.5");

        const aboutTl = gsap.timeline({
            scrollTrigger: {
                trigger: '#about',
                start: 'top 70%',
            }
        });
        aboutTl.from('.about-text h2, .about-text p', { duration: 1, opacity: 0, y: 50, stagger: 0.3, ease: 'power3.out' });
        
        gsap.to(".shape1", {
            scrollTrigger: { trigger: '#about', scrub: 1 },
            x: 100, scale: 1.5, rotation: 360
        });
        gsap.to(".shape2", {
            scrollTrigger: { trigger: '#about', scrub: 1 },
            x: -150, y: 50, scale: 1.2, rotation: -360
        });
        gsap.to(".shape3", {
            scrollTrigger: { trigger: '#about', scrub: 1 },
            x: 50, y: -100, scale: 2, rotation: 180
        });

        gsap.from(".task-card", {
            scrollTrigger: {
                trigger: '#tugas',
                start: 'top 80%',
            },
            duration: 0.8,
            opacity: 0,
            y: 50,
            scale: 0.9,
            stagger: 0.2,
            ease: 'power3.out'
        });

        //  TILT.JS 
        VanillaTilt.init(document.querySelectorAll(".task-card"), {
            max: 15,          // Maksimal kemiringan kartu
            speed: 400,       // Kecepatan animasi
            glare: true,      // Menambahkan efek kilauan/cahaya
            "max-glare": 0.5  // Intensitas kilauan (0 sampai 1)
        });
    }
});