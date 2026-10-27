/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Ôn tập cuối năm Toán 8: đa thức, hằng đẳng thức, phân thức, phương trình và hàm số bậc nhất, tứ giác, định lí Thalès, tam giác đồng dạng, hình chóp đều, dữ liệu và xác suất, kèm đề ôn thích ứng hỏi thêm ở phần còn yếu.',
  intro:
    'Năm lớp 8, em đã học tính toán với đa thức và phân thức, bảy hằng đẳng thức đáng nhớ, phương trình bậc nhất một ẩn, hàm số bậc nhất; về hình học là các loại tứ giác, định lí Thalès, tam giác đồng dạng, định lí Pythagore và hình chóp đều; cuối cùng là dữ liệu, biểu đồ và xác suất của biến cố. Bài ôn tập này hệ thống lại các mạch kiến thức đó, giải mẫu những dạng bài tổng hợp và cho em làm một đề ôn tự điều chỉnh: phần nào em làm sai, đề sẽ hỏi thêm phần đó.',
  objectives: [
    'Thực hiện các phép tính với đa thức, vận dụng hằng đẳng thức để tính nhanh và phân tích đa thức thành nhân tử.',
    'Rút gọn, cộng, trừ, nhân, chia phân thức và tìm điều kiện xác định của phân thức.',
    'Giải phương trình bậc nhất một ẩn và giải bài toán bằng cách lập phương trình.',
    'Xác định hàm số bậc nhất, hệ số góc, vị trí của hai đường thẳng và tọa độ giao điểm với các trục.',
    'Vận dụng tính chất các tứ giác, định lí Thalès, đường trung bình, đường phân giác, tam giác đồng dạng và định lí Pythagore.',
    'Tính diện tích xung quanh và thể tích của hình chóp tam giác đều, hình chóp tứ giác đều.',
    'Phân loại dữ liệu, đọc biểu đồ, tính xác suất bằng tỉ số và ước lượng xác suất bằng xác suất thực nghiệm.',
  ],
  sections: [
    {
      heading: 'Đại số: đa thức, phân thức, phương trình và hàm số',
      blocks: [
        {
          type: 'table',
          caption: 'Những điều cần nhớ',
          head: ['Chủ đề', 'Kiến thức chính'],
          rows: [
            [
              'Đa thức',
              'Bậc của đơn thức là tổng số mũ của các biến; bậc của đa thức thu gọn là bậc cao nhất của các hạng tử. Nhân đa thức: nhân mỗi hạng tử của đa thức này với từng hạng tử của đa thức kia rồi thu gọn.',
            ],
            [
              'Phân tích thành nhân tử',
              'Đặt nhân tử chung, dùng hằng đẳng thức, nhóm hạng tử. Ví dụ $x^3 - 4x = x(x^2 - 4) = x(x - 2)(x + 2)$.',
            ],
            [
              'Phân thức',
              '$\\dfrac{A}{B}$ xác định khi $B \\ne 0$. Rút gọn: phân tích tử và mẫu thành nhân tử rồi chia cả hai cho nhân tử chung. Cộng, trừ: quy đồng mẫu thức. Nhân: $\\dfrac{A}{B} \\cdot \\dfrac{C}{D} = \\dfrac{AC}{BD}$; chia: $\\dfrac{A}{B} : \\dfrac{C}{D} = \\dfrac{A}{B} \\cdot \\dfrac{D}{C}$ ($\\dfrac{C}{D} \\ne 0$).',
            ],
            [
              'Phương trình bậc nhất',
              '$ax + b = 0$ ($a \\ne 0$) có nghiệm duy nhất $x = -\\dfrac{b}{a}$. Dùng quy tắc chuyển vế và quy tắc nhân để đưa về dạng $ax = c$.',
            ],
            [
              'Hàm số bậc nhất',
              "$y = ax + b$ ($a \\ne 0$), đồ thị là một đường thẳng cắt trục tung tại $(0; b)$; $a$ là hệ số góc. Hai đường thẳng $y = ax + b$ và $y = a'x + b'$ song song khi $a = a'$, $b \\ne b'$; cắt nhau khi $a \\ne a'$.",
            ],
          ],
        },
        { type: 'p', text: 'Bảy hằng đẳng thức đáng nhớ (với $A$, $B$ là các biểu thức):' },
        {
          type: 'list',
          ordered: true,
          items: [
            '$(A + B)^2 = A^2 + 2AB + B^2$',
            '$(A - B)^2 = A^2 - 2AB + B^2$',
            '$A^2 - B^2 = (A - B)(A + B)$',
            '$(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$',
            '$(A - B)^3 = A^3 - 3A^2B + 3AB^2 - B^3$',
            '$A^3 + B^3 = (A + B)(A^2 - AB + B^2)$',
            '$A^3 - B^3 = (A - B)(A^2 + AB + B^2)$',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Rút gọn phân thức chỉ được chia cho một nhân tử chung của cả tử và mẫu, không được "gạch" một hạng tử: $\\dfrac{x + 3}{x}$ không bằng $3$. Khi giải bài toán bằng cách lập phương trình, nhớ đặt điều kiện cho ẩn và đối chiếu nghiệm với điều kiện đó.',
        },
      ],
    },
    {
      heading: 'Hình học và đo lường',
      blocks: [
        {
          type: 'table',
          caption: 'Những điều cần nhớ',
          head: ['Chủ đề', 'Kiến thức chính'],
          rows: [
            [
              'Tứ giác',
              'Tổng các góc của một tứ giác bằng $360^\\circ$. Hình thang cân: hai góc kề một đáy bằng nhau, hai đường chéo bằng nhau. Hình bình hành: các cạnh đối bằng nhau, các góc đối bằng nhau, hai đường chéo cắt nhau tại trung điểm mỗi đường. Hình chữ nhật: hai đường chéo bằng nhau; hình thoi: hai đường chéo vuông góc; hình vuông có cả hai tính chất.',
            ],
            [
              'Định lí Thalès',
              'Nếu $MN \\parallel BC$ ($M \\in AB$, $N \\in AC$) thì $\\dfrac{AM}{AB} = \\dfrac{AN}{AC}$, $\\dfrac{AM}{MB} = \\dfrac{AN}{NC}$ và $\\dfrac{MN}{BC} = \\dfrac{AM}{AB}$. Đường trung bình song song với cạnh thứ ba và bằng nửa cạnh ấy. Phân giác $AD$: $\\dfrac{DB}{DC} = \\dfrac{AB}{AC}$.',
            ],
            [
              'Tam giác đồng dạng',
              'Ba trường hợp: cạnh - cạnh - cạnh, cạnh - góc - cạnh, góc - góc. Hai tam giác đồng dạng có các góc tương ứng bằng nhau và các cạnh tương ứng tỉ lệ.',
            ],
            [
              'Định lí Pythagore',
              'Tam giác $ABC$ vuông tại $A$ thì $BC^2 = AB^2 + AC^2$; ngược lại, nếu $BC^2 = AB^2 + AC^2$ thì tam giác vuông tại $A$.',
            ],
            [
              'Hình chóp đều',
              'Hình chóp tam giác đều, tứ giác đều: $S_{xq} = p \\cdot d$ ($p$ là nửa chu vi đáy, $d$ là trung đoạn); $V = \\dfrac{1}{3} S \\cdot h$ ($S$ là diện tích đáy, $h$ là chiều cao).',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đo chiều cao bằng bóng nắng',
          text: 'Cùng một thời điểm, tia nắng song song nên tam giác tạo bởi một cái cọc, bóng của nó và tia nắng đồng dạng với tam giác tạo bởi cái cây, bóng cây và tia nắng. Vì vậy $\\dfrac{\\text{chiều cao cây}}{\\text{bóng cây}} = \\dfrac{\\text{chiều cao cọc}}{\\text{bóng cọc}}$.',
        },
      ],
    },
    {
      heading: 'Dữ liệu, biểu đồ và xác suất',
      blocks: [
        {
          type: 'list',
          items: [
            'Dữ liệu định lượng là dữ liệu số (chiều cao, điểm số, số anh chị em); dữ liệu định tính không phải là số (màu sắc, môn học yêu thích).',
            'Chọn biểu đồ theo mục đích: biểu đồ cột hoặc cột kép để so sánh, biểu đồ đoạn thẳng để thấy xu hướng theo thời gian, biểu đồ hình quạt tròn để thấy tỉ lệ của từng phần trong toàn thể.',
            'Khi các kết quả có thể là đồng khả năng, xác suất của biến cố $E$ bằng tỉ số giữa số kết quả thuận lợi cho $E$ và tổng số kết quả có thể.',
            'Nếu trong $n$ lần thực nghiệm biến cố $E$ xảy ra $k$ lần thì xác suất thực nghiệm của $E$ là $\\dfrac{k}{n}$; khi $n$ đủ lớn, $P(E) \\approx \\dfrac{k}{n}$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ví dụ nhanh',
          text: 'Một túi có $3$ viên bi đỏ và $5$ viên bi xanh cùng kích thước. Lấy ngẫu nhiên một viên: có $8$ kết quả đồng khả năng, $3$ kết quả thuận lợi cho biến cố "lấy được bi đỏ", nên xác suất của biến cố đó là $\\dfrac{3}{8}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Đề ôn tập thích ứng',
    instruction:
      'Đề có $18$ câu. Mười một câu đầu lấy mỗi chương một câu; từ câu thứ mười hai, đề ưu tiên chọn câu ở phần em đã làm sai (ô ghi rõ vì sao chọn câu đó). Nhập số nguyên, số thập phân (dùng dấu phẩy, ví dụ $22{,}5$) hoặc phân số dạng $7/3$. Sai lần đầu, em được gợi ý và làm lại; sai lần hai, em xem lời giải từng bước. Bản đồ kĩ năng chấm theo lần làm đầu.',
  },
  examples: [
    {
      problem:
        'Rút gọn biểu thức $A = (x + 2)^2 - (x - 2)(x + 2)$ rồi tính giá trị của $A$ tại $x = -\\dfrac{1}{2}$.',
      steps: [
        'Dùng hằng đẳng thức: $(x + 2)^2 = x^2 + 4x + 4$ và $(x - 2)(x + 2) = x^2 - 4$.',
        '$A = x^2 + 4x + 4 - (x^2 - 4) = x^2 + 4x + 4 - x^2 + 4 = 4x + 8$.',
        'Tại $x = -\\dfrac{1}{2}$: $A = 4 \\cdot \\left(-\\dfrac{1}{2}\\right) + 8 = -2 + 8 = 6$.',
      ],
      answer: '$A = 4x + 8$; tại $x = -\\dfrac{1}{2}$ thì $A = 6$.',
    },
    {
      problem:
        'Cho biểu thức $P = \\dfrac{2}{x + 3} + \\dfrac{1}{x - 3} - \\dfrac{6}{x^2 - 9}$. Tìm điều kiện xác định, rút gọn $P$ và tính giá trị của $P$ tại $x = 1$.',
      steps: [
        '$x^2 - 9 = (x - 3)(x + 3)$, nên $P$ xác định khi $x \\ne 3$ và $x \\ne -3$. Mẫu thức chung là $(x - 3)(x + 3)$.',
        '$P = \\dfrac{2(x - 3) + (x + 3) - 6}{(x - 3)(x + 3)} = \\dfrac{2x - 6 + x + 3 - 6}{(x - 3)(x + 3)} = \\dfrac{3x - 9}{(x - 3)(x + 3)}$.',
        '$P = \\dfrac{3(x - 3)}{(x - 3)(x + 3)} = \\dfrac{3}{x + 3}$.',
        '$x = 1$ thỏa mãn điều kiện, nên $P = \\dfrac{3}{1 + 3} = \\dfrac{3}{4}$.',
      ],
      answer:
        'Điều kiện $x \\ne \\pm 3$; $P = \\dfrac{3}{x + 3}$; tại $x = 1$ thì $P = \\dfrac{3}{4}$.',
    },
    {
      problem:
        'Một người đi xe máy từ $A$ đến $B$ với vận tốc $40$ km/h. Lúc về, người đó đi với vận tốc $30$ km/h nên thời gian về nhiều hơn thời gian đi $30$ phút. Tính quãng đường $AB$.',
      steps: [
        'Gọi quãng đường $AB$ là $x$ (km), $x > 0$. Thời gian đi là $\\dfrac{x}{40}$ giờ, thời gian về là $\\dfrac{x}{30}$ giờ; $30$ phút $= \\dfrac{1}{2}$ giờ.',
        'Ta có phương trình $\\dfrac{x}{30} - \\dfrac{x}{40} = \\dfrac{1}{2}$.',
        'Quy đồng mẫu $120$: $\\dfrac{4x - 3x}{120} = \\dfrac{60}{120}$, nên $x = 60$ (thỏa mãn điều kiện).',
      ],
      answer: 'Quãng đường $AB$ dài $60$ km.',
    },
    {
      problem:
        'Cho hàm số bậc nhất $y = (m - 1)x + 3$. Tìm $m$ để đồ thị của hàm số song song với đường thẳng $y = 2x - 1$. Với $m$ vừa tìm được, tìm tọa độ giao điểm của đồ thị với hai trục tọa độ.',
      steps: [
        'Hai đường thẳng song song khi hệ số góc bằng nhau và tung độ gốc khác nhau: $m - 1 = 2$ và $3 \\ne -1$. Vậy $m = 3$.',
        'Khi đó $y = 2x + 3$. Cho $x = 0$ thì $y = 3$: đồ thị cắt trục tung tại $(0; 3)$.',
        'Cho $y = 0$ thì $2x + 3 = 0$, $x = -\\dfrac{3}{2}$: đồ thị cắt trục hoành tại $\\left(-\\dfrac{3}{2}; 0\\right)$.',
      ],
      answer:
        '$m = 3$; đồ thị $y = 2x + 3$ cắt trục tung tại $(0; 3)$ và trục hoành tại $\\left(-\\dfrac{3}{2}; 0\\right)$.',
    },
    {
      problem:
        'Cho tam giác $ABC$ vuông tại $A$ có $AB = 6$ cm, $AC = 8$ cm, đường cao $AH$. Chứng minh $\\Delta HBA \\backsim \\Delta ABC$, rồi tính $BC$, $BH$ và $AH$.',
      steps: [
        'Định lí Pythagore: $BC^2 = AB^2 + AC^2 = 36 + 64 = 100$, nên $BC = 10$ cm.',
        '$\\Delta HBA$ và $\\Delta ABC$ có $\\widehat{B}$ chung và $\\widehat{BHA} = \\widehat{BAC} = 90^\\circ$, nên $\\Delta HBA \\backsim \\Delta ABC$ (g.g).',
        'Suy ra $\\dfrac{HB}{AB} = \\dfrac{BA}{BC} = \\dfrac{HA}{AC}$, tức là $\\dfrac{HB}{6} = \\dfrac{6}{10} = \\dfrac{HA}{8}$.',
        '$HB = \\dfrac{6 \\cdot 6}{10} = 3{,}6$ (cm); $HA = \\dfrac{6 \\cdot 8}{10} = 4{,}8$ (cm).',
      ],
      answer: '$BC = 10$ cm, $BH = 3{,}6$ cm, $AH = 4{,}8$ cm.',
    },
    {
      problem:
        'Một hộp có $30$ viên bi đỏ và xanh cùng kích thước. Bạn Lan lấy ngẫu nhiên một viên, ghi màu rồi trả lại hộp. Lặp lại $100$ lần, Lan thấy có $40$ lần lấy được bi đỏ. Hãy ước lượng số bi đỏ trong hộp.',
      steps: [
        'Xác suất thực nghiệm của biến cố "lấy được bi đỏ" là $\\dfrac{40}{100} = \\dfrac{2}{5}$.',
        'Xác suất của biến cố đó bằng $\\dfrac{\\text{số bi đỏ}}{30}$, nên $\\dfrac{\\text{số bi đỏ}}{30} \\approx \\dfrac{2}{5}$.',
        'Số bi đỏ $\\approx 30 \\cdot \\dfrac{2}{5} = 12$.',
      ],
      answer: 'Trong hộp có khoảng $12$ viên bi đỏ.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Khai triển $(2x - 3)^2$ ta được',
      options: ['$4x^2 - 12x + 9$', '$4x^2 - 6x + 9$', '$2x^2 - 12x + 9$', '$4x^2 + 9$'],
      answer: 0,
      hints: [
        'Dùng $(A - B)^2 = A^2 - 2AB + B^2$ với $A = 2x$, $B = 3$.',
        'Đừng quên bình phương cả hệ số $2$ và hạng tử $-2AB$.',
      ],
      solution: '$(2x - 3)^2 = (2x)^2 - 2 \\cdot 2x \\cdot 3 + 3^2 = 4x^2 - 12x + 9$.',
    },
    {
      type: 'choice',
      prompt: 'Phân tích đa thức $x^2 - 6x + 9 - y^2$ thành nhân tử, ta được',
      options: [
        '$(x - 3 - y)(x - 3 + y)$',
        '$(x - 3 - y)^2$',
        '$(x + 3 - y)(x + 3 + y)$',
        '$(x - y)(x + y) - 9$',
      ],
      answer: 0,
      hints: [
        'Nhóm ba hạng tử đầu: $x^2 - 6x + 9$ là một bình phương.',
        'Sau đó dùng hiệu hai bình phương $A^2 - B^2 = (A - B)(A + B)$.',
      ],
      solution: '$x^2 - 6x + 9 - y^2 = (x - 3)^2 - y^2 = (x - 3 - y)(x - 3 + y)$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $x^3 + 3x^2 + 3x + 1$ tại $x = 99$.',
      answer: 1000000,
      hints: ['Biểu thức có dạng lập phương của một tổng.', '$x^3 + 3x^2 + 3x + 1 = (x + 1)^3$.'],
      solution:
        '$x^3 + 3x^2 + 3x + 1 = (x + 1)^3$. Tại $x = 99$: $(99 + 1)^3 = 100^3 = 1\\,000\\,000$.',
    },
    {
      type: 'fraction',
      prompt:
        'Rút gọn phân thức $\\dfrac{x^2 - 1}{x^2 + 2x + 1}$ rồi tính giá trị của nó tại $x = 3$. Viết kết quả dưới dạng phân số tối giản.',
      answer: [1, 2],
      simplest: true,
      hints: [
        'Tử thức là hiệu hai bình phương, mẫu thức là bình phương của một tổng.',
        'Sau khi chia cả tử và mẫu cho $x + 1$, thay $x = 3$.',
      ],
      solution:
        '$\\dfrac{x^2 - 1}{x^2 + 2x + 1} = \\dfrac{(x - 1)(x + 1)}{(x + 1)^2} = \\dfrac{x - 1}{x + 1}$ (với $x \\ne -1$). Tại $x = 3$: $\\dfrac{3 - 1}{3 + 1} = \\dfrac{2}{4} = \\dfrac{1}{2}$.',
    },
    {
      type: 'number',
      prompt: 'Giải phương trình $3(x - 2) - 2(x + 1) = 5$.',
      answer: 13,
      hints: ['Bỏ ngoặc, chú ý dấu trừ trước ngoặc thứ hai.', 'Thu gọn vế trái rồi chuyển vế.'],
      solution: '$3x - 6 - 2x - 2 = 5$, nên $x - 8 = 5$, do đó $x = 13$.',
    },
    {
      type: 'number',
      prompt:
        'Hai lớp 8A và 8B có tất cả $80$ học sinh. Nếu chuyển $2$ học sinh từ lớp 8A sang lớp 8B thì số học sinh hai lớp bằng nhau. Lớp 8A có bao nhiêu học sinh?',
      answer: 42,
      hints: [
        'Gọi số học sinh lớp 8A là $x$ ($x$ nguyên dương, $x < 80$); lớp 8B có $80 - x$ học sinh.',
        'Sau khi chuyển: lớp 8A còn $x - 2$, lớp 8B có $80 - x + 2$.',
      ],
      solution:
        'Ta có phương trình $x - 2 = 80 - x + 2$, nên $2x = 84$, $x = 42$ (thỏa mãn). Lớp 8A có $42$ học sinh.',
    },
    {
      type: 'choice',
      prompt: 'Đường thẳng nào sau đây song song với đường thẳng $y = -2x + 1$?',
      options: ['$y = 2x + 1$', '$y = -2x + 3$', '$y = x - 2$', '$y = 1 - 2x$'],
      answer: 1,
      hints: [
        "Hai đường thẳng $y = ax + b$ và $y = a'x + b'$ song song khi $a = a'$ và $b \\ne b'$.",
        'Viết lại $y = 1 - 2x$ dưới dạng $y = ax + b$ rồi so sánh.',
      ],
      solution:
        '$y = -2x + 3$ có $a = -2$ và $b = 3 \\ne 1$ nên song song. $y = 1 - 2x = -2x + 1$ trùng với đường thẳng đã cho; hai đường còn lại có hệ số góc khác $-2$ nên cắt nhau với nó.',
    },
    {
      type: 'number',
      prompt: 'Tìm hệ số góc của đường thẳng $y = 3 - 5x$.',
      answer: -5,
      hints: ['Viết lại dưới dạng $y = ax + b$; hệ số góc là $a$.'],
      solution: '$y = 3 - 5x = -5x + 3$, nên hệ số góc là $a = -5$.',
    },
    {
      type: 'number',
      prompt:
        'Hình bình hành $ABCD$ có $\\widehat{A} - \\widehat{B} = 40^\\circ$. Tính số đo góc $A$ (độ).',
      answer: 110,
      unit: '°',
      hints: [
        'Hai góc kề một cạnh của hình bình hành có tổng bằng $180^\\circ$.',
        'Biết tổng và hiệu của $\\widehat{A}$ và $\\widehat{B}$.',
      ],
      solution:
        '$\\widehat{A} + \\widehat{B} = 180^\\circ$ và $\\widehat{A} - \\widehat{B} = 40^\\circ$, nên $\\widehat{A} = (180^\\circ + 40^\\circ) : 2 = 110^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $D \\in AB$, $E \\in AC$ và $DE \\parallel BC$. Biết $AD = 4$ cm, $DB = 6$ cm, $BC = 15$ cm. Tính $DE$ (cm).',
      answer: 6,
      unit: 'cm',
      hints: ['Hệ quả của định lí Thalès: $\\dfrac{DE}{BC} = \\dfrac{AD}{AB}$.', '$AB = AD + DB$.'],
      solution:
        '$AB = 4 + 6 = 10$ (cm). $DE \\parallel BC$ nên $\\dfrac{DE}{BC} = \\dfrac{AD}{AB} = \\dfrac{4}{10}$, suy ra $DE = 15 \\cdot \\dfrac{4}{10} = 6$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Một chiếc thang dài $6{,}5$ m dựa vào tường thẳng đứng, chân thang cách chân tường $2{,}5$ m. Đỉnh thang cách mặt đất bao nhiêu mét?',
      answer: 6,
      unit: 'm',
      hints: [
        'Thang, tường và mặt đất tạo thành một tam giác vuông; thang là cạnh huyền.',
        'Tính $6{,}5^2 - 2{,}5^2$ rồi lấy căn bậc hai.',
      ],
      solution: '$h^2 = 6{,}5^2 - 2{,}5^2 = 42{,}25 - 6{,}25 = 36$, nên $h = 6$ m.',
    },
    {
      type: 'number',
      prompt:
        'Một mái lều dạng hình chóp tứ giác đều có cạnh đáy $10$ m và chiều cao $12$ m. Tính diện tích xung quanh của mái lều ($\\text{m}^2$).',
      answer: 260,
      hints: [
        'Trung đoạn là cạnh huyền của tam giác vuông có một cạnh là chiều cao, cạnh kia bằng nửa cạnh đáy.',
        '$S_{xq} = p \\cdot d$ với $p$ là nửa chu vi đáy.',
      ],
      solution:
        'Trung đoạn $d$: $d^2 = 12^2 + 5^2 = 169$, nên $d = 13$ m. Nửa chu vi đáy $p = 4 \\cdot 10 : 2 = 20$ m. $S_{xq} = 20 \\cdot 13 = 260\\ (\\text{m}^2)$.',
    },
    {
      type: 'number',
      prompt:
        'Một hình chóp tứ giác đều có cạnh đáy $10$ m và chiều cao $12$ m. Tính thể tích của nó ($\\text{m}^3$).',
      answer: 400,
      hints: ['$V = \\dfrac{1}{3} S \\cdot h$, đáy là hình vuông cạnh $10$ m.'],
      solution:
        '$S = 10^2 = 100\\ (\\text{m}^2)$; $V = \\dfrac{1}{3} \\cdot 100 \\cdot 12 = 400\\ (\\text{m}^3)$.',
    },
    {
      type: 'multi',
      prompt: 'Những dữ liệu nào sau đây là dữ liệu định lượng?',
      options: [
        'Chiều cao (cm) của các bạn trong lớp',
        'Môn học yêu thích của các bạn',
        'Số anh chị em ruột của mỗi bạn',
        'Màu sắc yêu thích của các bạn',
      ],
      answers: [0, 2],
      hints: ['Dữ liệu định lượng là dữ liệu được biểu diễn bằng số.'],
      solution:
        'Chiều cao và số anh chị em là các số nên là dữ liệu định lượng; môn học và màu sắc yêu thích không phải số nên là dữ liệu định tính.',
    },
    {
      type: 'fraction',
      prompt:
        'Chọn ngẫu nhiên một số tự nhiên có hai chữ số. Tính xác suất để số được chọn chia hết cho $9$ (phân số tối giản).',
      answer: [1, 9],
      simplest: true,
      hints: [
        'Có bao nhiêu số tự nhiên có hai chữ số? Đếm từ $10$ đến $99$.',
        'Các số có hai chữ số chia hết cho $9$ là $18, 27, \\ldots, 99$.',
      ],
      solution:
        'Có $99 - 10 + 1 = 90$ kết quả đồng khả năng. Các số chia hết cho $9$ là $18, 27, 36, 45, 54, 63, 72, 81, 90, 99$, gồm $10$ số. Xác suất là $\\dfrac{10}{90} = \\dfrac{1}{9}$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi biểu thức với dạng khai triển hoặc phân tích đúng của nó.',
      left: ['$A^2 - B^2$', '$(A + B)^3$', '$A^3 - B^3$'],
      right: [
        '$(A - B)(A + B)$',
        '$A^3 + 3A^2B + 3AB^2 + B^3$',
        '$(A - B)(A^2 + AB + B^2)$',
        '$(A - B)(A^2 - AB + B^2)$',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: [
        'Hiệu hai lập phương có thừa số thứ hai là "bình phương thiếu của tổng": $A^2 + AB + B^2$.',
      ],
      solution:
        '$A^2 - B^2 = (A - B)(A + B)$; $(A + B)^3 = A^3 + 3A^2B + 3AB^2 + B^3$; $A^3 - B^3 = (A - B)(A^2 + AB + B^2)$. Biểu thức $(A - B)(A^2 - AB + B^2)$ không phải hằng đẳng thức nào trong bảy hằng đẳng thức.',
    },
  ],
  takeaways: [
    'Bảy hằng đẳng thức đáng nhớ giúp tính nhanh, rút gọn biểu thức và phân tích đa thức thành nhân tử.',
    'Phân thức $\\dfrac{A}{B}$ chỉ xác định khi $B \\ne 0$; rút gọn bằng cách chia tử và mẫu cho nhân tử chung.',
    'Giải bài toán bằng cách lập phương trình: chọn ẩn và điều kiện, lập phương trình, giải, đối chiếu điều kiện rồi trả lời.',
    "Đồ thị $y = ax + b$ ($a \\ne 0$) là đường thẳng có hệ số góc $a$; song song khi $a = a'$, $b \\ne b'$.",
    'Định lí Thalès, đường trung bình, tính chất đường phân giác và tam giác đồng dạng đều dẫn tới các tỉ số bằng nhau giữa các đoạn thẳng.',
    'Hình chóp đều: $S_{xq} = p \\cdot d$, $V = \\dfrac{1}{3} S \\cdot h$.',
    'Xác suất bằng số kết quả thuận lợi chia cho số kết quả có thể (khi đồng khả năng); xác suất thực nghiệm $\\dfrac{k}{n}$ dùng để ước lượng xác suất.',
  ],
};
