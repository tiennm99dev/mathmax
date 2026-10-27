/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành ngoài trời: làm giác kế đơn giản, đo góc nâng rồi dùng tỉ số lượng giác tan của góc nhọn để tính chiều cao cột cờ, cây, toà nhà và khoảng cách tới một điểm không đến được.',
  intro:
    'Cột cờ của trường cao bao nhiêu mét? Cây bên kia con mương cách ta bao xa? Không cần trèo lên hay lội qua: chỉ với một chiếc giác kế tự làm, một thước dây và tỉ số lượng giác của góc nhọn đã học ở chương Hệ thức lượng trong tam giác vuông, cả nhóm có thể tính được những khoảng cách ấy.',
  objectives: [
    'Làm một giác kế đơn giản và dùng nó để đo góc nâng.',
    'Dùng tỉ số lượng giác tan của góc nhọn để tính chiều cao của một vật.',
    'Xác định khoảng cách tới một điểm không đến được, và chiều cao một vật khi không đến được chân của nó.',
    'Tổ chức đo đạc theo nhóm, ghi số liệu, tính toán và đánh giá sai số.',
  ],
  sections: [
    {
      heading: 'Giác kế và cách đo góc nâng',
      blocks: [
        {
          type: 'p',
          text: 'Khi mắt nhìn lên một điểm cao hơn, góc tạo bởi tia nhìn và đường nằm ngang qua mắt gọi là góc nâng. Khi nhìn xuống một điểm thấp hơn, góc tạo bởi tia nhìn và đường nằm ngang gọi là góc hạ.',
        },
        {
          type: 'p',
          text: 'Một giác kế đơn giản gồm: một thước đo góc hình bán nguyệt, một ống hút (ống ngắm) dán dọc theo cạnh thẳng của thước, và một sợi dây dọi (sợi chỉ buộc vật nặng) treo ở tâm thước. Có thể gắn giác kế lên một cây gậy thẳng đứng để giữ cố định độ cao.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Nhìn qua ống ngắm sao cho thấy đúng điểm cần ngắm (ngọn cây, đỉnh cột cờ).',
            'Giữ yên giác kế, chờ dây dọi đứng yên rồi đọc số đo $\\beta$ mà dây dọi chỉ trên thang đo bắt đầu từ $0^\\circ$ ở phía đầu mắt ngắm.',
            'Tính góc nâng: $\\alpha = 90^\\circ - \\beta$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao $\\alpha = 90^\\circ - \\beta$?',
          text: 'Dây dọi luôn thẳng đứng, nên vuông góc với đường nằm ngang. Khi ống ngắm nằm ngang, dây dọi chỉ vạch $90^\\circ$. Khi ống ngắm nghiêng lên một góc $\\alpha$ thì thước cũng quay đi $\\alpha$, nên dây dọi chỉ vạch $90^\\circ - \\alpha$.',
        },
      ],
    },
    {
      heading: 'Tính chiều cao của một vật',
      blocks: [
        {
          type: 'p',
          text: 'Đặt giác kế thẳng đứng tại điểm cách chân vật một khoảng $d$ (đo bằng thước dây), mắt ngắm (tâm giác kế) cao $h$ so với mặt đất. Ngắm đỉnh vật, đọc được góc nâng $\\alpha$.',
        },
        {
          type: 'p',
          text: 'Đường nằm ngang qua mắt, tia ngắm và thân vật tạo thành một tam giác vuông: cạnh kề góc $\\alpha$ dài $d$, cạnh đối là phần chiều cao của vật nằm cao hơn mắt. Vì $\\tan\\alpha = \\dfrac{\\text{cạnh đối}}{\\text{cạnh kề}}$ nên phần đó bằng $d\\tan\\alpha$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức tính chiều cao',
          text: '$$H = h + d\\tan\\alpha,$$ trong đó $h$ là chiều cao của giác kế, $d$ là khoảng cách từ giác kế đến chân vật, $\\alpha$ là góc nâng.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ quên',
          text: 'Phải cộng thêm chiều cao $h$ của giác kế, vì góc nâng được đo từ mắt ngắm chứ không phải từ mặt đất. Mặt đất giữa giác kế và chân vật cần bằng phẳng.',
        },
      ],
    },
    {
      heading: 'Xác định khoảng cách tới một điểm không đến được',
      blocks: [
        {
          type: 'p',
          text: 'Muốn biết khoảng cách $AB$ từ điểm $A$ bên này mương (sông) tới cái cây $B$ bên kia mà không qua được bờ bên kia:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Dùng giác kế (đặt nằm ngang) hoặc êke dựng đường thẳng $Ax$ vuông góc với $AB$ tại $A$, dọc theo bờ.',
            'Trên $Ax$ lấy điểm $C$, đo $AC$ bằng thước dây.',
            'Đặt giác kế nằm ngang tại $C$, đo góc $ACB$.',
          ],
        },
        {
          type: 'p',
          text: 'Tam giác $ABC$ vuông tại $A$, $AB$ là cạnh đối và $AC$ là cạnh kề của góc $C$, nên',
        },
        { type: 'tex', tex: 'AB = AC \\cdot \\tan \\widehat{ACB}.' },
        { type: 'widget', name: 'river' },
        {
          type: 'p',
          text: 'Khi không đến được chân của một vật cao (tháp ở bên kia hàng rào, ngọn hải đăng trên đảo), ta đo góc nâng tại hai điểm $M$, $N$ thẳng hàng với chân vật, cách nhau $d$ mét: góc nâng ở điểm xa là $\\alpha$, ở điểm gần là $\\beta$ ($\\beta > \\alpha$). Gọi $x$ là khoảng cách từ điểm gần tới chân vật (tính theo phương nằm ngang), $k$ là phần chiều cao cao hơn mắt. Khi đó',
        },
        {
          type: 'tex',
          tex: 'k = x\\tan\\beta = (x + d)\\tan\\alpha \\quad\\Rightarrow\\quad x = \\frac{d\\tan\\alpha}{\\tan\\beta - \\tan\\alpha}.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Góc hạ',
          text: 'Từ đỉnh tháp cao $h$ nhìn xuống một con thuyền với góc hạ $\\gamma$. Góc hạ bằng góc nâng nhìn từ thuyền lên đỉnh tháp (hai góc so le trong), nên khoảng cách từ thuyền đến chân tháp là $\\dfrac{h}{\\tan\\gamma}$.',
        },
      ],
    },
    {
      heading: 'Thực hành: Đo chiều cao và khoảng cách trong sân trường',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi nhóm làm một giác kế, đo chiều cao cột cờ (hoặc một cây, một toà nhà) và khoảng cách giữa hai điểm có vật cản ở giữa, rồi báo cáo kết quả.',
        },
        {
          type: 'p',
          text: 'Dụng cụ: thước đo góc bán nguyệt, ống hút, sợi chỉ và vật nặng nhỏ (làm dây dọi), băng dính, một cây gậy thẳng khoảng $1{,}5$ m, thước dây, cọc tiêu, giấy bút, máy tính cầm tay.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Làm giác kế: dán ống hút dọc cạnh thẳng của thước đo góc, buộc dây dọi vào tâm thước. Kiểm tra: khi ống hút nằm ngang (so với mặt bàn phẳng), dây dọi phải chỉ vạch $90^\\circ$.',
            'Đo chiều cao: đặt giác kế cách chân cột cờ một khoảng $d$, đo $d$ và chiều cao $h$ của giác kế; ngắm đỉnh cột cờ, đọc $\\beta$, tính $\\alpha = 90^\\circ - \\beta$ và $H = h + d\\tan\\alpha$.',
            'Đo lại ở hai vị trí khác (thay đổi $d$), lấy trung bình cộng các kết quả.',
            'Đo khoảng cách $AB$ qua vật cản: dựng $AC \\perp AB$, đo $AC$ và góc $ACB$, tính $AB = AC \\tan\\widehat{ACB}$.',
          ],
        },
        {
          type: 'table',
          head: [
            'Lần đo',
            '$h$ (m)',
            '$d$ (m)',
            '$\\beta$',
            '$\\alpha = 90^\\circ - \\beta$',
            '$H = h + d\\tan\\alpha$ (m)',
          ],
          rows: [
            ['1', '$1{,}5$', '$15$', '$55^\\circ$', '$35^\\circ$', '$\\approx 12{,}0$'],
            ['2', '(em ghi)', '(em ghi)', '(em ghi)', '(em tính)', '(em tính)'],
            ['3', '(em ghi)', '(em ghi)', '(em ghi)', '(em tính)', '(em tính)'],
          ],
          caption:
            'Mẫu bảng ghi số đo chiều cao cột cờ; lập bảng tương tự cho phép đo khoảng cách.',
        },
        {
          type: 'p',
          text: 'Báo cáo: hình vẽ sơ đồ đo, bảng số liệu, các phép tính và kết quả trung bình; so sánh kết quả giữa các lần đo và giữa các nhóm; nêu nguyên nhân sai số (giác kế không thẳng đứng, dây dọi chưa đứng yên, mặt đất không phẳng, đọc góc chỉ đến độ) và cách khắc phục. Lưu ý an toàn: không đứng dưới lòng đường, không đến sát mép nước khi đo.',
        },
      ],
    },
  ],
  explore: {
    title: 'Sân trường ảo: đo chiều cao bằng giác kế',
    instruction:
      'Chọn vật cần đo. Kéo chân giác kế để chọn khoảng cách $d$, kéo đầu ống ngắm (hoặc dùng phím mũi tên) cho tia ngắm đi đúng qua đỉnh vật. Đọc số đo dây dọi chỉ trong hình phóng to của giác kế, tính góc nâng $\\alpha$ rồi tính chiều cao $H = 1{,}5 + d\\tan\\alpha$, làm tròn đến hàng phần mười, và bấm "Kiểm tra".',
  },
  examples: [
    {
      problem:
        'Giác kế cao $1{,}5$ m đặt cách chân cột cờ $15$ m. Ngắm đỉnh cột cờ, dây dọi chỉ vạch $55^\\circ$ (thang đo tính từ đầu mắt ngắm). Tính chiều cao cột cờ (làm tròn đến hàng phần mười).',
      steps: [
        'Góc nâng: $\\alpha = 90^\\circ - 55^\\circ = 35^\\circ$.',
        'Phần cột cờ cao hơn mắt ngắm: $15\\tan 35^\\circ \\approx 15 \\cdot 0{,}7002 \\approx 10{,}50$ (m).',
        'Chiều cao cột cờ: $H \\approx 1{,}5 + 10{,}50 = 12{,}0$ (m).',
      ],
      answer: 'Cột cờ cao khoảng $12{,}0$ m.',
    },
    {
      problem:
        'Để đo khoảng cách từ điểm $A$ bên này mương tới cây $B$ bên kia, bạn Minh dựng $AC \\perp AB$ dọc theo bờ với $AC = 30$ m và đo được $\\widehat{ACB} = 40^\\circ$. Tính $AB$ (làm tròn đến hàng phần mười).',
      steps: [
        'Tam giác $ABC$ vuông tại $A$; $AB$ là cạnh đối, $AC$ là cạnh kề của góc $C$.',
        '$AB = AC \\tan 40^\\circ = 30\\tan 40^\\circ \\approx 30 \\cdot 0{,}8391 \\approx 25{,}2$ (m).',
      ],
      answer: '$AB \\approx 25{,}2$ m.',
    },
    {
      problem:
        'Không đến được chân một ngọn tháp. Tại điểm $M$, góc nâng tới đỉnh tháp là $30^\\circ$; đi thẳng về phía tháp $20$ m tới điểm $N$, góc nâng là $45^\\circ$. Giác kế cao $1{,}5$ m. Tính chiều cao của tháp (làm tròn đến hàng phần mười).',
      steps: [
        'Gọi $x$ (m) là khoảng cách từ $N$ tới chân tháp (theo phương ngang), $k$ là phần tháp cao hơn mắt ngắm. Ta có $k = x\\tan 45^\\circ = x$ và $k = (x + 20)\\tan 30^\\circ = \\dfrac{x + 20}{\\sqrt 3}$.',
        'Suy ra $x\\sqrt 3 = x + 20$, nên $x = \\dfrac{20}{\\sqrt 3 - 1} = 10(\\sqrt 3 + 1) \\approx 27{,}32$ (m).',
        'Chiều cao tháp: $H = 1{,}5 + k \\approx 1{,}5 + 27{,}32 \\approx 28{,}8$ (m).',
      ],
      answer: 'Tháp cao khoảng $28{,}8$ m.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Ngắm ngọn một cây bằng giác kế, dây dọi chỉ vạch $62^\\circ$ trên thang đo tính từ đầu mắt ngắm. Góc nâng bằng bao nhiêu độ?',
      answer: 28,
      unit: '°',
      hints: [
        'Khi ống ngắm nằm ngang, dây dọi chỉ $90^\\circ$.',
        '$\\alpha = 90^\\circ - \\beta$.',
      ],
      solution: '$\\alpha = 90^\\circ - 62^\\circ = 28^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Giác kế cao $1{,}6$ m đặt cách chân một toà nhà $20$ m, góc nâng tới nóc toà nhà là $40^\\circ$. Toà nhà cao bao nhiêu mét (làm tròn đến hàng phần mười)?',
      answer: 18.4,
      tolerance: 0.05,
      unit: 'm',
      hints: [
        'Phần cao hơn mắt ngắm là $d\\tan\\alpha$.',
        'Cộng thêm chiều cao giác kế $1{,}6$ m.',
      ],
      solution:
        '$H = 1{,}6 + 20\\tan 40^\\circ \\approx 1{,}6 + 20 \\cdot 0{,}8391 \\approx 1{,}6 + 16{,}78 \\approx 18{,}4$ m.',
    },
    {
      type: 'number',
      prompt:
        'Bạn Lan đặt giác kế cao $1{,}5$ m cách gốc cây bàng $12$ m và đo được góc nâng tới ngọn cây là $32^\\circ$. Cây bàng cao bao nhiêu mét (làm tròn đến hàng phần mười)?',
      answer: 9,
      tolerance: 0.05,
      unit: 'm',
      hints: ['$H = h + d\\tan\\alpha$.'],
      solution:
        '$H = 1{,}5 + 12\\tan 32^\\circ \\approx 1{,}5 + 12 \\cdot 0{,}6249 \\approx 1{,}5 + 7{,}50 = 9{,}0$ m.',
    },
    {
      type: 'choice',
      prompt:
        'Một bạn tính chiều cao cột cờ bằng $d\\tan\\alpha$ và được kết quả nhỏ hơn thực tế khoảng $1{,}5$ m. Bạn ấy đã quên điều gì?',
      options: [
        'Đo khoảng cách $d$ đến chân cột cờ',
        'Cộng thêm chiều cao của giác kế',
        'Dùng $\\sin\\alpha$ thay cho $\\tan\\alpha$',
        'Nhân đôi khoảng cách $d$',
      ],
      answer: 1,
      hints: ['Góc nâng được đo từ đâu: từ mặt đất hay từ mắt ngắm?'],
      solution:
        'Góc nâng được đo từ mắt ngắm của giác kế, nên $d\\tan\\alpha$ chỉ là phần cột cờ cao hơn mắt ngắm. Phải cộng thêm chiều cao giác kế: $H = h + d\\tan\\alpha$.',
    },
    {
      type: 'number',
      prompt:
        'Để đo khoảng cách $AB$ qua một con kênh, người ta dựng $AC \\perp AB$ với $AC = 25$ m và đo được $\\widehat{ACB} = 50^\\circ$. Tính $AB$ (làm tròn đến hàng phần mười).',
      answer: 29.8,
      tolerance: 0.05,
      unit: 'm',
      hints: ['Trong tam giác vuông $ABC$, $AB$ là cạnh đối của góc $C$.'],
      solution: '$AB = 25\\tan 50^\\circ \\approx 25 \\cdot 1{,}1918 \\approx 29{,}8$ m.',
    },
    {
      type: 'number',
      prompt:
        'Cột cờ cao $13{,}5$ m, giác kế cao $1{,}5$ m đặt cách chân cột cờ $12$ m. Khi ngắm đúng đỉnh cột cờ, góc nâng bằng bao nhiêu độ?',
      answer: 45,
      unit: '°',
      hints: [
        'Phần cột cờ cao hơn mắt ngắm là $13{,}5 - 1{,}5$.',
        '$\\tan\\alpha = \\dfrac{12}{12}$.',
      ],
      solution: '$\\tan\\alpha = \\dfrac{13{,}5 - 1{,}5}{12} = 1$, nên $\\alpha = 45^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Không đến được chân một toà tháp. Tại điểm xa, góc nâng tới đỉnh tháp là $35^\\circ$; tiến thêm $15$ m về phía tháp, góc nâng là $50^\\circ$. Giác kế cao $1{,}5$ m. Tính chiều cao tháp (làm tròn đến hàng phần mười).',
      answer: 27,
      tolerance: 0.05,
      unit: 'm',
      hints: [
        'Gọi $x$ là khoảng cách từ điểm gần tới chân tháp: $x\\tan 50^\\circ = (x + 15)\\tan 35^\\circ$.',
        '$x = \\dfrac{15\\tan 35^\\circ}{\\tan 50^\\circ - \\tan 35^\\circ}$, rồi tính $1{,}5 + x\\tan 50^\\circ$.',
      ],
      solution:
        '$x = \\dfrac{15\\tan 35^\\circ}{\\tan 50^\\circ - \\tan 35^\\circ} \\approx \\dfrac{10{,}503}{0{,}4915} \\approx 21{,}37$ m. Phần tháp cao hơn mắt: $x\\tan 50^\\circ \\approx 25{,}46$ m. Chiều cao tháp: $1{,}5 + 25{,}46 \\approx 27{,}0$ m.',
    },
    {
      type: 'number',
      prompt:
        'Từ đỉnh một ngọn hải đăng cao $30$ m (tính từ mặt nước), người gác nhìn thấy một con thuyền với góc hạ $20^\\circ$. Thuyền cách chân hải đăng bao nhiêu mét (làm tròn đến hàng phần mười)?',
      answer: 82.4,
      tolerance: 0.05,
      unit: 'm',
      hints: [
        'Góc hạ bằng góc nâng nhìn từ thuyền lên đỉnh hải đăng.',
        '$\\tan 20^\\circ = \\dfrac{30}{d}$.',
      ],
      solution:
        '$d = \\dfrac{30}{\\tan 20^\\circ} \\approx \\dfrac{30}{0{,}3640} \\approx 82{,}4$ m.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước đo chiều cao cột cờ bằng giác kế.',
      items: [
        'Tính $H = h + d\\tan\\alpha$.',
        'Đặt giác kế thẳng đứng, đo khoảng cách $d$ tới chân cột cờ và chiều cao $h$ của giác kế.',
        'Đọc số đo $\\beta$ của dây dọi và tính góc nâng $\\alpha = 90^\\circ - \\beta$.',
        'Nhìn qua ống ngắm cho thấy đúng đỉnh cột cờ.',
      ],
      answer: [1, 3, 2, 0],
      hints: ['Phải ngắm trúng đỉnh rồi mới đọc dây dọi.'],
      solution:
        'Đặt giác kế và đo $d$, $h$; ngắm đỉnh cột cờ; đọc $\\beta$ và tính $\\alpha$; cuối cùng tính $H$.',
    },
  ],
  takeaways: [
    'Giác kế đơn giản: dây dọi chỉ $\\beta$ thì góc nâng $\\alpha = 90^\\circ - \\beta$.',
    'Chiều cao một vật: $H = h + d\\tan\\alpha$; nhớ cộng chiều cao giác kế $h$.',
    'Khoảng cách qua sông: dựng $AC \\perp AB$, đo $AC$ và góc $C$, rồi $AB = AC\\tan C$.',
    'Không đến được chân vật: đo góc nâng tại hai điểm cách nhau $d$ và giải $x\\tan\\beta = (x + d)\\tan\\alpha$.',
    'Đo nhiều lần, lấy trung bình để giảm sai số.',
  ],
};
