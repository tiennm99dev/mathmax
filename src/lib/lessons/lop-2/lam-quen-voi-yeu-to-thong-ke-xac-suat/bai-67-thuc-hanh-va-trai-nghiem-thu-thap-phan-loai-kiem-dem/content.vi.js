/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành thu thập, phân loại, kiểm đếm số liệu quanh em: đồ vật trong lớp, thời khoá biểu và câu trả lời của các bạn trong tổ.',
  intro:
    'Trong lớp em có mấy cái bàn, mấy cái ghế? Các bạn trong tổ thích màu gì? Hôm nay em làm người đi khảo sát, rồi tự vẽ biểu đồ tranh!',
  objectives: [
    'Đếm đồ vật trong lớp và ghi lại kết quả.',
    'Hỏi các bạn rồi kiểm đếm câu trả lời.',
    'Trình bày kết quả bằng bảng và biểu đồ tranh.',
  ],
  sections: [
    {
      heading: 'Khảo sát là làm gì?',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn câu hỏi. Ví dụ: Bạn thích thời tiết nào?',
            'Hỏi từng bạn và gạch một vạch vào đúng hàng.',
            'Đếm số vạch của mỗi hàng và viết số.',
            'Vẽ biểu đồ tranh và nói kết quả.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Mỗi bạn chỉ trả lời một lần. Số vạch cộng lại phải bằng số bạn em đã hỏi.',
        },
      ],
    },
    {
      heading: 'Em cùng thực hành',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: em tự thu thập số liệu, kiểm đếm rồi nói kết quả cho cả lớp nghe.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: giấy, bút chì, thời khoá biểu của lớp.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đồ vật trong lớp: đếm số bàn, số ghế, số cửa sổ. Ghi vào bảng.',
            'Thời khoá biểu: đếm số tiết Toán, Tiếng Việt, Hoạt động trải nghiệm trong tuần. Môn nào nhiều tiết nhất, môn nào ít tiết nhất?',
            'Hỏi các bạn trong tổ: bạn thích trời nắng, trời mưa hay trời nhiều mây? Kiểm đếm bằng vạch.',
            'Hỏi tiếp: bạn thích màu đỏ, màu vàng hay màu xanh? Kiểm đếm bằng vạch.',
            'Nhập kết quả vào bảng khảo sát trên trang, xem biểu đồ tranh hiện ra.',
          ],
        },
        {
          type: 'p',
          text: 'Kể cho cả lớp: em đã hỏi mấy bạn? Loại nào được chọn nhiều nhất, loại nào ít nhất?',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng khảo sát lớp',
    instruction:
      'Chọn câu hỏi. Mỗi bạn trả lời, em chạm một lần vào ô bạn chọn. Bảng kiểm đếm và biểu đồ tranh tự hiện ra. Chạm "Xem tổ mẫu" để xem một ví dụ.',
  },
  examples: [
    {
      problem:
        'Tổ của Mai có 7 bạn. Có 3 bạn thích trời nắng, 2 bạn thích trời mưa, 2 bạn thích trời nhiều mây. Em kiểm tra và nói kết quả thế nào?',
      steps: [
        'Cộng số bạn: 3 + 2 + 2 = 7. Đúng bằng số bạn trong tổ.',
        'So sánh: 3 lớn nhất.',
        'Hai số 2 bằng nhau.',
      ],
      answer:
        'Trời nắng được nhiều bạn thích nhất. Số bạn thích trời mưa bằng số bạn thích trời nhiều mây.',
    },
    {
      problem:
        'Em kiểm đếm số bạn thích màu xanh được 1 bó 5 vạch và 4 vạch. Có mấy bạn thích màu xanh?',
      steps: ['Một bó là 5 vạch.', 'Đếm thêm: sáu, bảy, tám, chín.'],
      answer: 'Có 9 bạn thích màu xanh.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Thời khoá biểu của lớp Nam: Toán 5 tiết, Tiếng Việt 10 tiết, Hoạt động trải nghiệm 3 tiết. Môn nào nhiều tiết nhất?',
      options: ['Toán', 'Tiếng Việt', 'Hoạt động trải nghiệm'],
      answer: 1,
      hints: ['Em so sánh ba số 5, 10, 3.'],
      solution: '3 < 5 < 10. Tiếng Việt nhiều tiết nhất.',
    },
    {
      type: 'number',
      prompt:
        'Toán 5 tiết, Tiếng Việt 10 tiết, Hoạt động trải nghiệm 3 tiết. Ba môn có tất cả mấy tiết?',
      answer: 18,
      hints: ['Em cộng ba số lại.'],
      solution: '5 + 10 + 3 = 18. Có tất cả 18 tiết.',
    },
    {
      type: 'number',
      prompt: 'Lớp Mai có 14 bạn nam và 17 bạn nữ. Bạn nữ nhiều hơn bạn nam mấy bạn?',
      answer: 3,
      hints: ['Em lấy số lớn trừ số bé.'],
      solution: '17 − 14 = 3. Bạn nữ nhiều hơn bạn nam 3 bạn.',
    },
    {
      type: 'number',
      prompt: 'Lớp Mai có 14 bạn nam và 17 bạn nữ. Lớp Mai có tất cả mấy bạn?',
      answer: 31,
      hints: ['Em cộng số bạn nam và số bạn nữ.'],
      solution: '14 + 17 = 31. Lớp Mai có 31 bạn.',
    },
    {
      type: 'number',
      prompt:
        'Việt kiểm đếm số bạn thích màu đỏ được 1 bó 5 vạch và 1 vạch. Có mấy bạn thích màu đỏ?',
      answer: 6,
      hints: ['Một bó có 5 vạch. Em đếm thêm vạch lẻ.'],
      solution: '5 + 1 = 6. Có 6 bạn thích màu đỏ.',
    },
    {
      type: 'order',
      prompt: 'Em làm khảo sát theo thứ tự nào?',
      items: ['Vẽ biểu đồ tranh', 'Hỏi các bạn', 'Đếm vạch, viết số', 'Gạch vạch vào bảng'],
      answer: [1, 3, 2, 0],
      hints: ['Phải có câu trả lời trước khi đếm.'],
      solution: 'Hỏi các bạn, gạch vạch vào bảng, đếm vạch và viết số, rồi vẽ biểu đồ tranh.',
    },
    {
      type: 'choice',
      prompt: 'Nam hỏi 8 bạn nhưng các vạch cộng lại chỉ có 7. Nam nên làm gì?',
      options: ['Kiểm đếm lại', 'Vẽ biểu đồ luôn', 'Gạch thêm vạch vào hàng nào cũng được'],
      answer: 0,
      hints: ['Số vạch phải bằng số bạn đã hỏi.'],
      solution: 'Có một câu trả lời chưa được ghi, nên Nam phải kiểm đếm lại.',
    },
  ],
  takeaways: [
    'Khảo sát: hỏi hoặc quan sát, phân loại, kiểm đếm, trình bày.',
    'Số vạch cộng lại bằng số bạn đã hỏi.',
    'Bảng và biểu đồ tranh giúp em nói kết quả rõ ràng.',
  ],
};
