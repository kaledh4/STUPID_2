// SECURITY NOTE: Client-side only. Not bulletproof.
const SECRET_HASH = "NEON2026";
const REPO_USER = "kaledh4";
const REPO_NAME = "STUPID_2";
const BRANCH = "main";

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
        quick_links: "QUICK LINKS",
        document_viewer: "Document Viewer",
        add_task_placeholder: "Add new task...",
        password_placeholder: "ENTER ACCESS CODE",
        arabic_version: "Arabic Version",
        english_version: "English Version"
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
        quick_links: "روابط سريعة",
        document_viewer: "عارض المستندات",
        add_task_placeholder: "أضف مهمة جديدة...",
        password_placeholder: "أدخل رمز الوصول",
        arabic_version: "النسخة العربية",
        english_version: "النسخة الإنجليزية"
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
        document.getElementById('password-input').placeholder = translations.ar.password_placeholder;
        document.getElementById('new-task').placeholder = translations.ar.add_task_placeholder;
        
        // Update modal title if it exists
        const modalTitle = document.querySelector('.modal-header h2');
        if (modalTitle) {
            modalTitle.textContent = translations.ar.document_viewer;
        }
        
        // Update language toggle button text
        const langToggleBtn = document.querySelector('.lang-toggle');
        if (langToggleBtn) {
            langToggleBtn.textContent = '🌐 EN';
            langToggleBtn.title = translations.ar.english_version;
        }
    } else {
        document.body.classList.remove('rtl');
        document.documentElement.lang = 'en';
        document.getElementById('password-input').placeholder = translations.en.password_placeholder;
        document.getElementById('new-task').placeholder = translations.en.add_task_placeholder;
        
        // Update modal title if it exists
        const modalTitle = document.querySelector('.modal-header h2');
        if (modalTitle) {
            modalTitle.textContent = translations.en.document_viewer;
        }
        
        // Update language toggle button text
        const langToggleBtn = document.querySelector('.lang-toggle');
        if (langToggleBtn) {
            langToggleBtn.textContent = '🌐 AR';
            langToggleBtn.title = translations.en.arabic_version;
        }
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

    // Allow both the hardcoded secret AND the one injected by GitHub Actions (if matched)
    if (input === SECRET_HASH) {
        localStorage.setItem('neon_session', 'valid');
        showDashboard();
    } else {
        if (!autoLogin) {
            errorMsg.style.display = 'block';
            // Add animation class for error message
            errorMsg.classList.add('error-message');
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

        // Create checkbox element
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.onchange = () => toggleTask(index);

        // Create text span
        const textSpan = document.createElement('span');
        textSpan.textContent = task.text;

        div.appendChild(checkbox);
        div.appendChild(textSpan);
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
    if (!input.value.trim()) return;

    const list = JSON.parse(localStorage.getItem('neon_checklist')) || defaultTasks;
    list.push({ text: input.value.trim(), done: false });
    localStorage.setItem('neon_checklist', JSON.stringify(list));
    input.value = '';
    loadChecklist();
}

// --- FILE VIEWER LOGIC ---

function openDoc(docName) {
    let path = `/${docName}.md`;

    if (currentLang === 'ar') {
        path = `/Arabic/${docName}.md`;
    }

    // Use Raw GitHub User Content to bypass relative path issues on deployed site
    const rawUrl = `https://raw.githubusercontent.com/${REPO_USER}/${REPO_NAME}/${BRANCH}${path}`;

    fetch(rawUrl)
        .then(response => {
            if (!response.ok) throw new Error("Could not fetch file from GitHub.");
            return response.text();
        })
        .then(text => {
            // Enhanced Markdown Parsing to HTML for better readability
            let htmlText = text;
            
            // Convert headers
            htmlText = htmlText.replace(/^# (.*$)/gm, '<h1 class="doc-h1">$1</h1>');
            htmlText = htmlText.replace(/^## (.*$)/gm, '<h2 class="doc-h2">$1</h2>');
            htmlText = htmlText.replace(/^### (.*$)/gm, '<h3 class="doc-h3">$1</h3>');
            
            // Convert bold and italic
            htmlText = htmlText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            htmlText = htmlText.replace(/\*(.*?)\*/g, '<em>$1</em>');
            
            // Convert links
            htmlText = htmlText.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" class="doc-link">$1</a>');
            
            // Convert lists
            htmlText = htmlText.replace(/^\* (.+)$/gm, '<li class="doc-list-item">$1</li>');
            htmlText = htmlText.replace(/(<li class="doc-list-item">.*<\/li>)/gs, '<ul class="doc-list">$1</ul>');
            
            // Convert paragraphs (separate lines)
            htmlText = htmlText.replace(/\n\n/g, '</p><p class="doc-paragraph">');
            htmlText = htmlText.replace(/\n/g, '<br>');
            
            // Wrap in paragraph tags
            htmlText = `<p class="doc-paragraph">${htmlText}</p>`;
            
            // Clean up extra list wrappers
            htmlText = htmlText.replace(/<\/ul><ul class="doc-list">/g, '');
            htmlText = htmlText.replace(/<ul class="doc-list"><\/ul>/g, '');

            document.getElementById('doc-content').innerHTML = htmlText;
            
            // Show modal
            const modal = document.getElementById('doc-viewer');
            modal.style.display = 'block';
            
            // Add close functionality via click outside
            modal.onclick = function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            };

            // Adjust viewer direction
            if (currentLang === 'ar') {
                document.getElementById('doc-content').setAttribute('dir', 'rtl');
            } else {
                document.getElementById('doc-content').setAttribute('dir', 'ltr');
            }
            
            // Update modal title
            const modalTitle = document.querySelector('.modal-header h2');
            if (modalTitle) {
                modalTitle.textContent = translations[currentLang].document_viewer;
            }
        })
        .catch(err => {
            document.getElementById('doc-content').innerHTML = `
                <div class="doc-error">
                    <h2 class="error-title">ERROR LOADING DOCUMENT</h2>
                    <p class="error-message">Could not fetch from: ${rawUrl}</p>
                    <p class="error-description">Ensure the repository is PUBLIC or the path is correct.</p>
                    <div class="error-actions">
                        <button class="action-btn" onclick="window.open('${rawUrl.replace('raw.githubusercontent.com', 'github.com').replace('/main/', '/blob/main/')}')">OPEN ON GITHUB</button>
                        <button class="action-btn" onclick="document.getElementById('doc-viewer').style.display='none'">CLOSE</button>
                    </div>
                </div>
            `;
            
            const modal = document.getElementById('doc-viewer');
            modal.style.display = 'block';
            
            // Add close functionality via click outside
            modal.onclick = function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            };
        });
}

// Function to open a document in a specific language
function openDocWithLang(docName, lang) {
    // Store the current language to restore after viewing
    const originalLang = currentLang;
    
    // Temporarily switch to the requested language
    currentLang = lang;
    
    // Update the language attribute on the document element
    if (lang === 'ar') {
        document.documentElement.lang = 'ar';
        document.body.classList.add('rtl');
    } else {
        document.documentElement.lang = 'en';
        document.body.classList.remove('rtl');
    }
    
    // Open the document with the temporary language setting
    let path = `/${docName}.md`;
    
    if (lang === 'ar') {
        path = `/Arabic/${docName}.md`;
    }
    
    // Use Raw GitHub User Content to bypass relative path issues on deployed site
    const rawUrl = `https://raw.githubusercontent.com/${REPO_USER}/${REPO_NAME}/${BRANCH}${path}`;
    
    fetch(rawUrl)
        .then(response => {
            if (!response.ok) throw new Error("Could not fetch file from GitHub.");
            return response.text();
        })
        .then(text => {
            // Enhanced Markdown Parsing to HTML for better readability
            let htmlText = text;
            
            // Convert headers
            htmlText = htmlText.replace(/^# (.*$)/gm, '<h1 class="doc-h1">$1</h1>');
            htmlText = htmlText.replace(/^## (.*$)/gm, '<h2 class="doc-h2">$1</h2>');
            htmlText = htmlText.replace(/^### (.*$)/gm, '<h3 class="doc-h3">$1</h3>');
            
            // Convert bold and italic
            htmlText = htmlText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
            htmlText = htmlText.replace(/\*(.*?)\*/g, '<em>$1</em>');
            
            // Convert links
            htmlText = htmlText.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" class="doc-link">$1</a>');
            
            // Convert lists
            htmlText = htmlText.replace(/^\* (.+)$/gm, '<li class="doc-list-item">$1</li>');
            htmlText = htmlText.replace(/(<li class="doc-list-item">.*<\/li>)/gs, '<ul class="doc-list">$1</ul>');
            
            // Convert paragraphs (separate lines)
            htmlText = htmlText.replace(/\n\n/g, '</p><p class="doc-paragraph">');
            htmlText = htmlText.replace(/\n/g, '<br>');
            
            // Wrap in paragraph tags
            htmlText = `<p class="doc-paragraph">${htmlText}</p>`;
            
            // Clean up extra list wrappers
            htmlText = htmlText.replace(/<\/ul><ul class="doc-list">/g, '');
            htmlText = htmlText.replace(/<ul class="doc-list"><\/ul>/g, '');

            document.getElementById('doc-content').innerHTML = htmlText;
            
            // Show modal
            const modal = document.getElementById('doc-viewer');
            modal.style.display = 'block';
            
            // Add close functionality via click outside
            modal.onclick = function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    // Restore original language when closing
                    currentLang = originalLang;
                    if (originalLang === 'ar') {
                        document.documentElement.lang = 'ar';
                        document.body.classList.add('rtl');
                    } else {
                        document.documentElement.lang = 'en';
                        document.body.classList.remove('rtl');
                    }
                }
            };

            // Adjust viewer direction
            if (lang === 'ar') {
                document.getElementById('doc-content').setAttribute('dir', 'rtl');
            } else {
                document.getElementById('doc-content').setAttribute('dir', 'ltr');
            }
            
            // Update modal title
            const modalTitle = document.querySelector('.modal-header h2');
            if (modalTitle) {
                modalTitle.textContent = translations[lang].document_viewer;
            }
        })
        .catch(err => {
            document.getElementById('doc-content').innerHTML = `
                <div class="doc-error">
                    <h2 class="error-title">ERROR LOADING DOCUMENT</h2>
                    <p class="error-message">Could not fetch from: ${rawUrl}</p>
                    <p class="error-description">Ensure the repository is PUBLIC or the path is correct.</p>
                    <div class="error-actions">
                        <button class="action-btn" onclick="window.open('${rawUrl.replace('raw.githubusercontent.com', 'github.com').replace('/main/', '/blob/main/')}')">OPEN ON GITHUB</button>
                        <button class="action-btn" onclick="document.getElementById('doc-viewer').style.display='none'">CLOSE</button>
                    </div>
                </div>
            `;
            
            const modal = document.getElementById('doc-viewer');
            modal.style.display = 'block';
            
            // Add close functionality via click outside
            modal.onclick = function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                    // Restore original language when closing
                    currentLang = originalLang;
                    if (originalLang === 'ar') {
                        document.documentElement.lang = 'ar';
                        document.body.classList.add('rtl');
                    } else {
                        document.documentElement.lang = 'en';
                        document.body.classList.remove('rtl');
                    }
                }
            };
        });
}

// Close modal when pressing Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.getElementById('doc-viewer').style.display = 'none';
    }
});
