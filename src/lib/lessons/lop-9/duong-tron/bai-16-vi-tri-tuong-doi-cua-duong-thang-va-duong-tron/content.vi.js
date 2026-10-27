/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ba vị trí tương đối của đường thẳng và đường tròn (cắt nhau, tiếp xúc, không giao nhau) qua so sánh khoảng cách d với bán kính R, tiếp tuyến và dấu hiệu nhận biết, tính chất hai tiếp tuyến cắt nhau.',
  intro:
    'Đặt một chiếc thước kẻ lên một đồng xu và từ từ đẩy thước ra xa. Lúc đầu thước cắt ngang đồng xu, rồi đến lúc thước chỉ còn chạm mép đồng xu tại đúng một điểm, sau đó thì rời hẳn. Ba khoảnh khắc ấy chính là ba vị trí tương đối của một đường thẳng và một đường tròn, và chỉ cần một con số để phân biệt chúng: khoảng cách từ tâm đến đường thẳng.',
  objectives: [
    'Nhận biết ba vị trí tương đối của đường thẳng và đường tròn bằng cách so sánh $d$ với $R$.',
    'Nhận biết tiếp tuyến, tiếp điểm; dùng tính chất và dấu hiệu nhận biết tiếp tuyến.',
    'Vận dụng tính chất của hai tiếp tuyến cắt nhau để tính độ dài, số đo góc.',
  ],
  sections: [
    {
      heading: 'Ba vị trí tương đối của đường thẳng và đường tròn',
      blocks: [
        {
          type: 'p',
          text: 'Cho đường tròn $(O; R)$ và đường thẳng $a$. Gọi $H$ là chân đường vuông góc kẻ từ $O$ đến $a$; khi đó $d = OH$ là khoảng cách từ tâm $O$ đến đường thẳng $a$.',
        },
        {
          type: 'table',
          head: ['Vị trí tương đối', 'Số điểm chung', 'Hệ thức giữa $d$ và $R$'],
          rows: [
            ['Đường thẳng và đường tròn cắt nhau', '$2$', '$d < R$'],
            ['Đường thẳng và đường tròn tiếp xúc nhau', '$1$', '$d = R$'],
            ['Đường thẳng và đường tròn không giao nhau', '$0$', '$d > R$'],
          ],
          caption: 'Vị trí tương đối của đường thẳng và đường tròn.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cát tuyến, tiếp tuyến',
          text: 'Đường thẳng cắt đường tròn tại hai điểm gọi là cát tuyến của đường tròn. Khi đường thẳng $a$ và đường tròn $(O)$ chỉ có một điểm chung $H$, ta nói $a$ tiếp xúc với $(O)$; $a$ gọi là tiếp tuyến của $(O)$ và $H$ gọi là tiếp điểm.',
        },
        {
          type: 'p',
          text: 'Khi $a$ cắt $(O)$ tại $A$ và $B$, tam giác $OAB$ cân tại $O$ nên $H$ là trung điểm của $AB$ và $AB = 2\\sqrt{R^2 - d^2}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất của tiếp tuyến',
          text: 'Nếu một đường thẳng là tiếp tuyến của một đường tròn thì nó vuông góc với bán kính đi qua tiếp điểm.',
        },
      ],
    },
    {
      heading: 'Dấu hiệu nhận biết tiếp tuyến của đường tròn',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Dấu hiệu nhận biết',
          text: 'Nếu một đường thẳng đi qua một điểm của đường tròn và vuông góc với bán kính đi qua điểm đó thì đường thẳng ấy là một tiếp tuyến của đường tròn.',
        },
        {
          type: 'p',
          text: 'Thật vậy, nếu $a$ đi qua điểm $A$ của $(O; R)$ và $a \\perp OA$ tại $A$ thì khoảng cách từ $O$ đến $a$ là $d = OA = R$, nên $a$ tiếp xúc với đường tròn tại $A$.',
        },
        {
          type: 'p',
          text: 'Ngoài ra, đường thẳng chỉ có một điểm chung với đường tròn cũng là tiếp tuyến (theo định nghĩa), và đường thẳng có khoảng cách từ tâm bằng bán kính cũng là tiếp tuyến.',
        },
      ],
    },
    {
      heading: 'Tính chất của hai tiếp tuyến cắt nhau',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Nếu hai tiếp tuyến của một đường tròn cắt nhau tại một điểm thì: điểm đó cách đều hai tiếp điểm; tia kẻ từ điểm đó đi qua tâm là tia phân giác của góc tạo bởi hai tiếp tuyến; tia kẻ từ tâm đi qua điểm đó là tia phân giác của góc tạo bởi hai bán kính đi qua các tiếp điểm.',
        },
        {
          type: 'p',
          text: 'Cụ thể, nếu $MA$, $MB$ là hai tiếp tuyến của $(O)$ tại $A$ và $B$ thì $MA = MB$, $MO$ là tia phân giác của $\\widehat{AMB}$ và $OM$ là tia phân giác của $\\widehat{AOB}$. Chứng minh: hai tam giác vuông $OAM$ và $OBM$ (vuông tại $A$, $B$) có cạnh huyền $OM$ chung và $OA = OB$, nên chúng bằng nhau.',
        },
        {
          type: 'widget',
          name: 'tiep-tuyen',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Trong tam giác vuông $OAM$: $MA = \\sqrt{OM^2 - R^2}$. Tứ giác $OAMB$ có hai góc vuông tại $A$, $B$ nên $\\widehat{AMB} + \\widehat{AOB} = 180^\\circ$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Dời đường thẳng lại gần đường tròn',
    instruction:
      'Kéo điểm $H$ (chân đường vuông góc từ $O$ đến $a$) hoặc chọn $H$ rồi dùng phím mũi tên: lên, xuống để đổi khoảng cách $d$, trái, phải để quay đường thẳng. So sánh $d$ với $R = 3$ cm và đếm số điểm chung. Khi $d = R$, đường thẳng là tiếp tuyến.',
  },
  examples: [
    {
      problem:
        'Cho đường tròn $(O; 5\\text{ cm})$ và đường thẳng $a$ cách $O$ một khoảng $3$ cm. Xác định vị trí tương đối của $a$ và $(O)$; nếu chúng cắt nhau tại $A$, $B$, tính $AB$.',
      steps: [
        '$d = 3 < 5 = R$ nên $a$ và $(O)$ cắt nhau tại hai điểm $A$, $B$.',
        'Gọi $H$ là chân đường vuông góc từ $O$ đến $a$: $H$ là trung điểm của $AB$ và $OH = 3$ cm.',
        '$AH^2 = OA^2 - OH^2 = 25 - 9 = 16$, nên $AH = 4$ cm và $AB = 8$ cm.',
      ],
      answer: '$a$ cắt $(O)$ tại hai điểm, $AB = 8$ cm.',
    },
    {
      problem:
        'Cho đường tròn $(O; 6\\text{ cm})$, điểm $A$ thuộc đường tròn và đường thẳng $a$ vuông góc với $OA$ tại $A$. Chứng minh $a$ là tiếp tuyến của $(O)$. Lấy $M$ trên $a$ với $OM = 10$ cm, tính $MA$.',
      steps: [
        '$a$ đi qua điểm $A$ của đường tròn và vuông góc với bán kính $OA$ tại $A$, nên theo dấu hiệu nhận biết, $a$ là tiếp tuyến của $(O)$ tại $A$.',
        'Tam giác $OAM$ vuông tại $A$, theo định lí Pythagore: $MA^2 = OM^2 - OA^2 = 100 - 36 = 64$.',
        'Vậy $MA = 8$ cm.',
      ],
      answer: '$a$ là tiếp tuyến tại $A$; $MA = 8$ cm.',
    },
    {
      problem:
        'Từ điểm $M$ nằm ngoài đường tròn $(O; 3\\text{ cm})$, kẻ hai tiếp tuyến $MA$, $MB$ ($A$, $B$ là tiếp điểm) sao cho $\\widehat{AMB} = 60^\\circ$. Tính $OM$, $MA$ và $\\widehat{AOB}$.',
      steps: [
        'Theo tính chất hai tiếp tuyến cắt nhau, $MO$ là tia phân giác của $\\widehat{AMB}$, nên $\\widehat{AMO} = 30^\\circ$.',
        'Tam giác $OAM$ vuông tại $A$ có góc $30^\\circ$ đối diện cạnh $OA$, nên $OM = 2OA = 6$ cm.',
        '$MA = \\sqrt{OM^2 - OA^2} = \\sqrt{36 - 9} = 3\\sqrt{3} \\approx 5{,}20$ cm, và $MB = MA$.',
        'Tứ giác $OAMB$ có $\\widehat{OAM} = \\widehat{OBM} = 90^\\circ$, nên $\\widehat{AOB} = 360^\\circ - 90^\\circ - 90^\\circ - 60^\\circ = 120^\\circ$.',
      ],
      answer:
        '$OM = 6$ cm, $MA = MB = 3\\sqrt{3} \\approx 5{,}20$ cm, $\\widehat{AOB} = 120^\\circ$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Đường thẳng $a$ cách tâm của đường tròn $(O; 6\\text{ cm})$ một khoảng $6$ cm. Vị trí tương đối của $a$ và $(O)$ là',
      options: ['cắt nhau', 'tiếp xúc nhau', 'không giao nhau', 'không xác định được'],
      answer: 1,
      hints: ['So sánh $d$ với $R$.'],
      solution: '$d = R = 6$ cm nên $a$ tiếp xúc với $(O)$: $a$ là tiếp tuyến.',
    },
    {
      type: 'number',
      prompt:
        'Đường tròn $(O; 5\\text{ cm})$ và đường thẳng $a$ với $d = 4$ cm. Chúng có bao nhiêu điểm chung?',
      answer: 2,
      hints: ['$d < R$, $d = R$ hay $d > R$?'],
      solution: '$d = 4 < 5 = R$ nên $a$ cắt đường tròn tại $2$ điểm.',
    },
    {
      type: 'multi',
      prompt:
        'Với đường tròn $(O; 7\\text{ cm})$, đường thẳng có khoảng cách $d$ đến tâm bằng bao nhiêu thì là một cát tuyến? (Chọn tất cả.)',
      options: ['$d = 3$ cm', '$d = 7$ cm', '$d = 6{,}9$ cm', '$d = 8$ cm'],
      answers: [0, 2],
      hints: ['Cát tuyến cắt đường tròn tại hai điểm, tức là $d < R$.'],
      solution:
        '$3 < 7$ và $6{,}9 < 7$ nên hai đường thẳng đó là cát tuyến. $d = 7$ cho tiếp tuyến, $d = 8$ thì không giao nhau.',
    },
    {
      type: 'number',
      prompt:
        'Từ điểm $M$ cách tâm $O$ của đường tròn $(O; 5\\text{ cm})$ một khoảng $13$ cm, kẻ tiếp tuyến $MA$ ($A$ là tiếp điểm). Tính $MA$.',
      answer: 12,
      unit: 'cm',
      hints: ['Tiếp tuyến vuông góc với bán kính tại tiếp điểm: tam giác $OAM$ vuông tại $A$.'],
      solution: '$MA^2 = OM^2 - OA^2 = 169 - 25 = 144$, nên $MA = 12$ cm.',
    },
    {
      type: 'number',
      prompt:
        '$MA$, $MB$ là hai tiếp tuyến của $(O)$ tại $A$ và $B$, biết $\\widehat{AOB} = 120^\\circ$. Tính $\\widehat{AMB}$.',
      answer: 60,
      unit: '°',
      hints: [
        'Tứ giác $OAMB$ có hai góc vuông ở $A$ và $B$.',
        'Tổng các góc của tứ giác bằng $360^\\circ$.',
      ],
      solution: '$\\widehat{AMB} = 360^\\circ - 90^\\circ - 90^\\circ - 120^\\circ = 60^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tiếp tuyến tại $A$ của đường tròn $(O; 8\\text{ cm})$ chứa điểm $M$ với $MA = 15$ cm. Tính $OM$.',
      answer: 17,
      unit: 'cm',
      hints: ['$OA \\perp MA$ nên tam giác $OAM$ vuông tại $A$.'],
      solution: '$OM^2 = OA^2 + MA^2 = 64 + 225 = 289$, nên $OM = 17$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một cát tuyến cách tâm của đường tròn $(O; 10\\text{ cm})$ một khoảng $6$ cm, cắt đường tròn tại $A$ và $B$. Tính $AB$.',
      answer: 16,
      unit: 'cm',
      hints: [
        'Chân đường vuông góc $H$ từ $O$ là trung điểm của $AB$.',
        '$AH = \\sqrt{R^2 - d^2}$.',
      ],
      solution: '$AH = \\sqrt{100 - 36} = 8$ cm, nên $AB = 2AH = 16$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Điểm $A$ thuộc đường tròn $(O)$. Đường thẳng nào sau đây là tiếp tuyến của $(O)$ tại $A$?',
      options: [
        'Đường thẳng đi qua $A$ và $O$',
        'Đường thẳng đi qua $A$ và song song với $OA$',
        'Đường thẳng đi qua $A$ và cắt đường tròn tại một điểm khác $A$',
        'Đường thẳng đi qua $A$ và vuông góc với $OA$',
      ],
      answer: 3,
      hints: ['Nhớ lại dấu hiệu nhận biết tiếp tuyến.'],
      solution:
        'Đường thẳng đi qua điểm $A$ của đường tròn và vuông góc với bán kính $OA$ tại $A$ là tiếp tuyến. Đường thẳng qua $A$ và $O$ cắt đường tròn tại hai điểm nên là cát tuyến.',
    },
    {
      type: 'number',
      prompt:
        'Từ $M$ ngoài đường tròn $(O; 4\\text{ cm})$ kẻ hai tiếp tuyến $MA$, $MB$ với $\\widehat{AMB} = 60^\\circ$. Tính $OM$.',
      answer: 8,
      unit: 'cm',
      hints: [
        '$MO$ là tia phân giác của $\\widehat{AMB}$, nên $\\widehat{AMO} = 30^\\circ$.',
        'Trong tam giác vuông, cạnh đối diện góc $30^\\circ$ bằng nửa cạnh huyền.',
      ],
      solution:
        '$\\widehat{AMO} = 30^\\circ$ và tam giác $OAM$ vuông tại $A$, nên $OA = \\dfrac{OM}{2}$, suy ra $OM = 2 \\cdot 4 = 8$ cm.',
    },
    {
      type: 'number',
      prompt:
        '$MA$, $MB$ là hai tiếp tuyến của đường tròn $(O)$ cắt nhau tại $M$, biết $MA = 9$ cm và $\\widehat{AMB} = 90^\\circ$. Tính bán kính của đường tròn.',
      answer: 9,
      unit: 'cm',
      hints: [
        'Tứ giác $OAMB$ có bốn góc vuông và $MA = MB$.',
        'Tứ giác có bốn góc vuông và hai cạnh kề bằng nhau là hình gì?',
      ],
      solution:
        'Tứ giác $OAMB$ có $\\widehat{OAM} = \\widehat{OBM} = \\widehat{AMB} = 90^\\circ$ nên là hình chữ nhật; lại có $MA = MB$ nên là hình vuông. Do đó $R = OA = MB = MA = 9$ cm.',
    },
  ],
  takeaways: [
    '$d < R$: cắt nhau ($2$ điểm chung); $d = R$: tiếp xúc ($1$ điểm chung); $d > R$: không giao nhau.',
    'Tiếp tuyến vuông góc với bán kính tại tiếp điểm; ngược lại, đường thẳng qua một điểm của đường tròn và vuông góc với bán kính tại điểm đó là tiếp tuyến.',
    'Hai tiếp tuyến $MA$, $MB$ cắt nhau tại $M$: $MA = MB$, $MO$ là phân giác góc $AMB$, $OM$ là phân giác góc $AOB$.',
    '$MA = \\sqrt{OM^2 - R^2}$ và $\\widehat{AMB} + \\widehat{AOB} = 180^\\circ$.',
  ],
};
