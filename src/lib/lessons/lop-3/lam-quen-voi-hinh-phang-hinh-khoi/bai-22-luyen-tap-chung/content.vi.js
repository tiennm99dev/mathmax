/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Làm quen với hình phẳng, hình khối: trung điểm, hình tròn, góc vuông, hình chữ nhật, hình vuông, khối lập phương, khối hộp chữ nhật và bài toán thực tế.',
  intro:
    'Lá súng trên ao, kim đồng hồ, khối lập phương nhỏ xếp thành khối lớn. Em dùng những điều đã học về hình để giải các bài toán này nhé!',
  objectives: [
    'Nhận biết trung điểm, tâm, bán kính, đường kính, góc vuông.',
    'Nhớ đặc điểm của hình chữ nhật, hình vuông, khối lập phương, khối hộp chữ nhật.',
    'Giải bài toán thực tế về hình phẳng và hình khối.',
  ],
  sections: [
    {
      heading: 'Hình phẳng',
      blocks: [
        {
          type: 'table',
          head: ['Điều cần nhớ', 'Ví dụ'],
          rows: [
            ['Trung điểm chia đoạn thẳng thành hai phần bằng nhau', 'AB = 8 cm thì AM = 4 cm'],
            ['Đường kính gấp 2 lần bán kính', 'Bán kính 3 cm thì đường kính 6 cm'],
            [
              'Hình chữ nhật có 4 góc vuông, 2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau',
              'AB = CD, BC = DA',
            ],
            ['Hình vuông có 4 góc vuông, 4 cạnh dài bằng nhau', 'MN = NP = PQ = QM'],
          ],
        },
      ],
    },
    {
      heading: 'Hình khối',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khối lập phương và khối hộp chữ nhật đều có 8 đỉnh, 12 cạnh, 6 mặt.',
        },
        {
          type: 'p',
          text: 'Mặt của khối lập phương là hình vuông. Mặt của khối hộp chữ nhật là hình chữ nhật.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Em chạm vào đáp án đúng. Sai lần đầu, em được gợi ý và thử lại. Hết bộ, em xem phần nào cần ôn và làm bộ bài khác.',
  },
  examples: [
    {
      problem:
        'Bốn hình tròn bằng nhau, bán kính 3 cm, xếp khít thành 2 hàng trong một hình vuông. Cạnh hình vuông dài mấy xăng-ti-mét?',
      steps: [
        'Đường kính dài 3 × 2 = 6 (cm).',
        'Một cạnh hình vuông dài bằng 2 đường kính: 6 + 6 = 12.',
      ],
      answer: 'Cạnh hình vuông dài 12 cm.',
    },
    {
      problem:
        'Xếp 8 khối lập phương nhỏ thành khối lập phương lớn. Sơn cả 6 mặt của khối lớn. Có mấy mặt nhỏ được sơn?',
      steps: ['Mỗi mặt của khối lớn gồm 4 mặt nhỏ.', 'Khối lớn có 6 mặt: 4 × 6 = 24.'],
      answer: 'Có 24 mặt nhỏ được sơn.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'M là trung điểm của đoạn thẳng AB. AB = 10 cm. AM dài mấy xăng-ti-mét?',
      answer: 5,
      unit: 'cm',
      hints: ['Trung điểm chia đoạn thẳng thành hai phần bằng nhau.'],
      solution: 'AM dài bằng một nửa AB: 10 : 2 = 5 (cm).',
    },
    {
      type: 'number',
      prompt: 'I là trung điểm của đoạn thẳng CD. CI = 6 cm. CD dài mấy xăng-ti-mét?',
      answer: 12,
      unit: 'cm',
      hints: ['CD gồm hai đoạn CI và ID, hai đoạn này dài bằng nhau.'],
      solution: 'CD = CI + ID = 6 + 6 = 12 (cm).',
    },
    {
      type: 'number',
      prompt: 'Hình tròn tâm O có bán kính 4 cm. Đường kính của hình tròn dài mấy xăng-ti-mét?',
      answer: 8,
      unit: 'cm',
      hints: ['Đường kính gấp mấy lần bán kính?'],
      solution: 'Đường kính gấp 2 lần bán kính: 4 × 2 = 8 (cm).',
    },
    {
      type: 'number',
      prompt:
        'Bốn hình tròn bằng nhau, bán kính 5 cm, xếp khít thành 2 hàng trong một hình vuông. Cạnh hình vuông dài mấy xăng-ti-mét?',
      answer: 20,
      unit: 'cm',
      hints: ['Một cạnh hình vuông dài bằng 2 đường kính. Mỗi đường kính bằng 2 bán kính.'],
      solution: 'Đường kính dài 5 × 2 = 10 (cm). Cạnh hình vuông dài 10 + 10 = 20 (cm).',
    },
    {
      type: 'number',
      prompt:
        'Trên ao có 2 lá súng to, đường kính 10 cm, và 2 lá súng nhỏ, đường kính 5 cm, xếp khít thành một hàng. Hàng lá dài mấy xăng-ti-mét?',
      answer: 30,
      unit: 'cm',
      hints: ['Em cộng đường kính của cả 4 lá.'],
      solution: '10 + 10 + 5 + 5 = 30 (cm).',
    },
    {
      type: 'choice',
      prompt: 'Lúc nào kim giờ và kim phút tạo thành góc vuông?',
      options: ['3 giờ', '2 giờ', '5 giờ', '6 giờ'],
      answer: 0,
      hints: ['Kim phút chỉ số 12. Kim giờ phải chỉ số nào để vừa khít góc vuông của ê ke?'],
      solution: 'Lúc 3 giờ, kim phút chỉ số 12, kim giờ chỉ số 3, hai kim tạo thành góc vuông.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hình với đặc điểm của nó.',
      left: ['Hình tam giác', 'Hình tròn', 'Hình vuông', 'Khối lập phương'],
      right: [
        '8 đỉnh, 12 cạnh, 6 mặt',
        '3 đỉnh, 3 cạnh, 3 góc',
        '4 góc vuông, 4 cạnh dài bằng nhau',
        'Có tâm, bán kính, đường kính',
      ],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 2],
        [3, 0],
      ],
      hints: ['Hình tròn không có cạnh. Khối lập phương có mặt.'],
      solution:
        'Hình tam giác có 3 đỉnh, 3 cạnh, 3 góc. Hình tròn có tâm, bán kính, đường kính. Hình vuông có 4 góc vuông, 4 cạnh bằng nhau. Khối lập phương có 8 đỉnh, 12 cạnh, 6 mặt.',
    },
    {
      type: 'multi',
      prompt: 'Những hình nào có 4 góc vuông?',
      options: ['Hình chữ nhật', 'Hình vuông', 'Hình tròn', 'Hình tam giác'],
      answers: [0, 1],
      hints: ['Hình tam giác có mấy góc? Hình tròn có góc không?'],
      solution: 'Hình chữ nhật và hình vuông đều có 4 góc vuông.',
    },
    {
      type: 'number',
      prompt: 'Hình chữ nhật ABCD có AB = 15 cm, BC = 7 cm. CD dài mấy xăng-ti-mét?',
      answer: 15,
      unit: 'cm',
      hints: ['AB và CD là hai cạnh dài của hình chữ nhật.'],
      solution: 'Hai cạnh dài bằng nhau, nên CD = AB = 15 cm.',
    },
    {
      type: 'number',
      prompt:
        'Xếp 8 khối lập phương nhỏ thành một khối lập phương lớn. Sơn 5 mặt của khối lớn. Có mấy mặt của khối nhỏ được sơn?',
      answer: 20,
      unit: 'mặt',
      hints: ['Mỗi mặt của khối lớn gồm 4 mặt nhỏ.'],
      solution: 'Số mặt nhỏ được sơn là 4 × 5 = 20 (mặt).',
    },
    {
      type: 'number',
      prompt:
        'Mỗi hộp quà dạng khối lập phương dán 1 tờ giấy lên mỗi mặt. Dán 3 hộp quà cần mấy tờ giấy?',
      answer: 18,
      unit: 'tờ',
      hints: ['Khối lập phương có mấy mặt? Em nhân với 3.'],
      solution: 'Mỗi hộp có 6 mặt. 3 hộp cần 6 × 3 = 18 (tờ).',
    },
    {
      type: 'number',
      prompt: 'Khung sắt dạng khối lập phương. Bác thợ đã sơn 3 cạnh. Còn mấy cạnh chưa sơn?',
      answer: 9,
      unit: 'cạnh',
      hints: ['Khung có tất cả mấy cạnh?'],
      solution: 'Khối lập phương có 12 cạnh. Còn 12 − 3 = 9 (cạnh).',
    },
  ],
  takeaways: [
    'Trung điểm chia đoạn thẳng thành hai phần bằng nhau. Đường kính gấp 2 lần bán kính.',
    'Hình chữ nhật và hình vuông đều có 4 góc vuông.',
    'Khối lập phương và khối hộp chữ nhật đều có 8 đỉnh, 12 cạnh, 6 mặt.',
  ],
};
