

JavaScript

/* ARCHIVO DE BASE DE DATOS - AutoDeluK29
   Aquí es donde agregarás todos los autos nuevos.
*/

const database = {
    // --- TOYOTA ---
    "corolla": {
        name: "Toyota Corolla 2020 (1.8L)",
        img: "https://images.unsplash.com/photo-1621007947382-bb3c3968e3bb?auto=format&fit=crop&w=1600&q=80", // Foto Motor Corolla
        components: {
            "maf": { 
                title: "Sensor MAF (Flujo Aire)", 
                pins: 5, 
                data: [
                    {id:1, txt:"+B (12V)", hex:"#ff0000"}, 
                    {id:2, txt:"Vacío", hex:"#444"},
                    {id:3, txt:"VG (Señal)", hex:"#ffff00"},
                    {id:4, txt:"THA (Temp)", hex:"#00ff00"},
                    {id:5, txt:"E2 (Masa)", hex:"#ffffff"}
                ] 
            },
            "alt": {
                title: "Alternador (Regulador)",
                pins: 4,
                data: [
                    {id:1, txt:"S (Sense)", hex:"#ffffff"},
                    {id:2, txt:"IG (Ignición)", hex:"#ff0000"},
                    {id:3, txt:"M (Monitor)", hex:"#ffff00"},
                    {id:4, txt:"L (Lámpara)", hex:"#0000ff"}
                ]
            }
        },
        procedures: {
            "throttle": {
                title: "Aprendizaje Cuerpo Aceleración",
                steps: [
                    { text: "Motor apagado. Llave en ON.", time: 0 },
                    { text: "Espere 30 seg sin tocar pedal.", time: 30 },
                    { text: "Gire a OFF y espere.", time: 10 },
                    { text: "Encienda el motor.", time: 0 }
                ]
            }
        }
    },

    // --- NISSAN (NUEVO EJEMPLO) ---
    "sentra": {
        name: "Nissan Sentra B17 (1.8L)",
        img: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1600&q=80", // Foto Motor Nissan
        components: {
            "maf": {
                title: "Sensor MAF (Nissan)",
                pins: 4, // Nissan usa 4 pines a veces
                data: [
                    {id:1, txt:"Alimentación 12V", hex:"#ff0000"},
                    {id:2, txt:"Masa", hex:"#000000"},
                    {id:3, txt:"Señal MAF 0-5V", hex:"#ffff00"},
                    {id:4, txt:"Señal IAT", hex:"#0000ff"}
                ]
            },
            "ckp": { // Nuevo componente: Sensor Cigüeñal
                title: "Sensor CKP (Cigüeñal)",
                pins: 3,
                data: [
                    {id:1, txt:"VCC (5V)", hex:"#ffa500"},
                    {id:2, txt:"Señal", hex:"#ffff00"},
                    {id:3, txt:"GND", hex:"#000000"}
                ]
            }
        },
        procedures: {
            "oil": { // Procedimiento diferente
                title: "Reset Vida de Aceite",
                steps: [
                    { text: "Poner llave en ON.", time: 0 },
                    { text: "Ir a Menú > Mantenimiento.", time: 0 },
                    { text: "Seleccionar Reset y confirmar.", time: 0 },
                    { text: "Apagar llave 10 seg.", time: 10 }
                ]
            }
        }
    }
};

