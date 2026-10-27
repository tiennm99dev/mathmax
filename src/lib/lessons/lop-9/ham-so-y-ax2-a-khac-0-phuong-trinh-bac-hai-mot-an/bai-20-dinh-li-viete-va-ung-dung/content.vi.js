/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Định lí Viète về tổng và tích hai nghiệm của phương trình bậc hai, nhẩm nghiệm khi a + b + c = 0 hoặc a − b + c = 0, tìm hai số biết tổng và tích.',
  intro:
    'Phương trình $x^2 - 5x + 6 = 0$ có hai nghiệm $2$ và $3$. Để ý: $2 + 3 = 5$ và $2 \\cdot 3 = 6$, đúng bằng hai hệ số của phương trình (đổi dấu số $-5$). Đây không phải trùng hợp: nhà toán học Pháp François Viète (1540 – 1603) đã phát hiện mối liên hệ giữa các nghiệm và các hệ số của phương trình bậc hai.',
  objectives: [
    'Phát biểu và vận dụng định lí Viète: tính tổng và tích hai nghiệm mà không cần giải phương trình.',
    'Nhẩm nghiệm phương trình bậc hai trong các trường hợp $a + b + c = 0$ và $a - b + c = 0$.',
    'Tìm hai số khi biết tổng và tích của chúng.',
  ],
  sections: [
    {
      heading: 'Định lí Viète',
      blocks: [
        {
          type: 'p',
          text: 'Giả sử phương trình $ax^2 + bx + c = 0$ $(a \\ne 0)$ có hai nghiệm $x_1 = \\dfrac{-b + \\sqrt{\\Delta}}{2a}$ và $x_2 = \\dfrac{-b - \\sqrt{\\Delta}}{2a}$ (khi $\\Delta = 0$, hai nghiệm trùng nhau). Cộng và nhân hai nghiệm, ta được $$x_1 + x_2 = \\dfrac{-2b}{2a} = -\\dfrac{b}{a},$$ $$x_1 x_2 = \\dfrac{b^2 - \\Delta}{4a^2} = \\dfrac{4ac}{4a^2} = \\dfrac{c}{a}.$$',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí Viète',
          text: 'Nếu $x_1$, $x_2$ là hai nghiệm của phương trình $ax^2 + bx + c = 0$ $(a \\ne 0)$ thì $$x_1 + x_2 = -\\dfrac{b}{a}, \\qquad x_1 x_2 = \\dfrac{c}{a}.$$',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Chỉ áp dụng định lí Viète khi phương trình có nghiệm, tức là $\\Delta \\ge 0$ (hoặc $ac < 0$). Phương trình $x^2 + x + 3 = 0$ có $\\Delta = -11 < 0$, nên không thể nói "tổng hai nghiệm bằng $-1$".',
        },
        {
          type: 'p',
          text: 'Nhờ định lí Viète, ta tính được giá trị các biểu thức đối xứng của hai nghiệm mà không cần giải phương trình, chẳng hạn $x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2$ và $\\dfrac{1}{x_1} + \\dfrac{1}{x_2} = \\dfrac{x_1 + x_2}{x_1 x_2}$.',
        },
      ],
    },
    {
      heading: 'Nhẩm nghiệm của phương trình bậc hai',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhẩm nghiệm',
          text: 'Xét phương trình $ax^2 + bx + c = 0$ $(a \\ne 0)$.',
        },
        {
          type: 'list',
          items: [
            'Nếu $a + b + c = 0$ thì phương trình có một nghiệm là $x_1 = 1$, nghiệm còn lại là $x_2 = \\dfrac{c}{a}$.',
            'Nếu $a - b + c = 0$ thì phương trình có một nghiệm là $x_1 = -1$, nghiệm còn lại là $x_2 = -\\dfrac{c}{a}$.',
          ],
        },
        {
          type: 'p',
          text: 'Thật vậy, $a + b + c$ là giá trị của $ax^2 + bx + c$ tại $x = 1$, nên $a + b + c = 0$ nghĩa là $1$ là một nghiệm; nghiệm kia suy ra từ $x_1 x_2 = \\dfrac{c}{a}$. Tương tự, $a - b + c$ là giá trị tại $x = -1$.',
        },
        {
          type: 'p',
          text: 'Biết trước một nghiệm, ta cũng tìm được nghiệm kia nhờ tổng hoặc tích. Ví dụ $x^2 - 5x + 6 = 0$ có nghiệm $x_1 = 2$ thì $x_2 = 5 - 2 = 3$.',
        },
      ],
    },
    {
      heading: 'Tìm hai số biết tổng và tích của chúng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tìm hai số biết tổng và tích',
          text: 'Nếu hai số có tổng bằng $S$ và tích bằng $P$ thì hai số đó là hai nghiệm của phương trình $$x^2 - Sx + P = 0.$$ Điều kiện để có hai số đó là $S^2 - 4P \\ge 0$.',
        },
        {
          type: 'p',
          text: 'Thật vậy, nếu hai số $u$, $v$ có $u + v = S$, $uv = P$ thì $u^2 - Su + P = u^2 - (u + v)u + uv = 0$, tức $u$ là nghiệm; tương tự với $v$. Phương trình này có nghiệm khi $\\Delta = S^2 - 4P \\ge 0$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo hai nghiệm, xem phương trình thay đổi',
    instruction:
      'Kéo hai điểm $x_1$, $x_2$ trên trục hoành (hoặc chọn rồi dùng phím mũi tên). Phương trình $a(x - x_1)(x - x_2) = 0$ có đúng hai nghiệm đó; quan sát tổng $x_1 + x_2$ luôn bằng $-\\dfrac{b}{a}$ và tích $x_1 x_2$ luôn bằng $\\dfrac{c}{a}$, với mọi $a$. Làm lần lượt các thử thách.',
  },
  examples: [
    {
      problem:
        'Không giải phương trình $2x^2 - 9x + 2 = 0$, hãy tính tổng, tích hai nghiệm và $x_1^2 + x_2^2$.',
      steps: [
        '$\\Delta = (-9)^2 - 4 \\cdot 2 \\cdot 2 = 65 > 0$ nên phương trình có hai nghiệm phân biệt.',
        'Theo định lí Viète: $x_1 + x_2 = -\\dfrac{-9}{2} = \\dfrac{9}{2}$, $x_1 x_2 = \\dfrac{2}{2} = 1$.',
        '$x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2 = \\dfrac{81}{4} - 2 = \\dfrac{73}{4}$.',
      ],
      answer: '$x_1 + x_2 = \\dfrac{9}{2}$, $x_1 x_2 = 1$, $x_1^2 + x_2^2 = \\dfrac{73}{4}$.',
    },
    {
      problem: 'Nhẩm nghiệm các phương trình: a) $3x^2 - 7x + 4 = 0$; b) $2x^2 + 5x + 3 = 0$.',
      steps: [
        'a) $a + b + c = 3 + (-7) + 4 = 0$, nên $x_1 = 1$, $x_2 = \\dfrac{c}{a} = \\dfrac{4}{3}$.',
        'b) $a - b + c = 2 - 5 + 3 = 0$, nên $x_1 = -1$, $x_2 = -\\dfrac{c}{a} = -\\dfrac{3}{2}$.',
      ],
      answer: 'a) $x_1 = 1$, $x_2 = \\dfrac{4}{3}$; b) $x_1 = -1$, $x_2 = -\\dfrac{3}{2}$.',
    },
    {
      problem:
        'Một mảnh vườn hình chữ nhật có chu vi $28$ m và diện tích $48$ m². Tính chiều dài và chiều rộng của mảnh vườn.',
      steps: [
        'Nửa chu vi là $14$ m, nên chiều dài và chiều rộng có tổng $S = 14$ và tích $P = 48$.',
        '$S^2 - 4P = 196 - 192 = 4 \\ge 0$; hai cạnh là nghiệm của $x^2 - 14x + 48 = 0$.',
        "$\\Delta' = (-7)^2 - 48 = 1$, nên $x_1 = 7 + 1 = 8$, $x_2 = 7 - 1 = 6$.",
      ],
      answer: 'Chiều dài $8$ m, chiều rộng $6$ m.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính tổng hai nghiệm của phương trình $3x^2 + 6x - 5 = 0$.',
      answer: -2,
      hints: [
        '$a$ và $c$ trái dấu nên phương trình có hai nghiệm.',
        '$x_1 + x_2 = -\\dfrac{b}{a}$.',
      ],
      solution:
        '$ac = -15 < 0$ nên phương trình có hai nghiệm, và $x_1 + x_2 = -\\dfrac{6}{3} = -2$.',
    },
    {
      type: 'number',
      prompt: 'Tính tích hai nghiệm của phương trình $2x^2 - 11x + 5 = 0$.',
      answer: 2.5,
      hints: ['Kiểm tra $\\Delta \\ge 0$ trước.', '$x_1 x_2 = \\dfrac{c}{a}$.'],
      solution: '$\\Delta = 121 - 40 = 81 > 0$; $x_1 x_2 = \\dfrac{5}{2} = 2{,}5$.',
    },
    {
      type: 'choice',
      prompt: 'Tổng hai nghiệm của phương trình $x^2 + x + 3 = 0$ bằng bao nhiêu?',
      options: ['$-1$', '$1$', '$3$', 'Phương trình vô nghiệm nên không có tổng hai nghiệm'],
      answer: 3,
      hints: ['Định lí Viète chỉ dùng được khi phương trình có nghiệm.'],
      solution:
        '$\\Delta = 1 - 12 = -11 < 0$: phương trình vô nghiệm, không thể áp dụng định lí Viète.',
    },
    {
      type: 'number',
      prompt:
        'Phương trình $5x^2 - 3x - 2 = 0$ có một nghiệm $x_1 = 1$. Tìm nghiệm còn lại (dạng số thập phân).',
      answer: -0.4,
      hints: ['$a + b + c = 0$.', '$x_2 = \\dfrac{c}{a}$.'],
      solution:
        '$a + b + c = 5 - 3 - 2 = 0$ nên $x_1 = 1$, $x_2 = \\dfrac{c}{a} = -\\dfrac{2}{5} = -0{,}4$.',
    },
    {
      type: 'number',
      prompt: 'Nhẩm nghiệm phương trình $x^2 + 7x + 6 = 0$. Nhập nghiệm nhỏ hơn.',
      answer: -6,
      hints: ['Tính $a - b + c$.'],
      solution:
        '$a - b + c = 1 - 7 + 6 = 0$ nên $x_1 = -1$, $x_2 = -\\dfrac{c}{a} = -6$. Nghiệm nhỏ hơn là $-6$.',
    },
    {
      type: 'number',
      prompt: 'Phương trình $x^2 - 5x + m = 0$ có một nghiệm bằng $2$. Tìm nghiệm còn lại.',
      answer: 3,
      hints: ['Dùng tổng hai nghiệm: $x_1 + x_2 = 5$.'],
      solution:
        '$x_1 + x_2 = -\\dfrac{-5}{1} = 5$ nên $x_2 = 5 - 2 = 3$ (khi đó $m = x_1 x_2 = 6$).',
    },
    {
      type: 'number',
      prompt:
        'Gọi $x_1$, $x_2$ là hai nghiệm của phương trình $x^2 - 4x + 1 = 0$. Tính $x_1^2 + x_2^2$.',
      answer: 14,
      hints: ['$x_1^2 + x_2^2 = (x_1 + x_2)^2 - 2x_1 x_2$.'],
      solution:
        "$\\Delta' = 4 - 1 = 3 > 0$. $x_1 + x_2 = 4$, $x_1 x_2 = 1$, nên $x_1^2 + x_2^2 = 4^2 - 2 \\cdot 1 = 14$.",
    },
    {
      type: 'number',
      prompt:
        'Gọi $x_1$, $x_2$ là hai nghiệm của phương trình $x^2 - 6x + 4 = 0$. Tính $\\dfrac{1}{x_1} + \\dfrac{1}{x_2}$.',
      answer: 1.5,
      hints: ['Quy đồng: $\\dfrac{1}{x_1} + \\dfrac{1}{x_2} = \\dfrac{x_1 + x_2}{x_1 x_2}$.'],
      solution:
        "$\\Delta' = 9 - 4 = 5 > 0$. $x_1 + x_2 = 6$, $x_1 x_2 = 4$, nên $\\dfrac{1}{x_1} + \\dfrac{1}{x_2} = \\dfrac{6}{4} = 1{,}5$.",
    },
    {
      type: 'choice',
      prompt: 'Hai số có tổng bằng $5$ và tích bằng $6$ là hai nghiệm của phương trình nào?',
      options: [
        '$x^2 + 5x + 6 = 0$',
        '$x^2 - 5x + 6 = 0$',
        '$x^2 - 6x + 5 = 0$',
        '$x^2 + 5x - 6 = 0$',
      ],
      answer: 1,
      hints: ['Phương trình có dạng $x^2 - Sx + P = 0$.'],
      solution: '$S = 5$, $P = 6$: phương trình $x^2 - 5x + 6 = 0$ (hai số là $2$ và $3$).',
    },
    {
      type: 'number',
      prompt: 'Tìm hai số biết tổng của chúng bằng $10$ và tích bằng $21$. Nhập số lớn hơn.',
      answer: 7,
      hints: ['Giải $x^2 - 10x + 21 = 0$.'],
      solution:
        "$\\Delta' = 25 - 21 = 4$; $x_1 = 5 + 2 = 7$, $x_2 = 5 - 2 = 3$. Số lớn hơn là $7$.",
    },
    {
      type: 'choice',
      prompt: 'Có tồn tại hai số có tổng bằng $4$ và tích bằng $5$ không?',
      options: ['Có, đó là $1$ và $5$', 'Có, đó là $2$ và $2$', 'Không, vì $S^2 - 4P < 0$'],
      answer: 2,
      hints: ['Kiểm tra điều kiện $S^2 - 4P \\ge 0$.'],
      solution:
        '$S^2 - 4P = 16 - 20 = -4 < 0$: phương trình $x^2 - 4x + 5 = 0$ vô nghiệm, nên không có hai số như vậy. ($1 + 5 = 6$ và $2 \\cdot 2 = 4$ đều không thoả mãn.)',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh đất hình chữ nhật có chu vi $30$ m và diện tích $56$ m². Tính chiều dài của mảnh đất.',
      answer: 8,
      unit: 'm',
      hints: ['Chiều dài và chiều rộng có tổng $15$ và tích $56$.', 'Giải $x^2 - 15x + 56 = 0$.'],
      solution:
        '$S = 15$, $P = 56$; $x^2 - 15x + 56 = 0$ có $\\Delta = 225 - 224 = 1$, $x_1 = \\dfrac{15 + 1}{2} = 8$, $x_2 = \\dfrac{15 - 1}{2} = 7$. Chiều dài $8$ m (chiều rộng $7$ m).',
    },
  ],
  takeaways: [
    'Phương trình có nghiệm thì $x_1 + x_2 = -\\dfrac{b}{a}$, $x_1 x_2 = \\dfrac{c}{a}$.',
    '$a + b + c = 0$: nghiệm $1$ và $\\dfrac{c}{a}$; $a - b + c = 0$: nghiệm $-1$ và $-\\dfrac{c}{a}$.',
    'Hai số có tổng $S$, tích $P$ là nghiệm của $x^2 - Sx + P = 0$, với điều kiện $S^2 - 4P \\ge 0$.',
  ],
};
