/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tập hợp các số thực gồm số hữu tỉ và số vô tỉ, trục số thực, so sánh và sắp xếp số thực, giá trị tuyệt đối của một số thực.',
  intro:
    'Em đã gặp số tự nhiên, số nguyên, số hữu tỉ và vừa làm quen với số vô tỉ như $\\sqrt{2}$, $\\pi$. Gộp tất cả lại ta được tập hợp các số thực. Trên trục số, mỗi điểm ứng với đúng một số thực: không còn "lỗ hổng" nào như khi chỉ có số hữu tỉ.',
  objectives: [
    'Nhận biết số thực, tập hợp $\\mathbb{R}$ và quan hệ $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$, $\\mathbb{I} \\subset \\mathbb{R}$.',
    'Biểu diễn số thực trên trục số; so sánh và sắp xếp các số thực.',
    'Tìm số đối và giá trị tuyệt đối của một số thực.',
  ],
  sections: [
    {
      heading: '1. Tập hợp các số thực',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số thực',
          text: 'Số hữu tỉ và số vô tỉ được gọi chung là số thực. Tập hợp các số thực được kí hiệu là $\\mathbb{R}$.',
        },
        {
          type: 'tex',
          tex: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}, \\qquad \\mathbb{I} \\subset \\mathbb{R}',
        },
        {
          type: 'p',
          text: 'Mỗi số thực viết được dưới dạng số thập phân hữu hạn hoặc vô hạn: số hữu tỉ là số thập phân hữu hạn hoặc vô hạn tuần hoàn, số vô tỉ là số thập phân vô hạn không tuần hoàn. Chẳng hạn $-5$; $\\frac{2}{3} = 0{,}(6)$; $-1{,}25$; $\\sqrt{2}$; $\\pi$ đều là số thực.',
        },
        {
          type: 'p',
          text: 'Mỗi số thực $a$ có một số đối là $-a$; chẳng hạn số đối của $\\sqrt{2}$ là $-\\sqrt{2}$, số đối của $-\\pi$ là $\\pi$. Các phép tính cộng, trừ, nhân, chia, lũy thừa trong $\\mathbb{R}$ có các tính chất như trong $\\mathbb{Q}$.',
        },
      ],
    },
    {
      heading: '2. Thứ tự trong tập hợp các số thực',
      blocks: [
        {
          type: 'p',
          text: 'Để so sánh hai số thực, ta viết chúng dưới dạng số thập phân rồi so sánh như với số hữu tỉ viết dưới dạng số thập phân.',
        },
        {
          type: 'list',
          items: [
            '$\\sqrt{2} = 1{,}4142\\ldots$ và $1{,}(41) = 1{,}4141\\ldots$: hai số giống nhau đến hàng phần nghìn, khác nhau ở hàng phần chục nghìn ($2 > 1$), nên $\\sqrt{2} > 1{,}(41)$.',
            'Hai số âm: $\\sqrt{5} = 2{,}236\\ldots > 2{,}23$ nên $-\\sqrt{5} < -2{,}23$.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Trục số thực',
          text: 'Mỗi số thực được biểu diễn bởi một điểm trên trục số; ngược lại, mỗi điểm trên trục số biểu diễn một số thực. Vì thế trục số còn được gọi là trục số thực. Với hai số thực $a < b$, điểm $a$ nằm bên trái điểm $b$.',
        },
        {
          type: 'p',
          text: 'Biểu diễn $\\sqrt{2}$: vẽ hình vuông có cạnh là đoạn đơn vị từ $0$ đến $1$. Đường chéo của hình vuông này là cạnh của một hình vuông có diện tích gấp đôi, tức là diện tích $2$, nên đường chéo dài $\\sqrt{2}$. Dùng compa quay đường chéo từ điểm $0$ xuống trục số, ta được điểm biểu diễn $\\sqrt{2}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tính chất bắc cầu',
          text: 'Với các số thực $a, b, c$: nếu $a < b$ và $b < c$ thì $a < c$. Ngoài ra, với hai số $a, b$ không âm: nếu $a < b$ thì $\\sqrt{a} < \\sqrt{b}$; chẳng hạn $\\sqrt{5} < \\sqrt{7}$.',
        },
      ],
    },
    {
      heading: '3. Giá trị tuyệt đối của một số thực',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Giá trị tuyệt đối',
          text: 'Khoảng cách từ điểm $a$ đến điểm $0$ trên trục số là giá trị tuyệt đối của số $a$, kí hiệu là $|a|$.',
        },
        {
          type: 'tex',
          tex: '|a| = \\begin{cases} a & \\text{nếu } a \\ge 0 \\\\ -a & \\text{nếu } a < 0 \\end{cases}',
        },
        {
          type: 'list',
          items: [
            '$|\\sqrt{3}| = \\sqrt{3}$; $\\;|-\\pi| = \\pi$; $\\;|-1{,}25| = 1{,}25$; $\\;|0| = 0$.',
            'Với mọi số thực $a$: $|a| \\ge 0$ và $|-a| = |a|$. Hai số đối nhau có cùng giá trị tuyệt đối.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: '$|a|$ không phải là "bỏ dấu trừ đi" trong mọi trường hợp. Ví dụ $1 - \\sqrt{2} < 0$ nên $|1 - \\sqrt{2}| = -(1 - \\sqrt{2}) = \\sqrt{2} - 1$. Phương trình $|x| = -3$ không có nghiệm vì giá trị tuyệt đối không âm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Mỗi số vào đúng tập của nó',
    instruction:
      'Chọn một thẻ số rồi chọn ô của tập hợp nhỏ nhất chứa số đó: $\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Q}$ hay $\\mathbb{I}$. Đặt đúng, số hiện lên trục số kèm số đối và giá trị tuyệt đối; chạm vào một số đã đặt để xem lại. Đặt hết các thẻ để thấy chúng được sắp xếp từ nhỏ đến lớn.',
  },
  examples: [
    {
      problem: 'So sánh: a) $1{,}(41)$ và $\\sqrt{2}$; $\\;$ b) $-\\sqrt{5}$ và $-2{,}23$.',
      steps: [
        'a) $1{,}(41) = 1{,}414141\\ldots$ và $\\sqrt{2} = 1{,}414213\\ldots$ Hai số khác nhau lần đầu ở hàng phần chục nghìn: $1 < 2$.',
        'Vậy $1{,}(41) < \\sqrt{2}$.',
        'b) $\\sqrt{5} = 2{,}236\\ldots > 2{,}23$. Với hai số âm, số nào có giá trị tuyệt đối lớn hơn thì nhỏ hơn.',
        'Vậy $-\\sqrt{5} < -2{,}23$.',
      ],
      answer: '$1{,}(41) < \\sqrt{2}$ và $-\\sqrt{5} < -2{,}23$.',
    },
    {
      problem:
        'Sắp xếp các số sau theo thứ tự tăng dần: $2{,}(3)$; $\\;\\sqrt{5}$; $\\;-1{,}5$; $\\;-\\sqrt{2}$.',
      steps: [
        'Viết dưới dạng số thập phân: $2{,}(3) = 2{,}333\\ldots$; $\\;\\sqrt{5} = 2{,}236\\ldots$; $\\;-\\sqrt{2} = -1{,}414\\ldots$',
        'Hai số âm: $1{,}5 > 1{,}414\\ldots$ nên $-1{,}5 < -\\sqrt{2}$.',
        'Hai số dương: $2{,}236\\ldots < 2{,}333\\ldots$ nên $\\sqrt{5} < 2{,}(3)$.',
      ],
      answer: '$-1{,}5 < -\\sqrt{2} < \\sqrt{5} < 2{,}(3)$.',
    },
    {
      problem: 'Tính $|-4{,}5| + |1{,}5| - |-2|$.',
      steps: [
        '$|-4{,}5| = 4{,}5$; $\\;|1{,}5| = 1{,}5$; $\\;|-2| = 2$.',
        '$4{,}5 + 1{,}5 - 2 = 4$.',
      ],
      answer: '$4$.',
    },
    {
      problem: 'Tìm $x$, biết $|x| = \\sqrt{3}$.',
      steps: [
        '$|x| = \\sqrt{3}$ nghĩa là điểm $x$ cách điểm $0$ một khoảng bằng $\\sqrt{3}$.',
        'Có hai điểm như vậy, nằm hai phía của điểm $0$: $\\sqrt{3}$ và $-\\sqrt{3}$.',
      ],
      answer: '$x = \\sqrt{3}$ hoặc $x = -\\sqrt{3}$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        '$\\sqrt{2} \\in \\mathbb{R}$',
        '$-5 \\in \\mathbb{N}$',
        '$0{,}(3) \\in \\mathbb{I}$',
        '$\\pi \\in \\mathbb{I}$',
        '$\\mathbb{Q} \\subset \\mathbb{R}$',
        '$\\frac{2}{3} \\in \\mathbb{Z}$',
      ],
      answers: [0, 3, 4],
      hints: [
        'Số thập phân vô hạn tuần hoàn là số hữu tỉ.',
        'Mọi số hữu tỉ và mọi số vô tỉ đều là số thực.',
      ],
      solution:
        '$\\sqrt{2}$ là số vô tỉ nên là số thực; $\\pi \\in \\mathbb{I}$; $\\mathbb{Q} \\subset \\mathbb{R}$. Sai: $-5$ là số nguyên âm, không là số tự nhiên; $0{,}(3) = \\frac{1}{3} \\in \\mathbb{Q}$; $\\frac{2}{3}$ không là số nguyên.',
    },
    {
      type: 'choice',
      prompt: 'Chọn dấu thích hợp: $3{,}(14) \\;\\square\\; \\pi$.',
      options: ['$<$', '$>$', '$=$'],
      answer: 0,
      hints: ['Viết cả hai số đến hàng phần chục nghìn: $\\pi = 3{,}14159\\ldots$'],
      solution:
        '$3{,}(14) = 3{,}141414\\ldots$ và $\\pi = 3{,}141592\\ldots$ Ở hàng phần chục nghìn: $4 < 5$, nên $3{,}(14) < \\pi$.',
    },
    {
      type: 'number',
      prompt: 'Tính $|-7{,}2|$.',
      answer: 7.2,
      hints: ['Giá trị tuyệt đối là khoảng cách đến điểm $0$, luôn không âm.'],
      solution: '$-7{,}2 < 0$ nên $|-7{,}2| = -(-7{,}2) = 7{,}2$.',
    },
    {
      type: 'number',
      prompt: 'Tính $|-2{,}5| + |1{,}5| - |-3|$.',
      answer: 1,
      hints: ['Tính từng giá trị tuyệt đối trước.'],
      solution: '$|-2{,}5| + |1{,}5| - |-3| = 2{,}5 + 1{,}5 - 3 = 1$.',
    },
    {
      type: 'choice',
      prompt: 'Tìm $x$, biết $|x| = \\frac{2}{5}$.',
      options: [
        '$x = \\frac{2}{5}$',
        '$x = -\\frac{2}{5}$',
        '$x = \\frac{2}{5}$ hoặc $x = -\\frac{2}{5}$',
        'Không có giá trị nào của $x$',
      ],
      answer: 2,
      hints: ['Có bao nhiêu điểm trên trục số cách điểm $0$ một khoảng $\\frac{2}{5}$?'],
      solution:
        'Hai điểm cách $0$ một khoảng $\\frac{2}{5}$ là $\\frac{2}{5}$ và $-\\frac{2}{5}$, nên $x = \\frac{2}{5}$ hoặc $x = -\\frac{2}{5}$.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu số thực $x$ thoả mãn $|x| = -1$?',
      answer: 0,
      hints: ['Giá trị tuyệt đối của một số có thể âm không?'],
      solution:
        '$|x| \\ge 0$ với mọi $x$, nên không có số thực nào có giá trị tuyệt đối bằng $-1$: có $0$ số.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các số sau theo thứ tự tăng dần.',
      items: ['$\\sqrt{3}$', '$1{,}7$', '$-\\sqrt{3}$', '$-1{,}(7)$', '$\\frac{7}{4}$'],
      answer: [3, 2, 1, 0, 4],
      hints: [
        'Viết các số dưới dạng số thập phân: $\\sqrt{3} = 1{,}732\\ldots$; $\\frac{7}{4} = 1{,}75$.',
        'Hai số âm: số nào có giá trị tuyệt đối lớn hơn thì nhỏ hơn.',
      ],
      solution:
        '$-1{,}(7) = -1{,}777\\ldots < -\\sqrt{3} = -1{,}732\\ldots < 1{,}7 < \\sqrt{3} = 1{,}732\\ldots < \\frac{7}{4} = 1{,}75$.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu số nguyên $x$ thoả mãn $-\\sqrt{10} < x < \\sqrt{5}$?',
      answer: 6,
      hints: [
        '$\\sqrt{10}$ và $\\sqrt{5}$ nằm giữa hai số nguyên liên tiếp nào?',
        '$3 < \\sqrt{10} < 4$ và $2 < \\sqrt{5} < 3$.',
      ],
      solution:
        '$-\\sqrt{10} = -3{,}16\\ldots$ và $\\sqrt{5} = 2{,}23\\ldots$, nên $x \\in \\{-3; -2; -1; 0; 1; 2\\}$: có $6$ số nguyên.',
    },
    {
      type: 'choice',
      prompt: 'Giá trị tuyệt đối của $1 - \\sqrt{2}$ là',
      options: ['$1 - \\sqrt{2}$', '$\\sqrt{2} - 1$', '$1 + \\sqrt{2}$', '$-1 - \\sqrt{2}$'],
      answer: 1,
      hints: ['$1 - \\sqrt{2}$ là số dương hay số âm?'],
      solution:
        '$\\sqrt{2} > 1$ nên $1 - \\sqrt{2} < 0$; do đó $|1 - \\sqrt{2}| = -(1 - \\sqrt{2}) = \\sqrt{2} - 1$.',
    },
  ],
  takeaways: [
    'Số hữu tỉ và số vô tỉ gọi chung là số thực: $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$ và $\\mathbb{I} \\subset \\mathbb{R}$.',
    'Mỗi số thực ứng với đúng một điểm trên trục số và ngược lại; $a < b$ thì điểm $a$ nằm bên trái điểm $b$.',
    'So sánh số thực bằng cách viết chúng dưới dạng số thập phân.',
    '$|a|$ là khoảng cách từ điểm $a$ đến điểm $0$: $|a| = a$ nếu $a \\ge 0$, $|a| = -a$ nếu $a < 0$.',
  ],
};
