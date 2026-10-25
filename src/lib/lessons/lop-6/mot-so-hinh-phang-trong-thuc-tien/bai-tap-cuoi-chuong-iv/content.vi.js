/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương IV: hệ thống hoá các hình phẳng trong thực tiễn, trắc nghiệm và tự luận tổng hợp về đặc điểm, chu vi, diện tích, vận dụng giải toán thực tế.',
  intro:
    'Chương IV đưa em đi từ việc nhận biết các hình quen thuộc (tam giác đều, hình vuông, lục giác đều, hình chữ nhật, hình thoi, hình bình hành, hình thang cân) đến việc vẽ chúng và tính chu vi, diện tích. Bài cuối chương giúp em ôn lại toàn bộ và dùng chúng để giải các bài toán trong đời sống.',
  objectives: [
    'Hệ thống hoá đặc điểm về cạnh, góc, đường chéo của các hình đã học.',
    'Chọn đúng công thức chu vi, diện tích cho từng hình.',
    'Vận dụng vào bài toán thực tế: rào vườn, lát nền, sơn tường, thu hoạch.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Cạnh', 'Góc', 'Đường chéo'],
          rows: [
            ['Tam giác đều', 'Ba cạnh bằng nhau', 'Ba góc bằng nhau', 'Không có'],
            ['Hình vuông', 'Bốn cạnh bằng nhau, cạnh đối song song', 'Bốn góc vuông', 'Bằng nhau'],
            [
              'Lục giác đều',
              'Sáu cạnh bằng nhau',
              'Sáu góc bằng nhau',
              'Ba đường chéo chính bằng nhau',
            ],
            ['Hình chữ nhật', 'Cạnh đối bằng nhau và song song', 'Bốn góc vuông', 'Bằng nhau'],
            [
              'Hình thoi',
              'Bốn cạnh bằng nhau, cạnh đối song song',
              'Các góc đối bằng nhau',
              'Vuông góc với nhau',
            ],
            [
              'Hình bình hành',
              'Cạnh đối bằng nhau và song song',
              'Các góc đối bằng nhau',
              'Cắt nhau tại trung điểm mỗi đường',
            ],
            [
              'Hình thang cân',
              'Hai đáy song song, hai cạnh bên bằng nhau',
              'Hai góc kề một đáy bằng nhau',
              'Bằng nhau',
            ],
          ],
        },
        {
          type: 'table',
          head: ['Hình', 'Chu vi', 'Diện tích'],
          rows: [
            ['Hình vuông cạnh $a$', '$4a$', '$a^2$'],
            ['Hình chữ nhật $a$, $b$', '$2(a + b)$', '$a \\cdot b$'],
            ['Hình thoi cạnh $a$, đường chéo $m$, $n$', '$4a$', '$\\frac{1}{2} m \\cdot n$'],
            ['Hình bình hành $a$, $b$, chiều cao $h$ ứng với $a$', '$2(a + b)$', '$a \\cdot h$'],
            [
              'Hình thang đáy $a$, $b$, chiều cao $h$',
              'Tổng bốn cạnh',
              '$\\dfrac{(a + b) \\cdot h}{2}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bài kiểm tra bên dưới có $12$ câu tự sinh, chia đều cho Bài 18, Bài 19, Bài 20 và các bài toán thực tế. Bản đồ kĩ năng tô màu theo kết quả lần làm đầu của từng phần, để em biết phần nào cần ôn lại.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương với bản đồ kĩ năng',
    instruction:
      'Nhập đáp số (số tự nhiên) rồi bấm "Kiểm tra". Sai lần đầu em được gợi ý và làm lại; sai lần nữa thì xem lời giải. Cuối bài, ô màu đỏ hoặc vàng trên bản đồ kĩ năng chỉ ra bài em nên ôn lại.',
  },
  examples: [
    {
      problem:
        'Một hình thoi có chu vi $52$ cm và hai đường chéo dài $10$ cm và $24$ cm. Tính cạnh và diện tích hình thoi.',
      steps: [
        'Hình thoi có bốn cạnh bằng nhau: cạnh $= 52 : 4 = 13$ (cm).',
        'Diện tích: $S = \\frac{1}{2} \\cdot 10 \\cdot 24 = 120$ ($\\text{cm}^2$).',
      ],
      answer: 'Cạnh $13$ cm, diện tích $120\\ \\text{cm}^2$.',
    },
    {
      problem:
        'Một bức tường hình chữ nhật dài $5$ m, cao $3$ m có một ô cửa sổ hình vuông cạnh $1$ m. Sơn mỗi mét vuông tường hết $20$ nghìn đồng. Tính số tiền sơn bức tường (không sơn cửa sổ).',
      steps: [
        'Diện tích bức tường: $5 \\cdot 3 = 15$ ($\\text{m}^2$).',
        'Diện tích cửa sổ: $1 \\cdot 1 = 1$ ($\\text{m}^2$).',
        'Diện tích cần sơn: $15 - 1 = 14$ ($\\text{m}^2$).',
        'Tiền sơn: $14 \\cdot 20 = 280$ (nghìn đồng).',
      ],
      answer: '$280$ nghìn đồng.',
    },
    {
      problem:
        'Một khu vườn hình vuông cạnh $20$ m. Người ta làm một lối đi rộng $1$ m chạy quanh vườn, sát mép bên trong. Tính diện tích lối đi.',
      steps: [
        'Phần vườn bên trong lối đi là hình vuông cạnh $20 - 1 - 1 = 18$ (m).',
        'Diện tích cả khu vườn: $20 \\cdot 20 = 400$ ($\\text{m}^2$).',
        'Diện tích phần bên trong: $18 \\cdot 18 = 324$ ($\\text{m}^2$).',
        'Diện tích lối đi: $400 - 324 = 76$ ($\\text{m}^2$).',
      ],
      answer: '$76\\ \\text{m}^2$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hình nào có hai đường chéo vừa bằng nhau vừa vuông góc với nhau?',
      options: ['Hình chữ nhật', 'Hình thoi', 'Hình thang cân', 'Hình vuông'],
      answer: 3,
      hints: [
        'Đường chéo bằng nhau: hình chữ nhật. Đường chéo vuông góc: hình thoi. Hình nào có cả hai?',
      ],
      solution:
        'Hình vuông có mọi đặc điểm của hình chữ nhật và hình thoi, nên hai đường chéo vừa bằng nhau vừa vuông góc.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các hình luôn có hai cặp cạnh đối song song.',
      options: [
        'Hình chữ nhật',
        'Hình thoi',
        'Hình bình hành',
        'Hình thang cân',
        'Hình vuông',
        'Tam giác đều',
      ],
      answers: [0, 1, 2, 4],
      hints: ['Hình thang cân chỉ có hai đáy song song.', 'Tam giác chỉ có ba cạnh.'],
      solution:
        'Hình chữ nhật, hình thoi, hình bình hành, hình vuông có hai cặp cạnh đối song song. Hình thang cân chỉ có một cặp (hai đáy); tam giác đều không có cạnh song song.',
    },
    {
      type: 'number',
      prompt: 'Một tam giác đều có chu vi $27$ cm. Mỗi cạnh dài bao nhiêu xăng-ti-mét?',
      answer: 9,
      unit: 'cm',
      hints: ['Tam giác đều có ba cạnh bằng nhau.'],
      solution: 'Cạnh: $27 : 3 = 9$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Hình lục giác đều $ABCDEF$ ghép từ sáu tam giác đều cạnh $8$ cm. Tính tổng độ dài ba đường chéo chính $AD + BE + CF$.',
      answer: 48,
      unit: 'cm',
      hints: ['Mỗi đường chéo chính gồm hai cạnh tam giác đều.'],
      solution: 'Mỗi đường chéo chính dài $2 \\cdot 8 = 16$ (cm). Tổng: $3 \\cdot 16 = 48$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Hình chữ nhật $ABCD$ có $AB = 8$ cm, $BC = 6$ cm và đường chéo $AC = 10$ cm. Tính tổng hai đường chéo $AC + BD$.',
      answer: 20,
      unit: 'cm',
      hints: ['Hai đường chéo của hình chữ nhật bằng nhau.'],
      solution: '$BD = AC = 10$ cm, nên $AC + BD = 20$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Một hình bình hành có cạnh đáy $15$ dm, chiều cao tương ứng bằng $\\frac{1}{3}$ cạnh đáy. Tính diện tích hình bình hành.',
      answer: 75,
      unit: 'dm²',
      hints: ['Chiều cao: $15 : 3$.', '$S = a \\cdot h$.'],
      solution: 'Chiều cao: $15 : 3 = 5$ (dm). Diện tích: $15 \\cdot 5 = 75$ ($\\text{dm}^2$).',
    },
    {
      type: 'number',
      prompt: 'Một hình thoi có hai đường chéo $12$ cm và $9$ cm. Tính diện tích hình thoi.',
      answer: 54,
      unit: 'cm²',
      hints: ['$S = \\frac{1}{2} m \\cdot n$.'],
      solution: '$S = \\frac{1}{2} \\cdot 12 \\cdot 9 = 54$ ($\\text{cm}^2$).',
    },
    {
      type: 'number',
      prompt:
        'Một thửa ruộng hình thang có hai đáy $30$ m, $20$ m và chiều cao $12$ m. Trung bình mỗi mét vuông thu được $0{,}5$ kg thóc. Cả thửa ruộng thu được bao nhiêu ki-lô-gam thóc?',
      answer: 150,
      unit: 'kg',
      hints: ['Tính diện tích thửa ruộng trước.', 'Rồi nhân với $0{,}5$.'],
      solution:
        'Diện tích: $\\dfrac{(30 + 20) \\cdot 12}{2} = 300$ ($\\text{m}^2$). Số thóc: $300 \\cdot 0{,}5 = 150$ (kg).',
    },
    {
      type: 'number',
      prompt:
        'Nền một căn phòng hình chữ nhật dài $5$ m, rộng $4$ m được lát bằng gạch hình vuông cạnh $50$ cm. Cần bao nhiêu viên gạch?',
      answer: 80,
      unit: 'viên',
      hints: [
        'Một hàng dọc theo chiều dài cần $500 : 50$ viên.',
        'Số hàng theo chiều rộng: $400 : 50$.',
      ],
      solution:
        'Theo chiều dài cần $500 : 50 = 10$ viên, theo chiều rộng cần $400 : 50 = 8$ hàng. Tổng: $10 \\cdot 8 = 80$ (viên).',
    },
    {
      type: 'number',
      prompt:
        'Một khu vườn hình vuông cạnh $15$ m có lối đi rộng $1$ m chạy quanh, sát mép bên trong. Tính diện tích lối đi.',
      answer: 56,
      unit: 'm²',
      hints: [
        'Phần bên trong là hình vuông cạnh $15 - 2$.',
        'Lấy diện tích cả vườn trừ phần bên trong.',
      ],
      solution:
        'Cả vườn: $15 \\cdot 15 = 225$ ($\\text{m}^2$). Bên trong: $13 \\cdot 13 = 169$ ($\\text{m}^2$). Lối đi: $225 - 169 = 56$ ($\\text{m}^2$).',
    },
    {
      type: 'choice',
      prompt:
        'Một hình chữ nhật và một hình bình hành có cùng cạnh đáy $6$ cm và cùng chiều cao $4$ cm. So sánh diện tích của chúng.',
      options: [
        'Hình chữ nhật lớn hơn',
        'Hình bình hành lớn hơn',
        'Bằng nhau',
        'Không so sánh được',
      ],
      answer: 2,
      hints: ['Hình bình hành cắt ghép được thành hình chữ nhật có cùng đáy và chiều cao.'],
      solution: 'Cả hai đều có diện tích $6 \\cdot 4 = 24$ ($\\text{cm}^2$), nên bằng nhau.',
    },
    {
      type: 'text',
      prompt: 'Ghép sáu tam giác đều bằng nhau có chung một đỉnh, ta được hình gì?',
      accept: ['hình lục giác đều', 'lục giác đều'],
      hints: ['Hình có sáu cạnh bằng nhau.'],
      solution: 'Ta được hình lục giác đều.',
    },
  ],
  takeaways: [
    'Mỗi hình được nhận biết qua đặc điểm về cạnh, góc và đường chéo; hình vuông có đủ đặc điểm của hình chữ nhật và hình thoi.',
    'Chu vi đo đường bao, diện tích đo phần bên trong; đổi về cùng đơn vị trước khi tính.',
    'Diện tích hình bình hành, hình thoi, hình thang được suy ra bằng cắt ghép về hình chữ nhật hoặc hình bình hành.',
    'Hình phức tạp: chia thành các hình đã học, hoặc lấy hình lớn trừ phần bị bỏ đi.',
  ],
};
