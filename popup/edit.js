document.addEventListener('DOMContentLoaded', async () => {
  const pageTitle = document.getElementById('page-title');
  const inputUrl = document.getElementById('input-url');
  const inputCss = document.getElementById('input-css');
  const btnCancel = document.getElementById('btn-cancel');
  const btnSave = document.getElementById('btn-save');

  // Lấy params từ URL
  const urlParams = new URLSearchParams(window.location.search);
  const editUrl = urlParams.get('url');
  const addTabUrl = urlParams.get('addTabUrl');

  let isEditing = false;

  if (editUrl) {
    // Mode: Sửa rule đã có
    isEditing = true;
    pageTitle.textContent = 'Sửa rule CSS';
    inputUrl.value = editUrl;
    inputUrl.disabled = true; // Không cho đổi domain khi đang sửa
    
    const rules = await StorageManager.getRules();
    if (rules[editUrl]) {
      inputCss.value = rules[editUrl].css;
    }
  } else if (addTabUrl) {
    // Mode: Thêm rule mới và tự điền URL truyền từ popup
    inputUrl.value = addTabUrl;
  }

  // Đóng tab
  btnCancel.addEventListener('click', () => {
    window.close();
  });

  // Lưu
  btnSave.addEventListener('click', async () => {
    const url = inputUrl.value.trim();
    const css = inputCss.value.trim();
    
    if (!url) {
      alert('Vui lòng nhập URL hợp lệ.');
      return;
    }
    
    // Nếu đang sửa thì giữ nguyên trạng thái active, nếu mới thì mặc định active = true
    let active = true;
    if (isEditing) {
      const rules = await StorageManager.getRules();
      if (rules[url]) active = rules[url].active;
    }

    await StorageManager.saveRule(url, css, active);
    
    // Thông báo và tự đóng tab
    alert('Đã lưu thành công!');
    window.close();
  });
});
