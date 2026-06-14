const THEME_KEY = "portfolio-theme";
const TRAILBLAZER_URL = "https://www.salesforce.com/trailblazer/fka50vtwlibhq5qk6l";

const salesforceAchievements = [
    "Salesforce Agentblazer Champion 2025",
    "Salesforce Agentblazer Champion 2026",
    "Salesforce Agentforce Innovator 2026",
    "Salesforce Developer 2025",
    "Salesforce Ranger",
    "Superbadge: Prompt Builder Templates",
    "Superbadge: Apex Specialist",
    "Superbadge: Object Relationships",
    "Superbadge: Agentforce Service"
];

const certificationsData = [
    {
        title: "Supervised Machine Learning: Regression and Classification",
        issuer: "DeepLearning.AI / Coursera",
        date: "Oct 2024",
        category: "AI & Machine Learning",
        description: "Completed certification on Supervised Machine Learning covering regression, classification, and core ML concepts.",
        verifyLink: "https://coursera.org/share/c09a5509cab60763f12d4c7680c7e8ca",
        previewType: "ML"
    },
    {
        title: "The Complete SQL Bootcamp: Go from Zero to Hero",
        issuer: "Udemy",
        date: "June 2026",
        category: "Database",
        description: "Comprehensive SQL certification covering queries, joins, aggregations, and database design. Certificate Earned.",
        verifyLink: "#",
        previewType: "SQL",
        offline: true
    },
    {
        title: "Introduction to NoSQL Databases",
        issuer: "NPTEL",
        date: "2024",
        category: "Database",
        description: "Completed certification on NoSQL database concepts and implementations.",
        verifyLink: "doc/nosql.pdf",
        previewType: "DB"
    },
    {
        title: "Database Management System Part - 1",
        issuer: "NPTEL",
        date: "2024",
        category: "Database",
        description: "Completed certification on fundamental database management system concepts.",
        verifyLink: "doc/db1.pdf",
        previewType: "DB"
    },
    {
        title: "Database Management System Part - 2",
        issuer: "NPTEL",
        date: "2024",
        category: "Database",
        description: "Completed advanced certification on database management systems.",
        verifyLink: "doc/db2.pdf",
        previewType: "DB"
    },
    {
        title: "Programming Using Java",
        issuer: "NPTEL",
        date: "2024",
        category: "Programming",
        description: "Completed certification on Java programming fundamentals and applications.",
        verifyLink: "doc/java.pdf",
        previewType: "Java"
    }
];

const publicationsData = [
    {
        title: "IoT-Driven Smart Irrigation for Precision Agriculture: Challenges and Prototype Demonstration",
        conference: "Global AI Summit 2025 (Technically Co-sponsored by IEEE UP Section)",
        date: "Mar 2026",
        paperLink: "https://ieeexplore.ieee.org/abstract/document/11410721",
        certificateLink: "doc/IEEE.pdf"
    }
];

let activeCertFilter = "all";
let certSearchQuery = "";

document.addEventListener("DOMContentLoaded", () => {
    const elements = getElements();

    renderSalesforceSection(elements.salesforceSection);
    renderCertifications(elements.certificationsGrid);
    renderPublications(elements.publicationsGrid);
    initTheme(elements);
    initParticles(elements.particles);
    initTypingEffect(elements.typingText);
    initNavigation(elements);
    initRevealAnimations();
    initContactForm(elements.contactForm);
    initResumeActions();
    initPlaceholderButtons();
    initExperienceToggle();
    initCertToolbar(elements);
    initCertModal(elements);
    initAnimatedCounters();
    initScrollProgress(elements);
    initFloatingTop(elements);
    hideLoadingScreen(elements.loadingScreen);

    window.addEventListener("resize", () => updateNavIndicator(elements));
    window.addEventListener("load", () => hideLoadingScreen(elements.loadingScreen));

    const initialHash = window.location.hash;
    if (initialHash) {
        const target = document.querySelector(initialHash);
        if (target) {
            setTimeout(() => scrollToSection(target), 150);
        }
    } else {
        updateActiveLink(elements.navLinks[0], elements);
    }
});

