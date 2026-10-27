/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: dùng nồng độ phần trăm và hệ hai phương trình bậc nhất hai ẩn để tính lượng chất tan, nước và các dung dịch cần pha cho đúng nồng độ yêu cầu.',
  intro:
    'Muốn có $1$ lít nước đường $10\\%$ để làm thạch, hay $300$ g nước muối $10\\%$ từ hai chai nước muối có sẵn, ta cần lấy bao nhiêu gam mỗi thứ? Đoán thử thì dễ sai; lập hệ phương trình thì tính được chính xác. Đây là cách người pha chế trong phòng thí nghiệm, nhà bếp hay xưởng sản xuất vẫn làm.',
  objectives: [
    'Nhắc lại công thức nồng độ phần trăm của dung dịch.',
    'Lập và giải hệ hai phương trình bậc nhất hai ẩn để tìm lượng chất tan và dung môi cần dùng.',
    'Lập và giải hệ phương trình pha trộn hai dung dịch có nồng độ khác nhau.',
    'Thực hành pha một dung dịch theo nồng độ yêu cầu và kiểm tra lại kết quả.',
  ],
  sections: [
    {
      heading: 'Nồng độ phần trăm của dung dịch',
      blocks: [
        {
          type: 'p',
          text: 'Khi hoà tan đường (hay muối) vào nước, ta được dung dịch: đường là chất tan, nước là dung môi. Khối lượng dung dịch bằng khối lượng chất tan cộng khối lượng dung môi.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nồng độ phần trăm',
          text: 'Nồng độ phần trăm $C\\%$ của một dung dịch cho biết số gam chất tan có trong $100$ g dung dịch: $$C\\% = \\frac{m_{ct}}{m_{dd}} \\cdot 100\\%,$$ trong đó $m_{ct}$ là khối lượng chất tan, $m_{dd} = m_{ct} + m_{dm}$ là khối lượng dung dịch ($m_{dm}$ là khối lượng dung môi).',
        },
        {
          type: 'p',
          text: 'Từ công thức suy ra khối lượng chất tan $m_{ct} = \\dfrac{C \\cdot m_{dd}}{100}$. Chẳng hạn $250$ g nước đường $8\\%$ chứa $\\dfrac{8 \\cdot 250}{100} = 20$ g đường.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Quy ước khi tính',
          text: 'Nước tinh khiết có khối lượng riêng $1$ g/ml, nên $1$ lít nước nặng $1$ kg. Nước cất được xem như một "dung dịch" có nồng độ $0\\%$.',
        },
      ],
    },
    {
      heading: 'Pha dung dịch từ chất tan và nước',
      blocks: [
        {
          type: 'p',
          text: 'Bài toán: cần bao nhiêu gam đường cát và bao nhiêu gam nước tinh khiết để được $1\\,000$ ml dung dịch đường có nồng độ $a\\%$? Biết khối lượng riêng của đường cát là $1{,}1$ g/ml, và coi thể tích dung dịch bằng tổng thể tích đường và nước.',
        },
        {
          type: 'p',
          text: 'Gọi $x$ (g) là khối lượng đường, $y$ (g) là khối lượng nước ($x > 0$, $y > 0$). Thể tích đường là $\\dfrac{x}{1{,}1}$ ml, thể tích nước là $y$ ml. Ta có hệ',
        },
        {
          type: 'tex',
          tex: '\\begin{cases} \\dfrac{x}{1{,}1} + y = 1\\,000 \\\\[2mm] \\dfrac{x}{x + y} \\cdot 100 = a \\end{cases} \\quad\\Leftrightarrow\\quad \\begin{cases} x + 1{,}1y = 1\\,100 \\\\ (100 - a)x - ay = 0. \\end{cases}',
        },
        {
          type: 'p',
          text: 'Phương trình thứ hai có được bằng cách nhân hai vế với $x + y$ rồi chuyển vế: $100x = a(x + y)$. Đây là một hệ hai phương trình bậc nhất hai ẩn, giải bằng phương pháp thế hoặc cộng đại số.',
        },
        {
          type: 'table',
          head: ['Nồng độ $a$', 'Đường $x$ (g)', 'Nước $y$ (g)'],
          rows: [
            ['$5\\%$', '$50{,}2$', '$954{,}3$'],
            ['$10\\%$', '$100{,}9$', '$908{,}3$'],
            ['$15\\%$', '$152{,}1$', '$861{,}8$'],
            ['$20\\%$', '$203{,}7$', '$814{,}8$'],
          ],
          caption:
            'Lượng đường và nước để pha $1\\,000$ ml nước đường, làm tròn đến hàng phần mười.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Giả thiết gần đúng',
          text: 'Thật ra khi hoà tan, thể tích dung dịch hơi nhỏ hơn tổng hai thể tích. Giả thiết "thể tích cộng được" làm bài toán đơn giản hơn và cho kết quả đủ dùng trong đời sống.',
        },
      ],
    },
    {
      heading: 'Pha trộn hai dung dịch',
      blocks: [
        {
          type: 'p',
          text: 'Có hai dung dịch cùng chất tan với nồng độ $c_1\\%$ và $c_2\\%$. Cần pha $m$ gam dung dịch nồng độ $c\\%$. Gọi $x$, $y$ (g) là khối lượng lấy từ dung dịch thứ nhất và thứ hai.',
        },
        {
          type: 'list',
          items: [
            'Khối lượng dung dịch: $x + y = m$.',
            'Khối lượng chất tan: $\\dfrac{c_1 x}{100} + \\dfrac{c_2 y}{100} = \\dfrac{c\\, m}{100}$, tức $c_1 x + c_2 y = c\\, m$.',
          ],
        },
        {
          type: 'tex',
          tex: '\\begin{cases} x + y = m \\\\ c_1 x + c_2 y = c\\, m \\end{cases}',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhận xét',
          text: 'Nồng độ của hỗn hợp luôn nằm giữa $c_1\\%$ và $c_2\\%$. Vì vậy chỉ pha được dung dịch $c\\%$ khi $c$ nằm giữa $c_1$ và $c_2$; nếu không, hệ có nghiệm âm, không dùng được. Pha loãng bằng nước là trường hợp $c_2 = 0$.',
        },
        {
          type: 'p',
          text: 'Trong mô phỏng dưới đây, em rót dung dịch từ hai cốc và quan sát nồng độ hỗn hợp cùng hệ phương trình tương ứng.',
        },
      ],
    },
    {
      heading: 'Thực hành: pha nước đường theo nồng độ yêu cầu',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi nhóm pha $500$ ml nước đường có nồng độ do giáo viên giao ($5\\%$, $10\\%$ hoặc $15\\%$), sau đó dùng phần nước đường $20\\%$ đã pha của nhóm bạn để pha thêm một dung dịch mới theo nồng độ yêu cầu.',
        },
        {
          type: 'p',
          text: 'Dụng cụ: đường cát, nước tinh khiết, cân điện tử (chính xác đến $0{,}1$ g), cốc chia vạch, đũa khuấy, giấy bút, máy tính cầm tay.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Lập hệ phương trình như bài toán $1\\,000$ ml ở trên, với thể tích $500$ ml: $x + 1{,}1y = 550$ và $(100 - a)x - ay = 0$. Giải hệ, làm tròn đến hàng phần mười.',
            'Cân đúng $x$ gam đường và $y$ gam nước, hoà tan và khuấy đều. Đọc thể tích trên cốc chia vạch, so sánh với $500$ ml.',
            'Nhận nước đường $20\\%$ của nhóm bạn. Lập hệ $x + y = m$, $20x + a\\,y = c\\,m$ để pha $200$ g dung dịch $c\\%$ (với $c$ nằm giữa $a$ và $20$), cân và trộn.',
            'Kiểm tra: tính lại khối lượng đường có trong dung dịch cuối và chia cho khối lượng dung dịch.',
          ],
        },
        {
          type: 'table',
          head: ['Bước', 'Số liệu tính được', 'Số liệu cân, đo thực tế'],
          rows: [
            ['Đường $x$ (g)', '(em ghi)', '(em ghi)'],
            ['Nước $y$ (g)', '(em ghi)', '(em ghi)'],
            ['Thể tích dung dịch (ml)', '$500$', '(em ghi)'],
            ['Nồng độ dung dịch cuối', '$c\\%$', '(em tính lại)'],
          ],
          caption: 'Mẫu bảng ghi kết quả của nhóm.',
        },
        {
          type: 'p',
          text: 'Báo cáo: trình bày hệ phương trình và cách giải, bảng số liệu, nhận xét chênh lệch giữa thể tích đo được và $500$ ml, và giải thích nguyên nhân (giả thiết thể tích cộng được, sai số khi cân). Lưu ý an toàn: chỉ dùng đường, nước sạch và dụng cụ sạch; không nếm các dung dịch hoá chất trong phòng thí nghiệm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Rót và trộn hai dung dịch',
    instruction:
      'Chọn một nhiệm vụ, kéo hai thanh trượt (hoặc dùng phím mũi tên) để chọn số gam $x$, $y$ lấy từ mỗi cốc. Quan sát khối lượng, lượng chất tan, nồng độ hỗn hợp và thay số vào hệ phương trình cho đến khi đạt đúng yêu cầu.',
  },
  examples: [
    {
      problem:
        'Hoà tan $25$ g đường vào $225$ g nước. Tính nồng độ phần trăm của dung dịch thu được.',
      steps: [
        'Khối lượng dung dịch: $m_{dd} = 25 + 225 = 250$ (g).',
        '$C\\% = \\dfrac{25}{250} \\cdot 100\\% = 10\\%$.',
      ],
      answer: 'Dung dịch có nồng độ $10\\%$.',
    },
    {
      problem:
        'Cần bao nhiêu gam đường cát và bao nhiêu gam nước để pha $1\\,000$ ml nước đường $10\\%$? Biết khối lượng riêng của đường là $1{,}1$ g/ml (làm tròn đến hàng phần mười).',
      steps: [
        'Với $a = 10$, hệ là $\\begin{cases} x + 1{,}1y = 1\\,100 \\\\ 90x - 10y = 0. \\end{cases}$',
        'Từ phương trình thứ hai: $y = 9x$. Thế vào phương trình thứ nhất: $x + 9{,}9x = 1\\,100$, tức $10{,}9x = 1\\,100$.',
        '$x = \\dfrac{1\\,100}{10{,}9} \\approx 100{,}9$ (g) và $y = 9x \\approx 908{,}3$ (g).',
        'Thử lại: $\\dfrac{100{,}9}{1{,}1} + 908{,}3 \\approx 91{,}7 + 908{,}3 = 1\\,000$ (ml).',
      ],
      answer: 'Cần khoảng $100{,}9$ g đường và $908{,}3$ g nước.',
    },
    {
      problem:
        'Có hai loại dung dịch muối nồng độ $3\\%$ và $15\\%$. Cần lấy bao nhiêu gam mỗi loại để pha được $600$ g dung dịch muối $7\\%$?',
      steps: [
        'Gọi $x$, $y$ (g) là khối lượng dung dịch $3\\%$ và $15\\%$ cần lấy ($x, y > 0$).',
        'Khối lượng dung dịch: $x + y = 600$. Khối lượng muối: $3x + 15y = 7 \\cdot 600 = 4\\,200$.',
        'Thế $x = 600 - y$: $3(600 - y) + 15y = 4\\,200$, tức $1\\,800 + 12y = 4\\,200$, nên $y = 200$, $x = 400$.',
        'Thử lại: lượng muối $0{,}03 \\cdot 400 + 0{,}15 \\cdot 200 = 12 + 30 = 42$ (g) và $\\dfrac{42}{600} = 7\\%$.',
      ],
      answer: 'Lấy $400$ g dung dịch $3\\%$ và $200$ g dung dịch $15\\%$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Hoà tan $15$ g muối vào $185$ g nước. Nồng độ phần trăm của dung dịch là bao nhiêu?',
      answer: 7.5,
      unit: '%',
      hints: [
        'Khối lượng dung dịch gồm cả muối và nước.',
        '$C\\% = \\dfrac{m_{ct}}{m_{dd}} \\cdot 100\\%$ với $m_{dd} = 15 + 185$.',
      ],
      solution:
        '$m_{dd} = 15 + 185 = 200$ g, nên $C\\% = \\dfrac{15}{200} \\cdot 100\\% = 7{,}5\\%$.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu gam đường trong $250$ g nước đường nồng độ $8\\%$?',
      answer: 20,
      unit: 'g',
      hints: ['$m_{ct} = \\dfrac{C \\cdot m_{dd}}{100}$.'],
      solution: '$m_{ct} = \\dfrac{8 \\cdot 250}{100} = 20$ g.',
    },
    {
      type: 'choice',
      prompt:
        'Gọi $x$ (g) là lượng đường, $y$ (g) là lượng nước để pha $1\\,000$ ml nước đường $10\\%$ (khối lượng riêng của đường $1{,}1$ g/ml). Hệ phương trình nào đúng?',
      options: [
        '$\\begin{cases} x + y = 1\\,000 \\\\ 10x - 90y = 0 \\end{cases}$',
        '$\\begin{cases} x + 1{,}1y = 1\\,100 \\\\ 90x - 10y = 0 \\end{cases}$',
        '$\\begin{cases} 1{,}1x + y = 1\\,000 \\\\ 90x - 10y = 0 \\end{cases}$',
        '$\\begin{cases} x + 1{,}1y = 1\\,100 \\\\ 10x - 90y = 0 \\end{cases}$',
      ],
      answer: 1,
      hints: [
        'Thể tích đường là $\\dfrac{x}{1{,}1}$ ml; nhân phương trình thể tích với $1{,}1$.',
        'Phương trình nồng độ: $100x = 10(x + y)$.',
      ],
      solution:
        'Thể tích: $\\dfrac{x}{1{,}1} + y = 1\\,000 \\Leftrightarrow x + 1{,}1y = 1\\,100$. Nồng độ: $\\dfrac{x}{x + y} \\cdot 100 = 10 \\Leftrightarrow 90x - 10y = 0$.',
    },
    {
      type: 'number',
      prompt:
        'Cần bao nhiêu gam đường cát để pha $1\\,000$ ml nước đường $20\\%$ (khối lượng riêng của đường $1{,}1$ g/ml, coi thể tích dung dịch bằng tổng thể tích đường và nước)? Làm tròn đến hàng phần mười.',
      answer: 203.7,
      tolerance: 0.05,
      unit: 'g',
      hints: [
        'Hệ: $x + 1{,}1y = 1\\,100$ và $80x - 20y = 0$.',
        'Từ phương trình thứ hai, $y = 4x$; thế vào phương trình thứ nhất.',
      ],
      solution:
        '$y = 4x$, nên $x + 4{,}4x = 1\\,100$, $x = \\dfrac{1\\,100}{5{,}4} \\approx 203{,}7$ g (và $y \\approx 814{,}8$ g).',
    },
    {
      type: 'number',
      prompt:
        'Cần bao nhiêu gam dung dịch muối $20\\%$ trộn với dung dịch muối $5\\%$ để được $300$ g dung dịch muối $10\\%$?',
      answer: 100,
      unit: 'g',
      hints: [
        'Gọi $x$, $y$ là khối lượng dung dịch $20\\%$ và $5\\%$: $x + y = 300$.',
        'Lượng muối: $20x + 5y = 10 \\cdot 300$.',
      ],
      solution:
        'Hệ $\\begin{cases} x + y = 300 \\\\ 20x + 5y = 3\\,000 \\end{cases}$. Thế $y = 300 - x$: $15x + 1\\,500 = 3\\,000$, $x = 100$ g (và $y = 200$ g).',
    },
    {
      type: 'number',
      prompt:
        'Cần pha $400$ g dung dịch $18\\%$ từ dung dịch $30\\%$ và dung dịch $10\\%$. Phải lấy bao nhiêu gam dung dịch $10\\%$?',
      answer: 240,
      unit: 'g',
      hints: [
        'Hệ: $x + y = 400$, $30x + 10y = 18 \\cdot 400$, với $y$ là khối lượng dung dịch $10\\%$.',
      ],
      solution:
        '$30(400 - y) + 10y = 7\\,200 \\Leftrightarrow 12\\,000 - 20y = 7\\,200 \\Leftrightarrow y = 240$ g; khi đó $x = 160$ g.',
    },
    {
      type: 'number',
      prompt:
        'Trộn $400$ g dung dịch $25\\%$ với $600$ g dung dịch $10\\%$ (cùng chất tan). Nồng độ của dung dịch mới là bao nhiêu phần trăm?',
      answer: 16,
      unit: '%',
      hints: ['Tính tổng lượng chất tan và tổng khối lượng dung dịch.'],
      solution:
        'Chất tan: $0{,}25 \\cdot 400 + 0{,}1 \\cdot 600 = 100 + 60 = 160$ g trong $1\\,000$ g dung dịch, nên nồng độ là $16\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Cần thêm bao nhiêu gam nước vào $200$ g dung dịch muối $15\\%$ để được dung dịch muối $10\\%$?',
      answer: 100,
      unit: 'g',
      hints: [
        'Lượng muối không đổi khi thêm nước.',
        'Gọi $w$ là lượng nước thêm: $\\dfrac{30}{200 + w} = \\dfrac{10}{100}$.',
      ],
      solution:
        'Lượng muối: $0{,}15 \\cdot 200 = 30$ g. Dung dịch mới nặng $\\dfrac{30}{0{,}1} = 300$ g, nên cần thêm $300 - 200 = 100$ g nước.',
    },
    {
      type: 'number',
      prompt:
        'Cần thêm bao nhiêu gam muối vào $300$ g dung dịch muối $10\\%$ để được dung dịch muối $20\\%$?',
      answer: 37.5,
      unit: 'g',
      hints: [
        'Thêm muối thì cả lượng chất tan và khối lượng dung dịch đều tăng.',
        'Gọi $s$ là lượng muối thêm: $\\dfrac{30 + s}{300 + s} = \\dfrac{20}{100}$.',
      ],
      solution:
        '$100(30 + s) = 20(300 + s) \\Leftrightarrow 3\\,000 + 100s = 6\\,000 + 20s \\Leftrightarrow 80s = 3\\,000 \\Leftrightarrow s = 37{,}5$ g.',
    },
    {
      type: 'choice',
      prompt: 'Từ hai dung dịch muối $20\\%$ và $5\\%$, có pha được dung dịch muối $25\\%$ không?',
      options: [
        'Có, lấy hai dung dịch bằng nhau',
        'Có, chỉ cần lấy nhiều dung dịch $20\\%$ hơn',
        'Không, vì nồng độ hỗn hợp luôn nằm giữa $5\\%$ và $20\\%$',
        'Không, vì không thể trộn hai dung dịch khác nồng độ',
      ],
      answer: 2,
      hints: ['Thử giải hệ $x + y = m$, $20x + 5y = 25m$ và xem dấu của $y$.'],
      solution:
        'Từ hệ suy ra $15y = -5m$, tức $y < 0$: vô lí. Nồng độ hỗn hợp luôn nằm giữa nồng độ của hai dung dịch, nên không pha được $25\\%$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước pha một dung dịch theo nồng độ yêu cầu.',
      items: [
        'Cân, đong đúng lượng tính được rồi trộn đều.',
        'Gọi ẩn là lượng các thành phần cần lấy.',
        'Kiểm tra lại nồng độ của dung dịch thu được.',
        'Lập hệ phương trình từ khối lượng (hoặc thể tích) và lượng chất tan, rồi giải hệ.',
      ],
      answer: [1, 3, 0, 2],
      hints: ['Phải tính xong mới cân, và cân xong mới kiểm tra.'],
      solution: 'Gọi ẩn, lập và giải hệ, cân đong và trộn, cuối cùng kiểm tra lại nồng độ.',
    },
  ],
  takeaways: [
    '$C\\% = \\dfrac{m_{ct}}{m_{dd}} \\cdot 100\\%$, với $m_{dd} = m_{ct} + m_{dm}$.',
    'Pha từ chất tan và nước: một phương trình về khối lượng (hoặc thể tích), một phương trình về nồng độ.',
    'Trộn hai dung dịch: $x + y = m$ và $c_1 x + c_2 y = c\\, m$.',
    'Nồng độ hỗn hợp luôn nằm giữa hai nồng độ ban đầu; luôn thử lại kết quả sau khi giải hệ.',
  ],
};
