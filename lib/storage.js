// Quản lý dữ liệu lưu trữ (Storage Management)
const StorageManager = {
  // Lấy toàn bộ rules
  getRules: async () => {
    return new Promise((resolve) => {
      chrome.storage.local.get(['cssRules'], (result) => {
        resolve(result.cssRules || {});
      });
    });
  },

  // Lưu toàn bộ rules
  saveRules: async (rules) => {
    return new Promise((resolve) => {
      chrome.storage.local.set({ cssRules: rules }, () => {
        resolve();
      });
    });
  },

  // Thêm hoặc cập nhật rule
  // rule: { url: 'example.com', css: '...', active: true }
  saveRule: async (url, css, active = true) => {
    const rules = await StorageManager.getRules();
    rules[url] = { url, css, active };
    await StorageManager.saveRules(rules);
  },

  // Xóa rule
  deleteRule: async (url) => {
    const rules = await StorageManager.getRules();
    delete rules[url];
    await StorageManager.saveRules(rules);
  },
  
  // Kích hoạt / Hủy kích hoạt rule
  toggleRule: async (url, active) => {
    const rules = await StorageManager.getRules();
    if (rules[url]) {
      rules[url].active = active;
      await StorageManager.saveRules(rules);
    }
  }
};
