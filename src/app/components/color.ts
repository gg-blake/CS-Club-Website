// @ts-nocheck
import "@/app/globals.css";

const setColorPrimaryTheme = (hue: number) => {
    const r = document.querySelector(':root');
    if (!r) return;
    r?.style.setProperty('--color-primary-50', `${hue}deg 100% 94%`);
    r?.style.setProperty('--color-primary-100', `${hue}deg 100% 86%`);
    r?.style.setProperty('--color-primary-200', `${hue}deg 100% 76%`);
    r?.style.setProperty('--color-primary-300', `${hue}deg 100% 64%`);
    r?.style.setProperty('--color-primary-400', `${hue}deg 100% 50%`);
    r?.style.setProperty('--color-primary-500', `${hue}deg 100% 50%`);
    r?.style.setProperty('--color-primary-600', `${hue}deg 100% 50%`);
    r?.style.setProperty('--color-primary-700', `${hue}deg 100% 50%`);
    r?.style.setProperty('--color-primary-800', `${hue}deg 98% 47%`);
    r?.style.setProperty('--color-primary-900', `${hue}deg 75% 46%`);
}

export default setColorPrimaryTheme;