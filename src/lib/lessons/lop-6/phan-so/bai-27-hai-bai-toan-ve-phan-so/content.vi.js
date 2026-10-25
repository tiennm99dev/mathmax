/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hai bài toán về phân số: tìm giá trị phân số của một số cho trước và tìm một số khi biết giá trị một phân số của nó.',
  intro:
    'Lớp 6A có $40$ học sinh, trong đó $\\frac{3}{5}$ số học sinh thích bóng đá. Có bao nhiêu bạn thích bóng đá? Ngược lại, nếu chỉ biết $24$ bạn thích bóng đá và số đó bằng $\\frac{3}{5}$ số học sinh cả lớp, làm sao tìm lại sĩ số lớp? Hai câu hỏi này là hai bài toán cơ bản về phân số, và chúng là bài toán ngược của nhau.',
  objectives: [
    'Tìm giá trị phân số của một số cho trước: $\\frac{m}{n}$ của $a$ bằng $a \\cdot \\frac{m}{n}$.',
    'Tìm một số biết giá trị một phân số của nó: số có $\\frac{m}{n}$ bằng $b$ là $b : \\frac{m}{n}$.',
    'Nhận ra dạng bài toán trong các tình huống thực tế và giải bài toán nhiều bước.',
  ],
  sections: [
    {
      heading: 'Tìm giá trị phân số của một số',
      blocks: [
        {
          type: 'p',
          text: 'Muốn biết $\\frac{3}{5}$ của $40$ học sinh, ta chia $40$ thành $5$ phần bằng nhau, mỗi phần $40 : 5 = 8$ học sinh, rồi lấy $3$ phần: $8 \\cdot 3 = 24$ học sinh. Hai bước đó gộp lại thành một phép nhân: $40 \\cdot \\frac{3}{5} = \\frac{40 \\cdot 3}{5} = 24$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Muốn tìm $\\frac{m}{n}$ của số $a$ cho trước, ta tính $a \\cdot \\frac{m}{n}$ ($m \\in \\mathbb{N}$, $n \\in \\mathbb{N}^*$).',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Tỉ số phần trăm cũng là một phân số: $m\\%$ của $a$ là $a \\cdot \\frac{m}{100}$. Chẳng hạn $25\\%$ của $80$ là $80 \\cdot \\frac{25}{100} = 20$. Số $a$ có thể là một phân số: $\\frac{2}{3}$ của $\\frac{9}{4}$ giờ là $\\frac{9}{4} \\cdot \\frac{2}{3} = \\frac{3}{2}$ giờ.',
        },
      ],
    },
    {
      heading: 'Tìm một số biết giá trị phân số của nó',
      blocks: [
        {
          type: 'p',
          text: 'Biết $\\frac{3}{5}$ số học sinh của lớp là $24$ bạn. Ba phần bằng nhau ứng với $24$ bạn, nên một phần là $24 : 3 = 8$ bạn, và cả lớp gồm $5$ phần: $8 \\cdot 5 = 40$ bạn. Gộp lại: $24 \\cdot \\frac{5}{3} = 40$, tức là $24 : \\frac{3}{5} = 40$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Muốn tìm một số biết $\\frac{m}{n}$ của nó bằng $b$, ta tính $b : \\frac{m}{n}$ ($m, n \\in \\mathbb{N}^*$).',
        },
        {
          type: 'table',
          caption: 'Phân biệt hai bài toán',
          head: ['Dạng', 'Đã biết', 'Cần tìm', 'Phép tính'],
          rows: [
            [
              'Bài toán 1',
              'Cả số $a$ và phân số $\\frac{m}{n}$',
              '$\\frac{m}{n}$ của $a$',
              '$a \\cdot \\frac{m}{n}$',
            ],
            [
              'Bài toán 2',
              'Giá trị $b$ ứng với phân số $\\frac{m}{n}$',
              'Cả số',
              '$b : \\frac{m}{n}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Hãy hỏi: số đã cho là "cả số" hay là "một phần của số"? Với "$\\frac{2}{7}$ cuốn sách là $42$ trang", số $42$ chỉ là một phần, nên ta chia: $42 : \\frac{2}{7} = 147$ trang. Nếu lại nhân, $42 \\cdot \\frac{2}{7} = 12$ trang, nhỏ hơn cả phần đã đọc, là vô lí.',
        },
      ],
    },
  ],
  explore: {
    title: 'Sơ đồ đoạn thẳng hai chiều',
    instruction:
      'Chọn số phần $n$ và số đã biết, kéo tam giác cam để chọn số phần được lấy $m$. Nhập số cần tìm rồi bấm "Kiểm tra", hoặc xem lời giải từng bước. Bấm "Đổi chiều bài toán" để giữ nguyên sơ đồ nhưng đổi chỗ số đã biết và số cần tìm: em sẽ thấy bài toán 2 là bài toán ngược của bài toán 1.',
  },
  examples: [
    {
      problem: 'Tìm $\\frac{3}{5}$ của $60$.',
      steps: [
        'Đây là bài toán tìm giá trị phân số của một số, nên ta nhân: $60 \\cdot \\frac{3}{5}$.',
        '$60 \\cdot \\frac{3}{5} = \\frac{60 \\cdot 3}{5} = \\frac{180}{5} = 36$.',
      ],
      answer: '$\\frac{3}{5}$ của $60$ là $36$.',
    },
    {
      problem:
        'Mai đã đọc $\\frac{2}{7}$ cuốn sách, được $42$ trang. Hỏi cuốn sách có bao nhiêu trang?',
      steps: [
        'Biết $\\frac{2}{7}$ cuốn sách là $42$ trang, cần tìm cả cuốn: đây là bài toán tìm một số biết giá trị phân số của nó.',
        'Số trang của cuốn sách là $42 : \\frac{2}{7} = 42 \\cdot \\frac{7}{2} = 147$.',
      ],
      answer: 'Cuốn sách có $147$ trang.',
    },
    {
      problem:
        'Một tấm vải dài $24$ m. Lần thứ nhất cắt $\\frac{1}{3}$ tấm vải, lần thứ hai cắt $\\frac{3}{4}$ phần vải còn lại. Hỏi tấm vải còn lại bao nhiêu mét?',
      steps: [
        'Lần thứ nhất cắt $24 \\cdot \\frac{1}{3} = 8$ (m), còn lại $24 - 8 = 16$ (m).',
        'Lần thứ hai cắt $\\frac{3}{4}$ của $16$ m (không phải của $24$ m): $16 \\cdot \\frac{3}{4} = 12$ (m).',
        'Tấm vải còn lại $16 - 12 = 4$ (m).',
      ],
      answer: 'Tấm vải còn lại $4$ m.',
    },
    {
      problem:
        'Một người đi xe đạp, đi được $\\frac{2}{3}$ quãng đường thì còn $6$ km nữa mới đến nơi. Tính độ dài quãng đường.',
      steps: [
        'Phần quãng đường còn lại ứng với $1 - \\frac{2}{3} = \\frac{1}{3}$ quãng đường.',
        'Biết $\\frac{1}{3}$ quãng đường dài $6$ km, nên cả quãng đường dài $6 : \\frac{1}{3} = 6 \\cdot 3 = 18$ (km).',
      ],
      answer: 'Quãng đường dài $18$ km.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tìm $\\frac{2}{3}$ của $45$.',
      answer: 30,
      hints: ['Tìm giá trị phân số của một số: nhân số đó với phân số.'],
      solution: '$45 \\cdot \\frac{2}{3} = \\frac{90}{3} = 30$.',
    },
    {
      type: 'number',
      prompt: 'Tìm một số, biết $\\frac{3}{4}$ của nó bằng $27$.',
      answer: 36,
      hints: [
        'Số $27$ ứng với $\\frac{3}{4}$ của số cần tìm, nên ta chia.',
        'Tính $27 : \\frac{3}{4}$.',
      ],
      solution: '$27 : \\frac{3}{4} = 27 \\cdot \\frac{4}{3} = 36$.',
    },
    {
      type: 'number',
      prompt:
        'Một cửa hàng có $120$ kg gạo, đã bán được $75\\%$ số gạo đó. Cửa hàng đã bán bao nhiêu ki-lô-gam gạo?',
      answer: 90,
      unit: 'kg',
      hints: ['$75\\% = \\frac{75}{100} = \\frac{3}{4}$.', 'Tìm $\\frac{3}{4}$ của $120$.'],
      solution: '$120 \\cdot \\frac{75}{100} = 120 \\cdot \\frac{3}{4} = 90$ (kg).',
    },
    {
      type: 'number',
      prompt:
        'Số học sinh nữ của một lớp bằng $\\frac{3}{7}$ số học sinh cả lớp. Lớp đó có $15$ học sinh nữ. Hỏi lớp có bao nhiêu học sinh?',
      answer: 35,
      hints: ['Biết giá trị $15$ ứng với phân số $\\frac{3}{7}$, cần tìm cả lớp.'],
      solution: 'Số học sinh cả lớp là $15 : \\frac{3}{7} = 15 \\cdot \\frac{7}{3} = 35$.',
    },
    {
      type: 'choice',
      prompt:
        'Một bể chứa $1\\,200$ lít nước, người ta đã dùng $\\frac{3}{8}$ lượng nước trong bể. Phép tính nào cho số lít nước đã dùng?',
      options: [
        '$1\\,200 \\cdot \\frac{3}{8}$',
        '$1\\,200 : \\frac{3}{8}$',
        '$\\frac{3}{8} : 1\\,200$',
        '$1\\,200 \\cdot \\frac{8}{3}$',
      ],
      answer: 0,
      hints: ['Số $1\\,200$ là cả lượng nước, không phải một phần của nó.'],
      solution:
        'Cần tìm $\\frac{3}{8}$ của $1\\,200$ nên ta nhân: $1\\,200 \\cdot \\frac{3}{8} = 450$ lít. Các phép chia ứng với bài toán ngược, khi $1\\,200$ là giá trị của một phần.',
    },
    {
      type: 'fraction',
      prompt: 'Tìm $\\frac{3}{4}$ của $\\frac{2}{3}$ (viết kết quả dạng phân số tối giản).',
      answer: [1, 2],
      simplest: true,
      hints: ['Tính $\\frac{2}{3} \\cdot \\frac{3}{4}$ rồi rút gọn.'],
      solution: '$\\frac{2}{3} \\cdot \\frac{3}{4} = \\frac{6}{12} = \\frac{1}{2}$.',
    },
    {
      type: 'number',
      prompt:
        'An có $60$ viên bi. An cho Bình $\\frac{1}{4}$ số bi, rồi cho Cường $\\frac{2}{5}$ số bi còn lại. Hỏi An còn bao nhiêu viên bi?',
      answer: 27,
      hints: [
        'Tính số bi cho Bình và số bi còn lại trước.',
        'Phân số $\\frac{2}{5}$ là của số bi còn lại sau khi cho Bình, không phải của $60$.',
      ],
      solution:
        'Cho Bình $60 \\cdot \\frac{1}{4} = 15$ viên, còn $60 - 15 = 45$ viên. Cho Cường $45 \\cdot \\frac{2}{5} = 18$ viên. An còn $45 - 18 = 27$ viên bi.',
    },
    {
      type: 'number',
      prompt:
        'Sau khi giảm giá $\\frac{1}{5}$, một chiếc áo được bán với giá $240$ nghìn đồng. Hỏi giá ban đầu của chiếc áo là bao nhiêu nghìn đồng?',
      answer: 300,
      hints: [
        'Giá sau khi giảm ứng với $1 - \\frac{1}{5} = \\frac{4}{5}$ giá ban đầu.',
        'Tìm số có $\\frac{4}{5}$ bằng $240$.',
      ],
      solution:
        'Giá sau khi giảm bằng $\\frac{4}{5}$ giá ban đầu, nên giá ban đầu là $240 : \\frac{4}{5} = 240 \\cdot \\frac{5}{4} = 300$ nghìn đồng.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi bài toán với kết quả của nó.',
      left: [
        '$\\frac{2}{5}$ của $50$',
        'Số có $\\frac{2}{5}$ bằng $50$',
        '$\\frac{3}{10}$ của $50$',
      ],
      right: ['$20$', '$125$', '$15$', '$\\frac{4}{5}$'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Bài thứ nhất và thứ ba tìm giá trị phân số nên nhân; bài thứ hai biết giá trị một phần nên chia.',
      ],
      solution:
        '$50 \\cdot \\frac{2}{5} = 20$; $50 : \\frac{2}{5} = 50 \\cdot \\frac{5}{2} = 125$; $50 \\cdot \\frac{3}{10} = 15$.',
    },
  ],
  takeaways: [
    '$\\frac{m}{n}$ của $a$ là $a \\cdot \\frac{m}{n}$; $m\\%$ của $a$ là $a \\cdot \\frac{m}{100}$.',
    'Số có $\\frac{m}{n}$ bằng $b$ là $b : \\frac{m}{n}$.',
    'Trước khi tính, xác định số đã cho là cả số hay chỉ là giá trị của một phần.',
    'Trong bài toán nhiều bước, chú ý phân số là "của" đại lượng nào (cả số hay phần còn lại).',
  ],
};