HTML

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AutoDeluK29 - Profesional</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        /* ESTILOS (Igual que V4 pero optimizados) */
        :root { --primary: #00e5ff; --bg-body: #0a0e17; --bg-panel: #151a23; --text: #fff; --text-dim: #8b9bb4; --success: #00e676; --pin-active: #ffeb3b; }
        body { font-family: 'Segoe UI', Roboto, sans-serif; background: var(--bg-body); color: var(--text); margin: 0; padding-bottom: 50px; }
        
        /* Header & Search */
        header { background: rgba(21, 26, 35, 0.95); padding: 15px 20px; border-bottom: 1px solid #333; display: flex; justify-content: space-between; position: sticky; top: 0; z-index: 100; backdrop-filter: blur(10px); }
        .brand { font-size: 1.5rem; font-weight: 800; } .brand span { color: var(--primary); }
        .search-area { padding: 30px 20px; background: radial-gradient(circle at center, #1e2736 0%, var(--bg-body) 70%); text-align: center; }
        input { width: 90%; max-width: 500px; padding: 15px 25px; border-radius: 30px; border: 2px solid #333; background: #111; color: #fff; outline: none; transition: 0.3s; font-size: 1.1rem; }
        input:focus { border-color: var(--primary); box-shadow: 0 0 15px rgba(0,229,255,0.3); }

        /* Workspace */
        #workspace { max-width: 1000px; margin: 0 auto; padding: 20px; display: none; }
        .section-title { color: var(--text-dim); margin: 30px 0 15px 0; border-bottom: 1px solid #333; padding-bottom: 10px; }
        
        /* Viewer */
        .viewer { position: relative; height: 350px; background: #000; border-radius: 12px; border: 2px solid #333; overflow: hidden; }
        .viewer img { width: 100%; height: 100%; object-fit: cover; opacity: 0.7; }
        .hotspot { position: absolute; width: 30px; height: 30px; background: rgba(0,229,255,0.2); border: 2px solid var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; animation: pulse 2s infinite; color: #fff; z-index: 10; }
        @keyframes pulse { 0% {box-shadow: 0 0 0 0 rgba(0,229,255,0.7);} 100% {box-shadow: 0 0 0 15px rgba(0,229,255,0);} }

        /* Grid */
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; }
        .card { background: var(--bg-panel); padding: 15px; border-radius: 10px; border: 1px solid #333; cursor: pointer; text-align: center; transition: 0.2s; }
        .card:hover { border-color: var(--primary); transform: translateY(-3px); background: #222; }
        .card i { font-size: 2rem; color: var(--text-dim); margin-bottom: 10px; display: block; }

        /* Modals */
        .modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 200; display: none; align-items: center; justify-content: center; }
        .modal-box { background: #1a212d; width: 90%; max-width: 400px; border-radius: 15px; border: 1px solid var(--primary); overflow: hidden; box-shadow: 0 0 30px rgba(0,0,0,0.5); }
        .modal-header { padding: 15px; background: #111; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; }
        .modal-body { padding: 20px; max-height: 60vh; overflow-y: auto; }

        /* Pinout Visuals */
        .connector { display: grid; gap: 5px; justify-content: center; background: #222; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
        .pin { width: 25px; height: 25px; border: 1px solid #555; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: #777; border-radius: 3px; }
        .pin.active { background: var(--pin-active); color: #000; font-weight: bold; border-color: #fff; transform: scale(1.2); box-shadow: 0 0 10px var(--pin-active); }
        
        .list-item { padding: 10px; border-bottom: 1px solid #333; cursor: pointer; display: flex; align-items: center; }
        .list-item:hover { background: #222; }
        .dot { width: 12px; height: 12px; border-radius: 50%; margin-right: 10px; border: 1px solid #fff; }

        /* Wizard */
        .step { background: rgba(255,255,255,0.05); margin-bottom: 10px; padding: 15px; border-radius: 8px; display: flex; gap: 10px; }
        .step.done { opacity: 0.4; border: 1px solid var(--success); }
        .check { min-width: 25px; height: 25px; border: 2px solid #555; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .step.done .check { background: var(--success); border-color: var(--success); color: #000; }
        .timer { background: #ff9800; border: none; padding: 5px 10px; border-radius: 4px; color: #fff; cursor: pointer; margin-top: 5px; font-size: 0.8rem; }
    </style>
</head>
<body>
    <header>
        <div class="brand">AutoDeluK<span>29</span></div>
        <small style="color:#aaa">V5.0 Database</small>
    </header>

    <div class="search-area">
        <input type="text" id="search" placeholder="Buscar: Corolla, Sentra..." onkeyup="handleSearch(event)">
    </div>

    <div id="workspace">
        <h2 id="carTitle" style="color:var(--primary)"></h2>
        
        <div class="section-title">Componentes</div>
        <div class="viewer" id="viewer">
            <img id="carImg" src="">
            <div id="hotspotContainer"></div>
        </div>

        <div class="section-title">Procedimientos y Servicios</div>
        <div class="grid" id="procGrid">
            </div>
    </div>

    <div id="modal" class="modal">
        <div class="modal-box">
            <div class="modal-header">
                <h3 id="mTitle" style="margin:0">Título</h3>
                <i class="fas fa-times" onclick="closeModal()" style="cursor:pointer"></i>
            </div>
            <div id="mBody" class="modal-body"></div>
        </div>
    </div>

    <script src="data.js"></script>

    <script>
        // --- LOGICA DE LA APP ---
        let currentCar = null;

        function handleSearch(e) {
            if(e.key !== "Enter") return;
            const query = e.target.value.toLowerCase();
            const keys = Object.keys(database);
            
            // Buscar coincidencia parcial (ej: "sent" encuentra "sentra")
            const foundKey = keys.find(k => k.includes(query) || query.includes(k));

            if(foundKey) {
                loadCar(foundKey);
            } else {
                alert("Auto no encontrado en la base de datos local.");
            }
        }

        function loadCar(key) {
            currentCar = database[key];
            document.getElementById('workspace').style.display = 'block';
            document.getElementById('carTitle').innerText = currentCar.name;
            document.getElementById('carImg').src = currentCar.img;

            // 1. Cargar Hotspots de Componentes
            const hsContainer = document.getElementById('hotspotContainer');
            hsContainer.innerHTML = "";
            
            // Posiciones simuladas para el ejemplo (en realidad irían en la DB)
            const positions = [
                {top: '30%', left: '40%'}, {top: '50%', left: '60%'}, {top: '20%', left: '70%'}
            ];
            
            let i = 0;
            for(const [compId, compData] of Object.entries(currentCar.components)) {
                // Crear botón en la imagen
                const pos = positions[i] || {top: '50%', left: '50%'};
                hsContainer.innerHTML += `
                    <div class="hotspot" style="top:${pos.top}; left:${pos.left}" onclick="openPinout('${compId}')">
                        <i class="fas fa-bolt"></i>
                    </div>
                `;
                i++;
            }

            // 2. Cargar Botones de Procedimientos
            const procGrid = document.getElementById('procGrid');
            procGrid.innerHTML = "";
            if(currentCar.procedures) {
                for(const [procId, procData] of Object.entries(currentCar.procedures)) {
                    procGrid.innerHTML += `
                        <div class="card" onclick="openProcedure('${procId}')">
                            <i class="fas fa-cogs"></i>
                            <div>${procData.title}</div>
                        </div>
                    `;
                }
            } else {
                procGrid.innerHTML = "<p>No hay procedimientos cargados.</p>";
            }
        }

        // --- FUNCIONES PINOUT ---
        function openPinout(compId) {
            const comp = currentCar.components[compId];
            const modal = document.getElementById('modal');
            const body = document.getElementById('mBody');
            
            document.getElementById('mTitle').innerText = comp.title;
            modal.style.display = "flex";

            // Dibujar Conector
            let html = `<div class="connector" style="grid-template-columns: repeat(${comp.pins > 4 ? 5 : comp.pins}, 1fr)">`;
            for(let j=1; j<=comp.pins; j++) html += `<div class="pin" id="p${j}">${j}</div>`;
            html += `</div>`;

            // Dibujar Lista
            html += `<div>`;
            comp.data.forEach(d => {
                html += `
                <div class="list-item" onclick="highlight(${d.id})">
                    <div class="dot" style="background:${d.hex}"></div>
                    <div><b>Pin ${d.id}:</b> ${d.txt}</div>
                </div>`;
            });
            html += `</div>`;
            
            body.innerHTML = html;
        }

        function highlight(id) {
            document.querySelectorAll('.pin').forEach(p => p.classList.remove('active'));
            const p = document.getElementById(`p${id}`);
            if(p) p.classList.add('active');
        }

        // --- FUNCIONES WIZARD ---
        function openProcedure(procId) {
            const proc = currentCar.procedures[procId];
            const modal = document.getElementById('modal');
            const body = document.getElementById('mBody');
            
            document.getElementById('mTitle').innerText = proc.title;
            modal.style.display = "flex";

            let html = ``;
            proc.steps.forEach((step, idx) => {
                html += `
                <div class="step" id="st${idx}">
                    <div class="check" onclick="toggleStep(${idx})"><i class="fas fa-check"></i></div>
                    <div style="flex:1">
                        <div>${step.text}</div>
                        ${step.time > 0 ? `<button class="timer" onclick="startTimer(this, ${step.time})"><i class="fas fa-stopwatch"></i> ${step.time}s</button>` : ''}
                    </div>
                </div>`;
            });
            body.innerHTML = html;
        }

        function toggleStep(idx) {
            document.getElementById(`st${idx}`).classList.toggle('done');
        }

        function startTimer(btn, sec) {
            let s = sec;
            btn.disabled = true;
            const int = setInterval(() => {
                s--;
                btn.innerText = `... ${s}s`;
                if(s <= 0) {
                    clearInterval(int);
                    btn.innerText = "¡Listo!";
                    btn.style.background = "var(--success)";
                    btn.style.color = "black";
                }
            }, 1000);
        }

        function closeModal() { document.getElementById('modal').style.display = "none"; }
    </script>
</body>
</html>

JavaScript

{
   modelo: "Nissan Sentra 2018",
   motor: "MR20DD",
   diagramas: { ... },
   fallas: { ... }
}