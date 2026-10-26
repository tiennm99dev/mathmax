/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tính chất đường phân giác của tam giác: phân giác của một góc chia cạnh đối diện thành hai đoạn tỉ lệ với hai cạnh kề, chứng minh bằng định lí Thalès và dùng để tính độ dài.',
  intro:
    'Trong tam giác cân, đường phân giác của góc ở đỉnh đi qua trung điểm cạnh đáy. Nếu tam giác không cân thì sao? Chân đường phân giác sẽ lệch về phía cạnh ngắn hơn, và lệch theo một tỉ lệ rất chính xác: tỉ lệ của hai cạnh kề.',
  objectives: [
    'Phát biểu tính chất đường phân giác của tam giác.',
    'Viết đúng tỉ lệ thức giữa hai đoạn trên cạnh đối diện và hai cạnh kề.',
    'Dùng tính chất để tính tỉ số và độ dài đoạn thẳng.',
  ],
  sections: [
    {
      heading: 'Tính chất đường phân giác',
      blocks: [
        {
          type: 'callout',
          tone: 'theorem',
          title: 'Định lí',
          text: 'Trong tam giác, đường phân giác của một góc chia cạnh đối diện thành hai đoạn thẳng tỉ lệ với hai cạnh kề hai đoạn ấy.',
        },
        {
          type: 'p',
          text: 'Cho tam giác $ABC$, $AD$ là đường phân giác của góc $A$ ($D$ thuộc cạnh $BC$). Khi đó:',
        },
        { type: 'tex', tex: '\\dfrac{DB}{DC} = \\dfrac{AB}{AC}' },
        {
          type: 'p',
          text: 'Đoạn $DB$ kề với cạnh $AB$ (cùng chung đỉnh $B$), đoạn $DC$ kề với cạnh $AC$ (cùng chung đỉnh $C$). Có thể viết tương đương $\\dfrac{DB}{AB} = \\dfrac{DC}{AC}$.',
        },
        {
          type: 'callout',
          tone: 'note',
          text: 'Nếu $AB = AC$ thì $DB = DC$: trong tam giác cân, phân giác của góc ở đỉnh đi qua trung điểm cạnh đáy. Nếu $AB < AC$ thì $DB < DC$, chân phân giác gần đỉnh $B$ hơn.',
        },
      ],
    },
    {
      heading: 'Chứng minh bằng định lí Thalès',
      blocks: [
        {
          type: 'list',
          ordered: true,
          items: [
            'Qua $C$ kẻ đường thẳng song song với $AD$, cắt đường thẳng $AB$ tại $E$ ($A$ nằm giữa $B$ và $E$).',
            'Vì $AD \\parallel CE$ nên $\\widehat{AEC} = \\widehat{BAD}$ (đồng vị) và $\\widehat{ACE} = \\widehat{DAC}$ (so le trong).',
            'Do $\\widehat{BAD} = \\widehat{DAC}$ nên $\\widehat{AEC} = \\widehat{ACE}$: tam giác $ACE$ cân tại $A$, suy ra $AE = AC$.',
            'Trong tam giác $BCE$ có $AD \\parallel EC$, theo định lí Thalès: $\\dfrac{DB}{DC} = \\dfrac{AB}{AE} = \\dfrac{AB}{AC}$.',
          ],
        },
        {
          type: 'p',
          text: 'Phần Khám phá cho em kéo đỉnh $A$ đi khắp nơi; tỉ số $\\dfrac{DB}{DC}$ và tỉ số $\\dfrac{AB}{AC}$ luôn bằng nhau.',
        },
      ],
    },
    {
      heading: 'Tính độ dài nhờ tính chất phân giác',
      blocks: [
        {
          type: 'p',
          text: 'Khi biết ba cạnh của tam giác, ta tính được hai đoạn $DB$, $DC$: từ $\\dfrac{DB}{DC} = \\dfrac{AB}{AC}$ suy ra',
        },
        {
          type: 'tex',
          tex: '\\dfrac{DB}{AB} = \\dfrac{DC}{AC} = \\dfrac{DB + DC}{AB + AC} = \\dfrac{BC}{AB + AC}',
        },
        {
          type: 'p',
          text: 'nên $DB = \\dfrac{BC \\cdot AB}{AB + AC}$ và $DC = \\dfrac{BC \\cdot AC}{AB + AC}$ (tính chất dãy tỉ số bằng nhau).',
        },
      ],
    },
  ],
  explore: {
    title: 'Phân giác và hai tỉ số',
    instruction:
      'Kéo đỉnh $A$ trên lưới. Quan sát độ dài $DB$, $DC$, $AB$, $AC$ và hai tỉ số $\\dfrac{DB}{DC}$, $\\dfrac{AB}{AC}$. Bật so sánh với trung điểm $M$ để thấy chân phân giác lệch về phía cạnh ngắn hơn.',
  },
  examples: [
    {
      problem:
        'Tam giác $ABC$ có $AB = 6$ cm, $AC = 9$ cm, $BC = 10$ cm. Đường phân giác của góc $A$ cắt $BC$ tại $D$. Tính $DB$ và $DC$.',
      steps: [
        'Theo tính chất đường phân giác: $\\dfrac{DB}{DC} = \\dfrac{AB}{AC} = \\dfrac{6}{9}$.',
        'Suy ra $\\dfrac{DB}{6} = \\dfrac{DC}{9} = \\dfrac{DB + DC}{6 + 9} = \\dfrac{10}{15} = \\dfrac{2}{3}$.',
        '$DB = 6 \\cdot \\dfrac{2}{3} = 4$ và $DC = 9 \\cdot \\dfrac{2}{3} = 6$.',
      ],
      answer: '$DB = 4$ cm, $DC = 6$ cm.',
    },
    {
      problem:
        'Tam giác $ABC$ có $AD$ là đường phân giác ($D \\in BC$), $AB = 4{,}5$ cm, $DB = 3$ cm, $DC = 4$ cm. Tính $AC$.',
      steps: [
        '$\\dfrac{DB}{DC} = \\dfrac{AB}{AC}$, tức $\\dfrac{3}{4} = \\dfrac{4{,}5}{AC}$.',
        '$AC = \\dfrac{4{,}5 \\cdot 4}{3} = 6$.',
      ],
      answer: '$AC = 6$ cm.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt:
        'Tam giác $ABC$ có $AD$ là đường phân giác của góc $A$ ($D \\in BC$). Khẳng định nào đúng?',
      options: [
        '$\\dfrac{DB}{DC} = \\dfrac{AC}{AB}$',
        '$\\dfrac{DB}{DC} = \\dfrac{AB}{AC}$',
        '$\\dfrac{DB}{AC} = \\dfrac{DC}{AB}$',
        '$DB = DC$',
      ],
      answer: 1,
      hints: ['Mỗi đoạn trên $BC$ đi cùng cạnh kề với nó (chung một đỉnh).'],
      solution:
        'Theo tính chất đường phân giác, $\\dfrac{DB}{DC} = \\dfrac{AB}{AC}$: $DB$ đi với $AB$ (chung đỉnh $B$), $DC$ đi với $AC$ (chung đỉnh $C$). $DB = DC$ chỉ đúng khi $AB = AC$.',
    },
    {
      type: 'fraction',
      prompt:
        'Tam giác $ABC$ có $AB = 8$ cm, $AC = 12$ cm, $AD$ là đường phân giác ($D \\in BC$). Tính tỉ số $\\dfrac{DB}{DC}$ (viết dạng phân số tối giản).',
      answer: [2, 3],
      simplest: true,
      hints: ['$\\dfrac{DB}{DC} = \\dfrac{AB}{AC}$.', 'Rút gọn $\\dfrac{8}{12}$.'],
      solution: '$\\dfrac{DB}{DC} = \\dfrac{AB}{AC} = \\dfrac{8}{12} = \\dfrac{2}{3}$.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AB = 5$ cm, $AC = 7$ cm, $AD$ là đường phân giác và $DB = 2{,}5$ cm. Tính $DC$.',
      answer: 3.5,
      unit: 'cm',
      hints: ['$\\dfrac{DB}{DC} = \\dfrac{AB}{AC}$.', '$\\dfrac{2{,}5}{DC} = \\dfrac{5}{7}$.'],
      solution: '$DC = \\dfrac{2{,}5 \\cdot 7}{5} = 3{,}5$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AB = 6$ cm, $AC = 8$ cm, $BC = 7$ cm. Đường phân giác của góc $A$ cắt $BC$ tại $D$. Tính $DB$.',
      answer: 3,
      unit: 'cm',
      hints: [
        '$\\dfrac{DB}{AB} = \\dfrac{DC}{AC} = \\dfrac{BC}{AB + AC}$.',
        '$\\dfrac{BC}{AB + AC} = \\dfrac{7}{14}$.',
      ],
      solution:
        '$\\dfrac{DB}{6} = \\dfrac{DC}{8} = \\dfrac{DB + DC}{14} = \\dfrac{7}{14} = \\dfrac{1}{2}$, nên $DB = 3$ cm (và $DC = 4$ cm).',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AD$ là đường phân giác ($D \\in BC$), $AB = 12$ cm, $DB = 4$ cm, $DC = 5$ cm. Tính $AC$.',
      answer: 15,
      unit: 'cm',
      hints: ['$\\dfrac{DB}{DC} = \\dfrac{AB}{AC}$, ẩn là $AC$.'],
      solution: '$\\dfrac{4}{5} = \\dfrac{12}{AC}$ nên $AC = \\dfrac{12 \\cdot 5}{4} = 15$ cm.',
    },
    {
      type: 'fraction',
      prompt:
        'Tam giác $ABC$ vuông tại $A$ có $AB = 6$ cm, $AC = 8$ cm, $BC = 10$ cm. Đường phân giác của góc $A$ cắt $BC$ tại $D$. Tính $DB$ (cm), viết dạng phân số.',
      answer: [30, 7],
      hints: ['$\\dfrac{DB}{AB} = \\dfrac{BC}{AB + AC}$.', '$DB = \\dfrac{10 \\cdot 6}{6 + 8}$.'],
      solution:
        '$\\dfrac{DB}{6} = \\dfrac{10}{14} = \\dfrac{5}{7}$, nên $DB = \\dfrac{30}{7}$ cm (khoảng $4{,}29$ cm).',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $BC = 15$ cm và $AB : AC = 2 : 3$. Đường phân giác của góc $A$ cắt $BC$ tại $D$. Tính $DB$.',
      answer: 6,
      unit: 'cm',
      hints: [
        '$\\dfrac{DB}{DC} = \\dfrac{AB}{AC} = \\dfrac{2}{3}$.',
        'Chia $15$ cm theo tỉ lệ $2 : 3$.',
      ],
      solution:
        '$\\dfrac{DB}{2} = \\dfrac{DC}{3} = \\dfrac{DB + DC}{5} = \\dfrac{15}{5} = 3$, nên $DB = 6$ cm và $DC = 9$ cm.',
    },
    {
      type: 'number',
      prompt:
        'Tam giác $ABC$ có $AB = 10$ cm, đường phân giác $AD$ chia $BC$ thành $DB = 4$ cm, $DC = 6$ cm. Tính chu vi tam giác $ABC$.',
      answer: 35,
      unit: 'cm',
      hints: ['Tính $AC$ từ $\\dfrac{DB}{DC} = \\dfrac{AB}{AC}$.', '$BC = DB + DC$.'],
      solution:
        '$\\dfrac{4}{6} = \\dfrac{10}{AC}$ nên $AC = 15$ cm; $BC = 4 + 6 = 10$ cm. Chu vi bằng $10 + 15 + 10 = 35$ cm.',
    },
  ],
  takeaways: [
    'Đường phân giác $AD$ của tam giác $ABC$: $\\dfrac{DB}{DC} = \\dfrac{AB}{AC}$.',
    'Mỗi đoạn trên cạnh đối diện đi cùng cạnh kề với nó (chung một đỉnh).',
    'Biết ba cạnh: $DB = \\dfrac{BC \\cdot AB}{AB + AC}$, $DC = \\dfrac{BC \\cdot AC}{AB + AC}$.',
    'Chân phân giác lệch về phía cạnh kề ngắn hơn; nó là trung điểm khi hai cạnh kề bằng nhau.',
  ],
};
