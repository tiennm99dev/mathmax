/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tần số tương đối f = m/n của một giá trị, bảng tần số tương đối và cách vẽ, đọc biểu đồ tần số tương đối dạng cột và dạng hình quạt tròn.',
  intro:
    'Lớp 9A có $8$ bạn là con một, lớp 9B có $10$ bạn là con một. Có thể kết luận "con một" ở lớp 9B phổ biến hơn không? Chưa chắc: nếu lớp 9A có $30$ học sinh còn lớp 9B có $50$ học sinh thì tỉ lệ ở 9A là $\\dfrac{8}{30} \\approx 26{,}7\\%$, còn ở 9B chỉ là $\\dfrac{10}{50} = 20\\%$. Để so sánh những mẫu có cỡ khác nhau, ta dùng tần số tương đối.',
  objectives: [
    'Hiểu và tính được tần số tương đối của một giá trị.',
    'Lập được bảng tần số tương đối từ mẫu dữ liệu hoặc từ bảng tần số.',
    'Vẽ và đọc được biểu đồ tần số tương đối dạng cột và dạng hình quạt tròn.',
  ],
  sections: [
    {
      heading: 'Tần số tương đối. Bảng tần số tương đối',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tần số tương đối',
          text: 'Tần số tương đối $f$ của một giá trị $x$ là tỉ số giữa tần số $m$ của giá trị đó và số dữ liệu $n$ của mẫu (cỡ mẫu): $$f = \\dfrac{m}{n}.$$ Ta thường viết tần số tương đối dưới dạng tỉ số phần trăm: $f = \\dfrac{m}{n} \\cdot 100\\%$.',
        },
        {
          type: 'p',
          text: 'Giả sử mẫu dữ liệu có $k$ giá trị khác nhau $x_1, x_2, \\dots, x_k$ với các tần số tương đối $f_1, f_2, \\dots, f_k$. Bảng sau được gọi là bảng tần số tương đối của mẫu dữ liệu:',
        },
        {
          type: 'table',
          head: ['Giá trị ($x$)', '$x_1$', '$x_2$', '$\\dots$', '$x_k$'],
          rows: [['Tần số tương đối ($f$)', '$f_1$', '$f_2$', '$\\dots$', '$f_k$']],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Tổng các tần số tương đối bằng $100\\%$ (bằng $1$ nếu viết dưới dạng tỉ số). Khi chia không hết, ta làm tròn tần số tương đối (thường đến hàng phần mười của phần trăm); lúc đó tổng có thể lệch $100\\%$ một chút do làm tròn. Có thể ghép bảng tần số và bảng tần số tương đối thành một bảng.',
        },
        {
          type: 'p',
          text: 'Ví dụ, với điểm kiểm tra của $20$ học sinh có bảng tần số: điểm $5, 6, 7, 8, 9, 10$ ứng với tần số $1, 2, 5, 7, 3, 2$, ta tính $f = \\dfrac{m}{20} \\cdot 100\\%$:',
        },
        {
          type: 'table',
          head: ['Điểm ($x$)', '$5$', '$6$', '$7$', '$8$', '$9$', '$10$'],
          rows: [
            ['Tần số ($m$)', '$1$', '$2$', '$5$', '$7$', '$3$', '$2$'],
            [
              'Tần số tương đối ($f$)',
              '$5\\%$',
              '$10\\%$',
              '$25\\%$',
              '$35\\%$',
              '$15\\%$',
              '$10\\%$',
            ],
          ],
          caption: 'Tổng các tần số tương đối: $5 + 10 + 25 + 35 + 15 + 10 = 100$ (%).',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ý nghĩa',
          text: 'Tần số tương đối cho biết giá trị đó chiếm bao nhiêu phần của cả mẫu. Nhờ vậy ta so sánh được hai mẫu có cỡ khác nhau. Khi cỡ mẫu đủ lớn, tần số tương đối của một giá trị là một ước lượng cho xác suất xuất hiện của giá trị đó.',
        },
      ],
    },
    {
      heading: 'Biểu đồ tần số tương đối',
      blocks: [
        {
          type: 'p',
          text: 'Biểu đồ biểu diễn bảng tần số tương đối được gọi là biểu đồ tần số tương đối. Hai dạng thường dùng là dạng cột và dạng hình quạt tròn.',
        },
        {
          type: 'p',
          text: 'Biểu đồ tần số tương đối dạng cột: vẽ như biểu đồ tần số dạng cột, nhưng chiều cao cột tại giá trị $x_i$ là tần số tương đối $f_i$ (trục đứng chia theo %).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Biểu đồ hình quạt tròn',
          text: 'Hình tròn biểu diễn toàn bộ mẫu ($100\\%$). Giá trị $x_i$ được biểu diễn bởi một hình quạt có góc ở tâm $$\\alpha_i = 360^\\circ \\cdot f_i.$$ Ví dụ $f_i = 25\\%$ thì $\\alpha_i = 360^\\circ \\cdot 0{,}25 = 90^\\circ$.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Tính tần số tương đối $f_i$ của từng giá trị.',
            'Tính góc ở tâm $\\alpha_i = 360^\\circ \\cdot f_i$; kiểm tra tổng các góc bằng $360^\\circ$.',
            'Vẽ hình tròn, chia thành các hình quạt có góc ở tâm $\\alpha_i$; tô màu, ghi tỉ lệ phần trăm, chú giải và tên biểu đồ.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Chia tần số cho số giá trị khác nhau $k$ thay vì cho cỡ mẫu $n$. Quên nhân $100\\%$ hoặc nhân góc với tần số $m$ thay vì với $f$. Nhân mọi tần số với cùng một số thì mọi tần số tương đối không đổi: hai mẫu như vậy có cùng biểu đồ tần số tương đối.',
        },
      ],
    },
  ],
  explore: {
    title: 'Từ tần số đến tần số tương đối và biểu đồ quạt',
    instruction:
      'Chỉnh tần số của từng giá trị bằng nút − và +. Bảng tính lại tần số tương đối và góc ở tâm; chuyển giữa biểu đồ tần số, biểu đồ tần số tương đối dạng cột và dạng quạt tròn. Thử "Nhân đôi mọi tần số" để xem biểu đồ nào thay đổi.',
  },
  examples: [
    {
      problem:
        'Số anh chị em ruột của $30$ học sinh lớp 9A có bảng tần số: số anh chị em $0, 1, 2, 3$ ứng với tần số $8, 12, 6, 4$. Lập bảng tần số tương đối (làm tròn đến hàng phần mười) và tính góc ở tâm của các hình quạt khi vẽ biểu đồ hình quạt tròn.',
      steps: [
        'Cỡ mẫu $n = 8 + 12 + 6 + 4 = 30$.',
        '$f_1 = \\dfrac{8}{30} \\cdot 100\\% \\approx 26{,}7\\%$; $f_2 = \\dfrac{12}{30} \\cdot 100\\% = 40\\%$; $f_3 = \\dfrac{6}{30} \\cdot 100\\% = 20\\%$; $f_4 = \\dfrac{4}{30} \\cdot 100\\% \\approx 13{,}3\\%$.',
        'Góc ở tâm: $360^\\circ \\cdot \\dfrac{8}{30} = 96^\\circ$; $360^\\circ \\cdot \\dfrac{12}{30} = 144^\\circ$; $360^\\circ \\cdot \\dfrac{6}{30} = 72^\\circ$; $360^\\circ \\cdot \\dfrac{4}{30} = 48^\\circ$.',
        'Kiểm tra: $96^\\circ + 144^\\circ + 72^\\circ + 48^\\circ = 360^\\circ$.',
      ],
      answer:
        'Tần số tương đối: $26{,}7\\%$; $40\\%$; $20\\%$; $13{,}3\\%$. Góc ở tâm: $96^\\circ$; $144^\\circ$; $72^\\circ$; $48^\\circ$.',
    },
    {
      problem:
        'Biểu đồ hình quạt tròn về phương tiện đến trường của $40$ học sinh có bốn hình quạt: Đi bộ $54^\\circ$, Xe đạp $126^\\circ$, Xe buýt $72^\\circ$, Bố mẹ đưa $108^\\circ$. Lập bảng tần số tương đối và bảng tần số.',
      steps: [
        'Tần số tương đối $f = \\dfrac{\\alpha}{360^\\circ}$: Đi bộ $\\dfrac{54}{360} = 15\\%$; Xe đạp $\\dfrac{126}{360} = 35\\%$; Xe buýt $\\dfrac{72}{360} = 20\\%$; Bố mẹ đưa $\\dfrac{108}{360} = 30\\%$.',
        'Tần số $m = f \\cdot n$: $15\\% \\cdot 40 = 6$; $35\\% \\cdot 40 = 14$; $20\\% \\cdot 40 = 8$; $30\\% \\cdot 40 = 12$.',
        'Kiểm tra: $6 + 14 + 8 + 12 = 40$.',
      ],
      answer:
        'Tần số tương đối: $15\\%$, $35\\%$, $20\\%$, $30\\%$; tần số: $6$, $14$, $8$, $12$ học sinh.',
    },
    {
      problem:
        'Ở lớp 9A ($30$ học sinh) có $12$ bạn đi xe đạp đến trường, ở lớp 9B ($40$ học sinh) có $14$ bạn. Lớp nào có tỉ lệ học sinh đi xe đạp cao hơn?',
      steps: [
        'Lớp 9A: $f = \\dfrac{12}{30} \\cdot 100\\% = 40\\%$.',
        'Lớp 9B: $f = \\dfrac{14}{40} \\cdot 100\\% = 35\\%$.',
        'So sánh tần số tương đối: $40\\% > 35\\%$, dù tần số của lớp 9A ($12$) nhỏ hơn của lớp 9B ($14$).',
      ],
      answer: 'Lớp 9A có tỉ lệ học sinh đi xe đạp cao hơn.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Trong một mẫu gồm $36$ dữ liệu, giá trị $x$ xuất hiện $9$ lần. Tính tần số tương đối của $x$ (theo %).',
      answer: 25,
      unit: '%',
      hints: ['$f = \\dfrac{m}{n} \\cdot 100\\%$ với $m = 9$, $n = 36$.'],
      solution: '$f = \\dfrac{9}{36} \\cdot 100\\% = 25\\%$.',
    },
    {
      type: 'choice',
      prompt:
        'Tổng các tần số tương đối của một mẫu dữ liệu (viết dưới dạng phần trăm, chưa làm tròn) bằng',
      options: ['$100\\%$', 'cỡ mẫu $n$', 'số giá trị khác nhau $k$', '$360\\%$'],
      answer: 0,
      hints: [
        'Cộng $\\dfrac{m_1}{n} + \\dots + \\dfrac{m_k}{n}$, nhớ rằng $m_1 + \\dots + m_k = n$.',
      ],
      solution:
        '$f_1 + \\dots + f_k = \\dfrac{m_1 + \\dots + m_k}{n} \\cdot 100\\% = \\dfrac{n}{n} \\cdot 100\\% = 100\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Một giá trị có tần số $7$ trong mẫu cỡ $30$. Tính tần số tương đối của nó theo %, làm tròn đến hàng phần mười.',
      answer: 23.3,
      tolerance: 0.05,
      unit: '%',
      hints: ['Tính $\\dfrac{7}{30} \\cdot 100$ rồi làm tròn.'],
      solution: '$f = \\dfrac{7}{30} \\cdot 100\\% = 23{,}33\\ldots\\% \\approx 23{,}3\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Trong biểu đồ hình quạt tròn, giá trị $x$ có tần số tương đối $30\\%$. Tính góc ở tâm của hình quạt biểu diễn $x$ (theo độ).',
      answer: 108,
      unit: '°',
      hints: ['Góc ở tâm $= 360^\\circ \\cdot f$.'],
      solution: '$360^\\circ \\cdot 30\\% = 360^\\circ \\cdot 0{,}3 = 108^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Một mẫu có $40$ dữ liệu, giá trị $x$ có tần số tương đối $12{,}5\\%$. Tần số của $x$ là bao nhiêu?',
      answer: 5,
      hints: ['$m = f \\cdot n$.'],
      solution: '$m = 12{,}5\\% \\cdot 40 = 0{,}125 \\cdot 40 = 5$.',
    },
    {
      type: 'number',
      prompt:
        'Bảng tần số tương đối của một mẫu có bốn giá trị với tần số tương đối $20\\%$, $35\\%$, $15\\%$ và $f$. Tìm $f$ (theo %).',
      answer: 30,
      unit: '%',
      hints: ['Tổng các tần số tương đối bằng $100\\%$.'],
      solution: '$f = 100\\% - (20\\% + 35\\% + 15\\%) = 100\\% - 70\\% = 30\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ hình quạt tròn biểu diễn kết quả khảo sát $50$ người. Hình quạt ứng với câu trả lời "Đồng ý" có góc ở tâm $72^\\circ$. Có bao nhiêu người trả lời "Đồng ý"?',
      answer: 10,
      hints: [
        'Tần số tương đối $f = \\dfrac{72^\\circ}{360^\\circ}$.',
        'Số người $= f \\cdot 50$.',
      ],
      solution: '$f = \\dfrac{72}{360} = 0{,}2 = 20\\%$, nên số người là $0{,}2 \\cdot 50 = 10$.',
    },
    {
      type: 'number',
      prompt:
        'Một mẫu cỡ $40$ có bốn giá trị với tần số tương đối lần lượt là $10\\%$, $25\\%$, $40\\%$, $25\\%$. Tần số của giá trị thứ ba là bao nhiêu?',
      answer: 16,
      hints: ['$m = f \\cdot n$ với $f = 40\\%$.'],
      solution: '$m = 40\\% \\cdot 40 = 0{,}4 \\cdot 40 = 16$.',
    },
    {
      type: 'choice',
      prompt:
        'Muốn cho thấy mỗi loại chiếm bao nhiêu phần của toàn bộ mẫu, biểu đồ nào phù hợp nhất?',
      options: [
        'Biểu đồ tần số dạng đoạn thẳng',
        'Biểu đồ tần số tương đối dạng hình quạt tròn',
        'Biểu đồ tranh với mỗi biểu tượng ứng với $10$ dữ liệu',
        'Bảng tần số không cần biểu đồ',
      ],
      answer: 1,
      hints: ['Biểu đồ nào lấy cả hình tròn làm $100\\%$ của mẫu?'],
      solution:
        'Biểu đồ hình quạt tròn biểu diễn cả mẫu bằng một hình tròn, mỗi hình quạt là phần của một giá trị, nên thấy ngay tỉ lệ của từng loại so với toàn bộ.',
    },
  ],
  takeaways: [
    'Tần số tương đối: $f = \\dfrac{m}{n} \\cdot 100\\%$; tổng các tần số tương đối bằng $100\\%$.',
    'Biểu đồ tần số tương đối dạng cột: cột tại $x_i$ cao $f_i$.',
    'Biểu đồ hình quạt tròn: hình quạt của $x_i$ có góc ở tâm $360^\\circ \\cdot f_i$; ngược lại $f_i = \\dfrac{\\alpha_i}{360^\\circ}$ và $m_i = f_i \\cdot n$.',
  ],
};
