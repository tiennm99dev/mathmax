/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Xem đồng hồ chính xác đến từng phút, đọc giờ kém. Một năm có 12 tháng; biết số ngày của mỗi tháng và xem lịch để tìm thứ của một ngày.',
  intro:
    'Kim dài không chỉ dừng ở các số. Nó đi qua từng vạch nhỏ, mỗi vạch là 1 phút. Em tập đọc giờ đến từng phút và xem lịch cả năm nhé!',
  objectives: [
    'Đọc được giờ trên đồng hồ chính xác đến từng phút.',
    'Đọc được giờ kém, như 9 giờ kém 5 phút.',
    'Biết một năm có 12 tháng và số ngày của mỗi tháng.',
    'Xem lịch để biết một ngày là thứ mấy.',
  ],
  sections: [
    {
      heading: 'Xem đồng hồ đến từng phút',
      blocks: [
        { type: 'p', text: 'Kim ngắn chỉ giờ. Kim dài chỉ phút.' },
        {
          type: 'callout',
          tone: 'definition',
          text: 'Mặt đồng hồ có 60 vạch nhỏ. Kim dài đi qua 1 vạch nhỏ là 1 phút. Kim dài đi từ một số đến số liền sau là 5 phút.',
        },
        {
          type: 'p',
          text: 'Em đếm phút như sau: đếm 5, 10, 15, … theo các số, rồi đếm thêm từng vạch nhỏ.',
        },
        {
          type: 'table',
          head: ['Kim ngắn', 'Kim dài', 'Đồng hồ chỉ'],
          rows: [
            ['Giữa số 8 và số 9', 'Vạch nhỏ thứ 2 sau số 6', '8 giờ 32 phút'],
            ['Giữa số 5 và số 6', 'Số 9', '5 giờ 45 phút'],
            ['Giữa số 10 và số 11', 'Vạch nhỏ thứ 3 sau số 1', '10 giờ 8 phút'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Giờ kém',
          text: 'Khi kim dài đã qua số 6, em có thể đọc giờ kém. 8 giờ 55 phút còn 5 phút nữa là 9 giờ, nên còn đọc là 9 giờ kém 5 phút.',
        },
        {
          type: 'p',
          text: 'Buổi chiều, 4 giờ 55 phút chiều còn gọi là 16 giờ 55 phút.',
        },
      ],
    },
    {
      heading: 'Tháng và năm',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Một năm có 12 tháng: tháng 1, tháng 2, …, tháng 12.',
        },
        {
          type: 'table',
          head: ['Số ngày', 'Các tháng'],
          rows: [
            ['31 ngày', 'Tháng 1, 3, 5, 7, 8, 10, 12'],
            ['30 ngày', 'Tháng 4, 6, 9, 11'],
            ['28 hoặc 29 ngày', 'Tháng 2'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nắm tay',
          text: 'Em nắm tay trái lại. Đếm tháng 1 ở khớp ngón trỏ, tháng 2 ở chỗ lõm, tháng 3 ở khớp tiếp theo, … Tháng ở khớp có 31 ngày. Tháng ở chỗ lõm có 30 ngày, riêng tháng 2 có 28 hoặc 29 ngày.',
        },
        {
          type: 'p',
          text: 'Xem lịch: em tìm ngày trên tờ lịch, rồi nhìn lên đầu cột để biết ngày đó là thứ mấy.',
        },
      ],
    },
  ],
  explore: {
    title: 'Quay kim và xem lịch',
    instruction:
      'Quay kim: em kéo kim dài và kim ngắn, hoặc bấm Thêm 1 phút, để đồng hồ chỉ đúng giờ đề bài. Xem lịch: em đổi tháng và chạm vào một ngày để biết thứ. Đố em: trả lời 8 câu hỏi.',
  },
  examples: [
    {
      problem:
        'Kim ngắn ở giữa số 9 và số 10. Kim dài chỉ vạch nhỏ thứ 1 sau số 8. Đồng hồ chỉ mấy giờ?',
      steps: [
        'Kim ngắn đã qua số 9, nên là 9 giờ.',
        'Kim dài ở số 8 là 40 phút. Thêm 1 vạch nhỏ là 41 phút.',
      ],
      answer: 'Đồng hồ chỉ 9 giờ 41 phút.',
    },
    {
      problem:
        'Mẹ cắm nồi cơm lúc 10 giờ 10 phút. Nồi cơm nấu trong 40 phút. Mấy giờ thì cơm chín?',
      steps: ['10 phút + 40 phút = 50 phút.', 'Giờ vẫn là 10 giờ.'],
      answer: 'Cơm chín lúc 10 giờ 50 phút.',
    },
    {
      problem:
        'Gia đình Mai đi thăm ông bà từ ngày 30 tháng 8 đến hết ngày 3 tháng 9. Chuyến đi kéo dài mấy ngày?',
      steps: [
        'Tháng 8 có 31 ngày.',
        'Các ngày đi là: 30, 31 (tháng 8) và 1, 2, 3 (tháng 9).',
        'Đếm được 5 ngày.',
      ],
      answer: 'Chuyến đi kéo dài 5 ngày.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Kim ngắn ở giữa số 5 và số 6. Kim dài chỉ số 9. Đồng hồ chỉ mấy giờ?',
      options: ['5 giờ 45 phút', '6 giờ 45 phút', '9 giờ 25 phút', '5 giờ 9 phút'],
      answer: 0,
      hints: [
        'Kim ngắn vừa đi qua số nào? Đó là giờ.',
        'Kim dài chỉ số 9: em đếm 5, 10, 15, … đến số 9.',
      ],
      solution:
        'Kim ngắn đã qua số 5: 5 giờ. Kim dài chỉ số 9: 9 × 5 = 45 phút. Đồng hồ chỉ 5 giờ 45 phút.',
    },
    {
      type: 'number',
      prompt: 'Kim dài chỉ vạch nhỏ thứ 2 sau số 4. Kim dài chỉ bao nhiêu phút?',
      answer: 22,
      unit: 'phút',
      hints: ['Kim dài ở số 4 là 20 phút.', 'Mỗi vạch nhỏ thêm 1 phút.'],
      solution: 'Số 4 là 20 phút, thêm 2 vạch nhỏ: 20 + 2 = 22 phút.',
    },
    {
      type: 'choice',
      prompt: '8 giờ 55 phút còn gọi là mấy giờ?',
      options: ['9 giờ kém 5 phút', '8 giờ kém 5 phút', '9 giờ kém 55 phút', '9 giờ 5 phút'],
      answer: 0,
      hints: ['Còn bao nhiêu phút nữa thì đủ 60 phút, sang giờ tiếp theo?'],
      solution: '60 − 55 = 5. Còn 5 phút nữa là 9 giờ, nên 8 giờ 55 phút là 9 giờ kém 5 phút.',
    },
    {
      type: 'choice',
      prompt:
        'Bây giờ là 3 giờ 15 phút chiều. 10 phút nữa lớp Mai học tiết cuối. Tiết cuối bắt đầu lúc mấy giờ?',
      options: [
        '3 giờ 25 phút chiều',
        '3 giờ 5 phút chiều',
        '4 giờ 15 phút chiều',
        '3 giờ 10 phút chiều',
      ],
      answer: 0,
      hints: ['10 phút nữa: em cộng thêm 10 phút vào số phút.'],
      solution: '15 phút + 10 phút = 25 phút. Tiết cuối bắt đầu lúc 3 giờ 25 phút chiều.',
    },
    {
      type: 'number',
      prompt: 'Một năm có bao nhiêu tháng?',
      answer: 12,
      unit: 'tháng',
      hints: ['Em kể tên các tháng từ tháng 1 đến tháng cuối cùng của năm.'],
      solution: 'Một năm có 12 tháng: từ tháng 1 đến tháng 12.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi tháng với số ngày của tháng đó.',
      left: ['Tháng 1', 'Tháng 2', 'Tháng 6'],
      right: ['31 ngày', '28 hoặc 29 ngày', '30 ngày'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Dùng mẹo nắm tay: tháng ở khớp có nhiều ngày hơn tháng ở chỗ lõm.'],
      solution: 'Tháng 1 có 31 ngày, tháng 2 có 28 hoặc 29 ngày, tháng 6 có 30 ngày.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các tháng có 30 ngày.',
      options: ['Tháng 4', 'Tháng 5', 'Tháng 9', 'Tháng 11', 'Tháng 12'],
      answers: [0, 2, 3],
      hints: [
        'Có 4 tháng có 30 ngày, ở đây có 3 tháng trong số đó.',
        'Tháng ở chỗ lõm của nắm tay, trừ tháng 2.',
      ],
      solution: 'Các tháng có 30 ngày là tháng 4, 6, 9, 11. Ở đây là tháng 4, tháng 9 và tháng 11.',
    },
    {
      type: 'number',
      prompt: 'Lớp Rô-bốt thi học kì từ ngày 27 đến hết ngày 29 tháng 12. Lớp thi trong mấy ngày?',
      answer: 3,
      unit: 'ngày',
      hints: ['Em đếm cả ngày đầu và ngày cuối.'],
      solution: 'Các ngày thi là 27, 28, 29. Lớp thi trong 3 ngày.',
    },
    {
      type: 'choice',
      prompt: 'Ngày 31 tháng 12 năm nay là thứ Sáu. Ngày 1 tháng 1 năm sau là thứ mấy?',
      options: ['Thứ Bảy', 'Thứ Năm', 'Chủ nhật', 'Thứ Sáu'],
      answer: 0,
      hints: ['Ngày 1 tháng 1 năm sau là ngày liền sau ngày 31 tháng 12.'],
      solution: 'Ngày 1 tháng 1 năm sau ngay sau ngày 31 tháng 12. Sau thứ Sáu là thứ Bảy.',
    },
  ],
  takeaways: [
    'Kim dài đi qua 1 vạch nhỏ là 1 phút; từ số này sang số liền sau là 5 phút.',
    '8 giờ 55 phút còn gọi là 9 giờ kém 5 phút.',
    'Một năm có 12 tháng. Tháng 4, 6, 9, 11 có 30 ngày; tháng 2 có 28 hoặc 29 ngày; các tháng còn lại có 31 ngày.',
  ],
};
