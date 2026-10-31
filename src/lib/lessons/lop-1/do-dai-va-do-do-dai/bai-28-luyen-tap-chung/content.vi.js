/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn lại chủ đề độ dài: so sánh dài hơn, ngắn hơn, cao hơn, thấp hơn, đo bằng gang tay, bước chân, đo bằng thước theo xăng-ti-mét và giải bài toán thực tế.',
  intro:
    'Em đã biết so sánh độ dài và đo bằng thước. Hôm nay em luyện tập lại và giải vài bài toán nhỏ về độ dài nhé!',
  objectives: [
    'So sánh độ dài, chiều cao của các đồ vật, các bạn.',
    'Đọc số đo trên thước có vạch chia xăng-ti-mét.',
    'So sánh hai độ dài cho bằng số xăng-ti-mét.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'So sánh trực tiếp',
          text: 'Đặt hai đồ vật cạnh nhau, một đầu thẳng hàng. Đồ vật thò ra xa hơn thì dài hơn.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Xăng-ti-mét',
          text: 'Xăng-ti-mét viết tắt là cm. Đo bằng thước: vạch 0 thẳng với một đầu, đọc số ở đầu kia.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'So sánh số đo',
          text: 'Hai đồ vật đã đo bằng cm: số đo lớn hơn thì đồ vật dài hơn. 12 cm dài hơn 9 cm.',
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
            ['Cái nào dài hơn, ngắn hơn?', 'so sánh hai số đo'],
            ['Cái nào dài nhất, ngắn nhất?', 'tìm số lớn nhất, bé nhất'],
            ['Đồ vật dài mấy cm?', 'đọc số ở đầu kia trên thước'],
          ],
        },
        {
          type: 'p',
          text: 'Nhớ viết đơn vị cm sau số đo: viết 8 cm, không viết 8.',
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
      problem: 'Bút chì dài 15 cm, thước kẻ dài 20 cm, cục tẩy dài 4 cm. Đồ vật nào dài nhất?',
      steps: ['Em so sánh ba số 15, 20 và 4.', 'Số lớn nhất là 20.'],
      answer: 'Thước kẻ dài nhất.',
    },
    {
      problem:
        'Vạch 0 của thước thẳng với một đầu chiếc lá. Đầu kia thẳng với vạch 7. Chiếc lá dài bao nhiêu?',
      steps: ['Vạch 0 đã đặt đúng.', 'Đầu kia ở vạch 7.'],
      answer: 'Chiếc lá dài 7 cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Hai sợi dây đặt thẳng hàng ở đầu bên trái. Dây vàng thò ra xa hơn dây tím. Dây nào ngắn hơn?',
      options: ['Dây vàng', 'Dây tím'],
      answer: 1,
      hints: ['Dây thò ra xa hơn thì dài hơn. Dây kia thì sao?'],
      solution: 'Dây vàng dài hơn nên dây tím ngắn hơn.',
    },
    {
      type: 'choice',
      prompt: 'Hươu cao cổ, con voi và con thỏ đứng trên cùng mặt đất. Con nào thấp nhất?',
      options: ['Hươu cao cổ', 'Con voi', 'Con thỏ'],
      answer: 2,
      hints: ['Con vật nào bé nhất trong ba con?'],
      solution: 'Con thỏ thấp nhất.',
    },
    {
      type: 'number',
      prompt:
        'Vạch 0 của thước thẳng với một đầu chiếc bút. Đầu kia thẳng với vạch 13. Chiếc bút dài mấy xăng-ti-mét?',
      answer: 13,
      unit: 'cm',
      hints: ['Đọc số ở đầu kia của chiếc bút.'],
      solution: 'Đầu kia ở vạch 13, nên chiếc bút dài 13 cm.',
    },
    {
      type: 'choice',
      prompt: 'Bạn Hà đặt vạch 1 của thước thẳng với đầu cục tẩy. Bạn Hà đặt thước đúng chưa?',
      options: ['Đúng rồi', 'Chưa đúng, phải đặt vạch 0'],
      answer: 1,
      hints: ['Đo bắt đầu từ vạch nào?'],
      solution: 'Chưa đúng. Phải đặt vạch 0 thẳng với một đầu cục tẩy.',
    },
    {
      type: 'choice',
      prompt: 'Sợi dây đỏ dài 9 cm, sợi dây xanh dài 14 cm. Sợi dây nào dài hơn?',
      options: ['Dây đỏ', 'Dây xanh'],
      answer: 1,
      hints: ['So sánh 9 và 14.'],
      solution: '14 > 9 nên dây xanh dài hơn dây đỏ.',
    },
    {
      type: 'order',
      prompt: 'Xếp các đồ vật từ ngắn nhất đến dài nhất.',
      items: ['Thước kẻ 20 cm', 'Cục tẩy 4 cm', 'Bút chì 15 cm', 'Kẹp giấy 3 cm'],
      answer: [3, 1, 2, 0],
      hints: ['So sánh các số 20, 4, 15, 3.', 'Số bé nhất là 3.'],
      solution: 'Kẹp giấy 3 cm, cục tẩy 4 cm, bút chì 15 cm, thước kẻ 20 cm.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đồ vật với độ dài hợp lí.',
      left: ['Cục tẩy', 'Bút chì', 'Bảng lớp học'],
      right: ['4 cm', '17 cm', 'khoảng 6 bước chân'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Đồ vật nhỏ nhất có số đo bé nhất.', 'Cái bảng rất dài, đo bằng bước chân.'],
      solution: 'Cục tẩy: 4 cm. Bút chì: 17 cm. Bảng lớp học: khoảng 6 bước chân.',
    },
    {
      type: 'choice',
      prompt:
        'Nam đo bàn được 5 gang tay. Mẹ đo cùng cái bàn được 4 gang tay. Gang tay của ai ngắn hơn?',
      options: ['Bạn Nam', 'Mẹ'],
      answer: 0,
      hints: ['Gang tay ngắn hơn thì phải đặt nhiều lần hơn.'],
      solution: 'Nam đặt nhiều gang tay hơn, nên gang tay của Nam ngắn hơn.',
    },
    {
      type: 'number',
      prompt:
        'Thước kẻ dài 20 cm, bút chì dài 15 cm, cục tẩy dài 4 cm. Đồ vật ngắn nhất dài mấy xăng-ti-mét?',
      answer: 4,
      unit: 'cm',
      hints: ['Tìm số bé nhất trong 20, 15, 4.'],
      solution: 'Số bé nhất là 4. Cục tẩy ngắn nhất, dài 4 cm.',
    },
    {
      type: 'choice',
      prompt: 'Bông hoa đỏ cao 12 cm, bông hoa vàng cao 21 cm. Bông nào thấp hơn?',
      options: ['Bông hoa đỏ', 'Bông hoa vàng'],
      answer: 0,
      hints: ['So sánh 12 và 21: hàng chục số nào bé hơn?'],
      solution: '12 < 21 nên bông hoa đỏ thấp hơn bông hoa vàng.',
    },
    {
      type: 'count',
      prompt:
        'Em có các khối vuông dưới đây, mỗi khối dài 1 cm. Em xếp tất cả thành một hàng thẳng, các khối sát nhau. Hàng khối dài mấy xăng-ti-mét?',
      picture: 'block',
      answer: 6,
      choices: [4, 5, 6, 7, 8],
      hints: ['Đếm từng khối vuông.', 'Mỗi khối dài 1 cm, có bao nhiêu khối thì dài bấy nhiêu cm.'],
      solution: 'Có 6 khối vuông, mỗi khối dài 1 cm, nên hàng khối dài 6 cm.',
    },
  ],
  takeaways: [
    'So sánh trực tiếp: một đầu thẳng hàng, nhìn đầu kia.',
    'Đo bằng thước: vạch 0 thẳng với một đầu, đọc số ở đầu kia.',
    'Số đo lớn hơn thì dài hơn (hoặc cao hơn).',
    'Viết đơn vị cm sau số đo.',
  ],
};
