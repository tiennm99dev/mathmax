/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Định lí Pythagore về tam giác vuông, định lí đảo để nhận biết tam giác vuông, chứng minh bằng cắt ghép diện tích và ứng dụng tính độ dài.',
  intro:
    'Từ thời cổ đại, người thợ xây đã dùng sợi dây thắt nút thành các đoạn $3$, $4$, $5$ để dựng góc vuông. Bí mật nằm ở định lí Pythagore: trong tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông. Em sẽ thấy vì sao điều đó đúng và dùng nó để tính độ dài.',
  objectives: [
    'Phát biểu định lí Pythagore và định lí Pythagore đảo.',
    'Hiểu một cách chứng minh định lí bằng cắt ghép diện tích.',
    'Tính độ dài một cạnh của tam giác vuông khi biết hai cạnh còn lại.',
    'Dùng định lí đảo để kiểm tra một tam giác có phải tam giác vuông hay không.',
  ],
  sections: [
    {
      heading: 'Định lí Pythagore',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí Pythagore',
          text: 'Trong một tam giác vuông, bình phương của cạnh huyền bằng tổng các bình phương của hai cạnh góc vuông. Nếu $\\triangle ABC$ vuông tại $A$ thì $BC^2 = AB^2 + AC^2$.',
        },
        {
          type: 'p',
          text: 'Nếu gọi hai cạnh góc vuông là $a$, $b$ và cạnh huyền là $c$ thì:',
        },
        { type: 'tex', tex: 'a^2 + b^2 = c^2' },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Định lí chỉ đúng với tam giác vuông, và cạnh huyền là cạnh đối diện góc vuông, luôn là cạnh dài nhất.',
        },
      ],
    },
    {
      heading: 'Chứng minh bằng cắt ghép',
      blocks: [
        {
          type: 'p',
          text: 'Dựng ba hình vuông trên ba cạnh của tam giác vuông. Kẻ đường cao từ đỉnh góc vuông xuống cạnh huyền; nó chia hình vuông cạnh huyền thành hai hình chữ nhật. Hình vuông trên cạnh $a$ có thể trượt và xoay (giữ nguyên diện tích) để khớp với hình chữ nhật thứ nhất, hình vuông trên cạnh $b$ khớp với hình chữ nhật thứ hai.',
        },
        {
          type: 'p',
          text: 'Hai mảnh lấp kín hình vuông cạnh huyền, nên $a^2 + b^2 = c^2$. Phần Khám phá dưới đây diễn lại đúng quá trình này.',
        },
      ],
    },
    {
      heading: 'Định lí Pythagore đảo',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí đảo',
          text: 'Nếu một tam giác có bình phương của một cạnh bằng tổng các bình phương của hai cạnh kia thì tam giác đó là tam giác vuông. Nếu $BC^2 = AB^2 + AC^2$ thì $\\triangle ABC$ vuông tại $A$.',
        },
        {
          type: 'p',
          text: 'Để kiểm tra, em lấy cạnh dài nhất bình phương rồi so với tổng bình phương hai cạnh còn lại.',
        },
        {
          type: 'table',
          caption: 'Một số bộ ba Pythagore',
          head: ['$a$', '$b$', '$c$', '$a^2 + b^2 = c^2$'],
          rows: [
            ['3', '4', '5', '$9 + 16 = 25$'],
            ['5', '12', '13', '$25 + 144 = 169$'],
            ['8', '15', '17', '$64 + 225 = 289$'],
            ['6', '8', '10', '$36 + 64 = 100$'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Ba hình vuông trên tam giác vuông',
    instruction:
      'Kéo đỉnh góc vuông R để đổi kích thước tam giác và xem các bình phương cập nhật. Nhấn "Chứng minh" để hai hình vuông nhỏ trượt khớp vào hình vuông cạnh huyền.',
  },
  examples: [
    {
      problem: 'Cho $\\triangle ABC$ vuông tại $A$ với $AB = 6$ cm, $AC = 8$ cm. Tính $BC$.',
      steps: [
        'Theo định lí Pythagore: $BC^2 = AB^2 + AC^2 = 6^2 + 8^2$.',
        '$BC^2 = 36 + 64 = 100$.',
        '$BC = \\sqrt{100}$.',
      ],
      answer: '$BC = 10$ cm.',
    },
    {
      problem:
        'Tam giác vuông có cạnh huyền $13$ cm và một cạnh góc vuông $5$ cm. Tính cạnh góc vuông còn lại.',
      steps: ['$b^2 = c^2 - a^2 = 13^2 - 5^2$.', '$b^2 = 169 - 25 = 144$.'],
      answer: 'Cạnh còn lại dài $12$ cm.',
    },
    {
      problem: 'Tam giác có ba cạnh $7$ cm, $24$ cm, $25$ cm có phải tam giác vuông không?',
      steps: [
        'Cạnh dài nhất là $25$: $25^2 = 625$.',
        'Tổng bình phương hai cạnh còn lại: $7^2 + 24^2 = 49 + 576 = 625$.',
        'Hai kết quả bằng nhau.',
      ],
      answer: 'Theo định lí đảo, đó là tam giác vuông (góc vuông đối diện cạnh $25$ cm).',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tam giác vuông có hai cạnh góc vuông $9$ cm và $12$ cm. Cạnh huyền dài bao nhiêu?',
      answer: 15,
      unit: 'cm',
      hints: ['$c^2 = 9^2 + 12^2$.', '$81 + 144 = 225$.'],
      solution: '$c^2 = 81 + 144 = 225$, nên $c = 15$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác vuông có cạnh huyền $17$ cm, một cạnh góc vuông $8$ cm. Cạnh còn lại dài bao nhiêu?',
      answer: 15,
      unit: 'cm',
      hints: ['$b^2 = 17^2 - 8^2$.'],
      solution: '$b^2 = 289 - 64 = 225$, nên $b = 15$ cm.',
    },
    {
      type: 'multi',
      prompt: 'Bộ ba độ dài nào là ba cạnh của một tam giác vuông?',
      options: ['$3, 4, 5$', '$4, 5, 6$', '$5, 12, 13$', '$6, 7, 9$', '$9, 40, 41$'],
      answers: [0, 2, 4],
      hints: ['So sánh bình phương cạnh lớn nhất với tổng bình phương hai cạnh kia.'],
      solution:
        '$3^2 + 4^2 = 5^2$, $5^2 + 12^2 = 13^2$ và $9^2 + 40^2 = 81 + 1600 = 1681 = 41^2$. Với $4, 5, 6$: $16 + 25 = 41 \\ne 36$; với $6, 7, 9$: $36 + 49 = 85 \\ne 81$.',
    },
    {
      type: 'number',
      prompt:
        'Một chiếc thang dài $5$ m dựa vào tường, chân thang cách chân tường $3$ m. Đỉnh thang cao bao nhiêu mét so với mặt đất?',
      answer: 4,
      unit: 'm',
      hints: ['Thang, tường và mặt đất tạo thành tam giác vuông; thang là cạnh huyền.'],
      solution: 'Chiều cao $h$ thoả $h^2 = 5^2 - 3^2 = 16$, nên $h = 4$ m.',
    },
    {
      type: 'number',
      prompt:
        'Một hình chữ nhật có hai cạnh $20$ cm và $21$ cm. Đường chéo dài bao nhiêu xăng-ti-mét?',
      answer: 29,
      unit: 'cm',
      hints: ['Đường chéo chia hình chữ nhật thành hai tam giác vuông.', '$20^2 + 21^2 = 841$.'],
      solution: 'Đường chéo $d$ thoả $d^2 = 400 + 441 = 841 = 29^2$, nên $d = 29$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Màn hình ti vi "$40$ inch" nghĩa là đường chéo dài $40$ inch. Nếu chiều rộng là $32$ inch thì chiều cao là bao nhiêu inch?',
      answer: 24,
      unit: 'inch',
      hints: ['Chiều cao $h$: $h^2 = 40^2 - 32^2$.'],
      solution: '$h^2 = 1600 - 1024 = 576$, nên $h = 24$ inch.',
    },
    {
      type: 'choice',
      prompt: 'Cho $\\triangle MNP$ có $MN = 10$, $NP = 6$, $MP = 8$. Tam giác vuông tại đỉnh nào?',
      options: ['$M$', '$N$', '$P$', 'Không phải tam giác vuông'],
      answer: 2,
      hints: ['Cạnh dài nhất là $MN$; góc vuông nằm đối diện cạnh dài nhất.'],
      solution:
        '$NP^2 + MP^2 = 36 + 64 = 100 = MN^2$, nên tam giác vuông tại $P$, đỉnh đối diện $MN$.',
    },
  ],
  takeaways: [
    'Tam giác vuông với hai cạnh góc vuông $a$, $b$ và cạnh huyền $c$: $a^2 + b^2 = c^2$.',
    'Muốn tìm cạnh góc vuông: $b^2 = c^2 - a^2$.',
    'Định lí đảo: nếu $c^2 = a^2 + b^2$ thì tam giác vuông, góc vuông đối diện cạnh $c$.',
    'Bộ ba Pythagore quen thuộc: $3, 4, 5$; $5, 12, 13$; $8, 15, 17$.',
  ],
};
