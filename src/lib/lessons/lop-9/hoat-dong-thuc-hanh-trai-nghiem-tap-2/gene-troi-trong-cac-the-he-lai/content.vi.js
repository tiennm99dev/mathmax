/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: mô phỏng phép lai một cặp tính trạng của Mendel bằng hai đồng xu, lập bảng tần số, tần số tương đối của các kiểu gene, kiểu hình ở F2 và dùng không gian mẫu đồng khả năng để giải thích tỉ lệ 3 trội : 1 lặn.',
  intro:
    'Mendel lai cây đậu Hà Lan hoa đỏ thuần chủng với cây hoa trắng thuần chủng: F1 toàn hoa đỏ, nhưng khi cho F1 tự thụ phấn thì cứ khoảng $4$ cây F2 lại có $1$ cây hoa trắng. Vì sao lại là tỉ lệ $3 : 1$? Trong bài này, em dùng hai đồng xu để "lai" thử, rồi dùng xác suất để giải thích kết luận của Mendel.',
  objectives: [
    'Mô tả phép lai một cặp tính trạng bằng một phép thử ngẫu nhiên và viết không gian mẫu của nó.',
    'Tính xác suất của các kiểu gene AA, Aa, aa và xác suất cây con có gene trội.',
    'Mô phỏng phép lai bằng đồng xu, lập bảng tần số, tần số tương đối và so sánh với xác suất.',
    'Dùng bảng Punnett cho những phép lai khác và cho các thế hệ tự thụ phấn tiếp theo.',
  ],
  sections: [
    {
      heading: 'Thí nghiệm của Mendel',
      blocks: [
        {
          type: 'p',
          text: 'Ở đậu Hà Lan, màu hoa do một cặp gene quy định. Gene $A$ quy định hoa đỏ là gene trội, gene $a$ quy định hoa trắng là gene lặn. Mỗi cây mang hai gene, một nhận từ bố và một nhận từ mẹ; cặp gene đó là kiểu gene của cây, còn màu hoa nhìn thấy được là kiểu hình.',
        },
        {
          type: 'table',
          head: ['Kiểu gene', 'Có gene trội $A$?', 'Kiểu hình'],
          rows: [
            ['$AA$', 'Có', 'Hoa đỏ'],
            ['$Aa$', 'Có', 'Hoa đỏ'],
            ['$aa$', 'Không', 'Hoa trắng'],
          ],
          caption: 'Chỉ cần có một gene trội $A$ là cây có hoa đỏ.',
        },
        {
          type: 'list',
          items: [
            'P (bố mẹ): hoa đỏ thuần chủng $AA$ × hoa trắng thuần chủng $aa$.',
            'F1: mỗi cây nhận $A$ từ cây $AA$ và $a$ từ cây $aa$, nên toàn bộ là $Aa$, hoa đỏ.',
            'F2: cho F1 tự thụ phấn ($Aa$ × $Aa$). Mendel đếm được tỉ lệ kiểu hình xấp xỉ $3$ hoa đỏ : $1$ hoa trắng, tỉ lệ kiểu gene xấp xỉ $1\\,AA : 2\\,Aa : 1\\,aa$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Giả thiết của mô hình',
          text: 'Cây $Aa$ truyền cho con gene $A$ hoặc gene $a$ với khả năng như nhau, và gene bố truyền không phụ thuộc gene mẹ truyền. Vì vậy có thể thay mỗi cây bố, mẹ bằng một đồng xu cân đối có một mặt ghi $A$, một mặt ghi $a$.',
        },
      ],
    },
    {
      heading: 'Mô hình xác suất của phép lai',
      blocks: [
        {
          type: 'p',
          text: 'Phép thử: chọn ngẫu nhiên một gene của bố và một gene của mẹ (tung đồng xu "bố" và đồng xu "mẹ"). Ghi kết quả theo thứ tự gene của bố trước, gene của mẹ sau. Với phép lai $Aa$ × $Aa$, không gian mẫu là',
        },
        { type: 'tex', tex: '\\Omega = \\{AA;\\ Aa;\\ aA;\\ aa\\}.' },
        {
          type: 'p',
          text: 'Bốn kết quả này đồng khả năng. Hai kết quả $Aa$ và $aA$ cho cùng một kiểu gene $Aa$ (bố cho $A$, mẹ cho $a$ hoặc ngược lại), nên đó là hai kết quả khác nhau của phép thử.',
        },
        {
          type: 'table',
          head: ['Biến cố', 'Kết quả thuận lợi', 'Xác suất'],
          rows: [
            ['Cây con có kiểu gene $AA$', '$AA$', '$\\dfrac{1}{4}$'],
            ['Cây con có kiểu gene $Aa$', '$Aa$, $aA$', '$\\dfrac{2}{4} = \\dfrac{1}{2}$'],
            ['Cây con có kiểu gene $aa$', '$aa$', '$\\dfrac{1}{4}$'],
            ['Cây con có gene trội (hoa đỏ)', '$AA$, $Aa$, $aA$', '$\\dfrac{3}{4}$'],
            ['Cây con hoa trắng', '$aa$', '$\\dfrac{1}{4}$'],
          ],
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Giải thích kết luận của Mendel',
          text: 'Xác suất để một cây F2 có hoa đỏ là $\\dfrac{3}{4}$, có hoa trắng là $\\dfrac{1}{4}$. Trong rất nhiều cây F2, số cây hoa đỏ xấp xỉ $\\dfrac{3}{4}$ tổng số, số cây hoa trắng xấp xỉ $\\dfrac{1}{4}$, tức tỉ lệ kiểu hình xấp xỉ $3 : 1$; tỉ lệ kiểu gene xấp xỉ $\\dfrac{1}{4} : \\dfrac{1}{2} : \\dfrac{1}{4} = 1 : 2 : 1$.',
        },
        {
          type: 'p',
          text: 'Bảng Punnett là cách liệt kê không gian mẫu gọn nhất: hàng ghi các gene bố có thể cho, cột ghi các gene mẹ có thể cho, mỗi ô là một kết quả. Cách này dùng được cho mọi phép lai, chẳng hạn $Aa$ × $aa$ cho các ô $Aa$, $Aa$, $aa$, $aa$: xác suất hoa đỏ là $\\dfrac{1}{2}$.',
        },
      ],
    },
    {
      heading: 'Mô phỏng bằng hai đồng xu',
      blocks: [
        {
          type: 'p',
          text: 'Tung đồng thời đồng xu xanh ("bố") và đồng xu đỏ ("mẹ") $100$ lần, mỗi lần ghi kết quả vào bảng. Sau đó lập bảng tần số và tần số tương đối như ở Chương VII.',
        },
        {
          type: 'table',
          head: ['Lần tung', 'Đồng xu xanh', 'Đồng xu đỏ', 'Kiểu gene', 'Kiểu hình'],
          rows: [
            ['$1$', '$A$', '$a$', '$Aa$', 'Hoa đỏ'],
            ['$2$', '$a$', '$a$', '$aa$', 'Hoa trắng'],
            ['$3$', '$a$', '$A$', '$Aa$', 'Hoa đỏ'],
            ['$\\ldots$', '$\\ldots$', '$\\ldots$', '$\\ldots$', '$\\ldots$'],
          ],
          caption: 'Mẫu bảng ghi kết quả tung đồng xu.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tần số tương đối và xác suất',
          text: 'Nếu kiểu gene $AA$ xuất hiện $m$ lần trong $n$ lần tung thì tần số tương đối của nó là $\\dfrac{m}{n}$. Khi $n$ càng lớn, tần số tương đối càng gần xác suất $\\dfrac{1}{4}$, nhưng hiếm khi bằng đúng; mỗi lần làm lại thí nghiệm cho một kết quả hơi khác.',
        },
        {
          type: 'p',
          text: 'Với mô phỏng bên dưới, em có thể chọn kiểu gene của bố và mẹ, xem bảng Punnett, tung đồng xu hàng trăm lần trong chớp mắt và theo dõi tỉ lệ các kiểu gene qua nhiều thế hệ tự thụ phấn.',
        },
      ],
    },
    {
      heading: 'Thực hành: mô phỏng phép lai thân cao × thân thấp',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: kiểm chứng tỉ lệ $3$ thân cao : $1$ thân thấp ở F2 khi lai cây đậu thân cao thuần chủng với cây thân thấp thuần chủng (gene $A$ quy định thân cao là trội, gene $a$ quy định thân thấp là lặn).',
        },
        {
          type: 'p',
          text: 'Dụng cụ: hai đồng xu khác màu (xanh, đỏ), băng dính giấy và bút để ghi $A$, $a$ lên hai mặt mỗi đồng xu, giấy kẻ bảng, máy tính cầm tay (hoặc bảng tính Excel).',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Viết kiểu gene của P và F1. Giải thích vì sao F1 toàn thân cao và vì sao mỗi đồng xu biểu diễn một cây F1.',
            'Làm việc theo cặp: một bạn tung đồng xu, một bạn ghi. Tung $100$ lần, ghi kiểu gene và kiểu hình của từng lần.',
            'Lập bảng tần số, tần số tương đối của các kiểu gene $AA$, $Aa$, $aa$ và của hai kiểu hình. Vẽ biểu đồ cột tần số tương đối.',
            'Gộp kết quả của cả lớp (chẳng hạn $15$ cặp, tổng $1\\,500$ lần) và tính lại tần số tương đối.',
            'Viết không gian mẫu, tính xác suất của từng kiểu gene và của kiểu hình thân cao. So sánh với các tần số tương đối ở bước 3 và bước 4.',
          ],
        },
        {
          type: 'table',
          head: ['Kết quả', '$AA$', '$Aa$', '$aa$', 'Thân cao', 'Thân thấp'],
          rows: [
            ['Tần số (nhóm)', '(em ghi)', '(em ghi)', '(em ghi)', '(em ghi)', '(em ghi)'],
            [
              'Tần số tương đối (nhóm)',
              '(em tính)',
              '(em tính)',
              '(em tính)',
              '(em tính)',
              '(em tính)',
            ],
            [
              'Tần số tương đối (cả lớp)',
              '(em tính)',
              '(em tính)',
              '(em tính)',
              '(em tính)',
              '(em tính)',
            ],
            [
              'Xác suất',
              '$\\dfrac{1}{4}$',
              '$\\dfrac{1}{2}$',
              '$\\dfrac{1}{4}$',
              '$\\dfrac{3}{4}$',
              '$\\dfrac{1}{4}$',
            ],
          ],
          caption: 'Mẫu bảng tổng hợp của nhóm.',
        },
        {
          type: 'p',
          text: 'Báo cáo: nộp bảng ghi $100$ lần tung, bảng tổng hợp, biểu đồ và một đoạn nhận xét: kết quả của nhóm lệch so với xác suất bao nhiêu; kết quả gộp của cả lớp có gần xác suất hơn không; vì sao tỉ lệ của Mendel ($3 : 1$) chỉ là xấp xỉ khi đếm trên một số cây cụ thể.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bảng Punnett và đồng xu gene',
    instruction:
      'Chọn kiểu gene của bố và mẹ để xem bảng Punnett và xác suất từng kiểu gene. Sang "Tung đồng xu" để tung $1$, $10$ hay $100$ lần và so sánh tần số tương đối với xác suất. Ở "Qua nhiều thế hệ", kéo thanh trượt để xem tỉ lệ $AA$, $Aa$, $aa$ thay đổi khi cây tự thụ phấn qua từng thế hệ.',
  },
  examples: [
    {
      problem:
        'Lai cây hoa đỏ $Aa$ với cây hoa trắng $aa$. Viết không gian mẫu và tính xác suất để cây con có hoa đỏ.',
      steps: [
        'Bố $Aa$ cho $A$ hoặc $a$; mẹ $aa$ chỉ cho $a$ (cả hai mặt đồng xu "mẹ" đều là $a$). Đặt tên hai gene của mẹ là $a_1$, $a_2$ để thấy bốn kết quả đồng khả năng.',
        'Không gian mẫu: $\\Omega = \\{Aa_1;\\ Aa_2;\\ aa_1;\\ aa_2\\}$, gồm $4$ kết quả.',
        'Cây con hoa đỏ khi có gene $A$: có $2$ kết quả thuận lợi là $Aa_1$, $Aa_2$.',
        'Xác suất cây con hoa đỏ là $\\dfrac{2}{4} = \\dfrac{1}{2}$.',
      ],
      answer: 'Xác suất cây con có hoa đỏ là $\\dfrac{1}{2}$; tỉ lệ kiểu hình $1$ đỏ : $1$ trắng.',
    },
    {
      problem:
        'Một nhóm tung hai đồng xu "bố" $Aa$ và "mẹ" $Aa$ $100$ lần, được $27$ lần $AA$, $48$ lần $Aa$ (kể cả $aA$) và $25$ lần $aa$. Tính tần số tương đối của kiểu hình hoa đỏ và so sánh với xác suất.',
      steps: [
        'Số lần hoa đỏ (có gene $A$): $27 + 48 = 75$.',
        'Tần số tương đối của hoa đỏ: $\\dfrac{75}{100} = 0{,}75$.',
        'Xác suất cây con hoa đỏ là $\\dfrac{3}{4} = 0{,}75$.',
      ],
      answer:
        'Tần số tương đối của hoa đỏ là $0{,}75$, bằng xác suất $\\dfrac{3}{4}$; tỉ lệ đỏ : trắng là $75 : 25 = 3 : 1$, khớp với kết luận của Mendel.',
    },
    {
      problem:
        'Cho các cây F1 ($Aa$) tự thụ phấn được F2, rồi cho mọi cây F2 tự thụ phấn được F3. Tính tỉ lệ cây $Aa$ và tỉ lệ cây hoa trắng ở F3.',
      steps: [
        'F2 có tỉ lệ $\\dfrac{1}{4}\\,AA$, $\\dfrac{1}{2}\\,Aa$, $\\dfrac{1}{4}\\,aa$.',
        'Cây $AA$ tự thụ phấn chỉ cho $AA$; cây $aa$ chỉ cho $aa$; cây $Aa$ cho $\\dfrac{1}{4}\\,AA$, $\\dfrac{1}{2}\\,Aa$, $\\dfrac{1}{4}\\,aa$.',
        'Tỉ lệ $Aa$ ở F3: $\\dfrac{1}{2} \\cdot \\dfrac{1}{2} = \\dfrac{1}{4}$.',
        'Tỉ lệ $aa$ ở F3: $\\dfrac{1}{4} + \\dfrac{1}{2} \\cdot \\dfrac{1}{4} = \\dfrac{3}{8}$.',
      ],
      answer: 'Ở F3, cây $Aa$ chiếm $\\dfrac{1}{4}$ và cây hoa trắng chiếm $\\dfrac{3}{8}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Cây đậu nào dưới đây có hoa trắng?',
      options: ['$AA$', '$Aa$', '$aA$', '$aa$'],
      answer: 3,
      hints: ['Chỉ cần có một gene trội $A$ là cây có hoa đỏ.'],
      solution: 'Chỉ cây $aa$ không có gene trội $A$, nên chỉ cây $aa$ có hoa trắng.',
    },
    {
      type: 'number',
      prompt:
        'Phép lai $Aa$ × $Aa$ (ghi gene của bố trước, gene của mẹ sau) có không gian mẫu gồm bao nhiêu kết quả?',
      answer: 4,
      hints: ['Bố có $2$ cách cho gene, mẹ có $2$ cách cho gene.'],
      solution: '$\\Omega = \\{AA;\\ Aa;\\ aA;\\ aa\\}$ gồm $2 \\cdot 2 = 4$ kết quả.',
    },
    {
      type: 'fraction',
      prompt: 'Ở F2 của phép lai $Aa$ × $Aa$, xác suất để một cây có kiểu gene $Aa$ là bao nhiêu?',
      answer: [1, 2],
      hints: [
        'Có hai kết quả cho kiểu gene $Aa$: bố cho $A$, mẹ cho $a$ hoặc ngược lại.',
        'Chia số kết quả thuận lợi cho $4$.',
      ],
      solution:
        'Các kết quả thuận lợi là $Aa$ và $aA$, nên xác suất là $\\dfrac{2}{4} = \\dfrac{1}{2}$.',
    },
    {
      type: 'fraction',
      prompt: 'Ở F2 của phép lai $Aa$ × $Aa$, xác suất để một cây có gene trội là bao nhiêu?',
      answer: [3, 4],
      hints: ['Cây có gene trội khi kiểu gene là $AA$, $Aa$ hoặc $aA$.'],
      solution:
        'Có $3$ trong $4$ kết quả đồng khả năng chứa gene $A$, nên xác suất là $\\dfrac{3}{4}$.',
    },
    {
      type: 'multi',
      prompt: 'Những phép lai nào cho mọi cây con đều có hoa đỏ?',
      options: ['$AA$ × $aa$', '$Aa$ × $Aa$', '$AA$ × $Aa$', '$Aa$ × $aa$', '$AA$ × $AA$'],
      answers: [0, 2, 4],
      hints: [
        'Cây con chắc chắn có gene $A$ khi một trong hai bố mẹ chỉ cho được gene $A$.',
        'Cây $AA$ luôn cho gene $A$.',
      ],
      solution:
        'Khi bố hoặc mẹ là $AA$, mọi cây con đều nhận gene $A$ nên đều hoa đỏ: $AA$ × $aa$, $AA$ × $Aa$, $AA$ × $AA$. Hai phép lai còn lại có kết quả $aa$ (hoa trắng).',
    },
    {
      type: 'fraction',
      prompt: 'Lai cây $Aa$ với cây $aa$. Xác suất để cây con có hoa trắng là bao nhiêu?',
      answer: [1, 2],
      hints: ['Lập bảng Punnett $2 \\times 2$: mẹ $aa$ chỉ cho gene $a$.'],
      solution:
        'Các ô của bảng Punnett là $Aa$, $Aa$, $aa$, $aa$. Có $2$ ô $aa$, nên xác suất là $\\dfrac{2}{4} = \\dfrac{1}{2}$.',
    },
    {
      type: 'number',
      prompt:
        'Tung hai đồng xu "bố" $Aa$ và "mẹ" $Aa$ $200$ lần thì thấy $47$ lần kiểu gene $aa$. Tần số tương đối của kiểu hình hoa đỏ là bao nhiêu? (Viết dưới dạng số thập phân.)',
      answer: 0.765,
      tolerance: 0.0005,
      hints: [
        'Mọi lần không phải $aa$ đều cho hoa đỏ.',
        'Số lần hoa đỏ là $200 - 47$; chia cho $200$.',
      ],
      solution:
        'Số lần hoa đỏ: $200 - 47 = 153$. Tần số tương đối: $\\dfrac{153}{200} = 0{,}765$, khá gần xác suất $0{,}75$.',
    },
    {
      type: 'number',
      prompt:
        'Một ruộng F2 (từ F1 $Aa$ tự thụ phấn) có $1\\,200$ cây. Theo xác suất, ước lượng có khoảng bao nhiêu cây hoa trắng?',
      answer: 300,
      unit: 'cây',
      hints: ['Xác suất một cây F2 có hoa trắng là $\\dfrac{1}{4}$.'],
      solution: 'Số cây hoa trắng khoảng $\\dfrac{1}{4} \\cdot 1\\,200 = 300$ cây.',
    },
    {
      type: 'fraction',
      prompt:
        'Trong số các cây hoa đỏ ở F2 (từ F1 $Aa$ tự thụ phấn), tỉ lệ cây thuần chủng $AA$ là bao nhiêu?',
      answer: [1, 3],
      hints: [
        'Chỉ xét các kết quả hoa đỏ: $AA$, $Aa$, $aA$.',
        'Trong ba kết quả đồng khả năng đó, có bao nhiêu kết quả là $AA$?',
      ],
      solution:
        'Hoa đỏ ứng với $3$ kết quả đồng khả năng $AA$, $Aa$, $aA$, trong đó chỉ $1$ kết quả là $AA$. Vậy tỉ lệ cây $AA$ trong số cây hoa đỏ là $\\dfrac{1}{3}$.',
    },
    {
      type: 'fraction',
      prompt:
        'Từ F1 ($Aa$), các cây tự thụ phấn qua từng thế hệ. Ở F4, tỉ lệ cây có kiểu gene $Aa$ là bao nhiêu?',
      answer: [1, 8],
      hints: [
        'Mỗi lần tự thụ phấn, cây $Aa$ chỉ cho $\\dfrac{1}{2}$ số con là $Aa$; cây $AA$, $aa$ không cho con $Aa$.',
        'F1: $1$; F2: $\\dfrac{1}{2}$; F3: $\\dfrac{1}{4}$; F4: ?',
      ],
      solution:
        'Tỉ lệ $Aa$ giảm một nửa sau mỗi thế hệ: $1 \\to \\dfrac{1}{2} \\to \\dfrac{1}{4} \\to \\dfrac{1}{8}$. Ở F4, cây $Aa$ chiếm $\\dfrac{1}{8}$.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các bước của hoạt động mô phỏng phép lai bằng đồng xu.',
      items: [
        'Lập bảng tần số và tần số tương đối của các kiểu gene, kiểu hình.',
        'Ghi gene $A$, $a$ lên hai mặt của mỗi đồng xu "bố", "mẹ".',
        'So sánh tần số tương đối với xác suất tính từ không gian mẫu.',
        'Tung hai đồng xu nhiều lần và ghi kết quả từng lần.',
      ],
      answer: [1, 3, 0, 2],
      hints: ['Chuẩn bị dụng cụ, thu thập dữ liệu, xử lí dữ liệu rồi mới kết luận.'],
      solution:
        'Ghi gene lên đồng xu, tung và ghi kết quả, lập bảng tần số và tần số tương đối, cuối cùng so sánh với xác suất.',
    },
  ],
  takeaways: [
    'Mỗi cây bố, mẹ truyền cho con một trong hai gene của mình với khả năng như nhau, như một đồng xu cân đối.',
    'Phép lai $Aa$ × $Aa$ có không gian mẫu $\\{AA;\\ Aa;\\ aA;\\ aa\\}$ gồm $4$ kết quả đồng khả năng.',
    '$P(AA) = P(aa) = \\dfrac{1}{4}$, $P(Aa) = \\dfrac{1}{2}$; xác suất có gene trội là $\\dfrac{3}{4}$, giải thích tỉ lệ $3 : 1$ của Mendel.',
    'Khi số lần tung càng lớn, tần số tương đối càng gần xác suất.',
  ],
};
