/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương VIII: hệ thống hoá biến cố chắc chắn, không thể, ngẫu nhiên và xác suất của biến cố, kèm bài trắc nghiệm, tự luận và bài toán thực tế.',
  intro:
    'Chương VIII cho em hai công cụ để nói về sự may rủi: gọi tên loại biến cố, và đo khả năng xảy ra của nó bằng một con số từ $0$ đến $1$. Bài tập cuối chương ôn lại cả hai, kèm bản đồ kĩ năng cho biết bài nào em cần ôn thêm.',
  objectives: [
    'Hệ thống lại các khái niệm biến cố chắc chắn, không thể, ngẫu nhiên và xác suất của biến cố.',
    'Tính xác suất trong các trò chơi, thí nghiệm có kết quả đồng khả năng; so sánh xác suất.',
    'Vận dụng vào các tình huống thực tế: bốc thăm, quay số, chọn ngẫu nhiên.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Bài', 'Kiến thức chính'],
          rows: [
            [
              'Bài 29. Làm quen với biến cố',
              'Các sự kiện, hiện tượng gọi chung là biến cố. Biến cố chắc chắn: biết trước luôn xảy ra. Biến cố không thể: biết trước không bao giờ xảy ra. Biến cố ngẫu nhiên: không biết trước có xảy ra hay không.',
            ],
            [
              'Bài 30. Làm quen với xác suất của biến cố',
              'Xác suất $P(A)$ là số từ $0$ đến $1$ đo khả năng xảy ra của $A$; biến cố chắc chắn có xác suất $1$, biến cố không thể có xác suất $0$. Có $k$ biến cố đồng khả năng, luôn xảy ra duy nhất một biến cố thì mỗi biến cố có xác suất $\\dfrac{1}{k}$.',
            ],
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
            'Nhận biết loại biến cố: liệt kê các kết quả có thể, xem kết quả nào làm biến cố xảy ra.',
            'Kiểm tra một biến cố có xảy ra hay không khi đã biết kết quả.',
            'Tính xác suất khi $n$ kết quả đồng khả năng: biến cố xảy ra ở $m$ kết quả có xác suất $\\dfrac{m}{n}$.',
            'So sánh xác suất: biến cố xảy ra ở nhiều kết quả hơn (trong cùng một trò chơi) có xác suất lớn hơn.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Không phải trò chơi nào có hai kết quả cũng cho mỗi kết quả xác suất $\\dfrac{1}{2}$: chỉ khi hai kết quả đồng khả năng. Xác suất không bao giờ lớn hơn $1$ hay nhỏ hơn $0$, nên đáp số như $\\dfrac{7}{5}$ chắc chắn sai.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Mỗi lượt có 10 câu trộn từ Bài 29 và Bài 30. Nhập số tự nhiên hoặc xác suất dạng phân số a/b (ví dụ 2/5), số 0, số 1 hay số thập phân. Bản đồ kĩ năng tô màu từng bài theo kết quả lần trả lời đầu: xanh là đã vững, vàng là cần luyện thêm, đỏ là nên ôn lại bài đó.',
  },
  examples: [
    {
      problem:
        'Chọn ngẫu nhiên một tháng trong năm. Tính xác suất của biến cố "Chọn được tháng có $31$ ngày".',
      steps: [
        'Một năm có $12$ tháng, mỗi tháng có khả năng được chọn như nhau: $12$ kết quả đồng khả năng.',
        'Các tháng có $31$ ngày: tháng $1;\\ 3;\\ 5;\\ 7;\\ 8;\\ 10;\\ 12$, gồm $7$ tháng.',
        'Xác suất là $\\dfrac{7}{12}$.',
      ],
      answer: '$\\dfrac{7}{12}$.',
    },
    {
      problem:
        'Một thùng có $24$ hộp sữa giống nhau, trong đó $3$ hộp có phiếu trúng thưởng. Lấy ngẫu nhiên một hộp. Biến cố "Lấy được hộp trúng thưởng" thuộc loại nào? Tính xác suất của nó.',
      steps: [
        'Có hộp trúng thưởng và có hộp không trúng nên biến cố là ngẫu nhiên.',
        '$24$ hộp giống nhau: $24$ kết quả đồng khả năng, trong đó $3$ kết quả làm biến cố xảy ra.',
        'Xác suất là $\\dfrac{3}{24} = \\dfrac{1}{8}$.',
      ],
      answer: 'Biến cố ngẫu nhiên, có xác suất $\\dfrac{1}{8}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Biến cố nào sau đây là biến cố không thể?',
      options: [
        '"Tuần sau có $8$ ngày"',
        '"Ngày mai trời nắng"',
        '"Năm sau có $12$ tháng"',
        '"Gieo xúc xắc được mặt $6$ chấm"',
      ],
      answer: 0,
      hints: ['Biến cố không thể là biến cố biết trước không bao giờ xảy ra.'],
      solution:
        'Tuần nào cũng có $7$ ngày nên "Tuần sau có $8$ ngày" không bao giờ xảy ra. "Năm sau có $12$ tháng" là chắc chắn; hai biến cố còn lại là ngẫu nhiên.',
    },
    {
      type: 'text',
      prompt:
        'Biến cố mà ta không biết trước được là có xảy ra hay không được gọi là biến cố gì? (Điền hai chữ còn thiếu: biến cố ...)',
      accept: ['ngẫu nhiên', 'biến cố ngẫu nhiên'],
      hints: ['Đó là loại biến cố không phải chắc chắn, cũng không phải không thể.'],
      solution: 'Đó là biến cố ngẫu nhiên.',
    },
    {
      type: 'match',
      prompt: 'Gieo một con xúc xắc cân đối. Nối mỗi biến cố với xác suất của nó.',
      left: [
        '"Xuất hiện mặt $1$ chấm"',
        '"Số chấm xuất hiện là số lẻ"',
        '"Số chấm xuất hiện không vượt quá $6$"',
        '"Số chấm xuất hiện bằng $0$"',
      ],
      right: ['$0$', '$\\dfrac{1}{6}$', '$\\dfrac{1}{2}$', '$1$'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
      ],
      hints: ['Sáu mặt đồng khả năng; đếm số mặt làm mỗi biến cố xảy ra.'],
      solution:
        'Mặt $1$ chấm: $\\dfrac{1}{6}$. Số lẻ ($1;\\ 3;\\ 5$): $\\dfrac{3}{6} = \\dfrac{1}{2}$. Không vượt quá $6$: chắc chắn, $1$. Bằng $0$: không thể, $0$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một hộp có $20$ viên bi cùng kích thước: $5$ viên màu đỏ, $7$ viên màu xanh và $8$ viên màu vàng. Lấy ngẫu nhiên một viên bi. Tính xác suất của biến cố "Lấy được viên bi màu vàng".',
      answer: [2, 5],
      hints: ['$20$ viên bi là $20$ kết quả đồng khả năng.'],
      solution: 'Có $8$ viên vàng trong $20$ viên: xác suất là $\\dfrac{8}{20} = \\dfrac{2}{5}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Cũng hộp bi đó ($5$ đỏ, $7$ xanh, $8$ vàng). Tính xác suất của biến cố "Lấy được viên bi không phải màu đỏ".',
      answer: [3, 4],
      hints: ['Đếm số viên bi không phải màu đỏ: xanh và vàng.'],
      solution:
        'Số viên bi không phải màu đỏ: $7 + 8 = 15$. Xác suất là $\\dfrac{15}{20} = \\dfrac{3}{4}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Chọn ngẫu nhiên một ngày trong tuần. Tính xác suất của biến cố "Chọn được Thứ Bảy hoặc Chủ nhật".',
      answer: [2, 7],
      hints: ['Một tuần có $7$ ngày đồng khả năng.'],
      solution: 'Biến cố xảy ra ở $2$ trong $7$ ngày: xác suất là $\\dfrac{2}{7}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Chọn ngẫu nhiên một tháng trong năm. Tính xác suất của biến cố "Chọn được tháng có $30$ ngày".',
      answer: [1, 3],
      hints: ['Liệt kê các tháng có $30$ ngày.'],
      solution:
        'Các tháng có $30$ ngày: tháng $4;\\ 6;\\ 9;\\ 11$, gồm $4$ trong $12$ tháng. Xác suất là $\\dfrac{4}{12} = \\dfrac{1}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Hai bạn mỗi người gieo một con xúc xắc. Xác suất của biến cố "Tổng số chấm xuất hiện trên hai con xúc xắc nhỏ hơn $13$" bằng bao nhiêu?',
      answer: 1,
      hints: ['Tổng số chấm lớn nhất có thể là bao nhiêu?'],
      solution:
        'Tổng lớn nhất là $6 + 6 = 12 < 13$, nên biến cố luôn xảy ra: biến cố chắc chắn có xác suất $1$.',
    },
    {
      type: 'fraction',
      prompt:
        'Chọn ngẫu nhiên một số tự nhiên có hai chữ số. Tính xác suất của biến cố "Chọn được số chia hết cho $10$".',
      answer: [1, 10],
      hints: [
        'Các số có hai chữ số là từ $10$ đến $99$; có bao nhiêu số như vậy?',
        'Các số chia hết cho $10$ là $10;\\ 20;\\ \\ldots;\\ 90$.',
      ],
      solution:
        'Có $99 - 10 + 1 = 90$ số có hai chữ số, đồng khả năng. Các số chia hết cho $10$: $10;\\ 20;\\ \\ldots;\\ 90$, gồm $9$ số. Xác suất là $\\dfrac{9}{90} = \\dfrac{1}{10}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một thùng có $24$ hộp sữa giống nhau, trong đó $6$ hộp có phiếu trúng thưởng. Lấy ngẫu nhiên một hộp. Tính xác suất của biến cố "Lấy được hộp trúng thưởng".',
      answer: [1, 4],
      hints: ['$24$ hộp giống nhau là $24$ kết quả đồng khả năng.'],
      solution: 'Xác suất là $\\dfrac{6}{24} = \\dfrac{1}{4}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        'Xác suất của một biến cố là một số từ $0$ đến $1$.',
        'Một biến cố ngẫu nhiên có thể có xác suất bằng $1$.',
        'Biến cố không thể có xác suất bằng $0$.',
        'Hai biến cố đồng khả năng thì có xác suất bằng nhau.',
        'Trò chơi nào có hai kết quả thì mỗi kết quả cũng có xác suất $\\dfrac{1}{2}$.',
      ],
      answers: [0, 2, 3],
      hints: ['Nhớ lại xác suất của biến cố chắc chắn và của biến cố không thể.'],
      solution:
        'Đúng: khẳng định thứ nhất, thứ ba, thứ tư. Biến cố ngẫu nhiên có xác suất lớn hơn $0$ và nhỏ hơn $1$; xác suất $1$ là của biến cố chắc chắn. Hai kết quả chỉ có xác suất $\\dfrac{1}{2}$ khi chúng đồng khả năng (vòng quay có ô đỏ chiếm ba phần tư thì không).',
    },
    {
      type: 'choice',
      prompt:
        'Trong một trò chơi bốc thăm, hộp $A$ có $2$ phiếu trúng trong $10$ phiếu, hộp $B$ có $3$ phiếu trúng trong $20$ phiếu. Bốc ngẫu nhiên một phiếu ở hộp nào thì khả năng trúng cao hơn?',
      options: ['Hộp $A$', 'Hộp $B$', 'Như nhau'],
      answer: 0,
      hints: ['Tính xác suất trúng ở mỗi hộp rồi so sánh hai phân số.'],
      solution:
        'Hộp $A$: $\\dfrac{2}{10} = \\dfrac{4}{20}$. Hộp $B$: $\\dfrac{3}{20}$. Vì $\\dfrac{4}{20} > \\dfrac{3}{20}$ nên bốc ở hộp $A$ có khả năng trúng cao hơn, dù hộp $B$ có nhiều phiếu trúng hơn.',
    },
  ],
  takeaways: [
    'Ba loại biến cố: chắc chắn (xác suất $1$), không thể (xác suất $0$), ngẫu nhiên (xác suất từ $0$ đến $1$, không kể $0$ và $1$).',
    'Có $k$ biến cố đồng khả năng, luôn xảy ra duy nhất một biến cố thì mỗi biến cố có xác suất $\\dfrac{1}{k}$.',
    'Khi $n$ kết quả đồng khả năng, biến cố xảy ra ở $m$ kết quả có xác suất $\\dfrac{m}{n}$; so sánh xác suất bằng cách so sánh các phân số đó.',
  ],
};
