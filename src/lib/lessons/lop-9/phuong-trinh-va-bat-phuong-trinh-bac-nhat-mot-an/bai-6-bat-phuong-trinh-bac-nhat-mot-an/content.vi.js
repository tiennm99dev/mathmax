/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bất phương trình bậc nhất một ẩn ax + b < 0 (a khác 0): nghiệm, quy tắc chuyển vế, quy tắc nhân với số dương hay số âm, cách giải và biểu diễn tập nghiệm trên trục số.',
  intro:
    'Một bạn có $70$ nghìn đồng, mua một chiếc bút giá $8$ nghìn đồng và muốn mua thêm càng nhiều vở càng tốt, mỗi quyển $6$ nghìn đồng. Gọi $x$ là số vở thì tổng số tiền phải thoả mãn $8 + 6x \\le 70$. Đây là một bất phương trình bậc nhất một ẩn. Bài này chỉ cho em cách giải nó và cách vẽ tập nghiệm trên trục số.',
  objectives: [
    'Nhận biết bất phương trình bậc nhất một ẩn và kiểm tra một số có là nghiệm hay không.',
    'Giải bất phương trình bậc nhất một ẩn bằng quy tắc chuyển vế và quy tắc nhân.',
    'Biểu diễn tập nghiệm trên trục số.',
    'Giải bài toán thực tế dẫn đến bất phương trình bậc nhất một ẩn.',
  ],
  sections: [
    {
      heading: 'Bất phương trình bậc nhất một ẩn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Bất phương trình dạng $ax + b < 0$ (hoặc $ax + b > 0$, $ax + b \\le 0$, $ax + b \\ge 0$), trong đó $a$, $b$ là hai số đã cho và $a \\ne 0$, được gọi là bất phương trình bậc nhất một ẩn $x$.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $2x - 6 > 0$ và $-x + 4 \\le 0$ là các bất phương trình bậc nhất một ẩn. Còn $0x + 5 > 0$ không phải, vì hệ số của $x$ bằng $0$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nghiệm',
          text: 'Số $x_0$ là một nghiệm của bất phương trình $A(x) < B(x)$ nếu $A(x_0) < B(x_0)$ là khẳng định đúng. Giải một bất phương trình là tìm tất cả các nghiệm của nó.',
        },
        {
          type: 'p',
          text: 'Với $2x - 6 > 0$: thay $x = 4$ được $2 \\cdot 4 - 6 = 2 > 0$, khẳng định đúng, nên $4$ là một nghiệm. Thay $x = 1$ được $2 \\cdot 1 - 6 = -4 > 0$, khẳng định sai, nên $1$ không là nghiệm.',
        },
      ],
    },
    {
      heading: 'Giải bất phương trình bậc nhất một ẩn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc chuyển vế',
          text: 'Khi chuyển một hạng tử từ vế này sang vế kia của một bất phương trình, ta phải đổi dấu hạng tử đó. Chẳng hạn $x + 5 < 2$ tương đương với $x < 2 - 5$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc nhân với một số',
          text: 'Khi nhân hai vế của một bất phương trình với cùng một số khác $0$, ta phải giữ nguyên chiều của bất phương trình nếu số đó dương, và đổi chiều của bất phương trình nếu số đó âm.',
        },
        {
          type: 'p',
          text: 'Hai quy tắc này đến từ các tính chất của bất đẳng thức ở Bài 5. Áp dụng chúng, ta giải được mọi bất phương trình bậc nhất một ẩn:',
        },
        {
          type: 'table',
          head: ['Bất phương trình', '$a > 0$', '$a < 0$'],
          rows: [
            ['$ax + b > 0$', '$x > -\\dfrac{b}{a}$', '$x < -\\dfrac{b}{a}$'],
            ['$ax + b < 0$', '$x < -\\dfrac{b}{a}$', '$x > -\\dfrac{b}{a}$'],
          ],
          caption: 'Các dạng $ax + b \\ge 0$ và $ax + b \\le 0$ giải tương tự.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Chia hai vế cho một số âm mà quên đổi chiều. Từ $-2x > 8$ phải được $x < -4$, không phải $x > -4$.',
        },
        {
          type: 'p',
          text: 'Nhiều bất phương trình chưa có dạng $ax + b < 0$, ví dụ $3x + 5 < 5x - 7$. Ta chuyển các hạng tử chứa ẩn sang một vế, các hằng số sang vế kia, thu gọn rồi giải như trên.',
        },
      ],
    },
    {
      heading: 'Biểu diễn tập nghiệm trên trục số',
      blocks: [
        {
          type: 'p',
          text: 'Nghiệm của một bất phương trình bậc nhất một ẩn là cả một tia số, chẳng hạn $x \\le 3$ hay $x > -1$. Trên trục số, ta gạch bỏ phần không thuộc tập nghiệm, giữ lại phần là tập nghiệm.',
        },
        {
          type: 'list',
          items: [
            'Đầu mút thuộc tập nghiệm (dấu $\\le$ hoặc $\\ge$): đánh dấu bằng ngoặc vuông, $[$ hoặc $]$.',
            'Đầu mút không thuộc tập nghiệm (dấu $<$ hoặc $>$): đánh dấu bằng ngoặc tròn, $($ hoặc $)$.',
          ],
        },
        {
          type: 'table',
          head: ['Nghiệm', 'Phần được giữ lại', 'Đầu mút'],
          rows: [
            ['$x > 2$', 'bên phải điểm $2$', '$($ tại $2$, không lấy $2$'],
            ['$x \\ge 2$', 'bên phải điểm $2$', '$[$ tại $2$, lấy cả $2$'],
            ['$x < 2$', 'bên trái điểm $2$', '$)$ tại $2$, không lấy $2$'],
            ['$x \\le 2$', 'bên trái điểm $2$', '$]$ tại $2$, lấy cả $2$'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Trục số tô vùng nghiệm',
    instruction:
      'Kéo các thanh hệ số $a$, $b$ và chọn dấu của bất phương trình $ax + b \\;\\square\\; 0$. Các bước giải hiện ngay bên dưới; bước chia cho số âm được tô vàng vì chiều đổi ngược. Kéo điểm thử trên trục số (hoặc dùng phím mũi tên) để kiểm tra nghiệm bằng cách thay số.',
  },
  examples: [
    {
      problem: 'Giải bất phương trình $2x - 6 > 0$ và biểu diễn tập nghiệm trên trục số.',
      steps: [
        'Chuyển $-6$ sang vế phải và đổi dấu: $2x > 6$.',
        'Chia hai vế cho $2 > 0$, giữ nguyên chiều: $x > 3$.',
        'Trên trục số, gạch bỏ phần bên trái điểm $3$, đặt ngoặc tròn $($ tại $3$ vì $3$ không là nghiệm.',
      ],
      answer: 'Nghiệm của bất phương trình là $x > 3$.',
    },
    {
      problem: 'Giải bất phương trình $-7x + 3 > 0$.',
      steps: [
        'Chuyển $3$ sang vế phải: $-7x > -3$.',
        'Chia hai vế cho $-7 < 0$, đổi chiều: $x < \\dfrac{-3}{-7}$, tức $x < \\dfrac{3}{7}$.',
      ],
      answer: 'Nghiệm của bất phương trình là $x < \\dfrac{3}{7}$.',
    },
    {
      problem: 'Giải bất phương trình $3x + 5 < 5x - 7$.',
      steps: [
        'Chuyển vế: $3x - 5x < -7 - 5$.',
        'Thu gọn: $-2x < -12$.',
        'Chia hai vế cho $-2 < 0$, đổi chiều: $x > 6$.',
      ],
      answer: 'Nghiệm của bất phương trình là $x > 6$.',
    },
    {
      problem:
        'Bạn An có $70$ nghìn đồng, mua một chiếc bút giá $8$ nghìn đồng và một số quyển vở, mỗi quyển giá $6$ nghìn đồng. Bạn An mua được nhiều nhất bao nhiêu quyển vở?',
      steps: [
        'Gọi $x$ là số quyển vở ($x$ là số tự nhiên). Số tiền phải trả là $8 + 6x$ (nghìn đồng).',
        'Số tiền không vượt quá $70$ nghìn đồng: $8 + 6x \\le 70$.',
        'Giải: $6x \\le 62$, nên $x \\le \\dfrac{62}{6} = \\dfrac{31}{3}$, mà $\\dfrac{31}{3} \\approx 10{,}33$.',
        'Số tự nhiên lớn nhất thoả mãn là $x = 10$.',
      ],
      answer: 'Bạn An mua được nhiều nhất $10$ quyển vở.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn tất cả các bất phương trình bậc nhất một ẩn.',
      options: [
        '$2x - 3 > 0$',
        '$0x + 5 \\le 0$',
        '$x^2 - 1 < 0$',
        '$-x + 4 \\ge 0$',
        '$\\dfrac{1}{x} + 1 > 0$',
      ],
      answers: [0, 3],
      hints: [
        'Dạng $ax + b < 0$ (hoặc $>$, $\\le$, $\\ge$) với $a \\ne 0$; ẩn không có mũ $2$, không nằm ở mẫu.',
      ],
      solution:
        '$2x - 3 > 0$ ($a = 2$) và $-x + 4 \\ge 0$ ($a = -1$) là bất phương trình bậc nhất một ẩn. $0x + 5 \\le 0$ có $a = 0$; $x^2 - 1 < 0$ có $x^2$; $\\dfrac{1}{x} + 1 > 0$ có ẩn ở mẫu.',
    },
    {
      type: 'choice',
      prompt: 'Số nào sau đây là một nghiệm của bất phương trình $3x - 7 > 2$?',
      options: ['$1$', '$2$', '$3$', '$4$'],
      answer: 3,
      hints: ['Thay từng số vào và xem khẳng định nào đúng.', 'Hoặc giải: $3x > 9$.'],
      solution:
        '$3x - 7 > 2$ tương đương $3x > 9$, tức $x > 3$. Trong các số đã cho chỉ có $4$ thoả mãn: $3 \\cdot 4 - 7 = 5 > 2$. Với $x = 3$: $3 \\cdot 3 - 7 = 2 > 2$ là khẳng định sai.',
    },
    {
      type: 'choice',
      prompt: 'Nghiệm của bất phương trình $-4x + 12 \\ge 0$ là',
      options: ['$x \\le 3$', '$x \\ge 3$', '$x \\le -3$', '$x \\ge -3$'],
      answer: 0,
      hints: ['Chuyển $12$ sang vế phải rồi chia cho $-4$. Nhớ: chia cho số âm thì đổi chiều.'],
      solution:
        '$-4x + 12 \\ge 0$ nên $-4x \\ge -12$. Chia hai vế cho $-4 < 0$, đổi chiều: $x \\le 3$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số nguyên nhỏ nhất thoả mãn bất phương trình $5x - 3 > 2x + 9$.',
      answer: 5,
      hints: ['Chuyển các hạng tử chứa $x$ sang vế trái, hằng số sang vế phải.', 'Được $3x > 12$.'],
      solution:
        '$5x - 2x > 9 + 3$, tức $3x > 12$, nên $x > 4$. Số nguyên nhỏ nhất lớn hơn $4$ là $5$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số nguyên lớn nhất thoả mãn bất phương trình $2(x - 1) \\ge 5x - 14$.',
      answer: 4,
      hints: [
        'Bỏ ngoặc: $2x - 2 \\ge 5x - 14$.',
        'Thu gọn được $-3x \\ge -12$; chia cho $-3$ thì đổi chiều.',
      ],
      solution:
        '$2x - 2 \\ge 5x - 14$ nên $2x - 5x \\ge -14 + 2$, tức $-3x \\ge -12$. Chia cho $-3 < 0$, đổi chiều: $x \\le 4$. Số nguyên lớn nhất là $4$.',
    },
    {
      type: 'choice',
      prompt: 'Trên trục số, tập nghiệm $x \\le -2$ được biểu diễn bởi',
      options: [
        'phần bên trái điểm $-2$, đánh dấu $]$ tại $-2$',
        'phần bên trái điểm $-2$, đánh dấu $)$ tại $-2$',
        'phần bên phải điểm $-2$, đánh dấu $[$ tại $-2$',
        'phần bên phải điểm $-2$, đánh dấu $($ tại $-2$',
      ],
      answer: 0,
      hints: ['$x \\le -2$: các số nhỏ hơn $-2$ nằm bên nào? Có lấy $-2$ không?'],
      solution:
        'Các số $x \\le -2$ nằm bên trái điểm $-2$, kể cả $-2$. Đầu mút thuộc tập nghiệm nên dùng ngoặc vuông $]$; phần bên phải bị gạch bỏ.',
    },
    {
      type: 'fraction',
      prompt:
        'Nghiệm của bất phương trình $3x + 2 < 0$ có dạng $x < k$. Tìm $k$ (nhập dưới dạng phân số).',
      answer: [-2, 3],
      hints: ['Chuyển $2$ sang vế phải rồi chia cho $3$.'],
      solution:
        '$3x + 2 < 0$ nên $3x < -2$. Chia cho $3 > 0$: $x < -\\dfrac{2}{3}$. Vậy $k = -\\dfrac{2}{3}$.',
    },
    {
      type: 'choice',
      prompt: 'Bạn Nam giải $-2x > 8$ và được $x > -4$. Kết luận đúng là gì?',
      options: [
        'Nam sai, nghiệm đúng là $x < -4$',
        'Nam đúng',
        'Nam sai, nghiệm đúng là $x > 4$',
        'Nam sai, nghiệm đúng là $x < 4$',
      ],
      answer: 0,
      hints: ['Nam chia hai vế cho $-2$. Chiều của bất phương trình phải thế nào?'],
      solution:
        'Chia hai vế cho $-2 < 0$ phải đổi chiều: $x < \\dfrac{8}{-2} = -4$. Thử lại với $x = -5$: $-2 \\cdot (-5) = 10 > 8$, đúng.',
    },
    {
      type: 'number',
      prompt:
        'Giá cước một hãng taxi gồm $15$ nghìn đồng phí mở cửa và $12$ nghìn đồng cho mỗi ki-lô-mét. Với $100$ nghìn đồng, hành khách đi được nhiều nhất bao nhiêu ki-lô-mét (số nguyên)?',
      answer: 7,
      unit: 'km',
      hints: [
        'Gọi $x$ là số ki-lô-mét: $15 + 12x \\le 100$.',
        'Giải được $x \\le \\dfrac{85}{12}$.',
      ],
      solution:
        'Gọi $x$ (km) là quãng đường, $x \\ge 0$. Ta có $15 + 12x \\le 100$, nên $12x \\le 85$, tức $x \\le \\dfrac{85}{12} \\approx 7{,}08$. Số nguyên lớn nhất là $7$: hành khách đi được nhiều nhất $7$ km.',
    },
  ],
  takeaways: [
    'Bất phương trình bậc nhất một ẩn: $ax + b < 0$ (hoặc $>$, $\\le$, $\\ge$) với $a \\ne 0$.',
    'Chuyển vế thì đổi dấu hạng tử; nhân (chia) với số dương giữ chiều, với số âm đổi chiều.',
    '$ax + b > 0$: nếu $a > 0$ thì $x > -\\dfrac{b}{a}$; nếu $a < 0$ thì $x < -\\dfrac{b}{a}$.',
    'Trên trục số: gạch bỏ phần không là nghiệm; ngoặc vuông khi lấy đầu mút, ngoặc tròn khi không lấy.',
  ],
};
