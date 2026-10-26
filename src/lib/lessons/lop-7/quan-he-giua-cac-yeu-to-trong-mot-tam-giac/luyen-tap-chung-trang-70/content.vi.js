/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về quan hệ giữa góc và cạnh đối diện, đường vuông góc và đường xiên, và bất đẳng thức tam giác.',
  intro:
    'Bài luyện tập này ôn lại Bài 31 (Quan hệ giữa góc và cạnh đối diện trong một tam giác), Bài 32 (Quan hệ giữa đường vuông góc và đường xiên) và Bài 33 (Quan hệ giữa ba cạnh của một tam giác). Em sẽ so sánh góc và cạnh, tìm khoảng cách từ một điểm đến một đường thẳng và kiểm tra ba độ dài có tạo thành tam giác hay không.',
  objectives: [
    'So sánh các góc khi biết các cạnh của tam giác, và ngược lại.',
    'Nhận ra đường vuông góc, đường xiên và tìm khoảng cách từ một điểm đến một đường thẳng.',
    'Dùng bất đẳng thức tam giác để kiểm tra ba độ dài và tìm khoảng giá trị của một cạnh.',
  ],
  sections: [
    {
      heading: 'Nhắc lại kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Góc và cạnh đối diện',
              'Trong một tam giác, góc đối diện với cạnh lớn hơn là góc lớn hơn; cạnh đối diện với góc lớn hơn là cạnh lớn hơn.',
            ],
            [
              'Tam giác vuông, tam giác tù',
              'Cạnh đối diện với góc vuông (góc tù) là cạnh lớn nhất.',
            ],
            [
              'Đường vuông góc và đường xiên',
              'Từ một điểm nằm ngoài đường thẳng, đường vuông góc ngắn hơn mọi đường xiên.',
            ],
            [
              'Khoảng cách',
              'Khoảng cách từ $A$ đến đường thẳng $d$ là độ dài đường vuông góc $AH$.',
            ],
            [
              'Bất đẳng thức tam giác',
              '$AC - AB < BC < AC + AB$ (với $AC \\ge AB$); chỉ cần so sánh cạnh lớn nhất với tổng hai cạnh kia.',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Mẹo làm bài',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Muốn so sánh hai góc, tìm hai cạnh đối diện với chúng rồi so sánh hai cạnh đó (và ngược lại).',
            'Khi chỉ biết hai góc, tính góc thứ ba bằng định lí tổng ba góc trước khi so sánh.',
            'Muốn tìm khoảng cách từ một điểm đến một đường thẳng, tìm đoạn vuông góc kẻ từ điểm đó.',
            'Với bài tìm cạnh nguyên, viết khoảng $|b - c| < a < b + c$ rồi đếm hoặc chọn số nguyên thỏa mãn thêm điều kiện của đề.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Góc đối diện với cạnh $BC$ là góc $A$, không phải góc $B$ hay góc $C$. Và bất đẳng thức tam giác không có dấu bằng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện trộn ngẫu nhiên',
    instruction:
      'Mỗi lượt có 12 câu trộn ngẫu nhiên về góc và cạnh đối diện, đường vuông góc và đường xiên, và bất đẳng thức tam giác. Nhập một số tự nhiên: số đo góc bằng độ, độ dài bằng xăng-ti-mét hoặc một số lượng. Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng tô màu từng dạng bài theo kết quả lần làm đầu.',
  },
  examples: [
    {
      problem:
        'Tam giác $ABC$ có $AB = 4$ cm, $AC = 9$ cm và độ dài $BC$ là số chẵn lớn nhất có thể (xăng-ti-mét). Tính $BC$ rồi so sánh các góc của tam giác.',
      steps: [
        'Bất đẳng thức tam giác: $9 - 4 < BC < 9 + 4$, tức $5 < BC < 13$.',
        'Số chẵn lớn nhất nhỏ hơn $13$ là $12$, nên $BC = 12$ cm.',
        'Ta có $BC > AC > AB$ ($12 > 9 > 4$). Góc đối diện với $BC$, $AC$, $AB$ lần lượt là $\\widehat{A}$, $\\widehat{B}$, $\\widehat{C}$.',
        'Vậy $\\widehat{A} > \\widehat{B} > \\widehat{C}$.',
      ],
      answer: '$BC = 12$ cm và $\\widehat{A} > \\widehat{B} > \\widehat{C}$.',
    },
    {
      problem:
        'Tam giác $ABC$ nhọn, $AH$ vuông góc với $BC$ tại $H$. Chứng minh $AH < \\dfrac{AB + AC}{2}$.',
      steps: [
        '$AH$ là đường vuông góc, $AB$ là đường xiên kẻ từ $A$ đến đường thẳng $BC$ ($H \\ne B$ vì góc $B$ nhọn), nên $AH < AB$.',
        'Tương tự, $H \\ne C$ nên $AH < AC$.',
        'Cộng hai bất đẳng thức: $2AH < AB + AC$, suy ra $AH < \\dfrac{AB + AC}{2}$.',
      ],
      answer: '$AH < \\dfrac{AB + AC}{2}$.',
    },
    {
      problem:
        'Điểm $M$ nằm bên trong tam giác $ABC$. Tia $BM$ cắt cạnh $AC$ tại $D$. Chứng minh $MB + MC < AB + AC$.',
      steps: [
        'Trong tam giác $MDC$: $MC < MD + DC$. Cộng $MB$ vào hai vế: $MB + MC < MB + MD + DC = BD + DC$.',
        'Trong tam giác $ABD$: $BD < AB + AD$. Cộng $DC$ vào hai vế: $BD + DC < AB + AD + DC = AB + AC$.',
        'Từ hai bất đẳng thức trên suy ra $MB + MC < AB + AC$.',
      ],
      answer: '$MB + MC < AB + AC$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Tam giác $ABC$ có $AB = 6$ cm, $BC = 4$ cm, $CA = 5$ cm. Góc nhỏ nhất của tam giác là',
      options: ['$\\widehat{A}$', '$\\widehat{B}$', '$\\widehat{C}$'],
      answer: 0,
      hints: ['Góc nhỏ nhất đối diện với cạnh nhỏ nhất.'],
      solution:
        'Cạnh nhỏ nhất là $BC = 4$ cm; góc đối diện với $BC$ là $\\widehat{A}$. Vậy $\\widehat{A}$ là góc nhỏ nhất.',
    },
    {
      type: 'order',
      prompt:
        'Tam giác $MNP$ có $\\widehat{M} = 70^\\circ$, $\\widehat{N} = 50^\\circ$. Sắp xếp ba cạnh theo thứ tự độ dài từ nhỏ đến lớn.',
      items: ['$MN$', '$NP$', '$MP$'],
      answer: [2, 0, 1],
      hints: ['Tính $\\widehat{P}$.', 'Cạnh đối diện với góc nhỏ hơn thì nhỏ hơn.'],
      solution:
        '$\\widehat{P} = 180^\\circ - 70^\\circ - 50^\\circ = 60^\\circ$, nên $\\widehat{N} < \\widehat{P} < \\widehat{M}$. Cạnh đối diện lần lượt là $MP$, $MN$, $NP$, nên $MP < MN < NP$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $\\widehat{B} = 45^\\circ$, $\\widehat{C} = 35^\\circ$. Góc đối diện với cạnh lớn nhất có số đo bao nhiêu độ?',
      answer: 100,
      unit: '°',
      hints: ['Tính góc còn lại rồi tìm góc lớn nhất.'],
      solution:
        '$\\widehat{A} = 180^\\circ - 45^\\circ - 35^\\circ = 100^\\circ$ là góc lớn nhất; nó đối diện với cạnh lớn nhất $BC$.',
    },
    {
      type: 'choice',
      prompt: 'Tam giác $ABC$ có $AB = BC = 5$ cm, $AC = 7$ cm. Khẳng định nào sau đây đúng?',
      options: [
        '$\\widehat{A} = \\widehat{C} < \\widehat{B}$',
        '$\\widehat{A} = \\widehat{C} > \\widehat{B}$',
        '$\\widehat{A} = \\widehat{B} < \\widehat{C}$',
        '$\\widehat{A} < \\widehat{C} < \\widehat{B}$',
      ],
      answer: 0,
      hints: ['$AB = BC$: tam giác cân tại đỉnh nào?', 'Cạnh lớn nhất $AC$ đối diện góc nào?'],
      solution:
        '$AB = BC$ nên tam giác cân tại $B$ và $\\widehat{A} = \\widehat{C}$. Cạnh $AC = 7$ cm lớn nhất nên góc đối diện $\\widehat{B}$ lớn nhất. Vậy $\\widehat{A} = \\widehat{C} < \\widehat{B}$.',
    },
    {
      type: 'choice',
      prompt: 'Tam giác $ABC$ vuông tại $A$. Khoảng cách từ $C$ đến đường thẳng $AB$ bằng',
      options: ['$CA$', '$CB$', '$AB$', '$\\dfrac{BC}{2}$'],
      answer: 0,
      hints: ['Từ $C$, đoạn nào vuông góc với đường thẳng $AB$?'],
      solution:
        '$CA \\perp AB$ tại $A$ nên $CA$ là đường vuông góc kẻ từ $C$ đến $AB$. Khoảng cách bằng $CA$; còn $CB$ là đường xiên.',
    },
    {
      type: 'choice',
      prompt: 'Tam giác $ABC$ nhọn, $AH$ vuông góc với $BC$ tại $H$. Khẳng định nào sau đây đúng?',
      options: ['$AH < AB$', '$AH > AB$', '$AH = AC$', '$AH > AC$'],
      answer: 0,
      hints: ['$AB$ là đường xiên hay đường vuông góc kẻ từ $A$ đến $BC$?'],
      solution:
        '$H$ khác $B$ (vì góc $B$ nhọn) nên $AB$ là đường xiên, $AH$ là đường vuông góc kẻ từ $A$ đến $BC$. Do đó $AH < AB$ (và tương tự $AH < AC$).',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các bộ ba độ dài là độ dài ba cạnh của một tam giác.',
      options: [
        '$1$ cm, $1$ cm, $2$ cm',
        '$2$ cm, $4$ cm, $5$ cm',
        '$3$ cm, $3$ cm, $5$ cm',
        '$2$ cm, $5$ cm, $8$ cm',
      ],
      answers: [1, 2],
      hints: ['So sánh độ dài lớn nhất với tổng hai độ dài còn lại.'],
      solution: '$2 = 1 + 1$: không; $5 < 2 + 4$: có; $5 < 3 + 3$: có; $8 > 2 + 5$: không.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AB = 3$ cm, $AC = 8$ cm và độ dài $BC$ là một số nguyên chia hết cho $4$ (xăng-ti-mét). Tính $BC$.',
      answer: 8,
      unit: 'cm',
      hints: ['Tìm khoảng chứa $BC$ bằng bất đẳng thức tam giác.'],
      solution:
        '$8 - 3 < BC < 8 + 3$, tức $5 < BC < 11$. Số nguyên chia hết cho $4$ trong khoảng này chỉ có $8$. Vậy $BC = 8$ cm.',
    },
    {
      type: 'number',
      prompt: 'Một tam giác cân có hai cạnh dài $5$ cm và $11$ cm. Tính chu vi của tam giác đó.',
      answer: 27,
      unit: 'cm',
      hints: ['Bộ $5$, $5$, $11$ có thỏa mãn bất đẳng thức tam giác không?'],
      solution:
        '$11 > 5 + 5$ nên cạnh bên không thể dài $5$ cm. Ba cạnh là $11$, $11$, $5$ và chu vi bằng $11 + 11 + 5 = 27$ cm.',
    },
    {
      type: 'text',
      prompt:
        'Tam giác $ABC$ có $\\widehat{A} = 120^\\circ$. Cạnh lớn nhất của tam giác là cạnh nào?',
      accept: ['BC', 'CB'],
      hints: ['Góc tù là góc lớn nhất của tam giác.'],
      solution:
        '$\\widehat{A}$ tù nên là góc lớn nhất; cạnh đối diện với nó là $BC$, nên $BC$ là cạnh lớn nhất.',
    },
    {
      type: 'choice',
      prompt:
        'Làng $A$ cách làng $B$ là $5$ km, làng $B$ cách làng $C$ là $3$ km. Khoảng cách giữa làng $A$ và làng $C$ có thể bằng $9$ km không?',
      options: ['Có', 'Không'],
      answer: 1,
      hints: ['Dù ba làng có thẳng hàng hay không, $AC \\le AB + BC$.'],
      solution:
        'Nếu $A$, $B$, $C$ là ba đỉnh của một tam giác thì $AC < AB + BC = 8$ km; nếu thẳng hàng thì $AC \\le 8$ km. Vậy $AC$ không thể bằng $9$ km.',
    },
  ],
  takeaways: [
    'Trong tam giác, cạnh lớn hơn đối diện góc lớn hơn và ngược lại.',
    'Đường vuông góc là đường ngắn nhất từ một điểm đến một đường thẳng; độ dài của nó là khoảng cách.',
    'Ba độ dài là ba cạnh của một tam giác khi độ dài lớn nhất nhỏ hơn tổng hai độ dài còn lại.',
  ],
};
