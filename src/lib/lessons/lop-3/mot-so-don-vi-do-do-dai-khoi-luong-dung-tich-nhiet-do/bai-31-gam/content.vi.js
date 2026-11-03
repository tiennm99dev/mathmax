/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Gam là đơn vị đo khối lượng, viết tắt là g: 1 kg = 1 000 g. Em đọc số gam trên cân đĩa, cân đồng hồ và tính với số đo gam.',
  intro:
    'Một gói hạt tiêu rất nhẹ, cân bằng ki-lô-gam không tiện. Muốn cân vật nhẹ, người ta dùng gam. Em đặt đồ lên cân và đọc số gam nhé!',
  objectives: [
    'Biết gam là đơn vị đo khối lượng, viết tắt là g.',
    'Nhớ 1 kg = 1 000 g.',
    'Đọc số gam trên cân và tính với số đo gam.',
  ],
  sections: [
    {
      heading: 'Gam',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Gam',
          text: 'Gam là một đơn vị đo khối lượng. Gam viết tắt là g.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 kg = 1 000 g.',
        },
        {
          type: 'p',
          text: 'Em cân vật nhẹ bằng gam, như gói hạt tiêu, quả trứng. Em cân vật nặng bằng ki-lô-gam, như bao gạo.',
        },
      ],
    },
    {
      heading: 'Đọc số gam trên cân',
      blocks: [
        {
          type: 'p',
          text: 'Cân đĩa thăng bằng thì hai đĩa nặng bằng nhau. Em cộng các quả cân ở một đĩa.',
        },
        {
          type: 'table',
          head: ['Quả cân', 'Gói hàng nặng'],
          rows: [
            ['500 g', '500 g'],
            ['100 g và 50 g', '150 g'],
            ['20 g và 20 g', '40 g'],
          ],
        },
        {
          type: 'p',
          text: 'Cân đồng hồ có kim. Kim chỉ vào số nào, vật nặng bấy nhiêu gam.',
        },
      ],
    },
    {
      heading: 'Tính với gam',
      blocks: [
        {
          type: 'p',
          text: 'Em tính như với các số, rồi viết thêm g ở kết quả.',
        },
        {
          type: 'table',
          head: ['Phép tính', 'Kết quả'],
          rows: [
            ['250 g + 300 g', '550 g'],
            ['740 g − 360 g', '380 g'],
            ['15 g × 4', '60 g'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Cân đồng hồ',
    instruction:
      'Em chạm vào đồ vật để đặt lên đĩa cân, chạm lần nữa để nhấc ra. Xem kim quay và đọc số gam. Làm kim chỉ đúng số đề bài yêu cầu. Đố em: trả lời 8 câu hỏi.',
  },
  examples: [
    {
      problem:
        'Cân đĩa thăng bằng. Một đĩa có gói mì chính. Đĩa kia có quả cân 100 g và quả cân 50 g. Gói mì chính nặng bao nhiêu gam?',
      steps: ['Cân thăng bằng nên hai đĩa nặng bằng nhau.', '100 + 50 = 150.'],
      answer: 'Gói mì chính nặng 150 g.',
    },
    {
      problem:
        'Túi táo nặng 900 g, gói bột mì nặng 300 g. Túi táo nặng hơn gói bột mì bao nhiêu gam?',
      steps: ['Muốn tìm số nặng hơn, em lấy số lớn trừ số bé.', '900 − 300 = 600.'],
      answer: 'Túi táo nặng hơn gói bột mì 600 g.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: '1 kg bằng bao nhiêu gam?',
      answer: 1000,
      unit: 'g',
      hints: ['Gam rất nhẹ, nên 1 kg gồm rất nhiều gam. Số gam này có bốn chữ số.'],
      solution: '1 kg = 1 000 g.',
    },
    {
      type: 'number',
      prompt:
        'Cân đĩa thăng bằng. Một đĩa có gói muối. Đĩa kia có hai quả cân 200 g. Gói muối nặng bao nhiêu gam?',
      answer: 400,
      unit: 'g',
      hints: ['Cân thăng bằng thì hai đĩa nặng bằng nhau.', 'Em tính 200 + 200.'],
      solution: '200 + 200 = 400. Gói muối nặng 400 g.',
    },
    {
      type: 'number',
      prompt: 'Tính: 620 g − 280 g.',
      answer: 340,
      unit: 'g',
      hints: ['Em trừ như với các số: 620 − 280.'],
      solution: '620 − 280 = 340. Vậy 620 g − 280 g = 340 g.',
    },
    {
      type: 'number',
      prompt: 'Tính: 25 g × 3.',
      answer: 75,
      unit: 'g',
      hints: ['Em nhân như với các số: 25 × 3.'],
      solution: '25 × 3 = 75. Vậy 25 g × 3 = 75 g.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi con vật với cân nặng thích hợp.',
      left: ['Con chim', 'Con gà', 'Con chó', 'Con bò'],
      right: ['200 g', '2 kg', '20 kg', '200 kg'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Con vật càng to thì càng nặng.', 'Con nhỏ nhất ứng với số đo bằng gam.'],
      solution: 'Con chim 200 g, con gà 2 kg, con chó 20 kg, con bò 200 kg.',
    },
    {
      type: 'choice',
      prompt: 'Vật nào nặng hơn?',
      options: ['Túi đường 1 kg', 'Túi muối 900 g', 'Hai vật nặng bằng nhau'],
      answer: 0,
      hints: ['Em đổi 1 kg ra gam rồi so sánh.'],
      solution: '1 kg = 1 000 g. Vì 1 000 g > 900 g nên túi đường nặng hơn.',
    },
    {
      type: 'order',
      prompt: 'Xếp các khối lượng theo thứ tự từ nhẹ đến nặng.',
      items: ['1 kg', '750 g', '150 g', '900 g'],
      answer: [2, 1, 3, 0],
      hints: ['Em đổi hết ra gam rồi so sánh.'],
      solution:
        '1 kg = 1 000 g. 150 g < 750 g < 900 g < 1 000 g. Thứ tự: 150 g, 750 g, 900 g, 1 kg.',
    },
    {
      type: 'number',
      prompt: 'Lọ có 1 kg đường. Mẹ dùng 300 g. Lọ còn lại bao nhiêu gam đường?',
      answer: 700,
      unit: 'g',
      hints: ['Em đổi 1 kg ra gam trước.', 'Rồi em lấy số gam đó trừ đi 300.'],
      solution: '1 kg = 1 000 g. 1 000 − 300 = 700. Lọ còn 700 g đường.',
    },
    {
      type: 'number',
      prompt: 'Có 4 quả mận như nhau, mỗi quả nặng 20 g. Cả 4 quả nặng bao nhiêu gam?',
      answer: 80,
      unit: 'g',
      hints: ['4 quả bằng nhau: em làm phép nhân.'],
      solution: '20 × 4 = 80. Cả 4 quả nặng 80 g.',
    },
  ],
  takeaways: [
    'Gam viết tắt là g.',
    '1 kg = 1 000 g.',
    'Cân đĩa thăng bằng thì hai đĩa nặng bằng nhau.',
  ],
};
