/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về chu vi và diện tích: chu vi hình tam giác, hình tứ giác, hình chữ nhật, hình vuông; diện tích theo xăng-ti-mét vuông; giải bài toán thực tế.',
  intro:
    'Em đã biết tính chu vi và diện tích một số hình. Hôm nay em ôn lại, phân biệt chu vi với diện tích và giải vài bài toán về khu vườn, viên gạch, tờ giấy nhé!',
  objectives: [
    'Tính được chu vi hình tam giác, hình tứ giác, hình chữ nhật, hình vuông.',
    'Tính được diện tích hình chữ nhật, hình vuông theo cm².',
    'Vận dụng vào bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'table',
          head: ['Hình', 'Chu vi', 'Diện tích'],
          rows: [
            ['Hình chữ nhật', '(chiều dài + chiều rộng) × 2', 'chiều dài × chiều rộng'],
            ['Hình vuông', 'cạnh × 4', 'cạnh × cạnh'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chu vi',
          text: 'Chu vi của một hình là tổng độ dài các cạnh. Chu vi đo bằng đơn vị đo độ dài: cm, dm, m.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Diện tích',
          text: 'Diện tích là phần mặt phẳng bên trong hình. Em đã học đơn vị đo diện tích xăng-ti-mét vuông (cm²).',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Hình chữ nhật dài 5 cm, rộng 3 cm: chu vi là 16 cm, diện tích là 15 cm². Các cạnh phải cùng đơn vị đo trước khi tính.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài tập trộn',
    instruction:
      'Em đọc câu hỏi, xem hình rồi chạm vào đáp án. Sai lần đầu, em được gợi ý và làm lại. Hết bộ, em biết phần nào cần ôn và có thể làm bộ khác.',
  },
  examples: [
    {
      problem: 'Mảnh vườn hình chữ nhật dài 15 m, rộng 8 m. Tính chu vi mảnh vườn.',
      steps: ['Lấy chiều dài cộng chiều rộng: 15 + 8 = 23 (m).', 'Nhân với 2: 23 × 2 = 46 (m).'],
      answer: 'Chu vi mảnh vườn là 46 m.',
    },
    {
      problem:
        'Một sợi dây dài 24 cm được uốn thành một hình vuông. Cạnh hình vuông dài bao nhiêu? Diện tích hình vuông là bao nhiêu?',
      steps: [
        'Sợi dây dài bằng chu vi hình vuông: 24 cm.',
        'Cạnh hình vuông là: 24 : 4 = 6 (cm).',
        'Diện tích hình vuông là: 6 × 6 = 36 (cm²).',
      ],
      answer: 'Cạnh hình vuông dài 6 cm, diện tích là 36 cm².',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Hình tam giác có ba cạnh dài 6 cm, 8 cm, 10 cm. Chu vi hình tam giác là bao nhiêu xăng-ti-mét?',
      answer: 24,
      unit: 'cm',
      hints: ['Cộng độ dài ba cạnh.'],
      solution: 'Chu vi hình tam giác là: 6 + 8 + 10 = 24 (cm).',
    },
    {
      type: 'choice',
      prompt: 'Hình chữ nhật có chiều dài 15 cm, chiều rộng 7 cm. Chu vi là bao nhiêu?',
      options: ['44 cm', '22 cm', '105 cm', '29 cm'],
      answer: 0,
      hints: ['Lấy chiều dài cộng chiều rộng rồi nhân với 2.'],
      solution: 'Chu vi hình chữ nhật là: (15 + 7) × 2 = 44 (cm).',
    },
    {
      type: 'number',
      prompt: 'Hình vuông có cạnh 9 cm. Chu vi hình vuông là bao nhiêu xăng-ti-mét?',
      answer: 36,
      unit: 'cm',
      hints: ['Lấy độ dài một cạnh nhân với 4.'],
      solution: 'Chu vi hình vuông là: 9 × 4 = 36 (cm).',
    },
    {
      type: 'number',
      prompt:
        'Hình chữ nhật có chiều dài 9 cm, chiều rộng 7 cm. Diện tích là bao nhiêu xăng-ti-mét vuông?',
      answer: 63,
      unit: 'cm²',
      hints: ['Lấy chiều dài nhân với chiều rộng.'],
      solution: 'Diện tích hình chữ nhật là: 9 × 7 = 63 (cm²).',
    },
    {
      type: 'number',
      prompt: 'Hình vuông có cạnh 7 cm. Diện tích là bao nhiêu xăng-ti-mét vuông?',
      answer: 49,
      unit: 'cm²',
      hints: ['Lấy độ dài một cạnh nhân với chính nó.'],
      solution: 'Diện tích hình vuông là: 7 × 7 = 49 (cm²).',
    },
    {
      type: 'match',
      prompt: 'Em nối mỗi câu hỏi với kết quả đúng.',
      left: [
        'Chu vi hình chữ nhật dài 8 cm, rộng 5 cm',
        'Diện tích hình chữ nhật dài 8 cm, rộng 5 cm',
        'Chu vi hình vuông cạnh 8 cm',
        'Diện tích hình vuông cạnh 8 cm',
      ],
      right: ['26 cm', '40 cm²', '32 cm', '64 cm²'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Chu vi đo bằng cm, diện tích đo bằng cm².'],
      solution: '(8 + 5) × 2 = 26 (cm). 8 × 5 = 40 (cm²). 8 × 4 = 32 (cm). 8 × 8 = 64 (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Một sợi dây dài 36 cm được uốn thành một hình vuông. Cạnh hình vuông dài bao nhiêu xăng-ti-mét?',
      answer: 9,
      unit: 'cm',
      hints: ['Sợi dây dài bằng chu vi hình vuông.', 'Chu vi chia cho 4 được cạnh.'],
      solution: 'Cạnh hình vuông là: 36 : 4 = 9 (cm).',
    },
    {
      type: 'number',
      prompt:
        'Bạn Lan ghép 4 viên gạch hình vuông cạnh 5 cm thành một hình vuông lớn. Diện tích hình vuông lớn là bao nhiêu xăng-ti-mét vuông?',
      answer: 100,
      unit: 'cm²',
      hints: [
        'Diện tích hình lớn bằng tổng diện tích 4 viên gạch.',
        'Mỗi viên gạch có diện tích 5 × 5.',
      ],
      solution:
        'Diện tích một viên gạch là: 5 × 5 = 25 (cm²). Diện tích hình vuông lớn là: 25 × 4 = 100 (cm²).',
    },
    {
      type: 'choice',
      prompt:
        'Hình chữ nhật dài 6 cm, rộng 2 cm và hình vuông cạnh 4 cm có cùng chu vi 16 cm. Hình nào có diện tích lớn hơn?',
      options: ['Hình vuông', 'Hình chữ nhật', 'Hai hình bằng nhau'],
      answer: 0,
      hints: ['Cùng chu vi chưa chắc cùng diện tích. Em tính diện tích từng hình.'],
      solution:
        'Hình chữ nhật: 6 × 2 = 12 (cm²). Hình vuông: 4 × 4 = 16 (cm²). 16 > 12 nên hình vuông có diện tích lớn hơn.',
    },
    {
      type: 'number',
      prompt:
        'Tờ giấy hình chữ nhật dài 12 cm, rộng 8 cm. Bạn Minh cắt ra một hình vuông cạnh 8 cm. Phần giấy còn lại có diện tích bao nhiêu xăng-ti-mét vuông?',
      answer: 32,
      unit: 'cm²',
      hints: [
        'Tính diện tích tờ giấy và diện tích hình vuông cắt ra.',
        'Lấy diện tích tờ giấy trừ diện tích hình vuông.',
      ],
      solution:
        'Diện tích tờ giấy là: 12 × 8 = 96 (cm²). Diện tích hình vuông là: 8 × 8 = 64 (cm²). Phần còn lại là: 96 − 64 = 32 (cm²).',
    },
    {
      type: 'order',
      prompt: 'Em xếp các hình theo diện tích từ bé đến lớn.',
      items: [
        'Hình vuông cạnh 5 cm',
        'Hình chữ nhật dài 8 cm, rộng 3 cm',
        'Hình chữ nhật dài 9 cm, rộng 3 cm',
        'Hình vuông cạnh 4 cm',
      ],
      answer: [3, 1, 0, 2],
      hints: ['Em tính diện tích từng hình trước.'],
      solution:
        'Hình vuông cạnh 4 cm: 16 cm². Hình chữ nhật 8 cm, 3 cm: 24 cm². Hình vuông cạnh 5 cm: 25 cm². Hình chữ nhật 9 cm, 3 cm: 27 cm².',
    },
  ],
  takeaways: [
    'Chu vi hình chữ nhật = (dài + rộng) × 2; chu vi hình vuông = cạnh × 4.',
    'Diện tích hình chữ nhật = dài × rộng; diện tích hình vuông = cạnh × cạnh.',
    'Biết chu vi hình vuông, lấy chu vi chia cho 4 được cạnh.',
    'Hai hình cùng chu vi chưa chắc có diện tích bằng nhau.',
  ],
};
