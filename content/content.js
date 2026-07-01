// File này chạy trên mọi trang web để chèn CSS

// Hàm chèn hoặc cập nhật thẻ <style>
function applyCSS(url, rules) {
  let styleTag = document.getElementById('css-injector-style');
  
  // Tìm domain hiện tại có khớp với rule nào không
  // Chuyển URL hiện hành thành host để so sánh đơn giản
  const currentHost = window.location.hostname;
  
  // Tìm các rule áp dụng cho trang này
  // Bạn có thể tùy chỉnh logic match (ví dụ: contains, exact, v.v.)
  // Ở đây dùng chuỗi URL do người dùng nhập (ví dụ "example.com") để kiểm tra xem host có chứa nó không
  let cssToInject = '';
  for (const [ruleUrl, ruleData] of Object.entries(rules)) {
    if (ruleData.active && currentHost.includes(ruleUrl)) {
      cssToInject += `\n/* Inject từ rule: ${ruleUrl} */\n${ruleData.css}\n`;
    }
  }

  if (cssToInject) {
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'css-injector-style';
      // Chèn vào đầu thẻ html (chạy rất sớm, document_start)
      document.documentElement.appendChild(styleTag);
    }
    styleTag.textContent = cssToInject;
  } else {
    // Nếu không có css nào, gỡ thẻ <style> nếu đã tồn tại
    if (styleTag) {
      styleTag.remove();
    }
  }
}

// Khởi chạy khi load trang
async function init() {
  const rules = await StorageManager.getRules();
  applyCSS(window.location.hostname, rules);
}

// Lắng nghe thay đổi từ storage để cập nhật CSS ngay lập tức (khi người dùng đổi từ popup)
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'local' && changes.cssRules) {
    applyCSS(window.location.hostname, changes.cssRules.newValue || {});
  }
});

// Chạy khởi tạo
init();
