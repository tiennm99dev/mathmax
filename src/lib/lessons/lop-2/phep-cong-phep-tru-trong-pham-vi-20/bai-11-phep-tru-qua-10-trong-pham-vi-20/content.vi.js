/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép trừ qua 10 trong phạm vi 20: tách số trừ để trừ về 10 rồi trừ tiếp, ví dụ 12 − 3: 12 − 2 = 10, 10 − 1 = 9.',
  intro:
    'Có 12 chấm. Em bớt đi 3 chấm thì còn lại mấy chấm? Em bớt cho còn 10 chấm trước, rồi bớt tiếp nhé!',
  objectives: ['Trừ qua 10 trong phạm vi 20.', 'Biết tách số trừ để trừ về 10, rồi trừ tiếp.'],
  sections: [
    {
      heading: 'Trừ về 10',
      blocks: [
        {
          type: 'p',
          text: 'Tính 12 − 3. Có 12 chấm: khung thứ nhất 10 chấm, khung thứ hai 2 chấm.',
        },
        {
          type: 'p',
          text: 'Em bớt 2 chấm ở khung thứ hai, còn 10 chấm. Em bớt tiếp 1 chấm ở khung thứ nhất, còn 9 chấm.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cách tính',
          text: 'Tách 3 = 2 + 1. 12 − 2 = 10. 10 − 1 = 9. Vậy 12 − 3 = 9.',
        },
      ],
    },
    {
      heading: 'Trừ qua 10',
      blocks: [
        {
          type: 'p',
          text: 'Muốn trừ qua 10, em tách số trừ thành hai phần: phần đầu trừ về 10, phần sau trừ tiếp.',
        },
        {
          type: 'table',
          head: ['Phép trừ', 'Tách', 'Trừ về 10', 'Trừ tiếp'],
          rows: [
            ['12 − 3', '3 = 2 + 1', '12 − 2 = 10', '10 − 1 = 9'],
            ['11 − 4', '4 = 1 + 3', '11 − 1 = 10', '10 − 3 = 7'],
            ['15 − 7', '7 = 5 + 2', '15 − 5 = 10', '10 − 2 = 8'],
            ['16 − 9', '9 = 6 + 3', '16 − 6 = 10', '10 − 3 = 7'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhớ',
          text: 'Phần đầu bằng số đơn vị của số bị trừ: 15 − 7 thì trừ 5 trước để còn 10.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bớt chấm qua mốc 10',
    instruction:
      'Chạm vào chấm để gạch bớt, hoặc chạm "Bớt 1 chấm". Em gạch ở khung thứ hai trước cho còn 10 chấm, rồi gạch tiếp ở khung thứ nhất. Cuối cùng, chọn kết quả của phép trừ.',
  },
  examples: [
    {
      problem: 'Tính 12 − 3.',
      steps: ['12 bớt 2 thì còn 10. Tách 3 = 2 + 1.', '12 − 2 = 10.', '10 − 1 = 9.'],
      answer: '12 − 3 = 9.',
    },
    {
      problem: 'Tính 15 − 7.',
      steps: ['15 bớt 5 thì còn 10. Tách 7 = 5 + 2.', '15 − 5 = 10.', '10 − 2 = 8.'],
      answer: '15 − 7 = 8.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có 12 quả cam. Em ăn 3 quả. Hình vẽ những quả cam còn lại. Còn lại mấy quả cam?',
      picture: 'orange',
      answer: 9,
      choices: [8, 9, 10],
      hints: ['Em tính 12 − 3: bớt 2 quả trước cho còn 10 quả.'],
      solution: 'Tách 3 = 2 + 1. 12 − 2 = 10. 10 − 1 = 9. Còn lại 9 quả cam.',
    },
    {
      type: 'choice',
      prompt: '12 − 3 = 12 − 2 − ?',
      options: ['1', '2', '3'],
      answer: 0,
      hints: ['Tách 3 thành 2 và mấy?'],
      solution: '3 = 2 + 1, nên 12 − 3 = 12 − 2 − 1 = 10 − 1 = 9.',
    },
    {
      type: 'choice',
      prompt: 'Để tính 14 − 6, em tách 6 thành hai số nào?',
      options: ['4 và 2', '3 và 3', '5 và 1'],
      answer: 0,
      hints: ['14 bớt mấy thì còn 10?'],
      solution: '14 − 4 = 10, nên tách 6 = 4 + 2. 10 − 2 = 8. Vậy 14 − 6 = 8.',
    },
    {
      type: 'choice',
      prompt: '13 − 5 = ?',
      options: ['7', '8', '9'],
      answer: 1,
      hints: ['13 bớt 3 thì còn 10. Tách 5 = 3 + 2.'],
      solution: '13 − 3 = 10. 10 − 2 = 8. Vậy 13 − 5 = 8.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép trừ với kết quả của nó.',
      left: ['11 − 2', '15 − 8', '14 − 8', '17 − 9'],
      right: ['9', '7', '6', '8', '5'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Với mỗi phép trừ, em trừ về 10 trước.', '17 − 9: tách 9 = 7 + 2.'],
      solution: '11 − 2 = 9. 15 − 8 = 7. 14 − 8 = 6. 17 − 9 = 8.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 15 − 7 theo đúng thứ tự.',
      items: ['10 − 2 = 8', 'Tách 7 = 5 + 2', '15 − 5 = 10'],
      answer: [1, 2, 0],
      hints: ['Bước đầu tiên là tách số trừ.'],
      solution: 'Tách 7 = 5 + 2. Rồi 15 − 5 = 10. Cuối cùng 10 − 2 = 8.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 11 − 5 ... 7',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Tính 11 − 5 trước, rồi so sánh với 7.'],
      solution: '11 − 1 = 10, 10 − 4 = 6. Vậy 11 − 5 = 6. 6 bé hơn 7, nên 11 − 5 < 7.',
    },
    {
      type: 'count',
      prompt:
        'Trong bể có 11 con cá. Bố vớt 3 con cá sang bể khác. Hình vẽ những con cá còn lại. Trong bể còn lại mấy con cá?',
      picture: 'fish',
      answer: 8,
      choices: [7, 8, 9],
      hints: ['Em tính 11 − 3: bớt 1 con trước cho còn 10 con.'],
      solution: 'Tách 3 = 1 + 2. 11 − 1 = 10. 10 − 2 = 8. Trong bể còn lại 8 con cá.',
    },
  ],
  takeaways: [
    'Trừ qua 10: tách số trừ để trừ về 10, rồi trừ tiếp.',
    '12 − 3: tách 3 = 2 + 1; 12 − 2 = 10; 10 − 1 = 9.',
  ],
};
