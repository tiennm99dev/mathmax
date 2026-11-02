/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: đổi đơn vị km, m, dm, cm; chọn đơn vị phù hợp; cộng trừ số đo độ dài; đọc thước; dùng tiền Việt Nam và giải bài toán thực tế.',
  intro:
    'Em đã biết đề-xi-mét, mét, ki-lô-mét và các tờ tiền. Hôm nay em luyện đổi đơn vị, đọc thước, tính độ dài, dùng tiền và giải bài toán nhé!',
  objectives: [
    'Đổi đơn vị độ dài giữa km, m, dm và cm.',
    'Cộng, trừ các số đo độ dài cùng đơn vị.',
    'Tính độ dài đường gấp khúc trong bài toán thực tế.',
    'Cộng các tờ tiền, đổi tiền và trả đúng giá.',
  ],
  sections: [
    {
      heading: 'Nhớ lại đơn vị đo độ dài',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 dm = 10 cm. 1 m = 10 dm = 100 cm. 1 km = 1000 m.',
        },
        {
          type: 'p',
          text: 'Độ dài đường gấp khúc là tổng độ dài các đoạn thẳng của nó. Em cộng các số đo, rồi viết đơn vị sau kết quả.',
        },
      ],
    },
    {
      heading: 'Nhớ lại tiền Việt Nam',
      blocks: [
        {
          type: 'p',
          text: 'Các tờ tiền đã học: 100 đồng, 200 đồng, 500 đồng, 1000 đồng. Đơn vị của tiền Việt Nam là đồng.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đổi tiền',
          text: '5 tờ 100 đồng đổi được 1 tờ 500 đồng. 2 tờ 500 đồng đổi được 1 tờ 1000 đồng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài tập trộn',
    instruction:
      'Mỗi lần chơi có các câu trộn từ cả chủ đề. Chạm vào đáp án đúng. Sai lần đầu, em được gợi ý và làm lại. Hết bộ, em xem phần cần ôn và bấm làm bộ bài khác.',
  },
  examples: [
    {
      problem:
        'Cây cầu gỗ là đường gấp khúc ABCD. Đoạn AB dài 9 m, đoạn BC dài 5 m, đoạn CD dài 7 m. Cây cầu dài bao nhiêu mét?',
      steps: [
        'Độ dài cây cầu là tổng độ dài ba đoạn.',
        'Em cộng: 9 + 5 = 14; 14 + 7 = 21.',
        'Bài giải: Cây cầu dài là: 9 + 5 + 7 = 21 (m).',
      ],
      answer: 'Đáp số: 21 m.',
    },
    {
      problem:
        'Nơi tham quan cách nhà Mi 50 km. Ô tô đã đi được 25 km. Hỏi còn bao nhiêu ki-lô-mét nữa thì đến nơi?',
      steps: [
        'Hỏi phần còn lại nên em làm phép trừ.',
        'Bài giải: Quãng đường còn lại là: 50 − 25 = 25 (km).',
      ],
      answer: 'Đáp số: 25 km.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối hai số đo bằng nhau.',
      left: ['2 m', '3 dm', '60 cm', '1 km'],
      right: ['20 dm', '30 cm', '6 dm', '1000 m', '600 dm'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['1 m = 10 dm. 1 dm = 10 cm. 1 km = 1000 m.'],
      solution: '2 m = 20 dm; 3 dm = 30 cm; 60 cm = 6 dm; 1 km = 1000 m.',
    },
    {
      type: 'choice',
      prompt: '4 m = ? cm',
      options: ['4 cm', '40 cm', '400 cm'],
      answer: 2,
      hints: ['1 m = 100 cm. Em đếm 100, 200, ... đủ 4 lần.'],
      solution: '1 m = 100 cm, nên 4 m = 400 cm.',
    },
    {
      type: 'choice',
      prompt:
        'Trên thước đo, vạch A là 10 dm, vạch B ở ngay sau vạch A và cách vạch A 1 dm. Vạch B là bao nhiêu?',
      options: ['9 dm', '11 dm', '20 dm'],
      answer: 1,
      hints: ['Đi tiếp 1 dm thì số trên thước lớn hơn 1.'],
      solution: '10 dm + 1 dm = 11 dm. Vạch B là 11 dm.',
    },
    {
      type: 'choice',
      prompt: '35 m + 12 m = ?',
      options: ['47 m', '23 m', '47 dm'],
      answer: 0,
      hints: ['Cộng 35 + 12, rồi giữ nguyên đơn vị m.'],
      solution: '35 + 12 = 47, nên 35 m + 12 m = 47 m.',
    },
    {
      type: 'choice',
      prompt: '80 km − 25 km = ?',
      options: ['65 km', '55 km', '105 km'],
      answer: 1,
      hints: ['Trừ 80 − 25, em có thể đặt tính cho chắc.'],
      solution: '80 − 25 = 55, nên 80 km − 25 km = 55 km.',
    },
    {
      type: 'choice',
      prompt: 'Cái cửa sổ rộng khoảng bao nhiêu?',
      options: ['1 m', '1 cm', '1 km'],
      answer: 0,
      hints: ['Cửa sổ rộng bằng khoảng hai tay em dang ra.'],
      solution: 'Cửa sổ rộng khoảng 1 m. 1 cm quá ngắn, 1 km quá dài.',
    },
    {
      type: 'choice',
      prompt:
        'Cây cầu là đường gấp khúc ABCD: AB dài 6 m, BC dài 8 m, CD dài 5 m. Cây cầu dài bao nhiêu mét?',
      options: ['14 m', '19 m', '21 m'],
      answer: 1,
      hints: ['Em cộng độ dài cả ba đoạn thẳng.'],
      solution: '6 + 8 + 5 = 19. Cây cầu dài 19 m.',
    },
    {
      type: 'choice',
      prompt: 'Nơi tham quan cách nhà 60 km. Ô tô đã đi được 35 km. Còn bao nhiêu ki-lô-mét nữa?',
      options: ['25 km', '35 km', '95 km'],
      answer: 0,
      hints: ['Phần còn lại: em lấy cả quãng đường trừ phần đã đi.'],
      solution: '60 − 35 = 25. Còn 25 km nữa.',
    },
    {
      type: 'count',
      picture: 'banknote',
      answer: 3,
      choices: [2, 3, 5],
      prompt: 'Có mấy tờ tiền?',
      hints: ['Em chỉ tay vào từng tờ rồi đếm.'],
      solution: 'Đếm từng tờ: 1, 2, 3. Có 3 tờ tiền.',
    },
    {
      type: 'choice',
      prompt: 'Em có 1 tờ 500 đồng, 1 tờ 200 đồng và 1 tờ 100 đồng. Em có tất cả bao nhiêu đồng?',
      options: ['700 đồng', '800 đồng', '900 đồng'],
      answer: 1,
      hints: ['Em cộng 500 với 200, rồi cộng thêm 100.'],
      solution: '500 + 200 = 700. 700 + 100 = 800. Em có 800 đồng.',
    },
    {
      type: 'choice',
      prompt: '1 tờ 1000 đồng đổi được mấy tờ 200 đồng?',
      options: ['2 tờ', '5 tờ', '10 tờ'],
      answer: 1,
      hints: ['Đếm theo 200: 200, 400, ... đến 1000. Em đếm được mấy lần?'],
      solution: '200 + 200 + 200 + 200 + 200 = 1000. Đổi được 5 tờ 200 đồng.',
    },
    {
      type: 'order',
      prompt: 'Xếp các độ dài từ ngắn nhất đến dài nhất.',
      items: ['2 m', '15 cm', '5 dm', '1 km'],
      answer: [1, 2, 0, 3],
      hints: ['Đổi cho cùng là cm: 5 dm = 50 cm; 2 m = 200 cm. 1 km rất dài.'],
      solution: '15 cm < 5 dm < 2 m < 1 km.',
    },
  ],
  takeaways: [
    '1 dm = 10 cm. 1 m = 10 dm = 100 cm. 1 km = 1000 m.',
    'Cộng, trừ số đo cùng đơn vị như cộng, trừ các số, rồi viết đơn vị sau kết quả.',
    'Độ dài đường gấp khúc là tổng độ dài các đoạn thẳng.',
    'Cộng các tờ tiền để biết có bao nhiêu đồng, trả đủ đúng giá món hàng.',
  ],
};
