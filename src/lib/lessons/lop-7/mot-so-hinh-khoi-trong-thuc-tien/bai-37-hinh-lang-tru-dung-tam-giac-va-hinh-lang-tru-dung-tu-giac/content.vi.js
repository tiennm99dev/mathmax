/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hình lăng trụ đứng tam giác và hình lăng trụ đứng tứ giác: đỉnh, cạnh, mặt, chiều cao, diện tích xung quanh bằng chu vi đáy nhân chiều cao và thể tích bằng diện tích đáy nhân chiều cao.',
  intro:
    'Một miếng pho mát hình nêm, chiếc lều cắm trại hay khối kẹo socola thanh đều có hai đáy giống hệt nhau và các mặt bên là hình chữ nhật. Đó là các hình lăng trụ đứng. Bài này giúp em nhận biết chúng và tính diện tích xung quanh, thể tích của chúng.',
  objectives: [
    'Nhận biết mặt đáy, mặt bên, cạnh bên, chiều cao của hình lăng trụ đứng tam giác và hình lăng trụ đứng tứ giác.',
    'Tính diện tích xung quanh và thể tích của hình lăng trụ đứng tam giác, hình lăng trụ đứng tứ giác.',
    'Giải một số bài toán thực tế gắn với các hình này.',
  ],
  sections: [
    {
      heading: 'Hình lăng trụ đứng tam giác, hình lăng trụ đứng tứ giác',
      blocks: [
        {
          type: 'p',
          text: "Hình lăng trụ đứng tam giác $ABC.A'B'C'$ có:",
        },
        {
          type: 'list',
          items: [
            "$6$ đỉnh: $A, B, C, A', B', C'$;",
            "hai mặt đáy $ABC$ và $A'B'C'$ là hai tam giác nằm trong hai mặt phẳng song song;",
            "$3$ mặt bên $ABB'A'$, $BCC'B'$, $CAA'C'$ đều là hình chữ nhật;",
            "$3$ cạnh bên $AA'$, $BB'$, $CC'$ song song và bằng nhau; độ dài cạnh bên gọi là chiều cao của hình lăng trụ.",
          ],
        },
        {
          type: 'p',
          text: 'Như vậy hình lăng trụ đứng tam giác có $6$ đỉnh, $9$ cạnh và $5$ mặt.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình lăng trụ đứng tứ giác',
          text: "Hình lăng trụ đứng tứ giác $ABCD.A'B'C'D'$ có hai mặt đáy $ABCD$, $A'B'C'D'$ là hai tứ giác nằm trong hai mặt phẳng song song; $4$ mặt bên là hình chữ nhật; $4$ cạnh bên $AA'$, $BB'$, $CC'$, $DD'$ song song và bằng nhau. Nó có $8$ đỉnh, $12$ cạnh và $6$ mặt.",
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Hình hộp chữ nhật và hình lập phương là những hình lăng trụ đứng tứ giác đặc biệt: đáy là hình chữ nhật (hình vuông).',
        },
        {
          type: 'table',
          head: ['Hình', 'Đỉnh', 'Cạnh', 'Mặt', 'Mặt bên'],
          rows: [
            ['Lăng trụ đứng tam giác', '$6$', '$9$', '$5$', '$3$ hình chữ nhật'],
            ['Lăng trụ đứng tứ giác', '$8$', '$12$', '$6$', '$4$ hình chữ nhật'],
          ],
        },
      ],
    },
    {
      heading: 'Diện tích xung quanh và thể tích',
      blocks: [
        {
          type: 'p',
          text: 'Trải các mặt bên thành một dải, ta được một hình chữ nhật có một cạnh bằng chu vi đáy, cạnh kia bằng chiều cao của hình lăng trụ. Vì thế diện tích xung quanh bằng chu vi đáy nhân chiều cao.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức',
          text: 'Hình lăng trụ đứng tam giác hoặc tứ giác có chu vi đáy $C_{\\text{đáy}}$, diện tích đáy $S_{\\text{đáy}}$, chiều cao $h$: $$S_{xq} = C_{\\text{đáy}}\\cdot h, \\qquad V = S_{\\text{đáy}}\\cdot h.$$',
        },
        {
          type: 'p',
          text: 'Với hình hộp chữ nhật, $C_{\\text{đáy}} = 2(a + b)$ và $S_{\\text{đáy}} = ab$, nên hai công thức trên trở lại đúng công thức $S_{xq} = 2(a + b)c$, $V = abc$ đã học.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Chiều cao $h$ của hình lăng trụ là độ dài cạnh bên, khác với chiều cao của tam giác (hay hình thang) đáy dùng để tính $S_{\\text{đáy}}$. Đọc kĩ đề để không nhầm hai chiều cao này.',
        },
      ],
    },
  ],
  explore: {
    title: 'Lăng trụ xoay được và mở ra được',
    instruction:
      'Chọn đáy (tam giác hoặc tứ giác), đổi chiều cao $h$, kéo để xoay và kéo thanh "Trải phẳng" để mở hình thành hình khai triển. Dải mặt bên bên dưới cho thấy $S_{xq} = C_{\\text{đáy}}\\cdot h$; ô kết quả tính $V = S_{\\text{đáy}}\\cdot h$.',
  },
  examples: [
    {
      problem:
        'Một hình lăng trụ đứng có đáy là tam giác vuông với hai cạnh góc vuông $3$ cm, $4$ cm và cạnh huyền $5$ cm; chiều cao của lăng trụ là $10$ cm. Tính diện tích xung quanh và thể tích của hình lăng trụ.',
      steps: [
        'Chu vi đáy: $C_{\\text{đáy}} = 3 + 4 + 5 = 12$ (cm).',
        '$S_{xq} = C_{\\text{đáy}}\\cdot h = 12\\cdot 10 = 120\\ (\\text{cm}^2)$.',
        'Diện tích đáy: $S_{\\text{đáy}} = \\dfrac{1}{2}\\cdot 3\\cdot 4 = 6\\ (\\text{cm}^2)$.',
        '$V = S_{\\text{đáy}}\\cdot h = 6\\cdot 10 = 60\\ (\\text{cm}^3)$.',
      ],
      answer: '$S_{xq} = 120\\ \\text{cm}^2$, $V = 60\\ \\text{cm}^3$.',
    },
    {
      problem:
        'Một hình lăng trụ đứng tứ giác có đáy là hình thang với hai đáy $6$ cm và $3$ cm, hai cạnh bên $4$ cm và $5$ cm, chiều cao hình thang $4$ cm. Chiều cao của lăng trụ là $10$ cm. Tính diện tích xung quanh và thể tích.',
      steps: [
        '$C_{\\text{đáy}} = 6 + 3 + 4 + 5 = 18$ (cm), nên $S_{xq} = 18\\cdot 10 = 180\\ (\\text{cm}^2)$.',
        '$S_{\\text{đáy}} = \\dfrac{(6 + 3)\\cdot 4}{2} = 18\\ (\\text{cm}^2)$.',
        '$V = 18\\cdot 10 = 180\\ (\\text{cm}^3)$.',
      ],
      answer: '$S_{xq} = 180\\ \\text{cm}^2$, $V = 180\\ \\text{cm}^3$.',
    },
    {
      problem:
        'Một chiếc lều có dạng hình lăng trụ đứng tam giác. Đáy là tam giác cân có cạnh đáy $3$ m, hai cạnh bên $2{,}5$ m, chiều cao $2$ m; chiều dài lều (chiều cao của lăng trụ) là $5$ m. Tính thể tích khoảng không bên trong lều và diện tích vải làm hai mái lều.',
      steps: [
        '$S_{\\text{đáy}} = \\dfrac{1}{2}\\cdot 3\\cdot 2 = 3\\ (\\text{m}^2)$, nên $V = 3\\cdot 5 = 15\\ (\\text{m}^3)$.',
        'Mỗi mái lều là một mặt bên hình chữ nhật $2{,}5$ m $\\times$ $5$ m, diện tích $12{,}5\\ \\text{m}^2$.',
        'Hai mái: $2\\cdot 12{,}5 = 25\\ (\\text{m}^2)$.',
      ],
      answer: 'Thể tích $15\\ \\text{m}^3$; vải làm hai mái $25\\ \\text{m}^2$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hình lăng trụ đứng tam giác có bao nhiêu mặt?',
      options: ['$3$', '$5$', '$6$', '$9$'],
      answer: 1,
      hints: ['Kể cả hai mặt đáy và các mặt bên.'],
      solution: 'Có $2$ mặt đáy và $3$ mặt bên, tổng cộng $5$ mặt.',
    },
    {
      type: 'multi',
      prompt: "Chọn tất cả các khẳng định đúng về hình lăng trụ đứng tam giác $ABC.A'B'C'$.",
      options: [
        'Các mặt bên đều là hình chữ nhật.',
        "Hai mặt đáy $ABC$ và $A'B'C'$ là hai tam giác.",
        "Các cạnh bên $AA'$, $BB'$, $CC'$ bằng nhau.",
        'Các mặt bên đều là tam giác.',
      ],
      answers: [0, 1, 2],
      hints: ['Mặt bên nối một cạnh đáy dưới với cạnh tương ứng của đáy trên.'],
      solution:
        'Hai đáy là tam giác; ba mặt bên là hình chữ nhật; ba cạnh bên song song và bằng nhau. Mặt bên không phải tam giác.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hình với số đỉnh, số cạnh, số mặt của nó.',
      left: ['Hình lăng trụ đứng tam giác', 'Hình lăng trụ đứng tứ giác'],
      right: [
        '$6$ đỉnh, $9$ cạnh, $5$ mặt',
        '$8$ đỉnh, $12$ cạnh, $6$ mặt',
        '$6$ đỉnh, $12$ cạnh, $6$ mặt',
      ],
      pairs: [
        [0, 0],
        [1, 1],
      ],
      hints: ['Mỗi đáy $n$ cạnh cho $n$ đỉnh; cộng thêm $n$ cạnh bên.'],
      solution:
        'Đáy tam giác: $2\\cdot 3 = 6$ đỉnh, $3 + 3 + 3 = 9$ cạnh, $2 + 3 = 5$ mặt. Đáy tứ giác: $8$ đỉnh, $12$ cạnh, $6$ mặt.',
    },
    {
      type: 'number',
      prompt:
        'Hình lăng trụ đứng tam giác có ba cạnh đáy $5$ cm, $6$ cm, $7$ cm và chiều cao $8$ cm. Tính diện tích xung quanh.',
      answer: 144,
      unit: 'cm²',
      hints: ['$S_{xq} = C_{\\text{đáy}}\\cdot h$.', 'Chu vi đáy là $5 + 6 + 7 = 18$ cm.'],
      solution: '$S_{xq} = (5 + 6 + 7)\\cdot 8 = 18\\cdot 8 = 144\\ (\\text{cm}^2)$.',
    },
    {
      type: 'number',
      prompt:
        'Hình lăng trụ đứng có đáy là tam giác vuông với hai cạnh góc vuông $6$ cm và $8$ cm, chiều cao lăng trụ $12$ cm. Tính thể tích.',
      answer: 288,
      unit: 'cm³',
      hints: ['Diện tích tam giác vuông bằng nửa tích hai cạnh góc vuông.'],
      solution:
        '$S_{\\text{đáy}} = \\dfrac{1}{2}\\cdot 6\\cdot 8 = 24\\ (\\text{cm}^2)$, $V = 24\\cdot 12 = 288\\ (\\text{cm}^3)$.',
    },
    {
      type: 'number',
      prompt:
        'Hình lăng trụ đứng tứ giác có đáy là hình thoi với hai đường chéo $6$ cm và $8$ cm, cạnh hình thoi $5$ cm, chiều cao lăng trụ $10$ cm. Tính thể tích.',
      answer: 240,
      unit: 'cm³',
      hints: [
        'Diện tích hình thoi bằng nửa tích hai đường chéo.',
        'Cạnh $5$ cm chỉ cần khi tính diện tích xung quanh.',
      ],
      solution:
        '$S_{\\text{đáy}} = \\dfrac{6\\cdot 8}{2} = 24\\ (\\text{cm}^2)$, nên $V = 24\\cdot 10 = 240\\ (\\text{cm}^3)$.',
    },
    {
      type: 'number',
      prompt:
        'Một hình lăng trụ đứng tứ giác có chu vi đáy $24$ cm và diện tích xung quanh $216\\ \\text{cm}^2$. Tính chiều cao của lăng trụ.',
      answer: 9,
      unit: 'cm',
      hints: ['Từ $S_{xq} = C_{\\text{đáy}}\\cdot h$ suy ra $h = S_{xq} : C_{\\text{đáy}}$.'],
      solution: '$h = 216 : 24 = 9$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Một máng nước có dạng hình lăng trụ đứng, đáy là hình thang cân có hai đáy $60$ cm và $40$ cm, chiều cao hình thang $30$ cm; máng dài $2$ m. Máng chứa đầy được bao nhiêu lít nước?',
      answer: 300,
      unit: 'lít',
      hints: [
        'Đổi chiều dài máng ra xăng-ti-mét: $2$ m $= 200$ cm.',
        'Tính $S_{\\text{đáy}}$ của hình thang rồi nhân với $200$; cuối cùng đổi $1\\,000\\ \\text{cm}^3 = 1$ lít.',
      ],
      solution:
        '$S_{\\text{đáy}} = \\dfrac{(60 + 40)\\cdot 30}{2} = 1\\,500\\ (\\text{cm}^2)$. $V = 1\\,500\\cdot 200 = 300\\,000\\ (\\text{cm}^3) = 300$ lít.',
    },
  ],
  takeaways: [
    'Hình lăng trụ đứng tam giác ($6$ đỉnh, $9$ cạnh, $5$ mặt) và tứ giác ($8$ đỉnh, $12$ cạnh, $6$ mặt) có hai đáy song song, các mặt bên là hình chữ nhật, các cạnh bên bằng nhau và bằng chiều cao.',
    '$S_{xq} = C_{\\text{đáy}}\\cdot h$.',
    '$V = S_{\\text{đáy}}\\cdot h$.',
  ],
};
