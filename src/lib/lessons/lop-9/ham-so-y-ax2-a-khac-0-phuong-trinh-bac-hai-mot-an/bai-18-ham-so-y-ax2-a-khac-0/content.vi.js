/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hàm số y = ax² với a khác 0: tính giá trị, đồ thị là parabol đỉnh O nhận trục Oy làm trục đối xứng, nằm trên hay dưới trục hoành tùy dấu của a.',
  intro:
    'Thả một hòn bi từ trên cao, quãng đường $s$ (mét) hòn bi rơi được sau $t$ giây được tính gần đúng bởi $s = 5t^2$. Diện tích hình vuông cạnh $x$ là $S = x^2$, diện tích hình tròn bán kính $R$ là $S = \\pi R^2$. Các công thức này có chung một dạng $y = ax^2$. Bài này tìm hiểu hàm số đó và đồ thị của nó, một đường cong gọi là parabol.',
  objectives: [
    'Nhận biết hàm số $y = ax^2$ $(a \\ne 0)$ và tính giá trị của hàm số tại một điểm.',
    'Lập bảng giá trị và vẽ đồ thị của hàm số $y = ax^2$ $(a \\ne 0)$.',
    'Nhận biết tính đối xứng của đồ thị và ảnh hưởng của hệ số $a$ đến đồ thị.',
  ],
  sections: [
    {
      heading: 'Hàm số y = ax² (a ≠ 0)',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hàm số',
          text: 'Hàm số $y = ax^2$ $(a \\ne 0)$ xác định với mọi giá trị của $x$ thuộc $\\mathbb{R}$.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn $y = 2x^2$ $(a = 2)$, $y = -\\dfrac{3}{2}x^2$ $\\left(a = -\\dfrac{3}{2}\\right)$, $s = 5t^2$ (biến là $t$, $a = 5$) đều là hàm số dạng $y = ax^2$ $(a \\ne 0)$. Còn $y = 3x^2 + 1$ hay $y = 2x$ thì không.',
        },
        {
          type: 'p',
          text: 'Để tính giá trị của hàm số tại $x = x_0$, ta thay $x_0$ vào công thức: $y_0 = a x_0^2$. Ví dụ với $y = 2x^2$: tại $x = -3$ thì $y = 2 \\cdot (-3)^2 = 18$; tại $x = 3$ cũng được $y = 18$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Hai giá trị đối nhau $x_0$ và $-x_0$ của biến luôn cho cùng một giá trị của hàm số, vì $a(-x_0)^2 = a x_0^2$. Với $a > 0$ thì $y \\ge 0$ với mọi $x$; với $a < 0$ thì $y \\le 0$ với mọi $x$; $y = 0$ chỉ khi $x = 0$.',
        },
      ],
    },
    {
      heading: 'Đồ thị của hàm số y = ax² (a ≠ 0)',
      blocks: [
        {
          type: 'p',
          text: 'Để vẽ đồ thị, ta lập bảng một số cặp giá trị tương ứng của $x$ và $y$, biểu diễn các điểm $(x; y)$ trên mặt phẳng toạ độ rồi nối chúng bằng một đường cong trơn.',
        },
        {
          type: 'table',
          head: ['$x$', '$-2$', '$-1$', '$0$', '$1$', '$2$'],
          rows: [
            ['$y = 2x^2$', '$8$', '$2$', '$0$', '$2$', '$8$'],
            [
              '$y = -\\dfrac{1}{2}x^2$',
              '$-2$',
              '$-\\dfrac{1}{2}$',
              '$0$',
              '$-\\dfrac{1}{2}$',
              '$-2$',
            ],
          ],
          caption: 'Bảng giá trị của hai hàm số $y = 2x^2$ và $y = -\\dfrac{1}{2}x^2$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Đồ thị',
          text: 'Đồ thị của hàm số $y = ax^2$ $(a \\ne 0)$ là một đường cong đi qua gốc toạ độ $O$ và nhận trục $Oy$ làm trục đối xứng. Đường cong đó được gọi là một parabol với đỉnh $O$.',
        },
        {
          type: 'list',
          items: [
            'Nếu $a > 0$ thì đồ thị nằm phía trên trục hoành, $O$ là điểm thấp nhất của đồ thị.',
            'Nếu $a < 0$ thì đồ thị nằm phía dưới trục hoành, $O$ là điểm cao nhất của đồ thị.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý khi vẽ',
          text: 'Vì đồ thị đối xứng qua $Oy$, ta chỉ cần tính giá trị với $x \\ge 0$ rồi lấy thêm các điểm đối xứng. Nên lấy ít nhất $5$ điểm: gốc $O$ và hai cặp điểm đối xứng nhau qua $Oy$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Điểm thuộc đồ thị',
          text: 'Điểm $M(x_0; y_0)$ thuộc đồ thị của hàm số $y = ax^2$ khi và chỉ khi $y_0 = a x_0^2$. Nhờ đó, biết một điểm $M$ (với $x_0 \\ne 0$) thuộc đồ thị, ta tìm được $a = \\dfrac{y_0}{x_0^2}$.',
        },
      ],
    },
    {
      heading: 'Ảnh hưởng của hệ số a',
      blocks: [
        {
          type: 'p',
          text: 'Dấu của $a$ quyết định parabol "quay lên" hay "quay xuống": hai đồ thị $y = ax^2$ và $y = -ax^2$ đối xứng nhau qua trục hoành.',
        },
        {
          type: 'p',
          text: 'Độ lớn $|a|$ quyết định độ "mở" của parabol: cùng một $x$, $|a|$ càng lớn thì $|y|$ càng lớn, nên parabol càng hẹp, càng sát trục $Oy$. Chẳng hạn tại $x = 2$: $y = 3x^2$ cho $y = 12$, còn $y = \\dfrac{1}{4}x^2$ chỉ cho $y = 1$.',
        },
        {
          type: 'table',
          head: ['Hệ số', 'Vị trí của parabol', 'Điểm $O$'],
          rows: [
            ['$a > 0$', 'Phía trên trục hoành', 'Điểm thấp nhất'],
            ['$a < 0$', 'Phía dưới trục hoành', 'Điểm cao nhất'],
            ['$|a|$ lớn', 'Hẹp, sát trục $Oy$', 'Vẫn là đỉnh'],
            ['$|a|$ nhỏ', 'Rộng, gần trục $Ox$', 'Vẫn là đỉnh'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Parabol y = ax² thay đổi theo a',
    instruction:
      'Kéo thanh trượt $a$ và quan sát parabol: đổi dấu $a$ thì parabol lật qua trục hoành, $|a|$ lớn thì parabol hẹp lại. Kéo điểm $M$ trên parabol (hoặc dùng phím mũi tên) để thấy điểm $M^{\\prime}$ đối xứng với nó qua $Oy$. Thử thách: chọn $a$ để parabol đi qua điểm $A$.',
  },
  examples: [
    {
      problem:
        'Cho hàm số $y = f(x) = -3x^2$. Tính $f(-2)$, $f\\left(\\dfrac{1}{3}\\right)$ và $f(0)$.',
      steps: [
        '$f(-2) = -3 \\cdot (-2)^2 = -3 \\cdot 4 = -12$.',
        '$f\\left(\\dfrac{1}{3}\\right) = -3 \\cdot \\left(\\dfrac{1}{3}\\right)^2 = -3 \\cdot \\dfrac{1}{9} = -\\dfrac{1}{3}$.',
        '$f(0) = -3 \\cdot 0^2 = 0$.',
      ],
      answer: '$f(-2) = -12$, $f\\left(\\dfrac{1}{3}\\right) = -\\dfrac{1}{3}$, $f(0) = 0$.',
    },
    {
      problem:
        'Xác định hệ số $a$ biết đồ thị của hàm số $y = ax^2$ đi qua điểm $A(-2; 2)$. Điểm $B(4; 8)$ có thuộc đồ thị đó không?',
      steps: [
        '$A(-2; 2)$ thuộc đồ thị nên $2 = a \\cdot (-2)^2 = 4a$.',
        'Suy ra $a = \\dfrac{2}{4} = \\dfrac{1}{2}$; hàm số là $y = \\dfrac{1}{2}x^2$.',
        'Thay $x = 4$: $\\dfrac{1}{2} \\cdot 4^2 = 8$, đúng bằng tung độ của $B$.',
      ],
      answer: '$a = \\dfrac{1}{2}$ và điểm $B(4; 8)$ thuộc đồ thị.',
    },
    {
      problem: 'Vẽ đồ thị của hàm số $y = \\dfrac{1}{2}x^2$.',
      steps: [
        'Lập bảng giá trị: $x = -4; -2; 0; 2; 4$ cho $y = 8; 2; 0; 2; 8$.',
        'Biểu diễn các điểm $(-4; 8)$, $(-2; 2)$, $O(0; 0)$, $(2; 2)$, $(4; 8)$ trên mặt phẳng toạ độ.',
        'Nối các điểm bằng một đường cong trơn, đối xứng qua trục $Oy$.',
        'Vì $a = \\dfrac{1}{2} > 0$ nên parabol nằm phía trên trục hoành, $O$ là điểm thấp nhất.',
      ],
      answer:
        'Đồ thị là parabol đỉnh $O$, đi qua các điểm $(\\pm 2; 2)$ và $(\\pm 4; 8)$, nằm phía trên trục hoành.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Cho hàm số $y = 0{,}5x^2$. Tính giá trị của $y$ tại $x = -4$.',
      answer: 8,
      hints: ['Thay $x = -4$ vào công thức.', 'Bình phương trước: $(-4)^2 = 16$.'],
      solution: '$y = 0{,}5 \\cdot (-4)^2 = 0{,}5 \\cdot 16 = 8$.',
    },
    {
      type: 'choice',
      prompt: 'Hàm số nào dưới đây có dạng $y = ax^2$ $(a \\ne 0)$?',
      options: ['$y = 3x + 1$', '$y = -\\dfrac{2}{5}x^2$', '$y = x^2 + 1$', '$y = 0 \\cdot x^2$'],
      answer: 1,
      hints: ['Công thức chỉ gồm một hạng tử $ax^2$ với hệ số $a$ khác $0$.'],
      solution:
        '$y = -\\dfrac{2}{5}x^2$ có dạng $y = ax^2$ với $a = -\\dfrac{2}{5} \\ne 0$. $y = 3x + 1$ là hàm số bậc nhất, $y = x^2 + 1$ có thêm hằng số $1$, còn $y = 0 \\cdot x^2$ có $a = 0$.',
    },
    {
      type: 'fraction',
      prompt:
        'Đồ thị của hàm số $y = ax^2$ đi qua điểm $M(3; 6)$. Tìm $a$ (nhập dưới dạng phân số tối giản).',
      answer: [2, 3],
      simplest: true,
      hints: ['Thay toạ độ của $M$ vào $y = ax^2$.', '$6 = a \\cdot 3^2 = 9a$.'],
      solution:
        '$M(3; 6)$ thuộc đồ thị nên $6 = a \\cdot 3^2 = 9a$, suy ra $a = \\dfrac{6}{9} = \\dfrac{2}{3}$.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng với đồ thị của hàm số $y = -4x^2$?',
      options: [
        'Nằm phía trên trục hoành, $O$ là điểm thấp nhất',
        'Nằm phía dưới trục hoành, $O$ là điểm cao nhất',
        'Nằm phía dưới trục hoành, $O$ là điểm thấp nhất',
        'Nhận trục $Ox$ làm trục đối xứng',
      ],
      answer: 1,
      hints: ['Xét dấu của hệ số $a$.'],
      solution:
        '$a = -4 < 0$ nên $y = -4x^2 \\le 0$ với mọi $x$: parabol nằm phía dưới trục hoành và $O$ là điểm cao nhất. Trục đối xứng là $Oy$, không phải $Ox$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các điểm thuộc đồ thị của hàm số $y = -2x^2$.',
      options: ['$(1; -2)$', '$(-1; 2)$', '$(-2; -8)$', '$(0{,}5; -0{,}5)$', '$(2; 8)$'],
      answers: [0, 2, 3],
      hints: [
        'Với mỗi điểm $(x_0; y_0)$, kiểm tra $y_0 = -2x_0^2$.',
        'Mọi điểm của đồ thị đều có tung độ không dương.',
      ],
      solution:
        '$-2 \\cdot 1^2 = -2$ ✓; $-2 \\cdot (-1)^2 = -2 \\ne 2$; $-2 \\cdot (-2)^2 = -8$ ✓; $-2 \\cdot 0{,}5^2 = -0{,}5$ ✓; $-2 \\cdot 2^2 = -8 \\ne 8$.',
    },
    {
      type: 'number',
      prompt:
        'Trên parabol $y = 2x^2$, tìm hoành độ của điểm có tung độ bằng $18$ và nằm bên trái trục tung.',
      answer: -3,
      hints: [
        'Giải $2x^2 = 18$.',
        '$x^2 = 9$ có hai nghiệm; điểm bên trái trục tung có hoành độ âm.',
      ],
      solution:
        '$2x^2 = 18 \\Rightarrow x^2 = 9 \\Rightarrow x = 3$ hoặc $x = -3$. Điểm bên trái trục tung có hoành độ $x = -3$.',
    },
    {
      type: 'choice',
      prompt:
        'Điểm $M(3; 4{,}5)$ thuộc parabol $y = \\dfrac{1}{2}x^2$. Điểm nào sau đây là điểm đối xứng với $M$ qua trục $Oy$ và cũng thuộc parabol?',
      options: ['$(3; -4{,}5)$', '$(-3; -4{,}5)$', '$(-3; 4{,}5)$', '$(4{,}5; 3)$'],
      answer: 2,
      hints: ['Đối xứng qua $Oy$: giữ tung độ, đổi dấu hoành độ.'],
      solution:
        'Điểm đối xứng với $M(3; 4{,}5)$ qua $Oy$ là $M^{\\prime}(-3; 4{,}5)$; thật vậy $\\dfrac{1}{2} \\cdot (-3)^2 = 4{,}5$.',
    },
    {
      type: 'choice',
      prompt: 'Trong các parabol sau, parabol nào hẹp nhất (sát trục $Oy$ nhất)?',
      options: ['$y = 0{,}5x^2$', '$y = -3x^2$', '$y = 2x^2$', '$y = x^2$'],
      answer: 1,
      hints: ['So sánh $|a|$ chứ không so sánh $a$.'],
      solution:
        'Các giá trị $|a|$ là $0{,}5$; $3$; $2$; $1$. Lớn nhất là $|-3| = 3$, nên $y = -3x^2$ hẹp nhất (dấu âm chỉ làm parabol quay xuống).',
    },
    {
      type: 'number',
      prompt:
        'Quãng đường rơi tự do của một vật được tính gần đúng bởi $s = 5t^2$ ($s$ tính bằng mét, $t$ tính bằng giây). Một vật rơi từ độ cao $125$ m thì sau bao nhiêu giây chạm đất?',
      answer: 5,
      unit: 's',
      hints: ['Giải $5t^2 = 125$ với $t > 0$.'],
      solution:
        '$5t^2 = 125 \\Rightarrow t^2 = 25 \\Rightarrow t = 5$ (vì $t > 0$). Vật chạm đất sau $5$ giây.',
    },
  ],
  takeaways: [
    'Hàm số $y = ax^2$ $(a \\ne 0)$ xác định với mọi $x$; $x$ và $-x$ cho cùng giá trị $y$.',
    'Đồ thị là parabol đỉnh $O$, nhận $Oy$ làm trục đối xứng.',
    '$a > 0$: parabol phía trên trục hoành, $O$ thấp nhất; $a < 0$: phía dưới, $O$ cao nhất.',
    '$|a|$ càng lớn, parabol càng hẹp; $M(x_0; y_0)$ thuộc đồ thị khi $y_0 = a x_0^2$.',
  ],
};
