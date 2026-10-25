/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thứ tự thực hiện các phép tính: biểu thức không có ngoặc làm lũy thừa, rồi nhân chia, rồi cộng trừ; biểu thức có ngoặc làm ngoặc tròn, ngoặc vuông rồi ngoặc nhọn.',
  intro:
    'Hai bạn cùng tính $18 - 4 \\cdot 3$. Bạn Mai được $6$, bạn Nam được $42$. Ai đúng? Nam đã trừ trước rồi mới nhân, còn Mai nhân trước. Để mọi người tính một biểu thức đều ra cùng một kết quả, toán học quy định thứ tự thực hiện các phép tính. Theo quy ước đó, Mai đúng: $18 - 4 \\cdot 3 = 18 - 12 = 6$.',
  objectives: [
    'Thực hiện đúng thứ tự các phép tính trong biểu thức không có dấu ngoặc: lũy thừa, nhân và chia, cộng và trừ.',
    'Thực hiện đúng thứ tự các phép tính trong biểu thức có dấu ngoặc: $(\\ )$, rồi $[\\ ]$, rồi $\\{\\ \\}$.',
    'Tính giá trị biểu thức và giải bài toán thực tế bằng một biểu thức.',
  ],
  sections: [
    {
      heading: 'Biểu thức không chứa dấu ngoặc',
      blocks: [
        {
          type: 'p',
          text: 'Các số được nối với nhau bởi dấu các phép tính (cộng, trừ, nhân, chia, nâng lên lũy thừa) làm thành một biểu thức. Một số cũng được coi là một biểu thức.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Biểu thức không chứa dấu ngoặc',
          text: 'Nếu chỉ có phép cộng và phép trừ, hoặc chỉ có phép nhân và phép chia, ta thực hiện các phép tính từ trái sang phải. Nếu có cả cộng, trừ, nhân, chia, nâng lên lũy thừa, ta thực hiện: lũy thừa $\\to$ nhân và chia $\\to$ cộng và trừ.',
        },
        {
          type: 'table',
          caption: 'Làm đúng thứ tự và những lỗi hay gặp',
          head: ['Biểu thức', 'Làm đúng', 'Làm sai'],
          rows: [
            ['$20 - 8 + 3$', '$12 + 3 = 15$', '$20 - 11 = 9$'],
            ['$48 : 4 \\cdot 2$', '$12 \\cdot 2 = 24$', '$48 : 8 = 6$'],
            ['$2 \\cdot 3^2$', '$2 \\cdot 9 = 18$', '$6^2 = 36$'],
            ['$5 + 4 \\cdot 3$', '$5 + 12 = 17$', '$9 \\cdot 3 = 27$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Trong $2 \\cdot 3^2$, số mũ $2$ chỉ gắn với cơ số $3$: phải tính $3^2 = 9$ trước rồi mới nhân với $2$.',
        },
      ],
    },
    {
      heading: 'Biểu thức chứa dấu ngoặc',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Biểu thức chứa dấu ngoặc',
          text: 'Nếu biểu thức có các dấu ngoặc tròn $(\\ )$, ngoặc vuông $[\\ ]$, ngoặc nhọn $\\{\\ \\}$, ta thực hiện các phép tính trong dấu ngoặc tròn trước, rồi đến trong ngoặc vuông, cuối cùng là trong ngoặc nhọn.',
        },
        { type: 'tex', tex: '(\\ ) \\;\\to\\; [\\ ] \\;\\to\\; \\{\\ \\}' },
        {
          type: 'p',
          text: 'Bên trong mỗi cặp ngoặc vẫn làm theo thứ tự của biểu thức không có ngoặc. Ví dụ: $100 : [2 \\cdot (15 - 10)] = 100 : [2 \\cdot 5] = 100 : 10 = 10$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Mỗi lần làm xong một bước, ta viết lại cả biểu thức sau dấu "=" để không bỏ sót số hay phép tính nào.',
        },
      ],
    },
  ],
  explore: {
    title: 'Trình tính từng bước',
    instruction:
      'Chọn một biểu thức, rồi bấm vào dấu của phép tính em sẽ làm tiếp theo (với lũy thừa, bấm vào số mũ). Nếu đúng thứ tự, biểu thức được rút gọn một bước; nếu sai, máy giải thích quy tắc em vừa bỏ qua.',
  },
  examples: [
    {
      problem: 'Tính giá trị của biểu thức $36 : 4 \\cdot 3 + 2^3$.',
      steps: [
        'Biểu thức không có dấu ngoặc: tính lũy thừa trước, $2^3 = 8$.',
        'Tiếp theo là nhân và chia, từ trái sang phải: $36 : 4 = 9$, rồi $9 \\cdot 3 = 27$.',
        'Cuối cùng là phép cộng: $27 + 8 = 35$.',
        'Viết gọn: $36 : 4 \\cdot 3 + 2^3 = 36 : 4 \\cdot 3 + 8 = 9 \\cdot 3 + 8 = 27 + 8 = 35$.',
      ],
      answer: '$35$.',
    },
    {
      problem: 'Tính giá trị của biểu thức $80 - [130 - (12 - 4)^2]$.',
      steps: [
        'Tính trong ngoặc tròn trước: $12 - 4 = 8$.',
        'Trong ngoặc vuông, lũy thừa trước: $8^2 = 64$, rồi $130 - 64 = 66$.',
        'Cuối cùng: $80 - 66 = 14$.',
        'Viết gọn: $80 - [130 - 8^2] = 80 - [130 - 64] = 80 - 66 = 14$.',
      ],
      answer: '$14$.',
    },
    {
      problem:
        'Mẹ mua $3$ kg gạo, mỗi kilôgam giá $18\\,000$ đồng, và $2$ kg đường, mỗi kilôgam giá $22\\,000$ đồng. Mẹ đưa cô bán hàng $200\\,000$ đồng. Cô bán hàng trả lại bao nhiêu tiền?',
      steps: [
        'Số tiền phải trả là $3 \\cdot 18\\,000 + 2 \\cdot 22\\,000$, số tiền trả lại là $200\\,000 - (3 \\cdot 18\\,000 + 2 \\cdot 22\\,000)$.',
        'Trong ngoặc, nhân trước: $3 \\cdot 18\\,000 = 54\\,000$ và $2 \\cdot 22\\,000 = 44\\,000$.',
        'Rồi cộng: $54\\,000 + 44\\,000 = 98\\,000$.',
        'Cuối cùng: $200\\,000 - 98\\,000 = 102\\,000$.',
      ],
      answer: 'Cô bán hàng trả lại $102\\,000$ đồng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính: $30 - 15 + 7$.',
      answer: 22,
      hints: ['Chỉ có cộng và trừ: làm từ trái sang phải.'],
      solution: '$30 - 15 + 7 = 15 + 7 = 22$.',
    },
    {
      type: 'number',
      prompt: 'Tính: $72 : 6 \\cdot 2$.',
      answer: 24,
      hints: ['Chỉ có nhân và chia: làm từ trái sang phải, không nhân $6 \\cdot 2$ trước.'],
      solution: '$72 : 6 \\cdot 2 = 12 \\cdot 2 = 24$.',
    },
    {
      type: 'choice',
      prompt: 'Giá trị của biểu thức $18 - 4 \\cdot 3$ là',
      options: ['$42$', '$6$', '$54$', '$2$'],
      answer: 1,
      hints: ['Nhân trước, trừ sau.'],
      solution:
        '$18 - 4 \\cdot 3 = 18 - 12 = 6$. Kết quả $42$ là do trừ trước: $(18 - 4) \\cdot 3$, sai thứ tự.',
    },
    {
      type: 'number',
      prompt: 'Tính: $5 \\cdot 2^3 - 18 : 3^2$.',
      answer: 38,
      hints: [
        'Tính các lũy thừa trước: $2^3$ và $3^2$.',
        'Sau đó làm phép nhân và phép chia, cuối cùng là phép trừ.',
      ],
      solution: '$5 \\cdot 2^3 - 18 : 3^2 = 5 \\cdot 8 - 18 : 9 = 40 - 2 = 38$.',
    },
    {
      type: 'number',
      prompt: 'Tính: $125 - 2 \\cdot [56 - 48 : (15 - 7)]$.',
      answer: 25,
      hints: ['Ngoặc tròn trước: $15 - 7$.', 'Trong ngoặc vuông, chia trước rồi mới trừ.'],
      solution:
        '$125 - 2 \\cdot [56 - 48 : 8] = 125 - 2 \\cdot [56 - 6] = 125 - 2 \\cdot 50 = 125 - 100 = 25$.',
    },
    {
      type: 'number',
      prompt: 'Tính: $2 \\cdot \\{3 \\cdot [(17 + 3) : 4 + 1] - 5\\}$.',
      answer: 26,
      hints: ['Thứ tự: $(\\ ) \\to [\\ ] \\to \\{\\ \\}$.', '$(17 + 3) : 4 + 1 = 20 : 4 + 1$.'],
      solution:
        '$2 \\cdot \\{3 \\cdot [20 : 4 + 1] - 5\\} = 2 \\cdot \\{3 \\cdot [5 + 1] - 5\\} = 2 \\cdot \\{3 \\cdot 6 - 5\\} = 2 \\cdot \\{18 - 5\\} = 2 \\cdot 13 = 26$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước tính biểu thức $4 + 2 \\cdot (9 - 3)^2$ theo đúng thứ tự.',
      items: [
        'Tính trong ngoặc: $9 - 3 = 6$',
        'Nâng lên lũy thừa: $6^2 = 36$',
        'Nhân: $2 \\cdot 36 = 72$',
        'Cộng: $4 + 72 = 76$',
      ],
      answer: [0, 1, 2, 3],
      hints: ['Ngoặc trước, rồi lũy thừa, rồi nhân, cuối cùng là cộng.'],
      solution: '$4 + 2 \\cdot (9 - 3)^2 = 4 + 2 \\cdot 6^2 = 4 + 2 \\cdot 36 = 4 + 72 = 76$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số tự nhiên $x$, biết $3 \\cdot (x - 5) = 2^4 + 2$.',
      answer: 11,
      hints: [
        'Tính vế phải trước: $2^4 + 2$.',
        '$x - 5$ là thừa số chưa biết: lấy tích chia cho thừa số đã biết.',
      ],
      solution:
        '$2^4 + 2 = 16 + 2 = 18$. Từ $3 \\cdot (x - 5) = 18$ suy ra $x - 5 = 18 : 3 = 6$, nên $x = 6 + 5 = 11$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $2x^2 + 3x - 5$ khi $x = 4$.',
      answer: 39,
      hints: ['Thay $x = 4$: $2 \\cdot 4^2 + 3 \\cdot 4 - 5$.', 'Lũy thừa trước: $4^2 = 16$.'],
      solution: '$2 \\cdot 4^2 + 3 \\cdot 4 - 5 = 2 \\cdot 16 + 12 - 5 = 32 + 12 - 5 = 39$.',
    },
    {
      type: 'number',
      prompt:
        'Bạn An mua $3$ quyển vở, mỗi quyển giá $12\\,000$ đồng, và $2$ chiếc bút, mỗi chiếc giá $8\\,000$ đồng. An đưa $100\\,000$ đồng. Hỏi An được trả lại bao nhiêu tiền?',
      answer: 48000,
      unit: 'đồng',
      hints: [
        'Viết một biểu thức: $100\\,000 - (3 \\cdot 12\\,000 + 2 \\cdot 8\\,000)$.',
        'Trong ngoặc: nhân trước rồi cộng.',
      ],
      solution:
        '$100\\,000 - (3 \\cdot 12\\,000 + 2 \\cdot 8\\,000) = 100\\,000 - (36\\,000 + 16\\,000) = 100\\,000 - 52\\,000 = 48\\,000$ (đồng).',
    },
  ],
  takeaways: [
    'Chỉ có cộng, trừ hoặc chỉ có nhân, chia: làm từ trái sang phải.',
    'Không có ngoặc: lũy thừa $\\to$ nhân và chia $\\to$ cộng và trừ.',
    'Có ngoặc: $(\\ ) \\to [\\ ] \\to \\{\\ \\}$; trong mỗi ngoặc vẫn theo thứ tự trên.',
    'Mỗi bước viết lại cả biểu thức sau dấu "=".',
  ],
};
