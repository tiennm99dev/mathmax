/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Biểu thức số chỉ gồm các số nối với nhau bởi dấu phép tính; biểu thức đại số còn có thể chứa các chữ (biến) đại diện cho số. Muốn tính giá trị của biểu thức đại số, ta thay mỗi biến bằng giá trị đã cho rồi thực hiện các phép tính.',
  intro:
    'Một mảnh vườn hình chữ nhật dài $5$ m, rộng $3$ m có chu vi $2 \\cdot (5 + 3) = 16$ m. Nếu chiều dài là $a$ mét và chiều rộng là $b$ mét thì chu vi là $2(a + b)$ mét. Biểu thức $2(a + b)$ dùng được cho mọi mảnh vườn hình chữ nhật: chỉ cần thay $a$, $b$ bằng các số cụ thể là có ngay chu vi.',
  objectives: [
    'Nhận biết biểu thức số và biểu thức đại số, chỉ ra các biến của một biểu thức đại số.',
    'Viết biểu thức đại số biểu thị một đại lượng trong tình huống thực tế, theo đúng các quy ước viết.',
    'Tính giá trị của một biểu thức đại số khi biết giá trị của các biến.',
  ],
  sections: [
    {
      heading: 'Biểu thức số và biểu thức đại số',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biểu thức số',
          text: 'Các số nối với nhau bởi dấu các phép tính (cộng, trừ, nhân, chia, nâng lên lũy thừa) tạo thành một biểu thức số. Ví dụ: $29 + 6 \\cdot 7$; $\\;45 : 5 - 3 \\cdot (6 + 4)$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biểu thức đại số',
          text: 'Biểu thức gồm các số, các chữ nối với nhau bởi dấu các phép tính gọi là biểu thức đại số. Các chữ trong biểu thức đại số đại diện cho những số tùy ý, gọi là các biến số (gọi tắt là biến). Ví dụ: $x^2 - xy + 2y - 1$ là biểu thức đại số với hai biến $x$, $y$; $\\;y^3 + 1$ có một biến $y$.',
        },
        {
          type: 'p',
          text: 'Biểu thức số cũng được coi là một biểu thức đại số (không có biến). Một biểu thức đại số có thể có một, hai hay nhiều biến, chẳng hạn $x^2 + y - z^3 + 2$ có ba biến $x$, $y$, $z$.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Quy ước viết',
          text: 'Không viết dấu nhân giữa các biến, giữa số và biến: $x \\cdot y$ viết là $xy$, $7 \\cdot a$ viết là $7a$. Trong tích một số với biến, số viết trước: $a \\cdot 3$ viết là $3a$. Không viết thừa số $1$: $1x^2$ viết là $x^2$, $(-1)xy$ viết là $-xy$.',
        },
        {
          type: 'p',
          text: 'Vì biến đại diện cho số nên khi biến đổi biểu thức đại số ta dùng các tính chất, quy tắc phép tính như trên số, ví dụ: $x + x = 2x$; $\\;x - x = 0$; $\\;x \\cdot x = x^2$; $\\;-(x + y - z) = -x - y + z$; $\\;x(y + z) = xy + xz$.',
        },
        {
          type: 'p',
          text: 'Em hãy phân loại các biểu thức dưới đây theo số biến của chúng.',
        },
        { type: 'widget', name: 'phan-loai' },
      ],
    },
    {
      heading: 'Giá trị của biểu thức đại số',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Cách tính',
          text: 'Để tính giá trị của một biểu thức đại số tại những giá trị cho trước của các biến, ta thay giá trị cho trước đó vào biểu thức rồi thực hiện các phép tính.',
        },
        {
          type: 'p',
          text: 'Ví dụ: giá trị của biểu thức $A = 4x^2 - 1$ tại $x = 2$ là $A = 4 \\cdot 2^2 - 1 = 4 \\cdot 4 - 1 = 15$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Chú ý',
          text: 'Khi thay một số âm vào biến, hãy đặt số đó trong dấu ngoặc: tại $x = -3$ thì $x^2 = (-3)^2 = 9$, còn viết $-3^2$ lại bằng $-9$. Thực hiện các phép tính theo đúng thứ tự: lũy thừa trước, rồi nhân chia, cuối cùng cộng trừ.',
        },
        {
          type: 'table',
          caption: 'Giá trị của $2(a + b)$ với một vài cặp giá trị của $a$, $b$',
          head: ['$a$', '$b$', '$2(a + b)$'],
          rows: [
            ['$5$', '$3$', '$16$'],
            ['$4{,}5$', '$2$', '$13$'],
            ['$7$', '$7$', '$28$'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Thay số vào biểu thức',
    instruction:
      'Chọn một biểu thức rồi kéo thanh trượt (hoặc dùng phím mũi tên) để đổi giá trị của từng biến. Phép thay số và giá trị của biểu thức được tính lại ngay. Để ý cách số âm được đặt trong ngoặc khi thay vào.',
  },
  examples: [
    {
      problem:
        'Viết biểu thức đại số biểu thị: a) diện tích hình thang có đáy lớn $a$ (cm), đáy nhỏ $b$ (cm) và chiều cao $h$ (cm); b) số tiền (nghìn đồng) phải trả khi mua $x$ quyển vở giá $8$ nghìn đồng một quyển và $y$ chiếc bút giá $5$ nghìn đồng một chiếc.',
      steps: [
        'a) Diện tích hình thang bằng tổng hai đáy nhân với chiều cao rồi chia cho $2$: $\\frac{(a + b)h}{2}$ (cm$^2$).',
        'b) Mua $x$ quyển vở hết $8x$ nghìn đồng, mua $y$ chiếc bút hết $5y$ nghìn đồng.',
        'Tổng số tiền là $8x + 5y$ (nghìn đồng).',
      ],
      answer: 'a) $\\frac{(a + b)h}{2}$; $\\;$ b) $8x + 5y$.',
    },
    {
      problem: 'Tính giá trị của biểu thức $A = 4x^2 - 1$ tại $x = -\\frac{1}{2}$.',
      steps: [
        'Thay $x = -\\frac{1}{2}$ vào biểu thức: $A = 4 \\cdot \\left(-\\frac{1}{2}\\right)^2 - 1$.',
        '$\\left(-\\frac{1}{2}\\right)^2 = \\frac{1}{4}$, nên $A = 4 \\cdot \\frac{1}{4} - 1 = 1 - 1$.',
        '$A = 0$.',
      ],
      answer: 'Giá trị của $A$ tại $x = -\\frac{1}{2}$ là $0$.',
    },
    {
      problem: 'Tính giá trị của biểu thức $x^2 - xy + 2y - 1$ tại $x = 3$ và $y = -2$.',
      steps: [
        'Thay $x = 3$, $y = -2$: $3^2 - 3 \\cdot (-2) + 2 \\cdot (-2) - 1$.',
        '$= 9 + 6 - 4 - 1$.',
        '$= 10$.',
      ],
      answer: 'Giá trị của biểu thức tại $x = 3$, $y = -2$ là $10$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Biểu thức nào sau đây là biểu thức số?',
      options: ['$3x + 1$', '$5^2 - 4 \\cdot 3$', '$a : 2$', '$2(x + y)$'],
      answer: 1,
      hints: ['Biểu thức số chỉ gồm các số và dấu phép tính, không có chữ.'],
      solution:
        '$5^2 - 4 \\cdot 3$ chỉ gồm các số nối với nhau bởi dấu phép tính. Ba biểu thức còn lại đều chứa chữ (biến).',
    },
    {
      type: 'choice',
      prompt: 'Biểu thức đại số biểu thị chu vi của hình vuông có cạnh $a$ (cm) là',
      options: ['$a^2$', '$4a$', '$a + 4$', '$2a$'],
      answer: 1,
      hints: ['Hình vuông có bốn cạnh bằng nhau.', 'Chu vi bằng tổng độ dài bốn cạnh.'],
      solution:
        'Chu vi hình vuông là $a + a + a + a = 4a$ (cm). Còn $a^2$ là diện tích hình vuông.',
    },
    {
      type: 'multi',
      prompt: 'Những đẳng thức nào sau đây đúng với mọi giá trị của các biến?',
      options: [
        '$1 \\cdot x^2 = x^2$',
        '$(-1)xy = -xy$',
        '$x \\cdot x = 2x$',
        '$x - x = 0$',
        '$-(x + y - z) = -x - y - z$',
      ],
      answers: [0, 1, 3],
      hints: [
        'Biến đại diện cho số, nên các phép biến đổi giống như với số.',
        'Thử thay $x = 3$ vào $x \\cdot x$ và $2x$ để so sánh.',
      ],
      solution:
        'Đúng: $1 \\cdot x^2 = x^2$; $(-1)xy = -xy$; $x - x = 0$. Sai: $x \\cdot x = x^2$ chứ không phải $2x$; bỏ ngoặc có dấu trừ phải đổi dấu mọi số hạng, $-(x + y - z) = -x - y + z$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $x^2 - 2x + 3$ tại $x = -1$.',
      answer: 6,
      hints: [
        'Thay $x$ bằng $(-1)$, nhớ đặt số âm trong ngoặc.',
        '$(-1)^2 = 1$ và $-2 \\cdot (-1) = 2$.',
      ],
      solution: '$(-1)^2 - 2 \\cdot (-1) + 3 = 1 + 2 + 3 = 6$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $2m + n$ tại $m = 9$ và $n = 0{,}5$.',
      answer: 18.5,
      tolerance: 0.001,
      hints: ['Thay $m = 9$ và $n = 0{,}5$ vào biểu thức.'],
      solution: '$2 \\cdot 9 + 0{,}5 = 18 + 0{,}5 = 18{,}5$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $3x^2 - 5x + 1$ tại $x = 2$.',
      answer: 3,
      hints: ['Tính lũy thừa trước: $2^2 = 4$.'],
      solution: '$3 \\cdot 2^2 - 5 \\cdot 2 + 1 = 12 - 10 + 1 = 3$.',
    },
    {
      type: 'number',
      prompt: 'Tính giá trị của biểu thức $x^2 - xy + 2y - 1$ tại $x = -2$ và $y = 3$.',
      answer: 15,
      hints: [
        'Thay $x = -2$, $y = 3$: $(-2)^2 - (-2) \\cdot 3 + 2 \\cdot 3 - 1$.',
        '$(-2) \\cdot 3 = -6$, nên $-(-6) = 6$.',
      ],
      solution: '$(-2)^2 - (-2) \\cdot 3 + 2 \\cdot 3 - 1 = 4 + 6 + 6 - 1 = 15$.',
    },
    {
      type: 'number',
      prompt:
        'Một hình hộp chữ nhật có chiều dài $a$, chiều rộng $b$ và chiều cao $c$ (cùng đơn vị cm) có diện tích xung quanh là $2(a + b)c$. Tính diện tích xung quanh khi $a = 5$, $b = 3$, $c = 4$.',
      answer: 64,
      unit: 'cm²',
      hints: ['Thay số rồi tính trong ngoặc trước.'],
      solution: '$2 \\cdot (5 + 3) \\cdot 4 = 2 \\cdot 8 \\cdot 4 = 64$ (cm$^2$).',
    },
    {
      type: 'number',
      prompt:
        'Hai xe xuất phát cùng lúc từ hai địa điểm cách nhau $150$ km, đi ngược chiều nhau với vận tốc $x$ km/h và $y$ km/h. Thời gian để hai xe gặp nhau là $150 : (x + y)$ giờ. Tính thời gian đó khi $x = 40$ và $y = 35$.',
      answer: 2,
      unit: 'giờ',
      hints: ['Mỗi giờ hai xe tiến lại gần nhau $x + y$ ki-lô-mét.'],
      solution: '$150 : (40 + 35) = 150 : 75 = 2$ (giờ).',
    },
    {
      type: 'choice',
      prompt:
        'Giá một quyển vở là $8$ nghìn đồng, giá một chiếc bút là $5$ nghìn đồng. Biểu thức biểu thị số tiền (nghìn đồng) mua $x$ quyển vở và $y$ chiếc bút là',
      options: ['$8y + 5x$', '$13(x + y)$', '$8x + 5y$', '$(8 + x)(5 + y)$'],
      answer: 2,
      hints: ['Tiền mua vở là giá một quyển nhân với số quyển.'],
      solution: 'Tiền vở là $8x$, tiền bút là $5y$, tổng cộng $8x + 5y$ nghìn đồng.',
    },
  ],
  takeaways: [
    'Biểu thức số: các số nối với nhau bởi dấu phép tính. Biểu thức đại số: còn có thể chứa các chữ (biến) đại diện cho số.',
    'Quy ước: không viết dấu nhân giữa số và biến, giữa các biến; không viết thừa số $1$: $1x = x$, $(-1)x = -x$.',
    'Giá trị của biểu thức đại số: thay mỗi biến bằng giá trị cho trước (số âm đặt trong ngoặc) rồi thực hiện các phép tính theo đúng thứ tự.',
  ],
};
