/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Số bị chia, số chia, thương lớp 2: gọi tên các số trong phép chia và lập phép chia từ phép nhân.',
  intro:
    'Trong phép chia 6 : 2 = 3, mỗi số có một tên riêng. Em cùng gọi tên các số và tìm phép nhân đi cùng phép chia nhé!',
  objectives: [
    'Gọi đúng tên số bị chia, số chia, thương.',
    'Tính thương khi biết số bị chia và số chia.',
    'Từ một phép nhân, lập được hai phép chia.',
  ],
  sections: [
    {
      heading: 'Tên các số trong phép chia',
      blocks: [
        {
          type: 'table',
          caption: '6 : 2 = 3',
          head: ['6', '2', '3'],
          rows: [['Số bị chia', 'Số chia', 'Thương']],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ghi nhớ tên',
          text: '6 là số bị chia. 2 là số chia. 3 là thương.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em chú ý',
          text: '6 : 2 cũng gọi là thương.',
        },
      ],
    },
    {
      heading: 'Phép chia và phép nhân',
      blocks: [
        { type: 'p', text: 'Mỗi phép chia đi cùng một phép nhân: 6 : 2 = 3 và 3 × 2 = 6.' },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ghi nhớ',
          text: 'Thương nhân với số chia thì được số bị chia.',
        },
        { type: 'p', text: 'Từ phép nhân 2 × 3 = 6, em lập được hai phép chia.' },
        {
          type: 'table',
          head: ['Phép chia', 'Số bị chia', 'Số chia', 'Thương'],
          rows: [
            ['6 : 2 = 3', '6', '2', '3'],
            ['6 : 3 = 2', '6', '3', '2'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Gọi tên và ghép phép chia',
    instruction:
      'Em nghe câu hỏi rồi chạm vào đúng số. Gọi đủ ba tên, phép nhân đi cùng sẽ hiện ra. Chọn "Ghép phép chia" để dùng ba thẻ số lập hai phép chia.',
  },
  examples: [
    {
      problem: 'Số bị chia là 10, số chia là 2. Em tìm thương.',
      steps: ['Em viết phép chia: 10 : 2.', 'Vì 5 × 2 = 10 nên 10 : 2 = 5.'],
      answer: 'Thương là 5.',
    },
    {
      problem: 'Từ phép nhân 5 × 4 = 20, em lập hai phép chia.',
      steps: [
        'Tích 20 là số bị chia, đứng đầu phép chia.',
        'Lần lượt lấy 20 chia cho 5 và chia cho 4.',
      ],
      answer: '20 : 5 = 4 và 20 : 4 = 5.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong phép chia 12 : 2 = 6, số bị chia là số nào?',
      options: ['12', '2', '6'],
      answer: 0,
      hints: ['Số bị chia là số đem chia, đứng đầu phép chia.'],
      solution: 'Trong 12 : 2 = 6, số bị chia là 12, số chia là 2, thương là 6.',
    },
    {
      type: 'match',
      prompt: 'Trong phép chia 15 : 5 = 3, em nối mỗi tên với số của nó.',
      left: ['Số bị chia', 'Số chia', 'Thương'],
      right: ['15', '5', '3'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Em đọc từ trái sang phải: số đầu tiên là số bị chia.', 'Kết quả là thương.'],
      solution: '15 là số bị chia, 5 là số chia, 3 là thương.',
    },
    {
      type: 'number',
      prompt: 'Số bị chia là 8, số chia là 2. Thương là số mấy?',
      answer: 4,
      hints: ['Em tính 8 : 2.', 'Số nào nhân với 2 thì bằng 8?'],
      solution: '8 : 2 = 4, vì 4 × 2 = 8. Thương là 4.',
    },
    {
      type: 'number',
      prompt: 'Số bị chia là 10, số chia là 5. Thương là số mấy?',
      answer: 2,
      hints: ['Em tính 10 : 5.', 'Số nào nhân với 5 thì bằng 10?'],
      solution: '10 : 5 = 2, vì 2 × 5 = 10. Thương là 2.',
    },
    {
      type: 'choice',
      prompt: 'Có 10 cái bánh, xếp vào các hộp, mỗi hộp 2 cái. Phép tính nào tìm được số hộp?',
      options: ['10 : 2', '10 − 2', '10 × 2', '2 : 10'],
      answer: 0,
      hints: ['Chia theo nhóm thì em dùng phép chia. Số cần chia đứng đầu.'],
      solution: 'Số hộp là 10 : 2 = 5 (hộp).',
    },
    {
      type: 'multi',
      prompt: 'Từ phép nhân 2 × 5 = 10, em lập được những phép chia nào?',
      options: ['10 : 2 = 5', '10 : 5 = 2', '5 : 2 = 10', '2 : 10 = 5'],
      answers: [0, 1],
      hints: ['Tích 10 là số bị chia.', 'Có hai phép chia đúng.'],
      solution: '2 × 5 = 10 cho 10 : 2 = 5 và 10 : 5 = 2.',
    },
    {
      type: 'order',
      prompt: 'Số bị chia là 14, số chia là 2, thương là 7. Em xếp các thẻ thành phép chia.',
      items: ['7', '=', '14', '2', ':'],
      answer: [2, 4, 3, 1, 0],
      hints: ['Số bị chia đứng đầu, rồi đến dấu chia.', 'Thương đứng sau dấu bằng.'],
      solution: '14 : 2 = 7.',
    },
    {
      type: 'choice',
      prompt: 'Phép chia 20 : 5 = 4 đi cùng phép nhân nào?',
      options: ['4 × 5 = 20', '20 × 5 = 100', '4 + 5 = 9', '20 − 5 = 15'],
      answer: 0,
      hints: ['Thương nhân với số chia thì được số bị chia.'],
      solution: 'Thương 4 nhân với số chia 5 được số bị chia 20: 4 × 5 = 20.',
    },
    {
      type: 'choice',
      prompt: 'Trong phép chia 18 : 2 = 9, 18 : 2 gọi là gì?',
      options: ['Số bị chia', 'Số chia', 'Thương'],
      answer: 2,
      hints: ['Kết quả 9 gọi là gì? Phép chia 18 : 2 cũng có tên đó.'],
      solution: '18 : 2 = 9. Cả 9 và 18 : 2 đều gọi là thương.',
    },
  ],
  takeaways: [
    'Số bị chia : số chia = thương.',
    '6 : 2 cũng gọi là thương.',
    'Thương nhân với số chia thì được số bị chia.',
    'Từ một phép nhân, em lập được hai phép chia.',
  ],
};
