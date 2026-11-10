/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung chủ đề Một số đơn vị đo đại lượng: yến, tạ, tấn; dm², m², mm²; giây và thế kỉ; đổi đơn vị, so sánh số đo và giải bài toán thực tế.',
  intro:
    'Em đã học yến, tạ, tấn, các đơn vị đo diện tích, giây và thế kỉ. Giờ em luyện tập tất cả nhé!',
  objectives: [
    'Đổi được các đơn vị đo khối lượng, diện tích, thời gian đã học.',
    'So sánh và tính được với các số đo.',
    'Biết một năm thuộc thế kỉ nào.',
    'Giải được bài toán thực tế có các đơn vị đo.',
  ],
  sections: [
    {
      heading: 'Khối lượng và diện tích',
      blocks: [
        {
          type: 'table',
          head: ['tấn', 'tạ', 'yến', 'kg'],
          rows: [['1 tấn = 10 tạ', '1 tạ = 10 yến', '1 yến = 10 kg', '1 kg']],
          caption: 'Đơn vị đo khối lượng: gấp nhau 10 lần',
        },
        {
          type: 'table',
          head: ['m²', 'dm²', 'cm²', 'mm²'],
          rows: [['1 m² = 100 dm²', '1 dm² = 100 cm²', '1 cm² = 100 mm²', '1 mm²']],
          caption: 'Đơn vị đo diện tích: gấp nhau 100 lần',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Muốn so sánh hay cộng, trừ hai số đo, em đổi về cùng một đơn vị.',
        },
      ],
    },
    {
      heading: 'Giây và thế kỉ',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          text: '1 phút = 60 giây. 1 thế kỉ = 100 năm.',
        },
        {
          type: 'p',
          text: 'Thế kỉ XX từ năm 1901 đến năm 2000. Thế kỉ XXI từ năm 2001 đến năm 2100.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Năm tròn trăm là năm cuối của một thế kỉ: năm 1900 thuộc thế kỉ XIX.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện tập',
    instruction:
      'Mỗi câu thuộc một phần của chủ đề. Em chạm vào đáp án. Sai lần đầu, em xem gợi ý rồi thử lại. Cuối bộ bài, em biết phần nào cần ôn thêm.',
  },
  examples: [
    {
      problem: 'Con voi nặng 4 tấn, con bò nặng 3 tạ. Con voi nặng hơn con bò bao nhiêu tạ?',
      steps: ['Đổi về cùng đơn vị tạ: 4 tấn = 40 tạ.', '40 − 3 = 37 (tạ).'],
      answer: 'Con voi nặng hơn con bò 37 tạ.',
    },
    {
      problem: '1 m² 5 dm² = ? dm²',
      steps: ['1 m² = 100 dm².', '100 dm² + 5 dm² = 105 dm².'],
      answer: '1 m² 5 dm² = 105 dm².',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: '4 tạ 5 yến = ? kg',
      answer: 450,
      unit: 'kg',
      hints: ['1 tạ = 100 kg; 1 yến = 10 kg.'],
      solution: '4 tạ = 400 kg; 5 yến = 50 kg. 400 + 50 = 450. Vậy 4 tạ 5 yến = 450 kg.',
    },
    {
      type: 'number',
      prompt: '7 000 kg = ? tấn',
      answer: 7,
      unit: 'tấn',
      hints: ['Cứ 1 000 kg là 1 tấn.'],
      solution: '7 000 : 1 000 = 7. Vậy 7 000 kg = 7 tấn.',
    },
    {
      type: 'choice',
      prompt: '3 tấn 50 kg ? 3 500 kg',
      options: ['<', '>', '='],
      answer: 0,
      hints: ['Em đổi 3 tấn 50 kg ra ki-lô-gam.', '3 tấn = 3 000 kg.'],
      solution: '3 tấn 50 kg = 3 000 kg + 50 kg = 3 050 kg. Mà 3 050 kg < 3 500 kg.',
    },
    {
      type: 'number',
      prompt: '125 tạ × 4 = ? tạ',
      answer: 500,
      unit: 'tạ',
      hints: ['Em nhân 125 với 4 rồi giữ nguyên đơn vị tạ.'],
      solution: '125 × 4 = 500. Vậy 125 tạ × 4 = 500 tạ.',
    },
    {
      type: 'order',
      prompt: 'Em xếp các số đo theo thứ tự từ nhẹ đến nặng.',
      items: ['2 tạ', '25 yến', '2 tạ 5 kg', '1 tấn'],
      answer: [0, 2, 1, 3],
      hints: ['Em đổi tất cả ra ki-lô-gam.', '25 yến = 250 kg; 2 tạ 5 kg = 205 kg.'],
      solution: '200 kg < 205 kg < 250 kg < 1 000 kg. Vậy: 2 tạ; 2 tạ 5 kg; 25 yến; 1 tấn.',
    },
    {
      type: 'number',
      prompt: '6 m² = ? dm²',
      answer: 600,
      unit: 'dm²',
      hints: ['1 m² = 100 dm².'],
      solution: '6 m² = 6 × 100 dm² = 600 dm².',
    },
    {
      type: 'number',
      prompt: '2 dm² 30 cm² = ? cm²',
      answer: 230,
      unit: 'cm²',
      hints: ['1 dm² = 100 cm².', 'Đổi 2 dm² ra cm² rồi cộng thêm 30 cm².'],
      solution: '2 dm² = 200 cm². 200 + 30 = 230. Vậy 2 dm² 30 cm² = 230 cm².',
    },
    {
      type: 'number',
      prompt: 'Một tấm bìa hình vuông cạnh 5 dm. Diện tích tấm bìa là bao nhiêu xăng-ti-mét vuông?',
      answer: 2500,
      unit: 'cm²',
      hints: ['Tính diện tích theo dm² trước: cạnh nhân cạnh.', '1 dm² = 100 cm².'],
      solution: '5 × 5 = 25. Diện tích là 25 dm² = 25 × 100 cm² = 2 500 cm².',
    },
    {
      type: 'number',
      prompt: '3 phút 10 giây = ? giây',
      answer: 190,
      unit: 'giây',
      hints: ['1 phút = 60 giây.'],
      solution: '3 phút = 180 giây. 180 + 10 = 190. Vậy 3 phút 10 giây = 190 giây.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi năm với thế kỉ của nó.',
      left: ['Năm 1010', 'Năm 1900', 'Năm 1945', 'Năm 2001'],
      right: ['XI', 'XIX', 'XX', 'XXI'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Năm tròn trăm là năm cuối của một thế kỉ.', 'Thế kỉ XX từ năm 1901 đến năm 2000.'],
      solution:
        'Năm 1010: thế kỉ XI. Năm 1900: thế kỉ XIX. Năm 1945: thế kỉ XX. Năm 2001: thế kỉ XXI.',
    },
    {
      type: 'number',
      prompt: 'Thế kỉ XXI kết thúc vào năm nào?',
      answer: 2100,
      hints: ['Thế kỉ XXI bắt đầu từ năm 2001 và dài 100 năm.'],
      solution: 'Thế kỉ XXI từ năm 2001 đến năm 2100. Thế kỉ XXI kết thúc vào năm 2100.',
    },
    {
      type: 'number',
      prompt: 'Cửa hàng có 2 tấn gạo, đã bán 8 tạ gạo. Cửa hàng còn lại bao nhiêu tạ gạo?',
      answer: 12,
      unit: 'tạ',
      hints: ['Em đổi 2 tấn ra tạ trước.', '1 tấn = 10 tạ.'],
      solution: '2 tấn = 20 tạ. 20 − 8 = 12. Cửa hàng còn lại 12 tạ gạo.',
    },
  ],
  takeaways: [
    'Đơn vị khối lượng yến, tạ, tấn gấp nhau 10 lần; đơn vị diện tích gấp nhau 100 lần.',
    '1 phút = 60 giây; 1 thế kỉ = 100 năm; năm tròn trăm là năm cuối của thế kỉ.',
  ],
};
