// Replace with your LIFF ID
const LIFF_ID = '2008669534-Ol0ezgz9';

window.onload = function() {
    liff.init({ liffId: LIFF_ID })
        .then(() => {
            if (!liff.isLoggedIn()) {
                liff.login();
            } else {
                getUserProfile();
            }
        })
        .catch((err) => {
            showError('LIFF initialization failed: ' + err.message);
        });
};

function getUserProfile() {
    liff.getProfile()
        .then(profile => {
            document.getElementById('profile').style.display = 'flex';
            document.getElementById('profilePicture').src = profile.pictureUrl || '';
            document.getElementById('displayName').textContent = profile.displayName || '-';
            document.getElementById('userId').textContent = profile.userId || '-';
            document.getElementById('statusMessage').textContent = profile.statusMessage || '-';
        })
        .catch(err => {
            showError('Unable to get profile: ' + err.message);
        });
}

function showError(msg) {
    document.getElementById('error').textContent = msg;
}
