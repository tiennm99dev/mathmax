/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: dùng phần mềm GeoGebra vẽ đường thẳng song song, tia phân giác của một góc, đường trung trực của đoạn thẳng, vẽ tam giác khi biết ba cạnh hoặc hai cạnh và góc xen giữa, rồi đo để kiểm tra.',
  intro:
    'Ở lớp 6 em đã dùng GeoGebra vẽ tam giác đều, hình vuông, lục giác đều. Trong chương III và chương IV lớp 7 em học thêm hai đường thẳng song song, tia phân giác, đường trung trực và các trường hợp bằng nhau của tam giác. Bài này dùng GeoGebra để vẽ lại những hình đó thật chính xác, đo các góc, các đoạn thẳng và tự kiểm chứng những tính chất đã học.',
  objectives: [
    'Vẽ đường thẳng đi qua một điểm và song song với một đường thẳng cho trước; nhận ra tiên đề Euclid.',
    'Vẽ tia phân giác của một góc và đường trung trực của một đoạn thẳng bằng công cụ có sẵn.',
    'Vẽ tam giác khi biết ba cạnh, hai cạnh và góc xen giữa, một cạnh và hai góc kề.',
    'Dùng các công cụ đo độ dài, đo góc để kiểm tra hình vẽ và lưu hình thành tệp ảnh.',
  ],
  sections: [
    {
      heading: 'Các công cụ dùng trong bài',
      blocks: [
        {
          type: 'p',
          text: 'Mở GeoGebra Classic (hoặc trang geogebra.org), chọn ngôn ngữ tiếng Việt. Mỗi biểu tượng trên thanh công cụ là một nhóm; nháy vào nhóm để mở các công cụ bên trong, rồi làm theo dòng hướng dẫn hiện ra.',
        },
        {
          type: 'table',
          head: ['Công cụ', 'Thao tác', 'Kết quả'],
          rows: [
            ['Đường thẳng', 'nháy vào hai điểm', 'đường thẳng đi qua hai điểm đó'],
            ['Tia đi qua hai điểm', 'nháy vào gốc $A$ rồi điểm $B$', 'tia $AB$'],
            [
              'Đường song song',
              'nháy vào một điểm rồi một đường thẳng',
              'đường thẳng qua điểm đó, song song với đường đã chọn',
            ],
            [
              'Đường vuông góc',
              'nháy vào một điểm rồi một đường thẳng',
              'đường thẳng qua điểm đó, vuông góc với đường đã chọn',
            ],
            ['Đường phân giác', 'nháy lần lượt vào $B$, $A$, $C$', 'đường phân giác của góc $BAC$'],
            ['Đường trung trực', 'nháy vào đoạn thẳng $AB$', 'đường trung trực của $AB$'],
            ['Trung điểm hoặc tâm', 'nháy vào đoạn thẳng', 'trung điểm của đoạn thẳng'],
            ['Đường tròn khi biết tâm và bán kính', 'nháy vào tâm, gõ bán kính', 'đường tròn'],
            ['Giao điểm của 2 đối tượng', 'nháy vào hai đường', 'các giao điểm'],
            [
              'Góc với số đo cho trước',
              'nháy vào $B$ rồi đỉnh $A$, gõ số đo',
              "điểm $B'$ với $\\widehat{BAB'}$ bằng số đo đã gõ",
            ],
            [
              'Góc; Khoảng cách hoặc độ dài',
              'nháy vào ba điểm; vào hai điểm hoặc một đoạn',
              'số đo góc; độ dài',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo',
          text: 'Ẩn một đối tượng phụ (đường tròn, tia): nháy nút phải chuột vào nó, bỏ chọn Hiển thị đối tượng. Nhấn Ctrl + Z để hoàn tác. Dùng công cụ Di chuyển để kéo các điểm tự do: hình dựng bằng công cụ luôn giữ đúng tính chất khi kéo.',
        },
      ],
    },
    {
      heading: 'Vẽ hai đường thẳng song song',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Dùng công cụ Đường thẳng vẽ đường thẳng $a$ đi qua hai điểm $A$, $B$.',
            'Dùng công cụ Điểm mới vẽ điểm $M$ nằm ngoài đường thẳng $a$.',
            'Chọn công cụ Đường song song, nháy vào điểm $M$ rồi vào đường thẳng $a$: GeoGebra vẽ đường thẳng $g$ đi qua $M$ và song song với $a$.',
          ],
        },
        {
          type: 'p',
          text: 'Làm lại bước 3 nhiều lần, hoặc kéo điểm $M$: lần nào cũng chỉ hiện ra đúng một đường thẳng $g$. Vẽ thêm đoạn $AM$ và đo hai góc so le trong tạo bởi $AM$ với $a$ và $g$: hai góc luôn bằng nhau.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Tiên đề Euclid',
          text: 'Qua một điểm nằm ngoài một đường thẳng, chỉ có một đường thẳng song song với đường thẳng đó.',
        },
      ],
    },
    {
      heading: 'Vẽ tia phân giác của một góc',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Dùng công cụ Tia đi qua hai điểm: nháy vào $A$ rồi $B$ để có tia $AB$; nháy vào $A$ rồi $C$ để có tia $AC$. Ta được góc $BAC$.',
            'Chọn công cụ Đường phân giác, nháy lần lượt vào $B$, $A$, $C$. GeoGebra vẽ một đường thẳng đi qua $A$.',
            'Phần của đường thẳng đó nằm trong góc $BAC$ là tia phân giác $At$ của góc $BAC$.',
          ],
        },
        {
          type: 'p',
          text: 'Dùng công cụ Góc đo $\\widehat{BAC}$, $\\widehat{BAt}$ và $\\widehat{tAC}$: ta thấy $\\widehat{BAt} = \\widehat{tAC} = \\dfrac{1}{2}\\widehat{BAC}$.',
        },
      ],
    },
    {
      heading: 'Vẽ đường trung trực của một đoạn thẳng',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Dùng công cụ Đoạn thẳng vẽ đoạn thẳng $AB$.',
            'Chọn công cụ Đường trung trực, nháy chuột vào đoạn thẳng $AB$: được đường thẳng $g$ là đường trung trực của $AB$.',
          ],
        },
        {
          type: 'p',
          text: 'Bạn Lan vẽ theo cách khác: dùng công cụ Trung điểm hoặc tâm lấy trung điểm $C$ của $AB$, rồi dùng công cụ Đường vuông góc, nháy vào $C$ và đoạn $AB$, được đường thẳng $g$. Đường thẳng $g$ của Lan cũng là đường trung trực của $AB$, vì nó vuông góc với $AB$ tại trung điểm của $AB$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Lấy điểm $M$ bất kì trên $g$, đo $MA$ và $MB$: luôn có $MA = MB$. Đó là tính chất của đường trung trực: mọi điểm nằm trên đường trung trực của một đoạn thẳng thì cách đều hai đầu mút của đoạn thẳng đó.',
        },
      ],
    },
    {
      heading: 'Vẽ tam giác',
      blocks: [
        {
          type: 'p',
          text: 'Biết ba cạnh. Vẽ tam giác $ABC$ có $AB = 4$ cm, $BC = 5$ cm, $CA = 6$ cm:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ đường tròn tâm $A$ bán kính $4$, lấy điểm $B$ trên đường tròn đó, vẽ đoạn thẳng $AB$.',
            'Vẽ đường tròn tâm $B$ bán kính $5$ và đường tròn tâm $A$ bán kính $6$.',
            'Dùng công cụ Giao điểm của 2 đối tượng lấy một giao điểm $C$ của hai đường tròn vừa vẽ.',
            'Vẽ các đoạn thẳng $BC$, $CA$ rồi ẩn các đường tròn.',
          ],
        },
        {
          type: 'p',
          text: "Biết hai cạnh và góc xen giữa. Vẽ tam giác $ABC$ có $AB = 6$ cm, $AC = 5$ cm, $\\widehat{BAC} = 60^\\circ$: vẽ đoạn $AB = 6$; dùng Góc với số đo cho trước (nháy vào $B$ rồi $A$, gõ $60^\\circ$) để có điểm $B'$, vẽ tia $AB'$; vẽ đường tròn tâm $A$ bán kính $5$, giao điểm của nó với tia $AB'$ là $C$; nối $BC$ rồi ẩn các đối tượng phụ.",
        },
        {
          type: 'p',
          text: 'Biết một cạnh và hai góc kề. Vẽ tam giác $ABC$ có $AB = 6$ cm, $\\widehat{A} = 50^\\circ$, $\\widehat{B} = 60^\\circ$: vẽ đoạn $AB$; tại $A$ dựng góc $50^\\circ$ (nháy vào $B$ rồi $A$, ngược chiều kim đồng hồ), tại $B$ dựng góc $60^\\circ$ (nháy vào $A$ rồi $B$, cùng chiều kim đồng hồ) để hai tia nằm cùng phía với $AB$; giao điểm của hai tia là $C$.',
        },
        {
          type: 'table',
          head: ['Tam giác', 'Số đo GeoGebra cho (làm tròn)', 'Nhận xét'],
          rows: [
            [
              '$AB = 6$, $AC = 5$, $\\widehat{A} = 60^\\circ$',
              '$\\widehat{B} \\approx 51{,}05^\\circ$, $\\widehat{C} \\approx 68{,}95^\\circ$',
              'ba góc nhọn: tam giác nhọn',
            ],
            [
              '$\\widehat{A} = 90^\\circ$, $AB = 4$, $AC = 3$',
              '$BC = 5$',
              'tam giác vuông tại $A$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Có những bộ số không vẽ được tam giác. Chẳng hạn với $AB = 2$, $BC = 3$, $CA = 6$, đường tròn tâm $A$ bán kính $6$ và đường tròn tâm $B$ bán kính $3$ không cắt nhau, nên không có điểm $C$. Thử ngay trong khung tương tác.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Liên hệ với tam giác bằng nhau',
          text: 'Hai bạn vẽ cùng một bộ số liệu (ba cạnh; hai cạnh và góc xen giữa; một cạnh và hai góc kề) sẽ được hai tam giác bằng nhau, đúng như các trường hợp cạnh – cạnh – cạnh, cạnh – góc – cạnh, góc – cạnh – góc đã học.',
        },
      ],
    },
    {
      heading: 'Thực hành trên máy tính',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi em hoặc mỗi nhóm hai em dùng GeoGebra dựng đúng các hình dưới đây, đo để kiểm tra và lưu kết quả thành tệp ảnh.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: máy tính hoặc máy tính bảng có GeoGebra Classic (hoặc truy cập geogebra.org), vở ghi.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ đường thẳng $a$, điểm $M$ ngoài $a$ và đường thẳng $g$ qua $M$ song song với $a$. Đo hai góc so le trong.',
            'Vẽ một góc $xOy$ tuỳ ý và tia phân giác của nó; đo ba góc để kiểm tra.',
            'Vẽ đoạn thẳng $AB$ và đường trung trực của nó theo hai cách (công cụ Đường trung trực; trung điểm và đường vuông góc). Lấy $M$ trên đường trung trực, đo $MA$, $MB$.',
            'Vẽ tam giác $ABC$ có $AB = 6$ cm, $\\widehat{A} = 60^\\circ$, $\\widehat{C} = 70^\\circ$. Mô tả các bước em đã làm.',
            'Vẽ tam giác $ABC$ vuông tại $A$ có $AB = 4$ cm, $AC = 3$ cm (dùng công cụ Đường vuông góc tại $A$ và đường tròn tâm $A$ bán kính $3$), rồi đo cạnh $BC$.',
            'Lưu từng hình thành tệp ảnh: vào Hồ sơ → Xuất bản → Hình ảnh dạng (png), chọn thư mục, đặt tên tệp và lưu.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: nộp các tệp ảnh, bảng số đo các cạnh và các góc của từng hình, và giải thích vì sao mỗi hình vẽ đúng yêu cầu (ví dụ: vì sao $g \\parallel a$, vì sao $MA = MB$).',
        },
      ],
    },
  ],
  explore: {
    title: 'Dựng hình từng bước như trong GeoGebra',
    instruction:
      'Chọn việc cần dựng, bấm "Bước tiếp" để làm theo từng công cụ. Khi dựng xong, kéo các điểm màu xanh (hoặc chọn điểm và dùng phím mũi tên) để thấy tính chất luôn đúng; với tam giác, kéo thanh trượt để đổi độ dài cạnh và số đo góc.',
  },
  examples: [
    {
      problem:
        'Vẽ tam giác $ABC$ có $AB = 6$ cm, $\\widehat{A} = 60^\\circ$, $\\widehat{C} = 70^\\circ$ bằng GeoGebra. Em dựng góc bao nhiêu độ tại $B$?',
      steps: [
        'GeoGebra dựng được góc tại hai đầu của đoạn $AB$ đã vẽ, nên cần biết $\\widehat{B}$.',
        'Tổng ba góc của một tam giác bằng $180^\\circ$: $\\widehat{B} = 180^\\circ - 60^\\circ - 70^\\circ = 50^\\circ$.',
        'Vẽ đoạn $AB = 6$; dựng góc $60^\\circ$ tại $A$ và góc $50^\\circ$ tại $B$ về cùng một phía của $AB$; giao điểm hai tia là $C$.',
        'Đo lại bằng công cụ Góc: $\\widehat{C} = 70^\\circ$.',
      ],
      answer: 'Dựng góc $50^\\circ$ tại $B$.',
    },
    {
      problem:
        'Bạn Lan vẽ đoạn thẳng $AB$, lấy trung điểm $C$ của $AB$ rồi dùng công cụ Đường vuông góc, nháy vào $C$ và $AB$ để được đường thẳng $g$. Lấy $M$ trên $g$, GeoGebra đo được $MA = 3{,}6$. Hỏi $g$ có phải là đường trung trực của $AB$ không, và $MB$ bằng bao nhiêu?',
      steps: [
        '$g$ đi qua trung điểm $C$ của $AB$ và vuông góc với $AB$.',
        'Theo định nghĩa, đường thẳng vuông góc với một đoạn thẳng tại trung điểm của nó là đường trung trực của đoạn thẳng đó.',
        '$M$ nằm trên đường trung trực của $AB$ nên $MA = MB$, do đó $MB = 3{,}6$.',
      ],
      answer: '$g$ là đường trung trực của $AB$ và $MB = 3{,}6$.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt:
        'Sắp xếp các bước vẽ tam giác $ABC$ có $AB = 4$ cm, $BC = 5$ cm, $CA = 6$ cm trong GeoGebra.',
      items: [
        'Vẽ đường tròn tâm $B$ bán kính $5$ và đường tròn tâm $A$ bán kính $6$.',
        'Vẽ các đoạn thẳng $BC$, $CA$ rồi ẩn các đường tròn.',
        'Vẽ đoạn thẳng $AB$ dài $4$ cm.',
        'Lấy giao điểm $C$ của hai đường tròn bằng công cụ Giao điểm của 2 đối tượng.',
      ],
      answer: [2, 0, 3, 1],
      hints: [
        'Phải có cạnh $AB$ trước thì mới biết tâm của hai đường tròn.',
        'Điểm $C$ cách $B$ một khoảng $5$ và cách $A$ một khoảng $6$.',
      ],
      solution:
        'Vẽ $AB = 4$ → vẽ đường tròn $(B; 5)$ và $(A; 6)$ → lấy giao điểm $C$ → nối $BC$, $CA$ và ẩn đường tròn.',
    },
    {
      type: 'choice',
      prompt:
        'Cho đường thẳng $a$ và điểm $M$ nằm ngoài $a$. Dùng công cụ Đường song song (nháy vào $M$ rồi $a$) nhiều lần, GeoGebra vẽ được bao nhiêu đường thẳng khác nhau đi qua $M$ và song song với $a$?',
      options: ['Không có đường nào', 'Đúng một đường', 'Hai đường', 'Vô số đường'],
      answer: 1,
      hints: ['Nhớ lại tiên đề Euclid về đường thẳng song song.'],
      solution:
        'Theo tiên đề Euclid, qua một điểm nằm ngoài một đường thẳng chỉ có một đường thẳng song song với đường thẳng đó. Lần nào GeoGebra cũng vẽ ra cùng một đường $g$.',
    },
    {
      type: 'number',
      prompt:
        'Vẽ góc $BAC$ có số đo $70^\\circ$ rồi dùng công cụ Đường phân giác được tia phân giác $At$. Công cụ Góc đo $\\widehat{BAt}$ được bao nhiêu độ?',
      answer: 35,
      unit: '°',
      hints: ['Tia phân giác chia góc thành hai góc bằng nhau.'],
      solution:
        '$\\widehat{BAt} = \\dfrac{1}{2}\\widehat{BAC} = \\dfrac{70^\\circ}{2} = 35^\\circ$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi việc cần làm với công cụ GeoGebra phù hợp.',
      left: [
        'Vẽ đường thẳng qua $M$ song song với $a$',
        'Vẽ đường trung trực của đoạn $AB$',
        'Lấy trung điểm của đoạn $AB$',
        'Tạo góc $60^\\circ$ tại đỉnh $A$ từ tia $AB$',
      ],
      right: [
        'Trung điểm hoặc tâm',
        'Góc với số đo cho trước',
        'Đường song song',
        'Đường trung trực',
        'Đường tròn khi biết tâm và bán kính',
      ],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: ['Tên mỗi công cụ đã nói nó dùng để làm gì.'],
      solution:
        'Song song: Đường song song. Trung trực: Đường trung trực. Trung điểm: Trung điểm hoặc tâm. Góc $60^\\circ$: Góc với số đo cho trước.',
    },
    {
      type: 'number',
      prompt:
        'Muốn vẽ tam giác $ABC$ có $AB = 5$ cm, $\\widehat{A} = 45^\\circ$, $\\widehat{C} = 75^\\circ$ bằng GeoGebra, sau khi vẽ đoạn $AB$ và góc tại $A$, em dựng góc bao nhiêu độ tại $B$?',
      answer: 60,
      unit: '°',
      hints: [
        'GeoGebra cần góc tại hai đầu của cạnh $AB$.',
        'Dùng định lí tổng ba góc của tam giác.',
      ],
      solution: '$\\widehat{B} = 180^\\circ - 45^\\circ - 75^\\circ = 60^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Trên đường trung trực $g$ của đoạn thẳng $AB$, bạn An lấy điểm $M$ và GeoGebra đo được $MA = 4{,}25$ cm. Độ dài $MB$ bằng bao nhiêu xăng-ti-mét?',
      answer: 4.25,
      unit: 'cm',
      hints: ['Điểm nằm trên đường trung trực của một đoạn thẳng có tính chất gì?'],
      solution:
        'Mọi điểm nằm trên đường trung trực của $AB$ cách đều $A$ và $B$, nên $MB = MA = 4{,}25$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Minh muốn vẽ tam giác có ba cạnh $AB = 2$ cm, $BC = 3$ cm, $CA = 6$ cm. Bạn vẽ đoạn $AB$, đường tròn tâm $B$ bán kính $3$ và đường tròn tâm $A$ bán kính $6$. Điều gì xảy ra?',
      options: [
        'Hai đường tròn cắt nhau, Minh vẽ được tam giác $ABC$',
        'Hai đường tròn không cắt nhau, không vẽ được tam giác $ABC$',
        'Hai đường tròn cắt nhau tại bốn điểm',
      ],
      answer: 1,
      hints: [
        'Mọi điểm của đường tròn tâm $B$ bán kính $3$ cách $A$ nhiều nhất bao nhiêu? Lưu ý $AB = 2$.',
      ],
      solution:
        'Mỗi điểm của đường tròn tâm $B$ bán kính $3$ cách $A$ không quá $2 + 3 = 5 < 6$, nên đường tròn nhỏ nằm hẳn trong đường tròn tâm $A$ bán kính $6$: hai đường tròn không cắt nhau, không có điểm $C$, không vẽ được tam giác.',
    },
    {
      type: 'number',
      prompt:
        'Vẽ tam giác $ABC$ vuông tại $A$ có $AB = 4$ cm, $AC = 3$ cm bằng GeoGebra rồi dùng công cụ Khoảng cách hoặc độ dài đo cạnh $BC$. GeoGebra cho $BC$ bằng bao nhiêu xăng-ti-mét?',
      answer: 5,
      unit: 'cm',
      hints: [
        'Dựng tam giác trong khung tương tác: chọn "Tam giác biết 2 cạnh, 1 góc" với $AB = 4$, $AC = 3$, góc $90^\\circ$.',
      ],
      solution: 'Dựng và đo được $BC = 5$ cm.',
    },
  ],
  takeaways: [
    'Đường song song: nháy vào điểm $M$ rồi đường thẳng $a$; chỉ có một đường thẳng qua $M$ song song với $a$ (tiên đề Euclid).',
    'Đường phân giác: nháy $B$, $A$, $C$; phần nằm trong góc $BAC$ là tia phân giác.',
    'Đường trung trực vuông góc với đoạn thẳng tại trung điểm; mỗi điểm trên nó cách đều hai đầu mút.',
    'Tam giác biết ba cạnh: hai đường tròn và giao điểm; biết hai cạnh và góc xen giữa: Góc với số đo cho trước và một đường tròn.',
    'Cùng số liệu cho các tam giác bằng nhau; có bộ ba độ dài không vẽ được tam giác vì hai đường tròn không cắt nhau.',
  ],
};
