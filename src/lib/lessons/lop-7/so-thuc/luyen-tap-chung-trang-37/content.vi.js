/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về số thập phân vô hạn tuần hoàn, làm tròn theo độ chính xác, số vô tỉ, căn bậc hai số học, so sánh số thực và giá trị tuyệt đối.',
  intro:
    'Bài luyện tập này ôn lại cả ba bài của chương: Làm quen với số thập phân vô hạn tuần hoàn (Bài 5), Số vô tỉ, căn bậc hai số học (Bài 6) và Tập hợp các số thực (Bài 7). Em sẽ viết phân số dưới dạng số thập phân, làm tròn số, tính căn bậc hai số học, so sánh các số thực và tính giá trị tuyệt đối.',
  objectives: [
    'Viết phân số dưới dạng số thập phân hữu hạn hoặc vô hạn tuần hoàn và làm tròn theo độ chính xác cho trước.',
    'Tính căn bậc hai số học, ước lượng căn bậc hai và nhận biết số vô tỉ.',
    'So sánh, sắp xếp các số thực; tính giá trị tuyệt đối và tìm $x$ trong các bài toán đơn giản.',
  ],
  sections: [
    {
      heading: 'Nhắc lại kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Số thập phân',
              'Số hữu tỉ là số thập phân hữu hạn hoặc vô hạn tuần hoàn: $\\frac{5}{12} = 0{,}41(6)$. Phân số tối giản mẫu dương có mẫu chỉ có ước nguyên tố $2$, $5$ thì là số thập phân hữu hạn.',
            ],
            [
              'Độ chính xác',
              'Độ chính xác $0{,}5$; $0{,}05$; $0{,}005$: làm tròn đến hàng đơn vị, phần mười, phần trăm.',
            ],
            [
              'Số vô tỉ',
              'Số thập phân vô hạn không tuần hoàn, như $\\sqrt{2}$, $\\pi$; tập hợp $\\mathbb{I}$.',
            ],
            [
              'Căn bậc hai số học',
              'Với $a \\ge 0$: $\\sqrt{a} = x \\iff x \\ge 0$ và $x^2 = a$; $\\;\\left(\\sqrt{a}\\right)^2 = a$.',
            ],
            [
              'Số thực',
              '$\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$, $\\mathbb{I} \\subset \\mathbb{R}$. So sánh bằng cách viết dưới dạng số thập phân.',
            ],
            [
              'Giá trị tuyệt đối',
              '$|a| = a$ nếu $a \\ge 0$; $|a| = -a$ nếu $a < 0$. $|x| = a$ ($a > 0$) khi $x = a$ hoặc $x = -a$.',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Lưu ý khi làm bài',
      blocks: [
        {
          type: 'list',
          items: [
            'Rút gọn phân số trước khi xét mẫu có ước nguyên tố nào: $\\frac{9}{30} = \\frac{3}{10} = 0{,}3$.',
            'Làm tròn số vô hạn tuần hoàn: viết thêm vài chữ số của chu kì để thấy chữ số ngay sau hàng làm tròn.',
            '$\\sqrt{a}$ luôn không âm: $\\sqrt{(-6)^2} = \\sqrt{36} = 6$, không phải $-6$.',
            'So sánh hai số âm: số nào có giá trị tuyệt đối lớn hơn thì nhỏ hơn.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện trộn ngẫu nhiên',
    instruction:
      'Mỗi lượt có 9 câu trộn ngẫu nhiên từ ba bài của chương. Nhập số nguyên (ví dụ $-4$), phân số dạng a/b (ví dụ 3/8) hoặc số thập phân có dấu phẩy (ví dụ $2{,}45$). Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra.',
  },
  examples: [
    {
      problem:
        'Cho $a = \\frac{2}{11}$ và $b = \\sqrt{0{,}04}$. Viết $a$ dưới dạng số thập phân, tính $b$ rồi so sánh $a$ và $b$.',
      steps: [
        'Chia $2 : 11$: các số dư lặp lại $2, 9, 2, 9, \\ldots$ nên $a = 0{,}1818\\ldots = 0{,}(18)$.',
        '$0{,}2^2 = 0{,}04$ và $0{,}2 \\ge 0$ nên $b = 0{,}2$.',
        'So sánh $0{,}18\\ldots$ với $0{,}20$: ở hàng phần mười $1 < 2$, nên $a < b$.',
      ],
      answer: '$a = 0{,}(18) < 0{,}2 = b$.',
    },
    {
      problem: 'Tìm $x$, biết $|x| = \\left(\\sqrt{3}\\right)^2 - 1{,}5$.',
      steps: [
        '$\\left(\\sqrt{3}\\right)^2 = 3$ nên $|x| = 3 - 1{,}5 = 1{,}5$.',
        'Hai số có giá trị tuyệt đối bằng $1{,}5$ là $1{,}5$ và $-1{,}5$.',
      ],
      answer: '$x = 1{,}5$ hoặc $x = -1{,}5$.',
    },
  ],
  practice: [
    {
      type: 'text',
      prompt:
        'Viết phân số $\\frac{5}{12}$ dưới dạng số thập phân vô hạn tuần hoàn (viết gọn, ví dụ $0{,}1(6)$).',
      accept: ['0,41(6)', '0.41(6)'],
      hints: ['Chia $5 : 12$ và theo dõi các số dư.', 'Số dư $8$ xuất hiện lặp lại.'],
      solution:
        '$50 : 12 = 4$ dư $2$; $20 : 12 = 1$ dư $8$; $80 : 12 = 6$ dư $8$, số dư $8$ lặp lại. Vậy $\\frac{5}{12} = 0{,}41666\\ldots = 0{,}41(6)$.',
    },
    {
      type: 'choice',
      prompt: 'Số $0{,}(3)$ bằng phân số nào?',
      options: ['$\\frac{3}{10}$', '$\\frac{1}{3}$', '$\\frac{3}{100}$', '$\\frac{33}{100}$'],
      answer: 1,
      hints: ['Thử chia tử cho mẫu của từng phân số.'],
      solution:
        '$1 : 3 = 0{,}333\\ldots = 0{,}(3)$. Ba phân số còn lại là số thập phân hữu hạn $0{,}3$; $0{,}03$; $0{,}33$.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số $\\frac{13}{30}$ với độ chính xác $0{,}005$.',
      answer: 0.43,
      hints: [
        'Độ chính xác $0{,}005$: làm tròn đến hàng phần trăm.',
        '$\\frac{13}{30} = 0{,}4333\\ldots$',
      ],
      solution:
        '$\\frac{13}{30} = 0{,}4(3) = 0{,}4333\\ldots$; chữ số hàng phần nghìn là $3 < 5$ nên được $0{,}43$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\sqrt{1{,}69}$.',
      answer: 1.3,
      hints: ['$13^2 = 169$; dời dấu phẩy cho đúng.'],
      solution: '$1{,}3^2 = 1{,}69$ và $1{,}3 \\ge 0$ nên $\\sqrt{1{,}69} = 1{,}3$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các số vô tỉ.',
      options: [
        '$\\sqrt{27}$',
        '$\\sqrt{1{,}44}$',
        '$-\\sqrt{\\frac{4}{9}}$',
        '$\\sqrt{48}$',
        '$3{,}(2)$',
      ],
      answers: [0, 3],
      hints: [
        'Tính thử các căn có kết quả là số hữu tỉ.',
        '$27$ và $48$ có phải là số chính phương không?',
      ],
      solution:
        '$\\sqrt{1{,}44} = 1{,}2$; $-\\sqrt{\\frac{4}{9}} = -\\frac{2}{3}$; $3{,}(2)$ là số thập phân vô hạn tuần hoàn: đều là số hữu tỉ. $27$ và $48$ không là số chính phương nên $\\sqrt{27}$, $\\sqrt{48}$ là số vô tỉ.',
    },
    {
      type: 'number',
      prompt: 'Tìm số $x$ không âm, biết $x^2 = 0{,}81$.',
      answer: 0.9,
      hints: ['$x$ không âm và $x^2 = 0{,}81$ nghĩa là $x = \\sqrt{0{,}81}$.'],
      solution: '$x = \\sqrt{0{,}81} = 0{,}9$ vì $0{,}9 \\ge 0$ và $0{,}9^2 = 0{,}81$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các số sau theo thứ tự tăng dần.',
      items: ['$1{,}(4)$', '$-\\sqrt{2}$', '$\\sqrt{2}$', '$-1{,}4$', '$1{,}41$'],
      answer: [1, 3, 4, 2, 0],
      hints: [
        'Viết các số dưới dạng số thập phân: $\\sqrt{2} = 1{,}4142\\ldots$; $1{,}(4) = 1{,}444\\ldots$',
        'Hai số âm: số nào có giá trị tuyệt đối lớn hơn thì nhỏ hơn.',
      ],
      solution:
        '$-\\sqrt{2} = -1{,}414\\ldots < -1{,}4 < 1{,}41 < \\sqrt{2} = 1{,}4142\\ldots < 1{,}(4) = 1{,}444\\ldots$',
    },
    {
      type: 'number',
      prompt: 'Tính $\\sqrt{(-6)^2}$.',
      answer: 6,
      hints: ['Tính $(-6)^2$ trước.', 'Căn bậc hai số học luôn không âm.'],
      solution: '$(-6)^2 = 36$ nên $\\sqrt{(-6)^2} = \\sqrt{36} = 6$.',
    },
    {
      type: 'choice',
      prompt: 'Tìm $x$, biết $|x| = \\sqrt{7}$.',
      options: [
        '$x = \\sqrt{7}$',
        '$x = -\\sqrt{7}$',
        '$x = \\sqrt{7}$ hoặc $x = -\\sqrt{7}$',
        '$x = 7$ hoặc $x = -7$',
      ],
      answer: 2,
      hints: ['Có bao nhiêu điểm trên trục số cách điểm $0$ một khoảng bằng $\\sqrt{7}$?'],
      solution:
        'Hai số đối nhau $\\sqrt{7}$ và $-\\sqrt{7}$ đều có giá trị tuyệt đối bằng $\\sqrt{7}$.',
    },
    {
      type: 'number',
      prompt:
        'Một sân chơi hình vuông có diện tích $85\\ \\text{m}^2$. Tính độ dài cạnh sân, làm tròn đến hàng phần trăm.',
      answer: 9.22,
      unit: 'm',
      hints: ['Cạnh bằng $\\sqrt{85}$.', 'Máy tính cho $\\sqrt{85} = 9{,}2195\\ldots$'],
      solution:
        'Cạnh $= \\sqrt{85} = 9{,}21954\\ldots$; chữ số hàng phần nghìn là $9 \\ge 5$ nên cạnh $\\approx 9{,}22$ m.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu số nguyên $x$ thoả mãn $|x| < \\sqrt{10}$?',
      answer: 7,
      hints: [
        '$|x| < \\sqrt{10}$ nghĩa là $-\\sqrt{10} < x < \\sqrt{10}$.',
        '$3 < \\sqrt{10} < 4$.',
      ],
      solution:
        '$\\sqrt{10} = 3{,}16\\ldots$ nên $x \\in \\{-3; -2; -1; 0; 1; 2; 3\\}$: có $7$ số nguyên.',
    },
  ],
  takeaways: [
    'Rút gọn phân số rồi xét ước nguyên tố của mẫu để biết số thập phân hữu hạn hay vô hạn tuần hoàn.',
    'Độ chính xác bằng nửa đơn vị của hàng làm tròn.',
    '$\\sqrt{a}$ chỉ có khi $a \\ge 0$ và luôn không âm; nếu số tự nhiên $a$ không là số chính phương thì $\\sqrt{a}$ là số vô tỉ.',
    'So sánh số thực bằng cách viết chúng dưới dạng số thập phân; $|a|$ là khoảng cách từ $a$ đến $0$.',
  ],
};
