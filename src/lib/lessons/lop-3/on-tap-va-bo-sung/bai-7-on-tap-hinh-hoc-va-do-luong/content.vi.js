/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập hình học và đo lường: khối hình, ba điểm thẳng hàng, đường gấp khúc, hình tứ giác, ki-lô-gam, lít, xem đồng hồ và xem lịch.',
  intro:
    'Một chú ốc sên bò theo đường gấp khúc đến cây chuối. Chú bò được bao xa? Hôm nay em ôn lại hình học và đo lường. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Nhận ra khối trụ, khối cầu, khối hộp chữ nhật, khối lập phương.',
    'Tìm ba điểm thẳng hàng, tính độ dài đường gấp khúc, đếm hình tứ giác.',
    'Tính với ki-lô-gam và lít.',
    'Xem đồng hồ, biết thứ của một ngày trong tháng.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Khối hình',
      blocks: [
        {
          type: 'table',
          head: ['Đồ vật', 'Có dạng'],
          rows: [
            ['Robot hút bụi', 'Khối trụ'],
            ['Quả địa cầu', 'Khối cầu'],
            ['Bể cá', 'Khối hộp chữ nhật'],
            ['Khối Rubik', 'Khối lập phương'],
          ],
        },
      ],
    },
    {
      heading: 'Hình phẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ba điểm thẳng hàng',
          text: 'Ba điểm cùng nằm trên một đường thẳng là ba điểm thẳng hàng.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Đường gấp khúc',
          text: 'Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng của nó.',
        },
        {
          type: 'p',
          text: 'Đường gấp khúc có các đoạn 125 cm, 380 cm, 300 cm dài: 125 + 380 + 300 = 805 (cm).',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Hình tứ giác',
          text: 'Hình tứ giác có 4 cạnh. Khi đếm, em nhớ đếm cả những hình được ghép từ nhiều ô.',
        },
      ],
    },
    {
      heading: 'Khối lượng và dung tích',
      blocks: [
        {
          type: 'p',
          text: 'Cân thăng bằng thì hai đĩa cân nặng bằng nhau. Em cộng các quả cân để biết vật nặng bao nhiêu.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tính với số đo',
          text: 'Em tính như với số bình thường, rồi viết thêm đơn vị. Ví dụ: 5 l + 15 l = 20 l. 7 kg − 3 kg = 4 kg.',
        },
      ],
    },
    {
      heading: 'Đồng hồ và lịch',
      blocks: [
        {
          type: 'table',
          head: ['Buổi', 'Còn gọi là'],
          rows: [
            ['2 giờ 15 phút chiều', '14 giờ 15 phút'],
            ['5 giờ 30 phút chiều', '17 giờ 30 phút'],
            ['7 giờ 15 phút tối', '19 giờ 15 phút'],
            ['9 giờ tối', '21 giờ'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Xem lịch',
          text: 'Một tuần có 7 ngày. Cứ thêm 7 ngày thì lại về thứ cũ.',
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
        'Ốc sên bò theo đường gấp khúc ABCD. AB = 125 cm, BC = 380 cm, CD = 300 cm. Ốc sên bò bao nhiêu xăng-ti-mét?',
      steps: ['Em cộng độ dài ba đoạn thẳng.', '125 + 380 + 300 = 805.'],
      answer: 'Ốc sên bò 805 cm.',
    },
    {
      problem: 'Mỗi tuần nhà An ăn hết 5 kg gạo. Nhà An mua 20 kg gạo. Số gạo đó ăn được mấy tuần?',
      steps: ['Mỗi tuần ăn 5 kg, nên em làm phép chia.', '20 : 5 = 4.'],
      answer: 'Số gạo đó ăn được 4 tuần.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi đồ vật với khối có dạng giống nó.',
      left: ['Quả địa cầu', 'Bể cá', 'Khối Rubik', 'Robot hút bụi'],
      right: ['Khối lập phương', 'Khối trụ', 'Khối cầu', 'Khối hộp chữ nhật'],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: ['Em nghĩ xem đồ vật có mặt tròn hay các mặt phẳng.'],
      solution:
        'Quả địa cầu: khối cầu. Bể cá: khối hộp chữ nhật. Khối Rubik: khối lập phương. Robot hút bụi: khối trụ.',
    },
    {
      type: 'choice',
      prompt:
        'Điểm N nằm trên đoạn thẳng AB. Điểm M không nằm trên đường thẳng AB. Ba điểm nào thẳng hàng?',
      options: ['A, N, M', 'A, N, B', 'N, B, M'],
      answer: 1,
      hints: ['Ba điểm thẳng hàng cùng nằm trên một đường thẳng.'],
      solution:
        'A, N, B cùng nằm trên đường thẳng AB. Điểm M nằm ngoài nên các bộ có M không thẳng hàng.',
    },
    {
      type: 'number',
      prompt:
        'Đường gấp khúc ABCD có AB = 125 cm, BC = 380 cm, CD = 300 cm. Đường gấp khúc dài bao nhiêu?',
      answer: 805,
      unit: 'cm',
      hints: ['Em cộng độ dài ba đoạn thẳng.'],
      solution: '125 + 380 + 300 = 805 (cm).',
    },
    {
      type: 'number',
      prompt:
        'Một hình chữ nhật chia thành 3 ô xếp thành một hàng. Có tất cả bao nhiêu hình tứ giác?',
      answer: 6,
      hints: ['Đếm hình 1 ô, rồi hình 2 ô, rồi hình 3 ô.'],
      solution: 'Có 3 hình 1 ô, 2 hình 2 ô và 1 hình 3 ô. 3 + 2 + 1 = 6 (hình).',
    },
    {
      type: 'number',
      prompt: 'Quả mít nặng 7 kg. Quả dưa hấu nặng 3 kg. Quả mít nặng hơn quả dưa hấu bao nhiêu?',
      answer: 4,
      unit: 'kg',
      hints: ['Nặng hơn bao nhiêu: em làm phép trừ.'],
      solution: '7 − 3 = 4 (kg).',
    },
    {
      type: 'number',
      prompt: 'Can bé có 5 l dầu, can to có 15 l dầu. Cả hai can có bao nhiêu lít dầu?',
      answer: 20,
      unit: 'l',
      hints: ['Cả hai can: em làm phép cộng.'],
      solution: '5 + 15 = 20 (l).',
    },
    {
      type: 'choice',
      prompt: 'Kim ngắn ở giữa số 6 và số 7. Kim dài chỉ số 3. Đồng hồ chỉ mấy giờ?',
      options: ['3 giờ 30 phút', '6 giờ 15 phút', '7 giờ 15 phút', '6 giờ 30 phút'],
      answer: 1,
      hints: ['Kim ngắn chỉ giờ. Kim dài chỉ số 3 là 15 phút.'],
      solution: 'Kim ngắn đã qua số 6, kim dài chỉ số 3: 6 giờ 15 phút.',
    },
    {
      type: 'match',
      prompt: 'Nối hai cách đọc của cùng một giờ.',
      left: ['2 giờ 15 phút chiều', '5 giờ 30 phút chiều', '7 giờ 15 phút tối', '9 giờ tối'],
      right: ['19 giờ 15 phút', '21 giờ', '14 giờ 15 phút', '17 giờ 30 phút'],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: ['Buổi chiều và buổi tối, em cộng thêm 12 vào số giờ.'],
      solution: '2 + 12 = 14. 5 + 12 = 17. 7 + 12 = 19. 9 + 12 = 21. Phần phút giữ nguyên.',
    },
    {
      type: 'choice',
      prompt: 'Ngày 4 tháng 10 là thứ Ba. Ngày 10 tháng 10 là thứ mấy?',
      options: ['Thứ Hai', 'Thứ Tư', 'Chủ nhật', 'Thứ Ba'],
      answer: 0,
      hints: ['Em đếm thêm từng ngày từ ngày 4 đến ngày 10.'],
      solution:
        'Ngày 5 là thứ Tư, ngày 6 thứ Năm, ngày 7 thứ Sáu, ngày 8 thứ Bảy, ngày 9 Chủ nhật, ngày 10 thứ Hai.',
    },
    {
      type: 'number',
      prompt: 'Mỗi tuần nhà An ăn hết 5 kg gạo. Nhà An mua 20 kg gạo. Số gạo đó ăn được mấy tuần?',
      answer: 4,
      unit: 'tuần',
      hints: ['Mỗi tuần 5 kg: em làm phép chia.'],
      solution: '20 : 5 = 4 (tuần).',
    },
    {
      type: 'order',
      prompt:
        'Đố vui: chỉ có can 3 l và can 5 l, làm sao lấy được đúng 1 l nước? Em xếp các bước theo thứ tự.',
      items: [
        'Trong can 3 l còn lại đúng 1 l.',
        'Đổ đầy can 3 l rồi rót hết sang can 5 l.',
        'Rót từ can 3 l sang can 5 l cho đến khi can 5 l đầy.',
        'Đổ đầy can 3 l lần nữa.',
      ],
      answer: [1, 3, 2, 0],
      hints: ['Can 5 l đã có 3 l thì chỉ nhận thêm được 2 l.'],
      solution:
        'Đổ 3 l sang can 5 l. Đổ đầy can 3 l. Rót sang can 5 l thêm 2 l thì đầy. 3 − 2 = 1, can 3 l còn 1 l.',
    },
  ],
  takeaways: [
    'Độ dài đường gấp khúc là tổng độ dài các đoạn thẳng.',
    'Tính với số đo như với số, rồi viết thêm đơn vị.',
    'Buổi chiều và buổi tối, cộng thêm 12 vào số giờ để được cách đọc thứ hai.',
    'Cứ thêm 7 ngày thì lại về thứ cũ.',
  ],
};
