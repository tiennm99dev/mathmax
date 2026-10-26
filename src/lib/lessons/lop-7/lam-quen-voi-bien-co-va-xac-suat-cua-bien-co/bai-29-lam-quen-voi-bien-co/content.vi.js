/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Làm quen với biến cố: biến cố chắc chắn, biến cố không thể, biến cố ngẫu nhiên và cách nhận biết một biến cố có xảy ra hay không khi biết kết quả.',
  intro:
    'Trước khi gieo một con xúc xắc, em có đoán trước được mặt nào sẽ xuất hiện không? Không. Nhưng em biết chắc số chấm xuất hiện sẽ nhỏ hơn $7$, và chắc chắn không thể là $8$. Bài này giúp em gọi tên ba loại sự kiện đó: chắc chắn, không thể và ngẫu nhiên.',
  objectives: [
    'Làm quen với khái niệm biến cố và các ví dụ trong tự nhiên, cuộc sống, trò chơi.',
    'Nhận biết biến cố chắc chắn, biến cố không thể và biến cố ngẫu nhiên.',
    'Xác định một biến cố có xảy ra hay không khi biết kết quả của trò chơi, thí nghiệm.',
  ],
  sections: [
    {
      heading: 'Biến cố',
      blocks: [
        {
          type: 'p',
          text: 'Trong cuộc sống ta thường gặp những câu như: "Ngày mai trời mưa", "Mặt Trời mọc ở hướng Đông", "Gieo xúc xắc được mặt $6$ chấm". Có sự kiện ta biết trước chắc chắn sẽ xảy ra, có sự kiện ta không đoán trước được.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biến cố',
          text: 'Các sự kiện, hiện tượng trong tự nhiên hay trong cuộc sống được gọi chung là biến cố. Ta thường đặt tên biến cố bằng chữ in hoa, chẳng hạn biến cố $A$: "Số chấm xuất hiện là số chẵn".',
        },
        {
          type: 'p',
          text: 'Khi làm một trò chơi hay thí nghiệm (gieo xúc xắc, tung đồng xu, rút thẻ, lấy bóng), trước hết hãy liệt kê tất cả các kết quả có thể. Chẳng hạn gieo một con xúc xắc thì số chấm xuất hiện có thể là $1;\\ 2;\\ 3;\\ 4;\\ 5;\\ 6$.',
        },
      ],
    },
    {
      heading: 'Biến cố chắc chắn, biến cố không thể, biến cố ngẫu nhiên',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ba loại biến cố',
          text: 'Biến cố chắc chắn là biến cố biết trước được luôn xảy ra. Biến cố không thể là biến cố biết trước được không bao giờ xảy ra. Biến cố ngẫu nhiên là biến cố không thể biết trước được là có xảy ra hay không.',
        },
        {
          type: 'table',
          caption: 'Gieo một con xúc xắc',
          head: ['Biến cố', 'Kết quả làm biến cố xảy ra', 'Loại biến cố'],
          rows: [
            [
              '"Số chấm xuất hiện nhỏ hơn $7$"',
              'cả sáu mặt $1;\\ 2;\\ 3;\\ 4;\\ 5;\\ 6$',
              'chắc chắn',
            ],
            ['"Số chấm xuất hiện bằng $8$"', 'không có mặt nào', 'không thể'],
            [
              '"Số chấm xuất hiện là số lẻ"',
              'mặt $1;\\ 3;\\ 5$ (các mặt $2;\\ 4;\\ 6$ thì không)',
              'ngẫu nhiên',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cách nhận biết',
          text: 'Liệt kê các kết quả có thể. Nếu mọi kết quả đều làm biến cố xảy ra thì đó là biến cố chắc chắn; nếu không kết quả nào làm biến cố xảy ra thì đó là biến cố không thể; nếu có kết quả làm biến cố xảy ra và có kết quả không làm biến cố xảy ra thì đó là biến cố ngẫu nhiên.',
        },
        {
          type: 'p',
          text: 'Biến cố ngẫu nhiên có xảy ra hay không phụ thuộc vào kết quả. Khi đã biết kết quả, ta kiểm tra được biến cố có xảy ra hay không. Chẳng hạn, gieo xúc xắc được mặt $3$ chấm thì biến cố "Số chấm xuất hiện là số lẻ" đã xảy ra, còn biến cố "Số chấm xuất hiện lớn hơn $4$" không xảy ra.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Làm thí nghiệm vài lần mà một biến cố chưa xảy ra thì chưa kết luận được đó là biến cố không thể. Chẳng hạn gieo xúc xắc $5$ lần chưa lần nào được mặt $6$ chấm, nhưng "Gieo được mặt $6$ chấm" vẫn là biến cố ngẫu nhiên. Phải xét tất cả các kết quả có thể.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thang biến cố',
    instruction:
      'Chọn một thí nghiệm và bấm "Làm 1 lần" hoặc "Làm 10 lần" để xem mỗi biến cố đã xảy ra bao nhiêu lần. Sau đó chọn từng thẻ biến cố và đặt lên thang: Không thể, Ngẫu nhiên hay Chắc chắn. Đối chiếu với danh sách các kết quả có thể trước khi đặt.',
  },
  examples: [
    {
      problem:
        'Gieo một con xúc xắc. Mỗi biến cố sau là biến cố chắc chắn, không thể hay ngẫu nhiên? $A$: "Số chấm xuất hiện là ước của $60$"; $B$: "Số chấm xuất hiện lớn hơn $6$"; $C$: "Số chấm xuất hiện là số nguyên tố".',
      steps: [
        'Các kết quả có thể: số chấm là $1;\\ 2;\\ 3;\\ 4;\\ 5;\\ 6$.',
        '$60 = 1 \\cdot 60 = 2 \\cdot 30 = 3 \\cdot 20 = 4 \\cdot 15 = 5 \\cdot 12 = 6 \\cdot 10$, nên cả sáu số đều là ước của $60$: $A$ luôn xảy ra.',
        'Không mặt nào có số chấm lớn hơn $6$: $B$ không bao giờ xảy ra.',
        'Các số nguyên tố trong sáu số là $2;\\ 3;\\ 5$. Gieo được mặt $2$ thì $C$ xảy ra, gieo được mặt $1$ thì không: $C$ không biết trước được.',
      ],
      answer: '$A$ là biến cố chắc chắn, $B$ là biến cố không thể, $C$ là biến cố ngẫu nhiên.',
    },
    {
      problem:
        'Một hộp có $10$ tấm thẻ ghi các số $1;\\ 2;\\ \\ldots;\\ 10$. Rút ngẫu nhiên một tấm thẻ. Xét biến cố $D$: "Rút được thẻ ghi số chia hết cho $3$". a) $D$ là loại biến cố nào? b) Bạn Minh rút được thẻ số $7$, bạn Lan rút được thẻ số $9$. Với mỗi bạn, biến cố $D$ có xảy ra không?',
      steps: [
        'Trong các số từ $1$ đến $10$, các số chia hết cho $3$ là $3;\\ 6;\\ 9$; các số còn lại không chia hết cho $3$.',
        'Có kết quả làm $D$ xảy ra và có kết quả không làm $D$ xảy ra, nên $D$ là biến cố ngẫu nhiên.',
        '$7$ không chia hết cho $3$, nên với Minh, $D$ không xảy ra.',
        '$9 = 3 \\cdot 3$ chia hết cho $3$, nên với Lan, $D$ xảy ra.',
      ],
      answer: 'a) $D$ là biến cố ngẫu nhiên. b) Với Minh, $D$ không xảy ra; với Lan, $D$ xảy ra.',
    },
    {
      problem:
        'Mỗi biến cố sau là chắc chắn, không thể hay ngẫu nhiên? $E$: "Ngày mai thành phố Hà Nội có mưa"; $F$: "Tháng Hai năm sau có $32$ ngày"; $G$: "Sau thứ Bảy là Chủ nhật".',
      steps: [
        'Hôm nay ta chưa biết trước ngày mai có mưa hay không: $E$ có thể xảy ra, có thể không.',
        'Tháng Hai chỉ có $28$ hoặc $29$ ngày: $F$ không bao giờ xảy ra.',
        'Ngày tiếp theo thứ Bảy luôn là Chủ nhật: $G$ luôn xảy ra.',
      ],
      answer: '$E$ là biến cố ngẫu nhiên, $F$ là biến cố không thể, $G$ là biến cố chắc chắn.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Biến cố "Mặt Trời mọc ở hướng Đông" là',
      options: ['biến cố chắc chắn', 'biến cố không thể', 'biến cố ngẫu nhiên'],
      answer: 0,
      hints: ['Biến cố này có biết trước được là luôn xảy ra không?'],
      solution:
        'Ngày nào Mặt Trời cũng mọc ở hướng Đông, ta biết trước biến cố luôn xảy ra, nên đó là biến cố chắc chắn.',
    },
    {
      type: 'choice',
      prompt: 'Gieo một con xúc xắc. Biến cố "Số chấm xuất hiện bằng $7$" là',
      options: ['biến cố chắc chắn', 'biến cố không thể', 'biến cố ngẫu nhiên'],
      answer: 1,
      hints: ['Liệt kê các số chấm có thể xuất hiện trên con xúc xắc.'],
      solution:
        'Số chấm chỉ có thể là $1;\\ 2;\\ 3;\\ 4;\\ 5;\\ 6$, không có mặt $7$ chấm, nên biến cố không bao giờ xảy ra: đó là biến cố không thể.',
    },
    {
      type: 'number',
      prompt:
        'Gieo một con xúc xắc. Có bao nhiêu kết quả có thể làm cho biến cố "Số chấm xuất hiện chia hết cho $3$" xảy ra?',
      answer: 2,
      hints: ['Trong các số $1$ đến $6$, số nào chia hết cho $3$?'],
      solution:
        'Trong các số $1;\\ 2;\\ 3;\\ 4;\\ 5;\\ 6$, chỉ có $3$ và $6$ chia hết cho $3$. Có $2$ kết quả.',
    },
    {
      type: 'multi',
      prompt:
        'Một túi có $5$ tấm thẻ ghi các số $10;\\ 15;\\ 20;\\ 25;\\ 30$. Rút ngẫu nhiên một tấm thẻ. Chọn tất cả các biến cố ngẫu nhiên.',
      options: [
        '"Rút được thẻ ghi số chia hết cho $5$"',
        '"Rút được thẻ ghi số chẵn"',
        '"Rút được thẻ ghi số lớn hơn $30$"',
        '"Rút được thẻ ghi số chia hết cho $3$"',
        '"Rút được thẻ ghi số tròn chục"',
      ],
      answers: [1, 3, 4],
      hints: [
        'Với mỗi biến cố, xem trong năm số có số nào làm nó xảy ra và có số nào làm nó không xảy ra.',
        'Ngẫu nhiên nghĩa là có cả hai loại kết quả.',
      ],
      solution:
        'Cả năm số đều chia hết cho $5$: chắc chắn. Số chẵn: $10;\\ 20;\\ 30$ (còn $15;\\ 25$ thì không): ngẫu nhiên. Không số nào lớn hơn $30$: không thể. Chia hết cho $3$: $15;\\ 30$ (còn lại thì không): ngẫu nhiên. Tròn chục: $10;\\ 20;\\ 30$ (còn $15;\\ 25$ thì không): ngẫu nhiên. Các biến cố ngẫu nhiên là biến cố thứ hai, thứ tư và thứ năm.',
    },
    {
      type: 'match',
      prompt: 'Tung một đồng xu. Nối mỗi biến cố với loại của nó.',
      left: [
        '"Đồng xu xuất hiện mặt sấp"',
        '"Đồng xu xuất hiện mặt sấp hoặc mặt ngửa"',
        '"Đồng xu xuất hiện cùng lúc cả mặt sấp và mặt ngửa"',
      ],
      right: ['biến cố chắc chắn', 'biến cố không thể', 'biến cố ngẫu nhiên'],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 1],
      ],
      hints: [
        'Tung một đồng xu chỉ có hai kết quả có thể: mặt sấp hoặc mặt ngửa, mỗi lần một mặt.',
      ],
      solution:
        'Mặt sấp có thể xuất hiện, có thể không: ngẫu nhiên. Lần tung nào cũng ra sấp hoặc ngửa: chắc chắn. Mỗi lần chỉ xuất hiện một mặt, nên không thể ra cùng lúc cả hai mặt: không thể.',
    },
    {
      type: 'choice',
      prompt:
        'Một hộp có $10$ tấm thẻ ghi các số $1;\\ 2;\\ \\ldots;\\ 10$. Bạn An rút được thẻ ghi số $7$. Biến cố "Rút được thẻ ghi số nguyên tố" có xảy ra không?',
      options: ['Có xảy ra', 'Không xảy ra', 'Chưa biết được'],
      answer: 0,
      hints: ['Đã biết kết quả là số $7$; kiểm tra $7$ có phải số nguyên tố không.'],
      solution: '$7$ chỉ có hai ước là $1$ và $7$, nên $7$ là số nguyên tố. Biến cố đã xảy ra.',
    },
    {
      type: 'choice',
      prompt: 'Hai bạn mỗi người gieo một con xúc xắc. Biến cố nào sau đây là biến cố chắc chắn?',
      options: [
        '"Tổng số chấm xuất hiện trên hai con xúc xắc bằng $13$"',
        '"Tổng số chấm xuất hiện trên hai con xúc xắc lớn hơn $1$"',
        '"Tổng số chấm xuất hiện trên hai con xúc xắc bằng $7$"',
        '"Tổng số chấm xuất hiện trên hai con xúc xắc là số chẵn"',
      ],
      answer: 1,
      hints: ['Tổng số chấm nhỏ nhất và lớn nhất có thể là bao nhiêu?'],
      solution:
        'Mỗi con có từ $1$ đến $6$ chấm nên tổng nhỏ nhất là $1 + 1 = 2$, lớn nhất là $6 + 6 = 12$. Tổng luôn lớn hơn $1$: chắc chắn. Tổng bằng $13$ là không thể; tổng bằng $7$ hay tổng chẵn đều là ngẫu nhiên.',
    },
    {
      type: 'choice',
      prompt:
        'Chọn ngẫu nhiên $2$ bạn trong $3$ bạn An, Bình, Chi để trực nhật; An và Bình là nam, Chi là nữ. Biến cố "Có ít nhất một bạn nam được chọn" là',
      options: ['biến cố chắc chắn', 'biến cố không thể', 'biến cố ngẫu nhiên'],
      answer: 0,
      hints: ['Liệt kê mọi cách chọn $2$ bạn trong $3$ bạn.'],
      solution:
        'Có ba cách chọn: An và Bình; An và Chi; Bình và Chi. Cách nào cũng có ít nhất một bạn nam (chỉ có một bạn nữ), nên biến cố luôn xảy ra: đó là biến cố chắc chắn.',
    },
  ],
  takeaways: [
    'Các sự kiện, hiện tượng trong tự nhiên hay cuộc sống được gọi chung là biến cố.',
    'Biến cố chắc chắn: biết trước luôn xảy ra. Biến cố không thể: biết trước không bao giờ xảy ra. Biến cố ngẫu nhiên: không biết trước có xảy ra hay không.',
    'Để nhận biết, liệt kê tất cả các kết quả có thể rồi xem kết quả nào làm biến cố xảy ra.',
    'Khi đã biết kết quả của trò chơi, thí nghiệm, ta kiểm tra được biến cố có xảy ra hay không.',
  ],
};
