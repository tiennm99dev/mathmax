/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành làm thước dây chia theo mét và đề-xi-mét, ước lượng chiều dài đồ vật quen thuộc rồi đo để kiểm tra.',
  intro:
    'Cái bàn học dài khoảng mấy đề-xi-mét? Cái cửa cao khoảng mấy mét? Hôm nay em tự làm thước dây, đoán trước rồi đo để kiểm tra nhé!',
  objectives: [
    'Làm được một thước dây dài 1 m, chia thành 10 dm.',
    'Ước lượng chiều dài đồ vật theo đề-xi-mét, theo mét.',
    'Đo bằng thước để kiểm tra rồi so với số đã đoán.',
  ],
  sections: [
    {
      heading: 'Thước dây',
      blocks: [
        {
          type: 'p',
          text: 'Thợ may, thợ mộc thường dùng thước dây. Thước dây cuộn lại gọn, kéo ra đo được đồ vật dài.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách đo',
          text: 'Đặt vạch 0 thẳng với một đầu đồ vật. Kéo thước thẳng dọc theo đồ vật. Đầu kia của đồ vật ở vạch nào thì đọc số đó.',
        },
      ],
    },
    {
      heading: 'Ước lượng',
      blocks: [
        {
          type: 'p',
          text: 'Ước lượng là đoán trước khi đo. Em so đồ vật với những độ dài em đã biết.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Một gang tay của em dài khoảng 1 dm. Một bước chân dài của em dài khoảng 5 dm. Một sải tay (hai tay em dang rộng) dài khoảng 1 m.',
        },
        {
          type: 'table',
          head: ['Đồ vật', 'Em đoán', 'Đo được'],
          rows: [
            ['Hộp bút', 'khoảng 3 dm', '2 dm'],
            ['Bàn học', 'khoảng 10 dm', '10 dm'],
            ['Cửa lớp', 'khoảng 3 m', '2 m'],
          ],
          caption: 'Bảng của bạn Nam: đoán gần đúng là giỏi rồi.',
        },
      ],
    },
    {
      heading: 'Em tự làm',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: em làm một thước dây dài 1 m, rồi đoán và đo các đồ vật trong lớp, trong nhà.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chuẩn bị (cùng bố mẹ hoặc cô giáo): một sợi dây hoặc băng giấy dài hơn 1 m, thước kẻ, bút màu, kéo.',
            'Dùng thước kẻ đo trên dây từng đoạn 10 cm, đánh dấu bằng bút màu. Mỗi đoạn dài 1 dm.',
            'Đếm đủ 10 đoạn thì cắt. Thước dây của em dài 10 dm, tức là 1 m.',
            'Kẻ một bảng 3 cột: Đồ vật, Em đoán, Đo được.',
            'Chọn đồ vật: quyển vở, cái cặp, mặt bàn, cửa ra vào. Đoán độ dài rồi viết vào cột "Em đoán".',
            'Đo bằng thước dây của em. Viết số đo được vào bảng.',
          ],
        },
        {
          type: 'p',
          text: 'Kể cho cả lớp: đồ vật nào dài nhất? Em đoán gần đúng nhất ở đồ vật nào?',
        },
      ],
    },
  ],
  explore: {
    title: 'Đoán rồi đo bằng thước dây',
    instruction:
      'Bấm − hoặc + để chọn số em đoán, rồi bấm "Đo thử". Kéo nút tròn ở đầu thước dây, hoặc dùng phím mũi tên, đến đúng đầu kia của thanh màu. Đoán càng gần, em càng được nhiều sao.',
  },
  examples: [
    {
      problem: 'Thước dây của Mai dài 1 m, chia thành các đoạn 1 dm. Thước có mấy đoạn như vậy?',
      steps: ['1 m = 10 dm.', 'Mỗi đoạn dài 1 dm, nên có 10 đoạn.'],
      answer: 'Thước có 10 đoạn.',
    },
    {
      problem: 'Nam đoán cái cặp dài 5 dm. Đo được 4 dm. Nam đoán thế nào?',
      steps: ['So sánh: 5 dm nhiều hơn 4 dm.', '5 − 4 = 1, nên Nam đoán nhiều hơn 1 dm.'],
      answer: 'Nam đoán nhiều hơn số đo được 1 dm, khá gần đúng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Thước dây dài 1 m được chia thành các đoạn 1 dm. Có mấy đoạn?',
      options: ['1 đoạn', '10 đoạn', '100 đoạn'],
      answer: 1,
      hints: ['Nhớ lại: 1 m bằng bao nhiêu đề-xi-mét?'],
      solution: '1 m = 10 dm, nên có 10 đoạn 1 dm.',
    },
    {
      type: 'choice',
      prompt: 'Khi đo, em đặt vạch nào của thước thẳng với đầu đồ vật?',
      options: ['Vạch 0', 'Vạch 1', 'Vạch nào cũng được'],
      answer: 0,
      hints: ['Thước đo bắt đầu đếm từ đâu?'],
      solution: 'Em đặt vạch 0 thẳng với đầu đồ vật, rồi đọc số ở đầu kia.',
    },
    {
      type: 'choice',
      prompt: 'Một gang tay của em dài khoảng bao nhiêu?',
      options: ['1 cm', '1 dm', '1 m'],
      answer: 1,
      hints: ['Em đặt bàn tay lên thước kẻ: gang tay dài khoảng 10 cm.'],
      solution: 'Một gang tay dài khoảng 10 cm, tức là khoảng 1 dm.',
    },
    {
      type: 'choice',
      prompt: 'Đồ vật nào dài khoảng 1 m?',
      options: ['Cục tẩy', 'Cái bút chì', 'Cái bàn học'],
      answer: 2,
      hints: ['1 m bằng 10 gang tay. Đồ vật nào dài bằng 10 gang tay?'],
      solution: 'Cục tẩy và bút chì rất ngắn. Cái bàn học dài khoảng 1 m.',
    },
    {
      type: 'choice',
      prompt: 'Nam đoán cái bảng dài 2 m. Đo được 3 m. Nam đoán thế nào?',
      options: ['Nhiều hơn 1 m', 'Ít hơn 1 m', 'Đúng'],
      answer: 1,
      hints: ['So sánh 2 m với 3 m. Số đoán nhỏ hơn hay lớn hơn số đo được?'],
      solution: '2 m ít hơn 3 m là 1 m. Nam đoán ít hơn 1 m.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước đo chiều dài cái bàn.',
      items: [
        'Đọc số ở đầu kia của cái bàn.',
        'Đoán xem cái bàn dài bao nhiêu.',
        'Đặt vạch 0 thẳng với một đầu cái bàn.',
        'Kéo thước thẳng dọc theo cái bàn.',
      ],
      answer: [1, 2, 3, 0],
      hints: ['Đoán trước, đo sau. Đọc số là việc cuối cùng.'],
      solution: 'Đoán trước, đặt vạch 0 thẳng đầu bàn, kéo thước thẳng, rồi đọc số.',
    },
  ],
  takeaways: [
    'Thước dây dài 1 m được chia thành 10 đoạn 1 dm.',
    'Đo: đặt vạch 0 thẳng đầu đồ vật, đọc số ở đầu kia.',
    'Ước lượng là đoán trước khi đo. Đo để kiểm tra số đã đoán.',
  ],
};
