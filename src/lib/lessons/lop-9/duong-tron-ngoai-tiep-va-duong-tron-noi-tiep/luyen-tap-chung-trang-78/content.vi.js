/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: góc nội tiếp và cung bị chắn, góc nội tiếp chắn nửa đường tròn, đường tròn ngoại tiếp và đường tròn nội tiếp của tam giác, tam giác vuông và tam giác đều.',
  intro:
    'Hai bài vừa học gắn góc với đường tròn và đường tròn với tam giác: góc nội tiếp bằng nửa cung bị chắn, còn mỗi tam giác có một đường tròn đi qua ba đỉnh và một đường tròn tiếp xúc ba cạnh. Bài luyện tập này phối hợp các kết quả đó để tính góc, tính bán kính và nhận ra vị trí các tâm.',
  objectives: [
    'Tính số đo góc nội tiếp, góc ở tâm và cung bị chắn; vận dụng góc nội tiếp chắn nửa đường tròn.',
    'Xác định tâm và tính bán kính đường tròn ngoại tiếp tam giác vuông, tam giác đều.',
    'Xác định tâm và tính bán kính đường tròn nội tiếp tam giác; tính góc tạo bởi các đường phân giác.',
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
              'Góc nội tiếp',
              '$\\widehat{AMB} = \\dfrac{1}{2}\\,\\text{sđ}\\,\\overset{\\frown}{AB}$ (cung bị chắn)',
            ],
            [
              'Cùng chắn một cung',
              'Các góc nội tiếp bằng nhau; góc nội tiếp ($\\le 90^\\circ$) bằng nửa góc ở tâm',
            ],
            ['Chắn nửa đường tròn', 'Góc nội tiếp là góc vuông'],
            ['Tâm đường tròn ngoại tiếp', 'Giao điểm ba đường trung trực; cách đều ba đỉnh'],
            ['Tâm đường tròn nội tiếp', 'Giao điểm ba đường phân giác trong; cách đều ba cạnh'],
            [
              'Tam giác vuông',
              'Tâm ngoại tiếp là trung điểm cạnh huyền, $R = \\dfrac{\\text{cạnh huyền}}{2}$',
            ],
            [
              'Tam giác đều cạnh $a$',
              '$R = \\dfrac{a\\sqrt{3}}{3}$, $r = \\dfrac{a\\sqrt{3}}{6}$, $R = 2r$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Bán kính đường tròn nội tiếp qua diện tích',
          text: 'Nối tâm $I$ với ba đỉnh, tam giác được chia thành ba tam giác có cùng chiều cao $r$, nên $S = r \\cdot p$ với $p$ là nửa chu vi. Với tam giác vuông cạnh góc vuông $b$, $c$: $r = \\dfrac{bc}{b + c + a}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Lấy góc nội tiếp bằng góc ở tâm (phải lấy một nửa). Khi đỉnh của góc nằm trên cung nhỏ, quên rằng góc chắn cung lớn $360^\\circ - \\text{cung nhỏ}$. Nhầm tâm ngoại tiếp (cách đều ba đỉnh) với tâm nội tiếp (cách đều ba cạnh). Dùng $R = 2r$ cho tam giác không đều.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Số thập phân dùng dấu phẩy ($6{,}5$); có thể gõ kèm đơn vị như cm hay °. Làm sai lần đầu, em được gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết phần nào cần ôn thêm.',
  },
  examples: [
    {
      problem:
        'Tam giác $ABC$ nội tiếp đường tròn $(O; R)$ có $\\widehat{BAC} = 60^\\circ$ và $BC = 6$ cm. Tính $R$.',
      steps: [
        'Góc nội tiếp $\\widehat{BAC}$ và góc ở tâm $\\widehat{BOC}$ cùng chắn cung $BC$, nên $\\widehat{BOC} = 2 \\cdot 60^\\circ = 120^\\circ$.',
        'Gọi $H$ là trung điểm $BC$. Tam giác $OBC$ cân tại $O$ nên $OH \\perp BC$, $OH$ là phân giác: $\\widehat{BOH} = 60^\\circ$ và $BH = 3$ cm.',
        'Trong tam giác vuông $OHB$: $OB = \\dfrac{BH}{\\sin 60^\\circ} = \\dfrac{3}{\\frac{\\sqrt{3}}{2}} = 2\\sqrt{3}$ cm.',
      ],
      answer: '$R = 2\\sqrt{3} \\approx 3{,}46$ cm.',
    },
    {
      problem:
        'Tam giác đều $ABC$ nội tiếp đường tròn $(O; 4\\text{ cm})$. Tính độ dài cạnh tam giác và bán kính đường tròn nội tiếp tam giác.',
      steps: [
        'Từ $R = \\dfrac{a\\sqrt{3}}{3}$ suy ra $a = \\dfrac{3R}{\\sqrt{3}} = R\\sqrt{3} = 4\\sqrt{3}$ cm.',
        'Tâm đường tròn nội tiếp trùng với $O$ và $r = \\dfrac{R}{2} = 2$ cm.',
      ],
      answer: 'Cạnh $a = 4\\sqrt{3} \\approx 6{,}93$ cm; $r = 2$ cm.',
    },
    {
      problem:
        'Tam giác $ABC$ có $\\widehat{BAC} = 80^\\circ$, $I$ là tâm đường tròn nội tiếp. Tính $\\widehat{BIC}$.',
      steps: [
        '$I$ là giao điểm các đường phân giác nên $\\widehat{IBC} = \\dfrac{1}{2}\\widehat{ABC}$ và $\\widehat{ICB} = \\dfrac{1}{2}\\widehat{ACB}$.',
        '$\\widehat{ABC} + \\widehat{ACB} = 180^\\circ - 80^\\circ = 100^\\circ$, nên $\\widehat{IBC} + \\widehat{ICB} = 50^\\circ$.',
        'Trong tam giác $IBC$: $\\widehat{BIC} = 180^\\circ - 50^\\circ$.',
      ],
      answer: '$\\widehat{BIC} = 130^\\circ$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Góc nội tiếp $\\widehat{AMB}$ chắn cung $AB$ có số đo $124^\\circ$. Tính $\\widehat{AMB}$.',
      answer: 62,
      unit: '°',
      hints: ['Góc nội tiếp bằng nửa số đo cung bị chắn.'],
      solution: '$\\widehat{AMB} = 124^\\circ : 2 = 62^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác nhọn $ABC$ nội tiếp đường tròn $(O)$ có $\\widehat{BOC} = 140^\\circ$. Tính $\\widehat{BAC}$.',
      answer: 70,
      unit: '°',
      hints: ['$\\widehat{BAC}$ và $\\widehat{BOC}$ cùng chắn cung nhỏ $BC$.'],
      solution:
        'Góc nội tiếp bằng nửa góc ở tâm cùng chắn một cung: $\\widehat{BAC} = 140^\\circ : 2 = 70^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        '$AB$ là đường kính của đường tròn $(O)$, $C$ là một điểm trên đường tròn với $\\widehat{CAB} = 35^\\circ$. Tính $\\widehat{CBA}$.',
      answer: 55,
      unit: '°',
      hints: [
        '$\\widehat{ACB}$ chắn nửa đường tròn.',
        'Tổng ba góc của tam giác $ABC$ bằng $180^\\circ$.',
      ],
      solution:
        '$\\widehat{ACB} = 90^\\circ$ (góc nội tiếp chắn nửa đường tròn), nên $\\widehat{CBA} = 90^\\circ - 35^\\circ = 55^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Cung nhỏ $AB$ của đường tròn $(O)$ có số đo $80^\\circ$. Điểm $M$ nằm trên cung nhỏ $AB$. Tính $\\widehat{AMB}$.',
      answer: 140,
      unit: '°',
      hints: ['$M$ nằm trên cung nhỏ nên góc chắn cung lớn.'],
      solution:
        'Cung lớn $AB$ có số đo $360^\\circ - 80^\\circ = 280^\\circ$, nên $\\widehat{AMB} = 280^\\circ : 2 = 140^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $AB = 8$ cm, $AC = 15$ cm. Tính bán kính đường tròn ngoại tiếp tam giác.',
      answer: 8.5,
      unit: 'cm',
      hints: ['Tâm là trung điểm cạnh huyền $BC$.'],
      solution: '$BC = \\sqrt{64 + 225} = \\sqrt{289} = 17$ cm, nên $R = 17 : 2 = 8{,}5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tính bán kính đường tròn ngoại tiếp tam giác đều cạnh $9$ cm (làm tròn đến hàng phần trăm).',
      answer: 5.2,
      tolerance: 0.005,
      unit: 'cm',
      hints: ['$R = \\dfrac{a\\sqrt{3}}{3}$.'],
      solution: '$R = \\dfrac{9\\sqrt{3}}{3} = 3\\sqrt{3} \\approx 5{,}20$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác đều $ABC$ nội tiếp đường tròn $(O; 6\\text{ cm})$. Tính bán kính đường tròn nội tiếp tam giác $ABC$.',
      answer: 3,
      unit: 'cm',
      hints: ['Trong tam giác đều, $R = 2r$.'],
      solution: '$r = \\dfrac{R}{2} = \\dfrac{6}{2} = 3$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $\\widehat{BAC} = 70^\\circ$, $I$ là tâm đường tròn nội tiếp. Tính $\\widehat{BIC}$.',
      answer: 125,
      unit: '°',
      hints: [
        '$BI$, $CI$ là phân giác của góc $B$ và góc $C$.',
        'Tính $\\widehat{IBC} + \\widehat{ICB} = \\dfrac{1}{2}\\left(\\widehat{B} + \\widehat{C}\\right)$.',
      ],
      solution:
        '$\\widehat{B} + \\widehat{C} = 110^\\circ$, nên $\\widehat{IBC} + \\widehat{ICB} = 55^\\circ$ và $\\widehat{BIC} = 180^\\circ - 55^\\circ = 125^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $AB = 5$ cm, $AC = 12$ cm, $BC = 13$ cm. Tính bán kính đường tròn nội tiếp tam giác.',
      answer: 2,
      unit: 'cm',
      hints: ['$S = r \\cdot p$ với $p$ là nửa chu vi.'],
      solution:
        '$S = \\dfrac{1}{2} \\cdot 5 \\cdot 12 = 30$ cm², $p = (5 + 12 + 13) : 2 = 15$ cm, nên $r = 30 : 15 = 2$ cm.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các khẳng định đúng.',
      options: [
        'Góc nội tiếp chắn cung $100^\\circ$ có số đo $50^\\circ$.',
        'Với bất kì tam giác nào, tâm đường tròn ngoại tiếp cũng nằm bên trong tam giác.',
        'Tâm đường tròn nội tiếp của tam giác luôn nằm bên trong tam giác.',
        'Nếu tam giác $ABC$ nội tiếp đường tròn có đường kính $BC$ thì $\\widehat{BAC} = 90^\\circ$.',
      ],
      answers: [0, 2, 3],
      hints: [
        'Nghĩ đến tam giác tù: tâm đường tròn ngoại tiếp nằm ở đâu?',
        '$\\widehat{BAC}$ chắn nửa đường tròn khi $BC$ là đường kính.',
      ],
      solution:
        'Khẳng định 1, 3, 4 đúng. Khẳng định 2 sai: tâm đường tròn ngoại tiếp tam giác tù nằm bên ngoài tam giác, của tam giác vuông nằm trên cạnh huyền.',
    },
  ],
  takeaways: [
    'Góc nội tiếp bằng nửa cung bị chắn; góc nội tiếp chắn nửa đường tròn là góc vuông.',
    'Tâm đường tròn ngoại tiếp: giao ba đường trung trực; tâm đường tròn nội tiếp: giao ba đường phân giác trong.',
    'Tam giác vuông: $R$ bằng nửa cạnh huyền. Tam giác đều cạnh $a$: $R = \\dfrac{a\\sqrt{3}}{3} = 2r$.',
    'Bán kính đường tròn nội tiếp có thể tính từ $S = r \\cdot p$.',
  ],
};
