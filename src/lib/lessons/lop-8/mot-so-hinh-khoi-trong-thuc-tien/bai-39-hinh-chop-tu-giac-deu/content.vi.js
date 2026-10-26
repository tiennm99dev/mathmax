/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hình chóp tứ giác đều: đáy hình vuông, bốn mặt bên là tam giác cân bằng nhau; diện tích xung quanh bằng nửa chu vi đáy nhân trung đoạn, thể tích bằng một phần ba thể tích hình hộp cùng đáy, cùng chiều cao.',
  intro:
    'Kim tự tháp Kheops ở Ai Cập, mái của nhiều chòi nghỉ hay chiếc lều cắm trại có đáy là hình vuông và bốn mặt bên là những tam giác cân bằng nhau chụm lại ở đỉnh. Đó là hình chóp tứ giác đều. Nếu đổ đầy nước vào một hình chóp như thế rồi rót sang một hình hộp có cùng đáy và cùng chiều cao, em cần rót mấy lần để đầy hình hộp? Câu trả lời chính là công thức thể tích của bài này.',
  objectives: [
    'Nhận biết hình chóp tứ giác đều và gọi tên đỉnh, cạnh bên, cạnh đáy, mặt bên, mặt đáy, đường cao, trung đoạn.',
    'Tính diện tích xung quanh theo công thức $S_{xq} = p \\cdot d$ và diện tích toàn phần.',
    'Hiểu vì sao thể tích hình chóp bằng $\\dfrac{1}{3}$ thể tích hình hộp cùng đáy, cùng chiều cao; tính $V = \\dfrac{1}{3} S \\cdot h$.',
    'Giải bài toán thực tế về đồ vật có dạng hình chóp tứ giác đều.',
  ],
  sections: [
    {
      heading: 'Hình chóp tứ giác đều',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hình chóp tứ giác đều',
          text: 'Hình chóp tứ giác đều $S.ABCD$ có mặt đáy $ABCD$ là hình vuông và bốn mặt bên $SAB$, $SBC$, $SCD$, $SDA$ là những tam giác cân bằng nhau có chung đỉnh $S$.',
        },
        {
          type: 'list',
          items: [
            'Đỉnh: $S$. Cạnh bên: $SA$, $SB$, $SC$, $SD$ (bằng nhau). Cạnh đáy: $AB$, $BC$, $CD$, $DA$ (bằng nhau).',
            'Mặt bên: $SAB$, $SBC$, $SCD$, $SDA$. Mặt đáy: hình vuông $ABCD$.',
            'Đường cao $SH$, với $H$ là giao điểm hai đường chéo $AC$ và $BD$ của đáy; $SH = h$ là chiều cao của hình chóp.',
            'Trung đoạn $d$ là đường cao kẻ từ $S$ của một mặt bên, chẳng hạn $SI$ với $I$ là trung điểm của $AB$.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Hình chóp tứ giác đều có $5$ đỉnh, $8$ cạnh và $5$ mặt. Trong tam giác $SHI$ vuông tại $H$, $HI$ bằng nửa cạnh đáy, nên $d^2 = h^2 + \\left(\\dfrac{a}{2}\\right)^2$.',
        },
      ],
    },
    {
      heading: 'Diện tích xung quanh',
      blocks: [
        {
          type: 'p',
          text: 'Trải phẳng hình chóp, ta được hình vuông đáy và bốn tam giác cân bằng nhau, mỗi tam giác có đáy $a$ và đường cao $d$. Tổng diện tích bốn mặt bên là $4 \\cdot \\dfrac{1}{2} a \\cdot d = 2a \\cdot d$, mà $2a$ là nửa chu vi đáy.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Diện tích xung quanh',
          text: 'Diện tích xung quanh của hình chóp tứ giác đều bằng tích của nửa chu vi đáy với trung đoạn: $$S_{xq} = p \\cdot d.$$ Diện tích toàn phần: $S_{tp} = S_{xq} + S_{\\text{đáy}}$.',
        },
        { type: 'widget', name: 'trai-phang' },
      ],
    },
    {
      heading: 'Thể tích',
      blocks: [
        {
          type: 'p',
          text: 'Lấy một hình chóp tứ giác đều và một hình hộp chữ nhật có cùng đáy (hình vuông cạnh $a$) và cùng chiều cao $h$. Đổ đầy nước vào hình chóp rồi rót sang hình hộp: sau đúng $3$ lần rót thì hình hộp đầy. Vậy thể tích hình chóp bằng $\\dfrac{1}{3}$ thể tích hình hộp: $V = \\dfrac{1}{3} a^2 h$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Thể tích',
          text: 'Thể tích của hình chóp tứ giác đều bằng một phần ba tích của diện tích đáy với chiều cao: $$V = \\frac{1}{3} S \\cdot h,$$ trong đó $S$ là diện tích đáy, $h$ là chiều cao.',
        },
        {
          type: 'table',
          caption: 'Hình chóp tứ giác đều cạnh đáy $a$, chiều cao $h$, trung đoạn $d$',
          head: ['Đại lượng', 'Công thức'],
          rows: [
            ['Nửa chu vi đáy', '$p = 2a$'],
            ['Diện tích xung quanh', '$S_{xq} = p \\cdot d = 2a \\cdot d$'],
            ['Diện tích toàn phần', '$S_{tp} = S_{xq} + a^2$'],
            ['Thể tích', '$V = \\dfrac{1}{3} a^2 \\cdot h$'],
          ],
        },
      ],
    },
  ],
  explore: {
    title: 'Rót nước từ hình chóp sang hình hộp',
    instruction:
      'Hình chóp (đặt ngược) và hình hộp có cùng đáy vuông, cùng chiều cao. Đoán số lần rót, rồi nhấn "Rót" cho đến khi hình hộp đầy. Đổi cạnh đáy và chiều cao rồi làm lại: tỉ số có thay đổi không?',
  },
  examples: [
    {
      problem:
        'Hình chóp tứ giác đều $S.ABCD$ có cạnh đáy $6$ cm và chiều cao $4$ cm. Tính trung đoạn, diện tích xung quanh và diện tích toàn phần.',
      steps: [
        'Gọi $I$ là trung điểm $AB$. Tam giác $SHI$ vuông tại $H$ với $SH = 4$ cm, $HI = 6 : 2 = 3$ cm.',
        '$SI^2 = 4^2 + 3^2 = 25$, nên trung đoạn $d = SI = 5$ cm.',
        '$p = 2 \\cdot 6 = 12$ (cm), $S_{xq} = 12 \\cdot 5 = 60$ (cm²).',
        '$S_{tp} = 60 + 6^2 = 96$ (cm²).',
      ],
      answer: '$d = 5$ cm, $S_{xq} = 60$ cm², $S_{tp} = 96$ cm².',
    },
    {
      problem:
        'Kim tự tháp Kheops có dạng hình chóp tứ giác đều, cạnh đáy khoảng $230$ m, chiều cao khoảng $147$ m. Tính thể tích của kim tự tháp.',
      steps: [
        'Diện tích đáy: $S = 230^2 = 52\\,900$ (m²).',
        '$V = \\dfrac{1}{3} \\cdot 52\\,900 \\cdot 147 = 52\\,900 \\cdot 49$.',
      ],
      answer: '$V \\approx 2\\,592\\,100$ m³.',
    },
    {
      problem:
        'Một hình hộp chữ nhật và một hình chóp tứ giác đều có cùng đáy là hình vuông cạnh $5$ cm và cùng chiều cao $12$ cm. Thể tích hình chóp nhỏ hơn thể tích hình hộp bao nhiêu?',
      steps: [
        '$V_{\\text{hộp}} = 5^2 \\cdot 12 = 300$ (cm³).',
        '$V_{\\text{chóp}} = \\dfrac{1}{3} \\cdot 300 = 100$ (cm³).',
        'Hiệu: $300 - 100 = 200$ (cm³).',
      ],
      answer: 'Nhỏ hơn $200$ cm³.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Mặt đáy của hình chóp tứ giác đều là hình gì?',
      options: ['Hình chữ nhật', 'Hình thoi', 'Hình vuông', 'Hình bình hành'],
      answer: 2,
      hints: ['Đáy phải có bốn cạnh bằng nhau và bốn góc bằng nhau.'],
      solution:
        'Đáy của hình chóp tứ giác đều là hình vuông. Hình chữ nhật hay hình thoi chưa đủ "đều" (thiếu cạnh bằng nhau hoặc góc bằng nhau).',
    },
    {
      type: 'choice',
      prompt: 'Chân đường cao $H$ của hình chóp tứ giác đều $S.ABCD$ là điểm nào?',
      options: [
        'Trung điểm của $AB$',
        'Giao điểm hai đường chéo $AC$ và $BD$',
        'Đỉnh $A$',
        'Trung điểm của $SA$',
      ],
      answer: 1,
      hints: ['$H$ cách đều bốn đỉnh của hình vuông đáy.'],
      solution:
        '$H$ là tâm của hình vuông $ABCD$, tức giao điểm hai đường chéo $AC$ và $BD$. Trung điểm $AB$ là chân của trung đoạn $SI$.',
    },
    {
      type: 'number',
      prompt: 'Hình chóp tứ giác đều có tất cả bao nhiêu cạnh (kể cả cạnh đáy và cạnh bên)?',
      answer: 8,
      hints: ['Đếm $4$ cạnh đáy rồi đếm các cạnh bên đi từ đỉnh $S$.'],
      solution: 'Có $4$ cạnh đáy $AB, BC, CD, DA$ và $4$ cạnh bên $SA, SB, SC, SD$: tổng $8$ cạnh.',
    },
    {
      type: 'number',
      prompt:
        'Tính diện tích xung quanh của hình chóp tứ giác đều có cạnh đáy $10$ cm và trung đoạn $13$ cm.',
      answer: 260,
      unit: 'cm²',
      hints: ['Nửa chu vi đáy hình vuông cạnh $a$ là $2a$.'],
      solution: '$p = 2 \\cdot 10 = 20$ (cm). $S_{xq} = 20 \\cdot 13 = 260$ (cm²).',
    },
    {
      type: 'number',
      prompt: 'Tính thể tích của hình chóp tứ giác đều có cạnh đáy $9$ cm và chiều cao $10$ cm.',
      answer: 270,
      unit: 'cm³',
      hints: ['Diện tích đáy $S = 9^2$.', '$V = \\dfrac{1}{3} S \\cdot h$.'],
      solution: '$S = 81$ cm². $V = \\dfrac{1}{3} \\cdot 81 \\cdot 10 = 27 \\cdot 10 = 270$ (cm³).',
    },
    {
      type: 'number',
      prompt:
        'Một hình chóp tứ giác đều có thể tích $96$ cm³ và cạnh đáy $6$ cm. Chiều cao của hình chóp là bao nhiêu xăng-ti-mét?',
      answer: 8,
      unit: 'cm',
      hints: ['Từ $V = \\dfrac{1}{3} S \\cdot h$ suy ra $h = \\dfrac{3V}{S}$.'],
      solution: '$S = 6^2 = 36$ (cm²). $h = \\dfrac{3 \\cdot 96}{36} = \\dfrac{288}{36} = 8$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Hình chóp tứ giác đều $S.ABCD$ có cạnh đáy $18$ cm và chiều cao $12$ cm. Tính diện tích xung quanh.',
      answer: 540,
      unit: 'cm²',
      hints: [
        'Tìm trung đoạn $SI$ trong tam giác $SHI$ vuông tại $H$, với $HI$ bằng nửa cạnh đáy.',
        '$SI^2 = 12^2 + 9^2$.',
      ],
      solution:
        '$HI = 9$ cm, $SI^2 = 144 + 81 = 225$, nên $d = 15$ cm. $p = 2 \\cdot 18 = 36$ (cm). $S_{xq} = 36 \\cdot 15 = 540$ (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Hình chóp tứ giác đều có cạnh đáy $6$ cm và cạnh bên $5$ cm. Tính diện tích xung quanh của hình chóp.',
      answer: 48,
      unit: 'cm²',
      hints: [
        'Trung đoạn là đường cao của mặt bên, một tam giác cân có hai cạnh bên $5$ cm và đáy $6$ cm.',
        'Đường cao ấy chia đáy thành hai nửa $3$ cm; dùng định lí Pythagore.',
      ],
      solution:
        'Trung đoạn $d$: $d^2 = 5^2 - 3^2 = 16$, $d = 4$ cm. $p = 2 \\cdot 6 = 12$ (cm). $S_{xq} = 12 \\cdot 4 = 48$ (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Một hình hộp chữ nhật và một hình chóp tứ giác đều có cùng đáy và cùng chiều cao. Hình hộp có thể tích $750$ cm³. Thể tích hình chóp là bao nhiêu?',
      answer: 250,
      unit: 'cm³',
      hints: ['Nhớ thí nghiệm rót nước: cần mấy lần rót đầy hình chóp để đầy hình hộp?'],
      solution: '$V_{\\text{chóp}} = \\dfrac{1}{3} V_{\\text{hộp}} = \\dfrac{750}{3} = 250$ (cm³).',
    },
    {
      type: 'number',
      prompt:
        'Một chiếc lều cắm trại có dạng hình chóp tứ giác đều, cạnh đáy $3$ m, trung đoạn $2{,}5$ m. Tính diện tích vải phủ bốn mặt bên của lều (không tính đáy và mép may).',
      answer: 15,
      unit: 'm²',
      hints: ['Diện tích vải chính là diện tích xung quanh $S_{xq} = p \\cdot d$.'],
      solution: '$p = 2 \\cdot 3 = 6$ (m). $S_{xq} = 6 \\cdot 2{,}5 = 15$ (m²).',
    },
  ],
  takeaways: [
    'Hình chóp tứ giác đều: đáy là hình vuông, bốn mặt bên là các tam giác cân bằng nhau chung đỉnh $S$; có $5$ đỉnh, $8$ cạnh, $5$ mặt.',
    'Chân đường cao $H$ là giao điểm hai đường chéo của đáy; trung đoạn $d$ thoả $d^2 = h^2 + \\left(\\dfrac{a}{2}\\right)^2$.',
    '$S_{xq} = p \\cdot d$ với $p = 2a$ là nửa chu vi đáy; $S_{tp} = S_{xq} + a^2$.',
    '$V = \\dfrac{1}{3} S \\cdot h$: bằng một phần ba thể tích hình hộp cùng đáy, cùng chiều cao.',
  ],
};
