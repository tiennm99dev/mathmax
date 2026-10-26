/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương Dữ liệu và biểu đồ: hệ thống kiến thức về thu thập, phân loại, tính hợp lí của dữ liệu, biểu diễn bằng bảng, biểu đồ và phân tích số liệu, kèm bài kiểm tra có bản đồ kĩ năng.',
  intro:
    'Chương 5 giúp em đi trọn một vòng làm việc với dữ liệu: thu thập, phân loại, kiểm tra, biểu diễn rồi phân tích. Bài này hệ thống lại kiến thức của chương, rồi cho em làm bài tập trắc nghiệm, tự luận và một bài kiểm tra tự chấm. Bản đồ kĩ năng sẽ chỉ ra bài nào em cần ôn lại.',
  objectives: [
    'Hệ thống kiến thức của Bài 18, Bài 19 và Bài 20.',
    'Làm các bài trắc nghiệm và tự luận tổng hợp của chương.',
    'Vận dụng thống kê để giải các bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Bài', 'Kiến thức chính'],
          rows: [
            [
              'Bài 18. Thu thập và phân loại dữ liệu',
              'Thu thập trực tiếp hoặc gián tiếp. Số liệu rời rạc, liên tục; dữ liệu định tính sắp thứ tự được hoặc không. Kiểm tra tính hợp lí của dữ liệu.',
            ],
            [
              'Bài 19. Biểu diễn dữ liệu bằng bảng, biểu đồ',
              'Bảng thống kê, biểu đồ tranh, cột, cột kép, hình quạt tròn, đoạn thẳng; chọn loại phù hợp với mục đích; chuyển đổi giữa các dạng.',
            ],
            [
              'Bài 20. Phân tích số liệu thống kê dựa vào biểu đồ',
              'Đọc số liệu, tính hiệu, tỉ số, tỉ lệ phần trăm, mức tăng giảm; nhận xét xu hướng; nhận biết biểu đồ gây hiểu lầm.',
            ],
          ],
        },
        {
          type: 'tex',
          tex: '\\text{tỉ lệ} = \\dfrac{\\text{phần}}{\\text{tổng}} \\cdot 100\\%;\\qquad \\text{số lượng} = \\text{tổng} \\cdot \\dfrac{a}{100};\\qquad \\text{mức thay đổi} = \\dfrac{b - a}{a} \\cdot 100\\%',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Dùng biểu đồ hình quạt tròn cho dữ liệu không phải các phần của một toàn thể; dùng biểu đồ đoạn thẳng khi trục ngang không phải thời gian; kết luận "gấp mấy lần" chỉ bằng chiều cao cột khi trục đứng không bắt đầu từ $0$.',
        },
      ],
    },
    {
      heading: 'Bài kiểm tra cuối chương',
      blocks: [
        {
          type: 'p',
          text: 'Phần Khám phá là một bài kiểm tra $12$ câu sinh ngẫu nhiên, $3$ câu cho mỗi bài và $3$ câu vận dụng thực tế. Ô của mỗi bài trên bản đồ kĩ năng chuyển xanh, vàng hoặc đỏ theo kết quả lần làm đầu tiên.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra có bản đồ kĩ năng',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng chương 5 cho biết em cần ôn lại bài nào.',
  },
  examples: [
    {
      problem:
        'Bảng sau cho số khách du lịch (nghìn lượt) đến một tỉnh trong bốn quý của năm: quý I: $120$; quý II: $150$; quý III: $180$; quý IV: $150$. a) Nên dùng biểu đồ nào để thấy sự thay đổi qua các quý? b) Quý III tăng bao nhiêu phần trăm so với quý I? c) Trung bình mỗi quý có bao nhiêu nghìn lượt khách?',
      steps: [
        'a) Số khách thay đổi theo thời gian (các quý), nên dùng biểu đồ đoạn thẳng.',
        'b) $\\dfrac{180 - 120}{120} \\cdot 100\\% = \\dfrac{60}{120} \\cdot 100\\% = 50\\%$.',
        'c) Tổng: $120 + 150 + 180 + 150 = 600$; trung bình: $600 : 4 = 150$ (nghìn lượt).',
      ],
      answer: 'a) Biểu đồ đoạn thẳng; b) Tăng $50\\%$; c) $150$ nghìn lượt.',
    },
    {
      problem:
        'Một khu dân cư có $600$ hộ. Biểu đồ hình quạt tròn về nguồn nước sinh hoạt cho biết: nước máy $65\\%$, giếng khoan $20\\%$, nước mưa $15\\%$. Bạn Hà vẽ lại bằng biểu đồ cột với trục đứng bắt đầu từ $80$ hộ. a) Tính số hộ dùng mỗi nguồn nước. b) Trên biểu đồ của Hà, cột "Giếng khoan" cao gấp mấy lần cột "Nước mưa"?',
      steps: [
        'a) Nước máy: $600 \\cdot \\dfrac{65}{100} = 390$ hộ; giếng khoan: $600 \\cdot \\dfrac{20}{100} = 120$ hộ; nước mưa: $600 \\cdot \\dfrac{15}{100} = 90$ hộ.',
        'b) Phần cột nhìn thấy: giếng khoan $120 - 80 = 40$, nước mưa $90 - 80 = 10$.',
        'Trên hình, cột "Giếng khoan" cao gấp $40 : 10 = 4$ lần, trong khi thực tế $120 : 90$ chỉ khoảng $1{,}33$ lần.',
      ],
      answer:
        'a) $390$; $120$; $90$ hộ. b) Gấp $4$ lần trên hình: biểu đồ của Hà gây hiểu lầm vì trục không bắt đầu từ $0$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Dãy dữ liệu nào là số liệu rời rạc?',
      options: [
        'Chiều cao (cm) của các cây bạch đàn',
        'Số chiếc điện thoại di động của mỗi gia đình',
        'Lượng nước (lít) mỗi gia đình dùng trong ngày',
        'Màu sơn của các ngôi nhà',
      ],
      answer: 1,
      hints: ['Số liệu rời rạc là kết quả của phép đếm.'],
      solution:
        'Số chiếc điện thoại di động của mỗi gia đình là số đếm ($0, 1, 2, \\ldots$), nên là số liệu rời rạc. Chiều cao và lượng nước là số đo (liên tục); màu sơn là dữ liệu định tính.',
    },
    {
      type: 'choice',
      prompt: 'Cách thu thập dữ liệu nào sau đây là thu thập gián tiếp?',
      options: [
        'Phỏng vấn các bạn về thời gian dùng điện thoại mỗi ngày',
        'Đếm số ô tô đi qua ngã tư trong $15$ phút',
        'Lấy số liệu về diện tích các tỉnh trong sách Địa lí',
        'Đo chiều dài lá cây trong vườn trường',
      ],
      answer: 2,
      hints: ['Thu thập gián tiếp là lấy từ nguồn có sẵn.'],
      solution:
        'Diện tích các tỉnh đã có sẵn trong sách, ta chỉ lấy lại: thu thập gián tiếp. Ba cách còn lại là phỏng vấn, quan sát, đo: thu thập trực tiếp.',
    },
    {
      type: 'choice',
      prompt:
        'Để biểu diễn tỉ lệ phần trăm diện tích các loại cây trồng (lúa, ngô, rau, cây ăn quả) trong tổng diện tích đất nông nghiệp của một xã, nên dùng biểu đồ nào?',
      options: ['Biểu đồ đoạn thẳng', 'Biểu đồ hình quạt tròn', 'Biểu đồ cột kép', 'Biểu đồ tranh'],
      answer: 1,
      hints: ['Các loại cây chiếm các phần của một toàn thể.'],
      solution:
        'Cần tỉ lệ các phần so với toàn thể (tổng diện tích đất nông nghiệp), nên dùng biểu đồ hình quạt tròn.',
    },
    {
      type: 'choice',
      prompt: 'Dữ liệu nào dưới đây không hợp lí?',
      options: [
        'Chiều cao học sinh lớp 8 (cm): $148$; $155$; $162$; $151$',
        'Điểm kiểm tra (thang $10$): $7$; $8{,}5$; $9$; $10$',
        'Tỉ lệ các loại sách trong thư viện: truyện $45\\%$, tham khảo $40\\%$, khoa học $25\\%$',
        'Số anh chị em ruột: $0$; $1$; $2$; $1$',
      ],
      answer: 2,
      hints: ['Cộng các tỉ lệ phần trăm.'],
      solution:
        '$45\\% + 40\\% + 25\\% = 110\\% > 100\\%$, nên dữ liệu về tỉ lệ các loại sách không hợp lí. Các dãy còn lại đều có giá trị trong phạm vi có thể.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi dãy dữ liệu với loại của nó.',
      left: [
        'Số tầng của các toà nhà',
        'Nhiệt độ (°C) của nước trong các cốc',
        'Mức độ hài lòng về bữa trưa: rất hài lòng, hài lòng, không hài lòng',
        'Loài vật nuôi trong nhà',
      ],
      right: [
        'Số liệu rời rạc',
        'Số liệu liên tục',
        'Định tính, sắp thứ tự được',
        'Định tính, không sắp thứ tự được',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Số đếm hay số đo? Có thứ tự hay không?'],
      solution:
        'Số tầng là số đếm: rời rạc. Nhiệt độ là số đo: liên tục. Mức độ hài lòng có thứ tự. Loài vật nuôi không có thứ tự.',
    },
    {
      type: 'number',
      prompt:
        'Kết quả bình chọn môn học yêu thích (mỗi bạn chọn một môn): Toán $45\\%$, Ngữ văn $20\\%$, Tiếng Anh $15\\%$, còn lại là Khoa học tự nhiên. Để dữ liệu hợp lí, tỉ lệ chọn Khoa học tự nhiên là bao nhiêu phần trăm?',
      answer: 20,
      unit: '%',
      hints: ['Tổng các tỉ lệ bằng $100\\%$.'],
      solution: '$100\\% - (45\\% + 20\\% + 15\\%) = 100\\% - 80\\% = 20\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Khối 8 có $80$ học sinh, trong đó $28$ bạn đi xe đạp đến trường. Khi vẽ biểu đồ hình quạt tròn, phần "Xe đạp" chiếm bao nhiêu phần trăm?',
      answer: 35,
      unit: '%',
      hints: ['Tỉ lệ $= \\dfrac{28}{80} \\cdot 100\\%$.'],
      solution: '$\\dfrac{28}{80} \\cdot 100\\% = 35\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Một phường có $600$ hộ gia đình. Biểu đồ hình quạt tròn về loại phương tiện chính của các hộ cho biết phần "Ô tô" chiếm $15\\%$. Có bao nhiêu hộ dùng ô tô?',
      answer: 90,
      unit: 'hộ',
      hints: ['Số hộ $= 600 \\cdot \\dfrac{15}{100}$.'],
      solution: '$600 \\cdot \\dfrac{15}{100} = 90$ (hộ).',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ đoạn thẳng cho số lượt khách (nghìn lượt) đến một khu du lịch trong bốn quý: $90$; $130$; $170$; $110$. Trung bình mỗi quý có bao nhiêu nghìn lượt khách?',
      answer: 125,
      unit: 'nghìn lượt',
      hints: ['Cộng bốn số liệu rồi chia cho $4$.'],
      solution: '$(90 + 130 + 170 + 110) : 4 = 500 : 4 = 125$ (nghìn lượt).',
    },
    {
      type: 'number',
      prompt:
        'Số học sinh tham gia hiến máu nhân đạo của một trường tăng từ $250$ bạn lên $300$ bạn. Số bạn tham gia tăng bao nhiêu phần trăm?',
      answer: 20,
      unit: '%',
      hints: ['Mức tăng phần trăm $= \\dfrac{b - a}{a} \\cdot 100\\%$.'],
      solution: '$\\dfrac{300 - 250}{250} \\cdot 100\\% = \\dfrac{50}{250} \\cdot 100\\% = 20\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Một biểu đồ cột có trục đứng bắt đầu từ $80$. Cột A biểu diễn $85$, cột B biểu diễn $100$. Trên hình, cột B cao gấp mấy lần cột A?',
      answer: 4,
      hints: ['Phần cột nhìn thấy được tính từ $80$.'],
      solution:
        'Phần nhìn thấy: A cao $85 - 80 = 5$, B cao $100 - 80 = 20$. Trên hình B cao gấp $20 : 5 = 4$ lần A, dù thực tế $100 : 85$ chỉ khoảng $1{,}18$ lần.',
    },
    {
      type: 'multi',
      prompt:
        'Số cây xanh trồng được của bốn lớp: 8A $40$ cây, 8B $35$ cây, 8C $50$ cây, 8D $45$ cây. Chọn tất cả các nhận xét đúng.',
      options: [
        'Lớp 8C trồng được nhiều cây nhất',
        'Bốn lớp trồng được tất cả $170$ cây',
        'Lớp 8C trồng gấp đôi lớp 8B',
        'Trung bình mỗi lớp trồng được $42{,}5$ cây',
      ],
      answers: [0, 1, 3],
      hints: ['Tính tổng và trung bình; so sánh $50$ với $2 \\cdot 35$.'],
      solution:
        'Lớp 8C nhiều nhất ($50$ cây). Tổng: $40 + 35 + 50 + 45 = 170$ cây; trung bình $170 : 4 = 42{,}5$ cây. $2 \\cdot 35 = 70 \\ne 50$, nên 8C không trồng gấp đôi 8B.',
    },
  ],
  takeaways: [
    'Dữ liệu: thu thập trực tiếp hoặc gián tiếp; số liệu rời rạc, liên tục; định tính sắp thứ tự được hoặc không.',
    'Luôn kiểm tra tính hợp lí trước khi dùng dữ liệu.',
    'Chọn biểu đồ theo mục đích và chuyển đổi được giữa bảng và biểu đồ.',
    'Phân tích bằng số liệu; cảnh giác với trục đứng không bắt đầu từ $0$.',
  ],
};
