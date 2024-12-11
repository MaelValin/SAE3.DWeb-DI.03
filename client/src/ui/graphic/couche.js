export const Couche = {
  chart: null, // Instance du graphique
  option: null, // Options du graphique

  init: function() {
    const dom = document.getElementById('graphic-product');
    
    this.chart = echarts.init(dom, null, {
      renderer: 'canvas',
      useDirtyRect: false
    });

    const canvas = document.createElement('canvas');
        
    canvas.width = canvas.height = 10;
    // Options initiales du graphique
    this.option = {
          tooltip: {
            trigger: 'item',
            axisPointer: {
              type: 'cross',
              label: {
            backgroundColor: '#6a7985'
              }
            }
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] //modify
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [//modify
        {
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        }
        
      ]
    };

    if (this.option && typeof this.option === 'object') {
      this.chart.setOption(this.option);
    }

    window.addEventListener('resize', () => {
      this.chart.resize();
    });
  },

  updateData: function(newSeriesData, newXAxisData, all) {

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

    // Mettre à jour les données dans 'series'
    if (all==true) {

      this.option.tooltip.trigger= 'item';

      const groupedData = newSeriesData.reduce((acc, item) => {
        if (!acc[item.product_name]) {
          acc[item.product_name] = [];
        }
        acc[item.product_name].push(item.total_quantity_sold);
        return acc;
      }, {});

      this.option.series = Object.keys(groupedData).map((productName) => ({
        name: productName,
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: groupedData[productName]
      }));
    }else{
      this.option.tooltip.trigger= 'axis';
      if (newSeriesData){
        this.option.series[0].data = newSeriesData;
        
        }
    }

    // Mettre à jour les données de xAxis[0] si nécessaire
    if (newXAxisData) {
      this.option.xAxis[0].data = newXAxisData;
    }

    

    // Réappliquer l'option mise à jour
    this.chart.setOption(this.option, true);  // Le deuxième argument 'true' force une mise à jour complète de l'option

    // Forcer un rafraîchissement du graphique après la mise à jour des données
    this.chart.resize();
  },
};