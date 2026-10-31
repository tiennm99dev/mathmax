/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: diện tích xung quanh, diện tích toàn phần và thể tích của hình trụ, hình nón; diện tích mặt cầu, thể tích hình cầu và mặt cắt của hình cầu; bài toán thực tế về các hình khối tròn xoay.',
  intro:
    'Hình trụ, hình nón và hình cầu đều sinh ra khi quay một hình phẳng quanh một trục: hình chữ nhật, tam giác vuông, nửa hình tròn. Bài luyện tập này phối hợp các công thức của Bài 31 và Bài 32 để tính diện tích, thể tích, tìm một kích thước khi biết thể tích hay diện tích, và giải các bài toán thực tế.',
  objectives: [
    'Tính diện tích xung quanh, diện tích toàn phần, thể tích của hình trụ và hình nón.',
    'Tính diện tích mặt cầu, thể tích hình cầu và bán kính mặt cắt của hình cầu.',
    'Tìm bán kính, chiều cao khi biết diện tích hoặc thể tích; giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          caption: 'Bán kính đáy (bán kính) $r$ hoặc $R$, chiều cao $h$, đường sinh $l$',
          head: ['Hình', 'Diện tích', 'Thể tích'],
          rows: [
            [
              'Hình trụ',
              '$S_{xq} = 2\\pi rh$; $S_{tp} = 2\\pi rh + 2\\pi r^2$',
              '$V = \\pi r^2 h$',
            ],
            [
              'Hình nón',
              '$S_{xq} = \\pi rl$; $S_{tp} = \\pi rl + \\pi r^2$; $l^2 = r^2 + h^2$',
              '$V = \\dfrac{1}{3}\\pi r^2 h$',
            ],
            ['Hình cầu', '$S = 4\\pi R^2$', '$V = \\dfrac{4}{3}\\pi R^3$'],
          ],
        },
        {
          type: 'list',
          items: [
            'Mặt cắt của hình cầu bởi mặt phẳng cách tâm $d < R$ là hình tròn bán kính $\\sqrt{R^2 - d^2}$.',
            'Hình nón có thể tích bằng $\\dfrac{1}{3}$ hình trụ cùng đáy, cùng chiều cao; hình cầu có thể tích bằng $\\dfrac{2}{3}$ hình trụ ngoại tiếp nó.',
            'Nhiều đồ vật ghép từ các hình: viên thuốc con nhộng (hình trụ và hai nửa hình cầu), cây kem (hình nón và nửa hình cầu), tháp nước (hình trụ và mái hình nón). Thể tích của chúng bằng tổng thể tích các phần.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Thay đường kính vào chỗ bán kính. Dùng chiều cao thay cho đường sinh khi tính $S_{xq}$ của hình nón. Quên hệ số $\\dfrac{1}{3}$ của hình nón hay $\\dfrac{4}{3}$ của hình cầu. Viết sai đơn vị: diện tích là cm², thể tích là cm³; $1$ dm³ $= 1$ lít, $1$ m³ $= 1\\,000$ lít.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Khi đề yêu cầu viết dưới dạng $k\\pi$, chỉ nhập số $k$ (số nguyên hoặc phân số như $32/3$). Số thập phân dùng dấu phẩy ($188{,}5$). Làm sai lần đầu, em được gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết phần nào cần ôn thêm.',
  },
  examples: [
    {
      problem:
        'Một hình nón có đường sinh $13$ cm và bán kính đáy $5$ cm. Tính chiều cao và thể tích của hình nón (làm tròn đến hàng phần mười).',
      steps: [
        '$h^2 = l^2 - r^2 = 169 - 25 = 144$, nên $h = 12$ cm.',
        '$V = \\dfrac{1}{3}\\pi \\cdot 5^2 \\cdot 12 = 100\\pi \\approx 314{,}2$ (cm³).',
      ],
      answer: '$h = 12$ cm, $V \\approx 314{,}2$ cm³.',
    },
    {
      problem:
        'Nấu chảy một quả cầu kim loại đặc bán kính $3$ cm rồi đúc thành một khối hình trụ có bán kính đáy $3$ cm. Tính chiều cao của khối trụ.',
      steps: [
        'Thể tích kim loại không đổi: $V = \\dfrac{4}{3}\\pi \\cdot 3^3 = 36\\pi$ (cm³).',
        'Khối trụ: $\\pi \\cdot 3^2 \\cdot h = 36\\pi$, nên $9h = 36$.',
        '$h = 4$ cm.',
      ],
      answer: 'Khối trụ cao $4$ cm.',
    },
    {
      problem:
        'Một tháp nước gồm thân hình trụ bán kính đáy $3$ m, cao $4$ m và mái hình nón cùng bán kính đáy, cao $2$ m. Tính thể tích của tháp (làm tròn đến hàng phần mười).',
      steps: [
        'Thân trụ: $\\pi \\cdot 3^2 \\cdot 4 = 36\\pi$ (m³).',
        'Mái nón: $\\dfrac{1}{3}\\pi \\cdot 3^2 \\cdot 2 = 6\\pi$ (m³).',
        'Tổng: $42\\pi \\approx 131{,}9$ (m³).',
      ],
      answer: 'Khoảng $131{,}9$ m³.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Tính diện tích toàn phần của hình trụ có bán kính đáy $5$ cm và chiều cao $8$ cm (làm tròn đến hàng phần mười).',
      answer: 408.4,
      tolerance: 0.05,
      unit: 'cm²',
      hints: ['$S_{tp} = 2\\pi rh + 2\\pi r^2$.'],
      solution:
        '$S_{tp} = 2\\pi \\cdot 5 \\cdot 8 + 2\\pi \\cdot 25 = 80\\pi + 50\\pi = 130\\pi \\approx 408{,}4$ (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Hình nón có bán kính đáy $8$ cm và chiều cao $6$ cm. Tính diện tích xung quanh (làm tròn đến hàng phần mười).',
      answer: 251.3,
      tolerance: 0.05,
      unit: 'cm²',
      hints: ['Tính đường sinh trước: $l^2 = r^2 + h^2$.', '$S_{xq} = \\pi rl$.'],
      solution:
        '$l^2 = 64 + 36 = 100$, $l = 10$ cm. $S_{xq} = \\pi \\cdot 8 \\cdot 10 = 80\\pi \\approx 251{,}3$ (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Một hình trụ có diện tích xung quanh $60\\pi$ cm² và chiều cao $6$ cm. Bán kính đáy của nó là bao nhiêu xăng-ti-mét?',
      answer: 5,
      unit: 'cm',
      hints: ['Giải $2\\pi r \\cdot 6 = 60\\pi$.'],
      solution: '$2\\pi r \\cdot 6 = 60\\pi \\Rightarrow 12r = 60 \\Rightarrow r = 5$ (cm).',
    },
    {
      type: 'number',
      prompt: 'Tính thể tích hình cầu có bán kính $3$ cm (làm tròn đến hàng phần mười).',
      answer: 113.1,
      tolerance: 0.05,
      unit: 'cm³',
      hints: ['$V = \\dfrac{4}{3}\\pi R^3$.'],
      solution: '$V = \\dfrac{4}{3}\\pi \\cdot 27 = 36\\pi \\approx 113{,}1$ (cm³).',
    },
    {
      type: 'number',
      prompt:
        'Cắt hình cầu bán kính $17$ cm bởi một mặt phẳng cách tâm $8$ cm. Tính bán kính hình tròn cắt.',
      answer: 15,
      unit: 'cm',
      hints: ['$r = \\sqrt{R^2 - d^2}$.'],
      solution: '$r^2 = 17^2 - 8^2 = 289 - 64 = 225$, nên $r = 15$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Một hình cầu bán kính $R$ và một hình trụ có bán kính đáy $R$, chiều cao $2R$. So sánh diện tích mặt cầu $S$ với diện tích xung quanh $S_{xq}$ của hình trụ.',
      options: ['$S < S_{xq}$', '$S = S_{xq}$', '$S > S_{xq}$', 'Không so sánh được'],
      answer: 1,
      hints: ['Tính $S_{xq} = 2\\pi R \\cdot 2R$.'],
      solution: '$S_{xq} = 2\\pi R \\cdot 2R = 4\\pi R^2 = S$: hai diện tích bằng nhau.',
    },
    {
      type: 'number',
      prompt:
        'Nấu chảy một quả cầu kim loại đặc bán kính $6$ cm rồi đúc thành một khối hình trụ có bán kính đáy $6$ cm. Chiều cao của khối trụ là bao nhiêu xăng-ti-mét?',
      answer: 8,
      unit: 'cm',
      hints: [
        'Thể tích kim loại không đổi.',
        'Giải $\\pi \\cdot 6^2 \\cdot h = \\dfrac{4}{3}\\pi \\cdot 6^3$.',
      ],
      solution:
        '$V_{\\text{cầu}} = \\dfrac{4}{3}\\pi \\cdot 216 = 288\\pi$. $36\\pi h = 288\\pi$, nên $h = 8$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một bể nước hình trụ có đường kính đáy $2$ m và chiều cao $1{,}5$ m. Bể chứa được bao nhiêu lít nước (làm tròn đến hàng đơn vị)?',
      answer: 4712,
      tolerance: 0.5,
      unit: 'lít',
      hints: ['$r = 1$ m; $V = \\pi r^2 h$ tính bằng m³.', '$1$ m³ $= 1\\,000$ lít.'],
      solution:
        '$V = \\pi \\cdot 1^2 \\cdot 1{,}5 = 1{,}5\\pi \\approx 4{,}712$ (m³) $\\approx 4\\,712$ lít.',
    },
    {
      type: 'number',
      prompt:
        'Một chiếc mũ sinh nhật bằng giấy có dạng mặt xung quanh của hình nón, bán kính đáy $5$ cm và đường sinh $15$ cm. Tính diện tích giấy làm mũ (bỏ qua mép dán, làm tròn đến hàng phần mười).',
      answer: 235.6,
      tolerance: 0.05,
      unit: 'cm²',
      hints: ['Diện tích giấy là $S_{xq} = \\pi rl$.'],
      solution: '$S_{xq} = \\pi \\cdot 5 \\cdot 15 = 75\\pi \\approx 235{,}6$ (cm²).',
    },
    {
      type: 'fraction',
      prompt:
        'Hai hình cầu có bán kính $2$ cm và $3$ cm. Tỉ số thể tích của hình cầu nhỏ và hình cầu lớn là bao nhiêu? (Nhập phân số tối giản.)',
      answer: [8, 27],
      simplest: true,
      hints: ['Thể tích tỉ lệ với lập phương bán kính.'],
      solution:
        '$\\dfrac{\\frac{4}{3}\\pi \\cdot 2^3}{\\frac{4}{3}\\pi \\cdot 3^3} = \\dfrac{8}{27}$.',
    },
  ],
  takeaways: [
    'Hình trụ: $S_{xq} = 2\\pi rh$, $V = \\pi r^2 h$. Hình nón: $S_{xq} = \\pi rl$, $V = \\dfrac{1}{3}\\pi r^2 h$, $l^2 = r^2 + h^2$.',
    'Hình cầu: $S = 4\\pi R^2$, $V = \\dfrac{4}{3}\\pi R^3$; mặt cắt bán kính $\\sqrt{R^2 - d^2}$.',
    'Biết thể tích hay diện tích, ta lập phương trình để tìm bán kính hoặc chiều cao.',
    'Vật ghép từ nhiều hình: tính từng phần rồi cộng lại; đổi đơn vị cẩn thận ($1$ dm³ $= 1$ lít).',
  ],
};
