/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn lại chủ đề làm quen với một số hình khối: nhận dạng khối lập phương, khối hộp chữ nhật, đếm khối và nói vị trí trên, dưới, trái, phải, trước, sau, ở giữa.',
  intro:
    'Em đã biết khối lập phương, khối hộp chữ nhật và cách nói vị trí của đồ vật. Hôm nay em luyện tập lại tất cả nhé!',
  objectives: [
    'Nhận dạng khối lập phương, khối hộp chữ nhật.',
    'Đếm số khối lập phương trong một hình xếp.',
    'Nói đúng vị trí: trên, dưới, bên trái, bên phải, trước, sau, ở giữa.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'table',
          head: ['Khối', 'Em nhận ra nhờ'],
          rows: [
            ['Khối lập phương', 'mọi mặt là hình vuông to bằng nhau'],
            ['Khối hộp chữ nhật', 'có mặt là hình chữ nhật'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đếm khối',
          text: 'Đếm từng cột, từ dưới lên trên. Mỗi khối chỉ đếm một lần.',
        },
        {
          type: 'table',
          head: ['Từ chỉ vị trí', 'Ngược lại'],
          rows: [
            ['trên', 'dưới'],
            ['bên trái', 'bên phải'],
            ['trước', 'sau'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Mỗi bộ có 10 câu trộn từ cả chủ đề. Chạm vào đáp án. Sai lần đầu, em được gợi ý và thử lại. Làm xong, em xem mình cần ôn phần nào và chọn "Làm bộ bài khác".',
  },
  examples: [
    {
      problem: 'Hình xếp có 2 cột: cột 1 có 3 khối, cột 2 có 1 khối. Có mấy khối lập phương?',
      steps: ['Đếm cột 1 từ dưới lên: một, hai, ba.', 'Đếm tiếp cột 2: bốn.'],
      answer: 'Có 4 khối lập phương.',
    },
    {
      problem: 'Hộp quà vuông ở trên bàn, viên gạch ở dưới bàn. Khối hộp chữ nhật ở đâu?',
      steps: [
        'Hộp quà vuông có dạng khối lập phương.',
        'Viên gạch có dạng khối hộp chữ nhật.',
        'Viên gạch ở dưới bàn.',
      ],
      answer: 'Khối hộp chữ nhật ở dưới bàn.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Khối có 6 mặt đều là hình vuông to bằng nhau là khối gì?',
      options: ['Khối lập phương', 'Khối hộp chữ nhật'],
      answer: 0,
      hints: ['Con xúc xắc có các mặt như vậy.'],
      solution: 'Đó là khối lập phương.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đồ vật với dạng khối của nó.',
      left: ['Khối rubik', 'Hộp sữa'],
      right: ['Khối lập phương', 'Khối hộp chữ nhật'],
      pairs: [
        [0, 0],
        [1, 1],
      ],
      hints: ['Hộp sữa cao, mặt trước là hình chữ nhật.'],
      solution: 'Khối rubik: khối lập phương. Hộp sữa: khối hộp chữ nhật.',
    },
    {
      type: 'multi',
      prompt: 'Những đồ vật nào có dạng khối hộp chữ nhật?',
      options: ['Viên gạch', 'Con xúc xắc', 'Cái tủ', 'Hộp quà vuông'],
      answers: [0, 2],
      hints: ['Em tìm đồ vật có mặt là hình chữ nhật.'],
      solution: 'Viên gạch và cái tủ có dạng khối hộp chữ nhật.',
    },
    {
      type: 'count',
      prompt: 'Có mấy khối lập phương?',
      picture: 'cube',
      answer: 7,
      choices: [5, 6, 7, 8],
      hints: ['Chạm vào từng khối và đếm to.'],
      solution: 'Đếm: một, hai, ba, bốn, năm, sáu, bảy. Có 7 khối lập phương.',
    },
    {
      type: 'choice',
      prompt: 'Tháp có 3 cột: cột 1 có 2 khối, cột 2 có 3 khối, cột 3 có 2 khối. Tháp có mấy khối?',
      options: ['6', '7', '8'],
      answer: 1,
      hints: ['Đếm cột 1, rồi đếm tiếp cột 2 và cột 3.'],
      solution: 'Cột 1: một, hai. Cột 2: ba, bốn, năm. Cột 3: sáu, bảy. Tháp có 7 khối.',
    },
    {
      type: 'choice',
      prompt: 'Con mèo nằm dưới gầm giường. Con mèo ở đâu so với cái giường?',
      options: ['Ở trên', 'Ở dưới', 'Ở bên phải'],
      answer: 1,
      hints: ['Gầm giường là chỗ thấp hơn mặt giường.'],
      solution: 'Con mèo nằm dưới gầm giường, nên ở dưới cái giường.',
    },
    {
      type: 'choice',
      prompt: 'Trên giá sách, từ trái sang phải: quyển truyện, hộp bút, quyển vở. Hộp bút ở đâu?',
      options: [
        'Ở giữa quyển truyện và quyển vở',
        'Ở bên trái quyển truyện',
        'Ở bên phải quyển vở',
      ],
      answer: 0,
      hints: ['Hộp bút đứng thứ hai trong ba đồ vật.'],
      solution: 'Hộp bút nằm giữa quyển truyện và quyển vở.',
    },
    {
      type: 'choice',
      prompt:
        'Ba bạn xếp hàng vào lớp: An đứng đầu, Bình đứng giữa, Chi đứng cuối. Ai đứng trước Bình?',
      options: ['An', 'Chi'],
      answer: 0,
      hints: ['Bạn đứng đầu hàng đứng trước các bạn khác.'],
      solution: 'An đứng đầu hàng, nên An đứng trước Bình.',
    },
    {
      type: 'order',
      prompt:
        'Tàu hỏa có 3 toa đi về phía trước: toa đỏ đi đầu, toa vàng đi cuối, toa xanh ở giữa. Xếp các toa từ đầu tàu đến cuối tàu.',
      items: ['Toa vàng', 'Toa xanh', 'Toa đỏ'],
      answer: [2, 1, 0],
      hints: ['Toa đi đầu xếp trước tiên.'],
      solution: 'Toa đỏ, toa xanh, toa vàng.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi từ với từ chỉ vị trí ngược lại.',
      left: ['Dưới', 'Phải', 'Sau'],
      right: ['Trước', 'Trên', 'Trái'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Dưới và trên đi cùng nhau.'],
      solution: 'Dưới – trên, phải – trái, sau – trước.',
    },
  ],
  takeaways: [
    'Khối lập phương: mọi mặt là hình vuông to bằng nhau. Khối hộp chữ nhật: có mặt là hình chữ nhật.',
    'Đếm khối: đếm từng cột, mỗi khối một lần.',
    'Trên – dưới, trái – phải, trước – sau là các cặp từ chỉ vị trí ngược nhau.',
    'Ở giữa: nằm giữa hai đồ vật.',
  ],
};
