/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Phép thử ngẫu nhiên là hành động mà ta không biết trước kết quả nhưng liệt kê được mọi kết quả có thể; tập hợp các kết quả đó là không gian mẫu, mô tả bằng cách liệt kê, bằng bảng hoặc bằng sơ đồ cây.',
  intro:
    'Một cửa hàng muốn tặng quà cho $2$ trong $4$ khách hàng $A, B, C, D$. Họ bỏ $4$ lá phiếu ghi tên khách hàng vào hộp rồi rút lần lượt hai lá phiếu. Trước khi rút, không ai nói trước được hai khách hàng nào được chọn. Nhưng ta có thể liệt kê hết mọi khả năng xảy ra. Bài này cho ta cách làm việc đó một cách có hệ thống.',
  objectives: [
    'Nhận biết phép thử ngẫu nhiên và không gian mẫu của phép thử.',
    'Mô tả không gian mẫu bằng cách liệt kê, bằng bảng hoặc bằng sơ đồ cây.',
    'Đếm được số phần tử của không gian mẫu trong các phép thử đơn giản.',
  ],
  sections: [
    {
      heading: 'Phép thử ngẫu nhiên',
      blocks: [
        {
          type: 'p',
          text: 'Gieo một con xúc xắc, tung một đồng xu, rút một tấm thẻ từ hộp, chọn ngẫu nhiên một bạn trong lớp... Ở mỗi hành động đó, ta không biết trước kết quả, nhưng biết tất cả các kết quả có thể xảy ra.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Phép thử ngẫu nhiên',
          text: 'Phép thử ngẫu nhiên (gọi tắt là phép thử) là một hoặc một số hành động, thực nghiệm được tiến hành liên tiếp hay đồng thời mà kết quả của chúng không thể biết được trước khi thực hiện, nhưng có thể liệt kê được tất cả các kết quả có thể xảy ra.',
        },
        {
          type: 'list',
          items: [
            'Gieo một con xúc xắc là một phép thử: kết quả là số chấm xuất hiện, một trong các số $1, 2, 3, 4, 5, 6$.',
            'Gieo một con xúc xắc rồi tung một đồng xu cũng là một phép thử: hai hành động liên tiếp tạo thành một phép thử.',
            'Thả một viên bi sắt vào chậu nước không phải phép thử ngẫu nhiên: ta biết trước viên bi sẽ chìm.',
          ],
        },
      ],
    },
    {
      heading: 'Không gian mẫu',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Không gian mẫu',
          text: 'Tập hợp tất cả các kết quả có thể xảy ra của một phép thử gọi là không gian mẫu của phép thử đó, kí hiệu là $\\Omega$ (đọc là ô-mê-ga).',
        },
        {
          type: 'table',
          head: ['Phép thử', 'Không gian mẫu', 'Số phần tử'],
          rows: [
            ['Tung một đồng xu ($S$: sấp, $N$: ngửa)', '$\\Omega = \\{S;\\ N\\}$', '$2$'],
            ['Gieo một con xúc xắc', '$\\Omega = \\{1;\\ 2;\\ 3;\\ 4;\\ 5;\\ 6\\}$', '$6$'],
            ['Tung một đồng xu hai lần', '$\\Omega = \\{SS;\\ SN;\\ NS;\\ NN\\}$', '$4$'],
          ],
          caption: 'Một số phép thử và không gian mẫu của chúng.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thứ tự trong một kết quả',
          text: 'Khi phép thử gồm nhiều bước, mỗi kết quả ghi lần lượt kết quả của từng bước. Chẳng hạn khi tung đồng xu hai lần, $SN$ (lần đầu sấp, lần sau ngửa) và $NS$ là hai kết quả khác nhau. Khi gieo xúc xắc rồi tung đồng xu, kết quả "$4$ chấm, mặt ngửa" ghi là $(4, N)$.',
        },
      ],
    },
    {
      heading: 'Mô tả không gian mẫu bằng bảng và sơ đồ cây',
      blocks: [
        {
          type: 'p',
          text: 'Khi phép thử gồm hai bước, ta có thể kẻ bảng: mỗi hàng ứng với một kết quả của bước thứ nhất, mỗi cột ứng với một kết quả của bước thứ hai, mỗi ô là một kết quả của phép thử. Ví dụ, Lan gieo một con xúc xắc, Hòa tung một đồng xu:',
        },
        {
          type: 'table',
          head: ['Xúc xắc / Đồng xu', '$S$', '$N$'],
          rows: [
            ['$1$', '$(1, S)$', '$(1, N)$'],
            ['$2$', '$(2, S)$', '$(2, N)$'],
            ['$3$', '$(3, S)$', '$(3, N)$'],
            ['$4$', '$(4, S)$', '$(4, N)$'],
            ['$5$', '$(5, S)$', '$(5, N)$'],
            ['$6$', '$(6, S)$', '$(6, N)$'],
          ],
          caption: 'Bảng có $6$ hàng và $2$ cột, nên không gian mẫu có $6 \\cdot 2 = 12$ phần tử.',
        },
        {
          type: 'p',
          text: 'Với phép thử gồm nhiều bước liên tiếp, ta vẽ sơ đồ cây: từ gốc kẻ các nhánh ứng với kết quả của bước thứ nhất; từ đầu mỗi nhánh lại kẻ các nhánh ứng với kết quả của bước tiếp theo. Mỗi đường đi từ gốc đến ngọn là một kết quả của phép thử, nên số phần tử của không gian mẫu bằng số ngọn của cây.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Có trả lại hay không trả lại',
          text: 'Rút lần lượt hai tấm thẻ từ hộp có ba thẻ $1, 2, 3$. Nếu thẻ rút ra lần đầu không được trả lại hộp thì lần sau chỉ còn hai thẻ, các kết quả như $(2, 2)$ không thể xảy ra: không gian mẫu có $3 \\cdot 2 = 6$ phần tử. Nếu trả thẻ lại hộp thì có $3 \\cdot 3 = 9$ phần tử.',
        },
      ],
    },
  ],
  explore: {
    title: 'Mở dần sơ đồ cây và bảng',
    instruction:
      'Chọn một phép thử và đoán xem không gian mẫu có bao nhiêu phần tử. Bấm "Mở bước tiếp theo" để vẽ thêm các nhánh của từng bước; chuyển sang "Bảng" để xem cùng không gian mẫu dưới dạng bảng hai chiều. Khi cây đã mở hết, bấm "Thực hiện phép thử" vài lần: mỗi lần là một kết quả trong $\\Omega$, nhưng không biết trước là kết quả nào.',
  },
  examples: [
    {
      problem:
        'Trở lại tình huống mở đầu: rút lần lượt hai lá phiếu từ hộp có $4$ lá phiếu ghi tên khách hàng $A, B, C, D$ (lá rút ra không trả lại hộp). Mô tả không gian mẫu và cho biết nó có bao nhiêu phần tử.',
      steps: [
        'Mỗi kết quả là một cặp $(X, Y)$, trong đó $X$ là tên trên lá phiếu rút lần thứ nhất, $Y$ là tên trên lá phiếu rút lần thứ hai, $X \\ne Y$.',
        'Vẽ sơ đồ cây: lần thứ nhất có $4$ nhánh $A, B, C, D$; từ mỗi nhánh, lần thứ hai còn $3$ nhánh (ba tên còn lại).',
        'Đọc các đường đi từ gốc đến ngọn: $\\Omega = \\{(A, B);\\ (A, C);\\ (A, D);\\ (B, A);\\ (B, C);\\ (B, D);$ $(C, A);\\ (C, B);\\ (C, D);\\ (D, A);\\ (D, B);\\ (D, C)\\}$.',
        'Số ngọn của cây là $4 \\cdot 3 = 12$.',
      ],
      answer: 'Không gian mẫu có $12$ phần tử.',
    },
    {
      problem:
        'Gieo đồng thời hai con xúc xắc, một con màu xanh và một con màu đỏ. Mô tả không gian mẫu của phép thử.',
      steps: [
        'Kí hiệu $(i, j)$ là kết quả: con xúc xắc xanh xuất hiện $i$ chấm, con xúc xắc đỏ xuất hiện $j$ chấm, với $i, j \\in \\{1;\\ 2;\\ 3;\\ 4;\\ 5;\\ 6\\}$.',
        'Kẻ bảng $6$ hàng (ứng với $i$) và $6$ cột (ứng với $j$); ô ở hàng $i$, cột $j$ là kết quả $(i, j)$.',
        '$(1, 2)$ và $(2, 1)$ là hai kết quả khác nhau, vì hai con xúc xắc phân biệt được.',
        'Bảng có $6 \\cdot 6 = 36$ ô.',
      ],
      answer: '$\\Omega = \\{(i, j) \\mid i, j = 1, 2, 3, 4, 5, 6\\}$, gồm $36$ phần tử.',
    },
    {
      problem:
        'Hộp thứ nhất có $2$ viên bi: một viên xanh ($X$) và một viên đỏ ($\\text{Đ}$). Hộp thứ hai có $3$ viên bi: vàng ($V$), trắng ($T$) và hồng ($H$). Lấy ngẫu nhiên từ mỗi hộp một viên bi. Liệt kê các phần tử của không gian mẫu.',
      steps: [
        'Kết quả là cặp (màu bi lấy từ hộp thứ nhất, màu bi lấy từ hộp thứ hai).',
        'Sơ đồ cây: $2$ nhánh $X, \\text{Đ}$ cho hộp thứ nhất; từ mỗi nhánh có $3$ nhánh $V, T, H$ cho hộp thứ hai.',
        '$\\Omega = \\{(X, V);\\ (X, T);\\ (X, H);\\ (\\text{Đ}, V);\\ (\\text{Đ}, T);\\ (\\text{Đ}, H)\\}$.',
      ],
      answer: 'Không gian mẫu có $2 \\cdot 3 = 6$ phần tử.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Hoạt động nào sau đây không phải là phép thử ngẫu nhiên?',
      options: [
        'Gieo một con xúc xắc và ghi số chấm xuất hiện.',
        'Chọn ngẫu nhiên một bạn trong lớp và ghi tháng sinh của bạn đó.',
        'Thả một viên bi sắt vào chậu nước và xem viên bi chìm hay nổi.',
        'Rút ngẫu nhiên một tấm thẻ từ hộp có các thẻ ghi số $1$ đến $10$.',
      ],
      answer: 2,
      hints: ['Phép thử ngẫu nhiên là hành động mà ta không biết trước kết quả.'],
      solution:
        'Viên bi sắt chắc chắn chìm, ta biết trước kết quả, nên đó không phải phép thử ngẫu nhiên. Ba hoạt động còn lại đều không biết trước kết quả nhưng liệt kê được các kết quả có thể.',
    },
    {
      type: 'choice',
      prompt: 'Tung một đồng xu hai lần liên tiếp. Không gian mẫu của phép thử là',
      options: [
        '$\\Omega = \\{S;\\ N\\}$',
        '$\\Omega = \\{SS;\\ SN;\\ NN\\}$',
        '$\\Omega = \\{SS;\\ SN;\\ NS;\\ NN\\}$',
        '$\\Omega = \\{SN;\\ NS\\}$',
      ],
      answer: 2,
      hints: [
        'Kết quả ghi lần lượt mặt của lần thứ nhất rồi lần thứ hai.',
        '$SN$ và $NS$ có giống nhau không?',
      ],
      solution:
        'Lần thứ nhất có $2$ khả năng, mỗi khả năng đó lần thứ hai lại có $2$ khả năng: $\\Omega = \\{SS;\\ SN;\\ NS;\\ NN\\}$. $SN$ (sấp trước, ngửa sau) và $NS$ là hai kết quả khác nhau.',
    },
    {
      type: 'number',
      prompt: 'Tung một đồng xu ba lần liên tiếp. Không gian mẫu có bao nhiêu phần tử?',
      answer: 8,
      hints: ['Vẽ sơ đồ cây ba tầng, mỗi tầng tách mỗi nhánh thành $2$ nhánh.'],
      solution:
        'Sơ đồ cây có $2 \\cdot 2 \\cdot 2 = 8$ ngọn: $\\Omega = \\{SSS;\\ SSN;\\ SNS;\\ SNN;\\ NSS;\\ NSN;\\ NNS;\\ NNN\\}$.',
    },
    {
      type: 'multi',
      prompt:
        'Hộp có ba tấm thẻ ghi số $1, 2, 3$. Rút ngẫu nhiên lần lượt hai tấm thẻ, thẻ rút ra lần đầu không trả lại hộp. Kết quả $(a, b)$ nghĩa là thẻ thứ nhất ghi $a$, thẻ thứ hai ghi $b$. Chọn tất cả các kết quả thuộc không gian mẫu.',
      options: ['$(1, 1)$', '$(1, 2)$', '$(2, 1)$', '$(3, 3)$', '$(3, 2)$'],
      answers: [1, 2, 4],
      hints: ['Thẻ đã rút không còn trong hộp, nên hai số có thể bằng nhau không?'],
      solution:
        '$\\Omega = \\{(1, 2);\\ (1, 3);\\ (2, 1);\\ (2, 3);\\ (3, 1);\\ (3, 2)\\}$. Các kết quả $(1, 1)$ và $(3, 3)$ không thể xảy ra vì thẻ không được trả lại.',
    },
    {
      type: 'number',
      prompt:
        'Hộp có năm tấm thẻ ghi số $1, 2, 3, 4, 5$. Rút ngẫu nhiên lần lượt hai tấm thẻ, không trả lại thẻ đã rút. Không gian mẫu có bao nhiêu phần tử?',
      answer: 20,
      hints: [
        'Lần thứ nhất có $5$ cách.',
        'Sau khi rút một thẻ, lần thứ hai còn bao nhiêu thẻ trong hộp?',
      ],
      solution:
        'Sơ đồ cây có $5$ nhánh ở lần rút thứ nhất, từ mỗi nhánh có $4$ nhánh ở lần rút thứ hai. Không gian mẫu có $5 \\cdot 4 = 20$ phần tử.',
    },
    {
      type: 'number',
      prompt:
        'Hộp có bốn tấm thẻ ghi số $1, 2, 3, 4$. Rút ngẫu nhiên một thẻ, ghi số, trả thẻ lại hộp rồi rút ngẫu nhiên một thẻ nữa. Không gian mẫu có bao nhiêu phần tử?',
      answer: 16,
      hints: ['Thẻ được trả lại, nên lần thứ hai vẫn có đủ $4$ thẻ.'],
      solution:
        'Mỗi lần rút có $4$ kết quả, kể cả lần thứ hai. Bảng $4$ hàng, $4$ cột có $4 \\cdot 4 = 16$ ô, nên không gian mẫu có $16$ phần tử (có cả các kết quả như $(2, 2)$).',
    },
    {
      type: 'number',
      prompt:
        'Tổ $1$ có $5$ bạn. Cô giáo chọn ngẫu nhiên một bạn làm tổ trưởng, rồi chọn ngẫu nhiên một bạn khác làm tổ phó. Không gian mẫu của phép thử có bao nhiêu phần tử?',
      answer: 20,
      hints: [
        'Đây giống việc rút lần lượt hai thẻ không trả lại: tổ trưởng và tổ phó là hai bạn khác nhau.',
      ],
      solution:
        'Có $5$ cách chọn tổ trưởng; với mỗi cách đó còn $4$ cách chọn tổ phó. Không gian mẫu có $5 \\cdot 4 = 20$ phần tử.',
    },
    {
      type: 'number',
      prompt:
        'Thực đơn bữa trưa có $3$ món chính (cơm gà, bún bò, phở) và $2$ loại đồ uống (trà đá, nước cam). Một bạn chọn ngẫu nhiên một món chính và một loại đồ uống. Không gian mẫu có bao nhiêu phần tử?',
      answer: 6,
      hints: ['Kẻ bảng: mỗi hàng là một món chính, mỗi cột là một đồ uống.'],
      solution:
        'Bảng có $3$ hàng và $2$ cột, gồm $3 \\cdot 2 = 6$ ô, nên không gian mẫu có $6$ phần tử.',
    },
    {
      type: 'choice',
      prompt:
        'Một gia đình có hai con. Ghi giới tính lần lượt của con thứ nhất và con thứ hai ($T$: trai, $G$: gái). Không gian mẫu là',
      options: [
        '$\\{TT;\\ TG;\\ GG\\}$',
        '$\\{TT;\\ TG;\\ GT;\\ GG\\}$',
        '$\\{T;\\ G\\}$',
        '$\\{TG;\\ GT\\}$',
      ],
      answer: 1,
      hints: [
        'Con thứ nhất là trai, con thứ hai là gái khác với con thứ nhất là gái, con thứ hai là trai.',
      ],
      solution:
        'Có $2 \\cdot 2 = 4$ kết quả: $\\Omega = \\{TT;\\ TG;\\ GT;\\ GG\\}$; $TG$ và $GT$ là hai kết quả khác nhau vì có thứ tự con thứ nhất, con thứ hai.',
    },
  ],
  takeaways: [
    'Phép thử ngẫu nhiên: không biết trước kết quả, nhưng liệt kê được mọi kết quả có thể.',
    'Không gian mẫu $\\Omega$ là tập hợp tất cả các kết quả có thể của phép thử.',
    'Phép thử hai bước: mô tả $\\Omega$ bằng bảng; nhiều bước: dùng sơ đồ cây, mỗi đường từ gốc đến ngọn là một kết quả.',
    'Chú ý thứ tự trong một kết quả, và chú ý rút "có trả lại" hay "không trả lại".',
  ],
};
