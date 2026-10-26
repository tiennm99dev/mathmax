/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về tập hợp các số hữu tỉ, so sánh và sắp xếp số hữu tỉ, cộng, trừ, nhân, chia số hữu tỉ và tính hợp lí.',
  intro:
    'Bài luyện tập này ôn lại hai bài vừa học: Tập hợp các số hữu tỉ (Bài 1) và Cộng, trừ, nhân, chia số hữu tỉ (Bài 2). Em sẽ so sánh, sắp xếp các số hữu tỉ, tính giá trị biểu thức và dùng các tính chất của phép tính để tính nhanh.',
  objectives: [
    'Nhận biết số hữu tỉ, tìm số đối, so sánh và sắp xếp các số hữu tỉ.',
    'Cộng, trừ, nhân, chia số hữu tỉ cho dưới dạng phân số hoặc số thập phân.',
    'Tính hợp lí nhờ tính chất giao hoán, kết hợp, phân phối và quy tắc dấu ngoặc.',
  ],
  sections: [
    {
      heading: 'Nhắc lại kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Số hữu tỉ',
              'Số viết được dưới dạng $\\frac{a}{b}$ với $a, b \\in \\mathbb{Z}$, $b \\ne 0$; tập hợp $\\mathbb{Q}$',
            ],
            ['Số đối', 'Số đối của $a$ là $-a$; $-(-a) = a$'],
            [
              'So sánh',
              'Đưa về phân số cùng mẫu dương rồi so sánh tử; $a < b$ thì điểm $a$ nằm bên trái điểm $b$',
            ],
            ['Cộng, trừ', 'Viết dưới dạng phân số rồi cộng, trừ phân số; $a - b = a + (-b)$'],
            [
              'Nhân, chia',
              '$\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{ac}{bd}$; $\\;\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}$',
            ],
            ['Số nghịch đảo', 'Của $a \\ne 0$ là $\\frac{1}{a}$; số $0$ không có số nghịch đảo'],
            [
              'Tính chất',
              'Giao hoán, kết hợp; $a(b + c) = ab + ac$; quy tắc dấu ngoặc như trong $\\mathbb{Z}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Với số âm, phần số lớn hơn thì số lại nhỏ hơn: $-0{,}5 < -0{,}4$. Khi bỏ ngoặc có dấu "$-$" đằng trước phải đổi dấu tất cả các số hạng trong ngoặc, không chỉ số hạng đầu.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện ngẫu nhiên',
    instruction:
      'Mỗi lượt có 12 câu trộn từ Bài 1 và Bài 2. Nhập số nguyên (ví dụ −7), phân số dạng a/b (ví dụ −3/4) hoặc số thập phân có dấu phẩy (ví dụ −0,75); mọi cách viết bằng nhau đều được chấp nhận. Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng cho biết phần nào cần ôn thêm.',
  },
  examples: [
    {
      problem: 'So sánh hai số hữu tỉ $\\frac{-13}{40}$ và $\\frac{11}{-30}$.',
      steps: [
        'Đưa về mẫu dương: $\\frac{11}{-30} = \\frac{-11}{30}$.',
        'Quy đồng mẫu $120$: $\\frac{-13}{40} = \\frac{-39}{120}$ và $\\frac{-11}{30} = \\frac{-44}{120}$.',
        'Vì $-39 > -44$ nên $\\frac{-39}{120} > \\frac{-44}{120}$.',
      ],
      answer: '$\\frac{-13}{40} > \\frac{11}{-30}$.',
    },
    {
      problem:
        'Tính giá trị biểu thức $A = \\left(\\frac{-3}{4} + 0{,}5\\right) \\cdot \\frac{8}{3} - 1{,}5 : \\frac{3}{2}$.',
      steps: [
        'Trong ngoặc trước: $\\frac{-3}{4} + 0{,}5 = \\frac{-3}{4} + \\frac{2}{4} = \\frac{-1}{4}$.',
        'Nhân, chia trước: $\\frac{-1}{4} \\cdot \\frac{8}{3} = \\frac{-2}{3}$ và $1{,}5 : \\frac{3}{2} = \\frac{3}{2} \\cdot \\frac{2}{3} = 1$.',
        'Trừ sau: $A = \\frac{-2}{3} - 1 = \\frac{-2}{3} - \\frac{3}{3} = \\frac{-5}{3}$.',
      ],
      answer: '$A = \\frac{-5}{3}$.',
    },
    {
      problem:
        'Tính hợp lí: $B = \\frac{-5}{7} \\cdot \\frac{2}{11} + \\frac{-5}{7} \\cdot \\frac{9}{11} + 1\\frac{5}{7}$.',
      steps: [
        'Hai tích đầu có chung thừa số $\\frac{-5}{7}$: $\\frac{-5}{7} \\cdot \\left(\\frac{2}{11} + \\frac{9}{11}\\right) = \\frac{-5}{7} \\cdot 1 = \\frac{-5}{7}$.',
        'Đổi hỗn số: $1\\frac{5}{7} = \\frac{12}{7}$.',
        '$B = \\frac{-5}{7} + \\frac{12}{7} = \\frac{7}{7} = 1$.',
      ],
      answer: '$B = 1$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Khẳng định nào sai?',
      options: [
        '$-5 \\in \\mathbb{Q}$',
        '$0{,}3 \\in \\mathbb{Q}$',
        '$\\frac{-2}{3} \\in \\mathbb{Z}$',
        '$\\mathbb{Z} \\subset \\mathbb{Q}$',
      ],
      answer: 2,
      hints: ['$\\mathbb{Z}$ là tập hợp các số nguyên.'],
      solution:
        '$\\frac{-2}{3}$ là số hữu tỉ nhưng không phải số nguyên, nên "$\\frac{-2}{3} \\in \\mathbb{Z}$" sai. Các khẳng định còn lại đều đúng: $-5 = \\frac{-5}{1}$, $0{,}3 = \\frac{3}{10}$, mọi số nguyên đều là số hữu tỉ.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các số hữu tỉ sau theo thứ tự tăng dần.',
      items: ['$\\frac{-3}{8}$', '$-0{,}4$', '$\\frac{1}{6}$', '$0{,}2$', '$-\\frac{1}{2}$'],
      answer: [4, 1, 0, 2, 3],
      hints: [
        'Xếp các số âm trước, rồi đến các số dương.',
        'Viết thành số thập phân để so sánh: $\\frac{-3}{8} = -0{,}375$, $-\\frac{1}{2} = -0{,}5$.',
      ],
      solution:
        'Số âm: $-\\frac{1}{2} = -0{,}5 < -0{,}4 < -0{,}375 = \\frac{-3}{8}$. Số dương: $\\frac{1}{6} = \\frac{5}{30} < \\frac{6}{30} = 0{,}2$. Vậy $-\\frac{1}{2} < -0{,}4 < \\frac{-3}{8} < \\frac{1}{6} < 0{,}2$.',
    },
    {
      type: 'choice',
      prompt: 'So sánh $\\frac{-11}{12}$ và $\\frac{-12}{13}$.',
      options: [
        '$\\frac{-11}{12} < \\frac{-12}{13}$',
        '$\\frac{-11}{12} = \\frac{-12}{13}$',
        '$\\frac{-11}{12} > \\frac{-12}{13}$',
      ],
      answer: 2,
      hints: ['Quy đồng mẫu dương $156$.'],
      solution:
        '$\\frac{-11}{12} = \\frac{-143}{156}$, $\\frac{-12}{13} = \\frac{-144}{156}$. Vì $-143 > -144$ nên $\\frac{-11}{12} > \\frac{-12}{13}$.',
    },
    {
      type: 'number',
      prompt: 'Có bao nhiêu số nguyên $x$ thỏa mãn $-2{,}5 < x < \\frac{7}{3}$?',
      answer: 5,
      hints: ['$\\frac{7}{3} = 2\\frac{1}{3}$.'],
      solution:
        'Các số nguyên nằm giữa $-2{,}5$ và $2\\frac{1}{3}$ là $-2; -1; 0; 1; 2$, có $5$ số.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính $\\frac{-2}{5} + 0{,}6 - \\frac{3}{4}$ (viết kết quả dưới dạng phân số tối giản).',
      answer: [-11, 20],
      simplest: true,
      hints: ['$\\frac{-2}{5} + 0{,}6 = -0{,}4 + 0{,}6$.', 'Mẫu chung của $5$ và $4$ là $20$.'],
      solution:
        '$\\frac{-2}{5} + 0{,}6 = \\frac{-2}{5} + \\frac{3}{5} = \\frac{1}{5}$; $\\;\\frac{1}{5} - \\frac{3}{4} = \\frac{4}{20} - \\frac{15}{20} = \\frac{-11}{20}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\left(-\\frac{5}{6}\\right) \\cdot 1{,}2 : \\frac{-3}{4}$.',
      answer: [4, 3],
      hints: ['Làm lần lượt từ trái sang phải.', '$1{,}2 = \\frac{6}{5}$.'],
      solution:
        '$\\left(-\\frac{5}{6}\\right) \\cdot \\frac{6}{5} = -1$; $\\;-1 : \\frac{-3}{4} = -1 \\cdot \\frac{4}{-3} = \\frac{4}{3}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính hợp lí: $\\frac{7}{9} \\cdot 0{,}25 + \\frac{7}{9} \\cdot \\frac{3}{4}$.',
      answer: [7, 9],
      hints: [
        'Đặt thừa số chung $\\frac{7}{9}$ ra ngoài.',
        '$0{,}25 + \\frac{3}{4} = \\frac{1}{4} + \\frac{3}{4}$.',
      ],
      solution:
        '$\\frac{7}{9} \\cdot \\left(0{,}25 + \\frac{3}{4}\\right) = \\frac{7}{9} \\cdot 1 = \\frac{7}{9}$.',
    },
    {
      type: 'number',
      prompt: 'Tính hợp lí: $(-2{,}5) \\cdot 0{,}38 \\cdot 0{,}4$.',
      answer: -0.38,
      hints: ['Đổi chỗ để nhân $(-2{,}5) \\cdot 0{,}4$ trước.'],
      solution:
        '$(-2{,}5) \\cdot 0{,}38 \\cdot 0{,}4 = [(-2{,}5) \\cdot 0{,}4] \\cdot 0{,}38 = (-1) \\cdot 0{,}38 = -0{,}38$.',
    },
    {
      type: 'number',
      prompt:
        'Bỏ dấu ngoặc rồi tính: $\\left(\\frac{3}{5} - \\frac{1}{4}\\right) - \\left(\\frac{3}{5} + \\frac{3}{4}\\right)$.',
      answer: -1,
      hints: [
        'Ngoặc thứ hai có dấu "$-$" đằng trước: đổi dấu cả $\\frac{3}{5}$ và $\\frac{3}{4}$.',
      ],
      solution:
        '$\\frac{3}{5} - \\frac{1}{4} - \\frac{3}{5} - \\frac{3}{4} = \\left(\\frac{3}{5} - \\frac{3}{5}\\right) - \\left(\\frac{1}{4} + \\frac{3}{4}\\right) = 0 - 1 = -1$.',
    },
    {
      type: 'fraction',
      prompt: 'Tìm số nghịch đảo của $-2\\frac{1}{3}$.',
      answer: [-3, 7],
      hints: ['Đổi hỗn số ra phân số: $-2\\frac{1}{3} = -\\left(2 + \\frac{1}{3}\\right)$.'],
      solution:
        '$-2\\frac{1}{3} = \\frac{-7}{3}$, nên số nghịch đảo là $\\frac{3}{-7} = \\frac{-3}{7}$.',
    },
    {
      type: 'number',
      prompt:
        'Nhiệt độ lúc $6$ giờ sáng ở một thành phố là $-2{,}5\\,^\\circ\\mathrm{C}$. Đến trưa nhiệt độ tăng thêm $4{,}8\\,^\\circ\\mathrm{C}$, đến tối lại giảm $3{,}25\\,^\\circ\\mathrm{C}$ so với buổi trưa. Nhiệt độ buổi tối là bao nhiêu độ C?',
      answer: -0.95,
      unit: '°C',
      hints: ['Tăng là cộng, giảm là trừ: tính $-2{,}5 + 4{,}8 - 3{,}25$.'],
      solution:
        '$-2{,}5 + 4{,}8 = 2{,}3$; $\\;2{,}3 - 3{,}25 = -0{,}95$. Nhiệt độ buổi tối là $-0{,}95\\,^\\circ\\mathrm{C}$.',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh vườn hình chữ nhật có chiều dài $12{,}5$ m, chiều rộng bằng $\\frac{3}{5}$ chiều dài. Tính diện tích mảnh vườn.',
      answer: 93.75,
      unit: 'm²',
      hints: [
        'Chiều rộng bằng $12{,}5 \\cdot \\frac{3}{5}$.',
        'Diện tích bằng chiều dài nhân chiều rộng.',
      ],
      solution:
        'Chiều rộng: $12{,}5 \\cdot \\frac{3}{5} = 7{,}5$ (m). Diện tích: $12{,}5 \\cdot 7{,}5 = 93{,}75$ (m²).',
    },
  ],
  takeaways: [
    'So sánh số hữu tỉ: đưa về phân số cùng mẫu dương, hoặc so sánh số thập phân; số âm luôn nhỏ hơn số dương.',
    'Mọi phép tính với số hữu tỉ đều quy về phép tính với phân số (hoặc số thập phân).',
    'Tìm thừa số chung, số đối nhau hoặc các số có tổng tròn để tính hợp lí.',
  ],
};
