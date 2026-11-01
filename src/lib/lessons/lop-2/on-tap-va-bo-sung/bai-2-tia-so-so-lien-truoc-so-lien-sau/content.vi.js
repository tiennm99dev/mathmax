/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tia số: các số xếp từ bé đến lớn, bắt đầu từ 0. Số liền trước của một số bé hơn số đó 1 đơn vị, số liền sau lớn hơn số đó 1 đơn vị.',
  intro:
    'Chú ếch nhảy trên một con đường có ghi số. Mỗi lần nhảy một bước, ếch đến số bên cạnh. Con đường ấy là tia số. Em cùng ếch tìm số liền trước, số liền sau nhé!',
  objectives: [
    'Nhận biết tia số và đọc các số trên tia số.',
    'Tìm số liền trước, số liền sau của một số.',
    'Điền số còn thiếu trên tia số.',
  ],
  sections: [
    {
      heading: 'Tia số',
      blocks: [
        {
          type: 'p',
          text: 'Tia số bắt đầu từ số 0. Các vạch cách đều nhau. Mỗi vạch ghi một số.',
        },
        {
          type: 'p',
          text: 'Các số trên tia số: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Trên tia số',
          text: 'Số bên trái bé hơn số bên phải. Đi sang phải một vạch thì thêm 1.',
        },
        {
          type: 'p',
          text: 'Có tia số ghi các số tròn chục: 0, 10, 20, 30, ..., 100. Mỗi vạch thêm 10.',
        },
      ],
    },
    {
      heading: 'Số liền trước, số liền sau',
      blocks: [
        {
          type: 'p',
          text: 'Trên tia số, số 5 đứng giữa số 4 và số 6.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số liền trước',
          text: 'Số liền trước của 5 là 4. Số liền trước đứng ngay bên trái, bé hơn 1 đơn vị: 5 − 1 = 4.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số liền sau',
          text: 'Số liền sau của 5 là 6. Số liền sau đứng ngay bên phải, lớn hơn 1 đơn vị: 5 + 1 = 6.',
        },
        {
          type: 'table',
          head: ['Số liền trước', 'Số đã cho', 'Số liền sau'],
          rows: [
            ['19', '20', '21'],
            ['44', '45', '46'],
            ['98', '99', '100'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Số 0',
          text: 'Số 0 đứng đầu tia số. Không có số nào đứng ngay trước số 0 trên tia số.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ếch nhảy trên tia số',
    instruction:
      'Chạm "Nhảy lùi 1" hoặc "Nhảy tiến 1", hay chạm một số để ếch nhảy đến đó. Em xem số liền trước, số liền sau. Chọn "Đố em" để nhảy đến đúng số được hỏi.',
  },
  examples: [
    {
      problem: 'Tìm số liền trước và số liền sau của 39.',
      steps: [
        'Số liền trước của 39 bé hơn 39 một đơn vị: 39 − 1 = 38.',
        'Số liền sau của 39 lớn hơn 39 một đơn vị: 39 + 1 = 40.',
      ],
      answer: 'Số liền trước của 39 là 38. Số liền sau của 39 là 40.',
    },
    {
      problem: 'Số 70 là số liền sau của số nào?',
      steps: [
        'Số cần tìm đứng ngay trước 70 trên tia số.',
        'Số đó bé hơn 70 một đơn vị: 70 − 1 = 69.',
      ],
      answer: '70 là số liền sau của 69.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Số liền sau của 27 là số nào?',
      options: ['26', '28', '37'],
      answer: 1,
      hints: ['Số liền sau lớn hơn 1 đơn vị.'],
      solution: '27 + 1 = 28. Số liền sau của 27 là 28.',
    },
    {
      type: 'choice',
      prompt: 'Số liền trước của 50 là số nào?',
      options: ['49', '51', '40'],
      answer: 0,
      hints: ['Số liền trước bé hơn 1 đơn vị.'],
      solution: '50 − 1 = 49. Số liền trước của 50 là 49.',
    },
    {
      type: 'choice',
      prompt: 'Số liền sau của 99 là số nào?',
      options: ['98', '90', '100'],
      answer: 2,
      hints: ['Em đếm tiếp sau 99.'],
      solution: '99 + 1 = 100. Số liền sau của 99 là 100.',
    },
    {
      type: 'choice',
      prompt: 'Tìm số còn thiếu trên tia số: 12, 13, ?, 15, 16',
      options: ['14', '17', '11'],
      answer: 0,
      hints: ['Đi sang phải một vạch thì thêm 1.'],
      solution: '13 + 1 = 14. Số còn thiếu là 14.',
    },
    {
      type: 'choice',
      prompt: 'Tia số ghi các số tròn chục. Số nào thay cho dấu hỏi? 0, 10, 20, ?, 40',
      options: ['21', '30', '50'],
      answer: 1,
      hints: ['Mỗi vạch thêm 10.'],
      solution: '20 + 10 = 30. Số còn thiếu là 30.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số với số liền sau của nó.',
      left: ['9', '19', '59', '89'],
      right: ['10', '20', '60', '90', '80'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Số liền sau lớn hơn 1 đơn vị.', '19 + 1 = 20.'],
      solution: 'Số liền sau của 9 là 10, của 19 là 20, của 59 là 60, của 89 là 90.',
    },
    {
      type: 'choice',
      prompt: 'Số 63 là số liền trước của số nào?',
      options: ['62', '64', '73'],
      answer: 1,
      hints: ['Số cần tìm đứng ngay sau 63.'],
      solution: '63 + 1 = 64. 63 là số liền trước của 64.',
    },
    {
      type: 'order',
      prompt: 'Xếp các số như trên tia số, từ trái sang phải.',
      items: ['42', '40', '43', '41'],
      answer: [1, 3, 0, 2],
      hints: ['Số bên trái bé hơn số bên phải.', 'Bắt đầu từ số bé nhất.'],
      solution: '40, 41, 42, 43.',
    },
    {
      type: 'choice',
      prompt: 'Số nào đứng giữa 35 và 37?',
      options: ['34', '36', '38'],
      answer: 1,
      hints: ['Số đó là số liền sau của 35.'],
      solution: '35 + 1 = 36, và 36 + 1 = 37. Số đứng giữa là 36.',
    },
  ],
  takeaways: [
    'Trên tia số, số bên trái bé hơn số bên phải.',
    'Số liền trước bé hơn số đã cho 1 đơn vị: số liền trước của 5 là 4.',
    'Số liền sau lớn hơn số đã cho 1 đơn vị: số liền sau của 5 là 6.',
  ],
};
