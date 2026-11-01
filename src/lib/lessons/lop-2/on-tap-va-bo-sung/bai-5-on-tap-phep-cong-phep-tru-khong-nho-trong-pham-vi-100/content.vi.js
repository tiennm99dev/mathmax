/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập phép cộng, phép trừ (không nhớ) trong phạm vi 100: tính nhẩm số tròn chục, đặt tính rồi tính, tên các thành phần, hơn kém nhau bao nhiêu và giải bài toán.',
  intro:
    'Em đã biết cộng, trừ không nhớ các số trong phạm vi 100. Hôm nay em ôn lại cách tính nhẩm, đặt tính rồi tính và giải bài toán. Bài ôn tập sẽ cho em biết phần nào cần luyện thêm nhé!',
  objectives: [
    'Tính nhẩm cộng, trừ các số tròn chục.',
    'Đặt tính rồi tính phép cộng, phép trừ không nhớ trong phạm vi 100.',
    'Gọi đúng tên các thành phần của phép cộng, phép trừ.',
    'Giải bài toán có một phép cộng hoặc một phép trừ.',
  ],
  sections: [
    {
      heading: 'Tính nhẩm số tròn chục',
      blocks: [
        {
          type: 'p',
          text: 'Em tính theo số chục.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ví dụ',
          text: '30 + 50 = 80, vì 3 chục + 5 chục = 8 chục. 90 − 40 = 50, vì 9 chục − 4 chục = 5 chục.',
        },
      ],
    },
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt tính: viết các chữ số cùng hàng thẳng cột với nhau. Đơn vị thẳng đơn vị, chục thẳng chục.',
            'Tính từ phải sang trái: hàng đơn vị trước, hàng chục sau.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Phép cộng',
          text: '42 + 35: 2 + 5 = 7, viết 7. 4 + 3 = 7, viết 7. Vậy 42 + 35 = 77.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Phép trừ',
          text: '86 − 4: 6 − 4 = 2, viết 2. Hạ 8, viết 8. Vậy 86 − 4 = 82.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Số có một chữ số phải viết thẳng cột đơn vị, không viết dưới hàng chục.',
        },
      ],
    },
    {
      heading: 'Nhớ lại tên gọi',
      blocks: [
        {
          type: 'p',
          text: 'Số hạng + số hạng = tổng.',
        },
        {
          type: 'p',
          text: 'Số bị trừ − số trừ = hiệu.',
        },
        {
          type: 'p',
          text: 'Muốn biết hai số hơn, kém nhau bao nhiêu, em lấy số lớn trừ số bé.',
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
      problem: 'Đặt tính rồi tính: 53 + 26.',
      steps: [
        'Viết 53, viết 26 bên dưới: 6 thẳng cột với 3, 2 thẳng cột với 5.',
        'Hàng đơn vị: 3 + 6 = 9, viết 9.',
        'Hàng chục: 5 + 2 = 7, viết 7.',
      ],
      answer: '53 + 26 = 79.',
    },
    {
      problem:
        'Cửa hàng có 48 quả bóng, đã bán 15 quả bóng. Hỏi cửa hàng còn lại bao nhiêu quả bóng?',
      steps: [
        'Đã bán là bớt đi: em làm phép trừ 48 − 15.',
        'Hàng đơn vị: 8 − 5 = 3. Hàng chục: 4 − 1 = 3.',
        'Bài giải: Cửa hàng còn lại số quả bóng là: 48 − 15 = 33 (quả bóng).',
      ],
      answer: 'Đáp số: 33 quả bóng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '40 + 30 = ?',
      options: ['10', '70', '43'],
      answer: 1,
      hints: ['4 chục cộng 3 chục bằng mấy chục?'],
      solution: '4 chục + 3 chục = 7 chục. Vậy 40 + 30 = 70.',
    },
    {
      type: 'choice',
      prompt: '80 − 50 = ?',
      options: ['30', '130', '35'],
      answer: 0,
      hints: ['8 chục bớt 5 chục còn mấy chục?'],
      solution: '8 chục − 5 chục = 3 chục. Vậy 80 − 50 = 30.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả.',
      left: ['23 + 5', '61 + 27', '59 − 6', '97 − 45'],
      right: ['28', '88', '53', '52', '73'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Tính hàng đơn vị trước, rồi đến hàng chục.', '59 − 6: hàng đơn vị 9 − 6.'],
      solution: '23 + 5 = 28. 61 + 27 = 88. 59 − 6 = 53. 97 − 45 = 52.',
    },
    {
      type: 'choice',
      prompt: 'Bạn Nam đặt tính 34 + 5 như sau: viết 5 thẳng cột với 3. Nam đặt tính đúng hay sai?',
      options: ['Đúng', 'Sai'],
      answer: 1,
      hints: ['5 là số có một chữ số: 5 đơn vị.', 'Đơn vị phải thẳng cột đơn vị.'],
      solution: 'Sai. 5 phải viết thẳng cột với 4 (hàng đơn vị). 34 + 5 = 39.',
    },
    {
      type: 'choice',
      prompt: '76 − 32 = ?',
      options: ['44', '108', '34'],
      answer: 0,
      hints: ['Hàng đơn vị: 6 − 2. Hàng chục: 7 − 3.'],
      solution: '6 − 2 = 4, viết 4. 7 − 3 = 4, viết 4. Vậy 76 − 32 = 44.',
    },
    {
      type: 'choice',
      prompt: 'Các số hạng là 52 và 46. Tổng là bao nhiêu?',
      options: ['6', '98', '88'],
      answer: 1,
      hints: ['Muốn tính tổng, em cộng các số hạng.'],
      solution: '52 + 46 = 98. Tổng là 98.',
    },
    {
      type: 'choice',
      prompt: 'Số bị trừ là 65, số trừ là 40. Hiệu là bao nhiêu?',
      options: ['25', '105', '15'],
      answer: 0,
      hints: ['Muốn tính hiệu, em lấy số bị trừ trừ đi số trừ.'],
      solution: '65 − 40 = 25. Hiệu là 25.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu đúng: 45 + 32 ... 78',
      options: ['>', '<', '='],
      answer: 1,
      hints: ['Tính 45 + 32 trước, rồi so sánh với 78.'],
      solution: '45 + 32 = 77. 77 < 78, nên 45 + 32 < 78.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép tính theo kết quả từ bé đến lớn.',
      items: ['50 + 20', '99 − 9', '30 + 4', '68 − 8'],
      answer: [2, 3, 0, 1],
      hints: ['Em tính kết quả từng phép tính trước.', 'Kết quả là 70, 90, 34 và 60.'],
      solution: '30 + 4 = 34, 68 − 8 = 60, 50 + 20 = 70, 99 − 9 = 90.',
    },
    {
      type: 'choice',
      prompt: 'Vườn trường có 34 cây cam và 25 cây bưởi. Hỏi vườn trường có tất cả bao nhiêu cây?',
      options: ['59', '9', '69'],
      answer: 0,
      hints: ['Có tất cả là gộp lại: em làm phép cộng.'],
      solution: '34 + 25 = 59. Vườn trường có tất cả 59 cây.',
    },
    {
      type: 'choice',
      prompt:
        'Tổ Một gấp được 27 bông hoa, tổ Hai gấp được 15 bông hoa. Tổ Một gấp được nhiều hơn tổ Hai bao nhiêu bông hoa?',
      options: ['42', '12', '13'],
      answer: 1,
      hints: ['Muốn biết nhiều hơn bao nhiêu, em lấy số lớn trừ số bé.', 'Tính 27 − 15.'],
      solution: '27 − 15 = 12. Tổ Một gấp được nhiều hơn tổ Hai 12 bông hoa.',
    },
  ],
  takeaways: [
    'Đặt tính: đơn vị thẳng đơn vị, chục thẳng chục; tính từ phải sang trái.',
    'Số tròn chục: tính theo số chục, như 3 chục + 5 chục = 8 chục.',
    'Hơn, kém nhau bao nhiêu: lấy số lớn trừ số bé.',
  ],
};
