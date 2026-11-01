/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép chia lớp 2: chia đều thành các phần bằng nhau, chia theo nhóm, viết dấu chia và lập phép chia từ phép nhân.',
  intro:
    'Có 6 cái kẹo cho 2 bạn. Làm sao để hai bạn được bằng nhau? Em cùng chia kẹo và học phép tính mới: phép chia.',
  objectives: [
    'Chia đều một số đồ vật thành các phần bằng nhau.',
    'Chia đồ vật theo nhóm có số lượng bằng nhau.',
    'Viết và đọc phép chia, lập phép chia từ phép nhân.',
  ],
  sections: [
    {
      heading: 'Chia đều thành các phần',
      blocks: [
        { type: 'p', text: 'Có 6 cái kẹo, chia đều cho 2 bạn.' },
        { type: 'p', text: 'Mỗi bạn được 3 cái kẹo. Ta viết 6 : 2 = 3.' },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dấu chia',
          text: 'Dấu : gọi là dấu chia. 6 : 2 = 3 đọc là: sáu chia hai bằng ba.',
        },
      ],
    },
    {
      heading: 'Chia theo nhóm',
      blocks: [
        { type: 'p', text: 'Có 6 cái kẹo, mỗi bạn được 2 cái.' },
        { type: 'p', text: 'Chia được cho 3 bạn. Ta cũng viết 6 : 2 = 3.' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em thấy gì?',
          text: 'Cùng một phép chia 6 : 2 = 3, nhưng 3 ở đây là số bạn, không phải số kẹo.',
        },
      ],
    },
    {
      heading: 'Từ phép nhân đến phép chia',
      blocks: [
        { type: 'p', text: '3 × 2 = 6 cho ta hai phép chia: 6 : 2 = 3 và 6 : 3 = 2.' },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ghi nhớ',
          text: 'Từ một phép nhân, em viết được hai phép chia.',
        },
        {
          type: 'p',
          text: 'Phép chia cũng dùng với đơn vị: 5 cm × 2 = 10 cm, nên 10 cm : 2 = 5 cm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chia kẹo cho các bạn',
    instruction:
      'Em kéo từng cái kẹo từ bát vào đĩa của các bạn, hoặc chạm vào kẹo. Chạm vào kẹo trên đĩa để lấy lại. Chia xong, phép chia sẽ hiện ra. Chọn "Chia theo nhóm" để thử cách chia thứ hai.',
  },
  examples: [
    {
      problem: 'Có 8 cái bánh, chia đều vào 2 đĩa. Mỗi đĩa có mấy cái bánh?',
      steps: ['Em xếp lần lượt vào từng đĩa cho đến hết.', 'Mỗi đĩa có 4 cái, vì 4 × 2 = 8.'],
      answer: '8 : 2 = 4. Mỗi đĩa có 4 cái bánh.',
    },
    {
      problem: 'Có 10 quả cam, xếp vào các túi, mỗi túi 5 quả. Xếp được mấy túi?',
      steps: ['Mỗi lần em lấy ra 5 quả cho một túi.', 'Lấy 2 lần thì hết cam, vì 5 × 2 = 10.'],
      answer: '10 : 5 = 2. Xếp được 2 túi.',
    },
    {
      problem: 'Từ phép nhân 2 × 4 = 8, em viết hai phép chia.',
      steps: ['Tích 8 đứng đầu phép chia.', 'Lấy 8 chia cho từng thừa số.'],
      answer: '8 : 2 = 4 và 8 : 4 = 2.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Có 12 cái kẹo, chia đều cho 3 bạn. Mỗi bạn được mấy cái?',
      options: ['3', '4', '9', '15'],
      answer: 1,
      hints: ['Em chia lần lượt cho từng bạn.', 'Số nào nhân với 3 thì được 12?'],
      solution: '12 : 3 = 4, vì 4 × 3 = 12. Mỗi bạn được 4 cái.',
    },
    {
      type: 'choice',
      prompt: 'Có 20 hạt dẻ, chia đều cho 4 bạn. Mỗi bạn được mấy hạt?',
      options: ['4', '5', '10', '16'],
      answer: 1,
      hints: ['Em đếm thêm 5 cho đủ 4 lần xem có đến 20 không.'],
      solution: '20 : 4 = 5, vì 5 × 4 = 20. Mỗi bạn được 5 hạt dẻ.',
    },
    {
      type: 'number',
      prompt: 'Có 15 quả táo, xếp vào các đĩa, mỗi đĩa 5 quả. Xếp được mấy đĩa?',
      answer: 3,
      hints: ['Mỗi lần lấy 5 quả. Em đếm thêm 5 đến 15.'],
      solution: '15 : 5 = 3, vì 5 × 3 = 15. Xếp được 3 đĩa.',
    },
    {
      type: 'choice',
      prompt: 'Có 14 cái bút, chia đều cho 2 bạn. Phép tính nào đúng?',
      options: ['14 : 2', '14 − 2', '14 × 2', '2 : 14'],
      answer: 0,
      hints: ['Chia đều thì em dùng phép chia. Số cần chia đứng trước.'],
      solution: '14 cái bút chia đều cho 2 bạn: 14 : 2 = 7 (cái bút).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép nhân với phép chia lập được từ nó.',
      left: ['5 × 2 = 10', '6 × 2 = 12', '2 × 9 = 18'],
      right: ['18 : 2 = 9', '12 : 6 = 2', '10 : 5 = 2'],
      pairs: [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
      hints: ['Tích của phép nhân đứng đầu phép chia.'],
      solution: 'Tích 10 cho 10 : 5 = 2. Tích 12 cho 12 : 6 = 2. Tích 18 cho 18 : 2 = 9.',
    },
    {
      type: 'multi',
      prompt: 'Từ phép nhân 4 × 3 = 12, em viết được những phép chia nào?',
      options: ['12 : 4 = 3', '12 : 3 = 4', '4 : 3 = 12', '3 : 12 = 4'],
      answers: [0, 1],
      hints: ['Phép chia bắt đầu bằng tích 12.', 'Có hai phép chia đúng.'],
      solution: '4 × 3 = 12 cho 12 : 4 = 3 và 12 : 3 = 4.',
    },
    {
      type: 'choice',
      prompt: '16 : 2 = 8 đọc là gì?',
      options: [
        'Mười sáu chia hai bằng tám',
        'Mười sáu nhân hai bằng tám',
        'Hai chia mười sáu bằng tám',
      ],
      answer: 0,
      hints: ['Dấu : đọc là "chia". Em đọc từ trái sang phải.'],
      solution: '16 : 2 = 8 đọc là: mười sáu chia hai bằng tám.',
    },
    {
      type: 'order',
      prompt: 'Có 10 bông hoa, cắm đều vào 2 lọ, mỗi lọ 5 bông. Em xếp thẻ thành phép chia đúng.',
      items: ['5', '=', ':', '10', '2'],
      answer: [3, 2, 4, 1, 0],
      hints: ['Số hoa cần chia đứng đầu tiên.'],
      solution: '10 : 2 = 5.',
    },
    {
      type: 'choice',
      prompt: 'Chia đều 6 kg gạo vào 2 túi. Mỗi túi có bao nhiêu ki-lô-gam gạo?',
      options: ['3 kg', '4 kg', '8 kg', '12 kg'],
      answer: 0,
      hints: ['Em tính 6 : 2 rồi viết thêm đơn vị kg.'],
      solution: '6 kg : 2 = 3 kg. Mỗi túi có 3 kg gạo.',
    },
  ],
  takeaways: [
    'Chia đều thành các phần: tìm mỗi phần có bao nhiêu.',
    'Chia theo nhóm: tìm chia được mấy nhóm.',
    'Dấu : gọi là dấu chia. Từ một phép nhân, em viết được hai phép chia.',
  ],
};
