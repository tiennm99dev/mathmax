/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Căn bậc hai của một số không âm, căn bậc hai số học, căn thức bậc hai và điều kiện xác định, hằng đẳng thức căn của A bình phương bằng giá trị tuyệt đối của A.',
  intro:
    'Một mảnh vườn hình vuông có diện tích $30{,}25$ m². Cạnh của mảnh vườn dài bao nhiêu mét? Ta cần tìm số dương $x$ sao cho $x^2 = 30{,}25$. Ở lớp 7, em đã biết số đó là căn bậc hai số học $\\sqrt{30{,}25} = 5{,}5$. Bài này mở rộng khái niệm căn bậc hai và làm quen với các biểu thức chứa căn.',
  objectives: [
    'Nhận biết căn bậc hai và căn bậc hai số học của một số thực không âm.',
    'Tính căn bậc hai của một số bằng cách nhẩm hoặc bằng máy tính cầm tay.',
    'Nhận biết căn thức bậc hai và tìm điều kiện xác định của nó.',
    'Vận dụng hằng đẳng thức $\\sqrt{A^2} = |A|$ để tính và rút gọn.',
  ],
  sections: [
    {
      heading: 'Căn bậc hai',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Căn bậc hai của một số thực $a$ không âm là số thực $x$ sao cho $x^2 = a$.',
        },
        {
          type: 'list',
          items: [
            'Số âm không có căn bậc hai, vì bình phương của mọi số thực đều không âm.',
            'Số $0$ có đúng một căn bậc hai là $0$, viết $\\sqrt{0} = 0$.',
            'Số dương $a$ có đúng hai căn bậc hai là hai số đối nhau: số dương kí hiệu là $\\sqrt{a}$ (gọi là căn bậc hai số học của $a$) và số âm là $-\\sqrt{a}$.',
          ],
        },
        {
          type: 'p',
          text: 'Chẳng hạn, $16$ có hai căn bậc hai là $4$ và $-4$ vì $4^2 = (-4)^2 = 16$; căn bậc hai số học của $16$ là $\\sqrt{16} = 4$. Số $-16$ không có căn bậc hai.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhận xét',
          text: 'Với $a \\ge 0$ ta có $\\sqrt{a} \\ge 0$ và $(\\sqrt{a})^2 = a$. Với mọi số thực $a$ ta có $\\sqrt{a^2} = |a|$.',
        },
        {
          type: 'p',
          text: 'Khi $a$ không phải là bình phương của một số hữu tỉ, $\\sqrt{a}$ là số vô tỉ; ta dùng máy tính cầm tay (phím $\\sqrt{\\;\\;}$) để tính gần đúng. Ví dụ $\\sqrt{2} \\approx 1{,}414$; $\\sqrt{12} \\approx 3{,}46$ (làm tròn đến hàng phần trăm).',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Phân biệt',
          text: '"Căn bậc hai của $9$" là hai số $3$ và $-3$. Còn kí hiệu $\\sqrt{9}$ chỉ căn bậc hai số học, $\\sqrt{9} = 3$; viết $\\sqrt{9} = \\pm 3$ là sai.',
        },
      ],
    },
    {
      heading: 'Căn thức bậc hai',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Căn thức bậc hai là biểu thức có dạng $\\sqrt{A}$, trong đó $A$ là một biểu thức đại số. $A$ được gọi là biểu thức lấy căn hay biểu thức dưới dấu căn.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Điều kiện xác định',
          text: '$\\sqrt{A}$ xác định (hay có nghĩa) khi $A$ lấy giá trị không âm, tức là $A \\ge 0$. Ta nói $A \\ge 0$ là điều kiện xác định của $\\sqrt{A}$.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $\\sqrt{x - 2}$ và $\\sqrt{x^2 + 1}$ là các căn thức bậc hai. $\\sqrt{x - 2}$ xác định khi $x - 2 \\ge 0$, tức $x \\ge 2$. $\\sqrt{x^2 + 1}$ xác định với mọi $x$ vì $x^2 + 1 > 0$.',
        },
        {
          type: 'p',
          text: 'Để tính giá trị của $\\sqrt{A}$ tại một giá trị của biến (thoả mãn điều kiện xác định), ta thay giá trị đó vào $A$ rồi khai căn. Với $x = 11$: $\\sqrt{x - 2} = \\sqrt{9} = 3$.',
        },
      ],
    },
    {
      heading: 'Hằng đẳng thức √(A²) = |A|',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hằng đẳng thức',
          text: 'Với $A$ là một biểu thức, ta có $\\sqrt{A^2} = |A|$, nghĩa là $\\sqrt{A^2} = A$ nếu $A \\ge 0$ và $\\sqrt{A^2} = -A$ nếu $A < 0$.',
        },
        {
          type: 'table',
          head: ['Biểu thức', 'Dấu của $A$', 'Kết quả'],
          rows: [
            ['$\\sqrt{5^2}$', '$5 > 0$', '$5$'],
            ['$\\sqrt{(-5)^2}$', '$-5 < 0$', '$-(-5) = 5$'],
            ['$\\sqrt{(1 - \\sqrt{2})^2}$', '$1 - \\sqrt{2} < 0$', '$\\sqrt{2} - 1$'],
            ['$\\sqrt{(x - 3)^2}$ với $x \\ge 3$', '$x - 3 \\ge 0$', '$x - 3$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Viết $\\sqrt{(-5)^2} = -5$. Căn bậc hai số học không bao giờ âm, nên phải lấy giá trị tuyệt đối: $\\sqrt{(-5)^2} = |-5| = 5$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đọc căn bậc hai trên đồ thị',
    instruction:
      'Ở chế độ "Căn bậc hai của a", kéo ô vuông cam trên trục tung (hoặc dùng phím mũi tên) để đổi $a$. Đường thẳng $y = a$ cắt parabol $y = x^2$ tại các điểm có hoành độ là căn bậc hai của $a$: hai điểm, một điểm hay không điểm nào? Ở chế độ $\\sqrt{x^2} = |x|$, kéo điểm trên parabol sang trái phải và so sánh $\\sqrt{x^2}$ với $x$.',
  },
  examples: [
    {
      problem: 'Tìm các căn bậc hai của $49$ và của $\\dfrac{9}{16}$.',
      steps: [
        '$7^2 = 49$ và $(-7)^2 = 49$, nên $49$ có hai căn bậc hai là $7$ và $-7$.',
        '$\\left(\\dfrac{3}{4}\\right)^2 = \\dfrac{9}{16}$ và $\\left(-\\dfrac{3}{4}\\right)^2 = \\dfrac{9}{16}$.',
      ],
      answer:
        'Căn bậc hai của $49$ là $7$ và $-7$; căn bậc hai của $\\dfrac{9}{16}$ là $\\dfrac{3}{4}$ và $-\\dfrac{3}{4}$.',
    },
    {
      problem: 'Tìm điều kiện xác định của $\\sqrt{2x - 6}$ và tính giá trị của nó tại $x = 5$.',
      steps: [
        '$\\sqrt{2x - 6}$ xác định khi $2x - 6 \\ge 0$, tức $2x \\ge 6$, hay $x \\ge 3$.',
        '$x = 5$ thoả mãn $x \\ge 3$. Thay vào: $\\sqrt{2 \\cdot 5 - 6} = \\sqrt{4} = 2$.',
      ],
      answer: 'Điều kiện xác định là $x \\ge 3$; tại $x = 5$, giá trị bằng $2$.',
    },
    {
      problem: 'Rút gọn $\\sqrt{(2 - \\sqrt{5})^2}$.',
      steps: [
        'Theo hằng đẳng thức, $\\sqrt{(2 - \\sqrt{5})^2} = |2 - \\sqrt{5}|$.',
        'Vì $4 < 5$ nên $2 = \\sqrt{4} < \\sqrt{5}$, do đó $2 - \\sqrt{5} < 0$.',
        'Vậy $|2 - \\sqrt{5}| = -(2 - \\sqrt{5}) = \\sqrt{5} - 2$.',
      ],
      answer: '$\\sqrt{(2 - \\sqrt{5})^2} = \\sqrt{5} - 2$.',
    },
    {
      problem: 'Rút gọn $\\sqrt{x^2 - 6x + 9}$ với $x < 3$.',
      steps: [
        '$x^2 - 6x + 9 = (x - 3)^2$, nên $\\sqrt{x^2 - 6x + 9} = \\sqrt{(x - 3)^2} = |x - 3|$.',
        'Với $x < 3$ thì $x - 3 < 0$, nên $|x - 3| = 3 - x$.',
      ],
      answer: '$\\sqrt{x^2 - 6x + 9} = 3 - x$ với $x < 3$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Căn bậc hai của $81$ là',
      options: ['$9$', '$-9$', '$9$ và $-9$', '$\\sqrt{9}$'],
      answer: 2,
      hints: ['Số dương có mấy căn bậc hai?', 'Tìm mọi số $x$ sao cho $x^2 = 81$.'],
      solution:
        '$9^2 = (-9)^2 = 81$, nên $81$ có hai căn bậc hai là $9$ và $-9$. Căn bậc hai số học của $81$ là $\\sqrt{81} = 9$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các số có căn bậc hai.',
      options: ['$4$', '$-9$', '$0$', '$0{,}25$', '$-\\dfrac{1}{4}$'],
      answers: [0, 2, 3],
      hints: ['Chỉ số không âm mới có căn bậc hai.'],
      solution:
        '$4$, $0$ và $0{,}25$ không âm nên có căn bậc hai ($\\pm 2$; $0$; $\\pm 0{,}5$). Hai số $-9$ và $-\\dfrac{1}{4}$ âm nên không có căn bậc hai.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\sqrt{0{,}36}$.',
      answer: 0.6,
      hints: ['Số dương nào bình phương bằng $0{,}36$?', '$6^2 = 36$.'],
      solution: '$0{,}6^2 = 0{,}36$ và $0{,}6 > 0$, nên $\\sqrt{0{,}36} = 0{,}6$.',
    },
    {
      type: 'number',
      prompt: 'Dùng máy tính cầm tay, tính $\\sqrt{12}$ rồi làm tròn kết quả đến hàng phần trăm.',
      answer: 3.46,
      hints: [
        'Bấm $\\sqrt{\\;\\;}$ rồi $12$.',
        'Máy cho $3{,}464\\ldots$; xem chữ số hàng phần nghìn.',
      ],
      solution:
        '$\\sqrt{12} = 3{,}4641\\ldots$ Chữ số hàng phần nghìn là $4 < 5$, nên làm tròn đến hàng phần trăm được $3{,}46$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\sqrt{(-7)^2}$.',
      answer: 7,
      hints: ['Dùng $\\sqrt{A^2} = |A|$.', 'Căn bậc hai số học không âm.'],
      solution: '$\\sqrt{(-7)^2} = |-7| = 7$. (Cũng có thể tính $(-7)^2 = 49$, $\\sqrt{49} = 7$.)',
    },
    {
      type: 'number',
      prompt: 'Tìm số $x$ nhỏ nhất để căn thức $\\sqrt{3x - 12}$ xác định.',
      answer: 4,
      hints: ['$\\sqrt{A}$ xác định khi $A \\ge 0$.', 'Giải bất phương trình $3x - 12 \\ge 0$.'],
      solution:
        '$\\sqrt{3x - 12}$ xác định khi $3x - 12 \\ge 0$, tức $x \\ge 4$. Số nhỏ nhất thoả mãn là $x = 4$.',
    },
    {
      type: 'choice',
      prompt: 'Điều kiện xác định của $\\sqrt{5 - 2x}$ là',
      options: [
        '$x \\le \\dfrac{5}{2}$',
        '$x \\ge \\dfrac{5}{2}$',
        '$x \\ge -\\dfrac{5}{2}$',
        '$x < \\dfrac{5}{2}$',
      ],
      answer: 0,
      hints: ['Cần $5 - 2x \\ge 0$.', 'Chia hai vế cho $-2$ thì đổi chiều bất đẳng thức.'],
      solution:
        '$5 - 2x \\ge 0$ nên $-2x \\ge -5$, chia cho $-2 < 0$ và đổi chiều: $x \\le \\dfrac{5}{2}$. Dấu bằng được lấy vì $\\sqrt{0} = 0$ vẫn xác định.',
    },
    {
      type: 'choice',
      prompt: 'Rút gọn $\\sqrt{(3 - \\sqrt{10})^2}$.',
      options: ['$3 - \\sqrt{10}$', '$\\sqrt{10} - 3$', '$3 + \\sqrt{10}$', '$-3 - \\sqrt{10}$'],
      answer: 1,
      hints: [
        'Kết quả là $|3 - \\sqrt{10}|$.',
        'So sánh $3 = \\sqrt{9}$ với $\\sqrt{10}$ để biết dấu của $3 - \\sqrt{10}$.',
      ],
      solution:
        '$\\sqrt{(3 - \\sqrt{10})^2} = |3 - \\sqrt{10}|$. Vì $\\sqrt{9} < \\sqrt{10}$ nên $3 - \\sqrt{10} < 0$, do đó kết quả là $\\sqrt{10} - 3$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của $\\sqrt{x^2 - 6x + 9}$ tại $x = -2$.',
      answer: 5,
      hints: ['$x^2 - 6x + 9 = (x - 3)^2$.', 'Biểu thức bằng $|x - 3|$.'],
      solution:
        '$\\sqrt{x^2 - 6x + 9} = \\sqrt{(x - 3)^2} = |x - 3|$. Tại $x = -2$: $|-2 - 3| = |-5| = 5$.',
    },
    {
      type: 'number',
      prompt: 'Một mảnh vườn hình vuông có diện tích $30{,}25$ m². Tính độ dài cạnh của mảnh vườn.',
      answer: 5.5,
      unit: 'm',
      hints: ['Cạnh $x > 0$ thoả mãn $x^2 = 30{,}25$.', '$55^2 = 3\\,025$.'],
      solution:
        'Cạnh là căn bậc hai số học của diện tích: $x = \\sqrt{30{,}25} = 5{,}5$ (m), vì $5{,}5^2 = 30{,}25$.',
    },
  ],
  takeaways: [
    'Căn bậc hai của $a \\ge 0$ là số $x$ sao cho $x^2 = a$. Số dương có hai căn bậc hai $\\pm\\sqrt{a}$, số $0$ có một, số âm không có.',
    '$\\sqrt{a}$ là căn bậc hai số học: $\\sqrt{a} \\ge 0$ và $(\\sqrt{a})^2 = a$.',
    '$\\sqrt{A}$ xác định khi $A \\ge 0$.',
    '$\\sqrt{A^2} = |A|$: bằng $A$ khi $A \\ge 0$, bằng $-A$ khi $A < 0$.',
  ],
};
