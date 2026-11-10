/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập chung cuối năm lớp 3: so sánh, sắp xếp các số trong phạm vi 100 000, cộng, trừ, nhân, chia, tính giá trị biểu thức, bài toán có lời văn, chu vi và diện tích, đo lường, thời gian, bảng số liệu và khả năng xảy ra.',
  intro:
    'Hình vuông có chu vi 32 cm. Diện tích hình vuông là bao nhiêu? Bài cuối năm ôn lại cả năm học. Bài ôn tập sẽ cho em biết phần nào đã vững nhé!',
  objectives: [
    'So sánh, sắp xếp các số trong phạm vi 100 000.',
    'Đặt tính rồi tính cộng, trừ, nhân, chia; tính giá trị biểu thức.',
    'Giải bài toán có lời văn, bài toán gấp một số lên nhiều lần.',
    'Tính chu vi, diện tích hình chữ nhật, hình vuông.',
    'Tính với số đo khối lượng, tính khoảng thời gian.',
    'Đọc bảng số liệu, nói khả năng xảy ra của một sự kiện.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Số và phép tính',
      blocks: [
        {
          type: 'p',
          text: 'So sánh hai số có năm chữ số: em so sánh từ hàng chục nghìn, rồi đến hàng nghìn, hàng trăm, hàng chục, hàng đơn vị.',
        },
        {
          type: 'p',
          text: 'Đặt tính: viết các chữ số cùng hàng thẳng cột. Cộng, trừ, nhân tính từ phải sang trái. Chia tính từ trái sang phải.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Biểu thức có dấu ngoặc: tính trong ngoặc trước. Có nhân, chia và cộng, trừ: nhân, chia trước, cộng, trừ sau. Chỉ có cộng, trừ hoặc chỉ có nhân, chia: tính từ trái sang phải.',
        },
      ],
    },
    {
      heading: 'Hình học và đo lường',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Chu vi', 'Diện tích'],
          rows: [
            ['Hình chữ nhật', '(dài + rộng) × 2', 'dài × rộng'],
            ['Hình vuông', 'cạnh × 4', 'cạnh × cạnh'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Biết chu vi hình vuông, em tìm cạnh: lấy chu vi chia cho 4.',
        },
        {
          type: 'p',
          text: 'Nam đi từ 6 giờ 5 phút đến 6 giờ 55 phút. Cùng một giờ, em lấy 55 − 5 = 50. Nam đi hết 50 phút.',
        },
      ],
    },
    {
      heading: 'Bảng số liệu và khả năng xảy ra',
      blocks: [
        {
          type: 'p',
          text: 'Đọc bảng số liệu: em tìm hàng và cột của điều cần hỏi, số ở chỗ gặp nhau là câu trả lời.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Khả năng xảy ra của một sự kiện: chắc chắn, có thể hoặc không thể.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập tự chọn câu',
    instruction:
      'Em chạm vào đáp án đúng. Sai lần đầu sẽ có gợi ý. Phần nào em còn sai, bài sẽ hỏi lại nhiều hơn. Bảng màu cho em biết phần nào đã vững.',
  },
  examples: [
    {
      problem:
        'Một cửa hàng văn phòng phẩm ngày thứ Bảy bán được 12 hộp bút chì màu. Ngày Chủ nhật bán được số hộp gấp 3 lần ngày thứ Bảy. Hỏi cả hai ngày cửa hàng bán được bao nhiêu hộp bút chì màu?',
      steps: [
        'Ngày Chủ nhật bán được: 12 × 3 = 36 (hộp).',
        'Cả hai ngày bán được: 12 + 36 = 48 (hộp).',
      ],
      answer: 'Cả hai ngày bán được 48 hộp bút chì màu.',
    },
    {
      problem:
        'Một hình vuông có chu vi 32 cm. a) Tính diện tích hình vuông. b) Hình chữ nhật có chiều rộng bằng cạnh hình vuông, chiều dài gấp 3 lần chiều rộng. Tính chu vi hình chữ nhật.',
      steps: [
        'Cạnh hình vuông là: 32 : 4 = 8 (cm).',
        'Diện tích hình vuông là: 8 × 8 = 64 (cm²).',
        'Chiều dài hình chữ nhật là: 8 × 3 = 24 (cm).',
        'Chu vi hình chữ nhật là: (24 + 8) × 2 = 64 (cm).',
      ],
      answer: 'a) 64 cm². b) 64 cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Số lớn nhất trong các số 53 460; 54 360; 46 530; 53 640 là:',
      options: ['54 360', '53 640', '53 460', '46 530'],
      answer: 0,
      hints: ['Em so sánh chữ số hàng chục nghìn, rồi đến hàng nghìn.'],
      solution:
        'Hàng chục nghìn: 46 530 bé nhất. Ba số còn lại có 5 chục nghìn; so hàng nghìn: 4 > 3. Vậy số lớn nhất là 54 360.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số theo thứ tự từ bé đến lớn.',
      items: ['53 460', '54 360', '46 530', '53 640'],
      answer: [2, 0, 3, 1],
      hints: ['Em tìm số bé nhất trước. Hai số 53 460 và 53 640 khác nhau ở hàng trăm.'],
      solution: 'Từ bé đến lớn: 46 530; 53 460; 53 640; 54 360.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 42 307 + 25 916 = ?',
      answer: 68223,
      hints: ['Em cộng từ hàng đơn vị. Nhớ khi tổng một hàng từ 10 trở lên.'],
      solution:
        '7 + 6 = 13, viết 3 nhớ 1. 0 + 1 + 1 = 2. 3 + 9 = 12, viết 2 nhớ 1. 2 + 5 + 1 = 8. 4 + 2 = 6. Vậy 42 307 + 25 916 = 68 223.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 67 251 − 18 023 = ?',
      answer: 49228,
      hints: ['Em trừ từ hàng đơn vị. 1 không trừ được 3 thì lấy 11 trừ 3, nhớ 1.'],
      solution:
        '11 − 3 = 8, viết 8 nhớ 1. 2 + 1 = 3, 5 − 3 = 2. 2 − 0 = 2. 17 − 8 = 9, viết 9 nhớ 1. 1 + 1 = 2, 6 − 2 = 4. Vậy 67 251 − 18 023 = 49 228.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 3 426 × 3 = ?',
      answer: 10278,
      hints: ['Em nhân từ hàng đơn vị: 3 × 6, rồi 3 × 2 thêm phần nhớ.'],
      solution:
        '3 × 6 = 18, viết 8 nhớ 1. 3 × 2 = 6, thêm 1 bằng 7. 3 × 4 = 12, viết 2 nhớ 1. 3 × 3 = 9, thêm 1 bằng 10. Vậy 3 426 × 3 = 10 278.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 42 580 : 5 = ?',
      answer: 8516,
      hints: ['4 không chia được cho 5, em lấy 42 chia cho 5 trước.'],
      solution:
        '42 : 5 = 8, dư 2. Hạ 5 được 25, 25 : 5 = 5. Hạ 8, 8 : 5 = 1, dư 3. Hạ 0 được 30, 30 : 5 = 6. Vậy 42 580 : 5 = 8 516.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi biểu thức với giá trị của nó.',
      left: ['3 656 + 1 407 − 2 538', '1 306 × 6 : 2', '452 × (766 − 762)', '(543 + 219) : 3'],
      right: ['2 525', '3 918', '1 808', '254', '7 836'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Có dấu ngoặc thì tính trong ngoặc trước. Chỉ có cộng, trừ hoặc chỉ có nhân, chia thì tính từ trái sang phải.',
      ],
      solution:
        '3 656 + 1 407 − 2 538 = 5 063 − 2 538 = 2 525. 1 306 × 6 : 2 = 7 836 : 2 = 3 918. 452 × (766 − 762) = 452 × 4 = 1 808. (543 + 219) : 3 = 762 : 3 = 254.',
    },
    {
      type: 'number',
      prompt:
        'Ngày thứ Bảy cửa hàng bán được 12 hộp bút chì màu. Ngày Chủ nhật bán được số hộp gấp 3 lần ngày thứ Bảy. Cả hai ngày bán được bao nhiêu hộp?',
      answer: 48,
      unit: 'hộp',
      hints: ['Em tìm số hộp bán ngày Chủ nhật trước.', 'Ngày Chủ nhật bán được 12 × 3 hộp.'],
      solution: 'Ngày Chủ nhật: 12 × 3 = 36 (hộp). Cả hai ngày: 12 + 36 = 48 (hộp).',
    },
    {
      type: 'number',
      prompt:
        'Túi đường gồm ba gói 100 g, 200 g và 500 g. Túi muối gồm hai gói 200 g. Đường nặng hơn muối bao nhiêu gam?',
      answer: 400,
      unit: 'g',
      hints: ['Em tính số gam đường và số gam muối trước.'],
      solution:
        'Đường: 100 + 200 + 500 = 800 (g). Muối: 200 + 200 = 400 (g). Đường nặng hơn muối: 800 − 400 = 400 (g).',
    },
    {
      type: 'choice',
      prompt:
        'Núi đi từ nhà lúc 6 giờ 5 phút và đến trường lúc 6 giờ 55 phút. Núi đi từ nhà đến trường hết bao nhiêu phút?',
      options: ['50 phút', '60 phút', '55 phút', '45 phút'],
      answer: 0,
      hints: ['Hai lúc cùng là 6 giờ. Em lấy số phút lúc đến trừ số phút lúc đi.'],
      solution: 'Từ 6 giờ 5 phút đến 6 giờ 55 phút: 55 − 5 = 50 (phút).',
    },
    {
      type: 'number',
      prompt: 'Một hình vuông có chu vi 32 cm. Tính diện tích hình vuông đó.',
      answer: 64,
      unit: 'cm²',
      hints: [
        'Cạnh hình vuông bằng chu vi chia cho 4.',
        'Diện tích hình vuông bằng cạnh nhân cạnh.',
      ],
      solution: 'Cạnh hình vuông: 32 : 4 = 8 (cm). Diện tích: 8 × 8 = 64 (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Hình chữ nhật có chiều rộng 8 cm, chiều dài gấp 3 lần chiều rộng. Tính chu vi hình chữ nhật.',
      answer: 64,
      unit: 'cm',
      hints: ['Em tìm chiều dài trước: 8 × 3.', 'Chu vi bằng (dài + rộng) × 2.'],
      solution: 'Chiều dài: 8 × 3 = 24 (cm). Chu vi: (24 + 8) × 2 = 64 (cm).',
    },
    {
      type: 'choice',
      prompt:
        'Trong hộp có 5 quả bóng đỏ, không có quả bóng nào màu khác. Em lấy ra một quả bóng. Quả bóng lấy ra ... là quả bóng đỏ.',
      options: ['chắc chắn', 'có thể', 'không thể'],
      answer: 0,
      hints: ['Trong hộp có bóng màu nào khác không?'],
      solution: 'Hộp chỉ có bóng đỏ, nên quả bóng lấy ra chắc chắn là quả bóng đỏ.',
    },
  ],
  takeaways: [
    'So sánh số: từ hàng cao nhất (hàng chục nghìn) đến hàng thấp nhất.',
    'Biểu thức: trong ngoặc trước; nhân, chia trước, cộng, trừ sau.',
    'Chu vi hình vuông = cạnh × 4; cạnh = chu vi : 4; diện tích = cạnh × cạnh.',
    'Khả năng xảy ra: chắc chắn, có thể, không thể.',
  ],
};
