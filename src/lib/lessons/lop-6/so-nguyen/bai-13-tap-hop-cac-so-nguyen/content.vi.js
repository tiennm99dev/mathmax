/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Số nguyên âm và tập hợp các số nguyên Z, cách biểu diễn số nguyên trên trục số và cách so sánh hai số nguyên dựa vào vị trí trên trục số.',
  intro:
    'Bản tin thời tiết báo: "Đêm nay ở Mẫu Sơn nhiệt độ có thể xuống tới $2$ độ dưới $0\\,^\\circ\\text{C}$". Để ghi những nhiệt độ thấp hơn $0\\,^\\circ\\text{C}$, độ sâu dưới mực nước biển hay số tiền nợ, số tự nhiên không còn đủ dùng. Ta cần thêm các số mới: số nguyên âm, chẳng hạn $2$ độ dưới $0\\,^\\circ\\text{C}$ được viết là $-2\\,^\\circ\\text{C}$.',
  objectives: [
    'Nhận biết số nguyên âm, số nguyên dương và tập hợp các số nguyên $\\mathbb{Z}$.',
    'Biểu diễn số nguyên trên trục số nằm ngang và thẳng đứng.',
    'So sánh hai số nguyên, sắp xếp một dãy số nguyên theo thứ tự.',
  ],
  sections: [
    {
      heading: 'Số nguyên âm và tập hợp các số nguyên',
      blocks: [
        {
          type: 'p',
          text: 'Các số $-1; -2; -3; \\ldots$ được gọi là các số nguyên âm. Số $-3$ đọc là "âm ba" hoặc "trừ ba".',
        },
        {
          type: 'list',
          items: [
            'Nhiệt độ dưới $0\\,^\\circ\\text{C}$: $3$ độ dưới $0\\,^\\circ\\text{C}$ viết là $-3\\,^\\circ\\text{C}$.',
            'Độ cao dưới mực nước biển: đáy một hố sâu $50$ m dưới mực nước biển có độ cao $-50$ m.',
            'Số tiền nợ: nợ $20\\,000$ đồng có thể ghi là có $-20\\,000$ đồng.',
            'Năm trước Công nguyên: năm $776$ trước Công nguyên có thể viết là năm $-776$.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tập hợp các số nguyên',
          text: 'Tập hợp gồm các số nguyên âm, số $0$ và các số nguyên dương được gọi là tập hợp các số nguyên, kí hiệu là $\\mathbb{Z}$: $$\\mathbb{Z} = \\{\\ldots; -3; -2; -1; 0; 1; 2; 3; \\ldots\\}.$$',
        },
        {
          type: 'list',
          items: [
            'Các số $1; 2; 3; \\ldots$ là các số nguyên dương; đôi khi còn viết $+1; +2; +3; \\ldots$',
            'Số $0$ không phải là số nguyên dương, cũng không phải là số nguyên âm.',
            'Mọi số tự nhiên đều là số nguyên: $\\mathbb{N} \\subset \\mathbb{Z}$. Chẳng hạn $5 \\in \\mathbb{Z}$, $-5 \\in \\mathbb{Z}$ nhưng $-5 \\notin \\mathbb{N}$.',
          ],
        },
      ],
    },
    {
      heading: 'Biểu diễn số nguyên trên trục số',
      blocks: [
        {
          type: 'p',
          text: 'Vẽ một đường thẳng nằm ngang, chọn một điểm làm điểm $0$ (điểm gốc). Lấy một đơn vị độ dài, đặt các số nguyên dương $1; 2; 3; \\ldots$ lần lượt về bên phải điểm $0$ và các số nguyên âm $-1; -2; -3; \\ldots$ lần lượt về bên trái điểm $0$. Ta được một trục số.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Chiều từ trái sang phải là chiều dương (thường đánh dấu bằng mũi tên), chiều ngược lại là chiều âm. Điểm biểu diễn số nguyên $a$ trên trục số gọi là điểm $a$. Trục số cũng có thể vẽ thẳng đứng như một chiếc nhiệt kế: khi đó chiều dương hướng từ dưới lên trên.',
        },
        {
          type: 'p',
          text: 'Hai điểm $3$ và $-3$ nằm ở hai phía của điểm $0$ và cách điểm $0$ cùng ba đơn vị.',
        },
      ],
    },
    {
      heading: 'So sánh hai số nguyên',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'So sánh trên trục số',
          text: 'Trên trục số nằm ngang, nếu điểm $a$ nằm bên trái điểm $b$ thì $a$ nhỏ hơn $b$, viết $a < b$ (hay $b > a$).',
        },
        {
          type: 'list',
          items: [
            'Mọi số nguyên dương đều lớn hơn $0$; mọi số nguyên âm đều nhỏ hơn $0$.',
            'Mọi số nguyên âm đều nhỏ hơn mọi số nguyên dương.',
            'Với hai số nguyên âm, số nào có phần số tự nhiên lớn hơn thì nhỏ hơn: nếu $a$, $b$ là hai số nguyên dương và $a > b$ thì $-a < -b$. Ví dụ $7 > 3$ nên $-7 < -3$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Số liền trước, số liền sau',
          text: 'Nếu $a < b$ và không có số nguyên nào nằm giữa $a$ và $b$ thì $b$ là số liền sau của $a$, còn $a$ là số liền trước của $b$. Ví dụ: số liền trước của $-5$ là $-6$, số liền sau của $-5$ là $-4$. Số nguyên âm lớn nhất là $-1$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Không so sánh hai số nguyên âm như số tự nhiên: $-9$ không lớn hơn $-2$. Điểm $-9$ nằm bên trái điểm $-2$, nên $-9 < -2$. Trên nhiệt kế, $-9\\,^\\circ\\text{C}$ lạnh hơn $-2\\,^\\circ\\text{C}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Nhiệt kế và trục số',
    instruction:
      'Kéo mức nhiệt độ trên nhiệt kế để thấy cách đọc nhiệt độ âm. Sau đó kéo hai điểm $a$ và $b$ trên trục số: điểm nào nằm bên trái thì số đó nhỏ hơn. Làm lần lượt các thử thách.',
  },
  examples: [
    {
      problem: 'So sánh $-4$ và $-7$.',
      steps: [
        'Biểu diễn hai số trên trục số: điểm $-7$ cách điểm $0$ bảy đơn vị về bên trái, điểm $-4$ cách điểm $0$ bốn đơn vị về bên trái.',
        'Điểm $-7$ nằm bên trái điểm $-4$.',
        'Cách khác: $7 > 4$ nên $-7 < -4$.',
      ],
      answer: '$-7 < -4$ (hay $-4 > -7$).',
    },
    {
      problem: 'Sắp xếp các số nguyên sau theo thứ tự tăng dần: $5; -2; 0; -9; 3; -1$.',
      steps: [
        'Các số nguyên âm nhỏ hơn $0$, các số nguyên dương lớn hơn $0$.',
        'Trong các số âm $-2; -9; -1$: vì $9 > 2 > 1$ nên $-9 < -2 < -1$.',
        'Trong các số dương: $3 < 5$.',
      ],
      answer: '$-9 < -2 < -1 < 0 < 3 < 5$.',
    },
    {
      problem:
        'Đỉnh Phan Xi Păng cao $3\\,143$ m so với mực nước biển; một tàu ngầm đang lặn ở độ sâu $150$ m dưới mực nước biển. Dùng số nguyên để biểu thị độ cao của đỉnh núi và của tàu ngầm. Nơi nào cao hơn?',
      steps: [
        'Lấy mực nước biển làm mốc $0$; trên mực nước biển là số dương, dưới mực nước biển là số âm.',
        'Độ cao của đỉnh Phan Xi Păng là $3\\,143$ m, của tàu ngầm là $-150$ m.',
        'Số nguyên âm nhỏ hơn số nguyên dương: $-150 < 3\\,143$.',
      ],
      answer: 'Đỉnh núi: $3\\,143$ m; tàu ngầm: $-150$ m. Đỉnh núi cao hơn.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn tất cả các số nguyên âm.',
      options: ['$-3$', '$0$', '$5$', '$-12$', '$+7$', '$-1$'],
      answers: [0, 3, 5],
      hints: ['Số nguyên âm có dấu "$-$" đằng trước.', 'Số $0$ không phải là số nguyên âm.'],
      solution:
        'Các số nguyên âm là $-3$, $-12$, $-1$. Số $0$ không âm không dương; $5$ và $+7$ là số nguyên dương.',
    },
    {
      type: 'number',
      prompt:
        'Nhiệt độ lúc sáng sớm ở một thành phố là $4$ độ dưới $0\\,^\\circ\\text{C}$. Viết nhiệt độ đó bằng số nguyên.',
      answer: -4,
      unit: '°C',
      hints: ['Nhiệt độ dưới $0\\,^\\circ\\text{C}$ được viết bằng số nguyên âm.'],
      solution: '$4$ độ dưới $0\\,^\\circ\\text{C}$ là $-4\\,^\\circ\\text{C}$.',
    },
    {
      type: 'text',
      prompt: 'Số $-7$ đọc là gì? (viết bằng chữ, ví dụ "âm hai")',
      accept: ['âm bảy', 'trừ bảy', 'âm 7', 'trừ 7', 'âm bẩy', 'trừ bẩy'],
      hints: ['Dấu "$-$" trước số đọc là "âm" hoặc "trừ".'],
      solution: '$-7$ đọc là "âm bảy" hoặc "trừ bảy".',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào sau đây là sai?',
      options: ['$-5 < -2$', '$0 > -100$', '$-7 > -3$', '$-1$ là số nguyên âm lớn nhất'],
      answer: 2,
      hints: [
        'Hình dung các điểm trên trục số: điểm nào ở bên trái thì nhỏ hơn.',
        'So sánh $-7$ và $-3$: vì $7 > 3$ nên $-7$ ... $-3$.',
      ],
      solution:
        'Điểm $-7$ nằm bên trái điểm $-3$ nên $-7 < -3$; khẳng định "$-7 > -3$" sai. Các khẳng định còn lại đều đúng.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các số nguyên theo thứ tự tăng dần.',
      items: ['$-8$', '$4$', '$-1$', '$0$', '$-15$', '$7$'],
      answer: [4, 0, 2, 3, 1, 5],
      hints: [
        'Các số âm đứng trước $0$, các số dương đứng sau $0$.',
        'Với số âm: phần số tự nhiên càng lớn thì số càng nhỏ.',
      ],
      solution: '$-15 < -8 < -1 < 0 < 4 < 7$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số liền trước của $-9$.',
      answer: -10,
      hints: [
        'Số liền trước nằm ngay bên trái trên trục số.',
        'Đi sang trái một đơn vị từ điểm $-9$.',
      ],
      solution:
        'Ngay bên trái điểm $-9$ là điểm $-10$, và $-10 < -9$. Số liền trước của $-9$ là $-10$.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu số nguyên $x$ thỏa mãn $-4 < x < 3$?',
      answer: 6,
      hints: ['Liệt kê các số nguyên nằm giữa $-4$ và $3$ trên trục số (không lấy hai đầu).'],
      solution: '$x \\in \\{-3; -2; -1; 0; 1; 2\\}$, gồm $6$ số.',
    },
    {
      type: 'number',
      prompt:
        'Một tàu ngầm đang ở độ sâu $30$ m dưới mực nước biển. Viết độ cao của tàu ngầm (so với mực nước biển) bằng số nguyên.',
      answer: -30,
      unit: 'm',
      hints: ['Mực nước biển là mốc $0$; dưới mực nước biển là số âm.'],
      solution: 'Độ cao của tàu ngầm là $-30$ m.',
    },
    {
      type: 'number',
      prompt: 'Tìm số nguyên âm nhỏ nhất có hai chữ số.',
      answer: -99,
      hints: [
        'Với số nguyên âm, phần số tự nhiên càng lớn thì số càng nhỏ.',
        'Số tự nhiên lớn nhất có hai chữ số là bao nhiêu?',
      ],
      solution:
        'Số tự nhiên lớn nhất có hai chữ số là $99$, nên số nguyên âm nhỏ nhất có hai chữ số là $-99$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi tình huống với số nguyên biểu thị nó.',
      left: [
        'Nhiệt độ $5$ độ dưới $0\\,^\\circ\\text{C}$',
        'Độ cao $5$ m trên mực nước biển',
        'Nợ $50$ nghìn đồng (tính theo nghìn đồng)',
        'Năm $500$ trước Công nguyên',
      ],
      right: ['$-5$', '$5$', '$-50$', '$-500$', '$50$'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Dưới $0$, nợ, trước Công nguyên đều được biểu thị bằng số nguyên âm.'],
      solution:
        'Nhiệt độ: $-5\\,^\\circ\\text{C}$; độ cao: $5$ m; nợ $50$ nghìn đồng: $-50$ (nghìn đồng); năm $500$ trước Công nguyên: năm $-500$.',
    },
  ],
  takeaways: [
    '$\\mathbb{Z} = \\{\\ldots; -2; -1; 0; 1; 2; \\ldots\\}$; số $0$ không âm, không dương.',
    'Trên trục số nằm ngang, số nguyên dương ở bên phải, số nguyên âm ở bên trái điểm $0$.',
    'Điểm $a$ nằm bên trái điểm $b$ thì $a < b$.',
    'Số âm < $0$ < số dương; với $a > b > 0$ thì $-a < -b$.',
  ],
};
