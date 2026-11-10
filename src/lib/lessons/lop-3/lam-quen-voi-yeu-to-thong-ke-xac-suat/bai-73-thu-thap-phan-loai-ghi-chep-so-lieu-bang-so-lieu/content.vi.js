/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thu thập, phân loại, ghi chép số liệu rồi lập bảng số liệu. Đọc bảng số liệu để biết số lượng mỗi loại, loại nào nhiều nhất, ít nhất.',
  intro:
    'Lớp 3A góp đồ dùng học tập cho kế hoạch nhỏ: vở, bút chì, bút mực. Làm sao biết mỗi loại góp được bao nhiêu? Em cùng thu thập, phân loại, ghi chép và lập bảng số liệu nhé!',
  objectives: [
    'Thu thập, phân loại và ghi chép số liệu.',
    'Biết bảng số liệu gồm hàng tên các loại và hàng số lượng.',
    'Đọc bảng số liệu: số lượng mỗi loại, loại nhiều nhất, loại ít nhất.',
  ],
  sections: [
    {
      heading: 'Thu thập, phân loại, ghi chép số liệu',
      blocks: [
        {
          type: 'p',
          text: 'Lớp 3A mang đồ dùng góp lên bàn cô giáo. Các bạn làm theo ba bước.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Thu thập: gom tất cả đồ dùng các bạn góp.',
            'Phân loại: xếp riêng vở, bút chì, bút mực thành từng nhóm.',
            'Ghi chép: đếm mỗi nhóm rồi ghi số lượng lại.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Mỗi đồ vật chỉ đếm một lần. Đếm xong nhóm nào, em ghi ngay số của nhóm đó.',
        },
        {
          type: 'p',
          text: 'Em cũng có thể vừa đếm vừa gạch vạch kiểm đếm, rồi đếm số vạch.',
        },
      ],
    },
    {
      heading: 'Bảng số liệu',
      blocks: [
        {
          type: 'p',
          text: 'Các bạn ghi kết quả vào một bảng. Bảng đó gọi là bảng số liệu.',
        },
        {
          type: 'table',
          caption: 'Số đồ dùng học tập lớp 3A góp được',
          head: ['Đồ dùng', 'Vở', 'Bút chì', 'Bút mực'],
          rows: [['Số lượng', '18', '29', '6']],
        },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Hàng trên của bảng số liệu ghi tên các loại. Hàng dưới ghi số lượng của từng loại. Mỗi cột cho biết số lượng của một loại.',
        },
        {
          type: 'p',
          text: 'Đọc bảng: lớp 3A góp được 18 quyển vở, 29 cái bút chì và 6 cái bút mực.',
        },
        {
          type: 'p',
          text: 'So sánh các số: 29 lớn nhất, 6 bé nhất. Bút chì góp được nhiều nhất, bút mực ít nhất.',
        },
      ],
    },
    {
      heading: 'Bảng số liệu có nhiều hàng',
      blocks: [
        {
          type: 'p',
          text: 'Một cửa hàng ghi số truyện bán được trong ba tháng đầu năm.',
        },
        {
          type: 'table',
          caption: 'Số truyện bán được (quyển)',
          head: ['Loại truyện', 'Tháng 1', 'Tháng 2', 'Tháng 3'],
          rows: [
            ['Truyện khoa học', '280', '200', '315'],
            ['Truyện tranh', '400', '540', '612'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Mỗi hàng cho biết một loại truyện. Mỗi cột cho biết một tháng. Ô ở giữa hàng và cột là số truyện loại đó bán trong tháng đó.',
        },
        {
          type: 'p',
          text: 'Ví dụ: hàng Truyện tranh, cột Tháng 2 ghi 540. Tháng 2 cửa hàng bán được 540 quyển truyện tranh.',
        },
      ],
    },
  ],
  explore: {
    title: 'Phân loại để điền bảng',
    instruction:
      'Em nhìn đồ vật ở giữa và chạm vào nhóm của nó. Mỗi lần xếp đúng, bảng số liệu tự điền thêm. Xếp hết, em chạm "Đọc bảng số liệu" và trả lời câu hỏi.',
  },
  examples: [
    {
      problem:
        'Một trang trại có: bò 45 con, gà 120 con, lợn 78 con, dê 36 con. Em lập bảng số liệu. Con vật nào được nuôi nhiều nhất, ít nhất?',
      steps: [
        'Hàng trên ghi: Con vật, Bò, Gà, Lợn, Dê.',
        'Hàng dưới ghi: Số con, 45, 120, 78, 36.',
        'So sánh: 36 < 45 < 78 < 120.',
      ],
      answer: 'Gà được nuôi nhiều nhất (120 con). Dê được nuôi ít nhất (36 con).',
    },
    {
      problem:
        'Đọc bảng số truyện bán được ở trên. Tháng 1 cửa hàng bán được tất cả bao nhiêu quyển truyện?',
      steps: [
        'Em nhìn cột Tháng 1: truyện khoa học 280 quyển, truyện tranh 400 quyển.',
        'Cộng lại: 280 + 400 = 680.',
      ],
      answer: 'Tháng 1 cửa hàng bán được 680 quyển truyện.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Em thu thập bóng trong hộp đồ chơi. Có mấy quả bóng?',
      picture: 'ball',
      answer: 7,
      choices: [5, 6, 7, 8],
      hints: ['Chạm từng quả bóng và đếm, mỗi quả một lần.'],
      solution: 'Đếm: một, hai, ba, bốn, năm, sáu, bảy. Có 7 quả bóng.',
    },
    {
      type: 'choice',
      prompt:
        'Đồng hồ treo tường hình tròn. Khi phân loại đồ vật theo hình dạng, em xếp nó vào nhóm nào?',
      options: ['Hình tròn', 'Hình tam giác', 'Hình vuông'],
      answer: 0,
      hints: ['Mặt đồng hồ có hình gì?'],
      solution: 'Mặt đồng hồ hình tròn, nên em xếp vào nhóm Hình tròn.',
    },
    {
      type: 'choice',
      prompt: 'Bảng số liệu: Vở 18, Bút chì 29, Bút mực 6. Lớp 3A góp được bao nhiêu bút chì?',
      options: ['29', '18', '6', '92'],
      answer: 0,
      hints: ['Em tìm cột Bút chì, rồi đọc số ở hàng Số lượng.'],
      solution: 'Cột Bút chì ghi 29. Lớp 3A góp được 29 cái bút chì.',
    },
    {
      type: 'choice',
      prompt: 'Bảng số liệu: Vở 18, Bút chì 29, Bút mực 6. Đồ dùng nào góp được ít nhất?',
      options: ['Bút mực', 'Vở', 'Bút chì'],
      answer: 0,
      hints: ['Em tìm số bé nhất trong ba số 18, 29, 6.'],
      solution: 'Số bé nhất là 6, ở cột Bút mực. Bút mực góp được ít nhất.',
    },
    {
      type: 'number',
      prompt:
        'Bảng số liệu: Vở 18, Bút chì 29, Bút mực 6. Lớp 3A góp được tất cả bao nhiêu đồ dùng?',
      answer: 53,
      unit: 'đồ dùng',
      hints: ['Em cộng ba số ở hàng Số lượng.', 'Cộng 18 + 29 trước, rồi cộng thêm 6.'],
      solution: '18 + 29 = 47, 47 + 6 = 53. Lớp 3A góp được 53 đồ dùng.',
    },
    {
      type: 'order',
      prompt:
        'Trang trại nuôi: bò 45 con, gà 120 con, lợn 78 con, dê 36 con. Xếp các con vật theo số con, từ ít đến nhiều.',
      items: ['Bò', 'Gà', 'Lợn', 'Dê'],
      answer: [3, 0, 2, 1],
      hints: ['Em so sánh bốn số 45, 120, 78, 36.', 'Số bé nhất là 36.'],
      solution: '36 < 45 < 78 < 120. Thứ tự: Dê, Bò, Lợn, Gà.',
    },
    {
      type: 'number',
      prompt: 'Trang trại nuôi 120 con gà và 45 con bò. Số gà nhiều hơn số bò bao nhiêu con?',
      answer: 75,
      unit: 'con',
      hints: ['Nhiều hơn bao nhiêu: em lấy số lớn trừ số bé.'],
      solution: '120 − 45 = 75. Số gà nhiều hơn số bò 75 con.',
    },
    {
      type: 'match',
      prompt:
        'Bảng số truyện tranh bán được: Tháng 1: 400, Tháng 2: 540, Tháng 3: 612. Nối mỗi tháng với số truyện tranh bán được.',
      left: ['Tháng 1', 'Tháng 2', 'Tháng 3'],
      right: ['612 quyển', '400 quyển', '540 quyển'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Em đọc số ghi dưới cột của từng tháng.'],
      solution: 'Tháng 1: 400 quyển. Tháng 2: 540 quyển. Tháng 3: 612 quyển.',
    },
    {
      type: 'number',
      prompt:
        'Tháng 2, cửa hàng bán được 200 quyển truyện khoa học và 540 quyển truyện tranh. Tháng 2 bán được tất cả bao nhiêu quyển?',
      answer: 740,
      unit: 'quyển',
      hints: ['Em cộng hai số ở cột Tháng 2.'],
      solution: '200 + 540 = 740. Tháng 2 cửa hàng bán được 740 quyển truyện.',
    },
  ],
  takeaways: [
    'Ba bước: thu thập, phân loại, ghi chép số liệu.',
    'Bảng số liệu có hàng tên các loại và hàng số lượng.',
    'Đọc bảng: tìm cột của loại cần biết, rồi đọc số.',
    'So sánh các số trong bảng để biết loại nào nhiều nhất, ít nhất.',
  ],
};
