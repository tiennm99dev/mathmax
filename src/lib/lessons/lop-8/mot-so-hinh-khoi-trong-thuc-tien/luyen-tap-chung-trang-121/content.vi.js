/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về hình chóp tam giác đều và hình chóp tứ giác đều: nhận biết các yếu tố, tính trung đoạn, diện tích xung quanh, diện tích toàn phần và thể tích.',
  intro:
    'Hai bài vừa học có chung một khung: hình chóp đều có đáy là đa giác đều, các mặt bên là những tam giác cân bằng nhau chung đỉnh, diện tích xung quanh bằng nửa chu vi đáy nhân trung đoạn và thể tích bằng một phần ba diện tích đáy nhân chiều cao. Bài luyện tập này giúp em dùng thành thạo các công thức đó cho cả hai loại hình chóp, kể cả khi phải tìm trung đoạn bằng định lí Pythagore.',
  objectives: [
    'So sánh các yếu tố của hình chóp tam giác đều và hình chóp tứ giác đều.',
    'Tính diện tích xung quanh, diện tích toàn phần và thể tích; tính ngược một đại lượng khi biết các đại lượng còn lại.',
    'Tìm trung đoạn từ chiều cao hoặc cạnh bên bằng định lí Pythagore.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          caption: 'Hai loại hình chóp đều có cạnh đáy $a$, trung đoạn $d$, chiều cao $h$',
          head: ['Yếu tố', 'Hình chóp tam giác đều', 'Hình chóp tứ giác đều'],
          rows: [
            ['Mặt đáy', 'Tam giác đều', 'Hình vuông'],
            ['Mặt bên', '$3$ tam giác cân bằng nhau', '$4$ tam giác cân bằng nhau'],
            ['Số đỉnh, cạnh, mặt', '$4$; $6$; $4$', '$5$; $8$; $5$'],
            ['Chân đường cao $H$', 'Trọng tâm tam giác đáy', 'Giao điểm hai đường chéo của đáy'],
            ['Nửa chu vi đáy $p$', '$\\dfrac{3a}{2}$', '$2a$'],
            ['Diện tích xung quanh', '$S_{xq} = p \\cdot d$', '$S_{xq} = p \\cdot d$'],
            ['Thể tích', '$V = \\dfrac{1}{3} S \\cdot h$', '$V = \\dfrac{1}{3} a^2 \\cdot h$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tìm trung đoạn',
          text: 'Trung đoạn $d = SI$ ($I$ là trung điểm một cạnh đáy). Biết cạnh bên: trong tam giác vuông $SIA$, $d^2 = SA^2 - \\left(\\dfrac{a}{2}\\right)^2$. Với hình chóp tứ giác đều, biết chiều cao: trong tam giác vuông $SHI$, $d^2 = h^2 + \\left(\\dfrac{a}{2}\\right)^2$.',
        },
      ],
    },
    {
      heading: 'Các dạng bài thường gặp',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Nhận biết hình chóp đều và gọi tên đỉnh, cạnh, mặt, đường cao, trung đoạn.',
            'Tính $S_{xq}$, $S_{tp}$ khi biết cạnh đáy và trung đoạn; tính trung đoạn khi biết $S_{xq}$.',
            'Tính thể tích khi biết diện tích đáy (hoặc cạnh đáy) và chiều cao; tính chiều cao khi biết thể tích: $h = \\dfrac{3V}{S}$.',
            'Tìm trung đoạn bằng định lí Pythagore rồi tính diện tích.',
            'Bài toán thực tế: giấy, vải, bìa (diện tích) và sức chứa (thể tích).',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Thể tích dùng chiều cao $h$ của hình chóp, còn diện tích xung quanh dùng trung đoạn $d$. Hai độ dài này khác nhau ($d > h$), đừng dùng lẫn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện hình chóp đều',
    instruction:
      'Mỗi lượt có $8$ câu trộn ngẫu nhiên về hình chóp tam giác đều và hình chóp tứ giác đều. Nhập kết quả (có thể kèm đơn vị). Trả lời sai lần đầu sẽ có gợi ý và một lần thử nữa; sai lần hai sẽ hiện lời giải từng bước.',
  },
  examples: [
    {
      problem:
        'Một hộp quà có dạng hình chóp tứ giác đều, cạnh đáy $10$ cm, chiều cao $12$ cm. Tính diện tích bìa để làm hộp (kể cả đáy, bỏ qua mép dán) và thể tích của hộp.',
      steps: [
        'Gọi $I$ là trung điểm một cạnh đáy: $HI = 5$ cm, tam giác $SHI$ vuông tại $H$.',
        '$d^2 = 12^2 + 5^2 = 169$, nên $d = 13$ cm.',
        '$S_{xq} = p \\cdot d = 20 \\cdot 13 = 260$ (cm²); $S_{tp} = 260 + 10^2 = 360$ (cm²).',
        '$V = \\dfrac{1}{3} \\cdot 10^2 \\cdot 12 = 400$ (cm³).',
      ],
      answer: 'Cần $360$ cm² bìa; thể tích hộp là $400$ cm³.',
    },
    {
      problem:
        'Hình chóp tam giác đều có cạnh đáy $8$ cm và cạnh bên $5$ cm. Tính diện tích xung quanh.',
      steps: [
        'Trung đoạn là đường cao của mặt bên cân, chia cạnh đáy thành hai đoạn $4$ cm.',
        '$d^2 = 5^2 - 4^2 = 9$, nên $d = 3$ cm.',
        '$p = \\dfrac{3 \\cdot 8}{2} = 12$ (cm); $S_{xq} = 12 \\cdot 3 = 36$ (cm²).',
      ],
      answer: '$S_{xq} = 36$ cm².',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Tính diện tích xung quanh của hình chóp tam giác đều có cạnh đáy $8$ cm và trung đoạn $6$ cm.',
      answer: 72,
      unit: 'cm²',
      hints: ['Nửa chu vi đáy $p = \\dfrac{3a}{2}$.'],
      solution: '$p = \\dfrac{3 \\cdot 8}{2} = 12$ (cm). $S_{xq} = 12 \\cdot 6 = 72$ (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Tính diện tích toàn phần của hình chóp tứ giác đều có cạnh đáy $8$ cm và trung đoạn $6$ cm.',
      answer: 160,
      unit: 'cm²',
      hints: ['$S_{tp} = S_{xq} + S_{\\text{đáy}}$.', 'Nửa chu vi đáy hình vuông là $2a$.'],
      solution:
        '$p = 16$ cm, $S_{xq} = 16 \\cdot 6 = 96$ (cm²). $S_{\\text{đáy}} = 8^2 = 64$ (cm²). $S_{tp} = 96 + 64 = 160$ (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Mái một ngôi nhà nhỏ có dạng hình chóp tứ giác đều, cạnh đáy $12$ m, chiều cao $8$ m. Tính diện tích mái (bốn mặt bên).',
      answer: 240,
      unit: 'm²',
      hints: [
        'Tìm trung đoạn trước: tam giác $SHI$ vuông tại $H$ với $HI = 6$ m.',
        'Rồi $S_{xq} = p \\cdot d$ với $p = 2a$.',
      ],
      solution:
        '$d^2 = 8^2 + 6^2 = 100$, $d = 10$ m. $p = 2 \\cdot 12 = 24$ (m). $S_{xq} = 24 \\cdot 10 = 240$ (m²).',
    },
    {
      type: 'number',
      prompt: 'Tính thể tích của hình chóp tứ giác đều có cạnh đáy $12$ cm và chiều cao $8$ cm.',
      answer: 384,
      unit: 'cm³',
      hints: ['$V = \\dfrac{1}{3} a^2 \\cdot h$.'],
      solution: '$V = \\dfrac{1}{3} \\cdot 144 \\cdot 8 = 48 \\cdot 8 = 384$ (cm³).',
    },
    {
      type: 'number',
      prompt:
        'Một hình chóp tam giác đều có diện tích đáy $27$ cm² và chiều cao $10$ cm. Tính thể tích.',
      answer: 90,
      unit: 'cm³',
      hints: ['$V = \\dfrac{1}{3} S \\cdot h$.'],
      solution: '$V = \\dfrac{1}{3} \\cdot 27 \\cdot 10 = 9 \\cdot 10 = 90$ (cm³).',
    },
    {
      type: 'choice',
      prompt:
        'Một hình chóp tứ giác đều có thể tích $120$ cm³. Hình hộp chữ nhật có cùng đáy và cùng chiều cao với nó có thể tích bao nhiêu?',
      options: ['$40$ cm³', '$120$ cm³', '$360$ cm³', '$240$ cm³'],
      answer: 2,
      hints: ['Thể tích hình chóp bằng mấy phần thể tích hình hộp cùng đáy, cùng chiều cao?'],
      solution:
        '$V_{\\text{chóp}} = \\dfrac{1}{3} V_{\\text{hộp}}$, nên $V_{\\text{hộp}} = 3 \\cdot 120 = 360$ (cm³). Đáp án $40$ cm³ là nhầm chiều: chia thay vì nhân.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        'Hình chóp tam giác đều có $4$ mặt.',
        'Hình chóp tứ giác đều có $8$ cạnh.',
        'Cả hai loại hình chóp đều có $S_{xq} = p \\cdot d$.',
        'Hình chóp tứ giác đều có $4$ đỉnh.',
        'Mặt bên của hình chóp tứ giác đều luôn là tam giác đều.',
      ],
      answers: [0, 1, 2],
      hints: [
        'Đếm cả đỉnh $S$ khi đếm số đỉnh.',
        'Mặt bên là tam giác cân, chưa chắc là tam giác đều.',
      ],
      solution:
        'Đúng: chóp tam giác đều có $4$ mặt; chóp tứ giác đều có $8$ cạnh; cả hai có $S_{xq} = p \\cdot d$. Sai: chóp tứ giác đều có $5$ đỉnh ($S, A, B, C, D$); mặt bên là tam giác cân, chỉ là tam giác đều khi cạnh bên bằng cạnh đáy.',
    },
    {
      type: 'number',
      prompt:
        'Giữ nguyên đáy của một hình chóp tứ giác đều và tăng chiều cao lên gấp đôi. Thể tích mới gấp mấy lần thể tích cũ?',
      answer: 2,
      hints: ['$V = \\dfrac{1}{3} a^2 \\cdot h$ tỉ lệ thuận với $h$ khi $a$ không đổi.'],
      solution:
        "$V' = \\dfrac{1}{3} a^2 \\cdot (2h) = 2 \\cdot \\dfrac{1}{3} a^2 h = 2V$: thể tích gấp $2$ lần.",
    },
    {
      type: 'number',
      prompt:
        'Giữ nguyên chiều cao của một hình chóp tứ giác đều và tăng cạnh đáy lên gấp đôi. Thể tích mới gấp mấy lần thể tích cũ?',
      answer: 4,
      hints: ['Diện tích đáy là $a^2$; cạnh gấp đôi thì diện tích gấp mấy lần?'],
      solution:
        "$V' = \\dfrac{1}{3} (2a)^2 \\cdot h = 4 \\cdot \\dfrac{1}{3} a^2 h = 4V$: thể tích gấp $4$ lần.",
    },
    {
      type: 'match',
      prompt:
        'Nối mỗi đại lượng với công thức của nó (cạnh đáy $a$, diện tích đáy $S$, chiều cao $h$).',
      left: [
        'Nửa chu vi đáy hình chóp tam giác đều',
        'Nửa chu vi đáy hình chóp tứ giác đều',
        'Diện tích đáy hình chóp tứ giác đều',
        'Thể tích hình chóp đều',
      ],
      right: ['$\\dfrac{3a}{2}$', '$2a$', '$a^2$', '$\\dfrac{1}{3} S \\cdot h$', '$S \\cdot h$'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Chu vi tam giác đều là $3a$, chu vi hình vuông là $4a$.',
        '$S \\cdot h$ là thể tích hình lăng trụ, không phải hình chóp.',
      ],
      solution:
        'Nửa chu vi: $\\dfrac{3a}{2}$ (tam giác đều) và $2a$ (hình vuông). Đáy vuông có diện tích $a^2$. Thể tích hình chóp: $\\dfrac{1}{3} S \\cdot h$.',
    },
  ],
  takeaways: [
    'Hai loại hình chóp đều dùng chung $S_{xq} = p \\cdot d$ và $V = \\dfrac{1}{3} S \\cdot h$; chỉ khác nửa chu vi và diện tích đáy.',
    'Trung đoạn tìm bằng định lí Pythagore: $d^2 = SA^2 - \\left(\\dfrac{a}{2}\\right)^2$ hoặc (chóp tứ giác đều) $d^2 = h^2 + \\left(\\dfrac{a}{2}\\right)^2$.',
    'Diện tích dùng trung đoạn $d$, thể tích dùng chiều cao $h$.',
  ],
};
