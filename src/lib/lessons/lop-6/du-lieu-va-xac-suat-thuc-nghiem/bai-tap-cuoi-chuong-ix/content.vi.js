/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương IX: hệ thống hoá dữ liệu, bảng thống kê, biểu đồ tranh, biểu đồ cột, biểu đồ cột kép, kết quả có thể, sự kiện và xác suất thực nghiệm, kèm bài kiểm tra có bản đồ kĩ năng theo từng bài.',
  intro:
    'Chương IX dạy em làm việc với dữ liệu: thu thập, kiểm tra tính hợp lí, lập bảng thống kê, đọc và vẽ biểu đồ tranh, biểu đồ cột, biểu đồ cột kép. Phần cuối chương đưa em đến với những trò chơi, thí nghiệm không đoán trước được kết quả và cách đo khả năng xảy ra của một sự kiện bằng xác suất thực nghiệm. Bài này hệ thống lại toàn chương; bản đồ kĩ năng của bài kiểm tra sẽ chỉ ra bài nào cần ôn lại.',
  objectives: [
    'Hệ thống hoá kiến thức chương Dữ liệu và xác suất thực nghiệm.',
    'Làm bài tập trắc nghiệm và tự luận tổng hợp: phân loại dữ liệu, đọc bảng và biểu đồ, xét sự kiện, tính xác suất thực nghiệm.',
    'Vận dụng vào các tình huống thực tế: khảo sát trong lớp, kiểm tra sản phẩm, kết quả thi đấu.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức chương IX',
      blocks: [
        {
          type: 'table',
          caption: 'Kiến thức chính theo từng bài',
          head: ['Bài', 'Kiến thức cần nhớ'],
          rows: [
            [
              'Bài 38. Dữ liệu và thu thập dữ liệu',
              'Dữ liệu là số (số liệu) và không phải là số. Thu thập bằng quan sát, làm thí nghiệm, lập phiếu hỏi, lấy từ nguồn có sẵn. Dữ liệu hợp lí phải đúng định dạng, nằm trong phạm vi dự kiến.',
            ],
            [
              'Bài 39. Bảng thống kê và biểu đồ tranh',
              'Bảng thống kê ghi đối tượng và số liệu tương ứng. Biểu đồ tranh dùng biểu tượng, mỗi biểu tượng ứng với một số đối tượng; có thể dùng nửa biểu tượng.',
            ],
            [
              'Bài 40. Biểu đồ cột',
              'Trục ngang ghi đối tượng, trục dọc có khoảng chia đều; các cột cách đều, cùng chiều rộng, chiều cao biểu diễn số liệu.',
            ],
            [
              'Bài 41. Biểu đồ cột kép',
              'Ghép hai biểu đồ cột để so sánh từng cặp số liệu của hai bộ dữ liệu cùng loại; hai cột sát nhau, hai màu, có chú giải.',
            ],
            [
              'Bài 42. Kết quả có thể và sự kiện',
              'Không biết trước kết quả, nhưng liệt kê được tất cả các kết quả có thể. Sự kiện xảy ra hay không xảy ra tùy vào kết quả nhận được.',
            ],
            [
              'Bài 43. Xác suất thực nghiệm',
              'Làm $n$ lần, sự kiện $A$ xảy ra $n(A)$ lần: xác suất thực nghiệm là $\\dfrac{n(A)}{n}$. Số lần thử càng lớn thì tỉ số càng ổn định.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kiểm tra trước khi tính',
          text: 'Trước khi đọc biểu đồ hay tính xác suất thực nghiệm, cộng các số liệu trong bảng để chắc tổng bằng số đối tượng (hoặc số lần thử). Tổng không khớp thì dữ liệu không hợp lí.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Bài kiểm tra có $12$ câu, hai câu cho mỗi bài từ Bài 38 đến Bài 43, đáp án là một số tự nhiên (câu hỏi phần trăm thì nhập số phần trăm). Sai lần đầu, em được gợi ý và làm lại. Bản đồ kĩ năng tô màu từng bài theo kết quả lần làm đầu: xanh là vững, vàng là cần luyện thêm, đỏ là cần ôn lại.',
  },
  examples: [
    {
      problem:
        'Lớp 6A có $36$ học sinh trả lời câu hỏi "Em đến trường bằng phương tiện gì?" (mỗi bạn chọn một): đi bộ $9$, xe đạp $14$, xe buýt $5$, bố mẹ đưa $8$. a) Dữ liệu thu được là số hay không phải số? b) Bảng có hợp lí không? c) Chọn ngẫu nhiên một bạn trong danh sách, ghi phương tiện rồi lặp lại $40$ lần, có $16$ lần là "xe đạp". Tính xác suất thực nghiệm của sự kiện "Bạn được chọn đi xe đạp".',
      steps: [
        'a) Câu trả lời là tên phương tiện: dữ liệu không phải là số; số bạn của mỗi phương tiện trong bảng là số liệu.',
        'b) $9 + 14 + 5 + 8 = 36$ bằng sĩ số lớp, nên bảng hợp lí.',
        'c) $n = 40$, $n(A) = 16$: xác suất thực nghiệm là $\\dfrac{16}{40} = 0{,}4$.',
      ],
      answer: 'a) Không phải số; b) Hợp lí; c) $0{,}4$.',
    },
    {
      problem:
        'Số trận thắng của hai đội bóng trường trong ba năm: Đội nam thắng $6$; $8$; $10$ trận, đội nữ thắng $7$; $9$; $8$ trận (năm 2022, 2023, 2024). Mỗi năm mỗi đội đá $12$ trận. a) Nên vẽ biểu đồ nào? b) Tính xác suất thực nghiệm của sự kiện "Đội nam thắng" trong năm 2024.',
      steps: [
        'a) Hai bộ dữ liệu cùng loại (số trận thắng) theo cùng các năm: vẽ biểu đồ cột kép.',
        'b) Năm 2024 đội nam đá $12$ trận, thắng $10$: $\\dfrac{10}{12} = \\dfrac{5}{6}$.',
      ],
      answer: 'a) Biểu đồ cột kép; b) $\\dfrac{5}{6}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Dữ liệu nào dưới đây không phải là số liệu?',
      options: [
        'Chiều cao: $150$ cm',
        'Màu mắt: đen',
        'Số bạn đi xe đạp: $12$',
        'Cân nặng: $40$ kg',
      ],
      answer: 1,
      hints: ['Số liệu là dữ liệu được ghi bằng số.'],
      solution: 'Màu mắt "đen" là dữ liệu không phải là số; ba dữ liệu còn lại là số liệu.',
    },
    {
      type: 'number',
      prompt:
        'Tuổi của một số học sinh lớp 6 được ghi lại là: $11$; $12$; $11$; $110$; $11$; $12$. Giá trị nào không hợp lí?',
      answer: 110,
      hints: ['Học sinh lớp 6 thường khoảng $11$, $12$ tuổi.'],
      solution:
        'Không có học sinh lớp 6 nào $110$ tuổi, nên $110$ là giá trị không hợp lí (có thể ghi nhầm từ $11$).',
    },
    {
      type: 'number',
      prompt:
        'Lớp 6B có $40$ học sinh, mỗi bạn chọn đúng một môn học yêu thích. Bảng thống kê ghi: Toán $12$, Ngữ văn $9$, Tiếng Anh ?, Giáo dục thể chất $8$. Số ở ô "?" là bao nhiêu?',
      answer: 11,
      unit: 'học sinh',
      hints: ['Tổng số học sinh trong bảng phải bằng sĩ số lớp.'],
      solution: '$40 - (12 + 9 + 8) = 40 - 29 = 11$ học sinh.',
    },
    {
      type: 'number',
      prompt:
        'Trong một biểu đồ tranh, mỗi biểu tượng ứng với $10$ cây. Hàng của lớp 6C có $4$ biểu tượng và nửa biểu tượng. Lớp 6C trồng được bao nhiêu cây?',
      answer: 45,
      unit: 'cây',
      hints: ['Nửa biểu tượng ứng với $10 : 2 = 5$ cây.'],
      solution: '$4 \\cdot 10 + 5 = 45$ cây.',
    },
    {
      type: 'number',
      prompt:
        'Trên trục dọc của một biểu đồ cột, mỗi khoảng chia ứng với $4$ học sinh, bắt đầu từ $0$. Cột "Bóng rổ" cao đúng đến vạch thứ $7$ (không kể vạch $0$). Có bao nhiêu học sinh thích bóng rổ?',
      answer: 28,
      unit: 'học sinh',
      hints: ['Vạch thứ $7$ ứng với $7$ khoảng chia.'],
      solution: '$7 \\cdot 4 = 28$ học sinh.',
    },
    {
      type: 'choice',
      prompt:
        'Để so sánh số học sinh nam và số học sinh nữ của từng lớp trong khối 6, nên dùng loại biểu đồ nào?',
      options: ['Biểu đồ tranh', 'Biểu đồ cột', 'Biểu đồ cột kép', 'Chỉ cần bảng kiểm đếm'],
      answer: 2,
      hints: ['Có hai bộ dữ liệu cùng loại cho cùng các lớp.'],
      solution:
        'Hai bộ dữ liệu cùng loại (số nam, số nữ) theo cùng các lớp: biểu đồ cột kép giúp so sánh từng cặp.',
    },
    {
      type: 'number',
      prompt:
        'Một biểu đồ cột kép biểu diễn số sách hai lớp quyên góp trong tháng 9, 10, 11: lớp 6A $15$; $20$; $25$ quyển, lớp 6B $18$; $16$; $30$ quyển. Trong cả ba tháng, lớp 6B quyên góp nhiều hơn lớp 6A bao nhiêu quyển?',
      answer: 4,
      unit: 'quyển',
      hints: ['Cộng các cột của mỗi lớp rồi lấy hiệu.'],
      solution: 'Lớp 6A: $15 + 20 + 25 = 60$; lớp 6B: $18 + 16 + 30 = 64$. $64 - 60 = 4$ quyển.',
    },
    {
      type: 'number',
      prompt:
        'Gieo một con xúc xắc. Có bao nhiêu kết quả có thể làm cho sự kiện "Số chấm xuất hiện chia hết cho $2$ hoặc chia hết cho $3$" xảy ra?',
      answer: 4,
      unit: 'kết quả',
      hints: [
        'Liệt kê các số từ $1$ đến $6$ chia hết cho $2$, rồi thêm các số chia hết cho $3$ chưa có.',
      ],
      solution:
        'Chia hết cho $2$: $2$; $4$; $6$. Chia hết cho $3$: $3$; $6$. Gộp lại: $2$; $3$; $4$; $6$, tức $4$ kết quả.',
    },
    {
      type: 'multi',
      prompt: 'Gieo một con xúc xắc và được mặt $6$ chấm. Chọn tất cả các sự kiện đã xảy ra.',
      options: [
        '"Số chấm xuất hiện là số chẵn"',
        '"Số chấm xuất hiện là số nguyên tố"',
        '"Số chấm xuất hiện chia hết cho $3$"',
        '"Số chấm xuất hiện nhỏ hơn $6$"',
      ],
      answers: [0, 2],
      hints: ['Thay số $6$ vào từng sự kiện.'],
      solution:
        '$6$ là số chẵn và chia hết cho $3$: hai sự kiện đó xảy ra. $6$ là hợp số và không nhỏ hơn $6$: hai sự kiện còn lại không xảy ra.',
    },
    {
      type: 'fraction',
      prompt:
        'Lấy một quả bóng từ thùng, xem màu rồi trả lại; lặp lại $50$ lần thì được: xanh $18$ lần, đỏ $12$ lần, vàng $20$ lần. Tính xác suất thực nghiệm của sự kiện "Quả bóng lấy ra không phải màu vàng" (viết dưới dạng phân số tối giản).',
      answer: [3, 5],
      simplest: true,
      hints: ['$n(A) = 50 - 20$.', 'Rút gọn phân số $\\dfrac{n(A)}{50}$.'],
      solution: '$n(A) = 18 + 12 = 30$. $\\dfrac{30}{50} = \\dfrac{3}{5}$.',
    },
    {
      type: 'number',
      prompt:
        'Một cửa hàng ghi nhận trong một ngày có $120$ lượt khách vào xem, trong đó $45$ lượt có mua hàng. Tính xác suất thực nghiệm của sự kiện "Khách vào xem có mua hàng" (viết dưới dạng số thập phân).',
      answer: 0.375,
      hints: ['Lập tỉ số $\\dfrac{45}{120}$ và rút gọn.'],
      solution: '$\\dfrac{45}{120} = \\dfrac{3}{8} = 0{,}375$.',
    },
    {
      type: 'number',
      prompt:
        'Trong mùa giải, một đội bóng đá $25$ trận và thắng $16$ trận. Xác suất thực nghiệm của sự kiện "Đội thắng" bằng bao nhiêu phần trăm?',
      answer: 64,
      unit: '%',
      hints: ['Viết $\\dfrac{16}{25}$ thành phân số có mẫu số $100$.'],
      solution: '$\\dfrac{16}{25} = \\dfrac{64}{100} = 64\\%$.',
    },
  ],
  takeaways: [
    'Thu thập, phân loại và kiểm tra tính hợp lí của dữ liệu trước khi lập bảng hay vẽ biểu đồ.',
    'Biểu đồ tranh cho số liệu nhỏ, tròn; biểu đồ cột cho một bộ dữ liệu; biểu đồ cột kép để so sánh hai bộ dữ liệu cùng loại.',
    'Liệt kê các kết quả có thể; một sự kiện xảy ra hay không tùy vào kết quả nhận được.',
    'Xác suất thực nghiệm $\\dfrac{n(A)}{n}$ đo khả năng xảy ra của sự kiện qua nhiều lần thử và ổn định dần khi số lần thử lớn.',
  ],
};
