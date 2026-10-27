/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: dùng các hàm RAND, RANDBETWEEN, IF và COUNTIF của Excel để mô phỏng tung đồng xu, gieo xúc xắc, lấy bóng trong túi, rồi tính xác suất thực nghiệm của một biến cố.',
  intro:
    'Muốn biết xác suất thực nghiệm của biến cố "mặt sấp" khi tung đồng xu, ta phải tung thật nhiều lần và ghi lại kết quả, việc này mất rất nhiều thời gian. Phần mềm bảng tính Excel có các hàm sinh số ngẫu nhiên, giúp em "tung" hàng trăm lần chỉ trong vài giây, rồi tự đếm và tính xác suất thực nghiệm.',
  objectives: [
    'Dùng hàm RAND và RANDBETWEEN để tạo kết quả ngẫu nhiên; kéo công thức xuống để lặp lại phép thử nhiều lần.',
    'Mô phỏng các thí nghiệm tung đồng xu, gieo xúc xắc, lấy bóng trong túi (có hoàn lại).',
    'Dùng hàm COUNTIF đếm số lần một biến cố xảy ra và tính xác suất thực nghiệm của biến cố đó.',
    'Nhận xét: khi số lần thử càng lớn, xác suất thực nghiệm thường càng gần xác suất tính theo lí thuyết.',
  ],
  sections: [
    {
      heading: 'Các hàm Excel cần dùng',
      blocks: [
        {
          type: 'table',
          head: ['Hàm', 'Kết quả', 'Ví dụ'],
          rows: [
            [
              '=RAND()',
              'một số thực ngẫu nhiên, không nhỏ hơn $0$ và nhỏ hơn $1$',
              '$0{,}7316\\ldots$',
            ],
            [
              '=RANDBETWEEN(a;b)',
              'một số nguyên ngẫu nhiên từ $a$ đến $b$ (kể cả $a$ và $b$)',
              '=RANDBETWEEN(1;6) cho một trong các số $1, 2, \\ldots, 6$',
            ],
            [
              '=IF(điều kiện;giá trị 1;giá trị 2)',
              'giá trị 1 nếu điều kiện đúng, giá trị 2 nếu sai',
              '=IF(B2=1;"S";"N")',
            ],
            [
              '=COUNTIF(vùng;điều kiện)',
              'số ô trong vùng thoả mãn điều kiện',
              '=COUNTIF(B2:B101;"S"), =COUNTIF(B2:B101;">4")',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dấu phân cách trong công thức',
          text: 'Tuỳ cài đặt vùng (ngôn ngữ) của máy tính, các đối số trong hàm được ngăn bằng dấu chấm phẩy ; hoặc dấu phẩy ,. Bài này dùng dấu ; như phần lớn máy cài đặt tiếng Việt. Nếu Excel báo lỗi công thức, hãy thử đổi sang dấu ,.',
        },
        {
          type: 'list',
          items: [
            'Lặp lại phép thử: gõ công thức vào ô đầu, chọn ô đó rồi kéo nút vuông nhỏ ở góc dưới bên phải (nút điền) xuống bao nhiêu hàng thì có bấy nhiêu lần thử.',
            'Mỗi lần bảng tính được tính lại (nhấn phím F9, hoặc nhập dữ liệu vào một ô bất kì), tất cả các số ngẫu nhiên đều đổi, như khi ta làm lại thí nghiệm từ đầu.',
            'Điều kiện so sánh trong COUNTIF được đặt trong dấu ngoặc kép: ">4", ">=6", "<6". Điều kiện là một chữ cũng đặt trong ngoặc kép: "S".',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Xác suất thực nghiệm',
          text: 'Thực hiện phép thử $n$ lần, biến cố $A$ xảy ra $k$ lần. Xác suất thực nghiệm của biến cố $A$ là $\\dfrac{k}{n}$. Trong Excel: số lần xảy ra tính bằng COUNTIF, rồi chia cho số lần thử.',
        },
      ],
    },
    {
      heading: 'Mô phỏng tung đồng xu và gieo xúc xắc',
      blocks: [
        {
          type: 'p',
          text: 'Tung đồng xu: quy ước số $1$ là mặt sấp (S), số $0$ là mặt ngửa (N). Gieo xúc xắc: số ngẫu nhiên từ $1$ đến $6$ chính là số chấm xuất hiện. Kết quả đặt ở cột B, từ hàng 2 trở xuống; hàng 1 ghi tiêu đề.',
        },
        {
          type: 'table',
          head: ['Thí nghiệm', 'Công thức ở B2 (kéo xuống)', 'Biến cố', 'Công thức đếm'],
          rows: [
            ['Tung đồng xu', '=IF(RANDBETWEEN(0;1)=1;"S";"N")', 'Mặt sấp', '=COUNTIF(B2:B101;"S")'],
            ['Gieo xúc xắc', '=RANDBETWEEN(1;6)', 'Mặt 6 chấm', '=COUNTIF(B2:B101;6)'],
            [
              'Gieo xúc xắc',
              '=RANDBETWEEN(1;6)',
              'Số chấm chẵn',
              '=COUNTIF(B2:B101;2)+COUNTIF(B2:B101;4)+COUNTIF(B2:B101;6)',
            ],
            ['Gieo xúc xắc', '=RANDBETWEEN(1;6)', 'Số chấm lớn hơn 4', '=COUNTIF(B2:B101;">4")'],
          ],
          caption: 'Với 100 lần thử, kết quả nằm ở vùng B2:B101.',
        },
        {
          type: 'p',
          text: 'Xác suất thực nghiệm của biến cố đặt ở ô kế bên, ví dụ ô D3 với công thức =D2/100, trong đó D2 là ô chứa công thức đếm.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Thử nhiều lần',
          text: 'Mỗi lần nhấn F9, xác suất thực nghiệm lại đổi một chút. Với $20$ lần thử, kết quả có thể khác xa xác suất lí thuyết; với $1\\,000$ lần thử, xác suất thực nghiệm của biến cố "mặt sấp" thường rất gần $\\dfrac{1}{2}$.',
        },
      ],
    },
    {
      heading: 'Thực hành: lấy bóng trong túi',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Bài toán: một túi đựng $8$ quả bóng có cùng kích thước, trong đó có $1$ quả màu xanh, $2$ quả màu vàng, $2$ quả màu đỏ và $3$ quả màu đen. Lấy ngẫu nhiên một quả bóng trong túi, ghi màu rồi trả lại túi; làm như vậy $200$ lần. Dùng Excel tìm xác suất thực nghiệm của biến cố "Lấy được quả bóng không phải màu đen".',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: máy tính có Excel (hoặc phần mềm bảng tính tương tự như Google Trang tính, LibreOffice Calc).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đánh số các quả bóng từ $1$ đến $8$: số $1$ màu xanh, số $2$ và $3$ màu vàng, số $4$ và $5$ màu đỏ, số $6$, $7$, $8$ màu đen.',
            'Ô A1 ghi "Lần thử", B1 ghi "Số bóng", C1 ghi "Màu". Ở B2 gõ =RANDBETWEEN(1;8).',
            'Ở C2 gõ =IF(B2>=6; "Đen"; IF(B2>=4; "Đỏ"; IF(B2>=2; "Vàng"; "Xanh"))) để hiện màu của quả bóng (Excel bỏ qua dấu cách sau dấu ;).',
            'Chọn B2:C2 rồi kéo nút điền xuống đến hàng 201 để có $200$ lần lấy bóng.',
            'Ở E2 gõ =COUNTIF(C2:C201;"Đen") (hoặc =COUNTIF(B2:B201;">=6")) để đếm số lần lấy được bóng đen; ở E3 gõ =(200-E2)/200.',
            'Nhấn F9 thêm bốn lần, mỗi lần ghi lại kết quả ô E3 vào bảng.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: bảng năm kết quả xác suất thực nghiệm của biến cố "Lấy được quả bóng không phải màu đen"; so sánh chúng với $\\dfrac{5}{8} = 0{,}625$ và nhận xét. Làm lại với $20$ lần lấy bóng (kéo đến hàng 21) và cho biết khi nào kết quả dao động nhiều hơn.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng tính mô phỏng',
    instruction:
      'Chọn thí nghiệm, biến cố và số lần thử (số hàng kéo công thức xuống). Bấm "Tính lại (F9)" để làm lại thí nghiệm; bấm vào một ô để xem công thức trong thanh công thức. Quan sát xác suất thực nghiệm dao động quanh xác suất lí thuyết khi số lần thử tăng.',
  },
  examples: [
    {
      problem:
        'Dùng Excel mô phỏng $20$ lần tung một đồng xu và tính xác suất thực nghiệm của biến cố "Đồng xu xuất hiện mặt sấp".',
      steps: [
        'Ô A1 ghi "Lần thử", B1 ghi "Mặt". Ở B2 gõ =IF(RANDBETWEEN(0;1)=1;"S";"N").',
        'Kéo công thức ở B2 xuống đến B21: được $20$ kết quả S hoặc N.',
        'Ở D2 gõ =COUNTIF(B2:B21;"S") để đếm số lần mặt sấp; giả sử được $11$.',
        'Ở D3 gõ =D2/20, được $\\dfrac{11}{20} = 0{,}55$.',
      ],
      answer:
        'Với kết quả mô phỏng này, xác suất thực nghiệm của biến cố "mặt sấp" là $0{,}55$ (mỗi lần nhấn F9 kết quả có thể khác).',
    },
    {
      problem:
        'Gieo một con xúc xắc $50$ lần bằng Excel. Viết công thức tính xác suất thực nghiệm của biến cố "Gieo được mặt có số chấm chẵn". Nếu số lần xảy ra là $27$ thì xác suất thực nghiệm bằng bao nhiêu?',
      steps: [
        'Ở B2 gõ =RANDBETWEEN(1;6), kéo xuống đến B51: vùng kết quả là B2:B51.',
        'Mặt chẵn là $2$, $4$, $6$, nên ở D2 gõ =COUNTIF(B2:B51;2)+COUNTIF(B2:B51;4)+COUNTIF(B2:B51;6).',
        'Ở D3 gõ =D2/50. Với $27$ lần: $\\dfrac{27}{50} = 0{,}54$.',
      ],
      answer:
        'Xác suất thực nghiệm là $0{,}54$, gần với xác suất lí thuyết $\\dfrac{3}{6} = 0{,}5$.',
    },
    {
      problem:
        'Mô phỏng $200$ lần lấy bóng trong túi ($1$ xanh, $2$ vàng, $2$ đỏ, $3$ đen, có hoàn lại), ô đếm bóng đen cho kết quả $81$. Tính xác suất thực nghiệm của biến cố "Lấy được quả bóng không phải màu đen".',
      steps: [
        'Số lần lấy được bóng đen là $81$, nên số lần không phải bóng đen là $200 - 81 = 119$.',
        'Xác suất thực nghiệm của biến cố cần tìm là $\\dfrac{119}{200} = 0{,}595$.',
        'Cách khác: xác suất thực nghiệm của "bóng đen" là $\\dfrac{81}{200} = 0{,}405$, nên kết quả là $1 - 0{,}405 = 0{,}595$.',
      ],
      answer: '$0{,}595$, gần với xác suất lí thuyết $\\dfrac{5}{8} = 0{,}625$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Công thức nào mô phỏng một lần gieo xúc xắc sáu mặt?',
      options: ['=RANDBETWEEN(0;6)', '=RANDBETWEEN(1;6)', '=RAND(1;6)', '=RANDBETWEEN(1;7)'],
      answer: 1,
      hints: ['RANDBETWEEN(a;b) cho số nguyên từ $a$ đến $b$, kể cả hai đầu mút.'],
      solution:
        'Số chấm có thể là $1, 2, \\ldots, 6$, nên dùng =RANDBETWEEN(1;6). RANDBETWEEN(0;6) có thể cho $0$, RANDBETWEEN(1;7) có thể cho $7$; hàm RAND không có đối số.',
    },
    {
      type: 'multi',
      prompt: 'Ô có công thức =RANDBETWEEN(1;8) có thể hiện những giá trị nào?',
      options: ['$0$', '$1$', '$4{,}5$', '$8$', '$9$'],
      answers: [1, 3],
      hints: ['Kết quả là số nguyên, từ $1$ đến $8$.'],
      solution:
        'RANDBETWEEN(1;8) chỉ cho các số nguyên $1, 2, \\ldots, 8$; trong các giá trị đã cho chỉ có $1$ và $8$.',
    },
    {
      type: 'choice',
      prompt:
        'Kết quả gieo xúc xắc nằm ở vùng B2:B51. Công thức nào đếm số lần gieo được mặt có số chấm lớn hơn $4$?',
      options: [
        '=COUNTIF(B2:B51;">4")',
        '=COUNTIF(B2:B51;>4)',
        '=COUNTIF(B1:B50;">4")',
        '=COUNT(B2:B51;">4")',
      ],
      answer: 0,
      hints: [
        'Điều kiện so sánh phải đặt trong dấu ngoặc kép.',
        'Vùng đếm phải đúng là vùng chứa kết quả.',
      ],
      solution:
        '=COUNTIF(B2:B51;">4") đếm các ô trong B2:B51 có giá trị lớn hơn $4$ (mặt 5 và mặt 6). Thiếu ngoặc kép là lỗi công thức; vùng B1:B50 lấy cả ô tiêu đề và bỏ sót B51; hàm COUNT không có điều kiện.',
    },
    {
      type: 'fraction',
      prompt:
        'Mô phỏng $60$ lần gieo xúc xắc, ô =COUNTIF(B2:B61;6) cho kết quả $12$. Xác suất thực nghiệm của biến cố "Gieo được mặt 6 chấm" là bao nhiêu? Viết dưới dạng phân số tối giản.',
      answer: [1, 5],
      simplest: true,
      hints: ['Xác suất thực nghiệm bằng số lần xảy ra chia cho số lần thử.'],
      solution: '$\\dfrac{12}{60} = \\dfrac{1}{5}$.',
    },
    {
      type: 'number',
      prompt:
        'Mô phỏng $200$ lần lấy bóng ($1$ xanh, $2$ vàng, $2$ đỏ, $3$ đen, có hoàn lại), lấy được bóng đen $81$ lần. Xác suất thực nghiệm của biến cố "Lấy được quả bóng màu đen" là bao nhiêu? (viết dạng số thập phân)',
      answer: 0.405,
      tolerance: 0.0005,
      hints: ['Chia số lần lấy được bóng đen cho tổng số lần lấy.'],
      solution: '$\\dfrac{81}{200} = 0{,}405$.',
    },
    {
      type: 'number',
      prompt:
        'Cũng với kết quả trên ($81$ lần bóng đen trong $200$ lần), xác suất thực nghiệm của biến cố "Lấy được quả bóng không phải màu đen" là bao nhiêu?',
      answer: 0.595,
      tolerance: 0.0005,
      hints: ['Số lần không phải bóng đen là $200 - 81$.'],
      solution: '$\\dfrac{200 - 81}{200} = \\dfrac{119}{200} = 0{,}595$.',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các bước dùng Excel tính xác suất thực nghiệm của biến cố "mặt sấp" sau $100$ lần tung đồng xu.',
      items: [
        'Ở D2 gõ =COUNTIF(B2:B101;"S").',
        'Ở B2 gõ =IF(RANDBETWEEN(0;1)=1; "S"; "N").',
        'Ở D3 gõ =D2/100.',
        'Kéo công thức ở B2 xuống đến B101.',
      ],
      answer: [1, 3, 0, 2],
      hints: ['Phải có đủ $100$ kết quả rồi mới đếm, đếm xong mới chia.'],
      solution:
        'Gõ công thức mô phỏng ở B2 → kéo xuống đến B101 → đếm mặt sấp bằng COUNTIF ở D2 → chia cho $100$ ở D3.',
    },
    {
      type: 'choice',
      prompt: 'Nhấn phím F9 trên bảng tính mô phỏng thì điều gì xảy ra?',
      options: [
        'Chỉ ô đang chọn đổi giá trị.',
        'Mọi số ngẫu nhiên được tạo lại, các ô đếm và xác suất thực nghiệm tự tính lại.',
        'Bảng tính giữ nguyên kết quả cũ.',
        'Excel xoá hết các công thức.',
      ],
      answer: 1,
      hints: ['F9 yêu cầu Excel tính lại toàn bộ bảng tính.'],
      solution:
        'F9 tính lại cả bảng tính: mọi hàm RAND, RANDBETWEEN cho số mới, như làm lại thí nghiệm, nên COUNTIF và xác suất thực nghiệm cũng đổi theo.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn An tung đồng xu bằng Excel $20$ lần và $1\\,000$ lần, mỗi lần nhấn F9 vài lượt. Nhận xét nào đúng?',
      options: [
        'Với $1\\,000$ lần, xác suất thực nghiệm của "mặt sấp" luôn đúng bằng $0{,}5$.',
        'Với $20$ lần, xác suất thực nghiệm luôn gần $0{,}5$ hơn với $1\\,000$ lần.',
        'Với $1\\,000$ lần, xác suất thực nghiệm thường dao động ít hơn và gần $0{,}5$ hơn.',
        'Số lần thử không ảnh hưởng đến xác suất thực nghiệm.',
      ],
      answer: 2,
      hints: ['Thử trong bảng tính mô phỏng: đổi số lần thử rồi nhấn "Tính lại" nhiều lần.'],
      solution:
        'Khi số lần thử lớn, xác suất thực nghiệm thường gần xác suất lí thuyết $\\dfrac{1}{2}$ và ít dao động hơn, nhưng không nhất thiết bằng đúng $0{,}5$.',
    },
  ],
  takeaways: [
    '=RANDBETWEEN(a;b) cho một số nguyên ngẫu nhiên từ $a$ đến $b$; kéo công thức xuống $n$ hàng là mô phỏng $n$ lần thử; F9 làm lại thí nghiệm.',
    '=COUNTIF(vùng;điều kiện) đếm số lần biến cố xảy ra; điều kiện so sánh đặt trong ngoặc kép, như ">4".',
    'Xác suất thực nghiệm $= \\dfrac{\\text{số lần biến cố xảy ra}}{\\text{số lần thử}}$; số lần thử càng lớn, nó thường càng gần xác suất lí thuyết.',
  ],
};
