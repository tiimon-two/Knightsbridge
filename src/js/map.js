export default async function initMap(markers) {
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker} = ymaps3;

    const map = new YMap(
        document.querySelector('.location__map'),
        {
            location: {
                center: [37.534652, 55.746409],
                zoom: 16,
                controls: []
            }
        }
    );

    map.addChild(new YMapDefaultSchemeLayer({type: 'ground'}));
    map.addChild(new YMapDefaultFeaturesLayer());

    function createMarkers() {
        const filters = {
            'health': 0,
            'shop': 0,
            'education': 0,
            'child': 0,
            'relax': 0
        }

        markers.forEach(marker => {
            const content = document.createElement('div');
            content.classList.add('location__marker');

            switch(marker.type) {
                case 'shop':
                    content.classList.add('location__marker--shop');
                    content.dataset.category = 'shop';
                    filters['shop']++;
                    break;
                case 'cafe':
                    content.classList.add('location__marker--cafe');
                    content.dataset.category = 'relax';
                    filters['relax']++;
                    break;
                case 'education':
                    content.classList.add('location__marker--education');
                    content.dataset.category = 'education';
                    filters['education']++;
                    break;
                case 'cinema':
                    content.classList.add('location__marker--cinema');
                    content.dataset.category = 'relax';
                    filters['relax']++;
                    break;
                case 'beauty':
                    content.classList.add('location__marker--beauty');
                    content.dataset.category = 'health';
                    filters['health']++;
                    break;
                case 'main':
                    content.classList.add('location__marker--main');
                    break;
                case 'health':
                    content.classList.add('location__marker--health');
                    content.dataset.category = 'health';
                    filters['health']++;
                    break;
                case 'child':
                    content.classList.add('location__marker--child');
                    content.dataset.category = 'child';
                    filters['child']++;
                    break;
                default:
                    console.log("Неизвестное значение маркера!");
            }

            const mapMarker = new YMapMarker(
              {
                coordinates: marker.coords,
                draggable: false
              },
              content
            );

            map.addChild(mapMarker);
        });

        const filterList = document.querySelector('.location__filters');

        for(let key in filters) {
            let category;
            switch(key) {
                case 'shop':
                    category = 'магазины';
                    break;
                case 'relax':
                    category = 'отдых, развлечения'
                    break;
                case 'education':
                    category = 'обучение';
                    break;
                case 'health':
                    category = 'красота и здоровье';
                    break;
                case 'child':
                    category = 'детсад';
                    break;
            }

                const filter = document.createElement('button');
                filter.classList.add('location__filter');
                filter.classList.add(`location__filter--${key}`);
                filter.innerHTML = category + ' ' + filters[key];
                filter.addEventListener('click', () => {
                    const markers = document.querySelectorAll(`[data-category="${key}"]`);
                    markers.forEach((marker) => {
                        marker.classList.toggle('location__marker--hidden');
                    });
                    filter.classList.toggle('location__filter--inactive');
                })
                filterList.appendChild(filter);
        }
    };

    createMarkers();
}