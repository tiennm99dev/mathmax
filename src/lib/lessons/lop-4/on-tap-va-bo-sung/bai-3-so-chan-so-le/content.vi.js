/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Số chẵn, số lẻ: số chia hết cho 2 là số chẵn, số không chia hết cho 2 là số lẻ; nhận biết qua chữ số tận cùng; hai số chẵn hay hai số lẻ liên tiếp hơn kém nhau 2 đơn vị.',
  intro:
    'Trên một con phố, các nhà một bên đánh số 2, 4, 6, 8, ..., bên kia đánh số 1, 3, 5, 7, ... Vì sao lại như vậy? Hôm nay em học số chẵn, số lẻ nhé!',
  objectives: [
    'Nhận biết được số chẵn, số lẻ.',
    'Dựa vào chữ số tận cùng để biết một số là số chẵn hay số lẻ.',
    'Viết được dãy số chẵn, dãy số lẻ liên tiếp.',
  ],
  sections: [
    {
      heading: 'Số chẵn, số lẻ',
      blocks: [
        {
          type: 'p',
          text: 'Có 6 quả táo. Em xếp thành từng cặp được 3 cặp, không thừa quả nào. 6 chia hết cho 2.',
        },
        {
          type: 'p',
          text: 'Có 7 con gà con. Em xếp thành từng cặp được 3 cặp, còn thừa 1 con. 7 không chia hết cho 2.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Các số chia hết cho 2 là số chẵn. Các số không chia hết cho 2 là số lẻ.',
        },
        {
          type: 'p',
          text: 'Số chẵn: 0, 2, 4, 6, 8, 10, 12, ... Số lẻ: 1, 3, 5, 7, 9, 11, 13, ...',
        },
      ],
    },
    {
      heading: 'Nhìn chữ số tận cùng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Các số có chữ số tận cùng là 0, 2, 4, 6, 8 là số chẵn. Các số có chữ số tận cùng là 1, 3, 5, 7, 9 là số lẻ.',
        },
        {
          type: 'table',
          head: ['Số', 'Chữ số tận cùng', 'Số chẵn hay số lẻ'],
          rows: [
            ['108', '8', 'số chẵn'],
            ['656', '6', 'số chẵn'],
            ['315', '5', 'số lẻ'],
            ['649', '9', 'số lẻ'],
            ['1 270', '0', 'số chẵn'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Số lớn đến mấy em cũng chỉ cần nhìn chữ số hàng đơn vị.',
        },
      ],
    },
    {
      heading: 'Số chẵn liên tiếp, số lẻ liên tiếp',
      blocks: [
        {
          type: 'p',
          text: 'Dãy nhà số chẵn: 120, 122, 124, 126. Dãy nhà số lẻ: 121, 123, 125, 127.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hai số chẵn liên tiếp hơn kém nhau 2 đơn vị. Hai số lẻ liên tiếp cũng hơn kém nhau 2 đơn vị.',
        },
        {
          type: 'p',
          text: 'Số chẵn và số lẻ xen kẽ nhau: sau một số chẵn là một số lẻ, sau một số lẻ là một số chẵn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp thành từng cặp',
    instruction:
      'Em bấm "Xếp thành từng cặp". Nếu mọi đồ vật đều có cặp thì số đó là số chẵn. Nếu còn thừa 1 thì số đó là số lẻ. Em bấm "Thêm 1" hay "Bớt 1" để thử số khác.',
  },
  examples: [
    {
      problem: 'Trong các số 12, 315, 108, 71, 194: số nào là số chẵn, số nào là số lẻ?',
      steps: [
        'Em nhìn chữ số tận cùng của mỗi số.',
        '12 tận cùng là 2, 108 tận cùng là 8, 194 tận cùng là 4: đều là số chẵn.',
        '315 tận cùng là 5, 71 tận cùng là 1: đều là số lẻ.',
      ],
      answer: 'Số chẵn: 12, 108, 194. Số lẻ: 315, 71.',
    },
    {
      problem: 'Viết ba số chẵn liên tiếp, bắt đầu từ 78.',
      steps: [
        '78 tận cùng là 8 nên 78 là số chẵn.',
        'Hai số chẵn liên tiếp hơn kém nhau 2 đơn vị: 78 + 2 = 80, 80 + 2 = 82.',
      ],
      answer: '78, 80, 82.',
    },
    {
      problem: 'Từ ba thẻ số 7, 4, 5, lập các số chẵn có hai chữ số khác nhau.',
      steps: [
        'Số chẵn phải có chữ số tận cùng là chữ số chẵn. Trong ba thẻ chỉ có 4 là chữ số chẵn.',
        'Đặt 4 ở hàng đơn vị, hàng chục là 7 hoặc 5.',
      ],
      answer: 'Các số chẵn lập được là 74 và 54.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có bao nhiêu con cá? Em đếm rồi xem số đó là số chẵn hay số lẻ nhé.',
      picture: 'fish',
      answer: 9,
      choices: [8, 9, 10],
      hints: ['Em đếm từng con, chạm vào mỗi con một lần.'],
      solution: 'Có 9 con cá. Xếp thành từng cặp được 4 cặp, còn thừa 1 con: 9 là số lẻ.',
    },
    {
      type: 'multi',
      prompt: 'Em chọn tất cả các số chẵn.',
      options: ['656', '315', '72', '649', '1 270', '113'],
      answers: [0, 2, 4],
      hints: ['Số chẵn có chữ số tận cùng là 0, 2, 4, 6, 8.'],
      solution:
        '656 tận cùng là 6, 72 tận cùng là 2, 1 270 tận cùng là 0: đều là số chẵn. 315, 649, 113 là số lẻ.',
    },
    {
      type: 'choice',
      prompt: 'Số 45 687 là số chẵn hay số lẻ?',
      options: ['Số lẻ', 'Số chẵn'],
      answer: 0,
      hints: ['Em chỉ cần nhìn chữ số hàng đơn vị.'],
      solution: '45 687 có chữ số tận cùng là 7, nên là số lẻ.',
    },
    {
      type: 'multi',
      prompt:
        'Ong bay theo số chẵn thì đến bông hoa màu xanh. Em chọn tất cả những con ong đến bông hoa màu xanh.',
      options: ['Ong số 34', 'Ong số 57', 'Ong số 90', 'Ong số 123', 'Ong số 216'],
      answers: [0, 2, 4],
      hints: ['Em nhìn chữ số tận cùng của số trên mỗi con ong.'],
      solution: '34, 90, 216 có chữ số tận cùng là 4, 0, 6 nên là số chẵn. 57 và 123 là số lẻ.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số nhà thành dãy số lẻ liên tiếp, từ bé đến lớn.',
      items: ['125', '121', '127', '123'],
      answer: [1, 3, 0, 2],
      hints: ['Hai số lẻ liên tiếp hơn kém nhau 2 đơn vị. Số bé nhất là 121.'],
      solution: '121, 123, 125, 127.',
    },
    {
      type: 'number',
      prompt: 'Số chẵn liền sau số chẵn 98 là số nào?',
      answer: 100,
      hints: ['Hai số chẵn liên tiếp hơn kém nhau 2 đơn vị.'],
      solution: '98 + 2 = 100. Số chẵn liền sau 98 là 100.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi câu với số đúng.',
      left: [
        'Số chẵn liền sau 46',
        'Số lẻ liền trước 49',
        'Số chẵn liền trước 52',
        'Số lẻ liền sau 49',
      ],
      right: ['48', '47', '50', '51', '53'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Hai số chẵn (hay hai số lẻ) liên tiếp hơn kém nhau 2 đơn vị.'],
      solution: '46 + 2 = 48; 49 − 2 = 47; 52 − 2 = 50; 49 + 2 = 51.',
    },
    {
      type: 'number',
      prompt: 'Từ 10 đến 31 có bao nhiêu số lẻ?',
      answer: 11,
      hints: ['Số lẻ đầu tiên là 11, số lẻ cuối cùng là 31.', 'Em đếm: 11, 13, 15, ...'],
      solution: 'Các số lẻ là 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31. Có 11 số lẻ.',
    },
    {
      type: 'multi',
      prompt:
        'Từ ba thẻ số 7, 4, 5, em lập số lẻ có hai chữ số khác nhau. Em chọn các số lập được.',
      options: ['47', '45', '57', '75', '74', '54'],
      answers: [0, 1, 2, 3],
      hints: ['Số lẻ có chữ số tận cùng là 7 hoặc 5.'],
      solution: 'Tận cùng là 7: 47, 57. Tận cùng là 5: 45, 75. Còn 74 và 54 là số chẵn.',
    },
  ],
  takeaways: [
    'Số chia hết cho 2 là số chẵn, số không chia hết cho 2 là số lẻ.',
    'Chữ số tận cùng 0, 2, 4, 6, 8: số chẵn. Chữ số tận cùng 1, 3, 5, 7, 9: số lẻ.',
    'Hai số chẵn (hay hai số lẻ) liên tiếp hơn kém nhau 2 đơn vị.',
  ],
};
