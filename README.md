# MathMax

Toán tương tác cho học sinh Việt Nam lớp 1-12, theo chương trình Kết nối tri thức với cuộc sống (KNTT). Số học, Đại số, Hình học qua kéo-thả và minh hoạ trực quan.

## Status

Mọi bài trong sách KNTT lớp 1-12 đều có trang; bài chưa soạn hiện dạng "Sắp ra mắt" (noindex).

- `/` chọn lớp; `/lop-N/` các chương theo tập; `/lop-N/<chương>/` các bài; `/lop-N/<chương>/<bài>/` bài học.
- `/so-hoc/`, `/dai-so/`, `/hinh-hoc/`, ... gom chương của một mạch kiến thức qua mọi lớp.
- Chín URL bài cũ (`/so-hoc/uoc-chung-lon-nhat/`, ...) chuyển hướng bằng meta refresh tới bài mới; bảng ở `src/lib/curriculum/legacy-redirects.js`.

## Develop

Yêu cầu: Node 24+, npm.

```sh
npm install
npm run dev           # http://localhost:5173/mathmax/
npm run lint          # ESLint (eslint-plugin-svelte)
npm run format:check  # Prettier --check
npm run check         # svelte-kit sync + svelte-check --fail-on-warnings (JSDoc strict)
npm test              # Vitest
npm run build         # Static output → build/
npm run preview       # Serve build/
```

## Deploy

CI (`.github/workflows/ci.yml`) chạy lint, format:check, check, test và build cho mỗi push/PR; deploy chạy lại toàn bộ các bước đó trước khi lên GitHub Pages từ `main`. Cấu hình và phiên bản action nằm trong `.github/workflows/deploy.yml`; xem `RUNBOOK.md` để rollback / chuyển domain.

Live URL: https://tiennm99dev.github.io/mathmax/

## Architecture

- **Static**: SvelteKit + `@sveltejs/adapter-static`, cấu hình trong `vite.config.js`: `paths.base = '/mathmax'` (đổi bằng `SITE_BASE`), output `build/`, `static/404.html` cho GitHub Pages.
- **CSP**: chế độ `hash` — mỗi trang prerender có thẻ meta CSP với hash của script inline; `style-src` cho phép `'unsafe-inline'` vì Svelte và KaTeX ghi style inline.
- **Styling**: Tailwind 4 (PostCSS qua `@tailwindcss/postcss`) + Be Vietnam Pro (woff2 qua `@fontsource`). `src/app.css` nạp Tailwind bằng `@import 'tailwindcss/index.css'`; tick palette `colors.pair.{1,2,3,4}` vẫn khai báo trong `tailwind.config.js` và được nạp qua `@config`.
- **Language**: JavaScript only (Svelte 5, JSDoc qua `jsconfig.json` với `checkJs: true`).
- **Math engines**: `src/lib/geom-engine/` (vec, triangle, circle, ticks, transforms), `src/lib/numtheory-engine/` (gcd, lcm, gcdSteps, sieve), `src/lib/algebra-engine/` (linear, system). Module thuần, không phụ thuộc DOM. Vitest unit tests đi kèm.
- **Math typography**: `src/lib/components/tex.svelte` — wrapper KaTeX duy nhất. SSR qua `renderToString`, không cần JS phía client để hiển thị.
- **Lessons**: các route động trong `src/routes/` sinh mọi trang từ `src/lib/curriculum/lop-N.json` qua `entries()`; nội dung bài nằm ở `src/lib/lessons/lop-N/<chương>/<bài>/content.vi.js`, TeX được render sẵn trong `+page.server.js`.
- **Drag**: Svelte action `use:draggable` (`src/lib/actions/draggable.svelte.js`) — Pointer Events + bàn phím mũi tên cho a11y.
- **i18n**: Hiện chỉ có tiếng Việt. Site chrome ở `src/lib/i18n/site.vi.js`. English thêm sau bằng cách tạo `*.en.js` song song.

## License

Apache-2.0. Xem `LICENSE`.
