# CSS Injector - Chrome Extension

CSS Injector là một tiện ích mở rộng (Chrome Extension) mạnh mẽ và nhẹ nhàng, cho phép bạn tiêm (inject) các đoạn mã CSS tùy chỉnh vào bất kỳ trang web nào. Với giao diện tối giản theo chuẩn **IBM Carbon Design System**, việc cá nhân hóa giao diện website chưa bao giờ dễ dàng và chuyên nghiệp đến thế.

## ✨ Tính năng nổi bật

- 🎨 **Tùy biến giao diện linh hoạt**: Áp dụng mã CSS riêng biệt cho từng trang web cụ thể (ví dụ: đổi font chữ, thay màu nền, ẩn phần tử quảng cáo...).
- ⚡ **Áp dụng tức thì**: CSS được áp dụng ngay khi trang web tải xong và cập nhật theo thời gian thực mỗi khi bạn thay đổi rule mà không cần tải lại trang (reload).
- 💎 **Giao diện IBM Carbon System**: Trải nghiệm quản lý sang trọng, gọn gàng với bộ thiết kế tiêu chuẩn Carbon của IBM (Màu sắc độ tương phản cao, nút bấm vuông vức, font chữ IBM Plex).
- 📦 **Nhập/Xuất (Import/Export) cấu hình**: Dễ dàng sao lưu toàn bộ các quy tắc (rules) CSS ra file `.json` hoặc chuyển sang máy tính khác chỉ với 1 click.
- 📐 **Màn hình Code độc lập**: Thay vì sửa code gò bó trong popup nhỏ hẹp, extension cung cấp một Tab mở rộng (`edit.html`) rộng rãi với bộ gõ code chuyên dụng.
- 🔍 **Tự động bắt URL**: Tự động điền tên miền của trang web bạn đang xem khi thêm rule mới.

## 🚀 Hướng dẫn cài đặt

Vì đây là tiện ích cục bộ (chưa đưa lên Chrome Web Store), bạn cần cài đặt thông qua chế độ Nhà phát triển (Developer Mode):

1. Tải toàn bộ mã nguồn về máy tính.
2. Mở trình duyệt Chrome và truy cập vào đường dẫn: `chrome://extensions/`
3. Nhìn sang góc phải màn hình, bật công tắc **Chế độ dành cho nhà phát triển** (Developer mode).
4. Nhấn vào nút **Tải tiện ích đã giải nén** (Load unpacked) xuất hiện ở góc trái.
5. Chọn thư mục `css-injector-extension` chứa mã nguồn.
6. Extension đã sẵn sàng! Bạn có thể "ghim" (pin) biểu tượng của extension lên thanh công cụ để dễ dàng sử dụng.

## 💡 Hướng dẫn sử dụng

1. **Thêm quy tắc mới**:
   - Truy cập vào trang web bạn muốn thay đổi giao diện.
   - Bấm vào icon của CSS Injector trên thanh công cụ.
   - Chọn **"Thêm trang"**. Một tab mới sẽ mở ra với URL đã được điền sẵn.
   - Nhập mã CSS tùy chỉnh của bạn (Ví dụ: `body { background-color: #000 !important; color: #fff !important; }`).
   - Bấm **"Lưu thay đổi"**.

2. **Quản lý quy tắc**:
   - Tại màn hình popup chính, bạn có thể **Bật/Tắt** nhanh từng rule qua nút gạt (toggle).
   - Sử dụng các nút **Sửa** (để chỉnh lại code) và **Xóa** (để loại bỏ hoàn toàn).

3. **Sao lưu dữ liệu**:
   - Dùng nút **"Xuất"** để lưu toàn bộ cấu hình ra file `css_injector_rules.json`.
   - Dùng nút **"Nhập"** để khôi phục cấu hình từ file đã lưu.

## 📂 Cấu trúc thư mục

```text
css-injector-extension/
├── assets/             # Chứa icon và tài nguyên tĩnh
├── content/
│   └── content.js      # Script chạy ngầm trên web, làm nhiệm vụ chèn CSS
├── lib/
│   └── storage.js      # Module quản lý việc ghi/đọc dữ liệu từ chrome.storage
├── popup/
│   ├── popup.html      # Giao diện chính của popup
│   ├── popup.css       # File style chứa thư viện biến màu sắc của IBM Carbon
│   ├── popup.js        # Logic xử lý giao diện của popup
│   ├── edit.html       # Trang chỉnh sửa mở ở Tab độc lập
│   └── edit.js         # Logic xử lý cho trang chỉnh sửa
├── init.cmd            # File script tạo khung thư mục (Dùng lúc khởi tạo dự án)
└── manifest.json       # Tệp cấu hình trọng tâm của Chrome Extension (Manifest V3)
```
