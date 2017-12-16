---
title: "Panorama dos transeuntes do Açude Velho"
date: 2017-12-11T19:08:44-03:00
draft: false
---

Um grupo de pesquisadores do [LabRua](https://www.facebook.com/LabRua/) coletou
dados acerca dos transeuntes do Açude Velho (CG-PB), eles contaram a quantidade
de pedestres, de carros, e várias outras coisas interessantes. Faremos uso destes
dados, para descobrir um pouco mais sobre as pessoas que por ali passam, e seus
hábitos.

<!--more-->

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<div class="container">
  <!-- PRIMEIRA ATIVIDADE -->
  <div class="row">
    <h2>Qual o horário de pico para pedestres que caminham no açude?</h2>
    <br>
    <p>Com a visualização a seguir, procuramos identificar os horários em que
    mais foram observados pedestres nos arredores do açude.</p>
    <br>
    <div class="row mychart" id="pico-pedestres"></div>
    <br>
    <p>Pelo gráfico, podemos observar que os horários de pico, estão concentrados
    no final da tarde, mais especificamente entre as 17 horas e as 19 horas.</p>
  </div>
  <!-- SEGUNDA ATIVIDADE -->
  <div class="row">
    <h2>Quais os meios de transporte favoritos dos transeuntes?</h2>
    <br>
    <p>Agora, buscamos entender mais sobre as preferências das pessoas sobre meios
    de transporte, quais foram as formas de locomoção mais observadas no açude?</p>
    <br>
    <div class="row mychart" id="veiculos-preferidos"></div>
    <br>
    <p>De acordo com o gráfico, carros são muito mais frequentes do que os outros
    meios de transporte, é importante dizer entretanto, que isto não é um bom indicativo
    de que a população em geral prefere carros, este resultado provavelmente acontece
    pela localização do açude e pelas condições das vias que o circundam.</p>
  </div>

  <div class="row">
    <h2>Qual a distribuição dos números de cada meio de transporte, ao longo do dia?</h2>
    <h4 style="color: #bdc3c7"><em>Visualização Interativa</em></h4>
    <h6><em>Esta é uma visualização interativa, experimente passar o mouse sobre
    as linhas, as legendas e clicar nos botões</em></h6>
    <br>
    <p>O alto número de carros que vimos, leva em consideração o valor agregado
    da contagem durante todo o dia, será que temos mais carros durante todo este
    período? E quanto aos outros meios de transporte?</p>
    <br>
    <div class="row mychart" id="veiculos-preferidos-dia"></div>
    <div id="controls" class="col"/>
    <br>
    <p>Aqui podemos ter certeza, a preferência por carros deste público em
    específico é gritante! durante todo o dia foram contados mais carros do que
    motos, o segundo colocado.</p>
    <p>Além disso, vemos também que comparado aos dois primeiros colocados, temos
    um número muito pequeno de ocorrências de outros transportes, entretanto,
    devemos nos atentar para casos como o de ônibus, onde um só veículo carrega
    muitos passageiros, por isso o baixo valor da contagem.</p>
  </div>

  <div class="row">
    <h2>Como estão divididas as preferências de transportes entre homens e mulheres?</h2>
    <br>
    <p>Vamos nos aprofundar um pouco mais na última pergunta. Para pedestres e
    ciclistas, é possível distinguir as pessoas pelo sexo. Quando o levamos em
    consideração, as preferências mudam?</p>
    <br>
    <div class="row mychart" id="veiculos-preferidos-sexo"></div>
    <br>
    <p>Após este gráfico, podemos ver que os homens são maioria, tanto entre os
    ciclistas, quanto entre os pedestres.
    Além disto, um detalhe interessante, é o valor muito baixo de mulheres ciclistas.</p>
  </div>
</div>

<style>
  #pico-pedestres rect {
    fill: steelblue;
  }

  #pico-pedestres rect:hover {
    fill: goldenrod;
  }

  #pico-pedestres text {
    font: 12px sans-serif;
    text-anchor: left;
    color: black;
  }

  #veiculos-preferidos rect {
    fill: firebrick;
  }

  #veiculos-preferidos rect:hover {
    fill: goldenrod;
  }

  #veiculos-preferidos-sexo rect:hover{
    fill: goldenrod;
  }

  div.tooltip {
    position: absolute;			
    text-align: center;			

    padding: 2px;				
    font: 12px sans-serif;		
    background: lightsteelblue;
    border: 0px;		
    border-radius: 8px;			
    pointer-events: none;			
}
</style>

<script src="https://d3js.org/d3.v4.min.js"></script>
<!-- PARA DEIXAR O CÓDIGO MAIS BONITO, EU INCLUÍ UM ARQUIVO CHAMADO VISUALIZACOES.JS
    NESTE ARQUIVO, FAZEMOS TODAS AS FUNÇÕES QUE GERAM OS GRÁFICOS, ELE SE ENCONTRA
    NA PASTA STATIC/JS-->
<script type="text/javascript" src="/js/visualizacoes.js"></script>
<script type="text/javascript">

  <!-- AQUI CAPTURAMOS OS DADOS QUE ESTÃO NO ARQUIVO STATIC/DATA/DADOS.CSV E CHAMAMOS AS FUNÇÕES PARA GERAR OS GRÁFICOS -->
  d3.csv("/portfolio-vis/data/dados.csv", function(dados){
    picoPedestres(dados); <!-- LEMBRANDO, TODAS ESTAS FUNÇÕES ESTÃO NO ARQUIVO VISUALIZACOES.JS -->
    veiculosPreferidos(dados);
    veiculosPreferidosDia(dados);
    veiculosPreferidosSexo(dados);
  });

</script>
