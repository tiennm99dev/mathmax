/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hình chữ nhật: định nghĩa, tính chất hai đường chéo, các dấu hiệu nhận biết và áp dụng vào đường trung tuyến của tam giác vuông.',
  intro:
    'Trang sách, mặt bàn, màn hình điện thoại hay khung cửa đều có dạng hình chữ nhật. Thợ mộc làm khung cửa thường đo hai đường chéo: nếu khung là hình bình hành và hai đường chéo dài bằng nhau thì bốn góc của khung đều vuông. Vì sao cách kiểm tra này đúng? Bài học hôm nay sẽ trả lời.',
  objectives: [
    'Nhận biết hình chữ nhật và giải thích được tính chất về hai đường chéo của hình chữ nhật.',
    'Chứng minh một tứ giác là hình chữ nhật bằng các dấu hiệu nhận biết.',
    'Vận dụng tính chất đường trung tuyến ứng với cạnh huyền của tam giác vuông.',
  ],
  sections: [
    {
      heading: 'Hình chữ nhật và tính chất',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình chữ nhật',
          text: 'Hình chữ nhật là tứ giác có bốn góc vuông.',
        },
        {
          type: 'p',
          text: 'Tứ giác $ABCD$ là hình chữ nhật khi $\\widehat{A} = \\widehat{B} = \\widehat{C} = \\widehat{D} = 90^\\circ$. Hình chữ nhật có các góc đối bằng nhau nên là một hình bình hành; nó cũng là một hình thang cân (hai góc kề đáy $CD$ bằng nhau). Vì vậy hình chữ nhật có mọi tính chất của hình bình hành và của hình thang cân.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 1 (tính chất)',
          text: 'Trong hình chữ nhật, hai đường chéo bằng nhau và cắt nhau tại trung điểm của mỗi đường.',
        },
        {
          type: 'p',
          text: 'Giải thích: hình chữ nhật là hình bình hành nên hai đường chéo cắt nhau tại trung điểm $O$ của mỗi đường; nó cũng là hình thang cân nên $AC = BD$. Do đó $OA = OB = OC = OD$: điểm $O$ cách đều bốn đỉnh của hình chữ nhật.',
        },
      ],
    },
    {
      heading: 'Dấu hiệu nhận biết',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 2 (dấu hiệu nhận biết)',
          text: 'Một tứ giác là hình chữ nhật nếu nó thoả mãn một trong các điều kiện sau:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tứ giác có ba góc vuông;',
            'Hình thang cân có một góc vuông;',
            'Hình bình hành có một góc vuông;',
            'Hình bình hành có hai đường chéo bằng nhau.',
          ],
        },
        {
          type: 'p',
          text: 'Chẳng hạn, với dấu hiệu 4: hình bình hành $ABCD$ có $AC = BD$. Hai tam giác $ABD$ và $BAC$ có $AB$ chung, $AD = BC$ (cạnh đối của hình bình hành), $BD = AC$, nên $\\triangle ABD = \\triangle BAC$ (c.c.c). Suy ra $\\widehat{DAB} = \\widehat{CBA}$. Hai góc này kề cạnh $AB$ nên bù nhau, do đó mỗi góc bằng $90^\\circ$: hình bình hành có một góc vuông nên là hình chữ nhật.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Tứ giác chỉ có hai đường chéo bằng nhau thì chưa chắc là hình chữ nhật (hình thang cân cũng có hai đường chéo bằng nhau). Phải biết thêm tứ giác đó là hình bình hành, tức là hai đường chéo còn cắt nhau tại trung điểm của mỗi đường.',
        },
      ],
    },
    {
      heading: 'Áp dụng vào tam giác vuông',
      blocks: [
        {
          type: 'p',
          text: 'Cho tam giác $ABC$ vuông tại $A$, $M$ là trung điểm của cạnh huyền $BC$. Lấy $D$ đối xứng với $A$ qua $M$. Tứ giác $ABDC$ có hai đường chéo cắt nhau tại trung điểm $M$ của mỗi đường nên là hình bình hành; nó lại có $\\widehat{BAC} = 90^\\circ$ nên là hình chữ nhật. Do đó $AD = BC$, và $AM = \\dfrac{AD}{2} = \\dfrac{BC}{2}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí (đường trung tuyến của tam giác vuông)',
          text: 'Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền. Ngược lại, nếu một tam giác có đường trung tuyến ứng với một cạnh bằng nửa cạnh ấy thì tam giác đó là tam giác vuông.',
        },
        {
          type: 'tex',
          tex: '\\triangle ABC \\text{ vuông tại } A,\\ MB = MC \\iff AM = \\dfrac{BC}{2}',
        },
        { type: 'widget', name: 'trung-tuyen' },
        {
          type: 'p',
          text: 'Kéo đỉnh $A$ trong hình trên: $MA$ bằng nửa $BC$ đúng khi $A$ nằm trên đường tròn đường kính $BC$, và chỉ khi đó góc $BAC$ vuông. Nếu $A$ ở trong đường tròn thì góc $BAC$ tù, ở ngoài thì góc $BAC$ nhọn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Từ hình bình hành đến hình chữ nhật',
    instruction:
      'Kéo $D$ (hoặc chọn $D$ rồi dùng phím mũi tên) để đổi góc $A$ và cạnh $AD$, kéo $B$ để đổi cạnh $AB$; đỉnh $C$ tự chạy theo để $ABCD$ luôn là hình bình hành. Quan sát hai đường chéo: chúng chỉ bằng nhau khi góc $A$ vuông, và lúc đó $O$ cách đều bốn đỉnh.',
  },
  examples: [
    {
      problem:
        'Tứ giác $ABCD$ có $\\widehat{A} = \\widehat{B} = \\widehat{C} = 90^\\circ$, hai đường chéo cắt nhau tại $O$ và $AC = 10$ cm. Tính $OB$.',
      steps: [
        'Tứ giác $ABCD$ có ba góc vuông nên là hình chữ nhật (dấu hiệu 1).',
        'Trong hình chữ nhật, hai đường chéo bằng nhau: $BD = AC = 10$ cm.',
        'Hai đường chéo cắt nhau tại trung điểm mỗi đường: $OB = BD : 2 = 10 : 2 = 5$ cm.',
      ],
      answer: '$OB = 5$ cm.',
    },
    {
      problem:
        'Cho tam giác $ABC$ vuông tại $A$, $M$ là trung điểm của $BC$, $BC = 13$ cm và $\\widehat{B} = 35^\\circ$. Tính $AM$ và $\\widehat{AMC}$.',
      steps: [
        '$AM$ là đường trung tuyến ứng với cạnh huyền nên $AM = \\dfrac{BC}{2} = \\dfrac{13}{2} = 6{,}5$ cm.',
        'Ta có $MA = MB$ ($= \\dfrac{BC}{2}$) nên tam giác $MAB$ cân tại $M$, suy ra $\\widehat{MAB} = \\widehat{B} = 35^\\circ$.',
        '$\\widehat{AMC}$ là góc ngoài tại đỉnh $M$ của tam giác $MAB$: $\\widehat{AMC} = \\widehat{MAB} + \\widehat{B} = 35^\\circ + 35^\\circ = 70^\\circ$.',
      ],
      answer: '$AM = 6{,}5$ cm, $\\widehat{AMC} = 70^\\circ$.',
    },
    {
      problem:
        'Cho hình bình hành $ABCD$ có hai đường chéo cắt nhau tại $O$ và $OA = OB$. Chứng minh rằng $ABCD$ là hình chữ nhật.',
      steps: [
        'Trong hình bình hành, $O$ là trung điểm của mỗi đường chéo: $AC = 2 \\cdot OA$ và $BD = 2 \\cdot OB$.',
        'Vì $OA = OB$ nên $AC = BD$.',
        'Hình bình hành có hai đường chéo bằng nhau là hình chữ nhật (dấu hiệu 4).',
      ],
      answer: '$ABCD$ là hình chữ nhật.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Hình chữ nhật $ABCD$ có hai đường chéo cắt nhau tại $O$ và $AC = 12$ cm. Tính $OD$.',
      answer: 6,
      unit: 'cm',
      hints: ['Hai đường chéo của hình chữ nhật bằng nhau.', '$O$ là trung điểm của $BD$.'],
      solution: '$BD = AC = 12$ cm và $O$ là trung điểm của $BD$, nên $OD = 12 : 2 = 6$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có cạnh huyền $BC = 9$ cm. Tính độ dài đường trung tuyến $AM$.',
      answer: 4.5,
      unit: 'cm',
      hints: ['Đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.'],
      solution: '$AM = \\dfrac{BC}{2} = \\dfrac{9}{2} = 4{,}5$ cm.',
    },
    {
      type: 'choice',
      prompt: 'Tứ giác nào dưới đây chắc chắn là hình chữ nhật?',
      options: [
        'Tứ giác có hai đường chéo bằng nhau.',
        'Hình thang có một góc vuông.',
        'Hình bình hành có hai đường chéo bằng nhau.',
        'Tứ giác có hai góc vuông.',
      ],
      answer: 2,
      hints: [
        'Đối chiếu với bốn dấu hiệu của Định lí 2.',
        'Hình thang cân có hai đường chéo bằng nhau; hình thang vuông có hai góc vuông.',
      ],
      solution:
        'Hình bình hành có hai đường chéo bằng nhau là hình chữ nhật (dấu hiệu 4). Hình thang cân có hai đường chéo bằng nhau, hình thang vuông có hai góc vuông, nhưng chúng không nhất thiết là hình chữ nhật.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các dấu hiệu đúng để nhận biết hình chữ nhật.',
      options: [
        'Tứ giác có ba góc vuông.',
        'Hình thang cân có một góc vuông.',
        'Hình bình hành có một góc vuông.',
        'Hình thang có hai đường chéo bằng nhau.',
        'Hình bình hành có hai đường chéo bằng nhau.',
      ],
      answers: [0, 1, 2, 4],
      hints: ['Hình thang có hai đường chéo bằng nhau là hình gì?'],
      solution:
        'Bốn dấu hiệu đúng là: tứ giác có ba góc vuông, hình thang cân có một góc vuông, hình bình hành có một góc vuông, hình bình hành có hai đường chéo bằng nhau. Hình thang có hai đường chéo bằng nhau chỉ là hình thang cân.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$, $M$ là trung điểm của $BC$ và $\\widehat{B} = 40^\\circ$. Tính $\\widehat{AMC}$ (đơn vị độ).',
      answer: 80,
      unit: '°',
      hints: [
        'So sánh $MA$ và $MB$: tam giác $MAB$ là tam giác gì?',
        '$\\widehat{AMC}$ là góc ngoài của tam giác $MAB$.',
      ],
      solution:
        '$MA = MB = \\dfrac{BC}{2}$ nên tam giác $MAB$ cân tại $M$, $\\widehat{MAB} = \\widehat{B} = 40^\\circ$. Góc ngoài $\\widehat{AMC} = 40^\\circ + 40^\\circ = 80^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Tam giác $ABC$ có $M$ là trung điểm của $BC$, $BC = 10$ cm và $AM = 5$ cm. Số đo góc $BAC$ là',
      options: ['$60^\\circ$', '$90^\\circ$', '$45^\\circ$', 'chưa đủ dữ kiện để tính.'],
      answer: 1,
      hints: ['So sánh $AM$ với $\\dfrac{BC}{2}$.'],
      solution:
        '$AM = 5 = \\dfrac{10}{2} = \\dfrac{BC}{2}$: đường trung tuyến ứng với cạnh $BC$ bằng nửa cạnh ấy, nên tam giác $ABC$ vuông tại $A$, $\\widehat{BAC} = 90^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Hình chữ nhật $ABCD$ có hai đường chéo cắt nhau tại $O$ và $\\widehat{AOB} = 50^\\circ$. Tính $\\widehat{OAB}$ (đơn vị độ).',
      answer: 65,
      unit: '°',
      hints: [
        'So sánh $OA$ và $OB$.',
        'Tam giác $OAB$ cân tại $O$; tổng ba góc của tam giác bằng $180^\\circ$.',
      ],
      solution:
        '$OA = OB$ (nửa của hai đường chéo bằng nhau) nên tam giác $OAB$ cân tại $O$: $\\widehat{OAB} = (180^\\circ - 50^\\circ) : 2 = 65^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Hình chữ nhật $ABCD$ có chu vi $30$ cm và $AB = 2BC$. Tính $BC$.',
      answer: 5,
      unit: 'cm',
      hints: ['Chu vi bằng $2 \\cdot (AB + BC)$.', 'Thay $AB = 2BC$.'],
      solution:
        '$AB + BC = 30 : 2 = 15$ cm. Vì $AB = 2BC$ nên $3BC = 15$, $BC = 5$ cm (và $AB = 10$ cm).',
    },
  ],
  takeaways: [
    'Hình chữ nhật là tứ giác có bốn góc vuông; nó vừa là hình bình hành, vừa là hình thang cân.',
    'Trong hình chữ nhật, hai đường chéo bằng nhau và cắt nhau tại trung điểm của mỗi đường.',
    'Tứ giác có ba góc vuông, hình thang cân có một góc vuông, hình bình hành có một góc vuông hoặc có hai đường chéo bằng nhau là hình chữ nhật.',
    'Trong tam giác vuông, trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền; tam giác có trung tuyến bằng nửa cạnh tương ứng là tam giác vuông.',
  ],
};
