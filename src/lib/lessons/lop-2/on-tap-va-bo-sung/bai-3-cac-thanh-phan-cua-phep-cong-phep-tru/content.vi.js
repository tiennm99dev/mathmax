/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Các thành phần của phép cộng (số hạng, tổng) và của phép trừ (số bị trừ, số trừ, hiệu); tính tổng khi biết các số hạng, tính hiệu khi biết số bị trừ và số trừ.',
  intro:
    'Mỗi số trong phép cộng, phép trừ đều có tên gọi riêng, giống như mỗi bạn trong lớp có một cái tên. Hôm nay em làm quen với tên gọi của các số đó nhé!',
  objectives: [
    'Gọi đúng tên số hạng, tổng trong phép cộng.',
    'Gọi đúng tên số bị trừ, số trừ, hiệu trong phép trừ.',
    'Tính tổng khi biết các số hạng, tính hiệu khi biết số bị trừ và số trừ.',
  ],
  sections: [
    {
      heading: 'Phép cộng: số hạng và tổng',
      blocks: [
        {
          type: 'table',
          caption: '3 + 4 = 7',
          head: ['Số', 'Tên gọi'],
          rows: [
            ['3', 'Số hạng'],
            ['4', 'Số hạng'],
            ['7', 'Tổng'],
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số hạng, tổng',
          text: 'Trong phép cộng 3 + 4 = 7: 3 và 4 là số hạng, 7 là tổng.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: '3 + 4 cũng gọi là tổng.',
        },
      ],
    },
    {
      heading: 'Phép trừ: số bị trừ, số trừ và hiệu',
      blocks: [
        {
          type: 'table',
          caption: '10 − 6 = 4',
          head: ['Số', 'Tên gọi'],
          rows: [
            ['10', 'Số bị trừ'],
            ['6', 'Số trừ'],
            ['4', 'Hiệu'],
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số bị trừ, số trừ, hiệu',
          text: 'Trong phép trừ 10 − 6 = 4: 10 là số bị trừ, 6 là số trừ, 4 là hiệu.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: '10 − 6 cũng gọi là hiệu.',
        },
      ],
    },
    {
      heading: 'Tính tổng, tính hiệu',
      blocks: [
        {
          type: 'p',
          text: 'Muốn tính tổng, em cộng các số hạng.',
        },
        {
          type: 'p',
          text: 'Muốn tính hiệu, em lấy số bị trừ trừ đi số trừ.',
        },
      ],
    },
  ],
  explore: {
    title: 'Phép tính có nhãn',
    instruction:
      'Chọn phép cộng hoặc phép trừ. Chạm vào từng số để hiện tên gọi. Chọn "Đố em" rồi chạm vào số được hỏi.',
  },
  examples: [
    {
      problem: 'Tính tổng, biết các số hạng là 32 và 15.',
      steps: [
        'Tính tổng là cộng các số hạng: 32 + 15.',
        'Hàng đơn vị: 2 + 5 = 7. Hàng chục: 3 + 1 = 4.',
        '32 + 15 = 47.',
      ],
      answer: 'Tổng là 47.',
    },
    {
      problem: 'Tính hiệu, biết số bị trừ là 68 và số trừ là 25.',
      steps: [
        'Tính hiệu là lấy số bị trừ trừ đi số trừ: 68 − 25.',
        'Hàng đơn vị: 8 − 5 = 3. Hàng chục: 6 − 2 = 4.',
        '68 − 25 = 43.',
      ],
      answer: 'Hiệu là 43.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trong phép cộng 25 + 3 = 28, số 28 gọi là gì?',
      options: ['Số hạng', 'Tổng', 'Hiệu'],
      answer: 1,
      hints: ['28 là kết quả của phép cộng.'],
      solution: 'Kết quả của phép cộng là tổng. 28 là tổng.',
    },
    {
      type: 'choice',
      prompt: 'Trong phép trừ 9 − 5 = 4, số 5 gọi là gì?',
      options: ['Số bị trừ', 'Số trừ', 'Hiệu'],
      answer: 1,
      hints: ['Số đứng ngay sau dấu − là số gì?'],
      solution: 'Trong 9 − 5 = 4: 9 là số bị trừ, 5 là số trừ, 4 là hiệu.',
    },
    {
      type: 'match',
      prompt: 'Phép trừ 57 − 23 = 34. Nối mỗi số với tên gọi của nó.',
      left: ['57', '23', '34'],
      right: ['Số bị trừ', 'Số trừ', 'Hiệu', 'Tổng'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Số bị trừ đứng đầu.', 'Hiệu là kết quả, đứng sau dấu =.'],
      solution: '57 là số bị trừ, 23 là số trừ, 34 là hiệu.',
    },
    {
      type: 'multi',
      prompt: 'Phép cộng 40 + 6 = 46. Chọn tất cả các số hạng.',
      options: ['40', '6', '46'],
      answers: [0, 1],
      hints: ['Các số hạng là các số được cộng với nhau.'],
      solution: '40 và 6 là các số hạng, 46 là tổng.',
    },
    {
      type: 'choice',
      prompt: 'Các số hạng là 21 và 34. Tổng là bao nhiêu?',
      options: ['13', '55', '45'],
      answer: 1,
      hints: ['Muốn tính tổng, em cộng các số hạng.', 'Tính 21 + 34.'],
      solution: '21 + 34 = 55. Tổng là 55.',
    },
    {
      type: 'choice',
      prompt: 'Số bị trừ là 79, số trừ là 36. Hiệu là bao nhiêu?',
      options: ['43', '115', '33'],
      answer: 0,
      hints: ['Muốn tính hiệu, em lấy số bị trừ trừ đi số trừ.', 'Tính 79 − 36.'],
      solution: '79 − 36 = 43. Hiệu là 43.',
    },
    {
      type: 'choice',
      prompt: 'Số bị trừ là 48, số trừ là 5. Hiệu là bao nhiêu?',
      options: ['43', '53', '42'],
      answer: 0,
      hints: ['Tính 48 − 5: hàng đơn vị 8 − 5.'],
      solution: '48 − 5 = 43. Hiệu là 43.',
    },
    {
      type: 'choice',
      prompt: 'Trong phép trừ 80 − 30 = 50, "80 − 30" gọi là gì?',
      options: ['Tổng', 'Số trừ', 'Hiệu'],
      answer: 2,
      hints: ['Kết quả 50 là hiệu. Phép tính bên trái dấu = cũng gọi như vậy.'],
      solution: '80 − 30 cũng gọi là hiệu.',
    },
    {
      type: 'choice',
      prompt: 'Phép tính nào có tổng là 69?',
      options: ['63 + 6', '36 + 6', '60 + 3'],
      answer: 0,
      hints: ['Em tính từng phép cộng.', 'Hàng đơn vị của tổng phải là 9.'],
      solution: '63 + 6 = 69. Còn 36 + 6 = 42 và 60 + 3 = 63.',
    },
  ],
  takeaways: [
    'Phép cộng: số hạng + số hạng = tổng. 3 + 4 cũng gọi là tổng.',
    'Phép trừ: số bị trừ − số trừ = hiệu. 10 − 6 cũng gọi là hiệu.',
  ],
};
