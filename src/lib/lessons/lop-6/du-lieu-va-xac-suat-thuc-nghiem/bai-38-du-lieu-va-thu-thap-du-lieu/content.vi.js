/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Dữ liệu và số liệu, các cách thu thập dữ liệu (quan sát, làm thí nghiệm, lập phiếu hỏi, lấy từ nguồn có sẵn) và cách nhận ra dữ liệu không hợp lí.',
  intro:
    'Cô giáo muốn biết các bạn lớp 6A thường đến trường bằng gì, cao bao nhiêu, thích môn học nào. Những câu trả lời thu được chính là dữ liệu. Bài này giúp em phân biệt dữ liệu là số với dữ liệu không phải là số, biết cách thu thập dữ liệu và biết loại bỏ những câu trả lời không hợp lí trước khi dùng chúng.',
  objectives: [
    'Nhận biết dữ liệu, phân biệt số liệu (dữ liệu là số) với dữ liệu không phải là số.',
    'Biết một số cách thu thập dữ liệu đơn giản: quan sát, làm thí nghiệm, lập phiếu hỏi, lấy từ nguồn có sẵn.',
    'Đánh giá tính hợp lí của dữ liệu theo các tiêu chí đơn giản.',
  ],
  sections: [
    {
      heading: 'Dữ liệu và số liệu',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dữ liệu',
          text: 'Những thông tin thu thập được như số, chữ, hình ảnh, … được gọi là dữ liệu. Dữ liệu là số được gọi là số liệu. Có dữ liệu là số (số liệu) và có dữ liệu không phải là số.',
        },
        {
          type: 'table',
          caption: 'Thời tiết ba ngày liên tiếp do bạn Minh ghi lại',
          head: ['Ngày', 'Nhiệt độ thấp nhất (°C)', 'Nhiệt độ cao nhất (°C)', 'Thời tiết'],
          rows: [
            ['Thứ Hai', '$21$', '$27$', 'Có mưa'],
            ['Thứ Ba', '$20$', '$26$', 'Nhiều mây'],
            ['Thứ Tư', '$22$', '$29$', 'Nắng'],
          ],
        },
        {
          type: 'p',
          text: 'Trong bảng trên, nhiệt độ thấp nhất và nhiệt độ cao nhất là số liệu; tình trạng thời tiết ("Có mưa", "Nhiều mây", "Nắng") là dữ liệu không phải là số.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Dữ liệu viết bằng chữ số chưa chắc đã là số liệu để tính toán. Chẳng hạn số báo danh hay số nhà chỉ dùng để gọi tên, cộng chúng lại không có ý nghĩa gì.',
        },
      ],
    },
    {
      heading: 'Thu thập dữ liệu',
      blocks: [
        {
          type: 'p',
          text: 'Có nhiều cách để thu thập dữ liệu. Ta chọn cách phù hợp với điều cần tìm hiểu.',
        },
        {
          type: 'table',
          head: ['Cách thu thập', 'Ví dụ'],
          rows: [
            ['Quan sát', 'Đứng ở cổng trường đếm số xe đạp đi vào trong 15 phút.'],
            ['Làm thí nghiệm', 'Gieo hạt đậu, mỗi ngày đo chiều cao cây non.'],
            [
              'Lập phiếu hỏi (phiếu khảo sát), phỏng vấn',
              'Phát phiếu hỏi các bạn trong lớp về môn thể thao yêu thích.',
            ],
            [
              'Lấy từ nguồn có sẵn: sách, báo, trang web, …',
              'Tra trên trang web về số dân của các tỉnh, thành phố.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Khi lập phiếu hỏi, câu hỏi cần ngắn gọn, rõ ràng và nên có sẵn các phương án để người trả lời lựa chọn, như vậy dữ liệu thu được sẽ dễ tổng hợp hơn.',
        },
      ],
    },
    {
      heading: 'Tính hợp lí của dữ liệu',
      blocks: [
        {
          type: 'p',
          text: 'Dữ liệu thu được có thể bị ghi nhầm, trả lời sai câu hỏi hoặc có giá trị không thể xảy ra. Trước khi dùng dữ liệu, ta cần kiểm tra xem nó có hợp lí không.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Đánh giá tính hợp lí',
          text: 'Để đánh giá tính hợp lí của dữ liệu, ta đưa ra các tiêu chí đánh giá đơn giản, chẳng hạn dữ liệu phải: đúng định dạng; nằm trong phạm vi dự kiến. Dữ liệu không đạt tiêu chí là dữ liệu không hợp lí.',
        },
        {
          type: 'list',
          items: [
            'Danh sách "món ăn yêu thích" có "Rượu vang": không hợp lí vì đó là đồ uống, không phải món ăn (sai định dạng).',
            'Số anh chị em ruột là $2{,}5$: không hợp lí vì số người phải là số tự nhiên.',
            'Chiều cao của một học sinh lớp 6 là $15$ m: không hợp lí vì nằm ngoài phạm vi dự kiến.',
            'Lớp có $35$ học sinh, mỗi bạn chọn một môn thể thao, nhưng tổng số bạn trong bảng là $38$: bảng không hợp lí.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Một giá trị khác hẳn các giá trị còn lại chưa chắc là sai, nhưng là dấu hiệu cần kiểm tra lại. Còn giá trị không thể xảy ra (điểm $12$ trong thang điểm $10$, thời gian âm) thì chắc chắn không hợp lí.',
        },
      ],
    },
  ],
  explore: {
    title: 'Khảo sát ảo trong lớp 6A',
    instruction:
      'Lớp 6A trả lời một phiếu hỏi. Chọn từng thẻ câu trả lời rồi chọn ô phù hợp: số liệu hợp lí, dữ liệu không phải số hợp lí, hoặc câu trả lời không hợp lí cần loại bỏ. Mỗi lần đặt thẻ, em sẽ được biết vì sao đúng hay sai. Dùng hai tiêu chí: đúng định dạng và nằm trong phạm vi dự kiến.',
  },
  examples: [
    {
      problem:
        'Bạn An ghi lại thông tin về một bạn trong lớp: tên Mai, $12$ tuổi, cao $145$ cm, thích màu xanh, nặng $37$ kg, đến trường bằng xe buýt. Hãy cho biết dữ liệu nào là số liệu, dữ liệu nào không phải là số.',
      steps: [
        'Các dữ liệu là số: tuổi ($12$), chiều cao ($145$ cm), cân nặng ($37$ kg). Đó là số liệu.',
        'Các dữ liệu không phải là số: tên (Mai), màu yêu thích (xanh), phương tiện (xe buýt).',
      ],
      answer:
        'Số liệu: tuổi, chiều cao, cân nặng. Không phải số: tên, màu yêu thích, phương tiện đến trường.',
    },
    {
      problem:
        'Lớp 6B có $40$ học sinh, mỗi bạn chọn đúng một phương tiện đến trường. Bạn lớp trưởng lập bảng: đi bộ $12$ bạn, xe đạp $15$ bạn, xe buýt $6$ bạn, bố mẹ đưa đón $9$ bạn. Bảng này có hợp lí không?',
      steps: [
        'Mỗi bạn chọn đúng một phương tiện, nên tổng số bạn trong bảng phải bằng sĩ số $40$.',
        'Tổng số bạn trong bảng: $12 + 15 + 6 + 9 = 42$.',
        '$42 > 40$, nên có ít nhất một ô bị ghi sai.',
      ],
      answer: 'Bảng không hợp lí vì tổng $42$ bạn lớn hơn sĩ số $40$ của lớp.',
    },
    {
      problem:
        'Hãy chọn cách thu thập dữ liệu phù hợp: a) Số dân của các tỉnh Tây Nguyên; b) Loại quả yêu thích của các bạn trong lớp; c) Số ô tô đi qua cổng trường từ 6 giờ 30 đến 7 giờ sáng.',
      steps: [
        'a) Số dân các tỉnh đã được thống kê và công bố, nên lấy từ nguồn có sẵn (sách, báo, trang web).',
        'b) Đây là ý kiến của từng bạn, nên lập phiếu hỏi hoặc phỏng vấn.',
        'c) Đây là việc đang diễn ra, nên quan sát và đếm trực tiếp.',
      ],
      answer: 'a) Nguồn có sẵn; b) Lập phiếu hỏi; c) Quan sát.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn tất cả các dữ liệu là số liệu.',
      options: [
        'Cân nặng của bạn Hà: $38$ kg',
        'Môn học yêu thích của bạn Hà: Lịch sử',
        'Số bạn nữ của lớp 6A: $18$',
        'Màu áo đồng phục: trắng',
        'Chiều dài sân trường: $60$ m',
      ],
      answers: [0, 2, 4],
      hints: ['Số liệu là dữ liệu được ghi bằng số, như cân nặng, số lượng, độ dài.'],
      solution:
        'Cân nặng $38$ kg, số bạn nữ $18$, chiều dài $60$ m là số liệu. Môn học và màu áo là dữ liệu không phải là số.',
    },
    {
      type: 'choice',
      prompt:
        'Để biết loại đồ ăn sáng mà các bạn trong lớp yêu thích, cách thu thập dữ liệu phù hợp nhất là',
      options: ['lập phiếu hỏi', 'làm thí nghiệm', 'tra trên trang web', 'đo bằng thước'],
      answer: 0,
      hints: ['Đây là ý thích của từng bạn: muốn biết thì phải hỏi chính các bạn ấy.'],
      solution:
        'Ý thích của các bạn chỉ biết được bằng cách hỏi, nên lập phiếu hỏi (hoặc phỏng vấn) là phù hợp nhất.',
    },
    {
      type: 'text',
      prompt:
        'Bạn Nam liệt kê các nước ở châu Á: Việt Nam, Lào, Nhật Bản, Pháp, Thái Lan. Dữ liệu nào không hợp lí? (Viết tên nước.)',
      accept: ['Pháp', 'nước Pháp'],
      hints: ['Kiểm tra từng nước có nằm ở châu Á không.'],
      solution:
        'Pháp là một nước ở châu Âu, không phải châu Á, nên dữ liệu "Pháp" không hợp lí. Các nước còn lại đều ở châu Á.',
    },
    {
      type: 'number',
      prompt:
        'Điểm kiểm tra môn Toán (thang điểm 10) của một tổ được ghi lại là: $8$; $6$; $10$; $12$; $7$; $9$; $15$; $5$. Có bao nhiêu giá trị không hợp lí?',
      answer: 2,
      hints: [
        'Điểm theo thang 10 phải nằm trong phạm vi từ $0$ đến $10$.',
        'Đếm các giá trị lớn hơn $10$.',
      ],
      solution:
        'Hai giá trị $12$ và $15$ lớn hơn $10$ nên không hợp lí. Có $2$ giá trị không hợp lí.',
    },
    {
      type: 'number',
      prompt:
        'Lớp 6C có $36$ học sinh, mỗi bạn chọn đúng một môn thể thao. Bảng thống kê ghi: bóng đá $11$ bạn, cầu lông $9$ bạn, bơi $7$ bạn, cờ vua ? bạn. Số ở ô "?" phải bằng bao nhiêu thì bảng hợp lí?',
      answer: 9,
      unit: 'bạn',
      hints: [
        'Tổng số bạn trong bảng phải bằng sĩ số lớp.',
        'Lấy $36$ trừ đi số bạn của ba môn đã biết.',
      ],
      solution: 'Ba môn đã biết có $11 + 9 + 7 = 27$ bạn. Ô còn lại: $36 - 27 = 9$ bạn.',
    },
    {
      type: 'choice',
      prompt:
        'Năm bạn cùng đo khối lượng của một quả cam và được các kết quả (gam): $152$; $150$; $1\\,510$; $151$; $153$. Kết quả nào không hợp lí?',
      options: ['$150$', '$153$', '$1\\,510$', '$152$'],
      answer: 2,
      hints: [
        'Một quả cam nặng khoảng bao nhiêu gam? Có kết quả nào khác hẳn các kết quả còn lại?',
      ],
      solution:
        'Các kết quả $150$ đến $153$ g gần nhau và hợp lí. $1\\,510$ g (hơn $1{,}5$ kg) gấp khoảng $10$ lần, có lẽ bạn đã ghi thừa một chữ số, nên không hợp lí.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi việc cần tìm hiểu với cách thu thập dữ liệu phù hợp.',
      left: [
        'Số học sinh đi học muộn trong một tuần',
        'Cây đậu lớn thêm bao nhiêu mỗi ngày',
        'Diện tích của các tỉnh miền Trung',
        'Ca sĩ mà các bạn trong lớp yêu thích',
      ],
      right: ['Quan sát, ghi chép', 'Làm thí nghiệm', 'Lấy từ nguồn có sẵn', 'Lập phiếu hỏi'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Việc đang diễn ra thì quan sát; điều cần đo qua thời gian thì làm thí nghiệm; số liệu đã công bố thì tra cứu; ý kiến thì hỏi.',
      ],
      solution:
        'Đi học muộn: quan sát, ghi chép ở cổng trường. Cây đậu: trồng và đo (thí nghiệm). Diện tích các tỉnh: tra sách, trang web. Ca sĩ yêu thích: lập phiếu hỏi.',
    },
    {
      type: 'multi',
      prompt:
        'Phiếu hỏi "Em có bao nhiêu anh chị em ruột?" thu được các câu trả lời dưới đây. Chọn tất cả các câu trả lời không hợp lí.',
      options: ['$0$', '$3$', '$1{,}5$', 'Nhiều', '$2$'],
      answers: [2, 3],
      hints: ['Câu trả lời phải là một số tự nhiên.'],
      solution:
        '$1{,}5$ không phải số tự nhiên; "Nhiều" không phải là số nên sai định dạng. Hai câu trả lời đó không hợp lí; $0$, $2$, $3$ đều hợp lí.',
    },
  ],
  takeaways: [
    'Thông tin thu thập được (số, chữ, hình ảnh, …) là dữ liệu; dữ liệu là số gọi là số liệu.',
    'Có thể thu thập dữ liệu bằng quan sát, làm thí nghiệm, lập phiếu hỏi hoặc lấy từ nguồn có sẵn.',
    'Dữ liệu hợp lí phải đúng định dạng và nằm trong phạm vi dự kiến; dữ liệu không hợp lí cần được loại bỏ hoặc kiểm tra lại.',
  ],
};
