### Công nghệ
- **Netlify:** https://futnituresho.netlify.app/
- **Xây dựng web app:** React, Typescript, Tailwind CSS, Shadcn UI
- **Thư viện và công cụ sử dụng:**
  - `@hookform/resolvers`: Tích hợp các thư viện validation với react-hook-form.
  - `@radix-ui`: Thành phần từ Radix UI.
  - `@shadcn-ui`: Thành phần từ Shadcn UI.
  - `class-variance-authority`: Công cụ quản lý các biến thể của lớp CSS.
  - `clsx`: Công cụ xây dựng các chuỗi className có điều kiện.
  - `cmdk`: Thư viện cho Command Menu.
  - `embla-carousel-autoplay`: Thư viện carousel với tính năng tự động chạy.
  - `embla-carousel-react`: Thư viện carousel cho React.
  - `framer-motion`: Thư viện cho các animation trong React.
  - `lucide-react`: Bộ icon cho React.
  - `react`: Thư viện React.
  - `react-dom`: Thư viện React DOM.
  - `react-hook-form`: Thư viện để quản lý form trong React.
  - `react-router-dom`: Thư viện để quản lý điều hướng (routing) trong React.
  - `tailwind-merge`: Công cụ hợp nhất các lớp Tailwind CSS.
  - `tailwindcss-animate`: Plugin Tailwind CSS cho các animation.
  - `zod`: Thư viện để schema validation.

### Cấu trúc dự án

- **Thư mục `src`:** Chứa mã nguồn chính

  - `assets/`: Chứa các tài nguyên như hình ảnh, file CSS, SCSS, v.v.
  - `components/`: Chứa các component tái sử dụng được trong nhiều nơi của ứng dụng.
  - `hooks/`: Chứa các custom hooks.
  - `layouts/`: Chứa các layout component.
  - `pages/`: Chứa các component đại diện cho các trang chính của ứng dụng.
  - `routes/`: Chứa định nghĩa các tuyến đường trong ứng dụng.
  - `services/`: Chứa các dịch vụ, thường là các hàm API gọi tới backend.
  - `stores/`: Chứa các trạng thái toàn cục, ví dụ như các store của Zustand hoặc Redux.
  - `utils/`: Chứa các hàm tiện ích, helper function dùng chung.
  - `lib/`: Chứa các thư viện hoặc module được sử dụng trong dự án.
  - `App.tsx`: Component gốc của ứng dụng.
  - `main.tsx`: File đầu vào của Vite, nơi khởi tạo React và render App.
  - `vite-env.d.ts`: Định nghĩa kiểu cho các biến môi trường Vite.

- `.gitignore`: Danh sách các file và thư mục Git nên bỏ qua.
- `package.json`: File cấu hình npm, chứa danh sách dependencies và scripts.
- `tsconfig.json`: File cấu hình TypeScript.
- `vite.config.ts`: File cấu hình Vite.
