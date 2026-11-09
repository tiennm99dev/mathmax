/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Diện tích hình chữ nhật bằng chiều dài nhân với chiều rộng (cùng đơn vị đo); diện tích hình vuông bằng độ dài một cạnh nhân với chính nó.',
  intro:
    'Hình chữ nhật dài 4 cm, rộng 3 cm được lát bằng các ô vuông 1 cm². Không cần đếm từng ô, em vẫn biết có bao nhiêu ô. Em cùng tìm cách tính nhanh nhé!',
  objectives: [
    'Biết quy tắc tính diện tích hình chữ nhật, hình vuông.',
    'Tính được diện tích hình chữ nhật, hình vuông theo xăng-ti-mét vuông.',
    'Phân biệt chu vi và diện tích.',
  ],
  sections: [
    {
      heading: 'Diện tích hình chữ nhật',
      blocks: [
        {
          type: 'p',
          text: 'Hình chữ nhật ABCD dài 4 cm, rộng 3 cm. Hình được chia thành 3 hàng, mỗi hàng có 4 ô vuông 1 cm².',
        },
        {
          type: 'p',
          text: 'Số ô vuông là: 4 × 3 = 12 (ô). Diện tích hình chữ nhật ABCD là: 4 × 3 = 12 (cm²).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tính diện tích hình chữ nhật, ta lấy chiều dài nhân với chiều rộng (cùng đơn vị đo).',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Chiều dài 1 dm, chiều rộng 6 cm: em đổi 1 dm = 10 cm rồi mới nhân: 10 × 6 = 60 (cm²).',
        },
      ],
    },
    {
      heading: 'Diện tích hình vuông',
      blocks: [
        {
          type: 'p',
          text: 'Hình vuông MNPQ có cạnh 3 cm. Hình có 3 hàng, mỗi hàng 3 ô vuông 1 cm².',
        },
        {
          type: 'p',
          text: 'Diện tích hình vuông MNPQ là: 3 × 3 = 9 (cm²).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tính diện tích hình vuông, ta lấy độ dài một cạnh nhân với chính nó.',
        },
      ],
    },
    {
      heading: 'Chu vi và diện tích',
      blocks: [
        {
          type: 'p',
          text: 'Chu vi là độ dài đường bao quanh hình, đo bằng đơn vị đo độ dài như cm, dm. Diện tích là phần mặt phẳng bên trong hình, đo bằng đơn vị đo diện tích như cm².',
        },
        {
          type: 'table',
          head: ['Hình', 'Chu vi', 'Diện tích'],
          rows: [
            ['Chữ nhật dài 5 cm, rộng 3 cm', '(5 + 3) × 2 = 16 (cm)', '5 × 3 = 15 (cm²)'],
            ['Vuông cạnh 4 cm', '4 × 4 = 16 (cm)', '4 × 4 = 16 (cm²)'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo hình chữ nhật trên lưới',
    instruction:
      'Em kéo góc hình chữ nhật (hoặc dùng phím mũi tên) và xem diện tích thay đổi ngay. Chọn "Đố em" để tìm các hình chữ nhật có diện tích cho trước.',
  },
  examples: [
    {
      problem: 'Tính diện tích hình chữ nhật có chiều dài 8 cm, chiều rộng 5 cm.',
      steps: ['Lấy chiều dài nhân với chiều rộng.', '8 × 5 = 40 (cm²).'],
      answer: 'Diện tích hình chữ nhật là 40 cm².',
    },
    {
      problem: 'Tính diện tích hình vuông có cạnh 6 cm.',
      steps: ['Lấy độ dài một cạnh nhân với chính nó.', '6 × 6 = 36 (cm²).'],
      answer: 'Diện tích hình vuông là 36 cm².',
    },
    {
      problem:
        'Một hình chữ nhật có chiều dài 2 dm, chiều rộng 9 cm. Tính diện tích hình chữ nhật.',
      steps: [
        'Hai cạnh chưa cùng đơn vị đo. Đổi 2 dm = 20 cm.',
        'Diện tích là: 20 × 9 = 180 (cm²).',
      ],
      answer: 'Diện tích hình chữ nhật là 180 cm².',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Hình chữ nhật có chiều dài 7 cm, chiều rộng 4 cm. Diện tích là bao nhiêu xăng-ti-mét vuông?',
      answer: 28,
      unit: 'cm²',
      hints: ['Lấy chiều dài nhân với chiều rộng.'],
      solution: 'Diện tích hình chữ nhật là: 7 × 4 = 28 (cm²).',
    },
    {
      type: 'number',
      prompt: 'Hình vuông có cạnh 5 cm. Diện tích là bao nhiêu xăng-ti-mét vuông?',
      answer: 25,
      unit: 'cm²',
      hints: ['Lấy độ dài một cạnh nhân với chính nó.'],
      solution: 'Diện tích hình vuông là: 5 × 5 = 25 (cm²).',
    },
    {
      type: 'choice',
      prompt: 'Hình vuông có cạnh 8 cm. Diện tích hình vuông là bao nhiêu?',
      options: ['64 cm²', '32 cm²', '16 cm²', '64 cm'],
      answer: 0,
      hints: ['Diện tích hình vuông: cạnh nhân với cạnh.', 'Diện tích đo bằng cm², không phải cm.'],
      solution:
        'Diện tích hình vuông là: 8 × 8 = 64 (cm²). Còn 8 × 4 = 32 (cm) là chu vi, không phải diện tích.',
    },
    {
      type: 'choice',
      prompt: 'Hình chữ nhật có chiều dài 9 cm, chiều rộng 6 cm. Diện tích là bao nhiêu?',
      options: ['54 cm²', '30 cm²', '15 cm²', '54 cm'],
      answer: 0,
      hints: ['Lấy chiều dài nhân với chiều rộng.'],
      solution:
        'Diện tích hình chữ nhật là: 9 × 6 = 54 (cm²). Còn (9 + 6) × 2 = 30 (cm) là chu vi.',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi hình với diện tích của nó.',
      left: [
        'Hình chữ nhật dài 6 cm, rộng 5 cm',
        'Hình vuông cạnh 7 cm',
        'Hình chữ nhật dài 8 cm, rộng 3 cm',
        'Hình vuông cạnh 4 cm',
      ],
      right: ['30 cm²', '49 cm²', '24 cm²', '16 cm²'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Hình chữ nhật: dài × rộng. Hình vuông: cạnh × cạnh.'],
      solution: '6 × 5 = 30 (cm²). 7 × 7 = 49 (cm²). 8 × 3 = 24 (cm²). 4 × 4 = 16 (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Hình chữ nhật có chiều dài 1 dm, chiều rộng 6 cm. Diện tích là bao nhiêu xăng-ti-mét vuông?',
      answer: 60,
      unit: 'cm²',
      hints: ['Đổi 1 dm ra xăng-ti-mét trước.', '1 dm = 10 cm.'],
      solution: 'Đổi 1 dm = 10 cm. Diện tích hình chữ nhật là: 10 × 6 = 60 (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Một tấm bìa hình chữ nhật dài 12 cm, rộng 7 cm. Diện tích tấm bìa là bao nhiêu xăng-ti-mét vuông?',
      answer: 84,
      unit: 'cm²',
      hints: ['Tính 12 × 7.'],
      solution: 'Diện tích tấm bìa là: 12 × 7 = 84 (cm²).',
    },
    {
      type: 'choice',
      prompt:
        'Hình chữ nhật dài 6 cm, rộng 4 cm. Hình vuông cạnh 5 cm. Hình nào có diện tích lớn hơn?',
      options: ['Hình vuông', 'Hình chữ nhật', 'Hai hình bằng nhau'],
      answer: 0,
      hints: ['Em tính diện tích từng hình rồi so sánh.'],
      solution:
        'Hình chữ nhật: 6 × 4 = 24 (cm²). Hình vuông: 5 × 5 = 25 (cm²). 25 > 24 nên hình vuông có diện tích lớn hơn.',
    },
    {
      type: 'number',
      prompt:
        'Một hình vuông có chu vi 20 cm. Diện tích hình vuông là bao nhiêu xăng-ti-mét vuông?',
      answer: 25,
      unit: 'cm²',
      hints: [
        'Trước hết tìm độ dài một cạnh: chu vi hình vuông bằng cạnh nhân với 4.',
        'Cạnh là 20 : 4.',
      ],
      solution: 'Cạnh hình vuông là: 20 : 4 = 5 (cm). Diện tích hình vuông là: 5 × 5 = 25 (cm²).',
    },
    {
      type: 'choice',
      prompt: 'Hình chữ nhật dài 5 cm, rộng 3 cm. Câu nào đúng?',
      options: [
        'Chu vi 16 cm, diện tích 15 cm²',
        'Chu vi 15 cm, diện tích 16 cm²',
        'Chu vi 8 cm, diện tích 15 cm²',
      ],
      answer: 0,
      hints: ['Chu vi: (dài + rộng) × 2. Diện tích: dài × rộng.'],
      solution: 'Chu vi: (5 + 3) × 2 = 16 (cm). Diện tích: 5 × 3 = 15 (cm²).',
    },
  ],
  takeaways: [
    'Diện tích hình chữ nhật = chiều dài × chiều rộng (cùng đơn vị đo).',
    'Diện tích hình vuông = độ dài một cạnh × chính nó.',
    'Chu vi đo bằng đơn vị đo độ dài (cm, dm, m); diện tích đo bằng đơn vị đo diện tích (cm²).',
  ],
};
