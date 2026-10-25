/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về số thập phân: đọc, viết, so sánh, cộng trừ nhân chia số thập phân, làm tròn và ước lượng kết quả.',
  intro:
    'Bài luyện tập này ôn lại ba bài vừa học: số thập phân (Bài 28), tính toán với số thập phân (Bài 29), làm tròn và ước lượng (Bài 30). Em sẽ viết và so sánh số thập phân, tính giá trị biểu thức, tính nhanh bằng các tính chất, làm tròn kết quả và dùng ước lượng để kiểm tra.',
  objectives: [
    'Chuyển đổi giữa phân số thập phân và số thập phân; so sánh, sắp xếp các số thập phân.',
    'Cộng, trừ, nhân, chia số thập phân theo đúng quy tắc dấu và thứ tự thực hiện phép tính; tính nhanh nhờ các tính chất.',
    'Làm tròn số thập phân đến hàng cho trước và ước lượng kết quả phép tính.',
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
              'Phân số thập phân',
              'Mẫu là lũy thừa của $10$; mẫu có bao nhiêu chữ số $0$ thì số thập phân có bấy nhiêu chữ số ở phần thập phân: $\\frac{-2\\,025}{100} = -20{,}25$',
            ],
            [
              'So sánh',
              'Số âm $< 0 <$ số dương; nếu $a > b > 0$ thì $-a < -b$; số dương: so sánh phần số nguyên, rồi từng hàng phần mười, phần trăm, ...',
            ],
            [
              'Cộng, trừ',
              'Như với số nguyên: hai số âm thì cộng hai số đối rồi thêm dấu "$-$"; $a - b = a + (-b)$',
            ],
            [
              'Nhân, chia',
              'Cùng dấu thì kết quả dương, khác dấu thì kết quả âm; tích có số chữ số thập phân bằng tổng của hai thừa số',
            ],
            [
              'Làm tròn',
              'Chữ số bên phải hàng làm tròn nhỏ hơn $5$ thì giữ nguyên, từ $5$ trở lên thì cộng $1$; số âm: làm tròn số đối rồi thêm dấu "$-$"',
            ],
            ['Ước lượng', 'Làm tròn các số trong phép tính thành số tròn rồi tính nhẩm'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Thứ tự thực hiện phép tính vẫn là nhân, chia trước; cộng, trừ sau: $2{,}5 \\cdot (-1{,}6) - 4{,}2 : (-0{,}7) = -4 - (-6) = 2$. Khi làm tròn đến hàng phần mười, giữ chữ số ở hàng đó, kể cả khi nó là $0$: $12{,}96 \\approx 13{,}0$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện ngẫu nhiên',
    instruction:
      'Mỗi lượt có $12$ câu trộn từ Bài 28, Bài 29 và Bài 30. Nhập số thập phân với dấu phẩy (ví dụ $-3{,}25$; gõ dấu - trước số âm). Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng cho biết bài nào cần ôn thêm.',
  },
  examples: [
    {
      problem: 'Tính một cách hợp lí: $(-3{,}8) + 2{,}5 + (-6{,}2) + 7{,}5$.',
      steps: [
        'Đổi chỗ và nhóm các số hạng để được số tròn: $[(-3{,}8) + (-6{,}2)] + (2{,}5 + 7{,}5)$.',
        '$(-3{,}8) + (-6{,}2) = -10$; $2{,}5 + 7{,}5 = 10$.',
        '$-10 + 10 = 0$.',
      ],
      answer: 'Kết quả bằng $0$.',
    },
    {
      problem: 'Tính một cách hợp lí: $1{,}2 \\cdot (-3{,}5) + 1{,}2 \\cdot (-6{,}5)$.',
      steps: [
        'Hai tích có chung thừa số $1{,}2$, dùng tính chất phân phối: $1{,}2 \\cdot [(-3{,}5) + (-6{,}5)]$.',
        '$(-3{,}5) + (-6{,}5) = -10$, nên biểu thức bằng $1{,}2 \\cdot (-10) = -12$.',
      ],
      answer: 'Kết quả bằng $-12$.',
    },
    {
      problem:
        'Một vòi nước chảy mỗi phút được $12{,}6$ lít. Hãy ước lượng lượng nước vòi chảy trong $19{,}5$ phút, rồi tính chính xác và làm tròn kết quả đến hàng đơn vị.',
      steps: [
        'Ước lượng: $12{,}6 \\approx 13$; $19{,}5 \\approx 20$, nên lượng nước khoảng $13 \\cdot 20 = 260$ (lít).',
        'Tính chính xác: $12{,}6 \\cdot 19{,}5 = 245{,}7$ (lít). Kết quả này gần $260$, hợp lí.',
        'Làm tròn đến hàng đơn vị: chữ số hàng phần mười là $7 \\ge 5$, nên $245{,}7 \\approx 246$.',
      ],
      answer: 'Khoảng $260$ lít; chính xác là $245{,}7$ lít $\\approx 246$ lít.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Viết phân số thập phân $\\frac{-2\\,025}{100}$ dưới dạng số thập phân.',
      answer: -20.25,
      hints: ['Mẫu $100$ có hai chữ số $0$: tách hai chữ số ở bên phải của tử.'],
      solution: '$\\frac{-2\\,025}{100} = -20{,}25$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các số sau theo thứ tự từ nhỏ đến lớn.',
      items: ['$-3{,}07$', '$-3{,}7$', '$0{,}307$', '$-0{,}37$', '$3{,}07$'],
      answer: [1, 0, 3, 2, 4],
      hints: [
        'Các số âm đứng trước các số dương.',
        'So sánh các số âm qua số đối: $3{,}7 > 3{,}07 > 0{,}37$.',
      ],
      solution:
        '$3{,}7 > 3{,}07 > 0{,}37$ nên $-3{,}7 < -3{,}07 < -0{,}37$; $0{,}307 < 3{,}07$. Vậy $-3{,}7 < -3{,}07 < -0{,}37 < 0{,}307 < 3{,}07$.',
    },
    {
      type: 'number',
      prompt: 'Tính $(-12{,}5) + 7{,}25$.',
      answer: -5.25,
      hints: ['Hai số khác dấu; số đối của số âm ($12{,}5$) lớn hơn số dương.'],
      solution: '$(-12{,}5) + 7{,}25 = -(12{,}50 - 7{,}25) = -5{,}25$.',
    },
    {
      type: 'number',
      prompt: 'Tính $0{,}4 \\cdot (-12{,}3) \\cdot (-2{,}5)$.',
      answer: 12.3,
      hints: ['Đổi chỗ để nhân $0{,}4$ với $(-2{,}5)$ trước.', 'Có hai thừa số âm.'],
      solution: '$0{,}4 \\cdot (-2{,}5) = -1$, nên tích bằng $(-1) \\cdot (-12{,}3) = 12{,}3$.',
    },
    {
      type: 'number',
      prompt: 'Tính $(-2{,}8) : 0{,}35$.',
      answer: -8,
      hints: [
        'Hai số khác dấu nên thương âm.',
        'Chuyển dấu phẩy của cả hai số sang phải hai chữ số: $280 : 35$.',
      ],
      solution: '$2{,}8 : 0{,}35 = 280 : 35 = 8$, nên $(-2{,}8) : 0{,}35 = -8$.',
    },
    {
      type: 'number',
      prompt: 'Tính một cách hợp lí: $4{,}35 + 6{,}98 + 5{,}65 - 0{,}98$.',
      answer: 16,
      hints: ['Nhóm $4{,}35$ với $5{,}65$, và $6{,}98$ với $-0{,}98$.'],
      solution: '$(4{,}35 + 5{,}65) + (6{,}98 - 0{,}98) = 10 + 6 = 16$.',
    },
    {
      type: 'number',
      prompt: 'Tính $2{,}5 \\cdot (-1{,}6) - 4{,}2 : (-0{,}7)$.',
      answer: 2,
      hints: ['Nhân, chia trước; trừ sau.', '$4{,}2 : (-0{,}7) = -6$.'],
      solution: '$2{,}5 \\cdot (-1{,}6) = -4$; $4{,}2 : (-0{,}7) = -6$; $-4 - (-6) = -4 + 6 = 2$.',
    },
    {
      type: 'number',
      prompt:
        'Nhiệt độ ở một trạm nghiên cứu lúc $6$ giờ sáng là $-15{,}6^\\circ\\mathrm{C}$, đến trưa tăng thêm $4{,}8^\\circ\\mathrm{C}$, đến tối lại giảm $7{,}25^\\circ\\mathrm{C}$ so với buổi trưa. Nhiệt độ buổi tối là bao nhiêu độ C?',
      answer: -18.05,
      hints: ['Tính $(-15{,}6) + 4{,}8 - 7{,}25$ từ trái sang phải.'],
      solution:
        '$(-15{,}6) + 4{,}8 = -10{,}8$; $-10{,}8 - 7{,}25 = -18{,}05$. Nhiệt độ buổi tối là $-18{,}05^\\circ\\mathrm{C}$.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn $-15{,}0748$ đến hàng phần trăm.',
      answer: -15.07,
      hints: [
        'Làm tròn số đối $15{,}0748$ rồi đặt dấu "$-$".',
        'Chữ số hàng phần trăm là $7$, chữ số bên phải nó là $4$.',
      ],
      solution: '$4 < 5$ nên $15{,}0748 \\approx 15{,}07$; vậy $-15{,}0748 \\approx -15{,}07$.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn $2\\,357{,}682$ đến hàng trăm.',
      answer: 2400,
      hints: [
        'Chữ số hàng trăm là $3$, chữ số hàng chục (ngay bên phải) là $5$.',
        'Bỏ phần thập phân; các chữ số hàng chục, hàng đơn vị thay bằng $0$.',
      ],
      solution: 'Vì $5 \\ge 5$ nên $3$ thành $4$: $2\\,357{,}682 \\approx 2\\,400$.',
    },
    {
      type: 'choice',
      prompt: 'Bằng cách ước lượng, hãy chọn kết quả đúng của phép tính $49{,}8 \\cdot 20{,}3$.',
      options: ['$101{,}094$', '$1\\,010{,}94$', '$10\\,109{,}4$', '$10{,}1094$'],
      answer: 1,
      hints: ['$49{,}8 \\approx 50$ và $20{,}3 \\approx 20$.'],
      solution:
        '$49{,}8 \\cdot 20{,}3 \\approx 50 \\cdot 20 = 1\\,000$, nên chỉ $1\\,010{,}94$ hợp lí. Thật vậy $498 \\cdot 203 = 101\\,094$ và tích có $1 + 1 = 2$ chữ số thập phân: $1\\,010{,}94$.',
    },
    {
      type: 'number',
      prompt:
        'Mẹ mua $2{,}5$ kg táo, giá $48\\,500$ đồng một ki-lô-gam. Số tiền mẹ phải trả, làm tròn đến hàng nghìn, là bao nhiêu đồng?',
      answer: 121000,
      unit: 'đồng',
      hints: [
        'Tính $2{,}5 \\cdot 48\\,500$ trước.',
        'Khi làm tròn đến hàng nghìn, xét chữ số hàng trăm.',
      ],
      solution:
        '$2{,}5 \\cdot 48\\,500 = 121\\,250$ (đồng). Chữ số hàng trăm là $2 < 5$ nên $121\\,250 \\approx 121\\,000$ đồng.',
    },
  ],
  takeaways: [
    'Đổi phân số thập phân sang số thập phân bằng cách đếm số chữ số $0$ ở mẫu.',
    'Mọi phép tính với số thập phân theo quy tắc dấu và thứ tự thực hiện như với số nguyên; nhóm các số thích hợp để tính nhanh.',
    'Làm tròn theo chữ số ngay bên phải hàng làm tròn; ước lượng để kiểm tra kết quả có hợp lí không.',
  ],
};
