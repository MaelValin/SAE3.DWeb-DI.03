export const Demicercle = {
    chart: null, // Instance du graphique
    option: null, // Options du graphique

    init: function() {
        const chartDom = document.getElementById('graphic-demicercle');
        this.chart = echarts.init(chartDom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });

        // Options initiales du graphique
        this.option = {
            
            title: {
                text: 'Produits en baisse de stock',
              },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: 'Stock Faible',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    center: ['50%', '70%'],
                    // adjust the start and end angle
                    startAngle: 180,
                    endAngle: 360,
                    data: [
                        { value: 0, name: 'Search Engine' },
                        { value: 1, name: 'Direct' },
                        { value: 1, name: 'Email' },
                        { value: 1, name: 'Union Ads' },
                        { value: 2, name: 'Video ' },
                        { value: 4, name: ' Ads' },
                        { value: 6, name: 'VideoAds' },
                        { value: 8, name: 'Video ds' },
                        { value: 10, name: 'Video As' },
                        { value: 11, name: 'Vide Ads' }
                    ]
                }
            ]
        };

        if (this.option && typeof this.option === 'object') {
            this.chart.setOption(this.option);
        }

        window.addEventListener('resize', this.chart.resize);
    },

    updateData: function(newSeriesData) {
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

        // Réappliquer l'option mise à jour
        this.chart.setOption(this.option, true);  // Le deuxième argument 'true' force une mise à jour complète de l'option

        // Forcer un rafraîchissement du graphique après la mise à jour des données
        this.chart.resize();
    },
};