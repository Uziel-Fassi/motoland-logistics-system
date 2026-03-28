(function () {
    'use strict';

    // setup ctx
    const pathParts = window.location.pathname.split('/');
    const ctx = pathParts.length > 1 ? '/' + pathParts[1] : '';
    const API = ctx + '/';

    let currentView = null;
    const contentArea    = document.getElementById('content-area');
    const topbarTitle    = document.getElementById('topbar-title');
    const navItems       = document.querySelectorAll('.nav-item[data-view]');
    const logoutBtn      = document.getElementById('btn-logout');
    const menuToggle     = document.getElementById('btn-menu-toggle');
    const sidebar        = document.querySelector('.sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    (function checkSession() {
        if (!sessionStorage.getItem('isLoggedIn')) {
            window.location.href = 'index.html';
        }
    })();
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
    const ddBox = document.createElement('div');
    ddBox.id = 'spa-floating-dropdown';
    ddBox.className = 'spa-floating-dropdown';
    document.body.appendChild(ddBox);

    let active_input = null;

    function placeDd(input) {
        const r = input.getBoundingClientRect();
        ddBox.style.top   = (r.bottom + 4) + 'px';
        ddBox.style.left  = r.left + 'px';
        ddBox.style.width = Math.max(r.width, 200) + 'px';
    }

    function showFloatingDropdown(input, items, onSelect) {
        active_input = input;
        ddBox.innerHTML = '';
        if (!items.length) { ddBox.style.display = 'none'; return; }
        items.forEach(function (item) {
            const d = document.createElement('div');
            d.className = 'autocomplete-item';
            d.innerHTML = item.label;
            d.addEventListener('mousedown', function (e) {
                e.preventDefault(); // no blur al click
                ddBox.style.display = 'none';
                active_input = null;
                onSelect(item.value);
            });
            ddBox.appendChild(d);
        });
        placeDd(input);
        ddBox.style.display = 'block';
    }

    function hideFloatingDropdown() {
        ddBox.style.display = 'none';
        active_input = null;
    }

    document.addEventListener('click', function (e) {
        if (active_input && !ddBox.contains(e.target) && e.target !== active_input) {
            hideFloatingDropdown();
        }
    });
    document.addEventListener('scroll', function () {
        if (active_input && ddBox.style.display !== 'none') {
            placeDd(active_input);
        }
    }, true);
    function showToast(msg, ok = true, timeout = 4500) {
        const t = document.createElement('div');
        t.className = 'toast ' + (ok ? 'success' : 'error');
        t.textContent = msg;
        toastContainer.innerHTML = '';
        toastContainer.appendChild(t);
        if (timeout > 0) setTimeout(() => { if (toastContainer.contains(t)) t.remove(); }, timeout);
    }
    function esc(text) {
        if (typeof text !== 'string') return text;
        const el = document.createElement('span');
        el.textContent = text;
        return el.innerHTML;
    }

    function formatDate(d) {
        if (!d) return '';
        try { return new Date(d).toLocaleString('es-BO'); } catch { return d; }
    }
    function crearSelectZona() {
        let h = '<select class="form-control" name="ubicacion_zona"><option value="">Zona</option>';
        for (let i = 1; i <= 4; i++) h += `<option value="${i}">P${i}</option>`;
        return h + '</select>';
    }
    function crearSelectRack() {
        let h = '<select class="form-control" name="ubicacion_rack"><option value="">Rack</option>';
        for (let i = 1; i <= 50; i++) h += `<option value="${i}">R${i}</option>`;
        return h + '</select>';
    }
    function crearSelectAltura() {
        return `<select class="form-control" name="ubicacion_altura">
            <option value="">Altura</option>
            <option value="A">A</option><option value="B">B</option>
            <option value="C">C</option><option value="D">D</option><option value="E">E</option>
        </select>`;
    }
    function navigate(view) {
        if (currentView === view) return;
        currentView = view;
        navItems.forEach(n => {
            n.classList.toggle('active', n.dataset.view === view);
        });
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('show');
        const titles = {
            dashboard: 'Panel Principal',
            productos: 'Inventario de Productos',
            proveedores: 'Gestión de Proveedores',
            clientes: 'Gestión de Clientes',
            ventas: 'Registro de Ventas',
            compras: 'Registro de Compras',
            devoluciones: 'Procesar Devoluciones',
            historial: 'Historial de Transacciones',
            facturacion: 'Módulo de Facturación'
        };

        topbarTitle.textContent = titles[view] || 'Motoland';
        contentArea.innerHTML = '<div class="spinner-container"><div class="spinner"></div></div>';
        const renderers = {
            dashboard:    renderDashboard,
            productos:    renderProductos,
            proveedores:  renderProveedores,
            clientes:     renderClientes,
            ventas:       renderVentas,
            compras:      renderCompras,
            devoluciones: renderDevoluciones,
            historial:    renderHistorial,
            facturacion:  renderFacturacion,
        };
        hideFloatingDropdown();

        const fn = renderers[view];
        if (fn) {
            fn();
        } else {
            contentArea.innerHTML = '<div class="empty-state"><div class="empty-icon"><i data-lucide="wrench"></i></div><p>M\u00f3dulo no encontrado</p></div>';
        }
        if (window.lucide) window.lucide.createIcons();
        history.replaceState(null, '', '#' + view);
    }
    navItems.forEach(item => {
        item.addEventListener('click', () => navigate(item.dataset.view));
    });

    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('isLoggedIn');
        window.location.href = 'index.html';
    });

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('show');
    });

    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('show');
    });

    const hash = (location.hash || '').replace('#', '');
    navigate(hash || 'dashboard');


    // dashboard
    function renderDashboard() {
        contentArea.innerHTML = `
        <div class="view-enter">
            <h1 class="section-title">Bienvenido a Motoland S.A.</h1>
            <p class="section-subtitle">Sistema de Gestión de Inventario — Selecciona un módulo del menú lateral para comenzar.</p>

            <div class="dashboard-grid" id="dash-stats">
                <div class="stat-card" data-goto="productos">
                    <div class="stat-icon blue"><i data-lucide="package"></i></div>
                    <div class="stat-info"><h3 id="dash-prod-count">—</h3><p>Productos en inventario</p></div>
                </div>
                <div class="stat-card" data-goto="clientes">
                    <div class="stat-icon green"><i data-lucide="users"></i></div>
                    <div class="stat-info"><h3 id="dash-cli-count">—</h3><p>Clientes registrados</p></div>
                </div>
                <div class="stat-card" data-goto="historial">
                    <div class="stat-icon orange"><i data-lucide="bar-chart-2"></i></div>
                    <div class="stat-info"><h3 id="dash-hist-count">—</h3><p>Transacciones totales</p></div>
                </div>
                <div class="stat-card" data-goto="ventas">
                    <div class="stat-icon red"><i data-lucide="tag"></i></div>
                    <div class="stat-info"><h3>Ventas</h3><p>Registrar nueva venta</p></div>
                </div>
            </div>

            <div class="card">
                <div class="card-header"><h2>Acceso Rápido</h2></div>
                <div class="dashboard-grid">
                    <button class="btn btn-primary btn-block" onclick="window._spa.nav('compras')"><i data-lucide="shopping-cart"></i> Nueva Compra</button>
                    <button class="btn btn-success btn-block" onclick="window._spa.nav('ventas')"><i data-lucide="tag"></i> Nueva Venta</button>
                    <button class="btn btn-outline btn-block" onclick="window._spa.nav('facturacion')"><i data-lucide="receipt"></i> Facturación</button>
                    <button class="btn btn-outline btn-block" onclick="window._spa.nav('devoluciones')"><i data-lucide="undo-2"></i> Devoluciones</button>
                </div>
            </div>
        </div>`;

        document.querySelectorAll('.stat-card[data-goto]').forEach(c => {
            c.addEventListener('click', () => navigate(c.dataset.goto));
        });

        fetch(API + 'productos').then(r => r.json()).then(d => {
            document.getElementById('dash-prod-count').textContent = Array.isArray(d) ? d.length : '0';
        }).catch(() => {});
        fetch(API + 'clientes').then(r => r.json()).then(d => {
            document.getElementById('dash-cli-count').textContent = Array.isArray(d) ? d.length : '0';
        }).catch(() => {});
        fetch(API + 'historial').then(r => r.json()).then(d => {
            document.getElementById('dash-hist-count').textContent = Array.isArray(d) ? d.length : '0';
        }).catch(() => {});
    }

    window._spa = { nav: navigate };

    function renderProductos() {
        contentArea.innerHTML = `
        <div class="view-enter">
            <h1 class="section-title">Inventario de Productos</h1>
            <p class="section-subtitle">Catálogo completo con ubicación en almacén, precios y stock actual.</p>

            <div class="card">
                <div class="search-filter">
                    <input type="text" id="prod-search" placeholder="Buscar por código o nombre de producto...">
                </div>
                <div class="table-wrapper">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nombre del Producto</th>
                                <th>Ubicación</th>
                                <th class="right">Precio Venta (Bs.)</th>
                                <th class="center">Stock</th>
                            </tr>
                        </thead>
                        <tbody id="prod-tbody"><tr><td colspan="5" class="center">Cargando...</td></tr></tbody>
                    </table>
                </div>
            </div>
        </div>`;

        let allProducts = [];

        function fallbackUbicacion(p) {
            const seed = typeof p.id === 'number' ? p.id : 1;
            return 'P' + ((seed % 4) + 1) + '/R' + ((seed % 50) + 1) + '/' + ['A','B','C','D','E'][seed % 5];
        }

        function getUbicacion(p) {
            if (p.ubicacion) return String(p.ubicacion);
            if (p.ubicacion_zona && p.ubicacion_rack && p.ubicacion_altura)
                return 'P' + p.ubicacion_zona + '/R' + p.ubicacion_rack + '/' + String(p.ubicacion_altura).toUpperCase();
            return fallbackUbicacion(p);
        }

        function renderTable(products) {
            const tbody = document.getElementById('prod-tbody');
            if (!tbody) return;
            if (!products.length) {
                tbody.innerHTML = '<tr><td colspan="5" class="center" style="color:var(--text-muted)">No hay productos en el inventario.</td></tr>';
                return;
            }
            tbody.innerHTML = products.map(p => {
                const precio = p.precioVenta !== undefined ? p.precioVenta : (p.precio_venta || 0);
                const stockClass = (typeof p.stock==='number' && p.stock <= 5) ? 'stock-bajo' : 'stock-normal';
                return `<tr>
                    <td>${esc(p.codigo || 'N/A')}</td>
                    <td>${esc(p.nombre || '')}</td>
                    <td style="font-weight:600;color:var(--color-accent)">${esc(getUbicacion(p))}</td>
                    <td class="right">${Number(precio).toFixed(2)}</td>
                    <td class="center"><span class="${stockClass}">${typeof p.stock==='number'?p.stock:'N/A'}</span></td>
                </tr>`;
            }).join('');
        }

        fetch(API + 'productos')
            .then(r => r.json())
            .then(d => { allProducts = Array.isArray(d)?d:[]; renderTable(allProducts); })
            .catch(() => {
                const tb = document.getElementById('prod-tbody');
                if (tb) tb.innerHTML = '<tr><td colspan="5" class="center" style="color:var(--color-red)">Error al cargar datos.</td></tr>';
            });

        contentArea.querySelector('#prod-search').addEventListener('input', function() {
            const q = this.value.trim().toLowerCase();
            renderTable(allProducts.filter(p => (p.codigo||'').toLowerCase().includes(q) || (p.nombre||'').toLowerCase().includes(q)));
        });
    }

    function renderClientes() {
        contentArea.innerHTML = `
        <div class="view-enter">
            <h1 class="section-title">Gestión de Clientes</h1>
            <p class="section-subtitle">Registra nuevos clientes y consulta la lista completa.</p>

            <div class="card" style="margin-bottom:20px">
                <div class="card-header"><h2>Registrar Nuevo Cliente</h2></div>
                <form id="cli-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nombre</label>
                            <input class="form-control" type="text" name="nombre" required placeholder="Nombre completo">
                        </div>
                        <div class="form-group">
                            <label>Contacto</label>
                            <input class="form-control" type="text" name="contacto" required placeholder="Teléfono o email">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Dirección</label>
                        <input class="form-control" type="text" name="direccion" required placeholder="Dirección completa">
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Guardar Cliente</button>
                </form>
            </div>

            <div class="card">
                <div class="card-header"><h2>Clientes Registrados</h2></div>
                <div class="table-wrapper">
                    <table class="data-table">
                        <thead><tr><th>Nombre</th><th>Contacto</th><th>Dirección</th></tr></thead>
                        <tbody id="cli-tbody"><tr><td colspan="3" class="center">Cargando...</td></tr></tbody>
                    </table>
                </div>
            </div>
        </div>`;

        function loadClientes() {
            fetch(API + 'clientes').then(r=>r.json()).then(data => {
                const tb = document.getElementById('cli-tbody');
                if (!tb) return;
                if (!data.length) { tb.innerHTML = '<tr><td colspan="3" class="center" style="color:var(--text-muted)">No hay clientes registrados.</td></tr>'; return; }
                tb.innerHTML = data.map(c => `<tr><td>${esc(c.nombre)}</td><td>${esc(c.contacto)}</td><td>${esc(c.direccion)}</td></tr>`).join('');
            }).catch(() => {});
        }
        loadClientes();

        document.getElementById('cli-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const fd = new FormData(this);
            fetch(API + 'clientes', { method:'POST', body: new URLSearchParams(fd) })
                .then(r=>r.json())
                .then(d => {
                    showToast(d.message || 'Cliente registrado.', d.status==='success');
                    if (d.status==='success') { this.reset(); loadClientes(); }
                })
                .catch(() => showToast('Error de conexión.', false));
        });
    }

    function renderProveedores() {
        contentArea.innerHTML = `
        <div class="view-enter">
            <h1 class="section-title">Gestión de Proveedores</h1>
            <p class="section-subtitle">Registra proveedores con su catálogo de productos.</p>

            <div class="card">
                <form id="prov-form" autocomplete="off">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Nombre del Proveedor</label>
                            <input class="form-control" id="prov-nombre" type="text" required placeholder="Ej: Importadora El Veloz">
                        </div>
                        <div class="form-group">
                            <label>Contacto</label>
                            <input class="form-control" id="prov-contacto" type="text" placeholder="Teléfono / email">
                        </div>
                    </div>

                    <div style="margin-top:8px">
                        <label style="display:block;font-size:13px;font-weight:600;color:var(--text-secondary);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px">Catálogo de Productos</label>
                        <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px;flex-wrap:wrap">
                            <button type="button" id="prov-add-item" class="btn btn-primary btn-sm">+ Añadir producto</button>
                            <button type="button" id="prov-generate" class="btn btn-outline btn-sm">Generar N campos</button>
                            <input type="number" id="prov-cant" min="1" value="1" class="form-control" style="width:80px">
                            <button type="button" id="prov-clear" class="btn btn-outline btn-sm">Limpiar</button>
                        </div>
                        <div id="prov-catalogo" class="catalogo-list"></div>
                    </div>

                    <div style="margin-top:16px;display:flex;justify-content:flex-end">
                        <button type="submit" class="btn btn-primary">Registrar Proveedor y Catálogo</button>
                    </div>
                </form>
            </div>
        </div>`;

        const catEl = document.getElementById('prov-catalogo');

        function crearItem(n='',d='',c='') {
            const w = document.createElement('div');
            w.className = 'catalogo-item';
            w.innerHTML = `
                <input class="form-control" type="text" name="cat-nombre" placeholder="Nombre del producto" value="${esc(n)}" required>
                <textarea class="form-control" name="cat-desc" placeholder="Descripción (opcional)" style="min-height:40px">${esc(d)}</textarea>
                <input class="form-control" type="number" name="cat-costo" step="0.01" placeholder="Costo" value="${c}" style="width:120px">
                <button type="button" class="btn btn-red btn-sm cat-remove" title="Eliminar">✕</button>`;
            w.querySelector('.cat-remove').addEventListener('click', () => w.remove());
            catEl.appendChild(w);
        }

        crearItem();

        document.getElementById('prov-add-item').addEventListener('click', () => crearItem());
        document.getElementById('prov-clear').addEventListener('click', () => {
            if (confirm('¿Limpiar todo el catálogo?')) { catEl.innerHTML=''; crearItem(); }
        });
        document.getElementById('prov-generate').addEventListener('click', () => {
            const n = parseInt(document.getElementById('prov-cant').value) || 1;
            catEl.innerHTML = '';
            for (let i=0;i<n;i++) crearItem();
        });

        document.getElementById('prov-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const nombre = document.getElementById('prov-nombre').value.trim();
            const contacto = document.getElementById('prov-contacto').value.trim();
            if (!nombre) { showToast('Nombre del proveedor requerido.', false); return; }

            const catalogo = [];
            catEl.querySelectorAll('.catalogo-item').forEach(row => {
                const np = row.querySelector('[name="cat-nombre"]').value.trim();
                const desc = row.querySelector('[name="cat-desc"]').value.trim();
                const costo = parseFloat(row.querySelector('[name="cat-costo"]').value) || 0;
                if (np) catalogo.push({ nombreProducto: np, descripcion: desc, costo });
            });

            fetch(API + 'proveedores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, contacto, catalogo })
            })
            .then(r => r.json())
            .then(d => {
                showToast(d.message || 'Proveedor registrado.', d.status==='success');
                if (d.status==='success') { this.reset(); catEl.innerHTML=''; crearItem(); }
            })
            .catch(() => showToast('Error de conexión.', false));
        });
    }

    function renderVentas() {
        contentArea.innerHTML = `
        <div class="view-enter">
            <h1 class="section-title">Registro de Ventas</h1>
            <p class="section-subtitle">Busca productos, arma tu carrito y registra la venta.</p>

            <div class="card" style="margin-bottom:20px">
                <div class="card-header"><h2>Añadir Producto</h2></div>
                <div class="form-group">
                    <label>Buscar Producto</label>
                    <div class="autocomplete-wrapper">
                        <input class="form-control" id="v-search" type="text" placeholder="Escribe para buscar (ej: Casco, Llanta)..." autocomplete="off">
                        <div id="v-results" class="autocomplete-list"></div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Cantidad</label>
                        <input class="form-control" id="v-cantidad" type="number" min="1" value="1">
                    </div>
                    <div class="form-group">
                        <label>Cliente</label>
                        <select class="form-control" id="v-cliente"><option value="">Cliente general</option></select>
                    </div>
                </div>
                <button id="v-add-btn" class="btn btn-primary btn-block">Añadir a la Venta</button>
            </div>

            <div class="card">
                <div class="card-header"><h2>Detalle de Venta Actual</h2></div>
                <div class="table-wrapper">
                    <table class="data-table" id="v-table">
                        <thead><tr><th>Producto</th><th class="center">Cantidad</th><th class="right">Precio Unit. (Bs.)</th><th class="center">Stock</th><th class="right">Subtotal</th><th class="center">Acción</th></tr></thead>
                        <tbody id="v-tbody"></tbody>
                    </table>
                </div>
                <div class="total-display">TOTAL: Bs. <span id="v-total">0.00</span></div>
                <button id="v-registrar" class="btn btn-success btn-block" style="margin-top:12px">Registrar Venta</button>
            </div>
        </div>`;

        let productosList = [];
        let clienteList = [];
        let selectedProduct = null;
        let carrito = [];

        const inputSearch = document.getElementById('v-search');
        const resultsDiv = document.getElementById('v-results');
        const cantidadInput = document.getElementById('v-cantidad');
        const clienteSelect = document.getElementById('v-cliente');
        const ventaTbody = document.getElementById('v-tbody');
        const totalSpan = document.getElementById('v-total');

        function loadData() {
            fetch(API + 'ventas').then(r=>r.json()).then(d => { productosList = Array.isArray(d)?d:[]; }).catch(() => {});
            fetch(API + 'clientes').then(r=>r.json()).then(d => {
                clienteList = Array.isArray(d)?d:[];
                clienteSelect.innerHTML = '<option value="">Cliente general</option>';
                clienteList.forEach(c => {
                    const opt = document.createElement('option');
                    opt.value = c.id != null ? c.id : '';
                    opt.textContent = c.nombre || 'Cliente';
                    clienteSelect.appendChild(opt);
                });
            }).catch(() => {});
        }
        loadData();

        // Autocomplete
        inputSearch.addEventListener('input', () => {
            const q = inputSearch.value.trim().toLowerCase();
            resultsDiv.innerHTML = '';
            if (!q) { resultsDiv.style.display='none'; selectedProduct=null; return; }
            const matches = productosList.filter(p => (p.nombre||'').toLowerCase().includes(q) || (p.codigo||'').toLowerCase().startsWith(q));
            if (!matches.length) { resultsDiv.style.display='none'; return; }
            matches.slice(0,30).forEach(p => {
                const d = document.createElement('div');
                d.className = 'autocomplete-item';
                d.innerHTML = `<strong>${esc(p.nombre)}</strong> <span style="float:right;color:var(--text-muted)">${p.precioVenta!=null?'Bs. '+Number(p.precioVenta).toFixed(2):''} ${p.stock!=null?'| stock: '+p.stock:''}</span><div class="item-meta">${esc(p.codigo||'')} ${p.ubicacion?'| '+p.ubicacion:''}</div>`;
                d.addEventListener('click', () => {
                    selectedProduct = p;
                    inputSearch.value = (p.codigo?p.codigo+' - ':'')+p.nombre;
                    resultsDiv.style.display='none';
                });
                resultsDiv.appendChild(d);
            });
            resultsDiv.style.display='block';
        });
        document.addEventListener('click', e => {
            if (!resultsDiv.contains(e.target) && e.target !== inputSearch) resultsDiv.style.display='none';
        });

        // Add to cart
        document.getElementById('v-add-btn').addEventListener('click', () => {
            if (!selectedProduct) { showToast('Selecciona un producto de la lista.', false); inputSearch.focus(); return; }
            const cantidad = parseInt(cantidadInput.value)||0;
            if (cantidad<=0) { showToast('Ingresa una cantidad válida.', false); return; }
            const item = {
                productoId: selectedProduct.id, nombre: selectedProduct.nombre, codigo: selectedProduct.codigo,
                precioUnitario: Number(selectedProduct.precioVenta||selectedProduct.precio_venta||0),
                cantidad, stock: Number(selectedProduct.stock||0), ubicacion: selectedProduct.ubicacion||null
            };
            const existing = carrito.find(c => String(c.productoId)===String(item.productoId));
            if (existing) existing.cantidad += item.cantidad;
            else carrito.push(item);
            selectedProduct = null; inputSearch.value = ''; cantidadInput.value = 1;
            renderCarrito();
        });

        function renderCarrito() {
            ventaTbody.innerHTML = '';
            let total = 0;
            carrito.forEach((it, idx) => {
                const sub = (it.cantidad * it.precioUnitario)||0;
                total += sub;
                const stockWarn = (it.stock!=null && it.cantidad>it.stock) ? ' stock-warning' : '';
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><div style="font-weight:600">${esc(it.nombre)}</div><div class="item-meta" style="font-size:11px;color:var(--text-muted)">${esc(it.codigo||'')} ${it.ubicacion?'| '+it.ubicacion:''}</div></td>
                    <td class="center"></td>
                    <td class="right"></td>
                    <td class="center${stockWarn}">${it.stock!=null?it.stock:'-'}</td>
                    <td class="right">${sub.toFixed(2)}</td>
                    <td class="center"><button class="btn btn-red btn-sm v-remove-btn">Quitar</button></td>`;

                // Inline editable inputs
                const inpCant = document.createElement('input');
                inpCant.type='number'; inpCant.min='1'; inpCant.value=it.cantidad; inpCant.style.width='70px';
                inpCant.addEventListener('input', () => { it.cantidad=parseInt(inpCant.value)||0; renderCarrito(); });
                tr.children[1].appendChild(inpCant);

                const inpPrecio = document.createElement('input');
                inpPrecio.type='number'; inpPrecio.step='0.01'; inpPrecio.value=Number(it.precioUnitario).toFixed(2); inpPrecio.style.width='100px';
                inpPrecio.addEventListener('input', () => { it.precioUnitario=parseFloat(inpPrecio.value)||0; renderCarrito(); });
                tr.children[2].appendChild(inpPrecio);

                tr.querySelector('.v-remove-btn').addEventListener('click', () => { carrito.splice(idx,1); renderCarrito(); });
                ventaTbody.appendChild(tr);
            });
            totalSpan.textContent = total.toFixed(2);
        }
        renderCarrito();

        // Register sale
        document.getElementById('v-registrar').addEventListener('click', async () => {
            if (!carrito.length) { showToast('No hay productos en la venta.', false); return; }
            const clienteId = clienteSelect.value ? parseInt(clienteSelect.value) : null;
            const items = carrito.map(it => ({ productoId:it.productoId, cantidad:it.cantidad, precioUnitario:it.precioUnitario }));
            try {
                const res = await fetch(API + 'ventas', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({clienteId, items}) });
                const body = await res.json().catch(()=>({}));
                if (!res.ok) { showToast(body.message||'Error al registrar venta.', false); return; }
                showToast(body.message||'Venta registrada con éxito.', true);
                carrito = []; renderCarrito(); loadData();
            } catch { showToast('Error de conexión.', false); }
        });
    }

    function renderCompras() {
        contentArea.innerHTML = `
        <div class="view-enter">
            <h1 class="section-title">Registro de Compras</h1>
            <p class="section-subtitle">Registra compras a proveedores y actualiza el inventario automáticamente.</p>

            <form id="c-form" novalidate>
                <div class="card" style="margin-bottom:20px">
                    <div class="card-header"><h2>1. Datos de la Compra</h2></div>
                    <div class="form-group">
                        <label>Código de Compra (opcional)</label>
                        <input class="form-control" id="c-codigo" type="text" placeholder="Ej: COMPRA-123">
                    </div>
                    <div class="form-group">
                        <label>Proveedor</label>
                        <div class="autocomplete-wrapper">
                            <input class="form-control" id="c-prov-input" type="text" placeholder="Escribe para buscar proveedor..." autocomplete="off">
                            <input type="hidden" id="c-prov-id" value="">
                            <div id="c-prov-suggestions" class="autocomplete-list"></div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Fecha</label>
                            <input class="form-control" id="c-fecha" type="datetime-local">
                        </div>
                        <div class="form-group">
                            <label>Estado</label>
                            <select class="form-control" id="c-estado">
                                <option value="Completada">Completada</option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="Anulada">Anulada</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="card" style="margin-bottom:20px">
                    <div class="card-header">
                        <h2>2. Detalle de Productos</h2>
                        <button type="button" id="c-add-line" class="btn btn-primary btn-sm">+ Añadir Línea</button>
                    </div>
                    <div class="table-wrapper">
                        <table class="data-table">
                            <thead><tr>
                                <th>Producto</th><th class="center">Cantidad</th><th class="right">Precio Unit. (Bs.)</th>
                                <th>Ubicación (Zona/Rack/Altura)</th><th class="center">Vista</th><th class="center">Acción</th>
                            </tr></thead>
                            <tbody id="c-tbody"></tbody>
                        </table>
                    </div>
                </div>

                <div class="card" style="text-align:center">
                    <button type="submit" class="btn btn-primary btn-block">Registrar Compra</button>
                </div>
            </form>
        </div>`;

        let proveedoresList = [];
        let catalogoProveedor = [];

        // Load proveedores
        fetch(API + 'compras').then(r=>r.json()).then(d=> { proveedoresList = Array.isArray(d)?d:[]; }).catch(()=>{});

        const provInput = document.getElementById('c-prov-input');
        const provIdInput = document.getElementById('c-prov-id');
        const provSuggestions = document.getElementById('c-prov-suggestions');
        const comprasTbody = document.getElementById('c-tbody');

        // Proveedor autocomplete
        provInput.addEventListener('input', (e) => {
            provIdInput.value = '';
            const q = (e.target.value||'').trim().toLowerCase();
            provSuggestions.innerHTML = '';
            if (!q) { provSuggestions.style.display='none'; return; }
            const matches = proveedoresList.filter(p => p.nombre.toLowerCase().includes(q)).slice(0,20);
            if (!matches.length) { provSuggestions.style.display='none'; return; }
            matches.forEach(m => {
                const d = document.createElement('div');
                d.className = 'autocomplete-item';
                d.textContent = m.nombre + ' (' + m.id + ')';
                d.addEventListener('click', () => {
                    provInput.value = m.nombre;
                    provIdInput.value = m.id;
                    provSuggestions.style.display = 'none';
                    loadCatalogo(m.id);
                });
                provSuggestions.appendChild(d);
            });
            provSuggestions.style.display = 'block';
        });
        document.addEventListener('click', ev => {
            if (!provSuggestions.contains(ev.target) && ev.target !== provInput) provSuggestions.style.display='none';
        });

        function loadCatalogo(provId) {
            catalogoProveedor = [];
            if (!provId) return;
            fetch(API + 'compras?proveedorId=' + encodeURIComponent(provId))
                .then(r=>r.json()).then(d => { catalogoProveedor = Array.isArray(d)?d:[]; }).catch(()=>{});
        }

        // Create detail row
        function crearRow() {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><div class="autocomplete-wrapper">
                    <input class="form-control" type="text" name="producto" placeholder="C\u00f3digo o nombre" autocomplete="off">
                    <input type="hidden" name="catalogoId">
                </div></td>
                <td class="center"><input class="form-control" type="number" name="cantidad" min="1" value="1" style="width:70px"></td>
                <td class="right"><input class="form-control" type="number" name="precio_unitario" step="0.01" value="0.00" style="width:100px"></td>
                <td><div class="ubicacion-grid">${crearSelectZona()}${crearSelectRack()}${crearSelectAltura()}</div></td>
                <td class="center"><div class="ubicacion-preview" style="min-width:80px"></div></td>
                <td class="center"><button type="button" class="btn btn-red btn-sm c-remove-row">\u2715</button></td>`;

            const inpProd  = tr.querySelector('[name="producto"]');
            const catIdInp = tr.querySelector('[name="catalogoId"]');
            const inpPrecio = tr.querySelector('[name="precio_unitario"]');
            const selZ = tr.querySelector('[name="ubicacion_zona"]');
            const selR = tr.querySelector('[name="ubicacion_rack"]');
            const selA = tr.querySelector('[name="ubicacion_altura"]');
            const prevDiv = tr.querySelector('.ubicacion-preview');

            function updatePreview() {
                const z=selZ.value, r=selR.value, a=selA.value;
                if (!z&&!r&&!a) prevDiv.textContent='';
                else if (!z||!r||!a) prevDiv.textContent='Incompleta';
                else prevDiv.textContent = 'P'+z+'/R'+r+'/'+a;
            }
            selZ.addEventListener('change', updatePreview);
            selR.addEventListener('change', updatePreview);
            selA.addEventListener('change', updatePreview);

            // aca va el autocomplete con portal para que no se corte
            inpProd.addEventListener('input', function () {
                const q = (inpProd.value || '').trim().toLowerCase();
                if (!q || !catalogoProveedor.length) { hideFloatingDropdown(); return; }
                const matches = catalogoProveedor.filter(function (p) {
                    return p.nombre_producto.toLowerCase().includes(q) || String(p.id).startsWith(q);
                }).slice(0, 20);
                if (!matches.length) { hideFloatingDropdown(); return; }

                showFloatingDropdown(
                    inpProd,
                    matches.map(function (m) {
                        const costo = Number(m.costo || 0).toFixed(2);
                        return {
                            label: '<strong>' + esc(m.nombre_producto) + '</strong>' +
                                   '<span style="float:right;color:var(--text-muted)">Bs.\u00a0' + costo + '</span>',
                            value: m
                        };
                    }),
                    function (m) {
                        inpProd.value = m.nombre_producto;
                        catIdInp.value = m.id;
                        if (m.costo != null) inpPrecio.value = Number(m.costo).toFixed(2);
                        if (m.ubicacion) {
                            const parts = String(m.ubicacion).split('/');
                            if (parts.length === 3) {
                                selZ.value = parts[0].replace(/^P/i, '');
                                selR.value = parts[1].replace(/^R/i, '');
                                selA.value = parts[2];
                                updatePreview();
                            }
                        }
                    }
                );
            });

            // Hide portal when focus leaves the input (safety net for keyboard nav)
            inpProd.addEventListener('blur', function () {
                setTimeout(hideFloatingDropdown, 200);
            });

            tr.querySelector('.c-remove-row').addEventListener('click', function () { tr.remove(); });

            comprasTbody.appendChild(tr);
            return tr;
        }

        crearRow();
        document.getElementById('c-add-line').addEventListener('click', () => crearRow());

        // Submit compra
        document.getElementById('c-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const provId = provIdInput.value ? parseInt(provIdInput.value) : null;
            if (!provId) { showToast('Selecciona un proveedor válido.', false); return; }

            const filas = Array.from(comprasTbody.querySelectorAll('tr'));
            if (!filas.length) { showToast('Añade al menos una línea.', false); return; }

            const items = [];
            for (const tr of filas) {
                const prod = (tr.querySelector('[name="producto"]').value||'').trim();
                const cant = parseInt(tr.querySelector('[name="cantidad"]').value)||0;
                const precio = parseFloat(tr.querySelector('[name="precio_unitario"]').value)||0;
                const z = tr.querySelector('[name="ubicacion_zona"]').value;
                const r = tr.querySelector('[name="ubicacion_rack"]').value;
                const a = tr.querySelector('[name="ubicacion_altura"]').value;
                if (!prod) { showToast('Hay una línea sin producto.', false); return; }
                if (cant<=0) { showToast('La cantidad debe ser mayor a 0.', false); return; }
                const anyU = z||r||a;
                if (anyU && (!z||!r||!a)) { showToast('Ubicación incompleta en una línea.', false); return; }
                items.push({ nombreProducto: prod, cantidad: cant, costoUnitario: precio, ubicacion: (z&&r&&a)?'P'+z+'/R'+r+'/'+a:null });
            }

            const payload = {
                proveedorId: provId,
                codigo_compra: document.getElementById('c-codigo').value.trim() || null,
                fecha_compra: document.getElementById('c-fecha').value || null,
                estado: document.getElementById('c-estado').value,
                items
            };

            fetch(API + 'compras', { method:'POST', headers:{'Content-Type':'application/json;charset=utf-8'}, body:JSON.stringify(payload) })
                .then(r=>r.json().catch(()=>({status:'error',message:'Respuesta inesperada'})))
                .then(res => {
                    showToast(res.message||'Compra registrada.', res.status==='success');
                    if (res.status==='success') { this.reset(); comprasTbody.innerHTML=''; crearRow(); provIdInput.value=''; catalogoProveedor=[]; }
                })
                .catch(() => showToast('Error de conexión.', false));
        });
    }

    function renderDevoluciones() {
        contentArea.innerHTML = `
        <div class="view-enter">
            <h1 class="section-title">Procesar Devoluciones</h1>
            <p class="section-subtitle">Anula transacciones o registra devoluciones con actualización de stock.</p>

            <div class="card" style="max-width:700px;margin:0 auto">
                <form id="d-form">
                    <div class="card-header"><h2>Anular Transacción</h2></div>

                    <div class="form-group">
                        <label>Tipo de Transacción</label>
                        <select class="form-control" id="d-tipo" required>
                            <option value="">-- Selecciona --</option>
                            <option value="Venta">Venta</option>
                            <option value="Compra">Compra</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Código de la Transacción</label>
                        <input class="form-control" id="d-codigo" type="text" placeholder="Ej: VENTA-101 o COMPRA-52" required>
                    </div>

                    <div class="form-group">
                        <label>Producto (opcional)</label>
                        <input class="form-control" id="d-producto" type="text" placeholder="PROD-22 o nombre del producto">
                        <div style="font-size:11px;color:var(--text-muted);margin-top:4px">Si quieres actualizar la ubicación del producto devuelto, indicalo aquí junto con Zona/Rack/Altura.</div>
                    </div>

                    <div class="form-group">
                        <label>Ubicación del Producto (opcional)</label>
                        <div class="ubicacion-grid">
                            ${crearSelectZona()}
                            ${crearSelectRack()}
                            ${crearSelectAltura()}
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Motivo (opcional)</label>
                        <textarea class="form-control" id="d-motivo" rows="3" placeholder="Ej: Producto incorrecto, cliente se arrepintió..."></textarea>
                    </div>

                    <button type="submit" class="btn btn-red btn-block">Procesar Devolución</button>
                </form>
            </div>
        </div>`;

        document.getElementById('d-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            const tipo = document.getElementById('d-tipo').value;
            const codigo = document.getElementById('d-codigo').value.trim();
            if (!tipo||!codigo) { showToast('Completa tipo y código.', false); return; }

            const zona = this.querySelector('[name="ubicacion_zona"]').value;
            const rack = this.querySelector('[name="ubicacion_rack"]').value;
            const altura = this.querySelector('[name="ubicacion_altura"]').value;
            if ((zona||rack||altura) && (!zona||!rack||!altura)) { showToast('Completa Zona, Rack y Altura o déjalas vacías.', false); return; }

            const payload = {
                tipo, codigo,
                motivo: document.getElementById('d-motivo').value.trim(),
                producto: document.getElementById('d-producto').value.trim() || null,
                ubicacion_zona: zona||null, ubicacion_rack: rack||null, ubicacion_altura: altura||null
            };

            const btn = this.querySelector('button[type="submit"]');
            btn.disabled = true;
            try {
                const res = await fetch(API + 'devoluciones', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) });
                const data = await res.json().catch(()=>({status:'error',message:'Respuesta inesperada'}));
                showToast(data.message||'Procesado.', data.status==='success');
                if (data.status==='success') this.reset();
            } catch { showToast('Error de conexión.', false); }
            finally { btn.disabled = false; }
        });
    }

    function renderHistorial() {
        contentArea.innerHTML = `
        <div class="view-enter">
            <h1 class="section-title">Historial de Transacciones</h1>
            <p class="section-subtitle">Registro unificado de ventas, compras y devoluciones.</p>

            <div class="card">
                <div class="search-filter">
                    <input type="text" id="h-search" placeholder="Buscar por tipo, código, cliente, proveedor...">
                </div>
                <div class="table-wrapper" style="max-height:65vh;overflow-y:auto">
                    <table class="data-table">
                        <thead><tr>
                            <th>Tipo</th><th>Código</th><th>Fecha y Hora</th><th>Detalle</th><th>Ubicación</th><th class="right">Total (Bs.)</th><th class="center">Estado</th>
                        </tr></thead>
                        <tbody id="h-tbody"><tr><td colspan="7" class="center">Cargando...</td></tr></tbody>
                    </table>
                </div>
            </div>
        </div>`;

        let allTx = [];

        function renderTable(txs) {
            const tb = document.getElementById('h-tbody');
            if (!tb) return;
            if (!txs.length) { tb.innerHTML = '<tr><td colspan="7" class="center" style="color:var(--text-muted)">No se encontraron transacciones.</td></tr>'; return; }
            tb.innerHTML = txs.map(t => {
                let badgeClass = 'badge-venta';
                if (t.tipo==='Compra') badgeClass='badge-compra';
                else if (t.tipo==='Devolución') badgeClass='badge-devolucion';
                const isAnulada = t.estado==='Anulada';
                const trClass = isAnulada ? ' class="anulada"' : '';
                const ubic = t.ubicacion && t.ubicacion.length ? t.ubicacion : '-';
                return `<tr${trClass}>
                    <td><span class="badge ${badgeClass}">${esc(t.tipo)}</span></td>
                    <td>${esc(t.codigo||'N/A')}</td>
                    <td>${formatDate(t.fecha)}</td>
                    <td style="max-width:300px;font-size:12px">${esc(t.detalle||'')}</td>
                    <td style="font-weight:600;color:var(--color-accent)">${esc(ubic)}</td>
                    <td class="right">${(t.total||0).toFixed(2)}</td>
                    <td class="center"><strong>${esc(t.estado||'')}</strong></td>
                </tr>`;
            }).join('');
        }

        fetch(API + 'historial').then(r=>r.json()).then(d => {
            allTx = Array.isArray(d)?d:[];
            renderTable(allTx);
        }).catch(() => {
            const tb = document.getElementById('h-tbody');
            if (tb) tb.innerHTML = '<tr><td colspan="7" class="center" style="color:var(--color-red)">Error al cargar datos.</td></tr>';
        });

        document.getElementById('h-search').addEventListener('input', function() {
            const q = this.value.trim().toLowerCase();
            renderTable(allTx.filter(t => (t.tipo||'').toLowerCase().includes(q)||(t.codigo||'').toLowerCase().includes(q)||(t.detalle||'').toLowerCase().includes(q)||(t.estado||'').toLowerCase().includes(q)||(t.ubicacion||'').toLowerCase().includes(q)));
        });
    }

    function renderFacturacion() {
        contentArea.innerHTML = `
        <div class="view-enter">
            <h1 class="section-title">Módulo de Facturación</h1>
            <p class="section-subtitle">Busca una venta para generar su factura con cálculo automático de impuestos.</p>

            <div class="factura-layout">
                <aside class="card">
                    <div class="card-header"><h3>Buscar Venta</h3></div>
                    <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px">Ingresa el código exacto (ej. VENTA-123)</p>
                    <form id="f-search-form">
                        <div class="form-group">
                            <label>Código de Venta</label>
                            <input class="form-control" id="f-codigo-search" type="text" placeholder="VENTA-..." required>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">Buscar Venta</button>
                    </form>
                    <div id="f-search-status" style="margin-top:10px;padding:10px;border-radius:8px;display:none"></div>
                    <div style="margin-top:12px;font-size:11px;color:var(--text-muted)">Puedes agregar ítems adicionales (envío, descuentos) una vez cargada la venta.</div>
                </aside>

                <section id="f-invoice-section" class="card" style="display:none">
                    <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid var(--border-color);padding-bottom:12px;margin-bottom:14px">
                        <div>
                            <h2 style="margin:0;color:var(--color-accent);font-size:20px">FACTURA</h2>
                            <p style="font-size:13px;color:var(--text-muted);margin:4px 0"><strong>Venta:</strong> <span id="f-vta-codigo"></span></p>
                            <p style="font-size:13px;color:var(--text-muted);margin:4px 0"><strong>Fecha:</strong> <span id="f-vta-fecha"></span></p>
                            <p style="font-size:13px;color:var(--text-muted);margin:4px 0"><strong>Cliente:</strong> <span id="f-vta-cliente"></span></p>
                        </div>
                        <div style="font-size:28px;font-weight:700;color:var(--color-red)">M</div>
                    </div>

                    <h3 style="font-size:14px;color:var(--text-muted);margin-bottom:8px">Productos Vendidos</h3>
                    <div class="table-wrapper">
                        <table class="data-table">
                            <thead><tr><th>Producto</th><th>Ubicación</th><th class="right">Cant.</th><th class="right">Precio Unit.</th><th class="right">Subtotal</th></tr></thead>
                            <tbody id="f-prod-tbody"></tbody>
                        </table>
                    </div>

                    <h3 style="font-size:14px;color:var(--text-muted);margin:14px 0 8px">Ítems Adicionales</h3>
                    <div class="table-wrapper">
                        <table class="data-table">
                            <thead><tr><th>Descripción</th><th class="right">Cantidad</th><th class="right">Monto Unit.</th><th class="right">Tipo</th><th class="center">Acción</th></tr></thead>
                            <tbody id="f-items-tbody"></tbody>
                        </table>
                    </div>
                    <button type="button" id="f-add-item" class="btn btn-outline btn-sm" style="margin-top:8px">+ Añadir Ítem</button>

                    <div class="factura-totals">
                        <div class="row"><div>Subtotal Productos:</div><div id="f-sub-prod">0.00</div></div>
                        <div class="row"><div>Total Adicionales:</div><div id="f-sub-adic">0.00</div></div>
                        <div style="display:flex;gap:12px;justify-content:flex-end;align-items:center;flex-wrap:wrap;margin:6px 0">
                            <label style="margin:0;font-size:12px;font-weight:600;color:var(--text-secondary)">Descuento Global (Bs.)</label>
                            <input class="form-control" id="f-descuento" type="number" value="0.00" step="0.01" style="width:120px;text-align:right">
                            <label style="margin:0;font-size:12px;font-weight:600;color:var(--text-secondary)">Tasa Impuesto (%)</label>
                            <input class="form-control" id="f-tasa" type="number" value="13.00" step="0.01" style="width:120px;text-align:right">
                        </div>
                        <div class="row"><div>Impuestos:</div><div id="f-impuestos">0.00</div></div>
                        <div class="row grand"><div>TOTAL A PAGAR (Bs.)</div><div id="f-total-final">0.00</div></div>
                    </div>

                    <div class="factura-actions">
                        <button id="f-generate-btn" class="btn btn-primary">Guardar Factura</button>
                        <button id="f-print-conf-btn" class="btn btn-outline">Imprimir Conformidad</button>
                        <button id="f-print-inv-btn" class="btn btn-outline">Imprimir Factura</button>
                    </div>
                    <div id="f-final-status" style="margin-top:12px;padding:10px;border-radius:8px;display:none"></div>
                </section>
            </div>
        </div>`;

        let currentVenta = null;
        const invoiceSection = document.getElementById('f-invoice-section');
        const addItemsTbody = document.getElementById('f-items-tbody');

        // Search
        document.getElementById('f-search-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const code = document.getElementById('f-codigo-search').value.trim();
            if (!code) return;
            const statusEl = document.getElementById('f-search-status');
            fetch(API + 'facturacion?codigoVenta=' + encodeURIComponent(code))
                .then(r => { if (!r.ok) return r.json().then(j=>{throw new Error(j.message||'Error')}); return r.json(); })
                .then(data => {
                    currentVenta = data;
                    populateInvoice(data);
                    invoiceSection.style.display = 'block';
                    statusEl.style.display = 'none';
                })
                .catch(err => {
                    statusEl.style.display='block';
                    statusEl.style.background='rgba(192,57,43,0.1)';
                    statusEl.style.color='var(--color-red)';
                    statusEl.textContent = err.message || 'Venta no encontrada';
                    invoiceSection.style.display = 'none';
                });
        });

        function populateInvoice(data) {
            document.getElementById('f-vta-codigo').textContent = data.codigoVenta || '';
            document.getElementById('f-vta-fecha').textContent = formatDate(data.fechaVenta);
            document.getElementById('f-vta-cliente').textContent = data.clienteNombre || '';
            const ptb = document.getElementById('f-prod-tbody');
            ptb.innerHTML = (data.productos||[]).map(p => `<tr>
                <td>${esc(p.nombre||'')}</td>
                <td style="color:var(--color-accent)">${esc(p.ubicacion||'')}</td>
                <td class="right">${p.cantidad||0}</td>
                <td class="right">${(p.precioUnitario||0).toFixed(2)}</td>
                <td class="right">${(p.subtotal||0).toFixed(2)}</td>
            </tr>`).join('');
            addItemsTbody.innerHTML = '';
            recalcTotals();
        }

        // Add item
        document.getElementById('f-add-item').addEventListener('click', () => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td><input class="form-control fi-desc" type="text" placeholder="Ej: Costo de envío"></td>
                <td class="right"><input class="form-control fi-cant" type="number" value="1" min="1" style="width:70px"></td>
                <td class="right"><input class="form-control fi-monto" type="number" value="0.00" step="0.01" style="width:100px"></td>
                <td class="right"><select class="form-control fi-tipo" style="width:120px"><option value="ADICION">Suma (+)</option><option value="DEDUCCION">Resta (-)</option></select></td>
                <td class="center"><button class="btn btn-red btn-sm fi-remove">✕</button></td>`;
            tr.querySelector('.fi-remove').addEventListener('click', () => { tr.remove(); recalcTotals(); });
            addItemsTbody.appendChild(tr);
        });

        // Recalculate on input
        contentArea.addEventListener('input', function(e) {
            if (['f-descuento','f-tasa'].includes(e.target.id) || e.target.classList.contains('fi-cant') || e.target.classList.contains('fi-monto') || e.target.classList.contains('fi-tipo'))
                recalcTotals();
        });
        contentArea.addEventListener('change', function(e) {
            if (e.target.classList.contains('fi-tipo')) recalcTotals();
        });

        function recalcTotals() {
            if (!currentVenta) return;
            const subProd = (currentVenta.productos||[]).reduce((s,p)=>s+(p.subtotal||0),0);
            document.getElementById('f-sub-prod').textContent = subProd.toFixed(2);

            let totalAdic = 0;
            addItemsTbody.querySelectorAll('tr').forEach(row => {
                const cant = parseFloat(row.querySelector('.fi-cant').value)||0;
                const monto = parseFloat(row.querySelector('.fi-monto').value)||0;
                const tipo = row.querySelector('.fi-tipo').value;
                totalAdic += tipo==='ADICION' ? cant*monto : -(cant*monto);
            });
            document.getElementById('f-sub-adic').textContent = totalAdic.toFixed(2);

            const desc = parseFloat(document.getElementById('f-descuento').value)||0;
            const tasa = parseFloat(document.getElementById('f-tasa').value)||0;
            const base = subProd + totalAdic - desc;
            const imp = Math.max(0,base)*(tasa/100);
            document.getElementById('f-impuestos').textContent = imp.toFixed(2);
            document.getElementById('f-total-final').textContent = (base + imp).toFixed(2);
        }

        // Generate invoice
        document.getElementById('f-generate-btn').addEventListener('click', () => {
            if (!currentVenta) { showToast('Primero carga una venta.', false); return; }
            const items = [];
            addItemsTbody.querySelectorAll('tr').forEach(row => {
                items.push({
                    descripcion: row.querySelector('.fi-desc').value,
                    cantidad: parseInt(row.querySelector('.fi-cant').value)||0,
                    montoUnitario: parseFloat(row.querySelector('.fi-monto').value)||0,
                    tipo: row.querySelector('.fi-tipo').value
                });
            });
            const payload = {
                ventaId: currentVenta.ventaId,
                tasaImpuesto: parseFloat(document.getElementById('f-tasa').value)||0,
                descuentoGlobal: parseFloat(document.getElementById('f-descuento').value)||0,
                itemsAdicionales: items
            };
            fetch(API + 'facturacion', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) })
                .then(r=>r.json().then(b=>({status:r.status,body:b})))
                .then(({status,body}) => {
                    const ok = status===200;
                    showToast(body.message||(ok?'Factura guardada.':'Error'), ok);
                    if (ok) document.getElementById('f-generate-btn').disabled=true;
                })
                .catch(() => showToast('Error de conexión.', false));
        });

        // Print conformity
        document.getElementById('f-print-conf-btn').addEventListener('click', () => {
            if (!currentVenta) return;
            let rows = (currentVenta.productos||[]).map(p => `<tr><td style="text-align:center">${p.cantidad||0}</td><td>${esc(p.nombre||'')}</td><td>${esc(p.ubicacion||'')}</td><td>..................</td></tr>`).join('');
            const w = window.open('','_blank');
            w.document.write(`<html><head><title>Conformidad</title><style>body{font-family:Arial;margin:30px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ccc;padding:8px}</style></head><body><h1>Hoja de Conformidad</h1><p><strong>Cliente:</strong> ${esc(currentVenta.clienteNombre||'')}</p><p><strong>Referencia:</strong> ${esc(currentVenta.codigoVenta||'')}</p><table><thead><tr><th>Cantidad</th><th>Producto</th><th>Ubicación</th><th>Revisado (OK)</th></tr></thead><tbody>${rows}</tbody></table><div style="margin-top:40px">Firma: ____________________</div></body></html>`);
            w.document.close(); w.print();
        });

        // Print invoice
        document.getElementById('f-print-inv-btn').addEventListener('click', () => {
            if (!currentVenta) return;
            let rows = (currentVenta.productos||[]).map(p => `<tr><td>${esc(p.nombre||'')}</td><td style="text-align:center">${esc(p.ubicacion||'')}</td><td style="text-align:center">${p.cantidad||0}</td><td style="text-align:right">${(p.precioUnitario||0).toFixed(2)}</td><td style="text-align:right">${(p.subtotal||0).toFixed(2)}</td></tr>`).join('');
            const sub = document.getElementById('f-sub-prod').textContent;
            const adic = document.getElementById('f-sub-adic').textContent;
            const imp = document.getElementById('f-impuestos').textContent;
            const total = document.getElementById('f-total-final').textContent;
            const w = window.open('','_blank');
            w.document.write(`<html><head><title>Factura ${esc(currentVenta.codigoVenta||'')}</title><style>body{font-family:Arial;margin:20px;color:#222}.header{display:flex;justify-content:space-between;align-items:center}h1{margin:0}table{width:100%;border-collapse:collapse;margin-top:12px}th,td{border:1px solid #ddd;padding:8px;text-align:left}th{background:#f3f6f8;color:#003366}td.right{text-align:right}.totals{margin-top:12px;width:50%;float:right}.totals .row{display:flex;justify-content:space-between;padding:6px 0}</style></head><body><div class="header"><div><h1>FACTURA</h1><p><strong>Cliente:</strong> ${esc(currentVenta.clienteNombre||'')}</p><p><strong>Venta:</strong> ${esc(currentVenta.codigoVenta||'')}</p><p><strong>Fecha:</strong> ${formatDate(currentVenta.fechaVenta)}</p></div><div style="font-size:40px;font-weight:700;color:#c0392b">M</div></div><h3>Productos</h3><table><thead><tr><th>Producto</th><th style="text-align:center">Ubicación</th><th style="text-align:center">Cant.</th><th style="text-align:right">Precio U.</th><th style="text-align:right">Subtotal</th></tr></thead><tbody>${rows}</tbody></table><div class="totals"><div class="row"><div>Subtotal:</div><div>${sub}</div></div><div class="row"><div>Adicionales:</div><div>${adic}</div></div><div class="row"><div>Impuestos:</div><div>${imp}</div></div><div class="row" style="font-weight:700"><div>TOTAL:</div><div>${total}</div></div></div><div style="clear:both;margin-top:60px"><strong>Observaciones:</strong> __________________________</div></body></html>`);
            w.document.close(); w.print();
        });
    }

})();
