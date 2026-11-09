/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Chu vi của một hình là tổng độ dài các cạnh. Chu vi hình chữ nhật bằng chiều dài cộng chiều rộng rồi nhân với 2; chu vi hình vuông bằng độ dài một cạnh nhân với 4.',
  intro:
    'Một chú kiến bò một vòng quanh mép chiếc bánh quy hình tam giác. Chú kiến đã bò được bao xa? Hôm nay em học về chu vi nhé!',
  objectives: [
    'Biết chu vi của một hình là tổng độ dài các cạnh của hình đó.',
    'Tính được chu vi hình tam giác, hình tứ giác.',
    'Tính được chu vi hình chữ nhật, hình vuông theo quy tắc.',
  ],
  sections: [
    {
      heading: 'Chu vi của một hình',
      blocks: [
        {
          type: 'p',
          text: 'Hình tam giác ABC có ba cạnh: AB = 2 cm, BC = 3 cm, CA = 4 cm.',
        },
        {
          type: 'p',
          text: 'Tổng độ dài các cạnh là: 2 + 3 + 4 = 9 (cm). Ta nói: chu vi hình tam giác ABC là 9 cm.',
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Chu vi của một hình là tổng độ dài các cạnh của hình đó.',
        },
        {
          type: 'table',
          head: ['Hình', 'Độ dài các cạnh', 'Chu vi'],
          rows: [
            ['Tam giác ABC', '2 cm, 3 cm, 4 cm', '2 + 3 + 4 = 9 (cm)'],
            ['Tứ giác MNPQ', '2 dm, 3 dm, 4 dm, 5 dm', '2 + 3 + 4 + 5 = 14 (dm)'],
          ],
        },
      ],
    },
    {
      heading: 'Chu vi hình chữ nhật',
      blocks: [
        {
          type: 'p',
          text: 'Hình chữ nhật ABCD có chiều dài 4 dm, chiều rộng 3 dm. Chu vi là: 4 + 3 + 4 + 3 = 14 (dm).',
        },
        {
          type: 'p',
          text: 'Hình chữ nhật có hai chiều dài và hai chiều rộng. Nên ta tính nhanh: (4 + 3) × 2 = 14 (dm).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tính chu vi hình chữ nhật, ta lấy chiều dài cộng với chiều rộng (cùng đơn vị đo) rồi nhân với 2.',
        },
      ],
    },
    {
      heading: 'Chu vi hình vuông',
      blocks: [
        {
          type: 'p',
          text: 'Hình vuông ABCD có cạnh 3 dm. Bốn cạnh dài bằng nhau: 3 + 3 + 3 + 3 = 12 (dm).',
        },
        {
          type: 'p',
          text: 'Ta tính nhanh: 3 × 4 = 12 (dm).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tính chu vi hình vuông, ta lấy độ dài một cạnh nhân với 4.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Các cạnh phải cùng đơn vị đo. Chiều dài 2 dm, chiều rộng 8 cm: em đổi 2 dm = 20 cm rồi mới tính.',
        },
      ],
    },
  ],
  explore: {
    title: 'Chú kiến bò quanh hình',
    instruction:
      'Em chọn một hình rồi bấm "Bò tiếp". Mỗi lần, kiến bò thêm một cạnh và quãng đường được cộng dồn. Bò hết một vòng là được chu vi. Với hình chữ nhật, hình vuông, em đổi độ dài cạnh và xem cách tính nhanh.',
  },
  examples: [
    {
      problem: 'Tính chu vi hình tứ giác có các cạnh 3 cm, 5 cm, 9 cm, 5 cm.',
      steps: ['Chu vi là tổng độ dài bốn cạnh.', '3 + 5 + 9 + 5 = 22 (cm).'],
      answer: 'Chu vi hình tứ giác là 22 cm.',
    },
    {
      problem: 'Một hình chữ nhật có chiều dài 6 cm, chiều rộng 4 cm. Tính chu vi hình chữ nhật.',
      steps: [
        'Lấy chiều dài cộng chiều rộng: 6 + 4 = 10 (cm).',
        'Nhân với 2: 10 × 2 = 20 (cm).',
        'Viết gọn: (6 + 4) × 2 = 20 (cm).',
      ],
      answer: 'Chu vi hình chữ nhật là 20 cm.',
    },
    {
      problem: 'Một viên gạch hình vuông có cạnh 25 cm. Tính chu vi viên gạch.',
      steps: ['Lấy độ dài một cạnh nhân với 4.', '25 × 4 = 100 (cm).'],
      answer: 'Chu vi viên gạch là 100 cm.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Hình tam giác có ba cạnh dài 5 cm, 6 cm, 7 cm. Chu vi hình tam giác là bao nhiêu xăng-ti-mét?',
      answer: 18,
      unit: 'cm',
      hints: ['Chu vi là tổng độ dài ba cạnh.'],
      solution: 'Chu vi hình tam giác là: 5 + 6 + 7 = 18 (cm).',
    },
    {
      type: 'number',
      prompt:
        'Hình tứ giác có bốn cạnh dài 3 dm, 4 dm, 5 dm, 6 dm. Chu vi hình tứ giác là bao nhiêu đề-xi-mét?',
      answer: 18,
      unit: 'dm',
      hints: ['Em cộng độ dài cả bốn cạnh.'],
      solution: 'Chu vi hình tứ giác là: 3 + 4 + 5 + 6 = 18 (dm).',
    },
    {
      type: 'choice',
      prompt: 'Hình chữ nhật có chiều dài 6 cm, chiều rộng 4 cm. Chu vi là bao nhiêu?',
      options: ['20 cm', '10 cm', '24 cm', '14 cm'],
      answer: 0,
      hints: [
        'Lấy chiều dài cộng chiều rộng rồi nhân với 2.',
        'Nhớ tính trong ngoặc trước: (6 + 4) × 2.',
      ],
      solution:
        'Chu vi hình chữ nhật là: (6 + 4) × 2 = 20 (cm). 10 cm là quên nhân 2; 24 cm là 6 × 4.',
    },
    {
      type: 'number',
      prompt: 'Hình vuông có cạnh 7 cm. Chu vi hình vuông là bao nhiêu xăng-ti-mét?',
      answer: 28,
      unit: 'cm',
      hints: ['Hình vuông có 4 cạnh dài bằng nhau.', 'Lấy độ dài một cạnh nhân với 4.'],
      solution: 'Chu vi hình vuông là: 7 × 4 = 28 (cm).',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi hình với chu vi của nó.',
      left: [
        'Hình vuông cạnh 6 cm',
        'Hình chữ nhật dài 9 cm, rộng 5 cm',
        'Hình tam giác cạnh 4 cm, 5 cm, 6 cm',
        'Hình vuông cạnh 4 cm',
      ],
      right: ['24 cm', '28 cm', '15 cm', '16 cm'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Hình vuông: cạnh nhân với 4. Hình chữ nhật: (dài + rộng) × 2. Tam giác: cộng ba cạnh.',
      ],
      solution:
        'Hình vuông cạnh 6 cm: 6 × 4 = 24 (cm). Hình chữ nhật: (9 + 5) × 2 = 28 (cm). Tam giác: 4 + 5 + 6 = 15 (cm). Hình vuông cạnh 4 cm: 4 × 4 = 16 (cm).',
    },
    {
      type: 'choice',
      prompt: 'Hình chữ nhật có chiều dài 2 dm, chiều rộng 8 cm. Chu vi là bao nhiêu?',
      options: ['56 cm', '20 cm', '28 cm'],
      answer: 0,
      hints: ['Hai cạnh chưa cùng đơn vị đo. Em đổi 2 dm ra xăng-ti-mét trước.', '2 dm = 20 cm.'],
      solution: 'Đổi 2 dm = 20 cm. Chu vi hình chữ nhật là: (20 + 8) × 2 = 56 (cm).',
    },
    {
      type: 'order',
      prompt: 'Em xếp các hình theo chu vi từ bé đến lớn.',
      items: [
        'Tam giác cạnh 3 cm, 4 cm, 5 cm',
        'Hình vuông cạnh 4 cm',
        'Hình chữ nhật dài 6 cm, rộng 3 cm',
        'Tứ giác cạnh 2 cm, 3 cm, 4 cm, 5 cm',
      ],
      answer: [0, 3, 1, 2],
      hints: ['Em tính chu vi từng hình trước rồi mới so sánh.'],
      solution:
        'Tam giác: 3 + 4 + 5 = 12 (cm). Tứ giác: 2 + 3 + 4 + 5 = 14 (cm). Hình vuông: 4 × 4 = 16 (cm). Hình chữ nhật: (6 + 3) × 2 = 18 (cm). Từ bé đến lớn: 12 cm, 14 cm, 16 cm, 18 cm.',
    },
    {
      type: 'number',
      prompt:
        'Mảnh vườn hình chữ nhật có chiều dài 12 m, chiều rộng 8 m. Bác An rào xung quanh mảnh vườn. Hàng rào dài bao nhiêu mét?',
      answer: 40,
      unit: 'm',
      hints: ['Hàng rào quanh vườn dài bằng chu vi mảnh vườn.', 'Tính (12 + 8) × 2.'],
      solution: 'Hàng rào dài bằng chu vi mảnh vườn: (12 + 8) × 2 = 40 (m).',
    },
  ],
  takeaways: [
    'Chu vi của một hình là tổng độ dài các cạnh của hình đó.',
    'Chu vi hình chữ nhật = (chiều dài + chiều rộng) × 2.',
    'Chu vi hình vuông = độ dài một cạnh × 4.',
    'Các cạnh phải cùng đơn vị đo trước khi tính.',
  ],
};
