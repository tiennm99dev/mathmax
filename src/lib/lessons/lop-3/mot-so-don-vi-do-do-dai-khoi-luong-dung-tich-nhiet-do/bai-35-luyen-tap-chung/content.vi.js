/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề đơn vị đo: tính với mi-li-mét, gam, mi-li-lít, đọc cân đĩa, đọc dụng cụ đo và giải bài toán thực tế.',
  intro:
    'Cô Ba đơm cúc áo, Rô-bốt lấy nước bằng hai cái cốc, ba túi hàng nằm trên cân đĩa. Em dùng mi-li-mét, gam, mi-li-lít và độ C để giúp các bạn nhé!',
  objectives: [
    'Đọc được số đo trên thước, cân, ống đong và nhiệt kế.',
    'Tính được với các số đo mm, g, ml.',
    'Đọc cân đĩa và so sánh khối lượng.',
    'Giải bài toán thực tế có các đơn vị đo.',
  ],
  sections: [
    {
      heading: 'Các đơn vị đã học',
      blocks: [
        {
          type: 'table',
          head: ['Em đo', 'Dụng cụ', 'Đơn vị'],
          rows: [
            ['Độ dài', 'Thước kẻ', '1 cm = 10 mm'],
            ['Khối lượng', 'Cân', '1 kg = 1 000 g'],
            ['Dung tích', 'Ống đong', '1 l = 1 000 ml'],
            ['Nhiệt độ', 'Nhiệt kế', '°C'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tính với số đo',
          text: 'Em tính như với các số, rồi viết đơn vị ở kết quả. Các số đo phải cùng đơn vị.',
        },
      ],
    },
    {
      heading: 'Đọc cân đĩa',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Cân thăng bằng thì hai đĩa nặng bằng nhau. Đĩa nào thấp hơn thì nặng hơn.',
        },
        {
          type: 'p',
          text: 'Nếu đĩa có vật còn có thêm quả cân, em lấy số gam của đĩa kia trừ đi quả cân đó.',
        },
      ],
    },
    {
      heading: 'Lấy nước bằng hai cái cốc',
      blocks: [
        {
          type: 'p',
          text: 'Hai cái cốc không có vạch chia. Em chỉ biết mỗi cốc đựng đầy được bao nhiêu. Em múc, rót, đổ để có đúng số nước cần lấy.',
        },
        { type: 'widget', name: 'two-cups' },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Em chạm vào đáp án đúng. Sai lần đầu, em được gợi ý và thử lại. Hết bộ, em xem phần nào cần ôn và làm bộ bài khác.',
  },
  examples: [
    {
      problem: 'Tính: 37 g + 63 g − 30 g.',
      steps: ['Em tính lần lượt từ trái sang phải.', '37 + 63 = 100.', '100 − 30 = 70.'],
      answer: '37 g + 63 g − 30 g = 70 g.',
    },
    {
      problem:
        'Cân thăng bằng. Một đĩa có hộp quà và quả cân 100 g. Đĩa kia có quả cân 500 g. Hộp quà cân nặng bao nhiêu gam?',
      steps: [
        'Hai đĩa nặng bằng nhau.',
        'Hộp quà và quả cân 100 g nặng 500 g.',
        '500 − 100 = 400.',
      ],
      answer: 'Hộp quà cân nặng 400 g.',
    },
    {
      problem:
        'Cô Ba đơm 1 chiếc cúc áo hết 70 mm chỉ. Hỏi để đơm 5 chiếc cúc áo như vậy, cô Ba cần bao nhiêu mi-li-mét chỉ?',
      steps: ['5 chiếc cúc như nhau: em làm phép nhân.', '70 × 5 = 350.'],
      answer: 'Cô Ba cần 350 mm chỉ.',
    },
    {
      problem:
        'Rô-bốt có hai cái cốc loại 150 ml và 400 ml. Chỉ dùng hai cái cốc đó, làm thế nào để lấy được 250 ml nước từ thùng nước?',
      steps: [
        'Rô-bốt múc đầy cốc 400 ml.',
        'Rô-bốt rót từ cốc đó sang cho đầy cốc 150 ml.',
        'Nước còn lại trong cốc 400 ml là: 400 − 150 = 250 (ml).',
      ],
      answer: 'Trong cốc 400 ml còn đúng 250 ml nước.',
    },
    {
      problem: 'Bắt đầu từ 8 ml, em nhân với 3, rồi chia cho 4. Em được bao nhiêu mi-li-lít?',
      steps: ['Em làm lần lượt: nhân trước, chia sau.', '8 × 3 = 24.', '24 : 4 = 6.'],
      answer: 'Em được 6 ml.',
    },
    {
      problem:
        'Túi A cân bằng hai quả cân 100 g và 200 g. Túi B cùng quả cân 200 g cân bằng quả cân 500 g. Đặt túi B và túi C lên cân, đĩa có túi C thấp hơn. Túi nào nặng nhất?',
      steps: [
        'Túi A nặng: 100 + 200 = 300 (g).',
        'Túi B nặng: 500 − 200 = 300 (g).',
        'Túi A nặng bằng túi B. Đĩa có túi C thấp hơn nên túi C nặng hơn túi B.',
      ],
      answer: 'Túi C nặng nhất.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính: 428 ml − 156 ml.',
      answer: 272,
      unit: 'ml',
      hints: [
        'Em trừ như với các số: 428 − 156.',
        'Ở hàng chục, 2 không trừ được 5: em lấy 12 trừ 5, rồi nhớ 1 sang hàng trăm.',
      ],
      solution: '428 − 156 = 272. Vậy 428 ml − 156 ml = 272 ml.',
    },
    {
      type: 'number',
      prompt: 'Tính: 46 g + 54 g − 25 g.',
      answer: 75,
      unit: 'g',
      hints: ['Em tính lần lượt từ trái sang phải: cộng trước, trừ sau.'],
      solution: '46 + 54 = 100. 100 − 25 = 75. Kết quả là 75 g.',
    },
    {
      type: 'number',
      prompt: 'Tính: 96 mm − 26 mm + 15 mm.',
      answer: 85,
      unit: 'mm',
      hints: ['Em tính lần lượt từ trái sang phải: trừ trước, cộng sau.'],
      solution: '96 − 26 = 70. 70 + 15 = 85. Kết quả là 85 mm.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả đúng.',
      left: ['300 g − 120 g', '264 mm + 58 mm', '341 ml + 425 ml', '15 g × 6'],
      right: ['322 mm', '90 g', '766 ml', '180 g'],
      pairs: [
        [0, 3],
        [1, 0],
        [2, 2],
        [3, 1],
      ],
      hints: ['Em tính từng phép tính, rồi tìm kết quả có cùng đơn vị.'],
      solution: '300 − 120 = 180. 264 + 58 = 322. 341 + 425 = 766. 15 × 6 = 90.',
    },
    {
      type: 'number',
      prompt:
        'Cân thăng bằng. Một đĩa có gói bánh và quả cân 200 g. Đĩa kia có quả cân 500 g. Gói bánh nặng bao nhiêu gam?',
      answer: 300,
      unit: 'g',
      hints: ['Hai đĩa nặng bằng nhau.', 'Em lấy 500 trừ đi quả cân ở cùng đĩa với gói bánh.'],
      solution: '500 − 200 = 300. Gói bánh nặng 300 g.',
    },
    {
      type: 'number',
      prompt:
        'Cân thăng bằng. Một đĩa có gói kẹo và quả cân 50 g. Đĩa kia có hai quả cân 200 g. Gói kẹo nặng bao nhiêu gam?',
      answer: 350,
      unit: 'g',
      hints: ['Em cộng hai quả cân ở đĩa bên kia trước.', 'Rồi em trừ đi quả cân 50 g.'],
      solution: '200 + 200 = 400. 400 − 50 = 350. Gói kẹo nặng 350 g.',
    },
    {
      type: 'number',
      prompt: 'Bắt đầu từ 9 ml. Em nhân với 4, rồi chia cho 6. Em được bao nhiêu mi-li-lít?',
      answer: 6,
      unit: 'ml',
      hints: ['Em làm lần lượt: nhân trước, chia sau.'],
      solution: '9 × 4 = 36. 36 : 6 = 6. Em được 6 ml.',
    },
    {
      type: 'number',
      prompt: 'Bắt đầu từ 48 g. Em chia cho 4, rồi nhân với 6. Em được bao nhiêu gam?',
      answer: 72,
      unit: 'g',
      hints: ['Em làm lần lượt: chia trước, nhân sau.'],
      solution: '48 : 4 = 12. 12 × 6 = 72. Em được 72 g.',
    },
    {
      type: 'number',
      prompt:
        'Cô Lan đơm 1 chiếc cúc áo hết 60 mm chỉ. Đơm 4 chiếc cúc như vậy, cô Lan cần bao nhiêu mi-li-mét chỉ?',
      answer: 240,
      unit: 'mm',
      hints: ['4 chiếc cúc như nhau: em làm phép nhân.', '6 chục nhân 4 bằng mấy chục?'],
      solution: '60 × 4 = 240. Cô Lan cần 240 mm chỉ.',
    },
    {
      type: 'choice',
      prompt:
        'Có hai cái cốc loại 250 ml và 600 ml. Làm thế nào để lấy được đúng 350 ml nước từ thùng?',
      options: [
        'Múc đầy cốc 600 ml, rót sang cho đầy cốc 250 ml. Nước còn lại ở cốc 600 ml là số cần lấy.',
        'Múc đầy cốc 250 ml, rót sang cốc 600 ml. Nước ở cốc 600 ml là số cần lấy.',
        'Múc đầy cả hai cốc, rồi đổ chung vào cốc 600 ml.',
      ],
      answer: 0,
      hints: ['Em thử tính xem cách nào cho 350 ml.', 'Số 350 bằng 600 trừ đi số nào?'],
      solution: '600 − 250 = 350. Múc đầy cốc 600 ml, rót sang cho đầy cốc 250 ml thì còn 350 ml.',
    },
    {
      type: 'choice',
      prompt:
        'Túi A cân bằng hai quả cân 100 g và 200 g. Túi B cùng quả cân 100 g cân bằng quả cân 500 g. Đặt túi B và túi C lên cân, đĩa có túi B thấp hơn. Túi nào nặng nhất?',
      options: ['Túi A', 'Túi B', 'Túi C'],
      answer: 1,
      hints: ['Em tính số gam của túi A và túi B.', 'Đĩa thấp hơn thì nặng hơn.'],
      solution:
        'Túi A nặng: 100 + 200 = 300 (g). Túi B nặng: 500 − 100 = 400 (g). Túi B nặng hơn túi A. Đĩa có túi B thấp hơn nên túi B nặng hơn túi C. Vậy túi B nặng nhất.',
    },
    {
      type: 'order',
      prompt: 'Xếp các độ dài theo thứ tự từ ngắn đến dài.',
      items: ['2 cm', '18 mm', '25 mm', '3 cm'],
      answer: [1, 0, 2, 3],
      hints: ['Em đổi hết ra mi-li-mét rồi so sánh.'],
      solution: '2 cm = 20 mm, 3 cm = 30 mm. 18 mm < 20 mm < 25 mm < 30 mm.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi dụng cụ với đơn vị em đọc trên nó.',
      left: ['Thước kẻ', 'Cân', 'Ống đong', 'Nhiệt kế'],
      right: ['°C', 'mm', 'ml', 'g'],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 2],
        [3, 0],
      ],
      hints: ['Thước đo độ dài, cân đo khối lượng, ống đong đo dung tích, nhiệt kế đo nhiệt độ.'],
      solution: 'Thước kẻ: mm. Cân: g. Ống đong: ml. Nhiệt kế: °C.',
    },
    {
      type: 'number',
      prompt:
        'Buổi sáng trời 22 °C. Buổi trưa nóng hơn buổi sáng 7 °C. Buổi trưa trời bao nhiêu độ C?',
      answer: 29,
      unit: '°C',
      hints: ['Nóng hơn thì nhiệt độ cao hơn: em làm phép cộng.'],
      solution: '22 + 7 = 29. Buổi trưa trời 29 °C.',
    },
  ],
  takeaways: [
    '1 cm = 10 mm, 1 kg = 1 000 g, 1 l = 1 000 ml.',
    'Tính với số đo: em tính như với các số, rồi viết đơn vị ở kết quả.',
    'Cân thăng bằng thì hai đĩa nặng bằng nhau. Đĩa thấp hơn thì nặng hơn.',
  ],
};
