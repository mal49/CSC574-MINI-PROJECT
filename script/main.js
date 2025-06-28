// Stellaris University Course Registration System - Main JavaScript
// Enhanced functionality for magical course management

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeFormValidation();
    initializeAutoSave();
    initializeAnimations();
    initializeThemeToggle();
    initializeNavigationEffects();
    initializeCourseRegistration();
    initializeLoginSystem();
    initializeSignupSystem();
    initializeCharacterCounter();
    
    console.log('🌟 Stellaris University System Initialized Successfully!');
}

// ==================== FORM VALIDATION ====================

function initializeFormValidation() {
    // Login form validation
    const loginForm = document.querySelector('.login-content');
    if (loginForm) {
        const submitBtn = loginForm.querySelector('input[type="submit"]');
        if (submitBtn) {
            submitBtn.addEventListener('click', validateLogin);
        }
    }

    // Signup form validation
    const signupForm = document.querySelector('.login-content');
    if (signupForm && window.location.pathname.includes('signup')) {
        const submitBtn = signupForm.querySelector('input[type="submit"]');
        if (submitBtn) {
            submitBtn.addEventListener('click', validateSignup);
        }
    }

    // Course registration form validation
    const courseForm = document.querySelector('.registration-form');
    if (courseForm) {
        const submitBtn = courseForm.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.addEventListener('click', validateCourseRegistration);
        }
    }
}

function validateLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        showNotification('Please fill in all fields', 'error');
        return false;
    }

    if (username.length < 3) {
        showNotification('Username must be at least 3 characters', 'error');
        return false;
    }

    // Simulate login success
    showNotification('✨ Welcome to Stellaris University!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

function validateSignup(e) {
    e.preventDefault();
    const formData = getSignupFormData();

    if (!validateSignupData(formData)) {
        return false;
    }

    // Save to local storage
    saveUserData(formData);
    showNotification('🎓 Account created successfully! Welcome to Stellaris University!', 'success');
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
}

function getSignupFormData() {
    return {
        fullname: document.getElementById('fullname')?.value.trim(),
        studentId: document.getElementById('student_id')?.value.trim(),
        email: document.getElementById('email')?.value.trim(),
        phone: document.getElementById('phone')?.value.trim(),
        campus: document.getElementById('campus')?.value,
        program: document.getElementById('program')?.value,
        username: document.getElementById('username')?.value.trim(),
        password: document.getElementById('password')?.value,
        confirmPassword: document.getElementById('confirm_password')?.value,
        terms: document.getElementById('terms')?.checked
    };
}

function validateSignupData(data) {
    if (!data.fullname || !data.studentId || !data.email || !data.phone || 
        !data.campus || !data.program || !data.username || !data.password || !data.confirmPassword) {
        showNotification('Please fill in all required fields', 'error');
        return false;
    }

    if (!isValidEmail(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }

    if (data.password !== data.confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return false;
    }

    if (data.password.length < 6) {
        showNotification('Password must be at least 6 characters', 'error');
        return false;
    }

    if (!data.terms) {
        showNotification('Please accept the Terms & Conditions', 'error');
        return false;
    }

    return true;
}

function validateCourseRegistration(e) {
    e.preventDefault();

    // Check if at least one course is being added (dynamic validation)
    const allCourseInputs = document.querySelectorAll('input[name^="add_course"]');
    const hasAddCourse = Array.from(allCourseInputs).some(input => input.value.trim());

    if (!hasAddCourse) {
        showNotification('Please specify at least one course to add', 'error');
        return false;
    }

    // Validate course code format for all dynamic courses
    const coursePattern = /^[A-Z]{2,4}\d{3,4}$/;
    const allCourses = Array.from(allCourseInputs)
        .map(input => input.value.trim())
        .filter(course => course);
    
    for (const course of allCourses) {
        if (course && !coursePattern.test(course)) {
            showNotification(`Invalid course code format: ${course}. Use format like ABC123`, 'error');
            return false;
        }
    }

    // Save form data
    saveCourseRegistrationData();
    showNotification('🎓 Course registration submitted successfully!', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// ==================== AUTO-SAVE FUNCTIONALITY ====================

function initializeAutoSave() {
    const forms = document.querySelectorAll('form, .login-content');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', () => autoSaveFormData(form));
            input.addEventListener('change', () => autoSaveFormData(form));
        });
    });

    // Load saved data on page load
    loadSavedFormData();
}

function autoSaveFormData(form) {
    const formData = new FormData(form);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    const pageKey = window.location.pathname.split('/').pop().replace('.html', '');
    localStorage.setItem(`stellaris_${pageKey}_data`, JSON.stringify(data));
}

