/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về phép nhân, phép chia lớp 2: bảng nhân, bảng chia 2 và 5, tên các số, viết tích thành tổng và giải bài toán.',
  intro:
    'Em đã biết bảng nhân và bảng chia 2, 5. Hôm nay em ôn lại tất cả, rồi giúp bà chia quả và giúp các bạn chia nhóm nhé!',
  objectives: [
    'Tính nhẩm trong bảng nhân, bảng chia 2 và 5.',
    'Gọi đúng tên thừa số, tích, số bị chia, số chia, thương.',
    'Lập phép chia từ phép nhân, viết tích thành tổng.',
    'Giải bài toán về phép nhân và phép chia.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'table',
          head: ['Phép tính', 'Tên các số'],
          rows: [
            ['2 × 5 = 10', '2 và 5 là thừa số, 10 là tích'],
            ['10 : 2 = 5', '10 là số bị chia, 2 là số chia, 5 là thương'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Viết tích thành tổng',
          text: '7 × 3 là 7 được lấy 3 lần: 7 × 3 = 7 + 7 + 7 = 21.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Từ phép nhân đến phép chia',
          text: 'Từ 2 × 3 = 6, em có 6 : 2 = 3 và 6 : 3 = 2.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Mỗi nhóm có mấy cái, có mấy nhóm thì em nhân. Chia đều hay chia thành nhóm thì em chia.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài tập trộn',
    instruction:
      'Em đọc câu hỏi rồi chạm vào đáp án. Sai lần đầu, em được gợi ý và làm lại. Hết bộ, em biết phần nào cần ôn và có thể làm bộ khác.',
  },
  examples: [
    {
      problem: 'Mỗi ô ăn quan có 5 viên sỏi. Hỏi 10 ô có bao nhiêu viên sỏi?',
      steps: [
        'Số 5 được lấy 10 lần.',
        'Em viết phép nhân 5 × 10.',
        'Bảng nhân 5 cho biết 5 × 10 = 50.',
      ],
      answer: '10 ô có 50 viên sỏi.',
    },
    {
      problem: 'Có 35 bạn chia đều thành 5 nhóm. Mỗi nhóm có mấy bạn?',
      steps: ['Chia đều thành 5 nhóm thì em chia cho 5.', 'Vì 5 × 7 = 35 nên 35 : 5 = 7.'],
      answer: 'Mỗi nhóm có 7 bạn.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Em đếm số con bướm trong hình. Mỗi con có 2 cánh.',
      picture: 'butterfly',
      answer: 6,
      choices: [4, 5, 6, 7, 8],
      hints: ['Em đếm từng con bướm.'],
      solution: 'Có 6 con bướm. 2 × 6 = 12 (cánh).',
    },
    {
      type: 'choice',
      prompt: '5 × 8 = ?',
      options: ['13', '35', '40', '45'],
      answer: 2,
      hints: ['Em đếm thêm 5, đếm 8 lần.'],
      solution: '5 × 8 = 40.',
    },
    {
      type: 'choice',
      prompt: '18 : 2 = ?',
      options: ['8', '9', '16', '20'],
      answer: 1,
      hints: ['2 nhân với số nào thì bằng 18?'],
      solution: '2 × 9 = 18, nên 18 : 2 = 9.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả của nó.',
      left: ['2 × 7', '30 : 5', '5 × 5', '16 : 2'],
      right: ['14', '6', '25', '8', '10'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em đọc lại bảng nhân và bảng chia 2, 5.'],
      solution: '2 × 7 = 14. 30 : 5 = 6. 5 × 5 = 25. 16 : 2 = 8.',
    },
    {
      type: 'multi',
      prompt: 'Từ phép nhân 5 × 4 = 20, em lập được những phép chia nào?',
      options: ['20 : 5 = 4', '20 : 4 = 5', '5 : 4 = 20', '4 : 5 = 20'],
      answers: [0, 1],
      hints: ['Tích 20 là số bị chia.', 'Có hai phép chia đúng.'],
      solution: '5 × 4 = 20 cho 20 : 5 = 4 và 20 : 4 = 5.',
    },
    {
      type: 'choice',
      prompt: 'Trong phép chia 15 : 5 = 3, số chia là số nào?',
      options: ['15', '5', '3'],
      answer: 1,
      hints: ['Số chia đứng ngay sau dấu chia.'],
      solution: 'Trong 15 : 5 = 3, số bị chia là 15, số chia là 5, thương là 3.',
    },
    {
      type: 'number',
      prompt: 'Em viết 6 × 5 thành tổng rồi tính. Kết quả là bao nhiêu?',
      answer: 30,
      hints: ['6 được lấy 5 lần.', 'Em cộng 5 số 6: 6 + 6 + 6 + 6 + 6.'],
      solution: '6 × 5 = 6 + 6 + 6 + 6 + 6 = 30.',
    },
    {
      type: 'number',
      prompt: 'Em tính 2 × 7, rồi trừ đi 5. Em được số mấy?',
      answer: 9,
      hints: ['Em tính 2 × 7 trước.', 'Rồi lấy kết quả trừ đi 5.'],
      solution: '2 × 7 = 14. 14 − 5 = 9.',
    },
    {
      type: 'number',
      prompt: 'Em tính 40 : 5, rồi cộng thêm 9. Em được số mấy?',
      answer: 17,
      hints: ['Em tính 40 : 5 trước.', 'Rồi lấy kết quả cộng thêm 9.'],
      solution: '40 : 5 = 8. 8 + 9 = 17.',
    },
    {
      type: 'choice',
      prompt: 'Mỗi lọ cắm 5 bông hoa. 2 lọ có bao nhiêu bông hoa?',
      options: ['7', '10', '15', '25'],
      answer: 1,
      hints: ['Số 5 được lấy 2 lần. Em viết phép nhân.'],
      solution: '5 × 2 = 10 (bông hoa).',
    },
    {
      type: 'choice',
      prompt: 'Bà có 20 quả vải, chia đều cho 2 cháu. Mỗi cháu được mấy quả?',
      options: ['10', '18', '22', '40'],
      answer: 0,
      hints: ['Chia đều cho 2 cháu thì em chia cho 2.'],
      solution: '20 : 2 = 10 (quả).',
    },
    {
      type: 'order',
      prompt: 'Có 35 bạn chia đều thành 5 nhóm thì mỗi nhóm có 7 bạn. Em xếp thẻ thành phép chia.',
      items: ['7', '=', '35', '5', ':'],
      answer: [2, 4, 3, 1, 0],
      hints: ['Số bạn cần chia đứng đầu, rồi đến dấu chia.'],
      solution: '35 : 5 = 7 (bạn).',
    },
  ],
  takeaways: [
    'Thừa số × thừa số = tích. Số bị chia : số chia = thương.',
    'Từ một phép nhân, em lập được hai phép chia.',
    'Tích viết được thành tổng các số hạng bằng nhau.',
  ],
};
