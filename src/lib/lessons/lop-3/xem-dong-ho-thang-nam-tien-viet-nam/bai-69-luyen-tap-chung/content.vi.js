/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Xem đồng hồ, Tháng - năm, Tiền Việt Nam: đọc giờ đến từng phút và giờ kém, đổi đơn vị thời gian, xem lịch, tính tiền và giải bài toán thực tế.',
  intro:
    'Em đã biết xem đồng hồ đến từng phút, xem lịch và dùng tiền Việt Nam. Giờ em luyện tập để làm thật chắc nhé!',
  objectives: [
    'Đọc giờ đến từng phút và đọc giờ kém.',
    'Đổi giờ ra phút, năm ra tháng, tuần ra ngày, ngày ra giờ.',
    'Xem lịch để tìm thứ, tìm ngày và đếm số ngày.',
    'Tính tiền khi mua hàng và tính tiền trả lại.',
  ],
  sections: [
    {
      heading: 'Đồng hồ và thời gian',
      blocks: [
        {
          type: 'p',
          text: 'Kim ngắn chỉ giờ, kim dài chỉ phút. Mỗi vạch nhỏ là 1 phút.',
        },
        {
          type: 'p',
          text: 'Từ 35 phút trở đi, em có thể đọc giờ kém: 8 giờ 35 phút là 9 giờ kém 25 phút.',
        },
        {
          type: 'table',
          head: ['Đơn vị', 'Bằng'],
          rows: [
            ['1 giờ', '60 phút'],
            ['1 ngày', '24 giờ'],
            ['1 tuần', '7 ngày'],
            ['1 năm', '12 tháng'],
          ],
        },
      ],
    },
    {
      heading: 'Lịch và tiền',
      blocks: [
        {
          type: 'p',
          text: 'Tháng 4, 6, 9, 11 có 30 ngày. Tháng 2 có 28 hoặc 29 ngày. Các tháng còn lại có 31 ngày.',
        },
        {
          type: 'p',
          text: 'Trên lịch, các ngày cùng thứ cách nhau 7 ngày.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Tiền trả lại bằng tiền đã đưa trừ đi số tiền phải trả.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Mỗi câu em chạm vào đáp án đúng. Nếu sai, em đọc gợi ý rồi thử lại. Làm xong, em xem phần nào cần ôn và bấm "Làm bộ bài khác" để luyện tiếp.',
  },
  examples: [
    {
      problem: 'Bây giờ là 11 giờ 20 phút. 10 phút nữa là giờ ăn trưa. Giờ ăn trưa là mấy giờ?',
      steps: ['20 phút + 10 phút = 30 phút.', 'Giờ vẫn là 11 giờ.'],
      answer: 'Giờ ăn trưa là 11 giờ 30 phút.',
    },
    {
      problem: '1 năm 6 tháng bằng bao nhiêu tháng?',
      steps: ['1 năm = 12 tháng.', '12 + 6 = 18.'],
      answer: '1 năm 6 tháng = 18 tháng.',
    },
    {
      problem:
        'Mẹ mua một túi cam giá 15 000 đồng và một túi táo giá 20 000 đồng. Mẹ đưa tờ 50 000 đồng. Cô bán hàng trả lại mẹ bao nhiêu tiền?',
      steps: [
        'Mẹ phải trả: 15 000 + 20 000 = 35 000 (đồng).',
        'Cô trả lại: 50 000 − 35 000 = 15 000 (đồng).',
      ],
      answer: 'Cô bán hàng trả lại mẹ 15 000 đồng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Mai đến nhà Nam lúc 8 giờ 35 phút. Giờ đó còn gọi là mấy giờ?',
      options: ['9 giờ kém 25 phút', '8 giờ kém 25 phút', '9 giờ kém 35 phút', '9 giờ 25 phút'],
      answer: 0,
      hints: ['Còn bao nhiêu phút nữa thì đến 9 giờ?'],
      solution: '60 − 35 = 25. Còn 25 phút nữa là 9 giờ, nên 8 giờ 35 phút là 9 giờ kém 25 phút.',
    },
    {
      type: 'order',
      prompt: 'Xếp các việc thứ Bảy của Mai theo thứ tự thời gian, việc sớm nhất trước.',
      items: [
        'Đọc truyện lúc 9 giờ 17 phút tối',
        'Xếp giá sách lúc 7 giờ 55 phút sáng',
        'Làm bánh lúc 3 giờ 10 phút chiều',
        'Gấp quần áo lúc 5 giờ 25 phút chiều',
      ],
      answer: [1, 2, 3, 0],
      hints: ['Buổi sáng trước, rồi đến buổi chiều, cuối cùng là buổi tối.'],
      solution:
        'Sáng: xếp giá sách (7 giờ 55 phút). Chiều: làm bánh (3 giờ 10 phút), rồi gấp quần áo (5 giờ 25 phút). Tối: đọc truyện (9 giờ 17 phút).',
    },
    {
      type: 'number',
      prompt: '2 giờ = ? phút',
      answer: 120,
      unit: 'phút',
      hints: ['1 giờ = 60 phút.'],
      solution: '60 × 2 = 120. Vậy 2 giờ = 120 phút.',
    },
    {
      type: 'number',
      prompt: '1 giờ 30 phút = ? phút',
      answer: 90,
      unit: 'phút',
      hints: ['Đổi 1 giờ ra phút rồi cộng thêm 30 phút.'],
      solution: '1 giờ = 60 phút. 60 + 30 = 90. Vậy 1 giờ 30 phút = 90 phút.',
    },
    {
      type: 'number',
      prompt: '2 năm = ? tháng',
      answer: 24,
      unit: 'tháng',
      hints: ['1 năm = 12 tháng.'],
      solution: '12 × 2 = 24. Vậy 2 năm = 24 tháng.',
    },
    {
      type: 'number',
      prompt: '1 tuần 3 ngày = ? ngày',
      answer: 10,
      unit: 'ngày',
      hints: ['1 tuần = 7 ngày.'],
      solution: '7 + 3 = 10. Vậy 1 tuần 3 ngày = 10 ngày.',
    },
    {
      type: 'number',
      prompt: '3 ngày = ? giờ',
      answer: 72,
      unit: 'giờ',
      hints: ['1 ngày = 24 giờ.'],
      solution: '24 × 3 = 72. Vậy 3 ngày = 72 giờ.',
    },
    {
      type: 'multi',
      prompt: 'Ngày 1 tháng 12 là Chủ nhật. Chọn tất cả các ngày Chủ nhật của tháng 12.',
      options: ['Ngày 1', 'Ngày 8', 'Ngày 15', 'Ngày 22', 'Ngày 29', 'Ngày 14', 'Ngày 30'],
      answers: [0, 1, 2, 3, 4],
      hints: ['Các ngày cùng thứ cách nhau 7 ngày.', 'Tháng 12 có 31 ngày.'],
      solution:
        '1 + 7 = 8, 8 + 7 = 15, 15 + 7 = 22, 22 + 7 = 29. Các ngày Chủ nhật: 1, 8, 15, 22, 29.',
    },
    {
      type: 'number',
      prompt:
        'Mai học vẽ vào mỗi thứ Bảy trong tháng 12, bắt đầu từ thứ Bảy ngày 14. Tháng 12 có 31 ngày. Trong tháng 12, Mai học vẽ mấy buổi?',
      answer: 3,
      unit: 'buổi',
      hints: ['Các thứ Bảy cách nhau 7 ngày.', 'Đừng quên tháng 12 chỉ đến ngày 31.'],
      solution: 'Các thứ Bảy từ ngày 14: 14, 21, 28. Ngày 35 đã quá ngày 31. Mai học vẽ 3 buổi.',
    },
    {
      type: 'choice',
      prompt: 'Ngày 21 tháng 4 là Chủ nhật. Ngày 6 tháng 4 là thứ mấy?',
      options: ['Thứ Bảy', 'Chủ nhật', 'Thứ Sáu', 'Thứ Hai'],
      answer: 0,
      hints: ['Lùi 7 ngày, ngày đó vẫn là Chủ nhật: 21, 14, 7.'],
      solution: 'Ngày 21, 14, 7 đều là Chủ nhật. Ngày 6 là ngày liền trước ngày 7, nên là thứ Bảy.',
    },
    {
      type: 'number',
      prompt:
        'Nam mua 3 chiếc bút chì như nhau hết 9 000 đồng. Mỗi chiếc bút chì giá bao nhiêu đồng?',
      answer: 3000,
      unit: 'đồng',
      hints: ['3 chiếc như nhau: em chia đều số tiền cho 3.'],
      solution: '9 000 : 3 = 3 000. Mỗi chiếc bút chì giá 3 000 đồng.',
    },
    {
      type: 'number',
      prompt: 'Mi 6 tuổi 3 tháng. Còn mấy tháng nữa thì Mi tròn 7 tuổi?',
      answer: 9,
      unit: 'tháng',
      hints: ['Từ 6 tuổi đến 7 tuổi là 1 năm, tức là 12 tháng.'],
      solution: '1 năm = 12 tháng. 12 − 3 = 9. Còn 9 tháng nữa Mi tròn 7 tuổi.',
    },
    {
      type: 'number',
      prompt:
        'Rô-bốt đi xe buýt từ nhà đến trường mất 25 phút, từ trường về nhà cũng mất 25 phút. Cả đi và về Rô-bốt đi xe buýt hết bao nhiêu phút?',
      answer: 50,
      unit: 'phút',
      hints: ['Em cộng thời gian đi và thời gian về.'],
      solution: '25 + 25 = 50. Cả đi và về hết 50 phút.',
    },
  ],
  takeaways: [
    '8 giờ 35 phút là 9 giờ kém 25 phút.',
    '1 giờ = 60 phút, 1 ngày = 24 giờ, 1 tuần = 7 ngày, 1 năm = 12 tháng.',
    'Tiền trả lại bằng tiền đã đưa trừ đi số tiền phải trả.',
  ],
};
