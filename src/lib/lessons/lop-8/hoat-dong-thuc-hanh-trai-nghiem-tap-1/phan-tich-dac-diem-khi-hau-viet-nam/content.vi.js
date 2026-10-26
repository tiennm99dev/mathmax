/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: thu thập số liệu nhiệt độ, lượng mưa, độ ẩm theo tháng của một số địa phương, biểu diễn bằng biểu đồ cột và biểu đồ đoạn thẳng, rồi phân tích để rút ra đặc điểm khí hậu Việt Nam và sự khác nhau giữa các miền.',
  intro:
    'Môn Lịch sử và Địa lí cho biết khí hậu Việt Nam là khí hậu nhiệt đới gió mùa ẩm, phân hoá theo không gian và theo mùa. Bài này dùng các công cụ thống kê của chương V (thu thập, phân loại, biểu diễn và phân tích dữ liệu) để tự kiểm chứng những nhận xét đó từ số liệu của từng tháng.',
  objectives: [
    'Thu thập và lập bảng số liệu nhiệt độ, lượng mưa, độ ẩm trung bình từng tháng của một địa phương.',
    'Chọn và vẽ biểu đồ phù hợp: biểu đồ đoạn thẳng cho sự thay đổi theo thời gian, biểu đồ cột cho lượng mưa, biểu đồ kết hợp cột và đường.',
    'Tính nhiệt độ trung bình năm, biên độ nhiệt năm, tổng lượng mưa và xác định mùa mưa từ bảng số liệu.',
    'Phân tích, so sánh khí hậu của các miền và giải thích bằng lời.',
  ],
  sections: [
    {
      heading: 'Bảng số liệu khí hậu',
      blocks: [
        {
          type: 'p',
          text: 'Bảng dưới đây ghi nhiệt độ trung bình tháng (°C) và lượng mưa trung bình tháng (mm) ở ba địa điểm thuộc ba miền. Đây là số liệu trung bình nhiều năm đã làm tròn, dùng để luyện tập; khi làm dự án, các nhóm lấy số liệu mới từ Niên giám thống kê (gso.gov.vn) hoặc các trang dữ liệu khí hậu.',
        },
        {
          type: 'table',
          head: ['Tháng', 'Hà Nội', 'Huế', 'TP HCM'],
          rows: [
            ['1', '$16{,}4$', '$20{,}0$', '$25{,}8$'],
            ['2', '$17{,}2$', '$20{,}9$', '$26{,}7$'],
            ['3', '$20{,}0$', '$23{,}1$', '$27{,}9$'],
            ['4', '$23{,}9$', '$26{,}0$', '$28{,}9$'],
            ['5', '$27{,}4$', '$28{,}3$', '$28{,}3$'],
            ['6', '$29{,}0$', '$29{,}3$', '$27{,}5$'],
            ['7', '$29{,}2$', '$29{,}4$', '$27{,}1$'],
            ['8', '$28{,}6$', '$28{,}9$', '$27{,}1$'],
            ['9', '$27{,}5$', '$27{,}1$', '$26{,}8$'],
            ['10', '$24{,}9$', '$25{,}1$', '$26{,}7$'],
            ['11', '$21{,}5$', '$23{,}1$', '$26{,}4$'],
            ['12', '$18{,}3$', '$20{,}8$', '$25{,}7$'],
          ],
          caption: 'Nhiệt độ trung bình tháng (°C).',
        },
        {
          type: 'table',
          head: ['Tháng', 'Hà Nội', 'Huế', 'TP HCM'],
          rows: [
            ['1', '19', '161', '14'],
            ['2', '26', '62', '4'],
            ['3', '44', '47', '11'],
            ['4', '90', '51', '50'],
            ['5', '189', '82', '218'],
            ['6', '240', '90', '312'],
            ['7', '288', '95', '294'],
            ['8', '318', '98', '270'],
            ['9', '265', '473', '327'],
            ['10', '131', '795', '267'],
            ['11', '43', '580', '117'],
            ['12', '23', '297', '48'],
          ],
          caption: 'Lượng mưa trung bình tháng (mm).',
        },
      ],
    },
    {
      heading: 'Các đại lượng dùng để phân tích',
      blocks: [
        {
          type: 'list',
          items: [
            'Nhiệt độ trung bình năm: trung bình cộng nhiệt độ của $12$ tháng.',
            'Biên độ nhiệt năm: hiệu giữa nhiệt độ của tháng nóng nhất và tháng lạnh nhất.',
            'Tổng lượng mưa năm: tổng lượng mưa của $12$ tháng.',
            'Mùa mưa: gồm các tháng có lượng mưa từ $100$ mm trở lên; các tháng còn lại thuộc mùa khô (mùa ít mưa).',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chọn biểu đồ',
          text: 'Nhiệt độ, độ ẩm thay đổi theo thời gian nên dùng biểu đồ đoạn thẳng; vẽ nhiều đường trên cùng một biểu đồ để so sánh các địa điểm. Lượng mưa từng tháng thường được vẽ bằng biểu đồ cột. Biểu đồ khí hậu quen thuộc trong môn Địa lí kết hợp cả hai: cột cho lượng mưa (trục bên trái, mm) và đường cho nhiệt độ (trục bên phải, °C).',
        },
        {
          type: 'table',
          head: ['Địa điểm', 'Nhiệt độ TB năm', 'Biên độ nhiệt', 'Tổng lượng mưa', 'Mùa mưa'],
          rows: [
            ['Hà Nội', '$\\approx 23{,}7$ °C', '$12{,}8$ °C', '$1\\,676$ mm', 'tháng 5 – tháng 10'],
            ['Huế', '$\\approx 25{,}2$ °C', '$9{,}4$ °C', '$2\\,831$ mm', 'tháng 9 – tháng 1'],
            ['TP HCM', '$\\approx 27{,}1$ °C', '$3{,}2$ °C', '$1\\,932$ mm', 'tháng 5 – tháng 11'],
          ],
          caption: 'Kết quả tính từ hai bảng trên.',
        },
        {
          type: 'p',
          text: 'Nhận xét: cả ba nơi đều nóng (nhiệt độ trung bình năm trên $20$ °C) và mưa nhiều (trên $1\\,500$ mm/năm), mưa tập trung vào một mùa: đó là khí hậu nhiệt đới gió mùa ẩm. Hà Nội có ba tháng dưới $20$ °C và biên độ nhiệt lớn: miền Bắc có mùa đông lạnh. TP Hồ Chí Minh nóng quanh năm, biên độ nhiệt nhỏ, có mùa mưa và mùa khô rõ rệt. Huế mưa nhiều nhất và mùa mưa lệch về thu – đông.',
        },
      ],
    },
    {
      heading: 'Dự án: Minh hoạ đặc điểm khí hậu Việt Nam',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Chia lớp thành bốn nhóm: hai nhóm làm Dự án 1, hai nhóm làm Dự án 2. Mỗi nhóm thu thập số liệu, vẽ biểu đồ, phân tích rồi trình bày trước lớp.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: sách Lịch sử và Địa lí 8, Niên giám thống kê hoặc trang gso.gov.vn, giấy kẻ ô hoặc phần mềm bảng tính.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Dự án 1 – Đặc điểm khí hậu chung. Chọn một địa điểm và một năm; lập bảng nhiệt độ, lượng mưa, độ ẩm trung bình của $12$ tháng. Vẽ biểu đồ cho từng đại lượng (hoặc biểu đồ kết hợp cột và đường). Tính nhiệt độ trung bình năm, biên độ nhiệt, tổng lượng mưa, xác định mùa mưa. Số liệu cho thấy những đặc điểm gì của khí hậu và các mùa ở Việt Nam?',
            'Dự án 2 – Khác biệt khí hậu giữa miền Bắc và miền Nam. Chọn một địa điểm ở miền Bắc (chẳng hạn Hà Nội) và một địa điểm ở miền Nam (chẳng hạn TP Hồ Chí Minh). Lập ba bảng số liệu của cùng một năm và vẽ ba biểu đồ đoạn thẳng: nhiệt độ, lượng mưa, độ ẩm, mỗi biểu đồ có hai đường. So sánh và cho biết sự khác biệt có phù hợp với hiểu biết về khí hậu hai miền không.',
            'Dùng khung tương tác để kiểm tra lại biểu đồ và các con số của nhóm.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: các bảng số liệu (ghi rõ nguồn, năm), các biểu đồ, các đại lượng đã tính và phần nhận xét. Lưu ý dùng cùng thang chia trục khi so sánh hai địa điểm.',
        },
      ],
    },
  ],
  explore: {
    title: 'Biểu đồ khí hậu ba miền',
    instruction:
      'Chế độ "Một địa điểm" vẽ biểu đồ kết hợp: cột là lượng mưa (cột đậm là tháng mùa mưa, đường nét đứt là mức $100$ mm), đường đỏ là nhiệt độ. Chế độ "So sánh" vẽ biểu đồ đoạn thẳng của một đại lượng cho các địa điểm được chọn. Kéo thanh "Xem tháng" để đọc số liệu từng tháng.',
  },
  examples: [
    {
      problem:
        'Từ bảng nhiệt độ của Hà Nội, tính nhiệt độ trung bình năm (làm tròn đến hàng phần mười), biên độ nhiệt năm và cho biết tháng nóng nhất, lạnh nhất.',
      steps: [
        'Tổng nhiệt độ $12$ tháng: $16{,}4 + 17{,}2 + 20{,}0 + 23{,}9 + 27{,}4 + 29{,}0 + 29{,}2 + 28{,}6 + 27{,}5 + 24{,}9 + 21{,}5 + 18{,}3 = 283{,}9$.',
        'Nhiệt độ trung bình năm: $283{,}9 : 12 \\approx 23{,}66 \\approx 23{,}7$ (°C).',
        'Tháng nóng nhất là tháng 7 ($29{,}2$ °C), lạnh nhất là tháng 1 ($16{,}4$ °C).',
        'Biên độ nhiệt năm: $29{,}2 - 16{,}4 = 12{,}8$ (°C).',
      ],
      answer:
        'Khoảng $23{,}7$ °C; biên độ nhiệt $12{,}8$ °C; nóng nhất tháng 7, lạnh nhất tháng 1.',
    },
    {
      problem:
        'So sánh chế độ mưa của Hà Nội và TP Hồ Chí Minh: tổng lượng mưa năm, các tháng mùa mưa, tháng mưa nhiều nhất.',
      steps: [
        'Hà Nội: tổng $19 + 26 + 44 + 90 + 189 + 240 + 288 + 318 + 265 + 131 + 43 + 23 = 1\\,676$ (mm). Các tháng có từ $100$ mm trở lên: tháng 5 đến tháng 10. Mưa nhiều nhất tháng 8 ($318$ mm).',
        'TP HCM: tổng $14 + 4 + 11 + 50 + 218 + 312 + 294 + 270 + 327 + 267 + 117 + 48 = 1\\,932$ (mm). Mùa mưa: tháng 5 đến tháng 11. Mưa nhiều nhất tháng 9 ($327$ mm).',
        'Vẽ hai đường trên cùng một biểu đồ đoạn thẳng: cả hai đều thấp vào đầu năm và cao vào giữa năm.',
      ],
      answer:
        'Hai nơi đều mưa nhiều vào mùa hạ; TP HCM mưa nhiều hơn ($1\\,932$ mm so với $1\\,676$ mm), mùa mưa dài hơn một tháng và mùa khô (tháng 12 đến tháng 4) rất ít mưa.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Theo bảng số liệu, biên độ nhiệt năm của Hà Nội là bao nhiêu độ C?',
      answer: 12.8,
      unit: '°C',
      hints: [
        'Tìm tháng nóng nhất và tháng lạnh nhất.',
        'Biên độ nhiệt = nhiệt độ cao nhất − nhiệt độ thấp nhất.',
      ],
      solution:
        'Tháng 7: $29{,}2$ °C; tháng 1: $16{,}4$ °C. Biên độ: $29{,}2 - 16{,}4 = 12{,}8$ °C.',
    },
    {
      type: 'number',
      prompt: 'Biên độ nhiệt năm của TP Hồ Chí Minh là bao nhiêu độ C?',
      answer: 3.2,
      unit: '°C',
      hints: ['Tháng nóng nhất của TP HCM không phải tháng 7.'],
      solution:
        'Tháng 4 nóng nhất ($28{,}9$ °C), tháng 12 lạnh nhất ($25{,}7$ °C): $28{,}9 - 25{,}7 = 3{,}2$ °C.',
    },
    {
      type: 'number',
      prompt: 'Hà Nội có bao nhiêu tháng nhiệt độ trung bình dưới $20$ °C?',
      answer: 3,
      unit: 'tháng',
      hints: ['Xem từng tháng; $20{,}0$ không nhỏ hơn $20$.'],
      solution:
        'Tháng 1 ($16{,}4$), tháng 2 ($17{,}2$) và tháng 12 ($18{,}3$): $3$ tháng. Đó là mùa đông lạnh của miền Bắc.',
    },
    {
      type: 'number',
      prompt: 'Tổng lượng mưa năm của Hà Nội là bao nhiêu mi-li-mét?',
      answer: 1676,
      unit: 'mm',
      hints: ['Cộng lượng mưa của $12$ tháng; có thể cộng theo từng nhóm tháng.'],
      solution:
        '$19 + 26 + 44 + 90 = 179$; $189 + 240 + 288 + 318 = 1\\,035$; $265 + 131 + 43 + 23 = 462$. Tổng: $179 + 1\\,035 + 462 = 1\\,676$ mm.',
    },
    {
      type: 'number',
      prompt:
        'Nhiệt độ trung bình năm của TP Hồ Chí Minh là bao nhiêu độ C? Làm tròn đến hàng phần mười.',
      answer: 27.1,
      tolerance: 0.05,
      unit: '°C',
      hints: ['Cộng nhiệt độ $12$ tháng rồi chia cho $12$.'],
      solution: 'Tổng $12$ tháng là $324{,}9$; $324{,}9 : 12 = 27{,}075 \\approx 27{,}1$ °C.',
    },
    {
      type: 'number',
      prompt:
        'Mùa mưa ở TP Hồ Chí Minh (các tháng có lượng mưa từ $100$ mm trở lên) kéo dài bao nhiêu tháng?',
      answer: 7,
      unit: 'tháng',
      hints: ['Đếm các tháng có từ $100$ mm trở lên.'],
      solution: 'Tháng 5 ($218$), 6, 7, 8, 9, 10 và 11 ($117$): $7$ tháng.',
    },
    {
      type: 'choice',
      prompt: 'Theo bảng số liệu, mùa mưa ở Huế gồm những tháng nào?',
      options: [
        'Tháng 5 đến tháng 10',
        'Tháng 5 đến tháng 11',
        'Tháng 9 đến tháng 1 năm sau',
        'Tháng 1 đến tháng 4',
      ],
      answer: 2,
      hints: ['Tìm các tháng của Huế có lượng mưa từ $100$ mm trở lên; đừng bỏ sót tháng 1.'],
      solution:
        'Tháng 9 ($473$), 10 ($795$), 11 ($580$), 12 ($297$) và tháng 1 ($161$); tháng 8 chỉ có $98$ mm. Mùa mưa ở Huế từ tháng 9 đến tháng 1, lệch về thu – đông so với hai miền kia.',
    },
    {
      type: 'number',
      prompt:
        'Lượng mưa tháng 10 ở Huế chiếm khoảng bao nhiêu phần trăm tổng lượng mưa cả năm ($2\\,831$ mm)? Làm tròn đến hàng đơn vị.',
      answer: 28,
      tolerance: 0.5,
      unit: '%',
      hints: ['Tỉ số phần trăm: $\\dfrac{795}{2\\,831} \\cdot 100\\%$.'],
      solution:
        '$\\dfrac{795}{2\\,831} \\cdot 100\\% \\approx 28{,}1\\% \\approx 28\\%$: chỉ một tháng đã chiếm gần ba phần mười lượng mưa cả năm.',
    },
    {
      type: 'choice',
      prompt:
        'Để so sánh sự thay đổi nhiệt độ theo tháng của Hà Nội và TP Hồ Chí Minh trên cùng một hình, nên dùng loại biểu đồ nào?',
      options: [
        'Biểu đồ hình quạt tròn',
        'Biểu đồ đoạn thẳng có hai đường',
        'Biểu đồ tranh',
        'Bảng thống kê',
      ],
      answer: 1,
      hints: ['Dữ liệu thay đổi theo thời gian (12 tháng).'],
      solution:
        'Biểu đồ đoạn thẳng biểu diễn sự thay đổi của một đại lượng theo thời gian; vẽ hai đường trên cùng hệ trục để so sánh hai địa điểm. Biểu đồ hình quạt chỉ biểu diễn các phần của một tổng thể.',
    },
    {
      type: 'multi',
      prompt: 'Những nhận xét nào đúng với bảng số liệu?',
      options: [
        'Hà Nội có biên độ nhiệt năm lớn hơn TP Hồ Chí Minh.',
        'TP Hồ Chí Minh có tháng nhiệt độ trung bình dưới $20$ °C.',
        'Huế mưa nhiều nhất vào tháng 10.',
        'Ở Hà Nội và TP Hồ Chí Minh, mưa tập trung vào khoảng tháng 5 đến tháng 10, 11.',
        'Trong ba nơi, Huế có tổng lượng mưa năm ít nhất.',
      ],
      answers: [0, 2, 3],
      hints: ['Xem lại bảng kết quả: biên độ nhiệt, tổng lượng mưa, mùa mưa của từng nơi.'],
      solution:
        'Đúng: biên độ $12{,}8$ °C so với $3{,}2$ °C; Huế tháng 10 mưa $795$ mm; mùa mưa tháng 5 – 10 (Hà Nội) và tháng 5 – 11 (TP HCM). Sai: TP HCM tháng lạnh nhất vẫn $25{,}7$ °C; Huế mưa nhiều nhất ($2\\,831$ mm).',
    },
  ],
  takeaways: [
    'Nhiệt độ trung bình năm là trung bình cộng của $12$ tháng; biên độ nhiệt năm là hiệu giữa tháng nóng nhất và tháng lạnh nhất.',
    'Mùa mưa gồm các tháng có lượng mưa từ $100$ mm trở lên.',
    'Biểu đồ đoạn thẳng cho sự thay đổi theo thời gian; biểu đồ khí hậu kết hợp cột (lượng mưa) và đường (nhiệt độ).',
    'Số liệu cho thấy khí hậu nhiệt đới gió mùa ẩm: miền Bắc có mùa đông lạnh, miền Nam nóng quanh năm với mùa mưa và mùa khô, Huế mưa nhiều vào thu – đông.',
  ],
};
