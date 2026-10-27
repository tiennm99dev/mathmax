/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đa giác đều là đa giác lồi có các cạnh bằng nhau và các góc bằng nhau; mỗi đa giác đều nội tiếp một đường tròn có tâm là tâm của đa giác, và các phép quay tâm O với góc là bội của 360°/n giữ nguyên đa giác đều n cạnh.',
  intro:
    'Tổ ong có các ô hình lục giác đều, viên gạch lát nền hình vuông, biển báo dừng xe hình bát giác đều. Vì sao những hình này trông "cân đối" đến vậy? Một lí do là: quay chúng quanh tâm một góc thích hợp, ta lại được đúng hình cũ.',
  objectives: [
    'Nhận biết đa giác lồi, đa giác đều; nhận biết tâm của đa giác đều.',
    'Tính góc ở tâm và số đo mỗi góc của đa giác đều.',
    'Nhận biết các phép quay giữ nguyên một đa giác đều.',
  ],
  sections: [
    {
      heading: 'Đa giác đều',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đa giác lồi',
          text: 'Đa giác lồi là đa giác luôn nằm về một phía của đường thẳng chứa bất kì cạnh nào của đa giác đó.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đa giác đều',
          text: 'Đa giác đều là đa giác lồi có các cạnh bằng nhau và các góc bằng nhau.',
        },
        {
          type: 'p',
          text: 'Tam giác đều, hình vuông, ngũ giác đều, lục giác đều, bát giác đều là các đa giác đều. Hình thoi có các cạnh bằng nhau nhưng các góc chưa chắc bằng nhau; hình chữ nhật có các góc bằng nhau nhưng các cạnh chưa chắc bằng nhau. Vì vậy cần cả hai điều kiện.',
        },
      ],
    },
    {
      heading: 'Tâm của đa giác đều',
      blocks: [
        {
          type: 'p',
          text: 'Chia đường tròn $(O)$ thành $n$ cung bằng nhau bởi các điểm $A_1, A_2, \\ldots, A_n$ rồi nối liên tiếp các điểm đó, ta được một đa giác đều $n$ cạnh. Ngược lại, người ta chứng minh được mọi đa giác đều đều có các đỉnh cùng nằm trên một đường tròn.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tâm của đa giác đều',
          text: 'Các đỉnh của một đa giác đều cùng nằm trên một đường tròn, gọi là đường tròn ngoại tiếp đa giác đều; ta nói đa giác đều nội tiếp đường tròn đó. Tâm $O$ của đường tròn này gọi là tâm của đa giác đều.',
        },
        {
          type: 'table',
          head: ['Đại lượng', 'Đa giác đều $n$ cạnh'],
          rows: [
            ['Góc ở tâm $\\widehat{A_1OA_2}$', '$\\dfrac{360^\\circ}{n}$'],
            ['Mỗi góc của đa giác', '$180^\\circ - \\dfrac{360^\\circ}{n}$'],
          ],
          caption: 'Hai số đo suy ra từ tam giác cân $OA_1A_2$',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Tam giác $OA_1A_2$ cân tại $O$, nên mỗi góc ở đáy bằng $\\dfrac{1}{2}\\left(180^\\circ - \\dfrac{360^\\circ}{n}\\right)$. Góc của đa giác tại $A_2$ gồm hai góc đáy như vậy (của hai tam giác $OA_1A_2$ và $OA_2A_3$), nên bằng $180^\\circ - \\dfrac{360^\\circ}{n}$.',
        },
      ],
    },
    {
      heading: 'Phép quay giữ nguyên đa giác đều',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phép quay',
          text: 'Phép quay thuận chiều $\\alpha^\\circ$ ($0^\\circ < \\alpha^\\circ < 360^\\circ$) tâm $O$ giữ nguyên điểm $O$, biến điểm $A$ khác $O$ thành điểm $B$ thuộc đường tròn $(O; OA)$ sao cho khi điểm $A$ chuyển động theo chiều quay của kim đồng hồ đến điểm $B$ thì nó tạo nên cung $AB$ có số đo $\\alpha^\\circ$. Phép quay ngược chiều $\\alpha^\\circ$ được định nghĩa tương tự, với chiều ngược chiều kim đồng hồ. Phép quay $0^\\circ$ hoặc $360^\\circ$ giữ nguyên mọi điểm.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Giữ nguyên hình',
          text: 'Phép quay giữ nguyên đa giác đều $H$ nếu nó biến mỗi điểm của $H$ thành một điểm của $H$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Các phép quay giữ nguyên đa giác đều $n$ cạnh',
          text: 'Với đa giác đều $A_1A_2\\ldots A_n$ tâm $O$, các phép quay tâm $O$ (thuận chiều hoặc ngược chiều) với góc $\\alpha^\\circ$ thuộc $$\\left\\{\\frac{360^\\circ}{n}, \\frac{2 \\cdot 360^\\circ}{n}, \\ldots, \\frac{(n-1) \\cdot 360^\\circ}{n}, 360^\\circ\\right\\}$$ giữ nguyên đa giác đều đó.',
        },
        {
          type: 'p',
          text: 'Chẳng hạn, với các đỉnh của hình vuông $ABCD$ được kí hiệu theo chiều kim đồng hồ, phép quay thuận chiều $90^\\circ$ tâm $O$ biến $A, B, C, D$ lần lượt thành $B, C, D, A$, nên giữ nguyên hình vuông.',
        },
      ],
    },
  ],
  explore: {
    title: 'Quay đa giác đều quanh tâm',
    instruction:
      'Chọn số cạnh $n$ rồi kéo thanh "Góc quay" (hoặc dùng phím mũi tên). Hình nét đứt là vị trí ban đầu. Tìm tất cả các góc quay làm hình mới trùng khít hình cũ; hình sẽ chuyển màu xanh khi trùng.',
  },
  examples: [
    {
      problem: 'Tính góc ở tâm và số đo mỗi góc của ngũ giác đều $ABCDE$ tâm $O$.',
      steps: [
        'Năm đỉnh chia đường tròn $(O)$ thành năm cung bằng nhau, nên $\\widehat{AOB} = 360^\\circ : 5 = 72^\\circ$.',
        'Tam giác $OAB$ cân tại $O$ nên $\\widehat{OAB} = \\widehat{OBA} = (180^\\circ - 72^\\circ) : 2 = 54^\\circ$.',
        'Tương tự $\\widehat{OBC} = 54^\\circ$, nên $\\widehat{ABC} = 54^\\circ + 54^\\circ = 108^\\circ$.',
      ],
      answer: 'Góc ở tâm bằng $72^\\circ$; mỗi góc của ngũ giác đều bằng $108^\\circ$.',
    },
    {
      problem:
        'Lục giác đều $ABCDEF$ nội tiếp đường tròn $(O; R)$. Chứng minh cạnh của lục giác bằng $R$.',
      steps: [
        'Góc ở tâm $\\widehat{AOB} = 360^\\circ : 6 = 60^\\circ$.',
        'Tam giác $OAB$ cân tại $O$ ($OA = OB = R$) và có một góc $60^\\circ$, nên là tam giác đều.',
        'Suy ra $AB = OA = R$; các cạnh khác cũng vậy.',
      ],
      answer: 'Cạnh của lục giác đều nội tiếp đường tròn bằng bán kính $R$.',
    },
    {
      problem:
        'Cho tam giác đều $ABC$ tâm $O$, các đỉnh kí hiệu theo chiều kim đồng hồ. Liệt kê các phép quay thuận chiều tâm $O$ giữ nguyên tam giác. Phép quay thuận chiều $240^\\circ$ biến $A$ thành điểm nào?',
      steps: [
        'Góc ở tâm $\\widehat{AOB} = 360^\\circ : 3 = 120^\\circ$.',
        'Các góc quay giữ nguyên tam giác đều là $120^\\circ$, $240^\\circ$ và $360^\\circ$.',
        'Quay thuận chiều $120^\\circ$ đưa $A$ đến $B$; quay thêm $120^\\circ$ nữa đưa $B$ đến $C$.',
      ],
      answer:
        'Ba phép quay thuận chiều $120^\\circ$, $240^\\circ$, $360^\\circ$ giữ nguyên tam giác; phép quay $240^\\circ$ biến $A$ thành $C$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính góc ở tâm $\\widehat{A_1OA_2}$ của đa giác đều $9$ cạnh tâm $O$.',
      answer: 40,
      unit: '°',
      hints: ['Chín đỉnh chia đường tròn thành chín cung bằng nhau.'],
      solution: '$\\widehat{A_1OA_2} = 360^\\circ : 9 = 40^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Tính số đo mỗi góc của bát giác đều (đa giác đều $8$ cạnh).',
      answer: 135,
      unit: '°',
      hints: [
        'Góc ở tâm bằng $360^\\circ : 8$.',
        'Mỗi góc của đa giác đều bằng $180^\\circ$ trừ góc ở tâm.',
      ],
      solution:
        'Góc ở tâm $45^\\circ$, nên mỗi góc của bát giác đều bằng $180^\\circ - 45^\\circ = 135^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Có bao nhiêu phép quay thuận chiều $\\alpha^\\circ$ tâm $O$ với $0^\\circ < \\alpha^\\circ \\le 360^\\circ$ giữ nguyên lục giác đều tâm $O$?',
      answer: 6,
      hints: ['Góc quay phải là bội của $360^\\circ : 6 = 60^\\circ$.'],
      solution:
        'Các góc là $60^\\circ, 120^\\circ, 180^\\circ, 240^\\circ, 300^\\circ, 360^\\circ$: có $6$ phép quay.',
    },
    {
      type: 'number',
      prompt:
        'Tìm góc quay $\\alpha^\\circ$ nhỏ nhất ($\\alpha^\\circ > 0^\\circ$) sao cho phép quay thuận chiều $\\alpha^\\circ$ tâm $O$ giữ nguyên ngũ giác đều tâm $O$.',
      answer: 72,
      unit: '°',
      hints: ['Phép quay phải đưa mỗi đỉnh đến đỉnh kề nó.'],
      solution: '$\\alpha^\\circ = 360^\\circ : 5 = 72^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Phép quay thuận chiều $120^\\circ$ tâm $O$ giữ nguyên hình nào dưới đây (tâm của hình là $O$)?',
      options: ['Hình vuông', 'Tam giác đều', 'Ngũ giác đều', 'Bát giác đều'],
      answer: 1,
      hints: ['$120^\\circ$ phải là bội của góc ở tâm $360^\\circ : n$.'],
      solution:
        'Góc ở tâm lần lượt là $90^\\circ$, $120^\\circ$, $72^\\circ$, $45^\\circ$; chỉ $120^\\circ$ là bội của $120^\\circ$. Vậy phép quay giữ nguyên tam giác đều.',
    },
    {
      type: 'multi',
      prompt: 'Hình nào dưới đây là đa giác đều?',
      options: [
        'Hình thoi có một góc bằng $60^\\circ$',
        'Tam giác đều',
        'Hình chữ nhật có chiều dài gấp đôi chiều rộng',
        'Hình vuông',
      ],
      answers: [1, 3],
      hints: ['Đa giác đều cần cả các cạnh bằng nhau lẫn các góc bằng nhau.'],
      solution:
        'Tam giác đều và hình vuông là đa giác đều. Hình thoi có góc $60^\\circ$ và $120^\\circ$ nên các góc không bằng nhau; hình chữ nhật đó có các cạnh không bằng nhau.',
    },
    {
      type: 'number',
      prompt:
        'Một lục giác đều nội tiếp đường tròn bán kính $5$ cm. Tính chu vi của lục giác đều đó.',
      answer: 30,
      unit: 'cm',
      hints: ['Cạnh của lục giác đều nội tiếp đường tròn bằng bán kính.'],
      solution: 'Mỗi cạnh dài $5$ cm, nên chu vi bằng $6 \\cdot 5 = 30$ cm.',
    },
    {
      type: 'text',
      prompt:
        'Lục giác đều $ABCDEF$ tâm $O$ có các đỉnh kí hiệu theo chiều kim đồng hồ. Phép quay thuận chiều $120^\\circ$ tâm $O$ biến điểm $A$ thành điểm nào? (Ghi tên điểm.)',
      accept: ['C', 'điểm C', 'diem C'],
      hints: [
        'Góc ở tâm của lục giác đều là $60^\\circ$.',
        '$120^\\circ$ gồm hai lần $60^\\circ$: $A$ đi qua bao nhiêu đỉnh?',
      ],
      solution:
        '$120^\\circ = 2 \\cdot 60^\\circ$, nên $A$ dịch chuyển hai đỉnh theo chiều kim đồng hồ: $A \\to B \\to C$. Ảnh của $A$ là $C$.',
    },
  ],
  takeaways: [
    'Đa giác đều là đa giác lồi có các cạnh bằng nhau và các góc bằng nhau.',
    'Mọi đa giác đều nội tiếp một đường tròn; tâm đường tròn đó là tâm của đa giác đều.',
    'Đa giác đều $n$ cạnh: góc ở tâm $\\dfrac{360^\\circ}{n}$, mỗi góc $180^\\circ - \\dfrac{360^\\circ}{n}$.',
    'Các phép quay tâm $O$ với góc là bội của $\\dfrac{360^\\circ}{n}$ (đến $360^\\circ$) giữ nguyên đa giác đều $n$ cạnh tâm $O$.',
  ],
};
