/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Lập bảng thống kê từ dãy dữ liệu, đọc biểu đồ tranh và vẽ biểu đồ tranh với chú thích mỗi biểu tượng ứng với bao nhiêu đối tượng.',
  intro:
    'Sau buổi trồng cây, cô tổng phụ trách muốn treo lên bảng tin kết quả của từng lớp sao cho ai đi qua cũng nhìn ra ngay lớp nào trồng nhiều cây nhất. Một dãy số dài khó đọc; một bảng thống kê gọn hơn; còn một biểu đồ tranh với những hình cây nhỏ thì nhìn là thấy. Bài này giúp em lập bảng thống kê, đọc và vẽ biểu đồ tranh.',
  objectives: [
    'Lập được bảng thống kê từ dãy dữ liệu.',
    'Đọc được dữ liệu từ biểu đồ tranh.',
    'Vẽ được biểu đồ tranh: chọn biểu tượng, số đối tượng ứng với một biểu tượng và ghi chú thích.',
  ],
  sections: [
    {
      heading: 'Bảng thống kê',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Bảng thống kê',
          text: 'Bảng thống kê là cách trình bày dữ liệu chi tiết hơn dãy dữ liệu. Bảng thống kê gồm các hàng và cột, thể hiện danh sách các đối tượng thống kê cùng với các dữ liệu tương ứng của đối tượng đó.',
        },
        {
          type: 'p',
          text: 'Điểm kiểm tra Tiếng Anh của $10$ bạn tổ 1 là: $8$; $7$; $9$; $8$; $10$; $6$; $8$; $9$; $7$; $8$. Đếm số lần xuất hiện của mỗi điểm (có thể gạch kiểm đếm), ta được bảng thống kê:',
        },
        {
          type: 'table',
          caption: 'Điểm kiểm tra Tiếng Anh của tổ 1',
          head: ['Điểm', '$6$', '$7$', '$8$', '$9$', '$10$'],
          rows: [['Số bạn', '$1$', '$2$', '$4$', '$2$', '$1$']],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Xác định các đối tượng thống kê (ở đây là các mức điểm $6$, $7$, $8$, $9$, $10$).',
            'Đếm số lần xuất hiện của mỗi đối tượng trong dãy dữ liệu.',
            'Ghi kết quả vào bảng; kiểm tra lại: tổng $1 + 2 + 4 + 2 + 1 = 10$ bằng số bạn của tổ.',
          ],
        },
      ],
    },
    {
      heading: 'Biểu đồ tranh',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biểu đồ tranh',
          text: 'Biểu đồ tranh sử dụng biểu tượng hoặc hình ảnh để biểu diễn dữ liệu. Một biểu tượng có thể thay thế cho một số đối tượng; có thể dùng một phần biểu tượng (chẳng hạn nửa biểu tượng).',
        },
        {
          type: 'p',
          text: 'Để đọc biểu đồ tranh, trước hết xem chú thích: mỗi biểu tượng ứng với bao nhiêu đối tượng. Sau đó lấy số biểu tượng ở mỗi hàng nhân với số đó.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Các bước vẽ biểu đồ tranh',
          text: 'Bước 1. Chọn biểu tượng (hình ảnh) đại diện cho dữ liệu và xác định mỗi biểu tượng ứng với bao nhiêu đối tượng. Bước 2. Một cột (hoặc hàng) ghi danh sách các đối tượng; bên cạnh, vẽ số biểu tượng tương ứng với số liệu của mỗi đối tượng. Bước 3. Ghi tên biểu đồ và chú thích số đối tượng ứng với một biểu tượng.',
        },
        {
          type: 'table',
          caption: 'Số cây trồng được, mỗi biểu tượng ứng với $10$ cây',
          head: ['Lớp', 'Số cây', 'Số biểu tượng cần vẽ'],
          rows: [
            ['6A', '$20$', '$20 : 10 = 2$ biểu tượng'],
            ['6B', '$25$', '$2$ biểu tượng và nửa biểu tượng'],
            ['6C', '$15$', '$1$ biểu tượng và nửa biểu tượng'],
            ['6D', '$30$', '$30 : 10 = 3$ biểu tượng'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Quên chú thích thì người đọc không biết mỗi biểu tượng ứng với bao nhiêu đối tượng. Cần chọn số đối tượng cho một biểu tượng sao cho số liệu chia hết (hoặc chỉ dư nửa biểu tượng); khi số liệu lớn hay lẻ, biểu đồ tranh khó vẽ chính xác.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vẽ biểu đồ tranh từ bảng thống kê',
    instruction:
      'Bảng thống kê cho số cây mỗi lớp trồng được. Chọn mỗi biểu tượng ứng với $5$ hay $10$ cây, rồi kéo hoặc chạm vào hàng của từng lớp để vẽ biểu tượng; có thể chọn một hàng rồi dùng phím mũi tên. Khi mỗi biểu tượng ứng với $10$ cây, chạm nửa trái của một ô để vẽ nửa biểu tượng ($5$ cây); khi mỗi biểu tượng ứng với $5$ cây thì không dùng nửa biểu tượng, vì nửa biểu tượng sẽ ứng với $2{,}5$ cây. Cột "Theo biểu đồ" cho biết số cây mà hàng của em đang biểu diễn.',
  },
  examples: [
    {
      problem:
        'Số quyển vở các bạn lớp 6A mua trong tuần: $3$; $2$; $4$; $3$; $3$; $2$; $5$; $3$; $4$; $2$; $3$; $4$. Lập bảng thống kê.',
      steps: [
        'Các giá trị khác nhau: $2$, $3$, $4$, $5$ quyển.',
        'Đếm: $2$ quyển có $3$ bạn; $3$ quyển có $5$ bạn; $4$ quyển có $3$ bạn; $5$ quyển có $1$ bạn.',
        'Kiểm tra: $3 + 5 + 3 + 1 = 12$, đúng bằng số dữ liệu trong dãy.',
      ],
      answer: 'Bảng thống kê: số quyển $2$, $3$, $4$, $5$ tương ứng với số bạn $3$, $5$, $3$, $1$.',
    },
    {
      problem:
        'Một biểu đồ tranh biểu diễn số quyển sách các tổ quyên góp, mỗi biểu tượng ứng với $4$ quyển. Tổ 1 có $5$ biểu tượng, Tổ 2 có $3$ biểu tượng và nửa biểu tượng, Tổ 3 có $6$ biểu tượng, Tổ 4 có $4$ biểu tượng và nửa biểu tượng. Mỗi tổ góp bao nhiêu quyển? Cả lớp góp bao nhiêu quyển?',
      steps: [
        'Nửa biểu tượng ứng với $4 : 2 = 2$ quyển.',
        'Tổ 1: $5 \\cdot 4 = 20$; Tổ 2: $3 \\cdot 4 + 2 = 14$; Tổ 3: $6 \\cdot 4 = 24$; Tổ 4: $4 \\cdot 4 + 2 = 18$ quyển.',
        'Cả lớp: $20 + 14 + 24 + 18 = 76$ quyển.',
      ],
      answer: 'Các tổ góp lần lượt $20$, $14$, $24$, $18$ quyển; cả lớp góp $76$ quyển.',
    },
    {
      problem:
        'Số bàn thắng của bốn cầu thủ trong một giải đấu: Hùng $6$, Dũng $12$, Minh $9$, Phúc $15$. Vẽ biểu đồ tranh, mỗi biểu tượng quả bóng ứng với $3$ bàn thắng.',
      steps: [
        'Bước 1: chọn biểu tượng quả bóng, mỗi biểu tượng ứng với $3$ bàn.',
        'Số biểu tượng: Hùng $6 : 3 = 2$; Dũng $12 : 3 = 4$; Minh $9 : 3 = 3$; Phúc $15 : 3 = 5$.',
        'Bước 2: ghi tên bốn cầu thủ ở cột đầu, vẽ $2$, $4$, $3$, $5$ quả bóng ở hàng tương ứng.',
        'Bước 3: ghi tên biểu đồ "Số bàn thắng của bốn cầu thủ" và chú thích "mỗi quả bóng ứng với $3$ bàn thắng".',
      ],
      answer: 'Các hàng có lần lượt $2$, $4$, $3$, $5$ biểu tượng quả bóng, kèm tên và chú thích.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Số anh chị em ruột của $12$ bạn trong một tổ là: $1$; $0$; $2$; $1$; $1$; $3$; $0$; $1$; $2$; $1$; $0$; $1$. Trong bảng thống kê, ô ứng với "$1$ anh chị em ruột" ghi bao nhiêu bạn?',
      answer: 6,
      unit: 'bạn',
      hints: ['Đếm số lần số $1$ xuất hiện trong dãy.'],
      solution:
        'Số $1$ xuất hiện ở các vị trí thứ $1$, $4$, $5$, $8$, $10$, $12$, tức $6$ lần. Ô đó ghi $6$ bạn.',
    },
    {
      type: 'number',
      prompt:
        'Trong một biểu đồ tranh, mỗi biểu tượng ứng với $10$ học sinh. Hàng "Đi xe đạp" có $3$ biểu tượng và nửa biểu tượng. Có bao nhiêu học sinh đi xe đạp?',
      answer: 35,
      unit: 'học sinh',
      hints: ['Nửa biểu tượng ứng với một nửa của $10$ học sinh.'],
      solution: '$3 \\cdot 10 + 10 : 2 = 30 + 5 = 35$ học sinh.',
    },
    {
      type: 'number',
      prompt:
        'Vẽ biểu đồ tranh biểu diễn khối lượng giấy vụn các lớp thu được, mỗi biểu tượng ứng với $6$ kg. Lớp 6B thu được $42$ kg. Hàng của lớp 6B cần vẽ bao nhiêu biểu tượng?',
      answer: 7,
      unit: 'biểu tượng',
      hints: ['Chia số kilôgam cho số kilôgam ứng với một biểu tượng.'],
      solution: '$42 : 6 = 7$, nên cần vẽ $7$ biểu tượng.',
    },
    {
      type: 'choice',
      prompt: 'Mỗi biểu tượng ứng với $4$ quyển sách. Để biểu diễn $10$ quyển sách, cần vẽ',
      options: [
        '$2$ biểu tượng và nửa biểu tượng',
        '$2$ biểu tượng',
        '$10$ biểu tượng',
        '$3$ biểu tượng',
      ],
      answer: 0,
      hints: ['$10 = 4 + 4 + 2$; $2$ quyển là mấy phần của một biểu tượng?'],
      solution:
        '$10 = 2 \\cdot 4 + 2$; $2$ quyển là nửa biểu tượng. Cần $2$ biểu tượng và nửa biểu tượng.',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ tranh về loại quả yêu thích của lớp 6C, mỗi biểu tượng ứng với $2$ bạn: Cam có $4$ biểu tượng, Xoài có $6$ biểu tượng và nửa biểu tượng, Ổi có $3$ biểu tượng. Số bạn thích xoài nhiều hơn số bạn thích cam là bao nhiêu?',
      answer: 5,
      unit: 'bạn',
      hints: ['Tính số bạn của từng loại quả trước; nửa biểu tượng ứng với $1$ bạn.'],
      solution:
        'Cam: $4 \\cdot 2 = 8$ bạn; Xoài: $6 \\cdot 2 + 1 = 13$ bạn. Hiệu: $13 - 8 = 5$ bạn.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các phát biểu đúng về biểu đồ tranh.',
      options: [
        'Biểu đồ tranh dùng biểu tượng hoặc hình ảnh để biểu diễn dữ liệu.',
        'Mỗi biểu tượng luôn ứng với đúng một đối tượng.',
        'Cần có chú thích cho biết mỗi biểu tượng ứng với bao nhiêu đối tượng.',
        'Có thể dùng một phần biểu tượng, chẳng hạn nửa biểu tượng.',
      ],
      answers: [0, 2, 3],
      hints: ['Nhớ lại biểu đồ số cây: mỗi biểu tượng có thể ứng với $5$ hay $10$ cây.'],
      solution:
        'Một biểu tượng có thể thay cho nhiều đối tượng, nên phát biểu thứ hai sai. Ba phát biểu còn lại đúng.',
    },
    {
      type: 'number',
      prompt:
        'Bảng thống kê môn thể thao yêu thích của lớp 6A (mỗi bạn chọn một môn): bóng đá $12$, cầu lông $8$, bơi $6$, cờ vua $4$. Lớp 6A có bao nhiêu học sinh?',
      answer: 30,
      unit: 'học sinh',
      hints: ['Mỗi bạn chọn đúng một môn, nên sĩ số là tổng các số trong bảng.'],
      solution: '$12 + 8 + 6 + 4 = 30$ học sinh.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước vẽ biểu đồ tranh theo đúng thứ tự.',
      items: [
        'Ghi tên biểu đồ và chú thích',
        'Chọn biểu tượng và số đối tượng ứng với một biểu tượng',
        'Vẽ số biểu tượng tương ứng ở hàng của mỗi đối tượng',
        'Ghi danh sách các đối tượng ở một cột',
      ],
      answer: [1, 3, 2, 0],
      hints: ['Phải biết mỗi biểu tượng ứng với bao nhiêu đối tượng trước khi vẽ.'],
      solution:
        'Chọn biểu tượng và số đối tượng ứng với một biểu tượng → ghi danh sách các đối tượng → vẽ biểu tượng ở từng hàng → ghi tên biểu đồ và chú thích.',
    },
    {
      type: 'choice',
      prompt:
        'Số học sinh tham gia các câu lạc bộ là $40$, $25$, $35$, $50$. Nên chọn mỗi biểu tượng ứng với bao nhiêu học sinh để biểu đồ tranh gọn và vẽ được chính xác?',
      options: ['$1$ học sinh', '$3$ học sinh', '$10$ học sinh', '$100$ học sinh'],
      answer: 2,
      hints: [
        'Số biểu tượng không nên quá nhiều, và mỗi số liệu phải ứng với số biểu tượng tròn hoặc có nửa biểu tượng.',
      ],
      solution:
        'Với $10$ học sinh mỗi biểu tượng: $4$; $2$ và nửa; $3$ và nửa; $5$ biểu tượng, gọn và chính xác. $1$ học sinh thì phải vẽ quá nhiều biểu tượng; $3$ học sinh không chia được $40$, $25$, $35$, $50$; $100$ học sinh thì mọi hàng chưa tới một biểu tượng.',
    },
  ],
  takeaways: [
    'Bảng thống kê gồm các hàng và cột, ghi các đối tượng và số liệu tương ứng; tổng số liệu phải khớp với số dữ liệu.',
    'Biểu đồ tranh dùng biểu tượng để biểu diễn dữ liệu; mỗi biểu tượng có thể ứng với nhiều đối tượng, có thể dùng nửa biểu tượng.',
    'Đọc biểu đồ tranh: số biểu tượng nhân với số đối tượng ứng với một biểu tượng.',
    'Vẽ biểu đồ tranh: chọn biểu tượng và tỉ lệ, vẽ từng hàng, ghi tên và chú thích.',
  ],
};
