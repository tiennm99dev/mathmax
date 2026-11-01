/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: phép cộng, phép trừ có nhớ trong phạm vi 100, tính từ trái sang phải, so sánh kết quả phép trừ và giải bài toán có lời văn.',
  intro:
    'Em đã biết cộng, trừ có nhớ trong phạm vi 100. Hôm nay em luyện tập cả hai phép tính và giải bài toán nhé!',
  objectives: [
    'Đặt tính rồi tính phép trừ có nhớ trong phạm vi 100.',
    'Tính từ trái sang phải khi có hai dấu phép tính.',
    'So sánh kết quả phép trừ với một số, tìm chữ số thích hợp.',
    'Giải và trình bày bài toán có lời văn bằng phép cộng, phép trừ có nhớ.',
  ],
  sections: [
    {
      heading: 'Nhớ lại cách trừ có nhớ',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Trừ cho số có một chữ số',
          text: '43 − 8: 3 không trừ được 8, lấy 13 trừ 8 bằng 5, viết 5, nhớ 1. 4 trừ 1 bằng 3, viết 3. Vậy 43 − 8 = 35.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Trừ cho số có hai chữ số',
          text: '70 − 13: 0 không trừ được 3, lấy 10 trừ 3 bằng 7, viết 7, nhớ 1. 1 thêm 1 bằng 2, 7 trừ 2 bằng 5, viết 5. Vậy 70 − 13 = 57.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đừng quên nhớ 1',
          text: 'Nếu quên nhớ 1, em sẽ viết sai 70 − 13 = 67. Hãy kiểm tra hàng chục nhé.',
        },
      ],
    },
    {
      heading: 'Tính từ trái sang phải',
      blocks: [
        {
          type: 'p',
          text: 'Có hai dấu phép tính, em tính từ trái sang phải. 38 + 52 − 40: em tính 38 + 52 = 90, rồi 90 − 40 = 50.',
        },
      ],
    },
    {
      heading: 'So sánh và giải toán',
      blocks: [
        {
          type: 'p',
          text: 'Để so sánh, em tính kết quả trước. 70 − 9 = 61. Muốn 61 lớn hơn 6□, ô trống chỉ điền được chữ số 0, vì 61 > 60.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Trình bày bài giải',
          text: 'Bài giải có câu lời giải, phép tính kèm đơn vị trong ngoặc, và đáp số. Ví dụ: Số quả cam còn lại là: 41 − 6 = 35 (quả). Đáp số: 35 quả cam.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Mỗi lượt có 12 câu. Em chạm vào đáp án đúng. Sai lần đầu, em được xem gợi ý và chọn lại. Cuối lượt, em xem phần nào cần ôn và chạm "Làm bộ bài khác".',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 62 − 28.',
      steps: [
        'Viết 28 dưới 62, thẳng cột.',
        '2 không trừ được 8, lấy 12 trừ 8 bằng 4, viết 4, nhớ 1.',
        '2 thêm 1 bằng 3, 6 trừ 3 bằng 3, viết 3.',
      ],
      answer: '62 − 28 = 34.',
    },
    {
      problem: 'Tính: 80 − 30 − 17.',
      steps: [
        'Em tính từ trái sang phải.',
        '80 − 30 = 50.',
        '50 − 17: 0 không trừ được 7, lấy 10 trừ 7 bằng 3, viết 3, nhớ 1. 1 thêm 1 bằng 2, 5 trừ 2 bằng 3, viết 3. Được 33.',
      ],
      answer: '80 − 30 − 17 = 33.',
    },
    {
      problem: 'Chọn chữ số thích hợp cho ô trống: 42 − 4 < 3□.',
      steps: [
        'Em tính trước: 42 − 4 = 38.',
        '38 phải bé hơn số 3□.',
        'Chỉ có 39 lớn hơn 38, nên chữ số cần chọn là 9.',
      ],
      answer: 'Chữ số 9, vì 38 < 39.',
    },
    {
      problem: 'Rổ có 41 quả cam. Mẹ biếu bà 6 quả. Trong rổ còn lại bao nhiêu quả cam?',
      steps: [
        'Tìm phần còn lại, em làm phép trừ: 41 − 6.',
        '1 không trừ được 6, lấy 11 trừ 6 bằng 5, viết 5, nhớ 1. 4 trừ 1 bằng 3, viết 3.',
        'Số quả cam còn lại là: 41 − 6 = 35 (quả).',
      ],
      answer: 'Đáp số: 35 quả cam.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '34 − 7 = ?',
      options: ['26', '27', '37'],
      answer: 1,
      hints: ['4 không trừ được 7. Em lấy 14 trừ 7.', 'Hàng chục: 3 trừ 1 đã nhớ.'],
      solution:
        '4 không trừ được 7, lấy 14 trừ 7 bằng 7, viết 7, nhớ 1. 3 trừ 1 bằng 2, viết 2. Vậy 34 − 7 = 27.',
    },
    {
      type: 'choice',
      prompt: '60 − 12 = ?',
      options: ['47', '48', '58'],
      answer: 1,
      hints: ['0 không trừ được 2. Em lấy 10 trừ 2.', 'Hàng chục: 1 thêm 1 bằng 2.'],
      solution:
        '0 không trừ được 2, lấy 10 trừ 2 bằng 8, viết 8, nhớ 1. 1 thêm 1 bằng 2, 6 trừ 2 bằng 4, viết 4. Vậy 60 − 12 = 48.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép trừ với kết quả của nó.',
      left: ['45 − 8', '51 − 19', '73 − 26', '80 − 34'],
      right: ['37', '32', '47', '46', '57'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Hàng đơn vị không trừ được thì mượn 1 chục.', 'Rồi nhớ 1 ở hàng chục.'],
      solution:
        '45 − 8 = 37 (15 − 8 = 7; 4 − 1 = 3). 51 − 19 = 32 (11 − 9 = 2; 5 − 2 = 3). 73 − 26 = 47 (13 − 6 = 7; 7 − 3 = 4). 80 − 34 = 46 (10 − 4 = 6; 8 − 4 = 4).',
    },
    {
      type: 'choice',
      prompt: 'Em đi theo các mũi tên: 88, cộng 4, trừ 7, trừ 26. Số cuối cùng là số nào?',
      options: ['58', '59', '69'],
      answer: 1,
      hints: ['Em tính lần lượt: 88 + 4 trước.', 'Sau hai bước đầu, em được 85. Em tính 85 − 26.'],
      solution: '88 + 4 = 92. 92 − 7 = 85. 85 − 26 = 59. Số cuối cùng là 59.',
    },
    {
      type: 'choice',
      prompt: '25 + 65 − 30 = ?',
      options: ['50', '60', '70'],
      answer: 1,
      hints: ['Em tính từ trái sang phải: 25 + 65 trước.'],
      solution: '25 + 65 = 90. 90 − 30 = 60. Vậy 25 + 65 − 30 = 60.',
    },
    {
      type: 'choice',
      prompt: '90 − 40 − 26 = ?',
      options: ['14', '24', '34'],
      answer: 1,
      hints: ['Em tính từ trái sang phải: 90 − 40 trước.', '0 không trừ được 6. Em lấy 10 trừ 6.'],
      solution: '90 − 40 = 50. 50 − 26 = 24. Vậy 90 − 40 − 26 = 24.',
    },
    {
      type: 'choice',
      prompt: 'Chọn chữ số thích hợp cho ô trống: 60 − 9 > 5□',
      options: ['0', '1', '2'],
      answer: 0,
      hints: ['Em tính 60 − 9 trước.', 'Số 5□ phải bé hơn kết quả đó.'],
      solution: '60 − 9 = 51. 51 > 50, còn 51 không lớn hơn 51 và 52. Chữ số cần chọn là 0.',
    },
    {
      type: 'choice',
      prompt:
        'Nam có 15 nhãn vở, Mai có 20 nhãn vở. Rô-bốt có nhiều hơn Nam nhưng ít hơn Mai. Phép trừ nào cho biết số nhãn vở của Rô-bốt?',
      options: ['32 − 17', '62 − 42', '51 − 33'],
      answer: 2,
      hints: ['Em tính từng phép trừ.', 'Tìm số lớn hơn 15 và bé hơn 20.'],
      solution:
        '32 − 17 = 15. 62 − 42 = 20. 51 − 33 = 18. Số 18 lớn hơn 15 và bé hơn 20, nên chọn 51 − 33.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép trừ theo kết quả từ bé đến lớn.',
      items: ['71 − 28', '53 − 17', '90 − 46'],
      answer: [1, 0, 2],
      hints: ['Tính kết quả từng phép trừ trước.', '71 − 28: lấy 11 trừ 8.'],
      solution:
        '53 − 17 = 36. 71 − 28 = 43. 90 − 46 = 44. Từ bé đến lớn: 53 − 17, 71 − 28, 90 − 46.',
    },
    {
      type: 'match',
      prompt:
        'Có ba thẻ số: 3, 3, 8. Em lấy hai thẻ ghép thành số có hai chữ số. Nối mỗi dòng với số đúng.',
      left: ['Số bé nhất', 'Số lớn nhất'],
      right: ['33', '38', '83', '88'],
      pairs: [
        [0, 0],
        [1, 2],
      ],
      hints: ['Chỉ có một thẻ số 8.', 'Em viết ra các số ghép được, rồi so sánh chữ số hàng chục.'],
      solution:
        'Em ghép được 33, 38 và 83. Chỉ có một thẻ số 8, nên không có 88. Số bé nhất là 33, số lớn nhất là 83.',
    },
    {
      type: 'choice',
      prompt: 'Chú ong bay qua ba bông hoa ghi số 5, 61 và 8. Tổng ba số đó là bao nhiêu?',
      options: ['64', '74', '84'],
      answer: 1,
      hints: ['Em tính từ trái sang phải: 5 + 61 trước.', '6 + 8 = 14. Viết 4, nhớ 1.'],
      solution: '5 + 61 = 66. 66 + 8 = 74. Vậy tổng ba số là 74.',
    },
    {
      type: 'count',
      prompt: 'Rổ có 31 quả táo. Mẹ lấy đi 8 quả. Hình vẽ số táo còn lại. Còn lại mấy quả táo?',
      picture: 'apple',
      answer: 23,
      choices: [22, 23, 24, 33],
      hints: ['Em tính 31 − 8.', '1 không trừ được 8. Em lấy 11 trừ 8.'],
      solution:
        '1 không trừ được 8, lấy 11 trừ 8 bằng 3, viết 3, nhớ 1. 3 trừ 1 bằng 2, viết 2. 31 − 8 = 23. Còn lại 23 quả táo.',
    },
    {
      type: 'choice',
      prompt: 'Cầu thang có 32 bậc. Sóc đã leo được 9 bậc. Sóc còn phải leo bao nhiêu bậc nữa?',
      options: ['22', '23', '33'],
      answer: 1,
      hints: ['Tìm phần còn lại, em làm phép trừ: 32 − 9.', '2 không trừ được 9. Em lấy 12 trừ 9.'],
      solution: 'Số bậc sóc còn phải leo là: 32 − 9 = 23 (bậc). Đáp số: 23 bậc.',
    },
    {
      type: 'choice',
      prompt:
        'Cây tre thứ nhất có 43 đốt. Cây tre thứ hai có 38 đốt. Hai cây có tất cả bao nhiêu đốt tre?',
      options: ['71', '81', '82'],
      answer: 1,
      hints: ['Tìm tất cả, em làm phép cộng: 43 + 38.', '3 + 8 = 11. Viết 1, nhớ 1.'],
      solution: 'Số đốt tre có tất cả là: 43 + 38 = 81 (đốt). Đáp số: 81 đốt tre.',
    },
  ],
  takeaways: [
    'Trừ có nhớ: hàng đơn vị không trừ được thì mượn 1 chục, viết kết quả, nhớ 1 ở hàng chục.',
    'Có hai dấu phép tính: tính từ trái sang phải.',
    'So sánh: tính kết quả trước, rồi mới so sánh hoặc chọn chữ số.',
    'Bài giải có câu lời giải, phép tính kèm đơn vị và đáp số.',
  ],
};
