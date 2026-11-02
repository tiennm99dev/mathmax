/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập phép cộng, phép trừ trong phạm vi 1000: tính nhẩm số tròn trăm, tròn chục, đặt tính có nhớ, tính từ trái sang phải, so sánh kết quả và giải bài toán.',
  intro:
    'Em đã biết cộng, trừ các số đến 1000. Hôm nay em tính nhẩm, đặt tính và giải bài toán về quãng đường, về cây xanh. Bài ôn tập sẽ cho em biết phần nào cần luyện thêm nhé!',
  objectives: [
    'Tính nhẩm các số tròn trăm, tròn chục.',
    'Đặt tính rồi tính phép cộng, phép trừ trong phạm vi 1000.',
    'Tính phép tính có hai dấu từ trái sang phải.',
    'Giải bài toán có phép cộng, phép trừ trong phạm vi 1000.',
    'Biết phần nào mình còn cần luyện thêm.',
  ],
  sections: [
    {
      heading: 'Tính nhẩm số tròn trăm',
      blocks: [
        {
          type: 'p',
          text: 'Em tính theo số trăm. 300 + 400 = 700, vì 3 trăm + 4 trăm = 7 trăm.',
        },
        {
          type: 'p',
          text: '1000 − 300 = 700, vì 10 trăm − 3 trăm = 7 trăm.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tròn trăm và tròn chục',
          text: '500 + 40 = 540, vì 5 trăm và 4 chục là 540. 540 − 40 = 500.',
        },
      ],
    },
    {
      heading: 'Đặt tính rồi tính',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Viết các chữ số cùng hàng thẳng cột với nhau.',
            'Tính từ phải sang trái: đơn vị, rồi chục, rồi trăm.',
            'Có nhớ thì thêm 1 vào hàng bên trái.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Viết thẳng cột từ bên phải: trong 354 + 63, chữ số 3 của 63 ở dưới chữ số 4, chữ số 6 ở dưới chữ số 5.',
        },
      ],
    },
    {
      heading: 'Phép tính có hai dấu',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Phép tính có hai dấu cộng, trừ: em tính từ trái sang phải.',
        },
        {
          type: 'p',
          text: '410 + 35 − 20: 410 + 35 = 445, rồi 445 − 20 = 425. Vậy 410 + 35 − 20 = 425.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài ôn tập thông minh',
    instruction:
      'Mỗi bộ có 12 câu. Đầu tiên em làm mỗi phần một câu. Phần nào em làm sai, bài sẽ hỏi thêm phần đó. Bản đồ kĩ năng cho em biết phần nào đã vững, phần nào cần ôn lại.',
  },
  examples: [
    {
      problem: 'Đặt tính rồi tính: 432 + 284.',
      steps: [
        'Viết 432, viết 284 bên dưới. Các chữ số cùng hàng thẳng cột.',
        'Hàng đơn vị: 2 cộng 4 bằng 6, viết 6.',
        'Hàng chục: 3 cộng 8 bằng 11, viết 1, nhớ 1.',
        'Hàng trăm: 4 cộng 2 bằng 6, thêm 1 bằng 7, viết 7.',
      ],
      answer: '432 + 284 = 716.',
    },
    {
      problem:
        'Từ Hà Nội đến Vinh dài 308 km. Từ Vinh đến Đà Nẵng dài 463 km. Hỏi đi từ Hà Nội đến Đà Nẵng, qua Vinh, dài bao nhiêu ki-lô-mét?',
      steps: [
        'Em cộng độ dài hai quãng đường: 308 + 463.',
        'Bài giải: Quãng đường từ Hà Nội đến Đà Nẵng dài là: 308 + 463 = 771 (km).',
      ],
      answer: 'Đáp số: 771 km.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi phép tính với kết quả của nó.',
      left: ['200 + 300', '900 − 300', '1000 − 600', '600 + 60'],
      right: ['500', '600', '400', '660', '700'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em tính theo số trăm. Với 600 + 60, em ghép 6 trăm và 6 chục.'],
      solution: '200 + 300 = 500. 900 − 300 = 600. 1000 − 600 = 400. 600 + 60 = 660.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 236 + 528 = ?',
      answer: 764,
      hints: ['Hàng đơn vị: 6 cộng 8 được hơn 10. Em nhớ 1 sang hàng chục.'],
      solution:
        '6 cộng 8 bằng 14, viết 4, nhớ 1. 3 cộng 2 bằng 5, thêm 1 bằng 6, viết 6. 2 cộng 5 bằng 7, viết 7. Vậy 236 + 528 = 764.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 753 − 236 = ?',
      answer: 517,
      hints: ['3 không trừ được 6. Em lấy 13 trừ 6, rồi nhớ 1.'],
      solution:
        '3 không trừ được 6, lấy 13 trừ 6 bằng 7, viết 7, nhớ 1. 3 thêm 1 bằng 4, 5 trừ 4 bằng 1, viết 1. 7 trừ 2 bằng 5, viết 5. Vậy 753 − 236 = 517.',
    },
    {
      type: 'number',
      prompt: 'Đặt tính rồi tính: 880 − 54 = ?',
      answer: 826,
      hints: ['Hàng đơn vị: 0 không trừ được 4. Em lấy 10 trừ 4, rồi nhớ 1.'],
      solution:
        '0 không trừ được 4, lấy 10 trừ 4 bằng 6, viết 6, nhớ 1. 5 thêm 1 bằng 6, 8 trừ 6 bằng 2, viết 2. Hạ 8, viết 8. Vậy 880 − 54 = 826.',
    },
    {
      type: 'multi',
      prompt: 'Những phép tính nào có kết quả bé hơn 400?',
      options: ['462 + 100', '189 + 200', '640 − 240', '570 − 300'],
      answers: [1, 3],
      hints: ['Em tính từng phép tính. Kết quả bằng 400 thì chưa được chọn.'],
      solution:
        '462 + 100 = 562. 189 + 200 = 389. 640 − 240 = 400. 570 − 300 = 270. Bé hơn 400 là 389 và 270.',
    },
    {
      type: 'choice',
      prompt: 'Bạn Lan tính 536 + 8 = 534. Bạn ấy làm đúng hay sai?',
      options: ['Đúng', 'Sai'],
      answer: 1,
      hints: ['Hàng đơn vị: 6 cộng 8 được hơn 10. Bạn ấy có nhớ 1 không?'],
      solution:
        '6 cộng 8 bằng 14, viết 4, nhớ 1. 3 thêm 1 bằng 4, viết 4. Hạ 5, viết 5. 536 + 8 = 544. Bạn Lan quên nhớ 1.',
    },
    {
      type: 'choice',
      prompt:
        'Từ Hà Nội đến Cao Bằng dài 285 km. Từ Hà Nội đến Vinh dài 308 km. Từ Hà Nội, nơi nào xa hơn?',
      options: ['Cao Bằng', 'Vinh'],
      answer: 1,
      hints: ['Em so sánh hàng trăm của hai số.'],
      solution: '308 > 285, nên từ Hà Nội, Vinh xa hơn Cao Bằng.',
    },
    {
      type: 'number',
      prompt: 'Em tính: 216 + 65 − 81 = ?',
      answer: 200,
      hints: ['Em tính từ trái sang phải: 216 + 65 trước.'],
      solution: '216 + 65 = 281. 281 − 81 = 200.',
    },
    {
      type: 'number',
      prompt:
        'Trường Lê Lợi trồng được 264 cây. Trường Nguyễn Trãi trồng được 229 cây. Hỏi cả hai trường trồng được bao nhiêu cây?',
      answer: 493,
      unit: 'cây',
      hints: ['Cả hai trường là gộp lại, em làm phép cộng.'],
      solution: 'Cả hai trường trồng được số cây là: 264 + 229 = 493 (cây). Đáp số: 493 cây.',
    },
    {
      type: 'number',
      prompt: 'Chị Mai cao 119 cm. Em Mi cao 98 cm. Chị Mai cao hơn em Mi bao nhiêu xăng-ti-mét?',
      answer: 21,
      unit: 'cm',
      hints: ['Muốn biết cao hơn bao nhiêu, em lấy số lớn trừ số bé.'],
      solution: 'Chị Mai cao hơn em Mi là: 119 − 98 = 21 (cm). Đáp số: 21 cm.',
    },
    {
      type: 'number',
      prompt:
        'Số lớn nhất có ba chữ số khác nhau là 987. Số bé nhất có ba chữ số là 100. Hiệu của hai số đó là bao nhiêu?',
      answer: 887,
      hints: ['Hiệu là kết quả của phép trừ: lấy số lớn trừ số bé.'],
      solution: '987 − 100 = 887. Hiệu của hai số đó là 887.',
    },
    {
      type: 'number',
      prompt: 'Em tính theo chiều mũi tên: 800 → trừ 600 → cộng 63 → trừ 8. Ô cuối cùng là số nào?',
      answer: 255,
      hints: ['Kết quả của phép trước là số đầu của phép sau.'],
      solution: '800 − 600 = 200. 200 + 63 = 263. 263 − 8 = 255. Ô cuối cùng là 255.',
    },
  ],
  takeaways: [
    'Số tròn trăm: em tính theo số trăm.',
    'Đặt tính: thẳng cột, tính từ phải sang trái, nhớ 1 khi cần.',
    'Phép tính có hai dấu: tính từ trái sang phải.',
  ],
};
