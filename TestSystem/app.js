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
const acceptTermsCheckbox = document.getElementById('acceptTerms');
const btnAcceptTerms = document.getElementById('btnAcceptTerms');
const btnCloseTerms = document.getElementById('btnCloseTerms');

// Open Terms Modal
openTermsLink.addEventListener('click', function(e) {
    e.preventDefault();
    termsModal.classList.add('active');
});

// Accept Terms Checkbox - Enable/Disable Accept button
acceptTermsCheckbox.addEventListener('change', function() {
    btnAcceptTerms.disabled = !this.checked;
});

// Accept Terms Button - Check consent and close modal
btnAcceptTerms.addEventListener('click', function() {
    consentCheckbox.checked = true;
    submitBtn.disabled = false;
    termsModal.classList.remove('active');
});

// Close Terms Modal
btnCloseTerms.addEventListener('click', function() {
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
        errorDiv.textContent = 'กรุณากรอกข้อมูลให้ครบถ้วน';
        return;
    }

    // Phone validation (Thai format)
    if (!/^0[0-9]{8,9}$/.test(phone)) {
        errorDiv.textContent = 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง';
        return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorDiv.textContent = 'กรุณากรอก Email ให้ถูกต้อง';
        return;
    }

    // Consent validation
    if (!consent) {
        errorDiv.textContent = 'กรุณายอมรับข้อกำหนดและเงื่อนไข';
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
