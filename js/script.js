
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('progress-bar');

    if (!loadingScreen || !progressBar) return;

    let width = 0;
    const totalDuration = 2000;
    const intervalTime = 20;
    const step = (intervalTime / totalDuration) * 100;

    const progressInterval = setInterval(() => {
        if (width >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hide');
                setTimeout(() => {
                   if(loadingScreen) loadingScreen.remove();
                }, 800);
            }, 200);
        } else {
            width += step;
            if (width > 100) width = 100;
            progressBar.style.width = width + '%';
        }
    }, intervalTime);
});


const navbar = document.getElementById('navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}


const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});


const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    let particlesArray = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() * 0.5) - 0.25;
            this.speedY = (Math.random() * 0.5) - 0.25;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.color = Math.random() > 0.5 ? '#00d4ff' : '#7b2ff7';
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }
    
    function createParticles() {
        const particleCount = Math.floor((canvas.width * canvas.height) / 12000);
        particlesArray = [];
        for (let i = 0; i < particleCount; i++) {
            particlesArray.push(new Particle());
        }
    }
    createParticles();
    window.addEventListener('resize', createParticles);
    
    function connectParticles() {
        const maxDistance = 120;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a + 1; b < particlesArray.length; b++) {
                const dx = particlesArray[a].x - particlesArray[b].x;
                const dy = particlesArray[a].y - particlesArray[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = '#00d4ff';
                    ctx.globalAlpha = 0.1 * (1 - distance / maxDistance);
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
                }
            }
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let particle of particlesArray) {
            particle.update();
            particle.draw();
        }
        
        connectParticles();
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

console.log("پروژه About Me Portfolio آماده‌ست!");



const skillSection = document.getElementById('skills');
const skillProgress = document.querySelectorAll('.skill-progress');

if (skillSection && skillProgress.length > 0) {
    let skillsAnimated = false;

    function animateSkills() {
        const sectionTop = skillSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight - 100 && !skillsAnimated) {
            skillsAnimated = true;
            
            skillProgress.forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth + '%';
            });
        }
    }

    window.addEventListener('scroll', animateSkills);
    animateSkills();
}



const techItems = document.querySelectorAll('.tech-item');

if (techItems.length > 0) {
    function revealTechItems() {
        techItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (itemTop < windowHeight - 80) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 100);
            }
        });
    }

    window.addEventListener('scroll', revealTechItems);
    revealTechItems();
}



const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineItems.length > 0) {
    function revealTimeline() {
        timelineItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (itemTop < windowHeight - 100) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 150);
            }
        });
    }

    window.addEventListener('scroll', revealTimeline);
    revealTimeline();
}


const scrollTopBtn = document.getElementById('scroll-top-btn');

if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== //
// THEME TOGGLE         //
// ==================== //
const themeToggle = document.querySelector('.action-btn[title="تغییر تم"]');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

