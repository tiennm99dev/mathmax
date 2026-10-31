/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: dùng cửa sổ CAS của GeoGebra với lệnh Solve để giải phương trình bậc hai, phương trình chứa ẩn ở mẫu và hệ hai phương trình bậc nhất hai ẩn; nhập hàm số để vẽ parabol y = ax² và tìm giao điểm của hai đồ thị.',
  intro:
    'Em đã biết giải phương trình bậc hai bằng công thức nghiệm và giải hệ hai phương trình bằng phương pháp thế, cộng đại số. GeoGebra làm được việc đó chỉ bằng một dòng lệnh, và vẽ ngay đồ thị để em thấy nghiệm nằm ở đâu. Dùng máy để kiểm tra lời giải của mình, và để khám phá: parabol thay đổi thế nào khi hệ số $a$ thay đổi?',
  objectives: [
    'Mở cửa sổ CAS, dùng lệnh Solve, Solutions, NSolve để giải phương trình một ẩn và đọc tập nghiệm.',
    'Giải hệ hai phương trình bậc nhất hai ẩn bằng lệnh Solve với danh sách phương trình.',
    'Vẽ đồ thị hàm số $y = ax^2$ ($a \\ne 0$) và đường thẳng bằng ô Nhập lệnh.',
    'Tìm giao điểm của parabol và đường thẳng, liên hệ với nghiệm của phương trình bậc hai.',
  ],
  sections: [
    {
      heading: 'Giải phương trình trong cửa sổ CAS',
      blocks: [
        {
          type: 'p',
          text: 'Mở GeoGebra Classic, vào menu Hiển thị (View) và chọn CAS. Mỗi dòng của cửa sổ CAS là một ô nhập; gõ lệnh rồi nhấn Enter, kết quả hiện ngay bên dưới.',
        },
        {
          type: 'table',
          head: ['Lệnh', 'Ví dụ', 'Kết quả'],
          rows: [
            ['Solve(<phương trình>)', 'Solve(x^2 - 5x + 6 = 0)', '$\\{x = 2,\\ x = 3\\}$'],
            ['Solutions(<phương trình>)', 'Solutions(x^2 - 5x + 6 = 0)', '$\\{2,\\ 3\\}$'],
            [
              'NSolve(<phương trình>)',
              'NSolve(x^2 = 2)',
              '$\\{x \\approx -1{,}41,\\ x \\approx 1{,}41\\}$',
            ],
          ],
          caption: 'Solve cho nghiệm đúng, NSolve cho nghiệm gần đúng dạng số thập phân.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách gõ biểu thức',
          text: 'Luỹ thừa gõ bằng dấu ^ ($x^2$ gõ là x^2); phép nhân có thể bỏ dấu (3x, 2(x + 1)); phân số gõ bằng dấu / và nhớ đóng mở ngoặc: $\\dfrac{9}{x - 1}$ gõ là 9/(x - 1); căn bậc hai $\\sqrt{3}$ gõ là sqrt(3). Số thập phân trong GeoGebra dùng dấu chấm: $0{,}5$ gõ là 0.5.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đọc tập nghiệm',
          text: 'Kết quả được viết trong dấu ngoặc nhọn $\\{\\ \\}$. Nếu kết quả là $\\{\\}$ (tập rỗng) thì phương trình vô nghiệm. Với phương trình chứa ẩn ở mẫu, GeoGebra tự loại các giá trị làm mẫu bằng $0$, giống bước "đối chiếu điều kiện xác định" khi em giải tay.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn Solve(x + 9/(x - 1) = 7) cho $\\{x = 4\\}$: quy đồng khử mẫu được $x^2 - 8x + 16 = 0$, có nghiệm kép $x = 4$, thoả mãn điều kiện $x \\ne 1$.',
        },
      ],
    },
    {
      heading: 'Giải hệ hai phương trình bậc nhất hai ẩn',
      blocks: [
        {
          type: 'p',
          text: 'Đặt hai phương trình trong ngoặc nhọn, cách nhau bởi dấu phẩy, rồi ghi danh sách ẩn:',
        },
        {
          type: 'tex',
          tex: '\\texttt{Solve(\\{3x - 2y = 4,\\ 2x + y = 5\\},\\ \\{x,\\ y\\})} \\;\\to\\; \\{\\{x = 2,\\ y = 1\\}\\}',
        },
        {
          type: 'p',
          text: 'Kết quả $\\{\\{x = 2,\\ y = 1\\}\\}$ nghĩa là hệ có nghiệm duy nhất $(x; y) = (2; 1)$. Nếu hệ vô nghiệm, GeoGebra trả về $\\{\\}$; nếu hệ có vô số nghiệm, GeoGebra viết $y$ theo $x$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Luôn thử lại',
          text: 'Máy chỉ giải đúng phương trình em gõ. Gõ thiếu một dấu ngoặc, chẳng hạn 9/x - 1 thay cho 9/(x - 1), là được một phương trình khác. Hãy thay nghiệm vào phương trình ban đầu để kiểm tra.',
        },
      ],
    },
    {
      heading: 'Vẽ đồ thị hàm số $y = ax^2$ và tìm giao điểm',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Ở ô Nhập lệnh (cửa sổ Đại số), gõ y = 2x^2 rồi nhấn Enter: parabol $y = 2x^2$ hiện ra trong cửa sổ Hình học.',
            'Gõ tiếp y = -0.5x^2: parabol thứ hai, quay bề lõm xuống dưới.',
            'Gõ một đường thẳng, chẳng hạn y = x + 2. Dùng công cụ "Giao điểm của hai đối tượng" (hoặc lệnh Intersect) chọn parabol và đường thẳng để lấy giao điểm.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhắc lại về đồ thị $y = ax^2$',
          text: 'Đồ thị của hàm số $y = ax^2$ ($a \\ne 0$) là một parabol đỉnh $O$, nhận trục $Oy$ làm trục đối xứng. Nếu $a > 0$, parabol nằm phía trên trục hoành, $O$ là điểm thấp nhất; nếu $a < 0$, parabol nằm phía dưới trục hoành, $O$ là điểm cao nhất. $|a|$ càng lớn thì parabol càng "hẹp".',
        },
        {
          type: 'p',
          text: 'Hoành độ giao điểm của parabol $y = x^2$ và đường thẳng $y = x + 2$ là nghiệm của phương trình $x^2 = x + 2$, tức $x^2 - x - 2 = 0$, có hai nghiệm $x = -1$ và $x = 2$. Hai giao điểm là $(-1; 1)$ và $(2; 4)$: đồ thị cho ta "thấy" nghiệm của phương trình bậc hai.',
        },
        {
          type: 'p',
          text: 'Mô phỏng bên dưới làm như cửa sổ CAS và ô Nhập lệnh của GeoGebra, kèm các nhiệm vụ được đánh dấu khi em làm đúng.',
        },
      ],
    },
    {
      heading: 'Thực hành: giải và vẽ với GeoGebra',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: dùng GeoGebra giải một loạt phương trình, hệ phương trình, vẽ đồ thị và đối chiếu với lời giải tay của mình.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: máy tính hoặc máy tính bảng có GeoGebra Classic (hoặc trang geogebra.org/classic), vở nháp.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Giải tay rồi giải bằng lệnh Solve: a) $x^2 - 4x + 10 = 0$; b) $x + \\dfrac{9}{x - 1} = 7$; c) $x^2 - 2(\\sqrt{3} - 1)x - 2\\sqrt{3} = 0$; d) $\\dfrac{x + 1}{x - 1} - \\dfrac{x - 1}{x + 1} = \\dfrac{4}{x^2 - 1}$.',
            'Giải các hệ bằng lệnh Solve: a) $3x - 2y = 4$ và $2x + y = 5$; b) $3x + 2y = 0$ và $2x - 3y = 0$; c) $2x - y = 3$ và $-4x + 2y = 1$.',
            'Vẽ trên cùng một mặt phẳng toạ độ các parabol $y = x^2$, $y = 2x^2$, $y = \\dfrac{1}{2}x^2$, $y = -x^2$. Ghi nhận xét về hình dạng khi $a$ thay đổi.',
            'Vẽ $y = x^2$ và $y = x + 2$, lấy giao điểm, so sánh hoành độ với kết quả Solve(x^2 = x + 2).',
            'Chụp màn hình các kết quả và chép vào vở.',
          ],
        },
        {
          type: 'table',
          head: ['Bài', 'Kết quả giải tay', 'Kết quả GeoGebra', 'Khớp không?'],
          rows: [
            ['Phương trình a)', '(em ghi)', '(em ghi)', '(em ghi)'],
            ['Phương trình d)', '(em ghi)', '(em ghi)', '(em ghi)'],
            ['Hệ a)', '(em ghi)', '(em ghi)', '(em ghi)'],
            ['Giao điểm', '(em ghi)', '(em ghi)', '(em ghi)'],
          ],
          caption: 'Mẫu bảng đối chiếu.',
        },
        {
          type: 'p',
          text: 'Báo cáo: nộp bảng đối chiếu và các ảnh chụp màn hình, giải thích vì sao phương trình d) vô nghiệm dù khi khử mẫu vẫn có nghiệm, và nêu nhận xét về các parabol ở bước 3.',
        },
      ],
    },
  ],
  explore: {
    title: 'GeoGebra mô phỏng: CAS và vẽ đồ thị',
    instruction:
      'Ở "Cửa sổ CAS", gõ lệnh Solve, Solutions hoặc NSolve rồi bấm "Tính"; mỗi nhiệm vụ được đánh dấu khi em giải đúng phương trình hoặc hệ của nó (viết theo cách nào cũng được). Ở "Vẽ đồ thị", gõ hai hàm số dạng y = ... để thấy đồ thị và giao điểm của chúng.',
  },
  examples: [
    {
      problem:
        'Dùng GeoGebra giải phương trình $\\dfrac{x + 1}{x - 1} - \\dfrac{x - 1}{x + 1} = \\dfrac{4}{x^2 - 1}$ và giải thích kết quả.',
      steps: [
        'Gõ Solve((x + 1)/(x - 1) - (x - 1)/(x + 1) = 4/(x^2 - 1)), GeoGebra trả về $\\{\\}$.',
        'Kiểm tra bằng tay: điều kiện xác định $x \\ne 1$, $x \\ne -1$. Quy đồng khử mẫu: $(x + 1)^2 - (x - 1)^2 = 4$, tức $4x = 4$, nên $x = 1$.',
        '$x = 1$ không thoả mãn điều kiện xác định nên bị loại.',
      ],
      answer: 'Phương trình vô nghiệm, đúng với kết quả $\\{\\}$ của GeoGebra.',
    },
    {
      problem:
        'Giải hệ $\\begin{cases} 3x - 2y = 4 \\\\ 2x + y = 5 \\end{cases}$ bằng GeoGebra rồi kiểm tra lại.',
      steps: [
        'Gõ Solve({3x - 2y = 4, 2x + y = 5}, {x, y}), được $\\{\\{x = 2,\\ y = 1\\}\\}$.',
        'Thử lại: $3 \\cdot 2 - 2 \\cdot 1 = 4$ và $2 \\cdot 2 + 1 = 5$.',
      ],
      answer: 'Hệ có nghiệm duy nhất $(x; y) = (2; 1)$.',
    },
    {
      problem:
        'Vẽ parabol $y = x^2$ và đường thẳng $y = -x + 6$ bằng GeoGebra. Tìm toạ độ giao điểm.',
      steps: [
        'Gõ y = x^2 và y = -x + 6 vào ô Nhập lệnh.',
        'Hoành độ giao điểm là nghiệm của $x^2 = -x + 6 \\Leftrightarrow x^2 + x - 6 = 0$, có $\\Delta = 1 + 24 = 25$, nên $x = 2$ hoặc $x = -3$.',
        'Với $x = 2$ thì $y = 4$; với $x = -3$ thì $y = 9$. Công cụ "Giao điểm của hai đối tượng" cho đúng hai điểm này.',
      ],
      answer: 'Hai giao điểm là $(2; 4)$ và $(-3; 9)$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong cửa sổ CAS của GeoGebra, lệnh nào giải phương trình $x^2 - 3x - 4 = 0$?',
      options: [
        'Solve(x^2 - 3x - 4 = 0)',
        'Solve(x2 - 3x - 4)',
        'Graph(x^2 - 3x - 4 = 0)',
        'x^2 - 3x - 4',
      ],
      answer: 0,
      hints: [
        'Lệnh giải là Solve, đối số là cả phương trình (có dấu =).',
        'Luỹ thừa gõ bằng dấu ^.',
      ],
      solution: 'Gõ Solve(x^2 - 3x - 4 = 0); GeoGebra trả về $\\{x = -1,\\ x = 4\\}$.',
    },
    {
      type: 'choice',
      prompt: 'GeoGebra trả về $\\{\\}$ cho lệnh Solve một phương trình. Điều đó có nghĩa là gì?',
      options: [
        'Gõ sai lệnh',
        'Phương trình vô nghiệm',
        'Phương trình có nghiệm $x = 0$',
        'Phương trình có vô số nghiệm',
      ],
      answer: 1,
      hints: ['$\\{\\}$ là tập hợp không có phần tử nào.'],
      solution:
        'Tập nghiệm rỗng: phương trình vô nghiệm. (Gõ sai lệnh thì GeoGebra báo lỗi, không trả về tập hợp.)',
    },
    {
      type: 'number',
      prompt: 'Lệnh Solve(x^2 - 7x + 12 = 0) cho hai nghiệm. Nghiệm lớn hơn là bao nhiêu?',
      answer: 4,
      hints: ['Tìm hai số có tổng $7$ và tích $12$.'],
      solution:
        '$\\Delta = 49 - 48 = 1$, nên $x = \\dfrac{7 \\pm 1}{2}$: $x = 3$ hoặc $x = 4$. Nghiệm lớn hơn là $4$.',
    },
    {
      type: 'choice',
      prompt: 'Cách gõ nào đúng cho phương trình $\\dfrac{3}{x + 2} = x$?',
      options: ['3/x + 2 = x', '3/(x + 2) = x', '(3/x) + 2 = x', '3:x + 2 = x'],
      answer: 1,
      hints: ['Cả mẫu $x + 2$ phải nằm trong ngoặc.'],
      solution:
        'Gõ 3/(x + 2) = x. Cách 3/x + 2 = x là phương trình $\\dfrac{3}{x} + 2 = x$, khác hẳn.',
    },
    {
      type: 'number',
      prompt:
        'Lệnh Solve({2x + y = 7, x - y = 2}, {x, y}) cho nghiệm $(x; y)$. Giá trị của $x$ là bao nhiêu?',
      answer: 3,
      hints: ['Cộng vế theo vế hai phương trình để khử $y$.'],
      solution:
        'Cộng hai phương trình: $3x = 9$, nên $x = 3$, rồi $y = 3 - 2 = 1$. GeoGebra trả về $\\{\\{x = 3,\\ y = 1\\}\\}$.',
    },
    {
      type: 'choice',
      prompt: 'Lệnh Solve({x - 2y = 1, 2x - 4y = 5}, {x, y}) cho kết quả nào?',
      options: [
        '$\\{\\{x = 1,\\ y = 0\\}\\}$',
        '$\\{\\}$, vì hệ vô nghiệm',
        'Vô số nghiệm',
        '$\\{\\{x = 5,\\ y = 2\\}\\}$',
      ],
      answer: 1,
      hints: ['Nhân phương trình thứ nhất với $2$ rồi so sánh với phương trình thứ hai.'],
      solution:
        'Nhân phương trình đầu với $2$: $2x - 4y = 2$, mâu thuẫn với $2x - 4y = 5$. Hệ vô nghiệm, GeoGebra trả về $\\{\\}$.',
    },
    {
      type: 'number',
      prompt: 'Điểm thuộc parabol $y = 2x^2$ có hoành độ $x = -3$ thì có tung độ bằng bao nhiêu?',
      answer: 18,
      hints: ['Thay $x = -3$ vào $y = 2x^2$.'],
      solution: '$y = 2 \\cdot (-3)^2 = 2 \\cdot 9 = 18$.',
    },
    {
      type: 'multi',
      prompt: 'Vẽ parabol $y = -0{,}5x^2$ bằng GeoGebra. Những nhận xét nào đúng?',
      options: [
        'Parabol nằm phía dưới trục hoành, đỉnh là gốc toạ độ $O$',
        'Parabol nhận trục $Oy$ làm trục đối xứng',
        'Điểm $(2; -2)$ thuộc parabol',
        'Parabol "hẹp" hơn parabol $y = 2x^2$',
      ],
      answers: [0, 1, 2],
      hints: ['$a = -0{,}5 < 0$.', 'So sánh $|a|$ của hai hàm số.'],
      solution:
        'Vì $a < 0$ nên parabol nằm dưới trục hoành, đỉnh $O$, đối xứng qua $Oy$; với $x = 2$ thì $y = -0{,}5 \\cdot 4 = -2$. Vì $|-0{,}5| < |2|$ nên nó "rộng" hơn parabol $y = 2x^2$, không hẹp hơn.',
    },
    {
      type: 'number',
      prompt:
        'Parabol $y = x^2$ và đường thẳng $y = -x + 6$ cắt nhau tại hai điểm. Hoành độ âm của giao điểm là bao nhiêu?',
      answer: -3,
      hints: ['Giải $x^2 = -x + 6$.', '$x^2 + x - 6 = 0$ có $\\Delta = 25$.'],
      solution:
        '$x^2 + x - 6 = 0 \\Leftrightarrow x = 2$ hoặc $x = -3$. Hoành độ âm là $-3$ (điểm $(-3; 9)$).',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các bước tìm giao điểm của parabol $y = x^2$ và đường thẳng $y = x + 2$ bằng GeoGebra.',
      items: [
        'Gõ lần lượt y = x^2 và y = x + 2 vào ô Nhập lệnh để vẽ hai đồ thị.',
        'Mở GeoGebra Classic, hiện cửa sổ Đại số và Hình học.',
        'Đọc toạ độ hai giao điểm trong cửa sổ Đại số và so sánh với nghiệm của $x^2 = x + 2$.',
        'Chọn công cụ "Giao điểm của hai đối tượng" rồi chọn hai đồ thị.',
      ],
      answer: [1, 0, 3, 2],
      hints: ['Phải vẽ xong cả hai đồ thị mới lấy giao điểm, và có giao điểm rồi mới đọc toạ độ.'],
      solution:
        'Mở GeoGebra, gõ y = x^2 và y = x + 2, dùng công cụ giao điểm, rồi đọc toạ độ: được $(-1; 1)$ và $(2; 4)$, đúng với hai nghiệm $x = -1$, $x = 2$.',
    },
  ],
  takeaways: [
    'Trong cửa sổ CAS: Solve(<phương trình>) cho nghiệm đúng, NSolve cho nghiệm gần đúng; $\\{\\}$ nghĩa là vô nghiệm.',
    'Giải hệ: Solve({phương trình 1, phương trình 2}, {x, y}).',
    'Gõ cẩn thận: luỹ thừa bằng ^, mẫu số trong ngoặc, căn bậc hai bằng sqrt, số thập phân bằng dấu chấm.',
    'Gõ y = ax^2 để vẽ parabol; hoành độ giao điểm của hai đồ thị là nghiệm của phương trình hoành độ giao điểm.',
  ],
};
