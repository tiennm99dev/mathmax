/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về ngày, giờ, phút và tờ lịch tháng: xem đồng hồ, đổi cách gọi giờ, tra lịch và giải bài toán thực tế.',
  intro:
    'Em đã biết xem đồng hồ và đọc tờ lịch. Hôm nay em ôn lại tất cả và giúp các bạn tính giờ đi chơi, ngày đi du lịch nhé!',
  objectives: [
    'Xem giờ khi kim dài chỉ số 12, số 3, số 6.',
    'Đổi giữa hai cách gọi giờ, như 15 giờ và 3 giờ chiều.',
    'Tra tờ lịch: thứ của một ngày, tuần trước, tuần sau, số ngày trong tháng.',
    'Giải bài toán về giờ và ngày trong đời sống.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'table',
          head: ['Em cần nhớ', 'Là'],
          rows: [
            ['Một ngày', '24 giờ'],
            ['Một giờ', '60 phút'],
            ['Kim dài chỉ số 3', '15 phút'],
            ['Kim dài chỉ số 6', '30 phút, hay rưỡi'],
            ['Sau 12 giờ trưa', 'Lấy số giờ trừ đi 12'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Xem tờ lịch',
          text: 'Nhìn lên đầu cột để biết thứ. Số cuối cùng cho biết số ngày của tháng. Cùng thứ, tuần sau thêm 7 ngày, tuần trước bớt 7 ngày.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Kim ngắn ở giữa số 6 và số 7 là hơn 6 giờ, chưa đến 7 giờ. Em đọc số mà kim ngắn vừa đi qua.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài tập trộn',
    instruction:
      'Nhìn đồng hồ hoặc tờ lịch rồi chạm vào đáp án. Sai lần đầu, em được gợi ý và làm lại. Hết bộ, em biết phần nào cần ôn và có thể làm bộ khác.',
  },
  examples: [
    {
      problem: 'Thư viện mở cửa từ 8 giờ đến 17 giờ. Hà đến lúc 18 giờ. Hà có vào được không?',
      steps: ['18 giờ là sau 17 giờ.', 'Thư viện đã đóng cửa.'],
      answer: 'Hà không vào được thư viện.',
    },
    {
      problem: 'Nam đi Huế ngày 5 tháng 8, đi Đà Lạt ngày 19 tháng 8. Nam đến nơi nào trước?',
      steps: ['Cùng tháng 8, em so sánh số ngày.', '5 bé hơn 19, nên ngày 5 đến trước.'],
      answer: 'Nam đến Huế trước.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Kim ngắn giữa số 4 và số 5, kim dài chỉ số 3. Đồng hồ chỉ mấy giờ?',
      options: ['4 giờ 15 phút', '5 giờ 15 phút', '4 giờ 30 phút'],
      answer: 0,
      hints: ['Kim dài chỉ số 3 là 15 phút. Kim ngắn vừa đi qua số nào?'],
      solution: 'Kim ngắn vừa qua số 4, kim dài chỉ số 3: 4 giờ 15 phút.',
    },
    {
      type: 'match',
      prompt: 'Nối hai cách gọi của cùng một giờ.',
      left: ['15 giờ', '18 giờ', '21 giờ', '24 giờ'],
      right: ['3 giờ chiều', '6 giờ chiều', '9 giờ tối', '12 giờ đêm'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Lấy số giờ trừ đi 12.'],
      solution: '15 − 12 = 3; 18 − 12 = 6; 21 − 12 = 9; 24 − 12 = 12.',
    },
    {
      type: 'number',
      prompt: 'Từ 8 giờ đến 9 giờ là bao nhiêu phút?',
      answer: 60,
      hints: ['Đó là 1 giờ. Một giờ có bao nhiêu phút?'],
      solution: 'Từ 8 giờ đến 9 giờ là 1 giờ, tức là 60 phút.',
    },
    {
      type: 'number',
      prompt: 'Từ 10 giờ đến 10 giờ rưỡi là bao nhiêu phút?',
      answer: 30,
      hints: ['Rưỡi là bao nhiêu phút?'],
      solution: '10 giờ rưỡi là 10 giờ 30 phút, nên từ 10 giờ đến đó là 30 phút.',
    },
    {
      type: 'choice',
      prompt: 'Vườn thú mở cửa từ 7 giờ đến 16 giờ 30 phút. Bạn nào đến khi vườn thú đã đóng cửa?',
      options: ['Lan đến lúc 9 giờ', 'Minh đến lúc 17 giờ 30 phút', 'Hoa đến lúc 15 giờ'],
      answer: 1,
      hints: ['Giờ nào sau 16 giờ 30 phút?'],
      solution: '17 giờ 30 phút là sau 16 giờ 30 phút. Minh đến khi vườn thú đã đóng cửa.',
    },
    {
      type: 'choice',
      prompt:
        'Nam học Toán lúc 7 giờ 15 phút, Tiếng Việt lúc 8 giờ 30 phút, Bơi lúc 10 giờ 30 phút. Môn nào học sau 9 giờ?',
      options: ['Toán', 'Tiếng Việt', 'Bơi'],
      answer: 2,
      hints: ['So sánh số giờ của mỗi môn với 9 giờ.'],
      solution:
        '7 giờ 15 phút và 8 giờ 30 phút đều trước 9 giờ. Bơi lúc 10 giờ 30 phút là sau 9 giờ.',
    },
    {
      type: 'order',
      prompt: 'Rô-bốt đi du lịch trong tháng 8. Xếp các nơi theo ngày đến, từ sớm đến muộn.',
      items: ['Sa Pa: ngày 30', 'Cà Mau: ngày 21', 'Huế: ngày 13'],
      answer: [2, 1, 0],
      hints: ['Ngày có số nhỏ hơn thì đến trước.'],
      solution: 'Ngày 13 đến Huế, ngày 21 đến Cà Mau, ngày 30 đến Sa Pa.',
    },
    {
      type: 'number',
      prompt: 'Thứ Ba tuần này là ngày 14. Thứ Ba tuần sau là ngày mấy?',
      answer: 21,
      hints: ['Tuần sau thêm mấy ngày?'],
      solution: '14 + 7 = 21. Thứ Ba tuần sau là ngày 21.',
    },
    {
      type: 'number',
      prompt: 'Thứ Sáu tuần này là ngày 24. Thứ Sáu tuần trước là ngày mấy?',
      answer: 17,
      hints: ['Tuần trước bớt mấy ngày?'],
      solution: '24 − 7 = 17. Thứ Sáu tuần trước là ngày 17.',
    },
    {
      type: 'choice',
      prompt: 'Hôm nay là ngày 30 tháng 6. Tháng 6 có 30 ngày. Ngày mai là ngày nào?',
      options: ['Ngày 31 tháng 6', 'Ngày 1 tháng 7', 'Ngày 29 tháng 6'],
      answer: 1,
      hints: ['Ngày 30 là ngày cuối của tháng 6.'],
      solution: 'Tháng 6 chỉ có 30 ngày, nên sau ngày 30 là ngày 1 tháng 7.',
    },
    {
      type: 'multi',
      prompt: 'Những tháng nào có 30 ngày?',
      options: ['Tháng 4', 'Tháng 5', 'Tháng 9', 'Tháng 12'],
      answers: [0, 2],
      hints: ['Nhớ lại bảng số ngày của các tháng, hoặc xem số cuối cùng trên tờ lịch.'],
      solution: 'Tháng 4 và tháng 9 có 30 ngày. Tháng 5 và tháng 12 có 31 ngày.',
    },
    {
      type: 'choice',
      prompt: 'Em đi ngủ lúc 21 giờ. Đó là buổi nào?',
      options: ['Buổi chiều', 'Buổi tối', 'Buổi sáng'],
      answer: 1,
      hints: ['21 − 12 bằng mấy?'],
      solution: '21 − 12 = 9. 21 giờ là 9 giờ tối, là buổi tối.',
    },
  ],
  takeaways: [
    'Xem đồng hồ: kim dài báo phút, kim ngắn báo giờ.',
    'Sau 12 giờ trưa, lấy số giờ trừ đi 12 để có cách gọi thứ hai.',
    'Xem lịch: nhìn lên đầu cột để biết thứ; số cuối cùng là số ngày của tháng.',
  ],
};
