/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: khảo sát các bạn trong trường về môn thể thao yêu thích trong hè, thu thập dữ liệu bằng phiếu hỏi, lập bảng thống kê, vẽ biểu đồ cột và cột kép rồi phân tích để rút ra kết luận.',
  intro:
    'Mùa hè là dịp để các bạn học sinh chơi thể thao. Nhà trường muốn tổ chức các câu lạc bộ thể thao trong hè cho phù hợp nên cần biết: môn nào được nhiều bạn thích nhất, các bạn nam và nữ, các bạn khối nhỏ và khối lớn có thích giống nhau không. Muốn trả lời, ta làm một cuộc khảo sát thống kê thật sự: đặt câu hỏi, thu thập dữ liệu, lập bảng, vẽ biểu đồ và phân tích.',
  objectives: [
    'Đặt câu hỏi khảo sát và chọn cách thu thập dữ liệu: phiếu hỏi, biểu mẫu trực tuyến, phỏng vấn.',
    'Tổng hợp dữ liệu vào các bảng thống kê.',
    'Biểu diễn dữ liệu bằng biểu đồ cột và biểu đồ cột kép.',
    'Đọc bảng, biểu đồ để trả lời câu hỏi khảo sát và đưa ra đề xuất.',
  ],
  sections: [
    {
      heading: 'Câu hỏi khảo sát và cách thu thập dữ liệu',
      blocks: [
        {
          type: 'p',
          text: 'Cuộc khảo sát cần trả lời ba câu hỏi:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Môn thể thao nào được các bạn học sinh muốn chọn nhất trong hè?',
            'Các bạn nam và các bạn nữ thích những môn thể thao nào?',
            'Lựa chọn của học sinh khối 6, 7 và học sinh khối 8, 9 có khác nhau không?',
          ],
        },
        {
          type: 'p',
          text: 'Mỗi bạn được hỏi cho biết giới tính, khối lớp và môn thể thao mình thích nhất. Có ba cách thu thập dữ liệu:',
        },
        {
          type: 'table',
          head: ['Cách thu thập', 'Làm thế nào'],
          rows: [
            ['Phiếu hỏi', 'Soạn phiếu trên máy tính, in ra, phát cho các bạn điền rồi thu lại.'],
            [
              'Biểu mẫu trực tuyến',
              'Tạo biểu mẫu bằng Google Forms (cần tài khoản Google), gửi đường liên kết qua thư điện tử hoặc tin nhắn; kết quả hiện ở mục Câu trả lời.',
            ],
            ['Phỏng vấn trực tiếp', 'Hỏi từng bạn và ghi câu trả lời vào bảng.'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chọn người được hỏi',
          text: 'Không thể hỏi hết mọi bạn trong trường, nhưng nhóm được hỏi phải đại diện được cho cả trường: nên chọn số bạn nam và số bạn nữ gần bằng nhau, số bạn khối 6, 7 và số bạn khối 8, 9 gần bằng nhau. Nếu chỉ hỏi các bạn trong đội bóng đá, kết quả sẽ bị lệch.',
        },
      ],
    },
    {
      heading: 'Lập bảng thống kê và vẽ biểu đồ',
      blocks: [
        {
          type: 'p',
          text: 'Trường THCS Nguyễn Du có $1\\,730$ học sinh, trong đó $1\\,200$ bạn tham gia khảo sát. Kết quả được tổng hợp vào các bảng thống kê dưới đây.',
        },
        {
          type: 'table',
          head: ['Môn thể thao', 'Cả trường', 'Nam', 'Nữ', 'Khối 6–7', 'Khối 8–9'],
          rows: [
            ['Bóng đá', '$670$', '$580$', '$90$', '$280$', '$390$'],
            ['Đá cầu', '$150$', '$90$', '$60$', '$85$', '$65$'],
            ['Cầu lông', '$78$', '$48$', '$30$', '$28$', '$50$'],
            ['Điền kinh', '$55$', '$32$', '$23$', '$25$', '$30$'],
            ['Bóng rổ', '$60$', '$45$', '$15$', '$22$', '$38$'],
            ['Bóng chuyền', '$90$', '$40$', '$50$', '$20$', '$70$'],
            ['Thể dục nhịp điệu', '$30$', '$0$', '$30$', '$17$', '$13$'],
            ['Môn khác', '$67$', '$37$', '$30$', '$25$', '$42$'],
            ['Tổng', '$1\\,200$', '$872$', '$328$', '$502$', '$698$'],
          ],
          caption: 'Số học sinh chọn mỗi môn thể thao (Trường THCS Nguyễn Du).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Chọn biểu đồ',
          text: 'Bảng thống kê cả trường (một dãy số liệu) được biểu diễn bằng biểu đồ cột. Bảng nam – nữ, bảng khối 6–7 – khối 8–9 (hai dãy số liệu trên cùng các môn) được biểu diễn bằng biểu đồ cột kép để dễ so sánh. Có thể vẽ tay trên giấy kẻ ô hoặc vẽ bằng phần mềm bảng tính Excel.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Kiểm tra số liệu trước khi vẽ: ở mỗi môn, số bạn nam cộng số bạn nữ phải bằng số bạn cả trường, và số bạn khối 6–7 cộng số bạn khối 8–9 cũng vậy. Chẳng hạn bóng đá: $580 + 90 = 280 + 390 = 670$.',
        },
      ],
    },
    {
      heading: 'Phân tích dữ liệu',
      blocks: [
        {
          type: 'list',
          items: [
            'Cả trường: bóng đá được chọn nhiều nhất ($670$ trên $1\\,200$ bạn, hơn một nửa), sau đó là đá cầu ($150$ bạn).',
            'Các bạn nam thích nhất bóng đá, đá cầu, cầu lông; các bạn nữ thích nhất bóng đá, đá cầu, bóng chuyền.',
            'Khối 6–7 thích bóng đá, đá cầu, cầu lông; khối 8–9 thích bóng đá, bóng chuyền, đá cầu, cầu lông. Bóng chuyền được khối 8–9 chọn nhiều hơn hẳn ($70$ bạn so với $20$ bạn).',
          ],
        },
        {
          type: 'p',
          text: 'Từ đó có thể đề xuất với nhà trường: mở câu lạc bộ bóng đá cho cả nam và nữ, mở thêm lớp đá cầu, và lớp bóng chuyền cho các bạn khối 8, 9.',
        },
      ],
    },
    {
      heading: 'Nhiệm vụ: khảo sát trường em',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: tìm hiểu môn thể thao các bạn trong trường em yêu thích trong hè và đề xuất với nhà trường cách tổ chức hoạt động hè.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: giấy, bút, thước kẻ; danh sách học sinh các lớp; máy tính có máy in và kết nối Internet (nếu có).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chia nhóm. Mỗi nhóm thống nhất danh sách các môn thể thao trên phiếu (thêm ô "Môn khác") và chọn các bạn được hỏi sao cho nam, nữ và các khối gần bằng nhau.',
            'Thu thập dữ liệu bằng phiếu hỏi in sẵn, bằng biểu mẫu Google Forms hoặc phỏng vấn trực tiếp.',
            'Lập ba bảng thống kê: số bạn chọn mỗi môn; số bạn nam, nữ chọn mỗi môn; số bạn khối 6–7, khối 8–9 chọn mỗi môn. Kiểm tra các tổng.',
            'Vẽ biểu đồ cột cho bảng thứ nhất và biểu đồ cột kép cho hai bảng còn lại (vẽ tay hoặc bằng Excel).',
            'Trả lời ba câu hỏi khảo sát dựa vào bảng và biểu đồ.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: mẫu phiếu hỏi, số bạn được hỏi, ba bảng thống kê, các biểu đồ, câu trả lời cho ba câu hỏi và kiến nghị gửi nhà trường hoặc địa phương về việc tổ chức các hoạt động thể thao trong hè.',
        },
      ],
    },
  ],
  explore: {
    title: 'Khảo sát ảo',
    instruction:
      'Điền phiếu hỏi cho từng bạn (giới tính, khối, môn thích nhất) rồi bấm "Ghi phiếu", hoặc thêm nhanh $20$ phiếu của các bạn khác. Bảng thống kê và biểu đồ tự cập nhật; chọn "Nam – Nữ" hay "Theo khối" để xem biểu đồ cột kép. Chuyển sang dữ liệu của Trường THCS Nguyễn Du để so sánh với sách.',
  },
  examples: [
    {
      problem:
        'Ở Trường THCS Nguyễn Du, có bao nhiêu phần trăm số bạn tham gia khảo sát chọn bóng đá? Làm tròn đến hàng phần mười.',
      steps: [
        'Số bạn tham gia khảo sát: $1\\,200$; số bạn chọn bóng đá: $670$.',
        'Tỉ số phần trăm: $\\dfrac{670}{1\\,200} \\cdot 100\\% = 55{,}83\\ldots\\%$.',
        'Làm tròn đến hàng phần mười: $55{,}8\\%$.',
      ],
      answer: 'Khoảng $55{,}8\\%$ số bạn được hỏi chọn bóng đá, tức là hơn một nửa.',
    },
    {
      problem:
        'Dựa vào bảng khối 6–7 và khối 8–9, môn nào cho thấy rõ nhất sự khác nhau giữa hai nhóm? Vì sao nên dùng biểu đồ cột kép để thấy điều đó?',
      steps: [
        'So sánh từng môn: bóng đá $280$ và $390$; đá cầu $85$ và $65$; bóng chuyền $20$ và $70$; các môn khác chênh nhau ít.',
        'Bóng chuyền: khối 8–9 có $70$ bạn chọn, gấp $70 : 20 = 3{,}5$ lần khối 6–7.',
        'Trên biểu đồ cột kép, hai cột của cùng một môn đứng cạnh nhau nên nhìn là thấy cột khối 8–9 cao hơn hẳn ở môn bóng chuyền.',
      ],
      answer:
        'Bóng chuyền: khối 8–9 chọn gấp $3{,}5$ lần khối 6–7. Biểu đồ cột kép đặt hai dãy số liệu cạnh nhau nên dễ so sánh.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Trường THCS Nguyễn Du có $1\\,730$ học sinh, trong đó $1\\,200$ bạn tham gia khảo sát. Có bao nhiêu bạn không tham gia khảo sát?',
      answer: 530,
      unit: 'học sinh',
      hints: ['Lấy số học sinh của trường trừ đi số bạn tham gia.'],
      solution: '$1\\,730 - 1\\,200 = 530$ (học sinh).',
    },
    {
      type: 'choice',
      prompt:
        'Theo bảng của Trường THCS Nguyễn Du, môn thể thao nào được các bạn học sinh nữ chọn nhiều thứ ba?',
      options: ['Đá cầu', 'Cầu lông', 'Bóng chuyền', 'Thể dục nhịp điệu'],
      answer: 2,
      hints: [
        'Đọc cột "Nữ" và sắp xếp các số từ lớn đến bé.',
        'Hai số lớn nhất là $90$ (bóng đá) và $60$ (đá cầu).',
      ],
      solution:
        'Cột "Nữ": bóng đá $90$, đá cầu $60$, bóng chuyền $50$, rồi đến cầu lông, thể dục nhịp điệu, môn khác cùng $30$. Môn thứ ba là bóng chuyền.',
    },
    {
      type: 'number',
      prompt: 'Ở môn bóng chuyền, số bạn nữ chọn nhiều hơn số bạn nam chọn bao nhiêu bạn?',
      answer: 10,
      hints: ['Tìm hàng "Bóng chuyền" trong bảng, đọc cột "Nam" và cột "Nữ".'],
      solution: 'Nữ $50$ bạn, nam $40$ bạn: nhiều hơn $50 - 40 = 10$ bạn.',
    },
    {
      type: 'number',
      prompt:
        'Khối 6–7 có $502$ bạn tham gia khảo sát, trong đó $280$ bạn chọn bóng đá. Có bao nhiêu bạn khối 6–7 chọn các môn khác bóng đá?',
      answer: 222,
      hints: ['Lấy tổng số bạn khối 6–7 trừ số bạn chọn bóng đá.'],
      solution: '$502 - 280 = 222$ (bạn).',
    },
    {
      type: 'number',
      prompt:
        'Số bạn khối 8–9 chọn bóng chuyền gấp bao nhiêu lần số bạn khối 6–7 chọn bóng chuyền? (Khối 8–9: $70$ bạn, khối 6–7: $20$ bạn.)',
      answer: 3.5,
      hints: ['"Gấp bao nhiêu lần" thì lấy số lớn chia cho số bé.'],
      solution: '$70 : 20 = 3{,}5$ (lần).',
    },
    {
      type: 'choice',
      prompt:
        'Muốn so sánh số bạn nam và số bạn nữ chọn mỗi môn thể thao trên cùng một hình, em nên dùng loại biểu đồ nào?',
      options: ['Biểu đồ tranh', 'Biểu đồ cột', 'Biểu đồ cột kép', 'Chỉ cần một bảng số'],
      answer: 2,
      hints: ['Mỗi môn có hai số liệu (nam và nữ) cần đặt cạnh nhau.'],
      solution:
        'Có hai dãy số liệu trên cùng các môn, nên dùng biểu đồ cột kép: hai cột nam, nữ của mỗi môn đứng cạnh nhau.',
    },
    {
      type: 'multi',
      prompt: 'Những cách nào dùng được để thu thập dữ liệu cho cuộc khảo sát này?',
      options: [
        'Phát phiếu hỏi in sẵn cho các bạn điền',
        'Gửi biểu mẫu Google Forms qua tin nhắn',
        'Phỏng vấn trực tiếp từng bạn và ghi vào bảng',
        'Tự đoán môn mà các bạn thích',
        'Chỉ hỏi các bạn trong đội bóng đá của trường',
      ],
      answers: [0, 1, 2],
      hints: [
        'Dữ liệu phải do chính các bạn được hỏi trả lời.',
        'Nhóm được hỏi phải đại diện cho cả trường.',
      ],
      solution:
        'Phiếu hỏi, biểu mẫu trực tuyến và phỏng vấn đều thu được câu trả lời của chính các bạn. Tự đoán không phải là dữ liệu; chỉ hỏi đội bóng đá thì kết quả bị lệch về bóng đá.',
    },
    {
      type: 'number',
      prompt:
        'Khảo sát $1\\,200$ bạn thì có $150$ bạn chọn đá cầu. Môn đá cầu chiếm bao nhiêu phần trăm số phiếu?',
      answer: 12.5,
      unit: '%',
      hints: ['Tính $\\dfrac{150}{1\\,200} \\cdot 100$.'],
      solution: '$\\dfrac{150}{1\\,200} \\cdot 100\\% = 12{,}5\\%$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước của cuộc khảo sát theo đúng thứ tự.',
      items: [
        'Vẽ biểu đồ cột và biểu đồ cột kép.',
        'Đặt câu hỏi khảo sát và soạn phiếu hỏi.',
        'Phân tích, trả lời câu hỏi và đưa ra kiến nghị.',
        'Thu thập dữ liệu.',
        'Lập các bảng thống kê.',
      ],
      answer: [1, 3, 4, 0, 2],
      hints: ['Có dữ liệu rồi mới lập bảng; có bảng rồi mới vẽ biểu đồ.'],
      solution:
        'Đặt câu hỏi, soạn phiếu → thu thập dữ liệu → lập bảng → vẽ biểu đồ → phân tích, kiến nghị.',
    },
  ],
  takeaways: [
    'Một cuộc khảo sát gồm: đặt câu hỏi, thu thập dữ liệu, lập bảng thống kê, vẽ biểu đồ, phân tích và kết luận.',
    'Thu thập dữ liệu bằng phiếu hỏi, biểu mẫu trực tuyến hoặc phỏng vấn; nhóm được hỏi phải đại diện được cho cả trường.',
    'Một dãy số liệu: biểu đồ cột. Hai dãy số liệu trên cùng các đối tượng: biểu đồ cột kép.',
    'Kiểm tra các tổng trong bảng trước khi vẽ và trước khi kết luận.',
  ],
};
