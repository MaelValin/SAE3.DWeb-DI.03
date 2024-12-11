export const Barre = {
    chart: null, // Instance du graphique
    option: null, // Options du graphique

    init: function() {
        const chartDom = document.getElementById('graphic-barre');
        
        this.chart = echarts.init(chartDom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });

        // Options initiales du graphique
        this.option = {
            title: {
                text: 'Meilleures ventes des deux dernièrs mois',
              },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
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
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Ventes',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220]
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
            this.option.xAxis[0].data = newXAxisData;
        }
    
        // Réappliquer l'option mise à jour
        this.chart.setOption(this.option, true);  // Le deuxième argument 'true' force une mise à jour complète de l'option
    
        // Forcer un rafraîchissement du graphique après la mise à jour des données
        this.chart.resize();
    },
    
    
    
};

