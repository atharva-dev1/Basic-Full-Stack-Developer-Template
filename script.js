
        document.addEventListener('DOMContentLoaded', () => {
            // Three.js Background Animation
            let scene, camera, renderer, particles, mouseX = 0, mouseY = 0;
            const windowHalfX = window.innerWidth / 2;
            const windowHalfY = window.innerHeight / 2;

            function initBackground() {
                scene = new THREE.Scene();
                camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
                renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg-canvas'), alpha: true });
                renderer.setSize(window.innerWidth, window.innerHeight);

                const particleCount = 5000;
                const positions = new Float32Array(particleCount * 3);
                for (let i = 0; i < particleCount * 3; i++) {
                    positions[i] = (Math.random() - 0.5) * 100;
                }
                const particlesGeometry = new THREE.BufferGeometry();
                particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                const particlesMaterial = new THREE.PointsMaterial({
                    color: 0x38bdf8, size: 0.05, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.6
                });
                particles = new THREE.Points(particlesGeometry, particlesMaterial);
                scene.add(particles);
                camera.position.z = 30;
                document.addEventListener('mousemove', onDocumentMouseMove, false);
                animate();
            }

            function onDocumentMouseMove(event) {
                mouseX = (event.clientX - windowHalfX) / 100;
                mouseY = (event.clientY - windowHalfY) / 100;
            }

            function animate() {
                requestAnimationFrame(animate);
                const time = Date.now() * 0.00005;
                camera.position.x += (mouseX - camera.position.x) * 0.05;
                camera.position.y += (-mouseY - camera.position.y) * 0.05;
                camera.lookAt(scene.position);
                particles.rotation.x = time * 0.2;
                particles.rotation.y = time * 0.4;
                renderer.render(scene, camera);
            }
            // This function makes the background responsive
            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }, false);
            
            initBackground();

            // Header style on scroll
            const header = document.getElementById('header');
            window.addEventListener('scroll', () => header.classList.toggle('glass-effect', window.scrollY > 50));

            // Mobile menu toggle
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenuButton.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
            mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));

            // Contact form
            const contactForm = document.getElementById('contact-form');
            const formStatus = document.getElementById('form-status');
            contactForm.addEventListener('submit', e => {
                e.preventDefault();
                formStatus.textContent = 'Sending...';
                formStatus.className = 'mt-4 text-center text-gray-400';
                setTimeout(() => {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.className = 'mt-4 text-center text-green-400';
                    contactForm.reset();
                    setTimeout(() => formStatus.textContent = '', 3000);
                }, 1500);
            });

            // Nav highlighting on scroll
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('header nav a');
            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => { if (pageYOffset >= section.offsetTop - 150) current = section.id; });
                navLinks.forEach(link => link.classList.toggle('active-nav', link.hash.includes(current)));
            });

            // Scroll reveal animations
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            }, { threshold: 0.1 });
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        });