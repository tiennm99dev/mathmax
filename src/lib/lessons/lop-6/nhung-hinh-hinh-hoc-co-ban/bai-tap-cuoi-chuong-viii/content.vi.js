/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Bài tập cuối chương VIII: hệ thống hoá điểm, đường thẳng, tia, đoạn thẳng, trung điểm, góc và số đo góc, kèm bài kiểm tra có bản đồ kĩ năng theo từng bài.',
  intro:
    'Chương VIII giới thiệu những hình hình học cơ bản nhất: điểm, đường thẳng, tia, đoạn thẳng, trung điểm và góc. Từ đó em biết đo độ dài, đo góc, nhận ra ba điểm thẳng hàng hay một điểm nằm trong góc. Bài này hệ thống lại toàn chương và cho em một bài kiểm tra tổng hợp; bản đồ kĩ năng sẽ chỉ ra bài nào em đã vững và bài nào cần ôn lại.',
  objectives: [
    'Hệ thống hoá kiến thức chương Những hình hình học cơ bản.',
    'Làm bài tập trắc nghiệm và tự luận tổng hợp: đếm đường thẳng, tia, đoạn thẳng, góc; tính độ dài đoạn thẳng; đo và phân loại góc.',
    'Vận dụng vào các tình huống thực tế: quãng đường, điểm chính giữa, góc giữa hai kim đồng hồ.',
  ],
  sections: [
    {
      heading: 'Hệ thống kiến thức chương VIII',
      blocks: [
        {
          type: 'table',
          caption: 'Kiến thức chính theo từng bài',
          head: ['Bài', 'Kiến thức cần nhớ'],
          rows: [
            [
              'Bài 32. Điểm và đường thẳng',
              '$A \\in d$, $B \\notin d$. Qua hai điểm phân biệt có một và chỉ một đường thẳng. Ba điểm cùng thuộc một đường thẳng thì thẳng hàng. Hai đường thẳng phân biệt hoặc cắt nhau (một điểm chung), hoặc song song (không có điểm chung).',
            ],
            [
              'Bài 33. Điểm nằm giữa hai điểm. Tia',
              'Trong ba điểm thẳng hàng có một và chỉ một điểm nằm giữa hai điểm còn lại. Điểm $O$ trên đường thẳng $xy$ chia nó thành hai tia đối nhau $Ox$, $Oy$. Tia gọi tên gốc trước.',
            ],
            [
              'Bài 34. Đoạn thẳng. Độ dài đoạn thẳng',
              'Đoạn thẳng $AB$ gồm $A$, $B$ và mọi điểm nằm giữa $A$, $B$. Mỗi đoạn thẳng có một độ dài, là một số dương. Nếu $M$ nằm giữa $A$ và $B$ thì $AM + MB = AB$.',
            ],
            [
              'Bài 35. Trung điểm của đoạn thẳng',
              '$M$ là trung điểm của $AB$ khi $M$ nằm giữa $A$, $B$ và $MA = MB$; khi đó $MA = MB = \\dfrac{AB}{2}$.',
            ],
            [
              'Bài 36. Góc',
              'Góc là hình gồm hai tia chung gốc (đỉnh, hai cạnh), kí hiệu $\\widehat{xOy}$. Góc bẹt có hai cạnh là hai tia đối nhau. Điểm nằm trong góc thuộc phần "kẹp giữa" hai cạnh.',
            ],
            [
              'Bài 37. Số đo góc',
              'Đo góc bằng thước đo góc, đơn vị độ. Mỗi góc có một số đo, không vượt quá $180^\\circ$. Góc nhọn ($< 90^\\circ$), vuông ($= 90^\\circ$), tù (giữa $90^\\circ$ và $180^\\circ$), bẹt ($= 180^\\circ$).',
            ],
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Ba công thức đếm hay dùng',
          text: 'Từ $n$ điểm phân biệt có $n \\cdot (n - 1) : 2$ đoạn thẳng nối từng cặp điểm (và cũng ngần ấy đường thẳng nếu không có ba điểm nào thẳng hàng). Từ $n$ tia chung gốc phân biệt có $n \\cdot (n - 1) : 2$ góc. Trên đường thẳng, $n$ điểm là gốc của $2n$ tia.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ sai',
          text: '$MA = MB$ chưa đủ để $M$ là trung điểm của $AB$: còn cần $M$ nằm giữa $A$ và $B$. Khi đo góc, phải đọc trên hàng số có vạch $0$ nằm ở một cạnh của góc.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bài kiểm tra cuối chương',
    instruction:
      'Mỗi lượt có $12$ câu, hai câu cho mỗi bài từ Bài 32 đến Bài 37; đáp án là một số tự nhiên (số đo góc chỉ nhập số). Bản đồ kĩ năng tô màu từng bài theo kết quả lần trả lời đầu tiên: xanh là vững, vàng là cần luyện thêm, đỏ là nên ôn lại bài đó.',
  },
  examples: [
    {
      problem:
        'Trên tia $Ox$ lấy hai điểm $A$, $B$ sao cho $OA = 2$ cm, $OB = 6$ cm. a) Tính $AB$. b) Gọi $M$ là trung điểm của $AB$. Tính $OM$. c) Lấy điểm $C$ trên tia đối của tia $Ox$ sao cho $OC = 2$ cm. Điểm $O$ có là trung điểm của $AC$ không?',
      steps: [
        'a) $A$, $B$ cùng nằm trên tia $Ox$ và $OA < OB$ nên $A$ nằm giữa $O$ và $B$: $AB = OB - OA = 6 - 2 = 4$ (cm).',
        'b) $M$ là trung điểm của $AB$ nên $AM = 4 : 2 = 2$ (cm). $A$ nằm giữa $O$ và $M$, nên $OM = OA + AM = 2 + 2 = 4$ (cm).',
        'c) $C$ thuộc tia đối của $Ox$, $A$ thuộc tia $Ox$, nên $O$ nằm giữa $A$ và $C$. Lại có $OA = OC = 2$ cm, nên $O$ là trung điểm của $AC$.',
      ],
      answer: 'a) $AB = 4$ cm. b) $OM = 4$ cm. c) Có, $O$ là trung điểm của $AC$.',
    },
    {
      problem:
        'Vẽ đường thẳng $xy$, lấy $O$ trên $xy$ và vẽ hai tia $Om$, $On$ phân biệt, không nằm trên $xy$. a) Có bao nhiêu góc đỉnh $O$ tạo bởi bốn tia $Ox$, $Oy$, $Om$, $On$? b) Góc nào trong số đó chắc chắn là góc bẹt? c) Đo được $\\widehat{xOm} = 90^\\circ$, $\\widehat{xOn} = 40^\\circ$. Mỗi góc này là góc gì? So sánh chúng.',
      steps: [
        'a) Bốn tia chung gốc cho $4 \\cdot 3 : 2 = 6$ góc: $xOy$, $xOm$, $xOn$, $yOm$, $yOn$, $mOn$.',
        'b) $O$ nằm trên $xy$ nên $Ox$, $Oy$ là hai tia đối nhau: $\\widehat{xOy}$ là góc bẹt.',
        'c) $\\widehat{xOm} = 90^\\circ$ là góc vuông; $0^\\circ < 40^\\circ < 90^\\circ$ nên $\\widehat{xOn}$ là góc nhọn.',
        '$40^\\circ < 90^\\circ$ nên $\\widehat{xOn} < \\widehat{xOm}$.',
      ],
      answer:
        'a) $6$ góc. b) $\\widehat{xOy}$. c) $\\widehat{xOm}$ vuông, $\\widehat{xOn}$ nhọn, $\\widehat{xOn} < \\widehat{xOm}$.',
    },
  ],
  practice: [
    {
      type: 'multi',
      prompt:
        'Ba điểm $A$, $B$, $C$ cùng nằm trên đường thẳng $d$, điểm $D$ không nằm trên $d$. Chọn tất cả các khẳng định đúng.',
      options: [
        '$C \\in d$',
        '$D \\in d$',
        'Ba điểm $A$, $B$, $C$ thẳng hàng',
        'Ba điểm $A$, $B$, $D$ thẳng hàng',
      ],
      answers: [0, 2],
      hints: ['Ba điểm thẳng hàng khi chúng cùng thuộc một đường thẳng.'],
      solution:
        '$C$ thuộc $d$ nên $C \\in d$; $A$, $B$, $C$ cùng thuộc $d$ nên thẳng hàng. $D \\notin d$, mà đường thẳng $AB$ chính là $d$, nên $A$, $B$, $D$ không thẳng hàng.',
    },
    {
      type: 'number',
      prompt:
        'Cho năm điểm, trong đó không có ba điểm nào thẳng hàng. Kẻ các đường thẳng đi qua từng cặp điểm. Có bao nhiêu đường thẳng?',
      answer: 10,
      hints: [
        'Mỗi cặp điểm cho một đường thẳng khác nhau.',
        'Mỗi điểm ghép được với $4$ điểm còn lại.',
      ],
      solution: 'Có $5 \\cdot 4 : 2 = 10$ đường thẳng.',
    },
    {
      type: 'choice',
      prompt: 'Hai đường thẳng phân biệt không có điểm chung nào thì',
      options: ['cắt nhau', 'song song', 'trùng nhau', 'vuông góc'],
      answer: 1,
      hints: ['Cắt nhau thì có đúng một điểm chung.'],
      solution: 'Hai đường thẳng không có điểm chung nào là hai đường thẳng song song.',
    },
    {
      type: 'choice',
      prompt:
        'Trên đường thẳng $xy$ lấy ba điểm $M$, $N$, $P$ theo thứ tự đó. Khẳng định nào đúng?',
      options: [
        'Tia $NM$ và tia $NP$ đối nhau',
        'Tia $MN$ và tia $NP$ trùng nhau',
        'Tia $MN$ và tia $PN$ đối nhau',
        'Điểm $M$ nằm giữa $N$ và $P$',
      ],
      answer: 0,
      hints: ['Hai tia đối nhau phải chung gốc.'],
      solution:
        '$N$ nằm giữa $M$ và $P$ nên hai tia chung gốc $NM$, $NP$ đối nhau. Các cặp còn lại không chung gốc; $M$ không nằm giữa $N$ và $P$.',
    },
    {
      type: 'number',
      prompt: 'Điểm $M$ nằm giữa hai điểm $A$ và $B$, $AB = 7$ cm, $AM = 3$ cm. Tính $MB$ (cm).',
      answer: 4,
      unit: 'cm',
      hints: ['$AM + MB = AB$.'],
      solution: '$MB = AB - AM = 7 - 3 = 4$ (cm).',
    },
    {
      type: 'number',
      prompt: '$I$ là trung điểm của đoạn thẳng $AB$, $AB = 11$ cm. Tính $IA$ (cm).',
      answer: 5.5,
      unit: 'cm',
      hints: ['Trung điểm chia đôi đoạn thẳng.'],
      solution: '$IA = IB = \\dfrac{AB}{2} = 11 : 2 = 5{,}5$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Trên tia $Ox$ lấy hai điểm $A$, $B$ với $OA = 3$ cm, $OB = 8$ cm. Gọi $I$ là trung điểm của $AB$. Tính $OI$ (cm).',
      answer: 5.5,
      unit: 'cm',
      hints: ['$A$ nằm giữa $O$ và $B$; tính $AB$ trước.', 'Sau đó $OI = OA + AI$.'],
      solution:
        '$AB = 8 - 3 = 5$ (cm), $AI = 5 : 2 = 2{,}5$ (cm), $OI = OA + AI = 3 + 2{,}5 = 5{,}5$ (cm).',
    },
    {
      type: 'number',
      prompt:
        'Nhà An $(A)$, hiệu sách $(M)$ và trường học $(B)$ nằm trên một con đường thẳng, hiệu sách nằm giữa nhà và trường. Biết $AM = 1{,}2$ km, $MB = 0{,}8$ km. Quãng đường từ nhà An đến trường dài bao nhiêu ki-lô-mét?',
      answer: 2,
      unit: 'km',
      hints: ['$M$ nằm giữa $A$ và $B$.'],
      solution: '$AB = AM + MB = 1{,}2 + 0{,}8 = 2$ (km).',
    },
    {
      type: 'number',
      prompt:
        'Vẽ sáu tia chung gốc $O$ phân biệt. Có bao nhiêu góc có đỉnh $O$ và hai cạnh là hai trong sáu tia đó?',
      answer: 15,
      hints: ['Mỗi góc ứng với một cặp tia; mỗi tia ghép với $5$ tia còn lại.'],
      solution: 'Có $6 \\cdot 5 : 2 = 15$ góc.',
    },
    {
      type: 'multi',
      prompt:
        'Cho góc $xOy$ không bẹt, $A \\in Ox$, $B \\in Oy$ ($A$, $B$ khác $O$), $I$ nằm giữa $A$ và $B$. Chọn tất cả các điểm nằm trong góc $xOy$.',
      options: ['$O$', '$A$', '$I$', 'Trung điểm của đoạn $AB$'],
      answers: [2, 3],
      hints: ['Trung điểm của $AB$ cũng là một điểm nằm giữa $A$ và $B$.'],
      solution:
        'Mọi điểm nằm giữa $A$ và $B$ đều nằm trong góc: đó là $I$ và trung điểm của $AB$. $O$ là đỉnh, $A$ nằm trên cạnh.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi số đo với loại góc tương ứng.',
      left: ['$35^\\circ$', '$90^\\circ$', '$135^\\circ$', '$180^\\circ$'],
      right: ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['So sánh với $90^\\circ$ và $180^\\circ$.'],
      solution:
        '$35^\\circ < 90^\\circ$: nhọn; $90^\\circ$: vuông; $90^\\circ < 135^\\circ < 180^\\circ$: tù; $180^\\circ$: bẹt.',
    },
    {
      type: 'number',
      prompt: 'Lúc $7$ giờ đúng, kim giờ và kim phút tạo thành góc bao nhiêu độ?',
      answer: 150,
      unit: '°',
      hints: ['Đếm số khoảng giờ ít nhất giữa số $7$ và số $12$; mỗi khoảng là $30^\\circ$.'],
      solution:
        'Từ số $7$ đến số $12$ (theo chiều ngắn hơn) có $5$ khoảng: góc $5 \\cdot 30^\\circ = 150^\\circ$, là góc tù.',
    },
    {
      type: 'order',
      prompt: 'Sắp xếp các thời điểm theo góc giữa hai kim đồng hồ, từ nhỏ đến lớn.',
      items: ['$1$ giờ', '$4$ giờ', '$3$ giờ', '$6$ giờ'],
      answer: [0, 2, 1, 3],
      hints: ['Tính góc ở từng thời điểm, mỗi khoảng giờ là $30^\\circ$.'],
      solution:
        '$1$ giờ: $30^\\circ$; $3$ giờ: $90^\\circ$; $4$ giờ: $120^\\circ$; $6$ giờ: $180^\\circ$.',
    },
  ],
  takeaways: [
    'Điểm nằm giữa quyết định tia đối nhau và phép cộng độ dài $AM + MB = AB$.',
    'Trung điểm $M$ của $AB$: $M$ nằm giữa $A$, $B$ và $MA = MB = \\dfrac{AB}{2}$.',
    'Góc là hình gồm hai tia chung gốc; số đo góc từ trên $0^\\circ$ đến $180^\\circ$ cho biết góc nhọn, vuông, tù hay bẹt.',
    'Từ $n$ điểm (hoặc $n$ tia chung gốc) có $n \\cdot (n - 1) : 2$ cặp: đoạn thẳng (hoặc góc).',
  ],
};
