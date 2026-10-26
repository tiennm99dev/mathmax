/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Định lí là khẳng định được suy ra từ những khẳng định được coi là đúng; cách viết giả thiết, kết luận của một định lí và cách chứng minh định lí bằng lập luận.',
  intro:
    'Đo nhiều cặp góc đối đỉnh, lần nào em cũng thấy chúng bằng nhau. Nhưng đo thì chỉ được một số trường hợp và luôn có sai số. Làm sao biết chắc điều đó đúng với mọi cặp góc đối đỉnh? Câu trả lời là chứng minh: dùng lập luận để suy ra nó từ những điều đã biết là đúng.',
  objectives: [
    'Hiểu thế nào là một định lí và viết định lí dưới dạng "Nếu ... thì ...".',
    'Chỉ ra giả thiết và kết luận của một định lí, ghi GT, KL kèm hình vẽ.',
    'Hiểu thế nào là chứng minh định lí và trình bày một chứng minh đơn giản, mỗi bước có căn cứ.',
  ],
  sections: [
    {
      heading: 'Định lí',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định lí',
          text: 'Định lí là một khẳng định được suy ra từ những khẳng định được coi là đúng.',
        },
        {
          type: 'p',
          text: 'Ví dụ: "Hai góc đối đỉnh thì bằng nhau" là một định lí. Các khẳng định được coi là đúng có thể là tiên đề (như tiên đề Euclid), định nghĩa, hay những định lí đã được chứng minh trước đó.',
        },
        {
          type: 'p',
          text: 'Mỗi định lí thường được phát biểu dưới dạng "Nếu ... thì ...":',
        },
        {
          type: 'list',
          items: [
            'Phần nằm giữa từ "Nếu" và từ "thì" là giả thiết của định lí, viết tắt là GT: điều đã cho.',
            'Phần sau từ "thì" là kết luận của định lí, viết tắt là KL: điều phải suy ra.',
          ],
        },
        {
          type: 'table',
          caption: 'Định lí: Nếu hai góc đối đỉnh thì hai góc đó bằng nhau',
          head: ['Phần', 'Nội dung'],
          rows: [
            ['GT', "$\\widehat{xOy}$ và $\\widehat{x'Oy'}$ là hai góc đối đỉnh"],
            ['KL', "$\\widehat{xOy} = \\widehat{x'Oy'}$"],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Không phải khẳng định nào cũng là định lí. "Hai góc bằng nhau thì đối đỉnh" là một khẳng định sai: chỉ cần một hình vẽ hai góc $30^\\circ$ ở hai chỗ khác nhau là thấy.',
        },
      ],
    },
    {
      heading: 'Chứng minh định lí',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chứng minh định lí',
          text: 'Chứng minh định lí là dùng lập luận để từ giả thiết và những khẳng định đúng đã biết suy ra kết luận của định lí.',
        },
        {
          type: 'p',
          text: 'Một chứng minh gồm nhiều bước. Mỗi bước là một khẳng định kèm căn cứ (giả thiết, định nghĩa, tiên đề hay định lí đã biết), và chỉ được dùng những điều đã có ở các bước trước. Bước cuối cùng chính là kết luận.',
        },
        {
          type: 'p',
          text: "Chứng minh định lí hai góc đối đỉnh thì bằng nhau (với $xx'$ và $yy'$ cắt nhau tại $O$):",
        },
        {
          type: 'table',
          head: ['Bước', 'Khẳng định', 'Căn cứ'],
          rows: [
            ['1', "$\\widehat{xOy} + \\widehat{yOx'} = 180^\\circ$", 'Hai góc kề bù'],
            ['2', "$\\widehat{x'Oy'} + \\widehat{yOx'} = 180^\\circ$", 'Hai góc kề bù'],
            [
              '3',
              "$\\widehat{xOy} + \\widehat{yOx'} = \\widehat{x'Oy'} + \\widehat{yOx'}$",
              'Từ 1 và 2 (cùng bằng $180^\\circ$)',
            ],
            ['4', "$\\widehat{xOy} = \\widehat{x'Oy'}$", "Bớt $\\widehat{yOx'}$ ở cả hai vế"],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bước 1 và bước 2 không phụ thuộc nhau nên có thể đổi chỗ; nhưng bước 3 phải đứng sau cả hai, vì nó dùng kết quả của chúng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp các bước chứng minh',
    instruction:
      'Chọn một định lí. Dùng các nút mũi tên để xếp các bước theo thứ tự lập luận, chọn lí do cho từng bước rồi bấm Kiểm tra chứng minh. Dòng tô đỏ cho biết bước đặt sai chỗ hoặc lí do chưa đúng.',
  },
  examples: [
    {
      problem:
        'Viết giả thiết và kết luận của định lí: "Nếu một đường thẳng cắt hai đường thẳng song song thì hai góc so le trong bằng nhau."',
      steps: [
        'Phần giữa "Nếu" và "thì": một đường thẳng cắt hai đường thẳng song song. Đặt tên: đường thẳng $c$ cắt hai đường thẳng $a \\parallel b$ tại $A$ và $B$.',
        'Phần sau "thì": hai góc so le trong bằng nhau, chẳng hạn $\\widehat{A}_1 = \\widehat{B}_3$.',
      ],
      answer:
        'GT: $a \\parallel b$, $c$ cắt $a$ tại $A$, cắt $b$ tại $B$. KL: $\\widehat{A}_1 = \\widehat{B}_3$.',
    },
    {
      problem:
        "Chứng minh định lí: Hai tia phân giác của hai góc kề bù thì vuông góc với nhau. (GT: $\\widehat{xOy}$ và $\\widehat{yOx'}$ kề bù, $Om$ là tia phân giác của $\\widehat{xOy}$, $On$ là tia phân giác của $\\widehat{yOx'}$. KL: $Om \\perp On$.)",
      steps: [
        "$Om$ là tia phân giác của $\\widehat{xOy}$ nên $\\widehat{mOy} = \\dfrac{\\widehat{xOy}}{2}$; $On$ là tia phân giác của $\\widehat{yOx'}$ nên $\\widehat{yOn} = \\dfrac{\\widehat{yOx'}}{2}$.",
        "Hai góc kề bù nên $\\widehat{xOy} + \\widehat{yOx'} = 180^\\circ$.",
        'Tia $Oy$ nằm giữa hai tia $Om$ và $On$ nên $\\widehat{mOn} = \\widehat{mOy} + \\widehat{yOn}$.',
        "Suy ra $\\widehat{mOn} = \\dfrac{\\widehat{xOy} + \\widehat{yOx'}}{2} = \\dfrac{180^\\circ}{2} = 90^\\circ$, tức là $Om \\perp On$.",
      ],
      answer: '$Om \\perp On$.',
    },
    {
      problem:
        'Chứng minh định lí: Nếu hai đường thẳng phân biệt $a$, $b$ cùng vuông góc với đường thẳng $c$ thì $a \\parallel b$.',
      steps: [
        'GT: $a \\perp c$ tại $A$, $b \\perp c$ tại $B$. KL: $a \\parallel b$.',
        '$a \\perp c$ nên $\\widehat{A}_1 = 90^\\circ$; $b \\perp c$ nên $\\widehat{B}_1 = 90^\\circ$.',
        'Do đó $\\widehat{A}_1 = \\widehat{B}_1$, mà đây là cặp góc đồng vị.',
        'Theo dấu hiệu nhận biết hai đường thẳng song song, $a \\parallel b$.',
      ],
      answer: '$a \\parallel b$.',
    },
  ],
  practice: [
    {
      type: 'text',
      prompt:
        'Trong định lí "Nếu một đường thẳng vuông góc với một trong hai đường thẳng song song thì nó vuông góc với đường thẳng kia", phần nằm giữa "Nếu" và "thì" được gọi là gì?',
      accept: ['giả thiết', 'GT', 'giả thiết của định lí'],
      hints: ['Đó là điều đã cho, viết tắt là GT.'],
      solution:
        'Phần giữa "Nếu" và "thì" là giả thiết (GT): một đường thẳng vuông góc với một trong hai đường thẳng song song. Phần sau "thì" là kết luận (KL).',
    },
    {
      type: 'choice',
      prompt:
        'Kết luận của định lí "Nếu hai đường thẳng phân biệt cùng song song với một đường thẳng thứ ba thì chúng song song với nhau" là',
      options: [
        'Hai đường thẳng phân biệt.',
        'Hai đường thẳng cùng song song với đường thẳng thứ ba.',
        'Hai đường thẳng đó song song với nhau.',
        'Đường thẳng thứ ba song song với hai đường thẳng.',
      ],
      answer: 2,
      hints: ['Kết luận là phần đứng sau từ "thì".'],
      solution:
        'Phần sau "thì" là "chúng song song với nhau", nên kết luận là: hai đường thẳng đó song song với nhau.',
    },
    {
      type: 'choice',
      prompt:
        'Phát biểu nào là cách viết đúng định lí "Hai góc đối đỉnh thì bằng nhau" dưới dạng "Nếu ... thì ..."?',
      options: [
        'Nếu hai góc bằng nhau thì chúng đối đỉnh.',
        'Nếu hai góc đối đỉnh thì hai góc đó bằng nhau.',
        'Nếu hai góc kề bù thì chúng bằng nhau.',
        'Nếu hai góc không đối đỉnh thì chúng không bằng nhau.',
      ],
      answer: 1,
      hints: ['Điều đã cho là gì? Điều phải suy ra là gì?'],
      solution:
        'Giả thiết là "hai góc đối đỉnh", kết luận là "hai góc đó bằng nhau": Nếu hai góc đối đỉnh thì hai góc đó bằng nhau. Phương án đầu đảo ngược giả thiết và kết luận, nên là một khẳng định sai.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định "Hai góc bằng nhau thì đối đỉnh" có phải là một định lí không?',
      options: [
        'Có, vì đảo lại của một định lí luôn là định lí.',
        'Có, vì nó suy ra từ định nghĩa hai góc đối đỉnh.',
        'Không, vì có những cặp góc bằng nhau mà không đối đỉnh.',
        'Không, vì một định lí không được có từ "thì".',
      ],
      answer: 2,
      hints: ['Thử tìm một cặp góc bằng nhau nhưng không đối đỉnh.'],
      solution:
        'Đây là khẳng định sai: hai góc $40^\\circ$ vẽ ở hai chỗ khác nhau bằng nhau nhưng không đối đỉnh. Một khẳng định sai không phải là định lí; đảo lại của một định lí chưa chắc đúng.',
    },
    {
      type: 'order',
      prompt:
        "Sắp xếp các bước chứng minh: nếu hai đường thẳng $xx'$ và $yy'$ cắt nhau tại $O$ thì $\\widehat{xOy} = \\widehat{x'Oy'}$.",
      items: [
        "$\\widehat{xOy} = \\widehat{x'Oy'}$ (bớt $\\widehat{yOx'}$ ở cả hai vế).",
        "$\\widehat{xOy}$ và $\\widehat{yOx'}$ kề bù; $\\widehat{x'Oy'}$ và $\\widehat{yOx'}$ cũng kề bù.",
        "$\\widehat{xOy} + \\widehat{yOx'} = \\widehat{x'Oy'} + \\widehat{yOx'}$ (cùng bằng $180^\\circ$).",
        "$\\widehat{xOy} + \\widehat{yOx'} = 180^\\circ$ và $\\widehat{x'Oy'} + \\widehat{yOx'} = 180^\\circ$.",
      ],
      answer: [1, 3, 2, 0],
      hints: [
        'Bắt đầu từ điều nhìn thấy ngay trên hình: những cặp góc nào kề bù? Kết luận đứng cuối.',
        'Phải có hai tổng bằng $180^\\circ$ rồi mới so sánh được hai tổng.',
      ],
      solution:
        "Thứ tự: $\\widehat{xOy}$, $\\widehat{yOx'}$ kề bù và $\\widehat{x'Oy'}$, $\\widehat{yOx'}$ kề bù; nên hai tổng đều bằng $180^\\circ$; suy ra hai tổng bằng nhau; bớt $\\widehat{yOx'}$ ở hai vế được $\\widehat{xOy} = \\widehat{x'Oy'}$.",
    },
    {
      type: 'match',
      prompt:
        'Chứng minh: $a \\perp c$ tại $A$, $b \\perp c$ tại $B$ thì $a \\parallel b$. Nối mỗi bước với căn cứ của nó.',
      left: [
        '$\\widehat{A}_1 = 90^\\circ$',
        '$\\widehat{B}_1 = 90^\\circ$',
        '$\\widehat{A}_1 = \\widehat{B}_1$',
        '$a \\parallel b$',
      ],
      right: [
        'Giả thiết $a \\perp c$',
        'Giả thiết $b \\perp c$',
        'Cùng bằng $90^\\circ$',
        'Có cặp góc đồng vị bằng nhau (dấu hiệu nhận biết)',
        'Tiên đề Euclid',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Hai góc vuông có được là nhờ giả thiết.',
        'Bước cuối dựa vào dấu hiệu ở Bài 9, không cần tiên đề Euclid.',
      ],
      solution:
        '$\\widehat{A}_1 = 90^\\circ$ vì $a \\perp c$; $\\widehat{B}_1 = 90^\\circ$ vì $b \\perp c$; $\\widehat{A}_1 = \\widehat{B}_1$ vì cùng bằng $90^\\circ$; $a \\parallel b$ vì có một cặp góc đồng vị bằng nhau.',
    },
    {
      type: 'number',
      prompt:
        "$\\widehat{xOy}$ và $\\widehat{yOx'}$ kề bù, $\\widehat{xOy} = 70^\\circ$. $Om$, $On$ lần lượt là tia phân giác của $\\widehat{xOy}$ và $\\widehat{yOx'}$. Tính $\\widehat{mOn}$ (đơn vị độ).",
      answer: 90,
      unit: '°',
      hints: [
        'Em đã chứng minh một định lí về hai tia phân giác của hai góc kề bù.',
        'Hoặc tính trực tiếp: $\\widehat{mOy} = 35^\\circ$, $\\widehat{yOn} = (180^\\circ - 70^\\circ) : 2$.',
      ],
      solution:
        "Theo định lí đã chứng minh, $Om \\perp On$ nên $\\widehat{mOn} = 90^\\circ$. Kiểm tra: $\\widehat{mOy} = 35^\\circ$, $\\widehat{yOx'} = 110^\\circ$ nên $\\widehat{yOn} = 55^\\circ$, và $35^\\circ + 55^\\circ = 90^\\circ$.",
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        'Định lí là một khẳng định được suy ra từ những khẳng định được coi là đúng.',
        'Đo thật cẩn thận vài trường hợp là đủ để chứng minh một định lí.',
        'Trong chứng minh, mỗi bước cần có căn cứ.',
        'Tiên đề là khẳng định được thừa nhận là đúng mà không chứng minh.',
      ],
      answers: [0, 2, 3],
      hints: ['Đo đạc chỉ kiểm tra được một số trường hợp và có sai số.'],
      solution:
        'Đo đạc chỉ giúp dự đoán, không chứng minh được điều đúng cho mọi trường hợp. Các khẳng định còn lại đúng.',
    },
  ],
  takeaways: [
    'Định lí là một khẳng định được suy ra từ những khẳng định được coi là đúng.',
    'Định lí dạng "Nếu ... thì ...": phần giữa "Nếu" và "thì" là giả thiết (GT), phần sau "thì" là kết luận (KL).',
    'Chứng minh định lí là dùng lập luận để từ giả thiết suy ra kết luận; mỗi bước có căn cứ và chỉ dùng điều đã có trước đó.',
  ],
};
