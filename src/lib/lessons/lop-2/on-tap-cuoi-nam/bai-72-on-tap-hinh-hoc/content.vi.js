/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập hình học lớp 2: đoạn thẳng, đường cong, hình tứ giác, khối trụ, khối cầu, ba điểm thẳng hàng, đo độ dài và tính độ dài đường gấp khúc.',
  intro:
    'Em đã làm quen với nhiều hình và nhiều khối. Hôm nay em đếm hình, đo đoạn thẳng và tìm đường ngắn hơn. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Đếm đoạn thẳng, đường cong và hình tứ giác.',
    'Nhận dạng khối trụ, khối cầu, khối hộp chữ nhật, khối lập phương.',
    'Nhận biết ba điểm thẳng hàng.',
    'Đo đoạn thẳng, tính độ dài đường gấp khúc.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Hình phẳng',
      blocks: [
        {
          type: 'table',
          head: ['Tên', 'Nhận biết'],
          rows: [
            ['Đoạn thẳng', 'Có hai đầu là hai điểm: đoạn thẳng AB'],
            ['Đường cong', 'Uốn lượn, không thẳng như mép thước'],
            ['Ba điểm thẳng hàng', 'Cùng nằm trên một đường thẳng'],
            ['Hình tứ giác', 'Khép kín, có 4 cạnh và 4 đỉnh'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ quên',
          text: 'Khi đếm hình, em đếm cả hình nhỏ lẫn hình ghép từ các hình nhỏ.',
        },
      ],
    },
    {
      heading: 'Hình khối',
      blocks: [
        {
          type: 'table',
          head: ['Khối', 'Đồ vật có dạng đó'],
          rows: [
            ['Khối trụ', 'Lon sữa, ống nước'],
            ['Khối cầu', 'Quả bóng, viên bi'],
            ['Khối hộp chữ nhật', 'Hộp quà, quyển sách'],
            ['Khối lập phương', 'Con xúc xắc'],
          ],
        },
      ],
    },
    {
      heading: 'Đo độ dài',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt vạch 0 của thước trùng với một đầu đoạn thẳng.',
            'Mép thước đi dọc theo đoạn thẳng.',
            'Đầu kia ở vạch nào thì đoạn thẳng dài bấy nhiêu xăng-ti-mét.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Độ dài đường gấp khúc',
          text: 'Em cộng độ dài tất cả các đoạn thẳng của đường gấp khúc.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập thông minh',
    instruction:
      'Mỗi bộ có 12 câu. Đầu tiên em làm mỗi phần một câu. Phần nào em làm sai, bài sẽ hỏi thêm phần đó. Bản đồ kĩ năng cho em biết phần nào đã vững, phần nào cần ôn lại.',
  },
  examples: [
    {
      problem:
        'Đường gấp khúc ABCD có AB dài 18 cm, BC dài 9 cm, CD dài 14 cm. Tính độ dài đường gấp khúc ABCD.',
      steps: ['Em cộng độ dài ba đoạn thẳng.', '18 + 9 = 27, 27 + 14 = 41.'],
      answer: 'Độ dài đường gấp khúc ABCD là 41 cm.',
    },
    {
      problem:
        'Ốc sên bò từ M đến N. Đường MAN gồm đoạn 12 cm và đoạn 27 cm. Đường MBN gồm đoạn 9 cm và đoạn 27 cm. Ốc sên nên đi đường nào?',
      steps: [
        'Đường MAN dài: 12 + 27 = 39 (cm).',
        'Đường MBN dài: 9 + 27 = 36 (cm).',
        '36 < 39, nên đường MBN ngắn hơn.',
      ],
      answer: 'Ốc sên nên đi đường MBN.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Có bốn điểm A, B, C, D. Em nối mỗi cặp điểm bằng một đoạn thẳng. Có tất cả mấy đoạn thẳng?',
      options: ['4 đoạn', '5 đoạn', '6 đoạn'],
      answer: 2,
      hints: ['Em kể tên: bắt đầu từ A có AB, AC, AD. Rồi đến B, rồi đến C.'],
      solution: 'Các đoạn thẳng là: AB, AC, AD, BC, BD, CD. Có 6 đoạn thẳng.',
    },
    {
      type: 'choice',
      prompt:
        'Một đoạn thẳng chia một hình chữ nhật thành 2 hình chữ nhật nhỏ. Có tất cả mấy hình tứ giác?',
      options: ['2 hình', '3 hình', '4 hình'],
      answer: 1,
      hints: ['Em đếm 2 phần nhỏ, rồi đừng quên hình chữ nhật lớn.'],
      solution:
        'Hình chữ nhật cũng là hình tứ giác. Có 2 hình nhỏ và 1 hình lớn: 2 + 1 = 3 hình tứ giác.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đồ vật với khối có dạng của nó.',
      left: ['Lon sữa', 'Quả bóng', 'Hộp quà', 'Con xúc xắc'],
      right: ['Khối trụ', 'Khối cầu', 'Khối hộp chữ nhật', 'Khối lập phương'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em nhớ lại hình dạng của từng đồ vật.'],
      solution:
        'Lon sữa có dạng khối trụ. Quả bóng có dạng khối cầu. Hộp quà có dạng khối hộp chữ nhật. Con xúc xắc có dạng khối lập phương.',
    },
    {
      type: 'multi',
      prompt: 'Những đồ vật nào có dạng khối trụ?',
      options: ['Lon nước ngọt', 'Quả cam', 'Ống nước', 'Quyển sách'],
      answers: [0, 2],
      hints: ['Khối trụ có thân tròn và hai mặt đáy tròn.'],
      solution:
        'Lon nước ngọt và ống nước có dạng khối trụ. Quả cam có dạng khối cầu. Quyển sách có dạng khối hộp chữ nhật.',
    },
    {
      type: 'choice',
      prompt:
        'Điểm E nằm trên đoạn thẳng AB. Điểm C nằm ngoài đường thẳng đi qua A và B. Ba điểm nào thẳng hàng?',
      options: ['A, E, B', 'A, B, C', 'E, B, C'],
      answer: 0,
      hints: ['Ba điểm thẳng hàng cùng nằm trên một đường thẳng.'],
      solution: 'E nằm trên đoạn thẳng AB nên ba điểm A, E, B thẳng hàng. Điểm C ở ngoài.',
    },
    {
      type: 'number',
      prompt:
        'Điểm B nằm giữa A và C. Đoạn thẳng AB dài 5 cm, đoạn thẳng BC dài 8 cm. Đoạn thẳng AC dài bao nhiêu xăng-ti-mét?',
      answer: 13,
      unit: 'cm',
      hints: ['Đoạn AC gồm đoạn AB và đoạn BC.'],
      solution: 'Độ dài đoạn thẳng AC là: 5 + 8 = 13 (cm).',
    },
    {
      type: 'number',
      prompt:
        'Đường gấp khúc MNPQ có MN dài 12 cm, NP dài 7 cm, PQ dài 6 cm. Đường gấp khúc MNPQ dài bao nhiêu xăng-ti-mét?',
      answer: 25,
      unit: 'cm',
      hints: ['Em cộng độ dài ba đoạn thẳng.'],
      solution: 'Độ dài đường gấp khúc MNPQ là: 12 + 7 + 6 = 25 (cm).',
    },
    {
      type: 'choice',
      prompt:
        'Kiến vàng đi đường gồm các đoạn 1 cm, 5 cm, 7 cm và 3 cm. Kiến đỏ đi đường gồm các đoạn 2 cm, 4 cm, 2 cm, 1 cm, 1 cm, 2 cm và 3 cm. Con kiến nào đi đường ngắn hơn?',
      options: ['Kiến vàng', 'Kiến đỏ'],
      answer: 1,
      hints: ['Em cộng các đoạn của từng con kiến, rồi so sánh.'],
      solution:
        'Kiến vàng: 1 + 5 + 7 + 3 = 16 (cm). Kiến đỏ: 2 + 4 + 2 + 1 + 1 + 2 + 3 = 15 (cm). Kiến đỏ đi đường ngắn hơn.',
    },
    {
      type: 'number',
      prompt: 'Cây cầu ABCD dài 160 m. Đoạn cầu BCD dài 110 m. Đoạn cầu AB dài bao nhiêu mét?',
      answer: 50,
      unit: 'm',
      hints: ['Cả cây cầu gồm đoạn AB và đoạn BCD. Em làm phép trừ.'],
      solution: 'Đoạn cầu AB dài là: 160 − 110 = 50 (m). Đáp số: 50 m.',
    },
    {
      type: 'order',
      prompt: 'Xếp các đường gấp khúc từ ngắn nhất đến dài nhất.',
      items: ['Đoạn 15 cm và đoạn 8 cm', 'Đoạn 9 cm và đoạn 9 cm', 'Đoạn 20 cm và đoạn 12 cm'],
      answer: [1, 0, 2],
      hints: ['Em tính độ dài mỗi đường, rồi so sánh.'],
      solution: 'Độ dài các đường là: 9 + 9 = 18 (cm), 15 + 8 = 23 (cm), 20 + 12 = 32 (cm).',
    },
    {
      type: 'choice',
      prompt: 'Rô-bốt muốn trồng 7 cây thành 3 hàng, mỗi hàng 3 cây. Cách nào làm được?',
      options: [
        'Ba hàng đi qua một cây chung ở giữa',
        'Ba hàng tách rời, không có cây chung',
        'Một hàng dài 7 cây',
      ],
      answer: 0,
      hints: [
        'Ba hàng tách rời cần 3 + 3 + 3 = 9 cây. Muốn bớt cây, các hàng phải dùng chung cây.',
      ],
      solution:
        'Mỗi hàng có cây chung và 2 cây riêng. Số cây là: 1 + 2 + 2 + 2 = 7 (cây). Ba hàng đi qua một cây chung ở giữa.',
    },
  ],
  takeaways: [
    'Đếm hình: đếm cả hình nhỏ lẫn hình ghép.',
    'Hình tứ giác có 4 cạnh, 4 đỉnh. Ba điểm cùng nằm trên một đường thẳng là thẳng hàng.',
    'Đo đoạn thẳng: đặt vạch 0 trùng với một đầu, đọc số ở đầu kia.',
    'Độ dài đường gấp khúc là tổng độ dài các đoạn thẳng.',
  ],
};
