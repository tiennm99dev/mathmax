/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về tiên đề Euclid, tính chất của hai đường thẳng song song, giả thiết và kết luận của định lí, cách trình bày một chứng minh.',
  intro:
    'Bài luyện tập này ôn lại Bài 10 (Tiên đề Euclid. Tính chất của hai đường thẳng song song) và Bài 11 (Định lí và chứng minh định lí). Em sẽ dùng tính chất của hai đường thẳng song song để tính góc, kẻ thêm đường thẳng song song khi cần, ghi giả thiết, kết luận của định lí và trình bày chứng minh có căn cứ cho từng bước.',
  objectives: [
    'Tính số đo góc nhờ tính chất của hai đường thẳng song song: góc so le trong, góc đồng vị bằng nhau, góc trong cùng phía bù nhau.',
    'Kẻ thêm một đường thẳng song song để tính góc, dựa vào tiên đề Euclid.',
    'Viết giả thiết, kết luận của một định lí và trình bày chứng minh, phân biệt khi nào dùng dấu hiệu nhận biết, khi nào dùng tính chất.',
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
              'Tiên đề Euclid',
              'Qua một điểm nằm ngoài một đường thẳng, chỉ có một đường thẳng song song với đường thẳng đó.',
            ],
            [
              'Tính chất',
              'Một đường thẳng cắt hai đường thẳng song song thì hai góc so le trong bằng nhau, hai góc đồng vị bằng nhau; suy ra hai góc trong cùng phía bù nhau.',
            ],
            [
              'Hệ quả',
              'Hai đường thẳng phân biệt cùng song song (hoặc cùng vuông góc) với một đường thẳng thứ ba thì song song; $a \\parallel b$ và $c \\perp a$ thì $c \\perp b$.',
            ],
            [
              'Định lí',
              'Phát biểu dạng "Nếu ... thì ...": phần giữa "Nếu" và "thì" là giả thiết (GT), phần sau "thì" là kết luận (KL).',
            ],
            [
              'Chứng minh',
              'Dùng lập luận đi từ giả thiết và những khẳng định đúng đã biết để suy ra kết luận; mỗi bước có căn cứ.',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Dấu hiệu hay tính chất?',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Muốn chứng tỏ hai đường thẳng song song: tìm một cặp góc so le trong (hoặc đồng vị) bằng nhau, đó là dùng dấu hiệu nhận biết (Bài 9).',
            'Đã biết hai đường thẳng song song, muốn tính góc: dùng tính chất (Bài 10), các góc so le trong, đồng vị bằng nhau.',
            'Khi hai đường thẳng song song bị "gãy khúc" qua một điểm $M$ ở giữa, kẻ qua $M$ một đường thẳng song song với chúng; tiên đề Euclid bảo đảm chỉ có một đường như vậy.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Đừng nhầm hai chiều: "góc so le trong bằng nhau $\\Rightarrow$ song song" là dấu hiệu; "song song $\\Rightarrow$ góc so le trong bằng nhau" là tính chất. Khi viết lí do, ghi rõ mình dùng chiều nào.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện trộn ngẫu nhiên',
    instruction:
      'Mỗi lượt có 12 câu trộn ngẫu nhiên: tính góc tạo bởi một đường thẳng cắt hai đường thẳng song song, kẻ thêm đường thẳng song song để tính góc, và đếm cặp đường thẳng song song, vuông góc nhờ các định lí. Nhập một số tự nhiên (số đo góc bằng độ, ví dụ 135). Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra.',
  },
  examples: [
    {
      problem:
        'Tứ giác $ABCD$ có $AD$ vuông góc với cả hai đường thẳng $AB$ và $CD$, $\\widehat{ABC} = 2\\,\\widehat{BCD}$. Tính các góc của tứ giác.',
      steps: [
        '$AB \\perp AD$ và $CD \\perp AD$ nên $AB \\parallel CD$ (hai đường thẳng phân biệt cùng vuông góc với đường thẳng thứ ba); $\\widehat{A} = \\widehat{D} = 90^\\circ$.',
        'Vẽ tia $Cx$ là tia đối của tia $CD$. Vì $AB \\parallel CD$ nên $\\widehat{ABC} = \\widehat{BCx}$ (hai góc so le trong).',
        '$\\widehat{BCD}$ và $\\widehat{BCx}$ kề bù nên $\\widehat{BCD} + \\widehat{ABC} = 180^\\circ$, tức là $3\\,\\widehat{BCD} = 180^\\circ$.',
        'Vậy $\\widehat{BCD} = 60^\\circ$ và $\\widehat{ABC} = 2 \\cdot 60^\\circ = 120^\\circ$.',
      ],
      answer:
        '$\\widehat{A} = \\widehat{D} = 90^\\circ$, $\\widehat{ABC} = 120^\\circ$, $\\widehat{BCD} = 60^\\circ$.',
    },
    {
      problem:
        'Hai đường thẳng phân biệt $a$, $b$ cùng vuông góc với đường thẳng $c$; đường thẳng $d$ khác $c$ và vuông góc với $a$. Chứng minh: a) $a \\parallel b$; b) $c \\parallel d$; c) $b \\perp d$.',
      steps: [
        'GT: $a \\perp c$, $b \\perp c$ ($a \\ne b$); $d \\perp a$ ($d \\ne c$). KL: $a \\parallel b$, $c \\parallel d$, $b \\perp d$.',
        'a) $a$ và $b$ phân biệt, cùng vuông góc với $c$ nên $a \\parallel b$.',
        'b) $c$ và $d$ phân biệt, cùng vuông góc với $a$ nên $c \\parallel d$.',
        'c) $b \\perp c$ và $c \\parallel d$: đường thẳng vuông góc với một trong hai đường thẳng song song thì vuông góc với đường kia, nên $b \\perp d$.',
      ],
      answer: '$a \\parallel b$, $c \\parallel d$ và $b \\perp d$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Tứ giác $ABCD$ có $AD$ vuông góc với cả $AB$ và $CD$, $\\widehat{ABC} - \\widehat{BCD} = 50^\\circ$. Tính $\\widehat{ABC}$ (đơn vị độ).',
      answer: 115,
      unit: '°',
      hints: [
        'Trước hết, $AB$ và $CD$ có quan hệ gì? Cả hai cùng vuông góc với $AD$.',
        '$\\widehat{ABC}$ và $\\widehat{BCD}$ là hai góc trong cùng phía nên tổng của chúng bằng $180^\\circ$.',
      ],
      solution:
        '$AB \\parallel CD$ (cùng vuông góc với $AD$), nên $\\widehat{ABC} + \\widehat{BCD} = 180^\\circ$ (hai góc trong cùng phía). Biết hiệu là $50^\\circ$: $\\widehat{ABC} = (180^\\circ + 50^\\circ) : 2 = 115^\\circ$ (và $\\widehat{BCD} = 65^\\circ$).',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $c$ cắt hai đường thẳng song song $a$, $b$ tại $A$, $B$ (đánh số góc như Bài 9) và $\\widehat{A}_4 = 2\\,\\widehat{B}_3$. Tính $\\widehat{B}_1$ (đơn vị độ).',
      answer: 60,
      unit: '°',
      hints: [
        '$\\widehat{A}_4$ và $\\widehat{B}_3$ là hai góc trong cùng phía.',
        '$\\widehat{B}_1$ và $\\widehat{B}_3$ là hai góc đối đỉnh.',
      ],
      solution:
        '$a \\parallel b$ nên $\\widehat{A}_4 + \\widehat{B}_3 = 180^\\circ$, tức là $3\\,\\widehat{B}_3 = 180^\\circ$, $\\widehat{B}_3 = 60^\\circ$. $\\widehat{B}_1$ đối đỉnh với $\\widehat{B}_3$ nên $\\widehat{B}_1 = 60^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Hai tia $Ax$, $By$ song song, cùng hướng; điểm $C$ nằm giữa hai đường thẳng chứa chúng, về phía hai tia đó. Biết $\\widehat{ACB} = 90^\\circ$ và $\\widehat{xAC} = 35^\\circ$. Tính $\\widehat{yBC}$ (đơn vị độ).',
      answer: 55,
      unit: '°',
      hints: [
        'Qua $C$ kẻ đường thẳng song song với $Ax$; nó cũng song song với $By$.',
        '$\\widehat{ACB}$ bằng tổng của hai góc so le trong với $\\widehat{xAC}$ và $\\widehat{yBC}$.',
      ],
      solution:
        "Qua $C$ kẻ $zz' \\parallel Ax$ (tia $Cz'$ ngược hướng với $Ax$) thì $zz' \\parallel By$. $\\widehat{ACz'} = \\widehat{xAC} = 35^\\circ$ (so le trong), nên $\\widehat{z'CB} = 90^\\circ - 35^\\circ = 55^\\circ$ và $\\widehat{yBC} = \\widehat{z'CB} = 55^\\circ$ (so le trong).",
    },
    {
      type: 'choice',
      prompt:
        'Định lí: "Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì chúng song song với nhau." Cách ghi giả thiết và kết luận nào đúng?',
      options: [
        'GT: $a \\perp c$, $b \\perp c$, $a \\ne b$. KL: $a \\parallel b$.',
        'GT: $a \\parallel b$. KL: $a \\perp c$, $b \\perp c$.',
        'GT: $a \\perp c$. KL: $b \\perp c$.',
        'GT: $a \\ne b$. KL: $a \\parallel b$, $a \\perp c$.',
      ],
      answer: 0,
      hints: [
        'Giả thiết là điều đã cho, nằm giữa "Nếu" và "thì" khi viết lại dạng "Nếu ... thì ...".',
      ],
      solution:
        'Viết lại: "Nếu hai đường thẳng phân biệt $a$, $b$ cùng vuông góc với đường thẳng $c$ thì $a \\parallel b$". GT: $a \\perp c$, $b \\perp c$, $a \\ne b$; KL: $a \\parallel b$.',
    },
    {
      type: 'multi',
      prompt:
        'Hai đường thẳng phân biệt $a$, $b$ cùng vuông góc với đường thẳng $c$; đường thẳng $d$ khác $c$ và vuông góc với $a$. Chọn tất cả các khẳng định đúng.',
      options: [
        '$a \\parallel b$',
        '$c \\parallel d$',
        '$b \\perp d$',
        '$a \\perp b$',
        '$c \\perp d$',
      ],
      answers: [0, 1, 2],
      hints: [
        'Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thì song song.',
        'Một đường thẳng vuông góc với một trong hai đường thẳng song song thì vuông góc với đường kia.',
      ],
      solution:
        '$a \\parallel b$ (cùng vuông góc với $c$); $c \\parallel d$ (cùng vuông góc với $a$); $d \\perp a$ và $a \\parallel b$ nên $d \\perp b$. Hai đường thẳng song song thì không vuông góc, nên $a \\perp b$ và $c \\perp d$ đều sai.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $b$ vuông góc với hai đường thẳng song song $c$ và $d$, cắt $c$ tại $A$ và cắt $d$ tại $B$. Tia $Ax$ là tia phân giác của một góc vuông ở đỉnh $A$ có cạnh $AB$. Tính $\\widehat{xAB}$ (đơn vị độ).',
      answer: 45,
      unit: '°',
      hints: ['Tia phân giác chia góc vuông thành hai góc bằng nhau.'],
      solution:
        'Góc ở đỉnh $A$ bằng $90^\\circ$; $Ax$ là tia phân giác nên $\\widehat{xAB} = 90^\\circ : 2 = 45^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Tiếp bài trên: tia $By$ là tia phân giác của góc vuông ở đỉnh $B$ so le trong với góc có tia phân giác $Ax$. Vì sao hai đường thẳng chứa tia $Ax$ và $By$ song song?',
      options: [
        'Vì $\\widehat{xAB} = \\widehat{yBA} = 45^\\circ$ và đây là cặp góc so le trong bằng nhau (dấu hiệu nhận biết).',
        'Vì hai đường thẳng $c$ và $d$ song song (tính chất).',
        'Vì $Ax$ và $By$ cùng vuông góc với $b$.',
        'Vì qua $A$ chỉ có một đường thẳng song song với $d$ (tiên đề Euclid).',
      ],
      answer: 0,
      hints: [
        'Đường thẳng $b$ cắt hai đường thẳng chứa $Ax$, $By$. Hãy tìm một cặp góc so le trong.',
      ],
      solution:
        'Đường thẳng $b$ cắt hai đường thẳng $Ax$ và $By$ tạo ra cặp góc so le trong $\\widehat{xAB} = \\widehat{yBA} = 45^\\circ$. Theo dấu hiệu nhận biết, hai đường thẳng đó song song. $Ax$, $By$ không vuông góc với $b$ (chúng tạo với $b$ góc $45^\\circ$).',
    },
    {
      type: 'match',
      prompt:
        'Cho $\\triangle ABC$, $AH \\perp BC$ tại $H$; đường thẳng $d$ đi qua $A$ tạo với $AC$ một góc bằng $\\widehat{ACB}$ ở vị trí so le trong. Nối mỗi bước lập luận với căn cứ của nó.',
      left: [
        'Hai góc so le trong bằng nhau nên $d \\parallel BC$',
        '$d \\parallel BC$ và $AH \\perp BC$ nên $d \\perp AH$',
        'Qua $A$ chỉ có một đường thẳng song song với $BC$',
        '$\\widehat{AHB} = 90^\\circ$',
      ],
      right: [
        'Dấu hiệu nhận biết hai đường thẳng song song',
        'Tính chất của hai đường thẳng song song',
        'Tiên đề Euclid',
        'Giả thiết $AH \\perp BC$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Từ góc bằng nhau suy ra song song là một chiều; từ song song suy ra góc (hoặc vuông góc) là chiều ngược lại.',
      ],
      solution:
        'Góc so le trong bằng nhau $\\Rightarrow$ song song: dấu hiệu nhận biết. Đã song song $\\Rightarrow$ vuông góc với đường kia: tính chất (hệ quả của tính chất). "Chỉ có một đường thẳng song song" là tiên đề Euclid. $\\widehat{AHB} = 90^\\circ$ có ngay từ giả thiết $AH \\perp BC$.',
    },
    {
      type: 'order',
      prompt:
        'Cho $\\triangle ABC$, $AH \\perp BC$; đường thẳng $d$ qua $A$ tạo với $AC$ một góc $50^\\circ$, so le trong với $\\widehat{ACB} = 50^\\circ$. Sắp xếp các bước để chứng minh $d \\perp AH$.',
      items: [
        'Vậy $d \\perp AH$.',
        'Góc tạo bởi $d$ và $AC$ bằng $\\widehat{ACB}$ (cùng bằng $50^\\circ$), hai góc ở vị trí so le trong.',
        'Có $d \\parallel BC$ và $AH \\perp BC$, mà đường thẳng vuông góc với một trong hai đường thẳng song song thì vuông góc với đường kia.',
        'Do đó $d \\parallel BC$ (dấu hiệu nhận biết).',
      ],
      answer: [1, 3, 2, 0],
      hints: [
        'Bắt đầu từ điều đã cho về hai góc bằng nhau.',
        'Phải có $d \\parallel BC$ trước rồi mới dùng tính chất để suy ra vuông góc.',
      ],
      solution:
        'Hai góc so le trong bằng nhau (cùng bằng $50^\\circ$) $\\Rightarrow$ $d \\parallel BC$ (dấu hiệu nhận biết) $\\Rightarrow$ cùng với $AH \\perp BC$, đường thẳng $AH$ vuông góc với $BC$ nên cũng vuông góc với $d$ $\\Rightarrow$ $d \\perp AH$.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào sau đây là một định lí?',
      options: [
        'Hai góc bằng nhau thì đối đỉnh.',
        'Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc so le trong bằng nhau.',
        'Hai góc có tổng bằng $180^\\circ$ thì kề bù.',
        'Nếu đường thẳng $c$ cắt hai đường thẳng $a$, $b$ thì hai góc đồng vị bằng nhau.',
      ],
      answer: 1,
      hints: ['Định lí phải là khẳng định đúng. Thử tìm một hình vẽ làm sai từng khẳng định.'],
      solution:
        'Chỉ khẳng định thứ hai đúng (tính chất của hai đường thẳng song song). Hai góc $30^\\circ$ ở hai chỗ khác nhau bằng nhau mà không đối đỉnh; hai góc $100^\\circ$ và $80^\\circ$ không chung cạnh có tổng $180^\\circ$ mà không kề bù; khi $a$ cắt $b$ thì các góc đồng vị không bằng nhau.',
    },
    {
      type: 'choice',
      prompt: 'Kết luận của định lí "Nếu $c \\perp a$ và $a \\parallel b$ thì $c \\perp b$" là',
      options: [
        '$c \\perp a$',
        '$a \\parallel b$',
        '$c \\perp b$',
        '$c \\perp a$ và $a \\parallel b$',
      ],
      answer: 2,
      hints: ['Kết luận là phần đứng sau từ "thì".'],
      solution:
        'GT: $c \\perp a$, $a \\parallel b$ (phần giữa "Nếu" và "thì"). KL: $c \\perp b$ (phần sau "thì").',
    },
  ],
  takeaways: [
    'Đã biết hai đường thẳng song song thì dùng tính chất: góc so le trong, đồng vị bằng nhau, góc trong cùng phía bù nhau.',
    'Góc "gãy khúc" giữa hai tia song song: kẻ thêm qua đỉnh một đường thẳng song song, rồi cộng hai góc so le trong.',
    'Định lí có GT (sau "Nếu") và KL (sau "thì"); chứng minh là chuỗi bước, mỗi bước có căn cứ và chỉ dùng điều đã có trước nó.',
  ],
};
