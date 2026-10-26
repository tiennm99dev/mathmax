/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương V: hệ thống hoá thu thập, phân loại dữ liệu, biểu đồ hình quạt tròn, biểu đồ đoạn thẳng, kèm bài trắc nghiệm, tự luận và bài toán thực tế.',
  intro:
    'Chương V giúp em đi trọn một vòng làm việc với dữ liệu: thu thập, phân loại, kiểm tra tính đại diện, rồi biểu diễn bằng biểu đồ hình quạt tròn hoặc biểu đồ đoạn thẳng và đọc ra thông tin. Bài tập cuối chương ôn lại tất cả, kèm bản đồ kĩ năng cho biết bài nào em cần ôn thêm.',
  objectives: [
    'Hệ thống lại các loại dữ liệu, cách thu thập và tính đại diện của dữ liệu.',
    'Tính toán thành thạo trên biểu đồ hình quạt tròn: số lượng, tổng số, tỉ lệ phần trăm, góc ở tâm.',
    'Đọc và nhận xét biểu đồ đoạn thẳng; chọn biểu đồ phù hợp để giải bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Hệ thống hoá kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Bài', 'Kiến thức chính'],
          rows: [
            [
              'Bài 17. Thu thập và phân loại dữ liệu',
              'Thu thập bằng quan sát, thí nghiệm, phiếu hỏi, phỏng vấn, nguồn có sẵn. Dữ liệu: số liệu; không phải số (sắp thứ tự được hoặc không). Dữ liệu cần có tính đại diện.',
            ],
            [
              'Bài 18. Biểu đồ hình quạt tròn',
              'Mỗi hình quạt biểu diễn tỉ lệ phần trăm của một thành phần so với toàn thể; cả hình tròn là $100\\%$; góc ở tâm $= a \\cdot 3{,}6^\\circ$.',
            ],
            [
              'Bài 19. Biểu đồ đoạn thẳng',
              'Trục ngang là thời gian, trục đứng là giá trị; các điểm liên tiếp nối bằng đoạn thẳng; cho thấy xu hướng tăng, giảm.',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Các dạng bài thường gặp',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Biết tổng số $N$ và tỉ lệ $a\\%$: số lượng $= N \\cdot \\dfrac{a}{100}$.',
            'Biết số lượng $k$ ứng với $a\\%$: tổng số $= k : \\dfrac{a}{100} = \\dfrac{100k}{a}$.',
            'Biết số lượng $k$ trong tổng $N$: tỉ lệ $= \\dfrac{k}{N} \\cdot 100\\%$, góc ở tâm $= \\dfrac{k}{N} \\cdot 360^\\circ$.',
            'Biểu đồ đoạn thẳng: mức thay đổi giữa hai thời điểm là hiệu hai giá trị; đoạn dốc nhất ứng với thay đổi lớn nhất.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Tỉ lệ phần trăm trên biểu đồ hình quạt chỉ cho biết phần so với toàn thể. Hai biểu đồ của hai lớp có sĩ số khác nhau thì $30\\%$ của lớp này có thể nhiều bạn hơn $35\\%$ của lớp kia.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Mỗi lượt có 9 câu trộn từ Bài 17, Bài 18 và Bài 19. Nhập một số tự nhiên. Bản đồ kĩ năng tô màu từng bài theo kết quả lần trả lời đầu: xanh là đã vững, vàng là cần luyện thêm, đỏ là nên ôn lại bài đó.',
  },
  examples: [
    {
      problem:
        'Ở một trường, biểu đồ hình quạt cho biết $40\\%$ học sinh đạt mức Khá, và có $120$ học sinh đạt mức Khá. Trường có bao nhiêu học sinh?',
      steps: [
        '$120$ học sinh ứng với $40\\%$ tổng số học sinh.',
        'Tổng số học sinh: $120 : \\dfrac{40}{100} = 120 \\cdot \\dfrac{100}{40} = 300$.',
      ],
      answer: 'Trường có $300$ học sinh.',
    },
    {
      problem:
        'Lớp 7A có $40$ học sinh, $30\\%$ thích môn Mĩ thuật. Lớp 7B có $30$ học sinh, $40\\%$ thích môn Mĩ thuật. Lớp nào có nhiều bạn thích Mĩ thuật hơn?',
      steps: [
        'Lớp 7A: $40 \\cdot \\dfrac{30}{100} = 12$ bạn.',
        'Lớp 7B: $30 \\cdot \\dfrac{40}{100} = 12$ bạn.',
        'Tỉ lệ của lớp 7B cao hơn nhưng sĩ số ít hơn, nên số bạn bằng nhau.',
      ],
      answer: 'Hai lớp có số bạn thích Mĩ thuật bằng nhau ($12$ bạn).',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong các dãy dữ liệu về các nước ASEAN sau, dãy nào là số liệu?',
      options: [
        'Tên các nước ASEAN',
        'Diện tích (km²) của các nước ASEAN',
        'Tên thủ đô của các nước ASEAN',
        'Màu chủ đạo trên quốc kì của các nước ASEAN',
      ],
      answer: 1,
      hints: ['Số liệu là dữ liệu ghi bằng số đo hoặc số đếm.'],
      solution:
        'Diện tích là số đo nên là số liệu. Tên nước, tên thủ đô, màu cờ đều không phải là số.',
    },
    {
      type: 'choice',
      prompt:
        'Để biết chiều cao hiện nay của các bạn lớp 7A, cách thu thập dữ liệu nào phù hợp nhất?',
      options: [
        'Đo chiều cao của từng bạn trong lớp',
        'Tra chiều cao trung bình của học sinh trên Internet',
        'Hỏi các bạn lớp 6 về chiều cao của mình',
      ],
      answer: 0,
      hints: ['Dữ liệu cần là chiều cao của chính các bạn lớp 7A, ngay lúc này.'],
      solution:
        'Đo trực tiếp từng bạn cho đúng dữ liệu cần tìm. Số liệu trên Internet hay của lớp 6 không phải chiều cao của các bạn lớp 7A.',
    },
    {
      type: 'choice',
      prompt:
        'Để ước lượng tỉ lệ học sinh biết bơi của cả trường, nhóm bạn Minh hỏi các bạn đang tập ở bể bơi của trường. Nhận xét nào đúng?',
      options: [
        'Dữ liệu có tính đại diện vì hỏi được nhiều bạn',
        'Dữ liệu không có tính đại diện vì các bạn ở bể bơi phần lớn đều biết bơi',
        'Dữ liệu có tính đại diện vì bể bơi thuộc trường',
      ],
      answer: 1,
      hints: ['Nhóm được hỏi có giống toàn trường về khả năng bơi không?'],
      solution:
        'Những bạn đang tập ở bể bơi hầu hết biết bơi, nên tỉ lệ thu được cao hơn thực tế của cả trường: dữ liệu không đại diện.',
    },
    {
      type: 'number',
      prompt:
        'Lớp 7E có $36$ học sinh. Biểu đồ hình quạt cho biết $25\\%$ số bạn thích môn Âm nhạc nhất. Có bao nhiêu bạn thích môn Âm nhạc nhất?',
      answer: 9,
      unit: 'bạn',
      hints: ['$25\\%$ là một phần tư.'],
      solution: '$36 \\cdot \\dfrac{25}{100} = 9$ bạn.',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ hình quạt về kết quả học tập của một trường cho biết mức Khá chiếm $40\\%$, và có $160$ học sinh đạt mức Khá. Trường có bao nhiêu học sinh?',
      answer: 400,
      unit: 'học sinh',
      hints: [
        '$160$ học sinh ứng với $40\\%$ tổng số.',
        'Tổng số $= 160 \\cdot \\dfrac{100}{40}$.',
      ],
      solution: 'Tổng số học sinh: $160 : \\dfrac{40}{100} = 160 \\cdot \\dfrac{100}{40} = 400$.',
    },
    {
      type: 'number',
      prompt:
        'Trong $60$ học sinh được hỏi, có $18$ bạn chọn bóng rổ. Khi vẽ biểu đồ hình quạt, hình quạt "Bóng rổ" có góc ở tâm bao nhiêu độ?',
      answer: 108,
      unit: '°',
      hints: [
        'Tính tỉ lệ phần trăm trước.',
        'Hình quạt $a\\%$ có góc ở tâm $a \\cdot 3{,}6^\\circ$.',
      ],
      solution:
        'Tỉ lệ: $\\dfrac{18}{60} \\cdot 100\\% = 30\\%$. Góc ở tâm: $30 \\cdot 3{,}6^\\circ = 108^\\circ$ (hoặc $\\dfrac{18}{60} \\cdot 360^\\circ = 108^\\circ$).',
    },
    {
      type: 'number',
      prompt:
        'Số học sinh đăng kí câu lạc bộ Bơi các tháng 1 đến 5 là: $30$; $45$; $40$; $60$; $55$. Số học sinh đăng kí tháng 4 nhiều hơn tháng 1 bao nhiêu bạn?',
      answer: 30,
      unit: 'bạn',
      hints: ['Lấy giá trị tháng 4 trừ giá trị tháng 1.'],
      solution: '$60 - 30 = 30$ bạn.',
    },
    {
      type: 'multi',
      prompt:
        'Với dữ liệu câu lạc bộ Bơi ở câu trên ($30$; $45$; $40$; $60$; $55$), chọn tất cả các nhận xét đúng về biểu đồ đoạn thẳng.',
      options: [
        'Số học sinh đăng kí tăng liên tục.',
        'Tháng 4 có nhiều học sinh đăng kí nhất.',
        'Có hai đoạn thẳng đi xuống.',
        'Tăng nhiều nhất là từ tháng 3 đến tháng 4.',
      ],
      answers: [1, 2, 3],
      hints: ['Tính mức thay đổi giữa từng cặp tháng liên tiếp.'],
      solution:
        'Các mức thay đổi: $+15$; $-5$; $+20$; $-5$. Có hai đoạn đi xuống nên không tăng liên tục; lớn nhất là $60$ ở tháng 4; tăng nhiều nhất $20$ bạn từ tháng 3 đến tháng 4.',
    },
    {
      type: 'number',
      prompt:
        'Trường có $500$ học sinh. Biểu đồ hình quạt cho biết $30\\%$ học sinh thích bóng đá nhất, trong đó có $40$ bạn nữ. Có bao nhiêu bạn nam thích bóng đá nhất?',
      answer: 110,
      unit: 'bạn',
      hints: ['Tính số học sinh thích bóng đá của cả trường trước.', 'Rồi trừ đi số bạn nữ.'],
      solution:
        'Số học sinh thích bóng đá: $500 \\cdot \\dfrac{30}{100} = 150$. Số bạn nam: $150 - 40 = 110$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước biểu diễn một bảng số liệu vào biểu đồ hình quạt tròn.',
      items: [
        'Tính góc ở tâm của mỗi hình quạt',
        'Tô màu, ghi tỉ lệ phần trăm, chú giải và tên biểu đồ',
        'Tính tỉ lệ phần trăm của mỗi thành phần so với tổng số',
        'Chia hình tròn thành các hình quạt theo các góc vừa tính',
      ],
      answer: [2, 0, 3, 1],
      hints: ['Muốn có góc ở tâm, cần biết tỉ lệ phần trăm.'],
      solution:
        'Tính tỉ lệ phần trăm → tính góc ở tâm → chia hình tròn thành các hình quạt → tô màu, ghi tỉ lệ, chú giải, tên biểu đồ.',
    },
    {
      type: 'choice',
      prompt:
        'Một cửa hàng muốn biểu diễn doanh thu từng tháng trong năm để thấy tháng nào tăng, tháng nào giảm. Nên dùng loại biểu đồ nào?',
      options: ['Biểu đồ hình quạt tròn', 'Biểu đồ đoạn thẳng', 'Biểu đồ tranh'],
      answer: 1,
      hints: ['Doanh thu thay đổi theo thời gian.'],
      solution:
        'Doanh thu thay đổi theo từng tháng, cần thấy xu hướng tăng, giảm, nên dùng biểu đồ đoạn thẳng.',
    },
  ],
  takeaways: [
    'Dữ liệu: số liệu và dữ liệu không phải là số; kết luận chỉ đáng tin khi dữ liệu có tính đại diện.',
    'Biểu đồ hình quạt tròn: các phần của một toàn thể; dùng $N \\cdot \\dfrac{a}{100}$, $\\dfrac{k}{N} \\cdot 100\\%$ và $a \\cdot 3{,}6^\\circ$.',
    'Biểu đồ đoạn thẳng: sự thay đổi theo thời gian; đọc xu hướng, giá trị lớn nhất, nhỏ nhất và mức tăng giảm.',
  ],
};
