/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tỉ số và tỉ số phần trăm của hai số, hai bài toán về tỉ số phần trăm và ứng dụng vào giảm giá, lãi suất tiết kiệm, thuế.',
  intro:
    'Một cửa hàng treo biển "Giảm giá $25\\%$ tất cả các mặt hàng". Chiếc áo khoác giá $460\\,000$ đồng, vậy giờ còn bao nhiêu tiền? Bố gửi tiết kiệm $10$ triệu đồng với lãi suất $6{,}5\\%$ một năm thì sau một năm được bao nhiêu tiền lãi? Những câu hỏi như thế xuất hiện hằng ngày, và đều giải được bằng tỉ số phần trăm.',
  objectives: [
    'Hiểu tỉ số và tỉ số phần trăm của hai số, hai đại lượng; tính được tỉ số phần trăm.',
    'Tìm giá trị phần trăm của một số cho trước.',
    'Tìm một số khi biết giá trị phần trăm của nó.',
    'Giải các bài toán thực tế về giảm giá, lãi suất, thuế, nồng độ.',
  ],
  sections: [
    {
      heading: 'Tỉ số và tỉ số phần trăm',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tỉ số',
          text: 'Tỉ số của $a$ và $b$ ($b \\ne 0$) là thương của phép chia $a$ cho $b$, kí hiệu là $a : b$ hoặc $\\frac{a}{b}$.',
        },
        {
          type: 'p',
          text: 'Tỉ số thường được dùng khi nói về thương của hai đại lượng cùng loại và cùng đơn vị đo: tỉ số của hai đại lượng là tỉ số giữa hai số đo của chúng. Chẳng hạn chiều dài $1{,}2$ m và chiều rộng $80$ cm: đổi $80$ cm $= 0{,}8$ m, tỉ số là $1{,}2 : 0{,}8 = \\frac{3}{2}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Tỉ số và phân số',
          text: 'Trong phân số $\\frac{a}{b}$, cả $a$ và $b$ phải là số nguyên. Trong tỉ số $\\frac{a}{b}$, $a$ và $b$ có thể là số nguyên, phân số hay số thập phân, như $\\frac{1{,}2}{0{,}8}$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tỉ số phần trăm',
          text: 'Tỉ số phần trăm của $a$ và $b$ là $\\frac{a}{b} \\cdot 100\\%$. Chẳng hạn tỉ số phần trăm của $3$ và $8$ là $\\frac{3}{8} \\cdot 100\\% = 37{,}5\\%$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Cùng đơn vị đo',
          text: 'Khi tính tỉ số (tỉ số phần trăm) của hai đại lượng, phải đổi hai số đo về cùng một đơn vị. Tỉ số phần trăm của $45$ phút và $2$ giờ là $\\frac{45}{120} \\cdot 100\\% = 37{,}5\\%$, không phải $\\frac{45}{2} \\cdot 100\\%$.',
        },
      ],
    },
    {
      heading: 'Hai bài toán về tỉ số phần trăm',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Bài toán 1: Tìm giá trị phần trăm của một số',
          text: 'Muốn tìm $m\\%$ của số $b$, ta tính $b \\cdot \\frac{m}{100}$. Chẳng hạn trong $40$ kg nước biển có $5\\%$ muối, lượng muối là $40 \\cdot \\frac{5}{100} = 2$ (kg).',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Bài toán 2: Tìm một số biết giá trị phần trăm của nó',
          text: 'Muốn tìm một số biết $m\\%$ của nó bằng $a$, ta tính $a : \\frac{m}{100} = \\frac{a \\cdot 100}{m}$. Chẳng hạn số có $5\\%$ bằng $2$ là $2 : \\frac{5}{100} = 40$.',
        },
        {
          type: 'table',
          caption: 'Một số tình huống thường gặp',
          head: ['Tình huống', 'Cách tính'],
          rows: [
            ['Giảm giá $m\\%$', 'Số tiền giảm $= m\\%$ giá cũ; giá mới $= (100 - m)\\%$ giá cũ'],
            [
              'Lãi suất $r\\%$ một năm',
              'Tiền lãi sau một năm $= r\\%$ tiền gửi; cả gốc lẫn lãi $=$ tiền gửi $+$ tiền lãi',
            ],
            [
              'Thuế giá trị gia tăng (VAT) $10\\%$',
              'Giá phải trả $= (100 + 10)\\% = 110\\%$ giá chưa thuế',
            ],
            [
              'Biết giá sau khi giảm $m\\%$',
              'Giá ban đầu $=$ giá sau khi giảm $: \\frac{100 - m}{100}$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Phần trăm luôn là phần trăm "của" một số. Giá đã có thuế $10\\%$ là $220\\,000$ đồng thì giá chưa thuế không phải $220\\,000 - 10\\% \\cdot 220\\,000 = 198\\,000$ đồng, vì $10\\%$ thuế tính trên giá chưa thuế. Giá chưa thuế là $220\\,000 : \\frac{110}{100} = 200\\,000$ đồng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cửa hàng phần trăm',
    instruction:
      'Chọn bài toán và món hàng (hoặc số tiền gửi). Cả thanh luôn ứng với $100\\%$; kéo tam giác cam để đổi tỉ số phần trăm và xem phần màu cam lớn dần. Tự tính số tiền được hỏi, nhập đáp số rồi bấm "Kiểm tra", hoặc xem lời giải từng bước. Ở bài "Tìm giá ban đầu", số đã biết là phần còn lại của thanh, còn cả thanh là số cần tìm.',
  },
  examples: [
    {
      problem:
        'Một mảnh vườn hình chữ nhật dài $1{,}2$ dam, rộng $80$ dm. Tính tỉ số và tỉ số phần trăm giữa chiều dài và chiều rộng.',
      steps: [
        'Đổi về cùng đơn vị: $1{,}2$ dam $= 12$ m; $80$ dm $= 8$ m.',
        'Tỉ số giữa chiều dài và chiều rộng là $12 : 8 = \\frac{3}{2}$.',
        'Tỉ số phần trăm là $\\frac{12}{8} \\cdot 100\\% = 150\\%$.',
      ],
      answer: 'Tỉ số là $\\frac{3}{2}$; tỉ số phần trăm là $150\\%$.',
    },
    {
      problem:
        'Bố gửi tiết kiệm $1\\,000\\,000$ đồng với lãi suất $6\\%$ một năm. Hỏi sau một năm bố nhận được bao nhiêu tiền lãi và tổng cộng bao nhiêu tiền?',
      steps: [
        'Tiền lãi là $6\\%$ của $1\\,000\\,000$: $1\\,000\\,000 \\cdot \\frac{6}{100} = 60\\,000$ (đồng).',
        'Cả gốc lẫn lãi: $1\\,000\\,000 + 60\\,000 = 1\\,060\\,000$ (đồng).',
      ],
      answer: 'Tiền lãi $60\\,000$ đồng; tổng cộng $1\\,060\\,000$ đồng.',
    },
    {
      problem:
        'Chiếc áo khoác giá $460\\,000$ đồng được giảm giá $25\\%$. Tính giá mới của chiếc áo.',
      steps: [
        'Số tiền được giảm là $25\\%$ của $460\\,000$: $460\\,000 \\cdot \\frac{25}{100} = 115\\,000$ (đồng).',
        'Giá mới là $460\\,000 - 115\\,000 = 345\\,000$ (đồng).',
        'Cách khác: giá mới bằng $100\\% - 25\\% = 75\\%$ giá cũ: $460\\,000 \\cdot \\frac{75}{100} = 345\\,000$ (đồng).',
      ],
      answer: 'Giá mới là $345\\,000$ đồng.',
    },
    {
      problem:
        'Sau khi được giảm giá $20\\%$, một đôi giày được bán với giá $360\\,000$ đồng. Hỏi giá ban đầu của đôi giày là bao nhiêu?',
      steps: [
        'Giá sau khi giảm bằng $100\\% - 20\\% = 80\\%$ giá ban đầu.',
        'Đây là bài toán tìm một số biết $80\\%$ của nó bằng $360\\,000$: $360\\,000 : \\frac{80}{100} = \\frac{360\\,000 \\cdot 100}{80} = 450\\,000$ (đồng).',
      ],
      answer: 'Giá ban đầu là $450\\,000$ đồng.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Tính tỉ số phần trăm của $7$ và $20$.',
      answer: 35,
      unit: '%',
      hints: ['Tỉ số phần trăm của $a$ và $b$ là $\\frac{a}{b} \\cdot 100\\%$.'],
      solution: '$\\frac{7}{20} \\cdot 100\\% = 35\\%$.',
    },
    {
      type: 'fraction',
      prompt: 'Viết tỉ số $1{,}5 : 2{,}25$ dưới dạng phân số tối giản.',
      answer: [2, 3],
      simplest: true,
      hints: [
        'Nhân cả hai số với $100$ để được hai số nguyên: $150 : 225$.',
        'Rút gọn $\\frac{150}{225}$ bằng cách chia cả tử và mẫu cho $75$.',
      ],
      solution: '$1{,}5 : 2{,}25 = \\frac{150}{225} = \\frac{2}{3}$.',
    },
    {
      type: 'number',
      prompt: 'Tính tỉ số phần trăm của $45$ phút và $2$ giờ.',
      answer: 37.5,
      unit: '%',
      hints: ['Đổi $2$ giờ ra phút trước khi chia.'],
      solution: '$2$ giờ $= 120$ phút; $\\frac{45}{120} \\cdot 100\\% = 37{,}5\\%$.',
    },
    {
      type: 'number',
      prompt:
        'Lớp 6A có $40$ học sinh, trong đó có $16$ học sinh nữ. Số học sinh nữ chiếm bao nhiêu phần trăm số học sinh cả lớp?',
      answer: 40,
      unit: '%',
      hints: ['Tính tỉ số phần trăm của $16$ và $40$.'],
      solution: '$\\frac{16}{40} \\cdot 100\\% = 40\\%$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $15\\%$ của $240$.',
      answer: 36,
      hints: ['Tìm $m\\%$ của $b$: tính $b \\cdot \\frac{m}{100}$.'],
      solution: '$240 \\cdot \\frac{15}{100} = 36$.',
    },
    {
      type: 'number',
      prompt: 'Tìm một số, biết $12\\%$ của nó bằng $30$.',
      answer: 250,
      hints: ['Biết $m\\%$ của một số bằng $a$: số đó là $a : \\frac{m}{100}$.'],
      solution: '$30 : \\frac{12}{100} = \\frac{30 \\cdot 100}{12} = 250$.',
    },
    {
      type: 'number',
      prompt:
        'Một chiếc áo giá $350\\,000$ đồng được giảm giá $30\\%$. Giá mới của chiếc áo là bao nhiêu đồng?',
      answer: 245000,
      unit: 'đồng',
      hints: ['Giá mới bằng $100\\% - 30\\% = 70\\%$ giá cũ.'],
      solution:
        '$350\\,000 \\cdot \\frac{70}{100} = 245\\,000$ (đồng). Hoặc: giảm $350\\,000 \\cdot \\frac{30}{100} = 105\\,000$, còn $350\\,000 - 105\\,000 = 245\\,000$ đồng.',
    },
    {
      type: 'number',
      prompt:
        'Gửi tiết kiệm $20\\,000\\,000$ đồng với lãi suất $6{,}5\\%$ một năm. Sau một năm, tiền lãi là bao nhiêu đồng?',
      answer: 1300000,
      unit: 'đồng',
      hints: ['Tiền lãi bằng $6{,}5\\%$ của tiền gửi.'],
      solution: '$20\\,000\\,000 \\cdot \\frac{6{,}5}{100} = 1\\,300\\,000$ (đồng).',
    },
    {
      type: 'choice',
      prompt:
        'Giá bán một chiếc quạt đã gồm thuế giá trị gia tăng $10\\%$ là $220\\,000$ đồng. Giá chiếc quạt khi chưa tính thuế là',
      options: ['$198\\,000$ đồng', '$200\\,000$ đồng', '$242\\,000$ đồng', '$22\\,000$ đồng'],
      answer: 1,
      hints: [
        'Thuế $10\\%$ được tính trên giá chưa thuế, nên $220\\,000$ đồng là $110\\%$ của giá chưa thuế.',
      ],
      solution:
        'Giá chưa thuế là $220\\,000 : \\frac{110}{100} = 200\\,000$ đồng. Kiểm tra: $200\\,000 + 10\\% \\cdot 200\\,000 = 220\\,000$. Đáp án $198\\,000$ sai vì đã lấy $10\\%$ của giá có thuế.',
    },
    {
      type: 'number',
      prompt:
        'Nước biển chứa $5\\%$ muối. Cần bao nhiêu ki-lô-gam nước biển để thu được $3$ kg muối?',
      answer: 60,
      unit: 'kg',
      hints: ['$3$ kg muối là $5\\%$ của lượng nước biển cần tìm.'],
      solution: '$3 : \\frac{5}{100} = \\frac{3 \\cdot 100}{5} = 60$ (kg).',
    },
  ],
  takeaways: [
    'Tỉ số của $a$ và $b$ ($b \\ne 0$) là $a : b$; $a$, $b$ có thể là số thập phân, phân số. Tỉ số của hai đại lượng phải cùng đơn vị đo.',
    'Tỉ số phần trăm của $a$ và $b$ là $\\frac{a}{b} \\cdot 100\\%$.',
    '$m\\%$ của $b$ là $b \\cdot \\frac{m}{100}$; số có $m\\%$ bằng $a$ là $a : \\frac{m}{100}$.',
    'Giảm giá $m\\%$ thì giá mới bằng $(100 - m)\\%$ giá cũ; tiền lãi một năm bằng lãi suất nhân với tiền gửi.',
  ],
};
