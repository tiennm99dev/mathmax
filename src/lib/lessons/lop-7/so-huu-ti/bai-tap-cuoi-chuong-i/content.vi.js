/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương I: hệ thống hoá tập hợp số hữu tỉ, bốn phép tính, lũy thừa, thứ tự thực hiện phép tính và quy tắc chuyển vế, kèm bài kiểm tra có bản đồ kĩ năng theo từng bài.',
  intro:
    'Chương I mở rộng tập hợp số từ số nguyên sang số hữu tỉ $\\mathbb{Q}$: những số viết được dưới dạng phân số $\\frac{a}{b}$, kể cả số thập phân như $-0{,}75$. Bài này hệ thống lại toàn chương và cho em một bài kiểm tra tổng hợp; bản đồ kĩ năng sẽ chỉ ra bài nào em đã vững và bài nào cần ôn lại.',
  objectives: [
    'Hệ thống hoá kiến thức chương Số hữu tỉ.',
    'Làm bài tập trắc nghiệm và tự luận tổng hợp: so sánh, tính giá trị biểu thức, tính lũy thừa, tìm $x$.',
    'Vận dụng số hữu tỉ để giải các bài toán thực tế về tiền, thời gian và đo lường.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức chương I',
      blocks: [
        {
          type: 'table',
          caption: 'Kiến thức chính theo từng bài',
          head: ['Bài', 'Kiến thức cần nhớ'],
          rows: [
            [
              'Bài 1. Tập hợp các số hữu tỉ',
              'Số hữu tỉ là số viết được dưới dạng $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}$, $b \\ne 0$; $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q}$. Mỗi số hữu tỉ được biểu diễn bởi một điểm trên trục số. Số đối của $a$ là $-a$. Với hai số hữu tỉ $a < b$, điểm $a$ nằm bên trái điểm $b$.',
            ],
            [
              'Bài 2. Cộng, trừ, nhân, chia số hữu tỉ',
              'Viết các số dưới dạng phân số (hoặc cùng dạng số thập phân) rồi tính như phân số. Phép cộng, phép nhân có tính chất giao hoán, kết hợp; phép nhân phân phối với phép cộng. Số nghịch đảo của $a \\ne 0$ là $\\frac{1}{a}$; $\\;a : b = a \\cdot \\frac{1}{b}$.',
            ],
            [
              'Bài 3. Lũy thừa với số mũ tự nhiên',
              '$x^n = x \\cdot x \\cdot \\ldots \\cdot x$ ($n$ thừa số); $x^0 = 1$ ($x \\ne 0$). $x^m \\cdot x^n = x^{m+n}$; $\\;x^m : x^n = x^{m-n}$; $\\;\\left(x^m\\right)^n = x^{m \\cdot n}$; $\\;\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}$.',
            ],
            [
              'Bài 4. Thứ tự thực hiện các phép tính. Quy tắc chuyển vế',
              'Không có ngoặc: lũy thừa $\\rightarrow$ nhân và chia $\\rightarrow$ cộng và trừ; có ngoặc: $(\\ ) \\rightarrow [\\ ] \\rightarrow \\{\\ \\}$. Chuyển một số hạng sang vế kia của đẳng thức thì đổi dấu số hạng đó.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Quy tắc dấu ngoặc',
          text: 'Bỏ ngoặc có dấu "$+$" đằng trước thì giữ nguyên dấu các số hạng trong ngoặc; bỏ ngoặc có dấu "$-$" đằng trước thì đổi dấu tất cả các số hạng trong ngoặc. Quy tắc này dùng nhiều khi tính hợp lí.',
        },
      ],
    },
    {
      heading: 'Những lỗi hay gặp',
      blocks: [
        {
          type: 'list',
          items: [
            'So sánh hai số âm theo phần số: $-0{,}5 < -0{,}4$ vì $-0{,}5$ nằm xa điểm $0$ hơn về bên trái.',
            'Nhầm số đối với số nghịch đảo: số đối của $\\frac{2}{3}$ là $\\frac{-2}{3}$, còn số nghịch đảo là $\\frac{3}{2}$.',
            'Nhân số mũ khi nhân hai lũy thừa cùng cơ số: $3^2 \\cdot 3^4 = 3^6$, không phải $3^8$.',
            'Quên dấu ngoặc khi lũy thừa số âm: $(-3)^2 = 9$ nhưng $-3^2 = -9$.',
            'Cộng trước nhân sau: $1 + 2 \\cdot \\frac{1}{4} = 1 + \\frac{1}{2} = \\frac{3}{2}$, không phải $3 \\cdot \\frac{1}{4}$.',
            'Chuyển vế mà quên đổi dấu: từ $x + \\frac{1}{3} = 1$ phải được $x = 1 - \\frac{1}{3}$.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Mỗi lượt có 14 câu, hai câu cho mỗi kĩ năng của chương, từ Bài 1 đến Bài 4. Nhập số nguyên (ví dụ −7), phân số dạng a/b (ví dụ −3/4) hoặc số thập phân có dấu phẩy (ví dụ −0,75). Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng tô màu từng bài theo kết quả lần làm đầu, để em biết cần ôn lại bài nào.',
  },
  examples: [
    {
      problem: 'Tính giá trị biểu thức $A = \\frac{3^{12} + 3^{15}}{1 + 3^3}$.',
      steps: [
        'Viết $3^{15} = 3^{12} \\cdot 3^3$ (nhân hai lũy thừa cùng cơ số).',
        'Đặt thừa số chung: $3^{12} + 3^{12} \\cdot 3^3 = 3^{12} \\cdot \\left(1 + 3^3\\right)$.',
        '$A = \\frac{3^{12} \\cdot \\left(1 + 3^3\\right)}{1 + 3^3} = 3^{12} = 531\\,441$.',
      ],
      answer: '$A = 3^{12} = 531\\,441$.',
    },
    {
      problem:
        'Tính $B = 2 : \\left(\\frac{1}{2} - \\frac{2}{3}\\right)^2 + 0{,}125^3 \\cdot 8^3 - (-12)^4 : 6^4$.',
      steps: [
        'Trong ngoặc: $\\frac{1}{2} - \\frac{2}{3} = \\frac{3}{6} - \\frac{4}{6} = \\frac{-1}{6}$, nên $\\left(\\frac{-1}{6}\\right)^2 = \\frac{1}{36}$ và $2 : \\frac{1}{36} = 72$.',
        'Cùng số mũ: $0{,}125^3 \\cdot 8^3 = (0{,}125 \\cdot 8)^3 = 1^3 = 1$ và $(-12)^4 : 6^4 = (-12 : 6)^4 = (-2)^4 = 16$.',
        '$B = 72 + 1 - 16 = 57$.',
      ],
      answer: '$B = 57$.',
    },
    {
      problem:
        'Chị Trang mua $4$ cái bánh pizza, mỗi cái giá $10{,}25$ USD. Chị có phiếu giảm giá $1{,}5$ USD cho mỗi cái bánh. Tính tổng số tiền chị Trang dùng để mua bánh.',
      steps: [
        'Giá mỗi cái bánh sau khi giảm: $10{,}25 - 1{,}5 = 8{,}75$ (USD).',
        'Tổng số tiền: $4 \\cdot 8{,}75 = 35$ (USD).',
        'Kiểm tra cách khác: $4 \\cdot 10{,}25 - 4 \\cdot 1{,}5 = 41 - 6 = 35$ (USD), nhờ tính chất phân phối.',
      ],
      answer: 'Chị Trang dùng $35$ USD để mua bánh.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng?',
      options: [
        '$\\frac{-3}{4} \\in \\mathbb{Z}$',
        '$-0{,}5 \\in \\mathbb{N}$',
        '$\\mathbb{N} \\subset \\mathbb{Q}$',
        '$0 \\notin \\mathbb{Q}$',
      ],
      answer: 2,
      hints: ['Mọi số tự nhiên $n$ đều viết được dưới dạng $\\frac{n}{1}$.'],
      solution:
        'Mỗi số tự nhiên $n = \\frac{n}{1}$ là một số hữu tỉ, nên $\\mathbb{N} \\subset \\mathbb{Q}$. $\\frac{-3}{4}$ không phải số nguyên, $-0{,}5$ không phải số tự nhiên, còn $0 = \\frac{0}{1} \\in \\mathbb{Q}$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các số hữu tỉ sau theo thứ tự tăng dần.',
      items: ['$-1{,}25$', '$\\frac{-4}{3}$', '$0$', '$\\frac{5}{6}$', '$0{,}8$'],
      answer: [1, 0, 2, 4, 3],
      hints: [
        'Số âm đứng trước $0$, số dương đứng sau.',
        'So sánh $\\frac{-4}{3} = -1{,}33\\ldots$ với $-1{,}25$, và $\\frac{5}{6} = 0{,}83\\ldots$ với $0{,}8$.',
      ],
      solution:
        '$\\frac{-4}{3} = \\frac{-16}{12} < \\frac{-15}{12} = -1{,}25$ và $0{,}8 = \\frac{24}{30} < \\frac{25}{30} = \\frac{5}{6}$. Vậy $\\frac{-4}{3} < -1{,}25 < 0 < 0{,}8 < \\frac{5}{6}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính $\\frac{-5}{12} + 0{,}75 - \\frac{1}{6}$ (viết kết quả dưới dạng phân số tối giản).',
      answer: [1, 6],
      simplest: true,
      hints: ['$0{,}75 = \\frac{3}{4}$; mẫu chung là $12$.'],
      solution: '$\\frac{-5}{12} + \\frac{9}{12} - \\frac{2}{12} = \\frac{2}{12} = \\frac{1}{6}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\left(-\\frac{4}{9}\\right) : 1\\frac{1}{3} \\cdot 0{,}6$.',
      answer: [-1, 5],
      hints: [
        'Chỉ có nhân và chia: làm từ trái sang phải.',
        '$1\\frac{1}{3} = \\frac{4}{3}$ và $0{,}6 = \\frac{3}{5}$.',
      ],
      solution:
        '$\\left(-\\frac{4}{9}\\right) : \\frac{4}{3} = \\left(-\\frac{4}{9}\\right) \\cdot \\frac{3}{4} = \\frac{-1}{3}$; $\\;\\frac{-1}{3} \\cdot \\frac{3}{5} = \\frac{-1}{5}$.',
    },
    {
      type: 'number',
      prompt:
        'Tính hợp lí: $\\frac{-3}{7} \\cdot \\frac{5}{8} + \\frac{-3}{7} \\cdot \\frac{3}{8} - \\frac{4}{7}$.',
      answer: -1,
      hints: ['Đặt thừa số chung $\\frac{-3}{7}$ cho hai tích đầu.'],
      solution:
        '$\\frac{-3}{7} \\cdot \\left(\\frac{5}{8} + \\frac{3}{8}\\right) - \\frac{4}{7} = \\frac{-3}{7} \\cdot 1 - \\frac{4}{7} = \\frac{-7}{7} = -1$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\frac{2^{10} + 2^{13}}{1 + 2^3}$.',
      answer: 1024,
      hints: ['$2^{13} = 2^{10} \\cdot 2^3$.', 'Đặt $2^{10}$ làm thừa số chung ở tử.'],
      solution:
        '$\\frac{2^{10} + 2^{10} \\cdot 2^3}{1 + 2^3} = \\frac{2^{10} \\cdot \\left(1 + 2^3\\right)}{1 + 2^3} = 2^{10} = 1\\,024$.',
    },
    {
      type: 'choice',
      prompt: 'Kết quả của $(-0{,}2)^4 \\cdot (-0{,}2)^3 : (-0{,}2)^5$ là:',
      options: ['$0{,}04$', '$-0{,}04$', '$0{,}4$', '$-0{,}008$'],
      answer: 0,
      hints: ['Cùng cơ số: số mũ là $4 + 3 - 5$.'],
      solution:
        '$(-0{,}2)^4 \\cdot (-0{,}2)^3 : (-0{,}2)^5 = (-0{,}2)^{4 + 3 - 5} = (-0{,}2)^2 = 0{,}04$.',
    },
    {
      type: 'fraction',
      prompt: 'Tìm $x$, biết $\\frac{1}{2} - \\left(x + \\frac{1}{3}\\right) = \\frac{-1}{6}$.',
      answer: [1, 3],
      hints: [
        'Coi $x + \\frac{1}{3}$ là một số hạng và chuyển nó sang vế phải.',
        '$x + \\frac{1}{3} = \\frac{1}{2} + \\frac{1}{6}$.',
      ],
      solution:
        '$x + \\frac{1}{3} = \\frac{1}{2} - \\frac{-1}{6} = \\frac{3}{6} + \\frac{1}{6} = \\frac{2}{3}$; $\\;x = \\frac{2}{3} - \\frac{1}{3} = \\frac{1}{3}$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $x$, biết $0{,}4x + 1{,}2 = -0{,}8$.',
      answer: -5,
      hints: ['Chuyển $1{,}2$ sang vế phải rồi chia cho $0{,}4$.'],
      solution: '$0{,}4x = -0{,}8 - 1{,}2 = -2$; $\\;x = -2 : 0{,}4 = -5$.',
    },
    {
      type: 'number',
      prompt:
        'Mẹ mua $3$ kg táo, giá $45{,}5$ nghìn đồng mỗi kilôgam. Cửa hàng giảm $2{,}5$ nghìn đồng cho mỗi kilôgam. Mẹ phải trả bao nhiêu nghìn đồng?',
      answer: 129,
      unit: 'nghìn đồng',
      hints: ['Tính giá mỗi kilôgam sau khi giảm rồi nhân với $3$.'],
      solution:
        'Giá sau khi giảm: $45{,}5 - 2{,}5 = 43$ (nghìn đồng/kg). Số tiền phải trả: $3 \\cdot 43 = 129$ (nghìn đồng).',
    },
    {
      type: 'text',
      prompt:
        'Chuyến bay của bố bạn Hà cất cánh lúc $14$ giờ $40$ phút. Bố phải có mặt ở sân bay trước giờ bay ít nhất $2$ giờ, và đi từ nhà đến sân bay mất khoảng $45$ phút. Bố phải đi từ nhà muộn nhất lúc mấy giờ? (Viết dạng "11 giờ 30 phút".)',
      accept: ['11 giờ 55 phút', '11 giờ 55', '11 h 55', '11h55', '11:55'],
      hints: [
        'Trước hết tìm giờ muộn nhất bố có mặt ở sân bay.',
        'Đổi ra giờ: $14$ giờ $40$ phút $= 14\\frac{2}{3}$ giờ, $45$ phút $= \\frac{3}{4}$ giờ.',
      ],
      solution:
        'Giờ muộn nhất có mặt ở sân bay: $14$ giờ $40$ phút $- 2$ giờ $= 12$ giờ $40$ phút. Giờ đi muộn nhất: $12$ giờ $40$ phút $- 45$ phút $= 11$ giờ $55$ phút. (Tính theo giờ: $14\\frac{2}{3} - 2 - \\frac{3}{4} = \\frac{176}{12} - \\frac{24}{12} - \\frac{9}{12} = \\frac{143}{12} = 11\\frac{11}{12}$ giờ, tức $11$ giờ $55$ phút.)',
    },
    {
      type: 'number',
      prompt:
        'Thả một quả bóng từ độ cao $8$ m. Mỗi lần chạm đất, bóng nảy lên đến độ cao bằng $\\frac{1}{2}$ độ cao của lần rơi trước. Sau lần chạm đất thứ ba, bóng nảy lên cao bao nhiêu mét?',
      answer: 1,
      unit: 'm',
      hints: [
        'Sau mỗi lần chạm đất, độ cao nhân với $\\frac{1}{2}$.',
        'Tính $8 \\cdot \\left(\\frac{1}{2}\\right)^3$.',
      ],
      solution:
        'Độ cao sau lần chạm đất thứ ba: $8 \\cdot \\left(\\frac{1}{2}\\right)^3 = 8 \\cdot \\frac{1}{8} = 1$ (m).',
    },
  ],
  takeaways: [
    'Mọi phép tính với số hữu tỉ quy về phép tính với phân số hoặc số thập phân; $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q}$.',
    'Ba quy tắc lũy thừa cùng cơ số: nhân thì cộng số mũ, chia thì trừ số mũ, lũy thừa của lũy thừa thì nhân số mũ.',
    'Tính đúng thứ tự (ngoặc, lũy thừa, nhân chia, cộng trừ) và tìm thừa số chung để tính hợp lí.',
    'Tìm $x$ bằng quy tắc chuyển vế, nhớ đổi dấu và thử lại.',
  ],
};
