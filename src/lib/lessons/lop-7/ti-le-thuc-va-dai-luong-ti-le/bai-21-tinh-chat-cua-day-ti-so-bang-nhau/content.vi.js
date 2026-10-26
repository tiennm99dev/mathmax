/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Từ dãy tỉ số bằng nhau, tỉ số lập từ tổng (hoặc hiệu) các tử và tổng (hoặc hiệu) các mẫu tương ứng cũng bằng các tỉ số đó; vận dụng để tìm hai, ba số và giải bài toán chia tỉ lệ.',
  intro:
    'Ba lớp 7A, 7B, 7C quyên góp được $240$ quyển vở, số vở của ba lớp tỉ lệ với $3$; $4$; $5$. Mỗi lớp góp bao nhiêu quyển? Thử chia đều thì không đúng, đoán mò thì lâu. Tính chất của dãy tỉ số bằng nhau cho ta cách tính thẳng ra kết quả.',
  objectives: [
    'Phát biểu và vận dụng tính chất của dãy tỉ số bằng nhau.',
    'Hiểu cách viết $a : b : c = 2 : 3 : 5$ (các số $a$, $b$, $c$ tỉ lệ với $2$; $3$; $5$).',
    'Tìm hai hoặc ba số biết tổng (hoặc hiệu) của chúng và tỉ số giữa chúng.',
    'Giải bài toán chia một đại lượng thành các phần tỉ lệ với các số cho trước.',
  ],
  sections: [
    {
      heading: 'Tính chất của dãy tỉ số bằng nhau',
      blocks: [
        {
          type: 'p',
          text: 'Xét tỉ lệ thức $\\frac{2}{3} = \\frac{4}{6}$. Ta có $\\frac{2 + 4}{3 + 6} = \\frac{6}{9} = \\frac{2}{3}$ và $\\frac{2 - 4}{3 - 6} = \\frac{-2}{-3} = \\frac{2}{3}$: cộng (hoặc trừ) các tử và các mẫu tương ứng, ta vẫn được tỉ số cũ.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Từ $\\frac{a}{b} = \\frac{c}{d}$ suy ra $\\frac{a}{b} = \\frac{c}{d} = \\frac{a + c}{b + d} = \\frac{a - c}{b - d}$ (giả thiết các tỉ số đều có nghĩa, tức là $b \\ne d$ và $b \\ne -d$).',
        },
        {
          type: 'p',
          text: 'Giải thích: đặt $\\frac{a}{b} = \\frac{c}{d} = k$ thì $a = kb$ và $c = kd$. Khi đó $\\frac{a + c}{b + d} = \\frac{kb + kd}{b + d} = \\frac{k(b + d)}{b + d} = k$; tương tự với hiệu.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Mở rộng cho dãy ba tỉ số',
          text: 'Từ dãy tỉ số bằng nhau $\\frac{a}{b} = \\frac{c}{d} = \\frac{e}{f}$ suy ra $\\frac{a}{b} = \\frac{c}{d} = \\frac{e}{f} = \\frac{a + c + e}{b + d + f} = \\frac{a - c + e}{b - d + f}$ (giả thiết các tỉ số đều có nghĩa).',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Tính chất chỉ nói về tổng và hiệu: cộng (trừ) tử với tử, mẫu với mẫu. Không được lấy tích các tử chia cho tích các mẫu rồi cho rằng vẫn bằng tỉ số cũ.',
        },
      ],
    },
    {
      heading: 'Các số tỉ lệ và bài toán chia tỉ lệ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chú ý',
          text: 'Khi có dãy tỉ số $\\frac{a}{2} = \\frac{b}{3} = \\frac{c}{5}$, ta nói các số $a$, $b$, $c$ tỉ lệ với các số $2$; $3$; $5$. Ta cũng viết $a : b : c = 2 : 3 : 5$.',
        },
        {
          type: 'p',
          text: 'Chia một đại lượng thành các phần tỉ lệ với $m$, $n$, $p$ nghĩa là chia nó thành $m + n + p$ phần bằng nhau, phần thứ nhất gồm $m$ phần, phần thứ hai gồm $n$ phần, phần thứ ba gồm $p$ phần.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Gọi các số cần tìm là $x$, $y$, $z$ (kèm đơn vị và điều kiện nếu có).',
            'Viết dãy tỉ số bằng nhau từ đề bài, chẳng hạn $\\frac{x}{m} = \\frac{y}{n} = \\frac{z}{p}$.',
            'Áp dụng tính chất của dãy tỉ số bằng nhau với tổng (hoặc hiệu) đã biết để tính giá trị chung $k$.',
            'Tính $x = mk$, $y = nk$, $z = pk$ rồi trả lời.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Thanh chia phần theo tỉ lệ',
    instruction:
      'Chọn một bài toán rồi kéo các vết cắt để chia thanh thành các phần đúng tỉ lệ. Bảng bên dưới chia mỗi phần cho số tỉ lệ của nó: khi các thương bằng nhau là em đã chia đúng. Cần gợi ý thì bấm nút hiện các phần bằng nhau.',
  },
  examples: [
    {
      problem: 'Tìm hai số $x$, $y$, biết $\\frac{x}{3} = \\frac{y}{5}$ và $x + y = 32$.',
      steps: [
        'Áp dụng tính chất của dãy tỉ số bằng nhau: $\\frac{x}{3} = \\frac{y}{5} = \\frac{x + y}{3 + 5} = \\frac{32}{8} = 4$.',
        'Suy ra $x = 3 \\cdot 4 = 12$ và $y = 5 \\cdot 4 = 20$.',
        'Thử lại: $12 + 20 = 32$ và $\\frac{12}{3} = \\frac{20}{5} = 4$.',
      ],
      answer: '$x = 12$, $y = 20$.',
    },
    {
      problem: 'Tìm hai số $x$, $y$, biết $\\frac{x}{7} = \\frac{y}{4}$ và $x - y = 15$.',
      steps: [
        '$\\frac{x}{7} = \\frac{y}{4} = \\frac{x - y}{7 - 4} = \\frac{15}{3} = 5$.',
        'Suy ra $x = 7 \\cdot 5 = 35$ và $y = 4 \\cdot 5 = 20$.',
      ],
      answer: '$x = 35$, $y = 20$.',
    },
    {
      problem:
        'Ba lớp 7A, 7B, 7C quyên góp được $240$ quyển vở. Số vở của ba lớp tỉ lệ với $3$; $4$; $5$. Tính số vở mỗi lớp quyên góp được.',
      steps: [
        'Gọi số vở của ba lớp 7A, 7B, 7C lần lượt là $x$, $y$, $z$ (quyển). Ta có $\\frac{x}{3} = \\frac{y}{4} = \\frac{z}{5}$ và $x + y + z = 240$.',
        'Áp dụng tính chất của dãy tỉ số bằng nhau: $\\frac{x}{3} = \\frac{y}{4} = \\frac{z}{5} = \\frac{x + y + z}{3 + 4 + 5} = \\frac{240}{12} = 20$.',
        'Suy ra $x = 3 \\cdot 20 = 60$; $y = 4 \\cdot 20 = 80$; $z = 5 \\cdot 20 = 100$.',
      ],
      answer: 'Lớp 7A góp $60$ quyển, lớp 7B góp $80$ quyển, lớp 7C góp $100$ quyển.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Từ $\\frac{a}{b} = \\frac{c}{d}$ (các tỉ số đều có nghĩa), ta suy ra được đẳng thức nào?',
      options: [
        '$\\frac{a}{b} = \\frac{a + c}{b + d}$',
        '$\\frac{a}{b} = \\frac{a + c}{b \\cdot d}$',
        '$\\frac{a}{b} = \\frac{a \\cdot c}{b + d}$',
        '$\\frac{a}{b} = \\frac{a + d}{b + c}$',
      ],
      answer: 0,
      hints: ['Cộng tử với tử, mẫu với mẫu tương ứng.'],
      solution:
        'Theo tính chất của dãy tỉ số bằng nhau, $\\frac{a}{b} = \\frac{c}{d} = \\frac{a + c}{b + d}$. Các đẳng thức còn lại trộn phép nhân hoặc ghép sai tử với mẫu.',
    },
    {
      type: 'choice',
      prompt: 'Viết $x : y : z = 2 : 3 : 5$ có nghĩa là',
      options: [
        '$x = 2$, $y = 3$, $z = 5$',
        '$\\frac{x}{2} = \\frac{y}{3} = \\frac{z}{5}$',
        '$2x = 3y = 5z$',
        '$\\frac{x}{5} = \\frac{y}{3} = \\frac{z}{2}$',
      ],
      answer: 1,
      hints: ['Các số $x$, $y$, $z$ tỉ lệ với $2$; $3$; $5$.'],
      solution:
        '$x : y : z = 2 : 3 : 5$ nghĩa là $\\frac{x}{2} = \\frac{y}{3} = \\frac{z}{5}$; chẳng hạn $x = 4$, $y = 6$, $z = 10$ cũng thoả mãn, nên không bắt buộc $x = 2$.',
    },
    {
      type: 'number',
      prompt: 'Cho $\\frac{x}{2} = \\frac{y}{5}$ và $x + y = 28$. Tính $y$.',
      answer: 20,
      hints: ['$\\frac{x}{2} = \\frac{y}{5} = \\frac{x + y}{2 + 5}$.'],
      solution:
        '$\\frac{x}{2} = \\frac{y}{5} = \\frac{28}{7} = 4$, nên $y = 5 \\cdot 4 = 20$ (và $x = 8$).',
    },
    {
      type: 'number',
      prompt: 'Cho $\\frac{x}{5} = \\frac{y}{3}$ và $x - y = 6$. Tính $x$.',
      answer: 15,
      hints: ['Dùng hiệu: $\\frac{x - y}{5 - 3}$.'],
      solution:
        '$\\frac{x}{5} = \\frac{y}{3} = \\frac{x - y}{5 - 3} = \\frac{6}{2} = 3$, nên $x = 15$ (và $y = 9$).',
    },
    {
      type: 'number',
      prompt: 'Cho $\\frac{x}{4} = \\frac{y}{7}$ và $y - x = -12$. Tính $x$.',
      answer: -16,
      hints: [
        'Lấy hiệu theo đúng thứ tự $y - x$, nên mẫu là $7 - 4$.',
        'Giá trị chung của dãy tỉ số là một số âm.',
      ],
      solution:
        '$\\frac{x}{4} = \\frac{y}{7} = \\frac{y - x}{7 - 4} = \\frac{-12}{3} = -4$, nên $x = 4 \\cdot (-4) = -16$ (và $y = -28$).',
    },
    {
      type: 'number',
      prompt: 'Ba số $a$, $b$, $c$ thoả mãn $a : b : c = 2 : 3 : 4$ và $a + b + c = 45$. Tính $c$.',
      answer: 20,
      hints: ['$\\frac{a}{2} = \\frac{b}{3} = \\frac{c}{4} = \\frac{a + b + c}{2 + 3 + 4}$.'],
      solution:
        '$\\frac{a}{2} = \\frac{b}{3} = \\frac{c}{4} = \\frac{45}{9} = 5$, nên $c = 4 \\cdot 5 = 20$.',
    },
    {
      type: 'number',
      prompt:
        'Hai bạn chia $200$ nghìn đồng tiền thưởng theo tỉ lệ $3 : 5$. Bạn nhận ít hơn được bao nhiêu nghìn đồng?',
      answer: 75,
      hints: ['Chia $200$ thành $3 + 5 = 8$ phần bằng nhau.'],
      solution:
        'Gọi số tiền hai bạn nhận là $x$, $y$ (nghìn đồng): $\\frac{x}{3} = \\frac{y}{5} = \\frac{x + y}{8} = \\frac{200}{8} = 25$. Bạn nhận ít hơn được $x = 3 \\cdot 25 = 75$ nghìn đồng (bạn kia $125$ nghìn đồng).',
    },
    {
      type: 'number',
      prompt:
        'Một tam giác có chu vi $36$ cm, độ dài ba cạnh tỉ lệ với $3$; $4$; $5$. Cạnh dài nhất của tam giác dài bao nhiêu xăng-ti-mét?',
      answer: 15,
      unit: 'cm',
      hints: [
        'Chu vi là tổng ba cạnh.',
        '$\\frac{a}{3} = \\frac{b}{4} = \\frac{c}{5} = \\frac{36}{12}$.',
      ],
      solution:
        'Gọi ba cạnh là $a$, $b$, $c$ (cm): $\\frac{a}{3} = \\frac{b}{4} = \\frac{c}{5} = \\frac{a + b + c}{12} = \\frac{36}{12} = 3$. Cạnh dài nhất $c = 5 \\cdot 3 = 15$ cm (hai cạnh kia $9$ cm và $12$ cm).',
    },
    {
      type: 'number',
      prompt:
        'Số học sinh của ba khối 6, 7, 8 tỉ lệ với $10$; $9$; $8$. Khối 6 nhiều hơn khối 8 là $50$ học sinh. Khối 7 có bao nhiêu học sinh?',
      answer: 225,
      hints: [
        'Gọi số học sinh ba khối là $a$, $b$, $c$; biết hiệu $a - c = 50$.',
        '$\\frac{a}{10} = \\frac{c}{8} = \\frac{a - c}{10 - 8}$.',
      ],
      solution:
        '$\\frac{a}{10} = \\frac{b}{9} = \\frac{c}{8} = \\frac{a - c}{10 - 8} = \\frac{50}{2} = 25$, nên khối 7 có $b = 9 \\cdot 25 = 225$ học sinh (khối 6 có $250$, khối 8 có $200$).',
    },
  ],
  takeaways: [
    '$\\frac{a}{b} = \\frac{c}{d} = \\frac{a + c}{b + d} = \\frac{a - c}{b - d}$ (các tỉ số có nghĩa).',
    'Mở rộng: $\\frac{a}{b} = \\frac{c}{d} = \\frac{e}{f} = \\frac{a + c + e}{b + d + f} = \\frac{a - c + e}{b - d + f}$.',
    '$a : b : c = 2 : 3 : 5$ nghĩa là $\\frac{a}{2} = \\frac{b}{3} = \\frac{c}{5}$: $a$, $b$, $c$ tỉ lệ với $2$; $3$; $5$.',
    'Chia tỉ lệ: lập dãy tỉ số, dùng tổng hoặc hiệu đã biết để tìm giá trị chung $k$, rồi nhân $k$ với từng số tỉ lệ.',
  ],
};
