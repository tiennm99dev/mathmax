/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hơn, kém nhau bao nhiêu: muốn biết số lớn hơn số bé bao nhiêu, ta lấy số lớn trừ số bé; nhiều hơn, ít hơn bao nhiêu đơn vị.',
  intro:
    'Tổ em có 9 bạn gái và 6 bạn trai. Bạn gái nhiều hơn bạn trai mấy bạn? Em ghép từng cặp một bạn gái với một bạn trai rồi đếm số bạn còn lại nhé!',
  objectives: [
    'Biết số lớn hơn số bé bao nhiêu, số bé kém số lớn bao nhiêu.',
    'Tìm phần hơn, kém bằng phép trừ: lấy số lớn trừ số bé.',
    'Giải bài toán hỏi nhiều hơn, ít hơn bao nhiêu.',
  ],
  sections: [
    {
      heading: 'Ghép cặp để so sánh',
      blocks: [
        {
          type: 'p',
          text: 'Có 9 bạn gái và 6 bạn trai. Em ghép mỗi bạn trai với một bạn gái.',
        },
        {
          type: 'p',
          text: 'Ghép xong 6 cặp, còn 3 bạn gái chưa có cặp. Đó là phần hơn.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phần hơn',
          text: 'Số bạn gái nhiều hơn số bạn trai 3 bạn. Số bạn trai ít hơn số bạn gái 3 bạn.',
        },
      ],
    },
    {
      heading: 'Hơn, kém nhau bao nhiêu',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cách tìm',
          text: 'Muốn biết hai số hơn, kém nhau bao nhiêu, em lấy số lớn trừ số bé.',
        },
        {
          type: 'p',
          text: '9 − 6 = 3. Ta nói: 9 hơn 6 là 3. 6 kém 9 là 3.',
        },
        {
          type: 'table',
          head: ['Số lớn', 'Số bé', 'Phép trừ', 'Hơn, kém'],
          rows: [
            ['9', '6', '9 − 6 = 3', '9 hơn 6 là 3'],
            ['15', '10', '15 − 10 = 5', '10 kém 15 là 5'],
            ['48', '20', '48 − 20 = 28', '48 hơn 20 là 28'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Luôn lấy số lớn trừ số bé, dù đề bài hỏi "nhiều hơn" hay "ít hơn".',
        },
      ],
    },
  ],
  explore: {
    title: 'Hai hàng khối',
    instruction:
      'Chạm + hoặc − để đổi số khối ở mỗi hàng. Chạm "Ghép cặp và tô phần hơn": các khối thừa được tô màu cam và đánh số. Rồi chọn số khối hơn, kém.',
  },
  examples: [
    {
      problem: 'Số 14 hơn số 10 là bao nhiêu?',
      steps: ['Số lớn là 14, số bé là 10.', 'Lấy số lớn trừ số bé: 14 − 10 = 4.'],
      answer: '14 hơn 10 là 4.',
    },
    {
      problem:
        'Lớp 2A trồng được 35 cây, lớp 2B trồng được 23 cây. Lớp 2B trồng được ít hơn lớp 2A bao nhiêu cây?',
      steps: [
        'Số lớn là 35, số bé là 23.',
        'Lấy số lớn trừ số bé: 35 − 23 = 12.',
        'Bài giải: Lớp 2B trồng được ít hơn lớp 2A số cây là: 35 − 23 = 12 (cây).',
      ],
      answer: 'Đáp số: 12 cây.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Có 8 quả cam và 5 quả táo. Cam nhiều hơn táo mấy quả?',
      options: ['3', '13', '5'],
      answer: 0,
      hints: ['Lấy số lớn trừ số bé.', 'Tính 8 − 5.'],
      solution: '8 − 5 = 3. Cam nhiều hơn táo 3 quả.',
    },
    {
      type: 'choice',
      prompt: 'Số 7 kém số 10 là bao nhiêu?',
      options: ['17', '3', '7'],
      answer: 1,
      hints: ['Số lớn là 10, số bé là 7.'],
      solution: '10 − 7 = 3. 7 kém 10 là 3.',
    },
    {
      type: 'choice',
      prompt: 'Số 60 hơn số 40 là bao nhiêu?',
      options: ['20', '100', '10'],
      answer: 0,
      hints: ['6 chục trừ 4 chục bằng mấy chục?'],
      solution: '60 − 40 = 20. 60 hơn 40 là 20.',
    },
    {
      type: 'choice',
      prompt: 'Mai có 12 cái kẹo, Nam có 15 cái kẹo. Mai có ít hơn Nam mấy cái kẹo?',
      options: ['27', '2', '3'],
      answer: 2,
      hints: ['Ai có nhiều kẹo hơn? Lấy số lớn trừ số bé.', 'Tính 15 − 12.'],
      solution: '15 − 12 = 3. Mai có ít hơn Nam 3 cái kẹo.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi cặp số với phần hơn, kém của chúng.',
      left: ['9 và 4', '29 và 25', '37 và 30', '58 và 56'],
      right: ['5', '4', '7', '2', '3'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Với mỗi cặp, lấy số lớn trừ số bé.', '29 − 25: hàng đơn vị 9 − 5, hàng chục 2 − 2.'],
      solution: '9 − 4 = 5. 29 − 25 = 4. 37 − 30 = 7. 58 − 56 = 2.',
    },
    {
      type: 'choice',
      prompt: 'Bạn Hà cao 95 cm, bạn Lan cao 92 cm. Hà cao hơn Lan bao nhiêu xăng-ti-mét?',
      options: ['2 cm', '3 cm', '187 cm'],
      answer: 1,
      hints: ['Lấy số lớn trừ số bé.', 'Tính 95 − 92.'],
      solution: '95 − 92 = 3. Hà cao hơn Lan 3 cm.',
    },
    {
      type: 'choice',
      prompt: 'Muốn biết 47 hơn 25 bao nhiêu, em làm phép tính nào?',
      options: ['47 + 25', '47 − 25', '25 − 47'],
      answer: 1,
      hints: ['Lấy số lớn trừ số bé.'],
      solution: 'Em làm phép trừ 47 − 25 = 22. 47 hơn 25 là 22.',
    },
    {
      type: 'choice',
      prompt:
        'Thùng thứ nhất có 68 l nước, thùng thứ hai có 45 l nước. Thùng thứ hai ít hơn thùng thứ nhất bao nhiêu lít nước?',
      options: ['23 l', '13 l', '113 l'],
      answer: 0,
      hints: ['Số lớn là 68, số bé là 45.', 'Hàng đơn vị: 8 − 5. Hàng chục: 6 − 4.'],
      solution: '68 − 45 = 23. Thùng thứ hai ít hơn thùng thứ nhất 23 l nước.',
    },
  ],
  takeaways: [
    'Muốn biết hai số hơn, kém nhau bao nhiêu, em lấy số lớn trừ số bé.',
    '9 − 6 = 3: 9 hơn 6 là 3, 6 kém 9 là 3.',
  ],
};
