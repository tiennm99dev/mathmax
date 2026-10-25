/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Làm tròn số thập phân đến một hàng cho trước, làm tròn số thập phân âm và ước lượng kết quả phép tính.',
  intro:
    'Theo kết quả Tổng điều tra dân số năm 2019, Việt Nam có $96\\,208\\,984$ người. Báo chí thường viết gọn: "dân số nước ta khoảng $96{,}2$ triệu người". Số $96{,}2$ triệu là số đã được làm tròn: dễ đọc, dễ nhớ mà vẫn gần đúng. Bài này nhắc lại cách làm tròn số thập phân, mở rộng cho số âm và dùng làm tròn để ước lượng nhanh kết quả một phép tính.',
  objectives: [
    'Làm tròn một số thập phân (kể cả số âm) đến một hàng cho trước.',
    'Hiểu ý nghĩa của làm tròn: thay một số bằng mốc gần nó nhất ở hàng đã chọn.',
    'Ước lượng kết quả phép tính bằng cách làm tròn các số trong phép tính, dùng ước lượng để kiểm tra kết quả.',
  ],
  sections: [
    {
      heading: 'Làm tròn số thập phân',
      blocks: [
        {
          type: 'p',
          text: 'Khi làm tròn một số đến một hàng nào đó, ta thay số đó bằng số gần nó nhất trong các số chỉ có các chữ số $0$ ở bên phải hàng ấy. Chẳng hạn $24{,}037$ nằm giữa $24{,}0$ và $24{,}1$ và gần $24{,}0$ hơn, nên làm tròn đến hàng phần mười ta được $24{,}037 \\approx 24{,}0$. Kí hiệu "$\\approx$" đọc là "xấp xỉ" hoặc "gần bằng".',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc làm tròn số thập phân dương',
          text: 'Để làm tròn một số thập phân dương đến một hàng nào đó (gọi là hàng làm tròn), ta xét chữ số ngay bên phải hàng làm tròn. Nếu chữ số đó nhỏ hơn $5$ thì giữ nguyên chữ số ở hàng làm tròn; nếu chữ số đó lớn hơn hoặc bằng $5$ thì cộng thêm $1$ vào chữ số ở hàng làm tròn. Sau đó, bỏ đi các chữ số bên phải hàng làm tròn nếu chúng ở phần thập phân; thay chúng bằng các chữ số $0$ nếu chúng ở phần số nguyên.',
        },
        {
          type: 'table',
          caption: 'Làm tròn số $3{,}14159$',
          head: ['Hàng làm tròn', 'Chữ số bên phải', 'Kết quả'],
          rows: [
            ['hàng đơn vị', '$1 < 5$', '$3{,}14159 \\approx 3$'],
            ['hàng phần mười', '$4 < 5$', '$3{,}14159 \\approx 3{,}1$'],
            ['hàng phần trăm', '$1 < 5$', '$3{,}14159 \\approx 3{,}14$'],
            ['hàng phần nghìn', '$5 \\ge 5$', '$3{,}14159 \\approx 3{,}142$'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Giữ chữ số ở hàng làm tròn',
          text: 'Làm tròn $24{,}037$ đến hàng phần mười phải viết $24{,}0$, không viết $24$: chữ số $0$ ở hàng phần mười cho biết số đã được làm tròn đến hàng phần mười. Tương tự, $99{,}96 \\approx 100{,}0$ (chữ số $9$ cộng thêm $1$ thành $10$, nhớ $1$ sang các hàng bên trái).',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Làm tròn số thập phân âm',
          text: 'Để làm tròn một số thập phân âm, ta làm tròn số đối của nó rồi đặt dấu "$-$" trước kết quả. Chẳng hạn làm tròn $-23{,}567$ đến hàng phần mười: số đối $23{,}567 \\approx 23{,}6$, nên $-23{,}567 \\approx -23{,}6$.',
        },
      ],
    },
    {
      heading: 'Ước lượng kết quả phép tính',
      blocks: [
        {
          type: 'p',
          text: 'Trong nhiều tình huống, ta không cần kết quả chính xác mà chỉ cần biết kết quả khoảng bao nhiêu: đi chợ có đủ tiền không, một phép tính bấm máy có hợp lí không. Khi đó ta ước lượng kết quả.',
        },
        {
          type: 'list',
          items: [
            'Làm tròn các số hạng, thừa số, số bị chia, số chia đến một hàng thích hợp (thường là để được những số "tròn", dễ tính nhẩm) rồi thực hiện phép tính.',
            'Hoặc tính chính xác rồi làm tròn kết quả đến hàng cần thiết.',
          ],
        },
        {
          type: 'p',
          text: 'Chẳng hạn $31{,}1 \\cdot 9{,}87 \\approx 30 \\cdot 10 = 300$. Nếu ai đó tính ra $3\\,069{,}57$ hay $30{,}6957$ thì chắc chắn đã đặt sai dấu phẩy; kết quả đúng là $306{,}957$, rất gần $300$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Ước lượng cho kết quả gần đúng, không thay cho phép tính chính xác. Nó giúp ta tính nhẩm nhanh và phát hiện những kết quả sai quá xa.',
        },
      ],
    },
  ],
  explore: {
    title: 'Nhảy tới mốc gần nhất',
    instruction:
      'Chọn một số (hoặc tự nhập), rồi kéo thanh trượt để chọn hàng làm tròn. Trục số chỉ hiện hai mốc liền nhau của hàng đó và chia đoạn giữa thành $10$ phần; vạch cam là điểm chính giữa. Hãy đoán số đã cho gần mốc nào hơn: điểm tím sẽ nhảy tới mốc đúng và các bước làm tròn hiện ra. Chú ý chữ số được tô màu cam: nó cho biết điểm nằm ở nửa trái hay nửa phải.',
  },
  examples: [
    {
      problem: 'Làm tròn số $3{,}14159$ đến hàng phần nghìn.',
      steps: [
        'Chữ số hàng phần nghìn là $1$; chữ số ngay bên phải nó là $5$.',
        'Vì $5 \\ge 5$ nên cộng thêm $1$ vào chữ số hàng phần nghìn: $1$ thành $2$.',
        'Bỏ các chữ số bên phải hàng phần nghìn (đều ở phần thập phân).',
      ],
      answer: '$3{,}14159 \\approx 3{,}142$.',
    },
    {
      problem: 'Làm tròn số $479\\,633$ đến hàng nghìn và số $232{,}142372$ đến hàng đơn vị.',
      steps: [
        '$479\\,633$: chữ số hàng nghìn là $9$, chữ số ngay bên phải là $6 \\ge 5$, nên $9$ cộng $1$ thành $10$: viết $0$, nhớ $1$ sang hàng chục nghìn ($479$ thành $480$).',
        'Các chữ số bên phải hàng nghìn nằm ở phần số nguyên nên thay bằng chữ số $0$: $479\\,633 \\approx 480\\,000$.',
        '$232{,}142372$: chữ số hàng đơn vị là $2$, chữ số ngay bên phải là $1 < 5$, giữ nguyên $2$ và bỏ phần thập phân: $232{,}142372 \\approx 232$.',
      ],
      answer: '$479\\,633 \\approx 480\\,000$; $232{,}142372 \\approx 232$.',
    },
    {
      problem: 'Làm tròn $-23{,}567$ đến hàng phần mười.',
      steps: [
        'Làm tròn số đối $23{,}567$: chữ số hàng phần mười là $5$, chữ số bên phải là $6 \\ge 5$, nên $23{,}567 \\approx 23{,}6$.',
        'Đặt dấu "$-$" trước kết quả.',
      ],
      answer: '$-23{,}567 \\approx -23{,}6$.',
    },
    {
      problem:
        'Mẹ mua ba món hàng giá $19\\,900$ đồng, $49\\,500$ đồng và $30\\,200$ đồng. Hãy ước lượng tổng số tiền bằng cách làm tròn mỗi giá đến hàng chục nghìn. Mẹ mang tờ $100\\,000$ đồng có đủ không?',
      steps: [
        'Làm tròn đến hàng chục nghìn: $19\\,900 \\approx 20\\,000$; $49\\,500 \\approx 50\\,000$; $30\\,200 \\approx 30\\,000$.',
        'Tổng ước lượng: $20\\,000 + 50\\,000 + 30\\,000 = 100\\,000$ (đồng).',
        'Hai giá đầu được làm tròn lên, giá thứ ba làm tròn xuống, nên chưa chắc chắn; tính chính xác: $19\\,900 + 49\\,500 + 30\\,200 = 99\\,600$ (đồng).',
      ],
      answer: 'Tổng khoảng $100\\,000$ đồng; thực tế là $99\\,600$ đồng nên mẹ mang đủ tiền.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt: 'Làm tròn $7{,}2846$ đến hàng phần trăm.',
      answer: 7.28,
      hints: ['Chữ số hàng phần trăm là $8$; xét chữ số ngay bên phải nó.'],
      solution:
        'Chữ số bên phải hàng phần trăm là $4 < 5$, giữ nguyên $8$: $7{,}2846 \\approx 7{,}28$.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn $0{,}158$ đến hàng phần mười.',
      answer: 0.2,
      hints: ['Chữ số hàng phần mười là $1$, chữ số bên phải nó là $5$.'],
      solution:
        'Vì $5 \\ge 5$ nên cộng thêm $1$ vào chữ số hàng phần mười: $0{,}158 \\approx 0{,}2$.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn $-5{,}4672$ đến hàng phần trăm.',
      answer: -5.47,
      hints: [
        'Làm tròn số đối $5{,}4672$ trước, rồi đặt dấu "$-$".',
        'Chữ số hàng phần trăm là $6$, chữ số bên phải là $7$.',
      ],
      solution: '$5{,}4672 \\approx 5{,}47$ (vì $7 \\ge 5$), nên $-5{,}4672 \\approx -5{,}47$.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn $-0{,}0451$ đến hàng phần trăm.',
      answer: -0.05,
      hints: ['Chữ số hàng phần trăm của $0{,}0451$ là $4$; chữ số bên phải nó là $5$.'],
      solution: '$0{,}0451 \\approx 0{,}05$ (vì $5 \\ge 5$), nên $-0{,}0451 \\approx -0{,}05$.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn $1\\,234\\,567$ đến hàng nghìn.',
      answer: 1235000,
      hints: [
        'Chữ số hàng nghìn là $4$, chữ số hàng trăm (ngay bên phải) là $5$.',
        'Các chữ số bên phải hàng nghìn ở phần số nguyên nên được thay bằng chữ số $0$.',
      ],
      solution:
        'Vì $5 \\ge 5$ nên $4$ thành $5$, các chữ số sau thay bằng $0$: $1\\,234\\,567 \\approx 1\\,235\\,000$.',
    },
    {
      type: 'number',
      prompt:
        'Năm 2019, Việt Nam có $96\\,208\\,984$ người. Làm tròn số dân đến hàng triệu (viết số đầy đủ, không dùng chữ "triệu").',
      answer: 96000000,
      hints: ['Chữ số hàng triệu là $6$; chữ số ngay bên phải nó (hàng trăm nghìn) là $2$.'],
      solution:
        'Vì $2 < 5$ nên giữ nguyên $6$ và thay các chữ số sau bằng $0$: $96\\,208\\,984 \\approx 96\\,000\\,000$ người.',
    },
    {
      type: 'number',
      prompt: 'Làm tròn $99{,}96$ đến hàng phần mười.',
      answer: 100,
      hints: [
        'Chữ số hàng phần mười là $9$, chữ số bên phải là $6 \\ge 5$.',
        '$9$ thêm $1$ thành $10$: viết $0$ và nhớ $1$ sang hàng đơn vị.',
      ],
      solution:
        '$99{,}96 \\approx 100{,}0$. Khi viết kết quả làm tròn đến hàng phần mười, ta giữ chữ số $0$ ở hàng phần mười.',
    },
    {
      type: 'multi',
      prompt: 'Những số nào khi làm tròn đến hàng đơn vị thì được $8$?',
      options: ['$7{,}5$', '$8{,}49$', '$8{,}5$', '$7{,}49$', '$-8{,}2$'],
      answers: [0, 1],
      hints: ['Xét chữ số hàng phần mười của từng số.', 'Số âm làm tròn thì vẫn là số âm.'],
      solution:
        '$7{,}5 \\approx 8$ (vì $5 \\ge 5$); $8{,}49 \\approx 8$ (vì $4 < 5$). Còn $8{,}5 \\approx 9$, $7{,}49 \\approx 7$ và $-8{,}2 \\approx -8$.',
    },
    {
      type: 'choice',
      prompt:
        'Ước lượng tích $21{,}3 \\cdot 4{,}9$ bằng cách làm tròn các thừa số. Trong các số sau, số nào là kết quả đúng của phép nhân?',
      options: ['$10{,}437$', '$104{,}37$', '$1\\,043{,}7$', '$1{,}0437$'],
      answer: 1,
      hints: ['$21{,}3 \\approx 20$ và $4{,}9 \\approx 5$.'],
      solution:
        '$21{,}3 \\cdot 4{,}9 \\approx 20 \\cdot 5 = 100$. Chỉ $104{,}37$ gần $100$; thật vậy $21{,}3 \\cdot 4{,}9 = 104{,}37$.',
    },
    {
      type: 'number',
      prompt:
        'Ba món hàng giá $19\\,900$ đồng, $49\\,500$ đồng và $30\\,200$ đồng. Làm tròn mỗi giá đến hàng chục nghìn rồi ước lượng tổng số tiền (đồng).',
      answer: 100000,
      hints: ['$19\\,900 \\approx 20\\,000$. Làm tròn tương tự hai giá còn lại.'],
      solution: '$20\\,000 + 50\\,000 + 30\\,000 = 100\\,000$ (đồng).',
    },
  ],
  takeaways: [
    'Xét chữ số ngay bên phải hàng làm tròn: nhỏ hơn $5$ thì giữ nguyên, từ $5$ trở lên thì cộng $1$ vào chữ số hàng làm tròn.',
    'Các chữ số bên phải hàng làm tròn: ở phần thập phân thì bỏ đi, ở phần số nguyên thì thay bằng $0$. Giữ chữ số ở hàng làm tròn: $24{,}037 \\approx 24{,}0$.',
    'Số thập phân âm: làm tròn số đối rồi đặt dấu "$-$" trước kết quả.',
    'Ước lượng: làm tròn các số trong phép tính thành số tròn để tính nhẩm, dùng để kiểm tra kết quả có hợp lí không.',
  ],
};
