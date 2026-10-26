/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: củng cố định lí Thalès trong tam giác, đường trung bình của tam giác và tính chất đường phân giác, với bộ đề tự sinh chấm điểm tức thì.',
  intro:
    'Ba bài của chương đều xoay quanh một ý: các đoạn thẳng tỉ lệ trong tam giác. Định lí Thalès nói về đường song song với một cạnh, đường trung bình là trường hợp tỉ số bằng $\\dfrac{1}{2}$, còn đường phân giác chia cạnh đối diện theo tỉ số hai cạnh kề. Bài này giúp em chọn đúng tỉ lệ thức cho từng tình huống.',
  objectives: [
    'Viết đúng tỉ lệ thức của định lí Thalès và dùng định lí đảo để chứng minh song song.',
    'Tính độ dài, số đo góc nhờ tính chất đường trung bình.',
    'Tính độ dài đoạn thẳng nhờ tính chất đường phân giác.',
    'Phối hợp các tính chất trong một bài toán.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Giả thiết', 'Kết luận'],
          rows: [
            [
              "$B'C' \\parallel BC$, $B' \\in AB$, $C' \\in AC$",
              "$\\dfrac{AB'}{AB} = \\dfrac{AC'}{AC}$, $\\dfrac{AB'}{B'B} = \\dfrac{AC'}{C'C}$, $\\dfrac{B'B}{AB} = \\dfrac{C'C}{AC}$",
            ],
            ["$\\dfrac{AB'}{AB} = \\dfrac{AC'}{AC}$", "$B'C' \\parallel BC$ (định lí Thalès đảo)"],
            [
              '$M$, $N$ là trung điểm của $AB$, $AC$',
              '$MN \\parallel BC$ và $MN = \\dfrac{1}{2}BC$',
            ],
            ['$AD$ là phân giác của góc $A$, $D \\in BC$', '$\\dfrac{DB}{DC} = \\dfrac{AB}{AC}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $12$ câu mới, bốn câu cho mỗi bài 15, 16, 17. Độ dài viết dấu phẩy thập phân, ví dụ $7{,}5$; số đo góc tính bằng độ.',
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
        'Tam giác $ABC$ có $MN \\parallel BC$ ($M \\in AB$, $N \\in AC$), $AM = 2$ cm, $MB = x$, $AN = 3$ cm, $NC = 4{,}5$ cm. Tìm $x$.',
      steps: [
        'Vì $MN \\parallel BC$ nên theo định lí Thalès $\\dfrac{AM}{MB} = \\dfrac{AN}{NC}$.',
        'Thay số: $\\dfrac{2}{x} = \\dfrac{3}{4{,}5}$.',
        '$x = \\dfrac{2 \\cdot 4{,}5}{3} = 3$.',
      ],
      answer: '$x = 3$ cm.',
    },
    {
      problem:
        'Tam giác $ABC$ có $BC = 10$ cm, $M$ là trung điểm của $AB$. Đường thẳng qua $M$ song song với $BC$ cắt $AC$ tại $N$. Chứng minh $N$ là trung điểm của $AC$ và tính $MN$.',
      steps: [
        'Vì $MN \\parallel BC$, theo định lí Thalès: $\\dfrac{AN}{AC} = \\dfrac{AM}{AB} = \\dfrac{1}{2}$, nên $N$ là trung điểm của $AC$.',
        'Khi đó $MN$ là đường trung bình của tam giác $ABC$.',
        '$MN = \\dfrac{1}{2}BC = 5$ cm.',
      ],
      answer: '$N$ là trung điểm của $AC$ và $MN = 5$ cm.',
    },
    {
      problem:
        'Tam giác $ABC$ có $AB = 12$ cm, $AC = 15$ cm, $BC = 18$ cm. Đường phân giác của góc $A$ cắt $BC$ tại $D$. Tính $DB$, $DC$.',
      steps: [
        'Theo tính chất đường phân giác: $\\dfrac{DB}{AB} = \\dfrac{DC}{AC}$.',
        'Theo tính chất dãy tỉ số bằng nhau: $\\dfrac{DB}{12} = \\dfrac{DC}{15} = \\dfrac{DB + DC}{27} = \\dfrac{18}{27} = \\dfrac{2}{3}$.',
        '$DB = 12 \\cdot \\dfrac{2}{3} = 8$ và $DC = 15 \\cdot \\dfrac{2}{3} = 10$.',
      ],
      answer: '$DB = 8$ cm, $DC = 10$ cm.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $MN \\parallel BC$ ($M \\in AB$, $N \\in AC$), $AM = 6$ cm, $MB = 4$ cm, $AN = 9$ cm. Tính $NC$.',
      answer: 6,
      unit: 'cm',
      hints: ['$\\dfrac{AM}{MB} = \\dfrac{AN}{NC}$.'],
      solution: '$\\dfrac{6}{4} = \\dfrac{9}{NC}$ nên $NC = \\dfrac{9 \\cdot 4}{6} = 6$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $MN \\parallel BC$ ($M \\in AB$, $N \\in AC$), $AM = x$, $MB = 5$ cm, $AN = 6$ cm, $NC = 10$ cm. Tìm $x$ (cm).',
      answer: 3,
      unit: 'cm',
      hints: ['$\\dfrac{AM}{MB} = \\dfrac{AN}{NC}$.', '$\\dfrac{x}{5} = \\dfrac{6}{10}$.'],
      solution: '$\\dfrac{x}{5} = \\dfrac{6}{10}$ nên $x = \\dfrac{5 \\cdot 6}{10} = 3$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Tam giác $ABC$ có $AB = 8$ cm, $AC = 12$ cm. Lấy $M \\in AB$, $N \\in AC$ với $AM = 3$ cm, $AN = 4{,}5$ cm. Kết luận nào đúng?',
      options: [
        '$MN \\parallel BC$',
        '$MN$ không song song với $BC$',
        'Không đủ dữ kiện để kết luận',
      ],
      answer: 0,
      hints: ['Tính và so sánh $\\dfrac{AM}{AB}$ với $\\dfrac{AN}{AC}$.'],
      solution:
        '$\\dfrac{AM}{AB} = \\dfrac{3}{8}$ và $\\dfrac{AN}{AC} = \\dfrac{4{,}5}{12} = \\dfrac{3}{8}$. Hai tỉ số bằng nhau nên theo định lí Thalès đảo, $MN \\parallel BC$.',
    },
    {
      type: 'number',
      prompt: 'Tam giác $ABC$ có $BC = 13$ cm; $M$, $N$ là trung điểm của $AB$, $AC$. Tính $MN$.',
      answer: 6.5,
      unit: 'cm',
      hints: ['$MN$ là đường trung bình của tam giác $ABC$.'],
      solution: '$MN = \\dfrac{1}{2}BC = \\dfrac{13}{2} = 6{,}5$ cm.',
    },
    {
      type: 'multi',
      prompt:
        'Tam giác $ABC$ có $M$, $N$ là trung điểm của $AB$, $AC$. Chọn tất cả các khẳng định đúng.',
      options: [
        '$MN \\parallel BC$',
        '$MN = \\dfrac{1}{2}BC$',
        '$\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$',
        '$MN \\perp BC$',
        '$MN = \\dfrac{1}{2}AB$',
      ],
      answers: [0, 1, 2],
      hints: ['$MN$ là đường trung bình ứng với cạnh $BC$.'],
      solution:
        '$MN$ là đường trung bình nên $MN \\parallel BC$ và $MN = \\dfrac{1}{2}BC$; hai tỉ số $\\dfrac{AM}{AB}$, $\\dfrac{AN}{AC}$ cùng bằng $\\dfrac{1}{2}$. $MN$ song song chứ không vuông góc với $BC$, và nói chung $MN \\ne \\dfrac{1}{2}AB$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AB = 6$ cm, $AC = 10$ cm, $BC = 8$ cm; $M$, $N$ là trung điểm của $AB$, $AC$. Tính chu vi tứ giác $BMNC$.',
      answer: 20,
      unit: 'cm',
      hints: ['Bốn cạnh của tứ giác là $BM$, $MN$, $NC$, $CB$.', '$MN = \\dfrac{1}{2}BC$.'],
      solution:
        '$BM = 3$ cm, $MN = \\dfrac{8}{2} = 4$ cm, $NC = 5$ cm, $CB = 8$ cm. Chu vi bằng $3 + 4 + 5 + 8 = 20$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AB = 10$ cm, $AC = 15$ cm, $BC = 20$ cm. Đường phân giác của góc $A$ cắt $BC$ tại $D$. Tính $DB$.',
      answer: 8,
      unit: 'cm',
      hints: ['$\\dfrac{DB}{AB} = \\dfrac{BC}{AB + AC}$.'],
      solution:
        '$\\dfrac{DB}{10} = \\dfrac{DC}{15} = \\dfrac{20}{25} = \\dfrac{4}{5}$, nên $DB = 8$ cm (và $DC = 12$ cm).',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AB = 6$ cm, $AC = 8$ cm; đường phân giác $AD$ ($D \\in BC$) có $DB = 3$ cm. Tính $BC$.',
      answer: 7,
      unit: 'cm',
      hints: ['Tính $DC$ trước từ $\\dfrac{DB}{DC} = \\dfrac{AB}{AC}$.', '$BC = DB + DC$.'],
      solution: '$\\dfrac{3}{DC} = \\dfrac{6}{8}$ nên $DC = 4$ cm, do đó $BC = 3 + 4 = 7$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AB = 9$ cm, $AC = 12$ cm, $BC = 14$ cm. Đường phân giác của góc $A$ cắt $BC$ tại $D$, $P$ là trung điểm của $BC$. Tính $DP$.',
      answer: 1,
      unit: 'cm',
      hints: [
        'Tính $DB$ bằng tính chất đường phân giác.',
        '$BP = \\dfrac{BC}{2} = 7$ cm; $D$ nằm giữa $B$ và $P$ vì $AB < AC$.',
      ],
      solution:
        '$\\dfrac{DB}{9} = \\dfrac{14}{21} = \\dfrac{2}{3}$ nên $DB = 6$ cm. $BP = 7$ cm, nên $DP = 7 - 6 = 1$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $\\widehat{ACB} = 48^\\circ$; $M$, $N$ là trung điểm của $AB$, $AC$. Tính số đo góc $ANM$ (độ).',
      answer: 48,
      unit: '°',
      hints: ['$MN \\parallel BC$.', 'Góc $ANM$ và góc $ACB$ ở vị trí đồng vị.'],
      solution:
        '$MN$ là đường trung bình nên $MN \\parallel BC$, do đó $\\widehat{ANM} = \\widehat{ACB} = 48^\\circ$ (đồng vị).',
    },
  ],
  takeaways: [
    'Song song với một cạnh thì tỉ lệ (Thalès); tỉ lệ thì song song (Thalès đảo).',
    'Đường trung bình: song song với cạnh thứ ba và bằng nửa cạnh đó.',
    'Đường phân giác: $\\dfrac{DB}{DC} = \\dfrac{AB}{AC}$; biết ba cạnh thì chia $BC$ theo tỉ lệ $AB : AC$.',
  ],
};
