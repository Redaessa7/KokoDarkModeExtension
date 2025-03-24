(function () {
    const isDarkModeEnabled = document.body.classList.contains('darkmode');
    if (isDarkModeEnabled) {
        document.body.classList.remove('darkmode');
        chrome.storage.sync.set({ darkmode: false });
    } else {
        document.body.classList.add('darkmode');
        chrome.storage.sync.set({ darkmode: true });
    }

    // إرسال رسالة للـ popup عشان يحدث حالة الزر
    chrome.runtime.sendMessage({ action: 'updateButton', darkmode: document.body.classList.contains('darkmode') });
})();