/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đo độ dài bằng gang tay, bước chân, que tính; làm quen đơn vị xăng-ti-mét (cm) và cách đo bằng thước có vạch chia xăng-ti-mét.',
  intro:
    'Mặt bàn của em dài bao nhiêu? Em có thể đo bằng gang tay. Nhưng gang tay mỗi người một khác. Hôm nay em học đơn vị xăng-ti-mét và cách dùng thước kẻ.',
  objectives: [
    'Đo độ dài bằng gang tay, bước chân, que tính.',
    'Biết xăng-ti-mét là đơn vị đo độ dài, viết tắt là cm.',
    'Dùng thước có vạch chia xăng-ti-mét để đo độ dài.',
  ],
  sections: [
    {
      heading: 'Đo bằng gang tay, bước chân',
      blocks: [
        {
          type: 'p',
          text: 'Em xòe bàn tay, đặt ngón cái ở mép bàn. Khoảng từ ngón cái đến ngón giữa là một gang tay.',
        },
        {
          type: 'p',
          text: 'Em đặt từng gang tay nối tiếp nhau, rồi đếm. Ví dụ: mặt bàn dài 4 gang tay.',
        },
        {
          type: 'p',
          text: 'Đo chiều dài lớp học, em đi từng bước chân nối tiếp nhau rồi đếm số bước.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em thấy không?',
          text: 'Gang tay của em ngắn hơn gang tay của bố. Cùng một mặt bàn, em đo được 4 gang tay, bố đo được 3 gang tay.',
        },
      ],
    },
    {
      heading: 'Xăng-ti-mét',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Xăng-ti-mét',
          text: 'Xăng-ti-mét là một đơn vị đo độ dài. Xăng-ti-mét viết tắt là cm.',
        },
        {
          type: 'p',
          text: 'Trên thước kẻ, khoảng cách từ vạch 0 đến vạch 1 dài 1 cm. Từ vạch 1 đến vạch 2 cũng dài 1 cm.',
        },
        {
          type: 'table',
          head: ['Viết', 'Đọc'],
          rows: [
            ['1 cm', 'một xăng-ti-mét'],
            ['5 cm', 'năm xăng-ti-mét'],
            ['10 cm', 'mười xăng-ti-mét'],
          ],
        },
      ],
    },
    {
      heading: 'Đo bằng thước kẻ',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt thước sát cạnh đồ vật.',
            'Đặt vạch 0 của thước thẳng với một đầu của đồ vật.',
            'Nhìn đầu kia của đồ vật: nó thẳng với vạch số nào thì đồ vật dài bấy nhiêu xăng-ti-mét.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Cẩn thận',
          text: 'Đừng đặt mép thước thẳng với đầu đồ vật. Phải đặt vạch 0 thẳng với đầu đồ vật.',
        },
      ],
    },
  ],
  explore: {
    title: 'Gang tay và thước kẻ',
    instruction:
      'Chọn "Đo bằng gang tay" rồi bấm "Đặt 1 gang tay" cho đến hết mặt bàn, thử cả gang tay của em và của bố. Chọn "Đo bằng thước" rồi kéo thước (hoặc dùng phím mũi tên) cho vạch 0 thẳng với đầu đồ vật, sau đó chạm vào thẻ số đo đúng.',
  },
  examples: [
    {
      problem:
        'Đặt thước dưới bút chì, vạch 0 thẳng với đầu bút. Đầu kia của bút thẳng với vạch 8. Bút chì dài bao nhiêu?',
      steps: [
        'Vạch 0 đã thẳng với một đầu bút chì.',
        'Đầu kia thẳng với vạch 8.',
        'Vậy bút chì dài 8 xăng-ti-mét.',
      ],
      answer: 'Bút chì dài 8 cm.',
    },
    {
      problem:
        'Mai đo cái bàn được 5 gang tay. Mẹ đo cũng cái bàn đó được 4 gang tay. Vì sao hai số khác nhau?',
      steps: [
        'Cái bàn vẫn là một cái bàn.',
        'Gang tay của mẹ dài hơn gang tay của Mai.',
        'Gang tay dài hơn thì đo được ít gang hơn.',
      ],
      answer:
        'Vì gang tay của mỗi người dài khác nhau. Vì thế ta dùng đơn vị chung là xăng-ti-mét.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Xăng-ti-mét viết tắt là gì?',
      options: ['cm', 'xm', 'kg'],
      answer: 0,
      hints: ['Chữ viết tắt có chữ c và chữ m.'],
      solution: 'Xăng-ti-mét viết tắt là cm.',
    },
    {
      type: 'choice',
      prompt: 'Đo bằng thước kẻ, em đặt vạch nào thẳng với một đầu đồ vật?',
      options: ['Vạch 1', 'Vạch 0', 'Mép thước'],
      answer: 1,
      hints: ['Đếm số đo bắt đầu từ số nào?'],
      solution: 'Em đặt vạch 0 của thước thẳng với một đầu đồ vật.',
    },
    {
      type: 'number',
      prompt:
        'Vạch 0 thẳng với một đầu cục tẩy. Đầu kia thẳng với vạch 4. Cục tẩy dài mấy xăng-ti-mét?',
      answer: 4,
      unit: 'cm',
      hints: ['Vạch 0 đã đặt đúng.', 'Đọc số ở đầu kia của cục tẩy.'],
      solution: 'Đầu kia ở vạch 4, nên cục tẩy dài 4 cm.',
    },
    {
      type: 'number',
      prompt:
        'Vạch 0 thẳng với một đầu chiếc bút. Đầu kia thẳng với vạch 12. Chiếc bút dài mấy xăng-ti-mét?',
      answer: 12,
      unit: 'cm',
      hints: ['Số ở đầu kia là độ dài.'],
      solution: 'Đầu kia ở vạch 12, nên chiếc bút dài 12 cm.',
    },
    {
      type: 'match',
      prompt: 'Nối cách viết với cách đọc.',
      left: ['3 cm', '7 cm', '10 cm'],
      right: ['mười xăng-ti-mét', 'ba xăng-ti-mét', 'bảy xăng-ti-mét'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['cm đọc là xăng-ti-mét.'],
      solution: '3 cm: ba xăng-ti-mét; 7 cm: bảy xăng-ti-mét; 10 cm: mười xăng-ti-mét.',
    },
    {
      type: 'choice',
      prompt: 'Để đo chiều dài lớp học, cách nào dễ hơn?',
      options: ['Đo bằng bước chân', 'Đo bằng ngón tay', 'Đo bằng cục tẩy'],
      answer: 0,
      hints: ['Lớp học rất dài. Em chọn cách đo bằng thứ dài hơn.'],
      solution: 'Lớp học dài, em đo bằng bước chân sẽ nhanh và dễ hơn.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn An đo bàn được 6 gang tay. Bố đo cũng cái bàn đó được 4 gang tay. Gang tay của ai dài hơn?',
      options: ['Bạn An', 'Bố'],
      answer: 1,
      hints: ['Gang tay dài hơn thì đo được ít gang hơn.'],
      solution: 'Bố đo được ít gang tay hơn, nên gang tay của bố dài hơn.',
    },
  ],
  takeaways: [
    'Có thể đo độ dài bằng gang tay, bước chân, que tính.',
    'Gang tay mỗi người khác nhau, nên cần đơn vị chung.',
    'Xăng-ti-mét là đơn vị đo độ dài, viết tắt là cm.',
    'Đo bằng thước: vạch 0 thẳng với một đầu, đọc số ở đầu kia.',
  ],
};
