/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung: tính tỉ số lượng giác của góc nhọn từ các cạnh, dùng giá trị các góc đặc biệt và tính chất hai góc phụ nhau, dùng máy tính cầm tay, tính cạnh và góc của tam giác vuông bằng các hệ thức giữa cạnh và góc.',
  intro:
    'Bài 11 gắn mỗi góc nhọn với bốn tỉ số lượng giác, Bài 12 dùng chúng để tính cạnh và góc của tam giác vuông. Bài luyện tập này phối hợp cả hai: từ dữ kiện đã cho, xác định đúng cạnh đối, cạnh kề, cạnh huyền của góc đang xét rồi chọn tỉ số phù hợp.',
  objectives: [
    'Tính tỉ số lượng giác của góc nhọn khi biết các cạnh của tam giác vuông.',
    'Vận dụng bảng góc đặc biệt và tính chất hai góc phụ nhau để tính, so sánh.',
    'Tính cạnh, góc của tam giác vuông bằng hệ thức giữa cạnh và góc, kể cả trong bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Kiến thức cần nhớ',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Công thức (tam giác $ABC$ vuông tại $A$)'],
          rows: [
            [
              'Tỉ số lượng giác của góc $B$',
              '$\\sin B = \\dfrac{AC}{BC}$, $\\cos B = \\dfrac{AB}{BC}$, $\\tan B = \\dfrac{AC}{AB}$, $\\cot B = \\dfrac{AB}{AC}$',
            ],
            [
              'Hai góc phụ nhau $B$, $C$',
              '$\\sin B = \\cos C$, $\\cos B = \\sin C$, $\\tan B = \\cot C$, $\\cot B = \\tan C$',
            ],
            [
              'Cạnh góc vuông theo cạnh huyền',
              '$AC = BC\\sin B = BC\\cos C$; $AB = BC\\sin C = BC\\cos B$',
            ],
            [
              'Cạnh góc vuông theo cạnh góc vuông kia',
              '$AC = AB\\tan B = AB\\cot C$; $AB = AC\\tan C = AC\\cot B$',
            ],
          ],
        },
        {
          type: 'table',
          head: ['Góc', '$\\sin$', '$\\cos$', '$\\tan$', '$\\cot$'],
          rows: [
            [
              '$30^\\circ$',
              '$\\dfrac{1}{2}$',
              '$\\dfrac{\\sqrt{3}}{2}$',
              '$\\dfrac{\\sqrt{3}}{3}$',
              '$\\sqrt{3}$',
            ],
            ['$45^\\circ$', '$\\dfrac{\\sqrt{2}}{2}$', '$\\dfrac{\\sqrt{2}}{2}$', '$1$', '$1$'],
            [
              '$60^\\circ$',
              '$\\dfrac{\\sqrt{3}}{2}$',
              '$\\dfrac{1}{2}$',
              '$\\sqrt{3}$',
              '$\\dfrac{\\sqrt{3}}{3}$',
            ],
          ],
          caption: 'Tỉ số lượng giác của các góc đặc biệt.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'So sánh tỉ số lượng giác',
          text: 'Khi góc nhọn $\\alpha$ tăng thì $\\sin\\alpha$ và $\\tan\\alpha$ tăng, còn $\\cos\\alpha$ và $\\cot\\alpha$ giảm. Muốn so sánh $\\sin$ với $\\cos$, hãy đổi về cùng một loại nhờ tính chất hai góc phụ nhau.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Nhầm cạnh đối với cạnh kề khi đổi góc đang xét: cạnh đối của góc $B$ là $AC$, nhưng cạnh đối của góc $C$ là $AB$. Làm tròn quá sớm ở bước trung gian cũng làm kết quả lệch.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện ngẫu nhiên',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Tỉ số có thể nhập dạng phân số ($3/5$) hoặc số thập phân ($0{,}6$). Làm sai lần đầu, em được gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Làm xong một bộ, em có thể làm tiếp một bộ đề mới.',
  },
  examples: [
    {
      problem:
        'Cho tam giác $ABC$ vuông tại $A$ có $AB = 6$ cm, $BC = 10$ cm. Tính các tỉ số lượng giác của góc $C$, rồi suy ra tỉ số lượng giác của góc $B$.',
      steps: [
        '$AC = \\sqrt{BC^2 - AB^2} = \\sqrt{100 - 36} = 8$ cm.',
        'Với góc $C$: cạnh đối $AB = 6$, cạnh kề $AC = 8$. $\\sin C = \\dfrac{6}{10} = \\dfrac{3}{5}$, $\\cos C = \\dfrac{8}{10} = \\dfrac{4}{5}$, $\\tan C = \\dfrac{6}{8} = \\dfrac{3}{4}$, $\\cot C = \\dfrac{4}{3}$.',
        'Góc $B$ phụ với góc $C$ nên $\\sin B = \\cos C = \\dfrac{4}{5}$, $\\cos B = \\sin C = \\dfrac{3}{5}$, $\\tan B = \\cot C = \\dfrac{4}{3}$, $\\cot B = \\tan C = \\dfrac{3}{4}$.',
      ],
      answer:
        '$\\sin C = \\dfrac{3}{5}$, $\\cos C = \\dfrac{4}{5}$, $\\tan C = \\dfrac{3}{4}$, $\\cot C = \\dfrac{4}{3}$; góc $B$ đổi vai trò sin với cos, tan với cot.',
    },
    {
      problem:
        'Một máy bay cất cánh theo đường thẳng tạo với mặt đất góc $20^\\circ$. Sau khi bay được $8$ km, máy bay ở độ cao bao nhiêu (làm tròn đến hàng phần trăm)?',
      steps: [
        'Quãng đường bay $8$ km là cạnh huyền, độ cao là cạnh đối của góc $20^\\circ$.',
        'Độ cao $h = 8\\sin 20^\\circ \\approx 8 \\cdot 0{,}3420 \\approx 2{,}736$ km.',
        'Làm tròn đến hàng phần trăm: $h \\approx 2{,}74$ km.',
      ],
      answer: 'Máy bay ở độ cao khoảng $2{,}74$ km.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tam giác $ABC$ vuông tại $A$ có $AB = 6$ cm, $BC = 10$ cm. Khi đó $\\cos B$ bằng',
      options: ['$\\dfrac{3}{5}$', '$\\dfrac{4}{5}$', '$\\dfrac{3}{4}$', '$\\dfrac{4}{3}$'],
      answer: 0,
      hints: ['Côsin bằng cạnh kề chia cạnh huyền.', 'Cạnh kề của góc $B$ là $AB$.'],
      solution: '$\\cos B = \\dfrac{AB}{BC} = \\dfrac{6}{10} = \\dfrac{3}{5}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Với tam giác ở câu trên ($AB = 6$ cm, $BC = 10$ cm, vuông tại $A$), tính $\\tan C$ (phân số tối giản).',
      answer: [3, 4],
      simplest: true,
      hints: [
        'Tính $AC$ bằng định lí Pythagore.',
        'Với góc $C$: cạnh đối là $AB$, cạnh kề là $AC$.',
      ],
      solution:
        '$AC = \\sqrt{10^2 - 6^2} = 8$ cm. $\\tan C = \\dfrac{AB}{AC} = \\dfrac{6}{8} = \\dfrac{3}{4}$.',
    },
    {
      type: 'choice',
      prompt:
        'Cho góc nhọn $\\alpha$ với $\\tan\\alpha = \\dfrac{3}{4}$. Khi đó $\\sin\\alpha$ bằng',
      options: ['$\\dfrac{3}{5}$', '$\\dfrac{4}{5}$', '$\\dfrac{3}{4}$', '$\\dfrac{5}{3}$'],
      answer: 0,
      hints: [
        'Dựng tam giác vuông có cạnh đối $3$, cạnh kề $4$ của góc $\\alpha$.',
        'Cạnh huyền của tam giác đó bằng $\\sqrt{3^2 + 4^2}$.',
      ],
      solution:
        'Dựng tam giác vuông có cạnh đối $3$, cạnh kề $4$ thì $\\tan\\alpha = \\dfrac{3}{4}$, cạnh huyền là $\\sqrt{9 + 16} = 5$. Vậy $\\sin\\alpha = \\dfrac{3}{5}$.',
    },
    {
      type: 'number',
      prompt:
        'Tính $A = \\cos^2 45^\\circ + \\tan 60^\\circ \\cdot \\cot 60^\\circ - \\sin 30^\\circ$.',
      answer: 1,
      hints: [
        '$\\cos 45^\\circ = \\dfrac{\\sqrt{2}}{2}$ nên $\\cos^2 45^\\circ = \\dfrac{1}{2}$.',
        '$\\tan 60^\\circ \\cdot \\cot 60^\\circ = 1$.',
      ],
      solution: '$A = \\dfrac{1}{2} + 1 - \\dfrac{1}{2} = 1$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp theo thứ tự tăng dần (không dùng máy tính).',
      items: ['$\\sin 25^\\circ$', '$\\cos 70^\\circ$', '$\\sin 40^\\circ$', '$\\cos 35^\\circ$'],
      answer: [1, 0, 2, 3],
      hints: [
        'Đổi côsin thành sin của góc phụ: $\\cos 70^\\circ = \\sin 20^\\circ$.',
        'Góc nhọn càng lớn thì sin càng lớn.',
      ],
      solution:
        '$\\cos 70^\\circ = \\sin 20^\\circ$ và $\\cos 35^\\circ = \\sin 55^\\circ$. Vì $20^\\circ < 25^\\circ < 40^\\circ < 55^\\circ$ nên $\\cos 70^\\circ < \\sin 25^\\circ < \\sin 40^\\circ < \\cos 35^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $BC = 18$ cm, $\\widehat{B} = 27^\\circ$. Tính $AC$ (cm, làm tròn đến hàng phần mười).',
      answer: 8.2,
      tolerance: 0.05,
      unit: 'cm',
      hints: ['$AC$ là cạnh đối của góc $B$, $BC$ là cạnh huyền.'],
      solution:
        '$AC = BC\\sin B = 18\\sin 27^\\circ \\approx 18 \\cdot 0{,}4540 \\approx 8{,}2$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $AB = 10$ cm, $\\widehat{C} = 35^\\circ$. Tính $AC$ (cm, làm tròn đến hàng phần mười).',
      answer: 14.3,
      tolerance: 0.05,
      unit: 'cm',
      hints: [
        '$AB$ là cạnh đối, $AC$ là cạnh kề của góc $C$.',
        'Cạnh góc vuông bằng cạnh góc vuông kia nhân côtang góc kề: $AC = AB\\cot C$.',
      ],
      solution:
        '$AC = AB\\cot C = \\dfrac{10}{\\tan 35^\\circ} \\approx \\dfrac{10}{0{,}7002} \\approx 14{,}3$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $AB = 5$ cm, $BC = 13$ cm. Tính góc $C$ (làm tròn đến độ). Nhập số đo theo độ.',
      answer: 23,
      hints: [
        '$AB$ là cạnh đối của góc $C$.',
        '$\\sin C = \\dfrac{AB}{BC}$, rồi dùng SHIFT $\\sin$.',
      ],
      solution:
        '$\\sin C = \\dfrac{5}{13} \\approx 0{,}3846$, máy tính cho $\\widehat{C} \\approx 22{,}62^\\circ \\approx 23^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Bóng của một cột cờ trên mặt đất dài $9$ m, tia nắng tạo với mặt đất góc $50^\\circ$. Tính chiều cao cột cờ (m, làm tròn đến hàng phần mười).',
      answer: 10.7,
      tolerance: 0.05,
      unit: 'm',
      hints: ['Bóng là cạnh kề, cột cờ là cạnh đối của góc $50^\\circ$.'],
      solution: 'Chiều cao $= 9\\tan 50^\\circ \\approx 9 \\cdot 1{,}1918 \\approx 10{,}7$ m.',
    },
    {
      type: 'number',
      prompt: 'Dùng máy tính cầm tay, tính $\\cot 22^\\circ$ (làm tròn đến hàng phần nghìn).',
      answer: 2.475,
      tolerance: 0.0005,
      hints: ['Máy không có phím $\\cot$: $\\cot 22^\\circ = \\dfrac{1}{\\tan 22^\\circ}$.'],
      solution:
        '$\\tan 22^\\circ \\approx 0{,}40403$, nên $\\cot 22^\\circ = \\dfrac{1}{\\tan 22^\\circ} \\approx 2{,}4751 \\approx 2{,}475$.',
    },
  ],
  takeaways: [
    'Trước khi viết tỉ số, xác định cạnh đối, cạnh kề, cạnh huyền của đúng góc đang xét.',
    'Hai góc phụ nhau đổi vai trò sin với côsin, tang với côtang; dùng điều đó để so sánh và tính nhanh.',
    'Biết cạnh huyền thì dùng sin hoặc côsin; biết một cạnh góc vuông thì dùng tang hoặc côtang.',
    'Chỉ làm tròn ở kết quả cuối cùng.',
  ],
};
