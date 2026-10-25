/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Biểu đồ cột kép ghép hai biểu đồ cột để so sánh từng cặp số liệu của hai bộ dữ liệu cùng loại: cách đọc, cách vẽ và chú giải.',
  intro:
    'Muốn biết ở mỗi lớp số bạn nam hay số bạn nữ nhiều hơn, ta có thể vẽ hai biểu đồ cột rồi đặt cạnh nhau, nhưng mắt phải nhìn qua nhìn lại. Gọn hơn, ta vẽ hai cột của cùng một lớp sát nhau trên một biểu đồ, mỗi bộ dữ liệu một màu. Đó là biểu đồ cột kép.',
  objectives: [
    'Đọc và mô tả được dữ liệu từ biểu đồ cột kép.',
    'So sánh được hai bộ dữ liệu cùng loại nhờ biểu đồ cột kép.',
    'Vẽ được biểu đồ cột kép từ bảng thống kê.',
  ],
  sections: [
    {
      heading: 'Đọc biểu đồ cột kép',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biểu đồ cột kép',
          text: 'Để so sánh trực quan từng cặp số liệu của hai bộ dữ liệu cùng loại, người ta ghép hai biểu đồ cột thành một biểu đồ cột kép.',
        },
        {
          type: 'p',
          text: 'Biểu đồ dưới đây cho biết số học sinh lớp 6A và lớp 6B đăng kí các câu lạc bộ. Chú giải cho biết màu nào là lớp nào.',
        },
        { type: 'widget', name: 'clubs' },
        {
          type: 'list',
          items: [
            'Trục ngang ghi các đối tượng (bốn câu lạc bộ); trục dọc ghi số liệu (số học sinh).',
            'Tại mỗi câu lạc bộ có hai cột sát nhau: cột màu xanh là lớp 6A, cột màu vàng là lớp 6B.',
            'So sánh hai cột cạnh nhau cho biết lớp nào đăng kí câu lạc bộ đó nhiều hơn; so sánh các cột cùng màu cho biết câu lạc bộ nào được một lớp ưa thích nhất.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Biểu đồ cột kép chỉ dùng cho hai bộ dữ liệu cùng loại, có cùng các đối tượng và cùng đơn vị (ở đây là số học sinh của hai lớp theo từng câu lạc bộ).',
        },
      ],
    },
    {
      heading: 'Vẽ biểu đồ cột kép',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Các bước vẽ biểu đồ cột kép',
          text: 'Bước 1. Vẽ hai trục ngang và dọc vuông góc với nhau; trục ngang ghi các đối tượng, trục dọc chọn khoảng chia thích hợp. Bước 2. Tại mỗi đối tượng, vẽ hai cột sát nhau, cùng chiều rộng, mỗi cột thể hiện số liệu của một bộ dữ liệu; hai bộ dữ liệu dùng hai màu khác nhau. Bước 3. Đặt tên biểu đồ, ghi chú giải cho hai màu và chú thích các trục.',
        },
        {
          type: 'table',
          caption: 'Số học sinh nam và nữ của bốn lớp khối 6',
          head: ['Lớp', '6A', '6B', '6C', '6D'],
          rows: [
            ['Nam', '$18$', '$22$', '$15$', '$20$'],
            ['Nữ', '$20$', '$17$', '$21$', '$20$'],
          ],
        },
        {
          type: 'p',
          text: 'Để vẽ biểu đồ cột kép cho bảng trên: trục ngang ghi $4$ lớp, trục dọc chia từ $0$ đến $25$ (mỗi khoảng chia $5$ học sinh); tại mỗi lớp vẽ một cột "Nam" và một cột "Nữ" sát nhau, hai màu khác nhau. Phần khám phá của bài chính là biểu đồ đó.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Hai bộ dữ liệu phải dùng chung một trục dọc với cùng khoảng chia, nếu không chiều cao hai cột không so sánh được. Thiếu chú giải thì người đọc không biết cột nào thuộc bộ dữ liệu nào.',
        },
      ],
    },
  ],
  explore: {
    title: 'So sánh số học sinh nam và nữ',
    instruction:
      'Bật hoặc tắt từng bộ dữ liệu "Nam", "Nữ" để nhìn riêng hay nhìn chung. Chạm vào một lớp trên biểu đồ (hoặc chọn bằng phím Tab rồi nhấn Enter) để xem số nam, số nữ và chênh lệch. Trả lời các câu hỏi bằng cách chọn lớp phù hợp.',
  },
  examples: [
    {
      problem:
        'Dựa vào biểu đồ câu lạc bộ ở mục 1: Ở câu lạc bộ nào lớp 6A có nhiều học sinh đăng kí hơn lớp 6B? Ở câu lạc bộ nào hai lớp bằng nhau?',
      steps: [
        'So sánh từng cặp cột: Bóng đá $12 > 9$; Cờ vua $5 < 8$; Vẽ $7 = 7$; Hát $9 < 11$.',
        'Chỉ ở Bóng đá, cột lớp 6A cao hơn cột lớp 6B; ở Vẽ, hai cột cao bằng nhau.',
      ],
      answer: 'Lớp 6A nhiều hơn ở câu lạc bộ Bóng đá; hai lớp bằng nhau ở câu lạc bộ Vẽ.',
    },
    {
      problem:
        'Cũng từ biểu đồ đó, lớp nào có nhiều học sinh đăng kí câu lạc bộ hơn, và nhiều hơn bao nhiêu bạn? (Mỗi bạn đăng kí một câu lạc bộ.)',
      steps: [
        'Lớp 6A: $12 + 5 + 7 + 9 = 33$ học sinh.',
        'Lớp 6B: $9 + 8 + 7 + 11 = 35$ học sinh.',
        '$35 - 33 = 2$.',
      ],
      answer: 'Lớp 6B nhiều hơn lớp 6A $2$ học sinh.',
    },
    {
      problem:
        'Bảng số huy chương của hai đội: Đội Xanh có $4$ huy chương vàng, $6$ huy chương bạc, $3$ huy chương đồng; Đội Đỏ có $5$ vàng, $2$ bạc, $7$ đồng. Nêu cách vẽ biểu đồ cột kép so sánh hai đội.',
      steps: [
        'Bước 1: Trục ngang ghi Vàng, Bạc, Đồng; trục dọc chia từ $0$ đến $8$, mỗi khoảng chia $1$ huy chương.',
        'Bước 2: Tại "Vàng" vẽ cột Đội Xanh cao $4$, cột Đội Đỏ cao $5$ sát nhau; tương tự Bạc ($6$ và $2$), Đồng ($3$ và $7$). Đội Xanh một màu, Đội Đỏ một màu.',
        'Bước 3: Ghi tên "Số huy chương của hai đội", chú giải hai màu, chú thích các trục.',
      ],
      answer:
        'Ba cặp cột (Vàng, Bạc, Đồng), mỗi cặp gồm một cột Đội Xanh và một cột Đội Đỏ, có tên và chú giải.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Theo biểu đồ câu lạc bộ ở mục 1, lớp 6B có bao nhiêu học sinh đăng kí câu lạc bộ Hát?',
      answer: 11,
      unit: 'học sinh',
      hints: ['Tìm cột màu của lớp 6B (xem chú giải) tại câu lạc bộ Hát.'],
      solution: 'Cột lớp 6B ở câu lạc bộ Hát cao $11$, nên có $11$ học sinh.',
    },
    {
      type: 'text',
      prompt:
        'Theo biểu đồ câu lạc bộ ở mục 1, ở câu lạc bộ nào số học sinh hai lớp đăng kí bằng nhau?',
      accept: ['Vẽ', 'câu lạc bộ Vẽ', 'CLB Vẽ'],
      hints: ['Tìm cặp cột có chiều cao bằng nhau.'],
      solution: 'Ở câu lạc bộ Vẽ, hai cột đều cao $7$: hai lớp bằng nhau.',
    },
    {
      type: 'number',
      prompt:
        'Theo biểu đồ câu lạc bộ ở mục 1, ở câu lạc bộ Cờ vua, lớp 6B nhiều hơn lớp 6A bao nhiêu học sinh?',
      answer: 3,
      unit: 'học sinh',
      hints: ['Đọc hai cột tại Cờ vua rồi lấy hiệu.'],
      solution: 'Lớp 6B: $8$, lớp 6A: $5$. $8 - 5 = 3$ học sinh.',
    },
    {
      type: 'number',
      prompt:
        'Theo biểu đồ câu lạc bộ ở mục 1, lớp 6A có tất cả bao nhiêu học sinh đăng kí câu lạc bộ (mỗi bạn một câu lạc bộ)?',
      answer: 33,
      unit: 'học sinh',
      hints: ['Cộng chiều cao bốn cột cùng màu của lớp 6A.'],
      solution: '$12 + 5 + 7 + 9 = 33$ học sinh.',
    },
    {
      type: 'multi',
      prompt:
        'Theo biểu đồ câu lạc bộ ở mục 1, chọn tất cả các câu lạc bộ mà lớp 6B có nhiều học sinh đăng kí hơn lớp 6A.',
      options: ['Bóng đá', 'Cờ vua', 'Vẽ', 'Hát'],
      answers: [1, 3],
      hints: ['Ở mỗi câu lạc bộ, so sánh cột lớp 6B với cột lớp 6A đứng cạnh nó.'],
      solution:
        'Cờ vua: $8 > 5$; Hát: $11 > 9$. Ở Bóng đá lớp 6A nhiều hơn ($12 > 9$); ở Vẽ hai lớp bằng nhau.',
    },
    {
      type: 'number',
      prompt:
        'Theo biểu đồ câu lạc bộ ở mục 1, câu lạc bộ có tổng số học sinh của cả hai lớp nhiều nhất có bao nhiêu học sinh?',
      answer: 21,
      unit: 'học sinh',
      hints: ['Cộng hai cột của mỗi câu lạc bộ rồi so sánh các tổng.'],
      solution:
        'Bóng đá $12 + 9 = 21$; Cờ vua $5 + 8 = 13$; Vẽ $7 + 7 = 14$; Hát $9 + 11 = 20$. Lớn nhất là Bóng đá với $21$ học sinh.',
    },
    {
      type: 'choice',
      prompt: 'Biểu đồ cột kép được dùng để',
      options: [
        'so sánh từng cặp số liệu của hai bộ dữ liệu cùng loại',
        'biểu diễn một bộ dữ liệu bằng hình ảnh',
        'liệt kê các dữ liệu không phải là số',
        'thay cho bảng kiểm đếm',
      ],
      answer: 0,
      hints: ['"Kép" nghĩa là có hai cột ở mỗi đối tượng.'],
      solution:
        'Biểu đồ cột kép ghép hai biểu đồ cột để so sánh trực quan từng cặp số liệu của hai bộ dữ liệu cùng loại.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các yêu cầu đúng khi vẽ biểu đồ cột kép.',
      options: [
        'Hai cột của cùng một đối tượng được vẽ sát nhau.',
        'Mỗi bộ dữ liệu dùng một màu, và có chú giải cho các màu.',
        'Mỗi bộ dữ liệu dùng một trục dọc riêng với khoảng chia khác nhau.',
        'Các cột có cùng chiều rộng.',
      ],
      answers: [0, 1, 3],
      hints: ['Hai bộ dữ liệu phải so sánh được bằng chiều cao cột.'],
      solution:
        'Hai cột của cùng đối tượng vẽ sát nhau, mỗi bộ dữ liệu một màu có chú giải, các cột cùng chiều rộng. Hai bộ dữ liệu phải dùng chung một trục dọc, nếu không chiều cao các cột không so sánh được.',
    },
  ],
  takeaways: [
    'Biểu đồ cột kép ghép hai biểu đồ cột để so sánh từng cặp số liệu của hai bộ dữ liệu cùng loại.',
    'Đọc biểu đồ cột kép: xem chú giải để biết màu của mỗi bộ dữ liệu, rồi so sánh hai cột cạnh nhau ở từng đối tượng.',
    'Vẽ biểu đồ cột kép: chung hai trục, mỗi đối tượng hai cột sát nhau với hai màu, có tên biểu đồ và chú giải.',
  ],
};
