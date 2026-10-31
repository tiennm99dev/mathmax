/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương 9: góc nội tiếp và cung bị chắn, đường tròn ngoại tiếp và đường tròn nội tiếp của tam giác, tứ giác nội tiếp và tổng hai góc đối, đa giác đều và các phép quay giữ nguyên đa giác đều.',
  intro:
    'Cả chương 9 xoay quanh một câu hỏi: khi nào các đỉnh của một hình cùng nằm trên một đường tròn, và khi đó các góc của hình liên hệ với các cung ra sao? Góc nội tiếp bằng nửa cung bị chắn; tam giác nào cũng có một đường tròn ngoại tiếp và một đường tròn nội tiếp; tứ giác nội tiếp khi tổng hai góc đối bằng $180^\\circ$; đa giác đều chia đường tròn ngoại tiếp thành các cung bằng nhau. Bài ôn tập này hệ thống lại cả chương, kèm một bộ đề tự sinh có bản đồ kĩ năng tô màu theo từng bài.',
  objectives: [
    'Hệ thống hoá các định nghĩa, định lí và công thức của chương Đường tròn ngoại tiếp và đường tròn nội tiếp.',
    'Giải các bài tập trắc nghiệm và tự luận tổng hợp về góc nội tiếp, đường tròn ngoại tiếp, đường tròn nội tiếp, tứ giác nội tiếp và đa giác đều.',
    'Vận dụng các kiến thức của chương vào bài toán thực tế: cắt hình tròn lớn nhất từ tấm gỗ tam giác, phủ khăn tròn lên mặt bàn, lát gạch lục giác đều.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức chương',
      blocks: [
        {
          type: 'table',
          head: ['Bài', 'Kiến thức chính', 'Điều cần nhớ'],
          rows: [
            [
              'Bài 27',
              'Góc nội tiếp',
              'Góc có đỉnh nằm trên đường tròn, hai cạnh chứa hai dây. Số đo góc nội tiếp bằng nửa số đo cung bị chắn, bằng nửa góc ở tâm cùng chắn một cung. Các góc nội tiếp cùng chắn một cung thì bằng nhau; góc nội tiếp chắn nửa đường tròn là góc vuông',
            ],
            [
              'Bài 28',
              'Đường tròn ngoại tiếp tam giác',
              'Đi qua ba đỉnh; tâm là giao điểm ba đường trung trực. Tam giác vuông: tâm là trung điểm cạnh huyền, $R$ bằng nửa cạnh huyền. Tam giác đều cạnh $a$: $R = \\dfrac{a\\sqrt{3}}{3}$',
            ],
            [
              'Bài 28',
              'Đường tròn nội tiếp tam giác',
              'Tiếp xúc với ba cạnh; tâm là giao điểm ba đường phân giác trong. Tam giác đều cạnh $a$: $r = \\dfrac{a\\sqrt{3}}{6}$, tâm hai đường tròn trùng nhau và $R = 2r$',
            ],
            [
              'Bài 29',
              'Tứ giác nội tiếp',
              'Bốn đỉnh nằm trên một đường tròn. Tứ giác nội tiếp có tổng hai góc đối bằng $180^\\circ$; ngược lại, tứ giác có tổng hai góc đối bằng $180^\\circ$ thì nội tiếp. Hình chữ nhật, hình vuông nội tiếp đường tròn có tâm là giao điểm hai đường chéo',
            ],
            [
              'Bài 30',
              'Đa giác đều',
              'Đa giác lồi có các cạnh bằng nhau và các góc bằng nhau. Đa giác đều $n$ cạnh nội tiếp một đường tròn tâm $O$ (tâm của đa giác); góc ở tâm $\\dfrac{360^\\circ}{n}$, mỗi góc $180^\\circ - \\dfrac{360^\\circ}{n}$. Phép quay tâm $O$ góc $k \\cdot \\dfrac{360^\\circ}{n}$ ($k = 1, 2, \\ldots, n$) giữ nguyên đa giác',
            ],
          ],
          caption: 'Tóm tắt chương 9. Đường tròn ngoại tiếp và đường tròn nội tiếp.',
        },
        {
          type: 'p',
          text: 'Phần lớn các bài tính trong chương quy về hai ý: một góc nội tiếp bằng nửa cung (hay nửa góc ở tâm) mà nó chắn, và một tam giác có một đỉnh là tâm đường tròn (tam giác cân $OAB$, hay tam giác vuông khi một cạnh là đường kính). Bài chứng minh tứ giác nội tiếp thường dùng tổng hai góc đối bằng $180^\\circ$, hoặc hai góc vuông cùng nhìn một đoạn thẳng.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Lấy góc nội tiếp bằng cả số đo cung bị chắn, quên chia đôi. Không để ý đỉnh góc nằm trên cung nhỏ hay cung lớn, nên chọn nhầm cung bị chắn. Nhầm tâm đường tròn ngoại tiếp (giao các đường trung trực) với tâm đường tròn nội tiếp (giao các đường phân giác). Cộng hai góc kề của tứ giác thay vì hai góc đối. Cho rằng cạnh của mọi đa giác đều nội tiếp bằng bán kính: điều đó chỉ đúng với lục giác đều.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Số thập phân dùng dấu phẩy ($6{,}5$); có thể gõ kèm đơn vị như cm hay °. Làm sai lần đầu, em được gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Cuối bộ đề, bản đồ kĩ năng tô màu theo từng bài và chỉ ra bài cần ôn lại.',
  },
  examples: [
    {
      problem:
        'Tam giác nhọn $ABC$ nội tiếp đường tròn $(O; R)$ có $\\widehat{BAC} = 60^\\circ$. Tính $\\widehat{BOC}$ và độ dài $BC$ theo $R$.',
      steps: [
        'Góc nội tiếp $\\widehat{BAC}$ và góc ở tâm $\\widehat{BOC}$ cùng chắn cung nhỏ $BC$, nên $\\widehat{BOC} = 2\\widehat{BAC} = 120^\\circ$.',
        'Tam giác $OBC$ cân tại $O$. Gọi $H$ là trung điểm của $BC$ thì $OH \\perp BC$ và $OH$ là tia phân giác của $\\widehat{BOC}$, nên $\\widehat{BOH} = 60^\\circ$.',
        'Trong tam giác $OBH$ vuông tại $H$: $BH = OB \\cdot \\sin 60^\\circ = \\dfrac{R\\sqrt{3}}{2}$.',
        '$BC = 2BH = R\\sqrt{3}$.',
      ],
      answer: '$\\widehat{BOC} = 120^\\circ$, $BC = R\\sqrt{3}$.',
    },
    {
      problem:
        'Tam giác nhọn $ABC$ có hai đường cao $BD$ và $CE$ cắt nhau tại $H$. Chứng minh tứ giác $ADHE$ nội tiếp. Biết $\\widehat{BAC} = 50^\\circ$, tính $\\widehat{DHE}$.',
      steps: [
        '$BD \\perp AC$ nên $\\widehat{ADH} = 90^\\circ$; $CE \\perp AB$ nên $\\widehat{AEH} = 90^\\circ$.',
        'Tứ giác $ADHE$ có $\\widehat{ADH} + \\widehat{AEH} = 180^\\circ$, hai góc này đối nhau, nên $ADHE$ là tứ giác nội tiếp (đường tròn đường kính $AH$).',
        'Trong tứ giác nội tiếp $ADHE$, $\\widehat{DHE}$ và $\\widehat{DAE}$ là hai góc đối, nên $\\widehat{DHE} = 180^\\circ - 50^\\circ = 130^\\circ$.',
      ],
      answer: 'Tứ giác $ADHE$ nội tiếp và $\\widehat{DHE} = 130^\\circ$.',
    },
    {
      problem:
        'Một viên gạch lát nền có dạng lục giác đều nội tiếp đường tròn bán kính $10$ cm. Tính chu vi và diện tích mặt viên gạch (làm tròn diện tích đến hàng phần trăm).',
      steps: [
        'Gọi $O$ là tâm, $AB$ là một cạnh. Góc ở tâm $\\widehat{AOB} = 360^\\circ : 6 = 60^\\circ$, tam giác $OAB$ cân có một góc $60^\\circ$ nên là tam giác đều: $AB = 10$ cm.',
        'Chu vi: $6 \\cdot 10 = 60$ cm.',
        'Lục giác chia thành $6$ tam giác đều cạnh $10$ cm, mỗi tam giác có diện tích $\\dfrac{10^2\\sqrt{3}}{4} = 25\\sqrt{3}$ cm².',
        'Diện tích viên gạch: $6 \\cdot 25\\sqrt{3} = 150\\sqrt{3} \\approx 259{,}81$ cm².',
      ],
      answer: 'Chu vi $60$ cm; diện tích $150\\sqrt{3} \\approx 259{,}81$ cm².',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Góc nội tiếp chắn nửa đường tròn là',
      options: ['góc nhọn', 'góc vuông', 'góc tù', 'góc bẹt'],
      answer: 1,
      hints: ['Nửa đường tròn có số đo $180^\\circ$; góc nội tiếp bằng nửa cung bị chắn.'],
      solution:
        'Góc nội tiếp chắn nửa đường tròn có số đo $180^\\circ : 2 = 90^\\circ$: đó là góc vuông.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác nhọn $ABC$ nội tiếp đường tròn $(O)$ có $\\widehat{BAC} = 35^\\circ$. Tính số đo góc ở tâm $\\widehat{BOC}$.',
      answer: 70,
      unit: '°',
      hints: ['$\\widehat{BAC}$ và $\\widehat{BOC}$ cùng chắn cung nhỏ $BC$.'],
      solution:
        'Góc nội tiếp bằng nửa góc ở tâm cùng chắn một cung, nên $\\widehat{BOC} = 2 \\cdot 35^\\circ = 70^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $AB = 6$ cm, $AC = 8$ cm. Tính bán kính đường tròn ngoại tiếp tam giác $ABC$.',
      answer: 5,
      unit: 'cm',
      hints: [
        'Tâm đường tròn ngoại tiếp tam giác vuông là trung điểm cạnh huyền.',
        'Tính $BC$ bằng định lí Pythagore.',
      ],
      solution: '$BC^2 = 6^2 + 8^2 = 100$, nên $BC = 10$ cm và $R = BC : 2 = 5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $AB = 5$ cm, $AC = 12$ cm, $BC = 13$ cm. Tính bán kính đường tròn nội tiếp tam giác.',
      answer: 2,
      unit: 'cm',
      hints: [
        'Nối tâm $I$ với ba đỉnh: diện tích tam giác bằng $r \\cdot p$, với $p$ là nửa chu vi.',
      ],
      solution:
        'Diện tích $S = \\dfrac{5 \\cdot 12}{2} = 30$ cm², nửa chu vi $p = \\dfrac{5 + 12 + 13}{2} = 15$ cm, nên $r = \\dfrac{S}{p} = \\dfrac{30}{15} = 2$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $\\widehat{BAC} = 70^\\circ$, $I$ là tâm đường tròn nội tiếp. Tính $\\widehat{BIC}$.',
      answer: 125,
      unit: '°',
      hints: [
        '$BI$, $CI$ là tia phân giác của $\\widehat{ABC}$ và $\\widehat{ACB}$.',
        'Tính $\\widehat{IBC} + \\widehat{ICB}$ trước.',
      ],
      solution:
        '$\\widehat{ABC} + \\widehat{ACB} = 180^\\circ - 70^\\circ = 110^\\circ$, nên $\\widehat{IBC} + \\widehat{ICB} = 55^\\circ$ và $\\widehat{BIC} = 180^\\circ - 55^\\circ = 125^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tứ giác $ABCD$ nội tiếp đường tròn có $\\widehat{B} = 115^\\circ$. Tính $\\widehat{D}$.',
      answer: 65,
      unit: '°',
      hints: ['$\\widehat{B}$ và $\\widehat{D}$ là hai góc đối của tứ giác nội tiếp.'],
      solution:
        '$\\widehat{B} + \\widehat{D} = 180^\\circ$, nên $\\widehat{D} = 180^\\circ - 115^\\circ = 65^\\circ$.',
    },
    {
      type: 'choice',
      prompt: 'Tứ giác nào sau đây luôn nội tiếp được đường tròn?',
      options: ['Hình thang', 'Hình bình hành', 'Hình thang cân', 'Hình thoi'],
      answer: 2,
      hints: ['Kiểm tra tổng hai góc đối của từng hình.'],
      solution:
        'Hình thang cân $ABCD$ ($AB \\parallel CD$) có $\\widehat{A} + \\widehat{D} = 180^\\circ$ (hai góc trong cùng phía) và $\\widehat{D} = \\widehat{C}$, nên $\\widehat{A} + \\widehat{C} = 180^\\circ$: nó nội tiếp. Hình bình hành, hình thoi có hai góc đối bằng nhau, nên chỉ nội tiếp khi chúng là hình chữ nhật hay hình vuông; hình thang thường không nội tiếp.',
    },
    {
      type: 'number',
      prompt: 'Tính số đo mỗi góc của bát giác đều.',
      answer: 135,
      unit: '°',
      hints: [
        'Góc ở tâm của bát giác đều bằng $360^\\circ : 8$.',
        'Mỗi góc bằng $180^\\circ$ trừ góc ở tâm.',
      ],
      solution:
        'Góc ở tâm $360^\\circ : 8 = 45^\\circ$, nên mỗi góc bằng $180^\\circ - 45^\\circ = 135^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Phép quay thuận chiều tâm $O$ với góc dương nhỏ nhất bằng bao nhiêu độ thì giữ nguyên ngũ giác đều tâm $O$?',
      answer: 72,
      unit: '°',
      hints: [
        'Phép quay giữ nguyên đa giác đều $n$ cạnh có góc $k \\cdot \\dfrac{360^\\circ}{n}$.',
      ],
      solution:
        'Các góc quay giữ nguyên ngũ giác đều là $72^\\circ$, $144^\\circ$, $216^\\circ$, $288^\\circ$, $360^\\circ$; nhỏ nhất là $360^\\circ : 5 = 72^\\circ$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đa giác đều với số đo góc ở tâm của nó.',
      left: ['Tam giác đều', 'Hình vuông', 'Lục giác đều', 'Bát giác đều'],
      right: ['$120^\\circ$', '$90^\\circ$', '$60^\\circ$', '$45^\\circ$', '$72^\\circ$'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Góc ở tâm của đa giác đều $n$ cạnh bằng $\\dfrac{360^\\circ}{n}$.'],
      solution:
        '$360^\\circ : 3 = 120^\\circ$, $360^\\circ : 4 = 90^\\circ$, $360^\\circ : 6 = 60^\\circ$, $360^\\circ : 8 = 45^\\circ$. Góc $72^\\circ$ là của ngũ giác đều.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các khẳng định đúng.',
      options: [
        'Mỗi tam giác có đúng một đường tròn ngoại tiếp và đúng một đường tròn nội tiếp.',
        'Tứ giác có hai góc kề một cạnh bù nhau thì nội tiếp được đường tròn.',
        'Cạnh của lục giác đều nội tiếp đường tròn $(O; R)$ bằng $R$.',
        'Hình thoi có một góc $60^\\circ$ là một đa giác đều.',
      ],
      answers: [0, 2],
      hints: [
        'Dấu hiệu nhận biết tứ giác nội tiếp nói về hai góc đối hay hai góc kề?',
        'Đa giác đều cần cả các cạnh bằng nhau lẫn các góc bằng nhau.',
      ],
      solution:
        'Khẳng định thứ hai sai: hình bình hành nào cũng có hai góc kề bù nhau nhưng không phải lúc nào cũng nội tiếp; dấu hiệu đúng là tổng hai góc đối bằng $180^\\circ$. Khẳng định thứ tư sai: hình thoi đó có các góc $60^\\circ$ và $120^\\circ$, không bằng nhau. Khẳng định thứ nhất đúng (giao ba đường trung trực, giao ba đường phân giác); khẳng định thứ ba đúng vì tam giác $OAB$ có góc ở tâm $60^\\circ$ là tam giác đều.',
    },
    {
      type: 'number',
      prompt:
        'Từ một tấm gỗ hình tam giác đều cạnh $30$ cm, bác thợ mộc muốn cắt một mặt ghế hình tròn lớn nhất có thể. Tính bán kính mặt ghế (làm tròn đến hàng phần trăm).',
      answer: 8.66,
      tolerance: 0.005,
      unit: 'cm',
      hints: [
        'Hình tròn lớn nhất nằm trong tam giác là hình tròn nội tiếp tam giác.',
        'Tam giác đều cạnh $a$ có $r = \\dfrac{a\\sqrt{3}}{6}$.',
      ],
      solution: '$r = \\dfrac{30\\sqrt{3}}{6} = 5\\sqrt{3} \\approx 8{,}66$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Mặt bàn hình chữ nhật dài $1{,}2$ m, rộng $0{,}9$ m. Cần một tấm khăn tròn đặt đồng tâm với mặt bàn sao cho phủ kín cả bốn góc bàn. Bán kính nhỏ nhất của tấm khăn là bao nhiêu mét?',
      answer: 0.75,
      tolerance: 0.001,
      unit: 'm',
      hints: [
        'Khăn phủ kín bốn góc khi chứa đường tròn ngoại tiếp hình chữ nhật.',
        'Bán kính đường tròn ngoại tiếp hình chữ nhật bằng nửa đường chéo.',
      ],
      solution:
        'Đường chéo $d^2 = 1{,}2^2 + 0{,}9^2 = 1{,}44 + 0{,}81 = 2{,}25$, nên $d = 1{,}5$ m. Bán kính nhỏ nhất $R = 1{,}5 : 2 = 0{,}75$ m.',
    },
  ],
  takeaways: [
    'Góc nội tiếp bằng nửa số đo cung bị chắn; góc nội tiếp chắn nửa đường tròn là góc vuông.',
    'Tâm đường tròn ngoại tiếp tam giác là giao các đường trung trực, tâm đường tròn nội tiếp là giao các đường phân giác; tam giác đều cạnh $a$ có $R = \\dfrac{a\\sqrt{3}}{3}$, $r = \\dfrac{a\\sqrt{3}}{6}$.',
    'Tứ giác nội tiếp khi và chỉ khi tổng hai góc đối bằng $180^\\circ$.',
    'Đa giác đều $n$ cạnh có góc ở tâm $\\dfrac{360^\\circ}{n}$, mỗi góc $180^\\circ - \\dfrac{360^\\circ}{n}$, và được giữ nguyên bởi $n$ phép quay quanh tâm.',
  ],
};
