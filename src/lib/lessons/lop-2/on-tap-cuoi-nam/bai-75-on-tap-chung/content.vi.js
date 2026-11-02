/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chung cuối năm lớp 2: số đến 1000, phép cộng, trừ, nhân, chia, hình học, đo lường, kiểm đếm và khả năng, với bài kiểm tra chọn câu theo phần còn yếu.',
  intro:
    'Em đã đi hết năm học lớp 2! Hôm nay em ôn lại tất cả: số, phép tính, hình, đo lường và kiểm đếm. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Đọc, viết, so sánh và sắp xếp các số đến 1000.',
    'Đặt tính, tính từ trái sang phải, nhớ bảng nhân và bảng chia 2, 5.',
    'Giải bài toán có lời văn.',
    'Nhận dạng hình, tính độ dài đường gấp khúc, xem giờ, xem lịch, đọc kiểm đếm.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Số và phép tính',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            ['Số có ba chữ số', '525 = 500 + 20 + 5'],
            ['So sánh số', 'Từ hàng trăm, đến hàng chục, rồi hàng đơn vị'],
            ['Đặt tính', 'Thẳng hàng, tính từ phải sang trái'],
            ['Hai dấu phép tính', 'Tính từ trái sang phải'],
            ['Bảng nhân, chia', '5 × 4 = 20, nên 20 : 5 = 4'],
          ],
        },
      ],
    },
    {
      heading: 'Hình, đo lường, kiểm đếm',
      blocks: [
        {
          type: 'list',
          items: [
            'Hình tứ giác có 4 cạnh, 4 đỉnh.',
            'Độ dài đường gấp khúc là tổng các đoạn thẳng.',
            'Kim dài chỉ số 3 là 15 phút, chỉ số 6 là 30 phút.',
            'Cứ 5 vạch kiểm đếm bó lại một bó.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dãy hình lặp lại',
          text: 'Em tìm nhóm hình lặp đi lặp lại, rồi đọc tiếp để biết hình sau đó.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập thông minh',
    instruction:
      'Mỗi bộ có 16 câu. Đầu tiên em làm mỗi phần một câu. Phần nào em làm sai, bài sẽ hỏi thêm phần đó. Bản đồ kĩ năng cho em biết phần nào đã vững, phần nào cần ôn lại.',
  },
  examples: [
    {
      problem: 'Tính: 350 + 42 − 105.',
      steps: ['Tính từ trái sang phải.', '350 + 42 = 392.', '392 − 105 = 287.'],
      answer: '350 + 42 − 105 = 287.',
    },
    {
      problem:
        'Bò A nặng 405 kg, bò C nặng 389 kg. Bò A và bò C cân nặng tất cả bao nhiêu ki-lô-gam?',
      steps: ['Em làm phép cộng.', '405 + 389 = 794.'],
      answer: 'Hai con bò cân nặng tất cả 794 kg.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Viết số: bảy trăm linh bảy.',
      answer: 707,
      hints: ['"Linh" cho biết hàng chục là chữ số 0.'],
      solution: 'Bảy trăm linh bảy viết là 707.',
    },
    {
      type: 'choice',
      prompt: 'Số 458 viết thành tổng nào?',
      options: ['400 + 50 + 8', '400 + 5 + 8', '40 + 50 + 8', '400 + 58 + 8'],
      answer: 0,
      hints: ['458 gồm 4 trăm, 5 chục và 8 đơn vị.'],
      solution: '458 = 400 + 50 + 8.',
    },
    {
      type: 'order',
      prompt: 'Xếp các khối lớp theo số học sinh, từ ít đến nhiều.',
      items: ['Khối Hai: 340', 'Khối Ba: 316', 'Khối Bốn: 295', 'Khối Năm: 306'],
      answer: [2, 3, 1, 0],
      hints: ['Em so sánh chữ số hàng trăm trước.'],
      solution: '295 < 306 < 316 < 340. Thứ tự là Khối Bốn, Khối Năm, Khối Ba, Khối Hai.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 47 + 35 = ?',
      answer: 82,
      hints: ['7 cộng 5 bằng 12, viết 2, nhớ 1.'],
      solution: '47 + 35 = 82.',
    },
    {
      type: 'number',
      prompt: 'Tính: 1000 − 300 + 77 = ?',
      answer: 777,
      hints: ['Tính từ trái sang phải.'],
      solution: '1000 − 300 = 700. 700 + 77 = 777.',
    },
    {
      type: 'number',
      prompt: 'Bò B nặng 392 kg. Bò D nặng 358 kg. Bò B nặng hơn bò D bao nhiêu ki-lô-gam?',
      answer: 34,
      unit: 'kg',
      hints: ['Em lấy số lớn trừ số bé.'],
      solution: '392 − 358 = 34 (kg).',
    },
    {
      type: 'number',
      prompt: 'Bà Năm mua 5 chai nước mắm, mỗi chai 2 l. Bà Năm mua bao nhiêu lít nước mắm?',
      answer: 10,
      unit: 'l',
      hints: ['2 l được lấy 5 lần. Em làm phép nhân.'],
      solution: 'Bà Năm mua số lít nước mắm là: 2 × 5 = 10 (l).',
    },
    {
      type: 'number',
      prompt: 'Vườn A có 345 cây vải. Vườn B ít hơn vườn A 108 cây. Vườn B có bao nhiêu cây vải?',
      answer: 237,
      unit: 'cây',
      hints: ['Ít hơn thì em làm phép trừ.'],
      solution: 'Vườn B có số cây vải là: 345 − 108 = 237 (cây).',
    },
    {
      type: 'choice',
      prompt: '40 : 5 = ?',
      options: ['6', '8', '9'],
      answer: 1,
      hints: ['Em nghĩ: 5 nhân với mấy thì bằng 40?'],
      solution: 'Vì 5 × 8 = 40 nên 40 : 5 = 8.',
    },
    {
      type: 'choice',
      prompt: 'Dãy hình: đỏ, vàng, xanh, đỏ, vàng, xanh, đỏ, ... Hình tiếp theo màu gì?',
      options: ['Đỏ', 'Vàng', 'Xanh'],
      answer: 1,
      hints: ['Em tìm nhóm màu lặp đi lặp lại.'],
      solution: 'Nhóm lặp lại là đỏ, vàng, xanh. Sau đỏ là vàng.',
    },
    {
      type: 'number',
      prompt:
        'Thỏ đi trên đường gấp khúc ABCD. AB dài 9 m, BC dài 5 m, CD dài 38 m. Thỏ đi từ A đến D được bao nhiêu mét?',
      answer: 52,
      unit: 'm',
      hints: ['Em cộng độ dài cả ba đoạn thẳng.'],
      solution: '9 + 5 + 38 = 52 (m).',
    },
    {
      type: 'choice',
      prompt: '18 giờ còn gọi là mấy giờ?',
      options: ['6 giờ chiều', '8 giờ tối', '4 giờ chiều'],
      answer: 0,
      hints: ['Sau 12 giờ trưa, em lấy số giờ trừ đi 12.'],
      solution: '18 − 12 = 6. 18 giờ còn gọi là 6 giờ chiều.',
    },
    {
      type: 'choice',
      prompt: 'Hộp có 5 quả bóng xanh. Lấy 1 quả, không nhìn. Lấy được bóng đỏ là việc thế nào?',
      options: ['Chắc chắn', 'Có thể', 'Không thể'],
      answer: 2,
      hints: ['Trong hộp có bóng đỏ không?'],
      solution: 'Trong hộp không có bóng đỏ, nên không thể lấy được bóng đỏ.',
    },
  ],
  takeaways: [
    'Số có ba chữ số gồm trăm, chục, đơn vị.',
    'Đặt tính thẳng hàng. Hai dấu phép tính thì tính từ trái sang phải.',
    'Độ dài đường gấp khúc là tổng các đoạn thẳng. Xem giờ, xem lịch nhớ kim dài và 7 ngày.',
    'Cứ 5 vạch bó lại một bó. Chắc chắn, có thể, không thể: em nghĩ đến mọi cách.',
  ],
};
