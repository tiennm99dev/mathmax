/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: củng cố định lí Pythagore, các trường hợp đồng dạng của hai tam giác vuông và hình đồng dạng, với bộ đề tự sinh chấm điểm tức thì.',
  intro:
    'Ba bài cuối chương gắn với nhau rất chặt: định lí Pythagore tính cạnh còn lại của tam giác vuông, các tam giác vuông đồng dạng cho những tỉ lệ thức để đo chiều cao hay tính đường cao, còn hình đồng dạng giải thích vì sao bản đồ, mô hình và ảnh phóng to giữ nguyên hình dạng. Bài này giúp em phối hợp cả ba.',
  objectives: [
    'Tính độ dài cạnh tam giác vuông bằng định lí Pythagore và nhận biết tam giác vuông bằng định lí đảo.',
    'Chứng minh hai tam giác vuông đồng dạng và dùng chúng để tính đường cao, hình chiếu, chiều cao vật thể.',
    'Tính độ dài trong hình đồng dạng phối cảnh, trên bản đồ và mô hình.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            ['Định lí Pythagore', '$\\triangle ABC$ vuông tại $A$ thì $BC^2 = AB^2 + AC^2$'],
            ['Định lí đảo', '$BC^2 = AB^2 + AC^2$ thì $\\triangle ABC$ vuông tại $A$'],
            [
              'Hai tam giác vuông đồng dạng',
              'Một góc nhọn bằng nhau; hoặc hai cạnh góc vuông tỉ lệ; hoặc cạnh huyền và một cạnh góc vuông tỉ lệ',
            ],
            [
              'Đường cao $AH$ của tam giác vuông tại $A$',
              '$AB^2 = BH \\cdot BC$, $AC^2 = CH \\cdot BC$, $AH^2 = HB \\cdot HC$',
            ],
            ['Đồng dạng phối cảnh tâm $O$, tỉ số $k$', "$M'$ thuộc tia $OM$, $OM' = k \\cdot OM$"],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $12$ câu mới, bốn câu cho mỗi bài 35, 36, 37. Độ dài viết dấu phẩy thập phân, ví dụ $4{,}25$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề luyện tập trộn ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết em cần ôn lại bài nào.',
  },
  examples: [
    {
      problem:
        'Một con diều bay với sợi dây căng thẳng dài $50$ m. Điểm trên mặt đất ngay dưới con diều cách người cầm dây $30$ m. Hỏi con diều ở độ cao bao nhiêu so với tay người cầm dây (coi tay người và điểm đó cùng độ cao)?',
      steps: [
        'Sợi dây là cạnh huyền của một tam giác vuông, khoảng cách $30$ m và độ cao $h$ là hai cạnh góc vuông.',
        'Theo định lí Pythagore: $h^2 = 50^2 - 30^2 = 2\\,500 - 900 = 1\\,600$.',
        '$h = 40$.',
      ],
      answer: 'Con diều cao $40$ m so với tay người cầm dây.',
    },
    {
      problem:
        'Cho $\\triangle ABC$ vuông tại $A$, $AB = 15$ cm, $AC = 20$ cm, đường cao $AH$. Tính $BC$, $AH$ và $BH$.',
      steps: [
        '$BC^2 = 15^2 + 20^2 = 625$, nên $BC = 25$ cm.',
        '$\\triangle HBA$ và $\\triangle ABC$ là hai tam giác vuông có chung góc nhọn $B$, nên $\\triangle HBA \\backsim \\triangle ABC$.',
        'Suy ra $\\dfrac{AH}{CA} = \\dfrac{BA}{BC}$, nên $AH = \\dfrac{15 \\cdot 20}{25} = 12$ cm.',
        'Cũng từ đó $\\dfrac{BH}{BA} = \\dfrac{BA}{BC}$, nên $BH = \\dfrac{15^2}{25} = 9$ cm.',
      ],
      answer: '$BC = 25$ cm, $AH = 12$ cm, $BH = 9$ cm.',
    },
    {
      problem:
        "$\\triangle A'B'C'$ đồng dạng phối cảnh với $\\triangle ABC$, tâm $O$, tỉ số $k = 3$. Biết $OA = 2$ cm và $AB = 1{,}5$ cm. Tính $AA'$ và $A'B'$.",
      steps: [
        "$A'$ nằm trên tia $OA$ và $OA' = 3 \\cdot 2 = 6$ cm.",
        "$A$ nằm giữa $O$ và $A'$ (vì $k > 1$), nên $AA' = OA' - OA = 6 - 2 = 4$ cm.",
        "$A'B' = 3 \\cdot AB = 3 \\cdot 1{,}5 = 4{,}5$ cm.",
      ],
      answer: "$AA' = 4$ cm, $A'B' = 4{,}5$ cm.",
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tam giác vuông có hai cạnh góc vuông $9$ cm và $40$ cm. Tính cạnh huyền.',
      answer: 41,
      unit: 'cm',
      hints: ['$c^2 = 9^2 + 40^2$.'],
      solution: '$c^2 = 81 + 1\\,600 = 1\\,681 = 41^2$, nên $c = 41$ cm.',
    },
    {
      type: 'choice',
      prompt: 'Bộ ba độ dài nào dưới đây không phải là ba cạnh của một tam giác vuông?',
      options: ['$6$, $8$, $10$', '$9$, $12$, $15$', '$7$, $8$, $11$', '$20$, $21$, $29$'],
      answer: 2,
      hints: ['So sánh bình phương cạnh lớn nhất với tổng bình phương hai cạnh kia.'],
      solution:
        '$7^2 + 8^2 = 113 \\ne 121 = 11^2$. Các bộ khác: $36 + 64 = 100$, $81 + 144 = 225$, $400 + 441 = 841$.',
    },
    {
      type: 'number',
      prompt: 'Một hình chữ nhật có kích thước $12$ cm và $35$ cm. Tính độ dài đường chéo.',
      answer: 37,
      unit: 'cm',
      hints: ['Đường chéo là cạnh huyền của tam giác vuông có hai cạnh góc vuông $12$ và $35$.'],
      solution: '$d^2 = 144 + 1\\,225 = 1\\,369 = 37^2$, nên $d = 37$ cm.',
    },
    {
      type: 'number',
      prompt:
        '$\\triangle ABC$ vuông tại $A$, đường cao $AH$, $HB = 2$ cm, $HC = 8$ cm. Tính $AH$.',
      answer: 4,
      unit: 'cm',
      hints: ['$\\triangle HBA \\backsim \\triangle HAC$.', '$AH^2 = HB \\cdot HC$.'],
      solution: '$AH^2 = 2 \\cdot 8 = 16$, nên $AH = 4$ cm.',
    },
    {
      type: 'number',
      prompt:
        '$\\triangle ABC$ vuông tại $A$, đường cao $AH$, $CH = 6{,}4$ cm, $BC = 10$ cm. Tính $AC$.',
      answer: 8,
      unit: 'cm',
      hints: [
        '$\\triangle HAC \\backsim \\triangle ABC$ (chung góc $C$).',
        '$AC^2 = CH \\cdot CB$.',
      ],
      solution: '$AC^2 = 6{,}4 \\cdot 10 = 64$, nên $AC = 8$ cm.',
    },
    {
      type: 'number',
      prompt:
        '$\\triangle ABC$ vuông tại $A$ có $BC = 17$ cm, $AC = 15$ cm. $\\triangle DEF$ vuông tại $D$ có $EF = 8{,}5$ cm, $DF = 7{,}5$ cm. Tính $DE$.',
      answer: 4,
      unit: 'cm',
      hints: [
        'Cạnh huyền và một cạnh góc vuông tỉ lệ nên hai tam giác vuông đồng dạng.',
        'Tính $AB$ bằng định lí Pythagore.',
      ],
      solution:
        '$\\dfrac{EF}{BC} = \\dfrac{DF}{AC} = \\dfrac{1}{2}$ nên $\\triangle DEF \\backsim \\triangle ABC$. $AB^2 = 289 - 225 = 64$, $AB = 8$ cm, nên $DE = \\dfrac{1}{2} \\cdot 8 = 4$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Cùng lúc, một bạn cao $1{,}6$ m có bóng dài $2$ m, còn một toà nhà có bóng dài $30$ m. Toà nhà cao bao nhiêu mét?',
      answer: 24,
      unit: 'm',
      hints: ['Hai tam giác vuông (vật – bóng) có cùng góc tia nắng nên đồng dạng.'],
      solution: '$\\dfrac{h}{1{,}6} = \\dfrac{30}{2} = 15$, nên $h = 1{,}6 \\cdot 15 = 24$ m.',
    },
    {
      type: 'number',
      prompt:
        "Hai hình đồng dạng phối cảnh với tâm $O$; điểm $A'$ tương ứng với $A$, $OA = 5$ cm, $OA' = 2$ cm. Tính tỉ số đồng dạng $k$ (viết dạng số thập phân).",
      answer: 0.4,
      hints: ["$k = \\dfrac{OA'}{OA}$."],
      solution: '$k = \\dfrac{2}{5} = 0{,}4$; hình mới là hình thu nhỏ.',
    },
    {
      type: 'number',
      prompt:
        "Hình $H'$ đồng dạng phối cảnh với $H$, tâm $O$, tỉ số $2{,}5$. Điểm $A$ thuộc $H$ có $OA = 3$ cm. Tính khoảng cách $AA'$.",
      answer: 4.5,
      unit: 'cm',
      hints: ["$OA' = 2{,}5 \\cdot OA$ và $A'$ nằm trên tia $OA$, xa $O$ hơn $A$."],
      solution: "$OA' = 7{,}5$ cm, nên $AA' = OA' - OA = 7{,}5 - 3 = 4{,}5$ cm.",
    },
    {
      type: 'multi',
      prompt: 'Những cặp hình nào sau đây luôn đồng dạng?',
      options: [
        'Hai tam giác vuông cân',
        'Hai tam giác vuông cùng có một góc $30^\\circ$',
        'Hai tam giác vuông bất kì',
        'Hai hình thoi bất kì',
      ],
      answers: [0, 1],
      hints: ['Với tam giác vuông, chỉ cần thêm một góc nhọn bằng nhau.'],
      solution:
        'Tam giác vuông cân có góc nhọn $45^\\circ$, và hai tam giác vuông có góc $30^\\circ$ đều có một góc nhọn bằng nhau, nên đồng dạng. Hai tam giác vuông bất kì hay hai hình thoi bất kì có thể có góc khác nhau.',
    },
  ],
  takeaways: [
    'Tam giác vuông: $a^2 + b^2 = c^2$ với $c$ là cạnh huyền; ngược lại cũng đúng.',
    'Hai tam giác vuông đồng dạng khi có một góc nhọn bằng nhau, hai cạnh góc vuông tỉ lệ, hoặc cạnh huyền và một cạnh góc vuông tỉ lệ.',
    'Đường cao ứng với cạnh huyền cho $AH^2 = HB \\cdot HC$ và $AB^2 = BH \\cdot BC$.',
    'Hình đồng dạng tỉ số $k$ nhân mọi độ dài với $k$: dùng cho bản đồ, mô hình, đo chiều cao bằng bóng.',
  ],
};
