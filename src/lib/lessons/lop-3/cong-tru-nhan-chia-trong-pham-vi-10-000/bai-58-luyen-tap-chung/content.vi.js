/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Cộng, trừ, nhân, chia trong phạm vi 10 000: đặt tính rồi tính, tính nhẩm, tính giá trị biểu thức và giải bài toán thực tế.',
  intro:
    'Em đã biết cộng, trừ, nhân, chia các số trong phạm vi 10 000. Giờ em luyện tập để tính thật chắc và giải các bài toán nhé!',
  objectives: [
    'Đặt tính rồi tính cộng, trừ, nhân, chia trong phạm vi 10 000.',
    'Tính nhẩm với số tròn nghìn, tròn trăm.',
    'Tính giá trị của biểu thức số.',
    'Giải bài toán thực tế bằng một hoặc hai bước tính.',
  ],
  sections: [
    {
      heading: 'Bốn phép tính theo cột',
      blocks: [
        {
          type: 'table',
          head: ['Phép tính', 'Em làm từ đâu?'],
          rows: [
            ['Cộng', 'Từ hàng đơn vị, sang trái. Đủ 10 thì nhớ 1.'],
            ['Trừ', 'Từ hàng đơn vị, sang trái. Không trừ được thì lấy thêm 10, nhớ 1.'],
            ['Nhân', 'Từ hàng đơn vị, sang trái. Thêm số đã nhớ.'],
            ['Chia', 'Từ hàng nghìn, sang phải. Chia, viết, nhân, trừ, hạ.'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Khi đặt tính, các hàng phải thẳng cột: đơn vị thẳng đơn vị, chục thẳng chục.',
        },
      ],
    },
    {
      heading: 'Thử lại',
      blocks: [
        {
          type: 'p',
          text: 'Em thử lại phép trừ bằng phép cộng: 6 378 − 2 549 = 3 829, vì 3 829 + 2 549 = 6 378.',
        },
        {
          type: 'p',
          text: 'Em thử lại phép chia bằng phép nhân: 2 487 : 2 = 1 243 (dư 1), vì 1 243 × 2 + 1 = 2 487.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số dư luôn bé hơn số chia.',
        },
      ],
    },
    {
      heading: 'Giải bài toán',
      blocks: [
        { type: 'p', text: '"Nhiều hơn", "thêm", "tất cả": em thường làm phép cộng.' },
        { type: 'p', text: '"Ít hơn", "còn lại", "hơn bao nhiêu": em thường làm phép trừ.' },
        { type: 'p', text: '"Gấp lên", "mỗi … có … , mấy … như thế": em làm phép nhân.' },
        { type: 'p', text: '"Chia đều", "mỗi phần": em làm phép chia.' },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài tập trộn',
    instruction:
      'Mỗi lượt có mười câu, mỗi câu một dạng bài. Em chọn đáp án đúng. Sai lần đầu, em được gợi ý và làm lại. Hết lượt, em xem dạng nào cần ôn, rồi bấm "Làm bộ bài khác".',
  },
  examples: [
    {
      problem:
        'Một cửa hàng có 4 500 kg gạo. Buổi sáng bán được 1 250 kg, buổi chiều bán được 1 340 kg. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam gạo?',
      steps: [
        'Số gạo đã bán: 1 250 + 1 340 = 2 590 (kg).',
        'Số gạo còn lại: 4 500 − 2 590 = 1 910 (kg).',
      ],
      answer: 'Cửa hàng còn lại 1 910 kg gạo.',
    },
    {
      problem: 'Tính giá trị của biểu thức: 8 000 − 1 225 × 4.',
      steps: [
        'Em làm phép nhân trước: 1 225 × 4 = 4 900.',
        'Rồi làm phép trừ: 8 000 − 4 900 = 3 100.',
      ],
      answer: '8 000 − 1 225 × 4 = 3 100.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 2 765 + 4 548 = ?',
      answer: 7313,
      hints: ['5 cộng 8 bằng 13, viết 3, nhớ 1.', 'Hàng nào được 10 hoặc hơn thì nhớ 1 sang trái.'],
      solution:
        '5 cộng 8 bằng 13, viết 3, nhớ 1. 6 cộng 4 bằng 10, thêm 1 bằng 11, viết 1, nhớ 1. 7 cộng 5 bằng 12, thêm 1 bằng 13, viết 3, nhớ 1. 2 cộng 4 bằng 6, thêm 1 bằng 7, viết 7. Vậy 2 765 + 4 548 = 7 313.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 7 103 − 2 458 = ?',
      answer: 4645,
      hints: [
        '3 không trừ được 8, em lấy 13 trừ 8, nhớ 1.',
        'Hàng chục: 5 thêm 1 bằng 6, 0 không trừ được 6.',
      ],
      solution:
        '3 không trừ được 8, lấy 13 trừ 8 bằng 5, viết 5, nhớ 1. 5 thêm 1 bằng 6, 0 không trừ được 6, lấy 10 trừ 6 bằng 4, viết 4, nhớ 1. 4 thêm 1 bằng 5, 1 không trừ được 5, lấy 11 trừ 5 bằng 6, viết 6, nhớ 1. 2 thêm 1 bằng 3, 7 trừ 3 bằng 4, viết 4. Vậy 7 103 − 2 458 = 4 645.',
    },
    {
      type: 'choice',
      prompt: 'Đặt tính rồi tính: 1 806 × 5 = ?',
      options: ['9 030', '9 000', '5 030', '9 040'],
      answer: 0,
      hints: ['5 nhân 6 bằng 30, viết 0, nhớ 3.', 'Hàng chục: 5 nhân 0 bằng 0, thêm 3.'],
      solution:
        '5 nhân 6 bằng 30, viết 0, nhớ 3. 5 nhân 0 bằng 0, thêm 3 bằng 3, viết 3. 5 nhân 8 bằng 40, viết 0, nhớ 4. 5 nhân 1 bằng 5, thêm 4 bằng 9, viết 9. Vậy 1 806 × 5 = 9 030.',
    },
    {
      type: 'choice',
      prompt: 'Đặt tính rồi tính: 4 236 : 6 = ?',
      options: ['706', '76', '7 006', '716'],
      answer: 0,
      hints: ['4 bé hơn 6, em lấy 42 để chia.', 'Hạ 3: 3 chia 6 được 0, em vẫn viết 0 ở thương.'],
      solution:
        '42 chia 6 được 7, viết 7; 42 trừ 42 bằng 0. Hạ 3; 3 chia 6 được 0, viết 0; 3 trừ 0 bằng 3. Hạ 6, được 36; 36 chia 6 được 6, viết 6; 36 trừ 36 bằng 0. Vậy 4 236 : 6 = 706.',
    },
    {
      type: 'match',
      prompt: 'Tính nhẩm rồi nối mỗi phép tính với kết quả của nó.',
      left: ['4 000 + 5 000', '9 000 − 6 000', '2 000 × 3', '8 000 : 2'],
      right: ['9 000', '3 000', '6 000', '4 000'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em nhẩm theo nghìn: 4 nghìn + 5 nghìn = 9 nghìn.'],
      solution:
        '4 000 + 5 000 = 9 000. 9 000 − 6 000 = 3 000. 2 000 × 3 = 6 000. 8 000 : 2 = 4 000.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 8 000 − 1 225 × 4.',
      answer: 3100,
      hints: ['Em làm phép nhân trước, phép trừ sau.', '1 225 × 4 = 4 900.'],
      solution: '8 000 − 1 225 × 4 = 8 000 − 4 900 = 3 100.',
    },
    {
      type: 'choice',
      prompt: 'Tính giá trị của biểu thức: (3 456 + 1 544) : 5.',
      options: ['1 000', '2 000', '5 000', '1 100'],
      answer: 0,
      hints: ['Em tính trong ngoặc trước.', '3 456 + 1 544 là một số tròn nghìn.'],
      solution: '(3 456 + 1 544) : 5 = 5 000 : 5 = 1 000.',
    },
    {
      type: 'number',
      prompt:
        'Một cửa hàng có 4 500 kg gạo. Buổi sáng bán được 1 250 kg, buổi chiều bán được 1 340 kg. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam gạo?',
      answer: 1910,
      unit: 'kg',
      hints: ['Trước hết em tính số gạo đã bán cả ngày.', 'Rồi em lấy 4 500 trừ đi số gạo đã bán.'],
      solution:
        'Số gạo đã bán: 1 250 + 1 340 = 2 590 (kg). Số gạo còn lại: 4 500 − 2 590 = 1 910 (kg).',
    },
    {
      type: 'number',
      prompt:
        'Trang trại thứ nhất có 4 500 con vịt. Số vịt ở trang trại thứ hai bằng số vịt ở trang trại thứ nhất giảm đi 3 lần. Hỏi cả hai trang trại có bao nhiêu con vịt?',
      answer: 6000,
      hints: [
        'Giảm đi 3 lần thì em chia cho 3: tìm số vịt ở trang trại thứ hai.',
        'Rồi em cộng số vịt của hai trang trại.',
      ],
      solution:
        'Trang trại thứ hai có: 4 500 : 3 = 1 500 (con vịt). Cả hai trang trại có: 4 500 + 1 500 = 6 000 (con vịt).',
    },
    {
      type: 'choice',
      prompt:
        'Xe thứ nhất chở 1 250 kg xi măng. Xe thứ hai chở gấp 3 lần xe thứ nhất. Hỏi cả hai xe chở bao nhiêu ki-lô-gam xi măng?',
      options: ['5 000 kg', '3 750 kg', '1 253 kg', '2 500 kg'],
      answer: 0,
      hints: [
        'Trước hết em tính số xi măng xe thứ hai chở: gấp 3 lần thì nhân với 3.',
        'Rồi em cộng số xi măng của hai xe.',
      ],
      solution:
        'Xe thứ hai chở: 1 250 × 3 = 3 750 (kg). Cả hai xe chở: 1 250 + 3 750 = 5 000 (kg).',
    },
  ],
  takeaways: [
    'Cộng, trừ, nhân: làm từ hàng đơn vị. Chia: làm từ hàng cao nhất.',
    'Biểu thức: trong ngoặc trước, rồi nhân, chia, rồi cộng, trừ.',
    'Thử lại để chắc chắn kết quả đúng.',
  ],
};
