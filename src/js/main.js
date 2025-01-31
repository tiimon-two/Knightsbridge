import '../styles/style.scss';
const markers = [
    {
        type: 'cafe',
        coords: [37.541679, 55.744298]
    },
    {
        type: 'shop',
        coords: [37.545240, 55.744911]
    },
    {
        type: 'education',
        coords: [37.548588, 55.745695]
    },
    {
        type: 'cinema',
        coords: [37.530060, 55.747052]
    },
    {
        type: 'beauty',
        coords: [37.530887, 55.746078]
    },
    {
        type: 'shop',
        coords: [37.527230, 55.747970]
    },
    {
        type: 'main',
        coords: [37.535652, 55.746909]
    },
    {
        type: 'health',
        coords: [37.539081, 55.743649]
    },
    {
        type: 'child',
        coords: [37.538698, 55.747278]
    },
    {
        type: 'shop',
        coords: [37.534299, 55.748835]
    },
    {
        type: 'child',
        coords: [37.540147, 55.749105]
    },
    {
        type: 'cafe',
        coords: [37.528775, 55.748721]
    },
    {
        type: 'child',
        coords: [37.543473, 55.749287]
    },
    {
        type: 'health',
        coords: [37.537415, 55.747909]
    },
    {
        type: 'cafe',
        coords: [37.541771, 55.747343]
    },
    {
        type: 'shop',
        coords: [37.536333, 55.749831]
    },
    {
        type: 'education',
        coords: [37.526258, 55.747123]
    }
]

initMap();

async function initMap() {
    // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
    await ymaps3.ready;

    const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker} = ymaps3;

    // Иницилиазируем карту
    const map = new YMap(
        // Передаём ссылку на HTMLElement контейнера
        document.querySelector('.location__map'),

        // Передаём параметры инициализации карты
        {
            location: {
                // Координаты центра карты
                center: [37.532701, 55.747147],

                // Уровень масштабирования
                zoom: 15,
                controls: []
            }
        }
    );

    // Добавляем слой для отображения схематической карты
    map.addChild(new YMapDefaultSchemeLayer({type: 'ground'}));
    map.addChild(new YMapDefaultFeaturesLayer());

    function createMarkers(markers) {
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
                draggable: true
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
                    const disabledFilters = document.querySelectorAll(`[data-category="${key}"]`);
                    disabledFilters.forEach((filter) => {
                        filter.classList.toggle('location__marker--hidden');
                    });
                    filter.classList.toggle('location__filter--inactive');
                })
                filterList.appendChild(filter);
        }
    }
    createMarkers(markers, map);
}

$('.features__slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1
  });