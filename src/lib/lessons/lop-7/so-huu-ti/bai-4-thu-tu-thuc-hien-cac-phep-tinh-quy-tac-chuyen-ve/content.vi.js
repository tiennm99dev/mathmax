/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thứ tự thực hiện các phép tính với số hữu tỉ, quy tắc chuyển vế trong một đẳng thức và cách tìm x đơn giản.',
  intro:
    'Hai bạn cùng tính $\\frac{1}{3} + \\frac{2}{3} \\cdot \\frac{-3}{4}$ nhưng ra hai kết quả khác nhau: một bạn cộng trước, một bạn nhân trước. Ai đúng? Bài này nhắc lại thứ tự thực hiện các phép tính, rồi học quy tắc chuyển vế, công cụ giúp tìm số chưa biết $x$ thật gọn.',
  objectives: [
    'Thực hiện đúng thứ tự các phép tính trong biểu thức có và không có dấu ngoặc.',
    'Phát biểu và vận dụng quy tắc chuyển vế.',
    'Tìm $x$ trong các đẳng thức đơn giản với số hữu tỉ.',
  ],
  sections: [
    {
      heading: '1. Thứ tự thực hiện các phép tính',
      blocks: [
        {
          type: 'p',
          text: 'Thứ tự thực hiện các phép tính với số hữu tỉ giống như với số nguyên.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Biểu thức không có dấu ngoặc',
          text: 'Nếu chỉ có phép cộng, trừ hoặc chỉ có phép nhân, chia, ta thực hiện từ trái sang phải. Nếu có cả cộng, trừ, nhân, chia, nâng lên lũy thừa, ta thực hiện: lũy thừa $\\rightarrow$ nhân và chia $\\rightarrow$ cộng và trừ.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Biểu thức có dấu ngoặc',
          text: 'Ta thực hiện trong ngoặc trước, theo thứ tự ngoặc tròn $(\\ )$ $\\rightarrow$ ngoặc vuông $[\\ ]$ $\\rightarrow$ ngoặc nhọn $\\{\\ \\}$.',
        },
        {
          type: 'tex',
          tex: '\\frac{1}{3} + \\frac{2}{3} \\cdot \\frac{-3}{4} = \\frac{1}{3} + \\frac{-1}{2} = \\frac{2}{6} + \\frac{-3}{6} = \\frac{-1}{6}',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: 'Cộng trước rồi mới nhân là sai: $\\left(\\frac{1}{3} + \\frac{2}{3}\\right) \\cdot \\frac{-3}{4} = \\frac{-3}{4}$ là một biểu thức khác. Với chuỗi chỉ có nhân, chia, phải làm từ trái sang phải: $1 : \\frac{1}{2} \\cdot 2 = 2 \\cdot 2 = 4$, không phải $1 : 1 = 1$.',
        },
      ],
    },
    {
      heading: '2. Quy tắc chuyển vế',
      blocks: [
        {
          type: 'p',
          text: 'Nếu cộng (hoặc trừ) cùng một số vào hai vế của một đẳng thức thì ta được một đẳng thức mới: nếu $a = b$ thì $a + c = b + c$. Từ tính chất này ta có quy tắc chuyển vế.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Quy tắc chuyển vế',
          text: 'Khi chuyển một số hạng từ vế này sang vế kia của một đẳng thức, ta phải đổi dấu số hạng đó: dấu "$+$" đổi thành dấu "$-$" và dấu "$-$" đổi thành dấu "$+$".',
        },
        {
          type: 'tex',
          tex: 'x + a = b \\;\\Rightarrow\\; x = b - a; \\qquad x - a = b \\;\\Rightarrow\\; x = b + a',
        },
        {
          type: 'p',
          text: 'Hình dung đẳng thức là một chiếc cân thăng bằng: chuyển $+\\frac{3}{4}$ từ đĩa trái sang đĩa phải thành $-\\frac{3}{4}$ thì hai đĩa vẫn nặng bằng nhau, vì thực chất ta đã trừ $\\frac{3}{4}$ ở cả hai vế.',
        },
      ],
    },
    {
      heading: '3. Tìm x',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Dùng quy tắc chuyển vế để đưa các số hạng chứa $x$ về một vế, các số về vế kia.',
            'Thu gọn vế chứa các số theo đúng thứ tự thực hiện phép tính.',
            'Nếu còn dạng $a \\cdot x = b$ ($a \\ne 0$) thì $x = b : a$.',
            'Thử lại bằng cách thay $x$ vào đẳng thức ban đầu.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Khi $x$ đứng sau dấu trừ, như $\\frac{3}{4} - x = \\frac{5}{8}$, hãy chuyển $x$ sang vế kia cho dương: $\\frac{3}{4} - \\frac{5}{8} = x$.',
        },
      ],
    },
  ],
  explore: {
    title: 'Cân thăng bằng và quy tắc chuyển vế',
    instruction:
      'Chọn một đẳng thức. Chạm vào một số hạng (không phải $x$) để chuyển nó sang vế kia. Với chế độ "Đổi dấu số hạng", cân luôn thăng bằng; thử chế độ "Giữ nguyên dấu" để thấy cân bị lệch, rồi nhấn "Hoàn tác". Khi $x$ đứng một mình, hãy tính vế còn lại để tìm $x$.',
  },
  examples: [
    {
      problem: 'Tính $\\frac{3}{4} - \\frac{1}{2} \\cdot \\left(\\frac{-2}{3}\\right)^2 : 0{,}5$.',
      steps: [
        'Lũy thừa trước: $\\left(\\frac{-2}{3}\\right)^2 = \\frac{4}{9}$.',
        'Nhân, chia từ trái sang phải: $\\frac{1}{2} \\cdot \\frac{4}{9} = \\frac{2}{9}$; $\\;\\frac{2}{9} : 0{,}5 = \\frac{2}{9} \\cdot 2 = \\frac{4}{9}$.',
        'Trừ sau cùng: $\\frac{3}{4} - \\frac{4}{9} = \\frac{27}{36} - \\frac{16}{36} = \\frac{11}{36}$.',
      ],
      answer: 'Kết quả bằng $\\frac{11}{36}$.',
    },
    {
      problem:
        'Tính $\\left[\\left(\\frac{1}{2} - \\frac{5}{6}\\right) : \\frac{2}{3}\\right]^2 + 0{,}75$.',
      steps: [
        'Ngoặc tròn: $\\frac{1}{2} - \\frac{5}{6} = \\frac{3}{6} - \\frac{5}{6} = \\frac{-1}{3}$.',
        'Ngoặc vuông: $\\frac{-1}{3} : \\frac{2}{3} = \\frac{-1}{3} \\cdot \\frac{3}{2} = \\frac{-1}{2}$.',
        'Lũy thừa: $\\left(\\frac{-1}{2}\\right)^2 = \\frac{1}{4}$; cộng: $\\frac{1}{4} + 0{,}75 = 0{,}25 + 0{,}75 = 1$.',
      ],
      answer: 'Kết quả bằng $1$.',
    },
    {
      problem: 'Tìm $x$, biết $x - \\frac{2}{5} = -\\frac{1}{3}$.',
      steps: [
        'Chuyển $-\\frac{2}{5}$ sang vế phải và đổi dấu: $x = -\\frac{1}{3} + \\frac{2}{5}$.',
        'Quy đồng mẫu $15$: $x = \\frac{-5}{15} + \\frac{6}{15} = \\frac{1}{15}$.',
        'Thử lại: $\\frac{1}{15} - \\frac{6}{15} = \\frac{-5}{15} = -\\frac{1}{3}$. Đúng.',
      ],
      answer: '$x = \\frac{1}{15}$.',
    },
    {
      problem: 'Tìm $x$, biết $\\frac{3}{4} - x = \\frac{5}{8}$.',
      steps: [
        'Chuyển $-x$ sang vế phải thành $+x$, chuyển $\\frac{5}{8}$ sang vế trái thành $-\\frac{5}{8}$: $\\frac{3}{4} - \\frac{5}{8} = x$.',
        '$x = \\frac{6}{8} - \\frac{5}{8} = \\frac{1}{8}$.',
      ],
      answer: '$x = \\frac{1}{8}$.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Sắp xếp thứ tự thực hiện các phép tính trong một biểu thức không có dấu ngoặc.',
      items: ['Cộng và trừ', 'Nâng lên lũy thừa', 'Nhân và chia'],
      answer: [1, 2, 0],
      hints: ['Phép tính "mạnh" hơn được làm trước.'],
      solution: 'Lũy thừa $\\rightarrow$ nhân và chia $\\rightarrow$ cộng và trừ.',
    },
    {
      type: 'number',
      prompt: 'Tính $2{,}5 - 1{,}5 \\cdot 2^2$.',
      answer: -3.5,
      hints: ['Lũy thừa trước, rồi nhân, rồi mới trừ.'],
      solution: '$2^2 = 4$; $\\;1{,}5 \\cdot 4 = 6$; $\\;2{,}5 - 6 = -3{,}5$.',
    },
    {
      type: 'number',
      prompt: 'Tính $\\left(\\frac{-1}{2}\\right)^3 \\cdot 4 + \\frac{3}{2}$.',
      answer: 1,
      hints: ['$\\left(\\frac{-1}{2}\\right)^3 = \\frac{-1}{8}$.'],
      solution: '$\\frac{-1}{8} \\cdot 4 + \\frac{3}{2} = \\frac{-1}{2} + \\frac{3}{2} = 1$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tính $\\left[\\frac{5}{6} - \\left(\\frac{1}{3} - 0{,}5\\right)\\right] : \\frac{2}{7}$.',
      answer: [7, 2],
      hints: [
        'Ngoặc tròn trước: $\\frac{1}{3} - \\frac{1}{2}$.',
        'Rồi đến ngoặc vuông, cuối cùng là phép chia.',
      ],
      solution:
        '$\\frac{1}{3} - 0{,}5 = \\frac{2}{6} - \\frac{3}{6} = \\frac{-1}{6}$; $\\;\\frac{5}{6} - \\frac{-1}{6} = \\frac{6}{6} = 1$; $\\;1 : \\frac{2}{7} = \\frac{7}{2}$.',
    },
    {
      type: 'choice',
      prompt: 'Từ $x + \\frac{3}{5} = -\\frac{1}{2}$, áp dụng quy tắc chuyển vế ta được:',
      options: [
        '$x = -\\frac{1}{2} + \\frac{3}{5}$',
        '$x = -\\frac{1}{2} - \\frac{3}{5}$',
        '$x = \\frac{1}{2} - \\frac{3}{5}$',
        '$x = \\frac{3}{5} - \\frac{1}{2}$',
      ],
      answer: 1,
      hints: ['Số hạng $+\\frac{3}{5}$ sang vế phải phải đổi dấu.'],
      solution:
        'Chuyển $+\\frac{3}{5}$ sang vế phải thành $-\\frac{3}{5}$: $x = -\\frac{1}{2} - \\frac{3}{5}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tìm $x$, biết $x + \\frac{3}{5} = -\\frac{1}{2}$.',
      answer: [-11, 10],
      hints: ['$x = -\\frac{1}{2} - \\frac{3}{5}$.', 'Quy đồng mẫu $10$.'],
      solution:
        '$x = -\\frac{1}{2} - \\frac{3}{5} = \\frac{-5}{10} - \\frac{6}{10} = \\frac{-11}{10}$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $x$, biết $x - 1{,}25 = -0{,}5$.',
      answer: 0.75,
      hints: ['Chuyển $-1{,}25$ sang vế phải thành $+1{,}25$.'],
      solution: '$x = -0{,}5 + 1{,}25 = 0{,}75$.',
    },
    {
      type: 'fraction',
      prompt: 'Tìm $x$, biết $\\frac{2}{3} - x = \\frac{-1}{4}$.',
      answer: [11, 12],
      hints: ['Chuyển $-x$ sang vế phải và $\\frac{-1}{4}$ sang vế trái.'],
      solution:
        '$\\frac{2}{3} + \\frac{1}{4} = x$, nên $x = \\frac{8}{12} + \\frac{3}{12} = \\frac{11}{12}$.',
    },
    {
      type: 'fraction',
      prompt: 'Tìm $x$, biết $x + \\frac{1}{6} = \\frac{3}{4} - \\frac{1}{3}$.',
      answer: [1, 4],
      hints: ['Thu gọn vế phải trước: $\\frac{3}{4} - \\frac{1}{3} = \\frac{5}{12}$.'],
      solution:
        '$\\frac{3}{4} - \\frac{1}{3} = \\frac{9}{12} - \\frac{4}{12} = \\frac{5}{12}$; $\\;x = \\frac{5}{12} - \\frac{1}{6} = \\frac{5}{12} - \\frac{2}{12} = \\frac{3}{12} = \\frac{1}{4}$.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn An giải: $x - \\frac{2}{7} = \\frac{1}{7} \\Rightarrow x = \\frac{1}{7} - \\frac{2}{7} = \\frac{-1}{7}$. An sai ở đâu?',
      options: [
        'Chuyển $-\\frac{2}{7}$ sang vế phải mà không đổi dấu',
        'Tính sai $\\frac{1}{7} - \\frac{2}{7}$',
        'An làm đúng',
        'Phải nhân hai vế với $7$ trước',
      ],
      answer: 0,
      hints: ['Thử lại: thay $x = \\frac{-1}{7}$ vào vế trái.'],
      solution:
        'Chuyển $-\\frac{2}{7}$ sang vế phải phải thành $+\\frac{2}{7}$: $x = \\frac{1}{7} + \\frac{2}{7} = \\frac{3}{7}$. Thử lại với $\\frac{-1}{7}$: $\\frac{-1}{7} - \\frac{2}{7} = \\frac{-3}{7} \\ne \\frac{1}{7}$.',
    },
    {
      type: 'number',
      prompt: 'Tìm $x$, biết $\\frac{3}{4} \\cdot x - \\frac{1}{2} = 1$.',
      answer: 2,
      hints: [
        'Chuyển vế trước: $\\frac{3}{4} \\cdot x = 1 + \\frac{1}{2}$.',
        'Rồi chia cho $\\frac{3}{4}$.',
      ],
      solution:
        '$\\frac{3}{4} \\cdot x = \\frac{3}{2}$, nên $x = \\frac{3}{2} : \\frac{3}{4} = \\frac{3}{2} \\cdot \\frac{4}{3} = 2$.',
    },
  ],
  takeaways: [
    'Không có ngoặc: lũy thừa $\\rightarrow$ nhân, chia $\\rightarrow$ cộng, trừ; cùng loại thì từ trái sang phải.',
    'Có ngoặc: $(\\ )$ $\\rightarrow$ $[\\ ]$ $\\rightarrow$ $\\{\\ \\}$.',
    'Chuyển một số hạng sang vế kia thì đổi dấu số hạng đó: $x + a = b \\Rightarrow x = b - a$.',
    'Tìm xong $x$, hãy thay lại vào đẳng thức để kiểm tra.',
  ],
};
