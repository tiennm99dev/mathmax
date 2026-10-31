/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Làm quen mặt đồng hồ: kim giờ là kim ngắn, kim phút là kim dài. Khi kim phút chỉ số 12, kim giờ chỉ số nào thì đồng hồ chỉ đúng bấy nhiêu giờ.',
  intro:
    'Sáng nay em thức dậy lúc mấy giờ? Nhìn đồng hồ là biết ngay! Hôm nay em học cách xem giờ đúng trên đồng hồ.',
  objectives: [
    'Nhận biết mặt đồng hồ, kim giờ và kim phút.',
    'Đọc giờ đúng trên đồng hồ.',
    'Đặt kim đồng hồ chỉ một giờ đúng cho trước.',
  ],
  sections: [
    {
      heading: 'Mặt đồng hồ',
      blocks: [
        {
          type: 'p',
          text: 'Mặt đồng hồ có 12 số, từ 1 đến 12. Số 12 ở trên cùng.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hai kim đồng hồ',
          text: 'Kim ngắn là kim giờ. Kim dài là kim phút.',
        },
        {
          type: 'p',
          text: 'Hai kim cùng quay theo một chiều: từ số 12 sang số 1, số 2, số 3, ...',
        },
      ],
    },
    {
      heading: 'Xem giờ đúng',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Giờ đúng',
          text: 'Kim dài chỉ số 12. Kim ngắn chỉ số nào thì đồng hồ chỉ bấy nhiêu giờ.',
        },
        {
          type: 'table',
          head: ['Kim ngắn chỉ số', 'Kim dài chỉ số', 'Đồng hồ chỉ'],
          rows: [
            ['8', '12', '8 giờ'],
            ['3', '12', '3 giờ'],
            ['12', '12', '12 giờ'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Đọc giờ, em nhìn kim ngắn. Kim dài chỉ số 12 không phải là 12 giờ.',
        },
      ],
    },
    {
      heading: 'Giờ đúng quanh em',
      blocks: [
        {
          type: 'p',
          text: 'Em vào lớp lúc 7 giờ: kim ngắn chỉ số 7, kim dài chỉ số 12.',
        },
        {
          type: 'p',
          text: 'Em đi ngủ lúc 9 giờ tối: kim ngắn chỉ số 9, kim dài chỉ số 12.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đồng hồ kéo kim',
    instruction:
      'Chọn "Đặt giờ": kéo kim ngắn (hoặc chạm vào kim rồi bấm phím mũi tên) cho đồng hồ chỉ đúng giờ được hỏi. Nhớ để kim dài chỉ số 12. Chọn "Đọc giờ": nhìn đồng hồ rồi chạm vào giờ đúng. Bấm "Bài khác" để chơi tiếp.',
  },
  examples: [
    {
      problem: 'Kim ngắn chỉ số 5, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?',
      steps: ['Kim dài chỉ số 12: đây là giờ đúng.', 'Kim ngắn chỉ số 5.'],
      answer: 'Đồng hồ chỉ 5 giờ.',
    },
    {
      problem: 'Em muốn đồng hồ chỉ 10 giờ. Em đặt hai kim thế nào?',
      steps: ['Kim dài chỉ số 12.', 'Kim ngắn chỉ số 10.'],
      answer: 'Kim ngắn chỉ số 10, kim dài chỉ số 12.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Kim ngắn của đồng hồ là kim gì?',
      options: ['Kim giờ', 'Kim phút'],
      answer: 0,
      hints: ['Đọc giờ, em nhìn kim ngắn.'],
      solution: 'Kim ngắn là kim giờ. Kim dài là kim phút.',
    },
    {
      type: 'choice',
      prompt: 'Kim ngắn chỉ số 8, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?',
      options: ['12 giờ', '8 giờ', '9 giờ'],
      answer: 1,
      hints: ['Kim dài chỉ số 12 là giờ đúng.', 'Em nhìn số kim ngắn chỉ.'],
      solution: 'Kim ngắn chỉ số 8 nên đồng hồ chỉ 8 giờ.',
    },
    {
      type: 'choice',
      prompt: 'Lúc 4 giờ, kim dài chỉ số mấy?',
      options: ['Số 4', 'Số 12', 'Số 6'],
      answer: 1,
      hints: ['Giờ đúng thì kim dài luôn chỉ một số.'],
      solution: 'Giờ đúng thì kim dài chỉ số 12. Lúc 4 giờ, kim ngắn chỉ số 4.',
    },
    {
      type: 'choice',
      prompt: 'Lúc 10 giờ, kim ngắn chỉ số mấy?',
      options: ['Số 10', 'Số 12', 'Số 11'],
      answer: 0,
      hints: ['Kim ngắn chỉ số nào thì là bấy nhiêu giờ.'],
      solution: 'Lúc 10 giờ, kim ngắn chỉ số 10, kim dài chỉ số 12.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi đồng hồ với giờ đúng.',
      left: [
        'Kim ngắn chỉ số 2, kim dài chỉ số 12',
        'Kim ngắn chỉ số 5, kim dài chỉ số 12',
        'Kim ngắn chỉ số 12, kim dài chỉ số 12',
      ],
      right: ['5 giờ', '12 giờ', '2 giờ'],
      pairs: [
        [0, 2],
        [1, 0],
        [2, 1],
      ],
      hints: ['Em chỉ cần nhìn số kim ngắn chỉ.'],
      solution: 'Kim ngắn chỉ số 2 là 2 giờ, chỉ số 5 là 5 giờ, chỉ số 12 là 12 giờ.',
    },
    {
      type: 'choice',
      prompt: 'Kim dài chỉ số 12, kim ngắn chỉ số 3. Bạn Nam đọc là "12 giờ". Nam đọc đúng không?',
      options: ['Nam đọc đúng', 'Nam đọc sai, đó là 3 giờ'],
      answer: 1,
      hints: ['Đọc giờ thì nhìn kim nào: kim ngắn hay kim dài?'],
      solution: 'Kim ngắn chỉ số 3 nên đồng hồ chỉ 3 giờ. Nam đã nhìn nhầm kim dài.',
    },
    {
      type: 'order',
      prompt: 'Xếp các giờ buổi sáng theo thứ tự, từ sớm đến muộn.',
      items: ['9 giờ', '6 giờ', '8 giờ', '7 giờ'],
      answer: [1, 3, 2, 0],
      hints: ['Kim ngắn quay qua số 6, rồi số 7, ...'],
      solution: 'Thứ tự là 6 giờ, 7 giờ, 8 giờ, 9 giờ.',
    },
  ],
  takeaways: [
    'Kim ngắn là kim giờ, kim dài là kim phút.',
    'Giờ đúng: kim dài chỉ số 12.',
    'Kim ngắn chỉ số nào thì đồng hồ chỉ bấy nhiêu giờ.',
  ],
};