function getElements() {
    return {
        html: document.documentElement,
        themeToggle: document.getElementById("themeToggle"),
        navToggle: document.getElementById("navToggle"),
        navMenu: document.getElementById("navMenu"),
        navList: document.getElementById("navList"),
        navLinks: [...document.querySelectorAll(".nav__link")],
        navIndicator: document.getElementById("navIndicator"),
        typingText: document.getElementById("typingText"),
        particles: document.getElementById("particles"),
        certificationsGrid: document.getElementById("certificationsGrid"),
        salesforceSection: document.getElementById("salesforceSection"),
        publicationsGrid: document.getElementById("publicationsGrid"),
        contactForm: document.getElementById("contactForm"),
        loadingScreen: document.getElementById("loadingScreen"),
        toast: document.getElementById("toast"),
        scrollProgressBar: document.getElementById("scrollProgressBar"),
        floatingTop: document.getElementById("floatingTop"),
        certModal: document.getElementById("certModal"),
        certSearch: document.getElementById("certSearch"),
        certFilters: document.getElementById("certFilters"),
        sections: [...document.querySelectorAll("main section[id]")]
    };
}

function initTheme(elements) {
    const storedTheme = getStoredTheme();
    const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initialTheme = storedTheme || (systemPrefersLight ? "light" : "dark");

    applyTheme(initialTheme, elements);

    elements.themeToggle?.addEventListener("click", () => {
        const nextTheme = elements.html.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme, elements);
        storeTheme(nextTheme);
        showToast(`Switched to ${capitalize(nextTheme)} mode.`, elements.toast);
    });
}

function getStoredTheme() {
    try {
        return localStorage.getItem(THEME_KEY);
    } catch (error) {
        return null;
    }
}

function storeTheme(theme) {
    try {
        localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
        console.warn("Theme preference could not be saved.");
    }
}

function applyTheme(theme, elements) {
    elements.html.dataset.theme = theme;
    if (elements.themeToggle) {
        elements.themeToggle.setAttribute("aria-pressed", String(theme === "light"));
        elements.themeToggle.setAttribute("aria-label", `Switch to ${theme === "dark" ? "light" : "dark"} mode`);
    }
}

function initParticles(container) {
    if (!container) {
        return;
    }

    const particleCount = window.innerWidth < 768 ? 12 : 20;

    for (let index = 0; index < particleCount; index += 1) {
        const particle = document.createElement("span");
        particle.className = "particle";
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${10 + Math.random() * 18}s`;
        particle.style.animationDelay = `${Math.random() * 6}s`;
        particle.style.opacity = `${0.25 + Math.random() * 0.55}`;
        particle.style.transform = `scale(${0.6 + Math.random() * 1.1})`;
        container.appendChild(particle);
    }
}

function initTypingEffect(target) {
    if (!target) {
        return;
    }

    const phrases = [
        "Android Development",
        "Full-Stack Development",
        "AI Applications",
        "IoT Product Engineering"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const tick = () => {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            charIndex -= 1;
        } else {
            charIndex += 1;
        }

        target.textContent = currentPhrase.slice(0, charIndex);

        let delay = isDeleting ? 45 : 85;

        if (!isDeleting && charIndex === currentPhrase.length) {
            delay = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 280;
        }

        window.setTimeout(tick, delay);
    };

    tick();
}

function initNavigation(elements) {
    const { navToggle, navMenu, navLinks, sections } = elements;

    navToggle?.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".nav") && !event.target.closest(".nav__toggle")) {
            navMenu?.classList.remove("is-open");
            navToggle?.setAttribute("aria-expanded", "false");
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const targetId = anchor.getAttribute("href");
            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);
            if (!target) {
                return;
            }

            event.preventDefault();
            scrollToSection(target);

            if (anchor.classList.contains("nav__link")) {
                updateActiveLink(anchor, elements);
            }

            navMenu?.classList.remove("is-open");
            navToggle?.setAttribute("aria-expanded", "false");
            history.replaceState(null, "", targetId);
        });
    });

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            const visibleEntry = entries
                .filter((entry) => entry.isIntersecting)
                .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio)[0];

            if (!visibleEntry) {
                return;
            }

            const matchingLink = navLinks.find(
                (link) => link.getAttribute("href") === `#${visibleEntry.target.id}`
            );

            if (matchingLink) {
                updateActiveLink(matchingLink, elements);
            }
        },
        {
            threshold: 0.35,
            rootMargin: "-18% 0px -28% 0px"
        }
    );

    sections.forEach((section) => sectionObserver.observe(section));
    updateNavIndicator(elements);
}

function scrollToSection(section) {
    const headerOffset = document.querySelector(".site-header")?.offsetHeight || 100;
    const sectionPosition = section.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
        top: sectionPosition - headerOffset - 12,
        behavior: "smooth"
    });
}

function updateActiveLink(activeLink, elements) {
    if (!activeLink) {
        return;
    }

    elements.navLinks.forEach((link) => link.classList.remove("is-active"));
    activeLink.classList.add("is-active");
    updateNavIndicator(elements);
}

