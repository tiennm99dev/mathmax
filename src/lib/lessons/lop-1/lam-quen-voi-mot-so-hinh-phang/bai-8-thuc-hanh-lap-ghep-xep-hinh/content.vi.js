/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành ghép các mảnh hình tam giác, hình vuông, hình chữ nhật thành hình mới và xếp que tính thành hình tam giác, hình vuông, hình chữ nhật.',
  intro:
    'Từ những mảnh hình nhỏ, em có thể ghép thành hình vuông, ngôi nhà hay con thuyền. Với vài que tính, em xếp được hình tam giác, hình vuông. Mình cùng thực hành nhé!',
  objectives: [
    'Ghép các mảnh hình phẳng thành hình mới theo mẫu.',
    'Xếp que tính thành hình tam giác, hình vuông, hình chữ nhật.',
    'Gọi tên các hình có trong hình đã ghép.',
  ],
  sections: [
    {
      heading: 'Ghép hình',
      blocks: [
        {
          type: 'p',
          text: 'Em đặt các mảnh hình sát nhau, không chồng lên nhau, để được hình mới.',
        },
        {
          type: 'p',
          text: 'Cắt đôi một hình vuông theo đường chéo, em được 2 hình tam giác. Ghép 2 hình tam giác đó lại, em lại được hình vuông.',
        },
        {
          type: 'p',
          text: 'Hai hình vuông như nhau đặt cạnh nhau được một hình chữ nhật.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Mảnh chưa khớp, em xoay mảnh đó rồi thử lại.',
        },
      ],
    },
    {
      heading: 'Xếp que tính',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi que tính là một cạnh của hình.',
        },
        {
          type: 'table',
          head: ['Hình', 'Số que tính'],
          rows: [
            ['Hình tam giác', '3 que'],
            ['Hình vuông', '4 que'],
            ['Hình chữ nhật (cạnh dài 2 que, cạnh ngắn 1 que)', '6 que'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em nhớ nhé',
          text: 'Hình tam giác có 3 cạnh nên cần 3 que. Hình vuông có 4 cạnh nên cần 4 que.',
        },
      ],
    },
    {
      heading: 'Em tự làm',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: em tự ghép một bức tranh từ các mảnh hình và tự xếp hình bằng que tính.',
        },
        {
          type: 'list',
          items: [
            'Chuẩn bị: giấy màu, bút chì, thước, kéo (nhờ người lớn cắt giúp), keo dán và 10 que tính.',
            'Cắt các mảnh: hình vuông, hình tam giác, hình chữ nhật, hình tròn.',
            'Ghép các mảnh thành ngôi nhà, con thuyền hoặc con cá rồi dán lên giấy.',
            'Dùng que tính xếp 1 hình tam giác và 1 hình vuông.',
          ],
          ordered: true,
        },
        {
          type: 'p',
          text: 'Kể cho cả lớp: em ghép được hình gì? Em dùng mấy hình tam giác, mấy hình vuông?',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng ghép hình',
    instruction:
      'Kéo các mảnh ở dưới vào hình mẫu nét đứt. Chạm vào mảnh rồi bấm "Xoay" để xoay mảnh. Có thể dùng phím mũi tên để di chuyển và phím R để xoay. Ghép xong, em chọn hình tiếp theo.',
  },
  examples: [
    {
      problem: 'Ghép 2 hình tam giác, mỗi hình là một nửa hình vuông, thành 1 hình vuông.',
      steps: [
        'Đặt hình tam giác thứ nhất vào hình mẫu.',
        'Xoay hình tam giác thứ hai cho cạnh dài nhất áp sát cạnh dài nhất của hình thứ nhất.',
        'Hai mảnh khít nhau, không có chỗ trống.',
      ],
      answer: 'Hai hình tam giác ghép được một hình vuông.',
    },
    {
      problem: 'Cần mấy que tính để xếp 1 hình vuông?',
      steps: ['Hình vuông có 4 cạnh.', 'Mỗi cạnh là 1 que tính.'],
      answer: 'Cần 4 que tính.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cần mấy que tính để xếp 1 hình tam giác?',
      options: ['2', '3', '4'],
      answer: 1,
      hints: ['Hình tam giác có mấy cạnh?', 'Mỗi cạnh là 1 que tính.'],
      solution: 'Hình tam giác có 3 cạnh, nên cần 3 que tính.',
    },
    {
      type: 'choice',
      prompt: 'Ghép 2 hình vuông như nhau cạnh nhau, em được hình gì?',
      options: ['Hình tròn', 'Hình tam giác', 'Hình chữ nhật'],
      answer: 2,
      hints: ['Hình mới dài hơn, có 2 cạnh dài và 2 cạnh ngắn.'],
      solution: 'Hai hình vuông đặt cạnh nhau được một hình chữ nhật.',
    },
    {
      type: 'multi',
      prompt: 'Ngôi nhà ▲ trên ■ được ghép từ những hình nào?',
      options: ['Hình vuông', 'Hình tròn', 'Hình tam giác', 'Hình chữ nhật'],
      answers: [0, 2],
      hints: ['Mái nhà ▲ là hình gì?', 'Thân nhà ■ là hình gì?'],
      solution: 'Mái nhà là hình tam giác, thân nhà là hình vuông.',
    },
    {
      type: 'choice',
      prompt:
        'Em cắt đôi một hình vuông thành 2 hình tam giác. Ghép 2 hình tam giác đó lại, em được hình nào?',
      options: ['Hình vuông', 'Hình tròn'],
      answer: 0,
      hints: ['Hình tròn không có cạnh, nên không ghép được từ hình tam giác.'],
      solution: 'Hai nửa của hình vuông ghép lại được đúng hình vuông ban đầu.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hình với số que tính cần để xếp hình đó.',
      left: ['Hình tam giác', 'Hình vuông', 'Hình chữ nhật (cạnh dài 2 que)'],
      right: ['3 que', '4 que', '6 que'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Đếm số cạnh của mỗi hình.',
        'Hình chữ nhật: 2 cạnh dài, mỗi cạnh 2 que; 2 cạnh ngắn, mỗi cạnh 1 que.',
      ],
      solution: 'Hình tam giác: 3 que. Hình vuông: 4 que. Hình chữ nhật: 2 + 2 + 1 + 1 = 6 que.',
    },
    {
      type: 'choice',
      prompt: 'Em có 5 que tính. Em xếp được hình nào?',
      options: ['1 hình vuông', '2 hình vuông', '2 hình tam giác rời nhau'],
      answer: 0,
      hints: ['Hình vuông cần 4 que, hình tam giác cần 3 que.', '2 hình vuông rời nhau cần 8 que.'],
      solution:
        '1 hình vuông cần 4 que, em có 5 que nên xếp được. 2 hình vuông rời nhau cần 8 que, 2 hình tam giác rời nhau cần 6 que: không đủ.',
    },
  ],
  takeaways: [
    'Ghép các mảnh sát nhau, không chồng lên nhau, để được hình mới.',
    'Mảnh chưa khớp thì xoay mảnh rồi thử lại.',
    '2 nửa hình vuông (hình tam giác) ghép được hình vuông; 2 hình vuông như nhau ghép được hình chữ nhật.',
    'Xếp que tính: hình tam giác 3 que, hình vuông 4 que.',
  ],
};
