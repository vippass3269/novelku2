import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const imageMap = new Map<string, ImagePlaceholder>(PlaceHolderImages.map(img => [img.id, img]));

export interface Chapter {
  id: string;
  slug: string;
  title: string;
  content: string;
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
  stats: {
    rating: number;
    views: number;
  };
  isFree: boolean;
  isR18: boolean;
  status: 'ongoing' | 'completed';
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
  { id: 'aksi', slug: 'aksi', name: 'Aksi' },
  { id: 'petualangan', slug: 'petualangan', name: 'Petualangan' },
  { id: 'sci-fi', slug: 'sci-fi', name: 'Sci-Fi' },
  { id: 'horor', slug: 'horor', name: 'Horor' },
  { id: 'komedi', slug: 'komedi', name: 'Komedi' },
  { id: 'drama', slug: 'drama', name: 'Drama' },
  { id: 'r18', slug: 'r18', name: 'R18+' },
];

export const novels: Novel[] = [
    {
    id: 'malam-panas-di-kota-jakarta',
    slug: 'malam-panas-di-kota-jakarta',
    title: 'Malam Panas di Kota Jakarta',
    author: 'Dewi Malam',
    description: 'Sebuah kisah romansa panas di tengah gemerlapnya kehidupan malam Jakarta. Pertemuan tak terduga yang mengubah segalanya.',
    coverImage: imageMap.get('novel-cover-8')!,
    genreIds: ['r18', 'romansa'],
    stats: { rating: 4.9, views: 156002 },
    isFree: false,
    isR18: true,
    status: 'ongoing',
    chapters: Array.from({ length: 1 }, (_, i) => ({
      id: `malam-panas-${i + 1}`,
      slug: `bab-${i + 1}`,
      title: `Bab ${i + 1}: Pertemuan Pertama`,
      content: `Konten untuk bab ${i+1}.`,
      cost: i < 10 ? 0 : 15,
    })),
  },
  {
    id: 'sang-raja-iblis-terlahir-kembali',
    slug: 'sang-raja-iblis-terlahir-kembali',
    title: 'Sang Raja Iblis Terlahir Kembali',
    author: 'Pendekar Langit',
    description: 'Raja Iblis yang dikalahkan ribuan tahun lalu, kini bereinkarnasi ke dalam tubuh seorang pemuda biasa. Akankah ia mengulang takdirnya atau memilih jalan yang berbeda?',
    coverImage: imageMap.get('novel-cover-2')!,
    genreIds: ['fantasi', 'aksi'],
    stats: { rating: 4.8, views: 567000 },
    isFree: false,
    isR18: false,
    status: 'ongoing',
    chapters: Array.from({ length: 234 }, (_, i) => ({
      id: `raja-iblis-${i + 1}`,
      slug: `bab-${i + 1}`,
      title: `Bab ${i + 1}: Kebangkitan`,
      content: `Konten untuk bab ${i+1}.`,
      cost: i < 10 ? 0 : 5,
    })),
  },
  {
    id: 'cinta-terlarang-dengan-ceo',
    slug: 'cinta-terlarang-dengan-ceo',
    title: 'Cinta Terlarang dengan CEO',
    author: 'Bunga Mawar',
    description: 'Seorang karyawan biasa yang tanpa sengaja menarik perhatian CEO dingin di perusahaannya. Hubungan mereka yang penuh lika-liku diuji oleh intrik kantor dan perbedaan status.',
    coverImage: imageMap.get('novel-cover-5')!,
    genreIds: ['romansa', 'drama'],
    stats: { rating: 4.7, views: 345003 },
    isFree: false,
    isR18: false,
    status: 'ongoing',
    chapters: Array.from({ length: 1 }, (_, i) => ({
      id: `ceo-cinta-${i + 1}`,
      slug: `bab-${i + 1}`,
      title: `Bab ${i + 1}: Tatapan Pertama`,
      content: `Konten untuk bab ${i+1}.`,
      cost: i < 10 ? 0 : 10,
    })),
  },
  {
    id: 'the-dragons-chosen',
    slug: 'the-dragons-chosen',
    title: 'The Dragon\'s Chosen',
    author: 'Elena Storm',
    description: 'In a world ruled by dragons, a young girl is chosen to be the next rider. She must bond with a fearsome dragon and save her kingdom from an ancient evil.',
    coverImage: imageMap.get('novel-cover-1')!,
    genreIds: ['fantasi', 'romansa'],
    stats: { rating: 4.8, views: 125000 },
    isFree: false,
    isR18: false,
    status: 'ongoing',
    chapters: Array.from({ length: 45 }, (_, i) => ({
      id: `dragon-${i + 1}`,
      slug: `bab-${i + 1}`,
      title: `Chapter ${i + 1}: The Choosing`,
      content: `Content for chapter ${i+1}.`,
      cost: i < 10 ? 0 : 10,
    })),
  },
  {
    id: 'the-immortal-chef',
    slug: 'the-immortal-chef',
    title: 'The Immortal Chef',
    author: 'Wei Lin',
    description: 'An immortal being, tired of eternal life, decides to open a small restaurant. Through his cooking, he touches the lives of his patrons in unexpected ways.',
    coverImage: imageMap.get('novel-cover-7')!,
    genreIds: ['fantasi', 'komedi'],
    stats: { rating: 4.9, views: 234000 },
    isFree: true,
    isR18: false,
    status: 'ongoing',
    chapters: Array.from({ length: 156 }, (_, i) => ({
      id: `chef-${i + 1}`,
      slug: `bab-${i + 1}`,
      title: `Chapter ${i + 1}: A Pinch of Magic`,
      content: `Content for chapter ${i+1}.`,
      cost: 0,
    })),
  },
  {
    id: 'midnight-academy',
    slug: 'midnight-academy',
    title: 'Midnight Academy',
    author: 'Sarah Knight',
    description: 'An academy for supernatural beings that only opens its gates at midnight. A human girl stumbles upon it and must navigate a world of vampires, werewolves, and witches.',
    coverImage: imageMap.get('novel-cover-6')!,
    genreIds: ['fantasi', 'romansa'],
    stats: { rating: 4.6, views: 445000 },
    isFree: false,
    isR18: false,
    status: 'completed',
    chapters: Array.from({ length: 200 }, (_, i) => ({
      id: `midnight-${i + 1}`,
      slug: `bab-${i + 1}`,
      title: `Chapter ${i + 1}: The First Night`,
      content: `Content for chapter ${i+1}.`,
      cost: i < 10 ? 0 : 5,
    })),
  },
  {
    id: 'gema-di-ujung-senja',
    slug: 'gema-di-ujung-senja',
    title: 'Gema di Ujung Senja',
    author: 'Ayu Lestari',
    description: 'Di sebuah dunia yang terbelah antara sihir dan teknologi, seorang gadis bernama Elara menemukan artefak kuno yang bisa mengubah takdir dunia. Ia harus berjuang melawan kekuatan gelap yang juga menginginkan artefak tersebut.',
    coverImage: imageMap.get('novel-cover-1')!,
    genreIds: ['fantasi'],
    stats: { rating: 4.7, views: 567000 },
    isFree: false,
    isR18: false,
    status: 'ongoing',
    chapters: Array.from({ length: 15 }, (_, i) => ({
      id: `gema-${i + 1}`,
      slug: `bab-${i + 1}`,
      title: `Bab ${i + 1}: ${i === 0 ? 'Penemuan Tak Terduga' : i === 1 ? 'Suara dari Masa Lalu' : `Perjalanan Baru ${i-1}`}`,
      content: `Ini adalah isi konten untuk bab ${i + 1} dari novel Gema di Ujung Senja. Setiap bab membawa Elara lebih dekat ke takdirnya, mengungkap lebih banyak rahasia tentang artefak kuno dan dunia yang terpecah. Perjalanan ini penuh dengan bahaya, persahabatan, dan pengkhianatan.`,
      cost: i < 10 ? 0 : 10,
    })),
  },
  {
    id: 'jejak-sang-pengembara',
    slug: 'jejak-sang-pengembara',
    title: 'Jejak Sang Pengembara',
    author: 'Budi Santoso',
    description: 'Kisah seorang pengembara tanpa nama yang berkelana dari satu kerajaan ke kerajaan lain, meninggalkan jejak-jejak perubahan di setiap tempat yang ia singgahi. Siapakah dia sebenarnya dan apa tujuan dari perjalanannya?',
    coverImage: imageMap.get('novel-cover-2')!,
    genreIds: ['fantasi'],
    stats: { rating: 4.9, views: 234000 },
    isFree: false,
    isR18: false,
    status: 'ongoing',
    chapters: Array.from({ length: 12 }, (_, i) => ({
        id: `jejak-${i + 1}`,
        slug: `bab-${i + 1}`,
        title: `Bab ${i + 1}: ${i === 0 ? 'Tiba di Kerajaan Pasir' : `Teka-teki Baru ${i}`}`,
        content: `Konten untuk bab ${i+1}. Sang pengembara melanjutkan perjalanannya, menghadapi tantangan baru dan mengungkap misteri yang lebih dalam di setiap kerajaan yang ia kunjungi.`,
        cost: i < 10 ? 0 : 5,
    })),
  },
  {
    id: 'bisikan-hutan-larangan',
    slug: 'bisikan-hutan-larangan',
    title: 'Bisikan Hutan Larangan',
    author: 'Ratih Pramudita',
    description: 'Sebuah hutan yang dikabarkan terkutuk menyimpan rahasia kelam sebuah desa. Ketika adiknya tersesat di dalamnya, Rian nekat masuk, hanya untuk menemukan bahwa bisikan-bisikan di hutan itu lebih dari sekadar legenda.',
    coverImage: imageMap.get('novel-cover-3')!,
    genreIds: ['misteri', 'fantasi'],
    stats: { rating: 4.8, views: 125000 },
    isFree: false,
    isR18: true,
    status: 'ongoing',
    chapters: Array.from({ length: 20 }, (_, i) => ({
      id: `bisikan-${i + 1}`,
      slug: `bab-${i + 1}`,
      title: `Bab ${i + 1}: ${i === 0 ? 'Hutan yang Terlarang' : `Jejak yang Hilang ${i}`}`,
      content: `Konten untuk bab ${i+1}. Rian semakin jauh masuk ke dalam hutan, di mana setiap pohon tampak mengawasinya dan setiap bisikan angin membawa pesan misterius.`,
      cost: i < 10 ? 0 : 10,
    })),
  },
  {
    id: 'serpihan-rindu',
    slug: 'serpihan-rindu',
    title: 'Serpihan Rindu',
    author: 'Clara Angeline',
    description: 'Setelah lima tahun terpisah, takdir mempertemukan kembali Arka dan Laras di sebuah kafe kecil di sudut kota Praha. Namun, waktu telah mengubah banyak hal, dan keduanya harus menghadapi luka lama yang belum sembuh.',
    coverImage: imageMap.get('novel-cover-4')!,
    genreIds: ['romansa'],
    stats: { rating: 4.6, views: 320000 },
    isFree: true,
    status: 'completed',
    isR18: false,
    chapters: Array.from({ length: 8 }, (_, i) => ({
        id: `serpihan-${i + 1}`,
        slug: `bab-${i + 1}`,
        title: `Bab ${i + 1}: ${i === 0 ? 'Praha dan Kenangan' : `Kata yang Tak Terucap ${i}`}`,
        content: `Konten untuk bab ${i+1}. Di tengah keindahan kota Praha, Arka dan Laras mencoba merangkai kembali serpihan-serpihan masa lalu mereka, meskipun tidak mudah.`,
        cost: 0,
    })),
  },
  {
    id: 'cinta-di-bawah-purnama',
    slug: 'cinta-di-bawah-purnama',
    title: 'Cinta di Bawah Purnama',
    author: 'Dian Sasmita',
    description: 'Seorang pelukis jalanan bertemu dengan seorang pewaris kaya yang melarikan diri dari perjodohan. Pertemuan tak sengaja di malam bulan purnama membawa mereka pada sebuah kisah cinta yang mustahil dan penuh tantangan.',
    coverImage: imageMap.get('novel-cover-6')!,
    genreIds: ['romansa'],
    stats: { rating: 4.5, views: 180000 },
    isFree: false,
    isR18: false,
    status: 'ongoing',
    chapters: Array.from({ length: 15 }, (_, i) => ({
      id: `cinta-${i + 1}`,
      slug: `bab-${i + 1}`,
      title: `Bab ${i + 1}: ${i === 0 ? 'Malam Purnama' : `Dunia yang Berbeda ${i}`}`,
      content: `Konten untuk bab ${i+1}. Kisah cinta antara si miskin dan si kaya ini diuji oleh perbedaan status sosial dan tentangan keluarga.`,
      cost: i < 10 ? 0 : 5,
    })),
  },
  {
    id: 'konspirasi-ibukota',
    slug: 'konspirasi-ibukota',
    title: 'Konspirasi Ibukota',
    author: 'Andra Wijaya',
    description: 'Seorang jurnalis investigasi menemukan sebuah data yang mengarah pada konspirasi besar di lingkaran pejabat tinggi negara. Kini, hidupnya dalam bahaya dan ia harus berpacu dengan waktu untuk mengungkap kebenaran.',
    coverImage: imageMap.get('novel-cover-7')!,
    genreIds: ['misteri'],
    stats: { rating: 4.8, views: 450000 },
    isFree: false,
    isR18: false,
    status: 'ongoing',
    chapters: Array.from({ length: 25 }, (_, i) => ({
      id: `konspirasi-${i + 1}`,
      slug: `bab-${i + 1}`,
      title: `Bab ${i + 1}: ${i === 0 ? 'Flashdisk Berdarah' : `Bayangan Mengintai ${i}`}`,
      content: `Konten untuk bab ${i+1}. Dengan setiap data yang ia buka, Rian semakin terjerat dalam jaringan konspirasi yang mengancam nyawanya dan keamanan negara.`,
      cost: i < 10 ? 0 : 15,
    })),
  },
];
