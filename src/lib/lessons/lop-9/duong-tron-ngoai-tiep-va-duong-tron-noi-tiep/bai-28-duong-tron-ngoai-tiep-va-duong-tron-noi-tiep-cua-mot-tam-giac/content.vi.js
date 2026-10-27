/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đường tròn ngoại tiếp tam giác có tâm là giao điểm ba đường trung trực, đường tròn nội tiếp tam giác có tâm là giao điểm ba đường phân giác trong; với tam giác đều cạnh a, hai tâm trùng nhau và R = a√3/3, r = a√3/6.',
  intro:
    'Ba ngôi nhà ở ba vị trí không thẳng hàng muốn đặt chung một trạm phát sóng sao cho khoảng cách đến ba nhà bằng nhau. Trạm phải đặt ở đâu? Còn nếu muốn đặt một bồn hoa hình tròn lớn nhất trong một mảnh đất hình tam giác thì tâm bồn hoa ở đâu? Hai câu hỏi này dẫn đến đường tròn ngoại tiếp và đường tròn nội tiếp của tam giác.',
  objectives: [
    'Nhận biết đường tròn ngoại tiếp tam giác, xác định tâm và bán kính của nó.',
    'Nhận biết đường tròn nội tiếp tam giác, xác định tâm và bán kính của nó.',
    'Tính bán kính đường tròn ngoại tiếp và nội tiếp của tam giác vuông, tam giác đều.',
  ],
  sections: [
    {
      heading: 'Đường tròn ngoại tiếp tam giác',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Đường tròn đi qua ba đỉnh của một tam giác gọi là đường tròn ngoại tiếp tam giác đó. Khi đó tam giác được gọi là nội tiếp đường tròn.',
        },
        {
          type: 'p',
          text: 'Mỗi điểm trên đường trung trực của $BC$ cách đều $B$ và $C$; mỗi điểm trên đường trung trực của $CA$ cách đều $C$ và $A$. Giao điểm $O$ của hai đường trung trực này cách đều cả ba đỉnh: $OA = OB = OC$, nên $O$ cũng nằm trên đường trung trực của $AB$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tâm và bán kính',
          text: 'Đường tròn ngoại tiếp một tam giác có tâm là giao điểm ba đường trung trực của tam giác đó, bán kính bằng khoảng cách từ giao điểm ấy đến một đỉnh: $R = OA = OB = OC$.',
        },
        {
          type: 'table',
          head: ['Tam giác', 'Vị trí tâm $O$'],
          rows: [
            ['Nhọn', 'Nằm bên trong tam giác'],
            ['Vuông', 'Là trung điểm của cạnh huyền; $R$ bằng nửa cạnh huyền'],
            ['Tù', 'Nằm bên ngoài tam giác'],
          ],
          caption: 'Vị trí tâm đường tròn ngoại tiếp theo loại tam giác',
        },
      ],
    },
    {
      heading: 'Đường tròn nội tiếp tam giác',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Đường tròn tiếp xúc với ba cạnh của một tam giác gọi là đường tròn nội tiếp tam giác đó. Khi đó tam giác được gọi là ngoại tiếp đường tròn.',
        },
        {
          type: 'p',
          text: 'Mỗi điểm trên tia phân giác của góc $B$ cách đều hai cạnh $BA$, $BC$; mỗi điểm trên tia phân giác của góc $C$ cách đều hai cạnh $CA$, $CB$. Giao điểm $I$ của hai đường phân giác này cách đều ba cạnh, nên $I$ cũng nằm trên đường phân giác của góc $A$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tâm và bán kính',
          text: 'Đường tròn nội tiếp một tam giác có tâm là giao điểm ba đường phân giác trong của tam giác đó, bán kính bằng khoảng cách từ giao điểm ấy đến một cạnh.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Tâm $I$ của đường tròn nội tiếp luôn nằm bên trong tam giác. Nối $I$ với ba đỉnh, tam giác được chia thành ba tam giác có cùng chiều cao $r$, nên $S = r \\cdot p$ với $p$ là nửa chu vi.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Không nhầm hai tâm: tâm $O$ (ngoại tiếp) cách đều ba đỉnh, là giao của ba đường trung trực; tâm $I$ (nội tiếp) cách đều ba cạnh, là giao của ba đường phân giác.',
        },
      ],
    },
    {
      heading: 'Đường tròn ngoại tiếp và nội tiếp tam giác đều',
      blocks: [
        {
          type: 'p',
          text: 'Trong tam giác đều, đường trung trực, đường phân giác, đường trung tuyến và đường cao xuất phát từ cùng một đỉnh trùng nhau. Vì thế tâm đường tròn ngoại tiếp và tâm đường tròn nội tiếp trùng nhau và trùng với trọng tâm $G$ của tam giác.',
        },
        {
          type: 'p',
          text: 'Tam giác đều cạnh $a$ có đường cao $h = \\dfrac{a\\sqrt{3}}{2}$. Trọng tâm nằm trên đường cao, cách đỉnh $\\dfrac{2}{3}h$ và cách cạnh đối diện $\\dfrac{1}{3}h$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tam giác đều cạnh $a$',
          text: 'Bán kính đường tròn ngoại tiếp: $R = \\dfrac{a\\sqrt{3}}{3}$. Bán kính đường tròn nội tiếp: $r = \\dfrac{a\\sqrt{3}}{6}$. Do đó $R = 2r$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo đỉnh, xem hai đường tròn vẽ lại',
    instruction:
      'Kéo các đỉnh $A$, $B$, $C$ (hoặc chọn một đỉnh rồi dùng phím mũi tên). Quan sát tâm $O$ khi tam giác chuyển từ nhọn sang vuông rồi tù, và xem hai tâm $O$, $I$ khi tam giác đều. Các nút bên dưới dựng nhanh ba trường hợp đặc biệt.',
  },
  examples: [
    {
      problem:
        'Cho tam giác $ABC$ vuông tại $A$ có $AB = 6$ cm, $AC = 8$ cm. Xác định tâm và tính bán kính đường tròn ngoại tiếp tam giác.',
      steps: [
        'Theo định lí Pythagore: $BC^2 = AB^2 + AC^2 = 36 + 64 = 100$, nên $BC = 10$ cm.',
        'Gọi $M$ là trung điểm của $BC$. Trong tam giác vuông, trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền: $MA = MB = MC = 5$ cm.',
        'Vậy $M$ cách đều ba đỉnh, là tâm đường tròn ngoại tiếp.',
      ],
      answer: 'Tâm là trung điểm $M$ của cạnh huyền $BC$, bán kính $R = 5$ cm.',
    },
    {
      problem:
        'Cho tam giác đều $ABC$ cạnh $6$ cm. Tính bán kính đường tròn ngoại tiếp và đường tròn nội tiếp tam giác.',
      steps: [
        'Gọi $H$ là trung điểm $BC$, $G$ là trọng tâm. Đường cao $AH = \\dfrac{6\\sqrt{3}}{2} = 3\\sqrt{3}$ cm.',
        'Tâm hai đường tròn trùng với $G$. Bán kính ngoại tiếp $R = GA = \\dfrac{2}{3}AH = 2\\sqrt{3}$ cm.',
        'Bán kính nội tiếp $r = GH = \\dfrac{1}{3}AH = \\sqrt{3}$ cm.',
      ],
      answer: '$R = 2\\sqrt{3} \\approx 3{,}46$ cm và $r = \\sqrt{3} \\approx 1{,}73$ cm.',
    },
    {
      problem:
        'Cho tam giác $ABC$ vuông tại $A$, $AB = 6$ cm, $AC = 8$ cm, $BC = 10$ cm. Tính bán kính $r$ của đường tròn nội tiếp tam giác.',
      steps: [
        'Gọi $I$ là tâm đường tròn nội tiếp. Khoảng cách từ $I$ đến ba cạnh đều bằng $r$.',
        'Chia tam giác thành ba tam giác $IBC$, $ICA$, $IAB$: $S_{ABC} = \\dfrac{1}{2}r(BC + CA + AB) = \\dfrac{1}{2}r \\cdot 24 = 12r$.',
        'Mặt khác $S_{ABC} = \\dfrac{1}{2} \\cdot 6 \\cdot 8 = 24$ cm². Suy ra $12r = 24$.',
      ],
      answer: '$r = 2$ cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tâm đường tròn ngoại tiếp một tam giác là giao điểm của',
      options: [
        'ba đường trung tuyến',
        'ba đường trung trực',
        'ba đường phân giác trong',
        'ba đường cao',
      ],
      answer: 1,
      hints: ['Tâm này phải cách đều ba đỉnh của tam giác.'],
      solution:
        'Điểm cách đều hai đỉnh nằm trên đường trung trực của đoạn nối chúng, nên tâm đường tròn ngoại tiếp là giao điểm ba đường trung trực.',
    },
    {
      type: 'choice',
      prompt: 'Tâm đường tròn nội tiếp một tam giác',
      options: [
        'cách đều ba đỉnh của tam giác',
        'là trung điểm của cạnh lớn nhất',
        'cách đều ba cạnh của tam giác',
        'có thể nằm ngoài tam giác',
      ],
      answer: 2,
      hints: ['Đường tròn nội tiếp tiếp xúc với cả ba cạnh.'],
      solution:
        'Đường tròn nội tiếp tiếp xúc với ba cạnh nên tâm $I$ cách đều ba cạnh (khoảng cách bằng $r$); $I$ là giao của ba đường phân giác trong và luôn nằm trong tam giác.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $DEF$ vuông tại $D$ có $DE = 5$ cm, $DF = 12$ cm. Tính bán kính đường tròn ngoại tiếp tam giác $DEF$.',
      answer: 6.5,
      unit: 'cm',
      hints: [
        'Tâm đường tròn ngoại tiếp tam giác vuông là trung điểm cạnh huyền.',
        'Tính cạnh huyền $EF$ bằng định lí Pythagore.',
      ],
      solution:
        '$EF^2 = 5^2 + 12^2 = 169$, nên $EF = 13$ cm. Bán kính $R = \\dfrac{EF}{2} = 6{,}5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tính bán kính đường tròn ngoại tiếp tam giác đều cạnh $6$ cm (làm tròn đến hàng phần trăm).',
      answer: 3.46,
      tolerance: 0.005,
      unit: 'cm',
      hints: ['$R = \\dfrac{a\\sqrt{3}}{3}$.'],
      solution: '$R = \\dfrac{6\\sqrt{3}}{3} = 2\\sqrt{3} \\approx 3{,}46$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một tam giác đều nội tiếp đường tròn bán kính $8$ cm. Tính bán kính đường tròn nội tiếp tam giác đó.',
      answer: 4,
      unit: 'cm',
      hints: ['Trong tam giác đều, hai tâm trùng nhau và $R = 2r$.'],
      solution:
        '$R = \\dfrac{a\\sqrt{3}}{3}$ và $r = \\dfrac{a\\sqrt{3}}{6}$ nên $r = \\dfrac{R}{2} = \\dfrac{8}{2} = 4$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một tam giác đều nội tiếp đường tròn bán kính $4$ cm. Tính độ dài cạnh tam giác (làm tròn đến hàng phần trăm).',
      answer: 6.93,
      tolerance: 0.005,
      unit: 'cm',
      hints: [
        'Từ $R = \\dfrac{a\\sqrt{3}}{3}$, rút $a$ theo $R$.',
        '$a = \\dfrac{3R}{\\sqrt{3}} = R\\sqrt{3}$.',
      ],
      solution: '$a = R\\sqrt{3} = 4\\sqrt{3} \\approx 6{,}93$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $AB = 9$ cm, $AC = 12$ cm. Tính bán kính đường tròn nội tiếp tam giác.',
      answer: 3,
      unit: 'cm',
      hints: [
        'Tính $BC$, rồi viết diện tích tam giác theo hai cách.',
        'Chia tam giác thành ba tam giác có chung đỉnh $I$: $S = \\dfrac{1}{2}r(AB + BC + CA)$.',
      ],
      solution:
        '$BC = \\sqrt{81 + 144} = 15$ cm. $S = \\dfrac{1}{2} \\cdot 9 \\cdot 12 = 54$ cm². Mặt khác $S = \\dfrac{1}{2}r(9 + 12 + 15) = 18r$. Vậy $r = 54 : 18 = 3$ cm.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các khẳng định đúng.',
      options: [
        'Tâm đường tròn ngoại tiếp tam giác tù nằm bên ngoài tam giác.',
        'Tâm đường tròn ngoại tiếp tam giác vuông là trung điểm cạnh huyền.',
        'Tâm đường tròn nội tiếp tam giác cách đều ba đỉnh.',
        'Trong tam giác đều, tâm đường tròn ngoại tiếp trùng với tâm đường tròn nội tiếp.',
      ],
      answers: [0, 1, 3],
      hints: [
        'Kéo thử trong hình tương tác để xem vị trí tâm $O$ với tam giác tù và tam giác vuông.',
        'Tâm nội tiếp cách đều ba cạnh hay ba đỉnh?',
      ],
      solution:
        'Khẳng định 1, 2, 4 đúng. Khẳng định 3 sai: tâm đường tròn nội tiếp cách đều ba cạnh; điểm cách đều ba đỉnh là tâm đường tròn ngoại tiếp.',
    },
  ],
  takeaways: [
    'Đường tròn ngoại tiếp tam giác đi qua ba đỉnh; tâm là giao điểm ba đường trung trực.',
    'Tam giác vuông: tâm đường tròn ngoại tiếp là trung điểm cạnh huyền, $R$ bằng nửa cạnh huyền.',
    'Đường tròn nội tiếp tam giác tiếp xúc với ba cạnh; tâm là giao điểm ba đường phân giác trong.',
    'Tam giác đều cạnh $a$: hai tâm trùng trọng tâm, $R = \\dfrac{a\\sqrt{3}}{3}$, $r = \\dfrac{a\\sqrt{3}}{6}$.',
  ],
};
