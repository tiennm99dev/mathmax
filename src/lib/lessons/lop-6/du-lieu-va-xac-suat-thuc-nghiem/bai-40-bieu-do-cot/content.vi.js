/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đọc biểu đồ cột (trục ngang ghi các đối tượng, chiều cao cột ứng với số liệu trên trục dọc) và ba bước vẽ biểu đồ cột từ bảng thống kê.',
  intro:
    'Khi số liệu lớn, chẳng hạn $45$ hay $50$ học sinh, vẽ biểu đồ tranh sẽ mất rất nhiều biểu tượng. Thay vào đó ta dùng những cột hình chữ nhật: cột càng cao, số liệu càng lớn. Đó là biểu đồ cột, giúp ta so sánh các số liệu chỉ bằng một cái nhìn.',
  objectives: [
    'Đọc và mô tả được dữ liệu từ biểu đồ cột.',
    'Vẽ được biểu đồ cột từ bảng thống kê theo ba bước.',
    'Nhận xét, so sánh các số liệu dựa vào biểu đồ cột.',
  ],
  sections: [
    {
      heading: 'Đọc biểu đồ cột',
      blocks: [
        {
          type: 'p',
          text: 'Biểu đồ cột dưới đây cho biết số học sinh khối 6 của một trường tham gia các câu lạc bộ (mỗi bạn tham gia một câu lạc bộ).',
        },
        { type: 'widget', name: 'clubs' },
        {
          type: 'list',
          items: [
            'Trục ngang ghi danh sách các đối tượng: năm câu lạc bộ.',
            'Trục dọc ghi số liệu (số học sinh), các vạch chia cách đều nhau, mỗi khoảng chia ứng với $10$ học sinh.',
            'Mỗi đối tượng ứng với một cột; chiều cao của cột cho biết số liệu của đối tượng đó.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Để đọc số liệu của một cột, ta dóng ngang đỉnh cột sang trục dọc. Cột "Tiếng Anh" có đỉnh ở giữa vạch $40$ và vạch $50$, ứng với $45$ học sinh.',
        },
      ],
    },
    {
      heading: 'Vẽ biểu đồ cột',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Các bước vẽ biểu đồ cột',
          text: 'Bước 1. Vẽ hai trục ngang và dọc vuông góc với nhau. Trục ngang ghi danh sách các đối tượng; trục dọc chọn khoảng chia thích hợp với dữ liệu và ghi số ở các vạch chia. Bước 2. Tại vị trí các đối tượng trên trục ngang, vẽ các cột hình chữ nhật cách đều nhau, có cùng chiều rộng, có chiều cao thể hiện số liệu của các đối tượng, tương ứng với khoảng chia trên trục dọc. Bước 3. Đặt tên cho biểu đồ, ghi chú thích cho các trục và các cột (nếu cần).',
        },
        {
          type: 'table',
          caption: 'Số sách thư viện cho mượn trong một tuần',
          head: ['Ngày', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'],
          rows: [['Số sách', '$30$', '$45$', '$25$', '$40$', '$35$']],
        },
        {
          type: 'p',
          text: 'Số liệu lớn nhất là $45$, nên trục dọc có thể chia từ $0$ đến $50$, mỗi khoảng chia ứng với $5$ quyển. Cột "Thứ Ba" cao $9$ khoảng chia, cột "Thứ Tư" cao $5$ khoảng chia.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Các khoảng chia trên trục dọc phải bằng nhau và bắt đầu từ $0$. Các cột phải cùng chiều rộng: chỉ chiều cao của cột mới thể hiện số liệu.',
        },
      ],
    },
  ],
  explore: {
    title: 'Biểu đồ cột và bảng số liệu',
    instruction:
      'Ở chế độ "Hai chiều", kéo đỉnh một cột (hoặc chọn cột rồi dùng phím mũi tên) hay sửa một ô trong bảng: bên kia cập nhật theo, phần "Đọc biểu đồ" cho biết cột cao nhất, thấp nhất và tổng. Ở chế độ "Vẽ từ bảng", kéo các cột cho đúng với bảng của lớp 6A.',
  },
  examples: [
    {
      problem:
        'Dựa vào biểu đồ câu lạc bộ ở mục 1: Câu lạc bộ nào đông nhất, câu lạc bộ nào ít người nhất? Khối 6 có tất cả bao nhiêu học sinh?',
      steps: [
        'Cột cao nhất là "Thể thao" ($50$ học sinh); cột thấp nhất là "Mĩ thuật" ($20$ học sinh).',
        'Mỗi bạn tham gia một câu lạc bộ, nên số học sinh khối 6 bằng tổng các số liệu.',
        '$35 + 45 + 20 + 25 + 50 = 175$.',
      ],
      answer: 'Đông nhất: Thể thao; ít nhất: Mĩ thuật. Khối 6 có $175$ học sinh.',
    },
    {
      problem: 'Vẽ biểu đồ cột biểu diễn bảng "Số sách thư viện cho mượn trong một tuần" ở mục 2.',
      steps: [
        'Bước 1: Vẽ trục ngang ghi Thứ Hai, Thứ Ba, Thứ Tư, Thứ Năm, Thứ Sáu; trục dọc ghi $0$, $5$, $10$, …, $50$ (mỗi khoảng chia $5$ quyển).',
        'Bước 2: Vẽ năm cột cách đều, cùng chiều rộng, cao lần lượt $30$, $45$, $25$, $40$, $35$ (tức $6$, $9$, $5$, $8$, $7$ khoảng chia).',
        'Bước 3: Ghi tên biểu đồ "Số sách thư viện cho mượn trong một tuần", ghi "Ngày" ở trục ngang và "Số sách" ở trục dọc.',
      ],
      answer:
        'Biểu đồ có năm cột cao $30$, $45$, $25$, $40$, $35$ quyển, kèm tên biểu đồ và chú thích hai trục.',
    },
    {
      problem:
        'Từ bảng số sách ở mục 2, ngày nào thư viện cho mượn nhiều sách nhất? Ngày đó nhiều hơn ngày ít nhất bao nhiêu quyển?',
      steps: [
        'Cột cao nhất là Thứ Ba ($45$ quyển), cột thấp nhất là Thứ Tư ($25$ quyển).',
        'Chênh lệch: $45 - 25 = 20$ quyển.',
      ],
      answer: 'Thứ Ba; nhiều hơn Thứ Tư $20$ quyển.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Theo biểu đồ câu lạc bộ ở mục 1, câu lạc bộ Tiếng Anh có bao nhiêu học sinh?',
      answer: 45,
      unit: 'học sinh',
      hints: ['Dóng ngang đỉnh cột "Tiếng Anh" sang trục dọc.'],
      solution: 'Đỉnh cột "Tiếng Anh" ở giữa vạch $40$ và $50$, ứng với $45$ học sinh.',
    },
    {
      type: 'text',
      prompt: 'Theo biểu đồ câu lạc bộ ở mục 1, câu lạc bộ nào có ít học sinh nhất?',
      accept: [
        'Mĩ thuật',
        'Mỹ thuật',
        'câu lạc bộ Mĩ thuật',
        'câu lạc bộ Mỹ thuật',
        'CLB Mĩ thuật',
      ],
      hints: ['Tìm cột thấp nhất.'],
      solution: 'Cột thấp nhất là "Mĩ thuật" với $20$ học sinh.',
    },
    {
      type: 'number',
      prompt:
        'Theo biểu đồ câu lạc bộ ở mục 1, số học sinh câu lạc bộ Thể thao nhiều hơn câu lạc bộ Âm nhạc bao nhiêu?',
      answer: 25,
      unit: 'học sinh',
      hints: ['Đọc chiều cao hai cột rồi lấy hiệu.'],
      solution: 'Thể thao $50$, Âm nhạc $25$: $50 - 25 = 25$ học sinh.',
    },
    {
      type: 'number',
      prompt:
        'Theo biểu đồ câu lạc bộ ở mục 1, tổng số học sinh của hai câu lạc bộ Toán và Tiếng Anh nhiều hơn số học sinh câu lạc bộ Thể thao bao nhiêu?',
      answer: 30,
      unit: 'học sinh',
      hints: ['Cộng hai cột Toán và Tiếng Anh trước.'],
      solution: 'Toán và Tiếng Anh: $35 + 45 = 80$ học sinh. $80 - 50 = 30$ học sinh.',
    },
    {
      type: 'choice',
      prompt:
        'Trục dọc của một biểu đồ cột bắt đầu từ $0$, mỗi khoảng chia ứng với $5$ học sinh. Một cột cao đúng $7$ khoảng chia. Cột đó biểu diễn bao nhiêu học sinh?',
      options: ['$7$', '$12$', '$35$', '$40$'],
      answer: 2,
      hints: ['Mỗi khoảng chia là $5$ học sinh; có $7$ khoảng chia như vậy.'],
      solution: '$7 \\cdot 5 = 35$ học sinh.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các việc khi vẽ biểu đồ cột theo đúng thứ tự.',
      items: [
        'Vẽ các cột cách đều, cùng chiều rộng, cao bằng số liệu',
        'Đặt tên biểu đồ, ghi chú thích các trục',
        'Vẽ hai trục vuông góc, ghi các đối tượng và chọn khoảng chia trên trục dọc',
      ],
      answer: [2, 0, 1],
      hints: ['Phải có trục và khoảng chia thì mới biết cột cao bao nhiêu.'],
      solution:
        'Bước 1: vẽ hai trục và chọn khoảng chia. Bước 2: vẽ các cột. Bước 3: đặt tên và ghi chú thích.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các yêu cầu đúng khi vẽ biểu đồ cột.',
      options: [
        'Các cột cách đều nhau và có cùng chiều rộng.',
        'Chiều cao của mỗi cột thể hiện số liệu của đối tượng đó.',
        'Đối tượng có số liệu lớn hơn thì vẽ cột rộng hơn.',
        'Các khoảng chia trên trục dọc có thể dài ngắn khác nhau.',
      ],
      answers: [0, 1],
      hints: ['Trong biểu đồ cột, chỉ một kích thước của cột mang thông tin.'],
      solution:
        'Các cột cách đều, cùng chiều rộng, chiều cao thể hiện số liệu. Không vẽ cột rộng hơn cho số lớn hơn, và các khoảng chia trên trục dọc phải bằng nhau.',
    },
    {
      type: 'choice',
      prompt:
        'Số lượt khách tham quan bảo tàng trong bốn tuần là $1\\,250$; $980$; $1\\,430$; $1\\,175$. Nên biểu diễn các số liệu này bằng',
      options: [
        'biểu đồ cột',
        'biểu đồ tranh, mỗi biểu tượng ứng với $1$ lượt khách',
        'dãy dữ liệu không sắp xếp',
        'biểu đồ tranh với các biểu tượng khác nhau cho mỗi tuần',
      ],
      answer: 0,
      hints: ['Số liệu lớn và không tròn thì biểu đồ tranh khó vẽ chính xác.'],
      solution:
        'Các số liệu lớn, lẻ đến hàng đơn vị; biểu đồ tranh sẽ cần hàng nghìn biểu tượng hoặc không biểu diễn chính xác được. Biểu đồ cột là phù hợp.',
    },
  ],
  takeaways: [
    'Biểu đồ cột: trục ngang ghi các đối tượng, trục dọc ghi số liệu với các khoảng chia đều; chiều cao mỗi cột thể hiện số liệu.',
    'Vẽ biểu đồ cột: (1) vẽ hai trục, chọn khoảng chia; (2) vẽ các cột cách đều, cùng chiều rộng, cao đúng số liệu; (3) đặt tên, ghi chú thích.',
    'Biểu đồ cột giúp so sánh nhanh các số liệu: cột cao nhất, thấp nhất, chênh lệch và tổng.',
  ],
};
