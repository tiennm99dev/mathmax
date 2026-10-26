/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: nhận biết đại lượng tỉ lệ thuận, tỉ lệ nghịch trong đời sống qua việc đổi đơn vị đo lường (inch, foot, pound, hải lí), tính giá sau khi giảm giá, tiền lãi tiết kiệm và quy tắc 72, rồi giải các bài toán thực tế.',
  intro:
    'Tượng Nữ thần Tự do ở Mỹ cao $151$ ft $1$ in (không kể bệ tượng). Như vậy là bao nhiêu mét? Gửi tiết kiệm với lãi suất $6\\%$ một năm thì sau bao lâu số tiền tăng gấp đôi? Những câu hỏi đời thường này đều dùng đến hai loại đại lượng em đã học ở chương VI: đại lượng tỉ lệ thuận và đại lượng tỉ lệ nghịch.',
  objectives: [
    'Nhận biết hai đại lượng tỉ lệ thuận, tỉ lệ nghịch hay không tỉ lệ trong các tình huống thực tế, dựa vào bảng giá trị.',
    'Đổi đơn vị đo độ dài và khối lượng giữa hệ đo lường Anh – Mỹ và hệ mét.',
    'Tính giá mới sau khi giảm giá theo phần trăm, tiền lãi tiết kiệm sau một năm.',
    'Dùng quy tắc 72 để ước lượng thời gian số tiền gửi tăng gấp đôi, hoặc lãi suất cần có.',
  ],
  sections: [
    {
      heading: 'Nhắc lại: đại lượng tỉ lệ thuận, tỉ lệ nghịch',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tỉ lệ thuận',
          text: 'Nếu đại lượng $y$ liên hệ với đại lượng $x$ theo công thức $y = kx$ ($k$ là hằng số khác $0$) thì ta nói $y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $k$. Khi đó thương $\\dfrac{y}{x}$ luôn không đổi và bằng $k$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tỉ lệ nghịch',
          text: 'Nếu đại lượng $y$ liên hệ với đại lượng $x$ theo công thức $y = \\dfrac{a}{x}$ hay $xy = a$ ($a$ là hằng số khác $0$) thì ta nói $y$ tỉ lệ nghịch với $x$ theo hệ số tỉ lệ $a$. Khi đó tích $xy$ luôn không đổi và bằng $a$.',
        },
        {
          type: 'p',
          text: 'Để nhận biết, em lập bảng giá trị tương ứng của $x$ và $y$, rồi tính thương $y : x$ và tích $x \\cdot y$ ở mỗi cột. Thương không đổi: tỉ lệ thuận. Tích không đổi: tỉ lệ nghịch. Cả hai đều thay đổi: hai đại lượng không tỉ lệ (dù có thể cùng tăng).',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: '"Cùng tăng" chưa đủ để kết luận tỉ lệ thuận. Cước taxi tăng khi quãng đường tăng, nhưng vì có tiền mở cửa cố định nên đi gấp đôi quãng đường không phải trả gấp đôi tiền.',
        },
      ],
    },
    {
      heading: 'Đại lượng tỉ lệ trong đo lường',
      blocks: [
        {
          type: 'p',
          text: 'Ở Mỹ, Anh và một số nước, người ta còn dùng các đơn vị đo như inch, foot, pound. Một số quan hệ giữa các đơn vị này và hệ mét:',
        },
        {
          type: 'table',
          head: ['Đơn vị', 'Kí hiệu', 'Quan hệ'],
          rows: [
            ['inch', 'in', '$1$ in $= 2{,}54$ cm'],
            ['foot (số nhiều: feet)', 'ft', '$1$ ft $= 12$ in $= 30{,}48$ cm'],
            ['yard', 'yd', '$1$ yd $= 3$ ft $= 0{,}9144$ m'],
            ['dặm (mile)', 'mi', '$1$ mi $= 1\\,760$ yd $= 1\\,609{,}344$ m'],
            ['hải lí', 'nmi', '$1$ hải lí $= 1\\,852$ m'],
            ['pound', 'lb', '$1$ lb $= 16$ oz $= 0{,}45359237$ kg'],
          ],
          caption: 'Một số đơn vị đo độ dài, khối lượng và quan hệ với hệ mét.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Số đo theo xăng-ti-mét tỉ lệ thuận với số đo theo inch của cùng một độ dài, hệ số tỉ lệ $2{,}54$. Tổng quát, số đo một đại lượng theo hai đơn vị khác nhau luôn tỉ lệ thuận với nhau, nên muốn đổi đơn vị chỉ cần nhân với hệ số tỉ lệ.',
        },
        {
          type: 'p',
          text: 'Tượng Nữ thần Tự do được làm từ khoảng $60\\,000$ lb đồng và $250\\,000$ lb thép; tổng khối lượng tượng khoảng $450\\,000$ lb. Đổi ra tấn ($1$ tấn $= 1\\,000$ kg):',
        },
        {
          type: 'table',
          head: ['Vật liệu', 'Pound', 'Ki-lô-gam', 'Tấn (làm tròn)'],
          rows: [
            ['Đồng', '$60\\,000$', '$27\\,215{,}5422$', '$27{,}22$'],
            ['Thép', '$250\\,000$', '$113\\,398{,}0925$', '$113{,}40$'],
            ['Tổng khối lượng', '$450\\,000$', '$204\\,116{,}5665$', '$204{,}12$'],
          ],
          caption: 'Khối lượng tượng Nữ thần Tự do, làm tròn đến hàng phần trăm của tấn.',
        },
      ],
    },
    {
      heading: 'Đại lượng tỉ lệ trong tài chính',
      blocks: [
        {
          type: 'p',
          text: 'Giảm giá: khi cửa hàng giảm giá $15\\%$, giá mới bằng $100\\% - 15\\% = 85\\%$ giá cũ:',
        },
        { type: 'tex', tex: '\\text{Giá mới} = 0{,}85 \\cdot \\text{Giá cũ}' },
        {
          type: 'p',
          text: 'Vậy giá mới tỉ lệ thuận với giá cũ theo hệ số $0{,}85$. Chiếc áo phông giá $300$ nghìn đồng sau khi giảm còn $0{,}85 \\cdot 300 = 255$ nghìn đồng.',
        },
        {
          type: 'p',
          text: 'Tiền lãi tiết kiệm: gửi $a$ đồng kì hạn $12$ tháng với lãi suất $5{,}6\\%$ một năm thì sau một năm tiền lãi là $a \\cdot 5{,}6\\% = 0{,}056a$ (đồng). Tiền lãi tỉ lệ thuận với tiền gửi theo hệ số $0{,}056$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc 72',
          text: 'Gửi tiền với lãi suất kép cố định $r\\%$ một năm (tiền lãi mỗi năm được nhập vào gốc), thời gian $t$ (năm) để số tiền tăng gấp đôi xấp xỉ bằng $$t = \\frac{72}{r}.$$ Vì $t \\cdot r = 72$, thời gian $t$ tỉ lệ nghịch với lãi suất $r$ theo hệ số $72$.',
        },
        {
          type: 'list',
          items: [
            'Lãi suất $6\\%$ một năm: số tiền tăng gấp đôi sau khoảng $72 : 6 = 12$ năm.',
            'Muốn số tiền tăng gấp đôi sau $5$ năm thì cần lãi suất khoảng $72 : 5 = 14{,}4\\%$ một năm.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Quy tắc 72 chỉ cho kết quả gần đúng, dùng để ước lượng nhanh; nó khá sát khi lãi suất trong khoảng từ $4\\%$ đến $12\\%$ một năm.',
        },
      ],
    },
    {
      heading: 'Dự án: Đại lượng tỉ lệ quanh em',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi nhóm $4$ – $5$ học sinh tìm trong đời sống ít nhất ba cặp đại lượng, lập bảng giá trị, xác định chúng tỉ lệ thuận, tỉ lệ nghịch hay không tỉ lệ, rồi dùng kết quả để giải một bài toán thực tế.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: máy tính cầm tay, giấy kẻ ô, thước; thông tin thật như nhãn hàng hoá ghi đơn vị inch hoặc pound, tờ quảng cáo giảm giá, bảng lãi suất tiết kiệm của một ngân hàng, bảng giá cước taxi.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đổi đơn vị: tìm thông số một đồ vật ghi theo inch hoặc pound (màn hình ti vi, cỡ vành xe đạp, túi bột) và đổi ra xăng-ti-mét hoặc ki-lô-gam.',
            'Mua sắm: chọn một mặt hàng được giảm giá; viết công thức tính giá mới theo giá cũ và lập bảng giá mới cho ít nhất bốn mức giá cũ.',
            'Tiết kiệm: tra lãi suất kì hạn $12$ tháng của một ngân hàng; tính tiền lãi sau một năm cho ba khoản tiền gửi và dùng quy tắc 72 ước lượng thời gian tiền tăng gấp đôi.',
            'Với mỗi cặp đại lượng, tính thương $y : x$ và tích $x \\cdot y$ trong bảng để kết luận tỉ lệ thuận, tỉ lệ nghịch hay không tỉ lệ; nêu hệ số tỉ lệ nếu có.',
            'Vẽ các điểm $(x; y)$ của mỗi bảng trên giấy kẻ ô và nhận xét hình dạng của chúng.',
            'Tìm thêm một ví dụ hai đại lượng cùng tăng nhưng không tỉ lệ thuận (cước taxi, tiền điện tính theo bậc) và giải thích vì sao.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: một áp phích hoặc bài trình chiếu gồm nguồn số liệu, các bảng giá trị có cột thương và tích, kết luận về từng cặp đại lượng kèm hệ số tỉ lệ, và lời giải bài toán thực tế của nhóm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng giá trị và đồ thị cho biết quan hệ tỉ lệ',
    instruction:
      'Chọn một tình huống, nhập vài giá trị của $x$ để thêm vào bảng. Quan sát cột $y : x$, cột $x \\cdot y$ và các điểm trên đồ thị, rồi cho biết $y$ tỉ lệ thuận, tỉ lệ nghịch với $x$ hay không tỉ lệ. Trả lời đúng thì đồ thị của quy tắc hiện ra.',
  },
  examples: [
    {
      problem:
        'Tượng Nữ thần Tự do cao $151$ ft $1$ in (không kể bệ tượng). Tính chiều cao của tượng theo đơn vị mét, làm tròn đến hàng đơn vị.',
      steps: [
        'Đổi ra inch: $1$ ft $= 12$ in nên $151$ ft $1$ in $= 151 \\cdot 12 + 1 = 1\\,813$ in.',
        'Số đo theo cm tỉ lệ thuận với số đo theo inch, hệ số $2{,}54$: $1\\,813 \\cdot 2{,}54 = 4\\,605{,}02$ cm.',
        'Đổi ra mét: $4\\,605{,}02$ cm $= 46{,}0502$ m $\\approx 46$ m.',
      ],
      answer: 'Tượng cao khoảng $46$ m.',
    },
    {
      problem:
        'Lãi suất tiết kiệm kì hạn $12$ tháng là $5{,}6\\%$ một năm. Cô Hà gửi $120$ triệu đồng. a) Sau một năm cô nhận được cả gốc lẫn lãi bao nhiêu? b) Theo quy tắc 72, sau khoảng bao nhiêu năm số tiền của cô tăng gấp đôi (lãi được nhập vào gốc mỗi năm)?',
      steps: [
        'Tiền lãi tỉ lệ thuận với tiền gửi theo hệ số $0{,}056$: tiền lãi là $120 \\cdot 0{,}056 = 6{,}72$ (triệu đồng).',
        'Cả gốc lẫn lãi: $120 + 6{,}72 = 126{,}72$ (triệu đồng).',
        'Theo quy tắc 72: $t = 72 : 5{,}6 \\approx 12{,}86$, làm tròn khoảng $13$ năm.',
      ],
      answer: 'a) $126{,}72$ triệu đồng. b) Khoảng $13$ năm.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Biết $1$ ft $= 12$ in và $1$ in $= 2{,}54$ cm. Hỏi $1$ ft bằng bao nhiêu xăng-ti-mét?',
      answer: 30.48,
      unit: 'cm',
      hints: ['Đổi $1$ ft ra inch trước, rồi nhân với $2{,}54$.'],
      solution: '$1$ ft $= 12$ in $= 12 \\cdot 2{,}54 = 30{,}48$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một bạn học sinh ở Mỹ cao $5$ ft $7$ in. Chiều cao của bạn là bao nhiêu xăng-ti-mét (làm tròn đến hàng đơn vị)?',
      answer: 170,
      unit: 'cm',
      hints: [
        'Đổi ra inch: $5$ ft $7$ in $= 5 \\cdot 12 + 7$ in.',
        'Nhân số inch với $2{,}54$ rồi làm tròn.',
      ],
      solution: '$5 \\cdot 12 + 7 = 67$ in; $67 \\cdot 2{,}54 = 170{,}18 \\approx 170$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một bao bột mì ghi khối lượng $25$ lb. Khối lượng bao bột là bao nhiêu ki-lô-gam (làm tròn đến hàng phần trăm)? Biết $1$ lb $= 0{,}45359237$ kg.',
      answer: 11.34,
      tolerance: 0.005,
      unit: 'kg',
      hints: ['Khối lượng theo kg tỉ lệ thuận với khối lượng theo lb, hệ số $0{,}45359237$.'],
      solution: '$25 \\cdot 0{,}45359237 = 11{,}33980925 \\approx 11{,}34$ kg.',
    },
    {
      type: 'number',
      prompt:
        'Một máy bay bay được quãng đường tối đa $7\\,635$ hải lí. Quãng đường đó là bao nhiêu ki-lô-mét? Biết $1$ hải lí $= 1{,}852$ km.',
      answer: 14140.02,
      tolerance: 0.005,
      unit: 'km',
      hints: ['Nhân số hải lí với $1{,}852$.'],
      solution: '$7\\,635 \\cdot 1{,}852 = 14\\,140{,}02$ km.',
    },
    {
      type: 'number',
      prompt:
        'Cửa hàng giảm giá $20\\%$ mọi mặt hàng. Một chiếc cặp giá $250$ nghìn đồng, sau khi giảm còn bao nhiêu nghìn đồng?',
      answer: 200,
      unit: 'nghìn đồng',
      hints: ['Giá mới bằng $100\\% - 20\\% = 80\\%$ giá cũ.'],
      solution: 'Giá mới $= 0{,}8 \\cdot 250 = 200$ nghìn đồng.',
    },
    {
      type: 'choice',
      prompt:
        'Một chiếc áo giá $300$ nghìn đồng được giảm $10\\%$, sau đó giảm tiếp $10\\%$ trên giá đã giảm. Giá cuối cùng là bao nhiêu?',
      options: ['$240$ nghìn đồng', '$243$ nghìn đồng', '$270$ nghìn đồng', '$280$ nghìn đồng'],
      answer: 1,
      hints: [
        'Mỗi lần giảm $10\\%$, giá mới bằng $0{,}9$ lần giá trước đó.',
        'Hai lần giảm liên tiếp không giống một lần giảm $20\\%$.',
      ],
      solution:
        'Lần thứ nhất: $0{,}9 \\cdot 300 = 270$. Lần thứ hai: $0{,}9 \\cdot 270 = 243$ nghìn đồng. (Giảm $20\\%$ một lần sẽ còn $240$, rẻ hơn.)',
    },
    {
      type: 'number',
      prompt:
        'Gửi $50$ triệu đồng kì hạn $12$ tháng với lãi suất $5{,}6\\%$ một năm. Tiền lãi sau một năm là bao nhiêu triệu đồng?',
      answer: 2.8,
      unit: 'triệu đồng',
      hints: ['Tiền lãi $=$ tiền gửi $\\cdot\\ 5{,}6\\%$.'],
      solution: '$50 \\cdot 0{,}056 = 2{,}8$ triệu đồng.',
    },
    {
      type: 'number',
      prompt:
        'Theo quy tắc 72, gửi tiền với lãi suất kép $8\\%$ một năm thì sau khoảng bao nhiêu năm số tiền tăng gấp đôi?',
      answer: 9,
      unit: 'năm',
      hints: ['$t = \\dfrac{72}{r}$ với $r$ là lãi suất tính theo phần trăm.'],
      solution: '$t = 72 : 8 = 9$ năm.',
    },
    {
      type: 'number',
      prompt:
        'Bác Lan muốn số tiền gửi tăng gấp đôi sau $8$ năm. Theo quy tắc 72, cần lãi suất kép khoảng bao nhiêu phần trăm một năm?',
      answer: 9,
      unit: '%',
      hints: ['Từ $t \\cdot r = 72$, suy ra $r = 72 : t$.'],
      solution: '$r = 72 : 8 = 9$, tức lãi suất khoảng $9\\%$ một năm.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        'Tiền lãi sau một năm tỉ lệ thuận với tiền gửi (cùng lãi suất).',
        'Số đo độ dài theo cm tỉ lệ thuận với số đo theo inch, hệ số $2{,}54$.',
        'Theo quy tắc 72, thời gian để tiền tăng gấp đôi tỉ lệ thuận với lãi suất.',
        'Tiền cước taxi ($12$ nghìn đồng mở cửa, $15$ nghìn đồng mỗi km) tỉ lệ thuận với quãng đường.',
      ],
      answers: [0, 1],
      hints: [
        'Với mỗi khẳng định, viết công thức liên hệ hai đại lượng rồi so với $y = kx$ và $y = \\dfrac{a}{x}$.',
      ],
      solution:
        'Tiền lãi $= 0{,}056 \\cdot$ tiền gửi và số cm $= 2{,}54 \\cdot$ số inch: tỉ lệ thuận (đúng). Quy tắc 72: $t \\cdot r = 72$ nên $t$ tỉ lệ nghịch với $r$ (sai). Cước taxi $y = 15x + 12$: đi $1$ km trả $27$, đi $2$ km trả $42 \\ne 2 \\cdot 27$, nên không tỉ lệ thuận (sai).',
    },
  ],
  takeaways: [
    'Lập bảng giá trị: thương $y : x$ không đổi thì tỉ lệ thuận, tích $x \\cdot y$ không đổi thì tỉ lệ nghịch.',
    'Đổi đơn vị là nhân với hệ số tỉ lệ: $1$ in $= 2{,}54$ cm, $1$ ft $= 12$ in, $1$ lb $\\approx 0{,}4536$ kg, $1$ hải lí $= 1\\,852$ m.',
    'Giảm giá $p\\%$: giá mới $= (100 - p)\\%$ giá cũ, tỉ lệ thuận với giá cũ.',
    'Tiền lãi một năm $=$ tiền gửi $\\cdot$ lãi suất, tỉ lệ thuận với tiền gửi.',
    'Quy tắc 72: $t \\approx \\dfrac{72}{r}$, thời gian tăng gấp đôi tỉ lệ nghịch với lãi suất.',
  ],
};
