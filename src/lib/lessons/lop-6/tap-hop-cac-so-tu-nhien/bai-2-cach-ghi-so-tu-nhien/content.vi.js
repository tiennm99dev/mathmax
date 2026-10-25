/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hệ thập phân, giá trị của mỗi chữ số theo hàng, cấu tạo thập phân của một số tự nhiên và cách ghi các số từ 1 đến 30 bằng chữ số La Mã.',
  intro:
    'Chỉ với mười chữ số $0, 1, 2, \\dots, 9$ ta ghi được mọi số tự nhiên, dù lớn đến đâu. Bí quyết nằm ở vị trí: cùng chữ số $7$ nhưng trong $70$ và $700$ nó có giá trị khác nhau. Bài này giúp em hiểu cách ghi số trong hệ thập phân và làm quen với số La Mã trên mặt đồng hồ.',
  objectives: [
    'Đọc, viết số tự nhiên trong hệ thập phân; tách số thành từng lớp ba chữ số.',
    'Xác định giá trị của mỗi chữ số theo vị trí và viết cấu tạo thập phân của một số.',
    'Đọc và viết các số La Mã từ $1$ đến $30$.',
  ],
  sections: [
    {
      heading: 'Hệ thập phân',
      blocks: [
        {
          type: 'p',
          text: 'Trong hệ thập phân, mỗi số tự nhiên được viết dưới dạng một dãy những chữ số lấy trong mười chữ số $0; 1; 2; 3; 4; 5; 6; 7; 8; 9$. Vị trí của các chữ số trong dãy gọi là hàng. Với số có nhiều chữ số, chữ số đầu tiên bên trái khác $0$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Quy tắc của hệ thập phân',
          text: 'Cứ $10$ đơn vị ở một hàng thì bằng $1$ đơn vị ở hàng liền trước (hàng cao hơn) nó. Chẳng hạn $10$ đơn vị $= 1$ chục, $10$ chục $= 1$ trăm, $10$ trăm $= 1$ nghìn.',
        },
        {
          type: 'p',
          text: 'Giá trị của mỗi chữ số phụ thuộc vào vị trí của nó. Trong số $777$, chữ số $7$ ở hàng trăm có giá trị $700$, ở hàng chục có giá trị $70$, ở hàng đơn vị có giá trị $7$.',
        },
        {
          type: 'p',
          text: 'Để dễ đọc, khi viết số có từ năm chữ số trở lên, người ta tách riêng từng nhóm ba chữ số kể từ phải sang trái. Mỗi nhóm là một lớp.',
        },
        {
          type: 'table',
          caption: 'Số 15 712 314 trong bảng lớp và hàng',
          head: ['Lớp', 'Triệu', 'Nghìn', 'Đơn vị'],
          rows: [
            ['Hàng', 'chục triệu, triệu', 'trăm nghìn, chục nghìn, nghìn', 'trăm, chục, đơn vị'],
            ['Chữ số', '$1\\ \\ 5$', '$7\\ \\ 1\\ \\ 2$', '$3\\ \\ 1\\ \\ 4$'],
          ],
        },
        {
          type: 'p',
          text: 'Số $15\\,712\\,314$ đọc là "mười lăm triệu bảy trăm mười hai nghìn ba trăm mười bốn".',
        },
      ],
    },
    {
      heading: 'Cấu tạo thập phân của một số',
      blocks: [
        {
          type: 'p',
          text: 'Mỗi số tự nhiên viết trong hệ thập phân đều biểu diễn được thành tổng giá trị các chữ số của nó. Kí hiệu $\\overline{ab}$ chỉ số tự nhiên có hai chữ số, chữ số hàng chục là $a$ ($a \\ne 0$), chữ số hàng đơn vị là $b$.',
        },
        {
          type: 'tex',
          tex: '\\overline{ab} = a \\times 10 + b \\quad (a \\ne 0)',
        },
        {
          type: 'tex',
          tex: '\\overline{abc} = a \\times 100 + b \\times 10 + c \\quad (a \\ne 0)',
        },
        {
          type: 'p',
          text: 'Ví dụ: $4\\,851 = 4 \\times 1\\,000 + 8 \\times 100 + 5 \\times 10 + 1$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: '$\\overline{ab}$ có gạch ngang trên đầu để phân biệt với tích $a \\cdot b$. Chẳng hạn với $a = 3$, $b = 5$ thì $\\overline{ab} = 35$, còn $a \\cdot b = 15$.',
        },
      ],
    },
    {
      heading: 'Số La Mã',
      blocks: [
        {
          type: 'p',
          text: 'Số La Mã thường gặp trên mặt đồng hồ, trong tên các chương sách hay số thứ tự các thế kỉ. Để ghi các số từ $1$ đến $30$, người ta dùng ba chữ số:',
        },
        {
          type: 'table',
          head: ['Chữ số La Mã', 'I', 'V', 'X'],
          rows: [['Giá trị (hệ thập phân)', '$1$', '$5$', '$10$']],
        },
        {
          type: 'p',
          text: 'Ngoài ra có hai cụm chữ số đặc biệt: IV (giá trị $4$) và IX (giá trị $9$). Ba chữ số I, V, X cùng hai cụm IV, IX là các thành phần để ghi số La Mã; giá trị của mỗi thành phần không đổi dù nó đứng ở vị trí nào.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Giá trị của một số La Mã',
          text: 'Mỗi số La Mã biểu diễn một số tự nhiên bằng tổng giá trị các thành phần tạo nên số đó. Ví dụ XXIV $= 10 + 10 + 4 = 24$. Không có số La Mã nào biểu diễn số $0$.',
        },
        {
          type: 'table',
          caption: 'Các số La Mã từ 1 đến 30',
          head: ['1 đến 10', '11 đến 20', '21 đến 30'],
          rows: [
            ['I $= 1$', 'XI $= 11$', 'XXI $= 21$'],
            ['II $= 2$', 'XII $= 12$', 'XXII $= 22$'],
            ['III $= 3$', 'XIII $= 13$', 'XXIII $= 23$'],
            ['IV $= 4$', 'XIV $= 14$', 'XXIV $= 24$'],
            ['V $= 5$', 'XV $= 15$', 'XXV $= 25$'],
            ['VI $= 6$', 'XVI $= 16$', 'XXVI $= 26$'],
            ['VII $= 7$', 'XVII $= 17$', 'XXVII $= 27$'],
            ['VIII $= 8$', 'XVIII $= 18$', 'XXVIII $= 28$'],
            ['IX $= 9$', 'XIX $= 19$', 'XXIX $= 29$'],
            ['X $= 10$', 'XX $= 20$', 'XXX $= 30$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Các chữ số I, X có thể viết liền nhau nhưng không quá ba lần; chữ số V không viết liền nhau. Vì thế số $4$ viết là IV chứ không viết IIII.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng giá trị chữ số và số La Mã',
    instruction:
      'Gõ một số tự nhiên rồi bấm vào từng chữ số để thấy nó nằm ở hàng nào và có giá trị bao nhiêu. Kéo thanh trượt bên dưới để xem một số từ $1$ đến $30$ được ghép từ những thành phần La Mã nào.',
  },
  examples: [
    {
      problem:
        'Cho số $2\\,507\\,361$. Chữ số $5$ ở hàng nào, có giá trị bao nhiêu? Viết cấu tạo thập phân của số này.',
      steps: [
        'Tách lớp: $2 \\mid 507 \\mid 361$. Lớp triệu có chữ số $2$; lớp nghìn có $5, 0, 7$; lớp đơn vị có $3, 6, 1$.',
        'Chữ số $5$ đứng đầu lớp nghìn nên ở hàng trăm nghìn, có giá trị $500\\,000$.',
        'Cấu tạo thập phân: $2 \\times 1\\,000\\,000 + 5 \\times 100\\,000 + 0 \\times 10\\,000 + 7 \\times 1\\,000 + 3 \\times 100 + 6 \\times 10 + 1$.',
      ],
      answer: 'Chữ số $5$ ở hàng trăm nghìn, có giá trị $500\\,000$.',
    },
    {
      problem: 'Đọc số La Mã XXIX và viết số $18$ bằng số La Mã.',
      steps: [
        'Tách XXIX thành các thành phần X, X, IX.',
        'Cộng giá trị: $10 + 10 + 9 = 29$.',
        'Viết $18 = 10 + 5 + 1 + 1 + 1$, ứng với các thành phần X, V, I, I, I.',
      ],
      answer: 'XXIX $= 29$; $\\ 18 =$ XVIII.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Trong số $2\\,375\\,041$, chữ số $7$ có giá trị bằng bao nhiêu?',
      answer: 70000,
      hints: [
        'Tách lớp: $2 \\mid 375 \\mid 041$.',
        'Chữ số $7$ ở lớp nghìn, hàng thứ hai từ trái của lớp.',
      ],
      solution: 'Chữ số $7$ ở hàng chục nghìn nên có giá trị $7 \\times 10\\,000 = 70\\,000$.',
    },
    {
      type: 'choice',
      prompt: 'Số "mười hai triệu không trăm năm mươi nghìn ba trăm linh bảy" được viết là',
      options: ['$12\\,050\\,307$', '$12\\,500\\,307$', '$12\\,050\\,370$', '$1\\,205\\,307$'],
      answer: 0,
      hints: [
        'Viết từng lớp: lớp triệu, lớp nghìn, lớp đơn vị, mỗi lớp (trừ lớp đầu) đủ ba chữ số.',
      ],
      solution:
        'Lớp triệu: $12$; lớp nghìn: "không trăm năm mươi" là $050$; lớp đơn vị: "ba trăm linh bảy" là $307$. Vậy số là $12\\,050\\,307$.',
    },
    {
      type: 'text',
      prompt: 'Viết số $19$ bằng số La Mã.',
      accept: ['XIX'],
      hints: ['$19 = 10 + 9$.', 'Số $9$ là một cụm đặc biệt.'],
      solution: '$19 = 10 + 9$ nên viết là X ghép với IX: XIX.',
    },
    {
      type: 'number',
      prompt: 'Số La Mã XXIV biểu diễn số tự nhiên nào?',
      answer: 24,
      hints: ['Tách thành các thành phần: X, X, IV.'],
      solution: 'XXIV $= 10 + 10 + 4 = 24$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số với cách viết bằng số La Mã.',
      left: ['$9$', '$14$', '$26$', '$29$'],
      right: ['XXIX', 'IX', 'XXVI', 'XIV'],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 2],
        [3, 0],
      ],
      hints: ['Tách mỗi số thành tổng các giá trị $10$, $9$, $5$, $4$, $1$.'],
      solution:
        '$9 =$ IX; $\\ 14 = 10 + 4 =$ XIV; $\\ 26 = 10 + 10 + 5 + 1 =$ XXVI; $\\ 29 = 10 + 10 + 9 =$ XXIX.',
    },
    {
      type: 'number',
      prompt: 'Viết số tự nhiên nhỏ nhất có bốn chữ số khác nhau.',
      answer: 1023,
      hints: [
        'Chữ số hàng nghìn phải khác $0$, nên nhỏ nhất là $1$.',
        'Các hàng còn lại chọn các chữ số nhỏ nhất chưa dùng.',
      ],
      solution:
        'Hàng nghìn nhỏ nhất là $1$; rồi lần lượt $0$, $2$, $3$ cho hàng trăm, chục, đơn vị. Số cần tìm là $1\\,023$.',
    },
    {
      type: 'choice',
      prompt: 'Với $a \\ne 0$, số $\\overline{abc}$ bằng',
      options: [
        '$a \\times 100 + b \\times 10 + c$',
        '$a + b + c$',
        '$a \\times b \\times c$',
        '$a \\times 10 + b \\times 10 + c$',
      ],
      answer: 0,
      hints: ['$a$ là chữ số hàng trăm, $b$ hàng chục, $c$ hàng đơn vị.'],
      solution: 'Theo cấu tạo thập phân, $\\overline{abc} = a \\times 100 + b \\times 10 + c$.',
    },
    {
      type: 'number',
      prompt:
        'Trong số $4\\,444$, giá trị của chữ số $4$ ở hàng trăm gấp bao nhiêu lần giá trị của chữ số $4$ ở hàng chục?',
      answer: 10,
      hints: ['Viết giá trị của từng chữ số $4$ ra.'],
      solution:
        'Chữ số $4$ ở hàng trăm có giá trị $400$, ở hàng chục có giá trị $40$; $400 : 40 = 10$.',
    },
    {
      type: 'choice',
      prompt: 'Cách viết số La Mã nào sai?',
      options: ['IIII', 'XIV', 'XXIX', 'VIII'],
      answer: 0,
      hints: ['Chữ số I không được viết liền nhau quá ba lần.'],
      solution:
        'Số $4$ phải viết là IV; IIII là cách viết sai. Các cách viết còn lại là $14$, $29$ và $8$.',
    },
  ],
  takeaways: [
    'Hệ thập phân dùng mười chữ số $0$ đến $9$; cứ $10$ đơn vị ở một hàng bằng $1$ đơn vị ở hàng liền trước.',
    'Giá trị của một chữ số phụ thuộc vào vị trí (hàng) của nó trong số.',
    '$\\overline{ab} = a \\times 10 + b$, $\\ \\overline{abc} = a \\times 100 + b \\times 10 + c$ với $a \\ne 0$.',
    'Số La Mã từ $1$ đến $30$ ghép từ các thành phần I, V, X, IV, IX; giá trị bằng tổng giá trị các thành phần.',
  ],
};
