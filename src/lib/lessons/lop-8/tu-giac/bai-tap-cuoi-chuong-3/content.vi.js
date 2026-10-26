/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương 3: hệ thống hoá tứ giác, hình thang cân, hình bình hành, hình chữ nhật, hình thoi, hình vuông, kèm bài kiểm tra có bản đồ kĩ năng theo từng bài.',
  intro:
    'Chương 3 đi từ tứ giác bất kì tới những tứ giác ngày càng đặc biệt: hình thang cân, hình bình hành, hình chữ nhật, hình thoi và hình vuông. Bài này hệ thống lại các định nghĩa, tính chất, dấu hiệu nhận biết, luyện các dạng trắc nghiệm và tự luận tổng hợp, rồi cho em một bài kiểm tra; bản đồ kĩ năng tô màu từng bài để chỉ ra phần em đã vững và phần cần ôn lại.',
  objectives: [
    'Hệ thống hoá định nghĩa, tính chất và dấu hiệu nhận biết các tứ giác đặc biệt của chương.',
    'Nhận ra quan hệ "là trường hợp riêng của" giữa các tứ giác.',
    'Vận dụng để tính góc, tính độ dài, chứng minh và giải quyết bài toán thực tế.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức',
      blocks: [
        {
          type: 'table',
          caption: 'Các tứ giác của chương 3',
          head: ['Hình', 'Định nghĩa', 'Tính chất nổi bật'],
          rows: [
            [
              'Tứ giác',
              'Bốn đoạn thẳng nối bốn điểm, không có hai đoạn nào cùng nằm trên một đường thẳng',
              'Tổng các góc bằng $360^\\circ$',
            ],
            [
              'Hình thang cân',
              'Hình thang có hai góc kề một đáy bằng nhau',
              'Hai cạnh bên bằng nhau; hai đường chéo bằng nhau',
            ],
            [
              'Hình bình hành',
              'Tứ giác có các cạnh đối song song',
              'Cạnh đối bằng nhau, góc đối bằng nhau; hai đường chéo cắt nhau tại trung điểm mỗi đường',
            ],
            [
              'Hình chữ nhật',
              'Tứ giác có bốn góc vuông',
              'Hai đường chéo bằng nhau và cắt nhau tại trung điểm mỗi đường',
            ],
            [
              'Hình thoi',
              'Tứ giác có bốn cạnh bằng nhau',
              'Hai đường chéo vuông góc và là phân giác các góc',
            ],
            [
              'Hình vuông',
              'Tứ giác có bốn góc vuông và bốn cạnh bằng nhau',
              'Hai đường chéo bằng nhau, vuông góc, cắt nhau tại trung điểm mỗi đường',
            ],
          ],
        },
        {
          type: 'list',
          items: [
            'Hình bình hành là hình thang có hai cạnh bên song song.',
            'Hình chữ nhật là hình bình hành, cũng là hình thang cân.',
            'Hình thoi là hình bình hành.',
            'Hình vuông vừa là hình chữ nhật, vừa là hình thoi.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chọn dấu hiệu theo dữ kiện',
          text: 'Dữ kiện về cạnh song song hay bằng nhau, về góc, hay về đường chéo sẽ gợi ý dấu hiệu cần dùng. Để chứng minh hình chữ nhật, hình thoi, thường chứng minh hình bình hành trước rồi thêm một điều kiện; để chứng minh hình vuông, chứng minh hình chữ nhật (hoặc hình thoi) trước rồi thêm một điều kiện.',
        },
      ],
    },
    {
      heading: 'Bài kiểm tra cuối chương',
      blocks: [
        {
          type: 'p',
          text: 'Bài kiểm tra bên dưới gồm $10$ câu, hai câu cho mỗi bài từ Bài 10 tới Bài 14. Sau khi làm xong, bản đồ kĩ năng tô xanh những bài em làm đúng ngay lần đầu và tô cam, đỏ những bài cần ôn lại.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Số đo góc tính bằng độ; độ dài viết dấu phẩy thập phân, ví dụ $7{,}5$. Bấm "Làm bộ đề mới" để có bài kiểm tra khác.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra có bản đồ kĩ năng',
    instruction:
      'Nhập đáp số rồi bấm "Kiểm tra". Làm sai lần đầu, em được xem gợi ý và làm lại; sai lần nữa thì lời giải từng bước hiện ra. Bản đồ kĩ năng chương 3 cho biết em cần ôn lại bài nào.',
  },
  examples: [
    {
      problem:
        'Cho tam giác $ABC$ vuông tại $A$, $M$ là trung điểm của $BC$. Trên tia đối của tia $MA$ lấy điểm $D$ sao cho $MD = MA$. a) Tứ giác $ABDC$ là hình gì? b) Tam giác $ABC$ cần thêm điều kiện gì để $ABDC$ là hình vuông?',
      steps: [
        'Hai đường chéo $AD$ và $BC$ của tứ giác $ABDC$ cắt nhau tại $M$, là trung điểm của mỗi đường, nên $ABDC$ là hình bình hành.',
        'Hình bình hành $ABDC$ có $\\widehat{BAC} = 90^\\circ$ nên là hình chữ nhật.',
        'Hình chữ nhật $ABDC$ là hình vuông khi có hai cạnh kề bằng nhau, tức là $AB = AC$.',
      ],
      answer:
        'a) $ABDC$ là hình chữ nhật. b) $ABDC$ là hình vuông khi tam giác $ABC$ vuông cân tại $A$.',
    },
    {
      problem:
        'Cho hình bình hành $ABCD$ có $\\widehat{A} = 60^\\circ$ và $AB = 2AD$. Gọi $M$ là trung điểm của $AB$. Chứng minh rằng tam giác $ADM$ đều và $DM$ là tia phân giác của góc $D$.',
      steps: [
        '$AM = \\dfrac{AB}{2} = AD$, nên tam giác $ADM$ cân tại $A$; nó có $\\widehat{A} = 60^\\circ$ nên là tam giác đều. Suy ra $\\widehat{ADM} = 60^\\circ$.',
        'Hai góc kề cạnh $AD$ của hình bình hành bù nhau: $\\widehat{ADC} = 180^\\circ - 60^\\circ = 120^\\circ$.',
        'Do đó $\\widehat{MDC} = 120^\\circ - 60^\\circ = 60^\\circ = \\widehat{ADM}$.',
      ],
      answer: 'Tam giác $ADM$ đều và $DM$ là tia phân giác của góc $ADC$.',
    },
    {
      problem:
        'Để kiểm tra một khung cửa gỗ có phải hình chữ nhật hay không, bác thợ mộc đo thấy hai cạnh đứng bằng nhau, hai cạnh ngang bằng nhau và hai đường chéo cũng bằng nhau. Khung cửa có phải hình chữ nhật không? Vì sao?',
      steps: [
        'Khung có các cạnh đối bằng nhau nên là hình bình hành.',
        'Hình bình hành có hai đường chéo bằng nhau là hình chữ nhật.',
      ],
      answer: 'Khung cửa là hình chữ nhật, nên bốn góc của nó đều vuông.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Tứ giác $ABCD$ có $\\widehat{A} = 60^\\circ$, $\\widehat{B} = 80^\\circ$, $\\widehat{C} = 120^\\circ$. Số đo góc $D$ là',
      options: ['$80^\\circ$', '$100^\\circ$', '$120^\\circ$', '$90^\\circ$'],
      answer: 1,
      hints: ['Tổng các góc của một tứ giác bằng $360^\\circ$.'],
      solution: '$\\widehat{D} = 360^\\circ - (60^\\circ + 80^\\circ + 120^\\circ) = 100^\\circ$.',
    },
    {
      type: 'number',
      prompt:
        'Hình thang cân $ABCD$ ($AB \\parallel CD$) có $\\widehat{D} = 70^\\circ$. Tính $\\widehat{A}$ (đơn vị độ).',
      answer: 110,
      unit: '°',
      hints: ['$\\widehat{A}$ và $\\widehat{D}$ là hai góc kề cạnh bên $AD$ của hình thang.'],
      solution:
        'Vì $AB \\parallel CD$ nên $\\widehat{A} + \\widehat{D} = 180^\\circ$, do đó $\\widehat{A} = 180^\\circ - 70^\\circ = 110^\\circ$.',
    },
    {
      type: 'number',
      prompt: 'Hình bình hành $ABCD$ có chu vi $26$ cm và $AB = 8$ cm. Tính $BC$.',
      answer: 5,
      unit: 'cm',
      hints: ['Chu vi bằng $2 \\cdot (AB + BC)$.'],
      solution: '$AB + BC = 26 : 2 = 13$ cm, nên $BC = 13 - 8 = 5$ cm.',
    },
    {
      type: 'choice',
      prompt: 'Khẳng định nào sau đây là sai?',
      options: [
        'Hình vuông vừa là hình chữ nhật vừa là hình thoi.',
        'Hình thoi là một hình bình hành.',
        'Tứ giác có hai đường chéo bằng nhau là hình chữ nhật.',
        'Hình chữ nhật là một hình thang cân.',
      ],
      answer: 2,
      hints: ['Hình thang cân cũng có hai đường chéo bằng nhau.'],
      solution:
        'Tứ giác có hai đường chéo bằng nhau có thể chỉ là hình thang cân (hoặc một tứ giác bất kì). Phải là hình bình hành có hai đường chéo bằng nhau mới là hình chữ nhật. Ba khẳng định còn lại đều đúng.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có cạnh huyền $BC = 15$ cm. Tính độ dài đường trung tuyến $AM$.',
      answer: 7.5,
      unit: 'cm',
      hints: ['Trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.'],
      solution: '$AM = 15 : 2 = 7{,}5$ cm.',
    },
    {
      type: 'number',
      prompt: 'Hình thoi $ABCD$ có $\\widehat{A} = 120^\\circ$. Tính $\\widehat{ABD}$ (đơn vị độ).',
      answer: 30,
      unit: '°',
      hints: [
        'Tính $\\widehat{ABC}$: hai góc kề cạnh $AB$ bù nhau.',
        '$BD$ là tia phân giác của góc $B$.',
      ],
      solution:
        '$\\widehat{ABC} = 180^\\circ - 120^\\circ = 60^\\circ$. $BD$ là tia phân giác của góc $B$ nên $\\widehat{ABD} = 60^\\circ : 2 = 30^\\circ$.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các hình luôn có hai đường chéo bằng nhau.',
      options: ['Hình thang cân', 'Hình bình hành', 'Hình chữ nhật', 'Hình thoi', 'Hình vuông'],
      answers: [0, 2, 4],
      hints: ['Hình bình hành và hình thoi nói chung có hai đường chéo khác nhau.'],
      solution:
        'Hình thang cân, hình chữ nhật và hình vuông có hai đường chéo bằng nhau. Hình bình hành, hình thoi chỉ có hai đường chéo bằng nhau khi chúng là hình chữ nhật, hình vuông.',
    },
    {
      type: 'order',
      prompt:
        'Sắp xếp các hình sau sao cho mỗi hình là trường hợp riêng (đặc biệt hơn) của hình đứng ngay trước nó.',
      items: ['Hình chữ nhật', 'Tứ giác', 'Hình vuông', 'Hình bình hành', 'Hình thang'],
      answer: [1, 4, 3, 0, 2],
      hints: [
        'Hình nào tổng quát nhất? Hình nào đặc biệt nhất?',
        'Hình bình hành là hình thang có hai cạnh bên song song.',
      ],
      solution:
        'Tứ giác → hình thang (có hai cạnh đối song song) → hình bình hành (hai cặp cạnh đối song song) → hình chữ nhật (thêm một góc vuông) → hình vuông (thêm hai cạnh kề bằng nhau).',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi hình với tính chất về hai đường chéo của nó (dùng mỗi hình đúng một lần).',
      left: ['Hình bình hành', 'Hình chữ nhật', 'Hình thoi', 'Hình vuông'],
      right: [
        'Vuông góc, cắt nhau tại trung điểm mỗi đường',
        'Bằng nhau, vuông góc, cắt nhau tại trung điểm mỗi đường',
        'Cắt nhau tại trung điểm mỗi đường',
        'Bằng nhau, cắt nhau tại trung điểm mỗi đường',
        'Bằng nhau nhưng không cắt nhau tại trung điểm mỗi đường',
      ],
      pairs: [
        [0, 2],
        [1, 3],
        [2, 0],
        [3, 1],
      ],
      hints: [
        'Hình chữ nhật thêm "bằng nhau", hình thoi thêm "vuông góc" vào tính chất của hình bình hành.',
      ],
      solution:
        'Hình bình hành: cắt nhau tại trung điểm mỗi đường. Hình chữ nhật: thêm bằng nhau. Hình thoi: thêm vuông góc. Hình vuông: bằng nhau và vuông góc. Dòng còn lại mô tả hình thang cân (không phải hình chữ nhật).',
    },
    {
      type: 'number',
      prompt:
        'Một mảnh đất hình chữ nhật có đường chéo dài $30$ m. Người ta đóng một cây cọc tại giao điểm của hai đường chéo. Cọc cách mỗi góc của mảnh đất bao nhiêu mét?',
      answer: 15,
      unit: 'm',
      hints: ['Hai đường chéo của hình chữ nhật bằng nhau và cắt nhau tại trung điểm mỗi đường.'],
      solution:
        'Giao điểm $O$ của hai đường chéo cách đều bốn đỉnh: mỗi khoảng cách bằng nửa đường chéo, $30 : 2 = 15$ m.',
    },
    {
      type: 'number',
      prompt:
        'Mỗi mắt lưới của hàng rào B40 là một hình thoi. Khi kéo căng, một góc của mắt lưới là $70^\\circ$. Góc kề với nó (chung một cạnh) bằng bao nhiêu độ?',
      answer: 110,
      unit: '°',
      hints: ['Hình thoi là hình bình hành: hai góc kề một cạnh bù nhau.'],
      solution: 'Góc kề bằng $180^\\circ - 70^\\circ = 110^\\circ$.',
    },
  ],
  takeaways: [
    'Tổng các góc của một tứ giác bằng $360^\\circ$.',
    'Hình bình hành, hình chữ nhật, hình thoi, hình vuông là các tứ giác ngày càng đặc biệt; hình đặc biệt hơn có mọi tính chất của hình tổng quát hơn.',
    'Hai đường chéo phân biệt các hình: cắt nhau tại trung điểm (hình bình hành), thêm bằng nhau (hình chữ nhật), thêm vuông góc (hình thoi), có cả hai (hình vuông).',
    'Trong tam giác vuông, trung tuyến ứng với cạnh huyền bằng nửa cạnh huyền.',
  ],
};
