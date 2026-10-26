/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về biểu thức đại số và đa thức một biến: tính giá trị của biểu thức, thu gọn và sắp xếp đa thức, tìm bậc, hệ số, nghiệm, cộng và trừ hai đa thức.',
  intro:
    'Bài luyện tập này ôn lại ba bài đầu của chương: Biểu thức đại số (Bài 24), Đa thức một biến (Bài 25), Phép cộng và phép trừ đa thức một biến (Bài 26). Em sẽ thay số vào biểu thức, thu gọn đa thức trước khi đọc bậc và các hệ số, kiểm tra nghiệm, rồi cộng, trừ các đa thức.',
  objectives: [
    'Viết biểu thức đại số cho một tình huống và tính giá trị của biểu thức khi biết giá trị của các biến.',
    'Thu gọn, sắp xếp đa thức; xác định bậc, hệ số cao nhất, hệ số tự do và kiểm tra nghiệm.',
    'Cộng, trừ hai đa thức một biến theo hàng ngang hoặc theo cột dọc.',
  ],
  sections: [
    {
      heading: 'Nhắc lại kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Giá trị của biểu thức',
              'Thay mỗi biến bằng giá trị cho trước (số âm đặt trong ngoặc) rồi thực hiện các phép tính.',
            ],
            [
              'Đa thức một biến',
              'Tổng các đơn thức của cùng một biến; mỗi đơn thức là một hạng tử.',
            ],
            [
              'Thu gọn, sắp xếp',
              'Cộng các hạng tử cùng bậc; viết theo lũy thừa giảm dần (hoặc tăng dần) của biến.',
            ],
            [
              'Bậc, hệ số',
              'Với đa thức thu gọn khác $0$: bậc là số mũ cao nhất; hệ số cao nhất là hệ số của hạng tử bậc cao nhất; hệ số tự do là hệ số của hạng tử bậc $0$.',
            ],
            ['Nghiệm', '$a$ là nghiệm của $P(x)$ khi $P(a) = 0$.'],
            [
              'Cộng, trừ đa thức',
              'Bỏ ngoặc (đổi dấu mọi hạng tử của đa thức bị trừ), nhóm và thu gọn các hạng tử cùng bậc; hoặc đặt các hạng tử cùng bậc thẳng cột.',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Lưu ý khi làm bài',
      blocks: [
        {
          type: 'list',
          items: [
            'Luôn thu gọn đa thức trước khi tìm bậc và các hệ số: các hạng tử bậc cao có thể triệt tiêu nhau.',
            'Hạng tử vắng mặt có hệ số $0$; nếu không có hạng tử bậc $0$ thì hệ số tự do bằng $0$.',
            'Khi thay số âm, viết trong ngoặc: tại $x = -2$, $-x^2 = -(-2)^2 = -4$.',
            'Khi trừ đa thức, đổi dấu tất cả các hạng tử của đa thức bị trừ, không chỉ hạng tử đầu.',
            'Có thể kiểm tra kết quả cộng, trừ bằng cách thay một giá trị của $x$ vào cả hai vế.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện trộn ngẫu nhiên',
    instruction:
      'Mỗi lượt có 12 câu trộn ngẫu nhiên từ Bài 24, Bài 25 và Bài 26. Đáp số luôn là số nguyên; nhập số âm với dấu trừ, ví dụ $-7$. Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng cho biết bài nào cần ôn thêm.',
  },
  examples: [
    {
      problem:
        'Cho $A(x) = 2x^4 - 5x^2 + x - 2x^4 + 3$. Thu gọn $A(x)$, tìm bậc, hệ số cao nhất, hệ số tự do và tính $A(-1)$.',
      steps: [
        'Thu gọn: $2x^4 - 2x^4 = 0$, nên $A(x) = -5x^2 + x + 3$.',
        'Bậc $2$, hệ số cao nhất $-5$, hệ số tự do $3$.',
        '$A(-1) = -5 \\cdot (-1)^2 + (-1) + 3 = -5 - 1 + 3 = -3$.',
      ],
      answer:
        '$A(x) = -5x^2 + x + 3$; bậc $2$; hệ số cao nhất $-5$; hệ số tự do $3$; $A(-1) = -3$.',
    },
    {
      problem:
        'Cho $P(x) = x^3 - 2x^2 + 4$ và $Q(x) = -x^3 + 3x - 1$. Tính $P(x) + Q(x)$ và $P(x) - Q(x)$.',
      steps: [
        '$P(x) + Q(x) = (x^3 - x^3) - 2x^2 + 3x + (4 - 1) = -2x^2 + 3x + 3$.',
        '$P(x) - Q(x) = x^3 - 2x^2 + 4 + x^3 - 3x + 1 = 2x^3 - 2x^2 - 3x + 5$.',
        'Kiểm tra tại $x = 1$: $P(1) = 3$, $Q(1) = 1$; $\\;-2 + 3 + 3 = 4 = 3 + 1$ và $2 - 2 - 3 + 5 = 2 = 3 - 1$.',
      ],
      answer: '$P(x) + Q(x) = -2x^2 + 3x + 3$; $\\;P(x) - Q(x) = 2x^3 - 2x^2 - 3x + 5$.',
    },
    {
      problem: 'Tìm $a$ để $x = 3$ là một nghiệm của đa thức $P(x) = 2x + a$.',
      steps: [
        '$x = 3$ là nghiệm khi $P(3) = 0$.',
        '$P(3) = 2 \\cdot 3 + a = 6 + a$, nên $6 + a = 0$.',
        '$a = -6$.',
      ],
      answer: '$a = -6$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $2x^2 - 3x + 4$ tại $x = -2$.',
      answer: 18,
      hints: ['$(-2)^2 = 4$ và $-3 \\cdot (-2) = 6$.'],
      solution: '$2 \\cdot (-2)^2 - 3 \\cdot (-2) + 4 = 8 + 6 + 4 = 18$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $3a - 2b + ab$ tại $a = 2$ và $b = -1$.',
      answer: 6,
      hints: ['Thay $a = 2$, $b = -1$; $ab = 2 \\cdot (-1)$.'],
      solution: '$3 \\cdot 2 - 2 \\cdot (-1) + 2 \\cdot (-1) = 6 + 2 - 2 = 6$.',
    },
    {
      type: 'choice',
      prompt:
        'Giá vé xem phim là $x$ nghìn đồng cho người lớn và $y$ nghìn đồng cho trẻ em. Một gia đình có $2$ người lớn và $3$ trẻ em đi xem phim. Biểu thức biểu thị số tiền mua vé (nghìn đồng) là',
      options: ['$3x + 2y$', '$2x + 3y$', '$5(x + y)$', '$6xy$'],
      answer: 1,
      hints: ['Tiền vé người lớn là số người lớn nhân với giá vé người lớn.'],
      solution: 'Tiền vé người lớn là $2x$, trẻ em là $3y$; tổng cộng $2x + 3y$ nghìn đồng.',
    },
    {
      type: 'number',
      prompt: 'Tìm bậc của đa thức $A(x) = 4x^3 - 2x + 5x^2 - 4x^3 + 1$.',
      answer: 2,
      hints: ['Thu gọn trước: hai hạng tử bậc $3$ có tổng bằng bao nhiêu?'],
      solution: '$4x^3 - 4x^3 = 0$, nên $A(x) = 5x^2 - 2x + 1$, có bậc $2$.',
    },
    {
      type: 'number',
      prompt: 'Tìm hệ số cao nhất của đa thức $A(x) = 4x^3 - 2x + 5x^2 - 4x^3 + 1$.',
      answer: 5,
      hints: ['Hệ số cao nhất là hệ số của hạng tử có bậc cao nhất sau khi thu gọn.'],
      solution: '$A(x) = 5x^2 - 2x + 1$, hạng tử bậc cao nhất là $5x^2$, hệ số cao nhất là $5$.',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các hạng tử của đa thức $3x^2 - 1 + x^4 - 2x$ theo lũy thừa tăng dần của biến.',
      items: ['$3x^2$', '$-1$', '$x^4$', '$-2x$'],
      answer: [1, 3, 0, 2],
      hints: ['Tăng dần: bắt đầu từ hạng tử bậc $0$.'],
      solution:
        'Bậc của các hạng tử: $-1$ bậc $0$, $-2x$ bậc $1$, $3x^2$ bậc $2$, $x^4$ bậc $4$. Ta được $-1 - 2x + 3x^2 + x^4$.',
    },
    {
      type: 'multi',
      prompt: 'Trong các số $0$; $1$; $2$; $3$, những số nào là nghiệm của đa thức $x^2 - 3x + 2$?',
      options: ['$0$', '$1$', '$2$', '$3$'],
      answers: [1, 2],
      hints: ['Tính giá trị của đa thức tại từng số.'],
      solution:
        'Tại $0$: $2$; tại $1$: $1 - 3 + 2 = 0$; tại $2$: $4 - 6 + 2 = 0$; tại $3$: $9 - 9 + 2 = 2$. Vậy $1$ và $2$ là nghiệm.',
    },
    {
      type: 'number',
      prompt: 'Tìm $a$ để $x = -2$ là một nghiệm của đa thức $P(x) = ax + 6$.',
      answer: 3,
      hints: ['$x = -2$ là nghiệm khi $P(-2) = 0$.', '$P(-2) = -2a + 6$.'],
      solution: '$P(-2) = -2a + 6 = 0$, nên $2a = 6$, $a = 3$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho $P(x) = 3x^3 - 2x^2 + x - 5$ và $Q(x) = -3x^3 + 4x^2 + 2$. Tổng $P(x) + Q(x)$ bằng',
      options: ['$2x^2 + x - 3$', '$6x^3 + 2x^2 + x - 3$', '$2x^2 + x - 7$', '$-6x^2 + x - 3$'],
      answer: 0,
      hints: ['Cộng từng cặp hạng tử cùng bậc; hai hạng tử bậc $3$ triệt tiêu.'],
      solution: '$(3x^3 - 3x^3) + (-2x^2 + 4x^2) + x + (-5 + 2) = 2x^2 + x - 3$.',
    },
    {
      type: 'choice',
      prompt:
        'Với $P(x) = 3x^3 - 2x^2 + x - 5$ và $Q(x) = -3x^3 + 4x^2 + 2$, hiệu $P(x) - Q(x)$ bằng',
      options: [
        '$2x^2 + x - 3$',
        '$6x^3 + 2x^2 + x - 3$',
        '$6x^3 - 6x^2 + x - 7$',
        '$6x^3 - 6x^2 + x - 3$',
      ],
      answer: 2,
      hints: ['Đổi dấu tất cả các hạng tử của $Q(x)$: $-Q(x) = 3x^3 - 4x^2 - 2$.'],
      solution: '$3x^3 - 2x^2 + x - 5 + 3x^3 - 4x^2 - 2 = 6x^3 - 6x^2 + x - 7$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho $P(x) = x^2 + 2x - 1$ và $Q(x) = 3x - 4$. Đa thức $R(x)$ thỏa mãn $P(x) - R(x) = Q(x)$ là',
      options: ['$x^2 + 5x - 5$', '$x^2 - x + 3$', '$x^2 - x - 5$', '$-x^2 + x - 3$'],
      answer: 1,
      hints: ['Từ $P - R = Q$ suy ra $R = P - Q$.'],
      solution: '$R(x) = x^2 + 2x - 1 - 3x + 4 = x^2 - x + 3$.',
    },
  ],
  takeaways: [
    'Thay số âm vào biến thì đặt trong ngoặc, tính lũy thừa trước rồi đến nhân chia, cộng trừ.',
    'Thu gọn đa thức trước khi tìm bậc, hệ số cao nhất và hệ số tự do.',
    '$a$ là nghiệm của $P(x)$ khi $P(a) = 0$; tìm tham số để $a$ là nghiệm bằng cách giải $P(a) = 0$.',
    'Cộng, trừ đa thức: nhóm các hạng tử cùng bậc; khi trừ, đổi dấu mọi hạng tử của đa thức bị trừ.',
  ],
};
