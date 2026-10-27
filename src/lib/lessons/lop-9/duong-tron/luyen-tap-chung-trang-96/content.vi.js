/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: vị trí của điểm đối với đường tròn, dây và đường kính, góc ở tâm và số đo cung, độ dài cung tròn, diện tích hình quạt tròn và hình vành khuyên.',
  intro:
    'Ba bài đầu của chương cho ta những công cụ đầu tiên với đường tròn: so sánh khoảng cách với bán kính, đo cung bằng góc ở tâm, và tính độ dài cung, diện tích hình quạt, hình vành khuyên theo phần $\\dfrac{n}{360}$ của cả đường tròn. Bài luyện tập này phối hợp các công cụ đó, kể cả trong những tình huống thực tế như đồng hồ, bánh xe hay chiếc đĩa.',
  objectives: [
    'Xác định vị trí của điểm đối với đường tròn; tìm tâm và bán kính đường tròn đi qua nhiều điểm.',
    'Tính số đo cung nhỏ, cung lớn từ góc ở tâm; tính dây và khoảng cách từ tâm đến dây.',
    'Tính độ dài cung tròn, diện tích hình quạt tròn, hình vành khuyên và vận dụng vào thực tế.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Vị trí điểm $M$ đối với $(O; R)$',
              '$OM < R$: trong; $OM = R$: trên; $OM > R$: ngoài',
            ],
            ['Tính đối xứng', 'Tâm $O$ là tâm đối xứng; mỗi đường thẳng qua $O$ là trục đối xứng'],
            ['Dây và đường kính', 'Đường kính dài $2R$, là dây lớn nhất'],
            [
              'Số đo cung',
              'Cung nhỏ $=$ góc ở tâm chắn nó; nửa đường tròn $180^\\circ$; cung lớn $= 360^\\circ -$ cung nhỏ',
            ],
            ['Độ dài cung $n^\\circ$', '$l = \\dfrac{\\pi R n}{180}$'],
            ['Diện tích hình quạt $n^\\circ$', '$S = \\dfrac{\\pi R^2 n}{360} = \\dfrac{lR}{2}$'],
            ['Diện tích hình vành khuyên', '$S = \\pi\\left(R^2 - r^2\\right)$, $R > r$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dây và khoảng cách từ tâm',
          text: 'Với dây $AB$ không đi qua tâm, tam giác $OAB$ cân tại $O$. Gọi $H$ là trung điểm của $AB$ thì $OH \\perp AB$, và trong tam giác vuông $OHA$ có $OA^2 = OH^2 + AH^2$. Hệ thức này nối bán kính, nửa dây và khoảng cách từ tâm đến dây.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Lấy góc ở tâm làm số đo cung lớn (phải lấy $360^\\circ$ trừ đi). Quên bình phương bán kính khi tính diện tích hình quạt. Tính diện tích vành khuyên thành $\\pi(R - r)^2$ thay vì $\\pi\\left(R^2 - r^2\\right)$. Làm tròn $\\pi$ quá sớm khiến kết quả cuối lệch.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Số thập phân dùng dấu phẩy ($6{,}28$); có thể gõ kèm đơn vị như cm, cm² hay °. Làm sai lần đầu, em được gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng cho biết bài nào cần ôn thêm.',
  },
  examples: [
    {
      problem:
        'Cho đường tròn $(O; 5\\text{ cm})$ và dây $AB = 8$ cm. Tính khoảng cách từ $O$ đến $AB$. Điểm $M$ trên dây $AB$ với $AM = 1$ cm nằm trong hay trên đường tròn?',
      steps: [
        'Gọi $H$ là trung điểm của $AB$; tam giác $OAB$ cân tại $O$ nên $OH \\perp AB$ và $AH = 4$ cm.',
        '$OH^2 = OA^2 - AH^2 = 25 - 16 = 9$, nên $OH = 3$ cm.',
        '$M$ nằm giữa $A$ và $H$ với $MH = AH - AM = 3$ cm, nên $OM^2 = OH^2 + MH^2 = 9 + 9 = 18$ và $OM = 3\\sqrt{2} \\approx 4{,}24$ cm.',
        '$OM < 5 = R$, nên $M$ nằm bên trong đường tròn.',
      ],
      answer: 'Khoảng cách từ $O$ đến $AB$ là $3$ cm; $M$ nằm bên trong đường tròn.',
    },
    {
      problem:
        'Kim phút của một đồng hồ dài $12$ cm. Trong $15$ phút, đầu kim vạch một cung dài bao nhiêu, và kim quét qua một hình quạt có diện tích bao nhiêu (làm tròn đến hàng phần trăm)?',
      steps: [
        'Kim phút quay $360^\\circ$ trong $60$ phút, nên trong $15$ phút quay $\\dfrac{15}{60} \\cdot 360^\\circ = 90^\\circ$.',
        'Độ dài cung: $l = \\dfrac{\\pi \\cdot 12 \\cdot 90}{180} = 6\\pi \\approx 18{,}85$ cm.',
        'Diện tích hình quạt: $S = \\dfrac{lR}{2} = \\dfrac{6\\pi \\cdot 12}{2} = 36\\pi \\approx 113{,}10$ cm².',
      ],
      answer: 'Cung dài khoảng $18{,}85$ cm; hình quạt có diện tích khoảng $113{,}10$ cm².',
    },
    {
      problem:
        'Một chiếc đĩa CD có đường kính $12$ cm, lỗ tròn ở giữa có đường kính $1{,}5$ cm (cùng tâm). Tính diện tích mặt đĩa (làm tròn đến hàng phần trăm).',
      steps: [
        'Mặt đĩa là hình vành khuyên với $R = 12 : 2 = 6$ cm và $r = 1{,}5 : 2 = 0{,}75$ cm.',
        '$S = \\pi\\left(6^2 - 0{,}75^2\\right) = \\pi(36 - 0{,}5625) = 35{,}4375\\pi$.',
        '$S \\approx 111{,}33$ cm².',
      ],
      answer: 'Diện tích mặt đĩa khoảng $111{,}33$ cm².',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Cho đường tròn $(O; 6\\text{ cm})$ và điểm $M$ với $OM = 6$ cm. Khẳng định nào đúng?',
      options: [
        '$M$ nằm bên trong đường tròn',
        '$M$ nằm bên ngoài đường tròn',
        '$M$ là tâm đường tròn',
        '$M$ nằm trên đường tròn',
      ],
      answer: 3,
      hints: ['So sánh $OM$ với bán kính.'],
      solution: '$OM = 6 = R$ nên $M$ nằm trên đường tròn.',
    },
    {
      type: 'number',
      prompt:
        'Hình chữ nhật $ABCD$ có $AB = 6$ cm, $BC = 8$ cm. Tính bán kính đường tròn đi qua bốn đỉnh của hình chữ nhật.',
      answer: 5,
      unit: 'cm',
      hints: ['Tâm là giao điểm hai đường chéo; bán kính bằng nửa đường chéo.'],
      solution: '$AC = \\sqrt{6^2 + 8^2} = 10$ cm, nên bán kính là $10 : 2 = 5$ cm.',
    },
    {
      type: 'number',
      prompt: 'Góc ở tâm $\\widehat{AOB} = 48^\\circ$. Tính số đo cung lớn $AB$.',
      answer: 312,
      unit: '°',
      hints: ['Cung lớn và cung nhỏ chung hai mút có tổng số đo $360^\\circ$.'],
      solution:
        'Cung nhỏ $AB$ có số đo $48^\\circ$, nên cung lớn có số đo $360^\\circ - 48^\\circ = 312^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Lúc $2$ giờ đúng, tính số đo cung nhỏ có hai mút là hai đầu kim đồng hồ (coi hai kim dài bằng nhau).',
      answer: 60,
      unit: '°',
      hints: ['Mỗi khoảng giữa hai số liền nhau trên mặt đồng hồ ứng với $30^\\circ$.'],
      solution:
        'Hai kim cách nhau $2$ khoảng, nên cung nhỏ có số đo $2 \\cdot 30^\\circ = 60^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Đường tròn $(O; 10\\text{ cm})$ có dây $AB = 16$ cm. Tính khoảng cách từ tâm $O$ đến dây $AB$.',
      answer: 6,
      unit: 'cm',
      hints: [
        'Gọi $H$ là trung điểm của $AB$; vì tam giác $OAB$ cân nên $OH \\perp AB$.',
        '$OH^2 = OA^2 - AH^2$.',
      ],
      solution: '$AH = 8$ cm, $OH^2 = 10^2 - 8^2 = 36$, nên $OH = 6$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tính độ dài cung $150^\\circ$ của đường tròn bán kính $12$ cm (làm tròn đến hàng phần trăm).',
      answer: 31.42,
      tolerance: 0.005,
      unit: 'cm',
      hints: ['$l = \\dfrac{\\pi R n}{180}$.'],
      solution: '$l = \\dfrac{\\pi \\cdot 12 \\cdot 150}{180} = 10\\pi \\approx 31{,}42$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tính diện tích hình quạt tròn bán kính $8$ cm, cung $45^\\circ$ (làm tròn đến hàng phần trăm).',
      answer: 25.13,
      tolerance: 0.005,
      unit: 'cm²',
      hints: ['$S = \\dfrac{\\pi R^2 n}{360}$; cung $45^\\circ$ là $\\dfrac{1}{8}$ đường tròn.'],
      solution: '$S = \\dfrac{\\pi \\cdot 64 \\cdot 45}{360} = 8\\pi \\approx 25{,}13$ cm².',
    },
    {
      type: 'number',
      prompt:
        'Tính diện tích hình vành khuyên giới hạn bởi hai đường tròn đồng tâm bán kính $10$ cm và $6$ cm (làm tròn đến hàng phần trăm).',
      answer: 201.06,
      tolerance: 0.005,
      unit: 'cm²',
      hints: ['$S = \\pi\\left(R^2 - r^2\\right)$.'],
      solution: '$S = \\pi(100 - 36) = 64\\pi \\approx 201{,}06$ cm².',
    },
    {
      type: 'number',
      prompt:
        'Một bánh xe có bán kính $35$ cm lăn thẳng $10$ vòng trên mặt đường. Xe đi được bao nhiêu mét (làm tròn đến hàng phần trăm)?',
      answer: 21.99,
      tolerance: 0.005,
      unit: 'm',
      hints: [
        'Mỗi vòng, xe đi được một quãng bằng chu vi bánh xe $C = 2\\pi R$.',
        'Đổi kết quả từ xăng-ti-mét sang mét.',
      ],
      solution:
        'Mỗi vòng: $C = 2\\pi \\cdot 35 = 70\\pi$ cm. Mười vòng: $700\\pi \\approx 2\\,199{,}11$ cm $\\approx 21{,}99$ m.',
    },
    {
      type: 'multi',
      prompt: 'Chọn các khẳng định đúng.',
      options: [
        'Cung $90^\\circ$ có độ dài bằng $\\dfrac{1}{4}$ chu vi đường tròn.',
        'Hình quạt $180^\\circ$ có diện tích bằng nửa diện tích hình tròn.',
        'Trong một đường tròn, bán kính là dây lớn nhất.',
        'Nếu $\\widehat{AOB} = \\alpha$ ($0^\\circ < \\alpha < 180^\\circ$) thì cung lớn $AB$ có số đo $360^\\circ - \\alpha$.',
      ],
      answers: [0, 1, 3],
      hints: [
        'Cung, hình quạt $n^\\circ$ chiếm $\\dfrac{n}{360}$ đường tròn, hình tròn.',
        'Bán kính có phải là một dây không?',
      ],
      solution:
        '$\\dfrac{90}{360} = \\dfrac{1}{4}$ và $\\dfrac{180}{360} = \\dfrac{1}{2}$ nên hai khẳng định đầu đúng; khẳng định cuối đúng theo định nghĩa số đo cung lớn. Bán kính không phải là dây (chỉ có một đầu trên đường tròn); dây lớn nhất là đường kính.',
    },
  ],
  takeaways: [
    'So sánh khoảng cách đến tâm với bán kính để biết điểm nằm trong, trên hay ngoài đường tròn.',
    'Bán kính, nửa dây và khoảng cách từ tâm đến dây liên hệ bởi $R^2 = d^2 + \\left(\\dfrac{AB}{2}\\right)^2$.',
    'Cung và hình quạt $n^\\circ$ chiếm $\\dfrac{n}{360}$ đường tròn: $l = \\dfrac{\\pi R n}{180}$, $S = \\dfrac{\\pi R^2 n}{360}$.',
    'Vành khuyên: $S = \\pi\\left(R^2 - r^2\\right)$; giữ $\\pi$ đến bước cuối rồi mới làm tròn.',
  ],
};
