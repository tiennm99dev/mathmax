/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về thu thập, phân loại và kiểm tra tính hợp lí của dữ liệu, chọn và chuyển đổi dạng biểu diễn, đọc và phân tích số liệu trên biểu đồ.',
  intro:
    'Bài luyện tập này ôn lại Bài 18 (Thu thập và phân loại dữ liệu), Bài 19 (Biểu diễn dữ liệu bằng bảng, biểu đồ) và Bài 20 (Phân tích số liệu thống kê dựa vào biểu đồ). Em sẽ phân loại dữ liệu, phát hiện giá trị không hợp lí, tính tỉ lệ phần trăm, đọc biểu đồ và nhận ra biểu đồ gây hiểu lầm.',
  objectives: [
    'Phân loại dữ liệu và kiểm tra tính hợp lí của dữ liệu.',
    'Chọn biểu đồ phù hợp; chuyển dữ liệu giữa bảng, biểu đồ tranh và biểu đồ hình quạt tròn.',
    'Đọc, tính toán và rút ra kết luận từ biểu đồ; nhận biết biểu đồ gây hiểu lầm.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Thu thập dữ liệu',
              'Trực tiếp: quan sát, làm thí nghiệm, lập bảng hỏi, phỏng vấn. Gián tiếp: từ nguồn có sẵn.',
            ],
            [
              'Phân loại dữ liệu',
              'Số liệu: rời rạc (số đếm), liên tục (số đo). Định tính: sắp thứ tự được hoặc không.',
            ],
            [
              'Tính hợp lí',
              'Giá trị trong phạm vi có thể; đúng loại số; tổng các phần không vượt toàn thể (tổng tỉ lệ là $100\\%$).',
            ],
            [
              'Chọn biểu đồ',
              'Cột: so sánh; cột kép: so sánh hai tập dữ liệu; quạt tròn: tỉ lệ trong toàn thể; đoạn thẳng: thay đổi theo thời gian.',
            ],
            [
              'Tính toán',
              'Tỉ lệ $= \\dfrac{\\text{phần}}{\\text{tổng}} \\cdot 100\\%$; số lượng $= \\text{tổng} \\cdot \\dfrac{a}{100}$; mức thay đổi $\\dfrac{b - a}{a} \\cdot 100\\%$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Đọc trục đứng trước khi kết luận: trục không bắt đầu từ $0$ làm chênh lệch trông lớn hơn thực tế.',
        },
      ],
    },
    {
      heading: 'Các bước giải một bài toán thống kê',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Xác định dữ liệu được thu thập thế nào và thuộc loại nào.',
            'Kiểm tra tính hợp lí: có giá trị nào vô lí, tổng các phần có khớp với toàn thể không.',
            'Chọn dạng biểu diễn phù hợp với mục đích, tính các số cần thiết (tỉ lệ phần trăm, số biểu tượng) rồi vẽ.',
            'Đọc biểu đồ, tính toán và rút ra kết luận.',
          ],
        },
        {
          type: 'p',
          text: 'Hai ví dụ dưới đây đi qua đủ các bước đó với cùng một cuộc khảo sát.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện trộn ngẫu nhiên',
    instruction:
      'Mỗi lượt có $12$ câu trộn từ ba bài của chương. Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết em cần ôn lại bài nào.',
  },
  examples: [
    {
      problem:
        'Bạn Minh hỏi $40$ bạn lớp 8A về thời gian ngủ mỗi đêm và ghi: dưới $7$ giờ: $12$ bạn; từ $7$ đến $8$ giờ: $18$ bạn; trên $8$ giờ: $14$ bạn. a) Minh thu thập dữ liệu bằng cách nào? b) Dữ liệu có hợp lí không?',
      steps: [
        'a) Minh hỏi trực tiếp các bạn, nên đây là thu thập trực tiếp (phỏng vấn).',
        'b) Mỗi bạn thuộc đúng một nhóm, nên tổng ba nhóm phải bằng $40$.',
        'Tổng: $12 + 18 + 14 = 44 > 40$, nên dữ liệu không hợp lí.',
      ],
      answer: 'a) Thu thập trực tiếp; b) Không hợp lí vì tổng số bạn là $44$, nhiều hơn $40$.',
    },
    {
      problem:
        'Sau khi sửa lại, kết quả là: dưới $7$ giờ: $10$ bạn; từ $7$ đến $8$ giờ: $18$ bạn; trên $8$ giờ: $12$ bạn. Minh muốn biểu diễn tỉ lệ phần trăm số bạn mỗi nhóm so với cả lớp. Nên dùng biểu đồ nào? Tính các tỉ lệ đó.',
      steps: [
        'Kiểm tra: $10 + 18 + 12 = 40$; ba nhóm là ba phần của cả lớp, nên dùng biểu đồ hình quạt tròn.',
        'Dưới $7$ giờ: $\\dfrac{10}{40} \\cdot 100\\% = 25\\%$.',
        'Từ $7$ đến $8$ giờ: $\\dfrac{18}{40} \\cdot 100\\% = 45\\%$; trên $8$ giờ: $\\dfrac{12}{40} \\cdot 100\\% = 30\\%$.',
        'Kiểm tra: $25\\% + 45\\% + 30\\% = 100\\%$.',
      ],
      answer: 'Biểu đồ hình quạt tròn: $25\\%$; $45\\%$; $30\\%$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Cô y tế đo nhiệt độ cơ thể của từng bạn khi vào lớp và ghi lại. Cô đã thu thập dữ liệu bằng cách nào?',
      options: ['Trực tiếp', 'Gián tiếp'],
      answer: 0,
      hints: ['Cô tự đo hay lấy từ nguồn có sẵn?'],
      solution: 'Cô tự đo (quan sát, đo đạc) nên là thu thập trực tiếp.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các dãy là số liệu liên tục.',
      options: [
        'Chiều dài (cm) của các bàn học',
        'Số học sinh nữ của mỗi lớp',
        'Thời gian (phút) làm xong bài kiểm tra',
        'Cỡ giày: nhỏ, vừa, lớn',
        'Cân nặng (kg) của các quả dưa hấu',
      ],
      answers: [0, 2, 4],
      hints: ['Số liệu liên tục là kết quả của phép đo.'],
      solution:
        'Chiều dài, thời gian, cân nặng là số đo: số liệu liên tục. Số học sinh nữ là số đếm: rời rạc. Cỡ giày "nhỏ, vừa, lớn" là dữ liệu định tính.',
    },
    {
      type: 'number',
      prompt:
        'Kết quả bình chọn màu áo lớp (mỗi bạn chọn một màu): xanh $30\\%$, đỏ $25\\%$, vàng $20\\%$, còn lại chọn trắng. Để dữ liệu hợp lí, tỉ lệ chọn màu trắng là bao nhiêu phần trăm?',
      answer: 25,
      unit: '%',
      hints: ['Tổng các tỉ lệ bằng $100\\%$.'],
      solution: '$100\\% - (30\\% + 25\\% + 20\\%) = 100\\% - 75\\% = 25\\%$.',
    },
    {
      type: 'choice',
      prompt: 'Để so sánh số xe máy bán được trong năm của bốn cửa hàng, nên dùng biểu đồ nào?',
      options: ['Biểu đồ cột', 'Biểu đồ đoạn thẳng', 'Biểu đồ hình quạt tròn'],
      answer: 0,
      hints: ['Mục đích là so sánh các đối tượng hay theo dõi theo thời gian?'],
      solution:
        'Cần so sánh số lượng của các đối tượng khác nhau (bốn cửa hàng), nên dùng biểu đồ cột.',
    },
    {
      type: 'number',
      prompt:
        'Khảo sát $40$ học sinh, có $6$ bạn chọn cờ vua. Trên biểu đồ hình quạt tròn, phần "Cờ vua" chiếm bao nhiêu phần trăm?',
      answer: 15,
      unit: '%',
      hints: ['Tỉ lệ $= \\dfrac{6}{40} \\cdot 100\\%$.'],
      solution: '$\\dfrac{6}{40} \\cdot 100\\% = 15\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ hình quạt tròn về món ăn yêu thích của $120$ học sinh cho biết phần "Phở" chiếm $30\\%$. Có bao nhiêu học sinh thích phở?',
      answer: 36,
      unit: 'học sinh',
      hints: ['Số học sinh $= 120 \\cdot \\dfrac{30}{100}$.'],
      solution: '$120 \\cdot \\dfrac{30}{100} = 36$ (học sinh).',
    },
    {
      type: 'number',
      prompt:
        'Trong một biểu đồ tranh, mỗi biểu tượng ứng với $20$ cây. Lớp 8B có $3$ biểu tượng và nửa biểu tượng. Lớp 8B trồng được bao nhiêu cây?',
      answer: 70,
      unit: 'cây',
      hints: ['Nửa biểu tượng ứng với $10$ cây.'],
      solution: '$3 \\cdot 20 + 10 = 70$ (cây).',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ đoạn thẳng cho lượng mưa (mm) ở một thành phố từ tháng 5 đến tháng 8 lần lượt là: $150$; $210$; $260$; $240$. Lượng mưa tháng 7 nhiều hơn tháng 5 bao nhiêu mi-li-mét?',
      answer: 110,
      unit: 'mm',
      hints: ['Đọc lượng mưa tháng 5 và tháng 7 rồi tính hiệu.'],
      solution: '$260 - 150 = 110$ (mm).',
    },
    {
      type: 'number',
      prompt:
        'Số sách thư viện nhận được tăng từ $160$ cuốn (năm trước) lên $200$ cuốn (năm nay). Số sách tăng bao nhiêu phần trăm?',
      answer: 25,
      unit: '%',
      hints: ['Mức tăng phần trăm $= \\dfrac{b - a}{a} \\cdot 100\\%$.'],
      solution: '$\\dfrac{200 - 160}{160} \\cdot 100\\% = \\dfrac{40}{160} \\cdot 100\\% = 25\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Một biểu đồ cột có trục đứng bắt đầu từ $100$. Cột A biểu diễn $110$, cột B biểu diễn $140$. Trên hình, cột B cao gấp mấy lần cột A?',
      answer: 4,
      hints: ['Phần cột nhìn thấy bắt đầu từ $100$.'],
      solution:
        'Phần nhìn thấy: A cao $110 - 100 = 10$, B cao $140 - 100 = 40$. Trên hình B cao gấp $40 : 10 = 4$ lần A, trong khi thực tế $140 : 110$ chỉ khoảng $1{,}27$ lần.',
    },
    {
      type: 'choice',
      prompt:
        'Một quảng cáo vẽ biểu đồ cột: điện thoại của hãng A có thời lượng pin $21$ giờ, hãng B $20$ giờ, nhưng cột A cao gấp đôi cột B. Nhận xét nào đúng?',
      options: [
        'Pin của hãng A tốt gấp đôi hãng B',
        'Biểu đồ gây hiểu lầm vì trục đứng không bắt đầu từ $0$; A chỉ hơn B $5\\%$',
        'Biểu đồ đúng vì số liệu đúng',
      ],
      answer: 1,
      hints: ['$21$ gấp $20$ mấy lần?'],
      solution:
        '$\\dfrac{21 - 20}{20} \\cdot 100\\% = 5\\%$. Cột A cao gấp đôi chỉ có thể do trục đứng bắt đầu từ $19$ (phần nhìn thấy $2$ và $1$), nên biểu đồ gây hiểu lầm.',
    },
  ],
  takeaways: [
    'Kiểm tra tính hợp lí trước khi biểu diễn và phân tích dữ liệu.',
    'Chọn biểu đồ theo mục đích: so sánh, tỉ lệ trong toàn thể, hay thay đổi theo thời gian.',
    'Kết luận dựa trên số liệu tính được, và luôn đọc trục đứng của biểu đồ.',
  ],
};
