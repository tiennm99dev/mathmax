/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hệ thức giữa cạnh góc vuông và cạnh huyền, hệ thức giữa hai cạnh góc vuông trong tam giác vuông, giải tam giác vuông và ứng dụng để đo chiều cao, khoảng cách trong thực tế.',
  intro:
    'Không trèo lên nóc nhà, làm sao biết toà nhà cao bao nhiêu? Người ta đứng cách chân toà nhà một khoảng đo được, dùng giác kế ngắm đỉnh để đo góc nâng, rồi tính. Bài này cho ta các hệ thức nối cạnh và góc trong tam giác vuông, công cụ của mọi phép đo gián tiếp như thế.',
  objectives: [
    'Viết được hệ thức giữa cạnh góc vuông với cạnh huyền và với cạnh góc vuông kia qua tỉ số lượng giác.',
    'Giải tam giác vuông: tìm các cạnh và góc còn lại khi biết hai cạnh, hoặc một cạnh và một góc nhọn.',
    'Vận dụng các hệ thức để tính chiều cao, khoảng cách trong thực tế.',
  ],
  sections: [
    {
      heading: 'Hệ thức giữa cạnh góc vuông và cạnh huyền',
      blocks: [
        {
          type: 'p',
          text: 'Cho tam giác $ABC$ vuông tại $A$ với $BC = a$, $CA = b$, $AB = c$. Theo định nghĩa tỉ số lượng giác: $\\sin B = \\dfrac{b}{a}$, $\\cos C = \\dfrac{b}{a}$, nên $b = a\\sin B = a\\cos C$. Tương tự với cạnh $c$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Trong tam giác vuông, mỗi cạnh góc vuông bằng cạnh huyền nhân với sin góc đối hoặc nhân với côsin góc kề.',
        },
        {
          type: 'tex',
          tex: 'b = a\\sin B = a\\cos C;\\qquad c = a\\sin C = a\\cos B.',
        },
      ],
    },
    {
      heading: 'Hệ thức giữa hai cạnh góc vuông',
      blocks: [
        {
          type: 'p',
          text: 'Cũng trong tam giác $ABC$ vuông tại $A$: $\\tan B = \\dfrac{b}{c}$ và $\\cot C = \\dfrac{b}{c}$, nên $b = c\\tan B = c\\cot C$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Trong tam giác vuông, mỗi cạnh góc vuông bằng cạnh góc vuông kia nhân với tang góc đối hoặc nhân với côtang góc kề.',
        },
        {
          type: 'tex',
          tex: 'b = c\\tan B = c\\cot C;\\qquad c = b\\tan C = b\\cot B.',
        },
        {
          type: 'table',
          head: ['Biết', 'Muốn tìm', 'Dùng'],
          rows: [
            [
              'cạnh huyền và một góc nhọn',
              'cạnh góc vuông',
              'nhân với $\\sin$ góc đối hoặc $\\cos$ góc kề',
            ],
            [
              'một cạnh góc vuông và một góc nhọn',
              'cạnh góc vuông kia',
              'nhân với $\\tan$ góc đối hoặc $\\cot$ góc kề',
            ],
            [
              'một cạnh góc vuông và một góc nhọn',
              'cạnh huyền',
              'chia cho $\\sin$ góc đối hoặc $\\cos$ góc kề',
            ],
          ],
          caption: 'Chọn hệ thức theo dữ kiện đã cho.',
        },
      ],
    },
    {
      heading: 'Giải tam giác vuông',
      blocks: [
        {
          type: 'p',
          text: 'Giải tam giác vuông là tìm tất cả các cạnh và các góc chưa biết của nó. Một tam giác vuông được xác định khi biết hai cạnh, hoặc một cạnh và một góc nhọn.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Biết một góc nhọn thì góc nhọn kia bằng $90^\\circ$ trừ góc đó.',
            'Biết hai cạnh thì cạnh thứ ba tính theo định lí Pythagore, còn góc tính từ một tỉ số lượng giác (dùng máy tính cầm tay).',
            'Biết một cạnh và một góc nhọn thì dùng các hệ thức ở trên để tính hai cạnh còn lại.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Làm tròn',
          text: 'Trong các bài toán, nếu không nói gì thêm, độ dài thường làm tròn đến hàng phần mười hoặc phần trăm, số đo góc làm tròn đến độ. Nên giữ nguyên giá trị trên máy tính ở các bước trung gian, chỉ làm tròn kết quả cuối.',
        },
      ],
    },
    {
      heading: 'Ứng dụng: đo chiều cao và khoảng cách',
      blocks: [
        {
          type: 'p',
          text: 'Muốn đo chiều cao $h$ của một toà nhà, ta đặt giác kế thẳng đứng cách chân toà nhà một khoảng $d$; giác kế cao $h_0$. Quay ống ngắm về đỉnh toà nhà để đọc góc $\\alpha$ giữa tia ngắm và phương nằm ngang (góc nâng). Tia ngắm, đường nằm ngang qua mắt và mặt toà nhà tạo thành một tam giác vuông có cạnh kề $d$, góc $\\alpha$, nên cạnh đối bằng $d\\tan\\alpha$.',
        },
        { type: 'tex', tex: 'h = h_0 + d\\tan\\alpha.' },
        {
          type: 'p',
          text: 'Tương tự, khi đứng trên cao nhìn xuống một vật với góc hạ $\\beta$ (góc giữa tia nhìn và phương nằm ngang), độ cao $h$ và khoảng cách nằm ngang $d$ đến vật liên hệ bởi $h = d\\tan\\beta$, tức $d = h\\cot\\beta$. Cách này dùng để đo chiều rộng khúc sông, khoảng cách từ ngọn hải đăng đến con thuyền.',
        },
      ],
    },
  ],
  explore: {
    title: 'Giác kế ảo đo chiều cao toà nhà',
    instruction:
      'Chọn một công trình. Kéo ô vuông xanh dưới chân người đo để đổi khoảng cách $d$, rồi kéo chấm cam ở đầu tia ngắm (hoặc dùng phím mũi tên, nút "Tăng α", "Giảm α") cho đến khi tia ngắm đi qua đúng đỉnh. Khi tia chuyển màu xanh, tính chiều cao $h = 1{,}5 + d\\tan\\alpha$ và nhập kết quả để so với chiều cao thật.',
  },
  examples: [
    {
      problem:
        'Cho tam giác $ABC$ vuông tại $A$ có $BC = 12$ cm, $\\widehat{B} = 40^\\circ$. Tính $AB$ và $AC$ (làm tròn đến hàng phần mười).',
      steps: [
        '$AC$ là cạnh đối của góc $B$: $AC = BC\\sin B = 12\\sin 40^\\circ \\approx 7{,}7$ cm.',
        '$AB$ là cạnh kề của góc $B$: $AB = BC\\cos B = 12\\cos 40^\\circ \\approx 9{,}2$ cm.',
      ],
      answer: '$AC \\approx 7{,}7$ cm, $AB \\approx 9{,}2$ cm.',
    },
    {
      problem:
        'Cho tam giác $ABC$ vuông tại $A$ có $AB = 8$ cm, $\\widehat{B} = 52^\\circ$. Tính $AC$ (làm tròn đến hàng phần mười).',
      steps: [
        'Biết cạnh góc vuông $AB$ (kề với góc $B$), cần cạnh góc vuông $AC$ (đối với góc $B$): dùng tang.',
        '$AC = AB\\tan B = 8\\tan 52^\\circ \\approx 8 \\cdot 1{,}2799 \\approx 10{,}2$ cm.',
      ],
      answer: '$AC \\approx 10{,}2$ cm.',
    },
    {
      problem:
        'Giải tam giác $ABC$ vuông tại $A$, biết $AB = 6$ cm, $AC = 8$ cm (góc làm tròn đến độ).',
      steps: [
        'Theo định lí Pythagore: $BC = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$ cm.',
        '$\\tan B = \\dfrac{AC}{AB} = \\dfrac{8}{6} = \\dfrac{4}{3}$, máy tính cho $\\widehat{B} \\approx 53{,}13^\\circ \\approx 53^\\circ$.',
        '$\\widehat{C} = 90^\\circ - \\widehat{B} \\approx 90^\\circ - 53^\\circ = 37^\\circ$.',
      ],
      answer: '$BC = 10$ cm, $\\widehat{B} \\approx 53^\\circ$, $\\widehat{C} \\approx 37^\\circ$.',
    },
    {
      problem:
        'Một giác kế cao $1{,}5$ m đặt cách chân một cột cờ $30$ m. Ngắm đỉnh cột cờ, góc nâng đọc được là $35^\\circ$. Tính chiều cao cột cờ (làm tròn đến hàng phần mười).',
      steps: [
        'Phần cột cờ cao hơn mắt ngắm là cạnh đối của góc $35^\\circ$ trong tam giác vuông có cạnh kề $30$ m: $30\\tan 35^\\circ \\approx 21{,}0$ m.',
        'Cộng chiều cao giác kế: $h = 1{,}5 + 30\\tan 35^\\circ \\approx 1{,}5 + 21{,}006 = 22{,}506$.',
        'Làm tròn: $h \\approx 22{,}5$ m.',
      ],
      answer: 'Cột cờ cao khoảng $22{,}5$ m.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cho tam giác $ABC$ vuông tại $A$, $BC = a$, $CA = b$, $AB = c$. Hệ thức nào đúng?',
      options: ['$b = a\\sin B$', '$b = a\\cos B$', '$b = c\\tan C$', '$c = a\\sin B$'],
      answer: 0,
      hints: ['$b = CA$ là cạnh đối của góc $B$ và là cạnh kề của góc $C$.'],
      solution:
        'Cạnh góc vuông bằng cạnh huyền nhân sin góc đối: $b = a\\sin B$. Các hệ thức còn lại phải là $b = a\\cos C$, $b = c\\tan B$ và $c = a\\sin C$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $BC = 20$ cm, $\\widehat{C} = 30^\\circ$. Tính $AB$ (cm).',
      answer: 10,
      unit: 'cm',
      hints: ['$AB$ là cạnh đối của góc $C$.', 'Dùng $\\sin 30^\\circ = \\dfrac{1}{2}$.'],
      solution: '$AB = BC\\sin C = 20 \\cdot \\sin 30^\\circ = 20 \\cdot \\dfrac{1}{2} = 10$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $BC = 15$ cm, $\\widehat{B} = 58^\\circ$. Tính $AB$ (cm, làm tròn đến hàng phần mười).',
      answer: 7.9,
      tolerance: 0.05,
      unit: 'cm',
      hints: ['$AB$ là cạnh kề của góc $B$.', 'Cạnh góc vuông bằng cạnh huyền nhân côsin góc kề.'],
      solution:
        '$AB = BC\\cos B = 15\\cos 58^\\circ \\approx 15 \\cdot 0{,}5299 \\approx 7{,}9$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $AC = 9$ cm, $\\widehat{B} = 40^\\circ$. Tính $AB$ (cm, làm tròn đến hàng phần mười).',
      answer: 10.7,
      tolerance: 0.05,
      unit: 'cm',
      hints: [
        'Biết một cạnh góc vuông, cần cạnh góc vuông kia: dùng tang hoặc côtang.',
        '$AB$ là cạnh kề của góc $B$, $AC$ là cạnh đối: $AB = AC\\cot B$.',
      ],
      solution:
        '$AB = AC\\cot B = \\dfrac{AC}{\\tan B} = \\dfrac{9}{\\tan 40^\\circ} \\approx \\dfrac{9}{0{,}8391} \\approx 10{,}7$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $AB = 7$ cm, $AC = 4$ cm. Tính số đo góc $B$ (làm tròn đến độ). Nhập số đo theo độ.',
      answer: 30,
      hints: ['$\\tan B = \\dfrac{AC}{AB}$.', 'Dùng SHIFT $\\tan$ trên máy tính cầm tay.'],
      solution:
        '$\\tan B = \\dfrac{AC}{AB} = \\dfrac{4}{7} \\approx 0{,}5714$, máy tính cho $\\widehat{B} \\approx 29{,}74^\\circ \\approx 30^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Giải tam giác $ABC$ vuông tại $A$ biết $BC = 10$ cm và $\\widehat{B} = 36^\\circ$ (độ dài làm tròn đến hàng phần mười). Kết quả nào đúng?',
      options: [
        '$\\widehat{C} = 54^\\circ$, $AC \\approx 5{,}9$ cm, $AB \\approx 8{,}1$ cm',
        '$\\widehat{C} = 54^\\circ$, $AC \\approx 8{,}1$ cm, $AB \\approx 5{,}9$ cm',
        '$\\widehat{C} = 64^\\circ$, $AC \\approx 5{,}9$ cm, $AB \\approx 8{,}1$ cm',
        '$\\widehat{C} = 54^\\circ$, $AC \\approx 7{,}3$ cm, $AB \\approx 6{,}8$ cm',
      ],
      answer: 0,
      hints: [
        'Góc $C$ phụ với góc $B$.',
        '$AC$ đối diện góc $B$ nên $AC = BC\\sin B$; $AB = BC\\cos B$.',
      ],
      solution:
        '$\\widehat{C} = 90^\\circ - 36^\\circ = 54^\\circ$; $AC = 10\\sin 36^\\circ \\approx 5{,}9$ cm; $AB = 10\\cos 36^\\circ \\approx 8{,}1$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một chiếc thang dài $6$ m dựa vào tường, thang tạo với mặt đất góc $65^\\circ$. Đầu thang chạm tường ở độ cao bao nhiêu mét (làm tròn đến hàng phần mười)?',
      answer: 5.4,
      tolerance: 0.05,
      unit: 'm',
      hints: [
        'Thang là cạnh huyền; độ cao là cạnh đối của góc $65^\\circ$.',
        'Độ cao $= 6\\sin 65^\\circ$.',
      ],
      solution: 'Độ cao $= 6\\sin 65^\\circ \\approx 6 \\cdot 0{,}9063 \\approx 5{,}4$ m.',
    },
    {
      type: 'number',
      prompt:
        'Bóng của một cái cây trên mặt đất dài $12$ m, tia nắng mặt trời tạo với mặt đất góc $40^\\circ$. Cây cao bao nhiêu mét (làm tròn đến hàng phần mười)?',
      answer: 10.1,
      tolerance: 0.05,
      unit: 'm',
      hints: [
        'Cây, bóng cây và tia nắng tạo thành tam giác vuông; bóng là cạnh kề của góc $40^\\circ$.',
        'Chiều cao $= 12\\tan 40^\\circ$.',
      ],
      solution:
        'Chiều cao cây $= 12\\tan 40^\\circ \\approx 12 \\cdot 0{,}8391 \\approx 10{,}1$ m.',
    },
    {
      type: 'number',
      prompt:
        'Từ đỉnh một ngọn hải đăng cao $40$ m so với mặt nước biển, người ta nhìn thấy một con thuyền với góc hạ $20^\\circ$. Thuyền cách chân hải đăng bao nhiêu mét (làm tròn đến mét)?',
      answer: 110,
      tolerance: 0.5,
      unit: 'm',
      hints: [
        'Góc hạ bằng góc tạo bởi tia nhìn với mặt nước (hai góc so le trong).',
        'Khoảng cách $d$ thoả mãn $40 = d\\tan 20^\\circ$.',
      ],
      solution:
        'Góc giữa tia nhìn và mặt nước bằng góc hạ $20^\\circ$, nên $d = \\dfrac{40}{\\tan 20^\\circ} = 40\\cot 20^\\circ \\approx \\dfrac{40}{0{,}364} \\approx 109{,}9 \\approx 110$ m.',
    },
    {
      type: 'number',
      prompt:
        'Một con dốc dài $50$ m, đỉnh dốc cao hơn chân dốc $6$ m. Mặt dốc tạo với phương nằm ngang góc bao nhiêu độ (làm tròn đến độ)? Nhập số đo theo độ.',
      answer: 7,
      hints: [
        'Mặt dốc là cạnh huyền, độ cao là cạnh đối của góc dốc.',
        '$\\sin\\alpha = \\dfrac{6}{50}$.',
      ],
      solution:
        '$\\sin\\alpha = \\dfrac{6}{50} = 0{,}12$, máy tính cho $\\alpha \\approx 6{,}89^\\circ \\approx 7^\\circ$.',
    },
  ],
  takeaways: [
    'Cạnh góc vuông = cạnh huyền $\\times$ sin góc đối = cạnh huyền $\\times$ côsin góc kề.',
    'Cạnh góc vuông = cạnh góc vuông kia $\\times$ tang góc đối = cạnh góc vuông kia $\\times$ côtang góc kề.',
    'Giải tam giác vuông cần biết hai cạnh, hoặc một cạnh và một góc nhọn.',
    'Đo chiều cao bằng giác kế: $h = h_0 + d\\tan\\alpha$, với $d$ là khoảng cách đến chân vật và $\\alpha$ là góc nâng.',
  ],
};
