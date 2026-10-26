/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương II: hệ thống hoá số thập phân vô hạn tuần hoàn, làm tròn theo độ chính xác, số vô tỉ, căn bậc hai số học, tập hợp số thực và giá trị tuyệt đối, kèm bài kiểm tra có bản đồ kĩ năng theo từng bài.',
  intro:
    'Chương II mở rộng tập hợp số từ $\\mathbb{Q}$ sang tập hợp các số thực $\\mathbb{R}$: thêm vào các số vô tỉ như $\\sqrt{2}$, $\\pi$, những số thập phân vô hạn không tuần hoàn. Bài này hệ thống lại toàn chương và cho em một bài kiểm tra tổng hợp; bản đồ kĩ năng sẽ chỉ ra bài nào em đã vững và bài nào cần ôn lại.',
  objectives: [
    'Hệ thống hoá kiến thức chương Số thực.',
    'Làm bài tập trắc nghiệm và tự luận tổng hợp: viết số thập phân, làm tròn, tính căn bậc hai số học, so sánh số thực, tính giá trị tuyệt đối.',
    'Vận dụng căn bậc hai số học và làm tròn số để giải các bài toán thực tế về diện tích, chu vi và đo lường.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức chương II',
      blocks: [
        {
          type: 'table',
          caption: 'Kiến thức chính theo từng bài',
          head: ['Bài', 'Kiến thức cần nhớ'],
          rows: [
            [
              'Bài 5. Làm quen với số thập phân vô hạn tuần hoàn',
              'Mỗi số hữu tỉ là số thập phân hữu hạn hoặc vô hạn tuần hoàn; cụm chữ số lặp lại là chu kì: $0{,}4545\\ldots = 0{,}(45)$, $0{,}58333\\ldots = 0{,}58(3)$. Làm tròn với độ chính xác $0{,}5$; $0{,}05$; $0{,}005$ là làm tròn đến hàng đơn vị, phần mười, phần trăm.',
            ],
            [
              'Bài 6. Số vô tỉ. Căn bậc hai số học',
              'Số vô tỉ là số thập phân vô hạn không tuần hoàn, tập hợp $\\mathbb{I}$. Với $a \\ge 0$, $\\sqrt{a}$ là số $x \\ge 0$ sao cho $x^2 = a$; $\\left(\\sqrt{a}\\right)^2 = a$. Nếu số tự nhiên $a$ không là số chính phương thì $\\sqrt{a}$ là số vô tỉ.',
            ],
            [
              'Bài 7. Tập hợp các số thực',
              'Số hữu tỉ và số vô tỉ gọi chung là số thực: $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$, $\\mathbb{I} \\subset \\mathbb{R}$. Mỗi điểm trên trục số biểu diễn một số thực. $|a|$ là khoảng cách từ điểm $a$ đến điểm $0$: $|a| = a$ nếu $a \\ge 0$, $|a| = -a$ nếu $a < 0$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Sơ đồ các tập hợp số',
          text: 'Số thực $\\mathbb{R}$ gồm số hữu tỉ $\\mathbb{Q}$ (số thập phân hữu hạn hoặc vô hạn tuần hoàn) và số vô tỉ $\\mathbb{I}$ (số thập phân vô hạn không tuần hoàn). Trong $\\mathbb{Q}$ có $\\mathbb{Z}$, trong $\\mathbb{Z}$ có $\\mathbb{N}$.',
        },
      ],
    },
    {
      heading: 'Những lỗi hay gặp',
      blocks: [
        {
          type: 'list',
          items: [
            'Xét mẫu khi phân số chưa tối giản: $\\frac{14}{35}$ có mẫu $35 = 5 \\cdot 7$ nhưng $\\frac{14}{35} = \\frac{2}{5} = 0{,}4$ là số thập phân hữu hạn.',
            'Viết sai chu kì: $0{,}58333\\ldots = 0{,}58(3)$, không phải $0{,}(583)$.',
            'Nhầm độ chính xác với hàng làm tròn: độ chính xác $0{,}05$ là làm tròn đến hàng phần mười, không phải hàng phần trăm.',
            'Viết $\\sqrt{16} = \\pm 4$ hay $\\sqrt{(-5)^2} = -5$: căn bậc hai số học luôn không âm, $\\sqrt{16} = 4$ và $\\sqrt{(-5)^2} = 5$.',
            'Coi $0{,}(3)$ là số vô tỉ vì "có vô hạn chữ số": số thập phân vô hạn tuần hoàn là số hữu tỉ.',
            'Làm tròn quá sớm: tính chu vi hình vuông diện tích $10$ ta lấy $4 \\cdot \\sqrt{10} = 12{,}649\\ldots \\approx 12{,}6$, không lấy $4 \\cdot 3{,}2 = 12{,}8$.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Mỗi lượt có 12 câu, ba câu cho mỗi kĩ năng: Bài 5, Bài 6, Bài 7 và vận dụng thực tế. Nhập số nguyên (ví dụ $-4$), phân số dạng a/b (ví dụ 3/8) hoặc số thập phân có dấu phẩy (ví dụ $2{,}45$). Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng tô màu từng bài theo kết quả lần làm đầu, để em biết cần ôn lại bài nào.',
  },
  examples: [
    {
      problem:
        'Một khu đất hình vuông có diện tích $400\\ \\text{m}^2$. Trong khu đất, người ta rào một vườn rau hình vuông có diện tích $50\\ \\text{m}^2$. Tính cạnh khu đất và cạnh vườn rau (làm tròn đến hàng phần mười).',
      steps: [
        'Cạnh khu đất: $\\sqrt{400} = 20$ (m), vì $20^2 = 400$.',
        'Cạnh vườn rau: $\\sqrt{50} = 7{,}0710\\ldots$ (m).',
        'Làm tròn đến hàng phần mười: chữ số hàng phần trăm là $7 \\ge 5$, nên $\\sqrt{50} \\approx 7{,}1$ m.',
      ],
      answer: 'Cạnh khu đất là $20$ m; cạnh vườn rau khoảng $7{,}1$ m.',
    },
    {
      problem:
        'Sắp xếp theo thứ tự tăng dần: $\\pi$; $\\;3{,}(14)$; $\\;\\frac{22}{7}$; $\\;\\sqrt{10}$; $\\;3{,}14$.',
      steps: [
        'Viết dưới dạng số thập phân: $\\pi = 3{,}14159\\ldots$; $\\;3{,}(14) = 3{,}141414\\ldots$; $\\;\\frac{22}{7} = 3{,}142857\\ldots$; $\\;\\sqrt{10} = 3{,}162\\ldots$',
        'So sánh lần lượt từng hàng: $3{,}14 < 3{,}1414\\ldots < 3{,}1415\\ldots < 3{,}1428\\ldots < 3{,}162\\ldots$',
      ],
      answer: '$3{,}14 < 3{,}(14) < \\pi < \\frac{22}{7} < \\sqrt{10}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Số nào sau đây là số vô tỉ?',
      options: ['$\\sqrt{16}$', '$0{,}(25)$', '$\\sqrt{11}$', '$-\\frac{3}{7}$'],
      answer: 2,
      hints: ['Số thập phân vô hạn tuần hoàn và phân số đều là số hữu tỉ.'],
      solution:
        '$\\sqrt{16} = 4$, $0{,}(25)$ và $-\\frac{3}{7}$ là số hữu tỉ. $11$ không là số chính phương nên $\\sqrt{11}$ là số vô tỉ.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        '$-2 \\in \\mathbb{Z}$',
        '$\\sqrt{9} \\in \\mathbb{N}$',
        '$-\\sqrt{3} \\in \\mathbb{Q}$',
        '$0{,}(7) \\in \\mathbb{Q}$',
        '$\\mathbb{I} \\subset \\mathbb{Q}$',
      ],
      answers: [0, 1, 3],
      hints: ['Tính $\\sqrt{9}$ trước khi xét.', 'Số vô tỉ không phải là số hữu tỉ.'],
      solution:
        '$-2$ là số nguyên; $\\sqrt{9} = 3 \\in \\mathbb{N}$; $0{,}(7)$ là số thập phân vô hạn tuần hoàn nên thuộc $\\mathbb{Q}$. Sai: $-\\sqrt{3}$ là số vô tỉ; $\\mathbb{I}$ và $\\mathbb{Q}$ không có phần tử chung, nên $\\mathbb{I} \\not\\subset \\mathbb{Q}$.',
    },
    {
      type: 'text',
      prompt: 'Viết phân số $\\frac{4}{33}$ dưới dạng số thập phân (viết gọn, ví dụ $0{,}(5)$).',
      accept: ['0,(12)', '0.(12)'],
      hints: ['Chia $4 : 33$ và ghi lại các số dư.'],
      solution:
        '$40 : 33 = 1$ dư $7$; $70 : 33 = 2$ dư $4$; số dư $4$ lặp lại. Vậy $\\frac{4}{33} = 0{,}1212\\ldots = 0{,}(12)$.',
    },
    {
      type: 'number',
      prompt: 'Chu kì của số thập phân biểu diễn phân số $\\frac{3}{37}$ gồm mấy chữ số?',
      answer: 3,
      hints: ['Chia $3 : 37$ đến khi số dư $3$ xuất hiện lại.'],
      solution:
        '$30 : 37 = 0$ dư $30$; $300 : 37 = 8$ dư $4$; $40 : 37 = 1$ dư $3$, số dư $3$ lặp lại. Vậy $\\frac{3}{37} = 0{,}(081)$: chu kì $081$ gồm $3$ chữ số.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số $\\sqrt{10}$ với độ chính xác $0{,}005$.',
      answer: 3.16,
      hints: [
        'Độ chính xác $0{,}005$: làm tròn đến hàng phần trăm.',
        '$\\sqrt{10} = 3{,}1622\\ldots$',
      ],
      solution:
        '$\\sqrt{10} = 3{,}16227\\ldots$; chữ số hàng phần nghìn là $2 < 5$ nên $\\sqrt{10} \\approx 3{,}16$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\sqrt{0{,}36} - \\sqrt{0{,}01}$.',
      answer: 0.5,
      hints: ['Tính từng căn: số nào bình phương bằng $0{,}36$? bằng $0{,}01$?'],
      solution: '$\\sqrt{0{,}36} - \\sqrt{0{,}01} = 0{,}6 - 0{,}1 = 0{,}5$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính $\\sqrt{\\frac{25}{49}} \\cdot \\left(\\sqrt{2}\\right)^2$ (viết kết quả dạng phân số $a/b$).',
      answer: [10, 7],
      hints: ['$\\left(\\sqrt{2}\\right)^2 = 2$.'],
      solution:
        '$\\sqrt{\\frac{25}{49}} = \\frac{5}{7}$ nên kết quả là $\\frac{5}{7} \\cdot 2 = \\frac{10}{7}$.',
    },
    {
      type: 'number',
      prompt: 'Tính $|-3{,}7| - |2{,}7|$.',
      answer: 1,
      hints: ['Tính từng giá trị tuyệt đối trước.'],
      solution: '$|-3{,}7| - |2{,}7| = 3{,}7 - 2{,}7 = 1$.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: $-\\sqrt{17} \\;\\square\\; -4{,}1$.',
      options: ['$<$', '$>$', '$=$'],
      answer: 0,
      hints: ['So sánh $\\sqrt{17}$ với $4{,}1$ trước: $4{,}1^2 = 16{,}81$.'],
      solution:
        '$4{,}1^2 = 16{,}81 < 17$ nên $\\sqrt{17} > 4{,}1$. Hai số âm, số có giá trị tuyệt đối lớn hơn thì nhỏ hơn: $-\\sqrt{17} < -4{,}1$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các số sau theo thứ tự tăng dần.',
      items: ['$\\pi$', '$3{,}(14)$', '$\\frac{22}{7}$', '$\\sqrt{10}$', '$3{,}14$'],
      answer: [4, 1, 0, 2, 3],
      hints: ['Viết tất cả dưới dạng số thập phân đến hàng phần chục nghìn.'],
      solution:
        '$3{,}14 < 3{,}(14) = 3{,}1414\\ldots < \\pi = 3{,}1415\\ldots < \\frac{22}{7} = 3{,}1428\\ldots < \\sqrt{10} = 3{,}162\\ldots$',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh đất hình vuông có diện tích $1\\,000\\ \\text{m}^2$. Tính độ dài cạnh mảnh đất, làm tròn đến hàng phần mười.',
      answer: 31.6,
      unit: 'm',
      hints: ['Cạnh bằng $\\sqrt{1\\,000}$.', 'Máy tính cho $\\sqrt{1\\,000} = 31{,}62\\ldots$'],
      solution:
        'Cạnh $= \\sqrt{1\\,000} = 31{,}6227\\ldots$; chữ số hàng phần trăm là $2 < 5$ nên cạnh $\\approx 31{,}6$ m.',
    },
    {
      type: 'number',
      prompt:
        'Một khung tranh hình vuông có diện tích $10\\ \\text{dm}^2$. Tính chu vi khung tranh, làm tròn đến hàng phần mười.',
      answer: 12.6,
      unit: 'dm',
      hints: [
        'Cạnh bằng $\\sqrt{10}$ dm; chu vi bằng $4 \\cdot \\sqrt{10}$.',
        'Chỉ làm tròn ở bước cuối.',
      ],
      solution:
        'Chu vi $= 4 \\cdot \\sqrt{10} = 4 \\cdot 3{,}16227\\ldots = 12{,}649\\ldots$; chữ số hàng phần trăm là $4 < 5$ nên chu vi $\\approx 12{,}6$ dm.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu số nguyên $x$ thoả mãn $-\\sqrt{20} < x \\le \\sqrt{2}$?',
      answer: 6,
      hints: ['$4 < \\sqrt{20} < 5$ và $1 < \\sqrt{2} < 2$.'],
      solution:
        '$-\\sqrt{20} = -4{,}47\\ldots$ và $\\sqrt{2} = 1{,}41\\ldots$, nên $x \\in \\{-4; -3; -2; -1; 0; 1\\}$: có $6$ số nguyên.',
    },
  ],
  takeaways: [
    'Số hữu tỉ: số thập phân hữu hạn hoặc vô hạn tuần hoàn; số vô tỉ: số thập phân vô hạn không tuần hoàn; cả hai là số thực.',
    'Độ chính xác bằng nửa đơn vị của hàng làm tròn; chỉ làm tròn ở bước cuối.',
    '$\\sqrt{a}$ ($a \\ge 0$) là số không âm có bình phương bằng $a$.',
    'So sánh số thực qua dạng thập phân; $|a| \\ge 0$ và $|-a| = |a|$.',
  ],
};
