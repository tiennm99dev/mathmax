/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Góc so le trong và góc đồng vị tạo bởi một đường thẳng cắt hai đường thẳng, dấu hiệu nhận biết hai đường thẳng song song và cách vẽ hai đường thẳng song song.',
  intro:
    'Hai mép của một trang vở, hai thanh ray đường tàu: đó là hình ảnh hai đường thẳng song song. Nhưng nhìn bằng mắt thì không chắc chắn. Khi vẽ thêm một đường thẳng cắt cả hai, các góc tạo thành sẽ cho em biết hai đường thẳng có song song hay không.',
  objectives: [
    'Nhận biết các cặp góc so le trong, các cặp góc đồng vị tạo bởi một đường thẳng cắt hai đường thẳng.',
    'Nắm và vận dụng dấu hiệu nhận biết hai đường thẳng song song.',
    'Vẽ được đường thẳng đi qua một điểm và song song với một đường thẳng cho trước bằng thước và êke hoặc thước đo góc.',
  ],
  sections: [
    {
      heading: 'Góc tạo bởi một đường thẳng cắt hai đường thẳng',
      blocks: [
        {
          type: 'p',
          text: 'Đường thẳng $c$ cắt hai đường thẳng $a$ và $b$ lần lượt tại $A$ và $B$. Tại mỗi điểm có bốn góc. Ta đánh số các góc theo cùng một cách ở cả hai đỉnh: góc $1$ ở dưới đường thẳng, bên phải $c$; góc $2$ ở trên, bên phải $c$; góc $3$ ở trên, bên trái $c$; góc $4$ ở dưới, bên trái $c$ (như trong phần Khám phá).',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai góc so le trong',
          text: 'Hai góc nằm trong dải giữa hai đường thẳng $a$, $b$ và ở hai phía của đường thẳng $c$ là hai góc so le trong. Ta có hai cặp: $\\widehat{A}_1$ và $\\widehat{B}_3$; $\\widehat{A}_4$ và $\\widehat{B}_2$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai góc đồng vị',
          text: 'Hai góc có cùng vị trí ở hai đỉnh $A$ và $B$ (cùng phía với $c$, cùng phía trên hoặc dưới đường thẳng của nó) là hai góc đồng vị. Ta có bốn cặp: $\\widehat{A}_1$ và $\\widehat{B}_1$; $\\widehat{A}_2$ và $\\widehat{B}_2$; $\\widehat{A}_3$ và $\\widehat{B}_3$; $\\widehat{A}_4$ và $\\widehat{B}_4$.',
        },
        {
          type: 'table',
          caption: 'Các cặp góc tạo bởi đường thẳng c cắt hai đường thẳng a, b',
          head: ['Loại cặp góc', 'Các cặp'],
          rows: [
            [
              'So le trong',
              '$\\widehat{A}_1$ và $\\widehat{B}_3$; $\\widehat{A}_4$ và $\\widehat{B}_2$',
            ],
            [
              'Đồng vị',
              '$\\widehat{A}_1$ và $\\widehat{B}_1$; $\\widehat{A}_2$ và $\\widehat{B}_2$; $\\widehat{A}_3$ và $\\widehat{B}_3$; $\\widehat{A}_4$ và $\\widehat{B}_4$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Nếu đường thẳng $c$ cắt hai đường thẳng $a$, $b$ và trong các góc tạo thành có một cặp góc so le trong bằng nhau thì hai góc so le trong còn lại bằng nhau và các cặp góc đồng vị bằng nhau.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn, nếu $\\widehat{A}_1 = \\widehat{B}_3$ thì $\\widehat{A}_4 = 180^\\circ - \\widehat{A}_1$ và $\\widehat{B}_2 = 180^\\circ - \\widehat{B}_3$ (hai cặp góc kề bù), nên $\\widehat{A}_4 = \\widehat{B}_2$. Lại có $\\widehat{B}_1 = \\widehat{B}_3$ (đối đỉnh), nên $\\widehat{A}_1 = \\widehat{B}_1$.',
        },
      ],
    },
    {
      heading: 'Dấu hiệu nhận biết hai đường thẳng song song',
      blocks: [
        {
          type: 'p',
          text: 'Ở lớp 6 em đã biết: hai đường thẳng song song là hai đường thẳng không có điểm chung. Khi $a$ song song với $b$ ta viết $a \\parallel b$ (đọc là "$a$ song song với $b$").',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Dấu hiệu nhận biết',
          text: 'Nếu đường thẳng $c$ cắt hai đường thẳng $a$, $b$ và trong các góc tạo thành có một cặp góc so le trong bằng nhau hoặc một cặp góc đồng vị bằng nhau thì $a$ và $b$ song song với nhau.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì song song với nhau: nếu $a \\perp c$ và $b \\perp c$ thì $\\widehat{A}_1 = \\widehat{B}_1 = 90^\\circ$ là hai góc đồng vị bằng nhau, nên $a \\parallel b$.',
        },
      ],
    },
    {
      heading: 'Vẽ hai đường thẳng song song',
      blocks: [
        {
          type: 'p',
          text: 'Dấu hiệu nhận biết cho ta cách vẽ đường thẳng $b$ đi qua điểm $M$ nằm ngoài đường thẳng $a$ và song song với $a$:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ đường thẳng $c$ đi qua $M$ và cắt $a$ tại $N$.',
            'Dùng thước đo góc (hoặc êke có góc $60^\\circ$) xác định góc tạo bởi $c$ và $a$ tại $N$.',
            'Tại $M$, vẽ tia tạo với $c$ một góc bằng góc đó, ở vị trí đồng vị (hoặc so le trong) với nó.',
            'Kẻ đường thẳng $b$ chứa tia vừa vẽ. Hai góc đồng vị bằng nhau nên $b \\parallel a$.',
          ],
        },
        {
          type: 'p',
          text: 'Cách nhanh với êke: đặt êke sao cho một cạnh góc vuông nằm trên $a$, kẻ đường thẳng $c$ qua $M$ vuông góc với $a$; rồi kẻ đường thẳng $b$ qua $M$ vuông góc với $c$. Khi đó $a$ và $b$ cùng vuông góc với $c$ nên $b \\parallel a$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xoay đường thẳng b đến khi song song',
    instruction:
      'Chọn một cặp góc đồng vị hoặc so le trong. Kéo điểm trên đường thẳng $b$ (hoặc dùng phím mũi tên) để xoay $b$ quanh $B$. Khi hai góc của cặp bằng nhau, $a \\parallel b$. Bấm Đổi cát tuyến để thử với đường thẳng $c$ nghiêng khác.',
  },
  examples: [
    {
      problem:
        'Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại $A$, $B$ (đánh số góc như trên). Biết $\\widehat{A}_4 = \\widehat{B}_2 = 65^\\circ$. Giải thích vì sao $a \\parallel b$ và tính $\\widehat{B}_1$.',
      steps: [
        '$\\widehat{A}_4$ và $\\widehat{B}_2$ là một cặp góc so le trong và chúng bằng nhau.',
        'Theo dấu hiệu nhận biết, $a \\parallel b$.',
        '$\\widehat{B}_1$ và $\\widehat{B}_2$ là hai góc kề bù (cùng có cạnh là tia của $b$ bên phải $c$, hai cạnh còn lại là hai tia đối nhau của $c$), nên $\\widehat{B}_1 = 180^\\circ - 65^\\circ = 115^\\circ$.',
      ],
      answer: '$a \\parallel b$ và $\\widehat{B}_1 = 115^\\circ$.',
    },
    {
      problem:
        'Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại $A$, $B$. Biết $\\widehat{A}_2 = 70^\\circ$ và $\\widehat{B}_3 = 110^\\circ$. Hai đường thẳng $a$ và $b$ có song song không?',
      steps: [
        '$\\widehat{B}_2$ kề bù với $\\widehat{B}_3$ nên $\\widehat{B}_2 = 180^\\circ - 110^\\circ = 70^\\circ$.',
        '$\\widehat{A}_2$ và $\\widehat{B}_2$ là hai góc đồng vị và $\\widehat{A}_2 = \\widehat{B}_2 = 70^\\circ$.',
        'Theo dấu hiệu nhận biết, $a \\parallel b$.',
      ],
      answer: 'Có, $a \\parallel b$.',
    },
    {
      problem:
        'Trên một bức tường, hai thanh nẹp $a$ và $b$ đều được gắn vuông góc với mép sàn $c$. Vì sao hai thanh nẹp song song với nhau?',
      steps: [
        '$a \\perp c$ nên góc tạo bởi $a$ và $c$ tại giao điểm bằng $90^\\circ$; tương tự với $b$.',
        'Hai góc vuông đó ở vị trí đồng vị nên bằng nhau.',
        'Theo dấu hiệu nhận biết, $a \\parallel b$.',
      ],
      answer: 'Hai đường thẳng phân biệt cùng vuông góc với $c$ nên $a \\parallel b$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại $A$, $B$. Hai góc $\\widehat{A}_1$ và $\\widehat{B}_3$ là',
      options: ['hai góc so le trong', 'hai góc đồng vị', 'hai góc đối đỉnh', 'hai góc kề bù'],
      answer: 0,
      hints: [
        '$\\widehat{A}_1$ ở dưới $a$, $\\widehat{B}_3$ ở trên $b$: cả hai đều nằm trong dải giữa $a$ và $b$.',
        'Hai góc đó nằm ở cùng phía hay hai phía của $c$?',
      ],
      solution:
        'Cả hai góc nằm trong dải giữa $a$ và $b$, ở hai phía của $c$ ($\\widehat{A}_1$ bên phải, $\\widehat{B}_3$ bên trái), nên chúng là hai góc so le trong.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi cặp góc với tên gọi của nó.',
      left: [
        '$\\widehat{A}_2$ và $\\widehat{B}_2$',
        '$\\widehat{A}_4$ và $\\widehat{B}_2$',
        '$\\widehat{A}_1$ và $\\widehat{A}_3$',
        '$\\widehat{A}_1$ và $\\widehat{A}_2$',
      ],
      right: ['Hai góc đồng vị', 'Hai góc so le trong', 'Hai góc đối đỉnh', 'Hai góc kề bù'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Hai góc ở cùng một đỉnh thì chỉ có thể đối đỉnh hoặc kề bù.',
        'Hai góc ở hai đỉnh khác nhau: cùng vị trí là đồng vị, trong dải và khác phía $c$ là so le trong.',
      ],
      solution:
        '$\\widehat{A}_2$, $\\widehat{B}_2$ cùng vị trí: đồng vị. $\\widehat{A}_4$, $\\widehat{B}_2$ trong dải giữa $a$, $b$ và ở hai phía của $c$: so le trong. $\\widehat{A}_1$, $\\widehat{A}_3$ có các cạnh là tia đối của nhau: đối đỉnh. $\\widehat{A}_1$, $\\widehat{A}_2$ chung một cạnh, hai cạnh kia là hai tia đối nhau: kề bù.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại $A$, $B$ và $\\widehat{A}_2 = 70^\\circ$. Góc $\\widehat{B}_2$ phải bằng bao nhiêu độ để $a \\parallel b$ theo dấu hiệu nhận biết?',
      answer: 70,
      unit: '°',
      hints: ['$\\widehat{A}_2$ và $\\widehat{B}_2$ là cặp góc gì?'],
      solution:
        '$\\widehat{A}_2$ và $\\widehat{B}_2$ là hai góc đồng vị; khi $\\widehat{B}_2 = \\widehat{A}_2 = 70^\\circ$ thì $a \\parallel b$.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại $A$, $B$ và $\\widehat{A}_1 = 110^\\circ$. Góc $\\widehat{B}_2$ phải bằng bao nhiêu độ để $a \\parallel b$?',
      answer: 70,
      unit: '°',
      hints: [
        'Góc so le trong với $\\widehat{A}_1$ là $\\widehat{B}_3$; nó phải bằng $110^\\circ$.',
        '$\\widehat{B}_2$ kề bù với $\\widehat{B}_3$.',
      ],
      solution:
        'Để $a \\parallel b$ ta cần $\\widehat{B}_3 = \\widehat{A}_1 = 110^\\circ$ (so le trong). Khi đó $\\widehat{B}_2 = 180^\\circ - 110^\\circ = 70^\\circ$. Kiểm tra lại: $\\widehat{A}_4 = 180^\\circ - 110^\\circ = 70^\\circ = \\widehat{B}_2$, cặp so le trong còn lại cũng bằng nhau.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại $A$, $B$. Biết $\\widehat{A}_4 = 50^\\circ$ và $\\widehat{B}_1 = 130^\\circ$. Tính $\\widehat{B}_2$ (đơn vị độ).',
      answer: 50,
      unit: '°',
      hints: ['$\\widehat{B}_1$ và $\\widehat{B}_2$ là hai góc kề bù.'],
      solution:
        '$\\widehat{B}_2 = 180^\\circ - 130^\\circ = 50^\\circ$. Như vậy $\\widehat{A}_4 = \\widehat{B}_2 = 50^\\circ$ là cặp góc so le trong bằng nhau, nên $a \\parallel b$.',
    },
    {
      type: 'multi',
      prompt:
        'Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại $A$, $B$. Điều nào dưới đây đủ để khẳng định $a \\parallel b$?',
      options: [
        '$\\widehat{A}_1 = \\widehat{B}_1$',
        '$\\widehat{A}_4 = \\widehat{B}_2$',
        '$\\widehat{A}_2 = \\widehat{B}_2$',
        '$\\widehat{A}_1 = \\widehat{A}_3$',
        '$\\widehat{B}_1 + \\widehat{B}_2 = 180^\\circ$',
      ],
      answers: [0, 1, 2],
      hints: [
        'Dấu hiệu cần một cặp góc so le trong hoặc đồng vị bằng nhau, một góc ở $A$, một góc ở $B$.',
        'Hai đẳng thức cuối luôn đúng với mọi vị trí của $a$, $b$: vì sao?',
      ],
      solution:
        '$\\widehat{A}_1 = \\widehat{B}_1$ và $\\widehat{A}_2 = \\widehat{B}_2$ là cặp góc đồng vị bằng nhau, $\\widehat{A}_4 = \\widehat{B}_2$ là cặp góc so le trong bằng nhau: mỗi điều đủ để $a \\parallel b$. Còn $\\widehat{A}_1 = \\widehat{A}_3$ (đối đỉnh) và $\\widehat{B}_1 + \\widehat{B}_2 = 180^\\circ$ (kề bù) luôn đúng, không cho biết gì về $a$ và $b$.',
    },
    {
      type: 'choice',
      prompt:
        'Hai đường thẳng phân biệt $a$, $b$ cùng vuông góc với đường thẳng $c$. Khẳng định nào đúng?',
      options: [
        '$a \\parallel b$',
        '$a \\perp b$',
        '$a$ và $b$ cắt nhau',
        'Chưa đủ dữ kiện để kết luận',
      ],
      answer: 0,
      hints: ['Các góc tạo bởi $c$ với $a$ và với $b$ đều bằng bao nhiêu độ?'],
      solution:
        'Góc tạo bởi $c$ với $a$ và với $b$ đều bằng $90^\\circ$, nên có một cặp góc đồng vị bằng nhau. Theo dấu hiệu nhận biết, $a \\parallel b$.',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các bước vẽ đường thẳng $b$ đi qua điểm $M$ nằm ngoài đường thẳng $a$ và song song với $a$.',
      items: [
        'Tại $M$, vẽ tia tạo với $c$ một góc bằng góc vừa đo, ở vị trí đồng vị với nó.',
        'Vẽ đường thẳng $c$ đi qua $M$ và cắt $a$ tại $N$.',
        'Kẻ đường thẳng $b$ chứa tia vừa vẽ; khi đó $b \\parallel a$.',
        'Đo góc tạo bởi $c$ và $a$ tại $N$.',
      ],
      answer: [1, 3, 0, 2],
      hints: [
        'Muốn có cặp góc đồng vị thì trước hết phải có một đường thẳng cắt cả hai.',
        'Phải đo góc ở $N$ trước rồi mới vẽ góc bằng nó ở $M$.',
      ],
      solution:
        'Vẽ $c$ qua $M$ cắt $a$ tại $N$; đo góc tạo bởi $c$ và $a$ tại $N$; tại $M$ vẽ góc đồng vị bằng góc đó; kẻ đường thẳng $b$ chứa cạnh vừa vẽ. Hai góc đồng vị bằng nhau nên $b \\parallel a$.',
    },
  ],
  takeaways: [
    'Đường thẳng $c$ cắt $a$, $b$ tạo ra hai cặp góc so le trong ($\\widehat{A}_1$, $\\widehat{B}_3$; $\\widehat{A}_4$, $\\widehat{B}_2$) và bốn cặp góc đồng vị ($\\widehat{A}_i$, $\\widehat{B}_i$).',
    'Nếu có một cặp góc so le trong bằng nhau thì cặp so le trong còn lại và các cặp đồng vị cũng bằng nhau.',
    'Dấu hiệu: một cặp góc so le trong bằng nhau hoặc một cặp góc đồng vị bằng nhau thì $a \\parallel b$.',
    'Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì song song với nhau.',
  ],
};
