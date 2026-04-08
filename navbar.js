// Global Navbar Injection Script

function initNavbar(options = {}) {
    const {
        activePage = '',
        rootPath = './'
        
    } = options;

    const navbarHTML = `
    <header class="nav-island-container reveal">
        <div class="dynamic-island">
            <div class="island-logo">
                <img src="${rootPath}logo.png" alt="Strata STEM Guide Logo" fetchpriority="high">
            </div>
            <nav class="desktop-only">
                <ul class="island-nav-links">
                    <li><a href="${rootPath}index.html" class="reveal ${activePage === 'home' ? 'active' : ''}">HOME</a></li>
                    <li><a href="${rootPath}ptable/Ptable.html" class="reveal ${activePage === 'ptable' ? 'active' : ''}">PTABLE</a></li>
                    <li><a href="${rootPath}subjects.html" class="reveal ${activePage === 'olympiad' ? 'active' : ''}">OLYMPIAD GUIDE</a></li>
                    <li><a href="${rootPath}team.html" class="reveal ${activePage === 'team' ? 'active' : ''}">OUR TEAM</a></li>
                    <li class="has-dropdown">
                        <a href="${rootPath}Grade 6 to 13.html" class="reveal ${activePage === 'grade-selection' ? 'active' : ''}">GRADE 6-13 
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </a>
                        <div class="nav-dropdown">
                            <a href="${rootPath}grade 6-13/Grade 6 Selection.html" class="dropdown-item ${activePage === 'grade6' ? 'active' : ''}">Grade 6</a>
                            <a href="${rootPath}grade 6-13/Grade 7 Selection.html" class="dropdown-item">Grade 7</a>
                            <a href="${rootPath}grade 6-13/Grade 8 Selection.html" class="dropdown-item">Grade 8</a>
                            <a href="${rootPath}grade 6-13/Grade 9 Selection.html" class="dropdown-item">Grade 9</a>
                            <a href="${rootPath}grade 6-13/Grade 10 Selection.html" class="dropdown-item">Grade 10</a>
                            <a href="${rootPath}grade 6-13/Grade 11 Selection.html" class="dropdown-item">Grade 11</a>
                            <a href="${rootPath}grade 6-13/Grade 12 Selection.html" class="dropdown-item">Grade 12</a>
                            <a href="${rootPath}grade 6-13/Grade 13 Selection.html" class="dropdown-item">Grade 13</a>
                        </div>
                    </li>
                    <li id="account-item"><a href="${rootPath}account.html" id="account-btn" class="reveal ${activePage === 'account' ? 'active' : ''}">ACCOUNT</a></li>
                </ul>
            </nav>
            <div class="menu-toggle">
                <span></span>
                <span></span>
            </div>
        </div>
    </header>

    <!-- Mobile Navigation Overlay (Sidebar Style) -->
    <div class="mobile-nav">
        <div class="mobile-nav-content">
            <button class="mobile-nav-close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <ul class="mobile-nav-links">
                <li><a href="${rootPath}index.html" class="mobile-nav-link">Home</a></li>
                <li><a href="${rootPath}olympiad-guide/ijso/Theory.html" class="mobile-nav-link highlight-btn">Start Preparing</a></li>
                <li><a href="${rootPath}subjects.html" class="mobile-nav-link">Olympiad Guide</a></li>
                <li><a href="${rootPath}ptable/Ptable.html" class="mobile-nav-link">Periodic Table</a></li>
                <li><a href="${rootPath}Grade 6 to 13.html" class="mobile-nav-link">Grade 6-13</a></li>
                <li><a href="${rootPath}team.html" class="mobile-nav-link">Our Team</a></li>
                <li id="mobile-account-item"><a href="${rootPath}account.html" id="mobile-account-btn" class="mobile-nav-link">Account</a></li>
            </ul>
        </div>
    </div>
    
    <!-- Profile Completion Modal -->
    <div id="profile-modal-overlay" class="profile-modal-overlay">
        <div class="profile-modal">
            <div class="modal-header">
                <h2>Complete Your Profile</h2>
                <p>Please provide a few details to personalize your experience.</p>
            </div>
            <form id="profile-completion-form" class="modal-form">
                <div class="modal-group">
                    <label for="modal-name">Full Name</label>
                    <input type="text" id="modal-name" placeholder="Enter your full name" required>
                </div>
                <div class="modal-row">
                    <div class="modal-group">
                        <label for="modal-age">Age</label>
                        <input type="number" id="modal-age" placeholder="14" min="5" max="100" required>
                    </div>
                    <div class="modal-group">
                        <label for="modal-country">Country</label>
                        <select id="modal-country" required>
                            <option value="" disabled selected>Select</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="India">India</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Maldives">Maldives</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States">United States</option>
                            <option value="Australia">Australia</option>
                            <option value="Canada">Canada</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                </div>
                <button type="submit" class="modal-submit">Save & Continue</button>
            </form>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // Initialize Menu Logic
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            
            if (mobileNav.classList.contains('active')) {
                if (typeof gsap !== 'undefined') {
                    gsap.from('.mobile-nav-links li', {
                        y: 20,
                        opacity: 0,
                        duration: 0.3,
                        stagger: 0.05,
                        ease: "power2.out"
                    });
                }
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = 'auto';
            }
        });

        // Close menu on link clicks
        document.querySelectorAll('.mobile-nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close button handler
        const closeBtn = document.querySelector('.mobile-nav-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closeMobileMenu();
            });
        }

        function closeMobileMenu() {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            body.style.overflow = 'auto';
        }

        // Close menu on backdrop click
        mobileNav.addEventListener('click', (e) => {
            if (e.target === mobileNav) {
                closeMobileMenu();
            }
        });
    }

    // Global Auth Check and Logout Logic
    const initAuth = async () => {
        try {
            const { auth } = await import(`${rootPath}firebase-config.js`);
            const { onAuthStateChanged, signOut } = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js");
            const { doc, getDoc } = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js");

            onAuthStateChanged(auth, async (user) => {
                const isAuthPage = window.location.pathname.includes('auth.html');
                
                if (user && user.emailVerified) {
                    // Logged in and verified
                    const loginItem = document.getElementById('login-item');
                    const accountItem = document.getElementById('account-item');
                    const mobileLoginItem = document.getElementById('mobile-login-item');
                    const mobileAccountItem = document.getElementById('mobile-account-item');

                    if (loginItem) loginItem.style.display = 'none';
                    if (mobileLoginItem) mobileLoginItem.style.display = 'none';
                    if (accountItem) accountItem.style.display = 'block';
                    if (mobileAccountItem) mobileAccountItem.style.display = 'block';

                    // Attach logout logic logic removed from here as Logout is now handle in account.html

                    // Personalize Account Link and Home Page if exists
                    const updateUIWithProfile = (profile) => {
                        const accountBtn = document.getElementById('account-btn');
                        const mobileAccountBtn = document.getElementById('mobile-account-btn');
                        const userGreeting = document.getElementById('user-greeting');
                        
                        if (profile.name) {
                            const firstName = profile.name.split(' ')[0].toUpperCase();
                            if (accountBtn) accountBtn.textContent = firstName;
                            if (mobileAccountBtn) mobileAccountBtn.textContent = firstName;
                            
                            if (userGreeting && activePage === 'home') {
                                userGreeting.innerHTML = `Welcome back, <span class="gradient-text">${profile.name.split(' ')[0]}</span>!`;
                                userGreeting.style.display = 'block';
                            }
                        }
                    };

                    const checkProfileCompletion = (profile, user) => {
                        const modalOverlay = document.getElementById('profile-modal-overlay');
                        const modalForm = document.getElementById('profile-completion-form');
                        
                        if (!profile.name || !profile.age || !profile.country) {
                            modalOverlay.classList.add('active');
                            
                            // Pre-fill name if available from Google
                            if (!profile.name && user.displayName) {
                                document.getElementById('modal-name').value = user.displayName;
                            }

                            modalForm.onsubmit = async (e) => {
                                e.preventDefault();
                                const updatedData = {
                                    name: document.getElementById('modal-name').value,
                                    age: document.getElementById('modal-age').value,
                                    country: document.getElementById('modal-country').value,
                                    email: user.email,
                                    updatedAt: new Date().toISOString()
                                };

                                try {
                                    const { db } = await import(`${rootPath}firebase-config.js`);
                                    const { doc, setDoc } = await import("https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js");
                                    
                                    await setDoc(doc(db, "users", user.uid), updatedData, { merge: true });
                                    localStorage.setItem('userProfile', JSON.stringify(updatedData));
                                    modalOverlay.classList.remove('active');
                                    updateUIWithProfile(updatedData);
                                } catch (error) {
                                    console.error("Error updating profile:", error);
                                    alert("Failed to save profile. Please try again.");
                                }
                            };
                        }
                    };

                    const localProfile = localStorage.getItem('userProfile');
                    if (localProfile) {
                        const profile = JSON.parse(localProfile);
                        updateUIWithProfile(profile);
                        checkProfileCompletion(profile, user);
                    } else {
                        // Fetch from Firestore if not in cache
                        const docRef = doc(db, "users", user.uid);
                        const docSnap = await getDoc(docRef);
                        if (docSnap.exists()) {
                            const profile = docSnap.data();
                            localStorage.setItem('userProfile', JSON.stringify(profile));
                            updateUIWithProfile(profile);
                            checkProfileCompletion(profile, user);
                        } else {
                            // No profile at all (Google Sign-in first time)
                            checkProfileCompletion({}, user);
                        }
                    }

                    if (isAuthPage) {
                        window.location.href = `${rootPath}index.html`;
                    }
                } else {
                    // Not logged in OR not verified
                    const loginItem = document.getElementById('login-item');
                    const accountItem = document.getElementById('account-item');
                    const mobileLoginItem = document.getElementById('mobile-login-item');
                    const mobileAccountItem = document.getElementById('mobile-account-item');

                    if (loginItem) loginItem.style.display = 'none';
                    if (mobileLoginItem) mobileLoginItem.style.display = 'none';
                    if (accountItem) accountItem.style.display = 'block';
                    if (mobileAccountItem) mobileAccountItem.style.display = 'block';

                    // If user exists but not verified, and we are on a protected page, maybe redirect?
                    // However, we decided login is optional (mostly). 
                    // If some pages require verification, they should handle it.
                    // But for now, we'll just treat them as logged out in the navbar.
                }
            });
        } catch (error) {
            console.error("Firebase auth initialization failed:", error);
        }
    };

    initAuth();
}

// Auto-run if config is present or on DOMContentLoaded
if (window.navbarConfig) {
    initNavbar(window.navbarConfig);
} else {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.navbarConfig) {
            initNavbar(window.navbarConfig);
        }
    });
}