function updateNavIndicator(elements) {
    const { navIndicator } = elements;

    if (!navIndicator || window.innerWidth <= 860) {
        return;
    }

    const activeLink = document.querySelector(".nav__link.is-active");
    const navMenu = document.getElementById("navMenu");

    if (!activeLink || !navMenu) {
        return;
    }

    const activeRect = activeLink.getBoundingClientRect();
    const menuRect = navMenu.getBoundingClientRect();
    const offsetX = activeRect.left - menuRect.left;

    navIndicator.style.width = `${activeRect.width}px`;
    navIndicator.style.transform = `translateX(${offsetX}px)`;
    navIndicator.style.opacity = "1";
}

function initRevealAnimations() {
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.14,
            rootMargin: "0px 0px -60px 0px"
        }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
}

function renderSalesforceSection(container) {
    if (!container) {
        return;
    }

    const badges = salesforceAchievements
        .map((achievement) => `<span class="pill">${achievement}</span>`)
        .join("");

    container.innerHTML = `
        <div class="salesforce-section__header">
            <div class="salesforce-section__brand">
                <div class="dynamic-card__icon salesforce-logo" aria-hidden="true">SF</div>
                <div>
                    <p class="timeline__label">Salesforce Achievements</p>
                    <h3>Salesforce Trailblazer Profile</h3>
                    <p>Verified Salesforce credentials, superbadges, and Agentblazer achievements earned through Trailhead.</p>
                </div>
            </div>
            <a href="${TRAILBLAZER_URL}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">View Trailblazer Profile</a>
        </div>
        <div class="achievement-badges">${badges}</div>
    `;
}

function getFilteredCertifications() {
    return certificationsData.filter((item) => {
        const matchesCategory = activeCertFilter === "all" || item.category === activeCertFilter;
        const query = certSearchQuery.trim().toLowerCase();
        const matchesSearch =
            !query ||
            item.title.toLowerCase().includes(query) ||
            item.issuer.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
    });
}

function renderCertifications(container) {
    if (!container) {
        return;
    }

    const filtered = getFilteredCertifications();

    if (!filtered.length) {
        container.innerHTML = `
            <article class="dynamic-card glass reveal is-visible">
                <h3>No certifications found</h3>
                <p>Try adjusting your search or filter selection.</p>
            </article>
        `;
        return;
    }

    container.innerHTML = filtered
        .map(
            (item, index) => {
                const buttonContent = item.offline 
                    ? `<span class="btn btn--ghost" style="opacity: 0.6; cursor: not-allowed;">Certificate Available Offline</span>`
                    : `<a href="${item.verifyLink}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">View Certificate</a>`;
                
                return `
                <article class="dynamic-card glass reveal ${index % 3 === 1 ? "reveal--delay" : index % 3 === 2 ? "reveal--delay-2" : ""}" data-category="${item.category}">
                    <div class="dynamic-card__icon">${item.previewType || getInitials(item.issuer)}</div>
                    <div class="dynamic-card__meta">
                        <span>${item.category}</span>
                        <span>${item.date}</span>
                    </div>
                    <div>
                        <h3>${item.title}</h3>
                        <p>Issued by ${item.issuer}. ${item.description}</p>
                    </div>
                    <div class="project-card__actions">
                        ${buttonContent}
                    </div>
                </article>
            `}
        )
        .join("");

    initRevealAnimations();
}

function bindCertPreviewButtons() {
    document.querySelectorAll(".cert-preview-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const index = Number(button.dataset.certIndex);
            const cert = certificationsData[index];
            if (cert) {
                openCertModal(cert);
            }
        });
    });
}

function initCertToolbar(elements) {
    elements.certSearch?.addEventListener("input", (event) => {
        certSearchQuery = event.target.value;
        renderCertifications(elements.certificationsGrid);
    });

    elements.certFilters?.addEventListener("click", (event) => {
        const filterButton = event.target.closest(".cert-filter");
        if (!filterButton) {
            return;
        }

        activeCertFilter = filterButton.dataset.filter || "all";
        elements.certFilters.querySelectorAll(".cert-filter").forEach((button) => {
            button.classList.toggle("is-active", button === filterButton);
        });
        renderCertifications(elements.certificationsGrid);
    });
}

function initCertModal(elements) {
    const { certModal } = elements;
    if (!certModal) {
        return;
    }

    certModal.querySelectorAll("[data-close-modal]").forEach((element) => {
        element.addEventListener("click", () => closeCertModal(elements));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !certModal.hidden) {
            closeCertModal(elements);
        }
    });
}

