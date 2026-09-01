# APEX

Coleção de 14 carros ícones, cada um com página própria e um modelo 3D que
gira no navegador. O carro não é um arquivo 3D baixado: ele é montado por
código, a partir das medidas e do estilo de carroceria de cada modelo.

**Site no ar:** https://apex333.netlify.app

## O que o site faz

- **Coleção** — os 14 carros em cartões, com filtro por categoria
- **Página do carro** — foto, ficha técnica e o modelo 3D do modelo escolhido
- **Modelo 3D gerado por parâmetros** — cada carro descreve a própria
  carroceria (`coupe`, `sedan`, `suv`), o tamanho, se tem aerofólio e a cor da
  pintura; o mesmo código monta um Porsche 911 ou um Rolls-Royce Ghost só
  mudando esses valores
- **Gira ao arrastar** com o mouse ou o dedo, direto no navegador, sem plugin

## Como foi feito

| Parte | Ferramenta |
|---|---|
| Estrutura | HTML |
| Estilo | CSS (variáveis para a cor de cada marca) |
| Comportamento | JavaScript |
| 3D | Three.js sobre WebGL |

Sem framework e sem etapa de build: são arquivos que o navegador abre direto.

## Organização

```
index.html          coleção
carro.html          página de um carro (recebe o modelo pela URL)
css/style.css
js/cars-data.js     fonte única de dados dos 14 carros
js/car-viewer.js    monta o modelo 3D a partir desses dados
js/car-page.js      preenche a página do carro
js/script.js        filtros da coleção
assets/             fotos dos carros
```

`cars-data.js` é o coração do projeto: título, ficha técnica, cor e formato do
3D saem todos dali. Para acrescentar um carro, basta um bloco novo nesse
arquivo — nenhuma outra página precisa ser tocada.

## Rodando na sua máquina

Baixe a pasta e abra o `index.html`. Como o Three.js vem de CDN, é preciso
estar conectado à internet na primeira vez.

## Sobre as imagens

As fotos dos carros são usadas apenas para estudo, num projeto sem fins
comerciais.

---

Feito por **Bryan Eduardo Gouvea** — [github.com/BryanEduardogm](https://github.com/BryanEduardogm)
