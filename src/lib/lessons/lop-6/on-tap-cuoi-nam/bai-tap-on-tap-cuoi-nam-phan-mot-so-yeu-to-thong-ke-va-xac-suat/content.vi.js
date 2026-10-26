/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm Toán 6 phần Một số yếu tố thống kê và xác suất: dữ liệu, bảng thống kê, biểu đồ tranh, biểu đồ cột, biểu đồ cột kép, kết quả có thể, sự kiện và xác suất thực nghiệm, kèm bộ câu hỏi đọc biểu đồ và thí nghiệm mô phỏng có chấm điểm.',
  intro:
    'Hằng ngày em gặp rất nhiều dữ liệu: điểm kiểm tra, số bạn đi học muộn, kết quả một trận đấu. Lớp 6 dạy em thu thập và kiểm tra dữ liệu, biểu diễn chúng bằng bảng và biểu đồ, và đo khả năng xảy ra của một sự kiện bằng xác suất thực nghiệm. Bài ôn tập này hệ thống lại cả phần, giải mẫu các dạng bài và cho em vừa đọc biểu đồ vừa tự làm thí nghiệm để tính xác suất thực nghiệm.',
  objectives: [
    'Phân loại dữ liệu, nhận ra dữ liệu không hợp lí.',
    'Đọc và phân tích bảng thống kê, biểu đồ tranh, biểu đồ cột, biểu đồ cột kép.',
    'Liệt kê các kết quả có thể của một trò chơi, thí nghiệm; xét một sự kiện có xảy ra hay không.',
    'Tính xác suất thực nghiệm của một sự kiện từ bảng kết quả.',
  ],
  sections: [
    {
      heading: 'Dữ liệu, bảng và biểu đồ',
      blocks: [
        {
          type: 'table',
          caption: 'Những điều cần nhớ',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Dữ liệu',
              'Dữ liệu là số (số liệu) hoặc không phải là số (chữ, hình ảnh...). Thu thập bằng quan sát, làm thí nghiệm, lập phiếu hỏi, lấy từ nguồn có sẵn. Dữ liệu phải đúng định dạng và nằm trong phạm vi hợp lí.',
            ],
            [
              'Bảng thống kê',
              'Một hàng (hoặc cột) ghi đối tượng thống kê, hàng kia ghi số liệu tương ứng.',
            ],
            [
              'Biểu đồ tranh',
              'Mỗi biểu tượng ứng với một số đối tượng (ghi ở chú thích); có thể dùng nửa biểu tượng.',
            ],
            [
              'Biểu đồ cột',
              'Trục ngang ghi đối tượng, trục dọc ghi số liệu với khoảng chia đều; các cột cách đều, cùng chiều rộng.',
            ],
            [
              'Biểu đồ cột kép',
              'Ghép hai biểu đồ cột của hai bộ dữ liệu cùng loại để so sánh từng cặp; hai cột cạnh nhau có hai màu, kèm chú giải.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đọc biểu đồ theo ba bước',
          text: 'Đọc tên biểu đồ và hai trục (đối tượng nào, đơn vị gì); đọc số liệu của từng cột; rồi mới so sánh, tính tổng, hiệu hay tỉ số phần trăm. Tỉ số phần trăm của $a$ và $b$ là $\\dfrac{a \\cdot 100}{b}\\%$.',
        },
      ],
    },
    {
      heading: 'Kết quả có thể, sự kiện và xác suất thực nghiệm',
      blocks: [
        {
          type: 'p',
          text: 'Khi tung đồng xu, gieo xúc xắc hay lấy bóng trong hộp, ta không biết trước kết quả nhưng liệt kê được tất cả các kết quả có thể. Tung một đồng xu có $2$ kết quả có thể: mặt sấp (S), mặt ngửa (N). Gieo một xúc xắc có $6$ kết quả có thể: mặt $1, 2, 3, 4, 5, 6$ chấm.',
        },
        {
          type: 'p',
          text: 'Một sự kiện có thể xảy ra hoặc không xảy ra, tùy vào kết quả nhận được. Chẳng hạn khi gieo xúc xắc được mặt $4$ chấm thì sự kiện "Số chấm là số chẵn" xảy ra, còn sự kiện "Số chấm lớn hơn $5$" không xảy ra.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Xác suất thực nghiệm',
          text: 'Thực hiện lặp đi lặp lại một hoạt động $n$ lần, sự kiện $A$ xảy ra $n(A)$ lần. Xác suất thực nghiệm của sự kiện $A$ là $\\dfrac{n(A)}{n} = \\dfrac{\\text{Số lần sự kiện } A \\text{ xảy ra}}{\\text{Tổng số lần thực hiện hoạt động}}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Hai lỗi hay gặp',
          text: 'Chia cho số kết quả có thể thay vì tổng số lần thực hiện; và quên rút gọn phân số. Xác suất thực nghiệm phụ thuộc vào người làm và số lần thử, nên hai bạn làm cùng một thí nghiệm có thể được hai kết quả khác nhau.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đọc biểu đồ và làm thí nghiệm',
    instruction:
      'Phần "Đọc biểu đồ": đọc biểu đồ cột rồi trả lời câu hỏi; sai lần đầu em được gợi ý và làm lại, bấm "Câu mới" để có biểu đồ khác. Phần "Thí nghiệm": chọn tung đồng xu, gieo xúc xắc hoặc lấy bóng, bấm "Thử" nhiều lần, rồi tính xác suất thực nghiệm của sự kiện $A$ từ bảng kết quả. Cả hai phần đều được chấm điểm theo lần trả lời đầu tiên.',
  },
  examples: [
    {
      problem:
        'Biểu đồ tranh cho số cuốn sách mỗi tổ của lớp 6A quyên góp, mỗi biểu tượng ứng với $10$ cuốn. Tổ 1 có $4$ biểu tượng, tổ 2 có $3$ biểu tượng và nửa biểu tượng, tổ 3 có $5$ biểu tượng. a) Lập bảng thống kê. b) Cả lớp quyên góp được bao nhiêu cuốn sách?',
      steps: [
        'Tổ 1: $4 \\cdot 10 = 40$ cuốn. Tổ 2: $3 \\cdot 10 + 5 = 35$ cuốn (nửa biểu tượng ứng với $5$ cuốn). Tổ 3: $5 \\cdot 10 = 50$ cuốn.',
        'Bảng thống kê: Tổ 1 — $40$; Tổ 2 — $35$; Tổ 3 — $50$.',
        'Cả lớp: $40 + 35 + 50 = 125$ (cuốn).',
      ],
      answer: 'Cả lớp quyên góp được $125$ cuốn sách.',
    },
    {
      problem:
        'Biểu đồ cột kép cho số học sinh nam và nữ của hai lớp: lớp 6A có $18$ nam, $20$ nữ; lớp 6B có $22$ nam, $19$ nữ. a) Lớp nào có nhiều học sinh hơn và nhiều hơn bao nhiêu? b) Ở lớp 6B, học sinh nam nhiều hơn học sinh nữ bao nhiêu?',
      steps: [
        'Lớp 6A: $18 + 20 = 38$ học sinh. Lớp 6B: $22 + 19 = 41$ học sinh.',
        'Lớp 6B nhiều hơn lớp 6A: $41 - 38 = 3$ học sinh.',
        'Ở lớp 6B, nam nhiều hơn nữ: $22 - 19 = 3$ học sinh.',
      ],
      answer: 'a) Lớp 6B nhiều hơn $3$ học sinh. b) Nam nhiều hơn nữ $3$ học sinh.',
    },
    {
      problem:
        'Tung một đồng xu $50$ lần, có $22$ lần xuất hiện mặt ngửa. Tính xác suất thực nghiệm của sự kiện "Đồng xu xuất hiện mặt ngửa" và của sự kiện "Đồng xu xuất hiện mặt sấp".',
      steps: [
        'Mặt ngửa xuất hiện $22$ lần trong $50$ lần tung: $\\dfrac{22}{50} = \\dfrac{11}{25}$.',
        'Mặt sấp xuất hiện $50 - 22 = 28$ lần: $\\dfrac{28}{50} = \\dfrac{14}{25}$.',
      ],
      answer: 'Mặt ngửa: $\\dfrac{11}{25}$; mặt sấp: $\\dfrac{14}{25}$.',
    },
    {
      problem:
        'Gieo một con xúc xắc $40$ lần, số lần xuất hiện các mặt $1, 2, 3, 4, 5, 6$ chấm lần lượt là $5, 7, 8, 6, 9, 5$. Tính xác suất thực nghiệm của sự kiện "Số chấm xuất hiện là số lẻ".',
      steps: [
        'Kiểm tra: $5 + 7 + 8 + 6 + 9 + 5 = 40$ lần.',
        'Sự kiện xảy ra khi được mặt $1$, $3$ hoặc $5$ chấm: $5 + 8 + 9 = 22$ lần.',
        'Xác suất thực nghiệm: $\\dfrac{22}{40} = \\dfrac{11}{20}$.',
      ],
      answer: '$\\dfrac{11}{20}$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Chọn tất cả các dữ liệu là số (số liệu).',
      options: [
        'Chiều cao của các bạn trong tổ (cm)',
        'Môn học yêu thích của các bạn',
        'Số anh chị em ruột của mỗi bạn',
        'Nơi sinh của các bạn',
        'Thời gian đi từ nhà đến trường (phút)',
      ],
      answers: [0, 2, 4],
      hints: ['Số liệu là dữ liệu được ghi lại bằng con số.'],
      solution:
        'Chiều cao, số anh chị em ruột và thời gian đến trường là số liệu. Môn học yêu thích và nơi sinh là dữ liệu không phải là số.',
    },
    {
      type: 'number',
      prompt:
        'Điểm kiểm tra môn Toán (thang điểm $10$) của $8$ bạn được ghi là: $7;\\ 8;\\ 11;\\ 9;\\ 6;\\ 10;\\ 12;\\ 8$. Có bao nhiêu giá trị không hợp lí?',
      answer: 2,
      hints: ['Điểm theo thang $10$ chỉ nằm trong phạm vi từ $0$ đến $10$.'],
      solution: 'Hai giá trị $11$ và $12$ lớn hơn $10$ nên không hợp lí.',
    },
    {
      type: 'number',
      prompt:
        'Trong một biểu đồ tranh, mỗi biểu tượng ứng với $10$ cuốn sách. Lớp 6B có $4$ biểu tượng và nửa biểu tượng. Lớp 6B có bao nhiêu cuốn sách?',
      answer: 45,
      unit: 'cuốn',
      hints: ['Nửa biểu tượng ứng với nửa số cuốn sách của một biểu tượng.'],
      solution: '$4 \\cdot 10 + 5 = 45$ (cuốn).',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ cột cho số học sinh đạt điểm giỏi của lớp 6C qua các tháng: tháng 9 có $12$ bạn, tháng 10 có $15$ bạn, tháng 11 có $20$ bạn, tháng 12 có $18$ bạn. Tháng 11 có nhiều hơn tháng 9 bao nhiêu bạn đạt điểm giỏi?',
      answer: 8,
      unit: 'bạn',
      hints: ['Đọc số liệu của hai cột tháng 11 và tháng 9 rồi trừ.'],
      solution: '$20 - 12 = 8$ (bạn).',
    },
    {
      type: 'number',
      prompt:
        'Lớp 6A có $40$ học sinh, trong đó $14$ bạn chọn bóng đá là môn thể thao yêu thích. Số bạn chọn bóng đá chiếm bao nhiêu phần trăm số học sinh của lớp?',
      answer: 35,
      unit: '%',
      hints: ['Tỉ số phần trăm của $a$ và $b$ là $\\dfrac{a \\cdot 100}{b}\\%$.'],
      solution: '$\\dfrac{14 \\cdot 100}{40}\\% = 35\\%$.',
    },
    {
      type: 'choice',
      prompt:
        'Để so sánh số học sinh nam và số học sinh nữ của từng lớp trong khối 6, nên dùng loại biểu đồ nào?',
      options: [
        'Biểu đồ tranh',
        'Biểu đồ cột',
        'Biểu đồ cột kép',
        'Chỉ cần bảng danh sách học sinh',
      ],
      answer: 2,
      hints: ['Có hai bộ dữ liệu cùng loại (nam và nữ) cho mỗi lớp.'],
      solution:
        'Biểu đồ cột kép đặt hai cột (nam, nữ) của mỗi lớp cạnh nhau, giúp so sánh từng cặp số liệu.',
    },
    {
      type: 'number',
      prompt:
        'Một hộp có $1$ quả bóng xanh, $1$ quả bóng đỏ và $1$ quả bóng vàng có cùng kích thước. Lấy ngẫu nhiên một quả bóng từ hộp. Có bao nhiêu kết quả có thể?',
      answer: 3,
      unit: 'kết quả',
      hints: ['Mỗi màu bóng có thể lấy được là một kết quả.'],
      solution: 'Các kết quả có thể: bóng xanh, bóng đỏ, bóng vàng. Có $3$ kết quả.',
    },
    {
      type: 'multi',
      prompt: 'Gieo một con xúc xắc và được mặt $5$ chấm. Chọn tất cả các sự kiện đã xảy ra.',
      options: [
        'Số chấm xuất hiện là số lẻ',
        'Số chấm xuất hiện lớn hơn $4$',
        'Số chấm xuất hiện chia hết cho $3$',
        'Số chấm xuất hiện là số nguyên tố',
      ],
      answers: [0, 1, 3],
      hints: ['Thay $5$ vào từng sự kiện và kiểm tra.'],
      solution:
        '$5$ là số lẻ, $5 > 4$ và $5$ là số nguyên tố, nên ba sự kiện đó xảy ra. $5$ không chia hết cho $3$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tung một đồng xu $40$ lần, có $18$ lần xuất hiện mặt ngửa. Tính xác suất thực nghiệm của sự kiện "Đồng xu xuất hiện mặt sấp" (viết dưới dạng phân số tối giản).',
      answer: [11, 20],
      simplest: true,
      hints: [
        'Số lần xuất hiện mặt sấp bằng tổng số lần tung trừ số lần mặt ngửa.',
        'Chia số lần mặt sấp cho $40$ rồi rút gọn.',
      ],
      solution:
        'Mặt sấp xuất hiện $40 - 18 = 22$ lần. Xác suất thực nghiệm: $\\dfrac{22}{40} = \\dfrac{11}{20}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo một con xúc xắc $50$ lần, số lần xuất hiện các mặt $1, 2, 3, 4, 5, 6$ chấm lần lượt là $8, 7, 10, 9, 6, 10$. Tính xác suất thực nghiệm của sự kiện "Số chấm xuất hiện là số chẵn" (viết dưới dạng phân số tối giản).',
      answer: [13, 25],
      simplest: true,
      hints: ['Số chẵn là $2$, $4$, $6$: cộng số lần xuất hiện của ba mặt này.'],
      solution:
        'Sự kiện xảy ra $7 + 9 + 10 = 26$ lần. Xác suất thực nghiệm: $\\dfrac{26}{50} = \\dfrac{13}{25}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một cửa hàng ghi lại: trong $120$ khách vào cửa hàng có $30$ khách mua áo. Tính xác suất thực nghiệm của sự kiện "Khách vào cửa hàng mua áo" (viết dưới dạng phân số tối giản).',
      answer: [1, 4],
      simplest: true,
      hints: ['Mỗi khách vào cửa hàng là một lần thực hiện hoạt động.'],
      solution: '$\\dfrac{30}{120} = \\dfrac{1}{4}$.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Lan tung đồng xu $10$ lần được $7$ lần mặt ngửa; bạn Minh tung $10$ lần được $4$ lần mặt ngửa. Nhận xét nào đúng?',
      options: [
        'Một trong hai bạn đã tính sai vì xác suất thực nghiệm phải giống nhau.',
        'Xác suất thực nghiệm của hai bạn có thể khác nhau; tung càng nhiều lần thì tỉ số càng ổn định.',
        'Đồng xu của Lan chắc chắn bị lệch.',
        'Xác suất thực nghiệm mặt ngửa luôn bằng $\\dfrac{1}{2}$.',
      ],
      answer: 1,
      hints: ['Xác suất thực nghiệm được tính từ kết quả thực tế của từng người.'],
      solution:
        'Lan được $\\dfrac{7}{10}$, Minh được $\\dfrac{4}{10} = \\dfrac{2}{5}$. Xác suất thực nghiệm phụ thuộc vào kết quả từng lần thử nên có thể khác nhau; với số lần thử lớn, tỉ số ít thay đổi hơn.',
    },
  ],
  takeaways: [
    'Dữ liệu là số (số liệu) hoặc không phải là số; dữ liệu phải nằm trong phạm vi hợp lí.',
    'Biểu đồ tranh, biểu đồ cột biểu diễn một bộ dữ liệu; biểu đồ cột kép so sánh hai bộ dữ liệu cùng loại.',
    'Liệt kê đủ các kết quả có thể; một sự kiện xảy ra hay không tùy vào kết quả nhận được.',
    'Xác suất thực nghiệm của $A$: $\\dfrac{n(A)}{n}$, với $n$ là tổng số lần thực hiện.',
  ],
};
