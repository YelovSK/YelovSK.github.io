import { SpecGroup } from './specs.interfaces';
import { ASSETS_PATHS, formatAge } from '../utils';

const DOG_BIRTH_DATE = new Date(2013, 5, 18);

export const SPECS: SpecGroup[] = [
    {
        title: 'GPU', items: [
            { name: 'GAINWARD GeForce RTX 4070 Ti Panther', description: 'upgrade = 2x performance Pog, 3x price HUH' }
        ]
    },
    {
        title: 'CPU', items: [
            { name: 'AMD Ryzen 5800X3D + Arctic Freezer 34 Duo', description: 'de_cache' }
        ]
    },
    {
        title: 'RAM', items: [
            { name: 'Patriot Viper Steel Series V4S 4x8GB 3600Mhz CL18', description: '<a href="https://downloadmorewam.com/">downloaded dedotated wam</a>' }
        ]
    },
    {
        title: 'PSU', items: [
            { name: 'EVGA 750W G2', description: 'tfw no explosion', image: ASSETS_PATHS.MEGUMIN }
        ]
    },
    {
        title: 'MB', items: [
            { name: 'MSI B450 Gaming Plux MAX', description: 'i\'m gaming at max Pog' }
        ]
    },
    {
        title: 'CASE', items: [
            { name: 'Fractal R4', description: 'white (dirty) boi' }
        ]
    },
    {
        title: 'SSD', items: [
            { name: 'Samsung 980 Pro 1TB', description: 'professional ssd' },
            { name: 'Samsung EVO 850 500GB', description: 'non-professional ssd' },
            { name: 'OCZ Vertex 3 60GB', description: 'grandpa ssd' },
        ]
    },
    {
        title: 'HDD', items: [
            { name: 'WD Black 1TB', description: 'serves well' },
            { name: 'WD5000AVDS 500GB', description: 'ngl no idea where i have this from' },
        ]
    },
    {
        title: 'MONITORS', items: [
            { name: 'ASUS OLED PG27AQDP', description: 'turns out that OLED is kinda meh' },
            { name: 'Asus VG27AQZ', description: 'stopgap till OLED' },
            { name: 'Samsung LE40C630', description: 'TV used as a monitor' },
            { name: 'Dell P2414H', description: 'OC\'d to 80Hz', isObsolete: true },
        ]
    },
    {
        title: 'KEYBOARD', items: [
            { name: 'Zoom TKL AE', description: 'the process i went through to get this shit is ridiculous #NotWorthIt' },
            { name: 'Leopold 750R PD (MX Red)', description: 'order leopold => dogshit spacebar stab => stab breaks => get replacement => again dogshit stab', isObsolete: true },
            { name: 'Vortex Race 3 (MX Blue)', description: 'blue switches are humanity\'s biggest mistake', isObsolete: true },
        ]
    },
    {
        title: 'MOUSE', items: [
            { name: 'Logitech G305', description: 'cringe wireless' },
            { name: 'Logitech G502', description: 'cringe wired' },
        ]
    },
    {
        title: 'MIC', items: [
            { name: 'Fifine K688', description: 'dynamic mic rejects noise == 0 iq take' },
            { name: 'Blue Yeti', description: 'mic ruined by stupid users', isObsolete: true },
        ]
    },
    {
        title: 'AMP/DAC', items: [
            { name: 'FiiO E10', description: 'great for pissing ppl off by plugging HD800 into this' },
        ]
    },
    {
        title: 'HEADPHONES', items: [
            { name: 'Sennheiser HD800', description: 'unusable without EQ. comfiest headphones i\'ve had on my head' },
            { name: 'Sennheiser Momentum 4', description: 'for commute and falling asleep to ASMR. should\'ve gotten the qc ultra i think, ANC is more important than sound quality' },
            { name: 'Beyerdynamic DT1990 Pro', description: '(even more) unusable without EQ. strongestest clamping force', isObsolete: true },
            { name: 'Sony WH-1000XM3', description: 'dogshit sound, but outside noises are even more dogshit. replaced with momentum 4', isObsolete: true },
            { name: 'Hifiman HE-400i', description: 'completely fell apart multiple times, chifiman moment', isObsolete: true },
            { name: 'Beyerdynamic DT990 Pro', description: 'sold it quite some time ago, physically comfy, audibly uncofmy (anyone said treble)', isObsolete: true },
            { name: 'Audio-Technica ATH-T500', description: 'made me realize i don\'t like closed back headphones', isObsolete: true },
            { name: 'Vsonic GR07BE', description: 'they sounded nice before the cable got fucked. made me realize i don\'t like IEMs', isObsolete: true },
            { name: 'Koss Porta Pro', description: 'cable obviously died. technically sound bad, but are kind of fun to listen to. yummy hair', isObsolete: true },
        ]
    },
    {
        title: 'SPEAKERS', items: [
            { name: 'JBL LSR305', description: 'sounded good, sold \'em tho cuz not living alone', isObsolete: true }
        ]
    },
    {
        title: 'BALISONG', items: [
            { name: 'Glidr Antarctic 2', description: 'i know all the tricks (0)' },
        ]
    },
    {
        title: 'PHONE', items: [
            { name: 'Google Pixel 6', description: 'retina 6 pixels' },
        ]
    },
    {
        title: 'VR', items: [
            { name: 'Zucc Quest 3', description: 'VR is worse than NFTs. overrated garbage in its very early stages' },
        ]
    },
    {
        title: 'FLASHLIGHTS', items: [
            { name: 'Emisar D1V2 (XHP 70.3 5000K R70)', description: 'EDC, nice mix of flood and throw' },
            { name: 'Acebeam L35 2.0', description: 'good beam profile, but too large for EDC and a shitty side switch + UI' },
            { name: 'Emisar D4V2 (519A 5700K DD)', description: 'nice tint' },
            { name: 'Emisar D4 (SST20 5000K)', description: 'ugly tint' },
            { name: 'Astrolux MF01S', description: 'bright, but like.. what do i need this brightness for?', image: ASSETS_PATHS.SHINY_PARTY },
            { name: 'BLF Q8', description: 'forgot i have this. Aight tint, but replaced with MF01S' },
            { name: 'Astrolux FT03', description: 'thrower, mby one day i\'ll use it for dog walking, for now D4V2 is enough' },
        ]
    },
    {
        title: 'CAMERA', items: [
            { name: 'Nikon D7100 + Sigma 18-35 f/1.8', description: '2 heavy 2 bring with me' },
            { name: 'Ricoh GR III X', description: 'got it to be able to have a camera with me at all times and shoot more photos. Turned out to be pure copium' },
        ]
    },
    {
        title: 'LAPTOP', items: [
            { name: 'Lenovo 330S (AMD)', description: 'uni forced me to get a laptop' },
        ]
    },
    {
        title: 'AC', items: [
            { name: 'Carrier Extreme', description: 'i wish i got an AC sooner' },
        ]
    },
    {
        title: 'DOG', items: [
            { name: 'Sunny', description: `maltese female, ${formatAge(DOG_BIRTH_DATE)} old`, image: ASSETS_PATHS.SUNNY },
        ]
    },
    {
        title: 'CAT', items: [
            { name: '', description: '', image: ASSETS_PATHS.UR_CAT },
        ]
    },
    {
        title: 'RAT', items: [
            { name: '', description: '', image: ASSETS_PATHS.XDD },
        ]
    },
    {
        title: 'MILK', items: [
            { name: 'TESCO mlieko UHT plnotučné 3.5%', description: 'white liquid, good' },
        ]
    }
];