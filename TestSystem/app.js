// Page Navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Landing Page - Click to go to Register
document.getElementById('landing').addEventListener('click', function() {
    showPage('register');
});

// Form Submission
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const btn = document.querySelector('.btn-register');
    const errorDiv = document.getElementById('error');

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

// Show error message
function showError(msg) {
    document.getElementById('error').textContent = msg;
}
