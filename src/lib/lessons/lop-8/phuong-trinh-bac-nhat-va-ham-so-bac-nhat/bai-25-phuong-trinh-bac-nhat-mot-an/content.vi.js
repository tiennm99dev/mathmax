/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phương trình một ẩn và nghiệm của nó, phương trình bậc nhất một ẩn ax + b = 0, quy tắc chuyển vế, quy tắc nhân và cách giải phương trình đưa được về dạng ax + b = 0.',
  intro:
    'Một chiếc cân đĩa đang thăng bằng: đĩa trái có $3$ hộp giống nhau và $2$ quả cân $1$ kg, đĩa phải có $11$ quả cân $1$ kg. Mỗi hộp nặng bao nhiêu? Gọi khối lượng một hộp là $x$ kg, ta có $3x + 2 = 11$. Đó là một phương trình, và bài này dạy em cách giải nó.',
  objectives: [
    'Nhận biết phương trình một ẩn, vế trái, vế phải và nghiệm của phương trình.',
    'Nhận biết phương trình bậc nhất một ẩn $ax + b = 0$ $(a \\ne 0)$.',
    'Dùng quy tắc chuyển vế và quy tắc nhân để giải phương trình bậc nhất một ẩn.',
    'Giải các phương trình đưa được về dạng $ax + b = 0$.',
  ],
  sections: [
    {
      heading: 'Phương trình một ẩn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phương trình một ẩn',
          text: 'Phương trình ẩn $x$ là hệ thức có dạng $A(x) = B(x)$, trong đó $A(x)$ là vế trái, $B(x)$ là vế phải; hai vế là hai biểu thức của cùng một biến $x$.',
        },
        {
          type: 'p',
          text: 'Nếu khi thay $x = x_0$ mà hai vế có giá trị bằng nhau thì $x_0$ gọi là một nghiệm của phương trình. Giải phương trình là tìm tất cả các nghiệm của nó.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $2x + 1 = x + 4$ là phương trình ẩn $x$. Thay $x = 3$: vế trái $2 \\cdot 3 + 1 = 7$, vế phải $3 + 4 = 7$. Hai vế bằng nhau nên $x = 3$ là một nghiệm. Thay $x = 1$: vế trái $3$, vế phải $5$, nên $x = 1$ không phải là nghiệm.',
        },
      ],
    },
    {
      heading: 'Phương trình bậc nhất một ẩn và cách giải',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phương trình bậc nhất một ẩn',
          text: 'Phương trình dạng $ax + b = 0$, với $a$ và $b$ là hai số đã cho và $a \\ne 0$, được gọi là phương trình bậc nhất một ẩn.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $2x - 6 = 0$ (với $a = 2$, $b = -6$) và $-x + 0{,}5 = 0$ là phương trình bậc nhất một ẩn; $0x + 3 = 0$ và $x^2 - 4 = 0$ thì không.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc chuyển vế',
          text: 'Trong một phương trình, ta có thể chuyển một hạng tử từ vế này sang vế kia và đổi dấu hạng tử đó.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc nhân với một số',
          text: 'Trong một phương trình, ta có thể nhân (hoặc chia) cả hai vế với cùng một số khác $0$.',
        },
        {
          type: 'p',
          text: 'Trên cân đĩa, chuyển vế giống như bớt cùng một thứ ở cả hai đĩa, còn nhân hay chia hai vế giống như chia mỗi đĩa thành những phần bằng nhau: cân vẫn thăng bằng.',
        },
        { type: 'widget', name: 'solve-steps' },
        {
          type: 'p',
          text: 'Áp dụng hai quy tắc, phương trình $ax + b = 0$ $(a \\ne 0)$ được giải như sau:',
        },
        {
          type: 'tex',
          tex: 'ax + b = 0 \\;\\Leftrightarrow\\; ax = -b \\;\\Leftrightarrow\\; x = -\\dfrac{b}{a}',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Phương trình bậc nhất một ẩn $ax + b = 0$ $(a \\ne 0)$ luôn có một nghiệm duy nhất $x = -\\dfrac{b}{a}$.',
        },
      ],
    },
    {
      heading: 'Phương trình đưa được về dạng ax + b = 0',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Nếu có mẫu, quy đồng mẫu hai vế rồi nhân hai vế với mẫu chung để khử mẫu.',
            'Bỏ dấu ngoặc (nhân phân phối, chú ý dấu trừ trước ngoặc).',
            'Chuyển các hạng tử chứa ẩn sang một vế, các hằng số sang vế kia, rồi thu gọn.',
            'Giải phương trình $ax = c$ nhận được và kết luận.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Khi chuyển một hạng tử sang vế kia, nhớ đổi dấu nó. Khi bỏ ngoặc có dấu trừ đứng trước, đổi dấu mọi hạng tử trong ngoặc: $-(x - 3) = -x + 3$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cân thăng bằng với hộp ẩn x',
    instruction:
      'Mỗi hộp nặng x, mỗi quả cân nặng 1. Bớt hộp hoặc quả cân, hoặc chia mỗi đĩa thành những phần bằng nhau, cho đến khi một đĩa chỉ còn một hộp x. Thử làm ở một đĩa thôi để xem cân lệch đi thế nào.',
  },
  examples: [
    {
      problem: 'Kiểm tra xem $x = 2$ có là nghiệm của phương trình $3x - 1 = x + 3$ không.',
      steps: [
        'Thay $x = 2$ vào vế trái: $3 \\cdot 2 - 1 = 5$.',
        'Thay $x = 2$ vào vế phải: $2 + 3 = 5$.',
        'Hai vế có cùng giá trị $5$.',
      ],
      answer: '$x = 2$ là nghiệm của phương trình.',
    },
    {
      problem: 'Giải phương trình $3x - 5 = 7 - x$.',
      steps: [
        'Chuyển $-x$ sang vế trái và $-5$ sang vế phải, đổi dấu: $3x + x = 7 + 5$.',
        'Thu gọn: $4x = 12$.',
        'Chia hai vế cho $4$: $x = 3$.',
      ],
      answer: 'Phương trình có nghiệm $x = 3$.',
    },
    {
      problem: 'Giải phương trình $3(x - 2) + 1 = x + 7$.',
      steps: [
        'Bỏ ngoặc: $3x - 6 + 1 = x + 7$, tức là $3x - 5 = x + 7$.',
        'Chuyển vế: $3x - x = 7 + 5$, nên $2x = 12$.',
        'Chia hai vế cho $2$: $x = 6$.',
      ],
      answer: 'Phương trình có nghiệm $x = 6$.',
    },
    {
      problem: 'Giải phương trình $\\dfrac{2x + 1}{3} - \\dfrac{x - 1}{2} = 1$.',
      steps: [
        'Mẫu chung là $6$. Nhân hai vế với $6$: $2(2x + 1) - 3(x - 1) = 6$.',
        'Bỏ ngoặc: $4x + 2 - 3x + 3 = 6$, tức là $x + 5 = 6$.',
        'Chuyển vế: $x = 6 - 5 = 1$.',
      ],
      answer: 'Phương trình có nghiệm $x = 1$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Phương trình nào là phương trình bậc nhất một ẩn?',
      options: ['$2x - 5 = 0$', '$0x + 3 = 0$', '$x^2 - 1 = 0$', '$\\dfrac{1}{x} + 2 = 0$'],
      answer: 0,
      hints: ['Phương trình bậc nhất một ẩn có dạng $ax + b = 0$ với $a \\ne 0$.'],
      solution:
        '$2x - 5 = 0$ có $a = 2 \\ne 0$. $0x + 3 = 0$ có $a = 0$; $x^2 - 1 = 0$ chứa $x^2$; $\\dfrac{1}{x} + 2 = 0$ có ẩn ở mẫu.',
    },
    {
      type: 'choice',
      prompt: '$x = -2$ là nghiệm của phương trình nào?',
      options: ['$3x + 6 = 0$', '$2x - 4 = 0$', '$x + 5 = 3x$', '$4 - x = 2$'],
      answer: 0,
      hints: ['Thay $x = -2$ vào hai vế của từng phương trình rồi so sánh.'],
      solution:
        'Với $x = -2$: $3 \\cdot (-2) + 6 = 0$, đúng. Các phương trình còn lại: $2 \\cdot (-2) - 4 = -8 \\ne 0$; $-2 + 5 = 3 \\ne -6$; $4 - (-2) = 6 \\ne 2$.',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $5x - 15 = 0$. Nhập nghiệm $x$.',
      answer: 3,
      hints: ['Chuyển $-15$ sang vế phải và đổi dấu.', '$5x = 15$.'],
      solution: '$5x - 15 = 0 \\Leftrightarrow 5x = 15 \\Leftrightarrow x = 3$.',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $7 - 2x = 0$. Nhập nghiệm $x$ (dạng số thập phân).',
      answer: 3.5,
      hints: ['Chuyển $7$ sang vế phải: $-2x = -7$.', 'Chia hai vế cho $-2$.'],
      solution:
        '$7 - 2x = 0 \\Leftrightarrow -2x = -7 \\Leftrightarrow x = \\dfrac{7}{2} = 3{,}5$.',
    },
    {
      type: 'fraction',
      prompt: 'Giải phương trình $3x + 2 = 0$. Nhập nghiệm dưới dạng phân số.',
      answer: [-2, 3],
      hints: ['Áp dụng $x = -\\dfrac{b}{a}$ với $a = 3$, $b = 2$.'],
      solution: '$3x + 2 = 0 \\Leftrightarrow 3x = -2 \\Leftrightarrow x = -\\dfrac{2}{3}$.',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $4x + 3 = x - 9$. Nhập nghiệm $x$.',
      answer: -4,
      hints: [
        'Chuyển $x$ sang vế trái, chuyển $3$ sang vế phải, nhớ đổi dấu.',
        '$4x - x = -9 - 3$.',
      ],
      solution: '$4x - x = -9 - 3 \\Leftrightarrow 3x = -12 \\Leftrightarrow x = -4$.',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $2(x - 1) = 3x + 4$. Nhập nghiệm $x$.',
      answer: -6,
      hints: ['Bỏ ngoặc trước: $2x - 2 = 3x + 4$.', 'Chuyển vế: $2x - 3x = 4 + 2$.'],
      solution:
        '$2x - 2 = 3x + 4 \\Leftrightarrow 2x - 3x = 4 + 2 \\Leftrightarrow -x = 6 \\Leftrightarrow x = -6$.',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $\\dfrac{x + 3}{4} = \\dfrac{x - 1}{2}$. Nhập nghiệm $x$.',
      answer: 5,
      hints: ['Nhân hai vế với $4$ để khử mẫu.', '$x + 3 = 2(x - 1)$.'],
      solution:
        'Nhân hai vế với $4$: $x + 3 = 2(x - 1) = 2x - 2$. Chuyển vế: $x - 2x = -2 - 3$, nên $-x = -5$, $x = 5$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước giải phương trình $3x - 7 = 2$ theo đúng thứ tự.',
      items: ['$x = 3$', '$3x = 9$', '$3x - 7 = 2$', '$3x = 2 + 7$'],
      answer: [2, 3, 1, 0],
      hints: ['Bước đầu tiên là phương trình đã cho; bước tiếp theo là chuyển vế.'],
      solution:
        '$3x - 7 = 2 \\Leftrightarrow 3x = 2 + 7 \\Leftrightarrow 3x = 9 \\Leftrightarrow x = 3$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $m$ để $x = 2$ là nghiệm của phương trình $mx + 4 = 10$.',
      answer: 3,
      hints: ['Thay $x = 2$ vào phương trình, em được một phương trình ẩn $m$.'],
      solution: 'Thay $x = 2$: $2m + 4 = 10 \\Leftrightarrow 2m = 6 \\Leftrightarrow m = 3$.',
    },
  ],
  takeaways: [
    'Phương trình ẩn $x$ có dạng $A(x) = B(x)$; $x_0$ là nghiệm khi hai vế bằng nhau tại $x = x_0$.',
    'Phương trình bậc nhất một ẩn: $ax + b = 0$ với $a \\ne 0$; nó có một nghiệm duy nhất $x = -\\dfrac{b}{a}$.',
    'Chuyển một hạng tử sang vế kia thì đổi dấu; nhân hay chia hai vế với cùng một số khác $0$.',
    'Phương trình có ngoặc, có mẫu: khử mẫu, bỏ ngoặc, chuyển vế, thu gọn về $ax = c$ rồi giải.',
  ],
};
