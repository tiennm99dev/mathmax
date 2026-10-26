/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Mối liên hệ giữa xác suất thực nghiệm với xác suất: xác suất của biến cố được ước lượng bằng xác suất thực nghiệm k/n, và ứng dụng để ước lượng số lượng trong thực tế.',
  intro:
    'Muốn biết xác suất một chiếc bóng đèn của nhà máy bị lỗi, ta không thể liệt kê các kết quả đồng khả năng như khi gieo xúc xắc. Khi đó người ta kiểm tra nhiều chiếc bóng đèn, đếm số chiếc lỗi và dùng tỉ số thu được để ước lượng xác suất.',
  objectives: [
    'Tính xác suất thực nghiệm của một biến cố từ số liệu thực nghiệm, thống kê.',
    'Hiểu rằng xác suất của biến cố được ước lượng bằng xác suất thực nghiệm, và ước lượng càng tốt khi số lần thực nghiệm càng lớn.',
    'Dùng xác suất thực nghiệm để ước lượng số lượng trong các bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Xác suất thực nghiệm của một biến cố',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Xác suất thực nghiệm',
          text: 'Giả sử trong $n$ lần thực nghiệm hoặc theo dõi một hiện tượng, biến cố $E$ xảy ra $k$ lần. Khi đó xác suất thực nghiệm của biến cố $E$ bằng $\\dfrac{k}{n}$, tức là tỉ số giữa số lần xuất hiện biến cố $E$ và số lần thực nghiệm hay theo dõi hiện tượng đó.',
        },
        {
          type: 'table',
          head: ['Nước giải khát', 'Coca', 'Pepsi', '7 Up', 'Sting', 'Trà xanh'],
          rows: [['Số chai bán được', '$72$', '$57$', '$25$', '$19$', '$30$']],
          caption: 'Số chai nước một cửa hàng bán được trong một tháng (tổng $203$ chai).',
        },
        {
          type: 'p',
          text: 'Với mỗi chai được bán ra, xác suất thực nghiệm của biến cố "Khách mua chai Coca" là $\\dfrac{72}{203}$, của biến cố "Khách mua chai Sting" là $\\dfrac{19}{203}$.',
        },
      ],
    },
    {
      heading: 'Mối liên hệ giữa xác suất thực nghiệm với xác suất',
      blocks: [
        {
          type: 'p',
          text: 'Gieo một con xúc xắc cân đối, xác suất xuất hiện mặt $6$ chấm là $\\dfrac{1}{6} \\approx 0{,}167$. Nếu gieo $10$ lần, tỉ số số lần ra mặt $6$ có thể khác xa $0{,}167$; nhưng gieo hàng nghìn lần thì tỉ số đó thường rất gần $0{,}167$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Ước lượng xác suất',
          text: 'Xác suất của biến cố $E$ được ước lượng bằng xác suất thực nghiệm của $E$: $$P(E) \\approx \\dfrac{k}{n},$$ trong đó $n$ là số lần thực nghiệm hay theo dõi hiện tượng, $k$ là số lần biến cố $E$ xảy ra.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Số lần thực nghiệm $n$ càng lớn thì xác suất thực nghiệm thường càng gần xác suất của biến cố, nên ước lượng càng chính xác. Cách ước lượng này dùng được cả khi các kết quả không đồng khả năng hoặc không liệt kê được.',
        },
      ],
    },
    {
      heading: 'Ứng dụng: ước lượng số lượng',
      blocks: [
        {
          type: 'p',
          text: 'Nếu biến cố $E$ ứng với việc một cá thể trong tổng thể có tính chất nào đó (sản phẩm bị lỗi, người dân ủng hộ...), ta ước lượng được số cá thể có tính chất đó.',
        },
        {
          type: 'tex',
          tex: '\\text{Số cá thể có tính chất} \\approx N \\cdot \\dfrac{k}{n}',
        },
        {
          type: 'p',
          text: 'Ở đây $N$ là số cá thể của tổng thể, và trong $n$ cá thể được chọn ngẫu nhiên để kiểm tra có $k$ cá thể có tính chất đó.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Các cá thể được kiểm tra phải được chọn ngẫu nhiên. Chỉ hỏi những người đi tập thể dục buổi sáng thì không ước lượng được tỉ lệ người dân của cả thành phố thích tập thể dục.',
        },
      ],
    },
  ],
  explore: {
    title: 'Lặp lại thực nghiệm nhiều lần',
    instruction:
      'Chọn một thực nghiệm và bấm "+10 lần", "+100 lần", "+1 000 lần". Đường màu đỏ là xác suất thực nghiệm $\\dfrac{k}{n}$ sau mỗi lần thử; đường nét đứt là $P(E)$. Ở "Túi bí ẩn", hãy ước lượng số bi đỏ trong túi $20$ viên rồi mới mở túi kiểm tra.',
  },
  examples: [
    {
      problem:
        'Chọn ngẫu nhiên $100$ người dân của một phường để hỏi ý kiến, có $71$ người ủng hộ việc tắt điện trong Giờ Trái Đất. Hãy ước lượng xác suất của biến cố "Một người dân của phường được chọn ngẫu nhiên ủng hộ việc tắt điện".',
      steps: [
        'Số lần theo dõi (số người được hỏi): $n = 100$.',
        'Số lần biến cố xảy ra (số người ủng hộ): $k = 71$.',
        'Xác suất được ước lượng bằng xác suất thực nghiệm: $P \\approx \\dfrac{71}{100} = 0{,}71 = 71\\%$.',
      ],
      answer: 'Xác suất cần tìm xấp xỉ $0{,}71$.',
    },
    {
      problem:
        'Một nhà máy kiểm tra ngẫu nhiên $200$ chiếc bóng đèn thì thấy có $6$ chiếc bị lỗi. Trong một lô $5\\,000$ chiếc bóng đèn của nhà máy, hãy ước lượng số bóng đèn bị lỗi.',
      steps: [
        'Xác suất thực nghiệm của biến cố "Bóng đèn bị lỗi": $\\dfrac{6}{200} = 0{,}03$.',
        'Xác suất một bóng đèn bị lỗi được ước lượng là $0{,}03$.',
        'Số bóng đèn bị lỗi trong lô: $5\\,000 \\cdot 0{,}03 = 150$.',
      ],
      answer: 'Lô hàng có khoảng $150$ bóng đèn bị lỗi.',
    },
    {
      problem:
        'Để ước lượng số cá trong một hồ, người ta bắt $120$ con cá, đánh dấu rồi thả lại xuống hồ. Ít ngày sau bắt ngẫu nhiên $100$ con thì thấy $8$ con có đánh dấu. Ước lượng số cá trong hồ.',
      steps: [
        'Gọi $N$ là số cá trong hồ, trong đó có $120$ con đánh dấu. Xác suất bắt được cá có đánh dấu là $\\dfrac{120}{N}$.',
        'Xác suất thực nghiệm của biến cố đó là $\\dfrac{8}{100}$, nên $\\dfrac{120}{N} \\approx \\dfrac{8}{100}$.',
        'Suy ra $N \\approx \\dfrac{120 \\cdot 100}{8} = 1\\,500$.',
      ],
      answer: 'Hồ có khoảng $1\\,500$ con cá.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt:
        'Một cửa hàng điện máy thống kê số sản phẩm bán ra trong tháng: tổng cộng $84$ sản phẩm, trong đó có $22$ chiếc điện thoại. Tính xác suất thực nghiệm của biến cố "Sản phẩm bán ra là điện thoại" (viết dưới dạng phân số tối giản).',
      answer: [11, 42],
      simplest: true,
      hints: ['Xác suất thực nghiệm là $\\dfrac{k}{n}$ với $n = 84$.', 'Rút gọn phân số.'],
      solution: '$\\dfrac{22}{84} = \\dfrac{11}{42}$.',
    },
    {
      type: 'number',
      prompt:
        'Hỏi $100$ học sinh về thể loại phim yêu thích, có $19$ bạn chọn khoa học viễn tưởng và $5$ bạn chọn phim tài liệu. Ước lượng xác suất một học sinh được chọn ngẫu nhiên thích phim khoa học viễn tưởng hoặc phim tài liệu (viết dưới dạng số thập phân).',
      answer: 0.24,
      hints: ['Biến cố xảy ra với những bạn chọn một trong hai thể loại.'],
      solution: '$k = 19 + 5 = 24$, $n = 100$: $P \\approx \\dfrac{24}{100} = 0{,}24$.',
    },
    {
      type: 'number',
      prompt:
        'Đo chiều cao của $80$ học sinh được chọn ngẫu nhiên: dưới $120$ cm: $4$ bạn; từ $120$ đến $140$ cm: $22$ bạn; từ $141$ đến $160$ cm: $39$ bạn; trên $160$ cm: $15$ bạn. Ước lượng xác suất một học sinh có chiều cao từ $141$ cm trở lên (viết dưới dạng số thập phân).',
      answer: 0.675,
      hints: ['Cộng số bạn ở hai nhóm cao nhất.'],
      solution: '$k = 39 + 15 = 54$, $n = 80$: $P \\approx \\dfrac{54}{80} = 0{,}675$.',
    },
    {
      type: 'number',
      prompt:
        'Trong một đợt dịch có $8\\,437$ người nhiễm bệnh, trong đó $813$ người tử vong. Ước lượng xác suất tử vong của một người nhiễm bệnh, tính theo phần trăm và làm tròn đến hàng phần mười.',
      answer: 9.6,
      tolerance: 0.05,
      unit: '%',
      hints: ['Tính $\\dfrac{813}{8\\,437}$ rồi đổi ra phần trăm.'],
      solution: '$\\dfrac{813}{8\\,437} \\approx 0{,}0964 \\approx 9{,}6\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Kiểm tra ngẫu nhiên $300$ hộp sữa của một lô thấy có $9$ hộp không đạt chuẩn. Lô hàng có $12\\,000$ hộp sữa. Ước lượng số hộp không đạt chuẩn trong lô.',
      answer: 360,
      hints: ['Tính xác suất thực nghiệm trước.', 'Nhân xác suất đó với số hộp trong lô.'],
      solution:
        'Xác suất thực nghiệm: $\\dfrac{9}{300} = 0{,}03$. Số hộp không đạt chuẩn khoảng $12\\,000 \\cdot 0{,}03 = 360$.',
    },
    {
      type: 'number',
      prompt:
        'Người ta đánh dấu $60$ con cá rồi thả lại hồ. Lần sau bắt ngẫu nhiên $150$ con thì thấy có $6$ con được đánh dấu. Ước lượng số cá trong hồ.',
      answer: 1500,
      hints: ['$\\dfrac{60}{N} \\approx \\dfrac{6}{150}$.'],
      solution:
        '$\\dfrac{60}{N} \\approx \\dfrac{6}{150}$ nên $N \\approx \\dfrac{60 \\cdot 150}{6} = 1\\,500$ con.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Nam tung một đồng xu cân đối $10$ lần, được $7$ lần mặt ngửa. Nam kết luận: "Xác suất xuất hiện mặt ngửa của đồng xu này là $0{,}7$". Nhận xét nào đúng?',
      options: [
        'Nam đúng, vì xác suất thực nghiệm là $\\dfrac{7}{10}$.',
        'Nam chưa đúng: $10$ lần là quá ít; đồng xu cân đối có xác suất mặt ngửa là $0{,}5$, và tung càng nhiều lần thì tỉ số thường càng gần $0{,}5$.',
        'Nam sai, xác suất mặt ngửa là $0{,}3$.',
        'Không thể nói gì về xác suất mặt ngửa.',
      ],
      answer: 1,
      hints: ['Với đồng xu cân đối, hai mặt đồng khả năng.'],
      solution:
        'Đồng xu cân đối nên $P = \\dfrac{1}{2} = 0{,}5$. Xác suất thực nghiệm $0{,}7$ sau chỉ $10$ lần chưa phải là ước lượng tốt; khi số lần tung lớn thì xác suất thực nghiệm thường gần $0{,}5$.',
    },
    {
      type: 'number',
      prompt:
        'Một bảo tàng có $750$ lượt khách trong năm, trong đó bốn tháng đầu năm có $107 + 111 = 218$ lượt. Ước lượng xác suất một lượt khách (chọn ngẫu nhiên) đến vào bốn tháng đầu năm, tính theo phần trăm và làm tròn đến hàng đơn vị.',
      answer: 29,
      tolerance: 0.5,
      unit: '%',
      hints: ['Tính $\\dfrac{218}{750}$ rồi đổi ra phần trăm.'],
      solution: '$\\dfrac{218}{750} \\approx 0{,}291 \\approx 29\\%$.',
    },
  ],
  takeaways: [
    'Trong $n$ lần thực nghiệm, biến cố $E$ xảy ra $k$ lần thì xác suất thực nghiệm của $E$ là $\\dfrac{k}{n}$.',
    'Xác suất của biến cố được ước lượng bằng xác suất thực nghiệm: $P(E) \\approx \\dfrac{k}{n}$; $n$ càng lớn thì ước lượng thường càng chính xác.',
    'Số cá thể có tính chất trong tổng thể $N$ được ước lượng bằng $N \\cdot \\dfrac{k}{n}$, với mẫu được chọn ngẫu nhiên.',
  ],
};
