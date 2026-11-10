/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Biểu thức chứa một chữ, hai chữ, ba chữ; thay chữ bằng số để tính một giá trị của biểu thức; công thức chu vi hình vuông, hình chữ nhật, hình tam giác.',
  intro:
    'Hình vuông có cạnh a. Chu vi của nó là a × 4. Nếu cạnh dài 5 cm thì chu vi là bao nhiêu? Hôm nay em học biểu thức chứa chữ nhé!',
  objectives: [
    'Nhận biết được biểu thức chứa một chữ, hai chữ, ba chữ.',
    'Tính được giá trị của biểu thức chứa chữ khi thay chữ bằng số.',
    'Dùng được công thức tính chu vi hình vuông, hình chữ nhật, hình tam giác.',
  ],
  sections: [
    {
      heading: 'Biểu thức chứa một chữ',
      blocks: [
        {
          type: 'p',
          text: 'Lan có 3 quyển vở. Mẹ cho thêm a quyển. Lan có tất cả 3 + a quyển vở.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: '3 + a là biểu thức chứa một chữ. Chữ ở đây là a.',
        },
        {
          type: 'p',
          text: 'Nếu a = 2 thì 3 + a = 3 + 2 = 5. Ta nói 5 là một giá trị của biểu thức 3 + a.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Mỗi lần thay chữ bằng số, ta tính được một giá trị của biểu thức.',
        },
      ],
    },
    {
      heading: 'Biểu thức chứa hai chữ, ba chữ',
      blocks: [
        {
          type: 'p',
          text: 'a + b, a − b, a × b, a : b là các biểu thức chứa hai chữ.',
        },
        {
          type: 'p',
          text: 'a + b + c, a × b × c, (a + b) × c là các biểu thức chứa ba chữ.',
        },
        {
          type: 'p',
          text: 'Nếu a = 15, b = 27 thì (a + b) : 2 = (15 + 27) : 2 = 42 : 2 = 21.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Em thay mỗi chữ bằng số của nó, rồi tính như biểu thức thường: trong ngoặc trước, nhân chia trước, cộng trừ sau.',
        },
      ],
    },
    {
      heading: 'Công thức tính chu vi',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Độ dài', 'Chu vi P'],
          rows: [
            ['Hình vuông', 'cạnh a', 'P = a × 4'],
            ['Hình chữ nhật', 'chiều dài a, chiều rộng b', 'P = (a + b) × 2'],
            ['Hình tam giác', 'ba cạnh a, b, c', 'P = a + b + c'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Các độ dài phải cùng đơn vị đo.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thay chữ bằng số',
    instruction:
      'Em chọn một biểu thức. Em kéo thanh trượt để thay chữ bằng số. Giá trị của biểu thức đổi theo ngay. Em thử làm theo yêu cầu ở dưới cùng nhé.',
  },
  examples: [
    {
      problem: 'Tính giá trị của biểu thức (b + 4) × 3 với b = 27.',
      steps: [
        'Thay b bằng 27: (27 + 4) × 3.',
        'Tính trong ngoặc trước: 27 + 4 = 31.',
        'Tính tiếp: 31 × 3 = 93.',
      ],
      answer: 'Với b = 27 thì (b + 4) × 3 = 93.',
    },
    {
      problem: 'Hình chữ nhật có chiều dài 25 cm, chiều rộng 16 cm. Tính chu vi.',
      steps: [
        'Chu vi hình chữ nhật: P = (a + b) × 2.',
        'Thay a = 25, b = 16: P = (25 + 16) × 2.',
        'P = 41 × 2 = 82.',
      ],
      answer: 'Chu vi hình chữ nhật là 82 cm.',
    },
    {
      problem: 'Với m = 9, n = 6, p = 4, tính giá trị của m − (n − p) và m − n + p.',
      steps: ['m − (n − p) = 9 − (6 − 4) = 9 − 2 = 7.', 'm − n + p = 9 − 6 + 4 = 3 + 4 = 7.'],
      answer: 'Hai biểu thức đều có giá trị là 7.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức 125 : m với m = 5.',
      answer: 25,
      hints: ['Thay m bằng 5 rồi tính 125 : 5.'],
      solution: 'Với m = 5 thì 125 : m = 125 : 5 = 25.',
    },
    {
      type: 'number',
      prompt: 'Hình vuông có cạnh 9 cm. Chu vi hình vuông là bao nhiêu xăng-ti-mét? (P = a × 4)',
      answer: 36,
      unit: 'cm',
      hints: ['Thay a bằng 9.'],
      solution: 'P = a × 4 = 9 × 4 = 36 (cm).',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi giá trị của a với giá trị của biểu thức 35 + 5 × a.',
      left: ['a = 2', 'a = 5', 'a = 6', 'a = 7'],
      right: ['45', '60', '65', '70', '200'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em làm phép nhân trước: với a = 2 thì 5 × 2 = 10, rồi 35 + 10.'],
      solution:
        'a = 2: 35 + 10 = 45. a = 5: 35 + 25 = 60. a = 6: 35 + 30 = 65. a = 7: 35 + 35 = 70.',
    },
    {
      type: 'choice',
      prompt: 'Biểu thức nào là biểu thức chứa ba chữ?',
      options: ['a + b + c', 'a + b', '3 + a', '12 + 5 + 8'],
      answer: 0,
      hints: ['Em đếm xem biểu thức có mấy chữ khác nhau.'],
      solution:
        'a + b + c có ba chữ a, b, c. a + b có hai chữ, 3 + a có một chữ, 12 + 5 + 8 không có chữ nào.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức a + b × 2 với a = 8, b = 2.',
      answer: 12,
      hints: ['Em làm phép nhân trước.'],
      solution: 'a + b × 2 = 8 + 2 × 2 = 8 + 4 = 12.',
    },
    {
      type: 'number',
      prompt:
        'Hình chữ nhật có chiều dài 34 cm, chiều rộng 28 cm. Chu vi là bao nhiêu xăng-ti-mét?',
      answer: 124,
      unit: 'cm',
      hints: ['P = (a + b) × 2. Em cộng chiều dài và chiều rộng trước.'],
      solution: 'P = (34 + 28) × 2 = 62 × 2 = 124 (cm).',
    },
    {
      type: 'number',
      prompt: 'Hình tam giác có ba cạnh 62 cm, 75 cm, 81 cm. Chu vi là bao nhiêu xăng-ti-mét?',
      answer: 218,
      unit: 'cm',
      hints: ['P = a + b + c.'],
      solution: 'P = 62 + 75 + 81 = 218 (cm).',
    },
    {
      type: 'number',
      prompt: 'Quãng đường ABCD dài m + 6 + n (km). Tính độ dài quãng đường với m = 4, n = 7.',
      answer: 17,
      unit: 'km',
      hints: ['Thay m bằng 4, n bằng 7.'],
      solution: 'm + 6 + n = 4 + 6 + 7 = 17 (km).',
    },
    {
      type: 'choice',
      prompt: 'Với m = 9, n = 6, p = 4, biểu thức nào có giá trị bằng m × (n − p)?',
      options: ['m × n − m × p', 'm − n + p', 'm − (n − p)'],
      answer: 0,
      hints: ['Em tính m × (n − p) = 9 × 2 trước, rồi tính từng biểu thức.'],
      solution:
        'm × (n − p) = 9 × 2 = 18. m × n − m × p = 54 − 36 = 18. m − n + p = 7 và m − (n − p) = 7.',
    },
    {
      type: 'choice',
      prompt: 'Biểu thức 12 : (3 − m) có giá trị lớn nhất khi m bằng bao nhiêu? (m là 0, 1 hoặc 2)',
      options: ['m = 2', 'm = 1', 'm = 0'],
      answer: 0,
      hints: ['Em tính giá trị với từng số: m = 0, m = 1, m = 2.'],
      solution: 'm = 0: 12 : 3 = 4. m = 1: 12 : 2 = 6. m = 2: 12 : 1 = 12. Lớn nhất khi m = 2.',
    },
  ],
  takeaways: [
    'Mỗi lần thay chữ bằng số, ta tính được một giá trị của biểu thức.',
    'Chu vi hình vuông: P = a × 4. Chu vi hình chữ nhật: P = (a + b) × 2.',
    'Chu vi hình tam giác: P = a + b + c.',
  ],
};