function loadSavedFormData() {
    const pageKey = window.location.pathname.split('/').pop().replace('.html', '');
    const savedData = localStorage.getItem(`stellaris_${pageKey}_data`);
    
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const input = document.querySelector(`[name="${key}"]`);
                if (input && data[key]) {
                    input.value = data[key];
                }
            });
        } catch (e) {
            console.log('Error loading saved data:', e);
        }
    }
}

// ==================== ANIMATIONS & EFFECTS ====================

function initializeAnimations() {
    // Add floating animation to cards
    const cards = document.querySelectorAll('.nav-card, .section-card, .feature-item');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-fadeIn');
    });

    // Add hover effects
    addHoverEffects();
    
    // Parallax effect for background
    addParallaxEffect();
}

function addHoverEffects() {
    const interactiveElements = document.querySelectorAll('.nav-card, .nav-btn, input[type="submit"], button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
        });
    });
}

function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.container, .about-container, .form-container');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ==================== THEME TOGGLE ====================

function initializeThemeToggle() {
    createThemeToggle();
    loadThemePreference();
}

function createThemeToggle() {
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = `
        <button id="themeBtn" class="theme-btn" title="Toggle Dark Mode">
            <span class="theme-icon">🌙</span>
        </button>
    `;
    
    document.body.appendChild(themeToggle);
    
    document.getElementById('themeBtn').addEventListener('click', toggleTheme);
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    
    document.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('stellaris_theme', isDark ? 'dark' : 'light');
    
    showNotification(`${isDark ? '🌙' : '☀️'} ${isDark ? 'Dark' : 'Light'} mode activated`, 'info');
}

function loadThemePreference() {
    const savedTheme = localStorage.getItem('stellaris_theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.querySelector('.theme-icon').textContent = '☀️';
    }
}

// ==================== NAVIGATION EFFECTS ====================

function initializeNavigationEffects() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation for page transitions
    document.querySelectorAll('a:not([href^="#"])').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.href && !this.href.includes('javascript:')) {
                e.preventDefault();
                showLoadingAnimation();
                setTimeout(() => {
                    window.location.href = this.href;
                }, 500);
            }
        });
    });
}

function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="magical-spinner"></div>
            <p>✨ Traveling through the magical realm...</p>
        </div>
    `;
    document.body.appendChild(loader);
}

// ==================== COURSE REGISTRATION ENHANCEMENTS ====================

function initializeCourseRegistration() {
    if (!window.location.pathname.includes('course-registration')) return;
    
    addCourseValidation();
    addProgressTracker();
    addCourseSearch();
    initializeDynamicCourseRows();
}

function addCourseValidation() {
    const courseInputs = document.querySelectorAll('input[name^="add_course"], input[name^="drop_course"]');
    
    courseInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateCourseCode(this);
        });
    });
}

function validateCourseCode(input) {
    const courseCode = input.value.trim().toUpperCase();
    const pattern = /^[A-Z]{3}\d{3}$/; // Example: CSC574
    
    if (courseCode && !pattern.test(courseCode)) {
        input.style.borderColor = '#e6394a';
        showTooltip(input, 'Course code format: ABC123 (e.g., CSC574)');
    } else {
        input.style.borderColor = '';
        hideTooltip(input);
    }
}

function addProgressTracker() {
    const form = document.querySelector('.registration-form');
    if (!form) return;

    const progressBar = document.createElement('div');
    progressBar.className = 'progress-tracker';
    progressBar.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <div class="progress-text">Form Progress: <span class="progress-percent">0%</span></div>
    `;
    
    form.insertBefore(progressBar, form.firstChild);
    
    // Update progress on input changes
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', updateProgress);
    });
}

function updateProgress() {
    const form = document.querySelector('.registration-form');
    const inputs = form.querySelectorAll('input, textarea, select');
    const filled = Array.from(inputs).filter(input => input.value.trim() !== '').length;
    const percentage = Math.round((filled / inputs.length) * 100);
    
    const progressFill = document.querySelector('.progress-fill');
    const progressPercent = document.querySelector('.progress-percent');
    
    if (progressFill && progressPercent) {
        progressFill.style.width = percentage + '%';
        progressPercent.textContent = percentage + '%';
        
        // Change color based on progress
        if (percentage < 30) {
            progressFill.style.backgroundColor = '#e6394a';
        } else if (percentage < 70) {
            progressFill.style.backgroundColor = '#ffa500';
        } else {
            progressFill.style.backgroundColor = '#4CAF50';
        }
    }
}

function addCourseSearch() {
    // Course search functionality could be added here in the future
}

function initializeDynamicCourseRows() {
    const addBtn = document.querySelector('.add-course-btn');
    if (!addBtn) return;

    let courseCounter = 4; // Start from 5 since we have 4 initial courses

    addBtn.addEventListener('click', function() {
        courseCounter++;
        addNewCourseRow(courseCounter);
        updateAddButtonState();
    });
}

