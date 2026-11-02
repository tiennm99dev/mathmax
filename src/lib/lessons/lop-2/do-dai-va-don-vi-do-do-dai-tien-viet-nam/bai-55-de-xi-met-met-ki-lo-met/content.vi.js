/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đề-xi-mét, mét và ki-lô-mét là các đơn vị đo độ dài: 1 dm = 10 cm, 1 m = 10 dm = 100 cm, 1 km = 1000 m; chọn đơn vị phù hợp và cộng, trừ số đo độ dài.',
  intro:
    'Cái bút chì đo bằng xăng-ti-mét thì vừa. Còn cái cửa lớp, con đường từ nhà đến chợ thì sao? Hôm nay em làm quen với ba đơn vị đo mới: đề-xi-mét, mét và ki-lô-mét.',
  objectives: [
    'Biết đề-xi-mét, mét, ki-lô-mét là đơn vị đo độ dài, viết tắt là dm, m, km.',
    'Biết 1 dm = 10 cm, 1 m = 10 dm = 100 cm, 1 km = 1000 m.',
    'Đổi đơn vị đo độ dài đơn giản.',
    'Chọn đơn vị phù hợp và cộng, trừ số đo độ dài.',
  ],
  sections: [
    {
      heading: 'Đề-xi-mét',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đề-xi-mét',
          text: 'Đề-xi-mét là một đơn vị đo độ dài. Đề-xi-mét viết tắt là dm.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 dm = 10 cm. 10 cm = 1 dm.',
        },
        {
          type: 'p',
          text: 'Trên thước kẻ, từ vạch 0 đến vạch 10 dài đúng 1 dm. Một gang tay của em dài khoảng 1 dm.',
        },
      ],
    },
    {
      heading: 'Mét',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mét',
          text: 'Mét là một đơn vị đo độ dài. Mét viết tắt là m.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 m = 10 dm. 1 m = 100 cm.',
        },
        {
          type: 'p',
          text: 'Người ta đo cái bàn, cái cửa, căn phòng bằng mét. Cái cửa lớp cao khoảng 2 m.',
        },
      ],
    },
    {
      heading: 'Ki-lô-mét',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ki-lô-mét',
          text: 'Ki-lô-mét là một đơn vị đo độ dài. Ki-lô-mét viết tắt là km.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 km = 1000 m.',
        },
        {
          type: 'p',
          text: 'Người ta đo quãng đường dài bằng ki-lô-mét, như đường từ thành phố này đến thành phố khác.',
        },
      ],
    },
    {
      heading: 'Đổi đơn vị và tính với số đo',
      blocks: [
        {
          type: 'table',
          head: ['Số đo', 'Đổi được'],
          rows: [
            ['1 dm', '10 cm'],
            ['3 dm', '30 cm'],
            ['1 m', '10 dm'],
            ['2 m', '20 dm'],
            ['2 m', '200 cm'],
            ['1 km', '1000 m'],
          ],
        },
        {
          type: 'p',
          text: 'Em cộng, trừ số đo như cộng, trừ các số, rồi viết đơn vị sau kết quả: 6 dm + 3 dm = 9 dm. 8 m − 5 m = 3 m.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thanh đo và con đường',
    instruction:
      '"Thanh đo": kéo thanh trượt, thanh đo dài ra từng 1 dm. Em xem độ dài đó bằng bao nhiêu xăng-ti-mét, bao nhiêu mét. "Quãng đường": kéo để bạn nhỏ đi, mỗi bước 100 m, đến khi đủ 1 km.',
  },
  examples: [
    {
      problem: '2 m bằng bao nhiêu đề-xi-mét?',
      steps: ['1 m = 10 dm.', '2 m là 2 lần 10 dm: 10 + 10 = 20.'],
      answer: '2 m = 20 dm.',
    },
    {
      problem:
        'Nam đá quả cầu bay xa 4 m, Việt đá bay xa 5 m, Rô-bốt đá bay xa 7 m. Ai đá xa nhất? Việt đá xa hơn Nam bao nhiêu mét?',
      steps: [
        'So sánh 4 m, 5 m và 7 m: 7 m là lớn nhất, nên Rô-bốt đá xa nhất.',
        'Việt đá xa hơn Nam: 5 − 4 = 1 (m).',
      ],
      answer: 'Rô-bốt đá xa nhất. Việt đá xa hơn Nam 1 m.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối đơn vị với cách viết tắt.',
      left: ['đề-xi-mét', 'mét', 'ki-lô-mét'],
      right: ['dm', 'm', 'km', 'cm'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Chữ cái đầu của đơn vị sẽ giúp em: đề-xi-mét có chữ d.'],
      solution: 'Đề-xi-mét viết tắt là dm, mét là m, ki-lô-mét là km.',
    },
    {
      type: 'match',
      prompt: 'Nối hai số đo bằng nhau.',
      left: ['1 dm', '1 m', '1 km', '5 dm'],
      right: ['10 cm', '100 cm', '1000 m', '50 cm'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Nhớ lại: 1 dm = 10 cm, 1 m = 100 cm, 1 km = 1000 m.'],
      solution: '1 dm = 10 cm; 1 m = 100 cm; 1 km = 1000 m; 5 dm = 50 cm.',
    },
    {
      type: 'choice',
      prompt: '3 m = ? dm',
      options: ['3 dm', '30 dm', '300 dm'],
      answer: 1,
      hints: ['1 m = 10 dm. Em đếm 10, 20, ... đủ 3 lần.'],
      solution: '1 m = 10 dm, nên 3 m = 30 dm.',
    },
    {
      type: 'choice',
      prompt: '40 cm = ? dm',
      options: ['4 dm', '40 dm', '400 dm'],
      answer: 0,
      hints: ['10 cm = 1 dm. 40 cm là mấy chục xăng-ti-mét?'],
      solution: '10 cm = 1 dm, nên 40 cm = 4 dm.',
    },
    {
      type: 'choice',
      prompt: 'Cửa lớp học cao khoảng bao nhiêu?',
      options: ['2 cm', '2 dm', '2 m', '2 km'],
      answer: 2,
      hints: ['Cái cửa cao hơn người lớn một chút. Em nghĩ xem đơn vị nào hợp với cái cửa.'],
      solution: 'Cửa lớp học cao khoảng 2 m.',
    },
    {
      type: 'choice',
      prompt: 'Quãng đường từ thành phố này đến thành phố khác em đo bằng đơn vị nào?',
      options: ['cm', 'dm', 'km'],
      answer: 2,
      hints: ['Quãng đường rất dài thì chọn đơn vị lớn nhất.'],
      solution: 'Quãng đường dài giữa hai thành phố được đo bằng ki-lô-mét (km).',
    },
    {
      type: 'choice',
      prompt: 'Việt nói cái bàn học dài 2 m, Nam nói cái bàn dài 2 dm. Ai nói đúng?',
      options: ['Việt', 'Nam'],
      answer: 0,
      hints: ['2 dm chỉ dài bằng 2 gang tay. Cái bàn có ngắn như vậy không?'],
      solution: '2 dm = 20 cm, quá ngắn cho cái bàn học. Việt nói đúng.',
    },
    {
      type: 'choice',
      prompt: '7 dm + 2 dm = ?',
      options: ['9 dm', '5 dm', '9'],
      answer: 0,
      hints: ['Cộng 7 + 2, rồi nhớ viết đơn vị.'],
      solution: '7 + 2 = 9, nên 7 dm + 2 dm = 9 dm.',
    },
    {
      type: 'choice',
      prompt: '10 km − 4 km = ?',
      options: ['14 km', '6 m', '6 km'],
      answer: 2,
      hints: ['Trừ 10 − 4, rồi giữ nguyên đơn vị km.'],
      solution: '10 − 4 = 6, nên 10 km − 4 km = 6 km.',
    },
    {
      type: 'order',
      prompt: 'Xếp các độ dài từ ngắn nhất đến dài nhất.',
      items: ['1 m', '1 km', '1 dm', '1 cm'],
      answer: [3, 2, 0, 1],
      hints: ['1 dm = 10 cm, 1 m = 10 dm, 1 km = 1000 m.'],
      solution: '1 cm < 1 dm < 1 m < 1 km.',
    },
  ],
  takeaways: [
    'Đề-xi-mét viết tắt là dm, mét là m, ki-lô-mét là km.',
    '1 dm = 10 cm. 1 m = 10 dm = 100 cm. 1 km = 1000 m.',
    'Cộng, trừ số đo độ dài như cộng, trừ các số, rồi viết đơn vị sau kết quả.',
  ],
};
