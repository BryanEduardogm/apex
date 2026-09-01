/* Fonte única de dados dos 14 carros da coleção APEX.
   Usada pela página carro.html para montar o título, a ficha técnica
   e o modelo 3D (cor de pintura + estilo/tamanho da carroceria). */

const CARS = {
  'porsche': {
    brand: 'Porsche',
    model: '911',
    tagline: 'O esportivo de referência. Motor traseiro, DNA de pista, uso diário sem esforço.',
    image: 'assets/porsche-911.jpg',
    accent: '--clr-porsche',
    paint: '#B5121B',
    specs: { motor: '3.0L Flat-6 Biturbo', potencia: '379 cv', zeroCem: '4,2 s', velMax: '293 km/h', tracao: 'Traseira (RWD)', categoria: 'Esportivo' },
    body: { style: 'coupe', size: 'mid', wing: false }
  },
  'bmw': {
    brand: 'BMW',
    model: '320i',
    tagline: 'O equilíbrio perfeito entre esportividade e rotina. Tração traseira, cockpit voltado ao motorista.',
    image: 'assets/bmw-320i.jpg',
    accent: '--clr-bmw',
    paint: '#C9CBCE',
    specs: { motor: '2.0L 4 cil. Turbo', potencia: '184 cv', zeroCem: '7,1 s', velMax: '231 km/h', tracao: 'Traseira (RWD)', categoria: 'Sedã esportivo' },
    body: { style: 'sedan', size: 'mid', wing: false }
  },
  'urus': {
    brand: 'Lamborghini',
    model: 'Urus',
    tagline: 'O SUV que mudou as regras. Espaço para o dia a dia, alma de super esportivo.',
    image: 'assets/lamborghini-urus.jpg',
    accent: '--clr-urus',
    paint: '#F2C40F',
    specs: { motor: '4.0L V8 Biturbo', potencia: '650 cv', zeroCem: '3,6 s', velMax: '305 km/h', tracao: 'Integral (AWD)', categoria: 'SUV super esportivo' },
    body: { style: 'suv', size: 'large', wing: false }
  },
  'ferrari': {
    brand: 'Ferrari',
    model: 'F8 Tributo',
    tagline: 'Motor central, alma de pista. O supercarro que empresta tecnologia direto da Fórmula 1.',
    image: 'assets/ferrari-f8.jpg',
    accent: '--clr-ferrari',
    paint: '#C10000',
    specs: { motor: '3.9L V8 Biturbo', potencia: '720 cv', zeroCem: '2,9 s', velMax: '340 km/h', tracao: 'Traseira (RWD)', categoria: 'Supercarro' },
    body: { style: 'supercar', size: 'compact', wing: false }
  },
  'mercedes': {
    brand: 'Mercedes-AMG',
    model: 'G63',
    tagline: 'O SUV icônico que atravessa qualquer terreno sem abrir mão do rugido AMG.',
    image: 'assets/mercedes-g63.jpg',
    accent: '--clr-mercedes',
    paint: '#161616',
    specs: { motor: '4.0L V8 Biturbo', potencia: '585 cv', zeroCem: '4,5 s', velMax: '220 km/h', tracao: 'Integral (AWD)', categoria: 'SUV de luxo' },
    body: { style: 'suv-boxy', size: 'large', wing: false }
  },
  'rolls': {
    brand: 'Rolls-Royce',
    model: 'Ghost',
    tagline: 'A definição de luxo silencioso. Motor V12, cabine isolada do mundo lá fora.',
    image: 'assets/rolls-royce-ghost.jpg',
    accent: '--clr-rolls',
    paint: '#D9D3C4',
    specs: { motor: '6.75L V12 Biturbo', potencia: '571 cv', zeroCem: '4,8 s', velMax: '250 km/h', tracao: 'Integral (AWD)', categoria: 'Sedã de luxo' },
    body: { style: 'sedan-long', size: 'xlarge', wing: false }
  },
  'porsche-gt3': {
    brand: 'Porsche',
    model: '911 GT3',
    tagline: 'Motor aspirado, alma de pista homologada para a rua. Puro em cada detalhe.',
    image: 'assets/porsche-911-gt3.jpg',
    accent: '--clr-porsche',
    paint: '#FF6A1A',
    specs: { motor: '4.0L Flat-6', potencia: '510 cv', zeroCem: '3,4 s', velMax: '318 km/h', tracao: 'Traseira (RWD)', categoria: 'Esportivo de pista' },
    body: { style: 'coupe', size: 'mid', wing: true }
  },
  'rimac': {
    brand: 'Rimac',
    model: 'Nevera',
    tagline: 'O hipercarro 100% elétrico que redefiniu o que "instantâneo" significa em aceleração.',
    image: 'assets/rimac-nevera.jpg',
    accent: '--clr-rimac',
    paint: '#8D9096',
    specs: { motor: 'Elétrico, 4 motores', potencia: '1.914 cv', zeroCem: '1,85 s', velMax: '412 km/h', tracao: 'Integral (AWD)', categoria: 'Hipercarro elétrico' },
    body: { style: 'supercar', size: 'compact', wing: false }
  },
  'wraith': {
    brand: 'Rolls-Royce',
    model: 'Wraith',
    tagline: 'O coupé grand tourer mais potente já feito pela marca. Elegância com atitude.',
    image: 'assets/rolls-royce-wraith.jpg',
    accent: '--clr-rolls',
    paint: '#0D0D0F',
    specs: { motor: '6.6L V12 Biturbo', potencia: '624 cv', zeroCem: '4,4 s', velMax: '250 km/h', tracao: 'Traseira (RWD)', categoria: 'Coupé de luxo' },
    body: { style: 'coupe-grand', size: 'large', wing: false }
  },
  'bentley': {
    brand: 'Bentley',
    model: 'Continental GT',
    tagline: 'Artesanato britânico e um W12 potente para cruzar continentes com classe.',
    image: 'assets/bentley-continental-gt.jpg',
    accent: '--clr-bentley',
    paint: '#0F3D2E',
    specs: { motor: '6.0L W12 Biturbo', potencia: '635 cv', zeroCem: '3,7 s', velMax: '335 km/h', tracao: 'Integral (AWD)', categoria: 'Grand tourer de luxo' },
    body: { style: 'coupe-grand', size: 'large', wing: false }
  },
  'koenigsegg': {
    brand: 'Koenigsegg',
    model: 'Jesko',
    tagline: 'Engenharia sueca obcecada por aerodinâmica. Um dos hipercarros mais extremos do mundo.',
    image: 'assets/koenigsegg-jesko.jpg',
    accent: '--clr-koenigsegg',
    paint: '#8B0000',
    specs: { motor: '5.0L V8 Biturbo', potencia: '1.280 cv', zeroCem: '2,5 s', velMax: '320 km/h', tracao: 'Traseira (RWD)', categoria: 'Hipercarro' },
    body: { style: 'supercar', size: 'compact', wing: true }
  },
  'maybach': {
    brand: 'Mercedes-Maybach',
    model: 'Classe S',
    tagline: 'A cabine mais silenciosa e refinada da Mercedes. Luxo de motorista particular.',
    image: 'assets/mercedes-maybach-s.jpg',
    accent: '--clr-maybach',
    paint: '#121212',
    specs: { motor: '6.0L V12 Biturbo', potencia: '621 cv', zeroCem: '4,4 s', velMax: '250 km/h', tracao: 'Integral (AWD)', categoria: 'Sedã de ultra-luxo' },
    body: { style: 'sedan-long', size: 'xlarge', wing: false }
  },
  'mclaren': {
    brand: 'McLaren',
    model: 'Artura',
    tagline: 'Motor híbrido V6, alma de supercarro. O futuro da McLaren começa aqui.',
    image: 'assets/mclaren-artura.jpg',
    accent: '--clr-mclaren',
    paint: '#2FD9C4',
    specs: { motor: '3.0L V6 Biturbo Híbrido', potencia: '671 cv', zeroCem: '3,0 s', velMax: '330 km/h', tracao: 'Traseira (RWD)', categoria: 'Supercarro híbrido' },
    body: { style: 'supercar', size: 'compact', wing: false }
  },
  'amg-gt63': {
    brand: 'Mercedes-AMG',
    model: 'GT 63 S',
    tagline: 'Quatro portas, coração de esportivo. Performance AMG para toda a família.',
    image: 'assets/mercedes-amg-gt63.jpg',
    accent: '--clr-mercedes',
    paint: '#4A4A4C',
    specs: { motor: '4.0L V8 Biturbo', potencia: '630 cv', zeroCem: '3,2 s', velMax: '315 km/h', tracao: 'Integral (AWD)', categoria: 'Sedã-cupê esportivo' },
    body: { style: 'sedan-sport', size: 'mid', wing: false }
  }
};

/* nome exibido no <select> do formulário de contato, por slug */
const CAR_SELECT_LABEL = {
  'porsche': 'Porsche 911',
  'bmw': 'BMW 320i',
  'urus': 'Lamborghini Urus',
  'ferrari': 'Ferrari F8 Tributo',
  'mercedes': 'Mercedes-AMG G63',
  'rolls': 'Rolls-Royce Ghost',
  'porsche-gt3': 'Porsche 911 GT3',
  'rimac': 'Rimac Nevera',
  'wraith': 'Rolls-Royce Wraith',
  'bentley': 'Bentley Continental GT',
  'koenigsegg': 'Koenigsegg Jesko',
  'maybach': 'Mercedes-Maybach Classe S',
  'mclaren': 'McLaren Artura',
  'amg-gt63': 'Mercedes-AMG GT 63 S'
};
