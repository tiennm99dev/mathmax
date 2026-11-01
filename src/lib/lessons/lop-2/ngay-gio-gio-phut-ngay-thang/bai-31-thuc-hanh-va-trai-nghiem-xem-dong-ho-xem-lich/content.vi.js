/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành quay kim đồng hồ, xem giờ thực tế, tra tờ lịch tháng và lập lịch sinh hoạt cho một tuần.',
  intro:
    'Em tan học lúc mấy giờ? Thứ Bảy tuần này là ngày nào? Hôm nay em tự xem đồng hồ, tự tra lịch và lập lịch cho cả tuần nhé!',
  objectives: [
    'Quay kim đồng hồ đến giờ cho trước, đọc được giờ trên đồng hồ.',
    'Tra tờ lịch tháng để tìm ngày và thứ.',
    'Lập được lịch sinh hoạt cho một tuần.',
  ],
  sections: [
    {
      heading: 'Xem đồng hồ',
      blocks: [
        {
          type: 'p',
          text: 'Em xem kim dài trước. Rồi em xem kim ngắn vừa đi qua số nào.',
        },
        {
          type: 'table',
          head: ['Đồng hồ', 'Em đọc'],
          rows: [
            ['Kim ngắn chỉ số 2, kim dài chỉ số 12', '2 giờ'],
            ['Kim ngắn giữa số 7 và số 8, kim dài chỉ số 3', '7 giờ 15 phút'],
            ['Kim ngắn giữa số 9 và số 10, kim dài chỉ số 6', '9 giờ 30 phút'],
          ],
        },
      ],
    },
    {
      heading: 'Xem lịch',
      blocks: [
        {
          type: 'p',
          text: 'Trên tờ lịch tháng, mỗi cột là một thứ, mỗi hàng là một tuần.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Hôm qua ở ngay bên trái, ngày mai ở ngay bên phải. Tuần trước ở ngay trên, tuần sau ở ngay dưới.',
        },
      ],
    },
    {
      heading: 'Em tự làm',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: em lập lịch sinh hoạt thật cho một tuần của mình.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chuẩn bị: một tờ lịch tháng, một chiếc đồng hồ và một tờ giấy.',
            'Tìm hôm nay trên tờ lịch. Đọc to: hôm nay là thứ mấy, ngày bao nhiêu, tháng mấy?',
            'Tìm hôm qua và ngày mai. Đọc to là thứ mấy, ngày nào.',
            'Kẻ bảng 3 cột: Ngày, Giờ, Việc em làm.',
            'Mỗi ngày trong tuần, ghi một việc và giờ làm việc đó, như "thứ Ba, 16 giờ 30 phút, học bơi".',
            'Khi đến giờ, em nhìn đồng hồ xem có đúng giờ đã ghi không. Đánh dấu vào bảng nếu đúng.',
          ],
        },
        {
          type: 'p',
          text: 'Kể cho cả lớp: việc nào em làm sớm nhất trong ngày? Việc nào muộn nhất? Em có làm đúng giờ không?',
        },
      ],
    },
  ],
  explore: {
    title: 'Lập lịch cho một tuần',
    instruction:
      'Chọn một việc và đọc ngày, giờ của việc đó. Chạm vào ngày trên tờ lịch, kéo kim đồng hồ đến đúng giờ, rồi bấm "Ghi vào lịch". Xếp xong sáu việc là em có lịch cả tuần.',
  },
  examples: [
    {
      problem: 'Lớp vào học lúc 7 giờ. Lan đến lớp lúc 6 giờ 30 phút. Lan có đi học muộn không?',
      steps: ['6 giờ 30 phút là trước 7 giờ.', 'Lan đến trước giờ vào học.'],
      answer: 'Lan không đi học muộn.',
    },
    {
      problem: 'Ngày 1 tháng 6 là thứ Tư. Thứ Tư tuần sau là ngày nào?',
      steps: ['Tuần sau hơn tuần này 7 ngày.', '1 + 7 = 8.'],
      answer: 'Thứ Tư tuần sau là ngày 8 tháng 6.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Lớp vào học lúc 7 giờ 30 phút. Bạn nào đến muộn?',
      options: ['An đến lúc 7 giờ', 'Bình đến lúc 7 giờ 15 phút', 'Cúc đến lúc 7 giờ 45 phút'],
      answer: 2,
      hints: ['Bạn đến muộn là bạn đến sau 7 giờ 30 phút.'],
      solution: 'Chỉ có 7 giờ 45 phút là sau 7 giờ 30 phút. Cúc đến muộn.',
    },
    {
      type: 'order',
      prompt: 'Xếp các việc của Nam, từ sớm đến muộn.',
      items: [
        'Đọc sách: 19 giờ 30 phút',
        'Ăn cơm: 11 giờ',
        'Đi xe đạp: 16 giờ 30 phút',
        'Thức dậy: 6 giờ',
      ],
      answer: [3, 1, 2, 0],
      hints: ['So sánh số giờ, số nhỏ hơn là sớm hơn.'],
      solution: '6 giờ, 11 giờ, 16 giờ 30 phút, 19 giờ 30 phút.',
    },
    {
      type: 'choice',
      prompt: 'Kim ngắn giữa số 11 và số 12, kim dài chỉ số 3. Đồng hồ chỉ mấy giờ?',
      options: ['11 giờ 15 phút', '12 giờ 15 phút', '3 giờ 11 phút'],
      answer: 0,
      hints: ['Kim ngắn vừa đi qua số nào? Kim dài chỉ số 3 là bao nhiêu phút?'],
      solution: 'Kim ngắn vừa qua số 11, kim dài chỉ số 3: 11 giờ 15 phút.',
    },
    {
      type: 'number',
      prompt: 'Thứ Hai là ngày 16 tháng 5. Thứ Bảy của tuần đó là ngày mấy?',
      answer: 21,
      hints: ['Đếm tiếp: thứ Ba 17, thứ Tư 18, rồi thứ Năm, thứ Sáu, thứ Bảy.'],
      solution: 'Từ thứ Hai đến thứ Bảy là thêm 5 ngày: 16 + 5 = 21.',
    },
    {
      type: 'number',
      prompt: 'Thứ Năm tuần này là ngày 16 tháng 6. Thứ Năm tuần trước là ngày mấy?',
      answer: 9,
      hints: ['Tuần trước kém tuần này 7 ngày.'],
      solution: '16 − 7 = 9. Thứ Năm tuần trước là ngày 9 tháng 6.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi việc với giờ hợp lí.',
      left: ['Thức dậy', 'Ăn trưa', 'Đi ngủ'],
      right: ['6 giờ sáng', '11 giờ trưa', '9 giờ tối'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Mỗi việc thường làm vào buổi nào?'],
      solution: 'Thức dậy: 6 giờ sáng; ăn trưa: 11 giờ trưa; đi ngủ: 9 giờ tối.',
    },
  ],
  takeaways: [
    'Xem kim dài trước, rồi xem kim ngắn vừa đi qua số nào.',
    'Trên tờ lịch: bên trái là hôm qua, bên phải là ngày mai, trên là tuần trước, dưới là tuần sau.',
    'Em có thể lập lịch cho tuần của mình bằng lịch và đồng hồ.',
  ],
};
