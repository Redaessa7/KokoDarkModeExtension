// تحديث حالة الزر والنص والثيم بناءً على حالة الـ dark mode
function updateButtonState(isDarkModeEnabled, isTargetSite) {
    const button = document.getElementById('toggle-darkmode');
    const statusText = document.getElementById('status-text');
    const body = document.body;

    button.textContent = ''; // نفرغ النص لأن اللوجو كافي

    if (!isTargetSite) {
        button.disabled = true;
        button.classList.remove('dark-mode-on');
        statusText.textContent = 'Go to programmingadvices.com';
        statusText.classList.remove('active', 'inactive');
        statusText.classList.add('disabled');
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    } else {
        button.disabled = false;
        // إضافة أنيميشن للزر
        button.classList.add('toggle-animation');
        setTimeout(() => button.classList.remove('toggle-animation'), 500); // إزالة الأنيميشن بعد 0.5 ثانية

        if (isDarkModeEnabled) {
            button.classList.add('dark-mode-on');
            statusText.textContent = 'Dark Mode is ON';
            statusText.classList.remove('inactive', 'disabled');
            statusText.classList.add('active');
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
        } else {
            button.classList.remove('dark-mode-on');
            statusText.textContent = 'Dark Mode is OFF';
            statusText.classList.remove('active', 'disabled');
            statusText.classList.add('inactive');
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = tabs[0].url;
        const button = document.getElementById('toggle-darkmode');
        const isTargetSite = url && url.includes('programmingadvices.com');

        if (isTargetSite) {
            button.disabled = false;
            chrome.storage.sync.get(['darkmode'], (result) => {
                const isDarkModeEnabled = result.darkmode === true;
                updateButtonState(isDarkModeEnabled, true);
            });
        } else {
            button.disabled = true;
            updateButtonState(false, false);
        }
    });
});

// التعامل مع ضغطة الزر
document.getElementById('toggle-darkmode').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const url = tabs[0].url;
        if (url && url.includes('programmingadvices.com')) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ['/Controls/toggle.js']
            });
        } else {
            alert('Please open programmingadvices.com to use KOKO Dark Mode.');
        }
    });
});

// استقبال رسائل من toggle.js لتحديث حالة الزر والنص والثيم
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'updateButton') {
        updateButtonState(message.darkmode, true);
    }
});