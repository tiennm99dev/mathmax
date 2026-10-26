/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đọc và phân tích số liệu trên biểu đồ: tìm giá trị lớn nhất, nhỏ nhất, mức tăng giảm, tỉ lệ, xu hướng; nhận biết biểu đồ gây hiểu lầm do trục đứng không bắt đầu từ 0 hoặc chia tỉ lệ khác nhau.',
  intro:
    'Một quảng cáo vẽ biểu đồ cột: cột của sản phẩm A cao gấp ba lần cột của sản phẩm B. Nhìn kĩ mới thấy trục đứng bắt đầu từ $90$, và A chỉ hơn B có vài phần trăm. Biểu đồ giúp ta nhìn nhanh, nhưng cũng có thể đánh lừa mắt. Bài này giúp em rút ra thông tin đúng từ biểu đồ và nhận ra những biểu đồ gây hiểu lầm.',
  objectives: [
    'Đọc số liệu trên biểu đồ và tính toán: hiệu, tỉ số, tỉ lệ phần trăm, mức tăng giảm.',
    'Phát hiện xu hướng, quy luật đơn giản và rút ra kết luận từ biểu đồ.',
    'Nhận biết biểu đồ gây hiểu lầm khi trục đứng không bắt đầu từ $0$ hoặc được chia theo tỉ lệ khác.',
  ],
  sections: [
    {
      heading: 'Phân tích số liệu dựa vào biểu đồ',
      blocks: [
        {
          type: 'p',
          text: 'Phân tích số liệu trên một biểu đồ, ta thường làm theo các bước sau.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Đọc tiêu đề, đơn vị, các trục và chú giải để biết biểu đồ nói về điều gì.',
            'Đọc số liệu: giá trị của từng đối tượng hay từng thời điểm; giá trị lớn nhất, nhỏ nhất.',
            'Tính toán: tổng, hiệu (mức tăng, giảm), tỉ số (gấp bao nhiêu lần), tỉ lệ phần trăm, trung bình.',
            'Nhận xét xu hướng (tăng, giảm, ổn định) và rút ra kết luận, đề xuất.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mỗi loại biểu đồ cho biết điều gì',
          text: 'Biểu đồ cột (cột kép, tranh): so sánh các đối tượng. Biểu đồ hình quạt tròn: tỉ lệ các phần, số lượng mỗi phần $= \\text{tổng} \\cdot \\dfrac{a}{100}$. Biểu đồ đoạn thẳng: đoạn đi lên là tăng, đi xuống là giảm, càng dốc thì thay đổi càng nhanh (khi trục được chia đều và đúng).',
        },
        {
          type: 'p',
          text: 'Biểu đồ dưới đây được dùng trong Ví dụ 1.',
        },
        { type: 'widget', name: 'doc-bieu-do' },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mức tăng (giảm) theo phần trăm',
          text: 'Đại lượng thay đổi từ $a$ đến $b$ thì mức thay đổi so với lúc đầu là $\\dfrac{b - a}{a} \\cdot 100\\%$ (tăng nếu $b > a$, giảm nếu $b < a$).',
        },
      ],
    },
    {
      heading: 'Biểu đồ gây hiểu lầm',
      blocks: [
        {
          type: 'p',
          text: 'Một biểu đồ có thể vẽ đúng số liệu nhưng vẫn làm người xem hiểu sai. Hai cách hay gặp:',
        },
        {
          type: 'list',
          items: [
            'Trục đứng của biểu đồ cột không bắt đầu từ $0$: chiều cao các cột không còn tỉ lệ với số liệu, chênh lệch nhỏ trông rất lớn.',
            'Trục đứng của biểu đồ đoạn thẳng bị cắt hoặc chia theo tỉ lệ khác: cùng một số liệu, đường gấp khúc có thể trông rất dốc hoặc gần như nằm ngang.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Trước khi kết luận',
          text: 'Luôn đọc trục đứng: bắt đầu từ đâu, mỗi vạch chia ứng với bao nhiêu. Rồi so sánh bằng số liệu, không chỉ bằng mắt: cột cao gấp ba lần chưa chắc số liệu gấp ba lần.',
        },
        {
          type: 'p',
          text: 'Phần Khám phá cho em kéo điểm bắt đầu của trục đứng và xem cùng một số liệu thay đổi "thông điệp" thế nào.',
        },
      ],
    },
  ],
  explore: {
    title: 'Trục đứng bắt đầu từ đâu?',
    instruction:
      'Kéo thanh trượt để đổi giá trị bắt đầu của trục đứng. Quan sát chiều cao các cột (độ dốc của đường) và đọc nhận xét: hình vẽ nói gì, số liệu thật nói gì. Thử với cả biểu đồ cột và biểu đồ đoạn thẳng.',
  },
  examples: [
    {
      problem:
        'Biểu đồ đoạn thẳng ở trên cho số lượt mượn sách của thư viện trường: tháng 9: $320$; tháng 10: $410$; tháng 11: $450$; tháng 12: $380$; tháng 1: $300$. a) Tháng nào có nhiều lượt mượn nhất? b) Từ tháng 9 đến tháng 11, số lượt mượn tăng bao nhiêu? c) Nhận xét xu hướng.',
      steps: [
        'a) Điểm cao nhất của đường gấp khúc ứng với tháng 11: $450$ lượt.',
        'b) Mức tăng: $450 - 320 = 130$ (lượt).',
        'c) Từ tháng 9 đến tháng 11 đường đi lên (số lượt mượn tăng), từ tháng 11 đến tháng 1 đường đi xuống (giảm $450 - 300 = 150$ lượt).',
        'Có thể giải thích: cuối học kì I (tháng 12, tháng 1) học sinh bận ôn thi nên mượn ít sách hơn.',
      ],
      answer:
        'a) Tháng 11; b) Tăng $130$ lượt; c) Tăng từ tháng 9 đến tháng 11 rồi giảm dần đến tháng 1.',
    },
    {
      problem:
        'Một biểu đồ cột có trục đứng bắt đầu từ $90$ biểu diễn số sản phẩm bán được: An $96$, Dũng $108$. Trên hình, cột của Dũng cao gấp mấy lần cột của An? Thực tế Dũng bán được gấp mấy lần An? Biểu đồ có gây hiểu lầm không?',
      steps: [
        'Vì trục bắt đầu từ $90$, phần cột nhìn thấy ứng với $96 - 90 = 6$ (An) và $108 - 90 = 18$ (Dũng).',
        'Trên hình, cột của Dũng cao gấp $18 : 6 = 3$ lần cột của An.',
        'Thực tế: $108 : 96 = 1{,}125$, tức Dũng chỉ bán nhiều hơn An $12{,}5\\%$.',
      ],
      answer:
        'Trên hình gấp $3$ lần nhưng thực tế chỉ gấp $1{,}125$ lần: biểu đồ gây hiểu lầm vì trục đứng không bắt đầu từ $0$.',
    },
    {
      problem:
        'Biểu đồ hình quạt tròn cho kết quả học tập của $200$ học sinh khối 8: Tốt $25\\%$, Khá $40\\%$, Đạt $30\\%$, Chưa đạt $5\\%$. Có bao nhiêu học sinh đạt kết quả Tốt hoặc Khá? Bao nhiêu học sinh Chưa đạt?',
      steps: [
        'Kiểm tra: $25\\% + 40\\% + 30\\% + 5\\% = 100\\%$, dữ liệu hợp lí.',
        'Tốt hoặc Khá chiếm $25\\% + 40\\% = 65\\%$, nên có $200 \\cdot \\dfrac{65}{100} = 130$ (học sinh).',
        'Chưa đạt: $200 \\cdot \\dfrac{5}{100} = 10$ (học sinh).',
      ],
      answer: '$130$ học sinh Tốt hoặc Khá; $10$ học sinh Chưa đạt.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Biểu đồ đoạn thẳng cho doanh thu (triệu đồng) của một cửa hàng từ tháng 1 đến tháng 6 lần lượt là: $120$; $135$; $150$; $140$; $165$; $180$. Doanh thu tháng 6 tăng bao nhiêu triệu đồng so với tháng 1?',
      answer: 60,
      unit: 'triệu đồng',
      hints: ['Mức tăng là hiệu của hai giá trị.'],
      solution: '$180 - 120 = 60$ (triệu đồng).',
    },
    {
      type: 'choice',
      prompt:
        'Với biểu đồ doanh thu ở câu trên ($120$; $135$; $150$; $140$; $165$; $180$ từ tháng 1 đến tháng 6), doanh thu giảm so với tháng liền trước ở tháng nào?',
      options: ['Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5'],
      answer: 2,
      hints: ['Tìm đoạn thẳng đi xuống.'],
      solution:
        'Từ tháng 3 ($150$) đến tháng 4 ($140$) doanh thu giảm $10$ triệu đồng; các tháng khác đều tăng. Vậy tháng 4 giảm so với tháng 3.',
    },
    {
      type: 'number',
      prompt: 'Cũng với biểu đồ đó, doanh thu tháng 6 tăng bao nhiêu phần trăm so với tháng 1?',
      answer: 50,
      unit: '%',
      hints: ['Mức tăng phần trăm $= \\dfrac{b - a}{a} \\cdot 100\\%$.'],
      solution: '$\\dfrac{180 - 120}{120} \\cdot 100\\% = \\dfrac{60}{120} \\cdot 100\\% = 50\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Một biểu đồ cột có trục đứng bắt đầu từ $50$. Cột A biểu diễn $60$, cột B biểu diễn $80$. Trên hình, cột B cao gấp mấy lần cột A?',
      answer: 3,
      hints: ['Phần cột nhìn thấy bắt đầu từ $50$, không phải từ $0$.'],
      solution:
        'Phần cột nhìn thấy: A cao $60 - 50 = 10$, B cao $80 - 50 = 30$. Trên hình B cao gấp $30 : 10 = 3$ lần A, dù thực tế $80 : 60$ chỉ gấp khoảng $1{,}33$ lần.',
    },
    {
      type: 'choice',
      prompt:
        'Một biểu đồ cột so sánh giá bán của hai hãng: hãng X $1\\,020$ nghìn đồng, hãng Y $1\\,000$ nghìn đồng, nhưng cột của X cao gấp đôi cột của Y. Lí do có thể nhất là gì?',
      options: [
        'Số liệu bị ghi sai',
        'Trục đứng không bắt đầu từ $0$',
        'Biểu đồ cột không dùng được cho giá tiền',
        'Hãng X đắt gấp đôi hãng Y',
      ],
      answer: 1,
      hints: ['$1\\,020$ và $1\\,000$ chênh nhau bao nhiêu phần trăm?'],
      solution:
        'X chỉ đắt hơn Y $20$ nghìn đồng, tức $2\\%$. Cột X cao gấp đôi cột Y chỉ có thể do trục đứng bị cắt, chẳng hạn bắt đầu từ $980$: phần cột nhìn thấy là $40$ và $20$.',
    },
    {
      type: 'number',
      prompt:
        'Biểu đồ hình quạt tròn về môn thể thao yêu thích của $200$ học sinh cho biết bóng đá chiếm $35\\%$. Có bao nhiêu học sinh thích bóng đá?',
      answer: 70,
      unit: 'học sinh',
      hints: ['Số học sinh $= 200 \\cdot \\dfrac{35}{100}$.'],
      solution: '$200 \\cdot \\dfrac{35}{100} = 70$ (học sinh).',
    },
    {
      type: 'multi',
      prompt:
        'Số học sinh đạt giải học sinh giỏi cấp thành phố của một trường từ năm 2020 đến năm 2024 lần lượt là $8$; $10$; $10$; $14$; $16$. Chọn tất cả các nhận xét đúng.',
      options: [
        'Số học sinh đạt giải có xu hướng tăng',
        'Năm 2022 không tăng so với năm 2021',
        'Năm 2024 số học sinh đạt giải gấp đôi năm 2020',
        'Số học sinh đạt giải giảm từ năm 2023 đến năm 2024',
      ],
      answers: [0, 1, 2],
      hints: ['So sánh từng cặp năm liền nhau.', '$16 : 8 = ?$'],
      solution:
        'Số liệu nhìn chung tăng từ $8$ lên $16$; năm 2022 bằng năm 2021 ($10$); $16 = 2 \\cdot 8$ nên năm 2024 gấp đôi năm 2020. Từ 2023 đến 2024 tăng từ $14$ lên $16$, không giảm.',
    },
    {
      type: 'choice',
      prompt:
        'Hai biểu đồ đoạn thẳng biểu diễn cùng một bảng số liệu về số sản phẩm bán được trong $12$ tháng, nhưng một đường trông rất dốc, đường kia gần như nằm ngang. Nhận xét nào đúng?',
      options: [
        'Một trong hai biểu đồ đã vẽ sai số liệu',
        'Số liệu như nhau; hình dạng khác nhau do trục đứng được chia theo tỉ lệ khác nhau',
        'Đường dốc hơn cho biết số sản phẩm bán được nhiều hơn',
      ],
      answer: 1,
      hints: ['Đọc lại số liệu trên hai biểu đồ, rồi so sánh trục đứng.'],
      solution:
        'Hai biểu đồ cùng số liệu. Đường dốc hay thoải tuỳ vào điểm bắt đầu và khoảng chia của trục đứng, nên khi đọc phải xem trục đứng trước khi kết luận tăng nhanh hay chậm.',
    },
  ],
  takeaways: [
    'Đọc tiêu đề, đơn vị và các trục trước khi đọc số liệu.',
    'Mức thay đổi từ $a$ đến $b$ là $b - a$; theo phần trăm là $\\dfrac{b - a}{a} \\cdot 100\\%$.',
    'Trục đứng không bắt đầu từ $0$ hoặc chia tỉ lệ khác làm chênh lệch trông lớn hơn (hoặc nhỏ hơn) thực tế.',
    'Kết luận bằng số liệu, không chỉ bằng chiều cao cột hay độ dốc của đường.',
  ],
};
