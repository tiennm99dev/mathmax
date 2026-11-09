/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đặt tính rồi tính phép trừ các số trong phạm vi 100 000, không nhớ và có nhớ; trừ nhẩm số tròn nghìn, tròn chục nghìn; tính giá trị biểu thức và giải bài toán có lời văn.',
  intro:
    'Nhà máy làm được 24 500 chiếc ô tô đồ chơi. Tháng Một bán 10 600 chiếc, tháng Hai bán 9 500 chiếc. Nhà máy còn lại bao nhiêu chiếc? Em học trừ các số có năm chữ số nhé!',
  objectives: [
    'Đặt tính và trừ các số có năm chữ số.',
    'Biết trừ có nhớ: không trừ được thì lấy thêm 10, rồi nhớ 1 sang hàng bên trái.',
    'Trừ nhẩm số tròn nghìn, tròn chục nghìn.',
    'Tính giá trị biểu thức và giải bài toán có phép trừ.',
  ],
  sections: [
    {
      heading: 'Trừ không nhớ',
      blocks: [
        { type: 'p', text: 'Em tính 68 795 − 25 432.' },
        {
          type: 'p',
          text: 'Em đặt tính: viết số trừ dưới số bị trừ, các hàng thẳng cột với nhau.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            '5 trừ 2 bằng 3, viết 3.',
            '9 trừ 3 bằng 6, viết 6.',
            '7 trừ 4 bằng 3, viết 3.',
            '8 trừ 5 bằng 3, viết 3.',
            '6 trừ 2 bằng 4, viết 4.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '68 795 − 25 432 = 43 363.' },
      ],
    },
    {
      heading: 'Trừ có nhớ',
      blocks: [
        { type: 'p', text: 'Em tính 23 285 − 12 967. Hàng đơn vị: 5 không trừ được 7.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '5 không trừ được 7, lấy 15 trừ 7 bằng 8, viết 8, nhớ 1.',
            '6 thêm 1 bằng 7, 8 trừ 7 bằng 1, viết 1.',
            '2 không trừ được 9, lấy 12 trừ 9 bằng 3, viết 3, nhớ 1.',
            '2 thêm 1 bằng 3, 3 trừ 3 bằng 0, viết 0.',
            '2 trừ 1 bằng 1, viết 1.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '23 285 − 12 967 = 10 318.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Em trừ từ phải sang trái. Chữ số trên bé hơn thì lấy thêm 10 để trừ, rồi nhớ 1: cộng 1 vào chữ số của số trừ ở hàng bên trái.',
        },
        {
          type: 'p',
          text: 'Em thử lại bằng phép cộng: 10 318 + 12 967 = 23 285. Đúng bằng số bị trừ.',
        },
      ],
    },
    {
      heading: 'Trừ đi số có bốn chữ số',
      blocks: [
        { type: 'p', text: 'Em tính 60 254 − 8 317. Số 8 317 không có hàng chục nghìn.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '4 không trừ được 7, lấy 14 trừ 7 bằng 7, viết 7, nhớ 1.',
            '1 thêm 1 bằng 2, 5 trừ 2 bằng 3, viết 3.',
            '2 không trừ được 3, lấy 12 trừ 3 bằng 9, viết 9, nhớ 1.',
            '8 thêm 1 bằng 9, 0 không trừ được 9, lấy 10 trừ 9 bằng 1, viết 1, nhớ 1.',
            '6 trừ 1 bằng 5, viết 5.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '60 254 − 8 317 = 51 937.' },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Ở hàng chục nghìn, số trừ không có chữ số nhưng vẫn còn 1 đã nhớ: em lấy 6 trừ 1.',
        },
      ],
    },
    {
      heading: 'Trừ nhẩm',
      blocks: [
        { type: 'p', text: 'Số tròn nghìn: 15 000 − 7 000. Em nhẩm 15 nghìn − 7 nghìn = 8 nghìn.' },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '15 000 − 7 000 = 8 000.' },
        {
          type: 'p',
          text: 'Số tròn chục nghìn: 60 000 − 20 000. Em nhẩm 6 chục nghìn − 2 chục nghìn = 4 chục nghìn.',
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '60 000 − 20 000 = 40 000.' },
        { type: 'p', text: '57 000 − 3 000: em nhẩm 57 nghìn − 3 nghìn = 54 nghìn.' },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '57 000 − 3 000 = 54 000.' },
      ],
    },
  ],
  explore: {
    title: 'Trừ từng hàng',
    instruction:
      'Em trừ từ hàng đơn vị. Khi chữ số trên bé hơn, em bấm nút "Mượn 1": chữ số trên có thêm 10, và số 1 đã nhớ hiện bên chữ số của số trừ ở hàng bên trái. Rồi em chạm vào chữ số để viết kết quả.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 72 146 − 35 258.',
      steps: [
        '6 không trừ được 8, lấy 16 trừ 8 bằng 8, viết 8, nhớ 1.',
        '5 thêm 1 bằng 6, 4 không trừ được 6, lấy 14 trừ 6 bằng 8, viết 8, nhớ 1.',
        '2 thêm 1 bằng 3, 1 không trừ được 3, lấy 11 trừ 3 bằng 8, viết 8, nhớ 1.',
        '5 thêm 1 bằng 6, 2 không trừ được 6, lấy 12 trừ 6 bằng 6, viết 6, nhớ 1.',
        '3 thêm 1 bằng 4, 7 trừ 4 bằng 3, viết 3.',
      ],
      answer: '72 146 − 35 258 = 36 888.',
    },
    {
      problem:
        'Nhà máy làm được 24 500 chiếc ô tô đồ chơi. Tháng Một bán 10 600 chiếc, tháng Hai bán 9 500 chiếc. Hỏi nhà máy còn lại bao nhiêu chiếc ô tô đồ chơi?',
      steps: [
        'Sau tháng Một còn lại: 24 500 − 10 600 = 13 900 (chiếc).',
        'Sau tháng Hai còn lại: 13 900 − 9 500 = 4 400 (chiếc).',
      ],
      answer: 'Nhà máy còn lại 4 400 chiếc ô tô đồ chơi.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '90 000 − 45 678 bằng bao nhiêu?',
      options: ['44 322', '55 432', '45 322', '54 322'],
      answer: 0,
      hints: [
        '0 không trừ được 8, em lấy 10 trừ 8, nhớ 1.',
        'Hàng chục, hàng trăm, hàng nghìn đều là 0, nên hàng nào cũng phải mượn. Đừng quên nhớ 1 vào số trừ ở hàng chục nghìn.',
      ],
      solution:
        '0 không trừ được 8, lấy 10 trừ 8 bằng 2, viết 2, nhớ 1. 7 thêm 1 bằng 8, 0 không trừ được 8, lấy 10 trừ 8 bằng 2, viết 2, nhớ 1. 6 thêm 1 bằng 7, 0 không trừ được 7, lấy 10 trừ 7 bằng 3, viết 3, nhớ 1. 5 thêm 1 bằng 6, 0 không trừ được 6, lấy 10 trừ 6 bằng 4, viết 4, nhớ 1. 4 thêm 1 bằng 5, 9 trừ 5 bằng 4, viết 4. Vậy 90 000 − 45 678 = 44 322.',
    },
    {
      type: 'match',
      prompt: 'Tính nhẩm rồi nối mỗi phép trừ với kết quả của nó.',
      left: ['60 000 − 20 000', '90 000 − 70 000', '100 000 − 40 000', '43 000 − 8 000'],
      right: ['40 000', '20 000', '60 000', '35 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Em nhẩm theo chục nghìn: 6 chục nghìn − 2 chục nghìn = 4 chục nghìn.',
        '100 000 là 10 chục nghìn. 43 nghìn − 8 nghìn = mấy nghìn?',
      ],
      solution:
        '60 000 − 20 000 = 40 000. 90 000 − 70 000 = 20 000. 100 000 − 40 000 = 60 000. 43 000 − 8 000 = 35 000.',
    },
    {
      type: 'choice',
      prompt: 'Tính nhẩm: 86 000 − 5 000 = ?',
      options: ['81 000', '36 000', '85 500', '80 000'],
      answer: 0,
      hints: ['5 000 là 5 nghìn.', 'Em nhẩm: 86 nghìn − 5 nghìn = mấy nghìn?'],
      solution: '86 nghìn − 5 nghìn = 81 nghìn. Vậy 86 000 − 5 000 = 81 000.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 85 362 − 27 145 theo đúng thứ tự.',
      items: [
        '3 trừ 1 bằng 2, viết 2',
        '2 thêm 1 bằng 3, 8 trừ 3 bằng 5, viết 5',
        '2 không trừ được 5, lấy 12 trừ 5 bằng 7, viết 7, nhớ 1',
        '5 không trừ được 7, lấy 15 trừ 7 bằng 8, viết 8, nhớ 1',
        '4 thêm 1 bằng 5, 6 trừ 5 bằng 1, viết 1',
      ],
      answer: [2, 4, 0, 3, 1],
      hints: ['Em trừ từ hàng đơn vị trước.', 'Hàng chục nghìn làm sau cùng.'],
      solution:
        '2 không trừ được 5, lấy 12 trừ 5 bằng 7, viết 7, nhớ 1. 4 thêm 1 bằng 5, 6 trừ 5 bằng 1, viết 1. 3 trừ 1 bằng 2, viết 2. 5 không trừ được 7, lấy 15 trừ 7 bằng 8, viết 8, nhớ 1. 2 thêm 1 bằng 3, 8 trừ 3 bằng 5, viết 5. Vậy 85 362 − 27 145 = 58 217.',
    },
    {
      type: 'choice',
      prompt:
        'Nam tính 64 523 − 28 751 như sau: 3 trừ 1 bằng 2, viết 2. 2 không trừ được 5, lấy 12 trừ 5 bằng 7, viết 7, nhớ 1. 5 không trừ được 7, lấy 15 trừ 7 bằng 8, viết 8, nhớ 1. 8 thêm 1 bằng 9, 4 không trừ được 9, lấy 14 trừ 9 bằng 5, viết 5, nhớ 1. 2 thêm 1 bằng 3, 6 trừ 3 bằng 3, viết 3. Nam được 35 872. Nam làm đúng hay sai?',
      options: [
        'Sai, ở hàng trăm Nam quên thêm 1 đã nhớ vào 7',
        'Đúng rồi',
        'Sai, ở hàng nghìn Nam quên thêm 1 đã nhớ vào 8',
      ],
      answer: 0,
      hints: ['Hàng chục có nhớ 1. Em xem Nam làm gì với số 1 đó ở hàng trăm.'],
      solution:
        'Hàng trăm: 7 thêm 1 bằng 8, 5 không trừ được 8, lấy 15 trừ 8 bằng 7, viết 7, nhớ 1. Vậy 64 523 − 28 751 = 35 772, không phải 35 872.',
    },
    {
      type: 'choice',
      prompt: 'Biểu thức nào có giá trị lớn hơn?',
      options: ['93 279 − 3 279 − 20 000', '70 000 − 9 000 + 6 023'],
      answer: 0,
      hints: ['Em tính từ trái sang phải.', '93 279 − 3 279 ra một số tròn chục nghìn.'],
      solution:
        '93 279 − 3 279 = 90 000, 90 000 − 20 000 = 70 000. 70 000 − 9 000 = 61 000, 61 000 + 6 023 = 67 023. Vì 70 000 > 67 023 nên biểu thức 93 279 − 3 279 − 20 000 có giá trị lớn hơn.',
    },
    {
      type: 'number',
      prompt:
        'Quãng đường từ nhà An ra thị trấn có đoạn lên dốc dài 6 700 m. Đoạn xuống dốc ngắn hơn đoạn lên dốc 2 900 m. Hỏi quãng đường từ nhà An ra thị trấn dài bao nhiêu mét?',
      answer: 10500,
      unit: 'm',
      hints: [
        'Trước hết em tìm đoạn xuống dốc: "ngắn hơn" thì em làm phép trừ.',
        'Quãng đường gồm đoạn lên dốc và đoạn xuống dốc.',
      ],
      solution:
        'Đoạn xuống dốc dài: 6 700 − 2 900 = 3 800 (m). Quãng đường dài: 6 700 + 3 800 = 10 500 (m).',
    },
    {
      type: 'number',
      prompt:
        'Thư viện có 42 150 quyển sách. Thư viện cho mượn 8 375 quyển. Hỏi thư viện còn lại bao nhiêu quyển sách?',
      answer: 33775,
      hints: ['"Còn lại" thì em làm phép trừ.', 'Em đặt tính 42 150 − 8 375.'],
      solution:
        '0 không trừ được 5, lấy 10 trừ 5 bằng 5, viết 5, nhớ 1. 7 thêm 1 bằng 8, 5 không trừ được 8, lấy 15 trừ 8 bằng 7, viết 7, nhớ 1. 3 thêm 1 bằng 4, 1 không trừ được 4, lấy 11 trừ 4 bằng 7, viết 7, nhớ 1. 8 thêm 1 bằng 9, 2 không trừ được 9, lấy 12 trừ 9 bằng 3, viết 3, nhớ 1. 4 trừ 1 bằng 3, viết 3. Thư viện còn lại 42 150 − 8 375 = 33 775 (quyển sách).',
    },
    {
      type: 'number',
      prompt: 'Trong phép trừ 7▢ 846 − 25 319 = 49 527, chữ số trong ô trống là chữ số nào?',
      answer: 4,
      hints: [
        'Em thử lại bằng phép cộng: hiệu cộng số trừ bằng số bị trừ.',
        'Em tính 49 527 + 25 319 rồi xem chữ số hàng nghìn.',
      ],
      solution: '49 527 + 25 319 = 74 846. Vậy số bị trừ là 74 846, chữ số trong ô trống là 4.',
    },
    {
      type: 'number',
      prompt: 'Tìm hiệu của số lớn nhất có năm chữ số và số bé nhất có ba chữ số khác nhau.',
      answer: 99897,
      hints: [
        'Số lớn nhất có năm chữ số là 99 999.',
        'Số bé nhất có ba chữ số khác nhau bắt đầu bằng 1, rồi 0, rồi 2.',
      ],
      solution:
        'Số lớn nhất có năm chữ số là 99 999. Số bé nhất có ba chữ số khác nhau là 102. Hiệu là 99 999 − 102 = 99 897.',
    },
  ],
  takeaways: [
    'Đặt tính thẳng cột, trừ từ phải sang trái.',
    'Không trừ được thì lấy thêm 10 để trừ, rồi nhớ 1 vào chữ số của số trừ ở hàng bên trái.',
    'Thử lại phép trừ bằng phép cộng: hiệu + số trừ = số bị trừ.',
    'Trừ nhẩm: 6 chục nghìn − 2 chục nghìn = 4 chục nghìn.',
  ],
};
