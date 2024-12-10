export const BarreCourbe = {
    chart: null, // Instance du graphique
    option: null, // Options du graphique

    init: function() {
        const dom = document.getElementById('graphic-barrecourbe');
        this.chart = echarts.init(dom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });

        // Options initiales du graphique
        this.option = {
            title: {
                text: 'Revenus totaux par Categorie',
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
                    saveAsImage: { show: true }
                }
            },
            legend: {
                data: ['Evaporation', 'Precipitation', 'Temperature']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: 'Montant',
                    axisLabel: {
                        formatter: '{value} $'
                    }
                },
            ],
            series: [
                {
                    name: 'Montant',
                    type: 'bar',
                    tooltip: {
                        valueFormatter: function (value) {
                            return value + ' $';
                        }
                    },
                    data: [
                        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
                    ]
                },
            ]
        };

        if (this.option && typeof this.option === 'object') {
            this.chart.setOption(this.option);
        }

        window.addEventListener('resize', this.chart.resize);
    },

    updateData: function(newSeriesData, newXAxisData, newlegendData) {
        // Vérifiez que 'option' est bien initialisé
        if (!this.option) {
            console.error("Erreur : 'option' n'est pas encore initialisé.");
            return;
        }

        // Vérifiez que 'series' est correctement défini
        if (!this.option.series) {
            console.error("Erreur : 'series' n'est pas correctement définie dans l'option.");
            return;
        }

        // Mettre à jour les données dans 'series'
        this.option.series = newSeriesData.map((data, index) => ({
            name: newlegendData[index],
            type: 'bar',
            tooltip: {
                valueFormatter: function (value) {
                    return value + ' $';
                }
            },
            data: data
        }));

        // Mettre à jour les données de xAxis[0] si nécessaire
        if (newXAxisData) {
            this.option.xAxis[0].data = newXAxisData;
        }

        if (newlegendData) {
            this.option.legend.data = newlegendData;
        }

        // Réappliquer l'option mise à jour
        this.chart.setOption(this.option, true);  // Le deuxième argument 'true' force une mise à jour complète de l'option

        // Forcer un rafraîchissement du graphique après la mise à jour des données
        this.chart.resize();
    },
};