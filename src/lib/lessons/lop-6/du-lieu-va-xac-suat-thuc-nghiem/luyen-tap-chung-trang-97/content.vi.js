/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về kết quả có thể, sự kiện xảy ra hay không xảy ra trong trò chơi, thí nghiệm và xác suất thực nghiệm.',
  intro:
    'Bài luyện tập này ôn lại hai bài vừa học: kết quả có thể và sự kiện trong trò chơi, thí nghiệm (Bài 42) và xác suất thực nghiệm (Bài 43). Em sẽ liệt kê kết quả có thể, xét một sự kiện có xảy ra hay không, rồi tính xác suất thực nghiệm từ bảng kết quả của nhiều lần thử.',
  objectives: [
    'Liệt kê được các kết quả có thể và các kết quả làm một sự kiện xảy ra.',
    'Nhận biết được một sự kiện xảy ra hay không xảy ra khi biết kết quả.',
    'Tính được xác suất thực nghiệm $\\dfrac{n(A)}{n}$ và viết dưới dạng phân số, số thập phân, tỉ số phần trăm.',
  ],
  sections: [
    {
      heading: 'Nhắc lại kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Kết quả có thể',
              'Không biết trước kết quả của trò chơi, thí nghiệm, nhưng liệt kê được tất cả các kết quả có thể. Ví dụ gieo xúc xắc: $\\{1; 2; 3; 4; 5; 6\\}$.',
            ],
            [
              'Sự kiện',
              'Một sự kiện có thể xảy ra hoặc không xảy ra tùy thuộc vào kết quả nhận được.',
            ],
            [
              'Xác suất thực nghiệm',
              'Thực hiện một hoạt động $n$ lần, sự kiện $A$ xảy ra $n(A)$ lần. Xác suất thực nghiệm của $A$ là $\\dfrac{n(A)}{n}$.',
            ],
            [
              'Số lần thử',
              'Xác suất thực nghiệm thay đổi theo từng loạt thử; số lần thử càng lớn thì nó càng ổn định.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách tính n(A)',
          text: 'Tìm các kết quả làm sự kiện $A$ xảy ra, rồi cộng số lần xuất hiện của các kết quả đó trong bảng thống kê. Với sự kiện "không …", có thể lấy tổng số lần trừ đi số lần của kết quả bị loại.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện ngẫu nhiên',
    instruction:
      'Mỗi lượt có $10$ câu trộn từ Bài 42 và Bài 43; đáp án là một số tự nhiên (với câu hỏi phần trăm, nhập số phần trăm, có thể kèm dấu $\\%$). Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra.',
  },
  examples: [
    {
      problem:
        'Một hộp có bốn tấm thẻ ghi các số $2$; $3$; $5$; $8$. Rút ngẫu nhiên một thẻ, ghi số rồi trả lại. a) Liệt kê các kết quả có thể và các kết quả làm sự kiện "Rút được thẻ ghi số chẵn" xảy ra. b) Làm $20$ lần, được thẻ $2$ sáu lần, thẻ $3$ bốn lần, thẻ $5$ năm lần, thẻ $8$ năm lần. Tính xác suất thực nghiệm của sự kiện đó.',
      steps: [
        'a) Tập hợp các kết quả có thể: $\\{2; 3; 5; 8\\}$. Sự kiện xảy ra khi rút được thẻ $2$ hoặc thẻ $8$.',
        'b) Kiểm tra: $6 + 4 + 5 + 5 = 20$ lần.',
        '$n(A) = 6 + 5 = 11$, nên xác suất thực nghiệm là $\\dfrac{11}{20} = 0{,}55$.',
      ],
      answer:
        'a) $\\{2; 3; 5; 8\\}$; sự kiện xảy ra với thẻ $2$, $8$. b) $\\dfrac{11}{20} = 0{,}55$.',
    },
    {
      problem:
        'Một xạ thủ bắn $40$ phát, trúng bia $34$ phát. Tính xác suất thực nghiệm của sự kiện "Bắn trúng bia" và sự kiện "Bắn trượt", viết dưới dạng tỉ số phần trăm.',
      steps: [
        '"Bắn trúng bia": $\\dfrac{34}{40} = \\dfrac{85}{100} = 85\\%$.',
        'Số phát trượt: $40 - 34 = 6$; "Bắn trượt": $\\dfrac{6}{40} = \\dfrac{15}{100} = 15\\%$.',
      ],
      answer: 'Lần lượt là $85\\%$ và $15\\%$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Một hộp có $5$ tấm thẻ ghi các chữ cái A, B, C, D, E. Rút ngẫu nhiên một tấm thẻ. Có bao nhiêu kết quả có thể?',
      answer: 5,
      unit: 'kết quả',
      hints: ['Mỗi tấm thẻ rút được là một kết quả.'],
      solution: 'Tập hợp các kết quả có thể là $\\{A; B; C; D; E\\}$, gồm $5$ kết quả.',
    },
    {
      type: 'multi',
      prompt: 'Cũng với hộp thẻ ở câu trên, rút được thẻ C. Chọn tất cả các sự kiện đã xảy ra.',
      options: [
        '"Rút được thẻ ghi nguyên âm"',
        '"Rút được thẻ ghi chữ cái đứng trước chữ D trong bảng chữ cái"',
        '"Không rút được thẻ B"',
        '"Rút được thẻ A hoặc thẻ E"',
      ],
      answers: [1, 2],
      hints: ['Trong năm chữ A, B, C, D, E, các nguyên âm là A và E.'],
      solution:
        'C là phụ âm, nên sự kiện thứ nhất và thứ tư không xảy ra. C đứng trước D, và thẻ rút được không phải B, nên sự kiện thứ hai và thứ ba xảy ra.',
    },
    {
      type: 'number',
      prompt:
        'Gieo một con xúc xắc. Có bao nhiêu kết quả có thể làm cho sự kiện "Số chấm xuất hiện không nhỏ hơn $3$" xảy ra?',
      answer: 4,
      unit: 'kết quả',
      hints: ['"Không nhỏ hơn $3$" nghĩa là lớn hơn hoặc bằng $3$.'],
      solution: 'Các kết quả $3$; $4$; $5$; $6$ chấm làm sự kiện xảy ra: $4$ kết quả.',
    },
    {
      type: 'choice',
      prompt:
        'Gieo đồng thời hai con xúc xắc, được một con $2$ chấm và một con $5$ chấm. Sự kiện "Tổng số chấm xuất hiện là số nguyên tố" có xảy ra không?',
      options: ['Xảy ra', 'Không xảy ra'],
      answer: 0,
      hints: ['Tính tổng số chấm rồi xét xem tổng có phải số nguyên tố không.'],
      solution: '$2 + 5 = 7$ là số nguyên tố, nên sự kiện xảy ra.',
    },
    {
      type: 'number',
      prompt:
        'An tung một đồng xu $40$ lần, có $22$ lần xuất hiện mặt ngửa. Tính xác suất thực nghiệm của sự kiện "Xuất hiện mặt ngửa" (viết dưới dạng số thập phân).',
      answer: 0.55,
      hints: ['Lập tỉ số $\\dfrac{22}{40}$.'],
      solution: '$\\dfrac{22}{40} = \\dfrac{11}{20} = 0{,}55$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo một con xúc xắc $50$ lần, số lần xuất hiện các mặt $1$, $2$, $3$, $4$, $5$, $6$ chấm lần lượt là $7$; $9$; $8$; $10$; $6$; $10$. Tính xác suất thực nghiệm của sự kiện "Số chấm xuất hiện là số nguyên tố" (viết dưới dạng phân số).',
      answer: [23, 50],
      hints: [
        'Các mặt có số chấm là số nguyên tố: $2$, $3$, $5$.',
        'Cộng số lần xuất hiện của ba mặt đó rồi chia cho $50$.',
      ],
      solution: '$n(A) = 9 + 8 + 6 = 23$. Xác suất thực nghiệm: $\\dfrac{23}{50}$.',
    },
    {
      type: 'number',
      prompt:
        'Với bảng $50$ lần gieo ở câu trên, xác suất thực nghiệm của sự kiện "Số chấm xuất hiện lớn hơn $4$" bằng bao nhiêu phần trăm?',
      answer: 32,
      unit: '%',
      hints: ['Sự kiện xảy ra khi được mặt $5$ hoặc $6$ chấm.'],
      solution: '$n(A) = 6 + 10 = 16$. $\\dfrac{16}{50} = \\dfrac{32}{100} = 32\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Theo dõi thời tiết trong $30$ ngày, có $12$ ngày có mưa. Tính xác suất thực nghiệm của sự kiện "Một ngày có mưa" (viết dưới dạng số thập phân).',
      answer: 0.4,
      hints: ['Mỗi ngày theo dõi là một lần thực hiện.'],
      solution: '$\\dfrac{12}{30} = \\dfrac{2}{5} = 0{,}4$.',
    },
    {
      type: 'number',
      prompt:
        'Kiểm tra ngẫu nhiên $200$ chiếc bóng đèn của một nhà máy, thấy $6$ chiếc bị lỗi. Xác suất thực nghiệm của sự kiện "Bóng đèn bị lỗi" bằng bao nhiêu phần trăm?',
      answer: 3,
      unit: '%',
      hints: ['Lập tỉ số $\\dfrac{6}{200}$, rồi viết với mẫu số $100$.'],
      solution: '$\\dfrac{6}{200} = \\dfrac{3}{100} = 3\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Bình ném bóng vào rổ $50$ lần, xác suất thực nghiệm của sự kiện "Ném trúng rổ" là $0{,}7$. Bình đã ném trượt bao nhiêu lần?',
      answer: 15,
      unit: 'lần',
      hints: [
        'Số lần ném trúng là $50 \\cdot 0{,}7$.',
        'Số lần trượt bằng tổng số lần ném trừ số lần trúng.',
      ],
      solution: 'Số lần trúng: $50 \\cdot 0{,}7 = 35$. Số lần trượt: $50 - 35 = 15$ lần.',
    },
    {
      type: 'choice',
      prompt:
        'Tung một đồng xu $1\\,000$ lần. Kết quả nào sau đây hợp lí nhất cho xác suất thực nghiệm của sự kiện "Xuất hiện mặt ngửa"?',
      options: ['$0{,}1$', '$0{,}49$', '$0{,}9$', '$1{,}2$'],
      answer: 1,
      hints: [
        'Xác suất thực nghiệm không thể lớn hơn $1$.',
        'Với rất nhiều lần tung, số lần sấp và số lần ngửa thường gần bằng nhau.',
      ],
      solution:
        'Xác suất thực nghiệm luôn từ $0$ đến $1$, nên loại $1{,}2$. Với $1\\,000$ lần tung, tỉ số ổn định gần $0{,}5$, nên $0{,}49$ là giá trị thường gặp; $0{,}1$ hay $0{,}9$ gần như không xảy ra.',
    },
  ],
  takeaways: [
    'Liệt kê đủ các kết quả có thể trước, rồi chọn ra các kết quả làm sự kiện xảy ra.',
    'Một sự kiện xảy ra hay không phụ thuộc vào kết quả nhận được.',
    'Xác suất thực nghiệm $\\dfrac{n(A)}{n}$ luôn từ $0$ đến $1$; có thể viết dưới dạng phân số, số thập phân hoặc tỉ số phần trăm.',
  ],
};
