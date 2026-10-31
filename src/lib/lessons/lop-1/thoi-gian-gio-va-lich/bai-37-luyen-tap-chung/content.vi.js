/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn lại chủ đề thời gian: xem giờ đúng trên đồng hồ, các ngày trong tuần, hôm qua, hôm nay, ngày mai, đọc tờ lịch và giải bài toán thực tế về ngày giờ.',
  intro:
    'Em đã biết xem giờ đúng, biết bảy ngày trong tuần và đọc tờ lịch. Hôm nay em luyện tập lại và giải vài bài toán nhỏ về ngày giờ nhé!',
  objectives: [
    'Đọc giờ đúng và đặt kim đồng hồ chỉ giờ đúng.',
    'Nói được hôm qua, hôm nay, ngày mai là thứ mấy.',
    'Đọc tờ lịch và dùng ngày giờ trong việc hằng ngày.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Giờ đúng',
          text: 'Kim dài (kim phút) chỉ số 12. Kim ngắn (kim giờ) chỉ số nào thì là bấy nhiêu giờ.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Một tuần có 7 ngày',
          text: 'Thứ Hai, thứ Ba, thứ Tư, thứ Năm, thứ Sáu, thứ Bảy, Chủ nhật.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tờ lịch',
          text: 'Tờ lịch ghi tháng ở trên, ngày bằng số to ở giữa, thứ ở dưới.',
        },
      ],
    },
    {
      heading: 'Giải bài toán',
      blocks: [
        {
          type: 'table',
          head: ['Bài toán hỏi', 'Em làm'],
          rows: [
            ['Đồng hồ chỉ mấy giờ?', 'nhìn số kim ngắn chỉ'],
            ['Ngày mai là thứ mấy?', 'tìm ngày ngay sau hôm nay'],
            ['Hôm qua là thứ mấy?', 'tìm ngày ngay trước hôm nay'],
            ['Ngày mai là ngày bao nhiêu?', 'lấy ngày hôm nay thêm 1'],
          ],
        },
        {
          type: 'p',
          text: 'Nói giờ, em nói thêm sáng, trưa, chiều hay tối cho rõ: 7 giờ sáng, 7 giờ tối.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Mỗi bộ có 12 câu trộn từ cả chủ đề. Chạm vào đáp án. Sai lần đầu, em được gợi ý và thử lại. Làm xong, em xem mình cần ôn phần nào và chọn "Làm bộ bài khác".',
  },
  examples: [
    {
      problem: 'Hôm nay là thứ Bảy. Ngày mai là thứ mấy? Em có đi học không?',
      steps: ['Ngay sau thứ Bảy là Chủ nhật.', 'Chủ nhật em được nghỉ học.'],
      answer: 'Ngày mai là Chủ nhật, em không đi học.',
    },
    {
      problem: 'Mẹ hẹn đón em lúc 5 giờ chiều. Lúc đó đồng hồ chỉ thế nào?',
      steps: ['Giờ đúng: kim dài chỉ số 12.', '5 giờ: kim ngắn chỉ số 5.'],
      answer: 'Kim ngắn chỉ số 5, kim dài chỉ số 12.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Kim ngắn chỉ số 6, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?',
      options: ['6 giờ', '12 giờ', '7 giờ'],
      answer: 0,
      hints: ['Em nhìn số kim ngắn chỉ.'],
      solution: 'Kim ngắn chỉ số 6, kim dài chỉ số 12: 6 giờ.',
    },
    {
      type: 'choice',
      prompt: 'Lúc 2 giờ, kim dài chỉ số mấy?',
      options: ['Số 2', 'Số 12', 'Số 3'],
      answer: 1,
      hints: ['Giờ đúng thì kim dài luôn chỉ cùng một số.'],
      solution: 'Lúc 2 giờ, kim dài chỉ số 12, kim ngắn chỉ số 2.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi giờ với vị trí của kim ngắn.',
      left: ['1 giờ', '11 giờ', '9 giờ'],
      right: ['Kim ngắn chỉ số 9', 'Kim ngắn chỉ số 1', 'Kim ngắn chỉ số 11'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Mấy giờ thì kim ngắn chỉ số đó.'],
      solution: '1 giờ: kim ngắn chỉ số 1. 11 giờ: chỉ số 11. 9 giờ: chỉ số 9.',
    },
    {
      type: 'order',
      prompt: 'Xếp các ngày theo đúng thứ tự trong tuần.',
      items: ['Chủ nhật', 'thứ Năm', 'thứ Bảy', 'thứ Sáu'],
      answer: [1, 3, 2, 0],
      hints: ['Chủ nhật là ngày cuối tuần.'],
      solution: 'Thứ tự là thứ Năm, thứ Sáu, thứ Bảy, Chủ nhật.',
    },
    {
      type: 'choice',
      prompt: 'Hôm nay là thứ Tư. Ngày mai là thứ mấy?',
      options: ['Thứ Ba', 'Thứ Năm', 'Thứ Sáu'],
      answer: 1,
      hints: ['Ngày mai là ngày ngay sau hôm nay.'],
      solution: 'Ngay sau thứ Tư là thứ Năm.',
    },
    {
      type: 'choice',
      prompt: 'Hôm nay là thứ Hai. Hôm qua là thứ mấy?',
      options: ['Chủ nhật', 'Thứ Ba', 'Thứ Bảy'],
      answer: 0,
      hints: ['Ngày nào đứng ngay trước thứ Hai?'],
      solution: 'Ngay trước thứ Hai là Chủ nhật. Hôm qua là Chủ nhật.',
    },
    {
      type: 'choice',
      prompt: 'Hôm qua là thứ Năm. Hôm nay là thứ mấy?',
      options: ['Thứ Tư', 'Thứ Sáu', 'Thứ Bảy'],
      answer: 1,
      hints: ['Hôm nay là ngày ngay sau hôm qua.'],
      solution: 'Ngay sau thứ Năm là thứ Sáu. Hôm nay là thứ Sáu.',
    },
    {
      type: 'choice',
      prompt: 'Tờ lịch ghi "Tháng 3", số 8, "Chủ nhật". Hôm đó là ngày nào?',
      options: ['Chủ nhật, ngày 8 tháng 3', 'Thứ Bảy, ngày 8 tháng 3', 'Chủ nhật, ngày 3 tháng 8'],
      answer: 0,
      hints: ['Chữ ở trên là tháng, số to ở giữa là ngày.'],
      solution: 'Hôm đó là Chủ nhật, ngày 8 tháng 3.',
    },
    {
      type: 'choice',
      prompt: 'Hôm nay là thứ Ba, ngày 12. Ngày mai là ngày nào?',
      options: ['Thứ Tư, ngày 13', 'Thứ Tư, ngày 11', 'Thứ Hai, ngày 13'],
      answer: 0,
      hints: ['Ngày mai: thứ tiếp theo, ngày thêm 1.'],
      solution: 'Sau thứ Ba là thứ Tư, sau ngày 12 là ngày 13. Ngày mai là thứ Tư, ngày 13.',
    },
    {
      type: 'choice',
      prompt:
        'Mai ăn trưa. Đồng hồ có kim ngắn chỉ số 11, kim dài chỉ số 12. Mai ăn trưa lúc mấy giờ?',
      options: ['11 giờ trưa', '11 giờ tối', '12 giờ trưa'],
      answer: 0,
      hints: ['Kim ngắn chỉ số 11 là 11 giờ.', 'Ăn trưa là buổi nào?'],
      solution: 'Kim ngắn chỉ số 11 nên là 11 giờ. Mai ăn trưa lúc 11 giờ trưa.',
    },
    {
      type: 'choice',
      prompt: 'Hôm nay là thứ Sáu. Lan sẽ đi công viên vào thứ Bảy. Lan đi công viên vào hôm nào?',
      options: ['Ngày mai', 'Hôm qua', 'Hôm nay'],
      answer: 0,
      hints: ['Thứ Bảy đứng trước hay sau thứ Sáu?'],
      solution: 'Thứ Bảy là ngày ngay sau thứ Sáu, nên Lan đi công viên vào ngày mai.',
    },
    {
      type: 'choice',
      prompt:
        'Lớp em học Toán vào thứ Hai, thứ Tư và thứ Sáu. Hôm nay là thứ Ba. Ngày mai lớp em có học Toán không?',
      options: ['Có', 'Không'],
      answer: 0,
      hints: ['Trước hết, em tìm xem ngày mai là thứ mấy.'],
      solution: 'Ngày mai là thứ Tư. Thứ Tư lớp em có học Toán.',
    },
  ],
  takeaways: [
    'Giờ đúng: kim dài chỉ số 12, kim ngắn chỉ số nào là bấy nhiêu giờ.',
    'Một tuần có 7 ngày, từ thứ Hai đến Chủ nhật.',
    'Hôm qua là ngày ngay trước, ngày mai là ngày ngay sau hôm nay.',
    'Tờ lịch cho biết thứ, ngày và tháng.',
  ],
};
