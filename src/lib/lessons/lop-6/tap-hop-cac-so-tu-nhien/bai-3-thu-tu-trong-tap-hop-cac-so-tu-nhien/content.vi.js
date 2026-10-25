/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'So sánh hai số tự nhiên, biểu diễn số tự nhiên trên tia số, tính chất bắc cầu, kí hiệu nhỏ hơn hoặc bằng và số liền trước, số liền sau.',
  intro:
    'Hai bạn so chiều cao, hai cửa hàng so giá tiền, bảng xếp hạng sắp các đội theo điểm: ở đâu cũng cần biết số nào lớn hơn. Trong bài này em sẽ so sánh hai số tự nhiên bất kì và thấy thứ tự ấy hiện ra ngay trên tia số.',
  objectives: [
    'So sánh hai số tự nhiên, kể cả số có nhiều chữ số.',
    'Biểu diễn số tự nhiên trên tia số và liên hệ "nhỏ hơn" với "nằm bên trái".',
    'Dùng kí hiệu $\\le$, $\\ge$ và tìm số liền trước, số liền sau của một số tự nhiên.',
  ],
  sections: [
    {
      heading: 'Thứ tự trên tia số',
      blocks: [
        {
          type: 'p',
          text: 'Các số tự nhiên được biểu diễn trên một tia số: điểm gốc ứng với số $0$, các điểm $1, 2, 3, \\dots$ cách đều nhau theo chiều mũi tên. Điểm biểu diễn số tự nhiên $a$ gọi là điểm $a$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'So sánh hai số tự nhiên',
          text: 'Với hai số tự nhiên khác nhau $a$ và $b$, luôn có $a < b$ hoặc $a > b$. Nếu $a < b$ thì trên tia số (nằm ngang, chiều mũi tên từ trái sang phải) điểm $a$ nằm bên trái điểm $b$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất bắc cầu',
          text: 'Nếu $a < b$ và $b < c$ thì $a < c$.',
        },
        {
          type: 'p',
          text: 'Kí hiệu $a \\le b$ nghĩa là $a < b$ hoặc $a = b$ (đọc là "$a$ nhỏ hơn hoặc bằng $b$"); $a \\ge b$ nghĩa là $a > b$ hoặc $a = b$ (đọc là "$a$ lớn hơn hoặc bằng $b$").',
        },
      ],
    },
    {
      heading: 'So sánh hai số có nhiều chữ số',
      blocks: [
        {
          type: 'list',
          items: [
            'Số nào có nhiều chữ số hơn thì lớn hơn. Ví dụ $10\\,000 > 9\\,999$.',
            'Hai số có cùng số chữ số thì so sánh từng cặp chữ số cùng hàng, kể từ trái sang phải. Cặp chữ số khác nhau đầu tiên quyết định: số chứa chữ số lớn hơn là số lớn hơn.',
          ],
        },
        {
          type: 'p',
          text: 'Ví dụ: $54\\,\\underline{3}12 > 54\\,\\underline{2}31$ vì hai số giống nhau ở hàng chục nghìn và hàng nghìn, còn ở hàng trăm $3 > 2$.',
        },
      ],
    },
    {
      heading: 'Số liền trước, số liền sau',
      blocks: [
        {
          type: 'list',
          items: [
            'Mỗi số tự nhiên có đúng một số liền sau. Số liền sau của $a$ là $a + 1$.',
            'Mỗi số tự nhiên khác $0$ có đúng một số liền trước. Số liền trước của $a$ ($a \\ne 0$) là $a - 1$.',
            'Hai số tự nhiên liên tiếp hơn kém nhau $1$ đơn vị.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Số $0$ là số tự nhiên nhỏ nhất nên không có số liền trước. Không có số tự nhiên lớn nhất, vì số nào cũng có số liền sau lớn hơn nó.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hai điểm trên tia số',
    instruction:
      'Kéo điểm $a$ (đỏ) và điểm $b$ (xanh) trên tia số. Dấu so sánh và câu giải thích thay đổi theo vị trí hai điểm. Làm lần lượt các thử thách để kiểm tra em đã hiểu thứ tự trên tia số.',
  },
  examples: [
    {
      problem: 'So sánh $54\\,312$ và $54\\,231$.',
      steps: [
        'Hai số đều có năm chữ số nên so sánh từng cặp chữ số từ trái sang phải.',
        'Hàng chục nghìn: $5 = 5$; hàng nghìn: $4 = 4$.',
        'Hàng trăm: $3 > 2$, đây là cặp khác nhau đầu tiên.',
      ],
      answer: '$54\\,312 > 54\\,231$.',
    },
    {
      problem:
        'Viết tập hợp $A = \\{x \\in \\mathbb{N} \\mid 5 \\le x < 9\\}$ bằng cách liệt kê và cho biết các điểm của $A$ nằm ở đâu trên tia số.',
      steps: [
        '$x \\ge 5$ nên số nhỏ nhất là $5$; $x < 9$ nên số lớn nhất là $8$.',
        '$A = \\{5; 6; 7; 8\\}$.',
        'Các điểm $5, 6, 7, 8$ nằm bên phải điểm $4$ và bên trái điểm $9$ trên tia số.',
      ],
      answer: '$A = \\{5; 6; 7; 8\\}$.',
    },
    {
      problem: 'Tìm số liền trước và số liền sau của $10\\,000$.',
      steps: [
        'Số liền trước: $10\\,000 - 1 = 9\\,999$.',
        'Số liền sau: $10\\,000 + 1 = 10\\,001$.',
      ],
      answer: 'Số liền trước là $9\\,999$, số liền sau là $10\\,001$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: $1\\,234\\,567 \\;\\square\\; 1\\,234\\,657$.',
      options: ['$<$', '$>$', '$=$'],
      answer: 0,
      hints: [
        'Hai số có cùng số chữ số; so sánh từ trái sang phải.',
        'Cặp chữ số khác nhau đầu tiên nằm ở hàng trăm.',
      ],
      solution:
        'Hai số giống nhau ở các hàng triệu, trăm nghìn, chục nghìn, nghìn. Ở hàng trăm: $5 < 6$. Vậy $1\\,234\\,567 < 1\\,234\\,657$.',
    },
    {
      type: 'number',
      prompt: 'Số liền trước của $1\\,000\\,000$ là số nào?',
      answer: 999999,
      hints: ['Số liền trước của $a$ là $a - 1$.'],
      solution: '$1\\,000\\,000 - 1 = 999\\,999$.',
    },
    {
      type: 'number',
      prompt: 'Số liền sau của $2\\,099$ là số nào?',
      answer: 2100,
      hints: ['Số liền sau của $a$ là $a + 1$.'],
      solution: '$2\\,099 + 1 = 2\\,100$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các số theo thứ tự tăng dần.',
      items: ['$2\\,019$', '$2\\,091$', '$1\\,992$', '$2\\,109$', '$1\\,929$'],
      answer: [4, 2, 0, 1, 3],
      hints: [
        'Các số đều có bốn chữ số; so sánh hàng nghìn trước.',
        'Hai số bắt đầu bằng $1$ nhỏ hơn ba số bắt đầu bằng $2$.',
      ],
      solution: '$1\\,929 < 1\\,992 < 2\\,019 < 2\\,091 < 2\\,109$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các số tự nhiên $x$ thoả mãn $12 < x \\le 15$.',
      options: ['$12$', '$13$', '$14$', '$15$', '$16$'],
      answers: [1, 2, 3],
      hints: ['$x$ phải lớn hơn $12$ (không bằng $12$) và có thể bằng $15$.'],
      solution: 'Các số thoả mãn là $13, 14, 15$.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu số tự nhiên $x$ thoả mãn $99 < x < 200$?',
      answer: 100,
      hints: ['Số nhỏ nhất là $100$, số lớn nhất là $199$.', 'Từ $100$ đến $199$ có bao nhiêu số?'],
      solution: 'Các số đó là $100, 101, \\dots, 199$, gồm $199 - 100 + 1 = 100$ số.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào sai?',
      options: [
        'Số $0$ là số tự nhiên nhỏ nhất.',
        'Mỗi số tự nhiên đều có đúng một số liền trước.',
        'Không có số tự nhiên lớn nhất.',
        'Hai số tự nhiên liên tiếp hơn kém nhau $1$ đơn vị.',
      ],
      answer: 1,
      hints: ['Hãy nghĩ về số $0$.'],
      solution:
        'Số $0$ không có số liền trước; chỉ các số tự nhiên khác $0$ mới có đúng một số liền trước.',
    },
    {
      type: 'number',
      prompt: 'Ba số $a$, $1\\,000$, $b$ là ba số tự nhiên liên tiếp tăng dần. Tìm $a$.',
      answer: 999,
      hints: ['$a$ đứng ngay trước $1\\,000$.'],
      solution: '$a$ là số liền trước của $1\\,000$, nên $a = 999$ (và $b = 1\\,001$).',
    },
    {
      type: 'choice',
      prompt: 'Biết $a < 25$ và $25 < b$. Khẳng định nào chắc chắn đúng?',
      options: ['$a < b$', '$a > b$', '$a = b$', 'Không so sánh được $a$ và $b$'],
      answer: 0,
      hints: ['Dùng tính chất bắc cầu.'],
      solution: 'Theo tính chất bắc cầu, $a < 25$ và $25 < b$ nên $a < b$.',
    },
  ],
  takeaways: [
    'Hai số tự nhiên khác nhau thì có một số nhỏ hơn; trên tia số, số nhỏ hơn nằm bên trái.',
    'Bắc cầu: $a < b$ và $b < c$ thì $a < c$. $\\ a \\le b$ nghĩa là $a < b$ hoặc $a = b$.',
    'Số có nhiều chữ số hơn thì lớn hơn; cùng số chữ số thì so sánh từng hàng từ trái sang phải.',
    'Mỗi số tự nhiên có đúng một số liền sau; mỗi số khác $0$ có đúng một số liền trước. $0$ là số tự nhiên nhỏ nhất, không có số tự nhiên lớn nhất.',
  ],
};
