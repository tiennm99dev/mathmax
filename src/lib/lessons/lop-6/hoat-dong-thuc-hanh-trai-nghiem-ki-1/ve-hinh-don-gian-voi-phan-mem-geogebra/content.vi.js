/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: làm quen phần mềm GeoGebra, dùng các công cụ Điểm, Đoạn thẳng, Đường tròn, Góc, Đa giác đều để vẽ tam giác đều, hình vuông, lục giác đều, hình thoi và kiểm tra bằng công cụ đo.',
  intro:
    'Ở chương IV em đã vẽ tam giác đều, hình vuông, lục giác đều bằng thước và compa. Phần mềm GeoGebra làm được việc đó nhanh và chính xác hơn: em chỉ cần chọn công cụ và nháy chuột. Hơn nữa, khi kéo một điểm, cả hình thay đổi theo mà vẫn giữ nguyên tính chất, nhờ đó em thấy rõ vì sao hình đó là tam giác đều hay lục giác đều.',
  objectives: [
    'Nhận biết các phần chính của giao diện GeoGebra: thanh công cụ, vùng làm việc, vùng danh sách đối tượng.',
    'Dùng các công cụ Điểm mới, Đoạn thẳng, Đường tròn, Giao điểm, Góc với số đo cho trước, Đa giác đều.',
    'Vẽ tam giác đều, hình vuông, lục giác đều, hình thoi và dùng công cụ đo để kiểm tra.',
  ],
  sections: [
    {
      heading: 'Làm quen với GeoGebra',
      blocks: [
        {
          type: 'p',
          text: 'GeoGebra là phần mềm toán học miễn phí, dùng được trên máy tính, máy tính bảng và điện thoại. Em có thể cài GeoGebra Classic hoặc dùng ngay trên trang geogebra.org. Có thể chọn ngôn ngữ tiếng Việt trong phần cài đặt.',
        },
        {
          type: 'list',
          items: [
            'Thanh công cụ: các nhóm công cụ như Điểm, Đường thẳng, Đa giác, Đường tròn, Góc. Nháy vào biểu tượng một nhóm để mở các công cụ trong nhóm đó.',
            'Vùng làm việc: nơi vẽ hình, có thể hiện lưới ô vuông và trục toạ độ.',
            'Vùng danh sách đối tượng (vùng Đại số): liệt kê các điểm, đoạn thẳng, đường tròn đã vẽ kèm số đo của chúng.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thao tác chung',
          text: 'Chọn một công cụ, đọc dòng hướng dẫn hiện ra cạnh công cụ, rồi nháy chuột vào vùng làm việc theo hướng dẫn. Muốn kéo một điểm, chọn công cụ Di chuyển (hoặc nhấn phím Esc). Muốn ẩn một đối tượng, nháy nút phải chuột vào nó và bỏ chọn Hiển thị đối tượng. Lỡ tay thì nhấn Ctrl + Z để hoàn tác.',
        },
        {
          type: 'table',
          head: ['Nhóm công cụ', 'Công cụ', 'Dùng để'],
          rows: [
            ['Điểm', 'Điểm mới', 'vẽ một điểm'],
            ['Điểm', 'Giao điểm của 2 đối tượng', 'lấy giao điểm của hai đường'],
            ['Đường thẳng', 'Đoạn thẳng', 'vẽ đoạn thẳng nối hai điểm'],
            ['Đa giác', 'Đa giác đều', 'vẽ đa giác đều khi biết một cạnh và số đỉnh'],
            [
              'Đường tròn',
              'Đường tròn khi biết tâm và 1 điểm trên đường tròn',
              'vẽ đường tròn tâm $A$ đi qua $B$',
            ],
            ['Góc', 'Góc với số đo cho trước', 'quay một điểm quanh đỉnh góc một góc đã cho'],
            ['Góc', 'Khoảng cách hoặc độ dài', 'đo độ dài đoạn thẳng, khoảng cách hai điểm'],
          ],
        },
      ],
    },
    {
      heading: 'Vẽ tam giác đều, hình vuông, lục giác đều',
      blocks: [
        {
          type: 'p',
          text: "Tam giác đều $ABB'$ có cạnh $AB$ cho trước: vẽ đoạn thẳng $AB$; chọn công cụ Góc với số đo cho trước, nháy vào $B$ rồi $A$, gõ $60^\\circ$, chọn ngược chiều kim đồng hồ. GeoGebra tạo điểm $B'$ sao cho $AB' = AB$ và $\\widehat{BAB'} = 60^\\circ$. Vẽ tiếp các đoạn $AB'$, $BB'$.",
        },
        {
          type: 'p',
          text: 'Hình vuông và lục giác đều: chọn công cụ Đa giác đều, nháy vào hai điểm $A$, $B$ rồi gõ số đỉnh: $4$ cho hình vuông, $6$ cho lục giác đều (gõ $3$ cũng được tam giác đều).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Kiểm tra bằng công cụ đo',
          text: 'Dùng công cụ Khoảng cách hoặc độ dài để đo các cạnh và công cụ Góc để đo các góc. Tam giác đều có ba cạnh bằng nhau, ba góc bằng $60^\\circ$; hình vuông có bốn cạnh bằng nhau, bốn góc vuông; lục giác đều có sáu cạnh bằng nhau, sáu góc bằng $120^\\circ$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Kéo thử điểm $A$ hoặc $B$. Hình vẽ đúng cách bằng công cụ thì luôn giữ được tính chất (vẫn là tam giác đều, vẫn là hình vuông). Hình vẽ "bằng mắt" bằng cách chấm điểm tuỳ ý sẽ bị méo ngay khi kéo.',
        },
      ],
    },
    {
      heading: 'Vẽ hình thoi bằng hai đường tròn',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ hai điểm $A$, $B$.',
            'Vẽ đường tròn tâm $A$ đi qua $B$ và đường tròn tâm $B$ đi qua $A$.',
            'Dùng công cụ Giao điểm của 2 đối tượng, nháy vào hai đường tròn để được hai giao điểm $C$, $D$.',
            'Vẽ các đoạn thẳng $AC$, $CB$, $BD$, $DA$, rồi ẩn hai đường tròn.',
          ],
        },
        {
          type: 'p',
          text: 'Hai đường tròn có cùng bán kính $AB$. Điểm $C$ nằm trên cả hai đường tròn nên $AC = AB$ và $BC = BA$; điểm $D$ cũng vậy. Do đó tứ giác $ACBD$ có bốn cạnh bằng nhau: $ACBD$ là hình thoi.',
        },
      ],
    },
    {
      heading: 'Thực hành trên máy tính',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi em (hoặc mỗi nhóm hai em) dùng GeoGebra vẽ đúng các hình phẳng đã học và kiểm tra lại bằng công cụ đo.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: máy tính (hoặc máy tính bảng) đã cài GeoGebra Classic hoặc truy cập được geogebra.org; vở ghi.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            "Vẽ tam giác đều $ABB'$ bằng công cụ Góc với số đo cho trước. Đo ba cạnh và ghi lại.",
            'Vẽ hình vuông và lục giác đều có cạnh $AB$ bằng công cụ Đa giác đều. Đo các cạnh, các góc.',
            'Vẽ hình thoi $ACBD$ bằng hai đường tròn. Đo bốn cạnh.',
            'Kéo điểm $A$ hoặc $B$ và quan sát: các số đo thay đổi thế nào, hình còn giữ tính chất không?',
            'Vẽ một hình trang trí: một hình chữ nhật dài $8$ ô, rộng $4$ ô; ở mỗi đầu hình chữ nhật có hai hình tròn bán kính $1$ ô xếp chồng lên nhau, chạm vào các cạnh của hình chữ nhật.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: lưu hoặc chụp màn hình các hình đã vẽ, ghi bảng số đo cạnh và góc, giải thích vì sao mỗi hình đúng là tam giác đều, hình vuông, lục giác đều hay hình thoi.',
        },
      ],
    },
  ],
  explore: {
    title: 'Dựng hình từng bước như trong GeoGebra',
    instruction:
      'Chọn hình cần vẽ rồi bấm "Bước tiếp" để làm theo từng công cụ. Khi dựng xong, kéo điểm $A$ hoặc $B$ (hoặc dùng phím mũi tên) và xem các số đo: các cạnh luôn bằng nhau.',
  },
  examples: [
    {
      problem:
        "Dùng GeoGebra vẽ tam giác $ABB'$ như hướng dẫn: đoạn $AB$, rồi công cụ Góc với số đo cho trước với góc $60^\\circ$ tại $A$. Vì sao $ABB'$ là tam giác đều?",
      steps: [
        "Công cụ Góc với số đo cho trước quay điểm $B$ quanh $A$ một góc $60^\\circ$ để được $B'$, nên $AB' = AB$.",
        "Đo bằng công cụ Khoảng cách hoặc độ dài: $AB = AB' = BB'$.",
      ],
      answer: "Ba cạnh bằng nhau nên $ABB'$ là tam giác đều.",
    },
    {
      problem:
        'Vẽ hai điểm $A$, $B$ với $AB = 3$ đơn vị, đường tròn tâm $A$ qua $B$, đường tròn tâm $B$ qua $A$, hai giao điểm $C$, $D$, rồi nối $AC$, $CB$, $BD$, $DA$. Tứ giác $ACBD$ là hình gì? Tính chu vi của nó.',
      steps: [
        '$C$, $D$ nằm trên đường tròn tâm $A$ bán kính $3$ nên $AC = AD = 3$.',
        '$C$, $D$ nằm trên đường tròn tâm $B$ bán kính $3$ nên $BC = BD = 3$.',
        'Bốn cạnh bằng nhau nên $ACBD$ là hình thoi, chu vi bằng $4 \\cdot 3 = 12$.',
      ],
      answer: '$ACBD$ là hình thoi có chu vi $12$ đơn vị.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: "Sắp xếp các bước vẽ tam giác đều $ABB'$ trong GeoGebra theo đúng thứ tự.",
      items: [
        'Vẽ đoạn thẳng $AB$ bằng công cụ Đoạn thẳng.',
        "Chọn Góc với số đo cho trước, nháy vào $B$ rồi $A$, gõ $60^\\circ$: được điểm $B'$.",
        'Vẽ hai điểm $A$, $B$ bằng công cụ Điểm mới.',
        "Vẽ các đoạn thẳng $AB'$ và $BB'$.",
        'Đo ba cạnh bằng công cụ Khoảng cách hoặc độ dài để kiểm tra.',
      ],
      answer: [2, 0, 1, 3, 4],
      hints: [
        'Phải có điểm trước rồi mới nối được đoạn thẳng.',
        "Điểm $B'$ được tạo bằng công cụ Góc, sau khi đã có $A$ và $B$.",
      ],
      solution:
        "Vẽ hai điểm $A$, $B$ → vẽ đoạn $AB$ → dùng Góc với số đo cho trước để có $B'$ → vẽ $AB'$, $BB'$ → đo kiểm tra.",
    },
    {
      type: 'number',
      prompt:
        'Dùng công cụ Đa giác đều để vẽ một lục giác đều có cạnh $AB$. Sau khi nháy vào $A$ và $B$, em cần gõ số đỉnh là bao nhiêu?',
      answer: 6,
      hints: ['Lục giác có mấy đỉnh?'],
      solution: 'Lục giác có $6$ đỉnh, nên gõ $6$.',
    },
    {
      type: 'number',
      prompt:
        'Muốn dùng công cụ Góc với số đo cho trước để vẽ hình vuông $ABCD$ từ cạnh $AB$ (quay $B$ quanh $A$ để được đỉnh $D$), em gõ góc bao nhiêu độ?',
      answer: 90,
      unit: '°',
      hints: ['Mỗi góc của hình vuông là góc gì?'],
      solution:
        'Các góc của hình vuông đều là góc vuông, nên gõ $90^\\circ$. Khi đó $AD = AB$ và $\\widehat{BAD} = 90^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        'Một bạn vẽ hai điểm $A$, $B$; vẽ đường tròn tâm $A$ qua $B$, đường tròn tâm $B$ qua $A$; lấy hai giao điểm $C$, $D$; vẽ các đoạn $AC$, $CB$, $BD$, $DA$ rồi ẩn hai đường tròn. Hình còn lại trên vùng làm việc là hình gì?',
      options: ['Hình vuông', 'Hình thoi', 'Hình chữ nhật', 'Lục giác đều'],
      answer: 1,
      hints: [
        'So sánh $AC$, $CB$, $BD$, $DA$ với bán kính của hai đường tròn.',
        'Góc tại $A$ có phải góc vuông không? Đo thử bằng công cụ Góc.',
      ],
      solution:
        'Bốn cạnh $AC$, $CB$, $BD$, $DA$ đều bằng bán kính $AB$ nên $ACBD$ là hình thoi. Góc $\\widehat{CAD} = 120^\\circ$, không phải góc vuông, nên nó không phải hình vuông.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi việc cần làm với công cụ GeoGebra phù hợp.',
      left: [
        'Vẽ lục giác đều khi biết một cạnh',
        'Lấy giao điểm của hai đường tròn',
        'Kiểm tra độ dài một cạnh',
        'Vẽ đường tròn tâm $A$ đi qua $B$',
      ],
      right: [
        'Khoảng cách hoặc độ dài',
        'Đa giác đều',
        'Đường tròn khi biết tâm và 1 điểm trên đường tròn',
        'Giao điểm của 2 đối tượng',
        'Góc với số đo cho trước',
      ],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 0],
        [3, 2],
      ],
      hints: ['Đọc kĩ tên từng công cụ: tên đã nói công cụ làm gì.'],
      solution:
        'Lục giác đều: Đa giác đều. Giao điểm: Giao điểm của 2 đối tượng. Đo cạnh: Khoảng cách hoặc độ dài. Đường tròn tâm $A$ qua $B$: Đường tròn khi biết tâm và 1 điểm trên đường tròn.',
    },
    {
      type: 'number',
      prompt:
        'Trong GeoGebra, bạn Lan vẽ lục giác đều bằng công cụ Đa giác đều với $AB = 2{,}5$ đơn vị. Chu vi lục giác đều đó bằng bao nhiêu đơn vị?',
      answer: 15,
      hints: ['Lục giác đều có sáu cạnh bằng nhau, mỗi cạnh bằng $AB$.'],
      solution: 'Chu vi bằng $6 \\cdot 2{,}5 = 15$ (đơn vị).',
    },
  ],
  takeaways: [
    'GeoGebra có thanh công cụ, vùng làm việc và vùng danh sách đối tượng; chọn công cụ rồi nháy chuột theo hướng dẫn.',
    'Tam giác đều: quay $B$ quanh $A$ một góc $60^\\circ$. Hình vuông, lục giác đều: công cụ Đa giác đều với $4$ hoặc $6$ đỉnh.',
    'Hai đường tròn bán kính $AB$, tâm $A$ và tâm $B$, cắt nhau tại $C$, $D$ cho hình thoi $ACBD$.',
    'Hình dựng đúng bằng công cụ vẫn giữ tính chất khi kéo các điểm; dùng công cụ đo để kiểm tra.',
  ],
};
