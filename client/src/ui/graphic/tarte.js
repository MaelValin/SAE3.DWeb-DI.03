export const Tarte = {
  chart: null, // Instance du graphique
  option: null, // Options du graphique

  init: function() {
    const chartDom = document.getElementById('main');
    //this.chart = echarts.init(chartDom, 'dark');
    this.chart = echarts.init(chartDom, null, {
      renderer: 'canvas',
      useDirtyRect: false
  });
    // Options initiales du graphique
    this.option = {
      title: {
        text: 'Livraison des commandes',
      },
      tooltip: { trigger: 'item' },
      legend: { top: '5%', left: 'center' },
      series: [
        {
          name: 'Statut des commandes',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: { show: false, position: 'center' },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: { show: false },
          data: [
            { value: 1048, name: 'Moteur de Recherche' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Publicités de Groupe' },
            { value: 300, name: 'Publicités Vidéo' },
          ],
        },
      ],
    };

    this.chart.setOption(this.option); // Appliquer l'option initiale

    window.addEventListener('resize', () => {
      this.chart.resize();
    });
  },

  

  updateData: function(newData) {
    if (!this.option.series || !this.option.series[0]) {
      console.error("Erreur : 'series' n'est pas correctement définie dans l'option.");
      return;
    }

    // Mettre à jour les données dans le premier élément de 'series'
    this.option.series[0].data = newData;

    // Réappliquer l'option mise à jour
    this.chart.setOption(this.option);
  },
};