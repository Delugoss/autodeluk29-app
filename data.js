const database = {
    "sentra": {
        name: "Nissan Sentra 2018",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/2018_Nissan_Sentra_SV_2_1.8L_front_3.19.19.jpg/800px-2018_Nissan_Sentra_SV_2_1.8L_front_3.19.19.jpg",
        components: {
            "ckp": {
                title: "Sensor CKP (Cigüeñal)",
                pins: 3,
                data: [
                    { id: 1, hex: "#ff0000", txt: "12V Alimentación (Ignición)" },
                    { id: 2, hex: "#000000", txt: "Tierra (Masa)" },
                    { id: 3, hex: "#00ff00", txt: "Señal (Onda Cuadrada)" }
                ]
            },
            "maf": {
                title: "Sensor MAF",
                pins: 5,
                data: [
                    { id: 1, hex: "#ffff00", txt: "Señal IAT" },
                    { id: 2, hex: "#000000", txt: "Tierra" },
                    { id: 3, hex: "#ff0000", txt: "12V Batería" },
                    { id: 4, hex: "#00e5ff", txt: "5V Referencia" },
                    { id: 5, hex: "#00ff00", txt: "Señal Flujo" }
                ]
            }
        },
        procedures: {
            "oil": {
                title: "Reset Vida Aceite",
                steps: [
                    { text: "1. Poner ignición en ON (Motor apagado).", time: 0 },
                    { text: "2. Presionar botones de menú hasta ver 'Settings'.", time: 0 },
                    { text: "3. Bajar a 'Maintenance' > 'Oil and Filter'.", time: 0 },
                    { text: "4. Seleccionar 'Reset' y confirmar.", time: 0 },
                    { text: "5. Apagar y encender para verificar.", time: 5 }
                ]
            },
            "etb": {
                title: "Aprendizaje Cuerpo Aceleración",
                steps: [
                    { text: "1. Motor en temperatura normal. Apagar.", time: 0 },
                    { text: "2. Encender espera 2s. Apagar espera 10s.", time: 10 },
                    { text: "3. Encender espera 2s. Apagar espera 10s.", time: 10 },
                    { text: "4. Acelerar a fondo 2s y soltar.", time: 2 }
                ]
            }
        }
    },
    "corolla": {
        name: "Toyota Corolla 2020",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/2020_Toyota_Corolla_LE%2C_front_12.21.19.jpg/800px-2020_Toyota_Corolla_LE%2C_front_12.21.19.jpg",
        components: {
            "cmp": {
                title: "Sensor CMP (Árbol Levas)",
                pins: 3,
                data: [
                    { id: 1, hex: "#00e5ff", txt: "VC (5V)" },
                    { id: 2, hex: "#00ff00", txt: "Señal" },
                    { id: 3, hex: "#000000", txt: "Masa" }
                ]
            }
        },
        procedures: {
            "tpms": {
                title: "Reset TPMS (Llantas)",
                steps: [
                    { text: "1. Inflar llantas a presión correcta.", time: 0 },
                    { text: "2. Poner contacto ON.", time: 0 },
                    { text: "3. Presionar botón SET bajo el volante.", time: 0 },
                    { text: "4. Mantener presionado hasta que testigo parpadee 3 veces.", time: 3 }
                ]
            }
        }   
    }
};
    
};
