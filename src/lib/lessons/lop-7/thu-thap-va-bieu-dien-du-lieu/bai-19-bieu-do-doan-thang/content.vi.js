/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Biểu đồ đoạn thẳng: cấu tạo, cách đọc giá trị tại mỗi thời điểm, nhận ra xu hướng tăng, giảm theo thời gian và các bước vẽ biểu đồ đoạn thẳng.',
  intro:
    'Bản tin thời tiết thường cho biết nhiệt độ trong ngày tăng dần từ sáng đến trưa rồi giảm dần về chiều. Để thấy ngay sự thay đổi đó, người ta nối các điểm biểu diễn nhiệt độ tại từng thời điểm bằng các đoạn thẳng. Đó là biểu đồ đoạn thẳng.',
  objectives: [
    'Đọc và mô tả dữ liệu trên biểu đồ đoạn thẳng.',
    'Nhận ra xu hướng tăng, giảm của số liệu theo thời gian; tìm thời điểm có giá trị lớn nhất, nhỏ nhất.',
    'Biểu diễn dữ liệu vào biểu đồ đoạn thẳng.',
  ],
  sections: [
    {
      heading: 'Đọc biểu đồ đoạn thẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biểu đồ đoạn thẳng',
          text: 'Biểu đồ đoạn thẳng gồm: trục nằm ngang biểu diễn các mốc thời gian; trục thẳng đứng biểu diễn đại lượng ta quan tâm; mỗi điểm biểu diễn giá trị của đại lượng tại một thời điểm; các điểm liên tiếp được nối với nhau bằng đoạn thẳng.',
        },
        {
          type: 'p',
          text: 'Biểu đồ đoạn thẳng dùng để biểu diễn sự thay đổi của một đại lượng theo thời gian.',
        },
        { type: 'widget', name: 'reading' },
        {
          type: 'table',
          caption: 'Dữ liệu đọc từ biểu đồ',
          head: ['Thời điểm', '7 giờ', '9 giờ', '11 giờ', '13 giờ', '15 giờ', '17 giờ'],
          rows: [['Nhiệt độ (°C)', '$24$', '$27$', '$31$', '$33$', '$32$', '$29$']],
        },
      ],
    },
    {
      heading: 'Xu hướng tăng, giảm theo thời gian',
      blocks: [
        {
          type: 'list',
          items: [
            'Đoạn thẳng đi lên (từ trái sang phải): đại lượng tăng.',
            'Đoạn thẳng đi xuống: đại lượng giảm.',
            'Đoạn thẳng nằm ngang: đại lượng không thay đổi.',
            'Đoạn thẳng càng dốc thì đại lượng thay đổi càng nhiều trong khoảng thời gian đó.',
          ],
        },
        {
          type: 'p',
          text: 'Trên biểu đồ nhiệt độ: từ $7$ giờ đến $13$ giờ nhiệt độ tăng liên tục, từ $13$ giờ đến $17$ giờ nhiệt độ giảm. Nhiệt độ cao nhất là $33^\\circ$C lúc $13$ giờ; tăng nhiều nhất từ $9$ giờ đến $11$ giờ (tăng $4^\\circ$C).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Vẽ biểu đồ đoạn thẳng',
          text: 'Bước 1: Vẽ trục ngang ghi các mốc thời gian, trục đứng ghi các giá trị của đại lượng (chọn khoảng chia phù hợp). Bước 2: Với mỗi mốc thời gian, xác định điểm biểu diễn giá trị tương ứng. Bước 3: Nối các điểm liên tiếp bằng các đoạn thẳng. Bước 4: Ghi tên biểu đồ, tên các trục và giá trị tại các điểm (nếu cần).',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý',
          text: 'Trục đứng phải chia đều. Nếu khoảng chia không đều, độ dốc của các đoạn thẳng sẽ làm sai lệch xu hướng thật của dữ liệu.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo điểm, đọc xu hướng',
    instruction:
      'Kéo mỗi điểm lên xuống (hoặc chọn điểm rồi dùng phím mũi tên, mỗi bước $10$ cây) để thay đổi số cây trồng được trong năm đó. Các ô bên dưới cho biết số cây tăng hay giảm giữa hai năm liên tiếp, và phần mô tả tự cập nhật xu hướng, năm cao nhất, thấp nhất. Chọn một nhiệm vụ để thử tạo xu hướng theo yêu cầu.',
  },
  examples: [
    {
      problem:
        'Dựa vào biểu đồ nhiệt độ ở trên, hãy cho biết: a) Nhiệt độ thấp nhất là bao nhiêu, vào lúc mấy giờ? b) Nhiệt độ lúc $17$ giờ thấp hơn lúc $13$ giờ bao nhiêu độ? c) Mô tả xu hướng thay đổi nhiệt độ trong ngày.',
      steps: [
        'a) Điểm thấp nhất trên biểu đồ ứng với $7$ giờ, nhiệt độ $24^\\circ$C.',
        'b) $33 - 29 = 4$, nên lúc $17$ giờ thấp hơn lúc $13$ giờ $4^\\circ$C.',
        'c) Các đoạn thẳng đi lên từ $7$ giờ đến $13$ giờ rồi đi xuống từ $13$ giờ đến $17$ giờ.',
      ],
      answer:
        'a) $24^\\circ$C lúc $7$ giờ; b) $4^\\circ$C; c) Nhiệt độ tăng từ sáng đến $13$ giờ rồi giảm dần về chiều.',
    },
    {
      problem:
        'Số máy tính một cửa hàng bán được trong bốn tháng đầu năm: tháng 1: $25$ chiếc; tháng 2: $30$ chiếc; tháng 3: $20$ chiếc; tháng 4: $35$ chiếc. Hãy nêu cách vẽ biểu đồ đoạn thẳng biểu diễn dữ liệu này và nhận xét.',
      steps: [
        'Bước 1: Trục ngang ghi tháng 1, tháng 2, tháng 3, tháng 4; trục đứng ghi số máy tính từ $0$ đến $40$, mỗi khoảng chia $5$ chiếc.',
        'Bước 2: Xác định bốn điểm ở độ cao $25$; $30$; $20$; $35$ ứng với bốn tháng.',
        'Bước 3: Nối các điểm liên tiếp bằng các đoạn thẳng. Bước 4: Ghi tên biểu đồ "Số máy tính bán được trong bốn tháng đầu năm".',
        'Nhận xét: số máy tăng ở tháng 2, giảm ở tháng 3 ($30 - 20 = 10$ chiếc) rồi tăng mạnh ở tháng 4 ($35 - 20 = 15$ chiếc). Tháng 4 bán được nhiều nhất.',
      ],
      answer:
        'Biểu đồ có bốn điểm nối liền; số máy bán được có lúc tăng, có lúc giảm, nhiều nhất ở tháng 4 ($35$ chiếc).',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Theo biểu đồ nhiệt độ ở trên, nhiệt độ cao nhất trong ngày là bao nhiêu độ C?',
      answer: 33,
      unit: '°C',
      hints: ['Tìm điểm cao nhất trên biểu đồ.'],
      solution: 'Điểm cao nhất ứng với $13$ giờ, nhiệt độ $33^\\circ$C.',
    },
    {
      type: 'number',
      prompt:
        'Theo biểu đồ nhiệt độ, nhiệt độ cao nhất hơn nhiệt độ thấp nhất trong ngày bao nhiêu độ C?',
      answer: 9,
      unit: '°C',
      hints: ['Nhiệt độ cao nhất là $33^\\circ$C. Tìm nhiệt độ thấp nhất.'],
      solution: 'Thấp nhất $24^\\circ$C (lúc $7$ giờ). Chênh lệch: $33 - 24 = 9$ ($^\\circ$C).',
    },
    {
      type: 'number',
      prompt: 'Theo biểu đồ nhiệt độ, từ $15$ giờ đến $17$ giờ nhiệt độ giảm bao nhiêu độ C?',
      answer: 3,
      unit: '°C',
      hints: ['Đọc nhiệt độ lúc $15$ giờ và lúc $17$ giờ.'],
      solution:
        'Lúc $15$ giờ là $32^\\circ$C, lúc $17$ giờ là $29^\\circ$C. Giảm $32 - 29 = 3$ ($^\\circ$C).',
    },
    {
      type: 'choice',
      prompt: 'Trên biểu đồ nhiệt độ, từ $7$ giờ đến $13$ giờ nhiệt độ thay đổi như thế nào?',
      options: ['Tăng liên tục', 'Giảm liên tục', 'Có lúc tăng, có lúc giảm', 'Không thay đổi'],
      answer: 0,
      hints: ['Xem các đoạn thẳng từ $7$ giờ đến $13$ giờ đi lên hay đi xuống.'],
      solution: '$24 < 27 < 31 < 33$: mọi đoạn thẳng đều đi lên, nên nhiệt độ tăng liên tục.',
    },
    {
      type: 'number',
      prompt:
        'Số học sinh của trường đạt giải học sinh giỏi cấp huyện qua các năm: 2020: $12$; 2021: $15$; 2022: $11$; 2023: $18$; 2024: $20$. Trên biểu đồ đoạn thẳng, đoạn thẳng nào đi xuống? Nhập năm cuối của đoạn đó.',
      answer: 2022,
      hints: ['Đoạn thẳng đi xuống khi số liệu năm sau nhỏ hơn năm trước.'],
      solution: 'Chỉ có $11 < 15$, nên đoạn từ 2021 đến 2022 đi xuống. Năm cần nhập: 2022.',
    },
    {
      type: 'number',
      prompt:
        'Với dữ liệu ở câu trên (2020: $12$; 2021: $15$; 2022: $11$; 2023: $18$; 2024: $20$), số học sinh đạt giải tăng nhiều nhất giữa hai năm liên tiếp là bao nhiêu học sinh?',
      answer: 7,
      unit: 'học sinh',
      hints: ['Tính mức thay đổi giữa từng cặp năm liên tiếp.', 'Các mức tăng: $3$; $7$; $2$.'],
      solution:
        '2020 → 2021: tăng $3$; 2021 → 2022: giảm $4$; 2022 → 2023: tăng $7$; 2023 → 2024: tăng $2$. Tăng nhiều nhất là $7$ học sinh (đoạn dốc nhất).',
    },
    {
      type: 'choice',
      prompt: 'Dữ liệu nào sau đây nên biểu diễn bằng biểu đồ đoạn thẳng?',
      options: [
        'Tỉ lệ các loại cây trong vườn trường',
        'Chiều cao của một cây đậu đo vào cuối mỗi tuần',
        'Tỉ lệ học sinh nam và nữ của lớp',
        'Tỉ lệ các phương tiện đến trường của học sinh',
      ],
      answer: 1,
      hints: ['Biểu đồ đoạn thẳng biểu diễn sự thay đổi theo thời gian.'],
      solution:
        'Chiều cao cây đậu thay đổi theo thời gian (từng tuần), nên dùng biểu đồ đoạn thẳng. Các dữ liệu còn lại là các phần của một toàn thể, hợp với biểu đồ hình quạt.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước vẽ biểu đồ đoạn thẳng theo đúng thứ tự.',
      items: [
        'Nối các điểm liên tiếp bằng các đoạn thẳng',
        'Vẽ trục ngang ghi thời gian và trục đứng ghi giá trị',
        'Ghi tên biểu đồ và tên các trục',
        'Xác định các điểm biểu diễn giá trị tại mỗi thời điểm',
      ],
      answer: [1, 3, 0, 2],
      hints: ['Phải có hai trục trước khi xác định được các điểm.'],
      solution:
        'Vẽ hai trục → xác định các điểm → nối các điểm liên tiếp bằng đoạn thẳng → ghi tên biểu đồ, tên các trục.',
    },
    {
      type: 'multi',
      prompt:
        'Số khách tham quan một bảo tàng (nghìn lượt) các tháng 1 đến 5 là: $8$; $10$; $10$; $14$; $9$. Chọn tất cả các nhận xét đúng.',
      options: [
        'Từ tháng 2 đến tháng 3, số khách không thay đổi.',
        'Tháng 4 có nhiều khách nhất.',
        'Số khách tăng liên tục từ tháng 1 đến tháng 5.',
        'Từ tháng 4 đến tháng 5, số khách giảm $5$ nghìn lượt.',
      ],
      answers: [0, 1, 3],
      hints: ['Tính mức thay đổi giữa từng cặp tháng liên tiếp.'],
      solution:
        'Các mức thay đổi: $+2$; $0$; $+4$; $-5$. Tháng 2 đến tháng 3 không đổi; tháng 4 nhiều nhất ($14$ nghìn lượt); tháng 4 đến tháng 5 giảm $14 - 9 = 5$ nghìn lượt. Số khách không tăng liên tục vì có lúc đứng yên và có lúc giảm.',
    },
  ],
  takeaways: [
    'Biểu đồ đoạn thẳng biểu diễn sự thay đổi của một đại lượng theo thời gian: trục ngang là thời gian, trục đứng là giá trị.',
    'Đoạn đi lên: tăng; đoạn đi xuống: giảm; đoạn nằm ngang: không đổi; đoạn càng dốc thì thay đổi càng nhiều.',
    'Vẽ: hai trục → các điểm → nối các điểm liên tiếp → tên biểu đồ.',
  ],
};
