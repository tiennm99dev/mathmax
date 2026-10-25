/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hàm số bậc nhất y = ax + b, đồ thị của nó là một đường thẳng, vai trò của hệ số a và b, và cách vẽ đồ thị bằng hai điểm.',
  intro:
    'Một chiếc taxi tính $12$ nghìn đồng mở cửa và $15$ nghìn đồng mỗi ki-lô-mét: số tiền $y$ phụ thuộc quãng đường $x$ theo công thức $y = 15x + 12$. Những hàm số dạng $y = ax + b$ như vậy gọi là hàm số bậc nhất, và đồ thị của chúng luôn là một đường thẳng.',
  objectives: [
    'Nhận biết hàm số bậc nhất $y = ax + b$ với $a \\ne 0$ và chỉ ra các hệ số $a$, $b$.',
    'Biết đồ thị hàm số bậc nhất là một đường thẳng cắt trục tung tại điểm có tung độ $b$.',
    'Vẽ đồ thị hàm số bậc nhất bằng cách xác định hai điểm thuộc đồ thị.',
    'Nhận ra ảnh hưởng của dấu của $a$ tới hướng của đường thẳng.',
  ],
  sections: [
    {
      heading: 'Hàm số bậc nhất',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hàm số bậc nhất',
          text: 'Hàm số bậc nhất là hàm số cho bởi công thức $y = ax + b$, trong đó $a$, $b$ là các số cho trước và $a \\ne 0$.',
        },
        {
          type: 'list',
          items: [
            '$y = 3x - 1$ là hàm số bậc nhất với $a = 3$, $b = -1$.',
            '$y = -\\dfrac{1}{2}x$ là hàm số bậc nhất với $a = -\\dfrac{1}{2}$, $b = 0$.',
            '$y = 0 \\cdot x + 5$ không phải hàm số bậc nhất vì $a = 0$.',
            '$y = x^2 + 1$ không phải hàm số bậc nhất vì có $x^2$.',
          ],
        },
      ],
    },
    {
      heading: 'Đồ thị của hàm số bậc nhất',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đồ thị của hàm số $y = ax + b$ ($a \\ne 0$) là một đường thẳng cắt trục tung tại điểm $(0; b)$. Khi $b = 0$, đường thẳng đi qua gốc toạ độ $O$.',
        },
        {
          type: 'p',
          text: 'Hệ số $a$ quyết định độ nghiêng: khi $x$ tăng $1$ đơn vị thì $y$ thay đổi $a$ đơn vị. Nếu $a > 0$, đường thẳng đi lên từ trái sang phải; nếu $a < 0$, đường thẳng đi xuống. Hệ số $b$ cho biết đường thẳng cắt trục tung ở đâu.',
        },
        {
          type: 'table',
          head: ['Hệ số', 'Ý nghĩa trên đồ thị'],
          rows: [
            ['$a > 0$', 'Đường thẳng đi lên từ trái sang phải'],
            ['$a < 0$', 'Đường thẳng đi xuống từ trái sang phải'],
            ['$b$', 'Tung độ giao điểm với trục $Oy$'],
          ],
        },
      ],
    },
    {
      heading: 'Cách vẽ đồ thị',
      blocks: [
        {
          type: 'p',
          text: 'Qua hai điểm phân biệt chỉ có một đường thẳng, nên em chỉ cần tìm hai điểm thuộc đồ thị rồi nối chúng.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Cho $x = 0$ thì $y = b$: được điểm $(0; b)$ trên trục tung.',
            'Cho $y = 0$ thì $x = -\\dfrac{b}{a}$: được điểm $\\left(-\\dfrac{b}{a}; 0\\right)$ trên trục hoành. (Nếu $b = 0$, chọn thêm $x = 1$ để được điểm $(1; a)$.)',
            'Vẽ đường thẳng đi qua hai điểm vừa tìm.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Đường thẳng y = ax + b',
    instruction:
      'Kéo thanh trượt a và b, hoặc kéo trực tiếp hai điểm đỏ, để thấy đường thẳng nghiêng và dịch chuyển thế nào. Bật tam giác đo độ dốc để so sánh Δy với Δx.',
  },
  examples: [
    {
      problem: 'Vẽ đồ thị hàm số $y = 2x - 4$.',
      steps: [
        'Cho $x = 0$ thì $y = -4$: điểm $A(0; -4)$.',
        'Cho $y = 0$ thì $2x - 4 = 0$, $x = 2$: điểm $B(2; 0)$.',
        'Nối $A$ và $B$ được đường thẳng. Vì $a = 2 > 0$, đường thẳng đi lên.',
      ],
      answer: 'Đồ thị là đường thẳng đi qua $(0; -4)$ và $(2; 0)$.',
    },
    {
      problem: 'Điểm $M(-1; 5)$ có thuộc đồ thị hàm số $y = -3x + 2$ không?',
      steps: ['Thay $x = -1$: $y = -3 \\cdot (-1) + 2 = 5$.', 'Giá trị này bằng tung độ của $M$.'],
      answer: 'Có, $M(-1; 5)$ thuộc đồ thị.',
    },
    {
      problem: 'Tìm $b$ để đồ thị hàm số $y = 3x + b$ đi qua điểm $(1; 7)$.',
      steps: ['Thay $x = 1$, $y = 7$: $7 = 3 \\cdot 1 + b$.', 'Suy ra $b = 7 - 3$.'],
      answer: '$b = 4$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn tất cả các hàm số bậc nhất.',
      options: ['$y = 5x - 2$', '$y = 7$', '$y = -x$', '$y = 2x^2 + 1$', '$y = \\dfrac{x}{3} + 1$'],
      answers: [0, 2, 4],
      hints: ['Hàm số bậc nhất có dạng $y = ax + b$ với $a \\ne 0$.', '$y = 7$ có $a = 0$.'],
      solution:
        '$y = 5x - 2$, $y = -x$ và $y = \\dfrac{1}{3}x + 1$ là hàm số bậc nhất. $y = 7$ có $a = 0$; $y = 2x^2 + 1$ có $x^2$.',
    },
    {
      type: 'number',
      prompt: 'Đồ thị hàm số $y = -2x + 6$ cắt trục tung tại điểm có tung độ bằng bao nhiêu?',
      answer: 6,
      hints: ['Trên trục tung, $x = 0$.'],
      solution: 'Cho $x = 0$ thì $y = 6$. Giao điểm là $(0; 6)$.',
    },
    {
      type: 'number',
      prompt: 'Đồ thị hàm số $y = -2x + 6$ cắt trục hoành tại điểm có hoành độ bằng bao nhiêu?',
      answer: 3,
      hints: ['Trên trục hoành, $y = 0$.', 'Giải $-2x + 6 = 0$.'],
      solution: '$-2x + 6 = 0$ nên $x = 3$. Giao điểm là $(3; 0)$.',
    },
    {
      type: 'choice',
      prompt: 'Đường thẳng nào đi xuống từ trái sang phải?',
      options: ['$y = 4x - 1$', '$y = x + 10$', '$y = -\\dfrac{1}{2}x + 3$', '$y = 0{,}5x$'],
      answer: 2,
      hints: ['Hướng của đường thẳng phụ thuộc dấu của $a$.'],
      solution: 'Chỉ $y = -\\dfrac{1}{2}x + 3$ có $a < 0$, nên đường thẳng đi xuống.',
    },
    {
      type: 'number',
      prompt: 'Tìm $a$ để đồ thị hàm số $y = ax + 1$ đi qua điểm $(2; 7)$.',
      answer: 3,
      hints: ['Thay $x = 2$, $y = 7$ vào công thức.', '$7 = 2a + 1$.'],
      solution: '$7 = 2a + 1$ nên $2a = 6$, $a = 3$.',
    },
    {
      type: 'number',
      prompt:
        'Taxi tính tiền theo công thức $y = 15x + 12$ (nghìn đồng, $x$ là số ki-lô-mét). Đi $8$ km hết bao nhiêu nghìn đồng?',
      answer: 132,
      unit: 'nghìn đồng',
      hints: ['Thay $x = 8$ vào công thức.'],
      solution: '$y = 15 \\cdot 8 + 12 = 120 + 12 = 132$ nghìn đồng.',
    },
    {
      type: 'choice',
      prompt: 'Điểm nào thuộc đồ thị hàm số $y = 3x - 2$?',
      options: ['$(1; 2)$', '$(0; 2)$', '$(2; 4)$', '$(-1; 1)$'],
      answer: 2,
      hints: ['Thay hoành độ vào công thức rồi so với tung độ.'],
      solution: 'Với $x = 2$: $y = 3 \\cdot 2 - 2 = 4$, nên $(2; 4)$ thuộc đồ thị.',
    },
  ],
  takeaways: [
    'Hàm số bậc nhất có dạng $y = ax + b$ với $a \\ne 0$.',
    'Đồ thị là một đường thẳng cắt trục tung tại $(0; b)$; nếu $b = 0$ nó đi qua gốc toạ độ.',
    '$a > 0$: đường thẳng đi lên; $a < 0$: đường thẳng đi xuống.',
    'Vẽ đồ thị bằng hai điểm, thường là $(0; b)$ và $\\left(-\\dfrac{b}{a}; 0\\right)$.',
  ],
};
