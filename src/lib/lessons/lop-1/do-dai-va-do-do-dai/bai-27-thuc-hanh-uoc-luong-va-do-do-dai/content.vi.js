/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành ước lượng độ dài đồ vật bằng mắt, bằng gang tay, bước chân, rồi đo lại bằng thước có vạch chia xăng-ti-mét để kiểm tra.',
  intro:
    'Em đoán xem bút chì của em dài mấy xăng-ti-mét? Hôm nay em tập đoán trước độ dài, rồi lấy thước đo lại xem mình đoán có gần đúng không.',
  objectives: [
    'Ước lượng độ dài đồ vật theo xăng-ti-mét, gang tay, bước chân.',
    'Đo lại bằng thước để kiểm tra số đã ước lượng.',
    'So sánh số ước lượng với số đo thật.',
  ],
  sections: [
    {
      heading: 'Ước lượng là gì?',
      blocks: [
        {
          type: 'p',
          text: 'Ước lượng là đoán độ dài mà chưa đo. Em nhìn đồ vật rồi nói: khoảng mấy xăng-ti-mét.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Em nhớ một độ dài quen: ngón tay út của em rộng khoảng 1 cm. Em hình dung đồ vật dài bằng mấy ngón út xếp cạnh nhau.',
        },
        {
          type: 'p',
          text: 'Đoán xong, em đặt thước đo lại. Vạch 0 thẳng với một đầu, đọc số ở đầu kia.',
        },
      ],
    },
    {
      heading: 'Đoán rồi đo',
      blocks: [
        {
          type: 'table',
          head: ['Đồ vật', 'Em đoán', 'Đo được'],
          rows: [
            ['Bút chì', 'khoảng 15 cm', '14 cm'],
            ['Cục tẩy', 'khoảng 3 cm', '4 cm'],
            ['Mặt bàn', 'khoảng 6 gang tay', '5 gang tay'],
          ],
          caption: 'Bảng của bạn Mai: đoán gần đúng là giỏi rồi.',
        },
        {
          type: 'p',
          text: 'Số đoán và số đo không cần bằng nhau. Càng gần nhau thì em ước lượng càng giỏi.',
        },
      ],
    },
    {
      heading: 'Em tự làm',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: em ước lượng rồi đo độ dài của 4 đồ vật quanh em.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chuẩn bị: thước kẻ có vạch chia xăng-ti-mét, bút chì, cục tẩy, quyển vở, một tờ giấy.',
            'Kẻ một bảng 3 cột: Đồ vật, Em đoán, Đo được.',
            'Với bút chì, cục tẩy, cạnh quyển vở: em đoán số xăng-ti-mét rồi viết vào cột "Em đoán".',
            'Đặt thước đo từng đồ vật, viết số đo vào cột "Đo được".',
            'Đo mặt bàn bằng gang tay và đo lớp học bằng bước chân. Đoán trước, đếm sau.',
          ],
        },
        {
          type: 'p',
          text: 'Kể cho cả lớp: đồ vật nào em đoán gần đúng nhất? Đồ vật nào dài nhất?',
        },
      ],
    },
  ],
  explore: {
    title: 'Đoán rồi đo',
    instruction:
      'Nhìn đồ vật và ô 1 cm ở góc, bấm − hoặc + để chọn số em đoán, rồi bấm "Đo bằng thước". Kéo thước (hoặc dùng phím mũi tên) cho vạch 0 thẳng với đầu đồ vật. Đoán càng gần, em càng được nhiều sao.',
  },
  examples: [
    {
      problem:
        'An đoán quyển truyện dài khoảng 20 cm. An đo được 18 cm. An đoán dài hơn hay ngắn hơn?',
      steps: ['Em so 20 và 18.', '20 lớn hơn 18.'],
      answer: 'An đoán dài hơn số đo thật 2 cm. An đoán khá gần.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Một cục tẩy dài khoảng bao nhiêu?',
      options: ['4 cm', '40 cm', '90 cm'],
      answer: 0,
      hints: ['Cục tẩy nhỏ, nằm gọn trong lòng bàn tay em.'],
      solution: 'Cục tẩy nhỏ, dài khoảng 4 cm.',
    },
    {
      type: 'choice',
      prompt: 'Một chiếc bút chì mới dài khoảng bao nhiêu?',
      options: ['2 cm', '17 cm', '70 cm'],
      answer: 1,
      hints: ['Bút chì mới dài hơn một gang tay của em một chút.'],
      solution: 'Bút chì mới dài khoảng 17 cm.',
    },
    {
      type: 'choice',
      prompt: 'Muốn biết em đoán đúng không, em làm gì?',
      options: ['Đoán thêm lần nữa', 'Đo lại bằng thước', 'Hỏi bạn bên cạnh'],
      answer: 1,
      hints: ['Cái gì cho em số đo thật?'],
      solution: 'Em đo lại bằng thước để biết độ dài thật.',
    },
    {
      type: 'choice',
      prompt: 'Mai đoán chiếc lá dài 8 cm, đo được 9 cm. Lan đoán 5 cm. Ai đoán gần đúng hơn?',
      options: ['Bạn Mai', 'Bạn Lan'],
      answer: 0,
      hints: ['Số nào gần 9 hơn: 8 hay 5?'],
      solution: '8 chỉ kém 9 có 1, còn 5 kém 9 nhiều hơn. Bạn Mai đoán gần đúng hơn.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước đo bằng thước theo thứ tự.',
      items: [
        'Đọc số ở đầu kia của đồ vật',
        'Đặt thước sát cạnh đồ vật',
        'Để vạch 0 thẳng với một đầu đồ vật',
      ],
      answer: [1, 2, 0],
      hints: ['Đọc số là bước cuối cùng.'],
      solution: 'Đặt thước sát cạnh đồ vật, để vạch 0 thẳng với một đầu, rồi đọc số ở đầu kia.',
    },
  ],
  takeaways: [
    'Ước lượng là đoán độ dài trước khi đo.',
    'Đo lại bằng thước để kiểm tra.',
    'Số đoán càng gần số đo, em ước lượng càng giỏi.',
  ],
};
