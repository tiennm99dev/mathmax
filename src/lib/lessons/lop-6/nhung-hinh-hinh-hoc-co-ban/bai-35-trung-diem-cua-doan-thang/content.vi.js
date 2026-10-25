/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Trung điểm của đoạn thẳng: điểm nằm giữa và cách đều hai đầu mút; tính độ dài khi biết trung điểm và cách tìm trung điểm trong thực tế.',
  intro:
    'Muốn treo bập bênh cho cân, người thợ phải đặt trục quay đúng vào điểm chính giữa của tấm ván. Điểm chính giữa ấy cách đều hai đầu ván. Trong hình học, ta gọi nó là trung điểm của đoạn thẳng.',
  objectives: [
    'Nhận biết trung điểm của đoạn thẳng.',
    'Tính độ dài các đoạn thẳng khi biết trung điểm.',
    'Biết một số cách tìm trung điểm của một đoạn thẳng, một thanh gỗ, một sợi dây.',
  ],
  sections: [
    {
      heading: 'Trung điểm của đoạn thẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Trung điểm $M$ của đoạn thẳng $AB$ là điểm nằm giữa $A$, $B$ và cách đều $A$, $B$ (tức là $MA = MB$). Trung điểm của đoạn thẳng còn gọi là điểm chính giữa của đoạn thẳng.',
        },
        {
          type: 'p',
          text: 'Trên hình vẽ, ta đánh dấu hai đoạn bằng nhau $MA$ và $MB$ bằng cùng một nét gạch nhỏ.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhận xét',
          text: 'Nếu $M$ là trung điểm của đoạn thẳng $AB$ thì $MA = MB = \\dfrac{AB}{2}$, hay $AB = 2 \\cdot MA = 2 \\cdot MB$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Cần đủ cả hai điều kiện. Nếu $MA = MB$ mà $M$ không nằm giữa $A$ và $B$ (chẳng hạn ba điểm $M$, $A$, $B$ không thẳng hàng) thì $M$ không phải trung điểm của $AB$.',
        },
      ],
    },
    {
      heading: 'Tìm trung điểm trong thực tế',
      blocks: [
        {
          type: 'list',
          items: [
            'Dùng thước: đo độ dài $AB$, chia đôi, rồi đặt thước để vạch $0$ trùng $A$ và đánh dấu điểm ứng với $\\dfrac{AB}{2}$. Chẳng hạn $AB = 5$ cm thì trung điểm ở vạch $2{,}5$ cm.',
            'Gấp giấy: vẽ đoạn $AB$ lên giấy can, gấp sao cho $A$ trùng $B$; nếp gấp cắt đoạn $AB$ tại trung điểm.',
            'Dùng sợi dây: lấy sợi dây dài bằng thanh gỗ, gấp đôi sợi dây cho hai đầu trùng nhau rồi đặt dây lên thanh gỗ; chỗ dây gập đánh dấu trung điểm của thanh gỗ.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Đèn trung điểm',
    instruction:
      'Kéo điểm $M$ dọc đoạn thẳng $AB$ (hoặc dùng phím mũi tên, mỗi bước $1$ mm). Đèn sáng khi $MA = MB$, tức là $M$ là trung điểm của $AB$. Kéo điểm $B$ hoặc nhấn "Đoạn thẳng mới" để thử với độ dài khác.',
  },
  examples: [
    {
      problem: 'Cho đoạn thẳng $AB = 6$ cm và $M$ là trung điểm của $AB$. Tính $MA$ và $MB$.',
      steps: [
        '$M$ là trung điểm của $AB$ nên $MA = MB = \\dfrac{AB}{2}$.',
        '$MA = MB = 6 : 2 = 3$ (cm).',
      ],
      answer: '$MA = MB = 3$ cm.',
    },
    {
      problem:
        'Cho đoạn thẳng $PQ = 10$ cm. Gọi $E$ là trung điểm của $PQ$ và $F$ là trung điểm của $PE$. Tính độ dài đoạn thẳng $EF$.',
      steps: [
        '$E$ là trung điểm của $PQ$ nên $PE = \\dfrac{PQ}{2} = 10 : 2 = 5$ (cm).',
        '$F$ là trung điểm của $PE$ nên $EF = \\dfrac{PE}{2} = 5 : 2 = 2{,}5$ (cm).',
      ],
      answer: '$EF = 2{,}5$ cm.',
    },
    {
      problem:
        'Trên tia $Ox$ lấy hai điểm $A$, $B$ sao cho $OA = 2$ cm, $OB = 6$ cm. Gọi $I$ là trung điểm của $AB$. Tính $OI$.',
      steps: [
        '$A$, $B$ cùng nằm trên tia $Ox$ và $OA < OB$ nên $A$ nằm giữa $O$ và $B$; do đó $OA + AB = OB$, suy ra $AB = 6 - 2 = 4$ (cm).',
        '$I$ là trung điểm của $AB$ nên $AI = 4 : 2 = 2$ (cm).',
        '$I$ nằm giữa $A$ và $B$, mà $A$ nằm giữa $O$ và $B$, nên $A$ nằm giữa $O$ và $I$: $OI = OA + AI = 2 + 2 = 4$ (cm).',
      ],
      answer: '$OI = 4$ cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Điểm $M$ là trung điểm của đoạn thẳng $AB$ khi',
      options: [
        '$MA = MB$',
        '$M$ nằm giữa $A$ và $B$',
        '$M$ nằm giữa $A$, $B$ và $MA = MB$',
        '$M$ thuộc đường thẳng $AB$',
      ],
      answer: 2,
      hints: ['Định nghĩa trung điểm có hai điều kiện.'],
      solution:
        'Trung điểm $M$ của $AB$ phải vừa nằm giữa $A$ và $B$, vừa cách đều $A$ và $B$ ($MA = MB$). Mỗi điều kiện riêng lẻ là chưa đủ.',
    },
    {
      type: 'number',
      prompt: 'Cho đoạn thẳng $AB = 8$ cm, $M$ là trung điểm của $AB$. Tính $MA$ (cm).',
      answer: 4,
      unit: 'cm',
      hints: ['$MA = \\dfrac{AB}{2}$.'],
      solution: '$MA = AB : 2 = 8 : 2 = 4$ (cm).',
    },
    {
      type: 'number',
      prompt: 'Cho đoạn thẳng $AB = 7$ cm, $I$ là trung điểm của $AB$. Tính $AI$ (cm).',
      answer: 3.5,
      unit: 'cm',
      hints: ['Chia đôi độ dài $AB$; kết quả có thể là số thập phân.'],
      solution: '$AI = AB : 2 = 7 : 2 = 3{,}5$ (cm).',
    },
    {
      type: 'number',
      prompt: '$M$ là trung điểm của đoạn thẳng $AB$ và $MB = 2{,}5$ cm. Tính độ dài $AB$ (cm).',
      answer: 5,
      unit: 'cm',
      hints: ['$AB = 2 \\cdot MB$.'],
      solution: '$AB = 2 \\cdot MB = 2 \\cdot 2{,}5 = 5$ (cm).',
    },
    {
      type: 'choice',
      prompt:
        'Cho ba điểm $A$, $B$, $M$ với $MA = MB = 3$ cm và $AB = 5$ cm. Điểm $M$ có phải là trung điểm của $AB$ không?',
      options: [
        'Có, vì $MA = MB$',
        'Không, vì $M$ không nằm giữa $A$ và $B$',
        'Có, vì $MA + MB > AB$',
      ],
      answer: 1,
      hints: ['Nếu $M$ nằm giữa $A$ và $B$ thì $MA + MB$ phải bằng $AB$.'],
      solution:
        '$MA + MB = 3 + 3 = 6 \\ne 5 = AB$, nên $M$ không nằm giữa $A$ và $B$. Dù $MA = MB$, điểm $M$ không phải trung điểm của $AB$.',
    },
    {
      type: 'number',
      prompt:
        'Cho đoạn thẳng $PQ = 8$ cm. $E$ là trung điểm của $PQ$, $F$ là trung điểm của $PE$. Tính $EF$ (cm).',
      answer: 2,
      unit: 'cm',
      hints: ['Tính $PE$ trước.', '$EF$ bằng một nửa $PE$.'],
      solution: '$PE = PQ : 2 = 8 : 2 = 4$ (cm); $EF = PE : 2 = 4 : 2 = 2$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Trên tia $Ox$ lấy hai điểm $A$, $B$ với $OA = 3$ cm, $OB = 9$ cm. Gọi $I$ là trung điểm của $AB$. Tính $OI$ (cm).',
      answer: 6,
      unit: 'cm',
      hints: [
        '$A$ nằm giữa $O$ và $B$ (vì $OA < OB$), nên $AB = OB - OA$.',
        'Sau đó $OI = OA + AI$.',
      ],
      solution:
        '$A$ nằm giữa $O$ và $B$ nên $AB = 9 - 3 = 6$ (cm). $I$ là trung điểm của $AB$ nên $AI = 6 : 2 = 3$ (cm). Vậy $OI = OA + AI = 3 + 3 = 6$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Hai điểm $A$, $B$ lần lượt nằm trên hai tia đối nhau $Ox$, $Oy$ với $OA = 3$ cm, $OB = 5$ cm. Gọi $I$ là trung điểm của $AB$. Tính $OI$ (cm).',
      answer: 1,
      unit: 'cm',
      hints: [
        '$O$ nằm giữa $A$ và $B$, nên $AB = OA + OB$.',
        'So sánh $AI$ với $OA$ để biết $I$ nằm trên tia nào.',
      ],
      solution:
        '$O$ nằm giữa $A$ và $B$ nên $AB = 3 + 5 = 8$ (cm), $AI = 8 : 2 = 4$ (cm). Vì $OA = 3 < 4 = AI$ nên $O$ nằm giữa $A$ và $I$: $OI = AI - OA = 4 - 3 = 1$ (cm).',
    },
    {
      type: 'choice',
      prompt:
        'Không có thước đo, bạn Lan có một sợi dây dài đúng bằng một thanh gỗ. Cách nào giúp Lan tìm được trung điểm của thanh gỗ?',
      options: [
        'Đặt một đầu dây ở đầu thanh gỗ rồi đánh dấu chỗ đầu dây kia',
        'Gấp đôi sợi dây cho hai đầu trùng nhau, đặt dây lên thanh gỗ và đánh dấu chỗ dây gập',
        'Cắt sợi dây thành ba phần bằng nhau',
      ],
      answer: 1,
      hints: ['Trung điểm chia thanh gỗ thành hai phần bằng nhau.'],
      solution:
        'Gấp đôi sợi dây thì chỗ gập chia dây thành hai phần bằng nhau. Đặt dây dọc thanh gỗ, chỗ gập ứng với điểm cách đều hai đầu thanh, chính là trung điểm.',
    },
  ],
  takeaways: [
    'Trung điểm $M$ của đoạn thẳng $AB$ nằm giữa $A$, $B$ và $MA = MB$.',
    'Khi $M$ là trung điểm của $AB$: $MA = MB = \\dfrac{AB}{2}$ và $AB = 2 \\cdot MA$.',
    '$MA = MB$ thôi chưa đủ: $M$ còn phải nằm giữa $A$ và $B$.',
    'Có thể tìm trung điểm bằng thước, bằng cách gấp giấy hoặc gấp đôi sợi dây.',
  ],
};
