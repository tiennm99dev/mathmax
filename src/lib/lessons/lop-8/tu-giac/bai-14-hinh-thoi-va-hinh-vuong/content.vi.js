/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hình thoi và hình vuông: định nghĩa, tính chất hai đường chéo và các dấu hiệu nhận biết; quan hệ giữa hình bình hành, hình chữ nhật, hình thoi và hình vuông.',
  intro:
    'Mắt lưới của hàng rào B40, những viên gạch hoa hay chiếc diều hình quả trám có bốn cạnh dài bằng nhau: đó là hình thoi. Khi hình thoi có thêm một góc vuông, ta được hình vuông, hình "đặc biệt nhất" trong các tứ giác. Bài này cho em biết hai hình ấy có tính chất gì và nhận ra chúng thế nào.',
  objectives: [
    'Nhận biết hình thoi, hình vuông.',
    'Giải thích được tính chất về hai đường chéo của hình thoi và của hình vuông.',
    'Chứng minh một tứ giác là hình thoi, hình vuông bằng các dấu hiệu nhận biết.',
  ],
  sections: [
    {
      heading: 'Hình thoi và tính chất',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình thoi',
          text: 'Hình thoi là tứ giác có bốn cạnh bằng nhau.',
        },
        {
          type: 'p',
          text: 'Hình thoi $ABCD$ có $AB = BC = CD = DA$. Các cạnh đối bằng nhau nên hình thoi là một hình bình hành: nó có mọi tính chất của hình bình hành (các cạnh đối song song, các góc đối bằng nhau, hai đường chéo cắt nhau tại trung điểm của mỗi đường).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 1 (tính chất)',
          text: 'Trong hình thoi: a) Hai đường chéo vuông góc với nhau; b) Hai đường chéo là các đường phân giác của các góc của hình thoi.',
        },
        {
          type: 'p',
          text: 'Giải thích: vì $AB = AD$ và $CB = CD$ nên $A$ và $C$ cùng cách đều $B$ và $D$, do đó $AC$ là đường trung trực của $BD$, suy ra $AC \\perp BD$. Hai tam giác $ABC$ và $ADC$ có $AB = AD$, $BC = DC$, $AC$ chung nên $\\triangle ABC = \\triangle ADC$ (c.c.c), suy ra $\\widehat{BAC} = \\widehat{DAC}$ và $\\widehat{BCA} = \\widehat{DCA}$: $AC$ là tia phân giác của góc $A$ và của góc $C$. Tương tự với đường chéo $BD$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 2 (dấu hiệu nhận biết hình thoi)',
          text: 'a) Hình bình hành có hai cạnh kề bằng nhau là hình thoi. b) Hình bình hành có hai đường chéo vuông góc với nhau là hình thoi. c) Hình bình hành có một đường chéo là đường phân giác của một góc là hình thoi.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Tứ giác chỉ có hai đường chéo vuông góc thì chưa chắc là hình thoi (chẳng hạn hình cánh diều có $AB = AD$, $CB = CD$ nhưng $AB \\ne CB$). Các dấu hiệu b), c) đòi hỏi tứ giác trước hết là hình bình hành.',
        },
      ],
    },
    {
      heading: 'Hình vuông và tính chất',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình vuông',
          text: 'Hình vuông là tứ giác có bốn góc vuông và bốn cạnh bằng nhau.',
        },
        {
          type: 'p',
          text: 'Hình vuông có bốn góc vuông nên là hình chữ nhật; có bốn cạnh bằng nhau nên là hình thoi. Vì vậy hình vuông có mọi tính chất của hình chữ nhật và của hình thoi.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 3 (tính chất)',
          text: 'Trong hình vuông, hai đường chéo bằng nhau, vuông góc với nhau và cắt nhau tại trung điểm của mỗi đường; mỗi đường chéo là đường phân giác của các góc mà nó đi qua.',
        },
        {
          type: 'p',
          text: 'Mỗi góc của hình vuông bị đường chéo chia đôi, nên đường chéo tạo với mỗi cạnh một góc $45^\\circ$. Gọi $O$ là giao điểm hai đường chéo thì $OA = OB = OC = OD$ và $\\widehat{AOB} = 90^\\circ$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí 4 (dấu hiệu nhận biết hình vuông)',
          text: 'Một tứ giác là hình vuông nếu nó thoả mãn một trong các điều kiện sau:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Hình chữ nhật có hai cạnh kề bằng nhau;',
            'Hình chữ nhật có hai đường chéo vuông góc với nhau;',
            'Hình chữ nhật có một đường chéo là đường phân giác của một góc;',
            'Hình thoi có một góc vuông;',
            'Hình thoi có hai đường chéo bằng nhau.',
          ],
        },
        {
          type: 'table',
          caption: 'Hình bình hành "leo" lên hình chữ nhật, hình thoi, hình vuông',
          head: ['Từ', 'Thêm điều kiện', 'Được'],
          rows: [
            ['Hình bình hành', 'một góc vuông, hoặc hai đường chéo bằng nhau', 'Hình chữ nhật'],
            [
              'Hình bình hành',
              'hai cạnh kề bằng nhau, hoặc hai đường chéo vuông góc, hoặc một đường chéo là phân giác của một góc',
              'Hình thoi',
            ],
            [
              'Hình chữ nhật',
              'hai cạnh kề bằng nhau, hoặc hai đường chéo vuông góc, hoặc một đường chéo là phân giác của một góc',
              'Hình vuông',
            ],
            ['Hình thoi', 'một góc vuông, hoặc hai đường chéo bằng nhau', 'Hình vuông'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Leo lên sơ đồ các tứ giác',
    instruction:
      'Kéo $B$ để đổi cạnh $AB$, kéo $D$ (hoặc chọn $D$ rồi dùng phím mũi tên) để đổi cạnh $AD$ và góc $A$. Hình luôn là hình bình hành. Hãy làm cho $AB = AD$ để được hình thoi: ba dòng đầu cùng đúng một lúc. Sau đó làm cho góc $A$ vuông để leo lên hình vuông.',
  },
  examples: [
    {
      problem:
        'Cho hình thoi $ABCD$ có $\\widehat{A} = 70^\\circ$, hai đường chéo cắt nhau tại $O$. Tính $\\widehat{OAB}$ và $\\widehat{OBA}$.',
      steps: [
        'Đường chéo $AC$ là tia phân giác của góc $A$: $\\widehat{OAB} = 70^\\circ : 2 = 35^\\circ$.',
        'Hai đường chéo của hình thoi vuông góc nên $\\widehat{AOB} = 90^\\circ$.',
        'Trong tam giác $OAB$: $\\widehat{OBA} = 180^\\circ - 90^\\circ - 35^\\circ = 55^\\circ$.',
      ],
      answer: '$\\widehat{OAB} = 35^\\circ$, $\\widehat{OBA} = 55^\\circ$.',
    },
    {
      problem: 'Cho hình thoi $ABCD$ có $AB = 5$ cm và $\\widehat{A} = 60^\\circ$. Tính $BD$.',
      steps: [
        'Hình thoi có bốn cạnh bằng nhau nên $AB = AD = 5$ cm: tam giác $ABD$ cân tại $A$.',
        'Tam giác cân có một góc $60^\\circ$ là tam giác đều.',
        'Do đó $BD = AB = 5$ cm.',
      ],
      answer: '$BD = 5$ cm.',
    },
    {
      problem:
        'Cho tam giác $ABC$ vuông tại $A$, tia phân giác của góc $A$ cắt $BC$ tại $D$. Kẻ $DE \\perp AB$ ($E \\in AB$) và $DF \\perp AC$ ($F \\in AC$). Chứng minh rằng $AEDF$ là hình vuông.',
      steps: [
        'Tứ giác $AEDF$ có $\\widehat{A} = \\widehat{E} = \\widehat{F} = 90^\\circ$, tức có ba góc vuông, nên là hình chữ nhật.',
        'Đường chéo $AD$ của hình chữ nhật $AEDF$ là tia phân giác của góc $A$.',
        'Hình chữ nhật có một đường chéo là đường phân giác của một góc là hình vuông.',
      ],
      answer: '$AEDF$ là hình vuông.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Một hình thoi có chu vi $24$ cm. Tính độ dài mỗi cạnh của hình thoi.',
      answer: 6,
      unit: 'cm',
      hints: ['Hình thoi có bốn cạnh bằng nhau.'],
      solution: 'Mỗi cạnh dài $24 : 4 = 6$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Hình thoi $ABCD$ có $\\widehat{ABC} = 120^\\circ$. Tính $\\widehat{BAC}$ (đơn vị độ).',
      answer: 30,
      unit: '°',
      hints: [
        'Hai góc kề một cạnh của hình bình hành bù nhau: tính $\\widehat{BAD}$.',
        'Đường chéo $AC$ là tia phân giác của góc $A$.',
      ],
      solution:
        '$\\widehat{BAD} = 180^\\circ - 120^\\circ = 60^\\circ$. $AC$ là tia phân giác của góc $A$ nên $\\widehat{BAC} = 60^\\circ : 2 = 30^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Hình thoi $ABCD$ có hai đường chéo cắt nhau tại $O$ và $\\widehat{OBA} = 50^\\circ$. Tính $\\widehat{BAD}$ (đơn vị độ).',
      answer: 80,
      unit: '°',
      hints: [
        'Hai đường chéo của hình thoi vuông góc: $\\widehat{AOB} = 90^\\circ$.',
        'Tính $\\widehat{OAB}$, rồi dùng $AC$ là tia phân giác của góc $A$.',
      ],
      solution:
        'Trong tam giác vuông $AOB$: $\\widehat{OAB} = 90^\\circ - 50^\\circ = 40^\\circ$. Vì $AC$ là tia phân giác của góc $A$ nên $\\widehat{BAD} = 2 \\cdot 40^\\circ = 80^\\circ$.',
    },
    {
      type: 'choice',
      prompt: 'Hình bình hành có hai đường chéo vuông góc với nhau là',
      options: ['hình chữ nhật.', 'hình thoi.', 'hình thang cân.', 'hình vuông.'],
      answer: 1,
      hints: ['Xem Định lí 2 về dấu hiệu nhận biết hình thoi.'],
      solution:
        'Theo Định lí 2b, hình bình hành có hai đường chéo vuông góc là hình thoi. Nó chỉ là hình vuông khi có thêm một góc vuông.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các tứ giác chắc chắn là hình vuông.',
      options: [
        'Hình chữ nhật có hai cạnh kề bằng nhau.',
        'Hình thoi có một góc vuông.',
        'Tứ giác có hai đường chéo vuông góc với nhau.',
        'Hình thoi có hai đường chéo bằng nhau.',
        'Tứ giác có bốn cạnh bằng nhau.',
        'Hình chữ nhật có hai đường chéo vuông góc với nhau.',
      ],
      answers: [0, 1, 3, 5],
      hints: [
        'Tứ giác có bốn cạnh bằng nhau là hình gì theo định nghĩa?',
        'Hình vuông phải vừa là hình chữ nhật, vừa là hình thoi.',
      ],
      solution:
        'Đúng theo Định lí 4: hình chữ nhật có hai cạnh kề bằng nhau, hình chữ nhật có hai đường chéo vuông góc, hình thoi có một góc vuông, hình thoi có hai đường chéo bằng nhau. Tứ giác có bốn cạnh bằng nhau chỉ là hình thoi; tứ giác có hai đường chéo vuông góc có thể chỉ là hình cánh diều.',
    },
    {
      type: 'number',
      prompt: 'Hình vuông $ABCD$ có hai đường chéo cắt nhau tại $O$ và $AC = 10$ cm. Tính $OB$.',
      answer: 5,
      unit: 'cm',
      hints: ['Hai đường chéo của hình vuông bằng nhau và cắt nhau tại trung điểm mỗi đường.'],
      solution: '$BD = AC = 10$ cm và $O$ là trung điểm của $BD$, nên $OB = 10 : 2 = 5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Hình vuông $ABCD$ có hai đường chéo cắt nhau tại $O$. Tính $\\widehat{OAB}$ (đơn vị độ).',
      answer: 45,
      unit: '°',
      hints: ['Đường chéo $AC$ là tia phân giác của góc $A$, mà $\\widehat{A} = 90^\\circ$.'],
      solution: '$\\widehat{OAB} = \\widehat{CAB} = 90^\\circ : 2 = 45^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Hình thoi $ABCD$ có $\\widehat{A} = 60^\\circ$ và cạnh $7$ cm. Tính đường chéo $BD$.',
      answer: 7,
      unit: 'cm',
      hints: [
        'Xét tam giác $ABD$: hai cạnh $AB$, $AD$ bằng nhau và góc xen giữa bằng $60^\\circ$.',
      ],
      solution:
        'Tam giác $ABD$ cân tại $A$ có $\\widehat{A} = 60^\\circ$ nên là tam giác đều: $BD = AB = 7$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Tứ giác có hai đường chéo cắt nhau tại trung điểm của mỗi đường và vuông góc với nhau là',
      options: ['hình thoi.', 'hình chữ nhật.', 'hình vuông.', 'hình thang cân.'],
      answer: 0,
      hints: [
        'Hai đường chéo cắt nhau tại trung điểm mỗi đường: tứ giác là hình gì?',
        'Thêm điều kiện hai đường chéo vuông góc.',
      ],
      solution:
        'Hai đường chéo cắt nhau tại trung điểm mỗi đường nên tứ giác là hình bình hành; hình bình hành có hai đường chéo vuông góc là hình thoi. Chưa biết hai đường chéo bằng nhau nên chưa chắc là hình vuông.',
    },
  ],
  takeaways: [
    'Hình thoi là tứ giác có bốn cạnh bằng nhau; hình vuông là tứ giác có bốn góc vuông và bốn cạnh bằng nhau.',
    'Trong hình thoi, hai đường chéo vuông góc và là các đường phân giác của các góc; hình vuông có thêm hai đường chéo bằng nhau.',
    'Hình bình hành có hai cạnh kề bằng nhau, hoặc hai đường chéo vuông góc, hoặc một đường chéo là phân giác của một góc là hình thoi.',
    'Hình chữ nhật thêm một điều kiện của hình thoi, hoặc hình thoi thêm một điều kiện của hình chữ nhật, là hình vuông.',
  ],
};
