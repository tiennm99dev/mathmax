/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương III: hệ thống hoá tập hợp số nguyên, thứ tự, phép cộng, trừ, nhân, chia hết, quy tắc dấu ngoặc, ước và bội, kèm bài kiểm tra có bản đồ kĩ năng theo từng bài.',
  intro:
    'Chương III mở rộng tập hợp số tự nhiên thành tập hợp số nguyên $\\mathbb{Z}$, nhờ đó em biểu diễn được nhiệt độ dưới $0\\,^\\circ\\text{C}$, độ cao dưới mực nước biển hay số tiền nợ. Bài này hệ thống lại toàn chương và cho em một bài kiểm tra tổng hợp; bản đồ kĩ năng sẽ chỉ ra bài nào em đã vững và bài nào cần ôn lại.',
  objectives: [
    'Hệ thống hoá kiến thức chương Số nguyên.',
    'Làm bài tập trắc nghiệm và tự luận tổng hợp: so sánh, cộng, trừ, nhân, chia số nguyên, bỏ dấu ngoặc, tìm $x$, tìm ước và bội.',
    'Vận dụng số nguyên để giải các bài toán thực tế về nhiệt độ, độ cao, lãi và lỗ.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức chương III',
      blocks: [
        {
          type: 'table',
          caption: 'Kiến thức chính theo từng bài',
          head: ['Bài', 'Kiến thức cần nhớ'],
          rows: [
            [
              'Tập hợp các số nguyên',
              '$\\mathbb{Z} = \\{\\ldots; -2; -1; 0; 1; 2; \\ldots\\}$ gồm số nguyên âm, số $0$ và số nguyên dương. Trên trục số nằm ngang, điểm $a$ nằm bên trái điểm $b$ thì $a < b$. Số âm nhỏ hơn $0$, số dương lớn hơn $0$.',
            ],
            [
              'Cộng và trừ',
              'Cộng hai số cùng dấu: cộng hai phần số tự nhiên rồi đặt dấu chung. Cộng hai số khác dấu: lấy phần số tự nhiên lớn trừ phần số tự nhiên nhỏ, đặt dấu của số có phần số tự nhiên lớn hơn. $a + (-a) = 0$; $a - b = a + (-b)$.',
            ],
            [
              'Quy tắc dấu ngoặc',
              'Bỏ ngoặc có dấu "$+$" đằng trước: giữ nguyên dấu các số hạng. Bỏ ngoặc có dấu "$-$" đằng trước: đổi dấu tất cả các số hạng trong ngoặc.',
            ],
            [
              'Phép nhân',
              'Nhân hai số khác dấu: nhân hai phần số tự nhiên, đặt dấu "$-$". Nhân hai số cùng dấu: nhân hai phần số tự nhiên, tích dương. Phép nhân có tính chất giao hoán, kết hợp, nhân với $1$, phân phối đối với phép cộng và phép trừ.',
            ],
            [
              'Phép chia hết, ước và bội',
              '$a : b = q$ khi $a = b \\cdot q$ ($b \\ne 0$). Quy tắc dấu của thương giống của tích. Nếu $a \\vdots\\, b$ thì $a$ là bội của $b$, $b$ là ước của $a$; khi đó $-b$ cũng là ước của $a$, $-a$ cũng là bội của $b$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thứ tự thực hiện phép tính',
          text: 'Với số nguyên, thứ tự thực hiện phép tính như với số tự nhiên: trong ngoặc trước; không có ngoặc thì lũy thừa, rồi nhân và chia, cuối cùng cộng và trừ.',
        },
      ],
    },
    {
      heading: 'Những lỗi hay gặp',
      blocks: [
        {
          type: 'list',
          items: [
            'So sánh hai số âm theo phần số tự nhiên: $-9 > -2$ là sai. Số âm nào có phần số tự nhiên lớn hơn thì nhỏ hơn: $-9 < -2$.',
            'Nhầm quy tắc cộng với quy tắc nhân: $(-3) + (-4) = -7$, nhưng $(-3) \\cdot (-4) = 12$.',
            'Bỏ ngoặc có dấu "$-$" đằng trước mà chỉ đổi dấu số hạng đầu: $10 - (4 - 7) = 10 - 4 + 7$, không phải $10 - 4 - 7$.',
            'Chỉ kể các ước dương: các ước của $-8$ gồm cả $-1; -2; -4; -8$.',
            'Coi $0$ là ước của một số: $0$ không là ước của bất kì số nguyên nào, nhưng là bội của mọi số nguyên khác $0$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Bài kiểm tra bên dưới tự sinh $15$ câu, ba câu cho mỗi bài từ Bài 13 đến Bài 17. Số âm gõ với dấu "-" đằng trước, ví dụ $-12$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương có bản đồ kĩ năng',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng tô màu từng bài theo kết quả lần làm đầu và cuối cùng chỉ ra bài em cần ôn lại.',
  },
  examples: [
    {
      problem: 'Tính một cách hợp lí: $(-23) \\cdot 63 + 23 \\cdot 21 + 58 \\cdot 23$.',
      steps: [
        'Viết $(-23) \\cdot 63 = 23 \\cdot (-63)$ để ba số hạng có thừa số chung $23$.',
        'Đặt thừa số chung: $23 \\cdot [(-63) + 21 + 58]$.',
        '$(-63) + 21 + 58 = (-63) + 79 = 16$, nên kết quả là $23 \\cdot 16 = 368$.',
      ],
      answer: '$368$.',
    },
    {
      problem: 'Tìm số nguyên $x$, biết $(-5) \\cdot x - 12 = 23$.',
      steps: [
        '$(-5) \\cdot x$ là số bị trừ: $(-5) \\cdot x = 23 + 12 = 35$.',
        '$x = 35 : (-5) = -7$.',
        'Thử lại: $(-5) \\cdot (-7) - 12 = 35 - 12 = 23$.',
      ],
      answer: '$x = -7$.',
    },
    {
      problem:
        'Một tàu ngầm đang ở độ cao $-150$ m so với mực nước biển. Tàu nổi lên đều, mỗi phút $12$ m. Sau $10$ phút tàu ở độ cao bao nhiêu mét?',
      steps: [
        'Sau $10$ phút tàu nổi lên $10 \\cdot 12 = 120$ m.',
        'Độ cao mới: $(-150) + 120 = -30$.',
      ],
      answer: 'Tàu ở độ cao $-30$ m, tức là $30$ m dưới mực nước biển.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Sắp xếp các số nguyên theo thứ tự tăng dần.',
      items: ['$-7$', '$4$', '$-15$', '$0$', '$9$', '$-1$'],
      answer: [2, 0, 5, 3, 1, 4],
      hints: [
        'Các số âm đứng trước $0$, các số dương đứng sau $0$.',
        'Số âm có phần số tự nhiên càng lớn thì càng nhỏ.',
      ],
      solution: '$-15 < -7 < -1 < 0 < 4 < 9$.',
    },
    {
      type: 'number',
      prompt: 'Tính tổng các số nguyên $x$ thỏa mãn $-6 < x < 4$.',
      answer: -9,
      hints: [
        'Liệt kê: $x \\in \\{-5; -4; \\ldots; 2; 3\\}$.',
        'Gom các cặp số đối có tổng bằng $0$.',
      ],
      solution:
        '$x \\in \\{-5; -4; -3; -2; -1; 0; 1; 2; 3\\}$. Các cặp $(-3) + 3$, $(-2) + 2$, $(-1) + 1$ có tổng $0$; còn lại $(-5) + (-4) + 0 = -9$.',
    },
    {
      type: 'number',
      prompt: 'Tính: $(-37) + 54 + (-70) + (-163) + 246$.',
      answer: 30,
      hints: ['Gom $(-37)$ với $(-163)$, gom $54$ với $246$.'],
      solution: '$[(-37) + (-163)] + (54 + 246) + (-70) = (-200) + 300 + (-70) = 30$.',
    },
    {
      type: 'number',
      prompt: 'Bỏ ngoặc rồi tính: $(-125) - (75 - 300)$.',
      answer: 100,
      hints: ['Trước ngoặc là dấu "$-$": $75$ thành $-75$, $-300$ thành $+300$.'],
      solution: '$-125 - 75 + 300 = -200 + 300 = 100$.',
    },
    {
      type: 'number',
      prompt: 'Tính: $4 \\cdot (1\\,930 + 2\\,019) + 4 \\cdot (-2\\,019)$.',
      answer: 7720,
      hints: ['Dùng tính chất phân phối để bỏ ngoặc, rồi tìm hai số đối nhau.'],
      solution:
        '$4 \\cdot 1\\,930 + 4 \\cdot 2\\,019 + 4 \\cdot (-2\\,019) = 4 \\cdot 1\\,930 + 0 = 7\\,720$.',
    },
    {
      type: 'number',
      prompt: 'Tính: $(-3) \\cdot (-5) \\cdot (-2) \\cdot 10$.',
      answer: -300,
      hints: ['Có ba thừa số âm: tích mang dấu gì?'],
      solution: 'Có $3$ thừa số âm (số lẻ) nên tích âm: $-(3 \\cdot 5 \\cdot 2 \\cdot 10) = -300$.',
    },
    {
      type: 'number',
      prompt: 'Tính: $(-63) : 9 + 7 \\cdot (-3)$.',
      answer: -28,
      hints: ['Làm phép chia và phép nhân trước, phép cộng sau.'],
      solution: '$(-63) : 9 = -7$ và $7 \\cdot (-3) = -21$, nên $(-7) + (-21) = -28$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số nguyên $x$, biết $2 \\cdot x - 15 = -45$.',
      answer: -15,
      hints: ['Tìm $2 \\cdot x$ trước: $2 \\cdot x = -45 + 15$.'],
      solution:
        '$2 \\cdot x = -45 + 15 = -30$, nên $x = (-30) : 2 = -15$. Thử lại: $2 \\cdot (-15) - 15 = -45$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các số vừa là ước của $12$ vừa là bội của $-3$.',
      options: ['$-6$', '$4$', '$3$', '$-12$', '$0$', '$-2$'],
      answers: [0, 2, 3],
      hints: [
        'Viết $\\text{Ư}(12)$, rồi giữ lại các số chia hết cho $3$.',
        'Số $0$ có là ước của $12$ không?',
      ],
      solution:
        '$\\text{Ư}(12) = \\{\\pm 1; \\pm 2; \\pm 3; \\pm 4; \\pm 6; \\pm 12\\}$; trong đó các bội của $-3$ là $\\pm 3; \\pm 6; \\pm 12$. Vậy chọn $-6$, $3$, $-12$. Số $4$ và $-2$ không chia hết cho $3$; số $0$ không là ước của $12$.',
    },
    {
      type: 'choice',
      prompt: 'Giá trị của tích $(-1) \\cdot (-2) \\cdot (-3) \\cdot (-4) \\cdot (-5)$ là',
      options: ['$120$', '$-120$', '$-15$', '$15$'],
      answer: 1,
      hints: ['Đếm số thừa số âm để biết dấu, rồi nhân các phần số tự nhiên.'],
      solution:
        'Có $5$ thừa số âm (số lẻ) nên tích âm; $1 \\cdot 2 \\cdot 3 \\cdot 4 \\cdot 5 = 120$. Tích bằng $-120$.',
    },
    {
      type: 'number',
      prompt:
        'Một thợ lặn đang ở độ cao $-20$ m so với mực nước biển. Anh lặn sâu thêm $3$ lần, mỗi lần $6$ m. Độ cao mới của thợ lặn là bao nhiêu mét?',
      answer: -38,
      unit: 'm',
      hints: ['Mỗi lần lặn sâu thêm, độ cao thay đổi $-6$ m.', 'Tính $(-20) + 3 \\cdot (-6)$.'],
      solution: '$(-20) + 3 \\cdot (-6) = (-20) + (-18) = -38$. Thợ lặn ở độ cao $-38$ m.',
    },
    {
      type: 'number',
      prompt:
        'Nhiệt độ trên đỉnh một ngọn núi lúc $2$ giờ sáng là $-12\\,^\\circ\\text{C}$, đến $14$ giờ là $9\\,^\\circ\\text{C}$. Từ $2$ giờ đến $14$ giờ, nhiệt độ đã tăng bao nhiêu độ C?',
      answer: 21,
      unit: '°C',
      hints: ['Độ tăng bằng nhiệt độ sau trừ nhiệt độ trước.'],
      solution: '$9 - (-12) = 9 + 12 = 21$. Nhiệt độ tăng $21\\,^\\circ\\text{C}$.',
    },
    {
      type: 'number',
      prompt:
        'Trong một năm, một cửa hàng có $3$ quý bị lỗ, mỗi quý lỗ $30$ triệu đồng, và $1$ quý lãi $100$ triệu đồng. Dùng số âm cho tiền lỗ, tính lợi nhuận cả năm của cửa hàng (triệu đồng).',
      answer: 10,
      unit: 'triệu đồng',
      hints: ['Tính $3 \\cdot (-30) + 100$.'],
      solution: '$3 \\cdot (-30) + 100 = (-90) + 100 = 10$. Cả năm cửa hàng lãi $10$ triệu đồng.',
    },
  ],
  takeaways: [
    'Trên trục số, số bên trái nhỏ hơn; số âm $< 0 <$ số dương.',
    'Cộng: cùng dấu thì cộng và giữ dấu, khác dấu thì trừ và lấy dấu số có phần số tự nhiên lớn hơn; $a - b = a + (-b)$.',
    'Bỏ ngoặc có dấu "$-$" đằng trước thì đổi dấu mọi số hạng trong ngoặc.',
    'Nhân, chia: cùng dấu thì dương, khác dấu thì âm.',
    'Ước của một số nguyên đi thành cặp số đối; $0$ là bội của mọi số nguyên khác $0$ và không là ước của số nào.',
  ],
};
