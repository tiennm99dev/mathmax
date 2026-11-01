/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép nhân lớp 2: đổi phép cộng các số hạng bằng nhau thành phép nhân, viết dấu nhân và đọc phép nhân.',
  intro:
    'Có 3 đĩa cam, mỗi đĩa 2 quả. Em cộng 2 + 2 + 2 hơi dài. Trong bài này, em học cách viết gọn hơn: phép nhân.',
  objectives: [
    'Nhận ra các nhóm có số đồ vật bằng nhau.',
    'Đổi phép cộng các số hạng bằng nhau thành phép nhân.',
    'Viết và đọc được phép nhân với dấu nhân.',
  ],
  sections: [
    {
      heading: 'Từ phép cộng đến phép nhân',
      blocks: [
        { type: 'p', text: 'Có 3 đĩa cam. Mỗi đĩa có 2 quả.' },
        { type: 'p', text: 'Em cộng: 2 + 2 + 2 = 6. Có tất cả 6 quả cam.' },
        { type: 'p', text: 'Số 2 được lấy 3 lần. Ta viết gọn là 2 × 3 = 6.' },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phép nhân',
          text: 'Phép cộng có các số hạng bằng nhau viết được thành phép nhân.',
        },
      ],
    },
    {
      heading: 'Dấu nhân',
      blocks: [
        { type: 'p', text: 'Dấu × gọi là dấu nhân.' },
        { type: 'p', text: '2 × 3 = 6 đọc là: hai nhân ba bằng sáu.' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhớ nhé',
          text: 'Số đứng trước dấu nhân là số được lấy. Số đứng sau dấu nhân là số lần lấy.',
        },
      ],
    },
    {
      heading: 'Khi nào viết được phép nhân?',
      blocks: [
        {
          type: 'table',
          head: ['Phép cộng', 'Viết được phép nhân?'],
          rows: [
            ['3 + 3 + 3 + 3', 'Được: 3 × 4'],
            ['5 + 5', 'Được: 5 × 2'],
            ['2 + 4 + 3', 'Không, vì các số khác nhau'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Các số hạng phải bằng nhau thì mới đổi được thành phép nhân.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp quả vào đĩa',
    instruction:
      'Em chạm dấu + và dấu − để đặt quả lên từng đĩa, chạm "Thêm đĩa" nếu cần thêm đĩa. Khi các đĩa bằng nhau, phép cộng sẽ đổi được thành phép nhân.',
  },
  examples: [
    {
      problem: 'Có 4 túi bánh, mỗi túi 3 cái. Em viết phép nhân tính số bánh.',
      steps: [
        'Mỗi túi có 3 cái, nên số 3 được cộng 4 lần: 3 + 3 + 3 + 3 = 12.',
        'Số 3 được lấy 4 lần, ta viết 3 × 4.',
      ],
      answer: '3 × 4 = 12. Có 12 cái bánh.',
    },
    {
      problem: 'Viết 4 × 5 thành phép cộng rồi tính.',
      steps: ['Số 4 được lấy 5 lần: 4 + 4 + 4 + 4 + 4.', 'Em cộng dần: 4, 8, 12, 16, 20.'],
      answer: '4 × 5 = 4 + 4 + 4 + 4 + 4 = 20.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt:
        'Cô có 3 đĩa, mỗi đĩa 3 quả táo. Cô đổ chung vào rổ như hình. Trong rổ có mấy quả táo?',
      picture: 'apple',
      answer: 9,
      choices: [6, 7, 8, 9, 10, 12],
      hints: ['Em chạm từng quả và đếm.', 'Em cũng có thể tính 3 + 3 + 3.'],
      solution: '3 + 3 + 3 = 9, tức là 3 × 3 = 9. Trong rổ có 9 quả táo.',
    },
    {
      type: 'choice',
      prompt: '5 + 5 + 5 viết thành phép nhân nào?',
      options: ['5 × 3', '5 × 5', '3 × 3', '5 + 3'],
      answer: 0,
      hints: ['Số nào được cộng nhiều lần?', 'Số đó được cộng mấy lần?'],
      solution: 'Số 5 được lấy 3 lần, nên 5 + 5 + 5 = 5 × 3.',
    },
    {
      type: 'choice',
      prompt: 'Phép cộng nào đổi được thành phép nhân?',
      options: ['2 + 3 + 4', '4 + 4 + 4', '5 + 1', '3 + 3 + 2'],
      answer: 1,
      hints: ['Em tìm phép cộng có các số hạng bằng nhau.'],
      solution: '4 + 4 + 4 có các số hạng đều là 4, nên viết được 4 × 3.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép nhân với phép cộng đúng.',
      left: ['4 × 2', '2 × 4', '3 × 3'],
      right: ['2 + 2 + 2 + 2', '3 + 3 + 3', '4 + 4'],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 1],
      ],
      hints: ['Số đứng trước dấu nhân là số được lấy. Số đứng sau là số lần lấy.'],
      solution: '4 × 2 = 4 + 4. 2 × 4 = 2 + 2 + 2 + 2. 3 × 3 = 3 + 3 + 3.',
    },
    {
      type: 'choice',
      prompt: '5 × 2 = 10 đọc là gì?',
      options: ['Năm cộng hai bằng mười', 'Năm nhân hai bằng mười', 'Hai nhân năm bằng mười'],
      answer: 1,
      hints: ['Dấu × đọc là "nhân". Em đọc từ trái sang phải.'],
      solution: '5 × 2 = 10 đọc là: năm nhân hai bằng mười.',
    },
    {
      type: 'choice',
      prompt: 'Mỗi con thỏ có 4 chân. Phép nhân nào cho biết 3 con thỏ có mấy chân?',
      options: ['4 + 3', '3 × 3', '4 × 3', '4 × 4'],
      answer: 2,
      hints: ['Mỗi con thỏ có 4 chân, nên số 4 được lấy mấy lần?'],
      solution: 'Có 3 con thỏ nên số 4 được lấy 3 lần: 4 × 3 = 12 (chân).',
    },
    {
      type: 'number',
      prompt: 'Em viết 3 × 5 thành phép cộng rồi tính. 3 × 5 bằng bao nhiêu?',
      answer: 15,
      hints: ['Số 3 được lấy 5 lần.', 'Em cộng dần: 3, 6, ...'],
      solution: '3 × 5 = 3 + 3 + 3 + 3 + 3 = 15.',
    },
    {
      type: 'order',
      prompt: 'Mỗi xe đạp có 2 bánh. 4 xe đạp có 8 bánh. Em xếp các thẻ thành phép nhân đúng.',
      items: ['8', '×', '2', '=', '4'],
      answer: [2, 1, 4, 3, 0],
      hints: ['Số bánh của mỗi xe đứng trước dấu nhân.'],
      solution: 'Số 2 được lấy 4 lần: 2 × 4 = 8.',
    },
  ],
  takeaways: [
    'Phép nhân là cách viết gọn phép cộng có các số hạng bằng nhau.',
    'Dấu × gọi là dấu nhân, đọc là "nhân".',
    'Số trước dấu nhân là số được lấy, số sau dấu nhân là số lần lấy.',
  ],
};
