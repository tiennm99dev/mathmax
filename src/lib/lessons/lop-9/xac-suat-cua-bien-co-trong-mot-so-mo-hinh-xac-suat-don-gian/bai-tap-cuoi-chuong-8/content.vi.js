/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương 8: hệ thống hóa phép thử ngẫu nhiên, không gian mẫu và xác suất của biến cố, kèm bài tập trắc nghiệm, tự luận và bài kiểm tra có bản đồ kĩ năng.',
  intro:
    'Chương 8 trả lời câu hỏi: khi các kết quả đồng khả năng, khả năng xảy ra của một biến cố là bao nhiêu? Ta mô tả không gian mẫu, đếm kết quả thuận lợi rồi lập tỉ số. Bài này tổng kết cả chương và cho em tự kiểm tra; bản đồ kĩ năng sẽ chỉ ra bài nào cần ôn lại.',
  objectives: [
    'Hệ thống lại các khái niệm phép thử, không gian mẫu, kết quả thuận lợi, xác suất.',
    'Giải các bài tập trắc nghiệm và tự luận tổng hợp của chương.',
    'Vận dụng xác suất để đánh giá một trò chơi có công bằng hay không.',
  ],
  sections: [
    {
      heading: 'Hệ thống hóa kiến thức',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Phép thử ngẫu nhiên: không biết trước kết quả, nhưng liệt kê được mọi kết quả có thể.',
            'Không gian mẫu $\\Omega$: tập hợp mọi kết quả có thể. Mô tả bằng cách liệt kê, kẻ bảng (phép thử hai bước) hoặc vẽ sơ đồ cây (nhiều bước).',
            'Kết quả thuận lợi cho biến cố $E$: kết quả của phép thử làm $E$ xảy ra.',
            'Khi các kết quả đồng khả năng: $P(E) = \\dfrac{k}{n}$, với $0 \\le P(E) \\le 1$.',
          ],
        },
        {
          type: 'table',
          head: ['Phép thử', 'Số phần tử của $\\Omega$'],
          rows: [
            ['Tung một đồng xu $2$ lần; $3$ lần', '$4$; $8$'],
            ['Gieo một con xúc xắc rồi tung một đồng xu', '$6 \\cdot 2 = 12$'],
            ['Gieo hai con xúc xắc', '$6 \\cdot 6 = 36$'],
            ['Rút lần lượt $2$ thẻ từ $m$ thẻ, không trả lại', '$m(m - 1)$'],
            ['Rút $2$ lần từ $m$ thẻ, có trả lại', '$m \\cdot m$'],
          ],
          caption: 'Một số không gian mẫu hay gặp.',
        },
      ],
    },
    {
      heading: 'Vận dụng: trò chơi có công bằng không?',
      blocks: [
        {
          type: 'p',
          text: 'Một trò chơi giữa hai người là công bằng khi hai người có xác suất thắng bằng nhau. Muốn biết trò chơi có công bằng không, ta tính xác suất thắng của mỗi người trên cùng một không gian mẫu.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ví dụ',
          text: 'Gieo hai con xúc xắc. An thắng nếu tích hai số chấm là số chẵn, Bình thắng nếu tích là số lẻ. Tích lẻ ở $9$ trong $36$ kết quả, tích chẵn ở $27$ kết quả, nên An thắng với xác suất $\\dfrac{3}{4}$, Bình chỉ $\\dfrac{1}{4}$: trò chơi không công bằng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương có bản đồ kĩ năng',
    instruction:
      'Bộ đề trộn câu hỏi từ Bài 25 và Bài 26. Mỗi kĩ năng trên bản đồ được tô màu theo kết quả lần trả lời đầu tiên; làm hết bộ đề, bản đồ sẽ chỉ ra kĩ năng cần ôn lại. Nhập số tự nhiên hoặc phân số dạng $a/b$.',
  },
  examples: [
    {
      problem:
        'Hộp có $3$ viên bi trắng và $2$ viên bi đen cùng kích thước. Lấy ngẫu nhiên lần lượt hai viên bi, không trả lại. Tính xác suất của biến cố $E$: "Cả hai viên bi đều màu trắng".',
      steps: [
        'Đánh số: $T_1, T_2, T_3$ (trắng), $D_1, D_2$ (đen). Không gian mẫu có $n = 5 \\cdot 4 = 20$ phần tử đồng khả năng.',
        'Viên đầu là một trong $3$ viên trắng, viên sau là một trong $2$ viên trắng còn lại: $k = 3 \\cdot 2 = 6$.',
        '$P(E) = \\dfrac{6}{20} = \\dfrac{3}{10}$.',
      ],
      answer: '$P(E) = \\dfrac{3}{10}$.',
    },
    {
      problem:
        'Bốn bạn Hùng, Lan, Minh, Nga bỏ phiếu ghi tên vào hộp. Rút ngẫu nhiên lần lượt hai phiếu để chọn hai bạn đi thi. Tính xác suất của biến cố $F$: "Có ít nhất một bạn nữ được chọn" (Lan và Nga là nữ).',
      steps: [
        'Không gian mẫu gồm các cặp tên rút lần lượt, có $n = 4 \\cdot 3 = 12$ phần tử đồng khả năng.',
        'Biến cố $F$ không xảy ra khi cả hai bạn đều là nam: (Hùng, Minh) và (Minh, Hùng), có $2$ kết quả.',
        'Số kết quả thuận lợi cho $F$: $k = 12 - 2 = 10$.',
        '$P(F) = \\dfrac{10}{12} = \\dfrac{5}{6}$.',
      ],
      answer: '$P(F) = \\dfrac{5}{6}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Gieo một con xúc xắc. Không gian mẫu của phép thử là',
      options: [
        '$\\Omega = \\{1;\\ 2;\\ 3;\\ 4;\\ 5;\\ 6\\}$',
        '$\\Omega = \\{0;\\ 1;\\ 2;\\ 3;\\ 4;\\ 5;\\ 6\\}$',
        '$\\Omega = \\{6\\}$',
        '$\\Omega = \\{1;\\ 6\\}$',
      ],
      answer: 0,
      hints: ['Con xúc xắc có những mặt nào?'],
      solution:
        'Số chấm xuất hiện là một trong các số từ $1$ đến $6$: $\\Omega = \\{1;\\ 2;\\ 3;\\ 4;\\ 5;\\ 6\\}$.',
    },
    {
      type: 'choice',
      prompt:
        'Gieo đồng thời hai con xúc xắc cân đối. Xác suất của biến cố "Tổng số chấm bằng $4$" là',
      options: ['$\\dfrac{1}{12}$', '$\\dfrac{1}{9}$', '$\\dfrac{1}{6}$', '$\\dfrac{1}{11}$'],
      answer: 0,
      hints: ['Liệt kê các cặp có tổng $4$; không gian mẫu có $36$ phần tử.'],
      solution:
        'Kết quả thuận lợi: $(1, 3);\\ (2, 2);\\ (3, 1)$. $P = \\dfrac{3}{36} = \\dfrac{1}{12}$.',
    },
    {
      type: 'choice',
      prompt:
        'Tung một đồng xu cân đối hai lần. Xác suất của biến cố "Cả hai lần đều xuất hiện mặt ngửa" là',
      options: ['$\\dfrac{1}{2}$', '$\\dfrac{1}{3}$', '$\\dfrac{1}{4}$', '$\\dfrac{3}{4}$'],
      answer: 2,
      hints: ['$\\Omega = \\{SS;\\ SN;\\ NS;\\ NN\\}$.'],
      solution: 'Chỉ có kết quả $NN$ thuận lợi trong $4$ kết quả: $P = \\dfrac{1}{4}$.',
    },
    {
      type: 'number',
      prompt:
        'Hộp có $6$ viên bi được đánh số từ $1$ đến $6$. Lấy ngẫu nhiên lần lượt hai viên bi, không trả lại. Không gian mẫu có bao nhiêu phần tử?',
      answer: 30,
      hints: ['Lần đầu $6$ cách, lần sau còn mấy viên?'],
      solution: 'Không gian mẫu có $6 \\cdot 5 = 30$ phần tử.',
    },
    {
      type: 'fraction',
      prompt:
        'Với hộp bi ở Ví dụ 1 ($3$ trắng, $2$ đen, lấy lần lượt hai viên không trả lại), tính xác suất hai viên bi lấy ra cùng màu.',
      answer: [2, 5],
      hints: [
        'Cùng màu: hai viên trắng hoặc hai viên đen.',
        'Hai viên trắng có $6$ kết quả (Ví dụ 1).',
      ],
      solution:
        'Hai viên trắng: $3 \\cdot 2 = 6$ kết quả; hai viên đen: $2 \\cdot 1 = 2$ kết quả. $k = 8$, $P = \\dfrac{8}{20} = \\dfrac{2}{5}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Hộp có ba tấm thẻ ghi các chữ số $1, 2, 3$. Rút ngẫu nhiên một thẻ, ghi chữ số làm hàng chục, trả thẻ lại hộp rồi rút tiếp một thẻ, ghi chữ số làm hàng đơn vị. Tính xác suất số có hai chữ số nhận được chia hết cho $3$.',
      answer: [1, 3],
      hints: [
        'Thẻ được trả lại nên không gian mẫu có $3 \\cdot 3 = 9$ phần tử: $11, 12, \\ldots, 33$.',
        'Số chia hết cho $3$ khi tổng các chữ số chia hết cho $3$.',
      ],
      solution:
        'Các số thuận lợi: $12, 21, 33$ (tổng chữ số $3$ hoặc $6$). $P = \\dfrac{3}{9} = \\dfrac{1}{3}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo đồng thời hai con xúc xắc cân đối. Bạn Hà thắng nếu tổng số chấm không nhỏ hơn $9$. Tính xác suất Hà thắng.',
      answer: [5, 18],
      hints: ['Đếm các cặp có tổng $9$, $10$, $11$, $12$.'],
      solution:
        'Tổng $9$: $4$ cặp; tổng $10$: $3$ cặp; tổng $11$: $2$ cặp; tổng $12$: $1$ cặp. $k = 10$, $P = \\dfrac{10}{36} = \\dfrac{5}{18}$.',
    },
    {
      type: 'choice',
      prompt:
        'Gieo hai con xúc xắc cân đối. An thắng nếu tích hai số chấm là số chẵn, Bình thắng nếu tích là số lẻ. Nhận xét nào đúng?',
      options: [
        'Trò chơi công bằng vì số chẵn và số lẻ "nhiều như nhau".',
        'Trò chơi không công bằng, An có xác suất thắng $\\dfrac{3}{4}$.',
        'Trò chơi không công bằng, Bình có xác suất thắng $\\dfrac{3}{4}$.',
        'Trò chơi không công bằng, An có xác suất thắng $\\dfrac{1}{2}$.',
      ],
      answer: 1,
      hints: ['Tích lẻ khi cả hai số chấm đều lẻ.'],
      solution:
        'Tích lẻ ở $3 \\cdot 3 = 9$ kết quả, tích chẵn ở $36 - 9 = 27$ kết quả. $P(\\text{An thắng}) = \\dfrac{27}{36} = \\dfrac{3}{4} \\ne \\dfrac{1}{4} = P(\\text{Bình thắng})$: trò chơi không công bằng.',
    },
    {
      type: 'fraction',
      prompt:
        'Tung một đồng xu cân đối ba lần liên tiếp. Tính xác suất của biến cố "Có ít nhất hai lần xuất hiện mặt sấp".',
      answer: [1, 2],
      hints: ['$\\Omega$ có $8$ phần tử.', 'Đếm các kết quả có hai hoặc ba chữ $S$.'],
      solution:
        'Kết quả thuận lợi: $SSS;\\ SSN;\\ SNS;\\ NSS$, có $k = 4$. $P = \\dfrac{4}{8} = \\dfrac{1}{2}$.',
    },
    {
      type: 'number',
      prompt:
        'Gieo một con xúc xắc rồi tung một đồng xu. Có bao nhiêu kết quả thuận lợi cho biến cố "Số chấm là số nguyên tố và đồng xu xuất hiện mặt sấp"?',
      answer: 3,
      hints: ['Các số nguyên tố từ $1$ đến $6$ là những số nào?'],
      solution: 'Kết quả thuận lợi: $(2, S);\\ (3, S);\\ (5, S)$, có $3$ kết quả.',
    },
    {
      type: 'fraction',
      prompt:
        'Tổ có $5$ bạn, trong đó có Lan. Chọn ngẫu nhiên một bạn làm tổ trưởng, rồi chọn ngẫu nhiên một bạn khác làm tổ phó. Tính xác suất Lan được chọn (làm tổ trưởng hoặc tổ phó).',
      answer: [2, 5],
      hints: [
        'Không gian mẫu có $5 \\cdot 4 = 20$ phần tử.',
        'Lan làm tổ trưởng: $4$ kết quả; Lan làm tổ phó: bao nhiêu kết quả?',
      ],
      solution:
        'Lan làm tổ trưởng: $4$ kết quả; Lan làm tổ phó: $4$ kết quả. $k = 8$, $P = \\dfrac{8}{20} = \\dfrac{2}{5}$.',
    },
    {
      type: 'choice',
      prompt:
        'Hộp có $1$ viên bi đỏ và $3$ viên bi xanh cùng kích thước. Lấy ngẫu nhiên một viên. Bạn Tú nói: "Chỉ có hai kết quả là đỏ hoặc xanh, nên xác suất lấy được bi đỏ là $\\dfrac{1}{2}$". Nhận xét nào đúng?',
      options: [
        'Tú đúng.',
        'Tú sai: hai kết quả "đỏ" và "xanh" không đồng khả năng; xác suất đúng là $\\dfrac{1}{4}$.',
        'Tú sai: xác suất đúng là $\\dfrac{1}{3}$.',
        'Tú sai: xác suất đúng là $\\dfrac{3}{4}$.',
      ],
      answer: 1,
      hints: ['Đánh số các viên bi: $\\text{Đ}, X_1, X_2, X_3$.'],
      solution:
        'Mỗi viên bi là một kết quả: $\\Omega = \\{\\text{Đ};\\ X_1;\\ X_2;\\ X_3\\}$, gồm $4$ kết quả đồng khả năng, chỉ $1$ kết quả thuận lợi. $P = \\dfrac{1}{4}$. Hai "kết quả" đỏ, xanh không đồng khả năng.',
    },
  ],
  takeaways: [
    'Phép thử, không gian mẫu $\\Omega$, kết quả thuận lợi là ba khái niệm nền của chương.',
    'Mô tả $\\Omega$ bằng bảng hoặc sơ đồ cây, chú ý thứ tự và việc có trả lại hay không.',
    '$P(E) = \\dfrac{k}{n}$ chỉ dùng khi các kết quả đồng khả năng; đánh số các đồ vật giống nhau.',
    'Trò chơi công bằng khi các người chơi có xác suất thắng bằng nhau.',
  ],
};
