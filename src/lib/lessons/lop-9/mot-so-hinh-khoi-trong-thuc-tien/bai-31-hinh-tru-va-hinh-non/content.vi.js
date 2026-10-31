/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hình trụ và hình nón: cách tạo ra khi quay hình chữ nhật, tam giác vuông; bán kính đáy, chiều cao, đường sinh; diện tích xung quanh và thể tích của hình trụ, hình nón.',
  intro:
    'Lon nước ngọt, ống nước, cột đình có dạng hình trụ; chiếc nón lá, cây kem ốc quế, mái tháp nhọn có dạng hình nón. Nếu muốn biết cần bao nhiêu tôn để làm vỏ lon, bao nhiêu lá để lợp một chiếc nón hay một lon chứa được bao nhiêu nước, ta cần tính diện tích xung quanh và thể tích của các hình này.',
  objectives: [
    'Nhận biết hình trụ, hình nón; chỉ ra đáy, bán kính đáy, chiều cao, đường sinh, mặt xung quanh.',
    'Tính diện tích xung quanh hình trụ $S_{xq} = 2\\pi rh$ và hình nón $S_{xq} = \\pi rl$.',
    'Tính thể tích hình trụ $V = \\pi r^2 h$ và hình nón $V = \\dfrac{1}{3}\\pi r^2 h$.',
    'Giải quyết bài toán thực tế gắn với đồ vật có dạng hình trụ, hình nón.',
  ],
  sections: [
    {
      heading: 'Hình trụ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình trụ',
          text: "Khi quay hình chữ nhật $OBAO'$ một vòng quanh cạnh $OO'$ cố định, ta được một hình trụ. Hai cạnh $OB$ và $O'A$ quét nên hai đáy là hai hình tròn bằng nhau, nằm trong hai mặt phẳng song song; cạnh $AB$ quét nên mặt xung quanh.",
        },
        {
          type: 'list',
          items: [
            "Bán kính đáy: $r = OB = O'A$.",
            "Chiều cao: $h = OO'$, là khoảng cách giữa hai đáy.",
            "Đường sinh: mỗi vị trí của cạnh $AB$ khi quay là một đường sinh. Các đường sinh song song với $OO'$ và có độ dài bằng chiều cao: $l = h$.",
          ],
        },
        {
          type: 'p',
          text: 'Cắt mặt xung quanh của hình trụ dọc theo một đường sinh rồi trải phẳng, ta được một hình chữ nhật: một cạnh bằng chiều cao $h$, cạnh kia bằng chu vi đáy $2\\pi r$. Vì vậy diện tích xung quanh của hình trụ bằng diện tích hình chữ nhật đó.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Diện tích xung quanh và thể tích hình trụ',
          text: 'Hình trụ có bán kính đáy $r$ và chiều cao $h$: $$S_{xq} = 2\\pi rh, \\qquad V = S_{\\text{đáy}} \\cdot h = \\pi r^2 h.$$ Diện tích toàn phần bằng diện tích xung quanh cộng diện tích hai đáy: $S_{tp} = 2\\pi rh + 2\\pi r^2$.',
        },
      ],
    },
    {
      heading: 'Hình nón',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình nón',
          text: 'Khi quay tam giác $SOA$ vuông tại $O$ một vòng quanh cạnh góc vuông $SO$ cố định, ta được một hình nón. Cạnh $OA$ quét nên đáy là hình tròn tâm $O$; cạnh huyền $SA$ quét nên mặt xung quanh; $S$ là đỉnh của hình nón.',
        },
        {
          type: 'list',
          items: [
            'Bán kính đáy: $r = OA$. Chiều cao: $h = SO$ (đoạn nối đỉnh với tâm đáy, vuông góc với đáy).',
            'Đường sinh: mỗi vị trí của cạnh $SA$ là một đường sinh; mọi đường sinh dài bằng nhau, $l = SA$.',
            'Tam giác $SOA$ vuông tại $O$ nên $l^2 = r^2 + h^2$.',
          ],
        },
        {
          type: 'p',
          text: 'Trải phẳng mặt xung quanh của hình nón, ta được một hình quạt tròn bán kính $l$, có độ dài cung bằng chu vi đáy $2\\pi r$. Diện tích hình quạt ấy là $\\dfrac{1}{2} \\cdot 2\\pi r \\cdot l = \\pi rl$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Diện tích xung quanh và thể tích hình nón',
          text: 'Hình nón có bán kính đáy $r$, chiều cao $h$ và đường sinh $l$: $$S_{xq} = \\pi rl, \\qquad V = \\frac{1}{3} S_{\\text{đáy}} \\cdot h = \\frac{1}{3}\\pi r^2 h.$$ Diện tích toàn phần: $S_{tp} = \\pi rl + \\pi r^2$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Trụ và nón cùng đáy, cùng chiều cao',
          text: 'Đổ đầy nước vào một hình nón rồi rót sang một hình trụ có cùng bán kính đáy và cùng chiều cao: rót $3$ lần thì đầy hình trụ. Thể tích hình nón bằng $\\dfrac{1}{3}$ thể tích hình trụ đó, giống như hình chóp so với hình lăng trụ ở lớp 8.',
        },
        {
          type: 'table',
          caption:
            'Công thức của hình trụ và hình nón (bán kính đáy $r$, chiều cao $h$, đường sinh $l$)',
          head: ['Hình', 'Diện tích xung quanh', 'Thể tích'],
          rows: [
            ['Hình trụ', '$S_{xq} = 2\\pi rh$', '$V = \\pi r^2 h$'],
            ['Hình nón', '$S_{xq} = \\pi rl$', '$V = \\dfrac{1}{3}\\pi r^2 h$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Dùng đường kính thay cho bán kính trong công thức. Với hình nón, nhầm chiều cao $h$ với đường sinh $l$: diện tích xung quanh dùng $l$, thể tích dùng $h$. Quên hệ số $\\dfrac{1}{3}$ trong thể tích hình nón.',
        },
      ],
    },
  ],
  explore: {
    title: 'Quay tạo hình và trải phẳng',
    instruction:
      'Chọn hình trụ hoặc hình nón, kéo "Góc quay" (hoặc bấm "Quay một vòng") để xem hình chữ nhật, tam giác vuông quét nên mặt xung quanh. Chọn "Trải phẳng" để thấy hình chữ nhật $2\\pi r \\times h$ hay hình quạt bán kính $l$. Đổi $r$ và $h$ rồi theo dõi $S_{xq}$, $S_{tp}$ và $V$.',
  },
  examples: [
    {
      problem:
        'Một hình trụ có bán kính đáy $r = 3$ cm và chiều cao $h = 10$ cm. Tính diện tích xung quanh, diện tích toàn phần và thể tích của hình trụ (làm tròn kết quả đến hàng phần mười).',
      steps: [
        '$S_{xq} = 2\\pi rh = 2\\pi \\cdot 3 \\cdot 10 = 60\\pi \\approx 188{,}5$ (cm²).',
        'Diện tích một đáy: $\\pi r^2 = 9\\pi$ (cm²), nên $S_{tp} = 60\\pi + 2 \\cdot 9\\pi = 78\\pi \\approx 245{,}0$ (cm²).',
        '$V = \\pi r^2 h = 9\\pi \\cdot 10 = 90\\pi \\approx 282{,}7$ (cm³).',
      ],
      answer:
        '$S_{xq} \\approx 188{,}5$ cm², $S_{tp} \\approx 245{,}0$ cm², $V \\approx 282{,}7$ cm³.',
    },
    {
      problem:
        'Một hình nón có bán kính đáy $r = 6$ cm và chiều cao $h = 8$ cm. Tính độ dài đường sinh, diện tích xung quanh và thể tích của hình nón (làm tròn đến hàng phần mười).',
      steps: [
        'Tam giác $SOA$ vuông tại $O$: $l^2 = r^2 + h^2 = 36 + 64 = 100$, nên $l = 10$ cm.',
        '$S_{xq} = \\pi rl = \\pi \\cdot 6 \\cdot 10 = 60\\pi \\approx 188{,}5$ (cm²).',
        '$V = \\dfrac{1}{3}\\pi r^2 h = \\dfrac{1}{3}\\pi \\cdot 36 \\cdot 8 = 96\\pi \\approx 301{,}6$ (cm³).',
      ],
      answer: '$l = 10$ cm, $S_{xq} \\approx 188{,}5$ cm², $V \\approx 301{,}6$ cm³.',
    },
    {
      problem:
        'Một chiếc nón lá có đường kính vành nón $40$ cm và đường sinh $30$ cm. Tính diện tích lá cần dùng để phủ mặt xung quanh của chiếc nón, coi chiếc nón là một hình nón (làm tròn đến cm²).',
      steps: [
        'Bán kính đáy: $r = 40 : 2 = 20$ (cm); đường sinh $l = 30$ cm.',
        '$S_{xq} = \\pi rl = \\pi \\cdot 20 \\cdot 30 = 600\\pi \\approx 1\\,885$ (cm²).',
      ],
      answer: 'Khoảng $1\\,885$ cm² lá.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: "Quay hình chữ nhật $OBAO'$ một vòng quanh cạnh $OO'$ cố định, ta được hình gì?",
      options: ['Hình nón', 'Hình trụ', 'Hình cầu', 'Hình lăng trụ đứng'],
      answer: 1,
      hints: ["Hai cạnh $OB$ và $O'A$ quét nên hai hình tròn bằng nhau, song song với nhau."],
      solution:
        "Cạnh $OB$ và $O'A$ quét nên hai đáy là hai hình tròn bằng nhau, cạnh $AB$ quét nên mặt xung quanh: đó là hình trụ.",
    },
    {
      type: 'choice',
      prompt:
        'Hình nón có bán kính đáy $r$, chiều cao $h$, đường sinh $l$. Công thức nào tính diện tích xung quanh của hình nón?',
      options: [
        '$S_{xq} = \\pi rh$',
        '$S_{xq} = 2\\pi rl$',
        '$S_{xq} = \\pi rl$',
        '$S_{xq} = \\pi r^2 l$',
      ],
      answer: 2,
      hints: ['Mặt xung quanh trải phẳng là hình quạt bán kính $l$, độ dài cung $2\\pi r$.'],
      solution:
        'Diện tích hình quạt bằng $\\dfrac{1}{2} \\cdot$ độ dài cung $\\cdot$ bán kính $= \\dfrac{1}{2} \\cdot 2\\pi r \\cdot l = \\pi rl$. Công thức dùng đường sinh $l$, không dùng chiều cao $h$.',
    },
    {
      type: 'number',
      prompt:
        'Tính diện tích xung quanh của hình trụ có bán kính đáy $3$ cm và chiều cao $10$ cm (làm tròn đến hàng phần mười).',
      answer: 188.5,
      tolerance: 0.05,
      unit: 'cm²',
      hints: ['$S_{xq} = 2\\pi rh$.'],
      solution: '$S_{xq} = 2\\pi \\cdot 3 \\cdot 10 = 60\\pi \\approx 188{,}5$ (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Tính thể tích của hình trụ có bán kính đáy $4$ cm và chiều cao $5$ cm (làm tròn đến hàng phần mười).',
      answer: 251.3,
      tolerance: 0.05,
      unit: 'cm³',
      hints: ['$V = \\pi r^2 h$.'],
      solution: '$V = \\pi \\cdot 4^2 \\cdot 5 = 80\\pi \\approx 251{,}3$ (cm³).',
    },
    {
      type: 'number',
      prompt:
        'Hình nón có bán kính đáy $5$ cm và chiều cao $12$ cm. Độ dài đường sinh của hình nón là bao nhiêu xăng-ti-mét?',
      answer: 13,
      unit: 'cm',
      hints: ['Tam giác $SOA$ vuông tại $O$ có hai cạnh góc vuông là $r$ và $h$.'],
      solution: '$l^2 = r^2 + h^2 = 25 + 144 = 169$, nên $l = 13$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tính diện tích xung quanh của hình nón có bán kính đáy $3$ cm và đường sinh $5$ cm (làm tròn đến hàng phần mười).',
      answer: 47.1,
      tolerance: 0.05,
      unit: 'cm²',
      hints: ['$S_{xq} = \\pi rl$.'],
      solution: '$S_{xq} = \\pi \\cdot 3 \\cdot 5 = 15\\pi \\approx 47{,}1$ (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Tính thể tích của hình nón có bán kính đáy $3$ cm và chiều cao $4$ cm (làm tròn đến hàng phần mười).',
      answer: 37.7,
      tolerance: 0.05,
      unit: 'cm³',
      hints: ['$V = \\dfrac{1}{3}\\pi r^2 h$; đừng quên hệ số $\\dfrac{1}{3}$.'],
      solution: '$V = \\dfrac{1}{3}\\pi \\cdot 9 \\cdot 4 = 12\\pi \\approx 37{,}7$ (cm³).',
    },
    {
      type: 'fraction',
      prompt:
        'Một hình nón và một hình trụ có cùng bán kính đáy và cùng chiều cao. Thể tích hình nón bằng bao nhiêu phần thể tích hình trụ? (Nhập phân số tối giản.)',
      answer: [1, 3],
      simplest: true,
      hints: ['So sánh $\\dfrac{1}{3}\\pi r^2 h$ với $\\pi r^2 h$.'],
      solution:
        '$V_{\\text{nón}} : V_{\\text{trụ}} = \\dfrac{1}{3}\\pi r^2 h : \\pi r^2 h = \\dfrac{1}{3}$. Rót $3$ lần đầy hình nón thì đầy hình trụ.',
    },
    {
      type: 'number',
      prompt:
        'Một hình trụ có thể tích $72\\pi$ cm³ và bán kính đáy $3$ cm. Chiều cao của hình trụ là bao nhiêu xăng-ti-mét?',
      answer: 8,
      unit: 'cm',
      hints: ['Từ $V = \\pi r^2 h$ suy ra $h = \\dfrac{V}{\\pi r^2}$.'],
      solution: '$h = \\dfrac{72\\pi}{\\pi \\cdot 3^2} = \\dfrac{72}{9} = 8$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Một lon nước ngọt hình trụ có đường kính đáy $6$ cm và chiều cao $12$ cm. Lon chứa được tối đa bao nhiêu xăng-ti-mét khối nước (bỏ qua độ dày vỏ, làm tròn đến hàng phần mười)?',
      answer: 339.3,
      tolerance: 0.05,
      unit: 'cm³',
      hints: ['Bán kính bằng nửa đường kính.', '$V = \\pi r^2 h$ với $r = 3$ cm.'],
      solution: '$r = 3$ cm. $V = \\pi \\cdot 3^2 \\cdot 12 = 108\\pi \\approx 339{,}3$ (cm³).',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        'Mọi đường sinh của hình trụ đều có độ dài bằng chiều cao của nó.',
        'Đường sinh của hình nón bằng chiều cao của hình nón.',
        'Trải phẳng mặt xung quanh của hình trụ được một hình chữ nhật có một cạnh bằng chu vi đáy.',
        'Hình nón có hai đáy là hai hình tròn bằng nhau.',
      ],
      answers: [0, 2],
      hints: ['Với hình nón, $l^2 = r^2 + h^2$, nên $l$ lớn hơn $h$.', 'Hình nón chỉ có một đáy.'],
      solution:
        'Đúng: đường sinh hình trụ dài bằng chiều cao; trải phẳng mặt xung quanh hình trụ được hình chữ nhật $2\\pi r \\times h$. Sai: đường sinh hình nón thoả $l^2 = r^2 + h^2$ nên $l > h$; hình nón chỉ có một đáy.',
    },
  ],
  takeaways: [
    'Quay hình chữ nhật quanh một cạnh được hình trụ; quay tam giác vuông quanh một cạnh góc vuông được hình nón.',
    'Hình trụ: $S_{xq} = 2\\pi rh$, $S_{tp} = 2\\pi rh + 2\\pi r^2$, $V = \\pi r^2 h$.',
    'Hình nón: $l^2 = r^2 + h^2$, $S_{xq} = \\pi rl$, $S_{tp} = \\pi rl + \\pi r^2$, $V = \\dfrac{1}{3}\\pi r^2 h$.',
    'Hình nón có thể tích bằng $\\dfrac{1}{3}$ thể tích hình trụ cùng bán kính đáy, cùng chiều cao.',
  ],
};
