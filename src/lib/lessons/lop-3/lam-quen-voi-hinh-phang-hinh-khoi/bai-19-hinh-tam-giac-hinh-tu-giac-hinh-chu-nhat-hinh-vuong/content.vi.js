/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhận biết đỉnh, cạnh và góc của hình tam giác, hình tứ giác; đặc điểm về góc và cạnh của hình chữ nhật, hình vuông.',
  intro:
    'Quyển vở, ô cửa sổ, lá cờ đuôi nheo có dạng những hình gì? Các hình đó khác nhau ở đâu? Em cùng kéo các đỉnh để biết nhé!',
  objectives: [
    'Nêu tên đỉnh, cạnh và góc của hình tam giác, hình tứ giác.',
    'Nhận biết hình chữ nhật: 4 góc vuông, 2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau.',
    'Nhận biết hình vuông: 4 góc vuông, 4 cạnh dài bằng nhau.',
  ],
  sections: [
    {
      heading: 'Hình tam giác, hình tứ giác',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình tam giác ABC',
          text: 'Có 3 đỉnh A, B, C. Có 3 cạnh AB, BC, CA. Có 3 góc.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình tứ giác MNPQ',
          text: 'Có 4 đỉnh M, N, P, Q. Có 4 cạnh MN, NP, PQ, QM. Có 4 góc.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách đọc góc',
          text: 'Góc đỉnh A; cạnh AB, AC. Em đọc như ở bài góc trước.',
        },
      ],
    },
    {
      heading: 'Hình chữ nhật',
      blocks: [
        { type: 'p', text: 'Hình chữ nhật ABCD có 4 góc vuông: góc đỉnh A, B, C, D.' },
        {
          type: 'p',
          text: 'AB và CD là 2 cạnh dài, bằng nhau. AD và BC là 2 cạnh ngắn, bằng nhau.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hình chữ nhật có 4 góc vuông, 2 cạnh dài bằng nhau và 2 cạnh ngắn bằng nhau.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chiều dài, chiều rộng',
          text: 'Độ dài cạnh dài là chiều dài. Độ dài cạnh ngắn là chiều rộng.',
        },
      ],
    },
    {
      heading: 'Hình vuông',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hình vuông có 4 góc vuông và 4 cạnh dài bằng nhau.',
        },
        {
          type: 'table',
          head: ['Hình', 'Số góc vuông', 'Các cạnh'],
          rows: [
            ['Hình chữ nhật', '4', '2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau'],
            ['Hình vuông', '4', '4 cạnh dài bằng nhau'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo đỉnh trên lưới',
    instruction:
      'Kéo các đỉnh, hoặc chạm vào một đỉnh rồi bấm phím mũi tên. Dấu xanh chỉ góc vuông, số đỏ là số ô của cạnh. Hãy xếp thành hình chữ nhật, rồi thành hình vuông. Đố em: trả lời 8 câu hỏi.',
  },
  examples: [
    {
      problem: 'Hình tam giác DEG có những đỉnh và cạnh nào?',
      steps: ['Hình có 3 đỉnh: D, E, G.', 'Nối từng cặp đỉnh được 3 cạnh.'],
      answer: 'Đỉnh D, E, G. Cạnh DE, EG, GD.',
    },
    {
      problem: 'Hình chữ nhật EGHI có EG = 9 cm, GH = 4 cm. Tính độ dài HI và IE.',
      steps: ['HI và EG là hai cạnh dài, bằng nhau.', 'IE và GH là hai cạnh ngắn, bằng nhau.'],
      answer: 'HI = 9 cm, IE = 4 cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đoạn thẳng nào không phải là cạnh của hình tứ giác MNPQ?',
      options: ['MP', 'MN', 'NP', 'QM'],
      answer: 0,
      hints: ['Cạnh nối hai đỉnh liền nhau: M với N, N với P, P với Q, Q với M.'],
      solution:
        'Hình có 4 cạnh MN, NP, PQ, QM. MP nối hai đỉnh không liền nhau, nên không phải là cạnh.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hình với đặc điểm của nó.',
      left: ['Hình tam giác', 'Hình chữ nhật', 'Hình vuông'],
      right: [
        '4 góc vuông, 4 cạnh dài bằng nhau',
        '3 đỉnh, 3 cạnh, 3 góc',
        '4 góc vuông, 2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau',
      ],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Em đếm số đỉnh trước, rồi nhìn đến các cạnh.'],
      solution:
        'Hình tam giác có 3 đỉnh, 3 cạnh, 3 góc. Hình chữ nhật có 4 góc vuông, 2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau. Hình vuông có 4 góc vuông, 4 cạnh dài bằng nhau.',
    },
    {
      type: 'multi',
      prompt: 'Những điều nào đúng với mọi hình vuông?',
      options: [
        'Có 4 góc vuông',
        'Có 4 cạnh dài bằng nhau',
        'Có 3 đỉnh',
        'Có 2 cạnh dài hơn 2 cạnh kia',
      ],
      answers: [0, 1],
      hints: ['Hình vuông có mấy đỉnh? Các cạnh của nó thế nào?'],
      solution: 'Hình vuông có 4 góc vuông và 4 cạnh dài bằng nhau.',
    },
    {
      type: 'number',
      prompt:
        'Nhà dế mèn và nhà xén tóc ở hai đỉnh A và D của hình chữ nhật ABCD. BC = 13 dm, CD = 20 dm. Hai nhà cách nhau mấy đề-xi-mét?',
      answer: 13,
      unit: 'dm',
      hints: ['AD và BC là hai cạnh của hình chữ nhật, cạnh nào bằng cạnh nào?'],
      solution: 'AD và BC là hai cạnh ngắn, bằng nhau. AD = BC = 13 dm.',
    },
    {
      type: 'number',
      prompt:
        'Vẫn hình chữ nhật ABCD đó, BC = 13 dm, CD = 20 dm. Nhà dế mèn ở A, nhà dế trũi ở B. Hai nhà cách nhau mấy đề-xi-mét?',
      answer: 20,
      unit: 'dm',
      hints: ['AB và CD là hai cạnh của hình chữ nhật, cạnh nào bằng cạnh nào?'],
      solution: 'AB và CD là hai cạnh dài, bằng nhau. AB = CD = 20 dm.',
    },
    {
      type: 'choice',
      prompt:
        'Đường thẳng từ A đến B bị hỏng đoạn CD. Người ta làm đường tránh CMND, CMND là hình chữ nhật có MN = 2 km, CM = 1 km. Đi đường tránh dài hơn đi đường thẳng bao nhiêu ki-lô-mét?',
      options: ['2 km', '1 km', '3 km'],
      answer: 0,
      hints: ['CD dài bằng MN. Vậy đường tránh dài thêm hai đoạn nào?', 'DN dài bằng CM.'],
      solution:
        'CD = MN = 2 km. Đường tránh đi thêm hai đoạn CM và DN, mỗi đoạn 1 km. Dài hơn 1 + 1 = 2 (km).',
    },
    {
      type: 'number',
      prompt:
        'Tờ giấy hình chữ nhật có một cạnh 5 ô và cạnh kia 8 ô. Rô-bốt cắt bớt để được hình vuông cạnh 5 ô. Rô-bốt cắt đi phần rộng mấy ô?',
      answer: 3,
      hints: ['Hình vuông có các cạnh dài bằng nhau. Cạnh 8 ô phải còn lại mấy ô?'],
      solution: 'Cạnh dài chỉ còn 5 ô. Phần cắt đi rộng 8 − 5 = 3 (ô).',
    },
    {
      type: 'choice',
      prompt:
        'Em có 10 que tính, xếp hết thành một hình chữ nhật có cạnh dài hơn cạnh ngắn. Em có mấy cách xếp?',
      options: ['2 cách', '1 cách', '3 cách', '4 cách'],
      answer: 0,
      hints: [
        'Một cạnh dài và một cạnh ngắn cộng lại là 10 : 2 = 5 que.',
        'Tách 5 thành hai số khác nhau.',
      ],
      solution: '10 : 2 = 5. Ta có 5 = 4 + 1 và 5 = 3 + 2. Vậy có 2 cách xếp.',
    },
  ],
  takeaways: [
    'Hình tam giác có 3 đỉnh, 3 cạnh, 3 góc. Hình tứ giác có 4 đỉnh, 4 cạnh, 4 góc.',
    'Hình chữ nhật có 4 góc vuông, 2 cạnh dài bằng nhau, 2 cạnh ngắn bằng nhau.',
    'Hình vuông có 4 góc vuông, 4 cạnh dài bằng nhau.',
  ],
};
