/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hình có tâm đối xứng: quay hình nửa vòng quanh một điểm O mà hình chồng khít với chính nó; tâm đối xứng của các hình phẳng quen thuộc, của chữ cái và các hình trong thực tế.',
  intro:
    'Cắm một chiếc chong chóng bốn cánh vào đầu que rồi xoay nó đúng nửa vòng: các cánh đổi chỗ cho nhau nhưng chiếc chong chóng trông vẫn y như lúc đầu. Điểm cắm que chính là tâm đối xứng của chiếc chong chóng. Bài này giúp em nhận ra những hình có tính chất như vậy và tìm tâm đối xứng của chúng.',
  objectives: [
    'Nhận biết được hình có tâm đối xứng và tâm đối xứng của hình.',
    'Xác định được tâm đối xứng của đoạn thẳng, hình tròn, hình vuông, hình chữ nhật, hình thoi, hình bình hành, lục giác đều.',
    'Nhận ra những hình không có tâm đối xứng và tính đối xứng tâm trong thực tế.',
  ],
  sections: [
    {
      heading: 'Hình có tâm đối xứng',
      blocks: [
        {
          type: 'p',
          text: 'Đặt một hình lên giấy, ghim một điểm $O$ rồi quay hình quanh $O$ đúng nửa vòng (tức là quay $180^\\circ$). Với một số hình, hình ở vị trí mới trùng khít với hình ở vị trí ban đầu.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình có tâm đối xứng',
          text: 'Hình có tâm đối xứng là hình có một điểm $O$ mà khi quay hình đó nửa vòng xung quanh điểm $O$ ta được vị trí mới của hình "chồng khít" với vị trí ban đầu (trước khi quay). Điểm $O$ được gọi là tâm đối xứng của hình.',
        },
        {
          type: 'p',
          text: "Khi quay nửa vòng quanh $O$, mỗi điểm $A$ của hình đến một vị trí $A'$ sao cho $O$ là trung điểm của đoạn thẳng $AA'$. Vì vậy, với một hình có tâm đối xứng $O$, các điểm của hình đi thành từng cặp mà $O$ nằm chính giữa mỗi cặp.",
        },
      ],
    },
    {
      heading: 'Tâm đối xứng của một số hình phẳng',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Tâm đối xứng'],
          rows: [
            ['Đoạn thẳng $AB$', 'Trung điểm của $AB$'],
            ['Hình tròn', 'Tâm của hình tròn'],
            [
              'Hình bình hành, hình chữ nhật, hình thoi, hình vuông',
              'Giao điểm của hai đường chéo',
            ],
            ['Lục giác đều', 'Giao điểm của ba đường chéo chính'],
            ['Tam giác đều', 'Không có'],
            ['Hình thang cân', 'Không có'],
          ],
          caption: 'Tâm đối xứng của các hình đã học',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Hai đường chéo của hình bình hành cắt nhau tại trung điểm của mỗi đường, nên quay nửa vòng quanh giao điểm $O$ thì $A$ đến $C$, $B$ đến $D$ và ngược lại: cả hình chồng khít với chính nó.',
        },
        {
          type: 'p',
          text: 'Các chữ cái in hoa $\\mathrm{H}$, $\\mathrm{I}$, $\\mathrm{N}$, $\\mathrm{O}$, $\\mathrm{S}$, $\\mathrm{X}$, $\\mathrm{Z}$ có tâm đối xứng. Các chữ $\\mathrm{A}$, $\\mathrm{E}$, $\\mathrm{T}$, $\\mathrm{U}$, $\\mathrm{V}$ thì không: quay nửa vòng, chúng bị lộn ngược.',
        },
        {
          type: 'table',
          head: ['Có trục, có tâm', 'Có trục, không có tâm', 'Có tâm, không có trục'],
          rows: [
            ['Hình vuông, hình chữ nhật, hình thoi', 'Tam giác đều', 'Hình bình hành (*)'],
            [
              'Lục giác đều, hình tròn, đoạn thẳng',
              'Hình thang cân',
              'Chữ $\\mathrm{N}$, $\\mathrm{S}$, $\\mathrm{Z}$',
            ],
            [
              'Chữ $\\mathrm{H}$, $\\mathrm{O}$, $\\mathrm{X}$',
              'Chữ $\\mathrm{A}$, $\\mathrm{T}$, $\\mathrm{E}$',
              'Chong chóng bốn cánh',
            ],
          ],
          caption:
            'So sánh hai loại đối xứng. (*) Hình bình hành không phải hình chữ nhật, không phải hình thoi.',
        },
      ],
    },
    {
      heading: 'Hình có tâm đối xứng trong thực tế',
      blocks: [
        {
          type: 'list',
          items: [
            'Chong chóng, cánh quạt hai hoặc bốn cánh, bánh xe, vành bánh xe đạp.',
            'Bông tuyết, nhiều loài hoa có số cánh chẵn, ngôi sao sáu cánh.',
            'Hoa văn trên nhiều loại gạch lát nền, bàn cờ vua.',
          ],
        },
        {
          type: 'p',
          text: 'Để dự đoán tâm đối xứng, hãy tìm hai điểm của hình "đối nhau" (chẳng hạn hai đỉnh đối diện): tâm phải là trung điểm của đoạn nối chúng. Sau đó kiểm tra bằng cách quay hình nửa vòng quanh điểm đó.',
        },
      ],
    },
  ],
  explore: {
    title: 'Quay nửa vòng quanh điểm O',
    instruction:
      'Chọn một hình, kéo điểm O (hoặc dùng phím mũi tên) đến chỗ em đoán là tâm đối xứng, rồi bấm "Quay nửa vòng" hoặc kéo thanh góc quay. Nếu hình màu cam chồng khít với hình ban đầu, O là tâm đối xứng. Với tam giác đều, hình thang cân và chữ T, em có tìm được điểm O nào không?',
  },
  examples: [
    {
      problem:
        'Cho hình bình hành $ABCD$, hai đường chéo $AC$ và $BD$ cắt nhau tại $O$. Chứng tỏ $O$ là tâm đối xứng của hình bình hành.',
      steps: [
        'Hai đường chéo của hình bình hành cắt nhau tại trung điểm của mỗi đường, nên $OA = OC$ và $OB = OD$.',
        'Quay hình nửa vòng quanh $O$: điểm $A$ đến đúng vị trí của $C$, điểm $C$ đến vị trí của $A$; tương tự $B$ đến $D$ và $D$ đến $B$.',
        'Vậy cạnh $AB$ đến vị trí cạnh $CD$, cạnh $BC$ đến vị trí cạnh $DA$: hình mới chồng khít với hình ban đầu.',
      ],
      answer: 'Giao điểm $O$ của hai đường chéo là tâm đối xứng của hình bình hành $ABCD$.',
    },
    {
      problem: 'Vì sao tam giác đều không có tâm đối xứng?',
      steps: [
        'Đặt tam giác đều sao cho một cạnh nằm ngang ở dưới và đỉnh còn lại ở trên.',
        'Quay nửa vòng quanh một điểm $O$ bất kì: hình mới có cạnh nằm ngang ở trên và đỉnh chĩa xuống dưới.',
        'Một tam giác có đỉnh chĩa lên không thể trùng khít với một tam giác có đỉnh chĩa xuống, dù đặt $O$ ở đâu.',
      ],
      answer: 'Tam giác đều không có tâm đối xứng (nó chỉ có $3$ trục đối xứng).',
    },
    {
      problem:
        'Trong các chữ cái in hoa $\\mathrm{H}$, $\\mathrm{N}$, $\\mathrm{S}$, $\\mathrm{T}$, chữ nào có tâm đối xứng?',
      steps: [
        'Chữ $\\mathrm{H}$: quay nửa vòng quanh điểm giữa nét ngang, hai nét sổ đổi chỗ cho nhau, chữ trùng với chính nó.',
        'Chữ $\\mathrm{N}$ và chữ $\\mathrm{S}$: quay nửa vòng quanh điểm chính giữa, chữ vẫn đọc là $\\mathrm{N}$, $\\mathrm{S}$.',
        'Chữ $\\mathrm{T}$: quay nửa vòng thì nét ngang xuống dưới, ta được chữ $\\mathrm{T}$ lộn ngược.',
      ],
      answer:
        'Các chữ $\\mathrm{H}$, $\\mathrm{N}$, $\\mathrm{S}$ có tâm đối xứng; chữ $\\mathrm{T}$ thì không.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tâm đối xứng của đoạn thẳng $AB$ là',
      options: ['điểm $A$', 'trung điểm của $AB$', 'điểm $B$', 'đoạn thẳng không có tâm đối xứng'],
      answer: 1,
      hints: ['Quay đoạn thẳng nửa vòng quanh điểm nào thì $A$ đến đúng chỗ của $B$?'],
      solution:
        'Quay nửa vòng quanh trung điểm $M$ của $AB$ thì $A$ đến vị trí $B$ và $B$ đến vị trí $A$, vì $MA = MB$. Tâm đối xứng là trung điểm của $AB$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các hình có tâm đối xứng.',
      options: [
        'Tam giác đều',
        'Hình vuông',
        'Hình bình hành',
        'Hình thang cân',
        'Lục giác đều',
        'Hình tròn',
      ],
      answers: [1, 2, 4, 5],
      hints: [
        'Tưởng tượng quay mỗi hình nửa vòng quanh điểm chính giữa của nó.',
        'Hình nào sau khi quay bị "lộn ngược" thì không có tâm đối xứng.',
      ],
      solution:
        'Hình vuông, hình bình hành (giao điểm hai đường chéo), lục giác đều (giao điểm ba đường chéo chính) và hình tròn (tâm) có tâm đối xứng. Tam giác đều và hình thang cân không có.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các chữ cái in hoa có tâm đối xứng.',
      options: ['H', 'N', 'S', 'X', 'Z', 'A', 'T', 'E'],
      answers: [0, 1, 2, 3, 4],
      hints: ['Xoay quyển sách ngược lại (nửa vòng): chữ nào vẫn đọc như cũ?'],
      solution:
        'Quay nửa vòng, các chữ $\\mathrm{H}$, $\\mathrm{N}$, $\\mathrm{S}$, $\\mathrm{X}$, $\\mathrm{Z}$ vẫn như cũ nên có tâm đối xứng. Các chữ $\\mathrm{A}$, $\\mathrm{T}$, $\\mathrm{E}$ bị lộn ngược nên không có.',
    },
    {
      type: 'number',
      prompt:
        'Hình bình hành $ABCD$ có tâm đối xứng $O$. Biết $OA = 3$ cm, tính độ dài đường chéo $AC$.',
      answer: 6,
      unit: 'cm',
      hints: [
        'Tâm đối xứng của hình bình hành là giao điểm hai đường chéo.',
        'Quay nửa vòng quanh $O$, $A$ đến $C$, nên $O$ là trung điểm của $AC$.',
      ],
      solution: '$O$ là trung điểm của $AC$ nên $OC = OA = 3$ cm và $AC = 3 + 3 = 6$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Hình chữ nhật $ABCD$ có đường chéo $BD = 10$ cm. Gọi $O$ là tâm đối xứng của hình chữ nhật. Tính $OB$.',
      answer: 5,
      unit: 'cm',
      hints: ['$O$ là giao điểm của hai đường chéo, cũng là trung điểm của mỗi đường chéo.'],
      solution: '$O$ là trung điểm của $BD$ nên $OB = 10 : 2 = 5$ (cm).',
    },
    {
      type: 'choice',
      prompt: 'Hình nào dưới đây có trục đối xứng nhưng không có tâm đối xứng?',
      options: ['Hình chữ nhật', 'Hình thang cân', 'Hình bình hành', 'Hình tròn'],
      answer: 1,
      hints: [
        'Loại các hình có tâm đối xứng trước.',
        'Hình bình hành có tâm đối xứng; còn hình nào quay nửa vòng thì đáy lớn chuyển lên trên?',
      ],
      solution:
        'Hình chữ nhật và hình tròn có cả trục lẫn tâm; hình bình hành có tâm. Hình thang cân có một trục đối xứng nhưng quay nửa vòng thì đáy lớn chuyển lên trên, nên không có tâm đối xứng.',
    },
    {
      type: 'choice',
      prompt: 'Hình nào dưới đây có tâm đối xứng nhưng không có trục đối xứng?',
      options: [
        'Tam giác đều',
        'Hình thoi',
        'Hình bình hành có hai cạnh kề không bằng nhau và không có góc vuông',
        'Hình thang cân',
      ],
      answer: 2,
      hints: [
        'Hình thoi có hai trục là hai đường chéo; tam giác đều và hình thang cân không có tâm.',
      ],
      solution:
        'Hình bình hành như vậy có tâm đối xứng là giao điểm hai đường chéo nhưng không có trục đối xứng nào.',
    },
    {
      type: 'choice',
      prompt:
        "Hình $\\mathcal{F}$ có tâm đối xứng $O$. Quay $\\mathcal{F}$ nửa vòng quanh $O$, điểm $M$ của hình đến vị trí $M'$. Khẳng định nào đúng?",
      options: [
        "$M'$ luôn trùng với $M$",
        "$O$ là trung điểm của đoạn thẳng $MM'$",
        "$OM' = 2 \\cdot OM$",
        "$M'$ nằm ngoài hình $\\mathcal{F}$",
      ],
      answer: 1,
      hints: ['Quay nửa vòng thì $M$ đi đến phía đối diện qua $O$, cách $O$ một khoảng như cũ.'],
      solution:
        "Khi quay nửa vòng quanh $O$, $OM' = OM$ và $M$, $O$, $M'$ thẳng hàng, $O$ nằm giữa: $O$ là trung điểm của $MM'$. Vì $O$ là tâm đối xứng nên $M'$ cũng thuộc hình $\\mathcal{F}$.",
    },
    {
      type: 'number',
      prompt:
        'Trong các hình: hình vuông, hình chữ nhật, hình thoi, hình thang cân, tam giác đều, lục giác đều, có bao nhiêu hình vừa có trục đối xứng vừa có tâm đối xứng?',
      answer: 4,
      hints: ['Cả sáu hình đều có trục đối xứng. Hình nào không có tâm đối xứng?'],
      solution:
        'Cả sáu hình đều có trục đối xứng. Hình thang cân và tam giác đều không có tâm đối xứng. Còn lại hình vuông, hình chữ nhật, hình thoi, lục giác đều: $4$ hình.',
    },
  ],
  takeaways: [
    'Hình có tâm đối xứng: có điểm $O$ mà quay hình nửa vòng quanh $O$ thì hình chồng khít với vị trí ban đầu; $O$ là tâm đối xứng.',
    "Quay nửa vòng quanh $O$, mỗi điểm $A$ đến $A'$ với $O$ là trung điểm của $AA'$.",
    'Đoạn thẳng: tâm là trung điểm; hình tròn: tâm của nó; hình bình hành, chữ nhật, thoi, vuông: giao điểm hai đường chéo; lục giác đều: giao điểm ba đường chéo chính.',
    'Tam giác đều và hình thang cân không có tâm đối xứng.',
  ],
};
