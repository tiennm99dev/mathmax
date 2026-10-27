/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: nghiệm của phương trình và hệ hai phương trình bậc nhất hai ẩn, giải hệ bằng phương pháp thế, phương pháp cộng đại số và máy tính cầm tay.',
  intro:
    'Hai bài đầu của chương cho em hai việc chính: hiểu thế nào là nghiệm của một phương trình hay một hệ hai phương trình bậc nhất hai ẩn, và giải hệ bằng phương pháp thế hoặc phương pháp cộng đại số. Bài luyện tập này giúp em làm nhanh, đúng, và tránh những lỗi hay gặp như quên đổi dấu khi trừ từng vế hay chỉ thử nghiệm vào một phương trình.',
  objectives: [
    'Kiểm tra một cặp số có là nghiệm của phương trình hay của hệ; tìm tham số để một cặp số là nghiệm.',
    'Giải hệ hai phương trình bậc nhất hai ẩn bằng phương pháp thế và phương pháp cộng đại số.',
    'Nhận biết hệ vô nghiệm, hệ có vô số nghiệm; dùng máy tính cầm tay để kiểm tra kết quả.',
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
              'Nghiệm của $ax + by = c$',
              'Cặp số $(x_0; y_0)$ với $ax_0 + by_0 = c$ đúng',
              '$(2; 0)$ là nghiệm của $2x + 3y = 4$',
            ],
            [
              'Nghiệm của hệ',
              'Thoả mãn đồng thời cả hai phương trình',
              '$(1; 2)$ là nghiệm của hệ $2x - y = 0$, $x + y = 3$',
            ],
            [
              'Phương pháp thế',
              'Rút một ẩn từ một phương trình, thế vào phương trình kia',
              '$y = 3 - x$ thế vào $2x - y = 0$',
            ],
            [
              'Phương pháp cộng đại số',
              'Làm hệ số của một ẩn bằng nhau hoặc đối nhau, rồi trừ hoặc cộng từng vế',
              '$(x + y) + (x - y) = 5 + 1$ cho $2x = 6$',
            ],
            [
              'Số nghiệm',
              'Khử ẩn được $0x = k$: vô nghiệm khi $k \\ne 0$, vô số nghiệm khi $k = 0$',
              '$x + y = 1$, $2x + 2y = 3$ vô nghiệm',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Khi trừ từng vế, phải đổi dấu mọi hạng tử của phương trình bị trừ, kể cả hằng số. Khi thử nghiệm của hệ, phải thay vào cả hai phương trình.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $12$ câu mới, trộn đều từ Bài 1 và Bài 2. Mọi đáp số là số nguyên; số âm gõ với dấu "-" đằng trước, ví dụ $-3$.',
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
      problem:
        'Giải hệ phương trình $\\begin{cases} x + 3y = 5 \\\\ 2x - y = 3 \\end{cases}$ bằng phương pháp thế.',
      steps: [
        'Từ phương trình thứ nhất: $x = 5 - 3y$.',
        'Thế vào phương trình thứ hai: $2(5 - 3y) - y = 3$, tức $10 - 7y = 3$, nên $y = 1$.',
        'Thay lại: $x = 5 - 3 \\cdot 1 = 2$.',
        'Thử lại: $2 + 3 = 5$ và $4 - 1 = 3$, đúng.',
      ],
      answer: 'Hệ có nghiệm duy nhất $(2; 1)$.',
    },
    {
      problem: 'Tìm $a$ và $b$ để đường thẳng $y = ax + b$ đi qua hai điểm $A(1; 3)$ và $B(2; 5)$.',
      steps: [
        'Đường thẳng đi qua $A(1; 3)$ nên $3 = a \\cdot 1 + b$, tức $a + b = 3$.',
        'Đường thẳng đi qua $B(2; 5)$ nên $5 = 2a + b$.',
        'Trừ từng vế phương trình thứ hai cho phương trình thứ nhất: $a = 2$; khi đó $b = 3 - 2 = 1$.',
      ],
      answer: '$a = 2$, $b = 1$; đường thẳng là $y = 2x + 1$.',
    },
    {
      problem: 'Giải hệ phương trình $\\begin{cases} x - 2y = 1 \\\\ 2x - 4y = 2 \\end{cases}$.',
      steps: [
        'Nhân hai vế phương trình thứ nhất với $2$: $2x - 4y = 2$.',
        'Trừ từng vế cho phương trình thứ hai: $0x + 0y = 0$, đúng với mọi $x$, $y$.',
        'Hai phương trình tương đương, nên mọi nghiệm của $x - 2y = 1$ đều là nghiệm của hệ: $x = 2y + 1$.',
      ],
      answer: 'Hệ có vô số nghiệm $(2y + 1; y)$ với $y \\in \\mathbb{R}$ tuỳ ý.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Giải hệ $\\begin{cases} 3x - y = 5 \\\\ x + 2y = 4 \\end{cases}$. Giá trị của $y$ là bao nhiêu?',
      answer: 1,
      hints: ['Rút $y$ từ phương trình thứ nhất: $y = 3x - 5$.', 'Thế vào: $x + 2(3x - 5) = 4$.'],
      solution:
        '$y = 3x - 5$; $x + 6x - 10 = 4$ nên $7x = 14$, $x = 2$; $y = 6 - 5 = 1$. Nghiệm $(2; 1)$.',
    },
    {
      type: 'number',
      prompt:
        'Giải hệ $\\begin{cases} 2x + 3y = -2 \\\\ 3x - 2y = -3 \\end{cases}$. Giá trị của $x$ là bao nhiêu?',
      answer: -1,
      hints: [
        'Nhân phương trình thứ nhất với $2$, phương trình thứ hai với $3$ để hệ số của $y$ đối nhau.',
      ],
      solution:
        '$4x + 6y = -4$ và $9x - 6y = -9$. Cộng từng vế: $13x = -13$, $x = -1$. Thay vào: $-2 + 3y = -2$, $y = 0$. Nghiệm $(-1; 0)$.',
    },
    {
      type: 'choice',
      prompt: 'Hệ $\\begin{cases} x - 2y = 3 \\\\ -2x + 4y = 1 \\end{cases}$ có bao nhiêu nghiệm?',
      options: ['Nghiệm duy nhất', 'Vô nghiệm', 'Vô số nghiệm'],
      answer: 1,
      hints: ['Nhân phương trình thứ nhất với $2$ rồi cộng từng vế với phương trình thứ hai.'],
      solution:
        'Nhân phương trình thứ nhất với $2$: $2x - 4y = 6$. Cộng từng vế với $-2x + 4y = 1$: $0x + 0y = 7$, vô lí. Hệ vô nghiệm.',
    },
    {
      type: 'choice',
      prompt: 'Hệ $\\begin{cases} 3x - y = 2 \\\\ -6x + 2y = -4 \\end{cases}$ có bao nhiêu nghiệm?',
      options: ['Nghiệm duy nhất', 'Vô nghiệm', 'Vô số nghiệm'],
      answer: 2,
      hints: ['So sánh phương trình thứ hai với phương trình thứ nhất nhân $-2$.'],
      solution:
        'Nhân phương trình thứ nhất với $-2$ được đúng $-6x + 2y = -4$. Hai phương trình tương đương nên hệ có vô số nghiệm $(x; 3x - 2)$, $x \\in \\mathbb{R}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các hệ có nghiệm duy nhất.',
      options: [
        '$\\begin{cases} x + y = 1 \\\\ x - y = 3 \\end{cases}$',
        '$\\begin{cases} 2x - y = 1 \\\\ 4x - 2y = 2 \\end{cases}$',
        '$\\begin{cases} x + 2y = 3 \\\\ 2x + y = 3 \\end{cases}$',
        '$\\begin{cases} x - y = 2 \\\\ -x + y = 1 \\end{cases}$',
      ],
      answers: [0, 2],
      hints: ["Hệ có nghiệm duy nhất khi $ab' - a'b \\ne 0$."],
      solution:
        'Hệ thứ nhất: $1 \\cdot (-1) - 1 \\cdot 1 = -2 \\ne 0$, nghiệm $(2; -1)$. Hệ thứ hai: phương trình sau gấp đôi phương trình trước, vô số nghiệm. Hệ thứ ba: $1 \\cdot 1 - 2 \\cdot 2 = -3 \\ne 0$, nghiệm $(1; 1)$. Hệ thứ tư: cộng từng vế được $0 = 3$, vô nghiệm.',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các bước giải hệ $\\begin{cases} x - 3y = 2 \\\\ 2x + y = 11 \\end{cases}$ bằng phương pháp thế.',
      items: [
        'Thế vào phương trình thứ hai: $2(3y + 2) + y = 11$.',
        'Thay lại: $x = 3 \\cdot 1 + 2 = 5$; nghiệm $(5; 1)$.',
        'Từ phương trình thứ nhất: $x = 3y + 2$.',
        'Thu gọn: $7y = 7$, nên $y = 1$.',
      ],
      answer: [2, 0, 3, 1],
      hints: ['Bước đầu tiên là rút một ẩn theo ẩn kia.'],
      solution:
        '$x = 3y + 2$; thế vào được $2(3y + 2) + y = 11$; thu gọn $7y + 4 = 11$, $y = 1$; thay lại $x = 5$. Nghiệm $(5; 1)$.',
    },
    {
      type: 'number',
      prompt: 'Đường thẳng $y = ax + b$ đi qua hai điểm $A(2; 1)$ và $B(-1; 7)$. Tìm $a$.',
      answer: -2,
      hints: [
        'Thay toạ độ mỗi điểm vào $y = ax + b$ để được hai phương trình ẩn $a$, $b$.',
        'Hệ: $2a + b = 1$ và $-a + b = 7$.',
      ],
      solution:
        'Hệ $2a + b = 1$, $-a + b = 7$. Trừ từng vế: $3a = -6$, nên $a = -2$; $b = 7 + a = 5$. Đường thẳng $y = -2x + 5$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm $m$ để hệ $\\begin{cases} mx + y = 3 \\\\ x - y = 1 \\end{cases}$ có nghiệm $(x; y)$ với $x = 2$.',
      answer: 1,
      hints: ['Với $x = 2$, phương trình thứ hai cho ngay $y$.'],
      solution:
        'Với $x = 2$: $2 - y = 1$ nên $y = 1$. Thay vào phương trình thứ nhất: $2m + 1 = 3$, $m = 1$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm $a$ và $b$ để hệ $\\begin{cases} ax + by = 4 \\\\ bx - ay = 3 \\end{cases}$ nhận $(2; 1)$ làm nghiệm. Tính $a + b$.',
      answer: 3,
      hints: ['Thay $x = 2$, $y = 1$ được hệ ẩn $a$, $b$: $2a + b = 4$ và $2b - a = 3$.'],
      solution:
        'Hệ $2a + b = 4$, $-a + 2b = 3$. Từ phương trình thứ nhất $b = 4 - 2a$; thế vào: $-a + 8 - 4a = 3$, nên $a = 1$, $b = 2$. Vậy $a + b = 3$.',
    },
    {
      type: 'number',
      prompt:
        'Giải hệ $\\begin{cases} 0{,}5x + 0{,}3y = 2{,}1 \\\\ x + y = 5 \\end{cases}$. Giá trị của $y$ là bao nhiêu?',
      answer: 2,
      hints: ['Nhân hai vế phương trình thứ nhất với $10$ để bỏ dấu phẩy: $5x + 3y = 21$.'],
      solution:
        '$5x + 3y = 21$ và $x + y = 5$. Nhân phương trình thứ hai với $3$ rồi trừ: $2x = 6$, $x = 3$; $y = 5 - 3 = 2$. Nghiệm $(3; 2)$.',
    },
    {
      type: 'fraction',
      prompt:
        'Giải hệ $\\begin{cases} 2x + y = 3 \\\\ x - 2y = 1 \\end{cases}$. Viết $x$ dưới dạng phân số tối giản.',
      answer: [7, 5],
      simplest: true,
      hints: ['Nhân phương trình thứ nhất với $2$ rồi cộng từng vế để khử $y$.'],
      solution:
        '$4x + 2y = 6$ cộng $x - 2y = 1$: $5x = 7$, $x = \\dfrac{7}{5}$. Khi đó $y = 3 - \\dfrac{14}{5} = \\dfrac{1}{5}$.',
    },
    {
      type: 'choice',
      prompt:
        'Dùng máy tính cầm tay giải hệ $\\begin{cases} 2x - 3y = 4 \\\\ x + 5y = -1 \\end{cases}$. Ở chế độ giải hệ hai ẩn, em nhập lần lượt các hệ số nào?',
      options: [
        '$2, -3, 4$ rồi $1, 5, -1$',
        '$2, 3, 4$ rồi $1, 5, 1$',
        '$2, 1, 4$ rồi $-3, 5, -1$',
        '$4, 2, -3$ rồi $-1, 1, 5$',
      ],
      answer: 0,
      hints: [
        'Mỗi phương trình nhập theo thứ tự $a, b, c$ của dạng $ax + by = c$, giữ nguyên dấu.',
      ],
      solution:
        'Phương trình thứ nhất có $a = 2$, $b = -3$, $c = 4$; phương trình thứ hai có $a = 1$, $b = 5$, $c = -1$. Máy cho $x = \\dfrac{17}{13}$, $y = -\\dfrac{6}{13}$.',
    },
  ],
  takeaways: [
    'Nghiệm của hệ phải thoả mãn cả hai phương trình; luôn thử lại vào cả hai.',
    'Có một ẩn với hệ số $\\pm 1$ thì dùng phương pháp thế; các hệ số đều khác $\\pm 1$ thì dùng phương pháp cộng đại số.',
    'Khử ẩn được $0x = k$: $k \\ne 0$ thì hệ vô nghiệm, $k = 0$ thì hệ có vô số nghiệm.',
    'Bài toán tìm tham số để cặp số là nghiệm, hay tìm đường thẳng qua hai điểm, đều dẫn về giải một hệ hai phương trình.',
  ],
};
