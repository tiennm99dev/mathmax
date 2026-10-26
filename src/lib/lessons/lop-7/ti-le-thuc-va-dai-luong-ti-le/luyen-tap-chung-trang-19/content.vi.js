/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về đại lượng tỉ lệ thuận và đại lượng tỉ lệ nghịch: tìm hệ số tỉ lệ, tính giá trị tương ứng, nhận biết hai đại lượng tỉ lệ từ bảng giá trị và giải các bài toán tỉ lệ thuận, tỉ lệ nghịch, chia tỉ lệ.',
  intro:
    'Bài luyện tập này ôn lại hai bài Đại lượng tỉ lệ thuận (Bài 22) và Đại lượng tỉ lệ nghịch (Bài 23). Điều quan trọng nhất là nhận ra hai đại lượng trong bài toán tỉ lệ thuận hay tỉ lệ nghịch: thương không đổi hay tích không đổi. Sau đó mới lập tỉ lệ thức hoặc dãy tỉ số bằng nhau để tính.',
  objectives: [
    'Tìm hệ số tỉ lệ, viết công thức liên hệ và tính giá trị tương ứng của hai đại lượng tỉ lệ thuận, tỉ lệ nghịch.',
    'Nhận biết hai đại lượng tỉ lệ thuận hay tỉ lệ nghịch qua bảng giá trị hoặc tình huống thực tế.',
    'Giải bài toán tỉ lệ thuận, tỉ lệ nghịch và bài toán chia một số thành các phần tỉ lệ nghịch với các số cho trước.',
  ],
  sections: [
    {
      heading: 'Nhắc lại kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Tỉ lệ thuận', 'Tỉ lệ nghịch'],
          rows: [
            [
              'Định nghĩa',
              '$y = kx$ ($k \\ne 0$): $y$ tỉ lệ thuận với $x$ theo hệ số tỉ lệ $k$.',
              '$y = \\frac{a}{x}$ hay $xy = a$ ($a \\ne 0$): $y$ tỉ lệ nghịch với $x$ theo hệ số tỉ lệ $a$.',
            ],
            [
              'Chiều ngược lại',
              '$x$ tỉ lệ thuận với $y$ theo hệ số $\\frac{1}{k}$.',
              '$x$ tỉ lệ nghịch với $y$ theo cùng hệ số $a$.',
            ],
            [
              'Đại lượng không đổi',
              'Thương: $\\frac{y_1}{x_1} = \\frac{y_2}{x_2} = \\ldots = k$.',
              'Tích: $x_1y_1 = x_2y_2 = \\ldots = a$.',
            ],
            [
              'Tỉ số hai giá trị',
              '$\\frac{x_1}{x_2} = \\frac{y_1}{y_2}$',
              '$\\frac{x_1}{x_2} = \\frac{y_2}{y_1}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chia tỉ lệ nghịch',
          text: 'Ba số $x$, $y$, $z$ tỉ lệ nghịch với $m$, $n$, $p$ khi $mx = ny = pz$, tức là $x$, $y$, $z$ tỉ lệ thuận với $\\frac{1}{m}$, $\\frac{1}{n}$, $\\frac{1}{p}$: $\\frac{x}{\\frac{1}{m}} = \\frac{y}{\\frac{1}{n}} = \\frac{z}{\\frac{1}{p}}$.',
        },
      ],
    },
    {
      heading: 'Lưu ý khi làm bài',
      blocks: [
        {
          type: 'list',
          items: [
            'Trước khi tính, hãy hỏi: đại lượng này gấp đôi thì đại lượng kia gấp đôi (tỉ lệ thuận) hay giảm một nửa (tỉ lệ nghịch)?',
            'Từ bảng giá trị: tính các thương $\\frac{y}{x}$ và các tích $xy$. Thương bằng nhau thì tỉ lệ thuận, tích bằng nhau thì tỉ lệ nghịch, không bằng nhau cả hai thì không tỉ lệ.',
            'Bài toán tỉ lệ nghịch thường có một đại lượng thứ ba giữ không đổi: quãng đường, khối lượng công việc, số tiền, diện tích.',
            'Để giải bài toán chia tỉ lệ nghịch, đặt $mx = ny = pz = c$, viết $x = \\frac{c}{m}$, $y = \\frac{c}{n}$, $z = \\frac{c}{p}$ rồi thay vào điều kiện về tổng hoặc hiệu.',
            'Đừng nhầm "tăng cùng nhau" với tỉ lệ thuận: hai đại lượng cùng tăng chưa chắc tỉ lệ thuận.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện trộn ngẫu nhiên',
    instruction:
      'Mỗi lượt có 10 câu trộn ngẫu nhiên từ Bài 22 và Bài 23. Đáp số luôn là số nguyên; nhập số âm với dấu trừ, ví dụ $-7$. Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng cho biết bài nào cần ôn thêm.',
  },
  examples: [
    {
      problem:
        'Cho bảng giá trị: $x = 2;\\ 4;\\ 5;\\ 8$ và $y = 10;\\ 5;\\ 4;\\ 2{,}5$ tương ứng. Hai đại lượng $x$ và $y$ tỉ lệ thuận hay tỉ lệ nghịch? Tìm hệ số tỉ lệ và tính $y$ khi $x = 10$.',
      steps: [
        'Các thương $\\frac{y}{x}$: $\\frac{10}{2} = 5$, $\\frac{5}{4} = 1{,}25$ khác nhau, nên $x$ và $y$ không tỉ lệ thuận.',
        'Các tích $xy$: $2 \\cdot 10 = 4 \\cdot 5 = 5 \\cdot 4 = 8 \\cdot 2{,}5 = 20$ bằng nhau, nên $y$ tỉ lệ nghịch với $x$ theo hệ số tỉ lệ $a = 20$.',
        'Ta có $y = \\frac{20}{x}$; khi $x = 10$ thì $y = \\frac{20}{10} = 2$.',
      ],
      answer: '$x$ và $y$ tỉ lệ nghịch, hệ số tỉ lệ $20$; $y = 2$ khi $x = 10$.',
    },
    {
      problem:
        'Ba đội máy san đất làm ba khối lượng công việc như nhau. Đội thứ nhất hoàn thành công việc trong $4$ ngày, đội thứ hai trong $6$ ngày, đội thứ ba trong $8$ ngày. Hỏi mỗi đội có bao nhiêu máy, biết đội thứ nhất có nhiều hơn đội thứ hai $2$ máy và năng suất các máy như nhau?',
      steps: [
        'Gọi số máy của ba đội là $x$, $y$, $z$. Cùng một khối lượng công việc thì số máy và số ngày hoàn thành tỉ lệ nghịch, nên $4x = 6y = 8z$.',
        'Viết thành dãy tỉ số bằng nhau: $\\frac{x}{\\frac{1}{4}} = \\frac{y}{\\frac{1}{6}} = \\frac{z}{\\frac{1}{8}} = \\frac{x - y}{\\frac{1}{4} - \\frac{1}{6}} = \\frac{2}{\\frac{1}{12}} = 24$.',
        '$x = \\frac{1}{4} \\cdot 24 = 6$; $\\;y = \\frac{1}{6} \\cdot 24 = 4$; $\\;z = \\frac{1}{8} \\cdot 24 = 3$.',
        'Thử lại: $4 \\cdot 6 = 6 \\cdot 4 = 8 \\cdot 3 = 24$ và $6 - 4 = 2$.',
      ],
      answer: 'Ba đội lần lượt có $6$, $4$ và $3$ máy.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt:
        'Cho biết $y$ tỉ lệ thuận với $x$ và khi $x = 6$ thì $y = -4$. Tìm hệ số tỉ lệ $k$ của $y$ đối với $x$ (viết dạng phân số tối giản).',
      answer: [-2, 3],
      simplest: true,
      hints: ['$y = kx$ nên $k = \\frac{y}{x}$.', 'Rút gọn $\\frac{-4}{6}$.'],
      solution: '$k = \\frac{y}{x} = \\frac{-4}{6} = \\frac{-2}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Với $y$ tỉ lệ thuận với $x$ như ở câu trên ($x = 6$ thì $y = -4$), tính $y$ khi $x = 9$.',
      answer: -6,
      hints: ['Dùng $y = -\\frac{2}{3}x$, hoặc tỉ số $\\frac{y_1}{y_2} = \\frac{x_1}{x_2}$.'],
      solution:
        '$y = -\\frac{2}{3} \\cdot 9 = -6$. Kiểm tra: $\\frac{-4}{-6} = \\frac{6}{9} = \\frac{2}{3}$.',
    },
    {
      type: 'choice',
      prompt: 'Bảng giá trị nào cho biết $y$ tỉ lệ nghịch với $x$?',
      options: [
        '$x$: $1;\\ 2;\\ 4$ và $y$: $12;\\ 6;\\ 3$',
        '$x$: $1;\\ 2;\\ 4$ và $y$: $3;\\ 6;\\ 12$',
        '$x$: $1;\\ 2;\\ 4$ và $y$: $12;\\ 10;\\ 6$',
        '$x$: $1;\\ 2;\\ 4$ và $y$: $12;\\ 6;\\ 4$',
      ],
      answer: 0,
      hints: ['Tính các tích $xy$ trong từng bảng.', 'Tỉ lệ nghịch khi mọi tích $xy$ bằng nhau.'],
      solution:
        'Bảng thứ nhất: $1 \\cdot 12 = 2 \\cdot 6 = 4 \\cdot 3 = 12$, nên $y$ tỉ lệ nghịch với $x$ (hệ số $12$). Bảng thứ hai có thương $\\frac{y}{x} = 3$ không đổi (tỉ lệ thuận). Bảng thứ ba có tích $12$, $20$, $24$; bảng thứ tư có tích $12$, $12$, $16$, đều không bằng nhau.',
    },
    {
      type: 'number',
      prompt:
        'Cho biết $y$ tỉ lệ nghịch với $x$ và khi $x = -3$ thì $y = 8$. Tính $y$ khi $x = 4$.',
      answer: -6,
      hints: ['Tìm hệ số tỉ lệ $a = xy$ trước.', '$a = (-3) \\cdot 8$.'],
      solution:
        '$a = (-3) \\cdot 8 = -24$, nên $y = \\frac{-24}{x}$. Khi $x = 4$: $y = \\frac{-24}{4} = -6$.',
    },
    {
      type: 'choice',
      prompt:
        'Hai đại lượng $x$ và $y$ tỉ lệ nghịch với nhau. Nếu giá trị của $x$ tăng lên $3$ lần thì giá trị tương ứng của $y$',
      options: ['tăng lên $3$ lần', 'giảm đi $3$ lần', 'không thay đổi', 'giảm đi $3$ đơn vị'],
      answer: 1,
      hints: ['Tích $xy$ luôn không đổi.'],
      solution:
        'Vì $x_1y_1 = x_2y_2$, nếu $x_2 = 3x_1$ thì $y_2 = \\frac{x_1y_1}{3x_1} = \\frac{y_1}{3}$: $y$ giảm đi $3$ lần.',
    },
    {
      type: 'number',
      prompt:
        '$12$ công nhân làm xong một công việc trong $15$ ngày. Hỏi $20$ công nhân (năng suất như nhau) làm xong công việc đó trong bao nhiêu ngày?',
      answer: 9,
      hints: [
        'Cùng một công việc: số công nhân và số ngày làm là hai đại lượng tỉ lệ nghịch.',
        '$12 \\cdot 15 = 20 \\cdot x$.',
      ],
      solution:
        'Gọi số ngày cần tìm là $x$. Ta có $12 \\cdot 15 = 20 \\cdot x$, nên $x = \\frac{180}{20} = 9$ ngày.',
    },
    {
      type: 'number',
      prompt:
        'Một ô tô đi từ A đến B với vận tốc $60$ km/h thì hết $4$ giờ. Muốn đi hết quãng đường đó trong $3$ giờ thì ô tô phải đi với vận tốc bao nhiêu ki-lô-mét một giờ?',
      answer: 80,
      hints: [
        'Trên cùng quãng đường, vận tốc và thời gian tỉ lệ nghịch.',
        '$60 \\cdot 4 = v \\cdot 3$.',
      ],
      solution: 'Ta có $60 \\cdot 4 = v \\cdot 3$, nên $v = \\frac{240}{3} = 80$ km/h.',
    },
    {
      type: 'number',
      prompt:
        'Chia số $156$ thành ba phần tỉ lệ nghịch với $2$; $3$; $4$. Phần lớn nhất bằng bao nhiêu?',
      answer: 72,
      hints: [
        'Đặt $2x = 3y = 4z = c$, khi đó $x = \\frac{c}{2}$, $y = \\frac{c}{3}$, $z = \\frac{c}{4}$.',
        '$\\frac{c}{2} + \\frac{c}{3} + \\frac{c}{4} = \\frac{13c}{12}$.',
      ],
      solution:
        '$\\frac{13c}{12} = 156$ nên $c = 144$. Ba phần là $\\frac{144}{2} = 72$, $\\frac{144}{3} = 48$, $\\frac{144}{4} = 36$ (thử lại $72 + 48 + 36 = 156$). Phần lớn nhất là $72$, ứng với số nhỏ nhất $2$.',
    },
    {
      type: 'number',
      prompt:
        'Ba đội máy cày cày ba cánh đồng có diện tích như nhau. Đội thứ nhất cày xong trong $3$ ngày, đội thứ hai trong $5$ ngày, đội thứ ba trong $6$ ngày. Ba đội có tất cả $21$ máy (năng suất các máy như nhau). Hỏi đội thứ hai có bao nhiêu máy?',
      answer: 6,
      hints: [
        'Số máy và số ngày tỉ lệ nghịch: $3x = 5y = 6z$.',
        'Đặt $3x = 5y = 6z = c$; khi đó $x + y + z = c\\left(\\frac{1}{3} + \\frac{1}{5} + \\frac{1}{6}\\right) = \\frac{21c}{30}$.',
      ],
      solution:
        '$\\frac{21c}{30} = 21$ nên $c = 30$. Số máy ba đội là $\\frac{30}{3} = 10$, $\\frac{30}{5} = 6$, $\\frac{30}{6} = 5$. Đội thứ hai có $6$ máy (thử lại $10 + 6 + 5 = 21$).',
    },
    {
      type: 'number',
      prompt:
        'Hai thanh kim loại đồng chất có thể tích $12$ cm$^3$ và $17$ cm$^3$, tổng khối lượng hai thanh là $232$ g. Thanh thứ nhất nặng bao nhiêu gam?',
      answer: 96,
      hints: [
        'Khối lượng tỉ lệ thuận với thể tích: $\\frac{m_1}{12} = \\frac{m_2}{17}$.',
        'Dùng dãy tỉ số bằng nhau với tổng $m_1 + m_2 = 232$.',
      ],
      solution:
        '$\\frac{m_1}{12} = \\frac{m_2}{17} = \\frac{m_1 + m_2}{12 + 17} = \\frac{232}{29} = 8$, nên $m_1 = 12 \\cdot 8 = 96$ g (và $m_2 = 136$ g).',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các cặp đại lượng tỉ lệ thuận với nhau.',
      options: [
        'Chu vi và độ dài cạnh của hình vuông',
        'Diện tích và độ dài cạnh của hình vuông',
        'Số tiền phải trả và số quyển vở cùng loại mua được',
        'Vận tốc và thời gian đi hết cùng một quãng đường',
        'Số công nhân và số ngày làm xong cùng một công việc',
      ],
      answers: [0, 2],
      hints: [
        'Viết công thức liên hệ: có dạng $y = kx$ thì tỉ lệ thuận.',
        'Diện tích hình vuông là $S = a^2$, không có dạng $y = kx$.',
      ],
      solution:
        'Chu vi $C = 4a$ và số tiền $T = p \\cdot n$ ($p$ là giá một quyển) có dạng $y = kx$, nên tỉ lệ thuận. $S = a^2$ không tỉ lệ với $a$. Vận tốc và thời gian, số công nhân và số ngày có tích không đổi nên tỉ lệ nghịch.',
    },
    {
      type: 'number',
      prompt: 'Biết $5$ m dây đồng nặng $43$ g. Hỏi $12$ m dây đồng cùng loại nặng bao nhiêu gam?',
      answer: 103.2,
      tolerance: 0.001,
      hints: ['Khối lượng dây tỉ lệ thuận với chiều dài.', '$\\frac{x}{12} = \\frac{43}{5}$.'],
      solution: '$\\frac{x}{12} = \\frac{43}{5} = 8{,}6$, nên $x = 12 \\cdot 8{,}6 = 103{,}2$ g.',
    },
  ],
  takeaways: [
    'Tỉ lệ thuận: $y = kx$, thương $\\frac{y}{x}$ không đổi; tỉ lệ nghịch: $xy = a$, tích không đổi.',
    'Nhận biết bằng bảng giá trị: thương bằng nhau là tỉ lệ thuận, tích bằng nhau là tỉ lệ nghịch.',
    'Chia tỉ lệ nghịch với $m$, $n$, $p$ là chia tỉ lệ thuận với $\\frac{1}{m}$, $\\frac{1}{n}$, $\\frac{1}{p}$.',
    'Luôn xác định đúng loại tỉ lệ trước khi lập tỉ lệ thức, rồi thử lại kết quả.',
  ],
};
