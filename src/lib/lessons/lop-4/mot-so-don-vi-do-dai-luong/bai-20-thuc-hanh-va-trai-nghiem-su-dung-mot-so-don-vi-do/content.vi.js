/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành dùng các đơn vị yến, tạ, tấn, dm², m², mm², giây và thế kỉ: chọn đơn vị phù hợp, ước lượng số đo, làm chai lọc nước và tính diện tích chỗ dựng trại.',
  intro:
    'Hôm nay em là nhà khoa học nhỏ! Em làm chai lọc nước, cân vật liệu, đo tấm bìa và bấm giờ. Em cũng giúp lớp chọn chỗ dựng trại nhé.',
  objectives: [
    'Chọn được đơn vị đo phù hợp với từng vật, từng việc.',
    'Ước lượng được khối lượng, diện tích, thời gian trong cuộc sống.',
    'Vận dụng đổi đơn vị để so sánh và giải quyết vấn đề thực tế.',
  ],
  sections: [
    {
      heading: 'Chọn đơn vị phù hợp',
      blocks: [
        {
          type: 'table',
          head: ['Em muốn đo', 'Vật nhỏ', 'Vật lớn'],
          rows: [
            ['Khối lượng', 'kg', 'yến, tạ, tấn'],
            ['Diện tích', 'mm², cm²', 'dm², m²'],
            ['Thời gian', 'giây, phút', 'năm, thế kỉ'],
          ],
        },
        {
          type: 'p',
          text: 'Con voi nặng khoảng 5 tấn. Mặt bàn rộng khoảng 60 dm². Chạy 60 m hết khoảng 12 giây.',
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Mẹo nhỏ',
          text: 'Trước khi đo, em ước lượng. Đo xong, em so sánh với số đã ước lượng. Khi so sánh, em đổi về cùng một đơn vị.',
        },
      ],
    },
    {
      heading: 'Dự án: Làm chai lọc nước',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: em làm một chai lọc nước, đo diện tích tấm bìa lót và bấm giờ xem chai lọc 100 ml nước hết bao lâu.',
        },
        {
          type: 'list',
          items: [
            'Chuẩn bị (cùng bố mẹ hoặc thầy cô): một chai nhựa cắt đáy, bông, cát mịn, cát hạt to, than hoạt tính, sỏi, một tấm bìa, thước kẻ, đồng hồ bấm giây.',
            'Cắt tấm bìa hình vuông cạnh 3 dm để lót dưới chai. Tính diện tích tấm bìa theo dm².',
          ],
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Nhờ người lớn đục vài lỗ nhỏ trên nắp chai, rồi úp ngược chai, nhét bông vào cổ chai.',
            'Đổ lần lượt vào chai, từ cổ chai lên: 1 thìa than hoạt tính, 3 thìa cát mịn, 3 thìa cát hạt to, 1 thìa sỏi.',
            'Rót 100 ml nước đục vào chai. Bấm đồng hồ khi bắt đầu rót, bấm dừng khi nước ngừng chảy.',
            'Ghi thời gian vào bảng theo giây, rồi đổi ra phút và giây.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo với cả lớp: diện tích tấm bìa, thời gian lọc của chai em. Chai của bạn nào lọc nhanh nhất? Nước lọc trong hơn nước lúc đầu không?',
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Nước lọc bằng chai này chưa uống được. Em chỉ dùng để quan sát hoặc tưới cây.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thử thách chọn đơn vị',
    instruction:
      'Mỗi câu, em chọn đơn vị hoặc số đo hợp lí nhất. Sai lần đầu, em có gợi ý và được thử lại.',
  },
  examples: [
    {
      problem:
        'Lọc 500 ml nước: chai A hết 250 giây, chai B hết 4 phút, chai C hết 3 phút 50 giây. Chai nào lọc nhanh nhất?',
      steps: [
        'Đổi ra giây: chai B hết 4 phút = 240 giây.',
        'Chai C hết 3 phút 50 giây = 180 giây + 50 giây = 230 giây.',
        'So sánh: 230 < 240 < 250.',
      ],
      answer: 'Chai C lọc nhanh nhất.',
    },
    {
      problem:
        'Lớp em chọn chỗ dựng trại. Chỗ A hình chữ nhật 5 m × 4 m, chỗ B hình chữ nhật 6 m × 3 m. Chỗ nào rộng hơn?',
      steps: [
        'Diện tích chỗ A: 5 × 4 = 20 (m²).',
        'Diện tích chỗ B: 6 × 3 = 18 (m²).',
        '20 m² > 18 m².',
      ],
      answer: 'Chỗ A rộng hơn.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi việc đo với đơn vị phù hợp.',
      left: ['Cân xe tải chở hàng', 'Đo sân trường', 'Bấm giờ chạy 60 m', 'Đo con tem'],
      right: ['tấn', 'm²', 'giây', 'cm²'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Cân thì dùng đơn vị khối lượng, đo mặt thì dùng đơn vị diện tích.'],
      solution: 'Xe tải: tấn. Sân trường: m². Chạy 60 m: giây. Con tem: cm².',
    },
    {
      type: 'choice',
      prompt: 'Con voi nặng khoảng bao nhiêu?',
      options: ['5 tấn', '5 tạ', '5 yến', '5 kg'],
      answer: 0,
      hints: ['Con voi nặng hàng nghìn ki-lô-gam.'],
      solution: 'Con voi nặng khoảng 5 tấn, tức là 5 000 kg.',
    },
    {
      type: 'number',
      prompt:
        'Tấm bìa lót chai lọc nước là hình vuông cạnh 3 dm. Diện tích tấm bìa là bao nhiêu đề-xi-mét vuông?',
      answer: 9,
      unit: 'dm²',
      hints: ['Diện tích hình vuông bằng cạnh nhân với cạnh.'],
      solution: '3 × 3 = 9. Diện tích tấm bìa là 9 dm².',
    },
    {
      type: 'choice',
      prompt:
        'Lọc 100 ml nước: chai A hết 3 phút 5 giây, chai B hết 190 giây, chai C hết 3 phút. Chai nào lọc chậm nhất?',
      options: ['Chai A', 'Chai B', 'Chai C'],
      answer: 1,
      hints: ['Em đổi tất cả ra giây.', '3 phút = 180 giây.'],
      solution:
        'Chai A: 3 phút 5 giây = 185 giây. Chai B: 190 giây. Chai C: 3 phút = 180 giây. 190 > 185 > 180, nên chai B lọc chậm nhất.',
    },
    {
      type: 'number',
      prompt:
        'Có 15 kg than hoạt tính, 3 yến sỏi và 5 yến cát. Cần thêm bao nhiêu ki-lô-gam nữa thì đủ 1 tạ?',
      answer: 5,
      unit: 'kg',
      hints: ['Đổi tất cả ra ki-lô-gam rồi cộng lại.', '1 tạ = 100 kg.'],
      solution:
        '3 yến = 30 kg; 5 yến = 50 kg. 15 + 30 + 50 = 95 (kg). 100 − 95 = 5. Cần thêm 5 kg.',
    },
    {
      type: 'choice',
      prompt:
        'Chỗ A 5 m × 4 m, chỗ B 6 m × 3 m, chỗ C hình vuông cạnh 4 m. Chỗ nào rộng nhất để dựng trại?',
      options: ['Chỗ A', 'Chỗ B', 'Chỗ C'],
      answer: 0,
      hints: ['Em tính diện tích từng chỗ.'],
      solution: 'Chỗ A 20 m², chỗ B 18 m², chỗ C 16 m². Chỗ A rộng nhất.',
    },
    {
      type: 'number',
      prompt: 'Chai của Nam lọc 100 ml nước hết 1 phút 45 giây. Đó là bao nhiêu giây?',
      answer: 105,
      unit: 'giây',
      hints: ['1 phút = 60 giây.'],
      solution: '1 phút 45 giây = 60 giây + 45 giây = 105 giây.',
    },
    {
      type: 'choice',
      prompt: 'Năm 1864 thuộc thế kỉ nào?',
      options: ['XVIII', 'XIX', 'XX'],
      answer: 1,
      hints: ['Thế kỉ XIX từ năm 1801 đến năm 1900.'],
      solution: 'Năm 1864 nằm từ năm 1801 đến năm 1900, nên thuộc thế kỉ XIX.',
    },
  ],
  takeaways: [
    'Vật nặng hàng chục, hàng trăm, hàng nghìn ki-lô-gam: dùng yến, tạ, tấn. Mặt rộng: dùng m²; mặt nhỏ: cm², mm².',
    'Muốn so sánh hai số đo, em đổi về cùng một đơn vị.',
  ],
};
