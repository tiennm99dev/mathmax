/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đường tròn tâm O bán kính R, vị trí của một điểm đối với đường tròn (nằm trong, nằm trên, nằm ngoài) và tính đối xứng của đường tròn: tâm đối xứng và trục đối xứng.',
  intro:
    'Dùng compa quay một vòng, đầu bút chì vạch nên một đường khép kín mà mọi điểm trên đó cách mũi nhọn của compa cùng một khoảng. Đó là đường tròn, hình mà ta gặp ở bánh xe, mặt đồng hồ hay miệng cốc. Bài này nêu định nghĩa đường tròn, cách xác định một điểm nằm trong, nằm trên hay nằm ngoài đường tròn, và vì sao đường tròn là hình "cân đối" nhất.',
  objectives: [
    'Nhận biết đường tròn tâm $O$ bán kính $R$, kí hiệu $(O; R)$, và hình tròn.',
    'Xác định vị trí của một điểm đối với đường tròn bằng cách so sánh khoảng cách từ điểm đó đến tâm với bán kính.',
    'Nhận biết tâm đối xứng và trục đối xứng của đường tròn; chứng minh nhiều điểm cùng nằm trên một đường tròn.',
  ],
  sections: [
    {
      heading: 'Đường tròn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Đường tròn tâm $O$ bán kính $R$ ($R > 0$) là hình gồm tất cả các điểm cách điểm $O$ một khoảng bằng $R$, kí hiệu là $(O; R)$. Khi không cần chú ý đến bán kính, ta kí hiệu đơn giản là $(O)$.',
        },
        {
          type: 'p',
          text: 'Hình tròn tâm $O$ bán kính $R$ là hình gồm các điểm nằm trên đường tròn $(O; R)$ và các điểm nằm bên trong đường tròn đó.',
        },
        {
          type: 'p',
          text: 'Cho điểm $M$ và đường tròn $(O; R)$. So sánh khoảng cách $OM$ với bán kính $R$, ta biết vị trí của điểm $M$ đối với đường tròn.',
        },
        {
          type: 'table',
          head: ['Vị trí của điểm $M$ đối với $(O; R)$', 'Hệ thức'],
          rows: [
            ['$M$ nằm trên đường tròn', '$OM = R$'],
            ['$M$ nằm bên trong đường tròn', '$OM < R$'],
            ['$M$ nằm bên ngoài đường tròn', '$OM > R$'],
          ],
          caption: 'Vị trí của một điểm đối với đường tròn.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chứng minh nhiều điểm cùng nằm trên một đường tròn',
          text: 'Muốn chứng minh các điểm $A$, $B$, $C$, ... cùng nằm trên một đường tròn, ta chỉ ra một điểm $O$ cách đều chúng: $OA = OB = OC = \\ldots$. Khi đó các điểm ấy cùng nằm trên đường tròn tâm $O$, bán kính bằng khoảng cách chung đó.',
        },
      ],
    },
    {
      heading: 'Tính đối xứng của đường tròn',
      blocks: [
        {
          type: 'p',
          text: "Nhắc lại: hai điểm $M$ và $M'$ đối xứng với nhau qua điểm $O$ nếu $O$ là trung điểm của đoạn thẳng $MM'$. Hai điểm $M$ và $M'$ đối xứng với nhau qua đường thẳng $d$ nếu $d$ là đường trung trực của đoạn thẳng $MM'$.",
        },
        {
          type: 'p',
          text: "Lấy điểm $M$ bất kì trên đường tròn $(O; R)$. Điểm $M'$ đối xứng với $M$ qua $O$ có $OM' = OM = R$, nên $M'$ cũng thuộc đường tròn. Với đường thẳng $d$ bất kì đi qua $O$, điểm $M'$ đối xứng với $M$ qua $d$ có $OM' = OM = R$ (vì $O$ nằm trên đường trung trực của $MM'$), nên $M'$ cũng thuộc đường tròn.",
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính đối xứng',
          text: 'Đường tròn là hình có tâm đối xứng; tâm của đường tròn là tâm đối xứng của nó. Đường tròn là hình có trục đối xứng; mỗi đường thẳng đi qua tâm là một trục đối xứng của đường tròn.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Đường tròn có vô số trục đối xứng (mọi đường thẳng đi qua tâm), nhưng chỉ có một tâm đối xứng là tâm $O$. Nhờ đó, ta có thể tìm tâm của một vật hình tròn bằng cách gấp đôi nó theo hai nếp gấp khác nhau: giao điểm của hai nếp gấp là tâm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Điểm và đường tròn',
    instruction:
      'Kéo điểm $M$ (hoặc chọn $M$ rồi dùng phím mũi tên) và đổi bán kính $R$. Quan sát dấu so sánh giữa $OM$ và $R$. Sau đó bật "Qua tâm $O$" hoặc "Qua trục $d$": khi $M$ nằm trên đường tròn, điểm đối xứng $M\'$ có luôn nằm trên đường tròn không?',
  },
  examples: [
    {
      problem:
        'Cho đường tròn $(O; 5\\text{ cm})$ và ba điểm $A$, $B$, $C$ với $OA = 3$ cm, $OB = 5$ cm, $OC = 7$ cm. Mỗi điểm nằm ở vị trí nào đối với đường tròn?',
      steps: [
        '$OA = 3 < 5$ nên $A$ nằm bên trong đường tròn.',
        '$OB = 5$ bằng bán kính nên $B$ nằm trên đường tròn.',
        '$OC = 7 > 5$ nên $C$ nằm bên ngoài đường tròn.',
      ],
      answer: '$A$ nằm trong, $B$ nằm trên, $C$ nằm ngoài đường tròn $(O; 5\\text{ cm})$.',
    },
    {
      problem:
        'Cho tam giác $ABC$ vuông tại $A$ có $AB = 6$ cm, $AC = 8$ cm. Gọi $M$ là trung điểm của $BC$. Chứng minh ba điểm $A$, $B$, $C$ cùng nằm trên đường tròn tâm $M$ và tính bán kính của đường tròn đó.',
      steps: [
        'Theo định lí Pythagore: $BC^2 = AB^2 + AC^2 = 36 + 64 = 100$, nên $BC = 10$ cm.',
        '$M$ là trung điểm của $BC$ nên $MB = MC = \\dfrac{BC}{2} = 5$ cm.',
        'Trong tam giác vuông, đường trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền, nên $MA = \\dfrac{BC}{2} = 5$ cm.',
        'Vậy $MA = MB = MC = 5$ cm: ba điểm $A$, $B$, $C$ cùng nằm trên đường tròn $(M; 5\\text{ cm})$.',
      ],
      answer: '$A$, $B$, $C$ cùng nằm trên đường tròn tâm $M$, bán kính $5$ cm.',
    },
    {
      problem:
        'Cho hình chữ nhật $ABCD$. Chứng minh bốn đỉnh $A$, $B$, $C$, $D$ cùng nằm trên một đường tròn. Tính bán kính của đường tròn đó nếu $AB = 12$ cm, $BC = 5$ cm.',
      steps: [
        'Gọi $O$ là giao điểm hai đường chéo $AC$ và $BD$.',
        'Trong hình chữ nhật, hai đường chéo bằng nhau và cắt nhau tại trung điểm mỗi đường, nên $OA = OB = OC = OD = \\dfrac{AC}{2}$.',
        'Do đó bốn điểm $A$, $B$, $C$, $D$ cùng nằm trên đường tròn tâm $O$ bán kính $\\dfrac{AC}{2}$.',
        'Tam giác $ABC$ vuông tại $B$: $AC^2 = 12^2 + 5^2 = 169$, nên $AC = 13$ cm và bán kính là $13 : 2 = 6{,}5$ cm.',
      ],
      answer:
        'Bốn đỉnh cùng nằm trên đường tròn tâm $O$ (giao điểm hai đường chéo), bán kính $6{,}5$ cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Cho đường tròn $(O; 4\\text{ cm})$ và điểm $M$ với $OM = 3{,}5$ cm. Điểm $M$ nằm ở đâu?',
      options: [
        'Bên ngoài đường tròn',
        'Trên đường tròn',
        'Bên trong đường tròn',
        'Không xác định được',
      ],
      answer: 2,
      hints: ['So sánh $OM$ với bán kính $R = 4$ cm.'],
      solution: '$OM = 3{,}5 < 4 = R$ nên $M$ nằm bên trong đường tròn.',
    },
    {
      type: 'multi',
      prompt:
        'Cho đường tròn $(O; 4{,}5\\text{ cm})$. Những điểm nào nằm bên ngoài đường tròn? (Chọn tất cả.)',
      options: [
        '$A$ với $OA = 2$ cm',
        '$B$ với $OB = 4{,}5$ cm',
        '$C$ với $OC = 6$ cm',
        '$D$ với $OD = 5$ cm',
      ],
      answers: [2, 3],
      hints: [
        'Điểm nằm ngoài khi khoảng cách đến tâm lớn hơn bán kính.',
        'Điểm có khoảng cách bằng bán kính nằm trên đường tròn, không phải bên ngoài.',
      ],
      solution:
        '$OC = 6 > 4{,}5$ và $OD = 5 > 4{,}5$ nên $C$, $D$ nằm ngoài. $A$ nằm trong ($2 < 4{,}5$), $B$ nằm trên đường tròn ($OB = R$).',
    },
    {
      type: 'choice',
      prompt:
        'Trong mặt phẳng tọa độ $Oxy$, điểm nào dưới đây nằm trên đường tròn tâm $O$ (gốc tọa độ) bán kính $5$?',
      options: ['$P(1; 5)$', '$Q(-2; 4)$', '$S(4; 4)$', '$T(3; -4)$'],
      answer: 3,
      hints: [
        'Khoảng cách từ gốc $O$ đến điểm $(x; y)$ là $\\sqrt{x^2 + y^2}$.',
        'Tìm điểm có $x^2 + y^2 = 25$.',
      ],
      solution:
        '$OT^2 = 3^2 + (-4)^2 = 25$ nên $OT = 5$: $T$ nằm trên đường tròn. Còn $OP^2 = 26$ (ngoài), $OQ^2 = 20$ (trong), $OS^2 = 32$ (ngoài).',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $DEF$ vuông tại $D$ có $DE = 9$ cm, $DF = 12$ cm. Ba đỉnh $D$, $E$, $F$ cùng nằm trên một đường tròn. Tính bán kính của đường tròn đó.',
      answer: 7.5,
      unit: 'cm',
      hints: [
        'Tâm đường tròn là trung điểm của cạnh huyền $EF$.',
        'Tính $EF$ bằng định lí Pythagore rồi lấy một nửa.',
      ],
      solution:
        '$EF^2 = 9^2 + 12^2 = 225$ nên $EF = 15$ cm. Trung điểm $I$ của $EF$ cách đều ba đỉnh (trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền), nên bán kính là $15 : 2 = 7{,}5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Điểm $A$ nằm ngoài đường tròn $(O; R)$ và $OA = 10$ cm. Đoạn thẳng $OA$ cắt đường tròn tại $B$, biết $AB = 4$ cm. Tính $R$.',
      answer: 6,
      unit: 'cm',
      hints: ['$B$ thuộc đường tròn nên $OB = R$.', '$B$ nằm giữa $O$ và $A$: $OB + BA = OA$.'],
      solution: '$B$ nằm giữa $O$ và $A$ nên $R = OB = OA - AB = 10 - 4 = 6$ cm.',
    },
    {
      type: 'choice',
      prompt: 'Đường tròn có bao nhiêu trục đối xứng?',
      options: ['$1$', '$2$', '$4$', 'Vô số'],
      answer: 3,
      hints: ['Mỗi đường thẳng đi qua tâm có phải là trục đối xứng không?'],
      solution:
        'Mỗi đường thẳng đi qua tâm là một trục đối xứng của đường tròn, mà có vô số đường thẳng đi qua tâm. Vậy đường tròn có vô số trục đối xứng.',
    },
    {
      type: 'choice',
      prompt:
        "Điểm $M$ thuộc đường tròn $(O; R)$ và $M'$ đối xứng với $M$ qua $O$. Khẳng định nào đúng?",
      options: [
        "$M'$ nằm trong đường tròn và $MM' = R$",
        "$M'$ thuộc đường tròn và $MM' = 2R$",
        "$M'$ nằm ngoài đường tròn và $MM' = 2R$",
        "$M'$ thuộc đường tròn và $MM' = R$",
      ],
      answer: 1,
      hints: ["$O$ là trung điểm của $MM'$, nên $OM' = OM$."],
      solution:
        "$O$ là trung điểm của $MM'$ nên $OM' = OM = R$: $M'$ thuộc đường tròn, và $MM' = OM + OM' = 2R$ (đoạn $MM'$ là một đường kính).",
    },
    {
      type: 'number',
      prompt:
        'Hình vuông $ABCD$ có cạnh $4$ cm. Bốn đỉnh của nó cùng nằm trên đường tròn tâm $O$ (giao điểm hai đường chéo). Tính bán kính đường tròn (làm tròn đến hàng phần trăm).',
      answer: 2.83,
      tolerance: 0.005,
      unit: 'cm',
      hints: ['Bán kính bằng nửa đường chéo.', 'Đường chéo hình vuông cạnh $a$ là $a\\sqrt{2}$.'],
      solution:
        'Đường chéo $AC = \\sqrt{4^2 + 4^2} = 4\\sqrt{2}$ cm, nên bán kính $R = \\dfrac{AC}{2} = 2\\sqrt{2} \\approx 2{,}83$ cm.',
    },
    {
      type: 'text',
      prompt: 'Tâm đối xứng của đường tròn $(O; R)$ là điểm nào? (Gõ tên điểm.)',
      accept: ['O', 'điểm O', 'tâm O'],
      hints: ['Đường tròn chỉ có một tâm đối xứng.'],
      solution: 'Tâm của đường tròn là tâm đối xứng của nó, tức là điểm $O$.',
    },
  ],
  takeaways: [
    'Đường tròn $(O; R)$ gồm các điểm cách $O$ một khoảng bằng $R$.',
    '$OM = R$: $M$ nằm trên; $OM < R$: $M$ nằm trong; $OM > R$: $M$ nằm ngoài đường tròn.',
    'Tâm $O$ là tâm đối xứng của đường tròn; mỗi đường thẳng qua $O$ là một trục đối xứng.',
    'Muốn chứng minh nhiều điểm cùng thuộc một đường tròn, hãy tìm một điểm cách đều chúng.',
  ],
};
