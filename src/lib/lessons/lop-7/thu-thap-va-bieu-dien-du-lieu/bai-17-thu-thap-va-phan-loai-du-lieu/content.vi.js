/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Các cách thu thập dữ liệu, phân loại dữ liệu thành số liệu và dữ liệu không phải là số (sắp thứ tự được hoặc không), và tính đại diện của dữ liệu khi khảo sát.',
  intro:
    'Bạn Mai phỏng vấn các bạn trong tổ: mỗi ngày bạn xem ti vi bao nhiêu giờ, bạn thích chương trình nào, chương trình đó có hấp dẫn không. Ba câu hỏi cho ba loại dữ liệu khác nhau. Nếu Mai muốn kết luận cho cả trường thì hỏi riêng tổ mình có đủ không? Bài này giúp em thu thập, phân loại dữ liệu và biết khi nào dữ liệu đại diện được cho cả nhóm cần tìm hiểu.',
  objectives: [
    'Thu thập dữ liệu bằng quan sát, lập phiếu hỏi, phỏng vấn hoặc lấy từ nguồn có sẵn.',
    'Phân loại dữ liệu: số liệu; dữ liệu không phải là số có thể sắp thứ tự và không thể sắp thứ tự.',
    'Nhận biết một cách khảo sát có cho dữ liệu đại diện cho toàn bộ đối tượng cần tìm hiểu hay không.',
  ],
  sections: [
    {
      heading: 'Thu thập dữ liệu',
      blocks: [
        {
          type: 'p',
          text: 'Để có dữ liệu về một vấn đề, ta có thể thu thập bằng nhiều cách. Chọn cách phù hợp với điều cần tìm hiểu.',
        },
        {
          type: 'table',
          head: ['Cách thu thập', 'Ví dụ'],
          rows: [
            ['Quan sát', 'Đếm số xe máy đi qua cổng trường từ 6 giờ 30 đến 7 giờ.'],
            ['Làm thí nghiệm', 'Gieo $20$ hạt đậu, đếm số hạt nảy mầm sau $3$ ngày.'],
            ['Lập phiếu hỏi, phỏng vấn', 'Hỏi các bạn trong lớp về môn thể thao yêu thích.'],
            [
              'Lấy từ nguồn có sẵn: sách, báo, Internet, …',
              'Tra số dân của các tỉnh trên trang web của cơ quan thống kê.',
            ],
          ],
        },
      ],
    },
    {
      heading: 'Phân loại dữ liệu',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai loại dữ liệu',
          text: 'Dữ liệu là số được gọi là số liệu. Dữ liệu không phải là số được ghi bằng chữ, kí hiệu, … Dữ liệu không phải là số lại chia thành hai loại: loại có thể sắp thứ tự và loại không thể sắp thứ tự.',
        },
        {
          type: 'table',
          caption: 'Ba câu hỏi phỏng vấn của bạn Mai',
          head: ['Câu hỏi', 'Dữ liệu thu được', 'Loại dữ liệu'],
          rows: [
            ['Mỗi ngày bạn xem ti vi bao nhiêu giờ?', '$1$; $2$; $0{,}5$; $3$; …', 'Số liệu'],
            [
              'Mức độ hấp dẫn của chương trình em hay xem?',
              'Rất hấp dẫn; hấp dẫn; không hấp dẫn',
              'Không phải số, sắp thứ tự được',
            ],
            [
              'Bạn thích chương trình nào nhất?',
              'Thời sự; phim hoạt hình; ca nhạc; …',
              'Không phải số, không sắp thứ tự được',
            ],
          ],
        },
        {
          type: 'p',
          text: 'Các mức "rất hấp dẫn, hấp dẫn, không hấp dẫn" xếp được từ cao xuống thấp, còn tên các chương trình thì không có chương trình nào đứng trước chương trình nào.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Số liệu còn được gọi là dữ liệu định lượng; dữ liệu không phải là số còn được gọi là dữ liệu định tính.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Cỡ áo $S, M, L, XL$ hay kết quả học tập "Tốt, Khá, Đạt, Chưa đạt" viết bằng chữ nên không phải là số liệu, nhưng vẫn sắp được thứ tự.',
        },
      ],
    },
    {
      heading: 'Tính đại diện của dữ liệu',
      blocks: [
        {
          type: 'p',
          text: 'Thường ta không hỏi được hết mọi đối tượng cần tìm hiểu (cả trường, cả thành phố) mà chỉ hỏi một nhóm. Kết luận rút ra chỉ đáng tin khi nhóm đó đại diện được cho toàn bộ.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tính đại diện',
          text: 'Để dữ liệu thu được có tính đại diện cho toàn bộ đối tượng cần khảo sát, nhóm được hỏi phải gồm đủ các thành phần của toàn bộ (mọi lớp, mọi khối, …), được chọn ngẫu nhiên và không quá ít.',
        },
        {
          type: 'list',
          items: [
            'Hỏi các bạn trong câu lạc bộ bóng đá để biết môn thể thao học sinh cả trường yêu thích: không đại diện, vì nhóm này phần lớn đều thích bóng đá.',
            'Hỏi $5$ bạn xung phong để kết luận cho cả lớp: không đại diện, vì số bạn quá ít và chỉ gồm những bạn muốn trả lời.',
            'Bình chọn trên Internet để kết luận cho mọi người hâm mộ: không đại diện, vì chỉ những người dùng Internet mới tham gia.',
            'Mỗi lớp chọn ngẫu nhiên vài bạn để tìm hiểu cả trường: có tính đại diện.',
          ],
        },
        {
          type: 'p',
          text: 'Hãy thử bốn cách khảo sát dưới đây trên một trường có $400$ học sinh và so sánh kết quả của nhóm được hỏi với kết quả của toàn trường.',
        },
        { type: 'widget', name: 'sample' },
      ],
    },
  ],
  explore: {
    title: 'Trò chơi phân loại dữ liệu',
    instruction:
      'Chọn một thẻ dữ liệu rồi chọn ô phù hợp: số liệu, dữ liệu không phải số sắp thứ tự được, hoặc dữ liệu không phải số không sắp thứ tự được. Mỗi lần đặt thẻ, em sẽ biết vì sao đúng hay sai.',
  },
  examples: [
    {
      problem:
        'Một phiếu hỏi có các câu: a) Chiều cao của bạn (cm)? b) Bạn đến trường bằng phương tiện gì? c) Em có thích đọc sách không: rất thích, thích, không thích? Hãy phân loại dữ liệu thu được ở mỗi câu.',
      steps: [
        'a) Câu trả lời là số đo chiều cao, như $148$; $152$; … nên là số liệu.',
        'b) Câu trả lời là tên phương tiện (đi bộ, xe đạp, xe buýt, …): không phải là số và không có phương tiện nào "hơn" phương tiện nào, nên không sắp thứ tự được.',
        'c) Câu trả lời là các mức "rất thích, thích, không thích": không phải là số nhưng xếp được từ thích nhiều đến thích ít.',
      ],
      answer:
        'a) Số liệu; b) Không phải số, không sắp thứ tự được; c) Không phải số, sắp thứ tự được.',
    },
    {
      problem:
        'Để biết các bạn học sinh của một trường có $20$ lớp thích loại quả nào nhất, bạn Nam hỏi $30$ bạn lớp 7A. Bạn Hà đề nghị mỗi lớp chọn ngẫu nhiên $3$ bạn để hỏi. Cách nào cho dữ liệu có tính đại diện hơn? Theo cách của Hà, có bao nhiêu bạn được hỏi?',
      steps: [
        'Cách của Nam chỉ hỏi một lớp, nên không có ý kiến của các khối, các lớp khác: dữ liệu không đại diện cho cả trường.',
        'Cách của Hà hỏi ở mọi lớp, các bạn được chọn ngẫu nhiên, nên dữ liệu có tính đại diện hơn.',
        'Số bạn được hỏi theo cách của Hà: $20 \\cdot 3 = 60$ (bạn).',
      ],
      answer: 'Cách của bạn Hà có tính đại diện hơn; có $60$ bạn được hỏi.',
    },
    {
      problem:
        'Năm 2000, FIFA tổ chức bình chọn "cầu thủ xuất sắc nhất thế kỉ XX" trên Internet. Kết quả này có đại diện cho ý kiến của người hâm mộ bóng đá trên toàn thế giới không?',
      steps: [
        'Chỉ những người dùng Internet mới tham gia bình chọn được.',
        'Khi đó nhiều người hâm mộ, nhất là người lớn tuổi, chưa dùng Internet, nên ý kiến của họ không có trong dữ liệu.',
      ],
      answer:
        'Không đại diện, vì nhóm người bình chọn chỉ gồm người dùng Internet, không phải mọi người hâm mộ.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Câu hỏi "Em có đồng ý rằng đọc sách là một thói quen tốt không: rất đồng ý, đồng ý, không đồng ý, rất không đồng ý?" cho loại dữ liệu nào?',
      options: [
        'Số liệu',
        'Dữ liệu không phải là số, có thể sắp thứ tự',
        'Dữ liệu không phải là số, không thể sắp thứ tự',
      ],
      answer: 1,
      hints: [
        'Câu trả lời có phải là số không?',
        'Các mức đồng ý có xếp được từ nhiều đến ít không?',
      ],
      solution:
        'Các câu trả lời là chữ nên không phải số liệu, nhưng xếp được theo thứ tự từ "rất đồng ý" đến "rất không đồng ý". Đó là dữ liệu không phải là số, có thể sắp thứ tự.',
    },
    {
      type: 'choice',
      prompt: 'Câu hỏi "Ca sĩ Việt Nam nào bạn thích nhất?" cho loại dữ liệu nào?',
      options: [
        'Số liệu',
        'Dữ liệu không phải là số, có thể sắp thứ tự',
        'Dữ liệu không phải là số, không thể sắp thứ tự',
      ],
      answer: 2,
      hints: ['Câu trả lời là tên người.', 'Tên các ca sĩ có thứ tự hơn kém không?'],
      solution:
        'Câu trả lời là tên ca sĩ: không phải là số và không có thứ tự hơn kém. Đó là dữ liệu không phải là số, không thể sắp thứ tự.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các dãy dữ liệu là số liệu.',
      options: [
        'Cân nặng (kg) của các bạn trong tổ',
        'Môn học yêu thích của các bạn trong tổ',
        'Số bàn thắng của mỗi đội trong giải bóng đá',
        'Cỡ giày: nhỏ, vừa, lớn',
        'Thời gian (phút) chạy hết $1\\,000$ m của mỗi bạn',
      ],
      answers: [0, 2, 4],
      hints: ['Số liệu là dữ liệu ghi bằng số đo hoặc số đếm.'],
      solution:
        'Cân nặng, số bàn thắng và thời gian chạy là số liệu. Môn học yêu thích và cỡ giày "nhỏ, vừa, lớn" ghi bằng chữ nên không phải là số liệu.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi dãy dữ liệu với loại của nó.',
      left: [
        'Nhiệt độ (°C) lúc $7$ giờ sáng các ngày trong tuần',
        'Kết quả học tập: Tốt, Khá, Đạt, Chưa đạt',
        'Tên các loài hoa em thích',
      ],
      right: ['Số liệu', 'Không phải số, sắp thứ tự được', 'Không phải số, không sắp thứ tự được'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Trước hết xem dữ liệu có phải là số không, sau đó xem có xếp được thứ tự không.'],
      solution:
        'Nhiệt độ là số đo nên là số liệu. Các mức Tốt, Khá, Đạt, Chưa đạt xếp được từ cao xuống thấp. Tên loài hoa không có thứ tự.',
    },
    {
      type: 'choice',
      prompt:
        'Để biết số dân của các tỉnh, thành phố nước ta năm 2023, cách thu thập nào phù hợp nhất?',
      options: [
        'Đến từng nhà để đếm',
        'Lấy từ nguồn có sẵn như trang web của cơ quan thống kê',
        'Làm thí nghiệm',
        'Hỏi các bạn trong lớp',
      ],
      answer: 1,
      hints: ['Số dân các tỉnh đã được thống kê và công bố.'],
      solution:
        'Số dân các tỉnh, thành phố đã được cơ quan thống kê công bố, nên lấy từ nguồn có sẵn là phù hợp nhất.',
    },
    {
      type: 'choice',
      prompt:
        'Để tìm hiểu môn thể thao học sinh của cả trường yêu thích nhất, cách khảo sát nào cho dữ liệu có tính đại diện?',
      options: [
        'Hỏi tất cả các bạn trong câu lạc bộ bóng đá',
        'Hỏi tất cả các bạn lớp 7A',
        'Ở mỗi lớp, chọn ngẫu nhiên $5$ bạn để hỏi',
        'Hỏi $5$ bạn đến trường sớm nhất',
      ],
      answer: 2,
      hints: [
        'Nhóm được hỏi phải có mặt các lớp, các khối khác nhau.',
        'Nhóm được hỏi cần chọn ngẫu nhiên và không quá ít.',
      ],
      solution:
        'Chỉ cách chọn ngẫu nhiên $5$ bạn ở mỗi lớp mới có đủ các lớp, các khối và đủ nhiều bạn. Câu lạc bộ bóng đá thiên về bóng đá, một lớp hay $5$ bạn thì không đại diện cho cả trường.',
    },
    {
      type: 'number',
      prompt:
        'Một trường có $4$ khối, mỗi khối có $9$ lớp. Để khảo sát, mỗi lớp chọn ngẫu nhiên $6$ học sinh. Có bao nhiêu học sinh được khảo sát?',
      answer: 216,
      unit: 'học sinh',
      hints: [
        'Trước hết tính số lớp của cả trường.',
        'Số lớp nhân với số học sinh được chọn ở mỗi lớp.',
      ],
      solution: 'Trường có $4 \\cdot 9 = 36$ lớp. Số học sinh được khảo sát: $36 \\cdot 6 = 216$.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Vuông nói: "Hầu hết các bạn trong trường đều thuận tay trái", vì ở tổ của Vuông có $5$ trên $8$ bạn thuận tay trái. Nhận định nào đúng?',
      options: [
        'Vuông đúng, vì $5$ bạn là quá nửa tổ',
        'Kết luận chưa đáng tin, vì một tổ $8$ bạn không đại diện cho cả trường',
        'Vuông đúng, vì dữ liệu thu được là số liệu',
      ],
      answer: 1,
      hints: ['Tổ của Vuông có đại diện được cho cả trường không?'],
      solution:
        'Dữ liệu chỉ lấy từ một tổ $8$ bạn, quá ít và không gồm các lớp khác, nên không đại diện cho cả trường. Muốn kiểm tra, cần khảo sát ngẫu nhiên học sinh ở mọi lớp.',
    },
    {
      type: 'text',
      prompt:
        'Dữ liệu "số giờ tự học mỗi ngày" là số liệu hay dữ liệu không phải là số? Gõ "số liệu" hoặc "không phải số".',
      accept: [
        'số liệu',
        'so lieu',
        'dữ liệu là số',
        'là số liệu',
        'định lượng',
        'dữ liệu định lượng',
      ],
      hints: ['Số giờ được ghi như thế nào: bằng số hay bằng chữ?'],
      solution: 'Số giờ tự học ghi bằng số (như $1$; $1{,}5$; $2$) nên là số liệu.',
    },
  ],
  takeaways: [
    'Thu thập dữ liệu bằng quan sát, làm thí nghiệm, lập phiếu hỏi, phỏng vấn hoặc lấy từ nguồn có sẵn.',
    'Dữ liệu gồm số liệu và dữ liệu không phải là số; dữ liệu không phải là số có loại sắp thứ tự được và loại không sắp thứ tự được.',
    'Dữ liệu có tính đại diện khi nhóm được hỏi gồm đủ các thành phần của toàn bộ, được chọn ngẫu nhiên và không quá ít.',
  ],
};
