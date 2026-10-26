/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Số thập phân hữu hạn và số thập phân vô hạn tuần hoàn, chu kì và cách viết gọn, làm tròn số thập phân căn cứ vào độ chính xác cho trước.',
  intro:
    'Chia $3$ cho $20$ ta được $0{,}15$ và phép chia dừng lại. Nhưng chia $5$ cho $11$ thì máy tính hiện $0{,}454545\\ldots$ và các chữ số $45$ cứ lặp lại mãi. Vì sao có phép chia không bao giờ dừng, và ta viết, làm tròn những số như thế nào?',
  objectives: [
    'Nhận biết số thập phân hữu hạn và số thập phân vô hạn tuần hoàn.',
    'Tìm chu kì và viết gọn một số thập phân vô hạn tuần hoàn.',
    'Làm tròn số thập phân căn cứ vào độ chính xác cho trước.',
  ],
  sections: [
    {
      heading: '1. Số thập phân hữu hạn và số thập phân vô hạn tuần hoàn',
      blocks: [
        {
          type: 'p',
          text: 'Thực hiện phép chia tử cho mẫu: $\\frac{3}{20} = 3 : 20 = 0{,}15$, phép chia dừng lại vì có số dư bằng $0$. Còn $\\frac{5}{11} = 5 : 11 = 0{,}4545\\ldots$: số dư lần lượt là $5, 6, 5, 6, \\ldots$ nên chữ số $4$ và $5$ lặp lại mãi.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số thập phân hữu hạn, vô hạn tuần hoàn',
          text: 'Số $0{,}15$ là một số thập phân hữu hạn. Số $0{,}4545\\ldots$ là một số thập phân vô hạn tuần hoàn: một chữ số hay một cụm chữ số sau dấu phẩy lặp lại mãi. Cụm chữ số lặp lại gọi là chu kì. Số $0{,}4545\\ldots$ có chu kì $45$ và được viết gọn là $0{,}(45)$.',
        },
        {
          type: 'table',
          caption: 'Một số ví dụ',
          head: ['Phân số', 'Số thập phân', 'Chu kì', 'Viết gọn'],
          rows: [
            ['$\\frac{1}{3}$', '$0{,}333\\ldots$', '$3$', '$0{,}(3)$'],
            ['$\\frac{2}{7}$', '$0{,}285714285714\\ldots$', '$285714$', '$0{,}(285714)$'],
            ['$-\\frac{1}{6}$', '$-0{,}1666\\ldots$', '$6$', '$-0{,}1(6)$'],
            ['$\\frac{7}{12}$', '$0{,}58333\\ldots$', '$3$', '$0{,}58(3)$'],
          ],
        },
        {
          type: 'p',
          text: 'Với $-0{,}1(6)$ và $0{,}58(3)$, chu kì không bắt đầu ngay sau dấu phẩy: các chữ số đứng trước chu kì vẫn được viết ra, chỉ cụm chữ số lặp lại mới đặt trong ngoặc.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Nhận xét',
          text: 'Mỗi số hữu tỉ được biểu diễn bởi một số thập phân hữu hạn hoặc một số thập phân vô hạn tuần hoàn. Ngược lại, mỗi số thập phân hữu hạn hay vô hạn tuần hoàn đều biểu diễn một số hữu tỉ.',
        },
        {
          type: 'p',
          text: 'Vì sao phép chia $a : b$ hoặc dừng, hoặc lặp lại? Mỗi số dư là một trong các số $0, 1, \\ldots, b - 1$. Nếu chưa gặp số dư $0$ thì sau nhiều nhất $b - 1$ bước, một số dư cũ phải xuất hiện lại, và từ đó các chữ số của thương lặp lại đúng như trước.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận biết trước khi chia',
          text: 'Viết phân số dưới dạng tối giản với mẫu dương. Nếu mẫu không có ước nguyên tố nào khác $2$ và $5$ thì phân số viết được dưới dạng số thập phân hữu hạn, chẳng hạn $\\frac{3}{20}$ vì $20 = 2^2 \\cdot 5$. Nếu mẫu có ước nguyên tố khác $2$ và $5$ thì đó là số thập phân vô hạn tuần hoàn, chẳng hạn $\\frac{5}{11}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Nhớ rút gọn trước',
          text: '$\\frac{9}{30}$ có mẫu $30 = 2 \\cdot 3 \\cdot 5$, nhưng $\\frac{9}{30} = \\frac{3}{10} = 0{,}3$ là số thập phân hữu hạn. Phải xét mẫu của phân số tối giản.',
        },
      ],
    },
    {
      heading: '2. Làm tròn số thập phân căn cứ vào độ chính xác cho trước',
      blocks: [
        {
          type: 'p',
          text: 'Ở lớp 6 em đã biết quy tắc làm tròn số thập phân đến một hàng nào đó: nhìn chữ số ngay bên phải hàng làm tròn.',
        },
        {
          type: 'list',
          items: [
            'Nếu chữ số đó nhỏ hơn $5$ thì giữ nguyên chữ số ở hàng làm tròn; nếu lớn hơn hoặc bằng $5$ thì tăng chữ số ở hàng làm tròn thêm $1$ đơn vị.',
            'Các chữ số sau hàng làm tròn: bỏ đi nếu ở phần thập phân, thay bằng chữ số $0$ nếu ở phần số nguyên.',
          ],
        },
        {
          type: 'p',
          text: 'Làm tròn $\\pi = 3{,}14159\\ldots$ đến hàng phần trăm ta được $3{,}14$. Sai số $|3{,}14159\\ldots - 3{,}14| = 0{,}00159\\ldots$ không vượt quá $0{,}005$, tức là nửa đơn vị của hàng phần trăm. Ta nói số $\\pi$ được làm tròn đến $3{,}14$ với độ chính xác $0{,}005$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Độ chính xác',
          text: 'Khi làm tròn đến một hàng, sai số không vượt quá nửa đơn vị của hàng đó. Vì vậy làm tròn với độ chính xác $0{,}5$ là làm tròn đến hàng đơn vị; độ chính xác $0{,}05$: hàng phần mười; $0{,}005$: hàng phần trăm; độ chính xác $5$: hàng chục; $50$: hàng trăm.',
        },
        {
          type: 'table',
          head: [
            'Độ chính xác',
            'Làm tròn đến',
            '$\\frac{2}{3} = 0{,}(6)$',
            '$\\frac{5}{11} = 0{,}(45)$',
          ],
          rows: [
            ['$0{,}5$', 'hàng đơn vị', '$1$', '$0$'],
            ['$0{,}05$', 'hàng phần mười', '$0{,}7$', '$0{,}5$'],
            ['$0{,}005$', 'hàng phần trăm', '$0{,}67$', '$0{,}45$'],
            ['$0{,}0005$', 'hàng phần nghìn', '$0{,}667$', '$0{,}455$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Để làm tròn một số thập phân vô hạn tuần hoàn, hãy viết thêm vài chữ số của chu kì cho thấy rõ chữ số ngay sau hàng làm tròn: $0{,}(45) = 0{,}45454\\ldots$, nên làm tròn đến hàng phần nghìn được $0{,}455$.',
        },
        { type: 'widget', name: 'rounding' },
      ],
    },
  ],
  explore: {
    title: 'Phép chia lộ ra chu kì',
    instruction:
      'Chọn hoặc nhập một phân số, đoán xem nó là số thập phân hữu hạn hay vô hạn tuần hoàn, rồi chia từng bước. Mỗi bước hạ thêm một chữ số $0$ cạnh số dư. Khi số dư bằng $0$, phép chia dừng; khi một số dư cũ quay lại, số dư đó và các chữ số của chu kì được tô màu.',
  },
  examples: [
    {
      problem: 'Viết phân số $\\frac{7}{12}$ dưới dạng số thập phân và chỉ ra chu kì.',
      steps: [
        'Chia $7 : 12$: được $0$, dư $7$. Hạ $0$: $70 : 12 = 5$, dư $10$.',
        '$100 : 12 = 8$, dư $4$; $\\;40 : 12 = 3$, dư $4$.',
        'Số dư $4$ lặp lại nên chữ số $3$ lặp lại mãi: $\\frac{7}{12} = 0{,}58333\\ldots$',
      ],
      answer: '$\\frac{7}{12} = 0{,}58(3)$, chu kì $3$.',
    },
    {
      problem:
        'Trong các phân số $\\frac{3}{8}$; $\\frac{4}{15}$; $\\frac{-7}{20}$; $\\frac{5}{6}$, phân số nào viết được dưới dạng số thập phân hữu hạn? Viết các phân số đó dưới dạng số thập phân.',
      steps: [
        'Các phân số đã tối giản. Phân tích mẫu: $8 = 2^3$; $\\;15 = 3 \\cdot 5$; $\\;20 = 2^2 \\cdot 5$; $\\;6 = 2 \\cdot 3$.',
        'Mẫu $8$ và $20$ chỉ có ước nguyên tố $2$ và $5$: $\\frac{3}{8} = 0{,}375$; $\\;\\frac{-7}{20} = -0{,}35$.',
        'Mẫu $15$ và $6$ có ước nguyên tố $3$: $\\frac{4}{15} = 0{,}2(6)$ và $\\frac{5}{6} = 0{,}8(3)$ là số thập phân vô hạn tuần hoàn.',
      ],
      answer: '$\\frac{3}{8} = 0{,}375$ và $\\frac{-7}{20} = -0{,}35$.',
    },
    {
      problem: 'Làm tròn số $0{,}(36)$ với độ chính xác $0{,}05$ và với độ chính xác $0{,}005$.',
      steps: [
        'Viết thêm chữ số: $0{,}(36) = 0{,}363636\\ldots$',
        'Độ chính xác $0{,}05$: làm tròn đến hàng phần mười. Chữ số hàng phần trăm là $6 \\ge 5$ nên được $0{,}4$.',
        'Độ chính xác $0{,}005$: làm tròn đến hàng phần trăm. Chữ số hàng phần nghìn là $3 < 5$ nên được $0{,}36$.',
      ],
      answer:
        '$0{,}(36) \\approx 0{,}4$ (độ chính xác $0{,}05$) và $0{,}(36) \\approx 0{,}36$ (độ chính xác $0{,}005$).',
    },
    {
      problem: 'Làm tròn số $1\\,234\\,567$ với độ chính xác $50$.',
      steps: [
        'Độ chính xác $50$ là nửa đơn vị của hàng trăm, nên làm tròn đến hàng trăm.',
        'Chữ số hàng chục là $6 \\ge 5$: chữ số hàng trăm $5$ tăng thành $6$; hàng chục và hàng đơn vị thay bằng $0$.',
      ],
      answer: '$1\\,234\\,567 \\approx 1\\,234\\,600$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Phân số nào sau đây viết được dưới dạng số thập phân vô hạn tuần hoàn?',
      options: ['$\\frac{1}{4}$', '$\\frac{3}{5}$', '$\\frac{2}{9}$', '$\\frac{7}{50}$'],
      answer: 2,
      hints: ['Các phân số đều tối giản. Xét các ước nguyên tố của mẫu.'],
      solution:
        '$4 = 2^2$, $5$, $50 = 2 \\cdot 5^2$ chỉ có ước nguyên tố $2$ và $5$; còn $9 = 3^2$ nên $\\frac{2}{9} = 0{,}(2)$ là số thập phân vô hạn tuần hoàn.',
    },
    {
      type: 'text',
      prompt: 'Viết gọn số $0{,}272727\\ldots$ (dùng dấu ngoặc cho chu kì, ví dụ $0{,}(5)$).',
      accept: ['0,(27)', '0.(27)'],
      hints: ['Cụm chữ số nào lặp lại mãi?', 'Đặt cụm đó trong ngoặc ngay sau dấu phẩy.'],
      solution: 'Cụm $27$ lặp lại mãi nên chu kì là $27$: $0{,}272727\\ldots = 0{,}(27)$.',
    },
    {
      type: 'text',
      prompt:
        'Viết phân số $\\frac{1}{12}$ dưới dạng số thập phân vô hạn tuần hoàn (viết gọn, ví dụ $0{,}1(6)$).',
      accept: ['0,08(3)', '0.08(3)'],
      hints: [
        'Chia $1 : 12$ và ghi lại các số dư.',
        'Các chữ số $0$ và $8$ không lặp lại; chỉ chữ số sau đó lặp lại.',
      ],
      solution:
        '$10 : 12 = 0$ dư $10$; $100 : 12 = 8$ dư $4$; $40 : 12 = 3$ dư $4$, số dư $4$ lặp lại. Vậy $\\frac{1}{12} = 0{,}08333\\ldots = 0{,}08(3)$.',
    },
    {
      type: 'number',
      prompt: 'Chu kì của số thập phân biểu diễn phân số $\\frac{2}{7}$ gồm mấy chữ số?',
      answer: 6,
      hints: [
        'Chia $2 : 7$ đến khi một số dư lặp lại. Số dư khác $0$ chỉ có thể là $1, 2, \\ldots, 6$.',
      ],
      solution:
        'Các số dư lần lượt là $2, 6, 4, 5, 1, 3$ rồi lại $2$, nên $\\frac{2}{7} = 0{,}(285714)$: chu kì có $6$ chữ số.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phân số viết được dưới dạng số thập phân hữu hạn.',
      options: [
        '$\\frac{7}{16}$',
        '$\\frac{5}{12}$',
        '$\\frac{9}{30}$',
        '$\\frac{-11}{40}$',
        '$\\frac{2}{15}$',
        '$\\frac{14}{35}$',
      ],
      answers: [0, 2, 3, 5],
      hints: [
        'Rút gọn phân số trước, rồi mới xét ước nguyên tố của mẫu.',
        '$\\frac{9}{30}$ và $\\frac{14}{35}$ chưa tối giản.',
      ],
      solution:
        '$\\frac{7}{16} = 0{,}4375$ ($16 = 2^4$); $\\frac{9}{30} = \\frac{3}{10} = 0{,}3$; $\\frac{-11}{40} = -0{,}275$ ($40 = 2^3 \\cdot 5$); $\\frac{14}{35} = \\frac{2}{5} = 0{,}4$. Còn $\\frac{5}{12} = 0{,}41(6)$ và $\\frac{2}{15} = 0{,}1(3)$ vì mẫu có ước nguyên tố $3$.',
    },
    {
      type: 'choice',
      prompt: 'Làm tròn một số với độ chính xác $0{,}005$ nghĩa là làm tròn đến hàng nào?',
      options: ['Hàng đơn vị', 'Hàng phần mười', 'Hàng phần trăm', 'Hàng phần nghìn'],
      answer: 2,
      hints: ['Độ chính xác bằng nửa đơn vị của hàng làm tròn.'],
      solution:
        'Nửa đơn vị của hàng phần trăm là $0{,}01 : 2 = 0{,}005$, nên độ chính xác $0{,}005$ ứng với làm tròn đến hàng phần trăm.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số $\\frac{5}{11} = 0{,}(45)$ với độ chính xác $0{,}005$.',
      answer: 0.45,
      hints: [
        'Độ chính xác $0{,}005$: làm tròn đến hàng phần trăm.',
        'Viết thêm chữ số: $0{,}4545\\ldots$ rồi nhìn chữ số hàng phần nghìn.',
      ],
      solution:
        '$0{,}(45) = 0{,}4545\\ldots$; chữ số hàng phần nghìn là $4 < 5$ nên được $0{,}45$.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số $2{,}(6)$ với độ chính xác $0{,}05$.',
      answer: 2.7,
      hints: ['Độ chính xác $0{,}05$: làm tròn đến hàng phần mười.'],
      solution: '$2{,}(6) = 2{,}666\\ldots$; chữ số hàng phần trăm là $6 \\ge 5$ nên được $2{,}7$.',
    },
    {
      type: 'number',
      prompt:
        'Chữ số thứ $20$ sau dấu phẩy của số thập phân $\\frac{1}{7} = 0{,}(142857)$ là chữ số nào?',
      answer: 4,
      hints: [
        'Chu kì gồm $6$ chữ số, lặp lại sau mỗi $6$ vị trí.',
        'Chia $20$ cho $6$ và xem số dư.',
      ],
      solution:
        '$20 = 6 \\cdot 3 + 2$: sau ba chu kì đầy đủ, chữ số thứ $20$ là chữ số thứ $2$ của chu kì $142857$, tức là $4$.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số $21\\,435$ với độ chính xác $50$.',
      answer: 21400,
      hints: ['Độ chính xác $50$ là nửa đơn vị của hàng trăm.'],
      solution:
        'Làm tròn đến hàng trăm: chữ số hàng chục là $3 < 5$ nên giữ nguyên chữ số hàng trăm $4$ và thay hàng chục, hàng đơn vị bằng $0$: $21\\,435 \\approx 21\\,400$.',
    },
  ],
  takeaways: [
    'Mỗi số hữu tỉ viết được dưới dạng số thập phân hữu hạn hoặc vô hạn tuần hoàn.',
    'Cụm chữ số lặp lại gọi là chu kì, viết trong ngoặc: $0{,}4545\\ldots = 0{,}(45)$; $\\;0{,}58333\\ldots = 0{,}58(3)$.',
    'Phân số tối giản mẫu dương mà mẫu chỉ có ước nguyên tố $2$ và $5$ thì là số thập phân hữu hạn.',
    'Làm tròn với độ chính xác $0{,}5$; $0{,}05$; $0{,}005$ lần lượt là làm tròn đến hàng đơn vị, phần mười, phần trăm.',
  ],
};
