/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Số có nhiều chữ số: đọc, viết số đến lớp triệu, hàng và lớp, giá trị của chữ số, làm tròn số đến hàng trăm nghìn, so sánh và sắp xếp số, số liền trước, liền sau và dãy số tự nhiên.',
  intro:
    'Em đã học các số đến hàng trăm triệu, hàng và lớp, làm tròn, so sánh và dãy số tự nhiên. Giờ em luyện tập tất cả nhé!',
  objectives: [
    'Đọc, viết được các số đến lớp triệu và viết số thành tổng theo các hàng.',
    'Nêu được hàng, lớp và giá trị của mỗi chữ số trong một số.',
    'Làm tròn số đến hàng trăm nghìn; so sánh, sắp xếp các số có nhiều chữ số.',
    'Tìm số liền trước, số liền sau; vận dụng vào bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Đọc, viết số và hàng, lớp',
      blocks: [
        {
          type: 'table',
          head: ['Lớp triệu', 'Lớp nghìn', 'Lớp đơn vị'],
          rows: [['304', '028', '102']],
          caption: 'Số 304 028 102',
        },
        {
          type: 'p',
          text: 'Em đọc từng lớp, từ trái sang phải: ba trăm linh bốn triệu không trăm hai mươi tám nghìn một trăm linh hai.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Mỗi lớp có ba hàng. Lớp đơn vị: đơn vị, chục, trăm. Lớp nghìn: nghìn, chục nghìn, trăm nghìn. Lớp triệu: triệu, chục triệu, trăm triệu.',
        },
        {
          type: 'p',
          text: 'Giá trị của một chữ số phụ thuộc vào hàng của nó: trong số 482 316 507, chữ số 8 ở hàng chục triệu nên có giá trị là 80 000 000.',
        },
      ],
    },
    {
      heading: 'Làm tròn, so sánh và dãy số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Làm tròn đến hàng trăm nghìn: em nhìn chữ số hàng chục nghìn. Bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số nào nhiều chữ số hơn thì lớn hơn. Cùng số chữ số thì so sánh từng hàng, từ trái sang phải.',
        },
        {
          type: 'p',
          text: 'Số liền sau: thêm 1. Số liền trước: bớt 1. Số 0 là số tự nhiên bé nhất, không có số tự nhiên lớn nhất.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Mỗi câu thuộc một phần của chủ đề. Em chạm vào đáp án. Sai lần đầu, em xem gợi ý rồi thử lại. Cuối bộ bài, em biết phần nào cần ôn thêm.',
  },
  examples: [
    {
      problem:
        'Năm 2019, Thành phố Hồ Chí Minh có 8 993 082 người. Làm tròn số dân đến hàng trăm nghìn.',
      steps: [
        'Chữ số hàng trăm nghìn của 8 993 082 là 9.',
        'Em nhìn chữ số hàng chục nghìn: đó là 9, 9 > 5 nên làm tròn lên.',
        'Làm tròn lên: 8 993 082 được làm tròn thành 9 000 000.',
      ],
      answer: 'Số dân khoảng 9 000 000 người.',
    },
    {
      problem: 'Sắp xếp các số 100 000 010; 99 999 999; 100 000 001 theo thứ tự từ bé đến lớn.',
      steps: [
        '99 999 999 có tám chữ số, hai số kia có chín chữ số. Vậy 99 999 999 bé nhất.',
        'So sánh 100 000 010 và 100 000 001: các hàng đều giống nhau đến hàng trăm. Ở hàng chục: 1 > 0.',
      ],
      answer: '99 999 999; 100 000 001; 100 000 010.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Số "sáu trăm linh năm triệu không trăm bốn mươi nghìn ba trăm" viết là số nào?',
      options: ['605 040 300', '650 040 300', '605 400 300', '605 040 030'],
      answer: 0,
      hints: ['Em viết từng lớp: lớp triệu là 605, lớp nghìn là 040.'],
      solution: 'Lớp triệu 605, lớp nghìn 040, lớp đơn vị 300. Số đó là 605 040 300.',
    },
    {
      type: 'choice',
      prompt: 'Số 23 015 400 đọc là gì?',
      options: [
        'Hai mươi ba triệu không trăm mười lăm nghìn bốn trăm',
        'Hai trăm ba mươi triệu một trăm năm mươi nghìn bốn trăm',
        'Hai mươi ba triệu không trăm mười lăm nghìn không trăm bốn mươi',
      ],
      answer: 0,
      hints: ['Em tách số thành các lớp: 23 | 015 | 400.'],
      solution:
        'Lớp triệu 23: hai mươi ba triệu. Lớp nghìn 015: không trăm mười lăm nghìn. Lớp đơn vị 400: bốn trăm.',
    },
    {
      type: 'number',
      prompt: 'Viết số: 7 000 000 + 300 000 + 50 + 9 = ?',
      answer: 7300059,
      hints: ['Hàng chục nghìn, hàng nghìn, hàng trăm không có: em viết chữ số 0.'],
      solution: '7 000 000 + 300 000 + 50 + 9 = 7 300 059.',
    },
    {
      type: 'choice',
      prompt: 'Trong số 482 316 507, chữ số 8 có giá trị là bao nhiêu?',
      options: ['80 000 000', '8 000 000', '800 000 000', '8'],
      answer: 0,
      hints: ['Chữ số 8 đứng thứ hai từ trái sang, trong lớp triệu.'],
      solution: 'Chữ số 8 ở hàng chục triệu, nên có giá trị là 80 000 000.',
    },
    {
      type: 'match',
      prompt: 'Chữ số 3 ở hàng nào? Em nối cho đúng.',
      left: [
        'Chữ số 3 trong số 3 102 468',
        'Chữ số 3 trong số 130 245',
        'Chữ số 3 trong số 2 003 451',
        'Chữ số 3 trong số 30 524 117',
      ],
      right: ['Hàng triệu', 'Hàng chục nghìn', 'Hàng nghìn', 'Hàng chục triệu'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em tách mỗi số thành các lớp, rồi tìm chữ số 3 nằm ở lớp nào.'],
      solution:
        '3 102 468: hàng triệu. 130 245: hàng chục nghìn. 2 003 451: hàng nghìn. 30 524 117: hàng chục triệu.',
    },
    {
      type: 'choice',
      prompt: 'Làm tròn số 5 762 019 đến hàng trăm nghìn được số nào?',
      options: ['5 800 000', '5 700 000', '5 760 000', '6 000 000'],
      answer: 0,
      hints: ['Em nhìn chữ số hàng chục nghìn.'],
      solution: 'Chữ số hàng chục nghìn là 6, 6 > 5 nên làm tròn lên: được 5 800 000.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 12 349 999 đến hàng trăm nghìn.',
      answer: 12300000,
      hints: ['Chữ số hàng chục nghìn là chữ số nào?', 'Bé hơn 5 thì làm tròn xuống.'],
      solution: 'Chữ số hàng chục nghìn là 4, 4 < 5 nên làm tròn xuống: được 12 300 000.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số theo thứ tự từ lớn đến bé.',
      items: ['99 999 999', '100 000 001', '99 909 999', '100 000 010'],
      answer: [3, 1, 0, 2],
      hints: [
        'Hai số có chín chữ số lớn hơn hai số có tám chữ số.',
        'Em so sánh từng hàng, từ trái sang phải.',
      ],
      solution: '100 000 010 > 100 000 001 > 99 999 999 > 99 909 999.',
    },
    {
      type: 'choice',
      prompt: 'Số liền sau của 999 999 là số nào?',
      options: ['1 000 000', '999 998', '1 000 001', '100 000'],
      answer: 0,
      hints: ['Số liền sau: em thêm 1.'],
      solution: '999 999 + 1 = 1 000 000.',
    },
    {
      type: 'number',
      prompt: 'Số nào thích hợp thay cho dấu "?": 300 000; 400 000; 500 000; ?',
      answer: 600000,
      hints: ['Mỗi số hơn số trước bao nhiêu?'],
      solution: 'Mỗi số hơn số trước 100 000: 500 000 + 100 000 = 600 000.',
    },
    {
      type: 'choice',
      prompt:
        'Năm 2019, Hà Nội có 8 053 663 người, Thành phố Hồ Chí Minh có 8 993 082 người. Thành phố nào đông dân hơn?',
      options: ['Thành phố Hồ Chí Minh', 'Hà Nội'],
      answer: 0,
      hints: ['Hai số cùng có bảy chữ số và cùng 8 triệu. Em so sánh hàng trăm nghìn.'],
      solution:
        'Ở hàng trăm nghìn: 9 > 0. Vậy 8 993 082 > 8 053 663: Thành phố Hồ Chí Minh đông dân hơn.',
    },
    {
      type: 'number',
      prompt: 'Số bé nhất có chín chữ số là số nào?',
      answer: 100000000,
      hints: ['Chữ số đầu tiên phải khác 0. Các chữ số sau em chọn chữ số bé nhất.'],
      solution: 'Chữ số đầu là 1, tám chữ số sau là 0: số bé nhất có chín chữ số là 100 000 000.',
    },
  ],
  takeaways: [
    'Đọc, viết số theo từng lớp: lớp triệu, lớp nghìn, lớp đơn vị.',
    'Giá trị của chữ số phụ thuộc vào hàng của nó.',
    'Làm tròn đến hàng trăm nghìn: nhìn chữ số hàng chục nghìn.',
    'So sánh: đếm chữ số trước, rồi so sánh từng hàng từ trái sang phải.',
  ],
};
