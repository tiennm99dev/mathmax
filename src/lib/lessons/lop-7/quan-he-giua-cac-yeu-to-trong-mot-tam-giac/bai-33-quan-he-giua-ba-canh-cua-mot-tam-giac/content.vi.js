/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bất đẳng thức tam giác: tổng hai cạnh bất kì lớn hơn cạnh còn lại, hiệu hai cạnh bất kì nhỏ hơn cạnh còn lại, và cách kiểm tra ba đoạn thẳng có ghép được thành tam giác hay không.',
  intro:
    'Bạn Mai có ba que tính dài $2$ cm, $3$ cm và $6$ cm. Dù xoay thế nào, Mai cũng không ghép được ba que thành một tam giác. Còn ba que $3$ cm, $4$ cm, $5$ cm thì ghép được ngay. Điều gì quyết định ba đoạn thẳng có tạo thành tam giác hay không?',
  objectives: [
    'Phát biểu bất đẳng thức tam giác và hệ quả về hiệu hai cạnh.',
    'Kiểm tra ba độ dài cho trước có phải là độ dài ba cạnh của một tam giác hay không.',
    'Tìm khoảng giá trị của một cạnh khi biết hai cạnh còn lại.',
  ],
  sections: [
    {
      heading: 'Bất đẳng thức tam giác',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Trong một tam giác, tổng độ dài hai cạnh bất kì bao giờ cũng lớn hơn độ dài cạnh còn lại.',
        },
        {
          type: 'tex',
          tex: 'AB + AC > BC, \\qquad AB + BC > AC, \\qquad AC + BC > AB',
        },
        {
          type: 'p',
          text: 'Ba bất đẳng thức trên gọi là các bất đẳng thức tam giác.',
        },
        {
          type: 'p',
          text: 'Chứng minh $AB + AC > BC$: trên tia đối của tia $AB$ lấy điểm $D$ sao cho $AD = AC$. Khi đó $BD = AB + AD = AB + AC$. Tam giác $ACD$ cân tại $A$ nên $\\widehat{ACD} = \\widehat{ADC}$. Tia $CA$ nằm giữa hai tia $CB$ và $CD$ nên $\\widehat{BCD} > \\widehat{ACD} = \\widehat{BDC}$. Trong tam giác $BCD$, cạnh đối diện với góc lớn hơn là cạnh lớn hơn (Bài 31), nên $BD > BC$, tức là $AB + AC > BC$. Hai bất đẳng thức còn lại chứng minh tương tự.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hệ quả',
          text: 'Trong một tam giác, hiệu độ dài hai cạnh bất kì bao giờ cũng nhỏ hơn độ dài cạnh còn lại.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn, từ $AB + BC > AC$ suy ra $AC - AB < BC$. Gộp lại, với tam giác $ABC$ có $AC \\ge AB$:',
        },
        { type: 'tex', tex: 'AC - AB < BC < AC + AB' },
      ],
    },
    {
      heading: 'Điều kiện để ba đoạn thẳng là ba cạnh của một tam giác',
      blocks: [
        {
          type: 'p',
          text: 'Ba độ dài là độ dài ba cạnh của một tam giác khi và chỉ khi chúng thỏa mãn cả ba bất đẳng thức tam giác. Khi đó ta vẽ được tam giác bằng thước và compa như đã học (trường hợp cạnh – cạnh – cạnh).',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Khi xét ba độ dài có thỏa mãn bất đẳng thức tam giác hay không, ta chỉ cần so sánh độ dài lớn nhất với tổng hai độ dài còn lại. Nếu độ dài lớn nhất nhỏ hơn tổng đó thì hai bất đẳng thức kia tự động đúng.',
        },
        {
          type: 'table',
          head: ['Ba độ dài (cm)', 'Lớn nhất so với tổng hai độ dài kia', 'Kết luận'],
          rows: [
            ['$3;\\ 4;\\ 5$', '$5 < 3 + 4 = 7$', 'Là ba cạnh của một tam giác'],
            ['$2;\\ 3;\\ 6$', '$6 > 2 + 3 = 5$', 'Không là ba cạnh của tam giác'],
            ['$2;\\ 3;\\ 5$', '$5 = 2 + 3$', 'Không là ba cạnh của tam giác (ba điểm thẳng hàng)'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Bất đẳng thức tam giác là bất đẳng thức chặt: nếu độ dài lớn nhất bằng tổng hai độ dài kia thì không có tam giác, ba điểm nằm trên một đường thẳng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ghép ba que thành tam giác',
    instruction:
      'Chỉnh độ dài ba que $BC$, $CA$, $AB$ bằng thanh trượt hoặc chọn một bộ có sẵn. Que $AB$ quay quanh $B$, que $CA$ quay quanh $C$; đỉnh $A$ chỉ có khi hai đường tròn cắt nhau. Theo dõi ba bất đẳng thức tam giác và tìm xem khi nào chỉ cần một bất đẳng thức sai là không ghép được.',
  },
  examples: [
    {
      problem:
        'Bộ ba độ dài nào sau đây là độ dài ba cạnh của một tam giác? a) $2$ cm, $3$ cm, $4$ cm; b) $1$ cm, $2$ cm, $3{,}5$ cm; c) $3$ cm, $4$ cm, $7$ cm.',
      steps: [
        'a) Độ dài lớn nhất là $4$ cm và $4 < 2 + 3 = 5$: là ba cạnh của một tam giác.',
        'b) Độ dài lớn nhất là $3{,}5$ cm và $3{,}5 > 1 + 2 = 3$: không phải.',
        'c) Độ dài lớn nhất là $7$ cm và $7 = 3 + 4$: không phải (bất đẳng thức tam giác không cho phép dấu bằng).',
      ],
      answer: 'Chỉ bộ a) là độ dài ba cạnh của một tam giác.',
    },
    {
      problem:
        'Tam giác $ABC$ có $AB = 1$ cm, $AC = 7$ cm và độ dài $BC$ là một số nguyên (xăng-ti-mét). Tính $BC$ và cho biết tam giác $ABC$ là tam giác gì.',
      steps: [
        'Theo bất đẳng thức tam giác và hệ quả: $AC - AB < BC < AC + AB$, tức là $6 < BC < 8$.',
        '$BC$ là số nguyên nên $BC = 7$ cm.',
        'Khi đó $BC = AC = 7$ cm nên tam giác $ABC$ cân tại $C$.',
      ],
      answer: '$BC = 7$ cm; tam giác $ABC$ cân tại $C$.',
    },
    {
      problem: 'Một tam giác cân có hai cạnh dài $3$ cm và $7$ cm. Tính chu vi của tam giác đó.',
      steps: [
        'Nếu cạnh bên dài $3$ cm thì ba cạnh là $3$, $3$, $7$; nhưng $7 > 3 + 3 = 6$, không thỏa mãn bất đẳng thức tam giác.',
        'Vậy cạnh bên dài $7$ cm, ba cạnh là $7$, $7$, $3$; kiểm tra: $7 < 7 + 3$, thỏa mãn.',
        'Chu vi bằng $7 + 7 + 3 = 17$ (cm).',
      ],
      answer: 'Chu vi bằng $17$ cm.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn tất cả các bộ ba độ dài là độ dài ba cạnh của một tam giác.',
      options: [
        '$2$ cm, $3$ cm, $6$ cm',
        '$3$ cm, $4$ cm, $5$ cm',
        '$4$ cm, $5$ cm, $9$ cm',
        '$5$ cm, $6$ cm, $10$ cm',
      ],
      answers: [1, 3],
      hints: ['Với mỗi bộ, so sánh độ dài lớn nhất với tổng hai độ dài còn lại.'],
      solution: '$6 > 2 + 3$: không; $5 < 3 + 4$: có; $9 = 4 + 5$: không; $10 < 5 + 6$: có.',
    },
    {
      type: 'choice',
      prompt: 'Một tam giác có hai cạnh dài $2$ cm và $6$ cm. Độ dài cạnh thứ ba có thể là',
      options: ['$3$ cm', '$4$ cm', '$7$ cm', '$8$ cm'],
      answer: 2,
      hints: ['Cạnh thứ ba lớn hơn hiệu và nhỏ hơn tổng hai cạnh đã biết.'],
      solution:
        'Cạnh thứ ba $x$ thỏa mãn $6 - 2 < x < 6 + 2$, tức $4 < x < 8$. Trong các đáp án chỉ có $7$ cm thỏa mãn ($4$ cm và $8$ cm bằng đúng hai đầu mút nên bị loại).',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AB = 2$ cm, $AC = 9$ cm và độ dài $BC$ là một số nguyên (xăng-ti-mét). Tam giác $ABC$ cân. Tính $BC$.',
      answer: 9,
      unit: 'cm',
      hints: [
        'Tìm khoảng chứa $BC$: $AC - AB < BC < AC + AB$.',
        'Tam giác cân thì $BC$ bằng một trong hai cạnh kia.',
      ],
      solution:
        '$9 - 2 < BC < 9 + 2$, tức $7 < BC < 11$. Tam giác cân nên $BC = AB = 2$ hoặc $BC = AC = 9$; chỉ $BC = 9$ cm nằm trong khoảng trên.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AB = 4$ cm, $AC = 7$ cm. Có bao nhiêu giá trị nguyên (xăng-ti-mét) của độ dài $BC$?',
      answer: 7,
      hints: ['$7 - 4 < BC < 7 + 4$.', 'Đếm các số nguyên lớn hơn $3$ và nhỏ hơn $11$.'],
      solution: '$3 < BC < 11$, nên $BC \\in \\{4; 5; 6; 7; 8; 9; 10\\}$: có $7$ giá trị.',
    },
    {
      type: 'number',
      prompt: 'Một tam giác cân có hai cạnh dài $4$ cm và $9$ cm. Tính chu vi của tam giác đó.',
      answer: 22,
      unit: 'cm',
      hints: [
        'Thử hai khả năng: cạnh bên dài $4$ cm hoặc cạnh bên dài $9$ cm.',
        'Bộ $4$, $4$, $9$ có thỏa mãn bất đẳng thức tam giác không?',
      ],
      solution:
        'Bộ $4$, $4$, $9$ không thỏa mãn vì $9 > 4 + 4$. Vậy ba cạnh là $9$, $9$, $4$ ($9 < 9 + 4$) và chu vi bằng $9 + 9 + 4 = 22$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Ba điểm $A$, $B$, $C$ có $AB = 3$ cm, $BC = 5$ cm, $AC = 8$ cm. Khẳng định nào sau đây đúng?',
      options: [
        '$A$, $B$, $C$ là ba đỉnh của một tam giác',
        '$B$ nằm giữa $A$ và $C$',
        '$A$ nằm giữa $B$ và $C$',
        '$C$ nằm giữa $A$ và $B$',
      ],
      answer: 1,
      hints: ['So sánh $AB + BC$ với $AC$.'],
      solution:
        '$AB + BC = 3 + 5 = 8 = AC$: không thỏa mãn bất đẳng thức tam giác, nên $A$, $B$, $C$ thẳng hàng và $B$ nằm giữa $A$ và $C$.',
    },
    {
      type: 'text',
      prompt:
        'Điền vào chỗ trống: trong một tam giác, hiệu độ dài hai cạnh bất kì bao giờ cũng … độ dài cạnh còn lại.',
      accept: ['nhỏ hơn', 'bé hơn'],
      hints: ['Đây là hệ quả của bất đẳng thức tam giác.'],
      solution:
        'Hiệu độ dài hai cạnh bất kì bao giờ cũng nhỏ hơn độ dài cạnh còn lại; ví dụ $AC - AB < BC$ suy ra từ $AB + BC > AC$.',
    },
    {
      type: 'choice',
      prompt:
        'Tại thành phố $C$ có một trạm phát sóng với bán kính phủ sóng $60$ km. Thành phố $A$ cách $C$ là $30$ km và cách thành phố $B$ là $100$ km. Thành phố $B$ có nhận được sóng của trạm không?',
      options: ['Có', 'Không', 'Chưa đủ dữ kiện để kết luận'],
      answer: 1,
      hints: [
        'Dùng hệ quả: $BC \\ge AB - AC$ (dấu bằng khi $A$, $B$, $C$ thẳng hàng).',
        'So sánh $AB - AC$ với $60$ km.',
      ],
      solution:
        'Nếu $A$, $B$, $C$ là ba đỉnh của một tam giác thì $BC > AB - AC = 100 - 30 = 70$ (km); nếu chúng thẳng hàng thì $BC \\ge 70$ km. Trong mọi trường hợp $BC \\ge 70 > 60$, nên $B$ không nhận được sóng.',
    },
  ],
  takeaways: [
    'Trong tam giác $ABC$: $AB + AC > BC$, $AB + BC > AC$, $AC + BC > AB$.',
    'Hiệu hai cạnh bất kì nhỏ hơn cạnh còn lại: $AC - AB < BC < AC + AB$.',
    'Ba độ dài là ba cạnh của một tam giác khi độ dài lớn nhất nhỏ hơn tổng hai độ dài còn lại.',
  ],
};