function addNewCourseRow(courseNumber) {
    const coursesContainer = document.querySelector('.courses-container');
    if (!coursesContainer) return;

    const newRow = document.createElement('div');
    newRow.className = 'course-row removable';
    newRow.innerHTML = `
        <div class="course-number">${courseNumber}</div>
        <div class="course-fields">
            <div class="field-group">
                <label class="field-label">Course Code</label>
                <input type="text" name="add_course${courseNumber}" class="modern-input course-code"
                    placeholder="ABC123">
                <span class="field-icon">📖</span>
            </div>
            <div class="field-group">
                <label class="field-label">Group</label>
                <input type="text" name="add_group${courseNumber}" class="modern-input" placeholder="A1">
                <span class="field-icon">👥</span>
            </div>
            <button type="button" class="remove-course-btn" onclick="removeCourseRow(this)">
                ✕
            </button>
        </div>
    `;

    // Insert before the add course section
    const addCourseSection = document.querySelector('.add-course-section');
    coursesContainer.insertBefore(newRow, addCourseSection);

    // Add validation to new inputs
    const courseInput = newRow.querySelector('.course-code');
    if (courseInput) {
        courseInput.addEventListener('input', function() {
            validateCourseCode(this);
        });
    }

    // Add animation
    newRow.style.opacity = '0';
    newRow.style.transform = 'translateY(20px)';
    setTimeout(() => {
        newRow.style.transition = 'all 0.3s ease';
        newRow.style.opacity = '1';
        newRow.style.transform = 'translateY(0)';
    }, 100);

    showNotification('Course row added successfully! ✨', 'success');
}

function removeCourseRow(btn) {
    const courseRow = btn.closest('.course-row');
    if (!courseRow) return;

    // Animate out
    courseRow.style.transition = 'all 0.3s ease';
    courseRow.style.opacity = '0';
    courseRow.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        courseRow.remove();
        renumberCourseRows();
        updateAddButtonState();
        showNotification('Course row removed', 'info');
    }, 300);
}

// Make removeCourseRow globally accessible for onclick
window.removeCourseRow = removeCourseRow;

function renumberCourseRows() {
    const courseRows = document.querySelectorAll('.course-row');
    courseRows.forEach((row, index) => {
        const courseNumber = row.querySelector('.course-number');
        const courseInput = row.querySelector('input[name^="add_course"]');
        const groupInput = row.querySelector('input[name^="add_group"]');
        
        if (courseNumber) {
            courseNumber.textContent = index + 1;
        }
        
        if (courseInput) {
            courseInput.name = `add_course${index + 1}`;
        }
        
        if (groupInput) {
            groupInput.name = `add_group${index + 1}`;
        }
    });
}

function updateAddButtonState() {
    const courseRows = document.querySelectorAll('.course-row');
    const addBtn = document.querySelector('.add-course-btn');
    
    if (addBtn) {
        if (courseRows.length >= 10) {
            addBtn.disabled = true;
            addBtn.style.opacity = '0.5';
            addBtn.querySelector('.btn-icon').textContent = '⚠️';
            addBtn.innerHTML = '<span class="btn-icon">⚠️</span> Maximum 10 courses allowed';
        } else {
            addBtn.disabled = false;
            addBtn.style.opacity = '1';
            addBtn.innerHTML = '<span class="btn-icon">➕</span> Add Another Course';
        }
    }
}

// Character counter for textarea
function initializeCharacterCounter() {
    const textarea = document.getElementById('reason');
    const charCount = document.querySelector('.char-count');
    
    if (textarea && charCount) {
        const maxLength = 500;
        
        textarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            charCount.textContent = `${currentLength} / ${maxLength}`;
            
            // Change color based on usage
            if (currentLength > maxLength * 0.9) {
                charCount.style.color = '#e6394a';
            } else if (currentLength > maxLength * 0.7) {
                charCount.style.color = '#ffa500';
            } else {
                charCount.style.color = '#9ca3af';
            }
            
            // Prevent exceeding max length
            if (currentLength > maxLength) {
                this.value = this.value.substring(0, maxLength);
                charCount.textContent = `${maxLength} / ${maxLength}`;
                charCount.style.color = '#e6394a';
            }
        });
        
        // Initialize counter
        textarea.dispatchEvent(new Event('input'));
    }
}

// ==================== UTILITY FUNCTIONS ====================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function showTooltip(element, message) {
    hideTooltip(element); // Remove existing tooltip
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = message;
    
    element.parentNode.style.position = 'relative';
    element.parentNode.appendChild(tooltip);
    
    element._tooltip = tooltip;
}

