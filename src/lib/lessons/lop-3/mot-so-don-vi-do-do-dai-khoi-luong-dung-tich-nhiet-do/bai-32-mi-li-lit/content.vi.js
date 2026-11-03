/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Mi-li-lít là đơn vị đo dung tích, viết tắt là ml: 1 l = 1 000 ml. Em đọc vạch ống đong và tính với số đo mi-li-lít.',
  intro:
    'Cái cốc, cái thìa đựng rất ít nước, đo bằng lít không tiện. Khi đó người ta dùng mi-li-lít. Em rót nước vào ống đong và đọc vạch nhé!',
  objectives: [
    'Biết mi-li-lít là đơn vị đo dung tích, viết tắt là ml.',
    'Nhớ 1 l = 1 000 ml.',
    'Đọc vạch chia và tính với số đo mi-li-lít.',
  ],
  sections: [
    {
      heading: 'Mi-li-lít',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mi-li-lít',
          text: 'Mi-li-lít là một đơn vị đo dung tích. Mi-li-lít viết tắt là ml.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 l = 1 000 ml.',
        },
        {
          type: 'p',
          text: 'Em đong lượng nước ít bằng mi-li-lít, như cái cốc, cái thìa. Em đong lượng nước nhiều bằng lít, như cái xô.',
        },
      ],
    },
    {
      heading: 'Đọc vạch chia',
      blocks: [
        {
          type: 'p',
          text: 'Trên ống đong và ca đong có các vạch chia. Em tìm xem mỗi vạch ứng với bao nhiêu mi-li-lít.',
        },
        {
          type: 'p',
          text: 'Rót nước vào rồi đặt ống thẳng đứng. Mặt nước ở vạch nào, em đọc số đó.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ví dụ',
          text: 'Nếu 5 vạch ứng với 500 ml thì mỗi vạch là 100 ml.',
        },
      ],
    },
    {
      heading: 'Tính với mi-li-lít',
      blocks: [
        {
          type: 'p',
          text: 'Em tính như với các số, rồi viết thêm ml ở kết quả.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Kết quả'],
          rows: [
            ['120 ml − 20 ml', '100 ml'],
            ['200 ml + 300 ml', '500 ml'],
            ['12 ml × 3', '36 ml'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Ống đong',
    instruction:
      'Em rót nước từ chai 1 l vào ống đong đến đúng vạch đề bài yêu cầu. Rót hết chai để thấy 1 l = 1 000 ml. Đố em: trả lời 8 câu hỏi.',
  },
  examples: [
    {
      problem:
        'Rót hết nước trong bình sang 3 ca. Ca A có 500 ml, ca B có 200 ml, ca C có 300 ml. Lúc đầu bình có bao nhiêu mi-li-lít nước?',
      steps: ['Em cộng số nước ở cả 3 ca.', '500 + 200 + 300 = 1 000.'],
      answer: 'Lúc đầu bình có 1 000 ml nước, đúng bằng 1 l.',
    },
    {
      problem:
        'Chai dầu ăn có 750 ml. Mẹ dùng một ít, trong chai còn 350 ml. Mẹ đã dùng bao nhiêu mi-li-lít dầu?',
      steps: ['Lấy số dầu lúc đầu trừ số dầu còn lại.', '750 − 350 = 400.'],
      answer: 'Mẹ đã dùng 400 ml dầu.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: '1 l bằng bao nhiêu mi-li-lít?',
      answer: 1000,
      unit: 'ml',
      hints: ['Mỗi mi-li-lít rất ít, nên 1 l gồm rất nhiều mi-li-lít. Số này có bốn chữ số.'],
      solution: '1 l = 1 000 ml.',
    },
    {
      type: 'number',
      prompt: '3 l bằng bao nhiêu mi-li-lít?',
      answer: 3000,
      unit: 'ml',
      hints: ['Mỗi lít bằng 1 000 ml. Em nhân với 3.'],
      solution: '1 000 × 3 = 3 000. Vậy 3 l = 3 000 ml.',
    },
    {
      type: 'number',
      prompt: 'Tính: 350 ml + 240 ml.',
      answer: 590,
      unit: 'ml',
      hints: ['Em cộng như với các số: 350 + 240.'],
      solution: '350 + 240 = 590. Vậy 350 ml + 240 ml = 590 ml.',
    },
    {
      type: 'number',
      prompt: 'Tính: 90 ml : 3.',
      answer: 30,
      unit: 'ml',
      hints: ['Em chia như với các số: 90 : 3.'],
      solution: '90 : 3 = 30. Vậy 90 ml : 3 = 30 ml.',
    },
    {
      type: 'choice',
      prompt:
        'Ống đong có 5 vạch bằng nhau, vạch thứ 5 ứng với 500 ml. Nước lên đến vạch thứ 3. Trong ống có bao nhiêu nước?',
      options: ['30 ml', '300 ml', '350 ml', '500 ml'],
      answer: 1,
      hints: ['Mỗi vạch ứng với bao nhiêu? Em tính 500 : 5.'],
      solution: '500 : 5 = 100, mỗi vạch là 100 ml. 3 vạch là 300 ml.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đồ vật với lượng nước nó chứa được.',
      left: ['Thìa cà phê', 'Cốc nước', 'Chai nước to', 'Cái xô'],
      right: ['5 ml', '200 ml', '1 l', '10 l'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Đồ vật càng to thì chứa được càng nhiều nước.', 'Em nhớ 1 l = 1 000 ml.'],
      solution: 'Thìa cà phê 5 ml, cốc nước 200 ml, chai nước to 1 l, cái xô 10 l.',
    },
    {
      type: 'order',
      prompt: 'Xếp các lượng nước theo thứ tự từ ít đến nhiều.',
      items: ['2 l', '500 ml', '1 l', '900 ml'],
      answer: [1, 3, 2, 0],
      hints: ['Em đổi hết ra mi-li-lít rồi so sánh.'],
      solution: '500 ml < 900 ml < 1 000 ml < 2 000 ml. Thứ tự: 500 ml, 900 ml, 1 l, 2 l.',
    },
    {
      type: 'number',
      prompt:
        'Phích có 1 l nước. Rót sang 3 cốc: 200 ml, 200 ml và 100 ml. Phích còn lại bao nhiêu mi-li-lít nước?',
      answer: 500,
      unit: 'ml',
      hints: ['Em cộng số nước đã rót.', 'Đổi 1 l ra mi-li-lít, rồi trừ đi số nước đã rót.'],
      solution: '200 + 200 + 100 = 500. 1 l = 1 000 ml. 1 000 − 500 = 500. Phích còn 500 ml nước.',
    },
  ],
  takeaways: [
    'Mi-li-lít viết tắt là ml.',
    '1 l = 1 000 ml.',
    'Đọc ống đong: mặt nước ở vạch nào, em đọc số đó.',
  ],
};
