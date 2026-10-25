/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Hoạt động thực hành: thiết kế tấm thiệp từ các hình phẳng đối xứng, đo phòng học, tính diện tích nền và diện tích các cửa để kiểm tra phòng học có đạt chuẩn ánh sáng hay không.',
  intro:
    'Em sẽ dùng những gì đã học ở chương IV và chương V vào hai việc rất gần gũi: trang trí một tấm thiệp tặng thầy cô bằng các hình phẳng đối xứng, và đo đạc chính phòng học của lớp để trả lời câu hỏi: phòng học của em có đủ ánh sáng không?',
  objectives: [
    'Vẽ, cắt và ghép các hình phẳng đã học thành một tấm thiệp có trục đối xứng.',
    'Đo chiều dài, chiều rộng của nền phòng học, cửa ra vào và cửa sổ.',
    'Tính diện tích nền $S_1$, tổng diện tích các cửa $S_2$ và chỉ số ánh sáng $A = \\dfrac{S_2}{S_1} \\cdot 100$.',
    'Kết luận phòng học có đạt chuẩn ánh sáng ($A \\ge 20$) hay không và đề xuất cách cải thiện.',
  ],
  sections: [
    {
      heading: 'Tấm thiệp từ các hình phẳng',
      blocks: [
        {
          type: 'p',
          text: 'Một tấm thiệp đẹp thường cân đối: nửa bên trái và nửa bên phải giống nhau như soi gương. Khi gấp đôi tấm thiệp theo nếp gấp ở giữa, hai nửa trùng khít lên nhau. Nếp gấp đó chính là trục đối xứng của hình trang trí.',
        },
        {
          type: 'list',
          items: [
            'Chuẩn bị: giấy bìa màu, giấy màu, thước thẳng, ê ke, compa, bút chì, kéo, hồ dán.',
            'Gấp đôi tờ bìa để có nếp gấp ở giữa.',
            'Vẽ các hình đã học (hình vuông, hình chữ nhật, hình thoi, hình bình hành, hình thang cân, tam giác đều, lục giác đều) lên giấy màu bằng thước và ê ke, rồi cắt ra.',
            'Dán các hình ở nửa bên trái, rồi dán hình giống hệt ở vị trí đối xứng bên phải qua nếp gấp.',
            'Viết lời chúc vào bên trong thiệp.',
          ],
          ordered: true,
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo cắt hình đối xứng',
          text: 'Gấp đôi tờ giấy màu, vẽ một hình rồi cắt cả hai lớp cùng lúc: em được hai hình bằng nhau, mở ra là hai hình đối xứng nhau qua nếp gấp.',
        },
        {
          type: 'p',
          text: 'Thử thiết kế trước trên màn hình: thêm hình, kéo các hình ở nửa trái và xem nửa phải tự lặp lại qua nếp gấp. Bảng bên dưới tính luôn diện tích phần trang trí bằng các công thức của Bài 20.',
        },
        { type: 'widget', name: 'card' },
      ],
    },
    {
      heading: 'Phòng học có đủ ánh sáng không?',
      blocks: [
        {
          type: 'p',
          text: 'Phòng học cần đủ ánh sáng tự nhiên để học sinh không bị mỏi mắt. Ánh sáng vào phòng qua các cửa ra vào và cửa sổ, nên người ta so sánh tổng diện tích các cửa với diện tích nền phòng.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Chỉ số ánh sáng của phòng học',
          text: 'Gọi $S_1$ là diện tích nền phòng học, $S_2$ là tổng diện tích các cửa (cửa ra vào và cửa sổ), cùng đơn vị $\\text{m}^2$. Chỉ số ánh sáng là $$A = \\frac{S_2}{S_1} \\cdot 100.$$ Nếu $A \\ge 20$ thì phòng học đạt chuẩn về ánh sáng; nếu $A < 20$ thì phòng học không đủ ánh sáng.',
        },
        {
          type: 'p',
          text: 'Nói cách khác, tổng diện tích các cửa phải bằng ít nhất $20\\%$, tức là $\\dfrac{1}{5}$, diện tích nền phòng.',
        },
        {
          type: 'table',
          head: ['Cần đo', 'Đo gì', 'Tính'],
          rows: [
            ['Nền phòng (hình chữ nhật)', 'chiều dài $a$, chiều rộng $b$', '$S_1 = a \\cdot b$'],
            [
              'Mỗi cửa ra vào, cửa sổ (hình chữ nhật)',
              'chiều rộng, chiều cao',
              'diện tích một cửa, nhân với số cửa giống nhau',
            ],
            ['Tất cả các cửa', 'số cửa mỗi loại', '$S_2 =$ tổng diện tích các cửa'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Đổi mọi số đo về mét trước khi tính. Đo cửa sổ theo phần khung cửa để ánh sáng lọt vào, không tính phần tường xung quanh.',
        },
      ],
    },
    {
      heading: 'Nhiệm vụ của nhóm em',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: Mỗi nhóm làm một tấm thiệp có trục đối xứng và trả lời câu hỏi: lớp học của em có đạt mức chuẩn về ánh sáng không?',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: Chia lớp thành các nhóm từ 6 đến 8 học sinh. Mỗi nhóm có thước dây, thước thẳng, ê ke, giấy bìa, giấy màu, kéo, hồ dán, giấy, bút và máy tính cầm tay. Địa điểm: lớp học.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Làm tấm thiệp theo các bước ở mục đầu, ghi lại tên và số đo các hình đã dùng.',
            'Đo chiều dài, chiều rộng nền phòng học (làm tròn đến $0{,}1$ m), tính $S_1$.',
            'Đếm và đo từng loại cửa ra vào, cửa sổ; tính tổng diện tích các cửa $S_2$.',
            'Tính $A = \\dfrac{S_2}{S_1} \\cdot 100$ bằng máy tính cầm tay, so sánh với $20$.',
            'Nếu $A < 20$, tính xem cần thêm ít nhất bao nhiêu cửa sổ như cửa sổ đang có để đạt chuẩn.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: Mỗi nhóm trình bày tấm thiệp (chỉ ra trục đối xứng), bảng số đo, các phép tính $S_1$, $S_2$, $A$ và kết luận về ánh sáng của phòng học, kèm đề xuất (mở thêm cửa sổ, dùng đèn chiếu sáng, không che rèm khi học).',
        },
      ],
    },
  ],
  explore: {
    title: 'Đo thử một phòng học',
    instruction:
      'Kéo các thanh trượt để nhập số đo nền phòng, cửa ra vào và cửa sổ. Quan sát $S_1$, $S_2$ và chỉ số $A$ thay đổi; tìm số cửa sổ ít nhất để phòng đạt chuẩn ánh sáng.',
  },
  examples: [
    {
      problem:
        'Nền một phòng học dài $9$ m, rộng $6$ m. Phòng có một cửa ra vào rộng $1{,}2$ m, cao $2{,}2$ m và $4$ cửa sổ, mỗi cửa sổ rộng $1{,}4$ m, cao $1{,}5$ m. Phòng học có đạt chuẩn về ánh sáng không?',
      steps: [
        'Diện tích nền: $S_1 = 9 \\cdot 6 = 54\\ (\\text{m}^2)$.',
        'Cửa ra vào: $1{,}2 \\cdot 2{,}2 = 2{,}64\\ (\\text{m}^2)$. Bốn cửa sổ: $4 \\cdot 1{,}4 \\cdot 1{,}5 = 8{,}4\\ (\\text{m}^2)$.',
        'Tổng diện tích các cửa: $S_2 = 2{,}64 + 8{,}4 = 11{,}04\\ (\\text{m}^2)$.',
        '$A = \\dfrac{11{,}04}{54} \\cdot 100 \\approx 20{,}44$.',
      ],
      answer: 'Vì $A \\approx 20{,}44 \\ge 20$ nên phòng học đạt chuẩn về ánh sáng.',
    },
    {
      problem:
        'Nếu phòng học ở ví dụ trên chỉ có $3$ cửa sổ thì sao? Khi đó cần thêm ít nhất bao nhiêu cửa sổ cùng cỡ để đạt chuẩn?',
      steps: [
        '$S_2 = 2{,}64 + 3 \\cdot 1{,}4 \\cdot 1{,}5 = 2{,}64 + 6{,}3 = 8{,}94\\ (\\text{m}^2)$.',
        '$A = \\dfrac{8{,}94}{54} \\cdot 100 \\approx 16{,}56 < 20$: phòng không đủ ánh sáng.',
        'Để đạt chuẩn cần $S_2 \\ge \\dfrac{20}{100} \\cdot 54 = 10{,}8\\ (\\text{m}^2)$, tức là còn thiếu $10{,}8 - 8{,}94 = 1{,}86\\ (\\text{m}^2)$.',
        'Mỗi cửa sổ rộng $1{,}4 \\cdot 1{,}5 = 2{,}1\\ (\\text{m}^2) > 1{,}86\\ \\text{m}^2$, nên thêm một cửa sổ là đủ.',
      ],
      answer:
        'Với $3$ cửa sổ phòng không đạt chuẩn ($A \\approx 16{,}56$); cần thêm ít nhất $1$ cửa sổ.',
    },
    {
      problem:
        'Trên mặt thiệp, bạn Mai dán ở nửa bên trái một hình thoi có hai đường chéo $4$ cm và $2$ cm, một hình chữ nhật $3$ cm $\\times$ $2$ cm, rồi dán các hình giống hệt ở vị trí đối xứng bên phải qua nếp gấp. Tính tổng diện tích giấy màu đã dán.',
      steps: [
        'Hình thoi: $S = \\dfrac{1}{2} \\cdot 4 \\cdot 2 = 4\\ (\\text{cm}^2)$.',
        'Hình chữ nhật: $S = 3 \\cdot 2 = 6\\ (\\text{cm}^2)$.',
        'Nửa trái: $4 + 6 = 10\\ (\\text{cm}^2)$. Nửa phải đối xứng với nửa trái nên có cùng diện tích.',
      ],
      answer: 'Tổng diện tích giấy màu là $2 \\cdot 10 = 20\\ (\\text{cm}^2)$.',
    },
  ],
  practice: [
    {
      type: 'number',
      prompt:
        'Nền một phòng học hình chữ nhật dài $8{,}5$ m, rộng $6$ m. Tính diện tích nền $S_1$.',
      answer: 51,
      unit: 'm²',
      hints: ['Nền phòng là hình chữ nhật: diện tích bằng chiều dài nhân chiều rộng.'],
      solution: '$S_1 = 8{,}5 \\cdot 6 = 51\\ (\\text{m}^2)$.',
    },
    {
      type: 'number',
      prompt:
        'Một phòng học có $2$ cửa ra vào, mỗi cửa rộng $1{,}2$ m, cao $2{,}2$ m, và $4$ cửa sổ, mỗi cửa rộng $1{,}5$ m, cao $1{,}4$ m. Tính tổng diện tích các cửa $S_2$.',
      answer: 13.68,
      unit: 'm²',
      hints: [
        'Tính diện tích một cửa ra vào và một cửa sổ trước.',
        'Nhân mỗi diện tích với số cửa cùng loại rồi cộng lại.',
      ],
      solution:
        'Hai cửa ra vào: $2 \\cdot 1{,}2 \\cdot 2{,}2 = 5{,}28\\ (\\text{m}^2)$. Bốn cửa sổ: $4 \\cdot 1{,}5 \\cdot 1{,}4 = 8{,}4\\ (\\text{m}^2)$. $S_2 = 5{,}28 + 8{,}4 = 13{,}68\\ (\\text{m}^2)$.',
    },
    {
      type: 'number',
      prompt:
        'Phòng học ở bài trên có nền dài $9$ m, rộng $7$ m. Tính chỉ số ánh sáng $A$ (làm tròn đến hàng phần trăm).',
      answer: 21.71,
      tolerance: 0.006,
      hints: ['$S_1 = 9 \\cdot 7$.', '$A = \\dfrac{S_2}{S_1} \\cdot 100$ với $S_2 = 13{,}68$.'],
      solution:
        '$S_1 = 9 \\cdot 7 = 63\\ (\\text{m}^2)$. $A = \\dfrac{13{,}68}{63} \\cdot 100 \\approx 21{,}71$. Vì $21{,}71 \\ge 20$ nên phòng đạt chuẩn ánh sáng.',
    },
    {
      type: 'choice',
      prompt:
        'Nền phòng học dài $10$ m, rộng $6$ m; tổng diện tích các cửa là $10{,}5\\ \\text{m}^2$. Kết luận nào đúng?',
      options: [
        'Đạt chuẩn, vì $10{,}5 > 10$.',
        'Không đạt chuẩn, vì $A = 17{,}5 < 20$.',
        'Đạt chuẩn, vì $A = 17{,}5$.',
        'Không đạt chuẩn, vì $A \\approx 5{,}71$.',
      ],
      answer: 1,
      hints: ['Tính $S_1$ trước, rồi lấy $S_2$ chia cho $S_1$ (không phải $S_1$ chia cho $S_2$).'],
      solution:
        '$S_1 = 10 \\cdot 6 = 60\\ (\\text{m}^2)$, $A = \\dfrac{10{,}5}{60} \\cdot 100 = 17{,}5 < 20$. Phòng học không đạt chuẩn ánh sáng.',
    },
    {
      type: 'number',
      prompt:
        'Nền phòng học dài $8$ m, rộng $7{,}5$ m. Tổng diện tích các cửa phải ít nhất bao nhiêu mét vuông thì phòng đạt chuẩn ánh sáng?',
      answer: 12,
      unit: 'm²',
      hints: [
        '$A \\ge 20$ nghĩa là $S_2$ bằng ít nhất $20\\%$ của $S_1$.',
        'Tính $S_1$ rồi lấy $\\dfrac{20}{100}$ của nó.',
      ],
      solution:
        '$S_1 = 8 \\cdot 7{,}5 = 60\\ (\\text{m}^2)$. Cần $S_2 \\ge \\dfrac{20}{100} \\cdot 60 = 12\\ (\\text{m}^2)$.',
    },
    {
      type: 'number',
      prompt:
        'Nền phòng học dài $9$ m, rộng $8$ m. Phòng có một cửa ra vào $1{,}2$ m $\\times$ $2{,}2$ m và $3$ cửa sổ, mỗi cửa $1{,}4$ m $\\times$ $1{,}5$ m. Cần mở thêm ít nhất bao nhiêu cửa sổ cùng cỡ để phòng đạt chuẩn ánh sáng?',
      answer: 3,
      unit: 'cửa sổ',
      hints: [
        'Tính $S_1$ và diện tích các cửa cần có: $\\dfrac{20}{100} \\cdot S_1$.',
        'Tính $S_2$ hiện có, phần còn thiếu, rồi xem cần mấy cửa sổ $2{,}1\\ \\text{m}^2$ để bù đủ.',
      ],
      solution:
        '$S_1 = 9 \\cdot 8 = 72\\ (\\text{m}^2)$, cần $S_2 \\ge 14{,}4\\ \\text{m}^2$. Hiện có $S_2 = 2{,}64 + 3 \\cdot 2{,}1 = 8{,}94\\ (\\text{m}^2)$, còn thiếu $14{,}4 - 8{,}94 = 5{,}46\\ (\\text{m}^2)$. Hai cửa sổ chỉ thêm $4{,}2\\ \\text{m}^2$ (chưa đủ), ba cửa sổ thêm $6{,}3\\ \\text{m}^2$ (đủ). Vậy cần thêm ít nhất $3$ cửa sổ.',
    },
    {
      type: 'number',
      prompt:
        'Ở nửa trái mặt thiệp, Nam dán một hình thoi có hai đường chéo $4$ cm và $2$ cm và hai hình vuông cạnh $2$ cm, rồi dán các hình giống hệt đối xứng sang nửa phải qua nếp gấp. Tổng diện tích giấy màu Nam đã dán là bao nhiêu?',
      answer: 24,
      unit: 'cm²',
      hints: [
        'Diện tích hình thoi bằng nửa tích hai đường chéo.',
        'Tính diện tích nửa trái rồi nhân đôi.',
      ],
      solution:
        'Hình thoi: $\\dfrac{1}{2} \\cdot 4 \\cdot 2 = 4\\ (\\text{cm}^2)$; hai hình vuông: $2 \\cdot 2 \\cdot 2 = 8\\ (\\text{cm}^2)$. Nửa trái: $12\\ \\text{cm}^2$. Cả thiệp: $2 \\cdot 12 = 24\\ (\\text{cm}^2)$.',
    },
    {
      type: 'choice',
      prompt:
        'Gấp đôi tấm thiệp theo nếp gấp ở giữa, hình trang trí ở hai nửa trùng khít lên nhau. Nếp gấp là gì của hình trang trí?',
      options: ['Tâm đối xứng', 'Trục đối xứng', 'Đường chéo', 'Cạnh đáy'],
      answer: 1,
      hints: ['Nhớ lại Bài 21: đường thẳng chia hình thành hai phần chồng khít khi gấp lại.'],
      solution:
        'Đường thẳng mà khi gấp hình theo nó hai phần chồng khít lên nhau là trục đối xứng của hình. Vậy nếp gấp là trục đối xứng.',
    },
  ],
  takeaways: [
    'Tấm thiệp cân đối có trục đối xứng là nếp gấp; mỗi hình ở nửa trái có một hình bằng nó ở vị trí đối xứng bên phải.',
    'Diện tích nền phòng $S_1$ và tổng diện tích các cửa $S_2$ tính bằng công thức diện tích hình chữ nhật.',
    'Chỉ số ánh sáng $A = \\dfrac{S_2}{S_1} \\cdot 100$; phòng học đạt chuẩn khi $A \\ge 20$.',
  ],
};
