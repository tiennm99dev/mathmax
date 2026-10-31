const ZERO_TO_TEN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bảng cộng và bảng trừ trong phạm vi 10, tính nhẩm, và mối quan hệ giữa phép cộng và phép trừ.',
  intro:
    'Em đã biết cộng và trừ. Hôm nay em xếp các phép tính thành bảng cộng, bảng trừ để học thuộc và tính nhẩm thật nhanh nhé!',
  objectives: [
    'Đọc và học thuộc bảng cộng trong phạm vi 10.',
    'Đọc và học thuộc bảng trừ trong phạm vi 10.',
    'Từ một phép cộng, viết được hai phép trừ.',
    'Tính nhẩm phép cộng, phép trừ trong phạm vi 10.',
  ],
  sections: [
    {
      heading: 'Bảng cộng trong phạm vi 10',
      blocks: [
        {
          type: 'p',
          text: 'Bảng cộng xếp các phép cộng có kết quả không quá 10.',
        },
        {
          type: 'table',
          head: ['Phép cộng', 'Kết quả'],
          rows: [
            ['1 + 4', '5'],
            ['2 + 3', '5'],
            ['3 + 2', '5'],
            ['4 + 1', '5'],
          ],
          caption: 'Các phép cộng có kết quả bằng 5',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Số thứ nhất tăng 1, số thứ hai giảm 1, kết quả vẫn không đổi.',
        },
      ],
    },
    {
      heading: 'Bảng trừ trong phạm vi 10',
      blocks: [
        {
          type: 'p',
          text: 'Bảng trừ xếp các phép trừ trong phạm vi 10, từ 2 − 1 đến 10 − 9.',
        },
        {
          type: 'table',
          head: ['Phép trừ', 'Kết quả'],
          rows: [
            ['5 − 1', '4'],
            ['5 − 2', '3'],
            ['5 − 3', '2'],
            ['5 − 4', '1'],
          ],
          caption: 'Các phép trừ từ 5',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Trừ đi càng nhiều thì còn lại càng ít.',
        },
      ],
    },
    {
      heading: 'Phép cộng và phép trừ',
      blocks: [
        {
          type: 'p',
          text: 'Với ba số 2, 3 và 5, em viết được bốn phép tính.',
        },
        {
          type: 'table',
          head: ['Phép cộng', 'Phép trừ'],
          rows: [
            ['2 + 3 = 5', '5 − 3 = 2'],
            ['3 + 2 = 5', '5 − 2 = 3'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhớ nhé',
          text: 'Lấy kết quả của phép cộng trừ đi một số, ta được số còn lại.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng cộng, bảng trừ tương tác',
    instruction:
      'Chạm vào một ô để chọn hàng và cột, xem phép tính và các phép tính liên quan. Dùng phím mũi tên để đi giữa các ô. Chạm một số ở dưới để tô sáng mọi ô có kết quả bằng số đó.',
  },
  examples: [
    {
      problem: 'Từ phép cộng 4 + 6 = 10, em viết hai phép trừ.',
      steps: [
        'Kết quả của phép cộng là 10.',
        'Lấy 10 trừ đi 6, được 4: 10 − 6 = 4.',
        'Lấy 10 trừ đi 4, được 6: 10 − 4 = 6.',
      ],
      answer: '10 − 6 = 4 và 10 − 4 = 6.',
    },
    {
      problem: 'Tính nhẩm: 9 − 4 = ?',
      steps: ['Em nghĩ: 4 cộng mấy thì bằng 9?', 'Trong bảng cộng có 4 + 5 = 9.', 'Vậy 9 − 4 = 5.'],
      answer: '9 − 4 = 5.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '2 + 7 = ?',
      options: ['8', '9', '10'],
      answer: 1,
      hints: ['Đổi chỗ thành 7 + 2 cho dễ đếm.', 'Từ 7 đếm thêm 2.'],
      solution: '7 + 2 = 9, nên 2 + 7 = 9.',
    },
    {
      type: 'choice',
      prompt: '8 − 5 = ?',
      options: ['2', '3', '4'],
      answer: 1,
      hints: ['Em nghĩ: 5 cộng mấy thì bằng 8?'],
      solution: '5 + 3 = 8, nên 8 − 5 = 3.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả.',
      left: ['6 + 4', '9 − 6', '3 + 5', '10 − 8'],
      right: ['10', '3', '8', '2', '6'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Nhớ lại bảng cộng và bảng trừ.', 'Với phép trừ, nghĩ đến phép cộng tương ứng.'],
      solution: '6 + 4 = 10. 9 − 6 = 3. 3 + 5 = 8. 10 − 8 = 2.',
    },
    {
      type: 'multi',
      prompt: 'Từ 3 + 4 = 7, chọn hai phép trừ đúng.',
      options: ['7 − 3 = 4', '7 − 4 = 3', '7 − 4 = 2', '7 − 2 = 4'],
      answers: [0, 1],
      hints: ['Lấy kết quả 7 trừ đi một trong hai số 3 và 4.'],
      solution: 'Từ 3 + 4 = 7 ta có 7 − 3 = 4 và 7 − 4 = 3.',
    },
    {
      type: 'choice',
      prompt: 'Phép tính nào có kết quả bằng 10?',
      options: ['6 + 3', '7 + 3', '8 + 1'],
      answer: 1,
      hints: ['Tính từng phép cộng.'],
      solution: '6 + 3 = 9, 7 + 3 = 10, 8 + 1 = 9. Phép tính 7 + 3 có kết quả bằng 10.',
    },
    {
      type: 'choice',
      prompt: 'Số nào điền vào ô trống? ? + 5 = 9',
      options: ['3', '4', '5'],
      answer: 1,
      hints: ['Mấy cộng 5 thì bằng 9?', 'Em có thể tính 9 − 5.'],
      solution: '9 − 5 = 4, và 4 + 5 = 9. Số cần điền là 4.',
    },
    {
      type: 'choice',
      prompt: 'Biết 4 + 4 = 8. Vậy 8 − 4 = ?',
      options: ['0', '4', '8'],
      answer: 1,
      hints: ['Lấy kết quả của phép cộng trừ đi một số, ta được số còn lại.'],
      solution: 'Từ 4 + 4 = 8 ta có 8 − 4 = 4.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép tính theo kết quả từ lớn đến bé.',
      items: ['5 + 4', '10 − 7', '2 + 4', '9 − 8'],
      answer: [0, 2, 1, 3],
      hints: ['Tính kết quả của từng phép tính trước.', 'Rồi tìm kết quả lớn nhất.'],
      solution: '5 + 4 = 9, 2 + 4 = 6, 10 − 7 = 3, 9 − 8 = 1. Thứ tự: 5 + 4, 2 + 4, 10 − 7, 9 − 8.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 3 + 4 ... 9 − 2',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Tính kết quả hai bên trước rồi so sánh.'],
      solution: '3 + 4 = 7 và 9 − 2 = 7. Hai kết quả bằng nhau, nên 3 + 4 = 9 − 2.',
    },
    {
      type: 'count',
      prompt:
        'Có 9 quả bóng bay. 6 quả bay đi. Hình vẽ những quả bóng còn lại. Còn lại mấy quả bóng?',
      picture: 'balloon',
      answer: 3,
      choices: ZERO_TO_TEN,
      hints: ['Đếm các quả bóng trong hình.', 'Kiểm tra lại bằng bảng trừ.'],
      solution: '9 − 6 = 3. Còn lại 3 quả bóng bay.',
    },
  ],
  takeaways: [
    'Học thuộc bảng cộng, bảng trừ trong phạm vi 10 để tính nhẩm nhanh.',
    'Từ 2 + 3 = 5 ta có 5 − 3 = 2 và 5 − 2 = 3.',
    'Muốn tính 9 − 4, em nghĩ 4 cộng mấy bằng 9.',
  ],
};
