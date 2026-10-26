/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương 10: hệ thống hoá hình chóp tam giác đều và hình chóp tứ giác đều, luyện trắc nghiệm, tự luận, bài toán thực tế và bài kiểm tra có bản đồ kĩ năng.',
  intro:
    'Chương 10 giới thiệu hai hình khối gặp nhiều trong đời sống: hình chóp tam giác đều và hình chóp tứ giác đều. Từ kim tự tháp, mái chòi, chiếc lều đến hộp quà hay đèn lồng, em đều có thể tính được cần bao nhiêu vật liệu (diện tích xung quanh, diện tích toàn phần) và chứa được bao nhiêu (thể tích). Bài này hệ thống lại cả chương, luyện các dạng trắc nghiệm, tự luận và vận dụng thực tế, rồi cho em một bài kiểm tra; bản đồ kĩ năng tô màu theo từng bài để chỉ ra phần đã vững và phần cần ôn lại.',
  objectives: [
    'Hệ thống hoá đặc điểm, các yếu tố và công thức của hình chóp tam giác đều và hình chóp tứ giác đều.',
    'Tính trung đoạn, diện tích xung quanh, diện tích toàn phần và thể tích; tính ngược chiều cao hay trung đoạn.',
    'Vận dụng vào bài toán thực tế về vật liệu, chi phí và sức chứa.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức',
      blocks: [
        {
          type: 'table',
          caption: 'Các kết quả chính của chương 10',
          head: ['Nội dung', 'Hình chóp tam giác đều $S.ABC$', 'Hình chóp tứ giác đều $S.ABCD$'],
          rows: [
            [
              'Đặc điểm',
              'Đáy là tam giác đều, $3$ mặt bên là tam giác cân bằng nhau',
              'Đáy là hình vuông, $4$ mặt bên là tam giác cân bằng nhau',
            ],
            ['Đỉnh, cạnh, mặt', '$4$; $6$; $4$', '$5$; $8$; $5$'],
            [
              'Đường cao $SH$',
              '$H$ là trọng tâm tam giác đáy',
              '$H$ là giao điểm hai đường chéo của đáy',
            ],
            [
              'Trung đoạn $d$',
              'Đường cao của mặt bên kẻ từ $S$',
              'Đường cao của mặt bên kẻ từ $S$',
            ],
            ['Nửa chu vi đáy', '$p = \\dfrac{3a}{2}$', '$p = 2a$'],
            ['Diện tích xung quanh', '$S_{xq} = p \\cdot d$', '$S_{xq} = p \\cdot d$'],
            [
              'Diện tích toàn phần',
              '$S_{tp} = S_{xq} + S_{\\text{đáy}}$',
              '$S_{tp} = S_{xq} + a^2$',
            ],
            ['Thể tích', '$V = \\dfrac{1}{3} S \\cdot h$', '$V = \\dfrac{1}{3} a^2 \\cdot h$'],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Vì sao có $\\dfrac{1}{3}$?',
          text: 'Rót đầy nước vào hình chóp rồi đổ sang hình hộp có cùng đáy và cùng chiều cao: đúng $3$ lần thì đầy. Vì vậy thể tích hình chóp bằng một phần ba thể tích hình hộp (lăng trụ) tương ứng.',
        },
      ],
    },
    {
      heading: 'Các dạng bài thường gặp',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Nhận biết hình chóp đều, đếm đỉnh, cạnh, mặt; gọi tên đường cao, trung đoạn.',
            'Tính diện tích xung quanh, diện tích toàn phần từ cạnh đáy và trung đoạn.',
            'Tìm trung đoạn bằng định lí Pythagore: từ cạnh bên, $d^2 = SA^2 - \\left(\\dfrac{a}{2}\\right)^2$; từ chiều cao (chóp tứ giác đều), $d^2 = h^2 + \\left(\\dfrac{a}{2}\\right)^2$.',
            'Tính thể tích, hoặc tính chiều cao $h = \\dfrac{3V}{S}$.',
            'Bài toán thực tế: vật liệu (m²), chi phí (đồng), sức chứa ($1$ dm³ $= 1$ lít).',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Hai lỗi hay gặp: dùng chiều cao $h$ thay cho trung đoạn $d$ khi tính diện tích xung quanh, và quên nhân $\\dfrac{1}{3}$ khi tính thể tích hình chóp.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Bài kiểm tra có $8$ câu, hai câu cho mỗi kĩ năng: hình chóp tam giác đều, hình chóp tứ giác đều, trung đoạn và định lí Pythagore, vận dụng thực tế. Bản đồ kĩ năng tô màu theo kết quả lần trả lời đầu tiên; ô chưa xanh là phần em nên ôn lại.',
  },
  examples: [
    {
      problem:
        'Kim tự tháp kính ở bảo tàng Louvre (Pháp) có dạng hình chóp tứ giác đều, cạnh đáy khoảng $35$ m, chiều cao khoảng $21$ m. Tính thể tích không gian bên trong kim tự tháp.',
      steps: [
        'Diện tích đáy: $S = 35^2 = 1\\,225$ (m²).',
        '$V = \\dfrac{1}{3} \\cdot 1\\,225 \\cdot 21 = 1\\,225 \\cdot 7$.',
      ],
      answer: '$V \\approx 8\\,575$ m³.',
    },
    {
      problem:
        'Một chiếc lều có dạng hình chóp tứ giác đều, cạnh đáy $3$ m, trung đoạn $2{,}5$ m. Vải may bốn mặt bên giá $40\\,000$ đồng mỗi mét vuông. Tính tiền mua vải (bỏ qua mép may).',
      steps: [
        '$p = 2 \\cdot 3 = 6$ (m), $S_{xq} = 6 \\cdot 2{,}5 = 15$ (m²).',
        'Tiền vải: $15 \\cdot 40\\,000 = 600\\,000$ (đồng).',
      ],
      answer: 'Cần $600\\,000$ đồng.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Hình nào có mặt đáy là tam giác đều và ba mặt bên là những tam giác cân bằng nhau có chung một đỉnh?',
      options: [
        'Hình lăng trụ đứng tam giác',
        'Hình chóp tam giác đều',
        'Hình chóp tứ giác đều',
        'Hình hộp chữ nhật',
      ],
      answer: 1,
      hints: ['Các mặt bên chụm lại ở một đỉnh: đó là hình chóp.'],
      solution:
        'Đó là hình chóp tam giác đều. Hình lăng trụ đứng tam giác có hai đáy và các mặt bên là hình chữ nhật; hình chóp tứ giác đều có đáy là hình vuông.',
    },
    {
      type: 'choice',
      prompt: 'Trung đoạn của một hình chóp đều là',
      options: [
        'đường cao của một mặt bên, kẻ từ đỉnh của hình chóp',
        'đoạn nối đỉnh với tâm của đáy',
        'một cạnh bên',
        'một đường chéo của đáy',
      ],
      answer: 0,
      hints: ['Đoạn nối đỉnh với tâm của đáy là đường cao của hình chóp.'],
      solution:
        'Trung đoạn là đường cao kẻ từ đỉnh $S$ của một mặt bên, ví dụ $SI$ với $I$ là trung điểm cạnh đáy. Đoạn nối $S$ với tâm $H$ của đáy là đường cao của hình chóp.',
    },
    {
      type: 'number',
      prompt: 'Hình chóp tứ giác đều có bao nhiêu mặt?',
      answer: 5,
      hints: ['Đếm các mặt bên rồi cộng thêm mặt đáy.'],
      solution: '$4$ mặt bên và $1$ mặt đáy: tổng $5$ mặt.',
    },
    {
      type: 'number',
      prompt:
        'Tính diện tích xung quanh của hình chóp tam giác đều có cạnh đáy $12$ cm và trung đoạn $10$ cm.',
      answer: 180,
      unit: 'cm²',
      hints: ['$p = \\dfrac{3a}{2}$, rồi $S_{xq} = p \\cdot d$.'],
      solution: '$p = \\dfrac{3 \\cdot 12}{2} = 18$ (cm). $S_{xq} = 18 \\cdot 10 = 180$ (cm²).',
    },
    {
      type: 'number',
      prompt: 'Tính thể tích của hình chóp tứ giác đều có cạnh đáy $10$ cm và chiều cao $15$ cm.',
      answer: 500,
      unit: 'cm³',
      hints: ['$V = \\dfrac{1}{3} a^2 \\cdot h$.'],
      solution: '$V = \\dfrac{1}{3} \\cdot 100 \\cdot 15 = 100 \\cdot 5 = 500$ (cm³).',
    },
    {
      type: 'number',
      prompt:
        'Hình chóp tứ giác đều có cạnh đáy $10$ cm và cạnh bên $13$ cm. Tính diện tích xung quanh.',
      answer: 240,
      unit: 'cm²',
      hints: [
        'Trung đoạn chia cạnh đáy thành hai đoạn $5$ cm và vuông góc với cạnh đáy.',
        '$d^2 = 13^2 - 5^2$.',
      ],
      solution:
        '$d^2 = 169 - 25 = 144$, $d = 12$ cm. $p = 2 \\cdot 10 = 20$ (cm). $S_{xq} = 20 \\cdot 12 = 240$ (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Hình chóp tứ giác đều có cạnh đáy $16$ cm và chiều cao $6$ cm. Tính diện tích toàn phần.',
      answer: 576,
      unit: 'cm²',
      hints: [
        'Tam giác $SHI$ vuông tại $H$, $HI = 8$ cm: tìm trung đoạn $d = SI$.',
        '$S_{tp} = S_{xq} + a^2$.',
      ],
      solution:
        '$d^2 = 6^2 + 8^2 = 100$, $d = 10$ cm. $S_{xq} = 32 \\cdot 10 = 320$ (cm²). $S_{tp} = 320 + 16^2 = 320 + 256 = 576$ (cm²).',
    },
    {
      type: 'number',
      prompt:
        'Một khối hình chóp tam giác đều có cạnh đáy $6$ cm, chiều cao tam giác đáy khoảng $5{,}2$ cm và chiều cao của khối là $10$ cm. Tính thể tích của khối.',
      answer: 52,
      tolerance: 0.1,
      unit: 'cm³',
      hints: ['Diện tích đáy $S = \\dfrac{1}{2} \\cdot 6 \\cdot 5{,}2$.'],
      solution:
        '$S = \\dfrac{1}{2} \\cdot 6 \\cdot 5{,}2 = 15{,}6$ (cm²). $V = \\dfrac{1}{3} \\cdot 15{,}6 \\cdot 10 = 5{,}2 \\cdot 10 = 52$ (cm³).',
    },
    {
      type: 'number',
      prompt:
        'Một bể chứa có dạng hình chóp tứ giác đều đặt ngược (đỉnh hướng xuống), cạnh đáy $6$ dm, chiều cao $9$ dm. Bể chứa được bao nhiêu lít nước khi đầy?',
      answer: 108,
      unit: 'lít',
      hints: ['Tính thể tích bằng dm³, nhớ rằng $1$ dm³ $= 1$ lít.'],
      solution:
        '$V = \\dfrac{1}{3} \\cdot 6^2 \\cdot 9 = \\dfrac{1}{3} \\cdot 324 = 108$ (dm³) $= 108$ lít.',
    },
    {
      type: 'number',
      prompt:
        'Người ta lợp mái một chòi nghỉ dạng hình chóp tứ giác đều có cạnh đáy $4$ m, trung đoạn $3{,}5$ m (không lợp đáy). Mỗi mét vuông mái tốn $150\\,000$ đồng. Tính tổng chi phí lợp mái (đồng).',
      answer: 4200000,
      unit: 'đồng',
      hints: ['Diện tích mái là diện tích xung quanh.', 'Nhân diện tích với giá mỗi mét vuông.'],
      solution:
        '$p = 2 \\cdot 4 = 8$ (m), $S_{xq} = 8 \\cdot 3{,}5 = 28$ (m²). Chi phí: $28 \\cdot 150\\,000 = 4\\,200\\,000$ (đồng).',
    },
    {
      type: 'choice',
      prompt:
        'Giữ nguyên chiều cao và tăng cạnh đáy của một hình chóp tứ giác đều lên gấp $3$. Thể tích thay đổi thế nào?',
      options: ['Gấp $3$ lần', 'Gấp $6$ lần', 'Gấp $9$ lần', 'Gấp $27$ lần'],
      answer: 2,
      hints: ['Thể tích tỉ lệ với diện tích đáy $a^2$.'],
      solution:
        "$V' = \\dfrac{1}{3} (3a)^2 h = 9 \\cdot \\dfrac{1}{3} a^2 h = 9V$. Gấp $27$ lần chỉ xảy ra khi cả chiều cao cũng tăng gấp $3$.",
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các khẳng định đúng.',
      options: [
        'Trong hình chóp đều, trung đoạn luôn dài hơn chiều cao.',
        'Các cạnh bên của hình chóp tứ giác đều bằng nhau.',
        'Thể tích hình chóp tứ giác đều bằng $\\dfrac{1}{3}$ thể tích hình hộp chữ nhật cùng đáy, cùng chiều cao.',
        'Diện tích xung quanh của hình chóp tam giác đều bằng chu vi đáy nhân trung đoạn.',
        'Hình chóp tam giác đều có $6$ mặt.',
      ],
      answers: [0, 1, 2],
      hints: [
        'Trong tam giác vuông $SHI$, cạnh nào là cạnh huyền?',
        '$S_{xq}$ dùng nửa chu vi; đếm lại số mặt của hình chóp tam giác đều.',
      ],
      solution:
        'Đúng: $SI$ là cạnh huyền của tam giác vuông $SHI$ nên $d > h$; các cạnh bên bằng nhau; $V_{\\text{chóp}} = \\dfrac{1}{3} V_{\\text{hộp}}$. Sai: $S_{xq}$ bằng nửa chu vi đáy nhân trung đoạn; hình chóp tam giác đều có $4$ mặt (nó có $6$ cạnh).',
    },
  ],
  takeaways: [
    'Hình chóp đều: đáy là đa giác đều (tam giác đều hoặc hình vuông), mặt bên là các tam giác cân bằng nhau chung đỉnh.',
    '$S_{xq} = p \\cdot d$ (nửa chu vi đáy nhân trung đoạn); $S_{tp} = S_{xq} + S_{\\text{đáy}}$.',
    '$V = \\dfrac{1}{3} S \\cdot h$: một phần ba thể tích hình hộp cùng đáy, cùng chiều cao.',
    'Trung đoạn tìm bằng định lí Pythagore trong tam giác $SIA$ hoặc $SHI$.',
  ],
};
