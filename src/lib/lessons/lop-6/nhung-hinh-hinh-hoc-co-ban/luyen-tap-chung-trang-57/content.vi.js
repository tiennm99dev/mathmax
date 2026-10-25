/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về điểm và đường thẳng, điểm nằm giữa hai điểm và tia, đoạn thẳng và độ dài đoạn thẳng, trung điểm của đoạn thẳng.',
  intro:
    'Bài luyện tập này ôn lại bốn bài vừa học: điểm và đường thẳng (Bài 32), điểm nằm giữa hai điểm và tia (Bài 33), đoạn thẳng và độ dài đoạn thẳng (Bài 34), trung điểm của đoạn thẳng (Bài 35). Em sẽ đếm đường thẳng, tia, đoạn thẳng, nhận biết vị trí các điểm trên đường thẳng và tính độ dài đoạn thẳng.',
  objectives: [
    'Dùng đúng kí hiệu $\\in$, $\\notin$; nhận biết ba điểm thẳng hàng, hai đường thẳng cắt nhau, song song.',
    'Xác định điểm nằm giữa hai điểm; nhận biết tia, hai tia đối nhau, hai tia trùng nhau.',
    'Tính độ dài đoạn thẳng nhờ $AM + MB = AB$ và nhờ trung điểm.',
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
              'Điểm, đường thẳng',
              '$A \\in d$: $A$ thuộc $d$; $B \\notin d$: $B$ không thuộc $d$. Qua hai điểm phân biệt có một và chỉ một đường thẳng.',
            ],
            [
              'Thẳng hàng',
              'Ba điểm cùng thuộc một đường thẳng thì thẳng hàng; trong ba điểm thẳng hàng có một và chỉ một điểm nằm giữa hai điểm còn lại.',
            ],
            [
              'Hai đường thẳng',
              'Có đúng một điểm chung: cắt nhau (điểm chung là giao điểm); không có điểm chung: song song.',
            ],
            [
              'Tia',
              'Điểm $O$ trên đường thẳng $xy$ chia nó thành hai tia đối nhau $Ox$, $Oy$. $O$ nằm giữa $A$ và $B$ thì tia $OA$, $OB$ đối nhau; $A$, $B$ cùng phía đối với $O$ thì tia $OA$, $OB$ trùng nhau.',
            ],
            [
              'Đoạn thẳng',
              'Đoạn thẳng $AB$ gồm hai mút $A$, $B$ và mọi điểm nằm giữa $A$, $B$. Nếu $M$ nằm giữa $A$ và $B$ thì $AM + MB = AB$.',
            ],
            [
              'Trung điểm',
              '$M$ là trung điểm của $AB$ khi $M$ nằm giữa $A$, $B$ và $MA = MB$; khi đó $MA = MB = \\dfrac{AB}{2}$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Tên tia phải đọc gốc trước: tia $AB$ và tia $BA$ là hai tia khác nhau, và chúng không đối nhau vì không chung gốc. Còn $MA = MB$ thôi chưa đủ để $M$ là trung điểm của $AB$: điểm $M$ còn phải nằm giữa $A$ và $B$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện ngẫu nhiên',
    instruction:
      'Mỗi lượt có $12$ câu trộn từ Bài 32, Bài 33, Bài 34 và Bài 35; đáp án là một số tự nhiên. Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng cho biết bài nào cần ôn thêm.',
  },
  examples: [
    {
      problem:
        'Trên đường thẳng $xy$ lấy ba điểm $A$, $B$, $C$ theo thứ tự đó, $AB = 3$ cm, $BC = 5$ cm. a) Kể tên hai tia gốc $B$ đối nhau. b) Tính $AC$. c) Gọi $M$ là trung điểm của $AC$. Tính $BM$.',
      steps: [
        'a) $B$ nằm giữa $A$ và $C$ nên hai tia $BA$ và $BC$ đối nhau (đó cũng là hai tia $Bx$ và $By$).',
        'b) $B$ nằm giữa $A$ và $C$ nên $AC = AB + BC = 3 + 5 = 8$ (cm).',
        'c) $M$ là trung điểm của $AC$ nên $AM = 8 : 2 = 4$ (cm).',
        '$AB = 3 < 4 = AM$, mà $B$, $M$ cùng nằm trên tia $AC$, nên $B$ nằm giữa $A$ và $M$: $BM = AM - AB = 4 - 3 = 1$ (cm).',
      ],
      answer: 'a) Tia $BA$ và tia $BC$. b) $AC = 8$ cm. c) $BM = 1$ cm.',
    },
    {
      problem:
        'Cho bốn điểm $A$, $B$, $C$, $D$, trong đó chỉ có ba điểm $B$, $C$, $D$ thẳng hàng. Kẻ các đường thẳng đi qua từng cặp điểm. Có bao nhiêu đường thẳng? Kể tên.',
      steps: [
        'Nếu không có ba điểm nào thẳng hàng thì có $4 \\cdot 3 : 2 = 6$ đường thẳng.',
        'Ba cặp $(B, C)$, $(B, D)$, $(C, D)$ chỉ cho một đường thẳng $BC$ (cũng là $BD$, $CD$).',
        'Số đường thẳng: $6 - 3 + 1 = 4$, gồm $AB$, $AC$, $AD$ và $BC$.',
      ],
      answer: 'Có $4$ đường thẳng: $AB$, $AC$, $AD$, $BC$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt:
        'Đường thẳng $a$ đi qua hai điểm $M$, $N$ và không đi qua điểm $P$. Chọn tất cả các cách viết đúng.',
      options: ['$M \\in a$', '$P \\in a$', '$N \\notin a$', '$P \\notin a$'],
      answers: [0, 3],
      hints: ['"$a$ đi qua $M$" nghĩa là $M$ thuộc $a$.'],
      solution:
        '$a$ đi qua $M$, $N$ nên $M \\in a$, $N \\in a$; $a$ không đi qua $P$ nên $P \\notin a$.',
    },
    {
      type: 'number',
      prompt:
        'Cho sáu điểm, trong đó không có ba điểm nào thẳng hàng. Kẻ các đường thẳng đi qua từng cặp điểm. Có bao nhiêu đường thẳng?',
      answer: 15,
      hints: ['Mỗi điểm ghép được với $5$ điểm còn lại.', 'Mỗi đường thẳng được đếm hai lần.'],
      solution:
        'Có $6 \\cdot 5 = 30$ cặp có thứ tự, mỗi đường thẳng được đếm hai lần: $30 : 2 = 15$ đường thẳng.',
    },
    {
      type: 'choice',
      prompt: 'Hai đường thẳng có hai điểm chung phân biệt thì',
      options: ['cắt nhau', 'song song', 'trùng nhau', 'không xác định được vị trí'],
      answer: 2,
      hints: ['Qua hai điểm phân biệt có bao nhiêu đường thẳng?'],
      solution:
        'Qua hai điểm phân biệt chỉ có một đường thẳng, nên hai đường thẳng cùng đi qua hai điểm đó là một: chúng trùng nhau.',
    },
    {
      type: 'text',
      prompt: 'Tia có gốc $O$ và đi qua điểm $A$ được gọi tên là tia gì? (Viết tên tia.)',
      accept: ['OA', 'tia OA'],
      hints: ['Khi gọi tên tia, viết tên gốc trước.'],
      solution: 'Tia gốc $O$ đi qua $A$ là tia $OA$ (không viết là tia $AO$).',
    },
    {
      type: 'choice',
      prompt:
        'Trên một đường thẳng lấy ba điểm $M$, $N$, $P$ theo thứ tự đó. Hai tia nào đối nhau?',
      options: [
        'Tia $MN$ và tia $MP$',
        'Tia $NM$ và tia $NP$',
        'Tia $PN$ và tia $PM$',
        'Tia $MN$ và tia $NM$',
      ],
      answer: 1,
      hints: ['Hai tia đối nhau phải chung gốc, và gốc nằm giữa hai điểm kia.'],
      solution:
        '$N$ nằm giữa $M$ và $P$, nên hai tia $NM$ và $NP$ (chung gốc $N$) đối nhau. Tia $MN$, $MP$ trùng nhau; tia $PN$, $PM$ trùng nhau; tia $MN$, $NM$ không chung gốc.',
    },
    {
      type: 'number',
      prompt: 'Điểm $M$ nằm giữa $A$ và $B$, $AM = 2{,}5$ cm, $MB = 3{,}5$ cm. Tính $AB$ (cm).',
      answer: 6,
      unit: 'cm',
      hints: ['$AM + MB = AB$.'],
      solution: '$AB = AM + MB = 2{,}5 + 3{,}5 = 6$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Trên một đường thẳng lấy ba điểm $A$, $B$, $C$ theo thứ tự đó, $AB = 4$ cm, $AC = 9$ cm. Tính $BC$ (cm).',
      answer: 5,
      unit: 'cm',
      hints: ['Điểm nào nằm giữa hai điểm còn lại?'],
      solution: '$B$ nằm giữa $A$ và $C$ nên $AB + BC = AC$, suy ra $BC = 9 - 4 = 5$ (cm).',
    },
    {
      type: 'order',
      prompt:
        'Trên tia $Ox$ lấy ba điểm $A$, $B$, $C$ với $OA = 2$ cm, $OB = 5$ cm, $OC = 3{,}5$ cm. Sắp xếp bốn điểm theo thứ tự trên tia, bắt đầu từ gốc $O$.',
      items: ['$O$', '$A$', '$B$', '$C$'],
      answer: [0, 1, 3, 2],
      hints: ['Trên cùng một tia, điểm nào cách gốc càng xa thì càng ở xa phía sau.'],
      solution:
        'Các điểm cùng nằm trên tia $Ox$, nên điểm nào có khoảng cách tới $O$ lớn hơn thì ở xa hơn: $OA = 2 < OC = 3{,}5 < OB = 5$. Thứ tự là $O$, $A$, $C$, $B$.',
    },
    {
      type: 'choice',
      prompt:
        'Điểm $O$ nằm trên đường thẳng $xy$. Lấy $A$ trên tia $Ox$ và $B$ trên tia $Oy$ sao cho $OA = OB = 4$ cm. Điểm $O$ có phải là trung điểm của đoạn thẳng $AB$ không?',
      options: [
        'Có, vì $O$ nằm giữa $A$, $B$ và $OA = OB$',
        'Không, vì $A$ và $B$ nằm cùng phía đối với $O$',
        'Không, vì $AB = 4$ cm',
      ],
      answer: 0,
      hints: ['Tia $Ox$ và $Oy$ đối nhau, vậy $A$, $B$ nằm cùng phía hay khác phía đối với $O$?'],
      solution:
        '$A$, $B$ nằm trên hai tia đối nhau $Ox$, $Oy$ nên $O$ nằm giữa $A$ và $B$; lại có $OA = OB$. Vậy $O$ là trung điểm của $AB$, và $AB = 4 + 4 = 8$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Cho đoạn thẳng $AB = 9$ cm, $M$ là trung điểm của $AB$, $N$ là trung điểm của $MB$. Tính $AN$ (cm).',
      answer: 6.75,
      unit: 'cm',
      hints: ['Tính $AM$, $MB$ trước, rồi $MN$.', '$M$ nằm giữa $A$ và $N$, nên $AN = AM + MN$.'],
      solution:
        '$AM = MB = 9 : 2 = 4{,}5$ (cm); $MN = 4{,}5 : 2 = 2{,}25$ (cm). $M$ nằm giữa $A$ và $N$ nên $AN = AM + MN = 4{,}5 + 2{,}25 = 6{,}75$ (cm).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hình với cách mô tả đúng của nó.',
      left: ['Đường thẳng $AB$', 'Tia $AB$', 'Đoạn thẳng $AB$'],
      right: [
        'Không bị giới hạn về cả hai phía',
        'Gồm điểm $A$ và một phần đường thẳng kéo dài mãi về phía $B$',
        'Gồm hai mút $A$, $B$ và mọi điểm nằm giữa $A$, $B$',
        'Gồm mọi điểm không thuộc đường thẳng $AB$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Hình nào có hai đầu mút? Hình nào có một gốc?'],
      solution:
        'Đường thẳng $AB$ không bị giới hạn về hai phía; tia $AB$ có gốc $A$ và kéo dài mãi về phía $B$; đoạn thẳng $AB$ bị giới hạn bởi hai mút $A$, $B$.',
    },
  ],
  takeaways: [
    'Từ $n$ điểm có $n \\cdot (n - 1) : 2$ đoạn thẳng nối từng cặp điểm; nếu không có ba điểm nào thẳng hàng thì cũng có ngần ấy đường thẳng.',
    'Điểm nằm giữa quyết định tia đối nhau và phép cộng độ dài: $O$ nằm giữa $A$, $B$ thì $OA$, $OB$ đối nhau và $AO + OB = AB$.',
    'Trung điểm chia đôi đoạn thẳng: $MA = MB = \\dfrac{AB}{2}$.',
  ],
};
