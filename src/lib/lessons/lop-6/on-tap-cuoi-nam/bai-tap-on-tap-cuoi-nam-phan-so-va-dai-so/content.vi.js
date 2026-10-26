/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm Toán 6 phần Số và đại số: số tự nhiên, lũy thừa, tính chia hết, ƯCLN và BCNN, số nguyên, phân số, số thập phân và tỉ số phần trăm, kèm đề ôn thích ứng chọn câu theo phần còn yếu.',
  intro:
    'Cả năm lớp 6, em đã đi từ tập hợp các số tự nhiên đến số nguyên, phân số và số thập phân. Bài ôn tập này nhắc lại những quy tắc quan trọng nhất của phần Số và đại số, giải mẫu các bài toán tổng hợp như trong sách và cho em làm một đề ôn tự điều chỉnh: phần nào em làm sai, đề sẽ hỏi thêm phần đó.',
  objectives: [
    'Hệ thống hoá kiến thức về số tự nhiên, số nguyên, phân số và số thập phân.',
    'Vận dụng dấu hiệu chia hết, ƯCLN, BCNN để giải bài toán thực tế.',
    'Tính giá trị biểu thức đúng thứ tự, tính hợp lí khi có thể.',
    'Giải các bài toán về phân số, số thập phân và tỉ số phần trăm.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức phần Số và đại số',
      blocks: [
        {
          type: 'table',
          caption: 'Những điều cần nhớ',
          head: ['Chủ đề', 'Kiến thức chính'],
          rows: [
            [
              'Số tự nhiên',
              'Thứ tự thực hiện phép tính: trong ngoặc trước; lũy thừa, rồi nhân và chia, rồi cộng và trừ. $a^m \\cdot a^n = a^{m+n}$; $a^m : a^n = a^{m-n}$ ($a \\ne 0$, $m \\ge n$).',
            ],
            [
              'Tính chia hết',
              'Dấu hiệu chia hết cho $2, 5$ (chữ số tận cùng) và cho $3, 9$ (tổng các chữ số). Số nguyên tố chỉ có hai ước là $1$ và chính nó. ƯCLN lấy thừa số chung với số mũ nhỏ nhất; BCNN lấy thừa số chung và riêng với số mũ lớn nhất.',
            ],
            [
              'Số nguyên',
              'Cộng hai số cùng dấu: cộng phần số tự nhiên rồi giữ dấu; khác dấu: lấy hiệu, dấu của số có phần số tự nhiên lớn hơn. $a - b = a + (-b)$. Bỏ ngoặc có dấu "$-$" đằng trước thì đổi dấu các số hạng trong ngoặc.',
            ],
            [
              'Phân số',
              'Quy đồng mẫu rồi cộng, trừ tử. $\\dfrac{a}{b} \\cdot \\dfrac{c}{d} = \\dfrac{a \\cdot c}{b \\cdot d}$; $\\dfrac{a}{b} : \\dfrac{c}{d} = \\dfrac{a}{b} \\cdot \\dfrac{d}{c}$. Giá trị phân số $\\dfrac{m}{n}$ của $b$ là $b \\cdot \\dfrac{m}{n}$; một số mà $\\dfrac{m}{n}$ của nó bằng $a$ là $a : \\dfrac{m}{n}$.',
            ],
            [
              'Số thập phân',
              'Tính như với số nguyên rồi đặt dấu phẩy đúng chỗ. Làm tròn: chữ số ngay sau hàng làm tròn từ $5$ trở lên thì cộng $1$ vào hàng làm tròn. $p\\%$ của $a$ là $a \\cdot \\dfrac{p}{100}$; tỉ số phần trăm của $a$ và $b$ là $\\dfrac{a \\cdot 100}{b}\\%$.',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tính hợp lí',
          text: 'Trước khi tính, hãy nhìn xem có thể dùng tính chất giao hoán, kết hợp hay phân phối của phép nhân đối với phép cộng không: $a \\cdot b + a \\cdot c = a \\cdot (b + c)$. Cách này đúng với số tự nhiên, số nguyên, phân số và số thập phân.',
        },
      ],
    },
    {
      heading: 'Các dạng bài thường gặp',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Tính giá trị biểu thức, tính hợp lí; phân tích kết quả ra thừa số nguyên tố.',
            'Tìm $x$ trong một đẳng thức: coi phần chứa $x$ là số hạng, thừa số hay số bị chia chưa biết.',
            'Bài toán chia hết: "xếp hàng thừa $r$ người" thì số người trừ $r$ là bội chung; "chia đều nhiều nhất" thì dùng ƯCLN.',
            'Hai bài toán về phân số: tìm giá trị phân số của một số và tìm một số biết giá trị phân số của nó.',
            'Tỉ số phần trăm: giảm giá, lãi suất, phần trăm học sinh, năng suất.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Tính từ trái sang phải mà quên nhân trước cộng sau; quên đổi dấu khi bỏ ngoặc có dấu "$-$"; cộng tử với tử, mẫu với mẫu khi cộng hai phân số. Kết quả phân số phải rút gọn về phân số tối giản.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đề ôn tập thích ứng',
    instruction:
      'Đề có $12$ câu. Năm câu đầu lấy mỗi phần một câu; từ câu thứ sáu, đề chọn thêm câu ở phần em đã làm sai (ô ghi rõ vì sao chọn câu đó). Nhập số nguyên, số thập phân (dùng dấu phẩy, ví dụ $3{,}75$) hoặc phân số dạng $5/6$. Sai lần đầu, em được gợi ý và làm lại; bản đồ kĩ năng chấm theo lần làm đầu.',
  },
  examples: [
    {
      problem:
        'Một buổi lễ có khoảng từ $2\\,000$ đến $3\\,000$ người tham dự. Nếu xếp mỗi hàng $7$ người, $8$ người, $9$ người hay $10$ người thì đều thừa $6$ người. Tính chính xác số người tham dự buổi lễ.',
      steps: [
        'Gọi số người là $n$. Bớt $6$ người thì xếp vừa đủ hàng $7, 8, 9, 10$, nên $n - 6$ là bội chung của $7, 8, 9, 10$.',
        '$7 = 7$; $8 = 2^3$; $9 = 3^2$; $10 = 2 \\cdot 5$, nên $\\text{BCNN}(7, 8, 9, 10) = 2^3 \\cdot 3^2 \\cdot 5 \\cdot 7 = 2\\,520$.',
        '$n - 6 \\in \\{0;\\ 2\\,520;\\ 5\\,040;\\ \\ldots\\}$. Vì $2\\,000 \\le n \\le 3\\,000$ nên $n - 6 = 2\\,520$.',
        '$n = 2\\,520 + 6 = 2\\,526$.',
      ],
      answer: 'Có $2\\,526$ người tham dự buổi lễ.',
    },
    {
      problem:
        'Bốn thửa ruộng thu hoạch được tất cả $10{,}5$ tấn thóc. Thửa thứ nhất được $0{,}2$ tổng số thóc, thửa thứ hai được $15\\%$ tổng số thóc, thửa thứ ba được $\\dfrac{2}{7}$ tổng số thóc. Tính khối lượng thóc thu được ở thửa thứ tư.',
      steps: [
        'Thửa thứ nhất: $10{,}5 \\cdot 0{,}2 = 2{,}1$ (tấn).',
        'Thửa thứ hai: $10{,}5 \\cdot \\dfrac{15}{100} = 1{,}575$ (tấn).',
        'Thửa thứ ba: $10{,}5 \\cdot \\dfrac{2}{7} = 3$ (tấn).',
        'Thửa thứ tư: $10{,}5 - (2{,}1 + 1{,}575 + 3) = 10{,}5 - 6{,}675 = 3{,}825$ (tấn).',
      ],
      answer: 'Thửa thứ tư thu được $3{,}825$ tấn thóc.',
    },
    {
      problem:
        'Một người bán một tấm vải. Ngày thứ nhất bán $25\\%$ tấm vải và $15$ m; ngày thứ hai bán $\\dfrac{1}{3}$ số vải còn lại; cuối cùng còn $28$ m. Hỏi tấm vải dài bao nhiêu mét?',
      steps: [
        'Gọi số vải còn sau ngày thứ nhất là $R$ (m). Ngày thứ hai bán $\\dfrac{1}{3}R$, còn lại $\\dfrac{2}{3}R = 28$, nên $R = 28 : \\dfrac{2}{3} = 42$ (m).',
        'Gọi chiều dài tấm vải là $L$ (m). Sau ngày thứ nhất còn $L - \\dfrac{1}{4}L - 15 = \\dfrac{3}{4}L - 15 = 42$.',
        '$\\dfrac{3}{4}L = 57$, nên $L = 57 : \\dfrac{3}{4} = 76$ (m).',
        'Thử lại: ngày đầu bán $19 + 15 = 34$ m, còn $42$ m; ngày sau bán $14$ m, còn $28$ m.',
      ],
      answer: 'Tấm vải dài $76$ m.',
    },
    {
      problem:
        'Tính hợp lí: $\\dfrac{-5}{7} \\cdot \\dfrac{2}{11} + \\dfrac{-5}{7} \\cdot \\dfrac{9}{11} + 1\\dfrac{5}{7}$.',
      steps: [
        'Dùng tính chất phân phối: $\\dfrac{-5}{7} \\cdot \\left(\\dfrac{2}{11} + \\dfrac{9}{11}\\right) = \\dfrac{-5}{7} \\cdot 1 = \\dfrac{-5}{7}$.',
        'Đổi hỗn số: $1\\dfrac{5}{7} = \\dfrac{12}{7}$.',
        '$\\dfrac{-5}{7} + \\dfrac{12}{7} = \\dfrac{7}{7} = 1$.',
      ],
      answer: 'Giá trị của biểu thức là $1$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Có bao nhiêu số tự nhiên có sáu chữ số khác nhau mà hai chữ số đứng cạnh nhau luôn là hai số tự nhiên liên tiếp?',
      answer: 9,
      hints: [
        'Các chữ số khác nhau và hai chữ số cạnh nhau hơn kém nhau $1$, nên các chữ số phải tăng dần hoặc giảm dần liên tiếp.',
        'Liệt kê các số tăng dần ($123\\,456, \\ldots$) và giảm dần ($543\\,210, \\ldots$); nhớ chữ số đầu tiên phải khác $0$.',
      ],
      solution:
        'Tăng dần: $123\\,456;\\ 234\\,567;\\ 345\\,678;\\ 456\\,789$ ($012\\,345$ không phải số có sáu chữ số). Giảm dần: $543\\,210;\\ 654\\,321;\\ 765\\,432;\\ 876\\,543;\\ 987\\,654$. Có $4 + 5 = 9$ số.',
    },
    {
      type: 'number',
      prompt:
        'An mua một bộ sách và trả vừa đủ bằng $2$ tờ $100$ nghìn đồng, $4$ tờ $10$ nghìn đồng và $6$ tờ $1$ nghìn đồng. Bộ sách giá bao nhiêu nghìn đồng?',
      answer: 246,
      unit: 'nghìn đồng',
      hints: ['Mỗi loại tờ tiền ứng với một hàng: trăm nghìn, chục nghìn, nghìn.'],
      solution:
        'Giá bộ sách: $2 \\cdot 100 + 4 \\cdot 10 + 6 \\cdot 1 = 246$ (nghìn đồng), tức $246\\,000$ đồng. Số tờ tiền mỗi loại chính là chữ số ở hàng tương ứng.',
    },
    {
      type: 'choice',
      prompt:
        'Tính $3^2 \\cdot 4 + 2^3 \\cdot 5$ rồi phân tích kết quả ra thừa số nguyên tố. Kết quả là',
      options: ['$2^2 \\cdot 19$', '$4 \\cdot 19$', '$2^3 \\cdot 19$', '$2 \\cdot 38$'],
      answer: 0,
      hints: [
        'Lũy thừa trước, nhân sau, cộng cuối cùng.',
        'Khi phân tích ra thừa số nguyên tố, mọi thừa số phải là số nguyên tố ($4$ và $38$ không phải).',
      ],
      solution:
        '$3^2 \\cdot 4 + 2^3 \\cdot 5 = 9 \\cdot 4 + 8 \\cdot 5 = 36 + 40 = 76 = 2^2 \\cdot 19$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các số chia hết cho cả $3$ và $5$.',
      options: ['$1\\,230$', '$4\\,525$', '$2\\,085$', '$3\\,456$', '$7\\,140$'],
      answers: [0, 2, 4],
      hints: [
        'Chia hết cho $5$: chữ số tận cùng là $0$ hoặc $5$.',
        'Chia hết cho $3$: tổng các chữ số chia hết cho $3$.',
      ],
      solution:
        '$1\\,230$: tận cùng $0$, tổng $6$ — chọn. $4\\,525$: tổng $16$ không chia hết cho $3$. $2\\,085$: tận cùng $5$, tổng $15$ — chọn. $3\\,456$: tận cùng $6$ không chia hết cho $5$. $7\\,140$: tận cùng $0$, tổng $12$ — chọn.',
    },
    {
      type: 'choice',
      prompt: 'Số nào sau đây là số nguyên tố?',
      options: ['$51$', '$57$', '$59$', '$91$'],
      answer: 2,
      hints: ['Thử chia cho các số nguyên tố $2, 3, 5, 7$ (vì $7^2 = 49 < 59 < 64 = 8^2$).'],
      solution:
        '$51 = 3 \\cdot 17$, $57 = 3 \\cdot 19$, $91 = 7 \\cdot 13$ đều là hợp số. $59$ không chia hết cho $2, 3, 5, 7$ nên là số nguyên tố.',
    },
    {
      type: 'number',
      prompt:
        'Số học sinh của một trường trong khoảng từ $200$ đến $400$. Khi xếp hàng $12$, hàng $15$, hàng $18$ đều thừa $5$ học sinh. Trường có bao nhiêu học sinh?',
      answer: 365,
      unit: 'học sinh',
      hints: [
        'Số học sinh bớt đi $5$ là bội chung của $12, 15, 18$.',
        '$\\text{BCNN}(12, 15, 18) = 2^2 \\cdot 3^2 \\cdot 5$.',
      ],
      solution:
        '$\\text{BCNN}(12, 15, 18) = 180$. Số học sinh trừ $5$ thuộc $\\{0;\\ 180;\\ 360;\\ 540;\\ \\ldots\\}$. Vì số học sinh từ $200$ đến $400$ nên số đó là $360 + 5 = 365$.',
    },
    {
      type: 'number',
      prompt: 'Tính: $(-3{,}25) \\cdot 4 + 13{,}5 : 0{,}5$.',
      answer: 14,
      hints: ['Nhân và chia trước, cộng sau.', 'Chia cho $0{,}5$ cũng là nhân với $2$.'],
      solution: '$(-3{,}25) \\cdot 4 = -13$; $13{,}5 : 0{,}5 = 27$; $-13 + 27 = 14$.',
    },
    {
      type: 'number',
      prompt: 'Tính hợp lí: $(-37) \\cdot 45 + (-37) \\cdot 55$.',
      answer: -3700,
      hints: ['Đặt thừa số chung $-37$ ra ngoài: $a \\cdot b + a \\cdot c = a \\cdot (b + c)$.'],
      solution: '$(-37) \\cdot (45 + 55) = (-37) \\cdot 100 = -3\\,700$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tìm $x$, biết: $x : \\dfrac{3}{4} = \\dfrac{-2}{9}$. Viết kết quả dưới dạng phân số tối giản.',
      answer: [-1, 6],
      simplest: true,
      hints: ['Số bị chia bằng thương nhân với số chia.'],
      solution: '$x = \\dfrac{-2}{9} \\cdot \\dfrac{3}{4} = \\dfrac{-6}{36} = \\dfrac{-1}{6}$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các số sau theo thứ tự tăng dần.',
      items: ['$0{,}7$', '$-\\dfrac{3}{4}$', '$0$', '$-1{,}5$', '$\\dfrac{2}{3}$'],
      answer: [3, 1, 2, 4, 0],
      hints: [
        'Số âm luôn nhỏ hơn $0$, số dương luôn lớn hơn $0$.',
        'Viết các phân số dưới dạng số thập phân: $-\\dfrac{3}{4} = -0{,}75$; $\\dfrac{2}{3} \\approx 0{,}67$.',
      ],
      solution:
        '$-1{,}5 < -0{,}75 < 0 < 0{,}67 < 0{,}7$, nên thứ tự là $-1{,}5;\\ -\\dfrac{3}{4};\\ 0;\\ \\dfrac{2}{3};\\ 0{,}7$.',
    },
    {
      type: 'number',
      prompt:
        'Một trường có $1\\,200$ học sinh, trong đó $45\\%$ là học sinh nữ. Trường có bao nhiêu học sinh nam?',
      answer: 660,
      unit: 'học sinh',
      hints: ['Học sinh nam chiếm $100\\% - 45\\%$ số học sinh của trường.'],
      solution: 'Học sinh nam chiếm $55\\%$: $1\\,200 \\cdot \\dfrac{55}{100} = 660$ (học sinh).',
    },
    {
      type: 'number',
      prompt:
        'Một người bán một tấm vải: ngày thứ nhất bán $\\dfrac{1}{4}$ tấm vải và $10$ m; ngày thứ hai bán $\\dfrac{2}{5}$ số vải còn lại; cuối cùng còn $30$ m. Tấm vải dài bao nhiêu mét?',
      answer: 80,
      unit: 'm',
      hints: [
        'Đi ngược từ cuối: $30$ m ứng với $1 - \\dfrac{2}{5} = \\dfrac{3}{5}$ số vải còn sau ngày thứ nhất.',
        'Sau ngày thứ nhất còn $\\dfrac{3}{4}$ tấm vải bớt đi $10$ m.',
      ],
      solution:
        'Sau ngày thứ nhất còn $30 : \\dfrac{3}{5} = 50$ (m). Khi đó $\\dfrac{3}{4}L - 10 = 50$, nên $\\dfrac{3}{4}L = 60$ và $L = 60 : \\dfrac{3}{4} = 80$ (m).',
    },
  ],
  takeaways: [
    'Thứ tự thực hiện phép tính: ngoặc, lũy thừa, nhân chia, cộng trừ.',
    '"Xếp hàng thừa $r$" thì số đó trừ $r$ là bội chung; dùng BCNN để tìm.',
    'Bỏ ngoặc có dấu "$-$" đằng trước thì đổi dấu mọi số hạng trong ngoặc.',
    'Giá trị $\\dfrac{m}{n}$ của $b$ là $b \\cdot \\dfrac{m}{n}$; biết $\\dfrac{m}{n}$ của một số là $a$ thì số đó là $a : \\dfrac{m}{n}$.',
    '$p\\%$ của $a$ là $a \\cdot \\dfrac{p}{100}$; kết quả phân số luôn rút gọn đến tối giản.',
  ],
};
