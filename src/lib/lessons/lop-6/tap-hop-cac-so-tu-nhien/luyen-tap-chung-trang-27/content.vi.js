/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: củng cố lũy thừa với số mũ tự nhiên, nhân và chia hai lũy thừa cùng cơ số, và thứ tự thực hiện các phép tính.',
  intro:
    'Lũy thừa giúp viết gọn những tích dài, còn thứ tự thực hiện các phép tính giúp mọi người tính một biểu thức ra cùng một kết quả. Bài luyện tập này kết hợp hai kiến thức đó: tính giá trị biểu thức có lũy thừa và dấu ngoặc, so sánh lũy thừa và tìm số chưa biết.',
  objectives: [
    'Tính giá trị lũy thừa; nhân, chia hai lũy thừa cùng cơ số; nhận biết số chính phương.',
    'Tính giá trị biểu thức có lũy thừa và dấu ngoặc theo đúng thứ tự.',
    'Tìm số chưa biết trong các đẳng thức có lũy thừa.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'list',
          items: [
            '$a^n = a \\cdot a \\cdot \\ldots \\cdot a$ ($n$ thừa số $a$, $n \\in \\mathbb{N}^*$); $a^1 = a$; $a^0 = 1$ với $a \\ne 0$.',
            '$a^m \\cdot a^n = a^{m+n}$; $\\ a^m : a^n = a^{m-n}$ với $a \\ne 0$, $m \\ge n$.',
            'Biểu thức không có ngoặc: lũy thừa $\\to$ nhân và chia $\\to$ cộng và trừ; các phép tính cùng thứ tự làm từ trái sang phải.',
            'Biểu thức có ngoặc: $(\\ ) \\to [\\ ] \\to \\{\\ \\}$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Hai lỗi hay gặp: nhân cơ số với số mũ ($2^3 \\ne 2 \\cdot 3$) và cộng số mũ khi hai cơ số khác nhau ($2^3 \\cdot 3^2$ không viết gọn được thành một lũy thừa).',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề lũy thừa và thứ tự phép tính',
    instruction:
      'Mười câu được trộn ngẫu nhiên từ hai bài. Nhập đáp số rồi bấm "Kiểm tra"; làm sai, em sẽ thấy lời giải từng bước. Bấm "Làm bộ đề mới" để luyện thêm.',
  },
  examples: [
    {
      problem: 'So sánh $2^3$ và $3^2$.',
      steps: ['$2^3 = 2 \\cdot 2 \\cdot 2 = 8$.', '$3^2 = 3 \\cdot 3 = 9$.', '$8 < 9$.'],
      answer: '$2^3 < 3^2$.',
    },
    {
      problem: 'Tính giá trị của biểu thức $4 \\cdot 5^2 - 3 \\cdot 2^3 + 3^3 : 3^2$.',
      steps: [
        'Tính các lũy thừa trước; $3^3 : 3^2 = 3^1 = 3$ theo quy tắc chia hai lũy thừa cùng cơ số.',
        'Biểu thức trở thành $4 \\cdot 25 - 3 \\cdot 8 + 3$.',
        'Nhân: $100 - 24 + 3$.',
        'Cộng, trừ từ trái sang phải: $76 + 3 = 79$.',
      ],
      answer: '$79$.',
    },
    {
      problem: 'Tìm số tự nhiên $x$, biết $2^x \\cdot 4 = 128$.',
      steps: [
        'Viết các số dưới dạng lũy thừa của $2$: $4 = 2^2$, $128 = 2^7$.',
        '$2^x \\cdot 2^2 = 2^{x+2} = 2^7$, nên $x + 2 = 7$.',
        '$x = 5$. Thử lại: $2^5 \\cdot 4 = 32 \\cdot 4 = 128$.',
      ],
      answer: '$x = 5$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính: $7^2 + 2^4$.',
      answer: 65,
      hints: ['Tính từng lũy thừa trước.'],
      solution: '$7^2 + 2^4 = 49 + 16 = 65$.',
    },
    {
      type: 'choice',
      prompt: 'So sánh $2^5$ và $5^2$.',
      options: ['$2^5 > 5^2$', '$2^5 < 5^2$', '$2^5 = 5^2$'],
      answer: 0,
      hints: ['Tính giá trị từng lũy thừa.'],
      solution: '$2^5 = 32$ và $5^2 = 25$, nên $2^5 > 5^2$.',
    },
    {
      type: 'number',
      prompt: 'Viết tích $9 \\cdot 27$ dưới dạng $3^k$. Tìm $k$.',
      answer: 5,
      hints: ['$9 = 3^2$ và $27 = 3^3$.'],
      solution: '$9 \\cdot 27 = 3^2 \\cdot 3^3 = 3^{2+3} = 3^5$, nên $k = 5$.',
    },
    {
      type: 'number',
      prompt: 'Tính: $6^{10} : 6^8$.',
      answer: 36,
      hints: ['Chia hai lũy thừa cùng cơ số: trừ số mũ.'],
      solution: '$6^{10} : 6^8 = 6^{10-8} = 6^2 = 36$.',
    },
    {
      type: 'number',
      prompt: 'Tính: $2 \\cdot 3^2 + 4^2 : 8$.',
      answer: 20,
      hints: ['Lũy thừa trước, rồi nhân và chia, cuối cùng là cộng.'],
      solution: '$2 \\cdot 3^2 + 4^2 : 8 = 2 \\cdot 9 + 16 : 8 = 18 + 2 = 20$.',
    },
    {
      type: 'number',
      prompt: 'Tính: $150 - [(6 + 4)^2 - 5 \\cdot 7]$.',
      answer: 85,
      hints: ['Ngoặc tròn trước: $6 + 4 = 10$.', 'Trong ngoặc vuông: lũy thừa, nhân, rồi trừ.'],
      solution: '$150 - [10^2 - 5 \\cdot 7] = 150 - [100 - 35] = 150 - 65 = 85$.',
    },
    {
      type: 'number',
      prompt: 'Tính: $2^3 \\cdot \\{[120 - (5^2 + 15)] : 8\\}$.',
      answer: 80,
      hints: ['Làm lần lượt $(\\ ) \\to [\\ ] \\to \\{\\ \\}$.', '$5^2 + 15 = 40$.'],
      solution:
        '$2^3 \\cdot \\{[120 - 40] : 8\\} = 2^3 \\cdot \\{80 : 8\\} = 2^3 \\cdot 10 = 8 \\cdot 10 = 80$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước tính $60 - 2^3 \\cdot (9 - 2)$ theo đúng thứ tự.',
      items: [
        'Tính trong ngoặc: $9 - 2 = 7$',
        'Nâng lên lũy thừa: $2^3 = 8$',
        'Nhân: $8 \\cdot 7 = 56$',
        'Trừ: $60 - 56 = 4$',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Ngoặc trước, rồi lũy thừa, nhân, cuối cùng là trừ.'],
      solution: '$60 - 2^3 \\cdot (9 - 2) = 60 - 2^3 \\cdot 7 = 60 - 8 \\cdot 7 = 60 - 56 = 4$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số tự nhiên $x$, biết $3^x \\cdot 3 = 81$.',
      answer: 3,
      hints: ['$81 = 3^4$ và $3 = 3^1$.'],
      solution: '$3^x \\cdot 3 = 3^{x+1} = 81 = 3^4$, nên $x + 1 = 4$ và $x = 3$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số tự nhiên $x$, biết $5 \\cdot x - 2^3 = 3^2 \\cdot 3$.',
      answer: 7,
      hints: ['Tính các lũy thừa: $2^3 = 8$, $3^2 \\cdot 3 = 27$.', '$5x$ là số bị trừ.'],
      solution: '$5x - 8 = 27$, nên $5x = 27 + 8 = 35$ và $x = 35 : 5 = 7$.',
    },
    {
      type: 'multi',
      prompt: 'Những số nào là số chính phương?',
      options: ['$64$', '$90$', '$121$', '$144$', '$200$'],
      answers: [0, 2, 3],
      hints: ['Thử $8^2$, $11^2$, $12^2$.'],
      solution:
        '$64 = 8^2$, $121 = 11^2$, $144 = 12^2$. Số $90$ nằm giữa $9^2 = 81$ và $10^2 = 100$; $200$ nằm giữa $14^2 = 196$ và $15^2 = 225$, nên không là số chính phương.',
    },
    {
      type: 'number',
      prompt:
        'Một khu vườn có $5$ luống, mỗi luống có $5$ hàng, mỗi hàng trồng $5$ cây. Khu vườn có bao nhiêu cây? (Viết dưới dạng lũy thừa rồi tính.)',
      answer: 125,
      unit: 'cây',
      hints: ['Số cây là $5 \\cdot 5 \\cdot 5$.'],
      solution: 'Số cây là $5 \\cdot 5 \\cdot 5 = 5^3 = 125$ (cây).',
    },
  ],
  takeaways: [
    'Muốn so sánh hai lũy thừa khác cơ số, khác số mũ, hãy tính giá trị của chúng.',
    'Đưa các số về cùng cơ số ($4 = 2^2$, $27 = 3^3$) để dùng quy tắc nhân, chia lũy thừa.',
    'Tính biểu thức: ngoặc trước; trong mỗi phần, lũy thừa $\\to$ nhân, chia $\\to$ cộng, trừ.',
  ],
};
