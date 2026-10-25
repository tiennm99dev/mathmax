/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: dùng phần mềm GeoGebra vẽ điểm, đường thẳng, tia, đoạn thẳng, trung điểm của đoạn thẳng, vẽ góc có số đo cho trước và đo góc, rồi kiểm tra các tính chất đã học ở chương Những hình hình học cơ bản.',
  intro:
    'Ở học kì 1 em đã dùng GeoGebra vẽ tam giác đều, hình vuông, lục giác đều. Chương Những hình hình học cơ bản cho em thêm nhiều hình mới: điểm, đường thẳng, tia, đoạn thẳng, trung điểm, góc. GeoGebra vẽ được tất cả và còn đo được độ dài, số đo góc ngay trên hình. Khi kéo một điểm, các số đo thay đổi theo, giúp em kiểm tra những điều đã học.',
  objectives: [
    'Dùng các công cụ Điểm mới, Đường thẳng, Tia, Đoạn thẳng, Giao điểm của 2 đối tượng, Đường thẳng song song để vẽ hình theo mô tả.',
    'Dựng trung điểm của đoạn thẳng bằng công cụ Trung điểm hoặc tâm và kiểm tra bằng công cụ đo độ dài.',
    'Đo góc bằng công cụ Góc, vẽ góc có số đo cho trước bằng công cụ Góc với số đo cho trước.',
  ],
  sections: [
    {
      heading: 'Các công cụ cần dùng',
      blocks: [
        {
          type: 'p',
          text: 'Mở GeoGebra Classic hoặc trang geogebra.org, chọn ngôn ngữ tiếng Việt. Nháy vào biểu tượng của một nhóm công cụ để mở các công cụ trong nhóm, chọn công cụ rồi làm theo dòng hướng dẫn hiện ra.',
        },
        {
          type: 'table',
          head: ['Công cụ', 'Thao tác', 'Kết quả'],
          rows: [
            ['Điểm mới', 'nháy vào vùng làm việc', 'một điểm'],
            ['Đường thẳng', 'nháy vào hai điểm $A$, $B$', 'đường thẳng $AB$'],
            ['Tia', 'nháy vào gốc $O$ rồi một điểm $A$', 'tia $OA$'],
            ['Đoạn thẳng', 'nháy vào hai điểm $A$, $B$', 'đoạn thẳng $AB$'],
            ['Giao điểm của 2 đối tượng', 'nháy vào hai đường', 'giao điểm của chúng'],
            [
              'Đường thẳng song song',
              'nháy vào một điểm rồi một đường thẳng',
              'đường thẳng qua điểm đó, song song với đường đã cho',
            ],
            ['Trung điểm hoặc tâm', 'nháy vào hai điểm $A$, $B$', 'trung điểm của $AB$'],
            ['Khoảng cách hoặc độ dài', 'nháy vào hai điểm', 'độ dài đoạn thẳng nối chúng'],
            ['Góc', 'nháy vào $A$, $O$, $B$ (đỉnh ở giữa)', 'số đo góc $AOB$'],
            [
              'Góc với số đo cho trước',
              'nháy vào $A$ rồi đỉnh $O$, gõ số đo',
              "điểm $A'$ với $\\widehat{AOA'}$ bằng số đo đã gõ",
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đặt tên và di chuyển',
          text: 'Nháy nút phải chuột vào một điểm, chọn Đổi tên để đặt tên như trong đề bài. Chọn công cụ Di chuyển (hoặc nhấn phím Esc) rồi kéo một điểm: các đường, số đo phụ thuộc vào điểm đó thay đổi theo.',
        },
      ],
    },
    {
      heading: 'Đường thẳng, tia, đoạn thẳng và trung điểm',
      blocks: [
        {
          type: 'list',
          items: [
            'Đường thẳng $AB$ không bị giới hạn về hai phía; tia $AC$ có gốc $A$ và chỉ kéo dài về phía $C$; đoạn thẳng $BC$ có hai đầu mút $B$, $C$. Trên màn hình GeoGebra em thấy ngay sự khác nhau đó.',
            'Ba điểm thẳng hàng: vẽ đường thẳng $AB$, chọn Điểm mới và nháy lên chính đường thẳng đó để có điểm $C$ thuộc $AB$. Kéo $C$, nó chỉ chạy trên đường thẳng.',
            'Hai đường thẳng cắt nhau: vẽ hai đường thẳng rồi dùng Giao điểm của 2 đối tượng để có giao điểm. Hai đường thẳng song song: dùng Đường thẳng song song.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Trung điểm của đoạn thẳng',
          text: 'Công cụ Trung điểm hoặc tâm tạo điểm $M$ nằm giữa $A$, $B$ và cách đều $A$, $B$: $MA = MB = \\dfrac{AB}{2}$. Đo bằng công cụ Khoảng cách hoặc độ dài để kiểm tra; kéo $A$ hoặc $B$, $M$ vẫn là trung điểm.',
        },
      ],
    },
    {
      heading: 'Vẽ góc và đo góc',
      blocks: [
        {
          type: 'p',
          text: 'Góc $AOB$ là hình gồm hai tia chung gốc $OA$, $OB$; $O$ là đỉnh. Vẽ hai tia $OA$, $OB$ bằng công cụ Tia, rồi chọn công cụ Góc và nháy lần lượt vào $A$, $O$, $B$: GeoGebra hiện số đo của góc.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Thứ tự nháy chuột',
          text: 'GeoGebra đo góc theo chiều ngược chiều kim đồng hồ, từ tia thứ nhất sang tia thứ hai. Nếu nó hiện một số lớn hơn $180^\\circ$, ví dụ $310^\\circ$, thì em đã nháy theo chiều ngược lại; hãy nháy lại theo thứ tự $B$, $O$, $A$ để được $360^\\circ - 310^\\circ = 50^\\circ$. Số đo của một góc ở lớp 6 không vượt quá $180^\\circ$.',
        },
        {
          type: 'p',
          text: "Vẽ góc có số đo cho trước, ví dụ $\\widehat{AOA'} = 60^\\circ$: vẽ tia $OA$; chọn công cụ Góc với số đo cho trước, nháy vào $A$ rồi $O$, gõ $60^\\circ$, chọn ngược chiều kim đồng hồ. GeoGebra tạo điểm $A'$; vẽ tia $OA'$ là xong.",
        },
        {
          type: 'table',
          head: ['Số đo', 'Loại góc'],
          rows: [
            ['nhỏ hơn $90^\\circ$', 'góc nhọn'],
            ['bằng $90^\\circ$', 'góc vuông'],
            ['lớn hơn $90^\\circ$ và nhỏ hơn $180^\\circ$', 'góc tù'],
            ['bằng $180^\\circ$', 'góc bẹt'],
          ],
        },
      ],
    },
    {
      heading: 'Thực hành trên máy tính',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi em (hoặc mỗi nhóm hai em) dùng GeoGebra vẽ các hình theo mô tả, đo và ghi lại số đo, rồi kéo các điểm để kiểm tra tính chất.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: máy tính hoặc máy tính bảng đã cài GeoGebra Classic (hoặc truy cập được geogebra.org); vở ghi.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ đường thẳng $AB$, tia $AC$ và đoạn thẳng $BC$. Lấy điểm $D$ trên đường thẳng $AB$; kéo $D$ và nhận xét ba điểm $A$, $B$, $D$.',
            'Vẽ hai đường thẳng $a$, $b$ cắt nhau tại $O$; qua một điểm $M$ không thuộc $a$ vẽ đường thẳng song song với $a$.',
            'Vẽ đoạn thẳng $AB$ và trung điểm $M$ của nó. Đo $MA$, $MB$, $AB$ và ghi lại.',
            'Vẽ hai tia $OA$, $OB$ rồi đo góc $AOB$. Kéo $B$ để được lần lượt một góc nhọn, một góc vuông, một góc tù, một góc bẹt.',
            'Vẽ các góc $\\widehat{xOy}$ có số đo $40^\\circ$, $90^\\circ$, $135^\\circ$ bằng công cụ Góc với số đo cho trước và kiểm tra lại bằng công cụ Góc.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: lưu tệp hoặc chụp màn hình các hình đã vẽ, ghi bảng số đo (độ dài, góc), cho biết mỗi góc đã vẽ là góc nhọn, vuông, tù hay bẹt và giải thích vì sao $M$ là trung điểm của $AB$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Làm nhiệm vụ như trong GeoGebra',
    instruction:
      'Chọn nhiệm vụ rồi bấm "Bước tiếp" để làm theo từng công cụ. Kéo các điểm màu xanh (hoặc chọn điểm rồi dùng phím mũi tên) và xem số đo thay đổi. Ở nhiệm vụ Đo góc, kéo $A$ hoặc $B$ để góc $AOB$ có đúng số đo được yêu cầu; ở nhiệm vụ Góc cho trước, đổi số đo gõ vào GeoGebra.',
  },
  examples: [
    {
      problem:
        'Trong GeoGebra, vẽ đoạn thẳng $AB$ dài $5$ đơn vị rồi dùng công cụ Trung điểm hoặc tâm để có điểm $M$. Công cụ Khoảng cách hoặc độ dài sẽ cho $MA$ và $MB$ bằng bao nhiêu?',
      steps: [
        '$M$ là trung điểm của $AB$ nên $M$ nằm giữa $A$, $B$ và $MA = MB$.',
        'Vì $MA + MB = AB = 5$ nên $MA = MB = 5 : 2 = 2{,}5$ (đơn vị).',
      ],
      answer: '$MA = MB = 2{,}5$ đơn vị.',
    },
    {
      problem:
        'Bạn An vẽ hai tia $OA$, $OB$ rồi dùng công cụ Góc, nháy vào $A$, $O$, $B$ thì GeoGebra hiện $290^\\circ$. Số đo góc $AOB$ là bao nhiêu? Đó là góc gì?',
      steps: [
        'GeoGebra đo ngược chiều kim đồng hồ từ tia $OA$ sang tia $OB$; số đo lớn hơn $180^\\circ$ nghĩa là An đã nháy theo chiều ngược lại.',
        'Nháy lại theo thứ tự $B$, $O$, $A$, GeoGebra hiện $360^\\circ - 290^\\circ = 70^\\circ$.',
        '$70^\\circ < 90^\\circ$ nên góc $AOB$ là góc nhọn.',
      ],
      answer: '$\\widehat{AOB} = 70^\\circ$, là góc nhọn.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi hình cần vẽ với công cụ GeoGebra phù hợp.',
      left: [
        'Tia $OA$',
        'Trung điểm của đoạn $AB$',
        'Số đo góc $AOB$',
        "Góc $AOA'$ bằng $45^\\circ$",
      ],
      right: [
        'Góc',
        'Tia',
        'Góc với số đo cho trước',
        'Trung điểm hoặc tâm',
        'Đường thẳng song song',
      ],
      pairs: [
        [0, 1],
        [1, 3],
        [2, 0],
        [3, 2],
      ],
      hints: ['Tên công cụ đã nói nó làm ra hình gì.'],
      solution:
        'Tia $OA$: Tia. Trung điểm: Trung điểm hoặc tâm. Đo góc: Góc. Góc $45^\\circ$ cho trước: Góc với số đo cho trước.',
    },
    {
      type: 'number',
      prompt:
        'Vẽ đoạn thẳng $AB$ dài $7$ đơn vị rồi dựng trung điểm $M$ bằng GeoGebra. Công cụ Khoảng cách hoặc độ dài cho $MA$ bằng bao nhiêu đơn vị?',
      answer: 3.5,
      hints: ['Trung điểm chia đoạn thẳng thành hai đoạn bằng nhau.'],
      solution: '$MA = \\dfrac{AB}{2} = 7 : 2 = 3{,}5$ (đơn vị).',
    },
    {
      type: 'number',
      prompt:
        'Dùng công cụ Góc, nháy vào $A$, $O$, $B$ thì GeoGebra hiện $315^\\circ$. Số đo góc $AOB$ là bao nhiêu độ?',
      answer: 45,
      unit: '°',
      hints: [
        'Số đo lớn hơn $180^\\circ$: em đã nháy theo chiều ngược lại.',
        'Nháy lại theo thứ tự $B$, $O$, $A$; hai số đo cộng lại bằng $360^\\circ$.',
      ],
      solution: '$360^\\circ - 315^\\circ = 45^\\circ$, nên $\\widehat{AOB} = 45^\\circ$.',
    },
    {
      type: 'choice',
      prompt:
        "Vẽ tia $OA$, dùng công cụ Góc với số đo cho trước, nháy vào $A$ rồi $O$, gõ $135^\\circ$ và được điểm $A'$. Góc $AOA'$ là góc gì?",
      options: ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'],
      answer: 2,
      hints: ['So sánh $135^\\circ$ với $90^\\circ$ và $180^\\circ$.'],
      solution: "$90^\\circ < 135^\\circ < 180^\\circ$ nên góc $AOA'$ là góc tù.",
    },
    {
      type: 'choice',
      prompt:
        'Trong GeoGebra, sau khi vẽ đường thẳng $AB$, bạn Minh chọn Điểm mới và nháy lên chính đường thẳng đó để được điểm $C$. Khi kéo $C$ thì điều gì xảy ra?',
      options: [
        '$C$ chạy tự do khắp vùng làm việc',
        '$C$ chỉ chạy trên đường thẳng $AB$, nên $A$, $B$, $C$ luôn thẳng hàng',
        '$C$ luôn là trung điểm của $AB$',
        'Đường thẳng $AB$ biến mất',
      ],
      answer: 1,
      hints: ['Điểm được tạo trên một đường là điểm thuộc đường đó.'],
      solution:
        '$C$ được tạo trên đường thẳng $AB$ nên là điểm thuộc $AB$; kéo $C$ thì $C$ chỉ trượt trên đường thẳng, ba điểm $A$, $B$, $C$ luôn thẳng hàng.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước vẽ góc $xOy$ có số đo $40^\\circ$ trong GeoGebra.',
      items: [
        'Chọn Góc với số đo cho trước, nháy vào $A$ rồi $O$, gõ $40^\\circ$.',
        'Vẽ hai điểm $O$, $A$ và tia $OA$ (tia $Ox$).',
        "Dùng công cụ Góc nháy vào $A$, $O$, $A'$ để kiểm tra.",
        "Vẽ tia $OA'$ (tia $Oy$).",
      ],
      answer: [1, 0, 3, 2],
      hints: ['Phải có tia $Ox$ trước thì mới quay được.'],
      solution:
        "Vẽ $O$, $A$, tia $OA$ → Góc với số đo cho trước $40^\\circ$ cho điểm $A'$ → vẽ tia $OA'$ → đo lại để kiểm tra.",
    },
    {
      type: 'multi',
      prompt:
        'Bạn Hà vẽ hai tia $OA$, $OB$, kéo điểm $B$ và đo góc $AOB$ năm lần, được các số đo dưới đây. Chọn tất cả các lần góc $AOB$ là góc tù.',
      options: ['$95^\\circ$', '$90^\\circ$', '$150^\\circ$', '$180^\\circ$', '$60^\\circ$'],
      answers: [0, 2],
      hints: ['Góc tù lớn hơn góc vuông nhưng nhỏ hơn góc bẹt.'],
      solution:
        'Góc tù có số đo lớn hơn $90^\\circ$ và nhỏ hơn $180^\\circ$: $95^\\circ$ và $150^\\circ$. $90^\\circ$ là góc vuông, $180^\\circ$ là góc bẹt, $60^\\circ$ là góc nhọn.',
    },
  ],
  takeaways: [
    'Công cụ Đường thẳng, Tia, Đoạn thẳng vẽ ba hình khác nhau: đường thẳng không giới hạn hai phía, tia có một gốc, đoạn thẳng có hai đầu mút.',
    'Công cụ Trung điểm hoặc tâm cho trung điểm $M$ của $AB$: $MA = MB = \\dfrac{AB}{2}$.',
    'Công cụ Góc đo ngược chiều kim đồng hồ; nếu số đo lớn hơn $180^\\circ$ thì nháy lại theo thứ tự ngược lại.',
    'Công cụ Góc với số đo cho trước vẽ được góc có số đo bất kì.',
  ],
};
