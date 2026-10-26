/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương X: hệ thống hoá hình hộp chữ nhật, hình lập phương, hình lăng trụ đứng tam giác và tứ giác, với bài tập trắc nghiệm, tự luận và bài toán thực tế.',
  intro:
    'Chương X giới thiệu bốn hình khối quen thuộc: hình hộp chữ nhật, hình lập phương, hình lăng trụ đứng tam giác và hình lăng trụ đứng tứ giác. Bài này tổng kết các yếu tố và công thức của chúng, rồi luyện tập tổng hợp để em biết mình còn cần ôn phần nào.',
  objectives: [
    'Hệ thống lại đỉnh, cạnh, mặt và công thức diện tích xung quanh, thể tích của các hình trong chương.',
    'Giải các bài tập trắc nghiệm và tự luận tổng hợp.',
    'Vận dụng vào bài toán thực tế có đổi đơn vị.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Đỉnh · cạnh · mặt', '$S_{xq}$', '$V$'],
          rows: [
            [
              'Hình hộp chữ nhật $a, b, c$',
              '$8 \\cdot 12 \\cdot 6$',
              '$2(a + b)\\cdot c$',
              '$a\\cdot b\\cdot c$',
            ],
            ['Hình lập phương cạnh $a$', '$8 \\cdot 12 \\cdot 6$', '$4a^2$', '$a^3$'],
            [
              'Lăng trụ đứng tam giác',
              '$6 \\cdot 9 \\cdot 5$',
              '$C_{\\text{đáy}}\\cdot h$',
              '$S_{\\text{đáy}}\\cdot h$',
            ],
            [
              'Lăng trụ đứng tứ giác',
              '$8 \\cdot 12 \\cdot 6$',
              '$C_{\\text{đáy}}\\cdot h$',
              '$S_{\\text{đáy}}\\cdot h$',
            ],
          ],
          caption: 'Các hình trong chương và công thức của chúng',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Hình hộp chữ nhật và hình lập phương là hình lăng trụ đứng tứ giác có đáy là hình chữ nhật (hình vuông), nên hai công thức $S_{xq} = C_{\\text{đáy}}\\cdot h$ và $V = S_{\\text{đáy}}\\cdot h$ dùng được cho mọi hình trong chương.',
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
            'Nhận biết hình và các yếu tố: đỉnh, cạnh, mặt đáy, mặt bên, đường chéo, chiều cao.',
            'Tính diện tích xung quanh, tổng diện tích các mặt và thể tích.',
            'Tìm một kích thước khi biết diện tích xung quanh hoặc thể tích.',
            'Bài toán thực tế: sơn tường, làm hộp, bể nước, máng nước, đổi đơn vị $1\\ \\text{dm}^3 = 1$ lít.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Diện tích xung quanh chỉ gồm các mặt bên. Khi đề hỏi diện tích làm hộp, bìa, kính, hãy xác định có bao nhiêu mặt đáy cần cộng thêm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Mỗi lượt có hai câu cho từng kĩ năng của Bài 36 và Bài 37. Bản đồ kĩ năng tô màu theo kết quả lần trả lời đầu tiên và chỉ ra phần em cần ôn lại.',
  },
  examples: [
    {
      problem:
        "Một khối gỗ hình hộp chữ nhật dài $10$ cm, rộng $8$ cm, cao $6$ cm. Người ta cắt khối gỗ theo mặt phẳng đi qua hai cạnh đối diện $AB$ và $C'D'$, được hai khối hình lăng trụ đứng tam giác bằng nhau. Tính thể tích mỗi khối.",
      steps: [
        'Thể tích khối gỗ: $V = 10\\cdot 8\\cdot 6 = 480\\ (\\text{cm}^3)$.',
        'Hai khối bằng nhau nên mỗi khối có thể tích $480 : 2 = 240\\ (\\text{cm}^3)$.',
        'Kiểm tra bằng công thức lăng trụ: đáy là tam giác vuông có hai cạnh góc vuông $8$ cm và $6$ cm, chiều cao lăng trụ $10$ cm: $V = \\dfrac{1}{2}\\cdot 8\\cdot 6\\cdot 10 = 240\\ (\\text{cm}^3)$.',
      ],
      answer: 'Mỗi khối có thể tích $240\\ \\text{cm}^3$.',
    },
    {
      problem:
        'Một bể nước hình hộp chữ nhật có lòng trong dài $2$ m, rộng $1{,}5$ m, cao $1$ m, đang chứa $1\\,800$ lít nước. Mực nước trong bể cao bao nhiêu?',
      steps: [
        'Đổi $1\\,800$ lít $= 1\\,800\\ \\text{dm}^3 = 1{,}8\\ \\text{m}^3$.',
        'Diện tích đáy bể: $2\\cdot 1{,}5 = 3\\ (\\text{m}^2)$.',
        'Chiều cao mực nước: $1{,}8 : 3 = 0{,}6$ (m).',
      ],
      answer: 'Mực nước cao $0{,}6$ m, tức $60$ cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hình nào có $6$ mặt đều là hình vuông?',
      options: [
        'Hình hộp chữ nhật bất kì',
        'Hình lập phương',
        'Hình lăng trụ đứng tam giác',
        'Hình lăng trụ đứng tứ giác bất kì',
      ],
      answer: 1,
      hints: ['Hình nào có ba kích thước bằng nhau?'],
      solution: 'Chỉ hình lập phương có $6$ mặt đều là hình vuông.',
    },
    {
      type: 'choice',
      prompt: 'Hình lăng trụ đứng tam giác có bao nhiêu cạnh?',
      options: ['$6$', '$8$', '$9$', '$12$'],
      answer: 2,
      hints: ['Mỗi đáy có $3$ cạnh; thêm các cạnh bên.'],
      solution: '$3 + 3 + 3 = 9$ cạnh.',
    },
    {
      type: 'multi',
      prompt: 'Những hình nào sau đây là hình lăng trụ đứng tứ giác?',
      options: [
        'Hình hộp chữ nhật',
        'Hình lập phương',
        'Hình lăng trụ đứng có đáy là hình thang',
        'Hình lăng trụ đứng tam giác',
      ],
      answers: [0, 1, 2],
      hints: ['Lăng trụ đứng tứ giác có đáy là một tứ giác.'],
      solution:
        'Hình hộp chữ nhật, hình lập phương và lăng trụ có đáy hình thang đều có đáy là tứ giác, mặt bên là hình chữ nhật. Lăng trụ đứng tam giác có đáy là tam giác.',
    },
    {
      type: 'number',
      prompt: 'Tính thể tích của hình hộp chữ nhật dài $9$ cm, rộng $6$ cm, cao $5$ cm.',
      answer: 270,
      unit: 'cm³',
      hints: ['$V = a\\cdot b\\cdot c$.'],
      solution: '$V = 9\\cdot 6\\cdot 5 = 270\\ (\\text{cm}^3)$.',
    },
    {
      type: 'number',
      prompt:
        'Tính diện tích xung quanh của hình hộp chữ nhật dài $9$ cm, rộng $6$ cm, cao $5$ cm.',
      answer: 150,
      unit: 'cm²',
      hints: ['$S_{xq} = 2(a + b)\\cdot c$.'],
      solution: '$S_{xq} = 2\\cdot(9 + 6)\\cdot 5 = 150\\ (\\text{cm}^2)$.',
    },
    {
      type: 'number',
      prompt:
        'Một hình lập phương có diện tích xung quanh $196\\ \\text{cm}^2$. Tính thể tích của nó.',
      answer: 343,
      unit: 'cm³',
      hints: ['$a^2 = 196 : 4$.', '$a^2 = 49$.'],
      solution: '$a^2 = 196 : 4 = 49$ nên $a = 7$ cm; $V = 7^3 = 343\\ (\\text{cm}^3)$.',
    },
    {
      type: 'number',
      prompt:
        'Hình lăng trụ đứng tam giác có các cạnh đáy $7$ cm, $8$ cm, $9$ cm và chiều cao $10$ cm. Tính diện tích xung quanh.',
      answer: 240,
      unit: 'cm²',
      hints: ['$S_{xq} = C_{\\text{đáy}}\\cdot h$.'],
      solution: '$S_{xq} = (7 + 8 + 9)\\cdot 10 = 240\\ (\\text{cm}^2)$.',
    },
    {
      type: 'number',
      prompt:
        'Hình lăng trụ đứng có đáy là tam giác vuông với hai cạnh góc vuông $5$ cm, $12$ cm (cạnh huyền $13$ cm) và chiều cao lăng trụ $7$ cm. Tính thể tích.',
      answer: 210,
      unit: 'cm³',
      hints: ['Cạnh huyền không cần để tính diện tích đáy.'],
      solution:
        '$S_{\\text{đáy}} = \\dfrac{1}{2}\\cdot 5\\cdot 12 = 30\\ (\\text{cm}^2)$, $V = 30\\cdot 7 = 210\\ (\\text{cm}^3)$.',
    },
    {
      type: 'number',
      prompt:
        'Hình lăng trụ đứng tứ giác có đáy là hình thang cân với hai đáy $4$ cm, $10$ cm, chiều cao hình thang $4$ cm, hai cạnh bên $5$ cm; chiều cao lăng trụ $8$ cm. Tính thể tích.',
      answer: 224,
      unit: 'cm³',
      hints: ['Tính diện tích hình thang trước.', '$S_{\\text{đáy}} = (4 + 10)\\cdot 4 : 2$.'],
      solution:
        '$S_{\\text{đáy}} = \\dfrac{(4 + 10)\\cdot 4}{2} = 28\\ (\\text{cm}^2)$, $V = 28\\cdot 8 = 224\\ (\\text{cm}^3)$.',
    },
    {
      type: 'number',
      prompt:
        'Một khối hình lăng trụ đứng tứ giác có đáy là hình chữ nhật $10$ cm $\\times$ $6$ cm và thể tích $600\\ \\text{cm}^3$. Tính chiều cao của khối.',
      answer: 10,
      unit: 'cm',
      hints: ['$h = V : S_{\\text{đáy}}$.'],
      solution: '$S_{\\text{đáy}} = 60\\ \\text{cm}^2$, $h = 600 : 60 = 10$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Một thùng hình hộp chữ nhật có lòng trong dài $60$ cm, rộng $40$ cm, cao $50$ cm. Thùng chứa được bao nhiêu lít nước?',
      answer: 120,
      unit: 'lít',
      hints: ['Tính thể tích bằng $\\text{cm}^3$ rồi chia cho $1\\,000$.'],
      solution: '$V = 60\\cdot 40\\cdot 50 = 120\\,000\\ (\\text{cm}^3) = 120$ lít.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các khối theo thể tích từ nhỏ đến lớn.',
      items: [
        'Hình lập phương cạnh $5$ cm',
        'Hình hộp chữ nhật $10$ cm $\\times$ $4$ cm $\\times$ $3$ cm',
        'Lăng trụ đứng đáy tam giác vuông có hai cạnh góc vuông $6$ cm, $8$ cm, chiều cao $6$ cm',
      ],
      answer: [1, 0, 2],
      hints: ['Tính thể tích từng khối.'],
      solution:
        'Thể tích: $5^3 = 125\\ \\text{cm}^3$; $10\\cdot 4\\cdot 3 = 120\\ \\text{cm}^3$; $\\dfrac{1}{2}\\cdot 6\\cdot 8\\cdot 6 = 144\\ \\text{cm}^3$. Thứ tự: $120 < 125 < 144$.',
    },
  ],
  takeaways: [
    'Mọi hình trong chương là lăng trụ đứng: $S_{xq} = C_{\\text{đáy}}\\cdot h$, $V = S_{\\text{đáy}}\\cdot h$.',
    'Hình hộp chữ nhật: $S_{xq} = 2(a + b)c$, $V = abc$; hình lập phương: $S_{xq} = 4a^2$, $V = a^3$.',
    'Đọc kĩ đề để biết cần tính những mặt nào, và đổi đơn vị trước khi tính.',
  ],
};
