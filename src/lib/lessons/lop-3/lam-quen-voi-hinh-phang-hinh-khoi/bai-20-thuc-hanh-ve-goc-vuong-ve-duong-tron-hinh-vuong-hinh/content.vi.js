/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành vẽ góc vuông bằng ê ke, vẽ đường tròn bằng compa, vẽ hình vuông và hình chữ nhật trên lưới ô vuông, gấp ê ke giấy và vẽ trang trí.',
  intro:
    'Hôm nay em là họa sĩ nhỏ! Em có ê ke, compa và tờ giấy ô vuông. Em cùng vẽ góc vuông, đường tròn, hình vuông, hình chữ nhật rồi tô màu thật đẹp nhé!',
  objectives: [
    'Vẽ được góc vuông bằng ê ke.',
    'Vẽ được đường tròn bằng compa.',
    'Vẽ được hình vuông, hình chữ nhật trên lưới ô vuông.',
    'Vẽ trang trí và tô màu từ các hình đã học.',
  ],
  sections: [
    {
      heading: 'Vẽ góc vuông bằng ê ke',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Đặt góc vuông của ê ke trùng vào điểm A. A là đỉnh của góc.',
            'Vẽ đoạn thẳng AB dọc theo một cạnh của ê ke.',
            'Vẽ đoạn thẳng AC dọc theo cạnh kia của ê ke.',
          ],
        },
        { type: 'callout', tone: 'note', text: 'Em được góc vuông đỉnh A; cạnh AB, AC.' },
      ],
    },
    {
      heading: 'Vẽ đường tròn bằng compa',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Mở compa theo độ dài bán kính.',
            'Đặt đầu có kim vào điểm I. I là tâm.',
            'Giữ yên đầu kim, quay đầu bút một vòng.',
          ],
        },
      ],
    },
    {
      heading: 'Tự làm ê ke giấy',
      blocks: [
        {
          type: 'p',
          text: 'Gấp tờ giấy làm đôi. Rồi gấp làm đôi tiếp sao cho hai mép gấp trùng nhau.',
        },
        {
          type: 'p',
          text: 'Góc ở chỗ gấp là một góc vuông. Em dùng nó như ê ke để tìm góc vuông.',
        },
      ],
    },
    {
      heading: 'Vẽ hình vuông, hình chữ nhật',
      blocks: [
        {
          type: 'p',
          text: 'Trên giấy ô vuông, em kẻ theo các đường của lưới. Các góc sẽ là góc vuông.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          text: 'Hình vuông: đếm số ô bằng nhau cho cả 4 cạnh. Hình chữ nhật: 2 cạnh dài cùng số ô, 2 cạnh ngắn cùng số ô.',
        },
      ],
    },
    {
      heading: 'Vẽ bông hoa từ ba đường tròn',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ đường tròn thứ nhất, bán kính 4 ô.',
            'Lấy một điểm trên đường tròn đó làm tâm. Vẽ đường tròn thứ hai, cũng bán kính 4 ô.',
            'Hai đường tròn cắt nhau tại hai điểm. Lấy một điểm làm tâm, vẽ đường tròn thứ ba, cũng bán kính 4 ô.',
            'Tô màu các phần em thích.',
          ],
        },
      ],
    },
    {
      heading: 'Em làm bức tranh trang trí',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: em vẽ một bức tranh có góc vuông, đường tròn, hình vuông và hình chữ nhật, rồi tô màu.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chuẩn bị: giấy ô vuông, bút chì, ê ke, compa, thước và bút màu.',
            'Nghĩ xem em sẽ vẽ gì: ngôi nhà, người máy, ô tô hay bông hoa.',
            'Vẽ các hình vuông và hình chữ nhật theo lưới ô vuông.',
            'Dùng compa vẽ các đường tròn: bánh xe, ông mặt trời, bông hoa.',
            'Dùng ê ke kiểm tra lại một góc vuông trong tranh.',
            'Tô màu thật đẹp.',
          ],
        },
        {
          type: 'p',
          text: 'Kể cho cả lớp: bức tranh của em có mấy hình vuông, mấy hình chữ nhật, mấy đường tròn? Góc vuông ở đâu?',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng vẽ ê ke và compa',
    instruction:
      'Chọn thứ em muốn vẽ. Kéo hai nút tròn, hoặc chạm vào nút rồi bấm phím mũi tên, rồi bấm "Vẽ". Chọn màu để tô. Em hãy vẽ đủ cả bốn loại, hoặc bấm "Vẽ bông hoa mẫu" để xem ba đường tròn của bông hoa.',
  },
  examples: [
    {
      problem: 'Vẽ góc vuông đỉnh O; cạnh OM, ON bằng ê ke.',
      steps: [
        'Đặt góc vuông của ê ke vào điểm O.',
        'Kẻ OM dọc theo một cạnh ê ke.',
        'Kẻ ON dọc theo cạnh kia của ê ke.',
      ],
      answer: 'Em được góc vuông đỉnh O; cạnh OM, ON.',
    },
    {
      problem: 'Vẽ hình chữ nhật có chiều dài 6 ô, chiều rộng 3 ô trên lưới ô vuông.',
      steps: [
        'Kẻ một cạnh dài 6 ô theo đường lưới.',
        'Từ hai đầu cạnh đó, kẻ hai cạnh 3 ô cùng về một phía.',
        'Nối hai điểm cuối được cạnh dài thứ hai, cũng 6 ô.',
      ],
      answer: 'Em được hình chữ nhật có 4 góc vuông.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Xếp các bước vẽ góc vuông bằng ê ke theo đúng thứ tự.',
      items: [
        'Vẽ đoạn thẳng AC dọc theo cạnh kia của ê ke',
        'Đặt góc vuông của ê ke trùng vào điểm A',
        'Vẽ đoạn thẳng AB dọc theo một cạnh của ê ke',
      ],
      answer: [1, 2, 0],
      hints: ['Em đặt ê ke trước khi kẻ.'],
      solution:
        'Đặt góc vuông của ê ke vào A, vẽ AB dọc theo một cạnh ê ke, rồi vẽ AC dọc theo cạnh kia.',
    },
    {
      type: 'choice',
      prompt: 'Muốn vẽ đường tròn, em dùng dụng cụ nào?',
      options: ['Compa', 'Ê ke', 'Thước kẻ'],
      answer: 0,
      hints: ['Dụng cụ này có một đầu kim và một đầu bút.'],
      solution: 'Em dùng compa: giữ yên đầu kim ở tâm, quay đầu bút một vòng.',
    },
    {
      type: 'choice',
      prompt: 'Vẽ đường tròn bán kính 3 ô. Em phải mở compa rộng bao nhiêu?',
      options: ['3 ô', '6 ô', '1 ô'],
      answer: 0,
      hints: ['Đầu kim ở tâm, đầu bút ở trên đường tròn. Khoảng cách giữa chúng là gì?'],
      solution: 'Khoảng cách từ đầu kim đến đầu bút là bán kính, nên em mở compa rộng 3 ô.',
    },
    {
      type: 'number',
      prompt: 'Em vẽ đường tròn bán kính 4 ô. Đường kính của nó dài mấy ô?',
      answer: 8,
      hints: ['Đường kính gấp mấy lần bán kính?'],
      solution: '4 × 2 = 8. Đường kính dài 8 ô.',
    },
    {
      type: 'choice',
      prompt: 'Làm ê ke giấy thế nào?',
      options: [
        'Gấp tờ giấy làm đôi, rồi gấp làm đôi tiếp cho hai mép gấp trùng nhau',
        'Gấp chéo một góc tờ giấy một lần',
        'Cắt tờ giấy thành hai phần',
      ],
      answer: 0,
      hints: ['Phải gấp hai lần.'],
      solution:
        'Gấp đôi, rồi gấp đôi tiếp sao cho hai mép gấp trùng nhau. Góc ở chỗ gấp là góc vuông.',
    },
    {
      type: 'choice',
      prompt:
        'Trên lưới ô vuông, em kẻ một cạnh 5 ô, rồi kẻ từ hai đầu của nó hai cạnh cùng về một phía. Muốn được hình vuông, mỗi cạnh đó dài mấy ô?',
      options: ['5 ô', '3 ô', '10 ô'],
      answer: 0,
      hints: ['Các cạnh của hình vuông dài như thế nào?'],
      solution: 'Hình vuông có 4 cạnh dài bằng nhau, nên mỗi cạnh dài 5 ô.',
    },
    {
      type: 'choice',
      prompt: 'Vẽ bông hoa từ ba đường tròn. Đường tròn thứ hai có tâm ở đâu?',
      options: [
        'Trên đường tròn thứ nhất',
        'Ở ngoài đường tròn thứ nhất, cách thật xa',
        'Trùng với tâm của đường tròn thứ nhất',
      ],
      answer: 0,
      hints: ['Hai đường tròn phải cắt nhau và có cùng bán kính.'],
      solution:
        'Tâm đường tròn thứ hai là một điểm nằm trên đường tròn thứ nhất, bán kính vẫn bằng 4 ô.',
    },
  ],
  takeaways: [
    'Ê ke giúp em vẽ góc vuông. Compa giúp em vẽ đường tròn.',
    'Trên lưới ô vuông, em đếm số ô để vẽ hình vuông và hình chữ nhật.',
  ],
};
