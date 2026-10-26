/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương 2: hệ thống hoá bảy hằng đẳng thức đáng nhớ và các phương pháp phân tích đa thức thành nhân tử, kèm bài kiểm tra có bản đồ kĩ năng theo từng bài.',
  intro:
    'Chương 2 cho em bảy hằng đẳng thức đáng nhớ và ba phương pháp phân tích đa thức thành nhân tử. Bài này hệ thống lại toàn chương, luyện các dạng trắc nghiệm và tự luận tổng hợp, rồi cho em một bài kiểm tra; bản đồ kĩ năng tô màu từng bài để chỉ ra phần em đã vững và phần cần ôn lại.',
  objectives: [
    'Hệ thống hoá bảy hằng đẳng thức đáng nhớ và ba phương pháp phân tích đa thức thành nhân tử.',
    'Dùng hằng đẳng thức theo cả hai chiều: khai triển và viết gọn thành bình phương, lập phương hay tích.',
    'Vận dụng để tính nhanh, rút gọn biểu thức, tìm $x$ và giải bài toán thực tế về diện tích, thể tích.',
  ],
  sections: [
    {
      heading: 'Bảy hằng đẳng thức đáng nhớ',
      blocks: [
        {
          type: 'p',
          text: 'Với $A$, $B$ là hai biểu thức tuỳ ý, ta có các hằng đẳng thức sau. Mỗi hằng đẳng thức đọc được theo hai chiều: từ trái sang phải để khai triển, từ phải sang trái để viết gọn hay phân tích thành nhân tử.',
        },
        {
          type: 'table',
          caption: 'Các hằng đẳng thức của chương 2',
          head: ['Tên gọi', 'Hằng đẳng thức'],
          rows: [
            ['Bình phương của một tổng', '$(A + B)^2 = A^2 + 2AB + B^2$'],
            ['Bình phương của một hiệu', '$(A - B)^2 = A^2 - 2AB + B^2$'],
            ['Hiệu hai bình phương', '$A^2 - B^2 = (A - B)(A + B)$'],
            ['Lập phương của một tổng', '$(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$'],
            ['Lập phương của một hiệu', '$(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3$'],
            ['Tổng hai lập phương', '$A^3 + B^3 = (A + B)(A^2 - AB + B^2)$'],
            ['Hiệu hai lập phương', '$A^3 - B^3 = (A - B)(A^2 + AB + B^2)$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhớ',
          text: 'Trong $(A - B)^2$ và $(A - B)^3$, các hạng tử chứa luỹ thừa lẻ của $B$ mang dấu trừ. Trong tổng (hiệu) hai lập phương, thừa số thứ hai $A^2 \\mp AB + B^2$ là "bình phương thiếu": hạng tử giữa là $AB$, không phải $2AB$.',
        },
      ],
    },
    {
      heading: 'Phân tích đa thức thành nhân tử',
      blocks: [
        {
          type: 'p',
          text: 'Phân tích một đa thức thành nhân tử (hay thừa số) là biến đổi đa thức đó thành một tích của những đa thức.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt nhân tử chung: $AB + AC = A(B + C)$; có khi phải đổi dấu để thấy nhân tử chung, như $x(x - 2) - 3(2 - x) = (x - 2)(x + 3)$.',
            'Dùng hằng đẳng thức: $x^2 - 6x + 9 = (x - 3)^2$, $x^3 - 8 = (x - 2)(x^2 + 2x + 4)$.',
            'Nhóm hạng tử: $xy + 2y + 3x + 6 = y(x + 2) + 3(x + 2) = (x + 2)(y + 3)$.',
          ],
        },
        {
          type: 'tex',
          tex: '3x^3 - 12x = 3x(x^2 - 4) = 3x(x - 2)(x + 2)',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Phân tích đến cùng',
          text: 'Thường đặt nhân tử chung trước, rồi xét hằng đẳng thức, rồi mới nhóm. Dừng ở $3x(x^2 - 4)$ là chưa xong vì $x^2 - 4$ còn phân tích tiếp được.',
        },
      ],
    },
    {
      heading: 'Những lỗi hay gặp',
      blocks: [
        {
          type: 'list',
          items: [
            'Quên hạng tử giữa: $(x + 3)^2 = x^2 + 6x + 9$, không phải $x^2 + 9$.',
            'Bình phương thiếu hệ số: $(2x)^2 = 4x^2$ và $(2x)^3 = 8x^3$, không phải $2x^2$ hay $2x^3$.',
            'Nhầm lập phương của tổng với tổng hai lập phương: $(a + b)^3 \\ne a^3 + b^3$.',
            'Nhầm dấu trong tổng, hiệu hai lập phương: $a^3 - b^3 = (a - b)(a^2 + ab + b^2)$, thừa số thứ hai toàn dấu cộng.',
            'Chia hai vế cho $x$ khi tìm $x$: từ $x^2 = 5x$ phải viết $x(x - 5) = 0$, nếu không sẽ mất nghiệm $x = 0$.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Mười bốn câu, mỗi kĩ năng của chương hai câu, xuất hiện theo thứ tự ngẫu nhiên. Nhập đáp số rồi bấm "Kiểm tra"; làm sai lần đầu em được gợi ý và làm lại. Bản đồ kĩ năng tô xanh phần em đã vững, tô vàng hoặc đỏ phần cần ôn lại.',
  },
  examples: [
    {
      problem: 'Rút gọn biểu thức $(x + 2)(x^2 - 2x + 4) - (x - 1)^3$.',
      steps: [
        'Tích đầu là tổng hai lập phương: $(x + 2)(x^2 - 2x + 4) = x^3 + 8$.',
        'Lập phương của một hiệu: $(x - 1)^3 = x^3 - 3x^2 + 3x - 1$.',
        'Trừ, đổi dấu mọi hạng tử trong ngoặc: $x^3 + 8 - x^3 + 3x^2 - 3x + 1 = 3x^2 - 3x + 9$.',
      ],
      answer: '$(x + 2)(x^2 - 2x + 4) - (x - 1)^3 = 3x^2 - 3x + 9$.',
    },
    {
      problem: 'Phân tích đa thức $x^3 - 2x^2 + x - xy^2$ thành nhân tử.',
      steps: [
        'Đặt nhân tử chung $x$: $x(x^2 - 2x + 1 - y^2)$.',
        'Nhóm ba hạng tử đầu trong ngoặc: $x^2 - 2x + 1 = (x - 1)^2$.',
        'Ngoặc còn lại là hiệu hai bình phương: $(x - 1)^2 - y^2 = (x - 1 - y)(x - 1 + y)$.',
      ],
      answer: '$x^3 - 2x^2 + x - xy^2 = x(x - y - 1)(x + y - 1)$.',
    },
    {
      problem: 'Chứng minh rằng với mọi số nguyên $n$, $n^3 - n$ chia hết cho $6$.',
      steps: [
        'Phân tích: $n^3 - n = n(n^2 - 1) = (n - 1)n(n + 1)$.',
        'Đó là tích của ba số nguyên liên tiếp, trong đó có ít nhất một số chẵn và đúng một số chia hết cho $3$.',
        'Tích chia hết cho $2$ và cho $3$, mà $2$ và $3$ nguyên tố cùng nhau, nên chia hết cho $6$.',
      ],
      answer: '$n^3 - n = (n - 1)n(n + 1)$ chia hết cho $6$ với mọi số nguyên $n$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Khai triển $(x - 2)^2$ được',
      options: ['$x^2 - 4$', '$x^2 - 4x + 4$', '$x^2 - 2x + 4$', '$x^2 + 4x + 4$'],
      answer: 1,
      hints: [
        'Áp dụng $(A - B)^2 = A^2 - 2AB + B^2$ với $A = x$, $B = 2$.',
        'Hạng tử giữa là $2 \\cdot x \\cdot 2$, mang dấu trừ.',
      ],
      solution: '$(x - 2)^2 = x^2 - 2 \\cdot x \\cdot 2 + 2^2 = x^2 - 4x + 4$.',
    },
    {
      type: 'choice',
      prompt: 'Biểu thức nào bằng $(2x + 1)^3$?',
      options: [
        '$8x^3 + 12x^2 + 6x + 1$',
        '$2x^3 + 6x^2 + 6x + 1$',
        '$8x^3 + 1$',
        '$8x^3 + 6x^2 + 12x + 1$',
      ],
      answer: 0,
      hints: [
        'Áp dụng $(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$ với $A = 2x$, $B = 1$.',
        '$A^3 = (2x)^3 = 8x^3$ và $3A^2B = 3 \\cdot 4x^2 \\cdot 1$.',
      ],
      solution:
        '$(2x + 1)^3 = (2x)^3 + 3 \\cdot (2x)^2 \\cdot 1 + 3 \\cdot 2x \\cdot 1^2 + 1^3 = 8x^3 + 12x^2 + 6x + 1$.',
    },
    {
      type: 'choice',
      prompt: 'Đa thức $x^3 + 27$ bằng',
      options: [
        '$(x + 3)(x^2 - 3x + 9)$',
        '$(x + 3)(x^2 + 3x + 9)$',
        '$(x + 3)^3$',
        '$(x - 3)(x^2 + 3x + 9)$',
      ],
      answer: 0,
      hints: [
        '$27 = 3^3$, nên đây là tổng hai lập phương.',
        '$A^3 + B^3 = (A + B)(A^2 - AB + B^2)$.',
      ],
      solution: '$x^3 + 27 = x^3 + 3^3 = (x + 3)(x^2 - 3x + 9)$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi vế trái với vế phải của hằng đẳng thức tương ứng.',
      left: ['$A^2 - B^2$', '$(A + B)^2$', '$(A - B)^3$', '$A^3 - B^3$'],
      right: [
        '$(A - B)(A^2 + AB + B^2)$',
        '$A^2 + 2AB + B^2$',
        '$(A - B)(A^2 - AB + B^2)$',
        '$(A - B)(A + B)$',
        '$A^3 - 3A^2B + 3AB^2 - B^3$',
      ],
      pairs: [
        [0, 3],
        [1, 1],
        [2, 4],
        [3, 0],
      ],
      hints: [
        'Hiệu hai lập phương có thừa số thứ hai toàn dấu cộng.',
        'Thẻ $(A - B)(A^2 - AB + B^2)$ không ứng với hằng đẳng thức nào.',
      ],
      solution:
        '$A^2 - B^2 = (A - B)(A + B)$; $(A + B)^2 = A^2 + 2AB + B^2$; $(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3$; $A^3 - B^3 = (A - B)(A^2 + AB + B^2)$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh $99^2$.',
      answer: 9801,
      hints: ['Viết $99 = 100 - 1$.', 'Dùng bình phương của một hiệu.'],
      solution: '$99^2 = (100 - 1)^2 = 10000 - 200 + 1 = 9801$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh $2025^2 - 2024^2$.',
      answer: 4049,
      hints: ['Dùng hiệu hai bình phương.', '$2025 - 2024 = 1$.'],
      solution: '$2025^2 - 2024^2 = (2025 + 2024)(2025 - 2024) = 4049 \\cdot 1 = 4049$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $x^3 + 6x^2 + 12x + 8$ tại $x = 98$.',
      answer: 1000000,
      hints: [
        'Biểu thức là lập phương của một tổng.',
        '$x^3 + 6x^2 + 12x + 8 = x^3 + 3 \\cdot x^2 \\cdot 2 + 3 \\cdot x \\cdot 2^2 + 2^3$.',
      ],
      solution:
        '$x^3 + 6x^2 + 12x + 8 = (x + 2)^3$. Tại $x = 98$: $(98 + 2)^3 = 100^3 = 1\\,000\\,000$.',
    },
    {
      type: 'number',
      prompt:
        'Rút gọn biểu thức $(x + 1)^3 - (x - 1)^3 - 6x^2$. Kết quả là một số; số đó là bao nhiêu?',
      answer: 2,
      hints: [
        'Khai triển $(x + 1)^3$ và $(x - 1)^3$.',
        'Khi trừ, các hạng tử $x^3$ và $3x$ triệt tiêu nhau.',
      ],
      solution:
        '$(x + 1)^3 - (x - 1)^3 = (x^3 + 3x^2 + 3x + 1) - (x^3 - 3x^2 + 3x - 1) = 6x^2 + 2$. Vậy biểu thức bằng $6x^2 + 2 - 6x^2 = 2$.',
    },
    {
      type: 'choice',
      prompt: 'Phân tích triệt để $x^3 - 4x$ thành nhân tử được',
      options: ['$x(x - 2)(x + 2)$', '$x(x - 4)(x + 4)$', '$(x - 2)(x + 2)$', '$x(x - 2)^2$'],
      answer: 0,
      hints: [
        'Đặt nhân tử chung $x$ trước.',
        'Trong ngoặc còn $x^2 - 4$, là hiệu hai bình phương.',
      ],
      solution: '$x^3 - 4x = x(x^2 - 4) = x(x - 2)(x + 2)$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các giá trị của $x$ thoả mãn $x^3 - 9x = 0$.',
      options: ['$0$', '$3$', '$-3$', '$9$', '$-9$'],
      answers: [0, 1, 2],
      hints: [
        'Phân tích vế trái thành nhân tử: đặt $x$ ra ngoài rồi dùng hiệu hai bình phương.',
        'Tích $x(x - 3)(x + 3)$ bằng $0$ khi một thừa số bằng $0$.',
      ],
      solution:
        '$x^3 - 9x = x(x^2 - 9) = x(x - 3)(x + 3) = 0$, nên $x = 0$ hoặc $x = 3$ hoặc $x = -3$.',
    },
    {
      type: 'number',
      prompt: 'Biết $x - y = 3$ và $xy = 10$. Tính $x^3 - y^3$.',
      answer: 117,
      hints: [
        '$(x - y)^3 = x^3 - 3x^2y + 3xy^2 - y^3 = x^3 - y^3 - 3xy(x - y)$.',
        'Suy ra $x^3 - y^3 = (x - y)^3 + 3xy(x - y)$.',
      ],
      solution:
        '$x^3 - y^3 = (x - y)^3 + 3xy(x - y) = 3^3 + 3 \\cdot 10 \\cdot 3 = 27 + 90 = 117$.',
    },
    {
      type: 'number',
      prompt:
        'Từ một khối gỗ hình lập phương cạnh $12$ cm, người ta khoét bỏ một khối hình lập phương cạnh $8$ cm. Thể tích phần gỗ còn lại là bao nhiêu xăng-ti-mét khối?',
      answer: 1216,
      unit: 'cm³',
      hints: [
        'Thể tích còn lại là $12^3 - 8^3$.',
        'Dùng hiệu hai lập phương: $12^3 - 8^3 = (12 - 8)(12^2 + 12 \\cdot 8 + 8^2)$.',
      ],
      solution:
        '$12^3 - 8^3 = (12 - 8)(144 + 96 + 64) = 4 \\cdot 304 = 1216\\ \\text{cm}^3$ (kiểm tra: $1728 - 512 = 1216$).',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh vườn hình vuông cạnh $x$ (m). Người ta mở rộng mỗi cạnh thêm $3$ m để được mảnh vườn hình vuông mới. Với $x = 20$, diện tích tăng thêm bao nhiêu mét vuông?',
      answer: 129,
      unit: 'm²',
      hints: [
        'Diện tích tăng thêm là $(x + 3)^2 - x^2$.',
        'Khai triển: $(x + 3)^2 - x^2 = 6x + 9$.',
      ],
      solution:
        '$(x + 3)^2 - x^2 = x^2 + 6x + 9 - x^2 = 6x + 9$. Với $x = 20$: $6 \\cdot 20 + 9 = 129\\ \\text{m}^2$ (kiểm tra: $23^2 - 20^2 = 529 - 400 = 129$).',
    },
  ],
  takeaways: [
    'Bảy hằng đẳng thức đáng nhớ dùng theo cả hai chiều: khai triển và viết gọn.',
    'Phân tích thành nhân tử: đặt nhân tử chung, dùng hằng đẳng thức, nhóm hạng tử, và phân tích đến cùng.',
    'Hằng đẳng thức giúp tính nhanh ($99^2 = (100 - 1)^2$), còn phân tích thành nhân tử giúp tìm $x$ vì tích bằng $0$ khi một thừa số bằng $0$.',
  ],
};
