// Translations
const translations = {
    en: {
        'welcome': 'We are pleased to welcome you<br>to the Longchamp Green Pop-up at Songwat,<br>an immersive experience reflecting<br>the spirit of French heritage and modern allure.',
        'register-btn': 'Register',
        'register-title': 'Register',
        'register-desc': 'Please fill in your information to receive exclusive privileges from Longchamp Thailand',
        'fullname-label': 'Full Name',
        'fullname-placeholder': 'Enter your full name',
        'phone-label': 'Phone Number',
        'phone-placeholder': 'Enter your phone number',
        'email-label': 'Email',
        'email-placeholder': 'Enter your email address',
        'consent-text': 'I accept the',
        'terms-link': 'Terms & Conditions',
        'thank-you': 'Thank You',
        'success-title': 'Registration Complete',
        'success-desc': 'You will receive news and exclusive privileges from Longchamp Thailand',
        'name-label': 'Name',
        'terms-title': 'Terms & Conditions',
        'terms-subtitle': 'Terms & Conditions',
        'terms-list': [
            'Registration is limited to 1 account per person and is valid only at the LONGCHAMP GREEN POP-UP at PLAY ART HOUSE, Songwat.',
            'Privileges cannot be exchanged, transferred, or redeemed for cash or other items and cannot be used in conjunction with other promotions.',
            'The company reserves the right to change the terms and conditions without prior notice.',
            'Images displayed in the application are for promotional purposes only.',
            'By participating in this activity, you acknowledge and consent to the company collecting, using, and processing your personal data, including personal data of any other individuals you may provide, for the purpose of operating, managing, and verifying the activity as determined by the company.'
        ]
    },
    th: {
        'welcome': 'เรายินดีต้อนรับท่านสู่<br>Longchamp Green Pop-up ณ ทรงวาด<br>ประสบการณ์ที่ดื่มด่ำ<br>สะท้อนจิตวิญญาณมรดกของฝรั่งเศสและเสน่ห์สมัยใหม่',
        'register-btn': 'ลงทะเบียน',
        'register-title': 'ลงทะเบียน',
        'register-desc': 'กรุณากรอกข้อมูลของคุณเพื่อรับสิทธิพิเศษจาก Longchamp ประเทศไทย',
        'fullname-label': 'ชื่อ-นามสกุล',
        'fullname-placeholder': 'กรอกชื่อ-นามสกุล',
        'phone-label': 'เบอร์โทรศัพท์',
        'phone-placeholder': 'กรอกเบอร์โทรศัพท์',
        'email-label': 'อีเมล',
        'email-placeholder': 'กรอกอีเมล',
        'consent-text': 'ข้าพเจ้ายอมรับ',
        'terms-link': 'ข้อกำหนดและเงื่อนไข',
        'thank-you': 'ขอบคุณ',
        'success-title': 'ลงทะเบียนสำเร็จ',
        'success-desc': 'คุณจะได้รับข่าวสารและสิทธิพิเศษจาก Longchamp ประเทศไทย',
        'name-label': 'ชื่อ',
        'terms-title': 'ข้อกำหนดและเงื่อนไข',
        'terms-subtitle': 'Terms & Conditions',
        'terms-list': [
            'สามารถลงทะเบียนได้ 1 บัญชีต่อ 1 ครั้ง และสามารถเข้าร่วมได้เฉพาะภายในงาน LONGCHAMP GREEN POP-UP ณ PLAY ART HOUSE ถนนทรงวาด เท่านั้น',
            'สิทธิพิเศษไม่สามารถแลก เปลี่ยน หรือทอนเป็นเงินสด หรือสิ่งอื่นทดแทนได้ และไม่สามารถใช้ร่วมกับรายการส่งเสริมการขายอื่นได้',
            'บริษัทขอสงวนสิทธิ์ในการเปลี่ยนแปลงเงื่อนไขโดยไม่ต้องแจ้งให้ทราบล่วงหน้า',
            'รูปภาพที่ปรากฏในแอปพลิเคชันจัดทำขึ้นเพื่อวัตถุประสงค์ด้านการประชาสัมพันธ์เท่านั้น',
            'การเข้าร่วมกิจกรรมนี้ ท่านรับทราบและยินยอมให้บริษัททำการเก็บรวบรวม ใช้ และประมวลผลข้อมูลส่วนบุคคลของท่าน รวมถึงข้อมูลส่วนบุคคลของบุคคลอื่นใดที่ท่านอาจส่งมอบให้ ทั้งนี้เพื่อวัตถุประสงค์ในการดำเนินงาน จัดการ และตรวจสอบความถูกต้องของกิจกรรมตามที่บริษัทกำหนด'
        ]
    }
};

// Detect user language
let userLang = 'en'; // Default language
if (navigator.language || navigator.userLanguage) {
    const browserLang = (navigator.language || navigator.userLanguage).toLowerCase();
    userLang = browserLang.startsWith('th') ? 'th' : 'en';
}
document.documentElement.lang = userLang;

// Apply translations
function applyTranslations() {
    // Apply text content
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (key === 'terms-list') {
            // Handle terms list specially
            const listItems = element.querySelectorAll('li');
            const translatedItems = translations[userLang][key];
            listItems.forEach((li, index) => {
                if (translatedItems[index]) {
                    li.textContent = translatedItems[index];
                }
            });
        } else if (translations[userLang][key]) {
            element.innerHTML = translations[userLang][key];
        }
    });

    // Apply placeholders
    document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
        const key = element.getAttribute('data-lang-placeholder');
        if (translations[userLang][key]) {
            element.placeholder = translations[userLang][key];
        }
    });
}

// Apply translations on page load
applyTranslations();

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
