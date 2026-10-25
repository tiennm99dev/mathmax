/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương V: hệ thống hoá hình có trục đối xứng, hình có tâm đối xứng; bài tập trắc nghiệm, tự luận và vận dụng thực tế về tính đối xứng của hình phẳng.',
  intro:
    'Chương V cho em hai "chiếc kính" để nhìn các hình quanh mình: trục đối xứng (gấp hình cho hai phần chồng khít) và tâm đối xứng (quay hình nửa vòng mà hình vẫn như cũ). Bài tập cuối chương giúp em ôn lại toàn bộ chương, rồi bộ đề tổng hợp và bản đồ kĩ năng sẽ cho biết em cần ôn thêm bài nào.',
  objectives: [
    'Hệ thống hoá khái niệm trục đối xứng, tâm đối xứng và các hình đã học.',
    'Giải bài tập trắc nghiệm và tự luận tổng hợp về tính đối xứng.',
    'Vận dụng tính đối xứng vào các tình huống thực tế: gấp, cắt giấy, chữ cái, hoa văn.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Trục đối xứng', 'Tâm đối xứng'],
          rows: [
            [
              'Cách kiểm tra',
              'Gấp hình theo đường thẳng $d$: hai phần chồng khít',
              'Quay hình nửa vòng quanh điểm $O$: hình chồng khít với vị trí ban đầu',
            ],
            [
              'Đặc điểm',
              'Một hình có thể có $0$, $1$, nhiều hoặc vô số trục',
              '$O$ là trung điểm của đoạn nối mỗi điểm với vị trí mới của nó',
            ],
            [
              'Ví dụ',
              'Tam giác đều ($3$), hình vuông ($4$), lục giác đều ($6$), hình thang cân ($1$)',
              'Đoạn thẳng, hình bình hành, hình chữ nhật, hình thoi, hình vuông, lục giác đều, hình tròn',
            ],
            [
              'Chữ cái in hoa',
              '$\\mathrm{A}$, $\\mathrm{E}$, $\\mathrm{H}$, $\\mathrm{M}$, $\\mathrm{O}$, $\\mathrm{T}$, $\\mathrm{U}$, $\\mathrm{V}$, $\\mathrm{X}$, $\\mathrm{Y}$, ...',
              '$\\mathrm{H}$, $\\mathrm{I}$, $\\mathrm{N}$, $\\mathrm{O}$, $\\mathrm{S}$, $\\mathrm{X}$, $\\mathrm{Z}$',
            ],
          ],
          caption: 'Hai loại đối xứng của hình phẳng',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Những lỗi hay gặp',
          text: 'Đường chéo của hình chữ nhật (không phải hình vuông) không phải trục đối xứng. Hình bình hành (không phải hình chữ nhật, hình thoi) có tâm đối xứng nhưng không có trục đối xứng. Tam giác đều có $3$ trục đối xứng nhưng không có tâm đối xứng.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề tổng hợp bên dưới có $12$ câu, trộn từ Bài 21, Bài 22 và các câu kết hợp cả hai loại đối xứng. Bản đồ kĩ năng tô xanh bài em làm tốt, tô vàng hoặc đỏ bài em cần ôn lại.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương có bản đồ kĩ năng',
    instruction:
      'Làm lần lượt từng câu. Câu nào sai lần đầu, em được gợi ý và làm lại; sai lần nữa thì xem lời giải. Cuối bài, xem bản đồ kĩ năng để biết cần ôn lại Bài 21 hay Bài 22.',
  },
  examples: [
    {
      problem:
        'Một tấm bìa hình lục giác đều $ABCDEF$ cạnh $5$ cm. Bạn Hà gấp tấm bìa theo trục đối xứng đi qua hai đỉnh $A$ và $D$. Tính độ dài nếp gấp và cho biết sau khi gấp, đỉnh $B$ trùng với đỉnh nào.',
      steps: [
        'Nếp gấp là đường chéo chính $AD$. Lục giác đều ghép từ sáu tam giác đều cạnh $5$ cm chung đỉnh $O$ (tâm), nên $OA = OD = 5$ cm.',
        '$AD = OA + OD = 5 + 5 = 10$ (cm).',
        'Gấp theo $AD$, các đỉnh đi thành cặp đối xứng qua $AD$: $B$ trùng với $F$, $C$ trùng với $E$.',
      ],
      answer: 'Nếp gấp dài $10$ cm; đỉnh $B$ trùng với đỉnh $F$.',
    },
    {
      problem:
        'Dòng chữ $\\mathrm{VIET\\ NAM}$ (viết in hoa, không dấu) có những chữ cái nào có trục đối xứng, những chữ cái nào có tâm đối xứng?',
      steps: [
        'Các chữ cái là $\\mathrm{V}$, $\\mathrm{I}$, $\\mathrm{E}$, $\\mathrm{T}$, $\\mathrm{N}$, $\\mathrm{A}$, $\\mathrm{M}$.',
        'Có trục đối xứng: $\\mathrm{V}$, $\\mathrm{I}$, $\\mathrm{T}$, $\\mathrm{A}$, $\\mathrm{M}$ (trục dọc), $\\mathrm{E}$ (trục ngang); $\\mathrm{I}$ có cả trục ngang. Chữ $\\mathrm{N}$ không có trục.',
        'Có tâm đối xứng: chỉ $\\mathrm{I}$ và $\\mathrm{N}$ (quay nửa vòng vẫn như cũ).',
      ],
      answer:
        '$6$ chữ có trục đối xứng ($\\mathrm{V}$, $\\mathrm{I}$, $\\mathrm{E}$, $\\mathrm{T}$, $\\mathrm{A}$, $\\mathrm{M}$); $2$ chữ có tâm đối xứng ($\\mathrm{I}$, $\\mathrm{N}$).',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hình nào dưới đây có nhiều trục đối xứng nhất?',
      options: ['Hình vuông', 'Lục giác đều', 'Tam giác đều', 'Hình chữ nhật'],
      answer: 1,
      hints: [
        'Đếm số trục: hình vuông $4$, tam giác đều $3$, hình chữ nhật $2$. Còn lục giác đều?',
      ],
      solution:
        'Lục giác đều có $6$ trục đối xứng, nhiều hơn hình vuông ($4$), tam giác đều ($3$) và hình chữ nhật ($2$).',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các hình không có tâm đối xứng.',
      options: ['Tam giác đều', 'Hình thang cân', 'Hình thoi', 'Đoạn thẳng', 'Lục giác đều'],
      answers: [0, 1],
      hints: ['Quay từng hình nửa vòng quanh điểm chính giữa: hình nào bị lộn ngược?'],
      solution:
        'Hình thoi (giao điểm hai đường chéo), đoạn thẳng (trung điểm), lục giác đều (giao điểm ba đường chéo chính) có tâm đối xứng. Tam giác đều và hình thang cân không có.',
    },
    {
      type: 'number',
      prompt:
        'Dòng chữ $\\mathrm{VIET\\ NAM}$ (in hoa, không dấu) gồm $7$ chữ cái khác nhau. Có bao nhiêu chữ cái trong đó có trục đối xứng?',
      answer: 6,
      hints: [
        'Xét lần lượt $\\mathrm{V}$, $\\mathrm{I}$, $\\mathrm{E}$, $\\mathrm{T}$, $\\mathrm{N}$, $\\mathrm{A}$, $\\mathrm{M}$.',
      ],
      solution:
        '$\\mathrm{V}$, $\\mathrm{I}$, $\\mathrm{E}$, $\\mathrm{T}$, $\\mathrm{A}$, $\\mathrm{M}$ có trục đối xứng; chỉ $\\mathrm{N}$ không có. Vậy có $6$ chữ.',
    },
    {
      type: 'number',
      prompt: 'Cũng dòng chữ $\\mathrm{VIET\\ NAM}$, có bao nhiêu chữ cái có tâm đối xứng?',
      answer: 2,
      hints: ['Xoay dòng chữ ngược lại nửa vòng: chữ nào vẫn đọc như cũ?'],
      solution: 'Chỉ $\\mathrm{I}$ và $\\mathrm{N}$ có tâm đối xứng: $2$ chữ.',
    },
    {
      type: 'number',
      prompt:
        'Hình bình hành $ABCD$ có tâm đối xứng $O$, biết $OA = 6$ cm và $OB = 4$ cm. Tính tổng độ dài hai đường chéo $AC + BD$.',
      answer: 20,
      unit: 'cm',
      hints: ['$O$ là trung điểm của mỗi đường chéo.', '$AC = 2 \\cdot OA$ và $BD = 2 \\cdot OB$.'],
      solution:
        '$AC = 2 \\cdot 6 = 12$ (cm), $BD = 2 \\cdot 4 = 8$ (cm). Vậy $AC + BD = 12 + 8 = 20$ (cm).',
    },
    {
      type: 'choice',
      prompt: 'Gấp tờ giấy hình chữ nhật $ABCD$ (với $AB \\neq BC$) theo đường chéo $AC$ thì',
      options: [
        'hai nửa luôn chồng khít, vì đường chéo là trục đối xứng',
        'hai nửa không chồng khít, nên đường chéo không phải trục đối xứng',
        'đỉnh $B$ trùng với đỉnh $D$',
        'ta được một hình thang cân chồng khít',
      ],
      answer: 1,
      hints: ['Nếu $B$ trùng $D$ thì $AB$ phải chồng lên $AD$. Hai cạnh này có bằng nhau không?'],
      solution:
        'Gấp theo $AC$, cạnh $AB$ nằm theo hướng của $AD$ nhưng $AB \\neq AD$ (vì $AD = BC \\neq AB$), nên $B$ không trùng $D$ và hai nửa không chồng khít. Đường chéo của hình chữ nhật không phải hình vuông không phải trục đối xứng.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Minh muốn cắt một tấm bìa có tâm đối xứng nhưng không có trục đối xứng. Bạn nên cắt hình nào?',
      options: [
        'Hình bình hành có hai cạnh kề không bằng nhau và không có góc vuông',
        'Hình chữ nhật',
        'Tam giác đều',
        'Hình thang cân',
      ],
      answer: 0,
      hints: ['Hình chữ nhật có cả hai; tam giác đều và hình thang cân không có tâm.'],
      solution:
        'Hình bình hành như vậy có tâm đối xứng (giao điểm hai đường chéo) nhưng không có trục đối xứng nào.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi chữ cái in hoa với đặc điểm đối xứng của nó.',
      left: ['$\\mathrm{H}$', '$\\mathrm{N}$', '$\\mathrm{T}$', '$\\mathrm{F}$'],
      right: [
        'Chỉ có trục đối xứng',
        'Không có trục, không có tâm đối xứng',
        'Có cả trục và tâm đối xứng',
        'Chỉ có tâm đối xứng',
      ],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: ['Với mỗi chữ, thử gấp theo đường dọc, đường ngang, rồi thử quay nửa vòng.'],
      solution:
        '$\\mathrm{H}$: có cả trục (dọc và ngang) và tâm. $\\mathrm{N}$: chỉ có tâm. $\\mathrm{T}$: chỉ có trục dọc. $\\mathrm{F}$: không có trục, không có tâm.',
    },
    {
      type: 'number',
      prompt: 'Tính tổng số trục đối xứng của một hình thang cân và một hình lục giác đều.',
      answer: 7,
      hints: ['Hình thang cân có $1$ trục. Lục giác đều có bao nhiêu trục?'],
      solution: 'Hình thang cân có $1$ trục, lục giác đều có $6$ trục: $1 + 6 = 7$.',
    },
    {
      type: 'number',
      prompt: 'Hình vuông $ABCD$ có tâm đối xứng $O$ và đường chéo $AC = 12$ cm. Tính $OD$.',
      answer: 6,
      unit: 'cm',
      hints: ['Hai đường chéo của hình vuông bằng nhau.', '$O$ là trung điểm của $BD$.'],
      solution:
        'Hai đường chéo của hình vuông bằng nhau nên $BD = AC = 12$ cm. $O$ là trung điểm của $BD$ nên $OD = 12 : 2 = 6$ (cm).',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào dưới đây sai?',
      options: [
        'Hình tròn có vô số trục đối xứng',
        'Tam giác đều có tâm đối xứng',
        'Hình thoi có hai trục đối xứng là hai đường chéo',
        'Tâm đối xứng của đoạn thẳng là trung điểm của nó',
      ],
      answer: 1,
      hints: ['Quay tam giác đều nửa vòng: đỉnh trên cùng sẽ ở đâu?'],
      solution:
        'Quay tam giác đều nửa vòng quanh một điểm bất kì, đỉnh chĩa lên trở thành chĩa xuống, nên tam giác đều không có tâm đối xứng. Ba khẳng định còn lại đều đúng.',
    },
    {
      type: 'text',
      prompt: 'Hai trục đối xứng của hình thoi (không phải hình vuông) là hai đường gì của nó?',
      accept: ['đường chéo', 'hai đường chéo', 'các đường chéo', 'hai đường chéo của hình thoi'],
      hints: ['Gấp hình thoi bằng giấy theo đường nối hai đỉnh đối diện.'],
      solution: 'Hai trục đối xứng của hình thoi là hai đường chéo của nó.',
    },
    {
      type: 'number',
      prompt:
        'Một tấm bìa hình lục giác đều cạnh $5$ cm được gấp theo trục đối xứng đi qua hai đỉnh đối diện. Nếp gấp dài bao nhiêu xăng-ti-mét?',
      answer: 10,
      unit: 'cm',
      hints: [
        'Nếp gấp là một đường chéo chính.',
        'Lục giác đều ghép từ sáu tam giác đều, đường chéo chính gấp đôi cạnh.',
      ],
      solution: 'Nếp gấp là đường chéo chính, dài gấp đôi cạnh: $2 \\cdot 5 = 10$ (cm).',
    },
  ],
  takeaways: [
    'Trục đối xứng: gấp theo nó thì hai phần chồng khít. Tâm đối xứng: quay nửa vòng quanh nó thì hình chồng khít với chính nó.',
    'Hình vuông $4$ trục, lục giác đều $6$, tam giác đều $3$, hình chữ nhật và hình thoi $2$, hình thang cân $1$, hình tròn vô số.',
    'Tâm đối xứng của tứ giác (bình hành, chữ nhật, thoi, vuông) là giao điểm hai đường chéo; tam giác đều và hình thang cân không có tâm.',
    'Tính đối xứng giúp tính nhanh độ dài: tâm đối xứng là trung điểm, hai phần gấp chồng khít có độ dài bằng nhau.',
  ],
};
