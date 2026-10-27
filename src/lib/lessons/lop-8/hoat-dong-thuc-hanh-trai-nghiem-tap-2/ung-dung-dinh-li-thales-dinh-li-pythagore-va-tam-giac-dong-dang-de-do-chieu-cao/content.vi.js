/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành ngoài trời: dùng tam giác đồng dạng, định lí Thalès và định lí Pythagore để đo chiều cao của cây, toà nhà và khoảng cách tới một điểm không tới được.',
  intro:
    'Không trèo lên ngọn cây, không bơi qua sông, làm sao biết cây cao bao nhiêu hay sông rộng bao nhiêu? Chỉ cần một chiếc cọc, một thước dây, một chiếc êke và những định lí đã học trong chương Định lí Thalès và Tam giác đồng dạng.',
  objectives: [
    'Đo gián tiếp chiều cao của cây, toà nhà bằng bóng nắng và tam giác đồng dạng.',
    'Đo chiều cao bằng cách ngắm qua đỉnh một chiếc cọc và áp dụng định lí Thalès.',
    'Đo khoảng cách tới một điểm không tới được bằng tam giác vuông đồng dạng và định lí Pythagore.',
    'Tổ chức đo đạc thực tế theo nhóm và báo cáo kết quả.',
  ],
  sections: [
    {
      heading: 'Đo chiều cao bằng bóng nắng',
      blocks: [
        {
          type: 'p',
          text: 'Vào một buổi nắng, cắm một chiếc cọc thẳng đứng gần cây. Cùng một thời điểm, các tia nắng coi như song song với nhau, nên tia nắng đi qua ngọn cây và tia nắng đi qua đỉnh cọc tạo với mặt đất những góc bằng nhau.',
        },
        {
          type: 'p',
          text: 'Gọi $H$ là chiều cao cây, $S$ là độ dài bóng cây; $h$ là chiều cao cọc, $s$ là độ dài bóng cọc. Hai tam giác vuông (cây, bóng cây, tia nắng) và (cọc, bóng cọc, tia nắng) có một góc nhọn bằng nhau nên đồng dạng. Do đó',
        },
        {
          type: 'tex',
          tex: '\\frac{H}{S} = \\frac{h}{s} \\quad\\Rightarrow\\quad H = \\frac{h \\cdot S}{s}.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo đo',
          text: 'Đo bóng cây và bóng cọc gần như cùng một lúc, vì mặt trời di chuyển làm bóng dài ngắn thay đổi. Cọc phải thẳng đứng (dùng dây dọi hoặc êke để kiểm tra) và mặt đất phải bằng phẳng.',
        },
      ],
    },
    {
      heading: 'Đo chiều cao bằng cách ngắm qua đỉnh cọc',
      blocks: [
        {
          type: 'p',
          text: "Khi không có nắng, ta dùng định lí Thalès. Cắm cọc $AB$ thẳng đứng (cao $h$), người đo đặt mắt sát mặt đất tại điểm $C$ và dời cọc (hoặc dời chỗ đứng) cho đến khi mắt $C$, đỉnh cọc $B$ và ngọn cây $T'$ thẳng hàng. Gọi $T$ là gốc cây.",
        },
        {
          type: 'p',
          text: "Cọc và cây cùng vuông góc với mặt đất nên $AB \\parallel TT'$. Trong tam giác $CTT'$, theo định lí Thalès (hay hệ quả của nó):",
        },
        {
          type: 'tex',
          tex: "\\frac{AB}{TT'} = \\frac{CA}{CT} \\quad\\Rightarrow\\quad TT' = \\frac{AB \\cdot CT}{CA}.",
        },
        {
          type: 'p',
          text: 'Như vậy chỉ cần đo chiều cao cọc $AB$ và hai khoảng cách $CA$, $CT$ trên mặt đất.',
        },
      ],
    },
    {
      heading: 'Đo khoảng cách tới một điểm không tới được',
      blocks: [
        {
          type: 'p',
          text: 'Muốn đo khoảng cách $AB$ từ điểm $A$ bên này sông tới một cái cây $B$ bên kia sông:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Dùng êke dựng đường thẳng vuông góc với $AB$ tại $A$; trên đó lấy điểm $C$ và đo $AC$.',
            'Từ $C$ ngắm về $B$; trên đường ngắm $CB$ tìm điểm $D$ sao cho $AD \\perp CB$ (dùng êke). Đo $AD$ và $CD$.',
          ],
        },
        {
          type: 'p',
          text: 'Cách 1 (tam giác đồng dạng và định lí Pythagore). Hai tam giác vuông $DBA$ và $DAC$ có $\\widehat{DBA} = \\widehat{DAC}$ (cùng phụ với $\\widehat{DAB}$) nên đồng dạng, suy ra $\\dfrac{BD}{AD} = \\dfrac{AD}{CD}$, tức $BD = \\dfrac{AD^2}{CD}$. Trong tam giác $ADB$ vuông tại $D$: $AB = \\sqrt{AD^2 + BD^2}$.',
        },
        {
          type: 'p',
          text: 'Cách 2 (chỉ dùng tam giác đồng dạng). Tam giác $ABC$ vuông tại $A$ và tam giác $DAC$ vuông tại $D$ có chung góc $C$ nên $\\triangle ABC \\backsim \\triangle DAC$. Suy ra $\\dfrac{AB}{DA} = \\dfrac{AC}{DC}$, tức',
        },
        { type: 'tex', tex: 'AB = \\frac{AD \\cdot AC}{CD}.' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kiểm tra số đo',
          text: 'Tam giác $ADC$ vuông tại $D$ nên $AC^2 = AD^2 + CD^2$. Nếu ba số đo không thoả mãn gần đúng đẳng thức này thì đã đo sai, cần đo lại.',
        },
        { type: 'widget', name: 'river' },
      ],
    },
    {
      heading: 'Dự án: Đo chiều cao và khoảng cách quanh trường',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi nhóm đo chiều cao của một cây (hoặc cột cờ, toà nhà) và khoảng cách giữa hai điểm có vật cản ở giữa (bờ ao, bồn hoa), rồi so sánh các cách đo.',
        },
        {
          type: 'p',
          text: 'Dụng cụ: cọc thẳng dài khoảng $1{,}5$ đến $2$ m, thước dây, êke lớn (hoặc giác kế), dây dọi, cọc tiêu, giấy bút.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đo chiều cao cây bằng bóng nắng: cắm cọc thẳng đứng, đo bóng cọc và bóng cây cùng lúc, tính $H = \\dfrac{h \\cdot S}{s}$.',
            'Đo lại chiều cao đó bằng cách ngắm qua đỉnh cọc, tính theo định lí Thalès.',
            'Đo khoảng cách $AB$ qua vật cản theo hai cách ở trên; kiểm tra $AC^2 \\approx AD^2 + CD^2$.',
            'Mỗi phép đo làm ít nhất ba lần (đổi vị trí cọc hoặc điểm $C$), lấy trung bình cộng.',
          ],
        },
        {
          type: 'table',
          head: ['Lần đo', 'Số đo', 'Kết quả tính'],
          rows: [
            ['1', '$h = 1{,}5$ m, $s = 2$ m, $S = 12$ m', '$H = 9$ m'],
            ['2', '(em ghi số đo)', '(em ghi kết quả)'],
            ['3', '(em ghi số đo)', '(em ghi kết quả)'],
          ],
          caption:
            'Mẫu bảng ghi số đo cho phép đo bằng bóng nắng; lập bảng tương tự cho các cách đo khác.',
        },
        {
          type: 'p',
          text: 'Báo cáo: hình vẽ sơ đồ đo, bảng số đo, các phép tính, kết quả trung bình; so sánh kết quả giữa các cách đo và nêu nguyên nhân sai số (cọc nghiêng, đất không phẳng, đọc thước chưa chính xác...).',
        },
      ],
    },
  ],
  explore: {
    title: 'Đo chiều cao cây không cần trèo',
    instruction:
      'Chọn cách đo và chọn cây. Với bóng nắng: đổi độ cao mặt trời và chiều cao cọc, đọc ba số đo rồi tính chiều cao cây. Với cách ngắm: kéo đỉnh cọc (hoặc dùng phím mũi tên) đến khi tia ngắm từ mắt $C$ qua đỉnh cọc chạm đúng ngọn cây, đọc số đo rồi tính. Nhập kết quả và bấm "Kiểm tra".',
  },
  examples: [
    {
      problem:
        'Một cây có bóng dài $12$ m. Cùng lúc đó, một chiếc cọc cao $1{,}5$ m cắm thẳng đứng có bóng dài $2$ m. Tính chiều cao của cây.',
      steps: [
        'Các tia nắng song song nên tam giác (cây, bóng cây) đồng dạng với tam giác (cọc, bóng cọc).',
        'Suy ra $\\dfrac{H}{12} = \\dfrac{1{,}5}{2}$.',
        '$H = \\dfrac{1{,}5 \\cdot 12}{2} = 9$.',
      ],
      answer: 'Cây cao $9$ m.',
    },
    {
      problem:
        'Bạn Nam đặt mắt sát mặt đất tại $C$ và ngắm thấy đỉnh của chiếc cọc cao $2$ m thẳng hàng với ngọn cây. Cọc cách $C$ là $3$ m, gốc cây cách $C$ là $15$ m. Tính chiều cao của cây.',
      steps: [
        "Cọc $AB$ và cây $TT'$ cùng vuông góc với mặt đất nên $AB \\parallel TT'$.",
        "Theo định lí Thalès trong tam giác $CTT'$: $\\dfrac{AB}{TT'} = \\dfrac{CA}{CT}$, tức $\\dfrac{2}{TT'} = \\dfrac{3}{15}$.",
        "$TT' = \\dfrac{2 \\cdot 15}{3} = 10$.",
      ],
      answer: 'Cây cao $10$ m.',
    },
    {
      problem:
        'Để đo khoảng cách $AB$ qua sông, người ta dựng $AC \\perp AB$ và tìm điểm $D$ trên $CB$ với $AD \\perp CB$. Đo được $AC = 30$ m, $AD = 24$ m, $CD = 18$ m. Tính $AB$ theo hai cách.',
      steps: [
        'Kiểm tra số đo: $AD^2 + CD^2 = 576 + 324 = 900 = 30^2 = AC^2$. Số đo hợp lí.',
        'Cách 1: $\\triangle DBA \\backsim \\triangle DAC$ nên $BD = \\dfrac{AD^2}{CD} = \\dfrac{576}{18} = 32$ (m). Theo định lí Pythagore: $AB = \\sqrt{24^2 + 32^2} = \\sqrt{1\\,600} = 40$ (m).',
        'Cách 2: $\\triangle ABC \\backsim \\triangle DAC$ nên $AB = \\dfrac{AD \\cdot AC}{CD} = \\dfrac{24 \\cdot 30}{18} = 40$ (m).',
      ],
      answer: '$AB = 40$ m; hai cách cho cùng một kết quả.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Bóng của một tháp nước dài $36$ m. Cùng lúc đó, một bạn học sinh cao $1{,}6$ m có bóng dài $1{,}2$ m. Tháp nước cao bao nhiêu mét?',
      answer: 48,
      unit: 'm',
      hints: ['Chiều cao và bóng tỉ lệ với nhau: $\\dfrac{H}{36} = \\dfrac{1{,}6}{1{,}2}$.'],
      solution: '$H = \\dfrac{1{,}6 \\cdot 36}{1{,}2} = \\dfrac{57{,}6}{1{,}2} = 48$ m.',
    },
    {
      type: 'number',
      prompt:
        'Cùng một thời điểm, một chiếc cọc cao $2$ m cắm thẳng đứng có bóng dài $1{,}25$ m, còn bóng của một toà nhà dài $15$ m. Toà nhà cao bao nhiêu mét?',
      answer: 24,
      unit: 'm',
      hints: ['$H = \\dfrac{h \\cdot S}{s}$.'],
      solution: '$H = \\dfrac{2 \\cdot 15}{1{,}25} = \\dfrac{30}{1{,}25} = 24$ m.',
    },
    {
      type: 'choice',
      prompt:
        'Vì sao trong cách đo bằng bóng nắng, tam giác tạo bởi cây và bóng cây đồng dạng với tam giác tạo bởi cọc và bóng cọc?',
      options: [
        'Vì cây và cọc cao bằng nhau',
        'Vì hai tam giác cùng vuông và các tia nắng song song nên có một góc nhọn bằng nhau',
        'Vì bóng cây và bóng cọc dài bằng nhau',
        'Vì cây và cọc cắm cách nhau không xa',
      ],
      answer: 1,
      hints: ['Hai tam giác vuông đồng dạng khi có một cặp góc nhọn bằng nhau.'],
      solution:
        'Cây và cọc đều vuông góc với mặt đất, nên hai tam giác vuông. Các tia nắng song song nên góc giữa tia nắng và mặt đất ở hai tam giác bằng nhau. Hai tam giác vuông có một góc nhọn bằng nhau thì đồng dạng.',
    },
    {
      type: 'number',
      prompt:
        'Một người đặt mắt sát mặt đất tại $C$, ngắm thấy đỉnh chiếc cọc cao $1{,}5$ m thẳng hàng với ngọn cây. Cọc cách $C$ là $2{,}5$ m, gốc cây cách $C$ là $20$ m. Cây cao bao nhiêu mét?',
      answer: 12,
      unit: 'm',
      hints: ["Cọc song song với cây; dùng định lí Thalès: $\\dfrac{AB}{TT'} = \\dfrac{CA}{CT}$."],
      solution: "$TT' = \\dfrac{1{,}5 \\cdot 20}{2{,}5} = \\dfrac{30}{2{,}5} = 12$ m.",
    },
    {
      type: 'number',
      prompt:
        'Trong cách đo khoảng cách qua sông, đo được $AD = 6$ m và $CD = 4{,}5$ m (với $AD \\perp CB$ tại $D$). Tính $AC$.',
      answer: 7.5,
      unit: 'm',
      hints: ['Tam giác $ADC$ vuông tại $D$; dùng định lí Pythagore.'],
      solution: '$AC = \\sqrt{6^2 + 4{,}5^2} = \\sqrt{36 + 20{,}25} = \\sqrt{56{,}25} = 7{,}5$ m.',
    },
    {
      type: 'number',
      prompt:
        'Với $AD = 12$ m và $CD = 9$ m, tính $BD$ theo Cách 1 (tam giác $DBA$ đồng dạng với tam giác $DAC$).',
      answer: 16,
      unit: 'm',
      hints: ['Từ $\\dfrac{BD}{AD} = \\dfrac{AD}{CD}$ suy ra $BD = \\dfrac{AD^2}{CD}$.'],
      solution:
        '$BD = \\dfrac{12^2}{9} = \\dfrac{144}{9} = 16$ m. Khi đó $AB = \\sqrt{12^2 + 16^2} = 20$ m.',
    },
    {
      type: 'number',
      prompt:
        'Đo được $AC = 15$ m, $AD = 12$ m, $CD = 9$ m. Dùng Cách 2 ($\\triangle ABC \\backsim \\triangle DAC$), tính khoảng cách $AB$.',
      answer: 20,
      unit: 'm',
      hints: ['$\\dfrac{AB}{AD} = \\dfrac{AC}{CD}$.'],
      solution: '$AB = \\dfrac{AD \\cdot AC}{CD} = \\dfrac{12 \\cdot 15}{9} = 20$ m.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước đo chiều cao cây bằng cách ngắm qua đỉnh cọc theo đúng thứ tự.',
      items: [
        "Tính chiều cao cây theo định lí Thalès: $TT' = \\dfrac{AB \\cdot CT}{CA}$.",
        'Cắm cọc $AB$ thẳng đứng giữa người đo và cây.',
        'Dời cọc cho đến khi mắt $C$, đỉnh cọc và ngọn cây thẳng hàng.',
        'Đo chiều cao cọc $AB$ và các khoảng cách $CA$, $CT$.',
      ],
      answer: [1, 2, 3, 0],
      hints: ['Phải ngắm thẳng hàng trước rồi mới đo khoảng cách.'],
      solution:
        'Cắm cọc thẳng đứng, dời cọc đến khi ba điểm thẳng hàng, đo $AB$, $CA$, $CT$, cuối cùng tính chiều cao cây.',
    },
  ],
  takeaways: [
    'Bóng nắng: tia nắng song song nên $\\dfrac{H}{S} = \\dfrac{h}{s}$, tức $H = \\dfrac{h \\cdot S}{s}$.',
    "Ngắm qua đỉnh cọc: cọc song song với cây, theo định lí Thalès $TT' = \\dfrac{AB \\cdot CT}{CA}$.",
    'Khoảng cách không tới được: dựng $AC \\perp AB$, $AD \\perp CB$; $AB = \\dfrac{AD \\cdot AC}{CD}$ hoặc $AB = \\sqrt{AD^2 + \\left(\\dfrac{AD^2}{CD}\\right)^2}$.',
    'Đo nhiều lần, lấy trung bình và kiểm tra lại bằng định lí Pythagore để giảm sai số.',
  ],
};
