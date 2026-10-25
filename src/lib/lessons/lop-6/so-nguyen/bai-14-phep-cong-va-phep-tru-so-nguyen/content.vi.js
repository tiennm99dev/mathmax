/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Cộng hai số nguyên cùng dấu và khác dấu, số đối của một số nguyên, tính chất của phép cộng và quy tắc trừ hai số nguyên: trừ là cộng với số đối.',
  intro:
    'Buổi sáng nhiệt độ là $-3\\,^\\circ\\text{C}$, đến trưa tăng thêm $8\\,^\\circ\\text{C}$. Buổi trưa nhiệt độ là bao nhiêu? Ta cần tính $(-3) + 8$: một phép cộng có số nguyên âm. Bài này cho em quy tắc cộng và trừ mọi số nguyên.',
  objectives: [
    'Cộng hai số nguyên cùng dấu và hai số nguyên khác dấu.',
    'Tìm số đối của một số nguyên; dùng tính chất của phép cộng để tính nhanh.',
    'Trừ hai số nguyên bằng cách cộng số bị trừ với số đối của số trừ.',
  ],
  sections: [
    {
      heading: 'Cộng hai số nguyên cùng dấu',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Số đối',
          text: 'Trên trục số, hai số nguyên nằm ở hai phía của điểm $0$ và cách đều điểm $0$ được gọi là hai số đối nhau. Số đối của $a$ kí hiệu là $-a$. Ví dụ: số đối của $5$ là $-5$, số đối của $-5$ là $5$, tức là $-(-5) = 5$. Số đối của $0$ là $0$.',
        },
        {
          type: 'p',
          text: 'Cộng hai số nguyên dương chính là cộng hai số tự nhiên khác $0$: $(+4) + (+3) = 4 + 3 = 7$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cộng hai số nguyên âm',
          text: 'Muốn cộng hai số nguyên âm, ta cộng hai phần số tự nhiên của chúng rồi đặt dấu "$-$" trước kết quả: $$(-a) + (-b) = -(a + b) \\quad (a, b \\in \\mathbb{N}^*).$$',
        },
        { type: 'tex', tex: '(-12) + (-25) = -(12 + 25) = -37' },
        {
          type: 'p',
          text: 'Trên trục số: từ điểm $0$ đi sang trái $12$ đơn vị đến điểm $-12$, rồi đi tiếp sang trái $25$ đơn vị, ta dừng ở điểm $-37$.',
        },
      ],
    },
    {
      heading: 'Cộng hai số nguyên khác dấu',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hai số đối nhau',
          text: 'Tổng của hai số nguyên đối nhau luôn bằng $0$: $a + (-a) = 0$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cộng hai số nguyên khác dấu',
          text: 'Muốn cộng hai số nguyên khác dấu (không đối nhau), ta tìm hiệu hai phần số tự nhiên của chúng (số lớn trừ số nhỏ) rồi đặt trước hiệu tìm được dấu của số có phần số tự nhiên lớn hơn.',
        },
        { type: 'tex', tex: '(-3) + 8 = +(8 - 3) = 5, \\qquad 4 + (-11) = -(11 - 4) = -7' },
        {
          type: 'p',
          text: 'Có thể hình dung bằng các hạt: mỗi hạt dương ($+1$) gặp một hạt âm ($-1$) thì triệt tiêu thành $0$. Với $(-3) + 8$, ba cặp triệt tiêu, còn lại $5$ hạt dương.',
        },
      ],
    },
    {
      heading: 'Tính chất của phép cộng',
      blocks: [
        {
          type: 'table',
          head: ['Tính chất', 'Công thức'],
          rows: [
            ['Giao hoán', '$a + b = b + a$'],
            ['Kết hợp', '$(a + b) + c = a + (b + c)$'],
            ['Cộng với số $0$', '$a + 0 = 0 + a = a$'],
            ['Cộng với số đối', '$a + (-a) = 0$'],
          ],
        },
        {
          type: 'p',
          text: 'Nhờ tính chất giao hoán và kết hợp, ta có thể nhóm các số hạng một cách thích hợp để tính nhanh, chẳng hạn gom các số đối nhau hoặc gom các số có tổng tròn chục, tròn trăm.',
        },
      ],
    },
    {
      heading: 'Phép trừ hai số nguyên',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc trừ',
          text: 'Muốn trừ số nguyên $a$ cho số nguyên $b$, ta cộng $a$ với số đối của $b$: $$a - b = a + (-b).$$',
        },
        { type: 'tex', tex: '5 - 9 = 5 + (-9) = -4, \\qquad (-6) - (-10) = (-6) + 10 = 4' },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Trong tập hợp số tự nhiên, phép trừ $a - b$ chỉ thực hiện được khi $a \\ge b$. Trong tập hợp số nguyên, phép trừ luôn thực hiện được.',
        },
      ],
    },
  ],
  explore: {
    title: 'Hạt dương, hạt âm và trục số',
    instruction:
      'Chọn phép tính, kéo thanh trượt để chọn $a$ và $b$. Bấm "Triệt tiêu một cặp" để bỏ từng cặp hạt dương, hạt âm; số hạt còn lại là kết quả. Với phép trừ, quan sát các hạt của $b$ lật dấu thành số đối. Trục số bên dưới cho thấy cùng phép tính bằng các bước nhảy.',
  },
  examples: [
    {
      problem: 'Tính $(-12) + (-25)$ và $(-34) + 20$.',
      steps: [
        '$(-12)$ và $(-25)$ cùng âm: cộng hai phần số tự nhiên $12 + 25 = 37$ rồi đặt dấu "$-$": $(-12) + (-25) = -37$.',
        '$(-34)$ và $20$ khác dấu: hiệu hai phần số tự nhiên là $34 - 20 = 14$.',
        'Số có phần số tự nhiên lớn hơn là $-34$ (số âm), nên $(-34) + 20 = -14$.',
      ],
      answer: '$(-12) + (-25) = -37$; $(-34) + 20 = -14$.',
    },
    {
      problem: 'Tính $5 - 9$ và $(-6) - (-10)$.',
      steps: [
        'Trừ là cộng với số đối: $5 - 9 = 5 + (-9)$.',
        'Hai số khác dấu: $9 - 5 = 4$, mang dấu của $-9$: $5 + (-9) = -4$.',
        'Số đối của $-10$ là $10$: $(-6) - (-10) = (-6) + 10 = 4$.',
      ],
      answer: '$5 - 9 = -4$; $(-6) - (-10) = 4$.',
    },
    {
      problem: 'Tính nhanh: $(-37) + 54 + (-63) + 46$.',
      steps: [
        'Đổi chỗ và nhóm các số hạng: $[(-37) + (-63)] + (54 + 46)$.',
        '$(-37) + (-63) = -100$ và $54 + 46 = 100$.',
        '$(-100) + 100 = 0$ vì đó là hai số đối nhau.',
      ],
      answer: '$0$.',
    },
    {
      problem:
        'Ban ngày nhiệt độ ở một trạm quan trắc trên núi là $3\\,^\\circ\\text{C}$, ban đêm là $-6\\,^\\circ\\text{C}$. Nhiệt độ ban ngày cao hơn ban đêm bao nhiêu độ?',
      steps: ['Độ chênh lệch là $3 - (-6)$.', '$3 - (-6) = 3 + 6 = 9$.'],
      answer: 'Cao hơn $9\\,^\\circ\\text{C}$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính $(-23) + (-55)$.',
      answer: -78,
      hints: ['Hai số cùng âm: cộng hai phần số tự nhiên rồi đặt dấu "$-$".'],
      solution: '$(-23) + (-55) = -(23 + 55) = -78$.',
    },
    {
      type: 'number',
      prompt: 'Tính $(-45) + 28$.',
      answer: -17,
      hints: [
        'Hai số khác dấu: lấy $45 - 28$.',
        'Kết quả mang dấu của số có phần số tự nhiên lớn hơn.',
      ],
      solution: '$45 - 28 = 17$; số $-45$ có phần số tự nhiên lớn hơn nên $(-45) + 28 = -17$.',
    },
    {
      type: 'number',
      prompt: 'Tính $60 + (-32)$.',
      answer: 28,
      hints: ['Hai số khác dấu: lấy $60 - 32$ và giữ dấu của $60$.'],
      solution: '$60 + (-32) = 60 - 32 = 28$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số đối của $-15$.',
      answer: 15,
      hints: ['Số đối nằm ở phía bên kia điểm $0$, cách $0$ cùng một khoảng.'],
      solution: 'Số đối của $-15$ là $-(-15) = 15$.',
    },
    {
      type: 'number',
      prompt: 'Tính $7 - 12$.',
      answer: -5,
      hints: ['$7 - 12 = 7 + (-12)$.'],
      solution: '$7 - 12 = 7 + (-12) = -(12 - 7) = -5$.',
    },
    {
      type: 'number',
      prompt: 'Tính $(-8) - (-15)$.',
      answer: 7,
      hints: ['Số đối của $-15$ là $15$.', 'Tính $(-8) + 15$.'],
      solution: '$(-8) - (-15) = (-8) + 15 = 7$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh: $(-125) + 49 + 125 + (-39)$.',
      answer: 10,
      hints: ['Tìm hai số đối nhau trong tổng.', '$(-125) + 125 = 0$.'],
      solution: '$[(-125) + 125] + [49 + (-39)] = 0 + 10 = 10$.',
    },
    {
      type: 'number',
      prompt:
        'Buổi sáng nhiệt độ là $-3\\,^\\circ\\text{C}$, đến trưa tăng thêm $8\\,^\\circ\\text{C}$. Nhiệt độ buổi trưa là bao nhiêu?',
      answer: 5,
      unit: '°C',
      hints: ['Tăng thêm nghĩa là cộng: tính $(-3) + 8$.'],
      solution: '$(-3) + 8 = 8 - 3 = 5$. Nhiệt độ buổi trưa là $5\\,^\\circ\\text{C}$.',
    },
    {
      type: 'number',
      prompt:
        'Một thợ lặn đang ở độ cao $-12$ m so với mực nước biển, rồi lặn sâu thêm $9$ m. Độ cao mới của thợ lặn là bao nhiêu mét?',
      answer: -21,
      unit: 'm',
      hints: ['Lặn sâu thêm $9$ m nghĩa là độ cao giảm $9$ m: tính $(-12) - 9$.'],
      solution: '$(-12) - 9 = (-12) + (-9) = -21$. Độ cao mới là $-21$ m.',
    },
    {
      type: 'number',
      prompt:
        'Nhà bác học Archimedes sinh năm $287$ trước Công nguyên và mất năm $212$ trước Công nguyên. Ông sống bao nhiêu năm?',
      answer: 75,
      unit: 'năm',
      hints: [
        'Viết năm trước Công nguyên bằng số nguyên âm: sinh năm $-287$, mất năm $-212$.',
        'Số năm đã sống bằng năm mất trừ năm sinh.',
      ],
      solution: '$(-212) - (-287) = (-212) + 287 = 75$. Ông sống $75$ năm.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào sau đây đúng?',
      options: [
        'Tổng của hai số nguyên âm là một số nguyên dương.',
        'Tổng của hai số nguyên đối nhau bằng $0$.',
        'Hiệu của hai số nguyên luôn nhỏ hơn số bị trừ.',
        'Phép trừ $a - b$ chỉ thực hiện được khi $a \\ge b$.',
      ],
      answer: 1,
      hints: ['Thử từng khẳng định với các số cụ thể, chẳng hạn $(-2) + (-3)$ hay $5 - (-1)$.'],
      solution:
        '$a + (-a) = 0$ nên khẳng định thứ hai đúng. Ngược lại: $(-2) + (-3) = -5$ là số âm; $5 - (-1) = 6 > 5$; trong $\\mathbb{Z}$ phép trừ luôn thực hiện được, ví dụ $2 - 7 = -5$.',
    },
  ],
  takeaways: [
    '$(-a) + (-b) = -(a + b)$: cộng hai số âm, giữ dấu "$-$".',
    'Hai số khác dấu: lấy phần số tự nhiên lớn trừ nhỏ, đặt dấu của số có phần số tự nhiên lớn hơn.',
    '$a + (-a) = 0$; phép cộng có tính giao hoán và kết hợp.',
    '$a - b = a + (-b)$: trừ là cộng với số đối; trong $\\mathbb{Z}$ phép trừ luôn thực hiện được.',
  ],
};
