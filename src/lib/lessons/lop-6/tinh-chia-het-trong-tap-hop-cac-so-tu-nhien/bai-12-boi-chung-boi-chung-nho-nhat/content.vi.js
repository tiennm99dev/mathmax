/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bội chung và bội chung nhỏ nhất của hai hay nhiều số, cách tìm BCNN bằng phân tích ra thừa số nguyên tố, và cách dùng BCNN để quy đồng mẫu các phân số.',
  intro:
    'Hai chiếc đèn trang trí cùng bật lúc $0$ giây: đèn A cứ $6$ giây nháy một lần, đèn B cứ $8$ giây nháy một lần. Sau bao lâu hai đèn lại nháy cùng lúc? Câu trả lời là một số vừa là bội của $6$ vừa là bội của $8$, và nhỏ nhất: bội chung nhỏ nhất.',
  objectives: [
    'Hiểu bội chung, bội chung nhỏ nhất và kí hiệu $\\text{BC}(a, b)$, $\\text{BCNN}(a, b)$.',
    'Tìm BCNN bằng cách phân tích các số ra thừa số nguyên tố; tìm bội chung thông qua BCNN.',
    'Dùng BCNN của các mẫu để quy đồng mẫu, cộng và trừ phân số.',
  ],
  sections: [
    {
      heading: 'Bội chung và bội chung nhỏ nhất',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Bội chung',
          text: 'Một số được gọi là bội chung của hai hay nhiều số nếu nó là bội của tất cả các số đó. Tập hợp các bội chung của $a$ và $b$ kí hiệu là $\\text{BC}(a, b)$: $x \\in \\text{BC}(a, b)$ nếu $x \\vdots a$ và $x \\vdots b$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Bội chung nhỏ nhất',
          text: 'Bội chung nhỏ nhất của hai hay nhiều số là số nhỏ nhất khác $0$ trong tập hợp các bội chung của các số đó, kí hiệu $\\text{BCNN}(a, b)$.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $\\text{B}(6) = \\{0; 6; 12; 18; 24; 30; 36; 42; 48; \\ldots\\}$ và $\\text{B}(8) = \\{0; 8; 16; 24; 32; 40; 48; \\ldots\\}$, nên $\\text{BC}(6, 8) = \\{0; 24; 48; \\ldots\\}$ và $\\text{BCNN}(6, 8) = 24$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Tất cả các bội chung của $a$ và $b$ đều là bội của $\\text{BCNN}(a, b)$. Vì vậy muốn tìm $\\text{BC}(a, b)$, ta tìm các bội của $\\text{BCNN}(a, b)$.',
        },
        {
          type: 'p',
          text: 'Mọi số tự nhiên đều là bội của $1$, nên với mọi số tự nhiên $a$ và $b$ khác $0$: $\\text{BCNN}(a, 1) = a$ và $\\text{BCNN}(a, b, 1) = \\text{BCNN}(a, b)$.',
        },
      ],
    },
    {
      heading: 'Tìm BCNN bằng cách phân tích ra thừa số nguyên tố',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Phân tích mỗi số ra thừa số nguyên tố.',
            'Chọn ra các thừa số nguyên tố chung và riêng.',
            'Lập tích các thừa số đã chọn, mỗi thừa số lấy với số mũ lớn nhất của nó. Tích đó là BCNN phải tìm.',
          ],
        },
        { type: 'tex', tex: '36 = 2^2 \\cdot 3^2, \\quad 84 = 2^2 \\cdot 3 \\cdot 7' },
        {
          type: 'p',
          text: 'Thừa số chung là $2$ và $3$, thừa số riêng là $7$. Số mũ lớn nhất của $2$ là $2$, của $3$ là $2$, của $7$ là $1$. Vậy $\\text{BCNN}(36, 84) = 2^2 \\cdot 3^2 \\cdot 7 = 252$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'So sánh với ƯCLN',
          text: 'ƯCLN chỉ lấy các thừa số chung với số mũ nhỏ nhất; BCNN lấy cả thừa số chung và riêng với số mũ lớn nhất.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Nếu $a$ và $b$ nguyên tố cùng nhau thì $\\text{BCNN}(a, b) = a \\cdot b$, ví dụ $\\text{BCNN}(8, 15) = 120$. Trong các số đã cho, nếu số lớn nhất là bội của các số còn lại thì BCNN của chúng là số lớn nhất ấy, ví dụ $\\text{BCNN}(6, 12, 24) = 24$.',
        },
      ],
    },
    {
      heading: 'Ứng dụng: quy đồng mẫu các phân số',
      blocks: [
        {
          type: 'p',
          text: 'Để quy đồng mẫu nhiều phân số, ta thường lấy mẫu chung là BCNN của các mẫu (mẫu chung nhỏ nhất). Sau đó tìm thừa số phụ của mỗi mẫu bằng cách chia mẫu chung cho mẫu đó, rồi nhân cả tử và mẫu với thừa số phụ.',
        },
        {
          type: 'tex',
          tex: '\\frac{1}{6} + \\frac{5}{8} = \\frac{1 \\cdot 4}{24} + \\frac{5 \\cdot 3}{24} = \\frac{4}{24} + \\frac{15}{24} = \\frac{19}{24}',
        },
        {
          type: 'p',
          text: 'Ở đây $\\text{BCNN}(6, 8) = 24$, thừa số phụ của $6$ là $24 : 6 = 4$, của $8$ là $24 : 8 = 3$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hai dãy đèn nhấp nháy',
    instruction:
      'Chọn chu kì $a$ của đèn A và $b$ của đèn B rồi bấm "Bắt đầu" (hoặc "+1 giây" để đi từng giây). Đồng hồ tự dừng khi hai đèn cùng sáng: lần đầu tiên chính là $\\text{BCNN}(a, b)$. Bấm "Chạy tiếp" để thấy các lần cùng sáng sau đều là bội của BCNN.',
  },
  examples: [
    {
      problem:
        'Tìm $\\text{BCNN}(36, 84)$ rồi viết tập hợp các bội chung của $36$ và $84$ nhỏ hơn $1\\,000$.',
      steps: [
        '$36 = 2^2 \\cdot 3^2$ và $84 = 2^2 \\cdot 3 \\cdot 7$.',
        'Thừa số chung và riêng là $2, 3, 7$; lấy số mũ lớn nhất: $2^2 \\cdot 3^2 \\cdot 7 = 252$.',
        'Các bội chung là các bội của $252$: $0; 252; 504; 756; 1\\,008; \\ldots$',
      ],
      answer:
        '$\\text{BCNN}(36, 84) = 252$; các bội chung nhỏ hơn $1\\,000$ là $0; 252; 504; 756$.',
    },
    {
      problem: 'Quy đồng mẫu hai phân số $\\dfrac{5}{12}$ và $\\dfrac{7}{30}$.',
      steps: [
        '$12 = 2^2 \\cdot 3$, $30 = 2 \\cdot 3 \\cdot 5$, nên $\\text{BCNN}(12, 30) = 2^2 \\cdot 3 \\cdot 5 = 60$. Lấy mẫu chung là $60$.',
        'Thừa số phụ: $60 : 12 = 5$ và $60 : 30 = 2$.',
        '$\\dfrac{5}{12} = \\dfrac{5 \\cdot 5}{12 \\cdot 5} = \\dfrac{25}{60}$; $\\dfrac{7}{30} = \\dfrac{7 \\cdot 2}{30 \\cdot 2} = \\dfrac{14}{60}$.',
      ],
      answer: '$\\dfrac{25}{60}$ và $\\dfrac{14}{60}$.',
    },
    {
      problem:
        'Bạn An cứ $4$ ngày trực nhật một lần, bạn Bình cứ $6$ ngày trực nhật một lần. Hôm nay hai bạn cùng trực nhật. Sau ít nhất bao nhiêu ngày nữa hai bạn lại cùng trực nhật?',
      steps: [
        'Số ngày cần tìm là một bội chung của $4$ và $6$, và là số nhỏ nhất khác $0$.',
        '$4 = 2^2$, $6 = 2 \\cdot 3$, nên $\\text{BCNN}(4, 6) = 2^2 \\cdot 3 = 12$.',
      ],
      answer: 'Sau ít nhất $12$ ngày.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tìm $\\text{BCNN}(12, 18)$.',
      answer: 36,
      hints: ['$12 = 2^2 \\cdot 3$ và $18 = 2 \\cdot 3^2$.', 'Lấy mỗi thừa số với số mũ lớn nhất.'],
      solution: '$\\text{BCNN}(12, 18) = 2^2 \\cdot 3^2 = 36$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $\\text{BCNN}(8, 15)$.',
      answer: 120,
      hints: ['$8 = 2^3$ và $15 = 3 \\cdot 5$ có thừa số nguyên tố chung nào không?'],
      solution: '$8$ và $15$ nguyên tố cùng nhau nên $\\text{BCNN}(8, 15) = 8 \\cdot 15 = 120$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $\\text{BCNN}(6, 12, 24)$.',
      answer: 24,
      hints: ['Số lớn nhất có phải là bội của các số còn lại không?'],
      solution: '$24 \\vdots 6$ và $24 \\vdots 12$, nên $\\text{BCNN}(6, 12, 24) = 24$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các số là bội chung của $4$ và $6$.',
      options: ['$12$', '$18$', '$24$', '$30$', '$36$', '$42$'],
      answers: [0, 2, 4],
      hints: [
        'Tìm $\\text{BCNN}(4, 6)$ trước.',
        'Bội chung của $4$ và $6$ là các bội của $\\text{BCNN}(4, 6) = 12$.',
      ],
      solution:
        '$\\text{BCNN}(4, 6) = 12$, nên bội chung là $0; 12; 24; 36; 48; \\ldots$ Trong các lựa chọn có $12, 24, 36$. Các số $18, 30, 42$ không chia hết cho $4$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $\\text{BCNN}(30, 45)$.',
      answer: 90,
      hints: [
        '$30 = 2 \\cdot 3 \\cdot 5$ và $45 = 3^2 \\cdot 5$.',
        'Thừa số riêng $2$ cũng phải lấy.',
      ],
      solution: '$\\text{BCNN}(30, 45) = 2 \\cdot 3^2 \\cdot 5 = 90$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số tự nhiên $a$ nhỏ nhất khác $0$ sao cho $a \\vdots 18$ và $a \\vdots 24$.',
      answer: 72,
      hints: [
        '$a$ là bội chung nhỏ nhất khác $0$ của $18$ và $24$.',
        '$18 = 2 \\cdot 3^2$, $24 = 2^3 \\cdot 3$.',
      ],
      solution: '$a = \\text{BCNN}(18, 24) = 2^3 \\cdot 3^2 = 72$.',
    },
    {
      type: 'number',
      prompt:
        'Mẫu chung nhỏ nhất của hai phân số $\\dfrac{5}{12}$ và $\\dfrac{7}{30}$ là bao nhiêu?',
      answer: 60,
      hints: ['Mẫu chung nhỏ nhất là BCNN của các mẫu.'],
      solution:
        '$12 = 2^2 \\cdot 3$, $30 = 2 \\cdot 3 \\cdot 5$, nên mẫu chung nhỏ nhất là $2^2 \\cdot 3 \\cdot 5 = 60$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\dfrac{1}{6} + \\dfrac{5}{8}$ (viết kết quả dưới dạng phân số tối giản).',
      answer: [19, 24],
      simplest: true,
      hints: ['$\\text{BCNN}(6, 8) = 24$.', 'Thừa số phụ là $4$ và $3$.'],
      solution:
        '$\\dfrac{1}{6} + \\dfrac{5}{8} = \\dfrac{4}{24} + \\dfrac{15}{24} = \\dfrac{19}{24}$.',
    },
    {
      type: 'number',
      prompt:
        'Xe buýt tuyến 1 cứ $10$ phút xuất bến một chuyến, tuyến 2 cứ $12$ phút một chuyến. Lúc $6$ giờ, hai tuyến cùng xuất bến. Sau ít nhất bao nhiêu phút nữa hai tuyến lại cùng xuất bến?',
      answer: 60,
      unit: 'phút',
      hints: ['Thời gian cần tìm là bội chung nhỏ nhất của $10$ và $12$.'],
      solution:
        '$10 = 2 \\cdot 5$, $12 = 2^2 \\cdot 3$, $\\text{BCNN}(10, 12) = 2^2 \\cdot 3 \\cdot 5 = 60$. Sau $60$ phút, tức lúc $7$ giờ, hai tuyến lại cùng xuất bến.',
    },
    {
      type: 'number',
      prompt:
        'Số học sinh khối 6 của một trường từ $100$ đến $150$ em. Khi xếp hàng $3$, hàng $4$ hay hàng $5$ đều vừa đủ. Khối 6 có bao nhiêu học sinh?',
      answer: 120,
      hints: [
        'Số học sinh là một bội chung của $3$, $4$ và $5$.',
        '$\\text{BCNN}(3, 4, 5) = 60$; tìm bội của $60$ trong khoảng đã cho.',
      ],
      solution:
        'Số học sinh thuộc $\\text{BC}(3, 4, 5) = \\{0; 60; 120; 180; \\ldots\\}$. Chỉ $120$ nằm từ $100$ đến $150$. Vậy khối 6 có $120$ học sinh.',
    },
  ],
  takeaways: [
    '$\\text{BCNN}(a, b)$ là số nhỏ nhất khác $0$ chia hết cho cả $a$ và $b$; mọi bội chung đều là bội của nó.',
    'Phân tích ra thừa số nguyên tố: lấy các thừa số chung và riêng, mỗi thừa số với số mũ lớn nhất.',
    'Hai số nguyên tố cùng nhau thì BCNN bằng tích của chúng.',
    'Quy đồng mẫu: lấy mẫu chung là BCNN của các mẫu.',
  ],
};
