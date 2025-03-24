// ننفذ الكود فورًا بدلاً من الانتظار لحدث 'load'
(function () {
    // دالة لتطبيق الوضع بناءً على القيمة المخزنة
    function applyDarkMode() {
        chrome.storage.sync.get(['darkmode'], (result) => {
            // إذا الـ body لسه مش موجود، نستنى شوية ونحاول تاني
            if (!document.body) {
                setTimeout(applyDarkMode, 10); // نكرر المحاولة بعد 10 ميللي ثانية
                return;
            }

            if (result.darkmode === undefined) {
                // إذا لم تكن هناك قيمة مخزنة، نضبط الوضع العادي (false) كقيمة افتراضية
                chrome.storage.sync.set({ darkmode: false }, () => {
                    // نطبق الوضع العادي فورًا
                    document.body.classList.remove('darkmode');
                });
            } else {
                // إذا كانت هناك قيمة مخزنة بالفعل، نطبق الوضع المناسب فورًا
                if (result.darkmode === true) {
                    // تطبيق الوضع المظلم
                    document.body.classList.add('darkmode');
                } else {
                    // تطبيق الوضع العادي
                    document.body.classList.remove('darkmode');
                }
            }
        });
    }

    // نفذ الدالة فورًا
    applyDarkMode();

    // الاستماع لتغييرات في chrome.storage
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (changes.darkmode) {
            const newValue = changes.darkmode.newValue;
            if (document.body) { // نضمن إن الـ body موجود قبل التعديل
                if (newValue === true) {
                    document.body.classList.add('darkmode');
                } else {
                    document.body.classList.remove('darkmode');
                }
            }
        }
    });

    // إضافة MutationObserver لمراقبة التغييرات في الـ DOM
    function startObserver() {
        if (!document.body) {
            setTimeout(startObserver, 10); // نستنى لحد ما الـ body يبقى موجود
            return;
        }

        const observer = new MutationObserver(() => {
            // عند إضافة عناصر جديدة، نتحقق من الإعدادات مرة أخرى
            chrome.storage.sync.get(['darkmode'], (result) => {
                if (result.darkmode === true) {
                    document.body.classList.add('darkmode');
                } else {
                    document.body.classList.remove('darkmode');
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // نفذ الـ Observer فورًا
    startObserver();
})();

// الاستماع لرسالة التبديل
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'toggle') {
        chrome.storage.sync.get(['darkmode'], (result) => {
            const newDarkModeValue = !(result.darkmode === true);
            chrome.storage.sync.set({ darkmode: newDarkModeValue });
            // التغييرات ستُطبق من خلال مستمع التغييرات
        });
    }
});