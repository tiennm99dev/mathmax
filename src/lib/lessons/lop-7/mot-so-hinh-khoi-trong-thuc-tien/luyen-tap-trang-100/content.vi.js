/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập về hình lăng trụ đứng tam giác và hình lăng trụ đứng tứ giác: diện tích xung quanh, thể tích, tìm chiều cao hoặc diện tích đáy và bài toán thực tế.',
  intro:
    'Bài luyện tập này ôn lại Bài 37 (Hình lăng trụ đứng tam giác và hình lăng trụ đứng tứ giác). Em sẽ tính chu vi đáy, diện tích đáy rồi áp dụng $S_{xq} = C_{\\text{đáy}}\\cdot h$ và $V = S_{\\text{đáy}}\\cdot h$ cho những đồ vật quen thuộc như chiếc lịch để bàn, thanh sô-cô-la hay bể bơi.',
  objectives: [
    'Tính diện tích xung quanh và thể tích của hình lăng trụ đứng tam giác, tứ giác.',
    'Tìm chiều cao hoặc diện tích đáy khi biết diện tích xung quanh hoặc thể tích.',
    'Nhận ra đâu là đáy, đâu là chiều cao của lăng trụ trong bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Nhắc lại kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Đại lượng', 'Công thức', 'Suy ra'],
          rows: [
            [
              'Diện tích xung quanh',
              '$S_{xq} = C_{\\text{đáy}}\\cdot h$',
              '$h = S_{xq} : C_{\\text{đáy}}$',
            ],
            [
              'Thể tích',
              '$V = S_{\\text{đáy}}\\cdot h$',
              '$h = V : S_{\\text{đáy}}$, $S_{\\text{đáy}} = V : h$',
            ],
          ],
        },
        {
          type: 'list',
          items: [
            'Tam giác: $S = \\dfrac{1}{2}\\cdot$ cạnh $\\cdot$ đường cao ứng với cạnh đó; tam giác vuông: nửa tích hai cạnh góc vuông.',
            'Hình thang: $S = \\dfrac{(\\text{đáy lớn} + \\text{đáy nhỏ})\\cdot \\text{chiều cao}}{2}$; hình thoi: nửa tích hai đường chéo.',
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
            'Tính $S_{xq}$: cộng các cạnh đáy để được chu vi, rồi nhân với chiều cao lăng trụ.',
            'Tính $V$: tính diện tích đa giác đáy, rồi nhân với chiều cao lăng trụ.',
            'Bài toán ngược: chia cho chu vi đáy hoặc diện tích đáy.',
            'Bài toán thực tế: đặt vật "nằm" trên một mặt đáy; hai đáy là hai mặt giống nhau song song, các mặt còn lại là hình chữ nhật.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Với bể bơi có đáy dốc, hai mặt đáy của lăng trụ là hai thành bể hình thang đối diện nhau, không phải mặt nằm dưới nước; chiều rộng bể là chiều cao của lăng trụ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Luyện tập ngẫu nhiên',
    instruction:
      'Mỗi lượt có các câu hỏi về lăng trụ đứng tam giác, lăng trụ đứng tứ giác và bài toán tìm ngược. Trả lời sai lần đầu sẽ có gợi ý và một lần thử lại.',
  },
  examples: [
    {
      problem:
        'Hình lăng trụ đứng tam giác có đáy là tam giác cân với các cạnh $5$ cm, $5$ cm, $6$ cm; đường cao ứng với cạnh $6$ cm dài $4$ cm. Chiều cao lăng trụ là $10$ cm. Tính $S_{xq}$ và $V$.',
      steps: [
        '$C_{\\text{đáy}} = 5 + 5 + 6 = 16$ (cm), nên $S_{xq} = 16\\cdot 10 = 160\\ (\\text{cm}^2)$.',
        '$S_{\\text{đáy}} = \\dfrac{1}{2}\\cdot 6\\cdot 4 = 12\\ (\\text{cm}^2)$.',
        '$V = 12\\cdot 10 = 120\\ (\\text{cm}^3)$.',
      ],
      answer: '$S_{xq} = 160\\ \\text{cm}^2$, $V = 120\\ \\text{cm}^3$.',
    },
    {
      problem:
        'Một bể bơi rộng $10$ m, dài $25$ m; đầu nông sâu $1$ m, đầu sâu sâu $2$ m, đáy bể dốc đều. Tính thể tích nước khi bể đầy.',
      steps: [
        'Bể có dạng hình lăng trụ đứng tứ giác: hai đáy là hai thành bể hình thang (hai đáy $1$ m và $2$ m, chiều cao hình thang $25$ m), chiều cao lăng trụ là chiều rộng bể $10$ m.',
        '$S_{\\text{đáy}} = \\dfrac{(1 + 2)\\cdot 25}{2} = 37{,}5\\ (\\text{m}^2)$.',
        '$V = 37{,}5\\cdot 10 = 375\\ (\\text{m}^3)$.',
      ],
      answer: '$V = 375\\ \\text{m}^3$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Hình lăng trụ đứng có đáy là tam giác vuông với các cạnh $3$ cm, $4$ cm, $5$ cm và chiều cao lăng trụ $15$ cm. Tính diện tích xung quanh.',
      answer: 180,
      unit: 'cm²',
      hints: ['Chu vi đáy là tổng ba cạnh.'],
      solution: '$S_{xq} = (3 + 4 + 5)\\cdot 15 = 12\\cdot 15 = 180\\ (\\text{cm}^2)$.',
    },
    {
      type: 'number',
      prompt:
        'Hình lăng trụ đứng có đáy là tam giác vuông với các cạnh $3$ cm, $4$ cm, $5$ cm (cạnh huyền $5$ cm) và chiều cao lăng trụ $15$ cm. Tính thể tích.',
      answer: 90,
      unit: 'cm³',
      hints: ['Diện tích đáy bằng nửa tích hai cạnh góc vuông $3$ và $4$.'],
      solution:
        '$S_{\\text{đáy}} = \\dfrac{1}{2}\\cdot 3\\cdot 4 = 6\\ (\\text{cm}^2)$, $V = 6\\cdot 15 = 90\\ (\\text{cm}^3)$.',
    },
    {
      type: 'number',
      prompt:
        'Hình lăng trụ đứng tứ giác có đáy là hình thang vuông với hai đáy $5$ cm và $9$ cm, cạnh bên vuông góc với hai đáy dài $3$ cm, cạnh bên còn lại $5$ cm. Chiều cao lăng trụ $10$ cm. Tính diện tích xung quanh.',
      answer: 220,
      unit: 'cm²',
      hints: ['Chu vi đáy là tổng bốn cạnh của hình thang.'],
      solution:
        '$C_{\\text{đáy}} = 5 + 9 + 3 + 5 = 22$ (cm), $S_{xq} = 22\\cdot 10 = 220\\ (\\text{cm}^2)$.',
    },
    {
      type: 'number',
      prompt:
        'Với hình lăng trụ ở câu trước (đáy hình thang vuông, hai đáy $5$ cm và $9$ cm, chiều cao hình thang $3$ cm, chiều cao lăng trụ $10$ cm), tính thể tích.',
      answer: 210,
      unit: 'cm³',
      hints: ['Chiều cao của hình thang là cạnh bên vuông góc với hai đáy.'],
      solution:
        '$S_{\\text{đáy}} = \\dfrac{(5 + 9)\\cdot 3}{2} = 21\\ (\\text{cm}^2)$, $V = 21\\cdot 10 = 210\\ (\\text{cm}^3)$.',
    },
    {
      type: 'number',
      prompt:
        'Một chiếc lịch để bàn có dạng hình lăng trụ đứng tam giác, đáy là tam giác có các cạnh $15$ cm, $15$ cm, $8$ cm; chiều dài lịch (chiều cao lăng trụ) $20$ cm. Tính diện tích bìa của ba mặt bên.',
      answer: 760,
      unit: 'cm²',
      hints: ['Ba mặt bên có tổng diện tích bằng $S_{xq}$.'],
      solution: '$S_{xq} = (15 + 15 + 8)\\cdot 20 = 38\\cdot 20 = 760\\ (\\text{cm}^2)$.',
    },
    {
      type: 'number',
      prompt:
        'Một thanh sô-cô-la có dạng hình lăng trụ đứng, đáy là tam giác đều cạnh $3$ cm, thanh dài $20$ cm. Tính diện tích giấy bọc ba mặt bên của thanh.',
      answer: 180,
      unit: 'cm²',
      hints: ['Chu vi tam giác đều cạnh $3$ cm là $3\\cdot 3$.'],
      solution: '$S_{xq} = (3\\cdot 3)\\cdot 20 = 180\\ (\\text{cm}^2)$.',
    },
    {
      type: 'number',
      prompt:
        'Một hình lăng trụ đứng có diện tích đáy $35\\ \\text{cm}^2$ và chiều cao $8$ cm. Tính thể tích.',
      answer: 280,
      unit: 'cm³',
      hints: ['$V = S_{\\text{đáy}}\\cdot h$.'],
      solution: '$V = 35\\cdot 8 = 280\\ (\\text{cm}^3)$.',
    },
    {
      type: 'number',
      prompt:
        'Một hình lăng trụ đứng có thể tích $420\\ \\text{cm}^3$ và chiều cao $12$ cm. Tính diện tích đáy.',
      answer: 35,
      unit: 'cm²',
      hints: ['$S_{\\text{đáy}} = V : h$.'],
      solution: '$S_{\\text{đáy}} = 420 : 12 = 35\\ (\\text{cm}^2)$.',
    },
    {
      type: 'number',
      prompt:
        'Một bể bơi rộng $12$ m, dài $20$ m; đầu nông sâu $1$ m, đầu sâu sâu $1{,}8$ m, đáy bể dốc đều. Bể chứa đầy được bao nhiêu mét khối nước?',
      answer: 336,
      tolerance: 0.001,
      unit: 'm³',
      hints: [
        'Hai thành bể dọc theo chiều dài là hai đáy hình thang của lăng trụ.',
        'Hình thang có hai đáy $1$ m và $1{,}8$ m, chiều cao $20$ m; chiều cao lăng trụ là $12$ m.',
      ],
      solution:
        '$S_{\\text{đáy}} = \\dfrac{(1 + 1{,}8)\\cdot 20}{2} = 28\\ (\\text{m}^2)$, $V = 28\\cdot 12 = 336\\ (\\text{m}^3)$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đại lượng của hình lăng trụ đứng với công thức đúng.',
      left: ['Diện tích xung quanh $S_{xq}$', 'Thể tích $V$', 'Chiều cao $h$ khi biết $V$'],
      right: [
        '$C_{\\text{đáy}}\\cdot h$',
        '$S_{\\text{đáy}}\\cdot h$',
        '$V : S_{\\text{đáy}}$',
        '$C_{\\text{đáy}}\\cdot S_{\\text{đáy}}$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Diện tích xung quanh dùng chu vi đáy; thể tích dùng diện tích đáy.'],
      solution:
        '$S_{xq} = C_{\\text{đáy}}\\cdot h$; $V = S_{\\text{đáy}}\\cdot h$, nên $h = V : S_{\\text{đáy}}$. Tích $C_{\\text{đáy}}\\cdot S_{\\text{đáy}}$ không có ý nghĩa ở đây.',
    },
  ],
  takeaways: [
    'Lăng trụ đứng: $S_{xq} = C_{\\text{đáy}}\\cdot h$, $V = S_{\\text{đáy}}\\cdot h$.',
    'Phân biệt chiều cao của lăng trụ (cạnh bên) với chiều cao của đa giác đáy.',
    'Trong bài toán thực tế, tìm hai mặt song song giống nhau: đó là hai đáy.',
  ],
};
