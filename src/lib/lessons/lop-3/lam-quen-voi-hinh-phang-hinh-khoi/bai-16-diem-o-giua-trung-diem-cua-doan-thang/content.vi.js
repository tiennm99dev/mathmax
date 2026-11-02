/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhận biết điểm ở giữa hai điểm và trung điểm của đoạn thẳng: ba điểm thẳng hàng, điểm nằm giữa cách đều hai đầu đoạn thẳng thì là trung điểm.',
  intro:
    'Em có sợi dây và muốn cắt thành hai đoạn dài bằng nhau. Cắt ở đâu thì đúng? Em cùng kéo điểm M và nhìn thước để tìm chỗ đó nhé!',
  objectives: [
    'Nhận biết điểm ở giữa hai điểm.',
    'Nhận biết trung điểm của đoạn thẳng.',
    'Dùng thước để kiểm tra một điểm có là trung điểm không.',
  ],
  sections: [
    {
      heading: 'Điểm ở giữa',
      blocks: [
        { type: 'p', text: 'A, O, B là ba điểm thẳng hàng. O nằm giữa A và B.' },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Điểm ở giữa',
          text: 'O là điểm ở giữa hai điểm A và B.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Ba điểm phải thẳng hàng. Nếu O nằm lệch ra ngoài đường thẳng qua A và B, thì O không phải là điểm ở giữa.',
        },
      ],
    },
    {
      heading: 'Trung điểm của đoạn thẳng',
      blocks: [
        { type: 'p', text: 'M là điểm ở giữa hai điểm A và B.' },
        { type: 'p', text: 'Độ dài đoạn thẳng AM bằng độ dài đoạn thẳng MB.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'M là điểm ở giữa A và B, và AM = MB. Khi đó, M là trung điểm của đoạn thẳng AB.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Mọi trung điểm đều là điểm ở giữa. Nhưng điểm ở giữa chưa chắc là trung điểm, vì hai đoạn có thể không bằng nhau.',
        },
      ],
    },
    {
      heading: 'Kiểm tra trung điểm',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Xem điểm đó có nằm giữa hai đầu đoạn thẳng không.',
            'Dùng thước đo hai đoạn thẳng.',
            'Hai đoạn dài bằng nhau thì điểm đó là trung điểm.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Tìm trung điểm bằng thước',
    instruction:
      'Kéo điểm M, hoặc chạm vào M rồi bấm phím mũi tên. Thử để M lệch khỏi đoạn thẳng, rồi đưa M về đúng trung điểm. Đổi độ dài AB để tìm lại. Đố em: trả lời 8 câu hỏi.',
  },
  examples: [
    {
      problem:
        'I là điểm ở giữa hai điểm C và D. CI = 5 cm, ID = 5 cm. I có là trung điểm của đoạn thẳng CD không?',
      steps: ['I là điểm ở giữa C và D.', 'CI = ID = 5 cm, hai đoạn dài bằng nhau.'],
      answer: 'I là trung điểm của đoạn thẳng CD.',
    },
    {
      problem: 'K là trung điểm của đoạn thẳng PQ. PQ dài 16 cm. PK dài mấy xăng-ti-mét?',
      steps: ['K là trung điểm, nên PK = KQ.', 'Hai đoạn ghép lại dài 16 cm: 16 : 2 = 8.'],
      answer: 'PK dài 8 cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'M là điểm ở giữa hai điểm A và B. AM = 3 cm, MB = 3 cm. M có là trung điểm của đoạn thẳng AB không?',
      options: ['Có', 'Không'],
      answer: 0,
      hints: ['So sánh độ dài AM và MB.'],
      solution: 'M ở giữa A và B, AM = MB = 3 cm, nên M là trung điểm của đoạn thẳng AB.',
    },
    {
      type: 'choice',
      prompt:
        'N là điểm ở giữa hai điểm B và C. NB = 2 cm, NC = 4 cm. N có là trung điểm của đoạn thẳng BC không?',
      options: ['Có', 'Không'],
      answer: 1,
      hints: ['Trung điểm phải cách đều hai đầu đoạn thẳng.'],
      solution: 'NB khác NC, nên N không là trung điểm của đoạn thẳng BC. N chỉ là điểm ở giữa.',
    },
    {
      type: 'choice',
      prompt: 'Ba điểm M, B, N không thẳng hàng. B có là điểm ở giữa hai điểm M và N không?',
      options: ['Có', 'Không'],
      answer: 1,
      hints: ['Điểm ở giữa phải thẳng hàng với hai điểm kia.'],
      solution: 'Ba điểm không thẳng hàng, nên B không là điểm ở giữa hai điểm M và N.',
    },
    {
      type: 'choice',
      prompt:
        'H, M, K thẳng hàng, M nằm giữa H và K, và MH = MK. M là trung điểm của đoạn thẳng nào?',
      options: ['HK', 'HM', 'MK'],
      answer: 0,
      hints: ['Trung điểm nằm giữa hai đầu của đoạn thẳng đó.'],
      solution: 'M nằm giữa H và K, MH = MK, nên M là trung điểm của đoạn thẳng HK.',
    },
    {
      type: 'number',
      prompt:
        'Đoạn thẳng AB dài 8 bước nhảy. Cào cào đã nhảy 2 bước từ A. Cào cào cần nhảy thêm mấy bước để đến trung điểm của AB?',
      answer: 2,
      hints: ['Từ A đến trung điểm là mấy bước?', 'Lấy số bước đó trừ đi số bước đã nhảy.'],
      solution: 'Từ A đến trung điểm có 8 : 2 = 4 bước. Cào cào cần nhảy thêm 4 − 2 = 2 bước.',
    },
    {
      type: 'choice',
      prompt:
        'Việt có đoạn dây dài 20 cm và không có thước. Làm sao để cắt được đoạn dây dài 10 cm?',
      options: [
        'Gấp đôi đoạn dây rồi cắt ở chỗ gấp',
        'Gấp đoạn dây làm ba rồi cắt',
        'Cắt ở gần một đầu dây',
      ],
      answer: 0,
      hints: ['10 cm là một nửa của 20 cm.'],
      solution:
        'Gấp đôi dây, hai đầu dây chạm nhau. Chỗ gấp là trung điểm. Cắt ở đó được hai đoạn dài 10 cm.',
    },
    {
      type: 'number',
      prompt: 'O là trung điểm của đoạn thẳng EG. OE dài 6 cm. EG dài mấy xăng-ti-mét?',
      answer: 12,
      unit: 'cm',
      hints: ['OG dài bằng OE.', 'EG gồm hai đoạn OE và OG.'],
      solution: 'OG = OE = 6 cm. EG dài 6 + 6 = 12 (cm).',
    },
    {
      type: 'match',
      prompt:
        'M là trung điểm của mỗi đoạn thẳng. Nối độ dài đoạn thẳng với độ dài từ M đến một đầu.',
      left: ['Đoạn thẳng dài 10 cm', 'Đoạn thẳng dài 14 cm', 'Đoạn thẳng dài 4 cm'],
      right: ['2 cm', '7 cm', '5 cm'],
      pairs: [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
      hints: ['Từ trung điểm đến một đầu là một nửa đoạn thẳng.'],
      solution: '10 : 2 = 5, 14 : 2 = 7, 4 : 2 = 2.',
    },
  ],
  takeaways: [
    'Điểm ở giữa hai điểm: ba điểm thẳng hàng, điểm đó nằm giữa hai điểm kia.',
    'Trung điểm: điểm ở giữa, cách đều hai đầu đoạn thẳng.',
  ],
};
