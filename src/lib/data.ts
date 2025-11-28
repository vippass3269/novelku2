import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const imageMap = new Map<string, ImagePlaceholder>(PlaceHolderImages.map(img => [img.id, img]));

export interface Chapter {
  id: string;
  slug: string;
  title: string;
  content: string;
  isLocked: boolean;
  cost: number;
}

export interface Novel {
  id: string;
  slug: string;
  title: string;
  author: string;
  description: string;
  coverImage: ImagePlaceholder;
  genreIds: string[];
  chapters: Chapter[];
}

export interface Genre {
  id: string;
  slug: string;
  name: string;
}

export const genres: Genre[] = [
  { id: 'fantasi', slug: 'fantasi', name: 'Fantasi' },
  { id: 'romansa', slug: 'romansa', name: 'Romansa' },
  { id: 'misteri', slug: 'misteri', name: 'Misteri' },
];

export const novels: Novel[] = [
  {
    id: 'gema-di-ujung-senja',
    slug: 'gema-di-ujung-senja',
    title: 'Gema di Ujung Senja',
    author: 'Ayu Lestari',
    description: 'Di sebuah dunia yang terbelah antara sihir dan teknologi, seorang gadis bernama Elara menemukan artefak kuno yang bisa mengubah takdir dunia. Ia harus berjuang melawan kekuatan gelap yang juga menginginkan artefak tersebut.',
    coverImage: imageMap.get('novel-cover-1')!,
    genreIds: ['fantasi'],
    chapters: [
      { id: 'gema-1', slug: 'bab-1', title: 'Bab 1: Penemuan Tak Terduga', content: 'Langit senja di kota Neo-Veridia selalu berwarna ungu kemerahan, sebuah pemandangan yang tak pernah gagal membuat Elara terpukau. Hari itu, saat sedang mengais barang bekas di Pasar Rongsokan, tangannya menyentuh sebuah kotak logam dingin yang berukir simbol-simbol aneh. Tanpa ia sadari, penemuan itu akan menjadi awal dari petualangan terbesar dalam hidupnya.', isLocked: false, cost: 0 },
      { id: 'gema-2', slug: 'bab-2', title: 'Bab 2: Suara dari Masa Lalu', content: 'Kotak itu bergetar hebat di malam hari, memancarkan cahaya keemasan yang lembut. Sebuah suara berbisik di benak Elara, suara yang terdengar tua dan bijaksana, menceritakan tentang perang kuno dan sebuah kunci untuk mendamaikan dunia.', isLocked: true, cost: 10 },
      { id: 'gema-3', slug: 'bab-3', title: 'Bab 3: Diburu Kegelapan', content: 'Kekuatan artefak itu tidak luput dari perhatian. Sosok-sosok berjubah gelap dari Ordo Obsidian mulai memburunya. Elara terpaksa melarikan diri dari satu-satunya rumah yang pernah ia kenal.', isLocked: true, cost: 10 },
    ],
  },
  {
    id: 'jejak-sang-pengembara',
    slug: 'jejak-sang-pengembara',
    title: 'Jejak Sang Pengembara',
    author: 'Budi Santoso',
    description: 'Kisah seorang pengembara tanpa nama yang berkelana dari satu kerajaan ke kerajaan lain, meninggalkan jejak-jejak perubahan di setiap tempat yang ia singgahi. Siapakah dia sebenarnya dan apa tujuan dari perjalanannya?',
    coverImage: imageMap.get('novel-cover-2')!,
    genreIds: ['fantasi'],
    chapters: [
      { id: 'jejak-1', slug: 'bab-1', title: 'Bab 1: Tiba di Kerajaan Pasir', content: 'Seorang pria asing dengan mantel usang tiba di gerbang Kerajaan Azura, sebuah negeri yang kering kerontang di tengah gurun pasir. Ia tidak menyebutkan nama, hanya tatapan matanya yang setajam elang gurun.', isLocked: false, cost: 0 },
      { id: 'jejak-2', slug: 'bab-2', title: 'Bab 2: Wabah Misterius', content: 'Kerajaan Azura sedang dilanda wabah yang membuat penduduknya tertidur lelap tanpa bisa dibangunkan. Sang pengembara menawarkan bantuan, dengan syarat ia diizinkan mengakses perpustakaan kuno istana.', isLocked: true, cost: 5 },
    ],
  },
  {
    id: 'bisikan-hutan-larangan',
    slug: 'bisikan-hutan-larangan',
    title: 'Bisikan Hutan Larangan',
    author: 'Ratih Pramudita',
    description: 'Sebuah hutan yang dikabarkan terkutuk menyimpan rahasia kelam sebuah desa. Ketika adiknya tersesat di dalamnya, Rian nekat masuk, hanya untuk menemukan bahwa bisikan-bisikan di hutan itu lebih dari sekadar legenda.',
    coverImage: imageMap.get('novel-cover-3')!,
    genreIds: ['misteri', 'fantasi'],
    chapters: [
       { id: 'bisikan-1', slug: 'bab-1', title: 'Bab 1: Hutan yang Terlarang', content: 'Semua orang di Desa Cipta Asih tahu satu aturan: jangan pernah memasuki Hutan Arga. Rian menganggapnya takhayul, sampai adiknya, Maya, menghilang setelah bermain di tepi hutan.', isLocked: false, cost: 0 },
       { id: 'bisikan-2', slug: 'bab-2', title: 'Bab 2: Melanggar Aturan', content: 'Mengabaikan peringatan para tetua, Rian melangkahkan kaki ke dalam kegelapan hutan. Udara terasa dingin dan suara-suara aneh mulai terdengar di antara pepohonan.', isLocked: true, cost: 10 },
    ],
  },
  {
    id: 'serpihan-rindu',
    slug: 'serpihan-rindu',
    title: 'Serpihan Rindu',
    author: 'Clara Angeline',
    description: 'Setelah lima tahun terpisah, takdir mempertemukan kembali Arka dan Laras di sebuah kafe kecil di sudut kota Praha. Namun, waktu telah mengubah banyak hal, dan keduanya harus menghadapi luka lama yang belum sembuh.',
    coverImage: imageMap.get('novel-cover-4')!,
    genreIds: ['romansa'],
    chapters: [
      { id: 'serpihan-1', slug: 'bab-1', title: 'Bab 1: Praha dan Kenangan', content: 'Lonceng kecil di pintu kafe berdentang, dan Laras mengangkat pandangannya dari buku. Jantungnya seakan berhenti berdetak. Pria yang baru saja masuk adalah Arka, cinta pertamanya yang menghilang tanpa kabar.', isLocked: false, cost: 0 },
      { id: 'serpihan-2', slug: 'bab-2', title: 'Bab 2: Percakapan yang Canggung', content: 'Keduanya duduk berhadapan, secangkir kopi menjadi saksi bisu kecanggungan di antara mereka. "Apa kabarmu?" adalah kalimat pertama yang terucap setelah lima tahun hening.', isLocked: true, cost: 5 },
    ],
  },
  {
    id: 'cinta-di-bawah-purnama',
    slug: 'cinta-di-bawah-purnama',
    title: 'Cinta di Bawah Purnama',
    author: 'Dian Sasmita',
    description: 'Seorang pelukis jalanan bertemu dengan seorang pewaris kaya yang melarikan diri dari perjodohan. Pertemuan tak sengaja di malam bulan purnama membawa mereka pada sebuah kisah cinta yang mustahil dan penuh tantangan.',
    coverImage: imageMap.get('novel-cover-6')!,
    genreIds: ['romansa'],
    chapters: [
        { id: 'cinta-1', slug: 'bab-1', title: 'Bab 1: Malam Purnama', content: 'Di bawah sinar bulan purnama, Bima sedang menyelesaikan lukisan Jembatan Ampera saat seorang gadis dengan gaun mewah tiba-tiba duduk di sebelahnya, menangis tersedu-sedu.', isLocked: false, cost: 0 },
    ],
  },
  {
    id: 'konspirasi-ibukota',
    slug: 'konspirasi-ibukota',
    title: 'Konspirasi Ibukota',
    author: 'Andra Wijaya',
    description: 'Seorang jurnalis investigasi menemukan sebuah data yang mengarah pada konspirasi besar di lingkaran pejabat tinggi negara. Kini, hidupnya dalam bahaya dan ia harus berpacu dengan waktu untuk mengungkap kebenaran.',
    coverImage: imageMap.get('novel-cover-7')!,
    genreIds: ['misteri'],
    chapters: [
        { id: 'konspirasi-1', slug: 'bab-1', title: 'Bab 1: Flashdisk Berdarah', content: 'Sebuah flashdisk dilemparkan ke mobil Rian oleh seorang informan misterius, beberapa detik sebelum informan itu tewas dalam sebuah kecelakaan yang direkayasa. Rian tahu, isi flashdisk ini sangat berbahaya.', isLocked: false, cost: 0 },
    ],
  },
];
