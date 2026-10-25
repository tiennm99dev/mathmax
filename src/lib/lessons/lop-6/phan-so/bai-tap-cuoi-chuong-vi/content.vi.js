/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương VI: hệ thống hoá phân số bằng nhau, rút gọn, so sánh, hỗn số dương, bốn phép tính với phân số và hai bài toán về phân số, kèm bài kiểm tra có bản đồ kĩ năng theo từng bài.',
  intro:
    'Chương VI mở rộng phân số sang tử và mẫu là số nguyên, nhờ đó em viết được $\\frac{-3}{4}$ hay $\\frac{5}{-2}$ và làm đủ bốn phép tính với chúng. Bài này hệ thống lại toàn chương và cho em một bài kiểm tra tổng hợp; bản đồ kĩ năng sẽ chỉ ra bài nào em đã vững và bài nào cần ôn lại.',
  objectives: [
    'Hệ thống hoá kiến thức chương Phân số.',
    'Làm bài tập trắc nghiệm và tự luận tổng hợp: rút gọn, so sánh, đổi hỗn số, tính giá trị biểu thức, tìm $x$.',
    'Vận dụng phân số và hai bài toán về phân số để giải các bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức chương VI',
      blocks: [
        {
          type: 'table',
          caption: 'Kiến thức chính theo từng bài',
          head: ['Bài', 'Kiến thức cần nhớ'],
          rows: [
            [
              'Mở rộng phân số. Phân số bằng nhau',
              '$\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}$, $b \\ne 0$. $\\frac{a}{b} = \\frac{c}{d}$ khi $a \\cdot d = b \\cdot c$. Tính chất cơ bản: nhân hoặc chia cả tử và mẫu với cùng một số khác $0$ (chia cho một ước chung) được phân số bằng nó. Phân số tối giản: tử và mẫu chỉ có ước chung là $1$ và $-1$.',
            ],
            [
              'So sánh phân số. Hỗn số dương',
              'Quy đồng về cùng mẫu dương rồi so sánh tử. Phân số âm $< 0 <$ phân số dương. Hỗn số dương $q\\frac{r}{b} = \\frac{q \\cdot b + r}{b}$ với $0 < r < b$.',
            ],
            [
              'Phép cộng và phép trừ',
              'Cộng cùng mẫu: cộng các tử, giữ nguyên mẫu; khác mẫu: quy đồng trước. Tính chất giao hoán, kết hợp, cộng với $0$. $\\frac{a}{b} - \\frac{c}{d} = \\frac{a}{b} + \\left(-\\frac{c}{d}\\right)$. Quy tắc dấu ngoặc như với số nguyên.',
            ],
            [
              'Phép nhân và phép chia',
              '$\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}$; tính chất giao hoán, kết hợp, nhân với $1$, phân phối. Nghịch đảo của $\\frac{a}{b}$ ($a \\ne 0$) là $\\frac{b}{a}$. $\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}$.',
            ],
            [
              'Hai bài toán về phân số',
              '$\\frac{m}{n}$ của $a$ là $a \\cdot \\frac{m}{n}$. Số có $\\frac{m}{n}$ bằng $b$ là $b : \\frac{m}{n}$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thứ tự thực hiện phép tính',
          text: 'Với phân số, thứ tự thực hiện phép tính như với số nguyên: trong ngoặc trước; không có ngoặc thì nhân và chia trước, cộng và trừ sau.',
        },
      ],
    },
    {
      heading: 'Những lỗi hay gặp',
      blocks: [
        {
          type: 'list',
          items: [
            'Cộng cả tử lẫn mẫu: $\\frac{1}{2} + \\frac{1}{3} = \\frac{2}{5}$ là sai. Phải quy đồng: $\\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$.',
            'So sánh khi một mẫu còn âm: muốn so sánh $\\frac{2}{-3}$ với $\\frac{1}{3}$, trước hết viết $\\frac{2}{-3} = \\frac{-2}{3}$.',
            'Đảo nhầm số bị chia: $\\frac{2}{3} : \\frac{5}{7} = \\frac{2}{3} \\cdot \\frac{7}{5}$, chỉ số chia được đảo ngược.',
            'Nhầm số đối với số nghịch đảo: số đối của $\\frac{2}{3}$ là $\\frac{-2}{3}$, còn số nghịch đảo là $\\frac{3}{2}$.',
            'Nhầm hai bài toán: biết giá trị của một phần thì chia cho phân số, không nhân.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Mỗi lượt có 10 câu, hai câu cho mỗi bài của chương. Nhập số nguyên (ví dụ −7) hoặc phân số dạng a/b (ví dụ −3/4). Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng tô màu từng bài theo kết quả lần làm đầu, để em biết cần ôn lại bài nào.',
  },
  examples: [
    {
      problem: 'So sánh $\\frac{-11}{12}$ và $\\frac{17}{-18}$.',
      steps: [
        'Đưa về mẫu dương: $\\frac{17}{-18} = \\frac{-17}{18}$.',
        'Mẫu chung BCNN$(12, 18) = 36$: $\\frac{-11}{12} = \\frac{-33}{36}$, $\\frac{-17}{18} = \\frac{-34}{36}$.',
        'Vì $-33 > -34$ nên $\\frac{-11}{12} > \\frac{-17}{18}$.',
      ],
      answer: '$\\frac{-11}{12} > \\frac{17}{-18}$.',
    },
    {
      problem: 'Tính $\\left(\\frac{3}{4} - \\frac{1}{6}\\right) : \\frac{7}{12} + \\frac{-1}{2}$.',
      steps: [
        'Trong ngoặc trước: $\\frac{3}{4} - \\frac{1}{6} = \\frac{9}{12} - \\frac{2}{12} = \\frac{7}{12}$.',
        'Phép chia: $\\frac{7}{12} : \\frac{7}{12} = 1$.',
        'Phép cộng: $1 + \\frac{-1}{2} = \\frac{1}{2}$.',
      ],
      answer: 'Kết quả bằng $\\frac{1}{2}$.',
    },
    {
      problem:
        'Lớp 6B có $45$ học sinh. Số học sinh giỏi bằng $\\frac{2}{9}$ số học sinh cả lớp, số học sinh khá bằng $\\frac{3}{5}$ số học sinh còn lại, các bạn khác đạt mức đạt. Tính số học sinh mỗi loại.',
      steps: [
        'Số học sinh giỏi: $45 \\cdot \\frac{2}{9} = 10$ (học sinh).',
        'Số học sinh còn lại: $45 - 10 = 35$; số học sinh khá: $35 \\cdot \\frac{3}{5} = 21$ (học sinh).',
        'Số học sinh đạt mức đạt: $35 - 21 = 14$ (học sinh).',
      ],
      answer: 'Lớp có $10$ học sinh giỏi, $21$ học sinh khá và $14$ học sinh đạt.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Phân số nào bằng phân số $\\frac{-3}{4}$?',
      options: ['$\\frac{6}{-8}$', '$\\frac{6}{8}$', '$\\frac{-6}{-8}$', '$\\frac{3}{-8}$'],
      answer: 0,
      hints: [
        'Kiểm tra bằng tích chéo: $\\frac{a}{b} = \\frac{c}{d}$ khi $a \\cdot d = b \\cdot c$.',
      ],
      solution:
        '$(-3) \\cdot (-8) = 24 = 4 \\cdot 6$, nên $\\frac{6}{-8} = \\frac{-3}{4}$. Hai phân số $\\frac{6}{8}$ và $\\frac{-6}{-8}$ dương; $\\frac{3}{-8} = \\frac{-3}{8}$ có mẫu khác.',
    },
    {
      type: 'fraction',
      prompt: 'Rút gọn phân số $\\frac{-63}{81}$ về phân số tối giản.',
      answer: [-7, 9],
      simplest: true,
      hints: ['ƯCLN$(63, 81) = 9$.'],
      solution: '$\\frac{-63}{81} = \\frac{(-63) : 9}{81 : 9} = \\frac{-7}{9}$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các phân số theo thứ tự tăng dần.',
      items: ['$\\frac{2}{-3}$', '$\\frac{-3}{4}$', '$\\frac{5}{6}$', '$\\frac{1}{-12}$'],
      answer: [1, 0, 3, 2],
      hints: ['Đưa về mẫu dương rồi quy đồng với mẫu chung $12$.'],
      solution:
        '$\\frac{2}{-3} = \\frac{-8}{12}$, $\\frac{-3}{4} = \\frac{-9}{12}$, $\\frac{5}{6} = \\frac{10}{12}$, $\\frac{1}{-12} = \\frac{-1}{12}$. Vì $-9 < -8 < -1 < 10$ nên $\\frac{-3}{4} < \\frac{2}{-3} < \\frac{1}{-12} < \\frac{5}{6}$.',
    },
    {
      type: 'text',
      prompt:
        'Viết phân số $\\frac{23}{5}$ dưới dạng hỗn số (gõ phần nguyên, dấu cách, rồi phần phân số, ví dụ 2 1/5).',
      accept: ['4 3/5'],
      hints: ['Chia $23$ cho $5$ để tìm thương và số dư.'],
      solution: '$23 = 5 \\cdot 4 + 3$, nên $\\frac{23}{5} = 4\\frac{3}{5}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\frac{-7}{15} + \\frac{4}{-9}$.',
      answer: [-41, 45],
      simplest: true,
      hints: ['Viết $\\frac{4}{-9} = \\frac{-4}{9}$; mẫu chung BCNN$(15, 9) = 45$.'],
      solution:
        '$\\frac{-7}{15} + \\frac{-4}{9} = \\frac{-21}{45} + \\frac{-20}{45} = \\frac{-41}{45}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\frac{5}{8} \\cdot \\frac{-16}{25}$.',
      answer: [-2, 5],
      simplest: true,
      hints: ['Rút gọn $16$ với $8$ và $5$ với $25$ trước khi nhân.'],
      solution:
        '$\\frac{5}{8} \\cdot \\frac{-16}{25} = \\frac{5 \\cdot (-16)}{8 \\cdot 25} = \\frac{-80}{200} = \\frac{-2}{5}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $-2 : \\frac{4}{7}$.',
      answer: [-7, 2],
      simplest: true,
      hints: ['Nhân $-2$ với phân số nghịch đảo của $\\frac{4}{7}$.'],
      solution: '$-2 : \\frac{4}{7} = -2 \\cdot \\frac{7}{4} = \\frac{-14}{4} = \\frac{-7}{2}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tìm $x$, biết $x - \\frac{3}{5} = \\frac{-1}{10}$.',
      answer: [1, 2],
      hints: ['Số bị trừ bằng hiệu cộng với số trừ.'],
      solution:
        '$x = \\frac{-1}{10} + \\frac{3}{5} = \\frac{-1}{10} + \\frac{6}{10} = \\frac{5}{10} = \\frac{1}{2}$.',
    },
    {
      type: 'number',
      prompt:
        'Một bể nước đang chứa lượng nước bằng $\\frac{3}{5}$ thể tích bể, tức là $360$ lít. Bể chứa được nhiều nhất bao nhiêu lít nước?',
      answer: 600,
      unit: 'lít',
      hints: ['Biết giá trị $360$ lít ứng với $\\frac{3}{5}$ thể tích bể, cần tìm cả thể tích.'],
      solution: 'Thể tích bể là $360 : \\frac{3}{5} = 360 \\cdot \\frac{5}{3} = 600$ (lít).',
    },
    {
      type: 'number',
      prompt:
        'Lớp 6B có $45$ học sinh, số học sinh giỏi bằng $\\frac{2}{9}$ số học sinh cả lớp, số học sinh khá bằng $\\frac{3}{5}$ số học sinh còn lại. Lớp có bao nhiêu học sinh khá?',
      answer: 21,
      hints: [
        'Tính số học sinh giỏi rồi số học sinh còn lại.',
        'Phân số $\\frac{3}{5}$ là của số học sinh còn lại.',
      ],
      solution:
        'Học sinh giỏi: $45 \\cdot \\frac{2}{9} = 10$; còn lại $35$; học sinh khá: $35 \\cdot \\frac{3}{5} = 21$.',
    },
    {
      type: 'fraction',
      prompt:
        'Vòi thứ nhất chảy đầy một bể trong $3$ giờ, vòi thứ hai chảy đầy bể đó trong $6$ giờ. Nếu mở cả hai vòi cùng lúc thì mỗi giờ chảy được mấy phần bể?',
      answer: [1, 2],
      simplest: true,
      hints: [
        'Mỗi giờ vòi thứ nhất chảy được $\\frac{1}{3}$ bể, vòi thứ hai chảy được $\\frac{1}{6}$ bể.',
      ],
      solution:
        '$\\frac{1}{3} + \\frac{1}{6} = \\frac{2}{6} + \\frac{1}{6} = \\frac{3}{6} = \\frac{1}{2}$ bể mỗi giờ (nên sau $2$ giờ bể đầy).',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        '$\\frac{-5}{7} < 0$',
        '$\\frac{7}{8} > \\frac{8}{9}$',
        'Mọi phân số âm đều nhỏ hơn mọi phân số dương.',
        '$\\frac{4}{3} = 1\\frac{1}{3}$',
        'Số nghịch đảo của $\\frac{-2}{5}$ là $\\frac{2}{5}$.',
      ],
      answers: [0, 2, 3],
      hints: [
        'So sánh $\\frac{7}{8}$ và $\\frac{8}{9}$ bằng mẫu chung $72$.',
        'Tích của hai số nghịch đảo bằng $1$.',
      ],
      solution:
        '$\\frac{-5}{7}$ âm nên nhỏ hơn $0$. $\\frac{7}{8} = \\frac{63}{72} < \\frac{64}{72} = \\frac{8}{9}$, nên khẳng định thứ hai sai. Phân số âm $< 0 <$ phân số dương. $\\frac{4}{3} = 1\\frac{1}{3}$ vì $4 = 3 \\cdot 1 + 1$. Nghịch đảo của $\\frac{-2}{5}$ là $\\frac{-5}{2}$; $\\frac{2}{5}$ là số đối.',
    },
  ],
  takeaways: [
    'Luôn đưa mẫu âm về mẫu dương trước khi quy đồng, so sánh hay cộng trừ.',
    'Rút gọn kết quả về phân số tối giản; rút gọn trước khi nhân để số nhỏ hơn.',
    'Trừ là cộng với số đối, chia là nhân với số nghịch đảo.',
    '$\\frac{m}{n}$ của $a$ là $a \\cdot \\frac{m}{n}$; số có $\\frac{m}{n}$ bằng $b$ là $b : \\frac{m}{n}$.',
  ],
};
