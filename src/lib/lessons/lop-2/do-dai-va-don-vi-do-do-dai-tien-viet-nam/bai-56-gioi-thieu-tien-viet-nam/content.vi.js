/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhận biết các tờ tiền Việt Nam 100 đồng, 200 đồng, 500 đồng, 1000 đồng; đổi tiền đơn giản và chọn tờ tiền để trả đúng giá.',
  intro:
    'Đi mua kẹo, em cần có tiền. Tiền Việt Nam có đơn vị là đồng. Hôm nay em làm quen với các tờ tiền nhỏ và tập trả tiền cho đúng giá nhé!',
  objectives: [
    'Nhận biết các tờ tiền 100 đồng, 200 đồng, 500 đồng, 1000 đồng.',
    'Biết đơn vị tiền Việt Nam là đồng.',
    'Đổi tiền đơn giản giữa các tờ tiền.',
    'Chọn tờ tiền để trả đúng giá món hàng.',
  ],
  sections: [
    {
      heading: 'Các tờ tiền',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đơn vị của tiền Việt Nam',
          text: 'Đơn vị của tiền Việt Nam là đồng.',
        },
        { type: 'p', text: 'Mỗi tờ tiền có một con số, cho biết tờ tiền đó là bao nhiêu đồng.' },
        { type: 'widget', name: 'to-tien' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hình vẽ',
          text: 'Đây là hình vẽ để em học. Tờ tiền thật có màu và hình khác. Em nhìn con số trên tờ tiền để biết giá trị của nó.',
        },
      ],
    },
    {
      heading: 'Đổi tiền',
      blocks: [
        {
          type: 'p',
          text: 'Nhiều tờ nhỏ cộng lại có thể bằng một tờ lớn. Khi đó, em đổi được chúng cho nhau.',
        },
        {
          type: 'table',
          head: ['Các tờ nhỏ', 'Đổi được'],
          rows: [
            ['2 tờ 100 đồng', '1 tờ 200 đồng'],
            ['5 tờ 100 đồng', '1 tờ 500 đồng'],
            ['2 tờ 500 đồng', '1 tờ 1000 đồng'],
            ['5 tờ 200 đồng', '1 tờ 1000 đồng'],
          ],
        },
      ],
    },
    {
      heading: 'Dùng tiền',
      blocks: [
        {
          type: 'p',
          text: 'Món hàng giá bao nhiêu đồng thì em trả đủ bấy nhiêu đồng. Ví dụ: kẹo giá 1000 đồng, em trả 1 tờ 1000 đồng.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tiết kiệm',
          text: 'Bỏ tiền vào lợn đất là cách tiết kiệm. Em giữ gìn tờ tiền, không vò nát, không viết lên tiền.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cửa hàng và đổi tiền',
    instruction:
      '"Cửa hàng": chạm vào tờ tiền để đặt cho đủ giá món hàng, chạm vào tiền đã đặt để bỏ bớt. Giá trong trò chơi chỉ để tập tính. "Đổi tiền": chạm để đếm các tờ nhỏ cho đủ bằng tờ lớn.',
  },
  examples: [
    {
      problem: 'Bạn Mai mua kẹo hết 1000 đồng. Mai chọn tờ tiền nào để trả đúng giá?',
      steps: [
        'Giá kẹo là 1000 đồng.',
        'Em tìm tờ tiền có số 1000. Tờ 500 đồng và tờ 200 đồng đều ít hơn giá.',
      ],
      answer: 'Mai chọn tờ 1000 đồng.',
    },
    {
      problem: 'Em có 1 tờ 500 đồng và 2 tờ 100 đồng. Em có tất cả bao nhiêu đồng?',
      steps: ['2 tờ 100 đồng là: 100 + 100 = 200 (đồng).', 'Cả ba tờ là: 500 + 200 = 700 (đồng).'],
      answer: 'Em có 700 đồng.',
    },
  ],
  practice: [
    {
      type: 'count',
      picture: 'banknote',
      answer: 4,
      choices: [3, 4, 5],
      prompt: 'Có mấy tờ tiền?',
      hints: ['Em chỉ tay vào từng tờ tiền rồi đếm.'],
      solution: 'Đếm từng tờ: 1, 2, 3, 4. Có 4 tờ tiền.',
    },
    {
      type: 'choice',
      prompt: 'Đơn vị của tiền Việt Nam là gì?',
      options: ['đồng', 'mét', 'lít'],
      answer: 0,
      hints: ['Em nhìn dòng chữ dưới con số trên tờ tiền.'],
      solution: 'Đơn vị của tiền Việt Nam là đồng. Mét đo độ dài, lít đo dung tích.',
    },
    {
      type: 'match',
      prompt: 'Nối cách viết với cách đọc.',
      left: ['100 đồng', '200 đồng', '500 đồng', '1000 đồng'],
      right: ['một trăm đồng', 'hai trăm đồng', 'năm trăm đồng', 'một nghìn đồng'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Đọc số trước, rồi đọc "đồng".'],
      solution:
        '100 đồng: một trăm đồng. 200 đồng: hai trăm đồng. 500 đồng: năm trăm đồng. 1000 đồng: một nghìn đồng.',
    },
    {
      type: 'choice',
      prompt: 'Mua một cái kẹo giá 500 đồng. Em chọn một tờ tiền nào để trả đúng giá?',
      options: ['Tờ 100 đồng', 'Tờ 200 đồng', 'Tờ 500 đồng', 'Tờ 1000 đồng'],
      answer: 2,
      hints: ['Em tìm tờ tiền có con số bằng giá kẹo.'],
      solution: 'Kẹo giá 500 đồng, nên em trả tờ 500 đồng.',
    },
    {
      type: 'choice',
      prompt: '1 tờ 200 đồng đổi được mấy tờ 100 đồng?',
      options: ['1 tờ', '2 tờ', '5 tờ'],
      answer: 1,
      hints: ['Đếm theo 100: 100, 200. Em đếm được mấy lần?'],
      solution: '100 + 100 = 200. Vậy 1 tờ 200 đồng đổi được 2 tờ 100 đồng.',
    },
    {
      type: 'choice',
      prompt: '1 tờ 1000 đồng đổi được mấy tờ 500 đồng?',
      options: ['2 tờ', '5 tờ', '10 tờ'],
      answer: 0,
      hints: ['Cộng 500 + 500 xem được bao nhiêu.'],
      solution: '500 + 500 = 1000. Vậy 1 tờ 1000 đồng đổi được 2 tờ 500 đồng.',
    },
    {
      type: 'choice',
      prompt: 'Em có 2 tờ 200 đồng và 1 tờ 100 đồng. Em có tất cả bao nhiêu đồng?',
      options: ['300 đồng', '400 đồng', '500 đồng'],
      answer: 2,
      hints: ['2 tờ 200 đồng là bao nhiêu đồng? Sau đó cộng thêm 100 đồng.'],
      solution: '200 + 200 = 400. 400 + 100 = 500. Em có 500 đồng.',
    },
    {
      type: 'choice',
      prompt: 'Món đồ chơi giá 700 đồng. Em trả bằng những tờ tiền nào thì đúng giá?',
      options: [
        '1 tờ 500 đồng và 1 tờ 200 đồng',
        '1 tờ 500 đồng và 1 tờ 100 đồng',
        '2 tờ 500 đồng',
      ],
      answer: 0,
      hints: ['Em cộng số tiền của từng cách trả, xem cách nào được 700 đồng.'],
      solution: '500 + 200 = 700. Cách trả đúng là 1 tờ 500 đồng và 1 tờ 200 đồng.',
    },
    {
      type: 'order',
      prompt: 'Xếp các tờ tiền từ giá trị nhỏ nhất đến lớn nhất.',
      items: ['Tờ 500 đồng', 'Tờ 1000 đồng', 'Tờ 100 đồng', 'Tờ 200 đồng'],
      answer: [2, 3, 0, 1],
      hints: ['So sánh các số 500, 1000, 100 và 200.'],
      solution: '100 đồng < 200 đồng < 500 đồng < 1000 đồng.',
    },
  ],
  takeaways: [
    'Đơn vị của tiền Việt Nam là đồng.',
    'Các tờ tiền trong bài: 100 đồng, 200 đồng, 500 đồng, 1000 đồng.',
    'Muốn trả đúng giá, em cộng các tờ tiền cho bằng giá món hàng.',
  ],
};