function hideTooltip(element) {
    if (element._tooltip) {
        element._tooltip.remove();
        element._tooltip = null;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function saveUserData(data) {
    localStorage.setItem('stellaris_user_data', JSON.stringify(data));
}

function saveCourseRegistrationData() {
    const form = document.querySelector('.registration-form');
    if (form) {
        const formData = new FormData(form);
        const data = {};
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        data.timestamp = new Date().toISOString();
        data.status = 'submitted';
        
        localStorage.setItem('stellaris_course_registration', JSON.stringify(data));
    }
}

// ==================== LOGIN SYSTEM ====================

function initializeLoginSystem() {
    if (!window.location.pathname.includes('login')) return;
    
    // Add "Remember Me" functionality
    addRememberMeFeature();
    
    // Add password visibility toggle
    addPasswordToggle();
}

function addRememberMeFeature() {
    const loginForm = document.querySelector('.login-content');
    if (!loginForm) return;
    
    const rememberMe = document.createElement('div');
    rememberMe.className = 'remember-me';
    rememberMe.innerHTML = `
        <input type="checkbox" id="rememberMe" name="rememberMe">
        <label for="rememberMe">Remember me</label>
    `;
    
    const submitBtn = loginForm.querySelector('input[type="submit"]');
    if (submitBtn) {
        loginForm.insertBefore(rememberMe, submitBtn);
    }
}

function addPasswordToggle() {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        const wrapper = document.createElement('div');
        wrapper.className = 'password-wrapper';
        
        input.parentNode.insertBefore(wrapper, input);
        wrapper.appendChild(input);
        
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'password-toggle';
        toggle.innerHTML = '👁️';
        toggle.setAttribute('aria-label', 'Toggle password visibility');
        
        wrapper.appendChild(toggle);
        
        toggle.addEventListener('click', () => {
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            toggle.innerHTML = type === 'password' ? '👁️' : '🙈';
        });
    });
}

// ==================== SIGNUP SYSTEM ====================

function initializeSignupSystem() {
    if (!window.location.pathname.includes('signup')) return;
    
    addPasswordStrengthIndicator();
    addRealTimeValidation();
}

function addPasswordStrengthIndicator() {
    const passwordInput = document.getElementById('password');
    if (!passwordInput) return;
    
    const strengthIndicator = document.createElement('div');
    strengthIndicator.className = 'password-strength';
    strengthIndicator.innerHTML = `
        <div class="strength-bar">
            <div class="strength-fill"></div>
        </div>
        <div class="strength-text">Password Strength: <span class="strength-level">Weak</span></div>
    `;
    
    passwordInput.parentNode.insertBefore(strengthIndicator, passwordInput.nextSibling);
    
    passwordInput.addEventListener('input', function() {
        updatePasswordStrength(this.value);
    });
}

function updatePasswordStrength(password) {
    const strengthFill = document.querySelector('.strength-fill');
    const strengthLevel = document.querySelector('.strength-level');
    
    if (!strengthFill || !strengthLevel) return;
    
    let strength = 0;
    let level = 'Weak';
    let color = '#e6394a';
    
    if (password.length >= 6) strength += 20;
    if (password.length >= 10) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;
    
    if (strength >= 80) {
        level = 'Strong';
        color = '#4CAF50';
    } else if (strength >= 50) {
        level = 'Medium';
        color = '#ffa500';
    }
    
    strengthFill.style.width = strength + '%';
    strengthFill.style.backgroundColor = color;
    strengthLevel.textContent = level;
}

function addRealTimeValidation() {
    const inputs = document.querySelectorAll('#email, #student_id, #username');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateField(input) {
    const value = input.value.trim();
    let isValid = true;
    let message = '';
    
    switch(input.id) {
        case 'email':
            isValid = isValidEmail(value);
            message = 'Please enter a valid email address';
            break;
        case 'student_id':
            isValid = /^\d{10}$/.test(value);
            message = 'Student ID must be 10 digits';
            break;
        case 'username':
            isValid = value.length >= 3 && /^[a-zA-Z0-9_]+$/.test(value);
            message = 'Username must be at least 3 characters (letters, numbers, underscore only)';
            break;
    }
    
    if (value && !isValid) {
        input.style.borderColor = '#e6394a';
        showTooltip(input, message);
    } else {
        input.style.borderColor = '';
        hideTooltip(input);
    }
}

// ==================== EASTER EGGS & FUN FEATURES ====================

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.filter = 'hue-rotate(180deg)';
    showNotification('🎉 Easter Egg Activated! Welcome to the Mystic Dimension of Stellaris!', 'success');
    
    setTimeout(() => {
        document.body.style.filter = '';
    }, 5000);
}

console.log('🌟 Stellaris University Course Registration System');
console.log('✨ Enhanced with magical JavaScript functionality!');
console.log('🎓 Try the Konami Code for a surprise!');
