const ZERO_TO_TEN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chung cuối năm lớp 1: các số đến 100, phép cộng, phép trừ, hình phẳng, hình khối, độ dài, giờ đúng và các ngày trong tuần.',
  intro:
    'Em đã học xong Toán lớp 1! Hôm nay em ôn lại tất cả: các số, phép tính, các hình, đo độ dài, xem giờ và xem lịch. Em làm bài ôn tập để biết mình đã vững phần nào nhé!',
  objectives: [
    'Đọc, viết, so sánh các số trong phạm vi 100.',
    'Cộng, trừ trong phạm vi 10 và cộng, trừ không nhớ trong phạm vi 100.',
    'Nhận ra các hình phẳng và hình khối đã học.',
    'Đo độ dài bằng xăng-ti-mét, xem giờ đúng và biết các ngày trong tuần.',
  ],
  sections: [
    {
      heading: 'Số và phép tính',
      blocks: [
        {
          type: 'p',
          text: 'Số 53 gồm 5 chục và 3 đơn vị, đọc là "năm mươi ba".',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cộng, trừ',
          text: 'Thêm vào, gộp lại: em làm phép cộng. Bớt đi, còn lại: em làm phép trừ.',
        },
        {
          type: 'p',
          text: 'Cộng, trừ số có hai chữ số: em tính đơn vị trước, rồi tính chục. 41 + 26 = 67.',
        },
      ],
    },
    {
      heading: 'Hình và đo lường',
      blocks: [
        {
          type: 'p',
          text: 'Hình phẳng: hình vuông, hình tròn, hình tam giác, hình chữ nhật. Hình khối: khối lập phương, khối hộp chữ nhật.',
        },
        {
          type: 'p',
          text: 'Đo độ dài bằng thước: đặt một đầu ở vạch 0. Đơn vị là xăng-ti-mét (cm).',
        },
        {
          type: 'p',
          text: 'Giờ đúng: kim dài chỉ số 12, kim ngắn chỉ số giờ. Một tuần lễ có 7 ngày.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập thông minh',
    instruction:
      'Mỗi bộ có 12 câu về số, phép tính, hình, độ dài, giờ và lịch. Đầu tiên em làm thử mỗi phần một câu. Phần nào em làm sai, bài sẽ hỏi thêm phần đó. Bản đồ kĩ năng cho em biết phần nào cần ôn lại.',
  },
  examples: [
    {
      problem:
        'Trong vườn có 46 cây rau cải và 32 cây rau muống. Trong vườn có tất cả bao nhiêu cây rau?',
      steps: [
        'Có tất cả là gộp lại: em làm phép cộng 46 + 32.',
        'Hàng đơn vị: 6 + 2 = 8. Hàng chục: 4 + 3 = 7.',
        '46 + 32 = 78.',
      ],
      answer: 'Trong vườn có tất cả 78 cây rau.',
    },
    {
      problem: 'Đồng hồ có kim ngắn chỉ số 9, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?',
      steps: ['Kim dài chỉ số 12: đó là giờ đúng.', 'Kim ngắn chỉ số 9.'],
      answer: 'Đồng hồ chỉ 9 giờ.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có mấy quả táo?',
      picture: 'apple',
      answer: 8,
      choices: ZERO_TO_TEN,
      hints: ['Chạm vào từng quả táo và đếm to.'],
      solution: 'Đếm từ một đến tám. Có 8 quả táo.',
    },
    {
      type: 'choice',
      prompt: '6 + 4 = ?',
      options: ['9', '10', '2'],
      answer: 1,
      hints: ['Từ 6 em đếm thêm 4.'],
      solution: 'Từ 6 đếm thêm 4: bảy, tám, chín, mười. Vậy 6 + 4 = 10.',
    },
    {
      type: 'choice',
      prompt: '9 − 7 = ?',
      options: ['1', '2', '3'],
      answer: 1,
      hints: ['Em nghĩ: 7 cộng mấy thì bằng 9?'],
      solution: '7 + 2 = 9, nên 9 − 7 = 2.',
    },
    {
      type: 'choice',
      prompt: 'Số "sáu mươi lăm" viết là gì?',
      options: ['56', '65', '605'],
      answer: 1,
      hints: ['"Sáu mươi" là 6 chục. "Lăm" là 5 đơn vị.'],
      solution: 'Sáu mươi lăm gồm 6 chục và 5 đơn vị, viết là 65.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 81 ... 79',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Em so sánh hàng chục trước.'],
      solution: 'Hàng chục: 8 chục lớn hơn 7 chục. Vậy 81 > 79.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự từ bé đến lớn.',
      items: ['48', '84', '8', '40'],
      answer: [2, 3, 0, 1],
      hints: [
        'Số có một chữ số bé hơn số có hai chữ số.',
        'Hai số cùng 4 chục thì xem hàng đơn vị.',
      ],
      solution: 'Từ bé đến lớn: 8, 40, 48, 84.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả.',
      left: ['52 + 7', '38 − 15', '60 + 30', '77 − 70'],
      right: ['59', '23', '90', '7', '53'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Tính đơn vị trước, rồi tính chục.'],
      solution: '52 + 7 = 59. 38 − 15 = 23. 60 + 30 = 90. 77 − 70 = 7.',
    },
    {
      type: 'choice',
      prompt: 'Cửa hàng có 58 quả bóng. Đã bán 35 quả bóng. Cửa hàng còn lại bao nhiêu quả bóng?',
      options: ['23', '93', '33'],
      answer: 0,
      hints: ['Đã bán là bớt đi: em làm phép trừ.', 'Tính 58 − 35.'],
      solution: '58 − 35 = 23. Cửa hàng còn lại 23 quả bóng.',
    },
    {
      type: 'choice',
      prompt: 'Lá cờ Tổ quốc có dạng hình gì?',
      options: ['Hình vuông', 'Hình chữ nhật', 'Hình tam giác'],
      answer: 1,
      hints: ['Lá cờ có 2 cạnh dài và 2 cạnh ngắn.'],
      solution: 'Lá cờ Tổ quốc có dạng hình chữ nhật.',
    },
    {
      type: 'choice',
      prompt: 'Con xúc xắc có dạng khối gì?',
      options: ['Khối lập phương', 'Khối hộp chữ nhật'],
      answer: 0,
      hints: ['Các mặt của con xúc xắc có to bằng nhau không?'],
      solution: 'Con xúc xắc có 6 mặt là hình vuông to bằng nhau. Nó có dạng khối lập phương.',
    },
    {
      type: 'choice',
      prompt: 'Thước kẻ dài 10 cm. Bút chì dài 8 cm. Vật nào ngắn hơn?',
      options: ['Thước kẻ', 'Bút chì'],
      answer: 1,
      hints: ['So sánh 10 và 8.'],
      solution: '8 cm < 10 cm. Bút chì ngắn hơn thước kẻ.',
    },
    {
      type: 'choice',
      prompt: 'Lúc 3 giờ, kim ngắn chỉ số mấy?',
      options: ['3', '6', '12'],
      answer: 0,
      hints: ['Lúc giờ đúng, kim dài chỉ số 12, còn kim ngắn chỉ số giờ.'],
      solution: 'Lúc 3 giờ, kim ngắn chỉ số 3, kim dài chỉ số 12.',
    },
    {
      type: 'choice',
      prompt: 'Hôm nay là thứ Hai. Hôm qua là thứ mấy?',
      options: ['Thứ Ba', 'Thứ Bảy', 'Chủ nhật'],
      answer: 2,
      hints: ['Hôm qua là ngày ngay trước hôm nay.', 'Ngày cuối cùng của tuần trước là ngày nào?'],
      solution: 'Ngay trước thứ Hai là Chủ nhật. Hôm qua là Chủ nhật.',
    },
  ],
  takeaways: [
    'Em đọc, viết, so sánh được các số đến 100.',
    'Em cộng, trừ trong phạm vi 10 và cộng, trừ không nhớ trong phạm vi 100.',
    'Em nhận ra các hình, đo được độ dài, xem được giờ đúng và các ngày trong tuần.',
  ],
};
