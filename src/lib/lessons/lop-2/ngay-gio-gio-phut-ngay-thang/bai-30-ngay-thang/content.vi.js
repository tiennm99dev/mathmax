/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đọc tờ lịch tháng: biết tháng có bao nhiêu ngày, tìm một ngày trên lịch và biết ngày đó là thứ mấy.',
  intro:
    'Sinh nhật em vào ngày nào? Ngày đó là thứ mấy? Hôm nay em học đọc tờ lịch tháng để tự tìm ra nhé!',
  objectives: [
    'Đọc được ngày, tháng trên tờ lịch tháng.',
    'Biết một tháng có bao nhiêu ngày nhờ tờ lịch.',
    'Tìm được thứ của một ngày, và các ngày cùng thứ ở tuần trước, tuần sau.',
  ],
  sections: [
    {
      heading: 'Đọc tờ lịch tháng',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi cột của tờ lịch là một thứ trong tuần: T2 là thứ Hai, T3 là thứ Ba, và cứ thế đến CN là Chủ nhật. Mỗi hàng là một tuần.',
        },
        { type: 'widget', name: 'to-lich' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách đọc',
          text: 'Muốn biết một ngày là thứ mấy, em tìm số của ngày đó, rồi nhìn thẳng lên đầu cột.',
        },
      ],
    },
    {
      heading: 'Một tháng có bao nhiêu ngày?',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ghi nhớ',
          text: 'Số cuối cùng trên tờ lịch cho biết tháng đó có bao nhiêu ngày.',
        },
        {
          type: 'table',
          head: ['Số ngày', 'Các tháng'],
          rows: [
            ['31 ngày', 'Tháng 1, 3, 5, 7, 8, 10, 12'],
            ['30 ngày', 'Tháng 4, 6, 9, 11'],
            ['28 ngày', 'Tháng 2 (có năm có 29 ngày)'],
          ],
        },
      ],
    },
    {
      heading: 'Tuần trước, tuần sau',
      blocks: [
        {
          type: 'p',
          text: 'Một tuần có 7 ngày. Cùng một thứ, tuần sau hơn tuần này 7 ngày. Tuần trước kém tuần này 7 ngày.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Trên tờ lịch',
          text: 'Ngay dưới một số là cùng thứ ở tuần sau. Ngay trên một số là cùng thứ ở tuần trước.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tờ lịch tháng',
    instruction:
      'Chọn "Tra lịch": bấm ‹ hoặc › để đổi tháng, chạm vào một ngày để biết ngày đó là thứ mấy. Chọn "Đố em": đọc câu hỏi, nhìn tờ lịch rồi trả lời. Sai thì em được làm lại.',
  },
  examples: [
    {
      problem: 'Trên tờ lịch tháng 6, ngày 1 là thứ Tư. Ngày 8 tháng 6 là thứ mấy?',
      steps: ['Một tuần có 7 ngày: 1 + 7 = 8.', 'Ngày 8 là cùng thứ với ngày 1, ở tuần sau.'],
      answer: 'Ngày 8 tháng 6 là thứ Tư.',
    },
    {
      problem: 'Hôm qua là ngày 30 tháng 4. Hôm nay là ngày nào?',
      steps: [
        'Tháng 4 có 30 ngày, ngày 30 là ngày cuối tháng.',
        'Sau ngày 30 là ngày đầu của tháng 5.',
      ],
      answer: 'Hôm nay là ngày 1 tháng 5.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Số cuối cùng trên tờ lịch tháng 11 là 30. Tháng 11 có bao nhiêu ngày?',
      answer: 30,
      hints: ['Số cuối cùng cho biết tháng có bao nhiêu ngày.'],
      solution: 'Tháng 11 có 30 ngày.',
    },
    {
      type: 'choice',
      prompt: 'Ngày 2 tháng 9 là thứ Sáu. Ngày 9 tháng 9 là thứ mấy?',
      options: ['Thứ Sáu', 'Thứ Bảy', 'Thứ Năm'],
      answer: 0,
      hints: ['2 + 7 = 9. Thêm 7 ngày là cùng thứ ở tuần sau.'],
      solution: '2 + 7 = 9, nên ngày 9 tháng 9 cũng là thứ Sáu.',
    },
    {
      type: 'number',
      prompt: 'Thứ Bảy tuần này là ngày 17. Thứ Bảy tuần trước là ngày mấy?',
      answer: 10,
      hints: ['Tuần trước kém tuần này mấy ngày?'],
      solution: '17 − 7 = 10. Thứ Bảy tuần trước là ngày 10.',
    },
    {
      type: 'number',
      prompt: 'Thứ Hai tuần này là ngày 12. Thứ Hai tuần sau là ngày mấy?',
      answer: 19,
      hints: ['Tuần sau hơn tuần này mấy ngày?'],
      solution: '12 + 7 = 19. Thứ Hai tuần sau là ngày 19.',
    },
    {
      type: 'number',
      prompt: 'Trên tờ lịch, các ngày thứ Tư là 5, 12, ô trống, 26. Ô trống là số mấy?',
      answer: 19,
      hints: ['Mỗi tuần thêm 7 ngày.'],
      solution: '12 + 7 = 19, và 19 + 7 = 26. Ô trống là số 19.',
    },
    {
      type: 'choice',
      prompt: 'Hôm nay là ngày 31 tháng 1. Ngày mai là ngày nào?',
      options: ['Ngày 32 tháng 1', 'Ngày 1 tháng 2', 'Ngày 30 tháng 1'],
      answer: 1,
      hints: ['Tháng 1 có 31 ngày. Sau ngày cuối tháng là tháng nào?'],
      solution: 'Ngày 31 là ngày cuối của tháng 1, nên ngày mai là ngày 1 tháng 2.',
    },
    {
      type: 'choice',
      prompt: 'Tháng nào có 31 ngày?',
      options: ['Tháng 4', 'Tháng 6', 'Tháng 8', 'Tháng 9'],
      answer: 2,
      hints: ['Xem lại bảng số ngày của các tháng.'],
      solution: 'Tháng 4, 6, 9 có 30 ngày. Tháng 8 có 31 ngày.',
    },
    {
      type: 'match',
      prompt: 'Nối ngày với ngày lễ.',
      left: ['Ngày 1 tháng 6', 'Ngày 2 tháng 9', 'Ngày 20 tháng 11', 'Ngày 8 tháng 3'],
      right: ['Tết Thiếu nhi', 'Quốc khánh', 'Ngày Nhà giáo Việt Nam', 'Ngày Quốc tế Phụ nữ'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Ngày nào em tặng hoa cho thầy cô? Ngày nào em được quà Thiếu nhi?'],
      solution:
        '1 tháng 6: Tết Thiếu nhi; 2 tháng 9: Quốc khánh; 20 tháng 11: Ngày Nhà giáo Việt Nam; 8 tháng 3: Ngày Quốc tế Phụ nữ.',
    },
    {
      type: 'order',
      prompt: 'Xếp các ngày trong cùng một năm, từ sớm đến muộn.',
      items: ['Ngày 3 tháng 5', 'Ngày 28 tháng 4', 'Ngày 1 tháng 6', 'Ngày 15 tháng 5'],
      answer: [1, 0, 3, 2],
      hints: ['So sánh tháng trước. Cùng tháng thì so sánh ngày.'],
      solution: '28 tháng 4, 3 tháng 5, 15 tháng 5, 1 tháng 6.',
    },
  ],
  takeaways: [
    'Số cuối cùng trên tờ lịch cho biết tháng có bao nhiêu ngày.',
    'Tìm số của ngày, nhìn lên đầu cột để biết là thứ mấy.',
    'Cùng một thứ, tuần sau thêm 7 ngày, tuần trước bớt 7 ngày.',
  ],
};
