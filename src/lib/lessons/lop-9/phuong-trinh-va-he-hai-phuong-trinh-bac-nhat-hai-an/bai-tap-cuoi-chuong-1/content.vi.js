/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương 1: hệ thống hoá phương trình và hệ hai phương trình bậc nhất hai ẩn, cách giải hệ và giải bài toán bằng cách lập hệ phương trình.',
  intro:
    'Chương 1 cho em một công cụ mới: hệ hai phương trình bậc nhất hai ẩn. Em đã biết nghiệm của phương trình và của hệ là gì, nhìn chúng trên mặt phẳng toạ độ, giải hệ bằng phương pháp thế và phương pháp cộng đại số, rồi dùng hệ để giải bài toán thực tế. Bài ôn tập này gồm câu trắc nghiệm, bài tự luận và bài toán thực tế, cùng một bộ đề tự sinh có bản đồ kĩ năng chỉ ra phần cần ôn lại.',
  objectives: [
    'Nhận biết phương trình, hệ phương trình bậc nhất hai ẩn và kiểm tra nghiệm.',
    'Giải hệ bằng phương pháp thế, phương pháp cộng đại số; nhận biết hệ vô nghiệm, vô số nghiệm.',
    'Giải bài toán thực tế bằng cách lập hệ phương trình.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức chương 1',
      blocks: [
        {
          type: 'table',
          head: ['Bài', 'Kiến thức chính', 'Ví dụ'],
          rows: [
            [
              'Bài 1',
              'Phương trình $ax + by = c$ ($a \\ne 0$ hoặc $b \\ne 0$) có vô số nghiệm; tập nghiệm là một đường thẳng. Nghiệm của hệ thoả mãn cả hai phương trình.',
              '$(1; 2)$ là nghiệm của hệ $2x - y = 0$, $x + y = 3$',
            ],
            [
              'Bài 2',
              'Phương pháp thế; phương pháp cộng đại số; giải bằng máy tính cầm tay.',
              '$x + y = 5$, $x - y = 1$ cho $2x = 6$, nghiệm $(3; 2)$',
            ],
            [
              'Bài 3',
              'Chọn ẩn, đặt điều kiện, lập hệ, giải hệ, kiểm tra điều kiện và trả lời.',
              'Gà và chó: $x + y = 36$, $2x + 4y = 100$',
            ],
          ],
        },
        {
          type: 'table',
          head: ['Hai đường thẳng', 'Khi khử một ẩn', 'Số nghiệm của hệ'],
          rows: [
            ['Cắt nhau', 'được $kx = m$ với $k \\ne 0$', 'Nghiệm duy nhất'],
            ['Song song', 'được $0x = m$ với $m \\ne 0$', 'Vô nghiệm'],
            ['Trùng nhau', 'được $0x = 0$', 'Vô số nghiệm'],
          ],
        },
      ],
    },
    {
      heading: 'Những lỗi hay gặp',
      blocks: [
        {
          type: 'list',
          items: [
            'Chỉ thử nghiệm vào một phương trình của hệ.',
            'Quên đổi dấu hằng số khi trừ từng vế hai phương trình.',
            'Nhân một phương trình với một số nhưng quên nhân vế phải.',
            'Không đặt điều kiện cho ẩn, hoặc nhận cả nghiệm không thoả mãn điều kiện (số người là số thập phân, vận tốc âm).',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề tự sinh có $15$ câu, trộn đều từ ba bài của chương. Bản đồ kĩ năng tô xanh phần em làm vững, vàng hoặc đỏ phần cần ôn lại. Mọi đáp số là số nguyên.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề ôn tập chương 1',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Sai lần đầu, em xem gợi ý và làm lại; sai lần nữa thì lời giải hiện ra. Cuối bộ đề, bản đồ kĩ năng chỉ ra bài cần ôn lại.',
  },
  examples: [
    {
      problem: 'Giải hệ phương trình $\\begin{cases} 4x - 3y = 6 \\\\ 2x + y = 8 \\end{cases}$.',
      steps: [
        'Từ phương trình thứ hai: $y = 8 - 2x$.',
        'Thế vào phương trình thứ nhất: $4x - 3(8 - 2x) = 6$, tức $10x - 24 = 6$, nên $x = 3$.',
        'Thay lại: $y = 8 - 6 = 2$. Thử lại: $12 - 6 = 6$ và $6 + 2 = 8$.',
      ],
      answer: 'Hệ có nghiệm duy nhất $(3; 2)$.',
    },
    {
      problem:
        'Hai ngăn của một giá sách có tất cả $450$ quyển. Nếu chuyển $50$ quyển từ ngăn thứ nhất sang ngăn thứ hai thì số sách ở ngăn thứ hai bằng $\\dfrac{4}{5}$ số sách ở ngăn thứ nhất. Tính số sách lúc đầu ở mỗi ngăn.',
      steps: [
        'Gọi $x$, $y$ là số sách lúc đầu ở ngăn thứ nhất và ngăn thứ hai ($x, y \\in \\mathbb{N}$, $x > 50$).',
        'Tổng số sách: $x + y = 450$. Sau khi chuyển: $y + 50 = \\dfrac{4}{5}(x - 50)$, tức $4x - 5y = 450$.',
        'Thế $y = 450 - x$: $4x - 2\\,250 + 5x = 450$, nên $9x = 2\\,700$, $x = 300$; $y = 150$.',
        'Thử lại: $300 - 50 = 250$ và $150 + 50 = 200 = \\dfrac{4}{5} \\cdot 250$. Thoả mãn điều kiện.',
      ],
      answer: 'Lúc đầu ngăn thứ nhất có $300$ quyển, ngăn thứ hai có $150$ quyển.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Phương trình nào là phương trình bậc nhất hai ẩn?',
      options: ['$x^2 - y = 1$', '$0x + 0y = 5$', '$x - 3y = 0$', '$xy = 2$'],
      answer: 2,
      hints: ['Cần dạng $ax + by = c$ với $a \\ne 0$ hoặc $b \\ne 0$.'],
      solution:
        '$x - 3y = 0$ có $a = 1$, $b = -3$, $c = 0$. $0x + 0y = 5$ có $a = b = 0$ nên không phải; $x^2 - y = 1$ và $xy = 2$ không có dạng $ax + by = c$.',
    },
    {
      type: 'choice',
      prompt: 'Cặp số nào là nghiệm của phương trình $2x + y = 1$?',
      options: ['$(1; -1)$', '$(1; 1)$', '$(0; -1)$', '$(-1; 1)$'],
      answer: 0,
      hints: ['Thay từng cặp số vào vế trái $2x + y$.'],
      solution: '$2 \\cdot 1 + (-1) = 1$, đúng. Các cặp khác cho $3$, $-1$, $-1$.',
    },
    {
      type: 'choice',
      prompt: 'Nghiệm của hệ $\\begin{cases} 2x + y = 5 \\\\ x - y = 1 \\end{cases}$ là',
      options: ['$(2; 1)$', '$(1; 2)$', '$(3; -1)$', '$(1; 3)$'],
      answer: 0,
      hints: ['Cộng từng vế hai phương trình để khử $y$.'],
      solution:
        'Cộng từng vế: $3x = 6$, $x = 2$; $y = x - 1 = 1$. Lưu ý $(3; -1)$ và $(1; 3)$ chỉ thoả mãn phương trình thứ nhất.',
    },
    {
      type: 'choice',
      prompt: 'Hệ $\\begin{cases} x + 2y = 1 \\\\ 2x + 4y = 3 \\end{cases}$',
      options: ['có nghiệm duy nhất', 'vô nghiệm', 'có vô số nghiệm', 'có đúng hai nghiệm'],
      answer: 1,
      hints: ['Nhân phương trình thứ nhất với $2$ rồi so sánh với phương trình thứ hai.'],
      solution:
        'Nhân phương trình thứ nhất với $2$: $2x + 4y = 2$. Trừ từng vế cho phương trình thứ hai: $0x + 0y = -1$, vô lí. Hệ vô nghiệm (hai đường thẳng song song).',
    },
    {
      type: 'choice',
      prompt:
        'Với giá trị nào của $m$ thì hệ $\\begin{cases} mx + 2y = 1 \\\\ 3x + y = 4 \\end{cases}$ vô nghiệm?',
      options: ['$m = 6$', '$m = 3$', '$m = -6$', '$m = 2$'],
      answer: 0,
      hints: [
        "Hệ vô nghiệm thì trước hết $ab' - a'b = 0$.",
        'Nhân phương trình thứ hai với $2$ rồi so sánh hệ số của $x$.',
      ],
      solution:
        'Cần $m \\cdot 1 - 3 \\cdot 2 = 0$, tức $m = 6$. Khi đó hệ là $6x + 2y = 1$ và $6x + 2y = 8$, mâu thuẫn, nên hệ vô nghiệm.',
    },
    {
      type: 'number',
      prompt:
        'Giải hệ $\\begin{cases} 3x + 2y = 7 \\\\ 2x - 3y = -4 \\end{cases}$. Giá trị của $y$ là bao nhiêu?',
      answer: 2,
      hints: ['Nhân phương trình thứ nhất với $3$, phương trình thứ hai với $2$ rồi cộng từng vế.'],
      solution:
        '$9x + 6y = 21$ và $4x - 6y = -8$. Cộng: $13x = 13$, $x = 1$. Thay vào: $3 + 2y = 7$, $y = 2$. Nghiệm $(1; 2)$.',
    },
    {
      type: 'number',
      prompt:
        'Giải hệ $\\begin{cases} \\dfrac{x}{2} + \\dfrac{y}{3} = 3 \\\\ x - y = 1 \\end{cases}$. Giá trị của $x$ là bao nhiêu?',
      answer: 4,
      hints: ['Nhân hai vế phương trình thứ nhất với $6$ để khử mẫu: $3x + 2y = 18$.'],
      solution:
        '$3x + 2y = 18$ và $x = y + 1$. Thế vào: $3y + 3 + 2y = 18$, $y = 3$, $x = 4$. Nghiệm $(4; 3)$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm $m$ để hệ $\\begin{cases} x + my = 3 \\\\ 2x - y = 1 \\end{cases}$ có nghiệm $(x; y)$ với $x = 1$.',
      answer: 2,
      hints: ['Với $x = 1$, phương trình thứ hai cho $y$.'],
      solution:
        'Với $x = 1$: $2 - y = 1$, nên $y = 1$. Thay vào phương trình thứ nhất: $1 + m = 3$, $m = 2$.',
    },
    {
      type: 'number',
      prompt: 'Đường thẳng $y = ax + b$ đi qua hai điểm $A(1; -1)$ và $B(3; 5)$. Tìm $b$.',
      answer: -4,
      hints: ['Thay toạ độ hai điểm được hệ $a + b = -1$ và $3a + b = 5$.'],
      solution: 'Trừ từng vế: $2a = 6$, $a = 3$; $b = -1 - 3 = -4$. Đường thẳng $y = 3x - 4$.',
    },
    {
      type: 'number',
      prompt:
        'Một bãi gửi xe có $25$ chiếc xe gồm xe máy và ô tô, tổng cộng $70$ bánh xe. Có bao nhiêu chiếc ô tô?',
      answer: 10,
      unit: 'chiếc',
      hints: [
        'Gọi $x$ là số xe máy (2 bánh), $y$ là số ô tô (4 bánh): $x + y = 25$, $2x + 4y = 70$.',
      ],
      solution:
        'Nhân phương trình thứ nhất với $2$ rồi trừ: $2y = 20$, $y = 10$; $x = 15$. Có $10$ ô tô và $15$ xe máy.',
    },
    {
      type: 'number',
      prompt:
        'Một người mua hai loại hàng, tổng giá chưa tính thuế là $300$ nghìn đồng. Loại thứ nhất chịu thuế $10\\%$, loại thứ hai chịu thuế $8\\%$, nên người đó phải trả tất cả $328$ nghìn đồng. Giá chưa thuế của loại hàng thứ nhất là bao nhiêu nghìn đồng?',
      answer: 200,
      unit: 'nghìn đồng',
      hints: [
        'Gọi $x$, $y$ là giá chưa thuế của hai loại: $x + y = 300$.',
        'Giá phải trả là $110\\%$ của $x$ và $108\\%$ của $y$: $1{,}1x + 1{,}08y = 328$.',
      ],
      solution:
        'Thế $y = 300 - x$: $1{,}1x + 324 - 1{,}08x = 328$, tức $0{,}02x = 4$, $x = 200$; $y = 100$. Loại thứ nhất giá $200$ nghìn đồng chưa thuế.',
    },
    {
      type: 'number',
      prompt:
        'Tìm số tự nhiên có hai chữ số, biết tổng hai chữ số bằng $11$ và nếu đổi chỗ hai chữ số thì được số mới lớn hơn số ban đầu $27$ đơn vị.',
      answer: 47,
      hints: [
        'Gọi chữ số hàng chục là $a$, hàng đơn vị là $b$: số ban đầu là $10a + b$, số mới là $10b + a$.',
        'Hệ: $a + b = 11$ và $(10b + a) - (10a + b) = 27$, tức $b - a = 3$.',
      ],
      solution:
        '$a + b = 11$, $b - a = 3$ cho $b = 7$, $a = 4$ ($1 \\le a \\le 9$, $0 \\le b \\le 9$: thoả mãn). Số cần tìm là $47$; thử lại $74 - 47 = 27$.',
    },
  ],
  takeaways: [
    'Nghiệm của hệ là cặp số thoả mãn cả hai phương trình, là giao điểm của hai đường thẳng.',
    'Chọn phương pháp thế khi có hệ số $\\pm 1$, phương pháp cộng đại số khi các hệ số lớn hơn; luôn thử lại.',
    'Khử ẩn được $0x = m$: hệ vô nghiệm nếu $m \\ne 0$, vô số nghiệm nếu $m = 0$.',
    'Bài toán thực tế: lập hệ, giải hệ, đối chiếu điều kiện rồi mới trả lời.',
  ],
};
