/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép nhân và phép chia số tự nhiên: tính chất giao hoán, kết hợp, nhân với 1, tính chất phân phối, phép chia hết và phép chia có dư a = b.q + r.',
  intro:
    'Lớp em có $38$ bạn đi dã ngoại, mỗi xe điện chở được $8$ bạn. Cần mấy xe, và xe cuối chở mấy bạn? Phép chia có dư trả lời ngay: $38 = 8 \\cdot 4 + 6$, nên $4$ xe chở đủ $32$ bạn, cần thêm một xe nữa cho $6$ bạn còn lại, tất cả $5$ xe. Bài này ôn lại phép nhân, phép chia và các tính chất giúp em tính nhanh.',
  objectives: [
    'Thực hiện phép nhân, gọi đúng tên thừa số, tích; dùng đúng các cách viết dấu nhân.',
    'Vận dụng tính chất giao hoán, kết hợp, phân phối để tính nhẩm, tính hợp lí.',
    'Phân biệt phép chia hết và phép chia có dư; tìm thương và số dư theo $a = b \\cdot q + r$, $0 \\le r < b$.',
  ],
  sections: [
    {
      heading: 'Phép nhân số tự nhiên',
      blocks: [
        {
          type: 'p',
          text: 'Phép nhân hai số tự nhiên $a$ và $b$ cho ta một số tự nhiên $c$: $a \\times b = c$, cũng viết là $a \\cdot b = c$. Các số $a$, $b$ gọi là thừa số, $c$ gọi là tích.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Nếu các thừa số đều bằng chữ, hoặc chỉ có một thừa số bằng số, ta có thể không viết dấu nhân: $a \\cdot b = ab$, $\\ 4 \\cdot x = 4x$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất của phép nhân',
          text: 'Giao hoán: $a \\cdot b = b \\cdot a$. Kết hợp: $(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$. Nhân với số $1$: $a \\cdot 1 = 1 \\cdot a = a$. Nhân với số $0$: $a \\cdot 0 = 0$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất phân phối của phép nhân đối với phép cộng và phép trừ',
          text: '$a \\cdot (b + c) = a \\cdot b + a \\cdot c$ và $a \\cdot (b - c) = a \\cdot b - a \\cdot c$ (với $b \\ge c$).',
        },
        {
          type: 'p',
          text: 'Ví dụ: $25 \\cdot 13 \\cdot 4 = (25 \\cdot 4) \\cdot 13 = 100 \\cdot 13 = 1\\,300$; $\\ 23 \\cdot 99 = 23 \\cdot (100 - 1) = 2\\,300 - 23 = 2\\,277$.',
        },
      ],
    },
    {
      heading: 'Phép chia hết',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phép chia hết',
          text: 'Cho hai số tự nhiên $a$ và $b$ với $b \\ne 0$. Nếu có số tự nhiên $q$ sao cho $a = b \\cdot q$ thì ta nói $a$ chia hết cho $b$ và có phép chia hết $a : b = q$. Ta gọi $a$ là số bị chia, $b$ là số chia, $q$ là thương.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $56 = 8 \\cdot 7$ nên $56 : 8 = 7$. Từ $a : b = q$ suy ra $a = b \\cdot q$, và khi $q \\ne 0$ thì $b = a : q$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Không có phép chia cho số $0$: số chia luôn phải khác $0$.',
        },
      ],
    },
    {
      heading: 'Phép chia có dư',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Phép chia có dư',
          text: 'Với hai số tự nhiên $a$ và $b$ ($b \\ne 0$), luôn tìm được đúng hai số tự nhiên $q$ và $r$ sao cho $a = b \\cdot q + r$, trong đó $0 \\le r < b$.',
        },
        {
          type: 'list',
          items: [
            'Nếu $r = 0$ thì $a = b \\cdot q$: ta có phép chia hết.',
            'Nếu $r \\ne 0$ thì ta có phép chia có dư; $q$ là thương, $r$ là số dư.',
          ],
        },
        {
          type: 'table',
          caption: 'Một vài phép chia có dư',
          head: ['$a$', '$b$', '$a = b \\cdot q + r$', 'Thương $q$', 'Số dư $r$'],
          rows: [
            ['$38$', '$8$', '$38 = 8 \\cdot 4 + 6$', '$4$', '$6$'],
            ['$50$', '$7$', '$50 = 7 \\cdot 7 + 1$', '$7$', '$1$'],
            ['$3$', '$5$', '$3 = 5 \\cdot 0 + 3$', '$0$', '$3$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Số dư luôn nhỏ hơn số chia. Nếu "số dư" tìm được còn lớn hơn hoặc bằng số chia thì thương còn tăng thêm được.',
        },
      ],
    },
  ],
  explore: {
    title: 'Lưới ô vuông chia nhóm',
    instruction:
      'Kéo thanh trượt để chọn số bị chia $a$ và số chia $b$. Các ô được xếp thành từng hàng $b$ ô: số hàng đầy là thương $q$, số ô thừa ở hàng cuối là số dư $r$. Tìm những giá trị của $a$ làm cho phép chia trở thành phép chia hết.',
  },
  examples: [
    {
      problem: 'Tính một cách hợp lí: $4 \\cdot 37 \\cdot 25$.',
      steps: [
        'Dùng tính chất giao hoán và kết hợp để nhóm $4$ với $25$.',
        '$4 \\cdot 37 \\cdot 25 = (4 \\cdot 25) \\cdot 37 = 100 \\cdot 37$.',
        '$100 \\cdot 37 = 3\\,700$.',
      ],
      answer: '$3\\,700$.',
    },
    {
      problem: 'Tính một cách hợp lí: $36 \\cdot 27 + 36 \\cdot 73$.',
      steps: [
        'Hai tích có chung thừa số $36$; dùng tính chất phân phối theo chiều ngược.',
        '$36 \\cdot 27 + 36 \\cdot 73 = 36 \\cdot (27 + 73) = 36 \\cdot 100$.',
        '$36 \\cdot 100 = 3\\,600$.',
      ],
      answer: '$3\\,600$.',
    },
    {
      problem: 'Chia $2\\,345$ cho $12$. Tìm thương và số dư.',
      steps: [
        'Đặt tính: $23 : 12$ được $1$, dư $11$; hạ $4$ được $114$.',
        '$114 : 12$ được $9$, dư $6$; hạ $5$ được $65$.',
        '$65 : 12$ được $5$, dư $5$.',
        'Kiểm tra: $12 \\cdot 195 + 5 = 2\\,340 + 5 = 2\\,345$ và $5 < 12$.',
      ],
      answer: 'Thương là $195$, số dư là $5$: $2\\,345 = 12 \\cdot 195 + 5$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính một cách hợp lí: $25 \\cdot 37 \\cdot 4$.',
      answer: 3700,
      hints: ['Nhóm hai thừa số có tích tròn trăm.'],
      solution: '$25 \\cdot 37 \\cdot 4 = (25 \\cdot 4) \\cdot 37 = 100 \\cdot 37 = 3\\,700$.',
    },
    {
      type: 'number',
      prompt: 'Tính một cách hợp lí: $87 \\cdot 36 + 87 \\cdot 64$.',
      answer: 8700,
      hints: [
        'Hai tích có chung thừa số $87$.',
        'Dùng $a \\cdot b + a \\cdot c = a \\cdot (b + c)$.',
      ],
      solution: '$87 \\cdot 36 + 87 \\cdot 64 = 87 \\cdot (36 + 64) = 87 \\cdot 100 = 8\\,700$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhẩm: $23 \\cdot 99$.',
      answer: 2277,
      hints: ['Viết $99 = 100 - 1$.', 'Dùng tính chất phân phối đối với phép trừ.'],
      solution: '$23 \\cdot 99 = 23 \\cdot (100 - 1) = 2\\,300 - 23 = 2\\,277$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số dư khi chia $158$ cho $12$.',
      answer: 2,
      hints: ['Tìm bội lớn nhất của $12$ không vượt quá $158$.', '$12 \\cdot 13 = 156$.'],
      solution: '$158 = 12 \\cdot 13 + 2$ và $2 < 12$, nên số dư là $2$.',
    },
    {
      type: 'number',
      prompt: 'Tìm thương của phép chia $1\\,000$ cho $37$.',
      answer: 27,
      hints: ['$37 \\cdot 27 = 999$.'],
      solution: '$1\\,000 = 37 \\cdot 27 + 1$ với $1 < 37$, nên thương là $27$ (số dư $1$).',
    },
    {
      type: 'choice',
      prompt: 'Trong một phép chia có dư cho $7$, số dư có thể là số nào?',
      options: ['$0$', '$7$', '$6$', '$8$'],
      answer: 2,
      hints: ['Số dư $r$ thoả mãn $0 < r < 7$ trong phép chia có dư.'],
      solution:
        'Số dư phải nhỏ hơn số chia $7$ và khác $0$ (nếu bằng $0$ thì là phép chia hết). Chỉ có $6$ thoả mãn.',
    },
    {
      type: 'number',
      prompt:
        'Trong một phép chia, số chia là $15$, thương là $8$ và số dư là $11$. Tìm số bị chia.',
      answer: 131,
      hints: ['Dùng $a = b \\cdot q + r$.'],
      solution: '$a = 15 \\cdot 8 + 11 = 120 + 11 = 131$.',
    },
    {
      type: 'number',
      prompt:
        'Có $220$ học sinh đi tham quan, mỗi xe chở được nhiều nhất $45$ học sinh. Cần ít nhất bao nhiêu xe?',
      answer: 5,
      unit: 'xe',
      hints: ['Chia $220$ cho $45$, tìm thương và số dư.', 'Những bạn còn dư cũng cần một xe.'],
      solution:
        '$220 = 45 \\cdot 4 + 40$. Bốn xe chở $180$ bạn, còn $40$ bạn cần thêm một xe. Vậy cần ít nhất $5$ xe.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đẳng thức với tính chất mà nó thể hiện.',
      left: [
        '$a \\cdot b = b \\cdot a$',
        '$(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$',
        '$a \\cdot (b + c) = a \\cdot b + a \\cdot c$',
        '$a \\cdot 1 = a$',
      ],
      right: [
        'Tính chất kết hợp',
        'Tính chất phân phối của phép nhân đối với phép cộng',
        'Tính chất giao hoán',
        'Nhân với số $1$',
      ],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 1],
        [3, 3],
      ],
      hints: ['Phân phối: một thừa số "chia đều" cho từng số hạng trong ngoặc.'],
      solution:
        'Giao hoán: đổi chỗ thừa số; kết hợp: đổi cách nhóm; phân phối: $a \\cdot (b + c) = a \\cdot b + a \\cdot c$; nhân với $1$: $a \\cdot 1 = a$.',
    },
  ],
  takeaways: [
    'Phép nhân có tính chất giao hoán, kết hợp, $a \\cdot 1 = a$ và phân phối đối với phép cộng, phép trừ.',
    'Phép chia hết $a : b = q$ ($b \\ne 0$) khi $a = b \\cdot q$; không có phép chia cho $0$.',
    'Với $b \\ne 0$, luôn có duy nhất $q$, $r$ để $a = b \\cdot q + r$ và $0 \\le r < b$; $r = 0$ là chia hết.',
    'Số dư luôn nhỏ hơn số chia.',
  ],
};
