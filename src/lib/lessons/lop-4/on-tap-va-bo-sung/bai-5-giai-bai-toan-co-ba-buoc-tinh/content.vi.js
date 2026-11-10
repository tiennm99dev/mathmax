/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Giải bài toán có ba bước tính: đọc đề, tóm tắt bằng sơ đồ, tìm từng số chưa biết theo thứ tự rồi tính kết quả cuối cùng và viết đáp số.',
  intro:
    'Mai mua 5 quyển vở, mỗi quyển 8 000 đồng, và 2 hộp bút màu, mỗi hộp 25 000 đồng. Mai phải trả bao nhiêu tiền? Em cần mấy bước để tính?',
  objectives: [
    'Phân tích được bài toán: biết gì, hỏi gì, cần tìm gì trước.',
    'Giải được bài toán có ba bước tính.',
    'Trình bày được bài giải với câu lời giải, phép tính và đáp số.',
  ],
  sections: [
    {
      heading: 'Các bước giải bài toán',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Đọc kĩ đề: bài toán cho biết gì, hỏi gì?',
            'Tóm tắt bằng sơ đồ đoạn thẳng hoặc bằng lời.',
            'Tìm cách giải: muốn tìm số bài hỏi, em cần biết những số nào trước?',
            'Giải từng bước, mỗi bước có câu lời giải và phép tính.',
            'Viết đáp số và kiểm tra lại.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Bài toán có ba bước tính: kết quả của bước trước được dùng cho bước sau.',
        },
      ],
    },
    {
      heading: 'Ví dụ: mua vở và bút màu',
      blocks: [
        {
          type: 'p',
          text: 'Muốn biết Mai trả tất cả bao nhiêu tiền, em cần biết tiền mua vở và tiền mua bút màu.',
        },
        {
          type: 'table',
          head: ['Bước', 'Câu lời giải', 'Phép tính'],
          rows: [
            ['1', 'Số tiền mua vở là', '8 000 × 5 = 40 000 (đồng)'],
            ['2', 'Số tiền mua bút màu là', '25 000 × 2 = 50 000 (đồng)'],
            ['3', 'Mai phải trả tất cả là', '40 000 + 50 000 = 90 000 (đồng)'],
          ],
        },
        {
          type: 'p',
          text: 'Đáp số: 90 000 đồng.',
        },
      ],
    },
    {
      heading: 'Nhìn sơ đồ để tìm cách giải',
      blocks: [
        {
          type: 'p',
          text: '"Nhiều hơn" thì em làm phép cộng. "Ít hơn" thì em làm phép trừ. "Gấp lên mấy lần" thì em làm phép nhân.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Sơ đồ đoạn thẳng giúp em thấy phần nào đã biết, phần nào chưa biết, cần tìm phần nào trước.',
        },
      ],
    },
  ],
  explore: {
    title: 'Sơ đồ mở dần từng bước',
    instruction:
      'Em đọc bài toán và nhìn sơ đồ. Ở mỗi bước, em chọn phép tính đúng. Đoạn thẳng có dấu ? sẽ hiện số khi em tìm ra.',
  },
  examples: [
    {
      problem:
        'Bác Đào nuôi 1 200 con vịt. Bác Mận nuôi ít hơn bác Đào 300 con. Bác Cúc nuôi nhiều hơn bác Đào 500 con. Hỏi cả ba bác nuôi bao nhiêu con vịt?',
      steps: [
        'Số vịt bác Mận nuôi là: 1 200 − 300 = 900 (con).',
        'Số vịt bác Cúc nuôi là: 1 200 + 500 = 1 700 (con).',
        'Cả ba bác nuôi số con vịt là: 1 200 + 900 + 1 700 = 3 800 (con).',
      ],
      answer: 'Đáp số: 3 800 con vịt.',
    },
    {
      problem:
        'Một thùng có 120 l nước mắm. Ngày thứ nhất bán 25 l, ngày thứ hai bán gấp đôi ngày thứ nhất, ngày thứ ba bán 35 l. Hỏi thùng còn lại bao nhiêu lít nước mắm?',
      steps: [
        'Ngày thứ hai bán được: 25 × 2 = 50 (l).',
        'Cả ba ngày bán được: 25 + 50 + 35 = 110 (l).',
        'Thùng còn lại: 120 − 110 = 10 (l).',
      ],
      answer: 'Đáp số: 10 l nước mắm.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt:
        'Thứ Sáu bán 12 máy tính. Thứ Bảy bán nhiều hơn Thứ Sáu 5 máy. Chủ nhật bán nhiều hơn Thứ Bảy 10 máy. Em xếp các bước giải theo đúng thứ tự.',
      items: [
        'Cả ba ngày: 12 + 17 + 27 = 56 (máy)',
        'Thứ Bảy: 12 + 5 = 17 (máy)',
        'Chủ nhật: 17 + 10 = 27 (máy)',
      ],
      answer: [1, 2, 0],
      hints: ['Muốn tính Chủ nhật, em cần biết Thứ Bảy trước.'],
      solution:
        'Thứ Bảy: 12 + 5 = 17. Chủ nhật: 17 + 10 = 27. Cả ba ngày: 12 + 17 + 27 = 56 máy tính.',
    },
    {
      type: 'number',
      prompt:
        'Thứ Sáu bán 12 máy tính. Thứ Bảy bán nhiều hơn Thứ Sáu 5 máy. Chủ nhật bán nhiều hơn Thứ Bảy 10 máy. Cả ba ngày bán được bao nhiêu máy tính?',
      answer: 56,
      unit: 'máy tính',
      hints: [
        'Bước 1: tìm số máy bán Thứ Bảy.',
        'Bước 2: tìm số máy bán Chủ nhật, rồi cộng cả ba ngày.',
      ],
      solution:
        'Thứ Bảy: 12 + 5 = 17. Chủ nhật: 17 + 10 = 27. Cả ba ngày: 12 + 17 + 27 = 56 (máy tính).',
    },
    {
      type: 'choice',
      prompt: 'Bài toán mua vở và bút màu: bước đầu tiên em có thể tính gì?',
      options: ['Số tiền mua 5 quyển vở', 'Số tiền Mai phải trả tất cả', 'Số tiền còn thừa'],
      answer: 0,
      hints: ['Muốn tính tất cả, em cần biết tiền mua vở và tiền mua bút màu trước.'],
      solution: 'Bước đầu tiên tính số tiền mua vở: 8 000 × 5 = 40 000 đồng.',
    },
    {
      type: 'number',
      prompt:
        'Giỏ sầu riêng có 12 quả. Giỏ bưởi có số quả gấp 2 lần giỏ sầu riêng. Giỏ xoài nhiều hơn giỏ bưởi 13 quả. Cả ba giỏ có bao nhiêu quả?',
      answer: 73,
      unit: 'quả',
      hints: ['Giỏ bưởi: 12 × 2.', 'Giỏ xoài: lấy số quả giỏ bưởi cộng 13.'],
      solution:
        'Giỏ bưởi: 12 × 2 = 24 (quả). Giỏ xoài: 24 + 13 = 37 (quả). Cả ba giỏ: 12 + 24 + 37 = 73 (quả).',
    },
    {
      type: 'number',
      prompt:
        'Có 40 quả táo xếp vào các túi, mỗi túi 8 quả. Có 36 quả cam xếp vào các túi, mỗi túi 6 quả. Túi cam nhiều hơn túi táo mấy túi?',
      answer: 1,
      unit: 'túi',
      hints: [
        'Tìm số túi táo: 40 : 8. Tìm số túi cam: 36 : 6.',
        'Rồi lấy số túi nhiều trừ số túi ít.',
      ],
      solution:
        'Số túi táo: 40 : 8 = 5 (túi). Số túi cam: 36 : 6 = 6 (túi). Túi cam nhiều hơn: 6 − 5 = 1 (túi).',
    },
    {
      type: 'choice',
      prompt:
        'Một thùng có 120 l nước mắm. Ngày đầu bán 25 l, ngày thứ hai bán gấp đôi ngày đầu, ngày thứ ba bán 35 l. Phép tính nào cho biết số lít còn lại?',
      options: ['120 − (25 + 50 + 35)', '120 − (25 + 25 + 35)', '120 + 25 + 50 + 35'],
      answer: 0,
      hints: ['Ngày thứ hai bán 25 × 2 = 50 l.', 'Số còn lại bằng số ban đầu trừ số đã bán.'],
      solution: 'Đã bán: 25 + 50 + 35 = 110 (l). Còn lại: 120 − 110 = 10 (l).',
    },
    {
      type: 'number',
      prompt:
        'Kho thứ nhất chứa 20 240 kg gạo. Kho thứ hai chứa nhiều hơn kho thứ nhất 5 400 kg. Kho thứ ba chứa ít hơn kho thứ hai 4 600 kg. Cả ba kho chứa bao nhiêu ki-lô-gam gạo?',
      answer: 66920,
      unit: 'kg',
      hints: ['Kho thứ hai: 20 240 + 5 400.', 'Kho thứ ba: lấy kho thứ hai trừ 4 600.'],
      solution:
        'Kho thứ hai: 20 240 + 5 400 = 25 640 (kg). Kho thứ ba: 25 640 − 4 600 = 21 040 (kg). Cả ba kho: 20 240 + 25 640 + 21 040 = 66 920 (kg).',
    },
  ],
  takeaways: [
    'Đọc đề, tóm tắt, tìm cách giải rồi mới tính.',
    'Bài toán có ba bước tính: tìm từng số chưa biết, rồi tính số bài hỏi.',
    'Mỗi bước có câu lời giải và phép tính; cuối cùng viết đáp số.',
  ],
};
