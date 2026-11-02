const WORDS = ['Chắc chắn', 'Có thể', 'Không thể'];

/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Dùng các từ chắc chắn, có thể, không thể để nói về khả năng xảy ra của một việc, như lấy một quả bóng trong hộp.',
  intro:
    'Mai, Việt và Nam mỗi bạn lấy một quả bóng trong hộp để tặng Rô-bốt. Rô-bốt thích bóng xanh. Bạn nào chắc chắn lấy được bóng xanh?',
  objectives: [
    'Hiểu nghĩa của các từ chắc chắn, có thể, không thể.',
    'Dùng ba từ đó để nói về khả năng xảy ra của một việc.',
    'Giải thích được vì sao em chọn từ đó.',
  ],
  sections: [
    {
      heading: 'Ba hộp bóng',
      blocks: [
        {
          type: 'table',
          head: ['Bạn', 'Trong hộp có', 'Lấy được bóng xanh'],
          rows: [
            ['Mai', 'chỉ có bóng xanh', 'chắc chắn'],
            ['Việt', 'bóng xanh và bóng đỏ', 'có thể'],
            ['Nam', 'bóng đỏ và bóng vàng', 'không thể'],
          ],
        },
      ],
    },
    {
      heading: 'Nghĩa của ba từ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chắc chắn',
          text: 'Việc đó luôn luôn xảy ra.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Có thể',
          text: 'Việc đó lúc thì xảy ra, lúc thì không.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Không thể',
          text: 'Việc đó không bao giờ xảy ra.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hộp bóc thăm',
    instruction:
      'Chạm vào quả bóng để đổi màu, hoặc chọn hộp của một bạn. Chọn màu bóng em muốn lấy rồi đoán: chắc chắn, có thể hay không thể. Đoán đúng, em lấy thử nhiều lần để kiểm tra.',
  },
  examples: [
    {
      problem:
        'Hộp có 4 viên kẹo cam và 1 viên kẹo chanh. Lấy một viên. Em nói về việc lấy được kẹo chanh và kẹo dâu thế nào?',
      steps: [
        'Trong hộp có kẹo chanh, nhưng cũng có kẹo cam.',
        'Em có thể lấy được kẹo chanh.',
        'Trong hộp không có kẹo dâu.',
      ],
      answer: 'Có thể lấy được kẹo chanh. Không thể lấy được kẹo dâu.',
    },
    {
      problem: 'Có 3 tấm thẻ ghi số 1, 2, 3. Rút một thẻ. Số trên thẻ nhỏ hơn 4 là việc thế nào?',
      steps: ['Các thẻ ghi 1, 2, 3.', 'Thẻ nào cũng có số nhỏ hơn 4.'],
      answer: 'Chắc chắn rút được thẻ có số nhỏ hơn 4.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Mai gieo một con xúc xắc có các mặt từ 1 đến 6 chấm. Mặt trên có 4 chấm là việc thế nào?',
      options: WORDS,
      answer: 1,
      hints: ['Xúc xắc có mặt 4 chấm không? Còn có các mặt khác không?'],
      solution: 'Xúc xắc có mặt 4 chấm và cả các mặt khác, nên có thể ra mặt 4 chấm.',
    },
    {
      type: 'choice',
      prompt: 'Vẫn con xúc xắc đó. Mặt trên có ít hơn 7 chấm là việc thế nào?',
      options: WORDS,
      answer: 0,
      hints: ['Mặt nhiều chấm nhất có mấy chấm?'],
      solution: 'Mặt nào cũng có ít hơn 7 chấm, nên chắc chắn có ít hơn 7 chấm.',
    },
    {
      type: 'choice',
      prompt: 'Vẫn con xúc xắc đó. Mặt trên có nhiều hơn 7 chấm là việc thế nào?',
      options: WORDS,
      answer: 2,
      hints: ['Có mặt nào nhiều hơn 7 chấm không?'],
      solution: 'Không có mặt nào nhiều hơn 7 chấm, nên không thể.',
    },
    {
      type: 'choice',
      prompt: 'Việt sút bóng lệch hẳn ra ngoài khung thành. Bóng vào khung thành là việc thế nào?',
      options: WORDS,
      answer: 2,
      hints: ['Bóng đang bay ở đâu, trong hay ngoài khung thành?'],
      solution: 'Bóng đã lệch ra ngoài, nên không thể vào khung thành.',
    },
    {
      type: 'choice',
      prompt:
        'Mai sút bóng sắp qua vạch vôi. Thủ môn Rô-bốt đổ người sai hướng. Bóng vào khung thành là việc thế nào?',
      options: WORDS,
      answer: 0,
      hints: ['Thủ môn có chạm được vào bóng không?'],
      solution: 'Thủ môn không chạm được bóng, nên bóng chắc chắn vào khung thành.',
    },
    {
      type: 'choice',
      prompt:
        'Nam sút bóng về phía khung thành. Thủ môn Rô-bốt đổ người đúng hướng, có thể chạm tới bóng. Bóng vào khung thành là việc thế nào?',
      options: WORDS,
      answer: 1,
      hints: ['Thủ môn có chắc chắn bắt được bóng không?'],
      solution: 'Thủ môn có thể bắt được hoặc không, nên bóng có thể vào khung thành.',
    },
    {
      type: 'match',
      prompt:
        'Rô-bốt có 5 quả táo trong giỏ. Rô-bốt tặng cả 4 bạn, trong đó có bạn Mi. Bạn nào cũng được ít nhất 1 quả. Nối mỗi việc với từ đúng.',
      left: ['Mỗi bạn đều có táo', 'Trong giỏ còn lại 1 quả', 'Bạn Mi được 4 quả'],
      right: ['Không thể', 'Chắc chắn', 'Có thể'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: [
        'Đề bài nói gì về số táo của mỗi bạn?',
        'Nếu Mi được 4 quả, 3 bạn còn lại có đủ táo không?',
      ],
      solution:
        'Mỗi bạn đều có táo: chắc chắn. Còn 1 quả: có thể, vì Rô-bốt có thể tặng hết hoặc còn lại 1 quả. Mi được 4 quả: không thể, vì chỉ còn 1 quả cho 3 bạn.',
    },
    {
      type: 'choice',
      prompt: 'Vẫn 5 quả táo, tặng cả 4 bạn. Trong giỏ còn lại 2 quả là việc thế nào?',
      options: WORDS,
      answer: 2,
      hints: ['Tặng 4 bạn, ít nhất mỗi bạn 1 quả. Số táo đã tặng ít nhất là mấy quả?'],
      solution:
        'Đã tặng ít nhất 4 quả. 5 − 4 = 1, nên giỏ còn nhiều nhất 1 quả. Không thể còn 2 quả.',
    },
  ],
  takeaways: [
    'Chắc chắn: việc đó luôn luôn xảy ra.',
    'Có thể: việc đó lúc thì xảy ra, lúc thì không.',
    'Không thể: việc đó không bao giờ xảy ra.',
    'Trước khi chọn từ, em xem hết các khả năng.',
  ],
};
