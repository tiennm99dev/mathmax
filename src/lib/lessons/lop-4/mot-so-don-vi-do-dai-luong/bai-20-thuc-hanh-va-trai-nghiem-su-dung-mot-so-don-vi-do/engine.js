/**
 * The measuring challenge of the practical lesson: pick the right unit,
 * estimate a mass, an area or a time, and the measuring questions of a
 * home-made water filter and a class camp. One question of each part in a
 * shuffled order; each part draws one task from its bank. Pure and
 * DOM-free.
 */
import { pick, rng, shuffle } from '#lib/core/drill.js';
import { mixOptions } from '#lib/core/kid/quiz.js';

/** @typedef {import('#lib/core/kid/quiz.js').KidQuestion} Question */

/**
 * A task of a bank: the prompt, the right option, the wrong ones, a hint and
 * the solution.
 * @typedef {{ prompt: string, right: string, wrong: string[], hint: string, solution: string }} Task
 */

/** What each part of the challenge practises. */
export const KIND_LABELS = /** @type {const} */ ({
  'don-vi-khoi-luong': 'Chọn đơn vị khối lượng',
  'uoc-luong-khoi-luong': 'Ước lượng khối lượng',
  'dien-tich': 'Ước lượng diện tích',
  'thoi-gian': 'Ước lượng thời gian',
  'chai-loc': 'Chai lọc nước',
  'vat-lieu': 'Cân vật liệu',
  'dung-trai': 'Dựng trại',
});

