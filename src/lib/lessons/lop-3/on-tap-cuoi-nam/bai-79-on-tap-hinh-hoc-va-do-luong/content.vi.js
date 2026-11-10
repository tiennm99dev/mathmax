/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập hình học và đo lường: chu vi, diện tích hình chữ nhật, hình vuông, hình tròn, trung điểm, đơn vị đo độ dài, khối lượng, dung tích, xem đồng hồ, tháng năm và tiền Việt Nam.',
  intro:
    'Mảnh đất hình chữ nhật rộng 8 m, chiều dài hơn chiều rộng 6 m. Chu vi mảnh đất là bao nhiêu mét? Hôm nay em ôn lại hình học và đo lường. Bài ôn tập sẽ cho em biết phần nào đã vững nhé!',
  objectives: [
    'Tính chu vi hình tam giác, hình tứ giác, hình chữ nhật, hình vuông.',
    'Tính diện tích hình chữ nhật, hình vuông theo xăng-ti-mét vuông.',
    'Nhận biết tâm, bán kính, đường kính của hình tròn và trung điểm của đoạn thẳng.',
    'Đổi đơn vị đo độ dài, khối lượng, dung tích; tính với số đo.',
    'Xem đồng hồ, tháng năm; giải bài toán về tiền Việt Nam.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Chu vi và diện tích',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Chu vi của một hình bằng tổng độ dài các cạnh của hình đó.',
        },
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
          tone: 'warning',
          text: 'Chiều dài và chiều rộng phải cùng đơn vị đo. Chu vi viết cm, diện tích viết cm².',
        },
      ],
    },
    {
      heading: 'Hình tròn và trung điểm',
      blocks: [
        {
          type: 'p',
          text: 'Hình tròn tâm O: đoạn thẳng nối tâm với một điểm trên đường tròn là bán kính. Đoạn thẳng đi qua tâm, nối hai điểm trên đường tròn là đường kính.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Đường kính dài gấp 2 lần bán kính.',
        },
        {
          type: 'p',
          text: 'M là trung điểm của đoạn thẳng AB khi M nằm giữa A và B, và AM = MB.',
        },
      ],
    },
    {
      heading: 'Đơn vị đo',
      blocks: [
        {
          type: 'table',
          head: ['Đại lượng', 'Đổi đơn vị'],
          rows: [
            ['Độ dài', '1 cm = 10 mm; 1 dm = 10 cm; 1 m = 100 cm = 1 000 mm; 1 km = 1 000 m'],
            ['Khối lượng', '1 kg = 1 000 g'],
            ['Dung tích', '1 l = 1 000 ml'],
          ],
        },
        {
          type: 'p',
          text: 'Tính với số đo: em tính như với số, rồi viết đơn vị vào kết quả. Ví dụ: 200 g × 5 = 1 000 g.',
        },
      ],
    },
    {
      heading: 'Thời gian và tiền',
      blocks: [
        {
          type: 'table',
          head: ['Số ngày', 'Các tháng'],
          rows: [
            ['31 ngày', 'Tháng 1, 3, 5, 7, 8, 10, 12'],
            ['30 ngày', 'Tháng 4, 6, 9, 11'],
            ['28 hoặc 29 ngày', 'Tháng 2'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Xem đồng hồ: kim ngắn chỉ giờ, kim dài chỉ phút. Mỗi số trên mặt đồng hồ ứng với 5 phút, mỗi vạch nhỏ là 1 phút.',
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
        'Một mảnh đất hình chữ nhật có chiều rộng 8 m, chiều dài hơn chiều rộng 6 m. Tính chu vi mảnh đất đó.',
      steps: ['Chiều dài là: 8 + 6 = 14 (m).', 'Chu vi là: (14 + 8) × 2 = 44 (m).'],
      answer: 'Chu vi mảnh đất là 44 m.',
    },
    {
      problem:
        'Hình H gồm hai hình vuông ghép lại: một hình cạnh 4 cm, một hình cạnh 6 cm. Tính diện tích hình H.',
      steps: [
        'Diện tích hình vuông cạnh 4 cm: 4 × 4 = 16 (cm²).',
        'Diện tích hình vuông cạnh 6 cm: 6 × 6 = 36 (cm²).',
        'Diện tích hình H: 16 + 36 = 52 (cm²).',
      ],
      answer: 'Diện tích hình H là 52 cm².',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Hình tam giác có độ dài các cạnh là 3 cm, 4 cm và 5 cm. Tính chu vi hình tam giác.',
      answer: 12,
      unit: 'cm',
      hints: ['Chu vi bằng tổng độ dài ba cạnh.'],
      solution: 'Chu vi hình tam giác là: 3 + 4 + 5 = 12 (cm).',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh đất hình chữ nhật có chiều rộng 8 m, chiều dài hơn chiều rộng 6 m. Tính chu vi mảnh đất.',
      answer: 44,
      unit: 'm',
      hints: ['Em tìm chiều dài trước.', 'Chu vi hình chữ nhật bằng (dài + rộng) × 2.'],
      solution: 'Chiều dài: 8 + 6 = 14 (m). Chu vi: (14 + 8) × 2 = 44 (m).',
    },
    {
      type: 'number',
      prompt: 'Tính diện tích hình vuông có cạnh 6 cm.',
      answer: 36,
      unit: 'cm²',
      hints: ['Diện tích hình vuông bằng cạnh nhân cạnh.'],
      solution: 'Diện tích hình vuông là: 6 × 6 = 36 (cm²).',
    },
    {
      type: 'number',
      prompt: 'Tính diện tích hình chữ nhật có chiều dài 9 cm, chiều rộng 5 cm.',
      answer: 45,
      unit: 'cm²',
      hints: ['Diện tích hình chữ nhật bằng chiều dài nhân chiều rộng.'],
      solution: 'Diện tích hình chữ nhật là: 9 × 5 = 45 (cm²).',
    },
    {
      type: 'choice',
      prompt: 'Hình tròn tâm O có bán kính 5 cm. Đường kính của hình tròn dài bao nhiêu?',
      options: ['10 cm', '5 cm', '20 cm', '15 cm'],
      answer: 0,
      hints: ['Đường kính dài gấp 2 lần bán kính.'],
      solution: 'Đường kính dài: 5 × 2 = 10 (cm).',
    },
    {
      type: 'match',
      prompt: 'Nối hai số đo bằng nhau.',
      left: ['1 m', '1 dm', '1 cm', '1 km'],
      right: ['100 cm', '10 cm', '10 mm', '1 000 m', '1 000 cm'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em nhớ: 1 m = 10 dm, 1 dm = 10 cm, 1 cm = 10 mm.'],
      solution: '1 m = 100 cm. 1 dm = 10 cm. 1 cm = 10 mm. 1 km = 1 000 m.',
    },
    {
      type: 'number',
      prompt: '4 m = ? mm',
      answer: 4000,
      unit: 'mm',
      hints: ['1 m = 1 000 mm.'],
      solution: '4 m = 4 × 1 000 mm = 4 000 mm.',
    },
    {
      type: 'number',
      prompt: '2 kg = ? g',
      answer: 2000,
      unit: 'g',
      hints: ['1 kg = 1 000 g.'],
      solution: '2 kg = 2 × 1 000 g = 2 000 g.',
    },
    {
      type: 'number',
      prompt: 'Tính: 200 ml × 4 = ? ml',
      answer: 800,
      unit: 'ml',
      hints: ['Em tính 200 × 4, rồi viết đơn vị ml.'],
      solution: '200 ml × 4 = 800 ml.',
    },
    {
      type: 'choice',
      prompt: 'Kim ngắn ở giữa số 4 và số 5, kim dài chỉ số 8. Đồng hồ chỉ mấy giờ?',
      options: ['4 giờ 40 phút', '8 giờ 20 phút', '5 giờ 40 phút', '4 giờ 8 phút'],
      answer: 0,
      hints: ['Kim ngắn đã qua số 4. Kim dài chỉ số 8: mỗi số là 5 phút.'],
      solution: 'Kim ngắn đã qua số 4, kim dài chỉ 8 × 5 = 40 phút. Đồng hồ chỉ 4 giờ 40 phút.',
    },
    {
      type: 'multi',
      prompt: 'Những tháng nào có 30 ngày?',
      options: ['Tháng 4', 'Tháng 6', 'Tháng 9', 'Tháng 11', 'Tháng 7', 'Tháng 8'],
      answers: [0, 1, 2, 3],
      hints: ['Em đếm trên các khớp ngón tay: tháng ở chỗ lõm có 30 ngày (trừ tháng 2).'],
      solution: 'Các tháng có 30 ngày là tháng 4, 6, 9, 11. Tháng 7 và tháng 8 có 31 ngày.',
    },
    {
      type: 'choice',
      prompt: 'Ngày 28 tháng 5 là Chủ nhật. Ngày 1 tháng 6 là thứ mấy?',
      options: ['Thứ Năm', 'Thứ Tư', 'Thứ Sáu', 'Thứ Ba'],
      answer: 0,
      hints: ['Tháng 5 có 31 ngày. Em đếm tiếp từng ngày.'],
      solution:
        'Ngày 29 tháng 5 là thứ Hai, ngày 30 là thứ Ba, ngày 31 là thứ Tư. Vậy ngày 1 tháng 6 là thứ Năm.',
    },
    {
      type: 'number',
      prompt:
        'Mai mua 5 quyển vở, mỗi quyển giá 7 000 đồng, và một hộp bút chì màu giá 60 000 đồng. Mai phải trả tất cả bao nhiêu tiền?',
      answer: 95000,
      unit: 'đồng',
      hints: ['Em tính tiền 5 quyển vở trước.'],
      solution:
        'Tiền 5 quyển vở: 7 000 × 5 = 35 000 (đồng). Mai phải trả: 35 000 + 60 000 = 95 000 (đồng).',
    },
  ],
  takeaways: [
    'Chu vi hình chữ nhật = (dài + rộng) × 2; chu vi hình vuông = cạnh × 4.',
    'Diện tích hình chữ nhật = dài × rộng; diện tích hình vuông = cạnh × cạnh.',
    'Đường kính dài gấp 2 lần bán kính.',
    '1 m = 100 cm = 1 000 mm; 1 kg = 1 000 g; 1 l = 1 000 ml.',
  ],
};
