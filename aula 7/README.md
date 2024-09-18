# CSS Flexbox e Propriedades de Posição

## Introdução ao Flexbox

- O que é Flexbox?
- Vantagens do uso do Flexbox

## Propriedades do Container Flex

- `display: flex;`: Define um container flexível.
- `flex-direction`: Define a direção dos itens no container.
  - `row`: Direção horizontal.
  - `row-reverse`: Direção horizontal invertida.
  - `column`: Direção vertical.
  - `column-reverse`: Direção vertical invertida.
- `flex-wrap`: Define se os itens devem quebrar ou não a linha.
  - `nowrap`: Itens não quebram a linha.
  - `wrap`: Itens quebram a linha.
  - `wrap-reverse`: Itens quebram a linha na direção inversa.
- `flex-flow`: Combinação de `flex-direction` e `flex-wrap`.
- `justify-content`: Alinha os itens no eixo principal.
  - `flex-start`: Alinhamento no início.
  - `flex-end`: Alinhamento no final.
  - `center`: Alinhamento no centro.
  - `space-between`: Espaço igual entre os itens.
  - `space-around`: Espaço igual ao redor dos itens.
- `align-items`: Alinha os itens no eixo transversal.
  - `flex-start`: Alinhamento no início.
  - `flex-end`: Alinhamento no final.
  - `center`: Alinhamento no centro.
  - `baseline`: Alinhamento na linha de base.
  - `stretch`: Itens esticam para preencher o container.
- `align-content`: Alinha as linhas do container flexível.
  - `flex-start`: Alinhamento no início.
  - `flex-end`: Alinhamento no final.
  - `center`: Alinhamento no centro.
  - `space-between`: Espaço igual entre as linhas.
  - `space-around`: Espaço igual ao redor das linhas.
  - `stretch`: Linhas esticam para preencher o container.

## Propriedades dos Itens Flex

- `order`: Define a ordem dos itens.
- `flex-grow`: Define o fator de crescimento dos itens.
- `flex-shrink`: Define o fator de encolhimento dos itens.
- `flex-basis`: Define a base flexível dos itens.
- `flex`: Combinação de `flex-grow`, `flex-shrink` e `flex-basis`.
- `align-self`: Alinha individualmente um item no eixo transversal.

## Propriedades de Posição

- `position`: Define o método de posicionamento de um elemento.
  - `static`: Posição padrão, sem posicionamento especial.
  - `relative`: Posição relativa ao seu estado normal.
  - `absolute`: Posição absoluta em relação ao seu container posicionado.
  - `fixed`: Posição fixa em relação à janela do navegador.
  - `sticky`: Posição baseada na rolagem, alternando entre relativa e fixa.
- `top`, `right`, `bottom`, `left`: Define a posição de um elemento posicionado.
- `z-index`: Define a ordem de empilhamento de elementos posicionados.

## Exemplos Práticos

- Layout básico com Flexbox
- Alinhamento horizontal e vertical
- Criação de um grid flexível
- Exemplos de uso das propriedades de posição

## jogo online para testar os conhecimentos

https://flexboxfroggy.com/