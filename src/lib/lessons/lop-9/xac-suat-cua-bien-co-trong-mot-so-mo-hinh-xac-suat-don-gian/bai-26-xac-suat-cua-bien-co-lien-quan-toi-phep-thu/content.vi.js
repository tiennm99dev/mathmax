/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Khi các kết quả của phép thử đồng khả năng, xác suất của biến cố E bằng số kết quả thuận lợi cho E chia cho số phần tử của không gian mẫu.',
  intro:
    'Gieo đồng thời hai con xúc xắc cân đối. Tổng số chấm bằng $7$ hay tổng số chấm bằng $2$ dễ xảy ra hơn? Không gian mẫu ở Bài 25 giúp ta trả lời chính xác: chỉ cần đếm các kết quả làm biến cố xảy ra.',
  objectives: [
    'Nhận biết biến cố liên quan tới phép thử và các kết quả thuận lợi cho biến cố.',
    'Tính xác suất của biến cố bằng công thức $P(E) = \\dfrac{k}{n}$ khi các kết quả đồng khả năng.',
    'Vận dụng vào các phép thử gieo xúc xắc, tung đồng xu, rút thẻ, chọn người.',
  ],
  sections: [
    {
      heading: 'Biến cố liên quan tới phép thử',
      blocks: [
        {
          type: 'p',
          text: 'Lan gieo một con xúc xắc, Hòa tung một đồng xu. Xét biến cố $E$: "Số chấm xuất hiện là số chẵn và đồng xu xuất hiện mặt sấp". Biến cố $E$ xảy ra hay không tùy thuộc vào kết quả của phép thử: nếu kết quả là $(4, S)$ thì $E$ xảy ra, nếu là $(4, N)$ hay $(3, S)$ thì $E$ không xảy ra.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Kết quả thuận lợi',
          text: 'Cho phép thử $T$. Biến cố $E$ liên quan tới phép thử $T$ là biến cố mà việc xảy ra hay không xảy ra của $E$ tùy thuộc vào kết quả của phép thử $T$. Mỗi kết quả của phép thử $T$ làm cho biến cố $E$ xảy ra gọi là một kết quả thuận lợi cho $E$.',
        },
        {
          type: 'p',
          text: 'Trong ví dụ trên, các kết quả thuận lợi cho $E$ là $(2, S)$, $(4, S)$ và $(6, S)$.',
        },
      ],
    },
    {
      heading: 'Xác suất của biến cố',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Công thức tính xác suất',
          text: 'Giả sử các kết quả có thể của phép thử $T$ là đồng khả năng. Khi đó xác suất của biến cố $E$ bằng tỉ số giữa số kết quả thuận lợi cho $E$ và số phần tử của không gian mẫu: $$P(E) = \\dfrac{k}{n},$$ trong đó $k$ là số kết quả thuận lợi cho biến cố $E$, $n$ là số phần tử của không gian mẫu $\\Omega$.',
        },
        {
          type: 'p',
          text: 'Để tính xác suất của biến cố $E$, ta làm theo ba bước:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Mô tả không gian mẫu (liệt kê, kẻ bảng hoặc vẽ sơ đồ cây) và đếm số phần tử $n$; kiểm tra các kết quả là đồng khả năng.',
            'Xác định các kết quả thuận lợi cho $E$ và đếm chúng, được $k$.',
            'Tính $P(E) = \\dfrac{k}{n}$.',
          ],
        },
        {
          type: 'p',
          text: 'Trong ví dụ của Lan và Hòa, không gian mẫu có $12$ phần tử đồng khả năng (xúc xắc và đồng xu đều cân đối), có $3$ kết quả thuận lợi cho $E$, nên $P(E) = \\dfrac{3}{12} = \\dfrac{1}{4}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Nhận xét',
          text: 'Vì $0 \\le k \\le n$ nên $0 \\le P(E) \\le 1$. Biến cố không thể có xác suất $0$, biến cố chắc chắn có xác suất $1$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Đếm trên không gian mẫu, không đếm trên "giá trị"',
          text: 'Khi gieo hai con xúc xắc, tổng số chấm nhận $11$ giá trị $2, 3, \\ldots, 12$, nhưng $11$ giá trị này không đồng khả năng: tổng bằng $2$ chỉ ứng với $(1, 1)$, còn tổng bằng $7$ ứng với $6$ kết quả. Phải đếm trên $36$ kết quả $(i, j)$ đồng khả năng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tô ô thuận lợi trên bảng hai con xúc xắc',
    instruction:
      'Bảng có $36$ ô, mỗi ô là một kết quả $(i, j)$ đồng khả năng. Chọn một biến cố $E$, chạm (hoặc dùng Tab và Enter) để tô các ô thuận lợi cho $E$, rồi bấm "Kiểm tra". Xác suất $P(E) = \\dfrac{k}{36}$ tự tính theo số ô đã tô. Đổi cách ghi trên ô sang "Tổng" hay "Tích" để dễ tìm ô hơn.',
  },
  examples: [
    {
      problem:
        'Gieo đồng thời hai con xúc xắc cân đối. Tính xác suất của biến cố $A$: "Tổng số chấm xuất hiện trên hai con xúc xắc bằng $7$".',
      steps: [
        'Không gian mẫu gồm các kết quả $(i, j)$ với $i, j \\in \\{1;\\ 2;\\ \\ldots;\\ 6\\}$, có $n = 36$ phần tử đồng khả năng.',
        'Các kết quả thuận lợi cho $A$: $(1, 6);\\ (2, 5);\\ (3, 4);\\ (4, 3);\\ (5, 2);\\ (6, 1)$, nên $k = 6$.',
        '$P(A) = \\dfrac{6}{36} = \\dfrac{1}{6}$.',
      ],
      answer:
        '$P(A) = \\dfrac{1}{6}$. (Tổng bằng $2$ chỉ có $1$ kết quả, xác suất $\\dfrac{1}{36}$.)',
    },
    {
      problem:
        'Hộp có bốn tấm thẻ ghi số $1, 2, 3, 4$. Rút ngẫu nhiên lần lượt hai tấm thẻ, thẻ rút ra lần đầu không trả lại hộp. Tính xác suất của biến cố $B$: "Tổng hai số ghi trên hai thẻ là số lẻ".',
      steps: [
        'Không gian mẫu gồm các cặp $(a, b)$, $a \\ne b$; theo sơ đồ cây có $n = 4 \\cdot 3 = 12$ phần tử đồng khả năng.',
        'Tổng lẻ khi một số lẻ, một số chẵn. Các kết quả thuận lợi: $(1, 2);\\ (1, 4);\\ (3, 2);\\ (3, 4);\\ (2, 1);\\ (2, 3);\\ (4, 1);\\ (4, 3)$, nên $k = 8$.',
        '$P(B) = \\dfrac{8}{12} = \\dfrac{2}{3}$.',
      ],
      answer: '$P(B) = \\dfrac{2}{3}$.',
    },
    {
      problem:
        'Ở tình huống mở đầu Bài 25, cửa hàng rút lần lượt hai lá phiếu từ $4$ lá ghi tên khách hàng $A, B, C, D$. Tính xác suất của biến cố $C$: "Khách hàng $A$ được nhận quà".',
      steps: [
        'Không gian mẫu có $n = 12$ phần tử đồng khả năng (Ví dụ 1 Bài 25).',
        '$A$ được nhận quà khi tên $A$ được rút ở lần thứ nhất hoặc lần thứ hai: $(A, B);\\ (A, C);\\ (A, D);\\ (B, A);\\ (C, A);\\ (D, A)$, nên $k = 6$.',
        '$P(C) = \\dfrac{6}{12} = \\dfrac{1}{2}$.',
      ],
      answer: '$P(C) = \\dfrac{1}{2}$.',
    },
  ],
  practice: [
    {
      type: 'fraction',
      prompt:
        'Gieo đồng thời hai con xúc xắc cân đối. Tính xác suất của biến cố "Hai con xúc xắc xuất hiện số chấm bằng nhau".',
      answer: [1, 6],
      hints: ['Không gian mẫu có $36$ phần tử.', 'Các kết quả thuận lợi có dạng $(i, i)$.'],
      solution:
        'Kết quả thuận lợi: $(1, 1);\\ (2, 2);\\ \\ldots;\\ (6, 6)$, có $k = 6$. $P = \\dfrac{6}{36} = \\dfrac{1}{6}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo đồng thời hai con xúc xắc cân đối. Tính xác suất của biến cố "Tổng số chấm xuất hiện bằng $9$".',
      answer: [1, 9],
      hints: ['Liệt kê các cặp $(i, j)$ có $i + j = 9$.'],
      solution:
        'Kết quả thuận lợi: $(3, 6);\\ (4, 5);\\ (5, 4);\\ (6, 3)$, có $k = 4$. $P = \\dfrac{4}{36} = \\dfrac{1}{9}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Gieo đồng thời hai con xúc xắc cân đối. Tính xác suất của biến cố "Có ít nhất một con xúc xắc xuất hiện mặt $6$ chấm".',
      answer: [11, 36],
      hints: [
        'Trên bảng $6 \\times 6$, tô hàng $i = 6$ và cột $j = 6$.',
        'Ô $(6, 6)$ nằm ở cả hàng lẫn cột, chỉ đếm một lần.',
      ],
      solution:
        'Hàng $i = 6$ có $6$ ô, cột $j = 6$ có $6$ ô, chung nhau ô $(6, 6)$: $k = 6 + 6 - 1 = 11$. $P = \\dfrac{11}{36}$.',
    },
    {
      type: 'number',
      prompt:
        'Gieo đồng thời hai con xúc xắc cân đối. Có bao nhiêu kết quả thuận lợi cho biến cố "Tích hai số chấm là số chẵn"?',
      answer: 27,
      hints: ['Tích là số lẻ khi nào?', 'Đếm các kết quả có tích lẻ rồi lấy $36$ trừ đi.'],
      solution:
        'Tích lẻ khi cả hai số chấm đều lẻ: $i, j \\in \\{1;\\ 3;\\ 5\\}$, có $3 \\cdot 3 = 9$ kết quả. Số kết quả có tích chẵn: $36 - 9 = 27$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tung một đồng xu cân đối ba lần liên tiếp. Tính xác suất của biến cố "Có đúng hai lần xuất hiện mặt sấp".',
      answer: [3, 8],
      hints: [
        'Không gian mẫu có $8$ phần tử: $SSS;\\ SSN;\\ \\ldots$',
        'Tìm các kết quả có đúng hai chữ $S$.',
      ],
      solution:
        '$\\Omega$ có $8$ phần tử đồng khả năng. Kết quả thuận lợi: $SSN;\\ SNS;\\ NSS$, có $k = 3$. $P = \\dfrac{3}{8}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Hộp có năm tấm thẻ ghi các chữ số $1, 2, 3, 4, 5$. Rút ngẫu nhiên lần lượt hai thẻ, không trả lại, rồi xếp thành số có hai chữ số (thẻ rút đầu là chữ số hàng chục). Tính xác suất số nhận được chia hết cho $3$.',
      answer: [2, 5],
      hints: [
        'Không gian mẫu có $5 \\cdot 4 = 20$ phần tử.',
        'Số chia hết cho $3$ khi tổng hai chữ số chia hết cho $3$; tổng hai chữ số khác nhau từ $1$ đến $5$ có thể bằng $3, 6, 9$.',
      ],
      solution:
        'Các số thuận lợi: $12, 21$ (tổng $3$); $15, 51, 24, 42$ (tổng $6$; không có $33$ vì hai thẻ khác nhau); $45, 54$ (tổng $9$). Có $k = 8$, $P = \\dfrac{8}{20} = \\dfrac{2}{5}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Một gia đình có hai con; giả sử khả năng sinh con trai và con gái là như nhau. Tính xác suất của biến cố "Gia đình có ít nhất một con gái".',
      answer: [3, 4],
      hints: ['$\\Omega = \\{TT;\\ TG;\\ GT;\\ GG\\}$.'],
      solution:
        'Bốn kết quả đồng khả năng; các kết quả có ít nhất một chữ $G$ là $TG;\\ GT;\\ GG$. $P = \\dfrac{3}{4}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tổ có $4$ bạn An, Bình, Chi, Dũng. Chọn ngẫu nhiên một bạn làm tổ trưởng, rồi chọn ngẫu nhiên một bạn khác làm tổ phó. Tính xác suất cả An và Bình đều được chọn.',
      answer: [1, 6],
      hints: [
        'Không gian mẫu có $4 \\cdot 3 = 12$ phần tử (tổ trưởng, tổ phó).',
        'An làm tổ trưởng, Bình làm tổ phó là một kết quả; còn kết quả nào nữa?',
      ],
      solution:
        'Kết quả thuận lợi: (An, Bình) và (Bình, An), có $k = 2$. $P = \\dfrac{2}{12} = \\dfrac{1}{6}$.',
    },
    {
      type: 'choice',
      prompt:
        'Gieo hai con xúc xắc cân đối. Minh nói: "Tổng số chấm có $11$ giá trị từ $2$ đến $12$, nên xác suất tổng bằng $7$ là $\\dfrac{1}{11}$". Nhận xét nào đúng?',
      options: [
        'Minh đúng.',
        'Minh sai: $11$ giá trị của tổng không đồng khả năng; xác suất đúng là $\\dfrac{1}{6}$.',
        'Minh sai: xác suất đúng là $\\dfrac{7}{36}$.',
        'Minh sai: xác suất đúng là $\\dfrac{1}{12}$.',
      ],
      answer: 1,
      hints: ['Tổng bằng $2$ và tổng bằng $7$ có cùng số kết quả thuận lợi không?'],
      solution:
        'Công thức $\\dfrac{k}{n}$ chỉ dùng được khi các kết quả đồng khả năng. Các giá trị của tổng không đồng khả năng; phải đếm trên $36$ kết quả $(i, j)$: có $6$ kết quả có tổng $7$, nên $P = \\dfrac{6}{36} = \\dfrac{1}{6}$.',
    },
  ],
  takeaways: [
    'Kết quả thuận lợi cho $E$ là kết quả của phép thử làm cho $E$ xảy ra.',
    'Các kết quả đồng khả năng: $P(E) = \\dfrac{k}{n}$, với $k$ là số kết quả thuận lợi, $n$ là số phần tử của $\\Omega$.',
    'Ba bước: mô tả $\\Omega$ và đếm $n$; đếm $k$; lập tỉ số.',
    '$0 \\le P(E) \\le 1$; luôn đếm trên các kết quả đồng khả năng của không gian mẫu.',
  ],
};
