/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành ước lượng khối lượng theo ki-lô-gam và dung tích theo lít, rồi cân bằng cân đĩa, đong bằng ca 1 l để kiểm tra.',
  intro:
    'Em cầm quả bưởi lên tay: nặng khoảng mấy ki-lô-gam? Cái xô đựng được khoảng mấy lít nước? Hôm nay em đoán trước, rồi cân và đong để kiểm tra nhé!',
  objectives: [
    'Ước lượng khối lượng đồ vật theo ki-lô-gam, dung tích theo lít.',
    'Cân đồ vật bằng cân đĩa, đong nước bằng ca 1 l để kiểm tra.',
    'So sánh số đã đoán với số cân, số đong được.',
  ],
  sections: [
    {
      heading: 'Ước lượng khối lượng',
      blocks: [
        {
          type: 'p',
          text: 'Ước lượng là đoán trước khi cân. Em cầm đồ vật lên tay, so với một vật em đã biết.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Một quả bưởi nặng khoảng 1 kg. Một túi gạo nhỏ nặng 2 kg hoặc 5 kg. Em so đồ vật với những vật đó.',
        },
        {
          type: 'table',
          head: ['Đồ vật', 'Em đoán', 'Cân được'],
          rows: [
            ['Quả bưởi', 'khoảng 2 kg', '1 kg'],
            ['Túi muối', 'khoảng 2 kg', '2 kg'],
            ['Túi gạo', 'khoảng 4 kg', '5 kg'],
          ],
          caption: 'Bảng của bạn Nam: đoán gần đúng là giỏi rồi.',
        },
      ],
    },
    {
      heading: 'Ước lượng dung tích',
      blocks: [
        {
          type: 'p',
          text: 'Em nhìn cái chai, cái can, cái xô rồi đoán: đựng được khoảng mấy lít nước?',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Chai nước to 1 l là vật mẫu. Đồ vật càng to thì càng đựng được nhiều lít nước.',
        },
        {
          type: 'p',
          text: 'Đoán xong, em rót nước ra những ca 1 l. Đếm số ca đầy để biết đồ vật chứa được mấy lít.',
        },
      ],
    },
    {
      heading: 'Em tự làm',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: em đoán rồi cân, đong để biết cân nặng và sức chứa của đồ vật trong nhà.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chuẩn bị (cùng bố mẹ): một cái cân, một chai hoặc ca 1 l, vài đồ vật như túi gạo, quả bưởi, cái xô, cái can.',
            'Kẻ một bảng 3 cột: Đồ vật, Em đoán, Đo được.',
            'Cầm từng đồ vật lên tay, đoán nặng mấy ki-lô-gam. Viết vào cột "Em đoán".',
            'Cân từng đồ vật. Viết số ki-lô-gam vào cột "Đo được".',
            'Đoán cái xô, cái can chứa mấy lít. Rót nước bằng ca 1 l cho đầy, đếm số ca, viết vào bảng.',
            'Em tự cân xem mình nặng bao nhiêu ki-lô-gam.',
          ],
        },
        {
          type: 'p',
          text: 'Kể cho cả lớp: đồ vật nào nặng nhất? Đồ vật nào chứa nhiều nước nhất? Em đoán gần đúng nhất ở đồ vật nào?',
        },
      ],
    },
  ],
  explore: {
    title: 'Đoán rồi cân, đoán rồi đong',
    instruction:
      'Bấm − hoặc + để chọn số em đoán. Bấm "Cân thử" rồi thêm quả cân cho đến khi cân thăng bằng, hoặc bấm "Đong thử" rồi rót từng ca 1 l. Đoán càng gần, em càng được nhiều sao.',
  },
  examples: [
    {
      problem:
        'Túi muối cân nặng 2 kg, túi gạo cân nặng 5 kg. Túi gạo nặng hơn túi muối bao nhiêu ki-lô-gam?',
      steps: ['Em lấy số lớn trừ số bé: 5 − 2.', '5 − 2 = 3.'],
      answer: 'Túi gạo nặng hơn túi muối 3 kg.',
    },
    {
      problem: 'Hà đoán cái can chứa được 4 l nước. Hà đong được đầy 5 ca 1 l. Hà đoán thế nào?',
      steps: ['Can chứa được 5 l nước.', 'Hà đoán 4 l, ít hơn 5 l là 1 l.'],
      answer: 'Hà đoán ít hơn số đong được 1 l. Hà đoán khá gần đúng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Muốn biết quả dưa nặng mấy ki-lô-gam, em dùng gì?',
      options: ['Cái cân', 'Thước kẻ', 'Ca 1 l'],
      answer: 0,
      hints: ['Cân nặng thì em đo bằng gì?'],
      solution: 'Em đặt quả dưa lên cân để biết nó nặng mấy ki-lô-gam.',
    },
    {
      type: 'choice',
      prompt: 'Vật nào nặng hơn 1 kg?',
      options: ['Quả bóng bay', 'Cái bút chì', 'Bao gạo'],
      answer: 2,
      hints: ['Một quả bưởi nặng khoảng 1 kg. Vật nào nặng hơn quả bưởi?'],
      solution: 'Quả bóng bay và bút chì rất nhẹ. Bao gạo nặng hơn 1 kg.',
    },
    {
      type: 'choice',
      prompt: 'Túi muối nặng 2 kg, túi gạo nặng 5 kg. Túi gạo nặng hơn túi muối mấy ki-lô-gam?',
      options: ['7 kg', '3 kg', '2 kg'],
      answer: 1,
      hints: ['Em lấy số lớn trừ số bé.'],
      solution: '5 − 2 = 3. Túi gạo nặng hơn túi muối 3 kg.',
    },
    {
      type: 'order',
      prompt:
        'Các bạn đi cân: Mai 23 kg, Nam 25 kg, Việt 24 kg, Rô-bốt 20 kg. Xếp từ nhẹ nhất đến nặng nhất.',
      items: ['Mai', 'Nam', 'Việt', 'Rô-bốt'],
      answer: [3, 0, 2, 1],
      hints: ['So sánh các số 23, 25, 24, 20.', 'Số bé nhất là 20.'],
      solution: '20 kg < 23 kg < 24 kg < 25 kg: Rô-bốt, Mai, Việt, Nam.',
    },
    {
      type: 'choice',
      prompt: 'Một cái xô thường đựng được khoảng bao nhiêu lít nước?',
      options: ['1 l', '10 l', '100 l'],
      answer: 1,
      hints: ['Xô to hơn chai 1 l nhiều, nhưng em vẫn xách được.'],
      solution: 'Một cái xô thường đựng được khoảng 10 l nước.',
    },
    {
      type: 'choice',
      prompt: 'Rót nước từ chai 1 l vào bình. Rót 3 chai thì bình đầy. Bình chứa được mấy lít?',
      options: ['1 l', '3 l', '4 l'],
      answer: 1,
      hints: ['Mỗi chai là 1 l. Em đếm số chai đã rót.'],
      solution: 'Rót 3 chai, mỗi chai 1 l. Bình chứa được 3 l nước.',
    },
    {
      type: 'choice',
      prompt: 'Lan đoán quả bí ngô nặng 6 kg. Cân được 4 kg. Lan đoán thế nào?',
      options: [
        'Lan đoán nặng hơn số cân được 2 kg.',
        'Lan đoán nhẹ hơn số cân được 2 kg.',
        'Lan đoán đúng.',
      ],
      answer: 0,
      hints: ['So sánh 6 và 4: số nào lớn hơn?'],
      solution: '6 lớn hơn 4 là 2. Lan đoán nặng hơn số cân được 2 kg.',
    },
  ],
  takeaways: [
    'Ước lượng là đoán trước khi cân, khi đong.',
    'Cân bằng cân để biết số ki-lô-gam. Đong bằng ca 1 l để biết số lít.',
    'Số đoán càng gần số đo, em ước lượng càng giỏi.',
  ],
};
