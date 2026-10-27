/** @type {import('#lib/core/content-schema.js').LessonContent} */
export default {
  summary:
    'Tần số của một giá trị, cách lập bảng tần số từ mẫu dữ liệu và cách vẽ, đọc biểu đồ tần số dạng cột và dạng đoạn thẳng.',
  intro:
    'Cô giáo ghi lại điểm kiểm tra môn Toán của $20$ học sinh tổ 1: 7; 8; 6; 9; 8; 7; 10; 8; 5; 7; 8; 9; 6; 8; 7; 9; 8; 10; 7; 8. Nhìn dãy số này, khó trả lời ngay điểm nào nhiều bạn đạt được nhất. Nếu đếm xem mỗi điểm xuất hiện bao nhiêu lần rồi sắp vào một bảng, mọi thứ trở nên rõ ràng. Đó là bảng tần số.',
  objectives: [
    'Hiểu tần số của một giá trị trong mẫu dữ liệu.',
    'Lập được bảng tần số từ một mẫu dữ liệu và tính cỡ mẫu.',
    'Vẽ và đọc được biểu đồ tần số dạng cột và dạng đoạn thẳng.',
  ],
  sections: [
    {
      heading: 'Tần số. Bảng tần số',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Tần số',
          text: 'Số lần xuất hiện của một giá trị trong mẫu dữ liệu được gọi là tần số của giá trị đó.',
        },
        {
          type: 'p',
          text: 'Giả sử mẫu dữ liệu có $k$ giá trị khác nhau là $x_1, x_2, \\dots, x_k$ với các tần số tương ứng là $m_1, m_2, \\dots, m_k$. Bảng thống kê cho biết tần số của từng giá trị được gọi là bảng tần số của mẫu dữ liệu:',
        },
        {
          type: 'table',
          head: ['Giá trị ($x$)', '$x_1$', '$x_2$', '$\\dots$', '$x_k$'],
          rows: [['Tần số ($m$)', '$m_1$', '$m_2$', '$\\dots$', '$m_k$']],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Chú ý',
          text: 'Tổng các tần số bằng số dữ liệu của mẫu, gọi là cỡ mẫu: $n = m_1 + m_2 + \\dots + m_k$. Bảng tần số chỉ liệt kê các giá trị khác nhau của mẫu; các giá trị này không nhất thiết là số (ví dụ: Tốt, Khá, Đạt, Chưa đạt). Bảng có thể viết theo dòng (như trên) hoặc theo cột.',
        },
        {
          type: 'p',
          text: 'Để lập bảng tần số của một mẫu dữ liệu, ta làm như sau:',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Xác định các giá trị khác nhau $x_1, x_2, \\dots, x_k$ của mẫu (với dữ liệu là số, sắp xếp theo thứ tự tăng dần).',
            'Đếm số lần xuất hiện của mỗi giá trị, được các tần số $m_1, m_2, \\dots, m_k$.',
            'Lập bảng gồm hai dòng (hoặc hai cột): dòng giá trị và dòng tần số. Kiểm tra lại: tổng các tần số phải bằng cỡ mẫu $n$.',
          ],
        },
        {
          type: 'p',
          text: 'Với điểm kiểm tra của $20$ học sinh ở phần mở đầu, ta được bảng tần số:',
        },
        {
          type: 'table',
          head: ['Điểm ($x$)', '$5$', '$6$', '$7$', '$8$', '$9$', '$10$'],
          rows: [['Tần số ($m$)', '$1$', '$2$', '$5$', '$7$', '$3$', '$2$']],
          caption: 'Cỡ mẫu $n = 1 + 2 + 5 + 7 + 3 + 2 = 20$.',
        },
        {
          type: 'p',
          text: 'Từ bảng, ta thấy ngay điểm $8$ có tần số lớn nhất ($7$ học sinh), điểm $5$ có tần số nhỏ nhất ($1$ học sinh).',
        },
      ],
    },
    {
      heading: 'Biểu đồ tần số',
      blocks: [
        {
          type: 'callout',
          tone: 'definition',
          title: 'Biểu đồ tần số',
          text: 'Biểu đồ biểu diễn bảng tần số được gọi là biểu đồ tần số. Hai dạng thường dùng là biểu đồ tần số dạng cột và biểu đồ tần số dạng đoạn thẳng.',
        },
        {
          type: 'p',
          text: 'Biểu đồ tần số dạng cột. Trục ngang ghi các giá trị $x_1, x_2, \\dots, x_k$; trục đứng ghi tần số. Tại mỗi giá trị $x_i$, vẽ một cột có chiều cao bằng tần số $m_i$. Các cột có cùng độ rộng và cách đều nhau.',
        },
        {
          type: 'p',
          text: 'Biểu đồ tần số dạng đoạn thẳng. Với cùng hai trục như trên, đánh dấu các điểm $(x_1; m_1), (x_2; m_2), \\dots, (x_k; m_k)$ rồi nối liên tiếp các điểm đó bằng các đoạn thẳng.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Vẽ hai trục vuông góc: trục ngang ghi giá trị, trục đứng ghi tần số với đơn vị chia phù hợp.',
            'Vẽ các cột (hoặc đánh dấu các điểm và nối chúng) theo bảng tần số.',
            'Ghi tên hai trục, các số liệu cần thiết và tên biểu đồ.',
          ],
        },
        {
          type: 'callout',
          tone: 'note',
          title: 'Đọc biểu đồ',
          text: 'Từ biểu đồ tần số, ta đọc lại được bảng tần số: chiều cao của cột (hay tung độ của điểm) tại giá trị $x_i$ chính là tần số $m_i$. Cột cao nhất (điểm cao nhất) ứng với giá trị có tần số lớn nhất.',
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Lỗi hay gặp',
          text: 'Nhầm giá trị với tần số: trong bảng điểm ở trên, "điểm $8$" là giá trị, còn "$7$ học sinh đạt điểm $8$" là tần số. Đếm sót hoặc đếm trùng dữ liệu: luôn kiểm tra tổng các tần số bằng cỡ mẫu.',
        },
      ],
    },
  ],
  explore: {
    title: 'Từ dữ liệu thô đến bảng và biểu đồ tần số',
    instruction:
      'Bấm các nút điểm để thêm dữ liệu, bấm vào một dữ liệu để bỏ nó. Bảng tần số và biểu đồ tự cập nhật theo mẫu. Bấm một giá trị trong bảng để tô các dữ liệu bằng nó. Ở chế độ "Thử thách", hãy tạo một mẫu có bảng tần số cho trước.',
  },
  examples: [
    {
      problem:
        'Số con của $24$ hộ gia đình trong một tổ dân phố được ghi lại như sau: 2; 1; 2; 3; 0; 2; 1; 2; 2; 3; 1; 2; 4; 2; 1; 0; 2; 3; 2; 1; 2; 2; 3; 1. Lập bảng tần số và cho biết số con nào phổ biến nhất.',
      steps: [
        'Các giá trị khác nhau, sắp tăng dần: $0, 1, 2, 3, 4$.',
        'Đếm số lần xuất hiện: giá trị $0$ xuất hiện $2$ lần, $1$ xuất hiện $6$ lần, $2$ xuất hiện $11$ lần, $3$ xuất hiện $4$ lần, $4$ xuất hiện $1$ lần.',
        'Bảng tần số: giá trị $0, 1, 2, 3, 4$ ứng với tần số $2, 6, 11, 4, 1$.',
        'Kiểm tra: $2 + 6 + 11 + 4 + 1 = 24$ bằng cỡ mẫu.',
      ],
      answer: 'Giá trị $2$ có tần số lớn nhất ($11$), nên gia đình có $2$ con là phổ biến nhất.',
    },
    {
      problem:
        'Biểu đồ tần số dạng cột biểu diễn số giờ ngủ mỗi đêm của một nhóm học sinh có các cột tại $6, 7, 8, 9, 10$ (giờ) với chiều cao lần lượt là $2, 5, 8, 4, 1$. Lập bảng tần số. Nhóm có bao nhiêu học sinh và bao nhiêu bạn ngủ ít nhất $8$ giờ mỗi đêm?',
      steps: [
        'Chiều cao mỗi cột là tần số của giá trị tương ứng, nên bảng tần số là: giá trị $6, 7, 8, 9, 10$ ứng với tần số $2, 5, 8, 4, 1$.',
        'Số học sinh là cỡ mẫu: $n = 2 + 5 + 8 + 4 + 1 = 20$.',
        'Ngủ ít nhất $8$ giờ là ngủ $8$, $9$ hoặc $10$ giờ: $8 + 4 + 1 = 13$ học sinh.',
      ],
      answer: 'Nhóm có $20$ học sinh, trong đó $13$ bạn ngủ ít nhất $8$ giờ mỗi đêm.',
    },
    {
      problem:
        'Nêu cách vẽ biểu đồ tần số dạng đoạn thẳng cho bảng điểm kiểm tra của $20$ học sinh ở phần mở đầu.',
      steps: [
        'Vẽ trục ngang ghi các điểm $5, 6, 7, 8, 9, 10$; trục đứng ghi tần số, chia đơn vị từ $0$ đến $8$.',
        'Đánh dấu các điểm $(5; 1), (6; 2), (7; 5), (8; 7), (9; 3), (10; 2)$.',
        'Nối liên tiếp các điểm vừa đánh dấu bằng các đoạn thẳng; ghi tên trục và tên biểu đồ.',
      ],
      answer:
        'Đường gấp khúc đi lên từ $(5; 1)$ đến đỉnh $(8; 7)$ rồi đi xuống đến $(10; 2)$: điểm $8$ có tần số lớn nhất.',
    },
  ],
  practice: [
    {
      type: 'choice',
      prompt: 'Tần số của một giá trị trong mẫu dữ liệu là',
      options: [
        'số lần xuất hiện của giá trị đó trong mẫu dữ liệu',
        'số các giá trị khác nhau của mẫu dữ liệu',
        'giá trị lớn nhất của mẫu dữ liệu',
        'tổng tất cả các dữ liệu của mẫu',
      ],
      answer: 0,
      hints: ['Nhớ lại định nghĩa ở đầu bài: tần số trả lời câu hỏi "bao nhiêu lần?".'],
      solution: 'Tần số của một giá trị là số lần xuất hiện của giá trị đó trong mẫu dữ liệu.',
    },
    {
      type: 'number',
      prompt:
        'Số lỗi chính tả trong bài viết của $16$ học sinh là: 2; 0; 1; 3; 1; 2; 0; 1; 1; 4; 2; 1; 0; 3; 1; 2. Tìm tần số của giá trị $1$.',
      answer: 6,
      hints: ['Đếm số lần chữ số $1$ xuất hiện trong dãy, gạch đi từng số khi đã đếm.'],
      solution:
        'Giá trị $1$ xuất hiện ở các vị trí thứ $3, 5, 8, 9, 12, 15$, tức $6$ lần. Bảng tần số đầy đủ: $0, 1, 2, 3, 4$ có tần số $3, 6, 4, 2, 1$ (tổng $16$).',
    },
    {
      type: 'match',
      prompt: 'Mẫu dữ liệu: 3; 5; 4; 3; 3; 5; 4; 3; 6; 5. Ghép mỗi giá trị với tần số của nó.',
      left: ['Giá trị $3$', 'Giá trị $4$', 'Giá trị $5$', 'Giá trị $6$'],
      right: ['$1$', '$2$', '$3$', '$4$', '$5$'],
      pairs: [
        [0, 3],
        [1, 1],
        [2, 2],
        [3, 0],
      ],
      hints: ['Đếm từng giá trị; tổng bốn tần số phải bằng $10$.'],
      solution:
        'Giá trị $3$ xuất hiện $4$ lần, giá trị $4$ xuất hiện $2$ lần, giá trị $5$ xuất hiện $3$ lần, giá trị $6$ xuất hiện $1$ lần. Kiểm tra: $4 + 2 + 3 + 1 = 10$.',
    },
    {
      type: 'number',
      prompt:
        'Điểm kiểm tra của một lớp có bảng tần số: điểm $5, 6, 7, 8, 9$ ứng với tần số $3, 7, 10, 6, 4$. Lớp có bao nhiêu học sinh?',
      answer: 30,
      hints: ['Số học sinh là cỡ mẫu, bằng tổng các tần số.'],
      solution: '$n = 3 + 7 + 10 + 6 + 4 = 30$ học sinh.',
    },
    {
      type: 'multi',
      prompt:
        'Với bảng tần số ở câu trên (điểm $5, 6, 7, 8, 9$ có tần số $3, 7, 10, 6, 4$), chọn tất cả các khẳng định đúng.',
      options: [
        'Cỡ mẫu là $30$.',
        'Điểm $7$ có tần số lớn nhất.',
        'Có $7$ học sinh đạt điểm $6$.',
        'Điểm $9$ có tần số nhỏ nhất.',
      ],
      answers: [0, 1, 2],
      hints: ['So sánh các tần số; tần số nhỏ nhất là bao nhiêu và thuộc giá trị nào?'],
      solution:
        'Cỡ mẫu $3 + 7 + 10 + 6 + 4 = 30$; tần số lớn nhất là $10$ (điểm $7$); điểm $6$ có tần số $7$. Tần số nhỏ nhất là $3$, thuộc điểm $5$ chứ không phải điểm $9$ (tần số $4$).',
    },
    {
      type: 'number',
      prompt:
        'Khảo sát $40$ học sinh về số lần đọc sách trong một tuần, được bảng tần số: số lần $1, 2, 3, 4$ ứng với tần số $8,\\ m,\\ 15,\\ 5$. Tìm $m$.',
      answer: 12,
      hints: ['Tổng các tần số bằng cỡ mẫu $40$.'],
      solution: '$8 + m + 15 + 5 = 40 \\Rightarrow m = 40 - 28 = 12$.',
    },
    {
      type: 'number',
      prompt:
        'Từ bảng điểm của $20$ học sinh tổ 1 (điểm $5, 6, 7, 8, 9, 10$ có tần số $1, 2, 5, 7, 3, 2$), có bao nhiêu học sinh đạt từ $8$ điểm trở lên?',
      answer: 12,
      hints: ['Cộng tần số của các điểm $8$, $9$ và $10$.'],
      solution: '$7 + 3 + 2 = 12$ học sinh đạt từ $8$ điểm trở lên.',
    },
    {
      type: 'text',
      prompt:
        'Màu yêu thích của $30$ học sinh có bảng tần số: Xanh $11$, Đỏ $7$, Vàng $5$, Tím $7$. Màu nào có tần số lớn nhất?',
      accept: ['Xanh', 'màu xanh'],
      hints: ['Giá trị ở đây là tên màu; tìm tần số lớn nhất trong bảng.'],
      solution: 'Tần số lớn nhất là $11$, thuộc giá trị "Xanh". Vậy màu xanh được yêu thích nhất.',
    },
    {
      type: 'choice',
      prompt:
        'Trong biểu đồ tần số dạng đoạn thẳng, giá trị $x_i$ có tần số $m_i$ được biểu diễn bởi điểm nào?',
      options: ['$(m_i; x_i)$', '$(x_i; m_i)$', '$(x_i; n)$', '$(i; m_i)$'],
      answer: 1,
      hints: ['Trục ngang ghi giá trị, trục đứng ghi tần số.'],
      solution:
        'Hoành độ là giá trị $x_i$ (trục ngang), tung độ là tần số $m_i$ (trục đứng): điểm $(x_i; m_i)$.',
    },
  ],
  takeaways: [
    'Tần số của một giá trị là số lần giá trị đó xuất hiện trong mẫu dữ liệu.',
    'Bảng tần số liệt kê các giá trị khác nhau $x_i$ cùng tần số $m_i$; tổng các tần số bằng cỡ mẫu $n$.',
    'Biểu đồ tần số dạng cột: cột tại $x_i$ cao $m_i$. Dạng đoạn thẳng: nối các điểm $(x_i; m_i)$.',
  ],
};
