/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đặt tính rồi tính phép nhân số có bốn chữ số với số có một chữ số, không nhớ và có nhớ; tách số theo hàng để hiểu phép nhân; nhân nhẩm số tròn nghìn, tròn trăm.',
  intro:
    'Mỗi xe chở 2 345 kg than. 3 xe như thế chở bao nhiêu ki-lô-gam than? Em đặt tính rồi nhân từng hàng, từ phải sang trái nhé!',
  objectives: [
    'Đặt tính và nhân số có bốn chữ số với số có một chữ số.',
    'Biết nhân có nhớ: thêm số đã nhớ vào hàng tiếp theo.',
    'Tách số theo hàng nghìn, trăm, chục, đơn vị để nhân.',
    'Nhân nhẩm số tròn nghìn, tròn trăm.',
  ],
  sections: [
    {
      heading: 'Nhân không nhớ',
      blocks: [
        { type: 'p', text: 'Em tính 1 213 × 3.' },
        {
          type: 'p',
          text: 'Em đặt tính: viết 1 213, viết 3 thẳng cột với chữ số hàng đơn vị, viết dấu nhân, kẻ vạch ngang.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '3 nhân 3 bằng 9, viết 9.',
            '3 nhân 1 bằng 3, viết 3.',
            '3 nhân 2 bằng 6, viết 6.',
            '3 nhân 1 bằng 3, viết 3.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '1 213 × 3 = 3 639.' },
      ],
    },
    {
      heading: 'Nhân có nhớ',
      blocks: [
        { type: 'p', text: 'Em tính 1 427 × 3.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '3 nhân 7 bằng 21, viết 1, nhớ 2.',
            '3 nhân 2 bằng 6, thêm 2 bằng 8, viết 8.',
            '3 nhân 4 bằng 12, viết 2, nhớ 1.',
            '3 nhân 1 bằng 3, thêm 1 bằng 4, viết 4.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '1 427 × 3 = 4 281.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Em nhân từ phải sang trái. Sau mỗi hàng, em thêm số đã nhớ vào hàng tiếp theo.',
        },
      ],
    },
    {
      heading: 'Tách số theo hàng',
      blocks: [
        { type: 'p', text: '1 427 gồm 1 nghìn, 4 trăm, 2 chục và 7 đơn vị.' },
        { type: 'p', text: 'Em nhân từng phần với 3, rồi cộng lại.' },
        {
          type: 'table',
          head: ['Phần', 'Nhân với 3'],
          rows: [
            ['1 000', '1 000 × 3 = 3 000'],
            ['400', '400 × 3 = 1 200'],
            ['20', '20 × 3 = 60'],
            ['7', '7 × 3 = 21'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cộng lại',
          text: '3 000 + 1 200 + 60 + 21 = 4 281. Đúng bằng 1 427 × 3.',
        },
      ],
    },
    {
      heading: 'Nhân nhẩm',
      blocks: [
        { type: 'p', text: 'Số tròn nghìn: 2 000 × 4. Em nhẩm 2 nghìn × 4 = 8 nghìn.' },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '2 000 × 4 = 8 000.' },
        { type: 'p', text: 'Số tròn trăm: 1 200 × 3. Em nhẩm 12 trăm × 3 = 36 trăm.' },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '1 200 × 3 = 3 600.' },
      ],
    },
  ],
  explore: {
    title: 'Nhân từng hàng',
    instruction:
      'Em nhân từ hàng đơn vị, chạm vào chữ số để viết. Số nhớ hiện màu đỏ trên hàng bên trái. Mỗi hàng viết xong, ô cùng màu bên dưới cho biết phần đó nhân với số kia bằng bao nhiêu.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 2 018 × 4.',
      steps: [
        '4 nhân 8 bằng 32, viết 2, nhớ 3.',
        '4 nhân 1 bằng 4, thêm 3 bằng 7, viết 7.',
        '4 nhân 0 bằng 0, viết 0.',
        '4 nhân 2 bằng 8, viết 8.',
      ],
      answer: '2 018 × 4 = 8 072.',
    },
    {
      problem:
        'Bể thứ nhất chứa 1 005 l nước. Bể thứ hai chứa gấp đôi bể thứ nhất. Hỏi cả hai bể chứa bao nhiêu lít nước?',
      steps: [
        'Gấp đôi là gấp 2 lần. Bể thứ hai chứa: 1 005 × 2 = 2 010 (l).',
        'Cả hai bể chứa: 1 005 + 2 010 = 3 015 (l).',
      ],
      answer: 'Cả hai bể chứa 3 015 l nước.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '1 234 × 3 bằng bao nhiêu?',
      options: ['3 702', '3 692', '3 602', '3 712'],
      answer: 0,
      hints: ['3 nhân 4 bằng 12. Em viết 2, nhớ 1.', 'Hàng chục: 3 nhân 3, rồi thêm 1 đã nhớ.'],
      solution:
        '3 nhân 4 bằng 12, viết 2, nhớ 1. 3 nhân 3 bằng 9, thêm 1 bằng 10, viết 0, nhớ 1. 3 nhân 2 bằng 6, thêm 1 bằng 7, viết 7. 3 nhân 1 bằng 3, viết 3. Vậy 1 234 × 3 = 3 702.',
    },
    {
      type: 'number',
      prompt: 'Tính: 2 332 × 4 = ?',
      answer: 9328,
      hints: ['4 nhân 2 bằng 8, viết 8.', 'Hàng chục: 4 nhân 3 bằng 12, viết 2, nhớ 1.'],
      solution:
        '4 nhân 2 bằng 8, viết 8. 4 nhân 3 bằng 12, viết 2, nhớ 1. 4 nhân 3 bằng 12, thêm 1 bằng 13, viết 3, nhớ 1. 4 nhân 2 bằng 8, thêm 1 bằng 9, viết 9. Vậy 2 332 × 4 = 9 328.',
    },
    {
      type: 'number',
      prompt: 'Mỗi xe chở 2 345 kg than. Hỏi 3 xe như thế chở bao nhiêu ki-lô-gam than?',
      answer: 7035,
      unit: 'kg',
      hints: ['2 345 kg được lấy 3 lần, em làm phép nhân.', '3 nhân 5 bằng 15, viết 5, nhớ 1.'],
      solution:
        '3 nhân 5 bằng 15, viết 5, nhớ 1. 3 nhân 4 bằng 12, thêm 1 bằng 13, viết 3, nhớ 1. 3 nhân 3 bằng 9, thêm 1 bằng 10, viết 0, nhớ 1. 3 nhân 2 bằng 6, thêm 1 bằng 7, viết 7. 3 xe chở được 2 345 × 3 = 7 035 (kg) than.',
    },
    {
      type: 'match',
      prompt: 'Tính nhẩm rồi nối mỗi phép nhân với kết quả của nó.',
      left: ['2 000 × 4', '3 000 × 3', '1 500 × 2', '1 200 × 3'],
      right: ['8 000', '9 000', '3 000', '3 600'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['2 000 là 2 nghìn, 1 500 là 15 trăm.', 'Em nhẩm: 15 trăm × 2 = 30 trăm.'],
      solution:
        '2 nghìn × 4 = 8 nghìn: 2 000 × 4 = 8 000. 3 nghìn × 3 = 9 nghìn: 3 000 × 3 = 9 000. 15 trăm × 2 = 30 trăm: 1 500 × 2 = 3 000. 12 trăm × 3 = 36 trăm: 1 200 × 3 = 3 600.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 1 316 × 6 theo đúng thứ tự.',
      items: [
        '6 nhân 3 bằng 18, viết 8, nhớ 1',
        '6 nhân 1 bằng 6, thêm 1 bằng 7, viết 7',
        '6 nhân 6 bằng 36, viết 6, nhớ 3',
        '6 nhân 1 bằng 6, thêm 3 bằng 9, viết 9',
      ],
      answer: [2, 3, 0, 1],
      hints: ['Em nhân từ hàng đơn vị trước: 6 nhân 6.', 'Hàng nghìn làm sau cùng.'],
      solution:
        '6 nhân 6 bằng 36, viết 6, nhớ 3. 6 nhân 1 bằng 6, thêm 3 bằng 9, viết 9. 6 nhân 3 bằng 18, viết 8, nhớ 1. 6 nhân 1 bằng 6, thêm 1 bằng 7, viết 7. Vậy 1 316 × 6 = 7 896.',
    },
    {
      type: 'choice',
      prompt: 'Tổng 1 357 + 1 357 + 1 357 viết thành phép nhân là phép nào?',
      options: ['1 357 × 3', '1 357 × 2', '1 357 + 3', '3 × 3'],
      answer: 0,
      hints: ['Số 1 357 được lấy mấy lần?'],
      solution: '1 357 được lấy 3 lần, nên 1 357 + 1 357 + 1 357 = 1 357 × 3 = 4 071.',
    },
    {
      type: 'number',
      prompt: 'Một mảnh vườn hình vuông có cạnh dài 1 205 cm. Tính chu vi mảnh vườn đó.',
      answer: 4820,
      unit: 'cm',
      hints: ['Chu vi hình vuông bằng độ dài một cạnh nhân với 4.', 'Em tính 1 205 × 4.'],
      solution:
        '4 nhân 5 bằng 20, viết 0, nhớ 2. 4 nhân 0 bằng 0, thêm 2 bằng 2, viết 2. 4 nhân 2 bằng 8, viết 8. 4 nhân 1 bằng 4, viết 4. Chu vi mảnh vườn là 1 205 × 4 = 4 820 (cm).',
    },
    {
      type: 'choice',
      prompt:
        'An tính 1 528 × 4 như sau: 4 nhân 8 bằng 32, viết 2, nhớ 3. 4 nhân 2 bằng 8, thêm 3 bằng 11, viết 1, nhớ 1. 4 nhân 5 bằng 20, viết 0, nhớ 2. 4 nhân 1 bằng 4, thêm 2 bằng 6, viết 6. An được 6 012. An làm đúng hay sai?',
      options: [
        'Sai, ở hàng trăm An quên thêm 1 đã nhớ',
        'Đúng rồi',
        'Sai, ở hàng chục An quên thêm 3 đã nhớ',
      ],
      answer: 0,
      hints: ['Hàng chục nhớ 1 sang hàng trăm. Em xem An có thêm số 1 đó không.'],
      solution:
        'Hàng trăm: 4 nhân 5 bằng 20, phải thêm 1 bằng 21, viết 1, nhớ 2. Vậy 1 528 × 4 = 6 112, không phải 6 012.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 2 413 × 4 − 2 055.',
      answer: 7597,
      hints: ['Em làm phép nhân trước, phép trừ sau.', '2 413 × 4 = 9 652.'],
      solution: '2 413 × 4 − 2 055 = 9 652 − 2 055 = 7 597.',
    },
  ],
  takeaways: [
    'Đặt tính: viết thừa số có một chữ số thẳng cột với hàng đơn vị.',
    'Nhân từ phải sang trái, thêm số đã nhớ vào hàng tiếp theo.',
    'Nhân nhẩm: 2 nghìn × 4 = 8 nghìn.',
  ],
};
