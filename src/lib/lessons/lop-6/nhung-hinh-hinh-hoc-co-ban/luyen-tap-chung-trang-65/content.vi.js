/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về góc và số đo góc: gọi tên và đếm góc, điểm nằm trong góc, đo góc bằng thước đo góc, góc giữa hai kim đồng hồ, góc nhọn, vuông, tù, bẹt.',
  intro:
    'Bài luyện tập này ôn lại hai bài vừa học: Góc (Bài 36) và Số đo góc (Bài 37). Em sẽ gọi tên, đếm các góc chung đỉnh, xác định điểm nằm trong góc, đọc số đo góc trên thước, tính góc giữa hai kim đồng hồ và phân loại góc theo số đo.',
  objectives: [
    'Gọi đúng tên góc, đếm số góc tạo bởi nhiều tia chung gốc; nhận biết góc bẹt và điểm nằm trong góc.',
    'Đọc đúng số đo góc trên thước đo góc; so sánh hai góc theo số đo.',
    'Phân loại góc nhọn, góc vuông, góc tù, góc bẹt; tính góc giữa hai kim đồng hồ lúc đúng giờ.',
  ],
  sections: [
    {
      heading: 'Nhắc lại kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Góc',
              'Hình gồm hai tia chung gốc. Góc $xOy$: đỉnh $O$, hai cạnh $Ox$, $Oy$; kí hiệu $\\widehat{xOy}$ hoặc $\\angle xOy$, chữ chỉ đỉnh ở giữa.',
            ],
            ['Góc bẹt', 'Góc có hai cạnh là hai tia đối nhau; số đo bằng $180^\\circ$.'],
            [
              'Điểm trong của góc',
              'Điểm thuộc phần "kẹp giữa" hai cạnh của góc không bẹt. Đỉnh và các điểm trên cạnh không phải điểm trong.',
            ],
            [
              'Đếm góc',
              'Từ $n$ tia chung gốc phân biệt có $n \\cdot (n - 1) : 2$ góc (mỗi cặp tia cho một góc).',
            ],
            [
              'Đo góc',
              'Tâm thước trùng đỉnh, một cạnh đi qua vạch $0$; số ở vạch cạnh kia đi qua (cùng hàng số) là số đo góc.',
            ],
            [
              'Phân loại',
              'Nhọn: $0^\\circ < \\alpha < 90^\\circ$; vuông: $90^\\circ$; tù: $90^\\circ < \\alpha < 180^\\circ$; bẹt: $180^\\circ$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kim đồng hồ',
          text: 'Mỗi khoảng giữa hai số liền nhau trên mặt đồng hồ ứng với $360^\\circ : 12 = 30^\\circ$. Lúc $h$ giờ đúng, đếm số khoảng ít nhất giữa số $h$ và số $12$ rồi nhân với $30^\\circ$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện về góc',
    instruction:
      'Mỗi lượt có $10$ câu trộn từ Bài 36 và Bài 37; đáp án là một số tự nhiên (số góc hoặc số đo tính bằng độ, chỉ nhập số). Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra.',
  },
  examples: [
    {
      problem:
        'Vẽ ba tia chung gốc $Ox$, $Oy$, $Oz$, đo được $\\widehat{xOy} = 50^\\circ$, $\\widehat{yOz} = 70^\\circ$, $\\widehat{xOz} = 120^\\circ$. a) Kể tên các góc có đỉnh $O$. b) Mỗi góc là góc gì? c) Sắp xếp các góc theo thứ tự tăng dần.',
      steps: [
        'a) Ba tia cho ba cặp tia nên có ba góc: $xOy$, $yOz$, $xOz$.',
        'b) $50^\\circ$ và $70^\\circ$ đều nhỏ hơn $90^\\circ$ nên $\\widehat{xOy}$, $\\widehat{yOz}$ là góc nhọn; $90^\\circ < 120^\\circ < 180^\\circ$ nên $\\widehat{xOz}$ là góc tù.',
        'c) $50^\\circ < 70^\\circ < 120^\\circ$ nên $\\widehat{xOy} < \\widehat{yOz} < \\widehat{xOz}$.',
      ],
      answer:
        'Ba góc $xOy$, $yOz$ (nhọn) và $xOz$ (tù); $\\widehat{xOy} < \\widehat{yOz} < \\widehat{xOz}$.',
    },
    {
      problem:
        'Tính góc tạo bởi kim giờ và kim phút lúc $1$ giờ, $7$ giờ và $9$ giờ. Phân loại mỗi góc.',
      steps: [
        'Lúc đúng giờ, kim phút chỉ số $12$; mỗi khoảng giờ ứng với $30^\\circ$.',
        'Lúc $1$ giờ: $1$ khoảng, góc $30^\\circ$ (nhọn).',
        'Lúc $7$ giờ: theo chiều ngắn hơn, từ số $7$ đến số $12$ có $5$ khoảng, góc $5 \\cdot 30^\\circ = 150^\\circ$ (tù).',
        'Lúc $9$ giờ: từ số $9$ đến số $12$ có $3$ khoảng, góc $90^\\circ$ (vuông).',
      ],
      answer: '$30^\\circ$ (nhọn), $150^\\circ$ (tù), $90^\\circ$ (vuông).',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Vẽ năm tia chung gốc $O$ phân biệt. Có bao nhiêu góc có đỉnh $O$ và hai cạnh là hai trong năm tia đó?',
      answer: 10,
      hints: [
        'Mỗi góc ứng với một cặp tia.',
        'Mỗi tia ghép với $4$ tia còn lại, mỗi góc bị đếm hai lần.',
      ],
      solution: 'Có $5 \\cdot 4 : 2 = 10$ góc.',
    },
    {
      type: 'choice',
      prompt:
        'Điểm $O$ nằm trên đường thẳng $xy$; vẽ tia $Oz$ không nằm trên $xy$. Trong ba góc $xOy$, $xOz$, $zOy$, góc nào là góc bẹt?',
      options: ['$\\widehat{xOy}$', '$\\widehat{xOz}$', '$\\widehat{zOy}$', 'Không có góc nào'],
      answer: 0,
      hints: ['Góc bẹt có hai cạnh là hai tia đối nhau.'],
      solution:
        '$O$ nằm trên $xy$ nên $Ox$, $Oy$ là hai tia đối nhau: $\\widehat{xOy}$ là góc bẹt. Tia $Oz$ không nằm trên $xy$ nên không đối với $Ox$ hay $Oy$.',
    },
    {
      type: 'multi',
      prompt:
        'Cho góc $xOy$ không bẹt; $A$ thuộc tia $Ox$, $B$ thuộc tia $Oy$ ($A$, $B$ khác $O$); $M$ nằm giữa $A$ và $B$; $N$ thuộc tia $OM$, $N$ khác $O$; $P$ thuộc tia đối của tia $Ox$, $P$ khác $O$. Chọn tất cả các điểm nằm trong góc $xOy$.',
      options: ['$A$', '$M$', '$N$', '$P$', '$O$'],
      answers: [1, 2],
      hints: [
        'Điểm nằm giữa hai điểm trên hai cạnh thì nằm trong góc.',
        'Tia đối của $Ox$ nằm về phía nào so với góc $xOy$?',
      ],
      solution:
        '$M$ nằm giữa $A$, $B$ nên nằm trong góc; $N$ thuộc tia $OM$ (khác $O$) nên cũng nằm trong góc. $A$ nằm trên cạnh, $O$ là đỉnh, $P$ nằm trên tia đối của $Ox$ (ngoài góc).',
    },
    {
      type: 'number',
      prompt:
        'Đặt thước đo góc có tâm trùng đỉnh $O$. Cạnh $Ox$ đi qua vạch $20$, cạnh $Oy$ đi qua vạch $95$ của cùng một hàng số. Tính $\\widehat{xOy}$ (độ).',
      answer: 75,
      unit: '°',
      hints: ['Cạnh $Ox$ không ở vạch $0$, nên lấy hiệu hai số đọc được.'],
      solution: '$\\widehat{xOy} = 95^\\circ - 20^\\circ = 75^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Lúc $8$ giờ đúng, kim giờ và kim phút tạo thành góc bao nhiêu độ?',
      answer: 120,
      unit: '°',
      hints: ['Đếm số khoảng ít nhất giữa số $8$ và số $12$.'],
      solution:
        'Từ số $8$ đến số $12$ có $4$ khoảng (theo chiều ngắn hơn), nên góc là $4 \\cdot 30^\\circ = 120^\\circ$, là góc tù.',
    },
    {
      type: 'number',
      prompt: 'Lúc $11$ giờ đúng, kim giờ và kim phút tạo thành góc bao nhiêu độ?',
      answer: 30,
      unit: '°',
      hints: ['Số $11$ và số $12$ nằm liền nhau.'],
      solution: 'Từ số $11$ đến số $12$ có $1$ khoảng: góc $30^\\circ$, là góc nhọn.',
    },
    {
      type: 'number',
      prompt:
        'Trong các thời điểm đúng giờ từ $1$ giờ đến $12$ giờ, có bao nhiêu thời điểm mà kim giờ và kim phút tạo thành góc vuông?',
      answer: 2,
      hints: ['Góc vuông ứng với $3$ khoảng giờ giữa số chỉ giờ và số $12$.'],
      solution:
        'Cần $3$ khoảng $30^\\circ$ giữa kim giờ và số $12$: kim giờ chỉ số $3$ hoặc số $9$. Có $2$ thời điểm: $3$ giờ và $9$ giờ.',
    },
    {
      type: 'choice',
      prompt: 'Góc $mIn$ có số đo $100^\\circ$. Góc $mIn$ là',
      options: ['góc nhọn', 'góc vuông', 'góc tù', 'góc bẹt'],
      answer: 2,
      hints: ['So sánh $100^\\circ$ với $90^\\circ$ và $180^\\circ$.'],
      solution: '$90^\\circ < 100^\\circ < 180^\\circ$ nên góc $mIn$ là góc tù.',
    },
    {
      type: 'choice',
      prompt:
        'Cho một góc nhọn $\\widehat{A}$ và một góc tù $\\widehat{B}$. Khẳng định nào luôn đúng?',
      options: [
        '$\\widehat{A} > \\widehat{B}$',
        '$\\widehat{A} < \\widehat{B}$',
        '$\\widehat{A} = \\widehat{B}$',
        'Chưa so sánh được',
      ],
      answer: 1,
      hints: ['Góc nhọn nhỏ hơn $90^\\circ$, góc tù lớn hơn $90^\\circ$.'],
      solution:
        '$\\widehat{A} < 90^\\circ < \\widehat{B}$, nên luôn có $\\widehat{A} < \\widehat{B}$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các thời điểm theo góc giữa hai kim đồng hồ, từ nhỏ đến lớn.',
      items: ['$5$ giờ', '$2$ giờ', '$6$ giờ', '$3$ giờ'],
      answer: [1, 3, 0, 2],
      hints: ['Tính góc ở từng thời điểm: mỗi khoảng giờ là $30^\\circ$.'],
      solution:
        '$2$ giờ: $60^\\circ$; $3$ giờ: $90^\\circ$; $5$ giờ: $150^\\circ$; $6$ giờ: $180^\\circ$. Thứ tự: $2$ giờ, $3$ giờ, $5$ giờ, $6$ giờ.',
    },
    {
      type: 'text',
      prompt: 'Góc có hai cạnh là hai tia đối nhau gọi là góc gì?',
      accept: ['góc bẹt', 'bẹt'],
      hints: ['Số đo của góc này là $180^\\circ$.'],
      solution: 'Đó là góc bẹt, có số đo $180^\\circ$.',
    },
  ],
  takeaways: [
    'Từ $n$ tia chung gốc phân biệt có $n \\cdot (n - 1) : 2$ góc.',
    'Đo góc: đọc trên hàng số có vạch $0$ ở một cạnh; nếu cạnh đó không ở vạch $0$, lấy hiệu hai số đọc được.',
    'Lúc đúng giờ, góc giữa hai kim bằng số khoảng giờ (ít nhất) giữa kim giờ và số $12$ nhân $30^\\circ$.',
  ],
};
