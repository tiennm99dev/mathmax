/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về tỉ lệ thức và tính chất của dãy tỉ số bằng nhau: tìm số hạng chưa biết, lập tỉ lệ thức từ đẳng thức tích, tìm các số biết tổng hoặc hiệu và giải bài toán chia tỉ lệ.',
  intro:
    'Bài luyện tập này ôn lại hai bài đầu của chương: Tỉ lệ thức (Bài 20) và Tính chất của dãy tỉ số bằng nhau (Bài 21). Em sẽ dùng tích chéo để tìm số hạng chưa biết, rồi dùng dãy tỉ số bằng nhau để tìm các số khi biết tổng hoặc hiệu của chúng.',
  objectives: [
    'Nhận biết tỉ lệ thức, tìm số hạng chưa biết và lập tỉ lệ thức từ một đẳng thức tích.',
    'Vận dụng tính chất của dãy tỉ số bằng nhau để tìm hai, ba số biết tổng hoặc hiệu.',
    'Giải bài toán thực tế chia một đại lượng theo tỉ lệ cho trước.',
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
              'Tỉ lệ thức',
              '$\\frac{a}{b} = \\frac{c}{d}$ hay $a : b = c : d$; $a$, $d$ là ngoại tỉ, $b$, $c$ là trung tỉ.',
            ],
            ['Tính chất 1', 'Nếu $\\frac{a}{b} = \\frac{c}{d}$ thì $ad = bc$.'],
            [
              'Tính chất 2',
              'Nếu $ad = bc$ ($a, b, c, d \\ne 0$) thì $\\frac{a}{b} = \\frac{c}{d}$, $\\frac{a}{c} = \\frac{b}{d}$, $\\frac{d}{b} = \\frac{c}{a}$, $\\frac{d}{c} = \\frac{b}{a}$.',
            ],
            [
              'Dãy tỉ số bằng nhau',
              '$\\frac{a}{b} = \\frac{c}{d} = \\frac{e}{f} = \\frac{a + c + e}{b + d + f} = \\frac{a - c + e}{b - d + f}$ (các tỉ số có nghĩa).',
            ],
            [
              'Số tỉ lệ',
              '$a : b : c = m : n : p$ nghĩa là $\\frac{a}{m} = \\frac{b}{n} = \\frac{c}{p}$.',
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
            'Tìm ngoại tỉ: tích hai trung tỉ chia ngoại tỉ đã biết; tìm trung tỉ: tích hai ngoại tỉ chia trung tỉ đã biết.',
            'Khi đề cho $x : y = 5 : 3$, viết lại thành $\\frac{x}{5} = \\frac{y}{3}$ trước khi áp dụng tính chất của dãy tỉ số.',
            'Khi đề cho tổng có hệ số như $a + 2b - c$, đổi $\\frac{b}{3}$ thành $\\frac{2b}{6}$ để tử khớp với tổng đã biết.',
            'Lấy hiệu thì giữ đúng thứ tự ở cả tử và mẫu: $\\frac{x - y}{m - n}$, và kiểm tra mẫu khác $0$.',
            'Thử lại kết quả với điều kiện của đề bài.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện trộn ngẫu nhiên',
    instruction:
      'Mỗi lượt có 10 câu trộn ngẫu nhiên từ Bài 20 và Bài 21. Đáp số luôn là số nguyên; nhập số âm với dấu trừ, ví dụ $-7$. Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng cho biết bài nào cần ôn thêm.',
  },
  examples: [
    {
      problem: 'Tìm $x$, biết $1{,}2 : x = 2 : 5$.',
      steps: [
        '$x$ là một trung tỉ, nên $2 \\cdot x = 1{,}2 \\cdot 5 = 6$.',
        '$x = 6 : 2 = 3$.',
        'Thử lại: $1{,}2 : 3 = 0{,}4$ và $2 : 5 = 0{,}4$.',
      ],
      answer: '$x = 3$.',
    },
    {
      problem:
        'Tìm ba số $x$, $y$, $z$, biết $\\frac{x}{2} = \\frac{y}{3} = \\frac{z}{5}$ và $x - y + z = 20$.',
      steps: [
        'Áp dụng tính chất của dãy tỉ số bằng nhau: $\\frac{x}{2} = \\frac{y}{3} = \\frac{z}{5} = \\frac{x - y + z}{2 - 3 + 5} = \\frac{20}{4} = 5$.',
        'Suy ra $x = 2 \\cdot 5 = 10$; $y = 3 \\cdot 5 = 15$; $z = 5 \\cdot 5 = 25$.',
        'Thử lại: $10 - 15 + 25 = 20$.',
      ],
      answer: '$x = 10$, $y = 15$, $z = 25$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tìm $x$, biết $0{,}6 : x = 1{,}5 : 2{,}5$.',
      answer: 1,
      hints: ['$x$ là một trung tỉ.', 'Tích hai ngoại tỉ: $0{,}6 \\cdot 2{,}5$.'],
      solution: 'Ta có $1{,}5 \\cdot x = 0{,}6 \\cdot 2{,}5 = 1{,}5$, nên $x = 1{,}5 : 1{,}5 = 1$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $x$, biết $\\frac{3}{x} = \\frac{-9}{12}$.',
      answer: -4,
      hints: ['Nhân chéo: $3 \\cdot 12 = x \\cdot (-9)$.'],
      solution: 'Ta có $-9x = 3 \\cdot 12 = 36$, nên $x = 36 : (-9) = -4$.',
    },
    {
      type: 'choice',
      prompt: 'Từ đẳng thức $4 \\cdot (-15) = (-6) \\cdot 10$, ta lập được tỉ lệ thức nào?',
      options: [
        '$\\frac{4}{10} = \\frac{-15}{-6}$',
        '$\\frac{4}{-6} = \\frac{-15}{10}$',
        '$\\frac{4}{-6} = \\frac{10}{-15}$',
        '$\\frac{-6}{4} = \\frac{10}{-15}$',
      ],
      answer: 2,
      hints: [
        'Hai số $4$ và $-15$ ở cùng một vế là hai ngoại tỉ.',
        'Ngoại tỉ đứng ở tử số thứ nhất và mẫu số thứ hai.',
      ],
      solution:
        'Với ngoại tỉ $4$, $-15$ và trung tỉ $-6$, $10$: $\\frac{4}{-6} = \\frac{10}{-15}$ (cả hai bằng $-\\frac{2}{3}$). Các đẳng thức khác sai, chẳng hạn $\\frac{4}{10} = 0{,}4$ còn $\\frac{-15}{-6} = 2{,}5$.',
    },
    {
      type: 'choice',
      prompt: 'Từ tỉ lệ thức $\\frac{x}{y} = \\frac{3}{4}$ ($y \\ne 0$) suy ra',
      options: [
        '$\\frac{x}{3} = \\frac{y}{4}$',
        '$\\frac{x}{4} = \\frac{y}{3}$',
        '$3x = 4y$',
        '$x = 3$ và $y = 4$',
      ],
      answer: 0,
      hints: ['Viết tích chéo của $\\frac{x}{y} = \\frac{3}{4}$, rồi lập lại tỉ lệ thức.'],
      solution:
        'Từ $\\frac{x}{y} = \\frac{3}{4}$ có $4x = 3y$; đổi chỗ hai trung tỉ $y$ và $3$ ta được $\\frac{x}{3} = \\frac{y}{4}$. Không nhất thiết $x = 3$, $y = 4$: chẳng hạn $x = 6$, $y = 8$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $x$, biết $\\frac{x}{3} = \\frac{y}{4}$ và $x + y = 21$.',
      answer: 9,
      hints: ['$\\frac{x}{3} = \\frac{y}{4} = \\frac{x + y}{3 + 4}$.'],
      solution: '$\\frac{x}{3} = \\frac{y}{4} = \\frac{21}{7} = 3$, nên $x = 9$ (và $y = 12$).',
    },
    {
      type: 'number',
      prompt: 'Tìm $y$, biết $\\frac{x}{5} = \\frac{y}{2}$ và $x - y = -12$.',
      answer: -8,
      hints: [
        '$\\frac{x}{5} = \\frac{y}{2} = \\frac{x - y}{5 - 2}$.',
        'Giá trị chung là một số âm.',
      ],
      solution:
        '$\\frac{x}{5} = \\frac{y}{2} = \\frac{-12}{3} = -4$, nên $y = 2 \\cdot (-4) = -8$ (và $x = -20$).',
    },
    {
      type: 'number',
      prompt: 'Tìm $x$, biết $x : y = 5 : 3$ và $x + y = 32$.',
      answer: 20,
      hints: ['Viết $x : y = 5 : 3$ thành $\\frac{x}{5} = \\frac{y}{3}$.'],
      solution:
        '$\\frac{x}{5} = \\frac{y}{3} = \\frac{x + y}{8} = \\frac{32}{8} = 4$, nên $x = 20$ (và $y = 12$).',
    },
    {
      type: 'number',
      prompt: 'Cho $\\frac{a}{2} = \\frac{b}{3} = \\frac{c}{4}$ và $a + 2b - c = 24$. Tính $b$.',
      answer: 18,
      hints: [
        'Viết $\\frac{b}{3} = \\frac{2b}{6}$ để có tử $2b$.',
        '$\\frac{a}{2} = \\frac{2b}{6} = \\frac{c}{4} = \\frac{a + 2b - c}{2 + 6 - 4}$.',
      ],
      solution:
        '$\\frac{a}{2} = \\frac{2b}{6} = \\frac{c}{4} = \\frac{a + 2b - c}{2 + 6 - 4} = \\frac{24}{4} = 6$, nên $b = 3 \\cdot 6 = 18$ (và $a = 12$, $c = 24$; thử lại $12 + 36 - 24 = 24$).',
    },
    {
      type: 'number',
      prompt:
        'Ba anh em được bà cho $900$ nghìn đồng, chia theo tỉ lệ với tuổi của mỗi người là $5$; $7$; $8$. Người anh cả ($8$ tuổi) nhận được bao nhiêu nghìn đồng?',
      answer: 360,
      hints: ['Chia $900$ thành $5 + 7 + 8 = 20$ phần bằng nhau.'],
      solution:
        'Gọi số tiền ba người nhận là $x$, $y$, $z$ (nghìn đồng): $\\frac{x}{5} = \\frac{y}{7} = \\frac{z}{8} = \\frac{900}{20} = 45$. Người anh cả nhận $z = 8 \\cdot 45 = 360$ nghìn đồng (hai em nhận $225$ và $315$ nghìn đồng).',
    },
    {
      type: 'number',
      prompt:
        'Số cây trồng được của hai lớp 7A và 7B tỉ lệ với $4$ và $5$. Lớp 7B trồng nhiều hơn lớp 7A là $12$ cây. Lớp 7A trồng được bao nhiêu cây?',
      answer: 48,
      hints: [
        'Gọi số cây của 7A, 7B là $a$, $b$; ta có $\\frac{a}{4} = \\frac{b}{5}$ và $b - a = 12$.',
      ],
      solution:
        '$\\frac{a}{4} = \\frac{b}{5} = \\frac{b - a}{5 - 4} = \\frac{12}{1} = 12$, nên lớp 7A trồng $a = 4 \\cdot 12 = 48$ cây (lớp 7B trồng $60$ cây).',
    },
  ],
  takeaways: [
    'Trong tỉ lệ thức, tích ngoại tỉ bằng tích trung tỉ; dùng điều đó để tìm số hạng chưa biết.',
    'Từ một đẳng thức tích có bốn số khác $0$ lập được bốn tỉ lệ thức.',
    'Biết tổng hoặc hiệu, dùng dãy tỉ số bằng nhau để tìm giá trị chung rồi nhân với từng số tỉ lệ.',
    'Luôn thử lại kết quả với điều kiện của đề bài.',
  ],
};
