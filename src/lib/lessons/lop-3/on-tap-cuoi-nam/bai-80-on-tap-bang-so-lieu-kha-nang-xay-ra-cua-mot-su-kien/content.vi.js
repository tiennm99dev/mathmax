/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập bảng số liệu và khả năng xảy ra của một sự kiện: đọc bảng, tìm nhiều nhất, ít nhất, tính từ số liệu, và dùng các từ chắc chắn, có thể, không thể.',
  intro:
    'Thư viện ghi lại số học sinh đến đọc sách mỗi buổi trong tuần. Ngày nào đông nhất? Nhà ảo thuật lấy 2 con thỏ từ chiếc mũ, đó có thể là những con nào? Hôm nay em cùng ôn tập nhé!',
  objectives: [
    'Đọc bảng số liệu: mỗi hàng, mỗi cột cho biết gì.',
    'Tìm loại nhiều nhất, ít nhất; tính tổng, hiệu từ số liệu.',
    'Dùng đúng các từ chắc chắn, có thể, không thể.',
    'Kể ra các sự kiện có thể xảy ra khi lấy đồ vật, gieo xúc xắc, tung đồng xu.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Bảng số liệu',
      blocks: [
        {
          type: 'table',
          caption: 'Số học sinh đến thư viện trong một tuần',
          head: ['Buổi', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'],
          rows: [
            ['Sáng', '45', '35', '50', '40', '55'],
            ['Chiều', '60', '40', '35', '60', '65'],
          ],
        },
        {
          type: 'p',
          text: 'Mỗi cột cho biết số học sinh đến thư viện trong một ngày. Mỗi hàng cho biết số học sinh đến vào một buổi.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách đọc',
          text: 'Muốn biết sáng thứ Ba có bao nhiêu bạn, em tìm cột Thứ Ba, rồi dóng sang hàng Sáng: 35 bạn.',
        },
      ],
    },
    {
      heading: 'Chắc chắn, có thể, không thể',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Chắc chắn: lần nào cũng xảy ra. Có thể: có lúc xảy ra, có lúc không. Không thể: không bao giờ xảy ra.',
        },
        {
          type: 'table',
          head: ['Trong hộp có 3 bóng đỏ, 2 bóng xanh. Lấy 1 quả', 'Khả năng'],
          rows: [
            ['Lấy được bóng đỏ', 'Có thể'],
            ['Lấy được bóng vàng', 'Không thể'],
            ['Lấy được bóng đỏ hoặc bóng xanh', 'Chắc chắn'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn biết một sự kiện có thể xảy ra không, em xem trong hộp, trên xúc xắc, trên đồng xu có những gì.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Em đọc bảng hoặc nhìn hộp bóng, rồi chạm vào đáp án đúng. Sai lần đầu sẽ có gợi ý. Phần nào em còn sai, bài sẽ hỏi lại nhiều hơn.',
  },
  examples: [
    {
      problem:
        'Đọc bảng số học sinh đến thư viện. Buổi chiều ngày nào có nhiều học sinh đến thư viện nhất?',
      steps: ['Hàng Chiều có các số: 60, 40, 35, 60, 65.', 'Số lớn nhất là 65, ở cột Thứ Sáu.'],
      answer: 'Chiều thứ Sáu có nhiều học sinh đến thư viện nhất (65 bạn).',
    },
    {
      problem:
        'Trong chiếc mũ ảo thuật có 2 con thỏ trắng và 1 con thỏ nâu. Nhà ảo thuật lấy cùng một lúc 2 con thỏ. Những sự kiện nào có thể xảy ra?',
      steps: [
        'Có 2 con thỏ trắng, nên có thể lấy được 2 con thỏ trắng.',
        'Cũng có thể lấy được 1 con thỏ trắng và 1 con thỏ nâu.',
        'Chỉ có 1 con thỏ nâu, nên không thể lấy được 2 con thỏ nâu.',
      ],
      answer: 'Có thể lấy được 2 con thỏ trắng, hoặc 1 con thỏ trắng và 1 con thỏ nâu.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Xem bảng số học sinh đến thư viện. Buổi sáng thứ Ba có bao nhiêu học sinh đến thư viện?',
      answer: 35,
      hints: ['Em tìm cột Thứ Ba, rồi dóng sang hàng Sáng.'],
      solution: 'Ở cột Thứ Ba, hàng Sáng ghi 35. Có 35 học sinh.',
    },
    {
      type: 'number',
      prompt: 'Xem bảng số học sinh đến thư viện. Buổi chiều thứ Sáu có bao nhiêu học sinh?',
      answer: 65,
      hints: ['Em tìm cột Thứ Sáu, rồi dóng sang hàng Chiều.'],
      solution: 'Ở cột Thứ Sáu, hàng Chiều ghi 65. Có 65 học sinh.',
    },
    {
      type: 'choice',
      prompt:
        'Xem bảng số học sinh đến thư viện. Buổi chiều ngày nào có ít học sinh đến thư viện nhất?',
      options: ['Thứ Tư', 'Thứ Ba', 'Thứ Hai', 'Thứ Năm'],
      answer: 0,
      hints: ['Em đọc các số ở hàng Chiều, rồi tìm số bé nhất.'],
      solution: 'Hàng Chiều: 60, 40, 35, 60, 65. Số bé nhất là 35, ở cột Thứ Tư.',
    },
    {
      type: 'number',
      prompt:
        'Xem bảng số học sinh đến thư viện. Cả buổi sáng và buổi chiều thứ Hai có bao nhiêu học sinh?',
      answer: 105,
      hints: ['Em cộng số học sinh của hai buổi thứ Hai.'],
      solution: 'Sáng thứ Hai có 45 bạn, chiều thứ Hai có 60 bạn. 45 + 60 = 105 (học sinh).',
    },
    {
      type: 'number',
      prompt:
        'Xem bảng số học sinh đến thư viện. Ngày thứ Năm, buổi chiều có nhiều hơn buổi sáng bao nhiêu học sinh?',
      answer: 20,
      hints: ['Em lấy số học sinh buổi chiều trừ số học sinh buổi sáng.'],
      solution: 'Chiều thứ Năm có 60 bạn, sáng thứ Năm có 40 bạn. 60 − 40 = 20 (học sinh).',
    },
    {
      type: 'number',
      prompt:
        'Trong tuần, Việt tiết kiệm được 2 tờ 5 000 đồng và 1 tờ 10 000 đồng. Việt tiết kiệm được bao nhiêu tiền?',
      answer: 20000,
      unit: 'đồng',
      hints: ['Em tính tiền 2 tờ 5 000 đồng trước.'],
      solution: '5 000 × 2 + 10 000 = 20 000 (đồng).',
    },
    {
      type: 'number',
      prompt:
        'Trong tuần, Mai tiết kiệm được 5 tờ 1 000 đồng và 5 tờ 2 000 đồng. Mai tiết kiệm được bao nhiêu tiền?',
      answer: 15000,
      unit: 'đồng',
      hints: ['Em tính tiền mỗi loại tờ tiền, rồi cộng lại.'],
      solution: '1 000 × 5 + 2 000 × 5 = 5 000 + 10 000 = 15 000 (đồng).',
    },
    {
      type: 'choice',
      prompt:
        'Nam tiết kiệm được 10 000 đồng, Việt 20 000 đồng, Mai 15 000 đồng. Bạn nào chưa đủ tiền mua quyển truyện giá 13 000 đồng?',
      options: ['Nam', 'Việt', 'Mai'],
      answer: 0,
      hints: ['Em so sánh số tiền của mỗi bạn với 13 000 đồng.'],
      solution:
        '10 000 < 13 000, nên Nam chưa đủ tiền. Việt (20 000 đồng) và Mai (15 000 đồng) đều đủ tiền.',
    },
    {
      type: 'choice',
      prompt: 'Hộp có 3 quả bóng đỏ và 2 quả bóng xanh. Lấy ra 1 quả. Lấy được bóng vàng là:',
      options: ['Chắc chắn', 'Có thể', 'Không thể'],
      answer: 2,
      hints: ['Trong hộp có quả bóng vàng nào không?'],
      solution: 'Hộp không có bóng vàng, nên không thể lấy được bóng vàng.',
    },
    {
      type: 'choice',
      prompt: 'Hộp có 4 quả bóng, quả nào cũng màu đỏ. Lấy ra 1 quả. Lấy được bóng đỏ là:',
      options: ['Chắc chắn', 'Có thể', 'Không thể'],
      answer: 0,
      hints: ['Trong hộp có bóng màu nào khác không?'],
      solution: 'Hộp chỉ có bóng đỏ, nên chắc chắn lấy được bóng đỏ.',
    },
    {
      type: 'multi',
      prompt:
        'Mũ ảo thuật có 2 con thỏ trắng và 1 con thỏ nâu. Lấy cùng một lúc 2 con thỏ. Những sự kiện nào có thể xảy ra?',
      options: [
        'Lấy được 2 con thỏ trắng',
        'Lấy được 1 con thỏ trắng và 1 con thỏ nâu',
        'Lấy được 2 con thỏ nâu',
      ],
      answers: [0, 1],
      hints: ['Trong mũ có mấy con thỏ nâu?'],
      solution:
        'Có thể lấy được 2 con thỏ trắng, hoặc 1 con thỏ trắng và 1 con thỏ nâu. Chỉ có 1 con thỏ nâu, nên không thể lấy được 2 con thỏ nâu.',
    },
    {
      type: 'choice',
      prompt:
        'Rô-bốt gói ba hộp quà giống nhau: một tháp vòng, một quả bóng, một khối rubik. Mai chọn một hộp. Mai nhận được quả bóng là:',
      options: ['Chắc chắn', 'Có thể', 'Không thể'],
      answer: 1,
      hints: ['Mai có biết trước hộp nào đựng quả bóng không?'],
      solution:
        'Mai có thể nhận được quả bóng, cũng có thể nhận được tháp vòng hoặc khối rubik. Vậy Mai có thể nhận được quả bóng.',
    },
    {
      type: 'match',
      prompt: 'Gieo một con xúc xắc. Nối mỗi sự kiện với khả năng xảy ra của nó.',
      left: ['Mặt trên có 7 chấm', 'Mặt trên có 3 chấm', 'Mặt trên có số chấm bé hơn 7'],
      right: ['Không thể', 'Có thể', 'Chắc chắn'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Xúc xắc có 6 mặt: 1, 2, 3, 4, 5, 6 chấm.'],
      solution:
        'Không có mặt 7 chấm: không thể. Mặt 3 chấm là một trong 6 mặt: có thể. Mặt nào cũng có từ 1 đến 6 chấm, bé hơn 7: chắc chắn.',
    },
  ],
  takeaways: [
    'Bảng số liệu: tìm cột, rồi dóng sang hàng để đọc số.',
    'Chắc chắn: lần nào cũng xảy ra. Có thể: có lúc xảy ra, có lúc không. Không thể: không bao giờ xảy ra.',
  ],
};
