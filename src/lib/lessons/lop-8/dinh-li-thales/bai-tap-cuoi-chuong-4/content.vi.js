/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương 4: hệ thống hoá định lí Thalès, đường trung bình và tính chất đường phân giác của tam giác, luyện trắc nghiệm, tự luận, bài toán thực tế và bài kiểm tra có bản đồ kĩ năng.',
  intro:
    'Chương 4 cho em ba công cụ để làm việc với các đoạn thẳng tỉ lệ trong tam giác: định lí Thalès (thuận và đảo), đường trung bình và tính chất đường phân giác. Bài này hệ thống lại cả chương, luyện các dạng trắc nghiệm, tự luận và vận dụng thực tế, rồi cho em một bài kiểm tra; bản đồ kĩ năng tô màu từng bài để chỉ ra phần đã vững và phần cần ôn lại.',
  objectives: [
    'Hệ thống hoá các định lí và tính chất của chương Định lí Thalès.',
    'Chọn đúng định lí cho từng dạng bài: tính độ dài, tính góc, chứng minh song song.',
    'Vận dụng để giải các bài toán thực tế như đo khoảng cách không đến được.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức',
      blocks: [
        {
          type: 'table',
          caption: 'Các kết quả chính của chương 4',
          head: ['Nội dung', 'Phát biểu', 'Tỉ lệ thức, hệ thức'],
          rows: [
            [
              'Đoạn thẳng tỉ lệ',
              "$AB$, $CD$ tỉ lệ với $A'B'$, $C'D'$",
              "$\\dfrac{AB}{CD} = \\dfrac{A'B'}{C'D'}$",
            ],
            [
              'Định lí Thalès',
              'Đường thẳng song song với một cạnh, cắt hai cạnh còn lại, định ra những đoạn thẳng tương ứng tỉ lệ',
              "$B'C' \\parallel BC \\Rightarrow \\dfrac{AB'}{AB} = \\dfrac{AC'}{AC}$",
            ],
            [
              'Định lí Thalès đảo',
              'Đường thẳng định ra trên hai cạnh những đoạn tương ứng tỉ lệ thì song song với cạnh còn lại',
              "$\\dfrac{AB'}{AB} = \\dfrac{AC'}{AC} \\Rightarrow B'C' \\parallel BC$",
            ],
            [
              'Đường trung bình',
              'Nối trung điểm hai cạnh; song song với cạnh thứ ba và bằng nửa cạnh đó',
              '$MN \\parallel BC$, $MN = \\dfrac{1}{2}BC$',
            ],
            [
              'Đường phân giác',
              'Chia cạnh đối diện thành hai đoạn tỉ lệ với hai cạnh kề',
              '$\\dfrac{DB}{DC} = \\dfrac{AB}{AC}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chọn công cụ theo dữ kiện',
          text: 'Có đường song song với một cạnh: dùng định lí Thalès. Cần chứng minh song song: tính hai tỉ số rồi dùng định lí Thalès đảo, hoặc chỉ ra một đường trung bình. Có trung điểm hai cạnh: nghĩ ngay tới đường trung bình. Có tia phân giác của một góc: dùng tỉ lệ thức $\\dfrac{DB}{DC} = \\dfrac{AB}{AC}$.',
        },
      ],
    },
    {
      heading: 'Bài kiểm tra cuối chương',
      blocks: [
        {
          type: 'p',
          text: 'Bài kiểm tra bên dưới gồm $12$ câu, ba câu cho mỗi bài 15, 16, 17 và ba câu vận dụng thực tế. Sau khi làm xong, bản đồ kĩ năng tô xanh những phần em làm đúng ngay lần đầu và tô cam, đỏ những phần cần ôn lại.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Độ dài viết dấu phẩy thập phân, ví dụ $7{,}5$; số đo góc tính bằng độ. Bấm "Làm bộ đề mới" để có bài kiểm tra khác.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra có bản đồ kĩ năng',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng chương 4 cho biết em cần ôn lại bài nào.',
  },
  examples: [
    {
      problem:
        'Cho tam giác $ABC$, $M$ là trung điểm của $BC$. Tia phân giác của góc $AMB$ cắt $AB$ tại $D$, tia phân giác của góc $AMC$ cắt $AC$ tại $E$. Chứng minh $DE \\parallel BC$.',
      steps: [
        'Trong tam giác $AMB$, $MD$ là phân giác nên $\\dfrac{DA}{DB} = \\dfrac{MA}{MB}$.',
        'Trong tam giác $AMC$, $ME$ là phân giác nên $\\dfrac{EA}{EC} = \\dfrac{MA}{MC}$.',
        'Vì $MB = MC$ nên $\\dfrac{DA}{DB} = \\dfrac{EA}{EC}$: đường thẳng $DE$ định ra trên $AB$, $AC$ những đoạn thẳng tương ứng tỉ lệ.',
      ],
      answer: 'Theo định lí Thalès đảo, $DE \\parallel BC$.',
    },
    {
      problem:
        'Cho tứ giác $ABCD$ có $AB = 8$ cm, $CD = 12$ cm. Gọi $E$, $F$, $I$ lần lượt là trung điểm của $AD$, $BC$, $AC$. Tính $EI$, $IF$ và chứng tỏ $EF \\le 10$ cm.',
      steps: [
        'Trong tam giác $ACD$, $EI$ là đường trung bình nên $EI = \\dfrac{CD}{2} = 6$ cm.',
        'Trong tam giác $ABC$, $IF$ là đường trung bình nên $IF = \\dfrac{AB}{2} = 4$ cm.',
        'Với ba điểm $E$, $I$, $F$ ta luôn có $EF \\le EI + IF = 10$ cm.',
      ],
      answer: '$EI = 6$ cm, $IF = 4$ cm và $EF \\le 10$ cm.',
    },
    {
      problem:
        'Để đo khoảng cách giữa hai điểm $B$, $C$ bị ngăn bởi một toà nhà, bạn An chọn điểm $A$ nhìn thấy được cả $B$ và $C$, cắm cọc tại trung điểm $M$ của $AB$ và trung điểm $N$ của $AC$, đo được $MN = 27{,}5$ m. Tính $BC$.',
      steps: [
        '$MN$ là đường trung bình của tam giác $ABC$.',
        'Do đó $BC = 2 \\cdot MN = 2 \\cdot 27{,}5$.',
      ],
      answer: '$BC = 55$ m.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cho $AB = 1{,}2$ m và $CD = 80$ cm. Tỉ số $\\dfrac{AB}{CD}$ bằng:',
      options: ['$\\dfrac{2}{3}$', '$\\dfrac{3}{2}$', '$\\dfrac{3}{200}$', '$15$'],
      answer: 1,
      hints: ['Đổi về cùng đơn vị: $1{,}2$ m $= 120$ cm.'],
      solution: '$\\dfrac{AB}{CD} = \\dfrac{120}{80} = \\dfrac{3}{2}$.',
    },
    {
      type: 'choice',
      prompt:
        'Tam giác $ABC$ có $DE \\parallel BC$ ($D \\in AB$, $E \\in AC$). Tỉ lệ thức nào không đúng?',
      options: [
        '$\\dfrac{AD}{AB} = \\dfrac{AE}{AC}$',
        '$\\dfrac{AD}{DB} = \\dfrac{AE}{EC}$',
        '$\\dfrac{DB}{AB} = \\dfrac{EC}{AC}$',
        '$\\dfrac{AD}{AB} = \\dfrac{EC}{AC}$',
      ],
      answer: 3,
      hints: ['Hai vế phải lấy những đoạn ở vị trí tương ứng trên hai cạnh.'],
      solution:
        'Ba tỉ lệ thức đầu là của định lí Thalès. Tỉ lệ thức cuối ghép $AD$ (sát đỉnh $A$) với $EC$ (sát đáy) nên nói chung sai.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $DE \\parallel BC$ ($D \\in AB$, $E \\in AC$), $AD = 4$ cm, $DB = 6$ cm, $AE = 3$ cm. Tính $AC$.',
      answer: 7.5,
      unit: 'cm',
      hints: ['Tính $EC$ từ $\\dfrac{AD}{DB} = \\dfrac{AE}{EC}$.', '$AC = AE + EC$.'],
      solution:
        '$\\dfrac{4}{6} = \\dfrac{3}{EC}$ nên $EC = \\dfrac{3 \\cdot 6}{4} = 4{,}5$ cm. Vậy $AC = 3 + 4{,}5 = 7{,}5$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Tam giác $ABC$ có $AB = 15$ cm, $AC = 20$ cm. Lấy $D \\in AB$, $E \\in AC$ với $AD = 6$ cm, $AE = 8$ cm. Khi đó:',
      options: [
        '$DE \\parallel BC$ vì $\\dfrac{AD}{AB} = \\dfrac{AE}{AC}$',
        '$DE$ không song song với $BC$ vì $AD \\ne AE$',
        '$DE$ là đường trung bình của tam giác $ABC$',
      ],
      answer: 0,
      hints: ['So sánh $\\dfrac{AD}{AB}$ và $\\dfrac{AE}{AC}$.'],
      solution:
        '$\\dfrac{6}{15} = \\dfrac{8}{20} = \\dfrac{2}{5}$, nên $DE \\parallel BC$ theo định lí Thalès đảo. $DE$ không phải đường trung bình vì $D$, $E$ không phải trung điểm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $M$, $N$ là trung điểm của $AB$, $AC$ và $MN = 7{,}5$ cm. Tính $BC$.',
      answer: 15,
      unit: 'cm',
      hints: ['$BC = 2 \\cdot MN$.'],
      solution: '$MN$ là đường trung bình nên $BC = 2 \\cdot 7{,}5 = 15$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác đều $ABC$ có cạnh $8$ cm. Tính chu vi tam giác có ba đỉnh là trung điểm ba cạnh của $ABC$.',
      answer: 12,
      unit: 'cm',
      hints: ['Mỗi cạnh của tam giác nhỏ là một đường trung bình.'],
      solution:
        'Mỗi cạnh của tam giác nhỏ bằng $\\dfrac{8}{2} = 4$ cm, nên chu vi bằng $3 \\cdot 4 = 12$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $\\widehat{A} = 70^\\circ$, $\\widehat{B} = 60^\\circ$; $M$, $N$ là trung điểm của $AB$, $AC$. Tính số đo góc $ANM$ (độ).',
      answer: 50,
      unit: '°',
      hints: [
        'Tính góc $C$ bằng tổng ba góc của tam giác.',
        '$MN \\parallel BC$ nên $\\widehat{ANM} = \\widehat{ACB}$.',
      ],
      solution:
        '$\\widehat{C} = 180^\\circ - 70^\\circ - 60^\\circ = 50^\\circ$. Vì $MN \\parallel BC$ nên $\\widehat{ANM} = \\widehat{ACB} = 50^\\circ$ (đồng vị).',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AB = 14$ cm, $AC = 21$ cm, $BC = 20$ cm. Đường phân giác của góc $A$ cắt $BC$ tại $D$. Tính $DB$.',
      answer: 8,
      unit: 'cm',
      hints: ['$\\dfrac{DB}{AB} = \\dfrac{BC}{AB + AC}$.'],
      solution:
        '$\\dfrac{DB}{14} = \\dfrac{DC}{21} = \\dfrac{20}{35} = \\dfrac{4}{7}$, nên $DB = 8$ cm (và $DC = 12$ cm).',
    },
    {
      type: 'fraction',
      prompt:
        'Tam giác $ABC$ có $AB = 5$ cm, $AC = 7$ cm, $AD$ là đường phân giác ($D \\in BC$). Tính tỉ số diện tích $\\dfrac{S_{ABD}}{S_{ACD}}$.',
      answer: [5, 7],
      hints: [
        'Hai tam giác $ABD$ và $ACD$ có chung đường cao kẻ từ $A$ xuống $BC$.',
        'Tỉ số diện tích bằng tỉ số hai đáy $\\dfrac{DB}{DC}$.',
      ],
      solution:
        'Hai tam giác có chung đường cao từ $A$ nên $\\dfrac{S_{ABD}}{S_{ACD}} = \\dfrac{DB}{DC} = \\dfrac{AB}{AC} = \\dfrac{5}{7}$.',
    },
    {
      type: 'number',
      prompt:
        'Tứ giác $ABCD$ có $AB = 8$ cm, $CD = 12$ cm; $E$, $F$, $I$ là trung điểm của $AD$, $BC$, $AC$. Tính $EI + IF$.',
      answer: 10,
      unit: 'cm',
      hints: [
        '$EI$ là đường trung bình của tam giác $ACD$.',
        '$IF$ là đường trung bình của tam giác $ABC$.',
      ],
      solution:
        '$EI = \\dfrac{CD}{2} = 6$ cm, $IF = \\dfrac{AB}{2} = 4$ cm, nên $EI + IF = 10$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Chiếc thang chữ A có thanh xà ngang $MN$ nối trung điểm của hai chân thang $AB$ và $AC$. Khi mở thang, hai chân đứng cách nhau $BC = 1{,}4$ m. Thanh xà $MN$ dài bao nhiêu mét?',
      answer: 0.7,
      unit: 'm',
      hints: ['$MN$ là đường trung bình của tam giác $ABC$.'],
      solution: '$MN = \\dfrac{1}{2}BC = \\dfrac{1{,}4}{2} = 0{,}7$ m.',
    },
    {
      type: 'number',
      prompt:
        'Một mái che hình tam giác $ABC$ có kèo $AB = 2{,}5$ m, $AC = 3$ m. Thanh giằng $MN \\parallel BC$ với $M \\in AB$, $N \\in AC$ và $AM = 1$ m. Tính $NC$ (mét).',
      answer: 1.8,
      unit: 'm',
      hints: ['$\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$ cho $AN$.', '$NC = AC - AN$.'],
      solution:
        '$\\dfrac{AN}{3} = \\dfrac{1}{2{,}5} = 0{,}4$ nên $AN = 1{,}2$ m và $NC = 3 - 1{,}2 = 1{,}8$ m.',
    },
  ],
  takeaways: [
    'Định lí Thalès và định lí đảo nối hai ý "song song" và "tỉ lệ".',
    'Đường trung bình là trường hợp riêng với tỉ số $\\dfrac{1}{2}$: song song và bằng nửa cạnh thứ ba.',
    'Đường phân giác chia cạnh đối diện theo tỉ lệ hai cạnh kề.',
    'Với một khoảng cách không đo trực tiếp được, dựng tam giác, đo đường trung bình rồi nhân đôi.',
  ],
};
