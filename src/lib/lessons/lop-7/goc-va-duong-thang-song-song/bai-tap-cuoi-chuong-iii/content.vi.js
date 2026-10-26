/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương III: hệ thống hoá góc ở vị trí đặc biệt, tia phân giác, hai đường thẳng song song, tiên đề Euclid, định lí và chứng minh định lí, kèm bài tập tổng hợp và bài toán thực tế.',
  intro:
    'Chương III đã đi từ các cặp góc chung đỉnh (kề bù, đối đỉnh) đến các cặp góc tạo bởi một đường thẳng cắt hai đường thẳng, rồi tới tiên đề Euclid và cách chứng minh một định lí. Bài này giúp em xâu chuỗi tất cả: biết dùng tính chất nào cho từng loại câu hỏi, và tìm ra phần kiến thức còn cần ôn lại.',
  objectives: [
    'Hệ thống hoá kiến thức của chương: hai góc kề bù, đối đỉnh, tia phân giác, các cặp góc so le trong, đồng vị, dấu hiệu nhận biết và tính chất của hai đường thẳng song song, tiên đề Euclid, định lí.',
    'Giải các bài tập trắc nghiệm và tự luận tổng hợp: tính góc, chứng minh hai đường thẳng song song hoặc vuông góc.',
    'Vận dụng vào các tình huống thực tế như đường ray, mép bàn, khung cửa.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Bài', 'Kiến thức chính'],
          rows: [
            [
              'Bài 8',
              'Hai góc kề bù có tổng $180^\\circ$; hai góc đối đỉnh thì bằng nhau; tia phân giác $Oz$ của $\\widehat{xOy}$ cho $\\widehat{xOz} = \\widehat{zOy} = \\dfrac{\\widehat{xOy}}{2}$.',
            ],
            [
              'Bài 9',
              'Đường thẳng $c$ cắt $a$, $b$ tạo ra các cặp góc so le trong, đồng vị. Có một cặp góc so le trong (hoặc đồng vị) bằng nhau thì $a \\parallel b$.',
            ],
            [
              'Bài 10',
              'Tiên đề Euclid: qua một điểm ngoài một đường thẳng chỉ có một đường thẳng song song với nó. Nếu $a \\parallel b$ thì các góc so le trong, đồng vị bằng nhau, các góc trong cùng phía bù nhau.',
            ],
            [
              'Bài 11',
              'Định lí gồm giả thiết (GT) và kết luận (KL); chứng minh là dùng lập luận suy ra KL từ GT và các khẳng định đúng đã biết.',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Các hệ quả hay dùng: hai đường thẳng phân biệt cùng vuông góc (hoặc cùng song song) với một đường thẳng thứ ba thì song song; đường thẳng vuông góc với một trong hai đường thẳng song song thì vuông góc với đường kia; qua một điểm chỉ có một đường thẳng vuông góc với một đường thẳng cho trước.',
        },
      ],
    },
    {
      heading: 'Chọn công cụ cho từng câu hỏi',
      blocks: [
        {
          type: 'table',
          head: ['Câu hỏi', 'Công cụ'],
          rows: [
            [
              'Hai góc chung đỉnh',
              'Kề bù (tổng $180^\\circ$), đối đỉnh (bằng nhau), góc bẹt, tia phân giác.',
            ],
            [
              'Chứng tỏ $a \\parallel b$',
              'Dấu hiệu nhận biết: tìm một cặp góc so le trong hoặc đồng vị bằng nhau; hoặc hai đường cùng vuông góc, cùng song song với đường thứ ba.',
            ],
            [
              'Đã có $a \\parallel b$, tính góc',
              'Tính chất: góc so le trong, đồng vị bằng nhau; góc trong cùng phía bù nhau.',
            ],
            [
              'Góc "gãy khúc" giữa hai tia song song',
              'Kẻ thêm qua đỉnh góc một đường thẳng song song với hai tia.',
            ],
            [
              'Chứng minh "chỉ có một"',
              'Giả sử có hai, rồi chỉ ra điều vô lí với tiên đề Euclid hay một định lí đã biết.',
            ],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Mỗi lượt có 14 câu trộn ngẫu nhiên, hai câu cho mỗi kĩ năng của chương. Nhập một số tự nhiên (số đo góc bằng độ, hoặc số cặp đường thẳng). Bản đồ kĩ năng tô màu theo kết quả lần trả lời đầu của từng bài: ô chưa xanh là phần em nên ôn lại.',
  },
  examples: [
    {
      problem:
        'Cho $\\widehat{xOy} = 120^\\circ$ và $\\widehat{yOz} = 110^\\circ$, trong đó tia đối $Ot$ của tia $Oy$ nằm giữa hai tia $Ox$ và $Oz$. Tính $\\widehat{zOx}$.',
      steps: [
        'Vẽ tia $Ot$ là tia đối của tia $Oy$.',
        '$\\widehat{xOy}$ và $\\widehat{xOt}$ kề bù nên $\\widehat{xOt} = 180^\\circ - 120^\\circ = 60^\\circ$.',
        '$\\widehat{yOz}$ và $\\widehat{zOt}$ kề bù nên $\\widehat{zOt} = 180^\\circ - 110^\\circ = 70^\\circ$.',
        'Tia $Ot$ nằm giữa $Ox$ và $Oz$ nên $\\widehat{zOx} = \\widehat{zOt} + \\widehat{tOx} = 70^\\circ + 60^\\circ = 130^\\circ$.',
      ],
      answer: '$\\widehat{zOx} = 130^\\circ$.',
    },
    {
      problem:
        'Hai tia $Ax$, $By$ nằm trên hai đường thẳng song song, cùng hướng; điểm $C$ nằm giữa hai đường thẳng đó, về phía hai tia. Chứng minh $\\widehat{ACB} = \\widehat{xAC} + \\widehat{yBC}$.',
      steps: [
        "Qua $C$ vẽ đường thẳng $zz'$ song song với $Ax$ (tia $Cz'$ ngược hướng với $Ax$). Vì $Ax$, $By$ nằm trên hai đường thẳng song song nên $zz'$ cũng song song với đường thẳng chứa $By$.",
        "$zz' \\parallel Ax$ nên $\\widehat{ACz'} = \\widehat{xAC}$ (hai góc so le trong).",
        "$zz' \\parallel By$ nên $\\widehat{z'CB} = \\widehat{yBC}$ (hai góc so le trong).",
        "Tia $Cz'$ nằm giữa $CA$ và $CB$ nên $\\widehat{ACB} = \\widehat{ACz'} + \\widehat{z'CB} = \\widehat{xAC} + \\widehat{yBC}$.",
      ],
      answer: '$\\widehat{ACB} = \\widehat{xAC} + \\widehat{yBC}$.',
    },
    {
      problem:
        'Vẽ ba đường thẳng phân biệt $a$, $b$, $c$ sao cho $a \\parallel b$, $b \\parallel c$, và hai đường thẳng phân biệt $m$, $n$ cùng vuông góc với $a$. Có bao nhiêu cặp đường thẳng song song, bao nhiêu cặp đường thẳng vuông góc?',
      steps: [
        '$a \\parallel b$, $b \\parallel c$ nên $a \\parallel c$: ba cặp song song $a$ và $b$, $b$ và $c$, $a$ và $c$.',
        '$m$, $n$ cùng vuông góc với $a$ nên $m \\parallel n$: thêm một cặp song song. Tổng cộng $4$ cặp song song.',
        '$m \\perp a$ mà $a \\parallel b$, $a \\parallel c$ nên $m \\perp b$, $m \\perp c$; tương tự với $n$. Có $2 \\cdot 3 = 6$ cặp vuông góc.',
      ],
      answer: '$4$ cặp đường thẳng song song và $6$ cặp đường thẳng vuông góc.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        "Hai tia $Ox$, $Ox'$ đối nhau; hai tia $Oy$, $Oz$ nằm trên cùng một nửa mặt phẳng bờ $xx'$ chia góc bẹt $\\widehat{xOx'}$ thành ba góc $\\widehat{O}_1 = \\widehat{xOy}$, $\\widehat{O}_2 = \\widehat{yOz}$, $\\widehat{O}_3 = \\widehat{zOx'}$. Biết $\\widehat{O}_1 = 48^\\circ$, $\\widehat{O}_3 = 67^\\circ$. Tính $\\widehat{O}_2$ (đơn vị độ).",
      answer: 65,
      unit: '°',
      hints: ["Ba góc ghép lại thành góc bẹt $\\widehat{xOx'}$."],
      solution:
        '$\\widehat{O}_1 + \\widehat{O}_2 + \\widehat{O}_3 = 180^\\circ$ nên $\\widehat{O}_2 = 180^\\circ - 48^\\circ - 67^\\circ = 65^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Cho $\\widehat{xOy} = 130^\\circ$ và $\\widehat{yOz} = 115^\\circ$, trong đó tia đối $Ot$ của tia $Oy$ nằm giữa hai tia $Ox$ và $Oz$. Tính $\\widehat{zOx}$ (đơn vị độ).',
      answer: 115,
      unit: '°',
      hints: [
        '$\\widehat{xOt}$ kề bù với $\\widehat{xOy}$, $\\widehat{zOt}$ kề bù với $\\widehat{yOz}$.',
        '$\\widehat{zOx} = \\widehat{zOt} + \\widehat{tOx}$.',
      ],
      solution:
        '$\\widehat{xOt} = 180^\\circ - 130^\\circ = 50^\\circ$, $\\widehat{zOt} = 180^\\circ - 115^\\circ = 65^\\circ$. Tia $Ot$ nằm giữa $Ox$, $Oz$ nên $\\widehat{zOx} = 65^\\circ + 50^\\circ = 115^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Hai đường thẳng cắt nhau tạo thành bốn góc, trong đó hai góc kề nhau hơn kém nhau $40^\\circ$. Tính góc lớn hơn (đơn vị độ).',
      answer: 110,
      unit: '°',
      hints: ['Hai góc kề nhau ở đây là hai góc kề bù, tổng của chúng bằng $180^\\circ$.'],
      solution:
        'Hai góc kề bù có tổng $180^\\circ$ và hiệu $40^\\circ$, nên góc lớn bằng $(180^\\circ + 40^\\circ) : 2 = 110^\\circ$. Bốn góc là $110^\\circ$, $70^\\circ$, $110^\\circ$, $70^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        "Hai góc $\\widehat{xOy}$ và $\\widehat{yOx'}$ kề bù; $Om$, $On$ lần lượt là tia phân giác của hai góc đó. Tính $\\widehat{mOn}$ (đơn vị độ).",
      answer: 90,
      unit: '°',
      hints: [
        '$\\widehat{mOn} = \\widehat{mOy} + \\widehat{yOn}$, mỗi góc bằng một nửa góc chứa nó.',
      ],
      solution:
        "$\\widehat{mOn} = \\dfrac{\\widehat{xOy}}{2} + \\dfrac{\\widehat{yOx'}}{2} = \\dfrac{180^\\circ}{2} = 90^\\circ$: hai tia phân giác của hai góc kề bù vuông góc với nhau.",
    },
    {
      type: 'choice',
      prompt:
        'Đường thẳng $c$ cắt hai đường thẳng $a$, $b$ tại $A$, $B$ (đánh số góc như Bài 9). Biết $\\widehat{A}_1 = 70^\\circ$, $\\widehat{B}_2 = 110^\\circ$. Kết luận nào đúng?',
      options: [
        '$a \\parallel b$, vì $\\widehat{B}_3 = 180^\\circ - 110^\\circ = 70^\\circ = \\widehat{A}_1$ là cặp góc so le trong bằng nhau.',
        '$a$ cắt $b$, vì $\\widehat{A}_1 \\ne \\widehat{B}_2$.',
        '$a \\perp b$.',
        'Chưa đủ dữ kiện để kết luận.',
      ],
      answer: 0,
      hints: [
        'Tính $\\widehat{B}_3$ từ $\\widehat{B}_2$ (hai góc kề bù), rồi so sánh với $\\widehat{A}_1$.',
      ],
      solution:
        '$\\widehat{B}_3 = 180^\\circ - 110^\\circ = 70^\\circ$ (kề bù với $\\widehat{B}_2$). $\\widehat{A}_1$ và $\\widehat{B}_3$ là hai góc so le trong và bằng nhau, nên $a \\parallel b$ theo dấu hiệu nhận biết. $\\widehat{A}_1$, $\\widehat{B}_2$ là cặp góc trong cùng phía, không cần bằng nhau.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $c$ cắt hai đường thẳng song song $a$, $b$ tại $A$, $B$ (đánh số góc như Bài 9) và $\\widehat{A}_2 = 65^\\circ$. Tính $\\widehat{B}_1$ (đơn vị độ).',
      answer: 115,
      unit: '°',
      hints: [
        'Từ $\\widehat{A}_2$ suy ra góc đồng vị $\\widehat{B}_2$.',
        '$\\widehat{B}_1$ kề bù với $\\widehat{B}_2$.',
      ],
      solution:
        '$a \\parallel b$ nên $\\widehat{B}_2 = \\widehat{A}_2 = 65^\\circ$ (đồng vị). $\\widehat{B}_1 = 180^\\circ - 65^\\circ = 115^\\circ$ (kề bù).',
    },
    {
      type: 'number',
      prompt:
        'Hai thanh ray $a$, $b$ của một đường tàu là hai đường thẳng song song. Một con đường thẳng $c$ cắt ngang hai thanh ray; góc nhọn tạo bởi $c$ và thanh ray $a$ bằng $62^\\circ$. Tính góc tù tạo bởi $c$ và thanh ray $b$ (đơn vị độ).',
      answer: 118,
      unit: '°',
      hints: [
        'Góc nhọn ở thanh ray $b$ đồng vị với góc nhọn ở thanh ray $a$.',
        'Góc tù và góc nhọn ở cùng một giao điểm là hai góc kề bù.',
      ],
      solution:
        '$a \\parallel b$ nên góc nhọn tạo bởi $c$ và $b$ bằng $62^\\circ$ (đồng vị). Góc tù ở cùng giao điểm kề bù với nó: $180^\\circ - 62^\\circ = 118^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Hai tia $Ax$, $By$ song song, cùng hướng; điểm $C$ nằm giữa hai đường thẳng chứa chúng, về phía hai tia đó. Biết $\\widehat{xAC} = 28^\\circ$, $\\widehat{yBC} = 47^\\circ$. Tính $\\widehat{ACB}$ (đơn vị độ).',
      answer: 75,
      unit: '°',
      hints: ['Qua $C$ kẻ đường thẳng song song với $Ax$, rồi dùng hai cặp góc so le trong.'],
      solution:
        "Qua $C$ kẻ $zz' \\parallel Ax$ thì $zz' \\parallel By$. $\\widehat{ACz'} = 28^\\circ$, $\\widehat{z'CB} = 47^\\circ$ (so le trong), nên $\\widehat{ACB} = 28^\\circ + 47^\\circ = 75^\\circ$.",
    },
    {
      type: 'number',
      prompt:
        'Bốn đường thẳng phân biệt $a$, $b$, $c$, $d$ có $a \\parallel b$, $b \\parallel c$, $c \\parallel d$; hai đường thẳng phân biệt $m$, $n$ cùng vuông góc với $a$. Có tất cả bao nhiêu cặp đường thẳng song song?',
      answer: 7,
      hints: [
        'Bốn đường $a$, $b$, $c$, $d$ đôi một song song. Mỗi đường ghép được với ba đường còn lại.',
        '$m$ và $n$ cùng vuông góc với $a$ thì sao?',
      ],
      solution:
        'Bốn đường $a$, $b$, $c$, $d$ đôi một song song cho $\\dfrac{4 \\cdot 3}{2} = 6$ cặp. $m \\parallel n$ (cùng vuông góc với $a$) cho thêm $1$ cặp. $m$, $n$ vuông góc với cả bốn đường kia nên không có cặp song song nào khác. Tổng: $7$ cặp.',
    },
    {
      type: 'choice',
      prompt:
        'Cho điểm $A$ và đường thẳng $d$. Có bao nhiêu đường thẳng đi qua $A$ và vuông góc với $d$?',
      options: ['Không có', 'Chỉ có một', 'Có hai', 'Có vô số'],
      answer: 1,
      hints: [
        'Nếu có hai đường thẳng phân biệt qua $A$ cùng vuông góc với $d$ thì chúng phải thế nào với nhau?',
      ],
      solution:
        'Giả sử $a$, $b$ phân biệt cùng qua $A$ và vuông góc với $d$. Khi đó $a \\parallel b$ (cùng vuông góc với $d$), nhưng hai đường thẳng song song không có điểm chung, vô lí vì cả hai qua $A$. Vậy chỉ có một đường thẳng như vậy.',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các bước để chứng minh: qua điểm $A$ chỉ có một đường thẳng vuông góc với đường thẳng $d$.',
      items: [
        'Hai đường thẳng phân biệt cùng vuông góc với $d$ nên $a \\parallel b$.',
        'Vậy điều giả sử là sai: chỉ có một đường thẳng qua $A$ vuông góc với $d$.',
        'Giả sử có hai đường thẳng phân biệt $a$, $b$ cùng đi qua $A$ và cùng vuông góc với $d$.',
        'Nhưng $a$ và $b$ có điểm chung $A$, nên chúng không thể song song.',
      ],
      answer: [2, 0, 3, 1],
      hints: [
        'Chứng minh bắt đầu bằng một điều giả sử.',
        'Suy ra một hệ quả, chỉ ra nó mâu thuẫn, rồi mới kết luận.',
      ],
      solution:
        'Giả sử có hai đường thẳng $a$, $b$ như vậy $\\Rightarrow$ $a \\parallel b$ (cùng vuông góc với $d$) $\\Rightarrow$ mâu thuẫn vì $a$, $b$ cùng đi qua $A$ $\\Rightarrow$ chỉ có một đường thẳng qua $A$ vuông góc với $d$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        'Hai góc đối đỉnh thì bằng nhau.',
        'Hai góc bằng nhau thì đối đỉnh.',
        'Nếu $a \\parallel b$ thì hai góc trong cùng phía tạo bởi một đường thẳng cắt $a$, $b$ có tổng bằng $180^\\circ$.',
        'Qua một điểm nằm ngoài đường thẳng $a$ có hai đường thẳng song song với $a$.',
        'Nếu $a \\parallel b$ và $c \\perp a$ thì $c \\perp b$.',
      ],
      answers: [0, 2, 4],
      hints: [
        'Mỗi khẳng định ứng với một tính chất, tiên đề hay định lí của chương. Khẳng định nào là "đảo ngược" sai?',
      ],
      solution:
        'Đúng: hai góc đối đỉnh bằng nhau (Bài 8); góc trong cùng phía bù nhau khi $a \\parallel b$ (Bài 10); $c \\perp a$, $a \\parallel b$ thì $c \\perp b$ (Bài 10). Sai: hai góc bằng nhau chưa chắc đối đỉnh; theo tiên đề Euclid chỉ có một đường thẳng song song với $a$.',
    },
  ],
  takeaways: [
    'Hai góc chung đỉnh: kề bù có tổng $180^\\circ$, đối đỉnh thì bằng nhau, tia phân giác chia đôi góc.',
    'Góc bằng nhau $\\Rightarrow$ song song là dấu hiệu nhận biết; song song $\\Rightarrow$ góc bằng nhau là tính chất. Tiên đề Euclid bảo đảm chỉ có một đường thẳng song song qua một điểm.',
    'Một định lí gồm GT và KL; chứng minh là chuỗi bước có căn cứ, có thể bắt đầu bằng "giả sử" để chỉ ra điều vô lí.',
  ],
};
