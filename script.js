/*==================== TOGGLE ICON NAVBAR (Mobile) ====================*/
        let menuIcon = document.querySelector('#menu-icon');
        let navbar = document.querySelector('.navbar');

        menuIcon.onclick = () => {
            menuIcon.classList.toggle('bx-x');
            navbar.classList.toggle('active');
        };

        /*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
        let sections = document.querySelectorAll('section');
        let navLinks = document.querySelectorAll('header nav a');

        // Close mobile menu after a link is tapped
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuIcon.classList.remove('bx-x');
                navbar.classList.remove('active');
            });
        });

        const progressBar = document.querySelector('#scroll-progress-bar');
        const header = document.querySelector('header');

        document.addEventListener('pointermove', (event) => {
            const x = (event.clientX / window.innerWidth - 0.5) * 24;
            const y = (event.clientY / window.innerHeight - 0.5) * 24;

            document.documentElement.style.setProperty('--pointer-x', `${x}px`);
            document.documentElement.style.setProperty('--pointer-y', `${y}px`);

            const homeImg = document.querySelector('.home-img');
            if (homeImg) {
                homeImg.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
            }
        });

        window.onscroll = () => {
            const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
            progressBar.style.width = `${scrollPercent}%`;

            sections.forEach(sec => {
                let top = window.scrollY;
                let offset = sec.offsetTop - 150;
                let height = sec.offsetHeight;
                let id = sec.getAttribute('id');

                if(top >= offset && top < offset + height) {
                    navLinks.forEach(links => {
                        links.classList.remove('active');
                        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
                    });
                };
            });

            /*==================== STICKY NAVBAR ====================*/
            header.classList.toggle('sticky', window.scrollY > 100);
        };

        /*==================== PROJECT FILTERS ====================*/
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.portfolio-box');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                filterButtons.forEach(filterButton => filterButton.classList.remove('active'));
                button.classList.add('active');

                projectCards.forEach(card => {
                    const shouldShow = filter === 'all' || card.dataset.category === filter;
                    card.classList.toggle('is-hidden', !shouldShow);
                });
            });
        });

        /*==================== PROJECT DETAILS MODAL ====================*/
        const projectModal = document.querySelector('#project-modal');
        const modalTitle = document.querySelector('#modal-title');
        const modalDescription = document.querySelector('#modal-description');
        const modalTags = document.querySelector('#modal-tags');
        const modalIcon = document.querySelector('#modal-icon');
        const closeModalButton = document.querySelector('.modal-close');
        const projectDetails = document.querySelectorAll('.project-details');
        const projects = {
            chatbot: {
                title: 'AI College Query Chatbot',
                description: 'An NLP-powered assistant that helps students find answers about admissions, courses, fees, and schedules through a simple conversational interface.',
                icon: 'bx-message-square-dots',
                tags: ['Python', 'NLTK', 'spaCy', 'Flask']
            },
            fashion: {
                title: 'Fashion E-Commerce',
                description: 'A responsive storefront focused on clear product discovery, a polished browsing experience, and a layout that adapts smoothly across devices.',
                icon: 'bxs-t-shirt',
                tags: ['HTML5', 'CSS3', 'JavaScript']
            },
            esports: {
                title: 'Esports Zone',
                description: 'A gaming news portal concept with tournament updates, player statistics, and an energetic interface designed for quick scanning.',
                icon: 'bx-joystick',
                tags: ['JavaScript', 'DOM']
            }
        };

        const closeModal = () => {
            projectModal.classList.remove('open');
            projectModal.setAttribute('aria-hidden', 'true');
        };

        projectDetails.forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                const project = projects[link.dataset.project];
                modalTitle.textContent = project.title;
                modalDescription.textContent = project.description;
                modalIcon.className = `bx ${project.icon} modal-icon`;
                modalTags.innerHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');
                projectModal.classList.add('open');
                projectModal.setAttribute('aria-hidden', 'false');
                closeModalButton.focus();
            });
        });

        closeModalButton.addEventListener('click', closeModal);
        projectModal.addEventListener('click', event => {
            if (event.target === projectModal) closeModal();
        });
        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && projectModal.classList.contains('open')) closeModal();
        });

        /*==================== SCROLL REVEAL ANIMATION ====================*/
        ScrollReveal({
            reset: true,
            distance: '80px',
            duration: 2000,
            delay: 200
        });

        ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
        ScrollReveal().reveal('.home-img, .skills-container, .portfolio-box, .contact form', { origin: 'bottom' });
        ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
        ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

        /*==================== TYPED JS ANIMATION ====================*/
        const typed = new Typed('.multiple-text', {
            strings: ['Web Developer', 'MCA Student', 'Frontend Coder', 'Tech Enthusiast'],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });

        /*==================== 3D TILT EFFECT (Project Cards) ====================*/
        const cards = document.querySelectorAll('.portfolio-box');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                // 1. Get the dimensions of the card
                const rect = card.getBoundingClientRect();

                // 2. Calculate mouse position relative to the card
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // 3. Find the center of the card
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                // 4. Calculate rotation (max 10 degrees, kept subtle for a card layout)
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                // 5. Apply the transformation
                card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            // Reset when mouse leaves
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
                card.style.transition = 'transform 0.5s ease';
            });

            // Remove transition when entering so movement is instant
            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
        });