/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Giải hệ hai phương trình bậc nhất hai ẩn bằng phương pháp thế, phương pháp cộng đại số và máy tính cầm tay, và đọc số nghiệm của hệ trên đồ thị.',
  intro:
    'Mỗi phương trình $ax + by = c$ là một đường thẳng trên mặt phẳng toạ độ, nên nghiệm của hệ hai phương trình là điểm chung của hai đường thẳng. Bài này dạy em hai cách tính chính xác điểm chung đó, phương pháp thế và phương pháp cộng đại số, cùng cách kiểm tra nhanh bằng máy tính cầm tay.',
  objectives: [
    'Giải hệ hai phương trình bậc nhất hai ẩn bằng phương pháp thế.',
    'Giải hệ bằng phương pháp cộng đại số, kể cả khi phải nhân các phương trình với số thích hợp.',
    'Nhận biết hệ có nghiệm duy nhất, vô nghiệm hay vô số nghiệm qua hệ số và qua đồ thị.',
    'Dùng máy tính cầm tay để tìm hoặc kiểm tra nghiệm.',
  ],
  sections: [
    {
      heading: 'Phương pháp thế',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Từ một phương trình, biểu diễn một ẩn theo ẩn kia (chọn ẩn có hệ số $1$ hoặc $-1$ cho gọn).',
            'Thế biểu thức đó vào phương trình còn lại, được phương trình một ẩn.',
            'Giải phương trình một ẩn, rồi thay ngược lại để tìm ẩn còn lại.',
          ],
        },
        {
          type: 'tex',
          tex: '\\begin{cases} x + y = 3 \\\\ 2x - y = 0 \\end{cases} \\Rightarrow y = 3 - x,\\; 2x - (3 - x) = 0 \\Rightarrow x = 1,\\; y = 2',
        },
      ],
    },
    {
      heading: 'Phương pháp cộng đại số',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Nhân hai vế của mỗi phương trình với số thích hợp (nếu cần) để hệ số của cùng một ẩn bằng nhau hoặc đối nhau.',
            'Cộng (khi hệ số đối nhau) hoặc trừ (khi hệ số bằng nhau) từng vế hai phương trình để khử ẩn đó.',
            'Giải phương trình một ẩn vừa nhận được, rồi thay vào một phương trình của hệ để tìm ẩn còn lại.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Phương pháp cộng tiện khi các hệ số đều khác $\\pm 1$; phương pháp thế tiện khi có một ẩn hệ số $\\pm 1$. Cả hai cho cùng một nghiệm.',
        },
      ],
    },
    {
      heading: 'Số nghiệm của hệ',
      blocks: [
        {
          type: 'p',
          text: "Xét hệ $ax + by = c$ và $a'x + b'y = c'$. Hai đường thẳng có ba vị trí tương đối, ứng với ba khả năng về số nghiệm.",
        },
        {
          type: 'table',
          head: ['Hai đường thẳng', 'Dấu hiệu', 'Số nghiệm'],
          rows: [
            ['Cắt nhau', "$ab' - a'b \\ne 0$", 'Nghiệm duy nhất'],
            ['Song song', "$ab' - a'b = 0$, hằng số không cùng tỉ lệ", 'Vô nghiệm'],
            ['Trùng nhau', 'Hai phương trình tỉ lệ cả ba hệ số', 'Vô số nghiệm'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Khi khử ẩn mà được $0x = k$ với $k \\ne 0$ thì hệ vô nghiệm; được $0x = 0$ thì hệ có vô số nghiệm.',
        },
      ],
    },
    {
      heading: 'Giải bằng máy tính cầm tay',
      blocks: [
        {
          type: 'p',
          text: "Nhiều máy tính cầm tay có chương trình giải hệ hai ẩn: vào chế độ giải hệ phương trình, chọn số ẩn là $2$, nhập lần lượt $a, b, c$ của phương trình thứ nhất và $a', b', c'$ của phương trình thứ hai, rồi bấm \"=\" để đọc $x$ và $y$. Hãy dùng nó để kiểm tra lại kết quả em giải bằng tay.",
        },
      ],
    },
  ],
  explore: {
    title: 'Hai đường thẳng, một hệ',
    instruction:
      'Chỉnh các hệ số a, b, c hoặc kéo điểm vuông để tịnh tiến từng đường thẳng. Quan sát khi nào hai đường thẳng cắt nhau, song song hay trùng nhau, và đọc nghiệm tại giao điểm.',
  },
  examples: [
    {
      problem:
        'Giải hệ $\\begin{cases} x - 2y = 1 \\\\ 3x + y = 10 \\end{cases}$ bằng phương pháp thế.',
      steps: [
        'Từ phương trình thứ nhất: $x = 1 + 2y$.',
        'Thế vào phương trình thứ hai: $3(1 + 2y) + y = 10$, tức $7y = 7$, $y = 1$.',
        'Thay lại: $x = 1 + 2 \\cdot 1 = 3$.',
      ],
      answer: 'Hệ có nghiệm duy nhất $(x; y) = (3; 1)$.',
    },
    {
      problem:
        'Giải hệ $\\begin{cases} 2x + 3y = 7 \\\\ 3x - 2y = 4 \\end{cases}$ bằng phương pháp cộng đại số.',
      steps: [
        'Nhân phương trình thứ nhất với $2$, thứ hai với $3$: $4x + 6y = 14$ và $9x - 6y = 12$.',
        'Cộng từng vế: $13x = 26$, nên $x = 2$.',
        'Thay vào $2x + 3y = 7$: $4 + 3y = 7$, $y = 1$.',
      ],
      answer: 'Hệ có nghiệm duy nhất $(x; y) = (2; 1)$.',
    },
    {
      problem: 'Giải hệ $\\begin{cases} x + 2y = 4 \\\\ 2x + 4y = -6 \\end{cases}$.',
      steps: [
        'Nhân phương trình thứ nhất với $2$: $2x + 4y = 8$.',
        'Trừ từng vế cho phương trình thứ hai: $0x + 0y = 14$, vô lí.',
      ],
      answer: 'Hệ vô nghiệm; hai đường thẳng song song.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Giải hệ $\\begin{cases} x + y = 5 \\\\ x - y = 1 \\end{cases}$. Giá trị của $x$ là bao nhiêu?',
      answer: 3,
      hints: ['Cộng từng vế hai phương trình để khử $y$.', '$2x = 6$.'],
      solution: 'Cộng từng vế: $2x = 6$, $x = 3$, rồi $y = 5 - 3 = 2$. Nghiệm $(3; 2)$.',
    },
    {
      type: 'number',
      prompt:
        'Giải hệ $\\begin{cases} y = 2x - 1 \\\\ 3x + y = 9 \\end{cases}$. Giá trị của $y$ là bao nhiêu?',
      answer: 3,
      hints: ['Thế $y = 2x - 1$ vào phương trình thứ hai.', '$3x + 2x - 1 = 9$ nên $x = 2$.'],
      solution: '$5x - 1 = 9$ nên $x = 2$, $y = 2 \\cdot 2 - 1 = 3$. Nghiệm $(2; 3)$.',
    },
    {
      type: 'choice',
      prompt: 'Hệ $\\begin{cases} 2x - y = 3 \\\\ -4x + 2y = -6 \\end{cases}$ có bao nhiêu nghiệm?',
      options: ['Nghiệm duy nhất', 'Vô nghiệm', 'Vô số nghiệm'],
      answer: 2,
      hints: ['Nhân phương trình thứ nhất với $-2$ rồi so sánh.'],
      solution:
        'Nhân phương trình thứ nhất với $-2$ được đúng phương trình thứ hai, nên hai đường thẳng trùng nhau và hệ có vô số nghiệm.',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các bước giải hệ $\\begin{cases} 3x + 2y = 8 \\\\ x + 2y = 4 \\end{cases}$ bằng phương pháp cộng đại số.',
      items: [
        'Thay $x = 2$ vào $x + 2y = 4$ được $y = 1$.',
        'Nhận thấy hệ số của $y$ bằng nhau.',
        'Trừ từng vế: $2x = 4$, nên $x = 2$.',
        'Kết luận nghiệm $(2; 1)$.',
      ],
      answer: [1, 2, 0, 3],
      hints: ['Trước tiên phải xem nên khử ẩn nào.', 'Tìm $x$ trước rồi mới tìm $y$.'],
      solution:
        'Hệ số của $y$ bằng nhau nên trừ từng vế: $2x = 4$, $x = 2$; thay vào được $y = 1$; nghiệm $(2; 1)$.',
    },
    {
      type: 'number',
      prompt:
        'Mua $2$ quyển vở và $3$ cái bút hết $36$ nghìn đồng; mua $1$ quyển vở và $2$ cái bút hết $20$ nghìn đồng. Giá một quyển vở là bao nhiêu nghìn đồng?',
      answer: 12,
      unit: 'nghìn đồng',
      hints: [
        'Gọi $x$ là giá vở, $y$ là giá bút: $2x + 3y = 36$ và $x + 2y = 20$.',
        'Nhân phương trình thứ hai với $2$ rồi trừ.',
      ],
      solution:
        '$2x + 4y = 40$ trừ $2x + 3y = 36$ được $y = 4$, rồi $x = 20 - 8 = 12$. Một quyển vở giá $12$ nghìn đồng.',
    },
    {
      type: 'choice',
      prompt:
        'Với giá trị nào của $m$ thì hệ $\\begin{cases} x + y = 2 \\\\ mx + y = 5 \\end{cases}$ vô nghiệm?',
      options: ['$m = 0$', '$m = 1$', '$m = 2$', '$m = 5$'],
      answer: 1,
      hints: [
        "Hệ vô nghiệm khi hai đường thẳng song song: $ab' - a'b = 0$.",
        '$1 \\cdot 1 - m \\cdot 1 = 0$.',
      ],
      solution:
        'Cần $1 - m = 0$, tức $m = 1$. Khi đó hai phương trình $x + y = 2$ và $x + y = 5$ mâu thuẫn, hệ vô nghiệm.',
    },
  ],
  takeaways: [
    'Phương pháp thế: rút một ẩn từ một phương trình, thế vào phương trình kia.',
    'Phương pháp cộng: làm cho hệ số của một ẩn bằng nhau hoặc đối nhau rồi trừ hoặc cộng từng vế.',
    'Hệ có nghiệm duy nhất khi hai đường thẳng cắt nhau, vô nghiệm khi song song, vô số nghiệm khi trùng nhau.',
    'Luôn thử lại nghiệm vào cả hai phương trình, hoặc kiểm tra bằng máy tính cầm tay.',
  ],
};
