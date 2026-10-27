/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ghép nhóm số liệu thành các nhóm [a; b), lập bảng tần số và bảng tần số tương đối ghép nhóm, giá trị đại diện của nhóm và biểu đồ tần số tương đối ghép nhóm dạng cột, dạng đoạn thẳng.',
  intro:
    'Chiều cao của $40$ học sinh khối 9 gần như không trùng nhau: $150$ cm, $152$ cm, $153$ cm,... Nếu lập bảng tần số như Bài 22, bảng sẽ dài gần bằng chính dãy số liệu và hầu hết các tần số chỉ là $1$ hay $2$. Khi đó ta chia số liệu thành các nhóm, chẳng hạn "từ $160$ cm đến dưới $165$ cm", rồi đếm số học sinh trong mỗi nhóm.',
  objectives: [
    'Ghép nhóm số liệu theo các nhóm $[a; b)$ và xác định độ dài nhóm.',
    'Lập bảng tần số ghép nhóm và bảng tần số tương đối ghép nhóm.',
    'Tính giá trị đại diện của nhóm; vẽ và đọc biểu đồ tần số tương đối ghép nhóm dạng cột và dạng đoạn thẳng.',
  ],
  sections: [
    {
      heading: 'Ghép nhóm số liệu. Bảng tần số ghép nhóm',
      blocks: [
        {
          type: 'p',
          text: 'Khi mẫu số liệu có nhiều giá trị khác nhau (thường gặp với số đo như chiều cao, cân nặng, thời gian), ta chia các giá trị thành các nhóm liên tiếp có dạng $$[a_1; a_2),\\ [a_2; a_3),\\ \\dots,\\ [a_k; a_{k+1}).$$',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Nhóm số liệu',
          text: 'Nhóm $[a; b)$ gồm các giá trị $x$ thỏa mãn $a \\le x < b$: chứa đầu mút trái $a$, không chứa đầu mút phải $b$. Hiệu $b - a$ là độ dài của nhóm. Số dữ liệu của mẫu thuộc nhóm $[a_i; a_{i+1})$ là tần số $m_i$ của nhóm đó.',
        },
        {
          type: 'p',
          text: 'Bảng thống kê tần số của các nhóm được gọi là bảng tần số ghép nhóm:',
        },
        {
          type: 'table',
          head: ['Nhóm', '$[a_1; a_2)$', '$[a_2; a_3)$', '$\\dots$', '$[a_k; a_{k+1})$'],
          rows: [['Tần số ($m$)', '$m_1$', '$m_2$', '$\\dots$', '$m_k$']],
          caption: 'Cỡ mẫu $n = m_1 + m_2 + \\dots + m_k$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Các nhóm thường có độ dài bằng nhau và phải chứa hết mọi dữ liệu. Dữ liệu nằm đúng đầu mút chung thuộc nhóm bắt đầu bằng nó: số $50$ thuộc nhóm $[50; 55)$, không thuộc $[45; 50)$.',
        },
      ],
    },
    {
      heading: 'Bảng tần số tương đối ghép nhóm',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tần số tương đối của nhóm',
          text: 'Tần số tương đối $f_i$ của nhóm $[a_i; a_{i+1})$ là tỉ số giữa tần số $m_i$ của nhóm và cỡ mẫu $n$: $$f_i = \\dfrac{m_i}{n} \\cdot 100\\%.$$',
        },
        {
          type: 'table',
          head: ['Nhóm', '$[a_1; a_2)$', '$[a_2; a_3)$', '$\\dots$', '$[a_k; a_{k+1})$'],
          rows: [['Tần số tương đối ($f$)', '$f_1$', '$f_2$', '$\\dots$', '$f_k$']],
          caption: 'Bảng tần số tương đối ghép nhóm; tổng các $f_i$ bằng $100\\%$.',
        },
        {
          type: 'p',
          text: 'Ví dụ, cân nặng (kg) của $20$ học sinh: 45; 52; 48; 50; 57; 43; 49; 51; 55; 46; 53; 47; 50; 44; 58; 52; 49; 54; 41; 51. Ghép thành bốn nhóm độ dài $5$ kg, ta được:',
        },
        {
          type: 'table',
          head: ['Cân nặng (kg)', '$[40; 45)$', '$[45; 50)$', '$[50; 55)$', '$[55; 60)$'],
          rows: [
            ['Tần số ($m$)', '$3$', '$6$', '$8$', '$3$'],
            ['Tần số tương đối ($f$)', '$15\\%$', '$30\\%$', '$40\\%$', '$15\\%$'],
          ],
          caption:
            '$n = 3 + 6 + 8 + 3 = 20$; chẳng hạn $f_3 = \\dfrac{8}{20} \\cdot 100\\% = 40\\%$.',
        },
      ],
    },
    {
      heading: 'Biểu đồ tần số tương đối ghép nhóm',
      blocks: [
        {
          type: 'p',
          text: 'Dạng cột (còn gọi là tổ chức đồ, histogram): trên trục ngang đánh dấu các đầu mút của các nhóm; mỗi nhóm $[a_i; a_{i+1})$ được biểu diễn bởi một cột có đáy là đoạn từ $a_i$ đến $a_{i+1}$ và chiều cao bằng $f_i$. Các cột vẽ liền nhau, vì các nhóm nối tiếp nhau không có khoảng trống.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Giá trị đại diện',
          text: 'Giá trị đại diện của nhóm $[a_i; a_{i+1})$ là trung điểm của nhóm: $$x_i = \\dfrac{a_i + a_{i+1}}{2}.$$',
        },
        {
          type: 'p',
          text: 'Dạng đoạn thẳng: tính giá trị đại diện $x_i$ của các nhóm, đánh dấu các điểm $(x_1; f_1), (x_2; f_2), \\dots, (x_k; f_k)$ rồi nối liên tiếp chúng bằng các đoạn thẳng.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Thay tần số tương đối $f_i$ bằng tần số $m_i$, ta được biểu đồ tần số ghép nhóm (dạng cột hoặc dạng đoạn thẳng). Cách ghép nhóm ảnh hưởng đến hình dạng biểu đồ: nhóm quá hẹp thì biểu đồ lởm chởm, nhóm quá rộng thì mất chi tiết.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Xếp một dữ liệu bằng đầu mút phải vào nhóm bên trái (số $50$ vào $[45; 50)$). Lấy đầu mút trái làm giá trị đại diện thay cho trung điểm. Vẽ các cột của biểu đồ ghép nhóm tách rời nhau.',
        },
      ],
    },
  ],
  explore: {
    title: 'Ghép nhóm với độ dài khác nhau',
    instruction:
      'Chọn độ dài nhóm để ghép chiều cao của $40$ học sinh (mỗi chấm xám là một bạn). Biểu đồ và bảng vẽ lại theo cách ghép mới. Chuyển trục đứng giữa tần số và tần số tương đối, bật dạng đoạn thẳng, và bấm vào một cột để xem nhóm đó.',
  },
  examples: [
    {
      problem:
        'Cân nặng (kg) của $20$ học sinh: 45; 52; 48; 50; 57; 43; 49; 51; 55; 46; 53; 47; 50; 44; 58; 52; 49; 54; 41; 51. Lập bảng tần số ghép nhóm với các nhóm $[40; 45)$, $[45; 50)$, $[50; 55)$, $[55; 60)$.',
      steps: [
        'Nhóm $[40; 45)$ gồm $43, 44, 41$: tần số $3$.',
        'Nhóm $[45; 50)$ gồm $45, 48, 49, 46, 47, 49$: tần số $6$ (số $45$ thuộc nhóm này vì $45 \\le 45 < 50$).',
        'Nhóm $[50; 55)$ gồm $52, 50, 51, 53, 50, 52, 54, 51$: tần số $8$ (hai số $50$ thuộc nhóm này, không thuộc $[45; 50)$).',
        'Nhóm $[55; 60)$ gồm $57, 55, 58$: tần số $3$. Kiểm tra: $3 + 6 + 8 + 3 = 20$.',
      ],
      answer: 'Các nhóm $[40; 45)$, $[45; 50)$, $[50; 55)$, $[55; 60)$ có tần số $3, 6, 8, 3$.',
    },
    {
      problem:
        'Thời gian (phút) đi từ nhà đến trường của $30$ học sinh có bảng tần số ghép nhóm: $[0; 10)$: $6$; $[10; 20)$: $12$; $[20; 30)$: $9$; $[30; 40)$: $3$. Lập bảng tần số tương đối ghép nhóm và xác định các điểm cần đánh dấu khi vẽ biểu đồ dạng đoạn thẳng.',
      steps: [
        '$f_1 = \\dfrac{6}{30} \\cdot 100\\% = 20\\%$, $f_2 = \\dfrac{12}{30} \\cdot 100\\% = 40\\%$, $f_3 = \\dfrac{9}{30} \\cdot 100\\% = 30\\%$, $f_4 = \\dfrac{3}{30} \\cdot 100\\% = 10\\%$.',
        'Giá trị đại diện: $\\dfrac{0 + 10}{2} = 5$, $\\dfrac{10 + 20}{2} = 15$, $\\dfrac{20 + 30}{2} = 25$, $\\dfrac{30 + 40}{2} = 35$.',
        'Các điểm cần đánh dấu là $(5; 20)$, $(15; 40)$, $(25; 30)$, $(35; 10)$ (tung độ tính theo %), rồi nối liên tiếp chúng.',
      ],
      answer:
        'Tần số tương đối $20\\%$, $40\\%$, $30\\%$, $10\\%$; biểu đồ đoạn thẳng đi qua $(5; 20)$, $(15; 40)$, $(25; 30)$, $(35; 10)$.',
    },
    {
      problem:
        'Với bảng ở Ví dụ 2, có bao nhiêu phần trăm học sinh mất dưới $20$ phút để đến trường?',
      steps: [
        'Thời gian dưới $20$ phút gồm hai nhóm $[0; 10)$ và $[10; 20)$.',
        'Cộng tần số tương đối của hai nhóm: $20\\% + 40\\% = 60\\%$.',
      ],
      answer: '$60\\%$ số học sinh mất dưới $20$ phút để đến trường.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Khi ghép nhóm $[45; 50)$, $[50; 55)$, dữ liệu $50$ thuộc nhóm nào?',
      options: ['$[45; 50)$', '$[50; 55)$', 'Cả hai nhóm', 'Không thuộc nhóm nào'],
      answer: 1,
      hints: ['Nhóm $[a; b)$ chứa $a$ nhưng không chứa $b$.'],
      solution:
        '$50 \\le 50 < 55$ nên $50$ thuộc $[50; 55)$; $50$ không thuộc $[45; 50)$ vì $50 < 50$ sai.',
    },
    {
      type: 'number',
      prompt:
        'Thời gian (phút) hoàn thành bài tập của $12$ học sinh: 23; 31; 18; 27; 30; 25; 34; 20; 29; 22; 35; 26. Tìm tần số của nhóm $[25; 30)$.',
      answer: 4,
      hints: ['Đếm các số $x$ với $25 \\le x < 30$; chú ý số $30$.'],
      solution:
        'Các số thuộc $[25; 30)$ là $27, 25, 29, 26$, nên tần số bằng $4$. Số $30$ thuộc nhóm $[30; 35)$.',
    },
    {
      type: 'number',
      prompt: 'Tìm giá trị đại diện của nhóm $[20; 25)$.',
      answer: 22.5,
      hints: ['Giá trị đại diện là trung điểm của nhóm.'],
      solution: '$\\dfrac{20 + 25}{2} = 22{,}5$.',
    },
    {
      type: 'number',
      prompt:
        'Số liệu nằm trong khoảng từ $150$ cm đến dưới $180$ cm được ghép thành các nhóm có cùng độ dài $5$ cm, bắt đầu từ $[150; 155)$. Có bao nhiêu nhóm?',
      answer: 6,
      hints: ['Chia độ dài cả khoảng cho độ dài một nhóm.'],
      solution:
        '$(180 - 150) : 5 = 6$ nhóm: $[150; 155)$, $[155; 160)$, $[160; 165)$, $[165; 170)$, $[170; 175)$, $[175; 180)$.',
    },
    {
      type: 'number',
      prompt:
        'Bảng tần số ghép nhóm thời gian đến trường của $30$ học sinh: $[0; 10)$: $6$; $[10; 20)$: $12$; $[20; 30)$: $9$; $[30; 40)$: $3$. Tính tần số tương đối của nhóm $[20; 30)$ (theo %).',
      answer: 30,
      unit: '%',
      hints: ['$f = \\dfrac{m}{n} \\cdot 100\\%$ với $m = 9$, $n = 30$.'],
      solution: '$f = \\dfrac{9}{30} \\cdot 100\\% = 30\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Một mẫu cỡ $50$ được ghép thành bốn nhóm có tần số lần lượt là $8$, $15$, $m$, $10$. Tìm $m$.',
      answer: 17,
      hints: ['Tổng các tần số bằng cỡ mẫu.'],
      solution: '$8 + 15 + m + 10 = 50 \\Rightarrow m = 50 - 33 = 17$.',
    },
    {
      type: 'number',
      prompt:
        'Với bảng cân nặng của $20$ học sinh ($[40; 45)$: $3$; $[45; 50)$: $6$; $[50; 55)$: $8$; $[55; 60)$: $3$), có bao nhiêu học sinh nặng từ $50$ kg trở lên?',
      answer: 11,
      hints: ['"Từ $50$ kg trở lên" gồm những nhóm nào?'],
      solution: 'Hai nhóm $[50; 55)$ và $[55; 60)$: $8 + 3 = 11$ học sinh.',
    },
    {
      type: 'number',
      prompt:
        'Khi vẽ biểu đồ tần số tương đối ghép nhóm dạng đoạn thẳng, nhóm $[158; 161)$ có tần số tương đối $30\\%$ được biểu diễn bởi một điểm. Hoành độ của điểm đó bằng bao nhiêu?',
      answer: 159.5,
      hints: ['Hoành độ là giá trị đại diện của nhóm.'],
      solution:
        'Giá trị đại diện $\\dfrac{158 + 161}{2} = 159{,}5$, nên điểm cần vẽ là $(159{,}5; 30)$ và hoành độ bằng $159{,}5$.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào đúng về biểu đồ tần số tương đối ghép nhóm dạng cột?',
      options: [
        'Các cột vẽ cách nhau, mỗi cột đặt tại giá trị đại diện.',
        'Các cột vẽ liền nhau, mỗi cột có đáy là một nhóm và chiều cao bằng tần số tương đối của nhóm.',
        'Chiều cao mỗi cột bằng độ dài của nhóm.',
        'Mỗi cột ứng với một dữ liệu của mẫu.',
      ],
      answer: 1,
      hints: ['Các nhóm $[a_1; a_2), [a_2; a_3), \\dots$ nối tiếp nhau trên trục số.'],
      solution:
        'Các nhóm nối tiếp nhau nên các cột vẽ liền nhau; đáy cột là đoạn $[a_i; a_{i+1}]$ trên trục ngang, chiều cao cột bằng $f_i$.',
    },
  ],
  takeaways: [
    'Nhóm $[a; b)$ gồm các giá trị $a \\le x < b$; độ dài nhóm là $b - a$; dữ liệu bằng đầu mút chung thuộc nhóm bên phải.',
    'Bảng tần số ghép nhóm ghi tần số $m_i$ của từng nhóm; tần số tương đối $f_i = \\dfrac{m_i}{n} \\cdot 100\\%$.',
    'Giá trị đại diện $x_i = \\dfrac{a_i + a_{i+1}}{2}$. Biểu đồ dạng cột: các cột liền nhau cao $f_i$; dạng đoạn thẳng: nối các điểm $(x_i; f_i)$.',
  ],
};
