(function () {
    'use strict';

    const API = {

        etiquetaUbicacion: function (product) {
            if (!product || typeof product !== 'object') return '';

            if (product.ubicacion && String(product.ubicacion).trim() !== '') {
                return ' - Ubicacion: ' + String(product.ubicacion).trim();
            }

            const zona = product.ubicacion_zona || product.zona || product.zone || null;
            const rack = product.ubicacion_rack || product.rack || null;
            const altura = product.ubicacion_altura || product.altura || product.level || null;

            if (zona || rack || altura) {
                if (!zona || !rack || !altura) return ' - Ubicacion: Incompleta';
                return ' - Ubicacion: P' + zona + '/R' + rack + '/' + String(altura).toUpperCase();
            }

            return '';
        },


        validarUbicacionParts: function (zona, rack, altura) {
            if (!zona && !rack && !altura) return true; 
            if (!zona || !rack || !altura) return false;
            const z = parseInt(zona, 10);
            const r = parseInt(rack, 10);
            const a = String(altura).toUpperCase();
            if (!Number.isInteger(z) || z < 1 || z > 4) return false;
            if (!Number.isInteger(r) || r < 1 || r > 50) return false;
            if (!['A','B','C','D','E'].includes(a)) return false;
            return true;
        },


        crearInputUbicacionHtml: function () {
            const container = document.createElement('div');
            container.className = 'ubicacion-grid';

            const crearSelect = (name, placeholder, items) => {
                const s = document.createElement('select');
                s.name = name;
                const ph = document.createElement('option');
                ph.value = '';
                ph.textContent = placeholder;
                s.appendChild(ph);
                items.forEach(it => {
                    const o = document.createElement('option');
                    o.value = it.value;
                    o.textContent = it.label;
                    s.appendChild(o);
                });
                return s;
            };

            const zona = crearSelect('ubicacion_zona', 'Zona', [{value:'1',label:'P1'},{value:'2',label:'P2'},{value:'3',label:'P3'},{value:'4',label:'P4'}]);
            const racks = Array.from({length:50}, (_,i)=>({value:String(i+1), label:'R'+(i+1)}));
            const rack = crearSelect('ubicacion_rack', 'Rack', racks);
            const altura = crearSelect('ubicacion_altura', 'Altura', [{value:'A',label:'A'},{value:'B',label:'B'},{value:'C',label:'C'},{value:'D',label:'D'},{value:'E',label:'E'}]);

            container.appendChild(zona);
            container.appendChild(rack);
            container.appendChild(altura);

            return container;
        }
    };

    try {
        window.ProductosUbicacion = API;

        if (typeof window !== 'undefined') {
            try {
                ProductosUbicacion = API; 
            } catch (e) {
            }
        }
    } catch (err) {
        console.error('No se pudo exponer ProductosUbicacion globalmente:', err);
    }
})();
