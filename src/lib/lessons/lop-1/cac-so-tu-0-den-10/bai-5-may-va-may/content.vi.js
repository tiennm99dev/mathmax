const ZERO_TO_TEN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tách một số trong phạm vi 10 thành hai phần và gộp hai phần thành một số: 5 gồm 2 và 3, 2 và 3 gộp lại được 5.',
  intro:
    'Trong bể có 5 con cá: 1 con cá to và 4 con cá nhỏ. Vậy 5 gồm 1 và 4! Em cùng tìm xem mỗi số gồm mấy và mấy nhé.',
  objectives: [
    'Tách một số trong phạm vi 10 thành hai phần.',
    'Gộp hai phần thành một số.',
    'Tìm được nhiều cách tách một số.',
  ],
  sections: [
    {
      heading: 'Tách số',
      blocks: [
        {
          type: 'p',
          text: 'Có 5 hạt. Em chia vào hai đĩa: đĩa trái 2 hạt, đĩa phải 3 hạt.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mấy và mấy',
          text: 'Ta nói: 5 gồm 2 và 3.',
        },
        {
          type: 'table',
          head: ['Số', 'Gồm', 'Và'],
          rows: [
            ['5', '1', '4'],
            ['5', '2', '3'],
            ['5', '3', '2'],
            ['5', '4', '1'],
          ],
          caption: 'Các cách tách số 5 thành hai phần',
        },
      ],
    },
    {
      heading: 'Gộp số',
      blocks: [
        {
          type: 'p',
          text: 'Em đổ hạt ở hai đĩa vào một bát. Trong bát lại có đủ 5 hạt.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Gộp lại',
          text: '2 và 3 gộp lại được 5.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Chuyển 1 hạt từ đĩa này sang đĩa kia, em được một cách tách mới. Tổng số hạt vẫn không đổi.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chia hạt vào hai đĩa',
    instruction:
      'Chọn tổng số hạt bằng nút − và +. Kéo thanh trượt để chia hạt vào hai đĩa. Em đọc câu "gồm ... và ..." rồi tìm đủ mọi cách tách số đó.',
  },
  examples: [
    {
      problem: 'Có 6 con chim: 2 con đậu trên cành, còn lại đậu dưới đất. 6 gồm 2 và mấy?',
      steps: ['Đếm số chim dưới đất: một, hai, ba, bốn.', 'Có 2 con trên cành và 4 con dưới đất.'],
      answer: '6 gồm 2 và 4.',
    },
    {
      problem: 'Đĩa trái có 3 quả cam, đĩa phải có 4 quả cam. Gộp lại được mấy quả cam?',
      steps: [
        'Đếm quả cam ở đĩa trái: một, hai, ba.',
        'Đếm tiếp quả cam ở đĩa phải: bốn, năm, sáu, bảy.',
      ],
      answer: '3 và 4 gộp lại được 7. Có 7 quả cam.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '4 gồm 1 và mấy?',
      options: ['2', '3', '4'],
      answer: 1,
      hints: ['Chia 4 hạt: 1 hạt ở đĩa trái. Đĩa phải còn mấy hạt?'],
      solution: 'Đếm tiếp từ 1 đến 4: hai, ba, bốn là 3 hạt. 4 gồm 1 và 3.',
    },
    {
      type: 'choice',
      prompt: '7 gồm 5 và mấy?',
      options: ['1', '2', '3'],
      answer: 1,
      hints: ['Có 5 hạt rồi, đếm tiếp đến 7: sáu, bảy.'],
      solution: 'Từ 5 đếm tiếp: sáu, bảy là thêm 2. 7 gồm 5 và 2.',
    },
    {
      type: 'choice',
      prompt: '10 gồm mấy và 6?',
      options: ['3', '4', '5'],
      answer: 1,
      hints: ['Có 6 hạt, đếm tiếp đến 10.', 'Bảy, tám, chín, mười.'],
      solution: 'Từ 6 đếm tiếp: bảy, tám, chín, mười là 4. 10 gồm 4 và 6.',
    },
    {
      type: 'count',
      prompt: 'Mẹ mua 2 quả dâu tây, bà cho thêm 3 quả. Gộp lại, có mấy quả dâu tây?',
      picture: 'strawberry',
      answer: 5,
      choices: ZERO_TO_TEN,
      hints: ['Đếm hết các quả dâu tây trong hình.'],
      solution: '2 và 3 gộp lại được 5. Có 5 quả dâu tây.',
    },
    {
      type: 'count',
      prompt: 'Có 4 con thỏ trong chuồng và 4 con thỏ ngoài vườn. Gộp lại, có mấy con thỏ?',
      picture: 'rabbit',
      answer: 8,
      choices: ZERO_TO_TEN,
      hints: ['Đếm 4 con đầu, rồi đếm tiếp: năm, sáu, ...'],
      solution: '4 và 4 gộp lại được 8. Có 8 con thỏ.',
    },
    {
      type: 'match',
      prompt: 'Nối để được câu đúng.',
      left: ['3 gồm 1 và', '6 gồm 3 và', '9 gồm 8 và'],
      right: ['1', '2', '3', '4'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Chia số hạt vào hai đĩa, đếm số hạt ở đĩa còn lại.'],
      solution: '3 gồm 1 và 2. 6 gồm 3 và 3. 9 gồm 8 và 1.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các cách tách số 5 đúng.',
      options: ['1 và 4', '2 và 2', '3 và 2', '4 và 2'],
      answers: [0, 2],
      hints: ['Gộp hai phần lại, em phải được 5.'],
      solution: '1 và 4 gộp được 5; 3 và 2 gộp được 5. Còn 2 và 2 được 4, 4 và 2 được 6.',
    },
    {
      type: 'choice',
      prompt: 'Mẹ có 8 bông hoa, cắm vào hai lọ. Lọ thứ nhất có 5 bông. Lọ thứ hai có mấy bông?',
      options: ['2', '3', '4'],
      answer: 1,
      hints: ['8 gồm 5 và mấy?', 'Từ 5 đếm tiếp đến 8.'],
      solution: 'Từ 5 đếm tiếp: sáu, bảy, tám là 3. 8 gồm 5 và 3, lọ thứ hai có 3 bông.',
    },
  ],
  takeaways: [
    'Một số có thể tách thành hai phần: 5 gồm 2 và 3.',
    'Gộp hai phần lại được số ban đầu: 2 và 3 gộp lại được 5.',
    'Một số có nhiều cách tách: 5 gồm 1 và 4, 2 và 3, 3 và 2, 4 và 1.',
  ],
};
