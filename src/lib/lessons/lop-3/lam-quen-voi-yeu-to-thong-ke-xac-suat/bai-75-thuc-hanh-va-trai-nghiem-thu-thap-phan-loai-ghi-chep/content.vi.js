/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành khảo sát các bạn trong lớp: chọn câu hỏi, thu thập và phân loại câu trả lời, ghi chép vào bảng số liệu rồi đọc bảng để nói kết quả.',
  intro:
    'Lớp em sắp đi tham quan. Đi đâu, mấy giờ xuất phát, mặc áo màu gì? Em hãy hỏi các bạn, ghi vào bảng số liệu và cùng cả lớp quyết định nhé!',
  objectives: [
    'Tự thu thập số liệu bằng cách hỏi các bạn.',
    'Phân loại câu trả lời và ghi vào bảng số liệu.',
    'Đọc bảng số liệu và nói kết quả cho cả lớp.',
  ],
  sections: [
    {
      heading: 'Các bước khảo sát',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn câu hỏi và các lựa chọn. Ví dụ: Bạn muốn đi tham quan ở đâu?',
            'Hỏi từng bạn. Mỗi câu trả lời, em gạch một vạch vào đúng lựa chọn.',
            'Đếm số vạch, ghi số vào bảng số liệu.',
            'Đọc bảng: lựa chọn nào nhiều bạn chọn nhất, ít bạn chọn nhất?',
          ],
        },
        {
          type: 'table',
          caption: 'Nơi lớp 3B muốn đi tham quan',
          head: ['Nơi tham quan', 'Vườn thú', 'Bảo tàng', 'Công viên nước'],
          rows: [['Số bạn', '12', '7', '15']],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kiểm tra lại',
          text: 'Mỗi bạn chỉ trả lời một lần. Cộng các số trong bảng phải bằng số bạn em đã hỏi.',
        },
      ],
    },
    {
      heading: 'Em cùng thực hành',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: cả lớp chuẩn bị cho chuyến tham quan bằng bảng số liệu do chính các em lập.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: giấy, bút chì, thước kẻ để kẻ bảng.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Nơi tham quan: hỏi mỗi bạn muốn đi vườn thú, bảo tàng hay công viên nước.',
            'Giờ xuất phát: hỏi mỗi bạn muốn đi lúc 7 giờ, 7 giờ 30 phút hay 8 giờ.',
            'Món ăn mang theo và màu áo: hỏi tiếp, ghi riêng từng câu hỏi.',
            'Về nhà: hỏi các bạn trong tổ nhà bạn nuôi con vật gì, rồi lập bảng số liệu.',
            'Nhập kết quả vào phiếu khảo sát trên trang để kiểm tra bảng của em.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo với cả lớp: em đã hỏi bao nhiêu bạn? Lựa chọn nào nhiều nhất, ít nhất? Nhiều hơn bao nhiêu bạn? Lớp nên chọn gì?',
        },
      ],
    },
  ],
  explore: {
    title: 'Phiếu khảo sát lớp',
    instruction:
      'Chọn câu hỏi khảo sát. Mỗi bạn trả lời, em bấm + ở lựa chọn của bạn đó, hoặc gõ số đã đếm vào ô. Bảng số liệu và lời nhận xét tự hiện ra. Bấm "Xem lớp mẫu" để xem một ví dụ.',
  },
  examples: [
    {
      problem:
        'Lớp 3B có 34 bạn. Kết quả khảo sát: vườn thú 12 bạn, bảo tàng 7 bạn, công viên nước 15 bạn. Em đọc bảng và nói kết quả.',
      steps: [
        'Kiểm tra: 12 + 7 + 15 = 34, đúng bằng số bạn trong lớp.',
        'So sánh: 15 lớn nhất, 7 bé nhất.',
        'Nhiều hơn: 15 − 7 = 8.',
      ],
      answer:
        'Công viên nước được chọn nhiều nhất, bảo tàng ít nhất. Số bạn chọn công viên nước nhiều hơn số bạn chọn bảo tàng 8 bạn.',
    },
    {
      problem:
        'Giờ xuất phát: 7 giờ có 10 bạn chọn, 7 giờ 30 phút có 16 bạn chọn, 8 giờ có 8 bạn chọn. Lớp nên xuất phát lúc mấy giờ?',
      steps: ['So sánh ba số 10, 16, 8.', 'Số lớn nhất là 16, ở cột 7 giờ 30 phút.'],
      answer: 'Nhiều bạn chọn nhất là 7 giờ 30 phút, nên lớp xuất phát lúc 7 giờ 30 phút.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Bảng số liệu vật nuôi của tổ: Chó 13, Mèo 8, Gà 6, Cá 4. Con vật nào được nuôi nhiều nhất?',
      options: ['Chó', 'Mèo', 'Gà', 'Cá'],
      answer: 0,
      hints: ['Em tìm số lớn nhất trong bốn số 13, 8, 6, 4.'],
      solution: 'Số lớn nhất là 13, ở cột Chó. Chó được nuôi nhiều nhất.',
    },
    {
      type: 'number',
      prompt:
        'Bảng số liệu vật nuôi: Chó 13, Mèo 8, Gà 6, Cá 4. Cộng tất cả các số trong bảng được bao nhiêu?',
      answer: 31,
      hints: ['Em cộng lần lượt: 13 + 8 trước.', '13 + 8 = 21, rồi cộng tiếp 6 và 4.'],
      solution: '13 + 8 + 6 + 4 = 31.',
    },
    {
      type: 'number',
      prompt:
        'Có 13 bạn nuôi chó và 8 bạn nuôi mèo. Số bạn nuôi chó nhiều hơn số bạn nuôi mèo bao nhiêu bạn?',
      answer: 5,
      unit: 'bạn',
      hints: ['Nhiều hơn bao nhiêu: lấy số lớn trừ số bé.'],
      solution: '13 − 8 = 5. Nhiều hơn 5 bạn.',
    },
    {
      type: 'order',
      prompt:
        'Khảo sát món ăn sáng: Phở 11 bạn, Bánh mì 9 bạn, Xôi 8 bạn, Cháo 5 bạn. Xếp các món theo số bạn chọn, từ nhiều đến ít.',
      items: ['Xôi', 'Phở', 'Cháo', 'Bánh mì'],
      answer: [1, 3, 0, 2],
      hints: ['Món nào có số bạn lớn nhất thì đứng đầu.'],
      solution: '11 > 9 > 8 > 5. Thứ tự: Phở, Bánh mì, Xôi, Cháo.',
    },
    {
      type: 'choice',
      prompt:
        'Tổ 1 có 8 bạn. Em hỏi mỗi bạn một lần: "Bạn thích màu áo nào?". Cộng các số trong bảng của tổ 1 phải được bao nhiêu?',
      options: ['8', '1', '4', '16'],
      answer: 0,
      hints: ['Mỗi bạn trả lời một lần, tức là ghi một lần vào bảng.'],
      solution: 'Mỗi bạn được ghi đúng một lần, nên các số trong bảng cộng lại bằng 8.',
    },
    {
      type: 'choice',
      prompt:
        'Khảo sát màu áo: Đỏ 9 bạn, Vàng 6 bạn, Xanh 10 bạn, Trắng 7 bạn. Lớp chọn màu áo được nhiều bạn thích nhất. Đó là màu nào?',
      options: ['Xanh', 'Đỏ', 'Trắng', 'Vàng'],
      answer: 0,
      hints: ['Em so sánh bốn số 9, 6, 10, 7.'],
      solution: 'Số lớn nhất là 10, ở cột Xanh. Lớp chọn áo màu xanh.',
    },
    {
      type: 'match',
      prompt:
        'Bảng giờ xuất phát: 7 giờ có 10 bạn, 7 giờ 30 phút có 16 bạn, 8 giờ có 8 bạn. Nối mỗi giờ với số bạn chọn.',
      left: ['7 giờ', '7 giờ 30 phút', '8 giờ'],
      right: ['8 bạn', '10 bạn', '16 bạn'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Em đọc số ghi dưới cột của từng giờ.'],
      solution: '7 giờ: 10 bạn. 7 giờ 30 phút: 16 bạn. 8 giờ: 8 bạn.',
    },
  ],
  takeaways: [
    'Khảo sát: chọn câu hỏi, hỏi từng bạn, kiểm đếm, ghi vào bảng số liệu.',
    'Mỗi bạn trả lời một lần: tổng các số bằng số bạn được hỏi.',
    'Đọc bảng để biết lựa chọn nhiều nhất, ít nhất và nhiều hơn bao nhiêu.',
  ],
};
