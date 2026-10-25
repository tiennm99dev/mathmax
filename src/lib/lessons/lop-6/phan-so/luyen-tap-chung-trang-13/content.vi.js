/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về phân số bằng nhau, rút gọn phân số, quy đồng mẫu, so sánh phân số và hỗn số dương.',
  intro:
    'Bài luyện tập này ôn lại hai bài vừa học: phân số với tử và mẫu là số nguyên, phân số bằng nhau, rút gọn phân số (Bài 23); quy đồng mẫu, so sánh phân số và hỗn số dương (Bài 24).',
  objectives: [
    'Nhận biết hai phân số bằng nhau, tìm số chưa biết trong một đẳng thức phân số.',
    'Rút gọn phân số về phân số tối giản và quy đồng mẫu nhiều phân số.',
    'So sánh, sắp xếp các phân số; đổi qua lại giữa phân số và hỗn số dương.',
  ],
  sections: [
    {
      heading: 'Nhắc lại kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            ['Phân số bằng nhau', '$\\frac{a}{b} = \\frac{c}{d}$ khi $a \\cdot d = b \\cdot c$'],
            [
              'Tính chất cơ bản',
              '$\\frac{a}{b} = \\frac{a \\cdot m}{b \\cdot m}$ ($m \\ne 0$); $\\frac{a}{b} = \\frac{a : n}{b : n}$ ($n \\in$ ƯC$(a, b)$)',
            ],
            ['Rút gọn về tối giản', 'Chia cả tử và mẫu cho ƯCLN của chúng (không kể dấu)'],
            ['Quy đồng mẫu', 'Mẫu dương, mẫu chung là BCNN các mẫu, nhân với thừa số phụ'],
            [
              'So sánh',
              'Cùng mẫu dương: tử lớn hơn thì phân số lớn hơn; khác mẫu thì quy đồng trước',
            ],
            [
              'Hỗn số dương',
              '$\\frac{a}{b} = q\\frac{r}{b}$ với $a = b \\cdot q + r$; $q\\frac{r}{b} = \\frac{q \\cdot b + r}{b}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Trước khi quy đồng hoặc so sánh, phải đưa phân số có mẫu âm về mẫu dương: $\\frac{3}{-4} = \\frac{-3}{4}$. Nếu chỉ so sánh tử khi một mẫu còn âm, kết quả sẽ sai.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện ngẫu nhiên',
    instruction:
      'Mỗi lượt có 10 câu trộn từ Bài 23 và Bài 24. Nhập số nguyên (ví dụ −7) hoặc phân số dạng a/b (ví dụ −3/4). Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng cho biết bài nào cần ôn thêm.',
  },
  examples: [
    {
      problem: 'So sánh $\\frac{-5}{6}$ và $\\frac{7}{-9}$.',
      steps: [
        'Đưa về mẫu dương: $\\frac{7}{-9} = \\frac{-7}{9}$.',
        'Mẫu chung BCNN$(6, 9) = 18$: $\\frac{-5}{6} = \\frac{-15}{18}$, $\\frac{-7}{9} = \\frac{-14}{18}$.',
        'So sánh tử: $-15 < -14$.',
      ],
      answer: '$\\frac{-5}{6} < \\frac{7}{-9}$.',
    },
    {
      problem: 'Tìm số nguyên $x$, biết $\\frac{x}{15} = \\frac{-12}{20}$.',
      steps: [
        'Rút gọn: $\\frac{-12}{20} = \\frac{-3}{5}$.',
        'Viết với mẫu $15$: $\\frac{-3}{5} = \\frac{-3 \\cdot 3}{5 \\cdot 3} = \\frac{-9}{15}$.',
        'Hai phân số cùng mẫu $15$ bằng nhau nên tử bằng nhau.',
      ],
      answer: '$x = -9$.',
    },
    {
      problem: 'Viết $\\frac{47}{6}$ dưới dạng hỗn số rồi so sánh với $7\\frac{2}{3}$.',
      steps: [
        '$47 = 6 \\cdot 7 + 5$, nên $\\frac{47}{6} = 7\\frac{5}{6}$.',
        '$7\\frac{2}{3} = \\frac{23}{3} = \\frac{46}{6}$, còn $\\frac{47}{6}$ có tử lớn hơn.',
      ],
      answer: '$\\frac{47}{6} = 7\\frac{5}{6} > 7\\frac{2}{3}$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt:
        'Rút gọn phân số $\\frac{45}{-60}$ về phân số tối giản (viết dạng a/b với mẫu dương).',
      answer: [-3, 4],
      simplest: true,
      hints: ['ƯCLN$(45, 60) = 15$.', 'Chia cả tử và mẫu cho $15$ rồi đưa dấu "$-$" lên tử.'],
      solution: '$\\frac{45}{-60} = \\frac{45 : 15}{(-60) : 15} = \\frac{3}{-4} = \\frac{-3}{4}$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số nguyên $x$, biết $\\frac{x}{-9} = \\frac{8}{12}$.',
      answer: -6,
      hints: ['Quy tắc bằng nhau: $x \\cdot 12 = (-9) \\cdot 8$.'],
      solution: '$x \\cdot 12 = (-9) \\cdot 8 = -72$, nên $x = (-72) : 12 = -6$.',
    },
    {
      type: 'choice',
      prompt: 'Phân số nào không bằng phân số $\\frac{-2}{5}$?',
      options: ['$\\frac{4}{-10}$', '$\\frac{-6}{15}$', '$\\frac{-4}{-10}$', '$\\frac{-10}{25}$'],
      answer: 2,
      hints: ['Một phân số có tử và mẫu cùng dấu thì dương, còn $\\frac{-2}{5}$ âm.'],
      solution:
        '$\\frac{-4}{-10} = \\frac{4}{10} = \\frac{2}{5}$ là phân số dương nên khác $\\frac{-2}{5}$. Ba phân số còn lại đều rút gọn được về $\\frac{-2}{5}$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các phân số theo thứ tự tăng dần.',
      items: ['$\\frac{5}{6}$', '$\\frac{-7}{12}$', '$\\frac{3}{-4}$', '$\\frac{2}{3}$'],
      answer: [2, 1, 3, 0],
      hints: ['Đưa về mẫu dương, rồi quy đồng với mẫu chung $12$.'],
      solution:
        '$\\frac{5}{6} = \\frac{10}{12}$, $\\frac{3}{-4} = \\frac{-9}{12}$, $\\frac{2}{3} = \\frac{8}{12}$. Vì $-9 < -7 < 8 < 10$ nên $\\frac{3}{-4} < \\frac{-7}{12} < \\frac{2}{3} < \\frac{5}{6}$.',
    },
    {
      type: 'choice',
      prompt: 'Điền dấu thích hợp: $\\frac{-15}{16} \\;\\square\\; \\frac{-16}{15}$.',
      options: ['$<$', '$=$', '$>$'],
      answer: 2,
      hints: [
        'So sánh mỗi phân số với $-1 = \\frac{-16}{16} = \\frac{-15}{15}$.',
        '$\\frac{-15}{16} > \\frac{-16}{16}$ và $\\frac{-16}{15} < \\frac{-15}{15}$.',
      ],
      solution:
        '$\\frac{-15}{16} > \\frac{-16}{16} = -1$ và $\\frac{-16}{15} < \\frac{-15}{15} = -1$. Theo tính chất bắc cầu, $\\frac{-15}{16} > \\frac{-16}{15}$.',
    },
    {
      type: 'text',
      prompt:
        'Viết phân số $\\frac{47}{6}$ dưới dạng hỗn số (gõ phần nguyên, dấu cách, rồi phần phân số, ví dụ 2 1/5).',
      accept: ['7 5/6'],
      hints: ['Chia $47$ cho $6$ để tìm thương và số dư.'],
      solution: '$47 = 6 \\cdot 7 + 5$, nên $\\frac{47}{6} = 7\\frac{5}{6}$.',
    },
    {
      type: 'fraction',
      prompt: 'Viết hỗn số $4\\frac{2}{7}$ dưới dạng phân số.',
      answer: [30, 7],
      hints: ['$4\\frac{2}{7} = \\frac{4 \\cdot 7 + 2}{7}$.'],
      solution: '$4\\frac{2}{7} = \\frac{4 \\cdot 7 + 2}{7} = \\frac{30}{7}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phân số dương.',
      options: [
        '$\\frac{-3}{-8}$',
        '$\\frac{0}{4}$',
        '$\\frac{-5}{9}$',
        '$\\frac{7}{-2}$',
        '$\\frac{11}{13}$',
      ],
      answers: [0, 4],
      hints: ['Phân số dương có tử và mẫu cùng dấu (và tử khác $0$).'],
      solution:
        '$\\frac{-3}{-8} = \\frac{3}{8}$ và $\\frac{11}{13}$ dương. $\\frac{0}{4} = 0$; $\\frac{-5}{9}$ và $\\frac{7}{-2}$ âm.',
    },
    {
      type: 'fraction',
      prompt:
        'Lớp 6A có $40$ học sinh, trong đó có $24$ học sinh nữ. Viết phân số tối giản biểu thị số học sinh nữ so với số học sinh cả lớp.',
      answer: [3, 5],
      simplest: true,
      hints: ['Phân số là $\\frac{24}{40}$.', 'ƯCLN$(24, 40) = 8$.'],
      solution: '$\\frac{24}{40} = \\frac{24 : 8}{40 : 8} = \\frac{3}{5}$.',
    },
    {
      type: 'choice',
      prompt:
        'An ăn $\\frac{3}{8}$ cái bánh, Bình ăn $\\frac{1}{3}$ cái bánh như thế. Ai ăn nhiều bánh hơn?',
      options: ['An', 'Bình', 'Hai bạn ăn bằng nhau'],
      answer: 0,
      hints: ['Quy đồng mẫu với mẫu chung $24$.'],
      solution:
        '$\\frac{3}{8} = \\frac{9}{24}$ và $\\frac{1}{3} = \\frac{8}{24}$. Vì $9 > 8$ nên An ăn nhiều hơn.',
    },
    {
      type: 'number',
      prompt:
        'Quy đồng mẫu ba phân số $\\frac{5}{12}$, $\\frac{-7}{18}$, $\\frac{1}{-8}$ với mẫu chung nhỏ nhất. Mẫu chung bằng bao nhiêu?',
      answer: 72,
      hints: [
        'Mẫu dương là $12$, $18$, $8$.',
        '$12 = 2^2 \\cdot 3$, $18 = 2 \\cdot 3^2$, $8 = 2^3$.',
      ],
      solution: 'BCNN$(12, 18, 8) = 2^3 \\cdot 3^2 = 72$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phân số với hỗn số bằng nó.',
      left: ['$\\frac{9}{4}$', '$\\frac{11}{3}$', '$\\frac{17}{5}$'],
      right: ['$2\\frac{1}{4}$', '$3\\frac{2}{3}$', '$3\\frac{2}{5}$', '$2\\frac{3}{4}$'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Chia tử cho mẫu: thương là phần số nguyên, số dư là tử của phần phân số.'],
      solution:
        '$9 = 4 \\cdot 2 + 1$ nên $\\frac{9}{4} = 2\\frac{1}{4}$; $11 = 3 \\cdot 3 + 2$ nên $\\frac{11}{3} = 3\\frac{2}{3}$; $17 = 5 \\cdot 3 + 2$ nên $\\frac{17}{5} = 3\\frac{2}{5}$.',
    },
  ],
  takeaways: [
    'Kiểm tra phân số bằng nhau bằng tích chéo; rút gọn bằng ƯCLN.',
    'Luôn đưa mẫu âm về mẫu dương trước khi quy đồng hay so sánh.',
    'So sánh nhanh bằng dấu (âm < 0 < dương) hoặc so với $1$, $-1$.',
  ],
};
