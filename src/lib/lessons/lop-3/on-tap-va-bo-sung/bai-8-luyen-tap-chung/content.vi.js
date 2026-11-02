/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Ôn tập và bổ sung: cấu tạo số, cộng trừ có nhớ, tìm thành phần chưa biết, bảng nhân chia, phép nhân và phép chia với 1 và 0, đường gấp khúc.',
  intro:
    'Có 3 đĩa, mỗi đĩa không có quả nào. Cả 3 đĩa có mấy quả? Hôm nay em luyện tập cả chủ đề và làm quen với phép nhân, phép chia với 1 và với 0 nhé!',
  objectives: [
    'Viết số thành tổng các trăm, chục, đơn vị. Đặt tính cộng, trừ có nhớ.',
    'Tìm thành phần chưa biết trong các phép tính.',
    'Biết nhân, chia với 1 và nhân, chia với 0.',
    'Giải bài toán có lời văn và tính độ dài đường gấp khúc.',
  ],
  sections: [
    {
      heading: 'Nhân với 1, chia cho 1',
      blocks: [
        {
          type: 'p',
          text: '1 × 3 = 1 + 1 + 1 = 3. Đổi chỗ: 3 × 1 = 3.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số nào nhân với 1 cũng bằng chính số đó. Số nào chia cho 1 cũng bằng chính số đó.',
        },
        {
          type: 'table',
          head: ['Nhân với 1', 'Chia cho 1'],
          rows: [
            ['2 × 1 = 2', '2 : 1 = 2'],
            ['1 × 4 = 4', '4 : 1 = 4'],
            ['5 × 1 = 5', '5 : 1 = 5'],
          ],
        },
      ],
    },
    {
      heading: 'Nhân với 0, số 0 chia cho một số',
      blocks: [
        {
          type: 'p',
          text: '0 × 3 = 0 + 0 + 0 = 0. Đổi chỗ: 3 × 0 = 0.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Số nào nhân với 0 cũng bằng 0. Số 0 chia cho số nào khác 0 cũng bằng 0.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Ghi nhớ',
          text: 'Không có phép chia cho 0.',
        },
      ],
    },
    {
      heading: 'Ôn lại cả chủ đề',
      blocks: [
        {
          type: 'list',
          items: [
            '356 = 300 + 50 + 6.',
            'Đặt tính rồi tính từ phải sang trái, nhớ 1 khi cần.',
            'Tìm số hạng: lấy tổng trừ đi số hạng kia.',
            'Tìm số bị trừ: lấy hiệu cộng với số trừ.',
            'Tìm số trừ: lấy số bị trừ trừ đi hiệu.',
            'Từ 3 × 4 = 12 suy ra 12 : 3 = 4 và 12 : 4 = 3.',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Xếp đĩa và luyện tập',
    instruction:
      'Chọn một quy tắc rồi thêm hoặc bớt để xem vì sao kết quả như vậy. Chọn "Luyện tập" để làm bộ bài trộn từ cả chủ đề. Sai lần đầu sẽ có gợi ý.',
  },
  examples: [
    {
      problem:
        'Trường Kim Đồng có 428 học sinh. Trường Hòa Bình có nhiều hơn Trường Kim Đồng 35 học sinh. Trường Hòa Bình có bao nhiêu học sinh?',
      steps: ['Nhiều hơn: em làm phép cộng.', '428 + 35 = 463.'],
      answer: 'Trường Hòa Bình có 463 học sinh.',
    },
    {
      problem: 'Đường gấp khúc ABCDEG có 5 đoạn, mỗi đoạn dài 2 cm. Đường gấp khúc dài bao nhiêu?',
      steps: ['Các đoạn dài bằng nhau: 2 được lấy 5 lần.', '2 × 5 = 10.'],
      answer: 'Đường gấp khúc dài 10 cm.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Xếp các con vật theo thứ tự từ nhẹ đến nặng.',
      items: ['Hổ 230 kg', 'Gấu trắng Bắc Cực 450 kg', 'Báo 70 kg', 'Sư tử 180 kg'],
      answer: [2, 3, 0, 1],
      hints: ['Em so sánh các số, bắt đầu từ số bé nhất.'],
      solution: '70 < 180 < 230 < 450. Báo, Sư tử, Hổ, Gấu trắng Bắc Cực.',
    },
    {
      type: 'choice',
      prompt: 'Viết số 356 thành tổng các trăm, chục, đơn vị.',
      options: ['300 + 60 + 5', '300 + 50 + 6', '30 + 50 + 6', '300 + 5 + 6'],
      answer: 1,
      hints: ['Số 356 có 3 trăm, 5 chục, 6 đơn vị.'],
      solution: '356 = 300 + 50 + 6.',
    },
    {
      type: 'number',
      prompt:
        'Trường Quang Trung có 563 học sinh. Trường Lê Lợi nhiều hơn 29 học sinh. Trường Lê Lợi có bao nhiêu học sinh?',
      answer: 592,
      unit: 'học sinh',
      hints: ['Nhiều hơn: em làm phép cộng.'],
      solution: '563 + 29 = 592 (học sinh).',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 965 − 549.',
      answer: 416,
      hints: ['5 không trừ được 9. Em lấy 15 trừ 9, nhớ 1.'],
      solution:
        '15 − 9 = 6, viết 6, nhớ 1. 4 thêm 1 bằng 5, 6 − 5 = 1, viết 1. 9 − 5 = 4, viết 4. Vậy 965 − 549 = 416.',
    },
    {
      type: 'number',
      prompt: '? − 125 = 230. Số cần tìm là số nào?',
      answer: 355,
      hints: ['Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ.'],
      solution: '230 + 125 = 355.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả.',
      left: ['5 × 1', '1 × 6', '7 : 1', '0 : 8'],
      right: ['7', '0', '5', '6'],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: ['Nhân với 1 hay chia cho 1 đều bằng chính số đó. Số 0 chia cho số khác 0 bằng 0.'],
      solution: '5 × 1 = 5. 1 × 6 = 6. 7 : 1 = 7. 0 : 8 = 0.',
    },
    {
      type: 'number',
      prompt: '0 × 9 = ?',
      answer: 0,
      hints: ['0 được lấy 9 lần.'],
      solution: '0 × 9 = 0 + 0 + ... + 0 = 0.',
    },
    {
      type: 'multi',
      prompt: 'Những phép tính nào có kết quả bằng 0?',
      options: ['0 × 7', '7 × 0', '0 : 7', '7 : 1'],
      answers: [0, 1, 2],
      hints: ['Số nào nhân với 0 cũng bằng 0.'],
      solution: '0 × 7 = 0. 7 × 0 = 0. 0 : 7 = 0. Còn 7 : 1 = 7.',
    },
    {
      type: 'number',
      prompt: '12 : ? = 3. Số cần tìm là số nào?',
      answer: 4,
      hints: ['12 chia cho mấy thì bằng 3? Em tính 12 : 3.'],
      solution: '12 : 3 = 4. Vậy 12 : 4 = 3, số cần tìm là 4.',
    },
    {
      type: 'match',
      prompt: 'Nối hai phép tính có cùng kết quả.',
      left: ['15 : 3', '3 × 4', '14 : 2', '0 : 6'],
      right: ['2 × 6', '28 : 4', '5 × 0', '25 : 5'],
      pairs: [
        [0, 3],
        [1, 0],
        [2, 1],
        [3, 2],
      ],
      hints: ['Em tính kết quả của từng phép tính.'],
      solution: '15 : 3 = 25 : 5 = 5. 3 × 4 = 2 × 6 = 12. 14 : 2 = 28 : 4 = 7. 0 : 6 = 5 × 0 = 0.',
    },
    {
      type: 'number',
      prompt: 'Tổ em có 8 bạn, mỗi bạn góp 5 quyển vở. Tổ em góp được bao nhiêu quyển vở?',
      answer: 40,
      unit: 'quyển',
      hints: ['5 được lấy 8 lần.'],
      solution: '5 × 8 = 40 (quyển vở).',
    },
    {
      type: 'number',
      prompt: 'Đường gấp khúc ABCDE có 4 đoạn, mỗi đoạn dài 3 cm. Đường gấp khúc dài bao nhiêu?',
      answer: 12,
      unit: 'cm',
      hints: ['Em lấy độ dài một đoạn nhân với số đoạn.'],
      solution: '3 × 4 = 12 (cm).',
    },
  ],
  takeaways: [
    'Số nào nhân với 1 hay chia cho 1 cũng bằng chính số đó.',
    'Số nào nhân với 0 cũng bằng 0. Số 0 chia cho số khác 0 bằng 0.',
    'Không có phép chia cho 0.',
    'Nhiều hơn thì cộng, ít hơn thì trừ, chia đều thì chia.',
  ],
};
