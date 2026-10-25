/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép chia hết trong tập hợp số nguyên, quy tắc chia hai số nguyên cùng dấu và khác dấu, ước và bội của một số nguyên và cách tìm chúng.',
  intro:
    'Một tàu lặn bắt đầu lặn từ mặt nước và sau $8$ phút đến độ cao $-120$ m so với mực nước biển. Nếu tàu lặn đều, mỗi phút độ cao của tàu thay đổi bao nhiêu mét? Ta cần tìm số nguyên $q$ sao cho $8 \\cdot q = -120$, tức là chia một số nguyên âm cho một số nguyên dương. Bài này mở rộng phép chia hết, ước và bội từ số tự nhiên sang số nguyên.',
  objectives: [
    'Nhận biết phép chia hết trong tập hợp các số nguyên và chia hai số nguyên trong trường hợp chia hết.',
    'Nhận biết ước và bội của một số nguyên.',
    'Tìm các ước của một số nguyên và các bội của một số nguyên trong một phạm vi cho trước.',
  ],
  sections: [
    {
      heading: 'Phép chia hết hai số nguyên',
      blocks: [
        {
          type: 'p',
          text: 'Ta đã biết $3 \\cdot (-5) = -15$. Vì vậy, giống như với số tự nhiên, ta nói $-15$ chia cho $3$ được $-5$ và viết $(-15) : 3 = -5$; cũng có $(-15) : (-5) = 3$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phép chia hết',
          text: 'Cho $a, b \\in \\mathbb{Z}$ với $b \\ne 0$. Nếu có số nguyên $q$ sao cho $a = b \\cdot q$ thì ta có phép chia hết $a : b = q$, trong đó $a$ là số bị chia, $b$ là số chia và $q$ là thương. Khi đó ta nói $a$ chia hết cho $b$, kí hiệu $a \\vdots\\, b$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Chia hai số nguyên khác dấu',
          text: 'Muốn chia hai số nguyên khác dấu (trong trường hợp chia hết), ta chia hai phần số tự nhiên của chúng rồi đặt dấu "$-$" trước kết quả nhận được.',
        },
        { type: 'tex', tex: '135 : (-9) = -(135 : 9) = -15, \\qquad (-63) : 9 = -(63 : 9) = -7' },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Chia hai số nguyên cùng dấu',
          text: 'Muốn chia hai số nguyên âm (trong trường hợp chia hết), ta chia hai phần số tự nhiên của chúng với nhau: $(-a) : (-b) = a : b$ với $a, b \\in \\mathbb{N}$, $b \\ne 0$.',
        },
        { type: 'tex', tex: '(-135) : (-9) = 135 : 9 = 15' },
        {
          type: 'table',
          head: ['Dấu của $a$', 'Dấu của $b$', 'Dấu của $a : b$'],
          rows: [
            ['$+$', '$+$', '$+$'],
            ['$-$', '$-$', '$+$'],
            ['$+$', '$-$', '$-$'],
            ['$-$', '$+$', '$-$'],
          ],
          caption:
            'Quy tắc dấu của thương giống quy tắc dấu của tích: cùng dấu thì dương, khác dấu thì âm.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: '$0 : b = 0$ với mọi số nguyên $b \\ne 0$. Không có phép chia cho $0$. Thương $a : b$ có thể kiểm tra lại bằng phép nhân: $b \\cdot (a : b) = a$.',
        },
      ],
    },
    {
      heading: 'Ước và bội của một số nguyên',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ước và bội',
          text: 'Cho $a, b \\in \\mathbb{Z}$. Nếu $a$ chia hết cho $b$ thì ta nói $a$ là một bội của $b$ và $b$ là một ước của $a$. Tập hợp các ước của $a$ kí hiệu là $\\text{Ư}(a)$, tập hợp các bội của $b$ kí hiệu là $\\text{B}(b)$.',
        },
        {
          type: 'p',
          text: 'Ví dụ, $-12 = 3 \\cdot (-4)$ nên $-12$ là một bội của $3$ và của $-4$; $3$ và $-4$ là các ước của $-12$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Nếu $a$ là một bội của $b$ thì $-a$ cũng là một bội của $b$. Nếu $b$ là một ước của $a$ thì $-b$ cũng là một ước của $a$. Vì thế các ước của một số nguyên luôn đi thành từng cặp số đối nhau.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Muốn tìm các ước của số nguyên $a$, ta tìm các ước dương của $a$ (cũng là các ước của phần số tự nhiên của $a$), rồi thêm các số đối của chúng.',
            'Muốn tìm các bội của số nguyên $b$, ta nhân $b$ lần lượt với $0, 1, -1, 2, -2, \\ldots$',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Số $0$ là bội của mọi số nguyên khác $0$. Số $0$ không là ước của bất kì số nguyên nào. Các số $1$ và $-1$ là ước của mọi số nguyên.',
        },
      ],
    },
  ],
  explore: {
    title: 'Lưới ước và bội đối xứng',
    instruction:
      'Chọn chế độ "Tìm ước" hoặc "Tìm bội" và chọn một số. Chạm vào từng số trên lưới để kiểm tra: lời giải thích hiện ngay bên dưới. Tìm hết các ước (bội) dương, rồi bấm "Thêm các số đối" và quan sát hàng dưới: mỗi ước dương kéo theo một ước âm cùng cột.',
  },
  examples: [
    {
      problem: 'Tính $(-72) : 9$ và $(-120) : (-8)$.',
      steps: [
        '$(-72)$ và $9$ khác dấu: chia hai phần số tự nhiên $72 : 9 = 8$, đặt dấu "$-$" trước kết quả: $(-72) : 9 = -8$.',
        '$(-120)$ và $(-8)$ cùng dấu: chia hai phần số tự nhiên, $(-120) : (-8) = 120 : 8 = 15$.',
        'Thử lại: $9 \\cdot (-8) = -72$ và $(-8) \\cdot 15 = -120$.',
      ],
      answer: '$(-72) : 9 = -8$; $(-120) : (-8) = 15$.',
    },
    {
      problem: 'Tìm tập hợp $\\text{Ư}(-12)$.',
      steps: [
        'Các ước dương của $-12$ là các ước của $12$: $1; 2; 3; 4; 6; 12$.',
        'Thêm các số đối của chúng: $-1; -2; -3; -4; -6; -12$.',
      ],
      answer: '$\\text{Ư}(-12) = \\{-12; -6; -4; -3; -2; -1; 1; 2; 3; 4; 6; 12\\}$.',
    },
    {
      problem: 'Tìm các bội của $4$ lớn hơn $-20$ và nhỏ hơn $20$.',
      steps: [
        'Các bội của $4$ có dạng $4 \\cdot k$ với $k \\in \\mathbb{Z}$: $\\ldots; -20; -16; -12; -8; -4; 0; 4; 8; 12; 16; 20; \\ldots$',
        'Chọn các bội thỏa mãn $-20 < x < 20$ (không lấy $-20$ và $20$).',
      ],
      answer: '$-16; -12; -8; -4; 0; 4; 8; 12; 16$.',
    },
    {
      problem:
        'Một tàu lặn bắt đầu lặn từ mặt nước, lặn đều và sau $8$ phút đến độ cao $-120$ m so với mực nước biển. Trung bình mỗi phút độ cao của tàu thay đổi bao nhiêu mét?',
      steps: [
        'Độ cao thay đổi tổng cộng $-120$ m trong $8$ phút, nên mỗi phút thay đổi $(-120) : 8$ mét.',
        '$(-120) : 8 = -(120 : 8) = -15$.',
      ],
      answer: 'Mỗi phút độ cao của tàu thay đổi $-15$ m, tức là tàu lặn sâu thêm $15$ m.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính $(-84) : 7$.',
      answer: -12,
      hints: ['Hai số khác dấu: thương là số âm.', 'Tính $84 : 7$ rồi đặt dấu "$-$".'],
      solution: '$(-84) : 7 = -(84 : 7) = -12$. Thử lại: $7 \\cdot (-12) = -84$.',
    },
    {
      type: 'number',
      prompt: 'Tính $(-96) : (-12)$.',
      answer: 8,
      hints: ['Hai số cùng dấu: chia hai phần số tự nhiên, thương dương.'],
      solution: '$(-96) : (-12) = 96 : 12 = 8$. Thử lại: $(-12) \\cdot 8 = -96$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép chia với thương của nó.',
      left: ['$(-48) : 6$', '$(-48) : (-6)$', '$48 : (-12)$', '$0 : (-7)$'],
      right: ['$0$', '$-4$', '$8$', '$-8$'],
      pairs: [
        [0, 3],
        [1, 2],
        [2, 1],
        [3, 0],
      ],
      hints: [
        'Xét dấu trước: cùng dấu thì dương, khác dấu thì âm.',
        '$0$ chia cho số nào khác $0$ cũng bằng $0$.',
      ],
      solution: '$(-48) : 6 = -8$; $(-48) : (-6) = 8$; $48 : (-12) = -4$; $0 : (-7) = 0$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các số là ước của $-10$.',
      options: ['$-5$', '$3$', '$-10$', '$0$', '$2$', '$-4$'],
      answers: [0, 2, 4],
      hints: [
        'Các ước của $-10$ là các ước của $10$ và số đối của chúng.',
        'Số $0$ có là ước của số nào không?',
      ],
      solution:
        '$\\text{Ư}(-10) = \\{-10; -5; -2; -1; 1; 2; 5; 10\\}$, nên chọn $-5$, $-10$ và $2$. Số $3$ và $-4$ không chia hết $10$; số $0$ không là ước của bất kì số nguyên nào.',
    },
    {
      type: 'number',
      prompt: 'Số $18$ có tất cả bao nhiêu ước nguyên?',
      answer: 12,
      hints: ['Đếm các ước dương trước.', 'Mỗi ước dương có một số đối cũng là ước.'],
      solution:
        'Các ước dương của $18$ là $1; 2; 3; 6; 9; 18$ ($6$ ước). Thêm $6$ số đối của chúng, ta được $12$ ước nguyên.',
    },
    {
      type: 'number',
      prompt: 'Tìm số nguyên $x$, biết $(-5) \\cdot x = 60$.',
      answer: -12,
      hints: [
        'Muốn tìm thừa số chưa biết, lấy tích chia cho thừa số đã biết.',
        'Tính $60 : (-5)$.',
      ],
      solution: '$x = 60 : (-5) = -12$. Thử lại: $(-5) \\cdot (-12) = 60$.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu bội của $-6$ lớn hơn $-30$ và nhỏ hơn $30$?',
      answer: 9,
      hints: [
        'Các bội của $-6$ cũng là các bội của $6$: $0; \\pm 6; \\pm 12; \\ldots$',
        'Không lấy $-30$ và $30$; nhớ đếm số $0$.',
      ],
      solution: 'Các bội đó là $-24; -18; -12; -6; 0; 6; 12; 18; 24$: có $9$ số.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào sau đây là sai?',
      options: [
        'Số $0$ là bội của mọi số nguyên khác $0$.',
        'Số $-1$ là ước của mọi số nguyên.',
        'Số $0$ là ước của mọi số nguyên.',
        'Nếu $a$ là bội của $b$ thì $-a$ cũng là bội của $b$.',
      ],
      answer: 2,
      hints: ['Muốn $0$ là ước của $a$ thì phải chia được $a$ cho $0$.'],
      solution:
        'Không có phép chia cho $0$, nên số $0$ không là ước của bất kì số nguyên nào. Ba khẳng định còn lại đều đúng.',
    },
    {
      type: 'number',
      prompt:
        'Trong $6$ giờ, nhiệt độ của một kho lạnh giảm đều từ $0\\,^\\circ\\text{C}$ xuống $-18\\,^\\circ\\text{C}$. Trung bình mỗi giờ nhiệt độ của kho thay đổi bao nhiêu độ C?',
      answer: -3,
      unit: '°C',
      hints: [
        'Nhiệt độ thay đổi tổng cộng $-18\\,^\\circ\\text{C}$ trong $6$ giờ.',
        'Tính $(-18) : 6$.',
      ],
      solution:
        '$(-18) : 6 = -3$. Mỗi giờ nhiệt độ thay đổi $-3\\,^\\circ\\text{C}$, tức là giảm $3\\,^\\circ\\text{C}$.',
    },
    {
      type: 'number',
      prompt: 'Tính tổng tất cả các ước của $-12$.',
      answer: 0,
      hints: ['Các ước của một số nguyên đi thành từng cặp số đối nhau.'],
      solution:
        '$\\text{Ư}(-12) = \\{\\pm 1; \\pm 2; \\pm 3; \\pm 4; \\pm 6; \\pm 12\\}$. Mỗi cặp số đối có tổng bằng $0$, nên tổng tất cả các ước bằng $0$.',
    },
  ],
  takeaways: [
    '$a : b = q$ (với $b \\ne 0$) khi $a = b \\cdot q$; khi đó $a \\vdots\\, b$.',
    'Chia hai số khác dấu: chia hai phần số tự nhiên, đặt dấu "$-$". Chia hai số âm: chia hai phần số tự nhiên, thương dương.',
    'Nếu $a \\vdots\\, b$ thì $a$ là bội của $b$, $b$ là ước của $a$; $-b$ cũng là ước của $a$.',
    'Tìm ước của $a$: tìm ước dương rồi thêm số đối. Số $0$ là bội của mọi số nguyên khác $0$, không là ước của số nào; $\\pm 1$ là ước của mọi số nguyên.',
  ],
};
