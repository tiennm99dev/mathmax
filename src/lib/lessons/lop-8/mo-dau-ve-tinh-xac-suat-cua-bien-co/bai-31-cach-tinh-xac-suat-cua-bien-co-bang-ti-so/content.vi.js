/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Cách tính xác suất của biến cố bằng tỉ số: khi các kết quả có thể là đồng khả năng, xác suất của biến cố bằng số kết quả thuận lợi chia cho tổng số kết quả có thể.',
  intro:
    'Một túi có $20$ viên bi cùng kích thước: $7$ viên màu trắng, $4$ viên màu vàng, $6$ viên màu đen và $3$ viên màu xanh. Lấy ngẫu nhiên một viên bi. Khả năng lấy được viên bi màu trắng là bao nhiêu? Bài này cho ta một cách tính xác suất chính xác bằng một tỉ số.',
  objectives: [
    'Hiểu thế nào là các kết quả đồng khả năng.',
    'Tính xác suất của biến cố bằng tỉ số giữa số kết quả thuận lợi và tổng số kết quả có thể.',
    'Biết kiểm tra điều kiện đồng khả năng trước khi dùng công thức.',
  ],
  sections: [
    {
      heading: 'Các kết quả đồng khả năng',
      blocks: [
        {
          type: 'p',
          text: 'Con xúc xắc cân đối thì sáu mặt có khả năng xuất hiện như nhau. Các viên bi cùng kích thước, cùng khối lượng thì mỗi viên có khả năng được lấy ra như nhau. Khi đó ta nói các kết quả có thể là đồng khả năng.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đồng khả năng',
          text: 'Các kết quả có thể của một hành động hay thực nghiệm là đồng khả năng nếu chúng có khả năng xảy ra như nhau.',
        },
        {
          type: 'p',
          text: 'Các từ "ngẫu nhiên", "cân đối", "cùng kích thước", "như nhau" trong đề bài cho ta biết các kết quả có thể là đồng khả năng.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Khi nào không đồng khả năng',
          text: 'Nếu túi có một viên bi to hẳn lên, hay vòng quay có ô to ô nhỏ, thì các kết quả không còn đồng khả năng. Khi đó không được tính xác suất bằng cách đếm như dưới đây.',
        },
      ],
    },
    {
      heading: 'Tính xác suất bằng tỉ số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Xác suất của biến cố',
          text: 'Giả thiết rằng các kết quả có thể của một hành động hay thực nghiệm là đồng khả năng. Khi đó, xác suất của biến cố $E$, kí hiệu là $P(E)$, bằng tỉ số giữa số kết quả thuận lợi cho biến cố $E$ và tổng số kết quả có thể.',
        },
        {
          type: 'tex',
          tex: 'P(E) = \\dfrac{\\text{Số kết quả thuận lợi cho } E}{\\text{Tổng số kết quả có thể}}',
        },
        {
          type: 'p',
          text: 'Để tính xác suất của biến cố $E$, ta làm theo các bước:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đếm số kết quả có thể (thường bằng cách liệt kê).',
            'Chỉ ra các kết quả có thể là đồng khả năng.',
            'Đếm số kết quả thuận lợi cho biến cố $E$.',
            'Lập tỉ số giữa số kết quả thuận lợi và tổng số kết quả có thể.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Số kết quả thuận lợi không vượt quá tổng số kết quả có thể, nên $0 \\le P(E) \\le 1$. Biến cố không thể có xác suất $0$, biến cố chắc chắn có xác suất $1$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hộp bi màu',
    instruction:
      'Dùng nút $-$ và $+$ để chỉnh số bi mỗi màu, rồi chọn biến cố $E$. Các viên bi làm $E$ xảy ra được tô đậm; $P(E)$ là tỉ số giữa số viên đó và tổng số bi. Biểu đồ bên dưới cho xác suất lấy được từng màu. Chuyển sang "Bi đỏ to hơn" để thấy vì sao phải có điều kiện đồng khả năng.',
  },
  examples: [
    {
      problem:
        'Một túi có $20$ viên bi cùng kích thước và khối lượng, gồm $7$ viên màu trắng, $4$ viên màu vàng, $6$ viên màu đen và $3$ viên màu xanh. Bạn Kỳ lấy ngẫu nhiên một viên bi. Tính xác suất của biến cố $E$: "Kỳ lấy được viên bi màu trắng".',
      steps: [
        'Mỗi viên bi là một kết quả có thể, nên có $20$ kết quả có thể.',
        'Các viên bi như nhau và được lấy ngẫu nhiên, nên $20$ kết quả này là đồng khả năng.',
        'Có $7$ viên bi màu trắng, nên có $7$ kết quả thuận lợi cho $E$.',
        '$P(E) = \\dfrac{7}{20}$.',
      ],
      answer: '$P(E) = \\dfrac{7}{20}$.',
    },
    {
      problem:
        'Một hộp có các tấm thẻ như nhau ghi các số $10;\\ 11;\\ 12;\\ \\ldots;\\ 20$. Rút ngẫu nhiên một tấm thẻ. Tính xác suất của biến cố $F$: "Rút được thẻ ghi số nguyên tố".',
      steps: [
        'Từ $10$ đến $20$ có $20 - 10 + 1 = 11$ số, nên có $11$ kết quả có thể, và chúng đồng khả năng vì thẻ được rút ngẫu nhiên.',
        'Các số nguyên tố từ $10$ đến $20$ là $11;\\ 13;\\ 17;\\ 19$, nên có $4$ kết quả thuận lợi cho $F$.',
        '$P(F) = \\dfrac{4}{11}$.',
      ],
      answer: '$P(F) = \\dfrac{4}{11}$.',
    },
    {
      problem:
        'Chọn ngẫu nhiên một số tự nhiên có hai chữ số. Tính xác suất của biến cố $G$: "Số được chọn chia hết cho $9$".',
      steps: [
        'Các số tự nhiên có hai chữ số là $10;\\ 11;\\ \\ldots;\\ 99$, gồm $99 - 10 + 1 = 90$ số. Có $90$ kết quả có thể, đồng khả năng.',
        'Các số có hai chữ số chia hết cho $9$ là $18;\\ 27;\\ 36;\\ 45;\\ 54;\\ 63;\\ 72;\\ 81;\\ 90;\\ 99$, gồm $10$ số.',
        '$P(G) = \\dfrac{10}{90} = \\dfrac{1}{9}$.',
      ],
      answer: '$P(G) = \\dfrac{1}{9}$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt:
        'Với túi bi ở Ví dụ 1 ($7$ trắng, $4$ vàng, $6$ đen, $3$ xanh), tính xác suất lấy được viên bi màu đen.',
      answer: [3, 10],
      hints: ['Có $20$ kết quả có thể, đồng khả năng.', 'Đếm số viên bi màu đen.'],
      solution:
        'Có $6$ kết quả thuận lợi trong $20$ kết quả có thể: $P = \\dfrac{6}{20} = \\dfrac{3}{10}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Với túi bi ở Ví dụ 1, tính xác suất của biến cố "Lấy được viên bi không phải màu trắng".',
      answer: [13, 20],
      hints: ['Các viên bi không phải màu trắng gồm những màu nào?'],
      solution:
        'Số bi không phải màu trắng: $4 + 6 + 3 = 13$ (hoặc $20 - 7 = 13$). Xác suất là $\\dfrac{13}{20}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo một con xúc xắc cân đối. Tính xác suất của biến cố "Số chấm xuất hiện là số nguyên tố".',
      answer: [1, 2],
      hints: ['Sáu mặt đồng khả năng.', 'Các số nguyên tố từ $1$ đến $6$ là những số nào?'],
      solution:
        'Có $6$ kết quả có thể đồng khả năng. Kết quả thuận lợi: mặt $2;\\ 3;\\ 5$ chấm. $P = \\dfrac{3}{6} = \\dfrac{1}{2}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Rút ngẫu nhiên một tấm thẻ từ hộp có $30$ tấm thẻ như nhau ghi các số $1;\\ 2;\\ \\ldots;\\ 30$. Tính xác suất rút được thẻ ghi số chia hết cho $4$.',
      answer: [7, 30],
      hints: ['Các số chia hết cho $4$ không vượt quá $30$ là $4;\\ 8;\\ \\ldots$'],
      solution:
        'Các số chia hết cho $4$ từ $1$ đến $30$ là $4;\\ 8;\\ 12;\\ 16;\\ 20;\\ 24;\\ 28$, gồm $7$ số. $P = \\dfrac{7}{30}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tung đồng thời hai đồng xu cân đối. Các kết quả có thể là $SS, SN, NS, NN$ ($S$: sấp, $N$: ngửa; chữ thứ nhất là mặt của đồng xu thứ nhất) và chúng đồng khả năng. Tính xác suất của biến cố "Một đồng xu sấp, một đồng xu ngửa".',
      answer: [1, 2],
      hints: ['Kết quả nào có đúng một chữ $S$ và một chữ $N$?'],
      solution:
        'Có $2$ kết quả thuận lợi là $SN$ và $NS$ trong $4$ kết quả: $P = \\dfrac{2}{4} = \\dfrac{1}{2}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Lớp 8B có $36$ học sinh, trong đó có $16$ bạn nữ. Chọn ngẫu nhiên một học sinh làm lớp trưởng. Tính xác suất học sinh được chọn là nam.',
      answer: [5, 9],
      hints: ['Số bạn nam bằng sĩ số trừ số bạn nữ.'],
      solution: 'Số bạn nam: $36 - 16 = 20$. $P = \\dfrac{20}{36} = \\dfrac{5}{9}$.',
    },
    {
      type: 'choice',
      prompt:
        'Một vòng quay có $3$ ô: ô đỏ chiếm nửa vòng tròn, ô xanh và ô vàng mỗi ô chiếm một phần tư. Bạn An nói: "Có $1$ kết quả thuận lợi trong $3$ kết quả có thể, nên xác suất mũi tên dừng ở ô đỏ là $\\dfrac{1}{3}$". Nhận xét nào đúng?',
      options: [
        'An đúng.',
        'An sai, vì ba kết quả không đồng khả năng; xác suất đúng là $\\dfrac{1}{2}$.',
        'An sai, xác suất đúng là $\\dfrac{2}{3}$.',
        'An sai, xác suất đúng là $\\dfrac{1}{4}$.',
      ],
      answer: 1,
      hints: ['Ba ô có bằng nhau không?', 'Chia vòng tròn thành $4$ phần tư bằng nhau.'],
      solution:
        'Ba ô không bằng nhau nên ba kết quả không đồng khả năng, không dùng được tỉ số $\\dfrac{1}{3}$. Chia vòng tròn thành $4$ phần tư bằng nhau (đồng khả năng); ô đỏ gồm $2$ phần tư nên xác suất là $\\dfrac{2}{4} = \\dfrac{1}{2}$.',
    },
    {
      type: 'number',
      prompt:
        'Một hộp có $4$ viên bi đỏ và một số viên bi xanh cùng kích thước. Lấy ngẫu nhiên một viên bi, xác suất lấy được bi đỏ là $\\dfrac{1}{5}$. Hộp có bao nhiêu viên bi xanh?',
      answer: 16,
      hints: [
        'Gọi tổng số bi là $n$; ta có $\\dfrac{4}{n} = \\dfrac{1}{5}$.',
        'Tính $n$ rồi trừ đi số bi đỏ.',
      ],
      solution: '$\\dfrac{4}{n} = \\dfrac{1}{5}$ nên $n = 20$. Số bi xanh: $20 - 4 = 16$.',
    },
  ],
  takeaways: [
    'Các kết quả có thể là đồng khả năng khi chúng có khả năng xảy ra như nhau.',
    'Khi các kết quả có thể đồng khả năng: $P(E) = \\dfrac{\\text{số kết quả thuận lợi cho } E}{\\text{tổng số kết quả có thể}}$.',
    'Bốn bước: đếm kết quả có thể, kiểm tra đồng khả năng, đếm kết quả thuận lợi, lập tỉ số.',
    '$0 \\le P(E) \\le 1$; nếu các kết quả không đồng khả năng thì không dùng được công thức tỉ số.',
  ],
};
