/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Giải phương trình tích bằng cách cho từng nhân tử bằng 0, và giải phương trình chứa ẩn ở mẫu qua bốn bước: tìm điều kiện xác định, quy đồng và khử mẫu, giải, rồi đối chiếu với điều kiện.',
  intro:
    'Phương trình $x^2 - 3x = 0$ hay $\\dfrac{x + 3}{x - 1} = 2$ chưa phải phương trình bậc nhất một ẩn. Nhưng bằng phân tích đa thức thành nhân tử, quy đồng và khử mẫu, ta đưa được chúng về những phương trình bậc nhất quen thuộc. Bài này chỉ cho em cách làm, và cả cái bẫy hay gặp: một giá trị tìm được có thể làm mẫu bằng $0$ và phải bị loại.',
  objectives: [
    'Giải phương trình tích $(a_1x + b_1)(a_2x + b_2) = 0$.',
    'Đưa một phương trình về phương trình tích bằng cách chuyển vế và phân tích thành nhân tử.',
    'Tìm điều kiện xác định của một phương trình chứa ẩn ở mẫu.',
    'Giải phương trình chứa ẩn ở mẫu theo bốn bước và loại các giá trị không thoả mãn điều kiện xác định.',
  ],
  sections: [
    {
      heading: 'Phương trình tích',
      blocks: [
        {
          type: 'p',
          text: 'Tích của hai số bằng $0$ khi và chỉ khi một trong hai số đó bằng $0$: $ab = 0$ khi $a = 0$ hoặc $b = 0$. Nhờ tính chất này, một phương trình dạng tích được tách thành hai phương trình bậc nhất.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cách giải phương trình tích',
          text: 'Để giải phương trình $(a_1x + b_1)(a_2x + b_2) = 0$, ta giải hai phương trình $a_1x + b_1 = 0$ và $a_2x + b_2 = 0$. Sau đó lấy tất cả các nghiệm của chúng.',
        },
        {
          type: 'p',
          text: 'Nhiều phương trình chưa có dạng tích. Khi đó ta làm hai bước: chuyển mọi hạng tử sang vế trái để vế phải bằng $0$, rồi phân tích vế trái thành nhân tử (đặt nhân tử chung, dùng hằng đẳng thức, nhóm hạng tử).',
        },
        {
          type: 'table',
          head: ['Phương trình', 'Đưa về dạng tích', 'Nghiệm'],
          rows: [
            ['$x^2 - 3x = 0$', '$x(x - 3) = 0$', '$x = 0$; $x = 3$'],
            ['$x^2 - 4 = 0$', '$(x - 2)(x + 2) = 0$', '$x = 2$; $x = -2$'],
            ['$x(x - 1) + 2(x - 1) = 0$', '$(x - 1)(x + 2) = 0$', '$x = 1$; $x = -2$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đừng chia hai vế cho biểu thức chứa ẩn',
          text: 'Từ $x^2 = 3x$, nếu chia hai vế cho $x$ ta được $x = 3$ và đánh mất nghiệm $x = 0$. Hãy chuyển vế: $x^2 - 3x = 0$, tức $x(x - 3) = 0$.',
        },
      ],
    },
    {
      heading: 'Phương trình chứa ẩn ở mẫu',
      blocks: [
        {
          type: 'p',
          text: 'Phương trình $\\dfrac{x + 3}{x - 1} = 2$ có ẩn nằm ở mẫu. Phân thức $\\dfrac{x + 3}{x - 1}$ chỉ có nghĩa khi mẫu $x - 1 \\ne 0$, tức $x \\ne 1$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Điều kiện xác định',
          text: 'Điều kiện của ẩn để tất cả các mẫu trong phương trình đều khác $0$ gọi là điều kiện xác định của phương trình, viết tắt là ĐKXĐ. Nghiệm của phương trình phải thoả mãn ĐKXĐ.',
        },
        {
          type: 'p',
          text: 'Ví dụ: phương trình $\\dfrac{2x + 1}{x - 3} = \\dfrac{1}{x + 2}$ có hai mẫu $x - 3$ và $x + 2$. Chúng khác $0$ khi $x \\ne 3$ và $x \\ne -2$, nên ĐKXĐ là $x \\ne 3$ và $x \\ne -2$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Các bước giải phương trình chứa ẩn ở mẫu',
          text: 'Giải phương trình chứa ẩn ở mẫu theo bốn bước dưới đây.',
        },
        {
          type: 'list',
          items: [
            'Bước 1. Tìm điều kiện xác định của phương trình.',
            'Bước 2. Quy đồng mẫu hai vế của phương trình rồi khử mẫu.',
            'Bước 3. Giải phương trình vừa nhận được.',
            'Bước 4. Kết luận: trong các giá trị của ẩn tìm được ở Bước 3, các giá trị thoả mãn ĐKXĐ chính là các nghiệm của phương trình đã cho.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Vì sao không được bỏ Bước 4?',
          text: 'Khử mẫu là nhân hai vế với mẫu thức chung, một biểu thức có thể bằng $0$. Phương trình mới vì thế có thể có thêm những giá trị làm mẫu bằng $0$. Chẳng hạn từ $x + \\dfrac{1}{x - 1} = 1 + \\dfrac{1}{x - 1}$, khử mẫu ta được $x = 1$, nhưng $x = 1$ làm mẫu $x - 1$ bằng $0$: phương trình đã cho vô nghiệm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Trình giải phương trình chứa ẩn ở mẫu',
    instruction:
      'Làm lần lượt bốn bước. Ở Bước 1, chạm vào các giá trị của $x$ làm một mẫu bằng $0$ rồi kiểm tra. Ở Bước 4, quyết định nhận hay loại từng giá trị tìm được: giá trị vi phạm ĐKXĐ bị tô đỏ và gạch đi. Bấm "Đề mới" để luyện thêm.',
  },
  examples: [
    {
      problem: 'Giải phương trình $(2x + 1)(3x - 1) = 0$.',
      steps: [
        'Đây là phương trình tích, ta giải hai phương trình $2x + 1 = 0$ và $3x - 1 = 0$.',
        '$2x + 1 = 0$ nên $2x = -1$, tức $x = -\\dfrac{1}{2}$.',
        '$3x - 1 = 0$ nên $3x = 1$, tức $x = \\dfrac{1}{3}$.',
      ],
      answer: 'Phương trình có hai nghiệm $x = -\\dfrac{1}{2}$ và $x = \\dfrac{1}{3}$.',
    },
    {
      problem: 'Giải phương trình $x^2 - x = -2x + 2$.',
      steps: [
        'Chuyển vế: $x^2 - x + 2x - 2 = 0$.',
        'Nhóm hạng tử: $(x^2 - x) + (2x - 2) = 0$, tức $x(x - 1) + 2(x - 1) = 0$.',
        'Đặt nhân tử chung: $(x - 1)(x + 2) = 0$.',
        '$x - 1 = 0$ cho $x = 1$; $x + 2 = 0$ cho $x = -2$.',
      ],
      answer: 'Phương trình có hai nghiệm $x = 1$ và $x = -2$.',
    },
    {
      problem: 'Giải phương trình $\\dfrac{x + 3}{x - 1} = 2$.',
      steps: [
        'ĐKXĐ: $x \\ne 1$.',
        'Quy đồng mẫu: $\\dfrac{x + 3}{x - 1} = \\dfrac{2(x - 1)}{x - 1}$. Khử mẫu: $x + 3 = 2(x - 1)$.',
        'Giải: $x + 3 = 2x - 2$ nên $-x = -5$, tức $x = 5$.',
        '$x = 5$ thoả mãn ĐKXĐ.',
      ],
      answer: 'Phương trình có nghiệm $x = 5$.',
    },
    {
      problem: 'Giải phương trình $\\dfrac{x + 2}{x - 2} - \\dfrac{1}{x} = \\dfrac{2}{x(x - 2)}$.',
      steps: [
        'ĐKXĐ: $x \\ne 0$ và $x \\ne 2$.',
        'Mẫu thức chung là $x(x - 2)$. Quy đồng và khử mẫu: $x(x + 2) - (x - 2) = 2$.',
        'Thu gọn: $x^2 + 2x - x + 2 = 2$, tức $x^2 + x = 0$, hay $x(x + 1) = 0$.',
        'Do đó $x = 0$ hoặc $x = -1$.',
        '$x = 0$ không thoả mãn ĐKXĐ nên bị loại; $x = -1$ thoả mãn ĐKXĐ.',
      ],
      answer: 'Phương trình có nghiệm $x = -1$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Phương trình $(x - 3)(2x + 8) = 0$ có hai nghiệm. Tổng hai nghiệm đó bằng bao nhiêu?',
      answer: -1,
      hints: [
        'Cho từng nhân tử bằng $0$.',
        '$x - 3 = 0$ và $2x + 8 = 0$; giải từng phương trình rồi cộng hai nghiệm.',
      ],
      solution:
        '$x - 3 = 0$ cho $x = 3$; $2x + 8 = 0$ cho $x = -4$. Tổng hai nghiệm là $3 + (-4) = -1$.',
    },
    {
      type: 'choice',
      prompt:
        'Điều kiện xác định của phương trình $\\dfrac{2x - 1}{x + 3} + \\dfrac{1}{x - 2} = 1$ là',
      options: [
        '$x \\ne -3$ và $x \\ne 2$',
        '$x \\ne 3$ và $x \\ne -2$',
        '$x \\ne \\dfrac{1}{2}$',
        '$x \\ne -3$',
      ],
      answer: 0,
      hints: ['Mọi mẫu phải khác $0$: $x + 3 \\ne 0$ và $x - 2 \\ne 0$.'],
      solution:
        'Hai mẫu là $x + 3$ và $x - 2$. $x + 3 \\ne 0$ khi $x \\ne -3$; $x - 2 \\ne 0$ khi $x \\ne 2$. ĐKXĐ: $x \\ne -3$ và $x \\ne 2$. Tử số $2x - 1$ được phép bằng $0$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các nghiệm của phương trình $x(x - 5) + 2(x - 5) = 0$.',
      options: ['$-5$', '$-2$', '$2$', '$5$'],
      answers: [1, 3],
      hints: ['Hai hạng tử có nhân tử chung $x - 5$.', 'Đặt nhân tử chung: $(x - 5)(x + 2) = 0$.'],
      solution: '$x(x - 5) + 2(x - 5) = (x - 5)(x + 2) = 0$. Do đó $x = 5$ hoặc $x = -2$.',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $\\dfrac{x + 1}{x - 3} = 3$. Nghiệm $x$ bằng bao nhiêu?',
      answer: 5,
      hints: ['ĐKXĐ: $x \\ne 3$. Nhân hai vế với $x - 3$.', 'Giải $x + 1 = 3(x - 3)$.'],
      solution:
        'ĐKXĐ: $x \\ne 3$. Khử mẫu: $x + 1 = 3x - 9$, nên $-2x = -10$, tức $x = 5$. Giá trị này thoả mãn ĐKXĐ, vậy phương trình có nghiệm $x = 5$.',
    },
    {
      type: 'choice',
      prompt:
        'Phương trình $\\dfrac{x^2}{x - 2} = \\dfrac{4}{x - 2}$ có tập nghiệm gồm những số nào?',
      options: [
        'Hai nghiệm $x = 2$ và $x = -2$',
        'Một nghiệm $x = -2$',
        'Một nghiệm $x = 2$',
        'Vô nghiệm',
      ],
      answer: 1,
      hints: [
        'Viết ĐKXĐ trước khi khử mẫu.',
        'Khử mẫu được $x^2 = 4$, tức $(x - 2)(x + 2) = 0$. Đối chiếu từng giá trị với ĐKXĐ.',
      ],
      solution:
        'ĐKXĐ: $x \\ne 2$. Khử mẫu: $x^2 = 4$, tức $(x - 2)(x + 2) = 0$, nên $x = 2$ hoặc $x = -2$. Giá trị $x = 2$ vi phạm ĐKXĐ nên bị loại. Phương trình có một nghiệm $x = -2$.',
    },
    {
      type: 'number',
      prompt: 'Phương trình $\\dfrac{1}{x - 3} + 2 = \\dfrac{x - 2}{x - 3}$ có bao nhiêu nghiệm?',
      answer: 0,
      hints: [
        'ĐKXĐ: $x \\ne 3$. Nhân hai vế với $x - 3$.',
        'Khử mẫu được $1 + 2(x - 3) = x - 2$. Giá trị tìm được có thoả mãn ĐKXĐ không?',
      ],
      solution:
        'ĐKXĐ: $x \\ne 3$. Khử mẫu: $1 + 2(x - 3) = x - 2$, tức $2x - 5 = x - 2$, nên $x = 3$. Giá trị này không thoả mãn ĐKXĐ, nên phương trình vô nghiệm: số nghiệm là $0$.',
    },
    {
      type: 'number',
      prompt:
        'Giải phương trình $\\dfrac{3}{x - 2} = \\dfrac{2}{x + 1}$. Nghiệm $x$ bằng bao nhiêu?',
      answer: -7,
      hints: [
        'ĐKXĐ: $x \\ne 2$ và $x \\ne -1$. Mẫu thức chung là $(x - 2)(x + 1)$.',
        'Khử mẫu được $3(x + 1) = 2(x - 2)$.',
      ],
      solution:
        'ĐKXĐ: $x \\ne 2$ và $x \\ne -1$. Khử mẫu: $3(x + 1) = 2(x - 2)$, tức $3x + 3 = 2x - 4$, nên $x = -7$. Giá trị này thoả mãn ĐKXĐ, vậy phương trình có nghiệm $x = -7$.',
    },
    {
      type: 'fraction',
      prompt:
        'Giải phương trình $x^2 - 9 + (x + 3)(2x - 1) = 0$. Nhập nghiệm dương của phương trình dưới dạng phân số.',
      answer: [4, 3],
      hints: [
        '$x^2 - 9 = (x - 3)(x + 3)$, nên hai hạng tử có nhân tử chung $x + 3$.',
        'Đặt nhân tử chung: $(x + 3)\\big[(x - 3) + (2x - 1)\\big] = 0$.',
      ],
      solution:
        '$x^2 - 9 + (x + 3)(2x - 1) = (x + 3)(x - 3 + 2x - 1) = (x + 3)(3x - 4) = 0$. Do đó $x = -3$ hoặc $x = \\dfrac{4}{3}$. Nghiệm dương là $\\dfrac{4}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Một xưởng làm $x$ sản phẩm thì chi phí trung bình cho mỗi sản phẩm là $C = \\dfrac{5x + 400}{x}$ (nghìn đồng). Xưởng cần làm bao nhiêu sản phẩm để chi phí trung bình là $7$ nghìn đồng mỗi sản phẩm?',
      answer: 200,
      unit: 'sản phẩm',
      hints: [
        'Giải phương trình $\\dfrac{5x + 400}{x} = 7$ với điều kiện $x > 0$.',
        'Khử mẫu được $5x + 400 = 7x$.',
      ],
      solution:
        'Điều kiện: $x$ là số nguyên dương. Giải $\\dfrac{5x + 400}{x} = 7$: khử mẫu được $5x + 400 = 7x$, nên $2x = 400$, tức $x = 200$ (thoả mãn). Xưởng cần làm $200$ sản phẩm.',
    },
  ],
  takeaways: [
    'Phương trình tích $(a_1x + b_1)(a_2x + b_2) = 0$: giải $a_1x + b_1 = 0$ và $a_2x + b_2 = 0$ rồi lấy tất cả các nghiệm.',
    'Muốn đưa về phương trình tích: chuyển vế cho vế phải bằng $0$, rồi phân tích vế trái thành nhân tử. Không chia hai vế cho biểu thức chứa ẩn.',
    'ĐKXĐ của phương trình chứa ẩn ở mẫu: mọi mẫu khác $0$.',
    'Bốn bước: tìm ĐKXĐ, quy đồng và khử mẫu, giải, rồi chỉ giữ các giá trị thoả mãn ĐKXĐ.',
  ],
};
