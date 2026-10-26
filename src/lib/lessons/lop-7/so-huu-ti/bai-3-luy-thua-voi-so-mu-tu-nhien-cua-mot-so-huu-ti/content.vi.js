/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Lũy thừa với số mũ tự nhiên của một số hữu tỉ, tích và thương của hai lũy thừa cùng cơ số, lũy thừa của lũy thừa.',
  intro:
    'Một khối lập phương có cạnh $1{,}5$ dm thì thể tích là $1{,}5 \\cdot 1{,}5 \\cdot 1{,}5$ dm³. Tích nhiều thừa số bằng nhau được viết gọn bằng lũy thừa: $(1{,}5)^3$. Ở lớp 6 em đã biết lũy thừa của số tự nhiên; bài này mở rộng cho mọi số hữu tỉ, kể cả phân số và số âm.',
  objectives: [
    'Hiểu lũy thừa với số mũ tự nhiên của một số hữu tỉ và tính được lũy thừa.',
    'Nhân, chia hai lũy thừa cùng cơ số.',
    'Tính lũy thừa của một lũy thừa.',
  ],
  sections: [
    {
      heading: '1. Lũy thừa với số mũ tự nhiên',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Lũy thừa',
          text: 'Lũy thừa bậc $n$ của một số hữu tỉ $x$, kí hiệu $x^n$, là tích của $n$ thừa số $x$ ($n$ là số tự nhiên lớn hơn $1$). Số $x$ gọi là cơ số, $n$ gọi là số mũ.',
        },
        {
          type: 'tex',
          tex: 'x^n = \\underbrace{x \\cdot x \\cdot \\ldots \\cdot x}_{n \\text{ thừa số}} \\qquad (x \\in \\mathbb{Q},\\ n \\in \\mathbb{N},\\ n > 1)',
        },
        {
          type: 'p',
          text: 'Quy ước: $x^1 = x$; $\\;x^0 = 1$ với $x \\ne 0$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Lũy thừa của một thương: $\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}$ ($b \\ne 0$). Tương tự, $(x \\cdot y)^n = x^n \\cdot y^n$ và $(x : y)^n = x^n : y^n$ ($y \\ne 0$).',
        },
        {
          type: 'tex',
          tex: '\\left(\\frac{-2}{3}\\right)^3 = \\frac{(-2)^3}{3^3} = \\frac{-8}{27}; \\qquad (-0{,}5)^2 = 0{,}25',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dấu của lũy thừa',
          text: 'Lũy thừa bậc chẵn của một số âm là số dương, lũy thừa bậc lẻ của một số âm là số âm: $(-2)^4 = 16$, $(-2)^5 = -32$. Cẩn thận: $-3^2 = -(3^2) = -9$, khác với $(-3)^2 = 9$.',
        },
      ],
    },
    {
      heading: '2. Tích và thương của hai lũy thừa cùng cơ số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Khi nhân hai lũy thừa cùng cơ số, ta giữ nguyên cơ số và cộng các số mũ. Khi chia hai lũy thừa cùng cơ số (khác $0$), ta giữ nguyên cơ số và lấy số mũ của số bị chia trừ đi số mũ của số chia.',
        },
        {
          type: 'tex',
          tex: 'x^m \\cdot x^n = x^{m+n}; \\qquad x^m : x^n = x^{m-n} \\quad (x \\ne 0,\\ m \\ge n)',
        },
        {
          type: 'p',
          text: 'Ví dụ: $(-0{,}3)^5 \\cdot (-0{,}3)^2 = (-0{,}3)^7$; $\\;\\left(\\frac{2}{3}\\right)^9 : \\left(\\frac{2}{3}\\right)^6 = \\left(\\frac{2}{3}\\right)^3 = \\frac{8}{27}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Không nhân số mũ khi nhân hai lũy thừa: $2^3 \\cdot 2^2 = 2^5 = 32$, không phải $2^6 = 64$. Quy tắc chỉ dùng cho hai lũy thừa cùng cơ số.',
        },
      ],
    },
    {
      heading: '3. Lũy thừa của lũy thừa',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc',
          text: 'Khi tính lũy thừa của một lũy thừa, ta giữ nguyên cơ số và nhân hai số mũ.',
        },
        { type: 'tex', tex: '\\left(x^m\\right)^n = x^{m \\cdot n}' },
        {
          type: 'p',
          text: 'Ví dụ: $\\left[\\left(\\frac{-1}{2}\\right)^3\\right]^2 = \\left(\\frac{-1}{2}\\right)^6 = \\frac{1}{64}$; $\\;\\left[(0{,}2)^2\\right]^3 = (0{,}2)^6$.',
        },
        {
          type: 'table',
          caption: 'Ba quy tắc với cùng cơ số $x$',
          head: ['Phép tính', 'Quy tắc', 'Ví dụ'],
          rows: [
            ['$x^m \\cdot x^n$', 'cộng số mũ: $x^{m+n}$', '$5^2 \\cdot 5^3 = 5^5$'],
            ['$x^m : x^n$', 'trừ số mũ: $x^{m-n}$', '$5^7 : 5^3 = 5^4$'],
            ['$(x^m)^n$', 'nhân số mũ: $x^{m \\cdot n}$', '$(5^2)^3 = 5^6$'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Thẻ quy tắc lũy thừa',
    instruction:
      'Chọn một biểu thức, rồi chọn lần lượt các thẻ quy tắc để rút gọn nó thành một lũy thừa duy nhất. Biểu thức được tính từ trái sang phải. Sau mỗi thẻ, máy so sánh giá trị trước và sau: thẻ đúng giữ nguyên giá trị, thẻ sai làm giá trị thay đổi nên bị từ chối. Hãy thử cả các thẻ sai để thấy vì sao chúng sai.',
  },
  examples: [
    {
      problem: 'Tính $\\left(\\frac{-2}{3}\\right)^3$ và $(-0{,}5)^4$.',
      steps: [
        '$\\left(\\frac{-2}{3}\\right)^3 = \\frac{(-2)^3}{3^3} = \\frac{-8}{27}$ (số mũ lẻ, kết quả âm).',
        '$(-0{,}5)^4 = (-0{,}5) \\cdot (-0{,}5) \\cdot (-0{,}5) \\cdot (-0{,}5) = 0{,}25 \\cdot 0{,}25$.',
        '$0{,}25 \\cdot 0{,}25 = 0{,}0625$ (số mũ chẵn, kết quả dương).',
      ],
      answer: '$\\left(\\frac{-2}{3}\\right)^3 = \\frac{-8}{27}$; $\\;(-0{,}5)^4 = 0{,}0625$.',
    },
    {
      problem:
        'Viết kết quả dưới dạng lũy thừa của $\\frac{2}{5}$: $\\left[\\left(\\frac{2}{5}\\right)^3\\right]^2 \\cdot \\left(\\frac{2}{5}\\right)^4 : \\left(\\frac{2}{5}\\right)^7$.',
      steps: [
        'Lũy thừa của lũy thừa: $\\left[\\left(\\frac{2}{5}\\right)^3\\right]^2 = \\left(\\frac{2}{5}\\right)^6$.',
        'Nhân hai lũy thừa cùng cơ số: $\\left(\\frac{2}{5}\\right)^6 \\cdot \\left(\\frac{2}{5}\\right)^4 = \\left(\\frac{2}{5}\\right)^{10}$.',
        'Chia hai lũy thừa cùng cơ số: $\\left(\\frac{2}{5}\\right)^{10} : \\left(\\frac{2}{5}\\right)^7 = \\left(\\frac{2}{5}\\right)^3$.',
      ],
      answer: 'Kết quả là $\\left(\\frac{2}{5}\\right)^3 = \\frac{8}{125}$.',
    },
    {
      problem: 'Tính nhanh $(0{,}125)^3 \\cdot 8^3$.',
      steps: [
        'Hai lũy thừa cùng số mũ: $x^n \\cdot y^n = (x \\cdot y)^n$.',
        '$(0{,}125)^3 \\cdot 8^3 = (0{,}125 \\cdot 8)^3$.',
        '$0{,}125 \\cdot 8 = 1$ nên kết quả là $1^3 = 1$.',
      ],
      answer: '$(0{,}125)^3 \\cdot 8^3 = 1$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt: 'Tính $\\left(\\frac{-3}{4}\\right)^3$.',
      answer: [-27, 64],
      hints: ['$\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}$.', 'Số mũ lẻ nên kết quả âm.'],
      solution: '$\\left(\\frac{-3}{4}\\right)^3 = \\frac{(-3)^3}{4^3} = \\frac{-27}{64}$.',
    },
    {
      type: 'number',
      prompt: 'Tính $(-1{,}2)^2$.',
      answer: 1.44,
      hints: ['$(-1{,}2)^2 = (-1{,}2) \\cdot (-1{,}2)$; hai số âm nhân với nhau được số dương.'],
      solution: '$(-1{,}2)^2 = (-1{,}2) \\cdot (-1{,}2) = 1{,}44$.',
    },
    {
      type: 'choice',
      prompt: 'Với $x \\ne 0$, $x^5 \\cdot x^3$ bằng:',
      options: ['$x^{15}$', '$x^8$', '$x^2$', '$(2x)^8$'],
      answer: 1,
      hints: ['Nhân hai lũy thừa cùng cơ số thì giữ cơ số và cộng số mũ.'],
      solution: '$x^5 \\cdot x^3 = x^{5+3} = x^8$. Đáp án $x^{15}$ là lỗi nhân số mũ.',
    },
    {
      type: 'number',
      prompt:
        'Viết $\\left(\\frac{-1}{3}\\right)^{12} : \\left(\\frac{-1}{3}\\right)^{4}$ dưới dạng lũy thừa của $\\frac{-1}{3}$. Số mũ của lũy thừa đó là bao nhiêu?',
      answer: 8,
      hints: ['Chia hai lũy thừa cùng cơ số thì trừ số mũ.'],
      solution:
        '$\\left(\\frac{-1}{3}\\right)^{12} : \\left(\\frac{-1}{3}\\right)^{4} = \\left(\\frac{-1}{3}\\right)^{12-4} = \\left(\\frac{-1}{3}\\right)^{8}$. Số mũ là $8$.',
    },
    {
      type: 'number',
      prompt: 'Biết $\\left[(0{,}2)^2\\right]^3 = (0{,}2)^k$. Tìm $k$.',
      answer: 6,
      hints: ['Lũy thừa của lũy thừa: giữ cơ số, nhân hai số mũ.'],
      solution: '$\\left[(0{,}2)^2\\right]^3 = (0{,}2)^{2 \\cdot 3} = (0{,}2)^6$, nên $k = 6$.',
    },
    {
      type: 'multi',
      prompt: 'Những số nào sau đây là số âm?',
      options: [
        '$(-2)^3$',
        '$\\left(-\\frac{1}{2}\\right)^4$',
        '$(-0{,}1)^5$',
        '$-3^2$',
        '$(-3)^0$',
      ],
      answers: [0, 2, 3],
      hints: [
        'Lũy thừa bậc lẻ của số âm là số âm, bậc chẵn là số dương.',
        'Trong $-3^2$, lũy thừa chỉ áp dụng cho $3$.',
      ],
      solution:
        '$(-2)^3 = -8 < 0$; $\\left(-\\frac{1}{2}\\right)^4 = \\frac{1}{16} > 0$; $(-0{,}1)^5 = -0{,}00001 < 0$; $-3^2 = -9 < 0$; $(-3)^0 = 1 > 0$.',
    },
    {
      type: 'number',
      prompt: 'Tính $4^5 \\cdot 4^3 : 4^6$.',
      answer: 16,
      hints: ['Làm từ trái sang phải: $4^5 \\cdot 4^3 = 4^8$.'],
      solution: '$4^5 \\cdot 4^3 : 4^6 = 4^8 : 4^6 = 4^2 = 16$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh $(0{,}25)^4 \\cdot 4^4$.',
      answer: 1,
      hints: ['$x^n \\cdot y^n = (x \\cdot y)^n$.'],
      solution: '$(0{,}25)^4 \\cdot 4^4 = (0{,}25 \\cdot 4)^4 = 1^4 = 1$.',
    },
    {
      type: 'fraction',
      prompt: 'Tìm $x$, biết $x : \\left(\\frac{-1}{2}\\right)^3 = \\frac{-1}{2}$.',
      answer: [1, 16],
      hints: [
        'Số bị chia bằng thương nhân với số chia.',
        'Nhân hai lũy thừa cùng cơ số $\\frac{-1}{2}$.',
      ],
      solution:
        '$x = \\frac{-1}{2} \\cdot \\left(\\frac{-1}{2}\\right)^3 = \\left(\\frac{-1}{2}\\right)^4 = \\frac{1}{16}$.',
    },
    {
      type: 'number',
      prompt:
        'Một khối lập phương có cạnh $1{,}5$ dm. Thể tích của khối đó là bao nhiêu đề-xi-mét khối?',
      answer: 3.375,
      unit: 'dm³',
      hints: ['Thể tích hình lập phương cạnh $a$ là $a^3$.'],
      solution:
        '$V = (1{,}5)^3 = 1{,}5 \\cdot 1{,}5 \\cdot 1{,}5 = 2{,}25 \\cdot 1{,}5 = 3{,}375$ (dm³).',
    },
  ],
  takeaways: [
    '$x^n$ là tích của $n$ thừa số $x$; $x^1 = x$, $x^0 = 1$ ($x \\ne 0$); $\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}$.',
    'Lũy thừa bậc chẵn của số âm là số dương, bậc lẻ là số âm.',
    'Cùng cơ số: $x^m \\cdot x^n = x^{m+n}$; $\\;x^m : x^n = x^{m-n}$ ($x \\ne 0$, $m \\ge n$).',
    'Lũy thừa của lũy thừa: $(x^m)^n = x^{m \\cdot n}$.',
  ],
};
