/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Xác suất thực nghiệm của một sự kiện là tỉ số giữa số lần sự kiện xảy ra và tổng số lần thực hiện; số lần thử càng lớn thì tỉ số này càng ổn định.',
  intro:
    'Một vòng quay có ba màu đỏ, xanh, vàng. Quay $20$ lần thì mũi tên chỉ vào màu xanh $8$ lần. Con số $8$ trên $20$ nói gì về khả năng mũi tên chỉ vào màu xanh? Bài này giới thiệu cách đo khả năng xảy ra của một sự kiện bằng thực nghiệm.',
  objectives: [
    'Hiểu và tính được xác suất thực nghiệm của một sự kiện bằng tỉ số $\\dfrac{n(A)}{n}$.',
    'Biểu diễn xác suất thực nghiệm dưới dạng phân số, số thập phân hoặc tỉ số phần trăm.',
    'Nhận biết xác suất thực nghiệm thay đổi theo từng loạt thử và ổn định dần khi số lần thử lớn.',
  ],
  sections: [
    {
      heading: 'Xác suất thực nghiệm',
      blocks: [
        {
          type: 'p',
          text: 'Quay vòng quay $20$ lần và ghi lại kết quả vào bảng thống kê:',
        },
        {
          type: 'table',
          caption: 'Kết quả $20$ lần quay',
          head: ['Màu', 'Đỏ', 'Xanh', 'Vàng'],
          rows: [['Số lần', '$5$', '$8$', '$7$']],
        },
        {
          type: 'p',
          text: 'Mũi tên chỉ vào màu xanh $8$ lần trong $20$ lần quay. Tỉ số $\\dfrac{8}{20} = 0{,}4$ được gọi là xác suất thực nghiệm của sự kiện "Mũi tên chỉ vào màu xanh".',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Xác suất thực nghiệm',
          text: 'Thực hiện lặp đi lặp lại một hoạt động nào đó $n$ lần. Gọi $n(A)$ là số lần sự kiện $A$ xảy ra trong $n$ lần đó. Xác suất thực nghiệm của sự kiện $A$ là tỉ số $$\\frac{n(A)}{n} = \\frac{\\text{Số lần sự kiện } A \\text{ xảy ra}}{\\text{Tổng số lần thực hiện hoạt động}}.$$',
        },
        {
          type: 'list',
          items: [
            'Xác suất thực nghiệm có thể viết dưới dạng phân số, số thập phân hoặc tỉ số phần trăm: $\\dfrac{8}{20} = \\dfrac{2}{5} = 0{,}4 = 40\\%$.',
            'Vì $0 \\le n(A) \\le n$ nên xác suất thực nghiệm luôn nằm trong khoảng từ $0$ đến $1$.',
            'Để tính $n(A)$, cộng số lần xuất hiện của tất cả các kết quả làm sự kiện $A$ xảy ra.',
          ],
        },
      ],
    },
    {
      heading: 'Số lần thử và độ ổn định',
      blocks: [
        {
          type: 'p',
          text: 'Bạn Vuông và bạn Tròn cùng tung một đồng xu $20$ lần. Vuông được mặt ngửa $9$ lần, Tròn được $12$ lần, nên xác suất thực nghiệm của mặt ngửa là $\\dfrac{9}{20} = 0{,}45$ với Vuông và $\\dfrac{12}{20} = 0{,}6$ với Tròn. Cả hai đều tính đúng.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ghi nhớ',
          text: 'Xác suất thực nghiệm phụ thuộc vào loạt thử: thực hiện một loạt thử khác, ta có thể được một kết quả khác. Khi số lần thử càng lớn, xác suất thực nghiệm càng ít thay đổi, nó ổn định dần quanh một số.',
        },
        {
          type: 'table',
          caption: 'Những lần tung đồng xu nổi tiếng trong lịch sử',
          head: ['Người thực hiện', 'Số lần tung', 'Số lần ngửa', 'Xác suất thực nghiệm'],
          rows: [
            ['Buffon (thế kỉ XVIII)', '$4\\,040$', '$2\\,048$', '$\\approx 0{,}507$'],
            ['Pearson (thế kỉ XIX)', '$24\\,000$', '$12\\,012$', '$\\approx 0{,}500\\,5$'],
          ],
        },
        {
          type: 'p',
          text: 'Với số lần tung rất lớn, xác suất thực nghiệm của mặt ngửa rất gần $0{,}5$. Phần khám phá cho em gieo xúc xắc hàng nghìn lần để tự thấy điều này.',
        },
      ],
    },
  ],
  explore: {
    title: 'Gieo xúc xắc hàng nghìn lần',
    instruction:
      'Chọn sự kiện $A$, rồi gieo $1$, $10$, $100$ hoặc $1\\,000$ lần. Quan sát $n$, $n(A)$ và tỉ số $\\dfrac{n(A)}{n}$; đồ thị cho thấy tỉ số dao động mạnh lúc đầu rồi ổn định dần khi số lần gieo tăng.',
  },
  examples: [
    {
      problem:
        'Theo bảng kết quả $20$ lần quay ở mục 1 (đỏ $5$, xanh $8$, vàng $7$), tính xác suất thực nghiệm của sự kiện "Mũi tên chỉ vào màu đỏ" và sự kiện "Mũi tên không chỉ vào màu vàng".',
      steps: [
        'Tổng số lần quay: $n = 5 + 8 + 7 = 20$.',
        'Màu đỏ xuất hiện $5$ lần: xác suất thực nghiệm là $\\dfrac{5}{20} = \\dfrac{1}{4} = 0{,}25$.',
        '"Không chỉ vào màu vàng" xảy ra khi được đỏ hoặc xanh: $5 + 8 = 13$ lần, nên xác suất thực nghiệm là $\\dfrac{13}{20} = 0{,}65$.',
      ],
      answer: 'Lần lượt là $0{,}25$ và $0{,}65$.',
    },
    {
      problem:
        'An gieo hai con xúc xắc $80$ lần. An thắng mỗi khi tổng số chấm lớn hơn $6$; trong $80$ lần đó, An thắng $48$ lần. Tính xác suất thực nghiệm của sự kiện "An thắng".',
      steps: [
        'Số lần thực hiện: $n = 80$; số lần An thắng: $n(A) = 48$.',
        'Xác suất thực nghiệm: $\\dfrac{48}{80} = \\dfrac{3}{5} = 0{,}6$.',
      ],
      answer: '$\\dfrac{48}{80} = 0{,}6$, tức $60\\%$.',
    },
    {
      problem:
        'Bình lấy một quả bóng từ thùng, xem màu rồi trả lại, lặp lại $100$ lần: xanh $43$ lần, đỏ $22$ lần, tím $18$ lần, vàng $17$ lần. Tính xác suất thực nghiệm của các sự kiện "Lấy được bóng xanh" và "Quả bóng lấy ra không phải màu đỏ".',
      steps: [
        'Kiểm tra: $43 + 22 + 18 + 17 = 100$ lần.',
        '"Lấy được bóng xanh": $\\dfrac{43}{100} = 0{,}43$.',
        '"Không phải màu đỏ" xảy ra $100 - 22 = 78$ lần: $\\dfrac{78}{100} = 0{,}78$.',
      ],
      answer: 'Lần lượt là $0{,}43$ và $0{,}78$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Theo bảng $20$ lần quay ở mục 1, xác suất thực nghiệm của sự kiện "Mũi tên chỉ vào màu vàng" bằng bao nhiêu? Viết dưới dạng số thập phân.',
      answer: 0.35,
      hints: ['Màu vàng xuất hiện $7$ lần trong $20$ lần quay.'],
      solution: '$\\dfrac{7}{20} = 0{,}35$.',
    },
    {
      type: 'fraction',
      prompt:
        'Khoa lấy bóng từ một hộp (lấy xong trả lại) $30$ lần, trong đó có $13$ lần lấy được bóng đỏ. Xác suất thực nghiệm của sự kiện "Lấy được bóng đỏ" là phân số nào?',
      answer: [13, 30],
      hints: ['Lập tỉ số: số lần lấy được bóng đỏ chia cho tổng số lần lấy.'],
      solution: '$\\dfrac{n(A)}{n} = \\dfrac{13}{30}$.',
    },
    {
      type: 'number',
      prompt:
        'Tung một đồng xu $50$ lần, có $27$ lần xuất hiện mặt ngửa. Tính xác suất thực nghiệm của sự kiện "Xuất hiện mặt sấp" (viết dưới dạng số thập phân).',
      answer: 0.46,
      hints: ['Mỗi lần tung chỉ được mặt sấp hoặc mặt ngửa.', 'Số lần mặt sấp là $50 - 27$.'],
      solution:
        'Mặt sấp xuất hiện $50 - 27 = 23$ lần. Xác suất thực nghiệm: $\\dfrac{23}{50} = 0{,}46$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo một con xúc xắc $60$ lần, số lần xuất hiện các mặt $1$, $2$, $3$, $4$, $5$, $6$ chấm lần lượt là $8$; $11$; $9$; $12$; $10$; $10$. Tính xác suất thực nghiệm của sự kiện "Số chấm xuất hiện là số chẵn" (viết dưới dạng phân số tối giản).',
      answer: [11, 20],
      simplest: true,
      hints: [
        'Các mặt chẵn là $2$, $4$, $6$ chấm.',
        'Cộng số lần của ba mặt đó rồi chia cho $60$; rút gọn phân số.',
      ],
      solution:
        '$n(A) = 11 + 12 + 10 = 33$. Xác suất thực nghiệm: $\\dfrac{33}{60} = \\dfrac{11}{20}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Cũng với $60$ lần gieo ở câu trên, tính xác suất thực nghiệm của sự kiện "Số chấm xuất hiện lớn hơn $4$" (viết dưới dạng phân số tối giản).',
      answer: [1, 3],
      simplest: true,
      hints: ['Sự kiện xảy ra khi được mặt $5$ hoặc $6$ chấm.'],
      solution: '$n(A) = 10 + 10 = 20$. Xác suất thực nghiệm: $\\dfrac{20}{60} = \\dfrac{1}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Gieo một con xúc xắc $200$ lần, xác suất thực nghiệm của sự kiện "Xuất hiện mặt $6$ chấm" là $0{,}15$. Mặt $6$ chấm đã xuất hiện bao nhiêu lần?',
      answer: 30,
      unit: 'lần',
      hints: ['$\\dfrac{n(A)}{200} = 0{,}15$, vậy $n(A) = 200 \\cdot 0{,}15$.'],
      solution: '$n(A) = 200 \\cdot 0{,}15 = 30$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Trong $40$ lần ném bóng vào rổ, Minh ném trúng $26$ lần. Xác suất thực nghiệm của sự kiện "Minh ném trúng rổ" bằng bao nhiêu phần trăm?',
      answer: 65,
      unit: '%',
      hints: ['Tính $\\dfrac{26}{40}$ rồi đổi ra tỉ số phần trăm.'],
      solution: '$\\dfrac{26}{40} = \\dfrac{65}{100} = 65\\%$.',
    },
    {
      type: 'choice',
      prompt:
        'Vuông tung đồng xu $20$ lần và được xác suất thực nghiệm của mặt ngửa là $0{,}45$; Tròn cũng tung $20$ lần và được $0{,}6$. Nhận xét nào đúng?',
      options: [
        'Vuông tính sai vì đồng xu luôn cho $0{,}5$.',
        'Tròn tính sai vì kết quả khác của Vuông.',
        'Cả hai có thể đều đúng: xác suất thực nghiệm thay đổi theo từng loạt thử.',
        'Phải lấy trung bình hai kết quả mới là xác suất thực nghiệm.',
      ],
      answer: 2,
      hints: ['Xác suất thực nghiệm được tính từ chính loạt thử đã làm.'],
      solution:
        'Mỗi bạn tính tỉ số từ loạt $20$ lần tung của mình, nên kết quả có thể khác nhau mà đều đúng.',
    },
    {
      type: 'choice',
      prompt:
        'Gieo một con xúc xắc lần lượt $10$ lần, $100$ lần và $5\\,000$ lần. Nhận xét nào về xác suất thực nghiệm của sự kiện "Xuất hiện mặt $6$ chấm" là đúng?',
      options: [
        'Số lần gieo càng lớn thì xác suất thực nghiệm càng ít thay đổi, ổn định dần quanh một số.',
        'Số lần gieo càng lớn thì xác suất thực nghiệm càng lớn.',
        'Xác suất thực nghiệm không phụ thuộc vào kết quả các lần gieo.',
        'Sau $10$ lần gieo, xác suất thực nghiệm luôn bằng $\\dfrac{1}{6}$.',
      ],
      answer: 0,
      hints: ['Hãy thử với phần khám phá: gieo nhiều lần và xem đồ thị.'],
      solution:
        'Lúc ít lần gieo, tỉ số $\\dfrac{n(A)}{n}$ dao động mạnh; khi số lần gieo lớn, nó ít thay đổi và ổn định dần. Nó không tăng theo số lần gieo và sau $10$ lần thì không thể bằng $\\dfrac{1}{6}$ (vì $\\dfrac{n(A)}{10} = \\dfrac{1}{6}$ không cho $n(A)$ là số tự nhiên).',
    },
  ],
  takeaways: [
    'Xác suất thực nghiệm của sự kiện $A$ là $\\dfrac{n(A)}{n}$: số lần $A$ xảy ra chia cho tổng số lần thực hiện.',
    'Có thể viết xác suất thực nghiệm dưới dạng phân số, số thập phân hoặc tỉ số phần trăm; nó luôn từ $0$ đến $1$.',
    'Xác suất thực nghiệm thay đổi theo loạt thử, và ổn định dần khi số lần thử lớn.',
  ],
};
