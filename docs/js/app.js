// SECURITY NOTE: Client-side only. Not bulletproof.
const SECRET_HASH = "NEON2026";

// --- LOCALIZATION DATA ---
const translations = {
    en: {
        restricted: "RESTRICTED ACCESS",
        unlock: "UNLOCK",
        denied: "DENIED",
        logout: "LOGOUT",
        docs_title: "STRATEGIC DOCUMENTS",
        docs_subtitle: "Master documentation for the project. Edit directly on GitHub.",
        market_desc: "Analysis & Vibe Strategy",
        blueprint_desc: "Game Design Document (GDD)",
        study_desc: "8-Week Dev Roadmap",
        project_desc: "Case Studies & Proof",
        read: "READ",
        edit: "EDIT",
        upload_title: "FILE UPLOAD & ASSETS",
        drag_drop: "DRAG & DROP FILES HERE",
        github_redirect: "(Redirects to GitHub Upload Interface)",
        supported_files: "Supported: Images, Videos, Unity Packages",
        checklist_title: "DEV CHECKLIST",
        quick_links: "QUICK LINKS"
    },
    ar: {
        restricted: "دخول مقيد",
        unlock: "فك القفل",
        denied: "مرفوض",
        logout: "خروج",
        docs_title: "الوثائق الاستراتيجية",
        docs_subtitle: "الوثائق الرئيسية للمشروع. قم بالتعديل مباشرة على GitHub.",
        market_desc: "تحليل السوق واستراتيجية الأجواء",
        blueprint_desc: "وثيقة تصميم اللعبة (GDD)",
        study_desc: "خارطة طريق التطوير (8 أسابيع)",
        project_desc: "دراسات الحالة والإثبات",
        read: "اقرأ",
        edit: "تعديل",
        upload_title: "رفع الملفات والأصول",
        drag_drop: "اسحب وأفلت الملفات هنا",
        github_redirect: "(يعيد التوجيه إلى واجهة رفع GitHub)",
        supported_files: "مدعوم: صور، فيديو، حزم Unity",
        checklist_title: "قائمة مهام التطوير",
        quick_links: "روابط سريعة"
    }
};

let currentLang = 'en';

function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    applyLanguage();
}

function applyLanguage() {
    // 1. Update Text
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });

    // 2. Update RTL/LTR
    if (currentLang === 'ar') {
        document.body.classList.add('rtl');
        document.documentElement.lang = 'ar';
        document.getElementById('password-input').placeholder = "أدخل رمز الوصول";
        document.getElementById('new-task').placeholder = "أضف مهمة جديدة...";
    } else {
        document.body.classList.remove('rtl');
        document.documentElement.lang = 'en';
        document.getElementById('password-input').placeholder = "ENTER ACCESS CODE";
        document.getElementById('new-task').placeholder = "Add new task...";
    }

    // 3. Save preference
    localStorage.setItem('neon_lang', currentLang);

    // Reload checklist to fix text direction if needed
    loadChecklist();
}

// --- AUTHENTICATION ---

function checkAccess(autoLogin = false) {
    const input = document.getElementById('password-input').value;
    const errorMsg = document.getElementById('error-msg');
    const storedSession = localStorage.getItem('neon_session');

    if (autoLogin && storedSession === 'valid') {
        showDashboard();
        return;
    }

    if (input === SECRET_HASH) {
        localStorage.setItem('neon_session', 'valid');
        showDashboard();
    } else {
        if (!autoLogin) {
            errorMsg.style.display = 'block';
        }
    }
}

function showDashboard() {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('dashboard').style.display = 'block';

    // Load Lang preference
    const savedLang = localStorage.getItem('neon_lang');
    if (savedLang) {
        currentLang = savedLang;
        applyLanguage();
    }

    loadChecklist();
}

function lockSession() {
    localStorage.removeItem('neon_session');
    location.reload();
}

window.onload = function () {
    if (localStorage.getItem('neon_session') === 'valid') {
        checkAccess(true);
    }
}

// --- CHECKLIST LOGIC ---

const defaultTasks = [
    { text: "Setup Unity Project & Mirror", done: false },
    { text: "Implement Wetness Mechanic", done: false },
    { text: "Create First Procedural Chunk", done: false },
    { text: "Setup GitHub Repo", done: false }
];

function loadChecklist() {
    const list = JSON.parse(localStorage.getItem('neon_checklist')) || defaultTasks;
    const container = document.getElementById('checklist-container');
    container.innerHTML = '';

    list.forEach((task, index) => {
        const div = document.createElement('div');
        div.className = `checklist-item ${task.done ? 'done' : ''}`;
        div.onclick = () => toggleTask(index);

        div.innerHTML = `
            <input type="checkbox" ${task.done ? 'checked' : ''}>
            <span>${task.text}</span>
        `;
        container.appendChild(div);
    });
}

function toggleTask(index) {
    const list = JSON.parse(localStorage.getItem('neon_checklist')) || defaultTasks;
    list[index].done = !list[index].done;
    localStorage.setItem('neon_checklist', JSON.stringify(list));
    loadChecklist();
}

function addTask() {
    const input = document.getElementById('new-task');
    if (!input.value) return;

    const list = JSON.parse(localStorage.getItem('neon_checklist')) || defaultTasks;
    list.push({ text: input.value, done: false });
    localStorage.setItem('neon_checklist', JSON.stringify(list));
    input.value = '';
    loadChecklist();
}

// --- FILE VIEWER LOGIC ---

function openDoc(docName) {
    // Determine path based on language
    let path = `../${docName}.md`; // Default English

    if (currentLang === 'ar') {
        path = `../Arabic/${docName}.md`; // Arabic Folder
    }

    fetch(path)
        .then(response => {
            if (!response.ok) throw new Error("File not found or local browser restriction.");
            return response.text();
        })
        .then(text => {
            document.getElementById('doc-content').textContent = text;
            document.getElementById('doc-viewer').style.display = 'block';

            // Adjust viewer direction
            if (currentLang === 'ar') {
                document.getElementById('doc-content').style.direction = 'rtl';
                document.getElementById('doc-content').style.textAlign = 'right';
            } else {
                document.getElementById('doc-content').style.direction = 'ltr';
                document.getElementById('doc-content').style.textAlign = 'left';
            }
        })
        .catch(err => {
            const msg = currentLang === 'ar'
                ? "لا يمكن تحميل الملف محلياً.\nالمتصفحات تمنع الوصول للملفات المحلية.\nاضغط 'تعديل' للمشاهدة على GitHub."
                : "Cannot load file directly.\nIf running locally, browsers block file access.\nClick 'EDIT' to view on GitHub.";
            alert(msg);
        });
}
