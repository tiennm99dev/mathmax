/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về thu thập và phân loại dữ liệu, tính đại diện của dữ liệu, đọc và tính toán trên biểu đồ hình quạt tròn và biểu đồ đoạn thẳng.',
  intro:
    'Bài luyện tập này ôn lại Bài 17 (Thu thập và phân loại dữ liệu), Bài 18 (Biểu đồ hình quạt tròn) và Bài 19 (Biểu đồ đoạn thẳng). Em sẽ phân loại dữ liệu, đánh giá một cách khảo sát, tính số lượng, tỉ lệ phần trăm, góc ở tâm trên biểu đồ hình quạt và đọc xu hướng trên biểu đồ đoạn thẳng.',
  objectives: [
    'Phân loại dữ liệu và nhận biết dữ liệu có tính đại diện.',
    'Tính số lượng, tỉ lệ phần trăm và góc ở tâm trên biểu đồ hình quạt tròn.',
    'Đọc giá trị, mức tăng giảm và xu hướng trên biểu đồ đoạn thẳng; chọn loại biểu đồ phù hợp.',
  ],
  sections: [
    {
      heading: 'Nhắc lại kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Phân loại dữ liệu',
              'Số liệu; dữ liệu không phải là số (sắp thứ tự được hoặc không sắp thứ tự được).',
            ],
            [
              'Tính đại diện',
              'Nhóm được hỏi gồm đủ các thành phần của toàn bộ, chọn ngẫu nhiên, không quá ít.',
            ],
            [
              'Biểu đồ hình quạt tròn',
              'Cả hình tròn là $100\\%$; số lượng $= N \\cdot \\dfrac{a}{100}$; góc ở tâm $= a \\cdot 3{,}6^\\circ$.',
            ],
            [
              'Biểu đồ đoạn thẳng',
              'Biểu diễn sự thay đổi theo thời gian; đoạn đi lên là tăng, đi xuống là giảm.',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Chọn biểu đồ phù hợp',
      blocks: [
        {
          type: 'list',
          items: [
            'So sánh các phần trong một toàn thể (tỉ lệ các loại, cơ cấu): dùng biểu đồ hình quạt tròn.',
            'Theo dõi một đại lượng thay đổi theo thời gian (theo ngày, tháng, năm): dùng biểu đồ đoạn thẳng.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Từ biểu đồ hình quạt, muốn biết số lượng cụ thể ta cần biết tổng số. Từ biểu đồ đoạn thẳng, mức tăng (giảm) giữa hai thời điểm là hiệu hai giá trị.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện trộn ngẫu nhiên',
    instruction:
      'Mỗi lượt có 12 câu trộn ngẫu nhiên về phân loại dữ liệu, biểu đồ hình quạt tròn và biểu đồ đoạn thẳng. Nhập một số tự nhiên. Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra.',
  },
  examples: [
    {
      problem:
        'Ba loại cây trong vườn trường là bàng, phượng và xà cừ, số cây tỉ lệ với $2$; $3$; $5$. Tính tỉ lệ phần trăm và góc ở tâm của mỗi hình quạt khi biểu diễn bằng biểu đồ hình quạt tròn.',
      steps: [
        'Tổng số phần: $2 + 3 + 5 = 10$, mỗi phần ứng với $100\\% : 10 = 10\\%$.',
        'Bàng: $2 \\cdot 10\\% = 20\\%$; phượng: $3 \\cdot 10\\% = 30\\%$; xà cừ: $5 \\cdot 10\\% = 50\\%$.',
        'Góc ở tâm: $20 \\cdot 3{,}6^\\circ = 72^\\circ$; $30 \\cdot 3{,}6^\\circ = 108^\\circ$; $50 \\cdot 3{,}6^\\circ = 180^\\circ$.',
      ],
      answer:
        'Bàng $20\\%$ ($72^\\circ$), phượng $30\\%$ ($108^\\circ$), xà cừ $50\\%$ ($180^\\circ$).',
    },
    {
      problem:
        'Số lượt khách đến một khu du lịch (nghìn lượt) qua các năm: 2019: $40$; 2020: $15$; 2021: $10$; 2022: $35$; 2023: $50$. Hãy nhận xét xu hướng và cho biết năm nào số khách giảm nhiều nhất so với năm trước.',
      steps: [
        'Các mức thay đổi: 2019 → 2020: giảm $25$; 2020 → 2021: giảm $5$; 2021 → 2022: tăng $25$; 2022 → 2023: tăng $15$.',
        'Số khách giảm từ 2019 đến 2021, rồi tăng liên tục từ 2021 đến 2023.',
        'Giảm nhiều nhất là $25$ nghìn lượt, từ 2019 đến 2020.',
      ],
      answer:
        'Số khách giảm đến 2021 rồi tăng trở lại; năm 2020 giảm nhiều nhất ($25$ nghìn lượt so với 2019).',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Dữ liệu "điểm kiểm tra môn Toán (thang điểm $10$) của các bạn trong lớp" thuộc loại nào?',
      options: [
        'Số liệu',
        'Dữ liệu không phải là số, có thể sắp thứ tự',
        'Dữ liệu không phải là số, không thể sắp thứ tự',
      ],
      answer: 0,
      hints: ['Điểm kiểm tra được ghi bằng gì?'],
      solution: 'Điểm kiểm tra là các số như $7$; $8{,}5$; $10$, nên là số liệu.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các dãy dữ liệu không phải là số nhưng sắp được thứ tự.',
      options: [
        'Mức độ hài lòng: rất hài lòng, hài lòng, không hài lòng',
        'Tên các bạn trong tổ',
        'Cỡ giày: nhỏ, vừa, lớn',
        'Số giờ ngủ mỗi đêm',
        'Món ăn yêu thích',
      ],
      answers: [0, 2],
      hints: [
        'Loại trừ số liệu trước.',
        'Với dữ liệu bằng chữ, hỏi: có xếp được từ thấp đến cao không?',
      ],
      solution:
        'Mức độ hài lòng và cỡ giày ghi bằng chữ nhưng xếp được thứ tự. Tên bạn và món ăn không có thứ tự; số giờ ngủ là số liệu.',
    },
    {
      type: 'choice',
      prompt:
        'Để tìm hiểu thời gian ngủ mỗi đêm của học sinh lớp 7 trong cả thành phố, cách nào cho dữ liệu có tính đại diện nhất?',
      options: [
        'Hỏi tất cả học sinh lớp 7A của trường em',
        'Chọn ngẫu nhiên học sinh lớp 7 ở nhiều trường thuộc các quận, huyện khác nhau',
        'Hỏi các bạn lớp 7 trong câu lạc bộ cờ vua của thành phố',
        'Hỏi $10$ bạn lớp 7 gặp ở thư viện',
      ],
      answer: 1,
      hints: [
        'Đối tượng cần tìm hiểu là học sinh lớp 7 của cả thành phố, không phải một lớp hay một câu lạc bộ.',
      ],
      solution:
        'Chỉ cách chọn ngẫu nhiên ở nhiều trường, nhiều quận, huyện mới có đủ các thành phần của học sinh lớp 7 toàn thành phố. Các cách còn lại chỉ hỏi một nhóm nhỏ có đặc điểm riêng.',
    },
    {
      type: 'number',
      prompt:
        'Trường có $800$ học sinh. Biểu đồ hình quạt cho biết $45\\%$ số học sinh đi xe đạp đến trường. Có bao nhiêu học sinh đi xe đạp?',
      answer: 360,
      unit: 'học sinh',
      hints: ['Số lượng $= N \\cdot \\dfrac{a}{100}$.'],
      solution: '$800 \\cdot \\dfrac{45}{100} = 360$ học sinh.',
    },
    {
      type: 'number',
      prompt:
        'Một hình quạt có góc ở tâm $126^\\circ$. Hình quạt đó biểu diễn bao nhiêu phần trăm?',
      answer: 35,
      unit: '%',
      hints: ['$1\\%$ ứng với $3{,}6^\\circ$.', 'Tính $126 : 3{,}6$.'],
      solution: '$126 : 3{,}6 = 35$, nên hình quạt biểu diễn $35\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Trong $50$ học sinh được hỏi, có $12$ bạn chọn môn Tin học là môn yêu thích. Trên biểu đồ hình quạt, hình quạt "Tin học" biểu diễn bao nhiêu phần trăm?',
      answer: 24,
      unit: '%',
      hints: ['Tỉ lệ $= \\dfrac{\\text{số lượng}}{\\text{tổng số}} \\cdot 100\\%$.'],
      solution: '$\\dfrac{12}{50} \\cdot 100\\% = 24\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Số cây bàng, phượng, xà cừ, hoa sữa trong một công viên tỉ lệ với $1$; $2$; $3$; $4$. Trên biểu đồ hình quạt, hình quạt lớn nhất biểu diễn bao nhiêu phần trăm?',
      answer: 40,
      unit: '%',
      hints: ['Tổng số phần là $1 + 2 + 3 + 4$.', 'Mỗi phần ứng với $100\\% : 10$.'],
      solution:
        'Tổng số phần: $10$, mỗi phần là $10\\%$. Hình quạt lớn nhất (hoa sữa, $4$ phần) biểu diễn $4 \\cdot 10\\% = 40\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Với dữ liệu khách du lịch ở ví dụ 2 (2019: $40$; 2020: $15$; 2021: $10$; 2022: $35$; 2023: $50$ nghìn lượt), số khách năm 2023 nhiều hơn năm 2021 bao nhiêu nghìn lượt?',
      answer: 40,
      unit: 'nghìn lượt',
      hints: ['Lấy giá trị năm 2023 trừ giá trị năm 2021.'],
      solution: '$50 - 10 = 40$ nghìn lượt.',
    },
    {
      type: 'choice',
      prompt:
        'Cũng với dữ liệu đó, trên biểu đồ đoạn thẳng, từ năm 2021 đến năm 2023 các đoạn thẳng có dạng nào?',
      options: ['Đi lên liên tục', 'Đi xuống liên tục', 'Nằm ngang', 'Đi lên rồi đi xuống'],
      answer: 0,
      hints: ['So sánh $10$, $35$ và $50$.'],
      solution: '$10 < 35 < 50$ nên hai đoạn thẳng đều đi lên: số khách tăng liên tục.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Lan muốn biểu diễn tỉ lệ thời gian trong một ngày dành cho học tập, ngủ, vui chơi và việc khác. Nên dùng loại biểu đồ nào?',
      options: ['Biểu đồ đoạn thẳng', 'Biểu đồ hình quạt tròn', 'Biểu đồ tranh'],
      answer: 1,
      hints: ['Các khoảng thời gian ghép lại thành cả một ngày.'],
      solution:
        'Các hoạt động là các phần của cả ngày ($100\\%$), nên dùng biểu đồ hình quạt tròn để so sánh các phần.',
    },
  ],
  takeaways: [
    'Phân loại dữ liệu trước khi chọn cách biểu diễn; dữ liệu phải có tính đại diện thì kết luận mới đáng tin.',
    'Biểu đồ hình quạt: các phần của một toàn thể; số lượng, tỉ lệ và góc ở tâm tính được lẫn nhau.',
    'Biểu đồ đoạn thẳng: sự thay đổi theo thời gian; mức tăng, giảm là hiệu hai giá trị liên tiếp.',
  ],
};
