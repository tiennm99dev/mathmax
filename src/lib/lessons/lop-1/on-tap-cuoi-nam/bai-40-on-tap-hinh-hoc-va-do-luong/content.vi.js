/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm hình học và đo lường: hình phẳng, hình khối, vị trí, dài hơn và ngắn hơn, đo độ dài bằng xăng-ti-mét, xem giờ đúng và các ngày trong tuần.',
  intro:
    'Em đã học các hình, cách đo độ dài, xem đồng hồ và xem lịch. Hôm nay em ôn lại tất cả. Em làm bài ôn tập để biết phần nào đã vững nhé!',
  objectives: [
    'Nhận ra hình vuông, hình tròn, hình tam giác, hình chữ nhật, khối lập phương và khối hộp chữ nhật.',
    'Nói đúng vị trí: bên trái, bên phải, ở giữa.',
    'So sánh độ dài; đo và tính độ dài với đơn vị xăng-ti-mét.',
    'Xem giờ đúng trên đồng hồ; biết các ngày trong tuần.',
  ],
  sections: [
    {
      heading: 'Hình phẳng và hình khối',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Em nhớ'],
          rows: [
            ['Hình vuông', '4 cạnh dài bằng nhau'],
            ['Hình chữ nhật', '2 cạnh dài, 2 cạnh ngắn'],
            ['Hình tam giác', '3 cạnh'],
            ['Hình tròn', 'không có cạnh'],
          ],
        },
        {
          type: 'p',
          text: 'Con xúc xắc có dạng khối lập phương. Hộp sữa có dạng khối hộp chữ nhật.',
        },
      ],
    },
    {
      heading: 'Đo độ dài',
      blocks: [
        {
          type: 'p',
          text: 'Xăng-ti-mét là đơn vị đo độ dài. Xăng-ti-mét viết tắt là cm.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đo bằng thước',
          text: 'Em đặt một đầu của vật ở vạch 0. Đầu kia chỉ vạch số mấy thì vật dài bấy nhiêu xăng-ti-mét.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tính với cm',
          text: 'Em tính như với số, rồi viết cm sau kết quả: 6 cm + 3 cm = 9 cm.',
        },
      ],
    },
    {
      heading: 'Giờ và lịch',
      blocks: [
        {
          type: 'p',
          text: 'Lúc giờ đúng, kim dài chỉ số 12, kim ngắn chỉ số giờ. Kim ngắn chỉ số 8: đồng hồ chỉ 8 giờ.',
        },
        {
          type: 'p',
          text: 'Một tuần lễ có 7 ngày: thứ Hai, thứ Ba, thứ Tư, thứ Năm, thứ Sáu, thứ Bảy, Chủ nhật.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập thông minh',
    instruction:
      'Mỗi bộ có 14 câu về hình, độ dài, đồng hồ và các ngày trong tuần. Đầu tiên em làm thử mỗi phần một câu. Phần nào em làm sai, bài sẽ hỏi thêm phần đó. Bản đồ kĩ năng cho em biết phần nào cần ôn lại.',
  },
  examples: [
    {
      problem:
        'Đặt bút chì lên thước: một đầu ở vạch 0, đầu kia ở vạch 7. Bút chì dài mấy xăng-ti-mét?',
      steps: ['Một đầu bút chì ở vạch 0.', 'Đầu kia chỉ vạch số 7.'],
      answer: 'Bút chì dài 7 cm.',
    },
    {
      problem: 'Hôm nay là thứ Sáu. Ngày mai là thứ mấy?',
      steps: [
        'Ngày mai là ngày ngay sau hôm nay.',
        'Các ngày: ..., thứ Năm, thứ Sáu, thứ Bảy, ...',
        'Ngay sau thứ Sáu là thứ Bảy.',
      ],
      answer: 'Ngày mai là thứ Bảy.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hình nào có 3 cạnh?',
      options: ['Hình vuông', 'Hình tam giác', 'Hình tròn'],
      answer: 1,
      hints: ['Em đếm số cạnh của từng hình.'],
      solution: 'Hình tam giác có 3 cạnh.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đồ vật với hình của nó.',
      left: ['Mặt đồng hồ', 'Thước ê ke', 'Viên gạch hoa', 'Bìa quyển vở'],
      right: ['Hình tròn', 'Hình tam giác', 'Hình vuông', 'Hình chữ nhật'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Đồ vật nào tròn, không có cạnh?', 'Đồ vật nào có 3 cạnh?'],
      solution:
        'Mặt đồng hồ: hình tròn. Thước ê ke: hình tam giác. Viên gạch hoa: hình vuông. Bìa quyển vở: hình chữ nhật.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các đồ vật có dạng khối hộp chữ nhật.',
      options: ['Hộp sữa', 'Con xúc xắc', 'Viên gạch', 'Cái tủ', 'Quả bóng'],
      answers: [0, 2, 3],
      hints: [
        'Khối lập phương có 6 mặt là hình vuông to bằng nhau.',
        'Quả bóng tròn, không có mặt phẳng.',
      ],
      solution:
        'Hộp sữa, viên gạch và cái tủ có dạng khối hộp chữ nhật. Con xúc xắc có dạng khối lập phương. Quả bóng không phải khối hộp chữ nhật.',
    },
    {
      type: 'choice',
      prompt:
        'Từ trái sang phải có: con mèo, con thỏ, con gà con. Con nào ở ngay bên trái con thỏ?',
      options: ['Con mèo', 'Con thỏ', 'Con gà con'],
      answer: 0,
      hints: ['Em tìm con thỏ trước, rồi nhìn sang phía tay trái.'],
      solution: 'Con mèo ở ngay bên trái con thỏ. Con gà con ở bên phải con thỏ.',
    },
    {
      type: 'choice',
      prompt: 'Bạn Nam cao hơn bạn Mai. Bạn nào thấp hơn?',
      options: ['Bạn Nam', 'Bạn Mai'],
      answer: 1,
      hints: ['Nam cao hơn Mai, vậy Mai thế nào so với Nam?'],
      solution: 'Bạn Nam cao hơn bạn Mai, nên bạn Mai thấp hơn bạn Nam.',
    },
    {
      type: 'order',
      prompt: 'Xếp các vật theo thứ tự từ ngắn đến dài.',
      items: ['Bút chì dài 9 cm', 'Ruy băng dài 12 cm', 'Ống hút dài 7 cm'],
      answer: [2, 0, 1],
      hints: ['So sánh các số 9, 12 và 7.'],
      solution: '7 cm < 9 cm < 12 cm. Từ ngắn đến dài: ống hút, bút chì, ruy băng.',
    },
    {
      type: 'choice',
      prompt: 'Một đầu cục tẩy ở vạch 0, đầu kia ở vạch 4. Cục tẩy dài mấy xăng-ti-mét?',
      options: ['3 cm', '4 cm', '5 cm'],
      answer: 1,
      hints: ['Đầu kia chỉ vạch số mấy?'],
      solution: 'Một đầu ở vạch 0, đầu kia ở vạch 4. Cục tẩy dài 4 cm.',
    },
    {
      type: 'choice',
      prompt: '7 cm + 2 cm = ?',
      options: ['5 cm', '9 cm', '10 cm'],
      answer: 1,
      hints: ['Em tính 7 + 2, rồi viết cm sau kết quả.'],
      solution: '7 + 2 = 9, nên 7 cm + 2 cm = 9 cm.',
    },
    {
      type: 'choice',
      prompt: '15 cm − 4 cm = ?',
      options: ['11 cm', '19 cm', '10 cm'],
      answer: 0,
      hints: ['Em tính 15 − 4, rồi viết cm sau kết quả.'],
      solution: '15 − 4 = 11, nên 15 cm − 4 cm = 11 cm.',
    },
    {
      type: 'choice',
      prompt: 'Kim ngắn chỉ số 5, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?',
      options: ['12 giờ', '5 giờ', '6 giờ'],
      answer: 1,
      hints: ['Kim dài chỉ số 12 là giờ đúng. Kim ngắn chỉ giờ.'],
      solution: 'Kim ngắn chỉ số 5, kim dài chỉ số 12. Đồng hồ chỉ 5 giờ.',
    },
    {
      type: 'choice',
      prompt: 'Hôm nay là thứ Năm. Ngày mai là thứ mấy?',
      options: ['Thứ Tư', 'Thứ Sáu', 'Thứ Bảy'],
      answer: 1,
      hints: ['Ngày mai là ngày ngay sau hôm nay.'],
      solution: 'Ngay sau thứ Năm là thứ Sáu. Ngày mai là thứ Sáu.',
    },
    {
      type: 'order',
      prompt: 'Xếp các ngày theo thứ tự trong một tuần, bắt đầu từ thứ Hai.',
      items: ['Thứ Tư', 'Thứ Hai', 'Chủ nhật', 'Thứ Ba'],
      answer: [1, 3, 0, 2],
      hints: ['Tuần mới bắt đầu từ thứ Hai.', 'Chủ nhật là ngày cuối tuần.'],
      solution: 'Thứ tự: thứ Hai, thứ Ba, thứ Tư, Chủ nhật.',
    },
    {
      type: 'choice',
      prompt: 'Một tuần lễ có mấy ngày?',
      options: ['5', '7', '10'],
      answer: 1,
      hints: ['Em đếm: thứ Hai, thứ Ba, ... cho đến Chủ nhật.'],
      solution:
        'Thứ Hai, thứ Ba, thứ Tư, thứ Năm, thứ Sáu, thứ Bảy, Chủ nhật: một tuần lễ có 7 ngày.',
    },
  ],
  takeaways: [
    'Em gọi tên được bốn hình phẳng và hai hình khối đã học.',
    'Đo độ dài: đặt một đầu ở vạch 0, đọc số ở đầu kia. Đơn vị là xăng-ti-mét (cm).',
    'Giờ đúng: kim dài chỉ số 12. Một tuần lễ có 7 ngày.',
  ],
};
