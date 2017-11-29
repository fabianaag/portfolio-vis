<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8">
    <title>Barras simples</title>
    <script src="https://d3js.org/d3.v4.min.js"></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  </head>
  <body>
    <div class="container">
      <div class="row">
        <h2>Lab 2 - Parte 2</h2>
      </div>
      <div class="row">
      </div>
      <div class="row">
        <h3>A visualização em si:</h3>
        <br>
        <div class="row mychart" id="chart">
      </div>
      </div>
    </div>

    <style>
      .mychart rect {
        fill: steelblue;
      }

      .mychart rect:hover {
        fill: goldenrod;
      }

      .mychart text {
        font: 12px sans-serif;
        text-anchor: left;
        color: black;
      }
    </style>

    <script type="text/javascript">
      "use strict"

      var dadosBoqueirao = [{
        "mes": 1,
        "dez_percentil": 19.34,
        "mediana": 67.9,
        "noventa_percentil": 89.86
      }, {
        "mes": 2,
        "dez_percentil": 20.32,
        "mediana": 65.2,
        "noventa_percentil": 89.14
      }, {
        "mes": 3,
        "dez_percentil": 20.95,
        "mediana": 78.7,
        "noventa_percentil": 100
      }, {
        "mes": 4,
        "dez_percentil": 27.14,
        "mediana": 87.1,
        "noventa_percentil": 100
      }, {
        "mes": 5,
        "dez_percentil": 27.16,
        "mediana": 85.1,
        "noventa_percentil": 102.04
      }, {
        "mes": 6,
        "dez_percentil": 26,
        "mediana": 83.5,
        "noventa_percentil": 100.88
      }, {
        "mes": 7,
        "dez_percentil": 24.88,
        "mediana": 81.7,
        "noventa_percentil": 100.32
      }, {
        "mes": 8,
        "dez_percentil": 23.68,
        "mediana": 79.9,
        "noventa_percentil": 99.24
      }, {
        "mes": 9,
        "dez_percentil": 22.36,
        "mediana": 77.8,
        "noventa_percentil": 96.82
      }, {
        "mes": 10,
        "dez_percentil": 20.92,
        "mediana": 74,
        "noventa_percentil": 94.12
      }, {
        "mes": 11,
        "dez_percentil": 19.62,
        "mediana": 70.4,
        "noventa_percentil": 91.34
      }, {
        "mes": 12,
        "dez_percentil": 19.06,
        "mediana": 67.3,
        "noventa_percentil": 89.42
      }];
      // definicoes de altura e largura do svg e da vis dentro
      var alturaSVG = 400, larguraSVG = 900;
      var	margin = {top: 10, right: 20, bottom:30, left: 45}, // para descolar a vis das bordas do grafico
          larguraVis = larguraSVG - margin.left - margin.right,
          alturaVis = alturaSVG - margin.top - margin.bottom;

      /*
       * Prepara onde adicionaremos a visualizacao
       */
      var grafico = d3.select('#chart') // cria elemento <svg> com um <g> dentro
        .append('svg')
          .attr('width', larguraVis + margin.left + margin.right)
          .attr('height', alturaVis + margin.top + margin.bottom)
        .append('g') // para entender o <g> vá em x03-detalhes-svg.html
          .attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')');

      // === EDITE DAQUI ===
      /*
       * As escalas
       */
      var x = d3.scaleLinear()
                .domain(d3.extent(dadosBoqueirao, (d, i) => d.noventa_percentil))
                .range([0, larguraVis]); // Configure essa escala com domain, range e padding

      var y = d3.scaleLinear()
                .domain(d3.extent(dadosBoqueirao, (d, i) => d.dez_percentil))
                .range([alturaVis, 0]);      // Configure essa escala com domain e range
                               // Lembre que uma escala pode converter de 1..10 -> 100..1

      var color = function(mes){
        if(mes >= 1 && mes <= 6){
          return "blue";
        }else{
          return "red";
        }
      }

      // === ATÉ DAQUI ===
      /*
       * As marcas
       */
      grafico.selectAll('.dot')
              .data(dadosBoqueirao)
              .enter()
                .append('circle')
                  .attr('class', 'dot')
                  .attr('r', 3.5)
                  .attr('cx', d => x(d.noventa_percentil))
                  .attr('cy', d => y(d.dez_percentil))
                  .attr('fill', d => color(d.mes));


      var color = [
         {'legenda':'Mês chuvoso',
          'cor': 'blue'},
         {'legenda':'Mês seco',
          'cor': 'red'}];
      // draw legend
      var legend = grafico.selectAll(".legend")
          .data(color)
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      // draw legend colored rectangles
      legend.append("rect")
          .attr("x", larguraVis - 18)
          .attr("y", alturaVis - 50)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", (d) => d.cor);

      // draw legend text
      legend.append("text")
          .attr("x", larguraVis - 24)
          .attr("y", alturaVis - 50)
          .attr("dy", ".90em")
          .style("text-anchor", "end")
          .text(function(d) { return d.legenda;})
      /*
       * Os eixos
       */
      grafico.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + alturaVis + ")")
              .call(d3.axisBottom(x)); // magica do d3: gera eixo a partir da escala

      grafico.append('g')
              .attr('transform', 'translate(0,0)')
              .call(d3.axisLeft(y))  // gera eixo a partir da escala

      grafico.append("text")
        .attr("transform", "translate(-30," + (alturaVis + margin.top)/2 + ") rotate(-90)")
        .text("10 percentil");

      grafico.append("text")
        .attr("transform", "translate(" + (larguraVis / 2) + "," + (alturaVis + 30) + ")")
        .text("90 percentil");

    </script>
  </body>
</html>

