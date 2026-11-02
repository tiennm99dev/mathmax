/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Luyện tập nhận dạng khối trụ, khối cầu, đếm các khối, tìm khối theo quy luật và giải bài toán thực tế.',
  intro:
    'Em đã biết khối trụ và khối cầu. Hôm nay em ôn lại cùng các khối đã học, tìm quy luật và giúp chú voi kéo khối gỗ nhé!',
  objectives: [
    'Nhận dạng khối trụ, khối cầu, khối hộp chữ nhật và khối lập phương.',
    'Đếm các khối trong hình và tìm khối theo quy luật.',
    'Giải bài toán thực tế có các khối.',
  ],
  sections: [
    {
      heading: 'Nhớ lại',
      blocks: [
        {
          type: 'table',
          head: ['Khối', 'Nhận biết', 'Đồ vật'],
          rows: [
            ['Khối trụ', 'Hai mặt tròn phẳng, một mặt cong', 'Lon sữa, ống nước'],
            ['Khối cầu', 'Tròn đều về mọi phía', 'Quả bóng, quả cam'],
            ['Khối hộp chữ nhật', '6 mặt, có mặt là hình chữ nhật', 'Hộp quà, quyển sách'],
            ['Khối lập phương', '6 mặt đều là hình vuông', 'Con xúc xắc'],
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Khối trụ nằm ngang vẫn là khối trụ. Tên của khối không đổi theo màu sắc, to nhỏ hay cách đặt.',
        },
      ],
    },
    {
      heading: 'Em thử ở nhà',
      blocks: [
        {
          type: 'p',
          text: 'Em dùng các khối trong bộ đồ dùng học tập, hoặc lon sữa, quả bóng, hộp giấy ở nhà, để xếp một ngôi nhà, một chiếc xe hay một đoàn tàu. Rồi em kể xem mình đã dùng những khối nào.',
        },
      ],
    },
  ],
  explore: {
    title: 'Bộ bài tập trộn',
    instruction:
      'Nhìn hình rồi chạm vào đáp án. Sai lần đầu, em được gợi ý và làm lại. Hết bộ, em biết phần nào cần ôn và có thể làm bộ khác.',
  },
  examples: [
    {
      problem:
        'Voi kéo các khối gỗ: khối cầu nặng 35 kg, khối cầu nặng 25 kg, khối trụ nặng 20 kg, khối trụ nặng 30 kg. Hai khối cầu nặng tất cả bao nhiêu ki-lô-gam?',
      steps: [
        'Em chỉ lấy hai khối cầu: 35 kg và 25 kg.',
        'Bài giải: Hai khối cầu nặng tất cả là: 35 + 25 = 60 (kg).',
      ],
      answer: 'Đáp số: 60 kg.',
    },
    {
      problem:
        'Tê tê đào một cái hang dạng khối trụ. Lúc 4 giờ hang sâu 20 cm, lúc 5 giờ hang sâu 90 cm. Từ 4 giờ đến 5 giờ hang sâu thêm bao nhiêu xăng-ti-mét?',
      steps: [
        'Muốn biết sâu thêm bao nhiêu, em lấy số lớn trừ số bé.',
        'Bài giải: Hang sâu thêm là: 90 − 20 = 70 (cm).',
      ],
      answer: 'Đáp số: 70 cm.',
    },
  ],
  practice: [
    {
      type: 'match',
      prompt: 'Nối mỗi vật với khối có dạng của vật đó.',
      left: ['Lon sữa', 'Quả bưởi', 'Con xúc xắc', 'Hộp quà dài'],
      right: ['Khối trụ', 'Khối cầu', 'Khối lập phương', 'Khối hộp chữ nhật'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
      ],
      hints: ['Em nhớ lại mỗi khối có những mặt nào.'],
      solution:
        'Lon sữa có dạng khối trụ, quả bưởi có dạng khối cầu, con xúc xắc có dạng khối lập phương, hộp quà dài có dạng khối hộp chữ nhật.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn người tuyết có phần thân dưới tròn đều như một quả bóng to. Phần đó có dạng khối gì?',
      options: ['Khối cầu', 'Khối trụ', 'Khối lập phương'],
      answer: 0,
      hints: ['Khối nào tròn đều về mọi phía?'],
      solution: 'Phần thân dưới của người tuyết có dạng khối cầu.',
    },
    {
      type: 'multi',
      prompt: 'Chọn tất cả các vật có dạng khối cầu.',
      options: ['Quả địa cầu', 'Ống nước', 'Viên bi', 'Quyển sách', 'Quả cam'],
      answers: [0, 2, 4],
      hints: ['Có nhiều hơn một vật. Tìm các vật tròn đều về mọi phía.'],
      solution:
        'Quả địa cầu, viên bi và quả cam có dạng khối cầu. Ống nước có dạng khối trụ, quyển sách có dạng khối hộp chữ nhật.',
    },
    {
      type: 'count',
      prompt: 'Quả bóng có dạng khối cầu. Có mấy quả bóng?',
      picture: 'ball',
      answer: 7,
      choices: [6, 7, 8],
      hints: ['Em chỉ tay vào từng quả bóng và đếm.'],
      solution: 'Có 7 quả bóng.',
    },
    {
      type: 'choice',
      prompt:
        'Các khối xếp theo thứ tự: khối trụ, khối cầu, khối hộp chữ nhật, khối lập phương, khối trụ, khối cầu, ? Khối nào thay vào dấu hỏi?',
      options: ['Khối hộp chữ nhật', 'Khối trụ', 'Khối cầu', 'Khối lập phương'],
      answer: 0,
      hints: ['Nhóm 4 khối đầu tiên lặp lại. Sau khối cầu là khối nào?'],
      solution:
        'Nhóm khối trụ, khối cầu, khối hộp chữ nhật, khối lập phương lặp lại, nên sau khối cầu là khối hộp chữ nhật.',
    },
    {
      type: 'choice',
      prompt:
        'Voi kéo các khối gỗ: khối cầu nặng 35 kg, khối cầu nặng 25 kg, khối trụ nặng 20 kg, khối trụ nặng 30 kg. Em chọn một khối cầu và một khối trụ sao cho nhẹ nhất. Hai khối đó nặng tất cả bao nhiêu ki-lô-gam?',
      options: ['45 kg', '55 kg', '65 kg'],
      answer: 0,
      hints: ['Chọn khối cầu nhẹ hơn và khối trụ nhẹ hơn, rồi cộng lại.'],
      solution:
        'Khối cầu nhẹ hơn nặng 25 kg, khối trụ nhẹ hơn nặng 20 kg. 25 + 20 = 45 (kg). Đáp số: 45 kg.',
    },
    {
      type: 'choice',
      prompt:
        'Hang tê tê dạng khối trụ. Lúc 4 giờ hang sâu 20 cm, lúc 4 giờ 30 phút hang sâu 60 cm. Hang sâu thêm bao nhiêu xăng-ti-mét?',
      options: ['40 cm', '80 cm', '30 cm'],
      answer: 0,
      hints: ['Em lấy số lớn trừ số bé.'],
      solution: 'Hang sâu thêm là: 60 − 20 = 40 (cm). Đáp số: 40 cm.',
    },
    {
      type: 'order',
      prompt: 'Xếp các khối gỗ từ nhẹ nhất đến nặng nhất.',
      items: ['Khối cầu 35 kg', 'Khối trụ 20 kg', 'Khối cầu 25 kg', 'Khối trụ 30 kg'],
      answer: [1, 2, 3, 0],
      hints: ['Em chỉ so sánh số ki-lô-gam, không cần nhìn dạng của khối.'],
      solution: '20 kg < 25 kg < 30 kg < 35 kg.',
    },
    {
      type: 'choice',
      prompt: 'Mỗi hộp có 5 lon sữa dạng khối trụ. Hỏi 3 hộp như vậy có tất cả bao nhiêu lon sữa?',
      options: ['15 lon sữa', '8 lon sữa', '20 lon sữa'],
      answer: 0,
      hints: ['Lấy số lon ở một hộp nhân với số hộp.'],
      solution: '3 hộp có tất cả là: 5 × 3 = 15 (lon sữa). Đáp số: 15 lon sữa.',
    },
    {
      type: 'choice',
      prompt:
        'Các hộp dạng khối trụ xếp thành 5 hàng: 1 hộp, 2 hộp, 3 hộp, 4 hộp, 5 hộp. Có tất cả bao nhiêu hộp?',
      options: ['15 hộp', '10 hộp', '14 hộp'],
      answer: 0,
      hints: ['Em cộng số hộp của từng hàng, từ hàng trên xuống hàng dưới.'],
      solution: '1 + 2 + 3 + 4 + 5 = 15. Có tất cả 15 hộp.',
    },
  ],
  takeaways: [
    'Khối trụ có hai mặt tròn phẳng và một mặt cong; khối cầu tròn đều về mọi phía.',
    'Tên của khối không đổi theo màu sắc, to nhỏ hay cách đặt.',
    'Khi có nhóm khối lặp lại, em tìm nhóm đó rồi đọc tiếp để biết khối sau.',
  ],
};
