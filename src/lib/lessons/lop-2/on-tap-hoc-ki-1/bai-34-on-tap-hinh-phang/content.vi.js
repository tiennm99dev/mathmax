/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập hình phẳng: đoạn thẳng, đo độ dài, ba điểm thẳng hàng, hình tứ giác, đường gấp khúc, hình theo quy luật và đếm hình.',
  intro:
    'Em đã làm quen với đoạn thẳng, đường gấp khúc và hình tứ giác. Hôm nay em đo, đếm và tìm hình theo quy luật. Bài ôn tập sẽ cho em biết phần nào cần luyện thêm nhé!',
  objectives: [
    'Đếm và gọi tên đoạn thẳng, đo độ dài đoạn thẳng.',
    'Nhận biết hình tứ giác và ba điểm thẳng hàng.',
    'Tính độ dài đường gấp khúc.',
    'Tìm hình theo quy luật, đếm hình và xếp hình.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Đoạn thẳng và đo độ dài',
      blocks: [
        {
          type: 'p',
          text: 'Đoạn thẳng có hai đầu là hai điểm. Ta gọi tên đoạn thẳng theo hai điểm đó: đoạn thẳng AB.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt vạch 0 của thước trùng với điểm A.',
            'Mép thước đi dọc theo đoạn thẳng.',
            'Điểm B ở vạch nào thì đoạn thẳng dài bấy nhiêu xăng-ti-mét.',
          ],
        },
      ],
    },
    {
      heading: 'Các hình đã học',
      blocks: [
        {
          type: 'table',
          head: ['Tên', 'Nhận biết'],
          rows: [
            ['Ba điểm thẳng hàng', 'Cùng nằm trên một đường thẳng'],
            ['Hình tứ giác', 'Khép kín, có 4 cạnh và 4 đỉnh'],
            ['Đường gấp khúc', 'Gồm các đoạn thẳng nối tiếp nhau'],
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
    {
      heading: 'Đếm hình và tìm quy luật',
      blocks: [
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ quên',
          text: 'Em đếm các hình nhỏ trước, rồi đếm cả hình ghép từ các hình nhỏ. Hình chia 2 mảnh có 2 + 1 = 3 hình.',
        },
        {
          type: 'p',
          text: 'Tìm hình theo quy luật: em tìm nhóm hình cứ lặp đi lặp lại, rồi đếm tiếp theo nhóm đó.',
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
        'Đoạn thẳng AC dài 13 cm. Điểm B nằm trên đoạn AC, đoạn thẳng AB dài 6 cm. Tính độ dài đoạn thẳng BC.',
      steps: [
        'Đoạn AC gồm đoạn AB và đoạn BC.',
        'Biết cả đoạn và một phần, em làm phép trừ: 13 − 6 = 7.',
        'Bài giải: Độ dài đoạn thẳng BC là: 13 − 6 = 7 (cm).',
      ],
      answer: 'Đáp số: 7 cm.',
    },
    {
      problem:
        'Đường gấp khúc MNPQ có MN dài 5 cm, NP dài 3 cm, PQ dài 6 cm. Tính độ dài đường gấp khúc.',
      steps: ['Em cộng độ dài ba đoạn thẳng.', '5 + 3 = 8, 8 + 6 = 14.'],
      answer: 'Độ dài đường gấp khúc MNPQ là 14 cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'AB dài 5 cm, CD dài 7 cm, MN dài 9 cm, PQ dài 7 cm. Hai đoạn thẳng nào dài bằng nhau?',
      options: ['AB và MN', 'CD và PQ', 'AB và CD'],
      answer: 1,
      hints: ['Em tìm hai số đo giống nhau.'],
      solution: 'Đoạn thẳng CD và đoạn thẳng PQ cùng dài 7 cm.',
    },
    {
      type: 'choice',
      prompt: 'AB dài 5 cm, CD dài 7 cm, MN dài 9 cm, PQ dài 7 cm. Đoạn thẳng nào dài nhất?',
      options: ['AB', 'CD', 'MN', 'PQ'],
      answer: 2,
      hints: ['Em tìm số đo lớn nhất.'],
      solution: '9 cm là số đo lớn nhất. Đoạn thẳng MN dài nhất.',
    },
    {
      type: 'multi',
      prompt: 'Những hình nào là hình tứ giác?',
      options: ['Hình có 4 cạnh và 4 đỉnh', 'Hình có 3 cạnh', 'Hình vuông', 'Hình tròn'],
      answers: [0, 2],
      hints: ['Hình tứ giác khép kín, có đúng 4 cạnh.'],
      solution:
        'Hình có 4 cạnh, 4 đỉnh và hình vuông là hình tứ giác. Hình có 3 cạnh là hình tam giác. Hình tròn không có cạnh.',
    },
    {
      type: 'choice',
      prompt: 'Ba điểm M, O, P cùng nằm trên một đường thẳng. Câu nào đúng?',
      options: ['Ba điểm M, O, P thẳng hàng', 'Ba điểm M, O, P không thẳng hàng'],
      answer: 0,
      hints: ['Cùng nằm trên một đường thẳng thì gọi là gì?'],
      solution: 'Ba điểm cùng nằm trên một đường thẳng là ba điểm thẳng hàng.',
    },
    {
      type: 'match',
      prompt:
        'Em vẽ đoạn thẳng, điểm đầu ở vạch 0 của thước. Nối đoạn thẳng với vạch của điểm cuối.',
      left: ['AB dài 5 cm', 'CD dài 7 cm', 'EG dài 9 cm'],
      right: ['Vạch 5', 'Vạch 7', 'Vạch 9', 'Vạch 6'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Điểm đầu ở vạch 0 thì số ở điểm cuối là độ dài đoạn thẳng.'],
      solution: 'AB dài 5 cm: vạch 5. CD dài 7 cm: vạch 7. EG dài 9 cm: vạch 9.',
    },
    {
      type: 'number',
      prompt:
        'Đoạn thẳng AC dài 15 cm. Điểm B nằm trên đoạn AC, đoạn thẳng AB dài 8 cm. Đoạn thẳng BC dài bao nhiêu xăng-ti-mét?',
      answer: 7,
      hints: ['Đoạn AC gồm đoạn AB và đoạn BC, nên em làm phép trừ.'],
      solution: 'Độ dài đoạn thẳng BC là: 15 − 8 = 7 (cm).',
    },
    {
      type: 'number',
      prompt:
        'Đường gấp khúc ABCD có AB dài 8 cm, BC dài 6 cm, CD dài 7 cm. Đường gấp khúc ABCD dài bao nhiêu xăng-ti-mét?',
      answer: 21,
      hints: ['Em cộng độ dài ba đoạn thẳng: 8 + 6 trước, rồi cộng tiếp 7.'],
      solution: 'Độ dài đường gấp khúc ABCD là: 8 + 6 + 7 = 21 (cm).',
    },
    {
      type: 'order',
      prompt: 'Xếp các đường gấp khúc từ ngắn nhất đến dài nhất.',
      items: ['Đoạn 8 cm và đoạn 7 cm', 'Đoạn 5 cm và đoạn 6 cm', 'Đoạn 9 cm và đoạn 9 cm'],
      answer: [1, 0, 2],
      hints: ['Em tính độ dài mỗi đường trước, rồi so sánh.'],
      solution: 'Độ dài các đường là: 5 + 6 = 11 (cm), 8 + 7 = 15 (cm), 9 + 9 = 18 (cm).',
    },
    {
      type: 'choice',
      prompt:
        'Các hình xếp theo quy luật: hình tròn, hình vuông, hình vuông, hình tam giác, rồi lại lặp lại như vậy. Hình thứ 6 là hình gì?',
      options: ['Hình tròn', 'Hình vuông', 'Hình tam giác'],
      answer: 1,
      hints: ['Mỗi nhóm có 4 hình. Hình thứ 5 là hình đầu của nhóm sau.'],
      solution:
        'Hình thứ 5 lại là hình tròn, hình thứ 6 là hình vuông. Nhóm lặp lại: hình tròn, hình vuông, hình vuông, hình tam giác.',
    },
    {
      type: 'choice',
      prompt:
        'Từ đỉnh một hình tam giác, em kẻ hai đoạn thẳng xuống cạnh đối diện, được ba hình tam giác nhỏ. Có tất cả mấy hình tam giác?',
      options: ['3 hình', '4 hình', '5 hình', '6 hình'],
      answer: 3,
      hints: ['Đếm hình một mảnh, rồi hình ghép từ hai mảnh, rồi hình ghép từ ba mảnh.'],
      solution:
        'Có 3 hình một mảnh, 2 hình ghép từ hai mảnh và 1 hình ghép từ ba mảnh: 3 + 2 + 1 = 6.',
    },
    {
      type: 'choice',
      prompt:
        'Một hình chữ nhật xếp từ 2 hàng, mỗi hàng 3 hình vuông nhỏ. Cần bao nhiêu hình vuông nhỏ?',
      options: ['5 hình', '6 hình', '8 hình'],
      answer: 1,
      hints: ['Mỗi hàng có 3 hình. Em cộng số hình của hai hàng.'],
      solution: '3 + 3 = 6. Cần 6 hình vuông nhỏ.',
    },
  ],
  takeaways: [
    'Đo đoạn thẳng: đặt vạch 0 trùng với một đầu, đọc số ở đầu kia.',
    'Hình tứ giác có 4 cạnh, 4 đỉnh. Ba điểm cùng nằm trên một đường thẳng là thẳng hàng.',
    'Độ dài đường gấp khúc là tổng độ dài các đoạn thẳng.',
    'Đếm hình: đếm cả hình nhỏ lẫn hình ghép.',
  ],
};
