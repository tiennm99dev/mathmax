/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Nhận biết các tờ tiền Việt Nam từ 1 000 đồng đến 100 000 đồng, đổi tiền, tính tiền khi mua hàng và tính tiền trả lại.',
  intro:
    'Đi siêu thị, em cần biết đọc tờ tiền, cộng giá các món hàng và tính tiền cô bán hàng trả lại. Em vào siêu thị ảo mua hàng nhé!',
  objectives: [
    'Nhận biết và đọc được các tờ tiền từ 1 000 đồng đến 100 000 đồng.',
    'Đổi một tờ tiền lớn ra các tờ tiền nhỏ hơn.',
    'Tính tiền khi mua hàng và tính tiền trả lại.',
  ],
  sections: [
    {
      heading: 'Các tờ tiền Việt Nam',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Đơn vị tiền Việt Nam là đồng.',
        },
        {
          type: 'table',
          head: ['Tờ tiền', 'Đọc là'],
          rows: [
            ['1 000 đồng', 'Một nghìn đồng'],
            ['2 000 đồng', 'Hai nghìn đồng'],
            ['5 000 đồng', 'Năm nghìn đồng'],
            ['10 000 đồng', 'Mười nghìn đồng'],
            ['20 000 đồng', 'Hai mươi nghìn đồng'],
            ['50 000 đồng', 'Năm mươi nghìn đồng'],
            ['100 000 đồng', 'Một trăm nghìn đồng'],
          ],
        },
        {
          type: 'p',
          text: 'Em so sánh tiền như so sánh các số: 50 000 đồng nhiều hơn 20 000 đồng.',
        },
      ],
    },
    {
      heading: 'Đổi tiền',
      blocks: [
        { type: 'p', text: 'Một tờ tiền lớn đổi được nhiều tờ tiền nhỏ có cùng số tiền.' },
        {
          type: 'table',
          head: ['Tờ tiền lớn', 'Đổi được'],
          rows: [
            ['1 tờ 50 000 đồng', '5 tờ 10 000 đồng'],
            ['1 tờ 50 000 đồng', '1 tờ 10 000 đồng và 2 tờ 20 000 đồng'],
            ['1 tờ 100 000 đồng', '2 tờ 50 000 đồng'],
          ],
        },
      ],
    },
    {
      heading: 'Tính tiền, trả tiền',
      blocks: [
        { type: 'p', text: 'Mua nhiều món hàng: em cộng giá tiền các món.' },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Tiền trả lại bằng tiền em đã đưa trừ đi số tiền phải trả.',
        },
        {
          type: 'p',
          text: 'Mua túi cam giá 22 000 đồng, em đưa tờ 50 000 đồng. Cô trả lại: 50 000 − 22 000 = 28 000 đồng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Siêu thị ảo',
    instruction:
      'Em chọn một món hàng. Chạm vào các tờ tiền trong ví để đưa cho cô bán hàng, chạm vào tờ đã đưa để cất lại. Đủ tiền thì bấm Trả tiền, rồi chọn số tiền cô trả lại. Đố em: trả lời 8 câu hỏi.',
  },
  examples: [
    {
      problem:
        'Mẹ mua chanh hết 3 000 đồng và mua hành hết 2 000 đồng. Mẹ đưa cô bán hàng tờ 10 000 đồng. Cô trả lại mẹ bao nhiêu tiền?',
      steps: [
        'Mẹ phải trả: 3 000 + 2 000 = 5 000 (đồng).',
        'Cô trả lại: 10 000 − 5 000 = 5 000 (đồng).',
      ],
      answer: 'Cô bán hàng trả lại mẹ 5 000 đồng.',
    },
    {
      problem:
        'Nam và Mai mua nguyên liệu làm nước chanh hết 20 000 đồng, 14 000 đồng và 10 000 đồng. Hai bạn bán nước chanh được 80 000 đồng. Sau khi trừ tiền mua nguyên liệu, hai bạn còn bao nhiêu tiền?',
      steps: [
        'Tiền mua nguyên liệu: 20 000 + 14 000 + 10 000 = 44 000 (đồng).',
        'Còn lại: 80 000 − 44 000 = 36 000 (đồng).',
      ],
      answer: 'Hai bạn còn 36 000 đồng.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi tờ tiền với cách đọc.',
      left: ['2 000 đồng', '20 000 đồng', '5 000 đồng', '50 000 đồng'],
      right: ['Hai nghìn đồng', 'Hai mươi nghìn đồng', 'Năm nghìn đồng', 'Năm mươi nghìn đồng'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Ba chữ số 0 ở cuối là nghìn. Có thêm một chữ số nữa ở đầu là mấy chục nghìn.'],
      solution:
        '2 000 đồng: hai nghìn đồng; 20 000 đồng: hai mươi nghìn đồng; 5 000 đồng: năm nghìn đồng; 50 000 đồng: năm mươi nghìn đồng.',
    },
    {
      type: 'order',
      prompt: 'Xếp các tờ tiền theo thứ tự từ ít tiền đến nhiều tiền.',
      items: ['20 000 đồng', '5 000 đồng', '100 000 đồng', '50 000 đồng', '2 000 đồng'],
      answer: [4, 1, 0, 3, 2],
      hints: ['Em so sánh như so sánh các số: số nào có ít chữ số hơn thì bé hơn.'],
      solution: '2 000 < 5 000 < 20 000 < 50 000 < 100 000.',
    },
    {
      type: 'number',
      prompt:
        'Mẹ mua chanh hết 3 000 đồng, mua hành hết 2 000 đồng. Mẹ đưa tờ 10 000 đồng. Cô bán hàng trả lại mẹ bao nhiêu đồng?',
      answer: 5000,
      unit: 'đồng',
      hints: ['Em tính số tiền mẹ phải trả trước.', 'Rồi lấy 10 000 trừ đi số tiền đó.'],
      solution: '3 000 + 2 000 = 5 000. 10 000 − 5 000 = 5 000. Cô trả lại mẹ 5 000 đồng.',
    },
    {
      type: 'number',
      prompt: '1 tờ 50 000 đồng đổi được mấy tờ 10 000 đồng?',
      answer: 5,
      unit: 'tờ',
      hints: ['Em đếm thêm: 10 000, 20 000, … cho đến 50 000.'],
      solution: '10 000 × 5 = 50 000. Đổi được 5 tờ 10 000 đồng.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các cách đưa đủ đúng 10 000 đồng.',
      options: [
        '2 tờ 5 000 đồng',
        '5 tờ 2 000 đồng',
        '1 tờ 5 000 đồng và 2 tờ 2 000 đồng',
        '10 tờ 1 000 đồng',
        '1 tờ 5 000 đồng và 5 tờ 1 000 đồng',
      ],
      answers: [0, 1, 3, 4],
      hints: ['Em cộng tiền của từng cách rồi so với 10 000.'],
      solution:
        '5 000 + 5 000 = 10 000; 2 000 × 5 = 10 000; 1 000 × 10 = 10 000; 5 000 + 5 000 = 10 000. Riêng 5 000 + 2 000 + 2 000 = 9 000, chưa đủ.',
    },
    {
      type: 'choice',
      prompt:
        'Bóng đèn, cái lược, rô-bốt, quyển sách có giá 10 000, 20 000, 50 000, 100 000 đồng. Bóng đèn rẻ nhất, quyển sách đắt nhất, rô-bốt đắt hơn cái lược. Rô-bốt giá bao nhiêu?',
      options: ['50 000 đồng', '20 000 đồng', '10 000 đồng', '100 000 đồng'],
      answer: 0,
      hints: [
        'Bóng đèn và quyển sách lấy giá rẻ nhất và đắt nhất.',
        'Còn lại hai giá cho rô-bốt và cái lược.',
      ],
      solution:
        'Bóng đèn 10 000 đồng, quyển sách 100 000 đồng. Còn 20 000 và 50 000 đồng; rô-bốt đắt hơn nên rô-bốt giá 50 000 đồng.',
    },
    {
      type: 'number',
      prompt:
        'Đầu mùa, 1 bắp ngô giá 5 000 đồng. Giữa mùa, 5 000 đồng mua được 2 bắp ngô. Giữa mùa, 1 bắp ngô giá bao nhiêu đồng?',
      answer: 2500,
      unit: 'đồng',
      hints: ['2 bắp giá 5 000 đồng. Em chia đều cho 2 bắp.'],
      solution: '5 000 : 2 = 2 500. Giữa mùa, 1 bắp ngô giá 2 500 đồng.',
    },
    {
      type: 'number',
      prompt:
        'Nam và Mai bán nước chanh được 80 000 đồng. Tiền mua nguyên liệu hết 44 000 đồng. Hai bạn còn lại bao nhiêu đồng?',
      answer: 36000,
      unit: 'đồng',
      hints: ['Còn lại: em làm phép trừ.'],
      solution: '80 000 − 44 000 = 36 000. Hai bạn còn 36 000 đồng.',
    },
  ],
  takeaways: [
    'Các tờ tiền: 1 000, 2 000, 5 000, 10 000, 20 000, 50 000, 100 000 đồng.',
    'Mua nhiều món: cộng giá tiền các món.',
    'Tiền trả lại bằng tiền đã đưa trừ đi số tiền phải trả.',
  ],
};
