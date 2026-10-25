# MathMax

Toán tương tác cho học sinh Việt Nam lớp 1-12, theo chương trình Kết nối tri thức với cuộc sống (KNTT). Số học, Đại số, Hình học qua kéo-thả và minh hoạ trực quan.

## Status

9 bài đã ra mắt — số học, đại số, hình học đều có ít nhất hai bài.

- Lớp 6 — Ước chung lớn nhất (Euclid): `/so-hoc/uoc-chung-lon-nhat/`
- Lớp 6 — Sàng Eratosthenes: `/so-hoc/sang-eratosthenes/`
- Lớp 7 — Hiệu hai bình phương: `/dai-so/hieu-hai-binh-phuong/`
- Lớp 7 — Đồ thị y = ax + b: `/dai-so/duong-thang/`
- Lớp 7 — Định lý Pythagoras: `/hinh-hoc/dinh-ly-pythagoras/`
- Lớp 7 — Tam giác bằng nhau (SSS): `/hinh-hoc/tam-giac-bang-nhau/`
- Lớp 8 — Tam giác đồng dạng: `/hinh-hoc/tam-giac-dong-dang/`
- Lớp 9 — Hệ phương trình bậc nhất hai ẩn: `/dai-so/he-phuong-trinh-bac-nhat/`
- Lớp 9 — Góc nội tiếp: `/hinh-hoc/goc-noi-tiep/`

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
- **Lessons**: mỗi bài là một `+page.svelte`; copy tiếng Việt colocate trong `src/lib/lessons/<slug>/copy.vi.js`.
- **Drag**: Svelte action `use:draggable` (`src/lib/actions/draggable.svelte.js`) — Pointer Events + bàn phím mũi tên cho a11y.
- **i18n**: Hiện chỉ có tiếng Việt. Site chrome ở `src/lib/i18n/site.vi.js`. English thêm sau bằng cách tạo `*.en.js` song song.

## License

Apache-2.0. Xem `LICENSE`.
