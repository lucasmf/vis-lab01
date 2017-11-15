---
title: "Lab 01"
date: 2017-11-15T16:28:08-03:00
draft: false
description: "Análise de dados sobre o Açude de Boqueirão feita para a disciplina de visualização da informação."
---

Para a realização dessa atividades, dados a respeito do açude de boqueirão dos foram
fornecidos a partir do seguinte endereço:
https://api.insa.gov.br/reservatorios/12172/monitoramento

Para analizar os dados decidimos fazer uma visualização que mostrasse a variação do volume
do açude com o passar do tempo. Mas se observamos os dados fornecidos, temos a opção de
usar o campo ```Volume``` ou ```VolumePercentual```. Isso nos fez questionar:

* **Será que o volume do açude mudou com o passar do tempo?**

Para descobrir a resposta dessa pergunta pegamos todas as entradas e dividimos ```Volume``` pelo ```VolumePercentual``` para obter o ```VolumeTotal```. Fazendo um plot do ```VolumeTotal``` com ```DataInformacao``` obtemos a seguinte visualização:

<div id="volumetotal" width=300></div>

<br>
Como podemos perceber, o volume do açude teve uma mudança brusca por volta de 1994.
Isso provavelmente foi causado por uma medição não muito precisa do açude. Escolhemos
utilizar o valor percentual do volume, uma vez que esse provavelmente está correto
independente do volume total.

Com o ```VolumePercentual``` escolhido, voltamos ao nosso pensamento inicial:

* **Mostrar a variação do volume açude com o passar do tempo.**

Decidimos fazer uma visualização que conseguisse mostrar de maneira intuitiva o
volume de acordo com o mês e ano.

<div id="volumemesano" width=300></div>

<br>
Conseguimos concluir a partir dessa visualização que desde por volta de 2014 estamos
passando por uma seca severa. Também é possível ver que houve uma grande seca no período
de 1998 a 2003.

Mas uma coisa que nos chamou a atenção foi que não temos dados a respeito do açude em Fevereiro de 1994. Isso nos fez procurar saber mais a respeito da frequência das medições.

* **A frequência das medições realizadas no açude**

<div id="countano" width=300></div>

<br>
Constatamos que durante o período de 1990 a 1998 aproximadamente uma medição era realizada por
mês. A partir de 1999 houve um aumento nessa frequência, lembrando que 1999 foi um ano
de seca de acordo com a visualização acima, talvez exista uma relação de causa. Mas por algum motivo, a partir de 2014 essa frequência diminuiu bastante, voltanto a crescer apenas em 2017.

<script src="https://cdnjs.cloudflare.com/ajax/libs/vega/3.0.7/vega.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-lite/2.0.1/vega-lite.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vega-embed/3.0.0-rc7/vega-embed.js"></script>
<script>
    const spec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
      "data": {
            "url":"https://api.insa.gov.br/reservatorios/12172/monitoramento",
            "format": {
                "type": "json",
                "property": "volumes",
                "parse": {
                  "DataInformacao": "utc:'%d/%m/%Y'"
                }
            }
      },
      "transform": [
        {"calculate": "100*datum.Volume/datum.VolumePercentual", "as": "VolumeTotal"}
      ],

        "mark": "point",
        "width": 500,
        "height": 300,
        "encoding": {
            "x": {
                "field": "DataInformacao",
                "type": "temporal"
            },
            "y": {
                "field": "VolumeTotal",
                "type": "quantitative"
            }
        }
};
  	vegaEmbed('#volumetotal', spec).catch(console.warn);
</script>

<script>
    const spec2 = {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": {
        "url":"https://api.insa.gov.br/reservatorios/12172/monitoramento",
        "format": {
            "type": "json",
            "property": "volumes",
            "parse": {
              "DataInformacao": "utc:'%d/%m/%Y'"
            }
        }
  },

    "mark": "circle",
    "width": 450,
    "height": 600,
    "encoding": {
        "x": {
            "field": "DataInformacao",
            "timeUnit": "month",
            "type": "ordinal",
            "axis": {"title": "Mês"}
        },
        "y": {
            "field": "DataInformacao",
            "timeUnit": "year",
            "type": "ordinal",
            "axis": {"title": "Ano"}
        },
        "size": {
          "aggregate": "mean",
          "field": "VolumePercentual",
          "type": "quantitative"
        }
    }

};
  	vegaEmbed('#volumemesano', spec2).catch(console.warn);
</script>

<script>
    const spec3 =   {"$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": {
        "url":"https://api.insa.gov.br/reservatorios/12172/monitoramento",
        "format": {
            "type": "json",
            "property": "volumes",
            "parse": {
              "DataInformacao": "utc:'%d/%m/%Y'"
            }
        }
  },
    "mark": "bar",
  "encoding": {
    "x": {"field": "DataInformacao", "type": "ordinal", "timeUnit": "year"},
    "y": {"aggregate":"count"}
  }
};
  	vegaEmbed('#countano', spec3).catch(console.warn);
</script>