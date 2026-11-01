/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Lít: so sánh đồ vật chứa nhiều nước hơn, ít nước hơn; lít là đơn vị đo dung tích, viết tắt là l; rót ra ca 1 l để biết sức chứa và tính với số đo lít.',
  intro:
    'Cái xô và cái ca, cái nào đựng được nhiều nước hơn? Em rót nước ra những chiếc ca 1 lít rồi đếm. Hôm nay em làm quen với lít nhé!',
  objectives: [
    'So sánh đồ vật chứa được nhiều nước hơn, ít nước hơn.',
    'Biết lít là đơn vị đo dung tích, viết tắt là l.',
    'Đọc, viết số đo lít; đếm số ca 1 l để biết sức chứa.',
    'Cộng, trừ với số đo lít.',
  ],
  sections: [
    {
      heading: 'Nhiều hơn, ít hơn',
      blocks: [
        {
          type: 'p',
          text: 'Cái xô to đựng được nhiều nước. Cái cốc nhỏ đựng được ít nước.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'So sánh sức chứa',
          text: 'Rót hết nước từ hai đồ vật ra những chiếc ca giống nhau. Đồ vật nào rót được nhiều ca hơn thì chứa được nhiều nước hơn.',
        },
        {
          type: 'p',
          text: 'Ví dụ: bình rót được 3 ca, xô rót được 6 ca. Xô chứa được nhiều nước hơn bình. Bình chứa được ít nước hơn xô.',
        },
      ],
    },
    {
      heading: 'Lít',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lít',
          text: 'Để đo sức chứa của cái chai, cái can, cái xô, người ta dùng đơn vị đo là lít. Lít viết tắt là l.',
        },
        {
          type: 'table',
          head: ['Viết', 'Đọc'],
          rows: [
            ['1 l', 'một lít'],
            ['2 l', 'hai lít'],
            ['10 l', 'mười lít'],
          ],
        },
        {
          type: 'p',
          text: 'Cái ca này đựng đầy được 1 l nước. Em gọi nó là ca 1 l.',
        },
        {
          type: 'p',
          text: 'Rót hết nước trong can ra, được đầy 5 ca 1 l. Vậy can chứa được 5 l nước.',
        },
      ],
    },
    {
      heading: 'Tính với số đo lít',
      blocks: [
        {
          type: 'p',
          text: 'Em cộng, trừ như với các số, rồi viết l sau kết quả.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ví dụ',
          text: '2 l + 3 l = 5 l. 15 l − 5 l = 10 l.',
        },
      ],
    },
  ],
  explore: {
    title: 'Rót nước ra ca 1 l',
    instruction:
      '"Rót ra ca 1 l": chạm "Rót 1 l" cho đến khi đồ vật hết nước, đếm số ca đầy rồi chọn số lít. "Nhiều hơn, ít hơn": rót cả hai đồ vật ra ca, rồi chọn đồ vật chứa được nhiều nước hơn.',
  },
  examples: [
    {
      problem: 'Rót hết nước trong xô ra, được đầy 8 ca 1 l. Xô chứa được mấy lít nước?',
      steps: ['Mỗi ca đựng 1 l nước.', 'Có 8 ca đầy nước, vậy có 8 l nước.'],
      answer: 'Xô chứa được 8 l nước.',
    },
    {
      problem:
        'Can to đựng 10 l nước. Can bé đựng ít hơn can to 4 l nước. Hỏi can bé đựng bao nhiêu lít nước?',
      steps: [
        'Tóm tắt: Can to: 10 l. Can bé ít hơn can to: 4 l. Can bé: ... l?',
        'Ít hơn thì em làm phép trừ: 10 − 4.',
        '10 − 4 = 6.',
        'Bài giải: Can bé đựng số lít nước là: 10 − 4 = 6 (l).',
      ],
      answer: 'Đáp số: 6 l nước.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cái nào thường đựng được nhiều nước hơn?',
      options: ['Cái xô', 'Cái cốc'],
      answer: 0,
      hints: ['Đồ vật to hơn thường đựng được nhiều nước hơn.'],
      solution: 'Cái xô to hơn cái cốc nhiều, nên xô đựng được nhiều nước hơn.',
    },
    {
      type: 'choice',
      prompt: 'Bình rót được 4 ca nước. Chai rót được 2 ca nước. Câu nào đúng?',
      options: [
        'Chai chứa được nhiều nước hơn bình.',
        'Bình chứa được nhiều nước hơn chai.',
        'Bình và chai chứa được bằng nhau.',
      ],
      answer: 1,
      hints: ['Đồ vật nào rót được nhiều ca hơn?'],
      solution: '4 ca nhiều hơn 2 ca, nên bình chứa được nhiều nước hơn chai.',
    },
    {
      type: 'choice',
      prompt: 'Lít viết tắt là gì?',
      options: ['kg', 'l', 'cm'],
      answer: 1,
      hints: ['Lít bắt đầu bằng chữ l.'],
      solution: 'Lít viết tắt là l. (kg là ki-lô-gam, cm là xăng-ti-mét.)',
    },
    {
      type: 'match',
      prompt: 'Nối cách viết với cách đọc.',
      left: ['4 l', '12 l', '20 l'],
      right: ['bốn lít', 'mười hai lít', 'hai mươi lít', 'bốn ki-lô-gam'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['l là lít, kg là ki-lô-gam.'],
      solution: '4 l: bốn lít. 12 l: mười hai lít. 20 l: hai mươi lít.',
    },
    {
      type: 'choice',
      prompt: 'Rót hết nước trong can ra, được đầy 6 ca 1 l. Can chứa được mấy lít nước?',
      options: ['5 l', '6 l', '7 l'],
      answer: 1,
      hints: ['Mỗi ca đầy là 1 l. Em đếm số ca đầy.'],
      solution: 'Có 6 ca đầy, mỗi ca 1 l. Can chứa được 6 l nước.',
    },
    {
      type: 'choice',
      prompt: '3 l + 4 l = ?',
      options: ['7', '7 l', '1 l'],
      answer: 1,
      hints: ['Cộng 3 + 4, rồi nhớ viết l sau kết quả.'],
      solution: '3 + 4 = 7, nên 3 l + 4 l = 7 l.',
    },
    {
      type: 'choice',
      prompt: '15 l − 5 l = ?',
      options: ['10 l', '20 l', '9 l'],
      answer: 0,
      hints: ['Trừ 15 − 5, rồi viết l sau kết quả.'],
      solution: '15 − 5 = 10, nên 15 l − 5 l = 10 l.',
    },
    {
      type: 'order',
      prompt: 'Xếp các đồ vật từ chứa ít nước nhất đến chứa nhiều nước nhất.',
      items: ['Xô 10 l', 'Chai 1 l', 'Can 5 l'],
      answer: [1, 2, 0],
      hints: ['So sánh các số: 10, 1 và 5.'],
      solution: '1 l < 5 l < 10 l: chai, can, xô.',
    },
    {
      type: 'choice',
      prompt:
        'Thùng thứ nhất có 10 l nước. Thùng thứ hai có 5 l nước. Cả hai thùng có bao nhiêu lít nước?',
      options: ['5 l', '15 l', '14 l'],
      answer: 1,
      hints: ['Hỏi "cả hai thùng" nên em làm phép cộng.'],
      solution: 'Cả hai thùng có số lít nước là: 10 + 5 = 15 (l). Đáp số: 15 l nước.',
    },
  ],
  takeaways: [
    'Rót ra những ca giống nhau: đồ vật rót được nhiều ca hơn thì chứa được nhiều nước hơn.',
    'Lít là đơn vị đo dung tích, viết tắt là l.',
    'Cộng, trừ số đo lít như cộng, trừ các số, rồi viết l sau kết quả.',
  ],
};
