/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: củng cố tập hợp các số nguyên và thứ tự trên trục số, phép cộng, phép trừ số nguyên và quy tắc dấu ngoặc để tính nhanh.',
  intro:
    'Ba bài vừa học cho em đủ công cụ để làm việc với mọi số nguyên: so sánh nhờ trục số, cộng và trừ nhờ quy tắc dấu và số đối, tính nhanh nhờ quy tắc dấu ngoặc. Bài luyện tập này giúp em dùng chúng nhanh và chính xác.',
  objectives: [
    'So sánh, sắp xếp các số nguyên; đếm các số nguyên trong một khoảng.',
    'Cộng, trừ số nguyên; tìm số hạng chưa biết.',
    'Bỏ dấu ngoặc, đổi chỗ và nhóm số hạng để tính nhanh; giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ', 'Ví dụ'],
          rows: [
            ['So sánh', 'Điểm $a$ bên trái điểm $b$ thì $a < b$', '$-9 < -2 < 0 < 3$'],
            ['Cộng hai số âm', '$(-a) + (-b) = -(a + b)$', '$(-7) + (-5) = -12$'],
            [
              'Cộng hai số khác dấu',
              'Hiệu hai phần số tự nhiên, dấu của số có phần số tự nhiên lớn hơn',
              '$(-12) + 5 = -7$',
            ],
            ['Số đối', '$a + (-a) = 0$; $-(-a) = a$', '$-(-8) = 8$'],
            ['Phép trừ', '$a - b = a + (-b)$', '$3 - 10 = -7$'],
            ['Dấu ngoặc', 'Trước ngoặc là "$-$": đổi dấu mọi số hạng', '$5 - (2 - 9) = 5 - 2 + 9$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $12$ câu mới, trộn đều từ Bài 13, Bài 14 và Bài 15. Số âm gõ với dấu "-" đằng trước, ví dụ $-12$.',
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
      problem: 'Tính một cách hợp lí: $(-98) + 75 + 98 - 25$.',
      steps: [
        'Đổi chỗ để gom hai số đối: $[(-98) + 98] + (75 - 25)$.',
        '$(-98) + 98 = 0$ và $75 - 25 = 50$.',
      ],
      answer: '$50$.',
    },
    {
      problem: 'Tìm số nguyên $x$, biết $15 - x = -7$.',
      steps: [
        '$x$ là số trừ: số trừ bằng số bị trừ trừ đi hiệu, $x = 15 - (-7)$.',
        '$15 - (-7) = 15 + 7 = 22$.',
        'Thử lại: $15 - 22 = -7$.',
      ],
      answer: '$x = 22$.',
    },
    {
      problem:
        'Trong một ngày mùa đông ở một thành phố, nhiệt độ cao nhất là $2\\,^\\circ\\text{C}$ và thấp nhất là $-9\\,^\\circ\\text{C}$. Nhiệt độ cao nhất hơn nhiệt độ thấp nhất bao nhiêu độ?',
      steps: [
        'Độ chênh lệch bằng nhiệt độ cao nhất trừ nhiệt độ thấp nhất: $2 - (-9)$.',
        '$2 - (-9) = 2 + 9 = 11$.',
      ],
      answer: '$11\\,^\\circ\\text{C}$.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Sắp xếp các số nguyên theo thứ tự giảm dần.',
      items: ['$-12$', '$5$', '$0$', '$-3$', '$8$', '$-20$'],
      answer: [4, 1, 2, 3, 0, 5],
      hints: [
        'Giảm dần: số lớn nhất đứng đầu.',
        'Với số âm, phần số tự nhiên càng lớn thì số càng nhỏ.',
      ],
      solution: '$8 > 5 > 0 > -3 > -12 > -20$.',
    },
    {
      type: 'choice',
      prompt:
        'Nhiệt độ lúc $6$ giờ sáng ở bốn thành phố là $-3\\,^\\circ\\text{C}$, $-15\\,^\\circ\\text{C}$, $-8\\,^\\circ\\text{C}$ và $2\\,^\\circ\\text{C}$. Nhiệt độ nào thấp nhất?',
      options: [
        '$-3\\,^\\circ\\text{C}$',
        '$-15\\,^\\circ\\text{C}$',
        '$-8\\,^\\circ\\text{C}$',
        '$2\\,^\\circ\\text{C}$',
      ],
      answer: 1,
      hints: ['Nhiệt độ thấp nhất là số nguyên nhỏ nhất.'],
      solution: '$-15 < -8 < -3 < 2$, nên nhiệt độ thấp nhất là $-15\\,^\\circ\\text{C}$.',
    },
    {
      type: 'number',
      prompt: 'Tính tổng các số nguyên $x$ thỏa mãn $-5 < x \\le 6$.',
      answer: 11,
      hints: [
        'Liệt kê: $x \\in \\{-4; -3; \\ldots; 5; 6\\}$.',
        'Gom các cặp số đối: $(-4) + 4 = 0$, $(-3) + 3 = 0$, ...',
      ],
      solution:
        '$x \\in \\{-4; -3; -2; -1; 0; 1; 2; 3; 4; 5; 6\\}$. Các cặp số đối có tổng $0$, còn lại $5 + 6 = 11$.',
    },
    {
      type: 'number',
      prompt: 'Tính: $(-17) + 5 + 8 + 17$.',
      answer: 13,
      hints: ['$(-17)$ và $17$ là hai số đối.'],
      solution: '$[(-17) + 17] + (5 + 8) = 0 + 13 = 13$.',
    },
    {
      type: 'number',
      prompt: 'Tính: $30 + 12 + (-20) + (-12)$.',
      answer: 10,
      hints: ['Gom $12$ với $-12$, gom $30$ với $-20$.'],
      solution: '$[12 + (-12)] + [30 + (-20)] = 0 + 10 = 10$.',
    },
    {
      type: 'number',
      prompt: 'Tính: $(-4) + (-440) + (-6) + 440$.',
      answer: -10,
      hints: ['$(-440) + 440 = 0$.'],
      solution: '$[(-440) + 440] + [(-4) + (-6)] = 0 + (-10) = -10$.',
    },
    {
      type: 'number',
      prompt: 'Tính: $10 - (-7) - 15$.',
      answer: 2,
      hints: ['$10 - (-7) = 10 + 7$.'],
      solution: '$10 + 7 - 15 = 17 - 15 = 2$.',
    },
    {
      type: 'number',
      prompt: 'Bỏ ngoặc rồi tính: $(-315) - (-215 + 70)$.',
      answer: -170,
      hints: ['Trước ngoặc là dấu "$-$": $-215$ thành $+215$, $+70$ thành $-70$.'],
      solution: '$-315 + 215 - 70 = -100 - 70 = -170$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số nguyên $x$, biết $x - 12 = -30$.',
      answer: -18,
      hints: ['Số bị trừ bằng hiệu cộng với số trừ.'],
      solution: '$x = -30 + 12 = -18$. Thử lại: $-18 - 12 = -30$.',
    },
    {
      type: 'number',
      prompt:
        'Một tàu ngầm đang ở độ cao $-45$ m so với mực nước biển, rồi nổi lên $18$ m. Độ cao mới của tàu là bao nhiêu mét?',
      answer: -27,
      unit: 'm',
      hints: ['Nổi lên nghĩa là độ cao tăng: tính $(-45) + 18$.'],
      solution: '$(-45) + 18 = -(45 - 18) = -27$. Tàu ở độ cao $-27$ m.',
    },
    {
      type: 'number',
      prompt:
        'Tài khoản ngân hàng của cô Lan có $3$ triệu đồng. Cô dùng thẻ (được phép chi vượt số dư) để thanh toán $5$ triệu đồng. Số dư tài khoản của cô sau khi thanh toán là bao nhiêu triệu đồng?',
      answer: -2,
      unit: 'triệu đồng',
      hints: ['Số dư mới bằng $3 - 5$.'],
      solution:
        '$3 - 5 = 3 + (-5) = -2$. Số dư là $-2$ triệu đồng, nghĩa là cô đang nợ ngân hàng $2$ triệu đồng.',
    },
    {
      type: 'number',
      prompt:
        'Nhiệt độ cao nhất trong ngày ở một trạm trên núi là $5\\,^\\circ\\text{C}$, thấp nhất là $-8\\,^\\circ\\text{C}$. Nhiệt độ cao nhất hơn nhiệt độ thấp nhất bao nhiêu độ C?',
      answer: 13,
      unit: '°C',
      hints: ['Tính $5 - (-8)$.'],
      solution: '$5 - (-8) = 5 + 8 = 13$. Cao hơn $13\\,^\\circ\\text{C}$.',
    },
  ],
  takeaways: [
    'Trên trục số: số âm $< 0 <$ số dương; điểm bên trái biểu diễn số nhỏ hơn.',
    'Cộng cùng dấu: cộng phần số tự nhiên, giữ dấu. Khác dấu: trừ phần số tự nhiên, lấy dấu của số có phần số tự nhiên lớn hơn.',
    '$a - b = a + (-b)$.',
    'Trước ngoặc là "$-$" thì đổi dấu mọi số hạng khi bỏ ngoặc; gom số đối để tính nhanh.',
  ],
};
