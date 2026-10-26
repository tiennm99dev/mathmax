/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: ghi chép các khoản chi của cá nhân và gia đình, chia thành ba nhóm chi, lập bảng thu chi, tính tỉ số phần trăm của từng khoản và từng nhóm rồi rút ra cách chi tiêu hợp lí, tiết kiệm.',
  intro:
    'Anh Bình là sinh viên, ở ghép với hai bạn trong một căn hộ thuê giá $2$ triệu đồng một tháng. Mỗi tháng bố mẹ chỉ có thể gửi cho anh nhiều nhất $3$ triệu đồng. Muốn đủ tiêu cả tháng, anh Bình phải lập kế hoạch chi tiêu: biết mỗi khoản chiếm bao nhiêu phần trăm số tiền, khoản nào bắt buộc, khoản nào bớt được. Trong hoạt động này, em làm điều đó cho chính em và gia đình em.',
  objectives: [
    'Ghi chép các khoản chi và lập bảng thu chi của cá nhân, gia đình.',
    'Phân loại các khoản chi thành chi cố định thiết yếu, chi cần thiết nhưng linh hoạt và chi phát sinh.',
    'Tính tỉ số phần trăm của mỗi khoản, mỗi nhóm chi so với tổng chi và so với số tiền có.',
    'Nhận xét bảng phân tích, đề xuất cách chi tiêu hợp lí và tiết kiệm.',
  ],
  sections: [
    {
      heading: 'Bảng chi tiêu của anh Bình',
      blocks: [
        {
          type: 'p',
          text: 'Tiền thuê nhà chia đều cho ba người: $2\\,000\\,000 : 3 \\approx 666\\,667$ đồng, anh Bình làm tròn thành $700\\,000$ đồng. Anh lập bảng các khoản chi trong một tháng như sau.',
        },
        {
          type: 'table',
          head: ['Khoản chi', 'Số tiền (đồng)', 'Tỉ lệ'],
          rows: [
            ['Thuê nhà', '$700\\,000$', '$23{,}33\\%$'],
            ['Điện, nước', '$100\\,000$', '$3{,}33\\%$'],
            ['Ăn uống', '$1\\,200\\,000$', '$40\\%$'],
            ['Đi lại', '$200\\,000$', '$6{,}67\\%$'],
            ['Điện thoại, Internet', '$150\\,000$', '$5\\%$'],
            ['Sách vở, giấy bút', '$100\\,000$', '$3{,}33\\%$'],
            ['Vật dụng hằng ngày', '$250\\,000$', '$8{,}33\\%$'],
            ['Giải trí, mua sắm, sức khoẻ', '$200\\,000$', '$6{,}67\\%$'],
            ['Dự phòng, tiết kiệm', '$100\\,000$', '$3{,}33\\%$'],
            ['Tổng cộng', '$3\\,000\\,000$', '$100\\%$'],
          ],
          caption: 'Kế hoạch chi tiêu một tháng của anh Bình.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tỉ lệ của một khoản chi',
          text: 'Tỉ lệ (tỉ số phần trăm) của một khoản chi so với tổng chi bằng $\\dfrac{\\text{số tiền của khoản chi}}{\\text{tổng số tiền}} \\cdot 100\\%$. Chẳng hạn khoản ăn uống: $\\dfrac{1\\,200\\,000}{3\\,000\\,000} \\cdot 100\\% = 40\\%$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Tỉ lệ thường được làm tròn, ví dụ $\\dfrac{700\\,000}{3\\,000\\,000} \\cdot 100\\% = 23{,}333\\ldots\\% \\approx 23{,}33\\%$. Vì làm tròn nên tổng các tỉ lệ đã làm tròn có thể lệch $100\\%$ một chút ($99{,}99\\%$ hay $100{,}01\\%$); điều đó không phải là sai.',
        },
      ],
    },
    {
      heading: 'Ba nhóm chi tiêu',
      blocks: [
        {
          type: 'p',
          text: 'Để biết khoản nào cắt giảm được, ta chia các khoản chi thành ba nhóm.',
        },
        {
          type: 'table',
          head: ['Nhóm chi', 'Ví dụ'],
          rows: [
            ['Chi cố định thiết yếu', 'thuê nhà, đi chợ, ăn uống, điện, nước, tiền học'],
            [
              'Chi cần thiết nhưng linh hoạt',
              'mua sắm, đi lại, giải trí, dự phòng (có thể tăng, giảm tuỳ tháng)',
            ],
            ['Chi phát sinh', 'mừng sinh nhật, đi cỗ, sửa đồ hỏng bất ngờ'],
          ],
        },
        {
          type: 'p',
          text: 'Số tiền của một nhóm bằng tổng số tiền các khoản trong nhóm. Tỉ lệ của nhóm so với tổng chi cũng tính bằng $\\dfrac{\\text{số tiền của nhóm}}{\\text{tổng chi}} \\cdot 100\\%$; tỉ lệ ba nhóm cộng lại bằng $100\\%$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Phân loại cho đúng trước khi tính: tiền mừng sinh nhật bạn là chi phát sinh, không phải chi thiết yếu. Xếp nhầm nhóm thì bảng phân tích sẽ cho kết luận sai.',
        },
        {
          type: 'p',
          text: 'Sau khi tính, cả nhóm thảo luận xem mỗi nhóm chi nên chiếm khoảng bao nhiêu phần trăm, ví dụ chi thiết yếu khoảng $50\\%$, chi linh hoạt khoảng $40\\%$, chi phát sinh khoảng $10\\%$, rồi so sánh với tỉ lệ thực tế. Nếu tổng chi còn nhỏ hơn số tiền có, phần dư để dành tiết kiệm.',
        },
      ],
    },
    {
      heading: 'Nhiệm vụ: lập kế hoạch chi tiêu',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: lập được bảng chi tiêu của gia đình em (hoặc của chính em), tính tỉ lệ từng nhóm chi và đưa ra nhận xét, đề xuất chi tiêu hợp lí.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: vở ghi, bút, máy tính cầm tay (hoặc bảng tính trên máy tính).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Ở nhà: hỏi bố mẹ hoặc tự ghi lại các khoản chi của gia đình trong một tuần thành bảng dữ liệu ban đầu (khoản chi, số tiền). Có thể thêm hoặc bớt khoản chi cho phù hợp; số tiền làm tròn đến hàng chục nghìn; chưa điền cột tỉ lệ.',
            'Xếp mỗi khoản chi vào một trong ba nhóm: chi cố định thiết yếu, chi cần thiết nhưng linh hoạt, chi phát sinh.',
            'Lập bảng phân tích: số tiền và tỉ lệ (làm tròn đến hàng đơn vị) của từng nhóm so với tổng chi.',
            'Trên lớp: chia nhóm $3$ đến $5$ bạn, chọn bảng chuẩn bị tốt nhất của một bạn. Cả nhóm thống nhất mỗi nhóm chi nên chiếm bao nhiêu phần trăm, với chi tiêu cá nhân và với chi tiêu gia đình.',
            'Kiểm tra lại cách phân loại trong bảng đã chọn và sửa chỗ xếp nhầm.',
            'So sánh tỉ lệ thực tế với tỉ lệ cả nhóm đã thống nhất.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng dữ liệu ban đầu, bảng phân tích theo nhóm, nhận xét gia đình chi tiêu đã hợp lí chưa và ít nhất hai đề xuất tiết kiệm (lập danh sách trước khi đi mua sắm, chỉ mua thứ thật cần, không mua chỉ vì khuyến mãi, để dành theo một mục tiêu cụ thể).',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng tính chi tiêu',
    instruction:
      'Chọn bảng của anh Bình hoặc của một gia đình. Sửa số tiền (gõ số hoặc bấm $-$, $+$ để thay đổi $10\\,000$ đồng), chọn nhóm cho từng khoản, thêm khoản chi mới. Tỉ lệ từng khoản, bảng phân tích ba nhóm và biểu đồ cột cập nhật ngay; dòng cuối cho biết chi có vượt số tiền có không.',
  },
  examples: [
    {
      problem:
        'Trong bảng của anh Bình (tổng chi $3\\,000\\,000$ đồng), tính tỉ lệ của khoản thuê nhà và khoản vật dụng hằng ngày, làm tròn đến hai chữ số thập phân.',
      steps: [
        'Thuê nhà: $\\dfrac{700\\,000}{3\\,000\\,000} \\cdot 100\\% = \\dfrac{70}{3}\\% = 23{,}333\\ldots\\% \\approx 23{,}33\\%$.',
        'Vật dụng hằng ngày: $\\dfrac{250\\,000}{3\\,000\\,000} \\cdot 100\\% = \\dfrac{25}{3}\\% = 8{,}333\\ldots\\% \\approx 8{,}33\\%$.',
      ],
      answer: 'Thuê nhà chiếm khoảng $23{,}33\\%$, vật dụng hằng ngày khoảng $8{,}33\\%$ tổng chi.',
    },
    {
      problem:
        'Một tuần, gia đình bạn Linh chi: đi chợ, ăn uống $1\\,800\\,000$ đồng; điện, nước $400\\,000$ đồng; tiền học $700\\,000$ đồng; đi lại $500\\,000$ đồng; mua sắm $700\\,000$ đồng; giải trí $300\\,000$ đồng; dự phòng $600\\,000$ đồng; mừng sinh nhật, đi cỗ $500\\,000$ đồng. Lập bảng phân tích ba nhóm chi (tỉ lệ làm tròn đến hàng đơn vị) và nhận xét, biết cả nhóm thống nhất tỉ lệ nên có là $50\\%$, $40\\%$, $10\\%$.',
      steps: [
        'Chi thiết yếu: $1\\,800\\,000 + 400\\,000 + 700\\,000 = 2\\,900\\,000$ đồng.',
        'Chi linh hoạt: $500\\,000 + 700\\,000 + 300\\,000 + 600\\,000 = 2\\,100\\,000$ đồng. Chi phát sinh: $500\\,000$ đồng.',
        'Tổng chi: $2\\,900\\,000 + 2\\,100\\,000 + 500\\,000 = 5\\,500\\,000$ đồng.',
        'Tỉ lệ: $\\dfrac{2\\,900\\,000}{5\\,500\\,000} \\cdot 100\\% \\approx 53\\%$; $\\dfrac{2\\,100\\,000}{5\\,500\\,000} \\cdot 100\\% \\approx 38\\%$; $\\dfrac{500\\,000}{5\\,500\\,000} \\cdot 100\\% \\approx 9\\%$.',
        'So với $50\\%$, $40\\%$, $10\\%$: mỗi nhóm chỉ lệch vài phần trăm.',
      ],
      answer:
        'Thiết yếu $2\\,900\\,000$ đồng (khoảng $53\\%$), linh hoạt $2\\,100\\,000$ đồng (khoảng $38\\%$), phát sinh $500\\,000$ đồng (khoảng $9\\%$): gia đình Linh chi tiêu khá hợp lí.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Tổng chi một tháng của anh Bình là $3\\,000\\,000$ đồng, trong đó tiền ăn uống là $1\\,200\\,000$ đồng. Khoản ăn uống chiếm bao nhiêu phần trăm tổng chi?',
      answer: 40,
      unit: '%',
      hints: [
        'Tỉ lệ bằng số tiền của khoản chi chia cho tổng chi, rồi nhân với $100\\%$.',
        'Tính $\\dfrac{1\\,200\\,000}{3\\,000\\,000}$ trước.',
      ],
      solution:
        '$\\dfrac{1\\,200\\,000}{3\\,000\\,000} \\cdot 100\\% = 0{,}4 \\cdot 100\\% = 40\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Tiền đi lại của anh Bình là $200\\,000$ đồng trên tổng chi $3\\,000\\,000$ đồng. Tính tỉ lệ của khoản này, làm tròn đến hai chữ số thập phân (đơn vị %).',
      answer: 6.67,
      tolerance: 0.005,
      unit: '%',
      hints: [
        'Tính $\\dfrac{200\\,000}{3\\,000\\,000} \\cdot 100$.',
        'Kết quả là số thập phân vô hạn tuần hoàn $6{,}666\\ldots$; làm tròn đến hàng phần trăm.',
      ],
      solution:
        '$\\dfrac{200\\,000}{3\\,000\\,000} \\cdot 100\\% = \\dfrac{20}{3}\\% = 6{,}666\\ldots\\% \\approx 6{,}67\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Ba bạn thuê chung một căn hộ giá $2\\,000\\,000$ đồng một tháng và chia đều tiền nhà. Mỗi bạn phải trả bao nhiêu đồng? Làm tròn đến hàng chục nghìn.',
      answer: 670000,
      unit: 'đồng',
      hints: [
        'Chia $2\\,000\\,000$ cho $3$.',
        'Được $666\\,666{,}6\\ldots$; chữ số hàng nghìn là $6 \\ge 5$ nên làm tròn lên ở hàng chục nghìn.',
      ],
      solution:
        '$2\\,000\\,000 : 3 = 666\\,666{,}6\\ldots \\approx 670\\,000$ đồng (làm tròn đến hàng chục nghìn).',
    },
    {
      type: 'choice',
      prompt: 'Khoản tiền mừng sinh nhật một người bạn nên xếp vào nhóm chi nào?',
      options: ['Chi cố định thiết yếu', 'Chi cần thiết nhưng linh hoạt', 'Chi phát sinh'],
      answer: 2,
      hints: ['Khoản này có tháng nào cũng phải chi không, có bắt buộc để sinh hoạt không?'],
      solution:
        'Mừng sinh nhật chỉ thỉnh thoảng mới có và không bắt buộc cho sinh hoạt hằng ngày, nên là chi phát sinh.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khoản là chi cố định thiết yếu của một gia đình.',
      options: [
        'Tiền điện, nước',
        'Đi chợ, ăn uống',
        'Vé xem phim',
        'Tiền thuê nhà',
        'Quà sinh nhật',
      ],
      answers: [0, 1, 3],
      hints: ['Chi thiết yếu là khoản tháng nào cũng phải có để sống và sinh hoạt.'],
      solution:
        'Điện nước, ăn uống, thuê nhà là chi cố định thiết yếu. Vé xem phim là chi giải trí (chi linh hoạt), quà sinh nhật là chi phát sinh.',
    },
    {
      type: 'number',
      prompt:
        'Một tuần, gia đình bạn Linh chi tổng cộng $5\\,500\\,000$ đồng, trong đó chi cố định thiết yếu là $2\\,900\\,000$ đồng. Nhóm chi thiết yếu chiếm bao nhiêu phần trăm tổng chi? Làm tròn đến hàng đơn vị.',
      answer: 53,
      unit: '%',
      hints: [
        'Tính $\\dfrac{2\\,900\\,000}{5\\,500\\,000} \\cdot 100$.',
        'Được $52{,}72\\ldots$; làm tròn đến hàng đơn vị.',
      ],
      solution:
        '$\\dfrac{2\\,900\\,000}{5\\,500\\,000} \\cdot 100\\% = \\dfrac{580}{11}\\% = 52{,}72\\ldots\\% \\approx 53\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Thu nhập một tháng của một gia đình là $12\\,000\\,000$ đồng, cả tháng chi hết $10\\,800\\,000$ đồng, phần còn lại để tiết kiệm. Số tiền tiết kiệm bằng bao nhiêu phần trăm thu nhập?',
      answer: 10,
      unit: '%',
      hints: [
        'Tìm số tiền còn lại trước: thu nhập trừ tổng chi.',
        'Chia số tiền còn lại cho thu nhập (không phải cho tổng chi) rồi nhân $100\\%$.',
      ],
      solution:
        'Còn lại $12\\,000\\,000 - 10\\,800\\,000 = 1\\,200\\,000$ đồng. Tỉ lệ: $\\dfrac{1\\,200\\,000}{12\\,000\\,000} \\cdot 100\\% = 10\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Mỗi tháng em được bố mẹ cho $200\\,000$ đồng tiền tiêu vặt. Em định để dành $25\\%$ số tiền đó. Mỗi tháng em để dành được bao nhiêu đồng?',
      answer: 50000,
      unit: 'đồng',
      hints: ['$25\\%$ của một số là $\\dfrac{25}{100}$ của số đó.'],
      solution: '$200\\,000 \\cdot \\dfrac{25}{100} = 50\\,000$ đồng.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các việc lập kế hoạch chi tiêu theo đúng thứ tự.',
      items: [
        'Tính tỉ lệ của từng nhóm chi so với tổng chi.',
        'Ghi chép các khoản chi và số tiền trong một tuần.',
        'So sánh với tỉ lệ dự kiến, đề xuất cách chi tiêu hợp lí.',
        'Xếp mỗi khoản chi vào một trong ba nhóm.',
      ],
      answer: [1, 3, 0, 2],
      hints: ['Phải có số liệu trước, rồi mới phân loại và tính toán.'],
      solution: 'Ghi chép → phân loại vào ba nhóm → tính tỉ lệ từng nhóm → so sánh và đề xuất.',
    },
  ],
  takeaways: [
    'Tỉ lệ của một khoản chi bằng $\\dfrac{\\text{số tiền của khoản}}{\\text{tổng chi}} \\cdot 100\\%$; tỉ lệ các khoản cộng lại bằng $100\\%$ (có thể lệch chút ít do làm tròn).',
    'Chia khoản chi thành ba nhóm: chi cố định thiết yếu, chi cần thiết nhưng linh hoạt, chi phát sinh.',
    'So sánh tỉ lệ thực tế với tỉ lệ dự kiến để biết nên bớt khoản nào; phần thu nhập chưa chi dùng để tiết kiệm.',
  ],
};
