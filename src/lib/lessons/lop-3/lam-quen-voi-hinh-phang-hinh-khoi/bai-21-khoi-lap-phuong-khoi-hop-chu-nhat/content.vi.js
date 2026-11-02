/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhận biết đỉnh, cạnh, mặt của khối lập phương và khối hộp chữ nhật; phân biệt hai khối qua hình dạng các mặt.',
  intro:
    'Con xúc xắc và viên gạch khác nhau ở đâu? Em cùng xoay từng khối, chạm để đếm đỉnh, cạnh và mặt nhé!',
  objectives: [
    'Chỉ ra đỉnh, cạnh, mặt của khối lập phương và khối hộp chữ nhật.',
    'Nhớ hai khối đều có 8 đỉnh, 12 cạnh, 6 mặt.',
    'Phân biệt hai khối qua hình dạng các mặt.',
  ],
  sections: [
    {
      heading: 'Khối lập phương',
      blocks: [
        { type: 'p', text: 'Con xúc xắc, khối rubik có dạng khối lập phương.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khối lập phương có 8 đỉnh, 12 cạnh, 6 mặt. Các mặt đều là hình vuông.',
        },
      ],
    },
    {
      heading: 'Khối hộp chữ nhật',
      blocks: [
        { type: 'p', text: 'Viên gạch, hộp sữa có dạng khối hộp chữ nhật.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khối hộp chữ nhật có 8 đỉnh, 12 cạnh, 6 mặt. Các mặt đều là hình chữ nhật.',
        },
      ],
    },
    {
      heading: 'So sánh hai khối',
      blocks: [
        {
          type: 'table',
          head: ['Khối', 'Đỉnh', 'Cạnh', 'Mặt', 'Các mặt là'],
          rows: [
            ['Khối lập phương', '8', '12', '6', 'Hình vuông'],
            ['Khối hộp chữ nhật', '8', '12', '6', 'Hình chữ nhật'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo đếm',
          text: 'Có đỉnh, cạnh và mặt ở phía sau khối. Em nhớ đếm cả những phần đó.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xoay khối và đếm',
    instruction:
      'Kéo để xoay khối, hoặc bấm các nút xoay. Chạm vào từng đỉnh, cạnh, mặt để đếm. Đếm đủ hai khối, em xem chúng giống và khác nhau ở đâu. Đố em: trả lời 8 câu hỏi.',
  },
  examples: [
    {
      problem: 'Khối lập phương có 8 đỉnh. Mỗi đỉnh gắn 3 bông hoa. Có tất cả mấy bông hoa?',
      steps: ['3 bông hoa được lấy 8 lần.', 'Em làm phép nhân: 3 × 8 = 24.'],
      answer: 'Có tất cả 24 bông hoa.',
    },
    {
      problem:
        'Mỗi đèn lồng dạng khối lập phương dán 1 tờ giấy màu lên mỗi mặt. Làm 5 đèn lồng cần mấy tờ giấy?',
      steps: ['Khối lập phương có 6 mặt, nên mỗi đèn cần 6 tờ.', '5 đèn cần: 6 × 5 = 30.'],
      answer: 'Cần 30 tờ giấy màu.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Khối lập phương có mấy cạnh?',
      options: ['12 cạnh', '8 cạnh', '6 cạnh', '4 cạnh'],
      answer: 0,
      hints: ['Mỗi mặt là một hình vuông. Em đếm cả các cạnh ở phía sau.'],
      solution: 'Khối lập phương có 12 cạnh.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi khối với hình dạng các mặt của nó.',
      left: ['Khối lập phương', 'Khối hộp chữ nhật'],
      right: ['Các mặt đều là hình chữ nhật', 'Các mặt đều là hình vuông'],
      pairs: [
        [0, 1],
        [1, 0],
      ],
      hints: ['Con xúc xắc có dạng khối lập phương. Mỗi mặt của nó là hình gì?'],
      solution: 'Mặt khối lập phương là hình vuông. Mặt khối hộp chữ nhật là hình chữ nhật.',
    },
    {
      type: 'multi',
      prompt: 'Những điều nào đúng với cả hai khối?',
      options: ['Có 8 đỉnh', 'Có 12 cạnh', 'Có 6 mặt', 'Có 4 mặt', 'Có 3 đỉnh'],
      answers: [0, 1, 2],
      hints: ['Em nhớ lại bảng so sánh hai khối.'],
      solution: 'Hai khối đều có 8 đỉnh, 12 cạnh, 6 mặt.',
    },
    {
      type: 'multi',
      prompt: 'Những đồ vật nào có dạng khối hộp chữ nhật?',
      options: ['Viên gạch', 'Hộp sữa', 'Con xúc xắc', 'Khối rubik'],
      answers: [0, 1],
      hints: ['Đồ vật nào có mặt là hình chữ nhật, không phải hình vuông?'],
      solution:
        'Viên gạch và hộp sữa có dạng khối hộp chữ nhật. Con xúc xắc và khối rubik có dạng khối lập phương.',
    },
    {
      type: 'count',
      prompt: 'Có bao nhiêu khối lập phương?',
      picture: 'cube',
      answer: 7,
      choices: [5, 6, 7, 8],
      hints: ['Em chạm vào từng khối và đếm.'],
      solution: 'Có 7 khối lập phương.',
    },
    {
      type: 'number',
      prompt:
        'Khung sắt dạng khối hộp chữ nhật. Bác thợ sơn 4 cạnh màu xanh, các cạnh còn lại màu đỏ. Có mấy cạnh màu đỏ?',
      answer: 8,
      unit: 'cạnh',
      hints: ['Khung có tất cả mấy cạnh? Em bớt đi 4 cạnh màu xanh.'],
      solution: 'Khung có 12 cạnh. Số cạnh màu đỏ là 12 − 4 = 8 (cạnh).',
    },
    {
      type: 'number',
      prompt:
        'Một chiếc đèn lồng khung tre dạng khối lập phương. Mỗi cạnh là 1 nan tre. Chiếc đèn cần mấy nan tre?',
      answer: 12,
      unit: 'nan',
      hints: ['Số nan tre bằng số cạnh của khối lập phương.'],
      solution: 'Khối lập phương có 12 cạnh, nên cần 12 nan tre.',
    },
    {
      type: 'number',
      prompt:
        'Mỗi hộp quà dạng khối lập phương dán 1 tờ giấy lên mỗi mặt. Dán 4 hộp quà cần mấy tờ giấy?',
      answer: 24,
      unit: 'tờ',
      hints: ['Một hộp quà có mấy mặt? Em nhân với số hộp quà.'],
      solution: 'Mỗi hộp có 6 mặt, nên cần 6 tờ. 4 hộp cần 6 × 4 = 24 (tờ).',
    },
    {
      type: 'number',
      prompt: 'Mỗi đỉnh của khối hộp chữ nhật gắn 2 hạt cườm. Có tất cả mấy hạt cườm?',
      answer: 16,
      unit: 'hạt',
      hints: ['Khối hộp chữ nhật có mấy đỉnh? Em nhân với 2.'],
      solution: 'Khối hộp chữ nhật có 8 đỉnh. Số hạt cườm là 2 × 8 = 16 (hạt).',
    },
  ],
  takeaways: [
    'Khối lập phương và khối hộp chữ nhật đều có 8 đỉnh, 12 cạnh, 6 mặt.',
    'Các mặt của khối lập phương đều là hình vuông.',
    'Các mặt của khối hộp chữ nhật đều là hình chữ nhật.',
  ],
};
