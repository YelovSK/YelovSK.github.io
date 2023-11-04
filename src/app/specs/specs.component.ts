import { Component } from '@angular/core';

interface SpecGroup {
  title: string;
  items: SpecItem[];
}

interface SpecItem {
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-specs',
  templateUrl: './specs.component.html',
  styleUrls: ['./specs.component.css'],
})
export class SpecsComponent {
  private readonly DOG_BIRTH_DATE = new Date(2013, 5, 18);

  specs: SpecGroup[] = [
    {
      title: 'GPU', items: [
        { name: 'MSI GTX 1070 Ti Aero + Arctic Accelero Mono Plus', description: 'pascal masterrace', image: '' }
      ]
    },
    {
      title: 'CPU', items: [
        { name: 'AMD Ryzen 5800X3D + Arctic Freezer 34 Duo', description: 'de_cache', image: '' }
      ]
    },
    {
      title: 'RAM', items: [
        { name: 'Patriot Viper Steel Series V4S 4x8GB 3600Mhz CL18', description: '<a href="https://downloadmorewam.com/">downloaded dedotated wam</a>', image: '' }
      ]
    },
    {
      title: 'PSU', items: [
        { name: 'EVGA 750W G2', description: 'tfw no explosion', image: 'assets/megumin.gif' }
      ]
    },
    {
      title: 'MB', items: [
        { name: 'MSI B450 Gaming Plux MAX', description: 'i\'m gaming at max Pog', image: '' }
      ]
    },
    {
      title: 'CASE', items: [
        { name: 'Fractal R4', description: 'white (dirty) boi', image: '' }
      ]
    },
    {
      title: 'SSD', items: [
        { name: 'Samsung 980 Pro 1TB', description: 'professional ssd', image: '' },
        { name: 'Samsung EVO 850 500GB', description: 'non-professional ssd', image: '' },
        { name: 'OCZ Vertex 3 60GB', description: 'grandpa ssd', image: '' },
      ]
    },
    {
      title: 'HDD', items: [
        { name: 'WD Black 1TB', description: 'serves well', image: '' },
        { name: 'WD5000AVDS 500GB', description: 'ngl no idea where i have this from', image: '' },
      ]
    },
    {
      title: 'MONITORS', items: [
        { name: 'Asus VG27AQZ', description: 'stopgap till OLED', image: '' },
        { name: 'Dell P2414H', description: 'OC\'d to 80Hz', image: '' },
        { name: 'Samsung LE40C630', description: 'TV used as a monitor', image: '' },
      ]
    },
    {
      title: 'KEYBOARD', items: [
        { name: 'Zoom TKL AE', description: 'the process i went through to get this shit is ridiculous #NotWorthIt', image: '' },
        { name: 'Leopold 750R PD (MX Red)', description: 'order leopold => dogshit spacebar stab => stab breaks => get replacement => again dogshit stab', image: '' },
        { name: 'Vortex Race 3 (MX Blue)', description: 'blue switches are humanity\'s biggest mistake', image: '' },
      ]
    },
    {
      title: 'MOUSE', items: [
        { name: 'Logitech G305', description: 'cringe wireless', image: '' },
        { name: 'Logitech G505', description: 'cringe wired', image: '' },
      ]
    },
    {
      title: 'MIC', items: [
        { name: 'Blue Yeti', description: 'mic ruined by stupid users', image: '' },
      ]
    },
    {
      title: 'AMP/DAC', items: [
        { name: 'FiiO E10', description: 'great for pissing ppl off by plugging HD800 into this', image: '' },
      ]
    },
    {
      title: 'HEADPHONES', items: [
        { name: 'Sennheiser HD800', description: 'unusable without EQ', image: '' },
        { name: 'Beyerdynamic DT1990 Pro', description: '(even more) unusable without EQ', image: '' },
        { name: 'Sony WH-1000XM3 (for commute)', description: 'dogshit sound, but outside noises are even more dogshit', image: '' },
      ]
    },
    {
      title: 'SPEAKERS', items: [
        { name: 'JBL LSR305', description: 'sounded good, sold \'em tho cuz not living alone', image: '' },
      ]
    },
    {
      title: 'BALISONG', items: [
        { name: 'Glidr Antarctic 2', description: 'i know all the tricks (0)', image: '' },
      ]
    },
    {
      title: 'PHONE', items: [
        { name: 'Google Pixel 6', description: 'retina 6 pixels', image: '' },
      ]
    },
    {
      title: 'VR', items: [
        { name: 'Zucc Quest 3', description: 'VR is worse than NFTs. overrated garbage in its very early stages', image: '' },
      ]
    },
    {
      title: 'FLASHLIGHTS', items: [
        { name: 'Emisar D4 (SST20 5000K)', description: 'ugly tint', image: '' },
        { name: 'Emisar D4V2 (519A 5700K DD)', description: 'nice tint, daily driver', image: '' },
        { name: 'Astrolux MF01S', description: 'bright, but like.. what do i need this brightness for?', image: 'assets/shinyParty.gif' },
        { name: 'BLF Q8', description: 'forgot i have this. Aight tint, but replaced with MF01S', image: '' },
        { name: 'Astrolux FT03', description: 'thrower, mby one day i\'ll use it for dog walking, for now D4V2 is enough', image: '' },
      ]
    },
    {
      title: 'CAMERA', items: [
        { name: 'Nikon D7100 + Sigma 18-35 f/1.8', description: '2 heavy 2 bring with me', image: '' },
        { name: 'Ricoh GR III X', description: 'got it to be able to have a camera with me at all times and shoot more photos. Turned out to be pure copium', image: '' },
      ]
    },
    {
      title: 'LAPTOP', items: [
        { name: 'Lenovo 330S (AMD)', description: 'uni forced me to get a laptop', image: '' },
      ]
    },
    {
      title: 'AC', items: [
        { name: 'Carrier Extreme', description: 'i wish i got an AC sooner', image: '' },
      ]
    },
    {
      title: 'DOG', items: [
        { name: 'Sunny', description: `maltese female, ${this.calculateAge(this.DOG_BIRTH_DATE)} old`, image: 'assets/Sunny.png' },
      ]
    },
    {
      title: 'CAT', items: [
        { name: '', description: '', image: 'assets/ur_cat.png' },
      ]
    },
    {
      title: 'RAT', items: [
        { name: '', description: '', image: 'assets/xdd.webp' },
      ]
    },
    {
      title: 'MILK', items: [
        { name: 'TESCO mlieko UHT plnotučné 3.5%', description: 'white liquid, good', image: '' },
      ]
    }
  ];

  public getSpecDescription(spec: SpecGroup): string {
    return spec.items.map((item) => item.name).join(' | ');
  }

  private calculateAge(birthDate: Date) {
    const currentDate = new Date();

    const ageInMilliseconds = currentDate.getTime() - birthDate.getTime();

    const millisecondsInDay = 24 * 60 * 60 * 1000;

    const years = Math.floor(ageInMilliseconds / (365 * millisecondsInDay));
    const days = Math.floor((ageInMilliseconds % (365 * millisecondsInDay)) / millisecondsInDay);

    const ageString = `${years} years ${days} days`;

    return ageString;
  }
}
