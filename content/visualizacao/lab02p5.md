---
title: "Lab02p5"
date: 2017-12-21T22:30:25-03:00
draft: false
---

O objetivo dessa visualização é mostrar a quantidade de pessoas que passaram em um de três lugares que ficam ao redor do açude(bob's, monumento Jackson do Pandeiro e o Museu dos burrinhos). O eixo horizontal representa o tempo, e a largura das faixas representa a quantidade de pessoas que passaram nesse período de tempo(Infelizmente quando fui passar minha vizualização para o HUGO os eixos não ficaram da maneira como eu queria, acabei retirando).

A vizualização é interativa das seguinte formas: <br>
1. Clicando no botão "Trocar os dados" trocamos a base de dados utilizada para gerar a visualização, de pedestres para ciclistas ou de ciclistas para pedestres.<div><br></div>
2. Colocando o mouse por cima de uma das faixas, o nome correspondente a faixa aparece, além de mudar a cor da faixa.<div><br></div>
3. Clicando na faixa o usuário é redirecionado para uma página com a foto do local.<div><br></div>

<div>
<meta charset="utf-8">
<title>Streamgraph</title>
<style>


</style>
<body>
  <button onclick="transition()">Trocar dados</button>
  <svg width="550" height="500"></svg>
</body>
<script src="https://d3js.org/d3.v4.min.js"></script>
<script>

var reader = new FileReader();

var dat = [144, 56, 134, 145, 54, 120, 138, 63, 120, 125, 91, 99, 120, 69, 125, 110, 88, 105, 97, 68, 82, 96, 45, 66, 76, 76, 69, 39, 70, 74, 32, 49, 44, 14, 83, 49, 19, 50, 34, 34, 65, 30, 16, 55, 39, 16, 62, 22, 16, 45, 19, 15, 56, 28, 30, 55, 22, 64, 72, 28, 9, 56, 10, 22, 70, 41, 10, 80, 24, 29, 64, 18, 20, 60, 16, 27, 49, 19, 33, 68, 5, 32, 72, 14, 53, 66, 42, 24, 63, 26, 14, 61, 14, 27, 58, 19, 38, 57, 23, 24, 62, 20, 24, 68, 29, 33, 64, 24, 26, 78, 19, 68, 56, 29, 83, 78, 50, 174, 85, 48, 97, 98, 110, 80, 97, 121, 184, 107, 133, 242, 128, 186, 202, 122, 224, 285, 125, 207, 211, 101, 241, 202, 129, 191, 224, 105, 212, 193, 79, 199, 203, 84, 223, 198, 62, 200, 154, 32, 176, 132, 38, 171, 100, 42, 124, 66, 31, 91, 54, 23, 80, 52, 23, 64, 39, 32, 54];

var dat2 = [31, 276, 40, 47, 4, 35, 33, 18, 29, 32, 19, 29, 18, 8, 31, 22, 12, 36, 20, 7, 22, 29, 4, 16, 8, 12, 23, 11, 11, 20, 16, 8, 16, 13, 8, 12, 9, 5, 11, 8, 9, 14, 13, 7, 15, 6, 11, 10, 6, 5, 4, 13, 5, 5, 13, 1, 8, 22, 11, 15, 6, 10, 7, 9, 0, 12, 13, 6, 6, 9, 13, 7, 10, 10, 4, 7, 10, 7, 16, 13, 8, 13, 9, 7, 9, 14, 8, 7, 7, 9, 10, 8, 11, 9, 12, 6, 4, 5, 2, 3, 15, 2, 10, 11, 5, 10, 11, 7, 10, 14, 8, 7, 15, 7, 14, 9, 7, 26, 11, 11, 30, 22, 23, 26, 15, 33, 46, 23, 49, 45, 15, 33, 43, 32, 32, 37, 18, 35, 36, 19, 26, 20, 14, 24, 19, 12, 19, 20, 9, 20, 16, 4, 20, 29, 7, 18, 25, 7, 21, 16, 3, 28, 17, 6, 25, 36, 1, 21, 4, 4, 7, 8, 0, 6, 1, 100, 6]

var n = 3, // number of layers
    m = 59, // number of samples per layer
    k = 10; // number of bumps per layer

var stack = d3.stack().keys(d3.range(n)).offset(d3.stackOffsetWiggle),
    layers0 = stack(d3.transpose(d3.range(n).map(function(x) { return bumps(x, m, k); }))),
    layers1 = stack(d3.transpose(d3.range(n).map(function(x) { return bumps2(x, m, k); }))),
    layers = layers0.concat(layers1);

var selected = -1;

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var x = d3.scaleLinear()
    .domain([0, m - 1])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
    .range([height, 0]);

var z = d3.interpolateCool;

var area = d3.area()
    .x(function(d, i) { return x(i); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); });

