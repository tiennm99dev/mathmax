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
npm run size-report   # Kích thước gzip JS của từng bài (sau build)
npm run stubs         # Đếm bài chưa soạn theo lớp, chương
npm run preview       # Serve build/
```

`npm run stubs -- lop-6/<chương>` chỉ đếm một chương và liệt kê bài còn trống; `--strict` trả mã 1 khi phạm vi đó còn bài chưa soạn.

## Deploy

CI (`.github/workflows/ci.yml`) chạy lint, format:check, check, test, build và size-report cho mỗi push/PR; deploy chạy lại toàn bộ các bước đó trước khi lên GitHub Pages từ `main`. Cấu hình và phiên bản action nằm trong `.github/workflows/deploy.yml`; xem `RUNBOOK.md` để rollback / chuyển domain.

Live URL: https://tiennm99dev.github.io/mathmax/

## Architecture

- **Static**: SvelteKit + `@sveltejs/adapter-static`, cấu hình trong `vite.config.js`: `paths.base` là `/<tên package>` (`/mathmax`; đổi bằng `SITE_BASE`), output `build/`, `static/404.html` cho GitHub Pages.
- **CSP**: chế độ `hash` — mỗi trang prerender có thẻ meta CSP với hash của script inline; `style-src` cho phép `'unsafe-inline'` vì Svelte và KaTeX ghi style inline.
- **Styling**: Tailwind 4 (PostCSS qua `@tailwindcss/postcss`) + Be Vietnam Pro (woff2 qua `@fontsource`). `src/app.css` nạp Tailwind bằng `@import 'tailwindcss/index.css'`; tick palette `colors.pair.{1,2,3,4}` vẫn khai báo trong `tailwind.config.js` và được nạp qua `@config`.
- **Language**: JavaScript only (Svelte 5, JSDoc qua `jsconfig.json` với `checkJs: true`).
- **Math engines**: `src/lib/geom-engine/` (vec, triangle, circle, ticks, transforms), `src/lib/numtheory-engine/` (gcd, lcm, gcdSteps, sieve), `src/lib/algebra-engine/` (linear, system), `src/lib/fraction-engine/` (phân số, hỗn số), `src/lib/stats-engine/` (số đặc trưng, tần số, xác suất, chia trục), `src/lib/units-engine/` (đổi đơn vị, tiền VND, đồng hồ). Định dạng số kiểu Việt (dấu phẩy thập phân) ở `src/lib/core/number-format.js`. Module thuần, không phụ thuộc DOM. Vitest unit tests đi kèm.
- **Visuals**: `src/lib/core/visuals/` — hình SVG dùng chung cho bài học (mặt phẳng toạ độ, bảng hình học, tia số, băng phân số, lưới diện tích, biểu đồ cột / quạt tròn / đoạn thẳng, bảng thống kê, vòng quay xác suất, đổi đơn vị, đồng hồ, khối cơ số 10, khay đếm). Props được mô tả bằng JSDoc ở đầu mỗi file. Hình cho bé (trái cây, con vật, tiền, khối) nằm ở `src/lib/core/kid/pictures/`. Trang ẩn `/_gallery/` (noindex) hiển thị mọi hình để rà soát.
- **Math typography**: `src/lib/components/tex.svelte` — wrapper KaTeX duy nhất. SSR qua `renderToString`, không cần JS phía client để hiển thị.
- **Lessons**: các route động trong `src/routes/` sinh mọi trang từ `src/lib/curriculum/lop-N.json` qua `entries()`; nội dung bài nằm ở `src/lib/lessons/lop-N/<chương>/<bài>/content.vi.js`, TeX được render sẵn trong `+page.server.js`.
- **Drag**: Svelte action `use:draggable` (`src/lib/actions/draggable.svelte.js`) — Pointer Events + bàn phím mũi tên cho a11y; `onEnd` để thả/hút điểm, `onKeyMove` cho điều khiển đi theo bước (góc, số đếm). Mỗi tay kéo có vùng chạm vô hình tối thiểu 44 px.
- **Luyện tập**: `src/lib/core/drill-board.svelte` + `drill.js` — bộ đề sinh ngẫu nhiên theo kĩ năng, có thang gợi ý và lần thử thứ hai trước khi hiện lời giải. `src/lib/core/card-sorter.svelte` — xếp thẻ vào nhóm, kiểm tra từng lần đặt.
- **i18n**: Hiện chỉ có tiếng Việt. Site chrome ở `src/lib/i18n/site.vi.js`. English thêm sau bằng cách tạo `*.en.js` song song.

## Adding a lesson

Phần này là hợp đồng của một bài học: thư mục, schema nội dung, số lượng tối thiểu và các bước kiểm tra. `src/lib/core/content-schema.js` kiểm tra nó bằng code; khi hai bên lệch nhau, sửa cả hai trong cùng một commit. Agent soạn bài theo brief ở `.claude/skills/write-lesson/SKILL.md`.

### Thư mục của một chương

Người soạn một chương chỉ thêm file trong `src/lib/lessons/lop-N/<chương>/`. Không cần sửa registry, route, i18n hay trang hub: trang bài, hub và trạng thái "Sắp ra mắt" đều sinh ra từ `src/lib/curriculum/lop-N.json` và từ việc file `content.vi.js` có tồn tại hay không.

```
src/lib/lessons/lop-N/<chương>/
  <bài>/
    content.vi.js        bắt buộc: export default nội dung bài (chỉ dữ liệu)
    widget.svelte        tương tác chính; bắt buộc với bài lý thuyết
    <tên>.widget.svelte  widget phụ, gọi từ block { type: 'widget', name: '<tên>' }
    engine.js            logic thuần (không DOM), kèm engine.test.js
    *.svelte.js          trạng thái tương tác dùng rune, kèm *.test.js
  _shared/               helper dùng chung cho nhiều bài trong chương
