/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập về hình hộp chữ nhật và hình lập phương: tính diện tích xung quanh, tổng diện tích các mặt, thể tích, tìm một kích thước và giải bài toán thực tế.',
  intro:
    'Bài luyện tập này ôn lại Bài 36 (Hình hộp chữ nhật và hình lập phương). Em sẽ tính diện tích xung quanh và thể tích, đi ngược từ diện tích hay thể tích để tìm một kích thước, và đổi đơn vị để trả lời các câu hỏi về bể nước, căn phòng, chiếc hộp.',
  objectives: [
    'Tính thành thạo diện tích xung quanh và thể tích của hình hộp chữ nhật, hình lập phương.',
    'Tìm một kích thước khi biết diện tích xung quanh hoặc thể tích.',
    'Vận dụng vào bài toán thực tế, đổi đúng đơn vị diện tích, thể tích và dung tích.',
  ],
  sections: [
    {
      heading: 'Nhắc lại kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Diện tích xung quanh', 'Thể tích'],
          rows: [
            [
              'Hình hộp chữ nhật $a, b, c$',
              '$S_{xq} = 2(a + b)\\cdot c$',
              '$V = a\\cdot b\\cdot c$',
            ],
            ['Hình lập phương cạnh $a$', '$S_{xq} = 4a^2$', '$V = a^3$'],
          ],
        },
        {
          type: 'list',
          items: [
            'Tổng diện tích các mặt của hình hộp chữ nhật: $S_{xq} + 2ab$.',
            '$1\\ \\text{dm}^3 = 1\\,000\\ \\text{cm}^3 = 1$ lít; $1\\ \\text{m}^3 = 1\\,000\\ \\text{dm}^3 = 1\\,000$ lít.',
          ],
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
            'Tính trực tiếp: thay các kích thước vào công thức.',
            'Tìm chiều cao: $c = S_{xq} : [2(a + b)]$ hoặc $c = V : (a\\cdot b)$.',
            'Hình lập phương: biết $S_{xq}$ thì $a^2 = S_{xq} : 4$; biết $V$ thì tìm $a$ sao cho $a^3 = V$.',
            'Bài toán thực tế: xác định cần tính những mặt nào (bốn bức tường, hộp có nắp hay không nắp) hoặc thể tích phần nào (mực nước).',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Đổi các kích thước về cùng đơn vị trước khi tính. Bể không có nắp thì chỉ có một mặt đáy.',
        },
      ],
    },
  ],
  explore: {
    title: 'Luyện tập ngẫu nhiên',
    instruction:
      'Mỗi lượt có các câu hỏi về diện tích xung quanh, thể tích hình hộp chữ nhật và hình lập phương. Trả lời sai lần đầu sẽ có gợi ý và một lần thử lại. Bản đồ kĩ năng cho biết dạng nào em cần ôn thêm.',
  },
  examples: [
    {
      problem:
        'Một bể kính không nắp dạng hình hộp chữ nhật dài $80$ cm, rộng $40$ cm, cao $50$ cm. a) Tính diện tích kính dùng làm bể. b) Bể chứa đầy được bao nhiêu lít nước?',
      steps: [
        'a) Bể không nắp gồm bốn mặt bên và một mặt đáy.',
        '$S_{xq} = 2\\cdot(80 + 40)\\cdot 50 = 12\\,000\\ (\\text{cm}^2)$; đáy: $80\\cdot 40 = 3\\,200\\ (\\text{cm}^2)$.',
        'Diện tích kính: $12\\,000 + 3\\,200 = 15\\,200\\ (\\text{cm}^2)$.',
        'b) $V = 80\\cdot 40\\cdot 50 = 160\\,000\\ (\\text{cm}^3) = 160\\ \\text{dm}^3 = 160$ lít.',
      ],
      answer: 'a) $15\\,200\\ \\text{cm}^2$; b) $160$ lít.',
    },
    {
      problem:
        'Một hình lập phương có thể tích $64\\ \\text{cm}^3$. Tính diện tích xung quanh của nó.',
      steps: [
        'Tìm cạnh $a$ sao cho $a^3 = 64$: vì $4^3 = 4\\cdot 4\\cdot 4 = 64$ nên $a = 4$ cm.',
        '$S_{xq} = 4a^2 = 4\\cdot 16 = 64\\ (\\text{cm}^2)$.',
      ],
      answer: '$S_{xq} = 64\\ \\text{cm}^2$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Tính diện tích xung quanh của hình hộp chữ nhật dài $12$ cm, rộng $8$ cm, cao $5$ cm.',
      answer: 200,
      unit: 'cm²',
      hints: ['$S_{xq} = 2(a + b)\\cdot c$.'],
      solution: '$S_{xq} = 2\\cdot(12 + 8)\\cdot 5 = 40\\cdot 5 = 200\\ (\\text{cm}^2)$.',
    },
    {
      type: 'number',
      prompt: 'Tính thể tích của hình hộp chữ nhật dài $12$ cm, rộng $8$ cm, cao $5$ cm.',
      answer: 480,
      unit: 'cm³',
      hints: ['Nhân ba kích thước với nhau.'],
      solution: '$V = 12\\cdot 8\\cdot 5 = 480\\ (\\text{cm}^3)$.',
    },
    {
      type: 'number',
      prompt:
        'Một chiếc hộp có nắp dạng hình hộp chữ nhật dài $10$ cm, rộng $6$ cm, cao $4$ cm. Cần ít nhất bao nhiêu xăng-ti-mét vuông bìa để làm hộp (bỏ qua mép dán)?',
      answer: 248,
      unit: 'cm²',
      hints: [
        'Hộp có nắp nên có đủ $6$ mặt.',
        'Tính $S_{xq}$ rồi cộng diện tích hai đáy $2\\cdot 10\\cdot 6$.',
      ],
      solution:
        '$S_{xq} = 2\\cdot(10 + 6)\\cdot 4 = 128\\ (\\text{cm}^2)$; hai đáy: $2\\cdot 10\\cdot 6 = 120\\ (\\text{cm}^2)$. Tổng: $128 + 120 = 248\\ (\\text{cm}^2)$.',
    },
    {
      type: 'number',
      prompt: 'Tính thể tích của một khối rubik hình lập phương cạnh $7$ cm.',
      answer: 343,
      unit: 'cm³',
      hints: ['$V = a^3$.'],
      solution: '$V = 7^3 = 7\\cdot 7\\cdot 7 = 343\\ (\\text{cm}^3)$.',
    },
    {
      type: 'number',
      prompt:
        'Một hình lập phương có thể tích $512\\ \\text{cm}^3$. Tính diện tích xung quanh của nó.',
      answer: 256,
      unit: 'cm²',
      hints: ['Tìm số $a$ sao cho $a\\cdot a\\cdot a = 512$.', 'Thử $a = 8$.'],
      solution: '$8^3 = 512$ nên $a = 8$ cm. $S_{xq} = 4\\cdot 8^2 = 256\\ (\\text{cm}^2)$.',
    },
    {
      type: 'number',
      prompt:
        'Một hình hộp chữ nhật có thể tích $360\\ \\text{cm}^3$, đáy dài $10$ cm và rộng $6$ cm. Tính chiều cao.',
      answer: 6,
      unit: 'cm',
      hints: ['$V = (a\\cdot b)\\cdot c$, nên $c = V : (a\\cdot b)$.'],
      solution:
        'Diện tích đáy $10\\cdot 6 = 60\\ (\\text{cm}^2)$, chiều cao $c = 360 : 60 = 6$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Một thùng chứa nước hình hộp chữ nhật có lòng trong dài $1{,}5$ m, rộng $1$ m, cao $0{,}8$ m. Thùng chứa đầy được bao nhiêu lít nước?',
      answer: 1200,
      unit: 'lít',
      hints: ['Tính thể tích bằng mét khối trước.', '$1\\ \\text{m}^3 = 1\\,000$ lít.'],
      solution:
        '$V = 1{,}5\\cdot 1\\cdot 0{,}8 = 1{,}2\\ (\\text{m}^3) = 1\\,200\\ \\text{dm}^3 = 1\\,200$ lít.',
    },
    {
      type: 'number',
      prompt:
        'Một căn phòng dài $6$ m, rộng $4{,}5$ m, cao $3{,}2$ m. Tính diện tích bốn bức tường của phòng (bỏ qua cửa).',
      answer: 67.2,
      tolerance: 0.001,
      unit: 'm²',
      hints: ['Bốn bức tường là bốn mặt bên của hình hộp chữ nhật.'],
      solution:
        '$S_{xq} = 2\\cdot(6 + 4{,}5)\\cdot 3{,}2 = 21\\cdot 3{,}2 = 67{,}2\\ (\\text{m}^2)$.',
    },
    {
      type: 'number',
      prompt:
        'Người ta xếp kín một chiếc hộp hình hộp chữ nhật có lòng trong dài $5$ cm, rộng $4$ cm, cao $3$ cm bằng các khối lập phương cạnh $1$ cm. Cần bao nhiêu khối?',
      answer: 60,
      hints: ['Mỗi lớp có bao nhiêu khối? Có bao nhiêu lớp?'],
      solution:
        'Mỗi lớp có $5\\cdot 4 = 20$ khối, có $3$ lớp, nên cần $20\\cdot 3 = 60$ khối (bằng thể tích $60\\ \\text{cm}^3$).',
    },
    {
      type: 'choice',
      prompt: 'Nếu cạnh của một hình lập phương tăng lên gấp $2$ lần thì thể tích của nó tăng lên',
      options: ['$2$ lần', '$4$ lần', '$6$ lần', '$8$ lần'],
      answer: 3,
      hints: ['So sánh $(2a)^3$ với $a^3$.'],
      solution: '$(2a)^3 = 2a\\cdot 2a\\cdot 2a = 8a^3$, nên thể tích tăng $8$ lần.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các hình theo thể tích từ nhỏ đến lớn.',
      items: [
        'Hình lập phương cạnh $4$ cm',
        'Hình hộp chữ nhật $8$ cm $\\times$ $2$ cm $\\times$ $3$ cm',
        'Hình hộp chữ nhật $5$ cm $\\times$ $5$ cm $\\times$ $3$ cm',
      ],
      answer: [1, 0, 2],
      hints: ['Tính thể tích từng hình rồi so sánh.'],
      solution:
        'Thể tích lần lượt: $4^3 = 64\\ \\text{cm}^3$; $8\\cdot 2\\cdot 3 = 48\\ \\text{cm}^3$; $5\\cdot 5\\cdot 3 = 75\\ \\text{cm}^3$. Thứ tự: $48 < 64 < 75$.',
    },
  ],
  takeaways: [
    'Hình hộp chữ nhật: $S_{xq} = 2(a + b)c$, $V = abc$; hình lập phương: $S_{xq} = 4a^2$, $V = a^3$.',
    'Biết $S_{xq}$ hoặc $V$ có thể tìm ngược lại một kích thước.',
    'Đổi về cùng đơn vị; $1\\ \\text{dm}^3 = 1$ lít.',
  ],
};
