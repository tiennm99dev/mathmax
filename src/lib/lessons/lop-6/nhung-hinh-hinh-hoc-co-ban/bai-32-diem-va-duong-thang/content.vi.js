/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Điểm và đường thẳng: điểm thuộc và không thuộc đường thẳng, đường thẳng đi qua hai điểm, ba điểm thẳng hàng, hai đường thẳng cắt nhau và song song.',
  intro:
    'Một vết mực nhỏ trên trang giấy, một ngôi sao nhìn từ xa gợi cho ta hình ảnh của điểm. Sợi chỉ căng thẳng, mép thước kẻ gợi cho ta hình ảnh của đường thẳng. Điểm và đường thẳng là hai hình cơ bản nhất của hình học: mọi hình khác đều được tạo nên từ chúng.',
  objectives: [
    'Nhận biết điểm thuộc, không thuộc đường thẳng và dùng đúng kí hiệu $\\in$, $\\notin$.',
    'Biết có một và chỉ một đường thẳng đi qua hai điểm phân biệt.',
    'Nhận biết ba điểm thẳng hàng, ba điểm không thẳng hàng.',
    'Nhận biết hai đường thẳng cắt nhau, song song và giao điểm của hai đường thẳng cắt nhau.',
  ],
  sections: [
    {
      heading: 'Điểm, đường thẳng',
      blocks: [
        {
          type: 'p',
          text: 'Ta dùng một dấu chấm nhỏ để biểu diễn một điểm và dùng chữ cái in hoa để đặt tên cho điểm: điểm $A$, điểm $B$, điểm $M$. Ta dùng nét bút vạch theo mép thước để biểu diễn một đường thẳng và dùng chữ cái in thường để đặt tên cho nó: đường thẳng $a$, đường thẳng $d$. Đường thẳng không bị giới hạn về hai phía.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Điểm thuộc đường thẳng',
          text: 'Nếu điểm $A$ nằm trên đường thẳng $d$, ta nói điểm $A$ thuộc đường thẳng $d$ (hay đường thẳng $d$ đi qua điểm $A$), kí hiệu $A \\in d$. Nếu điểm $B$ không nằm trên $d$, ta nói $B$ không thuộc $d$ (hay $d$ không đi qua $B$), kí hiệu $B \\notin d$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhận xét',
          text: 'Có một và chỉ một đường thẳng đi qua hai điểm phân biệt $A$ và $B$. Đường thẳng đó được gọi là đường thẳng $AB$ (hay đường thẳng $BA$).',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Khi nói "hai điểm", "ba điểm" mà không nói gì thêm, ta hiểu đó là các điểm phân biệt, tức là không có hai điểm nào trùng nhau.',
        },
      ],
    },
    {
      heading: 'Ba điểm thẳng hàng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Khi ba điểm cùng thuộc một đường thẳng, ta nói chúng thẳng hàng. Khi ba điểm không cùng thuộc bất kì đường thẳng nào, ta nói chúng không thẳng hàng.',
        },
        {
          type: 'p',
          text: 'Để kiểm tra ba điểm $A$, $B$, $C$ có thẳng hàng hay không, ta đặt mép thước đi qua hai điểm $A$ và $B$ rồi xem điểm $C$ có nằm trên mép thước không. Nói cách khác: $A$, $B$, $C$ thẳng hàng khi và chỉ khi $C$ thuộc đường thẳng $AB$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Trong thực tế, người ta dùng cách "ngắm" để trồng cây hay cắm cọc thẳng hàng: đứng ở cột thứ nhất mà nhìn thấy cột thứ ba bị cột thứ hai che khuất thì ba cột thẳng hàng.',
        },
      ],
    },
    {
      heading: 'Hai đường thẳng cắt nhau, song song',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Hai đường thẳng chỉ có một điểm chung gọi là hai đường thẳng cắt nhau; điểm chung đó gọi là giao điểm của hai đường thẳng. Hai đường thẳng không có điểm chung nào gọi là hai đường thẳng song song.',
        },
        {
          type: 'table',
          caption: 'Vị trí của hai đường thẳng $a$ và $b$',
          head: ['Vị trí', 'Số điểm chung', 'Ví dụ'],
          rows: [
            ['Cắt nhau', 'Đúng một (giao điểm)', 'Hai cạnh kề của một tờ giấy hình chữ nhật'],
            ['Song song', 'Không có', 'Hai mép đối diện của một tờ giấy hình chữ nhật'],
            ['Trùng nhau', 'Vô số (mọi điểm)', 'Đường thẳng $AB$ và đường thẳng $BA$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Nếu hai đường thẳng có hai điểm chung phân biệt thì chúng trùng nhau, vì qua hai điểm chỉ có một đường thẳng. Vậy hai đường thẳng phân biệt hoặc cắt nhau, hoặc song song.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng vẽ điểm và đường thẳng',
    instruction:
      'Kéo bốn điểm $A$, $B$, $C$, $D$ trên lưới (hoặc chọn một điểm rồi dùng phím mũi tên). Bảng vẽ cho biết ba điểm $A$, $B$, $C$ có thẳng hàng không và hai đường thẳng $AB$, $CD$ cắt nhau, song song hay trùng nhau. Hãy hoàn thành ba thử thách.',
  },
  examples: [
    {
      problem:
        'Cho bốn điểm $A$, $B$, $C$, $D$, trong đó không có ba điểm nào thẳng hàng. Kẻ các đường thẳng đi qua từng cặp điểm. Có tất cả bao nhiêu đường thẳng? Kể tên chúng.',
      steps: [
        'Qua mỗi cặp điểm phân biệt có đúng một đường thẳng. Vì không có ba điểm nào thẳng hàng nên hai cặp điểm khác nhau cho hai đường thẳng khác nhau.',
        'Ghép điểm $A$ với ba điểm còn lại: $AB$, $AC$, $AD$.',
        'Ghép điểm $B$ với $C$, $D$ (cặp $BA$ đã kể): $BC$, $BD$.',
        'Ghép $C$ với $D$: $CD$.',
      ],
      answer: 'Có $6$ đường thẳng: $AB$, $AC$, $AD$, $BC$, $BD$, $CD$.',
    },
    {
      problem:
        'Ba điểm $A$, $B$, $C$ cùng thuộc đường thẳng $d$; điểm $D \\notin d$. Kể tên các bộ ba điểm thẳng hàng và các bộ ba điểm không thẳng hàng trong bốn điểm đó.',
      steps: [
        'Từ bốn điểm có bốn bộ ba: $(A, B, C)$, $(A, B, D)$, $(A, C, D)$, $(B, C, D)$.',
        '$A$, $B$, $C$ cùng thuộc $d$ nên thẳng hàng.',
        'Đường thẳng đi qua hai trong ba điểm $A$, $B$, $C$ chính là $d$, mà $D \\notin d$. Vậy mỗi bộ ba có chứa $D$ đều không thẳng hàng.',
      ],
      answer:
        'Thẳng hàng: $A$, $B$, $C$. Không thẳng hàng: $A$, $B$, $D$; $A$, $C$, $D$; $B$, $C$, $D$.',
    },
    {
      problem:
        'Cho hình chữ nhật $ABCD$. Xét vị trí của các cặp đường thẳng: $AB$ và $CD$; $AB$ và $BC$. Nếu chúng cắt nhau, tìm giao điểm.',
      steps: [
        'Hai cạnh đối $AB$ và $CD$ của hình chữ nhật kéo dài mãi cũng không gặp nhau, nên hai đường thẳng $AB$ và $CD$ không có điểm chung.',
        'Hai đường thẳng $AB$ và $BC$ cùng đi qua $B$ và không trùng nhau (vì $C \\notin AB$), nên chúng chỉ có một điểm chung là $B$.',
      ],
      answer: '$AB$ và $CD$ song song; $AB$ và $BC$ cắt nhau tại giao điểm $B$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cách viết nào diễn tả "điểm $M$ không thuộc đường thẳng $a$"?',
      options: ['$M \\in a$', '$M \\notin a$', '$a \\notin M$', '$a \\in M$'],
      answer: 1,
      hints: [
        'Kí hiệu $\\in$ đọc là "thuộc", $\\notin$ đọc là "không thuộc".',
        'Tên điểm viết trước, tên đường thẳng viết sau.',
      ],
      solution: '"Điểm $M$ không thuộc đường thẳng $a$" viết là $M \\notin a$.',
    },
    {
      type: 'multi',
      prompt:
        'Ba điểm $A$, $B$, $C$ nằm trên đường thẳng $d$, điểm $M$ không nằm trên $d$. Chọn tất cả các khẳng định đúng.',
      options: [
        '$A \\in d$',
        '$M \\in d$',
        '$B \\notin d$',
        '$M \\notin d$',
        'Ba điểm $A$, $M$, $C$ thẳng hàng',
      ],
      answers: [0, 3],
      hints: [
        'Điểm nằm trên $d$ thì thuộc $d$.',
        'Đường thẳng đi qua $A$ và $C$ là $d$; $M$ có nằm trên $d$ không?',
      ],
      solution:
        '$A \\in d$ và $M \\notin d$ đúng. $M \\in d$, $B \\notin d$ sai. Đường thẳng $AC$ là $d$ mà $M \\notin d$, nên $A$, $M$, $C$ không thẳng hàng.',
    },
    {
      type: 'choice',
      prompt: 'Qua hai điểm phân biệt $A$ và $B$ có bao nhiêu đường thẳng?',
      options: ['Không có đường thẳng nào', 'Một và chỉ một', 'Đúng hai', 'Vô số'],
      answer: 1,
      hints: ['Thử đặt mép thước đi qua cả hai điểm: em vạch được mấy đường khác nhau?'],
      solution: 'Có một và chỉ một đường thẳng đi qua hai điểm phân biệt, đó là đường thẳng $AB$.',
    },
    {
      type: 'number',
      prompt:
        'Cho ba điểm $A$, $B$, $C$ không thẳng hàng. Kẻ các đường thẳng đi qua từng cặp điểm. Có bao nhiêu đường thẳng?',
      answer: 3,
      hints: ['Liệt kê các cặp điểm: $A$ với $B$, $A$ với $C$, ...'],
      solution:
        'Các cặp điểm là $(A, B)$, $(A, C)$, $(B, C)$. Ba điểm không thẳng hàng nên ba đường thẳng $AB$, $AC$, $BC$ khác nhau: có $3$ đường thẳng.',
    },
    {
      type: 'number',
      prompt:
        'Cho năm điểm $A$, $B$, $C$, $D$, $E$, trong đó không có ba điểm nào thẳng hàng. Kẻ các đường thẳng đi qua từng cặp điểm. Có bao nhiêu đường thẳng?',
      answer: 10,
      hints: [
        'Mỗi điểm ghép được với $4$ điểm còn lại.',
        'Mỗi đường thẳng được đếm hai lần (cặp $AB$ và cặp $BA$).',
      ],
      solution:
        'Mỗi điểm ghép với $4$ điểm còn lại, được $5 \\cdot 4 = 20$ cặp, nhưng mỗi đường thẳng được đếm hai lần. Vậy có $20 : 2 = 10$ đường thẳng: $AB$, $AC$, $AD$, $AE$, $BC$, $BD$, $BE$, $CD$, $CE$, $DE$.',
    },
    {
      type: 'number',
      prompt:
        'Cho năm điểm $A$, $B$, $C$, $D$, $E$, trong đó chỉ có ba điểm $A$, $B$, $C$ thẳng hàng (không còn bộ ba nào khác thẳng hàng). Kẻ các đường thẳng đi qua từng cặp điểm. Có bao nhiêu đường thẳng?',
      answer: 8,
      hints: [
        'Nếu không có ba điểm nào thẳng hàng thì có $10$ đường thẳng.',
        'Ba cặp $(A, B)$, $(A, C)$, $(B, C)$ cùng cho một đường thẳng.',
      ],
      solution:
        'Nếu không có ba điểm nào thẳng hàng thì có $10$ đường thẳng. Nhưng $AB$, $AC$, $BC$ là cùng một đường thẳng, nên ba đường được tính thành một: $10 - 3 + 1 = 8$ đường thẳng.',
    },
    {
      type: 'choice',
      prompt: 'Hai đường thẳng phân biệt không có điểm chung nào gọi là hai đường thẳng',
      options: ['cắt nhau', 'song song', 'trùng nhau', 'thẳng hàng'],
      answer: 1,
      hints: ['Hai đường thẳng cắt nhau có đúng một điểm chung.'],
      solution: 'Hai đường thẳng không có điểm chung nào gọi là hai đường thẳng song song.',
    },
    {
      type: 'text',
      prompt:
        'Hai đường thẳng $a$ và $b$ cắt nhau tại $O$. Điểm $O$ được gọi là gì của $a$ và $b$?',
      accept: ['giao điểm', 'giao điểm của a và b', 'giao điểm của hai đường thẳng', 'điểm chung'],
      hints: ['Đó là điểm chung duy nhất của hai đường thẳng cắt nhau.'],
      solution: '$O$ là giao điểm (điểm chung duy nhất) của hai đường thẳng $a$ và $b$.',
    },
    {
      type: 'number',
      prompt:
        'Vẽ ba đường thẳng phân biệt, đôi một cắt nhau và không có ba đường thẳng nào cùng đi qua một điểm. Có bao nhiêu giao điểm?',
      answer: 3,
      hints: [
        'Mỗi cặp đường thẳng cho đúng một giao điểm.',
        'Ba đường thẳng $a$, $b$, $c$ tạo thành bao nhiêu cặp?',
      ],
      solution:
        'Các cặp là $(a, b)$, $(a, c)$, $(b, c)$; mỗi cặp có một giao điểm và ba giao điểm này khác nhau (vì không có ba đường thẳng nào cùng đi qua một điểm). Vậy có $3$ giao điểm.',
    },
  ],
  takeaways: [
    'Điểm đặt tên bằng chữ in hoa, đường thẳng bằng chữ in thường; $A \\in d$: $A$ thuộc $d$, $B \\notin d$: $B$ không thuộc $d$.',
    'Qua hai điểm phân biệt có một và chỉ một đường thẳng.',
    'Ba điểm cùng thuộc một đường thẳng thì thẳng hàng; ngược lại thì không thẳng hàng.',
    'Hai đường thẳng phân biệt: có đúng một điểm chung (giao điểm) thì cắt nhau, không có điểm chung thì song song.',
  ],
};
