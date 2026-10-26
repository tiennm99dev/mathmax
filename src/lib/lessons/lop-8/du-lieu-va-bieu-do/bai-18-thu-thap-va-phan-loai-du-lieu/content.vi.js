/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thu thập dữ liệu trực tiếp và gián tiếp, phân loại dữ liệu định lượng (rời rạc, liên tục) và định tính (sắp thứ tự được hoặc không), kiểm tra tính hợp lí của dữ liệu.',
  intro:
    'Lớp 8A muốn tìm hiểu về sức khoẻ của các bạn trong lớp. Có bạn đề nghị cân, đo từng bạn; có bạn đề nghị lấy số liệu từ sổ khám sức khoẻ của phòng y tế. Khi ghi lại, bạn Lan viết nhầm một bạn nặng $145$ kg. Bài này giúp em chọn cách thu thập dữ liệu, gọi đúng tên từng loại dữ liệu và phát hiện những giá trị không hợp lí như thế.',
  objectives: [
    'Phân biệt thu thập dữ liệu trực tiếp và gián tiếp.',
    'Phân loại dữ liệu: số liệu rời rạc, số liệu liên tục; dữ liệu định tính sắp thứ tự được và không sắp thứ tự được.',
    'Phát hiện những giá trị không hợp lí trong một dãy dữ liệu và giải thích vì sao.',
  ],
  sections: [
    {
      heading: 'Thu thập dữ liệu',
      blocks: [
        {
          type: 'p',
          text: 'Có hai cách thu thập dữ liệu: tự mình tạo ra dữ liệu, hoặc lấy lại dữ liệu mà người khác đã thu thập và công bố.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Thu thập trực tiếp và gián tiếp',
          text: 'Thu thập trực tiếp: quan sát, làm thí nghiệm, lập bảng hỏi, phỏng vấn. Thu thập gián tiếp: lấy dữ liệu từ những nguồn có sẵn như sách, báo, trang web, …',
        },
        {
          type: 'table',
          head: ['Tình huống', 'Cách thu thập'],
          rows: [
            [
              'Giáo viên dùng đồng hồ bấm giờ đo thời gian chạy $1\\,000$ m của từng bạn',
              'Trực tiếp (đo, quan sát)',
            ],
            [
              'Lớp trưởng phát phiếu hỏi các bạn về món ăn sáng yêu thích',
              'Trực tiếp (lập bảng hỏi)',
            ],
            [
              'Nam lấy số huyện của các tỉnh đồng bằng sông Hồng trên trang web của Tổng cục Thống kê',
              'Gián tiếp',
            ],
            ['Mai chép nhiệt độ các ngày trong tuần từ bản tin thời tiết', 'Gián tiếp'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Chọn cách thu thập theo điều cần tìm hiểu: muốn biết ý kiến, sở thích thì hỏi trực tiếp; số liệu về dân số, kinh tế, thời tiết của cả nước thì nên lấy từ nguồn có sẵn, đáng tin cậy.',
        },
      ],
    },
    {
      heading: 'Phân loại dữ liệu',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Dữ liệu định lượng và dữ liệu định tính',
          text: 'Dữ liệu là số gọi là số liệu (dữ liệu định lượng). Dữ liệu không phải là số gọi là dữ liệu định tính, được ghi bằng chữ, kí hiệu, …',
        },
        {
          type: 'p',
          text: 'Số liệu lại chia thành hai loại. Số học sinh trong một lớp chỉ có thể là $30$, $31$, $32$, …, không thể là $31{,}5$; còn chiều cao của một bạn có thể là $150$ cm, $150{,}5$ cm, $150{,}52$ cm, … tuỳ theo dụng cụ đo.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số liệu rời rạc và số liệu liên tục',
          text: 'Số liệu rời rạc chỉ nhận những giá trị rời nhau, thường là kết quả của phép đếm (số học sinh, số bàn thắng, số chữ cái trong tên). Số liệu liên tục có thể nhận mọi giá trị trong một khoảng nào đó, thường là kết quả của phép đo (chiều cao, cân nặng, thời gian, nhiệt độ).',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai loại dữ liệu định tính',
          text: 'Dữ liệu định tính sắp thứ tự được khi các giá trị xếp được từ thấp đến cao (mức độ hài lòng, xếp loại học tập, cỡ áo $S, M, L, XL$). Dữ liệu định tính không sắp thứ tự được khi không giá trị nào đứng trước giá trị nào (màu sắc, môn thể thao, nơi sinh).',
        },
        {
          type: 'table',
          caption: 'Sơ đồ phân loại dữ liệu',
          head: ['Loại', 'Nhóm con', 'Ví dụ'],
          rows: [
            ['Số liệu (định lượng)', 'Rời rạc', 'Số anh chị em ruột; số môn thể thao biết chơi'],
            ['Số liệu (định lượng)', 'Liên tục', 'Chiều cao (cm); thời gian chạy $100$ m (giây)'],
            ['Định tính', 'Sắp thứ tự được', 'Rất thích, thích, không thích'],
            ['Định tính', 'Không sắp thứ tự được', 'Mạng điện thoại di động đang dùng'],
          ],
        },
      ],
    },
    {
      heading: 'Tính hợp lí của dữ liệu',
      blocks: [
        {
          type: 'p',
          text: 'Khi ghi chép, ta có thể nhầm lẫn: viết thiếu dấu phẩy, thừa chữ số, ghi sai đơn vị. Trước khi dùng dữ liệu, cần kiểm tra xem nó có hợp lí không.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Kiểm tra tính hợp lí',
          text: 'Trước khi phân tích, cần kiểm tra dữ liệu có hợp lí không. Dữ liệu hợp lí phải thoả mãn đồng thời bốn điều dưới đây.',
        },
        {
          type: 'list',
          items: [
            'Mỗi giá trị nằm trong phạm vi có thể có của đại lượng: học sinh lớp 8 không nặng $145$ kg hay $4{,}8$ kg; điểm theo thang $10$ không vượt quá $10$.',
            'Đúng loại số: số đếm (số người, số con) phải là số tự nhiên.',
            'Các phần không vượt quá toàn thể: tổng tỉ lệ phần trăm các phần của một toàn thể bằng $100\\%$; số học sinh của các nhóm không vượt quá sĩ số.',
            'Dữ liệu có tính đại diện cho toàn bộ đối tượng cần tìm hiểu.',
          ],
        },
        {
          type: 'p',
          text: 'Mỗi bộ dữ liệu dưới đây có vài giá trị không hợp lí. Chạm để đánh dấu chúng rồi kiểm tra.',
        },
        { type: 'widget', name: 'hop-li' },
      ],
    },
  ],
  explore: {
    title: 'Kho dữ liệu',
    instruction:
      'Chọn "Cách thu thập" để xếp mỗi tình huống vào thu thập trực tiếp hoặc gián tiếp; chọn "Loại dữ liệu" để xếp mỗi thẻ vào một trong bốn loại. Chọn một thẻ rồi chọn ô; mỗi lần đặt, em sẽ biết vì sao đúng hay sai.',
  },
  examples: [
    {
      problem:
        'Mỗi bạn dưới đây đã thu thập dữ liệu trực tiếp hay gián tiếp? a) Nam lấy số huyện của các tỉnh đồng bằng sông Hồng trên trang web của Tổng cục Thống kê. b) Giáo viên thể dục dùng đồng hồ bấm giờ đo thời gian chạy $1\\,000$ m của các bạn trong lớp.',
      steps: [
        'a) Số huyện của các tỉnh đã được Tổng cục Thống kê công bố; Nam chỉ lấy lại từ nguồn có sẵn.',
        'b) Giáo viên tự quan sát và đo thời gian chạy của từng bạn, nên tự tạo ra dữ liệu.',
      ],
      answer: 'a) Thu thập gián tiếp; b) Thu thập trực tiếp.',
    },
    {
      problem:
        'Một phiếu hỏi có bốn câu: a) Bạn nặng bao nhiêu ki-lô-gam? b) Tên của bạn có bao nhiêu chữ cái? c) Bạn đang dùng mạng điện thoại di động nào? d) Bạn đánh giá bữa ăn bán trú thế nào: rất ngon, ngon, bình thường, không ngon? Phân loại dữ liệu thu được ở mỗi câu.',
      steps: [
        'a) Cân nặng là số đo, có thể nhận mọi giá trị trong một khoảng (chẳng hạn từ $35$ kg đến $70$ kg): số liệu liên tục.',
        'b) Số chữ cái là số đếm, chỉ là $1$, $2$, $3$, …: số liệu rời rạc.',
        'c) Tên nhà mạng không phải là số và không có nhà mạng nào đứng trước: dữ liệu định tính không sắp thứ tự được.',
        'd) Các mức đánh giá không phải là số nhưng xếp được từ "rất ngon" đến "không ngon": dữ liệu định tính sắp thứ tự được.',
      ],
      answer:
        'a) Số liệu liên tục; b) Số liệu rời rạc; c) Định tính, không sắp thứ tự được; d) Định tính, sắp thứ tự được.',
    },
    {
      problem:
        'Kết quả tìm hiểu về phương tiện đến trường của học sinh lớp 8B được ghi: đi bộ $20\\%$; xe đạp $45\\%$; xe buýt $25\\%$; bố mẹ đưa đón $18\\%$ (mỗi bạn chọn đúng một phương tiện). Dữ liệu này có hợp lí không?',
      steps: [
        'Mỗi bạn chọn đúng một phương tiện, nên bốn nhóm là bốn phần của cả lớp và tổng các tỉ lệ phải bằng $100\\%$.',
        'Tổng các tỉ lệ: $20\\% + 45\\% + 25\\% + 18\\% = 108\\%$.',
        '$108\\% > 100\\%$, nên ít nhất một tỉ lệ đã bị ghi sai.',
      ],
      answer: 'Không hợp lí, vì tổng các tỉ lệ là $108\\%$, lớn hơn $100\\%$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Để biết số dân của các tỉnh, thành phố năm 2023, bạn Hùng tra niên giám của Tổng cục Thống kê. Hùng đã thu thập dữ liệu bằng cách nào?',
      options: [
        'Trực tiếp, bằng quan sát',
        'Trực tiếp, bằng phỏng vấn',
        'Gián tiếp, từ nguồn có sẵn',
      ],
      answer: 2,
      hints: ['Ai đã thu thập số dân trước Hùng?'],
      solution:
        'Số dân đã được Tổng cục Thống kê thu thập và công bố; Hùng chỉ lấy lại từ nguồn có sẵn, nên đó là thu thập gián tiếp.',
    },
    {
      type: 'choice',
      prompt:
        'Để biết loại quả các bạn trong lớp thích nhất, cách thu thập dữ liệu nào phù hợp nhất?',
      options: [
        'Lập phiếu hỏi các bạn trong lớp',
        'Tra cứu trên Internet',
        'Đếm số quả bán ở chợ',
        'Làm thí nghiệm',
      ],
      answer: 0,
      hints: ['Sở thích của các bạn trong lớp chỉ có các bạn ấy biết.'],
      solution:
        'Sở thích của các bạn trong lớp không có sẵn ở đâu cả; cách phù hợp là lập phiếu hỏi (hoặc phỏng vấn) từng bạn, tức thu thập trực tiếp.',
    },
    {
      type: 'choice',
      prompt: 'Thời gian (phút) đi từ nhà đến trường của các bạn trong tổ là loại dữ liệu nào?',
      options: [
        'Số liệu rời rạc',
        'Số liệu liên tục',
        'Định tính, sắp thứ tự được',
        'Định tính, không sắp thứ tự được',
      ],
      answer: 1,
      hints: ['Thời gian là số đếm hay số đo?', 'Thời gian có thể là $12{,}5$ phút không?'],
      solution:
        'Thời gian là một số đo, có thể nhận mọi giá trị trong một khoảng (như $12$; $12{,}5$; $12{,}75$ phút), nên là số liệu liên tục.',
    },
    {
      type: 'choice',
      prompt: 'Số cuốn sách mỗi bạn đọc trong tháng là loại dữ liệu nào?',
      options: [
        'Số liệu rời rạc',
        'Số liệu liên tục',
        'Định tính, sắp thứ tự được',
        'Định tính, không sắp thứ tự được',
      ],
      answer: 0,
      hints: ['Số cuốn sách nhận được kết quả bằng cách đếm hay đo?'],
      solution:
        'Số cuốn sách là kết quả của phép đếm, chỉ nhận các giá trị $0, 1, 2, \\ldots$ Đó là số liệu rời rạc.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi dãy dữ liệu với loại của nó.',
      left: [
        'Chiều dài (cm) của các chiếc lá',
        'Số học sinh nam của mỗi lớp',
        'Xếp loại hạnh kiểm: Tốt, Khá, Đạt, Chưa đạt',
        'Tỉnh, thành phố nơi sinh',
      ],
      right: [
        'Số liệu liên tục',
        'Số liệu rời rạc',
        'Định tính, sắp thứ tự được',
        'Định tính, không sắp thứ tự được',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Hỏi trước: dữ liệu có phải là số không?',
        'Với số liệu: số đếm hay số đo? Với dữ liệu định tính: có xếp được thứ tự không?',
      ],
      solution:
        'Chiều dài là số đo: liên tục. Số học sinh là số đếm: rời rạc. Xếp loại Tốt, Khá, Đạt, Chưa đạt có thứ tự từ cao xuống thấp. Nơi sinh không có thứ tự.',
    },
    {
      type: 'multi',
      prompt:
        'Bạn Lan ghi cân nặng (kg) của các bạn lớp 8A: $48$; $51$; $46$; $145$; $48$; $4{,}9$; $53$. Chọn tất cả các giá trị không hợp lí.',
      options: ['$48$', '$51$', '$145$', '$4{,}9$', '$53$'],
      answers: [2, 3],
      hints: ['Học sinh lớp 8 thường nặng trong khoảng nào?'],
      solution:
        'Học sinh lớp 8 thường nặng khoảng từ $30$ kg đến $70$ kg. $145$ kg quá nặng và $4{,}9$ kg quá nhẹ (chỉ như một em bé mới sinh vài tháng), nên hai giá trị này không hợp lí; có lẽ $4{,}9$ là $49$ bị ghi nhầm dấu phẩy.',
    },
    {
      type: 'number',
      prompt:
        'Khảo sát món ăn sáng yêu thích (mỗi bạn chọn một món): bánh mì $35\\%$, xôi $28\\%$, phở $22\\%$, còn lại là cơm tấm. Để dữ liệu hợp lí, tỉ lệ chọn cơm tấm là bao nhiêu phần trăm?',
      answer: 15,
      unit: '%',
      hints: ['Bốn món là bốn phần của toàn bộ các bạn được hỏi.', 'Tổng bốn tỉ lệ bằng $100\\%$.'],
      solution:
        'Tổng các tỉ lệ phải bằng $100\\%$, nên tỉ lệ chọn cơm tấm là $100\\% - (35\\% + 28\\% + 22\\%) = 100\\% - 85\\% = 15\\%$.',
    },
    {
      type: 'choice',
      prompt:
        'Lớp 8C có $40$ học sinh, mỗi bạn chọn đúng một môn thể thao yêu thích. Bạn lớp trưởng báo cáo: $18$ bạn chọn bóng đá, $15$ bạn chọn cầu lông, $12$ bạn chọn bơi. Nhận xét nào đúng?',
      options: [
        'Dữ liệu hợp lí',
        'Không hợp lí vì tổng số bạn là $45$, nhiều hơn sĩ số lớp',
        'Không hợp lí vì số bạn chọn bóng đá nhiều nhất',
        'Không hợp lí vì có ba môn thể thao',
      ],
      answer: 1,
      hints: ['Cộng số bạn của ba nhóm rồi so với sĩ số.'],
      solution:
        'Mỗi bạn chọn đúng một môn nên tổng số bạn ở các nhóm không vượt quá $40$. Nhưng $18 + 15 + 12 = 45 > 40$, nên dữ liệu không hợp lí.',
    },
    {
      type: 'choice',
      prompt:
        'Để biết thời gian tự học ở nhà của học sinh cả trường, bạn Bình chỉ hỏi các bạn trong câu lạc bộ Toán. Kết luận rút ra có hợp lí không?',
      options: [
        'Hợp lí, vì các bạn trả lời đều là học sinh của trường',
        'Không hợp lí, vì nhóm được hỏi không đại diện cho học sinh cả trường',
        'Hợp lí, vì dữ liệu thu được là số liệu',
      ],
      answer: 1,
      hints: ['Các bạn trong câu lạc bộ Toán có giống mọi học sinh của trường không?'],
      solution:
        'Các bạn trong câu lạc bộ Toán thường dành nhiều thời gian tự học hơn, nên nhóm này không đại diện cho học sinh cả trường. Kết luận cho cả trường không hợp lí.',
    },
  ],
  takeaways: [
    'Thu thập trực tiếp: quan sát, làm thí nghiệm, lập bảng hỏi, phỏng vấn. Thu thập gián tiếp: lấy từ nguồn có sẵn.',
    'Số liệu rời rạc là số đếm; số liệu liên tục là số đo, nhận mọi giá trị trong một khoảng.',
    'Dữ liệu định tính chia thành loại sắp thứ tự được và loại không sắp thứ tự được.',
    'Kiểm tra tính hợp lí: giá trị trong phạm vi có thể, đúng loại số, các phần không vượt toàn thể, dữ liệu có tính đại diện.',
  ],
};
