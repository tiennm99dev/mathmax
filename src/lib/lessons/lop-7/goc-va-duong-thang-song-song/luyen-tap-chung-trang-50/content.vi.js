/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về hai góc kề bù, hai góc đối đỉnh, tia phân giác của một góc, các cặp góc so le trong, đồng vị và dấu hiệu nhận biết hai đường thẳng song song.',
  intro:
    'Bài luyện tập này ôn lại hai bài đầu của chương: Góc ở vị trí đặc biệt, tia phân giác của một góc (Bài 8) và Hai đường thẳng song song và dấu hiệu nhận biết (Bài 9). Em sẽ tính số đo góc nhờ các cặp góc kề bù, đối đỉnh, tia phân giác và dùng các cặp góc so le trong, đồng vị để nhận biết hai đường thẳng song song.',
  objectives: [
    'Tính số đo góc nhờ tính chất của hai góc kề bù, hai góc đối đỉnh và tia phân giác.',
    'Gọi đúng tên các cặp góc tạo bởi một đường thẳng cắt hai đường thẳng.',
    'Dùng dấu hiệu nhận biết để giải thích hai đường thẳng song song.',
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
              'Hai góc kề bù',
              'Có một cạnh chung, hai cạnh còn lại là hai tia đối nhau; tổng số đo bằng $180^\\circ$.',
            ],
            [
              'Hai góc đối đỉnh',
              'Mỗi cạnh của góc này là tia đối của một cạnh của góc kia; hai góc đối đỉnh thì bằng nhau.',
            ],
            [
              'Tia phân giác',
              '$Oz$ nằm giữa $Ox$, $Oy$ và $\\widehat{xOz} = \\widehat{zOy} = \\dfrac{\\widehat{xOy}}{2}$.',
            ],
            [
              'So le trong, đồng vị',
              'Với cách đánh số của Bài 9: so le trong $\\widehat{A}_1$, $\\widehat{B}_3$ và $\\widehat{A}_4$, $\\widehat{B}_2$; đồng vị $\\widehat{A}_i$, $\\widehat{B}_i$.',
            ],
            [
              'Dấu hiệu song song',
              'Một cặp góc so le trong bằng nhau hoặc một cặp góc đồng vị bằng nhau thì $a \\parallel b$.',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Cách làm',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Gọi tên vị trí của hai góc: chung đỉnh (kề bù, đối đỉnh) hay ở hai đỉnh (so le trong, đồng vị).',
            'Chọn tính chất phù hợp: kề bù thì cộng lại bằng $180^\\circ$, đối đỉnh thì bằng nhau, tia phân giác thì chia đôi.',
            'Khi cần chứng tỏ $a \\parallel b$: tìm một cặp góc so le trong hoặc đồng vị rồi chỉ ra chúng bằng nhau; thường phải tính một góc qua góc kề bù hay đối đỉnh trước.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện trộn ngẫu nhiên',
    instruction:
      'Mỗi lượt có 12 câu trộn ngẫu nhiên về hai góc kề bù, hai góc đối đỉnh, tia phân giác và dấu hiệu song song. Nhập số đo góc bằng độ (chỉ nhập số, ví dụ 135). Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra.',
  },
  examples: [
    {
      problem:
        "Hai góc $\\widehat{xOy}$ và $\\widehat{yOx'}$ kề bù, $Ot$ là tia phân giác của $\\widehat{xOy}$ và $\\widehat{tOx'} = 125^\\circ$. Tính $\\widehat{xOy}$.",
      steps: [
        "$\\widehat{xOt}$ và $\\widehat{tOx'}$ kề bù (chung cạnh $Ot$, còn $Ox$, $Ox'$ là hai tia đối nhau), nên $\\widehat{xOt} = 180^\\circ - 125^\\circ = 55^\\circ$.",
        '$Ot$ là tia phân giác của $\\widehat{xOy}$ nên $\\widehat{xOy} = 2 \\cdot 55^\\circ = 110^\\circ$.',
      ],
      answer: '$\\widehat{xOy} = 110^\\circ$.',
    },
    {
      problem:
        'Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại $A$, $B$. Biết $\\widehat{A}_3 = 75^\\circ$ và $\\widehat{B}_1 = 75^\\circ$. Chứng tỏ $a \\parallel b$.',
      steps: [
        '$\\widehat{B}_3$ và $\\widehat{B}_1$ là hai góc đối đỉnh nên $\\widehat{B}_3 = \\widehat{B}_1 = 75^\\circ$.',
        '$\\widehat{A}_3$ và $\\widehat{B}_3$ là hai góc đồng vị và $\\widehat{A}_3 = \\widehat{B}_3 = 75^\\circ$.',
        'Theo dấu hiệu nhận biết, $a \\parallel b$.',
      ],
      answer: '$a \\parallel b$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        "Hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$, $\\widehat{xOy} = 2\\,\\widehat{yOx'}$. Tính $\\widehat{x'Oy'}$ (đơn vị độ).",
      answer: 120,
      unit: '°',
      hints: [
        "$\\widehat{xOy}$ và $\\widehat{yOx'}$ kề bù: $2\\,\\widehat{yOx'} + \\widehat{yOx'} = 180^\\circ$.",
        "$\\widehat{x'Oy'}$ đối đỉnh với $\\widehat{xOy}$.",
      ],
      solution:
        "$3\\,\\widehat{yOx'} = 180^\\circ$ nên $\\widehat{yOx'} = 60^\\circ$, $\\widehat{xOy} = 120^\\circ$. $\\widehat{x'Oy'}$ đối đỉnh với $\\widehat{xOy}$ nên $\\widehat{x'Oy'} = 120^\\circ$.",
    },
    {
      type: 'number',
      prompt:
        "$Ot$ là tia phân giác của $\\widehat{xOy}$, $Ot'$ là tia đối của tia $Ot$, $\\widehat{xOt} = 32^\\circ$. Tính $\\widehat{xOt'}$ (đơn vị độ).",
      answer: 148,
      unit: '°',
      hints: [
        "$\\widehat{xOt}$ và $\\widehat{xOt'}$ có chung cạnh $Ox$; $Ot$, $Ot'$ là hai tia đối nhau.",
      ],
      solution:
        "$\\widehat{xOt}$ và $\\widehat{xOt'}$ kề bù nên $\\widehat{xOt'} = 180^\\circ - 32^\\circ = 148^\\circ$.",
    },
    {
      type: 'number',
      prompt:
        "Cho $\\widehat{xOy} = 100^\\circ$, $Oz$ là tia phân giác của $\\widehat{xOy}$ và $Ox'$ là tia đối của tia $Ox$. Tính $\\widehat{zOx'}$ (đơn vị độ).",
      answer: 130,
      unit: '°',
      hints: [
        '$\\widehat{xOz} = 100^\\circ : 2$.',
        "$\\widehat{xOz}$ và $\\widehat{zOx'}$ là hai góc kề bù.",
      ],
      solution:
        "$\\widehat{xOz} = 50^\\circ$; $\\widehat{xOz}$ và $\\widehat{zOx'}$ kề bù nên $\\widehat{zOx'} = 180^\\circ - 50^\\circ = 130^\\circ$.",
    },
    {
      type: 'number',
      prompt:
        'Hai đường thẳng cắt nhau tại $O$ tạo thành bốn góc, trong đó tổng của ba góc bằng $250^\\circ$. Tính góc còn lại (đơn vị độ).',
      answer: 110,
      unit: '°',
      hints: ['Bốn góc tạo thành hai góc bẹt, nên tổng bốn góc bằng $360^\\circ$.'],
      solution:
        'Tổng bốn góc là $360^\\circ$, nên góc còn lại bằng $360^\\circ - 250^\\circ = 110^\\circ$. Kiểm tra: các góc là $110^\\circ$, $110^\\circ$, $70^\\circ$, $70^\\circ$ và $110^\\circ + 70^\\circ + 70^\\circ = 250^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Tia $Oz$ nằm giữa hai tia $Ox$, $Oy$ và $\\widehat{xOz} = \\widehat{zOy}$. Khẳng định nào đúng?',
      options: [
        '$\\widehat{xOz}$ và $\\widehat{zOy}$ là hai góc đối đỉnh.',
        '$Oz$ là tia phân giác của $\\widehat{xOy}$.',
        '$\\widehat{xOz}$ và $\\widehat{zOy}$ là hai góc kề bù.',
        '$\\widehat{xOy} = 90^\\circ$.',
      ],
      answer: 1,
      hints: ['Đọc lại định nghĩa tia phân giác: hai điều kiện nào?'],
      solution:
        '$Oz$ nằm giữa hai cạnh và tạo với hai cạnh hai góc bằng nhau, nên $Oz$ là tia phân giác của $\\widehat{xOy}$. Không có gì bảo đảm $\\widehat{xOy} = 90^\\circ$ hay hai góc kề bù.',
    },
    {
      type: 'match',
      prompt:
        'Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại $A$, $B$ (đánh số góc như Bài 9). Nối mỗi cặp góc với tên gọi của nó.',
      left: [
        '$\\widehat{A}_3$ và $\\widehat{B}_3$',
        '$\\widehat{A}_1$ và $\\widehat{B}_3$',
        '$\\widehat{B}_2$ và $\\widehat{B}_4$',
        '$\\widehat{B}_3$ và $\\widehat{B}_4$',
      ],
      right: ['Hai góc đồng vị', 'Hai góc so le trong', 'Hai góc đối đỉnh', 'Hai góc kề bù'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Hai góc chung đỉnh $B$ chỉ có thể là đối đỉnh hoặc kề bù.'],
      solution:
        '$\\widehat{A}_3$, $\\widehat{B}_3$ cùng vị trí: đồng vị. $\\widehat{A}_1$, $\\widehat{B}_3$ trong dải giữa $a$, $b$ và hai phía của $c$: so le trong. $\\widehat{B}_2$, $\\widehat{B}_4$: các cạnh là tia đối của nhau, đối đỉnh. $\\widehat{B}_3$, $\\widehat{B}_4$ chung cạnh trên $b$, hai cạnh kia là hai tia đối nhau của $c$: kề bù.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại $A$, $B$ và $\\widehat{A}_1 = 4\\,\\widehat{A}_2$. Góc $\\widehat{B}_3$ phải bằng bao nhiêu độ để $a \\parallel b$?',
      answer: 144,
      unit: '°',
      hints: [
        '$\\widehat{A}_1$ và $\\widehat{A}_2$ kề bù: $4\\,\\widehat{A}_2 + \\widehat{A}_2 = 180^\\circ$.',
        '$\\widehat{B}_3$ so le trong với $\\widehat{A}_1$.',
      ],
      solution:
        '$5\\,\\widehat{A}_2 = 180^\\circ$ nên $\\widehat{A}_2 = 36^\\circ$, $\\widehat{A}_1 = 144^\\circ$. Để $a \\parallel b$ chỉ cần cặp so le trong bằng nhau: $\\widehat{B}_3 = \\widehat{A}_1 = 144^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại $A$, $B$. Biết $\\widehat{A}_2 = 58^\\circ$ và $\\widehat{B}_4 = 58^\\circ$. Kết luận nào đúng?',
      options: [
        '$a \\parallel b$, vì $\\widehat{B}_2 = \\widehat{B}_4 = 58^\\circ = \\widehat{A}_2$ là cặp góc đồng vị bằng nhau.',
        '$a \\parallel b$, vì $\\widehat{A}_2$ và $\\widehat{B}_4$ là hai góc đối đỉnh.',
        '$a$ và $b$ không song song.',
        'Chưa đủ dữ kiện để kết luận.',
      ],
      answer: 0,
      hints: [
        '$\\widehat{A}_2$ và $\\widehat{B}_4$ ở hai đỉnh khác nhau nên không thể đối đỉnh.',
        'Từ $\\widehat{B}_4$ tính $\\widehat{B}_2$ (hai góc đối đỉnh ở đỉnh $B$).',
      ],
      solution:
        '$\\widehat{B}_2 = \\widehat{B}_4 = 58^\\circ$ (đối đỉnh). Khi đó $\\widehat{A}_2 = \\widehat{B}_2$ là cặp góc đồng vị bằng nhau, nên $a \\parallel b$.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại $A$, $B$ và $\\widehat{A}_4 = \\widehat{B}_2 = 47^\\circ$ (nên $a \\parallel b$). Tính $\\widehat{B}_3$ (đơn vị độ).',
      answer: 133,
      unit: '°',
      hints: ['$\\widehat{B}_2 = 47^\\circ$; $\\widehat{B}_3$ kề bù với $\\widehat{B}_2$.'],
      solution:
        '$\\widehat{B}_2 = \\widehat{A}_4 = 47^\\circ$, nên $\\widehat{B}_3 = 180^\\circ - 47^\\circ = 133^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Muốn vẽ đường thẳng $b$ đi qua điểm $M$ và song song với đường thẳng $a$ (điểm $M$ không thuộc $a$) bằng êke, cách nào đúng?',
      options: [
        'Kẻ đường thẳng $c$ qua $M$ vuông góc với $a$, rồi kẻ đường thẳng $b$ qua $M$ vuông góc với $c$.',
        'Kẻ hai đường thẳng qua $M$ vuông góc với $a$.',
        'Kẻ đường thẳng qua $M$ cắt $a$ theo một góc tùy ý.',
        'Kẻ đường thẳng $b$ qua $M$ vuông góc với $a$.',
      ],
      answer: 0,
      hints: ['Hai đường thẳng phân biệt cùng vuông góc với một đường thẳng thứ ba thì thế nào?'],
      solution:
        'Khi $a \\perp c$ và $b \\perp c$, hai góc đồng vị tạo bởi $c$ đều bằng $90^\\circ$ nên $b \\parallel a$. Đó là cách vẽ thứ nhất.',
    },
  ],
  takeaways: [
    'Kề bù: cộng lại bằng $180^\\circ$. Đối đỉnh: bằng nhau. Tia phân giác: chia góc thành hai góc bằng nhau.',
    'Muốn chứng tỏ $a \\parallel b$, tìm một cặp góc so le trong hoặc đồng vị bằng nhau, thường sau khi tính một góc qua góc kề bù hoặc đối đỉnh.',
  ],
};
