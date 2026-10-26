/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: củng cố tính chất và dấu hiệu nhận biết hình chữ nhật, hình thoi, hình vuông và đường trung tuyến của tam giác vuông.',
  intro:
    'Hình chữ nhật, hình thoi và hình vuông đều là những hình bình hành đặc biệt. Bài luyện tập này giúp em phân biệt chúng qua các điều kiện về góc, cạnh và đường chéo, rồi dùng các tính chất để tính toán và chứng minh.',
  objectives: [
    'Tính độ dài, số đo góc bằng tính chất của hình chữ nhật, hình thoi, hình vuông.',
    'Dùng đường trung tuyến ứng với cạnh huyền của tam giác vuông.',
    'Chọn đúng dấu hiệu để chứng minh một tứ giác là hình chữ nhật, hình thoi hay hình vuông.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Hai đường chéo', 'Nhận biết từ hình bình hành'],
          rows: [
            [
              'Hình chữ nhật',
              'bằng nhau, cắt nhau tại trung điểm mỗi đường',
              'có một góc vuông, hoặc hai đường chéo bằng nhau',
            ],
            [
              'Hình thoi',
              'vuông góc, cắt nhau tại trung điểm mỗi đường, là phân giác các góc',
              'có hai cạnh kề bằng nhau, hoặc hai đường chéo vuông góc, hoặc một đường chéo là phân giác của một góc',
            ],
            [
              'Hình vuông',
              'bằng nhau, vuông góc, cắt nhau tại trung điểm mỗi đường, là phân giác các góc',
              'vừa là hình chữ nhật vừa là hình thoi',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tam giác vuông',
          text: 'Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền. Tam giác có một đường trung tuyến bằng nửa cạnh tương ứng là tam giác vuông.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $10$ câu mới, trộn đều từ Bài 13 và Bài 14. Số đo góc tính bằng độ; độ dài viết dấu phẩy thập phân, ví dụ $6{,}5$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề luyện tập trộn ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết em cần ôn lại bài nào.',
  },
  examples: [
    {
      problem:
        'Cho tam giác $ABC$ cân tại $A$, $M$ là trung điểm của $BC$. Lấy $D$ sao cho $M$ là trung điểm của $AD$. Chứng minh rằng $ABDC$ là hình thoi.',
      steps: [
        'Tứ giác $ABDC$ có hai đường chéo $AD$ và $BC$ cắt nhau tại $M$, là trung điểm của mỗi đường, nên $ABDC$ là hình bình hành.',
        'Tam giác $ABC$ cân tại $A$ nên đường trung tuyến $AM$ cũng là đường cao: $AD \\perp BC$.',
        'Hình bình hành có hai đường chéo vuông góc là hình thoi.',
      ],
      answer: '$ABDC$ là hình thoi.',
    },
    {
      problem:
        'Cho tam giác $ABC$ vuông tại $A$, $D$ là một điểm trên cạnh $BC$. Kẻ $DE \\perp AB$ ($E \\in AB$), $DF \\perp AC$ ($F \\in AC$). Chứng minh rằng $EF = AD$.',
      steps: [
        'Tứ giác $AEDF$ có $\\widehat{A} = \\widehat{E} = \\widehat{F} = 90^\\circ$.',
        'Tứ giác có ba góc vuông là hình chữ nhật, nên $AEDF$ là hình chữ nhật.',
        'Hai đường chéo của hình chữ nhật bằng nhau: $EF = AD$.',
      ],
      answer: '$EF = AD$.',
    },
    {
      problem:
        'Cho hình vuông $ABCD$. Trên các cạnh $AB$, $BC$, $CD$, $DA$ lấy lần lượt $E$, $F$, $G$, $H$ sao cho $AE = BF = CG = DH$. Chứng minh rằng $EFGH$ là hình vuông.',
      steps: [
        'Các cạnh hình vuông bằng nhau nên $EB = FC = GD = HA$. Bốn tam giác vuông $AEH$, $BFE$, $CGF$, $DHG$ có hai cạnh góc vuông tương ứng bằng nhau, nên bằng nhau (c.g.c). Suy ra $HE = EF = FG = GH$: $EFGH$ là hình thoi.',
        'Từ $\\triangle AEH = \\triangle BFE$ ta có $\\widehat{AHE} = \\widehat{BEF}$. Do đó $\\widehat{AEH} + \\widehat{BEF} = \\widehat{AEH} + \\widehat{AHE} = 90^\\circ$.',
        'Suy ra $\\widehat{HEF} = 180^\\circ - 90^\\circ = 90^\\circ$. Hình thoi có một góc vuông là hình vuông.',
      ],
      answer: '$EFGH$ là hình vuông.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có đường trung tuyến $AM = 6{,}5$ cm. Tính cạnh huyền $BC$.',
      answer: 13,
      unit: 'cm',
      hints: ['Trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.'],
      solution: '$BC = 2 \\cdot AM = 2 \\cdot 6{,}5 = 13$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$, $D$ thuộc cạnh $BC$, $DE \\perp AB$ ($E \\in AB$), $DF \\perp AC$ ($F \\in AC$) và $AD = 7$ cm. Tính $EF$.',
      answer: 7,
      unit: 'cm',
      hints: ['Tứ giác $AEDF$ có ba góc vuông.', '$AD$ và $EF$ là hai đường chéo của tứ giác ấy.'],
      solution:
        '$AEDF$ có ba góc vuông nên là hình chữ nhật; hai đường chéo bằng nhau: $EF = AD = 7$ cm.',
    },
    {
      type: 'number',
      prompt: 'Hình thoi $ABCD$ có $\\widehat{A} = 50^\\circ$. Tính $\\widehat{ACD}$ (đơn vị độ).',
      answer: 25,
      unit: '°',
      hints: [
        'Trong hình thoi, các góc đối bằng nhau: tính $\\widehat{C}$.',
        'Đường chéo $AC$ là tia phân giác của góc $C$.',
      ],
      solution:
        '$\\widehat{BCD} = \\widehat{A} = 50^\\circ$ (góc đối). $CA$ là tia phân giác của góc $C$ nên $\\widehat{ACD} = 50^\\circ : 2 = 25^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Hình thoi $ABCD$ có $\\widehat{ABD} = 35^\\circ$. Tính $\\widehat{BCD}$ (đơn vị độ).',
      answer: 110,
      unit: '°',
      hints: [
        '$BD$ là tia phân giác của góc $B$: tính $\\widehat{ABC}$.',
        'Hai góc kề cạnh $BC$ bù nhau.',
      ],
      solution:
        '$\\widehat{ABC} = 2 \\cdot 35^\\circ = 70^\\circ$. Hai góc $\\widehat{ABC}$ và $\\widehat{BCD}$ kề cạnh $BC$ nên bù nhau: $\\widehat{BCD} = 180^\\circ - 70^\\circ = 110^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Hình chữ nhật $ABCD$ có hai đường chéo cắt nhau tại $O$ và $\\widehat{ACB} = 32^\\circ$. Tính $\\widehat{AOB}$ (đơn vị độ).',
      answer: 64,
      unit: '°',
      hints: [
        'So sánh $OB$ và $OC$: tam giác $OBC$ là tam giác gì?',
        '$\\widehat{AOB}$ là góc ngoài của tam giác $OBC$.',
      ],
      solution:
        '$OB = OC$ nên tam giác $OBC$ cân tại $O$: $\\widehat{OBC} = \\widehat{OCB} = 32^\\circ$. Góc ngoài $\\widehat{AOB} = 32^\\circ + 32^\\circ = 64^\\circ$.',
    },
    {
      type: 'choice',
      prompt: 'Hình chữ nhật có hai đường chéo vuông góc với nhau là',
      options: [
        'hình thoi nhưng không là hình vuông.',
        'hình vuông.',
        'hình thang cân.',
        'hình bình hành nhưng không là hình chữ nhật.',
      ],
      answer: 1,
      hints: ['Xem các dấu hiệu nhận biết hình vuông.'],
      solution:
        'Hình chữ nhật có hai đường chéo vuông góc là hình vuông (dấu hiệu nhận biết hình vuông, Bài 14).',
    },
    {
      type: 'multi',
      prompt:
        'Chọn tất cả các tính chất đúng với mọi hình vuông $ABCD$ có hai đường chéo cắt nhau tại $O$.',
      options: [
        '$AC = BD$',
        '$AC \\perp BD$',
        '$OA = OB = OC = OD$',
        '$\\widehat{OAB} = 45^\\circ$',
        '$AC = AB$',
      ],
      answers: [0, 1, 2, 3],
      hints: ['Hình vuông vừa là hình chữ nhật vừa là hình thoi.'],
      solution:
        'Hai đường chéo bằng nhau (hình chữ nhật), vuông góc và là phân giác các góc (hình thoi), cắt nhau tại trung điểm mỗi đường, nên $OA = OB = OC = OD$ và $\\widehat{OAB} = 45^\\circ$. Đường chéo dài hơn cạnh (nó là cạnh huyền của tam giác vuông $ABC$), nên $AC = AB$ sai.',
    },
    {
      type: 'choice',
      prompt:
        'Tam giác $ABC$ cân tại $A$, $M$ là trung điểm của $BC$, $D$ là điểm sao cho $M$ là trung điểm của $AD$. Tứ giác $ABDC$ là',
      options: ['hình chữ nhật.', 'hình thoi.', 'hình thang cân nhưng không là hình bình hành.'],
      answer: 1,
      hints: [
        'Hai đường chéo $AD$, $BC$ cắt nhau tại trung điểm mỗi đường.',
        'Trong tam giác cân, trung tuyến từ đỉnh cũng là đường cao.',
      ],
      solution:
        '$ABDC$ là hình bình hành (hai đường chéo cắt nhau tại trung điểm $M$ của mỗi đường) có $AD \\perp BC$, nên là hình thoi. Nó là hình vuông chỉ khi có thêm $\\widehat{BAC} = 90^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Hình vuông $ABCD$ có hai đường chéo cắt nhau tại $O$ và $OA = 3{,}5$ cm. Tính $BD$.',
      answer: 7,
      unit: 'cm',
      hints: ['$O$ là trung điểm của $AC$, và hai đường chéo bằng nhau.'],
      solution: '$AC = 2 \\cdot 3{,}5 = 7$ cm, và $BD = AC = 7$ cm.',
    },
    {
      type: 'text',
      prompt: 'Hình bình hành có một góc vuông và có hai cạnh kề bằng nhau là hình gì?',
      accept: ['hình vuông', 'vuông', 'là hình vuông'],
      hints: [
        'Hình bình hành có một góc vuông là hình chữ nhật.',
        'Hình chữ nhật có hai cạnh kề bằng nhau là hình gì?',
      ],
      solution:
        'Hình bình hành có một góc vuông là hình chữ nhật; hình chữ nhật có hai cạnh kề bằng nhau là hình vuông.',
    },
  ],
  takeaways: [
    'Hình chữ nhật, hình thoi, hình vuông đều là hình bình hành: luôn dùng được các tính chất của hình bình hành.',
    'Đường chéo cho nhiều thông tin nhất: bằng nhau (hình chữ nhật), vuông góc và là phân giác (hình thoi), cả hai (hình vuông).',
    'Gặp tam giác vuông có trung điểm cạnh huyền, nghĩ ngay tới $MA = MB = MC$ và các tam giác cân.',
  ],
};
