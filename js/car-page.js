document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('carro');
  const car = CARS[slug];

  const notFound = document.getElementById('carNotFound');
  const content = document.getElementById('carContent');

  if (!car) {
    notFound.hidden = false;
    content.hidden = true;
    return;
  }

  document.title = `${car.brand} ${car.model} em 3D — APEX`;

  document.getElementById('carBrand').textContent = car.brand;
  document.getElementById('carModel').textContent = car.model;
  document.getElementById('carTagline').textContent = car.tagline;

  const accentValue = getComputedStyle(document.documentElement).getPropertyValue(car.accent).trim();
  document.documentElement.style.setProperty('--page-accent', accentValue || 'var(--clr-accent)');

  const specLabels = {
    motor: 'Motor',
    potencia: 'Potência',
    zeroCem: '0–100 km/h',
    velMax: 'Velocidade máxima',
    tracao: 'Tração',
    categoria: 'Categoria'
  };

  const specList = document.getElementById('carSpecs');
  Object.keys(specLabels).forEach((key) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${car.specs[key]}</strong><span>${specLabels[key]}</span>`;
    specList.appendChild(li);
  });

  const ctaLink = document.getElementById('carCta');
  const label = CAR_SELECT_LABEL[slug];
  ctaLink.href = `index.html?carro=${encodeURIComponent(slug)}#contato`;
  ctaLink.textContent = `Quero agendar um test-drive do ${label || (car.brand + ' ' + car.model)}`;

  const viewerContainer = document.getElementById('carViewer');
  initCarViewer(viewerContainer, car.body, car.paint);
});
