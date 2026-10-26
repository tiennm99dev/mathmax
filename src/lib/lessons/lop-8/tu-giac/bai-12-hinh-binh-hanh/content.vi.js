/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hình bình hành: định nghĩa, tính chất về cạnh, góc, đường chéo và các dấu hiệu nhận biết một tứ giác là hình bình hành.',
  intro:
    'Chiếc cổng xếp, cái giá phơi đồ gấp được hay tay nâng của đèn bàn đều có những thanh tạo thành tứ giác có các cạnh đối song song. Khi kéo, hình thay đổi nhưng các cạnh đối vẫn song song. Đó là hình bình hành, một hình có nhiều tính chất đẹp mà em sẽ khám phá trong bài này.',
  objectives: [
    'Nhận biết hình bình hành.',
    'Giải thích được các tính chất về cạnh đối, góc đối và hai đường chéo của hình bình hành.',
    'Chứng minh một tứ giác là hình bình hành bằng các dấu hiệu nhận biết.',
  ],
  sections: [
    {
      heading: 'Hình bình hành và tính chất',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình bình hành',
          text: 'Hình bình hành là tứ giác có các cạnh đối song song.',
        },
        {
          type: 'p',
          text: 'Tứ giác $ABCD$ là hình bình hành khi $AB \\parallel CD$ và $AD \\parallel BC$. Hình bình hành là một hình thang đặc biệt: hình thang có hai cạnh bên song song.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 1 (tính chất)',
          text: 'Trong hình bình hành:',
        },
        {
          type: 'list',
          items: [
            'Các cạnh đối bằng nhau;',
            'Các góc đối bằng nhau;',
            'Hai đường chéo cắt nhau tại trung điểm của mỗi đường.',
          ],
        },
        {
          type: 'p',
          text: 'Giải thích: kẻ đường chéo $AC$. Vì $AB \\parallel CD$ nên $\\widehat{BAC} = \\widehat{DCA}$; vì $AD \\parallel BC$ nên $\\widehat{BCA} = \\widehat{DAC}$ (các cặp góc so le trong). Hai tam giác $ABC$ và $CDA$ có cạnh chung $AC$, nên $\\triangle ABC = \\triangle CDA$ (g.c.g). Suy ra $AB = CD$, $BC = DA$ và $\\widehat{B} = \\widehat{D}$; cộng các góc ở $A$ và $C$ ta được $\\widehat{A} = \\widehat{C}$. Gọi $O$ là giao điểm hai đường chéo; $\\triangle OAB = \\triangle OCD$ (g.c.g) cho $OA = OC$, $OB = OD$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Trong hình bình hành, hai góc kề một cạnh bất kì thì bù nhau, chẳng hạn $\\widehat{A} + \\widehat{B} = 180^\\circ$.',
        },
      ],
    },
    {
      heading: 'Dấu hiệu nhận biết',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 2 (dấu hiệu theo cạnh)',
          text: 'a) Tứ giác có các cạnh đối bằng nhau là một hình bình hành. b) Tứ giác có một cặp cạnh đối song song và bằng nhau là một hình bình hành.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 3 (dấu hiệu theo góc và đường chéo)',
          text: 'a) Tứ giác có các góc đối bằng nhau là một hình bình hành. b) Tứ giác có hai đường chéo cắt nhau tại trung điểm của mỗi đường là một hình bình hành.',
        },
        {
          type: 'table',
          caption: 'Năm cách chứng minh tứ giác $ABCD$ là hình bình hành',
          head: ['Chỉ ra', 'Căn cứ'],
          rows: [
            ['$AB \\parallel CD$ và $AD \\parallel BC$', 'Định nghĩa'],
            ['$AB = CD$ và $AD = BC$', 'Định lí 2a'],
            ['$AB \\parallel CD$ và $AB = CD$', 'Định lí 2b'],
            ['$\\widehat{A} = \\widehat{C}$ và $\\widehat{B} = \\widehat{D}$', 'Định lí 3a'],
            ['$AC$ cắt $BD$ tại $O$ với $OA = OC$, $OB = OD$', 'Định lí 3b'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Ở Định lí 2b, cặp cạnh song song và cặp cạnh bằng nhau phải là cùng một cặp. Tứ giác có $AB \\parallel CD$ và $AD = BC$ có thể chỉ là một hình thang cân.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đo hình bình hành',
    instruction:
      'Ở chế độ "Hình bình hành", kéo $A$, $B$ hoặc $D$ (đỉnh $C$ tự chạy theo) và quan sát các cạnh đối, góc đối và hai nửa đường chéo luôn bằng nhau. Chuyển sang "Tứ giác bất kì", kéo $C$ để tìm vị trí làm $ABCD$ thành hình bình hành: các dòng kiểm tra cùng đúng một lúc.',
  },
  examples: [
    {
      problem:
        'Cho hình bình hành $ABCD$ có $\\widehat{A} = 110^\\circ$, $AB = 5$ cm, $BC = 3$ cm. Tính các góc còn lại và chu vi của hình bình hành.',
      steps: [
        'Các góc đối bằng nhau: $\\widehat{C} = \\widehat{A} = 110^\\circ$.',
        'Hai góc kề cạnh $AB$ bù nhau: $\\widehat{B} = 180^\\circ - 110^\\circ = 70^\\circ$, và $\\widehat{D} = \\widehat{B} = 70^\\circ$.',
        'Các cạnh đối bằng nhau: $CD = AB = 5$ cm, $DA = BC = 3$ cm. Chu vi bằng $2 \\cdot (5 + 3) = 16$ cm.',
      ],
      answer:
        '$\\widehat{C} = 110^\\circ$, $\\widehat{B} = \\widehat{D} = 70^\\circ$; chu vi $16$ cm.',
    },
    {
      problem:
        'Cho hình bình hành $ABCD$, $O$ là giao điểm của hai đường chéo. Một đường thẳng đi qua $O$ cắt $AB$ tại $M$ và cắt $CD$ tại $N$. Chứng minh rằng $OM = ON$.',
      steps: [
        'Hai đường chéo cắt nhau tại trung điểm mỗi đường nên $OA = OC$.',
        '$\\widehat{OAM} = \\widehat{OCN}$ (so le trong, vì $AB \\parallel CD$) và $\\widehat{AOM} = \\widehat{CON}$ (đối đỉnh).',
        'Do đó $\\triangle OAM = \\triangle OCN$ (g.c.g).',
      ],
      answer: 'Suy ra $OM = ON$: $O$ là trung điểm của $MN$.',
    },
    {
      problem:
        'Cho tam giác $ABC$, $M$ là trung điểm của $BC$. Trên tia đối của tia $MA$ lấy điểm $D$ sao cho $MD = MA$. Chứng minh rằng $ABDC$ là hình bình hành.',
      steps: [
        'Tứ giác $ABDC$ có hai đường chéo là $AD$ và $BC$, cắt nhau tại $M$.',
        '$M$ là trung điểm của $BC$ (giả thiết) và của $AD$ (vì $MD = MA$ và $D$ nằm trên tia đối của tia $MA$).',
        'Theo Định lí 3b, tứ giác có hai đường chéo cắt nhau tại trung điểm của mỗi đường là hình bình hành.',
      ],
      answer: '$ABDC$ là hình bình hành.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Hình bình hành $ABCD$ có $\\widehat{A} = 125^\\circ$. Tính $\\widehat{B}$ (đơn vị độ).',
      answer: 55,
      unit: '°',
      hints: ['$\\widehat{A}$ và $\\widehat{B}$ là hai góc kề cạnh $AB$.'],
      solution:
        'Hai góc kề một cạnh của hình bình hành bù nhau: $\\widehat{B} = 180^\\circ - 125^\\circ = 55^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Hình bình hành $ABCD$ có $AB = 7$ cm, $BC = 4$ cm. Tính chu vi của hình bình hành.',
      answer: 22,
      unit: 'cm',
      hints: ['Các cạnh đối bằng nhau: $CD = AB$, $DA = BC$.'],
      solution: 'Chu vi bằng $AB + BC + CD + DA = 2 \\cdot (7 + 4) = 22$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Hình bình hành $ABCD$ có hai đường chéo cắt nhau tại $O$ và $OA = 3{,}5$ cm. Tính độ dài đường chéo $AC$.',
      answer: 7,
      unit: 'cm',
      hints: ['$O$ là trung điểm của $AC$.'],
      solution: 'Vì $O$ là trung điểm của $AC$ nên $AC = 2 \\cdot OA = 2 \\cdot 3{,}5 = 7$ cm.',
    },
    {
      type: 'multi',
      prompt: 'Tứ giác nào dưới đây chắc chắn là hình bình hành? Chọn tất cả.',
      options: [
        'Tứ giác có các cạnh đối bằng nhau.',
        'Tứ giác có một cặp cạnh đối song song và bằng nhau.',
        'Tứ giác có một cặp cạnh đối song song, cặp cạnh đối kia bằng nhau.',
        'Tứ giác có các góc đối bằng nhau.',
        'Tứ giác có hai đường chéo bằng nhau.',
        'Tứ giác có hai đường chéo cắt nhau tại trung điểm của mỗi đường.',
      ],
      answers: [0, 1, 3, 5],
      hints: [
        'Đối chiếu với Định lí 2 và Định lí 3.',
        'Hình thang cân có một cặp cạnh song song, cặp kia bằng nhau và hai đường chéo bằng nhau.',
      ],
      solution:
        'Đúng theo Định lí 2a, 2b, 3a, 3b. Hai trường hợp còn lại có thể là hình thang cân (một cặp cạnh song song, cặp kia bằng nhau, hai đường chéo bằng nhau) nên chưa chắc là hình bình hành.',
    },
    {
      type: 'number',
      prompt:
        'Hình bình hành $ABCD$ có $\\widehat{A} - \\widehat{B} = 30^\\circ$. Tính $\\widehat{A}$ (đơn vị độ).',
      answer: 105,
      unit: '°',
      hints: ['$\\widehat{A} + \\widehat{B} = 180^\\circ$.', 'Biết tổng và hiệu của hai góc.'],
      solution:
        '$\\widehat{A} = (180^\\circ + 30^\\circ) : 2 = 105^\\circ$ (và $\\widehat{B} = 75^\\circ$).',
    },
    {
      type: 'number',
      prompt:
        'Hình bình hành $ABCD$ có $\\widehat{A} = 2\\widehat{B}$. Tính $\\widehat{D}$ (đơn vị độ).',
      answer: 60,
      unit: '°',
      hints: [
        '$\\widehat{A} + \\widehat{B} = 180^\\circ$, nên $3\\widehat{B} = 180^\\circ$.',
        '$\\widehat{D}$ đối với $\\widehat{B}$.',
      ],
      solution:
        '$2\\widehat{B} + \\widehat{B} = 180^\\circ$ nên $\\widehat{B} = 60^\\circ$. Góc đối bằng nhau: $\\widehat{D} = \\widehat{B} = 60^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho hình bình hành $ABCD$ có hai đường chéo cắt nhau tại $O$. Khẳng định nào không chắc đúng?',
      options: ['$AB = CD$', '$\\widehat{A} = \\widehat{C}$', '$AC = BD$', '$OA = OC$'],
      answer: 2,
      hints: [
        'Ba khẳng định là tính chất của mọi hình bình hành. Khẳng định còn lại là tính chất của hình thang cân.',
      ],
      solution:
        '$AB = CD$ (cạnh đối), $\\widehat{A} = \\widehat{C}$ (góc đối), $OA = OC$ (giao điểm hai đường chéo là trung điểm mỗi đường) luôn đúng. Hai đường chéo của hình bình hành nói chung không bằng nhau, nên $AC = BD$ không chắc đúng.',
    },
    {
      type: 'number',
      prompt: 'Hình bình hành $ABCD$ có chu vi $30$ cm và $AB = 9$ cm. Tính $BC$.',
      answer: 6,
      unit: 'cm',
      hints: ['Chu vi bằng $2 \\cdot (AB + BC)$.'],
      solution: '$AB + BC = 30 : 2 = 15$ cm, nên $BC = 15 - 9 = 6$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Tứ giác $ABCD$ có $\\widehat{A} = 70^\\circ$, $\\widehat{B} = 110^\\circ$, $\\widehat{C} = 70^\\circ$. Tứ giác $ABCD$ có phải hình bình hành không?',
      options: [
        'Có, vì các góc đối bằng nhau.',
        'Không, vì $\\widehat{A} \\ne \\widehat{B}$.',
        'Chưa đủ điều kiện để kết luận.',
      ],
      answer: 0,
      hints: [
        'Tính $\\widehat{D}$ bằng định lí tổng các góc của tứ giác.',
        'So sánh từng cặp góc đối.',
      ],
      solution:
        '$\\widehat{D} = 360^\\circ - (70^\\circ + 110^\\circ + 70^\\circ) = 110^\\circ$. Vậy $\\widehat{A} = \\widehat{C}$ và $\\widehat{B} = \\widehat{D}$: các góc đối bằng nhau nên $ABCD$ là hình bình hành (Định lí 3a).',
    },
  ],
  takeaways: [
    'Hình bình hành là tứ giác có các cạnh đối song song.',
    'Trong hình bình hành: các cạnh đối bằng nhau, các góc đối bằng nhau, hai đường chéo cắt nhau tại trung điểm của mỗi đường; hai góc kề một cạnh bù nhau.',
    'Tứ giác là hình bình hành nếu có: các cạnh đối song song; hoặc các cạnh đối bằng nhau; hoặc một cặp cạnh đối song song và bằng nhau; hoặc các góc đối bằng nhau; hoặc hai đường chéo cắt nhau tại trung điểm mỗi đường.',
  ],
};
