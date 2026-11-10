/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Ôn tập và bổ sung: đọc, viết, so sánh và làm tròn số đến 100 000, số chẵn và số lẻ, đặt tính rồi tính, thử lại phép chia, tính giá trị biểu thức chứa chữ và giải bài toán có hai, ba bước tính.',
  intro:
    'Em đã ôn các số đến 100 000, bốn phép tính, số chẵn, số lẻ, biểu thức chứa chữ và bài toán ba bước tính. Giờ em luyện tập tất cả nhé!',
  objectives: [
    'So sánh, sắp xếp và làm tròn các số đến 100 000.',
    'Nhận biết số chẵn, số lẻ.',
    'Đặt tính rồi tính cộng, trừ, nhân, chia và thử lại.',
    'Tính giá trị của biểu thức chứa chữ.',
    'Giải bài toán thực tế có hai, ba bước tính.',
  ],
  sections: [
    {
      heading: 'Số và làm tròn số',
      blocks: [
        {
          type: 'p',
          text: 'Muốn so sánh hai số, em đếm chữ số trước. Số nhiều chữ số hơn thì lớn hơn.',
        },
        {
          type: 'p',
          text: 'Nếu cùng số chữ số, em so sánh từng hàng, từ trái sang phải: 63 794 < 65 237 vì 3 < 5 ở hàng nghìn.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Làm tròn đến hàng nghìn: em nhìn chữ số hàng trăm. Bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
        },
        {
          type: 'table',
          head: ['Số', 'Làm tròn đến hàng nghìn', 'Làm tròn đến hàng chục nghìn'],
          rows: [
            ['59 872', '60 000', '60 000'],
            ['66 053', '66 000', '70 000'],
          ],
        },
      ],
    },
    {
      heading: 'Số chẵn, số lẻ',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Số có chữ số tận cùng là 0, 2, 4, 6, 8 là số chẵn. Số có chữ số tận cùng là 1, 3, 5, 7, 9 là số lẻ.',
        },
        { type: 'p', text: '63 794 là số chẵn. 65 237 là số lẻ.' },
      ],
    },
    {
      heading: 'Phép tính và biểu thức',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          text: 'Em thử lại phép chia có dư: lấy thương nhân với số chia, rồi cộng số dư. Kết quả phải bằng số bị chia.',
        },
        { type: 'p', text: '56 732 : 8 = 7 091 (dư 4). Thử lại: 7 091 × 8 + 4 = 56 732.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Biểu thức chứa chữ: em thay chữ bằng số, rồi tính. Có ngoặc thì tính trong ngoặc trước. Có nhân, chia thì tính nhân, chia trước, cộng, trừ sau.',
        },
        {
          type: 'p',
          text: 'Với c = 2 370, m = 105, n = 6 thì c + m × n = 2 370 + 105 × 6 = 2 370 + 630 = 3 000.',
        },
      ],
    },
    {
      heading: 'Giải bài toán',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Đọc đề: bài toán cho biết gì, hỏi gì?',
            'Tìm xem cần biết số nào trước.',
            'Giải từng bước, mỗi bước có câu lời giải và phép tính.',
            'Viết đáp số.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Mỗi câu em chạm vào đáp án đúng. Nếu sai, em đọc gợi ý rồi thử lại. Làm xong, em xem phần nào cần ôn và bấm "Làm bộ bài khác" để luyện tiếp.',
  },
  examples: [
    {
      problem:
        'Mai mua 1 cái bút và 5 quyển vở. Giá một cái bút là 8 500 đồng, giá một quyển vở là 6 500 đồng. Mai đưa cô bán hàng tờ 50 000 đồng. Hỏi cô bán hàng trả lại Mai bao nhiêu tiền?',
      steps: [
        'Mua 5 quyển vở hết số tiền là: 6 500 × 5 = 32 500 (đồng).',
        'Mai phải trả tất cả số tiền là: 8 500 + 32 500 = 41 000 (đồng).',
        'Cô bán hàng trả lại Mai số tiền là: 50 000 − 41 000 = 9 000 (đồng).',
      ],
      answer: 'Đáp số: 9 000 đồng.',
    },
    {
      problem: 'Tính giá trị của biểu thức (13 640 − 5 537) × 8.',
      steps: [
        'Em tính trong ngoặc trước: 13 640 − 5 537 = 8 103.',
        'Rồi em tính: 8 103 × 8 = 64 824.',
      ],
      answer: '(13 640 − 5 537) × 8 = 64 824.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt: 'Cho các số 65 237; 63 794; 66 053; 59 872. Chọn tất cả các số chẵn.',
      options: ['65 237', '63 794', '66 053', '59 872'],
      answers: [1, 3],
      hints: ['Em nhìn chữ số tận cùng của mỗi số.', 'Số chẵn tận cùng là 0, 2, 4, 6 hoặc 8.'],
      solution:
        '63 794 tận cùng là 4, 59 872 tận cùng là 2: đó là hai số chẵn. 65 237 tận cùng là 7, 66 053 tận cùng là 3: đó là số lẻ.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số 65 237; 63 794; 66 053; 59 872 theo thứ tự từ bé đến lớn.',
      items: ['65 237', '63 794', '66 053', '59 872'],
      answer: [3, 1, 0, 2],
      hints: [
        'Em so sánh chữ số hàng chục nghìn trước: số nào có chữ số 5?',
        'Ba số còn lại cùng có 6 chục nghìn: em so sánh tiếp chữ số hàng nghìn.',
      ],
      solution:
        '59 872 có 5 chục nghìn nên bé nhất. Ba số còn lại có hàng nghìn là 3, 5, 6. Thứ tự từ bé đến lớn: 59 872; 63 794; 65 237; 66 053.',
    },
    {
      type: 'choice',
      prompt: 'Làm tròn số 66 053 đến hàng chục nghìn được số nào?',
      options: ['70 000', '60 000', '66 000'],
      answer: 0,
      hints: ['Em nhìn chữ số hàng nghìn của 66 053.', 'Chữ số đó bé hơn 5 hay từ 5 trở lên?'],
      solution:
        'Chữ số hàng nghìn là 6, mà 6 ≥ 5 nên làm tròn lên. Làm tròn 66 053 đến hàng chục nghìn được 70 000.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn số 59 872 đến hàng nghìn, em được số nào?',
      answer: 60000,
      hints: ['Em nhìn chữ số hàng trăm của 59 872.', 'Chữ số hàng trăm là 8, lớn hơn 5.'],
      solution:
        'Chữ số hàng trăm là 8, mà 8 ≥ 5 nên làm tròn lên: 59 nghìn thành 60 nghìn. Làm tròn 59 872 đến hàng nghìn được 60 000.',
    },
    {
      type: 'match',
      prompt: 'Đặt tính rồi tính. Nối mỗi phép tính với kết quả của nó.',
      left: ['63 758 − 5 364', '37 429 + 49 235', '8 107 × 9', '43 652 : 7'],
      right: ['58 394', '86 664', '72 963', '6 236'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Em đặt tính thẳng hàng, rồi tính từ hàng đơn vị (phép chia thì tính từ hàng cao nhất).',
        'Em có thể thử lại: 6 236 × 7 có bằng 43 652 không?',
      ],
      solution:
        '63 758 − 5 364 = 58 394. 37 429 + 49 235 = 86 664. 8 107 × 9 = 72 963. 43 652 : 7 = 6 236.',
    },
    {
      type: 'choice',
      prompt:
        'Nam tiết kiệm được 20 000 + 10 000 × 6 đồng. Việt tiết kiệm được 5 000 × 7 + 50 000 đồng. Mai tiết kiệm được 50 000 + 2 000 × 9 đồng. Bạn nào tiết kiệm được nhiều tiền nhất?',
      options: ['Việt', 'Nam', 'Mai'],
      answer: 0,
      hints: [
        'Em tính giá trị từng biểu thức. Nhớ làm phép nhân trước, phép cộng sau.',
        'Nam: 20 000 + 60 000. Việt: 35 000 + 50 000. Mai: 50 000 + 18 000.',
      ],
      solution:
        'Nam: 20 000 + 10 000 × 6 = 20 000 + 60 000 = 80 000 (đồng). Việt: 5 000 × 7 + 50 000 = 35 000 + 50 000 = 85 000 (đồng). Mai: 50 000 + 2 000 × 9 = 50 000 + 18 000 = 68 000 (đồng). Việt tiết kiệm được nhiều tiền nhất.',
    },
    {
      type: 'choice',
      prompt: '56 732 : 8 = 7 091 (dư 4). Em thử lại bằng phép tính nào?',
      options: ['7 091 × 8 + 4', '7 091 × 8 − 4', '7 091 × 4 + 8'],
      answer: 0,
      hints: ['Số bị chia bằng thương nhân với số chia, rồi cộng số dư.'],
      solution: '7 091 × 8 + 4 = 56 728 + 4 = 56 732, đúng bằng số bị chia. Phép chia đúng.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức a + b − 135 với a = 539 và b = 243.',
      answer: 647,
      hints: ['Em thay a bằng 539, b bằng 243.', 'Em tính từ trái sang phải: 539 + 243 trước.'],
      solution: 'Với a = 539, b = 243 thì a + b − 135 = 539 + 243 − 135 = 782 − 135 = 647.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức c + m × n với c = 2 370, m = 105 và n = 6.',
      answer: 3000,
      hints: ['Em thay chữ bằng số: 2 370 + 105 × 6.', 'Em làm phép nhân trước: 105 × 6.'],
      solution:
        'Với c = 2 370, m = 105, n = 6 thì c + m × n = 2 370 + 105 × 6 = 2 370 + 630 = 3 000.',
    },
    {
      type: 'number',
      prompt: 'Tính: 27 164 + 8 470 + 1 230.',
      answer: 36864,
      hints: ['Em cộng 8 470 + 1 230 trước cho dễ tính.', '8 470 + 1 230 được một số tròn trăm.'],
      solution: '27 164 + 8 470 + 1 230 = 27 164 + (8 470 + 1 230) = 27 164 + 9 700 = 36 864.',
    },
    {
      type: 'number',
      prompt:
        'Một trận bóng đá có 37 636 khán giả, trong đó có 9 273 khán giả nữ. Hỏi số khán giả nam nhiều hơn số khán giả nữ bao nhiêu người?',
      answer: 19090,
      unit: 'người',
      hints: [
        'Bước 1: tìm số khán giả nam bằng phép trừ.',
        'Bước 2: lấy số khán giả nam trừ số khán giả nữ.',
      ],
      solution:
        'Số khán giả nam là: 37 636 − 9 273 = 28 363 (người). Số khán giả nam nhiều hơn số khán giả nữ là: 28 363 − 9 273 = 19 090 (người). Đáp số: 19 090 người.',
    },
    {
      type: 'number',
      prompt:
        'Rô-bốt mua 2 hộp bút màu, mỗi hộp giá 25 000 đồng, và 1 cái thước giá 8 000 đồng. Rô-bốt đưa cô bán hàng tờ 100 000 đồng. Cô bán hàng trả lại Rô-bốt bao nhiêu tiền?',
      answer: 42000,
      unit: 'đồng',
      hints: [
        'Bước 1: tính tiền mua 2 hộp bút màu.',
        'Bước 2: tính tiền mua tất cả. Bước 3: lấy 100 000 trừ đi số tiền đó.',
      ],
      solution:
        'Mua 2 hộp bút màu hết: 25 000 × 2 = 50 000 (đồng). Rô-bốt phải trả: 50 000 + 8 000 = 58 000 (đồng). Cô bán hàng trả lại: 100 000 − 58 000 = 42 000 (đồng). Đáp số: 42 000 đồng.',
    },
    {
      type: 'choice',
      prompt: 'Số lẻ bé nhất có hai chữ số là số nào?',
      options: ['11', '10', '13', '99'],
      answer: 0,
      hints: [
        'Số bé nhất có hai chữ số là 10. Số 10 là số chẵn hay số lẻ?',
        'Em tìm số lẻ ngay sau 10.',
      ],
      solution: 'Số bé nhất có hai chữ số là 10, nhưng 10 là số chẵn. Số lẻ liền sau 10 là 11.',
    },
  ],
  takeaways: [
    'So sánh số: đếm chữ số trước, rồi so sánh từng hàng từ trái sang phải.',
    'Làm tròn: nhìn chữ số ở hàng ngay bên phải, bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
    'Số chẵn tận cùng là 0, 2, 4, 6, 8; số lẻ tận cùng là 1, 3, 5, 7, 9.',
    'Thử lại phép chia có dư: thương × số chia + số dư = số bị chia.',
    'Biểu thức chứa chữ: thay chữ bằng số rồi tính đúng thứ tự.',
  ],
};
