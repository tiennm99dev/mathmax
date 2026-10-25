/**
 * Lesson URLs from before the grade-based routes. Each one prerenders as a
 * meta-refresh page pointing at the lesson's new home. Targets are
 * root-relative curriculum paths; `curriculum.test.js` checks they exist.
 */

/** @typedef {{ strand: string, slug: string, to: string }} LegacyRedirect */

/** @type {LegacyRedirect[]} */
export const legacyRedirects = [
  {
    strand: 'so-hoc',
    slug: 'uoc-chung-lon-nhat',
    to: '/lop-6/tinh-chia-het-trong-tap-hop-cac-so-tu-nhien/bai-11-uoc-chung-uoc-chung-lon-nhat/',
  },
  {
    strand: 'so-hoc',
    slug: 'sang-eratosthenes',
    to: '/lop-6/tinh-chia-het-trong-tap-hop-cac-so-tu-nhien/bai-10-so-nguyen-to/',
  },
  {
    strand: 'dai-so',
    slug: 'hieu-hai-binh-phuong',
    to: '/lop-8/hang-dang-thuc-dang-nho-va-ung-dung/bai-6-hieu-hai-binh-phuong-binh-phuong-cua-mot-tong-hay-mot-hieu/',
  },
  {
    strand: 'dai-so',
    slug: 'duong-thang',
    to: '/lop-8/phuong-trinh-bac-nhat-va-ham-so-bac-nhat/bai-28-ham-so-bac-nhat-va-do-thi-cua-ham-so-bac-nhat/',
  },
  {
    strand: 'dai-so',
    slug: 'he-phuong-trinh-bac-nhat',
    to: '/lop-9/phuong-trinh-va-he-hai-phuong-trinh-bac-nhat-hai-an/bai-2-giai-he-hai-phuong-trinh-bac-nhat-hai-an/',
  },
  {
    strand: 'hinh-hoc',
    slug: 'dinh-ly-pythagoras',
    to: '/lop-8/tam-giac-dong-dang/bai-35-dinh-li-pythagore-va-ung-dung/',
  },
  {
    strand: 'hinh-hoc',
    slug: 'tam-giac-bang-nhau',
    to: '/lop-7/tam-giac-bang-nhau/bai-13-hai-tam-giac-bang-nhau-truong-hop-bang-nhau-thu-nhat-cua-tam-giac/',
  },
  {
    strand: 'hinh-hoc',
    slug: 'tam-giac-dong-dang',
    to: '/lop-8/tam-giac-dong-dang/bai-33-hai-tam-giac-dong-dang/',
  },
  {
    strand: 'hinh-hoc',
    slug: 'goc-noi-tiep',
    to: '/lop-9/duong-tron-ngoai-tiep-va-duong-tron-noi-tiep/bai-27-goc-noi-tiep/',
  },
];

/**
 * @param {string} strand
 * @param {string} slug
 * @returns {LegacyRedirect | undefined}
 */
export function findRedirect(strand, slug) {
  return legacyRedirects.find((r) => r.strand === strand && r.slug === slug);
}
