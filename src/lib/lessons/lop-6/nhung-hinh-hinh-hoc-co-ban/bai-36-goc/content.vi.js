/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Góc là hình gồm hai tia chung gốc: đỉnh, cạnh, cách gọi tên và kí hiệu góc, góc bẹt và điểm nằm trong góc.',
  intro:
    'Chiếc kéo đang mở, hai kim đồng hồ, hay góc sút của một cầu thủ trước khung thành đều gợi cho ta hình ảnh hai tia chung gốc. Hình gồm hai tia chung gốc như thế được gọi là góc. Bài này giúp em gọi đúng tên một góc, nhận ra góc bẹt và biết khi nào một điểm nằm trong góc.',
  objectives: [
    'Nhận biết góc, đỉnh và cạnh của góc; gọi tên và viết kí hiệu một góc.',
    'Nhận biết góc bẹt.',
    'Nhận biết điểm nằm trong góc (điểm trong của góc).',
  ],
  sections: [
    {
      heading: 'Góc',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Góc là hình gồm hai tia chung gốc. Gốc chung của hai tia gọi là đỉnh của góc, hai tia gọi là hai cạnh của góc.',
        },
        {
          type: 'p',
          text: 'Góc có đỉnh $O$, hai cạnh $Ox$ và $Oy$ được gọi là góc $xOy$ hoặc góc $yOx$, hay gọn hơn là góc $O$. Khi viết tên góc bằng ba chữ, chữ chỉ đỉnh luôn đứng ở giữa.',
        },
        {
          type: 'table',
          caption: 'Các cách gọi tên và kí hiệu góc có đỉnh $O$, cạnh $Ox$, $Oy$',
          head: ['Cách gọi', 'Kí hiệu'],
          rows: [
            ['Góc $xOy$, góc $yOx$', '$\\widehat{xOy}$, $\\widehat{yOx}$ hoặc $\\angle xOy$'],
            ['Góc $O$ (khi không gây nhầm lẫn)', '$\\widehat{O}$'],
            [
              'Góc $AOB$, với $A$ thuộc tia $Ox$, $B$ thuộc tia $Oy$ ($A$, $B$ khác $O$)',
              '$\\widehat{AOB}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Góc $Oxy$ hay góc $xyO$ là cách viết sai: chữ ở giữa phải là đỉnh. Khi có nhiều góc chung đỉnh $O$, không được gọi gọn là "góc $O$" vì không biết đó là góc nào.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Góc bẹt',
          text: 'Góc bẹt là góc có hai cạnh là hai tia đối nhau. Chẳng hạn điểm $O$ nằm trên đường thẳng $xy$ thì góc $xOy$ là góc bẹt.',
        },
      ],
    },
    {
      heading: 'Điểm trong của góc',
      blocks: [
        {
          type: 'p',
          text: 'Cho góc $xOy$ không phải góc bẹt. Hai cạnh $Ox$, $Oy$ chia phần mặt phẳng quanh đỉnh $O$ thành hai phần; phần "kẹp giữa" hai cạnh là phần bên trong của góc (trên hình vẽ thường được tô màu).',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Điểm nằm trong góc',
          text: 'Điểm $M$ thuộc phần bên trong của góc $xOy$ (không nằm trên hai cạnh) được gọi là điểm nằm trong góc $xOy$. Ta cũng nói $M$ là một điểm trong của góc $xOy$.',
        },
        {
          type: 'list',
          items: [
            'Đỉnh $O$ và các điểm nằm trên hai cạnh $Ox$, $Oy$ không phải là điểm trong của góc.',
            'Lấy $A$ trên cạnh $Ox$, $B$ trên cạnh $Oy$ ($A$, $B$ khác $O$). Mọi điểm nằm giữa $A$ và $B$ đều nằm trong góc $xOy$.',
            'Nếu $M$ nằm trong góc $xOy$ thì mọi điểm khác $O$ của tia $OM$ cũng nằm trong góc $xOy$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Ta chỉ xét điểm trong của góc không phải góc bẹt: với góc bẹt, hai cạnh tạo thành một đường thẳng nên không có phần nào "kẹp giữa" hai cạnh.',
        },
      ],
    },
  ],
  explore: {
    title: 'Xoay hai cạnh của góc',
    instruction:
      'Kéo điểm $A$ hoặc $B$ (hoặc chọn rồi dùng phím mũi tên) để xoay tia $Ox$, $Oy$ quanh đỉnh $O$. Phần tô màu là bên trong góc $xOy$. Kéo điểm $M$ để xem nó nằm trong góc, trên cạnh hay ngoài góc. Xoay cho hai tia đối nhau để thấy góc bẹt. Cuối cùng, chọn các điểm nằm trong góc trong thử thách.',
  },
  examples: [
    {
      problem:
        'Cho ba điểm $A$, $B$, $C$ không thẳng hàng. Vẽ các tia $AB$, $AC$, $BC$. Kể tên các góc có đỉnh $A$ và đỉnh $B$ trên hình; chỉ ra cạnh của mỗi góc.',
      steps: [
        'Tại đỉnh $A$ có hai tia $AB$ và $AC$, chúng tạo thành góc $BAC$ (cũng là góc $CAB$, góc $A$). Hai cạnh là tia $AB$ và tia $AC$.',
        'Tại đỉnh $B$ chỉ vẽ một tia $BC$, nên chưa có góc đỉnh $B$. Muốn có góc $ABC$ ta cần thêm tia $BA$.',
      ],
      answer:
        'Góc đỉnh $A$: $\\widehat{BAC}$, cạnh $AB$, $AC$. Chưa có góc đỉnh $B$ vì tại $B$ chỉ có một tia.',
    },
    {
      problem:
        'Vẽ ba tia chung gốc $Ox$, $Oy$, $Oz$ phân biệt. Có bao nhiêu góc có đỉnh $O$ và hai cạnh là hai trong ba tia đó? Kể tên.',
      steps: [
        'Mỗi góc ứng với một cặp tia chung gốc.',
        'Các cặp tia: $(Ox, Oy)$, $(Oy, Oz)$, $(Ox, Oz)$.',
        'Ta được ba góc $xOy$, $yOz$, $xOz$.',
      ],
      answer: 'Có $3$ góc: $\\widehat{xOy}$, $\\widehat{yOz}$, $\\widehat{xOz}$.',
    },
    {
      problem:
        'Cho góc $xOy$ không bẹt. Lấy $A$ trên tia $Ox$, $B$ trên tia $Oy$ ($A$, $B$ khác $O$) và $I$ là một điểm nằm giữa $A$ và $B$. Điểm $I$ có nằm trong góc $xOy$ không? Điểm $A$ thì sao?',
      steps: [
        'Mọi điểm nằm giữa $A$ và $B$ đều thuộc phần bên trong của góc, nên $I$ nằm trong góc $xOy$.',
        '$A$ nằm trên cạnh $Ox$, mà điểm trên cạnh không phải điểm trong của góc.',
      ],
      answer: '$I$ nằm trong góc $xOy$; $A$ không nằm trong góc $xOy$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Góc là hình gồm',
      options: [
        'hai tia chung gốc',
        'hai đường thẳng cắt nhau',
        'hai đoạn thẳng có chung một điểm',
        'hai tia bất kì',
      ],
      answer: 0,
      hints: ['Nhớ lại định nghĩa: hai cạnh của góc là hai tia, và chúng phải có chung điều gì?'],
      solution: 'Góc là hình gồm hai tia chung gốc; gốc chung là đỉnh, hai tia là hai cạnh.',
    },
    {
      type: 'text',
      prompt: 'Góc $MIN$ có đỉnh là điểm nào? (Viết tên điểm.)',
      accept: ['I', 'điểm I', 'đỉnh I'],
      hints: ['Trong tên góc viết bằng ba chữ, chữ ở giữa là đỉnh.'],
      solution:
        'Chữ ở giữa của $MIN$ là $I$, nên góc $MIN$ có đỉnh $I$, hai cạnh là tia $IM$, $IN$.',
    },
    {
      type: 'multi',
      prompt: 'Góc có đỉnh $O$, hai cạnh $Om$ và $On$. Chọn tất cả các cách viết đúng tên góc này.',
      options: [
        '$\\widehat{mOn}$',
        '$\\widehat{nOm}$',
        '$\\widehat{Omn}$',
        '$\\widehat{mnO}$',
        '$\\angle mOn$',
      ],
      answers: [0, 1, 4],
      hints: ['Đỉnh phải đứng giữa; thứ tự hai cạnh có thể đổi.'],
      solution:
        'Viết đúng: $\\widehat{mOn}$, $\\widehat{nOm}$, $\\angle mOn$. Hai cách $\\widehat{Omn}$, $\\widehat{mnO}$ sai vì chữ ở giữa không phải đỉnh $O$.',
    },
    {
      type: 'choice',
      prompt: 'Điểm $O$ nằm trên đường thẳng $xy$. Góc $xOy$ là',
      options: ['góc bẹt', 'không phải là góc', 'góc có hai cạnh trùng nhau', 'góc có đỉnh $x$'],
      answer: 0,
      hints: ['$O$ nằm trên $xy$ thì hai tia $Ox$, $Oy$ có quan hệ gì?'],
      solution:
        '$O$ thuộc đường thẳng $xy$ nên $Ox$ và $Oy$ là hai tia đối nhau. Góc có hai cạnh là hai tia đối nhau là góc bẹt.',
    },
    {
      type: 'number',
      prompt:
        'Vẽ bốn tia chung gốc $Oa$, $Ob$, $Oc$, $Od$ phân biệt. Có bao nhiêu góc có đỉnh $O$ và hai cạnh là hai trong bốn tia đó?',
      answer: 6,
      hints: [
        'Mỗi góc ứng với một cặp tia.',
        'Mỗi tia ghép với $3$ tia còn lại, nhưng mỗi góc bị đếm hai lần.',
      ],
      solution:
        'Có $4 \\cdot 3 = 12$ lần ghép, mỗi góc bị đếm hai lần: $12 : 2 = 6$ góc, gồm $aOb$, $aOc$, $aOd$, $bOc$, $bOd$, $cOd$.',
    },
    {
      type: 'number',
      prompt:
        'Trên đường thẳng $xy$ lấy điểm $O$, vẽ thêm tia $Oz$ không nằm trên $xy$. Có bao nhiêu góc có đỉnh $O$ (kể cả góc bẹt) được tạo bởi ba tia $Ox$, $Oy$, $Oz$?',
      answer: 3,
      hints: ['Kể các cặp tia. Cặp $Ox$, $Oy$ cũng tạo thành một góc.'],
      solution: 'Ba cặp tia cho ba góc: $xOz$, $zOy$ và góc bẹt $xOy$ (vì $Ox$, $Oy$ đối nhau).',
    },
    {
      type: 'multi',
      prompt:
        'Cho góc $xOy$ không bẹt, $A$ thuộc tia $Ox$, $B$ thuộc tia $Oy$ ($A$, $B$ khác $O$), $I$ nằm giữa $A$ và $B$. Chọn tất cả các điểm nằm trong góc $xOy$.',
      options: ['$O$', '$A$', '$B$', '$I$'],
      answers: [3],
      hints: ['Đỉnh và các điểm trên cạnh có phải điểm trong không?'],
      solution:
        '$O$ là đỉnh, $A$ và $B$ nằm trên hai cạnh nên không phải điểm trong. Chỉ $I$ (nằm giữa $A$ và $B$) nằm trong góc $xOy$.',
    },
    {
      type: 'choice',
      prompt:
        'Điểm $M$ nằm trong góc $xOy$. Lấy điểm $N$ trên tia $OM$, $N$ khác $O$. Khẳng định nào đúng?',
      options: [
        '$N$ nằm trong góc $xOy$',
        '$N$ nằm trên cạnh $Ox$',
        '$N$ nằm ngoài góc $xOy$',
        'Không biết được vì chưa biết $ON$',
      ],
      answer: 0,
      hints: ['Tia $OM$ nằm hẳn trong phần bên trong của góc, trừ gốc $O$.'],
      solution:
        'Vì $M$ nằm trong góc $xOy$ nên mọi điểm khác $O$ của tia $OM$ đều nằm trong góc đó; vậy $N$ nằm trong góc $xOy$, dù $ON$ dài hay ngắn.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đồ vật với phần đóng vai trò đỉnh của góc.',
      left: ['Chiếc kéo đang mở', 'Chiếc compa đang mở', 'Hai kim đồng hồ'],
      right: [
        'Trục quay của hai lưỡi kéo',
        'Khớp nối hai chân compa',
        'Trục gắn hai kim ở tâm mặt đồng hồ',
        'Đầu nhọn của lưỡi kéo',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Đỉnh là điểm chung mà hai "cạnh" cùng xuất phát.'],
      solution:
        'Hai lưỡi kéo là hai cạnh, trục kéo là đỉnh; hai chân compa là hai cạnh, khớp nối là đỉnh; hai kim là hai cạnh, trục ở tâm là đỉnh.',
    },
  ],
  takeaways: [
    'Góc là hình gồm hai tia chung gốc; gốc chung là đỉnh, hai tia là hai cạnh.',
    'Góc $xOy$ kí hiệu $\\widehat{xOy}$ hoặc $\\angle xOy$; chữ chỉ đỉnh viết ở giữa.',
    'Góc có hai cạnh là hai tia đối nhau là góc bẹt.',
    'Điểm nằm trong góc $xOy$ (không bẹt) thuộc phần "kẹp giữa" hai cạnh; đỉnh và điểm trên cạnh không phải điểm trong.',
  ],
};
