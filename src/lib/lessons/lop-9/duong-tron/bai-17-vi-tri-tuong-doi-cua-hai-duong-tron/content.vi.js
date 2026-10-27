/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ba vị trí tương đối của hai đường tròn (cắt nhau, tiếp xúc nhau, không giao nhau) và cách nhận biết chúng bằng cách so sánh đoạn nối tâm với tổng và hiệu hai bán kính.',
  intro:
    'Hai chiếc vòng tròn trong logo Olympic chồng lên nhau, hai bánh răng ăn khớp chạm nhau đúng một điểm, còn mặt đĩa CD và lỗ tròn ở giữa thì không hề chạm nhau. Hai đường tròn có thể nằm theo nhiều cách như vậy. Bài này cho biết chỉ cần so sánh khoảng cách giữa hai tâm với tổng và hiệu hai bán kính là biết ngay chúng nằm thế nào.',
  objectives: [
    'Nhận biết ba vị trí tương đối của hai đường tròn: cắt nhau, tiếp xúc nhau (tiếp xúc ngoài, tiếp xúc trong), không giao nhau (ở ngoài nhau, đựng nhau).',
    "Xác định vị trí tương đối của hai đường tròn bằng cách so sánh đoạn nối tâm $OO'$ với $R + r$ và $R - r$.",
    'Vận dụng tính chất đường nối tâm để tính dây chung, bán kính, khoảng cách giữa hai tâm.',
  ],
  sections: [
    {
      heading: 'Ba vị trí tương đối của hai đường tròn',
      blocks: [
        {
          type: 'p',
          text: "Cho hai đường tròn $(O; R)$ và $(O'; r)$ không trùng nhau. Đường thẳng $OO'$ gọi là đường nối tâm, đoạn thẳng $OO'$ gọi là đoạn nối tâm. Hai đường tròn phân biệt có nhiều nhất hai điểm chung, nên chỉ có ba khả năng.",
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai đường tròn cắt nhau',
          text: 'Hai đường tròn có đúng hai điểm chung gọi là hai đường tròn cắt nhau. Hai điểm chung đó gọi là hai giao điểm; đoạn thẳng nối hai giao điểm gọi là dây chung.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai đường tròn tiếp xúc nhau',
          text: 'Hai đường tròn chỉ có một điểm chung gọi là hai đường tròn tiếp xúc nhau; điểm chung đó gọi là tiếp điểm. Có hai trường hợp: tiếp xúc ngoài (hai đường tròn nằm ngoài nhau) và tiếp xúc trong (đường tròn nhỏ nằm trong đường tròn lớn).',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai đường tròn không giao nhau',
          text: 'Hai đường tròn không có điểm chung gọi là hai đường tròn không giao nhau. Chúng có thể ở ngoài nhau, hoặc đường tròn này đựng đường tròn kia; khi hai tâm trùng nhau ta có hai đường tròn đồng tâm.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất đường nối tâm',
          text: "Đường nối tâm là trục đối xứng của hình gồm hai đường tròn. Do đó: nếu hai đường tròn cắt nhau tại $A$ và $B$ thì đường nối tâm $OO'$ là đường trung trực của dây chung $AB$; nếu hai đường tròn tiếp xúc nhau thì tiếp điểm nằm trên đường nối tâm.",
        },
      ],
    },
    {
      heading: 'Vị trí tương đối và đoạn nối tâm',
      blocks: [
        {
          type: 'p',
          text: "Cho hai đường tròn $(O; R)$ và $(O'; r)$ với $R > r$, và đặt $d = OO'$. Vị trí tương đối của chúng được xác định hoàn toàn bởi việc so sánh $d$ với $R + r$ và $R - r$.",
        },
        {
          type: 'table',
          head: [
            "Vị trí tương đối của $(O; R)$ và $(O'; r)$",
            'Số điểm chung',
            'Hệ thức giữa $d$ và $R$, $r$',
          ],
          rows: [
            ['Cắt nhau', '$2$', '$R - r < d < R + r$'],
            ['Tiếp xúc ngoài', '$1$', '$d = R + r$'],
            ['Tiếp xúc trong', '$1$', '$d = R - r > 0$'],
            ['Ở ngoài nhau', '$0$', '$d > R + r$'],
            ["$(O)$ đựng $(O')$", '$0$', '$d < R - r$'],
            ['Đồng tâm (trường hợp riêng của đựng nhau)', '$0$', '$d = 0$'],
          ],
          caption: "Vị trí tương đối của hai đường tròn ($R > r$, $d = OO'$).",
        },
        {
          type: 'p',
          text: "Chẳng hạn, khi hai đường tròn tiếp xúc ngoài tại $A$ thì $A$ nằm giữa $O$ và $O'$, nên $OO' = OA + AO' = R + r$. Khi tiếp xúc trong tại $A$ thì $O'$ nằm giữa $O$ và $A$, nên $OO' = OA - O'A = R - r$.",
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Khi hai bán kính bằng nhau',
          text: 'Nếu $R = r$ thì hai đường tròn phân biệt không thể tiếp xúc trong hay đựng nhau: chúng cắt nhau khi $0 < d < 2R$, tiếp xúc ngoài khi $d = 2R$ và ở ngoài nhau khi $d > 2R$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Chỉ so sánh $d$ với $R + r$ rồi kết luận "cắt nhau" khi $d < R + r$. Phải so sánh thêm với $R - r$: ví dụ $R = 5$, $r = 2$, $d = 1$ thì $d < R + r$ nhưng $d < R - r = 3$, nên $(O)$ đựng $(O\')$, không có điểm chung.',
        },
      ],
    },
  ],
  explore: {
    title: 'Dời đường tròn nhỏ quanh đường tròn lớn',
    instruction:
      "Kéo tâm $O'$ (hoặc chọn $O'$ rồi dùng phím mũi tên: lên, xuống đổi đoạn nối tâm $d$; trái, phải quay quanh $O$) và đổi bán kính $r$ bằng thanh trượt. Theo dõi điểm $d$ trên trục so với hai vạch $R - r$ và $R + r$, đếm số điểm chung. Ở đúng hai vạch, hai đường tròn tiếp xúc.",
  },
  examples: [
    {
      problem:
        "Cho hai đường tròn $(O; 4\\text{ cm})$ và $(O'; 3\\text{ cm})$ có $OO' = 5$ cm. Xác định vị trí tương đối của hai đường tròn.",
      steps: [
        'Ta có $R + r = 4 + 3 = 7$ (cm) và $R - r = 4 - 3 = 1$ (cm).',
        "So sánh: $1 < 5 < 7$, tức là $R - r < OO' < R + r$.",
        'Vậy hai đường tròn cắt nhau (có hai điểm chung).',
      ],
      answer: 'Hai đường tròn cắt nhau.',
    },
    {
      problem:
        "Cho đường tròn $(O; 5\\text{ cm})$ và đường tròn $(O'; 3\\text{ cm})$. Xác định vị trí tương đối của chúng khi a) $OO' = 8$ cm; b) $OO' = 2$ cm; c) $OO' = 1$ cm; d) $OO' = 9$ cm.",
      steps: [
        '$R + r = 8$ cm và $R - r = 2$ cm.',
        "a) $OO' = 8 = R + r$: hai đường tròn tiếp xúc ngoài.",
        "b) $OO' = 2 = R - r$: hai đường tròn tiếp xúc trong.",
        "c) $OO' = 1 < R - r$: đường tròn $(O)$ đựng đường tròn $(O')$.",
        "d) $OO' = 9 > R + r$: hai đường tròn ở ngoài nhau.",
      ],
      answer: "a) Tiếp xúc ngoài; b) tiếp xúc trong; c) $(O)$ đựng $(O')$; d) ở ngoài nhau.",
    },
    {
      problem:
        "Hai đường tròn $(O; 15\\text{ cm})$ và $(O'; 13\\text{ cm})$ cắt nhau tại $A$ và $B$, $OO' = 14$ cm. Gọi $H$ là giao điểm của $OO'$ và $AB$. Tính $OH$ và độ dài dây chung $AB$.",
      steps: [
        "$OO'$ là đường trung trực của $AB$, nên $AB \\perp OO'$ tại $H$ và $H$ là trung điểm của $AB$.",
        "Đặt $OH = x$ thì $O'H = 14 - x$. Từ hai tam giác vuông $AHO$ và $AHO'$: $AH^2 = 15^2 - x^2 = 13^2 - (14 - x)^2$.",
        '$225 - x^2 = 169 - 196 + 28x - x^2$, suy ra $28x = 252$, $x = 9$. Vậy $OH = 9$ cm.',
        '$AH^2 = 225 - 81 = 144$, nên $AH = 12$ cm và $AB = 2AH = 24$ cm.',
      ],
      answer: '$OH = 9$ cm, $AB = 24$ cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        "Cho hai đường tròn $(O; 4\\text{ cm})$ và $(O'; 3\\text{ cm})$ với $OO' = 7$ cm. Vị trí tương đối của hai đường tròn là",
      options: ['cắt nhau', 'tiếp xúc ngoài', 'tiếp xúc trong', 'ở ngoài nhau'],
      answer: 1,
      hints: ["Tính $R + r$ và $R - r$ rồi so sánh với $OO'$."],
      solution: "$R + r = 4 + 3 = 7 = OO'$ nên hai đường tròn tiếp xúc ngoài.",
    },
    {
      type: 'choice',
      prompt:
        "Cho hai đường tròn $(O; 5\\text{ cm})$ và $(O'; 3\\text{ cm})$ với $OO' = 2$ cm. Vị trí tương đối của hai đường tròn là",
      options: ['cắt nhau', 'tiếp xúc ngoài', 'tiếp xúc trong', "$(O)$ đựng $(O')$"],
      answer: 2,
      hints: ["So sánh $OO'$ với $R - r$."],
      solution: "$R - r = 5 - 3 = 2 = OO'$ nên hai đường tròn tiếp xúc trong.",
    },
    {
      type: 'number',
      prompt:
        "Hai đường tròn $(O; 6\\text{ cm})$ và $(O'; 2\\text{ cm})$ có $OO' = 3$ cm. Chúng có bao nhiêu điểm chung?",
      answer: 0,
      hints: ['Đừng chỉ so sánh với $R + r$.', "Tính $R - r$ và so sánh với $OO'$."],
      solution:
        "$R - r = 4$ cm và $OO' = 3 < 4$, nên đường tròn $(O)$ đựng đường tròn $(O')$: không có điểm chung.",
    },
    {
      type: 'choice',
      prompt:
        "Cho hai đường tròn $(O; 3\\text{ cm})$ và $(O'; 2\\text{ cm})$ với $OO' = 6$ cm. Vị trí tương đối của hai đường tròn là",
      options: ['cắt nhau', 'tiếp xúc ngoài', 'ở ngoài nhau', "$(O)$ đựng $(O')$"],
      answer: 2,
      hints: ["$OO'$ lớn hơn hay nhỏ hơn $R + r$?"],
      solution: "$R + r = 5$ cm $< 6$ cm $= OO'$, nên hai đường tròn ở ngoài nhau.",
    },
    {
      type: 'number',
      prompt:
        "Đường tròn $(O; 7\\text{ cm})$ tiếp xúc trong với đường tròn $(O'; r)$, $r < 7$ cm, và $OO' = 4$ cm. Tính $r$.",
      answer: 3,
      unit: 'cm',
      hints: ["Tiếp xúc trong: $OO' = R - r$."],
      solution: "$OO' = R - r$ nên $r = R - OO' = 7 - 4 = 3$ cm.",
    },
    {
      type: 'number',
      prompt:
        "Đường tròn $(O; 6\\text{ cm})$ tiếp xúc ngoài với đường tròn $(O'; 2{,}5\\text{ cm})$. Tính độ dài đoạn nối tâm $OO'$.",
      answer: 8.5,
      unit: 'cm',
      hints: ['Tiếp điểm nằm giữa hai tâm.'],
      solution: "Tiếp xúc ngoài nên $OO' = R + r = 6 + 2{,}5 = 8{,}5$ cm.",
    },
    {
      type: 'number',
      prompt:
        "Hai đường tròn $(O; 5\\text{ cm})$ và $(O'; 5\\text{ cm})$ cắt nhau tại $A$ và $B$, $OO' = 6$ cm. Tính độ dài dây chung $AB$.",
      answer: 8,
      unit: 'cm',
      hints: [
        "$OO'$ là đường trung trực của $AB$; gọi $H$ là giao điểm của $OO'$ và $AB$.",
        "Hai bán kính bằng nhau nên $H$ cũng là trung điểm của $OO'$: $OH = 3$ cm. Dùng định lí Pythagore trong tam giác $AHO$.",
      ],
      solution:
        "$OA = O'A = 5$ nên $A$ nằm trên đường trung trực của $OO'$, do đó $H$ là trung điểm của $OO'$ và $OH = 3$ cm. $AH^2 = 5^2 - 3^2 = 16$, $AH = 4$ cm, nên $AB = 2AH = 8$ cm.",
    },
    {
      type: 'number',
      prompt:
        'Ba đường tròn $(A; 1\\text{ cm})$, $(B; 2\\text{ cm})$, $(C; 3\\text{ cm})$ đôi một tiếp xúc ngoài với nhau. Tính chu vi tam giác $ABC$.',
      answer: 12,
      unit: 'cm',
      hints: ['Hai đường tròn tiếp xúc ngoài thì đoạn nối tâm bằng tổng hai bán kính.'],
      solution:
        '$AB = 1 + 2 = 3$ cm, $BC = 2 + 3 = 5$ cm, $CA = 3 + 1 = 4$ cm. Chu vi tam giác $ABC$ là $3 + 5 + 4 = 12$ cm.',
    },
    {
      type: 'match',
      prompt:
        "Cho $(O; R)$ và $(O'; r)$ với $R > r$, $d = OO' > 0$. Nối mỗi hệ thức với vị trí tương đối tương ứng.",
      left: ['$d = R + r$', '$d = R - r$', '$R - r < d < R + r$', '$d > R + r$', '$d < R - r$'],
      right: ['Cắt nhau', "$(O)$ đựng $(O')$", 'Tiếp xúc ngoài', 'Ở ngoài nhau', 'Tiếp xúc trong'],
      pairs: [
        [0, 2],
        [1, 4],
        [2, 0],
        [3, 3],
        [4, 1],
      ],
      hints: ['Hai trường hợp có dấu "=" là hai trường hợp tiếp xúc.'],
      solution:
        "$d = R + r$: tiếp xúc ngoài; $d = R - r$: tiếp xúc trong; $R - r < d < R + r$: cắt nhau; $d > R + r$: ở ngoài nhau; $d < R - r$: $(O)$ đựng $(O')$.",
    },
    {
      type: 'multi',
      prompt: 'Chọn các khẳng định đúng.',
      options: [
        'Hai đường tròn phân biệt có thể có ba điểm chung.',
        'Nếu hai đường tròn tiếp xúc nhau thì tiếp điểm nằm trên đường nối tâm.',
        "Nếu hai đường tròn cắt nhau tại $A$, $B$ thì $OO'$ là đường trung trực của $AB$.",
        'Hai đường tròn đồng tâm, bán kính khác nhau thì không có điểm chung.',
      ],
      answers: [1, 2, 3],
      hints: ['Hai đường tròn phân biệt có nhiều nhất bao nhiêu điểm chung?'],
      solution:
        'Hai đường tròn phân biệt có nhiều nhất hai điểm chung, nên khẳng định đầu sai. Ba khẳng định còn lại đúng: hai khẳng định giữa là tính chất đường nối tâm, còn hai đường tròn đồng tâm có $d = 0 < R - r$ nên đựng nhau.',
    },
  ],
  takeaways: [
    'Hai đường tròn phân biệt có $2$, $1$ hoặc $0$ điểm chung: cắt nhau, tiếp xúc nhau, không giao nhau.',
    "Với $R > r$ và $d = OO'$: cắt nhau khi $R - r < d < R + r$; tiếp xúc ngoài khi $d = R + r$; tiếp xúc trong khi $d = R - r$; ở ngoài nhau khi $d > R + r$; đựng nhau khi $d < R - r$.",
    'Đường nối tâm là trục đối xứng: nó là đường trung trực của dây chung, và đi qua tiếp điểm khi hai đường tròn tiếp xúc.',
  ],
};
