/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về phép thử ngẫu nhiên, không gian mẫu và cách tính xác suất của biến cố bằng tỉ số giữa số kết quả thuận lợi và số phần tử của không gian mẫu.',
  intro:
    'Bài này ôn lại hai việc chính của chương: mô tả không gian mẫu của một phép thử (liệt kê, kẻ bảng, vẽ sơ đồ cây), rồi đếm các kết quả thuận lợi để tính xác suất. Bộ bài luyện ở cuối trang sinh đề mới mỗi lần làm lại.',
  objectives: [
    'Mô tả không gian mẫu và đếm số phần tử của nó.',
    'Tìm các kết quả thuận lợi cho một biến cố.',
    'Tính xác suất của biến cố trong các phép thử gieo xúc xắc, tung đồng xu, rút thẻ, lấy bi, chọn người.',
  ],
  sections: [
    {
      heading: 'Nhắc lại kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Khái niệm', 'Nội dung'],
          rows: [
            [
              'Phép thử ngẫu nhiên',
              'Hành động, thực nghiệm mà ta không biết trước kết quả nhưng liệt kê được mọi kết quả có thể.',
            ],
            ['Không gian mẫu $\\Omega$', 'Tập hợp tất cả các kết quả có thể của phép thử.'],
            ['Kết quả thuận lợi cho $E$', 'Kết quả của phép thử làm cho biến cố $E$ xảy ra.'],
            [
              'Xác suất của $E$',
              '$P(E) = \\dfrac{k}{n}$ khi các kết quả đồng khả năng ($k$: số kết quả thuận lợi, $n$: số phần tử của $\\Omega$).',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Những lỗi hay gặp',
          text: 'Quên thứ tự trong một kết quả ($(1, 2)$ khác $(2, 1)$); nhầm giữa rút "có trả lại" và "không trả lại"; tính xác suất trên các giá trị không đồng khả năng (như $11$ giá trị của tổng số chấm hai con xúc xắc) thay vì trên các phần tử của $\\Omega$.',
        },
      ],
    },
    {
      heading: 'Đánh số các đồ vật giống nhau',
      blocks: [
        {
          type: 'p',
          text: 'Khi hộp có nhiều viên bi cùng màu, ta đánh số chúng (ví dụ $\\text{Đ}_1, \\text{Đ}_2$) để phân biệt. Nhờ vậy, mỗi viên bi là một kết quả riêng, và các kết quả của phép thử là đồng khả năng.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo đếm phần bù',
          text: 'Khi biến cố có nhiều kết quả thuận lợi, đếm các kết quả không thuận lợi rồi lấy $n$ trừ đi. Chẳng hạn khi gieo hai con xúc xắc, tích hai số chấm là số lẻ ở $3 \\cdot 3 = 9$ kết quả, nên tích chẵn ở $36 - 9 = 27$ kết quả.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện chương 8',
    instruction:
      'Các câu hỏi được trộn ngẫu nhiên từ hai bài: số phần tử của không gian mẫu (Bài 25) và xác suất của biến cố (Bài 26). Nhập số tự nhiên khi đề hỏi "bao nhiêu", nhập phân số dạng $a/b$ khi đề hỏi xác suất. Sai lần đầu sẽ có gợi ý và một lần thử lại; sai lần hai mới hiện lời giải từng bước.',
  },
  examples: [
    {
      problem:
        'An và Bình mỗi bạn gieo một con xúc xắc cân đối. Tính xác suất của biến cố $E$: "Số chấm của An lớn hơn số chấm của Bình".',
      steps: [
        'Kết quả là cặp $(a, b)$, $a$ là số chấm của An, $b$ là số chấm của Bình. Không gian mẫu có $n = 6 \\cdot 6 = 36$ phần tử đồng khả năng.',
        'Có $6$ kết quả $a = b$. Trong $30$ kết quả còn lại, đổi chỗ $a$ và $b$ ghép được thành từng đôi, nên số kết quả có $a > b$ bằng số kết quả có $a < b$: $k = \\dfrac{30}{2} = 15$.',
        '$P(E) = \\dfrac{15}{36} = \\dfrac{5}{12}$.',
      ],
      answer: '$P(E) = \\dfrac{5}{12}$.',
    },
    {
      problem:
        'Hộp có $2$ viên bi đỏ và $1$ viên bi xanh cùng kích thước. Lấy ngẫu nhiên lần lượt hai viên bi, không trả lại. Tính xác suất của biến cố $F$: "Hai viên bi lấy ra đều màu đỏ".',
      steps: [
        'Đánh số các viên bi: $\\text{Đ}_1, \\text{Đ}_2, X$. Sơ đồ cây: lần đầu $3$ nhánh, lần sau $2$ nhánh, nên $n = 3 \\cdot 2 = 6$.',
        '$\\Omega = \\{(\\text{Đ}_1, \\text{Đ}_2);\\ (\\text{Đ}_1, X);\\ (\\text{Đ}_2, \\text{Đ}_1);\\ (\\text{Đ}_2, X);\\ (X, \\text{Đ}_1);\\ (X, \\text{Đ}_2)\\}$.',
        'Kết quả thuận lợi cho $F$: $(\\text{Đ}_1, \\text{Đ}_2)$ và $(\\text{Đ}_2, \\text{Đ}_1)$, nên $k = 2$.',
        '$P(F) = \\dfrac{2}{6} = \\dfrac{1}{3}$.',
      ],
      answer: '$P(F) = \\dfrac{1}{3}$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Gieo một con xúc xắc, sau đó tung một đồng xu hai lần. Không gian mẫu của phép thử có bao nhiêu phần tử?',
      answer: 24,
      hints: ['Sơ đồ cây có ba tầng: xúc xắc, lần tung thứ nhất, lần tung thứ hai.'],
      solution: 'Số ngọn của sơ đồ cây: $6 \\cdot 2 \\cdot 2 = 24$.',
    },
    {
      type: 'choice',
      prompt: 'Phép thử nào sau đây có không gian mẫu gồm $9$ phần tử?',
      options: [
        'Rút lần lượt hai thẻ từ hộp có ba thẻ $1, 2, 3$, không trả lại.',
        'Rút lần lượt hai thẻ từ hộp có ba thẻ $1, 2, 3$, có trả lại thẻ sau lần rút đầu.',
        'Tung một đồng xu ba lần.',
        'Gieo một con xúc xắc rồi tung một đồng xu.',
      ],
      answer: 1,
      hints: ['Tính số phần tử của từng phép thử bằng sơ đồ cây.'],
      solution:
        'Lần lượt có $3 \\cdot 2 = 6$, $3 \\cdot 3 = 9$, $2 \\cdot 2 \\cdot 2 = 8$ và $6 \\cdot 2 = 12$ phần tử. Chỉ phép thử rút có trả lại có $9$ phần tử.',
    },
    {
      type: 'multi',
      prompt:
        'Gieo đồng thời hai con xúc xắc. Chọn tất cả các kết quả thuận lợi cho biến cố "Tổng số chấm bằng $4$".',
      options: ['$(1, 3)$', '$(2, 2)$', '$(3, 1)$', '$(1, 4)$', '$(2, 3)$'],
      answers: [0, 1, 2],
      hints: ['Tính tổng hai số trong từng cặp.'],
      solution:
        'Các cặp có tổng bằng $4$ là $(1, 3)$, $(2, 2)$ và $(3, 1)$. Các cặp $(1, 4)$ và $(2, 3)$ có tổng bằng $5$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tung một đồng xu cân đối hai lần liên tiếp. Tính xác suất của biến cố "Hai lần tung xuất hiện hai mặt khác nhau".',
      answer: [1, 2],
      hints: ['$\\Omega = \\{SS;\\ SN;\\ NS;\\ NN\\}$.'],
      solution: 'Kết quả thuận lợi: $SN$ và $NS$. $P = \\dfrac{2}{4} = \\dfrac{1}{2}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo đồng thời hai con xúc xắc cân đối. Tính xác suất của biến cố "Tổng số chấm chia hết cho $5$".',
      answer: [7, 36],
      hints: [
        'Tổng số chấm từ $2$ đến $12$; tổng chia hết cho $5$ là $5$ hoặc $10$.',
        'Đếm riêng các cặp có tổng $5$ và các cặp có tổng $10$.',
      ],
      solution:
        'Tổng $5$: $(1, 4);\\ (2, 3);\\ (3, 2);\\ (4, 1)$. Tổng $10$: $(4, 6);\\ (5, 5);\\ (6, 4)$. Có $k = 7$, $P = \\dfrac{7}{36}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Hộp có sáu tấm thẻ ghi số $1, 2, 3, 4, 5, 6$. Rút ngẫu nhiên lần lượt hai thẻ, không trả lại. Tính xác suất của biến cố "Tích hai số ghi trên hai thẻ là số chẵn".',
      answer: [4, 5],
      hints: [
        'Không gian mẫu có $6 \\cdot 5 = 30$ phần tử.',
        'Đếm phần bù: tích lẻ khi cả hai thẻ đều ghi số lẻ.',
      ],
      solution:
        'Hai thẻ đều lẻ: thẻ đầu có $3$ cách ($1, 3, 5$), thẻ sau còn $2$ cách, được $6$ kết quả. Số kết quả có tích chẵn: $30 - 6 = 24$. $P = \\dfrac{24}{30} = \\dfrac{4}{5}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Căng tin có $3$ loại bánh ($A$, $B$, $C$) và $2$ loại nước (cam, chanh). Mai chọn ngẫu nhiên một loại bánh và một loại nước. Tính xác suất Mai chọn bánh $A$ và nước cam.',
      answer: [1, 6],
      hints: ['Kẻ bảng $3$ hàng, $2$ cột.'],
      solution:
        'Không gian mẫu có $3 \\cdot 2 = 6$ phần tử đồng khả năng; chỉ có $1$ kết quả (bánh $A$, nước cam) thuận lợi. $P = \\dfrac{1}{6}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một gia đình có ba con; giả sử khả năng sinh con trai và con gái là như nhau. Tính xác suất của biến cố "Gia đình có đúng một con trai".',
      answer: [3, 8],
      hints: ['Sơ đồ cây ba tầng có $8$ ngọn.', 'Tìm các kết quả có đúng một chữ $T$.'],
      solution:
        '$\\Omega$ có $8$ phần tử đồng khả năng. Kết quả thuận lợi: $TGG;\\ GTG;\\ GGT$. $P = \\dfrac{3}{8}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Hộp có $3$ viên bi trắng và $2$ viên bi đen cùng kích thước. Lấy ngẫu nhiên lần lượt hai viên bi, không trả lại. Tính xác suất hai viên bi lấy ra khác màu.',
      answer: [3, 5],
      hints: [
        'Đánh số các viên bi; không gian mẫu có $5 \\cdot 4 = 20$ phần tử.',
        'Khác màu: trắng trước đen sau, hoặc đen trước trắng sau.',
      ],
      solution:
        'Trắng trước, đen sau: $3 \\cdot 2 = 6$ kết quả; đen trước, trắng sau: $2 \\cdot 3 = 6$ kết quả. $k = 12$, $P = \\dfrac{12}{20} = \\dfrac{3}{5}$.',
    },
    {
      type: 'number',
      prompt:
        'Gieo một con xúc xắc hai lần liên tiếp. Có bao nhiêu kết quả thuận lợi cho biến cố "Số chấm lần gieo thứ hai lớn hơn số chấm lần gieo thứ nhất"?',
      answer: 15,
      hints: ['Lần đầu ra $1$ chấm thì lần hai có $5$ khả năng; lần đầu ra $2$ chấm thì sao?'],
      solution: 'Đếm theo số chấm lần đầu từ $1$ đến $6$: $5 + 4 + 3 + 2 + 1 + 0 = 15$ kết quả.',
    },
  ],
  takeaways: [
    'Luôn mô tả không gian mẫu trước: liệt kê, kẻ bảng hoặc vẽ sơ đồ cây, rồi đếm $n$.',
    'Đánh số các đồ vật giống nhau để các kết quả đồng khả năng.',
    '$P(E) = \\dfrac{k}{n}$; khi $k$ khó đếm, đếm phần bù rồi lấy $n$ trừ đi.',
  ],
};
