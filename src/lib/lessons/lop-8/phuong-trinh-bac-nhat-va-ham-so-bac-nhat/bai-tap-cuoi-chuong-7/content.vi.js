/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương 7: hệ thống hoá phương trình bậc nhất một ẩn, giải bài toán bằng cách lập phương trình, hàm số, hàm số bậc nhất, đồ thị và hệ số góc, kèm bài kiểm tra có bản đồ kĩ năng theo từng bài.',
  intro:
    'Chương 7 cho em hai công cụ gắn bó với nhau: phương trình bậc nhất một ẩn $ax + b = 0$ và hàm số bậc nhất $y = ax + b$. Tìm giao điểm của đồ thị với trục hoành, tìm tham số $m$ hay giao điểm của hai đường thẳng đều quy về giải một phương trình bậc nhất. Bài này hệ thống lại toàn chương, luyện các dạng trắc nghiệm và tự luận, vận dụng vào bài toán thuế, giảm giá, chuyển động, rồi cho em một bài kiểm tra với bản đồ kĩ năng tô màu từng bài.',
  objectives: [
    'Hệ thống hoá cách giải phương trình bậc nhất một ẩn và phương trình đưa được về dạng $ax + b = 0$.',
    'Giải bài toán thực tế bằng cách lập phương trình.',
    'Hệ thống hoá khái niệm hàm số, đồ thị, hàm số bậc nhất, hệ số góc và vị trí tương đối của hai đường thẳng.',
    'Kết hợp phương trình và đồ thị để tìm tham số, giao điểm và diện tích hình tạo bởi các đường thẳng.',
  ],
  sections: [
    {
      heading: 'Phương trình bậc nhất một ẩn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phương trình bậc nhất một ẩn',
          text: 'Phương trình dạng $ax + b = 0$, với $a$, $b$ là hai số đã cho và $a \\ne 0$, được gọi là phương trình bậc nhất một ẩn. Phương trình này có nghiệm duy nhất $x = -\\dfrac{b}{a}$.',
        },
        {
          type: 'table',
          caption: 'Các kiến thức của Bài 25 và Bài 26',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Quy tắc chuyển vế',
              'Chuyển một hạng tử từ vế này sang vế kia thì đổi dấu hạng tử đó',
            ],
            ['Quy tắc nhân', 'Nhân hoặc chia cả hai vế với cùng một số khác $0$'],
            [
              'Phương trình đưa về $ax + b = 0$',
              'Khử mẫu, bỏ ngoặc, chuyển vế, thu gọn, rồi chia cho hệ số của $x$',
            ],
            [
              'Giải bài toán bằng cách lập phương trình',
              'Chọn ẩn và điều kiện; biểu diễn các đại lượng theo ẩn; lập phương trình; giải; kiểm tra điều kiện và trả lời',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Hàm số bậc nhất và đồ thị',
      blocks: [
        {
          type: 'table',
          caption: 'Các kiến thức của Bài 27, Bài 28 và Bài 29',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            ['Hàm số', 'Mỗi giá trị của $x$ cho đúng một giá trị của $y$; viết $y = f(x)$'],
            ['Đồ thị của $y = f(x)$', 'Tập hợp các điểm $(x; f(x))$ trên mặt phẳng toạ độ $Oxy$'],
            [
              'Hàm số bậc nhất',
              '$y = ax + b$ với $a \\ne 0$; đồ thị là đường thẳng cắt trục tung tại $(0; b)$',
            ],
            ['Hệ số góc', '$a$; $a > 0$ thì góc tạo với $Ox$ là góc nhọn, $a < 0$ thì góc tù'],
            ['Song song', "$a = a'$ và $b \\ne b'$"],
            ['Trùng nhau', "$a = a'$ và $b = b'$"],
            ['Cắt nhau', "$a \\ne a'$; hoành độ giao điểm là nghiệm của $ax + b = a'x + b'$"],
          ],
        },
        {
          type: 'p',
          text: 'Hai phần của chương gặp nhau ở đây: hoành độ giao điểm của đường thẳng $y = ax + b$ với trục hoành chính là nghiệm của phương trình $ax + b = 0$.',
        },
      ],
    },
    {
      heading: 'Những lỗi hay gặp',
      blocks: [
        {
          type: 'list',
          items: [
            'Chuyển vế mà không đổi dấu: $3x + 5 = x - 1$ cho $3x - x = -1 - 5$, không phải $-1 + 5$.',
            'Bỏ ngoặc có dấu trừ phía trước mà chỉ đổi dấu hạng tử đầu: $-(x - 2) = -x + 2$.',
            'Khử mẫu nhưng quên nhân hạng tử không có mẫu với mẫu chung.',
            'Đọc nhầm hệ số góc khi hàm số chưa viết về dạng $y = ax + b$: $y = 4 - 3x$ có hệ số góc $-3$.',
            "Tìm được $m$ nhưng quên kiểm tra điều kiện $a \\ne 0$, hoặc quên điều kiện $b \\ne b'$ khi hai đường thẳng phải song song.",
            'Quên kiểm tra nghiệm với điều kiện của ẩn trong bài toán thực tế (số người là số tự nhiên, vận tốc dương, ...).',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Bài kiểm tra cuối chương',
          text: 'Bài kiểm tra bên dưới có $10$ câu tự sinh, hai câu cho mỗi bài từ Bài 25 đến Bài 29. Bản đồ kĩ năng tô màu từng bài theo số câu em làm đúng ngay lần đầu, để em biết cần ôn lại bài nào. Đáp số là số nguyên, phân số (gõ dạng $-5/2$) hoặc số thập phân (gõ dấu phẩy, ví dụ $1{,}5$).',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương 7',
    instruction:
      'Làm lần lượt các câu, nhập đáp số rồi bấm "Kiểm tra". Sai lần đầu em được gợi ý và làm lại; sai lần nữa thì lời giải hiện ra. Xem bản đồ kĩ năng để biết bài nào cần ôn, rồi bấm "Làm bộ đề mới" để luyện thêm.',
  },
  examples: [
    {
      problem:
        'Cho hàm số bậc nhất $y = (m + 2)x + 3$. a) Tìm $m$ để đồ thị của hàm số song song với đường thẳng $y = -x$. b) Vẽ đồ thị của hàm số với $m$ vừa tìm. c) Gọi $A$ là giao điểm của đồ thị ở câu b với đường thẳng $y = x + 1$, $B$ là giao điểm của đường thẳng $y = x + 1$ với trục hoành. Tính diện tích tam giác $OAB$.',
      steps: [
        'Điều kiện để hàm số là bậc nhất: $m + 2 \\ne 0$, tức là $m \\ne -2$.',
        'a) Song song với $y = -x$: $m + 2 = -1$ và $3 \\ne 0$, nên $m = -3$ (thoả mãn).',
        'b) Với $m = -3$ ta có $y = -x + 3$: đường thẳng đi qua $(0; 3)$ và $(3; 0)$.',
        'c) Hoành độ của $A$: $-x + 3 = x + 1$, nên $x = 1$, $y = 2$; vậy $A(1; 2)$.',
        'Cho $y = 0$ trong $y = x + 1$: $x = -1$, nên $B(-1; 0)$ và $OB = 1$.',
        'Đường cao từ $A$ xuống trục hoành bằng tung độ của $A$, là $2$. Diện tích: $S = \\dfrac{1}{2} \\cdot 1 \\cdot 2 = 1$.',
      ],
      answer:
        'a) $m = -3$; b) đường thẳng qua $(0; 3)$ và $(3; 0)$; c) $S_{OAB} = 1$ (đơn vị diện tích).',
    },
    {
      problem:
        'Lúc $8$ giờ sáng, hai ô tô cùng khởi hành từ Hà Nội đi Hạ Long trên cùng một con đường. Vận tốc xe thứ nhất lớn hơn vận tốc xe thứ hai $5$ km/h. Xe thứ nhất đến Hạ Long lúc $10$ giờ $45$ phút, sớm hơn xe thứ hai $15$ phút. Tính vận tốc mỗi xe và quãng đường từ Hà Nội đến Hạ Long.',
      steps: [
        'Thời gian xe thứ nhất đi: $10$ giờ $45$ phút $- 8$ giờ $= 2$ giờ $45$ phút $= 2{,}75$ giờ. Xe thứ hai đi lâu hơn $15$ phút, tức là $3$ giờ.',
        'Gọi vận tốc xe thứ hai là $x$ (km/h), $x > 0$; vận tốc xe thứ nhất là $x + 5$ (km/h).',
        'Hai xe đi cùng một quãng đường: $2{,}75(x + 5) = 3x$.',
        '$2{,}75x + 13{,}75 = 3x \\Leftrightarrow 0{,}25x = 13{,}75 \\Leftrightarrow x = 55$ (thoả mãn).',
        'Quãng đường: $3 \\cdot 55 = 165$ (km).',
      ],
      answer: 'Xe thứ hai đi $55$ km/h, xe thứ nhất đi $60$ km/h; quãng đường dài $165$ km.',
    },
    {
      problem:
        'Thuế thu nhập cá nhân của một người được tính theo công thức $T(x) = 0{,}1x - 3$ (triệu đồng), trong đó $x$ (triệu đồng) là thu nhập tính thuế, $60 < x \\le 120$. a) Tính số thuế khi thu nhập tính thuế là $100$ triệu đồng. b) Người đó phải nộp $8$ triệu đồng tiền thuế. Thu nhập tính thuế của người đó là bao nhiêu?',
      steps: [
        'a) $T(100) = 0{,}1 \\cdot 100 - 3 = 7$ (triệu đồng).',
        'b) Giải $0{,}1x - 3 = 8$: $0{,}1x = 11$, nên $x = 110$, thoả mãn $60 < x \\le 120$.',
      ],
      answer: 'a) $7$ triệu đồng; b) $110$ triệu đồng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Phương trình nào là phương trình bậc nhất một ẩn?',
      options: ['$0x + 2 = 0$', '$2x + 1 = 2x + 2$', '$2x^2 + 1 = 0$', '$3x - 1 = 0$'],
      answer: 3,
      hints: ['Phương trình bậc nhất một ẩn có dạng $ax + b = 0$ với $a \\ne 0$.'],
      solution:
        '$3x - 1 = 0$ có $a = 3 \\ne 0$. Phương trình $0x + 2 = 0$ có $a = 0$; $2x + 1 = 2x + 2$ thu gọn còn $0x - 1 = 0$; $2x^2 + 1 = 0$ có $x^2$.',
    },
    {
      type: 'choice',
      prompt: 'Nghiệm của phương trình $3(x + 1) - (x - 2) = 7 - 2x$ là',
      options: ['$x = 0$', '$x = \\dfrac{1}{2}$', 'Phương trình vô nghiệm', 'Mọi số đều là nghiệm'],
      answer: 1,
      hints: ['Bỏ ngoặc, chú ý dấu trừ trước ngoặc thứ hai.', 'Vế trái thu gọn thành $2x + 5$.'],
      solution:
        '$3x + 3 - x + 2 = 7 - 2x \\Leftrightarrow 2x + 5 = 7 - 2x \\Leftrightarrow 4x = 2 \\Leftrightarrow x = \\dfrac{1}{2}$.',
    },
    {
      type: 'choice',
      prompt: 'Hàm số nào là hàm số bậc nhất?',
      options: ['$y = 0x + 3$', '$y = 3x^2 + 2$', '$y = 2x$', '$y = 0$'],
      answer: 2,
      hints: ['Hàm số bậc nhất: $y = ax + b$ với $a \\ne 0$; $b$ có thể bằng $0$.'],
      solution:
        '$y = 2x$ có $a = 2 \\ne 0$, $b = 0$. Hai hàm số $y = 0x + 3$ và $y = 0$ có $a = 0$; $y = 3x^2 + 2$ có $x^2$.',
    },
    {
      type: 'choice',
      prompt: 'Đường thẳng có hệ số góc bằng $2$ và đi qua điểm $(-1; 2)$ là',
      options: ['$y = 2x + 2$', '$y = 2x - 1$', '$y = -x + 2$', '$y = 2x + 4$'],
      answer: 3,
      hints: ['Đường thẳng có dạng $y = 2x + b$.', 'Thay $x = -1$, $y = 2$ để tìm $b$.'],
      solution: '$2 = 2 \\cdot (-1) + b \\Leftrightarrow b = 4$. Đường thẳng là $y = 2x + 4$.',
    },
    {
      type: 'choice',
      prompt:
        'Với giá trị nào của $m$ thì đường thẳng $y = (m + 1)x + 2$ song song với đường thẳng $y = -2x$?',
      options: ['$m = -3$', '$m = -2$', '$m = 2$', '$m = 1$'],
      answer: 0,
      hints: ['Hai đường thẳng song song có hệ số góc bằng nhau và hệ số tự do khác nhau.'],
      solution:
        '$m + 1 = -2 \\Leftrightarrow m = -3$; hệ số tự do $2 \\ne 0$ nên hai đường thẳng song song.',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $5(x - 1) - (6 - 2x) = 8x - 3$. Nhập nghiệm $x$.',
      answer: -8,
      hints: ['Bỏ ngoặc: $-(6 - 2x) = -6 + 2x$.', 'Vế trái thu gọn thành $7x - 11$.'],
      solution:
        '$5x - 5 - 6 + 2x = 8x - 3 \\Leftrightarrow 7x - 11 = 8x - 3 \\Leftrightarrow -x = 8 \\Leftrightarrow x = -8$.',
    },
    {
      type: 'fraction',
      prompt:
        'Giải phương trình $\\dfrac{2x - 1}{3} - \\dfrac{5 - 3x}{2} = \\dfrac{x + 7}{4}$. Nhập nghiệm dưới dạng phân số.',
      answer: [55, 23],
      hints: ['Nhân hai vế với mẫu chung $12$.', '$4(2x - 1) - 6(5 - 3x) = 3(x + 7)$.'],
      solution:
        '$4(2x - 1) - 6(5 - 3x) = 3(x + 7) \\Leftrightarrow 8x - 4 - 30 + 18x = 3x + 21 \\Leftrightarrow 26x - 34 = 3x + 21 \\Leftrightarrow 23x = 55 \\Leftrightarrow x = \\dfrac{55}{23}$.',
    },
    {
      type: 'number',
      prompt:
        'Một hiệu sách giảm giá $20\\%$ cho một cuốn sách. Bạn An có thẻ khách hàng thân thiết nên được giảm thêm $10\\%$ trên giá đã giảm, và chỉ phải trả $36$ nghìn đồng. Giá ban đầu của cuốn sách là bao nhiêu nghìn đồng?',
      answer: 50,
      unit: 'nghìn đồng',
      hints: [
        'Gọi giá ban đầu là $x$ (nghìn đồng); sau lần giảm thứ nhất còn $0{,}8x$.',
        'Sau lần giảm thứ hai còn $0{,}9 \\cdot 0{,}8x = 0{,}72x$.',
      ],
      solution:
        'Gọi giá ban đầu là $x$ (nghìn đồng), $x > 0$. Ta có $0{,}72x = 36 \\Leftrightarrow x = 50$. Giá ban đầu là $50$ nghìn đồng.',
    },
    {
      type: 'number',
      prompt:
        'Thuế thu nhập cá nhân tính theo $T(x) = 0{,}1x - 3$ (triệu đồng) với thu nhập tính thuế $x$ (triệu đồng), $60 < x \\le 120$. Thu nhập tính thuế là $90$ triệu đồng thì phải nộp bao nhiêu triệu đồng tiền thuế?',
      answer: 6,
      unit: 'triệu đồng',
      hints: ['Tính $T(90)$.'],
      solution: '$T(90) = 0{,}1 \\cdot 90 - 3 = 9 - 3 = 6$ (triệu đồng).',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng về đường thẳng $d\\colon y = -2x + 4$.',
      options: [
        '$d$ cắt trục tung tại $(0; 4)$',
        '$d$ cắt trục hoành tại $(2; 0)$',
        '$d$ đi lên từ trái sang phải',
        '$d$ song song với đường thẳng $y = -2x$',
        '$d$ có hệ số góc bằng $4$',
      ],
      answers: [0, 1, 3],
      hints: [
        'Hệ số góc là hệ số của $x$; hệ số tự do cho giao điểm với trục tung.',
        'Giao điểm với trục hoành: giải $-2x + 4 = 0$.',
      ],
      solution:
        'Cho $x = 0$ được $(0; 4)$; cho $y = 0$ được $x = 2$. Hệ số góc $-2 < 0$ nên $d$ đi xuống. $d$ và $y = -2x$ cùng hệ số góc, khác hệ số tự do ($4 \\ne 0$) nên song song.',
    },
    {
      type: 'number',
      prompt:
        'Cho đường thẳng $y = -x + 3$ và $y = x + 1$ cắt nhau tại $A$; đường thẳng $y = -x + 3$ cắt trục hoành tại $C$. Tính diện tích tam giác $OAC$ (đơn vị diện tích).',
      answer: 3,
      hints: [
        'Tìm $A$ bằng cách giải $-x + 3 = x + 1$.',
        '$C(3; 0)$, nên $OC = 3$; đường cao từ $A$ bằng tung độ của $A$.',
      ],
      solution:
        '$-x + 3 = x + 1 \\Leftrightarrow x = 1$, $y = 2$, nên $A(1; 2)$. Cho $y = 0$: $C(3; 0)$, $OC = 3$. Diện tích $S = \\dfrac{1}{2} \\cdot 3 \\cdot 2 = 3$.',
    },
  ],
  takeaways: [
    'Phương trình bậc nhất một ẩn $ax + b = 0$ ($a \\ne 0$) có nghiệm duy nhất $x = -\\dfrac{b}{a}$; phương trình có ngoặc, có mẫu được đưa về dạng này.',
    'Giải bài toán bằng cách lập phương trình: chọn ẩn và điều kiện, lập phương trình, giải, kiểm tra điều kiện rồi trả lời.',
    'Đồ thị của $y = ax + b$ ($a \\ne 0$) là đường thẳng có hệ số góc $a$, cắt trục tung tại $(0; b)$.',
    "So sánh $a$, $a'$ và $b$, $b'$ để biết hai đường thẳng song song, trùng nhau hay cắt nhau; giao điểm tìm từ phương trình $ax + b = a'x + b'$.",
  ],
};