function openCertModal(cert) {
    const modal = document.getElementById("certModal");
    if (!modal) {
        return;
    }

    document.getElementById("certModalIcon").textContent = cert.previewType || getInitials(cert.issuer);
    document.getElementById("certModalIssuer").textContent = cert.issuer;
    document.getElementById("certModalDate").textContent = cert.date;
    document.getElementById("certModalTitle").textContent = cert.title;
    document.getElementById("certModalDescription").textContent = cert.description;

    const openLink = document.getElementById("certModalOpenLink");
    openLink.href = cert.verifyLink;
    openLink.onclick = null;

    if (cert.verifyLink === "#") {
        openLink.onclick = (event) => {
            event.preventDefault();
            showToast("Certificate verification link will be updated when available.", document.getElementById("toast"));
        };
    }

    modal.hidden = false;
    document.body.style.overflow = "hidden";
}

function closeCertModal(elements) {
    const modal = elements.certModal || document.getElementById("certModal");
    if (!modal) {
        return;
    }

    modal.hidden = true;
    document.body.style.overflow = "";
}

function renderPublications(container) {
    if (!container) {
        return;
    }

    container.innerHTML = publicationsData
        .map(
            (item) => `
                <article class="dynamic-card glass reveal">
                    <div class="dynamic-card__icon">IEEE</div>
                    <div class="dynamic-card__meta">
                        <span>${item.conference}</span>
                        <span>${item.date}</span>
                    </div>
                    <div>
                        <h3>${item.title}</h3>
                        <p>Published at ${item.conference}.</p>
                    </div>
                    <div class="project-card__actions">
                        <a href="${item.paperLink}" class="btn btn--primary" target="_blank" rel="noopener noreferrer">
                            View Publication
                        </a>
                        <a href="${item.certificateLink}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">
                            View Certificate
                        </a>
                    </div>
                </article>
            `
        )
        .join("");
}

function initExperienceToggle() {
    const toggle = document.querySelector(".experience-toggle");
    const details = document.getElementById("experienceDetails");

    if (!toggle || !details) {
        return;
    }

    toggle.addEventListener("click", () => {
        const isExpanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!isExpanded));
        details.hidden = isExpanded;
        toggle.textContent = isExpanded ? "View full details" : "Hide details";
    });
}

function initAnimatedCounters() {
    const counters = document.querySelectorAll(".counter");
    if (!counters.length) {
        return;
    }

    const animateCounter = (counter) => {
        const target = Number(counter.dataset.target) || 0;
        const suffix = counter.dataset.suffix || "";
        const duration = 1400;
        const startTime = performance.now();

        const step = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = `${Math.round(target * eased)}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
}

function initScrollProgress(elements) {
    const bar = elements.scrollProgressBar;
    if (!bar) {
        return;
    }

    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
}

function initFloatingTop(elements) {
    const button = elements.floatingTop;
    if (!button) {
        return;
    }

    window.addEventListener(
        "scroll",
        () => {
            const show = window.scrollY > 500;
            button.hidden = !show;
        },
        { passive: true }
    );

    button.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function initContactForm(form) {
    if (!form) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const name = formData.get("name")?.toString().trim() || "";
        const email = formData.get("email")?.toString().trim() || "";
        const subject = formData.get("subject")?.toString().trim() || "";
        const message = formData.get("message")?.toString().trim() || "";

        const body = encodeURIComponent(
            `Hello Shodhan,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`
        );
        const mailSubject = encodeURIComponent(subject || "Portfolio Contact");

        window.location.href = `mailto:shodhankumarshetty963@gmail.com?subject=${mailSubject}&body=${body}`;
        showToast("Opening your mail client with the drafted message.", document.getElementById("toast"));
        form.reset();
    });
}

function initResumeActions() {
    document.querySelectorAll('a[download]').forEach((link) => {
        link.addEventListener("click", () => {
            showToast("Resume download started.", document.getElementById("toast"));
        });
    });
}

function initPlaceholderButtons() {
    document.querySelectorAll(".dynamic-action, .project-demo").forEach((button) => {
        const isPlaceholder =
            button.dataset.placeholder === "true" || button.getAttribute("href") === "#";

        if (!isPlaceholder) {
            return;
        }

        button.addEventListener("click", (event) => {
            event.preventDefault();
            showToast("Certificate verification link will be updated when available.", document.getElementById("toast"));
        });
    });
}

function hideLoadingScreen(loadingScreen) {
    if (!loadingScreen) {
        return;
    }

    window.setTimeout(() => {
        loadingScreen.classList.add("is-hidden");
    }, 450);
}

function showToast(message, toast) {
    if (!toast) {
        return;
    }

    toast.textContent = message;
    toast.classList.add("is-visible");

    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = setTimeout(() => {
        toast.classList.remove("is-visible");
    }, 3200);
}

function getInitials(text) {
    return text
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join("");
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}
