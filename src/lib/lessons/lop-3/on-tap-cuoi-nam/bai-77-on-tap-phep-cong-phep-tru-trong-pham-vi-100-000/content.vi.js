/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập phép cộng, phép trừ trong phạm vi 100 000: cộng, trừ nhẩm, đặt tính rồi tính, tính giá trị biểu thức, tìm thành phần chưa biết và giải bài toán hai bước tính.',
  intro:
    'Trung tâm y tế có 35 800 liều vắc-xin. Hai đợt tiêm hết 16 400 liều và 17 340 liều. Còn lại bao nhiêu liều? Hôm nay em ôn lại phép cộng, phép trừ. Bài ôn tập sẽ cho em biết phần nào đã vững nhé!',
  objectives: [
    'Cộng, trừ nhẩm các số tròn nghìn, tròn trăm.',
    'Đặt tính rồi tính phép cộng, phép trừ có nhớ trong phạm vi 100 000.',
    'Tính giá trị biểu thức có phép cộng, phép trừ, có dấu ngoặc.',
    'Tìm số hạng, số bị trừ, số trừ.',
    'Giải bài toán có hai bước tính, bài toán về tiền.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Cộng, trừ nhẩm',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Số tròn nghìn',
          text: '15 000 + 6 000: em nhẩm 15 nghìn + 6 nghìn = 21 nghìn. Vậy 15 000 + 6 000 = 21 000.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Số tròn trăm',
          text: '3 500 + 2 500: em nhẩm 35 trăm + 25 trăm = 60 trăm. Vậy 3 500 + 2 500 = 6 000.',
        },
      ],
    },
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Viết các chữ số cùng hàng thẳng cột với nhau.',
            'Tính từ phải sang trái, bắt đầu từ hàng đơn vị.',
            'Cộng được 10 trở lên thì nhớ 1 sang hàng bên trái.',
            'Trừ không được thì lấy thêm 10, rồi nhớ 1 sang hàng bên trái.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Đừng quên số nhớ! Ví dụ 45 738 + 39 145 = 84 883, không phải 74 873.',
        },
      ],
    },
    {
      heading: 'Biểu thức và thành phần chưa biết',
      blocks: [
        {
          type: 'table',
          head: ['Biểu thức', 'Em làm'],
          rows: [
            ['Chỉ có cộng, trừ', 'Tính từ trái sang phải'],
            ['Có dấu ngoặc', 'Tính trong ngoặc trước'],
          ],
        },
        {
          type: 'table',
          head: ['Muốn tìm', 'Em làm'],
          rows: [
            ['Số hạng', 'Tổng trừ số hạng kia'],
            ['Số bị trừ', 'Hiệu cộng số trừ'],
            ['Số trừ', 'Số bị trừ trừ hiệu'],
          ],
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
      problem: 'Đặt tính rồi tính: 45 274 + 9 352.',
      steps: [
        '4 cộng 2 bằng 6, viết 6.',
        '7 cộng 5 bằng 12, viết 2, nhớ 1.',
        '2 cộng 3 bằng 5, thêm 1 bằng 6, viết 6.',
        '5 cộng 9 bằng 14, viết 4, nhớ 1.',
        '4 thêm 1 bằng 5, viết 5.',
      ],
      answer: '45 274 + 9 352 = 54 626.',
    },
    {
      problem:
        'Trung tâm y tế có 35 800 liều vắc-xin. Đợt một tiêm 16 400 liều, đợt hai tiêm 17 340 liều. Trung tâm còn lại bao nhiêu liều vắc-xin?',
      steps: [
        'Hai đợt đã tiêm: 16 400 + 17 340 = 33 740 (liều).',
        'Còn lại: 35 800 − 33 740 = 2 060 (liều).',
      ],
      answer: 'Trung tâm còn lại 2 060 liều vắc-xin.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính nhẩm: 15 000 + 6 000 = ?',
      answer: 21000,
      hints: ['15 nghìn + 6 nghìn = mấy nghìn?'],
      solution: '15 nghìn + 6 nghìn = 21 nghìn. Vậy 15 000 + 6 000 = 21 000.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 639 + 5 246 = ?',
      answer: 5885,
      hints: ['Viết 639 sao cho chữ số 9 thẳng cột với chữ số 6 của 5 246.'],
      solution:
        '9 cộng 6 bằng 15, viết 5, nhớ 1. 3 cộng 4 bằng 7, thêm 1 bằng 8, viết 8. 6 cộng 2 bằng 8, viết 8. Hạ 5. Kết quả là 5 885.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 13 627 − 8 454 = ?',
      answer: 5173,
      hints: ['Ở hàng chục, 2 không trừ được 5: em lấy 12 trừ 5 rồi nhớ 1.'],
      solution:
        '7 trừ 4 bằng 3. 12 trừ 5 bằng 7, nhớ 1. 4 thêm 1 bằng 5, 6 trừ 5 bằng 1. 13 trừ 8 bằng 5, nhớ 1. 1 trừ 1 bằng 0. Kết quả là 5 173.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 86 769 − 78 495 = ?',
      answer: 8274,
      hints: ['Em trừ từ hàng đơn vị. Nhớ 1 khi phải lấy thêm 10.'],
      solution:
        '9 trừ 5 bằng 4. 16 trừ 9 bằng 7, nhớ 1. 4 thêm 1 bằng 5, 7 trừ 5 bằng 2. 16 trừ 8 bằng 8, nhớ 1. 7 thêm 1 bằng 8, 8 trừ 8 bằng 0. Kết quả là 8 274.',
    },
    {
      type: 'choice',
      prompt: '6 735 + 3 627 = ?',
      options: ['10 362', '9 362', '10 352', '10 462'],
      answer: 0,
      hints: ['Hàng nghìn: 6 cộng 3 bằng 9, thêm số nhớ.'],
      solution: '6 735 + 3 627 = 10 362.',
    },
    {
      type: 'choice',
      prompt: '24 753 − 16 238 = ?',
      options: ['8 515', '8 525', '12 515', '8 615'],
      answer: 0,
      hints: ['Ở hàng đơn vị, 3 không trừ được 8.'],
      solution: '24 753 − 16 238 = 8 515.',
    },
    {
      type: 'choice',
      prompt: 'Phép tính nào có kết quả lớn hơn 20 000?',
      options: ['41 600 − 21 500', '9 850 − 4 000', '4 956 + 1 000', '3 500 + 2 500'],
      answer: 0,
      hints: ['Em tính nhẩm từng phép tính rồi so sánh với 20 000.'],
      solution:
        '41 600 − 21 500 = 20 100; 9 850 − 4 000 = 5 850; 4 956 + 1 000 = 5 956; 3 500 + 2 500 = 6 000. Chỉ có 20 100 lớn hơn 20 000.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 4 569 + 3 721 − 500',
      answer: 7790,
      hints: ['Chỉ có phép cộng, phép trừ: em tính từ trái sang phải.'],
      solution: '4 569 + 3 721 − 500 = 8 290 − 500 = 7 790.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 9 170 + (15 729 − 7 729)',
      answer: 17170,
      hints: ['Em tính trong ngoặc trước.'],
      solution: '9 170 + (15 729 − 7 729) = 9 170 + 8 000 = 17 170.',
    },
    {
      type: 'number',
      prompt: 'Tìm số thích hợp: ? − 2 500 = 6 500. Số đó là bao nhiêu?',
      answer: 9000,
      hints: ['Muốn tìm số bị trừ, em lấy hiệu cộng với số trừ.'],
      solution: '? = 6 500 + 2 500 = 9 000.',
    },
    {
      type: 'number',
      prompt:
        'Mai mua một hộp bút giá 28 000 đồng và một quyển vở giá 3 000 đồng. Mai đưa cô bán hàng tờ 50 000 đồng. Cô trả lại Mai bao nhiêu tiền?',
      answer: 19000,
      unit: 'đồng',
      hints: ['Em tính số tiền Mai phải trả trước.'],
      solution:
        'Mai phải trả: 28 000 + 3 000 = 31 000 (đồng). Cô trả lại: 50 000 − 31 000 = 19 000 (đồng).',
    },
    {
      type: 'choice',
      prompt:
        'Đường đến rạp xiếc gồm hai đoạn dài 590 m và 450 m. Đường đến vườn thú gồm ba đoạn dài 400 m, 280 m và 370 m. Đường nào dài hơn?',
      options: ['Đường đến vườn thú', 'Đường đến rạp xiếc', 'Hai đường dài bằng nhau'],
      answer: 0,
      hints: ['Em tính độ dài mỗi con đường rồi so sánh.'],
      solution:
        'Đường đến rạp xiếc: 590 + 450 = 1 040 (m). Đường đến vườn thú: 400 + 280 + 370 = 1 050 (m). 1 050 > 1 040, nên đường đến vườn thú dài hơn.',
    },
    {
      type: 'number',
      prompt:
        'Một kho có 45 000 kg thóc. Lần đầu xuất đi 12 500 kg, lần sau xuất đi 18 000 kg. Kho còn lại bao nhiêu ki-lô-gam thóc?',
      answer: 14500,
      unit: 'kg',
      hints: ['Em tính số thóc đã xuất trong cả hai lần trước.'],
      solution:
        'Hai lần xuất: 12 500 + 18 000 = 30 500 (kg). Còn lại: 45 000 − 30 500 = 14 500 (kg).',
    },
  ],
  takeaways: [
    'Viết các chữ số cùng hàng thẳng cột, tính từ phải sang trái.',
    'Cộng được 10 trở lên thì nhớ 1; trừ không được thì lấy thêm 10 rồi nhớ 1.',
    'Chỉ có cộng, trừ: tính từ trái sang phải. Có ngoặc: tính trong ngoặc trước.',
  ],
};
