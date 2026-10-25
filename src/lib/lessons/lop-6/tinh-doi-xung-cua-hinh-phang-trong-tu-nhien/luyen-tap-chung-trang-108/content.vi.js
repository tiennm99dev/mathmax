/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: nhận biết hình có trục đối xứng, hình có tâm đối xứng, chỉ ra trục và tâm đối xứng của các hình phẳng và chữ cái, tính độ dài nhờ tính đối xứng.',
  intro:
    'Hai bài vừa học cho em hai cách kiểm tra tính đối xứng của một hình: gấp hình theo một đường thẳng (trục đối xứng) và quay hình nửa vòng quanh một điểm (tâm đối xứng). Bài luyện tập này giúp em dùng nhanh và đúng cả hai cách, phân biệt hình chỉ có trục, chỉ có tâm hay có cả hai.',
  objectives: [
    'Nhận biết hình có trục đối xứng, hình có tâm đối xứng và chỉ ra trục, tâm của chúng.',
    'Phân biệt hình có cả trục và tâm đối xứng, hình chỉ có một loại, hình không có loại nào.',
    'Dùng tính đối xứng để tính độ dài đoạn thẳng trong các hình đã học.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Số trục đối xứng', 'Tâm đối xứng'],
          rows: [
            ['Đoạn thẳng', '$2$', 'Trung điểm'],
            ['Tam giác đều', '$3$', 'Không có'],
            ['Hình vuông', '$4$', 'Giao điểm hai đường chéo'],
            ['Hình chữ nhật', '$2$', 'Giao điểm hai đường chéo'],
            ['Hình thoi', '$2$ (hai đường chéo)', 'Giao điểm hai đường chéo'],
            ['Hình bình hành (*)', 'Không có', 'Giao điểm hai đường chéo'],
            ['Hình thang cân', '$1$', 'Không có'],
            ['Lục giác đều', '$6$', 'Giao điểm ba đường chéo chính'],
            ['Hình tròn', 'Vô số', 'Tâm của hình tròn'],
          ],
          caption: '(*) Hình bình hành không phải hình chữ nhật, không phải hình thoi.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Tâm đối xứng $O$ là trung điểm của đoạn nối mỗi điểm với ảnh của nó khi quay nửa vòng. Với các tứ giác có tâm đối xứng, $O$ là trung điểm của mỗi đường chéo, nên $OA = \\dfrac{AC}{2}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $10$ câu mới, trộn đều từ Bài 21 và Bài 22. Đáp số là số tự nhiên, em chỉ cần gõ số.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề luyện tập trộn ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết em cần ôn lại bài nào.',
  },
  examples: [
    {
      problem:
        'Hình thoi $ABCD$ có hai đường chéo $AC = 8$ cm, $BD = 6$ cm cắt nhau tại $O$. Chỉ ra các trục đối xứng, tâm đối xứng của hình thoi và tính $OA$, $OB$.',
      steps: [
        'Hai trục đối xứng của hình thoi là hai đường chéo $AC$ và $BD$.',
        'Tâm đối xứng là giao điểm $O$ của hai đường chéo; $O$ là trung điểm của $AC$ và của $BD$.',
        '$OA = 8 : 2 = 4$ (cm), $OB = 6 : 2 = 3$ (cm).',
      ],
      answer: 'Trục đối xứng: $AC$, $BD$; tâm đối xứng: $O$; $OA = 4$ cm, $OB = 3$ cm.',
    },
    {
      problem:
        'Trong các hình: hình vuông, tam giác đều, hình bình hành (không phải hình chữ nhật, hình thoi), hình tròn, hình nào có trục đối xứng, hình nào có tâm đối xứng?',
      steps: [
        'Có trục đối xứng: hình vuông ($4$ trục), tam giác đều ($3$ trục), hình tròn (vô số trục).',
        'Có tâm đối xứng: hình vuông, hình bình hành (giao điểm hai đường chéo), hình tròn (tâm).',
        'Vậy hình vuông và hình tròn có cả hai; tam giác đều chỉ có trục; hình bình hành chỉ có tâm.',
      ],
      answer:
        'Hình vuông, hình tròn: có trục và có tâm. Tam giác đều: chỉ có trục. Hình bình hành: chỉ có tâm.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn tất cả các hình vừa có trục đối xứng vừa có tâm đối xứng.',
      options: [
        'Hình chữ nhật',
        'Tam giác đều',
        'Hình thoi',
        'Hình thang cân',
        'Hình tròn',
        'Hình bình hành có hai cạnh kề không bằng nhau và không có góc vuông',
      ],
      answers: [0, 2, 4],
      hints: [
        'Loại các hình không có tâm đối xứng: quay nửa vòng thì bị lộn ngược.',
        'Loại hình không có trục đối xứng: gấp theo đường nào cũng lệch.',
      ],
      solution:
        'Tam giác đều và hình thang cân không có tâm đối xứng; hình bình hành đó không có trục đối xứng. Còn lại hình chữ nhật, hình thoi, hình tròn có cả trục lẫn tâm.',
    },
    {
      type: 'choice',
      prompt: 'Tâm đối xứng của hình chữ nhật $ABCD$ là',
      options: [
        'giao điểm của hai đường chéo $AC$ và $BD$',
        'trung điểm của cạnh $AB$',
        'đỉnh $A$',
        'hình chữ nhật không có tâm đối xứng',
      ],
      answer: 0,
      hints: ['Quay nửa vòng quanh tâm thì $A$ phải đến đúng vị trí $C$.'],
      solution:
        'Hai đường chéo của hình chữ nhật cắt nhau tại trung điểm $O$ của mỗi đường. Quay nửa vòng quanh $O$ thì $A$ đến $C$, $B$ đến $D$: $O$ là tâm đối xứng.',
    },
    {
      type: 'number',
      prompt: 'Một hình vuông và một tam giác đều có tổng cộng bao nhiêu trục đối xứng?',
      answer: 7,
      hints: ['Hình vuông có bao nhiêu trục? Tam giác đều có bao nhiêu trục?'],
      solution: 'Hình vuông có $4$ trục, tam giác đều có $3$ trục: $4 + 3 = 7$.',
    },
    {
      type: 'number',
      prompt:
        'Hình thoi $ABCD$ có tâm đối xứng $O$, hai đường chéo $AC = 8$ cm và $BD = 6$ cm. Tính $OA + OB$.',
      answer: 7,
      unit: 'cm',
      hints: [
        'Tâm đối xứng của hình thoi là trung điểm của mỗi đường chéo.',
        'Tính $OA = AC : 2$ và $OB = BD : 2$.',
      ],
      solution: '$OA = 8 : 2 = 4$ (cm), $OB = 6 : 2 = 3$ (cm), nên $OA + OB = 4 + 3 = 7$ (cm).',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các chữ cái in hoa vừa có trục đối xứng vừa có tâm đối xứng.',
      options: ['H', 'N', 'O', 'A', 'X', 'S', 'T', 'I'],
      answers: [0, 2, 4, 7],
      hints: [
        'Trước hết tìm các chữ quay nửa vòng vẫn như cũ.',
        'Trong các chữ đó, bỏ những chữ không gấp được cho chồng khít (như $\\mathrm{N}$, $\\mathrm{S}$).',
      ],
      solution:
        'Có tâm đối xứng: $\\mathrm{H}$, $\\mathrm{N}$, $\\mathrm{O}$, $\\mathrm{X}$, $\\mathrm{S}$, $\\mathrm{I}$. Trong đó $\\mathrm{N}$ và $\\mathrm{S}$ không có trục. Vậy các chữ có cả hai là $\\mathrm{H}$, $\\mathrm{O}$, $\\mathrm{X}$, $\\mathrm{I}$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hình với đặc điểm đối xứng của nó.',
      left: [
        'Hình thang cân',
        'Hình bình hành (không phải hình chữ nhật, hình thoi)',
        'Hình vuông',
        'Tam giác đều',
      ],
      right: [
        'Có $3$ trục đối xứng, không có tâm đối xứng',
        'Có đúng $1$ trục đối xứng, không có tâm đối xứng',
        'Có $4$ trục đối xứng và có tâm đối xứng',
        'Có tâm đối xứng, không có trục đối xứng',
      ],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 2],
        [3, 0],
      ],
      hints: ['Xem lại bảng "Kiến thức cần nhớ": cột số trục và cột tâm đối xứng.'],
      solution:
        'Hình thang cân: đúng $1$ trục, không có tâm. Hình bình hành đó: có tâm, không có trục. Hình vuông: $4$ trục và có tâm. Tam giác đều: $3$ trục, không có tâm.',
    },
    {
      type: 'number',
      prompt:
        'Ngôi sao năm cánh đều (như ngôi sao trên Quốc kì Việt Nam) có bao nhiêu trục đối xứng?',
      answer: 5,
      hints: [
        'Mỗi trục đi qua đầu một cánh sao.',
        'Gấp theo đường thẳng đi qua đầu một cánh và tâm ngôi sao: hai nửa có chồng khít không?',
      ],
      solution:
        'Mỗi đường thẳng đi qua đầu một cánh và tâm ngôi sao là một trục đối xứng. Có $5$ cánh nên có $5$ trục đối xứng.',
    },
    {
      type: 'choice',
      prompt: 'Ngôi sao năm cánh đều có tâm đối xứng không?',
      options: [
        'Có, tâm đối xứng là tâm ngôi sao',
        'Không: quay nửa vòng, cánh hướng lên trên sẽ hướng xuống dưới',
        'Có, tâm đối xứng là đầu một cánh sao',
        'Có hai tâm đối xứng',
      ],
      answer: 1,
      hints: ['Đặt ngôi sao có một cánh hướng thẳng lên trên rồi quay nửa vòng quanh tâm.'],
      solution:
        'Quay nửa vòng quanh tâm, cánh đang hướng lên trên chuyển thành hướng xuống dưới, mà ở vị trí ban đầu không có cánh nào hướng thẳng xuống dưới. Ngôi sao năm cánh không có tâm đối xứng.',
    },
    {
      type: 'number',
      prompt:
        'Hình chữ nhật $ABCD$ có $AB = 8$ cm, $BC = 6$ cm, đường chéo $AC = 10$ cm. Gọi $O$ là tâm đối xứng. Tính $OA$.',
      answer: 5,
      unit: 'cm',
      hints: ['$O$ là trung điểm của đường chéo $AC$; độ dài các cạnh không cần dùng.'],
      solution: '$O$ là trung điểm của $AC$ nên $OA = 10 : 2 = 5$ (cm).',
    },
    {
      type: 'text',
      prompt:
        'Hình nào có vô số trục đối xứng và có tâm đối xứng là tâm của chính nó? (Viết tên hình)',
      accept: ['hình tròn', 'tròn', 'đường tròn'],
      hints: ['Mọi đường thẳng đi qua tâm của hình này đều là trục đối xứng.'],
      solution:
        'Hình tròn: mọi đường thẳng đi qua tâm là trục đối xứng (vô số trục), và tâm hình tròn là tâm đối xứng.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các hình theo số trục đối xứng, từ ít đến nhiều.',
      items: ['Hình vuông', 'Hình thang cân', 'Lục giác đều', 'Hình chữ nhật', 'Tam giác đều'],
      answer: [1, 3, 4, 0, 2],
      hints: ['Đếm số trục của từng hình: $1$, $2$, $3$, $4$ hay $6$?'],
      solution:
        'Hình thang cân ($1$) < hình chữ nhật ($2$) < tam giác đều ($3$) < hình vuông ($4$) < lục giác đều ($6$).',
    },
  ],
  takeaways: [
    'Kiểm tra trục đối xứng bằng cách gấp hình; kiểm tra tâm đối xứng bằng cách quay hình nửa vòng.',
    'Hình vuông, hình chữ nhật, hình thoi, lục giác đều, hình tròn có cả trục và tâm đối xứng.',
    'Tam giác đều, hình thang cân chỉ có trục; hình bình hành (không phải chữ nhật, thoi) chỉ có tâm.',
    'Tâm đối xứng của hình bình hành, hình chữ nhật, hình thoi, hình vuông là giao điểm hai đường chéo, cũng là trung điểm của mỗi đường chéo.',
  ],
};
