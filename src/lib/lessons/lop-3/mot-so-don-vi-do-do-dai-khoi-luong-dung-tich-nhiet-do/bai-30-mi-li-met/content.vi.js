/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Mi-li-mét là đơn vị đo độ dài rất nhỏ, viết tắt là mm: 1 cm = 10 mm, 1 m = 1 000 mm. Em đọc thước, đổi đơn vị và tính với mi-li-mét.',
  intro:
    'Con kiến rất nhỏ, đo bằng xăng-ti-mét không đủ chính xác. Trên thước có những vạch rất nhỏ giữa các vạch số. Hôm nay em làm quen với mi-li-mét nhé!',
  objectives: [
    'Biết mi-li-mét là đơn vị đo độ dài, viết tắt là mm.',
    'Nhớ 1 cm = 10 mm và 1 m = 1 000 mm.',
    'Đọc độ dài trên thước và tính với số đo mi-li-mét.',
  ],
  sections: [
    {
      heading: 'Mi-li-mét',
      blocks: [
        {
          type: 'p',
          text: 'Em nhìn thước kẻ. Giữa hai vạch số liền nhau có 10 khoảng nhỏ bằng nhau.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mi-li-mét',
          text: 'Mi-li-mét là một đơn vị đo độ dài. Mi-li-mét viết tắt là mm. Mỗi khoảng nhỏ trên thước dài 1 mm.',
        },
        {
          type: 'p',
          text: 'Đo những vật nhỏ, như con kiến hay chiếc kẹp giấy, em dùng mi-li-mét.',
        },
      ],
    },
    {
      heading: 'Đổi xăng-ti-mét, mét ra mi-li-mét',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 cm = 10 mm. 1 m = 1 000 mm.',
        },
        {
          type: 'table',
          head: ['Xăng-ti-mét', 'Mi-li-mét'],
          rows: [
            ['1 cm', '10 mm'],
            ['2 cm', '20 mm'],
            ['6 cm', '60 mm'],
          ],
        },
        {
          type: 'p',
          text: 'Muốn đổi xăng-ti-mét ra mi-li-mét, em nhân số đó với 10.',
        },
      ],
    },
    {
      heading: 'Tính với mi-li-mét',
      blocks: [
        {
          type: 'p',
          text: 'Em tính như với các số, rồi viết thêm mm ở kết quả.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Kết quả'],
          rows: [
            ['250 mm + 100 mm', '350 mm'],
            ['64 mm − 15 mm', '49 mm'],
            ['11 mm × 3', '33 mm'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Thước phóng to',
    instruction:
      'Em kéo đầu băng màu trên thước phóng to, hoặc bấm "Thêm 1 mm", "Bớt 1 mm". Làm băng dài đúng như đề bài. Đố em: trả lời 8 câu hỏi.',
  },
  examples: [
    {
      problem: 'Đoạn thẳng AB dài 3 cm. Đoạn thẳng AB dài bao nhiêu mi-li-mét?',
      steps: ['1 cm = 10 mm.', '3 × 10 = 30, nên 3 cm = 30 mm.'],
      answer: 'Đoạn thẳng AB dài 30 mm.',
    },
    {
      problem:
        'Ốc sên đi từ nhà đến trường. Ốc sên đã đi được 152 mm và còn phải đi 264 mm nữa. Quãng đường từ nhà đến trường dài bao nhiêu mi-li-mét?',
      steps: ['Quãng đường gồm phần đã đi và phần còn lại.', '152 + 264 = 416.'],
      answer: 'Quãng đường từ nhà đến trường dài 416 mm.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: '7 cm bằng bao nhiêu mi-li-mét?',
      answer: 70,
      unit: 'mm',
      hints: ['1 cm = 10 mm. Em nhân số xăng-ti-mét với 10.'],
      solution: '7 × 10 = 70. Vậy 7 cm = 70 mm.',
    },
    {
      type: 'number',
      prompt: '40 mm bằng bao nhiêu xăng-ti-mét?',
      answer: 4,
      unit: 'cm',
      hints: ['10 mm = 1 cm.', 'Em tính 40 : 10.'],
      solution: '40 : 10 = 4. Vậy 40 mm = 4 cm.',
    },
    {
      type: 'choice',
      prompt: '1 m bằng bao nhiêu mi-li-mét?',
      options: ['10 mm', '100 mm', '1 000 mm'],
      answer: 2,
      hints: ['Một mét rất dài so với một khoảng nhỏ trên thước. Số mi-li-mét rất lớn.'],
      solution: '1 m = 1 000 mm.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi độ dài với số đo bằng nó.',
      left: ['5 cm', '9 cm', '1 cm', '1 m'],
      right: ['50 mm', '90 mm', '10 mm', '1 000 mm'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['1 cm = 10 mm, 1 m = 1 000 mm.'],
      solution: '5 cm = 50 mm. 9 cm = 90 mm. 1 cm = 10 mm. 1 m = 1 000 mm.',
    },
    {
      type: 'order',
      prompt: 'Xếp các độ dài theo thứ tự từ ngắn đến dài.',
      items: ['3 cm', '25 mm', '42 mm', '1 cm'],
      answer: [3, 1, 0, 2],
      hints: ['Em đổi hết ra mi-li-mét rồi so sánh.'],
      solution: '1 cm = 10 mm, 3 cm = 30 mm. Thứ tự: 10 mm, 25 mm, 30 mm, 42 mm.',
    },
    {
      type: 'number',
      prompt: 'Tính: 420 mm − 150 mm.',
      answer: 270,
      unit: 'mm',
      hints: ['Em trừ như với các số: 420 − 150.'],
      solution: '420 − 150 = 270. Vậy 420 mm − 150 mm = 270 mm.',
    },
    {
      type: 'number',
      prompt: 'Tính: 50 mm : 2.',
      answer: 25,
      unit: 'mm',
      hints: ['Em chia như với các số: 50 : 2.'],
      solution: '50 : 2 = 25. Vậy 50 mm : 2 = 25 mm.',
    },
    {
      type: 'choice',
      prompt: 'Con kiến dài 3 mm, con ve sầu dài 3 cm. Con nào dài hơn?',
      options: ['Con kiến', 'Con ve sầu', 'Dài bằng nhau'],
      answer: 1,
      hints: ['Em đổi 3 cm ra mi-li-mét.'],
      solution: '3 cm = 30 mm. Vì 30 mm > 3 mm nên con ve sầu dài hơn.',
    },
    {
      type: 'number',
      prompt:
        'Con cào cào nhảy xa 12 mm. Một tuần sau, nó nhảy xa gấp 3 lần. Khi đó nó nhảy xa bao nhiêu mi-li-mét?',
      answer: 36,
      unit: 'mm',
      hints: ['Gấp lên 3 lần thì em làm phép nhân.'],
      solution: '12 × 3 = 36. Con cào cào nhảy xa 36 mm.',
    },
  ],
  takeaways: [
    'Mi-li-mét viết tắt là mm.',
    '1 cm = 10 mm và 1 m = 1 000 mm.',
    'Mỗi khoảng nhỏ trên thước dài 1 mm.',
  ],
};
