var alturaSVG = 400, larguraSVG = 900;
var	margin =
  {
   top: 10,
   right: 20,
   bottom:30,
   left: 45
  },
  larguraVis = larguraSVG - margin.left - margin.right,
  alturaVis = alturaSVG - margin.top - margin.bottom;


var picoPedestres = function(dados){
  var grafico = d3.select('#pico-pedestres') // cria elemento <svg> com um <g> dentro
    .append('svg')
    .attr('width', larguraVis + margin.left + margin.right)
    .attr('height', alturaVis + margin.top + margin.bottom)
    .append('g') // para entender o <g> vá em x03-detalhes-svg.html
    .attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')');

  var dadosHorario = d3.nest()
    .key(function(d) {return d.horario_inicial})
    .rollup(function(v){
        return (d3.sum(v, function(d){
          return d.total_pedestres;
        }))
      })
    .entries(dados);

  var larguraBarra = (larguraVis/dadosHorario.length) - 3;

  var horarios = dadosHorario.map(function(d){return d.key});
  var escalaX = d3.scaleBand()
    .domain(horarios)
    .range([0, larguraVis]);

  var maiorContagemPessoas = d3.max(dadosHorario, function(d){return d.value});
  var escalaY = d3.scaleLinear()
    .domain([0, maiorContagemPessoas])
    .range([alturaVis, 0]);

  var barras = grafico.selectAll("rect")
    .data(dadosHorario)
    .enter()
    .append("rect")
    .attr("width", larguraBarra) // LARGURA DAS BARRAS
    .attr("height", function(d) {return alturaVis - escalaY(d.value)}) // ALTURA DAS BARRAS, DEVE SER O VALOR DE PEDESTRES
    .attr("x", function(d, i){return (larguraBarra + 3) * i})
    .attr("y", function(d){return escalaY(d.value)});

  // AGORA VAMOS ADICIONAR OS EIXOS
  // PARA O EIXO X, PRECISAMOS FILTRAR ALGUNS DOS VALORES, SENÃO A VISUALIZAÇÃO FICA CHEIA DEMAIS
  var ticksX = escalaX.domain().filter(function(d,i){ return !(i%3); } );
  grafico.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + alturaVis + ")")
        .call(d3.axisBottom(escalaX).tickValues(ticksX)); // magica do d3: gera eixo a partir da escala

  grafico.append('g')
      .attr('transform', 'translate(0,0)')
      .call(d3.axisLeft(escalaY))
      .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Contagem");;  // gera eixo a partir da escala
}

var veiculosPreferidos = function(dados){
  var grafico = d3.select('#veiculos-preferidos') // cria elemento <svg> com um <g> dentro
    .append('svg')
    .attr('width', larguraVis + margin.left + margin.right)
    .attr('height', alturaVis + margin.top + margin.bottom)
    .append('g') // para entender o <g> vá em x03-detalhes-svg.html
    .attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')');

  var carros = d3.sum(dados, function(d){return d.carros});
  var motos = d3.sum(dados, function(d){return d.motos});
  var onibus = d3.sum(dados, function(d){return d.onibus});
  var caminhoes = d3.sum(dados, function(d){return d.caminhoes});
  var bicicletas = d3.sum(dados, function(d){return d.total_ciclistas});
  var pedestres = d3.sum(dados, function(d){return d.total_pedestres});

  var dadosVeiculos = [
    {"veiculo": "carros", "contagem": carros},
    {"veiculo": "motos", "contagem": motos},
    {"veiculo": "onibus", "contagem": onibus},
    {"veiculo": "caminhoes", "contagem": caminhoes},
    {"veiculo": "bicicletas", "contagem": bicicletas},
    {"veiculo": "pedestres", "contagem": pedestres}
  ]

  var larguraBarra = larguraVis/dadosVeiculos.length - 3;

  var veiculos = ["Carros", "Motos", "Ônibus", "Caminhões", "Bicicletas", "Pedestres"];
  var escalaX = d3.scaleBand()
    .domain(veiculos)
    .range([0, larguraVis]);

  var maiorContagemVeiculos = d3.max(dadosVeiculos, function(d){return d.contagem});
  var escalaY = d3.scaleLinear()
    .domain([0, maiorContagemVeiculos])
    .range([alturaVis, 0]);

  var barras = grafico.selectAll("rect")
    .data(dadosVeiculos)
    .enter()
    .append("rect")
    .attr("width", larguraBarra)
    .attr("height", function(d) {return alturaVis - escalaY(d.contagem)})
    .attr("x", function(d, i){ return (larguraBarra + 3) * i})
    .attr("y", function(d){return escalaY(d.contagem)})

  grafico.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + alturaVis + ")")
        .call(d3.axisBottom(escalaX)); // magica do d3: gera eixo a partir da escala

  grafico.append('g')
      .attr('transform', 'translate(0,0)')
      .call(d3.axisLeft(escalaY))
      .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Contagem");;  // gera eixo a partir da escala
}

