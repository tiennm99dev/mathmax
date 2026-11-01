/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về điểm, đoạn thẳng, đường thẳng, đường cong, ba điểm thẳng hàng, đường gấp khúc và hình tứ giác.',
  intro:
    'Em đã biết đoạn thẳng, đường cong, ba điểm thẳng hàng, đường gấp khúc và hình tứ giác. Hôm nay em ôn lại tất cả và giúp ốc sên tính đường đi nhé!',
  objectives: [
    'Gọi tên đoạn thẳng, nhận biết đường thẳng và đường cong.',
    'Nhận biết ba điểm thẳng hàng.',
    'Đếm số hình tứ giác trong hình.',
    'Tính độ dài đường gấp khúc trong bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'table',
          head: ['Tên', 'Nhận biết'],
          rows: [
            ['Đoạn thẳng', 'Thẳng, dừng lại ở hai điểm'],
            ['Đường thẳng', 'Thẳng, kéo dài về hai phía'],
            ['Đường cong', 'Uốn cong, không thẳng'],
            ['Ba điểm thẳng hàng', 'Cùng nằm trên một đường thẳng'],
            ['Hình tứ giác', 'Khép kín, có 4 cạnh và 4 đỉnh'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Độ dài đường gấp khúc',
          text: 'Em cộng độ dài tất cả các đoạn thẳng của đường gấp khúc.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ quên',
          text: 'Ba điểm M, N, P thẳng hàng có tất cả ba đoạn thẳng: MN, NP và MP. Đừng quên đoạn MP đi từ đầu đến cuối.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài tập trộn',
    instruction:
      'Nhìn hình rồi chạm vào đáp án. Sai lần đầu, em được gợi ý và làm lại. Hết bộ, em biết phần nào cần ôn và có thể làm bộ khác.',
  },
  examples: [
    {
      problem:
        'Ốc sên bò từ trường học qua sân bóng, qua thư viện rồi về nhà. Các đoạn đường dài 10 cm, 30 cm và 20 cm. Hỏi ốc sên bò tất cả bao nhiêu xăng-ti-mét?',
      steps: [
        'Đường ốc sên bò là một đường gấp khúc gồm ba đoạn thẳng.',
        'Em cộng độ dài ba đoạn: 10 + 30 + 20 = 60.',
        'Bài giải: Ốc sên bò tất cả là: 10 + 30 + 20 = 60 (cm).',
      ],
      answer: 'Đáp số: 60 cm.',
    },
    {
      problem: 'Ba điểm M, N, P thẳng hàng, điểm N ở giữa. Kể tên các đoạn thẳng có trong hình.',
      steps: [
        'Nối hai điểm cạnh nhau: đoạn thẳng MN và đoạn thẳng NP.',
        'Hai điểm M và P cũng là hai đầu của một đoạn thẳng: đoạn thẳng MP.',
      ],
      answer: 'Có ba đoạn thẳng: MN, NP, MP.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi hình với điều đúng về nó.',
      left: ['Đoạn thẳng AB', 'Đường thẳng CD', 'Đường cong x', 'Hình tứ giác'],
      right: [
        'Dừng lại ở hai điểm A và B',
        'Kéo dài về hai phía',
        'Uốn cong, không thẳng',
        'Khép kín, có 4 cạnh',
        'Khép kín, có 3 cạnh',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Đọc tên từng hình rồi nhớ lại hình đó trông thế nào.'],
      solution:
        'Đoạn thẳng AB dừng lại ở A và B. Đường thẳng CD kéo dài về hai phía. Đường cong x uốn cong. Hình tứ giác khép kín, có 4 cạnh.',
    },
    {
      type: 'choice',
      prompt: 'Ba điểm A, B, C thẳng hàng, điểm B ở giữa. Hình có mấy đoạn thẳng?',
      options: ['2 đoạn thẳng', '3 đoạn thẳng', '4 đoạn thẳng'],
      answer: 1,
      hints: ['Kể AB, BC. Còn đoạn nào đi từ đầu đến cuối?'],
      solution: 'Có ba đoạn thẳng: AB, BC và AC.',
    },
    {
      type: 'choice',
      prompt: 'Ba bạn Rô-bốt, Mi, Mai đứng cùng trên một đường thẳng. Câu nào đúng?',
      options: ['Ba bạn đứng thẳng hàng', 'Ba bạn không thẳng hàng', 'Hai bạn đứng trùng nhau'],
      answer: 0,
      hints: ['Cùng nằm trên một đường thẳng thì gọi là gì?'],
      solution: 'Ba bạn cùng ở trên một đường thẳng, nên đứng thẳng hàng.',
    },
    {
      type: 'choice',
      prompt: 'Vật nào có dạng đường cong?',
      options: ['Vành chiếc đĩa tròn', 'Mép cửa sổ', 'Chiếc thước kẻ'],
      answer: 0,
      hints: ['Vật nào uốn tròn, không thẳng?'],
      solution: 'Vành đĩa tròn uốn cong. Mép cửa sổ và thước kẻ đều thẳng.',
    },
    {
      type: 'choice',
      prompt:
        'Một tờ giấy hình chữ nhật được kẻ một đoạn thẳng chia thành hai hình chữ nhật nhỏ. Có tất cả mấy hình tứ giác?',
      options: ['2 hình', '3 hình', '4 hình'],
      answer: 1,
      hints: ['Đừng quên hình to gồm cả hai hình nhỏ.'],
      solution: 'Có 2 hình nhỏ và 1 hình to gồm cả hai hình nhỏ: 2 + 1 = 3 hình tứ giác.',
    },
    {
      type: 'choice',
      prompt: 'Đường gấp khúc ABC có AB dài 7 cm, BC dài 8 cm. Đường gấp khúc ABC dài bao nhiêu?',
      options: ['14 cm', '15 cm', '16 cm'],
      answer: 1,
      hints: ['Em cộng độ dài hai đoạn thẳng. Nhớ cộng có nhớ qua 10.'],
      solution: 'Độ dài đường gấp khúc ABC là: 7 + 8 = 15 (cm).',
    },
    {
      type: 'choice',
      prompt:
        'Đường gấp khúc EGHI có EG dài 6 cm, GH dài 9 cm, HI dài 5 cm. Đường gấp khúc EGHI dài bao nhiêu?',
      options: ['20 cm', '15 cm', '19 cm'],
      answer: 0,
      hints: ['Cộng ba độ dài: 6 + 9 trước, rồi cộng tiếp 5.'],
      solution: 'Độ dài đường gấp khúc EGHI là: 6 + 9 + 5 = 20 (cm).',
    },
    {
      type: 'order',
      prompt: 'Xếp các đường gấp khúc từ ngắn nhất đến dài nhất.',
      items: ['Đường gồm 2 cm và 3 cm', 'Đường gồm 4 cm và 5 cm', 'Đường gồm 1 cm và 2 cm'],
      answer: [2, 0, 1],
      hints: ['Tính độ dài mỗi đường trước, rồi so sánh.'],
      solution: 'Độ dài các đường là: 1 + 2 = 3 (cm), 2 + 3 = 5 (cm), 4 + 5 = 9 (cm).',
    },
    {
      type: 'choice',
      prompt: 'Vẽ đoạn thẳng dài 10 cm. Điểm đầu ở vạch 0 thì điểm cuối ở vạch nào?',
      options: ['Vạch 9', 'Vạch 10', 'Vạch 11'],
      answer: 1,
      hints: ['Độ dài bằng số ở vạch đầu kia khi đầu này ở vạch 0.'],
      solution: 'Điểm cuối ở vạch 10, đoạn thẳng dài 10 cm.',
    },
    {
      type: 'choice',
      prompt:
        'Kiến bò từ cửa hang qua hòn đá đến gốc cây. Đoạn đầu dài 25 cm, đoạn sau dài 15 cm. Kiến bò tất cả bao nhiêu xăng-ti-mét?',
      options: ['30 cm', '40 cm', '50 cm'],
      answer: 1,
      hints: ['Hai đoạn nối tiếp nhau. Em làm phép cộng.'],
      solution: 'Kiến bò tất cả là: 25 + 15 = 40 (cm). Đáp số: 40 cm.',
    },
  ],
  takeaways: [
    'Đoạn thẳng dừng ở hai điểm; đường thẳng kéo dài về hai phía; đường cong uốn cong.',
    'Ba điểm cùng nằm trên một đường thẳng là ba điểm thẳng hàng.',
    'Độ dài đường gấp khúc là tổng độ dài các đoạn thẳng. Hình tứ giác có 4 cạnh, 4 đỉnh.',
  ],
};
