/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: vẽ, cắt và gấp hình khai triển để làm một chiếc hộp quà hình lập phương (hoặc hình hộp chữ nhật) và một chân đế lịch để bàn hình lăng trụ đứng tam giác, rồi tính diện tích bìa cần dùng kể cả mép dán.',
  intro:
    'Một chiếc hộp quà tự tay làm, một chân đế lịch xinh xắn đặt trên bàn học: cả hai đều được gấp từ một tấm bìa phẳng. Trong hoạt động này em dùng hình khai triển của hình lập phương và hình lăng trụ đứng tam giác đã học ở chương X để làm chúng, và tính trước cần bao nhiêu bìa.',
  objectives: [
    'Vẽ đúng hình khai triển (có mép dán) của hình lập phương, hình hộp chữ nhật và hình lăng trụ đứng tam giác.',
    'Gấp hình khai triển thành hộp quà và chân đế lịch để bàn.',
    'Tính diện tích các mặt, diện tích mép dán và tổng diện tích bìa cần dùng.',
    'Chọn kích thước tờ bìa đủ để vẽ hình khai triển.',
  ],
  sections: [
    {
      heading: 'Chuẩn bị và nhắc lại',
      blocks: [
        {
          type: 'list',
          items: [
            'Vật liệu: một mảnh bìa carton hoặc tờ bìa màu cứng.',
            'Dụng cụ: bút chì, thước thẳng, ê ke, kéo, keo dán hoặc băng dính.',
            'Địa điểm: lớp học hoặc ở nhà.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hình hộp chữ nhật, hình lập phương',
          text: 'Hình hộp chữ nhật có chiều dài $a$, chiều rộng $b$, chiều cao $c$: $S_{xq} = 2(a + b)c$, diện tích các mặt (diện tích toàn phần) là $2(ab + bc + ca)$, thể tích $V = abc$. Hình lập phương cạnh $a$ có sáu mặt là hình vuông, tổng diện tích các mặt là $6a^2$ và $V = a^3$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hình lăng trụ đứng tam giác',
          text: 'Hình lăng trụ đứng có chiều cao $h$, đáy là tam giác có chu vi $C_{\\text{đáy}}$, diện tích $S_{\\text{đáy}}$: $S_{xq} = C_{\\text{đáy}} \\cdot h$, $V = S_{\\text{đáy}} \\cdot h$. Hai đáy là hai tam giác bằng nhau, các mặt bên là hình chữ nhật.',
        },
      ],
    },
    {
      heading: 'Hoạt động 1: Chiếc hộp đựng quà',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ hình khai triển của hình lập phương trên bìa, có thêm các mép dán, rồi cắt theo đường viền.',
            'Gấp theo các đường nét đứt.',
            'Dán mép của các mặt với nhau, trừ nắp hộp.',
            'Gấp nắp dưới và nắp trên (gài mép vào trong), rồi trang trí hộp tuỳ ý.',
          ],
        },
        {
          type: 'p',
          text: 'Hình khai triển trong phần tương tác là kiểu thường dùng cho hộp quà: bốn mặt bên xếp thành một dải liền, mép dán ở cuối dải; mặt đáy và nắp hộp nằm ở hai phía của dải, mỗi mặt có một mép gài.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Muốn hộp vuông vức, các mặt phải là hình vuông bằng nhau và các đường gấp phải thẳng: dùng ê ke kẻ góc vuông và miết thước dọc đường nét đứt trước khi gấp.',
        },
      ],
    },
    {
      heading: 'Hoạt động 2: Chân đế lịch để bàn',
      blocks: [
        {
          type: 'p',
          text: 'Chân đế lịch là một hình lăng trụ đứng tam giác nằm trên một mặt bên. Hình khai triển gồm ba hình chữ nhật cùng chiều dài nối thành dải (đáy nằm trên bàn, mặt dán lịch, mặt sau), một mép dán và có thể thêm hai tam giác ở hai đầu.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ phác hình khai triển trên bìa cứng rồi cắt theo đường viền.',
            'Gấp theo các đường nét đứt.',
            'Dán hai mép để tạo thành chân đế.',
            'Dán thời gian biểu, thời khoá biểu hoặc tờ nhắc việc lên mặt ngoài của chân đế.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Ba cạnh của tam giác đáy phải khớp với ba chiều rộng của ba hình chữ nhật trong dải. Chẳng hạn tam giác cân có cạnh đáy $8$ cm, hai cạnh bên $5$ cm thì ba hình chữ nhật rộng $8$ cm, $5$ cm, $5$ cm; dải sai một số đo là chân đế không khép kín.',
        },
      ],
    },
    {
      heading: 'Tính diện tích bìa cần dùng',
      blocks: [
        {
          type: 'tex',
          tex: 'S_{\\text{bìa}} = S_{\\text{các mặt}} + S_{\\text{mép dán}}',
        },
        {
          type: 'p',
          text: 'Mép dán rộng $1$ cm, hai đầu cắt chéo để khỏi vướng khi gấp, là một hình thang. Mép dán dọc một cạnh dài $\\ell$ cm có hai đáy $\\ell$ và $\\ell - 2$, chiều cao $1$, nên diện tích là $\\dfrac{(\\ell + \\ell - 2) \\cdot 1}{2} = \\ell - 1$ (cm²).',
        },
        {
          type: 'table',
          head: [
            'Phần',
            'Hộp lập phương cạnh $10$ cm',
            'Chân đế: tam giác $8$, $5$, $5$ cm, dài $15$ cm',
          ],
          rows: [
            [
              'Các mặt',
              '$6 \\cdot 10^2 = 600$ cm²',
              '$18 \\cdot 15 + 2 \\cdot \\dfrac{8 \\cdot 3}{2} = 294$ cm²',
            ],
            ['Mép dán', '$3 \\cdot 9 = 27$ cm²', '$14$ cm²'],
            ['Tổng diện tích bìa', '$627$ cm²', '$308$ cm²'],
          ],
          caption: 'Diện tích bìa cho hai sản phẩm mẫu (mép dán rộng $1$ cm).',
        },
        {
          type: 'p',
          text: 'Ngoài diện tích, tờ bìa còn phải đủ dài và đủ rộng để chứa cả hình khai triển. Hình khai triển hộp lập phương cạnh $10$ cm ở trên cần tờ bìa ít nhất $41$ cm $\\times$ $32$ cm, nên một tờ A4 ($21$ cm $\\times$ $29{,}7$ cm) không đủ.',
        },
      ],
    },
    {
      heading: 'Dự án: Hộp quà và chân đế lịch của em',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi nhóm làm một hộp quà hình lập phương (hoặc hình hộp chữ nhật) và một chân đế lịch để bàn hình lăng trụ đứng tam giác, có tính toán trước lượng bìa cần dùng.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn kích thước: cạnh hộp quà; tam giác đáy (ba cạnh và chiều cao) và chiều dài của chân đế sao cho vừa tờ lịch hoặc thời khoá biểu của em.',
            'Vẽ phác hình khai triển trên giấy nháp, ghi đủ các kích thước và mép dán; tính diện tích các mặt, diện tích mép dán và tổng diện tích bìa.',
            'Chọn tờ bìa đủ kích thước, vẽ hình khai triển bằng thước và ê ke, kẻ các đường gấp bằng nét đứt.',
            'Cắt theo đường viền, gấp theo nét đứt, dán mép; với hộp quà, để nắp dưới và nắp trên gài được.',
            'Trang trí sản phẩm; dán thời gian biểu, thời khoá biểu hoặc nhắc việc lên chân đế.',
            'Đo lại sản phẩm và so sánh với kích thước dự định; ghi lại phần bìa thừa.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: trưng bày hai sản phẩm cùng bản vẽ hình khai triển có kích thước, bảng tính diện tích bìa (các mặt, mép dán, tổng, phần bìa thừa) và nhận xét: điều gì làm sản phẩm khớp hoặc chưa khớp với dự định?',
        },
      ],
    },
  ],
  explore: {
    title: 'Thiết kế hình khai triển và gấp thành hộp',
    instruction:
      'Chọn hộp quà hoặc chân đế lịch, đặt kích thước. Kéo thanh "Gấp lưới" hoặc bấm "Gấp lại" để xem hình khai triển gấp thành hình khối; kéo hình để xoay. Tính tổng diện tích các mặt và nhập để kiểm tra, rồi xem bìa cần dùng kể cả mép dán.',
  },
  examples: [
    {
      problem:
        'Bạn Mai làm một hộp quà hình lập phương cạnh $10$ cm theo hình khai triển có ba mép dán rộng $1$ cm (một mép dán dọc cạnh bên, hai mép gài ở nắp trên và nắp dưới, mỗi mép dài $10$ cm). Tính tổng diện tích bìa Mai cần dùng.',
      steps: [
        'Diện tích sáu mặt hình vuông: $6 \\cdot 10^2 = 600$ (cm²).',
        'Mỗi mép dán là hình thang có hai đáy $10$ cm và $8$ cm, cao $1$ cm: $\\dfrac{(10 + 8) \\cdot 1}{2} = 9$ (cm²).',
        'Ba mép dán: $3 \\cdot 9 = 27$ (cm²).',
        'Tổng diện tích bìa: $600 + 27 = 627$ (cm²).',
      ],
      answer: 'Mai cần $627$ cm² bìa.',
    },
    {
      problem:
        'Chân đế lịch là hình lăng trụ đứng tam giác dài $15$ cm, đáy là tam giác cân có cạnh đáy $8$ cm, hai cạnh bên $5$ cm, chiều cao ứng với cạnh đáy là $3$ cm. Tính diện tích các mặt của chân đế (có hai mặt tam giác ở hai đầu).',
      steps: [
        'Chu vi tam giác đáy: $8 + 5 + 5 = 18$ (cm).',
        'Diện tích xung quanh: $S_{xq} = 18 \\cdot 15 = 270$ (cm²).',
        'Diện tích một tam giác: $\\dfrac{8 \\cdot 3}{2} = 12$ (cm²); hai tam giác: $24$ cm².',
        'Diện tích các mặt: $270 + 24 = 294$ (cm²).',
      ],
      answer: '$294$ cm² (chưa kể mép dán).',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Hộp quà hình lập phương cạnh $8$ cm. Tổng diện tích các mặt của hộp (chưa kể mép dán) là bao nhiêu xăng-ti-mét vuông?',
      answer: 384,
      unit: 'cm²',
      hints: ['Hình lập phương có $6$ mặt là hình vuông bằng nhau.'],
      solution: '$6 \\cdot 8^2 = 6 \\cdot 64 = 384$ (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Hộp quà hình hộp chữ nhật dài $12$ cm, rộng $8$ cm, cao $5$ cm. Tổng diện tích các mặt của hộp là bao nhiêu xăng-ti-mét vuông?',
      answer: 392,
      unit: 'cm²',
      hints: [
        'Hộp có ba cặp mặt đối diện bằng nhau.',
        'Tính $2(ab + bc + ca)$ với $a = 12$, $b = 8$, $c = 5$.',
      ],
      solution: '$2(12 \\cdot 8 + 8 \\cdot 5 + 5 \\cdot 12) = 2(96 + 40 + 60) = 392$ (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Một mép dán rộng $1$ cm dọc một cạnh dài $10$ cm, hai đầu cắt chéo nên là hình thang có hai đáy $10$ cm và $8$ cm. Diện tích mép dán là bao nhiêu xăng-ti-mét vuông?',
      answer: 9,
      unit: 'cm²',
      hints: ['Diện tích hình thang bằng tổng hai đáy nhân chiều cao rồi chia $2$.'],
      solution: '$\\dfrac{(10 + 8) \\cdot 1}{2} = 9$ (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Chân đế lịch là hình lăng trụ đứng tam giác dài $20$ cm, đáy là tam giác cân có cạnh đáy $6$ cm, hai cạnh bên $5$ cm, chiều cao ứng với cạnh đáy $4$ cm. Tính tổng diện tích các mặt (có hai mặt tam giác).',
      answer: 344,
      unit: 'cm²',
      hints: [
        'Diện tích xung quanh bằng chu vi đáy nhân chiều dài chân đế.',
        'Cộng thêm hai tam giác, mỗi tam giác có diện tích $\\dfrac{6 \\cdot 4}{2}$.',
      ],
      solution:
        '$S_{xq} = (6 + 5 + 5) \\cdot 20 = 320$ cm²; hai tam giác: $2 \\cdot \\dfrac{6 \\cdot 4}{2} = 24$ cm². Tổng: $344$ cm².',
    },
    {
      type: 'number',
      prompt:
        'Một chân đế lịch để hở hai đầu (không có mặt tam giác), dài $18$ cm, tam giác đáy có ba cạnh $8$ cm, $5$ cm, $5$ cm. Diện tích bìa của ba mặt hình chữ nhật là bao nhiêu?',
      answer: 324,
      unit: 'cm²',
      hints: ['Ba hình chữ nhật cùng dài $18$ cm, rộng lần lượt $8$, $5$, $5$ cm.'],
      solution: '$(8 + 5 + 5) \\cdot 18 = 18 \\cdot 18 = 324$ (cm²).',
    },
    {
      type: 'choice',
      prompt:
        'Hộp lập phương cạnh $10$ cm có mép dán cần $627$ cm² bìa, và hình khai triển rộng $41$ cm. Có thể cắt hình khai triển đó từ một tờ A4 ($21$ cm $\\times$ $29{,}7$ cm) không?',
      options: [
        'Có, vì tờ A4 có diện tích lớn hơn $600$ cm².',
        'Không, vì tờ A4 chỉ có $623{,}7$ cm², ít hơn $627$ cm², và hình khai triển dài $41$ cm hơn cả chiều dài tờ giấy.',
        'Có, nếu cắt bỏ các mép dán.',
        'Không, vì hình lập phương không có hình khai triển.',
      ],
      answer: 1,
      hints: [
        'Tính diện tích tờ A4: $21 \\cdot 29{,}7$.',
        'Ngoài diện tích, so sánh cả chiều dài hình khai triển với cạnh dài nhất của tờ giấy.',
      ],
      solution:
        '$21 \\cdot 29{,}7 = 623{,}7$ cm² $< 627$ cm², hơn nữa hình khai triển dài $41$ cm $> 29{,}7$ cm, nên không cắt được từ một tờ A4.',
    },
    {
      type: 'number',
      prompt:
        'Để gói kín một hộp quà hình lập phương cạnh $15$ cm, cần ít nhất bao nhiêu xăng-ti-mét vuông giấy gói (không kể phần chồng mép)?',
      answer: 1350,
      unit: 'cm²',
      hints: ['Giấy gói phủ kín cả sáu mặt của hộp.'],
      solution: '$6 \\cdot 15^2 = 6 \\cdot 225 = 1\\,350$ (cm²).',
    },
    {
      type: 'number',
      prompt: 'Hộp quà hình lập phương cạnh $10$ cm đựng được bao nhiêu xăng-ti-mét khối?',
      answer: 1000,
      unit: 'cm³',
      hints: ['Thể tích hình lập phương cạnh $a$ là $a^3$.'],
      solution: '$V = 10^3 = 1\\,000$ (cm³).',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước làm hộp quà theo đúng thứ tự.',
      items: [
        'Gấp theo các đường nét đứt.',
        'Vẽ hình khai triển có mép dán lên bìa.',
        'Dán các mép, trừ nắp hộp.',
        'Cắt theo đường viền.',
        'Gấp nắp dưới, nắp trên và trang trí.',
      ],
      answer: [1, 3, 0, 2, 4],
      hints: ['Phải có hình vẽ trên bìa rồi mới cắt; phải gấp rồi mới dán được.'],
      solution:
        'Vẽ hình khai triển có mép dán → cắt theo đường viền → gấp theo nét đứt → dán các mép, trừ nắp → gấp nắp dưới, nắp trên và trang trí.',
    },
  ],
  takeaways: [
    'Hộp quà gấp từ hình khai triển của hình lập phương hoặc hình hộp chữ nhật; chân đế lịch là hình lăng trụ đứng tam giác nằm trên một mặt bên.',
    'Diện tích các mặt: hình lập phương $6a^2$; hình hộp chữ nhật $2(ab + bc + ca)$; lăng trụ đứng tam giác $C_{\\text{đáy}} \\cdot h + 2S_{\\text{đáy}}$.',
    'Bìa cần dùng $=$ diện tích các mặt $+$ diện tích mép dán; mép dán rộng $1$ cm dọc cạnh dài $\\ell$ cm có diện tích $\\ell - 1$ cm².',
    'Tờ bìa phải đủ cả diện tích lẫn chiều dài, chiều rộng để chứa hình khai triển.',
  ],
};
