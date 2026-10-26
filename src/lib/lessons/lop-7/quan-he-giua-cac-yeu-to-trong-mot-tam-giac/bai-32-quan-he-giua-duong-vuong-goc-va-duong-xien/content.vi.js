/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Đường vuông góc và đường xiên kẻ từ một điểm đến một đường thẳng, đường vuông góc là đường ngắn nhất, và khoảng cách từ một điểm đến một đường thẳng.',
  intro:
    'Nam đứng ở điểm $O$ trên bờ một con sông có hai bờ song song và muốn bơi sang bờ bên kia. Nam nên bơi theo hướng nào để quãng đường bơi là ngắn nhất? Bài này trả lời câu hỏi đó bằng quan hệ giữa đường vuông góc và đường xiên.',
  objectives: [
    'Nhận biết đường vuông góc, chân đường vuông góc và đường xiên kẻ từ một điểm đến một đường thẳng.',
    'Giải thích vì sao đường vuông góc ngắn hơn mọi đường xiên kẻ từ cùng một điểm đến cùng một đường thẳng.',
    'Nhận biết và tìm khoảng cách từ một điểm đến một đường thẳng.',
  ],
  sections: [
    {
      heading: 'Đường vuông góc và đường xiên',
      blocks: [
        {
          type: 'p',
          text: 'Cho điểm $A$ không nằm trên đường thẳng $d$. Kẻ đường thẳng qua $A$ vuông góc với $d$, cắt $d$ tại $H$.',
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Khái niệm',
          text: 'Đoạn thẳng $AH$ gọi là đoạn vuông góc hay đường vuông góc kẻ từ $A$ đến đường thẳng $d$; điểm $H$ gọi là chân đường vuông góc (hay hình chiếu) của $A$ trên $d$. Lấy điểm $M$ thuộc $d$, khác $H$: đoạn thẳng $AM$ gọi là một đường xiên kẻ từ $A$ đến đường thẳng $d$.',
        },
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Trong các đường xiên và đường vuông góc kẻ từ một điểm nằm ngoài một đường thẳng đến đường thẳng đó, đường vuông góc là đường ngắn nhất.',
        },
        { type: 'tex', tex: 'AH \\perp d,\\; M \\in d,\\; M \\ne H \\;\\Rightarrow\\; AH < AM' },
        {
          type: 'p',
          text: 'Giải thích: tam giác $AHM$ vuông tại $H$ nên $\\widehat{AHM} = 90^\\circ$ là góc lớn nhất của tam giác (hai góc còn lại đều nhọn). Theo quan hệ giữa góc và cạnh đối diện (Bài 31), cạnh $AM$ đối diện với góc vuông là cạnh lớn nhất, nên $AM > AH$.',
        },
      ],
    },
    {
      heading: 'Khoảng cách từ một điểm đến một đường thẳng',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Định nghĩa',
          text: 'Độ dài đường vuông góc $AH$ kẻ từ $A$ đến đường thẳng $d$ gọi là khoảng cách từ điểm $A$ đến đường thẳng $d$.',
        },
        {
          type: 'p',
          text: 'Như vậy khoảng cách từ $A$ đến $d$ là độ dài nhỏ nhất trong các đoạn thẳng nối $A$ với một điểm của $d$. Muốn đo nó, ta kẻ đường vuông góc từ $A$ xuống $d$ bằng ê ke rồi đo độ dài đoạn vuông góc.',
        },
        {
          type: 'list',
          items: [
            'Trong tam giác vuông, mỗi cạnh góc vuông là đường vuông góc, cạnh huyền là đường xiên kẻ từ cùng một đỉnh, nên cạnh huyền dài hơn mỗi cạnh góc vuông.',
            'Trong hình chữ nhật $ABCD$, khoảng cách từ $D$ đến đường thẳng $AB$ bằng $AD$, vì $DA \\perp AB$.',
          ],
        },
        {
          type: 'callout',
          tone: 'warning',
          text: 'Khoảng cách từ $A$ đến $d$ là độ dài của đường vuông góc, không phải độ dài của một đường xiên bất kì, dù đường xiên đó có ngắn đến đâu.',
        },
      ],
    },
  ],
  explore: {
    title: 'Tìm đường ngắn nhất xuống đường thẳng',
    instruction:
      'Kéo điểm $M$ dọc đường thẳng $d$ và theo dõi độ dài $AM$ trên đồ thị phía dưới. Độ dài nhỏ nhất đạt được ở đâu? Kéo cả điểm $A$ để thay đổi khoảng cách từ $A$ đến $d$ rồi thử lại.',
  },
  examples: [
    {
      problem:
        'Cho hình vuông $ABCD$ cạnh $2$ cm và điểm $M$ nằm trên cạnh $BC$, khác $B$. a) Chỉ ra đường vuông góc và đường xiên kẻ từ $A$ đến đường thẳng $BC$. b) So sánh $AB$ và $AM$. c) Tìm khoảng cách từ $C$ đến đường thẳng $AB$.',
      steps: [
        'a) $AB \\perp BC$ tại $B$ nên $AB$ là đường vuông góc kẻ từ $A$ đến $BC$; $AM$ (với $M \\ne B$) là đường xiên.',
        'b) Đường vuông góc ngắn hơn đường xiên nên $AB < AM$.',
        'c) $CB \\perp AB$ tại $B$ nên khoảng cách từ $C$ đến đường thẳng $AB$ bằng $CB = 2$ cm.',
      ],
      answer: '$AB$ là đường vuông góc, $AM$ là đường xiên; $AB < AM$; khoảng cách bằng $2$ cm.',
    },
    {
      problem:
        'Nam đứng ở điểm $O$ trên một bờ sông, hai bờ sông song song. Trên bờ bên kia có ba điểm $A$, $B$, $C$, trong đó $OA$ vuông góc với bờ sông. Nam nên bơi theo đường nào để quãng đường ngắn nhất?',
      steps: [
        'Bờ bên kia là đường thẳng chứa $A$, $B$, $C$; $OA$ là đường vuông góc kẻ từ $O$ đến đường thẳng đó.',
        '$OB$ và $OC$ là các đường xiên, nên $OB > OA$ và $OC > OA$.',
      ],
      answer: 'Nam nên bơi theo đường $OA$, vuông góc với bờ sông.',
    },
    {
      problem:
        'Tam giác $ABC$ vuông tại $A$, $M$ là một điểm nằm giữa $A$ và $C$. Chứng minh $BA < BM < BC$.',
      steps: [
        '$BA \\perp AC$ nên $BA$ là đường vuông góc, $BM$ là đường xiên kẻ từ $B$ đến đường thẳng $AC$. Do đó $BA < BM$.',
        'Góc $BMC$ là góc ngoài tại đỉnh $M$ của tam giác $ABM$, nên $\\widehat{BMC} = \\widehat{BAM} + \\widehat{ABM} = 90^\\circ + \\widehat{ABM} > 90^\\circ$.',
        'Trong tam giác $BMC$, góc $BMC$ tù nên cạnh đối diện $BC$ là cạnh lớn nhất: $BM < BC$.',
      ],
      answer: '$BA < BM < BC$.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Điểm $A$ không thuộc đường thẳng $d$. Các điểm $H$, $B$, $C$ thuộc $d$ và $AH \\perp d$. Đường vuông góc kẻ từ $A$ đến $d$ là',
      options: ['$AB$', '$AH$', '$AC$', '$HB$'],
      answer: 1,
      hints: ['Đoạn nào nối $A$ với một điểm của $d$ và vuông góc với $d$?'],
      solution:
        '$AH \\perp d$ và $H \\in d$ nên $AH$ là đường vuông góc; $AB$, $AC$ là các đường xiên. $HB$ nằm trên $d$, không đi qua $A$.',
    },
    {
      type: 'number',
      prompt:
        'Điểm $A$ không thuộc đường thẳng $d$. Kẻ $AH \\perp d$ tại $H$ và đường xiên $AB$ ($B \\in d$). Biết $AH = 3$ cm, $AB = 5$ cm. Khoảng cách từ $A$ đến $d$ bằng bao nhiêu xăng-ti-mét?',
      answer: 3,
      unit: 'cm',
      hints: ['Khoảng cách là độ dài của đường vuông góc hay đường xiên?'],
      solution: 'Khoảng cách từ $A$ đến $d$ là độ dài đường vuông góc $AH$, tức $3$ cm.',
    },
    {
      type: 'multi',
      prompt:
        'Khoảng cách từ điểm $A$ đến đường thẳng $d$ bằng $4$ cm. Độ dài nào sau đây có thể là độ dài của một đường xiên kẻ từ $A$ đến $d$?',
      options: ['$3$ cm', '$4$ cm', '$4{,}5$ cm', '$7$ cm'],
      answers: [2, 3],
      hints: [
        'Đường xiên so với đường vuông góc thì dài hơn hay ngắn hơn?',
        'Đường vuông góc dài đúng $4$ cm, và nó không phải là đường xiên.',
      ],
      solution:
        'Đường vuông góc $AH = 4$ cm; mọi đường xiên đều dài hơn $4$ cm. Vậy chỉ $4{,}5$ cm và $7$ cm có thể là độ dài của một đường xiên.',
    },
    {
      type: 'number',
      prompt:
        'Hình chữ nhật $ABCD$ có $AB = 6$ cm, $BC = 4$ cm. Khoảng cách từ $C$ đến đường thẳng $AD$ bằng bao nhiêu xăng-ti-mét?',
      answer: 6,
      unit: 'cm',
      hints: [
        'Từ $C$, đoạn nào vuông góc với đường thẳng $AD$?',
        'Trong hình chữ nhật, $CD \\perp AD$.',
      ],
      solution:
        '$CD \\perp AD$ tại $D$ nên khoảng cách từ $C$ đến đường thẳng $AD$ bằng $CD = AB = 6$ cm.',
    },
    {
      type: 'order',
      prompt:
        'Điểm $A$ nằm ngoài đường thẳng $d$, $AH \\perp d$ tại $H$. Trên $d$ lấy $B$, $C$ khác $H$ sao cho $AB = 5$ cm, $AC = 7$ cm. Sắp xếp ba đoạn thẳng theo thứ tự độ dài từ nhỏ đến lớn.',
      items: ['$AC$', '$AH$', '$AB$'],
      answer: [1, 2, 0],
      hints: ['Đường vuông góc ngắn hơn mọi đường xiên.'],
      solution:
        '$AH$ là đường vuông góc nên $AH < AB = 5$ cm. Mà $AB = 5$ cm $< AC = 7$ cm. Vậy $AH < AB < AC$.',
    },
    {
      type: 'choice',
      prompt:
        'Tam giác $ABC$ vuông tại $A$, $M$ là điểm nằm giữa $A$ và $C$. So sánh $BM$ và $BC$.',
      options: ['$BM < BC$', '$BM = BC$', '$BM > BC$', 'Không so sánh được'],
      answer: 0,
      hints: [
        'Xét góc $BMC$: nó là góc ngoài của tam giác $ABM$.',
        'Góc $BMC$ lớn hơn $90^\\circ$; trong tam giác $BMC$ cạnh nào đối diện với nó?',
      ],
      solution:
        '$\\widehat{BMC} = \\widehat{BAM} + \\widehat{ABM} = 90^\\circ + \\widehat{ABM} > 90^\\circ$, nên trong tam giác $BMC$ cạnh $BC$ đối diện góc tù là cạnh lớn nhất: $BM < BC$.',
    },
    {
      type: 'choice',
      prompt:
        'Một con đường thẳng chạy qua cánh đồng. Từ nhà $N$, có ba lối đi thẳng ra đường: $NA = 120$ m, $NB = 95$ m, $NC = 150$ m, trong đó có một lối vuông góc với con đường. Lối nào vuông góc với con đường?',
      options: ['$NA$', '$NB$', '$NC$'],
      answer: 1,
      hints: ['Đường vuông góc là đường ngắn nhất trong các đường kẻ từ $N$ đến con đường.'],
      solution:
        'Nếu một lối khác $NB$ vuông góc với con đường thì nó phải ngắn hơn $NB = 95$ m, vô lí. Vậy lối vuông góc là lối ngắn nhất $NB$, và khoảng cách từ nhà đến con đường là $95$ m.',
    },
  ],
  takeaways: [
    '$AH \\perp d$ ($H \\in d$): $AH$ là đường vuông góc, $H$ là chân đường vuông góc; $AM$ với $M \\in d$, $M \\ne H$ là đường xiên.',
    'Đường vuông góc ngắn hơn mọi đường xiên kẻ từ cùng một điểm đến cùng một đường thẳng.',
    'Khoảng cách từ $A$ đến $d$ là độ dài đường vuông góc $AH$.',
  ],
};
