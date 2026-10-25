/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: dùng máy tính cầm tay để tính giá trị biểu thức có dấu ngoặc và lũy thừa, phân tích một số ra thừa số nguyên tố, tìm ƯCLN, BCNN và kiểm tra số nguyên tố.',
  intro:
    'Máy tính cầm tay giúp em tính nhanh và kiểm tra lại kết quả những phép tính dài. Trong bài này em làm quen với các phím của một máy tính cầm tay phổ biến trong trường học (như Casio fx-580VN X) và dùng nó cho các dạng toán của chương I và chương II: biểu thức, lũy thừa, phân tích ra thừa số nguyên tố, ƯCLN và BCNN.',
  objectives: [
    'Nhận biết các phím số, phím phép tính, phím ngoặc, phím $=$, AC, DEL và hai phím chuyển SHIFT, ALPHA.',
    'Tính giá trị biểu thức có dấu ngoặc và lũy thừa bằng máy tính cầm tay.',
    'Phân tích một số ra thừa số nguyên tố, kiểm tra số nguyên tố, tìm ƯCLN và BCNN bằng máy.',
  ],
  sections: [
    {
      heading: 'Làm quen với máy tính cầm tay',
      blocks: [
        {
          type: 'list',
          items: [
            'Bật máy: phím ON. Tắt máy: SHIFT rồi AC (chức năng OFF).',
            'Phím số $0$ đến $9$, phím phép tính $+$, $-$, $\\times$, $\\div$, phím ngoặc ( ) và phím $=$ để hiện kết quả.',
            'AC xoá cả dòng đang nhập; DEL xoá kí tự vừa nhập.',
            'Phần lớn phím có thêm chức năng in phía trên phím. Bấm SHIFT trước để dùng chức năng in màu vàng, bấm ALPHA trước để dùng chức năng in màu đỏ.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Các phím trong bài theo máy fx-580VN X. Máy khác (fx-570VN Plus, Vinacal...) có các chức năng tương tự nhưng có thể đặt ở phím khác; xem hướng dẫn đi kèm máy.',
        },
      ],
    },
    {
      heading: 'Tính giá trị biểu thức và lũy thừa',
      blocks: [
        {
          type: 'p',
          text: 'Máy tính tự thực hiện các phép tính theo đúng thứ tự: trong ngoặc trước, rồi lũy thừa, rồi nhân chia, cuối cùng cộng trừ. Em chỉ cần nhập biểu thức đúng như viết trên giấy.',
        },
        {
          type: 'table',
          head: ['Muốn nhập', 'Bấm phím', 'Ví dụ'],
          rows: [
            ['Bình phương $a^2$', '$a$ rồi $x^2$', '$5^2$: 5 $x^2$'],
            ['Lập phương $a^3$', '$a$ rồi SHIFT $x^2$', '$3^3$: 3 SHIFT $x^2$'],
            [
              'Lũy thừa $a^n$',
              '$a$ rồi $x^{\\blacksquare}$ rồi $n$',
              '$2^{10}$: 2 $x^{\\blacksquare}$ 1 0',
            ],
            [
              'Ngoặc vuông [ ], ngoặc nhọn { }',
              'đều nhập bằng ( )',
              '$2 \\cdot [3 + 4]$: 2 ( 3 + 4 )',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Máy chỉ có ngoặc tròn. Mỗi dấu ngoặc mở phải có dấu ngoặc đóng tương ứng; thiếu hay thừa ngoặc ở giữa biểu thức, máy báo Syntax ERROR. Chia cho $0$, máy báo Math ERROR.',
        },
      ],
    },
    {
      heading: 'Thừa số nguyên tố, ƯCLN và BCNN',
      blocks: [
        {
          type: 'table',
          head: ['Việc cần làm', 'Bấm phím', 'Màn hình'],
          rows: [
            ['Phân tích $847$ ra thừa số nguyên tố', '8 4 7 $=$ SHIFT FACT', '$7 \\times 11^2$'],
            ['Tìm ƯCLN$(215, 75)$', 'ALPHA $\\times$ (GCD) 2 1 5 SHIFT ) 7 5 ) $=$', '$5$'],
            ['Tìm BCNN$(45, 72)$', 'ALPHA $\\div$ (LCM) 4 5 SHIFT ) 7 2 ) $=$', '$360$'],
          ],
        },
        {
          type: 'p',
          text: 'GCD là ƯCLN, LCM là BCNN. Dấu phẩy ngăn cách hai số được nhập bằng SHIFT ). Chức năng FACT phân tích kết quả vừa tính, nên phải bấm $=$ trước khi bấm SHIFT FACT.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Kiểm tra số nguyên tố',
          text: 'Phân tích số đó bằng FACT. Nếu màn hình chỉ hiện lại chính số đó thì đó là số nguyên tố; nếu hiện một tích thì đó là hợp số. Ví dụ $14\\,791 = 7 \\times 2113$ nên $14\\,791$ là hợp số.',
        },
      ],
    },
    {
      heading: 'Thực hành với máy tính cầm tay',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi em tự bấm máy để làm và kiểm tra lại các bài tập của chương I và chương II.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: máy tính cầm tay (loại được mang vào phòng thi), sách giáo khoa, vở ghi.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tính: a) $2 \\cdot [3 \\cdot 5^2 - 2 \\cdot (5 + 7)] + 3^3$; b) $3 \\cdot \\{120 + [55 - (11 - 3 \\cdot 2^2)]\\} + 2^3$.',
            'Phân tích ra thừa số nguyên tố: a) $847$; b) $246$.',
            'Tìm: a) ƯCLN$(215, 75)$; b) BCNN$(45, 72)$.',
            'Số $14\\,791$ là số nguyên tố hay hợp số?',
            'Chọn ba bài tập em đã làm bằng tay ở chương I, II và dùng máy để kiểm tra lại đáp số.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: với mỗi câu, ghi dãy phím đã bấm, kết quả trên màn hình và đáp số. Nêu một lỗi em từng gặp khi bấm máy (thiếu ngoặc, quên bấm SHIFT...) và cách sửa.',
        },
      ],
    },
  ],
  explore: {
    title: 'Máy tính cầm tay mô phỏng',
    instruction:
      'Ở chế độ "Làm theo hướng dẫn", chọn một phép tính và bấm lần lượt các phím đang sáng viền xanh. Ở chế độ "Bấm tự do", tự nhập biểu thức, thử SHIFT và ALPHA để mở FACT, GCD, LCM.',
  },
  examples: [
    {
      problem: 'Dùng máy tính cầm tay tính $2 \\cdot [3 \\cdot 5^2 - 2 \\cdot (5 + 7)] + 3^3$.',
      steps: [
        'Thay ngoặc vuông bằng ngoặc tròn: $2(3 \\times 5^2 - 2(5 + 7)) + 3^3$.',
        'Bấm: 2 ( 3 $\\times$ 5 $x^2$ $-$ 2 ( 5 $+$ 7 ) ) $+$ 3 SHIFT $x^2$ $=$.',
        'Kiểm tra bằng tay: $3 \\cdot 25 - 2 \\cdot 12 = 75 - 24 = 51$; $2 \\cdot 51 + 27 = 129$.',
      ],
      answer: 'Màn hình hiện $129$.',
    },
    {
      problem: 'Dùng máy tính cầm tay phân tích $246$ ra thừa số nguyên tố.',
      steps: ['Bấm 2 4 6 $=$.', 'Bấm SHIFT FACT, màn hình hiện $2 \\times 3 \\times 41$.'],
      answer: '$246 = 2 \\cdot 3 \\cdot 41$.',
    },
    {
      problem:
        'Dùng máy tính cầm tay tìm BCNN$(45, 72)$ và kiểm tra lại bằng cách phân tích ra thừa số nguyên tố.',
      steps: [
        'Bấm ALPHA $\\div$ (LCM), nhập 4 5, bấm SHIFT ) để có dấu phẩy, nhập 7 2, bấm ) rồi $=$. Màn hình hiện $360$.',
        'Kiểm tra: $45 = 3^2 \\cdot 5$, $72 = 2^3 \\cdot 3^2$, nên BCNN$(45, 72) = 2^3 \\cdot 3^2 \\cdot 5 = 360$.',
      ],
      answer: 'BCNN$(45, 72) = 360$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Dùng máy tính cầm tay tính $3 \\cdot \\{120 + [55 - (11 - 3 \\cdot 2^2)]\\} + 2^3$.',
      answer: 536,
      hints: [
        'Mọi dấu ngoặc đều nhập bằng ( ); nhớ đóng đủ ba ngoặc.',
        'Kiểm tra bằng tay: $11 - 3 \\cdot 4 = -1$, rồi $55 - (-1) = 56$.',
      ],
      solution:
        'Bấm 3 ( 1 2 0 $+$ ( 5 5 $-$ ( 1 1 $-$ 3 $\\times$ 2 $x^2$ ) ) ) $+$ 2 SHIFT $x^2$ $=$. Kết quả: $11 - 12 = -1$; $55 + 1 = 56$; $120 + 56 = 176$; $3 \\cdot 176 + 8 = 536$.',
    },
    {
      type: 'number',
      prompt: 'Dùng máy tính cầm tay tính $(17 + 3)^2 - 4^3 : 2$.',
      answer: 368,
      hints: ['Máy tự làm lũy thừa trước, rồi phép chia, rồi phép trừ.'],
      solution:
        'Bấm ( 1 7 $+$ 3 ) $x^2$ $-$ 4 SHIFT $x^2$ $\\div$ 2 $=$. Ta có $20^2 - 64 : 2 = 400 - 32 = 368$.',
    },
    {
      type: 'number',
      prompt: 'Dùng phím $x^{\\blacksquare}$ để tính $3^7$.',
      answer: 2187,
      hints: ['Bấm 3, rồi $x^{\\blacksquare}$, rồi số mũ 7, rồi $=$.'],
      solution: 'Bấm 3 $x^{\\blacksquare}$ 7 $=$, màn hình hiện $2187$. Thật vậy $3^7 = 2187$.',
    },
    {
      type: 'choice',
      prompt: 'Nhập $246$, bấm $=$ rồi bấm SHIFT FACT. Màn hình hiện gì?',
      options: [
        '$2 \\times 123$',
        '$2 \\times 3 \\times 41$',
        '$6 \\times 41$',
        '$2^2 \\times 3 \\times 41$',
      ],
      answer: 1,
      hints: [
        'FACT viết số thành tích các thừa số nguyên tố; $123$ và $6$ có phải số nguyên tố không?',
      ],
      solution:
        '$246 = 2 \\cdot 123 = 2 \\cdot 3 \\cdot 41$, và $2$, $3$, $41$ đều là số nguyên tố. Màn hình hiện $2 \\times 3 \\times 41$.',
    },
    {
      type: 'number',
      prompt: 'Dùng máy tính cầm tay tìm ƯCLN$(84, 120)$.',
      answer: 12,
      hints: ['ƯCLN là GCD: bấm ALPHA $\\times$, nhập hai số cách nhau bằng SHIFT ).'],
      solution:
        'Bấm ALPHA $\\times$ 8 4 SHIFT ) 1 2 0 ) $=$, màn hình hiện $12$. Kiểm tra: $84 = 2^2 \\cdot 3 \\cdot 7$, $120 = 2^3 \\cdot 3 \\cdot 5$, ƯCLN $= 2^2 \\cdot 3 = 12$.',
    },
    {
      type: 'number',
      prompt: 'Dùng máy tính cầm tay tìm BCNN$(36, 54)$.',
      answer: 108,
      hints: ['BCNN là LCM: bấm ALPHA $\\div$.'],
      solution:
        'Bấm ALPHA $\\div$ 3 6 SHIFT ) 5 4 ) $=$, màn hình hiện $108$. Kiểm tra: $36 = 2^2 \\cdot 3^2$, $54 = 2 \\cdot 3^3$, BCNN $= 2^2 \\cdot 3^3 = 108$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các lần bấm phím để tìm BCNN$(45, 72)$.',
      items: ['$=$', 'ALPHA', '4 5', 'SHIFT ) (dấu phẩy)', '$\\div$ (LCM)', '7 2', ')'],
      answer: [1, 4, 2, 3, 5, 6, 0],
      hints: [
        'Mở hàm LCM trước: ALPHA rồi phím $\\div$.',
        'Sau số thứ nhất là dấu phẩy, sau số thứ hai là ngoặc đóng.',
      ],
      solution: 'ALPHA → $\\div$ (LCM) → 4 5 → SHIFT ) → 7 2 → ) → $=$. Màn hình hiện $360$.',
    },
    {
      type: 'choice',
      prompt:
        'Nhập $14\\,791$, bấm $=$ rồi SHIFT FACT, màn hình hiện $7 \\times 2113$. Kết luận nào đúng?',
      options: [
        '$14\\,791$ là số nguyên tố.',
        '$14\\,791$ là hợp số vì nó chia hết cho $7$.',
        'Chưa kết luận được vì $2113$ là hợp số.',
        '$14\\,791$ không phải số nguyên tố cũng không phải hợp số.',
      ],
      answer: 1,
      hints: ['Hợp số là số tự nhiên lớn hơn $1$ có nhiều hơn hai ước.'],
      solution:
        '$14\\,791 = 7 \\cdot 2113$ nên ngoài $1$ và chính nó, $14\\,791$ còn có ước $7$ (và $2113$). Vậy $14\\,791$ là hợp số.',
    },
    {
      type: 'choice',
      prompt:
        'Sau khi phân tích một số bằng FACT, màn hình hiện $2^3 \\times 3^2 \\times 5$. Số đó là số nào?',
      options: ['$180$', '$360$', '$720$', '$30$'],
      answer: 1,
      hints: ['Tính $2^3$, $3^2$ rồi nhân với $5$.'],
      solution: '$2^3 \\cdot 3^2 \\cdot 5 = 8 \\cdot 9 \\cdot 5 = 360$.',
    },
  ],
  takeaways: [
    'Máy tính cầm tay tự làm đúng thứ tự phép tính; ngoặc vuông, ngoặc nhọn đều nhập bằng ngoặc tròn.',
    'Bình phương: $x^2$; lập phương: SHIFT $x^2$; lũy thừa bất kì: $x^{\\blacksquare}$.',
    'Nhập số, bấm $=$, rồi SHIFT FACT để phân tích ra thừa số nguyên tố và kiểm tra số nguyên tố.',
    'ƯCLN: ALPHA $\\times$ (GCD); BCNN: ALPHA $\\div$ (LCM); dấu phẩy là SHIFT ).',
  ],
};
