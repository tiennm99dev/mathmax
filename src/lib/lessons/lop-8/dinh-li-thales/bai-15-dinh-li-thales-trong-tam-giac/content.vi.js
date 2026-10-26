/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tỉ số của hai đoạn thẳng, đoạn thẳng tỉ lệ, định lí Thalès trong tam giác và định lí Thalès đảo, kèm cách dùng để tính độ dài và chứng minh hai đường thẳng song song.',
  intro:
    'Kẻ một đường thẳng song song với một cạnh của tam giác, nó cắt hai cạnh còn lại thành bốn đoạn. Độ dài các đoạn ấy thay đổi theo vị trí đường thẳng, nhưng có một điều không bao giờ đổi: chúng luôn tỉ lệ với nhau. Đó là nội dung định lí mang tên nhà toán học Hy Lạp cổ đại Thalès.',
  objectives: [
    'Tính tỉ số của hai đoạn thẳng và nhận biết hai cặp đoạn thẳng tỉ lệ.',
    'Phát biểu định lí Thalès trong tam giác và viết đúng các tỉ lệ thức của nó.',
    'Dùng định lí Thalès để tính độ dài đoạn thẳng.',
    'Dùng định lí Thalès đảo để chứng minh hai đường thẳng song song.',
  ],
  sections: [
    {
      heading: 'Đoạn thẳng tỉ lệ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tỉ số của hai đoạn thẳng',
          text: 'Tỉ số của hai đoạn thẳng là tỉ số độ dài của chúng theo cùng một đơn vị đo. Tỉ số của hai đoạn thẳng $AB$ và $CD$ kí hiệu là $\\dfrac{AB}{CD}$.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $AB = 3$ cm, $CD = 5$ cm thì $\\dfrac{AB}{CD} = \\dfrac{3}{5}$. Tỉ số không phụ thuộc đơn vị: đổi ra mi-li-mét, $\\dfrac{30}{50}$ vẫn bằng $\\dfrac{3}{5}$, miễn là hai đoạn được đo cùng một đơn vị.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đoạn thẳng tỉ lệ',
          text: "Hai đoạn thẳng $AB$ và $CD$ gọi là tỉ lệ với hai đoạn thẳng $A'B'$ và $C'D'$ nếu có tỉ lệ thức $$\\dfrac{AB}{CD} = \\dfrac{A'B'}{C'D'}.$$",
        },
        {
          type: 'p',
          text: "Chẳng hạn $AB = 2$ cm, $CD = 3$ cm, $A'B' = 4$ cm, $C'D' = 6$ cm: vì $\\dfrac{2}{3} = \\dfrac{4}{6}$ nên $AB$, $CD$ tỉ lệ với $A'B'$, $C'D'$.",
        },
      ],
    },
    {
      heading: 'Định lí Thalès trong tam giác',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí Thalès',
          text: 'Nếu một đường thẳng song song với một cạnh của tam giác và cắt hai cạnh còn lại thì nó định ra trên hai cạnh đó những đoạn thẳng tương ứng tỉ lệ.',
        },
        {
          type: 'p',
          text: "Cho tam giác $ABC$, đường thẳng song song với $BC$ cắt $AB$ tại $B'$ và cắt $AC$ tại $C'$. Khi đó:",
        },
        {
          type: 'tex',
          tex: "\\dfrac{AB'}{AB} = \\dfrac{AC'}{AC};\\qquad \\dfrac{AB'}{B'B} = \\dfrac{AC'}{C'C};\\qquad \\dfrac{B'B}{AB} = \\dfrac{C'C}{AC}.",
        },
        {
          type: 'p',
          text: 'Mẹo nhớ: mỗi tỉ số bên trái lấy các đoạn trên cạnh $AB$, tỉ số bên phải lấy đúng những đoạn ở vị trí tương ứng trên cạnh $AC$ (đoạn gần đỉnh $A$ ứng với đoạn gần đỉnh $A$, đoạn gần đáy ứng với đoạn gần đáy, cả cạnh ứng với cả cạnh).',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: "Không viết $\\dfrac{AB'}{AB} = \\dfrac{C'C}{AC}$: đoạn $AB'$ nằm sát đỉnh $A$ còn $C'C$ nằm sát đáy, chúng không ở vị trí tương ứng.",
        },
      ],
    },
    {
      heading: 'Định lí Thalès đảo',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí Thalès đảo',
          text: 'Nếu một đường thẳng cắt hai cạnh của một tam giác và định ra trên hai cạnh này những đoạn thẳng tương ứng tỉ lệ thì đường thẳng đó song song với cạnh còn lại của tam giác.',
        },
        {
          type: 'tex',
          tex: "B' \\in AB,\\; C' \\in AC,\\; \\dfrac{AB'}{AB} = \\dfrac{AC'}{AC} \\;\\Rightarrow\\; B'C' \\parallel BC",
        },
        {
          type: 'p',
          text: 'Định lí đảo cho ta thêm một cách chứng minh hai đường thẳng song song: chỉ cần tính độ dài và so sánh hai tỉ số. Phần Khám phá cho em thử cả hai chiều: chiều thuận (song song thì tỉ lệ) và chiều đảo (tỉ lệ thì song song).',
        },
      ],
    },
  ],
  explore: {
    title: 'Đường song song trượt trong tam giác',
    instruction:
      'Ở chế độ "Định lí thuận", kéo $B\'$ dọc cạnh $AB$ và quan sát hai tỉ số luôn bằng nhau. Ở chế độ "Định lí đảo", kéo riêng $C\'$ và tìm vị trí làm cho $B\'C\'$ song song với $BC$.',
  },
  examples: [
    {
      problem: 'Cho $AB = 60$ cm và $CD = 1{,}5$ m. Tính tỉ số $\\dfrac{AB}{CD}$.',
      steps: [
        'Đưa về cùng đơn vị: $CD = 1{,}5$ m $= 150$ cm.',
        '$\\dfrac{AB}{CD} = \\dfrac{60}{150}$.',
        'Rút gọn: $\\dfrac{60}{150} = \\dfrac{2}{5}$.',
      ],
      answer: '$\\dfrac{AB}{CD} = \\dfrac{2}{5}$.',
    },
    {
      problem:
        'Cho tam giác $ABC$, đường thẳng song song với $BC$ cắt $AB$ tại $M$ và cắt $AC$ tại $N$. Biết $AM = 3$ cm, $MB = 2$ cm, $AN = 4{,}5$ cm. Tính $NC$.',
      steps: [
        'Vì $MN \\parallel BC$, theo định lí Thalès: $\\dfrac{AM}{MB} = \\dfrac{AN}{NC}$.',
        'Thay số: $\\dfrac{3}{2} = \\dfrac{4{,}5}{NC}$.',
        '$NC = \\dfrac{4{,}5 \\cdot 2}{3} = 3$.',
      ],
      answer: '$NC = 3$ cm.',
    },
    {
      problem:
        'Cho tam giác $ABC$ có $AB = 9$ cm, $AC = 12$ cm. Lấy $D$ trên cạnh $AB$ và $E$ trên cạnh $AC$ sao cho $AD = 6$ cm, $AE = 8$ cm. Chứng minh $DE \\parallel BC$.',
      steps: [
        '$\\dfrac{AD}{AB} = \\dfrac{6}{9} = \\dfrac{2}{3}$.',
        '$\\dfrac{AE}{AC} = \\dfrac{8}{12} = \\dfrac{2}{3}$.',
        'Vậy $\\dfrac{AD}{AB} = \\dfrac{AE}{AC}$: đường thẳng $DE$ định ra trên hai cạnh $AB$, $AC$ những đoạn thẳng tương ứng tỉ lệ.',
      ],
      answer: 'Theo định lí Thalès đảo, $DE \\parallel BC$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt: 'Cho $AB = 4$ dm và $CD = 120$ cm. Tỉ số $\\dfrac{AB}{CD}$ bằng bao nhiêu?',
      answer: [1, 3],
      hints: ['Đổi hai độ dài về cùng một đơn vị trước.', '$4$ dm $= 40$ cm.'],
      solution: '$AB = 4$ dm $= 40$ cm, nên $\\dfrac{AB}{CD} = \\dfrac{40}{120} = \\dfrac{1}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $MN \\parallel BC$ với $M \\in AB$, $N \\in AC$. Biết $AM = 4$ cm, $MB = 6$ cm, $AN = 5$ cm. Tính $NC$.',
      answer: 7.5,
      unit: 'cm',
      hints: [
        'Dùng tỉ lệ thức của định lí Thalès với các đoạn trên hai cạnh.',
        '$\\dfrac{AM}{MB} = \\dfrac{AN}{NC}$.',
      ],
      solution:
        'Vì $MN \\parallel BC$ nên $\\dfrac{AM}{MB} = \\dfrac{AN}{NC}$, tức $\\dfrac{4}{6} = \\dfrac{5}{NC}$. Suy ra $NC = \\dfrac{5 \\cdot 6}{4} = 7{,}5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $MN \\parallel BC$ ($M \\in AB$, $N \\in AC$), $AM = 2$ cm, $AB = 5$ cm, $AC = 7{,}5$ cm. Tính $AN$.',
      answer: 3,
      unit: 'cm',
      hints: [
        'Dùng tỉ lệ thức giữa đoạn sát đỉnh $A$ và cả cạnh.',
        '$\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$.',
      ],
      solution:
        '$\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$ nên $\\dfrac{2}{5} = \\dfrac{AN}{7{,}5}$, suy ra $AN = \\dfrac{2 \\cdot 7{,}5}{5} = 3$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $MN \\parallel BC$ ($M \\in AB$, $N \\in AC$), $AM = 3$ cm, $MB = 2$ cm, $NC = 4$ cm. Tính $AN$.',
      answer: 6,
      unit: 'cm',
      hints: [
        '$\\dfrac{AM}{MB} = \\dfrac{AN}{NC}$.',
        'Đặt $AN = x$ rồi giải $\\dfrac{3}{2} = \\dfrac{x}{4}$.',
      ],
      solution: '$\\dfrac{3}{2} = \\dfrac{AN}{4}$ nên $AN = \\dfrac{3 \\cdot 4}{2} = 6$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AB = 12$ cm. Đường thẳng song song với $BC$ cắt $AB$ tại $M$ và cắt $AC$ tại $N$ sao cho $AN = 2$ cm, $NC = 6$ cm. Tính $AM$.',
      answer: 3,
      unit: 'cm',
      hints: ['Tính $AC = AN + NC$ trước.', 'Dùng $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$.'],
      solution:
        '$AC = 2 + 6 = 8$ cm. Theo định lí Thalès $\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{2}{8} = \\dfrac{1}{4}$, nên $AM = \\dfrac{12}{4} = 3$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Tam giác $ABC$ có $AB = 10$ cm, $AC = 15$ cm. Lấy $D$ trên cạnh $AB$, $E$ trên cạnh $AC$. Trường hợp nào chắc chắn $DE \\parallel BC$?',
      options: [
        '$AD = 4$ cm, $AE = 5$ cm',
        '$AD = 4$ cm, $AE = 6$ cm',
        '$AD = 6$ cm, $AE = 4$ cm',
        '$AD = 5$ cm, $AE = 8$ cm',
      ],
      answer: 1,
      hints: [
        'Dùng định lí Thalès đảo: so sánh $\\dfrac{AD}{AB}$ với $\\dfrac{AE}{AC}$.',
        'Với $AB = 10$, $AC = 15$, hai tỉ số bằng nhau khi $AE = 1{,}5 \\cdot AD$.',
      ],
      solution:
        '$\\dfrac{4}{10} = \\dfrac{6}{15} = \\dfrac{2}{5}$, nên với $AD = 4$ cm, $AE = 6$ cm thì $DE \\parallel BC$. Các trường hợp khác: $\\dfrac{4}{10} \\ne \\dfrac{5}{15}$, $\\dfrac{6}{10} \\ne \\dfrac{4}{15}$, $\\dfrac{5}{10} \\ne \\dfrac{8}{15}$.',
    },
    {
      type: 'multi',
      prompt:
        "Tam giác $ABC$ có $B'C' \\parallel BC$ ($B' \\in AB$, $C' \\in AC$). Chọn tất cả các tỉ lệ thức đúng.",
      options: [
        "$\\dfrac{AB'}{AB} = \\dfrac{AC'}{AC}$",
        "$\\dfrac{AB'}{B'B} = \\dfrac{AC'}{C'C}$",
        "$\\dfrac{B'B}{AB} = \\dfrac{C'C}{AC}$",
        "$\\dfrac{AB'}{AB} = \\dfrac{C'C}{AC}$",
        "$\\dfrac{AB'}{B'B} = \\dfrac{C'C}{AC'}$",
      ],
      answers: [0, 1, 2],
      hints: [
        'Hai tỉ số phải lấy những đoạn ở vị trí tương ứng trên hai cạnh.',
        'Đoạn sát đỉnh $A$ ứng với đoạn sát đỉnh $A$, đoạn sát đáy ứng với đoạn sát đáy.',
      ],
      solution:
        "Ba tỉ lệ thức đầu là ba tỉ lệ thức của định lí Thalès. Tỉ lệ thức thứ tư ghép $AB'$ (sát đỉnh) với $C'C$ (sát đáy), tỉ lệ thức thứ năm bị đảo ngược ở vế phải, nên nói chung đều sai.",
    },
    {
      type: 'number',
      prompt:
        'Khung mái nhà có dạng tam giác $ABC$ với hai kèo $AB = 3$ m, $AC = 3{,}5$ m. Một thanh giằng $MN$ song song với xà ngang $BC$, với $M$ trên $AB$, $N$ trên $AC$ và $AM = 1{,}2$ m. Tính $AN$ (mét).',
      answer: 1.4,
      unit: 'm',
      hints: [
        '$MN \\parallel BC$ nên áp dụng được định lí Thalès.',
        '$\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$.',
      ],
      solution:
        '$\\dfrac{AN}{3{,}5} = \\dfrac{1{,}2}{3} = 0{,}4$, nên $AN = 0{,}4 \\cdot 3{,}5 = 1{,}4$ m.',
    },
  ],
  takeaways: [
    'Tỉ số của hai đoạn thẳng là tỉ số độ dài của chúng, đo cùng một đơn vị.',
    "Định lí Thalès: $B'C' \\parallel BC$ thì $\\dfrac{AB'}{AB} = \\dfrac{AC'}{AC}$, $\\dfrac{AB'}{B'B} = \\dfrac{AC'}{C'C}$, $\\dfrac{B'B}{AB} = \\dfrac{C'C}{AC}$.",
    "Định lí Thalès đảo: nếu $\\dfrac{AB'}{AB} = \\dfrac{AC'}{AC}$ thì $B'C' \\parallel BC$.",
    'Khi viết tỉ lệ thức, ghép các đoạn ở vị trí tương ứng trên hai cạnh.',
  ],
};
