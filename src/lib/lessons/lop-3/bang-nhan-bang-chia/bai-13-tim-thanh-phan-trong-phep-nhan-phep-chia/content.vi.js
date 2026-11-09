/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tìm thành phần chưa biết trong phép nhân, phép chia: tìm thừa số, tìm số bị chia và tìm số chia, kèm bài toán thực tế.',
  intro:
    'Một số trốn trong hộp bí ẩn! Em thử từng số để phép nhân, phép chia đúng thì hộp mở ra. Em sẽ biết cách tìm số đó thật nhanh.',
  objectives: [
    'Tìm một thừa số khi biết tích và thừa số kia.',
    'Tìm số bị chia khi biết thương và số chia.',
    'Tìm số chia khi biết số bị chia và thương.',
    'Giải bài toán có dùng các cách tìm này.',
  ],
  sections: [
    {
      heading: 'Tìm thừa số',
      blocks: [
        {
          type: 'p',
          text: 'Trong phép nhân 7 × 4 = 28, số 7 và số 4 là thừa số, số 28 là tích.',
        },
        {
          type: 'p',
          text: 'Từ phép nhân, em có hai phép chia: 28 : 4 = 7 và 28 : 7 = 4.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tìm một thừa số, ta lấy tích chia cho thừa số kia.',
        },
        {
          type: 'p',
          text: '? × 4 = 28. Em tính: 28 : 4 = 7. Số cần tìm là 7.',
        },
      ],
    },
    {
      heading: 'Tìm số bị chia',
      blocks: [
        {
          type: 'p',
          text: 'Mai cắm hoa vào 3 lọ, mỗi lọ 5 bông. Mai có bao nhiêu bông hoa? Em viết: ? : 3 = 5.',
        },
        {
          type: 'p',
          text: 'Trong phép chia 15 : 3 = 5, số 15 là số bị chia, số 3 là số chia, số 5 là thương.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tìm số bị chia, ta lấy thương nhân với số chia.',
        },
        {
          type: 'p',
          text: '? : 3 = 5. Em tính: 5 × 3 = 15. Số cần tìm là 15.',
        },
      ],
    },
    {
      heading: 'Tìm số chia',
      blocks: [
        {
          type: 'p',
          text: 'Việt có 15 bông hoa, cắm vào các lọ, mỗi lọ 5 bông. Việt cắm được mấy lọ? Em viết: 15 : ? = 5.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn tìm số chia, ta lấy số bị chia chia cho thương.',
        },
        {
          type: 'p',
          text: '15 : ? = 5. Em tính: 15 : 5 = 3. Số cần tìm là 3.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thử lại',
          text: 'Em thay số vừa tìm vào phép tính. 15 : 3 = 5 là đúng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hộp bí ẩn',
    instruction:
      'Chọn việc cần tìm. Chạm các nút để đổi số trong hộp. Các chấm cho em biết còn thiếu hay thừa. Khi đủ chấm, hộp mở ra và em đã tìm đúng số. Chạm "Bài khác" để chơi tiếp.',
  },
  examples: [
    {
      problem: 'Có 6 lít nước rót đều vào 3 ca. Mỗi ca có mấy lít nước?',
      steps: [
        'Em viết: ? × 3 = 6. Số phải tìm là một thừa số.',
        'Lấy tích chia cho thừa số kia: 6 : 3 = 2.',
      ],
      answer: 'Mỗi ca có 2 lít nước.',
    },
    {
      problem: 'Số chia là 6, thương là 7. Tìm số bị chia.',
      steps: ['Lấy thương nhân với số chia.', '7 × 6 = 42.', 'Thử lại: 42 : 6 = 7.'],
      answer: 'Số bị chia là 42.',
    },
    {
      problem: 'Có 35 quả cam xếp vào các đĩa, mỗi đĩa 5 quả. Xếp được mấy đĩa?',
      steps: [
        'Em viết: 35 : ? = 5. Số phải tìm là số chia.',
        'Lấy số bị chia chia cho thương: 35 : 5 = 7.',
      ],
      answer: 'Xếp được 7 đĩa.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: '? × 4 = 24. Số cần tìm là số nào?',
      answer: 6,
      hints: ['Lấy tích chia cho thừa số kia.'],
      solution: '24 : 4 = 6. Thử lại: 6 × 4 = 24.',
    },
    {
      type: 'choice',
      prompt: 'Muốn tìm một thừa số, ta làm thế nào?',
      options: [
        'Lấy tích chia cho thừa số kia',
        'Lấy tích nhân với thừa số kia',
        'Lấy thừa số kia chia cho tích',
      ],
      answer: 0,
      hints: ['Thử với 7 × 4 = 28: làm sao tìm lại được 7?'],
      solution: 'Muốn tìm một thừa số, ta lấy tích chia cho thừa số kia: 28 : 4 = 7.',
    },
    {
      type: 'number',
      prompt: '3 × ? = 12. Số cần tìm là số nào?',
      answer: 4,
      hints: ['Dấu "?" là một thừa số.', 'Lấy 12 chia cho 3.'],
      solution: '12 : 3 = 4. Thử lại: 3 × 4 = 12.',
    },
    {
      type: 'number',
      prompt: '? : 4 = 8. Số cần tìm là số nào?',
      answer: 32,
      hints: ['Dấu "?" là số bị chia.', 'Lấy thương nhân với số chia.'],
      solution: '8 × 4 = 32. Thử lại: 32 : 4 = 8.',
    },
    {
      type: 'number',
      prompt: '24 : ? = 4. Số cần tìm là số nào?',
      answer: 6,
      hints: ['Dấu "?" là số chia.', 'Lấy số bị chia chia cho thương.'],
      solution: '24 : 4 = 6. Thử lại: 24 : 6 = 4.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi việc với phép tính đúng, biết 40 : 5 = 8.',
      left: ['Tìm số bị chia', 'Tìm số chia', 'Tìm thương'],
      right: ['40 : 5', '8 × 5', '40 : 8'],
      pairs: [
        [0, 1],
        [1, 2],
        [2, 0],
      ],
      hints: ['Số bị chia là 40, số chia là 5, thương là 8.'],
      solution:
        'Số bị chia = thương × số chia = 8 × 5. Số chia = số bị chia : thương = 40 : 8. Thương = số bị chia : số chia = 40 : 5.',
    },
    {
      type: 'choice',
      prompt: 'Số bị chia là 28, thương là 7. Số chia là số nào?',
      options: ['4', '21', '35', '196'],
      answer: 0,
      hints: ['Lấy số bị chia chia cho thương.'],
      solution: '28 : 7 = 4. Số chia là 4.',
    },
    {
      type: 'count',
      prompt: 'Có 3 đĩa, mỗi đĩa 6 quả dâu tây. Em đếm xem có mấy quả.',
      picture: 'strawberry',
      answer: 18,
      groups: 3,
      choices: [9, 15, 18, 21],
      hints: ['Em đếm thêm 6: 6, 12, ...'],
      solution: '6, 12, 18. Có 18 quả. Đúng với ? : 3 = 6, vì 6 × 3 = 18.',
    },
    {
      type: 'number',
      prompt: 'Có 30 người lên các ca-bin, mỗi ca-bin 5 người. Có mấy ca-bin?',
      answer: 6,
      unit: 'ca-bin',
      hints: ['30 : ? = 5. Dấu "?" là số chia.'],
      solution: '30 : 5 = 6 (ca-bin).',
    },
    {
      type: 'number',
      prompt: 'Lan chia đều số nhãn vở vào 4 túi, mỗi túi được 9 nhãn. Lan có bao nhiêu nhãn vở?',
      answer: 36,
      unit: 'nhãn',
      hints: ['? : 4 = 9. Dấu "?" là số bị chia.'],
      solution: '9 × 4 = 36 (nhãn).',
    },
  ],
  takeaways: [
    'Tìm một thừa số: lấy tích chia cho thừa số kia.',
    'Tìm số bị chia: lấy thương nhân với số chia.',
    'Tìm số chia: lấy số bị chia chia cho thương.',
    'Thay số vừa tìm vào phép tính để thử lại.',
  ],
};
