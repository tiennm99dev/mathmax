/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: dùng bảng tính Excel nhập dữ liệu, lập bảng tần số bằng hàm COUNTIF, tính tần số tương đối, rồi vẽ biểu đồ cột và biểu đồ hình quạt tròn biểu diễn các bảng đó.',
  intro:
    'Lớp em có $30$ bạn bình chọn địa điểm dã ngoại: Tràng An, Ba Vì hay Đại Lải. Đếm tay $30$ phiếu thì còn được, nhưng với $300$ phiếu thì rất dễ nhầm. Bảng tính Excel đếm hộ ta bằng hàm COUNTIF, tính tần số tương đối và vẽ biểu đồ chỉ trong vài thao tác; khi sửa dữ liệu, bảng và biểu đồ tự cập nhật.',
  objectives: [
    'Nhập dữ liệu thống kê vào bảng tính và lập bảng tần số bằng hàm COUNTIF.',
    'Tính tần số tương đối bằng công thức và định dạng kết quả theo phần trăm.',
    'Hiểu vì sao cần địa chỉ tuyệt đối (có dấu \\$) khi sao chép công thức.',
    'Vẽ biểu đồ cột biểu diễn bảng tần số và biểu đồ hình quạt tròn biểu diễn bảng tần số tương đối.',
  ],
  sections: [
    {
      heading: 'Nhắc lại: tần số và tần số tương đối',
      blocks: [
        {
          type: 'p',
          text: 'Mẫu dữ liệu gồm $n$ giá trị, trong đó giá trị $x_i$ xuất hiện $m_i$ lần. Số $m_i$ là tần số của $x_i$; tổng các tần số bằng $n$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tần số tương đối',
          text: 'Tần số tương đối của giá trị $x_i$ là tỉ số $f_i = \\dfrac{m_i}{n}$, thường viết dưới dạng phần trăm: $f_i = \\dfrac{m_i}{n} \\cdot 100\\%$. Tổng các tần số tương đối bằng $100\\%$.',
        },
        {
          type: 'p',
          text: 'Bảng tần số thường được biểu diễn bằng biểu đồ cột (mỗi giá trị một cột, chiều cao là tần số). Bảng tần số tương đối thường được biểu diễn bằng biểu đồ hình quạt tròn, trong đó hình quạt của $x_i$ có góc ở tâm $f_i \\cdot 360^\\circ$.',
        },
      ],
    },
    {
      heading: 'Lập bảng tần số và tần số tương đối bằng Excel',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Nhập dữ liệu: gõ tiêu đề "Địa điểm" vào ô A1, rồi gõ $30$ ý kiến vào các ô từ A2 đến A31 (mỗi ô một ý kiến).',
            'Kẻ khung bảng tần số: gõ "Địa điểm", "Tần số", "Tần số tương đối" vào D1, E1, F1; gõ các giá trị Tràng An, Ba Vì, Đại Lải vào D2, D3, D4 và "Tổng" vào D5.',
            'Tính tần số: chọn ô E2, gõ =COUNTIF(\\$A\\$2:\\$A\\$31;D2) và nhấn Enter. Ô E2 hiện $15$.',
            'Kéo thả: đưa con trỏ chuột tới góc dưới bên phải ô E2 (con trỏ thành dấu +), kéo xuống tới ô E4 để sao chép công thức. E3 nhận =COUNTIF(\\$A\\$2:\\$A\\$31;D3), E4 nhận =COUNTIF(\\$A\\$2:\\$A\\$31;D4).',
            'Tính tổng: ở ô E5 gõ =SUM(E2:E4), được $30$.',
            'Tính tần số tương đối: ở ô F2 gõ =E2/\\$E\\$5, rồi kéo xuống F4. Chọn vùng F2:F5 và bấm nút % (Percent Style) trên thẻ Home để hiện kết quả dạng phần trăm.',
          ],
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hàm COUNTIF',
          text: '=COUNTIF(vùng; điều kiện) đếm số ô trong vùng thoả mãn điều kiện. Điều kiện có thể là một ô (D2), một chữ trong ngoặc kép ("Ba Vì"), một số ($7$) hoặc một phép so sánh trong ngoặc kép (">=8" đếm các ô có giá trị từ $8$ trở lên).',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Địa chỉ tương đối và tuyệt đối',
          text: 'Khi sao chép công thức xuống một hàng, Excel tăng mọi số hàng không có dấu \\$ đứng trước. Nếu viết =COUNTIF(A2:A31;D2) thì ô E3 sẽ nhận =COUNTIF(A3:A32;D3): vùng dữ liệu bị trượt và bỏ sót ô A2. Viết \\$A\\$2:\\$A\\$31 (nhấn F4 sau khi chọn vùng) để vùng dữ liệu đứng yên; ô tổng \\$E\\$5 trong công thức tần số tương đối cũng vậy.',
        },
        {
          type: 'table',
          head: ['Ô', 'Công thức', 'Kết quả'],
          rows: [
            ['E2', '=COUNTIF(\\$A\\$2:\\$A\\$31;D2)', '$15$'],
            ['E3', '=COUNTIF(\\$A\\$2:\\$A\\$31;D3)', '$10$'],
            ['E4', '=COUNTIF(\\$A\\$2:\\$A\\$31;D4)', '$5$'],
            ['E5', '=SUM(E2:E4)', '$30$'],
            ['F2', '=E2/\\$E\\$5', '$50\\%$'],
            ['F3', '=E3/\\$E\\$5', '$33{,}33\\%$'],
            ['F4', '=E4/\\$E\\$5', '$16{,}67\\%$'],
          ],
          caption: 'Bảng tần số và tần số tương đối của ý kiến chọn địa điểm dã ngoại.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Dấu phân cách',
          text: 'Với cài đặt vùng Việt Nam, Excel dùng dấu chấm phẩy ";" ngăn cách các đối số và dấu phẩy là dấu thập phân. Với cài đặt tiếng Anh, dùng dấu phẩy: =COUNTIF(\\$A\\$2:\\$A\\$31,D2). Bảng tính mô phỏng trong bài nhận cả hai cách.',
        },
      ],
    },
    {
      heading: 'Vẽ biểu đồ',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Biểu đồ cột (bảng tần số): chọn vùng D1:E4, vào thẻ Insert (Chèn), nhóm Charts, chọn Column (Biểu đồ cột).',
            'Biểu đồ hình quạt tròn (bảng tần số tương đối): chọn vùng D1:D4, giữ phím Ctrl và chọn thêm F1:F4, vào Insert, chọn Pie (Biểu đồ hình tròn).',
            'Hoàn thiện: bấm vào tiêu đề biểu đồ để sửa tên; bấm nút + cạnh biểu đồ, đánh dấu Data Labels để hiện số liệu trên từng cột hoặc hình quạt.',
          ],
        },
        {
          type: 'p',
          text: 'Biểu đồ được liên kết với bảng: khi sửa một ô dữ liệu ở cột A, hàm COUNTIF đếm lại, các ô tần số tương đối tính lại và biểu đồ tự vẽ lại. Với dữ liệu trên, hình quạt Tràng An có góc ở tâm $50\\% \\cdot 360^\\circ = 180^\\circ$, Ba Vì $120^\\circ$, Đại Lải $60^\\circ$.',
        },
        {
          type: 'p',
          text: 'Trong bảng tính mô phỏng bên dưới, em tự gõ công thức vào cột E, F, sao chép xuống, đổi dữ liệu và quan sát biểu đồ thay đổi.',
        },
      ],
    },
    {
      heading: 'Thực hành: khảo sát lớp em bằng Excel',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: thu thập một mẫu dữ liệu thật của lớp, dùng Excel lập bảng tần số, bảng tần số tương đối và vẽ hai biểu đồ, rồi trình bày nhận xét.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: máy tính có Excel (hoặc Google Trang tính, LibreOffice Calc có cùng hàm COUNTIF), phiếu khảo sát.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chọn một câu hỏi có ít phương án, ví dụ: "Em thích môn thể thao nào nhất?" hoặc "Em đến trường bằng phương tiện gì?". Thu ý kiến của cả lớp.',
            'Nhập dữ liệu vào cột A, mỗi ý kiến một ô. Kiểm tra chính tả để cùng một phương án được gõ giống nhau.',
            'Lập bảng tần số bằng COUNTIF với vùng dữ liệu cố định, tính tổng bằng SUM, kiểm tra tổng bằng số bạn tham gia.',
            'Lập bảng tần số tương đối bằng công thức chia cho ô tổng (địa chỉ tuyệt đối), định dạng phần trăm.',
            'Vẽ biểu đồ cột cho bảng tần số và biểu đồ hình quạt tròn cho bảng tần số tương đối, đặt tiêu đề và hiện nhãn số liệu.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: nộp tệp Excel (hoặc ảnh chụp màn hình) gồm dữ liệu, hai bảng và hai biểu đồ, kèm ba đến bốn câu nhận xét: phương án nào được chọn nhiều nhất, chiếm bao nhiêu phần trăm; tổng tần số tương đối có đúng $100\\%$ không; nếu có, sai lệch nhỏ do làm tròn ở đâu.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng tính mô phỏng',
    instruction:
      'Chọn ô E2, gõ công thức COUNTIF vào thanh công thức rồi bấm "Nhập" (hoặc phím Enter), sau đó bấm "Sao chép xuống dưới". Làm tương tự với ô tổng và cột F. Thử bỏ dấu \\$ để thấy công thức sai khi sao chép. Bấm vào một ô dữ liệu ở cột A để đổi giá trị và xem bảng, biểu đồ tự cập nhật.',
  },
  examples: [
    {
      problem:
        'Ở ô E2 gõ =COUNTIF(A2:A31;D2) (không có dấu \\$) rồi kéo xuống E4. Công thức ở ô E4 là gì, và vì sao kết quả có thể sai?',
      steps: [
        'Từ E2 xuống E4 là xuống $2$ hàng, nên mọi số hàng không có \\$ tăng thêm $2$.',
        'Ô E4 nhận =COUNTIF(A4:A33;D4).',
        'Vùng A4:A33 bỏ sót hai ô A2, A3 và lấy thêm hai ô trống A32, A33. Nếu A2 hoặc A3 có giá trị "Đại Lải" thì ô E4 đếm thiếu.',
      ],
      answer:
        'E4 chứa =COUNTIF(A4:A33;D4); phải viết =COUNTIF(\\$A\\$2:\\$A\\$31;D2) để vùng dữ liệu không trượt khi sao chép.',
    },
    {
      problem:
        'Điểm kiểm tra của $30$ bạn có tần số: điểm $5$: $3$; điểm $6$: $5$; điểm $7$: $8$; điểm $8$: $7$; điểm $9$: $5$; điểm $10$: $2$. Tính tần số tương đối của điểm $7$ và góc ở tâm của hình quạt tương ứng.',
      steps: [
        'Tần số tương đối: $f = \\dfrac{8}{30} \\cdot 100\\% \\approx 26{,}67\\%$. Trong Excel: =E4/\\$E\\$8 với E8 là ô tổng.',
        'Góc ở tâm: $\\dfrac{8}{30} \\cdot 360^\\circ = 96^\\circ$.',
      ],
      answer: 'Điểm $7$ chiếm khoảng $26{,}67\\%$, hình quạt có góc ở tâm $96^\\circ$.',
    },
    {
      problem:
        'Với mẫu điểm kiểm tra ở ví dụ trên (vùng A2:A31), viết công thức đếm số bạn đạt từ $8$ điểm trở lên và cho biết kết quả.',
      steps: [
        'Điều kiện "từ $8$ trở lên" viết là ">=8", đặt trong ngoặc kép.',
        'Công thức: =COUNTIF(\\$A\\$2:\\$A\\$31;">=8").',
        'Kết quả bằng tổng tần số của các điểm $8$, $9$, $10$: $7 + 5 + 2 = 14$.',
      ],
      answer: 'Công thức =COUNTIF(\\$A\\$2:\\$A\\$31;">=8") cho kết quả $14$.',
    },
  ],
  practice: [
    {
      type: 'text',
      prompt: 'Hàm nào của Excel đếm số ô trong một vùng thoả mãn một điều kiện cho trước?',
      accept: ['COUNTIF', 'COUNTIF()', 'hàm COUNTIF'],
      hints: ['Tên hàm ghép từ "đếm" (COUNT) và "nếu" (IF).'],
      solution: 'Hàm COUNTIF(vùng; điều kiện).',
    },
    {
      type: 'choice',
      prompt:
        'Dữ liệu ở A2:A31. Công thức nào đếm đúng số bạn chọn "Ba Vì" và vẫn đúng khi sao chép sang ô khác?',
      options: [
        '=COUNT(\\$A\\$2:\\$A\\$31;"Ba Vì")',
        '=COUNTIF(\\$A\\$2:\\$A\\$31;"Ba Vì")',
        '=COUNTIF("Ba Vì";\\$A\\$2:\\$A\\$31)',
        '=SUM(\\$A\\$2:\\$A\\$31;"Ba Vì")',
      ],
      answer: 1,
      hints: ['COUNTIF nhận vùng trước, điều kiện sau.', 'Hàm COUNT chỉ đếm các ô chứa số.'],
      solution:
        '=COUNTIF(\\$A\\$2:\\$A\\$31;"Ba Vì"): vùng đứng trước, điều kiện đứng sau; vùng có dấu \\$ nên không đổi khi sao chép.',
    },
    {
      type: 'choice',
      prompt:
        'Ô E2 chứa =COUNTIF(A2:A31;D2). Sao chép ô E2 xuống ô E3 thì ô E3 chứa công thức nào?',
      options: [
        '=COUNTIF(A2:A31;D3)',
        '=COUNTIF(A3:A32;D3)',
        '=COUNTIF(A2:A31;D2)',
        '=COUNTIF(A3:A32;D2)',
      ],
      answer: 1,
      hints: ['Xuống một hàng: mọi số hàng không có dấu \\$ tăng thêm $1$.'],
      solution:
        'Cả vùng A2:A31 và ô D2 đều là địa chỉ tương đối, nên ô E3 nhận =COUNTIF(A3:A32;D3); vùng dữ liệu bị trượt.',
    },
    {
      type: 'choice',
      prompt: 'Ô F2 chứa =E2/\\$E\\$5. Sao chép xuống ô F4 thì ô F4 chứa công thức nào?',
      options: ['=E4/\\$E\\$7', '=E2/\\$E\\$5', '=E4/\\$E\\$5', '=E4/E5'],
      answer: 2,
      hints: ['E2 là địa chỉ tương đối, \\$E\\$5 là địa chỉ tuyệt đối.'],
      solution: 'E2 tăng hai hàng thành E4, còn \\$E\\$5 giữ nguyên: =E4/\\$E\\$5.',
    },
    {
      type: 'number',
      prompt:
        'Ô E3 bằng $10$, ô tổng E5 bằng $30$. Ô F3 chứa =E3/\\$E\\$5 và được định dạng phần trăm với hai chữ số thập phân. Ô F3 hiện bao nhiêu phần trăm?',
      answer: 33.33,
      tolerance: 0.005,
      unit: '%',
      hints: ['Tính $\\dfrac{10}{30}$ rồi nhân với $100\\%$.', 'Làm tròn đến hàng phần trăm.'],
      solution: '$\\dfrac{10}{30} \\cdot 100\\% = 33{,}333\\ldots\\% \\approx 33{,}33\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Bảng tần số điểm kiểm tra của $30$ bạn: điểm $5$: $3$; $6$: $5$; $7$: $8$; $8$: $7$; $9$: $5$; $10$: $2$. Công thức =COUNTIF(\\$A\\$2:\\$A\\$31;"<7") cho kết quả bao nhiêu?',
      answer: 8,
      hints: ['"<7" là các điểm nhỏ hơn $7$, tức điểm $5$ và điểm $6$.'],
      solution: 'Số bạn có điểm nhỏ hơn $7$: $3 + 5 = 8$.',
    },
    {
      type: 'number',
      prompt:
        'Trong biểu đồ hình quạt tròn, phương án có tần số tương đối $15\\%$ ứng với hình quạt có góc ở tâm bao nhiêu độ?',
      answer: 54,
      unit: '°',
      hints: ['Góc ở tâm bằng tần số tương đối nhân với $360^\\circ$.'],
      solution: '$15\\% \\cdot 360^\\circ = 0{,}15 \\cdot 360^\\circ = 54^\\circ$.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi công thức với việc nó làm (dữ liệu ở A2:A31, tần số ở E2:E4).',
      left: ['=COUNTIF(\\$A\\$2:\\$A\\$31;D2)', '=SUM(E2:E4)', '=COUNTA(A2:A31)', '=E2/\\$E\\$5'],
      right: [
        'Đếm số ô trong vùng dữ liệu có cùng giá trị với ô D2',
        'Tính tổng các tần số',
        'Đếm số ô không trống trong vùng dữ liệu',
        'Tính tần số tương đối của giá trị ở hàng 2',
        'Tính trung bình cộng các tần số',
      ],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['COUNTA đếm mọi ô có dữ liệu, kể cả chữ; SUM cộng các số.'],
      solution:
        'COUNTIF đếm theo điều kiện; SUM cộng các tần số; COUNTA đếm ô không trống (bằng cỡ mẫu $n$); chia tần số cho tổng được tần số tương đối.',
    },
    {
      type: 'choice',
      prompt:
        'Nên dùng loại biểu đồ nào để biểu diễn bảng tần số tương đối, cho thấy mỗi phương án chiếm bao nhiêu phần của cả lớp?',
      options: [
        'Biểu đồ hình quạt tròn',
        'Biểu đồ đoạn thẳng',
        'Biểu đồ tranh',
        'Không vẽ được bằng Excel',
      ],
      answer: 0,
      hints: ['Cả hình tròn ứng với $100\\%$.'],
      solution:
        'Biểu đồ hình quạt tròn: cả hình tròn là $100\\%$, mỗi hình quạt ứng với tần số tương đối của một phương án.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước vẽ biểu đồ cột cho bảng tần số trong Excel.',
      items: [
        'Vào thẻ Insert, chọn Column.',
        'Lập bảng tần số ở vùng D1:E4.',
        'Sửa tiêu đề và hiện nhãn số liệu (Data Labels).',
        'Chọn vùng D1:E4.',
      ],
      answer: [1, 3, 0, 2],
      hints: ['Phải có bảng và chọn vùng dữ liệu trước khi chèn biểu đồ.'],
      solution:
        'Lập bảng tần số, chọn vùng D1:E4, vào Insert chọn Column, rồi hoàn thiện tiêu đề và nhãn số liệu.',
    },
  ],
  takeaways: [
    '=COUNTIF(vùng; điều kiện) đếm số ô của vùng thoả mãn điều kiện: dùng nó để lập bảng tần số.',
    'Viết vùng dữ liệu và ô tổng bằng địa chỉ tuyệt đối (\\$A\\$2:\\$A\\$31, \\$E\\$5) để sao chép công thức không bị trượt.',
    'Tần số tương đối = tần số : tổng số; định dạng ô theo phần trăm để đọc dễ hơn.',
    'Biểu đồ cột biểu diễn bảng tần số, biểu đồ hình quạt tròn biểu diễn bảng tần số tương đối; biểu đồ tự cập nhật khi dữ liệu thay đổi.',
  ],
};
