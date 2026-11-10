/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Yến, tạ, tấn là các đơn vị đo khối lượng lớn hơn ki-lô-gam: 1 yến = 10 kg, 1 tạ = 10 yến = 100 kg, 1 tấn = 10 tạ = 1 000 kg.',
  intro:
    'Con gà nặng vài ki-lô-gam. Nhưng con bò, con voi hay xe tải chở hàng thì nặng hàng trăm, hàng nghìn ki-lô-gam. Em cùng học các đơn vị yến, tạ, tấn nhé!',
  objectives: [
    'Biết các đơn vị đo khối lượng yến, tạ, tấn.',
    'Nhớ quan hệ giữa yến, tạ, tấn và ki-lô-gam.',
    'Đổi đơn vị và tính với các số đo khối lượng.',
  ],
  sections: [
    {
      heading: 'Yến, tạ, tấn',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          text: 'Để đo khối lượng các vật nặng hàng chục, hàng trăm, hàng nghìn ki-lô-gam, người ta còn dùng các đơn vị: yến, tạ, tấn.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 yến = 10 kg. 1 tạ = 10 yến = 100 kg. 1 tấn = 10 tạ = 1 000 kg.',
        },
        {
          type: 'table',
          head: ['tấn', 'tạ', 'yến', 'kg'],
          rows: [['1 tấn = 10 tạ', '1 tạ = 10 yến', '1 yến = 10 kg', '1 kg']],
          caption: 'Mỗi đơn vị gấp 10 lần đơn vị bé hơn liền sau nó',
        },
        {
          type: 'p',
          text: 'Bao gạo nặng 5 yến, tức là 50 kg. Con bò nặng khoảng 3 tạ. Con voi nặng khoảng 4 tấn.',
        },
      ],
    },
    {
      heading: 'Đổi đơn vị và tính',
      blocks: [
        {
          type: 'p',
          text: '2 yến 5 kg = 20 kg + 5 kg = 25 kg.',
        },
        {
          type: 'p',
          text: '30 tạ = 3 tấn, vì 10 tạ = 1 tấn.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Khi cộng, trừ, nhân, chia các số đo, em giữ nguyên tên đơn vị: 18 yến + 26 yến = 44 yến; 20 tấn × 5 = 100 tấn.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Muốn so sánh hai số đo khác đơn vị, em đổi về cùng một đơn vị trước: 4 tạ 36 kg = 436 kg, mà 436 kg > 300 kg.',
        },
      ],
    },
  ],
  explore: {
    title: 'Trạm cân',
    instruction:
      'Em bấm + và − để đặt khối tấn, tạ, yến, kg lên cân cho bằng con vật. Thử nút "Đổi" để thấy 1 tạ bằng 10 yến.',
  },
  examples: [
    {
      problem: 'Con bò nặng 3 tạ 5 yến. Con bò nặng bao nhiêu ki-lô-gam?',
      steps: [
        '1 tạ = 100 kg, nên 3 tạ = 300 kg.',
        '1 yến = 10 kg, nên 5 yến = 50 kg.',
        '300 kg + 50 kg = 350 kg.',
      ],
      answer: 'Con bò nặng 350 kg.',
    },
    {
      problem:
        'Xe thứ nhất chở 2 tấn hàng. Xe thứ hai chở 18 tạ hàng. Xe nào chở nhiều hơn và nhiều hơn bao nhiêu ki-lô-gam?',
      steps: [
        'Đổi về ki-lô-gam: 2 tấn = 2 000 kg; 18 tạ = 1 800 kg.',
        '2 000 kg > 1 800 kg.',
        '2 000 − 1 800 = 200 (kg).',
      ],
      answer: 'Xe thứ nhất chở nhiều hơn 200 kg.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi đơn vị với số ki-lô-gam của nó.',
      left: ['1 yến', '1 tạ', '1 tấn'],
      right: ['10 kg', '100 kg', '1 000 kg'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Yến bé nhất, tấn lớn nhất.', 'Mỗi đơn vị gấp 10 lần đơn vị bé hơn liền sau nó.'],
      solution: '1 yến = 10 kg; 1 tạ = 100 kg; 1 tấn = 1 000 kg.',
    },
    {
      type: 'number',
      prompt: '2 yến 5 kg = ? kg',
      answer: 25,
      unit: 'kg',
      hints: ['1 yến = 10 kg. Vậy 2 yến bằng bao nhiêu ki-lô-gam?'],
      solution: '2 yến = 20 kg. 20 kg + 5 kg = 25 kg.',
    },
    {
      type: 'number',
      prompt: '20 kg = ? yến',
      answer: 2,
      unit: 'yến',
      hints: ['Cứ 10 kg là 1 yến.'],
      solution: '20 kg = 10 kg + 10 kg = 2 yến.',
    },
    {
      type: 'number',
      prompt: '5 tạ = ? kg',
      answer: 500,
      unit: 'kg',
      hints: ['1 tạ = 100 kg.'],
      solution: '5 tạ = 5 × 100 kg = 500 kg.',
    },
    {
      type: 'number',
      prompt: '3 tấn = ? tạ',
      answer: 30,
      unit: 'tạ',
      hints: ['1 tấn = 10 tạ.'],
      solution: '3 tấn = 3 × 10 tạ = 30 tạ.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi con vật, đồ vật với cân nặng phù hợp.',
      left: ['Con gà', 'Bao xi măng', 'Con lợn', 'Con voi'],
      right: ['2 kg', '5 yến', '1 tạ', '4 tấn'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: [
        'Vật càng to thì càng nặng.',
        'Con voi to nhất nên đo bằng tấn. Con gà nhỏ nhất nên đo bằng ki-lô-gam.',
      ],
      solution: 'Con gà 2 kg, bao xi măng 5 yến (50 kg), con lợn 1 tạ (100 kg), con voi 4 tấn.',
    },
    {
      type: 'choice',
      prompt: '4 tạ 36 kg ? 300 kg',
      options: ['>', '<', '='],
      answer: 0,
      hints: ['Em đổi 4 tạ 36 kg ra ki-lô-gam trước.'],
      solution: '4 tạ 36 kg = 400 kg + 36 kg = 436 kg. Mà 436 kg > 300 kg.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số đo theo thứ tự từ nhẹ đến nặng.',
      items: ['1 tấn', '9 tạ', '95 yến', '1 tạ 5 kg'],
      answer: [3, 1, 2, 0],
      hints: [
        'Em đổi tất cả ra ki-lô-gam.',
        '1 tấn = 1 000 kg; 9 tạ = 900 kg; 95 yến = 950 kg; 1 tạ 5 kg = 105 kg.',
      ],
      solution: '105 kg < 900 kg < 950 kg < 1 000 kg. Vậy: 1 tạ 5 kg; 9 tạ; 95 yến; 1 tấn.',
    },
    {
      type: 'number',
      prompt: '18 yến + 26 yến = ? yến',
      answer: 44,
      unit: 'yến',
      hints: ['Em cộng hai số rồi giữ nguyên đơn vị yến.'],
      solution: '18 + 26 = 44. Vậy 18 yến + 26 yến = 44 yến.',
    },
    {
      type: 'number',
      prompt: '20 tấn × 5 = ? tấn',
      answer: 100,
      unit: 'tấn',
      hints: ['Em nhân 20 với 5 rồi giữ nguyên đơn vị tấn.'],
      solution: '20 × 5 = 100. Vậy 20 tấn × 5 = 100 tấn.',
    },
    {
      type: 'number',
      prompt:
        'Lần đầu xe chở 3 tấn thóc. Lần sau xe chở 15 tạ thóc. Cả hai lần xe chở được bao nhiêu tạ thóc?',
      answer: 45,
      unit: 'tạ',
      hints: ['Em đổi 3 tấn ra tạ trước.', '1 tấn = 10 tạ.'],
      solution: '3 tấn = 30 tạ. 30 tạ + 15 tạ = 45 tạ. Cả hai lần xe chở được 45 tạ thóc.',
    },
  ],
  takeaways: [
    '1 yến = 10 kg; 1 tạ = 10 yến = 100 kg; 1 tấn = 10 tạ = 1 000 kg.',
    'So sánh hay tính các số đo, em đổi về cùng một đơn vị.',
  ],
};
