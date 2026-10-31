/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành đọc tờ lịch để biết thứ, ngày, tháng và xem giờ đúng trên đồng hồ gắn với các việc hằng ngày, rồi tự làm thời gian biểu của em.',
  intro:
    'Mỗi sáng, bố mẹ bóc một tờ lịch và nhìn đồng hồ để biết đã đến giờ đi học chưa. Hôm nay em tập xem lịch và xem giờ như thế nhé!',
  objectives: [
    'Đọc tờ lịch: biết hôm đó là thứ mấy, ngày bao nhiêu, tháng mấy.',
    'Xem giờ đúng trên đồng hồ và nói giờ của các việc em làm hằng ngày.',
    'Làm thời gian biểu đơn giản cho một ngày của em.',
  ],
  sections: [
    {
      heading: 'Đọc tờ lịch',
      blocks: [
        {
          type: 'p',
          text: 'Tờ lịch cho em biết ba điều: tháng mấy, ngày bao nhiêu và thứ mấy.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ví dụ',
          text: 'Tờ lịch ghi "Tháng 5", số 15 to ở giữa, dưới là "Thứ Sáu". Em đọc: thứ Sáu, ngày 15 tháng 5.',
        },
        {
          type: 'widget',
          name: 'calendar',
        },
        {
          type: 'p',
          text: 'Mỗi ngày qua đi, ta bóc một tờ. Tờ ở dưới là ngày mai: ngày tăng thêm 1, thứ cũng sang thứ tiếp theo.',
        },
      ],
    },
    {
      heading: 'Giờ và việc hằng ngày',
      blocks: [
        {
          type: 'p',
          text: 'Một ngày có buổi sáng, buổi trưa, buổi chiều và buổi tối. Mỗi việc em làm vào một giờ nhất định.',
        },
        {
          type: 'table',
          head: ['Việc', 'Giờ', 'Kim ngắn chỉ số'],
          rows: [
            ['Thức dậy', '6 giờ sáng', '6'],
            ['Vào lớp học', '7 giờ sáng', '7'],
            ['Ăn trưa', '11 giờ trưa', '11'],
            ['Đi học về', '5 giờ chiều', '5'],
            ['Ăn tối', '7 giờ tối', '7'],
            ['Đi ngủ', '9 giờ tối', '9'],
          ],
          caption: 'Thời gian biểu của bạn Nam. Lúc đó kim dài luôn chỉ số 12.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: '7 giờ sáng và 7 giờ tối, kim đồng hồ chỉ giống nhau. Em nói thêm "sáng" hay "tối" cho rõ.',
        },
      ],
    },
    {
      heading: 'Em làm thời gian biểu',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: em ghi lại giờ của các việc em làm trong một ngày.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chuẩn bị: một tờ giấy, bút chì, bút màu và một chiếc đồng hồ ở nhà.',
            'Xem tờ lịch hôm nay. Viết lên đầu tờ giấy: thứ mấy, ngày bao nhiêu, tháng mấy.',
            'Chọn 4 việc em làm mỗi ngày: thức dậy, đi học, ăn tối, đi ngủ.',
            'Hỏi bố mẹ hoặc nhìn đồng hồ: mỗi việc em làm lúc mấy giờ? Viết giờ cạnh mỗi việc.',
            'Vẽ một mặt đồng hồ nhỏ cạnh mỗi việc, kim ngắn chỉ đúng giờ, kim dài chỉ số 12.',
          ],
        },
        {
          type: 'p',
          text: 'Kể cho cả lớp: hôm nay là thứ mấy, ngày bao nhiêu? Em thức dậy và đi ngủ lúc mấy giờ?',
        },
      ],
    },
  ],
  explore: {
    title: 'Thời gian biểu của Nam',
    instruction:
      'Chạm vào một việc của Nam. Kéo kim ngắn (hoặc chạm vào kim rồi bấm phím mũi tên) cho đồng hồ chỉ đúng giờ của việc đó, để kim dài ở số 12, rồi bấm "Gắn giờ". Gắn đủ sáu việc là xong thời gian biểu.',
  },
  examples: [
    {
      problem: 'Tờ lịch ghi "Tháng 5", số 10, "Chủ nhật". Hôm đó là ngày nào?',
      steps: [
        'Tháng ghi ở trên: tháng 5.',
        'Số to ở giữa là ngày: ngày 10.',
        'Dòng dưới là thứ: Chủ nhật.',
      ],
      answer: 'Hôm đó là Chủ nhật, ngày 10 tháng 5.',
    },
    {
      problem: 'Nam đi học về lúc 5 giờ chiều. Đồng hồ lúc đó thế nào?',
      steps: ['Giờ đúng: kim dài chỉ số 12.', '5 giờ: kim ngắn chỉ số 5.'],
      answer: 'Kim ngắn chỉ số 5, kim dài chỉ số 12.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tờ lịch ghi "Tháng 5", số 15, "Thứ Sáu". Hôm đó là ngày nào?',
      options: ['Thứ Sáu, ngày 15 tháng 5', 'Thứ Năm, ngày 15 tháng 5', 'Thứ Sáu, ngày 5 tháng 15'],
      answer: 0,
      hints: ['Số to ở giữa là ngày. Chữ ở trên là tháng.'],
      solution: 'Hôm đó là thứ Sáu, ngày 15 tháng 5.',
    },
    {
      type: 'choice',
      prompt: 'Hôm nay là thứ Sáu, ngày 15 tháng 5. Ngày mai là ngày nào?',
      options: ['Thứ Bảy, ngày 16 tháng 5', 'Thứ Năm, ngày 14 tháng 5', 'Thứ Bảy, ngày 15 tháng 5'],
      answer: 0,
      hints: ['Ngày mai: thứ sang thứ tiếp theo, ngày tăng thêm 1.'],
      solution:
        'Sau thứ Sáu là thứ Bảy, sau ngày 15 là ngày 16. Ngày mai là thứ Bảy, ngày 16 tháng 5.',
    },
    {
      type: 'choice',
      prompt: 'Hôm nay là thứ Hai, ngày 4. Hôm qua là ngày nào?',
      options: ['Chủ nhật, ngày 3', 'Thứ Ba, ngày 5', 'Chủ nhật, ngày 5'],
      answer: 0,
      hints: ['Hôm qua: thứ lùi lại một thứ, ngày bớt đi 1.'],
      solution: 'Trước thứ Hai là Chủ nhật, trước ngày 4 là ngày 3. Hôm qua là Chủ nhật, ngày 3.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi việc với giờ thích hợp.',
      left: ['Thức dậy', 'Ăn trưa', 'Đi ngủ'],
      right: ['9 giờ tối', '6 giờ sáng', '11 giờ trưa'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Việc nào làm buổi sáng, việc nào làm buổi tối?'],
      solution: 'Thức dậy lúc 6 giờ sáng, ăn trưa lúc 11 giờ trưa, đi ngủ lúc 9 giờ tối.',
    },
    {
      type: 'choice',
      prompt:
        'Nam vào lớp học. Đồng hồ có kim ngắn chỉ số 7, kim dài chỉ số 12. Nam vào lớp lúc mấy giờ?',
      options: ['7 giờ sáng', '12 giờ trưa', '7 giờ tối'],
      answer: 0,
      hints: ['Kim ngắn chỉ số 7 là 7 giờ.', 'Em vào lớp buổi sáng hay buổi tối?'],
      solution: 'Kim ngắn chỉ số 7 nên là 7 giờ. Nam vào lớp buổi sáng: 7 giờ sáng.',
    },
    {
      type: 'order',
      prompt: 'Xếp các việc theo thứ tự trong một ngày, từ sáng đến tối.',
      items: ['Ăn tối', 'Thức dậy', 'Ăn trưa', 'Đi ngủ'],
      answer: [1, 2, 0, 3],
      hints: ['Việc đầu tiên trong ngày là gì?'],
      solution: 'Thức dậy, ăn trưa, ăn tối, đi ngủ.',
    },
    {
      type: 'choice',
      prompt: 'Em đi ngủ lúc 9 giờ tối. Lúc đó kim ngắn chỉ số mấy?',
      options: ['Số 9', 'Số 12', 'Số 6'],
      answer: 0,
      hints: ['9 giờ: kim dài chỉ số 12, còn kim ngắn?'],
      solution: 'Lúc 9 giờ, kim ngắn chỉ số 9, kim dài chỉ số 12.',
    },
  ],
  takeaways: [
    'Tờ lịch cho biết thứ, ngày và tháng.',
    'Ngày mai: thứ tiếp theo, ngày tăng thêm 1.',
    'Mỗi việc hằng ngày làm vào một giờ. Nhớ nói thêm sáng, trưa, chiều hay tối.',
  ],
};
