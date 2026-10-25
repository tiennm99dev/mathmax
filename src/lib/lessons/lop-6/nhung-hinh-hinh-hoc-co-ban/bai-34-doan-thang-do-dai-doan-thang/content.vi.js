/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đoạn thẳng và hai đầu mút, độ dài đoạn thẳng và khoảng cách giữa hai điểm, đo và so sánh độ dài, cộng độ dài khi một điểm nằm giữa hai điểm.',
  intro:
    'Căng một sợi dây giữa hai chiếc đinh, em được hình ảnh của một đoạn thẳng: nó bắt đầu ở đinh này và dừng lại ở đinh kia, không kéo dài mãi như đường thẳng. Mỗi đoạn thẳng có một độ dài mà ta đo được bằng thước. Bài này giúp em đo, so sánh và cộng độ dài các đoạn thẳng.',
  objectives: [
    'Nhận biết đoạn thẳng, hai đầu mút của đoạn thẳng.',
    'Đo độ dài đoạn thẳng bằng thước; hiểu độ dài đoạn thẳng là khoảng cách giữa hai đầu mút.',
    'So sánh hai đoạn thẳng qua độ dài của chúng.',
    'Dùng đẳng thức $AM + MB = AB$ khi $M$ nằm giữa $A$ và $B$ để tính độ dài.',
  ],
  sections: [
    {
      heading: 'Đoạn thẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Đoạn thẳng $AB$ là hình gồm hai điểm $A$, $B$ và tất cả các điểm nằm giữa $A$ và $B$. Hai điểm $A$, $B$ gọi là hai đầu mút (hoặc hai mút) của đoạn thẳng $AB$.',
        },
        {
          type: 'p',
          text: 'Đoạn thẳng $AB$ còn gọi là đoạn thẳng $BA$. Để vẽ đoạn thẳng $AB$, ta đặt mép thước đi qua hai điểm $A$, $B$ rồi vạch theo mép thước từ $A$ đến $B$.',
        },
        {
          type: 'table',
          caption: 'Ba hình cùng nằm trên đường thẳng đi qua $A$ và $B$',
          head: ['Hình', 'Giới hạn', 'Cách gọi tên'],
          rows: [
            ['Đường thẳng $AB$', 'Không giới hạn về cả hai phía', 'Đường thẳng $AB$ hay $BA$'],
            ['Tia $AB$', 'Giới hạn ở gốc $A$, kéo dài mãi về phía $B$', 'Gốc viết trước: tia $AB$'],
            ['Đoạn thẳng $AB$', 'Giới hạn ở cả hai mút $A$ và $B$', 'Đoạn thẳng $AB$ hay $BA$'],
          ],
        },
      ],
    },
    {
      heading: 'Độ dài đoạn thẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Độ dài và khoảng cách',
          text: 'Mỗi đoạn thẳng có một độ dài. Độ dài đoạn thẳng là một số dương. Độ dài đoạn thẳng $AB$ cũng gọi là khoảng cách giữa hai điểm $A$ và $B$, kí hiệu $AB$; chẳng hạn $AB = 4$ cm.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt cạnh thước đi qua hai điểm $A$ và $B$, vạch số $0$ của thước trùng với điểm $A$.',
            'Đọc số chỉ của vạch trùng với điểm $B$: đó là độ dài đoạn thẳng $AB$.',
            'Nếu $A$ không ở vạch $0$, độ dài $AB$ bằng hiệu hai số chỉ ở $B$ và ở $A$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Nếu hai điểm $A$ và $B$ trùng nhau, ta nói khoảng cách giữa chúng bằng $0$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'So sánh hai đoạn thẳng',
          text: 'Ta so sánh hai đoạn thẳng bằng cách so sánh độ dài của chúng. Nếu $AB = CD$ thì hai đoạn thẳng $AB$ và $CD$ bằng nhau (có cùng độ dài); nếu $AB > CD$ thì đoạn $AB$ dài hơn đoạn $CD$; nếu $AB < CD$ thì đoạn $AB$ ngắn hơn đoạn $CD$.',
        },
      ],
    },
    {
      heading: 'Cộng độ dài đoạn thẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất',
          text: 'Nếu điểm $M$ nằm giữa hai điểm $A$ và $B$ thì $AM + MB = AB$.',
        },
        {
          type: 'p',
          text: 'Từ đó, khi $M$ nằm giữa $A$ và $B$, biết hai trong ba độ dài $AM$, $MB$, $AB$ thì tính được độ dài còn lại: $MB = AB - AM$, $AM = AB - MB$. Ngược lại, nếu $AM + MB \\ne AB$ thì điểm $M$ không nằm giữa $A$ và $B$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Nếu $M$ nằm giữa $A$ và $B$, $N$ nằm giữa $M$ và $B$ thì $AM + MN + NB = AB$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thước ảo',
    instruction:
      'Kéo hai điểm $A$, $B$ dọc mép thước để thay đổi đoạn thẳng $AB$; kéo điểm $M$ tự do. Khi đến gần mép thước, $M$ dính vào đường thẳng $AB$. Quan sát: chỉ khi $M$ nằm giữa $A$ và $B$ thì $AM + MB = AB$. Có thể chọn một điểm rồi dùng phím mũi tên, mỗi bước $1$ mm.',
  },
  examples: [
    {
      problem:
        'Đặt thước dọc theo đoạn thẳng $AB$ thì điểm $A$ trùng với vạch $1$ cm và điểm $B$ trùng với vạch $6{,}6$ cm. Tính độ dài đoạn thẳng $AB$.',
      steps: [
        'Vạch $0$ của thước không trùng với $A$, nên độ dài $AB$ bằng hiệu hai số chỉ.',
        '$AB = 6{,}6 - 1 = 5{,}6$ (cm).',
      ],
      answer: '$AB = 5{,}6$ cm.',
    },
    {
      problem: 'Điểm $M$ nằm giữa hai điểm $A$ và $B$, $AM = 3$ cm, $AB = 8$ cm. Tính $MB$.',
      steps: [
        '$M$ nằm giữa $A$ và $B$ nên $AM + MB = AB$.',
        'Thay số: $3 + MB = 8$.',
        '$MB = 8 - 3 = 5$ (cm).',
      ],
      answer: '$MB = 5$ cm.',
    },
    {
      problem:
        'Cho ba đoạn thẳng $AB = 4$ cm, $CD = 3{,}5$ cm, $EF = 40$ mm. So sánh các đoạn thẳng đó.',
      steps: ['Đổi về cùng đơn vị: $EF = 40$ mm $= 4$ cm.', 'So sánh độ dài: $4 = 4 > 3{,}5$.'],
      answer: '$AB = EF$; $AB > CD$ và $EF > CD$ (đoạn $CD$ ngắn nhất).',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đoạn thẳng $AB$ là hình gồm',
      options: [
        'hai điểm $A$ và $B$',
        'điểm $A$, điểm $B$ và tất cả các điểm nằm giữa $A$ và $B$',
        'tất cả các điểm nằm giữa $A$ và $B$',
        'tất cả các điểm của đường thẳng đi qua $A$ và $B$',
      ],
      answer: 1,
      hints: ['Đoạn thẳng có hai đầu mút; hai đầu mút có thuộc đoạn thẳng không?'],
      solution:
        'Đoạn thẳng $AB$ gồm hai điểm $A$, $B$ (hai đầu mút) và tất cả các điểm nằm giữa $A$ và $B$.',
    },
    {
      type: 'number',
      prompt:
        'Đặt thước dọc theo đoạn thẳng $AB$, điểm $A$ trùng với vạch $2$ cm, điểm $B$ trùng với vạch $9{,}5$ cm. Độ dài đoạn thẳng $AB$ là bao nhiêu xăng-ti-mét?',
      answer: 7.5,
      unit: 'cm',
      hints: ['Vạch $0$ không trùng với $A$: lấy số chỉ ở $B$ trừ số chỉ ở $A$.'],
      solution: '$AB = 9{,}5 - 2 = 7{,}5$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Điểm $M$ nằm giữa hai điểm $A$ và $B$, $AM = 3$ cm, $MB = 4{,}5$ cm. Tính độ dài đoạn thẳng $AB$ (cm).',
      answer: 7.5,
      unit: 'cm',
      hints: ['$M$ nằm giữa $A$ và $B$ thì $AM + MB = AB$.'],
      solution: '$AB = AM + MB = 3 + 4{,}5 = 7{,}5$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Điểm $M$ nằm giữa hai điểm $A$ và $B$, $AB = 10$ cm, $AM = 6{,}2$ cm. Tính $MB$ (cm).',
      answer: 3.8,
      unit: 'cm',
      hints: ['Từ $AM + MB = AB$ suy ra $MB = AB - AM$.'],
      solution: '$AM + MB = AB$ nên $MB = 10 - 6{,}2 = 3{,}8$ (cm).',
    },
    {
      type: 'choice',
      prompt: 'Cho $AB = 5$ cm, $CD = 48$ mm, $EF = 0{,}5$ dm. Khẳng định nào đúng?',
      options: ['$AB > EF > CD$', '$AB = EF > CD$', '$CD > AB = EF$', '$AB = CD = EF$'],
      answer: 1,
      hints: ['Đổi cả ba độ dài về xăng-ti-mét: $1$ dm $= 10$ cm, $1$ cm $= 10$ mm.'],
      solution:
        '$CD = 48$ mm $= 4{,}8$ cm, $EF = 0{,}5$ dm $= 5$ cm. Vậy $AB = EF = 5$ cm $> CD = 4{,}8$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Ba điểm $A$, $B$, $C$ thẳng hàng, $AB = 3$ cm, $BC = 5$ cm, $AC = 8$ cm. Điểm nào nằm giữa hai điểm còn lại?',
      options: ['Điểm $A$', 'Điểm $B$', 'Điểm $C$'],
      answer: 1,
      hints: ['Tìm hai độ dài có tổng bằng độ dài thứ ba.'],
      solution:
        '$AB + BC = 3 + 5 = 8 = AC$, nên điểm $B$ nằm giữa $A$ và $C$. (Với $A$ ở giữa thì phải có $BA + AC = BC$, tức $11 = 5$, sai; tương tự $C$ không ở giữa.)',
    },
    {
      type: 'choice',
      prompt:
        'Cho ba điểm $A$, $B$, $M$ với $AM = 2$ cm, $MB = 3$ cm, $AB = 6$ cm. Kết luận nào đúng?',
      options: [
        'Điểm $M$ nằm giữa $A$ và $B$',
        'Điểm $M$ không nằm giữa $A$ và $B$',
        'Điểm $M$ trùng với điểm $A$',
      ],
      answer: 1,
      hints: ['Nếu $M$ nằm giữa $A$ và $B$ thì $AM + MB$ phải bằng bao nhiêu?'],
      solution:
        '$AM + MB = 2 + 3 = 5 \\ne 6 = AB$, nên $M$ không nằm giữa $A$ và $B$. $M$ cũng không trùng $A$ vì $AM = 2$ cm $> 0$.',
    },
    {
      type: 'number',
      prompt:
        'Điểm $M$ nằm giữa $A$ và $B$, điểm $N$ nằm giữa $M$ và $B$. Biết $AM = 2$ cm, $MN = 3$ cm, $NB = 1{,}5$ cm. Tính $AB$ (cm).',
      answer: 6.5,
      unit: 'cm',
      hints: ['Bốn điểm theo thứ tự $A$, $M$, $N$, $B$: đoạn $AB$ được ghép từ ba đoạn nào?'],
      solution: '$AB = AM + MN + NB = 2 + 3 + 1{,}5 = 6{,}5$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Trên một đường thẳng lấy bốn điểm phân biệt. Có bao nhiêu đoạn thẳng có hai đầu mút là hai trong bốn điểm đó?',
      answer: 6,
      hints: ['Mỗi cặp điểm cho một đoạn thẳng. Liệt kê các cặp với bốn điểm $A$, $B$, $C$, $D$.'],
      solution:
        'Các đoạn thẳng là $AB$, $AC$, $AD$, $BC$, $BD$, $CD$: có $6$ đoạn thẳng (đoạn $AB$ và đoạn $BA$ là một).',
    },
  ],
  takeaways: [
    'Đoạn thẳng $AB$ gồm hai mút $A$, $B$ và mọi điểm nằm giữa $A$ và $B$.',
    'Độ dài đoạn thẳng là một số dương, cũng là khoảng cách giữa hai mút; hai điểm trùng nhau thì khoảng cách bằng $0$.',
    'So sánh hai đoạn thẳng bằng cách so sánh độ dài (đổi về cùng đơn vị).',
    '$M$ nằm giữa $A$ và $B$ thì $AM + MB = AB$; nếu $AM + MB \\ne AB$ thì $M$ không nằm giữa $A$ và $B$.',
  ],
};
