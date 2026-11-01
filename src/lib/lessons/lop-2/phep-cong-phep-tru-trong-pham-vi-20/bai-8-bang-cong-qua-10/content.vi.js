/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bảng cộng qua 10: các phép cộng hai số có một chữ số có tổng từ 11 đến 18, cách lập bảng bằng làm tròn 10 và cách ghi nhớ.',
  intro:
    'Em đã biết cộng qua 10 bằng cách làm tròn 10. Hôm nay em lập bảng cộng (qua 10) và chơi thẻ ghi nhớ để thuộc bảng nhé!',
  objectives: [
    'Đọc và lập được bảng cộng (qua 10).',
    'Ghi nhớ kết quả các phép cộng trong bảng để tính nhẩm nhanh.',
    'Biết đổi chỗ hai số trong phép cộng thì kết quả không đổi.',
  ],
  sections: [
    {
      heading: 'Bảng cộng (qua 10)',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi phép cộng trong bảng đều tính được bằng cách làm tròn 10. Ví dụ: 9 + 4 = 9 + 1 + 3 = 13.',
        },
        {
          type: 'table',
          head: ['9 cộng một số', '8 cộng một số', '7 cộng một số', '6 cộng một số'],
          rows: [
            ['9 + 2 = 11', '8 + 3 = 11', '7 + 4 = 11', '6 + 5 = 11'],
            ['9 + 3 = 12', '8 + 4 = 12', '7 + 5 = 12', '6 + 6 = 12'],
            ['9 + 4 = 13', '8 + 5 = 13', '7 + 6 = 13', '6 + 7 = 13'],
            ['9 + 5 = 14', '8 + 6 = 14', '7 + 7 = 14', '6 + 8 = 14'],
            ['9 + 6 = 15', '8 + 7 = 15', '7 + 8 = 15', '6 + 9 = 15'],
            ['9 + 7 = 16', '8 + 8 = 16', '7 + 9 = 16', '—'],
            ['9 + 8 = 17', '8 + 9 = 17', '—', '—'],
            ['9 + 9 = 18', '—', '—', '—'],
          ],
        },
        {
          type: 'table',
          head: ['5 cộng một số', '4 cộng một số', '3 cộng một số', '2 cộng một số'],
          rows: [
            ['5 + 6 = 11', '4 + 7 = 11', '3 + 8 = 11', '2 + 9 = 11'],
            ['5 + 7 = 12', '4 + 8 = 12', '3 + 9 = 12', '—'],
            ['5 + 8 = 13', '4 + 9 = 13', '—', '—'],
            ['5 + 9 = 14', '—', '—', '—'],
          ],
        },
      ],
    },
    {
      heading: 'Ghi nhớ bảng cộng',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Mỗi hàng một kết quả',
          text: 'Các phép cộng cùng một hàng có cùng kết quả: 9 + 2, 8 + 3, 7 + 4, 6 + 5 đều bằng 11.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Đổi chỗ hai số',
          text: 'Khi đổi chỗ hai số trong phép cộng, kết quả không thay đổi. 9 + 2 = 11 thì 2 + 9 = 11.',
        },
        {
          type: 'p',
          text: 'Quên kết quả? Em làm tròn 10 với số lớn hơn: 5 + 8 = 8 + 5. Tách 5 = 2 + 3. 8 + 2 = 10. 10 + 3 = 13.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thẻ ghi nhớ có đếm giờ',
    instruction:
      'Chọn bộ thẻ rồi chạm "Bắt đầu". Mỗi thẻ, em chạm vào kết quả đúng; thẻ lật lại cho em xem đáp án và cách tính. Cuối lượt, em xem mình đúng mấy thẻ và hết bao nhiêu thời gian.',
  },
  examples: [
    {
      problem: 'Tính nhẩm: 8 + 7.',
      steps: ['8 cần thêm 2 là đủ 10. Tách 7 = 2 + 5.', '8 + 2 = 10.', '10 + 5 = 15.'],
      answer: '8 + 7 = 15.',
    },
    {
      problem: 'Biết 9 + 6 = 15. Tính 6 + 9.',
      steps: [
        '6 + 9 và 9 + 6 có cùng hai số, chỉ đổi chỗ cho nhau.',
        'Đổi chỗ hai số, kết quả không thay đổi.',
      ],
      answer: '6 + 9 = 15.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '8 + 7 = ?',
      options: ['14', '15', '16'],
      answer: 1,
      hints: ['8 cần thêm 2 là đủ 10.', 'Tách 7 = 2 + 5.'],
      solution: '8 + 2 = 10. 10 + 5 = 15. Vậy 8 + 7 = 15.',
    },
    {
      type: 'choice',
      prompt: '6 + 9 = 9 + ?',
      options: ['9', '6', '15'],
      answer: 1,
      hints: ['Đổi chỗ hai số, kết quả không thay đổi.'],
      solution: '6 + 9 = 9 + 6. Hai phép cộng đều bằng 15.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép cộng với kết quả của nó.',
      left: ['9 + 6', '8 + 8', '7 + 4', '5 + 7'],
      right: ['15', '16', '11', '12', '13'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em nhớ lại bảng cộng, hoặc làm tròn 10.', '5 + 7 = 7 + 5.'],
      solution: '9 + 6 = 15. 8 + 8 = 16. 7 + 4 = 11. 5 + 7 = 12.',
    },
    {
      type: 'choice',
      prompt: 'Phép cộng nào có kết quả bằng 12?',
      options: ['9 + 4', '8 + 4', '7 + 4'],
      answer: 1,
      hints: ['Tính từng phép cộng.'],
      solution: '9 + 4 = 13. 8 + 4 = 12. 7 + 4 = 11. Phép cộng có kết quả bằng 12 là 8 + 4.',
    },
    {
      type: 'choice',
      prompt: 'Phép cộng nào có kết quả lớn nhất?',
      options: ['7 + 6', '8 + 6', '9 + 3'],
      answer: 1,
      hints: ['Tính kết quả từng phép cộng rồi so sánh.'],
      solution:
        '7 + 6 = 13. 8 + 6 = 14. 9 + 3 = 12. Số lớn nhất là 14, nên 8 + 6 có kết quả lớn nhất.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép cộng theo kết quả từ bé đến lớn.',
      items: ['9 + 8', '6 + 5', '7 + 6', '8 + 7'],
      answer: [1, 2, 3, 0],
      hints: ['Tính kết quả từng phép cộng trước.', 'Các kết quả là 17, 11, 13, 15.'],
      solution:
        '6 + 5 = 11, 7 + 6 = 13, 8 + 7 = 15, 9 + 8 = 17. Từ bé đến lớn: 6 + 5, 7 + 6, 8 + 7, 9 + 8.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 5 + 9 ... 9 + 5',
      options: ['>', '<', '='],
      answer: 2,
      hints: ['Hai phép cộng có cùng hai số, chỉ đổi chỗ.'],
      solution:
        'Đổi chỗ hai số, kết quả không thay đổi: 5 + 9 = 14 và 9 + 5 = 14. Vậy 5 + 9 = 9 + 5.',
    },
    {
      type: 'count',
      prompt: 'Có 8 bông hoa và 7 bông hoa nữa. Hình vẽ tất cả số hoa. Có tất cả mấy bông hoa?',
      picture: 'flower',
      answer: 15,
      choices: [14, 15, 16],
      hints: ['Em tính 8 + 7 theo bảng cộng.'],
      solution: '8 + 7 = 15. Có tất cả 15 bông hoa.',
    },
  ],
  takeaways: [
    'Bảng cộng (qua 10) gồm các phép cộng có kết quả từ 11 đến 18.',
    'Đổi chỗ hai số trong phép cộng, kết quả không thay đổi.',
    'Quên kết quả thì em làm tròn 10 rồi cộng tiếp.',
  ],
};
