/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm Toán 7: số hữu tỉ, số thực, tỉ lệ thức và đại lượng tỉ lệ, đa thức một biến, tam giác, hình hộp và lăng trụ đứng, thống kê và xác suất, kèm đề ôn thích ứng chọn thêm câu ở phần còn yếu.',
  intro:
    'Năm lớp 7, em đã mở rộng tập số đến số hữu tỉ và số thực, làm quen với tỉ lệ thức, đa thức một biến, tam giác bằng nhau, các hình khối trong thực tiễn, biểu đồ và xác suất của biến cố. Bài ôn tập này hệ thống lại cả ba mạch kiến thức, giải mẫu những dạng bài tổng hợp như trong sách và cho em làm một đề ôn tự điều chỉnh: phần nào em làm sai, đề sẽ hỏi thêm phần đó.',
  objectives: [
    'Thực hiện thành thạo các phép tính với số hữu tỉ, căn bậc hai số học, giá trị tuyệt đối và làm tròn số.',
    'Giải bài toán về tỉ lệ thức, dãy tỉ số bằng nhau, đại lượng tỉ lệ thuận và tỉ lệ nghịch.',
    'Cộng, trừ, nhân, chia đa thức một biến; tính giá trị và tìm nghiệm của đa thức.',
    'Vận dụng tổng ba góc, các trường hợp bằng nhau của tam giác, tam giác cân và các đường đồng quy.',
    'Tính diện tích xung quanh, thể tích của hình hộp chữ nhật, hình lập phương và hình lăng trụ đứng.',
    'Đọc biểu đồ hình quạt tròn, biểu đồ đoạn thẳng và tính xác suất của biến cố.',
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
              'Số hữu tỉ',
              'Số viết được dưới dạng $\\dfrac{a}{b}$ với $a, b \\in \\mathbb{Z}$, $b \\ne 0$. Lũy thừa: $x^m \\cdot x^n = x^{m+n}$; $x^m : x^n = x^{m-n}$ ($x \\ne 0$, $m \\ge n$); $(x^m)^n = x^{m \\cdot n}$. Quy tắc chuyển vế: chuyển một số hạng sang vế kia thì đổi dấu số hạng đó.',
            ],
            [
              'Số thực',
              'Số vô tỉ là số viết được dưới dạng số thập phân vô hạn không tuần hoàn, ví dụ $\\sqrt{2} = 1{,}414\\,213\\ldots$ Số hữu tỉ và số vô tỉ gọi chung là số thực. $\\sqrt{a}$ ($a \\ge 0$) là số không âm có bình phương bằng $a$. $|x| = x$ nếu $x \\ge 0$, $|x| = -x$ nếu $x < 0$. Làm tròn với độ chính xác $0{,}05$ là làm tròn đến hàng phần mười.',
            ],
            [
              'Tỉ lệ thức',
              '$\\dfrac{a}{b} = \\dfrac{c}{d}$ thì $ad = bc$. Dãy tỉ số bằng nhau: $\\dfrac{a}{b} = \\dfrac{c}{d} = \\dfrac{a + c}{b + d} = \\dfrac{a - c}{b - d}$ (các mẫu khác $0$).',
            ],
            [
              'Đại lượng tỉ lệ',
              'Tỉ lệ thuận: $y = kx$, tỉ số $\\dfrac{y}{x}$ không đổi. Tỉ lệ nghịch: $y = \\dfrac{a}{x}$, tích $xy = a$ không đổi.',
            ],
            [
              'Đa thức một biến',
              'Bậc là số mũ cao nhất của biến (sau khi thu gọn). Cộng, trừ: cộng, trừ các hạng tử cùng bậc. Nhân: nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia. $a$ là nghiệm của $P(x)$ khi $P(a) = 0$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chia đa thức',
          text: 'Đặt phép chia như chia số tự nhiên: chia hạng tử bậc cao nhất của đa thức bị chia cho hạng tử bậc cao nhất của đa thức chia, nhân ngược lại rồi trừ, lặp lại đến khi dư có bậc nhỏ hơn bậc của đa thức chia. Ví dụ $(6x^3 - 7x^2 + 1) : (2x - 1) = 3x^2 - 2x - 1$.',
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
              'Góc và đường thẳng song song',
              'Hai góc đối đỉnh thì bằng nhau. Hai đường thẳng song song cắt một đường thẳng thứ ba thì hai góc so le trong bằng nhau, hai góc đồng vị bằng nhau.',
            ],
            [
              'Tam giác',
              'Tổng ba góc bằng $180^\\circ$; góc ngoài bằng tổng hai góc trong không kề với nó. Ba trường hợp bằng nhau: c.c.c, c.g.c, g.c.g (với tam giác vuông thêm cạnh huyền - góc nhọn, cạnh huyền - cạnh góc vuông).',
            ],
            [
              'Quan hệ trong tam giác',
              'Góc đối diện cạnh lớn hơn thì lớn hơn. Bất đẳng thức tam giác: mỗi cạnh nhỏ hơn tổng và lớn hơn hiệu hai cạnh còn lại. Trọng tâm $G$: $AG = \\dfrac{2}{3}AM$ với $AM$ là đường trung tuyến.',
            ],
            [
              'Tam giác cân, đường trung trực',
              'Tam giác cân có hai góc ở đáy bằng nhau. Điểm nằm trên đường trung trực của đoạn thẳng thì cách đều hai mút của đoạn thẳng đó.',
            ],
            [
              'Hình khối',
              'Hình hộp chữ nhật: $V = abc$; hình lập phương: $V = a^3$, $S_{xq} = 4a^2$. Lăng trụ đứng: $S_{xq} = C_{\\text{đáy}} \\cdot h$, $V = S_{\\text{đáy}} \\cdot h$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Viết hai tam giác bằng nhau phải theo đúng thứ tự các đỉnh tương ứng. Diện tích xung quanh chỉ gồm các mặt bên, không gồm hai đáy; diện tích toàn phần mới cộng thêm hai đáy. Đổi đơn vị: $1\\ \\text{dm}^3 = 1$ lít $= 1\\,000\\ \\text{cm}^3$.',
        },
      ],
    },
    {
      heading: 'Một số yếu tố thống kê và xác suất',
      blocks: [
        {
          type: 'list',
          items: [
            'Biểu đồ hình quạt tròn biểu diễn tỉ lệ phần trăm của từng phần so với toàn thể; tổng các phần là $100\\%$.',
            'Biểu đồ đoạn thẳng biểu diễn sự thay đổi của một đại lượng theo thời gian: đoạn đi lên là tăng, đi xuống là giảm.',
            'Trước khi phân tích, kiểm tra dữ liệu có hợp lí và có đại diện cho toàn thể không.',
            'Biến cố chắc chắn có xác suất $1$, biến cố không thể có xác suất $0$, biến cố ngẫu nhiên có xác suất nằm giữa $0$ và $1$.',
            'Khi các kết quả có thể là đồng khả năng: xác suất bằng số kết quả thuận lợi chia cho số kết quả có thể.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ví dụ nhanh',
          text: 'Gieo một con xúc xắc cân đối có $6$ kết quả đồng khả năng. Biến cố "Số chấm xuất hiện là số chẵn" có $3$ kết quả thuận lợi ($2, 4, 6$), nên xác suất của nó là $\\dfrac{3}{6} = \\dfrac{1}{2}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đề ôn tập thích ứng',
    instruction:
      'Đề có $16$ câu. Tám câu đầu lấy mỗi mạch một câu; từ câu thứ chín, đề ưu tiên chọn câu ở phần em đã làm sai (ô ghi rõ vì sao chọn câu đó). Nhập số nguyên, số thập phân (dùng dấu phẩy, ví dụ $5{,}29$) hoặc phân số dạng $7/20$. Sai lần đầu, em được gợi ý và làm lại; sai lần hai, em xem lời giải từng bước. Bản đồ kĩ năng chấm theo lần làm đầu.',
  },
  examples: [
    {
      problem:
        'Ba đội máy cày, cày ba cánh đồng có cùng diện tích. Đội thứ nhất cày xong trong $4$ ngày, đội thứ hai trong $6$ ngày, đội thứ ba trong $8$ ngày. Ba đội có tất cả $26$ máy cày (năng suất các máy như nhau). Hỏi mỗi đội có bao nhiêu máy?',
      steps: [
        'Gọi số máy của ba đội là $x, y, z$. Cùng một diện tích, số máy và số ngày là hai đại lượng tỉ lệ nghịch, nên $4x = 6y = 8z$ và $x + y + z = 26$.',
        '$4x = 6y = 8z$ nên $\\dfrac{x}{6} = \\dfrac{y}{4} = \\dfrac{z}{3}$ (chia cả ba tích cho $24$).',
        'Theo tính chất của dãy tỉ số bằng nhau: $\\dfrac{x}{6} = \\dfrac{y}{4} = \\dfrac{z}{3} = \\dfrac{x + y + z}{6 + 4 + 3} = \\dfrac{26}{13} = 2$.',
        '$x = 6 \\cdot 2 = 12$; $y = 4 \\cdot 2 = 8$; $z = 3 \\cdot 2 = 6$. Thử lại: $4 \\cdot 12 = 6 \\cdot 8 = 8 \\cdot 6 = 48$ và $12 + 8 + 6 = 26$.',
      ],
      answer: 'Ba đội lần lượt có $12$, $8$ và $6$ máy cày.',
    },
    {
      problem:
        'Cho hai đa thức $P(x) = 2x^3 - 3x^2 + x - 5$ và $Q(x) = -2x^3 + 4x^2 - 3x + 1$. Tìm $P(x) + Q(x)$, $P(x) - Q(x)$ và tính giá trị của $P(x) + Q(x)$ tại $x = -1$.',
      steps: [
        '$P(x) + Q(x) = (2x^3 - 2x^3) + (-3x^2 + 4x^2) + (x - 3x) + (-5 + 1) = x^2 - 2x - 4$.',
        '$P(x) - Q(x) = (2x^3 + 2x^3) + (-3x^2 - 4x^2) + (x + 3x) + (-5 - 1) = 4x^3 - 7x^2 + 4x - 6$.',
        'Tại $x = -1$: $(-1)^2 - 2 \\cdot (-1) - 4 = 1 + 2 - 4 = -1$.',
      ],
      answer:
        '$P(x) + Q(x) = x^2 - 2x - 4$ (bậc $2$), $P(x) - Q(x) = 4x^3 - 7x^2 + 4x - 6$ (bậc $3$); giá trị của $P(x) + Q(x)$ tại $x = -1$ là $-1$.',
    },
    {
      problem:
        'Cho tam giác $ABC$ cân tại $A$ có $\\widehat{A} = 40^\\circ$, $M$ là trung điểm của $BC$. Chứng minh $\\Delta ABM = \\Delta ACM$ và $AM \\perp BC$. Tính $\\widehat{B}$ và $\\widehat{BAM}$.',
      steps: [
        'Xét $\\Delta ABM$ và $\\Delta ACM$: $AB = AC$ (tam giác $ABC$ cân tại $A$), $MB = MC$ ($M$ là trung điểm $BC$), $AM$ là cạnh chung. Vậy $\\Delta ABM = \\Delta ACM$ (c.c.c).',
        'Suy ra $\\widehat{AMB} = \\widehat{AMC}$. Hai góc này kề bù nên mỗi góc bằng $180^\\circ : 2 = 90^\\circ$, tức là $AM \\perp BC$.',
        'Hai góc ở đáy bằng nhau: $\\widehat{B} = \\widehat{C} = (180^\\circ - 40^\\circ) : 2 = 70^\\circ$.',
        'Từ $\\Delta ABM = \\Delta ACM$ có $\\widehat{BAM} = \\widehat{CAM} = 40^\\circ : 2 = 20^\\circ$.',
      ],
      answer:
        '$\\Delta ABM = \\Delta ACM$ (c.c.c), $AM \\perp BC$; $\\widehat{B} = 70^\\circ$, $\\widehat{BAM} = 20^\\circ$.',
    },
    {
      problem:
        'Một bể cá dạng hình hộp chữ nhật dài $80$ cm, rộng $50$ cm, cao $45$ cm. Mực nước trong bể cao $35$ cm. Tính thể tích nước trong bể theo lít và diện tích kính làm bốn mặt bên của bể.',
      steps: [
        'Phần nước là hình hộp chữ nhật kích thước $80$ cm, $50$ cm, $35$ cm: $V = 80 \\cdot 50 \\cdot 35 = 140\\,000\\ (\\text{cm}^3)$.',
        'Đổi: $140\\,000\\ \\text{cm}^3 = 140\\ \\text{dm}^3 = 140$ lít.',
        'Bốn mặt bên là diện tích xung quanh: $S_{xq} = 2 \\cdot (80 + 50) \\cdot 45 = 11\\,700\\ (\\text{cm}^2)$.',
      ],
      answer: 'Bể chứa $140$ lít nước; diện tích kính bốn mặt bên là $11\\,700\\ \\text{cm}^2$.',
    },
    {
      problem:
        'Một hộp có $20$ tấm thẻ cùng loại, ghi các số $1, 2, \\ldots, 20$. Rút ngẫu nhiên một thẻ. Tính xác suất của biến cố "Số ghi trên thẻ là số nguyên tố".',
      steps: [
        'Có $20$ kết quả có thể, đồng khả năng.',
        'Các số nguyên tố từ $1$ đến $20$: $2, 3, 5, 7, 11, 13, 17, 19$, gồm $8$ số.',
        'Xác suất cần tìm là $\\dfrac{8}{20} = \\dfrac{2}{5}$.',
      ],
      answer: 'Xác suất bằng $\\dfrac{2}{5}$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt:
        'Tính $\\left(-\\dfrac{3}{4} + \\dfrac{2}{3}\\right) : \\dfrac{5}{6}$ và viết kết quả dưới dạng phân số tối giản.',
      answer: [-1, 10],
      simplest: true,
      hints: [
        'Tính trong ngoặc trước: quy đồng mẫu $12$.',
        'Chia cho $\\dfrac{5}{6}$ là nhân với $\\dfrac{6}{5}$.',
      ],
      solution:
        '$-\\dfrac{3}{4} + \\dfrac{2}{3} = -\\dfrac{9}{12} + \\dfrac{8}{12} = -\\dfrac{1}{12}$; $-\\dfrac{1}{12} \\cdot \\dfrac{6}{5} = -\\dfrac{6}{60} = -\\dfrac{1}{10}$.',
    },
    {
      type: 'choice',
      prompt: 'Số nào sau đây là số vô tỉ?',
      options: ['$\\sqrt{16}$', '$0{,}(3)$', '$\\sqrt{2}$', '$-\\dfrac{7}{5}$'],
      answer: 2,
      hints: [
        'Số vô tỉ là số thập phân vô hạn không tuần hoàn.',
        '$\\sqrt{16} = 4$; $0{,}(3)$ là số thập phân vô hạn tuần hoàn; $-\\dfrac{7}{5}$ là phân số.',
      ],
      solution:
        '$\\sqrt{16} = 4$, $0{,}(3) = \\dfrac{1}{3}$ và $-\\dfrac{7}{5}$ đều là số hữu tỉ. $\\sqrt{2} = 1{,}414\\,213\\ldots$ là số thập phân vô hạn không tuần hoàn nên là số vô tỉ.',
    },
    {
      type: 'number',
      prompt: 'Tìm số $x$ âm, biết $|x| - 1{,}5 = 2$.',
      answer: -3.5,
      hints: [
        'Chuyển vế để tìm $|x|$ trước.',
        'Có hai số có giá trị tuyệt đối bằng $3{,}5$; chọn số âm.',
      ],
      solution:
        '$|x| = 2 + 1{,}5 = 3{,}5$, nên $x = 3{,}5$ hoặc $x = -3{,}5$. Vì $x < 0$ nên $x = -3{,}5$.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số $12{,}3456$ với độ chính xác $0{,}05$.',
      answer: 12.3,
      hints: [
        'Độ chính xác $0{,}05$ ứng với làm tròn đến hàng phần mười.',
        'Nhìn chữ số hàng phần trăm để quyết định giữ nguyên hay cộng $1$ vào hàng phần mười.',
      ],
      solution:
        'Làm tròn đến hàng phần mười. Chữ số hàng phần trăm là $4 < 5$ nên giữ nguyên hàng phần mười: $12{,}3456 \\approx 12{,}3$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $x$ và $y$ là hai đại lượng tỉ lệ thuận; khi $x = 4$ thì $y = -12$. Tính $y$ khi $x = -5$.',
      answer: 15,
      hints: ['Tìm hệ số tỉ lệ $k = \\dfrac{y}{x}$.', 'Rồi tính $y = k \\cdot x$ với $x = -5$.'],
      solution:
        '$k = \\dfrac{-12}{4} = -3$, nên $y = -3x$. Khi $x = -5$: $y = (-3) \\cdot (-5) = 15$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $y$, biết $\\dfrac{x}{3} = \\dfrac{y}{5}$ và $x + y = 32$.',
      answer: 20,
      hints: ['Dùng tính chất của dãy tỉ số bằng nhau: cộng tử với tử, mẫu với mẫu.'],
      solution:
        '$\\dfrac{x}{3} = \\dfrac{y}{5} = \\dfrac{x + y}{3 + 5} = \\dfrac{32}{8} = 4$, nên $x = 12$, $y = 5 \\cdot 4 = 20$.',
    },
    {
      type: 'number',
      prompt: 'Cho $P(x) = x^3 - 2x^2 + 3x - 4$. Tính $P(2)$.',
      answer: 2,
      hints: ['Thay $x = 2$ vào từng hạng tử.'],
      solution: '$P(2) = 2^3 - 2 \\cdot 2^2 + 3 \\cdot 2 - 4 = 8 - 8 + 6 - 4 = 2$.',
    },
    {
      type: 'choice',
      prompt: 'Thương của phép chia $(6x^3 - 7x^2 + 1) : (2x - 1)$ là',
      options: ['$3x^2 - 2x - 1$', '$3x^2 + 2x - 1$', '$3x^2 - 2x + 1$', '$3x^2 - 5x + 1$'],
      answer: 0,
      hints: [
        'Hạng tử đầu của thương: $6x^3 : 2x = 3x^2$.',
        'Kiểm tra bằng cách nhân thương với $2x - 1$ xem có được đa thức bị chia không.',
      ],
      solution:
        '$6x^3 : 2x = 3x^2$, dư $-4x^2 + 1$; $-4x^2 : 2x = -2x$, dư $-2x + 1$; $-2x : 2x = -1$, dư $0$. Thử lại: $(2x - 1)(3x^2 - 2x - 1) = 6x^3 - 4x^2 - 2x - 3x^2 + 2x + 1 = 6x^3 - 7x^2 + 1$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $\\widehat{A} = 2\\widehat{B}$ và $\\widehat{C} = 3\\widehat{B}$. Tính số đo góc $C$ (độ).',
      answer: 90,
      unit: '°',
      hints: ['Đặt $\\widehat{B} = x$ rồi dùng tổng ba góc bằng $180^\\circ$.'],
      solution:
        '$2x + x + 3x = 180^\\circ$ nên $6x = 180^\\circ$, $x = 30^\\circ$. Vậy $\\widehat{C} = 3 \\cdot 30^\\circ = 90^\\circ$ (tam giác $ABC$ vuông tại $C$).',
    },
    {
      type: 'choice',
      prompt: 'Bộ ba độ dài nào sau đây là độ dài ba cạnh của một tam giác?',
      options: [
        '$2$ cm, $3$ cm, $6$ cm',
        '$3$ cm, $4$ cm, $7$ cm',
        '$4$ cm, $5$ cm, $8$ cm',
        '$1$ cm, $2$ cm, $3$ cm',
      ],
      answer: 2,
      hints: ['Chỉ cần kiểm tra: cạnh lớn nhất có nhỏ hơn tổng hai cạnh còn lại không.'],
      solution:
        '$2 + 3 < 6$; $3 + 4 = 7$; $1 + 2 = 3$ nên ba bộ đó không thỏa mãn bất đẳng thức tam giác. $4 + 5 = 9 > 8$ nên $4$ cm, $5$ cm, $8$ cm là ba cạnh của một tam giác.',
    },
    {
      type: 'choice',
      prompt:
        'Tam giác $ABC$ có $AB = 5$ cm, $AC = 7$ cm, $BC = 9$ cm. Góc lớn nhất của tam giác là',
      options: ['$\\widehat{A}$', '$\\widehat{B}$', '$\\widehat{C}$'],
      answer: 0,
      hints: ['Trong một tam giác, góc đối diện với cạnh lớn hơn là góc lớn hơn.'],
      solution:
        'Cạnh lớn nhất là $BC = 9$ cm, góc đối diện với cạnh $BC$ là $\\widehat{A}$, nên $\\widehat{A}$ lớn nhất.',
    },
    {
      type: 'number',
      prompt:
        'Một hình lăng trụ đứng có đáy là tam giác vuông với hai cạnh góc vuông $6$ cm và $8$ cm, chiều cao lăng trụ $12$ cm. Tính thể tích của hình lăng trụ ($\\text{cm}^3$).',
      answer: 288,
      hints: [
        'Diện tích tam giác vuông bằng nửa tích hai cạnh góc vuông.',
        'Thể tích lăng trụ đứng bằng diện tích đáy nhân chiều cao.',
      ],
      solution:
        '$S_{\\text{đáy}} = \\dfrac{1}{2} \\cdot 6 \\cdot 8 = 24\\ (\\text{cm}^2)$; $V = 24 \\cdot 12 = 288\\ (\\text{cm}^3)$.',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ hình quạt tròn về môn thể thao yêu thích của $40$ học sinh lớp 7A cho biết $35\\%$ số học sinh thích bóng đá. Có bao nhiêu học sinh thích bóng đá?',
      answer: 14,
      hints: ['Tính $35\\%$ của $40$.'],
      solution: '$40 \\cdot \\dfrac{35}{100} = 14$ (học sinh).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi mục đích với loại biểu đồ thích hợp nhất.',
      left: [
        'Biểu diễn tỉ lệ phần trăm của các phần so với toàn thể',
        'Biểu diễn sự thay đổi nhiệt độ trong ngày theo từng giờ',
        'So sánh số học sinh nam và nữ của từng lớp',
      ],
      right: ['Biểu đồ hình quạt tròn', 'Biểu đồ đoạn thẳng', 'Biểu đồ cột kép'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Biểu đồ đoạn thẳng thể hiện xu hướng theo thời gian; biểu đồ cột kép so sánh hai nhóm trên từng hạng mục.',
      ],
      solution:
        'Tỉ lệ phần trăm so với toàn thể dùng biểu đồ hình quạt tròn; thay đổi theo thời gian dùng biểu đồ đoạn thẳng; so sánh hai nhóm (nam, nữ) ở nhiều lớp dùng biểu đồ cột kép.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo một con xúc xắc cân đối. Tính xác suất của biến cố "Số chấm xuất hiện là hợp số" (phân số tối giản).',
      answer: [1, 3],
      simplest: true,
      hints: [
        'Hợp số là số tự nhiên lớn hơn $1$ có nhiều hơn hai ước. Trong $1, 2, \\ldots, 6$, số nào là hợp số?',
      ],
      solution:
        'Có $6$ kết quả đồng khả năng; các hợp số là $4$ và $6$. Xác suất là $\\dfrac{2}{6} = \\dfrac{1}{3}$.',
    },
  ],
  takeaways: [
    'Tỉ lệ thức $\\dfrac{a}{b} = \\dfrac{c}{d}$ cho $ad = bc$; dãy tỉ số bằng nhau giải nhanh bài chia theo tỉ lệ.',
    'Tỉ lệ thuận: thương $\\dfrac{y}{x}$ không đổi; tỉ lệ nghịch: tích $xy$ không đổi.',
    '$a$ là nghiệm của đa thức $P(x)$ khi $P(a) = 0$; cộng, trừ đa thức theo từng bậc.',
    'Tổng ba góc của tam giác là $180^\\circ$; trọng tâm chia trung tuyến theo tỉ số $AG = \\dfrac{2}{3}AM$.',
    'Lăng trụ đứng: $S_{xq} = C_{\\text{đáy}} \\cdot h$, $V = S_{\\text{đáy}} \\cdot h$.',
    'Xác suất của biến cố (kết quả đồng khả năng) bằng số kết quả thuận lợi chia cho số kết quả có thể.',
  ],
};
