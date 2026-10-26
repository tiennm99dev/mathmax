/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về kết quả có thể, kết quả thuận lợi, tính xác suất bằng tỉ số khi các kết quả đồng khả năng và ước lượng xác suất bằng xác suất thực nghiệm.',
  intro:
    'Bài luyện tập này ôn lại Bài 30 (Kết quả có thể và kết quả thuận lợi), Bài 31 (Cách tính xác suất của biến cố bằng tỉ số) và Bài 32 (Mối liên hệ giữa xác suất thực nghiệm với xác suất và ứng dụng). Em sẽ liệt kê kết quả, tính xác suất bằng tỉ số và dùng số liệu thống kê để ước lượng xác suất.',
  objectives: [
    'Liệt kê và đếm kết quả có thể, kết quả thuận lợi cho một biến cố.',
    'Tính xác suất bằng tỉ số khi các kết quả có thể đồng khả năng.',
    'Ước lượng xác suất bằng xác suất thực nghiệm và ước lượng số lượng trong thực tế.',
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
              'Kết quả có thể',
              'Mỗi kết quả có thể xảy ra của hành động, thực nghiệm; đặt tên từng kết quả để liệt kê đủ.',
            ],
            ['Kết quả thuận lợi', 'Kết quả có thể làm cho biến cố $E$ xảy ra.'],
            [
              'Xác suất bằng tỉ số',
              'Khi các kết quả đồng khả năng: $P(E) = \\dfrac{\\text{số kết quả thuận lợi cho } E}{\\text{tổng số kết quả có thể}}$.',
            ],
            [
              'Xác suất thực nghiệm',
              'Trong $n$ lần, $E$ xảy ra $k$ lần: $P(E) \\approx \\dfrac{k}{n}$; số cá thể có tính chất $\\approx N \\cdot \\dfrac{k}{n}$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Chỉ dùng công thức tỉ số khi các kết quả đồng khả năng. Khi không liệt kê được các kết quả đồng khả năng, hãy ước lượng xác suất bằng xác suất thực nghiệm.',
        },
      ],
    },
    {
      heading: 'Chọn cách tính xác suất',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Đề bài cho các đối tượng "như nhau", "cân đối", "chọn ngẫu nhiên": liệt kê các kết quả có thể, đếm kết quả thuận lợi rồi lập tỉ số.',
            'Đề bài cho số liệu thống kê hay kết quả của nhiều lần thực nghiệm: tính xác suất thực nghiệm $\\dfrac{k}{n}$ để ước lượng xác suất.',
            'Muốn ước lượng số lượng trong một tổng thể: nhân xác suất ước lượng được với số cá thể của tổng thể.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện trộn ngẫu nhiên',
    instruction:
      'Mỗi lượt có $12$ câu trộn từ ba bài của chương. Nhập số tự nhiên, hoặc xác suất dạng phân số như $3/10$ hay số thập phân như $0{,}3$, rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết em cần ôn lại bài nào.',
  },
  examples: [
    {
      problem:
        'Một túi đựng các quả bóng giống hệt nhau, chỉ khác màu, gồm $15$ quả màu xanh, $13$ quả màu đỏ và $17$ quả màu trắng. Lấy ngẫu nhiên một quả bóng. Tính xác suất của các biến cố $A$: "Lấy được quả bóng màu xanh"; $B$: "Lấy được quả bóng không phải màu đỏ".',
      steps: [
        'Có $15 + 13 + 17 = 45$ kết quả có thể; các quả bóng giống hệt nhau nên các kết quả đồng khả năng.',
        'Có $15$ kết quả thuận lợi cho $A$: $P(A) = \\dfrac{15}{45} = \\dfrac{1}{3}$.',
        'Bóng không phải màu đỏ gồm $15 + 17 = 32$ quả: $P(B) = \\dfrac{32}{45}$.',
      ],
      answer: '$P(A) = \\dfrac{1}{3}$; $P(B) = \\dfrac{32}{45}$.',
    },
    {
      problem:
        'Trong trò chơi "Xúc xắc may mắn", mỗi lượt người chơi gieo đồng thời hai con xúc xắc; nếu cả hai con cùng ra mặt $6$ chấm thì người chơi thắng. Người ta theo dõi $1\\,800$ lượt chơi thì thấy có $50$ lượt thắng. Ước lượng xác suất thắng của một lượt chơi; nếu có $720$ lượt chơi trong một ngày thì có khoảng bao nhiêu lượt thắng?',
      steps: [
        'Xác suất thực nghiệm của biến cố "Thắng": $\\dfrac{50}{1\\,800} = \\dfrac{1}{36}$.',
        'Xác suất thắng được ước lượng là $\\dfrac{1}{36}$.',
        'Số lượt thắng trong $720$ lượt: $720 \\cdot \\dfrac{1}{36} = 20$.',
      ],
      answer: 'Xác suất thắng khoảng $\\dfrac{1}{36}$; khoảng $20$ lượt thắng.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt:
        'Gieo một con xúc xắc cân đối. Tính xác suất của biến cố "Số chấm xuất hiện là số chẵn".',
      answer: [1, 2],
      hints: ['Sáu mặt đồng khả năng; đếm các mặt có số chấm chẵn.'],
      solution: 'Kết quả thuận lợi: mặt $2;\\ 4;\\ 6$ chấm. $P = \\dfrac{3}{6} = \\dfrac{1}{2}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo một con xúc xắc cân đối. Tính xác suất của biến cố "Số chấm xuất hiện lớn hơn $4$".',
      answer: [1, 3],
      hints: ['Số chấm lớn hơn $4$ là những số nào?'],
      solution: 'Kết quả thuận lợi: mặt $5$ và mặt $6$ chấm. $P = \\dfrac{2}{6} = \\dfrac{1}{3}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Với túi bóng ở Ví dụ 1 ($15$ xanh, $13$ đỏ, $17$ trắng), tính xác suất lấy được quả bóng màu đỏ hoặc màu trắng.',
      answer: [2, 3],
      hints: ['Cộng số bóng đỏ và số bóng trắng.'],
      solution:
        'Có $13 + 17 = 30$ kết quả thuận lợi trong $45$: $P = \\dfrac{30}{45} = \\dfrac{2}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Viết ngẫu nhiên một số tự nhiên có hai chữ số. Có bao nhiêu kết quả thuận lợi cho biến cố "Số được viết có chữ số hàng đơn vị là $0$"?',
      answer: 9,
      hints: ['Các số đó là $10;\\ 20;\\ \\ldots$'],
      solution:
        'Các số có hai chữ số tận cùng là $0$: $10;\\ 20;\\ \\ldots;\\ 90$, gồm $9$ số. Có $9$ kết quả thuận lợi.',
    },
    {
      type: 'fraction',
      prompt:
        'Viết ngẫu nhiên một số tự nhiên có hai chữ số. Tính xác suất của biến cố "Số được viết là bình phương của một số tự nhiên".',
      answer: [1, 15],
      hints: [
        'Có $90$ số tự nhiên có hai chữ số.',
        'Liệt kê các số chính phương từ $10$ đến $99$: $16;\\ 25;\\ \\ldots$',
      ],
      solution:
        'Có $90$ kết quả có thể. Các số chính phương có hai chữ số: $16;\\ 25;\\ 36;\\ 49;\\ 64;\\ 81$, gồm $6$ số. $P = \\dfrac{6}{90} = \\dfrac{1}{15}$.',
    },
    {
      type: 'choice',
      prompt: 'Trong các hành động sau, hành động nào có các kết quả có thể KHÔNG đồng khả năng?',
      options: [
        'Gieo một con xúc xắc cân đối.',
        'Rút ngẫu nhiên một thẻ từ $10$ thẻ giống nhau ghi số $1$ đến $10$.',
        'Quay một vòng quay có ô đỏ chiếm nửa vòng tròn, ô xanh và ô vàng mỗi ô một phần tư; quan sát màu ô mũi tên chỉ vào.',
        'Tung một đồng xu cân đối.',
      ],
      answer: 2,
      hints: ['Các ô của vòng quay có bằng nhau không?'],
      solution:
        'Ô đỏ to gấp đôi mỗi ô còn lại nên ba kết quả "đỏ", "xanh", "vàng" không có khả năng xảy ra như nhau. Ba hành động còn lại có các kết quả đồng khả năng.',
    },
    {
      type: 'fraction',
      prompt:
        'Thống kê số vụ tai nạn giao thông ở một thành phố trong tháng $9$: có $80$ vụ, trong đó $52$ vụ có xe máy liên quan. Ước lượng xác suất một vụ tai nạn giao thông ở thành phố này có xe máy liên quan (viết dưới dạng phân số tối giản).',
      answer: [13, 20],
      simplest: true,
      hints: ['$P \\approx \\dfrac{k}{n}$ với $n = 80$.'],
      solution: '$P \\approx \\dfrac{52}{80} = \\dfrac{13}{20}$.',
    },
    {
      type: 'number',
      prompt:
        'Kiểm tra ngẫu nhiên $250$ quả trứng của một trang trại thấy có $5$ quả bị dập vỡ. Ước lượng số quả trứng bị dập vỡ trong $10\\,000$ quả trứng của trang trại.',
      answer: 200,
      hints: ['Xác suất thực nghiệm là $\\dfrac{5}{250}$.'],
      solution:
        '$\\dfrac{5}{250} = 0{,}02$; số trứng dập vỡ khoảng $10\\,000 \\cdot 0{,}02 = 200$ quả.',
    },
    {
      type: 'number',
      prompt:
        'Gieo một con xúc xắc $300$ lần thì thấy mặt $1$ chấm xuất hiện $48$ lần. Tính xác suất thực nghiệm của biến cố "Xuất hiện mặt $1$ chấm" (viết dưới dạng số thập phân).',
      answer: 0.16,
      hints: ['Chia số lần xuất hiện mặt $1$ chấm cho số lần gieo.'],
      solution:
        '$\\dfrac{48}{300} = 0{,}16$. (Xác suất lí thuyết là $\\dfrac{1}{6} \\approx 0{,}167$, khá gần.)',
    },
    {
      type: 'number',
      prompt:
        'Một hộp có $5$ viên bi trắng và $15$ viên bi đen cùng kích thước. Cần bỏ thêm vào hộp bao nhiêu viên bi trắng để xác suất lấy ngẫu nhiên được bi trắng bằng $\\dfrac{1}{2}$?',
      answer: 10,
      hints: ['Xác suất bằng $\\dfrac{1}{2}$ khi số bi trắng bằng số bi đen.'],
      solution: 'Cần số bi trắng bằng $15$, nên phải thêm $15 - 5 = 10$ viên bi trắng.',
    },
  ],
  takeaways: [
    'Liệt kê kết quả có thể, rồi chọn kết quả thuận lợi cho biến cố.',
    'Các kết quả đồng khả năng: $P(E)$ = số kết quả thuận lợi : tổng số kết quả có thể.',
    'Từ số liệu thực nghiệm: $P(E) \\approx \\dfrac{k}{n}$, và ước lượng số lượng bằng $N \\cdot \\dfrac{k}{n}$.',
  ],
};
