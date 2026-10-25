/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Kết quả có thể của một trò chơi, thí nghiệm: không biết trước nhưng liệt kê được; sự kiện xảy ra hay không xảy ra tùy theo kết quả nhận được.',
  intro:
    'Trước khi gieo một con xúc xắc, không ai biết chắc mặt nào sẽ xuất hiện. Nhưng ai cũng biết mặt xuất hiện chỉ có thể là một trong sáu mặt từ $1$ đến $6$ chấm. Bài này giúp em liệt kê các kết quả có thể của một trò chơi, thí nghiệm và nhận biết một sự kiện đã xảy ra hay không.',
  objectives: [
    'Làm quen với tính không đoán trước được kết quả của một số trò chơi, thí nghiệm.',
    'Liệt kê được tập hợp các kết quả có thể của một trò chơi, thí nghiệm đơn giản.',
    'Nhận biết được một sự kiện có xảy ra hay không khi biết kết quả của trò chơi, thí nghiệm.',
  ],
  sections: [
    {
      heading: 'Kết quả có thể',
      blocks: [
        {
          type: 'p',
          text: 'Tung một đồng xu, mặt xuất hiện có thể là mặt sấp (S) hoặc mặt ngửa (N). Gieo một con xúc xắc, số chấm xuất hiện có thể là $1$; $2$; $3$; $4$; $5$ hoặc $6$. Lấy một quả bóng từ hộp có bóng xanh, đỏ, vàng, ta có thể lấy được một trong ba màu đó.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Kết quả có thể',
          text: 'Khi thực hiện một trò chơi hay một thí nghiệm, ta không biết trước kết quả nào sẽ xảy ra. Tuy nhiên, ta có thể liệt kê được tất cả các kết quả có thể xảy ra, gọi là các kết quả có thể.',
        },
        {
          type: 'table',
          caption: 'Tập hợp các kết quả có thể của một số trò chơi, thí nghiệm',
          head: ['Trò chơi, thí nghiệm', 'Tập hợp các kết quả có thể', 'Số kết quả'],
          rows: [
            ['Tung một đồng xu', '$\\{S; N\\}$', '$2$'],
            ['Gieo một con xúc xắc', '$\\{1; 2; 3; 4; 5; 6\\}$', '$6$'],
            ['Một người chơi oẳn tù tì', '$\\{\\text{Búa}; \\text{Kéo}; \\text{Bao}\\}$', '$3$'],
            [
              'Rút một thẻ từ hộp có các thẻ số $1$ đến $10$',
              '$\\{1; 2; 3; \\ldots; 10\\}$',
              '$10$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Mỗi lần thực hiện, chỉ một kết quả xảy ra. Thực hiện lại nhiều lần thì kết quả có thể khác nhau, nhưng tập hợp các kết quả có thể vẫn không đổi.',
        },
      ],
    },
    {
      heading: 'Sự kiện',
      blocks: [
        {
          type: 'p',
          text: 'Khi gieo một con xúc xắc, ta có thể quan tâm đến những điều như "Số chấm xuất hiện là số chẵn" hay "Số chấm xuất hiện lớn hơn $4$". Mỗi điều như vậy là một sự kiện.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Sự kiện',
          text: 'Một sự kiện có thể xảy ra hoặc không xảy ra, tùy thuộc vào kết quả của trò chơi, thí nghiệm. Sự kiện xảy ra khi kết quả nhận được làm cho điều nói trong sự kiện là đúng; ngược lại, sự kiện không xảy ra.',
        },
        {
          type: 'table',
          caption: 'Gieo một con xúc xắc và được mặt $4$ chấm',
          head: ['Sự kiện', 'Các kết quả làm sự kiện xảy ra', 'Với mặt $4$ chấm'],
          rows: [
            ['Số chấm xuất hiện là số chẵn', '$2$; $4$; $6$', 'Xảy ra'],
            ['Số chấm xuất hiện là số nguyên tố', '$2$; $3$; $5$', 'Không xảy ra'],
            ['Số chấm xuất hiện lớn hơn $4$', '$5$; $6$', 'Không xảy ra'],
            ['Số chấm xuất hiện nhỏ hơn $5$', '$1$; $2$; $3$; $4$', 'Xảy ra'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Muốn biết một sự kiện có xảy ra hay không, phải nhìn vào kết quả đã nhận được. Trước khi thực hiện, ta chỉ nói được những kết quả nào sẽ làm sự kiện xảy ra.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thử và đánh dấu sự kiện',
    instruction:
      'Chọn một trò chơi, thí nghiệm và xem tập hợp các kết quả có thể. Bấm nút để thực hiện ngẫu nhiên (hoặc chạm vào một kết quả để tự chọn), rồi đánh dấu từng sự kiện là "Xảy ra" hay "Không xảy ra" và bấm "Kiểm tra".',
  },
  examples: [
    {
      problem:
        'Một hộp có ba quả bóng: một xanh, một đỏ, một vàng. Bạn An lấy ra cùng lúc hai quả bóng. Liệt kê các kết quả có thể.',
      steps: [
        'Mỗi kết quả là một cặp hai màu khác nhau; thứ tự lấy không quan trọng vì lấy cùng lúc.',
        'Ghép xanh với từng màu còn lại: (xanh, đỏ), (xanh, vàng).',
        'Ghép đỏ với màu chưa ghép: (đỏ, vàng).',
      ],
      answer: 'Có $3$ kết quả có thể: (xanh, đỏ), (xanh, vàng), (đỏ, vàng).',
    },
    {
      problem:
        'Gieo đồng thời hai con xúc xắc, được một con $4$ chấm và một con $3$ chấm. Mỗi sự kiện sau có xảy ra không? a) "Tổng số chấm xuất hiện là số chẵn"; b) "Tổng số chấm xuất hiện lớn hơn $6$".',
      steps: [
        'Tổng số chấm: $4 + 3 = 7$.',
        'a) $7$ là số lẻ, nên sự kiện a) không xảy ra.',
        'b) $7 > 6$, nên sự kiện b) xảy ra.',
      ],
      answer: 'Sự kiện a) không xảy ra; sự kiện b) xảy ra.',
    },
    {
      problem:
        'Một vòng quay chia thành $8$ ô bằng nhau ghi các số từ $1$ đến $8$. Quay một lần, mũi tên chỉ vào ô số $3$. Các sự kiện "Mũi tên chỉ vào ô ghi số $3$ hoặc $5$", "Mũi tên chỉ vào ô ghi số $4$", "Mũi tên chỉ vào ô ghi số lớn hơn $5$" có xảy ra không?',
      steps: [
        'Kết quả nhận được là số $3$.',
        '"Số $3$ hoặc $5$": kết quả $3$ thỏa mãn, nên xảy ra.',
        '"Số $4$": $3 \\ne 4$, nên không xảy ra.',
        '"Số lớn hơn $5$": $3 < 5$, nên không xảy ra.',
      ],
      answer: 'Chỉ sự kiện "số $3$ hoặc $5$" xảy ra; hai sự kiện còn lại không xảy ra.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tung một đồng xu. Có bao nhiêu kết quả có thể?',
      answer: 2,
      unit: 'kết quả',
      hints: ['Đồng xu có hai mặt.'],
      solution: 'Tập hợp các kết quả có thể là $\\{S; N\\}$, gồm $2$ kết quả.',
    },
    {
      type: 'number',
      prompt:
        'Một hộp có $12$ tấm thẻ được đánh số từ $1$ đến $12$. Rút ngẫu nhiên một tấm thẻ. Có bao nhiêu kết quả có thể?',
      answer: 12,
      unit: 'kết quả',
      hints: ['Mỗi tấm thẻ rút được là một kết quả có thể.'],
      solution: 'Tập hợp các kết quả có thể là $\\{1; 2; 3; \\ldots; 12\\}$, gồm $12$ kết quả.',
    },
    {
      type: 'multi',
      prompt: 'Gieo một con xúc xắc và được mặt $3$ chấm. Chọn tất cả các sự kiện đã xảy ra.',
      options: [
        '"Số chấm xuất hiện là số lẻ"',
        '"Số chấm xuất hiện là số nguyên tố"',
        '"Số chấm xuất hiện lớn hơn $3$"',
        '"Số chấm xuất hiện chia hết cho $3$"',
      ],
      answers: [0, 1, 3],
      hints: [
        'Với mỗi sự kiện, thay số $3$ vào và xem điều nói trong sự kiện có đúng không.',
        '"Lớn hơn $3$" nghĩa là $4$, $5$ hoặc $6$.',
      ],
      solution:
        '$3$ là số lẻ, là số nguyên tố và chia hết cho $3$, nên ba sự kiện đó xảy ra. $3$ không lớn hơn $3$, nên sự kiện "lớn hơn $3$" không xảy ra.',
    },
    {
      type: 'number',
      prompt:
        'Gieo một con xúc xắc. Có bao nhiêu kết quả có thể làm cho sự kiện "Số chấm xuất hiện là số nguyên tố" xảy ra?',
      answer: 3,
      unit: 'kết quả',
      hints: [
        'Liệt kê các số nguyên tố trong các số từ $1$ đến $6$. Nhớ rằng $1$ không là số nguyên tố.',
      ],
      solution: 'Các số nguyên tố từ $1$ đến $6$ là $2$; $3$; $5$, nên có $3$ kết quả.',
    },
    {
      type: 'number',
      prompt:
        'Hai bạn An và Bình chơi oẳn tù tì, mỗi bạn ra một trong ba kiểu Búa, Kéo, Bao. Mỗi kết quả là một cặp (kiểu của An, kiểu của Bình). Có bao nhiêu kết quả có thể?',
      answer: 9,
      unit: 'kết quả',
      hints: [
        'Cố định kiểu của An, rồi liệt kê các kiểu của Bình.',
        'An có $3$ kiểu, ứng với mỗi kiểu của An thì Bình có $3$ kiểu.',
      ],
      solution:
        'An ra Búa: (Búa, Búa), (Búa, Kéo), (Búa, Bao); tương tự khi An ra Kéo và Bao. Tổng cộng $3 + 3 + 3 = 9$ kết quả.',
    },
    {
      type: 'number',
      prompt:
        'Một hộp có bốn quả bóng màu xanh, đỏ, vàng, trắng. Lấy ra cùng lúc hai quả bóng. Có bao nhiêu kết quả có thể?',
      answer: 6,
      unit: 'kết quả',
      hints: [
        'Mỗi kết quả là một cặp hai màu khác nhau, không kể thứ tự.',
        'Ghép xanh với ba màu còn lại, rồi ghép đỏ với các màu chưa ghép, …',
      ],
      solution:
        '(xanh, đỏ), (xanh, vàng), (xanh, trắng), (đỏ, vàng), (đỏ, trắng), (vàng, trắng): $3 + 2 + 1 = 6$ kết quả.',
    },
    {
      type: 'choice',
      prompt:
        'Gieo đồng thời hai con xúc xắc, được một con $5$ chấm và một con $6$ chấm. Sự kiện "Tổng số chấm xuất hiện là số chẵn" có xảy ra không?',
      options: ['Xảy ra', 'Không xảy ra', 'Chưa biết được'],
      answer: 1,
      hints: ['Tính tổng số chấm của hai con xúc xắc.'],
      solution: '$5 + 6 = 11$ là số lẻ, nên sự kiện không xảy ra.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng khi gieo một con xúc xắc?',
      options: [
        'Trước khi gieo, ta biết chắc mặt nào sẽ xuất hiện.',
        'Trước khi gieo, ta liệt kê được tất cả các kết quả có thể.',
        'Sự kiện "Số chấm xuất hiện là số chẵn" luôn xảy ra.',
        'Gieo lại lần nữa thì tập hợp các kết quả có thể thay đổi.',
      ],
      answer: 1,
      hints: ['Ta không đoán trước được kết quả, nhưng biết kết quả có thể là những gì.'],
      solution:
        'Ta không biết trước mặt nào xuất hiện, nhưng luôn liệt kê được tập hợp $\\{1; 2; 3; 4; 5; 6\\}$. Sự kiện "số chẵn" chỉ xảy ra khi được $2$, $4$ hoặc $6$ chấm; tập hợp các kết quả có thể không đổi giữa các lần gieo.',
    },
    {
      type: 'multi',
      prompt:
        'Rút ngẫu nhiên một thẻ từ hộp có các thẻ đánh số từ $1$ đến $10$ và được thẻ số $8$. Chọn tất cả các sự kiện đã xảy ra.',
      options: [
        '"Số trên thẻ chia hết cho $4$"',
        '"Số trên thẻ là số nguyên tố"',
        '"Số trên thẻ lớn hơn $7$"',
        '"Số trên thẻ là số lẻ"',
      ],
      answers: [0, 2],
      hints: ['Thay số $8$ vào từng sự kiện.'],
      solution:
        '$8$ chia hết cho $4$ và $8 > 7$: hai sự kiện đó xảy ra. $8$ là hợp số và là số chẵn, nên hai sự kiện còn lại không xảy ra.',
    },
  ],
  takeaways: [
    'Kết quả của trò chơi, thí nghiệm không đoán trước được, nhưng liệt kê được tập hợp các kết quả có thể.',
    'Một sự kiện xảy ra hay không xảy ra tùy vào kết quả nhận được.',
    'Để xét một sự kiện, tìm các kết quả làm nó xảy ra, rồi xem kết quả nhận được có nằm trong số đó không.',
  ],
};
