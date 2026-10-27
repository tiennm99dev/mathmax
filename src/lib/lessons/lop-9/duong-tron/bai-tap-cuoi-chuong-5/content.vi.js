/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương 5: đường tròn và vị trí của điểm, cung và dây, góc ở tâm và số đo cung, độ dài cung tròn, diện tích hình quạt tròn và hình vành khuyên, vị trí tương đối của đường thẳng và đường tròn, tiếp tuyến, vị trí tương đối của hai đường tròn.',
  intro:
    'Chương 5 bắt đầu từ một định nghĩa rất gọn: đường tròn là tập hợp các điểm cách đều một điểm cho trước. Từ đó ta đo được cung, tính được độ dài cung và diện tích hình quạt, rồi biết một đường thẳng hay một đường tròn khác nằm thế nào so với nó chỉ bằng cách so sánh khoảng cách với bán kính. Bài ôn tập này hệ thống lại cả chương, kèm một bộ đề tự sinh có bản đồ kĩ năng tô màu theo từng bài.',
  objectives: [
    'Hệ thống hoá các định nghĩa, tính chất và công thức của chương Đường tròn.',
    'Giải các bài tập trắc nghiệm và tự luận tổng hợp về cung, dây, tiếp tuyến và vị trí tương đối.',
    'Vận dụng công thức độ dài cung, diện tích hình quạt, hình vành khuyên và vị trí tương đối vào bài toán thực tế.',
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
              'Bài 13',
              'Đường tròn, vị trí của điểm',
              '$(O; R)$ gồm các điểm cách $O$ một khoảng $R$; $OM < R$: trong, $OM = R$: trên, $OM > R$: ngoài. Tâm là tâm đối xứng, mỗi đường kính là trục đối xứng',
            ],
            [
              'Bài 14',
              'Dây, góc ở tâm, số đo cung',
              'Đường kính là dây lớn nhất; cung nhỏ có số đo bằng góc ở tâm chắn nó; cung lớn $= 360^\\circ -$ cung nhỏ; nửa đường tròn $180^\\circ$',
            ],
            [
              'Bài 15',
              'Độ dài cung, diện tích hình quạt, hình vành khuyên',
              '$l = \\dfrac{\\pi R n}{180}$; $S_q = \\dfrac{\\pi R^2 n}{360} = \\dfrac{lR}{2}$; $S_{vk} = \\pi\\left(R^2 - r^2\\right)$',
            ],
            [
              'Bài 16',
              'Đường thẳng và đường tròn',
              '$d < R$: cắt nhau; $d = R$: tiếp xúc; $d > R$: không giao nhau. Tiếp tuyến vuông góc với bán kính tại tiếp điểm; hai tiếp tuyến cắt nhau tại $M$: $MA = MB$, $MO$ là phân giác của $\\widehat{AMB}$',
            ],
            [
              'Bài 17',
              'Hai đường tròn',
              "$R > r$, $d = OO'$: cắt nhau khi $R - r < d < R + r$; tiếp xúc ngoài khi $d = R + r$; tiếp xúc trong khi $d = R - r$; ở ngoài nhau khi $d > R + r$; đựng nhau khi $d < R - r$",
            ],
          ],
          caption: 'Tóm tắt chương 5. Đường tròn.',
        },
        {
          type: 'p',
          text: 'Phần lớn các bài tính trong chương quy về hai ý: một tỉ số $\\dfrac{n}{360}$ của cả đường tròn (cho cung và hình quạt), và một tam giác vuông có một đỉnh là tâm (cho dây, khoảng cách, tiếp tuyến, dây chung). Khi gặp bài mới, hãy tự hỏi bài đang dùng ý nào.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: "Lấy góc ở tâm làm số đo cung lớn. Quên bình phương bán kính trong diện tích hình quạt, hoặc viết vành khuyên thành $\\pi(R - r)^2$. Dùng đường kính thay cho bán kính. Với hai đường tròn, chỉ so sánh $OO'$ với $R + r$ mà quên $R - r$. Làm tròn $\\pi$ quá sớm.",
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Số thập phân dùng dấu phẩy ($6{,}28$); có thể gõ kèm đơn vị như cm, cm² hay °. Làm sai lần đầu, em được gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Cuối bộ đề, bản đồ kĩ năng tô màu theo từng bài và chỉ ra bài cần ôn lại.',
  },
  examples: [
    {
      problem:
        'Một chiếc bánh pizza hình tròn đường kính $30$ cm được cắt thành $8$ miếng bằng nhau từ tâm. Tính số đo cung, độ dài phần viền và diện tích của mỗi miếng (làm tròn đến hàng phần trăm).',
      steps: [
        'Bán kính $R = 30 : 2 = 15$ cm. Mỗi miếng là một hình quạt tròn với cung $n = 360^\\circ : 8 = 45^\\circ$.',
        'Độ dài phần viền: $l = \\dfrac{\\pi \\cdot 15 \\cdot 45}{180} = \\dfrac{15\\pi}{4} \\approx 11{,}78$ cm.',
        'Diện tích: $S = \\dfrac{\\pi \\cdot 15^2 \\cdot 45}{360} = \\dfrac{225\\pi}{8} \\approx 88{,}36$ cm².',
      ],
      answer: 'Cung $45^\\circ$; viền dài khoảng $11{,}78$ cm; diện tích khoảng $88{,}36$ cm².',
    },
    {
      problem:
        'Từ điểm $M$ với $OM = 6$ cm, kẻ hai tiếp tuyến $MA$, $MB$ của đường tròn $(O; 3\\text{ cm})$. Tính $\\widehat{AMB}$, $\\widehat{AOB}$, $MA$ và độ dài cung nhỏ $AB$.',
      steps: [
        'Tam giác $OAM$ vuông tại $A$ có $OA = \\dfrac{1}{2}OM$, nên $\\widehat{AMO} = 30^\\circ$. Vì $MO$ là tia phân giác nên $\\widehat{AMB} = 60^\\circ$.',
        '$\\widehat{AOB} = 180^\\circ - 60^\\circ = 120^\\circ$, nên cung nhỏ $AB$ có số đo $120^\\circ$.',
        '$MA = \\sqrt{OM^2 - OA^2} = \\sqrt{36 - 9} = 3\\sqrt{3} \\approx 5{,}20$ cm.',
        'Độ dài cung nhỏ $AB$: $l = \\dfrac{\\pi \\cdot 3 \\cdot 120}{180} = 2\\pi \\approx 6{,}28$ cm.',
      ],
      answer:
        '$\\widehat{AMB} = 60^\\circ$, $\\widehat{AOB} = 120^\\circ$, $MA = 3\\sqrt{3} \\approx 5{,}20$ cm, cung nhỏ $AB$ dài $2\\pi \\approx 6{,}28$ cm.',
    },
    {
      problem:
        'Một trạm phát sóng phủ sóng trong vùng hình tròn bán kính $5$ km. Một con đường thẳng chạy cách trạm $3$ km. Đoạn đường nằm trong vùng phủ sóng dài bao nhiêu?',
      steps: [
        'Coi trạm là tâm $O$, vùng phủ sóng là hình tròn $(O; 5)$, con đường là đường thẳng $a$ với $d = 3 < 5$: $a$ cắt đường tròn tại $A$, $B$.',
        'Đoạn đường có sóng là dây $AB$. Gọi $H$ là chân đường vuông góc từ $O$ đến $a$: $AH^2 = 5^2 - 3^2 = 16$, $AH = 4$ km.',
        '$AB = 2AH = 8$ km.',
      ],
      answer: 'Đoạn đường có sóng dài $8$ km.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tâm của đường tròn đi qua ba đỉnh của một tam giác vuông là',
      options: [
        'trọng tâm của tam giác',
        'đỉnh góc vuông',
        'trung điểm cạnh huyền',
        'trung điểm cạnh góc vuông lớn hơn',
      ],
      answer: 2,
      hints: ['Trung tuyến ứng với cạnh huyền bằng bao nhiêu phần cạnh huyền?'],
      solution:
        'Trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền, nên trung điểm cạnh huyền cách đều ba đỉnh: đó là tâm đường tròn.',
    },
    {
      type: 'number',
      prompt: 'Góc ở tâm $\\widehat{AOB} = 70^\\circ$. Tính số đo cung lớn $AB$.',
      answer: 290,
      unit: '°',
      hints: ['Cung nhỏ và cung lớn chung hai mút có tổng $360^\\circ$.'],
      solution:
        'Cung nhỏ $AB$ có số đo $70^\\circ$, nên cung lớn có số đo $360^\\circ - 70^\\circ = 290^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Đường tròn $(O; 13\\text{ cm})$ có dây $AB = 24$ cm. Tính khoảng cách từ $O$ đến dây $AB$.',
      answer: 5,
      unit: 'cm',
      hints: ['Gọi $H$ là trung điểm của $AB$; $OH \\perp AB$.', '$OH^2 = OA^2 - AH^2$.'],
      solution: '$AH = 12$ cm, $OH^2 = 169 - 144 = 25$, nên $OH = 5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tính độ dài cung $60^\\circ$ của đường tròn bán kính $9$ cm (làm tròn đến hàng phần trăm).',
      answer: 9.42,
      tolerance: 0.005,
      unit: 'cm',
      hints: ['$l = \\dfrac{\\pi R n}{180}$.'],
      solution: '$l = \\dfrac{\\pi \\cdot 9 \\cdot 60}{180} = 3\\pi \\approx 9{,}42$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tính diện tích hình quạt tròn bán kính $6$ cm, cung $120^\\circ$ (làm tròn đến hàng phần trăm).',
      answer: 37.7,
      tolerance: 0.005,
      unit: 'cm²',
      hints: ['$S = \\dfrac{\\pi R^2 n}{360}$; cung $120^\\circ$ là $\\dfrac{1}{3}$ đường tròn.'],
      solution: '$S = \\dfrac{\\pi \\cdot 36 \\cdot 120}{360} = 12\\pi \\approx 37{,}70$ cm².',
    },
    {
      type: 'number',
      prompt:
        'Tính diện tích hình vành khuyên giới hạn bởi hai đường tròn đồng tâm bán kính $5$ cm và $3$ cm (làm tròn đến hàng phần trăm).',
      answer: 50.27,
      tolerance: 0.005,
      unit: 'cm²',
      hints: ['$S = \\pi\\left(R^2 - r^2\\right)$.'],
      solution: '$S = \\pi(25 - 9) = 16\\pi \\approx 50{,}27$ cm².',
    },
    {
      type: 'choice',
      prompt:
        'Đường thẳng $a$ cách tâm của đường tròn $(O; 5\\text{ cm})$ một khoảng $7$ cm. Vị trí tương đối của $a$ và $(O)$ là',
      options: ['cắt nhau', 'tiếp xúc nhau', 'không giao nhau', 'không xác định được'],
      answer: 2,
      hints: ['So sánh $d$ với $R$.'],
      solution: '$d = 7 > 5 = R$ nên $a$ và $(O)$ không giao nhau.',
    },
    {
      type: 'number',
      prompt:
        'Từ điểm $M$ với $OM = 10$ cm, kẻ tiếp tuyến $MA$ của đường tròn $(O; 6\\text{ cm})$ ($A$ là tiếp điểm). Tính $MA$.',
      answer: 8,
      unit: 'cm',
      hints: ['Tiếp tuyến vuông góc với bán kính tại tiếp điểm.'],
      solution: 'Tam giác $OAM$ vuông tại $A$: $MA^2 = 100 - 36 = 64$, nên $MA = 8$ cm.',
    },
    {
      type: 'choice',
      prompt:
        "Cho hai đường tròn $(O; 7\\text{ cm})$ và $(O'; 3\\text{ cm})$ với $OO' = 4$ cm. Vị trí tương đối của hai đường tròn là",
      options: ['cắt nhau', 'tiếp xúc ngoài', 'tiếp xúc trong', "$(O)$ đựng $(O')$"],
      answer: 2,
      hints: ["Tính $R - r$ và so sánh với $OO'$."],
      solution: "$R - r = 7 - 3 = 4 = OO'$ nên hai đường tròn tiếp xúc trong.",
    },
    {
      type: 'number',
      prompt:
        'Bánh xe đạp có đường kính $70$ cm. Khi bánh xe lăn thẳng $100$ vòng, xe đi được bao nhiêu mét (làm tròn đến hàng phần trăm)?',
      answer: 219.91,
      tolerance: 0.005,
      unit: 'm',
      hints: [
        'Mỗi vòng xe đi được một quãng bằng chu vi bánh xe $C = \\pi d$.',
        'Đổi xăng-ti-mét sang mét ở bước cuối.',
      ],
      solution:
        'Mỗi vòng: $C = 70\\pi$ cm. $100$ vòng: $7\\,000\\pi$ cm $= 70\\pi$ m $\\approx 219{,}91$ m.',
    },
    {
      type: 'number',
      prompt:
        'Hai bánh răng ăn khớp được coi như hai đường tròn tiếp xúc ngoài, bán kính $12$ cm và $8$ cm. Tính khoảng cách giữa hai trục (hai tâm) của chúng.',
      answer: 20,
      unit: 'cm',
      hints: ["Hai đường tròn tiếp xúc ngoài: $OO' = R + r$."],
      solution: "$OO' = 12 + 8 = 20$ cm.",
    },
    {
      type: 'multi',
      prompt: 'Chọn các khẳng định đúng.',
      options: [
        'Mọi đường kính của đường tròn đều là trục đối xứng của nó.',
        'Hình quạt $90^\\circ$ có diện tích bằng $\\dfrac{1}{4}$ diện tích hình tròn.',
        'Nếu $MA$, $MB$ là hai tiếp tuyến của $(O)$ thì $\\widehat{AMB} = \\widehat{AOB}$.',
        "Hai đường tròn $(O; 4\\text{ cm})$ và $(O'; 2\\text{ cm})$ với $OO' = 7$ cm ở ngoài nhau.",
      ],
      answers: [0, 1, 3],
      hints: ['Hai góc $\\widehat{AMB}$ và $\\widehat{AOB}$ có quan hệ gì trong tứ giác $OAMB$?'],
      solution:
        "Khẳng định thứ ba sai: $\\widehat{AMB} + \\widehat{AOB} = 180^\\circ$. Khẳng định thứ tư đúng vì $OO' = 7 > 6 = R + r$. Hai khẳng định đầu đúng theo tính đối xứng của đường tròn và vì $\\dfrac{90}{360} = \\dfrac{1}{4}$.",
    },
  ],
  takeaways: [
    'Vị trí của điểm, đường thẳng, đường tròn đối với $(O; R)$ đều được quyết định bằng cách so sánh một khoảng cách với bán kính.',
    'Cung và hình quạt $n^\\circ$ chiếm $\\dfrac{n}{360}$ đường tròn: $l = \\dfrac{\\pi R n}{180}$, $S = \\dfrac{\\pi R^2 n}{360}$; vành khuyên $S = \\pi\\left(R^2 - r^2\\right)$.',
    'Dây, khoảng cách từ tâm, tiếp tuyến và dây chung được tính qua một tam giác vuông có một đỉnh là tâm.',
  ],
};
