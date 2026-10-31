/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhận dạng khối lập phương và khối hộp chữ nhật, tìm đồ vật có dạng hai khối đó và đếm khối lập phương trong hình xếp.',
  intro:
    'Con xúc xắc và hộp sữa đều là những cái khối. Hai khối này có giống nhau không? Em cùng xoay và xem nhé!',
  objectives: [
    'Nhận dạng khối lập phương.',
    'Nhận dạng khối hộp chữ nhật.',
    'Tìm đồ vật quanh em có dạng khối lập phương, khối hộp chữ nhật.',
  ],
  sections: [
    {
      heading: 'Khối lập phương',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Khối lập phương',
          text: 'Khối lập phương có 6 mặt. Mặt nào cũng là hình vuông. Các mặt to bằng nhau.',
        },
        {
          type: 'p',
          text: 'Con xúc xắc, khối rubik, hộp quà vuông có dạng khối lập phương.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Xoay thử',
          text: 'Em xoay khối lập phương thế nào, nó vẫn là khối lập phương.',
        },
      ],
    },
    {
      heading: 'Khối hộp chữ nhật',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Khối hộp chữ nhật',
          text: 'Khối hộp chữ nhật cũng có 6 mặt. Có mặt là hình chữ nhật. Các mặt không to bằng nhau hết.',
        },
        {
          type: 'p',
          text: 'Hộp sữa, viên gạch, hộp bút, cái tủ có dạng khối hộp chữ nhật.',
        },
        {
          type: 'table',
          head: ['Khối', 'Các mặt', 'Đồ vật'],
          rows: [
            ['Khối lập phương', 'đều là hình vuông, to bằng nhau', 'xúc xắc, rubik'],
            ['Khối hộp chữ nhật', 'có mặt là hình chữ nhật', 'hộp sữa, viên gạch'],
          ],
        },
      ],
    },
    {
      heading: 'Đếm khối',
      blocks: [
        {
          type: 'p',
          text: 'Bạn Mai xếp các khối lập phương thành tháp. Em chạm vào từng khối và đếm.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Đếm từng cột, từ dưới lên trên. Mỗi khối chỉ đếm một lần.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xoay khối',
    instruction:
      'Kéo hoặc dùng phím mũi tên để xoay khối. Bật "Tô màu" để thấy mặt nào to bằng nhau. Chọn "Đoán khối" rồi chạm vào tên đúng của mỗi khối.',
  },
  examples: [
    {
      problem: 'Con xúc xắc có dạng khối gì?',
      steps: ['Em nhìn các mặt của con xúc xắc.', 'Mặt nào cũng là hình vuông, to bằng nhau.'],
      answer: 'Con xúc xắc có dạng khối lập phương.',
    },
    {
      problem: 'Viên gạch có dạng khối gì?',
      steps: [
        'Mặt trước của viên gạch dài, là hình chữ nhật.',
        'Các mặt của viên gạch không to bằng nhau hết.',
      ],
      answer: 'Viên gạch có dạng khối hộp chữ nhật.',
    },
    {
      problem:
        'Tháp có 3 cột: cột 1 có 3 khối, cột 2 có 2 khối, cột 3 có 1 khối. Có mấy khối lập phương?',
      steps: ['Đếm cột 1: một, hai, ba.', 'Đếm tiếp cột 2: bốn, năm.', 'Đếm tiếp cột 3: sáu.'],
      answer: 'Có 6 khối lập phương.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Khối rubik có dạng khối gì?',
      options: ['Khối lập phương', 'Khối hộp chữ nhật'],
      answer: 0,
      hints: ['Mặt nào của khối rubik cũng là hình vuông.'],
      solution:
        'Các mặt của khối rubik là hình vuông to bằng nhau. Khối rubik có dạng khối lập phương.',
    },
    {
      type: 'choice',
      prompt: 'Hộp sữa có dạng khối gì?',
      options: ['Khối lập phương', 'Khối hộp chữ nhật'],
      answer: 1,
      hints: ['Hộp sữa cao. Mặt trước của hộp có phải hình vuông không?'],
      solution: 'Mặt trước của hộp sữa là hình chữ nhật. Hộp sữa có dạng khối hộp chữ nhật.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đồ vật với dạng khối của nó.',
      left: ['Con xúc xắc', 'Viên gạch'],
      right: ['Khối lập phương', 'Khối hộp chữ nhật'],
      pairs: [
        [0, 0],
        [1, 1],
      ],
      hints: ['Mọi mặt là hình vuông to bằng nhau thì là khối lập phương.'],
      solution: 'Con xúc xắc: khối lập phương. Viên gạch: khối hộp chữ nhật.',
    },
    {
      type: 'multi',
      prompt: 'Những đồ vật nào có dạng khối lập phương?',
      options: ['Hộp quà vuông', 'Hộp sữa', 'Khối rubik', 'Viên gạch'],
      answers: [0, 2],
      hints: ['Em tìm đồ vật có mọi mặt là hình vuông to bằng nhau.'],
      solution: 'Hộp quà vuông và khối rubik có dạng khối lập phương.',
    },
    {
      type: 'multi',
      prompt: 'Những đồ vật nào có dạng khối hộp chữ nhật?',
      options: ['Cái tủ', 'Con xúc xắc', 'Hộp bút', 'Khối rubik'],
      answers: [0, 2],
      hints: [
        'Em tìm đồ vật có mặt là hình chữ nhật.',
        'Con xúc xắc và khối rubik có mặt là hình vuông.',
      ],
      solution: 'Cái tủ và hộp bút có dạng khối hộp chữ nhật.',
    },
    {
      type: 'count',
      prompt: 'Có mấy khối lập phương?',
      picture: 'cube',
      answer: 5,
      choices: [3, 4, 5, 6],
      hints: ['Chạm vào từng khối và đếm.'],
      solution: 'Đếm: một, hai, ba, bốn, năm. Có 5 khối lập phương.',
    },
    {
      type: 'choice',
      prompt: 'Tháp có 2 cột, mỗi cột có 2 khối lập phương. Tháp có mấy khối?',
      options: ['2', '3', '4'],
      answer: 2,
      hints: ['Đếm cột thứ nhất, rồi đếm tiếp cột thứ hai.'],
      solution: 'Cột 1: một, hai. Cột 2: ba, bốn. Tháp có 4 khối.',
    },
    {
      type: 'choice',
      prompt: 'Em xoay nằm nghiêng một khối lập phương. Bây giờ nó là khối gì?',
      options: ['Vẫn là khối lập phương', 'Khối hộp chữ nhật'],
      answer: 0,
      hints: ['Xoay khối đi, các mặt có thay đổi không?'],
      solution: 'Xoay đi, các mặt vẫn là hình vuông to bằng nhau. Đó vẫn là khối lập phương.',
    },
  ],
  takeaways: [
    'Khối lập phương: 6 mặt đều là hình vuông, to bằng nhau.',
    'Khối hộp chữ nhật: có mặt là hình chữ nhật, các mặt không to bằng nhau hết.',
    'Xúc xắc, rubik có dạng khối lập phương. Hộp sữa, viên gạch có dạng khối hộp chữ nhật.',
  ],
};
