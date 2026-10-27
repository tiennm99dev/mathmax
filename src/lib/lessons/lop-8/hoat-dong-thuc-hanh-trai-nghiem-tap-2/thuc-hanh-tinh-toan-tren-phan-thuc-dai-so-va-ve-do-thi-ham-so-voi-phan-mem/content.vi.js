/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: dùng cửa sổ CAS của GeoGebra để rút gọn và tính toán trên phân thức đại số, giải phương trình bậc nhất một ẩn, và dùng ô Nhập để vẽ đồ thị hàm số bậc nhất.',
  intro:
    'Ở chương VI em đã rút gọn phân thức, cộng, trừ, nhân, chia phân thức; ở chương VII em đã giải phương trình bậc nhất một ẩn và vẽ đồ thị hàm số $y = ax + b$. GeoGebra làm được tất cả những việc đó chỉ với một dòng lệnh. Trong hoạt động này, em dùng phần mềm để làm nhanh và để kiểm tra lại bài làm trên giấy.',
  objectives: [
    'Nhập đúng một phân thức vào cửa sổ CAS: tử và mẫu đặt trong ngoặc, dấu / là phép chia.',
    'Rút gọn phân thức, thực hiện các phép tính trên phân thức bằng CAS (lệnh Simplify, Factor).',
    'Giải phương trình bậc nhất một ẩn bằng lệnh Solve hoặc Solutions.',
    'Vẽ đồ thị hàm số bậc nhất bằng ô Nhập của GeoGebra, đọc giao điểm của đồ thị với hai trục toạ độ.',
  ],
  sections: [
    {
      heading: 'Tính toán trên phân thức trong cửa sổ CAS',
      blocks: [
        {
          type: 'p',
          text: 'Mở GeoGebra Classic, vào menu Hiển thị (View) và chọn CAS. Gõ biểu thức vào một dòng rồi nhấn Enter, kết quả hiện ngay bên dưới. Với phân thức, CAS tự rút gọn: gõ (x^2 - 1)/(x^2 + 2x + 1) và nhấn Enter, ta được $\\dfrac{x - 1}{x + 1}$.',
        },
        {
          type: 'table',
          head: ['Muốn viết', 'Gõ vào CAS', 'Ghi chú'],
          rows: [
            ['$\\dfrac{x + 1}{x - 2}$', '(x + 1)/(x - 2)', 'tử và mẫu đều đặt trong ngoặc'],
            ['$\\dfrac{3x}{x^2 - 1}$', '3x/(x^2 - 1)', 'tử là một đơn thức thì không cần ngoặc'],
            ['$\\dfrac{A}{B} : \\dfrac{C}{D}$', '(A/B) / (C/D)', 'phép chia luôn viết bằng dấu /'],
            ['$xy^3$', 'x*y^3', 'nên đặt dấu * giữa hai biến'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Thiếu ngoặc là sai',
          text: 'Gõ x + 1/x - 2 thì máy hiểu là $x + \\dfrac{1}{x} - 2$. Gõ A/B / C/D (không có ngoặc quanh $\\dfrac{C}{D}$) thì máy chia $\\dfrac{A}{B}$ cho $C$ rồi lại chia tiếp cho $D$, nên kết quả sai. Luôn đặt ngoặc quanh tử, quanh mẫu và quanh phân thức chia.',
        },
        {
          type: 'table',
          head: ['Việc cần làm', 'Lệnh', 'Ví dụ và kết quả'],
          rows: [
            [
              'Rút gọn, tính giá trị gọn nhất',
              'Simplify(<biểu thức>)',
              'Simplify((x^2 - 4)/(x^2 - 2x)) cho $\\dfrac{x + 2}{x}$',
            ],
            [
              'Phân tích tử và mẫu thành nhân tử',
              'Factor(<biểu thức>)',
              'Factor(x^3 - 4x) cho $x(x - 2)(x + 2)$',
            ],
            [
              'Giải phương trình, ghi dạng $x = \\ldots$',
              'Solve(<phương trình>)',
              'Solve(2x - 3 = 5) cho $\\{x = 4\\}$',
            ],
            [
              'Giải phương trình, chỉ ghi các nghiệm',
              'Solutions(<phương trình>)',
              'Solutions(2x - 3 = 5) cho $\\{4\\}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Máy không ghi điều kiện xác định',
          text: 'CAS cho $\\dfrac{x^2 - 1}{x + 1} = x - 1$, nhưng đẳng thức này chỉ đúng khi $x \\ne -1$, vì tại $x = -1$ phân thức ban đầu không xác định. Khi trình bày bài, em vẫn phải tự ghi điều kiện xác định như đã học.',
        },
        {
          type: 'p',
          text: 'Phương trình có số thập phân: GeoGebra dùng dấu chấm thập phân, nên $4{,}8$ được gõ là 4.8. Kết quả nghiệm thường hiện ở dạng phân số, chẳng hạn $-\\dfrac{37}{5}$, tức là $-7{,}4$.',
        },
      ],
    },
    {
      heading: 'Vẽ đồ thị hàm số bậc nhất',
      blocks: [
        {
          type: 'p',
          text: 'Ở giao diện Classic, mở cửa sổ Đại số và cửa sổ Đồ hoạ (có hệ trục toạ độ). Gõ hàm số vào ô Nhập (Input) rồi nhấn Enter, đồ thị hiện ngay trên mặt phẳng toạ độ và tên hàm số hiện trong cửa sổ Đại số.',
        },
        {
          type: 'table',
          head: ['Muốn làm', 'Gõ vào ô Nhập'],
          rows: [
            ['Vẽ đồ thị $y = -3x + 3$', 'y = -3x + 3 hoặc f(x) = -3x + 3'],
            ['Vẽ đồ thị $y = \\dfrac{1}{2}x - 4$', 'g(x) = 0.5x - 4 hoặc g(x) = (1/2)x - 4'],
            ['Giao điểm của đồ thị $f$ với trục $Ox$', 'Intersect(f, xAxis)'],
            ['Giao điểm của đồ thị $f$ với trục $Oy$', 'Intersect(f, yAxis)'],
          ],
        },
        {
          type: 'p',
          text: 'Đồ thị của hàm số bậc nhất $y = ax + b$ ($a \\ne 0$) là một đường thẳng cắt trục $Oy$ tại điểm $(0; b)$ và cắt trục $Ox$ tại điểm $\\left(-\\dfrac{b}{a}; 0\\right)$. Em dùng hai giao điểm này để kiểm tra hình vẽ trên giấy.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thanh trượt',
          text: 'Gõ y = a x + b khi chưa có $a$, $b$, GeoGebra đề nghị tạo thanh trượt cho $a$ và $b$. Kéo thanh trượt để thấy: $a$ đổi thì độ dốc của đường thẳng đổi, $b$ đổi thì đường thẳng tịnh tiến lên xuống, giao điểm với $Oy$ luôn là $(0; b)$.',
        },
      ],
    },
    {
      heading: 'Thực hành trên máy tính',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi em (hoặc nhóm hai em) dùng GeoGebra làm các bài dưới đây, so sánh với lời giải tay và chụp lại màn hình kết quả.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: máy tính có GeoGebra Classic hoặc truy cập geogebra.org; vở có lời giải tay của các bài.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tính: $\\dfrac{x^4 - xy^3}{2xy + y^2} : \\dfrac{x^3 + x^2y + xy^2}{2x + y} + \\dfrac{y + x}{x}$.',
            'Rút gọn rồi tính: a) $\\dfrac{x^2 - 4}{x^2 + 4x + 4}$; b) $\\dfrac{1}{x - 1} - \\dfrac{2}{x^2 - 1}$; c) $\\dfrac{x^2 + 2x}{x - 3} \\cdot \\dfrac{x^2 - 9}{x^2 + 5x + 6}$.',
            'Giải các phương trình: a) $4{,}8 - 2{,}5(x + 3) = x + 0{,}5(2 - 6x)$; b) $3(x - 2) - 5 = x + 1$.',
            'Vẽ đồ thị của các hàm số bậc nhất: a) $y = -3x + 3$; b) $y = \\dfrac{1}{2}x - 4$. Dùng lệnh Intersect tìm giao điểm của mỗi đồ thị với hai trục.',
            'Gõ y = a x + b, tạo thanh trượt rồi ghi lại: khi nào đường thẳng đi lên từ trái sang phải, khi nào đi xuống, khi nào đi qua gốc toạ độ.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: với mỗi bài, ghi dòng lệnh đã gõ, kết quả của GeoGebra và kết quả tính tay; đánh dấu chỗ tính tay bị sai, giải thích vì sao sai, và ghi nhận xét về vai trò của $a$, $b$ ở bài 5.',
        },
      ],
    },
  ],
  explore: {
    title: 'GeoGebra mô phỏng',
    instruction:
      'Ở "Cửa sổ CAS", gõ phân thức hoặc lệnh (Simplify, Factor, Solve, Solutions) rồi bấm "Tính". Ở "Bài tập phân thức", tự tính, gõ kết quả đã rút gọn để máy kiểm tra. Ở "Vẽ đồ thị", gõ hàm số như trong ô Nhập của GeoGebra; gõ y = a x + b để có thanh trượt.',
  },
  examples: [
    {
      problem: 'Dùng CAS rút gọn phân thức $\\dfrac{x^2 - 4}{x^2 - 2x}$, rồi giải thích kết quả.',
      steps: [
        'Gõ Simplify((x^2 - 4)/(x^2 - 2x)) và nhấn Enter, CAS cho $\\dfrac{x + 2}{x}$.',
        'Kiểm tra tay: $x^2 - 4 = (x - 2)(x + 2)$ và $x^2 - 2x = x(x - 2)$.',
        'Chia tử và mẫu cho nhân tử chung $x - 2$ (với $x \\ne 0$, $x \\ne 2$).',
      ],
      answer: '$\\dfrac{x^2 - 4}{x^2 - 2x} = \\dfrac{x + 2}{x}$ với $x \\ne 0$, $x \\ne 2$.',
    },
    {
      problem:
        'Dùng CAS tính $\\dfrac{x^4 - xy^3}{2xy + y^2} : \\dfrac{x^3 + x^2y + xy^2}{2x + y} + \\dfrac{y + x}{x}$.',
      steps: [
        'Gõ Simplify((x^4 - x*y^3)/(2x*y + y^2) / ((x^3 + x^2*y + x*y^2)/(2x + y)) + (y + x)/x), nhấn Enter.',
        'Kiểm tra tay: $x^4 - xy^3 = x(x - y)(x^2 + xy + y^2)$, $2xy + y^2 = y(2x + y)$, $x^3 + x^2y + xy^2 = x(x^2 + xy + y^2)$.',
        'Thương bằng $\\dfrac{x(x - y)(x^2 + xy + y^2)}{y(2x + y)} \\cdot \\dfrac{2x + y}{x(x^2 + xy + y^2)} = \\dfrac{x - y}{y}$.',
        'Cộng: $\\dfrac{x - y}{y} + \\dfrac{x + y}{x} = \\dfrac{x^2 - xy + xy + y^2}{xy} = \\dfrac{x^2 + y^2}{xy}$.',
      ],
      answer: '$\\dfrac{x^2 + y^2}{xy}$.',
    },
    {
      problem: 'Dùng CAS giải phương trình $4{,}8 - 2{,}5(x + 3) = x + 0{,}5(2 - 6x)$.',
      steps: [
        'Gõ Solutions(4.8 - 2.5(x + 3) = x + 0.5(2 - 6x)), CAS cho $\\left\\{-\\dfrac{37}{5}\\right\\}$.',
        'Kiểm tra tay: vế trái $= 4{,}8 - 2{,}5x - 7{,}5 = -2{,}5x - 2{,}7$; vế phải $= x + 1 - 3x = -2x + 1$.',
        '$-2{,}5x - 2{,}7 = -2x + 1 \\Rightarrow -0{,}5x = 3{,}7 \\Rightarrow x = -7{,}4$.',
      ],
      answer: 'Phương trình có nghiệm duy nhất $x = -7{,}4$ (bằng $-\\dfrac{37}{5}$).',
    },
    {
      problem:
        'Vẽ đồ thị hàm số $y = -3x + 3$ bằng GeoGebra và tìm giao điểm của đồ thị với hai trục toạ độ.',
      steps: [
        'Gõ f(x) = -3x + 3 vào ô Nhập và nhấn Enter: một đường thẳng đi xuống từ trái sang phải (vì $a = -3 < 0$).',
        'Gõ Intersect(f, yAxis): được điểm $(0; 3)$, đúng bằng $(0; b)$.',
        'Gõ Intersect(f, xAxis): được điểm $(1; 0)$, vì $-3x + 3 = 0 \\Rightarrow x = 1$.',
      ],
      answer: 'Đồ thị là đường thẳng đi qua $(0; 3)$ và $(1; 0)$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Muốn nhập phân thức $\\dfrac{x + 1}{x - 2}$ vào cửa sổ CAS, em gõ dòng nào?',
      options: ['x + 1/x - 2', '(x + 1)/(x - 2)', '(x + 1)/x - 2', 'x + 1/(x - 2)'],
      answer: 1,
      hints: ['Phép chia chỉ áp dụng cho phần đứng ngay trước và ngay sau dấu /.'],
      solution:
        'Phải đặt ngoặc quanh cả tử và mẫu: (x + 1)/(x - 2). Dòng x + 1/x - 2 được hiểu là $x + \\dfrac{1}{x} - 2$.',
    },
    {
      type: 'number',
      prompt:
        'Gõ Simplify((x^2 - 9)/(x^2 - 3x)) vào CAS, kết quả có dạng $\\dfrac{x + a}{x}$. Tìm $a$.',
      answer: 3,
      hints: [
        'Phân tích tử thành nhân tử bằng hằng đẳng thức hiệu hai bình phương.',
        '$x^2 - 9 = (x - 3)(x + 3)$, còn $x^2 - 3x = x(x - 3)$.',
      ],
      solution:
        '$\\dfrac{x^2 - 9}{x^2 - 3x} = \\dfrac{(x - 3)(x + 3)}{x(x - 3)} = \\dfrac{x + 3}{x}$, nên $a = 3$.',
    },
    {
      type: 'choice',
      prompt: 'Gõ 1/(x - 1) - 2/(x^2 - 1) vào CAS. Kết quả là gì?',
      options: [
        '$\\dfrac{1}{x + 1}$',
        '$-\\dfrac{1}{x + 1}$',
        '$\\dfrac{x - 3}{x^2 - 1}$',
        '$\\dfrac{1}{x - 1}$',
      ],
      answer: 0,
      hints: ['Mẫu thức chung là $x^2 - 1 = (x - 1)(x + 1)$.'],
      solution:
        '$\\dfrac{1}{x - 1} - \\dfrac{2}{x^2 - 1} = \\dfrac{x + 1 - 2}{(x - 1)(x + 1)} = \\dfrac{x - 1}{(x - 1)(x + 1)} = \\dfrac{1}{x + 1}$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi việc cần làm với lệnh GeoGebra phù hợp.',
      left: [
        'Rút gọn một biểu thức phân thức',
        'Phân tích tử và mẫu thành nhân tử',
        'Giải phương trình, kết quả dạng $\\{x = \\ldots\\}$',
        'Giải phương trình, kết quả chỉ gồm các nghiệm',
        'Tìm giao điểm của đồ thị $f$ với trục $Ox$',
      ],
      right: ['Solutions', 'Simplify', 'Intersect', 'Factor', 'Solve', 'Division'],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 4],
        [3, 0],
        [4, 2],
      ],
      hints: ['Solve ghi cả "x =", Solutions chỉ ghi các giá trị nghiệm.'],
      solution:
        'Rút gọn: Simplify. Phân tích: Factor. Solve cho $\\{x = \\ldots\\}$, Solutions cho $\\{\\ldots\\}$. Giao điểm với trục $Ox$: Intersect(f, xAxis).',
    },
    {
      type: 'number',
      prompt: 'Gõ Solutions(3(x - 2) - 5 = x + 1) vào CAS. Nghiệm hiện ra là bao nhiêu?',
      answer: 6,
      hints: ['Bỏ ngoặc ở vế trái rồi chuyển vế các hạng tử chứa $x$.'],
      solution:
        '$3x - 6 - 5 = x + 1 \\Rightarrow 3x - 11 = x + 1 \\Rightarrow 2x = 12 \\Rightarrow x = 6$.',
    },
    {
      type: 'multi',
      prompt:
        'Những dòng nào cho đúng kết quả của phép chia $\\dfrac{x^3 - 8}{x^2 - 4} : \\dfrac{x^2 + 2x + 4}{x + 2}$ (bằng $1$)?',
      options: [
        '(x^3 - 8)/(x^2 - 4) / ((x^2 + 2x + 4)/(x + 2))',
        '(x^3 - 8)/(x^2 - 4) / (x^2 + 2x + 4)/(x + 2)',
        'Simplify(((x^3 - 8)/(x^2 - 4)) / ((x^2 + 2x + 4)/(x + 2)))',
        '(x^3 - 8)/(x^2 - 4) * (x + 2)/(x^2 + 2x + 4)',
      ],
      answers: [0, 2, 3],
      hints: [
        'Chia cho một phân thức là nhân với phân thức nghịch đảo của nó.',
        'Không có ngoặc, máy chia lần lượt từ trái sang phải.',
      ],
      solution:
        'Dòng 2 thiếu ngoặc quanh phân thức chia nên máy chia cho $x^2 + 2x + 4$ rồi chia tiếp cho $x + 2$, được $\\dfrac{1}{(x + 2)^2}$. Ba dòng còn lại đều cho $\\dfrac{(x - 2)(x^2 + 2x + 4)}{(x - 2)(x + 2)} \\cdot \\dfrac{x + 2}{x^2 + 2x + 4} = 1$.',
    },
    {
      type: 'choice',
      prompt: 'Muốn vẽ đồ thị hàm số $y = \\dfrac{1}{2}x - 4$, em gõ vào ô Nhập dòng nào?',
      options: ['y = 1/(2x) - 4', 'y = 1/2 - 4x', 'y = 0.5x - 4', 'y = 2x - 4'],
      answer: 2,
      hints: ['$\\dfrac{1}{2} = 0{,}5$ và GeoGebra dùng dấu chấm thập phân.'],
      solution:
        'Gõ y = 0.5x - 4 (hoặc y = (1/2)x - 4). Dòng y = 1/(2x) - 4 là hàm số $y = \\dfrac{1}{2x} - 4$, không phải hàm số bậc nhất.',
    },
    {
      type: 'number',
      prompt:
        'Vẽ đồ thị $f(x) = -2x + 6$ rồi gõ Intersect(f, xAxis). Giao điểm có hoành độ bằng bao nhiêu?',
      answer: 3,
      hints: ['Trên trục $Ox$, tung độ bằng $0$.', 'Giải $-2x + 6 = 0$.'],
      solution: '$-2x + 6 = 0 \\Rightarrow x = 3$. Giao điểm là $(3; 0)$.',
    },
    {
      type: 'choice',
      prompt:
        'CAS cho $\\dfrac{x^2 - 1}{x + 1} = x - 1$. Khi trình bày bài, em ghi đẳng thức này đúng với những giá trị nào của $x$?',
      options: ['Mọi $x$', 'Mọi $x \\ne 1$', 'Mọi $x \\ne -1$', 'Mọi $x \\ne \\pm 1$'],
      answer: 2,
      hints: ['Phân thức ban đầu xác định khi mẫu khác $0$.'],
      solution:
        'Phân thức $\\dfrac{x^2 - 1}{x + 1}$ xác định khi $x + 1 \\ne 0$, tức $x \\ne -1$. CAS không ghi điều kiện này, em phải tự ghi.',
    },
  ],
  takeaways: [
    'Trong CAS, đặt ngoặc quanh tử, mẫu và phân thức chia; gõ phân thức rồi nhấn Enter là được dạng rút gọn.',
    'Simplify rút gọn, Factor phân tích thành nhân tử, Solve và Solutions giải phương trình; máy không ghi điều kiện xác định, em phải tự ghi.',
    'Vẽ đồ thị $y = ax + b$ bằng cách gõ hàm số vào ô Nhập; đồ thị cắt $Oy$ tại $(0; b)$ và cắt $Ox$ tại $\\left(-\\dfrac{b}{a}; 0\\right)$.',
  ],
};
