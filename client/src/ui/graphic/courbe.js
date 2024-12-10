export const Courbe = {
  chart: null, // Instance du graphique
  option: null, // Options du graphique

  init: function() {
    const dom = document.getElementById('graphic-courbe');
    this.chart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });

    // Options initiales du graphique
    this.option = { 
      title: {
        text: 'Revenus totaux des six derniers mois',
      },     
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },          
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }
      ]
    };

    if (this.option && typeof this.option === 'object') {
      this.chart.setOption(this.option);
    }

    window.addEventListener('resize', this.chart.resize);
  },

  updateData: function(newSeriesData, newXAxisData) {
    // Vérifiez que 'option' est bien initialisé
    if (!this.option) {
        console.error("Erreur : 'option' n'est pas encore initialisé.");
        return;
    }

    // Vérifiez que 'series' est correctement défini
    if (!this.option.series || !this.option.series[0]) {
        console.error("Erreur : 'series' n'est pas correctement définie dans l'option.");
        return;
    }

    // Mettre à jour les données dans le premier élément de 'series'
    this.option.series[0].data = newSeriesData;

    // Mettre à jour les données de xAxis[0] si nécessaire
    if (newXAxisData) {
        this.option.xAxis.data = newXAxisData;
    }

    // Réappliquer l'option mise à jour
    this.chart.setOption(this.option, true);  // Le deuxième argument 'true' force une mise à jour complète de l'option

    // Forcer un rafraîchissement du graphique après la mise à jour des données
    this.chart.resize();
  },
};
