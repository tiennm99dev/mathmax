/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hình cầu: tạo ra khi quay nửa hình tròn quanh đường kính; tâm, bán kính, mặt cầu; mặt cắt của hình cầu là hình tròn, qua tâm là hình tròn lớn; diện tích mặt cầu S = 4πR² và thể tích hình cầu V = 4/3πR³.',
  intro:
    'Quả bóng đá, viên bi, quả địa cầu hay bồn chứa khí hình tròn ở nhà máy đều có dạng hình cầu. Cần bao nhiêu da để may một quả bóng, một bồn cầu chứa được bao nhiêu mét khối khí? Trong bài này, em sẽ thả một hình cầu vào hình trụ "vừa khít" với nó, xem nước tràn ra bao nhiêu, và từ đó tìm ra công thức thể tích hình cầu.',
  objectives: [
    'Nhận biết mặt cầu, hình cầu, tâm và bán kính; biết mặt cắt của hình cầu bởi một mặt phẳng là hình tròn.',
    'Tính diện tích mặt cầu $S = 4\\pi R^2$.',
    'Tính thể tích hình cầu $V = \\dfrac{4}{3}\\pi R^3$.',
    'Giải quyết bài toán thực tế gắn với đồ vật có dạng hình cầu.',
  ],
  sections: [
    {
      heading: 'Mặt cầu và hình cầu',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình cầu',
          text: 'Khi quay nửa hình tròn tâm $O$, bán kính $R$ một vòng quanh đường kính $AB$ cố định, ta được một hình cầu. Nửa đường tròn khi quay tạo nên mặt cầu. Điểm $O$ là tâm, $R$ là bán kính của hình cầu (hay mặt cầu).',
        },
        {
          type: 'list',
          items: [
            'Mọi điểm của mặt cầu cách tâm $O$ một khoảng bằng $R$.',
            'Đoạn thẳng nối hai điểm của mặt cầu và đi qua tâm là một đường kính, dài $2R$.',
            'Mặt cầu là "vỏ" bên ngoài; hình cầu gồm mặt cầu và toàn bộ phần bên trong.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Mặt cắt của hình cầu',
          text: 'Khi cắt hình cầu bởi một mặt phẳng, mặt cắt là một hình tròn. Nếu mặt phẳng cách tâm $O$ một khoảng $d < R$ thì hình tròn cắt có bán kính $$r = \\sqrt{R^2 - d^2}.$$ Khi mặt phẳng đi qua tâm ($d = 0$), mặt cắt là hình tròn lớn, có bán kính bằng $R$; đường tròn biên của nó gọi là đường tròn lớn.',
        },
        {
          type: 'p',
          text: 'Vì sao $r = \\sqrt{R^2 - d^2}$? Gọi $I$ là tâm hình tròn cắt, $M$ là một điểm trên biên của nó. Khi đó $OI = d$ vuông góc với mặt cắt, $OM = R$, nên tam giác $OIM$ vuông tại $I$ và $IM^2 = OM^2 - OI^2$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Trên quả địa cầu, đường xích đạo là một đường tròn lớn; các vĩ tuyến khác là những đường tròn nhỏ hơn, càng gần cực càng nhỏ.',
        },
      ],
    },
    {
      heading: 'Diện tích mặt cầu và thể tích hình cầu',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Diện tích mặt cầu',
          text: 'Mặt cầu bán kính $R$ có diện tích $$S = 4\\pi R^2,$$ tức là gấp $4$ lần diện tích hình tròn lớn. Nếu biết đường kính $d = 2R$ thì $S = \\pi d^2$.',
        },
        {
          type: 'p',
          text: 'Đặt hình cầu bán kính $R$ vừa khít trong một hình trụ: bán kính đáy hình trụ bằng $R$, chiều cao bằng $2R$. Đổ đầy nước vào hình trụ rồi nhấn chìm hình cầu cho chạm đáy. Lượng nước tràn ra, bằng thể tích hình cầu, chiếm bao nhiêu phần thể tích hình trụ? Hãy đoán trước, rồi thả quả cầu để kiểm tra.',
        },
        { type: 'widget', name: 'tru-ngoai-tiep' },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Thể tích hình cầu',
          text: 'Nước tràn ra chiếm $\\dfrac{2}{3}$ thể tích hình trụ ngoại tiếp, nên hình cầu bán kính $R$ có thể tích $$V = \\frac{2}{3} \\cdot \\pi R^2 \\cdot 2R = \\frac{4}{3}\\pi R^3.$$',
        },
        {
          type: 'table',
          caption:
            'Hình cầu bán kính $R$ và hình trụ ngoại tiếp nó (bán kính đáy $R$, chiều cao $2R$)',
          head: ['Đại lượng', 'Hình cầu', 'Hình trụ ngoại tiếp'],
          rows: [
            ['Diện tích', '$S = 4\\pi R^2$', '$S_{xq} = 2\\pi R \\cdot 2R = 4\\pi R^2$'],
            ['Thể tích', '$V = \\dfrac{4}{3}\\pi R^3$', '$V = \\pi R^2 \\cdot 2R = 2\\pi R^3$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Thay đường kính vào chỗ bán kính: quả bóng đường kính $22$ cm có $R = 11$ cm. Nhầm hai công thức: diện tích dùng $R^2$ (đơn vị cm²), thể tích dùng $R^3$ (đơn vị cm³). Khi bán kính tăng gấp $k$ lần thì diện tích tăng $k^2$ lần, thể tích tăng $k^3$ lần.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cắt hình cầu bằng một mặt phẳng',
    instruction:
      'Kéo nút tròn (hoặc dùng phím mũi tên lên, xuống) để đưa mặt phẳng cắt lên xuống. Quan sát tam giác vuông $OIM$ và bán kính $r$ của hình tròn cắt. Khi nào mặt cắt lớn nhất? Khi nào nó chỉ còn là một điểm?',
  },
  examples: [
    {
      problem:
        'Một hình cầu có bán kính $R = 5$ cm. Tính diện tích mặt cầu và thể tích hình cầu (làm tròn đến hàng phần mười).',
      steps: [
        '$S = 4\\pi R^2 = 4\\pi \\cdot 25 = 100\\pi \\approx 314{,}2$ (cm²).',
        '$V = \\dfrac{4}{3}\\pi R^3 = \\dfrac{4}{3}\\pi \\cdot 125 = \\dfrac{500}{3}\\pi \\approx 523{,}6$ (cm³).',
      ],
      answer: '$S \\approx 314{,}2$ cm², $V \\approx 523{,}6$ cm³.',
    },
    {
      problem:
        'Cắt hình cầu bán kính $10$ cm bởi một mặt phẳng cách tâm $6$ cm. Tính bán kính và diện tích của hình tròn cắt (làm tròn đến hàng phần mười).',
      steps: [
        'Gọi $I$ là tâm hình tròn cắt, $M$ là một điểm trên biên. Tam giác $OIM$ vuông tại $I$ với $OM = 10$ cm, $OI = 6$ cm.',
        '$r^2 = IM^2 = 10^2 - 6^2 = 64$, nên $r = 8$ cm.',
        'Diện tích hình tròn cắt: $\\pi r^2 = 64\\pi \\approx 201{,}1$ (cm²).',
      ],
      answer: '$r = 8$ cm, diện tích khoảng $201{,}1$ cm².',
    },
    {
      problem:
        'Một quả bóng đá có đường kính $22$ cm. Tính diện tích da phủ mặt ngoài quả bóng và thể tích không khí bên trong (bỏ qua độ dày vỏ, làm tròn đến hàng phần mười).',
      steps: [
        'Bán kính: $R = 22 : 2 = 11$ (cm).',
        '$S = 4\\pi \\cdot 11^2 = 484\\pi \\approx 1\\,520{,}5$ (cm²).',
        '$V = \\dfrac{4}{3}\\pi \\cdot 11^3 = \\dfrac{5\\,324}{3}\\pi \\approx 5\\,575{,}3$ (cm³).',
      ],
      answer: '$S \\approx 1\\,520{,}5$ cm², $V \\approx 5\\,575{,}3$ cm³.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Quay nửa hình tròn tâm $O$ một vòng quanh đường kính $AB$ cố định, ta được hình gì?',
      options: ['Hình trụ', 'Hình nón', 'Hình cầu', 'Hình tròn'],
      answer: 2,
      hints: ['Mọi điểm của nửa đường tròn luôn cách $O$ một khoảng $R$ khi quay.'],
      solution:
        'Quay nửa hình tròn quanh đường kính được hình cầu; nửa đường tròn quét nên mặt cầu tâm $O$, bán kính $R$.',
    },
    {
      type: 'choice',
      prompt: 'Cắt hình cầu tâm $O$ bán kính $R$ bởi một mặt phẳng đi qua $O$. Mặt cắt là gì?',
      options: [
        'Hình tròn bán kính $\\dfrac{R}{2}$',
        'Hình tròn bán kính $R$ (hình tròn lớn)',
        'Một đường tròn bán kính $2R$',
        'Một điểm',
      ],
      answer: 1,
      hints: ['Dùng $r = \\sqrt{R^2 - d^2}$ với $d = 0$.'],
      solution:
        'Mặt phẳng qua tâm có $d = 0$, nên $r = \\sqrt{R^2} = R$: mặt cắt là hình tròn lớn tâm $O$, bán kính $R$.',
    },
    {
      type: 'number',
      prompt: 'Tính diện tích mặt cầu có bán kính $4$ cm (làm tròn đến hàng phần mười).',
      answer: 201.1,
      tolerance: 0.05,
      unit: 'cm²',
      hints: ['$S = 4\\pi R^2$.'],
      solution: '$S = 4\\pi \\cdot 4^2 = 64\\pi \\approx 201{,}1$ (cm²).',
    },
    {
      type: 'number',
      prompt: 'Tính thể tích hình cầu có bán kính $6$ cm (làm tròn đến hàng phần mười).',
      answer: 904.8,
      tolerance: 0.05,
      unit: 'cm³',
      hints: ['$V = \\dfrac{4}{3}\\pi R^3$, với $6^3 = 216$.'],
      solution: '$V = \\dfrac{4}{3}\\pi \\cdot 216 = 288\\pi \\approx 904{,}8$ (cm³).',
    },
    {
      type: 'number',
      prompt:
        'Cắt hình cầu bán kính $13$ cm bởi một mặt phẳng cách tâm $5$ cm. Bán kính hình tròn cắt là bao nhiêu xăng-ti-mét?',
      answer: 12,
      unit: 'cm',
      hints: ['Tam giác $OIM$ vuông tại $I$ có cạnh huyền $OM = R$.'],
      solution: '$r^2 = 13^2 - 5^2 = 169 - 25 = 144$, nên $r = 12$ cm.',
    },
    {
      type: 'number',
      prompt: 'Một mặt cầu có diện tích $36\\pi$ cm². Bán kính của nó là bao nhiêu xăng-ti-mét?',
      answer: 3,
      unit: 'cm',
      hints: ['Giải $4\\pi R^2 = 36\\pi$.'],
      solution: '$4\\pi R^2 = 36\\pi \\Rightarrow R^2 = 9 \\Rightarrow R = 3$ (cm).',
    },
    {
      type: 'fraction',
      prompt:
        'Hình cầu bán kính $R$ nằm vừa khít trong hình trụ có bán kính đáy $R$, chiều cao $2R$. Thể tích hình cầu bằng bao nhiêu phần thể tích hình trụ? (Nhập phân số tối giản.)',
      answer: [2, 3],
      simplest: true,
      hints: ['$V_{\\text{trụ}} = \\pi R^2 \\cdot 2R = 2\\pi R^3$.'],
      solution:
        '$V_{\\text{cầu}} : V_{\\text{trụ}} = \\dfrac{4}{3}\\pi R^3 : 2\\pi R^3 = \\dfrac{2}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Nếu bán kính của một hình cầu tăng gấp $2$ lần thì thể tích của nó tăng gấp bao nhiêu lần?',
      answer: 8,
      hints: ['Thể tích tỉ lệ với $R^3$.'],
      solution:
        '$\\dfrac{4}{3}\\pi (2R)^3 = 8 \\cdot \\dfrac{4}{3}\\pi R^3$: thể tích tăng gấp $2^3 = 8$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Một quả bóng bàn có đường kính $4$ cm. Tính diện tích mặt ngoài của quả bóng (làm tròn đến hàng phần mười).',
      answer: 50.3,
      tolerance: 0.05,
      unit: 'cm²',
      hints: ['Bán kính bằng nửa đường kính.', 'Hoặc dùng $S = \\pi d^2$.'],
      solution: '$R = 2$ cm. $S = 4\\pi \\cdot 2^2 = 16\\pi \\approx 50{,}3$ (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Một viên bi sắt hình cầu có đường kính $10$ cm. Tính thể tích của viên bi (làm tròn đến hàng phần mười).',
      answer: 523.6,
      tolerance: 0.05,
      unit: 'cm³',
      hints: ['$R = 5$ cm; $V = \\dfrac{4}{3}\\pi R^3$.'],
      solution: '$V = \\dfrac{4}{3}\\pi \\cdot 5^3 = \\dfrac{500}{3}\\pi \\approx 523{,}6$ (cm³).',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng về hình cầu tâm $O$, bán kính $R$.',
      options: [
        'Mọi mặt phẳng cắt hình cầu đều cho mặt cắt là một hình tròn.',
        'Mặt phẳng càng xa tâm thì hình tròn cắt càng lớn.',
        'Diện tích mặt cầu gấp $4$ lần diện tích hình tròn lớn.',
        'Mọi đường kính của hình cầu đều dài $2R$.',
      ],
      answers: [0, 2, 3],
      hints: ['Xem lại công thức $r = \\sqrt{R^2 - d^2}$: khi $d$ tăng thì $r$ thay đổi thế nào?'],
      solution:
        'Đúng: mặt cắt là hình tròn; $S = 4\\pi R^2 = 4 \\cdot \\pi R^2$; đường kính dài $2R$. Sai: $r = \\sqrt{R^2 - d^2}$ giảm khi $d$ tăng, nên mặt phẳng càng xa tâm thì hình tròn cắt càng nhỏ.',
    },
  ],
  takeaways: [
    'Quay nửa hình tròn quanh đường kính được hình cầu; nửa đường tròn quét nên mặt cầu.',
    'Mặt cắt của hình cầu bởi mặt phẳng cách tâm $d < R$ là hình tròn bán kính $r = \\sqrt{R^2 - d^2}$; qua tâm là hình tròn lớn bán kính $R$.',
    'Diện tích mặt cầu $S = 4\\pi R^2$; thể tích hình cầu $V = \\dfrac{4}{3}\\pi R^3$.',
    'Hình cầu chiếm $\\dfrac{2}{3}$ thể tích hình trụ ngoại tiếp nó.',
  ],
};
