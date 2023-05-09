import { Inter, M_PLUS_1p } from "next/font/google";

const LATIN = Inter({ subsets: ['latin'] });
const KANA = M_PLUS_1p({ subsets: ['latin'], weight: ["400", "500", "700", "800", "900"]});

export { LATIN, KANA };
