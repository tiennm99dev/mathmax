/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương 9: hệ thống hoá tam giác đồng dạng, các trường hợp đồng dạng, định lí Pythagore và hình đồng dạng, luyện trắc nghiệm, tự luận, bài toán thực tế và bài kiểm tra có bản đồ kĩ năng.',
  intro:
    'Chương 9 cho em một công cụ rất mạnh: hai tam giác đồng dạng thì các cạnh tương ứng tỉ lệ và các góc tương ứng bằng nhau. Nhờ đó ta tính được những độ dài không đo trực tiếp được, như chiều cao kim tự tháp hay bề rộng một con sông. Bài này hệ thống lại cả chương, luyện các dạng trắc nghiệm, tự luận và vận dụng thực tế, rồi cho em một bài kiểm tra; bản đồ kĩ năng tô màu từng bài để chỉ ra phần đã vững và phần cần ôn lại.',
  objectives: [
    'Hệ thống hoá định nghĩa, các trường hợp đồng dạng của hai tam giác và của hai tam giác vuông, định lí Pythagore và hình đồng dạng.',
    'Chọn đúng trường hợp đồng dạng từ dữ kiện, viết đúng các cặp đỉnh tương ứng và tỉ lệ thức.',
    'Vận dụng tam giác đồng dạng và định lí Pythagore để giải các bài toán đo đạc thực tế.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức',
      blocks: [
        {
          type: 'table',
          caption: 'Các kết quả chính của chương 9',
          head: ['Nội dung', 'Phát biểu', 'Kí hiệu, hệ thức'],
          rows: [
            [
              'Hai tam giác đồng dạng',
              'Các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ; $k$ là tỉ số đồng dạng',
              "$\\triangle A'B'C' \\backsim \\triangle ABC$: $\\dfrac{A'B'}{AB} = \\dfrac{B'C'}{BC} = \\dfrac{C'A'}{CA} = k$",
            ],
            [
              'Định lí về đường song song',
              'Một đường thẳng cắt hai cạnh của tam giác và song song với cạnh còn lại tạo thành một tam giác mới đồng dạng với tam giác đã cho',
              '$MN \\parallel BC \\Rightarrow \\triangle AMN \\backsim \\triangle ABC$',
            ],
            [
              'Trường hợp cạnh – cạnh – cạnh',
              'Ba cạnh của tam giác này tỉ lệ với ba cạnh của tam giác kia',
              "$\\dfrac{A'B'}{AB} = \\dfrac{B'C'}{BC} = \\dfrac{C'A'}{CA}$",
            ],
            [
              'Trường hợp cạnh – góc – cạnh',
              'Hai cạnh tỉ lệ và góc xen giữa bằng nhau',
              "$\\dfrac{A'B'}{AB} = \\dfrac{A'C'}{AC}$, $\\widehat{A'} = \\widehat{A}$",
            ],
            [
              'Trường hợp góc – góc',
              'Hai góc của tam giác này bằng hai góc của tam giác kia',
              "$\\widehat{A'} = \\widehat{A}$, $\\widehat{B'} = \\widehat{B}$",
            ],
            [
              'Định lí Pythagore và định lí đảo',
              'Tam giác vuông khi và chỉ khi bình phương cạnh lớn nhất bằng tổng bình phương hai cạnh kia',
              '$\\widehat{A} = 90^\\circ \\Leftrightarrow BC^2 = AB^2 + AC^2$',
            ],
            [
              'Hai tam giác vuông đồng dạng',
              'Có một góc nhọn bằng nhau; hoặc hai cạnh góc vuông tỉ lệ; hoặc cạnh huyền và một cạnh góc vuông tỉ lệ',
              "$\\dfrac{B'C'}{BC} = \\dfrac{A'B'}{AB}$ (cạnh huyền, cạnh góc vuông)",
            ],
            [
              'Hình đồng dạng phối cảnh',
              "Hình $H'$ đồng dạng phối cảnh với hình $H$, tâm $O$, tỉ số $k$: mỗi điểm $A'$ nằm trên tia $OA$",
              "$OA' = k \\cdot OA$",
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chọn trường hợp theo dữ kiện',
          text: 'Biết ba cạnh: thử trường hợp cạnh – cạnh – cạnh. Biết hai cạnh và góc xen giữa: cạnh – góc – cạnh. Có đường song song, góc chung, góc đối đỉnh hay góc so le: tìm hai cặp góc bằng nhau (góc – góc). Với tam giác vuông, chỉ cần thêm một góc nhọn bằng nhau, hoặc hai cặp cạnh tỉ lệ.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Viết đúng thứ tự đỉnh',
          text: "Kí hiệu $\\triangle A'B'C' \\backsim \\triangle ABC$ ghép $A'$ với $A$, $B'$ với $B$, $C'$ với $C$. Tỉ số đồng dạng $k = \\dfrac{A'B'}{AB}$ lấy cạnh của tam giác viết trước chia cho cạnh tương ứng của tam giác viết sau.",
        },
      ],
    },
    {
      heading: 'Bài kiểm tra cuối chương',
      blocks: [
        {
          type: 'p',
          text: 'Bài kiểm tra bên dưới gồm $12$ câu: hai câu cho mỗi bài 33, 34, 35, 36, 37 và hai câu vận dụng thực tế. Sau khi làm xong, bản đồ kĩ năng tô xanh những phần em làm đúng ngay lần đầu và tô cam, đỏ những phần cần ôn lại.',
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
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng chương 9 cho biết em cần ôn lại bài nào.',
  },
  examples: [
    {
      problem:
        'Hai đường trung tuyến $BM$, $CN$ của tam giác $ABC$ cắt nhau tại $G$. Chứng minh $\\triangle GMN \\backsim \\triangle GBC$ và tìm tỉ số đồng dạng. Từ đó tính $GM$ khi $BM = 9$ cm.',
      steps: [
        '$M$, $N$ là trung điểm của $AC$, $AB$ nên $MN$ là đường trung bình của tam giác $ABC$: $MN \\parallel BC$ và $MN = \\dfrac{1}{2}BC$.',
        'Vì $MN \\parallel BC$ nên $\\widehat{GMN} = \\widehat{GBC}$ (so le trong); lại có $\\widehat{MGN} = \\widehat{BGC}$ (đối đỉnh). Do đó $\\triangle GMN \\backsim \\triangle GBC$ (g.g).',
        'Tỉ số đồng dạng $k = \\dfrac{MN}{BC} = \\dfrac{1}{2}$, nên $GM = \\dfrac{1}{2}GB$.',
        '$BM = GB + GM = 3GM = 9$ cm, suy ra $GM = 3$ cm.',
      ],
      answer: '$\\triangle GMN \\backsim \\triangle GBC$ với tỉ số $\\dfrac{1}{2}$; $GM = 3$ cm.',
    },
    {
      problem:
        'Tam giác $ABC$ vuông tại $A$ có $AB = 6$ cm, $AC = 8$ cm, đường cao $AH$. Tính $BC$, $BH$ và $AH$.',
      steps: [
        'Theo định lí Pythagore: $BC^2 = 6^2 + 8^2 = 100$, nên $BC = 10$ cm.',
        '$\\triangle HBA$ và $\\triangle ABC$ vuông tại $H$, $A$ và có chung góc $B$, nên $\\triangle HBA \\backsim \\triangle ABC$.',
        'Suy ra $\\dfrac{HB}{AB} = \\dfrac{AB}{BC}$, tức $HB = \\dfrac{AB^2}{BC} = \\dfrac{36}{10} = 3{,}6$ cm.',
        'Cũng từ đó $\\dfrac{HA}{AC} = \\dfrac{AB}{BC}$, tức $AH = \\dfrac{AB \\cdot AC}{BC} = \\dfrac{6 \\cdot 8}{10} = 4{,}8$ cm.',
      ],
      answer: '$BC = 10$ cm, $BH = 3{,}6$ cm, $AH = 4{,}8$ cm.',
    },
    {
      problem:
        'Để đo bề rộng $AB$ của một con sông ($A$ ở bờ bên kia), người ta kẻ $BE \\perp AB$ trên bờ bên này, lấy điểm $C$ trên $BE$, rồi dựng $ED \\perp BE$ sao cho $A$, $C$, $D$ thẳng hàng. Đo được $BC = 30$ m, $CE = 10$ m, $DE = 12$ m. Tính $AB$.',
      steps: [
        '$\\triangle ABC$ và $\\triangle DEC$ vuông tại $B$ và $E$, có $\\widehat{ACB} = \\widehat{DCE}$ (đối đỉnh).',
        'Do đó $\\triangle ABC \\backsim \\triangle DEC$ (một góc nhọn bằng nhau), suy ra $\\dfrac{AB}{DE} = \\dfrac{BC}{EC} = \\dfrac{30}{10} = 3$.',
        '$AB = 3 \\cdot DE = 3 \\cdot 12 = 36$ m.',
      ],
      answer: 'Con sông rộng $36$ m.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        "Cho $\\triangle A'B'C' \\backsim \\triangle ABC$ với tỉ số đồng dạng bằng $2$. Khẳng định nào sau đây đúng?",
      options: [
        "$\\dfrac{AB}{A'B'} = 2$",
        "$\\dfrac{A'B'}{AB} = 2$",
        "$\\widehat{A'} = 2\\widehat{A}$",
        "$\\dfrac{A'B'}{AC} = 2$",
      ],
      answer: 1,
      hints: [
        "Tỉ số đồng dạng của $\\triangle A'B'C'$ với $\\triangle ABC$ là $\\dfrac{A'B'}{AB}$.",
        'Các góc tương ứng của hai tam giác đồng dạng thì bằng nhau, không nhân lên.',
      ],
      solution:
        "Tỉ số đồng dạng $k = \\dfrac{A'B'}{AB} = 2$. Ta có $\\dfrac{AB}{A'B'} = \\dfrac{1}{2}$, $\\widehat{A'} = \\widehat{A}$, còn $A'B'$ và $AC$ không phải hai cạnh tương ứng.",
    },
    {
      type: 'choice',
      prompt:
        'Cho tam giác $ABC$ vuông tại $A$ và tam giác $DEF$ vuông tại $D$. Điều nào dưới đây không suy ra được $\\triangle ABC \\backsim \\triangle DEF$?',
      options: [
        '$\\widehat{B} = \\widehat{E}$',
        '$\\widehat{C} = \\widehat{F}$',
        '$\\widehat{B} + \\widehat{C} = \\widehat{E} + \\widehat{F}$',
        '$\\dfrac{AB}{DE} = \\dfrac{AC}{DF}$',
      ],
      answer: 2,
      hints: ['Trong mọi tam giác vuông, tổng hai góc nhọn bằng bao nhiêu?'],
      solution:
        'Đẳng thức $\\widehat{B} + \\widehat{C} = \\widehat{E} + \\widehat{F} = 90^\\circ$ luôn đúng với mọi cặp tam giác vuông nên không cho thêm thông tin. Hai phương án đầu cho một góc nhọn bằng nhau, phương án cuối cho hai cạnh góc vuông tỉ lệ: đều suy ra hai tam giác vuông đồng dạng.',
    },
    {
      type: 'choice',
      prompt: 'Bộ ba số đo nào dưới đây là độ dài ba cạnh của một tam giác vuông?',
      options: [
        '$3$ m; $5$ m; $6$ m',
        '$6$ m; $8$ m; $10$ m',
        '$1$ cm; $0{,}5$ cm; $1{,}25$ cm',
        '$2$ m; $3$ m; $4$ m',
      ],
      answer: 1,
      hints: [
        'Dùng định lí Pythagore đảo: so sánh bình phương cạnh lớn nhất với tổng bình phương hai cạnh kia.',
      ],
      solution:
        '$6^2 + 8^2 = 36 + 64 = 100 = 10^2$. Các bộ khác: $3^2 + 5^2 = 34 \\ne 36$; $1^2 + 0{,}5^2 = 1{,}25 \\ne 1{,}25^2 = 1{,}5625$; $2^2 + 3^2 = 13 \\ne 16$.',
    },
    {
      type: 'match',
      prompt:
        "Ghép mỗi dữ kiện với trường hợp đồng dạng của $\\triangle A'B'C'$ và $\\triangle ABC$.",
      left: [
        "$\\dfrac{A'B'}{AB} = \\dfrac{B'C'}{BC} = \\dfrac{C'A'}{CA}$",
        "$\\dfrac{A'B'}{AB} = \\dfrac{A'C'}{AC}$ và $\\widehat{A'} = \\widehat{A}$",
        "$\\widehat{A'} = \\widehat{A}$ và $\\widehat{B'} = \\widehat{B}$",
      ],
      right: ['Cạnh – cạnh – cạnh', 'Cạnh – góc – cạnh', 'Góc – góc', 'Cạnh – cạnh – góc'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Đếm xem dữ kiện cho bao nhiêu cặp cạnh tỉ lệ và bao nhiêu cặp góc bằng nhau.',
        'Trong trường hợp cạnh – góc – cạnh, góc bằng nhau phải xen giữa hai cạnh tỉ lệ.',
      ],
      solution:
        'Ba cặp cạnh tỉ lệ: cạnh – cạnh – cạnh. Hai cặp cạnh tỉ lệ cùng góc xen giữa $A$ bằng nhau: cạnh – góc – cạnh. Hai cặp góc bằng nhau: góc – góc. Không có trường hợp "cạnh – cạnh – góc".',
    },
    {
      type: 'number',
      prompt:
        'Cho $\\triangle ABC \\backsim \\triangle DEF$ với $AB = 6$ cm, $BC = 9$ cm, $CA = 12$ cm và $DE = 4$ cm. Tính chu vi tam giác $DEF$.',
      answer: 18,
      unit: 'cm',
      hints: [
        'Tỉ số $\\dfrac{DE}{AB}$ cho biết tam giác $DEF$ nhỏ đi bao nhiêu lần.',
        'Chu vi cũng thay đổi theo đúng tỉ số đó.',
      ],
      solution:
        '$\\dfrac{DE}{AB} = \\dfrac{4}{6} = \\dfrac{2}{3}$. Chu vi tam giác $ABC$ là $6 + 9 + 12 = 27$ cm, nên chu vi tam giác $DEF$ là $\\dfrac{2}{3} \\cdot 27 = 18$ cm (các cạnh là $4$ cm, $6$ cm, $8$ cm).',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AB = 7{,}5$ cm, $BC = 10$ cm. Điểm $M$ thuộc $BC$ với $BM = 4$ cm; qua $M$ kẻ đường thẳng song song với $AB$, cắt $AC$ tại $N$. Tính $MN$.',
      answer: 4.5,
      unit: 'cm',
      hints: [
        '$MN \\parallel AB$ nên $\\triangle CMN \\backsim \\triangle CBA$.',
        '$\\dfrac{MN}{AB} = \\dfrac{CM}{CB}$, với $CM = BC - BM$.',
      ],
      solution:
        '$CM = 10 - 4 = 6$ cm. Vì $MN \\parallel AB$ nên $\\triangle CMN \\backsim \\triangle CBA$, suy ra $\\dfrac{MN}{AB} = \\dfrac{CM}{CB} = \\dfrac{6}{10}$. Vậy $MN = 7{,}5 \\cdot 0{,}6 = 4{,}5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Hai đường trung tuyến $BM$ và $CN$ của tam giác $ABC$ cắt nhau tại $G$, $CN = 12$ cm. Tính $GN$.',
      answer: 4,
      unit: 'cm',
      hints: [
        '$MN$ là đường trung bình nên $\\triangle GMN \\backsim \\triangle GBC$ với tỉ số $\\dfrac{1}{2}$.',
        'Suy ra $GC = 2GN$ và $CN = GC + GN$.',
      ],
      solution:
        '$\\triangle GMN \\backsim \\triangle GBC$ với tỉ số $\\dfrac{MN}{BC} = \\dfrac{1}{2}$, nên $GN = \\dfrac{1}{2}GC$. Do đó $CN = 3GN = 12$ cm và $GN = 4$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $AB = 9$ cm, $AC = 12$ cm, đường cao $AH$. Tính $AH$.',
      answer: 7.2,
      unit: 'cm',
      hints: [
        'Tính $BC$ bằng định lí Pythagore.',
        '$\\triangle HBA \\backsim \\triangle ABC$ cho $\\dfrac{AH}{AC} = \\dfrac{AB}{BC}$.',
      ],
      solution:
        '$BC^2 = 9^2 + 12^2 = 225$, nên $BC = 15$ cm. Từ $\\triangle HBA \\backsim \\triangle ABC$: $AH = \\dfrac{AB \\cdot AC}{BC} = \\dfrac{9 \\cdot 12}{15} = 7{,}2$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$, đường cao $AH$ chia cạnh huyền thành $HB = 4$ cm và $HC = 9$ cm. Tính $AH$.',
      answer: 6,
      unit: 'cm',
      hints: [
        '$\\triangle HBA \\backsim \\triangle HAC$ vì cùng đồng dạng với $\\triangle ABC$.',
        'Suy ra $\\dfrac{HB}{HA} = \\dfrac{HA}{HC}$.',
      ],
      solution:
        '$\\triangle HBA \\backsim \\triangle HAC$ nên $\\dfrac{HB}{HA} = \\dfrac{HA}{HC}$, tức $AH^2 = HB \\cdot HC = 4 \\cdot 9 = 36$. Vậy $AH = 6$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một bức ảnh hình chữ nhật kích thước $10$ cm $\\times$ $15$ cm được phóng to thành một bức ảnh đồng dạng có cạnh ngắn $20$ cm. Cạnh dài của ảnh mới bằng bao nhiêu xăng-ti-mét?',
      answer: 30,
      unit: 'cm',
      hints: ['Hai hình đồng dạng có mọi độ dài tương ứng tỉ lệ theo cùng một tỉ số $k$.'],
      solution:
        'Tỉ số đồng dạng $k = \\dfrac{20}{10} = 2$, nên cạnh dài của ảnh mới là $2 \\cdot 15 = 30$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Để ước tính chiều cao một kim tự tháp, người ta cắm một cây cọc cao $1$ m vuông góc với mặt đất và đo được bóng cọc dài $1{,}5$ m. Cùng lúc đó, bóng kim tự tháp (tính từ tâm đáy) dài $219$ m. Kim tự tháp cao bao nhiêu mét?',
      answer: 146,
      unit: 'm',
      hints: [
        'Tia nắng song song nên tam giác vuông (cọc, bóng cọc) và (kim tự tháp, bóng) có một góc nhọn bằng nhau.',
        'Chiều cao tỉ lệ với độ dài bóng: $\\dfrac{h}{1} = \\dfrac{219}{1{,}5}$.',
      ],
      solution:
        'Hai tam giác vuông đồng dạng nên $\\dfrac{h}{1} = \\dfrac{219}{1{,}5}$, suy ra $h = 146$ m.',
    },
    {
      type: 'number',
      prompt:
        'Bạn Lan đứng cách cửa sổ $1$ m, nhìn qua cửa sổ cao $80$ cm sang bức tường của toà nhà đối diện, cách cửa sổ $24$ m. Mỗi tầng của toà nhà đối diện cao $4$ m. Mép trên và mép dưới cửa sổ giới hạn tầm nhìn. Phần bức tường Lan nhìn thấy cao bằng bao nhiêu tầng nhà?',
      answer: 5,
      hints: [
        'Hai tia nhìn qua mép trên và mép dưới cửa sổ tạo thành hai tam giác chung đỉnh ở mắt Lan, cạnh đối diện song song nên đồng dạng.',
        'Khoảng cách từ mắt đến bức tường là $1 + 24 = 25$ m, gấp $25$ lần khoảng cách đến cửa sổ.',
      ],
      solution:
        'Hai tam giác đồng dạng với tỉ số $\\dfrac{25}{1} = 25$, nên phần tường nhìn thấy cao $25 \\cdot 0{,}8 = 20$ m, bằng chiều cao của $20 : 4 = 5$ tầng nhà.',
    },
  ],
  takeaways: [
    'Hai tam giác đồng dạng có các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ theo tỉ số đồng dạng $k$; chu vi cũng tỉ lệ theo $k$.',
    'Ba trường hợp đồng dạng: cạnh – cạnh – cạnh, cạnh – góc – cạnh, góc – góc; tam giác vuông chỉ cần một góc nhọn bằng nhau hoặc hai cặp cạnh tỉ lệ.',
    'Định lí Pythagore $BC^2 = AB^2 + AC^2$ và định lí đảo của nó dùng để tính cạnh và nhận biết tam giác vuông.',
    'Bóng nắng, gương phẳng, tầm nhìn qua cửa sổ đều tạo ra tam giác đồng dạng, giúp đo những độ dài không đo trực tiếp được.',
  ],
};
