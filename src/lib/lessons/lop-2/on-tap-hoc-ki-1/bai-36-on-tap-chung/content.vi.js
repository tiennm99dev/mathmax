/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập toàn bộ học kì 1: số trên tia số, xem lịch, xem đồng hồ, đặt tính có nhớ, đường gấp khúc, đếm hình, kg, l và giải bài toán.',
  intro:
    'Đây là bài ôn tập cuối học kì 1. Em ôn lại số, phép tính, hình, đồng hồ, tờ lịch, cân và lít. Bài ôn tập sẽ cho em biết phần nào đã vững, phần nào cần luyện thêm nhé!',
  objectives: [
    'Tìm số trên tia số, xem thứ của một ngày, xem đồng hồ.',
    'Đặt tính rồi tính phép cộng, phép trừ có nhớ.',
    'Tính độ dài đường gấp khúc và đếm hình.',
    'Đọc cân, đếm số lít và giải bài toán.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'table',
          head: ['Em cần nhớ', 'Là'],
          rows: [
            ['Tia số', 'Mỗi vạch hơn vạch trước một số như nhau'],
            ['Một tuần', '7 ngày, từ thứ Hai đến Chủ nhật'],
            ['Một giờ', '60 phút'],
            ['Sau 12 giờ trưa', 'Lấy số giờ trừ đi 12: 15 giờ là 3 giờ chiều'],
            ['Đường gấp khúc', 'Cộng độ dài các đoạn thẳng'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đặt tính có nhớ',
          text: 'Thẳng cột, tính từ phải sang trái, đừng quên nhớ 1 sang hàng chục.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Với đồng hồ buổi chiều, số trên mặt đồng hồ cộng thêm 12 mới ra giờ trong ngày: 5 giờ 30 phút chiều là 17 giờ 30 phút.',
        },
      ],
    },
    {
      heading: 'Giải bài toán',
      blocks: [
        {
          type: 'list',
          items: [
            'Nhiều hơn, cao hơn, thêm, có tất cả: em làm phép cộng.',
            'Ít hơn, bớt đi, còn lại: em làm phép trừ.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập thông minh',
    instruction:
      'Mỗi bộ có 12 câu về toàn bộ học kì 1. Đầu tiên em làm mỗi phần một câu. Phần nào em làm sai, bài sẽ hỏi thêm phần đó. Bản đồ kĩ năng cho em biết phần nào cần ôn lại.',
  },
  examples: [
    {
      problem: 'Ngày 19 tháng 12 là thứ Hai. Ngày 22 tháng 12 là thứ mấy?',
      steps: [
        'Em đếm tiếp từng ngày: ngày 20 là thứ Ba, ngày 21 là thứ Tư.',
        'Ngày 22 là thứ tiếp theo: thứ Năm.',
      ],
      answer: 'Ngày 22 tháng 12 là thứ Năm.',
    },
    {
      problem:
        'Kiến đến chỗ miếng bánh bằng hai đường. Đường ABC gồm đoạn 52 cm và đoạn 38 cm. Đường MNPQ gồm đoạn 39 cm, đoạn 23 cm và đoạn 35 cm. Đường nào ngắn hơn?',
      steps: [
        'Đường ABC dài: 52 + 38 = 90 (cm).',
        'Đường MNPQ dài: 39 + 23 + 35 = 97 (cm).',
        '90 cm bé hơn 97 cm.',
      ],
      answer: 'Đường ABC ngắn hơn.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Trên tia số có các số 38, 39, 40, rồi đến dấu hỏi. Số nào thay cho dấu hỏi?',
      options: ['39', '40', '41'],
      answer: 2,
      hints: ['Hai vạch liền nhau hơn kém nhau 1.'],
      solution: 'Số ngay sau 40 là 41.',
    },
    {
      type: 'choice',
      prompt: 'Ngày 5 tháng 3 là thứ Tư. Ngày 8 tháng 3 là thứ mấy?',
      options: ['Thứ Sáu', 'Thứ Bảy', 'Chủ nhật'],
      answer: 1,
      hints: ['Em đếm tiếp từng ngày, mỗi ngày là một thứ tiếp theo.'],
      solution: 'Ngày 6 là thứ Năm, ngày 7 là thứ Sáu, ngày 8 là thứ Bảy.',
    },
    {
      type: 'match',
      prompt: 'Nối hai cách gọi của cùng một giờ.',
      left: ['14 giờ', '16 giờ 30 phút', '20 giờ'],
      right: ['2 giờ chiều', '4 giờ 30 phút chiều', '8 giờ tối', '3 giờ chiều'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Em lấy số giờ trừ đi 12.'],
      solution: '14 − 12 = 2. 16 − 12 = 4. 20 − 12 = 8.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 36 + 7 = ?',
      answer: 43,
      hints: ['6 cộng 7 được hơn 10, em nhớ 1 sang hàng chục.'],
      solution: '6 cộng 7 bằng 13, viết 3, nhớ 1. 3 thêm 1 bằng 4, viết 4. Vậy 36 + 7 = 43.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 91 − 85 = ?',
      answer: 6,
      hints: ['1 không trừ được 5. Em lấy 11 trừ 5, rồi nhớ 1.'],
      solution:
        '1 không trừ được 5, lấy 11 trừ 5 bằng 6, viết 6, nhớ 1. 8 thêm 1 bằng 9, 9 trừ 9 bằng 0. Vậy 91 − 85 = 6.',
    },
    {
      type: 'number',
      prompt: 'Rô-bốt cao 89 cm. Mi cao hơn Rô-bốt 9 cm. Hỏi Mi cao bao nhiêu xăng-ti-mét?',
      answer: 98,
      hints: ['Cao hơn thì em làm phép cộng.'],
      solution: 'Mi cao là: 89 + 9 = 98 (cm). Đáp số: 98 cm.',
    },
    {
      type: 'number',
      prompt:
        'Đường gấp khúc ABCD có AB dài 4 cm, BC dài 3 cm, CD dài 6 cm. Đường gấp khúc dài bao nhiêu xăng-ti-mét?',
      answer: 13,
      hints: ['Em cộng độ dài ba đoạn thẳng.'],
      solution: 'Độ dài đường gấp khúc ABCD là: 4 + 3 + 6 = 13 (cm).',
    },
    {
      type: 'number',
      prompt:
        'Can có 10 l nước. Bạn rót ra hai ca, mỗi ca 2 l. Hỏi can còn lại bao nhiêu lít nước?',
      answer: 6,
      hints: ['Rót ra hai ca nên em trừ hai lần.'],
      solution: 'Can còn lại: 10 − 2 − 2 = 6 (l). Đáp số: 6 l.',
    },
    {
      type: 'number',
      prompt:
        'Lớp 2A góp được 83 quyển sách. Lớp 2B góp được ít hơn lớp 2A 18 quyển sách. Hỏi lớp 2B góp được bao nhiêu quyển sách?',
      answer: 65,
      hints: ['Ít hơn thì em làm phép trừ. Hàng đơn vị: 3 không trừ được 8.'],
      solution:
        'Lớp 2B góp được số quyển sách là: 83 − 18 = 65 (quyển sách). Đáp số: 65 quyển sách.',
    },
    {
      type: 'number',
      prompt: 'Em tính theo chiều mũi tên: 62 → trừ 6 → cộng 27 → trừ 40. Ô cuối cùng là số nào?',
      answer: 43,
      hints: ['Kết quả của phép trước là số đầu của phép sau.'],
      solution: '62 − 6 = 56. 56 + 27 = 83. 83 − 40 = 43. Ô cuối cùng là 43.',
    },
    {
      type: 'multi',
      prompt: 'Những giờ nào là buổi chiều?',
      options: ['14 giờ', '9 giờ', '16 giờ', '21 giờ'],
      answers: [0, 2],
      hints: ['Buổi chiều là từ 13 giờ đến 18 giờ.'],
      solution:
        '14 giờ là 2 giờ chiều, 16 giờ là 4 giờ chiều. 9 giờ là 9 giờ sáng, 21 giờ là 9 giờ tối.',
    },
    {
      type: 'order',
      prompt: 'Xếp các phép tính theo kết quả từ bé đến lớn.',
      items: ['73 − 6', '82 − 57', '29 + 64', '5 + 48'],
      answer: [1, 3, 0, 2],
      hints: ['Em tính kết quả từng phép tính trước.'],
      solution: '82 − 57 = 25, 5 + 48 = 53, 73 − 6 = 67, 29 + 64 = 93.',
    },
  ],
  takeaways: [
    'Tia số: mỗi vạch hơn vạch trước một số như nhau.',
    'Đồng hồ: kim ngắn chỉ giờ, kim dài chỉ phút. Sau 12 giờ trưa, lấy số giờ trừ đi 12.',
    'Đặt tính: thẳng cột, tính từ phải sang trái, nhớ 1 khi cần.',
    'Giải bài toán: đọc kĩ để chọn phép cộng hay phép trừ.',
  ],
};
