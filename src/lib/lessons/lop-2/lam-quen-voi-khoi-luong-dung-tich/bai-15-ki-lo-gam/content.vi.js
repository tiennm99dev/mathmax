/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ki-lô-gam: so sánh nặng hơn, nhẹ hơn bằng cân đĩa; ki-lô-gam là đơn vị đo khối lượng, viết tắt là kg; cân bằng quả cân và tính với số đo ki-lô-gam.',
  intro:
    'Quả dưa hấu và quả bưởi, quả nào nặng hơn? Em cầm lên tay thì đoán được. Cân đĩa cho em biết chắc chắn, và còn cho biết vật nặng bao nhiêu ki-lô-gam!',
  objectives: [
    'Dùng cân đĩa để biết vật nào nặng hơn, vật nào nhẹ hơn.',
    'Biết ki-lô-gam là đơn vị đo khối lượng, viết tắt là kg.',
    'Đọc, viết số đo ki-lô-gam; cân đồ vật bằng quả cân.',
    'Cộng, trừ với số đo ki-lô-gam.',
  ],
  sections: [
    {
      heading: 'Nặng hơn, nhẹ hơn',
      blocks: [
        {
          type: 'p',
          text: 'Cái cân này gọi là cân đĩa. Em đặt hai vật lên hai đĩa cân và nhìn xem đĩa nào thấp xuống.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đọc cân đĩa',
          text: 'Đĩa cân bên nào thấp hơn thì vật trên đĩa đó nặng hơn. Vật trên đĩa cao hơn thì nhẹ hơn.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Cân thăng bằng',
          text: 'Hai đĩa cân ngang nhau gọi là cân thăng bằng. Khi đó, vật ở hai đĩa nặng bằng nhau.',
        },
        {
          type: 'p',
          text: 'Ví dụ: đĩa có quả dưa hấu thấp hơn đĩa có quả bưởi. Quả dưa hấu nặng hơn quả bưởi. Quả bưởi nhẹ hơn quả dưa hấu.',
        },
      ],
    },
    {
      heading: 'Ki-lô-gam',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Ki-lô-gam',
          text: 'Để biết một vật nặng bao nhiêu, người ta dùng đơn vị đo khối lượng là ki-lô-gam. Ki-lô-gam viết tắt là kg.',
        },
        {
          type: 'table',
          head: ['Viết', 'Đọc'],
          rows: [
            ['1 kg', 'một ki-lô-gam'],
            ['2 kg', 'hai ki-lô-gam'],
            ['5 kg', 'năm ki-lô-gam'],
          ],
          caption: 'Các quả cân thường dùng: 1 kg, 2 kg, 5 kg.',
        },
        {
          type: 'p',
          text: 'Túi gạo ở một đĩa, quả cân 1 kg ở đĩa kia. Cân thăng bằng. Vậy túi gạo cân nặng 1 kg.',
        },
      ],
    },
    {
      heading: 'Cân bằng quả cân, tính với ki-lô-gam',
      blocks: [
        {
          type: 'p',
          text: 'Đặt vật lên một đĩa. Đặt quả cân lên đĩa kia cho đến khi cân thăng bằng. Cộng số ki-lô-gam của các quả cân.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ví dụ',
          text: 'Con ngỗng ở một đĩa, quả cân 5 kg và quả cân 2 kg ở đĩa kia, cân thăng bằng. Con ngỗng nặng: 5 + 2 = 7 (kg).',
        },
        {
          type: 'p',
          text: 'Em cộng, trừ số đo như cộng, trừ các số, rồi viết kg sau kết quả: 2 kg + 3 kg = 5 kg. 10 kg − 4 kg = 6 kg.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cân đĩa ảo',
    instruction:
      '"Cân bằng quả cân": chạm + 1 kg, + 2 kg, + 5 kg để đặt quả cân lên đĩa bên phải, chạm quả cân trên đĩa để bỏ bớt, cho đến khi cân thăng bằng. "Nặng hơn, nhẹ hơn": nhìn đĩa nào thấp hơn rồi chạm vào câu đúng.',
  },
  examples: [
    {
      problem:
        'Quả dưa hấu ở đĩa bên trái. Đĩa bên phải có quả cân 2 kg và quả cân 1 kg. Cân thăng bằng. Quả dưa hấu nặng mấy ki-lô-gam?',
      steps: [
        'Cân thăng bằng: quả dưa hấu nặng bằng hai quả cân.',
        'Hai quả cân nặng: 2 + 1 = 3 (kg).',
      ],
      answer: 'Quả dưa hấu cân nặng 3 kg.',
    },
    {
      problem:
        'Bao thóc thứ nhất cân nặng 30 kg, bao thóc thứ hai cân nặng 50 kg. Hỏi cả hai bao thóc cân nặng bao nhiêu ki-lô-gam?',
      steps: [
        'Tóm tắt: Bao thứ nhất: 30 kg. Bao thứ hai: 50 kg. Cả hai bao: ... kg?',
        'Hỏi "cả hai bao" nên em làm phép cộng: 30 + 50.',
        '3 chục + 5 chục = 8 chục. Vậy 30 + 50 = 80.',
        'Bài giải: Cả hai bao thóc cân nặng là: 30 + 50 = 80 (kg).',
      ],
      answer: 'Đáp số: 80 kg.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trên cân đĩa, đĩa có quả bưởi thấp hơn đĩa có quả cam. Quả nào nặng hơn?',
      options: ['Quả bưởi', 'Quả cam'],
      answer: 0,
      hints: ['Đĩa nào thấp hơn thì vật trên đĩa đó nặng hơn.'],
      solution: 'Đĩa có quả bưởi thấp hơn, nên quả bưởi nặng hơn quả cam.',
    },
    {
      type: 'choice',
      prompt: 'Con gấu ở một đĩa, ba con chó ở đĩa kia. Đĩa có con gấu cao hơn. Câu nào đúng?',
      options: [
        'Con gấu nặng hơn ba con chó.',
        'Con gấu nhẹ hơn ba con chó.',
        'Con gấu nặng bằng ba con chó.',
      ],
      answer: 1,
      hints: ['Vật trên đĩa cao hơn thì nặng hơn hay nhẹ hơn?'],
      solution: 'Đĩa có con gấu cao hơn, nên con gấu nhẹ hơn ba con chó.',
    },
    {
      type: 'choice',
      prompt: 'Ki-lô-gam viết tắt là gì?',
      options: ['kg', 'cm', 'l'],
      answer: 0,
      hints: ['Ki-lô-gam bắt đầu bằng chữ k và có chữ g.'],
      solution: 'Ki-lô-gam viết tắt là kg. (cm là xăng-ti-mét, l là lít.)',
    },
    {
      type: 'match',
      prompt: 'Nối cách viết với cách đọc.',
      left: ['3 kg', '10 kg', '25 kg'],
      right: ['ba ki-lô-gam', 'mười ki-lô-gam', 'hai mươi lăm ki-lô-gam', 'năm ki-lô-gam'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Đọc số trước, rồi đọc "ki-lô-gam".'],
      solution: '3 kg: ba ki-lô-gam. 10 kg: mười ki-lô-gam. 25 kg: hai mươi lăm ki-lô-gam.',
    },
    {
      type: 'choice',
      prompt:
        'Quả dưa ở một đĩa. Đĩa kia có quả cân 2 kg và quả cân 1 kg. Cân thăng bằng. Quả dưa nặng mấy ki-lô-gam?',
      options: ['2 kg', '3 kg', '1 kg'],
      answer: 1,
      hints: ['Cân thăng bằng: quả dưa nặng bằng cả hai quả cân cộng lại.'],
      solution: 'Hai quả cân nặng 2 + 1 = 3 (kg). Quả dưa cân nặng 3 kg.',
    },
    {
      type: 'choice',
      prompt:
        'Quả cam nặng bằng 4 quả chanh. Quả táo nặng bằng 3 quả chanh. Quả bưởi nặng bằng quả cam và quả táo cộng lại. Quả bưởi nặng bằng mấy quả chanh?',
      options: ['6 quả chanh', '7 quả chanh', '8 quả chanh'],
      answer: 1,
      hints: ['Em cộng số quả chanh của quả cam và của quả táo.'],
      solution: 'Quả bưởi nặng bằng 4 + 3 = 7 quả chanh.',
    },
    {
      type: 'choice',
      prompt: '5 kg + 3 kg = ?',
      options: ['8 kg', '2 kg', '8'],
      answer: 0,
      hints: ['Cộng 5 + 3, rồi nhớ viết kg sau kết quả.'],
      solution: '5 + 3 = 8, nên 5 kg + 3 kg = 8 kg.',
    },
    {
      type: 'choice',
      prompt: '15 kg − 5 kg = ?',
      options: ['20 kg', '10', '10 kg'],
      answer: 2,
      hints: ['Trừ 15 − 5, rồi nhớ viết kg sau kết quả.'],
      solution: '15 − 5 = 10, nên 15 kg − 5 kg = 10 kg.',
    },
    {
      type: 'order',
      prompt: 'Xếp các vật từ nhẹ nhất đến nặng nhất.',
      items: ['Bao gạo 10 kg', 'Quả bưởi 1 kg', 'Quả dưa hấu 3 kg'],
      answer: [1, 2, 0],
      hints: ['So sánh các số: 10, 1 và 3.'],
      solution: '1 kg < 3 kg < 10 kg: quả bưởi, quả dưa hấu, bao gạo.',
    },
    {
      type: 'choice',
      prompt:
        'Rô-bốt đeo ba lô, cân nặng 32 kg. Chiếc ba lô nặng 2 kg. Bỏ ba lô ra, Rô-bốt cân nặng bao nhiêu ki-lô-gam?',
      options: ['34 kg', '30 kg', '31 kg'],
      answer: 1,
      hints: ['Bỏ ba lô ra thì nhẹ đi. Em làm phép trừ.'],
      solution: 'Rô-bốt cân nặng là: 32 − 2 = 30 (kg). Đáp số: 30 kg.',
    },
  ],
  takeaways: [
    'Đĩa cân thấp hơn thì vật trên đó nặng hơn. Cân thăng bằng thì hai bên nặng bằng nhau.',
    'Ki-lô-gam là đơn vị đo khối lượng, viết tắt là kg.',
    'Cộng, trừ số đo ki-lô-gam như cộng, trừ các số, rồi viết kg sau kết quả.',
  ],
};
