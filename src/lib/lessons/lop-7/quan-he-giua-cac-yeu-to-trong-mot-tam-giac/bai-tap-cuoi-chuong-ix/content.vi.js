/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương IX: hệ thống hoá quan hệ giữa góc và cạnh, đường vuông góc và đường xiên, bất đẳng thức tam giác và các điểm đồng quy trong tam giác, kèm bài trắc nghiệm, tự luận và bài toán thực tế.',
  intro:
    'Chương IX cho em hai nhóm công cụ: so sánh các yếu tố trong một tam giác (góc với cạnh, đường vuông góc với đường xiên, ba cạnh với nhau) và các bộ ba đường luôn đồng quy (trung tuyến, phân giác, trung trực, đường cao). Bài tập cuối chương ôn lại tất cả, kèm bản đồ kĩ năng cho biết bài nào em cần ôn thêm.',
  objectives: [
    'Hệ thống lại các quan hệ giữa góc và cạnh, đường vuông góc và đường xiên, ba cạnh của một tam giác.',
    'Nhớ tên, tính chất và vị trí của trọng tâm, giao điểm ba đường phân giác, giao điểm ba đường trung trực và trực tâm.',
    'Vận dụng vào bài toán thực tế: đường đi ngắn nhất, chọn vị trí cách đều.',
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
              'Bài 31. Góc và cạnh đối diện',
              'Trong một tam giác, góc đối diện với cạnh lớn hơn là góc lớn hơn; cạnh đối diện với góc lớn hơn là cạnh lớn hơn.',
            ],
            [
              'Bài 32. Đường vuông góc và đường xiên',
              'Từ một điểm ở ngoài một đường thẳng, đường vuông góc ngắn hơn mọi đường xiên; độ dài đường vuông góc là khoảng cách từ điểm đến đường thẳng.',
            ],
            [
              'Bài 33. Ba cạnh của một tam giác',
              'Mỗi cạnh nhỏ hơn tổng và lớn hơn hiệu hai cạnh còn lại: $|b - c| < a < b + c$.',
            ],
            [
              'Bài 34. Trung tuyến, phân giác',
              'Ba trung tuyến đồng quy tại trọng tâm $G$, $AG = \\dfrac{2}{3}AM$. Ba phân giác đồng quy tại một điểm cách đều ba cạnh.',
            ],
            [
              'Bài 35. Trung trực, đường cao',
              'Ba trung trực đồng quy tại một điểm cách đều ba đỉnh. Ba đường cao đồng quy tại trực tâm.',
            ],
          ],
        },
        {
          type: 'table',
          head: ['Điểm', 'Tam giác nhọn', 'Tam giác vuông', 'Tam giác tù'],
          rows: [
            ['Trọng tâm $G$, điểm $I$', 'Bên trong', 'Bên trong', 'Bên trong'],
            ['Giao điểm $O$ ba trung trực', 'Bên trong', 'Trung điểm cạnh huyền', 'Bên ngoài'],
            ['Trực tâm $H$', 'Bên trong', 'Đỉnh góc vuông', 'Bên ngoài'],
          ],
          caption: 'Vị trí các điểm đồng quy theo dạng tam giác',
        },
      ],
    },
    {
      heading: 'Các dạng bài thường gặp',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'So sánh góc (cạnh): tìm các cạnh (góc) đối diện rồi so sánh chúng; tính góc còn lại bằng định lí tổng ba góc khi cần.',
            'Đường ngắn nhất từ một điểm đến một đường thẳng: kẻ đường vuông góc.',
            'Kiểm tra ba độ dài, tìm cạnh nguyên: so sánh độ dài lớn nhất với tổng hai độ dài kia; viết $|b - c| < a < b + c$.',
            'Tính đoạn trên trung tuyến bằng tỉ số $\\dfrac{2}{3}$, $\\dfrac{1}{3}$; tính góc $\\widehat{BIC}$, $\\widehat{BHC}$ qua các tam giác nhỏ.',
            'Chọn vị trí cách đều ba điểm (trung trực) hay cách đều ba đường thẳng (phân giác).',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Bất đẳng thức tam giác không có dấu bằng: ba độ dài $2$, $3$, $5$ không tạo thành tam giác. Và «cách đều ba đỉnh» khác «cách đều ba cạnh».',
        },
      ],
    },
  ],
  explore: {
    title: 'Kiểm tra cuối chương với bản đồ kĩ năng',
    instruction:
      'Bài kiểm tra có 15 câu, ba câu cho mỗi bài từ Bài 31 đến Bài 35, trộn ngẫu nhiên. Nhập một số tự nhiên: số đo góc bằng độ, độ dài bằng xăng-ti-mét hoặc một số lượng. Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng tô màu từng bài theo kết quả lần làm đầu và chỉ ra bài cần ôn lại.',
  },
  examples: [
    {
      problem:
        'Tam giác $ABC$ có $\\widehat{A} = 80^\\circ$, $\\widehat{B} = 60^\\circ$. So sánh ba cạnh của tam giác. Gọi $G$ là trọng tâm, biết đường trung tuyến $AM = 6$ cm; tính $AG$.',
      steps: [
        '$\\widehat{C} = 180^\\circ - 80^\\circ - 60^\\circ = 40^\\circ$, nên $\\widehat{C} < \\widehat{B} < \\widehat{A}$.',
        'Cạnh đối diện với $\\widehat{C}$, $\\widehat{B}$, $\\widehat{A}$ lần lượt là $AB$, $AC$, $BC$, nên $AB < AC < BC$.',
        '$AG = \\dfrac{2}{3}AM = \\dfrac{2}{3} \\cdot 6 = 4$ (cm).',
      ],
      answer: '$AB < AC < BC$ và $AG = 4$ cm.',
    },
    {
      problem:
        'Ba thành phố $A$, $B$, $C$: $AB = 30$ km, $AC = 90$ km. Nếu đặt ở $B$ một máy phát sóng có bán kính hoạt động $60$ km thì thành phố $C$ có nhận được tín hiệu không?',
      steps: [
        'Nếu $A$, $B$, $C$ không thẳng hàng thì theo bất đẳng thức tam giác $BC > AC - AB = 90 - 30 = 60$ (km).',
        'Nếu ba thành phố thẳng hàng thì $BC \\ge AC - AB = 60$ km, và $BC = 60$ km khi $B$ nằm giữa $A$ và $C$.',
        'Trong mọi trường hợp $BC \\ge 60$ km, nên $C$ chỉ vừa nhận được tín hiệu khi $B$ nằm trên đoạn $AC$; còn lại thì không nhận được.',
      ],
      answer:
        'Nói chung $C$ không nhận được tín hiệu; chỉ khi $B$ nằm giữa $A$ và $C$ thì $C$ ở đúng mép vùng phủ sóng.',
    },
    {
      problem:
        'Tam giác $ABC$ cân tại $A$, $\\widehat{A} = 40^\\circ$, đường trung tuyến $AM$. Chứng minh $AM$ đi qua trực tâm $H$ của tam giác và tính $\\widehat{BAM}$.',
      steps: [
        'Tam giác cân tại $A$ nên đường trung tuyến $AM$ đồng thời là đường phân giác và đường cao: $AM \\perp BC$.',
        '$AM$ là một đường cao nên đi qua trực tâm $H$.',
        '$AM$ là phân giác nên $\\widehat{BAM} = \\dfrac{40^\\circ}{2} = 20^\\circ$.',
      ],
      answer: '$AM$ đi qua $H$ và $\\widehat{BAM} = 20^\\circ$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Tam giác $DEF$ có $DE = 5$ cm, $EF = 7$ cm, $FD = 6$ cm. Góc lớn nhất của tam giác là',
      options: ['$\\widehat{D}$', '$\\widehat{E}$', '$\\widehat{F}$'],
      answer: 0,
      hints: ['Góc lớn nhất đối diện với cạnh lớn nhất.'],
      solution: 'Cạnh lớn nhất là $EF = 7$ cm; góc đối diện với $EF$ là $\\widehat{D}$.',
    },
    {
      type: 'order',
      prompt:
        'Tam giác $ABC$ có $\\widehat{A} = 45^\\circ$, $\\widehat{B} = 75^\\circ$. Sắp xếp ba cạnh từ nhỏ đến lớn.',
      items: ['$AB$', '$BC$', '$CA$'],
      answer: [1, 0, 2],
      hints: ['Tính $\\widehat{C}$, rồi so sánh ba góc.'],
      solution:
        '$\\widehat{C} = 60^\\circ$, nên $\\widehat{A} < \\widehat{C} < \\widehat{B}$. Cạnh đối diện lần lượt là $BC$, $AB$, $CA$, nên $BC < AB < CA$.',
    },
    {
      type: 'choice',
      prompt:
        'Từ điểm $A$ ở ngoài đường thẳng $d$, kẻ đường vuông góc $AH$ và đường xiên $AM$ đến $d$ ($M \\ne H$). Khẳng định nào đúng?',
      options: ['$AM < AH$', '$AM = AH$', '$AM > AH$', 'Chưa so sánh được'],
      answer: 2,
      hints: ['Trong tam giác $AHM$ vuông tại $H$, cạnh nào lớn nhất?'],
      solution:
        'Tam giác $AHM$ vuông tại $H$, cạnh huyền $AM$ đối diện góc vuông là cạnh lớn nhất, nên $AM > AH$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các bộ ba độ dài là độ dài ba cạnh của một tam giác.',
      options: [
        '$3$ cm, $4$ cm, $8$ cm',
        '$4$ cm, $5$ cm, $8$ cm',
        '$5$ cm, $5$ cm, $10$ cm',
        '$6$ cm, $7$ cm, $12$ cm',
      ],
      answers: [1, 3],
      hints: ['So sánh độ dài lớn nhất với tổng hai độ dài còn lại.'],
      solution: '$8 > 3 + 4$: không; $8 < 4 + 5$: có; $10 = 5 + 5$: không; $12 < 6 + 7$: có.',
    },
    {
      type: 'number',
      prompt: 'Tam giác $ABC$ cân tại $A$ có $AB = 8$ cm, $BC = 3$ cm. Tính chu vi tam giác (cm).',
      answer: 19,
      unit: 'cm',
      hints: ['Tam giác cân tại $A$: $AC = AB$.'],
      solution: '$AC = AB = 8$ cm. Chu vi bằng $8 + 8 + 3 = 19$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AB = 2$ cm, $AC = 7$ cm và độ dài $BC$ là một số nguyên lẻ (xăng-ti-mét). Tính $BC$.',
      answer: 7,
      unit: 'cm',
      hints: ['Viết khoảng chứa $BC$ theo bất đẳng thức tam giác.'],
      solution:
        '$7 - 2 < BC < 7 + 2$, tức $5 < BC < 9$, nên $BC \\in \\{6; 7; 8\\}$. Số lẻ duy nhất là $7$, vậy $BC = 7$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có trọng tâm $G$, đường trung tuyến $AM$ và $GM = 4$ cm. Tính $AM$ (cm).',
      answer: 12,
      unit: 'cm',
      hints: ['$GM = \\dfrac{1}{3}AM$.'],
      solution: '$AM = 3GM = 3 \\cdot 4 = 12$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $\\widehat{A} = 90^\\circ$. Hai đường phân giác $BE$, $CF$ cắt nhau tại $I$. Tính $\\widehat{BIC}$ (độ).',
      answer: 135,
      unit: '°',
      hints: [
        '$\\widehat{B} + \\widehat{C} = 90^\\circ$; $\\widehat{IBC} + \\widehat{ICB}$ bằng bao nhiêu?',
      ],
      solution:
        '$\\widehat{IBC} + \\widehat{ICB} = \\dfrac{90^\\circ}{2} = 45^\\circ$, nên $\\widehat{BIC} = 180^\\circ - 45^\\circ = 135^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $MNP$ vuông tại $M$ có $NP = 14$ cm. Gọi $O$ là giao điểm ba đường trung trực. Tính $OM$ (cm).',
      answer: 7,
      unit: 'cm',
      hints: ['Trong tam giác vuông, $O$ là trung điểm của cạnh nào?'],
      solution:
        '$O$ là trung điểm của cạnh huyền $NP$, nên $ON = 7$ cm; $O$ cách đều ba đỉnh nên $OM = 7$ cm.',
    },
    {
      type: 'choice',
      prompt: 'Trực tâm của một tam giác tù nằm ở đâu?',
      options: [
        'Bên trong tam giác',
        'Trên một cạnh của tam giác',
        'Bên ngoài tam giác',
        'Tại đỉnh góc tù',
      ],
      answer: 2,
      hints: ['Kẻ đường cao từ hai đỉnh nhọn: chân đường cao rơi vào đâu?'],
      solution:
        'Với tam giác tù, chân hai đường cao kẻ từ hai đỉnh góc nhọn rơi trên phần kéo dài của cạnh, và các đường thẳng chứa ba đường cao cắt nhau ở ngoài tam giác.',
    },
    {
      type: 'choice',
      prompt:
        'Một con đường thẳng $d$ chạy qua gần làng $A$. Muốn làm một lối đi ngắn nhất từ làng $A$ ra đường $d$, ta làm lối đi',
      options: [
        'theo đường vuông góc kẻ từ $A$ đến $d$',
        'theo một đường xiên bất kì từ $A$ đến $d$',
        'song song với $d$',
        'tới điểm của $d$ cách đều hai đầu đường',
      ],
      answer: 0,
      hints: ['So sánh đường vuông góc và các đường xiên kẻ từ $A$.'],
      solution:
        'Đường vuông góc kẻ từ $A$ đến $d$ ngắn hơn mọi đường xiên, nên lối đi ngắn nhất là theo đường vuông góc.',
    },
    {
      type: 'choice',
      prompt:
        'Ba trạm $A$, $B$, $C$ không thẳng hàng. Cần đặt một trạm phát sóng cách đều ba trạm. Vị trí đó là',
      options: [
        'trọng tâm của tam giác $ABC$',
        'giao điểm ba đường phân giác của tam giác $ABC$',
        'giao điểm ba đường trung trực của tam giác $ABC$',
        'trực tâm của tam giác $ABC$',
      ],
      answer: 2,
      hints: ['Cách đều ba điểm, tức là ba đỉnh của tam giác.'],
      solution: 'Điểm cách đều ba đỉnh là giao điểm của ba đường trung trực.',
    },
  ],
  takeaways: [
    'Góc lớn đối diện cạnh lớn; đường vuông góc ngắn hơn đường xiên; mỗi cạnh nhỏ hơn tổng hai cạnh kia.',
    'Trọng tâm $G$: $AG = \\dfrac{2}{3}AM$. Giao điểm ba phân giác cách đều ba cạnh; giao điểm ba trung trực cách đều ba đỉnh.',
    'Ba đường cao đồng quy tại trực tâm; vị trí của $O$ và $H$ phụ thuộc tam giác nhọn, vuông hay tù.',
  ],
};
