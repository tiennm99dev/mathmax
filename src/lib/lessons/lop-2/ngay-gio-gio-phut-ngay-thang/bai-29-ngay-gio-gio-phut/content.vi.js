/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Một ngày có 24 giờ, một giờ có 60 phút. 13 giờ còn gọi là 1 giờ chiều. Em xem giờ khi kim dài chỉ số 12, số 3, số 6 và đọc giờ rưỡi.',
  intro:
    'Em dậy lúc mấy giờ? Em đi ngủ lúc mấy giờ? Hôm nay em học một ngày có bao nhiêu giờ, một giờ có bao nhiêu phút và cách xem đồng hồ nhé!',
  objectives: [
    'Biết một ngày có 24 giờ, một giờ có 60 phút.',
    'Nói được các buổi trong ngày: sáng, trưa, chiều, tối, đêm.',
    'Biết 13 giờ còn gọi là 1 giờ chiều, 20 giờ còn gọi là 8 giờ tối.',
    'Xem giờ khi kim dài chỉ số 12, số 3, số 6; đọc được giờ rưỡi.',
    'Biết thêm: 8 giờ 45 phút còn gọi là 9 giờ kém 15 phút.',
  ],
  sections: [
    {
      heading: 'Một ngày có 24 giờ',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Một ngày có 24 giờ. Một ngày tính từ 12 giờ đêm hôm trước đến 12 giờ đêm hôm sau.',
        },
        {
          type: 'table',
          head: ['Buổi', 'Các giờ'],
          rows: [
            ['Sáng', '1 giờ sáng đến 10 giờ sáng'],
            ['Trưa', '11 giờ trưa, 12 giờ trưa'],
            ['Chiều', '1 giờ chiều đến 6 giờ chiều'],
            ['Tối', '7 giờ tối đến 9 giờ tối'],
            ['Đêm', '10 giờ đêm đến 12 giờ đêm'],
          ],
        },
      ],
    },
    {
      heading: '13 giờ còn gọi là 1 giờ chiều',
      blocks: [
        {
          type: 'p',
          text: 'Kim ngắn đi hai vòng trong một ngày. Vòng thứ hai, em đếm tiếp từ 13 đến 24.',
        },
        {
          type: 'table',
          head: ['Đếm tiếp', 'Còn gọi là'],
          rows: [
            ['13 giờ', '1 giờ chiều'],
            ['15 giờ', '3 giờ chiều'],
            ['18 giờ', '6 giờ chiều'],
            ['20 giờ', '8 giờ tối'],
            ['22 giờ', '10 giờ đêm'],
            ['24 giờ', '12 giờ đêm'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Sau 12 giờ trưa, em lấy số giờ trừ đi 12. Ví dụ: 20 − 12 = 8, nên 20 giờ là 8 giờ tối.',
        },
        {
          type: 'p',
          text: 'Đồng hồ điện tử hiện cả hai số giờ và phút. 15:30 đọc là 15 giờ 30 phút.',
        },
      ],
    },
    {
      heading: 'Một giờ có 60 phút',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Một giờ có 60 phút. Kim dài đi hết một vòng là 60 phút, kim ngắn đi được một số.',
        },
        { type: 'widget', name: 'phut' },
      ],
    },
    {
      heading: 'Xem đồng hồ',
      blocks: [
        {
          type: 'table',
          head: ['Kim dài chỉ số', 'Em đọc'],
          rows: [
            ['12', 'đúng giờ: 8 giờ'],
            ['3', '15 phút: 8 giờ 15 phút'],
            ['6', '30 phút: 8 giờ 30 phút'],
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Giờ rưỡi',
          text: '30 phút là nửa giờ. Vì thế 8 giờ 30 phút còn gọi là 8 giờ rưỡi.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Biết thêm: giờ kém',
          text: 'Khi kim dài chỉ số 9, chỉ còn 15 phút nữa là đến giờ sau. Vì thế 8 giờ 45 phút còn gọi là 9 giờ kém 15 phút.',
        },
        { type: 'widget', name: 'doc-dong-ho' },
      ],
    },
  ],
  explore: {
    title: 'Đồng hồ của một ngày',
    instruction:
      'Chọn "Xoay kim, đọc giờ": kéo kim dài, kim ngắn hoặc chạm vào một ô giờ, rồi đọc hai cách gọi giờ. Chọn "Đặt đồng hồ": kéo hai kim cho đúng giờ được đố, rồi bấm "Kiểm tra".',
  },
  examples: [
    {
      problem: 'Bố đi làm về lúc 17 giờ. 17 giờ còn gọi là mấy giờ chiều?',
      steps: ['Sau 12 giờ trưa, em lấy số giờ trừ đi 12.', '17 − 12 = 5.'],
      answer: '17 giờ còn gọi là 5 giờ chiều.',
    },
    {
      problem: 'Kim ngắn ở giữa số 6 và số 7, kim dài chỉ số 6. Đồng hồ chỉ mấy giờ?',
      steps: [
        'Kim dài chỉ số 6: đó là 30 phút.',
        'Kim ngắn vừa đi qua số 6: đó là 6 giờ.',
        'Đồng hồ chỉ 6 giờ 30 phút.',
      ],
      answer: '6 giờ 30 phút, còn gọi là 6 giờ rưỡi.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Một ngày có bao nhiêu giờ?',
      answer: 24,
      hints: ['Em đếm hết các giờ, từ 1 giờ sáng đến 12 giờ đêm.'],
      solution: 'Một ngày có 24 giờ.',
    },
    {
      type: 'number',
      prompt: 'Một giờ có bao nhiêu phút?',
      answer: 60,
      hints: ['Kim dài đi hết một vòng đồng hồ thì được bao nhiêu phút?'],
      solution: 'Một giờ có 60 phút.',
    },
    {
      type: 'match',
      prompt: 'Nối hai cách gọi của cùng một giờ.',
      left: ['14 giờ', '19 giờ', '23 giờ', '16 giờ'],
      right: ['2 giờ chiều', '7 giờ tối', '11 giờ đêm', '4 giờ chiều'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Lấy số giờ trừ đi 12.'],
      solution: '14 − 12 = 2; 19 − 12 = 7; 23 − 12 = 11; 16 − 12 = 4.',
    },
    {
      type: 'multi',
      prompt: 'Những giờ nào là giờ buổi chiều?',
      options: ['13 giờ', '9 giờ sáng', '17 giờ', '22 giờ'],
      answers: [0, 2],
      hints: ['Buổi chiều từ 1 giờ chiều đến 6 giờ chiều, tức là từ 13 giờ đến 18 giờ.'],
      solution: '13 giờ và 17 giờ là giờ buổi chiều. 22 giờ là 10 giờ đêm.',
    },
    {
      type: 'choice',
      prompt: 'Kim ngắn ở giữa số 3 và số 4, kim dài chỉ số 6. Đồng hồ chỉ mấy giờ?',
      options: ['3 giờ rưỡi', '4 giờ rưỡi', '3 giờ 15 phút'],
      answer: 0,
      hints: ['Kim dài chỉ số 6 là 30 phút. Kim ngắn vừa đi qua số nào?'],
      solution: 'Kim ngắn vừa qua số 3, kim dài chỉ số 6: 3 giờ 30 phút, còn gọi là 3 giờ rưỡi.',
    },
    {
      type: 'choice',
      prompt: 'Kim ngắn vừa qua số 2, kim dài chỉ số 3. Đồng hồ chỉ mấy giờ?',
      options: ['3 giờ 2 phút', '2 giờ 15 phút', '2 giờ 30 phút'],
      answer: 1,
      hints: ['Kim dài chỉ số 3 là bao nhiêu phút?'],
      solution: 'Kim dài chỉ số 3 là 15 phút, kim ngắn vừa qua số 2. Đồng hồ chỉ 2 giờ 15 phút.',
    },
    {
      type: 'choice',
      prompt: 'Đồng hồ điện tử hiện 21:30. Đó là mấy giờ?',
      options: ['9 giờ 30 phút sáng', '9 giờ 30 phút tối', '11 giờ 30 phút đêm'],
      answer: 1,
      hints: ['21 − 12 bằng mấy? 21 giờ là buổi nào?'],
      solution: '21 − 12 = 9, 21 giờ là buổi tối. Vậy 21:30 là 9 giờ 30 phút tối.',
    },
    {
      type: 'choice',
      prompt: 'Các bạn đá bóng vào buổi chiều. Giờ nào hợp nhất?',
      options: ['8 giờ', '16 giờ', '22 giờ'],
      answer: 1,
      hints: ['Đổi từng giờ xem là buổi nào.'],
      solution: '8 giờ là buổi sáng, 22 giờ là 10 giờ đêm. 16 giờ là 4 giờ chiều.',
    },
    {
      type: 'order',
      prompt: 'Xếp các giờ trong một ngày, từ sớm đến muộn.',
      items: ['15 giờ', '7 giờ sáng', '20 giờ', '11 giờ trưa'],
      answer: [1, 3, 0, 2],
      hints: ['Buổi sáng đến trước, rồi trưa, chiều, tối. Giờ lớn hơn 12 là sau buổi trưa.'],
      solution: '7 giờ sáng, 11 giờ trưa, 15 giờ (3 giờ chiều), 20 giờ (8 giờ tối).',
    },
    {
      type: 'choice',
      prompt: 'Biết thêm: 5 giờ 45 phút còn gọi là giờ nào?',
      options: ['5 giờ kém 15 phút', '6 giờ kém 15 phút', '6 giờ rưỡi'],
      answer: 1,
      hints: ['Còn 15 phút nữa là đến giờ nào?'],
      solution: 'Còn 15 phút nữa là 6 giờ. Vậy 5 giờ 45 phút còn gọi là 6 giờ kém 15 phút.',
    },
  ],
  takeaways: [
    'Một ngày có 24 giờ, một giờ có 60 phút.',
    '13 giờ là 1 giờ chiều, 20 giờ là 8 giờ tối, 24 giờ là 12 giờ đêm.',
    'Kim dài chỉ số 3 là 15 phút, chỉ số 6 là 30 phút. 30 phút còn gọi là rưỡi.',
    'Kim dài chỉ số 9: còn 15 phút nữa là đến giờ sau, nên em đọc được là giờ kém.',
  ],
};
