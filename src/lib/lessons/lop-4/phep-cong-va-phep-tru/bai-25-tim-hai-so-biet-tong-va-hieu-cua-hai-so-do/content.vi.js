/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tìm hai số biết tổng và hiệu của hai số đó bằng sơ đồ đoạn thẳng: số bé bằng (tổng − hiệu) : 2, số lớn bằng (tổng + hiệu) : 2.',
  intro:
    'Tổng của hai số là 70. Số lớn hơn số bé 10. Hai số đó là những số nào? Em vẽ sơ đồ đoạn thẳng để tìm nhé!',
  objectives: [
    'Vẽ được sơ đồ đoạn thẳng cho bài toán tổng và hiệu.',
    'Tìm được số bé, số lớn khi biết tổng và hiệu của chúng.',
    'Giải được bài toán thực tế về tổng và hiệu.',
  ],
  sections: [
    {
      heading: 'Bài toán và sơ đồ',
      blocks: [
        {
          type: 'p',
          text: 'Bài toán: Tổng của hai số là 70. Hiệu của hai số đó là 10. Tìm hai số đó.',
        },
        {
          type: 'p',
          text: 'Sơ đồ: em vẽ một đoạn thẳng cho số bé. Đoạn thẳng của số lớn dài bằng số bé và thêm một đoạn bằng hiệu, 10. Cả hai đoạn cộng lại là tổng, 70.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Nếu bớt đi phần hơn (hiệu) ở số lớn, số lớn bằng số bé. Khi đó tổng còn lại đúng bằng hai lần số bé.',
        },
      ],
    },
    {
      heading: 'Cách 1: Tìm số bé trước',
      blocks: [
        { type: 'p', text: 'Hai lần số bé là: 70 − 10 = 60.' },
        { type: 'p', text: 'Số bé là: 60 : 2 = 30. Số lớn là: 30 + 10 = 40.' },
        { type: 'callout', tone: 'theorem', text: 'Số bé = (Tổng − Hiệu) : 2.' },
      ],
    },
    {
      heading: 'Cách 2: Tìm số lớn trước',
      blocks: [
        {
          type: 'p',
          text: 'Nếu thêm phần hơn vào số bé, số bé bằng số lớn. Hai lần số lớn là: 70 + 10 = 80.',
        },
        { type: 'p', text: 'Số lớn là: 80 : 2 = 40. Số bé là: 40 − 10 = 30.' },
        { type: 'callout', tone: 'theorem', text: 'Số lớn = (Tổng + Hiệu) : 2.' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thử lại',
          text: '40 + 30 = 70 là tổng; 40 − 30 = 10 là hiệu. Đúng!',
        },
      ],
    },
  ],
  explore: {
    title: 'Hai thanh băng',
    instruction:
      'Em kéo thanh trượt để đổi số bé. Thanh số lớn luôn dài hơn đúng bằng hiệu. Khi hai thanh cộng lại bằng tổng là em tìm đúng. Bấm "Bớt phần hơn" để thấy hai đoạn bằng nhau.',
  },
  examples: [
    {
      problem:
        'Hai lớp 4A và 4B trồng được 600 cây. Lớp 4A trồng được nhiều hơn lớp 4B 50 cây. Hỏi mỗi lớp trồng được bao nhiêu cây?',
      steps: [
        'Tổng là 600, hiệu là 50. Lớp 4B trồng ít hơn, là số bé.',
        'Lớp 4B trồng được: (600 − 50) : 2 = 275 (cây).',
        'Lớp 4A trồng được: 275 + 50 = 325 (cây).',
        'Thử lại: 325 + 275 = 600 và 325 − 275 = 50.',
      ],
      answer: 'Lớp 4A: 325 cây; lớp 4B: 275 cây.',
    },
    {
      problem:
        'Tuổi bố và tuổi con cộng lại là 58 tuổi. Bố hơn con 38 tuổi. Hỏi bố bao nhiêu tuổi, con bao nhiêu tuổi?',
      steps: [
        'Tổng là 58, hiệu là 38. Tuổi bố là số lớn.',
        'Tuổi bố là: (58 + 38) : 2 = 48 (tuổi).',
        'Tuổi con là: 48 − 38 = 10 (tuổi).',
      ],
      answer: 'Bố 48 tuổi, con 10 tuổi.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tổng của hai số là 70, hiệu của hai số là 10. Số lớn là số nào?',
      answer: 40,
      hints: ['Số lớn = (Tổng + Hiệu) : 2.'],
      solution: 'Số lớn là: (70 + 10) : 2 = 40.',
    },
    {
      type: 'number',
      prompt: 'Tổng của hai số là 90, hiệu của hai số là 24. Số bé là số nào?',
      answer: 33,
      hints: ['Số bé = (Tổng − Hiệu) : 2.'],
      solution: 'Số bé là: (90 − 24) : 2 = 66 : 2 = 33. Số lớn là 33 + 24 = 57.',
    },
    {
      type: 'choice',
      prompt: 'Muốn tìm số bé, em làm thế nào?',
      options: ['(Tổng − Hiệu) : 2', '(Tổng + Hiệu) : 2', 'Tổng − Hiệu'],
      answer: 0,
      hints: ['Bớt phần hơn ở số lớn thì còn lại hai lần số bé.'],
      solution: 'Tổng trừ hiệu được hai lần số bé, rồi chia cho 2: Số bé = (Tổng − Hiệu) : 2.',
    },
    {
      type: 'match',
      prompt: 'Nối tổng và hiệu với hai số cần tìm.',
      left: ['Tổng 50, hiệu 10', 'Tổng 100, hiệu 20', 'Tổng 36, hiệu 6', 'Tổng 80, hiệu 30'],
      right: ['30 và 20', '60 và 40', '21 và 15', '55 và 25', '35 và 15'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em thử lại: cộng hai số phải được tổng, trừ hai số phải được hiệu.'],
      solution:
        '30 + 20 = 50, 30 − 20 = 10; 60 + 40 = 100, 60 − 40 = 20; 21 + 15 = 36, 21 − 15 = 6; 55 + 25 = 80, 55 − 25 = 30.',
    },
    {
      type: 'choice',
      prompt: 'Tổng của hai số là 45, hiệu của hai số là 7. Hai số đó là:',
      options: ['26 và 19', '25 và 20', '26 và 18', '38 và 7'],
      answer: 0,
      hints: ['Số bé = (45 − 7) : 2.'],
      solution:
        'Số bé là (45 − 7) : 2 = 19. Số lớn là 19 + 7 = 26. Thử lại: 26 + 19 = 45, 26 − 19 = 7.',
    },
    {
      type: 'number',
      prompt: 'Số lớn hơn số bé 16. Tổng của hai số là 120. Số bé là số nào?',
      answer: 52,
      hints: ['Hiệu là 16, tổng là 120.', 'Số bé = (Tổng − Hiệu) : 2.'],
      solution: 'Số bé là: (120 − 16) : 2 = 104 : 2 = 52. Số lớn là 52 + 16 = 68.',
    },
    {
      type: 'number',
      prompt:
        'Thư viện có 1 450 quyển sách truyện và sách giáo khoa. Sách truyện nhiều hơn sách giáo khoa 350 quyển. Hỏi thư viện có bao nhiêu quyển sách giáo khoa?',
      answer: 550,
      unit: 'quyển',
      hints: ['Sách giáo khoa ít hơn, là số bé.', 'Số bé = (Tổng − Hiệu) : 2.'],
      solution:
        'Số sách giáo khoa là: (1 450 − 350) : 2 = 550 (quyển). Số sách truyện là 550 + 350 = 900 (quyển).',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh vườn hình chữ nhật có nửa chu vi là 64 m. Chiều dài hơn chiều rộng 12 m. Hỏi chiều dài mảnh vườn là bao nhiêu mét?',
      answer: 38,
      unit: 'm',
      hints: [
        'Nửa chu vi là tổng của chiều dài và chiều rộng.',
        'Chiều dài là số lớn: (Tổng + Hiệu) : 2.',
      ],
      solution: 'Chiều dài là: (64 + 12) : 2 = 38 (m). Chiều rộng là 38 − 12 = 26 (m).',
    },
  ],
  takeaways: [
    'Vẽ sơ đồ đoạn thẳng: số lớn dài hơn số bé một đoạn bằng hiệu.',
    'Số bé = (Tổng − Hiệu) : 2.',
    'Số lớn = (Tổng + Hiệu) : 2.',
    'Thử lại: cộng hai số được tổng, trừ hai số được hiệu.',
  ],
};
