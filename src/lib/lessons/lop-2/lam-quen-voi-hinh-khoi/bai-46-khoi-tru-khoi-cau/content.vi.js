/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhận dạng khối trụ và khối cầu, tìm các đồ vật có dạng khối trụ, khối cầu trong cuộc sống.',
  intro:
    'Lon nước ngọt và quả bóng đều tròn tròn, nhưng lon nước đứng yên trên bàn còn quả bóng thì lăn đi mọi phía. Hai vật đó có dạng hai khối khác nhau. Em cùng xoay thử nhé!',
  objectives: [
    'Nhận dạng khối trụ.',
    'Nhận dạng khối cầu.',
    'Kể tên đồ vật có dạng khối trụ, khối cầu.',
  ],
  sections: [
    {
      heading: 'Khối trụ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Khối trụ',
          text: 'Khối trụ có hai mặt tròn phẳng ở hai đầu và một mặt cong bao quanh.',
        },
        {
          type: 'p',
          text: 'Lon nước ngọt, lon sữa, cốc nước, ống nước và khúc gỗ tròn có dạng khối trụ.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Khối trụ đứng hay nằm thì vẫn là khối trụ. Ống nước nằm ngang cũng có dạng khối trụ.',
        },
      ],
    },
    {
      heading: 'Khối cầu',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Khối cầu',
          text: 'Khối cầu tròn đều về mọi phía. Nó chỉ có mặt cong, không có mặt phẳng nào.',
        },
        {
          type: 'p',
          text: 'Quả bóng, quả cam, viên bi và quả địa cầu có dạng khối cầu.',
        },
      ],
    },
    {
      heading: 'Tìm đồ vật',
      blocks: [
        {
          type: 'p',
          text: 'Em nhìn hình dạng của mỗi đồ vật rồi xếp vào đúng ô. Đừng nhìn màu sắc nhé.',
        },
        { type: 'widget', name: 'tim-do-vat' },
      ],
    },
    {
      heading: 'Xếp hộp dạng khối trụ',
      blocks: [
        {
          type: 'p',
          text: 'Các hộp dạng khối trụ xếp chồng lên nhau. Hàng trên cùng có 1 hộp, mỗi hàng dưới có thêm 1 hộp. Em thêm hàng rồi đếm số hộp.',
        },
        { type: 'widget', name: 'xep-hop' },
      ],
    },
  ],
  explore: {
    title: 'Xoay khối trụ, khối cầu',
    instruction:
      'Kéo khối, chạm nút mũi tên hoặc dùng phím mũi tên để xoay. Em nhìn mỗi khối từ ba phía: nhìn ngang, nhìn từ trên và nhìn từ dưới.',
  },
  examples: [
    {
      problem: 'Trong các vật: lon sữa, quả cam, hộp quà. Vật nào có dạng khối cầu?',
      steps: [
        'Lon sữa có hai mặt tròn phẳng ở hai đầu, nên có dạng khối trụ.',
        'Hộp quà có các mặt phẳng và các cạnh thẳng, nên không phải khối cầu.',
        'Quả cam tròn đều về mọi phía, nên có dạng khối cầu.',
      ],
      answer: 'Quả cam có dạng khối cầu.',
    },
    {
      problem:
        'Các hình xếp theo thứ tự: khối cầu, khối trụ, khối hộp chữ nhật, khối cầu, ? Khối nào thay vào dấu hỏi?',
      steps: [
        'Ba khối đầu là khối cầu, khối trụ, khối hộp chữ nhật.',
        'Sau đó ba khối ấy lặp lại, lại bắt đầu từ khối cầu.',
        'Sau khối cầu là khối trụ.',
      ],
      answer: 'Khối trụ.',
    },
    {
      problem: 'Các hộp dạng khối trụ xếp thành 3 hàng: 1 hộp, 2 hộp, 3 hộp. Có tất cả mấy hộp?',
      steps: ['Em cộng số hộp của từng hàng.', '1 + 2 + 3 = 6.'],
      answer: 'Có tất cả 6 hộp.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi khối với điều đúng về khối đó.',
      left: ['Khối trụ', 'Khối cầu'],
      right: [
        'Có hai mặt tròn phẳng ở hai đầu và một mặt cong',
        'Tròn đều về mọi phía, không có mặt phẳng',
        'Có 6 mặt đều là hình vuông',
      ],
      pairs: [
        [0, 0],
        [1, 1],
      ],
      hints: ['Em nhớ lại lúc xoay hai khối. Khối nào có mặt tròn phẳng?'],
      solution:
        'Khối trụ có hai mặt tròn phẳng ở hai đầu và một mặt cong. Khối cầu tròn đều về mọi phía, không có mặt phẳng.',
    },
    {
      type: 'choice',
      prompt: 'Vật nào có dạng khối cầu?',
      options: ['Quả bóng', 'Lon nước ngọt', 'Hộp quà'],
      answer: 0,
      hints: ['Vật nào tròn đều về mọi phía?'],
      solution:
        'Quả bóng có dạng khối cầu. Lon nước ngọt có dạng khối trụ, hộp quà có dạng khối hộp chữ nhật.',
    },
    {
      type: 'choice',
      prompt: 'Vật nào có dạng khối trụ?',
      options: ['Quả cam', 'Ống nước', 'Con xúc xắc'],
      answer: 1,
      hints: ['Vật nào có hai đầu là hai mặt tròn phẳng?'],
      solution:
        'Ống nước có dạng khối trụ. Quả cam có dạng khối cầu, con xúc xắc có dạng khối lập phương.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các vật có dạng khối trụ.',
      options: ['Lon sữa', 'Viên bi', 'Khúc gỗ', 'Cục pin', 'Quả bưởi'],
      answers: [0, 2, 3],
      hints: ['Tìm các vật có hai mặt tròn phẳng ở hai đầu. Có nhiều hơn một vật.'],
      solution:
        'Lon sữa, khúc gỗ và cục pin có dạng khối trụ. Viên bi và quả bưởi có dạng khối cầu.',
    },
    {
      type: 'count',
      prompt: 'Quả cam có dạng khối cầu. Có mấy quả cam?',
      picture: 'orange',
      answer: 6,
      choices: [5, 6, 7],
      hints: ['Em chỉ tay vào từng quả và đếm.'],
      solution: 'Có 6 quả cam.',
    },
    {
      type: 'choice',
      prompt:
        'Các khối xếp theo thứ tự: khối trụ, khối cầu, khối trụ, khối cầu, khối trụ, ? Khối nào thay vào dấu hỏi?',
      options: ['Khối cầu', 'Khối trụ', 'Khối lập phương'],
      answer: 0,
      hints: ['Hai khối đầu tiên lặp đi lặp lại. Sau khối trụ là khối nào?'],
      solution: 'Khối trụ và khối cầu lặp lại, nên sau khối trụ là khối cầu.',
    },
    {
      type: 'choice',
      prompt:
        'Khối cầu rơi vào ô có kết quả lớn nhất. Các ô là: 5 : 5, 2 × 1, 2 × 5, 5 × 1. Khối cầu rơi vào ô nào?',
      options: ['Ô 2 × 5', 'Ô 5 : 5', 'Ô 5 × 1', 'Ô 2 × 1'],
      answer: 0,
      hints: ['Em tính kết quả ở từng ô rồi so sánh.'],
      solution:
        '5 : 5 = 1, 2 × 1 = 2, 5 × 1 = 5, 2 × 5 = 10. Số lớn nhất là 10, nên khối cầu rơi vào ô 2 × 5.',
    },
    {
      type: 'choice',
      prompt:
        'Các hộp dạng khối trụ xếp thành 4 hàng: 1 hộp, 2 hộp, 3 hộp, 4 hộp. Có tất cả mấy hộp?',
      options: ['8 hộp', '10 hộp', '12 hộp'],
      answer: 1,
      hints: ['Em cộng số hộp của 4 hàng.'],
      solution: '1 + 2 + 3 + 4 = 10. Có tất cả 10 hộp.',
    },
  ],
  takeaways: [
    'Khối trụ có hai mặt tròn phẳng ở hai đầu và một mặt cong: lon sữa, ống nước.',
    'Khối cầu tròn đều về mọi phía: quả bóng, quả cam.',
    'Em nhìn hình dạng của vật, không nhìn màu sắc hay to nhỏ.',
  ],
};