var veiculosPreferidosDia = function(dados){
  var grafico = d3.select('#veiculos-preferidos-dia') // cria elemento <svg> com um <g> dentro
    .append('svg')
    .attr('width', larguraVis + margin.left + margin.right)
    .attr('height', alturaVis + margin.top + margin.bottom)
    .append('g') // para entender o <g> vá em x03-detalhes-svg.html
    .attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')');

  var dadosHorario = d3.nest()
    .key(function(d) {return d.horario_inicial})
    .rollup(function(v){
        return{
              "carros": d3.sum(v, function(d){
                return d.carros;
              }),
              "motos": d3.sum(v, function(d){
                return d.motos;
              }),
              "onibus": d3.sum(v, function(d){
                return d.onibus;
              }),
              "caminhoes": d3.sum(v, function(d){
                return d.caminhoes;
              }),
              "bicicletas": d3.sum(v, function(d){
                return d.bicicletas;
              }),
              "pedestres": d3.sum(v, function(d){
                return d.pedestres;
              })
            }
      })
    .entries(dados);

  var larguraBarra = (larguraVis/dadosHorario.length) - 3;

  var horarios = dadosHorario.map(function(d){return d.key});
  var escalaX = d3.scaleBand()
    .domain(horarios)
    .range([0, larguraVis]);

  var maiorContagemCarros = d3.max(dadosHorario, function(d){return d.value.carros});
  var maiorContagemMotos = d3.max(dadosHorario, function(d){return d.value.motos});
  var maiorContagemOnibus = d3.max(dadosHorario, function(d){return d.value.onibus});
  var maiorContagemCaminhoes = d3.max(dadosHorario, function(d){return d.value.caminhoes});
  var maiorContagemBicicletas = d3.max(dadosHorario, function(d){return d.value.bicicletas});
  var maiorContagemPedestres = d3.max(dadosHorario, function(d){return d.value.pedestres});

  var maiorContagem = d3.max([maiorContagemCarros, maiorContagemMotos, maiorContagemOnibus,
                      maiorContagemCaminhoes, maiorContagemBicicletas, maiorContagemPedestres]);

  var escalaY = d3.scaleLinear()
    .domain([0, maiorContagem])
    .range([alturaVis, 0]);
  console.log(dadosHorario);

  var linhaCarros = d3.line()
    .x(function(d) { return escalaX(d.key); })
    .y(function(d) { return escalaY(d.value.carros); });
  var linhaMotos = d3.line()
    .x(function(d) { return escalaX(d.key); })
    .y(function(d) { return escalaY(d.value.motos); });
  var linhaOnibus = d3.line()
    .x(function(d) { return escalaX(d.key); })
    .y(function(d) { return escalaY(d.value.onibus); });
  var linhaCaminhoes = d3.line()
    .x(function(d) { return escalaX(d.key); })
    .y(function(d) { return escalaY(d.value.caminhoes); });
  var linhaBicicletas = d3.line()
    .x(function(d) { return escalaX(d.key); })
    .y(function(d) { return escalaY(d.value.bicicletas); });
  var linhaPedestres = d3.line()
    .x(function(d) { return escalaX(d.key); })
    .y(function(d) { return escalaY(d.value.pedestres); });

  var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  var adicionaCarros = function(){
    grafico.append("path")
        .datum(dadosHorario)
        .attr("fill", "none")
        .attr("id", "Carros")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 3)
        .attr("d", linhaCarros)
        .on("mouseover", function(d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div	.html("<strong>Valor Médio durante o dia</strong>" +
                              "<br/>" + d3.mean(d, function(dados) { return dados.value.carros}))
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                    })
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
  }
  var adicionaMotos = function(){
    grafico.append("path")
      .datum(dadosHorario)
      .attr("fill", "none")
      .attr("id", "Motos")
      .attr("stroke", "#e74c3c")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 3)
      .attr("d", linhaMotos)
      .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", .9);
                  div	.html("<strong>Valor Médio durante o dia</strong>" +
                            "<br/>" + d3.mean(d, function(dados) { return dados.value.motos}))
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  })
              .on("mouseout", function(d) {
                  div.transition()
                      .duration(500)
                      .style("opacity", 0);
              });
  }
  var adicionaOnibus = function(){
    grafico.append("path")
      .datum(dadosHorario)
      .attr("fill", "none")
      .attr("id", "Ônibus")
      .attr("stroke", "#2ecc71")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 3)
      .attr("d", linhaOnibus)
      .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", .9);
                  div	.html("<strong>Valor Médio durante o dia</strong>" +
                            "<br/>" + d3.mean(d, function(dados) { return dados.value.onibus}))
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  })
              .on("mouseout", function(d) {
                  div.transition()
                      .duration(500)
                      .style("opacity", 0);
              });
  }
  var adicionaCaminhoes = function(){
    grafico.append("path")
      .datum(dadosHorario)
      .attr("fill", "none")
      .attr("id", "Caminhões")
      .attr("stroke", "#9b59b6")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 3)
      .attr("d", linhaCaminhoes)
      .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", .9);
                  div	.html("<strong>Valor Médio durante o dia</strong>" +
                            "<br/>" + d3.mean(d, function(dados) { return dados.value.caminhoes}))
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  })
              .on("mouseout", function(d) {
                  div.transition()
                      .duration(500)
                      .style("opacity", 0);
              });
  }
  var adicionaBicicletas = function(){
    grafico.append("path")
      .datum(dadosHorario)
      .attr("fill", "none")
      .attr("id", "Bicicletas")
      .attr("stroke", "#e67e22")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 3)
      .attr("d", linhaBicicletas)
      .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", .9);
                  div	.html("<strong>Valor Médio durante o dia</strong>" +
                            "<br/>" + d3.mean(d, function(dados) { return dados.value.bicicletas}))
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  })
              .on("mouseout", function(d) {
                  div.transition()
                      .duration(500)
                      .style("opacity", 0);
              });
  }
  var adicionaPedestres = function(){
    grafico.append("path")
      .datum(dadosHorario)
      .attr("fill", "none")
      .attr("id", "Pedestres")
      .attr("stroke", "#2c3e50")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 3)
      .attr("d", linhaPedestres)
      .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", .9);
                  div	.html("<strong>Valor Médio durante o dia</strong>" +
                            "<br/>" + d3.mean(d, function(dados) { return dados.value.pedestres}))
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  })
              .on("mouseout", function(d) {
                  div.transition()
                      .duration(500)
                      .style("opacity", 0);
              });
  }

  var adicionaElementos = [{"elemento": "Carros",
                          "funcao": adicionaCarros},
                          {"elemento": "Motos",
                          "funcao": adicionaMotos},
                          {"elemento": "Ônibus",
                          "funcao": adicionaOnibus},
                          {"elemento": "Caminhões",
                          "funcao": adicionaCaminhoes},
                          {"elemento": "Bicicletas",
                          "funcao": adicionaBicicletas},
                          {"elemento": "Pedestres",
                          "funcao": adicionaPedestres}];

  var adicionaTodosElementos = function(){
    for(var i = 0; i < adicionaElementos.length; i++){
      adicionaElementos[i].funcao();
    }
  }
  adicionaTodosElementos();

  var cores = d3.scaleOrdinal()
    .range(["steelblue", "#e74c3c", "#2ecc71", "#9b59b6", "#e67e22", "#2c3e50"]);

  var ticksX = escalaX.domain().filter(function(d,i){ return !(i%3); } );
  grafico.append("g")
      .attr("transform", "translate(0," + alturaVis + ")")
      .call(d3.axisBottom(escalaX).tickValues(ticksX))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "translate(" +(larguraVis-margin.right) + ",0)")
    .text("Horário")
    .select(".domain");

  var legendaY = grafico.append("g")
      .call(d3.axisLeft(escalaY))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Contagem");

  var veiculos = ["Carros", "Motos", "Ônibus", "Caminhões", "Bicicletas", "Pedestres"];
  var legenda = grafico.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
    .selectAll("g")
    .data(veiculos)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  const dataKeys = veiculos.slice();
  dataKeys.push("Reiniciar");

  d3.select("#veiculos-preferidos-dia")
    .append("div")
      .attr("id", "controls")

  var botaoClicado = function(dimensao){
    if(dimensao === "Carros"){
      var maiorContagem = maiorContagemCarros;
    }else if (dimensao === "Motos") {
      var maiorContagem = maiorContagemMotos;
    }else if (dimensao === "Ônibus") {
      var maiorContagem = maiorContagemOnibus;
    }else if (dimensao === "Caminhões") {
      var maiorContagem = maiorContagemCaminhoes;
    }else if (dimensao === "Bicicletas") {
      var maiorContagem = maiorContagemBicicletas;
    }else if (dimensao === "Pedestres") {
      var maiorContagem = maiorContagemPedestres;
    }

    if (dimensao === "Reiniciar") {
      for(var i = 0; i < veiculos.length; i++){
        d3.select("#" + veiculos[i]).remove();
      }
      adicionaTodosElementos();
    }else{
      for(var i = 0; i < veiculos.length; i++){
        if(veiculos[i] !== dimensao){
          d3.select("#" + veiculos[i]).remove();
        }
      }
    }

  }

  d3.select("#controls").selectAll("button.teams")
    .data(dataKeys)
    .enter()
      .append("button")
      .attr("class", "btn-default")
      .on("click", botaoClicado)
      .html(d => d);


  legenda.append("rect")
      .attr("x", larguraVis)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", cores)
      .on("mouseover", function(d){
        d3.select("#" + d).
          attr("stroke-width", 10);
      })
      .on("mouseout", function(d){
        d3.select("#" + d).
          attr("stroke-width", 3);
      });

  legenda.append("text")
      .attr("x", larguraVis - 5)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });

}

