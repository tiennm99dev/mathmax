/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: tứ giác nội tiếp và tổng hai góc đối, chứng minh tứ giác nội tiếp, đường tròn ngoại tiếp hình chữ nhật và hình vuông, góc của đa giác đều và các phép quay giữ nguyên đa giác đều.',
  intro:
    'Tứ giác nội tiếp và đa giác đều đều là những hình có các đỉnh cùng nằm trên một đường tròn. Với tứ giác, ta kiểm tra bằng tổng hai góc đối; với đa giác đều, các đỉnh chia đường tròn thành những cung bằng nhau. Bài luyện tập này phối hợp hai ý đó để tính góc, tính bán kính và nhận ra các phép quay giữ nguyên hình.',
  objectives: [
    'Tính góc của tứ giác nội tiếp; chứng minh một tứ giác nội tiếp bằng tổng hai góc đối.',
    'Tính bán kính đường tròn ngoại tiếp hình chữ nhật, hình vuông, lục giác đều.',
    'Tính góc ở tâm, góc của đa giác đều, số cạnh; xác định ảnh của một đỉnh qua phép quay giữ nguyên đa giác đều.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            ['Tứ giác nội tiếp', 'Bốn đỉnh nằm trên một đường tròn'],
            ['Tính chất', 'Tổng hai góc đối bằng $180^\\circ$'],
            ['Dấu hiệu nhận biết', 'Tứ giác có tổng hai góc đối bằng $180^\\circ$ thì nội tiếp'],
            [
              'Hình chữ nhật, hình vuông',
              'Nội tiếp; tâm là giao hai đường chéo, $R$ bằng nửa đường chéo',
            ],
            [
              'Đa giác đều',
              'Đa giác lồi có các cạnh bằng nhau và các góc bằng nhau; nội tiếp một đường tròn tâm $O$',
            ],
            [
              'Đa giác đều $n$ cạnh',
              'Góc ở tâm $\\dfrac{360^\\circ}{n}$; mỗi góc $180^\\circ - \\dfrac{360^\\circ}{n}$',
            ],
            [
              'Phép quay giữ nguyên',
              'Góc quay là $k \\cdot \\dfrac{360^\\circ}{n}$ với $k = 1, 2, \\ldots, n$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hai góc vuông cùng nhìn một đoạn',
          text: 'Nếu $\\widehat{BEC} = \\widehat{BDC} = 90^\\circ$ thì $E$ và $D$ cùng nằm trên đường tròn đường kính $BC$ (tâm là trung điểm $BC$), nên $B$, $C$, $D$, $E$ cùng thuộc một đường tròn. Đây là cách thường gặp để chứng minh tứ giác nội tiếp ngoài tổng hai góc đối.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Cộng hai góc kề thay vì hai góc đối. Dùng $R = $ cạnh cho đa giác đều không phải lục giác (chỉ lục giác đều có cạnh bằng bán kính). Quên rằng phép quay $360^\\circ$ cũng giữ nguyên hình, nên đa giác đều $n$ cạnh có đúng $n$ phép quay thuận chiều giữ nguyên nó với góc trong khoảng $0^\\circ < \\alpha^\\circ \\le 360^\\circ$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Số thập phân dùng dấu phẩy ($7{,}5$); có thể gõ kèm đơn vị như cm hay °. Làm sai lần đầu, em được gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết phần nào cần ôn thêm.',
  },
  examples: [
    {
      problem:
        'Tứ giác $ABCD$ nội tiếp đường tròn có $\\widehat{A} = 80^\\circ$ và $\\widehat{B} = 3\\widehat{D}$. Tính các góc còn lại.',
      steps: [
        '$\\widehat{A} + \\widehat{C} = 180^\\circ$ nên $\\widehat{C} = 100^\\circ$.',
        '$\\widehat{B} + \\widehat{D} = 180^\\circ$ và $\\widehat{B} = 3\\widehat{D}$, nên $4\\widehat{D} = 180^\\circ$, $\\widehat{D} = 45^\\circ$.',
        '$\\widehat{B} = 3 \\cdot 45^\\circ = 135^\\circ$.',
      ],
      answer:
        '$\\widehat{B} = 135^\\circ$, $\\widehat{C} = 100^\\circ$, $\\widehat{D} = 45^\\circ$.',
    },
    {
      problem:
        'Tam giác nhọn $ABC$ có hai đường cao $BD$, $CE$. Chứng minh tứ giác $BCDE$ nội tiếp và $\\widehat{ADE} = \\widehat{ABC}$.',
      steps: [
        '$\\widehat{BEC} = \\widehat{BDC} = 90^\\circ$ nên $E$, $D$ nằm trên đường tròn đường kính $BC$: tứ giác $BCDE$ nội tiếp.',
        'Trong tứ giác nội tiếp $BCDE$: $\\widehat{EDC} + \\widehat{EBC} = 180^\\circ$.',
        'Mặt khác $\\widehat{ADE} + \\widehat{EDC} = 180^\\circ$ (kề bù), nên $\\widehat{ADE} = \\widehat{EBC} = \\widehat{ABC}$.',
      ],
      answer: 'Tứ giác $BCDE$ nội tiếp và $\\widehat{ADE} = \\widehat{ABC}$.',
    },
    {
      problem: 'Một đa giác đều có mỗi góc bằng $140^\\circ$. Đa giác đó có bao nhiêu cạnh?',
      steps: [
        'Mỗi góc của đa giác đều $n$ cạnh bằng $180^\\circ - \\dfrac{360^\\circ}{n}$.',
        'Suy ra góc ở tâm $\\dfrac{360^\\circ}{n} = 180^\\circ - 140^\\circ = 40^\\circ$.',
        '$n = 360 : 40 = 9$.',
      ],
      answer: 'Đa giác có $9$ cạnh.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tứ giác $ABCD$ nội tiếp có $\\widehat{A} = 105^\\circ$. Tính $\\widehat{C}$.',
      answer: 75,
      unit: '°',
      hints: ['$\\widehat{A}$ và $\\widehat{C}$ là hai góc đối.'],
      solution: '$\\widehat{C} = 180^\\circ - 105^\\circ = 75^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tứ giác $ABCD$ nội tiếp có $\\widehat{A} : \\widehat{C} = 2 : 3$. Tính $\\widehat{C}$.',
      answer: 108,
      unit: '°',
      hints: [
        '$\\widehat{A} + \\widehat{C} = 180^\\circ$; chia $180^\\circ$ thành $5$ phần bằng nhau.',
      ],
      solution:
        'Mỗi phần $180^\\circ : 5 = 36^\\circ$, nên $\\widehat{C} = 3 \\cdot 36^\\circ = 108^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Hình chữ nhật $ABCD$ có $AB = 9$ cm, $BC = 12$ cm. Tính bán kính đường tròn ngoại tiếp hình chữ nhật.',
      answer: 7.5,
      unit: 'cm',
      hints: ['Bán kính bằng nửa đường chéo.'],
      solution: '$AC = \\sqrt{81 + 144} = 15$ cm, nên $R = 15 : 2 = 7{,}5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tính bán kính đường tròn ngoại tiếp hình vuông cạnh $6$ cm (làm tròn đến hàng phần trăm).',
      answer: 4.24,
      tolerance: 0.005,
      unit: 'cm',
      hints: ['Đường chéo hình vuông cạnh $a$ bằng $a\\sqrt{2}$.'],
      solution: '$R = \\dfrac{6\\sqrt{2}}{2} = 3\\sqrt{2} \\approx 4{,}24$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác nhọn $ABC$ có hai đường cao $BD$, $CE$ và $\\widehat{ABC} = 70^\\circ$. Tính $\\widehat{ADE}$.',
      answer: 70,
      unit: '°',
      hints: [
        'Tứ giác $BCDE$ nội tiếp đường tròn đường kính $BC$.',
        'Góc ngoài $\\widehat{ADE}$ tại đỉnh $D$ bằng góc trong ở đỉnh đối diện.',
      ],
      solution:
        '$BCDE$ nội tiếp nên $\\widehat{EDC} = 180^\\circ - \\widehat{EBC} = 110^\\circ$. Do đó $\\widehat{ADE} = 180^\\circ - 110^\\circ = 70^\\circ$.',
    },
    {
      type: 'choice',
      prompt: 'Tứ giác $ABCD$ nào dưới đây nội tiếp được đường tròn?',
      options: [
        '$\\widehat{A} = 60^\\circ$, $\\widehat{B} = 120^\\circ$, $\\widehat{C} = 60^\\circ$',
        '$\\widehat{A} = 85^\\circ$, $\\widehat{B} = 70^\\circ$, $\\widehat{C} = 95^\\circ$',
        '$\\widehat{A} = 90^\\circ$, $\\widehat{B} = 80^\\circ$, $\\widehat{C} = 80^\\circ$',
        '$\\widehat{A} = 100^\\circ$, $\\widehat{B} = 100^\\circ$, $\\widehat{C} = 100^\\circ$',
      ],
      answer: 1,
      hints: ['Tính $\\widehat{A} + \\widehat{C}$ ở mỗi phương án.'],
      solution:
        'Chỉ phương án 2 có $\\widehat{A} + \\widehat{C} = 85^\\circ + 95^\\circ = 180^\\circ$ (khi đó $\\widehat{D} = 110^\\circ$ và $\\widehat{B} + \\widehat{D} = 180^\\circ$). Các phương án khác có tổng $120^\\circ$, $170^\\circ$, $200^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Tính số đo mỗi góc của đa giác đều $12$ cạnh.',
      answer: 150,
      unit: '°',
      hints: ['Góc ở tâm bằng $360^\\circ : 12$.'],
      solution: 'Góc ở tâm $30^\\circ$, nên mỗi góc bằng $180^\\circ - 30^\\circ = 150^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Một đa giác đều có góc ở tâm bằng $24^\\circ$. Đa giác đó có bao nhiêu cạnh?',
      answer: 15,
      hints: ['Góc ở tâm bằng $360^\\circ : n$.'],
      solution: '$n = 360 : 24 = 15$.',
    },
    {
      type: 'number',
      prompt:
        'Có bao nhiêu phép quay thuận chiều $\\alpha^\\circ$ tâm $O$ với $0^\\circ < \\alpha^\\circ \\le 360^\\circ$ giữ nguyên bát giác đều tâm $O$?',
      answer: 8,
      hints: ['Góc quay phải là bội của $360^\\circ : 8 = 45^\\circ$.'],
      solution: 'Các góc $45^\\circ, 90^\\circ, \\ldots, 360^\\circ$: có $8$ phép quay.',
    },
    {
      type: 'text',
      prompt:
        'Hình vuông $ABCD$ tâm $O$ có các đỉnh kí hiệu theo chiều kim đồng hồ. Phép quay ngược chiều $90^\\circ$ tâm $O$ biến điểm $A$ thành điểm nào? (Ghi tên điểm.)',
      accept: ['D', 'điểm D', 'diem D'],
      hints: [
        'Phép quay thuận chiều $90^\\circ$ biến $A$ thành $B$.',
        'Ngược chiều thì $A$ đi về đỉnh đứng trước nó.',
      ],
      solution:
        'Các đỉnh theo chiều kim đồng hồ là $A \\to B \\to C \\to D \\to A$. Quay ngược chiều $90^\\circ$ đưa mỗi đỉnh về đỉnh đứng trước, nên $A$ biến thành $D$.',
    },
    {
      type: 'number',
      prompt: 'Lục giác đều có cạnh $7$ cm. Tính bán kính đường tròn ngoại tiếp lục giác.',
      answer: 7,
      unit: 'cm',
      hints: ['Tam giác tạo bởi tâm và một cạnh của lục giác đều là tam giác gì?'],
      solution:
        'Góc ở tâm $60^\\circ$, tam giác $OAB$ cân tại $O$ có một góc $60^\\circ$ nên là tam giác đều: $R = OA = AB = 7$ cm.',
    },
  ],
  takeaways: [
    'Tứ giác nội tiếp $\\Leftrightarrow$ tổng hai góc đối bằng $180^\\circ$ (với tứ giác lồi).',
    'Hai đỉnh cùng nhìn một đoạn dưới góc vuông thì nằm trên đường tròn có đường kính là đoạn đó.',
    'Đa giác đều $n$ cạnh: góc ở tâm $\\dfrac{360^\\circ}{n}$, mỗi góc $180^\\circ - \\dfrac{360^\\circ}{n}$; lục giác đều có cạnh bằng $R$.',
    'Có $n$ phép quay thuận chiều tâm $O$ (góc đến $360^\\circ$) giữ nguyên đa giác đều $n$ cạnh.',
  ],
};
