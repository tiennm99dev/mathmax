/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Các đơn vị đo diện tích đề-xi-mét vuông (dm²), mét vuông (m²), mi-li-mét vuông (mm²): 1 m² = 100 dm², 1 dm² = 100 cm², 1 cm² = 100 mm².',
  intro:
    'Em đã biết xăng-ti-mét vuông. Nhưng đo nền lớp học bằng cm² thì số rất lớn, đo con tem thì cm² lại hơi to. Em cùng học thêm dm², m² và mm² nhé!',
  objectives: [
    'Biết các đơn vị đề-xi-mét vuông, mét vuông, mi-li-mét vuông.',
    'Đọc, viết được các số đo diện tích theo các đơn vị đó.',
    'Đổi được các đơn vị đo diện tích đã học.',
  ],
  sections: [
    {
      heading: 'Đề-xi-mét vuông',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Đề-xi-mét vuông là diện tích của hình vuông có cạnh dài 1 dm. Đề-xi-mét vuông viết tắt là dm².',
        },
        {
          type: 'p',
          text: 'Hình vuông cạnh 1 dm gồm 10 hàng, mỗi hàng 10 ô vuông cạnh 1 cm. Có 10 × 10 = 100 ô.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 dm² = 100 cm².',
        },
      ],
    },
    {
      heading: 'Mét vuông',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Mét vuông là diện tích của hình vuông có cạnh dài 1 m. Mét vuông viết tắt là m².',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 m² = 100 dm².',
        },
        {
          type: 'p',
          text: 'Người ta dùng mét vuông để đo diện tích nền nhà, lớp học, mảnh vườn.',
        },
      ],
    },
    {
      heading: 'Mi-li-mét vuông',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Mi-li-mét vuông là diện tích của hình vuông có cạnh dài 1 mm. Mi-li-mét vuông viết tắt là mm².',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 cm² = 100 mm².',
        },
        {
          type: 'table',
          head: ['m²', 'dm²', 'cm²', 'mm²'],
          rows: [['1 m² = 100 dm²', '1 dm² = 100 cm²', '1 cm² = 100 mm²', '1 mm²']],
          caption: 'Mỗi đơn vị đo diện tích gấp 100 lần đơn vị bé hơn liền sau nó',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Đơn vị độ dài gấp nhau 10 lần (1 dm = 10 cm), còn đơn vị diện tích gấp nhau 100 lần (1 dm² = 100 cm²).',
        },
      ],
    },
  ],
  explore: {
    title: 'Phóng to ô vuông',
    instruction:
      'Em tô từng hàng ô nhỏ. Tô đủ 100 ô thì bằng ô to. Rồi em phóng to 1 ô nhỏ để xem bên trong có gì.',
  },
  examples: [
    {
      problem: 'Tấm bìa hình vuông có cạnh 3 dm. Tính diện tích tấm bìa.',
      steps: [
        'Diện tích hình vuông bằng cạnh nhân với cạnh.',
        '3 × 3 = 9.',
        'Cạnh đo bằng dm nên diện tích đo bằng dm².',
      ],
      answer: 'Diện tích tấm bìa là 9 dm².',
    },
    {
      problem: '1 m² 25 dm² = ? dm²',
      steps: ['1 m² = 100 dm².', '100 dm² + 25 dm² = 125 dm².'],
      answer: '1 m² 25 dm² = 125 dm².',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối cách đọc với cách viết.',
      left: ['Mười hai đề-xi-mét vuông', 'Hai trăm mét vuông', 'Năm mươi mi-li-mét vuông'],
      right: ['12 dm²', '200 m²', '50 mm²', '12 m²'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Đề-xi-mét vuông viết là dm², mét vuông viết là m², mi-li-mét vuông viết là mm².'],
      solution:
        'Mười hai đề-xi-mét vuông: 12 dm². Hai trăm mét vuông: 200 m². Năm mươi mi-li-mét vuông: 50 mm².',
    },
    {
      type: 'number',
      prompt: '1 dm² = ? cm²',
      answer: 100,
      unit: 'cm²',
      hints: ['Hình vuông cạnh 1 dm có 10 hàng, mỗi hàng 10 ô 1 cm².'],
      solution: '10 × 10 = 100. Vậy 1 dm² = 100 cm².',
    },
    {
      type: 'number',
      prompt: '5 m² = ? dm²',
      answer: 500,
      unit: 'dm²',
      hints: ['1 m² = 100 dm².'],
      solution: '5 m² = 5 × 100 dm² = 500 dm².',
    },
    {
      type: 'number',
      prompt: '800 cm² = ? dm²',
      answer: 8,
      unit: 'dm²',
      hints: ['Cứ 100 cm² là 1 dm².'],
      solution: '800 : 100 = 8. Vậy 800 cm² = 8 dm².',
    },
    {
      type: 'number',
      prompt: '3 cm² = ? mm²',
      answer: 300,
      unit: 'mm²',
      hints: ['1 cm² = 100 mm².'],
      solution: '3 cm² = 3 × 100 mm² = 300 mm².',
    },
    {
      type: 'number',
      prompt: '1 m² = ? cm²',
      answer: 10000,
      unit: 'cm²',
      hints: ['1 m² = 100 dm².', 'Mỗi dm² lại bằng 100 cm².'],
      solution: '1 m² = 100 dm² = 100 × 100 cm² = 10 000 cm².',
    },
    {
      type: 'choice',
      prompt: 'Nền phòng học rộng khoảng 60 … Đơn vị nào phù hợp?',
      options: ['m²', 'dm²', 'cm²', 'mm²'],
      answer: 0,
      hints: ['Phòng học rất rộng, cả lớp ngồi được.'],
      solution: 'Nền phòng học rộng khoảng 60 m².',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi vật với diện tích phù hợp.',
      left: ['Nền phòng học', 'Mặt bàn học', 'Con tem', 'Mặt chiếc cúc áo'],
      right: ['60 m²', '60 dm²', '6 cm²', '80 mm²'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Vật càng to thì đơn vị càng lớn.',
        'Mặt bàn dài khoảng 1 m, rộng khoảng nửa mét. Con tem nhỏ bằng đầu ngón tay cái.',
      ],
      solution: 'Nền phòng học 60 m², mặt bàn học 60 dm², con tem 6 cm², mặt cúc áo 80 mm².',
    },
    {
      type: 'choice',
      prompt: '2 dm² 5 cm² ? 250 cm²',
      options: ['<', '>', '='],
      answer: 0,
      hints: ['Em đổi 2 dm² 5 cm² ra cm² trước.', '2 dm² = 200 cm².'],
      solution: '2 dm² 5 cm² = 200 cm² + 5 cm² = 205 cm². Mà 205 cm² < 250 cm².',
    },
    {
      type: 'number',
      prompt:
        'Mảnh vườn hình chữ nhật dài 5 m, rộng 4 m. Diện tích mảnh vườn là bao nhiêu mét vuông?',
      answer: 20,
      unit: 'm²',
      hints: ['Diện tích hình chữ nhật bằng chiều dài nhân chiều rộng.'],
      solution: '5 × 4 = 20. Diện tích mảnh vườn là 20 m².',
    },
  ],
  takeaways: [
    '1 m² = 100 dm²; 1 dm² = 100 cm²; 1 cm² = 100 mm².',
    'Mỗi đơn vị đo diện tích gấp 100 lần đơn vị bé hơn liền sau nó.',
  ],
};
