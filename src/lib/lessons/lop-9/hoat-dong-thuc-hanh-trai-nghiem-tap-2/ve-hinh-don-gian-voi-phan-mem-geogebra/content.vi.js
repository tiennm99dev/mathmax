/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: dùng phần mềm GeoGebra vẽ đường tròn, tiếp tuyến của đường tròn tại một điểm và qua một điểm nằm ngoài, đường tròn ngoại tiếp và đường tròn nội tiếp tam giác, rồi đo để kiểm tra các tính chất đã học.',
  intro:
    'Ở Chương V và Chương IX, em đã học tiếp tuyến của đường tròn, đường tròn ngoại tiếp và đường tròn nội tiếp tam giác. Vẽ bằng thước và compa thì hình khó thật chính xác, còn GeoGebra dựng đúng từng bước và cho phép kéo các điểm để kiểm tra: dù hình thay đổi, hai tiếp tuyến cắt nhau vẫn có hai đoạn bằng nhau, tâm đường tròn ngoại tiếp vẫn cách đều ba đỉnh.',
  objectives: [
    'Vẽ đường tròn khi biết tâm và một điểm, và vẽ tiếp tuyến của đường tròn tại một điểm trên đường tròn.',
    'Dựng hai tiếp tuyến của đường tròn đi qua một điểm nằm ngoài đường tròn.',
    'Dựng đường tròn ngoại tiếp tam giác bằng các đường trung trực và đường tròn nội tiếp bằng các đường phân giác.',
    'Dùng công cụ đo để kiểm chứng tính chất của hai tiếp tuyến cắt nhau, của tâm đường tròn ngoại tiếp và nội tiếp.',
  ],
  sections: [
    {
      heading: 'Các công cụ dùng trong bài',
      blocks: [
        {
          type: 'p',
          text: 'Mở GeoGebra Classic (hoặc trang geogebra.org, mục Hình học), chọn ngôn ngữ tiếng Việt. Mỗi biểu tượng trên thanh công cụ là một nhóm; nháy vào nhóm để mở các công cụ bên trong và làm theo dòng hướng dẫn hiện ra.',
        },
        {
          type: 'table',
          head: ['Công cụ', 'Thao tác', 'Kết quả'],
          rows: [
            [
              'Đường tròn khi biết tâm và một điểm',
              'Chọn tâm, rồi một điểm',
              'Đường tròn đi qua điểm đó',
            ],
            [
              'Đường vuông góc',
              'Chọn một điểm, rồi một đường',
              'Đường thẳng qua điểm, vuông góc với đường',
            ],
            ['Trung điểm hoặc tâm', 'Chọn hai điểm', 'Trung điểm của đoạn thẳng'],
            ['Giao điểm của hai đối tượng', 'Chọn hai đường', 'Các giao điểm'],
            ['Đường trung trực', 'Chọn hai điểm (hoặc một đoạn)', 'Đường trung trực của đoạn'],
            ['Đường phân giác', 'Chọn ba điểm, đỉnh góc ở giữa', 'Đường phân giác của góc'],
            ['Tiếp tuyến', 'Chọn một điểm, rồi đường tròn', 'Các tiếp tuyến qua điểm đó'],
            ['Khoảng cách hoặc độ dài; Góc', 'Chọn hai điểm; chọn ba điểm', 'Độ dài; số đo góc'],
          ],
          caption: 'Các công cụ GeoGebra dùng trong bài.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Kéo thả để kiểm tra',
          text: 'Sau khi dựng xong, chọn công cụ Di chuyển rồi kéo các điểm ban đầu. Một tính chất đúng sẽ vẫn đúng ở mọi vị trí, còn một hình vẽ "ước lượng bằng mắt" sẽ hỏng ngay.',
        },
      ],
    },
    {
      heading: 'Đường tròn và tiếp tuyến',
      blocks: [
        {
          type: 'p',
          text: 'Nhắc lại: đường thẳng $d$ là tiếp tuyến của đường tròn $(O; R)$ khi $d$ và đường tròn có đúng một điểm chung. Nếu $d$ đi qua điểm $B$ của đường tròn và vuông góc với bán kính $OB$ thì $d$ là tiếp tuyến của đường tròn tại $B$.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tiếp tuyến tại $B$: vẽ đường tròn tâm $O$ đi qua $B$, nối $OB$, rồi dùng "Đường vuông góc" chọn $B$ và đoạn $OB$.',
            'Tiếp tuyến qua $M$ nằm ngoài $(O)$: lấy trung điểm $I$ của $OM$, vẽ đường tròn tâm $I$ đi qua $O$ (đường tròn đường kính $OM$); hai đường tròn cắt nhau tại $A$ và $C$; các đường thẳng $MA$, $MC$ là hai tiếp tuyến cần dựng.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Vì sao cách dựng đúng',
          text: '$A$ nằm trên đường tròn đường kính $OM$ nên $\\widehat{OAM} = 90^\\circ$ (góc nội tiếp chắn nửa đường tròn). Do đó $MA \\perp OA$ tại $A \\in (O)$, tức $MA$ là tiếp tuyến. Theo tính chất hai tiếp tuyến cắt nhau: $MA = MC$ và $MO$ là tia phân giác của góc $AMC$.',
        },
        {
          type: 'p',
          text: 'Công cụ "Tiếp tuyến" của GeoGebra vẽ ngay hai tiếp tuyến này; em có thể dùng nó để đối chiếu với cách dựng trên. Nếu $M$ nằm trong đường tròn, GeoGebra không vẽ được tiếp tuyến nào.',
        },
      ],
    },
    {
      heading: 'Đường tròn ngoại tiếp và nội tiếp tam giác',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nhắc lại',
          text: 'Đường tròn ngoại tiếp tam giác đi qua ba đỉnh; tâm của nó là giao điểm ba đường trung trực của tam giác. Đường tròn nội tiếp tam giác tiếp xúc với ba cạnh; tâm của nó là giao điểm ba đường phân giác trong của tam giác.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đường tròn ngoại tiếp: vẽ tam giác $ABC$ bằng công cụ "Đa giác"; vẽ đường trung trực của $AB$ và của $BC$; lấy giao điểm $O$; vẽ đường tròn tâm $O$ đi qua $A$. Kiểm tra: đường tròn cũng đi qua $B$ và $C$.',
            'Đường tròn nội tiếp: vẽ tam giác $ABC$; vẽ đường phân giác của góc $B$ và góc $C$; lấy giao điểm $I$; vẽ đường vuông góc từ $I$ đến $BC$, lấy chân $H$; vẽ đường tròn tâm $I$ đi qua $H$. Kiểm tra: đường tròn tiếp xúc với cả $AB$ và $CA$, và đường phân giác góc $A$ cũng đi qua $I$.',
          ],
        },
        {
          type: 'table',
          head: [
            'Loại tam giác',
            'Vị trí tâm đường tròn ngoại tiếp',
            'Vị trí tâm đường tròn nội tiếp',
          ],
          rows: [
            ['Nhọn', 'Trong tam giác', 'Trong tam giác'],
            ['Vuông', 'Trung điểm cạnh huyền', 'Trong tam giác'],
            ['Tù', 'Ngoài tam giác', 'Trong tam giác'],
          ],
          caption: 'Kéo một đỉnh trong mô phỏng để thấy tâm $O$ đi ra ngoài khi tam giác thành tù.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tam giác đều',
          text: 'Với tam giác đều cạnh $a$, hai tâm trùng nhau, bán kính đường tròn ngoại tiếp là $R = \\dfrac{a\\sqrt{3}}{3}$ và bán kính đường tròn nội tiếp là $r = \\dfrac{a\\sqrt{3}}{6}$.',
        },
      ],
    },
    {
      heading: 'Thực hành: dựng hình và kiểm chứng bằng GeoGebra',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi nhóm dựng bằng GeoGebra bốn hình (tiếp tuyến tại một điểm, hai tiếp tuyến qua một điểm, đường tròn ngoại tiếp, đường tròn nội tiếp), đo để kiểm chứng tính chất và lưu hình làm báo cáo.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: máy tính hoặc máy tính bảng có GeoGebra Classic (hoặc truy cập geogebra.org), giấy ghi kết quả đo.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ đường tròn $(O)$ bán kính $3$, điểm $M$ với $OM = 5$. Dựng hai tiếp tuyến $MA$, $MC$ theo các bước ở trên. Đo $MA$, $MC$, góc $OAM$ và góc $AMO$, $OMC$; so sánh với kết quả tính bằng định lí Pythagore.',
            'Kéo $M$ lại gần đường tròn rồi vào trong đường tròn. Ghi lại điều gì xảy ra với hai tiếp tuyến.',
            'Vẽ tam giác vuông có hai cạnh góc vuông $6$ và $8$. Dựng đường tròn ngoại tiếp, đo bán kính và kiểm tra tâm là trung điểm cạnh huyền.',
            'Với cùng tam giác đó, dựng đường tròn nội tiếp, đo bán kính và so sánh với $r = \\dfrac{6 + 8 - 10}{2}$.',
            'Lưu từng hình thành tệp ảnh (Tệp, Xuất bản, Xuất ảnh) hoặc chụp màn hình.',
          ],
        },
        {
          type: 'table',
          head: ['Hình', 'Số đo trên GeoGebra', 'Kết quả tính', 'Nhận xét'],
          rows: [
            ['$MA$, $MC$', '(em ghi)', '$4$', '(em ghi)'],
            ['Góc $OAM$', '(em ghi)', '$90^\\circ$', '(em ghi)'],
            ['$R$ ngoại tiếp', '(em ghi)', '$5$', '(em ghi)'],
            ['$r$ nội tiếp', '(em ghi)', '$2$', '(em ghi)'],
          ],
          caption: 'Mẫu bảng ghi kết quả của nhóm.',
        },
        {
          type: 'p',
          text: 'Báo cáo: nộp các tệp ảnh, bảng số đo và trả lời: vì sao cách dựng tiếp tuyến qua đường tròn đường kính $OM$ là đúng; khi kéo các điểm, những đại lượng nào luôn bằng nhau.',
        },
      ],
    },
  ],
  explore: {
    title: 'GeoGebra mô phỏng: dựng từng bước',
    instruction:
      'Chọn hình cần dựng, bấm "Bước tiếp" để làm từng bước như trên GeoGebra (tên công cụ ghi ở đầu mỗi bước). Khi dựng xong, kéo các điểm màu xanh (hoặc chọn điểm rồi dùng phím mũi tên) và xem các số đo: những đại lượng nào luôn bằng nhau?',
  },
  examples: [
    {
      problem:
        'Cho đường tròn $(O; 3)$ và điểm $M$ với $OM = 5$. Kẻ hai tiếp tuyến $MA$, $MC$ ($A$, $C$ là tiếp điểm). Tính $MA$ và kiểm tra bằng GeoGebra.',
      steps: [
        '$MA$ là tiếp tuyến tại $A$ nên $MA \\perp OA$: tam giác $OAM$ vuông tại $A$.',
        'Theo định lí Pythagore: $MA^2 = OM^2 - OA^2 = 25 - 9 = 16$, nên $MA = 4$.',
        'Theo tính chất hai tiếp tuyến cắt nhau, $MC = MA = 4$.',
        'Trên GeoGebra, dùng "Khoảng cách hoặc độ dài" chọn $M$ và $A$, rồi $M$ và $C$: cả hai đều hiện $4$.',
      ],
      answer: '$MA = MC = 4$.',
    },
    {
      problem:
        'Tam giác $ABC$ vuông tại $A$ có $AB = 6$, $AC = 8$. Xác định tâm và bán kính đường tròn ngoại tiếp, bán kính đường tròn nội tiếp.',
      steps: [
        'Cạnh huyền $BC = \\sqrt{6^2 + 8^2} = 10$.',
        'Tam giác vuông nội tiếp đường tròn có đường kính là cạnh huyền: tâm là trung điểm của $BC$, bán kính $R = \\dfrac{10}{2} = 5$.',
        'Gọi $r$ là bán kính đường tròn nội tiếp. Diện tích tam giác: $S = \\dfrac{1}{2} \\cdot 6 \\cdot 8 = 24$; mặt khác $S = r \\cdot \\dfrac{6 + 8 + 10}{2} = 12r$.',
        'Suy ra $r = 2$. GeoGebra cho đúng các số đo này khi dựng như trên.',
      ],
      answer:
        'Tâm đường tròn ngoại tiếp là trung điểm $BC$, $R = 5$; bán kính đường tròn nội tiếp $r = 2$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Muốn vẽ tiếp tuyến của đường tròn $(O)$ tại điểm $B$ nằm trên đường tròn, ta dùng công cụ nào sau khi vẽ đoạn $OB$?',
      options: ['Đường trung trực', 'Đường vuông góc', 'Đường song song', 'Đường phân giác'],
      answer: 1,
      hints: ['Tiếp tuyến tại $B$ vuông góc với bán kính $OB$.'],
      solution:
        'Dùng "Đường vuông góc": chọn $B$ rồi đoạn $OB$, được đường thẳng qua $B$ vuông góc với $OB$.',
    },
    {
      type: 'choice',
      prompt: 'Tâm đường tròn ngoại tiếp tam giác là giao điểm của',
      options: [
        'ba đường trung tuyến',
        'ba đường phân giác',
        'ba đường trung trực',
        'ba đường cao',
      ],
      answer: 2,
      hints: ['Tâm cần cách đều ba đỉnh.'],
      solution:
        'Điểm cách đều hai đầu đoạn thẳng nằm trên đường trung trực, nên tâm là giao điểm ba đường trung trực.',
    },
    {
      type: 'choice',
      prompt:
        'Để dựng đường tròn nội tiếp tam giác $ABC$ trên GeoGebra, sau khi có tâm $I$, ta lấy bán kính là',
      options: [
        'đoạn $IA$',
        'khoảng cách từ $I$ đến một cạnh, tức $IH$ với $H$ là chân đường vuông góc từ $I$ xuống cạnh đó',
        'nửa cạnh $BC$',
        'khoảng cách từ $I$ đến trung điểm của $BC$',
      ],
      answer: 1,
      hints: ['Đường tròn nội tiếp tiếp xúc với các cạnh.'],
      solution:
        'Bán kính đường tròn nội tiếp là khoảng cách từ tâm $I$ đến các cạnh, chẳng hạn $IH$ với $IH \\perp BC$.',
    },
    {
      type: 'number',
      prompt:
        'Đường tròn $(O; 5)$ và điểm $M$ với $OM = 13$. Độ dài tiếp tuyến $MA$ ($A$ là tiếp điểm) bằng bao nhiêu?',
      answer: 12,
      hints: ['Tam giác $OAM$ vuông tại $A$.', '$MA^2 = OM^2 - OA^2$.'],
      solution: '$MA^2 = 13^2 - 5^2 = 169 - 25 = 144$, nên $MA = 12$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác vuông có hai cạnh góc vuông $5$ cm và $12$ cm. Bán kính đường tròn ngoại tiếp của nó bằng bao nhiêu xentimét?',
      answer: 6.5,
      unit: 'cm',
      hints: ['Tâm là trung điểm cạnh huyền.', 'Tính cạnh huyền bằng định lí Pythagore.'],
      solution: 'Cạnh huyền $\\sqrt{5^2 + 12^2} = 13$ cm, nên $R = \\dfrac{13}{2} = 6{,}5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Cũng tam giác vuông có hai cạnh góc vuông $5$ cm, $12$ cm. Bán kính đường tròn nội tiếp bằng bao nhiêu xentimét?',
      answer: 2,
      unit: 'cm',
      hints: [
        'Diện tích bằng $r$ nhân nửa chu vi.',
        'Diện tích là $\\dfrac{1}{2} \\cdot 5 \\cdot 12 = 30$, nửa chu vi là $\\dfrac{5 + 12 + 13}{2} = 15$.',
      ],
      solution:
        '$S = 30$ cm², nửa chu vi $p = 15$ cm, nên $r = \\dfrac{S}{p} = \\dfrac{30}{15} = 2$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác đều cạnh $6$ cm. Bán kính đường tròn ngoại tiếp bằng bao nhiêu xentimét? (Làm tròn đến hàng phần trăm.)',
      answer: 3.46,
      tolerance: 0.005,
      unit: 'cm',
      hints: ['$R = \\dfrac{a\\sqrt{3}}{3}$.'],
      solution: '$R = \\dfrac{6\\sqrt{3}}{3} = 2\\sqrt{3} \\approx 3{,}46$ cm.',
    },
    {
      type: 'multi',
      prompt:
        'Từ điểm $M$ nằm ngoài đường tròn $(O)$ kẻ hai tiếp tuyến $MA$, $MC$. Khẳng định nào đúng?',
      options: [
        '$MA = MC$',
        '$MO$ là tia phân giác của góc $AMC$',
        '$\\widehat{OAM} = 90^\\circ$',
        '$MA = OA$',
      ],
      answers: [0, 1, 2],
      hints: ['Nhớ lại tính chất hai tiếp tuyến cắt nhau.', 'Đo thử trong mô phỏng khi kéo $M$.'],
      solution:
        'Hai tiếp tuyến cắt nhau tại $M$ thì $MA = MC$, $MO$ là tia phân giác của góc $AMC$, và tiếp tuyến vuông góc với bán kính nên $\\widehat{OAM} = 90^\\circ$. $MA = OA$ chỉ đúng khi $OM = OA\\sqrt{2}$, không đúng nói chung.',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các bước dựng hai tiếp tuyến của $(O)$ đi qua điểm $M$ nằm ngoài đường tròn.',
      items: [
        'Vẽ đường tròn tâm $I$ đi qua $O$.',
        'Lấy trung điểm $I$ của $OM$.',
        'Vẽ các đường thẳng $MA$, $MC$.',
        'Lấy các giao điểm $A$, $C$ của hai đường tròn.',
      ],
      answer: [1, 0, 3, 2],
      hints: ['Đường tròn đường kính $OM$ cần biết tâm $I$ trước.'],
      solution:
        'Lấy trung điểm $I$ của $OM$, vẽ đường tròn $(I; IO)$, lấy giao điểm $A$, $C$ với $(O)$, rồi vẽ $MA$, $MC$.',
    },
  ],
  takeaways: [
    'Tiếp tuyến tại $B$ là đường thẳng qua $B$ vuông góc với bán kính $OB$.',
    'Hai tiếp tuyến qua $M$ dựng được nhờ đường tròn đường kính $OM$; khi đó $MA = MC$ và $MO$ là phân giác của góc $AMC$.',
    'Tâm đường tròn ngoại tiếp là giao điểm các đường trung trực; tâm đường tròn nội tiếp là giao điểm các đường phân giác, bán kính là khoảng cách từ tâm đến một cạnh.',
    'Kéo thả các điểm trên GeoGebra là cách kiểm chứng nhanh một tính chất hình học.',
  ],
};
