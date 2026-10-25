/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Số đo góc: đo góc bằng thước đo góc, đơn vị độ, so sánh hai góc theo số đo và nhận biết góc nhọn, góc vuông, góc tù, góc bẹt.',
  intro:
    'Hai chiếc quạt giấy cùng mở, chiếc nào mở "rộng" hơn? Nhìn bằng mắt nhiều khi khó phân biệt. Để so sánh chính xác độ mở của hai góc, ta đo chúng bằng thước đo góc và so sánh hai số đo.',
  objectives: [
    'Đo được số đo của một góc bằng thước đo góc; viết đúng kí hiệu số đo góc.',
    'So sánh hai góc dựa vào số đo của chúng.',
    'Nhận biết góc nhọn, góc vuông, góc tù, góc bẹt.',
  ],
  sections: [
    {
      heading: 'Đo góc',
      blocks: [
        {
          type: 'p',
          text: 'Thước đo góc là một nửa hình tròn, được chia thành $180$ phần bằng nhau, ghi các số từ $0$ đến $180$ theo hai vòng ngược chiều nhau. Mỗi phần ứng với $1$ độ, viết là $1^\\circ$. Tâm của nửa hình tròn gọi là tâm của thước.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt thước sao cho tâm của thước trùng với đỉnh $O$ của góc $xOy$.',
            'Xoay thước để một cạnh, chẳng hạn $Ox$, đi qua vạch $0$ của thước.',
            'Cạnh $Oy$ đi qua vạch nào trên thang chia bắt đầu từ vạch $0$ ấy thì số ghi ở vạch đó là số đo của góc $xOy$.',
          ],
        },
        {
          type: 'p',
          text: 'Nếu cạnh $Oy$ đi qua vạch $60$ thì ta nói góc $xOy$ có số đo bằng $60$ độ và viết $\\widehat{xOy} = 60^\\circ$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Thước có hai hàng số. Phải đọc trên hàng số có vạch $0$ nằm ở cạnh $Ox$. Đọc nhầm hàng kia, em sẽ được $180^\\circ - 60^\\circ = 120^\\circ$ thay vì $60^\\circ$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhận xét',
          text: 'Mỗi góc có một số đo. Số đo của góc bẹt là $180^\\circ$. Số đo của mỗi góc không vượt quá $180^\\circ$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'So sánh hai góc',
          text: 'Hai góc bằng nhau nếu số đo của chúng bằng nhau. Góc nào có số đo lớn hơn thì góc đó lớn hơn. Chẳng hạn $\\widehat{xOy} = 60^\\circ$, $\\widehat{mIn} = 45^\\circ$ thì $\\widehat{xOy} > \\widehat{mIn}$ (hay $\\widehat{mIn} < \\widehat{xOy}$).',
        },
      ],
    },
    {
      heading: 'Các góc đặc biệt',
      blocks: [
        {
          type: 'table',
          caption: 'Phân loại góc theo số đo',
          head: ['Tên góc', 'Số đo'],
          rows: [
            ['Góc nhọn', 'lớn hơn $0^\\circ$ và nhỏ hơn $90^\\circ$'],
            ['Góc vuông', 'bằng $90^\\circ$'],
            ['Góc tù', 'lớn hơn $90^\\circ$ và nhỏ hơn $180^\\circ$'],
            ['Góc bẹt', 'bằng $180^\\circ$'],
          ],
        },
        {
          type: 'p',
          text: 'Trên hình vẽ, góc vuông được đánh dấu bằng một kí hiệu hình vuông nhỏ ở đỉnh. Có thể kiểm tra một góc có vuông hay không bằng ê ke.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Góc giữa hai kim đồng hồ',
          text: 'Mặt đồng hồ chia thành $12$ khoảng giờ bằng nhau, mỗi khoảng ứng với $360^\\circ : 12 = 30^\\circ$. Lúc $3$ giờ, hai kim cách nhau $3$ khoảng nên tạo góc $3 \\cdot 30^\\circ = 90^\\circ$ (góc vuông); lúc $6$ giờ, hai kim tạo góc bẹt.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thước đo góc ảo',
    instruction:
      'Tâm thước đã trùng với đỉnh $O$ và cạnh $Ox$ đi qua vạch $0$. Kéo cạnh $Oy$ (hoặc dùng phím mũi tên) và đọc số đo trên hàng số tô đỏ. Đổi cạnh $Ox$ sang bên trái để thấy phải đọc hàng số kia. Bấm "Góc mới" để tự đọc thước khi số đo bị ẩn.',
  },
  examples: [
    {
      problem:
        'Đặt thước đo góc lên góc $xOy$ sao cho tâm thước trùng $O$, cạnh $Ox$ đi qua vạch $0$ của hàng số trong. Cạnh $Oy$ đi qua vạch ghi $35$ ở hàng số trong và $145$ ở hàng số ngoài. Tính số đo góc $xOy$ và cho biết đó là góc gì.',
      steps: [
        'Vạch $0$ mà $Ox$ đi qua thuộc hàng số trong, nên đọc số đo trên hàng số trong.',
        'Cạnh $Oy$ đi qua vạch $35$ của hàng số trong: $\\widehat{xOy} = 35^\\circ$.',
        '$0^\\circ < 35^\\circ < 90^\\circ$ nên góc $xOy$ là góc nhọn.',
      ],
      answer: '$\\widehat{xOy} = 35^\\circ$, là góc nhọn.',
    },
    {
      problem:
        'Tìm số đo góc tạo bởi kim giờ và kim phút lúc $2$ giờ, $5$ giờ và $9$ giờ. Mỗi góc là góc gì?',
      steps: [
        'Hai số liền nhau trên mặt đồng hồ cách nhau $360^\\circ : 12 = 30^\\circ$; lúc đúng giờ, kim phút chỉ số $12$.',
        'Lúc $2$ giờ, hai kim cách nhau $2$ khoảng: $2 \\cdot 30^\\circ = 60^\\circ$, là góc nhọn.',
        'Lúc $5$ giờ: $5 \\cdot 30^\\circ = 150^\\circ$, là góc tù.',
        'Lúc $9$ giờ, kim giờ chỉ số $9$, cách số $12$ ba khoảng (đi theo chiều ngược lại): $3 \\cdot 30^\\circ = 90^\\circ$, là góc vuông.',
      ],
      answer: '$60^\\circ$ (góc nhọn), $150^\\circ$ (góc tù), $90^\\circ$ (góc vuông).',
    },
    {
      problem:
        'Cho $\\widehat{A} = 75^\\circ$, $\\widehat{B} = 105^\\circ$, $\\widehat{C} = 75^\\circ$. So sánh các góc và phân loại chúng.',
      steps: [
        '$\\widehat{A}$ và $\\widehat{C}$ cùng có số đo $75^\\circ$ nên $\\widehat{A} = \\widehat{C}$.',
        '$75^\\circ < 105^\\circ$ nên $\\widehat{A} < \\widehat{B}$.',
        '$\\widehat{A}$, $\\widehat{C}$ là góc nhọn; $90^\\circ < 105^\\circ < 180^\\circ$ nên $\\widehat{B}$ là góc tù.',
      ],
      answer:
        '$\\widehat{A} = \\widehat{C} < \\widehat{B}$; $\\widehat{A}$, $\\widehat{C}$ nhọn, $\\widehat{B}$ tù.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Tâm thước đo góc trùng đỉnh $O$, cạnh $Ox$ đi qua vạch $0$ của hàng số ngoài. Cạnh $Oy$ đi qua vạch ghi $130$ ở hàng số ngoài và $50$ ở hàng số trong. Tính $\\widehat{xOy}$ (độ).',
      answer: 130,
      unit: '°',
      hints: ['Đọc trên hàng số có vạch $0$ nằm ở cạnh $Ox$.'],
      solution:
        'Vạch $0$ ở cạnh $Ox$ thuộc hàng số ngoài, nên đọc hàng số ngoài: $\\widehat{xOy} = 130^\\circ$ (góc tù).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số đo với loại góc tương ứng.',
      left: [
        '$\\widehat{xOy} = 45^\\circ$',
        '$\\widehat{mIn} = 90^\\circ$',
        '$\\widehat{ABC} = 120^\\circ$',
        '$\\widehat{uOv} = 180^\\circ$',
      ],
      right: ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['So sánh từng số đo với $90^\\circ$ và $180^\\circ$.'],
      solution:
        '$45^\\circ < 90^\\circ$: nhọn; $90^\\circ$: vuông; $90^\\circ < 120^\\circ < 180^\\circ$: tù; $180^\\circ$: bẹt.',
    },
    {
      type: 'number',
      prompt: 'Lúc $4$ giờ đúng, kim giờ và kim phút tạo thành góc bao nhiêu độ?',
      answer: 120,
      unit: '°',
      hints: [
        'Hai số liền nhau trên mặt đồng hồ cách nhau $30^\\circ$.',
        'Từ số $12$ đến số $4$ có mấy khoảng?',
      ],
      solution:
        'Từ số $12$ đến số $4$ có $4$ khoảng, nên góc là $4 \\cdot 30^\\circ = 120^\\circ$.',
    },
    {
      type: 'choice',
      prompt: 'Lúc mấy giờ đúng thì kim giờ và kim phút tạo thành góc bẹt?',
      options: ['$3$ giờ', '$6$ giờ', '$9$ giờ', '$12$ giờ'],
      answer: 1,
      hints: ['Góc bẹt có số đo $180^\\circ$, tức là $6$ khoảng $30^\\circ$.'],
      solution:
        'Lúc $6$ giờ, kim giờ chỉ số $6$, kim phút chỉ số $12$: hai kim là hai tia đối nhau, góc bằng $6 \\cdot 30^\\circ = 180^\\circ$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        'Mỗi góc có một số đo.',
        'Có góc có số đo $200^\\circ$.',
        'Góc tù lớn hơn góc vuông.',
        'Hai góc nhọn luôn bằng nhau.',
        'Số đo của góc bẹt là $180^\\circ$.',
      ],
      answers: [0, 2, 4],
      hints: [
        'Số đo của một góc lớn nhất là bao nhiêu?',
        'Hai góc nhọn có thể là $30^\\circ$ và $80^\\circ$.',
      ],
      solution:
        'Đúng: mỗi góc có một số đo; góc tù (trên $90^\\circ$) lớn hơn góc vuông; góc bẹt bằng $180^\\circ$. Sai: số đo góc không vượt quá $180^\\circ$; hai góc nhọn như $30^\\circ$ và $80^\\circ$ không bằng nhau.',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các góc theo thứ tự từ nhỏ đến lớn: $\\widehat{A} = 95^\\circ$, $\\widehat{B} = 40^\\circ$, $\\widehat{C} = 180^\\circ$, $\\widehat{D} = 90^\\circ$.',
      items: ['$\\widehat{A}$', '$\\widehat{B}$', '$\\widehat{C}$', '$\\widehat{D}$'],
      answer: [1, 3, 0, 2],
      hints: ['Góc nào có số đo nhỏ hơn thì nhỏ hơn.'],
      solution:
        '$40^\\circ < 90^\\circ < 95^\\circ < 180^\\circ$, nên $\\widehat{B} < \\widehat{D} < \\widehat{A} < \\widehat{C}$.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Nam đặt cạnh $Ox$ ở vạch $0$ của hàng số trong nhưng lại đọc cạnh $Oy$ trên hàng số ngoài, được $110^\\circ$. Số đo đúng của góc $xOy$ là',
      options: ['$110^\\circ$', '$70^\\circ$', '$90^\\circ$', '$250^\\circ$'],
      answer: 1,
      hints: ['Ở cùng một vạch, số ở hai hàng có tổng bằng $180$.'],
      solution:
        'Ở mỗi vạch, hai số ghi trên hai hàng có tổng $180$. Nam đọc nhầm hàng được $110$, nên số đúng ở hàng trong là $180 - 110 = 70$: $\\widehat{xOy} = 70^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Lúc $10$ giờ đúng, góc tạo bởi kim giờ và kim phút có số đo bao nhiêu độ?',
      answer: 60,
      unit: '°',
      hints: ['Đếm số khoảng giờ ngắn nhất giữa số $10$ và số $12$.'],
      solution:
        'Từ số $10$ đến số $12$ (theo chiều kim đồng hồ) có $2$ khoảng, nên góc là $2 \\cdot 30^\\circ = 60^\\circ$, là góc nhọn.',
    },
  ],
  takeaways: [
    'Đo góc: tâm thước trùng đỉnh, một cạnh đi qua vạch $0$, đọc số ở vạch cạnh kia đi qua trên cùng hàng số.',
    'Mỗi góc có một số đo, không vượt quá $180^\\circ$; góc bẹt có số đo $180^\\circ$.',
    'Hai góc bằng nhau khi số đo bằng nhau; góc có số đo lớn hơn thì lớn hơn.',
    'Góc nhọn: dưới $90^\\circ$; góc vuông: $90^\\circ$; góc tù: lớn hơn $90^\\circ$ và nhỏ hơn $180^\\circ$; góc bẹt: $180^\\circ$.',
  ],
};
