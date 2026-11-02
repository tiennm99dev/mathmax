/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhận biết hình tròn, tâm, bán kính và đường kính; đường kính gấp 2 lần bán kính; dùng compa để vẽ đường tròn.',
  intro:
    'Mặt đồng hồ, chiếc đĩa, bánh xe đều có dạng hình tròn. Làm sao vẽ được một hình tròn thật tròn? Em cùng quay compa để vẽ nhé!',
  objectives: [
    'Nhận biết tâm, bán kính và đường kính của hình tròn.',
    'Biết đường kính gấp 2 lần bán kính.',
    'Biết dùng compa để vẽ đường tròn.',
  ],
  sections: [
    {
      heading: 'Tâm, bán kính, đường kính',
      blocks: [
        { type: 'p', text: 'Hình tròn có một điểm ở chính giữa. Đó là tâm của hình tròn.' },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tâm O',
          text: 'Hình tròn có tâm O được gọi là hình tròn tâm O.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Bán kính',
          text: 'Đoạn thẳng nối tâm với một điểm trên đường tròn là bán kính. Ví dụ: OM, ON.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đường kính',
          text: 'Đoạn thẳng đi qua tâm, nối hai điểm trên đường tròn là đường kính. Ví dụ: MN.',
        },
        {
          type: 'p',
          text: 'Đoạn thẳng nối hai điểm trên đường tròn mà không đi qua tâm thì không phải là đường kính.',
        },
      ],
    },
    {
      heading: 'Đường kính gấp 2 lần bán kính',
      blocks: [
        { type: 'p', text: 'Tâm O là trung điểm của đường kính MN.' },
        { type: 'p', text: 'Đường kính MN gồm hai bán kính OM và ON.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Các bán kính của một hình tròn dài bằng nhau. Đường kính gấp 2 lần bán kính.',
        },
        {
          type: 'table',
          head: ['Bán kính', 'Đường kính'],
          rows: [
            ['1 cm', '2 cm'],
            ['3 cm', '6 cm'],
            ['5 cm', '10 cm'],
          ],
        },
      ],
    },
    {
      heading: 'Vẽ đường tròn bằng compa',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Mở compa theo độ dài bán kính.',
            'Đặt đầu có kim vào điểm làm tâm.',
            'Giữ yên đầu kim, quay đầu bút một vòng.',
          ],
        },
        {
          type: 'p',
          text: 'Đường em vẽ được là đường tròn. Đường tròn và phần bên trong là hình tròn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Compa ảo',
    instruction:
      'Kéo đầu bút P để mở rộng compa, hoặc chạm vào P rồi bấm phím mũi tên. Bấm "Quay compa" để vẽ đường tròn. Vẽ xong, kéo P: bán kính thay đổi thì đường kính thay đổi theo. Đố em: trả lời 8 câu hỏi.',
  },
  examples: [
    {
      problem: 'Hình tròn có bán kính 4 cm. Đường kính dài mấy xăng-ti-mét?',
      steps: ['Đường kính gấp 2 lần bán kính.', '4 × 2 = 8.'],
      answer: 'Đường kính dài 8 cm.',
    },
    {
      problem: 'Hình tròn có đường kính 18 cm. Bán kính dài mấy xăng-ti-mét?',
      steps: ['Bán kính bằng một nửa đường kính.', '18 : 2 = 9.'],
      answer: 'Bán kính dài 9 cm.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt:
        'Hình tròn tâm O. Đoạn MN đi qua O, hai đầu M, N nằm trên đường tròn. P nằm trên đường tròn. Đoạn nào là bán kính?',
      options: ['OP', 'OM', 'ON', 'MN'],
      answers: [0, 1, 2],
      hints: ['Bán kính đi từ tâm O ra đường tròn.'],
      solution:
        'OP, OM, ON nối tâm O với một điểm trên đường tròn, nên là bán kính. MN là đường kính.',
    },
    {
      type: 'choice',
      prompt:
        'Hình tròn tâm I. Hai điểm A, B nằm trên đường tròn. Đoạn thẳng AB đi qua I. AB là gì của hình tròn?',
      options: ['Đường kính', 'Bán kính', 'Tâm'],
      answer: 0,
      hints: ['Đoạn thẳng này đi qua tâm.'],
      solution: 'AB đi qua tâm I và nối hai điểm trên đường tròn, nên AB là đường kính.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi tên gọi với điều đúng về nó.',
      left: ['Tâm', 'Bán kính', 'Đường kính'],
      right: [
        'Đoạn thẳng đi qua tâm, nối hai điểm trên đường tròn',
        'Điểm ở chính giữa hình tròn',
        'Đoạn thẳng nối tâm với một điểm trên đường tròn',
      ],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Chỉ một tên gọi là một điểm. Hai tên còn lại là đoạn thẳng.'],
      solution:
        'Tâm là điểm ở chính giữa. Bán kính nối tâm với một điểm trên đường tròn. Đường kính đi qua tâm, nối hai điểm trên đường tròn.',
    },
    {
      type: 'number',
      prompt: 'Hình tròn có bán kính 6 cm. Đường kính dài mấy xăng-ti-mét?',
      answer: 12,
      unit: 'cm',
      hints: ['Đường kính gấp mấy lần bán kính?'],
      solution: '6 × 2 = 12. Đường kính dài 12 cm.',
    },
    {
      type: 'number',
      prompt: 'Hình tròn có đường kính 14 cm. Bán kính dài mấy xăng-ti-mét?',
      answer: 7,
      unit: 'cm',
      hints: ['Bán kính bằng một nửa đường kính.'],
      solution: '14 : 2 = 7. Bán kính dài 7 cm.',
    },
    {
      type: 'choice',
      prompt: 'OA và OB là hai bán kính của một hình tròn. OA = 5 cm. Câu nào đúng?',
      options: ['OB = 5 cm', 'OB = 10 cm', 'OB nhỏ hơn OA'],
      answer: 0,
      hints: ['Các bán kính của một hình tròn dài như thế nào?'],
      solution: 'Các bán kính của một hình tròn dài bằng nhau, nên OB = OA = 5 cm.',
    },
    {
      type: 'number',
      prompt:
        'Các hình tròn đều có bán kính 7 cm. Bọ ngựa bò dọc một bán kính, rồi hai đường kính, rồi một bán kính nữa. Bọ ngựa bò mấy xăng-ti-mét?',
      answer: 42,
      unit: 'cm',
      hints: ['Một đường kính dài bao nhiêu?', 'Cộng cả bốn đoạn lại.'],
      solution: 'Đường kính dài 7 × 2 = 14 (cm). Bọ ngựa bò 7 + 14 + 14 + 7 = 42 (cm).',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước vẽ đường tròn bằng compa theo đúng thứ tự.',
      items: [
        'Giữ yên đầu kim, quay đầu bút một vòng',
        'Mở compa theo độ dài bán kính',
        'Đặt đầu có kim vào điểm làm tâm',
      ],
      answer: [1, 2, 0],
      hints: ['Em phải mở compa trước khi đặt lên giấy.'],
      solution: 'Mở compa theo độ dài bán kính, đặt đầu kim vào tâm, rồi quay đầu bút một vòng.',
    },
  ],
  takeaways: [
    'Bán kính nối tâm với một điểm trên đường tròn.',
    'Đường kính đi qua tâm, nối hai điểm trên đường tròn.',
    'Đường kính gấp 2 lần bán kính.',
  ],
};
