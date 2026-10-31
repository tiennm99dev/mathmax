/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhận dạng hình vuông, hình tròn, hình tam giác, hình chữ nhật và tìm các đồ vật quanh em có dạng những hình đó.',
  intro:
    'Mặt đồng hồ, quyển vở, lá cờ đuôi nheo, chiếc bánh chưng. Mỗi đồ vật có dạng một hình. Hôm nay em làm quen với hình vuông, hình tròn, hình tam giác và hình chữ nhật nhé!',
  objectives: [
    'Nhận ra hình vuông, hình tròn, hình tam giác, hình chữ nhật.',
    'Gọi đúng tên các hình.',
    'Tìm được đồ vật quanh em có dạng các hình đó.',
  ],
  sections: [
    {
      heading: 'Bốn hình',
      blocks: [
        { type: 'widget', name: 'hinh-mau' },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình vuông ■',
          text: 'Hình vuông có 4 cạnh dài bằng nhau.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình tròn ●',
          text: 'Hình tròn tròn đều, không có cạnh nào.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình tam giác ▲',
          text: 'Hình tam giác có 3 cạnh.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình chữ nhật ▬',
          text: 'Hình chữ nhật có 2 cạnh dài và 2 cạnh ngắn.',
        },
      ],
    },
    {
      heading: 'Hình to, hình nhỏ, hình xoay',
      blocks: [
        {
          type: 'p',
          text: 'Một hình có thể to hoặc nhỏ, màu đỏ hay màu xanh.',
        },
        {
          type: 'p',
          text: 'Khi em xoay hình đi, hình vẫn giữ tên của nó.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em nhớ nhé',
          text: 'Muốn biết tên hình, em nhìn hình dạng. Không nhìn màu, không nhìn to hay nhỏ.',
        },
      ],
    },
    {
      heading: 'Tìm hình quanh em',
      blocks: [
        {
          type: 'p',
          text: 'Nhiều đồ vật quanh em có dạng các hình này.',
        },
        {
          type: 'table',
          head: ['Đồ vật', 'Có dạng'],
          rows: [
            ['Mặt đồng hồ, đồng xu, cái đĩa', 'hình tròn'],
            ['Mặt bánh chưng, ô cửa sổ, viên gạch hoa', 'hình vuông'],
            ['Biển báo nguy hiểm, cờ đuôi nheo, thước ê ke', 'hình tam giác'],
            ['Quyển vở, cánh cửa, lá cờ Tổ quốc', 'hình chữ nhật'],
          ],
        },
        {
          type: 'p',
          text: 'Em hãy nhìn quanh lớp học. Mặt bảng có dạng hình gì?',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp hình vào đúng ô',
    instruction:
      'Chạm vào một thẻ, rồi chạm vào ô hình đúng để đặt thẻ vào. Thẻ sai hiện gợi ý, em chạm vào thẻ để lấy lại. Chọn "Các hình" để xếp các hình to, nhỏ, xoay nghiêng.',
  },
  examples: [
    {
      problem: 'Mặt đồng hồ có dạng hình gì?',
      steps: [
        'Em nhìn mặt đồng hồ: nó tròn đều, không có cạnh nào.',
        'Hình tròn đều là hình tròn.',
      ],
      answer: 'Mặt đồng hồ có dạng hình tròn.',
    },
    {
      problem: 'Có mấy hình tam giác: ▲ ● ▲ ■ ▲ ▬?',
      steps: ['Hình tam giác có 3 cạnh, như ▲.', 'Em chạm vào từng hình ▲ và đếm: một, hai, ba.'],
      answer: 'Có 3 hình tam giác.',
    },
    {
      problem: 'Quyển vở và viên gạch hoa, đồ vật nào có dạng hình vuông?',
      steps: [
        'Quyển vở có 2 cạnh dài và 2 cạnh ngắn: đó là hình chữ nhật.',
        'Viên gạch hoa có 4 cạnh dài bằng nhau: đó là hình vuông.',
      ],
      answer: 'Viên gạch hoa có dạng hình vuông.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hình ● là hình gì?',
      options: ['Hình vuông', 'Hình tròn', 'Hình tam giác', 'Hình chữ nhật'],
      answer: 1,
      hints: ['Hình này tròn đều, không có cạnh nào.'],
      solution: '● là hình tròn.',
    },
    {
      type: 'choice',
      prompt: 'Hình ▲ là hình gì?',
      options: ['Hình vuông', 'Hình tròn', 'Hình tam giác', 'Hình chữ nhật'],
      answer: 2,
      hints: ['Em đếm số cạnh của hình.', 'Hình có 3 cạnh.'],
      solution: '▲ có 3 cạnh, đó là hình tam giác.',
    },
    {
      type: 'choice',
      prompt: 'Có mấy hình tròn: ● ■ ● ▲ ● ● ?',
      options: ['2', '3', '4', '5'],
      answer: 2,
      hints: ['Em chỉ đếm hình ●.', 'Chạm vào từng hình ● và đếm to.'],
      solution: 'Đếm các hình ●: một, hai, ba, bốn. Có 4 hình tròn.',
    },
    {
      type: 'choice',
      prompt: 'Có mấy hình vuông: ■ ▲ ■ ▬ ● ?',
      options: ['1', '2', '3'],
      answer: 1,
      hints: ['Hình vuông có 4 cạnh dài bằng nhau, như ■.', 'Hình ▬ dài hơn, đó là hình chữ nhật.'],
      solution: 'Có 2 hình ■. Hình ▬ là hình chữ nhật. Có 2 hình vuông.',
    },
    {
      type: 'count',
      prompt: 'Mỗi đồng xu có dạng hình tròn. Có mấy hình tròn?',
      picture: 'coin',
      answer: 6,
      choices: [4, 5, 6, 7],
      hints: ['Đếm từng đồng xu, mỗi đồng xu một lần.'],
      solution: 'Đếm: một, hai, ba, bốn, năm, sáu. Có 6 hình tròn.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đồ vật với hình của nó.',
      left: ['Mặt đồng hồ', 'Quyển vở', 'Biển báo nguy hiểm', 'Mặt bánh chưng'],
      right: ['Hình tròn', 'Hình chữ nhật', 'Hình tam giác', 'Hình vuông'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em nhớ lại hình của từng đồ vật.', 'Biển báo nguy hiểm có 3 cạnh.'],
      solution:
        'Mặt đồng hồ: hình tròn. Quyển vở: hình chữ nhật. Biển báo nguy hiểm: hình tam giác. Mặt bánh chưng: hình vuông.',
    },
    {
      type: 'multi',
      prompt: 'Những đồ vật nào có dạng hình tròn?',
      options: ['Đồng xu', 'Ô cửa sổ', 'Cái đĩa', 'Cánh cửa'],
      answers: [0, 2],
      hints: ['Đồ vật hình tròn thì tròn đều, không có cạnh.', 'Có hai đồ vật đúng.'],
      solution:
        'Đồng xu và cái đĩa có dạng hình tròn. Ô cửa sổ là hình vuông, cánh cửa là hình chữ nhật.',
    },
    {
      type: 'choice',
      prompt: 'Lá cờ Tổ quốc có dạng hình gì?',
      options: ['Hình vuông', 'Hình tam giác', 'Hình chữ nhật'],
      answer: 2,
      hints: ['Lá cờ có 4 cạnh.', 'Hai cạnh dài, hai cạnh ngắn.'],
      solution: 'Lá cờ Tổ quốc có 2 cạnh dài và 2 cạnh ngắn, nên có dạng hình chữ nhật.',
    },
  ],
  takeaways: [
    'Hình vuông ■ có 4 cạnh dài bằng nhau.',
    'Hình tròn ● tròn đều, không có cạnh.',
    'Hình tam giác ▲ có 3 cạnh.',
    'Hình chữ nhật ▬ có 2 cạnh dài, 2 cạnh ngắn.',
    'To hay nhỏ, màu gì, xoay thế nào, hình vẫn giữ tên của nó.',
  ],
};
