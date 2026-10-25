/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về dữ liệu và thu thập dữ liệu, bảng thống kê và biểu đồ tranh, biểu đồ cột và biểu đồ cột kép.',
  intro:
    'Bài luyện tập này ôn lại bốn bài vừa học: dữ liệu và thu thập dữ liệu (Bài 38), bảng thống kê và biểu đồ tranh (Bài 39), biểu đồ cột (Bài 40) và biểu đồ cột kép (Bài 41). Em sẽ phân loại và kiểm tra tính hợp lí của dữ liệu, lập bảng thống kê, đọc và vẽ các loại biểu đồ, rồi dùng chúng để so sánh số liệu.',
  objectives: [
    'Phân biệt số liệu với dữ liệu không phải là số; phát hiện dữ liệu không hợp lí.',
    'Lập bảng thống kê; đọc và vẽ biểu đồ tranh.',
    'Đọc, vẽ biểu đồ cột và biểu đồ cột kép; so sánh các số liệu.',
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
              'Dữ liệu',
              'Thông tin thu thập được (số, chữ, hình ảnh, …). Dữ liệu là số gọi là số liệu.',
            ],
            [
              'Thu thập dữ liệu',
              'Quan sát, làm thí nghiệm, lập phiếu hỏi, lấy từ nguồn có sẵn (sách, báo, trang web).',
            ],
            ['Tính hợp lí', 'Dữ liệu hợp lí phải đúng định dạng và nằm trong phạm vi dự kiến.'],
            [
              'Bảng thống kê',
              'Các hàng và cột ghi đối tượng thống kê và số liệu tương ứng; tổng số liệu phải khớp với số dữ liệu.',
            ],
            [
              'Biểu đồ tranh',
              'Dùng biểu tượng để biểu diễn dữ liệu; chú thích mỗi biểu tượng ứng với bao nhiêu đối tượng; có thể dùng nửa biểu tượng.',
            ],
            [
              'Biểu đồ cột',
              'Trục ngang ghi đối tượng, trục dọc có khoảng chia đều; các cột cách đều, cùng chiều rộng, chiều cao thể hiện số liệu.',
            ],
            [
              'Biểu đồ cột kép',
              'Mỗi đối tượng có hai cột sát nhau, hai màu cho hai bộ dữ liệu cùng loại, có chú giải.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chọn biểu đồ',
          text: 'Số liệu nhỏ, tròn: biểu đồ tranh trực quan, dễ hiểu. Số liệu lớn hoặc lẻ: dùng biểu đồ cột. Cần so sánh hai bộ dữ liệu cùng loại: dùng biểu đồ cột kép.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện ngẫu nhiên',
    instruction:
      'Mỗi lượt có $12$ câu trộn từ Bài 38, Bài 39, Bài 40 và Bài 41; đáp án là một số tự nhiên. Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng cho biết bài nào cần ôn thêm.',
  },
  examples: [
    {
      problem:
        'Kết quả bình chọn món ăn sáng yêu thích của lớp 6A ($32$ học sinh, mỗi bạn chọn một món) được ghi trong bảng: Phở $10$; Bánh mì $8$; Xôi $6$; Bún chả $12$. Bảng có hợp lí không? Nếu có một ô bị ghi sai thừa thì sai thừa bao nhiêu?',
      steps: [
        'Tổng số bạn trong bảng: $10 + 8 + 6 + 12 = 36$.',
        'Lớp chỉ có $32$ học sinh và mỗi bạn chọn một món, nên tổng phải là $32$.',
        '$36 - 32 = 4$: bảng ghi thừa $4$ bạn.',
      ],
      answer: 'Bảng không hợp lí: tổng $36$ lớn hơn sĩ số $32$, thừa $4$ bạn.',
    },
    {
      problem:
        'Số kilôgam giấy vụn tổ 1 và tổ 2 thu được trong ba tháng: tổ 1 thu $15$; $20$; $25$ kg, tổ 2 thu $20$; $10$; $30$ kg (tháng 9, 10, 11). a) Nên vẽ loại biểu đồ nào để so sánh hai tổ theo từng tháng? b) Tháng nào tổ 1 thu nhiều hơn tổ 2? c) Tổ nào thu được nhiều hơn trong cả ba tháng?',
      steps: [
        'a) Hai bộ dữ liệu cùng loại (số kilôgam giấy) theo cùng các tháng: vẽ biểu đồ cột kép.',
        'b) Tháng 9: $15 < 20$; tháng 10: $20 > 10$; tháng 11: $25 < 30$. Chỉ tháng 10 tổ 1 nhiều hơn.',
        'c) Tổ 1: $15 + 20 + 25 = 60$ kg; tổ 2: $20 + 10 + 30 = 60$ kg.',
      ],
      answer: 'a) Biểu đồ cột kép; b) Tháng 10; c) Hai tổ thu được bằng nhau, mỗi tổ $60$ kg.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt:
        'Phiếu hỏi về các bạn tổ 2 thu được những dữ liệu dưới đây. Chọn tất cả các dữ liệu là số liệu.',
      options: [
        'Số giờ ngủ mỗi đêm: $8$ giờ',
        'Nơi sinh: Huế',
        'Số quyển truyện đã đọc trong tháng: $3$',
        'Môn thể thao yêu thích: bơi',
      ],
      answers: [0, 2],
      hints: ['Số liệu là dữ liệu được ghi bằng số.'],
      solution:
        'Số giờ ngủ ($8$) và số quyển truyện ($3$) là số liệu; nơi sinh và môn thể thao là dữ liệu không phải là số.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Hà ghi lại số giờ ngủ mỗi đêm của các bạn trong tổ: $8$; $9$; $7$; $28$; $8$; $9$. Dữ liệu nào không hợp lí?',
      options: ['$7$', '$9$', '$28$', 'Không có dữ liệu nào'],
      answer: 2,
      hints: ['Một ngày đêm chỉ có $24$ giờ.'],
      solution:
        'Một ngày đêm có $24$ giờ, nên không ai ngủ $28$ giờ mỗi đêm. Giá trị $28$ nằm ngoài phạm vi dự kiến, không hợp lí.',
    },
    {
      type: 'number',
      prompt:
        'Màu áo yêu thích của $15$ bạn: Xanh, Đỏ, Xanh, Vàng, Trắng, Xanh, Đỏ, Xanh, Trắng, Vàng, Xanh, Đỏ, Xanh, Trắng, Đỏ. Trong bảng thống kê, ô ứng với màu Xanh ghi bao nhiêu bạn?',
      answer: 6,
      unit: 'bạn',
      hints: ['Đếm số lần "Xanh" xuất hiện; có thể gạch kiểm đếm.'],
      solution:
        'Xanh xuất hiện ở các vị trí $1$, $3$, $6$, $8$, $11$, $13$: $6$ lần. (Kiểm tra: Đỏ $4$, Vàng $2$, Trắng $3$; $6 + 4 + 2 + 3 = 15$.)',
    },
    {
      type: 'number',
      prompt:
        'Trong biểu đồ tranh về số cây trồng được, mỗi biểu tượng ứng với $8$ cây. Hàng của lớp 6D có $4$ biểu tượng và nửa biểu tượng. Lớp 6D trồng được bao nhiêu cây?',
      answer: 36,
      unit: 'cây',
      hints: ['Nửa biểu tượng ứng với $8 : 2$ cây.'],
      solution: '$4 \\cdot 8 + 8 : 2 = 32 + 4 = 36$ cây.',
    },
    {
      type: 'choice',
      prompt:
        'Muốn biểu diễn số học sinh $20$; $35$; $15$; $30$ của bốn lớp bằng biểu đồ tranh cho gọn và chính xác, nên chọn mỗi biểu tượng ứng với',
      options: ['$10$ học sinh', '$4$ học sinh', '$7$ học sinh', '$1$ học sinh'],
      answer: 0,
      hints: ['Mỗi số liệu phải ứng với một số biểu tượng tròn, hoặc tròn thêm nửa biểu tượng.'],
      solution:
        'Với $10$ học sinh mỗi biểu tượng: $2$; $3$ và nửa; $1$ và nửa; $3$ biểu tượng. Với $4$ hay $7$ thì có số liệu không biểu diễn được bằng số tròn hoặc nửa biểu tượng; với $1$ thì phải vẽ quá nhiều biểu tượng.',
    },
    {
      type: 'number',
      prompt:
        'Trục dọc của một biểu đồ cột bắt đầu từ $0$, mỗi khoảng chia ứng với $20$ quyển sách. Cột "Thứ Hai" cao $3$ khoảng chia, cột "Thứ Ba" cao $5$ khoảng chia. Thứ Ba thư viện cho mượn nhiều hơn Thứ Hai bao nhiêu quyển?',
      answer: 40,
      unit: 'quyển',
      hints: ['Đổi chiều cao mỗi cột ra số quyển, hoặc nhân hiệu số khoảng chia với $20$.'],
      solution:
        'Thứ Hai: $3 \\cdot 20 = 60$; Thứ Ba: $5 \\cdot 20 = 100$. Hiệu: $100 - 60 = 40$ quyển.',
    },
    {
      type: 'text',
      prompt:
        'Biểu đồ cột cho biết số học sinh thích mỗi loại quả: Cam $8$, Xoài $14$, Ổi $5$, Chuối $11$. Loại quả nào được thích nhiều nhất?',
      accept: ['Xoài', 'quả xoài'],
      hints: ['Tìm cột cao nhất.'],
      solution: 'Cột cao nhất là Xoài với $14$ học sinh.',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ cột kép cho biết điểm kiểm tra Toán và Ngữ văn của bạn Minh trong ba lần kiểm tra: Toán $7$; $8$; $9$, Ngữ văn $8$; $6$; $9$. Tổng điểm Toán của Minh nhiều hơn tổng điểm Ngữ văn bao nhiêu điểm?',
      answer: 1,
      unit: 'điểm',
      hints: ['Cộng các cột cùng màu của mỗi môn rồi lấy hiệu.'],
      solution: 'Toán: $7 + 8 + 9 = 24$; Ngữ văn: $8 + 6 + 9 = 23$. Hiệu: $24 - 23 = 1$ điểm.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi yêu cầu với cách trình bày dữ liệu phù hợp nhất.',
      left: [
        'Số quyển vở ($4$, $6$, $8$, $10$) của bốn bạn, cần vẽ sinh động cho lớp 1 xem',
        'Số dân ($1\\,250$, $3\\,480$, $2\\,015$ người) của ba xã',
        'Số học sinh nam và nữ của từng lớp khối 6',
      ],
      right: ['Biểu đồ tranh', 'Biểu đồ cột', 'Biểu đồ cột kép', 'Dãy dữ liệu chưa sắp xếp'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Số nhỏ, tròn: biểu đồ tranh; số lớn, lẻ: biểu đồ cột; hai bộ dữ liệu cùng loại: cột kép.',
      ],
      solution:
        'Số vở nhỏ và chẵn: biểu đồ tranh (mỗi biểu tượng $2$ quyển). Số dân lớn, lẻ: biểu đồ cột. Nam và nữ của từng lớp là hai bộ dữ liệu cùng loại: biểu đồ cột kép.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước để có một biểu đồ cột về môn học yêu thích của lớp em.',
      items: [
        'Vẽ biểu đồ cột từ bảng thống kê',
        'Lập phiếu hỏi và thu thập câu trả lời của các bạn',
        'Loại bỏ các câu trả lời không hợp lí',
        'Lập bảng thống kê số bạn thích mỗi môn',
      ],
      answer: [1, 2, 3, 0],
      hints: ['Phải có dữ liệu, rồi kiểm tra dữ liệu, rồi mới tổng hợp và biểu diễn.'],
      solution:
        'Thu thập dữ liệu bằng phiếu hỏi → loại bỏ dữ liệu không hợp lí → lập bảng thống kê → vẽ biểu đồ cột.',
    },
  ],
  takeaways: [
    'Kiểm tra tính hợp lí (đúng định dạng, đúng phạm vi) trước khi lập bảng hay vẽ biểu đồ.',
    'Biểu đồ tranh: số biểu tượng nhân với số đối tượng của một biểu tượng; luôn có chú thích.',
    'Biểu đồ cột đọc bằng chiều cao cột theo khoảng chia trên trục dọc; biểu đồ cột kép so sánh hai bộ dữ liệu theo từng đối tượng.',
  ],
};
