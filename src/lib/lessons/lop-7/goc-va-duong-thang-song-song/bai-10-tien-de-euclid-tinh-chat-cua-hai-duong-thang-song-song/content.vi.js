/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tiên đề Euclid về đường thẳng song song và tính chất của hai đường thẳng song song: một đường thẳng cắt hai đường thẳng song song tạo ra các góc so le trong bằng nhau, các góc đồng vị bằng nhau.',
  intro:
    'Qua một điểm nằm ngoài một đường thẳng, em có thể kẻ được bao nhiêu đường thẳng song song với nó? Thử bằng thước, em sẽ thấy chỉ có một. Nhà toán học Hy Lạp Euclid đã thừa nhận điều đó như một chân lí, và từ đó suy ra những tính chất rất hữu ích của hai đường thẳng song song.',
  objectives: [
    'Phát biểu tiên đề Euclid về đường thẳng song song.',
    'Nắm tính chất: một đường thẳng cắt hai đường thẳng song song thì hai góc so le trong bằng nhau, hai góc đồng vị bằng nhau.',
    'Dùng tiên đề Euclid và tính chất trên để tính số đo góc và giải thích hai đường thẳng song song hoặc vuông góc.',
  ],
  sections: [
    {
      heading: 'Tiên đề Euclid',
      blocks: [
        {
          type: 'p',
          text: 'Cho đường thẳng $a$ và điểm $M$ nằm ngoài $a$. Ta đã biết cách vẽ một đường thẳng $b$ đi qua $M$ và song song với $a$. Người ta thừa nhận rằng không có đường thẳng thứ hai như vậy.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tiên đề Euclid',
          text: 'Qua một điểm nằm ngoài một đường thẳng, chỉ có một đường thẳng song song với đường thẳng đó.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Tiên đề là một khẳng định được thừa nhận là đúng mà không chứng minh. Mọi đường thẳng khác đi qua $M$ đều cắt $a$, dù giao điểm có thể ở rất xa.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì song song với nhau. Thật vậy, nếu $a \\parallel c$, $b \\parallel c$ mà $a$ cắt $b$ tại $M$ thì qua $M$ có hai đường thẳng song song với $c$, trái với tiên đề Euclid.',
        },
      ],
    },
    {
      heading: 'Tính chất của hai đường thẳng song song',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Nếu một đường thẳng cắt hai đường thẳng song song thì: hai góc so le trong bằng nhau; hai góc đồng vị bằng nhau.',
        },
        {
          type: 'p',
          text: "Đây là điều ngược lại của dấu hiệu nhận biết ở Bài 9. Lí do: giả sử $a \\parallel b$ và $\\widehat{A}_1 \\ne \\widehat{B}_3$. Qua $A$ vẽ đường thẳng $a'$ tạo với $c$ góc so le trong bằng $\\widehat{B}_3$; theo dấu hiệu nhận biết thì $a' \\parallel b$. Khi đó qua $A$ có hai đường thẳng $a$ và $a'$ cùng song song với $b$, trái với tiên đề Euclid.",
        },
        { type: 'widget', name: 'properties' },
        {
          type: 'p',
          text: 'Hai góc nằm trong dải giữa $a$, $b$ và ở cùng một phía của $c$ gọi là hai góc trong cùng phía: $\\widehat{A}_1$ và $\\widehat{B}_2$; $\\widehat{A}_4$ và $\\widehat{B}_3$. Từ tính chất trên và tính chất hai góc kề bù, ta suy ra: nếu $a \\parallel b$ thì hai góc trong cùng phía bù nhau, chẳng hạn $\\widehat{A}_1 + \\widehat{B}_2 = 180^\\circ$ vì $\\widehat{B}_2 + \\widehat{B}_3 = 180^\\circ$ và $\\widehat{B}_3 = \\widehat{A}_1$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Nếu một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó cũng vuông góc với đường thẳng kia: $a \\parallel b$ và $c \\perp a$ thì $c \\perp b$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thử kẻ đường thẳng qua M',
    instruction:
      'Kéo điểm trên đường thẳng đi qua $M$ (hoặc dùng phím mũi tên) để xoay nó. Bấm Ghi lại đường thẳng này sau mỗi lần thử. Em tìm được bao nhiêu đường thẳng qua $M$ không cắt $a$?',
  },
  examples: [
    {
      problem:
        'Đường thẳng $c$ cắt hai đường thẳng song song $a$, $b$ tại $A$, $B$ (đánh số góc như Bài 9), $\\widehat{A}_1 = 120^\\circ$. Tính $\\widehat{B}_3$, $\\widehat{B}_1$ và $\\widehat{B}_2$.',
      steps: [
        '$a \\parallel b$ nên hai góc so le trong bằng nhau: $\\widehat{B}_3 = \\widehat{A}_1 = 120^\\circ$.',
        'Hai góc đồng vị bằng nhau: $\\widehat{B}_1 = \\widehat{A}_1 = 120^\\circ$.',
        '$\\widehat{B}_2$ kề bù với $\\widehat{B}_1$ nên $\\widehat{B}_2 = 180^\\circ - 120^\\circ = 60^\\circ$.',
      ],
      answer: '$\\widehat{B}_3 = \\widehat{B}_1 = 120^\\circ$, $\\widehat{B}_2 = 60^\\circ$.',
    },
    {
      problem:
        'Cho hai tia song song $Ax$ và $By$ cùng hướng sang phải, $A$ ở trên, $B$ ở dưới; điểm $M$ nằm giữa hai đường thẳng chứa hai tia, ở bên phải đoạn $AB$. Biết $\\widehat{xAM} = 40^\\circ$, $\\widehat{yBM} = 50^\\circ$. Tính $\\widehat{AMB}$.',
      steps: [
        "Qua $M$ vẽ đường thẳng $zz'$ song song với $Ax$ (tia $Mz'$ hướng sang trái). Theo tiên đề Euclid, chỉ có một đường thẳng như vậy, và nó cũng song song với $By$ (hai đường thẳng cùng song song với một đường thẳng thứ ba).",
        "$Mz' \\parallel Ax$ nên $\\widehat{AMz'} = \\widehat{xAM} = 40^\\circ$ (hai góc so le trong).",
        "$Mz' \\parallel By$ nên $\\widehat{z'MB} = \\widehat{yBM} = 50^\\circ$ (hai góc so le trong).",
        "Tia $Mz'$ nằm giữa hai tia $MA$ và $MB$, nên $\\widehat{AMB} = 40^\\circ + 50^\\circ = 90^\\circ$.",
      ],
      answer: '$\\widehat{AMB} = 90^\\circ$.',
    },
    {
      problem:
        'Hai đường thẳng $a$ và $b$ cùng song song với mép bàn $d$. Đường thẳng $c$ vuông góc với $a$. Chứng tỏ $c \\perp b$.',
      steps: [
        '$a \\parallel d$ và $b \\parallel d$ nên $a \\parallel b$ (hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba).',
        '$c \\perp a$ nên $c$ cắt $a$ tạo thành góc $90^\\circ$; $c$ cũng cắt $b$.',
        'Hai góc đồng vị bằng nhau, nên góc tạo bởi $c$ và $b$ cũng bằng $90^\\circ$, tức là $c \\perp b$.',
      ],
      answer: '$c \\perp b$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Qua điểm $M$ nằm ngoài đường thẳng $a$, có bao nhiêu đường thẳng song song với $a$?',
      options: ['Không có đường nào', 'Chỉ có một', 'Có hai', 'Có vô số'],
      answer: 1,
      hints: ['Nhớ lại tiên đề Euclid.'],
      solution:
        'Theo tiên đề Euclid, qua một điểm nằm ngoài một đường thẳng chỉ có một đường thẳng song song với đường thẳng đó.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $c$ cắt hai đường thẳng song song $a$, $b$ tại $A$, $B$ và $\\widehat{A}_4 = 55^\\circ$. Tính $\\widehat{B}_2$ (đơn vị độ).',
      answer: 55,
      unit: '°',
      hints: ['$\\widehat{A}_4$ và $\\widehat{B}_2$ là cặp góc gì?'],
      solution:
        '$\\widehat{A}_4$ và $\\widehat{B}_2$ là hai góc so le trong; $a \\parallel b$ nên $\\widehat{B}_2 = \\widehat{A}_4 = 55^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $c$ cắt hai đường thẳng song song $a$, $b$ tại $A$, $B$ và $\\widehat{A}_2 = 72^\\circ$. Tính $\\widehat{B}_3$ (đơn vị độ).',
      answer: 108,
      unit: '°',
      hints: [
        'Từ $\\widehat{A}_2$ tính được góc đồng vị $\\widehat{B}_2$.',
        '$\\widehat{B}_2$ và $\\widehat{B}_3$ là hai góc kề bù.',
      ],
      solution:
        '$\\widehat{B}_2 = \\widehat{A}_2 = 72^\\circ$ (đồng vị), nên $\\widehat{B}_3 = 180^\\circ - 72^\\circ = 108^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $c$ cắt hai đường thẳng song song $a$, $b$ tại $A$, $B$. Biết $\\widehat{A}_1 - \\widehat{B}_2 = 40^\\circ$. Tính $\\widehat{A}_1$ (đơn vị độ).',
      answer: 110,
      unit: '°',
      hints: [
        '$\\widehat{A}_1$ và $\\widehat{B}_2$ là hai góc trong cùng phía; khi $a \\parallel b$ thì tổng của chúng bằng bao nhiêu?',
        'Biết tổng và hiệu của hai số, số lớn bằng (tổng + hiệu) : 2.',
      ],
      solution:
        '$a \\parallel b$ nên $\\widehat{B}_2 = \\widehat{A}_4$ (so le trong) và $\\widehat{A}_1 + \\widehat{A}_4 = 180^\\circ$ (kề bù), suy ra $\\widehat{A}_1 + \\widehat{B}_2 = 180^\\circ$. Kết hợp $\\widehat{A}_1 - \\widehat{B}_2 = 40^\\circ$: $\\widehat{A}_1 = (180^\\circ + 40^\\circ) : 2 = 110^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $c$ cắt hai đường thẳng song song $a$, $b$ tại $A$, $B$. Biết $\\widehat{A}_3 = 2\\,\\widehat{A}_2$. Tính $\\widehat{B}_3$ (đơn vị độ).',
      answer: 120,
      unit: '°',
      hints: [
        '$\\widehat{A}_2$ và $\\widehat{A}_3$ kề bù: $\\widehat{A}_2 + 2\\,\\widehat{A}_2 = 180^\\circ$.',
        '$\\widehat{B}_3$ đồng vị với $\\widehat{A}_3$.',
      ],
      solution:
        '$\\widehat{A}_2 + \\widehat{A}_3 = 180^\\circ$ nên $3\\,\\widehat{A}_2 = 180^\\circ$, $\\widehat{A}_2 = 60^\\circ$, $\\widehat{A}_3 = 120^\\circ$. Vì $a \\parallel b$ nên $\\widehat{B}_3 = \\widehat{A}_3 = 120^\\circ$ (đồng vị).',
    },
    {
      type: 'choice',
      prompt: 'Cho $a \\parallel b$ và đường thẳng $c \\perp a$. Khẳng định nào đúng?',
      options: ['$c \\parallel b$', '$c \\perp b$', '$c$ không cắt $b$', '$c$ trùng với $b$'],
      answer: 1,
      hints: ['$c$ cắt $a$ tạo góc $90^\\circ$. Góc đồng vị với nó ở $b$ bằng bao nhiêu?'],
      solution:
        '$c$ cắt $a$ thì cũng cắt $b$ (nếu không, qua giao điểm của $c$ và $a$ có hai đường thẳng $a$, $c$ cùng song song với $b$). Góc tạo bởi $c$ và $b$ đồng vị với góc $90^\\circ$ nên bằng $90^\\circ$: $c \\perp b$.',
    },
    {
      type: 'number',
      prompt:
        'Hai tia song song $Ax$, $By$ cùng hướng; điểm $M$ nằm giữa hai đường thẳng chứa chúng, về phía hai tia đó. Biết $\\widehat{xAM} = 35^\\circ$ và $\\widehat{yBM} = 65^\\circ$. Tính $\\widehat{AMB}$ (đơn vị độ).',
      answer: 100,
      unit: '°',
      hints: [
        'Qua $M$ kẻ đường thẳng song song với $Ax$; nó cũng song song với $By$.',
        'Dùng hai cặp góc so le trong rồi cộng lại.',
      ],
      solution:
        "Qua $M$ kẻ $zz' \\parallel Ax$ thì $zz' \\parallel By$. Khi đó $\\widehat{AMz'} = 35^\\circ$ và $\\widehat{z'MB} = 65^\\circ$ (so le trong), nên $\\widehat{AMB} = 35^\\circ + 65^\\circ = 100^\\circ$.",
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        'Nếu $a \\parallel c$ và $b \\parallel c$ ($a$, $b$ phân biệt) thì $a \\parallel b$.',
        'Qua điểm $M$ nằm ngoài đường thẳng $a$ có vô số đường thẳng cắt $a$.',
        'Nếu đường thẳng $c$ cắt hai đường thẳng $a$, $b$ thì hai góc so le trong luôn bằng nhau.',
        'Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc đồng vị bằng nhau.',
      ],
      answers: [0, 1, 3],
      hints: ['Tính chất về góc so le trong bằng nhau cần điều kiện gì về $a$ và $b$?'],
      solution:
        'Khẳng định thứ ba sai: chỉ khi $a \\parallel b$ thì hai góc so le trong mới chắc chắn bằng nhau. Các khẳng định còn lại đúng: hai đường thẳng cùng song song với đường thẳng thứ ba thì song song; qua $M$ chỉ một đường thẳng không cắt $a$, mọi đường khác đều cắt; và tính chất của hai đường thẳng song song.',
    },
  ],
  takeaways: [
    'Tiên đề Euclid: qua một điểm nằm ngoài một đường thẳng, chỉ có một đường thẳng song song với đường thẳng đó.',
    'Một đường thẳng cắt hai đường thẳng song song thì hai góc so le trong bằng nhau, hai góc đồng vị bằng nhau (và hai góc trong cùng phía bù nhau).',
    'Hai đường thẳng phân biệt cùng song song với đường thẳng thứ ba thì song song; đường thẳng vuông góc với một trong hai đường song song thì vuông góc với đường kia.',
  ],
};
