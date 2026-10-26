/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm Toán 6 phần Hình học và đo lường: hình phẳng trong thực tiễn, chu vi và diện tích, hình có trục đối xứng và tâm đối xứng, điểm, đường thẳng, tia, đoạn thẳng, trung điểm và góc, kèm bảng dựng hình tự kiểm tra.',
  intro:
    'Phần hình học lớp 6 đi từ những hình quen thuộc trong đời sống (tam giác đều, hình vuông, lục giác đều, hình chữ nhật, hình thoi, hình bình hành, hình thang cân) đến tính đối xứng của hình phẳng và những hình hình học cơ bản: điểm, đường thẳng, tia, đoạn thẳng, góc. Bài này hệ thống lại các công thức và tính chất, giải mẫu các bài toán tổng hợp và cho em tự dựng hình trên lưới ô vuông để kiểm tra mình đã nắm vững chưa.',
  objectives: [
    'Nhắc lại đặc điểm của các hình phẳng đã học và công thức tính chu vi, diện tích.',
    'Nhận biết hình có trục đối xứng, hình có tâm đối xứng.',
    'Vận dụng điểm nằm giữa hai điểm, trung điểm của đoạn thẳng để tính độ dài.',
    'Nhận biết và đo góc; phân biệt góc nhọn, góc vuông, góc tù, góc bẹt.',
  ],
  sections: [
    {
      heading: 'Hình phẳng, chu vi và diện tích',
      blocks: [
        {
          type: 'table',
          caption: 'Công thức chu vi và diện tích',
          head: ['Hình', 'Chu vi', 'Diện tích'],
          rows: [
            ['Hình vuông cạnh $a$', '$C = 4a$', '$S = a^2$'],
            ['Hình chữ nhật chiều dài $a$, chiều rộng $b$', '$C = 2(a + b)$', '$S = a \\cdot b$'],
            [
              'Hình thoi cạnh $a$, hai đường chéo $m$, $n$',
              '$C = 4a$',
              '$S = \\dfrac{m \\cdot n}{2}$',
            ],
            [
              'Hình bình hành cạnh $a$, $b$, chiều cao $h$ ứng với cạnh $a$',
              '$C = 2(a + b)$',
              '$S = a \\cdot h$',
            ],
            [
              'Hình thang cân hai đáy $a$, $b$, chiều cao $h$',
              'tổng độ dài bốn cạnh',
              '$S = \\dfrac{(a + b) \\cdot h}{2}$',
            ],
          ],
        },
        {
          type: 'list',
          items: [
            'Tam giác đều: ba cạnh bằng nhau, ba góc bằng nhau và bằng $60^\\circ$.',
            'Hình lục giác đều: sáu cạnh bằng nhau, sáu góc bằng nhau; ghép được từ sáu tam giác đều.',
            'Hình chữ nhật: bốn góc vuông, hai đường chéo bằng nhau. Hình thoi: bốn cạnh bằng nhau, hai đường chéo vuông góc.',
            'Hình bình hành: các cạnh đối song song và bằng nhau, hai đường chéo cắt nhau tại trung điểm mỗi đường.',
            'Hình thang cân: hai đáy song song, hai cạnh bên bằng nhau, hai đường chéo bằng nhau.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Cùng một đơn vị',
          text: 'Trước khi tính, đổi mọi độ dài về cùng một đơn vị. Diện tích có đơn vị bình phương: $1\\ \\text{m}^2 = 10\\,000\\ \\text{cm}^2$.',
        },
      ],
    },
    {
      heading: 'Tính đối xứng của hình phẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Trục đối xứng và tâm đối xứng',
          text: 'Đường thẳng $d$ là trục đối xứng của một hình nếu gấp hình theo $d$ thì hai nửa của hình chồng khít lên nhau. Điểm $O$ là tâm đối xứng của một hình nếu quay hình nửa vòng quanh $O$ thì hình trùng với chính nó.',
        },
        {
          type: 'table',
          head: ['Hình', 'Số trục đối xứng', 'Có tâm đối xứng'],
          rows: [
            ['Tam giác đều', '$3$', 'không'],
            ['Hình vuông', '$4$', 'có (giao điểm hai đường chéo)'],
            ['Hình chữ nhật', '$2$', 'có'],
            ['Hình thoi', '$2$ (hai đường chéo)', 'có'],
            ['Hình bình hành (không là hình chữ nhật, hình thoi)', '$0$', 'có'],
            ['Hình thang cân', '$1$', 'không'],
            ['Lục giác đều', '$6$', 'có'],
            ['Hình tròn', 'vô số (mọi đường kính)', 'có (tâm đường tròn)'],
          ],
        },
      ],
    },
    {
      heading: 'Điểm, đường thẳng, tia, đoạn thẳng và góc',
      blocks: [
        {
          type: 'list',
          items: [
            'Qua hai điểm phân biệt có một và chỉ một đường thẳng. Ba điểm cùng nằm trên một đường thẳng gọi là ba điểm thẳng hàng; khi đó có đúng một điểm nằm giữa hai điểm còn lại.',
            'Điểm $O$ trên đường thẳng $xy$ chia đường thẳng thành hai tia đối nhau $Ox$ và $Oy$.',
            'Nếu điểm $M$ nằm giữa $A$ và $B$ thì $AM + MB = AB$.',
            'Trung điểm $M$ của đoạn thẳng $AB$ nằm giữa $A$, $B$ và $MA = MB = \\dfrac{AB}{2}$.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Các loại góc',
          text: 'Góc nhọn có số đo nhỏ hơn $90^\\circ$; góc vuông bằng $90^\\circ$; góc tù lớn hơn $90^\\circ$ và nhỏ hơn $180^\\circ$; góc bẹt bằng $180^\\circ$ (hai cạnh là hai tia đối nhau).',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng dựng hình tự kiểm tra',
    instruction:
      'Có $8$ bài dựng hình trên lưới ô vuông cạnh $1$ cm. Kéo các điểm màu tím (hoặc chọn điểm rồi dùng phím mũi tên), điểm luôn bám vào nút lưới. Bấm "Kiểm tra": bảng cho biết hình đã đúng chưa và sai ở đâu. Hãy dựng đúng cả $8$ bài.',
  },
  examples: [
    {
      problem:
        'Một mảnh vườn hình chữ nhật dài $25$ m, rộng $15$ m. Người ta làm một lối đi rộng $2$ m chạy sát bên trong quanh mảnh vườn, phần còn lại trồng rau. Tính diện tích trồng rau và diện tích lối đi.',
      steps: [
        'Diện tích mảnh vườn: $25 \\cdot 15 = 375$ ($\\text{m}^2$).',
        'Phần trồng rau là hình chữ nhật có chiều dài $25 - 2 \\cdot 2 = 21$ (m), chiều rộng $15 - 2 \\cdot 2 = 11$ (m).',
        'Diện tích trồng rau: $21 \\cdot 11 = 231$ ($\\text{m}^2$).',
        'Diện tích lối đi: $375 - 231 = 144$ ($\\text{m}^2$).',
      ],
      answer: 'Trồng rau $231\\ \\text{m}^2$, lối đi $144\\ \\text{m}^2$.',
    },
    {
      problem:
        'Một hình thoi có cạnh $5$ cm, hai đường chéo dài $6$ cm và $8$ cm. Tính chu vi và diện tích hình thoi.',
      steps: [
        'Chu vi: $C = 4 \\cdot 5 = 20$ (cm).',
        'Diện tích: $S = \\dfrac{6 \\cdot 8}{2} = 24$ ($\\text{cm}^2$).',
      ],
      answer: 'Chu vi $20$ cm, diện tích $24\\ \\text{cm}^2$.',
    },
    {
      problem:
        'Trên tia $Ox$ lấy hai điểm $A$ và $B$ sao cho $OA = 3$ cm, $OB = 7$ cm. a) Tính $AB$. b) Gọi $M$ là trung điểm của $AB$. Tính $OM$.',
      steps: [
        'Hai điểm $A$, $B$ cùng nằm trên tia $Ox$ và $OA < OB$ nên $A$ nằm giữa $O$ và $B$.',
        'Do đó $OA + AB = OB$, suy ra $AB = 7 - 3 = 4$ (cm).',
        '$M$ là trung điểm của $AB$ nên $AM = \\dfrac{AB}{2} = 2$ (cm), và $A$ nằm giữa $O$ và $M$.',
        '$OM = OA + AM = 3 + 2 = 5$ (cm).',
      ],
      answer: '$AB = 4$ cm, $OM = 5$ cm.',
    },
    {
      problem: 'Tính số đo góc tạo bởi kim giờ và kim phút lúc $4$ giờ đúng. Góc đó là góc gì?',
      steps: [
        'Mặt đồng hồ chia thành $12$ khoảng bằng nhau, mỗi khoảng ứng với $360^\\circ : 12 = 30^\\circ$.',
        'Lúc $4$ giờ, kim phút chỉ số $12$, kim giờ chỉ số $4$: hai kim cách nhau $4$ khoảng.',
        'Số đo góc: $4 \\cdot 30^\\circ = 120^\\circ$. Vì $90^\\circ < 120^\\circ < 180^\\circ$ nên đó là góc tù.',
      ],
      answer: 'Góc $120^\\circ$, là góc tù.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính diện tích hình bình hành có cạnh đáy $12$ cm và chiều cao tương ứng $7$ cm.',
      answer: 84,
      unit: 'cm²',
      hints: ['Diện tích hình bình hành bằng cạnh đáy nhân chiều cao ứng với cạnh đó.'],
      solution: '$S = 12 \\cdot 7 = 84$ ($\\text{cm}^2$).',
    },
    {
      type: 'number',
      prompt: 'Tính diện tích hình thang cân có hai đáy $10$ cm và $6$ cm, chiều cao $4$ cm.',
      answer: 32,
      unit: 'cm²',
      hints: ['$S = \\dfrac{(a + b) \\cdot h}{2}$ với $a$, $b$ là hai đáy.'],
      solution: '$S = \\dfrac{(10 + 6) \\cdot 4}{2} = \\dfrac{64}{2} = 32$ ($\\text{cm}^2$).',
    },
    {
      type: 'number',
      prompt: 'Một hình vuông có chu vi $36$ cm. Tính diện tích hình vuông đó.',
      answer: 81,
      unit: 'cm²',
      hints: ['Từ chu vi, tìm cạnh: $a = C : 4$.'],
      solution: 'Cạnh hình vuông: $36 : 4 = 9$ (cm). Diện tích: $9^2 = 81$ ($\\text{cm}^2$).',
    },
    {
      type: 'number',
      prompt:
        'Một sân hình chữ nhật dài $30$ m, rộng $20$ m được lát bằng gạch hình vuông cạnh $50$ cm. Cần bao nhiêu viên gạch (bỏ qua mạch vữa)?',
      answer: 2400,
      unit: 'viên',
      hints: [
        'Đổi $50$ cm $= 0{,}5$ m rồi tính diện tích một viên gạch.',
        'Số viên gạch bằng diện tích sân chia cho diện tích một viên.',
      ],
      solution:
        'Diện tích sân: $30 \\cdot 20 = 600$ ($\\text{m}^2$). Một viên gạch: $0{,}5 \\cdot 0{,}5 = 0{,}25$ ($\\text{m}^2$). Số viên: $600 : 0{,}25 = 2\\,400$ (viên).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hình với công thức tính diện tích của nó.',
      left: ['Hình chữ nhật', 'Hình thoi', 'Hình bình hành', 'Hình thang cân'],
      right: [
        '$a \\cdot h$',
        '$\\dfrac{(a + b) \\cdot h}{2}$',
        '$a \\cdot b$',
        '$\\dfrac{m \\cdot n}{2}$',
        '$4a$',
      ],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: ['$4a$ là chu vi hình vuông (hoặc hình thoi), không phải diện tích.'],
      solution:
        'Hình chữ nhật: $a \\cdot b$; hình thoi: $\\dfrac{m \\cdot n}{2}$ ($m$, $n$ là hai đường chéo); hình bình hành: $a \\cdot h$; hình thang cân: $\\dfrac{(a + b) \\cdot h}{2}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các hình có tâm đối xứng.',
      options: [
        'Tam giác đều',
        'Hình vuông',
        'Hình bình hành',
        'Hình thang cân',
        'Hình lục giác đều',
      ],
      answers: [1, 2, 4],
      hints: ['Quay hình nửa vòng quanh một điểm: hình có trùng với chính nó không?'],
      solution:
        'Hình vuông, hình bình hành và lục giác đều có tâm đối xứng (giao điểm các đường chéo). Tam giác đều và hình thang cân chỉ có trục đối xứng.',
    },
    {
      type: 'choice',
      prompt:
        'Trong các chữ cái in hoa N, H, A, Z, chữ nào vừa có trục đối xứng vừa có tâm đối xứng?',
      options: ['N', 'H', 'A', 'Z'],
      answer: 1,
      hints: [
        'Chữ N và Z có tâm đối xứng nhưng không có trục đối xứng; chữ A chỉ có trục đối xứng.',
      ],
      solution:
        'Chữ H có hai trục đối xứng (một trục đứng, một trục ngang) và có tâm đối xứng là giao điểm của hai trục đó.',
    },
    {
      type: 'number',
      prompt: 'Hình lục giác đều có bao nhiêu trục đối xứng?',
      answer: 6,
      unit: 'trục',
      hints: [
        'Đếm các đường thẳng nối hai đỉnh đối diện và các đường thẳng nối trung điểm hai cạnh đối diện.',
      ],
      solution:
        'Có $3$ trục qua hai đỉnh đối diện và $3$ trục qua trung điểm hai cạnh đối diện: $6$ trục.',
    },
    {
      type: 'number',
      prompt:
        'Cho đoạn thẳng $AB = 10$ cm. Điểm $M$ nằm giữa $A$ và $B$ với $AM = 4$ cm; $N$ là trung điểm của $MB$. Tính độ dài $AN$.',
      answer: 7,
      unit: 'cm',
      hints: ['$M$ nằm giữa $A$ và $B$ nên $MB = AB - AM$.', 'Sau đó $AN = AM + MN$.'],
      solution: '$MB = 10 - 4 = 6$ (cm), $MN = 6 : 2 = 3$ (cm), $AN = AM + MN = 4 + 3 = 7$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Cho $5$ điểm, trong đó không có ba điểm nào thẳng hàng. Vẽ các đường thẳng đi qua từng cặp điểm. Có tất cả bao nhiêu đường thẳng?',
      answer: 10,
      unit: 'đường thẳng',
      hints: [
        'Mỗi điểm nối được với $4$ điểm còn lại.',
        'Mỗi đường thẳng được đếm hai lần (một lần ở mỗi đầu).',
      ],
      solution: 'Có $\\dfrac{5 \\cdot 4}{2} = 10$ đường thẳng.',
    },
    {
      type: 'choice',
      prompt: 'Góc tạo bởi kim giờ và kim phút lúc $2$ giờ đúng có số đo bao nhiêu và là góc gì?',
      options: [
        '$60^\\circ$, góc nhọn',
        '$60^\\circ$, góc tù',
        '$120^\\circ$, góc tù',
        '$30^\\circ$, góc nhọn',
      ],
      answer: 0,
      hints: ['Hai số liền nhau trên mặt đồng hồ cách nhau $30^\\circ$.'],
      solution:
        'Hai kim cách nhau $2$ khoảng: $2 \\cdot 30^\\circ = 60^\\circ < 90^\\circ$, nên là góc nhọn.',
    },
    {
      type: 'choice',
      prompt: 'Cho điểm $O$ nằm giữa hai điểm $A$ và $B$. Khẳng định nào đúng?',
      options: [
        'Hai tia $OA$ và $OB$ trùng nhau.',
        'Hai tia $OA$ và $OB$ đối nhau, góc $AOB$ là góc bẹt.',
        'Góc $AOB$ là góc vuông.',
        'Hai tia $AO$ và $BO$ trùng nhau.',
      ],
      answer: 1,
      hints: ['$A$ và $B$ nằm khác phía đối với $O$ trên cùng một đường thẳng.'],
      solution:
        '$O$ nằm giữa $A$ và $B$ nên hai tia $OA$, $OB$ là hai tia đối nhau; góc tạo bởi hai tia đối nhau là góc bẹt ($180^\\circ$).',
    },
  ],
  takeaways: [
    'Chữ nhật $S = a \\cdot b$; thoi $S = \\dfrac{m \\cdot n}{2}$; bình hành $S = a \\cdot h$; thang cân $S = \\dfrac{(a + b) \\cdot h}{2}$.',
    'Trục đối xứng: gấp theo nó hai nửa chồng khít; tâm đối xứng: quay nửa vòng quanh nó hình trùng chính nó.',
    '$M$ nằm giữa $A$ và $B$ thì $AM + MB = AB$; trung điểm chia đoạn thẳng thành hai phần bằng nhau.',
    'Góc nhọn $< 90^\\circ$, góc vuông $= 90^\\circ$, góc tù từ trên $90^\\circ$ đến dưới $180^\\circ$, góc bẹt $= 180^\\circ$.',
  ],
};
