/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương 10: hình trụ, hình nón, hình cầu; cách tạo ra mỗi hình bằng phép quay; diện tích xung quanh, diện tích toàn phần, diện tích mặt cầu và thể tích; bài toán thực tế về vật thể ghép từ các hình.',
  intro:
    'Chương 10 giới thiệu ba hình khối tròn xoay quen thuộc trong đời sống: hình trụ (lon sữa, ống nước), hình nón (nón lá, phễu) và hình cầu (quả bóng, viên bi). Mỗi hình sinh ra khi quay một hình phẳng quanh một trục, và các công thức diện tích, thể tích của chúng liên hệ chặt chẽ với nhau. Bài ôn tập này hệ thống lại cả chương, kèm một bộ đề tự sinh có bản đồ kĩ năng tô màu theo từng bài.',
  objectives: [
    'Hệ thống hoá định nghĩa và công thức của hình trụ, hình nón, hình cầu.',
    'Giải các bài tập trắc nghiệm và tự luận tổng hợp về diện tích và thể tích các hình khối tròn xoay.',
    'Vận dụng vào bài toán thực tế: tháp nước, viên thuốc con nhộng, hộp bóng bàn, nước dâng khi thả vật.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức chương',
      blocks: [
        {
          type: 'table',
          caption: 'Tóm tắt chương 10. Một số hình khối trong thực tiễn.',
          head: ['Hình', 'Tạo thành khi quay', 'Diện tích', 'Thể tích'],
          rows: [
            [
              'Hình trụ (Bài 31)',
              'Hình chữ nhật quanh một cạnh',
              '$S_{xq} = 2\\pi rh$; $S_{tp} = 2\\pi rh + 2\\pi r^2$',
              '$V = \\pi r^2 h$',
            ],
            [
              'Hình nón (Bài 31)',
              'Tam giác vuông quanh một cạnh góc vuông',
              '$S_{xq} = \\pi rl$; $S_{tp} = \\pi rl + \\pi r^2$',
              '$V = \\dfrac{1}{3}\\pi r^2 h$',
            ],
            [
              'Hình cầu (Bài 32)',
              'Nửa hình tròn quanh đường kính',
              '$S = 4\\pi R^2$',
              '$V = \\dfrac{4}{3}\\pi R^3$',
            ],
          ],
        },
        {
          type: 'list',
          items: [
            'Hình trụ: đường sinh song song với trục và dài bằng chiều cao. Hình nón: đường sinh $l$, chiều cao $h$, bán kính đáy $r$ thoả $l^2 = r^2 + h^2$.',
            'Trải phẳng mặt xung quanh: hình trụ cho hình chữ nhật $2\\pi r \\times h$; hình nón cho hình quạt bán kính $l$, độ dài cung $2\\pi r$.',
            'Mặt cắt của hình cầu là hình tròn bán kính $\\sqrt{R^2 - d^2}$; qua tâm là hình tròn lớn.',
            'Cùng đáy, cùng chiều cao: $V_{\\text{nón}} = \\dfrac{1}{3} V_{\\text{trụ}}$. Hình cầu và hình trụ ngoại tiếp: $V_{\\text{cầu}} = \\dfrac{2}{3} V_{\\text{trụ}}$, còn $S_{\\text{cầu}} = S_{xq}$ của hình trụ.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Dùng đường kính thay bán kính. Dùng $h$ thay $l$ trong $S_{xq} = \\pi rl$. Quên $\\dfrac{1}{3}$ ở hình nón, $\\dfrac{4}{3}$ ở hình cầu. Với vật ghép, cộng cả phần mặt tiếp giáp vào diện tích bề mặt. Viết đơn vị diện tích là cm³ hay thể tích là cm².',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Bộ đề gồm các câu tự sinh về hình trụ, hình nón, hình cầu và bài toán thực tế. Khi đề yêu cầu viết dưới dạng $k\\pi$, chỉ nhập số $k$ (số nguyên hoặc phân số như $32/3$); số thập phân dùng dấu phẩy. Bản đồ kĩ năng tô màu từng phần theo lần trả lời đầu: phần nào màu đỏ là cần ôn lại bài đó.',
  },
  examples: [
    {
      problem:
        'Một viên thuốc con nhộng gồm một hình trụ bán kính đáy $3$ mm, dài $10$ mm và hai nửa hình cầu bán kính $3$ mm ở hai đầu. Tính thể tích viên thuốc (làm tròn đến hàng phần mười).',
      steps: [
        'Phần hình trụ: $\\pi \\cdot 3^2 \\cdot 10 = 90\\pi$ (mm³).',
        'Hai nửa hình cầu ghép thành một hình cầu: $\\dfrac{4}{3}\\pi \\cdot 3^3 = 36\\pi$ (mm³).',
        '$V = 90\\pi + 36\\pi = 126\\pi \\approx 395{,}8$ (mm³).',
      ],
      answer: 'Khoảng $395{,}8$ mm³.',
    },
    {
      problem:
        'Ba quả bóng bàn bán kính $2$ cm xếp chồng vừa khít trong một hộp hình trụ (bán kính đáy $2$ cm, chiều cao $12$ cm). Ba quả bóng chiếm bao nhiêu phần thể tích của hộp?',
      steps: [
        'Thể tích ba quả bóng: $3 \\cdot \\dfrac{4}{3}\\pi \\cdot 2^3 = 32\\pi$ (cm³).',
        'Thể tích hộp: $\\pi \\cdot 2^2 \\cdot 12 = 48\\pi$ (cm³).',
        'Tỉ số: $\\dfrac{32\\pi}{48\\pi} = \\dfrac{2}{3}$.',
      ],
      answer: 'Ba quả bóng chiếm $\\dfrac{2}{3}$ thể tích hộp.',
    },
    {
      problem:
        'Một cốc hình trụ bán kính đáy $6$ cm đựng nước. Thả chìm hẳn một viên bi sắt bán kính $3$ cm vào cốc (nước không tràn). Mực nước dâng lên bao nhiêu?',
      steps: [
        'Thể tích nước dâng bằng thể tích viên bi: $\\dfrac{4}{3}\\pi \\cdot 3^3 = 36\\pi$ (cm³).',
        'Phần nước dâng là hình trụ bán kính $6$ cm, cao $x$: $\\pi \\cdot 6^2 \\cdot x = 36\\pi$.',
        '$36x = 36$, nên $x = 1$ cm.',
      ],
      answer: 'Mực nước dâng thêm $1$ cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Quay tam giác $SOA$ vuông tại $O$ một vòng quanh cạnh góc vuông $SO$ cố định, ta được hình gì?',
      options: ['Hình trụ', 'Hình nón', 'Hình cầu', 'Hình chóp tam giác đều'],
      answer: 1,
      hints: ['Cạnh $OA$ quét nên một hình tròn, đỉnh $S$ đứng yên.'],
      solution:
        'Ta được hình nón đỉnh $S$, đáy là hình tròn tâm $O$ bán kính $OA$, đường sinh $SA$.',
    },
    {
      type: 'choice',
      prompt: 'Thể tích hình cầu bán kính $R$ là',
      options: [
        '$4\\pi R^2$',
        '$\\dfrac{4}{3}\\pi R^2$',
        '$\\dfrac{4}{3}\\pi R^3$',
        '$\\dfrac{1}{3}\\pi R^3$',
      ],
      answer: 2,
      hints: [
        'Thể tích có đơn vị khối nên chứa $R^3$; hình cầu bằng $\\dfrac{2}{3}$ hình trụ ngoại tiếp $2\\pi R^3$.',
      ],
      solution:
        '$V = \\dfrac{2}{3} \\cdot 2\\pi R^3 = \\dfrac{4}{3}\\pi R^3$. Còn $4\\pi R^2$ là diện tích mặt cầu.',
    },
    {
      type: 'number',
      prompt:
        'Tính thể tích hình trụ có bán kính đáy $2$ cm và chiều cao $7$ cm (làm tròn đến hàng phần mười).',
      answer: 88,
      tolerance: 0.05,
      unit: 'cm³',
      hints: ['$V = \\pi r^2 h$.'],
      solution: '$V = \\pi \\cdot 4 \\cdot 7 = 28\\pi \\approx 88{,}0$ (cm³).',
    },
    {
      type: 'number',
      prompt:
        'Hình nón có bán kính đáy $9$ cm và chiều cao $12$ cm. Tính diện tích toàn phần (làm tròn đến hàng phần mười).',
      answer: 678.6,
      tolerance: 0.05,
      unit: 'cm²',
      hints: ['$l^2 = r^2 + h^2$.', '$S_{tp} = \\pi rl + \\pi r^2$.'],
      solution:
        '$l^2 = 81 + 144 = 225$, $l = 15$ cm. $S_{tp} = \\pi \\cdot 9 \\cdot 15 + \\pi \\cdot 81 = 135\\pi + 81\\pi = 216\\pi \\approx 678{,}6$ (cm²).',
    },
    {
      type: 'number',
      prompt: 'Tính diện tích mặt cầu có đường kính $12$ cm (làm tròn đến hàng phần mười).',
      answer: 452.4,
      tolerance: 0.05,
      unit: 'cm²',
      hints: ['$R = 6$ cm, hoặc dùng $S = \\pi d^2$.'],
      solution: '$S = 4\\pi \\cdot 6^2 = 144\\pi \\approx 452{,}4$ (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Một hình cầu có thể tích $288\\pi$ cm³. Bán kính của hình cầu là bao nhiêu xăng-ti-mét?',
      answer: 6,
      unit: 'cm',
      hints: ['Giải $\\dfrac{4}{3}\\pi R^3 = 288\\pi$ để tìm $R^3$.'],
      solution: '$R^3 = 288 \\cdot \\dfrac{3}{4} = 216$, nên $R = 6$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một hình nón và một hình trụ có cùng bán kính đáy và cùng chiều cao. Hình trụ có thể tích $150$ cm³. Thể tích hình nón là bao nhiêu?',
      answer: 50,
      unit: 'cm³',
      hints: ['$V_{\\text{nón}} = \\dfrac{1}{3} V_{\\text{trụ}}$ khi cùng đáy, cùng chiều cao.'],
      solution: '$V_{\\text{nón}} = \\dfrac{150}{3} = 50$ (cm³).',
    },
    {
      type: 'number',
      prompt:
        'Một tháp nước gồm thân hình trụ bán kính đáy $3$ m, cao $4$ m và mái hình nón cùng bán kính, cao $2$ m. Tính thể tích của tháp (làm tròn đến hàng phần mười).',
      answer: 131.9,
      tolerance: 0.05,
      unit: 'm³',
      hints: ['Tính riêng thân trụ và mái nón rồi cộng lại.'],
      solution:
        'Thân: $\\pi \\cdot 9 \\cdot 4 = 36\\pi$; mái: $\\dfrac{1}{3}\\pi \\cdot 9 \\cdot 2 = 6\\pi$. Tổng $42\\pi \\approx 131{,}9$ (m³).',
    },
    {
      type: 'number',
      prompt:
        'Một viên thuốc con nhộng gồm một hình trụ bán kính đáy $3$ mm, dài $10$ mm và hai nửa hình cầu bán kính $3$ mm ở hai đầu. Tính diện tích bề mặt viên thuốc (làm tròn đến hàng phần mười).',
      answer: 301.6,
      tolerance: 0.05,
      unit: 'mm²',
      hints: [
        'Bề mặt gồm mặt xung quanh của hình trụ và hai nửa mặt cầu (không có hai đáy của hình trụ).',
        'Hai nửa mặt cầu ghép thành một mặt cầu bán kính $3$ mm.',
      ],
      solution:
        '$S_{xq}$ trụ $= 2\\pi \\cdot 3 \\cdot 10 = 60\\pi$; mặt cầu $= 4\\pi \\cdot 9 = 36\\pi$. Tổng $96\\pi \\approx 301{,}6$ (mm²).',
    },
    {
      type: 'fraction',
      prompt:
        'Ba quả bóng bàn bán kính $2$ cm xếp chồng vừa khít trong một hộp hình trụ có bán kính đáy $2$ cm, chiều cao $12$ cm. Ba quả bóng chiếm bao nhiêu phần thể tích hộp? (Nhập phân số tối giản.)',
      answer: [2, 3],
      simplest: true,
      hints: [
        'Thể tích ba quả bóng: $3 \\cdot \\dfrac{4}{3}\\pi \\cdot 2^3$.',
        'Thể tích hộp: $\\pi \\cdot 2^2 \\cdot 12$.',
      ],
      solution: '$\\dfrac{32\\pi}{48\\pi} = \\dfrac{2}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Một cốc hình trụ bán kính đáy $4$ cm đựng nước. Thả chìm hẳn một viên bi bán kính $2$ cm vào cốc (nước không tràn). Mực nước dâng lên bao nhiêu xăng-ti-mét (làm tròn đến hàng phần mười)?',
      answer: 0.7,
      tolerance: 0.05,
      unit: 'cm',
      hints: [
        'Lượng nước dâng bằng thể tích viên bi.',
        'Giải $\\pi \\cdot 4^2 \\cdot x = \\dfrac{4}{3}\\pi \\cdot 2^3$.',
      ],
      solution:
        '$V_{\\text{bi}} = \\dfrac{32}{3}\\pi$ (cm³). $16\\pi x = \\dfrac{32}{3}\\pi$, nên $x = \\dfrac{2}{3} \\approx 0{,}7$ (cm).',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        'Trải phẳng mặt xung quanh hình nón được một hình quạt tròn có bán kính bằng đường sinh.',
        'Đường sinh của hình trụ dài bằng chiều cao của nó.',
        'Nếu bán kính đáy hình trụ tăng gấp đôi, chiều cao giữ nguyên, thì thể tích tăng gấp đôi.',
        'Mặt phẳng cắt hình cầu đi qua tâm cho hình tròn có bán kính lớn nhất.',
      ],
      answers: [0, 1, 3],
      hints: ['Thể tích hình trụ tỉ lệ với $r^2$.'],
      solution:
        'Đúng: hình quạt bán kính $l$; đường sinh hình trụ bằng $h$; mặt cắt qua tâm là hình tròn lớn bán kính $R$. Sai: $\\pi (2r)^2 h = 4\\pi r^2 h$, nên thể tích tăng gấp $4$ lần, không phải gấp đôi.',
    },
  ],
  takeaways: [
    'Hình trụ, hình nón, hình cầu tạo thành khi quay hình chữ nhật, tam giác vuông, nửa hình tròn quanh một trục.',
    'Trụ: $S_{xq} = 2\\pi rh$, $V = \\pi r^2 h$. Nón: $S_{xq} = \\pi rl$, $V = \\dfrac{1}{3}\\pi r^2 h$. Cầu: $S = 4\\pi R^2$, $V = \\dfrac{4}{3}\\pi R^3$.',
    'Vật ghép: thể tích bằng tổng các phần; diện tích bề mặt chỉ tính các mặt lộ ra ngoài.',
    'Nước dâng hoặc tràn ra khi thả vật chìm bằng đúng thể tích của vật.',
  ],
};
