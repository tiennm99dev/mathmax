/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập các số đến 100: đọc, viết số có hai chữ số, số chục và số đơn vị, viết số thành tổng của số chục và số đơn vị, so sánh và xếp thứ tự các số.',
  intro:
    'Lên lớp 2 rồi! Em cùng ôn lại các số đến 100 nhé: đọc số, viết số, xem số gồm mấy chục, mấy đơn vị và so sánh các số.',
  objectives: [
    'Đọc, viết các số đến 100.',
    'Nêu số chục, số đơn vị của một số có hai chữ số.',
    'Viết số thành tổng của số chục và số đơn vị, như 45 = 40 + 5.',
    'So sánh và xếp thứ tự các số trong phạm vi 100.',
  ],
  sections: [
    {
      heading: 'Đọc, viết số',
      blocks: [
        {
          type: 'p',
          text: 'Em đọc chữ số hàng chục trước, rồi đọc chữ số hàng đơn vị.',
        },
        {
          type: 'table',
          head: ['Viết số', 'Đọc số'],
          rows: [
            ['36', 'ba mươi sáu'],
            ['51', 'năm mươi mốt'],
            ['74', 'bảy mươi tư'],
            ['85', 'tám mươi lăm'],
            ['100', 'một trăm'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý cách đọc',
          text: 'Chữ số 1 sau "mươi" đọc là "mốt", chữ số 5 đọc là "lăm", chữ số 4 có thể đọc là "tư".',
        },
      ],
    },
    {
      heading: 'Chục và đơn vị',
      blocks: [
        {
          type: 'p',
          text: 'Số 45 có hai chữ số. Chữ số 4 ở hàng chục, chữ số 5 ở hàng đơn vị.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số 45',
          text: '45 gồm 4 chục và 5 đơn vị. Ta viết: 45 = 40 + 5.',
        },
        {
          type: 'table',
          head: ['Số', 'Chục', 'Đơn vị', 'Viết thành tổng'],
          rows: [
            ['27', '2', '7', '27 = 20 + 7'],
            ['63', '6', '3', '63 = 60 + 3'],
            ['98', '9', '8', '98 = 90 + 8'],
          ],
        },
        {
          type: 'p',
          text: 'Số tròn chục có chữ số 0 ở hàng đơn vị: 10, 20, 30, ..., 90.',
        },
      ],
    },
    {
      heading: 'So sánh số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cách so sánh',
          text: 'Em so sánh chữ số hàng chục trước. Số nào có hàng chục lớn hơn thì lớn hơn. Hàng chục bằng nhau thì so sánh hàng đơn vị.',
        },
        {
          type: 'p',
          text: '52 > 38 vì 5 chục lớn hơn 3 chục.',
        },
        {
          type: 'p',
          text: '64 < 67 vì cùng 6 chục, mà 4 bé hơn 7.',
        },
        {
          type: 'p',
          text: 'Trong bảng các số từ 1 đến 100: sang phải một ô thì thêm 1, xuống dưới một ô thì thêm 10.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng 100 ô có ô trống',
    instruction:
      'Chạm vào một ô có dấu ?. Em chạm các chữ số để viết số còn thiếu, rồi chạm "Kiểm tra". Có thể dùng phím mũi tên, gõ số rồi nhấn Enter.',
  },
  examples: [
    {
      problem: 'Viết số 72 thành tổng của số chục và số đơn vị.',
      steps: [
        'Chữ số 7 ở hàng chục: 7 chục là 70.',
        'Chữ số 2 ở hàng đơn vị: 2 đơn vị là 2.',
        'Vậy 72 = 70 + 2.',
      ],
      answer: '72 = 70 + 2.',
    },
    {
      problem: 'Xếp các số 46, 64, 40, 59 theo thứ tự từ bé đến lớn.',
      steps: [
        'So sánh hàng chục: 40 và 46 có 4 chục, 59 có 5 chục, 64 có 6 chục.',
        '40 và 46 cùng 4 chục; hàng đơn vị 0 bé hơn 6, nên 40 < 46.',
        'Vậy thứ tự từ bé đến lớn là 40, 46, 59, 64.',
      ],
      answer: '40, 46, 59, 64.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Số 61 đọc là gì?',
      options: ['sáu mươi một', 'sáu mươi mốt', 'mười sáu'],
      answer: 1,
      hints: ['Chữ số 1 đứng sau "mươi" đọc là "mốt".'],
      solution: 'Số 61 đọc là "sáu mươi mốt".',
    },
    {
      type: 'choice',
      prompt: 'Số "chín mươi lăm" viết là gì?',
      options: ['59', '905', '95'],
      answer: 2,
      hints: ['"Chín mươi" là 9 chục. "Lăm" là 5 đơn vị.'],
      solution: 'Chín mươi lăm gồm 9 chục và 5 đơn vị, viết là 95.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số với cách viết thành tổng.',
      left: ['38', '83', '35', '53'],
      right: ['30 + 8', '80 + 3', '50 + 3', '30 + 5', '50 + 8'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 3],
        [3, 2],
      ],
      hints: ['Số chục viết trước, số đơn vị viết sau.', '38 gồm 3 chục và 8 đơn vị.'],
      solution: '38 = 30 + 8, 83 = 80 + 3, 35 = 30 + 5, 53 = 50 + 3.',
    },
    {
      type: 'choice',
      prompt: 'Số gồm 7 chục và 4 đơn vị là số nào?',
      options: ['47', '74', '704'],
      answer: 1,
      hints: ['Số chục là chữ số bên trái.'],
      solution: '7 chục và 4 đơn vị là 74.',
    },
    {
      type: 'choice',
      prompt: 'Số 59 gồm mấy chục và mấy đơn vị?',
      options: ['9 chục và 5 đơn vị', '5 chục và 9 đơn vị', '59 chục'],
      answer: 1,
      hints: ['Chữ số bên trái chỉ số chục, chữ số bên phải chỉ số đơn vị.'],
      solution: 'Số 59 gồm 5 chục và 9 đơn vị: 59 = 50 + 9.',
    },
    {
      type: 'choice',
      prompt:
        'Có 3 bó que tính, mỗi bó 1 chục que, và 6 que tính rời. Có tất cả bao nhiêu que tính?',
      options: ['9', '36', '63'],
      answer: 1,
      hints: ['3 bó là 3 chục que tính.', '3 chục và 6 đơn vị là số nào?'],
      solution: '3 chục và 6 đơn vị là 36. Có tất cả 36 que tính.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 47 ... 74',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['So sánh hàng chục trước: 4 chục và 7 chục.'],
      solution: '4 chục bé hơn 7 chục, nên 47 < 74.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 86 ... 82',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Hai số cùng 8 chục. Em so sánh hàng đơn vị.'],
      solution: 'Cùng 8 chục; 6 lớn hơn 2, nên 86 > 82.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự từ bé đến lớn.',
      items: ['71', '17', '70', '27'],
      answer: [1, 3, 2, 0],
      hints: ['So sánh hàng chục trước.', '70 và 71 cùng 7 chục: em xem hàng đơn vị.'],
      solution: 'Từ bé đến lớn: 17, 27, 70, 71.',
    },
    {
      type: 'choice',
      prompt: 'Số lớn nhất có hai chữ số là số nào?',
      options: ['90', '99', '100'],
      answer: 1,
      hints: ['Số 100 có ba chữ số.', 'Chữ số lớn nhất là 9.'],
      solution: 'Số lớn nhất có hai chữ số là 99.',
    },
    {
      type: 'choice',
      prompt: 'Trong bảng các số, ô ngay dưới số 58 là số nào?',
      options: ['59', '48', '68'],
      answer: 2,
      hints: ['Xuống dưới một ô thì thêm 10.'],
      solution: '58 thêm 10 là 68.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các số tròn chục.',
      options: ['30', '33', '50', '80', '65'],
      answers: [0, 2, 3],
      hints: ['Số tròn chục có chữ số 0 ở hàng đơn vị.'],
      solution: '30, 50 và 80 là các số tròn chục: hàng đơn vị là chữ số 0.',
    },
  ],
  takeaways: [
    'Em đọc chữ số hàng chục trước, rồi đọc chữ số hàng đơn vị.',
    '45 gồm 4 chục và 5 đơn vị: 45 = 40 + 5.',
    'So sánh hàng chục trước; hàng chục bằng nhau thì so sánh hàng đơn vị.',
  ],
};
