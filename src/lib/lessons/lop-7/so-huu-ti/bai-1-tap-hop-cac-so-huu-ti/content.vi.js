/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Số hữu tỉ là số viết được dưới dạng phân số a/b với a, b là số nguyên, b khác 0; cách biểu diễn số hữu tỉ trên trục số, số đối và so sánh hai số hữu tỉ.',
  intro:
    'Nhiệt độ một buổi sáng mùa đông ở Sa Pa là $-1{,}5\\,^\\circ\\mathrm{C}$, một chiếc bánh được chia cho mỗi bạn $\\frac{3}{4}$ cái, mực nước hồ thay đổi $\\frac{-2}{3}$ m (tức là hạ xuống $\\frac{2}{3}$ m). Những số như $-1{,}5$; $\\frac{3}{4}$; $\\frac{-2}{3}$ không phải số nguyên nhưng đều viết được dưới dạng phân số. Chúng là các số hữu tỉ, tập hợp số mà em học trong chương này.',
  objectives: [
    'Nhận biết số hữu tỉ và tập hợp $\\mathbb{Q}$ các số hữu tỉ.',
    'Biểu diễn số hữu tỉ trên trục số.',
    'Tìm số đối của một số hữu tỉ.',
    'So sánh hai số hữu tỉ và sắp xếp các số hữu tỉ theo thứ tự.',
  ],
  sections: [
    {
      heading: '1. Số hữu tỉ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số hữu tỉ',
          text: 'Số hữu tỉ là số viết được dưới dạng phân số $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}$, $b \\ne 0$. Tập hợp các số hữu tỉ được kí hiệu là $\\mathbb{Q}$.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $-0{,}5 = \\frac{-1}{2}$; $\\;1{,}25 = \\frac{5}{4}$; $\\;-3 = \\frac{-3}{1}$; $\\;2\\frac{1}{3} = \\frac{7}{3}$ đều là số hữu tỉ, nên ta viết $-0{,}5 \\in \\mathbb{Q}$, $\\frac{7}{3} \\in \\mathbb{Q}$.',
        },
        {
          type: 'list',
          items: [
            'Mỗi số nguyên là một số hữu tỉ, vì $a = \\frac{a}{1}$. Mỗi số thập phân hữu hạn cũng là số hữu tỉ: $0{,}75 = \\frac{75}{100} = \\frac{3}{4}$.',
            'Các phân số bằng nhau là các cách viết khác nhau của cùng một số hữu tỉ: $\\frac{2}{3} = \\frac{4}{6} = \\frac{-6}{-9}$ cùng biểu diễn một số hữu tỉ.',
          ],
        },
        {
          type: 'tex',
          tex: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q}',
        },
      ],
    },
    {
      heading: '2. Biểu diễn số hữu tỉ trên trục số',
      blocks: [
        {
          type: 'p',
          text: 'Tương tự số nguyên, ta biểu diễn được mọi số hữu tỉ trên trục số. Điểm biểu diễn số hữu tỉ $a$ trên trục số gọi là điểm $a$.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Viết số hữu tỉ dưới dạng phân số có mẫu dương, chẳng hạn $-1{,}25 = \\frac{-5}{4}$.',
            'Chia đoạn thẳng đơn vị (từ $0$ đến $1$) thành số phần bằng mẫu số, ở đây là $4$ phần; mỗi phần là $\\frac{1}{4}$ đơn vị.',
            'Tử số âm nên đi sang trái điểm $0$; tử số là $-5$ nên lấy $5$ phần. Điểm đó là điểm $\\frac{-5}{4}$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Nếu chưa ở dạng tối giản, hãy rút gọn trước để chia ít phần nhất: $\\frac{6}{-8} = \\frac{-3}{4}$ nên chỉ cần chia đoạn đơn vị thành $4$ phần.',
        },
      ],
    },
    {
      heading: '3. Số đối của một số hữu tỉ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số đối',
          text: 'Trên trục số, hai điểm biểu diễn hai số hữu tỉ $a$ và $-a$ nằm về hai phía khác nhau của điểm $0$ và cách đều điểm $0$. Ta nói $a$ và $-a$ là hai số đối nhau. Số đối của $a$ kí hiệu là $-a$.',
        },
        {
          type: 'list',
          items: [
            'Số đối của $\\frac{3}{5}$ là $-\\frac{3}{5} = \\frac{-3}{5}$; số đối của $-0{,}2$ là $0{,}2$.',
            'Số đối của $-a$ là $a$, tức là $-(-a) = a$. Số đối của $0$ là $0$.',
            'Lưu ý: $-\\frac{a}{b} = \\frac{-a}{b} = \\frac{a}{-b}$.',
          ],
        },
      ],
    },
    {
      heading: '4. Thứ tự trong tập hợp các số hữu tỉ',
      blocks: [
        {
          type: 'p',
          text: 'Với hai số hữu tỉ $a$, $b$ bất kì, ta luôn có hoặc $a = b$, hoặc $a < b$, hoặc $a > b$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cách so sánh hai số hữu tỉ',
          text: 'Viết hai số dưới dạng phân số có cùng mẫu dương rồi so sánh tử số. Nếu cả hai số được cho dưới dạng số thập phân thì so sánh như so sánh hai số thập phân.',
        },
        {
          type: 'list',
          items: [
            'Số hữu tỉ lớn hơn $0$ gọi là số hữu tỉ dương; số hữu tỉ nhỏ hơn $0$ gọi là số hữu tỉ âm. Số $0$ không là số hữu tỉ dương, cũng không là số hữu tỉ âm.',
            'Tính chất bắc cầu: nếu $a < b$ và $b < c$ thì $a < c$.',
            'Trên trục số nằm ngang, nếu $a < b$ thì điểm $a$ nằm bên trái điểm $b$.',
          ],
        },
        {
          type: 'table',
          caption: 'So sánh bằng cách quy đồng mẫu',
          head: ['Hai số', 'Cùng mẫu dương', 'Kết luận'],
          rows: [
            [
              '$\\frac{-3}{4}$ và $\\frac{-2}{3}$',
              '$\\frac{-9}{12}$ và $\\frac{-8}{12}$',
              '$\\frac{-3}{4} < \\frac{-2}{3}$',
            ],
            [
              '$-0{,}6$ và $\\frac{-1}{2}$',
              '$\\frac{-6}{10}$ và $\\frac{-5}{10}$',
              '$-0{,}6 < \\frac{-1}{2}$',
            ],
            ['$-1{,}25$ và $-1{,}3$', 'so sánh số thập phân', '$-1{,}3 < -1{,}25$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Với số âm, số nào có phần "số" lớn hơn thì lại nhỏ hơn: $1{,}3 > 1{,}25$ nhưng $-1{,}3 < -1{,}25$. Mọi số hữu tỉ âm đều nhỏ hơn $0$ và nhỏ hơn mọi số hữu tỉ dương.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đặt số hữu tỉ lên trục số',
    instruction:
      'Chọn số phần để chia đoạn đơn vị, rồi kéo điểm M (hoặc dùng phím mũi tên, giữ Shift để nhảy một đơn vị) tới vị trí của số đề cho và nhấn "Kiểm tra". Chọn "Phóng to" để xem kĩ đoạn đơn vị chứa M; muốn đi xa hơn, quay về "Cả trục số". Bật "Hiện số đối" để thấy điểm đối xứng với M qua điểm 0. Các điểm đã đặt đúng được giữ lại và xếp theo thứ tự từ nhỏ đến lớn.',
  },
  examples: [
    {
      problem: 'Biểu diễn số hữu tỉ $-1{,}25$ trên trục số.',
      steps: [
        'Viết dưới dạng phân số tối giản: $-1{,}25 = \\frac{-125}{100} = \\frac{-5}{4}$.',
        'Chia đoạn thẳng đơn vị thành $4$ phần bằng nhau; mỗi phần là $\\frac{1}{4}$.',
        'Từ điểm $0$ đi sang trái $5$ phần, ta được điểm $\\frac{-5}{4}$ (nằm giữa $-2$ và $-1$).',
      ],
      answer: 'Điểm $-1{,}25$ nằm bên trái điểm $-1$ đúng một phần tư đơn vị.',
    },
    {
      problem: 'So sánh hai số hữu tỉ $\\frac{-5}{6}$ và $-0{,}8$.',
      steps: [
        'Viết $-0{,}8$ dưới dạng phân số: $-0{,}8 = \\frac{-8}{10} = \\frac{-4}{5}$.',
        'Quy đồng mẫu dương $30$: $\\frac{-5}{6} = \\frac{-25}{30}$, $\\frac{-4}{5} = \\frac{-24}{30}$.',
        'Vì $-25 < -24$ nên $\\frac{-25}{30} < \\frac{-24}{30}$.',
      ],
      answer: '$\\frac{-5}{6} < -0{,}8$.',
    },
    {
      problem:
        'Sắp xếp các số hữu tỉ sau theo thứ tự tăng dần: $0{,}5$; $\\frac{-2}{3}$; $-0{,}7$; $\\frac{3}{4}$.',
      steps: [
        'Hai số âm $\\frac{-2}{3}$ và $-0{,}7$ nhỏ hơn hai số dương.',
        'So sánh hai số âm: $\\frac{-2}{3} = \\frac{-20}{30}$, $-0{,}7 = \\frac{-21}{30}$, nên $-0{,}7 < \\frac{-2}{3}$.',
        'So sánh hai số dương: $0{,}5 = \\frac{2}{4} < \\frac{3}{4}$.',
      ],
      answer: '$-0{,}7 < \\frac{-2}{3} < 0{,}5 < \\frac{3}{4}$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Những số nào sau đây là số hữu tỉ?',
      options: ['$-7$', '$0{,}25$', '$\\frac{-3}{5}$', '$\\frac{4}{0}$', '$2\\frac{1}{2}$'],
      answers: [0, 1, 2, 4],
      hints: [
        'Số hữu tỉ phải viết được dưới dạng $\\frac{a}{b}$ với $a, b$ nguyên và $b \\ne 0$.',
        'Mẫu số bằng $0$ thì biểu thức không có nghĩa.',
      ],
      solution:
        '$-7 = \\frac{-7}{1}$, $0{,}25 = \\frac{1}{4}$, $\\frac{-3}{5}$ và $2\\frac{1}{2} = \\frac{5}{2}$ đều là số hữu tỉ. $\\frac{4}{0}$ có mẫu bằng $0$ nên không phải là số hữu tỉ (không có nghĩa).',
    },
    {
      type: 'fraction',
      prompt: 'Viết số hữu tỉ $-0{,}35$ dưới dạng phân số tối giản.',
      answer: [-7, 20],
      simplest: true,
      hints: ['$-0{,}35 = \\frac{-35}{100}$.', 'Chia cả tử và mẫu cho ƯCLN$(35, 100) = 5$.'],
      solution: '$-0{,}35 = \\frac{-35}{100} = \\frac{-35 : 5}{100 : 5} = \\frac{-7}{20}$.',
    },
    {
      type: 'number',
      prompt:
        'Để biểu diễn số $\\frac{9}{-12}$ trên trục số với ít phần nhất, ta chia đoạn thẳng đơn vị thành bao nhiêu phần bằng nhau?',
      answer: 4,
      hints: ['Hãy rút gọn và đưa về mẫu dương trước.'],
      solution:
        '$\\frac{9}{-12} = \\frac{-3}{4}$, mẫu là $4$, nên chia đoạn đơn vị thành $4$ phần bằng nhau.',
    },
    {
      type: 'choice',
      prompt: 'Số đối của $\\frac{-2}{7}$ là:',
      options: ['$\\frac{-2}{7}$', '$\\frac{2}{7}$', '$\\frac{7}{-2}$', '$\\frac{-7}{2}$'],
      answer: 1,
      hints: ['Hai số đối nhau nằm hai phía của $0$ và cách đều $0$.'],
      solution: 'Số đối của $\\frac{-2}{7}$ là $-\\frac{-2}{7} = \\frac{2}{7}$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số đối của số đối của $-1{,}6$.',
      answer: -1.6,
      hints: ['Số đối của $-a$ là $a$: $-(-a) = a$.'],
      solution:
        'Số đối của $-1{,}6$ là $1{,}6$; số đối của $1{,}6$ là $-1{,}6$. Vậy kết quả là $-1{,}6$.',
    },
    {
      type: 'choice',
      prompt: 'So sánh $\\frac{-4}{9}$ và $\\frac{-3}{7}$.',
      options: [
        '$\\frac{-4}{9} < \\frac{-3}{7}$',
        '$\\frac{-4}{9} = \\frac{-3}{7}$',
        '$\\frac{-4}{9} > \\frac{-3}{7}$',
      ],
      answer: 0,
      hints: ['Quy đồng mẫu dương $63$.'],
      solution:
        '$\\frac{-4}{9} = \\frac{-28}{63}$, $\\frac{-3}{7} = \\frac{-27}{63}$. Vì $-28 < -27$ nên $\\frac{-4}{9} < \\frac{-3}{7}$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các số hữu tỉ sau theo thứ tự tăng dần.',
      items: ['$-1{,}5$', '$\\frac{1}{3}$', '$\\frac{-5}{4}$', '$0$', '$0{,}3$'],
      answer: [0, 2, 3, 4, 1],
      hints: [
        'Số âm nhỏ hơn $0$, số dương lớn hơn $0$.',
        'So sánh $-1{,}5$ với $\\frac{-5}{4} = -1{,}25$; so sánh $0{,}3$ với $\\frac{1}{3} = 0{,}333\\ldots$',
      ],
      solution:
        '$\\frac{-5}{4} = -1{,}25 > -1{,}5$ và $0{,}3 = \\frac{9}{30} < \\frac{10}{30} = \\frac{1}{3}$. Vậy $-1{,}5 < \\frac{-5}{4} < 0 < 0{,}3 < \\frac{1}{3}$.',
    },
    {
      type: 'multi',
      prompt:
        'Trong các số $\\frac{-3}{-5}$; $\\frac{0}{4}$; $\\frac{2}{-9}$; $-0{,}01$; $\\frac{7}{3}$, những số nào là số hữu tỉ âm?',
      options: [
        '$\\frac{-3}{-5}$',
        '$\\frac{0}{4}$',
        '$\\frac{2}{-9}$',
        '$-0{,}01$',
        '$\\frac{7}{3}$',
      ],
      answers: [2, 3],
      hints: [
        'Đưa mỗi phân số về mẫu dương rồi xem dấu của tử.',
        'Số $0$ không âm cũng không dương.',
      ],
      solution:
        '$\\frac{-3}{-5} = \\frac{3}{5} > 0$; $\\frac{0}{4} = 0$; $\\frac{2}{-9} = \\frac{-2}{9} < 0$; $-0{,}01 < 0$; $\\frac{7}{3} > 0$. Các số hữu tỉ âm là $\\frac{2}{-9}$ và $-0{,}01$.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu số nguyên $x$ thỏa mãn $\\frac{-7}{2} < x < 1{,}4$?',
      answer: 5,
      hints: ['$\\frac{-7}{2} = -3{,}5$.', 'Liệt kê các số nguyên nằm giữa $-3{,}5$ và $1{,}4$.'],
      solution:
        '$\\frac{-7}{2} = -3{,}5$. Các số nguyên $x$ với $-3{,}5 < x < 1{,}4$ là $-3; -2; -1; 0; 1$, có $5$ số.',
    },
  ],
  takeaways: [
    'Số hữu tỉ là số viết được dưới dạng $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}$, $b \\ne 0$; tập hợp các số hữu tỉ là $\\mathbb{Q}$.',
    'Muốn biểu diễn $\\frac{a}{b}$ ($b > 0$) trên trục số: chia đoạn đơn vị thành $b$ phần bằng nhau, rồi từ điểm $0$ lấy số phần bằng tử số, sang phải nếu tử dương, sang trái nếu tử âm.',
    'Số đối của $a$ là $-a$; $-(-a) = a$.',
    'So sánh hai số hữu tỉ: đưa về cùng mẫu dương rồi so sánh tử; trên trục số, số nhỏ hơn nằm bên trái.',
  ],
};
