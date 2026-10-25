/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Quy đồng mẫu nhiều phân số, so sánh hai phân số cùng mẫu và khác mẫu, phân số dương và phân số âm, cách viết một phân số dương lớn hơn 1 thành hỗn số dương và ngược lại.',
  intro:
    'Lớp 6A có $\\frac{7}{10}$ số học sinh thích bóng đá, lớp 6B có $\\frac{11}{15}$ số học sinh thích bóng đá. Tỉ lệ ở lớp nào cao hơn? Hai phân số có mẫu khác nhau nên chưa so sánh ngay được. Bài này cho em cách đưa chúng về cùng mẫu để so sánh, và cách viết những phân số lớn hơn $1$ như $\\frac{7}{4}$ thành hỗn số $1\\frac{3}{4}$.',
  objectives: [
    'Quy đồng mẫu nhiều phân số.',
    'So sánh hai phân số cùng mẫu, khác mẫu; nhận biết phân số dương, phân số âm.',
    'Viết một phân số dương lớn hơn $1$ thành hỗn số dương và viết hỗn số dương thành phân số.',
  ],
  sections: [
    {
      heading: 'Quy đồng mẫu nhiều phân số',
      blocks: [
        {
          type: 'p',
          text: 'Quy đồng mẫu nhiều phân số là biến đổi chúng thành những phân số lần lượt bằng chúng và có cùng một mẫu. Theo tính chất cơ bản của phân số, ta làm như sau.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Viết các phân số đã cho về phân số có mẫu dương. Tìm bội chung của các mẫu (thường là BCNN) để làm mẫu chung.',
            'Tìm thừa số phụ của mỗi mẫu bằng cách chia mẫu chung cho từng mẫu.',
            'Nhân tử và mẫu của mỗi phân số với thừa số phụ tương ứng.',
          ],
        },
        {
          type: 'p',
          text: 'Ví dụ, quy đồng $\\frac{-3}{4}$, $\\frac{5}{9}$ và $\\frac{2}{3}$: mẫu chung là BCNN$(4, 9, 3) = 36$; thừa số phụ lần lượt là $9$, $4$, $12$; ta được $\\frac{-27}{36}$, $\\frac{20}{36}$, $\\frac{24}{36}$.',
        },
      ],
    },
    {
      heading: 'So sánh hai phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cùng mẫu',
          text: 'Trong hai phân số có cùng một mẫu dương, phân số nào có tử lớn hơn thì phân số đó lớn hơn. Chẳng hạn $\\frac{-5}{7} < \\frac{2}{7}$ vì $-5 < 2$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Khác mẫu',
          text: 'Muốn so sánh hai phân số không cùng mẫu, ta viết chúng dưới dạng hai phân số có cùng một mẫu dương rồi so sánh các tử với nhau: phân số nào có tử lớn hơn thì lớn hơn.',
        },
        {
          type: 'p',
          text: 'Ở phần mở đầu: $\\frac{7}{10} = \\frac{21}{30}$ và $\\frac{11}{15} = \\frac{22}{30}$. Vì $21 < 22$ nên $\\frac{7}{10} < \\frac{11}{15}$: tỉ lệ ở lớp 6B cao hơn.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phân số dương, phân số âm',
          text: 'Phân số lớn hơn $0$ gọi là phân số dương; phân số nhỏ hơn $0$ gọi là phân số âm. Phân số có tử và mẫu cùng dấu là phân số dương, có tử và mẫu khác dấu là phân số âm.',
        },
        {
          type: 'list',
          items: [
            'Mọi phân số âm đều nhỏ hơn mọi phân số dương: $\\frac{-5}{57} < 0 < \\frac{31}{32}$.',
            'So sánh với $1$: phân số dương có tử nhỏ hơn mẫu (cả hai dương) thì nhỏ hơn $1$, có tử lớn hơn mẫu thì lớn hơn $1$. Chẳng hạn $\\frac{2\\,023}{2\\,024} < 1 < \\frac{2\\,024}{2\\,023}$.',
            'Tính chất bắc cầu: nếu $\\frac{a}{b} < \\frac{c}{d}$ và $\\frac{c}{d} < \\frac{p}{q}$ thì $\\frac{a}{b} < \\frac{p}{q}$.',
          ],
        },
      ],
    },
    {
      heading: 'Hỗn số dương',
      blocks: [
        {
          type: 'p',
          text: 'Chia $7$ cái bánh cho $4$ người: mỗi người được $\\frac{7}{4}$ cái bánh. Vì $7 = 4 \\cdot 1 + 3$ nên $\\frac{7}{4} = 1 + \\frac{3}{4}$: mỗi người được $1$ cái bánh và $\\frac{3}{4}$ cái bánh nữa.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hỗn số dương',
          text: 'Ta viết $1 + \\frac{3}{4}$ gọn là $1\\frac{3}{4}$ và gọi là một hỗn số dương, đọc là "một và ba phần tư"; $1$ là phần số nguyên, $\\frac{3}{4}$ là phần phân số. Phần phân số của hỗn số luôn nhỏ hơn $1$.',
        },
        {
          type: 'list',
          items: [
            'Phân số dương sang hỗn số: chia tử cho mẫu; thương là phần số nguyên, số dư là tử của phần phân số, mẫu giữ nguyên. Ví dụ $\\frac{24}{7} = 3\\frac{3}{7}$ vì $24 = 7 \\cdot 3 + 3$.',
            'Hỗn số sang phân số: $a\\frac{b}{c} = \\frac{a \\cdot c + b}{c}$. Ví dụ $2\\frac{3}{5} = \\frac{2 \\cdot 5 + 3}{5} = \\frac{13}{5}$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Chỉ phân số dương lớn hơn $1$ mà không bằng một số nguyên mới viết được thành hỗn số dương. $\\frac{3}{4}$ nhỏ hơn $1$ nên không viết thành hỗn số; $\\frac{8}{4} = 2$ là số nguyên.',
        },
      ],
    },
  ],
  explore: {
    title: 'Trục số và hình bánh',
    instruction:
      'Chế độ "So sánh trên trục số": kéo điểm đỏ (hoặc dùng phím mũi tên) đến từng phân số rồi bấm "Đặt vào đây"; khi đặt xong cả bộ, em sẽ thấy thứ tự tăng dần. Chế độ "Hỗn số bằng hình bánh": đổi tử, mẫu hoặc chạm vào các phần hình tròn để xem phân số được tách thành phần nguyên và phần phân số.',
  },
  examples: [
    {
      problem: 'Quy đồng mẫu hai phân số $\\frac{-3}{4}$ và $\\frac{5}{-6}$.',
      steps: [
        'Viết về mẫu dương: $\\frac{5}{-6} = \\frac{-5}{6}$.',
        'Mẫu chung là BCNN$(4, 6) = 12$. Thừa số phụ: $12 : 4 = 3$ và $12 : 6 = 2$.',
        '$\\frac{-3}{4} = \\frac{-3 \\cdot 3}{4 \\cdot 3} = \\frac{-9}{12}$; $\\frac{-5}{6} = \\frac{-5 \\cdot 2}{6 \\cdot 2} = \\frac{-10}{12}$.',
      ],
      answer: '$\\frac{-9}{12}$ và $\\frac{-10}{12}$.',
    },
    {
      problem: 'So sánh $\\frac{-3}{4}$ và $\\frac{5}{-6}$.',
      steps: [
        'Theo ví dụ trên, $\\frac{-3}{4} = \\frac{-9}{12}$ và $\\frac{5}{-6} = \\frac{-10}{12}$.',
        'Hai phân số có cùng mẫu dương $12$; so sánh tử: $-9 > -10$.',
      ],
      answer: '$\\frac{-3}{4} > \\frac{5}{-6}$.',
    },
    {
      problem: 'Viết $\\frac{17}{5}$ dưới dạng hỗn số, rồi viết $2\\frac{1}{3}$ dưới dạng phân số.',
      steps: [
        'Chia $17$ cho $5$: thương $3$, dư $2$, tức $17 = 5 \\cdot 3 + 2$.',
        'Vậy $\\frac{17}{5} = 3 + \\frac{2}{5} = 3\\frac{2}{5}$.',
        '$2\\frac{1}{3} = \\frac{2 \\cdot 3 + 1}{3} = \\frac{7}{3}$.',
      ],
      answer: '$\\frac{17}{5} = 3\\frac{2}{5}$ và $2\\frac{1}{3} = \\frac{7}{3}$.',
    },
    {
      problem: 'Không quy đồng, so sánh $\\frac{31}{32}$ và $\\frac{-5}{57}$.',
      steps: [
        '$\\frac{31}{32}$ có tử và mẫu cùng dấu nên là phân số dương: $\\frac{31}{32} > 0$.',
        '$\\frac{-5}{57}$ có tử và mẫu khác dấu nên là phân số âm: $\\frac{-5}{57} < 0$.',
      ],
      answer: '$\\frac{-5}{57} < 0 < \\frac{31}{32}$, nên $\\frac{31}{32} > \\frac{-5}{57}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Điền dấu thích hợp: $\\frac{7}{10} \\;\\square\\; \\frac{11}{15}$.',
      options: ['$<$', '$=$', '$>$'],
      answer: 0,
      hints: ['Quy đồng mẫu với mẫu chung BCNN$(10, 15)$.', 'BCNN$(10, 15) = 30$.'],
      solution:
        '$\\frac{7}{10} = \\frac{21}{30}$, $\\frac{11}{15} = \\frac{22}{30}$; vì $21 < 22$ nên $\\frac{7}{10} < \\frac{11}{15}$.',
    },
    {
      type: 'number',
      prompt:
        'Khi quy đồng mẫu ba phân số $\\frac{-3}{4}$, $\\frac{5}{9}$, $\\frac{2}{3}$ với mẫu chung nhỏ nhất, mẫu chung bằng bao nhiêu?',
      answer: 36,
      hints: ['Mẫu chung nhỏ nhất là BCNN của các mẫu.', 'Tìm BCNN$(4, 9, 3)$.'],
      solution: 'BCNN$(4, 9, 3) = 36$ (vì $4 = 2^2$, $9 = 3^2$, $3$ là ước của $9$).',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các phân số theo thứ tự tăng dần.',
      items: ['$\\frac{2}{3}$', '$\\frac{-5}{6}$', '$\\frac{1}{-3}$', '$\\frac{3}{4}$'],
      answer: [1, 2, 0, 3],
      hints: [
        'Viết các phân số về mẫu dương rồi quy đồng với mẫu chung $12$.',
        'Ta được $\\frac{8}{12}$, $\\frac{-10}{12}$, $\\frac{-4}{12}$, $\\frac{9}{12}$; so sánh các tử.',
      ],
      solution:
        '$\\frac{2}{3} = \\frac{8}{12}$, $\\frac{-5}{6} = \\frac{-10}{12}$, $\\frac{1}{-3} = \\frac{-4}{12}$, $\\frac{3}{4} = \\frac{9}{12}$. Vì $-10 < -4 < 8 < 9$ nên $\\frac{-5}{6} < \\frac{1}{-3} < \\frac{2}{3} < \\frac{3}{4}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phân số âm.',
      options: [
        '$\\frac{-3}{5}$',
        '$\\frac{-4}{-7}$',
        '$\\frac{2}{-9}$',
        '$\\frac{0}{5}$',
        '$\\frac{6}{11}$',
      ],
      answers: [0, 2],
      hints: ['Phân số âm có tử và mẫu khác dấu.', '$\\frac{0}{5} = 0$ không dương cũng không âm.'],
      solution:
        '$\\frac{-3}{5}$ và $\\frac{2}{-9}$ có tử và mẫu khác dấu nên âm. $\\frac{-4}{-7}$ và $\\frac{6}{11}$ dương; $\\frac{0}{5} = 0$.',
    },
    {
      type: 'text',
      prompt:
        'Viết phân số $\\frac{24}{7}$ dưới dạng hỗn số (gõ phần nguyên, dấu cách, rồi phần phân số, ví dụ 2 1/5).',
      accept: ['3 3/7'],
      hints: ['Chia $24$ cho $7$, tìm thương và số dư.', '$24 = 7 \\cdot 3 + 3$.'],
      solution: '$24 = 7 \\cdot 3 + 3$, nên $\\frac{24}{7} = 3\\frac{3}{7}$.',
    },
    {
      type: 'number',
      prompt:
        'Viết hỗn số $2\\frac{3}{5}$ dưới dạng phân số có mẫu $5$. Tử số của phân số đó bằng bao nhiêu?',
      answer: 13,
      hints: ['$a\\frac{b}{c} = \\frac{a \\cdot c + b}{c}$.'],
      solution: '$2\\frac{3}{5} = \\frac{2 \\cdot 5 + 3}{5} = \\frac{13}{5}$.',
    },
    {
      type: 'choice',
      prompt: 'So sánh $\\frac{2\\,023}{2\\,024}$ và $\\frac{2\\,024}{2\\,023}$.',
      options: [
        '$\\frac{2\\,023}{2\\,024} < \\frac{2\\,024}{2\\,023}$',
        '$\\frac{2\\,023}{2\\,024} = \\frac{2\\,024}{2\\,023}$',
        '$\\frac{2\\,023}{2\\,024} > \\frac{2\\,024}{2\\,023}$',
      ],
      answer: 0,
      hints: ['So sánh mỗi phân số với $1$.'],
      solution:
        '$\\frac{2\\,023}{2\\,024} < 1$ vì tử nhỏ hơn mẫu, còn $\\frac{2\\,024}{2\\,023} > 1$ vì tử lớn hơn mẫu. Theo tính chất bắc cầu, $\\frac{2\\,023}{2\\,024} < \\frac{2\\,024}{2\\,023}$.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu số nguyên $x$ thỏa mãn $\\frac{-2}{7} < \\frac{x}{7} < \\frac{3}{7}$?',
      answer: 4,
      hints: [
        'Ba phân số có cùng mẫu dương $7$, nên chỉ cần so sánh các tử.',
        'Tìm các số nguyên $x$ với $-2 < x < 3$.',
      ],
      solution: 'Cần $-2 < x < 3$, tức $x \\in \\{-1; 0; 1; 2\\}$: có $4$ số nguyên.',
    },
    {
      type: 'choice',
      prompt: 'Phát biểu nào đúng?',
      options: [
        '$\\frac{5}{3}$ viết được thành hỗn số $1\\frac{2}{3}$.',
        '$\\frac{4}{5}$ viết được thành hỗn số $1\\frac{1}{5}$.',
        '$\\frac{9}{4}$ viết được thành hỗn số $2\\frac{4}{1}$.',
      ],
      answer: 0,
      hints: ['Kiểm tra bằng phép chia tử cho mẫu; phần phân số của hỗn số phải nhỏ hơn $1$.'],
      solution:
        '$5 = 3 \\cdot 1 + 2$ nên $\\frac{5}{3} = 1\\frac{2}{3}$. $\\frac{4}{5} < 1$ nên không viết thành hỗn số; $\\frac{9}{4} = 2\\frac{1}{4}$ (vì $9 = 4 \\cdot 2 + 1$).',
    },
  ],
  takeaways: [
    'Quy đồng mẫu: đưa về mẫu dương, lấy BCNN các mẫu làm mẫu chung, nhân tử và mẫu với thừa số phụ.',
    'Cùng mẫu dương: tử lớn hơn thì phân số lớn hơn; khác mẫu thì quy đồng trước rồi so sánh tử.',
    'Phân số âm < $0$ < phân số dương; so sánh với $1$ để so sánh nhanh.',
    'Phân số dương lớn hơn $1$: $\\frac{a}{b} = q\\frac{r}{b}$ với $a = b \\cdot q + r$, $0 < r < b$; ngược lại $q\\frac{r}{b} = \\frac{q \\cdot b + r}{b}$.',
  ],
};
