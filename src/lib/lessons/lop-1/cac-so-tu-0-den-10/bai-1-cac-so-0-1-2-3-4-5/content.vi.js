/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài toán lớp 1 đầu tiên: đếm đồ vật, đọc và viết các số 0, 1, 2, 3, 4, 5, và hiểu số 0 nghĩa là không có gì.',
  intro:
    'Em hãy đếm xem trên bàn có mấy quả táo! Trong bài này, em sẽ đếm đồ vật, đọc và viết các số từ 0 đến 5.',
  objectives: [
    'Đếm đúng số đồ vật trong một nhóm có đến 5 đồ vật.',
    'Đọc và viết các số 0, 1, 2, 3, 4, 5.',
    'Biết số 0 nghĩa là không có đồ vật nào.',
  ],
  sections: [
    {
      heading: 'Đếm đồ vật',
      blocks: [
        {
          type: 'p',
          text: 'Em chạm tay vào từng đồ vật và đếm: một, hai, ba. Mỗi đồ vật chỉ đếm một lần.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Đồ vật nào đã đếm, em đẩy sang một bên để không đếm lại.',
        },
        {
          type: 'p',
          text: 'Số cuối cùng em đọc chính là số đồ vật trong nhóm.',
        },
      ],
    },
    {
      heading: 'Các số 1, 2, 3, 4, 5',
      blocks: [
        {
          type: 'table',
          head: ['Số', 'Đọc là', 'Số chấm'],
          rows: [
            ['1', 'một', '●'],
            ['2', 'hai', '● ●'],
            ['3', 'ba', '● ● ●'],
            ['4', 'bốn', '● ● ● ●'],
            ['5', 'năm', '● ● ● ● ●'],
          ],
        },
        {
          type: 'p',
          text: 'Khi đếm, mỗi số sau nhiều hơn số trước một đồ vật: 1, 2, 3, 4, 5.',
        },
      ],
    },
    {
      heading: 'Số 0',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số 0',
          text: 'Khi không có đồ vật nào, ta dùng số 0, đọc là "không".',
        },
        {
          type: 'p',
          text: 'Đĩa có 1 quả táo. Bạn ăn mất quả táo đó. Bây giờ đĩa có 0 quả táo.',
        },
      ],
    },
  ],
  explore: {
    title: 'Khay đếm đồ vật',
    instruction:
      'Chạm vào đồ vật trên kệ để đặt vào khay cho đủ số. Chạm vào đồ vật trong khay để lấy ra. Chọn "Đếm và chọn số" để đếm khay rồi chạm vào thẻ số đúng.',
  },
  examples: [
    {
      problem: 'Có mấy ngôi sao: ⭐ ⭐ ⭐ ?',
      steps: ['Chạm từng ngôi sao và đếm: một, hai, ba.', 'Số cuối cùng em đọc là ba.'],
      answer: 'Có 3 ngôi sao.',
    },
    {
      problem: 'Bể cá có 2 con cá. Cả 2 con cá bơi sang bể khác. Bể còn mấy con cá?',
      steps: ['Bể không còn con cá nào.', 'Không có gì thì ta dùng số 0.'],
      answer: 'Bể còn 0 con cá.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Có mấy quả táo?',
      picture: 'apple',
      answer: 4,
      choices: [0, 1, 2, 3, 4, 5],
      hints: ['Chạm từng quả táo và đếm to.', 'Một, hai, ba, ...'],
      solution: 'Đếm: một, hai, ba, bốn. Có 4 quả táo.',
    },
    {
      type: 'count',
      prompt: 'Có mấy con cá?',
      picture: 'fish',
      answer: 2,
      choices: [0, 1, 2, 3, 4, 5],
      hints: ['Đếm từ trái sang phải.'],
      solution: 'Đếm: một, hai. Có 2 con cá.',
    },
    {
      type: 'count',
      prompt: 'Có mấy bông hoa?',
      picture: 'flower',
      answer: 5,
      choices: [0, 1, 2, 3, 4, 5],
      hints: ['Đếm chậm, mỗi bông hoa một lần.'],
      solution: 'Đếm: một, hai, ba, bốn, năm. Có 5 bông hoa.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số với cách đọc.',
      left: ['1', '3', '5'],
      right: ['năm', 'một', 'ba'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Em nhớ lại bảng: 1 là một, 2 là hai, ...'],
      solution: '1 đọc là "một", 3 đọc là "ba", 5 đọc là "năm".',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự đếm, từ bé đến lớn.',
      items: ['3', '0', '5', '1', '4', '2'],
      answer: [1, 3, 5, 0, 4, 2],
      hints: ['Bắt đầu từ số 0.', 'Sau 0 là 1, sau 1 là 2.'],
      solution: 'Thứ tự đếm là 0, 1, 2, 3, 4, 5.',
    },
    {
      type: 'choice',
      prompt: 'Đĩa không có quả táo nào. Đĩa có mấy quả táo?',
      options: ['0', '1', '5'],
      answer: 0,
      hints: ['Không có gì thì dùng số nào?'],
      solution: 'Không có quả táo nào, ta viết số 0.',
    },
  ],
  takeaways: [
    'Chạm và đếm từng đồ vật, mỗi đồ vật một lần.',
    'Số cuối cùng em đếm là số đồ vật.',
    'Các số: 0 (không), 1 (một), 2 (hai), 3 (ba), 4 (bốn), 5 (năm).',
    'Số 0 nghĩa là không có đồ vật nào.',
  ],
};
