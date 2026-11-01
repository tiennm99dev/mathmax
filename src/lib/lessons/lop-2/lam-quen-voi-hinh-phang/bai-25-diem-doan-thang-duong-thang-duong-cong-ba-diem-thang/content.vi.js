/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Điểm và đoạn thẳng, đường thẳng và đường cong, ba điểm thẳng hàng: nhận biết, gọi tên và dùng thước để kiểm tra.',
  intro:
    'Em chấm hai điểm rồi dùng thước nối lại: đó là một đoạn thẳng. Kéo dài ra được đường thẳng. Còn ba điểm nào thẳng hàng? Em đặt thước vào là biết ngay!',
  objectives: [
    'Nhận biết điểm, đoạn thẳng và gọi tên chúng bằng chữ cái in hoa.',
    'Phân biệt đường thẳng với đường cong.',
    'Nhận biết ba điểm thẳng hàng bằng thước thẳng.',
    'Đo độ dài đoạn thẳng bằng thước có vạch xăng-ti-mét.',
  ],
  sections: [
    {
      heading: 'Điểm và đoạn thẳng',
      blocks: [
        {
          type: 'p',
          text: 'Em dùng bút chấm một dấu nhỏ lên giấy. Đó là một điểm. Người ta đặt tên điểm bằng chữ cái in hoa: điểm A, điểm B, điểm M.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đoạn thẳng',
          text: 'Dùng thước và bút nối điểm A với điểm B, em được đoạn thẳng AB. A và B là hai đầu của đoạn thẳng.',
        },
        {
          type: 'p',
          text: 'Đoạn thẳng AB cũng gọi là đoạn thẳng BA.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đo đoạn thẳng',
          text: 'Đặt vạch 0 của thước trùng với một đầu đoạn thẳng. Đầu kia trùng với vạch nào thì đoạn thẳng dài bấy nhiêu xăng-ti-mét.',
        },
      ],
    },
    {
      heading: 'Đường thẳng và đường cong',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đường thẳng',
          text: 'Kéo dài đoạn thẳng AB về hai phía, em được đường thẳng AB.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đường cong',
          text: 'Đường uốn cong, không thẳng, là đường cong. Sợi dây võng xuống và cầu vồng có dạng đường cong.',
        },
        {
          type: 'p',
          text: 'Đoạn thẳng dừng lại ở hai điểm. Đường thẳng kéo dài mãi về hai phía. Em xếp các hình dưới đây vào đúng ô nhé.',
        },
        { type: 'widget', name: 'phan-loai' },
      ],
    },
    {
      heading: 'Ba điểm thẳng hàng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ba điểm thẳng hàng',
          text: 'Ba điểm cùng nằm trên một đường thẳng gọi là ba điểm thẳng hàng.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt mép thước đi qua hai điểm.',
            'Nhìn điểm thứ ba.',
            'Điểm thứ ba nằm trên mép thước thì ba điểm thẳng hàng.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Đường thẳng có thể nằm ngang, đứng dọc hoặc nằm xiên. Ba điểm trên một đường xiên vẫn thẳng hàng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng chấm ba điểm',
    instruction:
      'Kéo các điểm A, B, C trên bảng chấm, hoặc chọn một điểm rồi dùng phím mũi tên. Đường nét đứt là thước đặt qua A và B. Khi C nằm trên thước, đường chuyển thành màu xanh: ba điểm thẳng hàng.',
  },
  examples: [
    {
      problem:
        'Ba điểm A, B, C không thẳng hàng. Em nối từng cặp điểm. Em được những đoạn thẳng nào?',
      steps: [
        'Nối A với B, được đoạn thẳng AB.',
        'Nối B với C, được đoạn thẳng BC.',
        'Nối A với C, được đoạn thẳng AC.',
      ],
      answer: 'Em được ba đoạn thẳng: AB, BC, AC.',
    },
    {
      problem:
        'Đặt vạch 0 của thước trùng với điểm M. Điểm N trùng với vạch 7. Đoạn thẳng MN dài bao nhiêu xăng-ti-mét?',
      steps: [
        'Vạch 0 đã trùng với một đầu của đoạn thẳng.',
        'Đầu kia trùng với vạch 7, nên em đọc số 7.',
      ],
      answer: 'Đoạn thẳng MN dài 7 cm.',
    },
    {
      problem:
        'Em đặt mép thước đi qua hai điểm D và E. Điểm G cũng nằm trên mép thước. Ba điểm D, E, G có thẳng hàng không?',
      steps: ['Mép thước là một đường thẳng.', 'Cả ba điểm D, E, G đều nằm trên đường thẳng đó.'],
      answer: 'Ba điểm D, E, G thẳng hàng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Người ta đặt tên điểm bằng gì?',
      options: ['Chữ cái in hoa', 'Chữ số', 'Dấu cộng'],
      answer: 0,
      hints: ['Nhớ lại tên các điểm em đã gặp: điểm A, điểm B.'],
      solution: 'Người ta đặt tên điểm bằng chữ cái in hoa, ví dụ điểm A, điểm M.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi tên với điều đúng về nó.',
      left: ['Đoạn thẳng', 'Đường thẳng', 'Đường cong'],
      right: ['Dừng lại ở hai điểm', 'Kéo dài về hai phía', 'Uốn cong, không thẳng'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Đoạn thẳng có hai đầu. Đường thẳng thì không dừng lại.'],
      solution:
        'Đoạn thẳng dừng lại ở hai điểm. Đường thẳng kéo dài về hai phía. Đường cong uốn cong, không thẳng.',
    },
    {
      type: 'choice',
      prompt: 'Nối điểm P với điểm Q bằng thước. Em được gì?',
      options: ['Đoạn thẳng PQ', 'Đường cong PQ', 'Điểm PQ'],
      answer: 0,
      hints: ['Nối hai điểm bằng thước thì đường vẽ ra thẳng và có hai đầu.'],
      solution: 'Dùng thước nối hai điểm P và Q, em được đoạn thẳng PQ.',
    },
    {
      type: 'choice',
      prompt: 'Vật nào có dạng đường cong?',
      options: ['Cầu vồng', 'Mép thước kẻ', 'Cạnh bàn học'],
      answer: 0,
      hints: ['Vật nào uốn cong, không thẳng?'],
      solution: 'Cầu vồng uốn cong nên có dạng đường cong. Mép thước và cạnh bàn đều thẳng.',
    },
    {
      type: 'choice',
      prompt:
        'Đặt vạch 0 của thước trùng với điểm C. Điểm D trùng với vạch 9. Đoạn thẳng CD dài bao nhiêu?',
      options: ['8 cm', '9 cm', '10 cm'],
      answer: 1,
      hints: ['Vạch 0 đã ở đầu đoạn thẳng. Em đọc số ở đầu kia.'],
      solution: 'Đầu D trùng với vạch 9, nên đoạn thẳng CD dài 9 cm.',
    },
    {
      type: 'choice',
      prompt:
        'Mép thước đi qua hai điểm H và K. Điểm L nằm cách xa mép thước. Ba điểm H, K, L có thẳng hàng không?',
      options: ['Có', 'Không'],
      answer: 1,
      hints: ['Cả ba điểm có cùng nằm trên mép thước không?'],
      solution: 'Điểm L không nằm trên đường thẳng đi qua H và K, nên ba điểm không thẳng hàng.',
    },
    {
      type: 'choice',
      prompt: 'Ba bạn đứng trên một đường thẳng. Câu nào đúng?',
      options: [
        'Ba bạn đứng thẳng hàng',
        'Ba bạn đứng thành vòng tròn',
        'Ba bạn đứng trên đường cong',
      ],
      answer: 0,
      hints: ['Cùng nằm trên một đường thẳng thì gọi là gì?'],
      solution: 'Ba bạn cùng ở trên một đường thẳng, nên ba bạn đứng thẳng hàng.',
    },
    {
      type: 'order',
      prompt: 'Xếp các đoạn thẳng từ ngắn nhất đến dài nhất.',
      items: ['Đoạn thẳng AB dài 8 cm', 'Đoạn thẳng GH dài 3 cm', 'Đoạn thẳng PQ dài 11 cm'],
      answer: [1, 0, 2],
      hints: ['So sánh các số: 8, 3 và 11.'],
      solution: '3 cm < 8 cm < 11 cm: đoạn GH, đoạn AB, đoạn PQ.',
    },
  ],
  takeaways: [
    'Điểm được gọi tên bằng chữ cái in hoa. Nối hai điểm bằng thước được một đoạn thẳng.',
    'Kéo dài đoạn thẳng về hai phía được đường thẳng. Đường uốn cong là đường cong.',
    'Ba điểm cùng nằm trên một đường thẳng là ba điểm thẳng hàng.',
  ],
};
