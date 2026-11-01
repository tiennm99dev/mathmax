/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Thực hành gấp, cắt, ghép, xếp hình từ giấy và vẽ đoạn thẳng có độ dài cho trước bằng thước có vạch xăng-ti-mét.',
  intro:
    'Hôm nay em làm thợ thủ công! Em gấp giấy, cắt giấy, xếp thành hình mới. Rồi em dùng thước vẽ đoạn thẳng thật đúng số xăng-ti-mét.',
  objectives: [
    'Gấp, cắt tờ giấy thành các hình đã học.',
    'Ghép, xếp các mảnh thành hình theo mẫu.',
    'Vẽ đoạn thẳng có độ dài cho trước bằng thước.',
    'Đo độ dài đoạn thẳng bằng thước.',
  ],
  sections: [
    {
      heading: 'Gấp, cắt và ghép hình',
      blocks: [
        {
          type: 'p',
          text: 'Gấp một góc tờ giấy hình chữ nhật cho mép giấy trùng nhau, rồi cắt phần thừa. Em được một hình vuông và một hình chữ nhật.',
        },
        {
          type: 'p',
          text: 'Gấp hình vuông theo hai đường chéo, mở ra rồi cắt theo nếp gấp. Em được bốn hình tam giác. Bốn hình này xếp được nhiều hình khác nhau.',
        },
        { type: 'widget', name: 'ghep-hinh' },
      ],
    },
    {
      heading: 'Vẽ đoạn thẳng',
      blocks: [
        {
          type: 'p',
          text: 'Muốn vẽ đoạn thẳng AB dài 9 cm, em làm theo bốn bước.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Chấm một điểm và đặt tên là A.',
            'Đặt thước sao cho vạch 0 trùng với điểm A.',
            'Chấm điểm B ở vạch 9 của thước.',
            'Dùng thước nối A với B.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dễ nhầm',
          text: 'Phải bắt đầu từ vạch 0, không bắt đầu từ vạch 1. Bắt đầu từ vạch 1 thì đoạn thẳng sẽ bị ngắn đi 1 cm.',
        },
      ],
    },
    {
      heading: 'Em tự làm',
      project: true,
      blocks: [
        {
          type: 'p',
          text: 'Mục tiêu: em tự cắt bốn hình tam giác, xếp thành hình theo ý mình, rồi vẽ và đo các đoạn thẳng.',
        },
        {
          type: 'p',
          text: 'Chuẩn bị: một tờ giấy màu, kéo (nhờ người lớn giúp), thước có vạch xăng-ti-mét, bút chì và vở.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Gấp, cắt tờ giấy hình chữ nhật thành một hình vuông và một hình chữ nhật.',
            'Gấp, cắt hình vuông thành bốn hình tam giác.',
            'Dùng bốn hình tam giác xếp một hình em thích.',
            'Vẽ vào vở đoạn thẳng AB dài 9 cm và đoạn thẳng CD dài 12 cm.',
            'Đo lại hai đoạn thẳng vừa vẽ.',
          ],
        },
        {
          type: 'p',
          text: 'Báo cáo: em cho bạn hoặc người lớn xem hình đã xếp. Em nói số đo của đoạn AB và đoạn CD em đo được.',
        },
      ],
    },
  ],
  explore: {
    title: 'Thước vẽ đoạn thẳng',
    instruction:
      'Kéo thước cho vạch 0 trùng với điểm đầu. Kéo điểm cuối đến đúng vạch cần vẽ. Rồi chạm nút để nối hai điểm. Em cũng có thể dùng phím mũi tên.',
  },
  examples: [
    {
      problem: 'Vẽ đoạn thẳng CD dài 12 cm.',
      steps: [
        'Chấm một điểm và đặt tên là C.',
        'Đặt thước sao cho vạch 0 trùng với điểm C.',
        'Chấm điểm D ở vạch 12 của thước.',
        'Dùng thước nối C với D.',
      ],
      answer: 'Em được đoạn thẳng CD dài 12 cm.',
    },
    {
      problem: 'Dùng một hình vuông bằng giấy, làm sao để có bốn hình tam giác?',
      steps: [
        'Gấp hình vuông theo một đường chéo, mở ra.',
        'Gấp theo đường chéo còn lại, mở ra.',
        'Cắt theo hai nếp gấp.',
      ],
      answer: 'Em được bốn hình tam giác bằng nhau.',
    },
  ],
  practice: [
    {
      type: 'order',
      prompt: 'Xếp các bước vẽ đoạn thẳng GH dài 6 cm theo đúng thứ tự.',
      items: [
        'Nối G với H',
        'Chấm điểm G',
        'Chấm điểm H ở vạch 6',
        'Đặt vạch 0 của thước trùng với điểm G',
      ],
      answer: [1, 3, 2, 0],
      hints: ['Phải có điểm G trước, rồi mới đặt thước.'],
      solution: 'Chấm điểm G, đặt vạch 0 trùng với G, chấm điểm H ở vạch 6, rồi nối G với H.',
    },
    {
      type: 'choice',
      prompt: 'Muốn vẽ đoạn thẳng MN dài 8 cm, em chấm điểm N ở vạch nào của thước?',
      options: ['Vạch 0', 'Vạch 9', 'Vạch 8'],
      answer: 2,
      hints: ['Điểm M đã ở vạch 0. Độ dài cần vẽ là bao nhiêu?'],
      solution: 'Điểm M ở vạch 0, đoạn thẳng dài 8 cm nên điểm N ở vạch 8.',
    },
    {
      type: 'choice',
      prompt: 'Đặt thước để điểm P ở vạch 0 và điểm Q ở vạch 11. Đoạn thẳng PQ dài bao nhiêu?',
      options: ['11 cm', '10 cm', '12 cm'],
      answer: 0,
      hints: ['Một đầu ở vạch 0, em đọc số ở đầu kia.'],
      solution: 'Đầu Q ở vạch 11, nên đoạn thẳng PQ dài 11 cm.',
    },
    {
      type: 'choice',
      prompt: 'Bạn Nam đặt điểm A ở vạch 1 và chấm điểm B ở vạch 7. Đoạn thẳng AB dài bao nhiêu?',
      options: ['7 cm', '6 cm', '8 cm'],
      answer: 1,
      hints: ['A không ở vạch 0. Em đếm số xăng-ti-mét từ vạch 1 đến vạch 7.'],
      solution: 'Từ vạch 1 đến vạch 7 là: 7 − 1 = 6 (cm). Đoạn thẳng AB dài 6 cm.',
    },
    {
      type: 'choice',
      prompt: 'Gấp, cắt một hình vuông theo hai đường chéo. Em được mấy hình tam giác?',
      options: ['2 hình', '3 hình', '4 hình'],
      answer: 2,
      hints: ['Hai đường chéo cắt nhau chia hình vuông thành các phần bằng nhau. Em đếm các phần.'],
      solution: 'Hai đường chéo chia hình vuông thành 4 phần, mỗi phần là một hình tam giác.',
    },
    {
      type: 'choice',
      prompt: 'Muốn ghép lại thành tờ giấy ban đầu từ 1 hình vuông và 1 hình chữ nhật, em làm gì?',
      options: [
        'Đặt sát hai hình theo cạnh bằng nhau',
        'Cắt nhỏ hình vuông',
        'Xếp chồng hai hình lên nhau',
      ],
      answer: 0,
      hints: ['Hai mảnh phải nằm cạnh nhau, không có khe hở.'],
      solution: 'Đặt sát hai hình theo cạnh dài bằng nhau, em được lại tờ giấy hình chữ nhật.',
    },
  ],
  takeaways: [
    'Gấp đúng nếp rồi cắt, em tạo được các hình đã học; các mảnh lại ghép được thành hình mới.',
    'Vẽ đoạn thẳng: chấm điểm đầu, đặt vạch 0 trùng điểm đó, chấm điểm cuối ở vạch cần vẽ, rồi nối lại.',
    'Đo đoạn thẳng: đặt một đầu ở vạch 0, đọc số ở đầu kia.',
  ],
};
