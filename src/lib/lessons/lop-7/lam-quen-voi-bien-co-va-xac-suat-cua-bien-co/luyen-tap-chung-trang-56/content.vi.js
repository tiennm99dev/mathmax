/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: nhận biết biến cố chắc chắn, không thể, ngẫu nhiên và tính xác suất của biến cố trong các trò chơi có kết quả đồng khả năng.',
  intro:
    'Bài luyện tập này ghép hai việc em đã học: nhận ra một biến cố thuộc loại nào, rồi đo khả năng xảy ra của nó bằng xác suất. Cả hai đều bắt đầu từ một bước: liệt kê đủ các kết quả có thể.',
  objectives: [
    'Nhận biết biến cố chắc chắn, biến cố không thể, biến cố ngẫu nhiên trong trò chơi, thí nghiệm.',
    'Tính xác suất của biến cố khi các kết quả đồng khả năng; so sánh xác suất của các biến cố.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Loại biến cố', 'Nhận biết', 'Xác suất'],
          rows: [
            ['Chắc chắn', 'mọi kết quả có thể đều làm biến cố xảy ra', '$1$'],
            ['Không thể', 'không kết quả nào làm biến cố xảy ra', '$0$'],
            [
              'Ngẫu nhiên',
              'có kết quả làm biến cố xảy ra, có kết quả không',
              'lớn hơn $0$ và nhỏ hơn $1$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Biến cố đồng khả năng',
          text: 'Có $k$ biến cố đồng khả năng và luôn xảy ra duy nhất một biến cố trong số đó thì mỗi biến cố có xác suất $\\dfrac{1}{k}$. Khi $n$ kết quả có thể đồng khả năng, biến cố xảy ra ở $m$ kết quả trong số đó có xác suất $\\dfrac{m}{n}$.',
        },
      ],
    },
    {
      heading: 'Các bước giải',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Liệt kê tất cả các kết quả có thể và kiểm tra chúng có đồng khả năng không (xúc xắc cân đối, các thẻ giống nhau, các viên bi cùng kích thước, các ô bằng nhau).',
            'Tìm các kết quả làm biến cố xảy ra.',
            'Kết luận loại biến cố hoặc tính xác suất, rút gọn phân số nếu được.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Hộp có $3$ viên bi xanh và $5$ viên bi đỏ thì "lấy được bi xanh" và "lấy được bi đỏ" không đồng khả năng, nên xác suất mỗi biến cố không phải $\\dfrac{1}{2}$. Hãy coi mỗi viên bi là một kết quả.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện trộn ngẫu nhiên',
    instruction:
      'Mỗi lượt có 8 câu về Bài 29 và Bài 30. Nhập số tự nhiên khi câu hỏi đếm kết quả hay biến cố; nhập xác suất dạng phân số a/b (ví dụ 1/3), số 0, số 1 hoặc số thập phân. Sai lần đầu sẽ có gợi ý và một lần thử lại; sai lần hai sẽ hiện lời giải từng bước.',
  },
  examples: [
    {
      problem:
        'Một túi có các tấm thẻ ghi số $9;\\ 12;\\ 15;\\ 18;\\ 21;\\ 24$. Rút ngẫu nhiên một tấm thẻ. Biến cố $A$: "Rút được thẻ ghi số chia hết cho $3$" thuộc loại nào? Tính xác suất của biến cố $B$: "Rút được thẻ ghi số chẵn".',
      steps: [
        'Có $6$ tấm thẻ, $6$ kết quả đồng khả năng: $9;\\ 12;\\ 15;\\ 18;\\ 21;\\ 24$.',
        'Cả sáu số đều chia hết cho $3$ nên $A$ luôn xảy ra: $A$ là biến cố chắc chắn.',
        'Các số chẵn là $12;\\ 18;\\ 24$: $3$ trong $6$ kết quả, nên $P(B) = \\dfrac{3}{6} = \\dfrac{1}{2}$.',
      ],
      answer: '$A$ là biến cố chắc chắn; $P(B) = \\dfrac{1}{2}$.',
    },
    {
      problem:
        'Hai bạn mỗi người gieo một con xúc xắc. Tính xác suất của biến cố "Hiệu giữa số chấm lớn và số chấm nhỏ xuất hiện trên hai con xúc xắc bằng $6$".',
      steps: [
        'Mỗi con xúc xắc có số chấm từ $1$ đến $6$.',
        'Hiệu lớn nhất có thể là $6 - 1 = 5 < 6$.',
        'Vậy biến cố không bao giờ xảy ra: đó là biến cố không thể.',
      ],
      answer: 'Xác suất bằng $0$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Một túi có các tấm thẻ ghi số $9;\\ 12;\\ 15;\\ 18;\\ 21;\\ 24$. Rút ngẫu nhiên một tấm thẻ. Biến cố "Rút được thẻ ghi số lớn hơn $24$" là',
      options: ['biến cố chắc chắn', 'biến cố không thể', 'biến cố ngẫu nhiên'],
      answer: 1,
      hints: ['Số lớn nhất trong túi là số nào?'],
      solution: 'Số lớn nhất là $24$, không thẻ nào ghi số lớn hơn $24$: biến cố không thể.',
    },
    {
      type: 'choice',
      prompt:
        'Cũng túi thẻ $9;\\ 12;\\ 15;\\ 18;\\ 21;\\ 24$. Biến cố "Rút được thẻ ghi số có hai chữ số" là',
      options: ['biến cố chắc chắn', 'biến cố không thể', 'biến cố ngẫu nhiên'],
      answer: 2,
      hints: ['Có số nào trong túi chỉ có một chữ số không?'],
      solution:
        'Rút được thẻ $12$ thì biến cố xảy ra, rút được thẻ $9$ thì không. Không biết trước được: biến cố ngẫu nhiên.',
    },
    {
      type: 'fraction',
      prompt:
        'Chọn ngẫu nhiên một số trong bốn số $31;\\ 32;\\ 33;\\ 34$. Tính xác suất của biến cố "Chọn được số nguyên tố".',
      answer: [1, 4],
      hints: ['Phân tích từng số: $32$, $33$, $34$ có ước nào khác $1$ và chính nó không?'],
      solution:
        '$32 = 2 \\cdot 16$, $33 = 3 \\cdot 11$, $34 = 2 \\cdot 17$ là hợp số; chỉ $31$ là số nguyên tố. Xác suất là $\\dfrac{1}{4}$.',
    },
    {
      type: 'number',
      prompt:
        'Chọn ngẫu nhiên một số trong bốn số $31;\\ 32;\\ 33;\\ 34$. Xác suất của biến cố "Chọn được số lớn hơn $30$" bằng bao nhiêu?',
      answer: 1,
      hints: ['Biến cố này thuộc loại nào?'],
      solution: 'Cả bốn số đều lớn hơn $30$, biến cố chắc chắn có xác suất $1$.',
    },
    {
      type: 'fraction',
      prompt:
        'Trong một hộp có $12$ quả cầu màu xanh và $12$ quả cầu màu đỏ cùng kích thước. Lấy ngẫu nhiên một quả cầu. Tính xác suất của biến cố "Lấy được quả cầu màu đỏ".',
      answer: [1, 2],
      hints: [
        'Số quả cầu hai màu bằng nhau: hai biến cố "lấy được cầu xanh", "lấy được cầu đỏ" có đồng khả năng không?',
      ],
      solution:
        'Số quả cầu xanh bằng số quả cầu đỏ nên hai biến cố "Lấy được quả cầu xanh", "Lấy được quả cầu đỏ" đồng khả năng và luôn xảy ra đúng một biến cố. Xác suất là $\\dfrac{1}{2}$.',
    },
    {
      type: 'multi',
      prompt:
        'Gieo một con xúc xắc cân đối. Chọn tất cả các biến cố có xác suất bằng $\\dfrac{1}{2}$.',
      options: [
        '"Số chấm xuất hiện là số chẵn"',
        '"Số chấm xuất hiện lớn hơn $3$"',
        '"Số chấm xuất hiện là số nguyên tố"',
        '"Số chấm xuất hiện chia hết cho $3$"',
        '"Số chấm xuất hiện nhỏ hơn $3$"',
      ],
      answers: [0, 1, 2],
      hints: ['Biến cố có xác suất $\\dfrac{1}{2}$ phải xảy ra ở $3$ trong $6$ mặt.'],
      solution:
        'Số chẵn: $2;\\ 4;\\ 6$. Lớn hơn $3$: $4;\\ 5;\\ 6$. Số nguyên tố: $2;\\ 3;\\ 5$. Ba biến cố này đều xảy ra ở $3$ trong $6$ mặt, xác suất $\\dfrac{1}{2}$. Chia hết cho $3$: $3;\\ 6$ và nhỏ hơn $3$: $1;\\ 2$ có xác suất $\\dfrac{2}{6} = \\dfrac{1}{3}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một vòng quay chia thành $12$ ô bằng nhau ghi các số từ $1$ đến $12$. Tính xác suất của biến cố "Mũi tên chỉ vào ô ghi số chia hết cho $4$".',
      answer: [1, 4],
      hints: [
        '$12$ ô bằng nhau: $12$ kết quả đồng khả năng.',
        'Liệt kê các bội của $4$ không vượt quá $12$.',
      ],
      solution:
        'Các số chia hết cho $4$ là $4;\\ 8;\\ 12$: $3$ trong $12$ kết quả. Xác suất là $\\dfrac{3}{12} = \\dfrac{1}{4}$.',
    },
    {
      type: 'choice',
      prompt:
        'Lớp 7B có $20$ bạn nam và $15$ bạn nữ. Cô giáo chọn ngẫu nhiên một bạn làm lớp trưởng. Khẳng định nào đúng?',
      options: [
        'Xác suất chọn được bạn nam lớn hơn xác suất chọn được bạn nữ',
        'Xác suất chọn được bạn nam nhỏ hơn xác suất chọn được bạn nữ',
        'Hai xác suất bằng nhau vì chỉ có hai khả năng: nam hoặc nữ',
      ],
      answer: 0,
      hints: ['Mỗi bạn là một kết quả; $35$ kết quả đồng khả năng.'],
      solution:
        'Xác suất chọn được bạn nam là $\\dfrac{20}{35}$, bạn nữ là $\\dfrac{15}{35}$; $\\dfrac{20}{35} > \\dfrac{15}{35}$. "Nam", "nữ" không đồng khả năng vì số bạn khác nhau.',
    },
    {
      type: 'fraction',
      prompt:
        'Lớp 7B có $20$ bạn nam và $15$ bạn nữ. Chọn ngẫu nhiên một bạn. Tính xác suất của biến cố "Chọn được bạn nữ" (viết dưới dạng phân số tối giản).',
      answer: [3, 7],
      simplest: true,
      hints: ['Có $20 + 15$ kết quả đồng khả năng.', 'Rút gọn $\\dfrac{15}{35}$.'],
      solution:
        'Lớp có $20 + 15 = 35$ bạn. Xác suất chọn được bạn nữ là $\\dfrac{15}{35} = \\dfrac{3}{7}$.',
    },
    {
      type: 'order',
      prompt:
        'Một hộp có $10$ tấm thẻ ghi các số $1;\\ 2;\\ \\ldots;\\ 10$. Rút ngẫu nhiên một tấm thẻ. Sắp xếp các biến cố theo xác suất từ nhỏ đến lớn.',
      items: [
        '"Rút được thẻ ghi số chẵn"',
        '"Rút được thẻ ghi số nhỏ hơn $11$"',
        '"Rút được thẻ ghi số chia hết cho $5$"',
        '"Rút được thẻ ghi số lớn hơn $10$"',
      ],
      answer: [3, 2, 0, 1],
      hints: ['Tính xác suất từng biến cố rồi so sánh.'],
      solution:
        '"Lớn hơn $10$": $0$. "Chia hết cho $5$" ($5;\\ 10$): $\\dfrac{2}{10} = \\dfrac{1}{5}$. "Số chẵn" ($2;\\ 4;\\ 6;\\ 8;\\ 10$): $\\dfrac{5}{10} = \\dfrac{1}{2}$. "Nhỏ hơn $11$": $1$.',
    },
    {
      type: 'choice',
      prompt:
        'Gieo một con xúc xắc $6$ lần, bạn Hà không lần nào được mặt $1$ chấm. Hà kết luận: "Gieo được mặt $1$ chấm là biến cố không thể". Kết luận đó',
      options: [
        'đúng, vì $6$ lần đều không xảy ra',
        'sai, đó là biến cố ngẫu nhiên có xác suất $\\dfrac{1}{6}$',
        'sai, đó là biến cố chắc chắn',
      ],
      answer: 1,
      hints: [
        'Biến cố không thể là biến cố không bao giờ xảy ra; mặt $1$ chấm có thể xuất hiện không?',
      ],
      solution:
        'Mặt $1$ chấm vẫn có thể xuất hiện ở lần gieo sau, nên đây là biến cố ngẫu nhiên; sáu mặt đồng khả năng nên xác suất là $\\dfrac{1}{6}$. Vài lần thử chưa xảy ra không chứng tỏ biến cố là không thể.',
    },
  ],
  takeaways: [
    'Luôn bắt đầu bằng việc liệt kê đủ các kết quả có thể.',
    'Chắc chắn: xác suất $1$; không thể: xác suất $0$; ngẫu nhiên: xác suất từ $0$ đến $1$ (không kể $0$ và $1$).',
    'Khi $n$ kết quả đồng khả năng, biến cố xảy ra ở $m$ kết quả có xác suất $\\dfrac{m}{n}$.',
  ],
};
