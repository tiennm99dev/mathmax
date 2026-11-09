/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Diện tích của một hình là phần mặt phẳng hình đó chiếm. Xăng-ti-mét vuông (cm²) là diện tích hình vuông có cạnh 1 cm; đếm số ô vuông 1 cm² lát kín hình là được diện tích.',
  intro:
    'Hai tấm thiệp có hình dạng khác nhau. Tấm nào to hơn? Em lát ô vuông lên từng tấm rồi đếm nhé. Hôm nay em học diện tích và đơn vị xăng-ti-mét vuông.',
  objectives: [
    'Nhận biết diện tích của một hình qua so sánh và đếm ô vuông.',
    'Biết xăng-ti-mét vuông là diện tích hình vuông có cạnh 1 cm, viết tắt cm².',
    'Đọc, viết và tính được với số đo có đơn vị cm².',
  ],
  sections: [
    {
      heading: 'Diện tích của một hình',
      blocks: [
        {
          type: 'p',
          text: 'Hình tròn nằm trọn trong hình chữ nhật. Ta nói: diện tích hình tròn bé hơn diện tích hình chữ nhật.',
        },
        {
          type: 'p',
          text: 'Hình A và hình B có hình dạng khác nhau, nhưng đều gồm 5 ô vuông như nhau. Ta nói: diện tích hình A bằng diện tích hình B.',
        },
        {
          type: 'p',
          text: 'Hình P được tách thành hình M và hình N. Ta nói: diện tích hình P bằng tổng diện tích hình M và hình N.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Muốn so sánh diện tích, em có thể đếm số ô vuông như nhau lát kín mỗi hình. Hình nào nhiều ô hơn thì có diện tích lớn hơn.',
        },
      ],
    },
    {
      heading: 'Xăng-ti-mét vuông',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Xăng-ti-mét vuông là diện tích của hình vuông có cạnh dài 1 cm. Xăng-ti-mét vuông viết tắt là cm².',
        },
        {
          type: 'p',
          text: 'Một hình được lát kín bằng 6 ô vuông 1 cm². Diện tích hình đó là 6 cm².',
        },
        {
          type: 'table',
          head: ['Viết', 'Đọc'],
          rows: [
            ['3 cm²', 'ba xăng-ti-mét vuông'],
            ['15 cm²', 'mười lăm xăng-ti-mét vuông'],
            ['1 500 cm²', 'một nghìn năm trăm xăng-ti-mét vuông'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'cm là đơn vị đo độ dài. cm² là đơn vị đo diện tích. Em đừng viết nhầm hai đơn vị này.',
        },
      ],
    },
    {
      heading: 'Tính với đơn vị cm²',
      blocks: [
        {
          type: 'p',
          text: 'Em tính như với số tự nhiên, rồi viết cm² sau kết quả.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Kết quả'],
          rows: [
            ['2 cm² + 3 cm²', '5 cm²'],
            ['9 cm² − 4 cm²', '5 cm²'],
            ['3 cm² × 2', '6 cm²'],
            ['8 cm² : 4', '2 cm²'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Lát ô vuông 1 cm²',
    instruction:
      'Em chạm vào từng ô của hình để đặt một ô vuông 1 cm². Lát kín hình rồi đọc diện tích. Bấm "Hình khác" để lát hình tiếp theo và so sánh diện tích các hình.',
  },
  examples: [
    {
      problem:
        'Hình chữ L được lát kín bằng các ô vuông 1 cm²: hàng trên 2 ô, hàng giữa 2 ô, hàng dưới 4 ô. Tính diện tích hình.',
      steps: ['Đếm số ô vuông: 2 + 2 + 4 = 8 (ô).', 'Mỗi ô vuông là 1 cm².'],
      answer: 'Diện tích hình chữ L là 8 cm².',
    },
    {
      problem: 'Tính: 18 cm² + 26 cm²; 40 cm² : 5.',
      steps: ['18 + 26 = 44, nên 18 cm² + 26 cm² = 44 cm².', '40 : 5 = 8, nên 40 cm² : 5 = 8 cm².'],
      answer: '44 cm² và 8 cm².',
    },
    {
      problem:
        'Hình P được ghép từ hình M có diện tích 4 cm² và hình N có diện tích 3 cm². Tính diện tích hình P.',
      steps: ['Diện tích hình P bằng tổng diện tích hình M và hình N.', '4 + 3 = 7 (cm²).'],
      answer: 'Diện tích hình P là 7 cm².',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hình vuông có cạnh 1 cm thì có diện tích bao nhiêu?',
      options: ['1 cm²', '4 cm²', '1 cm'],
      answer: 0,
      hints: ['Nhớ lại: xăng-ti-mét vuông là diện tích của hình vuông nào?'],
      solution:
        'Xăng-ti-mét vuông là diện tích hình vuông có cạnh 1 cm. Vậy diện tích là 1 cm². Còn 1 cm là độ dài, không phải diện tích.',
    },
    {
      type: 'choice',
      prompt: '"Mười hai xăng-ti-mét vuông" viết là gì?',
      options: ['12 cm²', '12 cm', '21 cm²', '120 cm²'],
      answer: 0,
      hints: ['Viết số 12 rồi viết kí hiệu xăng-ti-mét vuông.'],
      solution: 'Mười hai xăng-ti-mét vuông viết là 12 cm².',
    },
    {
      type: 'choice',
      prompt: '1 500 cm² đọc là gì?',
      options: [
        'một nghìn năm trăm xăng-ti-mét vuông',
        'một nghìn năm trăm xăng-ti-mét',
        'mười lăm xăng-ti-mét vuông',
      ],
      answer: 0,
      hints: ['Đọc số trước, rồi đọc đơn vị cm².'],
      solution: '1 500 cm² đọc là: một nghìn năm trăm xăng-ti-mét vuông.',
    },
    {
      type: 'number',
      prompt: 'Tính: 25 cm² + 17 cm² = ?',
      answer: 42,
      unit: 'cm²',
      hints: ['Em cộng 25 + 17 rồi viết cm² sau kết quả.'],
      solution: '25 + 17 = 42, nên 25 cm² + 17 cm² = 42 cm².',
    },
    {
      type: 'number',
      prompt: 'Tính: 50 cm² − 18 cm² = ?',
      answer: 32,
      unit: 'cm²',
      hints: ['Em trừ 50 − 18 như số tự nhiên.'],
      solution: '50 − 18 = 32, nên 50 cm² − 18 cm² = 32 cm².',
    },
    {
      type: 'number',
      prompt: 'Tính: 12 cm² × 3 = ?',
      answer: 36,
      unit: 'cm²',
      hints: ['12 × 3 bằng bao nhiêu?'],
      solution: '12 × 3 = 36, nên 12 cm² × 3 = 36 cm².',
    },
    {
      type: 'number',
      prompt: 'Tính: 48 cm² : 6 = ?',
      answer: 8,
      unit: 'cm²',
      hints: ['Nhớ bảng chia 6.'],
      solution: '48 : 6 = 8, nên 48 cm² : 6 = 8 cm².',
    },
    {
      type: 'choice',
      prompt:
        'Hình A được lát kín bằng 7 ô vuông 1 cm². Hình B được lát kín bằng 9 ô vuông 1 cm². Hình nào có diện tích lớn hơn?',
      options: ['Hình B', 'Hình A', 'Hai hình bằng nhau'],
      answer: 0,
      hints: ['Hình nào có nhiều ô vuông hơn?'],
      solution:
        'Hình A có diện tích 7 cm², hình B có diện tích 9 cm². 9 > 7 nên hình B có diện tích lớn hơn.',
    },
    {
      type: 'number',
      prompt:
        'Hình P được tách thành hình M có diện tích 6 cm² và hình N có diện tích 5 cm². Diện tích hình P là bao nhiêu xăng-ti-mét vuông?',
      answer: 11,
      unit: 'cm²',
      hints: ['Diện tích hình P bằng tổng diện tích hình M và hình N.'],
      solution: 'Diện tích hình P là: 6 + 5 = 11 (cm²).',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số đo diện tích từ bé đến lớn.',
      items: ['30 cm²', '9 cm²', '100 cm²', '45 cm²'],
      answer: [1, 0, 3, 2],
      hints: ['Cùng đơn vị cm², em so sánh các số.'],
      solution: '9 < 30 < 45 < 100, nên thứ tự là: 9 cm², 30 cm², 45 cm², 100 cm².',
    },
  ],
  takeaways: [
    'Hình nằm trọn trong hình kia thì có diện tích bé hơn.',
    'Hai hình lát kín bằng số ô vuông như nhau thì có diện tích bằng nhau.',
    'Xăng-ti-mét vuông (cm²) là diện tích hình vuông có cạnh 1 cm.',
    'Tính với cm² như với số tự nhiên, rồi viết cm² sau kết quả.',
  ],
};
