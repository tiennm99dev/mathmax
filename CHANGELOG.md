# Changelog

All notable changes to **MathMax** are documented here. Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versioning: 4-digit MAJOR.MINOR.PATCH.MICRO.

## [Unreleased]

### Fixed

- Tailwind không sinh ra CSS: dự án cài Tailwind 4 nhưng `src/app.css` vẫn dùng chỉ thị `@tailwind` của v3, nên trang xuất bản gần như không có style. Nay nạp bằng `@import 'tailwindcss/index.css'` + `@config`.
- Sàng Eratosthenes: bấm vào số nguyên tố lớn hơn 50 làm khoá lưới vĩnh viễn (cờ `rippling` không bao giờ được gỡ khi không còn bội số nào để xoá).
- Định lý Pythagoras: hoạt ảnh nội suy thẳng từng đỉnh nên không bảo toàn diện tích (co còn ~11% ở giữa chừng), và hình vuông trên cạnh huyền nằm tràn ra ngoài khung vẽ. Nay morph bằng chuỗi phép trượt + phép quay (định thức 1) dựa trên `geom-engine/transforms.js`, và khung vẽ mở rộng để mọi hình luôn nằm trong tầm nhìn.
- Góc nội tiếp: bài đọc hiển thị góc ở tâm không dấu nên mâu thuẫn với chính định lý khi M nằm trên cung nhỏ. Nay hiển thị số đo cung bị chắn, đúng với mọi vị trí của M.

### Added

- Lớp 9 — Hệ phương trình bậc nhất hai ẩn (`/dai-so/he-phuong-trinh-bac-nhat/`): hai đường thẳng dạng `ax + by = c`, kéo để tịnh tiến, ba nút xem nhanh trường hợp cắt nhau / song song / trùng nhau.
- `subtendedArc` / `angleOnCircle` trong `geom-engine/circle.js`; `morphSquareA` / `morphSquareB` trong bài Pythagoras; test hồi quy cho cả ba lỗi trên.
- Vitest nạp được module rune `*.svelte.js` (thêm plugin Svelte + alias `$lib`), nhờ đó logic tương tác mới có thể kiểm thử.
- `src/lib/algebra-engine/system.js`: `solveSystem` (nghiệm duy nhất / vô nghiệm / vô số nghiệm), `clipToBox`, `constantThrough`, `isDegenerate` — kèm 17 unit test.

## [0.0.1.0] - 2026-04-30

### Added

- Initial SvelteKit + Tailwind scaffold (JS only, `paths.base = '/mathmax'`, `@sveltejs/adapter-static`).
- Vietnamese landing page: hero, scope chips (lớp 6-9), three topic cards (Số học / Đại số / Hình học) all "Sắp ra mắt".
- Apache-2.0 LICENSE, README, RUNBOOK.
- GitHub Actions: CI (build) on PR, deploy to GitHub Pages on `main`.
- Public repo `github.com/tiennm99/mathmax` w/ topics + Pages enabled (workflow build_type).
