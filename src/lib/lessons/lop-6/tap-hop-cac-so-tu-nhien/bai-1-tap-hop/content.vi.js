/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tập hợp và phần tử, kí hiệu thuộc và không thuộc, tập hợp số tự nhiên N và hai cách mô tả một tập hợp: liệt kê phần tử hoặc chỉ ra tính chất đặc trưng.',
  intro:
    'Các đồ dùng trong hộp bút, các học sinh của lớp 6A, các số tự nhiên nhỏ hơn 5: mỗi nhóm như thế là một tập hợp. Trong bài này em sẽ học cách đặt tên một tập hợp, dùng kí hiệu $\\in$, $\\notin$ và viết một tập hợp theo hai cách.',
  objectives: [
    'Nhận biết tập hợp và phần tử của tập hợp; dùng đúng kí hiệu $\\in$ và $\\notin$.',
    'Biết tập hợp các số tự nhiên $\\mathbb{N}$ và $\\mathbb{N}^*$.',
    'Mô tả một tập hợp bằng cách liệt kê các phần tử hoặc chỉ ra tính chất đặc trưng.',
  ],
  sections: [
    {
      heading: 'Tập hợp và phần tử của tập hợp',
      blocks: [
        {
          type: 'p',
          text: 'Người ta thường đặt tên tập hợp bằng chữ cái in hoa như $A, B, C, \\dots$ Các phần tử của tập hợp được viết trong hai dấu ngoặc nhọn $\\{\\ \\}$, cách nhau bởi dấu chấm phẩy ";".',
        },
        {
          type: 'p',
          text: 'Ví dụ, tập hợp $A$ gồm các số $0, 1, 2, 3$ được viết là $A = \\{0; 1; 2; 3\\}$. Các số $0, 1, 2, 3$ là các phần tử của $A$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Kí hiệu thuộc, không thuộc',
          text: '$x$ là một phần tử của tập hợp $A$, kí hiệu $x \\in A$, đọc là "$x$ thuộc $A$". Nếu $y$ không là phần tử của tập hợp $A$ thì kí hiệu $y \\notin A$, đọc là "$y$ không thuộc $A$".',
        },
        {
          type: 'p',
          text: 'Với $A = \\{0; 1; 2; 3\\}$ ta có $3 \\in A$ và $5 \\notin A$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Mỗi phần tử chỉ được liệt kê một lần; thứ tự liệt kê tuỳ ý. Ta có thể minh hoạ một tập hợp bằng một vòng kín, mỗi phần tử là một điểm bên trong vòng.',
        },
      ],
    },
    {
      heading: 'Tập hợp các số tự nhiên',
      blocks: [
        {
          type: 'p',
          text: 'Tập hợp các số tự nhiên được kí hiệu là $\\mathbb{N}$. Tập hợp các số tự nhiên khác $0$ được kí hiệu là $\\mathbb{N}^*$.',
        },
        {
          type: 'tex',
          tex: '\\mathbb{N} = \\{0; 1; 2; 3; \\dots\\} \\qquad \\mathbb{N}^* = \\{1; 2; 3; \\dots\\}',
        },
        {
          type: 'p',
          text: 'Như vậy $0 \\in \\mathbb{N}$ nhưng $0 \\notin \\mathbb{N}^*$.',
        },
      ],
    },
    {
      heading: 'Cách mô tả một tập hợp',
      blocks: [
        {
          type: 'p',
          text: 'Có hai cách mô tả một tập hợp:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Liệt kê các phần tử của tập hợp, ví dụ $A = \\{0; 1; 2; 3; 4\\}$.',
            'Chỉ ra tính chất đặc trưng cho các phần tử của tập hợp, ví dụ $A = \\{x \\in \\mathbb{N} \\mid x < 5\\}$.',
          ],
        },
        {
          type: 'p',
          text: 'Cách viết $A = \\{x \\in \\mathbb{N} \\mid x < 5\\}$ đọc là "$A$ là tập hợp các số tự nhiên $x$ sao cho $x$ nhỏ hơn $5$". Phần sau dấu $\\mid$ là tính chất đặc trưng: mọi phần tử của $A$ đều có tính chất đó, và mọi số tự nhiên có tính chất đó đều thuộc $A$.',
        },
        {
          type: 'table',
          caption: 'Một tập hợp, hai cách viết',
          head: ['Liệt kê', 'Tính chất đặc trưng'],
          rows: [
            ['$\\{0; 1; 2; 3; 4\\}$', '$\\{x \\in \\mathbb{N} \\mid x < 5\\}$'],
            ['$\\{3; 4; 5; 6\\}$', '$\\{x \\in \\mathbb{N} \\mid 3 \\le x \\le 6\\}$'],
            ['$\\{1; 2; 3\\}$', '$\\{x \\in \\mathbb{N}^* \\mid x < 4\\}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Khi tập hợp có nhiều phần tử (hoặc vô số phần tử như $\\mathbb{N}$), cách chỉ ra tính chất đặc trưng thường gọn hơn cách liệt kê.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vòng tập hợp',
    instruction:
      'Kéo các số từ khay vào vòng $A$ (hoặc bấm vào một số để đưa vào, lấy ra). Quan sát cách viết liệt kê và cách viết theo tính chất đặc trưng thay đổi theo. Chọn một thử thách để tạo đúng tập hợp được yêu cầu.',
  },
  examples: [
    {
      problem: 'Viết tập hợp $B$ các số tự nhiên nhỏ hơn $6$ bằng hai cách.',
      steps: [
        'Các số tự nhiên nhỏ hơn $6$ là $0, 1, 2, 3, 4, 5$.',
        'Cách 1 (liệt kê): $B = \\{0; 1; 2; 3; 4; 5\\}$.',
        'Cách 2 (tính chất đặc trưng): $B = \\{x \\in \\mathbb{N} \\mid x < 6\\}$.',
      ],
      answer: '$B = \\{0; 1; 2; 3; 4; 5\\} = \\{x \\in \\mathbb{N} \\mid x < 6\\}$.',
    },
    {
      problem:
        'Cho $P = \\{x \\in \\mathbb{N} \\mid 2 < x \\le 6\\}$. Điền kí hiệu $\\in$ hoặc $\\notin$: $2 \\,\\square\\, P$; $\\ 6 \\,\\square\\, P$; $\\ 4 \\,\\square\\, P$.',
      steps: [
        'Liệt kê các phần tử: số tự nhiên lớn hơn $2$ và không vượt quá $6$ là $3, 4, 5, 6$, nên $P = \\{3; 4; 5; 6\\}$.',
        '$2$ không lớn hơn $2$ nên $2 \\notin P$.',
        '$6 \\le 6$ nên $6 \\in P$; $4$ có trong danh sách nên $4 \\in P$.',
      ],
      answer: '$2 \\notin P$; $\\ 6 \\in P$; $\\ 4 \\in P$.',
    },
    {
      problem: 'Viết tập hợp $M$ các chữ cái trong từ "TRUNG THU".',
      steps: [
        'Các chữ cái lần lượt là T, R, U, N, G, T, H, U.',
        'Chữ T và chữ U xuất hiện hai lần nhưng mỗi phần tử chỉ được liệt kê một lần.',
      ],
      answer: '$M = \\{T; R; U; N; G; H\\}$, gồm $6$ phần tử.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cho $A = \\{2; 3; 5; 7\\}$. Khẳng định nào đúng?',
      options: ['$4 \\in A$', '$5 \\in A$', '$3 \\notin A$', '$7 \\notin A$'],
      answer: 1,
      hints: ['Kiểm tra xem mỗi số có nằm trong dấu ngoặc nhọn không.'],
      solution:
        '$5$ là một phần tử của $A$ nên $5 \\in A$. Còn $4 \\notin A$, $3 \\in A$ và $7 \\in A$, nên ba khẳng định kia sai.',
    },
    {
      type: 'number',
      prompt: 'Tập hợp $C = \\{x \\in \\mathbb{N} \\mid x < 7\\}$ có bao nhiêu phần tử?',
      answer: 7,
      hints: ['Hãy liệt kê các phần tử của $C$.', 'Đừng quên số $0$ là số tự nhiên.'],
      solution: '$C = \\{0; 1; 2; 3; 4; 5; 6\\}$ có $7$ phần tử.',
    },
    {
      type: 'number',
      prompt: 'Tập hợp các chữ cái trong cụm từ "CON CHIM" có bao nhiêu phần tử?',
      answer: 6,
      hints: [
        'Liệt kê các chữ cái theo thứ tự xuất hiện.',
        'Chữ cái nào lặp lại thì chỉ viết một lần.',
      ],
      solution:
        'Các chữ cái là C, O, N, C, H, I, M. Chữ C lặp lại, nên tập hợp là $\\{C; O; N; H; I; M\\}$ với $6$ phần tử.',
    },
    {
      type: 'multi',
      prompt:
        'Cho $D = \\{x \\in \\mathbb{N} \\mid 3 \\le x < 8\\}$. Chọn tất cả các số thuộc $D$.',
      options: ['$2$', '$3$', '$5$', '$8$', '$7$', '$9$'],
      answers: [1, 2, 4],
      hints: ['$x$ có thể bằng $3$ nhưng phải nhỏ hơn $8$.'],
      solution: '$D = \\{3; 4; 5; 6; 7\\}$, nên $3, 5, 7 \\in D$ còn $2, 8, 9 \\notin D$.',
    },
    {
      type: 'choice',
      prompt:
        'Cách viết nào mô tả đúng tập hợp $E = \\{1; 3; 5; 7; 9\\}$ bằng tính chất đặc trưng?',
      options: [
        '$E = \\{x \\in \\mathbb{N} \\mid x$ là số lẻ, $x < 10\\}$',
        '$E = \\{x \\in \\mathbb{N} \\mid x < 10\\}$',
        '$E = \\{x \\in \\mathbb{N} \\mid x$ là số lẻ, $x < 9\\}$',
        '$E = \\{x \\in \\mathbb{N}^* \\mid x < 10\\}$',
      ],
      answer: 0,
      hints: [
        'Các phần tử của $E$ có chung đặc điểm gì?',
        'Kiểm tra xem số $9$ có thoả mãn điều kiện trong từng cách viết không.',
      ],
      solution:
        'Các phần tử của $E$ là các số lẻ nhỏ hơn $10$. Cách viết thứ ba bỏ sót $9$ (vì $9 < 9$ sai); hai cách còn lại chứa cả số chẵn.',
    },
    {
      type: 'text',
      prompt:
        'Viết tập hợp $G$ các số tự nhiên lớn hơn $4$ và nhỏ hơn $9$ bằng cách liệt kê các phần tử theo thứ tự tăng dần (ví dụ: {1; 2; 3}).',
      accept: [
        '{5; 6; 7; 8}',
        '{5;6;7;8}',
        'G = {5; 6; 7; 8}',
        'G={5;6;7;8}',
        '5; 6; 7; 8',
        '5;6;7;8',
        '{5, 6, 7, 8}',
        '{5,6,7,8}',
        '{ 5; 6; 7; 8 }',
        'G = {5;6;7;8}',
        'G = {5, 6, 7, 8}',
      ],
      hints: ['Số lớn hơn $4$ nhỏ nhất là $5$.', 'Số $9$ không thuộc $G$.'],
      solution: '$G = \\{5; 6; 7; 8\\}$.',
    },
    {
      type: 'choice',
      prompt: 'Số nào thuộc $\\mathbb{N}$ nhưng không thuộc $\\mathbb{N}^*$?',
      options: ['$0$', '$1$', '$10$', 'Không có số nào'],
      answer: 0,
      hints: ['$\\mathbb{N}^*$ là tập hợp các số tự nhiên khác $0$.'],
      solution:
        '$0 \\in \\mathbb{N}$ nhưng $0 \\notin \\mathbb{N}^*$; mọi số tự nhiên khác $0$ đều thuộc cả hai.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi tập hợp viết bằng cách liệt kê với cách viết theo tính chất đặc trưng.',
      left: ['$\\{0; 1; 2; 3\\}$', '$\\{1; 2; 3\\}$', '$\\{0; 2; 4; 6\\}$'],
      right: [
        '$\\{x \\in \\mathbb{N}^* \\mid x < 4\\}$',
        '$\\{x \\in \\mathbb{N} \\mid x < 4\\}$',
        '$\\{x \\in \\mathbb{N} \\mid x$ là số chẵn, $x < 7\\}$',
      ],
      pairs: [
        [0, 1],
        [1, 0],
        [2, 2],
      ],
      hints: ['Chú ý sự khác nhau giữa $\\mathbb{N}$ và $\\mathbb{N}^*$: số $0$.'],
      solution:
        '$\\{x \\in \\mathbb{N} \\mid x < 4\\} = \\{0; 1; 2; 3\\}$; $\\{x \\in \\mathbb{N}^* \\mid x < 4\\} = \\{1; 2; 3\\}$; các số chẵn nhỏ hơn $7$ là $0, 2, 4, 6$.',
    },
  ],
  takeaways: [
    'Tập hợp được đặt tên bằng chữ in hoa; phần tử viết trong $\\{\\ \\}$, cách nhau bởi dấu ";", mỗi phần tử một lần.',
    '$x \\in A$: $x$ thuộc $A$; $\\ y \\notin A$: $y$ không thuộc $A$.',
    '$\\mathbb{N} = \\{0; 1; 2; \\dots\\}$, $\\ \\mathbb{N}^* = \\{1; 2; 3; \\dots\\}$.',
    'Hai cách mô tả một tập hợp: liệt kê các phần tử, hoặc chỉ ra tính chất đặc trưng như $\\{x \\in \\mathbb{N} \\mid x < 5\\}$.',
  ],
};
