/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về cộng, trừ, nhân, chia phân số, quy tắc dấu ngoặc, tìm số chưa biết và hai bài toán về phân số.',
  intro:
    'Bài luyện tập này ôn lại ba bài vừa học: phép cộng và phép trừ phân số (Bài 25), phép nhân và phép chia phân số (Bài 26), hai bài toán về phân số (Bài 27). Em sẽ tính giá trị biểu thức, tính nhanh bằng các tính chất, tìm $x$ và giải bài toán thực tế.',
  objectives: [
    'Cộng, trừ, nhân, chia phân số; dùng số đối, phân số nghịch đảo và quy tắc dấu ngoặc.',
    'Tính nhanh nhờ tính chất giao hoán, kết hợp và phân phối; thực hiện đúng thứ tự phép tính.',
    'Tìm số chưa biết trong một đẳng thức và giải hai bài toán về phân số.',
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
              'Cộng phân số',
              'Cùng mẫu: $\\frac{a}{m} + \\frac{b}{m} = \\frac{a + b}{m}$; khác mẫu: quy đồng mẫu rồi cộng',
            ],
            [
              'Trừ phân số',
              '$\\frac{a}{b} - \\frac{c}{d} = \\frac{a}{b} + \\left(-\\frac{c}{d}\\right)$; số đối của $\\frac{a}{b}$ là $-\\frac{a}{b} = \\frac{-a}{b}$',
            ],
            ['Dấu ngoặc', 'Bỏ ngoặc có dấu "$-$" đằng trước thì đổi dấu mọi số hạng trong ngoặc'],
            ['Nhân phân số', '$\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}$'],
            [
              'Chia phân số',
              '$\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}$ ($c \\ne 0$)',
            ],
            ['$\\frac{m}{n}$ của $a$', '$a \\cdot \\frac{m}{n}$'],
            ['Số có $\\frac{m}{n}$ bằng $b$', '$b : \\frac{m}{n}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Thứ tự thực hiện phép tính với phân số giống như với số nguyên: nhân, chia trước; cộng, trừ sau. $\\frac{1}{2} + \\frac{1}{2} \\cdot \\frac{-2}{3} = \\frac{1}{2} + \\frac{-1}{3} = \\frac{1}{6}$, không phải $1 \\cdot \\frac{-2}{3}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện ngẫu nhiên',
    instruction:
      'Mỗi lượt có 12 câu trộn từ Bài 25, Bài 26 và Bài 27. Nhập số nguyên (ví dụ −7) hoặc phân số dạng a/b (ví dụ −3/4). Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng cho biết bài nào cần ôn thêm.',
  },
  examples: [
    {
      problem: 'Tính một cách hợp lí: $\\frac{-3}{7} + \\frac{5}{13} + \\frac{-4}{7}$.',
      steps: [
        'Đổi chỗ và nhóm hai phân số cùng mẫu: $\\left(\\frac{-3}{7} + \\frac{-4}{7}\\right) + \\frac{5}{13}$.',
        '$\\frac{-3}{7} + \\frac{-4}{7} = \\frac{-7}{7} = -1$.',
        '$-1 + \\frac{5}{13} = \\frac{-13}{13} + \\frac{5}{13} = \\frac{-8}{13}$.',
      ],
      answer: 'Kết quả bằng $\\frac{-8}{13}$.',
    },
    {
      problem: 'Tìm $x$, biết $\\frac{3}{4} \\cdot x - \\frac{1}{2} = \\frac{1}{4}$.',
      steps: [
        'Coi $\\frac{3}{4} \\cdot x$ là số bị trừ: $\\frac{3}{4} \\cdot x = \\frac{1}{4} + \\frac{1}{2} = \\frac{3}{4}$.',
        'Tìm thừa số chưa biết: $x = \\frac{3}{4} : \\frac{3}{4} = 1$.',
      ],
      answer: '$x = 1$.',
    },
    {
      problem:
        'Một người bán trứng, buổi sáng bán $\\frac{3}{5}$ số trứng, buổi chiều bán $\\frac{1}{2}$ số trứng còn lại thì còn $24$ quả. Hỏi lúc đầu người đó có bao nhiêu quả trứng?',
      steps: [
        'Sau buổi sáng còn $1 - \\frac{3}{5} = \\frac{2}{5}$ số trứng.',
        'Buổi chiều bán $\\frac{1}{2}$ phần đó, nên còn $\\frac{1}{2}$ của $\\frac{2}{5}$, tức $\\frac{2}{5} \\cdot \\frac{1}{2} = \\frac{1}{5}$ số trứng ban đầu.',
        'Biết $\\frac{1}{5}$ số trứng là $24$ quả, nên lúc đầu có $24 : \\frac{1}{5} = 120$ quả.',
      ],
      answer: 'Lúc đầu có $120$ quả trứng.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt: 'Tính $\\frac{-5}{6} + \\frac{3}{4}$.',
      answer: [-1, 12],
      simplest: true,
      hints: ['Mẫu chung nhỏ nhất là BCNN$(6, 4) = 12$.'],
      solution:
        '$\\frac{-5}{6} + \\frac{3}{4} = \\frac{-10}{12} + \\frac{9}{12} = \\frac{-1}{12}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\frac{7}{8} - \\frac{-1}{6}$.',
      answer: [25, 24],
      simplest: true,
      hints: [
        'Trừ một phân số là cộng với số đối của nó: số đối của $\\frac{-1}{6}$ là $\\frac{1}{6}$.',
        'Mẫu chung là $24$.',
      ],
      solution:
        '$\\frac{7}{8} - \\frac{-1}{6} = \\frac{7}{8} + \\frac{1}{6} = \\frac{21}{24} + \\frac{4}{24} = \\frac{25}{24}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính một cách hợp lí: $\\frac{-2}{9} + \\frac{4}{11} + \\frac{-7}{9}$.',
      answer: [-7, 11],
      simplest: true,
      hints: ['Nhóm hai phân số có cùng mẫu $9$ với nhau.'],
      solution:
        '$\\left(\\frac{-2}{9} + \\frac{-7}{9}\\right) + \\frac{4}{11} = -1 + \\frac{4}{11} = \\frac{-11}{11} + \\frac{4}{11} = \\frac{-7}{11}$.',
    },
    {
      type: 'choice',
      prompt: 'Bỏ dấu ngoặc rồi tính: $\\frac{2}{5} - \\left(\\frac{2}{5} - \\frac{3}{7}\\right)$.',
      options: ['$\\frac{3}{7}$', '$\\frac{-3}{7}$', '$\\frac{4}{5} - \\frac{3}{7}$', '$0$'],
      answer: 0,
      hints: ['Trước ngoặc có dấu "$-$", nên đổi dấu mọi số hạng trong ngoặc.'],
      solution:
        '$\\frac{2}{5} - \\frac{2}{5} + \\frac{3}{7} = 0 + \\frac{3}{7} = \\frac{3}{7}$. Đáp án $\\frac{-3}{7}$ là do quên đổi dấu số hạng thứ hai.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\frac{-4}{5} \\cdot \\frac{15}{8}$.',
      answer: [-3, 2],
      simplest: true,
      hints: ['Rút gọn $15$ với $5$, và $4$ với $8$ trước khi nhân.'],
      solution:
        '$\\frac{-4}{5} \\cdot \\frac{15}{8} = \\frac{(-4) \\cdot 15}{5 \\cdot 8} = \\frac{-60}{40} = \\frac{-3}{2}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\frac{9}{10} : \\frac{-6}{5}$.',
      answer: [-3, 4],
      simplest: true,
      hints: [
        'Nhân $\\frac{9}{10}$ với phân số nghịch đảo của $\\frac{-6}{5}$, tức $\\frac{-5}{6}$.',
      ],
      solution:
        '$\\frac{9}{10} : \\frac{-6}{5} = \\frac{9}{10} \\cdot \\frac{-5}{6} = \\frac{-45}{60} = \\frac{-3}{4}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\frac{1}{2} + \\frac{1}{2} \\cdot \\frac{-2}{3}$.',
      answer: [1, 6],
      simplest: true,
      hints: ['Làm phép nhân trước, phép cộng sau.'],
      solution:
        '$\\frac{1}{2} \\cdot \\frac{-2}{3} = \\frac{-1}{3}$, nên biểu thức bằng $\\frac{1}{2} + \\frac{-1}{3} = \\frac{3}{6} + \\frac{-2}{6} = \\frac{1}{6}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính nhanh $\\frac{5}{9} \\cdot \\frac{7}{13} + \\frac{5}{9} \\cdot \\frac{9}{13} - \\frac{5}{9} \\cdot \\frac{3}{13}$.',
      answer: [5, 9],
      hints: ['Đặt $\\frac{5}{9}$ làm thừa số chung.'],
      solution:
        '$\\frac{5}{9} \\cdot \\left(\\frac{7}{13} + \\frac{9}{13} - \\frac{3}{13}\\right) = \\frac{5}{9} \\cdot \\frac{13}{13} = \\frac{5}{9}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tìm $x$, biết $x + \\frac{2}{3} = \\frac{-1}{4}$.',
      answer: [-11, 12],
      hints: ['Số hạng chưa biết bằng tổng trừ số hạng đã biết.'],
      solution:
        '$x = \\frac{-1}{4} - \\frac{2}{3} = \\frac{-3}{12} - \\frac{8}{12} = \\frac{-11}{12}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tìm $x$, biết $\\frac{3}{4} \\cdot x = \\frac{-9}{20}$.',
      answer: [-3, 5],
      hints: ['Thừa số chưa biết bằng tích chia cho thừa số đã biết.'],
      solution:
        '$x = \\frac{-9}{20} : \\frac{3}{4} = \\frac{-9}{20} \\cdot \\frac{4}{3} = \\frac{-36}{60} = \\frac{-3}{5}$.',
    },
    {
      type: 'number',
      prompt:
        'Một trường có $800$ học sinh, số học sinh khối 6 bằng $\\frac{5}{16}$ số học sinh toàn trường. Khối 6 có bao nhiêu học sinh?',
      answer: 250,
      hints: ['Tìm $\\frac{5}{16}$ của $800$.'],
      solution: '$800 \\cdot \\frac{5}{16} = \\frac{4\\,000}{16} = 250$ học sinh.',
    },
    {
      type: 'number',
      prompt:
        'Một người bán được $\\frac{3}{5}$ số trứng thì còn lại $48$ quả. Hỏi lúc đầu người đó có bao nhiêu quả trứng?',
      answer: 120,
      hints: [
        '$48$ quả là phần còn lại, ứng với $1 - \\frac{3}{5} = \\frac{2}{5}$ số trứng.',
        'Tìm số có $\\frac{2}{5}$ bằng $48$.',
      ],
      solution:
        'Số trứng còn lại bằng $\\frac{2}{5}$ số trứng lúc đầu, nên lúc đầu có $48 : \\frac{2}{5} = 48 \\cdot \\frac{5}{2} = 120$ quả.',
    },
  ],
  takeaways: [
    'Trừ phân số là cộng với số đối; chia phân số là nhân với phân số nghịch đảo.',
    'Nhóm các phân số cùng mẫu hoặc đặt thừa số chung để tính nhanh.',
    'Xác định đúng dạng bài toán: cả số đã biết thì nhân, giá trị một phần đã biết thì chia.',
  ],
};
