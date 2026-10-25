/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đặc điểm về cạnh, góc, đường chéo của hình chữ nhật, hình thoi, hình bình hành, hình thang cân; cách vẽ và cách phân biệt các tứ giác này.',
  intro:
    'Mặt bàn học hình chữ nhật, con diều hình thoi, cái thang gấp nhìn nghiêng thành hình thang cân, những ô cửa sổ xếp nghiêng thành hình bình hành. Bốn hình này đều có bốn cạnh, nhưng mỗi hình có những đặc điểm riêng về cạnh, góc và đường chéo. Nắm được các đặc điểm đó, em sẽ vẽ được và gọi đúng tên từng hình.',
  objectives: [
    'Nêu được đặc điểm về cạnh, góc, đường chéo của hình chữ nhật, hình thoi, hình bình hành, hình thang cân.',
    'Vẽ được hình chữ nhật, hình thoi, hình bình hành bằng thước, êke và compa.',
    'Phân biệt các tứ giác đã học dựa vào đặc điểm của chúng.',
  ],
  sections: [
    {
      heading: 'Hình chữ nhật',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình chữ nhật',
          text: 'Hình chữ nhật $ABCD$ có các đặc điểm sau.',
        },
        {
          type: 'list',
          items: [
            'Bốn góc ở các đỉnh $A$, $B$, $C$, $D$ bằng nhau và đều là góc vuông.',
            'Các cạnh đối bằng nhau: $AB = CD$, $BC = AD$.',
            'Hai cạnh đối $AB$ và $CD$ song song; hai cạnh đối $AD$ và $BC$ song song.',
            'Hai đường chéo bằng nhau: $AC = BD$.',
          ],
        },
        {
          type: 'p',
          text: 'Vẽ hình chữ nhật $ABCD$ có $AB = 5$ cm, $AD = 3$ cm bằng thước và êke:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ đoạn thẳng $AB = 5$ cm.',
            'Vẽ đường thẳng vuông góc với $AB$ tại $A$. Trên đó lấy điểm $D$ sao cho $AD = 3$ cm.',
            'Vẽ đường thẳng vuông góc với $AB$ tại $B$. Trên đó lấy điểm $C$ (cùng phía với $D$) sao cho $BC = 3$ cm.',
            'Nối $D$ với $C$. Ta được hình chữ nhật $ABCD$.',
          ],
        },
      ],
    },
    {
      heading: 'Hình thoi',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình thoi',
          text: 'Hình thoi $ABCD$ có các đặc điểm sau.',
        },
        {
          type: 'list',
          items: [
            'Bốn cạnh bằng nhau: $AB = BC = CD = DA$.',
            'Hai cạnh đối $AB$ và $CD$ song song; hai cạnh đối $AD$ và $BC$ song song.',
            'Hai đường chéo $AC$ và $BD$ vuông góc với nhau.',
            'Các góc đối bằng nhau: góc ở đỉnh $A$ bằng góc ở đỉnh $C$, góc ở đỉnh $B$ bằng góc ở đỉnh $D$.',
          ],
        },
        {
          type: 'p',
          text: 'Vẽ hình thoi $ABCD$ có cạnh $3$ cm bằng thước và compa:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ đoạn thẳng $AB = 3$ cm.',
            'Vẽ một đường thẳng đi qua $B$ (khác đường thẳng $AB$). Trên đó lấy điểm $C$ sao cho $BC = 3$ cm.',
            'Vẽ cung tròn tâm $A$ bán kính $3$ cm và cung tròn tâm $C$ bán kính $3$ cm; hai cung cắt nhau tại điểm $D$ (khác $B$).',
            'Nối $A$ với $D$ và $C$ với $D$. Ta được hình thoi $ABCD$.',
          ],
        },
      ],
    },
    {
      heading: 'Hình bình hành',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình bình hành',
          text: 'Hình bình hành $ABCD$ có các đặc điểm sau.',
        },
        {
          type: 'list',
          items: [
            'Các cạnh đối bằng nhau: $AB = CD$, $AD = BC$.',
            'Hai cạnh đối $AB$ và $CD$ song song; hai cạnh đối $AD$ và $BC$ song song.',
            'Các góc đối bằng nhau: góc ở đỉnh $A$ bằng góc ở đỉnh $C$, góc ở đỉnh $B$ bằng góc ở đỉnh $D$.',
            'Hai đường chéo cắt nhau tại trung điểm $O$ của mỗi đường: $OA = OC$, $OB = OD$.',
          ],
        },
        {
          type: 'p',
          text: 'Vẽ hình bình hành $ABCD$ có $AB = 4$ cm, $AD = 3$ cm bằng thước:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ đoạn thẳng $AB = 4$ cm.',
            'Vẽ một đường thẳng đi qua $A$ (khác đường thẳng $AB$). Trên đó lấy điểm $D$ sao cho $AD = 3$ cm.',
            'Vẽ đường thẳng đi qua $D$ và song song với $AB$. Trên đó lấy điểm $C$ (cùng phía với $B$ so với đường thẳng $AD$) sao cho $DC = 4$ cm.',
            'Nối $B$ với $C$. Ta được hình bình hành $ABCD$.',
          ],
        },
      ],
    },
    {
      heading: 'Hình thang cân',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình thang cân',
          text: 'Hình thang cân $ABCD$ (đáy lớn $AB$, đáy nhỏ $CD$) có các đặc điểm sau.',
        },
        {
          type: 'list',
          items: [
            'Hai cạnh bên bằng nhau: $AD = BC$.',
            'Hai cạnh đáy song song với nhau: $AB$ song song với $CD$.',
            'Hai đường chéo bằng nhau: $AC = BD$.',
            'Hai góc kề với mỗi đáy bằng nhau: góc ở đỉnh $A$ bằng góc ở đỉnh $B$, góc ở đỉnh $C$ bằng góc ở đỉnh $D$.',
          ],
        },
      ],
    },
    {
      heading: 'Phân biệt các tứ giác',
      blocks: [
        {
          type: 'table',
          head: ['Đặc điểm', 'Hình chữ nhật', 'Hình thoi', 'Hình bình hành', 'Hình thang cân'],
          rows: [
            ['Bốn cạnh bằng nhau', 'Không nhất thiết', 'Có', 'Không nhất thiết', 'Không'],
            ['Các cạnh đối song song', 'Có', 'Có', 'Có', 'Chỉ hai đáy'],
            ['Bốn góc vuông', 'Có', 'Không nhất thiết', 'Không nhất thiết', 'Không'],
            ['Hai đường chéo bằng nhau', 'Có', 'Không nhất thiết', 'Không nhất thiết', 'Có'],
            [
              'Hai đường chéo vuông góc',
              'Không nhất thiết',
              'Có',
              'Không nhất thiết',
              'Không nhất thiết',
            ],
          ],
          caption: '"Không nhất thiết": có hình có đặc điểm này, có hình không có.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Hình vuông có đủ mọi đặc điểm của hình chữ nhật và của hình thoi. Hình chữ nhật và hình thoi đều có mọi đặc điểm của hình bình hành.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tứ giác biết tự gọi tên',
    instruction:
      'Chọn một thử thách, rồi kéo bốn đỉnh $A$, $B$, $C$, $D$ trên lưới (hoặc chọn đỉnh bằng Tab và dùng phím mũi tên). Bảng bên dưới cho biết tứ giác có những đặc điểm nào và gọi đúng tên hình. Bấm các nút "Mẫu" để xem một hình có sẵn.',
  },
  examples: [
    {
      problem: 'Vẽ hình chữ nhật $MNPQ$ có $MN = 6$ cm và $NP = 4$ cm.',
      steps: [
        'Vẽ đoạn thẳng $MN = 6$ cm.',
        'Dùng êke vẽ đường thẳng vuông góc với $MN$ tại $N$, lấy điểm $P$ trên đó với $NP = 4$ cm.',
        'Dùng êke vẽ đường thẳng vuông góc với $MN$ tại $M$, lấy điểm $Q$ trên đó (cùng phía với $P$) với $MQ = 4$ cm.',
        'Nối $P$ với $Q$. Kiểm tra bằng thước: $PQ = 6$ cm và hai đường chéo $MP = NQ$.',
      ],
      answer: 'Ta được hình chữ nhật $MNPQ$ có hai cạnh $6$ cm và $4$ cm.',
    },
    {
      problem:
        'Cho hình thang cân $ABCD$ có đáy $AB$ và $CD$, cạnh bên $AD = 4$ cm, đường chéo $AC = 7$ cm. Tính $BC$ và $BD$.',
      steps: [
        'Hình thang cân có hai cạnh bên bằng nhau nên $BC = AD = 4$ cm.',
        'Hình thang cân có hai đường chéo bằng nhau nên $BD = AC = 7$ cm.',
      ],
      answer: '$BC = 4$ cm, $BD = 7$ cm.',
    },
    {
      problem:
        'Cho hình bình hành $ABCD$ có hai đường chéo cắt nhau tại $O$, biết $OA = 3$ cm và $OB = 5$ cm. Tính độ dài hai đường chéo $AC$ và $BD$.',
      steps: [
        'Hai đường chéo của hình bình hành cắt nhau tại trung điểm của mỗi đường nên $OC = OA = 3$ cm và $OD = OB = 5$ cm.',
        '$AC = OA + OC = 3 + 3 = 6$ (cm).',
        '$BD = OB + OD = 5 + 5 = 10$ (cm).',
      ],
      answer: '$AC = 6$ cm, $BD = 10$ cm.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi hình với một nhóm đặc điểm đúng của nó.',
      left: ['Hình chữ nhật', 'Hình thoi', 'Hình bình hành', 'Hình thang cân'],
      right: [
        'Hai cạnh bên bằng nhau, hai đáy song song',
        'Bốn góc vuông, hai đường chéo bằng nhau',
        'Các cạnh đối bằng nhau, hai đường chéo cắt nhau tại trung điểm mỗi đường',
        'Bốn cạnh bằng nhau, hai đường chéo vuông góc',
      ],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 2],
        [3, 0],
      ],
      hints: [
        'Hình nào có "cạnh bên" và "đáy"?',
        'Đường chéo vuông góc là dấu hiệu của hình thoi.',
      ],
      solution:
        'Hình chữ nhật: bốn góc vuông, hai đường chéo bằng nhau. Hình thoi: bốn cạnh bằng nhau, hai đường chéo vuông góc. Hình bình hành: các cạnh đối bằng nhau, hai đường chéo cắt nhau tại trung điểm mỗi đường. Hình thang cân: hai cạnh bên bằng nhau, hai đáy song song.',
    },
    {
      type: 'number',
      prompt: 'Hình chữ nhật $ABCD$ có đường chéo $AC = 10$ cm. Tính độ dài đường chéo $BD$.',
      answer: 10,
      unit: 'cm',
      hints: ['Nhớ lại đặc điểm về hai đường chéo của hình chữ nhật.'],
      solution: 'Hai đường chéo của hình chữ nhật bằng nhau nên $BD = AC = 10$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Hình bình hành $ABCD$ có hai đường chéo cắt nhau tại $O$ và $OB = 4$ cm. Tính độ dài đường chéo $BD$.',
      answer: 8,
      unit: 'cm',
      hints: ['$O$ là trung điểm của $BD$.', '$BD = OB + OD$ và $OD = OB$.'],
      solution: '$O$ là trung điểm của $BD$ nên $OD = OB = 4$ cm, do đó $BD = 4 + 4 = 8$ (cm).',
    },
    {
      type: 'number',
      prompt: 'Một hình thoi có chu vi $20$ cm. Mỗi cạnh của hình thoi dài bao nhiêu xăng-ti-mét?',
      answer: 5,
      unit: 'cm',
      hints: ['Hình thoi có bốn cạnh bằng nhau.'],
      solution: 'Cạnh hình thoi là $20 : 4 = 5$ (cm).',
    },
    {
      type: 'choice',
      prompt: 'Hình nào dưới đây luôn có hai đường chéo vuông góc với nhau?',
      options: ['Hình chữ nhật', 'Hình bình hành', 'Hình thoi', 'Hình thang cân'],
      answer: 2,
      hints: ['Trong widget, kéo các đỉnh và xem dấu ✓ ở dòng "Hai đường chéo vuông góc".'],
      solution:
        'Hình thoi luôn có hai đường chéo vuông góc. Hình chữ nhật, hình bình hành, hình thang cân chỉ có khi đặc biệt.',
    },
    {
      type: 'multi',
      prompt: 'Cho hình thang cân $ABCD$ có hai đáy $AB$ và $CD$. Chọn tất cả các khẳng định đúng.',
      options: [
        '$AD = BC$',
        '$AC = BD$',
        '$AB = CD$',
        'Góc ở đỉnh $A$ bằng góc ở đỉnh $B$',
        '$AB$ song song với $CD$',
      ],
      answers: [0, 1, 3, 4],
      hints: [
        'Hình thang cân có hai cạnh bên bằng nhau, hai đường chéo bằng nhau, hai đáy song song.',
        'Hai đáy thường có độ dài khác nhau.',
      ],
      solution:
        'Đúng: $AD = BC$, $AC = BD$, $AB$ song song $CD$, hai góc kề đáy $AB$ bằng nhau. Sai: $AB = CD$, vì đáy lớn và đáy nhỏ khác nhau.',
    },
    {
      type: 'number',
      prompt:
        'Hình bình hành $ABCD$ có $AB = 7$ cm, $BC = 5$ cm. Tính tổng độ dài bốn cạnh của hình bình hành.',
      answer: 24,
      unit: 'cm',
      hints: ['Các cạnh đối của hình bình hành bằng nhau: $CD = AB$, $DA = BC$.'],
      solution: '$CD = 7$ cm, $DA = 5$ cm. Tổng bốn cạnh: $7 + 5 + 7 + 5 = 24$ (cm).',
    },
    {
      type: 'text',
      prompt: 'Tứ giác có bốn góc vuông và bốn cạnh bằng nhau là hình gì?',
      accept: ['hình vuông', 'vuông'],
      hints: ['Bốn góc vuông: hình chữ nhật. Thêm bốn cạnh bằng nhau thì sao?'],
      solution: 'Đó là hình vuông.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn An nói: "Tứ giác có hai đường chéo bằng nhau thì chắc chắn là hình chữ nhật." Bạn An đúng hay sai?',
      options: [
        'Đúng, chỉ hình chữ nhật có hai đường chéo bằng nhau',
        'Sai, vì hình thang cân cũng có hai đường chéo bằng nhau',
        'Đúng, vì hình thoi cũng là hình chữ nhật',
      ],
      answer: 1,
      hints: ['Xem lại bảng so sánh: dòng "Hai đường chéo bằng nhau".'],
      solution:
        'Bạn An sai: hình thang cân (và hình vuông) cũng có hai đường chéo bằng nhau, mà hình thang cân không phải hình chữ nhật.',
    },
  ],
  takeaways: [
    'Hình chữ nhật: bốn góc vuông, các cạnh đối bằng nhau và song song, hai đường chéo bằng nhau.',
    'Hình thoi: bốn cạnh bằng nhau, các cạnh đối song song, các góc đối bằng nhau, hai đường chéo vuông góc.',
    'Hình bình hành: các cạnh đối bằng nhau và song song, các góc đối bằng nhau, hai đường chéo cắt nhau tại trung điểm mỗi đường.',
    'Hình thang cân: hai đáy song song, hai cạnh bên bằng nhau, hai đường chéo bằng nhau, hai góc kề mỗi đáy bằng nhau.',
  ],
};
