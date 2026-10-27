/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Giải bài toán bằng cách lập phương trình bậc hai: chọn ẩn và đặt điều kiện, lập phương trình, giải rồi chọn nghiệm thoả mãn điều kiện của ẩn.',
  intro:
    'Ở lớp 8, em đã giải bài toán bằng cách lập phương trình bậc nhất. Nhiều bài toán về diện tích, chuyển động hay tăng trưởng phần trăm lại dẫn tới phương trình bậc hai, và phương trình đó thường có hai nghiệm. Nhưng chiều rộng mảnh vườn không thể âm, số học sinh không thể là $27{,}5$: điều kiện của ẩn giúp ta chọn đúng nghiệm.',
  objectives: [
    'Giải quyết bài toán thực tế bằng cách lập phương trình bậc hai một ẩn.',
    'Đặt điều kiện thích hợp cho ẩn và dùng nó để nhận hoặc loại nghiệm.',
  ],
  sections: [
    {
      heading: 'Các bước giải bài toán bằng cách lập phương trình',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Lập phương trình: chọn ẩn số và đặt điều kiện thích hợp cho ẩn; biểu diễn các đại lượng chưa biết theo ẩn và các đại lượng đã biết; lập phương trình biểu thị mối quan hệ giữa các đại lượng.',
            'Giải phương trình vừa lập được.',
            'Trả lời: kiểm tra xem trong các nghiệm của phương trình, nghiệm nào thoả mãn điều kiện của ẩn, nghiệm nào không, rồi kết luận.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đừng quên bước kiểm tra',
          text: 'Phương trình bậc hai thường có hai nghiệm, nhưng bài toán thực tế thường chỉ có một đáp số. Một nghiệm âm, không nguyên, hoặc làm một đại lượng khác vô lí (cạnh dài hơn nửa chu vi, thời gian âm…) phải bị loại, và lời giải phải nói rõ vì sao loại.',
        },
      ],
    },
    {
      heading: 'Một số dạng toán thường gặp',
      blocks: [
        {
          type: 'table',
          head: ['Dạng toán', 'Ẩn và điều kiện', 'Quan hệ để lập phương trình'],
          rows: [
            [
              'Diện tích, hình học',
              'Một cạnh $x > 0$',
              'Diện tích hình chữ nhật $= $ dài $\\cdot$ rộng; định lí Pythagore',
            ],
            [
              'Chuyển động',
              'Vận tốc $x > 0$',
              'Thời gian $= \\dfrac{\\text{quãng đường}}{\\text{vận tốc}}$; so sánh hai thời gian',
            ],
            [
              'Số học',
              '$x$ là số tự nhiên, số nguyên',
              'Hai số tự nhiên liên tiếp $n$ và $n + 1$; tích, tổng các số',
            ],
            [
              'Tăng, giảm phần trăm',
              'Tỉ lệ $r > 0$ (hay $0 < r < 1$ khi giảm)',
              'Sau hai lần tăng $r$: $A(1 + r)^2$; sau hai lần giảm $r$: $A(1 - r)^2$',
            ],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo sơ đồ, tìm nghiệm, loại nghiệm',
    instruction:
      'Chọn một bài toán. Kéo góc mảnh vườn (hoặc nút vận tốc của ô tô) để thử các giá trị của ẩn, đọc phản hồi để biết còn thiếu hay thừa. Sau đó bấm "Lập và giải phương trình": phương trình có hai nghiệm, nhưng chỉ nghiệm thoả mãn điều kiện $x > 0$ được nhận.',
  },
  examples: [
    {
      problem: 'Tìm hai số tự nhiên liên tiếp có tích bằng $156$.',
      steps: [
        'Gọi số nhỏ là $n$ ($n$ là số tự nhiên); số liền sau là $n + 1$.',
        'Ta có phương trình $n(n + 1) = 156$, tức $n^2 + n - 156 = 0$.',
        '$\\Delta = 1^2 - 4 \\cdot 1 \\cdot (-156) = 625$, $\\sqrt{\\Delta} = 25$; $n_1 = \\dfrac{-1 + 25}{2} = 12$, $n_2 = \\dfrac{-1 - 25}{2} = -13$.',
        '$n_2 = -13$ không phải số tự nhiên nên bị loại; $n = 12$ thoả mãn.',
      ],
      answer: 'Hai số cần tìm là $12$ và $13$.',
    },
    {
      problem:
        'Quãng đường $AB$ dài $120$ km. Nếu ô tô tăng vận tốc thêm $10$ km/h thì đến $B$ sớm hơn dự định $1$ giờ. Tính vận tốc dự định.',
      steps: [
        'Gọi vận tốc dự định là $x$ (km/h), $x > 0$. Thời gian dự định là $\\dfrac{120}{x}$ giờ, thời gian khi tăng tốc là $\\dfrac{120}{x + 10}$ giờ.',
        'Ta có phương trình $\\dfrac{120}{x} - \\dfrac{120}{x + 10} = 1$. Nhân hai vế với $x(x + 10)$: $120(x + 10) - 120x = x(x + 10)$, tức $x^2 + 10x - 1200 = 0$.',
        "$\\Delta' = 5^2 + 1200 = 1225$, $\\sqrt{\\Delta'} = 35$; $x_1 = -5 + 35 = 30$, $x_2 = -5 - 35 = -40$.",
        '$x_2 = -40 < 0$ bị loại; $x_1 = 30$ thoả mãn. Thử lại: $\\dfrac{120}{30} - \\dfrac{120}{40} = 4 - 3 = 1$.',
      ],
      answer: 'Vận tốc dự định của ô tô là $30$ km/h.',
    },
    {
      problem:
        'Giá một chiếc máy tính là $20$ triệu đồng. Sau hai lần giảm giá, mỗi lần giảm cùng một tỉ lệ, giá còn $16{,}2$ triệu đồng. Mỗi lần giảm bao nhiêu phần trăm?',
      steps: [
        'Gọi tỉ lệ giảm mỗi lần là $r$ (viết dưới dạng số thập phân), $0 < r < 1$.',
        'Sau lần giảm thứ nhất giá là $20(1 - r)$, sau lần thứ hai là $20(1 - r)^2$. Ta có $20(1 - r)^2 = 16{,}2$, tức $(1 - r)^2 = 0{,}81$.',
        'Suy ra $1 - r = 0{,}9$ hoặc $1 - r = -0{,}9$, tức $r = 0{,}1$ hoặc $r = 1{,}9$.',
        '$r = 1{,}9$ không thoả mãn $0 < r < 1$ nên bị loại; $r = 0{,}1 = 10\\%$.',
      ],
      answer: 'Mỗi lần giá giảm $10\\%$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tích của hai số tự nhiên liên tiếp bằng $210$. Tìm số nhỏ hơn.',
      answer: 14,
      hints: [
        'Gọi số nhỏ là $n$: $n(n + 1) = 210$.',
        '$n^2 + n - 210 = 0$ có $\\Delta = 841 = 29^2$.',
      ],
      solution:
        '$n^2 + n - 210 = 0$, $\\Delta = 1 + 840 = 841$, $n_1 = \\dfrac{-1 + 29}{2} = 14$, $n_2 = \\dfrac{-1 - 29}{2} = -15$ (loại). Số nhỏ hơn là $14$.',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh đất hình chữ nhật có chiều dài hơn chiều rộng $5$ m và diện tích $150$ m². Tính chiều rộng của mảnh đất.',
      answer: 10,
      unit: 'm',
      hints: ['Gọi chiều rộng là $x$ (m), $x > 0$: $x(x + 5) = 150$.', '$x^2 + 5x - 150 = 0$.'],
      solution:
        '$x^2 + 5x - 150 = 0$, $\\Delta = 25 + 600 = 625$; $x_1 = \\dfrac{-5 + 25}{2} = 10$, $x_2 = \\dfrac{-5 - 25}{2} = -15$ (loại vì $x > 0$). Chiều rộng là $10$ m.',
    },
    {
      type: 'choice',
      prompt:
        'Giải bài toán trên, bạn An được hai nghiệm $x = 10$ và $x = -15$. Kết luận nào đúng?',
      options: [
        'Mảnh đất có hai chiều rộng có thể là $10$ m và $15$ m',
        'Chiều rộng là $10$ m; loại $x = -15$ vì chiều rộng phải dương',
        'Chiều rộng là $-15$ m vì đó là nghiệm nhỏ hơn',
        'Bài toán vô nghiệm vì phương trình có nghiệm âm',
      ],
      answer: 1,
      hints: ['Nhớ lại điều kiện của ẩn khi chọn ẩn.'],
      solution:
        'Điều kiện $x > 0$ nên chỉ nhận $x = 10$; nghiệm $-15$ bị loại. Không được "bỏ dấu trừ" thành $15$: $15 \\cdot 20 = 300 \\ne 150$.',
    },
    {
      type: 'number',
      prompt:
        'Một tam giác vuông có cạnh huyền dài $13$ cm, hai cạnh góc vuông hơn kém nhau $7$ cm. Tính độ dài cạnh góc vuông ngắn hơn.',
      answer: 5,
      unit: 'cm',
      hints: [
        'Gọi cạnh ngắn là $x$ (cm), $x > 0$; cạnh kia là $x + 7$.',
        'Định lí Pythagore: $x^2 + (x + 7)^2 = 13^2$.',
      ],
      solution:
        '$x^2 + (x + 7)^2 = 169 \\Leftrightarrow 2x^2 + 14x - 120 = 0 \\Leftrightarrow x^2 + 7x - 60 = 0$. $\\Delta = 49 + 240 = 289$, $x_1 = \\dfrac{-7 + 17}{2} = 5$, $x_2 = \\dfrac{-7 - 17}{2} = -12$ (loại). Cạnh ngắn dài $5$ cm (cạnh kia $12$ cm).',
    },
    {
      type: 'number',
      prompt:
        'Một người đi xe đạp từ $A$ đến $B$ cách nhau $36$ km. Nếu tăng vận tốc thêm $3$ km/h thì người đó đến $B$ sớm hơn $1$ giờ. Tính vận tốc dự định (km/h).',
      answer: 9,
      unit: 'km/h',
      hints: [
        'Gọi vận tốc dự định là $x$ (km/h), $x > 0$: $\\dfrac{36}{x} - \\dfrac{36}{x + 3} = 1$.',
        'Quy đồng rồi khử mẫu: $36(x + 3) - 36x = x(x + 3)$.',
      ],
      solution:
        '$108 = x^2 + 3x \\Leftrightarrow x^2 + 3x - 108 = 0$. $\\Delta = 9 + 432 = 441$, $x_1 = \\dfrac{-3 + 21}{2} = 9$, $x_2 = \\dfrac{-3 - 21}{2} = -12$ (loại). Vận tốc dự định $9$ km/h. Thử lại: $\\dfrac{36}{9} - \\dfrac{36}{12} = 4 - 3 = 1$.',
    },
    {
      type: 'number',
      prompt:
        'Bác Hà gửi $100$ triệu đồng tiết kiệm với lãi suất $r\\%$ một năm, tiền lãi năm đầu được nhập vào gốc. Sau hai năm bác nhận được $112{,}36$ triệu đồng. Tìm $r$.',
      answer: 6,
      unit: '%',
      hints: [
        'Sau hai năm số tiền là $100(1 + q)^2$ với $q = \\dfrac{r}{100}$.',
        '$(1 + q)^2 = 1{,}1236$.',
      ],
      solution:
        '$100(1 + q)^2 = 112{,}36 \\Leftrightarrow (1 + q)^2 = 1{,}1236 \\Leftrightarrow 1 + q = 1{,}06$ hoặc $1 + q = -1{,}06$. Vì $q > 0$ nên $q = 0{,}06$, tức $r = 6$.',
    },
    {
      type: 'choice',
      prompt:
        'Gọi $x$ là số học sinh của một lớp trong một bài toán lập phương trình. Điều kiện thích hợp của $x$ là',
      options: ['$x > 0$', '$x$ là số nguyên dương', '$x \\ne 0$', '$x$ là số thực bất kì'],
      answer: 1,
      hints: ['Số học sinh có thể là $27{,}5$ không?'],
      solution:
        'Số học sinh phải là số nguyên dương. Điều kiện $x > 0$ chưa đủ, vì nó vẫn cho phép những giá trị như $27{,}5$.',
    },
    {
      type: 'number',
      prompt:
        'Một tấm bìa hình chữ nhật có chu vi $34$ cm và đường chéo dài $13$ cm. Tính chiều dài của tấm bìa.',
      answer: 12,
      unit: 'cm',
      hints: [
        'Gọi chiều dài là $x$ (cm), chiều rộng là $17 - x$; chiều dài không nhỏ hơn chiều rộng nên $8{,}5 \\le x < 17$.',
        'Pythagore: $x^2 + (17 - x)^2 = 169$.',
      ],
      solution:
        '$x^2 + (17 - x)^2 = 169 \\Leftrightarrow 2x^2 - 34x + 120 = 0 \\Leftrightarrow x^2 - 17x + 60 = 0$. $\\Delta = 289 - 240 = 49$, $x_1 = \\dfrac{17 + 7}{2} = 12$, $x_2 = \\dfrac{17 - 7}{2} = 5$. Hai nghiệm đều dương, nhưng $x = 5 < 8{,}5$ là chiều rộng chứ không phải chiều dài, nên loại. Chiều dài $12$ cm (chiều rộng $5$ cm).',
    },
  ],
  takeaways: [
    'Ba bước: lập phương trình (chọn ẩn, đặt điều kiện, biểu diễn, lập), giải phương trình, trả lời.',
    'Luôn đối chiếu nghiệm với điều kiện của ẩn; nói rõ nghiệm nào bị loại và vì sao.',
    'Thử lại đáp số với dữ kiện ban đầu của đề bài.',
  ],
};
