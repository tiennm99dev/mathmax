/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép cộng không nhớ trong phạm vi 1000: đặt tính thẳng cột, cộng từ phải sang trái, hàng đơn vị, hàng chục rồi hàng trăm.',
  intro:
    'Thuyền của mèo vớt được hai hòm ngọc trai: một hòm 245 viên, một hòm 233 viên. Có tất cả bao nhiêu viên? Em gộp từng hàng là tìm ra ngay!',
  objectives: [
    'Đặt tính cộng số có ba chữ số, các chữ số cùng hàng thẳng cột.',
    'Cộng từng hàng, từ phải sang trái.',
    'Giải bài toán có phép cộng trong phạm vi 1000.',
  ],
  sections: [
    {
      heading: 'Gộp trăm, chục, đơn vị',
      blocks: [
        { type: 'p', text: 'Tính 247 + 351. Em gộp các khối cùng loại với nhau.' },
        {
          type: 'table',
          head: ['Hàng', 'Gộp lại', 'Được'],
          rows: [
            ['Đơn vị', '7 + 1', '8 đơn vị'],
            ['Chục', '4 + 5', '9 chục'],
            ['Trăm', '2 + 3', '5 trăm'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Em cộng các chữ số cùng hàng: đơn vị với đơn vị, chục với chục, trăm với trăm.',
        },
      ],
    },
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        {
          type: 'p',
          text: 'Em viết hai số sao cho các chữ số cùng hàng thẳng cột. Viết dấu +, kẻ gạch ngang.',
        },
        { type: 'p', text: 'Em tính từ phải sang trái: hàng đơn vị, hàng chục, rồi hàng trăm.' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách tính 247 + 351',
          text: '7 cộng 1 bằng 8, viết 8. 4 cộng 5 bằng 9, viết 9. 2 cộng 3 bằng 5, viết 5. Vậy 247 + 351 = 598.',
        },
        {
          type: 'table',
          head: ['Phép cộng', 'Đơn vị', 'Chục', 'Trăm', 'Kết quả'],
          rows: [
            ['526 + 32', '6 + 2 = 8', '2 + 3 = 5', 'Hạ 5', '558'],
            ['815 + 60', '5 + 0 = 5', '1 + 6 = 7', 'Hạ 8', '875'],
            ['923 + 6', '3 + 6 = 9', 'Hạ 2', 'Hạ 9', '929'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Với 923 + 6, em viết 6 thẳng cột với 3. Chữ số 6 ở hàng đơn vị, không viết dưới chữ số 9.',
        },
      ],
    },
  ],
  explore: {
    title: 'Gộp khối từng hàng',
    instruction:
      'Em gộp các khối của từng hàng, từ hàng đơn vị. Đếm các khối rồi chạm chữ số để viết kết quả.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 460 + 231.',
      steps: [
        'Hàng đơn vị: 0 cộng 1 bằng 1, viết 1.',
        'Hàng chục: 6 cộng 3 bằng 9, viết 9.',
        'Hàng trăm: 4 cộng 2 bằng 6, viết 6.',
      ],
      answer: '460 + 231 = 691.',
    },
    {
      problem: 'Đặt tính rồi tính: 800 + 37.',
      steps: [
        'Viết 37 sao cho 7 thẳng cột với chữ số 0 cuối cùng của 800.',
        'Hàng đơn vị: 0 cộng 7 bằng 7, viết 7.',
        'Hàng chục: 0 cộng 3 bằng 3, viết 3.',
        'Hàng trăm: hạ 8, viết 8.',
      ],
      answer: '800 + 37 = 837.',
    },
    {
      problem:
        'Thuyền của mèo vớt được hai hòm: 245 viên ngọc trai và 233 viên ngọc trai. Thuyền của mèo có tất cả bao nhiêu viên?',
      steps: ['Tìm tất cả nên em làm phép cộng: 245 + 233.', '5 + 3 = 8, 4 + 3 = 7, 2 + 2 = 4.'],
      answer: '245 + 233 = 478. Thuyền của mèo có 478 viên ngọc trai.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '326 + 253 = ?',
      options: ['579', '479', '569', '589'],
      answer: 0,
      hints: ['Em cộng từ hàng đơn vị: 6 + 3.', 'Hàng chục: 2 + 5. Hàng trăm: 3 + 2.'],
      solution: '6 cộng 3 bằng 9. 2 cộng 5 bằng 7. 3 cộng 2 bằng 5. Vậy 326 + 253 = 579.',
    },
    {
      type: 'number',
      prompt: 'Em tính: 432 + 261 = ?',
      answer: 693,
      hints: ['Hàng đơn vị: 2 + 1. Hàng chục: 3 + 6.', 'Hàng trăm: 4 + 2.'],
      solution: '2 cộng 1 bằng 3. 3 cộng 6 bằng 9. 4 cộng 2 bằng 6. Vậy 432 + 261 = 693.',
    },
    {
      type: 'choice',
      prompt: '732 + 55 = ?',
      options: ['787', '737', '777', '1282'],
      answer: 0,
      hints: [
        'Số 55 có hai chữ số. Em viết 5 đơn vị thẳng cột với 2.',
        'Chữ số 7 ở hàng trăm được hạ xuống.',
      ],
      solution: '2 cộng 5 bằng 7. 3 cộng 5 bằng 8. Hạ 7. Vậy 732 + 55 = 787.',
    },
    {
      type: 'number',
      prompt: 'Em tính: 923 + 6 = ?',
      answer: 929,
      hints: ['Em viết 6 thẳng cột với hàng đơn vị của 923.'],
      solution: '3 cộng 6 bằng 9. Hạ 2. Hạ 9. Vậy 923 + 6 = 929.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi phép cộng với kết quả đúng.',
      left: ['658 + 221', '850 + 130', '245 + 233', '150 + 307'],
      right: ['879', '980', '478', '457'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em cộng từng hàng cho mỗi phép tính rồi tìm kết quả.'],
      solution: '658 + 221 = 879. 850 + 130 = 980. 245 + 233 = 478. 150 + 307 = 457.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các phép tính theo kết quả, từ bé đến lớn.',
      items: ['732 + 55', '643 + 50', '460 + 231'],
      answer: [2, 1, 0],
      hints: ['Em tính kết quả của mỗi phép tính trước.', 'So sánh các kết quả từ hàng trăm.'],
      solution: '460 + 231 = 691, 643 + 50 = 693, 732 + 55 = 787. Vậy 691 < 693 < 787.',
    },
    {
      type: 'number',
      prompt:
        'Sư tử con nặng 107 kg. Hổ con nặng hơn sư tử con 32 kg. Hổ con nặng bao nhiêu ki-lô-gam?',
      answer: 139,
      unit: 'kg',
      hints: ['"Nặng hơn" nên em làm phép cộng.', 'Em tính 107 + 32.'],
      solution: 'Hổ con nặng là: 107 + 32 = 139 (kg). Đáp số: 139 kg.',
    },
    {
      type: 'number',
      prompt:
        'Vườn có 424 cây hoa hồng đỏ. Số cây hoa hồng trắng nhiều hơn số cây hoa hồng đỏ 120 cây. Có bao nhiêu cây hoa hồng trắng?',
      answer: 544,
      unit: 'cây',
      hints: ['"Nhiều hơn" nên em làm phép cộng.', 'Em tính 424 + 120.'],
      solution: 'Có số cây hoa hồng trắng là: 424 + 120 = 544 (cây). Đáp số: 544 cây.',
    },
    {
      type: 'choice',
      prompt:
        'Hải li về tổ theo một trong ba dòng nước. Dòng dưới cầu dài 778 m + 211 m. Dòng qua bãi đá dài 481 m + 513 m. Dòng ở giữa dài 900 m. Dòng nào ngắn nhất?',
      options: ['Dòng dưới cầu', 'Dòng qua bãi đá', 'Dòng ở giữa'],
      answer: 2,
      hints: ['Em tính độ dài của từng dòng rồi so sánh.'],
      solution: '778 + 211 = 989. 481 + 513 = 994. 900 < 989 < 994. Vậy dòng ở giữa ngắn nhất.',
    },
  ],
  takeaways: [
    'Đặt tính: các chữ số cùng hàng thẳng cột.',
    'Cộng từ phải sang trái: đơn vị, chục, rồi trăm.',
    'Hàng chỉ có một chữ số thì hạ chữ số đó xuống.',
  ],
};
