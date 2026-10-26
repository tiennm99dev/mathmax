/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về trọng tâm, giao điểm ba đường phân giác, giao điểm ba đường trung trực và trực tâm của tam giác.',
  intro:
    'Bài luyện tập này ôn lại Bài 34 (Sự đồng quy của ba đường trung tuyến, ba đường phân giác trong một tam giác) và Bài 35 (Sự đồng quy của ba đường trung trực, ba đường cao trong một tam giác). Em sẽ tính các đoạn trên đường trung tuyến, các góc tạo bởi đường phân giác và đường cao, và chọn đúng điểm đặc biệt cho từng bài toán.',
  objectives: [
    'Tính các đoạn thẳng trên đường trung tuyến nhờ tỉ số $\\dfrac{2}{3}$ của trọng tâm.',
    'Vận dụng tính chất cách đều ba cạnh, cách đều ba đỉnh của giao điểm ba đường phân giác, ba đường trung trực.',
    'Nhận biết trực tâm và tính góc tạo bởi các đường cao.',
  ],
  sections: [
    {
      heading: 'Nhắc lại kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Ba đường', 'Điểm đồng quy', 'Tính chất'],
          rows: [
            [
              'Trung tuyến',
              'Trọng tâm $G$',
              '$AG = \\dfrac{2}{3}AM$, $GM = \\dfrac{1}{3}AM$, $AG = 2GM$',
            ],
            ['Phân giác', 'Điểm $I$', 'Cách đều ba cạnh của tam giác'],
            ['Trung trực', 'Điểm $O$', 'Cách đều ba đỉnh: $OA = OB = OC$'],
            ['Đường cao', 'Trực tâm $H$', 'Nằm trên cả ba đường cao (hoặc đường thẳng chứa chúng)'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Tam giác vuông: $O$ là trung điểm cạnh huyền, $H$ là đỉnh góc vuông. Tam giác tù: $O$ và $H$ nằm ngoài tam giác. Tam giác cân: đường trung trực của cạnh đáy cũng là trung tuyến, phân giác, đường cao xuất phát từ đỉnh.',
        },
      ],
    },
    {
      heading: 'Mẹo làm bài',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Đề hỏi «cách đều ba đỉnh»: dùng đường trung trực. Đề hỏi «cách đều ba cạnh»: dùng đường phân giác.',
            'Muốn chứng minh một đường đi qua trọng tâm (trực tâm), chỉ cần chỉ ra nó là đường trung tuyến (đường cao) thứ ba.',
            'Với góc $\\widehat{BIC}$: $\\widehat{BIC} = 180^\\circ - \\dfrac{\\widehat{B} + \\widehat{C}}{2}$. Với góc $\\widehat{BHC}$ của tam giác nhọn: dùng hai tam giác vuông rồi hai góc kề bù.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Đừng nhầm trọng tâm $G$ (ba trung tuyến) với giao điểm $I$ (ba phân giác) hay giao điểm $O$ (ba trung trực): ba điểm này chỉ trùng nhau khi tam giác đều.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện trộn ngẫu nhiên',
    instruction:
      'Mỗi lượt có 12 câu trộn ngẫu nhiên về trọng tâm, đường phân giác, đường trung trực và đường cao. Nhập một số tự nhiên: số đo góc bằng độ hoặc độ dài bằng xăng-ti-mét. Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng tô màu từng dạng bài theo kết quả lần làm đầu.',
  },
  examples: [
    {
      problem:
        'Tam giác $ABC$ có hai đường trung tuyến $AM = 15$ cm và $BN = 12$ cm cắt nhau tại $G$. Tính $AG$ và $GN$.',
      steps: [
        '$G$ là giao điểm của hai đường trung tuyến nên $G$ là trọng tâm của tam giác $ABC$.',
        '$AG = \\dfrac{2}{3}AM = \\dfrac{2}{3} \\cdot 15 = 10$ (cm).',
        '$GN = \\dfrac{1}{3}BN = \\dfrac{1}{3} \\cdot 12 = 4$ (cm).',
      ],
      answer: '$AG = 10$ cm, $GN = 4$ cm.',
    },
    {
      problem:
        'Tam giác đều $ABC$ có đường cao $AD = 9$ cm và trọng tâm $G$. Tính khoảng cách từ $G$ đến cạnh $BC$.',
      steps: [
        'Tam giác đều cân tại $A$ nên đường cao $AD$ đồng thời là đường trung tuyến: $D$ là trung điểm của $BC$ và $G$ nằm trên $AD$.',
        '$GD = \\dfrac{1}{3}AD = \\dfrac{1}{3} \\cdot 9 = 3$ (cm).',
        '$GD \\perp BC$ tại $D$ nên khoảng cách từ $G$ đến $BC$ bằng $GD$.',
      ],
      answer: 'Khoảng cách từ $G$ đến $BC$ bằng $3$ cm.',
    },
    {
      problem:
        'Tam giác $ABC$ nhọn có hai đường cao $BE$ và $CF$ cắt nhau tại $H$. Tia $AH$ cắt $BC$ tại $D$. Chứng minh $AD \\perp BC$. Biết $\\widehat{BAC} = 70^\\circ$, tính $\\widehat{BHC}$.',
      steps: [
        '$H$ là giao điểm của hai đường cao nên $H$ là trực tâm; đường cao thứ ba kẻ từ $A$ cũng đi qua $H$, nên đường thẳng $AH$ vuông góc với $BC$, tức là $AD \\perp BC$.',
        'Tam giác $ABE$ vuông tại $E$: $\\widehat{ABE} = 90^\\circ - 70^\\circ = 20^\\circ$.',
        'Tam giác $BFH$ vuông tại $F$: $\\widehat{BHF} = 90^\\circ - 20^\\circ = 70^\\circ$.',
        '$\\widehat{BHC} = 180^\\circ - \\widehat{BHF} = 110^\\circ$ (hai góc kề bù).',
      ],
      answer: '$AD \\perp BC$ và $\\widehat{BHC} = 110^\\circ$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tam giác $ABC$ có trọng tâm $G$ và đường trung tuyến $AM = 18$ cm. Tính $AG$ (cm).',
      answer: 12,
      unit: 'cm',
      hints: ['$AG$ bằng mấy phần độ dài $AM$?'],
      solution: '$AG = \\dfrac{2}{3}AM = \\dfrac{2}{3} \\cdot 18 = 12$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có trọng tâm $G$, đường trung tuyến $BN$ và $BG = 6$ cm. Tính $BN$ (cm).',
      answer: 9,
      unit: 'cm',
      hints: ['$BG = 2GN$; tính $GN$ trước.'],
      solution: '$GN = \\dfrac{BG}{2} = 3$ cm, nên $BN = BG + GN = 6 + 3 = 9$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $\\widehat{A} = 64^\\circ$. Hai đường phân giác $BE$, $CF$ cắt nhau tại $I$. Tính $\\widehat{BIC}$ (độ).',
      answer: 122,
      unit: '°',
      hints: ['Tính $\\widehat{B} + \\widehat{C}$, rồi lấy một nửa.'],
      solution:
        '$\\widehat{B} + \\widehat{C} = 116^\\circ$, nên $\\widehat{IBC} + \\widehat{ICB} = 58^\\circ$ và $\\widehat{BIC} = 180^\\circ - 58^\\circ = 122^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $BC = 9$ cm. Gọi $M$ là trung điểm của $BC$. Tính $AM$ (cm).',
      answer: 4.5,
      unit: 'cm',
      hints: ['$M$ là giao điểm ba đường trung trực của tam giác vuông $ABC$.'],
      solution:
        'Trong tam giác vuông, trung điểm $M$ của cạnh huyền cách đều ba đỉnh, nên $AM = MB = \\dfrac{9}{2} = 4{,}5$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ nhọn có $\\widehat{A} = 70^\\circ$ và trực tâm $H$. Tính $\\widehat{BHC}$ (độ).',
      answer: 110,
      unit: '°',
      hints: [
        'Gọi $BE$, $CF$ là hai đường cao; tính $\\widehat{ABE}$.',
        'Xét tam giác vuông $BFH$ rồi dùng hai góc kề bù.',
      ],
      solution:
        '$\\widehat{ABE} = 20^\\circ$, $\\widehat{BHF} = 90^\\circ - 20^\\circ = 70^\\circ$, nên $\\widehat{BHC} = 180^\\circ - 70^\\circ = 110^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ nhọn có $\\widehat{C} = 55^\\circ$ và trực tâm $H$. Tính $\\widehat{HBC}$ (độ).',
      answer: 35,
      unit: '°',
      hints: ['$BH$ nằm trên đường cao $BE$ ($E$ thuộc $AC$). Xét tam giác vuông $BEC$.'],
      solution:
        '$H$ nằm trên đường cao $BE$ nên $\\widehat{HBC} = \\widehat{EBC}$. Tam giác $BEC$ vuông tại $E$: $\\widehat{EBC} = 90^\\circ - 55^\\circ = 35^\\circ$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi điểm đặc biệt của tam giác $ABC$ với tính chất của nó.',
      left: [
        'Trọng tâm $G$',
        'Giao điểm $I$ của ba đường phân giác',
        'Giao điểm $O$ của ba đường trung trực',
        'Trực tâm $H$',
      ],
      right: [
        'Cách mỗi đỉnh $\\dfrac{2}{3}$ độ dài trung tuyến đi qua đỉnh đó',
        'Cách đều ba cạnh',
        'Cách đều ba đỉnh',
        'Trùng với đỉnh góc vuông khi tam giác vuông',
        'Luôn là trung điểm của một cạnh',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Mỗi điểm đến từ ba đường nào? Tính chất của từng loại đường là gì?'],
      solution:
        '$G$: cách đỉnh $\\dfrac{2}{3}$ trung tuyến; $I$: cách đều ba cạnh; $O$: cách đều ba đỉnh; $H$: trùng đỉnh góc vuông khi tam giác vuông. Không điểm nào luôn là trung điểm một cạnh ($O$ chỉ như vậy khi tam giác vuông).',
    },
    {
      type: 'multi',
      prompt:
        'Tam giác $ABC$ cân tại $A$, $M$ là trung điểm của $BC$. Chọn tất cả các khẳng định đúng.',
      options: [
        '$AM$ là đường trung tuyến',
        '$AM$ là đường phân giác',
        '$AM$ vuông góc với $BC$',
        '$AM = \\dfrac{BC}{2}$',
      ],
      answers: [0, 1, 2],
      hints: ['Đường trung trực của cạnh đáy trong tam giác cân còn là những đường nào?'],
      solution:
        '$AM$ là trung tuyến; tam giác cân tại $A$ nên nó đồng thời là phân giác và đường cao ($AM \\perp BC$). $AM = \\dfrac{BC}{2}$ chỉ đúng khi tam giác vuông tại $A$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác đều $ABC$ có đường cao $AD = 12$ cm. Gọi $O$ là giao điểm ba đường trung trực. Tính $OA$ (cm).',
      answer: 8,
      unit: 'cm',
      hints: [
        'Trong tam giác đều, $O$ trùng với trọng tâm $G$.',
        '$AD$ cũng là đường trung tuyến.',
      ],
      solution:
        'Tam giác đều nên $O$ trùng trọng tâm $G$, và đường cao $AD$ cũng là trung tuyến. $OA = \\dfrac{2}{3}AD = \\dfrac{2}{3} \\cdot 12 = 8$ (cm).',
    },
    {
      type: 'choice',
      prompt:
        'Một công viên hình tam giác có ba lối vào ở ba góc $A$, $B$, $C$. Người ta muốn đặt một chòi bảo vệ cách đều ba lối vào. Chòi đặt ở',
      options: [
        'trọng tâm của tam giác $ABC$',
        'giao điểm ba đường phân giác',
        'giao điểm ba đường trung trực',
        'trực tâm của tam giác $ABC$',
      ],
      answer: 2,
      hints: ['Ba lối vào là ba đỉnh của tam giác.'],
      solution:
        'Điểm cách đều ba đỉnh $A$, $B$, $C$ là giao điểm của ba đường trung trực của tam giác $ABC$.',
    },
    {
      type: 'choice',
      prompt:
        'Một tấm gỗ hình tam giác. Muốn khoan một lỗ tròn to nhất có thể, tiếp xúc với cả ba mép gỗ, tâm lỗ khoan nên đặt ở',
      options: [
        'giao điểm ba đường phân giác',
        'giao điểm ba đường trung trực',
        'trọng tâm',
        'trực tâm',
      ],
      answer: 0,
      hints: ['Tâm lỗ phải cách đều ba mép, tức là ba cạnh của tam giác.'],
      solution: 'Tâm lỗ cách đều ba cạnh của tam giác, nên là giao điểm của ba đường phân giác.',
    },
  ],
  takeaways: [
    'Trọng tâm: $AG = \\dfrac{2}{3}AM$; giao điểm ba đường phân giác cách đều ba cạnh.',
    'Giao điểm ba đường trung trực cách đều ba đỉnh; trực tâm nằm trên cả ba đường cao.',
    'Đọc kĩ đề: cách đều ba đỉnh hay cách đều ba cạnh quyết định dùng đường nào.',
  ],
};
