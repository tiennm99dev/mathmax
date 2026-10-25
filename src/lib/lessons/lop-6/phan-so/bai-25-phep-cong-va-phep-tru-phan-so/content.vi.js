/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Cộng hai phân số cùng mẫu và khác mẫu, tính chất của phép cộng phân số, số đối của một phân số, phép trừ phân số và quy tắc dấu ngoặc.',
  intro:
    'Một vòi nước chảy mỗi giờ được $\\frac{1}{4}$ bể, vòi thứ hai chảy mỗi giờ được $\\frac{1}{6}$ bể. Mở cả hai vòi thì mỗi giờ được bao nhiêu phần bể? Để cộng hai phân số khác mẫu, ta cắt cả hai "chiếc bánh" thành những phần bằng nhau, tức là quy đồng mẫu, rồi mới gộp lại.',
  objectives: [
    'Cộng, trừ hai phân số cùng mẫu và khác mẫu.',
    'Tìm số đối của một phân số; hiểu phép trừ là cộng với số đối.',
    'Vận dụng tính chất của phép cộng và quy tắc dấu ngoặc để tính nhanh.',
  ],
  sections: [
    {
      heading: 'Phép cộng hai phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cộng hai phân số cùng mẫu',
          text: 'Muốn cộng hai phân số cùng mẫu, ta cộng các tử và giữ nguyên mẫu: $\\frac{a}{m} + \\frac{b}{m} = \\frac{a + b}{m}$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cộng hai phân số khác mẫu',
          text: 'Muốn cộng hai phân số không cùng mẫu, ta quy đồng mẫu những phân số đó rồi cộng các tử và giữ nguyên mẫu chung.',
        },
        {
          type: 'p',
          text: 'Ở phần mở đầu: $\\frac{1}{4} + \\frac{1}{6} = \\frac{3}{12} + \\frac{2}{12} = \\frac{5}{12}$ bể. Nên rút gọn các phân số (nếu được) trước khi cộng, và rút gọn kết quả về phân số tối giản.',
        },
        {
          type: 'p',
          text: 'Giống phép cộng số nguyên, phép cộng phân số có các tính chất:',
        },
        {
          type: 'list',
          items: [
            'giao hoán: $\\frac{a}{b} + \\frac{c}{d} = \\frac{c}{d} + \\frac{a}{b}$;',
            'kết hợp: $\\left(\\frac{a}{b} + \\frac{c}{d}\\right) + \\frac{p}{q} = \\frac{a}{b} + \\left(\\frac{c}{d} + \\frac{p}{q}\\right)$;',
            'cộng với số $0$: $\\frac{a}{b} + 0 = 0 + \\frac{a}{b} = \\frac{a}{b}$.',
          ],
        },
      ],
    },
    {
      heading: 'Số đối của một phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai số đối nhau',
          text: 'Hai phân số được gọi là đối nhau nếu tổng của chúng bằng $0$. Số đối của phân số $\\frac{a}{b}$ kí hiệu là $-\\frac{a}{b}$, và $\\frac{a}{b} + \\left(-\\frac{a}{b}\\right) = 0$.',
        },
        { type: 'tex', tex: '-\\frac{a}{b} = \\frac{-a}{b} = \\frac{a}{-b}' },
        {
          type: 'p',
          text: 'Chẳng hạn số đối của $\\frac{3}{5}$ là $-\\frac{3}{5} = \\frac{-3}{5}$; số đối của $\\frac{-2}{7}$ là $\\frac{2}{7}$, vì $\\frac{-2}{7} + \\frac{2}{7} = 0$. Trên trục số, hai số đối nhau nằm về hai phía của điểm $0$ và cách đều điểm $0$.',
        },
      ],
    },
    {
      heading: 'Phép trừ hai phân số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc trừ',
          text: 'Muốn trừ hai phân số cùng mẫu, ta trừ tử của số bị trừ cho tử của số trừ và giữ nguyên mẫu: $\\frac{a}{m} - \\frac{b}{m} = \\frac{a - b}{m}$. Muốn trừ một phân số cho một phân số, ta cộng số bị trừ với số đối của số trừ:',
        },
        {
          type: 'tex',
          tex: '\\frac{a}{b} - \\frac{c}{d} = \\frac{a}{b} + \\left(-\\frac{c}{d}\\right)',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Quy tắc dấu ngoặc',
          text: 'Quy tắc dấu ngoặc đối với phân số giống như đối với số nguyên: bỏ ngoặc có dấu "$+$" đằng trước thì giữ nguyên dấu các số hạng; bỏ ngoặc có dấu "$-$" đằng trước thì đổi dấu tất cả các số hạng trong ngoặc.',
        },
        {
          type: 'p',
          text: 'Ví dụ: $\\frac{7}{12} - \\left(\\frac{7}{12} - \\frac{2}{5}\\right) = \\frac{7}{12} - \\frac{7}{12} + \\frac{2}{5} = \\frac{2}{5}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Quy đồng bằng lưới ô vuông',
    instruction:
      'Chọn hai phân số và phép tính. Phân số thứ nhất tô theo cột, phân số thứ hai tô theo hàng. Bấm "Chia lưới cùng cỡ" để cả hai hình được chia thành các ô bằng nhau (quy đồng mẫu), rồi bấm "Gộp phần tô" (hoặc "Bớt phần tô") để đếm số ô của kết quả.',
  },
  examples: [
    {
      problem: 'Tính $\\frac{-3}{5} + \\frac{1}{5}$.',
      steps: [
        'Hai phân số cùng mẫu $5$: cộng các tử, giữ nguyên mẫu.',
        '$\\frac{-3}{5} + \\frac{1}{5} = \\frac{-3 + 1}{5}$.',
      ],
      answer: '$\\frac{-3}{5} + \\frac{1}{5} = \\frac{-2}{5}$.',
    },
    {
      problem: 'Tính $\\frac{5}{6} + \\frac{-3}{4}$.',
      steps: [
        'Mẫu chung BCNN$(6, 4) = 12$.',
        '$\\frac{5}{6} = \\frac{10}{12}$, $\\frac{-3}{4} = \\frac{-9}{12}$.',
        '$\\frac{10}{12} + \\frac{-9}{12} = \\frac{10 + (-9)}{12}$.',
      ],
      answer: '$\\frac{5}{6} + \\frac{-3}{4} = \\frac{1}{12}$.',
    },
    {
      problem: 'Tính $\\frac{3}{5} - \\left(-\\frac{1}{3}\\right)$.',
      steps: [
        'Trừ là cộng với số đối: số đối của $-\\frac{1}{3}$ là $\\frac{1}{3}$.',
        '$\\frac{3}{5} + \\frac{1}{3} = \\frac{9}{15} + \\frac{5}{15}$.',
      ],
      answer: '$\\frac{3}{5} - \\left(-\\frac{1}{3}\\right) = \\frac{14}{15}$.',
    },
    {
      problem:
        'Tính nhanh $\\left(\\frac{5}{7} - \\frac{2}{9}\\right) - \\left(\\frac{5}{7} + \\frac{7}{9}\\right)$.',
      steps: [
        'Bỏ ngoặc: $\\frac{5}{7} - \\frac{2}{9} - \\frac{5}{7} - \\frac{7}{9}$.',
        'Nhóm: $\\left(\\frac{5}{7} - \\frac{5}{7}\\right) - \\left(\\frac{2}{9} + \\frac{7}{9}\\right) = 0 - \\frac{9}{9}$.',
      ],
      answer: 'Kết quả bằng $-1$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt: 'Tính $\\frac{-5}{8} + \\frac{3}{8}$ (viết kết quả dạng phân số tối giản).',
      answer: [-1, 4],
      simplest: true,
      hints: ['Cùng mẫu: cộng các tử, giữ nguyên mẫu.', 'Rút gọn kết quả.'],
      solution: '$\\frac{-5}{8} + \\frac{3}{8} = \\frac{-2}{8} = \\frac{-1}{4}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\frac{2}{3} + \\frac{-1}{4}$.',
      answer: [5, 12],
      simplest: true,
      hints: ['Mẫu chung BCNN$(3, 4) = 12$.'],
      solution: '$\\frac{2}{3} + \\frac{-1}{4} = \\frac{8}{12} + \\frac{-3}{12} = \\frac{5}{12}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\frac{5}{6} - \\frac{7}{9}$.',
      answer: [1, 18],
      simplest: true,
      hints: ['Mẫu chung BCNN$(6, 9) = 18$.'],
      solution: '$\\frac{5}{6} - \\frac{7}{9} = \\frac{15}{18} - \\frac{14}{18} = \\frac{1}{18}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\frac{-1}{2} - \\frac{3}{10}$ (viết kết quả dạng phân số tối giản).',
      answer: [-4, 5],
      simplest: true,
      hints: ['Mẫu chung là $10$.', 'Trừ là cộng với số đối: $\\frac{-5}{10} + \\frac{-3}{10}$.'],
      solution:
        '$\\frac{-1}{2} - \\frac{3}{10} = \\frac{-5}{10} + \\frac{-3}{10} = \\frac{-8}{10} = \\frac{-4}{5}$.',
    },
    {
      type: 'choice',
      prompt: 'Số đối của phân số $\\frac{-4}{7}$ là',
      options: ['$\\frac{4}{7}$', '$\\frac{-7}{4}$', '$\\frac{7}{4}$', '$\\frac{-4}{7}$'],
      answer: 0,
      hints: ['Số đối cộng với $\\frac{-4}{7}$ phải bằng $0$.'],
      solution:
        '$\\frac{-4}{7} + \\frac{4}{7} = 0$, nên số đối là $\\frac{4}{7}$. Đừng nhầm số đối với phân số đảo ngược tử và mẫu.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các cách viết số đối của $\\frac{3}{5}$.',
      options: [
        '$-\\frac{3}{5}$',
        '$\\frac{-3}{5}$',
        '$\\frac{3}{-5}$',
        '$\\frac{-3}{-5}$',
        '$\\frac{5}{3}$',
      ],
      answers: [0, 1, 2],
      hints: ['$-\\frac{a}{b} = \\frac{-a}{b} = \\frac{a}{-b}$.'],
      solution:
        '$-\\frac{3}{5} = \\frac{-3}{5} = \\frac{3}{-5}$ đều là số đối của $\\frac{3}{5}$. Còn $\\frac{-3}{-5} = \\frac{3}{5}$ và $\\frac{5}{3}$ không phải số đối.',
    },
    {
      type: 'fraction',
      prompt: 'Tính nhanh $\\frac{-3}{11} + \\frac{5}{7} + \\frac{3}{11}$.',
      answer: [5, 7],
      hints: ['Đổi chỗ để nhóm hai số đối nhau.'],
      solution:
        '$\\frac{-3}{11} + \\frac{5}{7} + \\frac{3}{11} = \\left(\\frac{-3}{11} + \\frac{3}{11}\\right) + \\frac{5}{7} = 0 + \\frac{5}{7} = \\frac{5}{7}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\frac{7}{12} - \\left(\\frac{7}{12} - \\frac{2}{5}\\right)$.',
      answer: [2, 5],
      hints: ['Bỏ ngoặc có dấu "$-$" đằng trước: đổi dấu các số hạng trong ngoặc.'],
      solution: '$\\frac{7}{12} - \\frac{7}{12} + \\frac{2}{5} = 0 + \\frac{2}{5} = \\frac{2}{5}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Vòi thứ nhất mỗi giờ chảy được $\\frac{1}{4}$ bể, vòi thứ hai mỗi giờ chảy được $\\frac{1}{6}$ bể. Mở cả hai vòi thì mỗi giờ chảy được bao nhiêu phần bể?',
      answer: [5, 12],
      hints: ['Cộng hai phân số $\\frac{1}{4} + \\frac{1}{6}$.', 'Mẫu chung BCNN$(4, 6) = 12$.'],
      solution: '$\\frac{1}{4} + \\frac{1}{6} = \\frac{3}{12} + \\frac{2}{12} = \\frac{5}{12}$ bể.',
    },
    {
      type: 'fraction',
      prompt: 'Tìm $x$, biết $x + \\frac{1}{3} = \\frac{3}{4}$.',
      answer: [5, 12],
      hints: ['$x$ là hiệu $\\frac{3}{4} - \\frac{1}{3}$.', 'Mẫu chung là $12$.'],
      solution:
        '$x = \\frac{3}{4} - \\frac{1}{3} = \\frac{9}{12} - \\frac{4}{12} = \\frac{5}{12}$.',
    },
  ],
  takeaways: [
    'Cùng mẫu: $\\frac{a}{m} \\pm \\frac{b}{m} = \\frac{a \\pm b}{m}$; khác mẫu thì quy đồng trước.',
    'Số đối của $\\frac{a}{b}$ là $-\\frac{a}{b} = \\frac{-a}{b} = \\frac{a}{-b}$; tổng hai số đối bằng $0$.',
    'Trừ là cộng với số đối: $\\frac{a}{b} - \\frac{c}{d} = \\frac{a}{b} + \\left(-\\frac{c}{d}\\right)$.',
    'Phép cộng phân số có tính giao hoán, kết hợp; quy tắc dấu ngoặc như với số nguyên.',
  ],
};
