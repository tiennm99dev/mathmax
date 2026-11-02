/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tìm thành phần chưa biết trong phép cộng, phép trừ: tìm một số hạng, tìm số bị trừ và tìm số trừ, kèm bài toán thực tế.',
  intro:
    'Một số bị che mất trong phép tính! Em đặt các số lên cân đĩa, thử số cho "?" đến khi cân thăng bằng. Em sẽ biết cách tìm số đó thật nhanh.',
  objectives: [
    'Tìm một số hạng khi biết tổng và số hạng kia.',
    'Tìm số bị trừ khi biết hiệu và số trừ.',
    'Tìm số trừ khi biết số bị trừ và hiệu.',
    'Giải bài toán có dùng các cách tìm này.',
  ],
  sections: [
    {
      heading: 'Tìm số hạng',
      blocks: [
        {
          type: 'p',
          text: 'Trong phép cộng 15 + 20 = 35, số 15 và số 20 là số hạng, số 35 là tổng.',
        },
        {
          type: 'p',
          text: 'Từ phép cộng, em có hai phép trừ: 35 − 20 = 15 và 35 − 15 = 20.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tìm một số hạng, ta lấy tổng trừ đi số hạng kia.',
        },
        {
          type: 'p',
          text: '? + 20 = 35. Em tính: 35 − 20 = 15. Số cần tìm là 15.',
        },
      ],
    },
    {
      heading: 'Tìm số bị trừ',
      blocks: [
        {
          type: 'p',
          text: 'Trong phép trừ 39 − 14 = 25, số 39 là số bị trừ, số 14 là số trừ, số 25 là hiệu.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ.',
        },
        {
          type: 'p',
          text: '? − 14 = 25. Em tính: 25 + 14 = 39. Số cần tìm là 39.',
        },
      ],
    },
    {
      heading: 'Tìm số trừ',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu.',
        },
        {
          type: 'p',
          text: '34 − ? = 12. Em tính: 34 − 12 = 22. Số cần tìm là 22.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thử lại',
          text: 'Em thay số vừa tìm vào phép tính. 34 − 22 = 12 là đúng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cân thăng bằng',
    instruction:
      'Chọn việc cần tìm. Chạm các nút để đổi số thử cho dấu "?". Đĩa nặng hơn sẽ thấp xuống. Khi cân thăng bằng, em đã tìm đúng số.',
  },
  examples: [
    {
      problem: 'Tìm số thích hợp: 14 + ? = 28.',
      steps: ['? là một số hạng, 28 là tổng.', 'Lấy tổng trừ đi số hạng kia: 28 − 14 = 14.'],
      answer: 'Số cần tìm là 14.',
    },
    {
      problem: 'Số trừ là 36, hiệu là 25. Tìm số bị trừ.',
      steps: ['Lấy hiệu cộng với số trừ.', '25 + 36 = 61.', 'Thử lại: 61 − 36 = 25.'],
      answer: 'Số bị trừ là 61.',
    },
    {
      problem:
        'Trên bờ có 64 con vịt. Sau khi một số con xuống ao, trên bờ còn 24 con. Có bao nhiêu con vịt xuống ao?',
      steps: [
        'Số vịt xuống ao là số trừ: 64 − ? = 24.',
        'Lấy số bị trừ trừ đi hiệu: 64 − 24 = 40.',
      ],
      answer: 'Có 40 con vịt xuống ao.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: '? + 15 = 25. Số cần tìm là số nào?',
      answer: 10,
      hints: ['Lấy tổng trừ đi số hạng kia.'],
      solution: '25 − 15 = 10.',
    },
    {
      type: 'choice',
      prompt: 'Muốn tìm một số hạng, ta làm thế nào?',
      options: [
        'Lấy tổng trừ đi số hạng kia',
        'Lấy tổng cộng với số hạng kia',
        'Lấy số hạng kia trừ đi tổng',
      ],
      answer: 0,
      hints: ['Thử với 15 + 20 = 35: làm sao tìm lại được 15?'],
      solution: 'Muốn tìm một số hạng, ta lấy tổng trừ đi số hạng kia: 35 − 20 = 15.',
    },
    {
      type: 'number',
      prompt: 'Số hạng thứ hai là 110, tổng là 170. Tìm số hạng thứ nhất.',
      answer: 60,
      hints: ['17 chục trừ 11 chục bằng mấy chục?'],
      solution: '170 − 110 = 60.',
    },
    {
      type: 'number',
      prompt: '? − 26 = 18. Số cần tìm là số nào?',
      answer: 44,
      hints: ['Dấu "?" là số bị trừ.', 'Lấy hiệu cộng với số trừ.'],
      solution: '18 + 26 = 44. Thử lại: 44 − 26 = 18.',
    },
    {
      type: 'number',
      prompt: '64 − ? = 37. Số cần tìm là số nào?',
      answer: 27,
      hints: ['Dấu "?" là số trừ.', 'Lấy số bị trừ trừ đi hiệu.'],
      solution: '64 − 37 = 27. Thử lại: 64 − 27 = 37.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi việc với phép tính đúng, biết 52 − 28 = 24.',
      left: ['Tìm số bị trừ', 'Tìm số trừ', 'Tìm hiệu'],
      right: ['24 + 28', '52 − 24', '52 − 28'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Số bị trừ là 52, số trừ là 28, hiệu là 24.'],
      solution:
        'Số bị trừ = hiệu + số trừ = 24 + 28. Số trừ = số bị trừ − hiệu = 52 − 24. Hiệu = số bị trừ − số trừ = 52 − 28.',
    },
    {
      type: 'choice',
      prompt: 'Số bị trừ là 52, hiệu là 28. Số trừ là số nào?',
      options: ['24', '34', '80', '14'],
      answer: 0,
      hints: ['Lấy số bị trừ trừ đi hiệu.'],
      solution: '52 − 28 = 24. Số trừ là 24.',
    },
    {
      type: 'number',
      prompt:
        'Hai bến có 65 chiếc thuyền. Bến thứ nhất có 40 chiếc. Bến thứ hai có bao nhiêu chiếc thuyền?',
      answer: 25,
      unit: 'chiếc',
      hints: ['65 là tổng, 40 là một số hạng.'],
      solution: '65 − 40 = 25 (chiếc).',
    },
    {
      type: 'number',
      prompt: 'Lan cho bạn 12 cái kẹo thì còn 30 cái. Lúc đầu Lan có bao nhiêu cái kẹo?',
      answer: 42,
      unit: 'cái',
      hints: ['? − 12 = 30. Dấu "?" là số bị trừ.'],
      solution: '30 + 12 = 42 (cái).',
    },
  ],
  takeaways: [
    'Tìm một số hạng: lấy tổng trừ đi số hạng kia.',
    'Tìm số bị trừ: lấy hiệu cộng với số trừ.',
    'Tìm số trừ: lấy số bị trừ trừ đi hiệu.',
    'Thay số vừa tìm vào phép tính để thử lại.',
  ],
};
