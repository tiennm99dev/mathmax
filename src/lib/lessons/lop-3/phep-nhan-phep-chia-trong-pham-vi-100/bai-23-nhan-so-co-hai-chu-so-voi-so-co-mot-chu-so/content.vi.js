/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đặt tính rồi tính phép nhân số có hai chữ số với số có một chữ số, không nhớ và có nhớ; nhân nhẩm số tròn chục.',
  intro:
    'Có 3 hộp, mỗi hộp 12 chiếc bút chì màu. Có 3 chùm nho, mỗi chùm 26 quả. Có tất cả bao nhiêu? Em cùng đặt tính để tính nhé!',
  objectives: [
    'Đặt tính và nhân số có hai chữ số với số có một chữ số.',
    'Biết nhân có nhớ: viết hàng đơn vị, nhớ sang hàng chục.',
    'Nhân nhẩm số tròn chục với số có một chữ số.',
  ],
  sections: [
    {
      heading: 'Nhân không nhớ',
      blocks: [
        { type: 'p', text: 'Có 3 hộp, mỗi hộp 12 chiếc bút. Em tính 12 × 3.' },
        {
          type: 'p',
          text: 'Em đặt tính: viết 12, viết 3 thẳng cột với chữ số 2, viết dấu nhân, kẻ vạch ngang.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Nhân từ hàng đơn vị: 3 nhân 2 bằng 6, viết 6.',
            'Rồi đến hàng chục: 3 nhân 1 bằng 3, viết 3.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '12 × 3 = 36.' },
      ],
    },
    {
      heading: 'Nhân có nhớ',
      blocks: [
        { type: 'p', text: 'Có 3 chùm nho, mỗi chùm 26 quả. Em tính 26 × 3.' },
        {
          type: 'list',
          ordered: true,
          items: ['3 nhân 6 bằng 18, viết 8, nhớ 1.', '3 nhân 2 bằng 6, thêm 1 bằng 7, viết 7.'],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '26 × 3 = 78.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Nhân từ phải sang trái. Tích ở hàng đơn vị từ 10 trở lên thì viết chữ số đơn vị, nhớ số chục sang hàng chục.',
        },
      ],
    },
    {
      heading: 'Vì sao lại đúng?',
      blocks: [
        { type: 'p', text: 'Em tách 26 thành 20 và 6.' },
        {
          type: 'table',
          head: ['Phần', 'Phép tính'],
          rows: [
            ['6 đơn vị', '6 × 3 = 18'],
            ['2 chục', '20 × 3 = 60'],
            ['Cả hai phần', '60 + 18 = 78'],
          ],
        },
        { type: 'p', text: 'Số 18 có 1 chục. Vì thế em nhớ 1 sang hàng chục.' },
      ],
    },
    {
      heading: 'Nhân nhẩm',
      blocks: [
        { type: 'p', text: 'Em nhẩm 20 × 4: 2 chục nhân 4 bằng 8 chục.' },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '20 × 4 = 80.' },
      ],
    },
  ],
  explore: {
    title: 'Tách chục và đơn vị',
    instruction:
      'Mỗi ô là 1 đơn vị. Phần màu xanh là các chục, phần màu cam là các đơn vị. Em làm từng phần rồi chạm vào chữ số để viết kết quả. Chọn "Có nhớ" để thử phép nhân có nhớ.',
  },
  examples: [
    {
      problem: 'Có 3 bình, mỗi bình có 21 viên sỏi. Có tất cả bao nhiêu viên sỏi?',
      steps: [
        '21 viên được lấy 3 lần, em tính 21 × 3.',
        '3 nhân 1 bằng 3, viết 3.',
        '3 nhân 2 bằng 6, viết 6.',
      ],
      answer: '21 × 3 = 63. Có tất cả 63 viên sỏi.',
    },
    {
      problem: 'Đặt tính rồi tính: 17 × 3.',
      steps: ['3 nhân 7 bằng 21, viết 1, nhớ 2.', '3 nhân 1 bằng 3, thêm 2 bằng 5, viết 5.'],
      answer: '17 × 3 = 51.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính: 23 × 3 = ?',
      answer: 69,
      hints: ['Em bắt đầu từ hàng đơn vị: 3 nhân 3.', 'Rồi đến hàng chục: 3 nhân 2.'],
      solution: '3 nhân 3 bằng 9, viết 9. 3 nhân 2 bằng 6, viết 6. Vậy 23 × 3 = 69.',
    },
    {
      type: 'number',
      prompt: 'Tính: 16 × 2 = ?',
      answer: 32,
      hints: ['2 nhân 6 bằng 12. Em viết 2 và nhớ 1.', 'Đừng quên thêm 1 vào hàng chục.'],
      solution:
        '2 nhân 6 bằng 12, viết 2, nhớ 1. 2 nhân 1 bằng 2, thêm 1 bằng 3, viết 3. Vậy 16 × 2 = 32.',
    },
    {
      type: 'choice',
      prompt: '19 × 5 bằng bao nhiêu?',
      options: ['95', '59', '55', '45'],
      answer: 0,
      hints: ['5 nhân 9 bằng 45. Em viết 5 và nhớ 4.', 'Hàng chục: 5 nhân 1, rồi thêm 4.'],
      solution:
        '5 nhân 9 bằng 45, viết 5, nhớ 4. 5 nhân 1 bằng 5, thêm 4 bằng 9, viết 9. Vậy 19 × 5 = 95.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép nhân với kết quả của nó.',
      left: ['15 × 6', '21 × 4', '13 × 4', '11 × 8'],
      right: ['90', '84', '52', '88'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em đặt tính từng phép nhân ra giấy nháp.', 'Nhớ thêm số đã nhớ vào hàng chục.'],
      solution: '15 × 6 = 90. 21 × 4 = 84. 13 × 4 = 52. 11 × 8 = 88.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 26 × 3 theo đúng thứ tự.',
      items: [
        '3 nhân 2 bằng 6, thêm 1 bằng 7, viết 7',
        'Đặt tính: viết 3 thẳng cột với chữ số 6',
        '3 nhân 6 bằng 18, viết 8, nhớ 1',
      ],
      answer: [1, 2, 0],
      hints: ['Đặt tính trước khi tính.', 'Em nhân từ hàng đơn vị trước.'],
      solution:
        'Đặt tính, rồi nhân hàng đơn vị: 3 nhân 6 bằng 18, viết 8, nhớ 1. Sau đó nhân hàng chục: 3 nhân 2 bằng 6, thêm 1 bằng 7, viết 7.',
    },
    {
      type: 'choice',
      prompt: 'Tính nhẩm: 30 × 3 = ?',
      options: ['90', '33', '60', '9'],
      answer: 0,
      hints: ['30 là 3 chục.', '3 chục nhân 3 bằng mấy chục?'],
      solution: '3 chục nhân 3 bằng 9 chục. Vậy 30 × 3 = 90.',
    },
    {
      type: 'choice',
      prompt:
        'Nam tính 18 × 4 như sau: 4 nhân 8 bằng 32, viết 2, nhớ 3. 4 nhân 1 bằng 4, viết 4. Nam được 42. Nam làm đúng hay sai?',
      options: ['Sai, Nam quên thêm 3 đã nhớ', 'Đúng rồi', 'Sai, Nam phải viết 3 và nhớ 2'],
      answer: 0,
      hints: ['Em xem Nam làm gì với số 3 đã nhớ.'],
      solution: '4 nhân 1 bằng 4, phải thêm 3 bằng 7, viết 7. Vậy 18 × 4 = 72, không phải 42.',
    },
    {
      type: 'number',
      prompt: 'Mỗi hộp có 14 cái bánh. Hỏi 4 hộp như thế có tất cả bao nhiêu cái bánh?',
      answer: 56,
      hints: ['14 cái được lấy 4 lần, em làm phép nhân.', '4 nhân 4 bằng 16, viết 6, nhớ 1.'],
      solution:
        '14 × 4: 4 nhân 4 bằng 16, viết 6, nhớ 1. 4 nhân 1 bằng 4, thêm 1 bằng 5, viết 5. Có 56 cái bánh.',
    },
  ],
  takeaways: [
    'Đặt tính thẳng cột, nhân từ hàng đơn vị rồi đến hàng chục.',
    'Có nhớ: viết chữ số đơn vị, nhớ số chục, rồi thêm vào hàng chục.',
  ],
};
