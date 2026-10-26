/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương 6: hệ thống hoá phân thức đại số, điều kiện xác định, rút gọn, quy đồng và bốn phép tính trên phân thức, kèm bài kiểm tra có bản đồ kĩ năng theo từng bài.',
  intro:
    'Chương 6 mở rộng phân số thành phân thức đại số: tử và mẫu là các đa thức. Bài này hệ thống lại toàn chương, luyện các dạng trắc nghiệm và tự luận tổng hợp, vận dụng vào bài toán chuyển động và năng suất, rồi cho em một bài kiểm tra; bản đồ kĩ năng tô màu từng bài để chỉ ra phần em đã vững và phần cần ôn lại.',
  objectives: [
    'Hệ thống hoá khái niệm phân thức, điều kiện xác định, hai phân thức bằng nhau và tính chất cơ bản.',
    'Rút gọn, quy đồng và thực hiện thành thạo bốn phép tính trên phân thức.',
    'Rút gọn biểu thức, tìm giá trị nguyên và dùng phân thức để mô tả các đại lượng trong bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Phân thức đại số và tính chất cơ bản',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phân thức đại số',
          text: 'Phân thức đại số là biểu thức có dạng $\\dfrac{A}{B}$, trong đó $A$, $B$ là những đa thức và $B$ khác đa thức $0$. Điều kiện xác định của phân thức là điều kiện của biến để giá trị của mẫu thức khác $0$. Mỗi đa thức cũng là một phân thức với mẫu bằng $1$.',
        },
        {
          type: 'table',
          caption: 'Các kiến thức của Bài 21 và Bài 22',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Hai phân thức bằng nhau',
              '$\\dfrac{A}{B} = \\dfrac{C}{D}$ nếu $A \\cdot D = B \\cdot C$',
            ],
            [
              'Tính chất cơ bản',
              '$\\dfrac{A}{B} = \\dfrac{A \\cdot M}{B \\cdot M}$ ($M \\ne 0$); $\\dfrac{A}{B} = \\dfrac{A : N}{B : N}$ ($N$ là nhân tử chung)',
            ],
            ['Quy tắc đổi dấu', '$\\dfrac{A}{B} = \\dfrac{-A}{-B}$'],
            ['Rút gọn', 'Phân tích tử và mẫu thành nhân tử, chia cả tử và mẫu cho nhân tử chung'],
            [
              'Quy đồng mẫu thức',
              'Tìm MTC; nhân tử phụ $=$ MTC $:$ mẫu; nhân cả tử và mẫu với nhân tử phụ',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Các phép tính trên phân thức',
      blocks: [
        {
          type: 'table',
          caption: 'Các kiến thức của Bài 23 và Bài 24',
          head: ['Phép tính', 'Quy tắc'],
          rows: [
            ['Cộng cùng mẫu', '$\\dfrac{A}{M} + \\dfrac{B}{M} = \\dfrac{A + B}{M}$'],
            ['Cộng khác mẫu', 'Quy đồng mẫu thức rồi cộng các phân thức cùng mẫu'],
            [
              'Trừ',
              '$\\dfrac{A}{B} - \\dfrac{C}{D} = \\dfrac{A}{B} + \\left(-\\dfrac{C}{D}\\right)$',
            ],
            ['Nhân', '$\\dfrac{A}{B} \\cdot \\dfrac{C}{D} = \\dfrac{A \\cdot C}{B \\cdot D}$'],
            [
              'Chia',
              '$\\dfrac{A}{B} : \\dfrac{C}{D} = \\dfrac{A}{B} \\cdot \\dfrac{D}{C}$ với $\\dfrac{C}{D} \\ne 0$',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Phép cộng và phép nhân phân thức có tính chất giao hoán, kết hợp; phép nhân phân phối đối với phép cộng. Nhờ đó ta có thể nhóm các phân thức cùng mẫu, hoặc rút gọn trước khi nhân, để tính nhanh.',
        },
      ],
    },
    {
      heading: 'Những lỗi hay gặp',
      blocks: [
        {
          type: 'list',
          items: [
            'Gạch hạng tử thay vì nhân tử: $\\dfrac{x + 3}{x + 5} \\ne \\dfrac{3}{5}$. Chỉ chia tử và mẫu cho một nhân tử chung.',
            'Tìm điều kiện xác định sau khi rút gọn: $\\dfrac{x^2 - 2x}{x^2 - 4} = \\dfrac{x}{x + 2}$ nhưng phân thức ban đầu vẫn không xác định tại $x = 2$.',
            'Quên ngoặc khi trừ: $\\dfrac{2x}{x - 1} - \\dfrac{x + 1}{x - 1} = \\dfrac{2x - (x + 1)}{x - 1}$, không phải $\\dfrac{2x - x + 1}{x - 1}$.',
            'Cộng tử với tử, mẫu với mẫu: $\\dfrac{1}{x} + \\dfrac{1}{y} = \\dfrac{x + y}{xy}$, không phải $\\dfrac{2}{x + y}$.',
            'Khi chia, quên điều kiện phân thức chia khác $0$, hoặc lật ngược nhầm phân thức bị chia.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Bài kiểm tra cuối chương',
          text: 'Bài kiểm tra bên dưới có $12$ câu tự sinh, ba câu cho mỗi bài từ Bài 21 đến Bài 24. Bản đồ kĩ năng tô màu từng bài theo số câu em làm đúng ngay lần đầu, để em biết cần ôn lại bài nào. Đáp số là số nguyên, phân số (gõ dạng $-7/3$) hoặc số thập phân (gõ dấu phẩy, ví dụ $1{,}25$).',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương 6',
    instruction:
      'Làm lần lượt các câu, nhập đáp số rồi bấm "Kiểm tra". Sai lần đầu em được gợi ý và làm lại; sai lần nữa thì lời giải hiện ra. Xem bản đồ kĩ năng để biết bài nào cần ôn, rồi bấm "Làm bộ đề mới" để luyện thêm.',
  },
  examples: [
    {
      problem:
        'Cho biểu thức $P = \\dfrac{x + 2}{x - 2} - \\dfrac{x - 2}{x + 2} - \\dfrac{16}{x^2 - 4}$. a) Tìm điều kiện xác định của $P$. b) Rút gọn $P$. c) Tính giá trị của $P$ tại $x = 6$. d) Tìm các số nguyên $x$ để $P$ có giá trị nguyên.',
      steps: [
        'a) $x^2 - 4 = (x - 2)(x + 2)$, nên $P$ xác định khi $x \\ne 2$ và $x \\ne -2$.',
        'b) MTC $= (x - 2)(x + 2)$. Tử thức: $(x + 2)^2 - (x - 2)^2 - 16 = 8x - 16 = 8(x - 2)$.',
        '$P = \\dfrac{8(x - 2)}{(x - 2)(x + 2)} = \\dfrac{8}{x + 2}$.',
        'c) $x = 6$ thoả mãn điều kiện: $P = \\dfrac{8}{6 + 2} = 1$.',
        'd) $P$ nguyên khi $x + 2$ là ước của $8$: $x + 2 \\in \\{-8; -4; -2; -1; 1; 2; 4; 8\\}$, nên $x \\in \\{-10; -6; -4; -3; -1; 0; 2; 6\\}$.',
        'Loại $x = 2$ vì không thoả mãn điều kiện xác định.',
      ],
      answer:
        'a) $x \\ne \\pm 2$; b) $P = \\dfrac{8}{x + 2}$; c) $P = 1$; d) $x \\in \\{-10; -6; -4; -3; -1; 0; 6\\}$.',
    },
    {
      problem:
        'Một ca nô xuôi dòng $30$ km rồi ngược dòng trở về bến cũ. Vận tốc của ca nô khi nước yên lặng là $x$ (km/h), vận tốc dòng nước là $3$ km/h. a) Viết phân thức biểu thị tổng thời gian đi và về. b) Tính thời gian đó khi $x = 27$.',
      steps: [
        'Vận tốc xuôi dòng $x + 3$, ngược dòng $x - 3$ (km/h), với $x > 3$.',
        'Thời gian xuôi dòng $\\dfrac{30}{x + 3}$ giờ, ngược dòng $\\dfrac{30}{x - 3}$ giờ.',
        'a) $T = \\dfrac{30}{x + 3} + \\dfrac{30}{x - 3} = \\dfrac{30(x - 3) + 30(x + 3)}{x^2 - 9} = \\dfrac{60x}{x^2 - 9}$ (giờ).',
        'b) Tại $x = 27$: $T = \\dfrac{60 \\cdot 27}{729 - 9} = \\dfrac{1620}{720} = 2{,}25$ (giờ).',
      ],
      answer: 'a) $T = \\dfrac{60x}{x^2 - 9}$ giờ; b) $2{,}25$ giờ, tức là $2$ giờ $15$ phút.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Điều kiện xác định của phân thức $\\dfrac{x + 5}{x^2 - 25}$ là',
      options: ['$x \\ne 5$', '$x \\ne 5$ và $x \\ne -5$', '$x \\ne -5$', '$x \\ne 0$'],
      answer: 1,
      hints: ['$x^2 - 25 = (x - 5)(x + 5)$; mẫu bằng $0$ tại hai giá trị.'],
      solution:
        'Mẫu $x^2 - 25 = (x - 5)(x + 5) = 0$ khi $x = 5$ hoặc $x = -5$. Điều kiện xác định là $x \\ne 5$ và $x \\ne -5$, kể cả khi phân thức rút gọn được thành $\\dfrac{1}{x - 5}$.',
    },
    {
      type: 'choice',
      prompt: 'Phân thức nào bằng phân thức $\\dfrac{x - 1}{x}$?',
      options: [
        '$\\dfrac{x^2 - 1}{x^2 + x}$',
        '$\\dfrac{x^2 - 1}{x^2}$',
        '$\\dfrac{x - 2}{x - 1}$',
        '$\\dfrac{2x - 1}{2x}$',
      ],
      answer: 0,
      hints: ['Kiểm tra $A \\cdot D = B \\cdot C$, hoặc rút gọn từng lựa chọn.'],
      solution:
        '$\\dfrac{x^2 - 1}{x^2 + x} = \\dfrac{(x - 1)(x + 1)}{x(x + 1)} = \\dfrac{x - 1}{x}$. Các lựa chọn khác thay đổi riêng từng hạng tử, không phải nhân cả tử và mẫu với cùng một đa thức.',
    },
    {
      type: 'choice',
      prompt: 'Rút gọn phân thức $\\dfrac{3x^2 - 6x}{4 - x^2}$ được',
      options: [
        '$\\dfrac{-3x}{x + 2}$',
        '$\\dfrac{3x}{x + 2}$',
        '$\\dfrac{3x}{2 - x}$',
        '$\\dfrac{-3x}{2 - x}$',
      ],
      answer: 0,
      hints: ['$3x^2 - 6x = 3x(x - 2)$ và $4 - x^2 = (2 - x)(2 + x) = -(x - 2)(x + 2)$.'],
      solution: '$\\dfrac{3x(x - 2)}{-(x - 2)(x + 2)} = \\dfrac{-3x}{x + 2}$.',
    },
    {
      type: 'choice',
      prompt:
        'Mẫu thức chung đơn giản nhất của hai phân thức $\\dfrac{1}{x^2 - x}$ và $\\dfrac{1}{x^2 - 1}$ là',
      options: ['$x(x - 1)(x + 1)$', '$(x - 1)(x + 1)$', '$x(x - 1)$', '$(x^2 - x)(x^2 - 1)$'],
      answer: 0,
      hints: ['$x^2 - x = x(x - 1)$; $x^2 - 1 = (x - 1)(x + 1)$. Mỗi nhân tử lấy số mũ cao nhất.'],
      solution:
        'Các nhân tử là $x$, $x - 1$, $x + 1$, mỗi nhân tử có số mũ cao nhất là $1$. MTC $= x(x - 1)(x + 1)$. Tích hai mẫu cũng là mẫu chung nhưng không đơn giản nhất.',
    },
    {
      type: 'number',
      prompt: 'Kết quả của phép cộng $\\dfrac{2x}{x + 3} + \\dfrac{6}{x + 3}$ là số nào?',
      answer: 2,
      hints: ['Cùng mẫu: cộng hai tử, rồi đặt nhân tử chung ở tử.'],
      solution: '$\\dfrac{2x + 6}{x + 3} = \\dfrac{2(x + 3)}{x + 3} = 2$ (với $x \\ne -3$).',
    },
    {
      type: 'choice',
      prompt: 'Kết quả của phép tính $\\dfrac{1}{x - 1} - \\dfrac{2}{x^2 - 1}$ là',
      options: [
        '$\\dfrac{1}{x + 1}$',
        '$\\dfrac{-1}{x^2 - 1}$',
        '$\\dfrac{x - 1}{x + 1}$',
        '$\\dfrac{x + 3}{x^2 - 1}$',
      ],
      answer: 0,
      hints: ['MTC $= x^2 - 1 = (x - 1)(x + 1)$; nhân tử phụ của $x - 1$ là $x + 1$.'],
      solution:
        '$\\dfrac{(x + 1) - 2}{x^2 - 1} = \\dfrac{x - 1}{(x - 1)(x + 1)} = \\dfrac{1}{x + 1}$.',
    },
    {
      type: 'choice',
      prompt: 'Kết quả của phép nhân $\\dfrac{4x^2}{x^2 - 9} \\cdot \\dfrac{x + 3}{2x}$ là',
      options: [
        '$\\dfrac{2x}{x - 3}$',
        '$\\dfrac{2x}{x + 3}$',
        '$\\dfrac{2}{x - 3}$',
        '$\\dfrac{2x^2}{x - 3}$',
      ],
      answer: 0,
      hints: ['Phân tích $x^2 - 9 = (x - 3)(x + 3)$ rồi rút gọn trước khi nhân.'],
      solution:
        '$\\dfrac{4x^2(x + 3)}{(x - 3)(x + 3) \\cdot 2x} = \\dfrac{2x}{x - 3}$. Lựa chọn cuối quên chia cả tử và mẫu cho $2x$, chỉ chia cho $2$.',
    },
    {
      type: 'choice',
      prompt: 'Kết quả của phép chia $\\dfrac{x^2 + x}{5} : \\dfrac{x + 1}{10x}$ là',
      options: ['$2x^2$', '$\\dfrac{x^2}{2}$', '$\\dfrac{(x + 1)^2}{50}$', '$2x$'],
      answer: 0,
      hints: ['Nhân với phân thức nghịch đảo $\\dfrac{10x}{x + 1}$; $x^2 + x = x(x + 1)$.'],
      solution:
        '$\\dfrac{x(x + 1)}{5} \\cdot \\dfrac{10x}{x + 1} = 2x^2$ (với $x \\ne 0$, $x \\ne -1$).',
    },
    {
      type: 'number',
      prompt:
        'Chứng tỏ biểu thức $Q = \\left(\\dfrac{x}{x - 3} - \\dfrac{3}{x + 3}\\right) \\cdot \\dfrac{x^2 - 9}{x^2 + 9}$ (với $x \\ne \\pm 3$) có giá trị không phụ thuộc vào $x$. Giá trị đó bằng bao nhiêu?',
      answer: 1,
      hints: [
        'Trong ngoặc: MTC $= x^2 - 9$; tử thức $x(x + 3) - 3(x - 3)$.',
        'Tử thức trong ngoặc bằng $x^2 + 9$.',
      ],
      solution:
        '$\\dfrac{x(x + 3) - 3(x - 3)}{x^2 - 9} = \\dfrac{x^2 + 9}{x^2 - 9}$, nên $Q = \\dfrac{x^2 + 9}{x^2 - 9} \\cdot \\dfrac{x^2 - 9}{x^2 + 9} = 1$.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu số nguyên $x$ để phân thức $\\dfrac{x + 5}{x + 1}$ có giá trị nguyên?',
      answer: 6,
      hints: [
        'Tách $\\dfrac{x + 5}{x + 1} = 1 + \\dfrac{4}{x + 1}$.',
        '$x + 1$ phải là ước của $4$.',
      ],
      solution:
        '$\\dfrac{x + 5}{x + 1} = \\dfrac{(x + 1) + 4}{x + 1} = 1 + \\dfrac{4}{x + 1}$. Cần $x + 1 \\in \\{-4; -2; -1; 1; 2; 4\\}$, nên $x \\in \\{-5; -3; -2; 0; 1; 3\\}$: có $6$ số, đều thoả mãn $x \\ne -1$.',
    },
    {
      type: 'number',
      prompt:
        'Một ca nô xuôi dòng $36$ km rồi ngược dòng trở về. Vận tốc ca nô khi nước yên lặng là $x$ km/h, vận tốc dòng nước là $2$ km/h. Tổng thời gian đi và về là $\\dfrac{36}{x + 2} + \\dfrac{36}{x - 2}$ giờ. Tính thời gian đó (theo giờ) khi $x = 10$.',
      answer: 7.5,
      hints: ['Thời gian xuôi dòng $\\dfrac{36}{12}$ giờ, ngược dòng $\\dfrac{36}{8}$ giờ.'],
      solution:
        'Thu gọn: $\\dfrac{36(x - 2) + 36(x + 2)}{x^2 - 4} = \\dfrac{72x}{x^2 - 4}$. Tại $x = 10$: $\\dfrac{720}{96} = 7{,}5$ giờ ($3$ giờ xuôi dòng và $4{,}5$ giờ ngược dòng).',
    },
    {
      type: 'fraction',
      prompt:
        'Vòi thứ nhất chảy riêng thì đầy bể sau $x$ giờ, vòi thứ hai chảy riêng thì đầy bể sau $x + 2$ giờ. Phân thức biểu thị phần bể cả hai vòi cùng chảy được trong $1$ giờ là $\\dfrac{1}{x} + \\dfrac{1}{x + 2}$. Tính phần bể đó khi $x = 4$.',
      answer: [5, 12],
      simplest: true,
      hints: [
        'Trong $1$ giờ vòi thứ nhất chảy được $\\dfrac{1}{4}$ bể, vòi thứ hai $\\dfrac{1}{6}$ bể.',
      ],
      solution:
        '$\\dfrac{1}{x} + \\dfrac{1}{x + 2} = \\dfrac{2x + 2}{x(x + 2)}$. Tại $x = 4$: $\\dfrac{10}{24} = \\dfrac{5}{12}$ bể.',
    },
  ],
  takeaways: [
    'Tìm điều kiện xác định từ biểu thức ban đầu, kể cả điều kiện phân thức chia khác $0$.',
    'Mọi phép biến đổi phân thức dựa trên phân tích thành nhân tử: rút gọn, tìm MTC, nhân và chia đều bắt đầu từ đó.',
    'Bài toán thực tế: thời gian $=$ quãng đường $:$ vận tốc, năng suất $= 1 :$ thời gian hoàn thành, nên các đại lượng này thường là phân thức.',
  ],
};