/** @type {Record<keyof typeof KIND_LABELS, readonly Task[]>} */
export const BANKS = {
  'don-vi-khoi-luong': [
    {
      prompt: 'Con voi nặng khoảng 5 … Em chọn đơn vị phù hợp.',
      right: 'tấn',
      wrong: ['tạ', 'yến', 'kg'],
      hint: 'Con voi rất to, nặng hàng nghìn ki-lô-gam.',
      solution: 'Con voi nặng khoảng 5 tấn, tức là 5 000 kg.',
    },
    {
      prompt: 'Con lợn nặng khoảng 1 … Em chọn đơn vị phù hợp.',
      right: 'tạ',
      wrong: ['tấn', 'yến', 'kg'],
      hint: 'Con lợn nặng khoảng một trăm ki-lô-gam.',
      solution: 'Con lợn nặng khoảng 1 tạ, tức là 100 kg.',
    },
    {
      prompt: 'Bao xi măng nặng 5 … Em chọn đơn vị phù hợp.',
      right: 'yến',
      wrong: ['tấn', 'tạ', 'kg'],
      hint: 'Một người lớn vác được bao xi măng, nặng vài chục ki-lô-gam.',
      solution: 'Bao xi măng nặng 5 yến, tức là 50 kg.',
    },
    {
      prompt: 'Quả dưa hấu nặng khoảng 3 … Em chọn đơn vị phù hợp.',
      right: 'kg',
      wrong: ['tấn', 'tạ', 'yến'],
      hint: 'Em bế được quả dưa hấu.',
      solution: 'Quả dưa hấu nặng khoảng 3 kg.',
    },
  ],
  'uoc-luong-khoi-luong': [
    {
      prompt: 'Một con bò nặng khoảng bao nhiêu?',
      right: '3 tạ',
      wrong: ['3 kg', '3 tấn'],
      hint: 'Con bò nặng hơn em nhiều lần, nhưng nhẹ hơn con voi nhiều lần.',
      solution: 'Con bò nặng khoảng 3 tạ (300 kg).',
    },
    {
      prompt: 'Một xe tải nhỏ chở được khoảng bao nhiêu hàng?',
      right: '2 tấn',
      wrong: ['2 kg', '2 yến'],
      hint: 'Xe tải chở được rất nhiều bao hàng.',
      solution: 'Xe tải nhỏ chở được khoảng 2 tấn (2 000 kg) hàng.',
    },
    {
      prompt: 'Một bạn học sinh lớp 4 nặng khoảng bao nhiêu?',
      right: '3 yến',
      wrong: ['3 tạ', '3 tấn'],
      hint: 'Bạn lớp 4 nặng khoảng ba mươi ki-lô-gam.',
      solution: 'Bạn học sinh lớp 4 nặng khoảng 3 yến (30 kg).',
    },
  ],
  'dien-tich': [
    {
      prompt: 'Sân trường rộng khoảng bao nhiêu?',
      right: '800 m²',
      wrong: ['800 dm²', '800 cm²'],
      hint: 'Sân trường rất rộng, cả trường xếp hàng được.',
      solution: 'Sân trường rộng khoảng 800 m².',
    },
    {
      prompt: 'Mặt bàn học rộng khoảng bao nhiêu?',
      right: '60 dm²',
      wrong: ['60 m²', '60 mm²'],
      hint: 'Mặt bàn dài khoảng 1 m, rộng khoảng nửa mét.',
      solution: 'Mặt bàn học rộng khoảng 60 dm².',
    },
    {
      prompt: 'Một con tem rộng khoảng bao nhiêu?',
      right: '6 cm²',
      wrong: ['6 m²', '6 dm²'],
      hint: 'Con tem nhỏ bằng đầu ngón tay cái.',
      solution: 'Con tem rộng khoảng 6 cm².',
    },
    {
      prompt: 'Mặt đầu chiếc đinh ghim rộng khoảng bao nhiêu?',
      right: '3 mm²',
      wrong: ['3 cm²', '3 dm²'],
      hint: 'Đầu đinh ghim rất nhỏ, nhỏ hơn cả móng tay.',
      solution: 'Mặt đầu đinh ghim rộng khoảng 3 mm².',
    },
  ],
  'thoi-gian': [
    {
      prompt: 'Em đánh răng mỗi lần khoảng bao lâu?',
      right: '2 phút',
      wrong: ['2 giây', '2 giờ'],
      hint: 'Đánh răng kĩ cần thời gian bằng một bài hát ngắn.',
      solution: 'Em đánh răng khoảng 2 phút.',
    },
    {
      prompt: 'Em chớp mắt một lần mất khoảng bao lâu?',
      right: 'Chưa đến 1 giây',
      wrong: ['1 phút', '1 giờ'],
      hint: 'Chớp mắt nhanh hơn em đếm "một".',
      solution: 'Chớp mắt một lần mất chưa đến 1 giây.',
    },
    {
      prompt: 'Một bạn lớp 4 chạy 60 m hết khoảng bao lâu?',
      right: '12 giây',
      wrong: ['12 phút', '12 giờ'],
      hint: 'Chạy 60 m rất nhanh, chưa hết một phút.',
      solution: 'Chạy 60 m hết khoảng 12 giây.',
    },
    {
      prompt: 'Lịch sử dựng nước của dân tộc ta dài khoảng bao lâu?',
      right: 'Hàng chục thế kỉ',
      wrong: ['Hàng chục năm', 'Hàng chục ngày'],
      hint: 'Nước ta đã có từ thời các vua Hùng, rất rất lâu rồi.',
      solution: 'Lịch sử dựng nước dài hàng nghìn năm, tức là hàng chục thế kỉ.',
    },
  ],
  'chai-loc': [
    {
      prompt:
        'Lọc 500 ml nước: chai A hết 250 giây, chai B hết 4 phút, chai C hết 3 phút 50 giây. Chai nào lọc nhanh nhất?',
      right: 'Chai C',
      wrong: ['Chai A', 'Chai B'],
      hint: 'Em đổi tất cả ra giây. Chai nào hết ít thời gian nhất thì lọc nhanh nhất.',
      solution:
        'Chai A: 250 giây. Chai B: 4 phút = 240 giây. Chai C: 3 phút 50 giây = 230 giây. 230 < 240 < 250, nên chai C lọc nhanh nhất.',
    },
    {
      prompt:
        'Lọc 500 ml nước: chai A hết 250 giây, chai B hết 4 phút, chai C hết 3 phút 50 giây. Chai nào lọc chậm nhất?',
      right: 'Chai A',
      wrong: ['Chai B', 'Chai C'],
      hint: 'Em đổi tất cả ra giây. Chai nào hết nhiều thời gian nhất thì lọc chậm nhất.',
      solution:
        'Chai A: 250 giây. Chai B: 4 phút = 240 giây. Chai C: 3 phút 50 giây = 230 giây. 250 > 240 > 230, nên chai A lọc chậm nhất.',
    },
    {
      prompt: 'Dưới chai lọc nước có tấm bìa hình vuông cạnh 3 dm. Diện tích tấm bìa là bao nhiêu?',
      right: '9 dm²',
      wrong: ['6 dm²', '12 dm²', '9 cm²'],
      hint: 'Diện tích hình vuông bằng cạnh nhân với cạnh.',
      solution: '3 × 3 = 9. Diện tích tấm bìa là 9 dm².',
    },
  ],
  'vat-lieu': [
    {
      prompt: 'Kho có 15 kg than hoạt tính, 3 yến sỏi và 5 yến cát. Tất cả có đủ 1 tạ không?',
      right: 'Chưa đủ, thiếu 5 kg',
      wrong: ['Đủ 1 tạ', 'Thừa 5 kg'],
      hint: 'Em đổi tất cả ra ki-lô-gam rồi cộng lại. 1 tạ = 100 kg.',
      solution:
        '3 yến = 30 kg, 5 yến = 50 kg. 15 + 30 + 50 = 95 (kg). 95 kg < 100 kg: chưa đủ 1 tạ, thiếu 5 kg.',
    },
    {
      prompt: 'Kho có 25 kg than hoạt tính, 3 yến sỏi và 5 yến cát. Tất cả có đủ 1 tạ không?',
      right: 'Đủ, còn thừa 5 kg',
      wrong: ['Chưa đủ, thiếu 5 kg', 'Vừa đúng 1 tạ'],
      hint: 'Em đổi tất cả ra ki-lô-gam rồi cộng lại. 1 tạ = 100 kg.',
      solution:
        '3 yến = 30 kg, 5 yến = 50 kg. 25 + 30 + 50 = 105 (kg). 105 kg > 100 kg: đủ 1 tạ, còn thừa 5 kg.',
    },
    {
      prompt: 'Mỗi bao cát nặng 5 yến. Cần mấy bao cát để được 1 tấn cát?',
      right: '20 bao',
      wrong: ['2 bao', '10 bao', '200 bao'],
      hint: '1 tấn = 1 000 kg, 5 yến = 50 kg.',
      solution: '1 tấn = 1 000 kg; 5 yến = 50 kg. 1 000 : 50 = 20. Cần 20 bao cát.',
    },
  ],
  'dung-trai': [
    {
      prompt:
        'Lớp em chọn chỗ dựng trại. Chỗ A hình chữ nhật 5 m × 4 m, chỗ B hình chữ nhật 6 m × 3 m, chỗ C hình vuông cạnh 4 m. Chỗ nào rộng nhất?',
      right: 'Chỗ A',
      wrong: ['Chỗ B', 'Chỗ C'],
      hint: 'Em tính diện tích từng chỗ rồi so sánh.',
      solution:
        'Chỗ A: 5 × 4 = 20 (m²). Chỗ B: 6 × 3 = 18 (m²). Chỗ C: 4 × 4 = 16 (m²). Chỗ A rộng nhất.',
    },
    {
      prompt: 'Biển tên trại của lớp em làm bằng tấm gỗ. Tấm gỗ nên có diện tích khoảng bao nhiêu?',
      right: '20 dm²',
      wrong: ['20 m²', '20 mm²'],
      hint: 'Biển tên to hơn quyển vở nhưng nhỏ hơn cái bàn nhiều.',
      solution: 'Tấm gỗ làm biển tên có diện tích khoảng 20 dm², ví dụ dài 5 dm, rộng 4 dm.',
    },
  ],
};

/**
 * A round with one task of every part, shuffled, the options mixed.
 * @param {number} seed
 * @returns {Question[]}
 */
export function buildRound(seed) {
  const rand = rng(seed);
  const kinds = /** @type {(keyof typeof KIND_LABELS)[]} */ (Object.keys(KIND_LABELS));
  return shuffle(rand, kinds).map((kind) => {
    const task = pick(rand, BANKS[kind]);
    return {
      prompt: task.prompt,
      ...mixOptions(rand, task.right, task.wrong),
      hint: task.hint,
      solution: task.solution,
      kind,
    };
  });
}
