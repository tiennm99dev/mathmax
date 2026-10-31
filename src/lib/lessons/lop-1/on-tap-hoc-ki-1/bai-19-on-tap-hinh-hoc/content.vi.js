/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập hình học: hình vuông, hình tròn, hình tam giác, hình chữ nhật, khối lập phương, khối hộp chữ nhật và các từ chỉ vị trí trên, dưới, trái, phải, trước, sau, ở giữa.',
  intro:
    'Em đã làm quen với các hình phẳng, các hình khối và các vị trí. Hôm nay em ôn lại: gọi tên hình, đếm hình, tìm hình tiếp theo và nói vị trí của đồ vật nhé!',
  objectives: [
    'Nhận ra và gọi tên hình vuông, hình tròn, hình tam giác, hình chữ nhật.',
    'Nhận ra khối lập phương, khối hộp chữ nhật trong đồ vật quanh em.',
    'Đếm hình và tìm hình tiếp theo của một dãy hình.',
    'Nói đúng vị trí: trên, dưới, bên trái, bên phải, trước, sau, ở giữa.',
  ],
  sections: [
    {
      heading: 'Các hình phẳng',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Em nhớ'],
          rows: [
            ['Hình vuông', '4 cạnh dài bằng nhau'],
            ['Hình chữ nhật', '2 cạnh dài, 2 cạnh ngắn'],
            ['Hình tam giác', '3 cạnh'],
            ['Hình tròn', 'tròn đều, không có cạnh'],
          ],
        },
        {
          type: 'p',
          text: 'Mặt đồng hồ có dạng hình tròn. Bìa quyển vở có dạng hình chữ nhật.',
        },
        {
          type: 'p',
          text: 'Biển báo nguy hiểm có dạng hình tam giác. Viên gạch hoa có dạng hình vuông.',
        },
      ],
    },
    {
      heading: 'Khối lập phương, khối hộp chữ nhật',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Khối lập phương',
          text: 'Khối lập phương có 6 mặt đều là hình vuông to bằng nhau. Con xúc xắc có dạng khối lập phương.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Khối hộp chữ nhật',
          text: 'Khối hộp chữ nhật có 6 mặt, có mặt là hình chữ nhật. Hộp sữa, viên gạch có dạng khối hộp chữ nhật.',
        },
      ],
    },
    {
      heading: 'Vị trí',
      blocks: [
        {
          type: 'p',
          text: 'Quả bóng ở trên cái bàn. Con mèo ở dưới cái bàn.',
        },
        {
          type: 'p',
          text: 'Bên trái là phía tay trái của em khi em nhìn hình. Bên phải là phía tay phải của em.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Trong một hàng',
          text: 'Bạn đứng trước, bạn đứng sau. Bạn đứng ở giữa có một bạn ở bên này và một bạn ở bên kia.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập thông minh',
    instruction:
      'Mỗi bộ có 10 câu. Đầu tiên em làm thử mỗi phần một câu. Phần nào em làm sai, bài sẽ hỏi thêm phần đó. Bản đồ kĩ năng cho em biết phần nào đã vững, phần nào cần ôn lại.',
  },
  examples: [
    {
      problem:
        'Một hàng có các hình: hình tam giác, hình vuông, hình tam giác, hình tròn, hình tam giác. Có mấy hình tam giác?',
      steps: [
        'Hình tam giác có 3 cạnh.',
        'Em chỉ tay vào từng hình và chỉ đếm hình có 3 cạnh: một, hai, ba.',
      ],
      answer: 'Có 3 hình tam giác.',
    },
    {
      problem:
        'Dãy hình: hình tròn, hình vuông, hình tròn, hình vuông, hình tròn, ... Hình tiếp theo là hình gì?',
      steps: [
        'Em tìm nhóm hình lặp lại: hình tròn, hình vuông.',
        'Sau hình tròn luôn là hình vuông.',
      ],
      answer: 'Hình tiếp theo là hình vuông.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hình nào có 3 cạnh?',
      options: ['Hình vuông', 'Hình tam giác', 'Hình tròn'],
      answer: 1,
      hints: ['Hình tròn không có cạnh. Hình vuông có 4 cạnh.'],
      solution: 'Hình tam giác có 3 cạnh.',
    },
    {
      type: 'choice',
      prompt: 'Hình nào không có cạnh nào?',
      options: ['Hình chữ nhật', 'Hình tròn', 'Hình tam giác'],
      answer: 1,
      hints: ['Hình nào tròn đều như mặt đồng hồ?'],
      solution: 'Hình tròn không có cạnh nào.',
    },
    {
      type: 'choice',
      prompt: 'Hình nào có 4 cạnh dài bằng nhau?',
      options: ['Hình vuông', 'Hình chữ nhật', 'Hình tam giác'],
      answer: 0,
      hints: ['Hình chữ nhật có 2 cạnh dài và 2 cạnh ngắn.'],
      solution: 'Hình vuông có 4 cạnh dài bằng nhau.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đồ vật với hình dạng của nó.',
      left: ['Mặt đồng hồ', 'Bìa quyển vở', 'Biển báo nguy hiểm', 'Viên gạch hoa'],
      right: ['Hình tròn', 'Hình chữ nhật', 'Hình tam giác', 'Hình vuông'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em nhớ lại từng đồ vật: nó tròn hay có cạnh? Có mấy cạnh?'],
      solution:
        'Mặt đồng hồ: hình tròn. Bìa quyển vở: hình chữ nhật. Biển báo nguy hiểm: hình tam giác. Viên gạch hoa: hình vuông.',
    },
    {
      type: 'order',
      prompt: 'Xếp các hình theo số cạnh, từ ít đến nhiều.',
      items: ['Hình vuông', 'Hình tròn', 'Hình tam giác'],
      answer: [1, 2, 0],
      hints: ['Hình tròn có mấy cạnh?', 'Hình tam giác có 3 cạnh, hình vuông có 4 cạnh.'],
      solution: 'Hình tròn: 0 cạnh. Hình tam giác: 3 cạnh. Hình vuông: 4 cạnh.',
    },
    {
      type: 'choice',
      prompt: 'Em dùng que tính xếp một hình tam giác, mỗi cạnh một que. Em cần mấy que tính?',
      options: ['3', '4', '5'],
      answer: 0,
      hints: ['Hình tam giác có mấy cạnh?'],
      solution: 'Hình tam giác có 3 cạnh, nên em cần 3 que tính.',
    },
    {
      type: 'count',
      prompt: 'Có mấy khối lập phương?',
      picture: 'cube',
      answer: 6,
      choices: [3, 4, 5, 6, 7, 8],
      hints: ['Chạm vào từng khối và đếm to.'],
      solution: 'Đếm: một, hai, ba, bốn, năm, sáu. Có 6 khối lập phương.',
    },
    {
      type: 'choice',
      prompt: 'Con xúc xắc có dạng khối gì?',
      options: ['Khối lập phương', 'Khối hộp chữ nhật'],
      answer: 0,
      hints: ['Các mặt của con xúc xắc đều là hình vuông to bằng nhau.'],
      solution: 'Con xúc xắc có 6 mặt đều là hình vuông to bằng nhau. Nó có dạng khối lập phương.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các đồ vật có dạng khối hộp chữ nhật.',
      options: ['Hộp sữa', 'Con xúc xắc', 'Viên gạch', 'Quả bóng', 'Cái tủ'],
      answers: [0, 2, 4],
      hints: ['Quả bóng tròn, không có mặt phẳng nào.', 'Con xúc xắc là khối lập phương.'],
      solution:
        'Hộp sữa, viên gạch và cái tủ có dạng khối hộp chữ nhật. Con xúc xắc là khối lập phương. Quả bóng không phải hai khối đó.',
    },
    {
      type: 'choice',
      prompt:
        'Dãy hình: hình tam giác, hình tròn, hình tròn, hình tam giác, hình tròn, hình tròn, hình tam giác, ... Hình tiếp theo là hình gì?',
      options: ['Hình tam giác', 'Hình tròn', 'Hình vuông'],
      answer: 1,
      hints: ['Em tìm nhóm ba hình cứ lặp lại.'],
      solution:
        'Nhóm hình lặp lại là: hình tam giác, hình tròn, hình tròn. Sau hình tam giác là hình tròn.',
    },
    {
      type: 'choice',
      prompt: 'Quả bóng ở trên cái bàn. Con mèo ở dưới cái bàn. Con gì ở dưới cái bàn?',
      options: ['Quả bóng', 'Con mèo'],
      answer: 1,
      hints: ['Em đọc lại câu thứ hai.'],
      solution: 'Con mèo ở dưới cái bàn.',
    },
    {
      type: 'choice',
      prompt:
        'Ba bạn đứng thành hàng ngang. Từ trái sang phải là: Mai, Nam, Hà. Bạn nào đứng ở giữa?',
      options: ['Mai', 'Nam', 'Hà'],
      answer: 1,
      hints: ['Bạn ở giữa có một bạn ở bên trái và một bạn ở bên phải.'],
      solution: 'Nam có Mai ở bên trái và Hà ở bên phải, nên Nam đứng ở giữa.',
    },
    {
      type: 'choice',
      prompt: 'Xếp hàng vào lớp, An đứng trước Bình. Vậy Bình đứng ở đâu?',
      options: ['Trước An', 'Sau An'],
      answer: 1,
      hints: ['An đứng trước thì Bình đứng phía nào của An?'],
      solution: 'An đứng trước Bình, nên Bình đứng sau An.',
    },
  ],
  takeaways: [
    'Hình vuông có 4 cạnh bằng nhau, hình chữ nhật có 2 cạnh dài và 2 cạnh ngắn, hình tam giác có 3 cạnh, hình tròn không có cạnh.',
    'Khối lập phương có 6 mặt là hình vuông bằng nhau. Hộp sữa, viên gạch có dạng khối hộp chữ nhật.',
    'Em dùng các từ trên, dưới, bên trái, bên phải, trước, sau, ở giữa để nói vị trí.',
  ],
};