var veiculosPreferidosSexo = function(dados){
  var grafico = d3.select('#veiculos-preferidos-sexo') // cria elemento <svg> com um <g> dentro
    .append('svg')
    .attr('width', larguraVis + margin.left + margin.right)
    .attr('height', alturaVis + margin.top + margin.bottom)
    .append('g') // para entender o <g> vá em x03-detalhes-svg.html
    .attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')');

    var mulheresCiclistas = d3.sum(dados, function(d){return d.mulheres_ciclistas});
    var homensCiclistas = d3.sum(dados, function(d){return d.homens_ciclistas});
    var mulheresPedestres = d3.sum(dados, function(d){return d.mulheres_pedestres});
    var homensPedestres = d3.sum(dados, function(d){return d.homens_pedestres});

    var dadosVeiculos = [
      {"veiculo": "Bicicletas", "mulheres": mulheresCiclistas, "homens": homensCiclistas},
      {"veiculo": "Pedestres", "mulheres": mulheresPedestres, "homens": homensPedestres}
    ]

    var dadosVeiculosGenero = [
      {"veiculo": "Bicicletas", "sexo": "Mulher", "contagem": mulheresCiclistas},
      {"veiculo": "Bicicletas", "sexo": "Homem", "contagem": homensCiclistas},
      {"veiculo": "Pedestres", "sexo": "Mulher", "contagem": mulheresPedestres},
      {"veiculo": "Pedestres", "sexo": "Homem", "contagem": homensPedestres}
    ]

    var larguraBarra = larguraVis/dadosVeiculos.length - 3;

    var veiculos = ["Bicicletas", "Pedestres"];
    var x0 = d3.scaleBand()
      .domain(veiculos)
      .rangeRound([0, larguraVis])
      .paddingInner(0.1);

    var sexos = ["Mulher", "Homem"];
    var x1 = d3.scaleBand()
      .domain(sexos)
      .rangeRound([0, x0.bandwidth()])
      .padding(0.05);

    var maiorContagemMulheres = d3.max(dadosVeiculos, function(d){return d.mulheres});
    var maiorContagemHomens = d3.max(dadosVeiculos, function(d){return d.homens});

    if(maiorContagemMulheres > maiorContagemHomens){
      var maiorContagemVeiculos = maiorContagemMulheres;
    }else{
      var maiorContagemVeiculos = maiorContagemHomens;
    }
    var y = d3.scaleLinear()
      .domain([0, maiorContagemVeiculos])
      .rangeRound([alturaVis, 0]);

    var cores = d3.scaleOrdinal()
      .range(["#e74c3c", "#3498db"]);

    var grupos = grafico.selectAll("g")
      .data(dadosVeiculos)
      .enter()
      .append("g")
        .attr("transform", function(d) { return "translate(" + x0(d.veiculo) + ",0)"; });

    grupos.selectAll("rect")
      .data(function(d) {
        return dadosVeiculosGenero.filter(function(registro){ return registro.veiculo === d.veiculo})
                                  .map(function(registro){
                                    return {"chave": registro.sexo, "valor": registro.contagem} })
        })
      .enter()
      .append("rect")
        .attr("x", function(d){return x1(d.chave)})
        .attr("y", function(d){return y(d.valor)})
        .attr("width", x1.bandwidth())
        .attr("height", function(d){return alturaVis - y(d.valor)})
        .attr("fill", function(d){return cores(d.chave)});

    grafico.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + alturaVis + ")")
      .call(d3.axisBottom(x0));

    grafico.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y))
      .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Contagem");;


    var legenda = grafico.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
      .selectAll("g")
      .data(sexos)
      .enter().append("g")
        .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legenda.append("rect")
        .attr("x", larguraVis)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", cores);

    legenda.append("text")
        .attr("x", larguraVis - 5)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });

}
