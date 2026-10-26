/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: dùng phần mềm GeoGebra dựng hình chữ nhật, hình bình hành, hình thoi, hình thang theo số đo cho trước, đo để kiểm tra các tính chất của tứ giác và kiểm chứng định lí Thalès.',
  intro:
    'Ở lớp 7 em đã dùng GeoGebra vẽ đường song song, đường vuông góc và vẽ tam giác. Lớp 8 em học thêm các tứ giác đặc biệt và định lí Thalès. Bài này kết hợp các công cụ đó để dựng chính xác những tứ giác có số đo cho trước, rồi dùng công cụ đo để tự kiểm tra các tính chất đã học.',
  objectives: [
    'Dựng hình chữ nhật, hình bình hành, hình thoi, hình thang khi biết các số đo, bằng các công cụ Đoạn thẳng với độ dài cố định, Đường vuông góc, Đường song song, Đường tròn, Giao điểm và Đa giác.',
    'Dùng công cụ Góc, Khoảng cách hoặc độ dài, Trung điểm để kiểm tra tính chất của hình vừa dựng.',
    'Kiểm chứng định lí Thalès trong tam giác bằng cách kéo các điểm và quan sát các tỉ số.',
    'Mô tả bằng lời các bước dựng một hình bằng GeoGebra.',
  ],
  sections: [
    {
      heading: 'Các công cụ dùng trong bài',
      blocks: [
        {
          type: 'table',
          head: ['Công cụ', 'Thao tác', 'Kết quả'],
          rows: [
            [
              'Đoạn thẳng với độ dài cố định',
              'nháy vào điểm đầu, gõ độ dài',
              'đoạn thẳng có độ dài đã gõ',
            ],
            ['Đường vuông góc', 'nháy vào một điểm rồi một đường', 'đường vuông góc qua điểm đó'],
            ['Đường song song', 'nháy vào một điểm rồi một đường', 'đường song song qua điểm đó'],
            ['Đường tròn khi biết tâm và bán kính', 'nháy vào tâm, gõ bán kính', 'đường tròn'],
            ['Giao điểm của 2 đối tượng', 'nháy vào hai đối tượng', 'các giao điểm'],
            [
              'Góc với số đo cho trước',
              'nháy vào một điểm rồi đỉnh góc, gõ số đo, chọn chiều quay',
              'một điểm mới tạo với hai điểm đã chọn góc có số đo đó',
            ],
            ['Đa giác', 'nháy lần lượt các đỉnh, cuối cùng nháy lại đỉnh đầu', 'đa giác'],
            [
              'Góc; Khoảng cách hoặc độ dài; Trung điểm hoặc tâm',
              'nháy vào ba điểm; vào hai điểm hoặc một đoạn; vào hai điểm',
              'số đo góc; độ dài; trung điểm',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo',
          text: 'Các đường tròn, đường thẳng phụ chỉ dùng để dựng: khi xong, nháy nút phải chuột vào chúng và bỏ chọn Hiển thị đối tượng. Không xoá chúng, vì xoá đối tượng phụ sẽ xoá luôn các điểm dựng từ nó.',
        },
      ],
    },
    {
      heading: 'Dựng hình chữ nhật, hình bình hành và hình thoi',
      blocks: [
        {
          type: 'p',
          text: 'Hình chữ nhật $ABCD$ có $AB = 4$ cm, $BC = 3$ cm:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Dùng Đoạn thẳng với độ dài cố định vẽ $AB = 4$.',
            'Dùng Đường vuông góc vẽ hai đường thẳng vuông góc với $AB$ tại $A$ và tại $B$.',
            'Vẽ đường tròn tâm $B$ bán kính $3$; giao điểm của nó với đường vuông góc tại $B$ là $C$.',
            'Vẽ đường thẳng qua $C$ song song với $AB$; giao điểm của nó với đường vuông góc tại $A$ là $D$.',
            'Ẩn các đối tượng phụ, dùng Đa giác nối $A, B, C, D$.',
          ],
        },
        {
          type: 'p',
          text: 'Kiểm tra: công cụ Góc cho bốn góc đều bằng $90^\\circ$; đo hai đường chéo được $AC = BD$.',
        },
        {
          type: 'p',
          text: 'Hình bình hành $ABCD$ có $AB = 4$ cm, $BC = 3$ cm, $\\widehat{ABC} = 120^\\circ$:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ $AB = 4$.',
            "Dùng Góc với số đo cho trước: nháy vào $A$ rồi $B$, gõ $120^\\circ$, được điểm $A'$; vẽ tia $BA'$.",
            "Vẽ đường tròn tâm $B$ bán kính $3$; giao điểm của nó với tia $BA'$ là $C$.",
            'Vẽ đường thẳng qua $A$ song song với $BC$ và đường thẳng qua $C$ song song với $AB$; giao điểm của chúng là $D$.',
            'Ẩn các đối tượng phụ, dùng Đa giác nối $A, B, C, D$.',
          ],
        },
        {
          type: 'p',
          text: 'Kiểm tra: $AB = CD$, $BC = DA$; $\\widehat{A} = \\widehat{C} = 60^\\circ$, $\\widehat{B} = \\widehat{D} = 120^\\circ$; dùng Trung điểm hoặc tâm lấy trung điểm của $AC$ và của $BD$: hai điểm trùng nhau.',
        },
        {
          type: 'p',
          text: 'Hình thoi $ABCD$ có cạnh $AB = 3$ cm, $\\widehat{ABC} = 60^\\circ$ (hình thoi là hình bình hành có hai cạnh kề bằng nhau):',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ $AB = 3$.',
            "Dùng Góc với số đo cho trước: nháy vào $A$ rồi $B$, gõ $60^\\circ$, được điểm $A'$ với $BA' = BA = 3$. Vì $BC = BA$ nên $A'$ chính là đỉnh $C$: đổi tên $A'$ thành $C$.",
            'Vẽ đường thẳng qua $A$ song song với $BC$ và đường thẳng qua $C$ song song với $AB$; giao điểm của chúng là $D$.',
            'Dùng Đa giác nối $A, B, C, D$, rồi vẽ hai đường chéo $AC$, $BD$ cắt nhau tại $O$.',
          ],
        },
        {
          type: 'p',
          text: 'Kiểm tra: bốn cạnh đều bằng $3$ cm; công cụ Góc cho $\\widehat{AOB} = 90^\\circ$ (hai đường chéo vuông góc) và $\\widehat{ABD} = \\widehat{DBC} = 30^\\circ$ (đường chéo $BD$ là đường phân giác của góc $B$).',
        },
      ],
    },
    {
      heading: 'Dựng hình thang',
      blocks: [
        {
          type: 'p',
          text: 'Dựng hình thang $ADEC$ có đáy lớn $AD = 6$ cm, đáy nhỏ $EC = 3$ cm, hai cạnh bên $AC = 2$ cm, $DE = 4$ cm. Ý tưởng: lấy $B$ trên $AD$ với $BD = EC$; khi đó $BCED$ là hình bình hành nên $BC = DE = 4$, và tam giác $ABC$ dựng được vì biết đủ ba cạnh $AB = 6 - 3 = 3$, $AC = 2$, $BC = 4$.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ đoạn thẳng $AB = AD - EC = 3$.',
            'Vẽ đường tròn tâm $A$ bán kính $2$ và đường tròn tâm $B$ bán kính $4$; giao điểm của chúng là $C$. Vẽ $AC$, $BC$.',
            'Vẽ tia $AB$ và đường tròn tâm $A$ bán kính $6$; giao điểm của chúng là $D$.',
            'Vẽ đường thẳng qua $D$ song song với $BC$ và đường thẳng qua $C$ song song với $AB$; giao điểm của chúng là $E$.',
            'Ẩn các đối tượng phụ và điểm $B$, dùng Đa giác nối $A, D, E, C$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Nếu ba số $AD - EC$, $AC$, $DE$ không phải độ dài ba cạnh của một tam giác (cạnh lớn nhất không nhỏ hơn tổng hai cạnh kia) thì hai đường tròn ở bước 2 không cắt nhau và không dựng được hình thang.',
        },
      ],
    },
    {
      heading: 'Kiểm chứng định lí Thalès',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Dùng Đa giác vẽ tam giác $ABC$.',
            'Dùng Điểm trên đối tượng lấy điểm $M$ trên cạnh $AB$.',
            'Vẽ đường thẳng qua $M$ song song với $BC$; giao điểm của nó với $AC$ là $N$.',
            'Đo $AM$, $AB$, $AN$, $AC$; gõ AM / AB và AN / AC vào ô Nhập để GeoGebra tính hai tỉ số.',
            'Kéo $M$ trên cạnh $AB$, kéo các đỉnh của tam giác và quan sát hai tỉ số.',
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí Thalès trong tam giác',
          text: 'Nếu một đường thẳng song song với một cạnh của tam giác và cắt hai cạnh còn lại thì nó định ra trên hai cạnh đó những đoạn thẳng tương ứng tỉ lệ. Trong tam giác $ABC$, nếu $MN \\parallel BC$ ($M \\in AB$, $N \\in AC$) thì $$\\frac{AM}{AB} = \\frac{AN}{AC},\\qquad \\frac{AM}{MB} = \\frac{AN}{NC}.$$ Tương tự, $\\dfrac{MB}{AB} = \\dfrac{NC}{AC}$.',
        },
      ],
    },
    {
      heading: 'Thực hành trên máy tính',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: mỗi em hoặc mỗi nhóm hai em dựng các hình dưới đây bằng GeoGebra, đo để kiểm tra và lưu hình thành tệp ảnh.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: máy tính có GeoGebra Classic hoặc truy cập geogebra.org; vở ghi các bước dựng.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Dựng hình chữ nhật $ABCD$ có $AB = 4$ cm, $BC = 3$ cm; dùng công cụ Góc kiểm tra bốn góc vuông.',
            'Dựng hình bình hành $ABCD$ có $AB = 4$ cm, $BC = 3$ cm, $\\widehat{ABC} = 120^\\circ$; kiểm tra trung điểm của $AC$ và $BD$ trùng nhau.',
            'Dựng hình thoi $ABCD$ có cạnh $3$ cm, $\\widehat{ABC} = 60^\\circ$; dùng công cụ Góc kiểm tra hai đường chéo vuông góc.',
            'Dựng hình thang $ADEC$ có $AD = 6$ cm, $EC = 3$ cm, $AC = 2$ cm, $DE = 4$ cm; đo lại $DE$.',
            'Dựng hình chữ nhật $ABCD$ có $AB = 6$ cm và đường chéo $AC = 9$ cm; dựng hình bình hành $ABCD$ có $AB = 4$ cm, $AC = 5$ cm, $BC = 6$ cm. Viết các bước em đã làm.',
            'Kiểm chứng định lí Thalès: ghi bảng giá trị của $AM/AB$ và $AN/AC$ cho ba vị trí khác nhau của $M$.',
            'Lưu mỗi hình thành tệp ảnh (Hồ sơ → Xuất bản → Hình ảnh dạng png).',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: các tệp ảnh, các bước dựng của từng hình, bảng số đo và nhận xét: các số đo có khớp với tính chất của hình chữ nhật, hình bình hành, hình thoi, hình thang và với định lí Thalès không.',
        },
      ],
    },
  ],
  explore: {
    title: 'Dựng hình từng bước như trong GeoGebra',
    instruction:
      'Chọn hình cần dựng, bấm "Bước tiếp" để làm theo từng công cụ; dựng xong, bảng bên cạnh cho các số đo. Kéo thanh trượt để đổi số liệu. Với định lí Thalès, kéo đỉnh $A$ hoặc điểm $M$ (hoặc chọn điểm và dùng phím mũi tên) rồi so sánh các tỉ số.',
  },
  examples: [
    {
      problem:
        'Mô tả các bước dựng hình chữ nhật $ABCD$ có $AB = 6$ cm và đường chéo $AC = 9$ cm bằng GeoGebra.',
      steps: [
        'Dùng Đoạn thẳng với độ dài cố định vẽ $AB = 6$.',
        'Dùng Đường vuông góc vẽ đường thẳng vuông góc với $AB$ tại $B$ ($\\widehat{ABC} = 90^\\circ$ nên $C$ nằm trên đường này).',
        'Vẽ đường tròn tâm $A$ bán kính $9$; giao điểm của nó với đường vuông góc tại $B$ (phía trên $AB$) là $C$.',
        'Vẽ đường thẳng qua $A$ vuông góc với $AB$ và đường thẳng qua $C$ song song với $AB$; giao điểm của chúng là $D$.',
        'Ẩn các đối tượng phụ, dùng Đa giác nối $A, B, C, D$. Đo được $BC \\approx 6{,}71$ cm và $BD = 9$ cm.',
      ],
      answer: 'Hình chữ nhật $ABCD$ với $AB = 6$ cm, $AC = BD = 9$ cm.',
    },
    {
      problem:
        'Mô tả các bước dựng hình bình hành $ABCD$ có $AB = 4$ cm, $AC = 5$ cm, $BC = 6$ cm bằng GeoGebra.',
      steps: [
        'Biết ba cạnh của tam giác $ABC$ nên dựng tam giác này trước: vẽ $AB = 4$.',
        'Vẽ đường tròn tâm $A$ bán kính $5$ và đường tròn tâm $B$ bán kính $6$; một giao điểm của chúng là $C$.',
        'Vẽ đường thẳng qua $A$ song song với $BC$ và đường thẳng qua $C$ song song với $AB$; giao điểm của chúng là $D$.',
        'Ẩn các đối tượng phụ, dùng Đa giác nối $A, B, C, D$.',
      ],
      answer:
        'Hình bình hành $ABCD$ (hai cặp cạnh đối song song) có $AB = 4$ cm, $BC = 6$ cm và đường chéo $AC = 5$ cm.',
    },
    {
      problem:
        'Trong GeoGebra, tam giác $ABC$ có $AB = 6$ cm, $AC = 9$ cm. Lấy $M$ trên $AB$ với $AM = 2$ cm, vẽ đường thẳng qua $M$ song song với $BC$ cắt $AC$ tại $N$. Công cụ đo cho $AN$ bằng bao nhiêu?',
      steps: [
        'Vì $MN \\parallel BC$, theo định lí Thalès: $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$.',
        '$\\dfrac{2}{6} = \\dfrac{AN}{9}$, suy ra $AN = \\dfrac{2 \\cdot 9}{6} = 3$.',
        'GeoGebra đo được đúng $AN = 3$ cm, và $AM/AB = AN/AC \\approx 0{,}33$.',
      ],
      answer: '$AN = 3$ cm.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Sắp xếp các bước dựng hình chữ nhật $ABCD$ có $AB = 4$ cm, $BC = 3$ cm.',
      items: [
        'Vẽ đường tròn tâm $B$ bán kính $3$, lấy giao điểm $C$ với đường vuông góc tại $B$.',
        'Dùng Đa giác nối $A, B, C, D$.',
        'Vẽ đoạn thẳng $AB = 4$.',
        'Vẽ đường qua $C$ song song với $AB$, lấy giao điểm $D$ với đường vuông góc tại $A$.',
        'Vẽ hai đường vuông góc với $AB$ tại $A$ và tại $B$.',
      ],
      answer: [2, 4, 0, 3, 1],
      hints: ['Có $AB$ trước, rồi đến các đường vuông góc, rồi mới tìm $C$ và $D$.'],
      solution:
        '$AB = 4$ → hai đường vuông góc tại $A$, $B$ → đường tròn $(B; 3)$ cho $C$ → đường qua $C$ song song $AB$ cho $D$ → Đa giác.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Hà dựng xong hình bình hành $ABCD$ và muốn kiểm tra hai đường chéo cắt nhau tại trung điểm của mỗi đường. Hà nên dùng công cụ nào?',
      options: [
        'Đường song song',
        'Trung điểm hoặc tâm',
        'Đường tròn khi biết tâm và bán kính',
        'Đa giác',
      ],
      answer: 1,
      hints: ['Cần lấy trung điểm của $AC$ và của $BD$ rồi so sánh.'],
      solution:
        'Dùng Trung điểm hoặc tâm lấy trung điểm của $AC$ và của $BD$: hai điểm trùng nhau.',
    },
    {
      type: 'number',
      prompt:
        'Dựng hình bình hành $ABCD$ có $AB = 4$ cm, $BC = 3$ cm, $\\widehat{ABC} = 120^\\circ$. Công cụ Góc đo $\\widehat{DAB}$ được bao nhiêu độ?',
      answer: 60,
      unit: '°',
      hints: ['Trong hình bình hành, hai góc kề một cạnh có tổng bằng $180^\\circ$.'],
      solution:
        '$AD \\parallel BC$ nên $\\widehat{DAB} + \\widehat{ABC} = 180^\\circ$, do đó $\\widehat{DAB} = 60^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Dựng hình thoi $ABCD$ có cạnh $3$ cm, $\\widehat{ABC} = 60^\\circ$ rồi vẽ hai đường chéo cắt nhau tại $O$. Công cụ Góc đo $\\widehat{AOB}$ được bao nhiêu độ?',
      answer: 90,
      unit: '°',
      hints: ['Nhớ lại tính chất hai đường chéo của hình thoi.'],
      solution:
        'Trong hình thoi, hai đường chéo vuông góc với nhau, nên $\\widehat{AOB} = 90^\\circ$, dù cạnh và góc $B$ bằng bao nhiêu.',
    },
    {
      type: 'number',
      prompt:
        'Để dựng hình thang $ADEC$ có đáy lớn $AD = 7$ cm, đáy nhỏ $EC = 4$ cm, cạnh bên $AC = 2$ cm, $DE = 3$ cm theo cách của bài, đoạn thẳng $AB$ vẽ đầu tiên dài bao nhiêu xăng-ti-mét?',
      answer: 3,
      unit: 'cm',
      hints: ['$AB = AD - EC$.'],
      solution: '$AB = AD - EC = 7 - 4 = 3$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Nam muốn dựng hình thang $ADEC$ có $AD = 6$ cm, $EC = 3$ cm, $AC = 1$ cm, $DE = 5$ cm theo cách của bài. Điều gì xảy ra?',
      options: [
        'Dựng được hình thang $ADEC$',
        'Hai đường tròn tâm $A$ bán kính $1$ và tâm $B$ bán kính $5$ không cắt nhau, không dựng được',
        'Dựng được nhưng $DE$ không bằng $5$ cm',
      ],
      answer: 1,
      hints: [
        'Tam giác $ABC$ có $AB = 6 - 3 = 3$, $AC = 1$, $BC = 5$. Kiểm tra bất đẳng thức tam giác.',
      ],
      solution:
        '$AB + AC = 3 + 1 = 4 < 5 = BC$, nên không có tam giác $ABC$: hai đường tròn không cắt nhau và không dựng được hình thang. Thử ngay trong khung tương tác.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AB = 5$ cm, $AC = 7{,}5$ cm. Điểm $M$ trên $AB$ với $AM = 2$ cm; đường thẳng qua $M$ song song với $BC$ cắt $AC$ tại $N$. GeoGebra đo $AN$ được bao nhiêu xăng-ti-mét?',
      answer: 3,
      unit: 'cm',
      hints: ['Định lí Thalès: $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$.'],
      solution:
        '$\\dfrac{2}{5} = \\dfrac{AN}{7{,}5}$ nên $AN = \\dfrac{2 \\cdot 7{,}5}{5} = 3$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Trong tam giác $ABC$, $MN \\parallel BC$ ($M \\in AB$, $N \\in AC$). GeoGebra đo được $AM = 3$ cm, $MB = 2$ cm, $AN = 4{,}5$ cm. Độ dài $NC$ bằng bao nhiêu xăng-ti-mét?',
      answer: 3,
      unit: 'cm',
      hints: ['Dùng $\\dfrac{AM}{MB} = \\dfrac{AN}{NC}$.'],
      solution:
        '$\\dfrac{3}{2} = \\dfrac{4{,}5}{NC}$ nên $NC = \\dfrac{2 \\cdot 4{,}5}{3} = 3$ cm.',
    },
    {
      type: 'choice',
      prompt:
        'Dựng hình bình hành $ABCD$ có $AB = 4$ cm, $AC = 5$ cm, $BC = 6$ cm. Sau khi dựng tam giác $ABC$, đỉnh $D$ được xác định thế nào?',
      options: [
        'Giao điểm của đường tròn tâm $A$ bán kính $4$ và đường tròn tâm $C$ bán kính $6$ (bất kì)',
        'Giao điểm của đường thẳng qua $A$ song song với $BC$ và đường thẳng qua $C$ song song với $AB$',
        'Trung điểm của $AC$',
        'Giao điểm của đường vuông góc với $AB$ tại $A$ và đường tròn tâm $A$ bán kính $5$',
      ],
      answer: 1,
      hints: ['Hình bình hành có các cạnh đối song song: $AD \\parallel BC$, $CD \\parallel AB$.'],
      solution:
        '$D$ phải thỏa mãn $AD \\parallel BC$ và $CD \\parallel AB$, nên $D$ là giao điểm của đường thẳng qua $A$ song song với $BC$ và đường thẳng qua $C$ song song với $AB$.',
    },
  ],
  takeaways: [
    'Dựng hình bằng các công cụ (vuông góc, song song, đường tròn, giao điểm), không vẽ bằng mắt, để hình luôn đúng khi kéo các điểm.',
    'Hình chữ nhật: hai đường vuông góc tại hai đầu $AB$ và đường tròn cho cạnh còn lại. Hình bình hành: góc với số đo cho trước, hoặc tam giác $ABC$, rồi hai đường song song cho $D$. Hình thoi: như hình bình hành với $BC = BA$; đo được hai đường chéo vuông góc.',
    'Hình thang $ADEC$: dựng tam giác $ABC$ với $AB = AD - EC$, rồi hai đường song song cho $E$.',
    'Định lí Thalès: $MN \\parallel BC$ thì $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$; GeoGebra cho hai tỉ số luôn bằng nhau khi kéo hình.',
  ],
};
