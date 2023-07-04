import { Inter, M_PLUS_1p } from "next/font/google";
import localFont from 'next/font/local';

const LATIN = localFont({src:'JetBrainsMono-Regular.woff2'});
const KANA = M_PLUS_1p({ subsets: ['latin'], weight: ["400", "500", "700", "800", "900"]});

export { LATIN, KANA };
