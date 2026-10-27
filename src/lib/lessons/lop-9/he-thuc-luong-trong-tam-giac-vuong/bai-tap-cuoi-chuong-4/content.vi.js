/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương 4: tỉ số lượng giác của góc nhọn, các góc đặc biệt, hai góc phụ nhau, dùng máy tính cầm tay, hệ thức giữa cạnh và góc trong tam giác vuông, giải tam giác vuông và các bài toán đo đạc thực tế.',
  intro:
    'Chương 4 trả lời một câu hỏi rất thực tế: biết một vài cạnh hoặc góc của tam giác vuông, làm sao tính phần còn lại? Bài ôn tập này hệ thống lại các định nghĩa và hệ thức của chương, kèm một bộ đề tự sinh có bản đồ kĩ năng tô màu theo từng bài để em biết phần nào cần ôn thêm.',
  objectives: [
    'Hệ thống hoá định nghĩa, tính chất của tỉ số lượng giác và các hệ thức giữa cạnh, góc trong tam giác vuông.',
    'Giải tam giác vuông và tính toán với tỉ số lượng giác, có hoặc không dùng máy tính cầm tay.',
    'Vận dụng vào bài toán đo chiều cao, khoảng cách, độ dốc trong thực tế.',
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
              'Bài 11',
              'Tỉ số lượng giác của góc nhọn',
              '$\\sin = \\dfrac{\\text{đối}}{\\text{huyền}}$, $\\cos = \\dfrac{\\text{kề}}{\\text{huyền}}$, $\\tan = \\dfrac{\\text{đối}}{\\text{kề}}$, $\\cot = \\dfrac{\\text{kề}}{\\text{đối}}$; $0 < \\sin\\alpha, \\cos\\alpha < 1$',
            ],
            [
              'Bài 11',
              'Góc đặc biệt',
              '$\\sin 30^\\circ = \\cos 60^\\circ = \\dfrac{1}{2}$; $\\sin 45^\\circ = \\cos 45^\\circ = \\dfrac{\\sqrt{2}}{2}$; $\\tan 45^\\circ = 1$; $\\tan 60^\\circ = \\cot 30^\\circ = \\sqrt{3}$',
            ],
            [
              'Bài 11',
              'Hai góc phụ nhau',
              '$\\alpha + \\beta = 90^\\circ$: $\\sin\\alpha = \\cos\\beta$, $\\tan\\alpha = \\cot\\beta$',
            ],
            [
              'Bài 12',
              'Hệ thức giữa cạnh và góc',
              '$b = a\\sin B = a\\cos C$; $b = c\\tan B = c\\cot C$ (tương tự cho $c$)',
            ],
            ['Bài 12', 'Giải tam giác vuông', 'Cần biết hai cạnh, hoặc một cạnh và một góc nhọn'],
            ['Bài 12', 'Ứng dụng', 'Chiều cao đo bằng giác kế: $h = h_0 + d\\tan\\alpha$'],
          ],
          caption: 'Tam giác $ABC$ vuông tại $A$, $BC = a$, $CA = b$, $AB = c$.',
        },
        {
          type: 'p',
          text: 'Khi gặp một bài toán thực tế, hãy vẽ hình, đánh dấu góc vuông và góc đã biết, gọi tên cạnh cần tìm là cạnh đối, cạnh kề hay cạnh huyền của góc đó, rồi chọn tỉ số chứa cả cạnh đã biết lẫn cạnh cần tìm.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Góc nâng và góc hạ',
          text: 'Góc nâng và góc hạ luôn đo giữa tia nhìn và phương nằm ngang, không phải phương thẳng đứng. Khi đo bằng giác kế, nhớ cộng chiều cao của giác kế vào kết quả.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Tỉ số nhập dạng phân số ($3/5$) hoặc số thập phân ($0{,}6$); số đo góc nhập theo độ. Làm sai lần đầu, em được gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Cuối bộ đề, bản đồ kĩ năng chỉ ra bài cần ôn lại.',
  },
  examples: [
    {
      problem:
        'Giải tam giác $ABC$ vuông tại $A$, biết $BC = 25$ cm và $\\widehat{C} = 42^\\circ$ (độ dài làm tròn đến hàng phần mười).',
      steps: [
        '$\\widehat{B} = 90^\\circ - 42^\\circ = 48^\\circ$.',
        '$AB$ là cạnh đối của góc $C$: $AB = BC\\sin C = 25\\sin 42^\\circ \\approx 16{,}7$ cm.',
        '$AC$ là cạnh kề của góc $C$: $AC = BC\\cos C = 25\\cos 42^\\circ \\approx 18{,}6$ cm.',
      ],
      answer: '$\\widehat{B} = 48^\\circ$, $AB \\approx 16{,}7$ cm, $AC \\approx 18{,}6$ cm.',
    },
    {
      problem:
        'Để đo chiều rộng $AC$ của một khúc sông, người ta chọn điểm $A$ bên này bờ và cây $C$ bên kia bờ sao cho $AC$ vuông góc với bờ sông, rồi đi dọc bờ đến điểm $B$ cách $A$ là $50$ m và đo được $\\widehat{ABC} = 38^\\circ$. Tính chiều rộng khúc sông (làm tròn đến mét).',
      steps: [
        'Tam giác $ABC$ vuông tại $A$, $AB = 50$ m là cạnh kề của góc $B$, $AC$ là cạnh đối.',
        '$AC = AB\\tan B = 50\\tan 38^\\circ \\approx 50 \\cdot 0{,}7813 \\approx 39{,}06$ m.',
        'Làm tròn đến mét: $AC \\approx 39$ m.',
      ],
      answer: 'Khúc sông rộng khoảng $39$ m.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: '$\\sin 60^\\circ$ bằng',
      options: [
        '$\\dfrac{1}{2}$',
        '$\\dfrac{\\sqrt{2}}{2}$',
        '$\\dfrac{\\sqrt{3}}{2}$',
        '$\\sqrt{3}$',
      ],
      answer: 2,
      hints: ['Dùng nửa tam giác đều cạnh $2$: các cạnh là $1$, $\\sqrt{3}$, $2$.'],
      solution:
        'Trong nửa tam giác đều cạnh $2$, góc $60^\\circ$ có cạnh đối $\\sqrt{3}$, cạnh huyền $2$, nên $\\sin 60^\\circ = \\dfrac{\\sqrt{3}}{2}$.',
    },
    {
      type: 'choice',
      prompt: 'Cho tam giác $ABC$ vuông tại $A$. Hệ thức nào sai?',
      options: ['$AB = BC\\sin C$', '$AC = BC\\cos C$', '$AB = AC\\tan C$', '$AC = AB\\tan C$'],
      answer: 3,
      hints: [
        'Với góc $C$: cạnh đối là $AB$, cạnh kề là $AC$.',
        'Tang của góc $C$ bằng $\\dfrac{AB}{AC}$.',
      ],
      solution:
        'Với góc $C$, cạnh đối là $AB$, cạnh kề là $AC$, nên $AB = BC\\sin C$, $AC = BC\\cos C$, $AB = AC\\tan C$ đều đúng. Còn $AC = AB\\cot C$, không phải $AB\\tan C$.',
    },
    {
      type: 'multi',
      prompt:
        'Cho hai góc nhọn $\\alpha$, $\\beta$ với $\\alpha + \\beta = 90^\\circ$. Những khẳng định nào luôn đúng?',
      options: [
        '$\\sin\\alpha = \\cos\\beta$',
        '$\\tan\\alpha = \\tan\\beta$',
        '$\\cot\\alpha = \\tan\\beta$',
        '$\\sin\\alpha = \\sin\\beta$',
      ],
      answers: [0, 2],
      hints: [
        'Hai góc phụ nhau: sin góc này bằng côsin góc kia, tang góc này bằng côtang góc kia.',
      ],
      solution:
        'Theo tính chất hai góc phụ nhau: $\\sin\\alpha = \\cos\\beta$ và $\\cot\\alpha = \\tan\\beta$. Hai khẳng định còn lại chỉ đúng khi $\\alpha = \\beta = 45^\\circ$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $AC = 9$ cm, $BC = 15$ cm. Tính $\\cot B$ (phân số tối giản).',
      answer: [4, 3],
      simplest: true,
      hints: [
        'Tính $AB$ bằng định lí Pythagore.',
        '$\\cot B = \\dfrac{\\text{kề}}{\\text{đối}} = \\dfrac{AB}{AC}$.',
      ],
      solution:
        '$AB = \\sqrt{15^2 - 9^2} = \\sqrt{144} = 12$ cm. $\\cot B = \\dfrac{AB}{AC} = \\dfrac{12}{9} = \\dfrac{4}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Tính $\\sin 30^\\circ \\cdot \\cos 60^\\circ + \\tan^2 60^\\circ$ (viết dạng số thập phân).',
      answer: 3.25,
      hints: [
        '$\\sin 30^\\circ = \\cos 60^\\circ = \\dfrac{1}{2}$; $\\tan 60^\\circ = \\sqrt{3}$.',
      ],
      solution:
        '$\\dfrac{1}{2} \\cdot \\dfrac{1}{2} + (\\sqrt{3})^2 = \\dfrac{1}{4} + 3 = 3{,}25$.',
    },
    {
      type: 'number',
      prompt:
        'Không dùng máy tính, tính $\\tan 10^\\circ \\cdot \\tan 20^\\circ \\cdot \\tan 70^\\circ \\cdot \\tan 80^\\circ$.',
      answer: 1,
      hints: [
        'Ghép các cặp góc phụ nhau: $10^\\circ$ với $80^\\circ$, $20^\\circ$ với $70^\\circ$.',
      ],
      solution:
        '$\\tan 80^\\circ = \\cot 10^\\circ$ và $\\tan 70^\\circ = \\cot 20^\\circ$. Tích bằng $(\\tan 10^\\circ \\cot 10^\\circ)(\\tan 20^\\circ \\cot 20^\\circ) = 1 \\cdot 1 = 1$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $AB = 12$ cm, $AC = 5$ cm. Tính góc $B$ (làm tròn đến độ). Nhập số đo theo độ.',
      answer: 23,
      hints: ['Biết hai cạnh góc vuông thì dùng tang: $\\tan B = \\dfrac{AC}{AB}$.'],
      solution:
        '$\\tan B = \\dfrac{5}{12} \\approx 0{,}4167$, máy tính cho $\\widehat{B} \\approx 22{,}62^\\circ \\approx 23^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $AB = 6$ cm, $\\widehat{B} = 50^\\circ$. Tính cạnh huyền $BC$ (cm, làm tròn đến hàng phần mười).',
      answer: 9.3,
      tolerance: 0.05,
      unit: 'cm',
      hints: [
        '$AB$ là cạnh kề của góc $B$: $AB = BC\\cos B$.',
        'Suy ra $BC = \\dfrac{AB}{\\cos B}$.',
      ],
      solution:
        '$AB = BC\\cos B$ nên $BC = \\dfrac{AB}{\\cos B} = \\dfrac{6}{\\cos 50^\\circ} \\approx \\dfrac{6}{0{,}6428} \\approx 9{,}3$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $BC = 25$ cm, $\\widehat{C} = 42^\\circ$. Tính $AC$ (cm, làm tròn đến hàng phần mười).',
      answer: 18.6,
      tolerance: 0.05,
      unit: 'cm',
      hints: ['$AC$ là cạnh kề của góc $C$.'],
      solution:
        '$AC = BC\\cos C = 25\\cos 42^\\circ \\approx 25 \\cdot 0{,}7431 \\approx 18{,}6$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một giác kế cao $1{,}6$ m đặt cách chân một toà tháp $45$ m, góc nâng ngắm đỉnh tháp là $42^\\circ$. Tính chiều cao toà tháp (m, làm tròn đến hàng phần mười).',
      answer: 42.1,
      tolerance: 0.05,
      unit: 'm',
      hints: [
        'Phần tháp cao hơn mắt ngắm bằng $45\\tan 42^\\circ$.',
        'Cộng thêm chiều cao giác kế $1{,}6$ m.',
      ],
      solution:
        '$h = 1{,}6 + 45\\tan 42^\\circ \\approx 1{,}6 + 45 \\cdot 0{,}9004 \\approx 1{,}6 + 40{,}52 = 42{,}12 \\approx 42{,}1$ m.',
    },
    {
      type: 'number',
      prompt:
        'Một con diều được thả với sợi dây dài $80$ m, coi dây căng thẳng và tạo với mặt đất góc $55^\\circ$. Bỏ qua chiều cao người thả, diều bay cao bao nhiêu mét (làm tròn đến hàng phần mười)?',
      answer: 65.5,
      tolerance: 0.05,
      unit: 'm',
      hints: ['Sợi dây là cạnh huyền, độ cao là cạnh đối của góc $55^\\circ$.'],
      solution: 'Độ cao $= 80\\sin 55^\\circ \\approx 80 \\cdot 0{,}8192 \\approx 65{,}5$ m.',
    },
    {
      type: 'number',
      prompt:
        'Một đoạn đường dốc dài $120$ m, đỉnh dốc cao hơn chân dốc $10$ m. Mặt dốc tạo với phương nằm ngang góc bao nhiêu độ (làm tròn đến độ)? Nhập số đo theo độ.',
      answer: 5,
      hints: ['Mặt dốc là cạnh huyền: $\\sin\\alpha = \\dfrac{10}{120}$.'],
      solution:
        '$\\sin\\alpha = \\dfrac{10}{120} \\approx 0{,}0833$, máy tính cho $\\alpha \\approx 4{,}78^\\circ \\approx 5^\\circ$.',
    },
  ],
  takeaways: [
    'Bốn tỉ số lượng giác của góc nhọn chỉ phụ thuộc vào góc; hai góc phụ nhau đổi sin với côsin, tang với côtang.',
    'Cạnh góc vuông = huyền $\\times$ sin góc đối = huyền $\\times$ côsin góc kề = cạnh góc vuông kia $\\times$ tang góc đối.',
    'Giải tam giác vuông từ hai cạnh, hoặc một cạnh và một góc nhọn; làm tròn ở bước cuối.',
    'Bài toán đo đạc: vẽ hình, tìm tam giác vuông, chọn tỉ số chứa cạnh đã biết và cạnh cần tìm.',
  ],
};
