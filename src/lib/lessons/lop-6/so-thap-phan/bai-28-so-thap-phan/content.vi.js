/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phân số thập phân và số thập phân, số thập phân âm, số đối của một số thập phân và cách so sánh hai số thập phân.',
  intro:
    'Bản tin thời tiết sáng nay: nhiệt độ ở Mẫu Sơn là $-2{,}3^\\circ\\mathrm{C}$, ở Sa Pa là $-1{,}5^\\circ\\mathrm{C}$. Ở tiểu học, em đã biết số thập phân như $0{,}5$ hay $2{,}75$. Những số có dấu "$-$" đằng trước như $-2{,}3$ là số gì, và nơi nào lạnh hơn? Bài này mở rộng số thập phân sang cả số âm và chỉ cách so sánh chúng.',
  objectives: [
    'Nhận biết phân số thập phân; viết phân số thập phân dưới dạng số thập phân và ngược lại.',
    'Nhận biết số thập phân âm, số đối của một số thập phân.',
    'So sánh hai số thập phân, sắp xếp một dãy số thập phân theo thứ tự.',
  ],
  sections: [
    {
      heading: 'Phân số thập phân và số thập phân',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phân số thập phân',
          text: 'Phân số thập phân là phân số mà mẫu là lũy thừa của $10$ (mẫu là $10$, $100$, $1\\,000$, ...). Chẳng hạn $\\frac{3}{10}$, $\\frac{-15}{100}$, $\\frac{2\\,025}{1\\,000}$ là các phân số thập phân.',
        },
        {
          type: 'p',
          text: 'Như ở tiểu học, phân số thập phân dương viết được dưới dạng số thập phân: $\\frac{3}{10} = 0{,}3$; $\\frac{15}{100} = 0{,}15$. Phân số thập phân âm cũng vậy, chỉ thêm dấu "$-$": $\\frac{-15}{100} = -0{,}15$; $\\frac{-2\\,025}{1\\,000} = -2{,}025$. Các số $-0{,}15$; $-2{,}025$ là những số thập phân âm. Các số $0{,}3$; $0{,}15$ là những số thập phân dương.',
        },
        {
          type: 'p',
          text: 'Mỗi số thập phân gồm hai phần, ngăn cách bởi dấu phẩy: phần số nguyên viết bên trái dấu phẩy, phần thập phân viết bên phải dấu phẩy. Trong số $-2{,}025$, phần số nguyên là $2$ (kèm dấu "$-$" của cả số) và phần thập phân là $025$: $0$ phần mười, $2$ phần trăm, $5$ phần nghìn. Số $-2{,}025$ đọc là "âm hai phẩy không trăm hai mươi lăm".',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Từ số thập phân về phân số thập phân',
          text: 'Phần thập phân có bao nhiêu chữ số thì mẫu có bấy nhiêu chữ số $0$; tử là số viết được khi bỏ dấu phẩy: $-4{,}05 = \\frac{-405}{100}$; $0{,}007 = \\frac{7}{1\\,000}$. Viết thêm chữ số $0$ vào bên phải phần thập phân, giá trị của số không đổi: $1{,}5 = 1{,}50 = 1{,}500$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số đối',
          text: 'Cũng như số nguyên, mỗi số thập phân có một số đối; hai số đối nhau có tổng bằng $0$. Số đối của $1{,}2$ là $-1{,}2$; số đối của $-0{,}75$ là $0{,}75$. Trên trục số, hai số đối nhau nằm ở hai phía của điểm $0$ và cách đều điểm $0$.',
        },
      ],
    },
    {
      heading: 'So sánh hai số thập phân',
      blocks: [
        {
          type: 'p',
          text: 'Trên trục số nằm ngang, số nằm bên trái thì nhỏ hơn. Các số thập phân âm nằm bên trái điểm $0$, các số thập phân dương nằm bên phải điểm $0$. Khi phóng to một đoạn giữa hai số nguyên, ta thấy các vạch phần mười; phóng to tiếp một đoạn phần mười, ta thấy các vạch phần trăm, và cứ thế.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc so sánh',
          text: 'Số thập phân âm nhỏ hơn $0$ và nhỏ hơn mọi số thập phân dương. Nếu $a$ và $b$ là hai số thập phân dương và $a > b$ thì $-a < -b$.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Để so sánh hai số thập phân dương, trước hết so sánh phần số nguyên: số nào có phần số nguyên lớn hơn thì lớn hơn.',
            'Nếu phần số nguyên bằng nhau thì so sánh lần lượt từng hàng ở phần thập phân, từ hàng phần mười, hàng phần trăm, hàng phần nghìn, ... cho đến khi xuất hiện cặp chữ số đầu tiên khác nhau. Số có chữ số lớn hơn ở hàng đó thì lớn hơn.',
            'Để so sánh hai số thập phân âm, ta so sánh hai số đối của chúng (là hai số dương): số nào có số đối lớn hơn thì nhỏ hơn.',
          ],
        },
        {
          type: 'table',
          caption: 'Một số ví dụ so sánh',
          head: ['Cặp số', 'Lí do', 'Kết quả'],
          rows: [
            ['$12{,}5$ và $9{,}87$', 'phần số nguyên $12 > 9$', '$12{,}5 > 9{,}87$'],
            [
              '$3{,}146$ và $3{,}15$',
              'hàng phần mười bằng nhau ($1$), hàng phần trăm $4 < 5$',
              '$3{,}146 < 3{,}15$',
            ],
            ['$-0{,}5$ và $0{,}01$', 'số âm nhỏ hơn số dương', '$-0{,}5 < 0{,}01$'],
            ['$-7{,}2$ và $-7{,}19$', '$7{,}2 > 7{,}19$', '$-7{,}2 < -7{,}19$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Số có nhiều chữ số ở phần thập phân hơn chưa chắc đã lớn hơn: $0{,}125 < 0{,}5$ vì ở hàng phần mười $1 < 5$. Hãy viết thêm chữ số $0$ cho hai phần thập phân dài bằng nhau rồi so sánh: $0{,}125$ và $0{,}500$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Trục số phóng to',
    instruction:
      'Kéo điểm tím trên trục số. Bấm "Phóng to quanh điểm" để chia đoạn chứa điểm thành $10$ phần bằng nhau và nhìn thấy hàng phần mười, rồi hàng phần trăm, hàng phần nghìn. Bảng phía trên cho biết chữ số ở từng hàng và phân số thập phân của số đó. Làm thử thách: đặt điểm đúng vào số được hỏi; nếu chưa đúng, trục số sẽ so sánh và chỉ cho em nên dịch sang trái hay sang phải.',
  },
  examples: [
    {
      problem:
        'Viết các phân số thập phân sau dưới dạng số thập phân: $\\frac{-34}{10}$; $\\frac{7}{100}$; $\\frac{-2\\,025}{1\\,000}$.',
      steps: [
        'Mẫu $10$ có một chữ số $0$, nên số thập phân có một chữ số ở phần thập phân: $\\frac{-34}{10} = -3{,}4$.',
        'Mẫu $100$ có hai chữ số $0$: $\\frac{7}{100} = 0{,}07$ (thêm chữ số $0$ ở hàng phần mười cho đủ hai chữ số).',
        'Mẫu $1\\,000$ có ba chữ số $0$: $\\frac{-2\\,025}{1\\,000} = -2{,}025$.',
      ],
      answer: '$-3{,}4$; $0{,}07$; $-2{,}025$.',
    },
    {
      problem: 'Viết các số thập phân $-0{,}25$ và $3{,}015$ dưới dạng phân số thập phân.',
      steps: [
        '$-0{,}25$ có hai chữ số ở phần thập phân, nên mẫu là $100$; bỏ dấu phẩy được tử $-25$: $-0{,}25 = \\frac{-25}{100}$.',
        '$3{,}015$ có ba chữ số ở phần thập phân, nên mẫu là $1\\,000$: $3{,}015 = \\frac{3\\,015}{1\\,000}$.',
      ],
      answer: '$-0{,}25 = \\frac{-25}{100}$; $3{,}015 = \\frac{3\\,015}{1\\,000}$.',
    },
    {
      problem: 'So sánh $-8{,}152$ và $-8{,}9$.',
      steps: [
        'Hai số đều âm, nên ta so sánh hai số đối của chúng là $8{,}152$ và $8{,}9$.',
        'Phần số nguyên đều là $8$. Ở hàng phần mười: $1 < 9$, nên $8{,}152 < 8{,}9$.',
        'Số đối lớn hơn thì số đó nhỏ hơn: $-8{,}152 > -8{,}9$.',
      ],
      answer: '$-8{,}152 > -8{,}9$.',
    },
    {
      problem:
        'Nhiệt độ lúc 6 giờ sáng ở bốn nơi là: Sa Pa $-1{,}5^\\circ\\mathrm{C}$; Mẫu Sơn $-2{,}3^\\circ\\mathrm{C}$; Đà Lạt $0{,}4^\\circ\\mathrm{C}$; Hà Nội $9{,}8^\\circ\\mathrm{C}$. Sắp xếp các nhiệt độ theo thứ tự từ thấp đến cao. Nơi nào lạnh nhất?',
      steps: [
        'Hai số âm $-2{,}3$ và $-1{,}5$ nhỏ hơn hai số dương $0{,}4$ và $9{,}8$.',
        'So sánh hai số âm: $2{,}3 > 1{,}5$ nên $-2{,}3 < -1{,}5$.',
        'So sánh hai số dương: $0{,}4 < 9{,}8$.',
        'Thứ tự tăng dần: $-2{,}3 < -1{,}5 < 0{,}4 < 9{,}8$.',
      ],
      answer: 'Mẫu Sơn ($-2{,}3^\\circ\\mathrm{C}$), Sa Pa, Đà Lạt, Hà Nội. Mẫu Sơn lạnh nhất.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Viết phân số thập phân $\\frac{-37}{100}$ dưới dạng số thập phân.',
      answer: -0.37,
      hints: [
        'Mẫu $100$ có hai chữ số $0$, nên phần thập phân có hai chữ số.',
        'Giữ dấu "$-$" của phân số.',
      ],
      solution: '$\\frac{-37}{100} = -0{,}37$.',
    },
    {
      type: 'number',
      prompt: 'Viết phân số thập phân $\\frac{2\\,023}{1\\,000}$ dưới dạng số thập phân.',
      answer: 2.023,
      hints: ['Mẫu $1\\,000$ có ba chữ số $0$: đặt dấu phẩy trước ba chữ số cuối của tử.'],
      solution: '$\\frac{2\\,023}{1\\,000} = 2{,}023$.',
    },
    {
      type: 'choice',
      prompt: 'Phân số nào dưới đây là phân số thập phân?',
      options: ['$\\frac{3}{5}$', '$\\frac{7}{1\\,000}$', '$\\frac{10}{3}$', '$\\frac{1}{20}$'],
      answer: 1,
      hints: ['Phân số thập phân có mẫu là $10$, $100$, $1\\,000$, ... (lũy thừa của $10$).'],
      solution:
        'Chỉ $\\frac{7}{1\\,000}$ có mẫu là lũy thừa của $10$ ($1\\,000 = 10^3$). Phân số $\\frac{3}{5}$ bằng $\\frac{6}{10}$ nhưng như đã viết thì mẫu $5$ không phải lũy thừa của $10$; $20$ và $3$ cũng vậy.',
    },
    {
      type: 'number',
      prompt:
        'Viết số thập phân $-4{,}05$ dưới dạng phân số thập phân có mẫu $100$. Tử số của phân số đó là bao nhiêu?',
      answer: -405,
      hints: [
        'Phần thập phân có hai chữ số nên mẫu là $100$.',
        'Tử là số viết được khi bỏ dấu phẩy, giữ dấu "$-$".',
      ],
      solution: '$-4{,}05 = \\frac{-405}{100}$, tử số là $-405$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số đối của $-12{,}7$.',
      answer: 12.7,
      hints: ['Hai số đối nhau có tổng bằng $0$.'],
      solution: 'Số đối của $-12{,}7$ là $12{,}7$ vì $-12{,}7 + 12{,}7 = 0$.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: $-0{,}5 \\;\\square\\; -0{,}48$.',
      options: ['$<$', '$>$', '$=$'],
      answer: 0,
      hints: [
        'So sánh hai số đối $0{,}5$ và $0{,}48$ trước.',
        'Viết $0{,}5 = 0{,}50$ rồi so sánh với $0{,}48$.',
      ],
      solution:
        '$0{,}50 > 0{,}48$ (hàng phần mười $5 > 4$). Số đối lớn hơn thì số đó nhỏ hơn, nên $-0{,}5 < -0{,}48$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các số sau theo thứ tự từ nhỏ đến lớn.',
      items: ['$1{,}05$', '$-1{,}5$', '$-1{,}05$', '$0{,}15$', '$-0{,}51$'],
      answer: [1, 2, 4, 3, 0],
      hints: [
        'Tách thành nhóm số âm và nhóm số dương; mọi số âm đứng trước mọi số dương.',
        'Trong nhóm số âm, số có số đối lớn hơn thì nhỏ hơn: $1{,}5 > 1{,}05 > 0{,}51$.',
      ],
      solution:
        'Số âm: $1{,}5 > 1{,}05 > 0{,}51$ nên $-1{,}5 < -1{,}05 < -0{,}51$. Số dương: $0{,}15 < 1{,}05$. Vậy $-1{,}5 < -1{,}05 < -0{,}51 < 0{,}15 < 1{,}05$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các số lớn hơn $-2{,}3$.',
      options: ['$-2{,}31$', '$-2{,}29$', '$-3$', '$0$', '$-2{,}3$'],
      answers: [1, 3],
      hints: [
        'Với số âm, so sánh số đối: số có số đối nhỏ hơn $2{,}3$ thì lớn hơn $-2{,}3$.',
        'Số bằng $-2{,}3$ thì không lớn hơn $-2{,}3$.',
      ],
      solution:
        '$2{,}29 < 2{,}3$ nên $-2{,}29 > -2{,}3$; $0 > -2{,}3$ vì số âm nhỏ hơn $0$. Còn $2{,}31 > 2{,}3$ và $3 > 2{,}3$ nên $-2{,}31$ và $-3$ đều nhỏ hơn $-2{,}3$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số thập phân lớn nhất có đúng ba chữ số ở phần thập phân và nhỏ hơn $-2$.',
      answer: -2.001,
      hints: [
        'Số cần tìm nằm bên trái $-2$ trên trục số, gần $-2$ nhất.',
        'Với các số có ba chữ số thập phân, các vạch cách nhau $0{,}001$.',
      ],
      solution:
        'Các số có ba chữ số ở phần thập phân cách nhau $0{,}001$ trên trục số. Số gần $-2$ nhất ở bên trái $-2$ là $-2{,}001$ (vì $2{,}001 > 2$ nên $-2{,}001 < -2$).',
    },
  ],
  takeaways: [
    'Phân số thập phân có mẫu là lũy thừa của $10$; nó viết được dưới dạng số thập phân, kể cả khi âm: $\\frac{-15}{100} = -0{,}15$.',
    'Số thập phân gồm phần số nguyên (bên trái dấu phẩy) và phần thập phân (bên phải dấu phẩy).',
    'Hai số thập phân đối nhau có tổng bằng $0$: số đối của $a$ là $-a$.',
    'Số âm $<$ $0$ $<$ số dương; nếu $a > b > 0$ thì $-a < -b$. Số dương so sánh phần số nguyên trước, rồi từng hàng phần mười, phần trăm, ...',
  ],
};
