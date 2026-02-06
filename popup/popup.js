// === SETTINGS MANAGEMENT ===

// 기본 설정값
const DEFAULT_SETTINGS = {
    autoInject: true,
    notifications: false,
    debugMode: false,
    language: 'en',
    categories: {
        start: true,
        flow: true,
        motion: true,
        looks: true,
        brush: true,
        sound: true,
        decision: true,
        figures: true,
        variable: true,
        function: true,
        table: true,
        ai: true,
        extension: true,
        hardware: true,
        npi: true
    },
    developerMode: false,
    skipAdvancedWarning: false // 추가: 고급 도구 경고 건너뛰기
};

// Chrome extension 환경인지 확인
const isChromeExtension = typeof chrome !== 'undefined' && chrome.storage;

// 설정 불러오기 (자동 전환)
async function loadSettings() {
    if (isChromeExtension) {
        return new Promise((resolve) => {
            chrome.storage.sync.get(['settings'], (result) => {
                const settings = result.settings || DEFAULT_SETTINGS;
                resolve(settings);
            });
        });
    } else {
        try {
            const savedSettings = localStorage.getItem('entryProSettings');
            return savedSettings ? JSON.parse(savedSettings) : DEFAULT_SETTINGS;
        } catch (error) {
            console.error('Error loading settings:', error);
            return DEFAULT_SETTINGS;
        }
    }
}

// 설정 저장하기 (자동 전환)
async function saveSettings(settings) {
    if (isChromeExtension) {
        return new Promise((resolve) => {
            chrome.storage.sync.set({ settings }, () => {
                resolve();
            });
        });
    } else {
        try {
            localStorage.setItem('entryProSettings', JSON.stringify(settings));
        } catch (error) {
            console.error('Error saving settings:', error);
            throw error;
        }
    }
}

// UI에 설정 적용
async function applySettingsToUI(settings) {
    document.getElementById('autoInject').checked = settings.autoInject;
    document.getElementById('notifications').checked = settings.notifications;
    document.getElementById('debugMode').checked = settings.debugMode;
    document.querySelector('.select-box').value = settings.language;
    document.getElementById('devModeToggle').checked = settings.developerMode;
    
    const categoryCheckboxes = document.querySelectorAll('.category-grid input[type="checkbox"]');
    const categoryNames = Object.keys(DEFAULT_SETTINGS.categories);
    categoryCheckboxes.forEach((checkbox, index) => {
        if (categoryNames[index]) {
            checkbox.checked = settings.categories[categoryNames[index]];
        }
    });
    
    const devZone = document.getElementById('devZone');
    if (settings.developerMode) {
        devZone.classList.add('active');
    }
}

// UI에서 현재 설정 수집
function getCurrentSettings() {
    const categoryCheckboxes = document.querySelectorAll('.category-grid input[type="checkbox"]');
    const categoryNames = Object.keys(DEFAULT_SETTINGS.categories);
    const categories = {};
    
    categoryCheckboxes.forEach((checkbox, index) => {
        if (categoryNames[index]) {
            categories[categoryNames[index]] = checkbox.checked;
        }
    });
    
    return {
        autoInject: document.getElementById('autoInject').checked,
        notifications: document.getElementById('notifications').checked,
        debugMode: document.getElementById('debugMode').checked,
        language: document.querySelector('.select-box').value,
        categories: categories,
        developerMode: document.getElementById('devModeToggle').checked,
        skipAdvancedWarning: false // Save 버튼으로는 변경 안 됨 (confirm 버튼에서만 변경)
    };
}

// === UI INTERACTION SCRIPT ===

// 1. Categories Dropdown Logic
const catTrigger = document.getElementById('catTrigger');
const catContent = document.getElementById('catContent');

if (catTrigger && catContent) {
    catTrigger.addEventListener('click', () => {
        catTrigger.classList.toggle('active');
        catContent.classList.toggle('show');
    });
}

