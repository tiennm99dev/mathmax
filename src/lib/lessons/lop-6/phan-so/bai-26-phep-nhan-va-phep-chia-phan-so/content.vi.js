/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhân hai phân số, nhân số nguyên với phân số, tính chất của phép nhân phân số, phân số nghịch đảo và quy tắc chia phân số.',
  intro:
    'Một mảnh vườn hình chữ nhật có chiều dài $\\frac{2}{3}$ hm và chiều rộng $\\frac{3}{4}$ hm. Diện tích mảnh vườn là $\\frac{2}{3} \\cdot \\frac{3}{4}$ hm². Vẽ hình vuông cạnh $1$ hm, tô $\\frac{2}{3}$ theo chiều ngang và $\\frac{3}{4}$ theo chiều dọc, phần tô chồng lên nhau chính là mảnh vườn. Đếm ô, em sẽ tìm ra quy tắc nhân phân số.',
  objectives: [
    'Nhân hai phân số, nhân một số nguyên với một phân số.',
    'Vận dụng tính chất giao hoán, kết hợp, nhân với $1$ và phân phối để tính nhanh.',
    'Tìm phân số nghịch đảo và chia một phân số cho một phân số khác $0$.',
  ],
  sections: [
    {
      heading: 'Phép nhân hai phân số',
      blocks: [
        {
          type: 'p',
          text: 'Chia hình vuông đơn vị thành $3$ cột và $4$ hàng, được $3 \\cdot 4 = 12$ ô bằng nhau. Phần tô chồng gồm $2$ cột và $3$ hàng, tức $2 \\cdot 3 = 6$ ô. Vậy $\\frac{2}{3} \\cdot \\frac{3}{4} = \\frac{2 \\cdot 3}{3 \\cdot 4} = \\frac{6}{12} = \\frac{1}{2}$ hm².',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc nhân',
          text: 'Muốn nhân hai phân số, ta nhân các tử với nhau và nhân các mẫu với nhau: $\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}$. Muốn nhân một số nguyên với một phân số, ta nhân số nguyên với tử và giữ nguyên mẫu: $a \\cdot \\frac{b}{c} = \\frac{a \\cdot b}{c}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Nên rút gọn trước khi nhân để số nhỏ hơn: $\\frac{-3}{5} \\cdot \\frac{10}{7} = \\frac{-3 \\cdot 10}{5 \\cdot 7} = \\frac{-3 \\cdot 2}{1 \\cdot 7} = \\frac{-6}{7}$ (rút gọn $10$ với $5$).',
        },
        {
          type: 'p',
          text: 'Giống phép nhân số nguyên, phép nhân phân số có các tính chất:',
        },
        {
          type: 'list',
          items: [
            'giao hoán: $\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{c}{d} \\cdot \\frac{a}{b}$;',
            'kết hợp: $\\left(\\frac{a}{b} \\cdot \\frac{c}{d}\\right) \\cdot \\frac{p}{q} = \\frac{a}{b} \\cdot \\left(\\frac{c}{d} \\cdot \\frac{p}{q}\\right)$;',
            'nhân với số $1$: $\\frac{a}{b} \\cdot 1 = 1 \\cdot \\frac{a}{b} = \\frac{a}{b}$;',
            'phân phối của phép nhân đối với phép cộng và phép trừ: $\\frac{a}{b} \\cdot \\left(\\frac{c}{d} \\pm \\frac{p}{q}\\right) = \\frac{a}{b} \\cdot \\frac{c}{d} \\pm \\frac{a}{b} \\cdot \\frac{p}{q}$.',
          ],
        },
      ],
    },
    {
      heading: 'Phép chia phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phân số nghịch đảo',
          text: 'Hai phân số được gọi là nghịch đảo của nhau nếu tích của chúng bằng $1$. Phân số $\\frac{a}{b}$ ($a \\ne 0$, $b \\ne 0$) có phân số nghịch đảo là $\\frac{b}{a}$, vì $\\frac{a}{b} \\cdot \\frac{b}{a} = 1$.',
        },
        {
          type: 'p',
          text: 'Ví dụ: nghịch đảo của $\\frac{-5}{7}$ là $\\frac{7}{-5} = \\frac{-7}{5}$; nghịch đảo của $-3 = \\frac{-3}{1}$ là $\\frac{-1}{3}$. Số $0$ không có số nghịch đảo, vì $0$ nhân với số nào cũng bằng $0$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc chia',
          text: 'Muốn chia một phân số cho một phân số khác $0$, ta nhân số bị chia với phân số nghịch đảo của số chia: $\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c} = \\frac{a \\cdot d}{b \\cdot c}$ ($c \\ne 0$).',
        },
        {
          type: 'p',
          text: 'Phép chia trả lời câu hỏi "số bị chia chứa bao nhiêu lần số chia?". Chẳng hạn $\\frac{3}{4} : \\frac{1}{8} = \\frac{3}{4} \\cdot 8 = 6$: đoạn dài $\\frac{3}{4}$ chứa đúng $6$ đoạn dài $\\frac{1}{8}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Chỉ đảo ngược số chia, không đảo số bị chia: $\\frac{2}{3} : \\frac{5}{7} = \\frac{2}{3} \\cdot \\frac{7}{5}$, không phải $\\frac{3}{2} \\cdot \\frac{5}{7}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tô chồng và đếm số lần chứa',
    instruction:
      'Chế độ "Nhân": chọn phân số theo chiều ngang (cột) và chiều dọc (hàng), hoặc chạm vào một ô; phần tô chồng màu tím là tích. Chế độ "Chia": chọn số bị chia và số chia, xem đoạn số bị chia chứa bao nhiêu đoạn số chia đặt nối nhau, rồi so với kết quả nhân nghịch đảo.',
  },
  examples: [
    {
      problem: 'Tính $\\frac{-3}{5} \\cdot \\frac{10}{7}$.',
      steps: [
        'Nhân tử với tử, mẫu với mẫu: $\\frac{-3}{5} \\cdot \\frac{10}{7} = \\frac{(-3) \\cdot 10}{5 \\cdot 7} = \\frac{-30}{35}$.',
        'Rút gọn cho $5$: $\\frac{-30}{35} = \\frac{-6}{7}$.',
      ],
      answer: '$\\frac{-3}{5} \\cdot \\frac{10}{7} = \\frac{-6}{7}$.',
    },
    {
      problem: 'Tính nhanh $\\frac{2}{3} \\cdot \\frac{5}{7} + \\frac{2}{3} \\cdot \\frac{2}{7}$.',
      steps: [
        'Dùng tính chất phân phối: $\\frac{2}{3} \\cdot \\left(\\frac{5}{7} + \\frac{2}{7}\\right)$.',
        '$\\frac{5}{7} + \\frac{2}{7} = \\frac{7}{7} = 1$, nên biểu thức bằng $\\frac{2}{3} \\cdot 1$.',
      ],
      answer: 'Kết quả bằng $\\frac{2}{3}$.',
    },
    {
      problem: 'Tính $\\frac{-2}{3} : \\frac{4}{9}$.',
      steps: [
        'Nghịch đảo của $\\frac{4}{9}$ là $\\frac{9}{4}$.',
        '$\\frac{-2}{3} : \\frac{4}{9} = \\frac{-2}{3} \\cdot \\frac{9}{4} = \\frac{-18}{12}$.',
        'Rút gọn cho $6$: $\\frac{-18}{12} = \\frac{-3}{2}$.',
      ],
      answer: '$\\frac{-2}{3} : \\frac{4}{9} = \\frac{-3}{2}$.',
    },
    {
      problem:
        'Một hình chữ nhật có diện tích $\\frac{3}{5}$ m² và chiều dài $\\frac{4}{3}$ m. Tính chiều rộng.',
      steps: [
        'Chiều rộng bằng diện tích chia cho chiều dài: $\\frac{3}{5} : \\frac{4}{3}$.',
        '$\\frac{3}{5} \\cdot \\frac{3}{4} = \\frac{9}{20}$.',
      ],
      answer: 'Chiều rộng là $\\frac{9}{20}$ m.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt: 'Tính $\\frac{4}{9} \\cdot \\frac{-3}{8}$ (viết kết quả dạng phân số tối giản).',
      answer: [-1, 6],
      simplest: true,
      hints: ['Nhân tử với tử, mẫu với mẫu.', 'Có thể rút gọn $4$ với $8$ và $-3$ với $9$ trước.'],
      solution:
        '$\\frac{4}{9} \\cdot \\frac{-3}{8} = \\frac{4 \\cdot (-3)}{9 \\cdot 8} = \\frac{-12}{72} = \\frac{-1}{6}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $(-6) \\cdot \\frac{5}{9}$ (viết kết quả dạng phân số tối giản).',
      answer: [-10, 3],
      simplest: true,
      hints: ['Nhân số nguyên với tử, giữ nguyên mẫu.'],
      solution: '$(-6) \\cdot \\frac{5}{9} = \\frac{-30}{9} = \\frac{-10}{3}$.',
    },
    {
      type: 'choice',
      prompt: 'Phân số nghịch đảo của $\\frac{-5}{7}$ là',
      options: ['$\\frac{-7}{5}$', '$\\frac{7}{5}$', '$\\frac{5}{7}$', '$\\frac{-5}{7}$'],
      answer: 0,
      hints: ['Tích của hai số nghịch đảo phải bằng $1$, nên chúng cùng dấu.'],
      solution:
        '$\\frac{-5}{7} \\cdot \\frac{-7}{5} = \\frac{35}{35} = 1$. Phân số $\\frac{5}{7}$ là số đối, không phải nghịch đảo; $\\frac{7}{5}$ cho tích bằng $-1$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\frac{-2}{3} : \\frac{4}{9}$.',
      answer: [-3, 2],
      simplest: true,
      hints: ['Nhân $\\frac{-2}{3}$ với nghịch đảo của $\\frac{4}{9}$.'],
      solution: '$\\frac{-2}{3} \\cdot \\frac{9}{4} = \\frac{-18}{12} = \\frac{-3}{2}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $5 : \\frac{10}{3}$.',
      answer: [3, 2],
      simplest: true,
      hints: ['$5 : \\frac{10}{3} = 5 \\cdot \\frac{3}{10}$.'],
      solution: '$5 \\cdot \\frac{3}{10} = \\frac{15}{10} = \\frac{3}{2}$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các cặp số nghịch đảo của nhau.',
      options: [
        '$\\frac{2}{3}$ và $\\frac{3}{2}$',
        '$\\frac{-1}{4}$ và $-4$',
        '$\\frac{5}{6}$ và $\\frac{-6}{5}$',
        '$1$ và $1$',
      ],
      answers: [0, 1, 3],
      hints: ['Tính tích từng cặp; cặp nghịch đảo có tích bằng $1$.'],
      solution:
        '$\\frac{2}{3} \\cdot \\frac{3}{2} = 1$; $\\frac{-1}{4} \\cdot (-4) = 1$; $1 \\cdot 1 = 1$. Còn $\\frac{5}{6} \\cdot \\frac{-6}{5} = -1$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính nhanh $\\frac{7}{11} \\cdot \\frac{3}{5} + \\frac{7}{11} \\cdot \\frac{2}{5}$.',
      answer: [7, 11],
      hints: ['Đặt $\\frac{7}{11}$ làm thừa số chung.'],
      solution:
        '$\\frac{7}{11} \\cdot \\left(\\frac{3}{5} + \\frac{2}{5}\\right) = \\frac{7}{11} \\cdot 1 = \\frac{7}{11}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một mảnh vườn hình chữ nhật có chiều dài $\\frac{15}{4}$ m và chiều rộng $\\frac{2}{3}$ m. Diện tích mảnh vườn là bao nhiêu mét vuông?',
      answer: [5, 2],
      hints: ['Diện tích bằng chiều dài nhân chiều rộng.'],
      solution: '$\\frac{15}{4} \\cdot \\frac{2}{3} = \\frac{30}{12} = \\frac{5}{2}$ m².',
    },
    {
      type: 'number',
      prompt:
        'Có $\\frac{3}{4}$ lít nước mắm, rót đầy vào các chai loại $\\frac{1}{8}$ lít. Được bao nhiêu chai?',
      answer: 6,
      hints: ['Số chai là $\\frac{3}{4} : \\frac{1}{8}$.'],
      solution: '$\\frac{3}{4} : \\frac{1}{8} = \\frac{3}{4} \\cdot 8 = 6$ chai.',
    },
    {
      type: 'fraction',
      prompt: 'Tìm $x$, biết $x \\cdot \\frac{2}{5} = \\frac{-4}{15}$.',
      answer: [-2, 3],
      hints: ['$x$ bằng tích chia cho thừa số đã biết: $x = \\frac{-4}{15} : \\frac{2}{5}$.'],
      solution: '$x = \\frac{-4}{15} \\cdot \\frac{5}{2} = \\frac{-20}{30} = \\frac{-2}{3}$.',
    },
  ],
  takeaways: [
    '$\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}$; $a \\cdot \\frac{b}{c} = \\frac{a \\cdot b}{c}$.',
    'Phép nhân phân số có tính giao hoán, kết hợp, nhân với $1$ và phân phối đối với phép cộng, phép trừ.',
    'Nghịch đảo của $\\frac{a}{b}$ ($a \\ne 0$) là $\\frac{b}{a}$; tích của chúng bằng $1$.',
    '$\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}$ với $\\frac{c}{d} \\ne 0$.',
  ],
};
