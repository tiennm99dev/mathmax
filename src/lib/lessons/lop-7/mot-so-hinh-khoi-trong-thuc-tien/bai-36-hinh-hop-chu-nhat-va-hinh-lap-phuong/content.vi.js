/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hình hộp chữ nhật và hình lập phương: đỉnh, cạnh, mặt, đường chéo, công thức diện tích xung quanh và thể tích, vận dụng vào bài toán thực tế.',
  intro:
    'Hộp sữa, viên gạch, chiếc tủ lạnh, khối rubik đều có dạng hình hộp chữ nhật hoặc hình lập phương. Cần bao nhiêu giấy để dán kín bốn mặt xung quanh một chiếc hộp, và chiếc thùng chứa được bao nhiêu lít nước? Bài này giúp em trả lời những câu hỏi đó.',
  objectives: [
    'Nhận biết đỉnh, cạnh, mặt, mặt đáy, mặt bên và đường chéo của hình hộp chữ nhật, hình lập phương.',
    'Tính diện tích xung quanh và thể tích của hình hộp chữ nhật, hình lập phương.',
    'Giải một số bài toán thực tế gắn với diện tích xung quanh và thể tích của các hình này.',
  ],
  sections: [
    {
      heading: 'Hình hộp chữ nhật',
      blocks: [
        {
          type: 'p',
          text: "Hình hộp chữ nhật $ABCD.A'B'C'D'$ có hai mặt đáy là $ABCD$ và $A'B'C'D'$; bốn mặt còn lại $ABB'A'$, $BCC'B'$, $CDD'C'$, $DAA'D'$ là các mặt bên.",
        },
        {
          type: 'table',
          head: ['Yếu tố', 'Số lượng', 'Kể tên'],
          rows: [
            ['Đỉnh', '$8$', "$A, B, C, D, A', B', C', D'$"],
            ['Cạnh', '$12$', "$AB, BC, CD, DA$; $A'B', B'C', C'D', D'A'$; $AA', BB', CC', DD'$"],
            ['Mặt', '$6$', "$ABCD$, $A'B'C'D'$, $ABB'A'$, $BCC'B'$, $CDD'C'$, $DAA'D'$"],
            ['Đường chéo', '$4$', "$AC', BD', CA', DB'$"],
          ],
          caption: "Các yếu tố của hình hộp chữ nhật $ABCD.A'B'C'D'$",
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tính chất',
          text: "Hình hộp chữ nhật có $6$ mặt đều là hình chữ nhật. Các cạnh bên $AA'$, $BB'$, $CC'$, $DD'$ bằng nhau. Độ dài $AB$, $BC$, $AA'$ lần lượt là chiều dài, chiều rộng, chiều cao của hình hộp.",
        },
        {
          type: 'p',
          text: "Đường chéo nối hai đỉnh không cùng nằm trên một mặt, ví dụ $A$ và $C'$. Khi vẽ hình hộp chữ nhật, các cạnh bị khuất được vẽ bằng nét đứt.",
        },
      ],
    },
    {
      heading: 'Hình lập phương',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình lập phương',
          text: "Hình lập phương $ABCD.A'B'C'D'$ là hình hộp chữ nhật có $6$ mặt đều là hình vuông. Hình lập phương có $8$ đỉnh, $12$ cạnh bằng nhau, $6$ mặt và $4$ đường chéo.",
        },
        {
          type: 'p',
          text: 'Mỗi hình lập phương là một hình hộp chữ nhật đặc biệt, có chiều dài, chiều rộng và chiều cao bằng nhau.',
        },
        {
          type: 'p',
          text: 'Cắt rời một số cạnh rồi trải các mặt ra trên một mặt phẳng, ta được hình khai triển của hình hộp. Ngược lại, gấp hình khai triển theo các nếp gấp ta được hình hộp.',
        },
      ],
    },
    {
      heading: 'Diện tích xung quanh và thể tích',
      blocks: [
        {
          type: 'p',
          text: 'Diện tích xung quanh của một hình hộp là tổng diện tích các mặt bên. Trải bốn mặt bên của hình hộp chữ nhật thành một dải, ta được một hình chữ nhật có chiều dài bằng chu vi đáy $2(a + b)$ và chiều rộng bằng chiều cao $c$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hình hộp chữ nhật',
          text: 'Hình hộp chữ nhật có chiều dài $a$, chiều rộng $b$, chiều cao $c$: $$S_{xq} = 2(a + b)\\cdot c, \\qquad V = a\\cdot b\\cdot c.$$',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hình lập phương',
          text: 'Hình lập phương có cạnh $a$: $$S_{xq} = 4a^2, \\qquad V = a^3.$$',
        },
        {
          type: 'p',
          text: 'Thể tích $a \\cdot b \\cdot c$ (cùng đơn vị độ dài) cho biết hình hộp xếp được bao nhiêu hình lập phương đơn vị: $c$ lớp, mỗi lớp $a \\cdot b$ hình lập phương cạnh $1$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Tổng diện tích tất cả các mặt (gọi là diện tích toàn phần) bằng diện tích xung quanh cộng diện tích hai đáy: $S_{xq} + 2ab$. Đổi đơn vị thể tích: $1\\ \\text{dm}^3 = 1\\,000\\ \\text{cm}^3 = 1$ lít, $1\\ \\text{m}^3 = 1\\,000\\ \\text{dm}^3$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Các kích thước phải cùng đơn vị đo trước khi tính. Diện tích có đơn vị vuông ($\\text{cm}^2$), thể tích có đơn vị khối ($\\text{cm}^3$).',
        },
      ],
    },
  ],
  explore: {
    title: 'Xoay, trải phẳng và đo hình hộp',
    instruction:
      'Kéo để xoay hình, đổi ba kích thước bằng thanh trượt và kéo thanh "Trải phẳng" để mở hình hộp thành hình khai triển. Chọn một mặt để thấy nó trên hình và trên dải mặt bên; bật ô vuông $1$ cm để đếm số hình lập phương đơn vị.',
  },
  examples: [
    {
      problem:
        'Một hình hộp chữ nhật có chiều dài $6$ cm, chiều rộng $4$ cm và chiều cao $5$ cm. Tính diện tích xung quanh và thể tích của hình hộp.',
      steps: [
        'Áp dụng $S_{xq} = 2(a + b)\\cdot c$ với $a = 6$, $b = 4$, $c = 5$.',
        '$S_{xq} = 2\\cdot(6 + 4)\\cdot 5 = 100\\ (\\text{cm}^2)$.',
        '$V = a\\cdot b\\cdot c = 6\\cdot 4\\cdot 5 = 120\\ (\\text{cm}^3)$.',
      ],
      answer: '$S_{xq} = 100\\ \\text{cm}^2$, $V = 120\\ \\text{cm}^3$.',
    },
    {
      problem:
        'Một hình lập phương có diện tích xung quanh bằng $100\\ \\text{cm}^2$. Tính thể tích của hình lập phương đó.',
      steps: [
        'Gọi cạnh hình lập phương là $a$ (cm). Ta có $4a^2 = 100$, nên $a^2 = 25$.',
        'Vì $a > 0$ nên $a = 5$ cm.',
        '$V = a^3 = 5^3 = 125\\ (\\text{cm}^3)$.',
      ],
      answer: '$V = 125\\ \\text{cm}^3$.',
    },
    {
      problem:
        'Lòng trong của một thùng giữ nhiệt có dạng hình hộp chữ nhật dài $50$ cm, rộng $30$ cm, cao $30$ cm. Thùng chứa được bao nhiêu lít nước?',
      steps: [
        'Thể tích lòng thùng: $V = 50\\cdot 30\\cdot 30 = 45\\,000\\ (\\text{cm}^3)$.',
        'Đổi $45\\,000\\ \\text{cm}^3 = 45\\ \\text{dm}^3$, mà $1\\ \\text{dm}^3 = 1$ lít.',
      ],
      answer: 'Thùng chứa được $45$ lít nước.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hình hộp chữ nhật có bao nhiêu cạnh?',
      options: ['$6$', '$8$', '$12$', '$4$'],
      answer: 2,
      hints: ['Đếm cạnh của đáy dưới, đáy trên và các cạnh bên nối hai đáy.'],
      solution: 'Mỗi đáy có $4$ cạnh, cộng $4$ cạnh bên: $4 + 4 + 4 = 12$ cạnh.',
    },
    {
      type: 'text',
      prompt:
        "Hình hộp chữ nhật $ABCD.A'B'C'D'$ có bốn đường chéo. Viết tên đường chéo đi qua đỉnh $B$.",
      accept: ["BD'", "D'B", 'BD’', 'D’B', 'BD′', 'D′B'],
      hints: [
        'Đường chéo nối hai đỉnh không cùng nằm trên một mặt nào.',
        'Đỉnh đối diện với $B$ nằm ở đáy trên, ở vị trí "chéo" với $B$ qua tâm hình hộp.',
      ],
      solution: "Bốn đường chéo là $AC'$, $BD'$, $CA'$, $DB'$. Đường chéo qua $B$ là $BD'$.",
    },
    {
      type: 'number',
      prompt:
        'Một hình hộp chữ nhật dài $8$ cm, rộng $5$ cm, cao $4$ cm. Tính diện tích xung quanh của nó.',
      answer: 104,
      unit: 'cm²',
      hints: ['Dùng $S_{xq} = 2(a + b)\\cdot c$.', 'Chu vi đáy là $2\\cdot(8 + 5) = 26$ cm.'],
      solution: '$S_{xq} = 2\\cdot(8 + 5)\\cdot 4 = 26\\cdot 4 = 104\\ (\\text{cm}^2)$.',
    },
    {
      type: 'number',
      prompt: 'Tính thể tích của hình hộp chữ nhật dài $8$ cm, rộng $5$ cm, cao $4$ cm.',
      answer: 160,
      unit: 'cm³',
      hints: ['Thể tích bằng tích ba kích thước.'],
      solution: '$V = 8\\cdot 5\\cdot 4 = 160\\ (\\text{cm}^3)$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng về hình lập phương.',
      options: [
        'Có $12$ cạnh bằng nhau.',
        'Có $6$ mặt đều là hình vuông.',
        'Có $6$ đường chéo.',
        'Là một hình hộp chữ nhật đặc biệt.',
      ],
      answers: [0, 1, 3],
      hints: ['Hình lập phương là hình hộp chữ nhật có ba kích thước bằng nhau.'],
      solution:
        'Hình lập phương có $12$ cạnh bằng nhau, $6$ mặt là hình vuông và là hình hộp chữ nhật đặc biệt. Như mọi hình hộp chữ nhật, nó chỉ có $4$ đường chéo.',
    },
    {
      type: 'number',
      prompt:
        'Một hình lập phương có diện tích xung quanh bằng $144\\ \\text{cm}^2$. Tính thể tích của nó.',
      answer: 216,
      unit: 'cm³',
      hints: ['Từ $4a^2 = 144$ tìm $a^2$, rồi tìm cạnh $a$.', '$a^2 = 36$.'],
      solution: '$4a^2 = 144$ nên $a^2 = 36$, $a = 6$ cm. Vậy $V = 6^3 = 216\\ (\\text{cm}^3)$.',
    },
    {
      type: 'number',
      prompt:
        'Một căn phòng dạng hình hộp chữ nhật dài $5$ m, rộng $4$ m, cao $3$ m. Người ta sơn bốn bức tường xung quanh (bỏ qua cửa). Diện tích cần sơn là bao nhiêu mét vuông?',
      answer: 54,
      unit: 'm²',
      hints: ['Bốn bức tường là bốn mặt bên của hình hộp.'],
      solution: 'Diện tích cần sơn là $S_{xq} = 2\\cdot(5 + 4)\\cdot 3 = 54\\ (\\text{m}^2)$.',
    },
    {
      type: 'number',
      prompt:
        'Một bể cá hình hộp chữ nhật có lòng trong dài $80$ cm, rộng $50$ cm, cao $60$ cm. Mực nước trong bể cao $45$ cm. Bể đang chứa bao nhiêu lít nước?',
      answer: 180,
      unit: 'lít',
      hints: [
        'Phần nước là một hình hộp chữ nhật cao $45$ cm, không phải $60$ cm.',
        'Tính thể tích bằng $\\text{cm}^3$ rồi đổi: $1\\,000\\ \\text{cm}^3 = 1$ lít.',
      ],
      solution:
        'Thể tích nước: $80\\cdot 50\\cdot 45 = 180\\,000\\ (\\text{cm}^3) = 180\\ \\text{dm}^3 = 180$ lít.',
    },
    {
      type: 'number',
      prompt:
        'Một thùng hình lập phương có cạnh $1{,}2$ m. Tính thể tích của thùng (đơn vị mét khối).',
      answer: 1.728,
      tolerance: 0.0005,
      unit: 'm³',
      hints: ['$V = a^3 = 1{,}2\\cdot 1{,}2\\cdot 1{,}2$.'],
      solution: '$V = 1{,}2^3 = 1{,}44\\cdot 1{,}2 = 1{,}728\\ (\\text{m}^3)$.',
    },
  ],
  takeaways: [
    'Hình hộp chữ nhật có $8$ đỉnh, $12$ cạnh, $6$ mặt là hình chữ nhật và $4$ đường chéo; hình lập phương có $6$ mặt là hình vuông.',
    'Hình hộp chữ nhật: $S_{xq} = 2(a + b)\\cdot c$, $V = a\\cdot b\\cdot c$.',
    'Hình lập phương cạnh $a$: $S_{xq} = 4a^2$, $V = a^3$.',
  ],
};
