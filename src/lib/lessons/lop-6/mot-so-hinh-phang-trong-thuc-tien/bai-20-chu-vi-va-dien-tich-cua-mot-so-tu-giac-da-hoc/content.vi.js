/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Công thức chu vi và diện tích hình vuông, hình chữ nhật, hình thang, hình bình hành, hình thoi; vì sao các công thức đúng và cách dùng chúng trong bài toán thực tế.',
  intro:
    'Muốn biết cần bao nhiêu mét lưới để rào một mảnh vườn, em tính chu vi. Muốn biết cần bao nhiêu viên gạch để lát nền nhà hay bao nhiêu ki-lô-gam thóc thu được trên một thửa ruộng, em tính diện tích. Bài này ôn lại công thức của hình vuông, hình chữ nhật, hình thang và tìm công thức mới cho hình bình hành, hình thoi bằng cách cắt ghép.',
  objectives: [
    'Nhớ và dùng công thức chu vi của hình vuông, hình chữ nhật, hình thang, hình bình hành, hình thoi.',
    'Hiểu vì sao diện tích hình bình hành là $a \\cdot h$ và diện tích hình thoi là $\\frac{1}{2} m \\cdot n$.',
    'Giải bài toán thực tế về chu vi và diện tích.',
  ],
  sections: [
    {
      heading: 'Hình vuông, hình chữ nhật, hình thang',
      blocks: [
        {
          type: 'p',
          text: 'Em đã biết các công thức sau từ tiểu học. Chu vi là tổng độ dài các cạnh; diện tích đo phần mặt phẳng bên trong hình.',
        },
        {
          type: 'table',
          head: ['Hình', 'Chu vi', 'Diện tích'],
          rows: [
            ['Hình vuông cạnh $a$', '$C = 4a$', '$S = a \\cdot a = a^2$'],
            ['Hình chữ nhật chiều dài $a$, chiều rộng $b$', '$C = 2(a + b)$', '$S = a \\cdot b$'],
            [
              'Hình thang đáy $a$, $b$, cạnh bên $c$, $d$, chiều cao $h$',
              '$C = a + b + c + d$',
              '$S = \\dfrac{(a + b) \\cdot h}{2}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Trước khi tính, đổi mọi độ dài về cùng một đơn vị. Chu vi có đơn vị độ dài (cm, m), diện tích có đơn vị diện tích ($\\text{cm}^2$, $\\text{m}^2$).',
        },
      ],
    },
    {
      heading: 'Hình bình hành và hình thoi',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hình bình hành',
          text: 'Hình bình hành có hai cạnh kề là $a$ và $b$, chiều cao $h$ ứng với cạnh đáy $a$: chu vi $C = 2(a + b)$, diện tích $S = a \\cdot h$.',
        },
        {
          type: 'p',
          text: 'Vì sao? Kẻ đường cao từ một đỉnh xuống cạnh đáy, cắt rời tam giác vuông ở một bên rồi chuyển nó sang bên kia. Ta được một hình chữ nhật có chiều dài $a$ và chiều rộng $h$. Cắt ghép không làm thay đổi diện tích, nên diện tích hình bình hành bằng $a \\cdot h$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Hình thoi',
          text: 'Hình thoi có cạnh $a$ và hai đường chéo $m$, $n$: chu vi $C = 4a$, diện tích $S = \\frac{1}{2} m \\cdot n$.',
        },
        {
          type: 'p',
          text: 'Vì sao? Cắt hình thoi theo đường chéo $m$ được hai tam giác, cắt tam giác dưới theo đường chéo $n$ được hai tam giác nhỏ. Chuyển hai tam giác nhỏ lên lấp hai góc trên, ta được hình chữ nhật có chiều dài $m$ và chiều rộng $\\frac{n}{2}$. Vậy $S = m \\cdot \\frac{n}{2} = \\frac{1}{2} m \\cdot n$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Hai hình thang bằng nhau, một hình quay ngược lại, ghép thành một hình bình hành có đáy $a + b$ và chiều cao $h$. Đó là lí do diện tích hình thang bằng $\\dfrac{(a + b) \\cdot h}{2}$.',
        },
      ],
    },
    {
      heading: 'Bài toán thực tế',
      blocks: [
        {
          type: 'list',
          items: [
            'Rào xung quanh, viền mép, đi một vòng: tính chu vi (nhớ trừ phần để làm cổng nếu có).',
            'Lát nền, sơn tường, trồng cây, thu hoạch trên cả mảnh đất: tính diện tích.',
            'Số viên gạch cần lát $=$ diện tích nền $:$ diện tích một viên gạch (cùng đơn vị).',
            'Hình phức tạp: chia thành các hình đã học, tính diện tích từng phần rồi cộng lại (hoặc lấy hình lớn trừ phần bị khoét).',
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Cắt ghép để tìm công thức diện tích',
    instruction:
      'Chọn một hình, kéo thanh trượt để đổi kích thước, rồi bấm "Cắt ghép". Quan sát các mảnh di chuyển thành hình chữ nhật (hoặc hình bình hành) và so sánh diện tích với công thức bên dưới.',
  },
  examples: [
    {
      problem:
        'Một mảnh đất hình bình hành có cạnh đáy $20$ m, chiều cao tương ứng $12$ m và cạnh bên $13$ m. Tính chu vi và diện tích mảnh đất.',
      steps: [
        'Chu vi: $C = 2(a + b) = 2 \\cdot (20 + 13) = 2 \\cdot 33 = 66$ (m).',
        'Diện tích: $S = a \\cdot h = 20 \\cdot 12 = 240$ ($\\text{m}^2$).',
      ],
      answer: 'Chu vi $66$ m, diện tích $240\\ \\text{m}^2$.',
    },
    {
      problem:
        'Một hình thoi có cạnh $5$ cm, hai đường chéo dài $6$ cm và $8$ cm. Tính chu vi và diện tích hình thoi.',
      steps: [
        'Chu vi: $C = 4a = 4 \\cdot 5 = 20$ (cm).',
        'Diện tích: $S = \\frac{1}{2} m \\cdot n = \\frac{1}{2} \\cdot 6 \\cdot 8 = 24$ ($\\text{cm}^2$).',
      ],
      answer: 'Chu vi $20$ cm, diện tích $24\\ \\text{cm}^2$.',
    },
    {
      problem:
        'Nền một căn phòng hình chữ nhật dài $8$ m, rộng $6$ m. Người ta lát nền bằng gạch hình vuông cạnh $40$ cm. Cần bao nhiêu viên gạch (coi như mạch vữa không đáng kể)?',
      steps: [
        'Đổi về cùng đơn vị: $8$ m $= 800$ cm, $6$ m $= 600$ cm.',
        'Diện tích nền: $800 \\cdot 600 = 480\\,000$ ($\\text{cm}^2$).',
        'Diện tích một viên gạch: $40 \\cdot 40 = 1\\,600$ ($\\text{cm}^2$).',
        'Số viên gạch: $480\\,000 : 1\\,600 = 300$ (viên).',
      ],
      answer: 'Cần $300$ viên gạch.',
    },
    {
      problem:
        'Một thửa ruộng hình thang có hai đáy $25$ m và $15$ m, chiều cao $10$ m. Trung bình mỗi mét vuông thu được $1$ kg thóc. Hỏi cả thửa ruộng thu được bao nhiêu ki-lô-gam thóc?',
      steps: [
        'Diện tích thửa ruộng: $S = \\dfrac{(25 + 15) \\cdot 10}{2} = \\dfrac{400}{2} = 200$ ($\\text{m}^2$).',
        'Số thóc thu được: $200 \\cdot 1 = 200$ (kg).',
      ],
      answer: '$200$ kg thóc.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính chu vi hình chữ nhật có chiều dài $12$ cm và chiều rộng $7$ cm.',
      answer: 38,
      unit: 'cm',
      hints: ['$C = 2(a + b)$.'],
      solution: '$C = 2 \\cdot (12 + 7) = 2 \\cdot 19 = 38$ (cm).',
    },
    {
      type: 'number',
      prompt: 'Một hình vuông có chu vi $24$ cm. Tính diện tích hình vuông đó.',
      answer: 36,
      unit: 'cm²',
      hints: ['Tìm cạnh trước: cạnh $=$ chu vi $: 4$.', 'Rồi tính $S = a \\cdot a$.'],
      solution:
        'Cạnh hình vuông là $24 : 4 = 6$ (cm). Diện tích là $6 \\cdot 6 = 36$ ($\\text{cm}^2$).',
    },
    {
      type: 'number',
      prompt: 'Tính diện tích hình bình hành có cạnh đáy $9$ cm và chiều cao tương ứng $5$ cm.',
      answer: 45,
      unit: 'cm²',
      hints: ['$S = a \\cdot h$.'],
      solution: '$S = 9 \\cdot 5 = 45$ ($\\text{cm}^2$).',
    },
    {
      type: 'choice',
      prompt: 'Hình thoi có hai đường chéo $m$ và $n$. Diện tích hình thoi là:',
      options: ['$S = m \\cdot n$', '$S = \\frac{1}{2} m \\cdot n$', '$S = 2(m + n)$', '$S = 4m$'],
      answer: 1,
      hints: ['Trong widget, hình thoi ghép lại thành hình chữ nhật $m$ nhân mấy?'],
      solution:
        'Hình thoi cắt ghép thành hình chữ nhật $m \\times \\frac{n}{2}$, nên $S = \\frac{1}{2} m \\cdot n$. Còn $m \\cdot n$ là diện tích hình chữ nhật bao quanh, gấp đôi hình thoi.',
    },
    {
      type: 'number',
      prompt: 'Tính diện tích hình thoi có hai đường chéo dài $10$ cm và $6$ cm.',
      answer: 30,
      unit: 'cm²',
      hints: ['$S = \\frac{1}{2} m \\cdot n$.'],
      solution: '$S = \\frac{1}{2} \\cdot 10 \\cdot 6 = 30$ ($\\text{cm}^2$).',
    },
    {
      type: 'number',
      prompt: 'Tính diện tích hình thang có hai đáy $12$ cm, $8$ cm và chiều cao $5$ cm.',
      answer: 50,
      unit: 'cm²',
      hints: ['$S = \\dfrac{(a + b) \\cdot h}{2}$.'],
      solution: '$S = \\dfrac{(12 + 8) \\cdot 5}{2} = \\dfrac{100}{2} = 50$ ($\\text{cm}^2$).',
    },
    {
      type: 'number',
      prompt:
        'Một hình bình hành có diện tích $48\\ \\text{cm}^2$ và cạnh đáy $8$ cm. Tính chiều cao tương ứng với cạnh đáy đó.',
      answer: 6,
      unit: 'cm',
      hints: ['Từ $S = a \\cdot h$ suy ra $h = S : a$.'],
      solution: '$h = 48 : 8 = 6$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Bác Khôi rào xung quanh một mảnh vườn hình chữ nhật dài $15$ m, rộng $12$ m, chừa một lối vào rộng $2$ m. Hàng rào dài bao nhiêu mét?',
      answer: 52,
      unit: 'm',
      hints: ['Tính chu vi mảnh vườn.', 'Lối vào không rào nên trừ đi $2$ m.'],
      solution: 'Chu vi mảnh vườn: $2 \\cdot (15 + 12) = 54$ (m). Hàng rào dài $54 - 2 = 52$ (m).',
    },
    {
      type: 'number',
      prompt:
        'Nền nhà hình chữ nhật dài $6$ m, rộng $4$ m được lát bằng gạch vuông cạnh $50$ cm. Cần bao nhiêu viên gạch?',
      answer: 96,
      unit: 'viên',
      hints: [
        'Đổi về cùng đơn vị: $50$ cm $= 0{,}5$ m, hoặc $6$ m $= 600$ cm.',
        'Số viên $=$ diện tích nền $:$ diện tích một viên.',
      ],
      solution:
        'Diện tích nền: $600 \\cdot 400 = 240\\,000$ ($\\text{cm}^2$). Một viên: $50 \\cdot 50 = 2\\,500$ ($\\text{cm}^2$). Số viên: $240\\,000 : 2\\,500 = 96$.',
    },
    {
      type: 'number',
      prompt: 'Tính chu vi hình bình hành có hai cạnh kề dài $6{,}5$ cm và $4$ cm.',
      answer: 21,
      unit: 'cm',
      hints: ['$C = 2(a + b)$.'],
      solution: '$C = 2 \\cdot (6{,}5 + 4) = 2 \\cdot 10{,}5 = 21$ (cm).',
    },
  ],
  takeaways: [
    'Hình vuông: $C = 4a$, $S = a^2$. Hình chữ nhật: $C = 2(a + b)$, $S = a \\cdot b$.',
    'Hình thang: $C$ là tổng bốn cạnh, $S = \\dfrac{(a + b) \\cdot h}{2}$.',
    'Hình bình hành: $C = 2(a + b)$, $S = a \\cdot h$ (cắt ghép thành hình chữ nhật $a \\times h$).',
    'Hình thoi: $C = 4a$, $S = \\frac{1}{2} m \\cdot n$ với $m$, $n$ là hai đường chéo.',
    'Trong bài toán thực tế, đổi về cùng đơn vị trước khi tính.',
  ],
};
