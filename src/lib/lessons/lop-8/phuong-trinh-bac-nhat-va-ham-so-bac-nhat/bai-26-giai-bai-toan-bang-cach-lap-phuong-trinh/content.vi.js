/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ba bước giải bài toán bằng cách lập phương trình: chọn ẩn và đặt điều kiện, biểu diễn các đại lượng theo ẩn để lập phương trình, giải phương trình rồi kiểm tra nghiệm và trả lời.',
  intro:
    'Năm nay tuổi mẹ gấp $3$ lần tuổi con; $12$ năm nữa tuổi mẹ chỉ còn gấp $2$ lần tuổi con. Con bao nhiêu tuổi? Thay vì đoán thử, em gọi tuổi con là $x$, viết các điều đã biết thành một phương trình rồi giải nó. Bài này chỉ cho em cách làm đó với các bài toán về tuổi, chuyển động và năng suất.',
  objectives: [
    'Chọn ẩn và đặt điều kiện thích hợp cho ẩn.',
    'Biểu diễn các đại lượng chưa biết theo ẩn và lập phương trình.',
    'Giải phương trình, kiểm tra nghiệm với điều kiện của ẩn rồi trả lời.',
    'Giải các bài toán thực tế về tuổi, chuyển động, năng suất, hình học.',
  ],
  sections: [
    {
      heading: 'Các bước giải bài toán bằng cách lập phương trình',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ba bước',
          text: 'Bước 1. Lập phương trình: chọn ẩn số và đặt điều kiện thích hợp cho ẩn; biểu diễn các đại lượng chưa biết theo ẩn và các đại lượng đã biết; lập phương trình biểu thị mối quan hệ giữa các đại lượng. Bước 2. Giải phương trình. Bước 3. Trả lời: kiểm tra xem các nghiệm của phương trình có thoả mãn điều kiện của ẩn không, rồi kết luận.',
        },
        {
          type: 'table',
          head: ['Ẩn là', 'Điều kiện thường gặp'],
          rows: [
            [
              'Số người, số cây, số sản phẩm, số ngày làm việc',
              '$x \\in \\mathbb{N}$, $x > 0$ (số tự nhiên khác $0$)',
            ],
            ['Tuổi', '$x \\in \\mathbb{N}$, $x > 0$'],
            ['Quãng đường, vận tốc, thời gian, độ dài', '$x > 0$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Đừng bỏ qua bước kiểm tra: một nghiệm của phương trình có thể không thoả mãn điều kiện của ẩn (ví dụ số người là $12{,}5$ hay độ dài âm) và khi đó phải loại.',
        },
      ],
    },
    {
      heading: 'Bài toán chuyển động và năng suất',
      blocks: [
        {
          type: 'p',
          text: 'Với bài toán chuyển động, em dùng $s = v \\cdot t$ (quãng đường = vận tốc × thời gian). Với bài toán năng suất, tổng khối lượng công việc = năng suất (lượng làm trong một đơn vị thời gian) × thời gian. Kẻ bảng ba cột để biểu diễn các đại lượng theo ẩn giúp lập phương trình dễ hơn.',
        },
        {
          type: 'table',
          head: ['Phương tiện', 'Vận tốc (km/h)', 'Thời gian (h)', 'Quãng đường (km)'],
          rows: [
            ['Xe máy', '$40$', '$x$', '$40x$'],
            ['Ô tô', '$50$', '$x$', '$50x$'],
          ],
          caption:
            'Hai xe đi ngược chiều từ $A$ và $B$ ($AB = 180$ km) và gặp nhau: $40x + 50x = 180$.',
        },
        {
          type: 'p',
          text: 'Mối quan hệ dùng để lập phương trình thường là: tổng hai quãng đường bằng cả quãng đường (đi ngược chiều), hai quãng đường bằng nhau (đuổi kịp), tổng sản phẩm theo kế hoạch bằng tổng sản phẩm thực tế.',
        },
      ],
    },
  ],
  explore: {
    title: 'Sơ đồ đoạn thẳng cho bài toán',
    instruction:
      'Chọn một dạng bài toán. Kéo chấm đỏ ở cuối thanh trên (hoặc dùng phím mũi tên) để đổi giá trị của x: hai thanh là hai vế của phương trình. Tìm x để hai thanh dài bằng nhau, rồi xem lời giải.',
  },
  examples: [
    {
      problem:
        'Năm nay tuổi mẹ gấp $3$ lần tuổi con. Sau $12$ năm nữa, tuổi mẹ chỉ còn gấp $2$ lần tuổi con. Hỏi năm nay con bao nhiêu tuổi?',
      steps: [
        'Gọi tuổi con năm nay là $x$ (tuổi), $x \\in \\mathbb{N}$, $x > 0$. Tuổi mẹ năm nay là $3x$.',
        'Sau $12$ năm, tuổi con là $x + 12$, tuổi mẹ là $3x + 12$. Ta có phương trình $3x + 12 = 2(x + 12)$.',
        'Giải: $3x + 12 = 2x + 24 \\Leftrightarrow x = 12$.',
        '$x = 12$ thoả mãn điều kiện. Kiểm tra: mẹ $36$ tuổi; $12$ năm sau mẹ $48$, con $24$, đúng là gấp đôi.',
      ],
      answer: 'Năm nay con $12$ tuổi.',
    },
    {
      problem:
        'Một ô tô đi từ $A$ đến $B$ với vận tốc $50$ km/h, rồi từ $B$ trở về $A$ với vận tốc $40$ km/h. Tổng thời gian cả đi lẫn về là $9$ giờ. Tính quãng đường $AB$.',
      steps: [
        'Gọi quãng đường $AB$ là $x$ (km), $x > 0$.',
        'Thời gian đi là $\\dfrac{x}{50}$ giờ, thời gian về là $\\dfrac{x}{40}$ giờ. Ta có phương trình $\\dfrac{x}{50} + \\dfrac{x}{40} = 9$.',
        'Nhân hai vế với $200$: $4x + 5x = 1800 \\Leftrightarrow 9x = 1800 \\Leftrightarrow x = 200$.',
        '$x = 200$ thoả mãn điều kiện $x > 0$ (đi $4$ giờ, về $5$ giờ, tổng $9$ giờ).',
      ],
      answer: 'Quãng đường $AB$ dài $200$ km.',
    },
    {
      problem:
        'Theo kế hoạch, mỗi ngày một tổ sản xuất làm $50$ sản phẩm. Thực tế mỗi ngày tổ làm được $60$ sản phẩm nên hoàn thành sớm $2$ ngày. Hỏi theo kế hoạch tổ phải làm bao nhiêu sản phẩm?',
      steps: [
        'Gọi số ngày làm theo kế hoạch là $x$ (ngày), $x \\in \\mathbb{N}$, $x > 2$.',
        'Số sản phẩm theo kế hoạch là $50x$; thực tế tổ làm trong $x - 2$ ngày được $60(x - 2)$ sản phẩm. Phương trình: $50x = 60(x - 2)$.',
        'Giải: $50x = 60x - 120 \\Leftrightarrow -10x = -120 \\Leftrightarrow x = 12$ (thoả mãn).',
        'Số sản phẩm theo kế hoạch: $50 \\cdot 12 = 600$.',
      ],
      answer: 'Theo kế hoạch tổ phải làm $600$ sản phẩm.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Sắp xếp các việc khi giải bài toán bằng cách lập phương trình theo đúng thứ tự.',
      items: [
        'Giải phương trình',
        'Chọn ẩn và đặt điều kiện cho ẩn',
        'Kiểm tra nghiệm với điều kiện của ẩn và trả lời',
        'Biểu diễn các đại lượng chưa biết theo ẩn và lập phương trình',
      ],
      answer: [1, 3, 0, 2],
      hints: ['Việc đầu tiên là gọi một đại lượng chưa biết là $x$.'],
      solution:
        'Chọn ẩn, đặt điều kiện → biểu diễn các đại lượng và lập phương trình → giải phương trình → kiểm tra và trả lời.',
    },
    {
      type: 'choice',
      prompt: 'Gọi $x$ là số học sinh của một lớp. Điều kiện thích hợp của $x$ là',
      options: [
        '$x \\in \\mathbb{N}$, $x > 0$',
        '$x > 0$ (số thực bất kì)',
        '$x \\in \\mathbb{Z}$',
        '$x \\ne 0$',
      ],
      answer: 0,
      hints: ['Số học sinh có thể là $12{,}5$ hay $-3$ không?'],
      solution: 'Số học sinh là số tự nhiên khác $0$, nên $x \\in \\mathbb{N}$, $x > 0$.',
    },
    {
      type: 'number',
      prompt:
        'Hai lớp 8A và 8B trồng được tất cả $85$ cây. Lớp 8A trồng nhiều hơn lớp 8B $5$ cây. Lớp 8B trồng được bao nhiêu cây?',
      answer: 40,
      unit: 'cây',
      hints: [
        'Gọi số cây lớp 8B trồng là $x$; khi đó lớp 8A trồng $x + 5$ cây.',
        'Phương trình: $x + (x + 5) = 85$.',
      ],
      solution:
        'Gọi số cây lớp 8B là $x$ ($x \\in \\mathbb{N}$). Ta có $x + x + 5 = 85 \\Leftrightarrow 2x = 80 \\Leftrightarrow x = 40$ (thoả mãn). Lớp 8B trồng $40$ cây, lớp 8A trồng $45$ cây.',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh vườn hình chữ nhật có chu vi $56$ m, chiều dài hơn chiều rộng $6$ m. Tính chiều rộng của mảnh vườn.',
      answer: 11,
      unit: 'm',
      hints: [
        'Gọi chiều rộng là $x$ (m), chiều dài là $x + 6$.',
        'Chu vi $= 2 \\cdot (\\text{dài} + \\text{rộng})$.',
      ],
      solution:
        'Gọi chiều rộng là $x$ (m), $x > 0$. Ta có $2(x + x + 6) = 56 \\Leftrightarrow 2x + 6 = 28 \\Leftrightarrow x = 11$ (thoả mãn). Chiều rộng $11$ m, chiều dài $17$ m.',
    },
    {
      type: 'number',
      prompt:
        'Hai thành phố cách nhau $150$ km. Cùng lúc, hai xe khởi hành từ hai thành phố, đi ngược chiều nhau với vận tốc $45$ km/h và $30$ km/h. Sau bao nhiêu giờ hai xe gặp nhau?',
      answer: 2,
      unit: 'giờ',
      hints: [
        'Gọi thời gian đến lúc gặp nhau là $x$ (giờ), $x > 0$.',
        'Tổng quãng đường hai xe đi: $45x + 30x = 150$.',
      ],
      solution:
        '$45x + 30x = 150 \\Leftrightarrow 75x = 150 \\Leftrightarrow x = 2$ (thoả mãn). Sau $2$ giờ hai xe gặp nhau.',
    },
    {
      type: 'choice',
      prompt:
        'Một người đi xe máy từ $A$ đến $B$ với vận tốc $30$ km/h, lúc về đi với vận tốc $40$ km/h nên thời gian về ít hơn thời gian đi $30$ phút. Gọi $x$ (km) là quãng đường $AB$. Phương trình nào đúng?',
      options: [
        '$\\dfrac{x}{30} - \\dfrac{x}{40} = \\dfrac{1}{2}$',
        '$\\dfrac{x}{40} - \\dfrac{x}{30} = \\dfrac{1}{2}$',
        '$\\dfrac{x}{30} - \\dfrac{x}{40} = 30$',
        '$30x - 40x = \\dfrac{1}{2}$',
      ],
      answer: 0,
      hints: [
        'Thời gian đi là $\\dfrac{x}{30}$ giờ, thời gian về là $\\dfrac{x}{40}$ giờ.',
        'Đổi $30$ phút ra giờ.',
      ],
      solution:
        'Thời gian đi dài hơn thời gian về $30$ phút $= \\dfrac{1}{2}$ giờ, nên $\\dfrac{x}{30} - \\dfrac{x}{40} = \\dfrac{1}{2}$.',
    },
    {
      type: 'number',
      prompt: 'Giải tiếp bài toán trên: quãng đường $AB$ dài bao nhiêu ki-lô-mét?',
      answer: 60,
      unit: 'km',
      hints: ['Nhân hai vế của $\\dfrac{x}{30} - \\dfrac{x}{40} = \\dfrac{1}{2}$ với $120$.'],
      solution:
        'Nhân hai vế với $120$: $4x - 3x = 60 \\Leftrightarrow x = 60$ (thoả mãn $x > 0$). Đi hết $2$ giờ, về hết $1{,}5$ giờ. Quãng đường $AB$ dài $60$ km.',
    },
    {
      type: 'number',
      prompt:
        'Hiện nay tuổi bố gấp $4$ lần tuổi con. Sau $20$ năm nữa, tuổi bố gấp $2$ lần tuổi con. Hiện nay con bao nhiêu tuổi?',
      answer: 10,
      unit: 'tuổi',
      hints: ['Gọi tuổi con hiện nay là $x$, tuổi bố là $4x$.', '$4x + 20 = 2(x + 20)$.'],
      solution:
        '$4x + 20 = 2(x + 20) \\Leftrightarrow 4x + 20 = 2x + 40 \\Leftrightarrow 2x = 20 \\Leftrightarrow x = 10$ (thoả mãn). Con $10$ tuổi, bố $40$ tuổi.',
    },
    {
      type: 'number',
      prompt:
        'Một đội dự định mỗi ngày đào $40$ m mương. Thực tế mỗi ngày đội đào được $50$ m nên xong sớm hơn dự định $1$ ngày. Con mương dài bao nhiêu mét?',
      answer: 200,
      unit: 'm',
      hints: [
        'Gọi số ngày dự định là $x$ ($x \\in \\mathbb{N}$, $x > 1$); thực tế đội làm $x - 1$ ngày.',
        'Độ dài mương không đổi: $40x = 50(x - 1)$.',
      ],
      solution:
        '$40x = 50(x - 1) \\Leftrightarrow 40x = 50x - 50 \\Leftrightarrow -10x = -50 \\Leftrightarrow x = 5$ (thoả mãn). Mương dài $40 \\cdot 5 = 200$ m.',
    },
  ],
  takeaways: [
    'Bước 1: chọn ẩn, đặt điều kiện; biểu diễn các đại lượng theo ẩn; lập phương trình.',
    'Bước 2: giải phương trình.',
    'Bước 3: kiểm tra nghiệm với điều kiện của ẩn rồi trả lời đúng câu hỏi của bài toán.',
    'Chuyển động: $s = v \\cdot t$; năng suất: khối lượng công việc = năng suất × thời gian. Kẻ bảng giúp lập phương trình.',
  ],
};
