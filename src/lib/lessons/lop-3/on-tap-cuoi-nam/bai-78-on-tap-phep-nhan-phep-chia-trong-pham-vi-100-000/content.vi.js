/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập phép nhân, phép chia trong phạm vi 100 000: nhân, chia nhẩm, đặt tính rồi tính, số dư, tìm thành phần chưa biết, tính giá trị biểu thức và giải bài toán.',
  intro:
    'Để xây nhà cần 87 000 viên gạch. Đã mua 4 lần, mỗi lần 18 200 viên. Còn phải mua bao nhiêu viên? Hôm nay em ôn lại phép nhân, phép chia. Bài ôn tập sẽ cho em biết phần nào đã vững nhé!',
  objectives: [
    'Nhân, chia nhẩm các số tròn nghìn.',
    'Đặt tính rồi tính nhân, chia số có bốn, năm chữ số với số có một chữ số.',
    'Biết số dư luôn bé hơn số chia.',
    'Tìm thừa số, số bị chia, số chia.',
    'Tính giá trị biểu thức có phép nhân, phép chia, có dấu ngoặc.',
    'Giải bài toán có phép nhân, phép chia. Biết phần nào mình cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Nhân, chia nhẩm',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Số tròn nghìn',
          text: '6 000 × 4: em nhẩm 6 nghìn × 4 = 24 nghìn. Vậy 6 000 × 4 = 24 000.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chia nhẩm',
          text: '96 000 : 4: em nhẩm 96 nghìn : 4 = 24 nghìn. Vậy 96 000 : 4 = 24 000.',
        },
      ],
    },
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        {
          type: 'table',
          head: ['Phép tính', 'Em làm thế nào?'],
          rows: [
            ['Nhân', 'Nhân từ phải sang trái. Thêm số nhớ vào hàng bên trái.'],
            ['Chia', 'Chia từ trái sang phải. Chia, nhân, trừ, hạ.'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Số dư luôn bé hơn số chia. Ví dụ: 57 436 : 6 = 9 572 (dư 4), vì 4 bé hơn 6.',
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
            ['Chỉ có nhân, chia', 'Tính từ trái sang phải'],
            ['Có cộng, trừ, nhân, chia', 'Nhân, chia trước; cộng, trừ sau'],
            ['Có dấu ngoặc', 'Tính trong ngoặc trước'],
          ],
        },
        {
          type: 'table',
          head: ['Muốn tìm', 'Em làm'],
          rows: [
            ['Thừa số', 'Tích : thừa số kia'],
            ['Số bị chia', 'Thương × số chia'],
            ['Số chia', 'Số bị chia : thương'],
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
      problem: 'Đặt tính rồi tính: 57 436 : 6.',
      steps: [
        '57 chia 6 được 9, viết 9. 9 nhân 6 bằng 54. 57 trừ 54 bằng 3.',
        'Hạ 4, được 34. 34 chia 6 được 5, viết 5. 5 nhân 6 bằng 30. 34 trừ 30 bằng 4.',
        'Hạ 3, được 43. 43 chia 6 được 7, viết 7. 7 nhân 6 bằng 42. 43 trừ 42 bằng 1.',
        'Hạ 6, được 16. 16 chia 6 được 2, viết 2. 2 nhân 6 bằng 12. 16 trừ 12 bằng 4.',
      ],
      answer: '57 436 : 6 = 9 572 (dư 4).',
    },
    {
      problem:
        'Để xây nhà cần 87 000 viên gạch. Bác Ba đã mua 4 lần, mỗi lần 18 200 viên. Bác còn phải mua thêm bao nhiêu viên gạch?',
      steps: [
        'Số gạch đã mua: 18 200 × 4 = 72 800 (viên).',
        'Số gạch còn phải mua: 87 000 − 72 800 = 14 200 (viên).',
      ],
      answer: 'Bác còn phải mua thêm 14 200 viên gạch.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 207 × 8 = ?',
      answer: 1656,
      hints: ['8 nhân 7 bằng 56, viết 6, nhớ 5.'],
      solution:
        '8 nhân 7 bằng 56, viết 6, nhớ 5. 8 nhân 0 bằng 0, thêm 5 bằng 5, viết 5. 8 nhân 2 bằng 16, viết 16. Kết quả là 1 656.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 9 160 × 5 = ?',
      answer: 45800,
      hints: ['Em nhân từ hàng đơn vị. Nhớ thêm số đã nhớ.'],
      solution:
        '5 nhân 0 bằng 0, viết 0. 5 nhân 6 bằng 30, viết 0, nhớ 3. 5 nhân 1 bằng 5, thêm 3 bằng 8, viết 8. 5 nhân 9 bằng 45, viết 45. Kết quả là 45 800.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 5 481 : 7 = ?',
      answer: 783,
      hints: ['5 bé hơn 7, nên em lấy 54 chia cho 7 trước.'],
      solution:
        '54 chia 7 được 7, dư 5. Hạ 8, được 58; 58 chia 7 được 8, dư 2. Hạ 1, được 21; 21 chia 7 được 3. Kết quả là 783.',
    },
    {
      type: 'choice',
      prompt: '57 436 : 6 = ?',
      options: ['9 572 (dư 4)', '9 572', '957 (dư 4)', '9 571 (dư 10)'],
      answer: 0,
      hints: ['Số dư phải bé hơn 6. Mỗi lần hạ một chữ số, em viết một chữ số ở thương.'],
      solution: '57 436 : 6 = 9 572 (dư 4), vì 9 572 × 6 = 57 432 và 57 432 + 4 = 57 436.',
    },
    {
      type: 'number',
      prompt: 'Phép chia 46 527 : 8 có số dư là bao nhiêu?',
      answer: 7,
      hints: ['Em đặt tính rồi chia. Số dư phải bé hơn 8.'],
      solution: '46 527 : 8 = 5 815 (dư 7), vì 5 815 × 8 = 46 520 và 46 520 + 7 = 46 527.',
    },
    {
      type: 'multi',
      prompt: 'Những phép tính nào có kết quả bằng 24 000?',
      options: ['6 000 × 4', '96 000 : 4', '8 000 × 3', '13 000 × 2', '80 000 : 2'],
      answers: [0, 1, 2],
      hints: ['Em tính nhẩm theo số nghìn.'],
      solution:
        '6 000 × 4 = 24 000; 96 000 : 4 = 24 000; 8 000 × 3 = 24 000; 13 000 × 2 = 26 000; 80 000 : 2 = 40 000.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 4 105 × 9 : 5',
      answer: 7389,
      hints: ['Chỉ có phép nhân, phép chia: em tính từ trái sang phải.'],
      solution: '4 105 × 9 : 5 = 36 945 : 5 = 7 389.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 24 048 : (4 × 2)',
      answer: 3006,
      hints: ['Em tính trong ngoặc trước.'],
      solution: '24 048 : (4 × 2) = 24 048 : 8 = 3 006.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức: 17 286 − 45 234 : 9',
      answer: 12260,
      hints: ['Em làm phép chia trước, phép trừ sau.'],
      solution: '17 286 − 45 234 : 9 = 17 286 − 5 026 = 12 260.',
    },
    {
      type: 'number',
      prompt: 'Tìm số thích hợp: ? × 6 = 9 048. Số đó là bao nhiêu?',
      answer: 1508,
      hints: ['Muốn tìm thừa số, em lấy tích chia cho thừa số kia.'],
      solution: '? = 9 048 : 6 = 1 508.',
    },
    {
      type: 'number',
      prompt:
        'Một quyển truyện giá 18 000 đồng, một chiếc bút giá 8 500 đồng. Việt mua 1 quyển truyện và 2 chiếc bút. Việt phải trả bao nhiêu tiền?',
      answer: 35000,
      unit: 'đồng',
      hints: ['Em tính tiền 2 chiếc bút trước.'],
      solution:
        'Tiền 2 chiếc bút: 8 500 × 2 = 17 000 (đồng). Việt phải trả: 18 000 + 17 000 = 35 000 (đồng).',
    },
    {
      type: 'number',
      prompt:
        'Cô Hoa mua 5 kg gạo hết 85 000 đồng. Nếu mua 4 kg gạo như thế thì hết bao nhiêu tiền?',
      answer: 68000,
      unit: 'đồng',
      hints: ['Em tìm giá tiền của 1 kg gạo trước.'],
      solution:
        '1 kg gạo giá: 85 000 : 5 = 17 000 (đồng). 4 kg gạo giá: 17 000 × 4 = 68 000 (đồng).',
    },
    {
      type: 'number',
      prompt: 'Năm nay Nam 9 tuổi, bố hơn Nam 27 tuổi. Tuổi bố gấp mấy lần tuổi Nam?',
      answer: 4,
      hints: ['Em tìm tuổi bố trước, rồi chia cho tuổi Nam.'],
      solution: 'Tuổi bố: 9 + 27 = 36 (tuổi). 36 : 9 = 4. Tuổi bố gấp 4 lần tuổi Nam.',
    },
  ],
  takeaways: [
    'Nhân từ phải sang trái, chia từ trái sang phải.',
    'Số dư luôn bé hơn số chia.',
    'Nhân, chia trước; cộng, trừ sau. Có ngoặc thì tính trong ngoặc trước.',
  ],
};