// 2. Developer Mode Logic
const devToggle = document.getElementById('devModeToggle');
const devZone = document.getElementById('devZone');

if (devToggle && devZone) {
    devToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            devZone.classList.add('active');
            setTimeout(() => {
                document.querySelector('.scroll-area').scrollTop = document.querySelector('.scroll-area').scrollHeight;
            }, 100);
        } else {
            devZone.classList.remove('active');
        }
    });
}

// 3. Save Button Effect & Message
const saveBtn = document.getElementById('saveBtn');
if (saveBtn) {
    saveBtn.addEventListener('click', async function() {
        const msgBox = document.getElementById('saveStatusMessage');
        
        try {
            const currentSettings = getCurrentSettings();
            // skipAdvancedWarning은 현재 설정 유지
            const savedSettings = await loadSettings();
            currentSettings.skipAdvancedWarning = savedSettings.skipAdvancedWarning;
            
            await saveSettings(currentSettings);
            
            msgBox.style.display = 'none';

            setTimeout(() => {
                msgBox.style.display = 'block';
                
                setTimeout(() => {
                    msgBox.style.display = 'none';
                }, 3000);
            }, 300);
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Error saving settings: ' + error.message);
        }
    });
}

// 3-1. Reset Settings Button
const resetSettingsBtn = document.getElementById('resetSettingsBtn');
if (resetSettingsBtn) {
    resetSettingsBtn.addEventListener('click', async function() {
        
        try {
            // 기본 설정으로 저장
            await saveSettings(DEFAULT_SETTINGS);
                
            // UI에 기본 설정 적용
            await applySettingsToUI(DEFAULT_SETTINGS);
                
            // Developer Zone 숨기기
            const devZone = document.getElementById('devZone');
            devZone.classList.remove('active');
                
            // Warning 박스도 숨기기
            hideWarning();
                
        
        } catch (error) {
            console.error('Error resetting settings:', error);
            alert('Error resetting settings: ' + error.message);
        }
        
    });
}

// 4. Footer Buttons Logic
const openWorkspaceBtn = document.getElementById('openWorkspaceBtn');
if (openWorkspaceBtn) {
    openWorkspaceBtn.addEventListener('click', () => {
        window.open('https://playentry.org/ws', '_blank');
    });
}

// 4-1. Quick Actions - Inject Now Button
const injectNowBtn = document.getElementById('injectNow');
if (injectNowBtn) {
    injectNowBtn.addEventListener('click', async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            if (!tab || !tab.url.includes('playentry.org')) {
                return;
            }
            
            // Execute injection directly
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => {
                    if (window.entryProHandler && !window.entryProHandler.injected) {
                        window.entryProHandler.waitForEntryRender(() => {
                            window.entryProHandler.injectEntryPro();
                        });
                    }
                }
            });
            
        } catch (error) {
            console.error('Inject error:', error);
        }
    });
}

// 4-2. Quick Actions - Remove Script Button
const removeScriptBtn = document.getElementById('removeScript');
if (removeScriptBtn) {
    removeScriptBtn.addEventListener('click', async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            if (!tab || !tab.url.includes('playentry.org')) {
                return;
            }
            
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                world: 'MAIN',
                func: () => {
                    console.log('[Entry Pro] Removing API category...');
                    
                    // 전역 변수 설정 (다음 inject 방지)
                    window.entryProRemoved = true;
                    
                    // API 카테고리를 제외한 카테고리 뷰 재생성
                    if (typeof Entry !== 'undefined' && Entry.playground && Entry.playground.blockMenu) {
                        
                        Entry.playground.blockMenu.banCategory('API')
                        
                        console.log('[Entry Pro] API category removed without reload');
                    }
                    
                    // inject 스크립트 태그 제거
                    const script = document.getElementById('entry-pro-inject-script');
                    if (script) {
                        script.remove();
                    }
                    
                    if (window.entryProHandler) {
                        window.entryProHandler.injected = false;
                    }
                }
            });
            
        } catch (error) {
            console.error('Remove error:', error);
        }
    });
}

