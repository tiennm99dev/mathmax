/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương Mở đầu về tính xác suất của biến cố: hệ thống kiến thức về kết quả có thể, kết quả thuận lợi, xác suất bằng tỉ số và xác suất thực nghiệm, kèm bài kiểm tra có bản đồ kĩ năng.',
  intro:
    'Chương 8 cho em hai cách tính xác suất của một biến cố: đếm các kết quả đồng khả năng để lập tỉ số, và ước lượng bằng xác suất thực nghiệm khi có số liệu của nhiều lần thực nghiệm. Bài này hệ thống lại kiến thức, rồi cho em làm bài trắc nghiệm, tự luận và một bài kiểm tra tự chấm có bản đồ kĩ năng.',
  objectives: [
    'Hệ thống kiến thức của Bài 30, Bài 31 và Bài 32.',
    'Làm các bài trắc nghiệm và tự luận tổng hợp của chương.',
    'Vận dụng xác suất để giải các bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Bài', 'Kiến thức chính'],
          rows: [
            [
              'Bài 30. Kết quả có thể và kết quả thuận lợi',
              'Liệt kê các kết quả có thể của hành động, thực nghiệm; kết quả làm biến cố $E$ xảy ra là kết quả thuận lợi cho $E$.',
            ],
            [
              'Bài 31. Cách tính xác suất của biến cố bằng tỉ số',
              'Các kết quả đồng khả năng: $P(E) = \\dfrac{\\text{số kết quả thuận lợi cho } E}{\\text{tổng số kết quả có thể}}$; $0 \\le P(E) \\le 1$.',
            ],
            [
              'Bài 32. Mối liên hệ giữa xác suất thực nghiệm với xác suất và ứng dụng',
              '$E$ xảy ra $k$ lần trong $n$ lần thực nghiệm: $P(E) \\approx \\dfrac{k}{n}$; ước lượng số lượng bằng $N \\cdot \\dfrac{k}{n}$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Biến cố chắc chắn và biến cố không thể',
          text: 'Biến cố chắc chắn: mọi kết quả có thể đều thuận lợi, xác suất bằng $1$. Biến cố không thể: không có kết quả thuận lợi nào, xác suất bằng $0$.',
        },
      ],
    },
    {
      heading: 'Những lỗi thường gặp',
      blocks: [
        {
          type: 'list',
          items: [
            'Đếm thiếu hoặc đếm trùng kết quả có thể: hãy đặt tên từng kết quả (như $V1$, $X2$) rồi liệt kê.',
            'Dùng công thức tỉ số khi các kết quả không đồng khả năng, chẳng hạn vòng quay có ô to ô nhỏ.',
            'Coi xác suất thực nghiệm sau rất ít lần thử là xác suất chính xác: cần số lần thực nghiệm đủ lớn.',
            'Ước lượng từ một mẫu không được chọn ngẫu nhiên.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Mỗi lượt có $12$ câu, gồm ba câu cho mỗi bài và ba câu vận dụng thực tế. Nhập số tự nhiên hoặc xác suất dạng phân số như $1/4$ hay số thập phân như $0{,}25$. Bản đồ kĩ năng tô màu theo kết quả lần trả lời đầu của từng bài và chỉ ra bài cần ôn lại.',
  },
  examples: [
    {
      problem:
        'Một hộp có $12$ tấm thẻ như nhau ghi các số $1;\\ 2;\\ \\ldots;\\ 12$. Rút ngẫu nhiên một tấm thẻ. Tính xác suất của các biến cố $A$: "Rút được thẻ ghi số là ước của $12$"; $B$: "Rút được thẻ ghi số nguyên tố".',
      steps: [
        'Có $12$ kết quả có thể, đồng khả năng.',
        'Các ước của $12$ là $1;\\ 2;\\ 3;\\ 4;\\ 6;\\ 12$: có $6$ kết quả thuận lợi cho $A$, $P(A) = \\dfrac{6}{12} = \\dfrac{1}{2}$.',
        'Các số nguyên tố không vượt quá $12$ là $2;\\ 3;\\ 5;\\ 7;\\ 11$: có $5$ kết quả thuận lợi cho $B$, $P(B) = \\dfrac{5}{12}$.',
      ],
      answer: '$P(A) = \\dfrac{1}{2}$; $P(B) = \\dfrac{5}{12}$.',
    },
    {
      problem:
        'Một khu dân cư có $1\\,200$ hộ gia đình. Hỏi ngẫu nhiên $80$ hộ thì có $24$ hộ đã lắp tấm pin mặt trời. Ước lượng số hộ của khu dân cư đã lắp tấm pin mặt trời.',
      steps: [
        'Xác suất thực nghiệm của biến cố "Hộ được hỏi đã lắp tấm pin mặt trời": $\\dfrac{24}{80} = 0{,}3$.',
        'Xác suất một hộ của khu dân cư đã lắp tấm pin được ước lượng là $0{,}3$.',
        'Số hộ đã lắp: $1\\,200 \\cdot 0{,}3 = 360$.',
      ],
      answer: 'Khoảng $360$ hộ.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Gieo một con xúc xắc cân đối. Xác suất của biến cố "Số chấm xuất hiện là số chính phương" là',
      options: ['$\\dfrac{1}{6}$', '$\\dfrac{1}{3}$', '$\\dfrac{1}{2}$', '$\\dfrac{2}{3}$'],
      answer: 1,
      hints: ['Các số chính phương từ $1$ đến $6$ là những số nào? Nhớ rằng $1 = 1^2$.'],
      solution:
        'Số chính phương: $1$ và $4$, có $2$ kết quả thuận lợi. $P = \\dfrac{2}{6} = \\dfrac{1}{3}$.',
    },
    {
      type: 'choice',
      prompt:
        'Một hộp có $4$ viên bi đỏ và $6$ viên bi xanh cùng kích thước. Lấy ngẫu nhiên một viên bi. Xác suất lấy được bi đỏ là',
      options: ['$\\dfrac{4}{6}$', '$\\dfrac{1}{2}$', '$\\dfrac{2}{5}$', '$\\dfrac{3}{5}$'],
      answer: 2,
      hints: ['Tổng số kết quả có thể là tổng số bi, không phải số bi xanh.'],
      solution:
        'Có $10$ kết quả có thể, $4$ kết quả thuận lợi: $P = \\dfrac{4}{10} = \\dfrac{2}{5}$. Đáp án $\\dfrac{4}{6}$ sai vì chia cho số bi xanh; $\\dfrac{1}{2}$ sai vì hai màu không đồng khả năng.',
    },
    {
      type: 'choice',
      prompt: 'Xác suất của biến cố không thể là',
      options: ['$1$', '$0$', '$\\dfrac{1}{2}$', 'Không xác định được'],
      answer: 1,
      hints: ['Biến cố không thể có bao nhiêu kết quả thuận lợi?'],
      solution:
        'Biến cố không thể không có kết quả thuận lợi nào, nên xác suất bằng $\\dfrac{0}{n} = 0$.',
    },
    {
      type: 'number',
      prompt:
        'Một hộp có $6$ tấm thẻ xanh ghi số $1$ đến $6$ và $4$ tấm thẻ đỏ ghi số $1$ đến $4$. Rút ngẫu nhiên một tấm thẻ. Có bao nhiêu kết quả thuận lợi cho biến cố "Rút được thẻ ghi số chẵn"?',
      answer: 5,
      hints: ['Đếm thẻ chẵn trong thẻ xanh và trong thẻ đỏ riêng rồi cộng lại.'],
      solution:
        'Thẻ xanh chẵn: $2;\\ 4;\\ 6$ ($3$ thẻ). Thẻ đỏ chẵn: $2;\\ 4$ ($2$ thẻ). Có $3 + 2 = 5$ kết quả thuận lợi.',
    },
    {
      type: 'fraction',
      prompt: 'Với hộp thẻ ở câu trên, tính xác suất của biến cố "Rút được thẻ đỏ ghi số lẻ".',
      answer: [1, 5],
      hints: ['Có $10$ kết quả có thể; thẻ đỏ ghi số lẻ là những thẻ nào?'],
      solution: 'Thẻ đỏ ghi số lẻ: số $1$ và số $3$. $P = \\dfrac{2}{10} = \\dfrac{1}{5}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Chọn ngẫu nhiên một số tự nhiên có hai chữ số. Tính xác suất số được chọn chia hết cho cả $2$ và $5$.',
      answer: [1, 10],
      hints: ['Chia hết cho cả $2$ và $5$ nghĩa là chia hết cho $10$.'],
      solution:
        'Có $90$ kết quả có thể. Các số $10;\\ 20;\\ \\ldots;\\ 90$ gồm $9$ số. $P = \\dfrac{9}{90} = \\dfrac{1}{10}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tung đồng thời hai đồng xu cân đối. Các kết quả $SS, SN, NS, NN$ đồng khả năng. Tính xác suất của biến cố "Có ít nhất một đồng xu xuất hiện mặt sấp".',
      answer: [3, 4],
      hints: ['Kết quả nào có ít nhất một chữ $S$?'],
      solution: 'Kết quả thuận lợi: $SS, SN, NS$. $P = \\dfrac{3}{4}$.',
    },
    {
      type: 'number',
      prompt:
        'Một xạ thủ bắn $40$ phát thì trúng hồng tâm $26$ phát. Ước lượng xác suất xạ thủ bắn trúng hồng tâm ở một phát bắn (viết dưới dạng số thập phân).',
      answer: 0.65,
      hints: ['$P \\approx \\dfrac{k}{n}$.'],
      solution: '$P \\approx \\dfrac{26}{40} = 0{,}65$.',
    },
    {
      type: 'number',
      prompt:
        'Kiểm tra ngẫu nhiên $150$ chiếc khẩu trang của một xưởng thấy có $3$ chiếc không đạt chuẩn. Ước lượng số khẩu trang không đạt chuẩn trong $9\\,000$ chiếc khẩu trang của xưởng.',
      answer: 180,
      hints: ['Xác suất thực nghiệm là $\\dfrac{3}{150}$.'],
      solution:
        '$\\dfrac{3}{150} = 0{,}02$; số khẩu trang không đạt chuẩn khoảng $9\\,000 \\cdot 0{,}02 = 180$ chiếc.',
    },
    {
      type: 'number',
      prompt:
        'Đánh dấu $90$ con chim trong một khu rừng rồi thả ra. Một thời gian sau bắt ngẫu nhiên $60$ con thì có $4$ con có đánh dấu. Ước lượng số chim trong khu rừng.',
      answer: 1350,
      hints: ['$\\dfrac{90}{N} \\approx \\dfrac{4}{60}$.'],
      solution: '$N \\approx \\dfrac{90 \\cdot 60}{4} = 1\\,350$ con.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        'Xác suất của một biến cố luôn nằm trong khoảng từ $0$ đến $1$.',
        'Nếu có $3$ kết quả có thể thì xác suất của mỗi kết quả luôn bằng $\\dfrac{1}{3}$.',
        'Số lần thực nghiệm càng lớn thì xác suất thực nghiệm thường càng gần xác suất của biến cố.',
        'Biến cố chắc chắn có xác suất bằng $1$.',
      ],
      answers: [0, 2, 3],
      hints: ['Khẳng định thứ hai chỉ đúng khi có thêm một điều kiện. Điều kiện gì?'],
      solution:
        'Khẳng định thứ hai sai: chỉ khi ba kết quả đồng khả năng thì mỗi kết quả mới có xác suất $\\dfrac{1}{3}$ (vòng quay có ô to ô nhỏ là phản ví dụ). Ba khẳng định còn lại đúng.',
    },
  ],
  takeaways: [
    'Muốn tính xác suất bằng tỉ số: liệt kê kết quả có thể, kiểm tra đồng khả năng, đếm kết quả thuận lợi, lập tỉ số.',
    'Khi chỉ có số liệu thực nghiệm: $P(E) \\approx \\dfrac{k}{n}$; số lần thực nghiệm càng lớn, ước lượng thường càng tốt.',
    'Ước lượng số lượng trong tổng thể $N$ bằng $N \\cdot \\dfrac{k}{n}$, với mẫu chọn ngẫu nhiên.',
  ],
};
