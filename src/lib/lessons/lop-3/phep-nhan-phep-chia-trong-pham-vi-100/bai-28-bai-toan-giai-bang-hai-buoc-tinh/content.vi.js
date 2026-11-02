/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài toán giải bằng hai bước tính: phân tích đề bài, tìm số còn thiếu ở bước 1, rồi trả lời câu hỏi của bài toán ở bước 2.',
  intro:
    'Can thứ nhất đựng 5 l nước mắm. Can thứ hai đựng gấp 3 lần can thứ nhất. Cả hai can đựng bao nhiêu lít? Một phép tính chưa đủ đâu. Em giải hai bước nhé!',
  objectives: [
    'Đọc đề bài, biết đề bài cho gì và hỏi gì.',
    'Tìm số còn thiếu ở bước 1.',
    'Trả lời câu hỏi của bài toán ở bước 2.',
  ],
  sections: [
    {
      heading: 'Bài toán có hai bước tính',
      blocks: [
        { type: 'p', text: 'Có bài toán không làm được ngay bằng một phép tính.' },
        {
          type: 'p',
          text: 'Đề bài hỏi cả hai can. Em mới biết can thứ nhất, chưa biết can thứ hai.',
        },
        { type: 'p', text: 'Bước 1: Em tìm số lít ở can thứ hai.' },
        { type: 'p', text: 'Bước 2: Em cộng số lít ở hai can.' },
      ],
    },
    {
      heading: 'Cách giải',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Em đọc đề bài và tóm tắt. Em tìm số còn thiếu trước. Rồi em trả lời câu hỏi của bài toán.',
        },
        {
          type: 'table',
          head: ['Đề bài nói', 'Bước 1 làm phép'],
          rows: [
            ['gấp mấy lần', 'nhân'],
            ['giảm đi mấy lần', 'chia'],
            ['nhiều hơn, nặng hơn', 'cộng'],
            ['ít hơn', 'trừ'],
          ],
        },
        { type: 'p', text: 'Đề bài hỏi "cả hai" thì bước 2 em làm phép cộng.' },
      ],
    },
  ],
  explore: {
    title: 'Mở từng bước giải',
    instruction:
      'Em đọc đề bài, nhìn sơ đồ băng giấy, rồi chạm vào đáp án đúng. Mỗi lần đúng, một bước giải được mở ra. Đố em: trả lời 8 câu hỏi.',
  },
  examples: [
    {
      problem:
        'Can thứ nhất đựng 5 l nước mắm. Can thứ hai đựng số lít nước mắm gấp 3 lần can thứ nhất. Hỏi cả hai can đựng bao nhiêu lít nước mắm?',
      steps: [
        'Can thứ hai đựng số lít nước mắm là: 5 × 3 = 15 (l).',
        'Cả hai can đựng số lít nước mắm là: 5 + 15 = 20 (l).',
      ],
      answer: 'Đáp số: 20 l nước mắm.',
    },
    {
      problem:
        'Mai gấp được 10 cái thuyền. Nam gấp được ít hơn Mai 3 cái thuyền. Hỏi cả hai bạn gấp được bao nhiêu cái thuyền?',
      steps: [
        'Nam gấp được số cái thuyền là: 10 − 3 = 7 (cái).',
        'Cả hai bạn gấp được số cái thuyền là: 10 + 7 = 17 (cái).',
      ],
      answer: 'Đáp số: 17 cái thuyền.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Buổi sáng cửa hàng bán được 10 máy tính. Buổi chiều bán được ít hơn buổi sáng 4 máy tính. Hỏi cả hai buổi bán được bao nhiêu máy tính? Em cần tìm gì trước?',
      options: ['Số máy tính bán buổi chiều', 'Số máy tính bán buổi sáng', 'Số cửa hàng'],
      answer: 0,
      hints: ['Đề bài đã cho biết buổi nào rồi?'],
      solution: 'Đề bài đã cho buổi sáng. Em tìm số máy tính bán buổi chiều trước.',
    },
    {
      type: 'number',
      prompt:
        'Buổi sáng cửa hàng bán được 10 máy tính. Buổi chiều bán được ít hơn buổi sáng 4 máy tính. Hỏi cả hai buổi bán được bao nhiêu máy tính?',
      answer: 16,
      hints: [
        'Bước 1: buổi chiều bán ít hơn, em làm phép trừ.',
        'Bước 2: em cộng số máy tính của hai buổi.',
      ],
      solution: 'Buổi chiều: 10 − 4 = 6 (máy tính). Cả hai buổi: 10 + 6 = 16 (máy tính).',
    },
    {
      type: 'number',
      prompt:
        'Đường gấp khúc ABC có đoạn thẳng AB dài 9 cm. Đoạn thẳng BC dài gấp 2 lần đoạn thẳng AB. Đường gấp khúc ABC dài bao nhiêu xăng-ti-mét?',
      answer: 27,
      hints: [
        'Bước 1: tìm độ dài đoạn thẳng BC.',
        'Bước 2: độ dài đường gấp khúc là tổng độ dài hai đoạn thẳng.',
      ],
      solution: 'Đoạn thẳng BC dài: 9 × 2 = 18 (cm). Đường gấp khúc ABC dài: 9 + 18 = 27 (cm).',
    },
    {
      type: 'number',
      prompt:
        'Bao ngô nặng 30 kg. Bao gạo nặng hơn bao ngô 10 kg. Cả hai bao nặng bao nhiêu ki-lô-gam?',
      answer: 70,
      hints: ['Bước 1: tìm cân nặng của bao gạo.', 'Bước 2: cộng cân nặng của hai bao.'],
      solution: 'Bao gạo nặng: 30 + 10 = 40 (kg). Cả hai bao nặng: 30 + 40 = 70 (kg).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi cách nói với phép tính đúng.',
      left: [
        '8 gấp lên 2 lần',
        '8 giảm đi 2 lần',
        'Số lớn hơn 8 là 2 đơn vị',
        'Số bé hơn 8 là 2 đơn vị',
      ],
      right: ['8 : 2', '8 − 2', '8 × 2', '8 + 2'],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 3],
        [3, 1],
      ],
      hints: ['Gấp là nhân, giảm đi mấy lần là chia.', 'Lớn hơn là cộng, bé hơn là trừ.'],
      solution: '8 × 2 = 16. 8 : 2 = 4. 8 + 2 = 10. 8 − 2 = 6.',
    },
    {
      type: 'choice',
      prompt:
        'Can thứ nhất đựng 6 l. Can thứ hai đựng 18 l. Cả hai can đựng mấy lít? Em làm phép tính nào?',
      options: ['18 − 6', '6 + 18', '6 × 18'],
      answer: 1,
      hints: ['Đề bài hỏi cả hai, em gộp hai số lại.'],
      solution: '6 + 18 = 24 (l).',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các việc theo thứ tự em giải bài toán.',
      items: [
        'Viết đáp số',
        'Tìm số còn thiếu',
        'Đọc đề bài và tóm tắt',
        'Trả lời câu hỏi của bài toán',
      ],
      answer: [2, 1, 3, 0],
      hints: ['Việc đầu tiên là đọc đề bài.'],
      solution:
        'Đọc đề bài và tóm tắt, tìm số còn thiếu, trả lời câu hỏi của bài toán, viết đáp số.',
    },
    {
      type: 'number',
      prompt:
        'Bể thứ nhất có 8 con cá. Bể thứ hai có số cá gấp 4 lần bể thứ nhất. Cả hai bể có bao nhiêu con cá?',
      answer: 40,
      hints: ['Bước 1: bể thứ hai có 8 × 4 con cá.', 'Bước 2: cộng số cá ở hai bể.'],
      solution: 'Bể thứ hai: 8 × 4 = 32 (con). Cả hai bể: 8 + 32 = 40 (con).',
    },
    {
      type: 'number',
      prompt:
        'Buổi sáng cửa hàng bán được 30 kg gạo. Buổi chiều bán được số gạo giảm đi 2 lần so với buổi sáng. Cả hai buổi bán được bao nhiêu ki-lô-gam gạo?',
      answer: 45,
      hints: ['Bước 1: giảm đi 2 lần thì em làm phép chia.', 'Bước 2: cộng số gạo của hai buổi.'],
      solution: 'Buổi chiều: 30 : 2 = 15 (kg). Cả hai buổi: 30 + 15 = 45 (kg).',
    },
  ],
  takeaways: [
    'Có bài toán phải giải bằng hai bước tính.',
    'Bước 1 tìm số còn thiếu. Bước 2 trả lời câu hỏi của bài toán.',
  ],
};
