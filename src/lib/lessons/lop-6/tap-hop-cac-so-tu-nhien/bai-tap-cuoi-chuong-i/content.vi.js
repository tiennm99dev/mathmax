/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương I: hệ thống hoá kiến thức về tập hợp các số tự nhiên, các phép tính, lũy thừa và thứ tự thực hiện phép tính, kèm bài kiểm tra có bản đồ kĩ năng.',
  intro:
    'Chương I đã đưa em đi từ khái niệm tập hợp đến tập hợp các số tự nhiên $\\mathbb{N}$, cách ghi số, thứ tự, bốn phép tính, lũy thừa và thứ tự thực hiện các phép tính. Bài này hệ thống lại toàn bộ chương và cho em một bài kiểm tra tổng hợp: bản đồ kĩ năng sẽ chỉ ra bài nào em đã vững và bài nào cần ôn lại.',
  objectives: [
    'Hệ thống hoá các kiến thức chính của chương Tập hợp các số tự nhiên.',
    'Làm các bài tập trắc nghiệm và tự luận tổng hợp: tập hợp, ghi số, tính toán, lũy thừa, thứ tự phép tính.',
    'Vận dụng các phép tính với số tự nhiên để giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức chương I',
      blocks: [
        {
          type: 'table',
          caption: 'Kiến thức chính theo từng bài',
          head: ['Bài', 'Kiến thức cần nhớ'],
          rows: [
            [
              'Tập hợp',
              'Phần tử, kí hiệu $\\in$, $\\notin$; viết tập hợp bằng cách liệt kê hoặc chỉ ra tính chất đặc trưng.',
            ],
            [
              'Cách ghi số tự nhiên',
              'Hệ thập phân: giá trị chữ số phụ thuộc hàng; $\\overline{abc} = a \\cdot 100 + b \\cdot 10 + c$; số La Mã từ $1$ đến $30$.',
            ],
            [
              'Thứ tự trong $\\mathbb{N}$',
              'So sánh hai số; tia số; mỗi số có một số liền sau, mỗi số khác $0$ có một số liền trước.',
            ],
            [
              'Cộng và trừ',
              'Giao hoán, kết hợp, cộng với $0$; $a - b$ chỉ thực hiện được trong $\\mathbb{N}$ khi $a \\ge b$.',
            ],
            [
              'Nhân và chia',
              'Giao hoán, kết hợp, phân phối; $a = b \\cdot q + r$ với $0 \\le r < b$.',
            ],
            [
              'Lũy thừa',
              '$a^n$ là tích $n$ thừa số $a$; $a^m \\cdot a^n = a^{m+n}$; $a^m : a^n = a^{m-n}$; $a^0 = 1$ ($a \\ne 0$).',
            ],
            [
              'Thứ tự phép tính',
              'Lũy thừa $\\to$ nhân, chia $\\to$ cộng, trừ; ngoặc $(\\ ) \\to [\\ ] \\to \\{\\ \\}$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Tập hợp các số tự nhiên là $\\mathbb{N} = \\{0; 1; 2; 3; \\ldots\\}$; tập hợp các số tự nhiên khác $0$ là $\\mathbb{N}^* = \\{1; 2; 3; \\ldots\\}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương có bản đồ kĩ năng',
    instruction:
      'Mười bốn câu, hai câu cho mỗi bài của chương, trộn ngẫu nhiên. Sau mỗi câu, ô của bài tương ứng trên bản đồ kĩ năng đổi màu: xanh là vững, vàng là cần luyện thêm, đỏ là cần ôn lại. Làm xong, em sẽ biết nên ôn lại bài nào.',
  },
  examples: [
    {
      problem: 'Tính một cách hợp lí: $17 \\cdot 85 + 15 \\cdot 17 - 120$.',
      steps: [
        'Hai tích đầu có chung thừa số $17$: $17 \\cdot 85 + 15 \\cdot 17 = 17 \\cdot (85 + 15) = 17 \\cdot 100 = 1\\,700$.',
        'Trừ: $1\\,700 - 120 = 1\\,580$.',
      ],
      answer: '$1\\,580$.',
    },
    {
      problem: 'Tính giá trị của biểu thức $5 \\cdot \\{[(3^2 + 1) \\cdot 4 - 25] : 3\\}$.',
      steps: [
        'Ngoặc tròn: lũy thừa trước, $3^2 + 1 = 9 + 1 = 10$.',
        'Ngoặc vuông: $10 \\cdot 4 - 25 = 40 - 25 = 15$.',
        'Ngoặc nhọn: $15 : 3 = 5$.',
        'Cuối cùng: $5 \\cdot 5 = 25$.',
      ],
      answer: '$25$.',
    },
    {
      problem:
        'Một rạp hát có $18$ dãy ghế, mỗi dãy $24$ ghế. Trong một buổi diễn, chỉ còn $15$ ghế trống, mọi ghế khác đều đã bán vé; mỗi vé giá $50\\,000$ đồng. Rạp thu được bao nhiêu tiền từ buổi diễn đó?',
      steps: [
        'Số ghế của rạp: $18 \\cdot 24 = 432$ (ghế).',
        'Số vé đã bán: $432 - 15 = 417$ (vé).',
        'Số tiền thu được: $417 \\cdot 50\\,000 = 20\\,850\\,000$ (đồng).',
        'Viết gọn bằng một biểu thức: $(18 \\cdot 24 - 15) \\cdot 50\\,000 = 20\\,850\\,000$.',
      ],
      answer: 'Rạp thu được $20\\,850\\,000$ đồng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tập hợp $\\{x \\in \\mathbb{N}^* \\mid x < 4\\}$ viết bằng cách liệt kê là',
      options: [
        '$\\{0; 1; 2; 3\\}$',
        '$\\{1; 2; 3\\}$',
        '$\\{1; 2; 3; 4\\}$',
        '$\\{0; 1; 2; 3; 4\\}$',
      ],
      answer: 1,
      hints: ['$\\mathbb{N}^*$ không chứa số $0$.'],
      solution:
        'Các số tự nhiên khác $0$ và nhỏ hơn $4$ là $1, 2, 3$. Vậy tập hợp là $\\{1; 2; 3\\}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        '$0 \\in \\mathbb{N}$',
        '$0 \\in \\mathbb{N}^*$',
        '$5 \\in \\mathbb{N}^*$',
        '$100 \\notin \\mathbb{N}$',
      ],
      answers: [0, 2],
      hints: [
        '$\\mathbb{N} = \\{0; 1; 2; \\ldots\\}$ và $\\mathbb{N}^* = \\{1; 2; 3; \\ldots\\}$.',
      ],
      solution:
        '$0 \\in \\mathbb{N}$ nhưng $0 \\notin \\mathbb{N}^*$; $5 \\in \\mathbb{N}^*$; $100$ là số tự nhiên nên $100 \\in \\mathbb{N}$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số tự nhiên lớn nhất có bốn chữ số khác nhau.',
      answer: 9876,
      hints: ['Chọn chữ số lớn nhất có thể cho từng hàng, từ hàng nghìn xuống, không lặp lại.'],
      solution:
        'Hàng nghìn là $9$, hàng trăm là $8$, hàng chục là $7$, hàng đơn vị là $6$: số $9\\,876$.',
    },
    {
      type: 'text',
      prompt: 'Viết số $28$ bằng số La Mã.',
      accept: ['XXVIII'],
      hints: ['$28 = 10 + 10 + 8$.', '$8$ viết là $VIII$.'],
      solution: '$28 = 10 + 10 + 8$, viết là $XXVIII$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số tự nhiên $x$, biết $156 - (x + 61) = 82$.',
      answer: 13,
      hints: ['$x + 61$ là số trừ: lấy số bị trừ trừ đi hiệu.'],
      solution: '$x + 61 = 156 - 82 = 74$, nên $x = 74 - 61 = 13$.',
    },
    {
      type: 'number',
      prompt: 'Tính: $2^3 \\cdot 3^2 - 5 \\cdot (17 - 3^2)$.',
      answer: 32,
      hints: ['Ngoặc trước: $17 - 3^2 = 17 - 9$.', 'Sau đó lũy thừa, nhân, rồi trừ.'],
      solution:
        '$2^3 \\cdot 3^2 - 5 \\cdot (17 - 9) = 2^3 \\cdot 3^2 - 5 \\cdot 8 = 8 \\cdot 9 - 40 = 72 - 40 = 32$.',
    },
    {
      type: 'number',
      prompt: 'Tính một cách hợp lí: $36 \\cdot 28 + 36 \\cdot 82 + 64 \\cdot 69 + 64 \\cdot 41$.',
      answer: 11000,
      hints: [
        'Nhóm hai tích đầu và hai tích sau, đặt thừa số chung ra ngoài.',
        '$28 + 82 = 110$ và $69 + 41 = 110$.',
      ],
      solution:
        '$36 \\cdot (28 + 82) + 64 \\cdot (69 + 41) = 36 \\cdot 110 + 64 \\cdot 110 = (36 + 64) \\cdot 110 = 100 \\cdot 110 = 11\\,000$.',
    },
    {
      type: 'choice',
      prompt: 'Viết kết quả của $3^{10} : 3^5 \\cdot 3^2$ dưới dạng một lũy thừa.',
      options: ['$3^7$', '$3^3$', '$3^{17}$', '$9^7$'],
      answer: 0,
      hints: ['Chia và nhân cùng thứ tự: làm từ trái sang phải.'],
      solution:
        '$3^{10} : 3^5 \\cdot 3^2 = 3^5 \\cdot 3^2 = 3^7$. Đáp án $3^3$ là do nhân $3^5 \\cdot 3^2$ trước, sai thứ tự.',
    },
    {
      type: 'number',
      prompt: 'Tìm số tự nhiên $x$, biết $4^x = 64$.',
      answer: 3,
      hints: ['Tính $4^2$, $4^3$.'],
      solution: '$4^3 = 4 \\cdot 4 \\cdot 4 = 64$, nên $x = 3$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số dư khi chia $2\\,026$ cho $9$.',
      answer: 1,
      hints: ['$9 \\cdot 225 = 2\\,025$.'],
      solution: '$2\\,026 = 9 \\cdot 225 + 1$ với $1 < 9$, nên số dư là $1$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi kiến thức với công thức tương ứng.',
      left: [
        'Nhân hai lũy thừa cùng cơ số',
        'Chia hai lũy thừa cùng cơ số',
        'Phép chia có dư',
        'Tính chất phân phối',
      ],
      right: [
        '$a = b \\cdot q + r,\\ 0 < r < b$',
        '$a \\cdot (b + c) = a \\cdot b + a \\cdot c$',
        '$a^m \\cdot a^n = a^{m+n}$',
        '$a^m : a^n = a^{m-n}$',
      ],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: ['Nhân lũy thừa thì cộng số mũ, chia thì trừ số mũ.'],
      solution:
        'Nhân: $a^m \\cdot a^n = a^{m+n}$; chia: $a^m : a^n = a^{m-n}$; chia có dư: $a = b \\cdot q + r$ với $0 < r < b$; phân phối: $a \\cdot (b + c) = a \\cdot b + a \\cdot c$.',
    },
    {
      type: 'number',
      prompt:
        'Một trường có $1\\,350$ học sinh đi tham quan. Mỗi xe chở được nhiều nhất $42$ học sinh. Cần ít nhất bao nhiêu xe?',
      answer: 33,
      unit: 'xe',
      hints: [
        'Chia $1\\,350$ cho $42$, tìm thương và số dư.',
        'Số học sinh còn dư cũng cần một xe.',
      ],
      solution:
        '$1\\,350 = 42 \\cdot 32 + 6$. Ba mươi hai xe chở $1\\,344$ học sinh, còn $6$ học sinh cần thêm một xe. Vậy cần ít nhất $33$ xe.',
    },
    {
      type: 'number',
      prompt:
        'Một rạp chiếu phim có $15$ dãy ghế, mỗi dãy $20$ ghế. Một suất chiếu còn trống $27$ ghế; mỗi vé giá $60\\,000$ đồng. Rạp thu được bao nhiêu tiền từ suất chiếu đó?',
      answer: 16380000,
      unit: 'đồng',
      hints: ['Số vé bán được là $15 \\cdot 20 - 27$.', 'Nhân số vé với giá một vé.'],
      solution:
        '$(15 \\cdot 20 - 27) \\cdot 60\\,000 = (300 - 27) \\cdot 60\\,000 = 273 \\cdot 60\\,000 = 16\\,380\\,000$ (đồng).',
    },
  ],
  takeaways: [
    '$\\mathbb{N} = \\{0; 1; 2; \\ldots\\}$, $\\mathbb{N}^* = \\{1; 2; 3; \\ldots\\}$; một tập hợp viết được bằng liệt kê hoặc tính chất đặc trưng.',
    'Vận dụng giao hoán, kết hợp, phân phối để tính nhanh; phép chia có dư $a = b \\cdot q + r$, $0 \\le r < b$.',
    '$a^m \\cdot a^n = a^{m+n}$, $a^m : a^n = a^{m-n}$; thứ tự: ngoặc, lũy thừa, nhân chia, cộng trừ.',
    'Bài toán thực tế: viết một biểu thức cho cả quá trình rồi tính theo đúng thứ tự.',
  ],
};
