/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhận biết góc, đỉnh và cạnh của góc; nhận biết góc vuông và góc không vuông; dùng ê ke để kiểm tra góc vuông.',
  intro:
    'Hai kim đồng hồ lúc 3 giờ, góc quyển vở, góc bảng lớp. Những góc này có giống nhau không? Em cùng dùng ê ke để kiểm tra nhé!',
  objectives: [
    'Nhận biết góc, đỉnh và hai cạnh của góc.',
    'Nhận biết góc vuông và góc không vuông.',
    'Dùng ê ke để kiểm tra góc vuông.',
  ],
  sections: [
    {
      heading: 'Góc',
      blocks: [
        { type: 'p', text: 'Hai đoạn thẳng OA và OB cùng đi ra từ điểm O tạo thành một góc.' },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đỉnh và cạnh',
          text: 'Điểm O là đỉnh của góc. OA và OB là hai cạnh của góc.',
        },
        { type: 'callout', tone: 'note', title: 'Cách đọc', text: 'Góc đỉnh O; cạnh OA, OB.' },
      ],
    },
    {
      heading: 'Góc vuông, góc không vuông',
      blocks: [
        {
          type: 'p',
          text: 'Góc của quyển vở, góc của bảng lớp là góc vuông. Có những góc hẹp hơn hoặc rộng hơn góc vuông. Đó là góc không vuông.',
        },
        {
          type: 'table',
          head: ['So với góc vuông của ê ke', 'Em gọi là'],
          rows: [
            ['Vừa khít', 'Góc vuông'],
            ['Hẹp hơn', 'Góc không vuông'],
            ['Rộng hơn', 'Góc không vuông'],
          ],
        },
      ],
    },
    {
      heading: 'Dùng ê ke để kiểm tra',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt góc vuông của ê ke trùng vào đỉnh của góc.',
            'Đặt một cạnh ê ke nằm trên một cạnh của góc.',
            'Nhìn cạnh còn lại của góc.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Cạnh còn lại trùng với cạnh kia của ê ke: đó là góc vuông. Không trùng: đó là góc không vuông.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Góc vuông vẫn là góc vuông khi em xoay nó. Vì vậy em hãy kiểm tra bằng ê ke, đừng chỉ nhìn bằng mắt.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ê ke ảo',
    instruction:
      'Kéo nút tròn ở góc ê ke, hoặc chạm vào nút rồi bấm phím mũi tên, để đặt ê ke vào đỉnh của góc. Nhìn cạnh còn lại rồi chọn "Góc vuông" hay "Góc không vuông". Kiểm tra đủ 6 góc. Đố em: trả lời 8 câu hỏi.',
  },
  examples: [
    {
      problem: 'Hai đoạn thẳng KD và KE cùng đi ra từ điểm K. Em đọc góc này thế nào?',
      steps: ['Hai cạnh gặp nhau tại K, nên K là đỉnh.', 'Hai cạnh của góc là KD và KE.'],
      answer: 'Góc đỉnh K; cạnh KD, KE.',
    },
    {
      problem:
        'Em đặt góc vuông của ê ke vào đỉnh G, một cạnh ê ke nằm trên cạnh GH. Cạnh GI nằm bên trong ê ke. Góc đỉnh G là góc gì?',
      steps: [
        'Cạnh GI không trùng với cạnh kia của ê ke.',
        'Góc đỉnh G hẹp hơn góc vuông của ê ke.',
      ],
      answer: 'Đó là góc không vuông.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Góc đỉnh M; cạnh MN, MP. Điểm nào là đỉnh của góc?',
      options: ['M', 'N', 'P'],
      answer: 0,
      hints: ['Đỉnh là nơi hai cạnh gặp nhau.'],
      solution: 'Hai cạnh MN và MP gặp nhau tại M, nên đỉnh là M.',
    },
    {
      type: 'choice',
      prompt: 'Góc nào có đỉnh Q và hai cạnh QR, QS?',
      options: ['Góc đỉnh Q; cạnh QR, QS', 'Góc đỉnh R; cạnh RQ, RS', 'Góc đỉnh S; cạnh SQ, SR'],
      answer: 0,
      hints: ['Tên góc nói đỉnh trước, rồi đến hai cạnh.'],
      solution: 'Đỉnh là Q, hai cạnh là QR và QS, nên em đọc: góc đỉnh Q; cạnh QR, QS.',
    },
    {
      type: 'choice',
      prompt: 'Em dùng dụng cụ nào để kiểm tra góc vuông?',
      options: ['Ê ke', 'Compa', 'Đồng hồ'],
      answer: 0,
      hints: ['Dụng cụ này có sẵn một góc vuông.'],
      solution: 'Ê ke có một góc vuông, em đặt nó vào góc cần kiểm tra.',
    },
    {
      type: 'order',
      prompt: 'Xếp các bước kiểm tra góc vuông bằng ê ke theo đúng thứ tự.',
      items: [
        'Nhìn cạnh còn lại của góc',
        'Đặt góc vuông của ê ke trùng vào đỉnh của góc',
        'Đặt một cạnh ê ke nằm trên một cạnh của góc',
      ],
      answer: [1, 2, 0],
      hints: ['Đầu tiên em đặt ê ke vào đỉnh.'],
      solution:
        'Đặt góc vuông của ê ke vào đỉnh, đặt một cạnh ê ke nằm trên một cạnh của góc, rồi nhìn cạnh còn lại.',
    },
    {
      type: 'choice',
      prompt: 'Em đặt ê ke vào đỉnh góc. Cạnh còn lại của góc nằm bên ngoài ê ke. Đó là góc gì?',
      options: ['Góc không vuông', 'Góc vuông'],
      answer: 0,
      hints: ['Góc vuông thì cạnh còn lại trùng với cạnh ê ke.'],
      solution:
        'Cạnh còn lại không trùng cạnh ê ke, góc này rộng hơn góc vuông. Đó là góc không vuông.',
    },
    {
      type: 'number',
      prompt: 'Tờ giấy hình chữ nhật có mấy góc vuông?',
      answer: 4,
      hints: ['Em lấy một tờ giấy và đặt ê ke vào từng góc.'],
      solution: 'Tờ giấy hình chữ nhật có 4 góc, cả 4 góc đều là góc vuông.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hình với số góc vuông của nó.',
      left: [
        'Hình A: 4 cạnh, các góc đều bằng góc của tờ giấy',
        'Hình B: 3 cạnh, có một góc vừa khít ê ke',
        'Hình C: 3 cạnh, không góc nào vừa khít ê ke',
      ],
      right: ['1 góc vuông', 'Không có góc vuông', '4 góc vuông'],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 1],
      ],
      hints: ['Góc của tờ giấy là góc vuông.'],
      solution: 'Hình A có 4 góc vuông. Hình B có 1 góc vuông. Hình C không có góc vuông.',
    },
    {
      type: 'choice',
      prompt:
        'Hình A có 1 góc vuông, hình B có 4, hình C có 3, hình D không có. Hình nào có nhiều góc vuông nhất?',
      options: ['Hình B', 'Hình A', 'Hình C', 'Hình D'],
      answer: 0,
      hints: ['So sánh các số 1, 4, 3 và 0.'],
      solution: '4 là số lớn nhất, nên hình B có nhiều góc vuông nhất.',
    },
    {
      type: 'choice',
      prompt: 'Lúc 3 giờ, kim dài chỉ số 12, kim ngắn chỉ số 3. Hai kim tạo thành góc gì?',
      options: ['Góc vuông', 'Góc không vuông'],
      answer: 0,
      hints: ['Hãy đặt ê ke lên hai kim đồng hồ ở nhà em.'],
      solution: 'Từ số 12 đến số 3 là một phần tư vòng tròn, hai kim tạo thành góc vuông.',
    },
  ],
  takeaways: [
    'Góc có một đỉnh và hai cạnh: góc đỉnh O; cạnh OA, OB.',
    'Dùng ê ke để biết góc vuông hay góc không vuông.',
  ],
};
