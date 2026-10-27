/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: phương trình tích, phương trình chứa ẩn ở mẫu với điều kiện xác định, bất đẳng thức và các tính chất liên hệ với phép cộng, phép nhân.',
  intro:
    'Bài 4 và Bài 5 cho em hai công cụ: đưa một phương trình về phương trình tích hoặc khử mẫu để giải, và biến đổi bất đẳng thức bằng phép cộng, phép nhân. Bài luyện tập này giúp em làm nhanh, làm đúng, và tránh hai lỗi hay gặp nhất: quên đối chiếu với ĐKXĐ, quên đổi chiều khi nhân với số âm.',
  objectives: [
    'Giải phương trình tích và đưa phương trình về dạng tích bằng phân tích thành nhân tử.',
    'Giải phương trình chứa ẩn ở mẫu, loại các giá trị không thoả mãn ĐKXĐ.',
    'Vận dụng tính chất của bất đẳng thức để so sánh, chứng minh và tìm giá trị nhỏ nhất.',
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
              'Phương trình tích',
              '$(a_1x + b_1)(a_2x + b_2) = 0$: giải từng phương trình $a_1x + b_1 = 0$, $a_2x + b_2 = 0$',
              '$(x - 2)(2x + 1) = 0$ cho $x = 2$, $x = -\\dfrac{1}{2}$',
            ],
            [
              'Đưa về dạng tích',
              'Chuyển vế cho vế phải bằng $0$, rồi phân tích vế trái thành nhân tử',
              '$x^2 = 3x$ thành $x(x - 3) = 0$',
            ],
            [
              'Phương trình chứa ẩn ở mẫu',
              'Tìm ĐKXĐ, quy đồng và khử mẫu, giải, rồi chỉ nhận giá trị thoả mãn ĐKXĐ',
              '$\\dfrac{x^2}{x - 2} = \\dfrac{4}{x - 2}$ chỉ có nghiệm $x = -2$',
            ],
            ['Bắc cầu', '$a < b$ và $b < c$ thì $a < c$', '$\\dfrac{7}{6} > 1 > \\dfrac{5}{6}$'],
            ['Cộng hai vế', 'Cộng cùng một số: giữ chiều', '$a < b$ nên $a - 3 < b - 3$'],
            [
              'Nhân hai vế',
              'Với số dương: giữ chiều; với số âm: đổi chiều',
              '$a < b$ nên $2a < 2b$ và $-2a > -2b$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Khử mẫu xong mà quên đối chiếu với ĐKXĐ; chia hai vế cho biểu thức chứa ẩn làm mất nghiệm; nhân hai vế của bất đẳng thức với số âm mà không đổi chiều.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $12$ câu mới, trộn đều từ Bài 4 và Bài 5. Mọi đáp số là số nguyên; số âm gõ với dấu "-" đằng trước, ví dụ $-3$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề luyện tập trộn ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết em cần ôn lại phần nào.',
  },
  examples: [
    {
      problem: 'Giải phương trình $x^2 - 2x + 3x - 6 = 0$.',
      steps: [
        'Nhóm hạng tử: $(x^2 - 2x) + (3x - 6) = 0$, tức $x(x - 2) + 3(x - 2) = 0$.',
        'Đặt nhân tử chung: $(x - 2)(x + 3) = 0$.',
        '$x - 2 = 0$ cho $x = 2$; $x + 3 = 0$ cho $x = -3$.',
      ],
      answer: 'Phương trình có hai nghiệm $x = 2$ và $x = -3$.',
    },
    {
      problem:
        'Giải phương trình $\\dfrac{x}{x - 2} - \\dfrac{7}{x + 1} = \\dfrac{6}{(x - 2)(x + 1)}$.',
      steps: [
        'ĐKXĐ: $x \\ne 2$ và $x \\ne -1$.',
        'Quy đồng mẫu $(x - 2)(x + 1)$ rồi khử mẫu: $x(x + 1) - 7(x - 2) = 6$.',
        'Thu gọn: $x^2 + x - 7x + 14 - 6 = 0$, tức $x^2 - 6x + 8 = 0$.',
        'Phân tích: $x^2 - 2x - 4x + 8 = x(x - 2) - 4(x - 2) = (x - 2)(x - 4) = 0$, nên $x = 2$ hoặc $x = 4$.',
        '$x = 2$ vi phạm ĐKXĐ nên bị loại; $x = 4$ thoả mãn ĐKXĐ.',
      ],
      answer: 'Phương trình có nghiệm $x = 4$.',
    },
    {
      problem: 'Cho $a > b$. Chứng minh $4 - 3a < 4 - 3b$.',
      steps: [
        'Nhân hai vế của $a > b$ với số âm $-3$, bất đẳng thức đổi chiều: $-3a < -3b$.',
        'Cộng $4$ vào hai vế, giữ chiều: $4 - 3a < 4 - 3b$.',
      ],
      answer: '$4 - 3a < 4 - 3b$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Phương trình $(3x - 6)(x + 4) = 0$ có hai nghiệm. Tích hai nghiệm đó bằng bao nhiêu?',
      answer: -8,
      hints: ['Cho từng nhân tử bằng $0$ để tìm hai nghiệm.'],
      solution:
        '$3x - 6 = 0$ cho $x = 2$; $x + 4 = 0$ cho $x = -4$. Tích hai nghiệm là $2 \\cdot (-4) = -8$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các nghiệm của phương trình $2x(x - 3) = 5(x - 3)$.',
      options: ['$3$', '$-3$', '$\\dfrac{5}{2}$', '$\\dfrac{2}{5}$'],
      answers: [0, 2],
      hints: [
        'Không chia hai vế cho $x - 3$: chuyển vế cho vế phải bằng $0$.',
        '$2x(x - 3) - 5(x - 3) = (x - 3)(2x - 5)$.',
      ],
      solution:
        '$2x(x - 3) - 5(x - 3) = 0$, tức $(x - 3)(2x - 5) = 0$. Do đó $x = 3$ hoặc $x = \\dfrac{5}{2}$.',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $(x + 1)^2 - 4 = 0$. Nhập nghiệm âm của phương trình.',
      answer: -3,
      hints: ['Dùng hằng đẳng thức $A^2 - B^2 = (A - B)(A + B)$ với $A = x + 1$, $B = 2$.'],
      solution:
        '$(x + 1)^2 - 2^2 = (x + 1 - 2)(x + 1 + 2) = (x - 1)(x + 3) = 0$, nên $x = 1$ hoặc $x = -3$. Nghiệm âm là $-3$.',
    },
    {
      type: 'choice',
      prompt:
        'Điều kiện xác định của phương trình $\\dfrac{x}{x - 1} + \\dfrac{2}{x^2 - 1} = 1$ là',
      options: [
        '$x \\ne 1$ và $x \\ne -1$',
        '$x \\ne 1$',
        '$x \\ne 0$ và $x \\ne 1$',
        '$x \\ne -1$',
      ],
      answer: 0,
      hints: ['Mẫu $x^2 - 1 = (x - 1)(x + 1)$ cũng phải khác $0$.'],
      solution:
        'Các mẫu $x - 1$ và $x^2 - 1 = (x - 1)(x + 1)$ phải khác $0$, nên $x \\ne 1$ và $x \\ne -1$.',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $\\dfrac{2x - 1}{x + 2} = 1$. Nghiệm $x$ bằng bao nhiêu?',
      answer: 3,
      hints: ['ĐKXĐ: $x \\ne -2$. Khử mẫu được $2x - 1 = x + 2$.'],
      solution:
        'ĐKXĐ: $x \\ne -2$. Khử mẫu: $2x - 1 = x + 2$, nên $x = 3$ (thoả mãn ĐKXĐ). Phương trình có nghiệm $x = 3$.',
    },
    {
      type: 'number',
      prompt:
        'Giải phương trình $\\dfrac{1}{x - 1} + \\dfrac{2}{x + 1} = \\dfrac{5}{x^2 - 1}$. Nghiệm $x$ bằng bao nhiêu?',
      answer: 2,
      hints: [
        'ĐKXĐ: $x \\ne 1$ và $x \\ne -1$. Mẫu thức chung là $(x - 1)(x + 1)$.',
        'Khử mẫu được $(x + 1) + 2(x - 1) = 5$.',
      ],
      solution:
        'ĐKXĐ: $x \\ne \\pm 1$. Khử mẫu: $x + 1 + 2x - 2 = 5$, tức $3x - 1 = 5$, nên $x = 2$ (thoả mãn ĐKXĐ). Phương trình có nghiệm $x = 2$.',
    },
    {
      type: 'choice',
      prompt: 'Phương trình $\\dfrac{x}{x - 3} - 2 = \\dfrac{3}{x - 3}$ có nghiệm là',
      options: ['$x = 3$', 'Vô nghiệm', '$x = -3$', 'Mọi $x \\ne 3$'],
      answer: 1,
      hints: [
        'ĐKXĐ: $x \\ne 3$. Khử mẫu được $x - 2(x - 3) = 3$.',
        'Giá trị tìm được có thoả mãn ĐKXĐ không?',
      ],
      solution:
        'ĐKXĐ: $x \\ne 3$. Khử mẫu: $x - 2(x - 3) = 3$, tức $-x + 6 = 3$, nên $x = 3$. Giá trị này vi phạm ĐKXĐ, vậy phương trình vô nghiệm.',
    },
    {
      type: 'choice',
      prompt: 'Cho $a > b$. Khẳng định nào sau đây sai?',
      options: ['$a + 4 > b + 4$', '$3a > 3b$', '$-2a + 1 > -2b + 1$', '$a - b > 0$'],
      answer: 2,
      hints: ['Tìm khẳng định có nhân hai vế với một số âm.'],
      solution:
        'Nhân hai vế của $a > b$ với $-2 < 0$ phải đổi chiều: $-2a < -2b$, nên $-2a + 1 < -2b + 1$. Khẳng định $-2a + 1 > -2b + 1$ sai; ba khẳng định còn lại đúng.',
    },
    {
      type: 'number',
      prompt: 'Cho $x \\ge -1$. Giá trị nhỏ nhất của biểu thức $4x + 9$ là bao nhiêu?',
      answer: 5,
      hints: ['Nhân hai vế của $x \\ge -1$ với $4$, rồi cộng $9$.'],
      solution:
        'Nhân với $4 > 0$: $4x \\ge -4$. Cộng $9$: $4x + 9 \\ge 5$. Dấu bằng khi $x = -1$, nên giá trị nhỏ nhất là $5$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $m < n$. So sánh $5 - 3m$ và $5 - 3n$.',
      options: ['$5 - 3m > 5 - 3n$', '$5 - 3m < 5 - 3n$', '$5 - 3m = 5 - 3n$'],
      answer: 0,
      hints: ['Nhân hai vế của $m < n$ với $-3$, rồi cộng $5$.'],
      solution: 'Nhân với $-3 < 0$, đổi chiều: $-3m > -3n$. Cộng $5$: $5 - 3m > 5 - 3n$.',
    },
    {
      type: 'multi',
      prompt: 'Biết $2a - 1 \\le 2b - 1$. Chọn tất cả các khẳng định đúng.',
      options: ['$a \\le b$', '$-a \\ge -b$', '$a \\ge b$', '$3a + 2 \\le 3b + 2$'],
      answers: [0, 1, 3],
      hints: ['Từ giả thiết, cộng $1$ rồi chia hai vế cho $2$ để có quan hệ giữa $a$ và $b$.'],
      solution:
        'Cộng $1$: $2a \\le 2b$; chia cho $2 > 0$: $a \\le b$. Nhân với $-1$: $-a \\ge -b$. Nhân với $3$ rồi cộng $2$: $3a + 2 \\le 3b + 2$. Khẳng định $a \\ge b$ không suy ra được.',
    },
  ],
  takeaways: [
    'Phương trình tích: cho từng nhân tử bằng $0$. Muốn có dạng tích, chuyển vế rồi phân tích thành nhân tử.',
    'Phương trình chứa ẩn ở mẫu: luôn viết ĐKXĐ trước và đối chiếu sau khi giải.',
    'Bất đẳng thức: cộng một số giữ chiều; nhân với số dương giữ chiều, với số âm đổi chiều.',
  ],
};
