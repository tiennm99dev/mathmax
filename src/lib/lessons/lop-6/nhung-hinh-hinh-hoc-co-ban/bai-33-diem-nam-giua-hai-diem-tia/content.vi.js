/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Điểm nằm giữa hai điểm, hai điểm nằm cùng phía và khác phía đối với một điểm; tia, tia đối nhau và hai tia trùng nhau.',
  intro:
    'Ba cây cột điện dọc một con đường thẳng: cột ở giữa che khuất cột xa nhất khi em đứng sát cột gần nhất. Trong ba điểm thẳng hàng luôn có đúng một điểm "đứng giữa". Một điểm trên đường thẳng còn chia đường thẳng thành hai nửa; mỗi nửa ấy là một tia, giống như tia nắng phát ra từ một điểm và đi mãi về một phía.',
  objectives: [
    'Nhận biết điểm nằm giữa hai điểm; hai điểm nằm cùng phía, khác phía đối với một điểm.',
    'Nhận biết tia, gọi tên và vẽ tia.',
    'Nhận biết hai tia đối nhau và hai tia trùng nhau.',
  ],
  sections: [
    {
      heading: 'Điểm nằm giữa hai điểm',
      blocks: [
        {
          type: 'p',
          text: 'Trên đường thẳng $d$ lấy ba điểm $A$, $C$, $B$ theo thứ tự đó (điểm $C$ ở giữa). Ta nói điểm $C$ nằm giữa hai điểm $A$ và $B$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Cùng phía, khác phía',
          text: 'Khi điểm $C$ nằm giữa hai điểm $A$ và $B$, ta cũng nói: hai điểm $A$ và $C$ nằm cùng phía đối với điểm $B$; hai điểm $B$ và $C$ nằm cùng phía đối với điểm $A$; hai điểm $A$ và $B$ nằm khác phía đối với điểm $C$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhận xét',
          text: 'Trong ba điểm thẳng hàng, có một và chỉ một điểm nằm giữa hai điểm còn lại.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Chỉ nói đến "điểm nằm giữa" khi ba điểm thẳng hàng. Với ba đỉnh của một tam giác, không có điểm nào nằm giữa hai điểm kia.',
        },
      ],
    },
    {
      heading: 'Tia',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Điểm $O$ trên đường thẳng $xy$ chia đường thẳng thành hai phần. Mỗi phần cùng với điểm $O$ được gọi là một tia gốc $O$.',
        },
        {
          type: 'list',
          items: [
            'Hai tia gốc $O$ trên đường thẳng $xy$ là tia $Ox$ và tia $Oy$. Khi đọc hay viết tên tia, phải đọc (viết) tên gốc trước.',
            'Tia $OA$ là tia gốc $O$ đi qua điểm $A$. Tia không bị giới hạn về phía không chứa gốc: khi vẽ, ta vẽ một phần đường thẳng bắt đầu từ gốc $O$ và kéo dài về một phía.',
            'Tia $AB$ (gốc $A$) và tia $BA$ (gốc $B$) là hai tia khác nhau.',
          ],
        },
      ],
    },
    {
      heading: 'Tia đối nhau, tia trùng nhau',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai tia đối nhau',
          text: 'Hai tia chung gốc $Ox$ và $Oy$ tạo thành đường thẳng $xy$ được gọi là hai tia đối nhau.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhận xét',
          text: 'Nếu điểm $O$ nằm giữa hai điểm $A$ và $B$ thì hai tia $OA$ và $OB$ đối nhau. Nếu hai điểm $A$ và $B$ nằm cùng phía đối với điểm $O$ (trên một đường thẳng đi qua $O$) thì hai tia $OA$ và $OB$ trùng nhau.',
        },
        {
          type: 'table',
          caption: 'Ba điểm $A$, $B$, $C$ trên đường thẳng $xy$ theo thứ tự từ $x$ đến $y$',
          head: ['Gốc', 'Tia về phía $x$', 'Tia về phía $y$'],
          rows: [
            ['$A$', 'tia $Ax$', 'tia $Ay$ (trùng tia $AB$, tia $AC$)'],
            ['$B$', 'tia $Bx$ (trùng tia $BA$)', 'tia $By$ (trùng tia $BC$)'],
            ['$C$', 'tia $Cx$ (trùng tia $CA$, tia $CB$)', 'tia $Cy$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Hai tia đối nhau phải chung gốc. Tia $AB$ và tia $BA$ nằm trên cùng một đường thẳng nhưng không chung gốc, nên không phải hai tia đối nhau.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo điểm trên đường thẳng',
    instruction:
      'Kéo ba điểm $O$, $A$, $B$ dọc đường thẳng $xy$ (hoặc chọn một điểm rồi dùng phím mũi tên). Bảng cho biết điểm nào nằm giữa hai điểm còn lại và hai tia $OA$, $OB$ đối nhau hay trùng nhau. Hãy hoàn thành ba thử thách.',
  },
  examples: [
    {
      problem:
        'Trên đường thẳng $d$ lấy bốn điểm $A$, $B$, $C$, $D$ theo thứ tự đó. a) Điểm nào nằm giữa $A$ và $C$? b) Hai điểm $A$ và $B$ nằm cùng phía hay khác phía đối với $C$? c) Hai điểm $B$ và $D$ nằm cùng phía hay khác phía đối với $C$?',
      steps: [
        'a) Theo thứ tự $A$, $B$, $C$ thì $B$ ở giữa, nên $B$ nằm giữa $A$ và $C$.',
        'b) $A$ và $B$ đều ở bên trái $C$ nên chúng nằm cùng phía đối với $C$.',
        'c) $B$ ở bên trái, $D$ ở bên phải $C$, tức $C$ nằm giữa $B$ và $D$.',
      ],
      answer:
        'a) Điểm $B$. b) Cùng phía đối với $C$. c) Khác phía đối với $C$ (vì $C$ nằm giữa $B$ và $D$).',
    },
    {
      problem:
        'Điểm $O$ nằm trên đường thẳng $xy$. Lấy điểm $A$ thuộc tia $Ox$ và điểm $B$ thuộc tia $Oy$ ($A$, $B$ khác $O$). Hai tia $OA$ và $OB$ có đối nhau không? Điểm nào nằm giữa hai điểm còn lại?',
      steps: [
        '$A$ thuộc tia $Ox$ và khác $O$ nên tia $OA$ trùng với tia $Ox$; tương tự tia $OB$ trùng với tia $Oy$.',
        'Hai tia $Ox$ và $Oy$ đối nhau, nên hai tia $OA$ và $OB$ đối nhau.',
        '$A$ và $B$ nằm ở hai phía của $O$ trên đường thẳng $xy$, nên $O$ nằm giữa $A$ và $B$.',
      ],
      answer: 'Tia $OA$ và tia $OB$ đối nhau; điểm $O$ nằm giữa $A$ và $B$.',
    },
    {
      problem:
        'Trên đường thẳng $xy$ lấy ba điểm $A$, $B$, $C$ theo thứ tự đó. Có bao nhiêu tia phân biệt có gốc là một trong ba điểm $A$, $B$, $C$ và nằm trên đường thẳng $xy$?',
      steps: [
        'Mỗi điểm trên $xy$ là gốc của đúng hai tia: một tia về phía $x$, một tia về phía $y$.',
        'Gốc $A$: tia $Ax$, tia $Ay$. Gốc $B$: tia $Bx$, tia $By$. Gốc $C$: tia $Cx$, tia $Cy$.',
        'Các tia như $AB$, $AC$ đều trùng với tia $Ay$ nên không đếm thêm.',
      ],
      answer: 'Có $3 \\cdot 2 = 6$ tia phân biệt.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Ba điểm $A$, $B$, $C$ thẳng hàng và $B$ nằm giữa $A$ và $C$. Khẳng định nào đúng?',
      options: [
        'Hai điểm $A$ và $C$ nằm cùng phía đối với $B$.',
        'Hai điểm $A$ và $B$ nằm cùng phía đối với $C$.',
        'Hai điểm $B$ và $C$ nằm khác phía đối với $A$.',
        'Điểm $A$ nằm giữa $B$ và $C$.',
      ],
      answer: 1,
      hints: ['Vẽ đường thẳng và đặt ba điểm theo thứ tự $A$, $B$, $C$.'],
      solution:
        'Theo thứ tự $A$, $B$, $C$: $A$ và $B$ cùng ở một bên của $C$, nên cùng phía đối với $C$. $A$ và $C$ khác phía đối với $B$; $B$ và $C$ cùng phía đối với $A$; điểm nằm giữa là $B$, không phải $A$.',
    },
    {
      type: 'choice',
      prompt: 'Trong ba điểm thẳng hàng, có bao nhiêu điểm nằm giữa hai điểm còn lại?',
      options: ['Không có điểm nào', 'Một và chỉ một điểm', 'Hai điểm', 'Cả ba điểm'],
      answer: 1,
      hints: ['Xếp ba điểm trên một đường thẳng: điểm nào đứng giữa?'],
      solution: 'Trong ba điểm thẳng hàng, có một và chỉ một điểm nằm giữa hai điểm còn lại.',
    },
    {
      type: 'text',
      prompt:
        'Hai tia chung gốc $Ox$ và $Oy$ tạo thành đường thẳng $xy$. Hai tia $Ox$, $Oy$ được gọi là hai tia gì? (Điền một cụm từ.)',
      accept: ['đối nhau', 'hai tia đối nhau', 'tia đối nhau', 'tia đối'],
      hints: ['Hai tia này chung gốc và đi về hai hướng ngược nhau.'],
      solution: 'Hai tia chung gốc tạo thành một đường thẳng là hai tia đối nhau.',
    },
    {
      type: 'choice',
      prompt:
        'Ba điểm $M$, $N$, $P$ thẳng hàng, $N$ nằm giữa $M$ và $P$. Tia nào trùng với tia $MN$?',
      options: ['Tia $NM$', 'Tia $MP$', 'Tia $NP$', 'Tia $PM$'],
      answer: 1,
      hints: [
        'Hai tia trùng nhau phải chung gốc. Gốc của tia $MN$ là điểm nào?',
        '$N$ và $P$ nằm cùng phía hay khác phía đối với $M$?',
      ],
      solution:
        '$N$ nằm giữa $M$ và $P$ nên $N$ và $P$ nằm cùng phía đối với $M$. Do đó tia $MN$ và tia $MP$ (cùng gốc $M$) trùng nhau.',
    },
    {
      type: 'choice',
      prompt: 'Cho hai điểm phân biệt $A$, $B$. Hai tia $AB$ và $BA$ là',
      options: [
        'hai tia trùng nhau',
        'hai tia đối nhau',
        'hai tia khác nhau và không đối nhau',
        'cùng một đoạn thẳng',
      ],
      answer: 2,
      hints: [
        'Gốc của tia $AB$ là $A$, gốc của tia $BA$ là $B$.',
        'Hai tia đối nhau phải chung gốc.',
      ],
      solution:
        'Tia $AB$ có gốc $A$, tia $BA$ có gốc $B$. Hai tia không chung gốc nên không trùng nhau và không đối nhau: đó là hai tia khác nhau.',
    },
    {
      type: 'multi',
      prompt:
        'Trên một đường thẳng lấy bốn điểm $M$, $N$, $P$, $Q$ theo thứ tự đó. Chọn tất cả các cặp tia đối nhau.',
      options: [
        'Tia $NM$ và tia $NP$',
        'Tia $NP$ và tia $NQ$',
        'Tia $PN$ và tia $PQ$',
        'Tia $MN$ và tia $MQ$',
        'Tia $QM$ và tia $QN$',
      ],
      answers: [0, 2],
      hints: [
        'Hai tia chung gốc $O$ là $OA$, $OB$ đối nhau khi $O$ nằm giữa $A$ và $B$.',
        'Với từng cặp, xem gốc có nằm giữa hai điểm còn lại không.',
      ],
      solution:
        '$N$ nằm giữa $M$ và $P$: $NM$, $NP$ đối nhau. $P$ nằm giữa $N$ và $Q$: $PN$, $PQ$ đối nhau. $P$ và $Q$ cùng phía đối với $N$ nên $NP$, $NQ$ trùng nhau; tương tự $MN$, $MQ$ trùng nhau và $QM$, $QN$ trùng nhau.',
    },
    {
      type: 'number',
      prompt:
        'Trên đường thẳng $xy$ lấy bốn điểm phân biệt. Có bao nhiêu tia phân biệt có gốc là một trong bốn điểm đó và nằm trên $xy$?',
      answer: 8,
      hints: ['Mỗi điểm là gốc của hai tia trên $xy$: một tia về phía $x$, một tia về phía $y$.'],
      solution:
        'Mỗi điểm là gốc của đúng hai tia nằm trên $xy$, các tia có gốc khác nhau thì khác nhau. Vậy có $4 \\cdot 2 = 8$ tia.',
    },
    {
      type: 'number',
      prompt:
        'Trên một đường thẳng lấy năm điểm phân biệt. Có bao nhiêu cặp tia đối nhau có gốc là một trong năm điểm đó?',
      answer: 5,
      hints: ['Mỗi điểm trên đường thẳng là gốc của bao nhiêu cặp tia đối nhau?'],
      solution:
        'Mỗi điểm chia đường thẳng thành hai tia đối nhau, nên mỗi điểm cho đúng một cặp. Năm điểm cho $5$ cặp tia đối nhau.',
    },
  ],
  takeaways: [
    'Trong ba điểm thẳng hàng, có một và chỉ một điểm nằm giữa hai điểm còn lại.',
    '$C$ nằm giữa $A$ và $B$: $A$, $B$ khác phía đối với $C$; $A$, $C$ cùng phía đối với $B$.',
    'Điểm $O$ trên đường thẳng chia nó thành hai tia gốc $O$; tên tia đọc gốc trước: tia $OA$ có gốc $O$.',
    'Hai tia chung gốc tạo thành một đường thẳng là hai tia đối nhau; $O$ nằm giữa $A$ và $B$ thì $OA$, $OB$ đối nhau, $A$ và $B$ cùng phía đối với $O$ thì $OA$, $OB$ trùng nhau.',
  ],
};
