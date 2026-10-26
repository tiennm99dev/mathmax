/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Biểu đồ hình quạt tròn: đọc tỉ lệ phần trăm của từng thành phần so với toàn thể, tính số lượng từ tỉ lệ, và liên hệ tỉ lệ phần trăm với góc ở tâm của hình quạt.',
  intro:
    'Cô chủ nhiệm muốn cho cả lớp thấy ngay trong $40$ bạn lớp 7A, phần nào đi bộ, phần nào đi xe đạp, phần nào được bố mẹ đưa đón. Một hình tròn được cắt thành các "miếng bánh" to nhỏ khác nhau làm việc đó rất rõ: đó là biểu đồ hình quạt tròn.',
  objectives: [
    'Đọc và mô tả dữ liệu trên biểu đồ hình quạt tròn.',
    'Tính số lượng của một thành phần khi biết tỉ lệ phần trăm và tổng số.',
    'Tính tỉ lệ phần trăm, góc ở tâm của các hình quạt để biểu diễn dữ liệu vào biểu đồ hình quạt tròn.',
  ],
  sections: [
    {
      heading: 'Đọc biểu đồ hình quạt tròn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biểu đồ hình quạt tròn',
          text: 'Biểu đồ hình quạt tròn (gọi tắt là biểu đồ hình quạt) là một hình tròn được chia thành các hình quạt. Mỗi hình quạt biểu diễn tỉ lệ phần trăm của một thành phần so với toàn thể; cả hình tròn biểu diễn $100\\%$.',
        },
        {
          type: 'p',
          text: 'Biểu đồ hình quạt dùng để so sánh các phần trong toàn bộ dữ liệu. Một biểu đồ hình quạt thường gồm: tên biểu đồ, hình tròn đã chia thành các hình quạt có ghi tỉ lệ phần trăm, và chú giải cho biết mỗi màu ứng với thành phần nào.',
        },
        { type: 'widget', name: 'reading' },
        {
          type: 'list',
          items: [
            'Hình quạt lớn nhất là "Đạt" ($40\\%$): nhóm đông nhất.',
            'Nửa hình tròn ứng với $50\\%$, một phần tư hình tròn ứng với $25\\%$.',
            'Tổng các tỉ lệ: $20\\% + 35\\% + 40\\% + 5\\% = 100\\%$.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính số lượng từ tỉ lệ',
          text: 'Nếu tổng số là $N$ và một thành phần chiếm $a\\%$ thì số lượng của thành phần đó là $N \\cdot \\dfrac{a}{100}$.',
        },
      ],
    },
    {
      heading: 'Tỉ lệ phần trăm và góc ở tâm',
      blocks: [
        {
          type: 'p',
          text: 'Để biểu diễn dữ liệu vào biểu đồ hình quạt, trước hết ta tính tỉ lệ phần trăm của mỗi thành phần so với tổng số:',
        },
        {
          type: 'tex',
          tex: '\\text{tỉ lệ} = \\frac{\\text{số lượng của thành phần}}{\\text{tổng số}} \\cdot 100\\%',
        },
        {
          type: 'p',
          text: 'Cả hình tròn là $360^\\circ$ ứng với $100\\%$, nên $1\\%$ ứng với $3{,}6^\\circ$. Hình quạt biểu diễn $a\\%$ có góc ở tâm bằng $a \\cdot 3{,}6^\\circ$.',
        },
        {
          type: 'table',
          head: ['Tỉ lệ', '$100\\%$', '$50\\%$', '$25\\%$', '$10\\%$', '$5\\%$'],
          rows: [
            [
              'Góc ở tâm',
              '$360^\\circ$',
              '$180^\\circ$',
              '$90^\\circ$',
              '$36^\\circ$',
              '$18^\\circ$',
            ],
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tính tỉ lệ phần trăm của từng thành phần (tổng phải bằng $100\\%$).',
            'Chia hình tròn thành các hình quạt có góc ở tâm tương ứng.',
            'Tô màu, ghi tỉ lệ phần trăm trên mỗi hình quạt, ghi chú giải và tên biểu đồ.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lưu ý',
          text: 'Chỉ dùng biểu đồ hình quạt khi các thành phần ghép lại thành một toàn thể, tức là tổng các tỉ lệ bằng $100\\%$. Muốn biểu diễn sự thay đổi theo thời gian, ta dùng biểu đồ khác (biểu đồ đoạn thẳng ở Bài 19).',
        },
      ],
    },
  ],
  explore: {
    title: 'Kéo ranh giới các hình quạt',
    instruction:
      'Kéo các chấm đen trên đường tròn (hoặc chọn chấm rồi dùng phím mũi tên; giữ Shift để bước 5 bạn) để chuyển học sinh giữa hai phương tiện cạnh nhau. Bảng bên dưới cập nhật số bạn, tỉ lệ phần trăm và góc ở tâm. Chọn một nhiệm vụ để thử biểu diễn đúng dữ liệu của đề bài.',
  },
  examples: [
    {
      problem:
        'Khối 7 của một trường có $300$ học sinh. Dựa vào biểu đồ "Kết quả học tập học kì I của học sinh khối 7" ở trên, hãy tính số học sinh đạt mức Khá và số học sinh Chưa đạt.',
      steps: [
        'Mức Khá chiếm $35\\%$, nên số học sinh Khá là $300 \\cdot \\dfrac{35}{100} = 105$.',
        'Mức Chưa đạt chiếm $5\\%$, nên số học sinh Chưa đạt là $300 \\cdot \\dfrac{5}{100} = 15$.',
      ],
      answer: 'Có $105$ học sinh Khá và $15$ học sinh Chưa đạt.',
    },
    {
      problem:
        'Lớp 7B có $40$ học sinh, mỗi bạn chọn một môn thể thao yêu thích: bóng đá $16$ bạn, cầu lông $10$ bạn, bơi lội $8$ bạn, cờ vua $6$ bạn. Tính tỉ lệ phần trăm và góc ở tâm của mỗi hình quạt để vẽ biểu đồ hình quạt.',
      steps: [
        'Bóng đá: $\\dfrac{16}{40} \\cdot 100\\% = 40\\%$; cầu lông: $\\dfrac{10}{40} \\cdot 100\\% = 25\\%$; bơi lội: $\\dfrac{8}{40} \\cdot 100\\% = 20\\%$; cờ vua: $\\dfrac{6}{40} \\cdot 100\\% = 15\\%$.',
        'Kiểm tra: $40\\% + 25\\% + 20\\% + 15\\% = 100\\%$.',
        'Góc ở tâm: $40 \\cdot 3{,}6^\\circ = 144^\\circ$; $25 \\cdot 3{,}6^\\circ = 90^\\circ$; $20 \\cdot 3{,}6^\\circ = 72^\\circ$; $15 \\cdot 3{,}6^\\circ = 54^\\circ$ (tổng $360^\\circ$).',
      ],
      answer:
        'Bóng đá $40\\%$ ($144^\\circ$), cầu lông $25\\%$ ($90^\\circ$), bơi lội $20\\%$ ($72^\\circ$), cờ vua $15\\%$ ($54^\\circ$).',
    },
    {
      problem:
        'Một biểu đồ hình quạt cho biết tỉ lệ các loại sách trong thư viện: truyện $45\\%$, sách tham khảo $30\\%$, báo và tạp chí $10\\%$, phần còn lại là sách khoa học. Tỉ lệ sách khoa học là bao nhiêu?',
      steps: [
        'Cả hình tròn biểu diễn $100\\%$.',
        'Tỉ lệ sách khoa học: $100\\% - (45\\% + 30\\% + 10\\%) = 100\\% - 85\\% = 15\\%$.',
      ],
      answer: 'Sách khoa học chiếm $15\\%$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Theo biểu đồ kết quả học tập ở trên, mức Tốt chiếm $20\\%$. Khối 7 có $300$ học sinh. Có bao nhiêu học sinh đạt mức Tốt?',
      answer: 60,
      unit: 'học sinh',
      hints: ['Số lượng bằng tổng số nhân với tỉ lệ.', 'Tính $300 \\cdot \\dfrac{20}{100}$.'],
      solution: 'Số học sinh đạt mức Tốt: $300 \\cdot \\dfrac{20}{100} = 60$.',
    },
    {
      type: 'number',
      prompt:
        'Một biểu đồ hình quạt có bốn hình quạt. Ba hình quạt biểu diễn $30\\%$, $25\\%$ và $15\\%$. Hình quạt thứ tư biểu diễn bao nhiêu phần trăm?',
      answer: 30,
      unit: '%',
      hints: ['Cả hình tròn biểu diễn $100\\%$.'],
      solution: '$100\\% - (30\\% + 25\\% + 15\\%) = 100\\% - 70\\% = 30\\%$.',
    },
    {
      type: 'number',
      prompt: 'Hình quạt biểu diễn $25\\%$ có góc ở tâm bằng bao nhiêu độ?',
      answer: 90,
      unit: '°',
      hints: ['$1\\%$ ứng với $3{,}6^\\circ$.'],
      solution: '$25 \\cdot 3{,}6^\\circ = 90^\\circ$ (một phần tư hình tròn).',
    },
    {
      type: 'number',
      prompt: 'Hình quạt biểu diễn $15\\%$ có góc ở tâm bằng bao nhiêu độ?',
      answer: 54,
      unit: '°',
      hints: ['$1\\%$ ứng với $3{,}6^\\circ$.', 'Tính $15 \\cdot 3{,}6$.'],
      solution: '$15 \\cdot 3{,}6^\\circ = 54^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Một hình quạt có góc ở tâm $72^\\circ$. Hình quạt đó biểu diễn bao nhiêu phần trăm của toàn thể?',
      answer: 20,
      unit: '%',
      hints: ['$360^\\circ$ ứng với $100\\%$.', 'Tính $\\dfrac{72}{360} \\cdot 100\\%$.'],
      solution: '$\\dfrac{72}{360} \\cdot 100\\% = \\dfrac{1}{5} \\cdot 100\\% = 20\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Lớp 7C có $36$ học sinh, trong đó $9$ bạn thích môn Ngữ văn nhất. Trên biểu đồ hình quạt, hình quạt "Ngữ văn" biểu diễn bao nhiêu phần trăm?',
      answer: 25,
      unit: '%',
      hints: ['Tỉ lệ $= \\dfrac{\\text{số lượng}}{\\text{tổng số}} \\cdot 100\\%$.'],
      solution: '$\\dfrac{9}{36} \\cdot 100\\% = \\dfrac{1}{4} \\cdot 100\\% = 25\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Lớp 7A có $40$ học sinh. Biểu đồ hình quạt cho biết $35\\%$ số bạn đi xe đạp và $15\\%$ số bạn đi xe buýt. Số bạn đi xe đạp nhiều hơn số bạn đi xe buýt bao nhiêu bạn?',
      answer: 8,
      unit: 'bạn',
      hints: [
        'Tính số bạn của từng nhóm, hoặc tính phần trăm chênh lệch trước.',
        'Chênh lệch là $35\\% - 15\\% = 20\\%$ của $40$ bạn.',
      ],
      solution:
        'Xe đạp: $40 \\cdot \\dfrac{35}{100} = 14$ bạn; xe buýt: $40 \\cdot \\dfrac{15}{100} = 6$ bạn. Chênh lệch: $14 - 6 = 8$ bạn.',
    },
    {
      type: 'choice',
      prompt: 'Dữ liệu nào sau đây nên biểu diễn bằng biểu đồ hình quạt tròn?',
      options: [
        'Nhiệt độ trung bình của Hà Nội qua $12$ tháng',
        'Tỉ lệ các loại sách trong thư viện của trường',
        'Chiều cao của một cây đậu qua từng ngày',
        'Số dân của Việt Nam qua các năm',
      ],
      answer: 1,
      hints: ['Biểu đồ hình quạt so sánh các phần của một toàn thể.'],
      solution:
        'Các loại sách ghép lại thành toàn bộ sách của thư viện, nên dùng biểu đồ hình quạt. Ba dữ liệu còn lại thay đổi theo thời gian, nên dùng biểu đồ đoạn thẳng.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng về biểu đồ hình quạt tròn.',
      options: [
        'Cả hình tròn biểu diễn $100\\%$.',
        'Hình quạt càng lớn thì thành phần đó chiếm tỉ lệ càng lớn.',
        'Một nửa hình tròn biểu diễn $50\\%$.',
        'Tổng các tỉ lệ trên biểu đồ có thể lớn hơn $100\\%$.',
      ],
      answers: [0, 1, 2],
      hints: ['Các hình quạt ghép lại vừa đủ một hình tròn.'],
      solution:
        'Ba khẳng định đầu đúng. Các hình quạt ghép lại đúng bằng hình tròn, nên tổng các tỉ lệ luôn bằng $100\\%$, không thể lớn hơn.',
    },
  ],
  takeaways: [
    'Biểu đồ hình quạt tròn biểu diễn tỉ lệ phần trăm của từng thành phần so với toàn thể; cả hình tròn là $100\\%$.',
    'Số lượng của thành phần chiếm $a\\%$ trong tổng số $N$ là $N \\cdot \\dfrac{a}{100}$.',
    'Tỉ lệ $=\\dfrac{\\text{số lượng}}{\\text{tổng số}} \\cdot 100\\%$; hình quạt $a\\%$ có góc ở tâm $a \\cdot 3{,}6^\\circ$.',
  ],
};
