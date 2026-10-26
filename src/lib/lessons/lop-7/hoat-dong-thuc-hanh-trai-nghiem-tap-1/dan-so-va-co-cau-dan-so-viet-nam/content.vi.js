/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: thu thập số liệu dân số Việt Nam từ năm 2011 đến năm 2020, lập bảng thống kê, vẽ biểu đồ đoạn thẳng biểu diễn dân số và biểu đồ hình quạt tròn biểu diễn cơ cấu dân số theo giới tính, theo nơi sinh sống, rồi phân tích số liệu.',
  intro:
    'Việt Nam là một trong những nước đông dân trên thế giới. Dân số nước ta tăng thế nào trong mười năm qua? Có bao nhiêu phần trăm người dân sống ở thành thị? Trong hoạt động này em sẽ tự tìm số liệu, biểu diễn chúng bằng biểu đồ đoạn thẳng và biểu đồ hình quạt tròn đã học ở chương V, rồi dùng biểu đồ để trả lời những câu hỏi đó.',
  objectives: [
    'Thu thập số liệu dân số từ nguồn đáng tin cậy và lập bảng thống kê.',
    'Chọn đúng loại biểu đồ: biểu đồ đoạn thẳng cho xu hướng theo thời gian, biểu đồ hình quạt tròn cho cơ cấu (tỉ lệ các phần trong tổng thể).',
    'Tính góc ở tâm của mỗi hình quạt và số người ứng với một tỉ lệ phần trăm.',
    'Nhận xét xu hướng tăng dân số và cơ cấu dân số từ biểu đồ.',
  ],
  sections: [
    {
      heading: 'Thu thập số liệu',
      blocks: [
        {
          type: 'p',
          text: 'Số liệu dân số chính thức của nước ta do cơ quan thống kê nhà nước công bố trên trang web của Tổng cục Thống kê (nay là Cục Thống kê, Bộ Tài chính), mục Số liệu thống kê → Dân số và lao động. Em cũng có thể tra cứu trang Worldometers, sách niên giám thống kê, sách báo.',
        },
        {
          type: 'table',
          head: ['Năm', '2011', '2012', '2013', '2014', '2015'],
          rows: [
            [
              'Dân số (triệu người)',
              '$88{,}87$',
              '$89{,}90$',
              '$90{,}75$',
              '$91{,}71$',
              '$92{,}68$',
            ],
          ],
          caption: 'Dân số trung bình của Việt Nam, 2011 – 2015 (làm tròn).',
        },
        {
          type: 'table',
          head: ['Năm', '2016', '2017', '2018', '2019', '2020'],
          rows: [
            [
              'Dân số (triệu người)',
              '$93{,}64$',
              '$94{,}60$',
              '$95{,}55$',
              '$96{,}46$',
              '$97{,}58$',
            ],
          ],
          caption: 'Dân số trung bình của Việt Nam, 2016 – 2020 (làm tròn).',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Số liệu dân số được cơ quan thống kê điều chỉnh sau mỗi cuộc tổng điều tra, nên các nguồn có thể chênh lệch nhau một chút. Khi báo cáo, em luôn ghi rõ nguồn và thời điểm lấy số liệu.',
        },
        {
          type: 'table',
          head: ['Cơ cấu năm 2020', 'Phần thứ nhất', 'Phần thứ hai'],
          rows: [
            ['Theo giới tính', 'Nam: $49{,}8\\%$', 'Nữ: $50{,}2\\%$'],
            ['Theo nơi sinh sống', 'Thành thị: $36{,}8\\%$', 'Nông thôn: $63{,}2\\%$'],
          ],
          caption: 'Cơ cấu dân số Việt Nam năm 2020 (dân số $97{,}58$ triệu người).',
        },
      ],
    },
    {
      heading: 'Chọn biểu đồ và vẽ biểu đồ',
      blocks: [
        {
          type: 'list',
          items: [
            'Dân số thay đổi theo thời gian (qua các năm): dùng biểu đồ đoạn thẳng. Trục ngang ghi các năm, trục đứng ghi số dân; mỗi năm là một điểm, nối các điểm liên tiếp bằng đoạn thẳng.',
            'Cơ cấu dân số (mỗi nhóm chiếm bao nhiêu phần trăm tổng số dân): dùng biểu đồ hình quạt tròn. Cả hình tròn là $100\\%$.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Góc ở tâm của hình quạt',
          text: 'Hình quạt biểu diễn $p\\%$ có góc ở tâm bằng $p \\cdot 3{,}6^\\circ$, vì $100\\%$ ứng với $360^\\circ$. Chẳng hạn thành thị $36{,}8\\%$ ứng với góc $36{,}8 \\cdot 3{,}6^\\circ = 132{,}48^\\circ$.',
        },
        {
          type: 'p',
          text: 'Có thể vẽ biểu đồ trên giấy (thước, compa, thước đo góc) hoặc bằng phần mềm bảng tính như Microsoft Excel: nhập bảng số liệu, chọn vùng dữ liệu, vào Insert (Chèn) và chọn biểu đồ Line (Đường) hoặc Pie (Hình tròn). Nhớ ghi tên biểu đồ, chú thích và đơn vị.',
        },
      ],
    },
    {
      heading: 'Phân tích số liệu',
      blocks: [
        {
          type: 'list',
          items: [
            'Xu hướng: từ năm 2011 đến năm 2020, dân số nước ta tăng liên tục, mỗi năm tăng khoảng $1$ triệu người; cả giai đoạn tăng $97{,}58 - 88{,}87 = 8{,}71$ triệu người.',
            'Theo giới tính: nam $49{,}8\\%$, nữ $50{,}2\\%$, hai phần gần bằng nhau, cơ cấu khá cân bằng.',
            'Theo nơi sinh sống: nông thôn $63{,}2\\%$, gần gấp đôi thành thị $36{,}8\\%$; phần lớn người dân vẫn sống ở nông thôn.',
          ],
        },
        {
          type: 'p',
          text: 'Số người ứng với một tỉ lệ: số dân thành thị năm 2020 khoảng $36{,}8\\% \\cdot 97{,}58 \\approx 35{,}91$ triệu người; số dân nông thôn khoảng $97{,}58 - 35{,}91 = 61{,}67$ triệu người.',
        },
        {
          type: 'table',
          head: ['Năm', 'Nam', 'Nữ', 'Thành thị', 'Nông thôn'],
          rows: [
            ['2009', '$49{,}4\\%$', '$50{,}6\\%$', '$29{,}6\\%$', '$70{,}4\\%$'],
            ['2019', '$49{,}8\\%$', '$50{,}2\\%$', '$34{,}4\\%$', '$65{,}6\\%$'],
            ['2020', '$49{,}8\\%$', '$50{,}2\\%$', '$36{,}8\\%$', '$63{,}2\\%$'],
          ],
          caption:
            'Cơ cấu dân số qua hai cuộc Tổng điều tra dân số và nhà ở (1/4/2009, 1/4/2019) và năm 2020.',
        },
        {
          type: 'p',
          text: 'So sánh các năm: tỉ lệ dân thành thị tăng dần, từ $29{,}6\\%$ (2009) lên $36{,}8\\%$ (2020), vì nhiều người chuyển đến sống ở các đô thị.',
        },
      ],
    },
    {
      heading: 'Dự án: Dân số và cơ cấu dân số Việt Nam',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi nhóm $4$ – $5$ học sinh tự thu thập số liệu dân số Việt Nam, biểu diễn bằng biểu đồ và trình bày nhận xét trước lớp.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: máy tính có Internet (hoặc niên giám thống kê, sách báo), phần mềm bảng tính hoặc giấy kẻ ô, thước, compa, thước đo góc.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Thu thập số liệu dân số Việt Nam từ năm 2011 đến năm 2020, ghi rõ nguồn.',
            'Lập bảng thống kê dân số theo năm; bảng cơ cấu dân số năm 2020 theo giới tính (nam, nữ) và theo nơi sinh sống (thành thị, nông thôn).',
            'Vẽ biểu đồ đoạn thẳng biểu diễn dân số Việt Nam từ năm 2011 đến năm 2020.',
            'Tính góc ở tâm của từng hình quạt rồi vẽ hai biểu đồ hình quạt tròn biểu diễn cơ cấu dân số năm 2020 theo giới tính và theo nơi sinh sống.',
            'Phân tích: nêu xu hướng tăng hay giảm của dân số; nhận xét cơ cấu theo giới tính và theo nơi sinh sống; tính số dân thành thị, nông thôn năm 2020.',
            'Mở rộng (nếu có thời gian): tìm số liệu dân số của tỉnh, thành phố nơi em sống và so sánh với cả nước.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: một áp phích hoặc bài trình chiếu gồm các bảng số liệu (có nguồn), ba biểu đồ có tên và chú thích, các phép tính và ít nhất ba nhận xét rút ra từ biểu đồ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vẽ và đọc biểu đồ dân số',
    instruction:
      'Biểu đồ quạt tròn: chọn năm và tiêu chí, kéo ranh giới hai hình quạt cho khớp với bảng số liệu để thấy góc ở tâm và số người của mỗi phần. Biểu đồ đoạn thẳng: chọn hai năm để tính mức tăng, rồi dựa vào xu hướng dự đoán dân số năm 2021.',
  },
  examples: [
    {
      problem:
        'Năm 2020, dân số Việt Nam là $97{,}58$ triệu người, trong đó $36{,}8\\%$ sống ở thành thị. Tính số dân thành thị, số dân nông thôn và góc ở tâm của hai hình quạt.',
      steps: [
        'Số dân thành thị: $36{,}8\\% \\cdot 97{,}58 = 0{,}368 \\cdot 97{,}58 \\approx 35{,}91$ (triệu người).',
        'Số dân nông thôn: $97{,}58 - 35{,}91 = 61{,}67$ (triệu người).',
        'Tỉ lệ nông thôn: $100\\% - 36{,}8\\% = 63{,}2\\%$.',
        'Góc ở tâm: thành thị $36{,}8 \\cdot 3{,}6^\\circ = 132{,}48^\\circ$; nông thôn $63{,}2 \\cdot 3{,}6^\\circ = 227{,}52^\\circ$. Kiểm tra: $132{,}48^\\circ + 227{,}52^\\circ = 360^\\circ$.',
      ],
      answer:
        'Khoảng $35{,}91$ triệu người ở thành thị, $61{,}67$ triệu người ở nông thôn; hai góc ở tâm $132{,}48^\\circ$ và $227{,}52^\\circ$.',
    },
    {
      problem:
        'Dựa vào bảng dân số 2011 – 2020, nêu xu hướng thay đổi dân số và tính trung bình mỗi năm dân số tăng bao nhiêu triệu người.',
      steps: [
        'Mỗi năm số dân đều lớn hơn năm trước, nên biểu đồ đoạn thẳng đi lên liên tục: dân số có xu hướng tăng.',
        'Cả giai đoạn tăng $97{,}58 - 88{,}87 = 8{,}71$ (triệu người).',
        'Từ năm 2011 đến năm 2020 có $2020 - 2011 = 9$ lần chuyển năm, nên trung bình mỗi năm tăng $8{,}71 : 9 \\approx 0{,}97$ (triệu người).',
      ],
      answer: 'Dân số tăng liên tục, trung bình khoảng $0{,}97$ triệu người mỗi năm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Để biểu diễn sự thay đổi dân số Việt Nam qua các năm từ 2011 đến 2020, nên dùng loại biểu đồ nào?',
      options: [
        'Biểu đồ hình quạt tròn',
        'Biểu đồ đoạn thẳng',
        'Biểu đồ tranh',
        'Không cần biểu đồ',
      ],
      answer: 1,
      hints: ['Số liệu thay đổi theo thời gian hay là các phần của một tổng thể?'],
      solution:
        'Dân số thay đổi theo thời gian, nên dùng biểu đồ đoạn thẳng để thấy xu hướng. Biểu đồ hình quạt tròn dùng cho cơ cấu (tỉ lệ các phần của một tổng thể).',
    },
    {
      type: 'number',
      prompt:
        'Theo bảng số liệu, dân số Việt Nam năm 2020 nhiều hơn năm 2011 bao nhiêu triệu người?',
      answer: 8.71,
      unit: 'triệu người',
      hints: ['Lấy dân số năm 2020 trừ dân số năm 2011.'],
      solution: '$97{,}58 - 88{,}87 = 8{,}71$ (triệu người).',
    },
    {
      type: 'choice',
      prompt: 'Giữa hai năm liên tiếp nào dân số tăng nhiều nhất trong giai đoạn 2011 – 2020?',
      options: ['2011 – 2012', '2014 – 2015', '2018 – 2019', '2019 – 2020'],
      answer: 3,
      hints: [
        'Tính mức tăng của từng cặp năm: lấy năm sau trừ năm trước.',
        'Trên biểu đồ đoạn thẳng, đoạn dốc nhất ứng với mức tăng lớn nhất.',
      ],
      solution:
        'Mức tăng: 2011 – 2012: $1{,}03$; 2014 – 2015: $0{,}97$; 2018 – 2019: $0{,}91$; 2019 – 2020: $97{,}58 - 96{,}46 = 1{,}12$ (triệu người). Lớn nhất là 2019 – 2020.',
    },
    {
      type: 'number',
      prompt:
        'Năm 2020 dân số Việt Nam là $97{,}58$ triệu người, trong đó $36{,}8\\%$ sống ở thành thị. Số dân thành thị khoảng bao nhiêu triệu người (làm tròn đến hàng phần trăm)?',
      answer: 35.91,
      tolerance: 0.005,
      unit: 'triệu người',
      hints: ['Tính $36{,}8\\%$ của $97{,}58$, tức là $0{,}368 \\cdot 97{,}58$.'],
      solution: '$0{,}368 \\cdot 97{,}58 = 35{,}909\\ldots \\approx 35{,}91$ (triệu người).',
    },
    {
      type: 'number',
      prompt:
        'Trong biểu đồ hình quạt tròn biểu diễn cơ cấu dân số năm 2020 theo nơi sinh sống, hình quạt "Nông thôn" ($63{,}2\\%$) có góc ở tâm bằng bao nhiêu độ?',
      answer: 227.52,
      tolerance: 0.005,
      unit: '°',
      hints: ['Cả hình tròn $360^\\circ$ ứng với $100\\%$, vậy $1\\%$ ứng với bao nhiêu độ?'],
      solution:
        '$1\\%$ ứng với $3{,}6^\\circ$, nên góc ở tâm là $63{,}2 \\cdot 3{,}6^\\circ = 227{,}52^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Năm 2020, nữ chiếm $50{,}2\\%$ dân số ($97{,}58$ triệu người). Số người là nữ khoảng bao nhiêu triệu người (làm tròn đến hàng phần trăm)?',
      answer: 48.99,
      tolerance: 0.005,
      unit: 'triệu người',
      hints: ['Tính $0{,}502 \\cdot 97{,}58$.'],
      solution: '$0{,}502 \\cdot 97{,}58 = 48{,}985\\ldots \\approx 48{,}99$ (triệu người).',
    },
    {
      type: 'multi',
      prompt: 'Những nhận xét nào đúng với số liệu dân số trong bài?',
      options: [
        'Từ năm 2011 đến năm 2020, dân số nước ta tăng liên tục.',
        'Năm 2020, số dân nông thôn nhiều hơn số dân thành thị.',
        'Năm 2020, số nam nhiều hơn số nữ.',
        'Tỉ lệ dân thành thị năm 2020 cao hơn năm 2009.',
      ],
      answers: [0, 1, 3],
      hints: [
        'So sánh từng cặp số liệu trong các bảng: nam với nữ, thành thị với nông thôn, năm 2009 với năm 2020.',
      ],
      solution:
        'Dân số năm sau luôn lớn hơn năm trước (đúng). Nông thôn $63{,}2\\% > 36{,}8\\%$ (đúng). Nam $49{,}8\\% <$ nữ $50{,}2\\%$, nên nhận xét thứ ba sai. Thành thị $36{,}8\\%$ (2020) $> 29{,}6\\%$ (2009) (đúng).',
    },
    {
      type: 'number',
      prompt:
        'Theo Tổng điều tra dân số năm 2019, dân thành thị chiếm $34{,}4\\%$. Góc ở tâm của hình quạt "Thành thị" bằng bao nhiêu độ?',
      answer: 123.84,
      tolerance: 0.005,
      unit: '°',
      hints: ['Nhân tỉ lệ phần trăm với $3{,}6^\\circ$.'],
      solution: '$34{,}4 \\cdot 3{,}6^\\circ = 123{,}84^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Từ năm 2011 đến năm 2020, trung bình mỗi năm dân số nước ta tăng khoảng bao nhiêu triệu người (làm tròn đến hàng phần trăm)?',
      answer: 0.97,
      tolerance: 0.005,
      unit: 'triệu người',
      hints: [
        'Tính mức tăng cả giai đoạn trước.',
        'Từ 2011 đến 2020 có $9$ lần chuyển sang năm mới, không phải $10$.',
      ],
      solution: '$(97{,}58 - 88{,}87) : 9 = 8{,}71 : 9 \\approx 0{,}97$ (triệu người).',
    },
  ],
  takeaways: [
    'Thu thập số liệu từ nguồn đáng tin cậy (cơ quan thống kê) và luôn ghi nguồn.',
    'Biểu đồ đoạn thẳng cho thấy xu hướng theo thời gian: dân số Việt Nam tăng liên tục, khoảng $1$ triệu người mỗi năm.',
    'Biểu đồ hình quạt tròn cho thấy cơ cấu: hình quạt $p\\%$ có góc ở tâm $p \\cdot 3{,}6^\\circ$.',
    'Số người ứng với $p\\%$ của tổng số dân $N$ là $\\dfrac{p}{100} \\cdot N$.',
    'Năm 2020: nam và nữ gần bằng nhau; khoảng hai phần ba dân số sống ở nông thôn, nhưng tỉ lệ thành thị đang tăng.',
  ],
};
