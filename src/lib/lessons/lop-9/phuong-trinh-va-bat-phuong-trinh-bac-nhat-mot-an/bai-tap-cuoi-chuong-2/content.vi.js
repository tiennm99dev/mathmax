/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chương 2: phương trình tích, phương trình chứa ẩn ở mẫu, bất đẳng thức và tính chất, bất phương trình bậc nhất một ẩn và các bài toán thực tế.',
  intro:
    'Chương 2 nối hai mạch kiến thức: đưa phương trình về phương trình bậc nhất một ẩn (qua phương trình tích và khử mẫu), và làm việc với thứ tự giữa các số (bất đẳng thức, bất phương trình). Bài ôn tập này gom tất cả lại, kèm một bộ đề tự sinh có bản đồ kĩ năng để em biết phần nào cần ôn thêm.',
  objectives: [
    'Hệ thống lại cách giải phương trình tích và phương trình chứa ẩn ở mẫu.',
    'Vận dụng tính chất của bất đẳng thức; giải bất phương trình bậc nhất một ẩn và biểu diễn tập nghiệm.',
    'Lập phương trình, bất phương trình để giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức chương',
      blocks: [
        {
          type: 'table',
          head: ['Bài', 'Kiến thức chính', 'Điều cần nhớ'],
          rows: [
            [
              'Bài 4',
              'Phương trình tích $(a_1x + b_1)(a_2x + b_2) = 0$',
              'Giải từng phương trình bậc nhất rồi lấy tất cả các nghiệm',
            ],
            [
              'Bài 4',
              'Phương trình chứa ẩn ở mẫu',
              'Tìm ĐKXĐ, quy đồng và khử mẫu, giải, đối chiếu với ĐKXĐ',
            ],
            ['Bài 5', 'Bất đẳng thức, tính chất bắc cầu', '$a < b$ và $b < c$ thì $a < c$'],
            [
              'Bài 5',
              'Liên hệ với phép cộng, phép nhân',
              'Cộng: giữ chiều. Nhân số dương: giữ chiều. Nhân số âm: đổi chiều',
            ],
            [
              'Bài 6',
              'Bất phương trình $ax + b < 0$ ($a \\ne 0$)',
              'Chuyển vế đổi dấu; chia cho $a$, đổi chiều khi $a < 0$',
            ],
            [
              'Bài 6',
              'Biểu diễn tập nghiệm',
              'Gạch bỏ phần không là nghiệm; ngoặc vuông khi lấy đầu mút, ngoặc tròn khi không lấy',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Khi giải bài toán thực tế bằng cách lập phương trình hay bất phương trình: chọn ẩn và đặt điều kiện cho ẩn, biểu diễn các đại lượng theo ẩn, lập và giải, rồi đối chiếu với điều kiện trước khi trả lời.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bộ đề bên dưới tự sinh $15$ câu, đủ năm nhóm kĩ năng của chương. Bản đồ kĩ năng tô xanh phần em làm tốt, tô đỏ phần cần ôn lại; khi đó hãy mở lại bài tương ứng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Cuối bộ đề, bản đồ kĩ năng chỉ ra bài cần ôn lại.',
  },
  examples: [
    {
      problem: 'Giải phương trình $\\dfrac{1}{x - 2} + 3 = \\dfrac{x - 3}{2 - x}$.',
      steps: [
        'ĐKXĐ: $x \\ne 2$.',
        'Vì $2 - x = -(x - 2)$ nên $\\dfrac{x - 3}{2 - x} = \\dfrac{-(x - 3)}{x - 2}$. Mẫu thức chung là $x - 2$.',
        'Khử mẫu: $1 + 3(x - 2) = -(x - 3)$, tức $3x - 5 = -x + 3$.',
        'Giải: $4x = 8$, nên $x = 2$.',
        '$x = 2$ vi phạm ĐKXĐ nên bị loại.',
      ],
      answer: 'Phương trình vô nghiệm.',
    },
    {
      problem: 'Giải bất phương trình $\\dfrac{x - 1}{2} - 1 < \\dfrac{x + 1}{3}$.',
      steps: [
        'Nhân hai vế với $6 > 0$, giữ chiều: $3(x - 1) - 6 < 2(x + 1)$.',
        'Bỏ ngoặc: $3x - 9 < 2x + 2$.',
        'Chuyển vế: $3x - 2x < 2 + 9$, tức $x < 11$.',
      ],
      answer: 'Nghiệm của bất phương trình là $x < 11$.',
    },
    {
      problem:
        'Một mảnh vườn hình chữ nhật có chiều dài $10$ m. Muốn rào xung quanh bằng không quá $32$ m lưới thì chiều rộng của vườn được lớn nhất là bao nhiêu mét?',
      steps: [
        'Gọi chiều rộng là $x$ (m), $0 < x \\le 10$.',
        'Chu vi không quá $32$ m: $2(10 + x) \\le 32$.',
        'Chia hai vế cho $2$: $10 + x \\le 16$, nên $x \\le 6$ (thoả mãn điều kiện).',
      ],
      answer: 'Chiều rộng lớn nhất là $6$ m.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn tất cả các nghiệm của phương trình $(x + 2)(3x - 9) = 0$.',
      options: ['$-2$', '$2$', '$3$', '$9$'],
      answers: [0, 2],
      hints: ['Cho từng nhân tử bằng $0$.'],
      solution: '$x + 2 = 0$ cho $x = -2$; $3x - 9 = 0$ cho $x = 3$.',
    },
    {
      type: 'fraction',
      prompt: 'Phương trình $x(2x - 1) = 4x - 2$ có hai nghiệm. Tổng hai nghiệm bằng bao nhiêu?',
      answer: [5, 2],
      hints: [
        '$4x - 2 = 2(2x - 1)$. Chuyển vế rồi đặt nhân tử chung $2x - 1$.',
        'Được $(2x - 1)(x - 2) = 0$.',
      ],
      solution:
        '$x(2x - 1) - 2(2x - 1) = 0$, tức $(2x - 1)(x - 2) = 0$, nên $x = \\dfrac{1}{2}$ hoặc $x = 2$. Tổng hai nghiệm là $\\dfrac{1}{2} + 2 = \\dfrac{5}{2}$.',
    },
    {
      type: 'choice',
      prompt: 'Điều kiện xác định của phương trình $\\dfrac{x + 1}{2x - 4} = \\dfrac{3}{x}$ là',
      options: [
        '$x \\ne 2$ và $x \\ne 0$',
        '$x \\ne -1$',
        '$x \\ne 4$ và $x \\ne 0$',
        '$x \\ne 2$',
      ],
      answer: 0,
      hints: ['Cho từng mẫu khác $0$: $2x - 4 \\ne 0$ và $x \\ne 0$.'],
      solution: '$2x - 4 \\ne 0$ khi $x \\ne 2$; mẫu $x \\ne 0$. ĐKXĐ: $x \\ne 2$ và $x \\ne 0$.',
    },
    {
      type: 'number',
      prompt:
        'Giải phương trình $\\dfrac{x}{x - 1} + \\dfrac{2}{x} = \\dfrac{1}{x(x - 1)}$. Nghiệm $x$ bằng bao nhiêu?',
      answer: -3,
      hints: [
        'ĐKXĐ: $x \\ne 0$ và $x \\ne 1$. Mẫu thức chung là $x(x - 1)$.',
        'Khử mẫu được $x^2 + 2(x - 1) = 1$, tức $x^2 + 2x - 3 = 0$. Đối chiếu nghiệm với ĐKXĐ.',
      ],
      solution:
        'ĐKXĐ: $x \\ne 0$, $x \\ne 1$. Khử mẫu: $x^2 + 2(x - 1) = 1$, tức $x^2 + 2x - 3 = 0$, hay $(x - 1)(x + 3) = 0$. Được $x = 1$ (loại vì vi phạm ĐKXĐ) hoặc $x = -3$ (thoả mãn). Phương trình có nghiệm $x = -3$.',
    },
    {
      type: 'number',
      prompt:
        'Một phân số có tử số nhỏ hơn mẫu số $3$ đơn vị. Nếu cộng thêm $2$ vào cả tử và mẫu thì được phân số bằng $\\dfrac{1}{2}$. Tìm tử số của phân số ban đầu.',
      answer: 1,
      hints: [
        'Gọi tử số là $x$, mẫu số là $x + 3$ ($x + 3 \\ne 0$). Lập phương trình $\\dfrac{x + 2}{x + 5} = \\dfrac{1}{2}$.',
      ],
      solution:
        'Gọi tử số là $x$ ($x$ nguyên, $x \\ne -3$, $x \\ne -5$), mẫu số là $x + 3$. Ta có $\\dfrac{x + 2}{x + 5} = \\dfrac{1}{2}$, khử mẫu: $2(x + 2) = x + 5$, nên $x = 1$ (thoả mãn). Phân số ban đầu là $\\dfrac{1}{4}$; tử số là $1$.',
    },
    {
      type: 'choice',
      prompt: 'Cho $a \\le b$. Khẳng định nào sau đây đúng?',
      options: ['$-5a \\ge -5b$', '$a - 2 \\ge b - 2$', '$3a > 3b$', '$-a \\le -b$'],
      answer: 0,
      hints: ['Nhân với số âm thì đổi chiều; cộng (trừ) một số thì giữ chiều.'],
      solution:
        'Nhân hai vế của $a \\le b$ với $-5 < 0$, đổi chiều: $-5a \\ge -5b$. Các khẳng định khác sai: $a - 2 \\le b - 2$, $3a \\le 3b$, $-a \\ge -b$.',
    },
    {
      type: 'choice',
      prompt: 'So sánh hai số $\\dfrac{2023}{2024}$ và $\\dfrac{2024}{2023}$.',
      options: [
        '$\\dfrac{2023}{2024} < \\dfrac{2024}{2023}$',
        '$\\dfrac{2023}{2024} > \\dfrac{2024}{2023}$',
        '$\\dfrac{2023}{2024} = \\dfrac{2024}{2023}$',
      ],
      answer: 0,
      hints: ['So sánh mỗi số với $1$ rồi dùng tính chất bắc cầu.'],
      solution:
        '$\\dfrac{2023}{2024} < 1$ và $1 < \\dfrac{2024}{2023}$. Theo tính chất bắc cầu, $\\dfrac{2023}{2024} < \\dfrac{2024}{2023}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các bất phương trình bậc nhất một ẩn.',
      options: ['$3x + 1 \\le 0$', '$\\dfrac{x}{2} - 1 > 0$', '$0x - 3 < 0$', '$x^2 + x \\ge 0$'],
      answers: [0, 1],
      hints: ['Cần dạng $ax + b < 0$ (hoặc $>$, $\\le$, $\\ge$) với $a \\ne 0$.'],
      solution:
        '$3x + 1 \\le 0$ có $a = 3$; $\\dfrac{x}{2} - 1 > 0$ có $a = \\dfrac{1}{2}$: đều là bất phương trình bậc nhất một ẩn. $0x - 3 < 0$ có $a = 0$; $x^2 + x \\ge 0$ có $x^2$.',
    },
    {
      type: 'choice',
      prompt: 'Nghiệm của bất phương trình $5 - 2x > 1$ là',
      options: ['$x < 2$', '$x > 2$', '$x < -2$', '$x > -2$'],
      answer: 0,
      hints: ['Chuyển $5$ sang vế phải, rồi chia hai vế cho $-2$ (đổi chiều).'],
      solution: '$-2x > 1 - 5$, tức $-2x > -4$. Chia cho $-2 < 0$, đổi chiều: $x < 2$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số nguyên lớn nhất thoả mãn bất phương trình $3(x - 2) - 4 < x + 5$.',
      answer: 7,
      hints: ['Bỏ ngoặc và thu gọn: $3x - 10 < x + 5$.'],
      solution:
        '$3x - 6 - 4 < x + 5$, tức $2x < 15$, nên $x < \\dfrac{15}{2} = 7{,}5$. Số nguyên lớn nhất là $7$.',
    },
    {
      type: 'number',
      prompt:
        'Nghiệm của bất phương trình $\\dfrac{2x + 1}{3} \\ge \\dfrac{x - 1}{2}$ có dạng $x \\ge k$. Tìm $k$.',
      answer: -5,
      hints: ['Nhân hai vế với $6 > 0$: $2(2x + 1) \\ge 3(x - 1)$.'],
      solution: 'Nhân hai vế với $6$: $4x + 2 \\ge 3x - 3$, nên $x \\ge -5$. Vậy $k = -5$.',
    },
    {
      type: 'number',
      prompt:
        'Bạn Lan được $7$ điểm và $8$ điểm ở hai bài kiểm tra hệ số $1$. Bài thi cuối kì tính hệ số $2$. Lan cần ít nhất bao nhiêu điểm ở bài thi cuối kì để điểm trung bình cả ba bài (tính theo hệ số) không dưới $8$?',
      answer: 8.5,
      unit: 'điểm',
      hints: [
        'Gọi $x$ là điểm bài thi cuối kì: điểm trung bình là $\\dfrac{7 + 8 + 2x}{4}$.',
        'Giải $\\dfrac{7 + 8 + 2x}{4} \\ge 8$.',
      ],
      solution:
        'Gọi $x$ là điểm bài thi cuối kì ($0 \\le x \\le 10$). Ta có $\\dfrac{15 + 2x}{4} \\ge 8$, nhân hai vế với $4$: $15 + 2x \\ge 32$, nên $x \\ge 8{,}5$. Lan cần ít nhất $8{,}5$ điểm.',
    },
    {
      type: 'number',
      prompt:
        'Hãng xe A tính $500$ nghìn đồng mỗi chuyến cộng $4$ nghìn đồng mỗi ki-lô-mét; hãng xe B chỉ tính $6$ nghìn đồng mỗi ki-lô-mét. Chuyến đi phải dài ít nhất bao nhiêu ki-lô-mét (số nguyên) thì đi hãng A rẻ hơn hãng B?',
      answer: 251,
      unit: 'km',
      hints: ['Gọi $x$ là số ki-lô-mét. Hãng A rẻ hơn khi $500 + 4x < 6x$.'],
      solution:
        'Gọi $x$ (km) là độ dài chuyến đi, $x > 0$. Hãng A rẻ hơn khi $500 + 4x < 6x$, tức $500 < 2x$, nên $x > 250$. Số nguyên nhỏ nhất là $251$: chuyến đi phải dài ít nhất $251$ km.',
    },
  ],
  takeaways: [
    'Phương trình tích: cho từng nhân tử bằng $0$; phương trình chứa ẩn ở mẫu: ĐKXĐ trước, đối chiếu sau.',
    'Bất đẳng thức: cộng giữ chiều; nhân với số dương giữ chiều, với số âm đổi chiều.',
    'Bất phương trình bậc nhất một ẩn: chuyển vế đổi dấu, chia cho hệ số của $x$ (đổi chiều nếu hệ số âm).',
    'Bài toán thực tế: chọn ẩn, đặt điều kiện, lập và giải, đối chiếu điều kiện rồi trả lời.',
  ],
};
