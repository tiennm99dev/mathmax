/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Quy tắc dấu ngoặc: bỏ dấu ngoặc có dấu cộng hoặc dấu trừ đằng trước, và cách đổi chỗ, nhóm các số hạng để tính nhanh một tổng các số nguyên.',
  intro:
    'Tính $(72 - 1\\,956) - (-1\\,956 + 28)$. Nếu tính trong ngoặc trước, em phải làm việc với số lớn. Nhưng nếu bỏ được dấu ngoặc, hai số $-1\\,956$ và $1\\,956$ sẽ triệt tiêu nhau và phép tính trở nên rất nhẹ nhàng. Quy tắc dấu ngoặc cho biết cách bỏ ngoặc mà không làm thay đổi giá trị của tổng.',
  objectives: [
    'Bỏ dấu ngoặc có dấu "$+$" đằng trước: giữ nguyên dấu các số hạng.',
    'Bỏ dấu ngoặc có dấu "$-$" đằng trước: đổi dấu tất cả các số hạng trong ngoặc.',
    'Đổi chỗ, nhóm các số hạng một cách hợp lí để tính nhanh một tổng.',
  ],
  sections: [
    {
      heading: 'Bỏ dấu ngoặc',
      blocks: [
        {
          type: 'p',
          text: 'So sánh: $4 + (12 - 15) = 4 + (-3) = 1$ và $4 + 12 - 15 = 16 - 15 = 1$. Còn $4 - (12 - 15) = 4 - (-3) = 7$ và $4 - 12 + 15 = -8 + 15 = 7$.',
        },
        {
          type: 'p',
          text: 'Như vậy, bỏ ngoặc có dấu "$+$" đằng trước thì các số hạng giữ nguyên dấu; bỏ ngoặc có dấu "$-$" đằng trước thì $12$ thành $-12$ và $-15$ thành $+15$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc dấu ngoặc',
          text: 'Khi bỏ dấu ngoặc có dấu "$+$" đằng trước, ta giữ nguyên dấu của các số hạng trong ngoặc. Khi bỏ dấu ngoặc có dấu "$-$" đằng trước, ta phải đổi dấu tất cả các số hạng trong ngoặc: dấu "$+$" thành dấu "$-$" và dấu "$-$" thành dấu "$+$".',
        },
        {
          type: 'tex',
          tex: 'a + (b - c + d) = a + b - c + d, \\qquad a - (b - c + d) = a - b + c - d',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Khi trước ngoặc là dấu "$-$", phải đổi dấu tất cả các số hạng, không chỉ số hạng đầu tiên: $10 - (3 + 5) = 10 - 3 - 5 = 2$, không phải $10 - 3 + 5$.',
        },
      ],
    },
    {
      heading: 'Tính nhanh một tổng',
      blocks: [
        {
          type: 'p',
          text: 'Một dãy các phép cộng, trừ số nguyên có thể xem là một tổng: $5 - 7 + 3 = 5 + (-7) + 3$. Vì phép cộng có tính chất giao hoán và kết hợp, trong một tổng ta có thể:',
        },
        {
          type: 'list',
          items: [
            'đổi chỗ tùy ý các số hạng, nhớ mang theo dấu của chúng: $5 - 7 + 3 = 5 + 3 - 7$;',
            'đặt các số hạng vào trong ngoặc để nhóm chúng lại; nếu trước ngoặc là dấu "$-$" thì phải đổi dấu các số hạng được đưa vào ngoặc: $a - b - c = a - (b + c)$.',
          ],
        },
        {
          type: 'p',
          text: 'Khi tính nhanh, hãy tìm các số đối nhau (tổng bằng $0$) hoặc các số có tổng tròn chục, tròn trăm:',
        },
        {
          type: 'tex',
          tex: '(-46) + 81 + 46 - 31 = [(-46) + 46] + (81 - 31) = 0 + 50 = 50',
        },
      ],
    },
  ],
  explore: {
    title: 'Bỏ ngoặc từng bước',
    instruction:
      'Chọn một tổng rồi bấm "Bỏ ngoặc tiếp một số hạng": mỗi lần một số hạng được đưa ra khỏi ngoặc. Khi trước ngoặc là dấu "$-$", số hạng đó lật dấu. Bấm vào dấu trước ngoặc để đổi "$+$" thành "$-$" và xem kết quả thay đổi thế nào. Mọi dòng đều có cùng một giá trị.',
  },
  examples: [
    {
      problem: 'Bỏ ngoặc rồi tính: $(72 - 1\\,956) - (-1\\,956 + 28)$.',
      steps: [
        'Ngoặc thứ nhất có dấu "$+$" (không viết) đằng trước: giữ nguyên, được $72 - 1\\,956$.',
        'Ngoặc thứ hai có dấu "$-$" đằng trước: $-1\\,956$ thành $+1\\,956$, $+28$ thành $-28$.',
        '$72 - 1\\,956 + 1\\,956 - 28 = 72 + [(-1\\,956) + 1\\,956] - 28 = 72 + 0 - 28 = 44$.',
      ],
      answer: '$44$.',
    },
    {
      problem: 'Tính một cách hợp lí: $2\\,023 - (2\\,023 - 37 + 15)$.',
      steps: [
        'Bỏ ngoặc có dấu "$-$" đằng trước, đổi dấu mọi số hạng: $2\\,023 - 2\\,023 + 37 - 15$.',
        '$2\\,023 - 2\\,023 = 0$.',
        '$0 + 37 - 15 = 22$.',
      ],
      answer: '$22$.',
    },
    {
      problem: 'Tính nhanh: $(-5 + 23) - (-35 + 23 - 5)$.',
      steps: [
        'Bỏ ngoặc: $-5 + 23 + 35 - 23 + 5$.',
        'Đổi chỗ và nhóm các số đối: $[(-5) + 5] + [23 + (-23)] + 35$.',
        '$0 + 0 + 35 = 35$.',
      ],
      answer: '$35$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Bỏ ngoặc biểu thức $-(a - b + c)$ ta được:',
      options: ['$-a - b + c$', '$-a + b - c$', '$a - b - c$', '$-a + b + c$'],
      answer: 1,
      hints: ['Trước ngoặc là dấu "$-$": đổi dấu tất cả các số hạng.'],
      solution: '$a \\to -a$, $-b \\to +b$, $+c \\to -c$: $-(a - b + c) = -a + b - c$.',
    },
    {
      type: 'choice',
      prompt: 'Bỏ ngoặc đúng của $12 - (-5 + 8 - 3)$ là:',
      options: ['$12 + 5 - 8 + 3$', '$12 - 5 + 8 - 3$', '$12 + 5 + 8 + 3$', '$12 - 5 - 8 + 3$'],
      answer: 0,
      hints: ['Đổi dấu cả ba số hạng $-5$, $+8$, $-3$.'],
      solution: '$-5 \\to +5$, $+8 \\to -8$, $-3 \\to +3$: $12 + 5 - 8 + 3$ (có giá trị $12$).',
    },
    {
      type: 'number',
      prompt: 'Bỏ ngoặc rồi tính: $125 - (115 - 99)$.',
      answer: 109,
      hints: ['$125 - (115 - 99) = 125 - 115 + 99$.'],
      solution: '$125 - 115 + 99 = 10 + 99 = 109$.',
    },
    {
      type: 'number',
      prompt: 'Bỏ ngoặc rồi tính: $-321 + (-29) - 142 - (-72)$.',
      answer: -420,
      hints: ['Viết lại: $-321 - 29 - 142 + 72$.', 'Gom các số âm: $-321 - 29 = -350$.'],
      solution: '$-321 - 29 - 142 + 72 = -350 - 142 + 72 = -492 + 72 = -420$.',
    },
    {
      type: 'number',
      prompt: 'Tính: $214 - (-36) + (-305)$.',
      answer: -55,
      hints: ['$214 - (-36) = 214 + 36$.'],
      solution: '$214 + 36 - 305 = 250 - 305 = -55$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh: $21 - 22 + 23 - 24$.',
      answer: -2,
      hints: ['Nhóm từng cặp: $(21 - 22) + (23 - 24)$.'],
      solution: '$(21 - 22) + (23 - 24) = (-1) + (-1) = -2$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh: $(35 - 17) - (35 - 17 + 9)$.',
      answer: -9,
      hints: ['Bỏ ngoặc rồi tìm các số đối nhau.'],
      solution: '$35 - 17 - 35 + 17 - 9 = (35 - 35) + (17 - 17) - 9 = -9$.',
    },
    {
      type: 'number',
      prompt: 'Tính một cách hợp lí: $(2\\,024 - 79 + 15) - (-79 + 15)$.',
      answer: 2024,
      hints: ['Bỏ ngoặc thứ hai: $-(-79 + 15) = +79 - 15$.'],
      solution: '$2\\,024 - 79 + 15 + 79 - 15 = 2\\,024 + [(-79) + 79] + [15 + (-15)] = 2\\,024$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $A = (x + 24) - (x - 16)$ khi $x = -87$.',
      answer: 40,
      hints: ['Bỏ ngoặc trước khi thay số: $x + 24 - x + 16$.'],
      solution:
        '$A = x + 24 - x + 16 = (x - x) + (24 + 16) = 40$. Giá trị của $A$ không phụ thuộc vào $x$, nên với $x = -87$ thì $A = 40$.',
    },
  ],
  takeaways: [
    'Trước ngoặc là "$+$": bỏ ngoặc, giữ nguyên dấu các số hạng.',
    'Trước ngoặc là "$-$": bỏ ngoặc, đổi dấu tất cả các số hạng trong ngoặc.',
    'Trong một tổng có thể đổi chỗ các số hạng kèm theo dấu và nhóm chúng tùy ý.',
    'Tính nhanh: tìm các số đối nhau, các số có tổng tròn chục, tròn trăm.',
  ],
};
