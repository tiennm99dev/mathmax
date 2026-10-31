/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'So sánh độ dài hai đồ vật bằng cách đặt chúng thẳng hàng ở một đầu; nói dài hơn, ngắn hơn, cao hơn, thấp hơn, dài nhất, ngắn nhất.',
  intro:
    'Bút chì nào dài hơn? Bạn nào cao hơn? Trong bài này, em đặt hai đồ vật cạnh nhau để so sánh xem cái nào dài hơn, cái nào ngắn hơn.',
  objectives: [
    'So sánh độ dài hai đồ vật bằng cách đặt một đầu thẳng hàng.',
    'Dùng đúng các từ dài hơn, ngắn hơn, cao hơn, thấp hơn.',
    'Tìm đồ vật dài nhất, ngắn nhất, bạn cao nhất, thấp nhất.',
  ],
  sections: [
    {
      heading: 'Dài hơn, ngắn hơn',
      blocks: [
        {
          type: 'p',
          text: 'Muốn biết bút chì nào dài hơn, em đặt hai bút chì cạnh nhau. Một đầu của hai bút phải thẳng hàng.',
        },
        {
          type: 'p',
          text: 'Sau đó em nhìn đầu bên kia. Bút nào thò ra xa hơn thì dài hơn.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Em nói',
          text: 'Bút chì xanh dài hơn bút chì đỏ. Bút chì đỏ ngắn hơn bút chì xanh.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Cẩn thận',
          text: 'Nếu hai đầu không thẳng hàng, em dễ nhìn nhầm. Bút ngắn đặt lệch ra ngoài trông như dài hơn.',
        },
      ],
    },
    {
      heading: 'Cao hơn, thấp hơn',
      blocks: [
        {
          type: 'p',
          text: 'Muốn biết bạn nào cao hơn, hai bạn đứng cạnh nhau trên cùng một mặt sàn.',
        },
        {
          type: 'p',
          text: 'Em nhìn đỉnh đầu. Bạn nào có đỉnh đầu ở cao hơn thì cao hơn.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Em nói',
          text: 'Bạn Nam cao hơn bạn Mai. Bạn Mai thấp hơn bạn Nam.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Cẩn thận',
          text: 'Bạn đứng trên ghế trông cao hơn, nhưng chưa chắc đã cao hơn thật. Hai bạn phải đứng trên cùng mặt sàn.',
        },
      ],
    },
    {
      heading: 'Dài nhất, ngắn nhất',
      blocks: [
        {
          type: 'p',
          text: 'Với ba đồ vật, em cũng đặt một đầu thẳng hàng rồi so sánh.',
        },
        {
          type: 'table',
          head: ['Đồ vật', 'So sánh'],
          rows: [
            ['Thò ra xa nhất', 'dài nhất'],
            ['Thò ra ít nhất', 'ngắn nhất'],
          ],
        },
        {
          type: 'p',
          text: 'Với ba bạn đứng cạnh nhau: bạn có đỉnh đầu cao nhất là bạn cao nhất, bạn có đỉnh đầu thấp nhất là bạn thấp nhất.',
        },
      ],
    },
  ],
  explore: {
    title: 'Vạch xuất phát',
    instruction:
      'Kéo hai vật sang trái cho sát vạch xuất phát màu đỏ, hoặc kéo hai bạn xuống đứng trên mặt sàn. Khi cả hai đã thẳng hàng, em chạm vào câu trả lời. Có thể chạm vào vật rồi dùng phím mũi tên để di chuyển.',
  },
  examples: [
    {
      problem:
        'Thước kẻ và bút chì đặt cạnh nhau, đầu bên trái thẳng hàng. Đầu bên phải của thước thò ra xa hơn. Vật nào dài hơn?',
      steps: [
        'Hai đầu bên trái đã thẳng hàng.',
        'Em nhìn đầu bên phải: thước thò ra xa hơn.',
        'Vật thò ra xa hơn thì dài hơn.',
      ],
      answer: 'Thước kẻ dài hơn bút chì. Bút chì ngắn hơn thước kẻ.',
    },
    {
      problem:
        'Bạn Lan và bạn An đứng cạnh nhau trên sàn lớp. Đỉnh đầu bạn An ở thấp hơn đỉnh đầu bạn Lan. Bạn nào cao hơn?',
      steps: ['Hai bạn đứng trên cùng mặt sàn.', 'Em so đỉnh đầu: đỉnh đầu bạn Lan ở cao hơn.'],
      answer: 'Bạn Lan cao hơn bạn An. Bạn An thấp hơn bạn Lan.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Muốn so sánh độ dài hai cây bút, em đặt hai cây bút thế nào?',
      options: ['Cạnh nhau, một đầu thẳng hàng', 'Mỗi cây một nơi', 'Chồng lên nhau, lệch tùy ý'],
      answer: 0,
      hints: ['Hai đồ vật phải bắt đầu từ cùng một chỗ.'],
      solution: 'Em đặt hai cây bút cạnh nhau, một đầu thẳng hàng, rồi nhìn đầu bên kia.',
    },
    {
      type: 'choice',
      prompt:
        'Sợi dây đỏ và sợi dây xanh đặt thẳng hàng ở đầu bên trái. Đầu bên phải của dây xanh thò ra xa hơn. Dây nào dài hơn?',
      options: ['Dây đỏ', 'Dây xanh'],
      answer: 1,
      hints: ['Dây nào thò ra xa hơn thì dài hơn.'],
      solution: 'Dây xanh thò ra xa hơn nên dây xanh dài hơn dây đỏ.',
    },
    {
      type: 'choice',
      prompt: 'Bạn Nam cao hơn bạn Mai. Vậy bạn Mai thế nào so với bạn Nam?',
      options: ['Cao hơn', 'Thấp hơn', 'Dài hơn'],
      answer: 1,
      hints: ['Nam cao hơn Mai thì Mai ngược lại.', 'Ngược với cao hơn là gì?'],
      solution: 'Bạn Nam cao hơn bạn Mai nên bạn Mai thấp hơn bạn Nam.',
    },
    {
      type: 'match',
      prompt: 'Nối mỗi từ với từ ngược nghĩa với nó.',
      left: ['dài hơn', 'cao hơn', 'dài nhất'],
      right: ['ngắn hơn', 'thấp hơn', 'ngắn nhất'],
      pairs: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      hints: ['Dài đi với ngắn, cao đi với thấp.'],
      solution: 'Dài hơn - ngắn hơn, cao hơn - thấp hơn, dài nhất - ngắn nhất.',
    },
    {
      type: 'order',
      prompt:
        'Ba bút chì đặt thẳng hàng ở một đầu. Bút đỏ thò ra ít nhất, bút xanh thò ra xa nhất. Xếp từ ngắn nhất đến dài nhất.',
      items: ['Bút xanh', 'Bút đỏ', 'Bút vàng'],
      answer: [1, 2, 0],
      hints: ['Bút thò ra ít nhất là bút ngắn nhất.', 'Bút còn lại ở giữa.'],
      solution: 'Bút đỏ ngắn nhất, rồi đến bút vàng, bút xanh dài nhất.',
    },
    {
      type: 'choice',
      prompt:
        'Bạn Lan đứng trên ghế, bạn An đứng dưới sàn. Đầu bạn Lan ở cao hơn. Đã chắc bạn Lan cao hơn chưa?',
      options: ['Chắc chắn rồi', 'Chưa chắc, hai bạn phải đứng cùng mặt sàn'],
      answer: 1,
      hints: ['Cái ghế làm bạn Lan trông cao hơn.'],
      solution: 'Chưa chắc. Muốn so chiều cao, hai bạn phải đứng trên cùng một mặt sàn.',
    },
    {
      type: 'choice',
      prompt:
        'Ba bạn đứng cạnh nhau trên sàn. Đỉnh đầu bạn Hà cao nhất, đỉnh đầu bạn Minh thấp nhất. Bạn nào thấp nhất?',
      options: ['Bạn Hà', 'Bạn Minh', 'Bạn thứ ba'],
      answer: 1,
      hints: ['Bạn có đỉnh đầu thấp nhất là bạn thấp nhất.'],
      solution: 'Đỉnh đầu bạn Minh thấp nhất nên bạn Minh thấp nhất.',
    },
  ],
  takeaways: [
    'So độ dài: đặt hai đồ vật cạnh nhau, một đầu thẳng hàng.',
    'Đồ vật thò ra xa hơn thì dài hơn, đồ vật kia ngắn hơn.',
    'So chiều cao: đứng trên cùng mặt sàn, so đỉnh đầu.',
    'Nhiều đồ vật: tìm cái dài nhất, cái ngắn nhất.',
  ],
};
