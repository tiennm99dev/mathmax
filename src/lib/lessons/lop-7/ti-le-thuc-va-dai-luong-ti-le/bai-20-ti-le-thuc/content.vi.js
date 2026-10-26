/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tỉ lệ thức là đẳng thức của hai tỉ số. Trong một tỉ lệ thức, tích hai ngoại tỉ bằng tích hai trung tỉ; từ đó lập được các tỉ lệ thức khác và tìm được số hạng chưa biết.',
  intro:
    'Lá cờ thứ nhất rộng $6$ dm, dài $9$ dm; lá cờ thứ hai rộng $0{,}8$ m, dài $1{,}2$ m. Tỉ số giữa chiều rộng và chiều dài của hai lá cờ là $6 : 9 = \\frac{2}{3}$ và $0{,}8 : 1{,}2 = \\frac{2}{3}$. Hai tỉ số bằng nhau, nên hai lá cờ có cùng hình dạng dù to nhỏ khác nhau. Đẳng thức $6 : 9 = 0{,}8 : 1{,}2$ là một tỉ lệ thức.',
  objectives: [
    'Nhận biết tỉ lệ thức và các số hạng của nó: ngoại tỉ, trung tỉ.',
    'Vận dụng tính chất: trong tỉ lệ thức, tích hai ngoại tỉ bằng tích hai trung tỉ.',
    'Lập các tỉ lệ thức từ một đẳng thức tích.',
    'Tìm một số hạng chưa biết của tỉ lệ thức.',
  ],
  sections: [
    {
      heading: 'Tỉ lệ thức',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Tỉ lệ thức là đẳng thức của hai tỉ số $\\frac{a}{b} = \\frac{c}{d}$. Tỉ lệ thức $\\frac{a}{b} = \\frac{c}{d}$ còn được viết là $a : b = c : d$.',
        },
        {
          type: 'p',
          text: 'Các số $a$, $b$, $c$, $d$ là các số hạng của tỉ lệ thức: $a$ và $d$ là các số hạng ngoài hay ngoại tỉ; $b$ và $c$ là các số hạng trong hay trung tỉ.',
        },
        {
          type: 'tex',
          tex: '\\underbrace{a}_{\\text{ngoại tỉ}} : \\underbrace{b}_{\\text{trung tỉ}} = \\underbrace{c}_{\\text{trung tỉ}} : \\underbrace{d}_{\\text{ngoại tỉ}}',
        },
        {
          type: 'p',
          text: 'Muốn biết hai tỉ số có lập thành tỉ lệ thức hay không, ta rút gọn (hoặc tính) từng tỉ số rồi so sánh. Chẳng hạn $1{,}2 : 3{,}6 = \\frac{12}{36} = \\frac{1}{3}$ và $5 : 15 = \\frac{1}{3}$, nên $1{,}2 : 3{,}6 = 5 : 15$ là một tỉ lệ thức.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Tỉ lệ thức không chỉ là đẳng thức của hai phân số: các số hạng $a$, $b$, $c$, $d$ có thể là số hữu tỉ bất kì (với $b \\ne 0$, $d \\ne 0$), như $0{,}8 : 1{,}2$ hay $\\frac{2}{3} : 2$.',
        },
      ],
    },
    {
      heading: 'Tính chất của tỉ lệ thức',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất 1',
          text: 'Nếu $\\frac{a}{b} = \\frac{c}{d}$ thì $ad = bc$. Trong một tỉ lệ thức, tích hai ngoại tỉ bằng tích hai trung tỉ.',
        },
        {
          type: 'p',
          text: 'Thật vậy, nhân cả hai vế của $\\frac{a}{b} = \\frac{c}{d}$ với $bd$ ta được $\\frac{a}{b} \\cdot bd = \\frac{c}{d} \\cdot bd$, tức là $ad = bc$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất 2',
          text: 'Nếu $ad = bc$ và $a$, $b$, $c$, $d$ đều khác $0$ thì ta có các tỉ lệ thức: $\\frac{a}{b} = \\frac{c}{d}$; $\\;\\frac{a}{c} = \\frac{b}{d}$; $\\;\\frac{d}{b} = \\frac{c}{a}$; $\\;\\frac{d}{c} = \\frac{b}{a}$.',
        },
        {
          type: 'table',
          caption: 'Bốn tỉ lệ thức lập từ đẳng thức $2 \\cdot 15 = 6 \\cdot 5$',
          head: ['Tỉ lệ thức', 'Giá trị mỗi tỉ số'],
          rows: [
            ['$\\frac{2}{6} = \\frac{5}{15}$', '$\\frac{1}{3}$'],
            ['$\\frac{2}{5} = \\frac{6}{15}$', '$0{,}4$'],
            ['$\\frac{15}{6} = \\frac{5}{2}$', '$2{,}5$'],
            ['$\\frac{15}{5} = \\frac{6}{2}$', '$3$'],
          ],
        },
        {
          type: 'p',
          text: 'Mẹo nhớ: giữ nguyên các ngoại tỉ và đổi chỗ hai trung tỉ, hoặc giữ nguyên các trung tỉ và đổi chỗ hai ngoại tỉ, ta vẫn được một tỉ lệ thức.',
        },
      ],
    },
    {
      heading: 'Tìm số hạng chưa biết',
      blocks: [
        {
          type: 'p',
          text: 'Từ $ad = bc$, khi biết ba số hạng ta tìm được số hạng thứ tư:',
        },
        {
          type: 'tex',
          tex: 'a = \\frac{bc}{d}, \\qquad d = \\frac{bc}{a}, \\qquad b = \\frac{ad}{c}, \\qquad c = \\frac{ad}{b}',
        },
        {
          type: 'list',
          items: [
            'Muốn tìm một ngoại tỉ, ta lấy tích hai trung tỉ chia cho ngoại tỉ đã biết.',
            'Muốn tìm một trung tỉ, ta lấy tích hai ngoại tỉ chia cho trung tỉ đã biết.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bốn ô của tỉ lệ thức',
    instruction:
      'Nhập ba số vào các ô của $\\frac{a}{b} = \\frac{c}{d}$ và để trống một ô: tự tính số còn thiếu rồi kiểm tra, hoặc xem cách tính bằng tích chéo. Nhập đủ bốn số để xem tích ngoại tỉ và tích trung tỉ có bằng nhau không.',
  },
  examples: [
    {
      problem:
        'Từ các tỉ số sau có lập được tỉ lệ thức không? a) $3{,}5 : 10{,}5$ và $\\frac{2}{3} : 2$; b) $0{,}6 : 1{,}5$ và $4 : 9$.',
      steps: [
        'a) $3{,}5 : 10{,}5 = \\frac{35}{105} = \\frac{1}{3}$ và $\\frac{2}{3} : 2 = \\frac{2}{3} \\cdot \\frac{1}{2} = \\frac{1}{3}$.',
        'Hai tỉ số bằng nhau nên lập được tỉ lệ thức $3{,}5 : 10{,}5 = \\frac{2}{3} : 2$.',
        'b) $0{,}6 : 1{,}5 = \\frac{6}{15} = \\frac{2}{5}$, còn $4 : 9 = \\frac{4}{9}$.',
        '$\\frac{2}{5} = \\frac{18}{45} \\ne \\frac{20}{45} = \\frac{4}{9}$, nên hai tỉ số này không lập thành tỉ lệ thức.',
      ],
      answer: 'a) Lập được tỉ lệ thức; b) Không lập được tỉ lệ thức.',
    },
    {
      problem: 'Tìm $x$ trong tỉ lệ thức $\\frac{x}{-15} = \\frac{8}{12}$.',
      steps: [
        'Theo tính chất của tỉ lệ thức: $x \\cdot 12 = (-15) \\cdot 8$.',
        '$12x = -120$.',
        '$x = \\frac{-120}{12} = -10$.',
      ],
      answer: '$x = -10$.',
    },
    {
      problem: 'Lập tất cả các tỉ lệ thức có được từ đẳng thức $3 \\cdot (-20) = (-4) \\cdot 15$.',
      steps: [
        'Chọn $a = 3$, $d = -20$ (một vế) và $b = -4$, $c = 15$ (vế kia); bốn số đều khác $0$.',
        'Theo tính chất 2: $\\frac{3}{-4} = \\frac{15}{-20}$; $\\;\\frac{3}{15} = \\frac{-4}{-20}$.',
        'Đổi chỗ hai ngoại tỉ: $\\frac{-20}{-4} = \\frac{15}{3}$; $\\;\\frac{-20}{15} = \\frac{-4}{3}$.',
        'Kiểm tra: các cặp tỉ số lần lượt bằng $-0{,}75$; $0{,}2$; $5$ và $-\\frac{4}{3}$.',
      ],
      answer:
        '$\\frac{3}{-4} = \\frac{15}{-20}$; $\\frac{3}{15} = \\frac{-4}{-20}$; $\\frac{-20}{-4} = \\frac{15}{3}$; $\\frac{-20}{15} = \\frac{-4}{3}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong tỉ lệ thức $3 : 7 = 15 : 35$, các ngoại tỉ là',
      options: ['$3$ và $35$', '$7$ và $15$', '$3$ và $15$', '$7$ và $35$'],
      answer: 0,
      hints: ['Ngoại tỉ là hai số hạng đứng ở ngoài cùng: số đầu tiên và số cuối cùng.'],
      solution:
        'Trong $a : b = c : d$, ngoại tỉ là $a$ và $d$. Ở đây $a = 3$, $d = 35$; các trung tỉ là $7$ và $15$.',
    },
    {
      type: 'choice',
      prompt: 'Cặp tỉ số nào sau đây lập thành một tỉ lệ thức?',
      options: [
        '$0{,}5 : 2$ và $3 : 8$',
        '$12 : 18$ và $2 : 3$',
        '$\\frac{1}{2} : 3$ và $2 : 6$',
        '$4 : 10$ và $6 : 16$',
      ],
      answer: 1,
      hints: [
        'Rút gọn từng tỉ số rồi so sánh.',
        'Có thể viết mỗi tỉ số thành phân số tối giản hoặc số thập phân.',
      ],
      solution:
        '$12 : 18 = \\frac{2}{3}$ nên $12 : 18 = 2 : 3$. Các cặp còn lại: $0{,}5 : 2 = 0{,}25 \\ne 0{,}375 = 3 : 8$; $\\frac{1}{2} : 3 = \\frac{1}{6} \\ne \\frac{1}{3} = 2 : 6$; $4 : 10 = 0{,}4 \\ne 0{,}375 = 6 : 16$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $x$, biết $x : 6 = 10 : 4$.',
      answer: 15,
      hints: [
        '$x$ là một ngoại tỉ.',
        'Ngoại tỉ chưa biết bằng tích hai trung tỉ chia cho ngoại tỉ đã biết.',
      ],
      solution: 'Ta có $4x = 6 \\cdot 10 = 60$, nên $x = 60 : 4 = 15$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $x$, biết $2{,}5 : x = 7{,}5 : 6$.',
      answer: 2,
      hints: [
        '$x$ là một trung tỉ.',
        'Trung tỉ chưa biết bằng tích hai ngoại tỉ chia cho trung tỉ đã biết.',
      ],
      solution: 'Ta có $7{,}5 \\cdot x = 2{,}5 \\cdot 6 = 15$, nên $x = 15 : 7{,}5 = 2$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $x$, biết $\\frac{4}{x} = \\frac{-12}{27}$.',
      answer: -9,
      hints: ['Viết tích chéo: $4 \\cdot 27 = x \\cdot (-12)$.'],
      solution: 'Ta có $-12x = 4 \\cdot 27 = 108$, nên $x = 108 : (-12) = -9$.',
    },
    {
      type: 'multi',
      prompt: 'Từ đẳng thức $2 \\cdot 9 = 3 \\cdot 6$, ta lập được những tỉ lệ thức nào sau đây?',
      options: [
        '$\\frac{2}{3} = \\frac{6}{9}$',
        '$\\frac{2}{6} = \\frac{9}{3}$',
        '$\\frac{9}{6} = \\frac{3}{2}$',
        '$\\frac{3}{2} = \\frac{6}{9}$',
        '$\\frac{2}{6} = \\frac{3}{9}$',
      ],
      answers: [0, 2, 4],
      hints: [
        'Hai số $2$ và $9$ ở cùng một vế là hai ngoại tỉ; $3$ và $6$ là hai trung tỉ.',
        'Kiểm tra từng đẳng thức bằng cách nhân chéo.',
      ],
      solution:
        'Với ngoại tỉ $2$, $9$ và trung tỉ $3$, $6$ ta có $\\frac{2}{3} = \\frac{6}{9}$, $\\frac{2}{6} = \\frac{3}{9}$, $\\frac{9}{3} = \\frac{6}{2}$, $\\frac{9}{6} = \\frac{3}{2}$. Hai đẳng thức còn lại sai: $\\frac{2}{6} = \\frac{1}{3} \\ne 3 = \\frac{9}{3}$ và $\\frac{3}{2} = 1{,}5 \\ne \\frac{2}{3} = \\frac{6}{9}$.',
    },
    {
      type: 'number',
      prompt:
        'Tỉ số giữa chiều rộng và chiều dài của một lá cờ là $2 : 3$. Lá cờ dài $1{,}5$ m. Chiều rộng của lá cờ là bao nhiêu mét?',
      answer: 1,
      unit: 'm',
      hints: [
        'Gọi chiều rộng là $x$ (m), ta có tỉ lệ thức $x : 1{,}5 = 2 : 3$.',
        '$3x = 1{,}5 \\cdot 2$.',
      ],
      solution:
        'Từ $\\frac{x}{1{,}5} = \\frac{2}{3}$ ta có $3x = 1{,}5 \\cdot 2 = 3$, nên $x = 1$ m.',
    },
    {
      type: 'number',
      prompt: 'Tìm $x$, biết $\\frac{x - 1}{6} = \\frac{4}{3}$.',
      answer: 9,
      hints: [
        'Coi $x - 1$ là một số hạng chưa biết và tìm nó trước.',
        '$x - 1 = \\frac{6 \\cdot 4}{3}$.',
      ],
      solution: 'Ta có $3(x - 1) = 6 \\cdot 4 = 24$, nên $x - 1 = 8$, suy ra $x = 9$.',
    },
  ],
  takeaways: [
    'Tỉ lệ thức là đẳng thức của hai tỉ số: $\\frac{a}{b} = \\frac{c}{d}$ hay $a : b = c : d$.',
    '$a$, $d$ là ngoại tỉ; $b$, $c$ là trung tỉ.',
    'Tính chất 1: nếu $\\frac{a}{b} = \\frac{c}{d}$ thì $ad = bc$.',
    'Tính chất 2: nếu $ad = bc$ (các số đều khác $0$) thì lập được bốn tỉ lệ thức $\\frac{a}{b} = \\frac{c}{d}$, $\\frac{a}{c} = \\frac{b}{d}$, $\\frac{d}{b} = \\frac{c}{a}$, $\\frac{d}{c} = \\frac{b}{a}$.',
    'Tìm số hạng chưa biết: ngoại tỉ bằng tích trung tỉ chia ngoại tỉ kia; trung tỉ bằng tích ngoại tỉ chia trung tỉ kia.',
  ],
};
