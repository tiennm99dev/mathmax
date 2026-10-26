/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Kết quả có thể của một hành động hay thực nghiệm và kết quả thuận lợi cho một biến cố: liệt kê đầy đủ các kết quả có thể, rồi chọn ra những kết quả làm biến cố xảy ra.',
  intro:
    'Một hộp có $20$ chiếc phiếu như nhau, đánh số từ $1$ đến $20$. Rút ngẫu nhiên một chiếc phiếu: em có chắc rút được phiếu số $2$ không? Có thể rút được những phiếu nào? Muốn tính khả năng xảy ra của một biến cố, việc đầu tiên là liệt kê được mọi kết quả có thể.',
  objectives: [
    'Nhận biết và liệt kê các kết quả có thể của một hành động, thực nghiệm.',
    'Hiểu thế nào là kết quả thuận lợi cho một biến cố.',
    'Liệt kê và đếm các kết quả thuận lợi cho một biến cố trong các trò chơi, thực nghiệm đơn giản.',
  ],
  sections: [
    {
      heading: 'Kết quả có thể',
      blocks: [
        {
          type: 'p',
          text: 'Trong thực tế ta thường gặp các hành động, thực nghiệm mà kết quả của chúng không thể biết trước khi thực hiện: gieo xúc xắc, tung đồng xu, rút thẻ, chọn ngẫu nhiên một bạn trong lớp... Tuy không biết trước kết quả, ta thường liệt kê được tất cả các kết quả có thể xảy ra.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Kết quả có thể',
          text: 'Mỗi kết quả có thể xảy ra khi thực hiện một hành động hay thực nghiệm được gọi là một kết quả có thể của hành động, thực nghiệm đó.',
        },
        {
          type: 'table',
          head: ['Hành động, thực nghiệm', 'Các kết quả có thể', 'Số kết quả'],
          rows: [
            ['Gieo một con xúc xắc', 'mặt 1; 2; 3; 4; 5; 6 chấm', '$6$'],
            ['Rút một phiếu trong 20 phiếu số 1 đến 20', 'phiếu số 1; 2; ...; 20', '$20$'],
            [
              'Rút một thẻ trong hộp có 5 thẻ vàng số 1 đến 5 và 3 thẻ xanh số 1 đến 3',
              'V1, V2, V3, V4, V5, X1, X2, X3',
              '$8$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Gợi ý khi liệt kê',
          text: 'Đặt tên ngắn gọn cho từng kết quả (như $V1$ là thẻ vàng số $1$, $X2$ là thẻ xanh số $2$) để không bỏ sót và không đếm trùng. Hai thẻ cùng ghi số $1$ nhưng khác màu là hai kết quả khác nhau.',
        },
      ],
    },
    {
      heading: 'Kết quả thuận lợi cho một biến cố',
      blocks: [
        {
          type: 'p',
          text: 'Gieo một con xúc xắc và xét biến cố $E$: "Số chấm xuất hiện trên con xúc xắc là số nguyên tố". Biến cố $E$ xảy ra hay không tuỳ thuộc vào kết quả của lần gieo: nếu xuất hiện mặt $2$, $3$ hoặc $5$ chấm thì $E$ xảy ra; nếu xuất hiện mặt $1$, $4$ hoặc $6$ chấm thì $E$ không xảy ra.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Kết quả thuận lợi',
          text: 'Giả sử biến cố $E$ có thể xảy ra hoặc không tuỳ thuộc vào kết quả của hành động hay thực nghiệm $T$. Mỗi kết quả có thể của $T$ làm cho $E$ xảy ra được gọi là một kết quả thuận lợi cho $E$.',
        },
        {
          type: 'p',
          text: 'Vậy trong ví dụ trên có $3$ kết quả thuận lợi cho $E$: mặt $2$ chấm, mặt $3$ chấm và mặt $5$ chấm.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Liệt kê tất cả các kết quả có thể của hành động, thực nghiệm.',
            'Với từng kết quả, hỏi: nếu kết quả này xảy ra thì biến cố có xảy ra không?',
            'Những kết quả trả lời "có" là các kết quả thuận lợi cho biến cố.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Hai trường hợp đặc biệt',
          text: 'Nếu mọi kết quả có thể đều thuận lợi cho $E$ thì $E$ là biến cố chắc chắn. Nếu không có kết quả nào thuận lợi cho $E$ thì $E$ là biến cố không thể.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tô màu các kết quả thuận lợi',
    instruction:
      'Chọn một hành động và một biến cố $E$. Chạm vào các kết quả có thể làm cho $E$ xảy ra, rồi bấm "Kiểm tra". Ô viền xanh lá là chọn đúng, ô viền đỏ là kết quả không làm $E$ xảy ra. Thử cả biến cố chắc chắn và biến cố không thể.',
  },
  examples: [
    {
      problem:
        'Một hộp có $5$ tấm thẻ màu vàng ghi các số $1;\\ 2;\\ 3;\\ 4;\\ 5$ và $3$ tấm thẻ màu xanh ghi các số $1;\\ 2;\\ 3$; các thẻ có cùng kích thước. Rút ngẫu nhiên một tấm thẻ từ hộp. Hãy liệt kê và đếm các kết quả có thể.',
      steps: [
        'Kí hiệu $V1, V2, \\ldots, V5$ là các thẻ vàng ghi số $1, 2, \\ldots, 5$; $X1, X2, X3$ là các thẻ xanh ghi số $1, 2, 3$.',
        'Mỗi tấm thẻ có thể được rút ra, nên các kết quả có thể là $V1, V2, V3, V4, V5, X1, X2, X3$.',
        'Đếm: $5 + 3 = 8$ kết quả.',
      ],
      answer: 'Có $8$ kết quả có thể: $V1, V2, V3, V4, V5, X1, X2, X3$.',
    },
    {
      problem:
        'Với hộp thẻ ở ví dụ trên, tìm các kết quả thuận lợi cho biến cố $A$: "Rút được thẻ ghi số $2$" và biến cố $B$: "Rút được thẻ màu vàng ghi số lẻ".',
      steps: [
        'Các thẻ ghi số $2$ là $V2$ và $X2$, nên có $2$ kết quả thuận lợi cho $A$.',
        'Các thẻ màu vàng ghi số lẻ là $V1, V3, V5$; thẻ $X1, X3$ ghi số lẻ nhưng màu xanh nên không thuận lợi cho $B$.',
        'Vậy có $3$ kết quả thuận lợi cho $B$.',
      ],
      answer: 'Kết quả thuận lợi cho $A$: $V2, X2$. Kết quả thuận lợi cho $B$: $V1, V3, V5$.',
    },
    {
      problem:
        'Lớp 8A có $30$ học sinh, trong đó có $12$ bạn nữ. Trong lớp có $2$ bạn nữ bị cận thị và $6$ bạn nam không bị cận thị. Chọn ngẫu nhiên một học sinh trong lớp. Có bao nhiêu kết quả thuận lợi cho mỗi biến cố: $E$: "Học sinh được chọn là nữ không bị cận thị"; $F$: "Học sinh được chọn bị cận thị"?',
      steps: [
        'Mỗi học sinh là một kết quả có thể, nên có $30$ kết quả có thể.',
        'Số bạn nữ không bị cận thị: $12 - 2 = 10$, nên có $10$ kết quả thuận lợi cho $E$.',
        'Số bạn nam: $30 - 12 = 18$; số bạn nam bị cận thị: $18 - 6 = 12$.',
        'Số học sinh bị cận thị: $2 + 12 = 14$, nên có $14$ kết quả thuận lợi cho $F$.',
      ],
      answer: '$10$ kết quả thuận lợi cho $E$ và $14$ kết quả thuận lợi cho $F$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một hộp có $20$ chiếc phiếu như nhau đánh số từ $1$ đến $20$. Rút ngẫu nhiên một chiếc phiếu. Có bao nhiêu kết quả có thể?',
      answer: 20,
      hints: ['Mỗi chiếc phiếu có thể được rút ra là một kết quả có thể.'],
      solution:
        'Các kết quả có thể là rút được phiếu số $1;\\ 2;\\ \\ldots;\\ 20$, nên có $20$ kết quả có thể.',
    },
    {
      type: 'number',
      prompt:
        'Một túi có $10$ chiếc kẹp giấy: $2$ chiếc màu trắng, $5$ chiếc màu đỏ, $2$ chiếc màu tím và $1$ chiếc màu đen. Lấy ngẫu nhiên một chiếc kẹp và quan sát màu của nó. Có bao nhiêu kết quả có thể về màu của chiếc kẹp lấy được?',
      answer: 4,
      hints: [
        'Câu hỏi hỏi về màu của chiếc kẹp, không hỏi về từng chiếc kẹp.',
        'Liệt kê các màu có trong túi.',
      ],
      solution:
        'Chiếc kẹp lấy được có thể có màu trắng, đỏ, tím hoặc đen. Vậy có $4$ kết quả có thể về màu.',
    },
    {
      type: 'multi',
      prompt:
        'Gieo một con xúc xắc. Chọn tất cả các kết quả thuận lợi cho biến cố "Số chấm xuất hiện là số chia hết cho $3$".',
      options: [
        'Mặt $1$ chấm',
        'Mặt $2$ chấm',
        'Mặt $3$ chấm',
        'Mặt $4$ chấm',
        'Mặt $5$ chấm',
        'Mặt $6$ chấm',
      ],
      answers: [2, 5],
      hints: ['Trong các số từ $1$ đến $6$, số nào chia hết cho $3$?'],
      solution:
        'Chỉ có $3$ và $6$ chia hết cho $3$: kết quả thuận lợi là mặt $3$ chấm và mặt $6$ chấm.',
    },
    {
      type: 'number',
      prompt:
        'Bạn Hải có $3$ chiếc áo sơ mi trắng trơn, $2$ chiếc áo sơ mi kẻ sọc và $2$ chiếc áo sơ mi xanh trơn. Hải chọn ngẫu nhiên một chiếc áo để mặc. Có bao nhiêu kết quả thuận lợi cho biến cố "Hải chọn được chiếc áo không kẻ sọc"?',
      answer: 5,
      hints: ['Mỗi chiếc áo là một kết quả có thể.', 'Áo không kẻ sọc là các áo trơn.'],
      solution:
        'Có $3 + 2 + 2 = 7$ kết quả có thể. Áo không kẻ sọc gồm $3$ áo trắng trơn và $2$ áo xanh trơn, nên có $3 + 2 = 5$ kết quả thuận lợi.',
    },
    {
      type: 'number',
      prompt: 'Chọn ngẫu nhiên một số tự nhiên chẵn có ba chữ số. Có bao nhiêu kết quả có thể?',
      answer: 450,
      hints: [
        'Các số chẵn có ba chữ số là $100;\\ 102;\\ \\ldots;\\ 998$.',
        'Số các số cách đều: (số cuối $-$ số đầu) : khoảng cách $+ 1$.',
      ],
      solution:
        'Các số chẵn có ba chữ số là $100;\\ 102;\\ \\ldots;\\ 998$. Có $(998 - 100) : 2 + 1 = 450$ số, nên có $450$ kết quả có thể.',
    },
    {
      type: 'number',
      prompt:
        'Rút ngẫu nhiên một tấm thẻ từ hộp có $15$ tấm thẻ ghi các số $1;\\ 2;\\ \\ldots;\\ 15$. Có bao nhiêu kết quả thuận lợi cho biến cố "Rút được thẻ ghi số nguyên tố"?',
      answer: 6,
      hints: ['Liệt kê các số nguyên tố không vượt quá $15$; nhớ rằng $1$ không là số nguyên tố.'],
      solution:
        'Các số nguyên tố từ $1$ đến $15$ là $2;\\ 3;\\ 5;\\ 7;\\ 11;\\ 13$, nên có $6$ kết quả thuận lợi.',
    },
    {
      type: 'choice',
      prompt:
        'Rút ngẫu nhiên một tấm thẻ từ hộp có các thẻ ghi số $2;\\ 4;\\ 6;\\ 8;\\ 10$. Biến cố "Rút được thẻ ghi số chẵn" có bao nhiêu kết quả thuận lợi, và đó là loại biến cố nào?',
      options: [
        '$5$ kết quả thuận lợi; biến cố chắc chắn',
        '$0$ kết quả thuận lợi; biến cố không thể',
        '$5$ kết quả thuận lợi; biến cố ngẫu nhiên',
        '$2$ kết quả thuận lợi; biến cố ngẫu nhiên',
      ],
      answer: 0,
      hints: ['Kiểm tra từng thẻ: thẻ nào ghi số chẵn?'],
      solution:
        'Cả $5$ thẻ đều ghi số chẵn, nên mọi kết quả có thể đều thuận lợi: có $5$ kết quả thuận lợi và đây là biến cố chắc chắn.',
    },
    {
      type: 'number',
      prompt:
        'Một tổ có $9$ học sinh, trong đó có $4$ bạn nữ. Có $3$ bạn nam đeo kính. Chọn ngẫu nhiên một bạn trong tổ. Có bao nhiêu kết quả thuận lợi cho biến cố "Bạn được chọn là nam không đeo kính"?',
      answer: 2,
      hints: ['Tính số bạn nam trước.'],
      solution:
        'Số bạn nam: $9 - 4 = 5$. Số bạn nam không đeo kính: $5 - 3 = 2$. Vậy có $2$ kết quả thuận lợi.',
    },
  ],
  takeaways: [
    'Mỗi kết quả có thể xảy ra khi thực hiện một hành động, thực nghiệm là một kết quả có thể của nó; nên đặt tên từng kết quả để liệt kê đủ, không trùng.',
    'Kết quả có thể làm cho biến cố $E$ xảy ra là kết quả thuận lợi cho $E$.',
    'Mọi kết quả đều thuận lợi: $E$ là biến cố chắc chắn; không có kết quả thuận lợi nào: $E$ là biến cố không thể.',
  ],
};
