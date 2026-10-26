/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: củng cố tính chất và dấu hiệu nhận biết hình bình hành, vận dụng hình bình hành để giải các bài toán thực tế.',
  intro:
    'Hình bình hành có mặt trong cổng xếp, giá phơi đồ, tay nâng đèn bàn hay mảnh vườn. Bài luyện tập này giúp em dùng thành thạo các tính chất và dấu hiệu nhận biết hình bình hành, rồi đem chúng vào những tình huống thực tế.',
  objectives: [
    'Tính góc, cạnh, đường chéo của hình bình hành bằng các tính chất đã học.',
    'Chọn đúng dấu hiệu để chứng minh một tứ giác là hình bình hành.',
    'Giải thích và tính toán trong các tình huống thực tế có hình bình hành.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Hình bình hành $ABCD$', 'Nội dung'],
          rows: [
            ['Định nghĩa', '$AB \\parallel CD$ và $AD \\parallel BC$.'],
            [
              'Tính chất',
              '$AB = CD$, $AD = BC$; $\\widehat{A} = \\widehat{C}$, $\\widehat{B} = \\widehat{D}$; hai đường chéo cắt nhau tại trung điểm $O$ của mỗi đường; hai góc kề một cạnh bù nhau.',
            ],
            [
              'Dấu hiệu nhận biết',
              'Các cạnh đối song song; các cạnh đối bằng nhau; một cặp cạnh đối song song và bằng nhau; các góc đối bằng nhau; hai đường chéo cắt nhau tại trung điểm mỗi đường.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $10$ câu mới về tính chất hình bình hành và bài toán thực tế. Độ dài viết dấu phẩy thập phân, ví dụ $7{,}5$; số tiền có thể gõ liền, ví dụ $2400000$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề luyện tập trộn ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết em cần ôn lại phần nào.',
  },
  examples: [
    {
      problem:
        'Cho hình bình hành $ABCD$ có $AB = 8$ cm, $AD = 5$ cm. Tia phân giác của góc $D$ cắt cạnh $AB$ tại $E$. Tính $EB$.',
      steps: [
        'Vì $DE$ là tia phân giác của góc $D$ nên $\\widehat{ADE} = \\widehat{EDC}$.',
        'Vì $AB \\parallel CD$ nên $\\widehat{AED} = \\widehat{EDC}$ (so le trong). Do đó $\\widehat{AED} = \\widehat{ADE}$, tam giác $ADE$ cân tại $A$ và $AE = AD = 5$ cm.',
        '$EB = AB - AE = 8 - 5$.',
      ],
      answer: '$EB = 3$ cm.',
    },
    {
      problem:
        'Cho hình bình hành $ABCD$. Gọi $M$, $N$ lần lượt là trung điểm của $AB$ và $CD$. Chứng minh rằng $AMCN$ là hình bình hành.',
      steps: [
        'Vì $AB \\parallel CD$ nên $AM \\parallel NC$.',
        'Vì $AB = CD$ nên $AM = \\dfrac{AB}{2} = \\dfrac{CD}{2} = NC$.',
        'Tứ giác $AMCN$ có một cặp cạnh đối $AM$, $NC$ song song và bằng nhau (Định lí 2b).',
      ],
      answer: '$AMCN$ là hình bình hành.',
    },
    {
      problem:
        'Một cổng xếp gồm các thanh sắt dài bằng nhau, nối với nhau bằng chốt để tạo thành các tứ giác $ABCD$ có $AB = CD$ và $AD = BC$. Vì sao khi kéo hay đẩy cổng, các thanh dọc $AD$ và $BC$ luôn song song với nhau?',
      steps: [
        'Khi kéo cổng, các góc thay đổi nhưng độ dài các thanh không đổi, nên luôn có $AB = CD$ và $AD = BC$.',
        'Tứ giác có các cạnh đối bằng nhau là hình bình hành (Định lí 2a).',
        'Trong hình bình hành, các cạnh đối song song.',
      ],
      answer: 'Mỗi tứ giác luôn là hình bình hành, nên $AD \\parallel BC$ ở mọi vị trí của cổng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Hình bình hành $ABCD$ có $\\widehat{A} = 3\\widehat{B}$. Tính $\\widehat{C}$ (đơn vị độ).',
      answer: 135,
      unit: '°',
      hints: [
        '$\\widehat{A} + \\widehat{B} = 180^\\circ$.',
        '$\\widehat{C}$ đối với $\\widehat{A}$.',
      ],
      solution:
        '$3\\widehat{B} + \\widehat{B} = 180^\\circ$ nên $\\widehat{B} = 45^\\circ$, $\\widehat{A} = 135^\\circ$. Góc đối bằng nhau: $\\widehat{C} = \\widehat{A} = 135^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Hình bình hành $ABCD$ có chu vi $40$ cm và $AB - BC = 4$ cm. Tính $AB$.',
      answer: 12,
      unit: 'cm',
      hints: ['$AB + BC = 40 : 2 = 20$ cm.', 'Biết tổng và hiệu của $AB$ và $BC$.'],
      solution: '$AB + BC = 20$ cm và $AB - BC = 4$ cm, nên $AB = (20 + 4) : 2 = 12$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Hình bình hành $ABCD$ có hai đường chéo $AC = 12$ cm, $BD = 8$ cm cắt nhau tại $O$, và $AB = 7$ cm. Tính chu vi tam giác $OAB$.',
      answer: 17,
      unit: 'cm',
      hints: ['$O$ là trung điểm của mỗi đường chéo.', '$OA = AC : 2$, $OB = BD : 2$.'],
      solution: '$OA = 6$ cm, $OB = 4$ cm, nên chu vi tam giác $OAB$ là $6 + 4 + 7 = 17$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Hình bình hành $ABCD$ có $AB = 10$ cm, $AD = 6$ cm. Tia phân giác của góc $D$ cắt cạnh $AB$ tại $E$. Tính $EB$.',
      answer: 4,
      unit: 'cm',
      hints: ['Chứng minh tam giác $ADE$ cân tại $A$ bằng góc so le trong.', 'Khi đó $AE = AD$.'],
      solution:
        '$\\widehat{AED} = \\widehat{EDC} = \\widehat{ADE}$ nên tam giác $ADE$ cân tại $A$, $AE = AD = 6$ cm. Vậy $EB = 10 - 6 = 4$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Hình bình hành $ABCD$ có $\\widehat{A} = 70^\\circ$. Tia phân giác của góc $A$ cắt cạnh $CD$ tại $E$. Tính $\\widehat{AED}$ (đơn vị độ).',
      answer: 35,
      unit: '°',
      hints: [
        '$\\widehat{BAE} = 70^\\circ : 2$.',
        '$\\widehat{AED}$ và $\\widehat{BAE}$ là hai góc so le trong.',
      ],
      solution:
        '$\\widehat{BAE} = 35^\\circ$. Vì $AB \\parallel CD$ nên $\\widehat{AED} = \\widehat{BAE} = 35^\\circ$ (so le trong).',
    },
    {
      type: 'multi',
      prompt:
        'Cho hình bình hành $ABCD$ có hai đường chéo cắt nhau tại $O$. Chọn tất cả các khẳng định luôn đúng.',
      options: [
        '$OA = OC$',
        '$OA = OB$',
        '$\\triangle AOB = \\triangle COD$',
        '$AB \\parallel CD$',
        '$\\widehat{A} + \\widehat{C} = 180^\\circ$',
      ],
      answers: [0, 2, 3],
      hints: [
        '$O$ là trung điểm của mỗi đường chéo, nhưng hai đường chéo nói chung không bằng nhau.',
        'Góc $A$ và góc $C$ là hai góc đối.',
      ],
      solution:
        '$OA = OC$ và $OB = OD$, $AB = CD$, nên $\\triangle AOB = \\triangle COD$ (c.c.c); $AB \\parallel CD$ theo định nghĩa. $OA = OB$ chỉ đúng khi hai đường chéo bằng nhau. $\\widehat{A} = \\widehat{C}$ (góc đối), nên $\\widehat{A} + \\widehat{C} = 180^\\circ$ chỉ khi cả hai bằng $90^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Tứ giác $ABCD$ có $AB = CD = 6$ cm, $AD = BC = 4$ cm và $\\widehat{A} = 65^\\circ$. Tính $\\widehat{B}$.',
      options: ['$65^\\circ$', '$115^\\circ$', '$125^\\circ$', 'Chưa đủ dữ kiện'],
      answer: 1,
      hints: [
        'Tứ giác có các cạnh đối bằng nhau là hình gì?',
        'Trong hình bình hành, hai góc kề một cạnh bù nhau.',
      ],
      solution:
        'Các cạnh đối bằng nhau nên $ABCD$ là hình bình hành (Định lí 2a). Do đó $\\widehat{B} = 180^\\circ - 65^\\circ = 115^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh vườn hình bình hành có hai cạnh kề dài $25$ m và $18$ m. Người ta rào xung quanh vườn, chừa lại một lối vào rộng $2$ m. Hàng rào dài bao nhiêu mét?',
      answer: 84,
      unit: 'm',
      hints: ['Chu vi hình bình hành bằng $2$ lần tổng hai cạnh kề.', 'Trừ đi phần lối vào.'],
      solution: 'Chu vi vườn là $2 \\cdot (25 + 18) = 86$ m. Hàng rào dài $86 - 2 = 84$ m.',
    },
    {
      type: 'number',
      prompt:
        'Tay nâng của một chiếc đèn bàn có hai thanh song song và bằng nhau, cùng hai đoạn nối ở hai đầu, tạo thành hình bình hành. Khi một góc của hình bình hành này là $65^\\circ$, góc kề với nó (chung một cạnh) bằng bao nhiêu độ?',
      answer: 115,
      unit: '°',
      hints: ['Hai góc kề một cạnh của hình bình hành bù nhau.'],
      solution: 'Góc kề bằng $180^\\circ - 65^\\circ = 115^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Nam buộc chặt hai thanh tre tại trung điểm của mỗi thanh rồi căng dây nối bốn đầu thanh. Tứ giác tạo bởi sợi dây chắc chắn là',
      options: ['hình bình hành.', 'hình thang cân.', 'một tứ giác không có gì đặc biệt.'],
      answer: 0,
      hints: ['Hai thanh tre là hai đường chéo của tứ giác.'],
      solution:
        'Hai thanh tre là hai đường chéo, cắt nhau tại trung điểm của mỗi đường, nên tứ giác là hình bình hành (Định lí 3b). Nó chỉ là hình thang cân trong trường hợp đặc biệt hai thanh dài bằng nhau.',
    },
  ],
  takeaways: [
    'Từ tính chất: cạnh đối bằng nhau, góc đối bằng nhau, hai góc kề một cạnh bù nhau, giao điểm hai đường chéo là trung điểm mỗi đường.',
    'Tia phân giác một góc của hình bình hành thường tạo ra một tam giác cân nhờ các góc so le trong.',
    'Để chứng minh hình bình hành, chọn dấu hiệu khớp với dữ kiện: cạnh, góc hay đường chéo.',
    'Một khung có các cạnh đối bằng nhau luôn là hình bình hành dù bị kéo lệch, nên các cạnh đối của nó luôn song song.',
  ],
};
