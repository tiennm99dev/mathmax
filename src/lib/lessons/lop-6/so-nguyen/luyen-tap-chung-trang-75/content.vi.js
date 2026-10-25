/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: củng cố phép nhân số nguyên, các tính chất của phép nhân, phép chia hết hai số nguyên, ước và bội của một số nguyên.',
  intro:
    'Hai bài vừa học cho em quy tắc dấu khi nhân và khi chia số nguyên, các tính chất giúp tính nhanh, và cách tìm ước, bội của một số nguyên. Bài luyện tập này giúp em dùng chúng nhanh và chính xác, kể cả trong các bài toán thực tế.',
  objectives: [
    'Nhân, chia số nguyên đúng dấu; tính giá trị biểu thức có phép nhân và phép chia.',
    'Dùng tính chất giao hoán, kết hợp, phân phối để tính nhanh; tìm số nguyên $x$ chưa biết.',
    'Tìm ước, bội của một số nguyên; giải bài toán thực tế bằng phép nhân, phép chia số nguyên.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ', 'Ví dụ'],
          rows: [
            [
              'Nhân, chia khác dấu',
              'Nhân (chia) hai phần số tự nhiên, đặt dấu "$-$"',
              '$(-6) \\cdot 7 = -42$; $42 : (-6) = -7$',
            ],
            [
              'Nhân, chia cùng dấu',
              'Nhân (chia) hai phần số tự nhiên, kết quả dương',
              '$(-6) \\cdot (-7) = 42$; $(-42) : (-7) = 6$',
            ],
            [
              'Dấu của tích nhiều thừa số',
              'Số thừa số âm chẵn: dấu "$+$"; lẻ: dấu "$-$"',
              '$(-1) \\cdot (-2) \\cdot (-3) = -6$',
            ],
            [
              'Tính chất phân phối',
              '$a \\cdot b + a \\cdot c = a \\cdot (b + c)$',
              '$(-5) \\cdot 37 + (-5) \\cdot 63 = -500$',
            ],
            [
              'Ước và bội',
              '$a \\vdots\\, b$ thì $a$ là bội của $b$, $b$ là ước của $a$',
              '$\\text{Ư}(-6) = \\{\\pm 1; \\pm 2; \\pm 3; \\pm 6\\}$',
            ],
            [
              'Số $0$, $1$, $-1$',
              '$0$ là bội của mọi số nguyên khác $0$, không là ước của số nào; $\\pm 1$ là ước của mọi số nguyên',
              '$0 = 9 \\cdot 0$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $12$ câu mới, trộn đều từ Bài 16 và Bài 17. Số âm gõ với dấu "-" đằng trước, ví dụ $-12$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề luyện tập trộn ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết em cần ôn lại bài nào.',
  },
  examples: [
    {
      problem: 'Tính giá trị của biểu thức $(-12) \\cdot (-7) - 5 \\cdot (-6)$.',
      steps: [
        'Thực hiện phép nhân trước: $(-12) \\cdot (-7) = 84$ và $5 \\cdot (-6) = -30$.',
        'Rồi tính phép trừ: $84 - (-30) = 84 + 30 = 114$.',
      ],
      answer: '$114$.',
    },
    {
      problem: 'Tìm số nguyên $x$, biết $(-4) \\cdot x - 9 = 27$.',
      steps: [
        '$(-4) \\cdot x$ là số bị trừ: $(-4) \\cdot x = 27 + 9 = 36$.',
        '$x$ là thừa số chưa biết: $x = 36 : (-4) = -9$.',
        'Thử lại: $(-4) \\cdot (-9) - 9 = 36 - 9 = 27$.',
      ],
      answer: '$x = -9$.',
    },
    {
      problem: 'Tìm các ước của $-15$ lớn hơn $-5$.',
      steps: [
        'Các ước dương của $-15$ là $1; 3; 5; 15$, nên $\\text{Ư}(-15) = \\{-15; -5; -3; -1; 1; 3; 5; 15\\}$.',
        'Chọn các ước lớn hơn $-5$ (không lấy $-5$).',
      ],
      answer: '$-3; -1; 1; 3; 5; 15$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính $(-15) \\cdot 8$.',
      answer: -120,
      hints: ['Hai số khác dấu: tích là số âm.'],
      solution: '$(-15) \\cdot 8 = -(15 \\cdot 8) = -120$.',
    },
    {
      type: 'number',
      prompt: 'Tính $(-36) : (-4)$.',
      answer: 9,
      hints: ['Hai số cùng dấu: thương là số dương.'],
      solution: '$(-36) : (-4) = 36 : 4 = 9$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $P = (-35) \\cdot x$ khi $x = -4$.',
      answer: 140,
      hints: ['Thay $x = -4$ vào biểu thức: $P = (-35) \\cdot (-4)$.'],
      solution: '$P = (-35) \\cdot (-4) = 35 \\cdot 4 = 140$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh: $(-8) \\cdot 72 + 8 \\cdot (-28)$.',
      answer: -800,
      hints: [
        'Viết $8 \\cdot (-28) = (-8) \\cdot 28$ để có thừa số chung $(-8)$.',
        'Dùng tính chất phân phối: $(-8) \\cdot (72 + 28)$.',
      ],
      solution:
        '$(-8) \\cdot 72 + (-8) \\cdot 28 = (-8) \\cdot (72 + 28) = (-8) \\cdot 100 = -800$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh: $(-4) \\cdot 13 \\cdot (-25)$.',
      answer: 1300,
      hints: ['Đổi chỗ để nhân $(-4) \\cdot (-25)$ trước.'],
      solution: '$[(-4) \\cdot (-25)] \\cdot 13 = 100 \\cdot 13 = 1\\,300$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số nguyên $x$, biết $x : (-6) = 9$.',
      answer: -54,
      hints: ['Số bị chia bằng thương nhân với số chia.'],
      solution: '$x = 9 \\cdot (-6) = -54$. Thử lại: $(-54) : (-6) = 9$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số nguyên $x$, biết $(-3) \\cdot x + 5 = -16$.',
      answer: 7,
      hints: [
        'Tìm $(-3) \\cdot x$ trước: nó là số hạng chưa biết của một tổng.',
        '$(-3) \\cdot x = -16 - 5 = -21$.',
      ],
      solution:
        '$(-3) \\cdot x = -16 - 5 = -21$, nên $x = (-21) : (-3) = 7$. Thử lại: $(-3) \\cdot 7 + 5 = -21 + 5 = -16$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các số là bội của $-7$.',
      options: ['$14$', '$-21$', '$0$', '$15$', '$-1$', '$49$'],
      answers: [0, 1, 2, 5],
      hints: [
        '$a$ là bội của $-7$ khi $a = (-7) \\cdot k$ với $k$ là số nguyên.',
        'Đừng quên số $0$.',
      ],
      solution:
        '$14 = (-7) \\cdot (-2)$, $-21 = (-7) \\cdot 3$, $0 = (-7) \\cdot 0$, $49 = (-7) \\cdot (-7)$ là các bội của $-7$. Còn $15$ và $-1$ không chia hết cho $-7$.',
    },
    {
      type: 'number',
      prompt: 'Số $-20$ có tất cả bao nhiêu ước nguyên?',
      answer: 12,
      hints: [
        'Các ước dương của $-20$ là các ước của $20$.',
        'Mỗi ước dương có số đối cũng là ước.',
      ],
      solution:
        'Các ước dương: $1; 2; 4; 5; 10; 20$ ($6$ ước). Thêm $6$ số đối của chúng: $-20$ có $12$ ước nguyên.',
    },
    {
      type: 'choice',
      prompt: 'Cho hai số nguyên $a$ và $b$ với $a > 0$ và $a \\cdot b < 0$. Khi đó:',
      options: ['$b > 0$', '$b < 0$', '$b = 0$', 'Không xác định được dấu của $b$'],
      answer: 1,
      hints: ['Tích âm khi hai thừa số khác dấu.'],
      solution:
        '$a \\cdot b < 0$ nên $a \\cdot b \\ne 0$, do đó $b \\ne 0$. Tích hai số là số âm khi hai số khác dấu; $a$ dương nên $b < 0$.',
    },
    {
      type: 'number',
      prompt:
        'Trong một cuộc thi trắc nghiệm, mỗi câu trả lời đúng được $5$ điểm, mỗi câu trả lời sai được $-2$ điểm. Bạn An trả lời đúng $12$ câu và sai $8$ câu. Tính tổng số điểm của An.',
      answer: 44,
      unit: 'điểm',
      hints: ['Tính $12 \\cdot 5 + 8 \\cdot (-2)$.'],
      solution: '$12 \\cdot 5 + 8 \\cdot (-2) = 60 + (-16) = 44$. An được $44$ điểm.',
    },
    {
      type: 'number',
      prompt:
        'Nhiệt độ đo ở một trạm vào $5$ thời điểm trong một ngày là $-5\\,^\\circ\\text{C}$, $-3\\,^\\circ\\text{C}$, $0\\,^\\circ\\text{C}$, $2\\,^\\circ\\text{C}$ và $-4\\,^\\circ\\text{C}$. Tính nhiệt độ trung bình của $5$ lần đo.',
      answer: -2,
      unit: '°C',
      hints: [
        'Nhiệt độ trung bình bằng tổng các nhiệt độ chia cho số lần đo.',
        'Tổng các nhiệt độ là $(-5) + (-3) + 0 + 2 + (-4)$.',
      ],
      solution:
        'Tổng: $(-5) + (-3) + 0 + 2 + (-4) = -10$. Trung bình: $(-10) : 5 = -2$. Nhiệt độ trung bình là $-2\\,^\\circ\\text{C}$.',
    },
  ],
  takeaways: [
    'Nhân hay chia hai số nguyên: cùng dấu thì kết quả dương, khác dấu thì kết quả âm.',
    'Đặt thừa số chung, đổi chỗ và nhóm các thừa số để tính nhanh.',
    'Tìm $x$: lần ngược từ ngoài vào trong, rồi thử lại.',
    'Các ước của một số nguyên đi thành từng cặp số đối; $0$ là bội của mọi số nguyên khác $0$.',
  ],
};
