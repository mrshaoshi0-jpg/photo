const i18n = {
  zh: {
    enterPattern: '輸入圖案密碼',
    setPattern: '設定圖案密碼',
    drawPattern: '請繪製解鎖圖案',
    confirmPattern: '請再次繪製確認',
    patternTooShort: '至少連接4個點',
    patternMismatch: '兩次圖案不一致，請重試',
    patternSet: '圖案密碼已設定',
    wrongPattern: '圖案錯誤，請重試',
    albums: '相簿',
    allPhotos: '所有照片',
    select: '選取',
    cancel: '取消',
    delete: '刪除',
    move: '移動',
    import: '匯入',
    newAlbum: '新增相簿',
    albumName: '相簿名稱',
    create: '建立',
    noMedia: '目前沒有照片或影片',
    selected: '個已選取',
    crop: '裁切',
    done: '完成',
    changePattern: '變更圖案密碼',
    lockNow: '立即鎖定',
    about: '關於',
    export: '匯出選取項目',
    exportEmpty: '請先選取要匯出的照片或影片',
    exportSuccess: '已開始匯出；請在分享選單或下載項目中查看',
    moveTo: '移動至相簿',
    successDelete: '已刪除',
    successMove: '已移動',
    successImport: '匯入成功',
    successCrop: '裁切完成',
    confirmDelete: '確定要刪除選取的項目嗎？',
    video: '影片',
    photos: '張照片',
    items: '個項目',
    back: '返回',
    language: '語言',
    aboutText: '離線相簿 · 九點圖案鎖 · 可加入主畫面',
  },
  en: {
    enterPattern: 'Enter Pattern',
    setPattern: 'Set Pattern Lock',
    drawPattern: 'Draw an unlock pattern',
    confirmPattern: 'Draw again to confirm',
    patternTooShort: 'Connect at least 4 dots',
    patternMismatch: 'Patterns do not match',
    patternSet: 'Pattern set successfully',
    wrongPattern: 'Wrong pattern, try again',
    albums: 'Albums',
    allPhotos: 'All Photos',
    select: 'Select',
    cancel: 'Cancel',
    delete: 'Delete',
    move: 'Move',
    import: 'Import',
    newAlbum: 'New Album',
    albumName: 'Album Name',
    create: 'Create',
    noMedia: 'No Photos or Videos',
    selected: 'selected',
    crop: 'Crop',
    done: 'Done',
    changePattern: 'Change Pattern',
    lockNow: 'Lock Now',
    about: 'About',
    export: 'Export Selected',
    exportEmpty: 'Select photos or videos to export first',
    exportSuccess: 'Export started. Check the share sheet or downloads.',
    moveTo: 'Move to Album',
    successDelete: 'Deleted',
    successMove: 'Moved',
    successImport: 'Imported',
    successCrop: 'Cropped',
    confirmDelete: 'Delete selected items?',
    video: 'Video',
    photos: 'photos',
    items: 'items',
    back: 'Back',
    language: 'Language',
    aboutText: 'Offline Photos · Pattern Lock · Add to Home Screen',
  }
};

let currentLang = localStorage.getItem('lang') || (navigator.language.startsWith('zh') ? 'zh' : 'en');

function t(key) {
  return i18n[currentLang][key] || i18n.en[key] || key;
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  updateUITexts();
}

function toggleLang() {
  setLang(currentLang === 'zh' ? 'en' : 'zh');
}

function updateUITexts() {
  // Will be called by app after DOM ready
  const map = {
    'lock-title': 'enterPattern',
    'setup-title': 'setPattern',
    'setup-hint': 'drawPattern',
    'header-title': 'albums',
    'btn-select': 'select',
    'empty-text': 'noMedia',
    'btn-import-empty': 'import',
    'new-album-title': 'newAlbum',
    'new-album-name': null, // placeholder
    'new-album-cancel': 'cancel',
    'new-album-create': 'create',
    'move-title': 'moveTo',
    'move-cancel': 'cancel',
    'btn-delete': 'delete',
    'btn-move': 'move',
    'viewer-crop': 'crop',
    'crop-cancel': 'cancel',
    'crop-done': 'done',
    'menu-lock': 'lockNow',
    'menu-export': 'export',
    'menu-change-pass': 'changePattern',
    'menu-about': 'about',
  };

  for (const [id, key] of Object.entries(map)) {
    const el = document.getElementById(id);
    if (!el || !key) continue;
    if (el.tagName === 'INPUT') {
      el.placeholder = t(key);
    } else {
      el.textContent = t(key);
    }
  }

  // Special
  const nameInput = document.getElementById('new-album-name');
  if (nameInput) nameInput.placeholder = t('albumName');

  const navLabels = document.querySelectorAll('.nav-label');
  if (navLabels[0]) navLabels[0].textContent = t('import');
  if (navLabels[1]) navLabels[1].textContent = t('albums');

  // Update selection count if visible
  if (window.app && window.app.updateSelectionUI) {
    window.app.updateSelectionUI();
  }
}
