/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương II: hệ thống hoá quan hệ chia hết, dấu hiệu chia hết, số nguyên tố, ƯCLN và BCNN, kèm bài kiểm tra có bản đồ kĩ năng theo từng bài.',
  intro:
    'Chương II đã cho em một bộ công cụ để "nhìn vào bên trong" các số tự nhiên: ước và bội, dấu hiệu chia hết cho $2$, $3$, $5$, $9$, số nguyên tố, phân tích ra thừa số nguyên tố, rồi ƯCLN và BCNN. Bài này hệ thống lại toàn chương và cho em một bài kiểm tra tổng hợp; bản đồ kĩ năng sẽ chỉ ra bài nào em đã vững và bài nào cần ôn lại.',
  objectives: [
    'Hệ thống hoá kiến thức chương Tính chia hết trong tập hợp các số tự nhiên.',
    'Làm bài tập trắc nghiệm và tự luận tổng hợp: chia hết của tổng, dấu hiệu chia hết, số nguyên tố, ƯCLN, BCNN, rút gọn và cộng, trừ phân số.',
    'Nhận ra bài toán thực tế cần ƯCLN hay BCNN và giải đúng.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức chương II',
      blocks: [
        {
          type: 'table',
          caption: 'Kiến thức chính theo từng bài',
          head: ['Bài', 'Kiến thức cần nhớ'],
          rows: [
            [
              'Quan hệ chia hết',
              '$a \\vdots b$ thì $a$ là bội của $b$, $b$ là ước của $a$. Nếu mọi số hạng của tổng chia hết cho $m$ thì tổng chia hết cho $m$; nếu chỉ có đúng một số hạng không chia hết cho $m$ thì tổng không chia hết cho $m$.',
            ],
            [
              'Dấu hiệu chia hết',
              'Cho $2$: chữ số tận cùng chẵn. Cho $5$: tận cùng là $0$ hoặc $5$. Cho $3$ (cho $9$): tổng các chữ số chia hết cho $3$ (cho $9$).',
            ],
            [
              'Số nguyên tố',
              'Số nguyên tố lớn hơn $1$, chỉ có hai ước là $1$ và chính nó; hợp số lớn hơn $1$, có nhiều hơn hai ước. Số $0$ và số $1$ không là số nguyên tố, cũng không là hợp số.',
            ],
            [
              'Ước chung, ƯCLN',
              '$\\text{ƯCLN}$: lấy các thừa số nguyên tố chung, mỗi thừa số với số mũ nhỏ nhất. $\\text{ƯC}(a, b)$ là tập hợp các ước của $\\text{ƯCLN}(a, b)$.',
            ],
            [
              'Bội chung, BCNN',
              '$\\text{BCNN}$: lấy các thừa số nguyên tố chung và riêng, mỗi thừa số với số mũ lớn nhất. $\\text{BC}(a, b)$ là tập hợp các bội của $\\text{BCNN}(a, b)$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Liên hệ với phân số',
          text: 'Chia cả tử và mẫu cho ƯCLN của chúng thì được phân số tối giản. Quy đồng mẫu các phân số thì lấy mẫu chung là BCNN của các mẫu.',
        },
      ],
    },
    {
      heading: 'Nhận dạng bài toán',
      blocks: [
        {
          type: 'list',
          items: [
            '"Chia đều", "nhiều nhất", "lớn nhất" (số túi, số tổ, cạnh hình vuông lớn nhất): tìm ước chung lớn nhất.',
            '"Cùng lúc", "lần đầu lại trùng nhau", "ít nhất" (lịch lặp lại, xếp hàng vừa đủ): tìm bội chung nhỏ nhất.',
            '"Xếp hàng $a$, hàng $b$ đều thừa $r$": bớt đi $r$ thì được một bội chung của $a$ và $b$.',
            'Tìm chữ số chưa biết: dùng chữ số tận cùng cho $2$ và $5$ trước, rồi dùng tổng các chữ số cho $3$ và $9$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'ƯCLN lấy số mũ nhỏ nhất của các thừa số chung; BCNN lấy số mũ lớn nhất của mọi thừa số. Đừng đổi lẫn hai quy tắc. Hai số nguyên tố cùng nhau có ƯCLN bằng $1$ và BCNN bằng tích của chúng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương có bản đồ kĩ năng',
    instruction:
      'Mười lăm câu, ba câu cho mỗi bài lí thuyết của chương, trộn ngẫu nhiên. Sau mỗi câu, ô của bài tương ứng trên bản đồ kĩ năng đổi màu: xanh là vững, vàng là cần luyện thêm, đỏ là cần ôn lại. Làm sai lần đầu, em được gợi ý và làm lại một lần.',
  },
  examples: [
    {
      problem:
        'Tìm các số $x \\in \\{50; 108; 189; 1\\,234; 2\\,019; 2\\,020\\}$ sao cho $x + 20$ chia hết cho $5$.',
      steps: [
        'Vì $20 \\vdots 5$ nên $x + 20 \\vdots 5$ khi và chỉ khi $x \\vdots 5$ (tính chất chia hết của tổng).',
        'Số chia hết cho $5$ có chữ số tận cùng là $0$ hoặc $5$.',
        'Trong tập hợp đã cho, chỉ $50$ và $2\\,020$ có chữ số tận cùng là $0$; các số $108$, $189$, $1\\,234$, $2\\,019$ có tận cùng khác $0$ và $5$.',
      ],
      answer: '$x \\in \\{50; 2\\,020\\}$.',
    },
    {
      problem:
        'Biết hai số $3^a \\cdot 5^2$ và $3^3 \\cdot 5^b$ có $\\text{ƯCLN}$ là $3^3 \\cdot 5^2$ và $\\text{BCNN}$ là $3^4 \\cdot 5^3$. Tìm $a$ và $b$.',
      steps: [
        'BCNN lấy số mũ lớn nhất: số mũ của $3$ trong BCNN là $4$, mà số thứ hai chỉ có $3^3$, nên $a = 4$.',
        'Số mũ của $5$ trong BCNN là $3$, mà số thứ nhất chỉ có $5^2$, nên $b = 3$.',
        'Kiểm tra ƯCLN (số mũ nhỏ nhất): $3^{\\min(4, 3)} \\cdot 5^{\\min(2, 3)} = 3^3 \\cdot 5^2$, đúng như đề bài.',
      ],
      answer: '$a = 4$, $b = 3$.',
    },
    {
      problem:
        'Bài toán cổ: "Vịt đi hàng 2 thì chưa vừa, hàng 3 thì thừa 1 con, hàng 4 cũng chưa tròn, hàng 5 thì thiếu 1 con, xếp hàng 7 thì vừa đủ." Biết số vịt chưa đến $200$, hỏi có bao nhiêu con vịt?',
      steps: [
        'Xếp hàng $7$ vừa đủ nên số vịt là bội của $7$: $7, 14, 21, \\ldots, 196$.',
        'Hàng $5$ thiếu $1$ con nên số vịt có chữ số tận cùng là $4$ hoặc $9$: còn $14, 49, 84, 119, 154, 189$.',
        'Hàng $2$ chưa vừa nên số vịt là số lẻ: còn $49, 119, 189$.',
        'Hàng $3$ thừa $1$: $49 = 3 \\cdot 16 + 1$ thỏa mãn; $119 = 3 \\cdot 39 + 2$ và $189 = 3 \\cdot 63$ không thỏa mãn.',
        'Kiểm tra hàng $4$: $49 = 4 \\cdot 12 + 1$, chưa tròn, đúng.',
      ],
      answer: 'Có $49$ con vịt.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt:
        'Chọn các số $x \\in \\{50; 108; 189; 1\\,234; 2\\,019; 2\\,020\\}$ sao cho $x - 27$ chia hết cho $3$.',
      options: ['$50$', '$108$', '$189$', '$1\\,234$', '$2\\,019$', '$2\\,020$'],
      answers: [1, 2, 4],
      hints: [
        '$27 \\vdots 3$, nên $x - 27 \\vdots 3$ khi và chỉ khi $x \\vdots 3$.',
        'Tính tổng các chữ số của từng số.',
      ],
      solution:
        'Tổng các chữ số: $50 \\to 5$, $108 \\to 9$, $189 \\to 18$, $1\\,234 \\to 10$, $2\\,019 \\to 12$, $2\\,020 \\to 4$. Các tổng chia hết cho $3$ là $9$, $18$, $12$, nên $x \\in \\{108; 189; 2\\,019\\}$.',
    },
    {
      type: 'multi',
      prompt:
        'Chọn các số $x \\in \\{50; 108; 189; 1\\,234; 2\\,019; 2\\,020\\}$ sao cho $x + 36$ chia hết cho $9$.',
      options: ['$50$', '$108$', '$189$', '$1\\,234$', '$2\\,019$', '$2\\,020$'],
      answers: [1, 2],
      hints: ['$36 \\vdots 9$, nên chỉ cần $x \\vdots 9$.'],
      solution:
        'Tổng các chữ số chia hết cho $9$ chỉ có ở $108$ (tổng $9$) và $189$ (tổng $18$). Vậy $x \\in \\{108; 189\\}$.',
    },
    {
      type: 'choice',
      prompt: 'Không tính tổng, cho biết tổng $12 + 45 + 81$',
      options: [
        'chia hết cho cả $3$ và $9$',
        'chia hết cho $3$ nhưng không chia hết cho $9$',
        'không chia hết cho $3$',
        'chia hết cho $9$ nhưng không chia hết cho $3$',
      ],
      answer: 1,
      hints: [
        'Xét từng số hạng: số nào chia hết cho $3$, số nào chia hết cho $9$?',
        'Nếu chỉ đúng một số hạng không chia hết cho $9$ thì tổng không chia hết cho $9$.',
      ],
      solution:
        'Cả ba số $12$, $45$, $81$ đều chia hết cho $3$ nên tổng chia hết cho $3$. Với $9$: $45 \\vdots 9$, $81 \\vdots 9$ nhưng $12 \\not\\vdots 9$, nên tổng không chia hết cho $9$. (Thật vậy, tổng bằng $138 = 3 \\cdot 46$, còn $138 = 9 \\cdot 15 + 3$.)',
    },
    {
      type: 'number',
      prompt: 'Thay dấu $*$ bởi một chữ số để số $\\overline{5*1}$ chia hết cho $9$.',
      answer: 3,
      hints: ['Tổng các chữ số $5 + * + 1$ phải chia hết cho $9$.'],
      solution:
        '$5 + * + 1 = 6 + *$. Với $*$ là chữ số từ $0$ đến $9$, chỉ $6 + 3 = 9$ chia hết cho $9$. Vậy $* = 3$; số cần tìm là $531 = 9 \\cdot 59$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các số nguyên tố.',
      options: ['$1$', '$2$', '$9$', '$17$', '$51$', '$91$', '$97$'],
      answers: [1, 3, 6],
      hints: ['Số $1$ chỉ có một ước.', 'Thử chia $51$ cho $3$ và $91$ cho $7$.'],
      solution:
        '$2$, $17$, $97$ là số nguyên tố. $1$ không là số nguyên tố; $9 = 3 \\cdot 3$, $51 = 3 \\cdot 17$, $91 = 7 \\cdot 13$ là hợp số.',
    },
    {
      type: 'choice',
      prompt: 'Tính $14^2 + 5^2 + 2^2$ rồi phân tích kết quả ra thừa số nguyên tố. Kết quả là',
      options: [
        '$3^2 \\cdot 5^2$',
        '$3 \\cdot 5^3$',
        '$3^2 \\cdot 25$',
        '$2 \\cdot 3^2 \\cdot 5^2$',
      ],
      answer: 0,
      hints: [
        '$14^2 + 5^2 + 2^2 = 196 + 25 + 4$.',
        'Phân tích $225$: chia liên tiếp cho $3$, rồi cho $5$.',
      ],
      solution:
        '$14^2 + 5^2 + 2^2 = 196 + 25 + 4 = 225 = 3^2 \\cdot 5^2$. Viết $3^2 \\cdot 25$ chưa phải dạng phân tích ra thừa số nguyên tố vì $25$ không là số nguyên tố.',
    },
    {
      type: 'number',
      prompt:
        'Tính $400 : 5 + 40$ rồi phân tích kết quả ra thừa số nguyên tố, được dạng $2^m \\cdot 3 \\cdot 5$. Tìm $m$.',
      answer: 3,
      hints: ['Chia trước, cộng sau: $400 : 5 = 80$.', 'Phân tích $120$ ra thừa số nguyên tố.'],
      solution: '$400 : 5 + 40 = 80 + 40 = 120 = 2^3 \\cdot 3 \\cdot 5$. Vậy $m = 3$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $\\text{ƯCLN}(21, 98)$.',
      answer: 7,
      hints: ['$21 = 3 \\cdot 7$ và $98 = 2 \\cdot 7^2$.'],
      solution:
        'Thừa số nguyên tố chung là $7$, số mũ nhỏ nhất là $1$. Vậy $\\text{ƯCLN}(21, 98) = 7$ (và $\\text{BCNN}(21, 98) = 2 \\cdot 3 \\cdot 7^2 = 294$).',
    },
    {
      type: 'number',
      prompt: 'Tìm $\\text{BCNN}(36, 54)$.',
      answer: 108,
      hints: [
        '$36 = 2^2 \\cdot 3^2$ và $54 = 2 \\cdot 3^3$.',
        'Lấy thừa số chung và riêng với số mũ lớn nhất.',
      ],
      solution:
        '$\\text{BCNN}(36, 54) = 2^2 \\cdot 3^3 = 108$. Kiểm tra: $\\text{ƯCLN}(36, 54) = 2 \\cdot 3^2 = 18$ và $18 \\cdot 108 = 1\\,944 = 36 \\cdot 54$.',
    },
    {
      type: 'number',
      prompt: 'Cho biết $79$ và $97$ là hai số nguyên tố. Tìm $\\text{BCNN}(79, 97)$.',
      answer: 7663,
      hints: ['Hai số nguyên tố khác nhau có ƯCLN bằng $1$.', 'Khi đó BCNN bằng tích của hai số.'],
      solution:
        '$79$ và $97$ là hai số nguyên tố khác nhau nên $\\text{ƯCLN}(79, 97) = 1$ và $\\text{BCNN}(79, 97) = 79 \\cdot 97 = 7\\,663$.',
    },
    {
      type: 'fraction',
      prompt: 'Phân số $\\dfrac{27}{123}$ đã tối giản chưa? Viết phân số tối giản bằng nó.',
      answer: [9, 41],
      simplest: true,
      hints: ['$27 = 3^3$ và $123 = 3 \\cdot 41$.', 'Chia tử và mẫu cho $\\text{ƯCLN}(27, 123)$.'],
      solution:
        '$\\text{ƯCLN}(27, 123) = 3 \\ne 1$ nên phân số chưa tối giản. $\\dfrac{27}{123} = \\dfrac{27 : 3}{123 : 3} = \\dfrac{9}{41}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\dfrac{4}{15} - \\dfrac{2}{9}$ (viết kết quả dưới dạng phân số tối giản).',
      answer: [2, 45],
      simplest: true,
      hints: [
        'Mẫu chung là $\\text{BCNN}(15, 9)$.',
        '$\\text{BCNN}(15, 9) = 45$; thừa số phụ là $3$ và $5$.',
      ],
      solution:
        '$15 = 3 \\cdot 5$, $9 = 3^2$, nên $\\text{BCNN}(15, 9) = 3^2 \\cdot 5 = 45$. $\\dfrac{4}{15} - \\dfrac{2}{9} = \\dfrac{12}{45} - \\dfrac{10}{45} = \\dfrac{2}{45}$.',
    },
    {
      type: 'choice',
      prompt:
        'Biết hai số $2^a \\cdot 3^2$ và $2^4 \\cdot 3^b$ có $\\text{ƯCLN}$ là $2^3 \\cdot 3$ và $\\text{BCNN}$ là $2^4 \\cdot 3^2$. Cặp $(a; b)$ là',
      options: ['$(3; 1)$', '$(4; 2)$', '$(1; 3)$', '$(3; 2)$'],
      answer: 0,
      hints: [
        'ƯCLN lấy số mũ nhỏ nhất: so số mũ của $2$ trong ƯCLN với $2^4$.',
        'Số mũ của $3$ trong ƯCLN là $1$, mà số thứ nhất có $3^2$.',
      ],
      solution:
        'Số mũ của $2$ trong ƯCLN là $3 < 4$, nên $a = 3$. Số mũ của $3$ trong ƯCLN là $1 < 2$, nên $b = 1$. Kiểm tra BCNN: $2^{\\max(3, 4)} \\cdot 3^{\\max(2, 1)} = 2^4 \\cdot 3^2$, đúng.',
    },
    {
      type: 'number',
      prompt:
        'Mai có $12$ quả cam, $18$ quả xoài và $30$ quả bơ. Mai muốn chia đều mỗi loại quả vào các túi sao cho túi nào cũng có cả ba loại quả. Mai chia được nhiều nhất bao nhiêu túi?',
      answer: 6,
      unit: 'túi',
      hints: [
        'Số túi phải là ước chung của $12$, $18$ và $30$.',
        'Nhiều nhất thì lấy ƯCLN của ba số.',
      ],
      solution:
        '$12 = 2^2 \\cdot 3$, $18 = 2 \\cdot 3^2$, $30 = 2 \\cdot 3 \\cdot 5$, nên $\\text{ƯCLN}(12, 18, 30) = 2 \\cdot 3 = 6$. Mai chia được nhiều nhất $6$ túi, mỗi túi $2$ quả cam, $3$ quả xoài và $5$ quả bơ.',
    },
    {
      type: 'number',
      prompt:
        'Bác Nam cứ $3$ tháng thay dầu xe một lần và $6$ tháng xoay lốp xe một lần. Bác làm cả hai việc cùng lúc vào tháng $4$ năm nay. Lần gần nhất tiếp theo bác làm cả hai việc cùng lúc là vào tháng mấy? (Nhập số của tháng.)',
      answer: 10,
      hints: [
        'Số tháng giữa hai lần làm cùng lúc là bội chung nhỏ nhất khác $0$ của $3$ và $6$.',
        '$\\text{BCNN}(3, 6) = 6$; đếm thêm $6$ tháng từ tháng $4$.',
      ],
      solution:
        '$\\text{BCNN}(3, 6) = 6$, nên cứ $6$ tháng bác lại làm hai việc cùng lúc. Từ tháng $4$, sau $6$ tháng là tháng $4 + 6 = 10$ cùng năm.',
    },
  ],
  takeaways: [
    'Tổng chia hết cho $m$ khi mọi số hạng chia hết cho $m$; chỉ một số hạng không chia hết thì tổng không chia hết.',
    'Chia hết cho $2$, $5$: xem chữ số tận cùng. Chia hết cho $3$, $9$: xem tổng các chữ số.',
    'Mọi số tự nhiên lớn hơn $1$ phân tích được ra thừa số nguyên tố; từ đó tìm ƯCLN (chung, mũ nhỏ nhất) và BCNN (chung và riêng, mũ lớn nhất).',
    'Chia đều nhiều nhất: ƯCLN. Lặp lại cùng lúc, ít nhất: BCNN. Rút gọn phân số dùng ƯCLN, quy đồng mẫu dùng BCNN.',
  ],
};
