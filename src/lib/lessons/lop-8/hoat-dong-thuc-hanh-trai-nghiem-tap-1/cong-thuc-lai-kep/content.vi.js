/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: phân biệt lãi đơn và lãi kép, lập công thức lãi kép T = P(1 + r)^n, khai triển nó thành đa thức của r và dùng để chọn cách gửi tiết kiệm có lợi nhất.',
  intro:
    'Khi gửi tiết kiệm, đến cuối mỗi kì hạn ngân hàng trả tiền lãi. Nếu người gửi không rút tiền lãi ra mà để ngân hàng nhập vào tiền gốc, thì kì sau tiền lãi cũng sinh ra lãi. Bài này lập công thức cho số tiền đó, viết nó thành một đa thức và dùng công thức để so sánh các cách gửi tiền.',
  objectives: [
    'Phân biệt lãi đơn và lãi kép.',
    'Lập được công thức lãi kép $T = P(1 + r)^n$ và tính số tiền nhận được sau $n$ kì hạn.',
    'Khai triển $P(1 + r)^n$ thành đa thức của $r$ bằng các hằng đẳng thức đáng nhớ và giải thích ý nghĩa từng hạng tử.',
    'Thu thập lãi suất thực tế và dùng công thức lãi kép để chọn phương án gửi tiết kiệm.',
  ],
  sections: [
    {
      heading: 'Lãi đơn và lãi kép',
      blocks: [
        {
          type: 'p',
          text: 'Gửi số tiền gốc $P$ đồng với lãi suất $r$ mỗi kì hạn ($r$ viết dưới dạng số thập phân, chẳng hạn $6\\% = 0{,}06$). Tiền lãi của một kì là $P \\cdot r$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lãi đơn',
          text: 'Chỉ tiền gốc sinh ra lãi; tiền lãi mỗi kì được rút ra hoặc để riêng, không nhập vào gốc. Sau $n$ kì, số tiền cả gốc lẫn lãi là $$T = P + nPr = P(1 + nr).$$',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lãi kép',
          text: 'Hết mỗi kì, tiền lãi được nhập vào tiền gốc để tính lãi cho kì sau. Số tiền sau mỗi kì gấp $1 + r$ lần số tiền đầu kì đó.',
        },
        {
          type: 'table',
          head: ['Sau', 'Số tiền (lãi kép)'],
          rows: [
            ['1 kì', '$P + Pr = P(1 + r)$'],
            ['2 kì', '$P(1 + r) + P(1 + r)r = P(1 + r)^2$'],
            ['3 kì', '$P(1 + r)^2 \\cdot (1 + r) = P(1 + r)^3$'],
            ['$n$ kì', '$P(1 + r)^n$'],
          ],
          caption: 'Mỗi kì, số tiền được nhân thêm với $1 + r$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức lãi kép',
          text: 'Gửi $P$ đồng với lãi suất $r$ mỗi kì hạn theo thể thức lãi kép, sau $n$ kì số tiền cả gốc lẫn lãi là $$T = P(1 + r)^n.$$',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lãi suất mỗi kì',
          text: 'Ngân hàng thường công bố lãi suất theo năm. Với kì hạn 1 tháng, lãi suất mỗi kì là lãi suất năm chia cho $12$: lãi suất $6\\%$/năm ứng với $0{,}5\\%$/tháng. Với kì hạn $6$ tháng, lãi suất mỗi kì là lãi suất năm chia cho $2$.',
        },
      ],
    },
    {
      heading: 'Số tiền là một đa thức của lãi suất',
      blocks: [
        {
          type: 'p',
          text: 'Coi $r$ là biến. Dùng hằng đẳng thức bình phương của một tổng và lập phương của một tổng, ta viết số tiền sau $2$ kì và $3$ kì thành đa thức của $r$:',
        },
        {
          type: 'tex',
          tex: 'P(1 + r)^2 = P(1 + 2r + r^2) = P + 2Pr + Pr^2',
        },
        {
          type: 'tex',
          tex: 'P(1 + r)^3 = P(1 + 3r + 3r^2 + r^3) = P + 3Pr + 3Pr^2 + Pr^3',
        },
        {
          type: 'p',
          text: 'Hai hạng tử đầu $P + 2Pr$ (hoặc $P + 3Pr$) đúng bằng số tiền theo lãi đơn. Các hạng tử còn lại, như $Pr^2$, là phần "lãi của lãi". Vì $r$ nhỏ nên $r^2$, $r^3$ rất nhỏ; sau vài kì phần chênh lệch nhỏ, nhưng gửi càng lâu thì lãi kép càng vượt xa lãi đơn.',
        },
        {
          type: 'table',
          head: ['Sau', 'Lãi đơn', 'Lãi kép', 'Chênh lệch'],
          rows: [
            ['1 năm', '$106$', '$106$', '$0$'],
            ['2 năm', '$112$', '$112{,}36$', '$0{,}36$'],
            ['3 năm', '$118$', '$119{,}1016$', '$1{,}1016$'],
            ['10 năm', '$160$', '$\\approx 179{,}085$', '$\\approx 19{,}085$'],
          ],
          caption:
            'Gửi $100$ triệu đồng, lãi suất $6\\%$/năm, kì hạn $12$ tháng (đơn vị: triệu đồng).',
        },
      ],
    },
    {
      heading: 'Dự án: Chọn cách gửi tiết kiệm',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: dùng công thức lãi kép để tư vấn cho người gửi tiền. Chia lớp thành bốn nhóm, hai nhóm làm Dự án 1, hai nhóm làm Dự án 2, rồi trình bày trước lớp.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: bảng lãi suất tiết kiệm của một số ngân hàng (xem trên trang web của ngân hàng hoặc hỏi người thân), máy tính cầm tay, giấy kẻ bảng.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Dự án 1. Ông Hưng muốn gửi $300$ triệu đồng, kì hạn $12$ tháng. Thu thập lãi suất kì hạn $12$ tháng của ít nhất năm ngân hàng, lập bảng gồm tên ngân hàng, lãi suất và tiền lãi sau $12$ tháng ($300 \\cdot r$ triệu đồng). Chọn ngân hàng có lợi nhất cho ông Hưng.',
            'Dự án 2. Bà Hương muốn gửi $250$ triệu đồng trong $2$ năm ở một ngân hàng. Thu thập lãi suất các kì hạn $1$ tháng, $6$ tháng, $12$ tháng của ngân hàng đó. Với lãi suất năm $r$ và $k$ kì mỗi năm, số tiền sau $2$ năm là $T = 250\\left(1 + \\dfrac{r}{k}\\right)^{2k}$. Tính $T$ cho từng kì hạn và chọn kì hạn có lợi nhất.',
            'Dùng khung tương tác (hoặc bảng tính) để vẽ đồ thị lãi đơn và lãi kép cho phương án đã chọn và giải thích sự khác nhau.',
          ],
        },
        {
          type: 'table',
          head: ['Kì hạn', 'Lãi suất (giả định)', 'Số tiền sau 2 năm (triệu đồng)'],
          rows: [
            ['1 tháng', '$4{,}5\\%$/năm', '$250(1 + 0{,}00375)^{24} \\approx 273{,}50$'],
            ['6 tháng', '$5{,}5\\%$/năm', '$250(1 + 0{,}0275)^{4} \\approx 278{,}66$'],
            ['12 tháng', '$6\\%$/năm', '$250(1 + 0{,}06)^{2} = 280{,}9$'],
          ],
          caption:
            'Ví dụ cách trình bày Dự án 2 với lãi suất giả định; các nhóm thay bằng lãi suất thật đã thu thập.',
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng số liệu (ghi rõ nguồn và ngày lấy lãi suất), các phép tính, đồ thị, phương án được chọn và lí do. Lưu ý: rút tiền trước hạn thường chỉ được hưởng lãi suất không kì hạn rất thấp.',
        },
      ],
    },
  ],
  explore: {
    title: 'Máy tính tiết kiệm: lãi đơn và lãi kép',
    instruction:
      'Kéo các thanh trượt để chọn tiền gốc, lãi suất năm và thời gian gửi; chọn kì hạn 12 tháng hoặc 1 tháng. Kéo thanh "Xem số tiền sau" để so sánh hai đường: lãi đơn tăng đều, lãi kép cong lên. Với 1 đến 4 kì, khung còn khai triển $P(1 + r)^n$ thành đa thức.',
  },
  examples: [
    {
      problem:
        'Bác An gửi $100$ triệu đồng, kì hạn $12$ tháng, lãi suất $6\\%$/năm theo thể thức lãi kép. Tính số tiền bác nhận được sau $2$ năm và sau $3$ năm. Sau $3$ năm, lãi kép hơn lãi đơn bao nhiêu?',
      steps: [
        'Mỗi kì là $1$ năm, $r = 0{,}06$, $P = 100$ triệu đồng.',
        'Sau $2$ năm: $T_2 = 100 \\cdot 1{,}06^2 = 100 \\cdot 1{,}1236 = 112{,}36$ (triệu đồng).',
        'Sau $3$ năm: $T_3 = 100 \\cdot 1{,}06^3 = 100 \\cdot 1{,}191016 = 119{,}1016$ (triệu đồng).',
        'Lãi đơn sau $3$ năm: $100(1 + 3 \\cdot 0{,}06) = 118$ (triệu đồng). Chênh lệch: $119{,}1016 - 118 = 1{,}1016$ (triệu đồng).',
      ],
      answer:
        'Sau $2$ năm: $112{,}36$ triệu đồng; sau $3$ năm: $119{,}1016$ triệu đồng, hơn lãi đơn $1{,}1016$ triệu đồng (tức $1\\,101\\,600$ đồng).',
    },
    {
      problem:
        'Gửi $50$ triệu đồng theo thể thức lãi kép, lãi suất $r$ mỗi năm. Viết số tiền sau $2$ năm dưới dạng đa thức của $r$, rồi tính giá trị của nó khi $r = 0{,}08$.',
      steps: [
        'Số tiền sau $2$ năm: $T = 50(1 + r)^2$.',
        'Bình phương của một tổng: $(1 + r)^2 = 1 + 2r + r^2$.',
        'Nhân đơn thức với đa thức: $T = 50r^2 + 100r + 50$.',
        'Thay $r = 0{,}08$: $T = 50 \\cdot 0{,}0064 + 100 \\cdot 0{,}08 + 50 = 0{,}32 + 8 + 50 = 58{,}32$.',
      ],
      answer:
        '$T = 50r^2 + 100r + 50$; với $r = 0{,}08$ thì $T = 58{,}32$ triệu đồng. Phần $50r^2 = 0{,}32$ triệu đồng là lãi của lãi.',
    },
    {
      problem:
        'Gửi $200$ triệu đồng, kì hạn $1$ tháng, lãi suất $6\\%$/năm, lãi được nhập vào gốc sau mỗi tháng. Tính số tiền sau $3$ tháng.',
      steps: [
        'Lãi suất mỗi kì (một tháng): $r = 6\\% : 12 = 0{,}5\\% = 0{,}005$.',
        'Số kì: $n = 3$.',
        '$T = 200 \\cdot 1{,}005^3 = 200 \\cdot 1{,}015075125 = 203{,}015025$ (triệu đồng).',
      ],
      answer: '$T = 203\\,015\\,025$ đồng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Gửi $100$ triệu đồng, lãi suất $5\\%$/năm, kì hạn $12$ tháng, mỗi năm rút tiền lãi ra (lãi đơn). Sau $3$ năm, tổng số tiền gốc và các khoản lãi đã nhận là bao nhiêu triệu đồng?',
      answer: 115,
      unit: 'triệu đồng',
      hints: ['Lãi đơn: mỗi năm tiền lãi đều bằng $P \\cdot r$.', '$T = P(1 + nr)$.'],
      solution:
        'Mỗi năm lãi $100 \\cdot 0{,}05 = 5$ triệu đồng. Sau $3$ năm: $100 + 3 \\cdot 5 = 115$ triệu đồng.',
    },
    {
      type: 'number',
      prompt:
        'Cũng gửi $100$ triệu đồng, lãi suất $5\\%$/năm, kì hạn $12$ tháng, nhưng lãi được nhập vào gốc (lãi kép). Sau $2$ năm số tiền là bao nhiêu triệu đồng?',
      answer: 110.25,
      unit: 'triệu đồng',
      hints: ['$T = P(1 + r)^n$ với $r = 0{,}05$, $n = 2$.'],
      solution: '$T = 100 \\cdot 1{,}05^2 = 100 \\cdot 1{,}1025 = 110{,}25$ triệu đồng.',
    },
    {
      type: 'number',
      prompt:
        'Gửi $20$ triệu đồng theo thể thức lãi kép, lãi suất $10\\%$ mỗi năm. Sau $3$ năm số tiền là bao nhiêu triệu đồng?',
      answer: 26.62,
      unit: 'triệu đồng',
      hints: ['Mỗi năm số tiền gấp $1{,}1$ lần.', 'Tính $1{,}1^3$.'],
      solution: '$T = 20 \\cdot 1{,}1^3 = 20 \\cdot 1{,}331 = 26{,}62$ triệu đồng.',
    },
    {
      type: 'choice',
      prompt: 'Đa thức nào bằng số tiền $P(1 + r)^3$ sau $3$ kì gửi theo thể thức lãi kép?',
      options: [
        '$P + 3Pr$',
        '$P + 3Pr + 3Pr^2 + Pr^3$',
        '$P + Pr + Pr^2 + Pr^3$',
        '$P + 3Pr + Pr^3$',
      ],
      answer: 1,
      hints: [
        'Dùng hằng đẳng thức lập phương của một tổng: $(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$.',
      ],
      solution:
        '$(1 + r)^3 = 1 + 3r + 3r^2 + r^3$, nhân với $P$ được $P + 3Pr + 3Pr^2 + Pr^3$. Còn $P + 3Pr$ chỉ là số tiền theo lãi đơn.',
    },
    {
      type: 'number',
      prompt:
        'Gửi $200$ triệu đồng, lãi suất $7\\%$/năm, kì hạn $12$ tháng. Sau $2$ năm, số tiền theo lãi kép nhiều hơn theo lãi đơn bao nhiêu triệu đồng?',
      answer: 0.98,
      unit: 'triệu đồng',
      hints: [
        'Khai triển $P(1 + r)^2$ rồi so sánh với $P(1 + 2r)$.',
        'Chênh lệch chính là hạng tử $Pr^2$.',
      ],
      solution:
        '$P(1 + r)^2 - P(1 + 2r) = Pr^2 = 200 \\cdot 0{,}07^2 = 200 \\cdot 0{,}0049 = 0{,}98$ triệu đồng.',
    },
    {
      type: 'number',
      prompt:
        'Bạn Mai gửi $10$ triệu đồng, kì hạn $1$ tháng, lãi suất $0{,}5\\%$ mỗi tháng, lãi nhập vào gốc sau mỗi tháng. Sau $2$ tháng Mai có bao nhiêu triệu đồng? Làm tròn đến hàng phần nghìn.',
      answer: 10.1,
      tolerance: 0.0005,
      unit: 'triệu đồng',
      hints: ['$r = 0{,}005$, $n = 2$.', 'Tính $10 \\cdot 1{,}005^2$.'],
      solution:
        '$T = 10 \\cdot 1{,}005^2 = 10 \\cdot 1{,}010025 = 10{,}10025 \\approx 10{,}100$ triệu đồng.',
    },
    {
      type: 'choice',
      prompt:
        'Bà Hương gửi $250$ triệu đồng trong $2$ năm. Ngân hàng có ba kì hạn: $1$ tháng với $4{,}5\\%$/năm, $6$ tháng với $5{,}5\\%$/năm, $12$ tháng với $6\\%$/năm; tiền lãi luôn được nhập vào gốc. Kì hạn nào cho nhiều tiền nhất sau $2$ năm?',
      options: ['Kì hạn $1$ tháng', 'Kì hạn $6$ tháng', 'Kì hạn $12$ tháng', 'Ba kì hạn như nhau'],
      answer: 2,
      hints: ['Tính $250\\left(1 + \\dfrac{r}{k}\\right)^{2k}$ với $k = 12$, $k = 2$ và $k = 1$.'],
      solution:
        '$1$ tháng: $250 \\cdot 1{,}00375^{24} \\approx 273{,}50$; $6$ tháng: $250 \\cdot 1{,}0275^4 \\approx 278{,}66$; $12$ tháng: $250 \\cdot 1{,}06^2 = 280{,}9$ (triệu đồng). Kì hạn $12$ tháng có lợi nhất.',
    },
    {
      type: 'match',
      prompt: 'Gửi $P$ đồng, lãi suất $r$ mỗi kì. Nối mỗi đại lượng với biểu thức của nó.',
      left: [
        'Tiền lãi của kì đầu tiên',
        'Số tiền sau $n$ kì theo lãi đơn',
        'Số tiền sau $n$ kì theo lãi kép',
        'Phần lãi kép hơn lãi đơn sau $2$ kì',
      ],
      right: ['$P(1 + nr)$', '$Pr^2$', '$Pr$', '$P(1 + r)^n$', '$Pnr^2$'],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 3],
        [3, 1],
      ],
      hints: ['Khai triển $P(1 + r)^2$ và so sánh với $P(1 + 2r)$.'],
      solution:
        'Lãi kì đầu: $Pr$. Lãi đơn: $P(1 + nr)$. Lãi kép: $P(1 + r)^n$. Sau $2$ kì: $P(1 + r)^2 - P(1 + 2r) = Pr^2$.',
    },
  ],
  takeaways: [
    'Lãi đơn: chỉ tiền gốc sinh lãi, $T = P(1 + nr)$.',
    'Lãi kép: tiền lãi nhập vào gốc sau mỗi kì, $T = P(1 + r)^n$, với $r$ là lãi suất của một kì.',
    'Khai triển $P(1 + r)^n$: hai hạng tử đầu $P + nPr$ là lãi đơn, phần còn lại là lãi của lãi.',
    'Kì hạn 1 tháng: lãi suất mỗi kì bằng lãi suất năm chia $12$; so sánh các phương án bằng cách tính $T$ cho cùng thời gian gửi.',
  ],
};
