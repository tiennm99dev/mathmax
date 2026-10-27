/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: dùng hàm số bậc nhất để mô tả chi phí, doanh thu và giá trị khấu hao, so sánh hai phương án bằng đồ thị và tìm điểm hoà vốn.',
  intro:
    'Gia đình em định lắp truyền hình cáp. Công ty A lấy phí lắp đặt nhưng cước tháng rẻ hơn, công ty B miễn phí lắp đặt nhưng cước tháng đắt hơn. Nên chọn công ty nào? Nhiều câu hỏi về tiền bạc như vậy được trả lời bằng hàm số bậc nhất $y = ax + b$ và đồ thị của nó.',
  objectives: [
    'Lập hàm số bậc nhất mô tả chi phí gồm một khoản cố định và một khoản tăng đều.',
    'So sánh hai phương án bằng cách giải phương trình và đọc giao điểm của hai đồ thị.',
    'Hiểu chi phí, doanh thu, lợi nhuận và tìm điểm hoà vốn.',
    'Dùng hàm số bậc nhất mô tả giá trị còn lại của tài sản bị khấu hao đều theo thời gian.',
  ],
  sections: [
    {
      heading: 'Chi phí là một hàm số bậc nhất',
      blocks: [
        {
          type: 'p',
          text: 'Nhiều khoản chi gồm hai phần: một khoản trả một lần (phí lắp đặt, tiền mua máy) và một khoản trả đều mỗi tháng (cước, tiền điện). Nếu khoản trả một lần là $b$ đồng và mỗi tháng trả thêm $a$ đồng thì sau $x$ tháng tổng chi phí là',
        },
        { type: 'tex', tex: 'y = ax + b.' },
        {
          type: 'p',
          text: 'Đây là một hàm số bậc nhất của $x$ (với $a \\ne 0$). Hệ số $a$ cho biết mỗi tháng chi phí tăng bao nhiêu, còn $b$ là chi phí lúc bắt đầu ($x = 0$). Vì $x$ là số tháng nên ta chỉ xét $x \\ge 0$: đồ thị là một tia xuất phát từ điểm $(0; b)$ trên trục tung.',
        },
        {
          type: 'table',
          head: ['Công ty', 'Phí lắp đặt', 'Cước tháng', 'Chi phí sau $x$ tháng'],
          rows: [
            ['A', '$150$', '$110$', '$y = 110x + 150$'],
            ['B', '$0$', '$120$', '$y = 120x$'],
          ],
          caption: 'Hai gói truyền hình cáp (đơn vị: nghìn đồng).',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'So sánh hai phương án',
          text: 'Hai phương án tốn như nhau khi $110x + 150 = 120x$, tức là $x = 15$. Trên mặt phẳng toạ độ, đó là hoành độ giao điểm $(15; 1\\,800)$ của hai đồ thị. Trước tháng thứ $15$ đường của B nằm dưới nên B rẻ hơn; sau tháng thứ $15$ đường của A nằm dưới nên A rẻ hơn.',
        },
      ],
    },
    {
      heading: 'Chi phí, doanh thu và điểm hoà vốn',
      blocks: [
        {
          type: 'p',
          text: 'Một cơ sở sản xuất mỗi tháng phải trả một khoản chi phí cố định $F$ (tiền thuê mặt bằng, lương cơ bản) và mỗi sản phẩm làm ra tốn thêm $v$ đồng (nguyên liệu). Mỗi sản phẩm bán với giá $p$ đồng. Khi làm và bán $x$ sản phẩm:',
        },
        {
          type: 'list',
          items: [
            'Chi phí: $C(x) = vx + F$.',
            'Doanh thu (số tiền bán hàng): $R(x) = px$.',
            'Lợi nhuận: $L(x) = R(x) - C(x) = (p - v)x - F$.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Điểm hoà vốn',
          text: 'Điểm hoà vốn là số sản phẩm $x_0$ mà doanh thu vừa đúng bằng chi phí: $R(x_0) = C(x_0)$, tức là không lãi cũng không lỗ. Với $p > v$ ta có $$px_0 = vx_0 + F \\Rightarrow x_0 = \\frac{F}{p - v}.$$',
        },
        {
          type: 'p',
          text: 'Trên đồ thị, điểm hoà vốn là giao điểm của đường doanh thu và đường chi phí. Bán ít hơn $x_0$ sản phẩm thì đường doanh thu nằm dưới đường chi phí: cơ sở bị lỗ. Bán nhiều hơn $x_0$ sản phẩm thì doanh thu vượt chi phí: cơ sở có lãi.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Khi nào không có điểm hoà vốn?',
          text: 'Nếu giá bán $p$ không lớn hơn chi phí $v$ của một sản phẩm thì mỗi sản phẩm bán ra không đem lại tiền để bù khoản $F$: hai đường không cắt nhau khi $x > 0$ và cơ sở luôn lỗ.',
        },
      ],
    },
    {
      heading: 'Khấu hao tài sản',
      blocks: [
        {
          type: 'p',
          text: 'Ô tô, máy móc, tủ lạnh... giảm giá trị dần theo thời gian sử dụng. Theo cách khấu hao đường thẳng, giá trị của tài sản giảm đều mỗi năm cho đến hết thời gian sử dụng. Giá trị còn lại sau $x$ năm gọi là giá trị sổ sách.',
        },
        {
          type: 'p',
          text: 'Một hãng taxi mua ô tô giá $480$ triệu đồng, khấu hao đều trong $8$ năm. Mỗi năm giá trị giảm $480 : 8 = 60$ triệu đồng, nên giá trị sổ sách sau $x$ năm là',
        },
        { type: 'tex', tex: 'y = 480 - 60x \\quad (0 \\le x \\le 8).' },
        {
          type: 'p',
          text: 'Đồ thị là đoạn thẳng nối $(0; 480)$ và $(8; 0)$, đi xuống vì hệ số $a = -60 < 0$.',
        },
      ],
    },
    {
      heading: 'Dự án: Chọn mua thiết bị có lợi nhất',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: dùng hàm số bậc nhất và đồ thị để tư vấn cho gia đình khi chọn giữa hai phương án. Làm theo nhóm $4$ đến $5$ bạn rồi trình bày trước lớp.',
        },
        {
          type: 'p',
          text: 'Tình huống mẫu: Ông An định mua một tủ lạnh $150$ lít. Tủ hãng A giá $5\\,000\\,000$ đồng, mỗi ngày dùng hết $1$ kWh điện; tủ hãng B giá $4\\,460\\,000$ đồng, mỗi ngày dùng hết $1{,}25$ kWh. Giá điện là $2\\,000$ đồng/kWh, mỗi tháng tính $30$ ngày, ông định dùng tủ trong $10$ năm.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tính tiền điện mỗi tháng của mỗi tủ, rồi lập hàm số tổng chi phí (tiền mua cộng tiền điện) sau $x$ tháng của tủ A và tủ B.',
            'Tính tổng chi phí của tủ A sau $5$ năm. Nếu tủ A khấu hao đều trong $10$ năm, sau $7$ năm giá trị của nó còn bao nhiêu?',
            'Tìm số tháng để chi phí hai tủ bằng nhau, vẽ hai đồ thị trên cùng một mặt phẳng toạ độ (có thể dùng khung tương tác) và khuyên ông An nên mua tủ nào.',
            'Thu thập số liệu thật: chọn hai sản phẩm cùng loại mà gia đình em quan tâm (hai gói cước internet, hai tủ lạnh, hai xe máy...), ghi giá mua, chi phí hằng tháng và nguồn số liệu, rồi lặp lại các bước trên.',
          ],
        },
        {
          type: 'table',
          head: ['Khoản mục', 'Tủ A', 'Tủ B'],
          rows: [
            [
              'Tiền điện mỗi tháng',
              '$1 \\cdot 2\\,000 \\cdot 30 = 60\\,000$',
              '$1{,}25 \\cdot 2\\,000 \\cdot 30 = 75\\,000$',
            ],
            [
              'Chi phí sau $x$ tháng',
              '$y = 60\\,000x + 5\\,000\\,000$',
              '$y = 75\\,000x + 4\\,460\\,000$',
            ],
            ['Sau $10$ năm ($x = 120$)', '$12\\,200\\,000$', '$13\\,460\\,000$'],
          ],
          caption:
            'Lời giải mẫu của tình huống (đơn vị: đồng). Hai chi phí bằng nhau khi $15\\,000x = 540\\,000$, tức $x = 36$ tháng; dùng lâu hơn $3$ năm thì tủ A có lợi hơn.',
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng số liệu (ghi nguồn), các hàm số đã lập, đồ thị có đánh dấu giao điểm, lời khuyên và lí do. Nêu thêm những yếu tố không có trong mô hình (giá điện có thể tăng, tủ có thể hỏng sớm, khuyến mãi...).',
        },
      ],
    },
  ],
  explore: {
    title: 'Hai đường thẳng và giao điểm',
    instruction:
      'Chọn tình huống. Ở "So sánh hai gói cước", chỉnh phí lắp đặt và cước tháng của hai công ty: vùng tô màu cho biết công ty nào rẻ hơn, điểm tím là lúc hai chi phí bằng nhau. Ở "Chi phí và doanh thu", chỉnh $F$, $v$, $p$ và số sản phẩm bán: vùng xanh là lãi, vùng đỏ là lỗ, điểm tím là điểm hoà vốn.',
  },
  examples: [
    {
      problem:
        'Công ty A: phí lắp đặt $150$ nghìn đồng, cước $110$ nghìn đồng/tháng. Công ty B: miễn phí lắp đặt, cước $120$ nghìn đồng/tháng. a) Tính chi phí của mỗi công ty sau $18$ tháng. b) Sau bao nhiêu tháng chi phí hai công ty bằng nhau? c) Gia đình định dùng $3$ năm thì nên chọn công ty nào?',
      steps: [
        'Gọi $x$ là số tháng sử dụng. Chi phí: A là $y = 110x + 150$, B là $y = 120x$ (nghìn đồng).',
        'a) Với $x = 18$: A tốn $110 \\cdot 18 + 150 = 2\\,130$; B tốn $120 \\cdot 18 = 2\\,160$ (nghìn đồng).',
        'b) Giải $110x + 150 = 120x$: $10x = 150$, $x = 15$. Sau $15$ tháng hai chi phí bằng nhau, cùng là $1\\,800$ nghìn đồng.',
        'c) $3$ năm là $36$ tháng: A tốn $110 \\cdot 36 + 150 = 4\\,110$, B tốn $120 \\cdot 36 = 4\\,320$ (nghìn đồng).',
      ],
      answer:
        'a) A: $2\\,130$ nghìn đồng, B: $2\\,160$ nghìn đồng. b) $15$ tháng. c) Chọn công ty A (rẻ hơn $210$ nghìn đồng).',
    },
    {
      problem:
        'Một xưởng làm bánh có chi phí cố định $15$ triệu đồng mỗi tháng. Mỗi hộp bánh tốn $30$ nghìn đồng nguyên liệu và bán được $80$ nghìn đồng. Tìm điểm hoà vốn. Nếu mỗi tháng bán $450$ hộp thì xưởng lãi bao nhiêu?',
      steps: [
        'Đổi ra nghìn đồng: $F = 15\\,000$, $v = 30$, $p = 80$.',
        'Chi phí $C(x) = 30x + 15\\,000$, doanh thu $R(x) = 80x$.',
        'Hoà vốn khi $80x = 30x + 15\\,000$, tức $50x = 15\\,000$, $x = 300$ hộp.',
        'Bán $450$ hộp: $L = 80 \\cdot 450 - (30 \\cdot 450 + 15\\,000) = 36\\,000 - 28\\,500 = 7\\,500$ (nghìn đồng).',
      ],
      answer:
        'Điểm hoà vốn là $300$ hộp bánh mỗi tháng. Bán $450$ hộp thì lãi $7\\,500$ nghìn đồng, tức $7{,}5$ triệu đồng.',
    },
    {
      problem:
        'Ô tô giá $480$ triệu đồng được khấu hao đều trong $8$ năm. Tính giá trị sổ sách sau $3$ năm. Sau bao lâu giá trị sổ sách còn $150$ triệu đồng?',
      steps: [
        'Mỗi năm giảm $480 : 8 = 60$ triệu đồng, nên $y = 480 - 60x$.',
        'Sau $3$ năm: $y = 480 - 60 \\cdot 3 = 300$ (triệu đồng).',
        'Giải $480 - 60x = 150$: $60x = 330$, $x = 5{,}5$.',
      ],
      answer:
        'Sau $3$ năm còn $300$ triệu đồng; sau $5{,}5$ năm (5 năm 6 tháng) còn $150$ triệu đồng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Công ty A tính phí lắp đặt $150$ nghìn đồng và cước $110$ nghìn đồng/tháng. Sau $18$ tháng, tổng chi phí là bao nhiêu nghìn đồng?',
      answer: 2130,
      unit: 'nghìn đồng',
      hints: ['Chi phí sau $x$ tháng: $y = 110x + 150$.', 'Thay $x = 18$.'],
      solution: '$y = 110 \\cdot 18 + 150 = 1\\,980 + 150 = 2\\,130$ nghìn đồng.',
    },
    {
      type: 'number',
      prompt:
        'Gói cước X: phí hoà mạng $200$ nghìn đồng, cước $150$ nghìn đồng/tháng. Gói cước Y: miễn phí hoà mạng, cước $175$ nghìn đồng/tháng. Sau bao nhiêu tháng thì chi phí hai gói bằng nhau?',
      answer: 8,
      unit: 'tháng',
      hints: [
        'Lập hai hàm số chi phí theo số tháng $x$.',
        'Giải phương trình $150x + 200 = 175x$.',
      ],
      solution: '$150x + 200 = 175x \\Rightarrow 25x = 200 \\Rightarrow x = 8$ tháng.',
    },
    {
      type: 'choice',
      prompt:
        'Vẫn hai gói cước X ($y = 150x + 200$) và Y ($y = 175x$). Một gia đình định dùng $2$ năm. Nên chọn gói nào?',
      options: [
        'Gói X, vì sau tháng thứ $8$ gói X rẻ hơn',
        'Gói Y, vì không mất phí hoà mạng',
        'Hai gói như nhau',
        'Gói Y, vì cước tháng của Y lớn hơn',
      ],
      answer: 0,
      hints: ['Tính chi phí hai gói với $x = 24$.'],
      solution:
        'Với $x = 24$: X tốn $150 \\cdot 24 + 200 = 3\\,800$, Y tốn $175 \\cdot 24 = 4\\,200$ (nghìn đồng). Gói X rẻ hơn $400$ nghìn đồng. Miễn phí hoà mạng chỉ có lợi khi dùng dưới $8$ tháng.',
    },
    {
      type: 'number',
      prompt:
        'Ô tô giá $480$ triệu đồng được khấu hao đều trong $8$ năm. Giá trị sổ sách của ô tô sau $3$ năm là bao nhiêu triệu đồng?',
      answer: 300,
      unit: 'triệu đồng',
      hints: ['Mỗi năm giá trị giảm $480 : 8$ triệu đồng.', '$y = 480 - 60x$.'],
      solution: '$y = 480 - 60 \\cdot 3 = 300$ triệu đồng.',
    },
    {
      type: 'number',
      prompt:
        'Với ô tô ở câu trên ($y = 480 - 60x$), sau bao nhiêu năm thì giá trị sổ sách còn $150$ triệu đồng?',
      answer: 5.5,
      unit: 'năm',
      hints: ['Giải phương trình $480 - 60x = 150$.'],
      solution: '$60x = 480 - 150 = 330$, nên $x = 5{,}5$ năm.',
    },
    {
      type: 'number',
      prompt:
        'Tủ lạnh A giá $5\\,000\\,000$ đồng, tiền điện $60\\,000$ đồng/tháng. Tủ lạnh B giá $4\\,460\\,000$ đồng, tiền điện $75\\,000$ đồng/tháng. Sau bao nhiêu tháng thì tổng chi phí (tiền mua và tiền điện) của hai tủ bằng nhau?',
      answer: 36,
      unit: 'tháng',
      hints: [
        'Chi phí sau $x$ tháng: A là $60\\,000x + 5\\,000\\,000$, B là $75\\,000x + 4\\,460\\,000$.',
        'Cho hai biểu thức bằng nhau rồi giải.',
      ],
      solution:
        '$60\\,000x + 5\\,000\\,000 = 75\\,000x + 4\\,460\\,000 \\Rightarrow 15\\,000x = 540\\,000 \\Rightarrow x = 36$ tháng.',
    },
    {
      type: 'number',
      prompt:
        'Một cửa hàng in áo có chi phí cố định $12$ triệu đồng mỗi tháng; mỗi chiếc áo tốn $25$ nghìn đồng và bán $75$ nghìn đồng. Mỗi tháng phải bán ít nhất bao nhiêu chiếc áo thì cửa hàng không bị lỗ?',
      answer: 240,
      unit: 'chiếc',
      hints: [
        'Đổi $12$ triệu đồng thành $12\\,000$ nghìn đồng.',
        'Điểm hoà vốn: $x_0 = \\dfrac{F}{p - v}$.',
      ],
      solution:
        'Hoà vốn khi $75x = 25x + 12\\,000$, tức $50x = 12\\,000$, $x = 240$. Bán từ $240$ chiếc trở lên thì không lỗ.',
    },
    {
      type: 'number',
      prompt:
        'Cửa hàng ở câu trên bán được $400$ chiếc áo trong một tháng. Lợi nhuận tháng đó là bao nhiêu nghìn đồng?',
      answer: 8000,
      unit: 'nghìn đồng',
      hints: ['$L(x) = (p - v)x - F$.'],
      solution:
        '$L = (75 - 25) \\cdot 400 - 12\\,000 = 20\\,000 - 12\\,000 = 8\\,000$ nghìn đồng (tức $8$ triệu đồng).',
    },
    {
      type: 'match',
      prompt:
        'Một cơ sở có chi phí cố định $F$, mỗi sản phẩm tốn $v$ đồng và bán $p$ đồng ($p > v$). Nối mỗi đại lượng với biểu thức của nó.',
      left: [
        'Chi phí khi làm $x$ sản phẩm',
        'Doanh thu khi bán $x$ sản phẩm',
        'Lợi nhuận',
        'Điểm hoà vốn',
      ],
      right: ['$px$', '$\\dfrac{F}{p - v}$', '$vx + F$', '$(p - v)x - F$', '$(p + v)x$'],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 3],
        [3, 1],
      ],
      hints: ['Lợi nhuận = doanh thu − chi phí; hoà vốn khi lợi nhuận bằng $0$.'],
      solution:
        'Chi phí $C = vx + F$, doanh thu $R = px$, lợi nhuận $L = R - C = (p - v)x - F$, hoà vốn khi $L = 0$: $x = \\dfrac{F}{p - v}$.',
    },
    {
      type: 'choice',
      prompt:
        'Trên đồ thị, đường doanh thu nằm dưới đường chi phí khi số sản phẩm bán ra nhỏ hơn hoành độ giao điểm. Điều đó có nghĩa là gì?',
      options: [
        'Cơ sở có lãi',
        'Cơ sở bị lỗ',
        'Cơ sở hoà vốn',
        'Giá bán nhỏ hơn chi phí một sản phẩm',
      ],
      answer: 1,
      hints: ['Doanh thu nhỏ hơn chi phí thì lợi nhuận âm hay dương?'],
      solution:
        'Doanh thu nhỏ hơn chi phí nên $L(x) < 0$: cơ sở bị lỗ. Điều này không có nghĩa giá bán nhỏ hơn chi phí một sản phẩm; chỉ là bán chưa đủ nhiều để bù chi phí cố định.',
    },
  ],
  takeaways: [
    'Chi phí gồm một khoản cố định $b$ và một khoản tăng đều $a$ mỗi đơn vị là hàm số bậc nhất $y = ax + b$.',
    'Hai phương án tốn như nhau tại hoành độ giao điểm của hai đồ thị; sau đó phương án có hệ số $a$ nhỏ hơn rẻ hơn.',
    'Doanh thu $R = px$, chi phí $C = vx + F$; điểm hoà vốn $x_0 = \\dfrac{F}{p - v}$: bán ít hơn thì lỗ, nhiều hơn thì lãi.',
    'Khấu hao đều: giá trị sổ sách $y = P - \\dfrac{P}{n}x$ giảm theo một hàm số bậc nhất.',
  ],
};
