/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương 7: tần số, bảng và biểu đồ tần số; tần số tương đối, biểu đồ hình quạt tròn; ghép nhóm, bảng tần số ghép nhóm, giá trị đại diện và biểu đồ ghép nhóm.',
  intro:
    'Chương 7 cho em ba công cụ để tóm tắt một mẫu dữ liệu: đếm tần số, tính tần số tương đối và ghép nhóm khi dữ liệu có quá nhiều giá trị khác nhau. Bài ôn tập này hệ thống lại cả ba, kèm các bài trắc nghiệm, tự luận và một bộ đề tự sinh có bản đồ kĩ năng để em biết mình cần ôn lại bài nào.',
  objectives: [
    'Lập và đọc bảng tần số, bảng tần số tương đối, kể cả dạng ghép nhóm.',
    'Tính tần số tương đối, góc ở tâm của biểu đồ hình quạt tròn và giá trị đại diện của nhóm.',
    'Vận dụng các bảng và biểu đồ để trả lời câu hỏi thực tế.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức chương 7',
      blocks: [
        {
          type: 'table',
          head: ['Bài', 'Nội dung chính'],
          rows: [
            [
              'Bài 22. Bảng tần số và biểu đồ tần số',
              'Tần số $m$ là số lần một giá trị xuất hiện; cỡ mẫu $n = m_1 + \\dots + m_k$; biểu đồ tần số dạng cột hoặc dạng đoạn thẳng',
            ],
            [
              'Bài 23. Bảng tần số tương đối và biểu đồ tần số tương đối',
              '$f = \\dfrac{m}{n} \\cdot 100\\%$, tổng các $f_i$ là $100\\%$; biểu đồ dạng cột hoặc hình quạt tròn với góc ở tâm $360^\\circ \\cdot f$',
            ],
            [
              'Bài 24. Bảng tần số, tần số tương đối ghép nhóm và biểu đồ',
              'Nhóm $[a; b)$: $a \\le x < b$; giá trị đại diện $\\dfrac{a + b}{2}$; biểu đồ ghép nhóm dạng cột (các cột liền nhau) hoặc dạng đoạn thẳng nối các điểm $(x_i; f_i)$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Nhầm giá trị với tần số. Chia cho số giá trị khác nhau thay vì cho cỡ mẫu $n$. Xếp dữ liệu bằng đầu mút phải $b$ vào nhóm $[a; b)$. Lấy đầu mút làm giá trị đại diện thay cho trung điểm.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề cuối chương tự sinh $14$ câu, hai câu cho mỗi kĩ năng của ba bài. Sau khi làm xong, bản đồ kĩ năng tô màu từng kĩ năng và chỉ ra bài em cần ôn lại.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương có bản đồ kĩ năng',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra" (số thập phân dùng dấu phẩy, có thể gõ kèm % hoặc °). Sai lần đầu có gợi ý và được làm lại; sai lần hai thì xem lời giải từng bước. Ô màu đỏ hoặc vàng trên bản đồ kĩ năng là bài em nên ôn lại.',
  },
  examples: [
    {
      problem:
        'Nhiệt độ cao nhất ($^\\circ$C) trong $14$ ngày: 28; 31; 33; 29; 30; 35; 32; 30; 27; 34; 31; 33; 36; 29. Ghép số liệu thành các nhóm $[27; 30)$, $[30; 33)$, $[33; 36)$, $[36; 39)$, lập bảng tần số ghép nhóm và tìm giá trị đại diện của mỗi nhóm.',
      steps: [
        '$[27; 30)$ gồm $28, 29, 27, 29$: tần số $4$.',
        '$[30; 33)$ gồm $31, 30, 32, 30, 31$: tần số $5$ (các số $30$ thuộc nhóm này; hai số $33$ không thuộc).',
        '$[33; 36)$ gồm $33, 35, 34, 33$: tần số $4$; $[36; 39)$ gồm $36$: tần số $1$. Kiểm tra: $4 + 5 + 4 + 1 = 14$.',
        'Giá trị đại diện: $\\dfrac{27 + 30}{2} = 28{,}5$; $31{,}5$; $34{,}5$; $37{,}5$.',
      ],
      answer:
        'Tần số các nhóm: $4, 5, 4, 1$; giá trị đại diện: $28{,}5;\\ 31{,}5;\\ 34{,}5;\\ 37{,}5$.',
    },
    {
      problem:
        'Điểm kiểm tra của $25$ học sinh có bảng tần số: điểm $5, 6, 7, 8, 9$ ứng với tần số $2, 4, 9, 6, 4$. Lập bảng tần số tương đối và tính góc ở tâm của hình quạt ứng với điểm $7$.',
      steps: [
        'Cỡ mẫu $n = 2 + 4 + 9 + 6 + 4 = 25$.',
        'Mỗi học sinh ứng với $\\dfrac{100\\%}{25} = 4\\%$, nên $f = 4\\% \\cdot m$: các tần số tương đối là $8\\%, 16\\%, 36\\%, 24\\%, 16\\%$.',
        'Góc ở tâm ứng với điểm $7$: $360^\\circ \\cdot 36\\% = 129{,}6^\\circ$.',
      ],
      answer:
        'Tần số tương đối $8\\%, 16\\%, 36\\%, 24\\%, 16\\%$; hình quạt của điểm $7$ có góc ở tâm $129{,}6^\\circ$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong mẫu dữ liệu 2; 3; 3; 5; 3; 2, tần số của giá trị $3$ là',
      options: ['$1$', '$2$', '$3$', '$6$'],
      answer: 2,
      hints: ['Đếm số lần $3$ xuất hiện.'],
      solution: 'Giá trị $3$ xuất hiện ở vị trí thứ $2, 3, 5$: tần số bằng $3$.',
    },
    {
      type: 'choice',
      prompt: 'Một giá trị có tần số $6$ trong mẫu cỡ $24$. Tần số tương đối của nó là',
      options: ['$6\\%$', '$24\\%$', '$25\\%$', '$4\\%$'],
      answer: 2,
      hints: ['$f = \\dfrac{m}{n} \\cdot 100\\%$.'],
      solution: '$f = \\dfrac{6}{24} \\cdot 100\\% = 25\\%$.',
    },
    {
      type: 'choice',
      prompt: 'Với các nhóm $[20; 30)$, $[30; 40)$, $[40; 50)$, dữ liệu $30$ thuộc nhóm',
      options: ['$[20; 30)$', '$[30; 40)$', 'cả $[20; 30)$ và $[30; 40)$', '$[40; 50)$'],
      answer: 1,
      hints: ['Nhóm $[a; b)$ chứa $a$, không chứa $b$.'],
      solution: '$30 \\le 30 < 40$, nên $30$ thuộc $[30; 40)$.',
    },
    {
      type: 'number',
      prompt: 'Tìm giá trị đại diện của nhóm $[3; 4)$.',
      answer: 3.5,
      hints: ['Giá trị đại diện là trung điểm của nhóm.'],
      solution: '$\\dfrac{3 + 4}{2} = 3{,}5$.',
    },
    {
      type: 'number',
      prompt:
        'Điểm kiểm tra của $25$ học sinh: điểm $5, 6, 7, 8, 9$ có tần số $2, 4, 9, 6, 4$. Tính tần số tương đối của điểm $7$ (theo %).',
      answer: 36,
      unit: '%',
      hints: ['$f = \\dfrac{9}{25} \\cdot 100\\%$.'],
      solution: '$f = \\dfrac{9}{25} \\cdot 100\\% = 36\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Với bảng điểm ở câu trên, tính góc ở tâm của hình quạt biểu diễn điểm $8$ trong biểu đồ hình quạt tròn (theo độ).',
      answer: 86.4,
      unit: '°',
      hints: ['Góc ở tâm $= 360^\\circ \\cdot \\dfrac{m}{n}$ với $m = 6$, $n = 25$.'],
      solution: '$360^\\circ \\cdot \\dfrac{6}{25} = 360^\\circ \\cdot 0{,}24 = 86{,}4^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Với bảng điểm đó, bao nhiêu phần trăm học sinh đạt từ $8$ điểm trở lên?',
      answer: 40,
      unit: '%',
      hints: ['Cộng tần số của điểm $8$ và $9$, rồi chia cho $25$.'],
      solution: 'Có $6 + 4 = 10$ học sinh; $\\dfrac{10}{25} \\cdot 100\\% = 40\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Thời gian dùng điện thoại mỗi ngày (giờ) của $50$ học sinh có bảng tần số ghép nhóm: $[0; 1)$: $6$; $[1; 2)$: $15$; $[2; 3)$: $18$; $[3; 4)$: $8$; $[4; 5)$: $3$. Tính tần số tương đối của nhóm $[2; 3)$ (theo %).',
      answer: 36,
      unit: '%',
      hints: ['$f = \\dfrac{18}{50} \\cdot 100\\%$.'],
      solution: '$f = \\dfrac{18}{50} \\cdot 100\\% = 36\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Với bảng ở câu trên, bao nhiêu phần trăm học sinh dùng điện thoại từ $3$ giờ mỗi ngày trở lên?',
      answer: 22,
      unit: '%',
      hints: ['"Từ $3$ giờ trở lên" gồm hai nhóm $[3; 4)$ và $[4; 5)$.'],
      solution: 'Có $8 + 3 = 11$ học sinh; $\\dfrac{11}{50} \\cdot 100\\% = 22\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Nhiệt độ cao nhất ($^\\circ$C) trong $14$ ngày: 28; 31; 33; 29; 30; 35; 32; 30; 27; 34; 31; 33; 36; 29. Tìm tần số của nhóm $[33; 36)$.',
      answer: 4,
      hints: ['Đếm các số $x$ với $33 \\le x < 36$.'],
      solution: 'Các số thuộc $[33; 36)$ là $33, 35, 34, 33$: tần số bằng $4$.',
    },
    {
      type: 'number',
      prompt:
        'Một mẫu cỡ $60$ có bảng tần số: giá trị $1, 2, 3, 4$ có tần số lần lượt là $12,\\ 21,\\ m,\\ 9$. Hình quạt biểu diễn giá trị $3$ có góc ở tâm bao nhiêu độ?',
      answer: 108,
      unit: '°',
      hints: [
        'Tìm $m$ trước: tổng các tần số bằng $60$.',
        'Góc ở tâm $= 360^\\circ \\cdot \\dfrac{m}{60}$.',
      ],
      solution:
        '$m = 60 - (12 + 21 + 9) = 18$; góc ở tâm $= 360^\\circ \\cdot \\dfrac{18}{60} = 108^\\circ$.',
    },
    {
      type: 'match',
      prompt: 'Ghép mỗi loại biểu đồ với cách vẽ của nó.',
      left: [
        'Biểu đồ tần số dạng đoạn thẳng',
        'Biểu đồ tần số tương đối dạng hình quạt tròn',
        'Biểu đồ tần số tương đối ghép nhóm dạng cột',
      ],
      right: [
        'Nối liên tiếp các điểm $(x_i; m_i)$',
        'Hình quạt của $x_i$ có góc ở tâm $360^\\circ \\cdot f_i$',
        'Các cột liền nhau, đáy là các nhóm, cao $f_i$',
        'Các cột cao bằng độ dài nhóm',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Mỗi biểu đồ dùng một đại lượng: tần số $m_i$, góc $360^\\circ \\cdot f_i$ hay chiều cao $f_i$.',
      ],
      solution:
        'Dạng đoạn thẳng nối các điểm $(x_i; m_i)$; hình quạt tròn dùng góc ở tâm $360^\\circ \\cdot f_i$; biểu đồ ghép nhóm dạng cột có các cột liền nhau, đáy là nhóm, cao $f_i$. Chiều cao cột không phải độ dài nhóm.',
    },
  ],
  takeaways: [
    'Tần số đếm số lần xuất hiện; tần số tương đối $f = \\dfrac{m}{n} \\cdot 100\\%$ cho biết tỉ lệ trong cả mẫu.',
    'Biểu đồ hình quạt: góc ở tâm $360^\\circ \\cdot f$. Biểu đồ cột và đoạn thẳng: chiều cao là $m$ hoặc $f$.',
    'Ghép nhóm $[a; b)$ khi dữ liệu có nhiều giá trị; giá trị đại diện là $\\dfrac{a + b}{2}$.',
  ],
};
