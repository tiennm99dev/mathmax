/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: vị trí tương đối của đường thẳng và đường tròn, tiếp tuyến và tính chất hai tiếp tuyến cắt nhau, vị trí tương đối của hai đường tròn và dây chung.',
  intro:
    "Hai bài vừa học có chung một ý: để biết hai hình nằm thế nào với nhau, hãy so sánh một khoảng cách với bán kính. Với đường thẳng, đó là khoảng cách $d$ từ tâm đến đường thẳng; với hai đường tròn, đó là đoạn nối tâm $OO'$. Bài luyện tập này phối hợp hai ý đó với tính chất của tiếp tuyến và đường nối tâm.",
  objectives: [
    'Xác định vị trí tương đối của đường thẳng và đường tròn; tính dây cung do đường thẳng cắt ra.',
    'Vận dụng tính chất tiếp tuyến và hai tiếp tuyến cắt nhau để tính độ dài, số đo góc.',
    'Xác định vị trí tương đối của hai đường tròn; tính bán kính, đoạn nối tâm và dây chung.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Đường thẳng $a$ và $(O; R)$, $d$ là khoảng cách từ $O$ đến $a$',
              '$d < R$: cắt nhau; $d = R$: tiếp xúc; $d > R$: không giao nhau',
            ],
            ['Dây do $a$ cắt ra', '$AB = 2\\sqrt{R^2 - d^2}$'],
            [
              'Tiếp tuyến tại $A$',
              'Vuông góc với bán kính $OA$; ngược lại, đường thẳng qua $A$ và vuông góc với $OA$ là tiếp tuyến',
            ],
            [
              'Hai tiếp tuyến $MA$, $MB$',
              '$MA = MB$; $MO$ là phân giác của $\\widehat{AMB}$, $OM$ là phân giác của $\\widehat{AOB}$; $\\widehat{AMB} + \\widehat{AOB} = 180^\\circ$',
            ],
            [
              "Hai đường tròn $(O; R)$, $(O'; r)$, $R > r$, $d = OO'$",
              'Cắt nhau: $R - r < d < R + r$; tiếp xúc ngoài: $d = R + r$; tiếp xúc trong: $d = R - r$; ở ngoài nhau: $d > R + r$; đựng nhau: $d < R - r$',
            ],
            [
              'Đường nối tâm',
              'Là đường trung trực của dây chung; đi qua tiếp điểm khi hai đường tròn tiếp xúc',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Một tam giác vuông quen thuộc',
          text: 'Hầu hết bài tính toán trong hai bài này quy về một tam giác vuông có một đỉnh là tâm: $OHA$ (bán kính, khoảng cách, nửa dây) hoặc $OAM$ (bán kính, tiếp tuyến, đoạn $OM$). Hãy tìm tam giác vuông đó trước khi tính.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Với hai đường tròn, chỉ so sánh $d$ với $R + r$ mà quên $R - r$. Với hai tiếp tuyến, nhầm $\\widehat{AMO}$ với cả góc $\\widehat{AMB}$. Với tiếp tuyến, quên rằng góc vuông nằm ở tiếp điểm, không phải ở tâm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Số thập phân dùng dấu phẩy ($2{,}5$); có thể gõ kèm đơn vị như cm hay °. Làm sai lần đầu, em được gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết dạng bài nào cần ôn thêm.',
  },
  examples: [
    {
      problem:
        'Từ điểm $M$ nằm ngoài đường tròn $(O; 6\\text{ cm})$, kẻ hai tiếp tuyến $MA$, $MB$ ($A$, $B$ là tiếp điểm) với $OM = 10$ cm. Tính $MA$ và chu vi tứ giác $OAMB$.',
      steps: [
        '$MA$ là tiếp tuyến tại $A$ nên $MA \\perp OA$: tam giác $OAM$ vuông tại $A$.',
        '$MA^2 = OM^2 - OA^2 = 100 - 36 = 64$, nên $MA = 8$ cm.',
        'Theo tính chất hai tiếp tuyến cắt nhau, $MB = MA = 8$ cm; lại có $OB = OA = 6$ cm.',
        'Chu vi tứ giác $OAMB$ là $6 + 8 + 8 + 6 = 28$ cm.',
      ],
      answer: '$MA = 8$ cm; chu vi tứ giác $OAMB$ là $28$ cm.',
    },
    {
      problem:
        "Cho đường tròn $(O; 5\\text{ cm})$. a) Đường thẳng $a$ cách $O$ một khoảng $4$ cm cắt đường tròn tại $A$, $B$; tính $AB$. b) Đường tròn $(O'; 2\\text{ cm})$ có $OO' = 6$ cm; xác định vị trí tương đối của $(O)$ và $(O')$.",
      steps: [
        'a) $d = 4 < 5 = R$ nên $a$ cắt đường tròn. Gọi $H$ là chân đường vuông góc từ $O$ đến $a$ thì $H$ là trung điểm của $AB$.',
        '$AH^2 = 5^2 - 4^2 = 9$, $AH = 3$ cm, nên $AB = 6$ cm.',
        'b) $R + r = 7$ cm, $R - r = 3$ cm và $3 < 6 < 7$, nên hai đường tròn cắt nhau.',
      ],
      answer: 'a) $AB = 6$ cm; b) hai đường tròn cắt nhau.',
    },
    {
      problem:
        "Hai đường tròn $(O; 10\\text{ cm})$ và $(O'; 17\\text{ cm})$ cắt nhau tại $A$ và $B$, $OO' = 21$ cm. Tính độ dài dây chung $AB$.",
      steps: [
        "Đường nối tâm $OO'$ là đường trung trực của $AB$; gọi $H$ là giao điểm của $OO'$ và $AB$. Đặt $OH = x$, $O'H = 21 - x$.",
        "Hai tam giác vuông $AHO$, $AHO'$ cho $AH^2 = 10^2 - x^2 = 17^2 - (21 - x)^2$.",
        '$100 - x^2 = 289 - 441 + 42x - x^2$, suy ra $42x = 252$, $x = 6$.',
        '$AH^2 = 100 - 36 = 64$, $AH = 8$ cm, nên $AB = 16$ cm.',
      ],
      answer: '$AB = 16$ cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Đường thẳng $a$ cách tâm $O$ của đường tròn $(O; 4\\text{ cm})$ một khoảng $4$ cm. Khẳng định nào đúng?',
      options: [
        '$a$ cắt đường tròn tại hai điểm',
        '$a$ là tiếp tuyến của đường tròn',
        '$a$ và đường tròn không giao nhau',
        '$a$ đi qua tâm $O$',
      ],
      answer: 1,
      hints: ['So sánh $d$ với $R$.'],
      solution: '$d = R = 4$ cm nên $a$ tiếp xúc với đường tròn: $a$ là tiếp tuyến.',
    },
    {
      type: 'number',
      prompt:
        'Đường thẳng $a$ cách tâm $O$ của đường tròn $(O; 10\\text{ cm})$ một khoảng $6$ cm và cắt đường tròn tại $A$, $B$. Tính $AB$.',
      answer: 16,
      unit: 'cm',
      hints: [
        'Gọi $H$ là chân đường vuông góc từ $O$ đến $a$; $H$ là trung điểm của $AB$.',
        '$AH^2 = OA^2 - OH^2$.',
      ],
      solution: '$AH^2 = 10^2 - 6^2 = 64$, $AH = 8$ cm, nên $AB = 2AH = 16$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Từ điểm $M$ nằm ngoài đường tròn $(O; 5\\text{ cm})$ với $OM = 13$ cm, kẻ tiếp tuyến $MA$ ($A$ là tiếp điểm). Tính $MA$.',
      answer: 12,
      unit: 'cm',
      hints: ['Tam giác $OAM$ vuông tại $A$.'],
      solution: '$MA^2 = OM^2 - OA^2 = 169 - 25 = 144$, nên $MA = 12$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Từ điểm $M$ nằm ngoài đường tròn $(O)$, kẻ hai tiếp tuyến $MA$, $MB$ với $\\widehat{AMB} = 50^\\circ$. Tính $\\widehat{AOB}$.',
      answer: 130,
      unit: '°',
      hints: ['Tứ giác $OAMB$ có hai góc vuông tại $A$ và $B$.'],
      solution: '$\\widehat{AOB} = 360^\\circ - 90^\\circ - 90^\\circ - 50^\\circ = 130^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Từ điểm $M$ nằm ngoài đường tròn $(O)$, kẻ hai tiếp tuyến $MA$, $MB$ với $\\widehat{AOB} = 100^\\circ$. Tính $\\widehat{AMO}$.',
      answer: 40,
      unit: '°',
      hints: [
        'Tính $\\widehat{AMB}$ trước: $\\widehat{AMB} + \\widehat{AOB} = 180^\\circ$.',
        '$MO$ là tia phân giác của $\\widehat{AMB}$.',
      ],
      solution:
        '$\\widehat{AMB} = 180^\\circ - 100^\\circ = 80^\\circ$, và $MO$ là tia phân giác nên $\\widehat{AMO} = 40^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Từ điểm $M$ kẻ hai tiếp tuyến $MA$, $MB$ của một đường tròn với $\\widehat{AMB} = 60^\\circ$ và $MA = 5$ cm. Tính chu vi tam giác $MAB$.',
      answer: 15,
      unit: 'cm',
      hints: ['$MA = MB$, vậy tam giác $MAB$ là tam giác gì khi có một góc $60^\\circ$?'],
      solution:
        '$MA = MB$ nên tam giác $MAB$ cân tại $M$, lại có $\\widehat{AMB} = 60^\\circ$ nên nó là tam giác đều. Chu vi bằng $3 \\cdot 5 = 15$ cm.',
    },
    {
      type: 'choice',
      prompt:
        "Cho hai đường tròn $(O; 6\\text{ cm})$ và $(O'; 4\\text{ cm})$ với $OO' = 9$ cm. Vị trí tương đối của hai đường tròn là",
      options: ['cắt nhau', 'tiếp xúc ngoài', 'ở ngoài nhau', 'tiếp xúc trong'],
      answer: 0,
      hints: ['Tính $R + r$ và $R - r$.'],
      solution: '$R - r = 2 < 9 < 10 = R + r$ nên hai đường tròn cắt nhau.',
    },
    {
      type: 'number',
      prompt:
        "Đường tròn $(O; 8\\text{ cm})$ tiếp xúc ngoài với đường tròn $(O'; r)$ và $OO' = 11$ cm. Tính $r$.",
      answer: 3,
      unit: 'cm',
      hints: ["Tiếp xúc ngoài: $OO' = R + r$."],
      solution: "$r = OO' - R = 11 - 8 = 3$ cm.",
    },
    {
      type: 'number',
      prompt:
        "Hai đường tròn $(O; 10\\text{ cm})$ và $(O'; 10\\text{ cm})$ cắt nhau tại $A$ và $B$, $OO' = 12$ cm. Tính dây chung $AB$.",
      answer: 16,
      unit: 'cm',
      hints: [
        "$OO'$ là đường trung trực của $AB$; vì hai bán kính bằng nhau nên $AB$ cũng đi qua trung điểm $H$ của $OO'$.",
        'Tính $AH$ trong tam giác vuông $AHO$ với $OH = 6$ cm.',
      ],
      solution: '$OH = 6$ cm, $AH^2 = 10^2 - 6^2 = 64$, $AH = 8$ cm, nên $AB = 16$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Ba đường tròn $(A; 2\\text{ cm})$, $(B; 3\\text{ cm})$, $(C; 4\\text{ cm})$ đôi một tiếp xúc ngoài. Tính chu vi tam giác $ABC$.',
      answer: 18,
      unit: 'cm',
      hints: ['Mỗi cạnh của tam giác bằng tổng hai bán kính.'],
      solution: '$AB = 5$, $BC = 7$, $CA = 6$ (cm); chu vi là $5 + 7 + 6 = 18$ cm.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các khẳng định đúng.',
      options: [
        'Tiếp tuyến của đường tròn vuông góc với bán kính đi qua tiếp điểm.',
        'Đường thẳng vuông góc với bán kính $OA$ tại trung điểm của $OA$ là tiếp tuyến.',
        "Hai đường tròn $(O; 5\\text{ cm})$ và $(O'; 2\\text{ cm})$ với $OO' = 3$ cm tiếp xúc trong.",
        'Đường thẳng cách tâm một khoảng lớn hơn bán kính thì không giao với đường tròn.',
      ],
      answers: [0, 2, 3],
      hints: ['Dấu hiệu nhận biết tiếp tuyến đòi hỏi đường thẳng đi qua điểm nào của bán kính?'],
      solution:
        "Khẳng định thứ hai sai: đường thẳng phải vuông góc với $OA$ tại chính điểm $A$ trên đường tròn; tại trung điểm của $OA$ thì $d = \\dfrac{R}{2} < R$, đường thẳng cắt đường tròn. Khẳng định thứ ba đúng vì $OO' = 5 - 2 = R - r$. Hai khẳng định còn lại đúng theo tính chất tiếp tuyến và so sánh $d$ với $R$.",
    },
  ],
  takeaways: [
    "Đường thẳng và đường tròn: so sánh $d$ với $R$. Hai đường tròn: so sánh $OO'$ với $R + r$ và $R - r$.",
    'Tiếp tuyến vuông góc với bán kính tại tiếp điểm; hai tiếp tuyến từ một điểm bằng nhau và đối xứng qua $MO$.',
    'Dây cung, tiếp tuyến, dây chung đều được tính qua một tam giác vuông có một đỉnh là tâm.',
  ],
};
