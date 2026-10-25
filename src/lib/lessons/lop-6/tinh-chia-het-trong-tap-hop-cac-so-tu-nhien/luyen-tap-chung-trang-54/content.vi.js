/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: củng cố ước chung, ước chung lớn nhất, bội chung, bội chung nhỏ nhất, rút gọn và quy đồng mẫu phân số, và các bài toán thực tế dùng ƯCLN, BCNN.',
  intro:
    'ƯCLN và BCNN là hai "anh em" sinh ra từ cùng một phép phân tích ra thừa số nguyên tố: một bên lấy thừa số chung với số mũ nhỏ nhất, một bên lấy cả thừa số chung lẫn riêng với số mũ lớn nhất. Bài luyện tập này giúp em phân biệt và dùng đúng hai công cụ đó.',
  objectives: [
    'Tìm ƯCLN, BCNN của hai hay ba số bằng phân tích ra thừa số nguyên tố; tìm ước chung, bội chung thông qua chúng.',
    'Rút gọn phân số bằng ƯCLN; quy đồng mẫu, cộng, trừ phân số bằng BCNN.',
    'Nhận ra bài toán thực tế cần ƯCLN ("nhiều nhất", "lớn nhất" khi chia đều) hay BCNN ("ít nhất", "lần đầu cùng lúc").',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['So sánh', 'ƯCLN', 'BCNN'],
          rows: [
            ['Thừa số được chọn', 'chỉ thừa số chung', 'thừa số chung và riêng'],
            ['Số mũ', 'nhỏ nhất', 'lớn nhất'],
            [
              'Tập hợp liên quan',
              '$\\text{ƯC}(a, b) = \\text{Ư}(\\text{ƯCLN}(a, b))$',
              '$\\text{BC}(a, b) = \\text{B}(\\text{BCNN}(a, b))$',
            ],
            [
              'Ví dụ với $12 = 2^2 \\cdot 3$, $18 = 2 \\cdot 3^2$',
              '$2 \\cdot 3 = 6$',
              '$2^2 \\cdot 3^2 = 36$',
            ],
          ],
        },
        {
          type: 'list',
          items: [
            'Với hai số tự nhiên $a$, $b$ khác $0$: $\\text{ƯCLN}(a, b) \\cdot \\text{BCNN}(a, b) = a \\cdot b$. Ví dụ $6 \\cdot 36 = 12 \\cdot 18 = 216$.',
            'Hai số nguyên tố cùng nhau có ƯCLN bằng $1$ và BCNN bằng tích của chúng.',
            'Rút gọn về phân số tối giản: chia tử và mẫu cho ƯCLN của chúng.',
            'Quy đồng mẫu: lấy mẫu chung là BCNN của các mẫu, rồi nhân tử và mẫu với thừa số phụ.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $10$ câu mới, trộn đều từ Bài 11 và Bài 12.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề luyện tập trộn ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai, em sẽ thấy lời giải từng bước. Bản đồ kĩ năng cho biết em vững phần ƯCLN hay phần BCNN hơn.',
  },
  examples: [
    {
      problem: 'Tìm $\\text{ƯCLN}(90, 126)$ và $\\text{BCNN}(90, 126)$.',
      steps: [
        '$90 = 2 \\cdot 3^2 \\cdot 5$ và $126 = 2 \\cdot 3^2 \\cdot 7$.',
        'ƯCLN: thừa số chung $2$ và $3$ với số mũ nhỏ nhất: $2 \\cdot 3^2 = 18$.',
        'BCNN: thừa số chung và riêng $2, 3, 5, 7$ với số mũ lớn nhất: $2 \\cdot 3^2 \\cdot 5 \\cdot 7 = 630$.',
        'Kiểm tra: $18 \\cdot 630 = 11\\,340 = 90 \\cdot 126$.',
      ],
      answer: '$\\text{ƯCLN}(90, 126) = 18$, $\\text{BCNN}(90, 126) = 630$.',
    },
    {
      problem: 'Tính $\\dfrac{7}{30} + \\dfrac{11}{45}$.',
      steps: [
        '$30 = 2 \\cdot 3 \\cdot 5$, $45 = 3^2 \\cdot 5$, nên $\\text{BCNN}(30, 45) = 2 \\cdot 3^2 \\cdot 5 = 90$.',
        'Thừa số phụ: $90 : 30 = 3$ và $90 : 45 = 2$.',
        '$\\dfrac{7}{30} + \\dfrac{11}{45} = \\dfrac{21}{90} + \\dfrac{22}{90} = \\dfrac{43}{90}$.',
        '$43$ là số nguyên tố, không là ước của $90$, nên $\\dfrac{43}{90}$ đã tối giản.',
      ],
      answer: '$\\dfrac{43}{90}$.',
    },
    {
      problem:
        'Số học sinh của một trường khi xếp hàng $12$, hàng $15$ hay hàng $18$ đều thừa $5$ em. Biết số học sinh từ $300$ đến $400$, tìm số học sinh.',
      steps: [
        'Gọi số học sinh là $n$. Bớt đi $5$ em thì xếp vừa đủ, nên $n - 5$ là bội chung của $12$, $15$, $18$.',
        '$12 = 2^2 \\cdot 3$, $15 = 3 \\cdot 5$, $18 = 2 \\cdot 3^2$, nên $\\text{BCNN}(12, 15, 18) = 2^2 \\cdot 3^2 \\cdot 5 = 180$.',
        '$n - 5 \\in \\{0; 180; 360; 540; \\ldots\\}$, nên $n \\in \\{5; 185; 365; 545; \\ldots\\}$.',
        'Chỉ $365$ nằm từ $300$ đến $400$.',
      ],
      answer: 'Trường có $365$ học sinh.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tìm $\\text{ƯCLN}(60, 84)$.',
      answer: 12,
      hints: ['$60 = 2^2 \\cdot 3 \\cdot 5$ và $84 = 2^2 \\cdot 3 \\cdot 7$.'],
      solution:
        'Thừa số chung $2$ và $3$ với số mũ nhỏ nhất: $\\text{ƯCLN}(60, 84) = 2^2 \\cdot 3 = 12$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $\\text{BCNN}(60, 84)$.',
      answer: 420,
      hints: [
        'Lấy cả thừa số chung và riêng: $2, 3, 5, 7$.',
        'Hoặc dùng $\\text{ƯCLN} \\cdot \\text{BCNN} = a \\cdot b$.',
      ],
      solution:
        '$\\text{BCNN}(60, 84) = 2^2 \\cdot 3 \\cdot 5 \\cdot 7 = 420$. Kiểm tra: $60 \\cdot 84 : 12 = 5\\,040 : 12 = 420$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $\\text{ƯCLN}(24, 36, 60)$.',
      answer: 12,
      hints: ['$24 = 2^3 \\cdot 3$, $36 = 2^2 \\cdot 3^2$, $60 = 2^2 \\cdot 3 \\cdot 5$.'],
      solution:
        'Thừa số chung của cả ba số là $2$ và $3$; số mũ nhỏ nhất là $2$ và $1$. Vậy ƯCLN $= 2^2 \\cdot 3 = 12$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các ước chung của $36$ và $60$.',
      options: ['$2$', '$3$', '$5$', '$6$', '$9$', '$12$', '$18$'],
      answers: [0, 1, 3, 5],
      hints: ['Ước chung là ước của $\\text{ƯCLN}(36, 60)$.', '$\\text{ƯCLN}(36, 60) = 12$.'],
      solution:
        '$\\text{ƯCLN}(36, 60) = 12$, nên $\\text{ƯC}(36, 60) = \\{1; 2; 3; 4; 6; 12\\}$. Trong các lựa chọn có $2, 3, 6, 12$.',
    },
    {
      type: 'fraction',
      prompt: 'Rút gọn phân số $\\dfrac{60}{84}$ về phân số tối giản.',
      answer: [5, 7],
      simplest: true,
      hints: ['Chia cả tử và mẫu cho $\\text{ƯCLN}(60, 84)$.'],
      solution:
        '$\\text{ƯCLN}(60, 84) = 12$, nên $\\dfrac{60}{84} = \\dfrac{60 : 12}{84 : 12} = \\dfrac{5}{7}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\dfrac{5}{12} + \\dfrac{3}{16}$ (viết kết quả dưới dạng phân số tối giản).',
      answer: [29, 48],
      simplest: true,
      hints: ['$\\text{BCNN}(12, 16) = 48$.', 'Thừa số phụ là $4$ và $3$.'],
      solution:
        '$\\dfrac{5}{12} + \\dfrac{3}{16} = \\dfrac{20}{48} + \\dfrac{9}{48} = \\dfrac{29}{48}$; $29$ là số nguyên tố, không là ước của $48$, nên phân số đã tối giản.',
    },
    {
      type: 'number',
      prompt:
        'Mẫu chung nhỏ nhất của ba phân số $\\dfrac{7}{18}$, $\\dfrac{5}{24}$, $\\dfrac{1}{36}$ là bao nhiêu?',
      answer: 72,
      hints: [
        'Tìm $\\text{BCNN}(18, 24, 36)$.',
        '$18 = 2 \\cdot 3^2$, $24 = 2^3 \\cdot 3$, $36 = 2^2 \\cdot 3^2$.',
      ],
      solution: '$\\text{BCNN}(18, 24, 36) = 2^3 \\cdot 3^2 = 72$.',
    },
    {
      type: 'number',
      prompt:
        'Hai số $a$ và $b$ có $\\text{ƯCLN}(a, b) = 7$ và $\\text{BCNN}(a, b) = 420$. Biết $a = 28$, tìm $b$.',
      answer: 105,
      hints: ['$\\text{ƯCLN}(a, b) \\cdot \\text{BCNN}(a, b) = a \\cdot b$.'],
      solution:
        '$28 \\cdot b = 7 \\cdot 420 = 2\\,940$, nên $b = 2\\,940 : 28 = 105$. Kiểm tra: $28 = 2^2 \\cdot 7$, $105 = 3 \\cdot 5 \\cdot 7$ có ƯCLN $7$ và BCNN $2^2 \\cdot 3 \\cdot 5 \\cdot 7 = 420$.',
    },
    {
      type: 'number',
      prompt:
        'Lớp 6B có $40$ bạn nam và $32$ bạn nữ. Cô muốn chia lớp thành các tổ sao cho số nam ở các tổ bằng nhau, số nữ ở các tổ cũng bằng nhau. Chia được nhiều nhất bao nhiêu tổ?',
      answer: 8,
      hints: ['Số tổ là ước chung của $40$ và $32$.', 'Nhiều nhất thì lấy ƯCLN.'],
      solution:
        '$40 = 2^3 \\cdot 5$, $32 = 2^5$, $\\text{ƯCLN}(40, 32) = 2^3 = 8$. Chia được nhiều nhất $8$ tổ, mỗi tổ $5$ nam và $4$ nữ.',
    },
    {
      type: 'number',
      prompt:
        'Số sách của thư viện nhiều hơn $200$ và ít hơn $300$ quyển. Khi xếp thành từng bó $10$ quyển, $12$ quyển hay $15$ quyển đều vừa đủ. Thư viện có bao nhiêu quyển sách?',
      answer: 240,
      unit: 'quyển',
      hints: ['Số sách là bội chung của $10$, $12$, $15$.', '$\\text{BCNN}(10, 12, 15) = 60$.'],
      solution:
        '$\\text{BC}(10, 12, 15) = \\{0; 60; 120; 180; 240; 300; \\ldots\\}$. Số lớn hơn $200$ và nhỏ hơn $300$ là $240$.',
    },
    {
      type: 'number',
      prompt:
        'Hai bánh răng ăn khớp với nhau: bánh A có $18$ răng, bánh B có $12$ răng. Đánh dấu một cặp răng đang chạm nhau. Bánh A phải quay ít nhất bao nhiêu vòng để cặp răng đó lại chạm nhau?',
      answer: 2,
      unit: 'vòng',
      hints: [
        'Số răng đi qua chỗ tiếp xúc phải là bội của cả $18$ và $12$.',
        'Tìm $\\text{BCNN}(18, 12)$ rồi chia cho $18$.',
      ],
      solution:
        '$\\text{BCNN}(18, 12) = 2^2 \\cdot 3^2 = 36$ răng. Bánh A quay $36 : 18 = 2$ vòng (bánh B quay $36 : 12 = 3$ vòng).',
    },
    {
      type: 'choice',
      prompt: 'Với hai số tự nhiên $a$, $b$ khác $0$, khẳng định nào luôn đúng?',
      options: [
        '$\\text{ƯCLN}(a, b) \\cdot \\text{BCNN}(a, b) = a \\cdot b$',
        '$\\text{BCNN}(a, b) = a \\cdot b$',
        '$\\text{ƯCLN}(a, b) > 1$',
        '$\\text{BCNN}(a, b) < a$',
      ],
      answer: 0,
      hints: ['Thử với $a = 4$, $b = 6$.'],
      solution:
        'Với $a = 4$, $b = 6$: ƯCLN $= 2$, BCNN $= 12$, và $2 \\cdot 12 = 24 = 4 \\cdot 6$. Ví dụ này cũng cho thấy BCNN có thể khác $a \\cdot b$; ƯCLN có thể bằng $1$ (với $3$ và $4$); BCNN luôn lớn hơn hoặc bằng $a$.',
    },
  ],
  takeaways: [
    'ƯCLN: thừa số chung, số mũ nhỏ nhất. BCNN: thừa số chung và riêng, số mũ lớn nhất.',
    '$\\text{ƯCLN}(a, b) \\cdot \\text{BCNN}(a, b) = a \\cdot b$.',
    'Rút gọn phân số dùng ƯCLN; quy đồng mẫu dùng BCNN.',
    'Chia đều nhiều nhất: ƯCLN. Lặp lại, cùng lúc, ít nhất: BCNN.',
  ],
};
