/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn lại chủ đề làm quen với một số hình phẳng: gọi tên và đếm hình vuông, hình tròn, hình tam giác, hình chữ nhật, tìm hình trong đồ vật, ghép hình và xếp que tính.',
  intro:
    'Em đã biết hình vuông, hình tròn, hình tam giác, hình chữ nhật. Em cũng đã ghép hình và xếp que tính. Hôm nay em luyện tập lại tất cả nhé!',
  objectives: [
    'Gọi đúng tên hình vuông, hình tròn, hình tam giác, hình chữ nhật.',
    'Đếm số hình mỗi loại trong một bức tranh.',
    'Tìm hình trong đồ vật, ghép hình và xếp que tính.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Em nhận ra nhờ'],
          rows: [
            ['Hình vuông ■', '4 cạnh dài bằng nhau'],
            ['Hình tròn ●', 'tròn đều, không có cạnh'],
            ['Hình tam giác ▲', '3 cạnh'],
            ['Hình chữ nhật ▬', '2 cạnh dài, 2 cạnh ngắn'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đếm hình',
          text: 'Em chỉ đếm hình cần tìm. Chạm vào từng hình, mỗi hình đếm một lần.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Xếp que tính',
          text: 'Mỗi que tính là một cạnh. Hình tam giác cần 3 que, hình vuông cần 4 que.',
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
      problem: 'Trong tranh có: ■ ▲ ● ■ ▬ ■ ▲. Có mấy hình vuông?',
      steps: [
        'Hình vuông có 4 cạnh dài bằng nhau, như ■.',
        'Hình ▬ dài hơn: đó là hình chữ nhật, em không đếm.',
        'Đếm các hình ■: một, hai, ba.',
      ],
      answer: 'Có 3 hình vuông.',
    },
    {
      problem:
        'Ngôi nhà xếp bằng que tính: mái nhà 2 que, thân nhà là hình vuông. Có mấy que tính?',
      steps: [
        'Thân nhà là hình vuông, có 4 que.',
        'Mái nhà có thêm 2 que.',
        'Đếm tất cả: một, hai, ba, bốn, năm, sáu.',
      ],
      answer: 'Có 6 que tính.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hình ■ là hình gì?',
      options: ['Hình vuông', 'Hình tròn', 'Hình tam giác', 'Hình chữ nhật'],
      answer: 0,
      hints: ['Hình có 4 cạnh dài bằng nhau.'],
      solution: '■ có 4 cạnh dài bằng nhau, đó là hình vuông.',
    },
    {
      type: 'choice',
      prompt: 'Hình ▬ là hình gì?',
      options: ['Hình vuông', 'Hình tròn', 'Hình tam giác', 'Hình chữ nhật'],
      answer: 3,
      hints: ['Hình có 2 cạnh dài và 2 cạnh ngắn.'],
      solution: '▬ có 2 cạnh dài và 2 cạnh ngắn, đó là hình chữ nhật.',
    },
    {
      type: 'choice',
      prompt: 'Có mấy hình tam giác: ▲ ● ▲ ▲ ■ ▲ ● ?',
      options: ['2', '3', '4', '5'],
      answer: 2,
      hints: ['Em chỉ đếm hình ▲.', 'Chạm vào từng hình ▲ và đếm to.'],
      solution: 'Đếm các hình ▲: một, hai, ba, bốn. Có 4 hình tam giác.',
    },
    {
      type: 'choice',
      prompt: 'Có mấy hình tròn: ● ■ ▲ ● ▬ ?',
      options: ['1', '2', '3'],
      answer: 1,
      hints: ['Hình tròn không có cạnh, như ●.'],
      solution: 'Đếm các hình ●: một, hai. Có 2 hình tròn.',
    },
    {
      type: 'count',
      prompt: 'Mỗi tờ tiền có dạng hình chữ nhật. Có mấy hình chữ nhật?',
      picture: 'banknote',
      answer: 5,
      choices: [3, 4, 5, 6],
      hints: ['Đếm từng tờ tiền, mỗi tờ một lần.'],
      solution: 'Đếm: một, hai, ba, bốn, năm. Có 5 hình chữ nhật.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đồ vật với hình của nó.',
      left: ['Đồng xu', 'Ô cửa sổ', 'Cờ đuôi nheo', 'Cánh cửa'],
      right: ['Hình tròn', 'Hình vuông', 'Hình tam giác', 'Hình chữ nhật'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Cờ đuôi nheo có 3 cạnh.', 'Cánh cửa cao, có 2 cạnh dài và 2 cạnh ngắn.'],
      solution:
        'Đồng xu: hình tròn. Ô cửa sổ: hình vuông. Cờ đuôi nheo: hình tam giác. Cánh cửa: hình chữ nhật.',
    },
    {
      type: 'multi',
      prompt: 'Những hình nào có 4 cạnh?',
      options: ['Hình vuông', 'Hình tròn', 'Hình tam giác', 'Hình chữ nhật'],
      answers: [0, 3],
      hints: ['Em đếm số cạnh của từng hình.', 'Hình tròn không có cạnh, hình tam giác có 3 cạnh.'],
      solution: 'Hình vuông và hình chữ nhật đều có 4 cạnh.',
    },
    {
      type: 'choice',
      prompt: 'Hình vuông xoay nghiêng đi thì là hình gì?',
      options: ['Vẫn là hình vuông', 'Hình tam giác', 'Hình tròn'],
      answer: 0,
      hints: ['Xoay hình đi, số cạnh có thay đổi không?'],
      solution: 'Xoay hình đi, hình vẫn có 4 cạnh dài bằng nhau. Đó vẫn là hình vuông.',
    },
    {
      type: 'choice',
      prompt: 'Cần mấy que tính để xếp 1 hình vuông?',
      options: ['3', '4', '5'],
      answer: 1,
      hints: ['Hình vuông có mấy cạnh?', 'Mỗi cạnh là 1 que.'],
      solution: 'Hình vuông có 4 cạnh, nên cần 4 que tính.',
    },
    {
      type: 'choice',
      prompt: 'Cắt đôi một hình vuông thành 2 hình tam giác. Ghép lại, em được hình gì?',
      options: ['Hình tròn', 'Hình vuông', 'Hình chữ nhật'],
      answer: 1,
      hints: ['Hai nửa ghép lại thành hình ban đầu.'],
      solution: 'Hai nửa của hình vuông ghép lại được hình vuông.',
    },
    {
      type: 'order',
      prompt: 'Xếp các hình theo số cạnh, từ ít đến nhiều: hình không có cạnh đứng đầu.',
      items: ['Hình vuông', 'Hình tam giác', 'Hình tròn'],
      answer: [2, 1, 0],
      hints: ['Hình tròn không có cạnh.', 'Hình tam giác có 3 cạnh, hình vuông có 4 cạnh.'],
      solution: 'Hình tròn (không có cạnh), hình tam giác (3 cạnh), hình vuông (4 cạnh).',
    },
  ],
  takeaways: [
    'Hình vuông: 4 cạnh dài bằng nhau. Hình chữ nhật: 2 cạnh dài, 2 cạnh ngắn.',
    'Hình tam giác: 3 cạnh. Hình tròn: không có cạnh.',
    'Đếm hình: chỉ đếm hình cần tìm, mỗi hình một lần.',
    'Xếp que tính: mỗi que là một cạnh.',
  ],
};
