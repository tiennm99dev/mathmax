/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành xem giờ trong các việc hằng ngày, tính giờ xong và thời gian làm việc; tra lịch để tìm ngày, tìm thứ và đếm số ngày.',
  intro:
    'Một ngày Chủ nhật ở nhà Mai: mấy giờ cơm chín, mấy giờ xem bóng đá? Còn trại hè thì đi mấy ngày? Em xem đồng hồ, xem lịch để trả lời nhé!',
  objectives: [
    'Xem giờ và tính giờ xong của một việc trong ngày.',
    'Tính thời gian làm một việc theo phút.',
    'Tra lịch để biết một ngày là thứ mấy và đếm số ngày.',
  ],
  sections: [
    {
      heading: 'Xem giờ trong ngày',
      blocks: [
        {
          type: 'p',
          text: 'Biết lúc bắt đầu và làm trong bao lâu, em cộng thêm số phút để biết lúc xong.',
        },
        {
          type: 'table',
          head: ['Việc', 'Bắt đầu', 'Làm trong', 'Xong lúc'],
          rows: [
            ['Nấu cơm', '10 giờ 10 phút', '40 phút', '10 giờ 50 phút'],
            ['Trộn rau', '10 giờ 50 phút', '7 phút', '10 giờ 57 phút'],
          ],
        },
        {
          type: 'p',
          text: 'Biết lúc bắt đầu và lúc xong trong cùng một giờ, em lấy số phút lúc xong trừ số phút lúc bắt đầu. Nướng gà từ 10 giờ 15 phút đến 10 giờ 45 phút: 45 − 15 = 30 phút.',
        },
      ],
    },
    {
      heading: 'Xem lịch',
      blocks: [
        {
          type: 'p',
          text: 'Các ngày cùng một thứ nằm thẳng một cột. Hai ngày liền nhau trong cột cách nhau 7 ngày.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đếm số ngày',
          text: 'Trại hè từ ngày 24 đến hết ngày 30 tháng 6. Em đếm cả ngày đầu và ngày cuối: 24, 25, 26, 27, 28, 29, 30. Có 7 ngày.',
        },
      ],
    },
    {
      heading: 'Em tự làm',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: lập thời gian biểu ngày Chủ nhật và lịch sinh nhật của cả nhà.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chuẩn bị: một đồng hồ có kim, tờ lịch năm nay, giấy và bút màu.',
            'Ghi giờ em thức dậy, ăn sáng, học bài, đi chơi vào ngày Chủ nhật. Xem đồng hồ thật để ghi đúng đến từng phút.',
            'Tính xem mỗi việc em làm trong bao nhiêu phút.',
            'Hỏi ngày sinh của bố, mẹ, anh chị em. Tìm các ngày đó trên lịch và tô màu.',
            'Ghi thứ của mỗi ngày sinh nhật. Đếm xem còn mấy ngày nữa đến sinh nhật gần nhất.',
          ],
        },
        {
          type: 'p',
          text: 'Kể cho cả lớp: việc nào em làm lâu nhất? Sinh nhật của ai rơi vào Chủ nhật?',
        },
      ],
    },
  ],
  explore: {
    title: 'Thử thách tra lịch',
    instruction:
      'Sinh nhật em: chọn tháng, chạm vào ngày sinh nhật rồi chọn thứ. Thử thách tra lịch: đọc đề, chạm vào ngày đúng hoặc chọn thứ đúng. Đúng ngay lần đầu, em được một sao.',
  },
  examples: [
    {
      problem:
        'Nam chuẩn bị đồ đi trại từ 9 giờ 5 phút đến 9 giờ 35 phút. Nam chuẩn bị trong bao nhiêu phút?',
      steps: ['Giờ không đổi, vẫn là 9 giờ.', '35 − 5 = 30.'],
      answer: 'Nam chuẩn bị trong 30 phút.',
    },
    {
      problem:
        'Ngày 1 tháng 6 là thứ Bảy. Hạn đăng kí trại hè là thứ Sáu đầu tiên của tháng 6. Đó là ngày nào?',
      steps: [
        'Ngày 1 là thứ Bảy, ngày 2 là Chủ nhật, ngày 3 là thứ Hai.',
        'Đếm tiếp: ngày 4 thứ Ba, ngày 5 thứ Tư, ngày 6 thứ Năm, ngày 7 thứ Sáu.',
      ],
      answer: 'Hạn đăng kí là ngày 7 tháng 6.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Mẹ cắm nồi cơm lúc 10 giờ 10 phút. Cơm nấu trong 40 phút. Mấy giờ cơm chín?',
      options: ['10 giờ 50 phút', '10 giờ 40 phút', '11 giờ 10 phút', '10 giờ 30 phút'],
      answer: 0,
      hints: ['Em cộng thêm 40 phút vào số phút lúc bắt đầu.'],
      solution: '10 phút + 40 phút = 50 phút. Cơm chín lúc 10 giờ 50 phút.',
    },
    {
      type: 'number',
      prompt: 'Bố nướng gà từ 10 giờ 15 phút đến 10 giờ 45 phút. Bố nướng gà trong bao nhiêu phút?',
      answer: 30,
      unit: 'phút',
      hints: ['Giờ không đổi. Em lấy số phút lúc xong trừ số phút lúc bắt đầu.'],
      solution: '45 − 15 = 30. Bố nướng gà trong 30 phút.',
    },
    {
      type: 'number',
      prompt:
        'Nam làm bánh quy từ 4 giờ chiều đến 4 giờ 55 phút chiều. Nam làm bánh trong bao nhiêu phút?',
      answer: 55,
      unit: 'phút',
      hints: ['4 giờ là 4 giờ 0 phút.'],
      solution: '55 − 0 = 55. Nam làm bánh trong 55 phút.',
    },
    {
      type: 'order',
      prompt: 'Xếp các việc buổi chiều của nhà Mai theo thứ tự thời gian, việc sớm nhất trước.',
      items: [
        'Xem bóng đá từ 16 giờ đến 17 giờ 45 phút',
        'Nấu cơm tối, xong trước 18 giờ 30 phút',
        'Dọn nhà, xong trước 15 giờ 45 phút',
      ],
      answer: [2, 0, 1],
      hints: ['Em so sánh số giờ: 15 giờ sớm hơn 16 giờ, 16 giờ sớm hơn 18 giờ.'],
      solution:
        'Dọn nhà xong trước 15 giờ 45 phút, rồi xem bóng đá từ 16 giờ, cuối cùng nấu cơm tối xong trước 18 giờ 30 phút.',
    },
    {
      type: 'number',
      prompt: 'Trại hè diễn ra từ ngày 24 đến hết ngày 30 tháng 6. Trại hè kéo dài mấy ngày?',
      answer: 7,
      unit: 'ngày',
      hints: ['Em đếm cả ngày đầu và ngày cuối.', '30 − 24 = 6, rồi cộng thêm ngày đầu.'],
      solution: 'Các ngày 24, 25, 26, 27, 28, 29, 30. Trại hè kéo dài 7 ngày.',
    },
    {
      type: 'multi',
      prompt: 'Ngày 1 tháng 5 là thứ Tư. Chọn tất cả các ngày Chủ nhật của tháng 5.',
      options: ['Ngày 5', 'Ngày 12', 'Ngày 19', 'Ngày 26', 'Ngày 6', 'Ngày 20'],
      answers: [0, 1, 2, 3],
      hints: [
        'Thứ Tư, thứ Năm, thứ Sáu, thứ Bảy rồi đến Chủ nhật.',
        'Tìm được Chủ nhật đầu tiên, em cộng thêm 7 để có Chủ nhật tiếp theo.',
      ],
      solution:
        'Ngày 1 thứ Tư, ngày 2 thứ Năm, ngày 3 thứ Sáu, ngày 4 thứ Bảy, ngày 5 Chủ nhật. Các Chủ nhật: 5, 12, 19, 26.',
    },
    {
      type: 'choice',
      prompt:
        'Danh sách trại hè công bố vào thứ Hai liền sau ngày 7 tháng 6. Ngày 7 tháng 6 là thứ Sáu. Danh sách công bố ngày nào?',
      options: ['Ngày 10 tháng 6', 'Ngày 8 tháng 6', 'Ngày 9 tháng 6', 'Ngày 14 tháng 6'],
      answer: 0,
      hints: ['Đếm tiếp từ thứ Sáu: thứ Bảy, Chủ nhật, rồi thứ Hai.'],
      solution:
        'Ngày 8 thứ Bảy, ngày 9 Chủ nhật, ngày 10 thứ Hai. Danh sách công bố ngày 10 tháng 6.',
    },
  ],
  takeaways: [
    'Lúc xong = lúc bắt đầu thêm số phút làm việc.',
    'Trong cùng một giờ: thời gian làm = số phút lúc xong trừ số phút lúc bắt đầu.',
    'Trên lịch, các ngày cùng thứ nằm một cột, cách nhau 7 ngày.',
  ],
};
