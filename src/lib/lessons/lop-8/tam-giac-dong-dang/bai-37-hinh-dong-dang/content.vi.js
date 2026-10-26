/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hình đồng dạng phối cảnh với tâm và tỉ số đồng dạng, cách vẽ, khái niệm hai hình đồng dạng và các hình đồng dạng trong thực tế như ảnh phóng to, bản đồ, mô hình.',
  intro:
    'Đặt một chiếc đèn pin trước một tấm bìa cắt hình ngôi sao, bóng in trên tường là một ngôi sao lớn hơn nhưng cùng hình dạng. Các tia sáng xuất phát từ một điểm đi qua từng điểm của tấm bìa. Đó chính là ý tưởng của hình đồng dạng phối cảnh: phóng to hay thu nhỏ một hình từ một tâm.',
  objectives: [
    'Nhận biết hai hình đồng dạng phối cảnh, xác định tâm phối cảnh và tỉ số đồng dạng.',
    'Vẽ hình đồng dạng phối cảnh của một đoạn thẳng, một tam giác khi biết tâm và tỉ số.',
    'Nhận biết hai hình đồng dạng và các hình đồng dạng trong thực tế.',
  ],
  sections: [
    {
      heading: 'Hình đồng dạng phối cảnh',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình đồng dạng phối cảnh',
          text: "Cho điểm $O$ và số $k > 0$. Hai hình $H$ và $H'$ gọi là đồng dạng phối cảnh (hay vị tự) nếu với mỗi điểm $M$ thuộc $H$ có điểm $M'$ thuộc $H'$ nằm trên tia $OM$ sao cho $OM' = k \\cdot OM$, và ngược lại. Điểm $O$ gọi là tâm phối cảnh, $k$ là tỉ số đồng dạng.",
        },
        {
          type: 'p',
          text: "Nói gọn, các cặp hình phóng to – thu nhỏ của nhau từ cùng một tâm $O$ là các hình đồng dạng phối cảnh. Các đường thẳng nối từng cặp điểm tương ứng $AA'$, $BB'$, $CC'$, ... đều đi qua tâm $O$.",
        },
        {
          type: 'list',
          items: [
            "Nếu $k > 1$, hình $H'$ là hình phóng to của $H$.",
            "Nếu $k < 1$, hình $H'$ là hình thu nhỏ của $H$.",
            "Nếu $k = 1$, hình $H'$ trùng với $H$.",
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách vẽ',
          text: "Muốn vẽ hình đồng dạng phối cảnh của $\\triangle ABC$ với tâm $O$, tỉ số $k$: trên các tia $OA$, $OB$, $OC$ lấy $A'$, $B'$, $C'$ sao cho $OA' = k \\cdot OA$, $OB' = k \\cdot OB$, $OC' = k \\cdot OC$ rồi nối lại.",
        },
        {
          type: 'p',
          text: "Vì $\\dfrac{OA'}{OA} = \\dfrac{OB'}{OB} = k$, theo định lí Thalès đảo thì $A'B' \\parallel AB$ (hoặc hai đoạn cùng nằm trên một đường thẳng qua $O$) và $A'B' = k \\cdot AB$. Vậy mọi đoạn thẳng được nhân với $k$, các góc giữ nguyên, nên $\\triangle A'B'C' \\backsim \\triangle ABC$ với tỉ số $k$.",
        },
      ],
    },
    {
      heading: 'Hình đồng dạng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai hình đồng dạng',
          text: "Hình $H'$ gọi là đồng dạng với hình $H$ nếu $H'$ bằng $H$ hoặc bằng một hình đồng dạng phối cảnh của $H$.",
        },
        {
          type: 'p',
          text: 'Như vậy hai hình đồng dạng có thể nằm ở vị trí bất kì, bị xoay hay lật: chỉ cần dời một hình đến chỗ khác thì nó trở thành hình phóng to hoặc thu nhỏ của hình kia.',
        },
        {
          type: 'list',
          items: [
            'Hai tam giác đồng dạng là hai hình đồng dạng.',
            'Hai hình vuông bất kì, hai hình tròn bất kì, hai tam giác đều bất kì luôn đồng dạng.',
            'Hai hình chữ nhật đồng dạng khi tỉ số hai cạnh kề của chúng bằng nhau; hình vuông và một hình chữ nhật không vuông thì không đồng dạng.',
          ],
        },
      ],
    },
    {
      heading: 'Hình đồng dạng trong thực tế',
      blocks: [
        {
          type: 'list',
          items: [
            'Ảnh phóng to, thu nhỏ của cùng một bức ảnh; hình chiếu trên màn ảnh của máy chiếu.',
            'Bản đồ và mô hình: bản đồ tỉ lệ $1 : 100\\,000$ là hình thu nhỏ với tỉ số $\\dfrac{1}{100\\,000}$ của vùng đất thật.',
            'Bộ búp bê lồng nhau, các cỡ của cùng một biểu tượng (logo), các mặt đồng hồ cùng kiểu nhưng khác cỡ.',
            'Trong tự nhiên: lá dương xỉ, bông tuyết có những phần nhỏ đồng dạng với cả hình (hình học fractal).',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Với hai hình đồng dạng tỉ số $k$, mọi độ dài tương ứng (cạnh, chu vi, đường chéo, khoảng cách) đều tỉ lệ $k$. Nhờ vậy ta đo trên bản đồ hay mô hình rồi nhân lên để biết kích thước thật.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vẽ và tìm tâm hình đồng dạng phối cảnh',
    instruction:
      'Ở "Vẽ hình phối cảnh": kéo tâm O (đỏ), kéo các đỉnh của hình H (xanh) và chỉnh tỉ số k để xem hình H′ (cam) thay đổi; các tỉ số OA′ : OA, A′B′ : AB luôn bằng k. Ở "Tìm tâm phối cảnh": kéo O tới chỗ ba tỉ số bằng nhau, có thể bật các đường nối AA′, BB′, CC′ để kiểm tra.',
  },
  examples: [
    {
      problem:
        "$\\triangle A'B'C'$ đồng dạng phối cảnh với $\\triangle ABC$, tâm $O$, tỉ số $k = 2$. Biết $AB = 3$ cm, $BC = 4$ cm, $CA = 5$ cm và $OA = 2{,}5$ cm. Tính $OA'$ và chu vi $\\triangle A'B'C'$.",
      steps: [
        "$A'$ nằm trên tia $OA$ và $OA' = 2 \\cdot OA = 2 \\cdot 2{,}5 = 5$ cm.",
        "Mỗi cạnh được nhân với $2$: $A'B' = 6$ cm, $B'C' = 8$ cm, $C'A' = 10$ cm.",
        "Chu vi $\\triangle A'B'C'$ là $6 + 8 + 10 = 24$ cm (bằng $2$ lần chu vi $12$ cm của $\\triangle ABC$).",
      ],
      answer: "$OA' = 5$ cm, chu vi $\\triangle A'B'C'$ là $24$ cm.",
    },
    {
      problem:
        "Tứ giác $A'B'C'D'$ đồng dạng phối cảnh với tứ giác $ABCD$, tỉ số $k = \\dfrac{1}{2}$. Biết $AB = 3$ cm, $BC = 1{,}5$ cm, $CD = 2$ cm, $AD = 4$ cm. Tính chu vi tứ giác $A'B'C'D'$.",
      steps: [
        "$A'B' = 1{,}5$ cm, $B'C' = 0{,}75$ cm, $C'D' = 1$ cm, $A'D' = 2$ cm.",
        'Chu vi: $1{,}5 + 0{,}75 + 1 + 2 = 5{,}25$ cm.',
      ],
      answer: "Chu vi tứ giác $A'B'C'D'$ là $5{,}25$ cm.",
    },
    {
      problem:
        'Mô hình một toà nhà làm theo tỉ lệ $1 : 300$ có chiều cao $15$ cm. Toà nhà thật cao bao nhiêu mét?',
      steps: [
        'Mô hình đồng dạng với toà nhà thật, tỉ số $\\dfrac{1}{300}$: mỗi độ dài thật gấp $300$ lần độ dài trên mô hình.',
        'Chiều cao thật: $15 \\cdot 300 = 4\\,500$ cm.',
        '$4\\,500$ cm $= 45$ m.',
      ],
      answer: 'Toà nhà cao $45$ m.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        "Hình $H'$ đồng dạng phối cảnh với hình $H$, tâm $O$, tỉ số $k = 3$. Điểm $A$ thuộc $H$ có $OA = 2$ cm. Điểm tương ứng $A'$ cách $O$ bao nhiêu xăng-ti-mét?",
      answer: 6,
      unit: 'cm',
      hints: ["$OA' = k \\cdot OA$."],
      solution: "$OA' = 3 \\cdot 2 = 6$ cm, và $A'$ nằm trên tia $OA$.",
    },
    {
      type: 'fraction',
      prompt:
        "Điểm $A'$ nằm trên tia $OA$ với $OA = 6$ cm, $OA' = 4$ cm, và $A'$ là điểm tương ứng của $A$ khi hai hình đồng dạng phối cảnh với tâm $O$. Tỉ số đồng dạng $k$ bằng bao nhiêu? (Viết dạng phân số.)",
      answer: [2, 3],
      hints: ["$k = \\dfrac{OA'}{OA}$."],
      solution: '$k = \\dfrac{4}{6} = \\dfrac{2}{3}$; vì $k < 1$ nên đây là hình thu nhỏ.',
    },
    {
      type: 'fraction',
      prompt:
        "$\\triangle ABC$ có trọng tâm $O$. Gọi $A'$, $B'$, $C'$ lần lượt là trung điểm của $OA$, $OB$, $OC$. $\\triangle A'B'C'$ đồng dạng phối cảnh với $\\triangle ABC$ với tâm $O$ và tỉ số bằng bao nhiêu?",
      answer: [1, 2],
      hints: ["$A'$ là trung điểm của $OA$ nên $OA' = \\dfrac{1}{2} OA$."],
      solution:
        "$A'$, $B'$, $C'$ nằm trên các tia $OA$, $OB$, $OC$ với $\\dfrac{OA'}{OA} = \\dfrac{OB'}{OB} = \\dfrac{OC'}{OC} = \\dfrac{1}{2}$, nên tỉ số đồng dạng là $\\dfrac{1}{2}$.",
    },
    {
      type: 'number',
      prompt:
        'Một tam giác có chu vi $18$ cm. Hình đồng dạng phối cảnh của nó với tỉ số $k = \\dfrac{1}{3}$ có chu vi bao nhiêu xăng-ti-mét?',
      answer: 6,
      unit: 'cm',
      hints: ['Mỗi cạnh được nhân với $k$, nên chu vi cũng vậy.'],
      solution: 'Chu vi mới là $\\dfrac{1}{3} \\cdot 18 = 6$ cm.',
    },
    {
      type: 'choice',
      prompt:
        "$\\triangle A'B'C'$ đồng dạng phối cảnh với $\\triangle ABC$, tâm $O$ không nằm trên đường thẳng $AB$, tỉ số $k$. Khẳng định nào đúng?",
      options: [
        "$A'B' \\parallel AB$ và $A'B' = k \\cdot AB$",
        "$A'B' \\perp AB$ và $A'B' = k \\cdot AB$",
        "$A'B' \\parallel AB$ và $A'B' = AB + k$",
        "$A'B' \\parallel AB$ và $A'B' = k^2 \\cdot AB$",
      ],
      answer: 0,
      hints: ["$\\dfrac{OA'}{OA} = \\dfrac{OB'}{OB} = k$: hãy nhớ định lí Thalès đảo."],
      solution:
        "Vì $\\dfrac{OA'}{OA} = \\dfrac{OB'}{OB}$ nên $A'B' \\parallel AB$ (Thalès đảo), và $\\triangle OA'B' \\backsim \\triangle OAB$ cho $A'B' = k \\cdot AB$.",
    },
    {
      type: 'multi',
      prompt: 'Những cặp hình nào dưới đây luôn đồng dạng, bất kể kích thước?',
      options: [
        'Hai hình vuông',
        'Hai hình tròn',
        'Hai tam giác đều',
        'Hai hình chữ nhật',
        'Hai tam giác cân',
      ],
      answers: [0, 1, 2],
      hints: [
        'Một hình được xác định hình dạng hoàn toàn bởi một độ dài thì mọi hình cùng loại đều đồng dạng.',
      ],
      solution:
        'Hình vuông, hình tròn, tam giác đều chỉ phụ thuộc vào một độ dài (cạnh hoặc bán kính), nên hai hình cùng loại luôn đồng dạng. Hai hình chữ nhật $1 \\times 2$ và $1 \\times 3$ không đồng dạng; hai tam giác cân có góc ở đỉnh khác nhau cũng không đồng dạng.',
    },
    {
      type: 'number',
      prompt:
        'Trên bản đồ tỉ lệ $1 : 200\\,000$, khoảng cách giữa hai thị trấn là $3{,}5$ cm. Khoảng cách thật là bao nhiêu ki-lô-mét?',
      answer: 7,
      unit: 'km',
      hints: ['Độ dài thật gấp $200\\,000$ lần độ dài trên bản đồ.', '$1$ km $= 100\\,000$ cm.'],
      solution: '$3{,}5 \\cdot 200\\,000 = 700\\,000$ cm $= 7$ km.',
    },
    {
      type: 'number',
      prompt:
        'Một mô hình máy bay theo tỉ lệ $1 : 72$ dài $30$ cm. Chiếc máy bay thật dài bao nhiêu mét?',
      answer: 21.6,
      unit: 'm',
      hints: ['Độ dài thật bằng $72$ lần độ dài mô hình.'],
      solution: '$30 \\cdot 72 = 2\\,160$ cm $= 21{,}6$ m.',
    },
  ],
  takeaways: [
    "Đồng dạng phối cảnh tâm $O$, tỉ số $k > 0$: $M'$ nằm trên tia $OM$ và $OM' = k \\cdot OM$.",
    'Đường nối hai điểm tương ứng luôn đi qua tâm phối cảnh; $k > 1$ là phóng to, $k < 1$ là thu nhỏ.',
    'Hai hình đồng dạng khi một hình bằng hình kia hoặc bằng một hình phóng to, thu nhỏ của hình kia.',
    'Hai hình đồng dạng tỉ số $k$ có mọi độ dài tương ứng tỉ lệ $k$: dùng để đọc bản đồ, mô hình, ảnh.',
  ],
};
