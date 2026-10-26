/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập chung về lũy thừa với số mũ tự nhiên của một số hữu tỉ, các quy tắc lũy thừa, thứ tự thực hiện các phép tính và quy tắc chuyển vế để tìm x.',
  intro:
    'Bài luyện tập này ôn lại hai bài vừa học: Lũy thừa với số mũ tự nhiên của một số hữu tỉ (Bài 3) và Thứ tự thực hiện các phép tính, quy tắc chuyển vế (Bài 4). Em sẽ tính lũy thừa, rút gọn biểu thức bằng các quy tắc lũy thừa, tính giá trị biểu thức theo đúng thứ tự và tìm $x$.',
  objectives: [
    'Tính lũy thừa của một số hữu tỉ, dùng đúng quy tắc nhân, chia hai lũy thừa cùng cơ số và lũy thừa của lũy thừa.',
    'Tính giá trị biểu thức với số hữu tỉ theo đúng thứ tự thực hiện các phép tính.',
    'Dùng quy tắc chuyển vế để tìm $x$, rồi thử lại kết quả.',
  ],
  sections: [
    {
      heading: 'Nhắc lại kiến thức',
      blocks: [
        {
          type: 'table',
          head: ['Nội dung', 'Ghi nhớ'],
          rows: [
            [
              'Lũy thừa',
              '$x^n$ là tích của $n$ thừa số $x$ ($n > 1$); $x^1 = x$, $x^0 = 1$ ($x \\ne 0$); $\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}$',
            ],
            [
              'Nhân, chia cùng cơ số',
              '$x^m \\cdot x^n = x^{m+n}$; $\\;x^m : x^n = x^{m-n}$ ($x \\ne 0$, $m \\ge n$)',
            ],
            ['Lũy thừa của lũy thừa', '$\\left(x^m\\right)^n = x^{m \\cdot n}$'],
            [
              'Cùng số mũ',
              '$(x \\cdot y)^n = x^n \\cdot y^n$; $\\;(x : y)^n = x^n : y^n$ ($y \\ne 0$)',
            ],
            [
              'Thứ tự phép tính',
              'Không có ngoặc: lũy thừa $\\rightarrow$ nhân và chia $\\rightarrow$ cộng và trừ. Có ngoặc: $(\\ ) \\rightarrow [\\ ] \\rightarrow \\{\\ \\}$',
            ],
            [
              'Quy tắc chuyển vế',
              'Chuyển một số hạng từ vế này sang vế kia thì đổi dấu số hạng đó: $x + a = b \\Rightarrow x = b - a$',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: '$x^m \\cdot x^n$ là cộng số mũ, không nhân: $2^3 \\cdot 2^2 = 2^5$. $-2^4 = -16$ nhưng $(-2)^4 = 16$. Chuyển vế mà quên đổi dấu thì đẳng thức không còn đúng.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài luyện ngẫu nhiên',
    instruction:
      'Mỗi lượt có 12 câu trộn từ Bài 3 và Bài 4: tính lũy thừa, tìm số mũ, tính giá trị biểu thức và tìm $x$. Nhập số nguyên (ví dụ −7), phân số dạng a/b (ví dụ −3/4) hoặc số thập phân có dấu phẩy (ví dụ −0,75); mọi cách viết bằng nhau đều được chấp nhận. Sai lần đầu, em được xem gợi ý và làm lại; sai lần hai, lời giải từng bước sẽ hiện ra. Bản đồ kĩ năng cho biết phần nào cần ôn thêm.',
  },
  examples: [
    {
      problem:
        'Tính giá trị biểu thức $A = \\left(\\frac{-2}{3}\\right)^2 \\cdot \\frac{9}{8} - (0{,}5)^3 : \\frac{1}{4}$.',
      steps: [
        'Lũy thừa trước: $\\left(\\frac{-2}{3}\\right)^2 = \\frac{4}{9}$ và $(0{,}5)^3 = 0{,}125 = \\frac{1}{8}$.',
        'Nhân, chia: $\\frac{4}{9} \\cdot \\frac{9}{8} = \\frac{1}{2}$ và $\\frac{1}{8} : \\frac{1}{4} = \\frac{1}{8} \\cdot 4 = \\frac{1}{2}$.',
        'Trừ sau cùng: $A = \\frac{1}{2} - \\frac{1}{2} = 0$.',
      ],
      answer: '$A = 0$.',
    },
    {
      problem: 'Tính $B = \\frac{4^5 \\cdot 9^4}{6^9 \\cdot 2}$.',
      steps: [
        'Đưa về lũy thừa của $2$ và $3$: $4^5 = \\left(2^2\\right)^5 = 2^{10}$, $9^4 = \\left(3^2\\right)^4 = 3^8$.',
        'Lũy thừa của một tích: $6^9 = (2 \\cdot 3)^9 = 2^9 \\cdot 3^9$, nên $6^9 \\cdot 2 = 2^{10} \\cdot 3^9$.',
        '$B = \\frac{2^{10} \\cdot 3^8}{2^{10} \\cdot 3^9} = \\frac{1}{3}$.',
      ],
      answer: '$B = \\frac{1}{3}$.',
    },
    {
      problem: 'Tìm $x$, biết $\\frac{5}{6} - 2x = \\left(\\frac{-1}{2}\\right)^2$.',
      steps: [
        'Tính vế phải: $\\left(\\frac{-1}{2}\\right)^2 = \\frac{1}{4}$, nên $\\frac{5}{6} - 2x = \\frac{1}{4}$.',
        'Chuyển vế: $\\frac{5}{6} - \\frac{1}{4} = 2x$, tức là $2x = \\frac{10}{12} - \\frac{3}{12} = \\frac{7}{12}$.',
        '$x = \\frac{7}{12} : 2 = \\frac{7}{24}$.',
        'Thử lại: $\\frac{5}{6} - 2 \\cdot \\frac{7}{24} = \\frac{20}{24} - \\frac{14}{24} = \\frac{6}{24} = \\frac{1}{4}$. Đúng.',
      ],
      answer: '$x = \\frac{7}{24}$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Giá trị của $\\left(\\frac{-2}{3}\\right)^3$ là:',
      options: ['$\\frac{-8}{27}$', '$\\frac{8}{27}$', '$\\frac{-6}{9}$', '$\\frac{-8}{9}$'],
      answer: 0,
      hints: ['$\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}$; số mũ lẻ nên kết quả âm.'],
      solution:
        '$\\left(\\frac{-2}{3}\\right)^3 = \\frac{(-2)^3}{3^3} = \\frac{-8}{27}$. Các đáp án khác nhầm dấu, nhầm lũy thừa với phép nhân ($3 \\cdot 3 = 9$) hoặc quên lũy thừa mẫu số.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\left(-\\frac{3}{2}\\right)^4$.',
      answer: [81, 16],
      hints: ['Số mũ chẵn nên kết quả dương.', 'Tính $3^4$ và $2^4$.'],
      solution: '$\\left(-\\frac{3}{2}\\right)^4 = \\frac{3^4}{2^4} = \\frac{81}{16}$.',
    },
    {
      type: 'number',
      prompt: 'Tính nhanh $(-0{,}25)^5 \\cdot 4^5$.',
      answer: -1,
      hints: ['Hai lũy thừa cùng số mũ: $x^n \\cdot y^n = (x \\cdot y)^n$.'],
      solution: '$(-0{,}25)^5 \\cdot 4^5 = [(-0{,}25) \\cdot 4]^5 = (-1)^5 = -1$.',
    },
    {
      type: 'choice',
      prompt:
        'Viết $\\left[(0{,}2)^3\\right]^2 \\cdot (0{,}2)^4$ dưới dạng một lũy thừa của $0{,}2$.',
      options: ['$(0{,}2)^9$', '$(0{,}2)^{24}$', '$(0{,}2)^{10}$', '$(0{,}2)^{20}$'],
      answer: 2,
      hints: [
        'Lũy thừa của lũy thừa: nhân hai số mũ.',
        'Sau đó nhân hai lũy thừa cùng cơ số: cộng số mũ.',
      ],
      solution:
        '$\\left[(0{,}2)^3\\right]^2 = (0{,}2)^6$; $\\;(0{,}2)^6 \\cdot (0{,}2)^4 = (0{,}2)^{10}$.',
    },
    {
      type: 'number',
      prompt: 'Tìm số tự nhiên $n$, biết $\\left(\\frac{-1}{2}\\right)^n = \\frac{1}{16}$.',
      answer: 4,
      hints: ['$16$ là lũy thừa của $2$.', 'Kết quả dương, nên số mũ phải là số chẵn.'],
      solution:
        '$\\frac{1}{16} = \\frac{1}{2^4} = \\left(\\frac{-1}{2}\\right)^4$ (số mũ chẵn nên dấu âm mất đi). Vậy $n = 4$.',
    },
    {
      type: 'number',
      prompt: 'Tính một cách hợp lí: $A = 32{,}125 - (6{,}325 + 12{,}125) - (37 + 13{,}675)$.',
      answer: -37,
      hints: [
        'Bỏ ngoặc có dấu "$-$" đằng trước thì đổi dấu mọi số hạng trong ngoặc.',
        'Nhóm $32{,}125 - 12{,}125$ và $6{,}325 + 13{,}675$.',
      ],
      solution:
        '$A = 32{,}125 - 6{,}325 - 12{,}125 - 37 - 13{,}675 = (32{,}125 - 12{,}125) - (6{,}325 + 13{,}675) - 37 = 20 - 20 - 37 = -37$.',
    },
    {
      type: 'fraction',
      prompt: 'Tính $\\left(\\frac{-1}{2}\\right)^3 + \\frac{3}{4} : 1{,}5 - (0{,}5)^2$.',
      answer: [1, 8],
      hints: [
        'Lũy thừa trước, rồi đến phép chia, cuối cùng là cộng, trừ.',
        '$1{,}5 = \\frac{3}{2}$ và $(0{,}5)^2 = \\frac{1}{4}$.',
      ],
      solution:
        '$\\left(\\frac{-1}{2}\\right)^3 = \\frac{-1}{8}$; $\\;\\frac{3}{4} : \\frac{3}{2} = \\frac{1}{2}$; $\\;(0{,}5)^2 = \\frac{1}{4}$. Vậy $\\frac{-1}{8} + \\frac{4}{8} - \\frac{2}{8} = \\frac{1}{8}$.',
    },
    {
      type: 'choice',
      prompt:
        'Đặt một cặp dấu ngoặc "$(\\ )$" vào $2{,}2 - 3{,}3 + 4{,}4 - 5{,}5$ để được biểu thức có giá trị bằng $0$.',
      options: [
        '$(2{,}2 - 3{,}3) + 4{,}4 - 5{,}5$',
        '$2{,}2 - (3{,}3 + 4{,}4 - 5{,}5)$',
        '$2{,}2 - 3{,}3 + (4{,}4 - 5{,}5)$',
        '$2{,}2 - (3{,}3 + 4{,}4) - 5{,}5$',
      ],
      answer: 1,
      hints: ['Tính giá trị từng phương án; trong ngoặc làm trước.'],
      solution:
        '$3{,}3 + 4{,}4 - 5{,}5 = 2{,}2$, nên $2{,}2 - (3{,}3 + 4{,}4 - 5{,}5) = 2{,}2 - 2{,}2 = 0$. Ba phương án còn lại lần lượt bằng $-2{,}2$; $-2{,}2$ và $-11$.',
    },
    {
      type: 'fraction',
      prompt: 'Tìm $x$, biết $2x + \\frac{1}{2} = \\frac{7}{9}$.',
      answer: [5, 36],
      hints: [
        'Chuyển $\\frac{1}{2}$ sang vế phải và đổi dấu.',
        'Tìm $2x$ trước, rồi chia cho $2$.',
      ],
      solution:
        '$2x = \\frac{7}{9} - \\frac{1}{2} = \\frac{14}{18} - \\frac{9}{18} = \\frac{5}{18}$; $\\;x = \\frac{5}{18} : 2 = \\frac{5}{36}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tìm $x$, biết $\\frac{3}{4} - 6x = \\frac{7}{13}$.',
      answer: [11, 312],
      hints: [
        'Chuyển $-6x$ sang vế phải và $\\frac{7}{13}$ sang vế trái.',
        'Mẫu chung của $4$ và $13$ là $52$.',
      ],
      solution:
        '$6x = \\frac{3}{4} - \\frac{7}{13} = \\frac{39}{52} - \\frac{28}{52} = \\frac{11}{52}$; $\\;x = \\frac{11}{52} : 6 = \\frac{11}{312}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tìm $x$, biết $x - \\frac{1}{4} = \\left(\\frac{-1}{2}\\right)^2$.',
      answer: [1, 2],
      hints: ['Tính vế phải trước: $\\left(\\frac{-1}{2}\\right)^2$.'],
      solution:
        '$\\left(\\frac{-1}{2}\\right)^2 = \\frac{1}{4}$, nên $x = \\frac{1}{4} + \\frac{1}{4} = \\frac{1}{2}$.',
    },
    {
      type: 'number',
      prompt:
        'Một tờ giấy dày $0{,}1$ mm. Mỗi lần gấp đôi, độ dày của xấp giấy tăng gấp $2$ lần. Sau $5$ lần gấp đôi, xấp giấy dày bao nhiêu milimét?',
      answer: 3.2,
      unit: 'mm',
      hints: ['Sau $n$ lần gấp, độ dày là $0{,}1 \\cdot 2^n$ mm.'],
      solution: 'Độ dày sau $5$ lần gấp: $0{,}1 \\cdot 2^5 = 0{,}1 \\cdot 32 = 3{,}2$ (mm).',
    },
  ],
  takeaways: [
    'Lũy thừa bậc chẵn của số âm là số dương, bậc lẻ là số âm; $\\left(\\frac{a}{b}\\right)^n = \\frac{a^n}{b^n}$.',
    'Cùng cơ số: nhân thì cộng số mũ, chia thì trừ số mũ; lũy thừa của lũy thừa thì nhân số mũ.',
    'Tính theo thứ tự: ngoặc, lũy thừa, nhân và chia, rồi mới cộng và trừ.',
    'Chuyển vế phải đổi dấu số hạng; tìm được $x$ thì thay lại để thử.',
  ],
};
