const ZERO_TO_TEN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép trừ trong phạm vi 10: tách ra, bớt đi, dấu trừ, cách đọc phép trừ và phép trừ có số 0.',
  intro:
    'Trên cành có 5 con chim. 2 con bay đi. Trên cành còn lại mấy con chim? Em cùng học phép trừ để trả lời nhé!',
  objectives: [
    'Hiểu phép trừ là tách ra hoặc bớt đi.',
    'Biết dấu trừ (−), viết và đọc phép trừ.',
    'Tính phép trừ trong phạm vi 10.',
    'Biết một số trừ đi 0 và một số trừ đi chính nó.',
  ],
  sections: [
    {
      heading: 'Tách ra còn lại mấy?',
      blocks: [
        {
          type: 'p',
          text: 'Có 6 quả bóng. Tách ra 2 quả bóng. Còn lại 4 quả bóng.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phép trừ',
          text: 'Ta viết 6 − 2 = 4. Đọc là: sáu trừ hai bằng bốn.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dấu trừ',
          text: 'Dấu − gọi là dấu trừ.',
        },
      ],
    },
    {
      heading: 'Bớt đi còn lại mấy?',
      blocks: [
        {
          type: 'p',
          text: 'Trên cành có 5 con chim. 2 con bay đi. Trên cành còn lại 3 con chim.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Bớt đi',
          text: '5 bớt 2 còn 3. Ta viết 5 − 2 = 3.',
        },
        {
          type: 'table',
          head: ['Có', 'Bớt đi', 'Phép trừ'],
          rows: [
            ['4', '1', '4 − 1 = 3'],
            ['7', '3', '7 − 3 = 4'],
            ['10', '5', '10 − 5 = 5'],
          ],
          caption: 'Bớt đi là làm phép trừ',
        },
      ],
    },
    {
      heading: 'Phép trừ có số 0',
      blocks: [
        {
          type: 'p',
          text: 'Có 5 con chim. Không con nào bay đi. Vẫn còn 5 con: 5 − 0 = 5.',
        },
        {
          type: 'p',
          text: 'Có 5 con chim. Cả 5 con bay đi. Không còn con nào: 5 − 5 = 0.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhớ nhé',
          text: 'Một số trừ đi 0 thì bằng chính số đó. Một số trừ đi chính nó thì bằng 0.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chim bay khỏi cành',
    instruction:
      'Chọn "Bớt đi" hoặc "Tách ra". Bấm − và + để chọn số chim. Chạm vào một con chim để nó rời cành, chạm lần nữa để nó quay về. Xem phép trừ thay đổi.',
  },
  examples: [
    {
      problem: 'Trong lọ có 8 cái kẹo. Em ăn 3 cái. Trong lọ còn lại mấy cái kẹo?',
      steps: [
        'Có 8 cái kẹo, bớt đi 3 cái: ta làm phép trừ.',
        'Đếm lùi 3 bước từ 8: bảy, sáu, năm.',
        'Ta viết 8 − 3 = 5.',
      ],
      answer: 'Trong lọ còn lại 5 cái kẹo.',
    },
    {
      problem: 'Có 7 bạn chơi đá cầu. Cả 7 bạn về nhà. Còn lại mấy bạn chơi đá cầu?',
      steps: ['Có 7 bạn, bớt đi cả 7 bạn.', 'Một số trừ đi chính nó thì bằng 0: 7 − 7 = 0.'],
      answer: 'Không còn bạn nào chơi đá cầu.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt:
        'Trên đĩa có 8 quả cam. Em ăn 3 quả. Hình vẽ những quả cam còn lại. Còn lại mấy quả cam?',
      picture: 'orange',
      answer: 5,
      choices: ZERO_TO_TEN,
      hints: ['Đếm các quả cam trong hình, mỗi quả một lần.'],
      solution: '8 bớt 3 còn 5: 8 − 3 = 5. Còn lại 5 quả cam.',
    },
    {
      type: 'choice',
      prompt: '6 − 2 = ?',
      options: ['3', '4', '5'],
      answer: 1,
      hints: ['Có 6, bớt đi 2.', 'Đếm lùi 2 bước từ 6.'],
      solution: 'Đếm lùi từ 6: năm, bốn. Vậy 6 − 2 = 4.',
    },
    {
      type: 'choice',
      prompt: 'Có 9 quả bóng bay. 4 quả bay mất. Phép tính nào cho biết còn lại mấy quả?',
      options: ['9 − 4 = 5', '9 − 4 = 6', '9 − 5 = 3'],
      answer: 0,
      hints: ['Có 9, bớt đi số quả bay mất.', 'Đếm lùi 4 bước từ 9 rồi so với từng phép tính.'],
      solution: 'Có 9 quả, bay mất 4 quả: 9 − 4 = 5. Còn lại 5 quả bóng bay.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép trừ với kết quả.',
      left: ['7 − 2', '10 − 3', '4 − 4', '8 − 0'],
      right: ['5', '7', '0', '8', '4'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Đếm lùi từ số thứ nhất.', 'Trừ đi 0 và trừ đi chính nó có gì đặc biệt?'],
      solution: '7 − 2 = 5. 10 − 3 = 7. 4 − 4 = 0. 8 − 0 = 8.',
    },
    {
      type: 'choice',
      prompt: '6 − 0 = ?',
      options: ['0', '5', '6'],
      answer: 2,
      hints: ['Bớt đi 0 là không bớt gì cả.'],
      solution: 'Một số trừ đi 0 thì bằng chính số đó: 6 − 0 = 6.',
    },
    {
      type: 'choice',
      prompt: '3 − 3 = ?',
      options: ['0', '3', '6'],
      answer: 0,
      hints: ['Có 3 con chim, cả 3 con bay đi. Trên cành còn con nào không?'],
      solution: 'Một số trừ đi chính nó thì bằng 0: 3 − 3 = 0.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phép trừ có kết quả bằng 2.',
      options: ['5 − 3', '4 − 1', '9 − 7', '2 − 0', '6 − 3'],
      answers: [0, 2, 3],
      hints: ['Tính từng phép trừ rồi so với 2.'],
      solution: '5 − 3 = 2, 9 − 7 = 2, 2 − 0 = 2. Còn 4 − 1 = 3 và 6 − 3 = 3.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép trừ theo kết quả từ bé đến lớn.',
      items: ['10 − 1', '5 − 4', '8 − 4', '7 − 0'],
      answer: [1, 2, 3, 0],
      hints: ['Tính kết quả của từng phép trừ trước.', 'Rồi xếp các kết quả từ bé đến lớn.'],
      solution: '5 − 4 = 1, 8 − 4 = 4, 7 − 0 = 7, 10 − 1 = 9. Thứ tự: 5 − 4, 8 − 4, 7 − 0, 10 − 1.',
    },
    {
      type: 'choice',
      prompt: 'Số nào điền vào ô trống? 7 − ? = 5',
      options: ['1', '2', '3'],
      answer: 1,
      hints: ['Có 7, bớt đi mấy thì còn 5?', 'Đếm lùi từ 7 cho đến khi gặp 5.'],
      solution: 'Đếm lùi từ 7: sáu, năm là bớt 2. Vậy 7 − 2 = 5.',
    },
    {
      type: 'choice',
      prompt: 'Mẹ có 10 cái bánh. Mẹ cho em 6 cái. Mẹ còn lại mấy cái bánh?',
      options: ['3', '4', '5'],
      answer: 1,
      hints: ['Có 10, bớt đi 6: em làm phép trừ.', 'Từ 6 đếm tiếp đến 10 cũng được.'],
      solution: '10 − 6 = 4. Mẹ còn lại 4 cái bánh.',
    },
  ],
  takeaways: [
    'Tách ra hay bớt đi, ta làm phép trừ: 6 − 2 = 4.',
    'Dấu − là dấu trừ. 6 − 2 = 4 đọc là "sáu trừ hai bằng bốn".',
    'Một số trừ đi 0 bằng chính số đó: 5 − 0 = 5. Một số trừ đi chính nó bằng 0: 5 − 5 = 0.',
  ],
};
