/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thu thập số liệu, phân loại đồ vật theo từng nhóm, kiểm đếm bằng vạch rồi ghi kết quả thành số.',
  intro:
    'Trên bàn có rất nhiều đồ vật lẫn lộn. Làm sao biết mỗi loại có mấy cái? Em hãy thu thập, phân loại rồi kiểm đếm nhé!',
  objectives: [
    'Thu thập số liệu bằng cách quan sát.',
    'Phân loại đồ vật theo hình dạng, màu sắc hoặc loại.',
    'Kiểm đếm bằng vạch và ghi kết quả thành số.',
    'Biết loại nào nhiều nhất, loại nào ít nhất.',
  ],
  sections: [
    {
      heading: 'Ba bước để biết số lượng',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Thu thập: em quan sát tranh, đồ vật quanh em hoặc hỏi các bạn.',
            'Phân loại: em xếp những thứ giống nhau vào cùng một nhóm.',
            'Kiểm đếm: em đếm mỗi nhóm rồi ghi lại kết quả.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Đếm xong đồ vật nào, em đánh dấu đồ vật đó. Như vậy em không đếm sót, không đếm lại.',
        },
      ],
    },
    {
      heading: 'Phân loại theo nhiều cách',
      blocks: [
        {
          type: 'p',
          text: 'Cùng một nhóm đồ vật, em có thể chia theo hình dạng, theo màu sắc hoặc theo loại.',
        },
        {
          type: 'table',
          head: ['Đồ vật', 'Chia theo', 'Các nhóm'],
          rows: [
            ['Viên sỏi', 'Hình dạng', 'Khối lập phương, khối trụ, khối cầu'],
            ['Hạc giấy', 'Màu sắc', 'Đỏ, vàng, xanh'],
            ['Đàn gà', 'Loại', 'Gà trống, gà mái, gà con'],
          ],
        },
      ],
    },
    {
      heading: 'Kiểm đếm bằng vạch',
      blocks: [
        {
          type: 'p',
          text: 'Đếm một đồ vật, em gạch một vạch. Đến đồ vật thứ năm, em gạch chéo qua 4 vạch trước. Như vậy em có một bó 5 vạch.',
        },
        { type: 'widget', name: 'bo-vach' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Mỗi bó có 5 vạch. Em đếm các bó trước: 5, 10, ... rồi đếm thêm các vạch lẻ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ghi vạch kiểm đếm',
    instruction:
      'Chạm vào từng đồ vật: mỗi lần chạm, một vạch được ghi vào hàng của loại đó. Chạm lại để bỏ vạch. Đếm hết, em chạm "Đọc bảng kiểm đếm" và trả lời câu hỏi.',
  },
  examples: [
    {
      problem: 'Giỏ có các quả: 🍎 🍊 🍎 🍎 🍊 🍌 🍎 🍊. Mỗi loại có mấy quả?',
      steps: [
        'Phân loại: táo, cam, chuối.',
        'Đếm quả táo: một, hai, ba, bốn.',
        'Đếm quả cam: một, hai, ba.',
        'Đếm quả chuối: một.',
      ],
      answer: 'Có 4 quả táo, 3 quả cam, 1 quả chuối.',
    },
    {
      problem:
        'Bảng kiểm đếm bóng: bóng đỏ có 1 bó 5 vạch và 2 vạch, bóng xanh có 4 vạch. Bóng nào nhiều hơn? Nhiều hơn mấy quả?',
      steps: [
        'Bóng đỏ: 5 và 2 là 7 quả.',
        'Bóng xanh: 4 quả.',
        'So sánh: 7 > 4, nên bóng đỏ nhiều hơn.',
        'Lấy số lớn trừ số bé: 7 − 4 = 3.',
      ],
      answer: 'Bóng đỏ nhiều hơn bóng xanh 3 quả.',
    },
  ],
  practice: [
    {
      type: 'count',
      prompt: 'Em đếm các ngôi sao rồi ghi kết quả. Có mấy ngôi sao?',
      picture: 'star',
      answer: 7,
      choices: [5, 6, 7, 8],
      hints: ['Chạm từng ngôi sao và đếm to.'],
      solution: 'Đếm: một, hai, ba, bốn, năm, sáu, bảy. Có 7 ngôi sao.',
    },
    {
      type: 'number',
      prompt: 'Có các quả: 🍌 🍎 🍌 🍊 🍌 🍎 🍌. Có mấy quả chuối?',
      answer: 4,
      hints: ['Em chỉ đếm các quả chuối, bỏ qua táo và cam.'],
      solution: 'Đếm quả chuối: một, hai, ba, bốn. Có 4 quả chuối.',
    },
    {
      type: 'order',
      prompt: 'Muốn biết số lượng mỗi loại, em làm theo thứ tự nào?',
      items: ['Kiểm đếm', 'Thu thập', 'Phân loại'],
      answer: [1, 2, 0],
      hints: ['Em phải có đồ vật trước, rồi mới xếp nhóm.'],
      solution: 'Thứ tự là: thu thập, phân loại, kiểm đếm.',
    },
    {
      type: 'choice',
      prompt: 'Em muốn phân loại bút chì theo màu. Em làm thế nào?',
      options: [
        'Xếp bút cùng màu vào một nhóm',
        'Xếp bút dài vào một nhóm',
        'Xếp tất cả bút vào một nhóm',
      ],
      answer: 0,
      hints: ['Phân loại theo màu thì em nhìn vào màu của bút.'],
      solution: 'Bút cùng màu xếp vào một nhóm.',
    },
    {
      type: 'choice',
      prompt: 'Em đã có 4 vạch. Em đếm thêm một đồ vật nữa. Em ghi thế nào?',
      options: ['Gạch chéo qua 4 vạch', 'Xoá hết các vạch', 'Không ghi gì thêm'],
      answer: 0,
      hints: ['Một bó có mấy vạch?'],
      solution: 'Vạch thứ năm gạch chéo qua 4 vạch trước, thành một bó 5 vạch.',
    },
    {
      type: 'match',
      prompt: 'Mai gấp hạc giấy. Nối bảng kiểm đếm mỗi màu với số con hạc.',
      left: ['Đỏ: 1 bó 5 vạch và 2 vạch', 'Vàng: 1 bó 5 vạch và 3 vạch', 'Xanh: 1 bó 5 vạch'],
      right: ['8 con', '5 con', '7 con'],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 1],
      ],
      hints: ['Một bó là 5. Em đếm thêm các vạch lẻ.'],
      solution: 'Đỏ: 5 và 2 là 7 con. Vàng: 5 và 3 là 8 con. Xanh: 5 con.',
    },
    {
      type: 'choice',
      prompt:
        'Hạc giấy của Mai. Đỏ: 1 bó 5 vạch và 2 vạch. Vàng: 1 bó 5 vạch và 3 vạch. Xanh: 1 bó 5 vạch. Màu nào có ít hạc nhất?',
      options: ['Đỏ', 'Vàng', 'Xanh'],
      answer: 2,
      hints: ['Màu nào có ít vạch nhất?'],
      solution: 'Đỏ có 7 con, vàng có 8 con, xanh có 5 con. 5 < 7 < 8. Hạc màu xanh ít nhất.',
    },
    {
      type: 'number',
      prompt:
        'Quạ đen nhặt sỏi: 6 viên khối lập phương, 5 viên khối trụ, 8 viên khối cầu. Quạ có tất cả mấy viên sỏi?',
      answer: 19,
      hints: ['Em cộng số viên của cả ba nhóm.', 'Tính 6 + 5 trước.'],
      solution: '6 + 5 + 8 = 19. Quạ có 19 viên sỏi.',
    },
    {
      type: 'choice',
      prompt: 'Đàn gà có 2 gà trống, 7 gà mái, 9 gà con. Loại gà nào nhiều nhất?',
      options: ['Gà trống', 'Gà mái', 'Gà con'],
      answer: 2,
      hints: ['Em so sánh ba số 2, 7, 9.'],
      solution: '2 < 7 < 9. Gà con nhiều nhất.',
    },
  ],
  takeaways: [
    'Muốn biết số lượng, em thu thập, phân loại rồi kiểm đếm.',
    'Có thể phân loại theo hình dạng, màu sắc hoặc loại.',
    'Kiểm đếm bằng vạch: mỗi bó có 5 vạch.',
    'So sánh các số để biết loại nào nhiều nhất, ít nhất.',
  ],
};
