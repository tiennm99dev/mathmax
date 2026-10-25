/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hình có trục đối xứng: gấp hình theo một đường thẳng mà hai phần chồng khít lên nhau; trục đối xứng của các hình phẳng quen thuộc và của các hình trong tự nhiên.',
  intro:
    'Quan sát một con bướm đang đậu: cánh bên trái và cánh bên phải giống hệt nhau, như thể cánh này là hình ảnh của cánh kia trong gương. Nếu gấp bức ảnh con bướm theo đường thẳng dọc thân nó, hai cánh sẽ chồng khít lên nhau. Những hình có tính chất như vậy được gọi là hình có trục đối xứng.',
  objectives: [
    'Nhận biết được hình có trục đối xứng và trục đối xứng của hình.',
    'Chỉ ra được trục đối xứng của tam giác đều, hình vuông, hình chữ nhật, hình thoi, hình thang cân, lục giác đều, hình tròn và đoạn thẳng.',
    'Nhận biết được tính đối xứng trục trong tự nhiên, nghệ thuật, kiến trúc và chữ cái.',
  ],
  sections: [
    {
      heading: 'Hình có trục đối xứng',
      blocks: [
        {
          type: 'p',
          text: 'Gấp đôi một tờ giấy, dùng kéo cắt theo một đường bất kì rồi mở tờ giấy ra. Ta được một hình mà nếp gấp chia nó thành hai phần giống hệt nhau: gấp lại theo nếp gấp thì hai phần chồng khít lên nhau.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình có trục đối xứng',
          text: 'Hình có trục đối xứng là hình có một đường thẳng $d$ chia hình thành hai phần mà nếu "gấp" hình theo đường thẳng $d$ thì hai phần đó "chồng khít" lên nhau. Đường thẳng $d$ được gọi là trục đối xứng của hình.',
        },
        {
          type: 'p',
          text: 'Muốn kiểm tra một đường thẳng có phải trục đối xứng hay không, ta tưởng tượng gấp hình theo đường thẳng đó (hoặc gấp thật bằng giấy). Chỉ cần một chỗ của hai phần không trùng nhau là đường thẳng đó không phải trục đối xứng.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Một hình có thể không có trục đối xứng nào, có một trục, nhiều trục, thậm chí vô số trục đối xứng.',
        },
      ],
    },
    {
      heading: 'Trục đối xứng của một số hình phẳng',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Trục đối xứng', 'Số trục'],
          rows: [
            [
              'Đoạn thẳng $AB$',
              'Đường thẳng vuông góc với $AB$ tại trung điểm của $AB$; đường thẳng $AB$',
              '$2$',
            ],
            ['Tam giác đều', 'Đường thẳng đi qua một đỉnh và trung điểm cạnh đối diện', '$3$'],
            [
              'Hình vuông',
              'Hai đường chéo; hai đường thẳng đi qua trung điểm của hai cạnh đối diện',
              '$4$',
            ],
            ['Hình chữ nhật', 'Hai đường thẳng đi qua trung điểm của hai cạnh đối diện', '$2$'],
            ['Hình thoi', 'Hai đường chéo', '$2$'],
            ['Hình thang cân', 'Đường thẳng đi qua trung điểm của hai đáy', '$1$'],
            [
              'Lục giác đều',
              'Ba đường chéo chính; ba đường thẳng đi qua trung điểm của hai cạnh đối diện',
              '$6$',
            ],
            ['Hình tròn', 'Mọi đường thẳng đi qua tâm', 'Vô số'],
          ],
          caption: 'Trục đối xứng của các hình đã học',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Đường chéo của hình chữ nhật (không phải hình vuông) không phải trục đối xứng: gấp theo đường chéo $AC$ thì đỉnh $B$ không rơi đúng vào đỉnh $D$. Hình bình hành (không phải hình chữ nhật, không phải hình thoi) không có trục đối xứng nào.',
        },
        {
          type: 'p',
          text: 'Nhiều chữ cái in hoa cũng có trục đối xứng. Các chữ $\\mathrm{A}$, $\\mathrm{M}$, $\\mathrm{T}$, $\\mathrm{U}$, $\\mathrm{V}$, $\\mathrm{Y}$ có một trục đối xứng dọc; các chữ $\\mathrm{C}$, $\\mathrm{D}$, $\\mathrm{E}$ có một trục đối xứng ngang; các chữ $\\mathrm{H}$, $\\mathrm{I}$, $\\mathrm{O}$, $\\mathrm{X}$ có cả trục dọc lẫn trục ngang. Các chữ $\\mathrm{F}$, $\\mathrm{G}$, $\\mathrm{L}$, $\\mathrm{N}$, $\\mathrm{P}$, $\\mathrm{S}$, $\\mathrm{Z}$ không có trục đối xứng.',
        },
      ],
    },
    {
      heading: 'Hình có trục đối xứng trong thế giới tự nhiên',
      blocks: [
        {
          type: 'p',
          text: 'Tính đối xứng có mặt khắp nơi quanh ta và là một yếu tố tạo nên sự cân đối, hài hoà của các hình.',
        },
        {
          type: 'list',
          items: [
            'Trong tự nhiên: con bướm, con chuồn chuồn, nhiều chiếc lá, bông hoa, bông tuyết.',
            'Trong kiến trúc: Khuê Văn Các ở Văn Miếu - Quốc Tử Giám, cổng làng, mặt tiền nhiều toà nhà, cây cầu.',
            'Trong đời sống: nhiều biển báo giao thông, logo, hoa văn trên gạch lát, đồ gốm.',
          ],
        },
        {
          type: 'p',
          text: 'Khi thiết kế một hình có trục đối xứng, người ta chỉ cần vẽ một nửa rồi "lật" nửa đó qua trục để được nửa còn lại, giống như gấp giấy rồi cắt.',
        },
      ],
    },
  ],
  explore: {
    title: 'Gương ảo: gấp hình theo một đường thẳng',
    instruction:
      'Kéo chấm tím để dời đường thẳng, kéo chấm cam (hoặc dùng phím mũi tên) để xoay đường thẳng. Phần màu cam là nửa hình đã được gấp sang: khi nó chồng khít lên phần xanh dương, em đã tìm được một trục đối xứng. Hãy tìm đủ các trục của mỗi hình.',
  },
  examples: [
    {
      problem: 'Tìm các trục đối xứng của hình chữ nhật $ABCD$ có $AB = 6$ cm, $BC = 3$ cm.',
      steps: [
        'Gọi $M$, $N$ là trung điểm của $AB$ và $CD$. Gấp hình theo đường thẳng $MN$: $A$ rơi vào $B$, $D$ rơi vào $C$, hai nửa chồng khít. Vậy $MN$ là một trục đối xứng.',
        'Gọi $P$, $Q$ là trung điểm của $AD$ và $BC$. Gấp theo đường thẳng $PQ$: $A$ rơi vào $D$, $B$ rơi vào $C$. Vậy $PQ$ cũng là một trục đối xứng.',
        'Gấp theo đường chéo $AC$: vì $AB \\neq BC$ nên $B$ không rơi vào $D$, hai phần không chồng khít. Đường chéo không phải trục đối xứng.',
      ],
      answer:
        'Hình chữ nhật $ABCD$ có hai trục đối xứng: $MN$ và $PQ$ (các đường thẳng đi qua trung điểm của hai cạnh đối diện).',
    },
    {
      problem: 'Hình lục giác đều $ABCDEF$ có bao nhiêu trục đối xứng? Chỉ ra các trục đó.',
      steps: [
        'Ba đường chéo chính $AD$, $BE$, $CF$ là ba trục đối xứng: chẳng hạn gấp theo $AD$ thì $B$ rơi vào $F$, $C$ rơi vào $E$.',
        'Ba đường thẳng đi qua trung điểm của hai cạnh đối diện (của $AB$ và $DE$, của $BC$ và $EF$, của $CD$ và $FA$) cũng là trục đối xứng.',
        'Không còn trục nào khác, nên tổng cộng có $3 + 3 = 6$ trục.',
      ],
      answer: 'Hình lục giác đều có $6$ trục đối xứng.',
    },
    {
      problem:
        'Trong các chữ cái in hoa $\\mathrm{H}$, $\\mathrm{N}$, $\\mathrm{O}$, $\\mathrm{T}$, chữ nào có trục đối xứng? Mỗi chữ có mấy trục?',
      steps: [
        'Chữ $\\mathrm{H}$: gấp theo đường dọc ở giữa hoặc đường ngang qua giữa nét ngang đều chồng khít, nên có $2$ trục.',
        'Chữ $\\mathrm{O}$ (vẽ như một hình bầu dục): có trục dọc và trục ngang, nên có $2$ trục.',
        'Chữ $\\mathrm{T}$: chỉ có trục dọc đi qua nét sổ, nên có $1$ trục.',
        'Chữ $\\mathrm{N}$: gấp theo đường dọc thì nét chéo bị lật ngược, gấp theo đường ngang cũng vậy; không có trục đối xứng.',
      ],
      answer:
        'Các chữ $\\mathrm{H}$, $\\mathrm{O}$ (mỗi chữ $2$ trục) và $\\mathrm{T}$ ($1$ trục) có trục đối xứng; chữ $\\mathrm{N}$ thì không.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hình nào dưới đây không có trục đối xứng?',
      options: [
        'Hình chữ nhật',
        'Hình thang cân',
        'Hình bình hành có hai cạnh kề không bằng nhau và không có góc vuông',
        'Tam giác đều',
      ],
      answer: 2,
      hints: [
        'Thử gấp từng hình theo các đường thẳng đi qua trung điểm cạnh và theo các đường chéo.',
        'Hình nào gấp theo đường nào cũng bị lệch?',
      ],
      solution:
        'Hình chữ nhật có $2$ trục, hình thang cân có $1$ trục, tam giác đều có $3$ trục. Hình bình hành như vậy (không phải hình chữ nhật, không phải hình thoi) không có trục đối xứng nào.',
    },
    {
      type: 'number',
      prompt: 'Hình lục giác đều có bao nhiêu trục đối xứng?',
      answer: 6,
      hints: [
        'Đếm các đường chéo chính trước.',
        'Còn có các đường thẳng đi qua trung điểm của hai cạnh đối diện.',
      ],
      solution:
        'Có $3$ trục là ba đường chéo chính và $3$ trục đi qua trung điểm của hai cạnh đối diện: tổng cộng $6$ trục.',
    },
    {
      type: 'number',
      prompt: 'Hình vuông có bao nhiêu trục đối xứng?',
      answer: 4,
      hints: [
        'Hình vuông vừa là hình chữ nhật vừa là hình thoi.',
        'Hình chữ nhật có hai trục đi qua trung điểm hai cạnh đối diện, hình thoi có hai trục là hai đường chéo.',
      ],
      solution:
        'Hình vuông có $2$ trục đi qua trung điểm của hai cạnh đối diện và $2$ trục là hai đường chéo: tổng cộng $4$ trục.',
    },
    {
      type: 'choice',
      prompt: 'Hình thang cân $ABCD$ có hai đáy $AB$ và $CD$. Trục đối xứng của nó là',
      options: [
        'đường chéo $AC$',
        'đường thẳng đi qua trung điểm của hai đáy $AB$ và $CD$',
        'đường thẳng đi qua trung điểm của hai cạnh bên $AD$ và $BC$',
        'đường thẳng $AB$',
      ],
      answer: 1,
      hints: [
        'Khi gấp theo trục, hai cạnh bên bằng nhau phải chồng lên nhau.',
        'Đỉnh $A$ phải rơi vào đỉnh $B$ và $D$ rơi vào $C$.',
      ],
      solution:
        'Gấp theo đường thẳng đi qua trung điểm của $AB$ và $CD$ thì $A$ rơi vào $B$, $D$ rơi vào $C$, cạnh bên $AD$ chồng lên $BC$. Đó là trục đối xứng duy nhất của hình thang cân.',
    },
    {
      type: 'choice',
      prompt: 'Các trục đối xứng của một hình thoi (không phải hình vuông) là',
      options: [
        'hai đường chéo của nó',
        'hai đường thẳng đi qua trung điểm của hai cạnh đối diện',
        'cả hai đường chéo và hai đường thẳng đi qua trung điểm hai cạnh đối diện',
        'hình thoi không có trục đối xứng',
      ],
      answer: 0,
      hints: [
        'Cắt một hình thoi bằng giấy rồi gấp theo một đường chéo: hai nửa có chồng khít không?',
      ],
      solution:
        'Gấp hình thoi theo mỗi đường chéo, hai nửa chồng khít vì bốn cạnh bằng nhau. Gấp theo đường thẳng đi qua trung điểm hai cạnh đối diện thì hai nửa bị lệch. Vậy hình thoi có đúng hai trục đối xứng là hai đường chéo.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các chữ cái in hoa có trục đối xứng.',
      options: ['A', 'F', 'H', 'N', 'T', 'U', 'S', 'L'],
      answers: [0, 2, 4, 5],
      hints: [
        'Tưởng tượng đặt một chiếc gương dọc (hoặc ngang) ở giữa chữ.',
        'Chữ $\\mathrm{N}$ và $\\mathrm{S}$ trông "cân đối" nhưng gấp theo đường nào cũng không chồng khít.',
      ],
      solution:
        'Các chữ $\\mathrm{A}$, $\\mathrm{T}$, $\\mathrm{U}$ có trục dọc, chữ $\\mathrm{H}$ có cả trục dọc và trục ngang. Các chữ $\\mathrm{F}$, $\\mathrm{N}$, $\\mathrm{S}$, $\\mathrm{L}$ không có trục đối xứng.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hình với số trục đối xứng của nó.',
      left: [
        'Tam giác đều',
        'Hình chữ nhật',
        'Hình thang cân',
        'Hình bình hành (không có góc vuông, hai cạnh kề khác nhau)',
      ],
      right: ['$0$', '$1$', '$2$', '$3$'],
      pairs: [
        [0, 3],
        [1, 2],
        [2, 1],
        [3, 0],
      ],
      hints: ['Xem lại bảng trục đối xứng của các hình đã học.'],
      solution:
        'Tam giác đều: $3$ trục. Hình chữ nhật: $2$ trục. Hình thang cân: $1$ trục. Hình bình hành đó: không có trục nào.',
    },
    {
      type: 'number',
      prompt:
        'Trong các chữ cái in hoa $\\mathrm{X}$, $\\mathrm{Y}$, $\\mathrm{Z}$, $\\mathrm{P}$, $\\mathrm{Q}$, $\\mathrm{M}$, có bao nhiêu chữ có trục đối xứng?',
      answer: 3,
      hints: ['Xét lần lượt từng chữ: thử một trục dọc rồi một trục ngang.'],
      solution:
        '$\\mathrm{X}$ có $2$ trục, $\\mathrm{Y}$ và $\\mathrm{M}$ mỗi chữ có $1$ trục dọc. $\\mathrm{Z}$, $\\mathrm{P}$, $\\mathrm{Q}$ không có trục đối xứng. Vậy có $3$ chữ.',
    },
    {
      type: 'text',
      prompt: 'Hình tròn có bao nhiêu trục đối xứng? (Viết bằng chữ)',
      accept: ['vô số', 'vô số trục', 'vô số trục đối xứng', 'vô hạn', 'vô số trục đối xứng.'],
      hints: [
        'Gấp hình tròn theo một đường thẳng đi qua tâm: hai nửa có chồng khít không?',
        'Có bao nhiêu đường thẳng đi qua tâm?',
      ],
      solution:
        'Mọi đường thẳng đi qua tâm đều là trục đối xứng của hình tròn. Có vô số đường thẳng như vậy, nên hình tròn có vô số trục đối xứng.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Lan gấp đôi một tờ giấy, cắt theo một đường cong rồi mở ra được một hình trái tim. Nếp gấp trên tờ giấy là gì đối với hình trái tim?',
      options: [
        'Là trục đối xứng của hình trái tim',
        'Là đường viền của hình trái tim',
        'Không liên quan đến hình trái tim',
        'Là đường chéo của một hình chữ nhật',
      ],
      answer: 0,
      hints: ['Gấp lại theo nếp gấp: hai nửa trái tim nằm ở đâu?'],
      solution:
        'Hai nửa trái tim được cắt cùng một lúc trên hai lớp giấy, nên gấp theo nếp gấp chúng chồng khít lên nhau. Nếp gấp là trục đối xứng của hình.',
    },
  ],
  takeaways: [
    'Hình có trục đối xứng: có đường thẳng $d$ mà gấp hình theo $d$ thì hai phần chồng khít; $d$ là trục đối xứng.',
    'Tam giác đều: $3$ trục; hình vuông: $4$; hình chữ nhật, hình thoi: $2$; hình thang cân: $1$; lục giác đều: $6$; hình tròn: vô số.',
    'Hình bình hành (không phải hình chữ nhật, hình thoi) không có trục đối xứng; đường chéo hình chữ nhật không phải trục đối xứng.',
    'Tính đối xứng trục có trong tự nhiên, kiến trúc, nghệ thuật và trong nhiều chữ cái.',
  ],
};
