/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Giải bài toán bằng cách lập hệ phương trình: chọn hai ẩn và đặt điều kiện, lập hai phương trình từ dữ kiện, giải hệ, kiểm tra điều kiện rồi trả lời.',
  intro:
    'Ở lớp 8, em đã giải bài toán bằng cách lập phương trình một ẩn. Khi bài toán có hai đại lượng chưa biết, gọi cả hai là ẩn thường giúp lập phương trình dễ hơn: mỗi dữ kiện của đề cho một phương trình, hai dữ kiện cho một hệ hai phương trình bậc nhất hai ẩn. Giải hệ xong, em còn phải đối chiếu với điều kiện của ẩn trước khi trả lời.',
  objectives: [
    'Chọn hai ẩn phù hợp và đặt điều kiện cho chúng.',
    'Biểu diễn các đại lượng chưa biết theo ẩn và lập hệ hai phương trình từ dữ kiện của bài toán.',
    'Giải hệ, kiểm tra nghiệm với điều kiện của ẩn và trả lời bài toán.',
  ],
  sections: [
    {
      heading: 'Các bước giải bài toán bằng cách lập hệ phương trình',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Lập hệ phương trình: chọn hai ẩn và đặt điều kiện thích hợp cho chúng; biểu diễn các đại lượng chưa biết theo các ẩn và các đại lượng đã biết; lập hai phương trình biểu thị mối quan hệ giữa các đại lượng.',
            'Giải hệ phương trình vừa lập.',
            'Trả lời: kiểm tra xem trong các nghiệm của hệ, nghiệm nào thoả mãn điều kiện của ẩn, rồi kết luận.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Thường nên chọn ẩn là chính các đại lượng mà đề bài hỏi. Ghi rõ đơn vị của ẩn, ví dụ "gọi $x$ (km/h) là vận tốc của xe thứ nhất".',
        },
      ],
    },
    {
      heading: 'Lập bảng dữ kiện',
      blocks: [
        {
          type: 'p',
          text: 'Với bài toán cổ "Vừa gà vừa chó, bó lại cho tròn, ba mươi sáu con, một trăm chân chẵn", gọi $x$ là số gà, $y$ là số chó ($x, y \\in \\mathbb{N}^*$). Kẻ một bảng: mỗi cột là một đối tượng, mỗi hàng là một đại lượng. Mỗi hàng đọc thành một phương trình.',
        },
        {
          type: 'table',
          head: ['Đại lượng', 'Gà', 'Chó', 'Cả hai', 'Phương trình'],
          rows: [
            ['Số con', '$x$', '$y$', '$36$', '$x + y = 36$'],
            ['Số chân', '$2x$', '$4y$', '$100$', '$2x + 4y = 100$'],
          ],
          caption: 'Bảng dữ kiện cho bài toán gà và chó.',
        },
        {
          type: 'p',
          text: 'Bảng giúp em không bỏ sót dữ kiện và không nhầm hệ số: mỗi con gà có $2$ chân nên $x$ con gà có $2x$ chân, mỗi con chó có $4$ chân nên $y$ con chó có $4y$ chân.',
        },
      ],
    },
    {
      heading: 'Kiểm tra điều kiện của ẩn',
      blocks: [
        {
          type: 'callout',
          tone: 'warning',
          text: 'Nghiệm của hệ chưa chắc là đáp số. Số người, số con vật, số sản phẩm phải là số tự nhiên; độ dài, vận tốc, giá tiền phải dương; vận tốc riêng của ca nô phải lớn hơn vận tốc dòng nước. Nghiệm nào không thoả mãn điều kiện thì loại.',
        },
        {
          type: 'p',
          text: 'Nếu mọi nghiệm đều bị loại, em nên xem lại cách lập hệ: thường là một phương trình bị lập sai hệ số hay sai đơn vị.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng dữ kiện kéo thả',
    instruction:
      'Chọn một bài toán. Kéo từng thẻ biểu thức vào đúng ô của bảng (hoặc chạm thẻ rồi chạm ô). Thẻ đặt sai sẽ bị trả lại kèm lời giải thích. Khi đủ sáu ô, mỗi hàng thành một phương trình, và em xem hệ, nghiệm cùng bước kiểm tra điều kiện.',
  },
  examples: [
    {
      problem:
        'Vừa gà vừa chó, bó lại cho tròn, ba mươi sáu con, một trăm chân chẵn. Hỏi có bao nhiêu con gà, bao nhiêu con chó?',
      steps: [
        'Gọi $x$ là số gà, $y$ là số chó ($x, y \\in \\mathbb{N}^*$, $x < 36$, $y < 36$).',
        'Có $36$ con nên $x + y = 36$; có $100$ chân nên $2x + 4y = 100$.',
        'Nhân phương trình thứ nhất với $2$: $2x + 2y = 72$. Trừ từng vế: $2y = 28$, nên $y = 14$; $x = 36 - 14 = 22$.',
        '$x = 22$, $y = 14$ thoả mãn điều kiện.',
      ],
      answer: 'Có $22$ con gà và $14$ con chó.',
    },
    {
      problem:
        'Năm ngoái, hai đơn vị sản xuất thu hoạch được $720$ tấn thóc. Năm nay, đơn vị thứ nhất làm vượt mức $15\\%$, đơn vị thứ hai làm vượt mức $12\\%$ so với năm ngoái, nên cả hai thu hoạch được $819$ tấn thóc. Hỏi năm ngoái mỗi đơn vị thu hoạch được bao nhiêu tấn thóc?',
      steps: [
        'Gọi $x$, $y$ (tấn) là số thóc năm ngoái của đơn vị thứ nhất và đơn vị thứ hai ($0 < x < 720$, $0 < y < 720$).',
        'Năm ngoái: $x + y = 720$. Năm nay đơn vị thứ nhất được $115\\%$ của $x$, tức $1{,}15x$; đơn vị thứ hai được $1{,}12y$; nên $1{,}15x + 1{,}12y = 819$.',
        'Từ phương trình thứ nhất: $y = 720 - x$. Thế vào: $1{,}15x + 806{,}4 - 1{,}12x = 819$, tức $0{,}03x = 12{,}6$, nên $x = 420$.',
        'Khi đó $y = 720 - 420 = 300$; cả hai giá trị thoả mãn điều kiện.',
      ],
      answer:
        'Năm ngoái đơn vị thứ nhất thu hoạch được $420$ tấn, đơn vị thứ hai thu hoạch được $300$ tấn thóc.',
    },
    {
      problem:
        'Quãng đường $AB$ dài $200$ km. Hai ô tô khởi hành cùng lúc, một xe từ $A$, một xe từ $B$, đi ngược chiều nhau và gặp nhau sau $2$ giờ. Biết vận tốc xe đi từ $A$ lớn hơn vận tốc xe đi từ $B$ là $10$ km/h. Tính vận tốc mỗi xe.',
      steps: [
        'Gọi $x$, $y$ (km/h) lần lượt là vận tốc xe đi từ $A$ và xe đi từ $B$ ($x > y > 0$).',
        'Sau $2$ giờ, hai xe đi được $2x$ và $2y$ km, tổng bằng $AB$: $2x + 2y = 200$, tức $x + y = 100$.',
        'Xe từ $A$ nhanh hơn $10$ km/h: $x - y = 10$.',
        'Cộng từng vế: $2x = 110$, nên $x = 55$; $y = 55 - 10 = 45$. Thoả mãn điều kiện $x > y > 0$.',
      ],
      answer: 'Xe đi từ $A$ có vận tốc $55$ km/h, xe đi từ $B$ có vận tốc $45$ km/h.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Sắp xếp các bước giải bài toán bằng cách lập hệ phương trình.',
      items: [
        'Giải hệ phương trình.',
        'Chọn hai ẩn và đặt điều kiện cho chúng.',
        'Kiểm tra nghiệm với điều kiện của ẩn rồi trả lời.',
        'Lập hai phương trình biểu thị quan hệ giữa các đại lượng.',
        'Biểu diễn các đại lượng chưa biết theo các ẩn.',
      ],
      answer: [1, 4, 3, 0, 2],
      hints: ['Bước cuối cùng luôn là trả lời; ngay trước đó là giải hệ.'],
      solution:
        'Chọn ẩn và đặt điều kiện, biểu diễn các đại lượng theo ẩn, lập hai phương trình, giải hệ, kiểm tra điều kiện và trả lời.',
    },
    {
      type: 'choice',
      prompt:
        'Một mảnh vườn hình chữ nhật có chu vi $34$ m, chiều dài hơn chiều rộng $7$ m. Gọi $x$ (m) là chiều dài, $y$ (m) là chiều rộng. Hệ phương trình nào đúng?',
      options: [
        '$\\begin{cases} x + y = 34 \\\\ x - y = 7 \\end{cases}$',
        '$\\begin{cases} 2(x + y) = 34 \\\\ x - y = 7 \\end{cases}$',
        '$\\begin{cases} 2(x + y) = 34 \\\\ y - x = 7 \\end{cases}$',
        '$\\begin{cases} xy = 34 \\\\ x - y = 7 \\end{cases}$',
      ],
      answer: 1,
      hints: ['Chu vi hình chữ nhật bằng hai lần tổng chiều dài và chiều rộng.'],
      solution:
        'Chu vi: $2(x + y) = 34$. Chiều dài hơn chiều rộng $7$ m: $x - y = 7$. Hệ có nghiệm $x = 12$, $y = 5$.',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh vườn hình chữ nhật có chu vi $34$ m, chiều dài hơn chiều rộng $7$ m. Diện tích mảnh vườn là bao nhiêu mét vuông?',
      answer: 60,
      unit: 'm²',
      hints: ['Giải hệ $x + y = 17$, $x - y = 7$ để tìm hai kích thước.'],
      solution:
        '$x + y = 17$ và $x - y = 7$ cho $x = 12$, $y = 5$. Diện tích là $12 \\cdot 5 = 60$ m².',
    },
    {
      type: 'number',
      prompt:
        'Tìm hai số tự nhiên, biết tổng của chúng bằng $59$ và hai lần số thứ nhất bé hơn ba lần số thứ hai là $7$. Số thứ nhất là bao nhiêu?',
      answer: 34,
      hints: [
        'Gọi hai số là $x$ và $y$: $x + y = 59$.',
        'Hai lần số thứ nhất bé hơn ba lần số thứ hai là $7$: $3y - 2x = 7$.',
      ],
      solution:
        'Hệ $x + y = 59$, $3y - 2x = 7$. Thế $y = 59 - x$: $177 - 3x - 2x = 7$, nên $x = 34$, $y = 25$. Thử lại: $2 \\cdot 34 = 68 = 3 \\cdot 25 - 7$.',
    },
    {
      type: 'number',
      prompt:
        'Lớp 9A có $40$ học sinh tham gia trồng cây. Mỗi bạn nam trồng được $3$ cây, mỗi bạn nữ trồng được $2$ cây, cả lớp trồng được $102$ cây. Lớp có bao nhiêu bạn nam?',
      answer: 22,
      unit: 'bạn',
      hints: ['Gọi $x$ là số bạn nam, $y$ là số bạn nữ: $x + y = 40$ và $3x + 2y = 102$.'],
      solution:
        'Nhân phương trình thứ nhất với $2$ rồi trừ: $x = 102 - 80 = 22$; $y = 18$. Lớp có $22$ bạn nam và $18$ bạn nữ.',
    },
    {
      type: 'number',
      prompt:
        'Một ca nô xuôi dòng $2$ giờ được $60$ km và ngược dòng $3$ giờ được $72$ km. Vận tốc của dòng nước là bao nhiêu km/h? (Vận tốc riêng của ca nô và vận tốc dòng nước không đổi.)',
      answer: 3,
      unit: 'km/h',
      hints: [
        'Gọi $x$ là vận tốc riêng của ca nô, $y$ là vận tốc dòng nước: xuôi dòng đi với vận tốc $x + y$, ngược dòng với $x - y$.',
        'Hệ: $x + y = 30$ và $x - y = 24$.',
      ],
      solution:
        'Xuôi dòng: $x + y = 60 : 2 = 30$; ngược dòng: $x - y = 72 : 3 = 24$. Trừ từng vế: $2y = 6$, $y = 3$; $x = 27 > y$, thoả mãn. Dòng nước chảy $3$ km/h.',
    },
    {
      type: 'number',
      prompt:
        'Hai lớp 9A và 9B quyên góp được $160$ quyển sách. Nếu lớp 9A chuyển $10$ quyển sang lớp 9B thì số sách của hai lớp bằng nhau. Lớp 9A quyên góp được bao nhiêu quyển sách?',
      answer: 90,
      unit: 'quyển',
      hints: ['Gọi $x$, $y$ là số sách của 9A và 9B: $x + y = 160$ và $x - 10 = y + 10$.'],
      solution:
        'Phương trình thứ hai cho $x - y = 20$. Cộng với $x + y = 160$: $2x = 180$, $x = 90$; $y = 70$. Lớp 9A quyên góp $90$ quyển.',
    },
    {
      type: 'number',
      prompt:
        'Mua $2$ áo và $3$ quần hết $1\\,050$ nghìn đồng; mua $3$ áo và $2$ quần hết $1\\,000$ nghìn đồng. Giá một chiếc áo là bao nhiêu nghìn đồng?',
      answer: 180,
      unit: 'nghìn đồng',
      hints: [
        'Gọi $x$, $y$ (nghìn đồng) là giá một áo và một quần: $2x + 3y = 1\\,050$, $3x + 2y = 1\\,000$.',
        'Cộng hai phương trình rồi chia cho $5$; trừ hai phương trình.',
      ],
      solution:
        'Cộng: $5x + 5y = 2\\,050$, nên $x + y = 410$. Trừ phương trình thứ nhất cho thứ hai: $-x + y = 50$. Suy ra $y = 230$, $x = 180$. Một chiếc áo giá $180$ nghìn đồng.',
    },
    {
      type: 'choice',
      prompt:
        'Gọi $x$ là số học sinh của một nhóm. Giải hệ lập được, em tìm ra $x = 12{,}5$. Em nên kết luận thế nào?',
      options: [
        'Làm tròn thành $13$ học sinh.',
        'Lấy phần nguyên, nhóm có $12$ học sinh.',
        'Nghiệm không thoả mãn điều kiện $x \\in \\mathbb{N}$; cần xem lại cách lập hệ hoặc kết luận bài toán không có đáp số.',
        'Nhận $x = 12{,}5$ vì đó là nghiệm của hệ.',
      ],
      answer: 2,
      hints: ['Số học sinh phải là số tự nhiên.'],
      solution:
        'Nghiệm phải thoả mãn điều kiện của ẩn. $12{,}5$ không là số tự nhiên nên bị loại; không được làm tròn để có đáp số.',
    },
  ],
  takeaways: [
    'Ba bước: lập hệ (chọn ẩn, đặt điều kiện, lập hai phương trình), giải hệ, kiểm tra điều kiện rồi trả lời.',
    'Bảng dữ kiện giúp biểu diễn các đại lượng theo ẩn: mỗi hàng là một phương trình.',
    'Ghi rõ đơn vị và điều kiện của ẩn; nghiệm không thoả mãn điều kiện thì loại.',
  ],
};
