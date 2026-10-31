/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary: 'Nói đúng vị trí của đồ vật: trên, dưới, bên trái, bên phải, trước, sau và ở giữa.',
  intro:
    'Quả bóng ở đâu? Ở trên bàn hay ở dưới bàn? Hôm nay em học cách nói vị trí của đồ vật nhé!',
  objectives: [
    'Nói được vị trí trên, dưới của đồ vật.',
    'Nói được vị trí bên trái, bên phải.',
    'Nói được vị trí trước, sau và ở giữa.',
  ],
  sections: [
    {
      heading: 'Trên, dưới',
      blocks: [
        {
          type: 'p',
          text: 'Con mèo nằm ở trên cái ghế. Quả bóng ở dưới cái ghế.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Em nhớ',
          text: 'Trên là ở cao hơn. Dưới là ở thấp hơn.',
        },
      ],
    },
    {
      heading: 'Bên trái, bên phải',
      blocks: [
        {
          type: 'p',
          text: 'Em giơ tay phải lên, rồi giơ tay trái lên. Phía tay phải là bên phải. Phía tay trái là bên trái.',
        },
        {
          type: 'p',
          text: 'Khi nhìn tranh, đồ vật ở phía tay trái của em là ở bên trái. Đồ vật ở phía tay phải của em là ở bên phải.',
        },
        {
          type: 'table',
          head: ['Bên trái', 'Ở giữa', 'Bên phải'],
          rows: [['cái tủ', 'cái bàn', 'chậu cây']],
          caption: 'Cái bàn ở giữa cái tủ và chậu cây.',
        },
      ],
    },
    {
      heading: 'Trước, sau',
      blocks: [
        {
          type: 'p',
          text: 'Các bạn xếp hàng đi vào lớp. Bạn đứng gần cửa hơn là bạn đứng trước.',
        },
        {
          type: 'p',
          text: 'Thỏ đứng trước mèo. Mèo đứng sau thỏ.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ở giữa',
          text: 'Gà con đứng giữa thỏ và mèo: thỏ ở phía trước, mèo ở phía sau gà con.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đặt đồ vật',
    instruction:
      'Chọn "Căn phòng" hoặc "Xếp hàng". Ở trò "Đặt theo lệnh", em đọc lệnh rồi chạm vào ô trống đúng chỗ. Ở trò "Ở đâu?", em nhìn tranh rồi chọn câu đúng.',
  },
  examples: [
    {
      problem: 'Quyển sách ở trên bàn, cái cặp ở dưới bàn. Cái gì ở cao hơn?',
      steps: ['Ở trên là ở cao hơn.', 'Quyển sách ở trên bàn.'],
      answer: 'Quyển sách ở cao hơn cái cặp.',
    },
    {
      problem:
        'Ba bạn ngồi thành hàng ngang: Nam, Mai, Việt. Nam ở bên trái, Việt ở bên phải. Ai ngồi ở giữa?',
      steps: ['Nam ở một đầu, Việt ở đầu kia.', 'Bạn còn lại ngồi giữa hai bạn.'],
      answer: 'Mai ngồi ở giữa Nam và Việt.',
    },
    {
      problem: 'Hàng đi vào cửa: thỏ, gà con, mèo. Ai đứng trước gà con?',
      steps: ['Thỏ đứng gần cửa nhất.', 'Bạn gần cửa hơn là bạn đứng trước.'],
      answer: 'Thỏ đứng trước gà con.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Con chim đậu trên cành cây. Con mèo nằm dưới gốc cây. Con nào ở trên?',
      options: ['Con chim', 'Con mèo'],
      answer: 0,
      hints: ['Ở trên là ở cao hơn.'],
      solution: 'Con chim đậu trên cành cây, ở cao hơn. Con chim ở trên.',
    },
    {
      type: 'choice',
      prompt: 'Trên kệ có: quả táo, quả cam, quả chuối, xếp từ trái sang phải. Quả nào ở giữa?',
      options: ['Quả táo', 'Quả cam', 'Quả chuối'],
      answer: 1,
      hints: ['Quả táo ở bên trái, quả chuối ở bên phải.'],
      solution: 'Quả cam nằm giữa quả táo và quả chuối.',
    },
    {
      type: 'choice',
      prompt: 'Hàng xếp: Lan, Hà, Minh. Lan đứng đầu hàng. Ai đứng sau Hà?',
      options: ['Lan', 'Minh'],
      answer: 1,
      hints: ['Lan đứng đầu hàng, tức là đứng trước nhất.', 'Bạn đứng sau Hà là bạn đứng cuối.'],
      solution: 'Lan đứng trước Hà, Minh đứng sau Hà.',
    },
    {
      type: 'choice',
      prompt: 'Cục tẩy ở phía tay phải của em. Cục tẩy ở bên nào của em?',
      options: ['Bên trái', 'Bên phải'],
      answer: 1,
      hints: ['Em giơ tay phải lên và nhìn theo tay.'],
      solution: 'Cục tẩy ở phía tay phải, nên ở bên phải em.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi từ với từ chỉ vị trí ngược lại.',
      left: ['Trên', 'Trái', 'Trước'],
      right: ['Sau', 'Dưới', 'Phải'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Trên và dưới đi cùng nhau.'],
      solution: 'Trên – dưới, trái – phải, trước – sau.',
    },
    {
      type: 'order',
      prompt:
        'Thỏ đứng đầu hàng, mèo đứng cuối hàng, gà con đứng giữa. Xếp các bạn từ đầu hàng đến cuối hàng.',
      items: ['Mèo', 'Thỏ', 'Gà con'],
      answer: [1, 2, 0],
      hints: ['Bạn đứng đầu hàng xếp trước tiên.'],
      solution: 'Thứ tự: thỏ, gà con, mèo.',
    },
    {
      type: 'multi',
      prompt: 'Quả bóng ở dưới cái bàn. Câu nào đúng?',
      options: [
        'Cái bàn ở trên quả bóng',
        'Quả bóng ở trên cái bàn',
        'Quả bóng ở thấp hơn mặt bàn',
      ],
      answers: [0, 2],
      hints: ['Quả bóng ở dưới thì cái bàn ở đâu?'],
      solution: 'Quả bóng ở dưới bàn, thấp hơn mặt bàn. Vậy cái bàn ở trên quả bóng.',
    },
  ],
  takeaways: [
    'Trên – dưới: ở cao hơn – ở thấp hơn.',
    'Bên trái – bên phải: phía tay trái – phía tay phải của em.',
    'Trước – sau: khi xếp hàng, bạn gần đầu hàng đứng trước.',
    'Ở giữa: nằm giữa hai đồ vật.',
  ],
};
