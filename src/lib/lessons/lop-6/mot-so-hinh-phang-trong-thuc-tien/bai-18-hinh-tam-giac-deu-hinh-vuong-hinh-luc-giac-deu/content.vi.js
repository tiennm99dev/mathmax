/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhận biết hình tam giác đều, hình vuông, hình lục giác đều qua cạnh, góc, đường chéo; vẽ tam giác đều bằng thước và compa, vẽ hình vuông bằng thước và êke, ghép sáu tam giác đều thành lục giác đều.',
  intro:
    'Biển báo giao thông hình tam giác, viên gạch lát nền hình vuông, ô tổ ong hình lục giác: những hình đẹp và cân đối này có mặt ở khắp nơi quanh em. Chúng có chung một điều: mọi cạnh đều bằng nhau và mọi góc đều bằng nhau. Trong bài này em sẽ nhận biết, vẽ và ghép các hình đó.',
  objectives: [
    'Nhận biết cạnh, góc, đường chéo của hình tam giác đều, hình vuông, hình lục giác đều.',
    'Vẽ tam giác đều bằng thước và compa, vẽ hình vuông bằng thước và êke.',
    'Ghép sáu tam giác đều thành một hình lục giác đều và tính độ dài liên quan.',
  ],
  sections: [
    {
      heading: 'Hình tam giác đều',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tam giác đều',
          text: 'Tam giác đều $ABC$ có các đặc điểm sau.',
        },
        {
          type: 'list',
          items: [
            'Ba cạnh bằng nhau: $AB = BC = CA$.',
            'Ba góc ở các đỉnh $A$, $B$, $C$ bằng nhau.',
          ],
        },
        {
          type: 'p',
          text: 'Trên hình vẽ, các cạnh bằng nhau thường được đánh dấu bằng cùng một số gạch nhỏ. Vẽ tam giác đều $ABC$ có cạnh $3$ cm bằng thước và compa như sau:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ đoạn thẳng $AB = 3$ cm.',
            'Lấy $A$ làm tâm, mở compa bằng $AB$ ($3$ cm) và vẽ một cung tròn. Lấy $B$ làm tâm, vẽ một cung tròn cùng bán kính $3$ cm. Hai cung cắt nhau tại $C$.',
            'Dùng thước nối $C$ với $A$ và $C$ với $B$. Ta được tam giác đều $ABC$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao lại là compa?',
          text: 'Mọi điểm trên cung tròn tâm $A$ bán kính $3$ cm đều cách $A$ đúng $3$ cm. Điểm $C$ nằm trên cả hai cung nên $CA = 3$ cm và $CB = 3$ cm, tức là $CA = CB = AB$.',
        },
      ],
    },
    {
      heading: 'Hình vuông',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình vuông',
          text: 'Hình vuông $ABCD$ có các đặc điểm sau.',
        },
        {
          type: 'list',
          items: [
            'Bốn cạnh bằng nhau: $AB = BC = CD = DA$.',
            'Hai cạnh đối $AB$ và $CD$ song song với nhau; hai cạnh đối $AD$ và $BC$ song song với nhau.',
            'Bốn góc ở các đỉnh $A$, $B$, $C$, $D$ bằng nhau và đều là góc vuông.',
            'Hai đường chéo bằng nhau: $AC = BD$.',
          ],
        },
        {
          type: 'p',
          text: 'Vẽ hình vuông $ABCD$ có cạnh $4$ cm bằng thước và êke:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ đoạn thẳng $AB = 4$ cm.',
            'Vẽ đường thẳng vuông góc với $AB$ tại $A$. Xác định điểm $D$ trên đường thẳng đó sao cho $AD = 4$ cm.',
            'Vẽ đường thẳng vuông góc với $AB$ tại $B$. Xác định điểm $C$ trên đường thẳng đó (cùng phía với $D$) sao cho $BC = 4$ cm.',
            'Nối $D$ với $C$. Ta được hình vuông $ABCD$.',
          ],
        },
      ],
    },
    {
      heading: 'Hình lục giác đều',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lục giác đều',
          text: 'Hình lục giác đều $ABCDEF$ có các đặc điểm sau.',
        },
        {
          type: 'list',
          items: [
            'Sáu cạnh bằng nhau: $AB = BC = CD = DE = EF = FA$.',
            'Sáu góc ở các đỉnh $A$, $B$, $C$, $D$, $E$, $F$ bằng nhau.',
            'Ba đường chéo chính $AD$, $BE$, $CF$ bằng nhau.',
          ],
        },
        {
          type: 'p',
          text: 'Ghép sáu tam giác đều bằng nhau có chung một đỉnh $O$, em được một hình lục giác đều. Mỗi cạnh của lục giác là một cạnh của tam giác đều, và mỗi đường chéo chính đi qua $O$ gồm hai cạnh tam giác nối tiếp nhau.',
        },
        {
          type: 'table',
          head: ['Tam giác đều cạnh', 'Cạnh lục giác', 'Đường chéo chính', 'Chu vi lục giác'],
          rows: [
            ['$a$', '$a$', '$2a$', '$6a$'],
            ['$3$ cm', '$3$ cm', '$6$ cm', '$18$ cm'],
          ],
          caption: 'Lục giác đều ghép từ sáu tam giác đều cạnh $a$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Không phải đường chéo nào của lục giác đều cũng là đường chéo chính. Đường chéo chính nối hai đỉnh đối diện, như $AD$; còn $AC$ chỉ "bỏ qua" một đỉnh nên ngắn hơn $AD$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng vẽ thước và compa',
    instruction:
      'Chọn một hình. Với tam giác đều, kéo điểm $C$ (hoặc dùng phím mũi tên) tới chỗ hai cung compa cắt nhau; kéo $B$ để đổi độ dài cạnh. Với hình vuông, bấm "Bước tiếp" để vẽ bằng êke. Với lục giác đều, ghép lần lượt sáu tam giác đều quanh $O$.',
  },
  examples: [
    {
      problem: 'Vẽ tam giác đều $MNP$ có cạnh $5$ cm bằng thước và compa.',
      steps: [
        'Dùng thước vẽ đoạn thẳng $MN = 5$ cm.',
        'Mở compa bằng $5$ cm. Đặt mũi nhọn tại $M$, vẽ một cung tròn; đặt mũi nhọn tại $N$, vẽ một cung tròn cắt cung trước tại $P$.',
        'Nối $P$ với $M$ và $P$ với $N$.',
        'Kiểm tra: $PM = PN = MN = 5$ cm vì $P$ nằm trên cả hai cung bán kính $5$ cm.',
      ],
      answer: 'Tam giác $MNP$ là tam giác đều cạnh $5$ cm.',
    },
    {
      problem:
        'Hình lục giác đều $ABCDEF$ được ghép từ sáu tam giác đều có chung đỉnh $O$, biết $OA = 6$ cm. Tính độ dài cạnh $AB$, đường chéo chính $AD$ và chu vi của lục giác.',
      steps: [
        'Tam giác $OAB$ là tam giác đều nên $AB = OA = 6$ cm.',
        'Đường chéo chính $AD$ đi qua $O$ và gồm hai đoạn $OA$, $OD$, mỗi đoạn là cạnh của một tam giác đều: $AD = OA + OD = 6 + 6 = 12$ (cm).',
        'Lục giác đều có sáu cạnh bằng nhau nên chu vi là $6 \\cdot 6 = 36$ (cm).',
      ],
      answer: '$AB = 6$ cm, $AD = 12$ cm, chu vi $36$ cm.',
    },
    {
      problem:
        'Một hình vuông có chu vi $28$ cm. Tính độ dài cạnh và cho biết hai đường chéo có bằng nhau không.',
      steps: [
        'Hình vuông có bốn cạnh bằng nhau nên chu vi bằng $4$ lần cạnh.',
        'Cạnh hình vuông là $28 : 4 = 7$ (cm).',
        'Hai đường chéo của hình vuông luôn bằng nhau.',
      ],
      answer: 'Cạnh $7$ cm; hai đường chéo bằng nhau.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Phát biểu nào đúng với mọi tam giác đều $ABC$?',
      options: [
        '$AB = BC = CA$ và ba góc ở các đỉnh $A$, $B$, $C$ bằng nhau',
        'Chỉ cần $AB = AC$',
        'Có một góc vuông',
        'Ba cạnh song song với nhau',
      ],
      answer: 0,
      hints: ['Chữ "đều" nói về cả ba cạnh và cả ba góc.'],
      solution: 'Tam giác đều có ba cạnh bằng nhau và ba góc ở các đỉnh bằng nhau.',
    },
    {
      type: 'number',
      prompt: 'Tính chu vi của một tam giác đều có cạnh $8$ cm.',
      answer: 24,
      unit: 'cm',
      hints: ['Ba cạnh bằng nhau nên chu vi bằng $3$ lần cạnh.'],
      solution: 'Chu vi là $3 \\cdot 8 = 24$ (cm).',
    },
    {
      type: 'multi',
      prompt: 'Cho hình vuông $ABCD$. Chọn tất cả các khẳng định đúng.',
      options: [
        '$AB = BC = CD = DA$',
        '$AC = BD$',
        'Bốn góc ở các đỉnh $A$, $B$, $C$, $D$ đều là góc vuông',
        '$AB$ song song với $BC$',
        '$AC = AB$',
      ],
      answers: [0, 1, 2],
      hints: [
        'Nhớ lại bốn đặc điểm của hình vuông: cạnh, cạnh đối song song, góc, đường chéo.',
        '$AB$ và $BC$ là hai cạnh kề nhau, chúng vuông góc chứ không song song.',
      ],
      solution:
        'Hình vuông có bốn cạnh bằng nhau, bốn góc vuông và hai đường chéo bằng nhau. $AB$ và $BC$ vuông góc với nhau; đường chéo $AC$ dài hơn cạnh $AB$.',
    },
    {
      type: 'number',
      prompt: 'Một hình vuông có chu vi $36$ cm. Cạnh của hình vuông dài bao nhiêu xăng-ti-mét?',
      answer: 9,
      unit: 'cm',
      hints: ['Chu vi hình vuông bằng $4$ lần cạnh.'],
      solution: 'Cạnh hình vuông là $36 : 4 = 9$ (cm).',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước vẽ tam giác đều $ABC$ cạnh $4$ cm bằng thước và compa.',
      items: [
        'Nối $C$ với $A$ và $C$ với $B$.',
        'Vẽ đoạn thẳng $AB = 4$ cm.',
        'Vẽ cung tròn tâm $A$ bán kính $4$ cm và cung tròn tâm $B$ bán kính $4$ cm, chúng cắt nhau tại $C$.',
      ],
      answer: [1, 2, 0],
      hints: ['Phải có đoạn $AB$ trước thì mới có tâm để vẽ cung.'],
      solution:
        'Vẽ $AB = 4$ cm, rồi vẽ hai cung tâm $A$ và tâm $B$ bán kính $4$ cm cắt nhau tại $C$, cuối cùng nối $CA$, $CB$.',
    },
    {
      type: 'number',
      prompt:
        'Hình lục giác đều $ABCDEF$ ghép từ sáu tam giác đều cạnh $4$ cm có chung đỉnh $O$. Tính độ dài đường chéo chính $BE$.',
      answer: 8,
      unit: 'cm',
      hints: [
        'Đường chéo chính $BE$ đi qua $O$.',
        '$BE = OB + OE$, mỗi đoạn là một cạnh tam giác đều.',
      ],
      solution: '$BE = OB + OE = 4 + 4 = 8$ (cm).',
    },
    {
      type: 'text',
      prompt: 'Hình lục giác đều có bao nhiêu đường chéo chính? (Viết bằng số.)',
      accept: ['3', 'ba'],
      hints: [
        'Đường chéo chính nối hai đỉnh đối diện, như $AD$.',
        'Sáu đỉnh chia thành mấy cặp đối diện?',
      ],
      solution: 'Sáu đỉnh tạo thành ba cặp đối diện, nên có ba đường chéo chính: $AD$, $BE$, $CF$.',
    },
    {
      type: 'number',
      prompt:
        'Bác thợ làm một khung cửa sổ hình lục giác đều cạnh $30$ cm, có thêm ba thanh nẹp theo ba đường chéo chính. Bác cần tất cả bao nhiêu xăng-ti-mét thanh nhôm?',
      answer: 360,
      unit: 'cm',
      hints: [
        'Tính riêng tổng sáu cạnh và tổng ba đường chéo chính.',
        'Mỗi đường chéo chính dài gấp đôi cạnh, tức $60$ cm.',
      ],
      solution:
        'Sáu cạnh dài $6 \\cdot 30 = 180$ (cm). Ba đường chéo chính dài $3 \\cdot 60 = 180$ (cm). Tổng cộng $180 + 180 = 360$ (cm).',
    },
  ],
  takeaways: [
    'Tam giác đều: ba cạnh bằng nhau, ba góc bằng nhau; vẽ bằng thước và compa mở bằng độ dài cạnh.',
    'Hình vuông: bốn cạnh bằng nhau, cạnh đối song song, bốn góc vuông, hai đường chéo bằng nhau; vẽ bằng thước và êke.',
    'Lục giác đều: sáu cạnh bằng nhau, sáu góc bằng nhau, ba đường chéo chính bằng nhau và dài gấp đôi cạnh.',
    'Sáu tam giác đều bằng nhau có chung một đỉnh ghép thành một hình lục giác đều.',
  ],
};
