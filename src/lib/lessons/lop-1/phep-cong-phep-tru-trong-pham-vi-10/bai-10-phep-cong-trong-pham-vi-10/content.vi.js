const ZERO_TO_TEN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép cộng trong phạm vi 10: gộp lại, thêm vào, dấu cộng, cách đọc phép cộng và đổi chỗ các số trong phép cộng.',
  intro:
    'Bạn Mai cầm 3 quả bóng, bạn Nam cầm 2 quả bóng. Hai bạn gộp bóng lại thì có mấy quả? Em cùng học phép cộng để trả lời nhé!',
  objectives: [
    'Hiểu phép cộng là gộp lại hoặc thêm vào.',
    'Biết dấu cộng (+), viết và đọc phép cộng.',
    'Tính phép cộng trong phạm vi 10.',
    'Biết đổi chỗ các số trong phép cộng thì kết quả không đổi.',
  ],
  sections: [
    {
      heading: 'Gộp lại thì bằng mấy?',
      blocks: [
        {
          type: 'p',
          text: 'Mai có 3 quả bóng. Nam có 2 quả bóng. Gộp lại, hai bạn có 5 quả bóng.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phép cộng',
          text: 'Ta viết 3 + 2 = 5. Đọc là: ba cộng hai bằng năm.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dấu cộng',
          text: 'Dấu + gọi là dấu cộng. Dấu = gọi là dấu bằng.',
        },
      ],
    },
    {
      heading: 'Thêm vào thì bằng mấy?',
      blocks: [
        {
          type: 'p',
          text: 'Trong sân có 4 con gà. Có thêm 1 con gà chạy đến. Trong sân có tất cả 5 con gà.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Thêm vào',
          text: '4 thêm 1 được 5. Ta viết 4 + 1 = 5.',
        },
        {
          type: 'table',
          head: ['Có', 'Thêm', 'Phép cộng'],
          rows: [
            ['2', '1', '2 + 1 = 3'],
            ['5', '2', '5 + 2 = 7'],
            ['6', '4', '6 + 4 = 10'],
          ],
          caption: 'Thêm vào là làm phép cộng',
        },
      ],
    },
    {
      heading: 'Đổi chỗ các số',
      blocks: [
        {
          type: 'p',
          text: 'Nhóm trái có 2 quả bóng, nhóm phải có 3 quả bóng: 2 + 3 = 5.',
        },
        {
          type: 'p',
          text: 'Đổi chỗ hai nhóm: nhóm trái có 3, nhóm phải có 2. Số bóng không đổi: 3 + 2 = 5.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhớ nhé',
          text: 'Khi đổi chỗ các số trong phép cộng, kết quả không thay đổi.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cộng với 0',
          text: 'Thêm 0 quả là không thêm quả nào: 3 + 0 = 3, 0 + 3 = 3.',
        },
      ],
    },
  ],
  explore: {
    title: 'Gộp bóng bay',
    instruction:
      'Chọn "Gộp lại" hoặc "Thêm vào". Bấm − và + để đổi số bóng ở mỗi nhóm. Bấm nút để hai nhóm gộp lại và xem phép cộng hiện ra. Rồi bấm "Đổi chỗ hai nhóm".',
  },
  examples: [
    {
      problem: 'Có 5 con cá trong bể. Bố thả thêm 3 con cá. Trong bể có tất cả mấy con cá?',
      steps: [
        'Có 5 con cá, thêm 3 con cá: ta làm phép cộng.',
        'Từ 5 đếm thêm 3: sáu, bảy, tám.',
        'Ta viết 5 + 3 = 8.',
      ],
      answer: 'Trong bể có tất cả 8 con cá.',
    },
    {
      problem: 'Biết 2 + 6 = 8. Không cần đếm, em tìm 6 + 2 bằng mấy?',
      steps: [
        'Phép tính 6 + 2 có hai số 2 và 6, chỉ đổi chỗ cho nhau.',
        'Đổi chỗ các số trong phép cộng, kết quả không thay đổi.',
      ],
      answer: '6 + 2 = 8.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Trên đĩa có 4 quả táo. Mẹ để thêm 2 quả táo. Có tất cả mấy quả táo?',
      picture: 'apple',
      answer: 6,
      choices: ZERO_TO_TEN,
      hints: ['Đếm hết các quả táo trong hình, mỗi quả một lần.'],
      solution: '4 thêm 2 được 6: 4 + 2 = 6. Có tất cả 6 quả táo.',
    },
    {
      type: 'count',
      prompt: 'Lan hái 2 bông hoa, Mai hái 5 bông hoa. Gộp lại, hai bạn hái được mấy bông hoa?',
      picture: 'flower',
      answer: 7,
      choices: ZERO_TO_TEN,
      hints: ['Đếm 2 bông đầu, rồi đếm tiếp: ba, bốn, ...'],
      solution: '2 và 5 gộp lại được 7: 2 + 5 = 7. Hai bạn hái được 7 bông hoa.',
    },
    {
      type: 'choice',
      prompt: '3 + 4 = ?',
      options: ['6', '7', '8'],
      answer: 1,
      hints: ['Có 3, em đếm thêm 4 nữa.', 'Từ 3 đếm tiếp: bốn, năm, sáu, ...'],
      solution: 'Từ 3 đếm thêm 4: bốn, năm, sáu, bảy. Vậy 3 + 4 = 7.',
    },
    {
      type: 'choice',
      prompt: 'Có 5 bạn nam và 3 bạn nữ. Phép tính nào cho biết có tất cả mấy bạn?',
      options: ['5 + 3 = 8', '5 + 3 = 7', '3 + 3 = 6'],
      answer: 0,
      hints: ['Gộp số bạn nam và số bạn nữ.', 'Từ 5 đếm thêm 3 rồi so với từng phép tính.'],
      solution: 'Gộp 5 bạn nam và 3 bạn nữ: 5 + 3 = 8. Có tất cả 8 bạn.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép cộng với kết quả.',
      left: ['1 + 4', '2 + 6', '5 + 5', '0 + 3'],
      right: ['5', '8', '10', '3', '7'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Tính từng phép cộng: có số thứ nhất, đếm thêm số thứ hai.'],
      solution: '1 + 4 = 5. 2 + 6 = 8. 5 + 5 = 10. 0 + 3 = 3.',
    },
    {
      type: 'choice',
      prompt: 'Biết 6 + 3 = 9. Vậy 3 + 6 bằng mấy?',
      options: ['3', '6', '9'],
      answer: 2,
      hints: ['Hai phép tính có cùng hai số, chỉ đổi chỗ cho nhau.'],
      solution: 'Đổi chỗ các số trong phép cộng, kết quả không thay đổi: 3 + 6 = 9.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phép cộng có kết quả bằng 7.',
      options: ['4 + 3', '5 + 1', '2 + 5', '6 + 1', '3 + 3'],
      answers: [0, 2, 3],
      hints: ['Tính từng phép cộng rồi so với 7.'],
      solution: '4 + 3 = 7, 2 + 5 = 7, 6 + 1 = 7. Còn 5 + 1 = 6 và 3 + 3 = 6.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép cộng theo kết quả từ bé đến lớn.',
      items: ['4 + 4', '1 + 1', '3 + 2', '6 + 3'],
      answer: [1, 2, 0, 3],
      hints: ['Tính kết quả của từng phép cộng trước.', 'Rồi xếp các kết quả từ bé đến lớn.'],
      solution: '1 + 1 = 2, 3 + 2 = 5, 4 + 4 = 8, 6 + 3 = 9. Thứ tự: 1 + 1, 3 + 2, 4 + 4, 6 + 3.',
    },
    {
      type: 'choice',
      prompt: '7 + 0 = ?',
      options: ['0', '7', '8'],
      answer: 1,
      hints: ['Thêm 0 là không thêm gì cả.'],
      solution: 'Một số cộng với 0 vẫn bằng chính số đó: 7 + 0 = 7.',
    },
    {
      type: 'choice',
      prompt: 'Số nào điền vào ô trống? 4 + ? = 6',
      options: ['1', '2', '3'],
      answer: 1,
      hints: ['Có 4, cần thêm mấy để được 6?', 'Từ 4 đếm tiếp đến 6.'],
      solution: 'Từ 4 đếm tiếp: năm, sáu là thêm 2. Vậy 4 + 2 = 6.',
    },
  ],
  takeaways: [
    'Gộp lại hay thêm vào, ta làm phép cộng: 3 + 2 = 5.',
    'Dấu + là dấu cộng. 3 + 2 = 5 đọc là "ba cộng hai bằng năm".',
    'Đổi chỗ các số trong phép cộng, kết quả không thay đổi: 2 + 3 = 3 + 2.',
  ],
};
