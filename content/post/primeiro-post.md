---
title: "Visualizações Açude de Boqueirão"
date: 2017-11-16T13:26:56-03:00
draft: false
---

Primeira postagem do site 
 <!--more-->

<div id="vis" width=300></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/vega/3.0.7/vega.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-lite/2.0.1/vega-lite.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-embed/3.0.0-rc7/vega-embed.js"></script>
<script>
    const spec = {
    "title": "Volume do Açude de Boqueirão ao Longo dos Anos",
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": {
    "url": "https://api.insa.gov.br/reservatorios/12172/monitoramento",
    "format": {
      "type": "json",
      "property": "volumes",
      "parse" : {"DataInformacao": "utc:'%d/%m/%Y'"}
    }
  },
   "width": 600,
   "height": 230,
   "mark": {
    "type": "bar",
    "interpolate": "monotone"
  },
  "encoding": {
    "x": {
      "timeUnit": "month",
      "field": "DataInformacao",
      "type": "temporal",
      "axis": {
        "title": "Ano"
      }
    },
    "y": {
      "aggregate": "average",
      "field": "VolumePercentual",
      "type": "quantitative",
      "axis": {
        "title": "Volume (%)"
      }
    },
    "color": {"value": "red"}
  }
};
  	vegaEmbed('#vis', spec).catch(console.warn);
</script>

