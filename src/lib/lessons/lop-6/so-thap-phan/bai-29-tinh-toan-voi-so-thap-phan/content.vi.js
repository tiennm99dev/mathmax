/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Cộng, trừ, nhân, chia số thập phân (kể cả số thập phân âm), các tính chất của phép tính và thứ tự thực hiện phép tính.',
  intro:
    'Lúc $6$ giờ sáng, nhiệt độ ở Sa Pa là $-2{,}5^\\circ\\mathrm{C}$; đến trưa nhiệt độ tăng thêm $6{,}8^\\circ\\mathrm{C}$. Buổi trưa ở Sa Pa là bao nhiêu độ? Để trả lời, ta cần cộng một số thập phân âm với một số thập phân dương. Ở tiểu học em đã cộng, trừ, nhân, chia số thập phân dương; bài này mở rộng các phép tính đó cho mọi số thập phân, theo đúng những quy tắc dấu đã học với số nguyên.',
  objectives: [
    'Cộng, trừ hai số thập phân, kể cả số thập phân âm.',
    'Nhân, chia hai số thập phân và xác định dấu của tích, thương.',
    'Vận dụng tính chất giao hoán, kết hợp, phân phối và thứ tự thực hiện phép tính để tính nhanh, tính đúng.',
  ],
  sections: [
    {
      heading: 'Cộng, trừ số thập phân',
      blocks: [
        {
          type: 'p',
          text: 'Muốn cộng (trừ) hai số thập phân dương, ta làm như ở tiểu học: viết các số thẳng cột sao cho các chữ số cùng hàng thẳng cột với nhau và dấu phẩy thẳng cột, cộng (trừ) như cộng (trừ) số tự nhiên, rồi đặt dấu phẩy ở kết quả thẳng cột với các dấu phẩy.',
        },
        {
          type: 'p',
          text: 'Phép cộng, phép trừ số thập phân bất kì được thực hiện theo các quy tắc như với số nguyên:',
        },
        {
          type: 'list',
          items: [
            'Cộng hai số thập phân âm: cộng hai số đối của chúng rồi thêm dấu "$-$" trước kết quả. Chẳng hạn $(-3{,}75) + (-1{,}2) = -(3{,}75 + 1{,}2) = -4{,}95$.',
            'Cộng hai số thập phân khác dấu: nếu số dương lớn hơn số đối của số âm thì lấy số dương trừ đi số đối của số âm; nếu số dương nhỏ hơn số đối của số âm thì lấy số đối của số âm trừ đi số dương rồi thêm dấu "$-$" trước kết quả. Chẳng hạn $(-2{,}5) + 6{,}8 = 6{,}8 - 2{,}5 = 4{,}3$.',
            'Trừ hai số thập phân: cộng số bị trừ với số đối của số trừ, $a - b = a + (-b)$. Chẳng hạn $2{,}5 - 7{,}82 = 2{,}5 + (-7{,}82) = -(7{,}82 - 2{,}5) = -5{,}32$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai khi đặt tính',
          text: 'Phải đặt dấu phẩy thẳng cột, không phải chữ số cuối thẳng cột. Với $3{,}25 + 12{,}7$, chữ số $7$ (hàng phần mười) phải đứng dưới chữ số $2$ (hàng phần mười): có thể viết $12{,}7 = 12{,}70$ cho dễ nhìn. Kết quả là $15{,}95$.',
        },
      ],
    },
    {
      heading: 'Nhân, chia số thập phân',
      blocks: [
        {
          type: 'p',
          text: 'Muốn nhân hai số thập phân dương, ta nhân như nhân hai số tự nhiên (tạm bỏ dấu phẩy), rồi đếm xem cả hai thừa số có bao nhiêu chữ số ở phần thập phân và dùng dấu phẩy tách ở tích bấy nhiêu chữ số kể từ phải sang trái. Chẳng hạn $125 \\cdot 34 = 4\\,250$, hai thừa số $1{,}25$ và $3{,}4$ có tất cả $2 + 1 = 3$ chữ số ở phần thập phân, nên $1{,}25 \\cdot 3{,}4 = 4{,}250 = 4{,}25$.',
        },
        {
          type: 'p',
          text: 'Muốn chia một số thập phân cho một số thập phân dương, ta chuyển dấu phẩy ở cả số bị chia và số chia sang bên phải cùng một số chữ số cho đến khi số chia là số tự nhiên, rồi chia như ở tiểu học. Chẳng hạn $4{,}5 : 0{,}15 = 450 : 15 = 30$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc dấu',
          text: 'Phép nhân, phép chia số thập phân được thực hiện như với số nguyên: tích (thương) của hai số cùng dấu là số dương; tích (thương) của hai số khác dấu là số âm. Chẳng hạn $(-1{,}25) \\cdot 0{,}8 = -1$; $(-4{,}5) : (-0{,}15) = 30$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Nhân một số thập phân với $10$, $100$, $1\\,000$, ... chỉ cần chuyển dấu phẩy sang phải $1$, $2$, $3$, ... chữ số; nhân với $0{,}1$, $0{,}01$, $0{,}001$, ... thì chuyển dấu phẩy sang trái $1$, $2$, $3$, ... chữ số: $-3{,}7 \\cdot 100 = -370$; $52{,}4 \\cdot 0{,}01 = 0{,}524$.',
        },
      ],
    },
    {
      heading: 'Tính chất và thứ tự thực hiện phép tính',
      blocks: [
        {
          type: 'p',
          text: 'Phép cộng và phép nhân số thập phân có các tính chất giống như với số nguyên. Với mọi số thập phân $a$, $b$, $c$:',
        },
        {
          type: 'table',
          head: ['Tính chất', 'Phép cộng', 'Phép nhân'],
          rows: [
            ['Giao hoán', '$a + b = b + a$', '$a \\cdot b = b \\cdot a$'],
            [
              'Kết hợp',
              '$(a + b) + c = a + (b + c)$',
              '$(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$',
            ],
            ['Cộng với $0$, nhân với $1$', '$a + 0 = a$', '$a \\cdot 1 = a$'],
          ],
        },
        {
          type: 'tex',
          tex: 'a \\cdot (b + c) = a \\cdot b + a \\cdot c \\qquad \\text{(tính chất phân phối của phép nhân đối với phép cộng)}',
        },
        {
          type: 'p',
          text: 'Thứ tự thực hiện phép tính và quy tắc dấu ngoặc cũng như với số nguyên: trong ngoặc trước, ngoài ngoặc sau; nhân, chia trước, cộng, trừ sau. Nhờ các tính chất, ta có thể nhóm các số để tính nhanh: $2{,}5 \\cdot (-3{,}7) \\cdot 4 = (2{,}5 \\cdot 4) \\cdot (-3{,}7) = 10 \\cdot (-3{,}7) = -37$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng đặt tính thẳng cột',
    instruction:
      'Chọn phép tính (cộng, trừ hoặc nhân), bật "Có số thập phân âm" nếu muốn luyện quy tắc dấu. Với số âm, trước hết chọn dấu của kết quả. Sau đó bảng tự viết hai số thẳng cột theo dấu phẩy; em điền từng chữ số của kết quả từ phải sang trái, mỗi ô được kiểm tra ngay và cho biết cột đó tính thế nào. Với phép nhân, em chọn chỗ đặt dấu phẩy trong tích.',
  },
  examples: [
    {
      problem: 'Tính: a) $(-3{,}75) + (-1{,}2)$; b) $5{,}4 + (-8{,}65)$.',
      steps: [
        'a) Hai số cùng âm: cộng hai số đối $3{,}75 + 1{,}2 = 4{,}95$ rồi thêm dấu "$-$": $(-3{,}75) + (-1{,}2) = -4{,}95$.',
        'b) Hai số khác dấu, số dương $5{,}4$ nhỏ hơn số đối $8{,}65$ của số âm: lấy $8{,}65 - 5{,}4 = 3{,}25$ rồi thêm dấu "$-$".',
        'Vậy $5{,}4 + (-8{,}65) = -3{,}25$.',
      ],
      answer: 'a) $-4{,}95$; b) $-3{,}25$.',
    },
    {
      problem: 'Tính: $2{,}5 - 7{,}82$.',
      steps: [
        'Đổi phép trừ thành phép cộng với số đối: $2{,}5 - 7{,}82 = 2{,}5 + (-7{,}82)$.',
        'Số dương $2{,}5$ nhỏ hơn $7{,}82$, nên lấy $7{,}82 - 2{,}50 = 5{,}32$ rồi thêm dấu "$-$".',
      ],
      answer: '$2{,}5 - 7{,}82 = -5{,}32$.',
    },
    {
      problem: 'Tính: a) $(-1{,}25) \\cdot 0{,}8$; b) $(-4{,}5) : (-0{,}15)$.',
      steps: [
        'a) Hai thừa số khác dấu nên tích âm. $125 \\cdot 8 = 1\\,000$; hai thừa số có $2 + 1 = 3$ chữ số ở phần thập phân, nên $1{,}25 \\cdot 0{,}8 = 1{,}000 = 1$. Vậy tích bằng $-1$.',
        'b) Hai số cùng dấu nên thương dương. Chuyển dấu phẩy của cả hai số sang phải hai chữ số: $4{,}5 : 0{,}15 = 450 : 15 = 30$.',
      ],
      answer: 'a) $-1$; b) $30$.',
    },
    {
      problem: 'Tính giá trị biểu thức $1{,}6 - 2{,}4 : 0{,}8 + (-0{,}5) \\cdot 3$.',
      steps: [
        'Làm phép chia và phép nhân trước: $2{,}4 : 0{,}8 = 24 : 8 = 3$; $(-0{,}5) \\cdot 3 = -1{,}5$.',
        'Biểu thức trở thành $1{,}6 - 3 + (-1{,}5)$.',
        '$1{,}6 - 3 = -1{,}4$; $-1{,}4 + (-1{,}5) = -2{,}9$.',
      ],
      answer: 'Giá trị biểu thức là $-2{,}9$.',
    },
    {
      problem: 'Tính một cách hợp lí: $12{,}7 \\cdot 3{,}6 + 12{,}7 \\cdot 6{,}4$.',
      steps: [
        'Hai tích có chung thừa số $12{,}7$; dùng tính chất phân phối: $12{,}7 \\cdot (3{,}6 + 6{,}4)$.',
        '$3{,}6 + 6{,}4 = 10$, nên biểu thức bằng $12{,}7 \\cdot 10 = 127$.',
      ],
      answer: '$127$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính $(-6{,}25) + (-3{,}8)$.',
      answer: -10.05,
      hints: ['Hai số cùng âm: cộng hai số đối của chúng rồi thêm dấu "$-$".'],
      solution: '$6{,}25 + 3{,}80 = 10{,}05$, nên $(-6{,}25) + (-3{,}8) = -10{,}05$.',
    },
    {
      type: 'number',
      prompt: 'Tính $4{,}13 - 9{,}5$.',
      answer: -5.37,
      hints: [
        'Viết $4{,}13 - 9{,}5 = 4{,}13 + (-9{,}5)$.',
        'Số dương nhỏ hơn số đối của số âm, nên kết quả là số âm.',
      ],
      solution: '$4{,}13 - 9{,}5 = -(9{,}50 - 4{,}13) = -5{,}37$.',
    },
    {
      type: 'number',
      prompt:
        'Một buổi sáng nhiệt độ ở Sa Pa là $-2{,}5^\\circ\\mathrm{C}$, đến trưa tăng thêm $6{,}8^\\circ\\mathrm{C}$. Nhiệt độ buổi trưa là bao nhiêu độ C?',
      answer: 4.3,
      hints: ['Tính $(-2{,}5) + 6{,}8$: hai số khác dấu, số dương lớn hơn.'],
      solution:
        '$(-2{,}5) + 6{,}8 = 6{,}8 - 2{,}5 = 4{,}3$. Buổi trưa nhiệt độ là $4{,}3^\\circ\\mathrm{C}$.',
    },
    {
      type: 'number',
      prompt: 'Tính $(-0{,}25) \\cdot (-1{,}6)$.',
      answer: 0.4,
      hints: [
        'Hai thừa số cùng dấu nên tích dương.',
        'Tính $25 \\cdot 16$ rồi tách $3$ chữ số ở phần thập phân.',
      ],
      solution:
        '$25 \\cdot 16 = 400$; tách $2 + 1 = 3$ chữ số: $0{,}400 = 0{,}4$. Tích dương nên bằng $0{,}4$.',
    },
    {
      type: 'number',
      prompt: 'Tính $(-9{,}36) : 1{,}2$.',
      answer: -7.8,
      hints: [
        'Hai số khác dấu nên thương âm.',
        'Chuyển dấu phẩy của cả hai số sang phải một chữ số: $93{,}6 : 12$.',
      ],
      solution:
        '$9{,}36 : 1{,}2 = 93{,}6 : 12 = 7{,}8$. Thương âm nên $(-9{,}36) : 1{,}2 = -7{,}8$.',
    },
    {
      type: 'choice',
      prompt: 'Kết quả của phép tính $(-2{,}4) \\cdot (-0{,}5) \\cdot (-1{,}1)$ là',
      options: ['$1{,}32$', '$-1{,}32$', '$-13{,}2$', '$0{,}132$'],
      answer: 1,
      hints: [
        'Nhân lần lượt từ trái sang phải và theo dõi dấu sau mỗi lần nhân.',
        'Có ba thừa số âm.',
      ],
      solution:
        '$(-2{,}4) \\cdot (-0{,}5) = 1{,}2$ (cùng dấu, tích dương); $1{,}2 \\cdot (-1{,}1) = -1{,}32$ (khác dấu, tích âm). Phần thập phân có $1 + 1 + 1 = 3$ chữ số trước khi bỏ chữ số $0$ cuối: $2{,}4 \\cdot 0{,}5 \\cdot 1{,}1 = 1{,}320$.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Nam đặt tính $3{,}25 + 12{,}7$ bằng cách viết chữ số cuối của hai số thẳng cột. Kết quả đúng của phép tính là',
      options: ['$15{,}95$', '$4{,}52$', '$15{,}32$', '$1{,}595$'],
      answer: 0,
      hints: ['Phải viết sao cho dấu phẩy thẳng cột: $12{,}7 = 12{,}70$.'],
      solution:
        '$3{,}25 + 12{,}70 = 15{,}95$. Đặt chữ số cuối thẳng cột là cộng $325 + 127$, cho kết quả sai $4{,}52$.',
    },
    {
      type: 'number',
      prompt: 'Tính một cách hợp lí: $12{,}7 \\cdot 3{,}6 + 12{,}7 \\cdot 6{,}4$.',
      answer: 127,
      hints: ['Hai tích có chung thừa số $12{,}7$: dùng tính chất phân phối.'],
      solution:
        '$12{,}7 \\cdot 3{,}6 + 12{,}7 \\cdot 6{,}4 = 12{,}7 \\cdot (3{,}6 + 6{,}4) = 12{,}7 \\cdot 10 = 127$.',
    },
    {
      type: 'number',
      prompt: 'Tính $3{,}5 - (-1{,}25) \\cdot 4$.',
      answer: 8.5,
      hints: ['Nhân trước, trừ sau.', '$(-1{,}25) \\cdot 4 = -5$.'],
      solution: '$(-1{,}25) \\cdot 4 = -5$, nên $3{,}5 - (-5) = 3{,}5 + 5 = 8{,}5$.',
    },
    {
      type: 'number',
      prompt: 'Tính $(-4{,}5) : (-0{,}15) + 1{,}5 \\cdot (-2)$.',
      answer: 27,
      hints: ['Làm phép chia và phép nhân trước rồi mới cộng.'],
      solution: '$(-4{,}5) : (-0{,}15) = 30$; $1{,}5 \\cdot (-2) = -3$; $30 + (-3) = 27$.',
    },
  ],
  takeaways: [
    'Đặt tính cộng, trừ: dấu phẩy thẳng cột; có thể viết thêm chữ số $0$ cho phần thập phân dài bằng nhau.',
    'Cộng, trừ số thập phân bất kì theo quy tắc như số nguyên; $a - b = a + (-b)$.',
    'Nhân: nhân như số tự nhiên rồi tách ở tích số chữ số thập phân bằng tổng số chữ số thập phân của hai thừa số. Cùng dấu thì dương, khác dấu thì âm.',
    'Tính chất giao hoán, kết hợp, phân phối và thứ tự thực hiện phép tính giống như với số nguyên.',
  ],
};
