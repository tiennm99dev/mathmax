/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ba đường trung tuyến của tam giác đồng quy tại trọng tâm, cách mỗi đỉnh 2/3 độ dài trung tuyến; ba đường phân giác đồng quy tại một điểm cách đều ba cạnh.',
  intro:
    'Cắt một tam giác bằng bìa cứng rồi tìm điểm có thể đặt tấm bìa thăng bằng trên đầu bút chì. Điểm đó nằm trên cả ba đoạn thẳng nối mỗi đỉnh với trung điểm cạnh đối diện. Bài này giới thiệu các đường trung tuyến, các đường phân giác của tam giác và điểm chung đặc biệt của chúng.',
  objectives: [
    'Nhận biết đường trung tuyến và đường phân giác của một tam giác.',
    'Biết ba đường trung tuyến đồng quy tại trọng tâm $G$, và $AG = \\dfrac{2}{3}AM$; tính được các đoạn trên đường trung tuyến.',
    'Biết ba đường phân giác đồng quy tại một điểm cách đều ba cạnh của tam giác và vận dụng tính chất đó.',
  ],
  sections: [
    {
      heading: 'Đường trung tuyến và trọng tâm',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đường trung tuyến',
          text: 'Đoạn thẳng nối một đỉnh của tam giác với trung điểm của cạnh đối diện gọi là một đường trung tuyến của tam giác. Mỗi tam giác có ba đường trung tuyến.',
        },
        {
          type: 'p',
          text: 'Trong tam giác $ABC$, gọi $M$, $N$, $P$ lần lượt là trung điểm của $BC$, $CA$, $AB$. Ba đường trung tuyến là $AM$, $BN$, $CP$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Ba đường trung tuyến của một tam giác cùng đi qua một điểm. Điểm đó cách mỗi đỉnh một khoảng bằng $\\dfrac{2}{3}$ độ dài đường trung tuyến đi qua đỉnh ấy.',
        },
        {
          type: 'tex',
          tex: '\\frac{GA}{MA} = \\frac{GB}{NB} = \\frac{GC}{PC} = \\frac{2}{3}',
        },
        {
          type: 'p',
          text: 'Điểm chung $G$ của ba đường trung tuyến gọi là trọng tâm của tam giác. Từ $GA = \\dfrac{2}{3}MA$ suy ra $GM = \\dfrac{1}{3}MA$ và $GA = 2GM$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Để xác định trọng tâm, chỉ cần vẽ hai đường trung tuyến rồi lấy giao điểm của chúng; hoặc vẽ một đường trung tuyến $AM$ rồi lấy điểm $G$ trên $AM$ sao cho $AG = \\dfrac{2}{3}AM$.',
        },
      ],
    },
    {
      heading: 'Đường phân giác và điểm cách đều ba cạnh',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đường phân giác',
          text: 'Tia phân giác của góc $A$ cắt cạnh $BC$ tại $D$. Đoạn thẳng $AD$ gọi là đường phân giác (xuất phát từ đỉnh $A$) của tam giác $ABC$. Mỗi tam giác có ba đường phân giác.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Ba đường phân giác của một tam giác cùng đi qua một điểm. Điểm này cách đều ba cạnh của tam giác.',
        },
        {
          type: 'p',
          text: 'Giải thích: gọi $I$ là giao điểm của hai đường phân giác xuất phát từ $B$ và $C$; $H$, $K$, $L$ là chân các đường vuông góc kẻ từ $I$ đến $BC$, $CA$, $AB$. Nhắc lại (Bài 15): mỗi điểm nằm trên tia phân giác của một góc thì cách đều hai cạnh của góc đó.',
        },
        {
          type: 'list',
          items: [
            '$I$ nằm trên tia phân giác của góc $B$ nên $IL = IH$.',
            '$I$ nằm trên tia phân giác của góc $C$ nên $IH = IK$.',
            'Suy ra $IK = IL$. Hai tam giác vuông $AIK$ và $AIL$ có cạnh huyền $AI$ chung và $IK = IL$ nên bằng nhau (cạnh huyền – cạnh góc vuông), do đó $\\widehat{IAK} = \\widehat{IAL}$: $I$ nằm trên tia phân giác của góc $A$.',
          ],
        },
        {
          type: 'p',
          text: 'Vậy ba đường phân giác cùng đi qua $I$, và $IH = IK = IL$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Đường trung tuyến đi qua trung điểm cạnh đối diện; đường phân giác chia đôi góc ở đỉnh. Nói chung hai đường xuất phát từ cùng một đỉnh là khác nhau, và trọng tâm $G$ khác điểm $I$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ba đường luôn đồng quy',
    instruction:
      'Kéo ba đỉnh $A$, $B$, $C$. Ở chế độ «Trung tuyến», quan sát ba đường trung tuyến luôn gặp nhau tại $G$ và các tỉ số $AG : AM$, $BG : BN$, $CG : CP$. Chuyển sang «Phân giác» để thấy ba đường phân giác gặp nhau tại $I$, và ba khoảng cách $IH$, $IK$, $IL$ đến ba cạnh luôn bằng nhau, kể cả khi tam giác tù.',
  },
  examples: [
    {
      problem:
        'Tam giác $ABC$ có đường trung tuyến $AM = 9$ cm và trọng tâm $G$. Tính $AG$ và $GM$.',
      steps: [
        'Trọng tâm cách đỉnh $A$ một khoảng bằng $\\dfrac{2}{3}$ đường trung tuyến: $AG = \\dfrac{2}{3} \\cdot 9 = 6$ (cm).',
        '$GM = AM - AG = 9 - 6 = 3$ (cm).',
      ],
      answer: '$AG = 6$ cm, $GM = 3$ cm.',
    },
    {
      problem:
        'Tam giác $ABC$ có trọng tâm $G$, đường trung tuyến $BN$. Biết $GN = 2$ cm. Tính $BG$ và $BN$.',
      steps: [
        '$BG = 2GN$ (vì $BG = \\dfrac{2}{3}BN$ và $GN = \\dfrac{1}{3}BN$).',
        '$BG = 2 \\cdot 2 = 4$ (cm), $BN = BG + GN = 4 + 2 = 6$ (cm).',
      ],
      answer: '$BG = 4$ cm, $BN = 6$ cm.',
    },
    {
      problem:
        'Tam giác $ABC$ có $\\widehat{A} = 70^\\circ$, hai đường phân giác $BE$ và $CF$ cắt nhau tại $I$. Tính $\\widehat{BIC}$. Biết khoảng cách từ $I$ đến $AB$ bằng $2$ cm, tính khoảng cách từ $I$ đến $BC$.',
      steps: [
        '$\\widehat{B} + \\widehat{C} = 180^\\circ - 70^\\circ = 110^\\circ$.',
        '$\\widehat{IBC} + \\widehat{ICB} = \\dfrac{\\widehat{B} + \\widehat{C}}{2} = 55^\\circ$.',
        'Trong tam giác $IBC$: $\\widehat{BIC} = 180^\\circ - 55^\\circ = 125^\\circ$.',
        '$I$ là giao điểm của ba đường phân giác nên cách đều ba cạnh; khoảng cách từ $I$ đến $BC$ cũng bằng $2$ cm.',
      ],
      answer: '$\\widehat{BIC} = 125^\\circ$; khoảng cách từ $I$ đến $BC$ bằng $2$ cm.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tam giác $ABC$ có trọng tâm $G$ và đường trung tuyến $AM = 12$ cm. Tính $AG$ (cm).',
      answer: 8,
      unit: 'cm',
      hints: ['$AG$ bằng mấy phần độ dài đường trung tuyến $AM$?'],
      solution: '$AG = \\dfrac{2}{3}AM = \\dfrac{2}{3} \\cdot 12 = 8$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có trọng tâm $G$, đường trung tuyến $AM$ và $GM = 2{,}5$ cm. Tính $AM$ (cm).',
      answer: 7.5,
      unit: 'cm',
      hints: ['$GM = \\dfrac{1}{3}AM$.'],
      solution: '$GM = \\dfrac{1}{3}AM$ nên $AM = 3 \\cdot 2{,}5 = 7{,}5$ (cm).',
    },
    {
      type: 'fraction',
      prompt:
        'Gọi $G$ là trọng tâm của tam giác $ABC$ và $AM$ là đường trung tuyến. Tỉ số $\\dfrac{GM}{AM}$ bằng bao nhiêu? Viết dưới dạng phân số tối giản.',
      answer: [1, 3],
      simplest: true,
      hints: ['$AG = \\dfrac{2}{3}AM$; phần còn lại của $AM$ là $GM$.'],
      solution:
        '$GM = AM - AG = AM - \\dfrac{2}{3}AM = \\dfrac{1}{3}AM$, nên $\\dfrac{GM}{AM} = \\dfrac{1}{3}$.',
    },
    {
      type: 'multi',
      prompt:
        'Gọi $G$ là trọng tâm của tam giác $ABC$ và $AM$ là đường trung tuyến. Chọn tất cả các khẳng định đúng.',
      options: ['$AG = 2GM$', '$GM = \\dfrac{1}{3}AM$', '$AG = \\dfrac{1}{2}AM$', '$AG = 3GM$'],
      answers: [0, 1],
      hints: ['Chia $AM$ thành ba phần bằng nhau: $AG$ chiếm mấy phần, $GM$ chiếm mấy phần?'],
      solution:
        '$AG = \\dfrac{2}{3}AM$, $GM = \\dfrac{1}{3}AM$, nên $AG = 2GM$. Hai khẳng định còn lại sai.',
    },
    {
      type: 'choice',
      prompt: 'Giao điểm của ba đường phân giác của một tam giác',
      options: [
        'cách đều ba đỉnh của tam giác',
        'cách đều ba cạnh của tam giác',
        'là trọng tâm của tam giác',
        'cách mỗi đỉnh $\\dfrac{2}{3}$ độ dài đường phân giác',
      ],
      answer: 1,
      hints: ['Mỗi điểm trên tia phân giác của một góc cách đều hai cạnh của góc đó.'],
      solution:
        'Giao điểm của ba đường phân giác cách đều ba cạnh của tam giác. Tỉ lệ $\\dfrac{2}{3}$ là tính chất của trọng tâm (giao điểm ba đường trung tuyến).',
    },
    {
      type: 'number',
      prompt:
        'Ba đường phân giác của tam giác $ABC$ cắt nhau tại $I$. Khoảng cách từ $I$ đến cạnh $AB$ bằng $3$ cm. Khoảng cách từ $I$ đến cạnh $BC$ bằng bao nhiêu xăng-ti-mét?',
      answer: 3,
      unit: 'cm',
      hints: ['Giao điểm của ba đường phân giác có tính chất gì với ba cạnh?'],
      solution:
        '$I$ cách đều ba cạnh của tam giác, nên khoảng cách từ $I$ đến $BC$ cũng bằng $3$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $\\widehat{A} = 80^\\circ$. Hai đường phân giác $BE$ và $CF$ cắt nhau tại $I$. Tính $\\widehat{BIC}$ (độ).',
      answer: 130,
      unit: '°',
      hints: [
        'Tính $\\widehat{B} + \\widehat{C}$.',
        '$\\widehat{IBC} + \\widehat{ICB}$ bằng một nửa tổng đó.',
      ],
      solution:
        '$\\widehat{B} + \\widehat{C} = 100^\\circ$, nên $\\widehat{IBC} + \\widehat{ICB} = 50^\\circ$ và $\\widehat{BIC} = 180^\\circ - 50^\\circ = 130^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Tam giác $ABC$ cân tại $A$, $M$ là trung điểm của $BC$. Đường trung tuyến $AM$ còn là',
      options: [
        'đường phân giác xuất phát từ đỉnh $A$',
        'đường song song với $BC$',
        'đoạn thẳng bằng $BC$',
        'đường phân giác xuất phát từ đỉnh $B$',
      ],
      answer: 0,
      hints: ['So sánh hai tam giác $ABM$ và $ACM$.'],
      solution:
        '$\\triangle ABM = \\triangle ACM$ (c.c.c: $AB = AC$, $MB = MC$, $AM$ chung), nên $\\widehat{BAM} = \\widehat{CAM}$: $AM$ cũng là đường phân giác xuất phát từ đỉnh $A$.',
    },
    {
      type: 'number',
      prompt:
        'Một tấm bìa hình tam giác được đặt thăng bằng trên đầu bút chì tại trọng tâm của nó. Một đường trung tuyến của tấm bìa dài $15$ cm. Đầu bút chì cách đỉnh của đường trung tuyến đó bao nhiêu xăng-ti-mét?',
      answer: 10,
      unit: 'cm',
      hints: ['Trọng tâm cách đỉnh bao nhiêu phần độ dài trung tuyến?'],
      solution: 'Trọng tâm cách đỉnh $\\dfrac{2}{3} \\cdot 15 = 10$ (cm).',
    },
  ],
  takeaways: [
    'Ba đường trung tuyến đồng quy tại trọng tâm $G$: $AG = \\dfrac{2}{3}AM$, $GM = \\dfrac{1}{3}AM$, $AG = 2GM$.',
    'Ba đường phân giác đồng quy tại một điểm cách đều ba cạnh của tam giác.',
    'Trọng tâm có thể tìm bằng giao điểm của chỉ hai đường trung tuyến.',
  ],
};
