/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập đo lường: đọc cân đĩa, tính với ki-lô-gam, đếm số lít bằng ca 1 l, tính với lít và giải bài toán về kg, l.',
  intro:
    'Em đã biết cân bằng ki-lô-gam và đong nước bằng lít. Hôm nay em đọc cân, đếm ca nước và giúp ba chú dê qua sông. Bài ôn tập sẽ cho em biết phần nào cần luyện thêm nhé!',
  objectives: [
    'So sánh nặng hơn, nhẹ hơn trên cân đĩa.',
    'Đọc khối lượng của vật khi cân thăng bằng.',
    'Biết một vật chứa mấy lít nhờ đếm ca 1 l.',
    'Tính và giải bài toán với đơn vị kg và l.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Ki-lô-gam',
      blocks: [
        {
          type: 'p',
          text: 'Ki-lô-gam viết tắt là kg. Cân đĩa giúp em so sánh và cân các vật.',
        },
        {
          type: 'table',
          head: ['Cân đĩa', 'Em hiểu là'],
          rows: [
            ['Đĩa bên trái thấp hơn', 'Vật bên trái nặng hơn'],
            ['Đĩa bên phải thấp hơn', 'Vật bên phải nặng hơn'],
            ['Cân thăng bằng', 'Hai bên nặng bằng nhau'],
          ],
        },
      ],
    },
    {
      heading: 'Lít',
      blocks: [
        {
          type: 'p',
          text: 'Lít viết tắt là l. Muốn biết bình chứa mấy lít nước, em rót hết vào các ca 1 l rồi đếm số ca đầy.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tính với kg và l',
          text: 'Em tính như với các số, rồi viết đơn vị sau kết quả: 27 kg + 15 kg = 42 kg; 31 l − 6 l = 25 l.',
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
        'Ba con dê nặng 14 kg, 16 kg và 18 kg muốn qua sông. Thuyền chở được nhiều nhất 31 kg. Hai con dê nào qua sông cùng nhau được?',
      steps: [
        'Em tính từng cặp: 14 + 16 = 30 (kg). 14 + 18 = 32 (kg). 16 + 18 = 34 (kg).',
        'Chỉ có 30 kg là không quá 31 kg.',
      ],
      answer: 'Con dê 14 kg và con dê 16 kg qua sông cùng nhau được.',
    },
    {
      problem:
        'Rót nước từ bình A được đầy 8 ca 1 l. Rót nước từ bình B được đầy 5 ca 1 l. Cả hai bình chứa mấy lít nước?',
      steps: ['Bình A chứa 8 l, bình B chứa 5 l.', 'Cả hai bình chứa: 8 + 5 = 13 (l).'],
      answer: 'Đáp số: 13 l nước.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Gấu bông nặng hơn thỏ bông. Thỏ bông nặng hơn sóc bông. Con nào nhẹ nhất?',
      options: ['Gấu bông', 'Thỏ bông', 'Sóc bông'],
      answer: 2,
      hints: ['Em xếp ba con từ nặng đến nhẹ.'],
      solution: 'Gấu bông nặng nhất, rồi đến thỏ bông, rồi đến sóc bông. Sóc bông nhẹ nhất.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả của nó.',
      left: ['19 kg + 25 kg', '63 kg − 28 kg', '35 kg + 28 kg', '44 kg − 25 kg'],
      right: ['44 kg', '35 kg', '63 kg', '19 kg', '54 kg'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em tính như với các số, nhớ 1 khi cần, rồi viết kg sau kết quả.'],
      solution: '19 + 25 = 44. 63 − 28 = 35. 35 + 28 = 63. 44 − 25 = 19.',
    },
    {
      type: 'number',
      prompt:
        'Cân thăng bằng. Một đĩa có quả bí ngô, đĩa kia có quả cân 5 kg và quả cân 2 kg. Quả bí ngô nặng mấy ki-lô-gam?',
      answer: 7,
      hints: ['Cân thăng bằng thì quả bí ngô nặng bằng hai quả cân cộng lại.'],
      solution: '5 + 2 = 7 (kg). Quả bí ngô nặng 7 kg.',
    },
    {
      type: 'number',
      prompt:
        'Con lợn nặng 25 kg. Sau một thời gian, lợn tăng thêm 18 kg. Hỏi lúc này con lợn nặng bao nhiêu ki-lô-gam?',
      answer: 43,
      hints: ['Tăng thêm thì em làm phép cộng. Hàng đơn vị: 5 + 8 có nhớ.'],
      solution: 'Con lợn nặng là: 25 + 18 = 43 (kg). Đáp số: 43 kg.',
    },
    {
      type: 'choice',
      prompt:
        'Ba con dê nặng 12 kg, 15 kg và 19 kg muốn qua sông. Thuyền chở được nhiều nhất 30 kg. Hai con dê nào qua sông cùng nhau được?',
      options: ['Dê 12 kg và dê 15 kg', 'Dê 12 kg và dê 19 kg', 'Dê 15 kg và dê 19 kg'],
      answer: 0,
      hints: ['Em cộng số ki-lô-gam của từng cặp, rồi so sánh với 30 kg.'],
      solution:
        '12 + 15 = 27 (kg), không quá 30 kg. 12 + 19 = 31 (kg) và 15 + 19 = 34 (kg) đều quá 30 kg.',
    },
    {
      type: 'number',
      prompt: 'Rót hết nước trong xô vào các ca 1 l, được đầy 9 ca. Xô chứa mấy lít nước?',
      answer: 9,
      hints: ['Mỗi ca đầy là 1 l.'],
      solution: 'Có 9 ca đầy, mỗi ca 1 l. Xô chứa 9 l nước.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả của nó.',
      left: ['25 l + 8 l', '33 l − 25 l', '44 l + 19 l', '63 l − 44 l'],
      right: ['33 l', '8 l', '63 l', '19 l', '23 l'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em tính như với các số, nhớ 1 khi cần, rồi viết l sau kết quả.'],
      solution: '25 + 8 = 33. 33 − 25 = 8. 44 + 19 = 63. 63 − 44 = 19.',
    },
    {
      type: 'number',
      prompt: '15 l + 8 l + 30 l = ? (em viết số lít)',
      answer: 53,
      hints: ['Em tính lần lượt từ trái sang phải: 15 + 8 trước.'],
      solution: '15 + 8 = 23. 23 + 30 = 53. Vậy 15 l + 8 l + 30 l = 53 l.',
    },
    {
      type: 'number',
      prompt: '42 l − 7 l + 16 l = ? (em viết số lít)',
      answer: 51,
      hints: ['Em tính lần lượt từ trái sang phải: 42 − 7 trước.'],
      solution: '42 − 7 = 35. 35 + 16 = 51. Vậy 42 l − 7 l + 16 l = 51 l.',
    },
    {
      type: 'choice',
      prompt:
        'Trong thùng có 15 l nước. Rót hết nước vào ba can thì cả ba can vừa đầy. Đó là ba can nào?',
      options: [
        'Can 3 l, can 10 l, can 5 l',
        'Can 2 l, can 5 l, can 15 l',
        'Can 10 l, can 2 l, can 3 l',
      ],
      answer: 2,
      hints: ['Em cộng số lít của ba can. Tổng phải bằng 15 l.'],
      solution: '3 + 10 + 5 = 18 (l). 2 + 5 + 15 = 22 (l). 10 + 2 + 3 = 15 (l), vừa đủ.',
    },
    {
      type: 'number',
      prompt:
        'Cửa hàng có 18 thùng nước mắm, nhập thêm 4 thùng. Hỏi cửa hàng có tất cả bao nhiêu thùng nước mắm?',
      answer: 22,
      hints: ['Nhập thêm thì em làm phép cộng.'],
      solution: 'Cửa hàng có tất cả số thùng nước mắm là: 18 + 4 = 22 (thùng). Đáp số: 22 thùng.',
    },
  ],
  takeaways: [
    'Đĩa cân nào thấp hơn thì vật trên đĩa đó nặng hơn. Cân thăng bằng thì hai bên nặng bằng nhau.',
    'Rót vào ca 1 l: đầy mấy ca thì chứa bấy nhiêu lít.',
    'Tính với kg, l: tính như với các số rồi viết đơn vị.',
  ],
};