if (themeToggle && themeIcon) {
    // چک کردن تم ذخیره شده
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// ==================== //
// LANGUAGE TOGGLE      //
// ==================== //
const langToggle = document.querySelector('.action-btn[title="تغییر زبان"]');

if (langToggle) {
    // ترجمه‌ها
    const translations = {
        fa: {
            // Navbar
            navHome: 'خانه',
            navAbout: 'درباره من',
            navSkills: 'مهارت‌ها',
            navPortfolio: 'نمونه کارها',
            navContact: 'تماس با من',
            langBtn: 'EN',
            
            // Home
            greeting: 'سلام، من',
            name: 'محمدرضا هستم',
            jobTitle: 'توسعه‌دهنده Python / Django',
            shortIntro: 'توسعه‌دهنده وب با تمرکز بر Backend و علاقه‌مند به ساخت محصولات کاربردی و امن. از طراحی تا اجرا، کنارتم.',
            btnPortfolio: 'مشاهده نمونه کارها',
            btnContact: 'تماس با من',
            btnDownload: 'دانلود رزومه',
            avatarText: 'درباره من',
            scrollText: 'اسکرول کنید',
            
            // About
            aboutTitle: 'درباره',
            aboutTitleSpan: 'من',
            aboutStory: 'داستان من',
            aboutText1: 'از همون روز اولی که با پایتون یه برنامه ساده نوشتم، فهمیدم این مسیر قراره زندگی‌م رو تغییر بده. عاشق حل مسئله و ساختن چیزای مفیدم. الان به عنوان یه توسعه‌دهنده Django، روی پروژه‌های واقعی کار می‌کنم و هر روز چیز جدیدی یاد می‌گیرم.',
            aboutText2: 'هدفم اینه که بتونم محصولاتی بسازم که واقعاً به درد مردم بخوره. به امنیت، کد تمیز و تجربه کاربری خوب اعتقاد دارم.',
            interest1: 'برنامه‌نویسی',
            interest2: 'امنیت وب',
            interest3: 'یادگیری مداوم',
            interest4: 'قهوه و کد',
            infoName: 'نام:',
            infoNameVal: 'محمدرضا',
            infoLocation: 'محل زندگی:',
            infoLocationVal: 'ایران',
            infoSpecialty: 'تخصص:',
            infoSpecialtyVal: 'Python / Django',
            infoExperience: 'تجربه:',
            infoExperienceVal: '۲+ سال',
            infoLanguages: 'زبان‌ها:',
            infoLanguagesVal: 'فارسی، انگلیسی',
            infoEmail: 'ایمیل:',
            aboutBtn: 'بیا باهم صحبت کنیم',
            expBadge: 'سال تجربه',
            
            // Skills
            skillsTitle: 'مهارت‌های',
            skillsTitleSpan: 'من',
            frontend: 'فرانت‌اند',
            backend: 'بک‌اند',
            tools: 'ابزارها',
            
            // Tech Stack
            techTitle: 'تکنولوژی‌',
            techTitleSpan: 'ها',
            techSubtitle: 'تکنولوژی‌هایی که باهاشون کار می‌کنم',
            
            // Services
            servicesTitle: 'خدمات',
            servicesTitleSpan: 'من',
            servicesSubtitle: 'خدماتی که می‌تونم بهت ارائه بدم',
            service1Title: 'طراحی سایت',
            service1Desc: 'طراحی وب‌سایت‌های مدرن و کاربرپسند با جدیدترین استانداردهای طراحی.',
            service2Title: 'توسعه بک‌اند',
            service2Desc: 'پیاده‌سازی منطق سایت، API و پایگاه داده با Python و Django.',
            service3Title: 'طراحی واکنش‌گرا',
            service3Desc: 'سایت‌هایی که توی موبایل، تبلت و دسکتاپ عالی دیده بشن.',
            service4Title: 'بهینه‌سازی سرعت',
            service4Desc: 'افزایش سرعت لود سایت و بهبود Performance برای تجربه کاربری بهتر.',
            service5Title: 'امنیت وب',
            service5Desc: 'محافظت از سایت در برابر حملات رایج و پیاده‌سازی اصول امنیتی.',
            service6Title: 'پشتیبانی سایت',
            service6Desc: 'پشتیبانی فنی، رفع باگ و بروزرسانی مداوم سایت بعد از تحویل.',
            
            // Journey
            journeyTitle: 'مسیر',
            journeyTitleSpan: 'من',
            journeySubtitle: 'مسیر یادگیری من تا امروز',
            journey1Title: 'شروع برنامه‌نویسی',
            journey1Desc: 'اولین خط کد رو نوشتم و وارد دنیای برنامه‌نویسی شدم. پر از هیجان و کنجکاوی.',
            journey2Title: 'HTML',
            journey2Desc: 'یادگیری ساختار صفحات وب با HTML. ساختن اسکلت اولین سایت‌ها.',
            journey3Title: 'CSS',
            journey3Desc: 'استایل دادن به صفحات و یادگیری مفاهیم layout، flexbox و grid.',
            journey4Title: 'Python',
            journey4Desc: 'وارد شدن به دنیای Backend با پایتون. یادگیری مفاهیم برنامه‌نویسی عمیق‌تر.',
            journey5Title: 'Django',
            journey5Desc: 'شروع یادگیری فریم‌ورک Django و ساخت وب‌سایت‌های داینامیک و کامل.',
            journey6Title: 'JavaScript',
            journey6Desc: 'اضافه کردن تعامل و پویایی به صفحات وب با JavaScript مدرن.',
            journey7Title: 'ساخت پروژه‌های واقعی',
            journey7Desc: 'ترکیب همه مهارت‌ها و ساخت پروژه‌های کاربردی برای دنیای واقعی.',
            
            // Portfolio
            portfolioTitle: 'نمونه',
            portfolioTitleSpan: 'کارها',
            portfolioSubtitle: 'پروژه‌هایی که ساختم',
            port1Title: 'فروشگاه آنلاین',
            port1Desc: 'فروشگاه اینترنتی کامل با Django با قابلیت سبد خرید، پرداخت و پنل مدیریت.',
            port2Title: 'مدیریت تسک',
            port2Desc: 'اپلیکیشن مدیریت وظایف با Django REST Framework و فرانت‌اند React.',
            port3Title: 'وبلاگ شخصی',
            port3Desc: 'وبلاگ کامل با سیستم کامنت‌دهی، دسته‌بندی، جستجو و پنل ادمین Django.',
            githubLink: 'گیت‌هاب',
            demoLink: 'دمو',
            
            // Contact
            contactTitle: 'تماس با',
            contactTitleSpan: 'من',
            contactSubtitle: 'راه‌های ارتباط با من',
            formTitle: 'پیام بده 📩',
            formName: 'نام شما',
            formEmail: 'ایمیل شما',
            formSubject: 'موضوع',
            formMessage: 'پیام شما...',
            formBtn: 'ارسال پیام',
            contactInfoTitle: 'راه‌های ارتباطی 📱',
            contactEmail: 'ایمیل',
            contactGithub: 'گیت‌هاب',
            contactTelegram: 'تلگرام',
            contactInstagram: 'اینستاگرام',
            contactLinkedin: 'لینکدین',
            contactMessage: 'خوشحال میشم باهات در ارتباط باشم! اگه سوال، پیشنهاد یا پروژه‌ای داری، برام پیام بده. معمولاً کمتر از ۲۴ ساعت جواب میدم. 😊',
            
            // Footer
            footerTagline: 'طراحی و توسعه توسط محمدرضا',
            footerCopyright: '© ۱۴۰۲ - تمامی حقوق محفوظ است.',
            
            // Loading
            loadingText: 'در حال بارگذاری...',
            logoText: 'درباره من',
            
            // Titles
            pageTitle: 'درباره من - Portfolio'
        },
        en: {
            // Navbar
            navHome: 'Home',
            navAbout: 'About',
            navSkills: 'Skills',
            navPortfolio: 'Portfolio',
            navContact: 'Contact',
            langBtn: 'FA',
            
            // Home
            greeting: 'Hi, I am',
            name: 'Mohammadreza',
            jobTitle: 'Python / Django Developer',
            shortIntro: 'Web developer focused on Backend, passionate about building useful and secure products. From design to deployment, I\'m with you.',
            btnPortfolio: 'View Portfolio',
            btnContact: 'Contact Me',
            btnDownload: 'Download CV',
            avatarText: 'About Me',
            scrollText: 'Scroll Down',
            
            // About
            aboutTitle: 'About',
            aboutTitleSpan: 'Me',
            aboutStory: 'My Story',
            aboutText1: 'From the very first day I wrote a simple Python program, I knew this path would change my life. I love problem-solving and building useful things. Now as a Django developer, I work on real projects and learn something new every day.',
            aboutText2: 'My goal is to build products that truly help people. I believe in security, clean code, and good user experience.',
            interest1: 'Programming',
            interest2: 'Web Security',
            interest3: 'Continuous Learning',
            interest4: 'Coffee & Code',
            infoName: 'Name:',
            infoNameVal: 'Mohammadreza',
            infoLocation: 'Location:',
            infoLocationVal: 'Iran',
            infoSpecialty: 'Specialty:',
            infoSpecialtyVal: 'Python / Django',
            infoExperience: 'Experience:',
            infoExperienceVal: '2+ Years',
            infoLanguages: 'Languages:',
            infoLanguagesVal: 'Persian, English',
            infoEmail: 'Email:',
            aboutBtn: 'Let\'s Talk',
            expBadge: 'Years Exp.',
            
            // Skills
            skillsTitle: 'My',
            skillsTitleSpan: 'Skills',
            frontend: 'Front-end',
            backend: 'Back-end',
            tools: 'Tools',
            
            // Tech Stack
            techTitle: 'Tech',
            techTitleSpan: 'Stack',
            techSubtitle: 'Technologies I work with',
            
            // Services
            servicesTitle: 'My',
            servicesTitleSpan: 'Services',
            servicesSubtitle: 'Services I can provide',
            service1Title: 'Web Design',
            service1Desc: 'Modern and user-friendly website design with the latest design standards.',
            service2Title: 'Backend Development',
            service2Desc: 'Implementing site logic, APIs and databases with Python and Django.',
            service3Title: 'Responsive Design',
            service3Desc: 'Websites that look great on mobile, tablet and desktop.',
            service4Title: 'Speed Optimization',
            service4Desc: 'Increasing site load speed and improving performance for better user experience.',
            service5Title: 'Web Security',
            service5Desc: 'Protecting sites against common attacks and implementing security principles.',
            service6Title: 'Site Support',
            service6Desc: 'Technical support, bug fixes and continuous site updates after delivery.',
            
            // Journey
            journeyTitle: 'My',
            journeyTitleSpan: 'Journey',
            journeySubtitle: 'My learning path so far',
            journey1Title: 'Started Programming',
            journey1Desc: 'Wrote my first line of code and entered the world of programming. Full of excitement and curiosity.',
            journey2Title: 'HTML',
            journey2Desc: 'Learning web page structure with HTML. Building the skeleton of first websites.',
            journey3Title: 'CSS',
            journey3Desc: 'Styling pages and learning layout concepts, flexbox and grid.',
            journey4Title: 'Python',
            journey4Desc: 'Entering the Backend world with Python. Learning deeper programming concepts.',
            journey5Title: 'Django',
            journey5Desc: 'Starting to learn Django framework and building dynamic, complete websites.',
            journey6Title: 'JavaScript',
            journey6Desc: 'Adding interactivity and dynamism to web pages with modern JavaScript.',
            journey7Title: 'Building Real Projects',
            journey7Desc: 'Combining all skills and building practical projects for the real world.',
            
            // Portfolio
            portfolioTitle: 'My',
            portfolioTitleSpan: 'Portfolio',
            portfolioSubtitle: 'Projects I have built',
            port1Title: 'Online Shop',
            port1Desc: 'Complete e-commerce store with Django featuring shopping cart, payment and admin panel.',
            port2Title: 'Task Manager',
            port2Desc: 'Task management application with Django REST Framework and React frontend.',
            port3Title: 'Personal Blog',
            port3Desc: 'Full blog with commenting system, categories, search and Django admin panel.',
            githubLink: 'GitHub',
            demoLink: 'Demo',
            
            // Contact
            contactTitle: 'Contact',
            contactTitleSpan: 'Me',
            contactSubtitle: 'Ways to reach me',
            formTitle: 'Send Message 📩',
            formName: 'Your Name',
            formEmail: 'Your Email',
            formSubject: 'Subject',
            formMessage: 'Your Message...',
            formBtn: 'Send Message',
            contactInfoTitle: 'Contact Info 📱',
            contactEmail: 'Email',
            contactGithub: 'GitHub',
            contactTelegram: 'Telegram',
            contactInstagram: 'Instagram',
            contactLinkedin: 'LinkedIn',
            contactMessage: 'I\'d love to hear from you! If you have a question, suggestion or project, send me a message. I usually respond within 24 hours. 😊',
            
            // Footer
            footerTagline: 'Designed & Developed by Mohammadreza',
            footerCopyright: '© 2023 - All Rights Reserved.',
            
            // Loading
            loadingText: 'Loading...',
            logoText: 'About Me',
            
            // Titles
            pageTitle: 'About Me - Portfolio'
        }
    };

    let currentLang = 'fa';

    function changeLanguage(lang) {
        currentLang = lang;
        const t = translations[lang];
        
        // Navbar
        document.querySelector('.nav-logo').textContent = t.logoText;
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks[0].textContent = t.navHome;
        navLinks[1].textContent = t.navAbout;
        navLinks[2].textContent = t.navSkills;
        navLinks[3].textContent = t.navPortfolio;
        navLinks[4].textContent = t.navContact;
        langToggle.textContent = t.langBtn;
        
        // HTML dir & lang
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
        document.title = t.pageTitle;
        
        // Home
        document.querySelector('.greeting').textContent = t.greeting;
        document.querySelector('.name').textContent = t.name;
        document.querySelector('.job-title').textContent = t.jobTitle;
        document.querySelector('.short-intro').textContent = t.shortIntro;
        document.querySelector('.home-buttons .btn-primary').innerHTML = `<i class="fas fa-briefcase"></i> ${t.btnPortfolio}`;
        const homeBtns = document.querySelectorAll('.home-buttons .btn-outline');
        homeBtns[0].innerHTML = `<i class="fas fa-envelope"></i> ${t.btnContact}`;
        homeBtns[1].innerHTML = `<i class="fas fa-download"></i> ${t.btnDownload}`;
        document.querySelector('.avatar-placeholder p').textContent = t.avatarText;
        document.querySelector('.scroll-indicator span').textContent = t.scrollText;
        
        // About
        document.querySelector('#about .section-title').innerHTML = `${t.aboutTitle} <span>${t.aboutTitleSpan}</span>`;
        document.querySelector('.about-content h3').textContent = t.aboutStory;
        const aboutTexts = document.querySelectorAll('.about-text');
        aboutTexts[0].textContent = t.aboutText1;
        aboutTexts[1].textContent = t.aboutText2;
        const interestTags = document.querySelectorAll('.interest-tag');
        interestTags[0].innerHTML = `<i class="fas fa-code"></i> ${t.interest1}`;
        interestTags[1].innerHTML = `<i class="fas fa-shield-alt"></i> ${t.interest2}`;
        interestTags[2].innerHTML = `<i class="fas fa-book"></i> ${t.interest3}`;
        interestTags[3].innerHTML = `<i class="fas fa-coffee"></i> ${t.interest4}`;
        const infoItems = document.querySelectorAll('.info-item');
        infoItems[0].innerHTML = `<span class="info-label">${t.infoName}</span><span class="info-value">${t.infoNameVal}</span>`;
        infoItems[1].innerHTML = `<span class="info-label">${t.infoLocation}</span><span class="info-value">${t.infoLocationVal}</span>`;
        infoItems[2].innerHTML = `<span class="info-label">${t.infoSpecialty}</span><span class="info-value">${t.infoSpecialtyVal}</span>`;
        infoItems[3].innerHTML = `<span class="info-label">${t.infoExperience}</span><span class="info-value">${t.infoExperienceVal}</span>`;
        infoItems[4].innerHTML = `<span class="info-label">${t.infoLanguages}</span><span class="info-value">${t.infoLanguagesVal}</span>`;
        infoItems[5].innerHTML = `<span class="info-label">${t.infoEmail}</span><span class="info-value">example@email.com</span>`;
        document.querySelector('.about-content .btn-primary').innerHTML = `<i class="fas fa-paper-plane"></i> ${t.aboutBtn}`;
        document.querySelector('.exp-text').textContent = t.expBadge;
        
        // Skills
        document.querySelector('#skills .section-title').innerHTML = `${t.skillsTitle} <span>${t.skillsTitleSpan}</span>`;
        const categoryTitles = document.querySelectorAll('.category-title');
        categoryTitles[0].innerHTML = `<i class="fas fa-laptop-code"></i> ${t.frontend}`;
        categoryTitles[1].innerHTML = `<i class="fas fa-server"></i> ${t.backend}`;
        categoryTitles[2].innerHTML = `<i class="fas fa-tools"></i> ${t.tools}`;
        
        // Tech Stack
        document.querySelector('#tech-stack .section-title').innerHTML = `${t.techTitle}<span>${t.techTitleSpan}</span>`;
        document.querySelector('#tech-stack .section-subtitle').textContent = t.techSubtitle;
        
        // Services
        document.querySelector('#services .section-title').innerHTML = `${t.servicesTitle} <span>${t.servicesTitleSpan}</span>`;
        document.querySelector('#services .section-subtitle').textContent = t.servicesSubtitle;
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards[0].querySelector('.service-title').textContent = t.service1Title;
        serviceCards[0].querySelector('.service-desc').textContent = t.service1Desc;
        serviceCards[1].querySelector('.service-title').textContent = t.service2Title;
        serviceCards[1].querySelector('.service-desc').textContent = t.service2Desc;
        serviceCards[2].querySelector('.service-title').textContent = t.service3Title;
        serviceCards[2].querySelector('.service-desc').textContent = t.service3Desc;
        serviceCards[3].querySelector('.service-title').textContent = t.service4Title;
        serviceCards[3].querySelector('.service-desc').textContent = t.service4Desc;
        serviceCards[4].querySelector('.service-title').textContent = t.service5Title;
        serviceCards[4].querySelector('.service-desc').textContent = t.service5Desc;
        serviceCards[5].querySelector('.service-title').textContent = t.service6Title;
        serviceCards[5].querySelector('.service-desc').textContent = t.service6Desc;
        
        // Journey
        document.querySelector('#journey .section-title').innerHTML = `${t.journeyTitle} <span>${t.journeyTitleSpan}</span>`;
        document.querySelector('#journey .section-subtitle').textContent = t.journeySubtitle;
        const timelineContents = document.querySelectorAll('.timeline-content');
        timelineContents[0].querySelector('h3').textContent = t.journey1Title;
        timelineContents[0].querySelector('p').textContent = t.journey1Desc;
        timelineContents[1].querySelector('h3').textContent = t.journey2Title;
        timelineContents[1].querySelector('p').textContent = t.journey2Desc;
        timelineContents[2].querySelector('h3').textContent = t.journey3Title;
        timelineContents[2].querySelector('p').textContent = t.journey3Desc;
        timelineContents[3].querySelector('h3').textContent = t.journey4Title;
        timelineContents[3].querySelector('p').textContent = t.journey4Desc;
        timelineContents[4].querySelector('h3').textContent = t.journey5Title;
        timelineContents[4].querySelector('p').textContent = t.journey5Desc;
        timelineContents[5].querySelector('h3').textContent = t.journey6Title;
        timelineContents[5].querySelector('p').textContent = t.journey6Desc;
        timelineContents[6].querySelector('h3').textContent = t.journey7Title;
        timelineContents[6].querySelector('p').textContent = t.journey7Desc;
        
        // Portfolio
        document.querySelector('#portfolio .section-title').innerHTML = `${t.portfolioTitle} <span>${t.portfolioTitleSpan}</span>`;
        document.querySelector('#portfolio .section-subtitle').textContent = t.portfolioSubtitle;
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        portfolioCards[0].querySelector('.portfolio-title').textContent = t.port1Title;
        portfolioCards[0].querySelector('.portfolio-desc').textContent = t.port1Desc;
        portfolioCards[1].querySelector('.portfolio-title').textContent = t.port2Title;
        portfolioCards[1].querySelector('.portfolio-desc').textContent = t.port2Desc;
        portfolioCards[2].querySelector('.portfolio-title').textContent = t.port3Title;
        portfolioCards[2].querySelector('.portfolio-desc').textContent = t.port3Desc;
        const portLinks = document.querySelectorAll('.port-link');
        portLinks.forEach((link, i) => {
            if (i % 2 === 0) link.innerHTML = `<i class="fab fa-github"></i> ${t.githubLink}`;
            else link.innerHTML = `<i class="fas fa-external-link-alt"></i> ${t.demoLink}`;
        });
        
        // Contact
        document.querySelector('#contact .section-title').innerHTML = `${t.contactTitle} <span>${t.contactTitleSpan}</span>`;
        document.querySelector('#contact .section-subtitle').textContent = t.contactSubtitle;
        document.querySelector('.contact-form-wrapper .form-title').textContent = t.formTitle;
        document.getElementById('name').placeholder = t.formName;
        document.getElementById('email').placeholder = t.formEmail;
        document.getElementById('subject').placeholder = t.formSubject;
        document.getElementById('message').placeholder = t.formMessage;
        document.querySelector('.submit-btn').innerHTML = `<i class="fas fa-paper-plane"></i> ${t.formBtn}`;
        document.querySelector('.contact-info-wrapper .form-title').textContent = t.contactInfoTitle;
        const contactItems = document.querySelectorAll('.contact-info-item');
        contactItems[0].querySelector('.contact-label').textContent = t.contactEmail;
        contactItems[1].querySelector('.contact-label').textContent = t.contactGithub;
        contactItems[2].querySelector('.contact-label').textContent = t.contactTelegram;
        contactItems[3].querySelector('.contact-label').textContent = t.contactInstagram;
        contactItems[4].querySelector('.contact-label').textContent = t.contactLinkedin;
        document.querySelector('.contact-message').textContent = t.contactMessage;
        
        // Footer
        document.querySelector('.footer-logo').textContent = t.logoText;
        document.querySelector('.footer-tagline').textContent = t.footerTagline;
        document.querySelector('.footer-bottom p').textContent = t.footerCopyright;
        
        // Loading
        document.querySelector('.logo-animation').textContent = t.logoText;
        document.querySelector('.loading-text').textContent = t.loadingText;
    }

    // Event listener
    langToggle.addEventListener('click', () => {
        if (currentLang === 'fa') {
            changeLanguage('en');
        } else {
            changeLanguage('fa');
        }
    });
}