/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương VII: hệ thống hoá số thập phân, bốn phép tính với số thập phân, làm tròn và ước lượng, tỉ số và tỉ số phần trăm, kèm bài kiểm tra có bản đồ kĩ năng theo từng bài.',
  intro:
    'Chương VII mở rộng số thập phân sang cả số âm như $-2{,}75$, rồi cho em làm đủ bốn phép tính, làm tròn, ước lượng và giải các bài toán về tỉ số phần trăm như giảm giá hay lãi suất tiết kiệm. Bài này hệ thống lại toàn chương và cho em một bài kiểm tra tổng hợp; bản đồ kĩ năng sẽ chỉ ra bài nào em đã vững và bài nào cần ôn lại.',
  objectives: [
    'Hệ thống hoá kiến thức chương Số thập phân.',
    'Làm bài tập trắc nghiệm và tự luận tổng hợp: viết, so sánh số thập phân, tính giá trị biểu thức, tìm $x$, làm tròn và ước lượng.',
    'Vận dụng tỉ số và tỉ số phần trăm để giải các bài toán thực tế về giảm giá, lãi suất, tỉ lệ.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức chương VII',
      blocks: [
        {
          type: 'table',
          caption: 'Kiến thức chính theo từng bài',
          head: ['Bài', 'Kiến thức cần nhớ'],
          rows: [
            [
              'Bài 28. Số thập phân',
              'Phân số thập phân có mẫu là lũy thừa của $10$ và được viết dưới dạng số thập phân: $\\frac{-37}{1\\,000} = -0{,}037$. Số thập phân gồm phần số nguyên (bên trái dấu phẩy) và phần thập phân (bên phải dấu phẩy). Số âm $< 0 <$ số dương; nếu $a > b > 0$ thì $-a < -b$.',
            ],
            [
              'Bài 29. Tính toán với số thập phân',
              'Cộng, trừ, nhân, chia số thập phân theo quy tắc dấu như với số nguyên. Phép cộng và phép nhân có tính chất giao hoán, kết hợp, phân phối của phép nhân đối với phép cộng. Thứ tự thực hiện: trong ngoặc trước; nhân, chia trước; cộng, trừ sau.',
            ],
            [
              'Bài 30. Làm tròn và ước lượng',
              'Xét chữ số ngay bên phải hàng làm tròn: nhỏ hơn $5$ thì giữ nguyên, từ $5$ trở lên thì cộng thêm $1$ vào chữ số hàng làm tròn; bỏ các chữ số ở phần thập phân phía sau, thay các chữ số ở phần số nguyên phía sau bằng $0$. Số âm: làm tròn số đối rồi thêm dấu "$-$". Ước lượng: làm tròn các số rồi tính nhẩm.',
            ],
            [
              'Bài 31. Tỉ số và tỉ số phần trăm',
              'Tỉ số của $a$ và $b$ ($b \\ne 0$) là $a : b$; tỉ số phần trăm là $\\frac{a}{b} \\cdot 100\\%$ (hai đại lượng phải cùng đơn vị đo). $m\\%$ của $b$ là $b \\cdot \\frac{m}{100}$. Số có $m\\%$ bằng $a$ là $a : \\frac{m}{100}$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Những lỗi hay gặp',
          text: 'So sánh hai số âm: $-4{,}1 < -4{,}01$ vì $4{,}1 > 4{,}01$. Tích $0{,}4 \\cdot 0{,}3 = 0{,}12$ có hai chữ số ở phần thập phân, không phải $1{,}2$. Giảm giá $m\\%$ rồi tăng lại $m\\%$ không đưa giá về như cũ, vì hai lần tính phần trăm trên hai số khác nhau.',
        },
      ],
    },
    {
      heading: 'Các dạng bài thường gặp',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Viết phân số thập phân dưới dạng số thập phân và ngược lại; so sánh, sắp xếp các số thập phân.',
            'Tính giá trị biểu thức, tính một cách hợp lí (nhóm các số hạng hoặc thừa số cho tròn, dùng tính chất phân phối).',
            'Tìm $x$: dùng quan hệ giữa các thành phần của phép tính, như $x + a = b$ thì $x = b - a$; $x : a = b$ thì $x = b \\cdot a$.',
            'Làm tròn đến một hàng cho trước; ước lượng để chọn kết quả hợp lí hoặc kiểm tra kết quả.',
            'Tỉ số phần trăm: tìm $m\\%$ của một số, tìm một số khi biết $m\\%$ của nó, giảm giá, lãi suất tiết kiệm.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Giá sau khi giảm',
          text: 'Giảm giá $m\\%$ thì giá mới bằng $(100 - m)\\%$ giá cũ. Chẳng hạn giảm $15\\%$ thì giá mới bằng $85\\%$ giá cũ, nên giá cũ bằng giá mới chia cho $0{,}85$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Mỗi lượt có $12$ câu, ba câu cho mỗi bài từ Bài 28 đến Bài 31. Nhập số thập phân với dấu phẩy (ví dụ $-3{,}25$; gõ dấu - trước số âm); câu về phần trăm có thể nhập kèm dấu $\\%$. Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng tô màu từng bài để chỉ ra bài cần ôn lại.',
  },
  examples: [
    {
      problem: 'Tính một cách hợp lí: $(-0{,}25) \\cdot (-7{,}3) \\cdot 40$.',
      steps: [
        'Đổi chỗ các thừa số để nhân $(-0{,}25)$ với $40$ trước: $[(-0{,}25) \\cdot 40] \\cdot (-7{,}3)$.',
        '$(-0{,}25) \\cdot 40 = -10$.',
        '$(-10) \\cdot (-7{,}3) = 73$ (hai thừa số cùng dấu nên tích dương).',
      ],
      answer: 'Kết quả bằng $73$.',
    },
    {
      problem:
        'Lan mua $3$ quyển vở, giá $12\\,800$ đồng một quyển, và $2$ chiếc bút, giá $6\\,500$ đồng một chiếc. Hãy ước lượng số tiền Lan phải trả, rồi tính chính xác và làm tròn đến hàng nghìn.',
      steps: [
        'Ước lượng: $12\\,800 \\approx 13\\,000$ và $6\\,500 \\approx 7\\,000$, nên số tiền khoảng $3 \\cdot 13\\,000 + 2 \\cdot 7\\,000 = 53\\,000$ (đồng).',
        'Tính chính xác: $3 \\cdot 12\\,800 + 2 \\cdot 6\\,500 = 38\\,400 + 13\\,000 = 51\\,400$ (đồng), gần với số ước lượng nên hợp lí.',
        'Làm tròn đến hàng nghìn: chữ số hàng trăm là $4 < 5$, nên $51\\,400 \\approx 51\\,000$.',
      ],
      answer: 'Khoảng $53\\,000$ đồng; chính xác là $51\\,400$ đồng $\\approx 51\\,000$ đồng.',
    },
    {
      problem:
        'Một chiếc quạt giá $500\\,000$ đồng. Cửa hàng tăng giá $10\\%$, sau đó lại giảm giá $10\\%$ so với giá mới. Giá cuối cùng của chiếc quạt là bao nhiêu? So với giá ban đầu thì đắt hơn hay rẻ hơn?',
      steps: [
        'Sau khi tăng: giá mới bằng $110\\%$ giá cũ, tức là $500\\,000 \\cdot \\frac{110}{100} = 550\\,000$ (đồng).',
        'Số tiền giảm là $10\\%$ của $550\\,000$: $550\\,000 \\cdot \\frac{10}{100} = 55\\,000$ (đồng).',
        'Giá cuối cùng: $550\\,000 - 55\\,000 = 495\\,000$ (đồng), rẻ hơn giá ban đầu $5\\,000$ đồng.',
      ],
      answer:
        'Giá cuối cùng là $495\\,000$ đồng, rẻ hơn giá ban đầu $5\\,000$ đồng (bằng $1\\%$ giá ban đầu).',
    },
    {
      problem:
        'Một trường có $120$ học sinh nữ, chiếm $48\\%$ số học sinh toàn trường. Hỏi trường có bao nhiêu học sinh?',
      steps: [
        'Đây là bài toán tìm một số khi biết $48\\%$ của nó bằng $120$.',
        'Số học sinh toàn trường: $120 : \\frac{48}{100} = \\frac{120 \\cdot 100}{48} = 250$.',
      ],
      answer: 'Trường có $250$ học sinh.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Số thập phân nào bằng phân số thập phân $\\frac{-37}{1\\,000}$?',
      options: ['$-0{,}37$', '$-0{,}037$', '$-3{,}7$', '$0{,}037$'],
      answer: 1,
      hints: [
        'Mẫu $1\\,000$ có ba chữ số $0$, nên phần thập phân có ba chữ số.',
        'Giữ nguyên dấu "$-$" của phân số.',
      ],
      solution:
        'Mẫu có ba chữ số $0$: tách ba chữ số ở bên phải của tử $37$ (thêm chữ số $0$ ở trước): $\\frac{-37}{1\\,000} = -0{,}037$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        '$-2{,}5 < -2{,}05$',
        '$0{,}7 > 0{,}69$',
        '$-0{,}3 > 0{,}1$',
        '$1{,}25 = 1{,}250$',
        '$-4{,}1 > -4{,}01$',
      ],
      answers: [0, 1, 3],
      hints: [
        'Mọi số âm đều nhỏ hơn mọi số dương.',
        'Với hai số âm, số nào có số đối lớn hơn thì nhỏ hơn.',
      ],
      solution:
        '$2{,}5 > 2{,}05$ nên $-2{,}5 < -2{,}05$ (đúng). $0{,}70 > 0{,}69$ (đúng). $-0{,}3 < 0 < 0{,}1$ (sai). Thêm chữ số $0$ vào cuối phần thập phân không đổi giá trị: $1{,}25 = 1{,}250$ (đúng). $4{,}1 > 4{,}01$ nên $-4{,}1 < -4{,}01$ (sai).',
    },
    {
      type: 'number',
      prompt: 'Tính một cách hợp lí: $(-4{,}5) \\cdot 2{,}4 + 4{,}5 \\cdot (-7{,}6)$.',
      answer: -45,
      hints: [
        '$4{,}5 \\cdot (-7{,}6) = (-4{,}5) \\cdot 7{,}6$.',
        'Đặt thừa số chung $(-4{,}5)$ ra ngoài: tính chất phân phối.',
      ],
      solution:
        '$(-4{,}5) \\cdot 2{,}4 + (-4{,}5) \\cdot 7{,}6 = (-4{,}5) \\cdot (2{,}4 + 7{,}6) = (-4{,}5) \\cdot 10 = -45$.',
    },
    {
      type: 'number',
      prompt: 'Tính $12{,}5 - 3{,}2 \\cdot (-1{,}5) : 0{,}6$.',
      answer: 20.5,
      hints: [
        'Nhân, chia trước (từ trái sang phải); trừ sau.',
        'Tính $3{,}2 \\cdot (-1{,}5)$ trước, rồi chia kết quả cho $0{,}6$.',
      ],
      solution:
        '$3{,}2 \\cdot (-1{,}5) = -4{,}8$; $(-4{,}8) : 0{,}6 = -8$; $12{,}5 - (-8) = 12{,}5 + 8 = 20{,}5$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $x$, biết $x + 2{,}75 = -1{,}4$.',
      answer: -4.15,
      hints: ['Số hạng chưa biết bằng tổng trừ đi số hạng đã biết.'],
      solution: '$x = -1{,}4 - 2{,}75 = -(1{,}40 + 2{,}75) = -4{,}15$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $x$, biết $x : (-0{,}25) = 3{,}2$.',
      answer: -0.8,
      hints: ['Số bị chia bằng thương nhân với số chia.', 'Hai số khác dấu nên tích âm.'],
      solution: '$x = 3{,}2 \\cdot (-0{,}25) = -0{,}8$.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số $3{,}14159$ đến hàng phần nghìn.',
      answer: 3.142,
      hints: [
        'Chữ số hàng phần nghìn là $1$; xét chữ số ngay bên phải nó.',
        'Chữ số bên phải là $5$, nên cộng thêm $1$ vào chữ số hàng phần nghìn.',
      ],
      solution:
        'Chữ số hàng phần nghìn là $1$, chữ số bên phải là $5 \\ge 5$, nên $3{,}14159 \\approx 3{,}142$.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số $-0{,}0461$ đến hàng phần trăm.',
      answer: -0.05,
      hints: [
        'Làm tròn số đối $0{,}0461$ rồi thêm dấu "$-$".',
        'Chữ số hàng phần trăm là $4$, chữ số bên phải nó là $6$.',
      ],
      solution: 'Vì $6 \\ge 5$ nên $0{,}0461 \\approx 0{,}05$; vậy $-0{,}0461 \\approx -0{,}05$.',
    },
    {
      type: 'choice',
      prompt:
        'Không tính chính xác, hãy dùng ước lượng để chọn kết quả đúng của $31{,}8 \\cdot 4{,}9 + 19{,}7$.',
      options: ['$17{,}552$', '$175{,}52$', '$1\\,755{,}2$', '$155{,}82$'],
      answer: 1,
      hints: [
        'Làm tròn: $31{,}8 \\approx 32$, $4{,}9 \\approx 5$, $19{,}7 \\approx 20$.',
        'Kết quả gần $32 \\cdot 5 + 20$.',
      ],
      solution:
        'Ước lượng $32 \\cdot 5 + 20 = 180$, nên chọn $175{,}52$. Kiểm tra: $31{,}8 \\cdot 4{,}9 = 155{,}82$; $155{,}82 + 19{,}7 = 175{,}52$. Số $155{,}82$ chỉ là tích, chưa cộng $19{,}7$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số với tỉ số phần trăm bằng nó.',
      left: ['$\\frac{3}{4}$', '$0{,}06$', '$1{,}2$', '$\\frac{1}{8}$'],
      right: ['$12{,}5\\%$', '$60\\%$', '$75\\%$', '$120\\%$', '$6\\%$'],
      pairs: [
        [0, 2],
        [1, 4],
        [2, 3],
        [3, 0],
      ],
      hints: ['Nhân mỗi số với $100$ rồi viết thêm kí hiệu $\\%$.'],
      solution:
        '$\\frac{3}{4} \\cdot 100\\% = 75\\%$; $0{,}06 \\cdot 100\\% = 6\\%$; $1{,}2 \\cdot 100\\% = 120\\%$; $\\frac{1}{8} \\cdot 100\\% = 12{,}5\\%$. Không số nào ứng với $60\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Một khung ảnh hình chữ nhật có chiều dài $1{,}2$ m và chiều rộng $80$ cm. Tính tỉ số phần trăm của chiều dài và chiều rộng.',
      answer: 150,
      unit: '%',
      hints: [
        'Đổi hai số đo về cùng một đơn vị trước: $80$ cm $= 0{,}8$ m.',
        'Tỉ số phần trăm là $\\frac{1{,}2}{0{,}8} \\cdot 100\\%$.',
      ],
      solution:
        '$80$ cm $= 0{,}8$ m; $\\frac{1{,}2}{0{,}8} \\cdot 100\\% = 1{,}5 \\cdot 100\\% = 150\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Lớp 6A có $40$ học sinh, trong đó số học sinh nữ chiếm $35\\%$. Lớp 6A có bao nhiêu học sinh nam?',
      answer: 26,
      hints: [
        'Tính số học sinh nữ: $35\\%$ của $40$.',
        'Số học sinh nam bằng sĩ số trừ số học sinh nữ.',
      ],
      solution:
        'Số học sinh nữ: $40 \\cdot \\frac{35}{100} = 14$. Số học sinh nam: $40 - 14 = 26$.',
    },
    {
      type: 'number',
      prompt:
        'Một chiếc xe đạp được giảm giá $15\\%$, giá mới là $1\\,870\\,000$ đồng. Giá ban đầu của chiếc xe đạp là bao nhiêu đồng?',
      answer: 2200000,
      unit: 'đồng',
      hints: [
        'Giảm $15\\%$ thì giá mới bằng $85\\%$ giá ban đầu.',
        'Tìm một số biết $85\\%$ của nó bằng $1\\,870\\,000$.',
      ],
      solution:
        'Giá mới bằng $100\\% - 15\\% = 85\\%$ giá ban đầu. Giá ban đầu: $1\\,870\\,000 : \\frac{85}{100} = \\frac{1\\,870\\,000 \\cdot 100}{85} = 2\\,200\\,000$ (đồng).',
    },
    {
      type: 'number',
      prompt:
        'Bác Hà gửi tiết kiệm $50\\,000\\,000$ đồng với lãi suất $6{,}2\\%$ một năm. Sau một năm, bác rút cả tiền gửi và tiền lãi. Bác rút được tất cả bao nhiêu đồng?',
      answer: 53100000,
      unit: 'đồng',
      hints: [
        'Tiền lãi bằng $6{,}2\\%$ của số tiền gửi.',
        'Cộng tiền lãi vào số tiền gửi ban đầu.',
      ],
      solution:
        'Tiền lãi: $50\\,000\\,000 \\cdot \\frac{6{,}2}{100} = 3\\,100\\,000$ (đồng). Tổng số tiền: $50\\,000\\,000 + 3\\,100\\,000 = 53\\,100\\,000$ (đồng).',
    },
  ],
  takeaways: [
    'Số thập phân âm so sánh qua số đối: số có số đối lớn hơn thì nhỏ hơn.',
    'Phép tính với số thập phân theo quy tắc dấu, tính chất và thứ tự thực hiện như với số nguyên; nhóm các số thích hợp để tính nhanh.',
    'Làm tròn theo chữ số ngay bên phải hàng làm tròn; ước lượng giúp kiểm tra kết quả có hợp lí không.',
    '$m\\%$ của $b$ là $b \\cdot \\frac{m}{100}$; số có $m\\%$ bằng $a$ là $a : \\frac{m}{100}$; giảm giá $m\\%$ thì giá mới bằng $(100 - m)\\%$ giá cũ.',
  ],
};
