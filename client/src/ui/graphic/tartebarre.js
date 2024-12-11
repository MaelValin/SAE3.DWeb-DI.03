export const TarteBarre = {
    chart: null, // Instance du graphique
    option: null, // Options du graphique

    init: function() {
        const chartDom = document.getElementById('graphic-client');
        
        this.chart = echarts.init(chartDom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });

        const builderJson = {
            
            charts: {
                map: 3237,
                lines: 2164,
                bar: 7561,
                line: 7778,
                pie: 7355,
                scatter: 2405,
                candlestick: 1842,
                radar: 2090,
                heatmap: 1762,
                treemap: 1593,
                graph: 2060,
                boxplot: 1537,
                parallel: 1908,
                gauge: 2107,
                funnel: 1692,
                sankey: 1568
            },
            
            
        };
        const DataPie= {
            'echarts.min': 17365,
            'echarts.simple.min': 4079,
            'echarts.common.min': 6929,
            'echarts': 14890
        };
        
        
        const canvas = document.createElement('canvas');
        
        canvas.width = canvas.height = 10;
        
        this.option = {
            tooltip: {
            trigger: 'axis'
            },
            title: [
            {
                text: 'Les produits achetés par le client',
                left: '25%',
                textAlign: 'center',
                fontSize: 12,
            },
            {
                text: 'les categories de produits achetés par le client',
                left: '75%',
                top: '20%',
                textAlign: 'center',
                fontSize: 8,
                
            },
            ],
            grid: [
            {
                top: 50,
                width: '50%',
                bottom: '0%',
                left: 10,
                containLabel: true
            },
            {
                top: '50%',
                width: '50%',
                bottom: 0,
                left: 10,
                containLabel: true
            }
            ],
            xAxis: [
            {
                type: 'value',
                max: builderJson.all,
                splitLine: {
                show: false
                },
            }
            ],
            yAxis: [
            {
                type: 'category',
                data: Object.keys(builderJson.charts),
                axisLabel: {
                interval: 0,
                fontSize: 8,
                padding: [0, 0, 1, 0]
                },
                splitLine: {
                show: false
                }
            }
            ],
            series: [
            {
                type: 'bar',
                stack: 'chart',
                z: 3,
                
                label: {
                position: 'right',
                show: true,
                },
                data: Object.keys(builderJson.charts).map(function (key) {
                return builderJson.charts[key];
                })
            },
            {
                type: 'pie',
                radius: [0, '30%'],
                center: ['75%', '50%'],
                tooltip: {
                trigger: 'item',
                
                },
                data: Object.keys(DataPie).map(function (key) {
                return {
                    name: key,
                    value: DataPie[key]
                };
                })
            },
            ]
        };

        this.chart.setOption(this.option); // Appliquer l'option initiale

        window.addEventListener('resize', () => {
            this.chart.resize();
          });
    },

   updateData: function(newDataproduct, newDatacategory, all) {
    if (!this.option.series || !this.option.series[0]) {
        console.error("Erreur : 'series' n'est pas correctement définie dans l'option.");
        return;
    }

   

    // Traiter les données des produits
    const productData = newDataproduct.reduce((acc, item) => {
        const [name, value] = item.split(': ');
        acc[name] = parseInt(value, 10); // Convertir en nombre
        return acc;
    }, {});


    if(all==true){
        this.option.title[0].text='Les produits achetés par les clients';
        this.option.title[1].text='les categories de produits achetés';
    } else {
        this.option.title[0].text='Les produits achetés par le client';
        this.option.title[1].text='les categories de produits achetés';
    }
    

    this.option.series[0].data = Object.keys(productData).map(function (key) {
        return productData[key];
    });

    // S'assurer d'utiliser une valeur correcte pour le "total" attendu
    
    this.option.yAxis[0].data = Object.keys(productData);

    

    // Traiter les données des catégories
    const categoryData = newDatacategory.reduce((acc, item) => {
        const [name, value] = item.split(': ');
        acc[name.replace(/'/g, '')] = parseInt(value, 10); // Convertir en nombre
        return acc;
    }, {});

    this.option.series[1].data = Object.keys(categoryData).map(function (key) {
        return {
            name: key,
            value: categoryData[key]
        };
    });

    

    // Réappliquer l'option mise à jour
    this.chart.setOption(this.option);
},

};