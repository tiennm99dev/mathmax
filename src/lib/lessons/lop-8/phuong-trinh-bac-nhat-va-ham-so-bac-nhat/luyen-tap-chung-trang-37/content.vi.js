/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: giải phương trình bậc nhất một ẩn và phương trình đưa được về dạng ax + b = 0, giải bài toán bằng cách lập phương trình.',
  intro:
    'Hai bài vừa học cho em một công cụ và một cách dùng nó: giải phương trình bậc nhất một ẩn (Bài 25), rồi dùng phương trình để giải bài toán thực tế (Bài 26). Bài luyện tập này giúp em làm thành thạo, nhất là ở những chỗ hay sai: quên đổi dấu khi chuyển vế, bỏ ngoặc có dấu trừ đằng trước, quên kiểm tra điều kiện của ẩn.',
  objectives: [
    'Giải thành thạo phương trình bậc nhất một ẩn và phương trình có ngoặc, có mẫu.',
    'Phát hiện và sửa lỗi chuyển vế, bỏ ngoặc.',
    'Giải bài toán bằng cách lập phương trình: chọn ẩn, lập, giải, kiểm tra và trả lời.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ', 'Ví dụ'],
          rows: [
            [
              'Phương trình bậc nhất một ẩn',
              '$ax + b = 0$ với $a \\ne 0$; nghiệm duy nhất $x = -\\dfrac{b}{a}$',
              '$2x - 6 = 0 \\Leftrightarrow x = 3$',
            ],
            [
              'Quy tắc chuyển vế',
              'Chuyển hạng tử sang vế kia thì đổi dấu',
              '$x + 5 = 9 \\Leftrightarrow x = 9 - 5$',
            ],
            [
              'Quy tắc nhân',
              'Nhân (chia) hai vế với cùng một số khác $0$',
              '$-3x = 12 \\Leftrightarrow x = -4$',
            ],
            [
              'Phương trình có ngoặc, có mẫu',
              'Khử mẫu, bỏ ngoặc, chuyển vế, thu gọn về $ax = c$',
              '$\\dfrac{x}{2} = \\dfrac{x + 1}{3} \\Leftrightarrow 3x = 2x + 2$',
            ],
            [
              'Giải bài toán bằng cách lập phương trình',
              'Chọn ẩn và điều kiện → lập phương trình → giải → kiểm tra, trả lời',
              'Tuổi, chuyển động $s = v \\cdot t$, năng suất',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $10$ câu mới, trộn đều từ Bài 25 và Bài 26. Đáp số là số nguyên, phân số (gõ dạng $-6/7$) hoặc số thập phân (gõ dấu phẩy, ví dụ $2{,}25$).',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề luyện tập trộn ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết em cần ôn lại bài nào.',
  },
  examples: [
    {
      problem: 'Giải phương trình $2(x + 1) - 3(x - 2) = 5x - 4$.',
      steps: [
        'Bỏ ngoặc (dấu trừ trước ngoặc thứ hai đổi dấu cả hai hạng tử): $2x + 2 - 3x + 6 = 5x - 4$.',
        'Thu gọn vế trái: $-x + 8 = 5x - 4$.',
        'Chuyển vế: $-x - 5x = -4 - 8$, tức là $-6x = -12$.',
        'Chia hai vế cho $-6$: $x = 2$.',
      ],
      answer: 'Phương trình có nghiệm $x = 2$.',
    },
    {
      problem:
        'Một người đi xe đạp từ $A$ đến $B$ với vận tốc $15$ km/h. Lúc về, người đó đi với vận tốc $12$ km/h nên thời gian về nhiều hơn thời gian đi $30$ phút. Tính quãng đường $AB$.',
      steps: [
        'Gọi quãng đường $AB$ là $x$ (km), $x > 0$. Thời gian đi là $\\dfrac{x}{15}$ giờ, thời gian về là $\\dfrac{x}{12}$ giờ.',
        'Đổi $30$ phút $= \\dfrac{1}{2}$ giờ. Phương trình: $\\dfrac{x}{12} - \\dfrac{x}{15} = \\dfrac{1}{2}$.',
        'Nhân hai vế với $60$: $5x - 4x = 30$, nên $x = 30$ (thoả mãn).',
        'Kiểm tra: đi hết $2$ giờ, về hết $2{,}5$ giờ, đúng là nhiều hơn $30$ phút.',
      ],
      answer: 'Quãng đường $AB$ dài $30$ km.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Giải phương trình $3x - 2(x - 5) = 4$. Nhập nghiệm $x$.',
      answer: -6,
      hints: ['Bỏ ngoặc: $-2(x - 5) = -2x + 10$.'],
      solution: '$3x - 2x + 10 = 4 \\Leftrightarrow x = 4 - 10 = -6$.',
    },
    {
      type: 'fraction',
      prompt: 'Giải phương trình $5 - (x - 6) = 4(3 - 2x)$. Nhập nghiệm dưới dạng phân số.',
      answer: [1, 7],
      hints: [
        'Dấu trừ trước ngoặc: $-(x - 6) = -x + 6$.',
        'Vế trái thành $11 - x$, vế phải thành $12 - 8x$.',
      ],
      solution:
        '$5 - x + 6 = 12 - 8x \\Leftrightarrow -x + 8x = 12 - 11 \\Leftrightarrow 7x = 1 \\Leftrightarrow x = \\dfrac{1}{7}$.',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $\\dfrac{2x - 1}{3} = \\dfrac{x + 2}{2}$. Nhập nghiệm $x$.',
      answer: 8,
      hints: ['Nhân hai vế với mẫu chung $6$.', '$2(2x - 1) = 3(x + 2)$.'],
      solution: '$2(2x - 1) = 3(x + 2) \\Leftrightarrow 4x - 2 = 3x + 6 \\Leftrightarrow x = 8$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phương trình nhận $x = 2$ làm nghiệm.',
      options: [
        '$3x - 6 = 0$',
        '$x + 2 = 0$',
        '$2(x - 1) = x$',
        '$\\dfrac{x}{2} = 4 - x$',
        '$5 - x = x + 1$',
      ],
      answers: [0, 2, 4],
      hints: ['Thay $x = 2$ vào hai vế của từng phương trình.'],
      solution:
        'Với $x = 2$: $3 \\cdot 2 - 6 = 0$ đúng; $2 + 2 = 4 \\ne 0$; $2 \\cdot 1 = 2$ đúng; $1 \\ne 2$; $3 = 3$ đúng.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Minh giải phương trình $3x + 5 = x - 1$ như sau: $3x - x = -1 + 5$; $2x = 4$; $x = 2$. Bạn Minh sai ở đâu?',
      options: [
        'Khi chuyển $5$ sang vế phải phải đổi thành $-5$',
        'Khi thu gọn $3x - x$',
        'Khi chia hai vế cho $2$',
        'Bạn Minh giải đúng',
      ],
      answer: 0,
      hints: [
        'Thử thay $x = 2$ vào phương trình ban đầu.',
        'Xem lại dấu của hạng tử $5$ sau khi chuyển vế.',
      ],
      solution:
        'Chuyển $5$ sang vế phải phải đổi dấu: $3x - x = -1 - 5$, nên $2x = -6$, $x = -3$. Thử lại: $x = 2$ cho $11 \\ne 1$.',
    },
    {
      type: 'number',
      prompt: 'Giải đúng phương trình $3x + 5 = x - 1$ ở câu trên. Nhập nghiệm $x$.',
      answer: -3,
      hints: ['$3x - x = -1 - 5$.'],
      solution: '$2x = -6 \\Leftrightarrow x = -3$. Thử lại: $3 \\cdot (-3) + 5 = -4 = -3 - 1$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $m$ để phương trình $2x + m = x - 1$ có nghiệm $x = 3$.',
      answer: -4,
      hints: ['Thay $x = 3$ vào phương trình được một phương trình ẩn $m$.'],
      solution: 'Thay $x = 3$: $6 + m = 2 \\Leftrightarrow m = -4$.',
    },
    {
      type: 'number',
      prompt: 'Tổng của ba số tự nhiên liên tiếp bằng $87$. Tìm số nhỏ nhất.',
      answer: 28,
      hints: ['Gọi số nhỏ nhất là $x$; hai số kia là $x + 1$ và $x + 2$.'],
      solution:
        '$x + (x + 1) + (x + 2) = 87 \\Leftrightarrow 3x + 3 = 87 \\Leftrightarrow x = 28$. Ba số là $28$, $29$, $30$.',
    },
    {
      type: 'number',
      prompt:
        'Sau khi được giảm giá $20\\%$, một chiếc áo có giá $360$ nghìn đồng. Hỏi giá ban đầu của chiếc áo là bao nhiêu nghìn đồng?',
      answer: 450,
      unit: 'nghìn đồng',
      hints: ['Gọi giá ban đầu là $x$; giá sau khi giảm bằng $80\\%$ của $x$.', '$0{,}8x = 360$.'],
      solution:
        'Gọi giá ban đầu là $x$ (nghìn đồng), $x > 0$. Ta có $0{,}8x = 360 \\Leftrightarrow x = 450$.',
    },
    {
      type: 'number',
      prompt:
        'Lúc $7$ giờ, bạn Lan đi xe đạp từ nhà với vận tốc $12$ km/h. Lúc $8$ giờ, anh của Lan đi xe máy từ nhà theo cùng đường với vận tốc $36$ km/h. Anh đi bao nhiêu giờ thì đuổi kịp Lan? (Viết dạng số thập phân.)',
      answer: 0.5,
      unit: 'giờ',
      hints: [
        'Gọi thời gian anh đi là $x$ giờ; khi đó Lan đã đi $x + 1$ giờ.',
        'Quãng đường hai người bằng nhau: $36x = 12(x + 1)$.',
      ],
      solution:
        '$36x = 12x + 12 \\Leftrightarrow 24x = 12 \\Leftrightarrow x = 0{,}5$ (thoả mãn). Anh đi $0{,}5$ giờ ($30$ phút), đuổi kịp Lan lúc $8$ giờ $30$ phút.',
    },
  ],
  takeaways: [
    'Chuyển vế phải đổi dấu; bỏ ngoặc có dấu trừ phía trước phải đổi dấu mọi hạng tử trong ngoặc.',
    'Thay nghiệm vào phương trình ban đầu là cách tự kiểm tra nhanh nhất.',
    'Bài toán thực tế: chọn ẩn có điều kiện, lập phương trình, giải, rồi kiểm tra điều kiện trước khi trả lời.',
  ],
};
