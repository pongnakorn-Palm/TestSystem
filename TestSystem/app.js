// Detect user language
let userLang = 'en'; // Default language
if (navigator.language || navigator.userLanguage) {
    const browserLang = (navigator.language || navigator.userLanguage).toLowerCase();
    userLang = browserLang.startsWith('th') ? 'th' : 'en';
}
document.documentElement.lang = userLang;

// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Landing Page - Click Register button to go to Register page
document.getElementById('btnRegister').addEventListener('click', function(e) {
    e.stopPropagation();
    showPage('register');
});

// Checkbox validation - Enable/disable submit button
const consentCheckbox = document.getElementById('consent');
const submitBtn = document.getElementById('submitBtn');

consentCheckbox.addEventListener('change', function() {
    submitBtn.disabled = !this.checked;
});

// Terms Modal
const termsModal = document.getElementById('termsModal');
const openTermsLink = document.getElementById('openTerms');
const btnCloseModal = document.getElementById('btnCloseModal');

// Open Terms Modal
openTermsLink.addEventListener('click', function(e) {
    e.preventDefault();
    termsModal.classList.add('active');
});

// Close Terms Modal with X button
btnCloseModal.addEventListener('click', function() {
    termsModal.classList.remove('active');
});

// Close modal when clicking outside
termsModal.addEventListener('click', function(e) {
    if (e.target === termsModal) {
        termsModal.classList.remove('active');
    }
});

// Form Submission
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const consent = document.getElementById('consent').checked;
    const btn = document.getElementById('submitBtn');
    const errorDiv = document.getElementById('error');

    // Clear previous error
    errorDiv.textContent = '';

    // Validation
    if (!fullname || !phone || !email) {
        errorDiv.textContent = userLang === 'th' ? 'กรุณากรอกข้อมูลให้ครบถ้วน' : 'Please fill in all required fields';
        return;
    }

    // Phone validation (10 digits)
    if (!/^0[0-9]{9}$/.test(phone)) {
        errorDiv.textContent = userLang === 'th' ? 'กรุณากรอกเบอร์โทรศัพท์ 10 หลักให้ถูกต้อง' : 'Please enter a valid 10-digit phone number';
        return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorDiv.textContent = userLang === 'th' ? 'กรุณากรอก Email ให้ถูกต้อง' : 'Please enter a valid email address';
        return;
    }

    // Consent validation
    if (!consent) {
        errorDiv.textContent = userLang === 'th' ? 'กรุณายอมรับข้อกำหนดและเงื่อนไข' : 'Please accept the terms and conditions';
        return;
    }

    // Show loading
    btn.classList.add('loading');
    btn.disabled = true;
    errorDiv.textContent = '';

    // Simulate API call (replace with actual API)
    setTimeout(function() {
        // Show success page
        document.getElementById('successName').textContent = fullname;
        document.getElementById('successPhone').textContent = phone;
        document.getElementById('successEmail').textContent = email;

        btn.classList.remove('loading');
        btn.disabled = false;

        showPage('success');
    }, 1500);
});
