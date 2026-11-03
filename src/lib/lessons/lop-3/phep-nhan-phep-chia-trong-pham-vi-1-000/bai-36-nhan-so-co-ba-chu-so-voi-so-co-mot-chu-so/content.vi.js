/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đặt tính rồi tính phép nhân số có ba chữ số với số có một chữ số, không nhớ và có nhớ qua nhiều hàng; nhân nhẩm số tròn trăm, tròn chục.',
  intro:
    'Mỗi thùng có 127 quyển vở. 3 thùng như thế có bao nhiêu quyển vở? Em đặt tính rồi nhân từng hàng, từ phải sang trái nhé!',
  objectives: [
    'Đặt tính và nhân số có ba chữ số với số có một chữ số.',
    'Biết nhân có nhớ, kể cả nhớ qua hai hàng.',
    'Nhân nhẩm số tròn trăm, tròn chục với số có một chữ số.',
  ],
  sections: [
    {
      heading: 'Nhân không nhớ',
      blocks: [
        { type: 'p', text: 'Em tính 312 × 2.' },
        {
          type: 'p',
          text: 'Em đặt tính: viết 312, viết 2 thẳng cột với chữ số 2 ở hàng đơn vị, viết dấu nhân, kẻ vạch ngang.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Hàng đơn vị: 2 nhân 2 bằng 4, viết 4.',
            'Hàng chục: 2 nhân 1 bằng 2, viết 2.',
            'Hàng trăm: 2 nhân 3 bằng 6, viết 6.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '312 × 2 = 624.' },
      ],
    },
    {
      heading: 'Nhân có nhớ một lần',
      blocks: [
        { type: 'p', text: 'Mỗi thùng có 127 quyển vở. Em tính 127 × 3.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '3 nhân 7 bằng 21, viết 1, nhớ 2.',
            '3 nhân 2 bằng 6, thêm 2 bằng 8, viết 8.',
            '3 nhân 1 bằng 3, viết 3.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '127 × 3 = 381.' },
      ],
    },
    {
      heading: 'Nhân có nhớ hai lần',
      blocks: [
        { type: 'p', text: 'Em tính 164 × 3. Lần này em phải nhớ ở cả hàng đơn vị và hàng chục.' },
        {
          type: 'list',
          ordered: true,
          items: [
            '3 nhân 4 bằng 12, viết 2, nhớ 1.',
            '3 nhân 6 bằng 18, thêm 1 bằng 19, viết 9, nhớ 1.',
            '3 nhân 1 bằng 3, thêm 1 bằng 4, viết 4.',
          ],
        },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '164 × 3 = 492.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Em nhân từ phải sang trái. Sau mỗi hàng, em cộng thêm số đã nhớ vào hàng tiếp theo.',
        },
      ],
    },
    {
      heading: 'Nhân nhẩm',
      blocks: [
        { type: 'p', text: 'Số tròn trăm: 200 × 4. Em nhẩm 2 trăm × 4 = 8 trăm.' },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '200 × 4 = 800.' },
        { type: 'p', text: 'Số tròn chục: 120 × 2. Em nhẩm 12 chục × 2 = 24 chục.' },
        { type: 'callout', tone: 'note', title: 'Kết quả', text: '120 × 2 = 240.' },
      ],
    },
  ],
  explore: {
    title: 'Nhân từng hàng',
    instruction:
      'Mỗi hàng khối là một lần lấy số đó. Em nhân từ hàng đơn vị, chạm vào chữ số để viết. Số nhớ hiện màu đỏ ở hàng tiếp theo. Chọn "Nhớ một lần" hoặc "Nhớ hai lần" để thử phép khó hơn.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 205 × 4.',
      steps: [
        '4 nhân 5 bằng 20, viết 0, nhớ 2.',
        '4 nhân 0 bằng 0, thêm 2 bằng 2, viết 2.',
        '4 nhân 2 bằng 8, viết 8.',
      ],
      answer: '205 × 4 = 820.',
    },
    {
      problem:
        'Gấu có 3 hũ mật ong, mỗi hũ có 250 ml. Gấu dùng 525 ml mật ong để làm bánh. Hỏi gấu còn lại bao nhiêu mi-li-lít mật ong?',
      steps: [
        'Em tìm số mật ong ở 3 hũ: 250 × 3 = 750 (ml).',
        'Em tìm số mật ong còn lại: 750 − 525 = 225 (ml).',
      ],
      answer: 'Gấu còn lại 225 ml mật ong.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính: 423 × 2 = ?',
      answer: 846,
      hints: ['Phép nhân này không có nhớ.', 'Em nhân 2 với 3, rồi với 2, rồi với 4.'],
      solution:
        '2 nhân 3 bằng 6, viết 6. 2 nhân 2 bằng 4, viết 4. 2 nhân 4 bằng 8, viết 8. Vậy 423 × 2 = 846.',
    },
    {
      type: 'choice',
      prompt: '245 × 2 bằng bao nhiêu?',
      options: ['490', '480', '590', '409'],
      answer: 0,
      hints: ['2 nhân 5 bằng 10. Em viết 0, nhớ 1.', 'Hàng chục: 2 nhân 4, rồi thêm 1 đã nhớ.'],
      solution:
        '2 nhân 5 bằng 10, viết 0, nhớ 1. 2 nhân 4 bằng 8, thêm 1 bằng 9, viết 9. 2 nhân 2 bằng 4, viết 4. Vậy 245 × 2 = 490.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép nhân với tích của nó.',
      left: ['209 × 4', '253 × 3', '114 × 7', '107 × 9'],
      right: ['836', '759', '798', '963'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em đặt tính từng phép nhân ra giấy nháp.', 'Nhớ thêm số đã nhớ vào hàng tiếp theo.'],
      solution: '209 × 4 = 836. 253 × 3 = 759. 114 × 7 = 798. 107 × 9 = 963.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước tính 136 × 2 theo đúng thứ tự.',
      items: [
        '2 nhân 3 bằng 6, thêm 1 bằng 7, viết 7',
        '2 nhân 1 bằng 2, viết 2',
        '2 nhân 6 bằng 12, viết 2, nhớ 1',
      ],
      answer: [2, 0, 1],
      hints: ['Em nhân từ hàng đơn vị trước.', 'Hàng trăm làm sau cùng.'],
      solution:
        '2 nhân 6 bằng 12, viết 2, nhớ 1. 2 nhân 3 bằng 6, thêm 1 bằng 7, viết 7. 2 nhân 1 bằng 2, viết 2. Vậy 136 × 2 = 272.',
    },
    {
      type: 'choice',
      prompt: 'Tính nhẩm: 300 × 3 = ?',
      options: ['900', '600', '303', '90'],
      answer: 0,
      hints: ['300 là 3 trăm.', '3 trăm nhân 3 bằng mấy trăm?'],
      solution: '3 trăm × 3 = 9 trăm. Vậy 300 × 3 = 900.',
    },
    {
      type: 'choice',
      prompt: 'Tính nhẩm: 340 × 2 = ?',
      options: ['680', '342', '68', '640'],
      answer: 0,
      hints: ['340 là 34 chục.', '34 chục nhân 2 bằng mấy chục?'],
      solution: '34 chục × 2 = 68 chục. Vậy 340 × 2 = 680.',
    },
    {
      type: 'choice',
      prompt:
        'Nam tính 146 × 3 như sau: 3 nhân 6 bằng 18, viết 8, nhớ 1. 3 nhân 4 bằng 12, thêm 1 bằng 13, viết 3, nhớ 1. 3 nhân 1 bằng 3, viết 3. Nam được 338. Nam làm đúng hay sai?',
      options: ['Sai, Nam quên thêm 1 ở hàng trăm', 'Đúng rồi', 'Sai, Nam phải viết 8 ở hàng chục'],
      answer: 0,
      hints: ['Em xem Nam làm gì với số 1 nhớ từ hàng chục.'],
      solution: '3 nhân 1 bằng 3, phải thêm 1 bằng 4, viết 4. Vậy 146 × 3 = 438, không phải 338.',
    },
    {
      type: 'number',
      prompt:
        'Một chú hải âu 118 ngày tuổi. Số ngày tuổi của mèo gấp 3 lần của hải âu. Mèo bao nhiêu ngày tuổi?',
      answer: 354,
      hints: ['Gấp 3 lần thì em làm phép nhân.', '3 nhân 8 bằng 24, viết 4, nhớ 2.'],
      solution:
        '118 × 3: 3 nhân 8 bằng 24, viết 4, nhớ 2. 3 nhân 1 bằng 3, thêm 2 bằng 5, viết 5. 3 nhân 1 bằng 3, viết 3. Mèo 354 ngày tuổi.',
    },
    {
      type: 'number',
      prompt:
        'Mỗi chiếc chén cân nặng 128 g. Ấm trà nặng bằng 3 chiếc chén. Ấm trà nặng bao nhiêu gam?',
      answer: 384,
      unit: 'g',
      hints: ['128 g được lấy 3 lần.', '3 nhân 8 bằng 24, viết 4, nhớ 2.'],
      solution:
        '128 × 3: 3 nhân 8 bằng 24, viết 4, nhớ 2. 3 nhân 2 bằng 6, thêm 2 bằng 8, viết 8. 3 nhân 1 bằng 3, viết 3. Ấm trà nặng 384 g.',
    },
    {
      type: 'number',
      prompt:
        'Trên đảo có 420 con cừu. Mỗi năm đàn cừu tăng thêm 180 con. Sau 2 năm trên đảo có bao nhiêu con cừu?',
      answer: 780,
      hints: ['Trước hết em tính số cừu tăng thêm trong 2 năm.', 'Rồi em cộng với số cừu lúc đầu.'],
      solution: 'Số cừu tăng thêm: 180 × 2 = 360 (con). Số cừu sau 2 năm: 420 + 360 = 780 (con).',
    },
  ],
  takeaways: [
    'Đặt tính thẳng cột, nhân từ hàng đơn vị đến hàng trăm.',
    'Có nhớ: viết chữ số đơn vị, nhớ số chục, rồi thêm vào hàng tiếp theo.',
    'Nhân nhẩm: 2 trăm × 4 = 8 trăm.',
  ],
};