color = ["#388E8E", "#79CDCD", "#D1EEEE"];

svg.selectAll("path")
  .data(layers0)
  .enter().append("path")
    .attr("d", area)
    .attr("fill", function(d, i) { return color[i]; })
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);

var dados0 = "pedestres", dados1 = "ciclistas"

svg.append("text");

var last = color[0]

var images = ["https://scontent-dft4-2.cdninstagram.com/t51.2885-15/s640x640/sh0.08/e35/15338486_1485083948172588_5717871724733661184_n.jpg", "http://s2.glbimg.com/ui3kJ5T3lugqlmGDGMIWCxt0lGU=/620x465/s.glbimg.com/jo/g1/f/original/2015/09/24/monumento150anos_campinagrande.jpg","http://s2.glbimg.com/Mx5DaVCFL33dkDBmHdJTOi-xlJY=/620x465/s.glbimg.com/jo/g1/f/original/2015/09/25/jacksondopandeiro_luizgonzaga_campinagrande.jpg"]



d3.selectAll("text").text("dados: " + dados0).attr("x", 50).attr("y", 75)
    function handleMouseOver(d, i) {  // Add interactivity
      selected = i;
      // Use D3 to select element, change color and size
      var nomes = ["bobs", "burrinhos", "jackson"]
      last = color[i];
      d3.select(this).attr("fill", "orange");
      d3.selectAll("text")
        .attr("x", 50)
        .attr("y", 75)
        .text("dados: " + dados0 + ", selecionado: " + nomes[i]);
    }
    function handleMouseOut(d, i) {  // Add interactivity
      // Use D3 to select element, change color and size
      selected = -1;
      d3.select(this).attr("fill", last)
    }
svg.on("click", function() {
  if(selected != -1) {
      window.location.assign(images[selected]);
  }
})

function stackMax(layer) {
  return d3.max(layer, function(d) { return d[1]; });
}

function stackMin(layer) {
  return d3.min(layer, function(d) { return d[0]; });
}

function transition() {
  var t;
  d3.selectAll("path")
    .data((t = layers1, layers1 = layers0, layers0 = t))
    .transition()
      .duration(2500)
      .attr("d", area);

    var t = dados1
    dados1 = dados0, dados0 = t
    d3.selectAll("text").text("dados: " + dados0)
}

// Inspired by Lee Byron’s test data generator.
function bumps(x, n, m) {
  var a = [], i;
  for (i = 0; i < n; ++i) a[i] = dat[i*3+x];
  //for (i = 0; i < m; ++i) bump(a, n);
  return a;
}

function bumps2(x, n, m) {
  var a = [], i;
  for (i = 0; i < n; ++i) a[i] = dat2[i*3+x];
  //for (i = 0; i < m; ++i) bump(a, n);
  return a;
}

function bump(a, n) {
  var x = 1 / (0.1 + Math.random()),
      y = 2 * Math.random() - 0.5,
      z = 10 / (0.1 + Math.random());
  for (var i = 0; i < n; i++) {
    var w = (i / n - y) * z;
    a[i] += x * Math.exp(-w * w);
  }
}

</script>
</div>
