/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn lại bảng thống kê, biểu đồ tranh, biểu đồ cột, cột kép, hình quạt tròn và đoạn thẳng; chọn dạng biểu diễn phù hợp với mục đích và chuyển dữ liệu từ dạng này sang dạng khác.',
  intro:
    'Cùng một bảng số liệu có thể vẽ thành nhiều loại biểu đồ, nhưng không phải loại nào cũng nói rõ điều ta muốn nói. Muốn thấy nhiệt độ lên xuống theo tháng, muốn so sánh số cây các lớp trồng được hay muốn biết mỗi món ăn chiếm bao nhiêu phần trăm số bạn trong lớp, mỗi việc cần một loại biểu đồ riêng. Bài này giúp em chọn đúng loại và chuyển qua lại giữa bảng và biểu đồ.',
  objectives: [
    'Nhận biết mục đích biểu diễn của bảng thống kê và từng loại biểu đồ đã học.',
    'Lựa chọn dạng biểu đồ phù hợp để biểu diễn một tập dữ liệu.',
    'Chuyển dữ liệu từ bảng sang biểu đồ và từ biểu đồ sang bảng.',
  ],
  sections: [
    {
      heading: 'Các dạng biểu diễn dữ liệu',
      blocks: [
        {
          type: 'p',
          text: 'Ở các lớp dưới, em đã biết biểu diễn dữ liệu bằng bảng thống kê và bằng năm loại biểu đồ. Mỗi loại có thế mạnh riêng.',
        },
        {
          type: 'table',
          head: ['Dạng biểu diễn', 'Dùng khi muốn'],
          rows: [
            ['Bảng thống kê', 'Ghi lại chính xác từng số liệu để tra cứu, tính toán.'],
            [
              'Biểu đồ tranh',
              'Biểu diễn số lượng (số đếm) một cách sinh động, trực quan; mỗi biểu tượng ứng với một số lượng nhất định.',
            ],
            ['Biểu đồ cột', 'So sánh số lượng (giá trị) của các đối tượng khác nhau.'],
            ['Biểu đồ cột kép', 'So sánh từng cặp số liệu của hai tập dữ liệu cùng loại.'],
            ['Biểu đồ hình quạt tròn', 'Biểu diễn tỉ lệ phần trăm của các phần so với toàn thể.'],
            [
              'Biểu đồ đoạn thẳng',
              'Biểu diễn sự thay đổi của một đại lượng theo thời gian, nhất là khi có nhiều thời điểm.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chọn biểu đồ theo mục đích',
          text: 'Trước khi vẽ, hãy hỏi: "Mình muốn người xem thấy điều gì?" So sánh các đối tượng: biểu đồ cột (hoặc tranh). So sánh hai tập dữ liệu: biểu đồ cột kép. Tỉ lệ các phần trong toàn thể: biểu đồ hình quạt tròn. Xu hướng theo thời gian: biểu đồ đoạn thẳng.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Chỉ dùng biểu đồ hình quạt tròn khi các phần ghép lại thành một toàn thể (tổng là $100\\%$). Chỉ dùng biểu đồ đoạn thẳng khi trục ngang là các thời điểm theo thứ tự.',
        },
      ],
    },
    {
      heading: 'Chuyển đổi giữa bảng và biểu đồ',
      blocks: [
        {
          type: 'list',
          items: [
            'Từ bảng sang biểu đồ cột (đoạn thẳng): chọn tỉ lệ trên trục đứng, mỗi đối tượng (thời điểm) ứng với một cột (một điểm) có chiều cao bằng số liệu.',
            'Từ bảng sang biểu đồ hình quạt tròn: tính tỉ lệ phần trăm của mỗi phần, $\\text{tỉ lệ} = \\dfrac{\\text{số liệu của phần}}{\\text{tổng}} \\cdot 100\\%$, rồi chia hình tròn theo các tỉ lệ đó.',
            'Từ biểu đồ tranh sang bảng: số liệu $=$ số biểu tượng $\\times$ giá trị của mỗi biểu tượng (nửa biểu tượng ứng với nửa giá trị).',
            'Từ biểu đồ hình quạt tròn sang số lượng: $\\text{số lượng} = \\text{tổng} \\cdot \\dfrac{a}{100}$, với $a\\%$ là tỉ lệ của phần đó.',
          ],
        },
        {
          type: 'p',
          text: 'Hãy tự vẽ hai biểu đồ từ hai bảng dưới đây. Với biểu đồ quạt, em phải tính tỉ lệ phần trăm trước khi kéo.',
        },
        { type: 'widget', name: 've-bieu-do' },
      ],
    },
  ],
  explore: {
    title: 'Một bộ dữ liệu, bốn loại biểu đồ',
    instruction:
      'Chọn một bộ dữ liệu và đọc mục đích của nó. Lần lượt chọn biểu đồ tranh, cột, quạt tròn, đoạn thẳng để xem dữ liệu được vẽ thế nào, rồi đọc nhận xét để biết loại nào phù hợp nhất.',
  },
  examples: [
    {
      problem:
        'Bảng sau cho biết cân nặng (gần đúng) của thai nhi theo tuần tuổi: tuần $20$: $300$ g; tuần $24$: $600$ g; tuần $28$: $1\\,000$ g; tuần $32$: $1\\,700$ g; tuần $36$: $2\\,600$ g; tuần $40$: $3\\,400$ g. Nên dùng biểu đồ nào để biểu diễn bảng này?',
      steps: [
        'Dữ liệu là cân nặng của cùng một thai nhi ở các thời điểm khác nhau: một đại lượng thay đổi theo thời gian.',
        'Cân nặng các tuần không phải các phần của một toàn thể, nên không dùng biểu đồ hình quạt tròn.',
        'Biểu đồ đoạn thẳng cho thấy rõ cân nặng tăng dần và tăng nhanh hơn ở những tuần cuối.',
      ],
      answer: 'Dùng biểu đồ đoạn thẳng.',
    },
    {
      problem:
        'Lớp 8D có $25$ học sinh bình chọn nơi tham quan (mỗi bạn chọn một nơi): bảo tàng $10$ bạn, vườn quốc gia $8$ bạn, làng nghề $5$ bạn, công viên nước $2$ bạn. Tính tỉ lệ phần trăm của mỗi nơi để vẽ biểu đồ hình quạt tròn.',
      steps: [
        'Bốn nơi là bốn phần của cả lớp, tổng $10 + 8 + 5 + 2 = 25$ bạn, nên dùng được biểu đồ hình quạt tròn.',
        'Bảo tàng: $\\dfrac{10}{25} \\cdot 100\\% = 40\\%$; vườn quốc gia: $\\dfrac{8}{25} \\cdot 100\\% = 32\\%$.',
        'Làng nghề: $\\dfrac{5}{25} \\cdot 100\\% = 20\\%$; công viên nước: $\\dfrac{2}{25} \\cdot 100\\% = 8\\%$.',
        'Kiểm tra: $40\\% + 32\\% + 20\\% + 8\\% = 100\\%$.',
      ],
      answer: 'Bảo tàng $40\\%$, vườn quốc gia $32\\%$, làng nghề $20\\%$, công viên nước $8\\%$.',
    },
    {
      problem:
        'Trong một biểu đồ tranh, mỗi biểu tượng ứng với $10$ cây. Lớp 8A có $4$ biểu tượng, lớp 8B có $3$ biểu tượng và nửa biểu tượng, lớp 8C có $5$ biểu tượng. Lập bảng thống kê số cây mỗi lớp trồng được.',
      steps: [
        'Lớp 8A: $4 \\cdot 10 = 40$ (cây).',
        'Lớp 8B: $3 \\cdot 10 + 5 = 35$ (cây), vì nửa biểu tượng ứng với $5$ cây.',
        'Lớp 8C: $5 \\cdot 10 = 50$ (cây).',
      ],
      answer: 'Bảng: 8A: $40$ cây; 8B: $35$ cây; 8C: $50$ cây.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Để biểu diễn tỉ lệ phần trăm các khoản chi tiêu (ăn uống, học tập, đi lại, khác) trong tổng chi tiêu một tháng của gia đình, nên dùng biểu đồ nào?',
      options: ['Biểu đồ tranh', 'Biểu đồ cột', 'Biểu đồ hình quạt tròn', 'Biểu đồ đoạn thẳng'],
      answer: 2,
      hints: ['Các khoản chi tiêu ghép lại thành gì?'],
      solution:
        'Các khoản chi tiêu là các phần của tổng chi tiêu, và ta cần tỉ lệ phần trăm của từng phần so với toàn thể, nên dùng biểu đồ hình quạt tròn.',
    },
    {
      type: 'choice',
      prompt:
        'Để biểu diễn lượng mưa (mm) của một thành phố trong $12$ tháng và thấy rõ mùa mưa, mùa khô, nên dùng biểu đồ nào?',
      options: ['Biểu đồ tranh', 'Biểu đồ hình quạt tròn', 'Biểu đồ đoạn thẳng'],
      answer: 2,
      hints: ['Trục ngang là gì: các đối tượng hay các thời điểm?'],
      solution:
        'Lượng mưa thay đổi theo thời gian qua $12$ tháng (nhiều thời điểm), nên dùng biểu đồ đoạn thẳng để thấy tháng nào mưa tăng, tháng nào mưa giảm.',
    },
    {
      type: 'choice',
      prompt:
        'Để so sánh điểm trung bình các môn Toán, Ngữ văn, Tiếng Anh của lớp 8A với lớp 8B, nên dùng biểu đồ nào?',
      options: ['Biểu đồ cột kép', 'Biểu đồ hình quạt tròn', 'Biểu đồ tranh', 'Biểu đồ đoạn thẳng'],
      answer: 0,
      hints: ['Có bao nhiêu tập dữ liệu cần so sánh với nhau?'],
      solution:
        'Có hai tập dữ liệu cùng loại (điểm của lớp 8A và của lớp 8B) cần so sánh theo từng môn, nên dùng biểu đồ cột kép.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi mục đích với loại biểu đồ phù hợp nhất.',
      left: [
        'So sánh số học sinh của các câu lạc bộ',
        'Theo dõi chiều cao của một cây đậu qua từng ngày',
        'Cho biết tỉ lệ học sinh giỏi, khá, đạt, chưa đạt của khối 8',
        'So sánh số nam và số nữ ở từng lớp',
      ],
      right: ['Biểu đồ cột', 'Biểu đồ đoạn thẳng', 'Biểu đồ hình quạt tròn', 'Biểu đồ cột kép'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'So sánh, thay đổi theo thời gian, tỉ lệ trong toàn thể, hay so sánh hai tập dữ liệu?',
      ],
      solution:
        'So sánh các đối tượng: cột. Thay đổi theo thời gian: đoạn thẳng. Tỉ lệ các phần trong toàn thể: hình quạt tròn. So sánh hai tập dữ liệu (nam, nữ) theo từng lớp: cột kép.',
    },
    {
      type: 'number',
      prompt:
        'Trong một biểu đồ tranh, mỗi biểu tượng ứng với $4$ học sinh. Hàng "Bơi lội" có $6$ biểu tượng và nửa biểu tượng. Có bao nhiêu học sinh chọn bơi lội?',
      answer: 26,
      unit: 'học sinh',
      hints: ['Nửa biểu tượng ứng với nửa của $4$ học sinh.'],
      solution: '$6 \\cdot 4 + 2 = 26$ (học sinh).',
    },
    {
      type: 'number',
      prompt:
        'Khảo sát $50$ học sinh, có $18$ bạn thích đọc truyện tranh. Khi vẽ biểu đồ hình quạt tròn, phần "Truyện tranh" chiếm bao nhiêu phần trăm?',
      answer: 36,
      unit: '%',
      hints: ['Tỉ lệ $= \\dfrac{\\text{số bạn}}{\\text{tổng}} \\cdot 100\\%$.'],
      solution: '$\\dfrac{18}{50} \\cdot 100\\% = 36\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ hình quạt tròn về phương tiện đến trường của $40$ học sinh lớp 8A cho biết phần "Xe buýt" chiếm $15\\%$. Có bao nhiêu học sinh đi xe buýt?',
      answer: 6,
      unit: 'học sinh',
      hints: ['Số học sinh $= 40 \\cdot \\dfrac{15}{100}$.'],
      solution: 'Số học sinh đi xe buýt: $40 \\cdot \\dfrac{15}{100} = 6$ (học sinh).',
    },
    {
      type: 'number',
      prompt:
        'Muốn vẽ biểu đồ tranh với mỗi biểu tượng ứng với $4$ quyển sách, lớp có $30$ quyển sách cần vẽ bao nhiêu biểu tượng?',
      answer: 7.5,
      hints: ['Chia số sách cho giá trị của một biểu tượng.'],
      solution: '$30 : 4 = 7{,}5$: vẽ $7$ biểu tượng và nửa biểu tượng.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn An vẽ biểu đồ hình quạt tròn biểu diễn nhiệt độ trung bình của $12$ tháng. Vì sao cách làm này không phù hợp?',
      options: [
        'Vì có quá ít tháng',
        'Vì nhiệt độ các tháng không phải các phần của một toàn thể',
        'Vì nhiệt độ là số thập phân',
        'Vì biểu đồ hình quạt tròn chỉ có tối đa ba phần',
      ],
      answer: 1,
      hints: ['Tổng nhiệt độ của $12$ tháng có ý nghĩa gì không?'],
      solution:
        'Biểu đồ hình quạt tròn biểu diễn các phần của một toàn thể. Cộng nhiệt độ của $12$ tháng không cho một "toàn thể" có ý nghĩa, nên không dùng biểu đồ này; nên dùng biểu đồ đoạn thẳng.',
    },
  ],
  takeaways: [
    'Biểu đồ cột (tranh) để so sánh các đối tượng; cột kép để so sánh hai tập dữ liệu.',
    'Biểu đồ hình quạt tròn cho tỉ lệ các phần trong một toàn thể; biểu đồ đoạn thẳng cho sự thay đổi theo thời gian.',
    'Tỉ lệ phần trăm $= \\dfrac{\\text{số liệu}}{\\text{tổng}} \\cdot 100\\%$; số lượng $= \\text{tổng} \\cdot \\dfrac{a}{100}$.',
    'Biểu đồ tranh: số liệu $=$ số biểu tượng $\\times$ giá trị mỗi biểu tượng.',
  ],
};
