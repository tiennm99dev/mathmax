/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: lập bảng tần số và bảng tần số tương đối, tính cỡ mẫu, tần số tương đối, góc ở tâm của biểu đồ hình quạt tròn và đọc các biểu đồ tần số.',
  intro:
    'Bài 22 và Bài 23 cho em hai cách tóm tắt một mẫu dữ liệu: bảng tần số đếm mỗi giá trị xuất hiện bao nhiêu lần, còn bảng tần số tương đối cho biết mỗi giá trị chiếm bao nhiêu phần trăm của mẫu. Bài luyện tập này giúp em chuyển qua lại giữa dữ liệu thô, các bảng và các biểu đồ một cách chắc chắn.',
  objectives: [
    'Lập bảng tần số, bảng tần số tương đối từ mẫu dữ liệu; tính cỡ mẫu và tần số còn thiếu.',
    'Tính tần số tương đối và góc ở tâm; suy ngược tần số từ tần số tương đối hoặc từ góc ở tâm.',
    'Dùng tần số tương đối để so sánh hai mẫu có cỡ khác nhau.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            ['Tần số $m$ của giá trị $x$', 'Số lần $x$ xuất hiện trong mẫu dữ liệu'],
            ['Cỡ mẫu', '$n = m_1 + m_2 + \\dots + m_k$'],
            ['Tần số tương đối', '$f = \\dfrac{m}{n} \\cdot 100\\%$; tổng các $f_i$ bằng $100\\%$'],
            [
              'Biểu đồ tần số',
              'Dạng cột (cột tại $x_i$ cao $m_i$) hoặc dạng đoạn thẳng (nối các điểm $(x_i; m_i)$)',
            ],
            ['Biểu đồ tần số tương đối', 'Dạng cột (cột cao $f_i$) hoặc dạng hình quạt tròn'],
            [
              'Góc ở tâm của hình quạt',
              '$\\alpha = 360^\\circ \\cdot f$; ngược lại $f = \\dfrac{\\alpha}{360^\\circ}$, $m = f \\cdot n$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Đếm sót dữ liệu (luôn kiểm tra tổng các tần số bằng $n$). Chia cho số giá trị khác nhau thay vì cho cỡ mẫu. So sánh hai mẫu có cỡ khác nhau bằng tần số thay vì bằng tần số tương đối.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh: mỗi lần bấm "Làm bộ đề mới" em nhận $12$ câu mới, trộn đều từ bốn kĩ năng. Đáp số là số tự nhiên hoặc số thập phân (dùng dấu phẩy); có thể gõ kèm đơn vị % hoặc °.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ đề luyện tập trộn ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết em cần ôn lại phần nào.',
  },
  examples: [
    {
      problem:
        'Số bàn thắng của một đội bóng trong $20$ trận đấu: 1; 0; 2; 1; 3; 1; 0; 2; 1; 4; 2; 1; 0; 1; 2; 3; 1; 2; 0; 1. Lập bảng tần số và bảng tần số tương đối.',
      steps: [
        'Các giá trị khác nhau: $0, 1, 2, 3, 4$.',
        'Đếm: $0$ xuất hiện $4$ lần, $1$ xuất hiện $8$ lần, $2$ xuất hiện $5$ lần, $3$ xuất hiện $2$ lần, $4$ xuất hiện $1$ lần; kiểm tra $4 + 8 + 5 + 2 + 1 = 20$.',
        'Tần số tương đối $f = \\dfrac{m}{20} \\cdot 100\\%$: $\\dfrac{4}{20} = 20\\%$, $\\dfrac{8}{20} = 40\\%$, $\\dfrac{5}{20} = 25\\%$, $\\dfrac{2}{20} = 10\\%$, $\\dfrac{1}{20} = 5\\%$.',
      ],
      answer:
        'Số bàn thắng $0, 1, 2, 3, 4$ có tần số $4, 8, 5, 2, 1$ và tần số tương đối $20\\%, 40\\%, 25\\%, 10\\%, 5\\%$.',
    },
    {
      problem:
        'Vẽ biểu đồ hình quạt tròn cho bảng tần số tương đối ở Ví dụ 1: tính góc ở tâm của mỗi hình quạt.',
      steps: [
        '$\\alpha = 360^\\circ \\cdot f$: $360^\\circ \\cdot 20\\% = 72^\\circ$; $360^\\circ \\cdot 40\\% = 144^\\circ$; $360^\\circ \\cdot 25\\% = 90^\\circ$.',
        '$360^\\circ \\cdot 10\\% = 36^\\circ$; $360^\\circ \\cdot 5\\% = 18^\\circ$.',
        'Kiểm tra: $72 + 144 + 90 + 36 + 18 = 360$ (độ).',
      ],
      answer:
        'Các hình quạt có góc ở tâm $72^\\circ$, $144^\\circ$, $90^\\circ$, $36^\\circ$, $18^\\circ$.',
    },
    {
      problem:
        'Lớp 9A có $30$ học sinh, trong đó $12$ bạn đạt loại Tốt; lớp 9B có $45$ học sinh, trong đó $15$ bạn đạt loại Tốt. Lớp nào có tỉ lệ học sinh đạt loại Tốt cao hơn?',
      steps: [
        'Lớp 9A: $f = \\dfrac{12}{30} \\cdot 100\\% = 40\\%$.',
        'Lớp 9B: $f = \\dfrac{15}{45} \\cdot 100\\% \\approx 33{,}3\\%$.',
      ],
      answer:
        'Lớp 9A có tỉ lệ đạt loại Tốt cao hơn, dù số học sinh đạt loại Tốt ($12$) ít hơn lớp 9B ($15$).',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Số bàn thắng của một đội bóng trong $20$ trận đấu: 1; 0; 2; 1; 3; 1; 0; 2; 1; 4; 2; 1; 0; 1; 2; 3; 1; 2; 0; 1. Tìm tần số của giá trị $2$.',
      answer: 5,
      hints: ['Đếm số lần chữ số $2$ xuất hiện, gạch đi số đã đếm.'],
      solution: 'Giá trị $2$ xuất hiện ở các trận thứ $3, 8, 11, 15, 18$, tức $5$ lần.',
    },
    {
      type: 'number',
      prompt:
        'Với dữ liệu số bàn thắng ở câu trên (giá trị $0, 1, 2, 3, 4$ có tần số $4, 8, 5, 2, 1$), tính tần số tương đối của giá trị $1$ (theo %).',
      answer: 40,
      unit: '%',
      hints: ['$f = \\dfrac{m}{n} \\cdot 100\\%$ với $n = 20$.'],
      solution: '$f = \\dfrac{8}{20} \\cdot 100\\% = 40\\%$.',
    },
    {
      type: 'number',
      prompt: 'Cũng với dữ liệu đó, đội bóng có bao nhiêu trận ghi được ít nhất $2$ bàn thắng?',
      answer: 8,
      hints: ['"Ít nhất $2$ bàn" gồm các giá trị $2$, $3$ và $4$.'],
      solution: '$5 + 2 + 1 = 8$ trận.',
    },
    {
      type: 'match',
      prompt:
        'Ghép mỗi giá trị của dữ liệu số bàn thắng (tần số $4, 8, 5, 2, 1$ với $n = 20$) với góc ở tâm của hình quạt biểu diễn nó.',
      left: ['$0$ bàn', '$1$ bàn', '$2$ bàn', '$3$ bàn'],
      right: ['$36^\\circ$', '$72^\\circ$', '$90^\\circ$', '$144^\\circ$', '$18^\\circ$'],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 2],
        [3, 0],
      ],
      hints: ['Góc ở tâm $= 360^\\circ \\cdot \\dfrac{m}{20} = 18^\\circ \\cdot m$.'],
      solution:
        'Mỗi trận ứng với $\\dfrac{360^\\circ}{20} = 18^\\circ$: $0$ bàn: $18^\\circ \\cdot 4 = 72^\\circ$; $1$ bàn: $18^\\circ \\cdot 8 = 144^\\circ$; $2$ bàn: $18^\\circ \\cdot 5 = 90^\\circ$; $3$ bàn: $18^\\circ \\cdot 2 = 36^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Một mẫu có cỡ $n = 45$ và bảng tần số: giá trị $1, 2, 3, 4$ có tần số lần lượt là $9,\\ m,\\ 12,\\ 6$. Tìm $m$.',
      answer: 18,
      hints: ['Tổng các tần số bằng cỡ mẫu.'],
      solution: '$9 + m + 12 + 6 = 45 \\Rightarrow m = 45 - 27 = 18$.',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ hình quạt tròn về món ăn sáng yêu thích của $40$ học sinh có hình quạt "Bánh mì" với góc ở tâm $126^\\circ$. Có bao nhiêu học sinh thích bánh mì nhất?',
      answer: 14,
      hints: [
        'Tần số tương đối $f = \\dfrac{126^\\circ}{360^\\circ}$.',
        'Số học sinh $= f \\cdot 40$.',
      ],
      solution: '$f = \\dfrac{126}{360} = 0{,}35 = 35\\%$; số học sinh là $0{,}35 \\cdot 40 = 14$.',
    },
    {
      type: 'number',
      prompt:
        'Trong một mẫu cỡ $15$, giá trị $x$ có tần số $4$. Tính tần số tương đối của $x$ theo %, làm tròn đến hàng phần mười.',
      answer: 26.7,
      tolerance: 0.05,
      unit: '%',
      hints: ['Tính $\\dfrac{4}{15} \\cdot 100$ rồi làm tròn.'],
      solution: '$f = \\dfrac{4}{15} \\cdot 100\\% = 26{,}66\\ldots\\% \\approx 26{,}7\\%$.',
    },
    {
      type: 'choice',
      prompt:
        'Lớp 9C có $40$ học sinh, $10$ bạn thích bóng rổ; lớp 9D có $25$ học sinh, $8$ bạn thích bóng rổ. Khẳng định nào đúng?',
      options: [
        'Lớp 9C có tỉ lệ thích bóng rổ cao hơn vì $10 > 8$.',
        'Lớp 9D có tỉ lệ thích bóng rổ cao hơn: $32\\%$ so với $25\\%$.',
        'Hai lớp có tỉ lệ thích bóng rổ như nhau.',
        'Không so sánh được vì hai lớp có sĩ số khác nhau.',
      ],
      answer: 1,
      hints: ['So sánh tần số tương đối, không so sánh tần số.'],
      solution:
        'Lớp 9C: $\\dfrac{10}{40} = 25\\%$; lớp 9D: $\\dfrac{8}{25} = 32\\%$. Tần số tương đối giúp so sánh được hai mẫu có cỡ khác nhau, và lớp 9D có tỉ lệ cao hơn.',
    },
    {
      type: 'multi',
      prompt:
        'Một mẫu cỡ $40$ có bốn giá trị $A, B, C, D$ với tần số tương đối lần lượt $15\\%, 35\\%, 30\\%, 20\\%$. Chọn tất cả các khẳng định đúng.',
      options: [
        'Giá trị $B$ có tần số $14$.',
        'Tổng các tần số tương đối bằng $100\\%$.',
        'Hình quạt biểu diễn $C$ có góc ở tâm $30^\\circ$.',
        'Giá trị $D$ có tần số $8$.',
      ],
      answers: [0, 1, 3],
      hints: ['Tần số $m = f \\cdot n$; góc ở tâm $= 360^\\circ \\cdot f$.'],
      solution:
        '$B$: $35\\% \\cdot 40 = 14$ (đúng). $15 + 35 + 30 + 20 = 100$ (đúng). Góc của $C$ là $360^\\circ \\cdot 30\\% = 108^\\circ$, không phải $30^\\circ$. $D$: $20\\% \\cdot 40 = 8$ (đúng).',
    },
    {
      type: 'choice',
      prompt: 'Nhân mọi tần số trong một bảng tần số với $3$. Biểu đồ nào không thay đổi?',
      options: [
        'Biểu đồ tần số dạng cột',
        'Biểu đồ tần số dạng đoạn thẳng',
        'Biểu đồ tần số tương đối dạng hình quạt tròn',
        'Cả ba biểu đồ đều thay đổi',
      ],
      answer: 2,
      hints: ['Cỡ mẫu cũng gấp $3$ lần. Tỉ số $\\dfrac{3m}{3n}$ bằng bao nhiêu?'],
      solution:
        'Tần số tương đối mới là $\\dfrac{3m}{3n} = \\dfrac{m}{n}$, không đổi, nên biểu đồ tần số tương đối (hình quạt tròn) giữ nguyên. Các biểu đồ tần số thì cột cao gấp $3$ lần.',
    },
  ],
  takeaways: [
    'Lập bảng tần số: liệt kê các giá trị khác nhau, đếm, rồi kiểm tra tổng các tần số bằng $n$.',
    'Tần số tương đối $f = \\dfrac{m}{n} \\cdot 100\\%$; góc ở tâm $360^\\circ \\cdot f$; ngược lại $m = f \\cdot n$.',
    'So sánh hai mẫu có cỡ khác nhau bằng tần số tương đối.',
  ],
};
