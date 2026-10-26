/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hình chóp tam giác đều: đỉnh, cạnh bên, mặt bên, mặt đáy, đường cao, trung đoạn; diện tích xung quanh bằng nửa chu vi đáy nhân trung đoạn và thể tích bằng một phần ba diện tích đáy nhân chiều cao.',
  intro:
    'Một chiếc đèn lồng giấy, một khối Rubik kim tự tháp hay mái che của một ki-ốt có chung một dạng: đáy là tam giác đều và ba mặt bên là những tam giác cân bằng nhau chụm lại ở một đỉnh. Đó là hình chóp tam giác đều. Muốn biết cần bao nhiêu giấy để làm đèn lồng hay khối Rubik chứa được bao nhiêu, em cần hai công thức: diện tích xung quanh và thể tích.',
  objectives: [
    'Nhận biết hình chóp tam giác đều và gọi tên đỉnh, cạnh bên, cạnh đáy, mặt bên, mặt đáy, đường cao, trung đoạn.',
    'Tính diện tích xung quanh theo công thức $S_{xq} = p \\cdot d$.',
    'Tính thể tích theo công thức $V = \\dfrac{1}{3} S \\cdot h$.',
    'Giải bài toán thực tế về đồ vật có dạng hình chóp tam giác đều.',
  ],
  sections: [
    {
      heading: 'Hình chóp tam giác đều',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình chóp tam giác đều',
          text: 'Hình chóp tam giác đều $S.ABC$ có mặt đáy $ABC$ là tam giác đều và ba mặt bên $SAB$, $SBC$, $SCA$ là những tam giác cân bằng nhau có chung đỉnh $S$.',
        },
        {
          type: 'list',
          items: [
            'Điểm $S$ là đỉnh của hình chóp.',
            '$SA$, $SB$, $SC$ là các cạnh bên; chúng bằng nhau.',
            '$AB$, $BC$, $CA$ là các cạnh đáy; chúng bằng nhau.',
            'Tam giác $SAB$, $SBC$, $SCA$ là các mặt bên; tam giác $ABC$ là mặt đáy.',
            'Đoạn $SH$ nối đỉnh $S$ với trọng tâm $H$ của tam giác đáy là đường cao của hình chóp; độ dài $SH$ là chiều cao $h$.',
            'Đường cao vẽ từ đỉnh $S$ của mỗi mặt bên, chẳng hạn $SI$ với $I$ là trung điểm $AB$, gọi là trung đoạn của hình chóp, kí hiệu $d$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Hình chóp tam giác đều có $4$ đỉnh, $6$ cạnh và $4$ mặt. Ba trung đoạn bằng nhau. Vì mặt bên $SAB$ cân tại $S$ nên đường cao $SI$ cũng là đường trung tuyến: $I$ là trung điểm của $AB$.',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Đừng nhầm trung đoạn $SI$ (nằm trên một mặt bên) với đường cao $SH$ (nằm bên trong hình chóp). Tam giác $SHI$ vuông tại $H$ nên trung đoạn luôn dài hơn chiều cao.',
        },
      ],
    },
    {
      heading: 'Diện tích xung quanh',
      blocks: [
        {
          type: 'p',
          text: 'Trải phẳng ba mặt bên ra ta được ba tam giác cân bằng nhau, mỗi tam giác có cạnh đáy $a$ và đường cao là trung đoạn $d$. Tổng diện tích của chúng là $3 \\cdot \\dfrac{1}{2} a \\cdot d = \\dfrac{3a}{2} \\cdot d$, mà $\\dfrac{3a}{2}$ chính là nửa chu vi đáy.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Diện tích xung quanh',
          text: 'Diện tích xung quanh của hình chóp tam giác đều bằng tích của nửa chu vi đáy với trung đoạn: $$S_{xq} = p \\cdot d,$$ trong đó $p$ là nửa chu vi đáy, $d$ là trung đoạn.',
        },
        {
          type: 'p',
          text: 'Diện tích toàn phần (tổng diện tích các mặt) bằng diện tích xung quanh cộng diện tích đáy: $S_{tp} = S_{xq} + S_{\\text{đáy}}$.',
        },
      ],
    },
    {
      heading: 'Thể tích',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Thể tích',
          text: 'Thể tích của hình chóp tam giác đều bằng một phần ba tích của diện tích đáy với chiều cao: $$V = \\frac{1}{3} S \\cdot h,$$ trong đó $S$ là diện tích đáy, $h$ là chiều cao.',
        },
        {
          type: 'p',
          text: 'Đáy là tam giác đều cạnh $a$ nên $S = \\dfrac{1}{2} a \\cdot h_{\\text{đáy}}$, với $h_{\\text{đáy}}$ là chiều cao của tam giác đáy. Đề bài thường cho sẵn $h_{\\text{đáy}}$ (hoặc giá trị gần đúng của nó); em cũng có thể tính bằng định lí Pythagore.',
        },
        {
          type: 'table',
          caption: 'Các đại lượng của hình chóp tam giác đều cạnh đáy $a$',
          head: ['Đại lượng', 'Công thức'],
          rows: [
            ['Nửa chu vi đáy', '$p = \\dfrac{3a}{2}$'],
            ['Diện tích xung quanh', '$S_{xq} = p \\cdot d$'],
            ['Diện tích toàn phần', '$S_{tp} = S_{xq} + S_{\\text{đáy}}$'],
            ['Thể tích', '$V = \\dfrac{1}{3} S \\cdot h$'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Xoay, trải phẳng và đổi chiều cao',
    instruction:
      'Kéo để xoay hình chóp $S.ABC$. Đổi cạnh đáy và chiều cao, quan sát trung đoạn, diện tích xung quanh và thể tích thay đổi theo. Kéo thanh "Trải phẳng" để mở lưới: ba mặt bên là ba tam giác cân bằng nhau.',
  },
  examples: [
    {
      problem:
        'Cho hình chóp tam giác đều $S.ABC$ có cạnh đáy $5$ cm và trung đoạn $8$ cm. Tính diện tích xung quanh.',
      steps: [
        'Chu vi đáy: $3 \\cdot 5 = 15$ (cm), nên nửa chu vi đáy $p = 7{,}5$ cm.',
        '$S_{xq} = p \\cdot d = 7{,}5 \\cdot 8$.',
      ],
      answer: '$S_{xq} = 60$ cm².',
    },
    {
      problem:
        'Một chiếc đèn lồng có dạng hình chóp tam giác đều, cạnh đáy $10$ cm, trung đoạn $8{,}7$ cm; chiều cao tam giác đáy cũng khoảng $8{,}7$ cm. Tính diện tích giấy cần dùng để dán kín tất cả các mặt của đèn (không tính mép dán).',
      steps: [
        'Nửa chu vi đáy: $p = \\dfrac{3 \\cdot 10}{2} = 15$ (cm).',
        'Diện tích xung quanh: $S_{xq} = 15 \\cdot 8{,}7 = 130{,}5$ (cm²).',
        'Diện tích đáy: $S \\approx \\dfrac{1}{2} \\cdot 10 \\cdot 8{,}7 = 43{,}5$ (cm²).',
        'Tổng: $130{,}5 + 43{,}5 = 174$ (cm²).',
      ],
      answer: 'Cần khoảng $174$ cm² giấy.',
    },
    {
      problem:
        'Một bể chứa có dạng hình chóp tam giác đều, diện tích đáy $60$ m², chiều cao $9$ m. Tính thể tích của bể.',
      steps: ['$V = \\dfrac{1}{3} S \\cdot h = \\dfrac{1}{3} \\cdot 60 \\cdot 9$.', '$V = 180$.'],
      answer: 'Thể tích của bể là $180$ m³.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Chân $H$ của đường cao $SH$ trong hình chóp tam giác đều $S.ABC$ là điểm nào?',
      options: [
        'Trung điểm của cạnh $BC$',
        'Trọng tâm của tam giác $ABC$',
        'Đỉnh $A$',
        'Một điểm bất kì trên cạnh $AB$',
      ],
      answer: 1,
      hints: ['$H$ cách đều ba đỉnh của tam giác đều $ABC$.'],
      solution:
        'Chân đường cao $H$ là trọng tâm (cũng là tâm) của tam giác đều $ABC$; nó cách đều ba đỉnh $A$, $B$, $C$. Trung điểm $BC$ là chân của trung đoạn, không phải của đường cao.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng về hình chóp tam giác đều $S.ABC$.',
      options: [
        'Ba mặt bên là những tam giác cân bằng nhau.',
        'Mặt đáy là tam giác đều.',
        'Trung đoạn chính là cạnh bên $SA$.',
        'Hình chóp có $4$ đỉnh, $6$ cạnh và $4$ mặt.',
        'Đường cao $SH$ bằng trung đoạn $SI$.',
      ],
      answers: [0, 1, 3],
      hints: [
        'Trung đoạn là đường cao của một mặt bên, kẻ từ $S$.',
        'Tam giác $SHI$ vuông tại $H$, $SI$ là cạnh huyền.',
      ],
      solution:
        'Đúng: mặt bên là các tam giác cân bằng nhau, mặt đáy là tam giác đều, hình chóp có $4$ đỉnh $S, A, B, C$, $6$ cạnh và $4$ mặt. Sai: trung đoạn là đường cao $SI$ của mặt bên chứ không phải cạnh bên; $SI$ là cạnh huyền của tam giác vuông $SHI$ nên $SI > SH$.',
    },
    {
      type: 'number',
      prompt:
        'Hình chóp tam giác đều $S.ABC$ có $AB = 4$ cm và $SC = 7$ cm. Tính tổng độ dài tất cả các cạnh của hình chóp.',
      answer: 33,
      unit: 'cm',
      hints: [
        'Ba cạnh đáy bằng nhau và ba cạnh bên bằng nhau.',
        'Hình chóp có $3$ cạnh đáy và $3$ cạnh bên.',
      ],
      solution:
        '$AB = BC = CA = 4$ cm và $SA = SB = SC = 7$ cm. Tổng: $3 \\cdot 4 + 3 \\cdot 7 = 12 + 21 = 33$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Tính diện tích xung quanh của hình chóp tam giác đều có cạnh đáy $6$ cm và trung đoạn $10$ cm.',
      answer: 90,
      unit: 'cm²',
      hints: ['Tìm nửa chu vi đáy $p$ trước.', '$S_{xq} = p \\cdot d$.'],
      solution: '$p = \\dfrac{3 \\cdot 6}{2} = 9$ (cm). $S_{xq} = 9 \\cdot 10 = 90$ (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Một hình chóp tam giác đều có cạnh đáy $6$ cm và diện tích xung quanh $72$ cm². Trung đoạn của nó dài bao nhiêu xăng-ti-mét?',
      answer: 8,
      unit: 'cm',
      hints: ['Từ $S_{xq} = p \\cdot d$ suy ra $d = S_{xq} : p$.'],
      solution: '$p = \\dfrac{3 \\cdot 6}{2} = 9$ (cm), nên $d = 72 : 9 = 8$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Hình chóp tam giác đều $S.ABC$ có cạnh đáy $6$ cm và cạnh bên $5$ cm. Tính diện tích xung quanh của hình chóp.',
      answer: 36,
      unit: 'cm²',
      hints: [
        'Trung đoạn $SI$ ($I$ là trung điểm $BC$) là đường cao của tam giác cân $SBC$.',
        'Tam giác $SIB$ vuông tại $I$, $BI = 3$ cm: dùng định lí Pythagore.',
      ],
      solution:
        'Tam giác $SIB$ vuông tại $I$ với $BI = 3$ cm, $SB = 5$ cm, nên $SI^2 = 5^2 - 3^2 = 16$ và $d = SI = 4$ cm. Nửa chu vi đáy $p = 9$ cm. $S_{xq} = 9 \\cdot 4 = 36$ (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Một khối gỗ hình chóp tam giác đều có cạnh đáy $10$ cm, chiều cao tam giác đáy khoảng $8{,}66$ cm và chiều cao của khối là $12$ cm. Tính thể tích khối gỗ (làm tròn đến hàng phần mười).',
      answer: 173.2,
      tolerance: 0.1,
      unit: 'cm³',
      hints: [
        'Diện tích đáy $S = \\dfrac{1}{2} \\cdot 10 \\cdot 8{,}66$.',
        'Sau đó dùng $V = \\dfrac{1}{3} S \\cdot h$.',
      ],
      solution:
        '$S = \\dfrac{1}{2} \\cdot 10 \\cdot 8{,}66 = 43{,}3$ (cm²). $V = \\dfrac{1}{3} \\cdot 43{,}3 \\cdot 12 = 43{,}3 \\cdot 4 = 173{,}2$ (cm³).',
    },
    {
      type: 'number',
      prompt:
        'Một hộp quà có dạng hình chóp tam giác đều mà bốn mặt là bốn tam giác đều bằng nhau, cạnh $5$ cm, chiều cao mỗi tam giác khoảng $4{,}3$ cm. Tính tổng diện tích bìa để làm một hộp (không tính mép dán).',
      answer: 43,
      unit: 'cm²',
      hints: [
        'Mỗi mặt là một tam giác có đáy $5$ cm và chiều cao $4{,}3$ cm.',
        'Hộp có $4$ mặt như nhau: ba mặt bên và mặt đáy.',
      ],
      solution:
        'Diện tích một mặt: $\\dfrac{1}{2} \\cdot 5 \\cdot 4{,}3 = 10{,}75$ (cm²). Bốn mặt: $4 \\cdot 10{,}75 = 43$ (cm²). Cách khác: $S_{xq} = 7{,}5 \\cdot 4{,}3 = 32{,}25$ (cm²), cộng đáy $10{,}75$ cm² được $43$ cm².',
    },
  ],
  takeaways: [
    'Hình chóp tam giác đều: đáy là tam giác đều, ba mặt bên là các tam giác cân bằng nhau chung đỉnh $S$.',
    'Đường cao $SH$ đi qua trọng tâm $H$ của đáy; trung đoạn $d$ là đường cao của mặt bên kẻ từ $S$.',
    '$S_{xq} = p \\cdot d$ với $p$ là nửa chu vi đáy; $S_{tp} = S_{xq} + S_{\\text{đáy}}$.',
    '$V = \\dfrac{1}{3} S \\cdot h$ với $S$ là diện tích đáy, $h$ là chiều cao.',
  ],
};
