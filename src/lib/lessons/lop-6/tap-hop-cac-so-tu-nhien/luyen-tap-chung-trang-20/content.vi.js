/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: củng cố tập hợp, cách ghi số tự nhiên, thứ tự trong tập hợp số tự nhiên và bốn phép tính cộng, trừ, nhân, chia số tự nhiên.',
  intro:
    'Em đã học tập hợp, cách ghi số tự nhiên, thứ tự trên tia số và bốn phép tính với số tự nhiên. Bài luyện tập này giúp em nối các kiến thức đó lại với nhau: viết tập hợp, đọc giá trị chữ số, so sánh số và tính toán hợp lí.',
  objectives: [
    'Viết tập hợp bằng cách liệt kê và chỉ ra tính chất đặc trưng; dùng đúng kí hiệu $\\in$, $\\notin$.',
    'Đọc giá trị chữ số theo hàng, đọc và viết số La Mã; so sánh, sắp xếp các số tự nhiên.',
    'Vận dụng tính chất các phép tính để tính nhẩm, tính hợp lí; tìm thương và số dư.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'list',
          items: [
            'Hai cách viết tập hợp: liệt kê các phần tử, ví dụ $A = \\{0; 1; 2; 3\\}$, hoặc chỉ ra tính chất đặc trưng, ví dụ $A = \\{x \\in \\mathbb{N} \\mid x < 4\\}$.',
            'Trong hệ thập phân, giá trị mỗi chữ số phụ thuộc vào vị trí của nó: chữ số $5$ trong $2\\,357\\,041$ có giá trị $50\\,000$.',
            'Số La Mã dùng các chữ số $I = 1$, $V = 5$, $X = 10$ và các thành phần $IV = 4$, $IX = 9$.',
            'Với hai số tự nhiên khác nhau, số nào có nhiều chữ số hơn thì lớn hơn; nếu cùng số chữ số, so sánh từng cặp chữ số từ trái sang phải.',
            'Phép cộng và phép nhân có tính chất giao hoán, kết hợp; phép nhân phân phối đối với phép cộng và phép trừ.',
            'Với $b \\ne 0$: $a = b \\cdot q + r$, $0 \\le r < b$; $r = 0$ là phép chia hết.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Phần luyện tập bên dưới có bộ đề tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận mười câu mới, trộn đều từ năm bài đầu của chương.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề luyện tập trộn ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai, em sẽ thấy lời giải từng bước. Bản đồ kĩ năng tô màu theo từng bài: xanh là vững, vàng là cần luyện thêm, đỏ là cần ôn lại.',
  },
  examples: [
    {
      problem:
        'Viết tập hợp $B$ các số tự nhiên lẻ lớn hơn $10$ và nhỏ hơn $20$ bằng hai cách. Số $15$ và số $20$ có thuộc $B$ không?',
      steps: [
        'Các số tự nhiên lẻ lớn hơn $10$ và nhỏ hơn $20$ là $11, 13, 15, 17, 19$.',
        'Cách liệt kê: $B = \\{11; 13; 15; 17; 19\\}$.',
        'Cách chỉ ra tính chất đặc trưng: $B = \\{x \\in \\mathbb{N} \\mid x \\text{ lẻ}, 10 < x < 20\\}$.',
        '$15$ là số lẻ nằm giữa $10$ và $20$ nên $15 \\in B$; $20$ không nhỏ hơn $20$ nên $20 \\notin B$.',
      ],
      answer: '$B = \\{11; 13; 15; 17; 19\\}$; $15 \\in B$, $20 \\notin B$.',
    },
    {
      problem: 'Tính một cách hợp lí: $25 \\cdot 12 + 25 \\cdot 88$.',
      steps: [
        'Hai tích có chung thừa số $25$, dùng tính chất phân phối: $25 \\cdot 12 + 25 \\cdot 88 = 25 \\cdot (12 + 88)$.',
        '$25 \\cdot 100 = 2\\,500$.',
      ],
      answer: '$2\\,500$.',
    },
    {
      problem:
        'Một đoàn $1\\,245$ học sinh xếp hàng đồng diễn, mỗi hàng $36$ bạn. Xếp được bao nhiêu hàng đủ $36$ bạn, hàng cuối có bao nhiêu bạn?',
      steps: [
        'Chia $1\\,245$ cho $36$: $36 \\cdot 34 = 1\\,224$ và $1\\,245 - 1\\,224 = 21$.',
        'Vậy $1\\,245 = 36 \\cdot 34 + 21$ với $21 < 36$.',
      ],
      answer: 'Được $34$ hàng đủ $36$ bạn, hàng cuối có $21$ bạn.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt:
        'Cho $A = \\{x \\in \\mathbb{N} \\mid 3 < x \\le 8\\}$. Chọn tất cả các khẳng định đúng.',
      options: [
        '$3 \\in A$',
        '$4 \\in A$',
        '$8 \\in A$',
        '$9 \\notin A$',
        '$A = \\{4; 5; 6; 7\\}$',
      ],
      answers: [1, 2, 3],
      hints: ['Liệt kê $A$: các số lớn hơn $3$ và không vượt quá $8$.'],
      solution:
        '$A = \\{4; 5; 6; 7; 8\\}$. Do đó $3 \\notin A$, $4 \\in A$, $8 \\in A$, $9 \\notin A$; cách viết $\\{4; 5; 6; 7\\}$ thiếu phần tử $8$.',
    },
    {
      type: 'number',
      prompt: 'Tập hợp các số tự nhiên lớn hơn $12$ và không vượt quá $20$ có bao nhiêu phần tử?',
      answer: 8,
      hints: ['"Không vượt quá $20$" nghĩa là $\\le 20$.', 'Liệt kê: $13, 14, \\ldots, 20$.'],
      solution:
        'Tập hợp đó là $\\{13; 14; 15; 16; 17; 18; 19; 20\\}$, có $20 - 13 + 1 = 8$ phần tử.',
    },
    {
      type: 'number',
      prompt: 'Trong số $2\\,357\\,041$, chữ số $5$ có giá trị bằng bao nhiêu?',
      answer: 50000,
      hints: ['Xác định hàng của chữ số $5$, đếm từ hàng đơn vị sang trái.'],
      solution: 'Chữ số $5$ ở hàng chục nghìn, nên có giá trị $5 \\cdot 10\\,000 = 50\\,000$.',
    },
    {
      type: 'text',
      prompt: 'Viết số $19$ bằng số La Mã.',
      accept: ['XIX'],
      hints: ['$19 = 10 + 9$.', '$9$ viết là $IX$.'],
      solution: '$19 = 10 + 9$, viết là $X$ và $IX$ ghép lại: $XIX$.',
    },
    {
      type: 'number',
      prompt: 'Số La Mã $XXIV$ có giá trị bằng bao nhiêu?',
      answer: 24,
      hints: ['Tách thành $X$, $X$, $IV$.'],
      solution: '$XXIV = 10 + 10 + 4 = 24$.',
    },
    {
      type: 'choice',
      prompt: 'Số liền trước của số nhỏ nhất có năm chữ số là',
      options: ['$9\\,999$', '$10\\,001$', '$99\\,999$', '$10\\,000$'],
      answer: 0,
      hints: ['Số nhỏ nhất có năm chữ số là $10\\,000$.'],
      solution:
        'Số nhỏ nhất có năm chữ số là $10\\,000$; số liền trước của nó là $10\\,000 - 1 = 9\\,999$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các số sau theo thứ tự tăng dần.',
      items: ['$12\\,059$', '$12\\,509$', '$12\\,095$', '$12\\,590$'],
      answer: [0, 2, 1, 3],
      hints: ['Các số có cùng số chữ số và cùng hai chữ số đầu: so sánh từ chữ số hàng trăm.'],
      solution: '$12\\,059 < 12\\,095 < 12\\,509 < 12\\,590$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhẩm hợp lí: $135 + 360 + 65 + 40$.',
      answer: 600,
      hints: ['Ghép các số hạng có tổng tròn trăm.'],
      solution: '$(135 + 65) + (360 + 40) = 200 + 400 = 600$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số tự nhiên $x$, biết $x - 345 = 1\\,255$.',
      answer: 1600,
      hints: ['$x$ là số bị trừ: số bị trừ bằng hiệu cộng số trừ.'],
      solution: '$x = 1\\,255 + 345 = 1\\,600$.',
    },
    {
      type: 'number',
      prompt: 'Tính một cách hợp lí: $125 \\cdot 17 \\cdot 8$.',
      answer: 17000,
      hints: ['$125 \\cdot 8 = 1\\,000$.'],
      solution:
        '$125 \\cdot 17 \\cdot 8 = (125 \\cdot 8) \\cdot 17 = 1\\,000 \\cdot 17 = 17\\,000$.',
    },
    {
      type: 'number',
      prompt: 'Tính một cách hợp lí: $32 \\cdot 47 + 32 \\cdot 53$.',
      answer: 3200,
      hints: ['Đặt thừa số chung $32$ ra ngoài.'],
      solution: '$32 \\cdot 47 + 32 \\cdot 53 = 32 \\cdot (47 + 53) = 32 \\cdot 100 = 3\\,200$.',
    },
    {
      type: 'number',
      prompt:
        'Một cửa hàng có $250$ quả trứng, xếp vào các khay, mỗi khay $30$ quả. Sau khi xếp đầy được nhiều khay nhất có thể, còn thừa bao nhiêu quả trứng?',
      answer: 10,
      unit: 'quả',
      hints: ['Chia $250$ cho $30$ và tìm số dư.'],
      solution: '$250 = 30 \\cdot 8 + 10$ với $10 < 30$. Xếp được $8$ khay đầy, còn thừa $10$ quả.',
    },
  ],
  takeaways: [
    'Một tập hợp viết được bằng cách liệt kê hoặc chỉ ra tính chất đặc trưng; mỗi phần tử chỉ viết một lần.',
    'Giá trị của một chữ số phụ thuộc vào hàng của nó; số La Mã từ $1$ đến $30$ ghép từ $I$, $V$, $X$, $IV$, $IX$.',
    'Dùng giao hoán, kết hợp, phân phối để nhóm các số thành số tròn chục, tròn trăm.',
    'Phép chia có dư: $a = b \\cdot q + r$ với $0 \\le r < b$.',
  ],
};
