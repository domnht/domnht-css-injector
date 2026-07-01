document.addEventListener('DOMContentLoaded', async () => {
  const rulesList = document.getElementById('rules-list');
  const ruleCount = document.getElementById('rule-count');
  
  // Các nút chính
  const btnAdd = document.getElementById('btn-add');
  const btnImport = document.getElementById('btn-import');
  const btnExport = document.getElementById('btn-export');
  const fileImport = document.getElementById('file-import');
  
  let currentEditUrl = null;

  // Hiển thị danh sách rules
  async function renderRules() {
    const rules = await StorageManager.getRules();
    rulesList.innerHTML = '';
    
    const ruleKeys = Object.keys(rules);
    ruleCount.textContent = `${ruleKeys.length} rule(s)`;
    
    if (ruleKeys.length === 0) {
      rulesList.innerHTML = '<div style="padding: 16px; text-align: center; color: #525252;">Chưa có rule nào. Hãy thêm trang mới.</div>';
      return;
    }

    ruleKeys.forEach(url => {
      const rule = rules[url];
      
      const item = document.createElement('div');
      item.className = 'rule-item';
      
      item.innerHTML = `
        <div class="rule-info">
          <span class="rule-url" title="${url}">${url}</span>
          <span class="rule-css-preview">${rule.css}</span>
        </div>
        <div class="rule-toggle">
          <label class="switch">
            <input type="checkbox" class="toggle-active" data-url="${url}" ${rule.active ? 'checked' : ''}>
            <span class="slider"></span>
          </label>
        </div>
        <div class="rule-actions">
          <button class="btn btn-sm btn-secondary btn-edit" data-url="${url}">Sửa</button>
          <button class="btn btn-sm btn-danger btn-delete" data-url="${url}">Xóa</button>
        </div>
      `;
      rulesList.appendChild(item);
    });
    
    attachEventListeners();
  }
  
  function attachEventListeners() {
    // Toggle active state
    document.querySelectorAll('.toggle-active').forEach(checkbox => {
      checkbox.addEventListener('change', async (e) => {
        const url = e.target.getAttribute('data-url');
        const isActive = e.target.checked;
        await StorageManager.toggleRule(url, isActive);
      });
    });

    // Delete rule
    document.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const url = e.target.getAttribute('data-url');
        if (confirm(`Bạn có chắc muốn xóa rule cho ${url}?`)) {
          await StorageManager.deleteRule(url);
          renderRules();
        }
      });
    });

    // Edit rule
    document.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        const url = e.target.getAttribute('data-url');
        const editPageUrl = chrome.runtime.getURL('popup/edit.html?url=' + encodeURIComponent(url));
        chrome.tabs.create({ url: editPageUrl });
      });
    });
  }

  // Mở tab thêm mới
  btnAdd.addEventListener('click', () => {
    // Tự động lấy URL của tab hiện hành để truyền sang tab edit
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      let addUrl = '';
      if (tabs && tabs.length > 0) {
        try {
          const url = new URL(tabs[0].url);
          // Bỏ 'www.' để rule áp dụng rộng hơn nếu muốn
          addUrl = url.hostname.replace(/^www\./, '');
        } catch (e) {
          // Lỗi parse URL (ví dụ trang chrome://) thì bỏ qua
        }
      }
      
      const editPageUrl = chrome.runtime.getURL('popup/edit.html' + (addUrl ? '?addTabUrl=' + encodeURIComponent(addUrl) : ''));
      chrome.tabs.create({ url: editPageUrl });
    });
  });

  // Export JSON
  btnExport.addEventListener('click', async () => {
    const rules = await StorageManager.getRules();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(rules, null, 2));
    
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "css_injector_rules.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  });

  // Import JSON trigger
  btnImport.addEventListener('click', () => {
    fileImport.click();
  });

  // Xử lý đọc file import
  fileImport.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const importedRules = JSON.parse(event.target.result);
        if (typeof importedRules === 'object') {
          // Gộp các rules cũ với rules mới import
          const currentRules = await StorageManager.getRules();
          const mergedRules = { ...currentRules, ...importedRules };
          await StorageManager.saveRules(mergedRules);
          renderRules();
          alert('Import thành công!');
        }
      } catch (err) {
        alert('File JSON không hợp lệ.');
      }
    };
    reader.readAsText(file);
    // Reset lại value để có thể import lại cùng 1 file nếu cần
    e.target.value = '';
  });

  // Render lần đầu
  renderRules();
});
