/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm Toán 9: hệ phương trình, phương trình và bất phương trình bậc nhất, căn thức, hàm số y = ax² và phương trình bậc hai, hệ thức lượng, đường tròn, hình trụ, hình nón, hình cầu, tần số và xác suất, kèm đề ôn thích ứng có lời giải từng bước.',
  intro:
    'Năm lớp 9, em đã học hệ hai phương trình bậc nhất hai ẩn, bất phương trình bậc nhất một ẩn, căn bậc hai và căn bậc ba, hàm số $y = ax^2$ và phương trình bậc hai với định lí Viète; về hình học là tỉ số lượng giác của góc nhọn, đường tròn, góc nội tiếp, tứ giác nội tiếp, đa giác đều và các hình trụ, nón, cầu; cuối cùng là bảng tần số, tần số tương đối và xác suất của biến cố. Bài ôn tập này hệ thống lại ba mạch kiến thức đó theo cách sách Kết nối tri thức chia bài tập ôn cuối năm: Số và đại số, Hình học và đo lường, Thống kê và xác suất. Đề ôn thích ứng ở dưới giúp em luyện như khi ôn thi vào lớp 10: phần nào còn sai, đề hỏi thêm phần đó.',
  objectives: [
    'Giải hệ hai phương trình bậc nhất hai ẩn, phương trình quy về phương trình bậc nhất và bất phương trình bậc nhất một ẩn; giải bài toán bằng cách lập hệ phương trình hoặc phương trình.',
    'Biến đổi và rút gọn biểu thức chứa căn thức bậc hai, tính căn bậc ba.',
    'Xác định hàm số $y = ax^2$, giải phương trình bậc hai bằng công thức nghiệm và vận dụng định lí Viète.',
    'Dùng tỉ số lượng giác và hệ thức giữa cạnh và góc để giải tam giác vuông và các bài toán đo đạc.',
    'Vận dụng tính chất tiếp tuyến, dây cung, góc nội tiếp, tứ giác nội tiếp, đa giác đều; tính độ dài cung, diện tích hình quạt, hình vành khuyên và diện tích, thể tích hình trụ, hình nón, hình cầu.',
    'Lập bảng tần số, tần số tương đối (cả ghép nhóm) và tính xác suất của biến cố bằng cách mô tả không gian mẫu.',
  ],
  sections: [
    {
      heading: 'Số và đại số',
      blocks: [
        {
          type: 'table',
          caption: 'Những điều cần nhớ',
          head: ['Chủ đề', 'Kiến thức chính'],
          rows: [
            [
              'Hệ hai phương trình bậc nhất hai ẩn',
              'Giải bằng phương pháp thế hoặc phương pháp cộng đại số. Mỗi phương trình $ax + by = c$ có đồ thị là một đường thẳng; nghiệm của hệ là tọa độ giao điểm của hai đường thẳng.',
            ],
            [
              'Phương trình, bất phương trình bậc nhất một ẩn',
              'Phương trình tích $A \\cdot B = 0 \\Leftrightarrow A = 0$ hoặc $B = 0$. Phương trình chứa ẩn ở mẫu: tìm điều kiện xác định, quy đồng và khử mẫu, giải rồi đối chiếu điều kiện. Bất phương trình $ax + b > 0$ ($a \\ne 0$): nhân hoặc chia hai vế cho số âm thì đổi chiều.',
            ],
            [
              'Căn bậc hai, căn bậc ba',
              '$\\sqrt{A^2} = |A|$; $\\sqrt{AB} = \\sqrt{A} \\cdot \\sqrt{B}$ ($A, B \\ge 0$); $\\sqrt{\\dfrac{A}{B}} = \\dfrac{\\sqrt{A}}{\\sqrt{B}}$ ($A \\ge 0$, $B > 0$); $\\sqrt{A^2B} = |A|\\sqrt{B}$ ($B \\ge 0$). $\\sqrt[3]{a} = x \\Leftrightarrow x^3 = a$, mọi số thực đều có đúng một căn bậc ba.',
            ],
            [
              'Hàm số $y = ax^2$ ($a \\ne 0$)',
              'Đồ thị là một parabol đỉnh $O$, nhận $Oy$ làm trục đối xứng; nằm phía trên trục hoành khi $a > 0$, phía dưới khi $a < 0$.',
            ],
            [
              'Phương trình bậc hai $ax^2 + bx + c = 0$',
              "$\\Delta = b^2 - 4ac$. $\\Delta > 0$: hai nghiệm phân biệt $x_{1,2} = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$; $\\Delta = 0$: nghiệm kép $x = -\\dfrac{b}{2a}$; $\\Delta < 0$: vô nghiệm. Khi $b = 2b'$ dùng $\\Delta' = b'^2 - ac$.",
            ],
            [
              'Định lí Viète',
              'Nếu $x_1, x_2$ là hai nghiệm thì $x_1 + x_2 = -\\dfrac{b}{a}$, $x_1x_2 = \\dfrac{c}{a}$. Hai số có tổng $S$, tích $P$ (với $S^2 \\ge 4P$) là nghiệm của $x^2 - Sx + P = 0$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: '$\\sqrt{(1 - \\sqrt{3})^2}$ bằng $\\sqrt{3} - 1$, không phải $1 - \\sqrt{3}$, vì căn bậc hai số học không âm. Khi giải bài toán bằng cách lập phương trình bậc hai, phải loại nghiệm không thỏa mãn điều kiện của ẩn (ví dụ vận tốc âm, độ dài âm).',
        },
      ],
    },
    {
      heading: 'Hình học và đo lường',
      blocks: [
        {
          type: 'table',
          caption: 'Những điều cần nhớ',
          head: ['Chủ đề', 'Kiến thức chính'],
          rows: [
            [
              'Tỉ số lượng giác',
              'Với góc nhọn $\\alpha$ của tam giác vuông: $\\sin\\alpha = \\dfrac{\\text{đối}}{\\text{huyền}}$, $\\cos\\alpha = \\dfrac{\\text{kề}}{\\text{huyền}}$, $\\tan\\alpha = \\dfrac{\\text{đối}}{\\text{kề}}$, $\\cot\\alpha = \\dfrac{\\text{kề}}{\\text{đối}}$. Hai góc phụ nhau: sin góc này bằng cos góc kia, tan góc này bằng cot góc kia.',
            ],
            [
              'Hệ thức giữa cạnh và góc',
              'Tam giác $ABC$ vuông tại $A$: $AC = BC \\cdot \\sin B = BC \\cdot \\cos C = AB \\cdot \\tan B = AB \\cdot \\cot C$.',
            ],
            [
              'Đường tròn',
              'Đường kính vuông góc với một dây thì đi qua trung điểm của dây ấy. Tiếp tuyến vuông góc với bán kính tại tiếp điểm; hai tiếp tuyến cắt nhau tại $M$ thì $MA = MB$. Độ dài cung $n^\\circ$: $l = \\dfrac{\\pi R n}{180}$; hình quạt: $S = \\dfrac{\\pi R^2 n}{360}$; hình vành khuyên: $S = \\pi(R^2 - r^2)$.',
            ],
            [
              'Góc nội tiếp, tứ giác nội tiếp',
              'Góc nội tiếp bằng nửa số đo cung bị chắn; góc nội tiếp chắn nửa đường tròn là góc vuông. Tứ giác nội tiếp có tổng hai góc đối bằng $180^\\circ$. Tâm đường tròn ngoại tiếp tam giác vuông là trung điểm cạnh huyền.',
            ],
            [
              'Đa giác đều',
              'Mỗi góc của đa giác đều $n$ cạnh bằng $\\dfrac{(n - 2) \\cdot 180^\\circ}{n}$. Phép quay tâm $O$ góc $\\dfrac{360^\\circ}{n}$ (và các bội của nó) giữ nguyên đa giác đều $n$ cạnh tâm $O$.',
            ],
            [
              'Hình trụ, hình nón, hình cầu',
              'Trụ: $S_{xq} = 2\\pi rh$, $V = \\pi r^2 h$. Nón: $S_{xq} = \\pi rl$ ($l$ là đường sinh, $l^2 = r^2 + h^2$), $V = \\dfrac{1}{3}\\pi r^2 h$. Cầu: $S = 4\\pi R^2$, $V = \\dfrac{4}{3}\\pi R^3$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Giữ π và căn đến bước cuối',
          text: 'Khi tính độ dài cung, diện tích hay thể tích, nên viết kết quả dạng $k\\pi$ (ví dụ $V = 12\\pi$ cm³) rồi mới lấy $\\pi \\approx 3{,}14$ hoặc dùng máy tính để làm tròn, để không cộng dồn sai số. Đề ôn ở dưới hỏi đúng hệ số $k$ đó.',
        },
      ],
    },
    {
      heading: 'Thống kê và xác suất',
      blocks: [
        {
          type: 'list',
          items: [
            'Tần số của một giá trị là số lần giá trị đó xuất hiện trong mẫu dữ liệu; tổng các tần số bằng cỡ mẫu $n$.',
            'Tần số tương đối của giá trị (hoặc nhóm) có tần số $m$ là $f = \\dfrac{m}{n} \\cdot 100\\%$; tổng các tần số tương đối bằng $100\\%$.',
            'Với dữ liệu ghép nhóm $[a; b)$, tần số của một nhóm là số giá trị thuộc nhóm đó; biểu đồ tần số tương đối hình quạt tròn có góc ở tâm của mỗi hình quạt bằng $f \\cdot 360^\\circ$.',
            'Phép thử ngẫu nhiên có không gian mẫu $\\Omega$ gồm các kết quả đồng khả năng thì $P(E) = \\dfrac{\\text{số kết quả thuận lợi cho } E}{\\text{số phần tử của } \\Omega}$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mô tả không gian mẫu trước khi đếm',
          text: 'Gieo hai con xúc xắc có $36$ kết quả $(a; b)$ vì kết quả $(1; 2)$ khác $(2; 1)$. Rút lần lượt hai thẻ không hoàn lại từ bốn thẻ có $4 \\cdot 3 = 12$ kết quả. Lập bảng hoặc sơ đồ cây giúp không bỏ sót kết quả.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đề ôn thi vào lớp 10 thích ứng',
    instruction:
      'Đề có $20$ câu. Mười câu đầu lấy mỗi chương một câu; từ câu thứ mười một, đề ưu tiên phần em đã làm sai (dòng chữ phía trên câu hỏi ghi rõ vì sao chọn câu đó). Nhập số nguyên, số thập phân (dùng dấu phẩy, ví dụ $12{,}5$) hoặc phân số dạng $7/3$. Câu hỏi về độ dài cung, diện tích hay thể tích chỉ hỏi hệ số $k$ trong $k\\pi$. Sai lần đầu, em được gợi ý và làm lại; sai lần hai, em xem lời giải từng bước. Bản đồ kĩ năng chấm theo lần làm đầu.',
  },
  examples: [
    {
      problem:
        'Cho biểu thức $P = \\dfrac{\\sqrt{x} + 1}{\\sqrt{x} - 1} - \\dfrac{\\sqrt{x} - 1}{\\sqrt{x} + 1}$ với $x \\ge 0$, $x \\ne 1$. Rút gọn $P$ rồi tính giá trị của $P$ tại $x = 9$.',
      steps: [
        'Mẫu thức chung là $(\\sqrt{x} - 1)(\\sqrt{x} + 1) = x - 1$.',
        '$P = \\dfrac{(\\sqrt{x} + 1)^2 - (\\sqrt{x} - 1)^2}{x - 1} = \\dfrac{(x + 2\\sqrt{x} + 1) - (x - 2\\sqrt{x} + 1)}{x - 1} = \\dfrac{4\\sqrt{x}}{x - 1}$.',
        '$x = 9$ thỏa mãn điều kiện, $\\sqrt{9} = 3$, nên $P = \\dfrac{4 \\cdot 3}{9 - 1} = \\dfrac{12}{8} = \\dfrac{3}{2}$.',
      ],
      answer: '$P = \\dfrac{4\\sqrt{x}}{x - 1}$; tại $x = 9$ thì $P = \\dfrac{3}{2}$.',
    },
    {
      problem: 'Giải hệ phương trình $\\begin{cases} 2x + 3y = 13 \\\\ 3x - y = 3 \\end{cases}$.',
      steps: [
        'Từ phương trình thứ hai: $y = 3x - 3$.',
        'Thế vào phương trình thứ nhất: $2x + 3(3x - 3) = 13$, tức là $11x - 9 = 13$, nên $x = 2$.',
        'Khi đó $y = 3 \\cdot 2 - 3 = 3$. Thử lại: $2 \\cdot 2 + 3 \\cdot 3 = 13$ và $3 \\cdot 2 - 3 = 3$.',
      ],
      answer: 'Hệ có nghiệm duy nhất $(x; y) = (2; 3)$.',
    },
    {
      problem:
        'Hai bến sông $A$ và $B$ cách nhau $36$ km. Một ca nô xuôi dòng từ $A$ đến $B$ rồi ngược dòng trở về $A$. Tổng thời gian đi và về bằng thời gian ca nô đi $75$ km khi nước yên lặng. Tính vận tốc của ca nô khi nước yên lặng, biết vận tốc dòng nước là $3$ km/h.',
      steps: [
        'Gọi vận tốc ca nô khi nước yên lặng là $x$ (km/h), $x > 3$. Vận tốc xuôi dòng $x + 3$, ngược dòng $x - 3$.',
        'Ta có phương trình $\\dfrac{36}{x + 3} + \\dfrac{36}{x - 3} = \\dfrac{75}{x}$.',
        'Khử mẫu: $36x(x - 3) + 36x(x + 3) = 75(x^2 - 9)$, tức là $72x^2 = 75x^2 - 675$, nên $x^2 = 225$.',
        '$x = 15$ hoặc $x = -15$; chỉ $x = 15$ thỏa mãn điều kiện $x > 3$.',
      ],
      answer: 'Vận tốc của ca nô khi nước yên lặng là $15$ km/h.',
    },
    {
      problem:
        'Gọi $x_1, x_2$ là hai nghiệm của phương trình $x^2 - 5x + 3 = 0$. Không giải phương trình, tính $x_1^2 + x_2^2$.',
      steps: [
        '$\\Delta = (-5)^2 - 4 \\cdot 1 \\cdot 3 = 13 > 0$ nên phương trình có hai nghiệm phân biệt.',
        'Theo định lí Viète: $x_1 + x_2 = 5$, $x_1x_2 = 3$.',
        '$x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2 = 25 - 6 = 19$.',
      ],
      answer: '$x_1^2 + x_2^2 = 19$.',
    },
    {
      problem:
        'Để đo khoảng cách giữa hai điểm $A$, $B$ trên một bức tường không đến gần được, một người đứng ở $K$ cách chân tường $H$ một khoảng $HK = 3$ m ($HK \\perp AB$, $H$ nằm trên đường thẳng $AB$, $B$ nằm giữa $H$ và $A$). Người đó đo được $\\widehat{HKA} = 60^\\circ$ và $\\widehat{HKB} = 30^\\circ$. Tính $AB$ (làm tròn đến hàng phần nghìn của mét).',
      steps: [
        'Tam giác $HKA$ vuông tại $H$: $HA = HK \\cdot \\tan 60^\\circ = 3\\sqrt{3}$ (m).',
        'Tam giác $HKB$ vuông tại $H$: $HB = HK \\cdot \\tan 30^\\circ = 3 \\cdot \\dfrac{\\sqrt{3}}{3} = \\sqrt{3}$ (m).',
        '$AB = HA - HB = 3\\sqrt{3} - \\sqrt{3} = 2\\sqrt{3} \\approx 3{,}464$ (m).',
      ],
      answer: '$AB = 2\\sqrt{3} \\approx 3{,}464$ m.',
    },
    {
      problem:
        'Một hộp có bốn tấm thẻ ghi các số $1, 2, 3, 4$. Rút ngẫu nhiên lần lượt hai thẻ (không hoàn lại). Tính xác suất của biến cố $E$: "Tổng hai số trên hai thẻ là số lẻ".',
      steps: [
        'Không gian mẫu gồm các cặp $(a; b)$ với $a \\ne b$: lần đầu có $4$ cách, lần sau $3$ cách, nên có $12$ kết quả đồng khả năng.',
        'Tổng lẻ khi một số lẻ và một số chẵn: $(1; 2), (1; 4), (3; 2), (3; 4), (2; 1), (2; 3), (4; 1), (4; 3)$, có $8$ kết quả thuận lợi.',
        '$P(E) = \\dfrac{8}{12} = \\dfrac{2}{3}$.',
      ],
      answer: '$P(E) = \\dfrac{2}{3}$.',
    },
    {
      problem:
        'Một bồn nước hình trụ có bán kính đáy $0{,}6$ m và chiều cao $1{,}5$ m. Bồn chứa được tối đa bao nhiêu lít nước (làm tròn đến hàng đơn vị)?',
      steps: [
        '$V = \\pi r^2 h = \\pi \\cdot 0{,}6^2 \\cdot 1{,}5 = 0{,}54\\pi$ (m³).',
        'Đổi ra lít: $1$ m³ $= 1\\,000$ lít, nên $V = 540\\pi$ lít.',
        '$540\\pi \\approx 1\\,696{,}46$, làm tròn đến hàng đơn vị được $1\\,696$ lít.',
      ],
      answer: 'Khoảng $1\\,696$ lít.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Hệ phương trình $\\begin{cases} x + y = 7 \\\\ 2x - y = 5 \\end{cases}$ có nghiệm $(x; y)$. Tìm $y$.',
      answer: 3,
      hints: [
        'Cộng vế theo vế hai phương trình để khử $y$.',
        'Tìm $x$ trước, rồi thay vào $x + y = 7$.',
      ],
      solution:
        'Cộng vế theo vế: $3x = 12$, nên $x = 4$. Thay vào phương trình thứ nhất: $y = 7 - 4 = 3$. Hệ có nghiệm $(4; 3)$.',
    },
    {
      type: 'fraction',
      prompt:
        'Nghiệm của bất phương trình $3 - 2x > 4x + 2$ là $x < a$. Tìm $a$ (phân số tối giản).',
      answer: [1, 6],
      simplest: true,
      hints: [
        'Chuyển các hạng tử chứa $x$ sang một vế, các số sang vế kia.',
        'Chia hai vế cho một số âm thì phải đổi chiều bất phương trình.',
      ],
      solution:
        '$3 - 2x > 4x + 2 \\Leftrightarrow -6x > -1 \\Leftrightarrow x < \\dfrac{1}{6}$ (chia hai vế cho $-6$ và đổi chiều). Vậy $a = \\dfrac{1}{6}$.',
    },
    {
      type: 'choice',
      prompt: 'Giá trị của $\\sqrt{(1 - \\sqrt{3})^2}$ là',
      options: ['$1 - \\sqrt{3}$', '$\\sqrt{3} - 1$', '$1 + \\sqrt{3}$', '$-1 - \\sqrt{3}$'],
      answer: 1,
      hints: [
        '$\\sqrt{A^2} = |A|$.',
        'So sánh $1$ và $\\sqrt{3}$ để biết $1 - \\sqrt{3}$ âm hay dương.',
      ],
      solution:
        '$\\sqrt{(1 - \\sqrt{3})^2} = |1 - \\sqrt{3}|$. Vì $\\sqrt{3} > 1$ nên $1 - \\sqrt{3} < 0$, do đó $|1 - \\sqrt{3}| = \\sqrt{3} - 1$.',
    },
    {
      type: 'number',
      prompt: 'Rút gọn $2\\sqrt{12} - \\sqrt{27} + \\sqrt{75}$ về dạng $m\\sqrt{3}$. Tìm $m$.',
      answer: 6,
      hints: [
        'Đưa thừa số ra ngoài dấu căn: $12 = 4 \\cdot 3$, $27 = 9 \\cdot 3$, $75 = 25 \\cdot 3$.',
      ],
      solution:
        '$2\\sqrt{12} = 2 \\cdot 2\\sqrt{3} = 4\\sqrt{3}$; $\\sqrt{27} = 3\\sqrt{3}$; $\\sqrt{75} = 5\\sqrt{3}$. Biểu thức bằng $4\\sqrt{3} - 3\\sqrt{3} + 5\\sqrt{3} = 6\\sqrt{3}$, nên $m = 6$.',
    },
    {
      type: 'fraction',
      prompt: 'Đồ thị hàm số $y = ax^2$ ($a \\ne 0$) đi qua điểm $A(-2; 3)$. Tìm $a$.',
      answer: [3, 4],
      hints: ['Thay $x = -2$, $y = 3$ vào công thức của hàm số.'],
      solution: '$3 = a \\cdot (-2)^2 = 4a$, nên $a = \\dfrac{3}{4}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các nghiệm của phương trình $x^2 - 2x - 15 = 0$.',
      options: ['$-5$', '$-3$', '$3$', '$5$'],
      answers: [1, 3],
      hints: [
        "Hệ số $b = -2$ chẵn, có thể dùng $\\Delta' = b'^2 - ac$ với $b' = -1$.",
        "$x = \\dfrac{-b' \\pm \\sqrt{\\Delta'}}{a}$.",
      ],
      solution:
        "$\\Delta' = (-1)^2 - 1 \\cdot (-15) = 16$, $\\sqrt{\\Delta'} = 4$. Hai nghiệm: $x_1 = 1 + 4 = 5$, $x_2 = 1 - 4 = -3$. Thử lại bằng định lí Viète: $5 + (-3) = 2$ và $5 \\cdot (-3) = -15$.",
    },
    {
      type: 'number',
      prompt:
        'Gọi $x_1, x_2$ là hai nghiệm của phương trình $x^2 - 7x + 2 = 0$. Không giải phương trình, tính $x_1^2 + x_2^2$.',
      answer: 45,
      hints: [
        'Kiểm tra $\\Delta > 0$, rồi dùng định lí Viète.',
        '$x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1x_2$.',
      ],
      solution:
        '$\\Delta = 49 - 8 = 41 > 0$. Theo định lí Viète, $x_1 + x_2 = 7$ và $x_1x_2 = 2$. Do đó $x_1^2 + x_2^2 = 7^2 - 2 \\cdot 2 = 45$.',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh vườn hình chữ nhật có chiều dài hơn chiều rộng $5$ m và diện tích $84$ m². Tính chiều rộng của mảnh vườn.',
      answer: 7,
      unit: 'm',
      hints: [
        'Gọi chiều rộng là $x$ (m), $x > 0$; chiều dài là $x + 5$.',
        'Lập phương trình $x(x + 5) = 84$ rồi giải phương trình bậc hai.',
      ],
      solution:
        '$x(x + 5) = 84 \\Leftrightarrow x^2 + 5x - 84 = 0$. $\\Delta = 25 + 336 = 361$, $\\sqrt{\\Delta} = 19$. $x_1 = \\dfrac{-5 + 19}{2} = 7$, $x_2 = \\dfrac{-5 - 19}{2} = -12$ (loại vì $x > 0$). Chiều rộng là $7$ m (chiều dài $12$ m, $7 \\cdot 12 = 84$).',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $BC = 10$ cm và $\\widehat{B} = 30^\\circ$. Tính $AC$.',
      answer: 5,
      unit: 'cm',
      hints: ['$AC$ là cạnh đối diện với góc $B$.', '$AC = BC \\cdot \\sin B$.'],
      solution: '$AC = BC \\cdot \\sin 30^\\circ = 10 \\cdot \\dfrac{1}{2} = 5$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Một chiếc thang dài $4$ m dựa vào tường, tạo với mặt đất một góc $65^\\circ$. Đỉnh thang cách mặt đất bao nhiêu mét (làm tròn đến hàng phần trăm)?',
      answer: 3.63,
      tolerance: 0.01,
      unit: 'm',
      hints: [
        'Thang là cạnh huyền; chiều cao là cạnh đối diện với góc $65^\\circ$.',
        'Dùng $h = 4 \\cdot \\sin 65^\\circ$ và máy tính cầm tay.',
      ],
      solution: '$h = 4 \\cdot \\sin 65^\\circ \\approx 4 \\cdot 0{,}9063 \\approx 3{,}63$ (m).',
    },
    {
      type: 'number',
      prompt:
        'Tứ giác $ABCD$ nội tiếp một đường tròn và có $\\widehat{A} = 75^\\circ$. Tính số đo góc $C$ (độ).',
      answer: 105,
      unit: '°',
      hints: ['$\\widehat{A}$ và $\\widehat{C}$ là hai góc đối nhau của tứ giác.'],
      solution:
        'Tứ giác nội tiếp có tổng hai góc đối bằng $180^\\circ$, nên $\\widehat{C} = 180^\\circ - 75^\\circ = 105^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tính độ dài cung $60^\\circ$ của đường tròn bán kính $6$ cm (làm tròn đến hàng phần trăm).',
      answer: 6.28,
      tolerance: 0.01,
      unit: 'cm',
      hints: ['$l = \\dfrac{\\pi R n}{180}$.', 'Viết kết quả dạng $k\\pi$ trước rồi mới làm tròn.'],
      solution: '$l = \\dfrac{\\pi \\cdot 6 \\cdot 60}{180} = 2\\pi \\approx 6{,}28$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Một hình nón có bán kính đáy $3$ cm và chiều cao $4$ cm. Tính thể tích của hình nón (làm tròn đến hàng phần trăm).',
      answer: 37.7,
      tolerance: 0.01,
      unit: 'cm³',
      hints: ['$V = \\dfrac{1}{3}\\pi r^2 h$.'],
      solution:
        '$V = \\dfrac{1}{3} \\cdot \\pi \\cdot 3^2 \\cdot 4 = 12\\pi \\approx 37{,}70$ (cm³).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đại lượng với công thức tính đúng của nó.',
      left: ['Thể tích hình trụ', 'Thể tích hình nón', 'Diện tích mặt cầu', 'Thể tích hình cầu'],
      right: [
        '$\\pi r^2 h$',
        '$\\dfrac{1}{3}\\pi r^2 h$',
        '$4\\pi R^2$',
        '$\\dfrac{4}{3}\\pi R^3$',
        '$2\\pi rh$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Thể tích hình nón bằng một phần ba thể tích hình trụ có cùng đáy và chiều cao.',
        '$2\\pi rh$ là diện tích xung quanh của hình trụ, không phải thể tích.',
      ],
      solution:
        'Trụ: $V = \\pi r^2 h$; nón: $V = \\dfrac{1}{3}\\pi r^2 h$; mặt cầu: $S = 4\\pi R^2$; hình cầu: $V = \\dfrac{4}{3}\\pi R^3$. Còn $2\\pi rh$ là $S_{xq}$ của hình trụ.',
    },
    {
      type: 'number',
      prompt:
        'Hỏi $40$ học sinh về môn học yêu thích, có $14$ bạn chọn Toán. Tần số tương đối của lựa chọn Toán là bao nhiêu phần trăm?',
      answer: 35,
      unit: '%',
      hints: ['$f = \\dfrac{m}{n} \\cdot 100\\%$ với $m$ là tần số, $n$ là cỡ mẫu.'],
      solution: '$f = \\dfrac{14}{40} \\cdot 100\\% = 35\\%$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo đồng thời hai con xúc xắc cân đối. Tính xác suất để tổng số chấm trên hai mặt xuất hiện bằng $9$ (phân số tối giản).',
      answer: [1, 9],
      simplest: true,
      hints: [
        'Không gian mẫu có $6 \\cdot 6 = 36$ kết quả đồng khả năng.',
        'Liệt kê các cặp $(a; b)$ có $a + b = 9$.',
      ],
      solution:
        'Các kết quả thuận lợi: $(3; 6), (4; 5), (5; 4), (6; 3)$, gồm $4$ kết quả. Xác suất là $\\dfrac{4}{36} = \\dfrac{1}{9}$.',
    },
  ],
  takeaways: [
    'Hệ hai phương trình bậc nhất hai ẩn giải bằng phương pháp thế hoặc cộng đại số; nghiệm là giao điểm của hai đường thẳng.',
    'Bất phương trình: nhân hoặc chia hai vế cho số âm thì đổi chiều. Phương trình chứa ẩn ở mẫu: luôn đặt và đối chiếu điều kiện xác định.',
    '$\\sqrt{A^2} = |A|$; đưa thừa số ra ngoài dấu căn để cộng, trừ các căn đồng dạng.',
    "Phương trình bậc hai: tính $\\Delta$ (hoặc $\\Delta'$) trước; định lí Viète cho $x_1 + x_2 = -\\dfrac{b}{a}$, $x_1x_2 = \\dfrac{c}{a}$.",
    'Trong tam giác vuông: cạnh góc vuông bằng cạnh huyền nhân sin góc đối (hoặc cos góc kề), bằng cạnh góc vuông kia nhân tan góc đối.',
    'Góc nội tiếp bằng nửa cung bị chắn; tứ giác nội tiếp có hai góc đối bù nhau; $l = \\dfrac{\\pi R n}{180}$, $S_{\\text{quạt}} = \\dfrac{\\pi R^2 n}{360}$.',
    'Trụ $V = \\pi r^2 h$, nón $V = \\dfrac{1}{3}\\pi r^2 h$, cầu $S = 4\\pi R^2$ và $V = \\dfrac{4}{3}\\pi R^3$.',
    'Tần số tương đối $f = \\dfrac{m}{n} \\cdot 100\\%$; xác suất bằng số kết quả thuận lợi chia cho số phần tử của không gian mẫu đồng khả năng.',
  ],
};
