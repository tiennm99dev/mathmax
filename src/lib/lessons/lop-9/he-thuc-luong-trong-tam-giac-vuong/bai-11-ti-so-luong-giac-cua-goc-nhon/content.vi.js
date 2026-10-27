/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bốn tỉ số lượng giác sin, côsin, tang, côtang của một góc nhọn trong tam giác vuông, tỉ số lượng giác của các góc đặc biệt 30 độ, 45 độ, 60 độ, tỉ số lượng giác của hai góc phụ nhau và cách dùng máy tính cầm tay.',
  intro:
    'Muốn biết một con dốc "dốc" đến đâu, ta có thể so độ cao với quãng đường đi ngang, hoặc với chiều dài mặt dốc. Với cùng một góc dốc, các tỉ số ấy không đổi dù con dốc dài hay ngắn. Đó là ý tưởng của tỉ số lượng giác: mỗi góc nhọn được gắn với bốn con số, tính từ các cạnh của một tam giác vuông bất kì chứa góc đó.',
  objectives: [
    'Nhận biết cạnh đối, cạnh kề, cạnh huyền ứng với một góc nhọn của tam giác vuông.',
    'Phát biểu định nghĩa và tính $\\sin\\alpha$, $\\cos\\alpha$, $\\tan\\alpha$, $\\cot\\alpha$ khi biết các cạnh.',
    'Ghi nhớ tỉ số lượng giác của các góc $30^\\circ$, $45^\\circ$, $60^\\circ$.',
    'Vận dụng tính chất tỉ số lượng giác của hai góc phụ nhau; dùng máy tính cầm tay để tính tỉ số lượng giác và tìm góc.',
  ],
  sections: [
    {
      heading: 'Khái niệm tỉ số lượng giác của góc nhọn',
      blocks: [
        {
          type: 'p',
          text: 'Cho góc nhọn $\\alpha$. Xét tam giác $ABC$ vuông tại $A$ có $\\widehat{B} = \\alpha$. Đối với góc $\\alpha$: cạnh $AC$ gọi là cạnh đối, cạnh $AB$ gọi là cạnh kề, cạnh $BC$ là cạnh huyền.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Tỉ số giữa cạnh đối và cạnh huyền gọi là sin của góc $\\alpha$, kí hiệu $\\sin\\alpha$. Tỉ số giữa cạnh kề và cạnh huyền gọi là côsin của góc $\\alpha$, kí hiệu $\\cos\\alpha$. Tỉ số giữa cạnh đối và cạnh kề gọi là tang của góc $\\alpha$, kí hiệu $\\tan\\alpha$. Tỉ số giữa cạnh kề và cạnh đối gọi là côtang của góc $\\alpha$, kí hiệu $\\cot\\alpha$.',
        },
        {
          type: 'tex',
          tex: '\\sin\\alpha = \\frac{AC}{BC};\\quad \\cos\\alpha = \\frac{AB}{BC};\\quad \\tan\\alpha = \\frac{AC}{AB};\\quad \\cot\\alpha = \\frac{AB}{AC}.',
        },
        {
          type: 'p',
          text: 'Bốn tỉ số này gọi là các tỉ số lượng giác của góc nhọn $\\alpha$. Chúng chỉ phụ thuộc vào độ lớn của góc $\\alpha$, không phụ thuộc vào tam giác vuông được chọn: hai tam giác vuông có một góc nhọn bằng $\\alpha$ thì đồng dạng, nên các tỉ số cạnh tương ứng bằng nhau.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Tỉ số lượng giác của một góc nhọn luôn dương. Vì cạnh huyền dài hơn mỗi cạnh góc vuông nên $0 < \\sin\\alpha < 1$ và $0 < \\cos\\alpha < 1$. Ngoài ra $\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha}$, $\\cot\\alpha = \\dfrac{\\cos\\alpha}{\\sin\\alpha}$ và $\\tan\\alpha \\cdot \\cot\\alpha = 1$.',
        },
        {
          type: 'p',
          text: 'Để nhớ nhanh, nhiều bạn dùng câu: "Sin đi học (đối chia huyền), cos không hư (kề chia huyền), tan đoàn kết (đối chia kề), cot kết đoàn (kề chia đối)".',
        },
      ],
    },
    {
      heading: 'Tỉ số lượng giác của các góc nhọn đặc biệt',
      blocks: [
        {
          type: 'p',
          text: 'Với tam giác vuông cân có cạnh góc vuông $a$, cạnh huyền là $a\\sqrt{2}$, mỗi góc nhọn bằng $45^\\circ$. Với nửa tam giác đều cạnh $2a$ (cắt theo đường cao), ta được tam giác vuông có các cạnh $a$, $a\\sqrt{3}$, $2a$ và các góc nhọn $30^\\circ$, $60^\\circ$. Từ hai tam giác này ta có bảng sau.',
        },
        {
          type: 'table',
          head: ['Tỉ số', '$30^\\circ$', '$45^\\circ$', '$60^\\circ$'],
          rows: [
            ['$\\sin$', '$\\dfrac{1}{2}$', '$\\dfrac{\\sqrt{2}}{2}$', '$\\dfrac{\\sqrt{3}}{2}$'],
            ['$\\cos$', '$\\dfrac{\\sqrt{3}}{2}$', '$\\dfrac{\\sqrt{2}}{2}$', '$\\dfrac{1}{2}$'],
            ['$\\tan$', '$\\dfrac{\\sqrt{3}}{3}$', '$1$', '$\\sqrt{3}$'],
            ['$\\cot$', '$\\sqrt{3}$', '$1$', '$\\dfrac{\\sqrt{3}}{3}$'],
          ],
          caption: 'Tỉ số lượng giác của các góc nhọn đặc biệt.',
        },
      ],
    },
    {
      heading: 'Tỉ số lượng giác của hai góc phụ nhau',
      blocks: [
        {
          type: 'p',
          text: 'Trong tam giác $ABC$ vuông tại $A$, hai góc nhọn $B$ và $C$ phụ nhau: $\\widehat{B} + \\widehat{C} = 90^\\circ$. Cạnh đối của góc $B$ chính là cạnh kề của góc $C$ và ngược lại, nên $\\sin B = \\dfrac{AC}{BC} = \\cos C$, $\\tan B = \\dfrac{AC}{AB} = \\cot C$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Nếu hai góc phụ nhau thì sin góc này bằng côsin góc kia, tang góc này bằng côtang góc kia. Với $\\alpha + \\beta = 90^\\circ$: $\\sin\\alpha = \\cos\\beta$, $\\cos\\alpha = \\sin\\beta$, $\\tan\\alpha = \\cot\\beta$, $\\cot\\alpha = \\tan\\beta$.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn $\\sin 60^\\circ = \\cos 30^\\circ = \\dfrac{\\sqrt{3}}{2}$ và $\\tan 75^\\circ = \\cot 15^\\circ$. Nhờ định lí này, mọi tỉ số lượng giác của góc lớn hơn $45^\\circ$ đều đổi được thành tỉ số lượng giác của một góc nhỏ hơn $45^\\circ$.',
        },
      ],
    },
    {
      heading: 'Sử dụng máy tính cầm tay',
      blocks: [
        {
          type: 'p',
          text: 'Với góc không đặc biệt, ta dùng máy tính cầm tay ở chế độ đơn vị đo góc là độ (trên màn hình có chữ D). Bấm phím $\\sin$, $\\cos$ hoặc $\\tan$ rồi nhập số đo góc. Máy không có phím $\\cot$; ta tính $\\cot\\alpha = \\dfrac{1}{\\tan\\alpha}$.',
        },
        {
          type: 'list',
          items: [
            '$\\sin 40^\\circ \\approx 0{,}643$; $\\cos 40^\\circ \\approx 0{,}766$; $\\tan 40^\\circ \\approx 0{,}839$ (làm tròn đến hàng phần nghìn).',
            '$\\cot 40^\\circ = \\dfrac{1}{\\tan 40^\\circ} \\approx 1{,}192$.',
            'Biết tỉ số, tìm góc: bấm SHIFT rồi $\\sin$ (hoặc $\\cos$, $\\tan$) để dùng $\\sin^{-1}$. Ví dụ $\\sin\\alpha = 0{,}6$ thì $\\alpha \\approx 36{,}87^\\circ \\approx 37^\\circ$; với $\\cot\\alpha = 2$ thì tìm $\\alpha$ từ $\\tan\\alpha = 0{,}5$, được $\\alpha \\approx 27^\\circ$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý',
          text: 'Nếu màn hình máy tính hiện chữ R hoặc G, máy đang đo góc bằng radian hoặc grad và cho kết quả sai. Hãy chuyển về chế độ độ trước khi tính.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bốn tỉ số của một góc nhọn',
    instruction:
      'Kéo đỉnh $B$ theo phương ngang và đỉnh $C$ theo phương dọc (hoặc chọn đỉnh rồi dùng phím mũi tên, giữ Shift để bước dài). Chọn góc $B$ hoặc góc $C$: cạnh đối tô đỏ, cạnh kề tô xanh, cạnh huyền tô tím, bảng tỉ số tính ngay bốn tỉ số. Thử các góc $30^\\circ$, $45^\\circ$, $60^\\circ$, rồi bấm "Phóng to", "Thu nhỏ" để thấy tỉ số không đổi khi góc giữ nguyên.',
  },
  examples: [
    {
      problem:
        'Cho tam giác $ABC$ vuông tại $A$ có $AB = 3$ cm, $AC = 4$ cm. Tính các tỉ số lượng giác của góc $B$.',
      steps: [
        'Theo định lí Pythagore: $BC^2 = AB^2 + AC^2 = 9 + 16 = 25$, nên $BC = 5$ cm.',
        'Đối với góc $B$: cạnh đối là $AC = 4$, cạnh kề là $AB = 3$, cạnh huyền là $BC = 5$.',
        '$\\sin B = \\dfrac{AC}{BC} = \\dfrac{4}{5}$; $\\cos B = \\dfrac{AB}{BC} = \\dfrac{3}{5}$.',
        '$\\tan B = \\dfrac{AC}{AB} = \\dfrac{4}{3}$; $\\cot B = \\dfrac{AB}{AC} = \\dfrac{3}{4}$.',
      ],
      answer:
        '$\\sin B = \\dfrac{4}{5}$, $\\cos B = \\dfrac{3}{5}$, $\\tan B = \\dfrac{4}{3}$, $\\cot B = \\dfrac{3}{4}$.',
    },
    {
      problem:
        'Cho tam giác đều $MNP$ cạnh $2a$, đường cao $MH$. Dùng tam giác $MHN$ để tính các tỉ số lượng giác của góc $60^\\circ$.',
      steps: [
        'Trong tam giác đều, đường cao cũng là trung tuyến nên $NH = a$; tam giác $MHN$ vuông tại $H$ có $\\widehat{N} = 60^\\circ$, $MN = 2a$.',
        'Theo định lí Pythagore: $MH^2 = MN^2 - NH^2 = 4a^2 - a^2 = 3a^2$, nên $MH = a\\sqrt{3}$.',
        '$\\sin 60^\\circ = \\dfrac{MH}{MN} = \\dfrac{a\\sqrt{3}}{2a} = \\dfrac{\\sqrt{3}}{2}$; $\\cos 60^\\circ = \\dfrac{NH}{MN} = \\dfrac{a}{2a} = \\dfrac{1}{2}$.',
        '$\\tan 60^\\circ = \\dfrac{MH}{NH} = \\sqrt{3}$; $\\cot 60^\\circ = \\dfrac{NH}{MH} = \\dfrac{1}{\\sqrt{3}} = \\dfrac{\\sqrt{3}}{3}$.',
      ],
      answer:
        '$\\sin 60^\\circ = \\dfrac{\\sqrt{3}}{2}$, $\\cos 60^\\circ = \\dfrac{1}{2}$, $\\tan 60^\\circ = \\sqrt{3}$, $\\cot 60^\\circ = \\dfrac{\\sqrt{3}}{3}$.',
    },
    {
      problem:
        'Viết các tỉ số lượng giác sau thành tỉ số lượng giác của góc nhỏ hơn $45^\\circ$: $\\sin 70^\\circ$; $\\cos 65^\\circ$; $\\tan 80^\\circ$; $\\cot 52^\\circ$.',
      steps: [
        '$70^\\circ$ và $20^\\circ$ phụ nhau nên $\\sin 70^\\circ = \\cos 20^\\circ$.',
        '$65^\\circ$ và $25^\\circ$ phụ nhau nên $\\cos 65^\\circ = \\sin 25^\\circ$.',
        '$80^\\circ$ và $10^\\circ$ phụ nhau nên $\\tan 80^\\circ = \\cot 10^\\circ$.',
        '$52^\\circ$ và $38^\\circ$ phụ nhau nên $\\cot 52^\\circ = \\tan 38^\\circ$.',
      ],
      answer: '$\\cos 20^\\circ$; $\\sin 25^\\circ$; $\\cot 10^\\circ$; $\\tan 38^\\circ$.',
    },
    {
      problem:
        'Dùng máy tính cầm tay, tìm góc nhọn $\\alpha$ (làm tròn đến độ), biết $\\cos\\alpha = 0{,}4$.',
      steps: [
        'Đặt máy ở chế độ độ, bấm SHIFT $\\cos$ $0{,}4$ $=$.',
        'Màn hình hiện $66{,}42182...$, tức $\\alpha \\approx 66{,}42^\\circ$.',
        'Làm tròn đến độ: $\\alpha \\approx 66^\\circ$.',
      ],
      answer: '$\\alpha \\approx 66^\\circ$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cho tam giác $ABC$ vuông tại $A$. Khẳng định nào đúng?',
      options: [
        '$\\sin C = \\dfrac{AC}{BC}$',
        '$\\sin C = \\dfrac{AB}{AC}$',
        '$\\sin C = \\dfrac{AB}{BC}$',
        '$\\sin C = \\dfrac{AC}{AB}$',
      ],
      answer: 2,
      hints: [
        'Sin bằng cạnh đối chia cạnh huyền.',
        'Cạnh đối diện với đỉnh $C$ là cạnh không đi qua $C$ trong hai cạnh góc vuông.',
      ],
      solution:
        'Đối với góc $C$, cạnh đối là $AB$, cạnh huyền là $BC$, nên $\\sin C = \\dfrac{AB}{BC}$. Còn $\\dfrac{AC}{BC}$ là $\\cos C$, $\\dfrac{AB}{AC}$ là $\\tan C$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tam giác $MNP$ vuông tại $M$ có $MN = 5$ cm, $MP = 12$ cm. Tính $\\cos P$ (viết dưới dạng phân số tối giản).',
      answer: [12, 13],
      simplest: true,
      hints: [
        'Tính cạnh huyền $NP$ bằng định lí Pythagore.',
        'Côsin bằng cạnh kề chia cạnh huyền; cạnh kề của góc $P$ là cạnh góc vuông đi qua $P$.',
      ],
      solution:
        '$NP^2 = 5^2 + 12^2 = 169$ nên $NP = 13$ cm. Cạnh kề của góc $P$ là $MP = 12$, nên $\\cos P = \\dfrac{MP}{NP} = \\dfrac{12}{13}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tam giác $DEF$ vuông tại $D$ có $DE = 8$, $EF = 17$. Tính $\\tan F$ (phân số tối giản).',
      answer: [8, 15],
      simplest: true,
      hints: [
        '$EF$ là cạnh huyền; tính $DF$ trước.',
        'Tang của góc $F$ bằng cạnh đối $DE$ chia cạnh kề $DF$.',
      ],
      solution:
        '$DF^2 = EF^2 - DE^2 = 289 - 64 = 225$ nên $DF = 15$. Vậy $\\tan F = \\dfrac{DE}{DF} = \\dfrac{8}{15}$.',
    },
    {
      type: 'number',
      prompt:
        'Tính giá trị biểu thức $A = 2\\sin 30^\\circ + \\tan 45^\\circ - \\cos 60^\\circ$ (viết dạng số thập phân).',
      answer: 1.5,
      hints: [
        'Dùng bảng tỉ số lượng giác của các góc đặc biệt.',
        '$\\sin 30^\\circ = \\cos 60^\\circ = \\dfrac{1}{2}$ và $\\tan 45^\\circ = 1$.',
      ],
      solution: '$A = 2 \\cdot \\dfrac{1}{2} + 1 - \\dfrac{1}{2} = 1 + 1 - 0{,}5 = 1{,}5$.',
    },
    {
      type: 'number',
      prompt:
        'Tính $B = \\tan 60^\\circ \\cdot \\cot 60^\\circ + \\sin^2 30^\\circ$ (viết dạng số thập phân).',
      answer: 1.25,
      hints: [
        '$\\tan\\alpha \\cdot \\cot\\alpha = 1$ với mọi góc nhọn $\\alpha$.',
        '$\\sin^2 30^\\circ = (\\sin 30^\\circ)^2$.',
      ],
      solution:
        '$\\tan 60^\\circ \\cdot \\cot 60^\\circ = \\sqrt{3} \\cdot \\dfrac{\\sqrt{3}}{3} = 1$ và $\\sin^2 30^\\circ = \\left(\\dfrac{1}{2}\\right)^2 = \\dfrac{1}{4}$. Vậy $B = 1 + 0{,}25 = 1{,}25$.',
    },
    {
      type: 'choice',
      prompt: '$\\cos 62^\\circ$ bằng',
      options: ['$\\sin 62^\\circ$', '$\\sin 28^\\circ$', '$\\cos 28^\\circ$', '$\\tan 28^\\circ$'],
      answer: 1,
      hints: ['$62^\\circ + 28^\\circ = 90^\\circ$: hai góc phụ nhau.'],
      solution:
        'Hai góc $62^\\circ$ và $28^\\circ$ phụ nhau, nên côsin góc này bằng sin góc kia: $\\cos 62^\\circ = \\sin 28^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Không dùng máy tính, tính $C = \\dfrac{\\sin 25^\\circ}{\\cos 65^\\circ} + \\tan 35^\\circ \\cdot \\tan 55^\\circ$.',
      answer: 2,
      hints: [
        'Tìm các cặp góc phụ nhau trong biểu thức.',
        '$\\cos 65^\\circ = \\sin 25^\\circ$ và $\\tan 55^\\circ = \\cot 35^\\circ$.',
      ],
      solution:
        'Vì $25^\\circ + 65^\\circ = 90^\\circ$ nên $\\cos 65^\\circ = \\sin 25^\\circ$, do đó $\\dfrac{\\sin 25^\\circ}{\\cos 65^\\circ} = 1$. Vì $35^\\circ + 55^\\circ = 90^\\circ$ nên $\\tan 55^\\circ = \\cot 35^\\circ$, do đó $\\tan 35^\\circ \\cdot \\tan 55^\\circ = \\tan 35^\\circ \\cdot \\cot 35^\\circ = 1$. Vậy $C = 1 + 1 = 2$.',
    },
    {
      type: 'number',
      prompt:
        'Cho hai góc nhọn $\\alpha$, $\\beta$ với $\\alpha + \\beta = 90^\\circ$ và $\\tan\\alpha = 0{,}4$. Tính $\\cot\\beta$.',
      answer: 0.4,
      hints: ['Tang góc này bằng côtang góc kia khi hai góc phụ nhau.'],
      solution: 'Vì $\\alpha$ và $\\beta$ phụ nhau nên $\\cot\\beta = \\tan\\alpha = 0{,}4$.',
    },
    {
      type: 'number',
      prompt: 'Dùng máy tính cầm tay, tính $\\tan 25^\\circ$ (làm tròn đến hàng phần nghìn).',
      answer: 0.466,
      tolerance: 0.0005,
      hints: ['Kiểm tra máy đang ở chế độ độ (chữ D trên màn hình).', 'Bấm $\\tan$ $25$ $=$.'],
      solution:
        'Máy cho $\\tan 25^\\circ = 0{,}46630...$, làm tròn đến hàng phần nghìn được $0{,}466$.',
    },
    {
      type: 'number',
      prompt:
        'Tìm góc nhọn $\\alpha$ (làm tròn đến độ) biết $\\cos\\alpha = 0{,}25$. Nhập số đo theo độ.',
      answer: 76,
      hints: ['Dùng phím SHIFT $\\cos$ (tức $\\cos^{-1}$) trên máy tính cầm tay.'],
      solution:
        'Bấm SHIFT $\\cos$ $0{,}25$ $=$, máy cho $\\alpha \\approx 75{,}52^\\circ$. Làm tròn đến độ: $\\alpha \\approx 76^\\circ$.',
    },
    {
      type: 'multi',
      prompt: 'Với mọi góc nhọn $\\alpha$, những khẳng định nào đúng?',
      options: [
        '$0 < \\sin\\alpha < 1$',
        '$\\cos\\alpha > 1$',
        '$\\tan\\alpha \\cdot \\cot\\alpha = 1$',
        '$\\tan\\alpha = \\dfrac{\\sin\\alpha}{\\cos\\alpha}$',
        '$\\sin\\alpha = \\cos\\alpha$',
      ],
      answers: [0, 2, 3],
      hints: [
        'Cạnh huyền lớn hơn mỗi cạnh góc vuông.',
        'Viết từng tỉ số bằng cạnh đối, cạnh kề, cạnh huyền rồi nhân hoặc chia.',
      ],
      solution:
        'Cạnh đối và cạnh kề đều nhỏ hơn cạnh huyền nên $0 < \\sin\\alpha < 1$ và $0 < \\cos\\alpha < 1$ (khẳng định thứ hai sai). $\\tan\\alpha \\cdot \\cot\\alpha = \\dfrac{\\text{đối}}{\\text{kề}} \\cdot \\dfrac{\\text{kề}}{\\text{đối}} = 1$ và $\\dfrac{\\sin\\alpha}{\\cos\\alpha} = \\dfrac{\\text{đối}}{\\text{huyền}} : \\dfrac{\\text{kề}}{\\text{huyền}} = \\tan\\alpha$. Còn $\\sin\\alpha = \\cos\\alpha$ chỉ đúng khi $\\alpha = 45^\\circ$.',
    },
  ],
  takeaways: [
    'Với góc nhọn $\\alpha$: $\\sin\\alpha = \\dfrac{\\text{đối}}{\\text{huyền}}$, $\\cos\\alpha = \\dfrac{\\text{kề}}{\\text{huyền}}$, $\\tan\\alpha = \\dfrac{\\text{đối}}{\\text{kề}}$, $\\cot\\alpha = \\dfrac{\\text{kề}}{\\text{đối}}$.',
    'Tỉ số lượng giác chỉ phụ thuộc vào góc; $0 < \\sin\\alpha, \\cos\\alpha < 1$ và $\\tan\\alpha \\cdot \\cot\\alpha = 1$.',
    'Nhớ bảng góc đặc biệt: $\\sin 30^\\circ = \\cos 60^\\circ = \\dfrac{1}{2}$, $\\sin 45^\\circ = \\cos 45^\\circ = \\dfrac{\\sqrt{2}}{2}$, $\\tan 45^\\circ = 1$, $\\tan 60^\\circ = \\cot 30^\\circ = \\sqrt{3}$.',
    'Hai góc phụ nhau: sin góc này bằng côsin góc kia, tang góc này bằng côtang góc kia.',
  ],
};
