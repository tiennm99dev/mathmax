/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép cộng và phép trừ số tự nhiên: tính chất giao hoán, kết hợp, cộng với số 0, điều kiện để thực hiện phép trừ, tìm số chưa biết và tính nhẩm hợp lí.',
  intro:
    'Một thư viện có $2\\,750$ cuốn sách, nhận thêm $1\\,250$ cuốn rồi cho mượn $800$ cuốn. Còn bao nhiêu cuốn trên giá? Phép cộng và phép trừ trả lời câu hỏi đó, và các tính chất của chúng giúp em tính nhanh hơn nhiều.',
  objectives: [
    'Thực hiện phép cộng, phép trừ số tự nhiên và gọi đúng tên các thành phần.',
    'Vận dụng tính chất giao hoán, kết hợp của phép cộng để tính nhẩm, tính hợp lí.',
    'Biết điều kiện để phép trừ thực hiện được trong $\\mathbb{N}$ và tìm số chưa biết trong phép cộng, phép trừ.',
  ],
  sections: [
    {
      heading: 'Phép cộng số tự nhiên',
      blocks: [
        { type: 'tex', tex: 'a + b = c' },
        {
          type: 'p',
          text: 'Trong phép cộng $a + b = c$, các số $a$ và $b$ là các số hạng, $c$ là tổng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính chất của phép cộng',
          text: 'Giao hoán: $a + b = b + a$. Kết hợp: $(a + b) + c = a + (b + c)$. Cộng với số $0$: $a + 0 = 0 + a = a$.',
        },
        {
          type: 'p',
          text: 'Nhờ tính chất kết hợp, ta viết gọn $a + b + c$ mà không cần dấu ngoặc. Nhờ cả hai tính chất, khi cộng nhiều số ta được đổi chỗ và nhóm các số hạng tuỳ ý.',
        },
      ],
    },
    {
      heading: 'Phép trừ số tự nhiên',
      blocks: [
        {
          type: 'p',
          text: 'Với hai số tự nhiên $a$ và $b$ đã cho, nếu có số tự nhiên $c$ sao cho $b + c = a$ thì ta có phép trừ $a - b = c$.',
        },
        { type: 'tex', tex: 'a - b = c' },
        {
          type: 'p',
          text: 'Trong phép trừ $a - b = c$, $a$ là số bị trừ, $b$ là số trừ, $c$ là hiệu.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Điều kiện thực hiện phép trừ',
          text: 'Phép trừ $a - b$ chỉ thực hiện được trong tập hợp số tự nhiên khi số bị trừ lớn hơn hoặc bằng số trừ: $a \\ge b$. Chẳng hạn $3 - 5$ không có kết quả là số tự nhiên.',
        },
        {
          type: 'list',
          items: [
            'Nếu $a - b = c$ thì $a = b + c$ và $b = a - c$.',
            'Nếu $a + b = c$ thì $a = c - b$ và $b = c - a$.',
          ],
        },
        {
          type: 'p',
          text: 'Hai quy tắc trên giúp tìm số chưa biết. Ví dụ: $x + 37 = 105$ nên $x = 105 - 37 = 68$.',
        },
      ],
    },
    {
      heading: 'Tính nhẩm hợp lí',
      blocks: [
        {
          type: 'list',
          items: [
            'Nhóm các số hạng có tổng tròn chục, tròn trăm: $46 + 17 + 54 = (46 + 54) + 17 = 100 + 17 = 117$.',
            'Thêm vào số hạng này, bớt đi ở số hạng kia cùng một số: $97 + 19 = (97 + 3) + (19 - 3) = 100 + 16 = 116$.',
            'Cộng cùng một số vào cả số bị trừ và số trừ thì hiệu không đổi: $135 - 98 = (135 + 2) - (98 + 2) = 137 - 100 = 37$.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bước nhảy trên tia số',
    instruction:
      'Chọn phép tính rồi kéo hai thanh trượt $a$, $b$. Phép cộng là bước nhảy sang phải, phép trừ là bước nhảy sang trái. Chọn "a + b và b + a" để thấy tính chất giao hoán; với phép trừ, thử cho $b > a$ để thấy bước nhảy rơi khỏi tia số.',
  },
  examples: [
    {
      problem: 'Tính một cách hợp lí: $285 + 470 + 115 + 230$.',
      steps: [
        'Đổi chỗ và nhóm các số hạng có tổng tròn trăm: $(285 + 115) + (470 + 230)$.',
        '$285 + 115 = 400$; $\\ 470 + 230 = 700$.',
        '$400 + 700 = 1\\,100$.',
      ],
      answer: '$1\\,100$.',
    },
    {
      problem: 'Tìm số tự nhiên $x$, biết $x - 280 = 150$.',
      steps: [
        '$x$ là số bị trừ; số bị trừ bằng hiệu cộng số trừ.',
        '$x = 150 + 280 = 430$.',
        'Thử lại: $430 - 280 = 150$.',
      ],
      answer: '$x = 430$.',
    },
    {
      problem: 'Tính nhẩm: $2\\,018 - 999$.',
      steps: [
        'Cộng $1$ vào cả số bị trừ và số trừ, hiệu không đổi.',
        '$2\\,018 - 999 = 2\\,019 - 1\\,000$.',
        '$2\\,019 - 1\\,000 = 1\\,019$.',
      ],
      answer: '$1\\,019$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính một cách hợp lí: $135 + 360 + 65 + 40$.',
      answer: 600,
      hints: ['Tìm các cặp số hạng có tổng tròn trăm.', '$135 + 65$ và $360 + 40$.'],
      solution: '$(135 + 65) + (360 + 40) = 200 + 400 = 600$.',
    },
    {
      type: 'number',
      prompt: 'Tính một cách hợp lí: $463 + 318 + 137 + 22$.',
      answer: 940,
      hints: ['$463 + 137$ có tổng tròn trăm.'],
      solution: '$(463 + 137) + (318 + 22) = 600 + 340 = 940$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số tự nhiên $x$, biết $x + 37 = 105$.',
      answer: 68,
      hints: ['$x$ là một số hạng; số hạng bằng tổng trừ số hạng kia.'],
      solution: '$x = 105 - 37 = 68$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số tự nhiên $x$, biết $124 - x = 59$.',
      answer: 65,
      hints: ['$x$ là số trừ; số trừ bằng số bị trừ trừ hiệu.'],
      solution: '$x = 124 - 59 = 65$. Thử lại: $124 - 65 = 59$.',
    },
    {
      type: 'choice',
      prompt: 'Phép trừ nào không thực hiện được trong tập hợp số tự nhiên?',
      options: ['$25 - 25$', '$30 - 0$', '$17 - 21$', '$100 - 99$'],
      answer: 2,
      hints: ['Phép trừ $a - b$ thực hiện được khi $a \\ge b$.'],
      solution:
        '$17 < 21$ nên $17 - 21$ không thực hiện được trong $\\mathbb{N}$. Các phép còn lại cho $0$, $30$ và $1$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhẩm: $997 + 58$.',
      answer: 1055,
      hints: ['Thêm $3$ vào $997$ để được $1\\,000$, rồi bớt $3$ ở $58$.'],
      solution: '$997 + 58 = (997 + 3) + (58 - 3) = 1\\,000 + 55 = 1\\,055$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhẩm: $321 - 96$.',
      answer: 225,
      hints: ['Cộng $4$ vào cả số bị trừ và số trừ.'],
      solution: '$321 - 96 = (321 + 4) - (96 + 4) = 325 - 100 = 225$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đẳng thức với tính chất của phép cộng mà nó thể hiện.',
      left: ['$a + b = b + a$', '$(a + b) + c = a + (b + c)$', '$a + 0 = a$'],
      right: ['Tính chất kết hợp', 'Cộng với số $0$', 'Tính chất giao hoán'],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 1],
      ],
      hints: ['"Giao hoán" là đổi chỗ, "kết hợp" là đổi cách nhóm.'],
      solution:
        '$a + b = b + a$: giao hoán; $(a + b) + c = a + (b + c)$: kết hợp; $a + 0 = a$: cộng với số $0$.',
    },
    {
      type: 'number',
      prompt:
        'Một cửa hàng có $1\\,250$ kg gạo. Buổi sáng bán được $386$ kg, buổi chiều bán được $414$ kg. Cửa hàng còn lại bao nhiêu ki-lô-gam gạo?',
      answer: 450,
      unit: 'kg',
      hints: ['Tính tổng số gạo đã bán trước.', '$386 + 414$ là một số tròn trăm.'],
      solution: 'Đã bán $386 + 414 = 800$ (kg). Còn lại $1\\,250 - 800 = 450$ (kg).',
    },
  ],
  takeaways: [
    'Phép cộng có tính chất giao hoán $a + b = b + a$, kết hợp $(a + b) + c = a + (b + c)$ và $a + 0 = a$.',
    'Phép trừ $a - b$ thực hiện được trong $\\mathbb{N}$ khi và chỉ khi $a \\ge b$.',
    'Nếu $a - b = c$ thì $a = b + c$ và $b = a - c$; dùng điều này để tìm số chưa biết và thử lại.',
    'Tính nhẩm: nhóm số tròn chục, tròn trăm; thêm ở số này bớt ở số kia; cộng cùng một số vào số bị trừ và số trừ.',
  ],
};
