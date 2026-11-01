/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đường gấp khúc và cách tính độ dài bằng cách cộng độ dài các đoạn thẳng; nhận biết hình tứ giác có 4 cạnh, 4 đỉnh.',
  intro:
    'Ốc sên bò hết đoạn này lại rẽ sang đoạn khác. Đường đi đó là đường gấp khúc. Muốn biết ốc sên bò bao xa, em cộng độ dài các đoạn lại!',
  objectives: [
    'Nhận biết và gọi tên đường gấp khúc.',
    'Tính độ dài đường gấp khúc khi biết độ dài các đoạn thẳng.',
    'Nhận biết hình tứ giác và đếm số hình tứ giác trong hình.',
  ],
  sections: [
    {
      heading: 'Đường gấp khúc',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Đường gấp khúc',
          text: 'Các đoạn thẳng nối tiếp nhau và gấp ở chỗ nối tạo thành một đường gấp khúc.',
        },
        {
          type: 'p',
          text: 'Đường gấp khúc ABCD gồm ba đoạn thẳng: AB, BC và CD. Em đọc tên các điểm theo thứ tự đi qua.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Đường gấp khúc gồm ít nhất hai đoạn thẳng. Hai đoạn nối nhau phải không nằm trên cùng một đường thẳng.',
        },
      ],
    },
    {
      heading: 'Độ dài đường gấp khúc',
      blocks: [
        {
          type: 'callout',
          tone: 'note',
          title: 'Cách tính',
          text: 'Độ dài đường gấp khúc là tổng độ dài các đoạn thẳng tạo nên đường gấp khúc đó.',
        },
        {
          type: 'p',
          text: 'Đường gấp khúc ABC có AB dài 2 cm, BC dài 5 cm. Độ dài đường gấp khúc ABC là: 2 + 5 = 7 (cm).',
        },
      ],
    },
    {
      heading: 'Hình tứ giác',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình tứ giác',
          text: 'Hình tứ giác là hình khép kín có 4 cạnh và 4 đỉnh.',
        },
        {
          type: 'p',
          text: 'Hình vuông và hình chữ nhật có 4 cạnh, 4 đỉnh nên cũng là hình tứ giác. Em xếp các hình dưới đây vào đúng ô nhé.',
        },
        { type: 'widget', name: 'tu-giac' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đếm hình tứ giác',
          text: 'Khi đếm, em đếm cả hình nhỏ và hình to gồm các hình nhỏ ghép lại.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vẽ đường gấp khúc',
    instruction:
      'Chạm lần lượt các chấm để đặt điểm A, B, C, ... Mỗi bước giữa hai chấm cạnh nhau dài 1 cm. Độ dài từng đoạn tự cộng lại. Em cũng có thể dùng phím mũi tên và phím Enter.',
  },
  examples: [
    {
      problem:
        'Đường gấp khúc ABCD có AB dài 5 cm, BC dài 4 cm, CD dài 4 cm. Tính độ dài đường gấp khúc ABCD.',
      steps: [
        'Đường gấp khúc ABCD gồm ba đoạn thẳng AB, BC, CD.',
        'Em cộng độ dài ba đoạn thẳng: 5 + 4 + 4 = 13.',
        'Bài giải: Độ dài đường gấp khúc ABCD là: 5 + 4 + 4 = 13 (cm).',
      ],
      answer: 'Đáp số: 13 cm.',
    },
    {
      problem:
        'Trên giấy ô vuông, đường gấp khúc màu hồng gồm 6 cạnh ô vuông. Đường gấp khúc màu xanh gồm 7 cạnh ô vuông. Đường nào dài hơn?',
      steps: ['Các cạnh ô vuông dài bằng nhau, nên em so sánh số cạnh.', '7 lớn hơn 6.'],
      answer: 'Đường gấp khúc màu xanh dài hơn.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Đường gấp khúc MNPQ gồm mấy đoạn thẳng?',
      options: ['2 đoạn thẳng', '3 đoạn thẳng', '4 đoạn thẳng'],
      answer: 1,
      hints: ['Kể tên các đoạn: MN, NP, ... rồi đếm.'],
      solution: 'Đường gấp khúc MNPQ gồm ba đoạn thẳng: MN, NP và PQ.',
    },
    {
      type: 'choice',
      prompt: 'Đường gấp khúc ABC có AB dài 3 cm, BC dài 6 cm. Đường gấp khúc ABC dài bao nhiêu?',
      options: ['9 cm', '3 cm', '6 cm'],
      answer: 0,
      hints: ['Em cộng độ dài các đoạn thẳng lại.'],
      solution: 'Độ dài đường gấp khúc ABC là: 3 + 6 = 9 (cm).',
    },
    {
      type: 'choice',
      prompt: 'Đường gấp khúc MNPQ có MN, NP, PQ đều dài 4 cm. Đường gấp khúc MNPQ dài bao nhiêu?',
      options: ['8 cm', '16 cm', '12 cm'],
      answer: 2,
      hints: ['Đường gấp khúc này có ba đoạn thẳng, mỗi đoạn dài 4 cm.'],
      solution: 'Độ dài đường gấp khúc MNPQ là: 4 + 4 + 4 = 12 (cm).',
    },
    {
      type: 'order',
      prompt: 'Xếp các đoạn thẳng của đường gấp khúc DEGH theo thứ tự đi từ D đến H.',
      items: ['Đoạn GH', 'Đoạn DE', 'Đoạn EG'],
      answer: [1, 2, 0],
      hints: ['Bắt đầu từ điểm D, đi qua E, rồi đến G.'],
      solution: 'Đi từ D đến H: đoạn DE, đoạn EG, đoạn GH.',
    },
    {
      type: 'choice',
      prompt: 'Hình nào là hình tứ giác?',
      options: ['Hình có 4 cạnh, 4 đỉnh', 'Hình có 3 cạnh, 3 đỉnh', 'Hình có 5 cạnh, 5 đỉnh'],
      answer: 0,
      hints: ['"Tứ" nghĩa là bốn.'],
      solution: 'Hình tứ giác là hình khép kín có 4 cạnh và 4 đỉnh.',
    },
    {
      type: 'choice',
      prompt: 'Em vẽ 1 hình vuông, 2 hình chữ nhật và 1 hình tam giác. Em đã vẽ mấy hình tứ giác?',
      options: ['4 hình', '2 hình', '3 hình'],
      answer: 2,
      hints: ['Hình nào có 4 cạnh? Hình tam giác chỉ có 3 cạnh.'],
      solution: 'Hình vuông và hình chữ nhật có 4 cạnh. Có 1 + 2 = 3 hình tứ giác.',
    },
    {
      type: 'choice',
      prompt:
        'Một hình chữ nhật được kẻ một đoạn thẳng, chia thành hai hình chữ nhật nhỏ. Có tất cả mấy hình tứ giác?',
      options: ['2 hình', '3 hình', '4 hình'],
      answer: 1,
      hints: ['Đếm hai hình nhỏ. Đừng quên hình to gồm cả hai hình nhỏ.'],
      solution: 'Có 2 hình nhỏ và 1 hình to: 2 + 1 = 3 hình tứ giác.',
    },
    {
      type: 'multi',
      prompt: 'Những đồ vật nào có mặt dạng hình tứ giác?',
      options: ['Mặt bàn học hình chữ nhật', 'Chiếc đồng hồ tròn', 'Quyển vở', 'Bảng lớp học'],
      answers: [0, 2, 3],
      hints: ['Tìm mặt có 4 cạnh. Hình tròn không có cạnh.'],
      solution:
        'Mặt bàn, quyển vở và bảng lớp có 4 cạnh, 4 đỉnh nên có dạng hình tứ giác. Mặt đồng hồ tròn thì không.',
    },
    {
      type: 'choice',
      prompt:
        'Việt chạy theo đường gấp khúc gồm 3 đoạn thẳng. Mai chạy theo đường gấp khúc gồm 2 đoạn thẳng. Đường chạy của ai có nhiều đoạn thẳng hơn?',
      options: ['Việt', 'Mai'],
      answer: 0,
      hints: ['So sánh số đoạn thẳng: 3 và 2.'],
      solution: '3 lớn hơn 2, nên đường chạy của Việt có nhiều đoạn thẳng hơn.',
    },
    {
      type: 'choice',
      prompt:
        'Một sợi dây thép uốn thành đường gấp khúc gồm các đoạn dài 10 cm, 20 cm và 5 cm. Sợi dây dài bao nhiêu xăng-ti-mét?',
      options: ['30 cm', '35 cm', '25 cm'],
      answer: 1,
      hints: ['Độ dài sợi dây bằng tổng độ dài các đoạn.'],
      solution: 'Sợi dây thép dài là: 10 + 20 + 5 = 35 (cm). Đáp số: 35 cm.',
    },
  ],
  takeaways: [
    'Đường gấp khúc gồm các đoạn thẳng nối tiếp nhau và gấp ở chỗ nối.',
    'Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng của nó.',
    'Hình tứ giác là hình khép kín có 4 cạnh và 4 đỉnh.',
  ],
};
