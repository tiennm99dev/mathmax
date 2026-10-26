/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Làm quen với xác suất của biến cố: xác suất là số từ 0 đến 1 đo khả năng xảy ra, biến cố chắc chắn có xác suất 1, biến cố không thể có xác suất 0, và k biến cố đồng khả năng thì mỗi biến cố có xác suất 1/k.',
  intro:
    'Người ta thường nói "Nhiều khả năng ngày mai trời sẽ mưa" hay "Ít khả năng gieo hai con xúc xắc đều được mặt $6$ chấm". Để so sánh khả năng xảy ra của các biến cố cho chính xác, ta dùng một con số: xác suất của biến cố.',
  objectives: [
    'Hiểu xác suất của biến cố là con số từ $0$ đến $1$ đo khả năng xảy ra của biến cố.',
    'Biết xác suất của biến cố chắc chắn bằng $1$, của biến cố không thể bằng $0$.',
    'Tính xác suất trong một số trò chơi đơn giản có các kết quả đồng khả năng và so sánh xác suất của các biến cố.',
  ],
  sections: [
    {
      heading: 'Xác suất của biến cố',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Xác suất của biến cố',
          text: 'Để thể hiện khả năng xảy ra của một biến cố, người ta dùng một con số có giá trị từ $0$ đến $1$, gọi là xác suất của biến cố. Xác suất của biến cố $A$ được kí hiệu là $P(A)$.',
        },
        {
          type: 'list',
          items: [
            'Biến cố có khả năng xảy ra càng cao thì xác suất của nó càng lớn (càng gần $1$).',
            'Biến cố chắc chắn có xác suất bằng $1$.',
            'Biến cố không thể có xác suất bằng $0$.',
            'Biến cố ngẫu nhiên có xác suất lớn hơn $0$ và nhỏ hơn $1$.',
          ],
        },
        {
          type: 'tex',
          tex: '0 \\le P(A) \\le 1',
        },
        {
          type: 'p',
          text: 'Chẳng hạn, gieo một con xúc xắc: biến cố "Số chấm xuất hiện nhỏ hơn $7$" là biến cố chắc chắn nên có xác suất $1$; biến cố "Số chấm xuất hiện bằng $8$" là biến cố không thể nên có xác suất $0$.',
        },
      ],
    },
    {
      heading: 'Các kết quả đồng khả năng',
      blocks: [
        {
          type: 'p',
          text: 'Con xúc xắc cân đối nên sáu mặt có khả năng xuất hiện như nhau. Ta nói sáu biến cố "Xuất hiện mặt $1$ chấm", "Xuất hiện mặt $2$ chấm", ..., "Xuất hiện mặt $6$ chấm" là đồng khả năng. Mỗi lần gieo luôn xảy ra một và chỉ một trong sáu biến cố đó.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Xác suất của các biến cố đồng khả năng',
          text: 'Nếu có $k$ biến cố đồng khả năng và luôn xảy ra duy nhất một biến cố trong $k$ biến cố này thì xác suất của mỗi biến cố đó đều bằng $\\dfrac{1}{k}$.',
        },
        {
          type: 'table',
          head: ['Trò chơi', 'Các biến cố đồng khả năng', 'Xác suất mỗi biến cố'],
          rows: [
            ['Tung một đồng xu', '"Mặt sấp", "Mặt ngửa"', '$\\dfrac{1}{2}$'],
            [
              'Gieo một con xúc xắc',
              'xuất hiện mặt $1;\\ 2;\\ \\ldots;\\ 6$ chấm',
              '$\\dfrac{1}{6}$',
            ],
            [
              'Rút một thẻ trong $10$ thẻ ghi số $1$ đến $10$',
              'rút được thẻ số $1;\\ 2;\\ \\ldots;\\ 10$',
              '$\\dfrac{1}{10}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Khi các kết quả có thể của trò chơi là đồng khả năng, nếu biến cố $A$ xảy ra ở $m$ trong $n$ kết quả đó thì $P(A) = \\dfrac{m}{n}$. Chẳng hạn gieo xúc xắc, biến cố "Số chấm xuất hiện là số chẵn" xảy ra ở $3$ trong $6$ mặt nên có xác suất $\\dfrac{3}{6} = \\dfrac{1}{2}$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chỉ đếm khi đồng khả năng',
          text: 'Chỉ dùng cách đếm khi các kết quả có khả năng như nhau. Vòng quay có ô to ô nhỏ thì các ô không đồng khả năng. Hộp có $3$ bóng xanh và $1$ bóng đỏ thì hai màu không đồng khả năng, nên xác suất lấy được bóng đỏ không phải $\\dfrac{1}{2}$; hãy coi mỗi quả bóng (cùng kích thước) là một kết quả: có $4$ kết quả đồng khả năng và xác suất lấy được bóng đỏ là $\\dfrac{1}{4}$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vòng quay may mắn',
    instruction:
      'Chọn số ô và biến cố A; các ô màu cam làm A xảy ra. Đọc xác suất lí thuyết, rồi bấm "Quay 10 lần" hoặc "Quay 100 lần" và so sánh tỉ số thực nghiệm với P(A). Sau đó chuyển sang "Ô số 1 chiếm nửa vòng" để thấy vì sao chỉ được đếm ô khi các ô bằng nhau.',
  },
  examples: [
    {
      problem:
        'Gieo một con xúc xắc cân đối. Tính xác suất của các biến cố $A$: "Xuất hiện mặt $5$ chấm" và $B$: "Số chấm xuất hiện là số lẻ".',
      steps: [
        'Sáu biến cố "xuất hiện mặt $1$ chấm", ..., "xuất hiện mặt $6$ chấm" đồng khả năng và mỗi lần gieo xảy ra đúng một biến cố, nên $P(A) = \\dfrac{1}{6}$.',
        'Mỗi lần gieo, số chấm hoặc là số lẻ ($1;\\ 3;\\ 5$) hoặc là số chẵn ($2;\\ 4;\\ 6$). Có ba mặt lẻ và ba mặt chẵn nên hai biến cố "số lẻ", "số chẵn" đồng khả năng và luôn xảy ra đúng một biến cố.',
        'Vậy $P(B) = \\dfrac{1}{2}$ (cũng bằng $\\dfrac{3}{6}$).',
      ],
      answer: '$P(A) = \\dfrac{1}{6}$, $P(B) = \\dfrac{1}{2}$.',
    },
    {
      problem:
        'Chọn ngẫu nhiên một số trong năm số $21;\\ 22;\\ 23;\\ 24;\\ 25$. Tính xác suất của các biến cố: a) $C$: "Chọn được số nguyên tố"; b) $D$: "Chọn được số chẵn"; c) $E$: "Chọn được số lớn hơn $20$"; d) $F$: "Chọn được số chia hết cho $10$".',
      steps: [
        'Năm số có khả năng được chọn như nhau, nên năm kết quả đồng khả năng.',
        '$21 = 3 \\cdot 7$, $22 = 2 \\cdot 11$, $24 = 2 \\cdot 12$, $25 = 5 \\cdot 5$ đều là hợp số; chỉ có $23$ là số nguyên tố. $C$ xảy ra ở $1$ trong $5$ kết quả: $P(C) = \\dfrac{1}{5}$.',
        'Các số chẵn là $22;\\ 24$: $P(D) = \\dfrac{2}{5}$.',
        'Cả năm số đều lớn hơn $20$, $E$ là biến cố chắc chắn: $P(E) = 1$.',
        'Không số nào chia hết cho $10$, $F$ là biến cố không thể: $P(F) = 0$.',
      ],
      answer: '$P(C) = \\dfrac{1}{5}$; $P(D) = \\dfrac{2}{5}$; $P(E) = 1$; $P(F) = 0$.',
    },
    {
      problem:
        'Một hộp có $3$ quả bóng xanh và $5$ quả bóng đỏ cùng kích thước. Lấy ngẫu nhiên một quả bóng. Biến cố nào có xác suất lớn hơn: "Lấy được bóng xanh" hay "Lấy được bóng đỏ"?',
      steps: [
        'Tám quả bóng cùng kích thước nên tám kết quả "lấy được quả bóng thứ $1$", ..., "lấy được quả bóng thứ $8$" đồng khả năng.',
        'Lấy được bóng xanh ở $3$ trong $8$ kết quả: $P(\\text{xanh}) = \\dfrac{3}{8}$.',
        'Lấy được bóng đỏ ở $5$ trong $8$ kết quả: $P(\\text{đỏ}) = \\dfrac{5}{8}$.',
        '$\\dfrac{3}{8} < \\dfrac{5}{8}$.',
      ],
      answer: 'Biến cố "Lấy được bóng đỏ" có xác suất lớn hơn.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt: 'Tung một đồng xu cân đối. Tính xác suất của biến cố "Đồng xu xuất hiện mặt ngửa".',
      answer: [1, 2],
      hints: ['Tung đồng xu có hai biến cố đồng khả năng: mặt sấp, mặt ngửa.'],
      solution:
        'Hai biến cố "Mặt sấp", "Mặt ngửa" đồng khả năng và luôn xảy ra đúng một biến cố, nên xác suất xuất hiện mặt ngửa là $\\dfrac{1}{2}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo một con xúc xắc cân đối. Tính xác suất của biến cố "Số chấm xuất hiện chia hết cho $3$".',
      answer: [1, 3],
      hints: ['Sáu mặt đồng khả năng.', 'Đếm các mặt có số chấm chia hết cho $3$.'],
      solution:
        'Các mặt có số chấm chia hết cho $3$ là $3$ và $6$, tức $2$ trong $6$ mặt đồng khả năng. Xác suất là $\\dfrac{2}{6} = \\dfrac{1}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Gieo một con xúc xắc. Xác suất của biến cố "Số chấm xuất hiện nhỏ hơn $7$" bằng bao nhiêu?',
      answer: 1,
      hints: ['Biến cố này thuộc loại nào: chắc chắn, không thể hay ngẫu nhiên?'],
      solution:
        'Mặt nào cũng có số chấm nhỏ hơn $7$, nên đây là biến cố chắc chắn, có xác suất bằng $1$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một hộp có $10$ tấm thẻ ghi các số $1;\\ 2;\\ \\ldots;\\ 10$. Rút ngẫu nhiên một tấm thẻ. Tính xác suất của biến cố "Rút được thẻ ghi số nguyên tố".',
      answer: [2, 5],
      hints: [
        'Mười thẻ có khả năng được rút như nhau.',
        'Liệt kê các số nguyên tố không vượt quá $10$.',
      ],
      solution:
        'Các số nguyên tố từ $1$ đến $10$ là $2;\\ 3;\\ 5;\\ 7$, tức $4$ trong $10$ kết quả đồng khả năng. Xác suất là $\\dfrac{4}{10} = \\dfrac{2}{5}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một vòng quay chia thành $8$ ô bằng nhau ghi các số $1$ đến $8$. Quay một lần. Tính xác suất của biến cố "Mũi tên chỉ vào ô ghi số lớn hơn $5$".',
      answer: [3, 8],
      hints: [
        'Tám ô bằng nhau nên tám kết quả đồng khả năng.',
        'Các số lớn hơn $5$ là những số nào?',
      ],
      solution:
        'Các ô ghi số lớn hơn $5$ là $6;\\ 7;\\ 8$, tức $3$ trong $8$ kết quả đồng khả năng. Xác suất là $\\dfrac{3}{8}$.',
    },
    {
      type: 'choice',
      prompt:
        'Tổ của Mai có $6$ bạn nam và $6$ bạn nữ. Cô giáo gọi ngẫu nhiên một bạn lên bảng. Xác suất của biến cố "Bạn được gọi là bạn nữ" là',
      options: ['$\\dfrac{1}{6}$', '$\\dfrac{1}{2}$', '$\\dfrac{1}{12}$', '$6$'],
      answer: 1,
      hints: [
        'Số bạn nam bằng số bạn nữ; hai biến cố "gọi bạn nam", "gọi bạn nữ" có đồng khả năng không?',
      ],
      solution:
        'Số bạn nam bằng số bạn nữ nên hai biến cố "Gọi được bạn nam" và "Gọi được bạn nữ" đồng khả năng, luôn xảy ra đúng một biến cố. Xác suất là $\\dfrac{1}{2}$ (cũng bằng $\\dfrac{6}{12}$). Đáp án $6$ sai vì xác suất không lớn hơn $1$.',
    },
    {
      type: 'choice',
      prompt:
        'Một túi có $2$ viên bi đỏ, $5$ viên bi xanh và $3$ viên bi vàng cùng kích thước. Lấy ngẫu nhiên một viên bi. Biến cố nào có xác suất lớn nhất?',
      options: [
        '"Lấy được bi đỏ"',
        '"Lấy được bi xanh"',
        '"Lấy được bi vàng"',
        'Ba biến cố có xác suất bằng nhau',
      ],
      answer: 1,
      hints: ['Mỗi viên bi là một kết quả; mười kết quả đồng khả năng.'],
      solution:
        '$P(\\text{đỏ}) = \\dfrac{2}{10}$, $P(\\text{xanh}) = \\dfrac{5}{10}$, $P(\\text{vàng}) = \\dfrac{3}{10}$. Lớn nhất là xác suất lấy được bi xanh. Ba màu không đồng khả năng vì số bi mỗi màu khác nhau.',
    },
    {
      type: 'order',
      prompt: 'Gieo một con xúc xắc. Sắp xếp các biến cố theo xác suất từ nhỏ đến lớn.',
      items: [
        '"Số chấm xuất hiện là số chẵn"',
        '"Số chấm xuất hiện nhỏ hơn $7$"',
        '"Số chấm xuất hiện bằng $7$"',
        '"Xuất hiện mặt $6$ chấm"',
      ],
      answer: [2, 3, 0, 1],
      hints: ['Tính xác suất từng biến cố: một biến cố không thể, một biến cố chắc chắn.'],
      solution:
        '"Bằng $7$": $0$; "mặt $6$ chấm": $\\dfrac{1}{6}$; "số chẵn": $\\dfrac{1}{2}$; "nhỏ hơn $7$": $1$. Thứ tự: bằng $7$, mặt $6$ chấm, số chẵn, nhỏ hơn $7$.',
    },
    {
      type: 'choice',
      prompt:
        'Một vòng quay có ba ô: ô đỏ chiếm nửa vòng tròn, ô xanh và ô vàng mỗi ô chiếm một phần tư vòng tròn. Bạn Nam nói: "Có $3$ ô nên xác suất mũi tên chỉ vào ô đỏ là $\\dfrac{1}{3}$". Bạn Nam nói đúng không?',
      options: [
        'Đúng',
        'Sai, xác suất đó là $\\dfrac{1}{2}$',
        'Sai, xác suất đó là $\\dfrac{1}{4}$',
      ],
      answer: 1,
      hints: [
        'Ba ô có bằng nhau không? Ba kết quả có đồng khả năng không?',
        'Ô đỏ chiếm bao nhiêu phần vòng tròn?',
      ],
      solution:
        'Ba ô không bằng nhau nên ba kết quả không đồng khả năng, không dùng được $\\dfrac{1}{3}$. Chia vòng tròn thành $4$ phần tư bằng nhau: ô đỏ gồm $2$ phần tư, nên xác suất là $\\dfrac{2}{4} = \\dfrac{1}{2}$.',
    },
  ],
  takeaways: [
    'Xác suất của biến cố $A$, kí hiệu $P(A)$, là số từ $0$ đến $1$ đo khả năng xảy ra của $A$.',
    'Biến cố chắc chắn có xác suất $1$; biến cố không thể có xác suất $0$.',
    'Có $k$ biến cố đồng khả năng và luôn xảy ra duy nhất một trong số đó thì mỗi biến cố có xác suất $\\dfrac{1}{k}$.',
    'Khi các kết quả đồng khả năng, biến cố xảy ra ở $m$ trong $n$ kết quả có xác suất $\\dfrac{m}{n}$; chỉ đếm như vậy khi các kết quả thật sự đồng khả năng.',
  ],
};