```

- Slug chương và bài lấy nguyên từ `lop-N.json`; mỗi bài trong JSON có `kind`, `keyIdeas` và `interactiveIdea` để định hướng nội dung.
- Không sửa `src/lib/core/`, `src/lib/curriculum/`, `src/routes/`, `src/params/`, script hay config. Helper cần cho nhiều chương được viết ở `_shared/` trước, rồi đưa lên core trong một lượt riêng.
- Ở các site anh em, thành phần riêng của môn nằm ở `src/lib/domain/`; mỗi file mô tả props bằng JSDoc ở đầu. Mỗi thành phần có một bản demo `<tên>.gallery.svelte` cùng thư mục (xuất `title` trong `<script module>`), được `/_gallery/` tự liệt kê.

### Nội dung (`content.vi.js`)

```js
/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary: 'Một câu, văn bản thường, cho thẻ meta description.',
  intro: 'Rich text: TeX inline $a^2$, display $$a^2+b^2=c^2$$, dấu đô la thật viết \\$.',
  objectives: ['Mục tiêu "Em sẽ học được"'],
  sections: [
    {
      heading: 'Tiêu đề mục',
      blocks: [
        { type: 'p', text: '…' },
        { type: 'tex', tex: '\\frac{a}{b}' },
        { type: 'list', items: ['…'], ordered: false },
        { type: 'callout', tone: 'definition', title: 'Định nghĩa', text: '…' },
        { type: 'table', head: ['x', 'y'], rows: [['1', '2']], caption: '…' },
        { type: 'widget', name: 'balance' },
      ],
    },
  ],
  explore: { title: '…', instruction: '…' },
  examples: [{ problem: '…', steps: ['…', '…'], answer: '…' }],
  practice: [{ type: 'number', prompt: '…', answer: 3.5, unit: 'cm', hints: ['…'], solution: '…' }],
  takeaways: ['…'],
};
```

- Mọi trường văn bản là rich text trừ `summary` (không TeX) và `tex` (mã TeX, không có dấu `$`). Dấu `$` phải đóng đủ. TeX được render sẵn lúc prerender, nên trình duyệt không tải KaTeX cho nội dung.
- `tone` của callout: `definition`, `theorem`, `note`, `warning`. `sections[i].project: true` đánh dấu đề bài dự án của bài hoạt động hay chuyên đề.
- `explore` có khi và chỉ khi có `widget.svelte`; nó là khung tiêu đề và hướng dẫn quanh widget. Mỗi block `widget` cần file `<tên>.widget.svelte` cùng thư mục.
- `examples` hiện bằng trình chiếu từng bước; `practice` là bài tập tự chấm. Trường lạ bị báo lỗi.

Bài tập (`practice`) đều có `prompt`, `hints` (ít nhất một, mở dần từng gợi ý) và `solution`; đáp án là dữ liệu, không phải code:

| `type`     | Trường                                     | Cách chấm                                                  |
| ---------- | ------------------------------------------ | ---------------------------------------------------------- |
| `number`   | `answer`, `tolerance?`, `unit?`            | nhận `3,5` và `3.5`; đơn vị nếu có                         |
| `fraction` | `answer: [p, q]`, `simplest?`              | bằng giá trị; `simplest` đòi phân số tối giản              |
| `choice`   | `options`, `answer` (chỉ số)               | một lựa chọn                                               |
| `multi`    | `options`, `answers` (các chỉ số)          | đúng đủ tập lựa chọn                                       |
| `text`     | `accept: string[]`                         | bỏ khoảng trắng hai đầu, không phân biệt hoa thường và dấu |
| `order`    | `items`, `answer` (thứ tự đúng các chỉ số) | kéo sắp xếp                                                |
| `match`    | `left`, `right`, `pairs: [[trái, phải]]`   | nối cặp                                                    |
| `count`    | `picture`, `answer`, `choices?`            | bé đếm hình rồi chạm thẻ số                                |

`picture` là tên một hình trong `src/lib/core/kid/pictures/index.js`.

### Số lượng tối thiểu

`src/lib/core/content.test.js` kiểm tra mọi bài đã soạn theo `kind` trong curriculum:

| `kind`                  | Tối thiểu                                          |
| ----------------------- | -------------------------------------------------- |
| `theory`                | 2 mục, 2 ví dụ, 5 bài tập và `widget.svelte`       |
| `practice`, `review`    | 8 bài tập; widget không bắt buộc                   |
| `activity`, `chuyen-de` | 1 mục nội dung, 1 mục `project: true` và 3 bài tập |

Lớp 1-5 dùng giao diện cho bé (`kid-lesson-page.svelte`, tự chọn theo lớp): `intro` tối đa 300 ký tự, nút chạm lớn, widget trước chữ, mỗi thẻ một ý và nút "Nghe" đọc to. Bài tập cho bé nên dùng `count`, `choice`, `match` và `order`.

### Widget

- Svelte 5 runes, JavaScript với JSDoc (`checkJs` strict); widget không nhận props. Import qua `#lib/...`.
- Dùng hình dựng sẵn ở `src/lib/core/visuals/` (props mô tả ở đầu mỗi file; xem tất cả ở trang ẩn `/_gallery/`), `segmented-control`, `slider-field`, `ui.js`, `use:draggable` và các engine `src/lib/*-engine/`.
- Mọi điều khiển dùng được bằng con trỏ và bàn phím, có nhãn tiếng Việt cho trình đọc màn hình, vừa màn hình 390 px.
- Chỉ import `#lib/components/tex.svelte` khi widget cần TeX thay đổi theo thao tác; KaTeX nằm ở chunk riêng.
- JS của một bài nên dưới 30 KB gzip; `npm run size-report` báo lỗi khi một chunk của bài vượt 60 KB.
- Logic không tầm thường nằm trong `engine.js` hoặc `*.svelte.js` có test Node; dự án không có jsdom.

### Kiểm tra trước khi merge

Chạy từ gốc repo, sau khi soạn xong một chương:

```sh
npx vitest run src/lib/lessons/lop-N/<chương>   # test của chương, nhanh
npm run lint && npm run format:check && npm run check
npm test
npm run build && npm run size-report
npm run stubs -- lop-N/<chương>                 # phải báo 0 stubs
git diff --name-only main...HEAD                # chỉ đường dẫn trong thư mục chương
```

### Site anh em

`scripts/sync-core.sh <repo>` chép phần dùng chung (core, engine, route, param, script, config, workflow và skill soạn bài) sang một site anh em, ghi chú đầu mỗi file rằng file được đồng bộ, và ghi commit nguồn vào `CORE_VERSION`. Sửa phần dùng chung ở MathMax trước, rồi đồng bộ; site anh em không sửa các file đó.

## License

Apache-2.0. Xem `LICENSE`.
