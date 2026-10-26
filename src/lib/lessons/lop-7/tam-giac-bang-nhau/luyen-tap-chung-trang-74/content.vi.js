/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về hai trường hợp bằng nhau cạnh - góc - cạnh và góc - cạnh - góc của tam giác, và vận dụng để đo khoảng cách trong thực tế.',
  intro:
    'Bài luyện tập này ôn lại Bài 14 (Trường hợp bằng nhau thứ hai và thứ ba của tam giác). Em sẽ nhận ra dữ kiện thuộc trường hợp c.g.c hay g.c.g, chứng minh hai tam giác bằng nhau để suy ra hai đoạn thẳng, hai góc bằng nhau, và dùng tam giác bằng nhau để đo những khoảng cách không đo trực tiếp được, như chiều rộng một con sông.',
  objectives: [
    'Chọn đúng trường hợp c.g.c hoặc g.c.g, nhận ra khi nào dữ kiện chưa đủ.',
    'Kết hợp góc đối đỉnh, góc so le trong, cạnh chung để có đủ dữ kiện chứng minh hai tam giác bằng nhau.',
    'Vận dụng tam giác bằng nhau vào bài toán đo khoảng cách thực tế.',
  ],
  sections: [
    {
      heading: 'Nhắc lại kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Trường hợp', 'Dữ kiện cần có'],
          rows: [
            ['c.c.c', 'Ba cặp cạnh bằng nhau.'],
            ['c.g.c', 'Hai cặp cạnh và cặp góc xen giữa hai cạnh đó bằng nhau.'],
            ['g.c.g', 'Một cặp cạnh và hai cặp góc kề cạnh đó bằng nhau.'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Hai cạnh và một góc không xen giữa, hoặc ba góc, chưa đủ để kết luận hai tam giác bằng nhau.',
        },
      ],
    },
    {
      heading: 'Tìm thêm dữ kiện ở đâu?',
      blocks: [
        {
          type: 'list',
          items: [
            'Cạnh chung của hai tam giác.',
            'Hai góc đối đỉnh khi hai đoạn thẳng cắt nhau.',
            'Góc so le trong, góc đồng vị khi có hai đường thẳng song song.',
            'Trung điểm (hai đoạn bằng nhau), tia phân giác (hai góc bằng nhau), góc chung.',
            'Định lí tổng ba góc: biết hai cặp góc bằng nhau thì cặp góc thứ ba cũng bằng nhau.',
          ],
        },
        {
          type: 'p',
          text: 'Đo khoảng cách $AB$ không đo trực tiếp được: dựng trên đất một tam giác bằng tam giác chứa $AB$ (thường nhờ góc đối đỉnh và trung điểm), rồi đo cạnh tương ứng với $AB$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện trộn ngẫu nhiên',
    instruction:
      'Mỗi lượt có 12 câu trộn ngẫu nhiên về trường hợp c.g.c, trường hợp g.c.g và bài toán đo khoảng cách. Nhập một số tự nhiên: số đo góc bằng độ, độ dài theo đơn vị đề bài cho. Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra.',
  },
  examples: [
    {
      problem:
        'Để đo chiều rộng $AB$ của một con sông ($A$ ở bờ bên kia), từ $B$ kẻ đường thẳng vuông góc với $AB$, trên đó lấy $C$, $D$ sao cho $C$ là trung điểm của $BD$. Từ $D$ kẻ đường vuông góc với $BD$, cắt đường thẳng $AC$ tại $E$. Đo được $DE = 40$ m. Tính $AB$.',
      steps: [
        'Xét $\\triangle ABC$ và $\\triangle EDC$: $\\widehat{ABC} = \\widehat{EDC} = 90^\\circ$, $BC = DC$ ($C$ là trung điểm của $BD$), $\\widehat{ACB} = \\widehat{ECD}$ (hai góc đối đỉnh).',
        'Cạnh $BC$ kề hai góc $\\widehat{ABC}$, $\\widehat{ACB}$; cạnh $DC$ kề hai góc $\\widehat{EDC}$, $\\widehat{ECD}$. Vậy $\\triangle ABC = \\triangle EDC$ (g.c.g).',
        'Suy ra $AB = ED = 40$ m (hai cạnh tương ứng).',
      ],
      answer: 'Sông rộng $AB = 40$ m.',
    },
    {
      problem:
        'Tứ giác $ABCD$ có $AB \\parallel CD$ và $AB = CD$. Chứng minh $AD = BC$ và $AD \\parallel BC$.',
      steps: [
        'Kẻ đường chéo $AC$. Vì $AB \\parallel CD$ nên $\\widehat{BAC} = \\widehat{DCA}$ (hai góc so le trong).',
        'Xét $\\triangle ABC$ và $\\triangle CDA$: $AB = CD$ (giả thiết), $\\widehat{BAC} = \\widehat{DCA}$, $AC$ chung. Vậy $\\triangle ABC = \\triangle CDA$ (c.g.c).',
        'Suy ra $BC = DA$ và $\\widehat{BCA} = \\widehat{DAC}$ (các cạnh, góc tương ứng).',
        'Hai góc $BCA$ và $DAC$ ở vị trí so le trong và bằng nhau nên $AD \\parallel BC$.',
      ],
      answer: '$AD = BC$ và $AD \\parallel BC$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        '$\\triangle ABC$ và $\\triangle DEF$ có $AB = DE$, $\\widehat{A} = \\widehat{D}$, $AC = DF$. Hai tam giác này',
      options: [
        'bằng nhau theo trường hợp c.c.c',
        'bằng nhau theo trường hợp c.g.c',
        'bằng nhau theo trường hợp g.c.g',
        'chưa đủ dữ kiện để kết luận',
      ],
      answer: 1,
      hints: ['Góc $A$ có xen giữa hai cạnh $AB$, $AC$ không?'],
      solution:
        '$\\widehat{A}$ xen giữa $AB$ và $AC$, $\\widehat{D}$ xen giữa $DE$ và $DF$: trường hợp c.g.c.',
    },
    {
      type: 'choice',
      prompt:
        '$\\triangle ABC$ và $\\triangle DEF$ có $\\widehat{B} = \\widehat{E}$, $BC = EF$, $\\widehat{C} = \\widehat{F}$. Hai tam giác này',
      options: [
        'bằng nhau theo trường hợp c.c.c',
        'bằng nhau theo trường hợp c.g.c',
        'bằng nhau theo trường hợp g.c.g',
        'chưa đủ dữ kiện để kết luận',
      ],
      answer: 2,
      hints: ['Hai góc $B$, $C$ có kề cạnh $BC$ không?'],
      solution: 'Cạnh $BC$ và hai góc kề nó $\\widehat{B}$, $\\widehat{C}$: trường hợp g.c.g.',
    },
    {
      type: 'choice',
      prompt:
        '$\\triangle ABC$ và $\\triangle DEF$ có $AB = DE$, $AC = DF$, $\\widehat{C} = \\widehat{F}$. Hai tam giác này',
      options: [
        'bằng nhau theo trường hợp c.c.c',
        'bằng nhau theo trường hợp c.g.c',
        'bằng nhau theo trường hợp g.c.g',
        'chưa đủ dữ kiện để kết luận',
      ],
      answer: 3,
      hints: ['Góc xen giữa hai cạnh $AB$ và $AC$ là góc nào?'],
      solution:
        'Góc xen giữa $AB$, $AC$ là $\\widehat{A}$, không phải $\\widehat{C}$. Hai cạnh và một góc không xen giữa chưa đủ để kết luận.',
    },
    {
      type: 'number',
      prompt:
        'Cho góc $xOy$. Trên $Ox$ lấy $A$, $C$; trên $Oy$ lấy $B$, $D$ sao cho $OA = OB$, $OC = OD$. Biết $BC = 9$ cm. Tính $AD$ (cm).',
      answer: 9,
      unit: 'cm',
      hints: ['Xét $\\triangle OAD$ và $\\triangle OBC$: góc nào là góc chung?'],
      solution:
        '$OA = OB$, $\\widehat{O}$ chung, $OD = OC$ nên $\\triangle OAD = \\triangle OBC$ (c.g.c). Suy ra $AD = BC = 9$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Cũng với hình trên, biết $\\widehat{xOy} = 50^\\circ$ và $\\widehat{OBC} = 35^\\circ$. Tính $\\widehat{ODA}$ (độ).',
      answer: 95,
      unit: '°',
      hints: [
        'Trong $\\triangle OAD = \\triangle OBC$, góc $ODA$ tương ứng với góc nào?',
        'Tính $\\widehat{OCB}$ bằng tổng ba góc của tam giác $OBC$.',
      ],
      solution:
        '$\\triangle OAD = \\triangle OBC$ nên $\\widehat{ODA} = \\widehat{OCB} = 180^\\circ - 50^\\circ - 35^\\circ = 95^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Đoạn thẳng $AB$ có trung điểm $M$. Qua $A$ và $B$ kẻ hai đường thẳng song song; một đường thẳng qua $M$ cắt chúng lần lượt tại $C$ và $D$. Biết $MC = 4$ cm. Tính $CD$ (cm).',
      answer: 8,
      unit: 'cm',
      hints: [
        'Xét $\\triangle MAC$ và $\\triangle MBD$: tìm hai cặp góc bằng nhau (so le trong, đối đỉnh).',
        'Hai tam giác bằng nhau cho $MD = MC$.',
      ],
      solution:
        '$\\widehat{MAC} = \\widehat{MBD}$ (so le trong), $MA = MB$, $\\widehat{AMC} = \\widehat{BMD}$ (đối đỉnh) nên $\\triangle MAC = \\triangle MBD$ (g.c.g). Suy ra $MD = MC = 4$ cm, $CD = 4 + 4 = 8$ cm.',
    },
    {
      type: 'order',
      prompt: 'Với hình ở câu trên, sắp xếp các bước chứng minh $M$ là trung điểm của $CD$.',
      items: [
        'Suy ra $MC = MD$, nên $M$ là trung điểm của $CD$.',
        '$\\widehat{MAC} = \\widehat{MBD}$ (so le trong), $MA = MB$ (giả thiết), $\\widehat{AMC} = \\widehat{BMD}$ (đối đỉnh).',
        'Xét $\\triangle MAC$ và $\\triangle MBD$.',
        'Vậy $\\triangle MAC = \\triangle MBD$ (g.c.g).',
      ],
      answer: [2, 1, 3, 0],
      hints: ['Nêu hai tam giác, liệt kê dữ kiện, kết luận bằng nhau, rồi suy ra.'],
      solution:
        'Xét hai tam giác; nêu một cạnh và hai góc kề; kết luận $\\triangle MAC = \\triangle MBD$ (g.c.g); suy ra $MC = MD$.',
    },
    {
      type: 'number',
      prompt:
        'Tứ giác $ABCD$ có $AB \\parallel CD$ và $AB = CD$. Biết $AD = 6$ cm. Tính $BC$ (cm).',
      answer: 6,
      unit: 'cm',
      hints: ['Kẻ đường chéo $AC$; dùng góc so le trong và cạnh chung.'],
      solution:
        '$AB = CD$, $\\widehat{BAC} = \\widehat{DCA}$ (so le trong), $AC$ chung nên $\\triangle ABC = \\triangle CDA$ (c.g.c). Suy ra $BC = DA = 6$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Để đo khoảng cách $AB$ qua một hồ nước, người ta chọn điểm $O$, lấy $C$ trên tia đối của tia $OA$ với $OC = OA$, lấy $D$ trên tia đối của tia $OB$ với $OD = OB$. Đo được $CD = 58$ m. Tính $AB$ (m).',
      answer: 58,
      unit: 'm',
      hints: ['Hai tam giác $OAB$ và $OCD$ có hai cặp cạnh và cặp góc nào bằng nhau?'],
      solution:
        '$OA = OC$, $\\widehat{AOB} = \\widehat{COD}$ (đối đỉnh), $OB = OD$ nên $\\triangle OAB = \\triangle OCD$ (c.g.c). Suy ra $AB = CD = 58$ m.',
    },
    {
      type: 'number',
      prompt:
        '$\\triangle ABC$ và $\\triangle DEF$ có $\\widehat{B} = \\widehat{E} = 70^\\circ$, $BC = EF$, $\\widehat{C} = \\widehat{F} = 40^\\circ$. Tính $\\widehat{D}$ (độ).',
      answer: 70,
      unit: '°',
      hints: ['Dùng tổng ba góc trong tam giác $DEF$.'],
      solution:
        '$\\triangle ABC = \\triangle DEF$ (g.c.g). Trong tam giác $DEF$: $\\widehat{D} = 180^\\circ - 70^\\circ - 40^\\circ = 70^\\circ$.',
    },
  ],
  takeaways: [
    'c.g.c cần góc xen giữa; g.c.g cần hai góc kề cạnh đã cho.',
    'Góc đối đỉnh, góc so le trong, cạnh chung, trung điểm, tia phân giác là những nguồn dữ kiện thường gặp.',
    'Để đo một khoảng cách không đo trực tiếp được, dựng một tam giác bằng tam giác chứa nó rồi đo cạnh tương ứng.',
  ],
};
