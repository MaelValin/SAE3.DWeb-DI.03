export const Map = {
    chart: null, // Instance du graphique
    option: null, // Options du graphique
    map: null, // Instance de la carte Leaflet
    data: [], // Stocker les données actuelles
    geoCoordMap: {}, // Stocker les coordonnées actuelles

    init: function() {
        const chartDom = document.getElementById('graphic-map');

        // Vérifie si la carte Leaflet existe déjà. Si oui, la réinitialise.
        if (this.map) {
            this.map.remove(); // Supprimer la carte existante si elle existe déjà
        }

        // Initialisation de la carte Leaflet
        this.map = L.map(chartDom).setView([45.719702, 2.345482], 5);

        // Ajouter les tuiles d'OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        // Initialiser les données
        this.data = [
            { name: 'george', value: 9 },
            { name: 'mach', value: 12 },
            { name: 'org', value: 279 }
        ];

        this.geoCoordMap = {
            george: [1, 1],
            mach: [1.5, 1.5],
            org: [2, 2]
        };

        

        // Ajouter les cercles initiaux
        this._addCircles();

        // Initialiser le graphique ECharts
        this.chart = echarts.init(chartDom, null, {
            renderer: 'canvas',
            useDirtyRect: false
        });

        this.option = {
            tooltip: {
                trigger: 'item'
            },
            title: {
                show: false // Enlever le titre dans ECharts
            },
            series: [
                {
                    name: 'pm2.5',
                    type: 'scatter',
                    coordinateSystem: 'leaflet',
                    data: this.data.map(item => [...this.geoCoordMap[item.name], item.value]),
                    symbolSize: function (val) {
                        return Math.max(val[2] / 10, 20); // Taille minimale 20
                    },
                    encode: {
                        value: 2
                    },
                    label: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                }
            ]
        };

        this.chart.setOption(this.option); // Appliquer l'option initiale

        window.addEventListener('resize', () => {
            this.chart.resize();
        });
    },

    _addCircles: function() {
        // Supprimer les anciens cercles
        this.map.eachLayer((layer) => {
            if (layer instanceof L.CircleMarker) {
                this.map.removeLayer(layer);
            }
        });

        // Ajouter des cercles pour chaque point de données
        this.data.forEach(item => {
            const coords = this.geoCoordMap[item.name];
            if (coords) {
                const radius = Math.max(item.value / 10, 20); // Taille minimale 20
                const circle = L.circleMarker(coords, {
                    radius: radius,
                    color: 'red',
                    weight: 1,
                    opacity: 0.7,
                    fillOpacity: 0.5
                }).addTo(this.map);

                // Ajouter des événements pour afficher un popup
                circle.on('mouseover', function() {
                    circle.bindPopup(
                        `<b>${item.name}</b><br>Value: ${item.value}`,
                        { closeButton: false }
                    ).openPopup();
                });

                circle.on('mouseout', function() {
                    circle.closePopup();
                });
            }
        });
    },

    updateData: function(newData, newGeoCoordMap) {
        // Mettre à jour les données locales
        this.data = newData;
        
    
    // Mettre à jour les coordonnées locales
    this.geoCoordMap = newGeoCoordMap;
        // Mettre à jour les cercles sur la carte
        this._addCircles();
    
        // Mettre à jour le graphique ECharts
        const validData = this.data
            .map(item => {
                const coords = this.geoCoordMap[item.name];
                if (Array.isArray(coords) && coords.length === 2) {
                    return [...coords, item.value]; // Ajouter les coordonnées et la valeur
                } else {
                    console.warn(`Coordonnées manquantes ou invalides pour ${item.name}`);
                    return null; // Ignorer les données invalides
                }
            })
            .filter(item => item !== null); // Supprimer les données invalides
    
        this.option.series[0].data = validData;
        this.chart.setOption(this.option);
    }
    
};
