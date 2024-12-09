export const Couches = {
    chart: null, // Instance du graphique
    option: null, // Options du graphique

    init: function() {
        const dom = document.getElementById('graphic-couches');
        this.chart = echarts.init(dom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });

        // Options initiales du graphique
        this.option = {
            title: {
                text: 'Stacked Area Chart'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
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
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'Email',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Union Ads',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: 'Video Ads',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: 'Direct',
                    type: 'line',
                    stack: 'Total',
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: 'Search Engine',
                    type: 'line',
                    stack: 'Total',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    areaStyle: {},
                    emphasis: {
                        focus: 'series'
                    },
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
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

        // Mettre à jour les données dans le premier élément de 'series'
        this.option.series = newSeriesData;

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