// === 5. ADVANCED TOOLS LOGIC ===
let countdownTimer = null;
let currentAction = null;

// Warning 박스 표시 함수
async function showWarning(action) {
    // 설정 확인: 경고 건너뛰기가 활성화되어 있으면 바로 실행
    const settings = await loadSettings();
    if (settings.skipAdvancedWarning) {
        executeAction(action);
        return;
    }
    
    currentAction = action;
    const warningBox = document.getElementById('warningBox');
    const actionGrid = document.getElementById('actionGrid');
    const confirmBtn = document.getElementById('warningConfirmBtn');
    const countdownText = document.getElementById('countdownText');
    
    // UI 전환
    actionGrid.style.display = 'none';
    warningBox.style.display = 'block';
    
    // 버튼 초기화
    confirmBtn.disabled = true;
    
    // 카운트다운 시작
    let countdown = 10;
    countdownText.textContent = `(${countdown}s) `;
    
    countdownTimer = setInterval(() => {
        countdown--;
        if (countdown > 0) {
            countdownText.textContent = `(${countdown}s) `;
        } else {
            countdownText.textContent = '';
            confirmBtn.disabled = false;
            clearInterval(countdownTimer);
        }
    }, 1000);
    
    // 스크롤을 Warning 박스로
    setTimeout(() => {
        document.querySelector('.scroll-area').scrollTop = document.querySelector('.scroll-area').scrollHeight;
    }, 100);
}

// Warning 취소 함수
function hideWarning() {
    const warningBox = document.getElementById('warningBox');
    const actionGrid = document.getElementById('actionGrid');
    
    // 타이머 정리
    if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
    }
    
    // UI 전환
    warningBox.style.display = 'none';
    actionGrid.style.display = 'grid';
    currentAction = null;
}

// 실제 기능 실행 함수
function executeAction(action) {
    hideWarning();
    
    switch(action) {
        case 'addBlocks':
            alert('Add Blocks feature - Coming soon!');
            // TODO: 블록 추가 기능 구현
            break;
        case 'addCategory':
            alert('Add Category feature - Coming soon!');
            // TODO: 카테고리 추가 기능 구현
            break;
        case 'delBlocks':
            alert('Delete Blocks feature - Coming soon!');
            // TODO: 블록 삭제 기능 구현
            break;
        case 'delCategory':
            alert('Delete Category feature - Coming soon!');
            // TODO: 카테고리 삭제 기능 구현
            break;
    }
}

// Advanced Tools 버튼 이벤트 리스너
const addBlocksBtn = document.getElementById('addBlocksBtn');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const delBlocksBtn = document.getElementById('delBlocksBtn');
const delCategoryBtn = document.getElementById('delCategoryBtn');
const warningBackBtn = document.getElementById('warningBackBtn');
const warningConfirmBtn = document.getElementById('warningConfirmBtn');

if (addBlocksBtn) {
    addBlocksBtn.addEventListener('click', () => showWarning('addBlocks'));
}

if (addCategoryBtn) {
    addCategoryBtn.addEventListener('click', () => showWarning('addCategory'));
}

if (delBlocksBtn) {
    delBlocksBtn.addEventListener('click', () => showWarning('delBlocks'));
}

if (delCategoryBtn) {
    delCategoryBtn.addEventListener('click', () => showWarning('delCategory'));
}

if (warningBackBtn) {
    warningBackBtn.addEventListener('click', hideWarning);
}

if (warningConfirmBtn) {
    warningConfirmBtn.addEventListener('click', async () => {
        if (!warningConfirmBtn.disabled && currentAction) {
            // skipAdvancedWarning을 true로 설정하고 저장
            const settings = await loadSettings();
            settings.skipAdvancedWarning = true;
            await saveSettings(settings);
            
            executeAction(currentAction);
        }
    });
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', async () => {
    const settings = await loadSettings();
    await applySettingsToUI(settings);
});