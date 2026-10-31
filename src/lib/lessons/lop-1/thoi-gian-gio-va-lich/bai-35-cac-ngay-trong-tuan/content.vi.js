/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Một tuần có 7 ngày: thứ Hai, thứ Ba, thứ Tư, thứ Năm, thứ Sáu, thứ Bảy, Chủ nhật. Biết hôm nay là thứ mấy thì tìm được hôm qua và ngày mai.',
  intro:
    'Hôm nay là thứ mấy? Ngày mai em có đi học không? Hôm nay em học tên bảy ngày trong tuần và cách nói hôm qua, hôm nay, ngày mai.',
  objectives: [
    'Kể tên đúng thứ tự bảy ngày trong một tuần.',
    'Biết hôm nay là thứ mấy, nói được hôm qua và ngày mai là thứ mấy.',
  ],
  sections: [
    {
      heading: 'Bảy ngày trong tuần',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Một tuần có 7 ngày',
          text: 'Thứ Hai, thứ Ba, thứ Tư, thứ Năm, thứ Sáu, thứ Bảy, Chủ nhật.',
        },
        {
          type: 'p',
          text: 'Hết Chủ nhật, một tuần mới lại bắt đầu từ thứ Hai.',
        },
        {
          type: 'table',
          head: ['Em đi học', 'Em được nghỉ'],
          rows: [['Thứ Hai, thứ Ba, thứ Tư, thứ Năm, thứ Sáu', 'Thứ Bảy, Chủ nhật']],
          caption: 'Lịch đi học của nhiều bạn lớp 1.',
        },
      ],
    },
    {
      heading: 'Hôm qua, hôm nay, ngày mai',
      blocks: [
        {
          type: 'p',
          text: 'Hôm nay là ngày em đang sống. Hôm qua là ngày ngay trước hôm nay. Ngày mai là ngày ngay sau hôm nay.',
        },
        {
          type: 'table',
          head: ['Hôm qua', 'Hôm nay', 'Ngày mai'],
          rows: [
            ['thứ Hai', 'thứ Ba', 'thứ Tư'],
            ['thứ Bảy', 'Chủ nhật', 'thứ Hai'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Em đọc tên các ngày theo thứ tự. Ngày đứng ngay sau hôm nay là ngày mai.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vòng các ngày trong tuần',
    instruction:
      'Chọn "Xoay vòng ngày": chạm vào một ngày (hoặc bấm "Hôm qua", "Ngày mai") để xoay vòng. Ngày ở trên cùng là hôm nay, hai ngày bên cạnh là hôm qua và ngày mai. Chọn "Trả lời câu hỏi": đọc câu hỏi rồi chạm vào ngày đúng.',
  },
  examples: [
    {
      problem: 'Hôm nay là thứ Năm. Ngày mai là thứ mấy?',
      steps: [
        'Em đọc theo thứ tự: ..., thứ Tư, thứ Năm, thứ Sáu, ...',
        'Ngay sau thứ Năm là thứ Sáu.',
      ],
      answer: 'Ngày mai là thứ Sáu.',
    },
    {
      problem: 'Hôm nay là thứ Hai. Hôm qua là thứ mấy?',
      steps: [
        'Thứ Hai là ngày đầu tuần.',
        'Ngay trước thứ Hai là ngày cuối của tuần trước: Chủ nhật.',
      ],
      answer: 'Hôm qua là Chủ nhật.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Một tuần có mấy ngày?',
      options: ['5 ngày', '7 ngày', '10 ngày'],
      answer: 1,
      hints: ['Em đếm: thứ Hai, thứ Ba, ... đến Chủ nhật.'],
      solution: 'Một tuần có 7 ngày.',
    },
    {
      type: 'order',
      prompt: 'Xếp các ngày theo đúng thứ tự trong tuần.',
      items: ['thứ Năm', 'thứ Hai', 'thứ Tư', 'thứ Ba', 'thứ Sáu'],
      answer: [1, 3, 2, 0, 4],
      hints: ['Tuần bắt đầu từ thứ Hai.', 'Sau thứ Hai là thứ Ba.'],
      solution: 'Thứ tự là thứ Hai, thứ Ba, thứ Tư, thứ Năm, thứ Sáu.',
    },
    {
      type: 'choice',
      prompt: 'Hôm nay là thứ Ba. Ngày mai là thứ mấy?',
      options: ['Thứ Hai', 'Thứ Tư', 'Thứ Năm'],
      answer: 1,
      hints: ['Ngày mai là ngày ngay sau hôm nay.'],
      solution: 'Ngay sau thứ Ba là thứ Tư. Ngày mai là thứ Tư.',
    },
    {
      type: 'choice',
      prompt: 'Hôm nay là thứ Sáu. Hôm qua là thứ mấy?',
      options: ['Thứ Năm', 'Thứ Bảy', 'Thứ Tư'],
      answer: 0,
      hints: ['Hôm qua là ngày ngay trước hôm nay.'],
      solution: 'Ngay trước thứ Sáu là thứ Năm. Hôm qua là thứ Năm.',
    },
    {
      type: 'choice',
      prompt: 'Hôm nay là Chủ nhật. Ngày mai là thứ mấy?',
      options: ['Thứ Bảy', 'Thứ Hai', 'Chủ nhật'],
      answer: 1,
      hints: ['Hết Chủ nhật thì tuần mới bắt đầu.'],
      solution: 'Sau Chủ nhật, tuần mới bắt đầu từ thứ Hai. Ngày mai là thứ Hai.',
    },
    {
      type: 'match',
      prompt: 'Hôm nay là thứ Tư. Nối cho đúng.',
      left: ['Hôm qua', 'Hôm nay', 'Ngày mai'],
      right: ['thứ Năm', 'thứ Ba', 'thứ Tư'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Thứ Ba, thứ Tư, thứ Năm đứng liền nhau.'],
      solution: 'Hôm qua là thứ Ba, hôm nay là thứ Tư, ngày mai là thứ Năm.',
    },
    {
      type: 'choice',
      prompt: 'Ngày nào đứng ngay sau thứ Bảy?',
      options: ['Thứ Sáu', 'Chủ nhật', 'Thứ Hai'],
      answer: 1,
      hints: ['Sau thứ Bảy chỉ còn một ngày nữa là hết tuần.'],
      solution: 'Ngay sau thứ Bảy là Chủ nhật.',
    },
    {
      type: 'choice',
      prompt: 'Bạn Lan đi học từ thứ Hai đến thứ Sáu. Lan được nghỉ học những ngày nào?',
      options: ['Thứ Bảy và Chủ nhật', 'Thứ Hai và thứ Ba', 'Thứ Năm và thứ Sáu'],
      answer: 0,
      hints: ['Em kể các ngày còn lại sau thứ Sáu.'],
      solution: 'Sau thứ Sáu còn thứ Bảy và Chủ nhật. Lan nghỉ học thứ Bảy và Chủ nhật.',
    },
  ],
  takeaways: [
    'Một tuần có 7 ngày: thứ Hai, thứ Ba, thứ Tư, thứ Năm, thứ Sáu, thứ Bảy, Chủ nhật.',
    'Hôm qua là ngày ngay trước hôm nay.',
    'Ngày mai là ngày ngay sau hôm nay.',
    'Sau Chủ nhật là thứ Hai của tuần mới.',
  ],
};
