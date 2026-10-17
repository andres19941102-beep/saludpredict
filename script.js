/* =====================================================
   SALUDPREDICT
   SISTEMA DE GESTIÓN INTELIGENTE EN SALUD
===================================================== */

document.addEventListener("DOMContentLoaded", () => {


    /* =================================================
       CONFIGURACIÓN
    ================================================= */

    const STORAGE = {

        patients:
            "saludpredict_patients",

        services:
            "saludpredict_services",

        inventory:
            "saludpredict_inventory",

        budget:
            "saludpredict_budget"

    };


    const BUDGET_APPROVED_VALUE =
        1000000000;


    /* =================================================
       DATOS DE DEMOSTRACIÓN
    ================================================= */

    const demoPatients = [

        {
            id: "P001",
            document: "10234567",
            name: "Juan Pérez",
            age: 42,
            service: "Medicina general",
            status: "Activo",
            createdAt: "2026-10-02"
        },

        {
            id: "P002",
            document: "52345678",
            name: "María Gómez",
            age: 35,
            service: "Consulta externa",
            status: "Activo",
            createdAt: "2026-09-18"
        },

        {
            id: "P003",
            document: "80123456",
            name: "Carlos Rodríguez",
            age: 58,
            service: "Atención de urgencias",
            status: "Activo",
            createdAt: "2026-10-01"
        },

        {
            id: "P004",
            document: "107890123",
            name: "Laura Martínez",
            age: 29,
            service: "Odontología general",
            status: "Inactivo",
            createdAt: "2026-08-15"
        },

        {
            id: "P005",
            document: "45678123",
            name: "Andrés Torres",
            age: 51,
            service: "Cardiología",
            status: "Activo",
            createdAt: "2026-09-29"
        },

        {
            id: "P006",
            document: "23456789",
            name: "Diana Ramírez",
            age: 46,
            service: "Ginecología",
            status: "Activo",
            createdAt: "2026-09-30"
        },

        {
            id: "P007",
            document: "34567890",
            name: "Felipe Moreno",
            age: 63,
            service: "Gastroenterología",
            status: "Activo",
            createdAt: "2026-09-20"
        },

        {
            id: "P008",
            document: "56789012",
            name: "Natalia Castro",
            age: 31,
            service: "Laboratorio clínico",
            status: "Activo",
            createdAt: "2026-10-03"
        },

        {
            id: "P009",
            document: "67890123",
            name: "Sergio Herrera",
            age: 55,
            service: "Imágenes diagnósticas",
            status: "Activo",
            createdAt: "2026-09-12"
        },

        {
            id: "P010",
            document: "78901234",
            name: "Paula Rojas",
            age: 27,
            service: "Promoción y prevención",
            status: "Activo",
            createdAt: "2026-10-02"
        },

        {
            id: "P011",
            document: "89012345",
            name: "Miguel Vargas",
            age: 67,
            service: "Hospitalización",
            status: "Activo",
            createdAt: "2026-09-10"
        },

        {
            id: "P012",
            document: "90123456",
            name: "Camila Suárez",
            age: 39,
            service: "Medicina general",
            status: "Activo",
            createdAt: "2026-10-01"
        },

        {
            id: "P013",
            document: "11223344",
            name: "Ricardo Cárdenas",
            age: 48,
            service: "Cardiología",
            status: "Activo",
            createdAt: "2026-08-28"
        },

        {
            id: "P014",
            document: "22334455",
            name: "Sandra López",
            age: 44,
            service: "Ginecología",
            status: "Activo",
            createdAt: "2026-09-27"
        }

    ];


    const demoServices = [

        {
            id: "S001",
            code: "SER-001",
            name: "Medicina general",
            category: "Consulta",
            duration: "30 min",
            price: 85000,
            status: "Activo"
        },

        {
            id: "S002",
            code: "SER-002",
            name: "Consulta externa",
            category: "Consulta",
            duration: "30 min",
            price: 75000,
            status: "Activo"
        },

        {
            id: "S003",
            code: "SER-003",
            name: "Atención de urgencias",
            category: "Urgencias",
            duration: "60 min",
            price: 120000,
            status: "Activo"
        },

        {
            id: "S004",
            code: "SER-004",
            name: "Hospitalización",
            category: "Hospitalización",
            duration: "24 horas",
            price: 350000,
            status: "Activo"
        },

        {
            id: "S005",
            code: "SER-005",
            name: "Odontología general",
            category: "Odontología",
            duration: "45 min",
            price: 90000,
            status: "Activo"
        },

        {
            id: "S006",
            code: "SER-006",
            name: "Laboratorio clínico",
            category: "Diagnóstico",
            duration: "20 min",
            price: 45000,
            status: "Activo"
        },

        {
            id: "S007",
            code: "SER-007",
            name: "Cardiología",
            category: "Consulta",
            duration: "40 min",
            price: 145000,
            status: "Activo"
        },

        {
            id: "S008",
            code: "SER-008",
            name: "Ginecología",
            category: "Consulta",
            duration: "40 min",
            price: 135000,
            status: "Activo"
        },

        {
            id: "S009",
            code: "SER-009",
            name: "Gastroenterología",
            category: "Consulta",
            duration: "45 min",
            price: 155000,
            status: "Activo"
        },

        {
            id: "S010",
            code: "SER-010",
            name: "Imágenes diagnósticas",
            category: "Diagnóstico",
            duration: "60 min",
            price: 180000,
            status: "Activo"
        },

        {
            id: "S011",
            code: "SER-011",
            name: "Procedimiento menor",
            category: "Procedimiento",
            duration: "50 min",
            price: 210000,
            status: "Activo"
        },

        {
            id: "S012",
            code: "SER-012",
            name: "Promoción y prevención",
            category: "Promoción y prevención",
            duration: "30 min",
            price: 60000,
            status: "Activo"
        },

        {
            id: "S013",
            code: "SER-013",
            name: "Fisioterapia",
            category: "Procedimiento",
            duration: "45 min",
            price: 95000,
            status: "Inactivo"
        }

    ];


    const demoInventory = [

        {
            id: "I001",
            code: "MED-001",
            name: "Acetaminofén 500 mg",
            category: "Medicamentos",
            unit: "Caja",
            stock: 250,
            minStock: 50,
            expiry: "2027-06-30",
            price: 850,
            status: "Activo"
        },

        {
            id: "I002",
            code: "MED-002",
            name: "Ibuprofeno 400 mg",
            category: "Medicamentos",
            unit: "Caja",
            stock: 120,
            minStock: 30,
            expiry: "2027-03-15",
            price: 1200,
            status: "Activo"
        },

        {
            id: "I003",
            code: "INS-001",
            name: "Guantes de nitrilo",
            category: "Insumos médicos",
            unit: "Caja",
            stock: 500,
            minStock: 100,
            expiry: "",
            price: 450,
            status: "Activo"
        },

        {
            id: "I004",
            code: "INS-002",
            name: "Jeringas 5 ml",
            category: "Insumos médicos",
            unit: "Unidad",
            stock: 35,
            minStock: 50,
            expiry: "2028-01-20",
            price: 700,
            status: "Activo"
        },

        {
            id: "I005",
            code: "LAB-001",
            name: "Tubos de ensayo",
            category: "Laboratorio",
            unit: "Caja",
            stock: 180,
            minStock: 40,
            expiry: "",
            price: 950,
            status: "Activo"
        },

        {
            id: "I006",
            code: "MAT-001",
            name: "Gasas estériles",
            category: "Material quirúrgico",
            unit: "Paquete",
            stock: 25,
            minStock: 30,
            expiry: "2027-08-10",
            price: 600,
            status: "Activo"
        },

        {
            id: "I007",
            code: "MED-003",
            name: "Amoxicilina 500 mg",
            category: "Medicamentos",
            unit: "Caja",
            stock: 80,
            minStock: 25,
            expiry: "2026-11-15",
            price: 3200,
            status: "Activo"
        },

        {
            id: "I008",
            code: "MED-004",
            name: "Solución salina 0.9%",
            category: "Medicamentos",
            unit: "Bolsa",
            stock: 40,
            minStock: 30,
            expiry: "2026-10-25",
            price: 4800,
            status: "Activo"
        },

        {
            id: "I009",
            code: "INS-003",
            name: "Mascarillas quirúrgicas",
            category: "Insumos médicos",
            unit: "Caja",
            stock: 320,
            minStock: 80,
            expiry: "2028-05-01",
            price: 300,
            status: "Activo"
        },

        {
            id: "I010",
            code: "LAB-002",
            name: "Reactivo hematología",
            category: "Laboratorio",
            unit: "Kit",
            stock: 18,
            minStock: 10,
            expiry: "2027-01-30",
            price: 18500,
            status: "Activo"
        },

        {
            id: "I011",
            code: "MAT-002",
            name: "Suturas nylon 3-0",
            category: "Material quirúrgico",
            unit: "Caja",
            stock: 12,
            minStock: 15,
            expiry: "2027-02-28",
            price: 24000,
            status: "Activo"
        },

        {
            id: "I012",
            code: "MED-005",
            name: "Omeprazol 20 mg",
            category: "Medicamentos",
            unit: "Caja",
            stock: 95,
            minStock: 25,
            expiry: "2027-09-12",
            price: 2700,
            status: "Activo"
        }

    ];


    const demoBudget = [

        {
            id: "B001",
            concept: "Personal asistencial y administrativo",
            category: "Personal",
            amount: 280000000,
            status: "Ejecutado"
        },

        {
            id: "B002",
            concept: "Medicamentos",
            category: "Medicamentos",
            amount: 95000000,
            status: "Ejecutado"
        },

        {
            id: "B003",
            concept: "Insumos médicos",
            category: "Insumos",
            amount: 75000000,
            status: "Ejecutado"
        },

        {
            id: "B004",
            concept: "Mantenimiento institucional",
            category: "Mantenimiento",
            amount: 45000000,
            status: "Ejecutado"
        },

        {
            id: "B005",
            concept: "Tecnología",
            category: "Tecnología",
            amount: 35000000,
            status: "Ejecutado"
        },

        {
            id: "B006",
            concept: "Equipos biomédicos",
            category: "Equipos biomédicos",
            amount: 80000000,
            status: "Ejecutado"
        },

        {
            id: "B007",
            concept: "Infraestructura",
            category: "Infraestructura",
            amount: 60000000,
            status: "Ejecutado"
        },

        {
            id: "B008",
            concept: "Capacitación",
            category: "Capacitación",
            amount: 22000000,
            status: "Ejecutado"
        },

        {
            id: "B009",
            concept: "Software y licencias",
            category: "Tecnología",
            amount: 28000000,
            status: "Ejecutado"
        },

        {
            id: "B010",
            concept: "Servicios públicos",
            category: "Servicios públicos",
            amount: 40000000,
            status: "Ejecutado"
        }

    ];


    /* =================================================
       FUNCIONES DE DATOS
    ================================================= */

    function loadData(key, fallback) {

        const raw =
            localStorage.getItem(key);

        if (raw === null) {

            localStorage.setItem(
                key,
                JSON.stringify(fallback)
            );

            return fallback;

        }

        try {

            return JSON.parse(raw);

        } catch (error) {

            localStorage.setItem(
                key,
                JSON.stringify(fallback)
            );

            return fallback;

        }

    }


    function saveData(key, data) {

        localStorage.setItem(
            key,
            JSON.stringify(data)
        );

    }


    function getPatients() {

        return loadData(
            STORAGE.patients,
            demoPatients
        );

    }


    function getServices() {

        return loadData(
            STORAGE.services,
            demoServices
        );

    }


    function getInventory() {

        const data =
            loadData(
                STORAGE.inventory,
                demoInventory
            );

        return data.map(item => ({

            ...item,

            unit:
                item.unit ||
                item.measurementUnit ||
                "Unidad",

            price:
                Number(
                    item.price ??
                    item.unitCost ??
                    item.inventoryUnitCost ??
                    0
                ),

            stock:
                Number(item.stock || 0),

            minStock:
                Number(item.minStock || 0)

        }));

    }


    function getBudget() {

        return loadData(
            STORAGE.budget,
            demoBudget
        );

    }


    /* =================================================
       UTILIDADES
    ================================================= */

    function formatCurrency(value) {

        return new Intl.NumberFormat(
            "es-CO",
            {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0
            }
        ).format(Number(value) || 0);

    }


    function formatNumber(value) {

        return new Intl.NumberFormat(
            "es-CO"
        ).format(Number(value) || 0);

    }


    function escapeHtml(value) {

        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    function generateId(prefix) {

        return prefix +
            Date.now() +
            Math.floor(
                Math.random() * 1000
            );

    }


    function daysUntil(dateString) {

        if (!dateString) {
            return Infinity;
        }

        const today =
            new Date();

        today.setHours(0, 0, 0, 0);

        const date =
            new Date(dateString + "T00:00:00");

        return Math.ceil(
            (date - today) /
            (1000 * 60 * 60 * 24)
        );

    }


    function statusBadge(status) {

        if (status === "Activo" ||
            status === "Ejecutado") {

            return `
                <span class="badge badge-success">
                    ${escapeHtml(status)}
                </span>
            `;

        }

        if (status === "Inactivo") {

            return `
                <span class="badge badge-danger">
                    Inactivo
                </span>
            `;

        }

        return `
            <span class="badge badge-warning">
                ${escapeHtml(status)}
            </span>
        `;

    }


    /* =================================================
       DATOS DEMO
    ================================================= */

    function ensureDemoData() {

        const keys = [

            STORAGE.patients,
            STORAGE.services,
            STORAGE.inventory,
            STORAGE.budget

        ];

        const allEmpty =
            keys.every(key => {

                const raw =
                    localStorage.getItem(key);

                if (raw === null) {
                    return true;
                }

                try {

                    return (
                        JSON.parse(raw).length === 0
                    );

                } catch {

                    return true;

                }

            });


        if (allEmpty) {

            saveData(
                STORAGE.patients,
                demoPatients
            );

            saveData(
                STORAGE.services,
                demoServices
            );

            saveData(
                STORAGE.inventory,
                demoInventory
            );

            saveData(
                STORAGE.budget,
                demoBudget
            );

        }

    }


    ensureDemoData();


    /* =================================================
       AMPLIACIÓN DE DATOS ACADÉMICOS DE DEMOSTRACIÓN
       Conserva los registros existentes y agrega únicamente
       los registros faltantes. Todos los datos generados son ficticios.
    ================================================= */

    const expandedServiceCatalog = [
        { code: "SER-014", name: "Pediatría", category: "Consulta", duration: "40 min", price: 125000 },
        { code: "SER-015", name: "Medicina interna", category: "Consulta", duration: "40 min", price: 135000 },
        { code: "SER-016", name: "Neurología", category: "Consulta", duration: "45 min", price: 165000 },
        { code: "SER-017", name: "Dermatología", category: "Consulta", duration: "30 min", price: 140000 },
        { code: "SER-018", name: "Ortopedia", category: "Consulta", duration: "40 min", price: 150000 },
        { code: "SER-019", name: "Urología", category: "Consulta", duration: "40 min", price: 145000 },
        { code: "SER-020", name: "Oftalmología", category: "Consulta", duration: "35 min", price: 130000 },
        { code: "SER-021", name: "Psiquiatría", category: "Consulta", duration: "50 min", price: 160000 },
        { code: "SER-022", name: "Psicología", category: "Consulta", duration: "45 min", price: 95000 },
        { code: "SER-023", name: "Nutrición", category: "Consulta", duration: "30 min", price: 80000 },
        { code: "SER-024", name: "Vacunación", category: "Procedimiento", duration: "20 min", price: 35000 },
        { code: "SER-025", name: "Toma de muestras", category: "Diagnóstico", duration: "15 min", price: 25000 },
        { code: "SER-026", name: "Radiografía", category: "Diagnóstico", duration: "25 min", price: 70000 },
        { code: "SER-027", name: "Ecografía", category: "Diagnóstico", duration: "35 min", price: 110000 },
        { code: "SER-028", name: "Electrocardiograma", category: "Diagnóstico", duration: "20 min", price: 55000 },
        { code: "SER-029", name: "Curaciones", category: "Procedimiento", duration: "25 min", price: 45000 },
        { code: "SER-030", name: "Terapia respiratoria", category: "Procedimiento", duration: "30 min", price: 65000 },
        { code: "SER-031", name: "Planificación familiar", category: "Promoción y prevención", duration: "30 min", price: 60000 },
        { code: "SER-032", name: "Control prenatal", category: "Promoción y prevención", duration: "35 min", price: 90000 },
        { code: "SER-033", name: "Vacunación infantil", category: "Promoción y prevención", duration: "20 min", price: 40000 }
    ];

    const expandedInventoryCatalog = [
        ["MED-006", "Loratadina 10 mg", "Medicamentos", "Caja", 2200],
        ["MED-007", "Cetirizina 10 mg", "Medicamentos", "Caja", 2600],
        ["MED-008", "Sales de rehidratación oral", "Medicamentos", "Sobre", 1800],
        ["MED-009", "Metformina 850 mg", "Medicamentos", "Caja", 4200],
        ["MED-010", "Losartán 50 mg", "Medicamentos", "Caja", 3900],
        ["MED-011", "Enalapril 10 mg", "Medicamentos", "Caja", 3100],
        ["MED-012", "Amlodipino 5 mg", "Medicamentos", "Caja", 3600],
        ["MED-013", "Atorvastatina 20 mg", "Medicamentos", "Caja", 5800],
        ["MED-014", "Furosemida 40 mg", "Medicamentos", "Caja", 2800],
        ["MED-015", "Hidroclorotiazida 25 mg", "Medicamentos", "Caja", 2500],
        ["MED-016", "Dexametasona 4 mg", "Medicamentos", "Ampolla", 1700],
        ["MED-017", "Diclofenaco 75 mg", "Medicamentos", "Ampolla", 2300],
        ["MED-018", "Lidocaína 2%", "Medicamentos", "Frasco", 6200],
        ["MED-019", "Metoclopramida 10 mg", "Medicamentos", "Ampolla", 1500],
        ["MED-020", "Ondansetrón 4 mg", "Medicamentos", "Ampolla", 4800],
        ["MED-021", "Cefalexina 500 mg", "Medicamentos", "Caja", 5200],
        ["MED-022", "Azitromicina 500 mg", "Medicamentos", "Caja", 7500],
        ["MED-023", "Ciprofloxacino 500 mg", "Medicamentos", "Caja", 4800],
        ["MED-024", "Salbutamol inhalador", "Medicamentos", "Unidad", 12500],
        ["MED-025", "Budesonida inhalador", "Medicamentos", "Unidad", 18500],
        ["MED-026", "Insulina humana", "Medicamentos", "Frasco", 22000],
        ["MED-027", "Levotiroxina 50 mcg", "Medicamentos", "Caja", 3400],
        ["MED-028", "Prednisolona 5 mg", "Medicamentos", "Caja", 3900],
        ["MED-029", "Clotrimazol crema", "Medicamentos", "Tubo", 4100],
        ["MED-030", "Miconazol crema", "Medicamentos", "Tubo", 4600],
        ["MED-031", "Suero fisiológico 500 ml", "Medicamentos", "Bolsa", 3200],
        ["MED-032", "Dextrosa al 5% 500 ml", "Medicamentos", "Bolsa", 3700],
        ["MED-033", "Ringer lactato 500 ml", "Medicamentos", "Bolsa", 3900],
        ["MED-034", "Vitamina K", "Medicamentos", "Ampolla", 5400],
        ["MED-035", "Complejo B", "Medicamentos", "Ampolla", 2900],
        ["INS-004", "Jeringas 3 ml", "Insumos médicos", "Unidad", 450],
        ["INS-005", "Jeringas 10 ml", "Insumos médicos", "Unidad", 850],
        ["INS-006", "Agujas hipodérmicas", "Insumos médicos", "Caja", 6800],
        ["INS-007", "Catéter intravenoso 20G", "Insumos médicos", "Unidad", 1800],
        ["INS-008", "Equipo de venoclisis", "Insumos médicos", "Unidad", 2600],
        ["INS-009", "Llaves de tres vías", "Insumos médicos", "Unidad", 2100],
        ["INS-010", "Batas desechables", "Insumos médicos", "Paquete", 9500],
        ["INS-011", "Gorros desechables", "Insumos médicos", "Paquete", 6200],
        ["INS-012", "Tapabocas N95", "Insumos médicos", "Unidad", 2800],
        ["INS-013", "Bajalenguas", "Insumos médicos", "Caja", 3900],
        ["INS-014", "Termómetros digitales", "Equipos e instrumentos", "Unidad", 12500],
        ["INS-015", "Tensiómetros", "Equipos e instrumentos", "Unidad", 68000],
        ["INS-016", "Oxímetros de pulso", "Equipos e instrumentos", "Unidad", 42000],
        ["MAT-003", "Apósitos estériles", "Material de curación", "Paquete", 1900],
        ["MAT-004", "Vendas elásticas", "Material de curación", "Unidad", 2400],
        ["MAT-005", "Esparadrapo hipoalergénico", "Material de curación", "Rollo", 3200],
        ["MAT-006", "Algodón hospitalario", "Material de curación", "Paquete", 2800],
        ["MAT-007", "Alcohol antiséptico", "Material de curación", "Frasco", 4300],
        ["MAT-008", "Clorhexidina", "Material de curación", "Frasco", 7800],
        ["LAB-003", "Tubos tapa lila", "Laboratorio", "Caja", 14500],
        ["LAB-004", "Tubos tapa roja", "Laboratorio", "Caja", 13800],
        ["LAB-005", "Tubos tapa azul", "Laboratorio", "Caja", 15900],
        ["LAB-006", "Puntas para micropipeta", "Laboratorio", "Rack", 18500],
        ["LAB-007", "Pruebas rápidas de glucosa", "Laboratorio", "Caja", 22500],
        ["LAB-008", "Tiras reactivas de orina", "Laboratorio", "Frasco", 16800],
        ["LAB-009", "Reactivo química sanguínea", "Laboratorio", "Kit", 52000],
        ["LAB-010", "Contenedores de muestras", "Laboratorio", "Paquete", 8900],
        ["ODN-001", "Guantes para odontología", "Odontología", "Caja", 16500],
        ["ODN-002", "Resina dental", "Odontología", "Jeringa", 28500],
        ["ODN-003", "Anestésico dental", "Odontología", "Caja", 32000],
        ["ODN-004", "Eyectores de saliva", "Odontología", "Paquete", 7400],
        ["QUI-001", "Suturas absorbibles", "Material quirúrgico", "Caja", 38500],
        ["QUI-002", "Bisturí desechable", "Material quirúrgico", "Unidad", 1800],
        ["QUI-003", "Campos quirúrgicos", "Material quirúrgico", "Paquete", 12500],
        ["ASE-001", "Detergente enzimático", "Aseo y desinfección", "Galón", 38500],
        ["ASE-002", "Desinfectante hospitalario", "Aseo y desinfección", "Galón", 29800],
        ["ASE-003", "Bolsas rojas para residuos", "Aseo y desinfección", "Paquete", 9200],
        ["ASE-004", "Guardianes para cortopunzantes", "Aseo y desinfección", "Unidad", 6800],
        ["EPP-001", "Gafas de protección", "Elementos de protección", "Unidad", 7200],
        ["EPP-002", "Careta facial", "Elementos de protección", "Unidad", 8500],
        ["EPP-003", "Delantales impermeables", "Elementos de protección", "Paquete", 14500],
        ["NUT-001", "Fórmula nutricional de apoyo", "Nutrición", "Lata", 28500],
        ["NUT-002", "Vasos graduados", "Nutrición", "Paquete", 4800]
    ];

    function expandAcademicDemoData() {
        const currentPatients = getPatients();
        if (currentPatients.length < 520) {
            const firstNames = ["Ana", "Andrés", "Beatriz", "Camilo", "Carolina", "Carlos", "Catalina", "Daniel", "Diana", "Diego", "Elena", "Felipe", "Gabriela", "Héctor", "Isabel", "Javier", "Juliana", "Laura", "Luis", "Marcela", "María", "Mateo", "Natalia", "Nicolás", "Paola", "Pedro", "Ricardo", "Sandra", "Santiago", "Sofía", "Valentina", "Wilson"];
            const surnames = ["García", "Rodríguez", "Martínez", "López", "Gómez", "Pérez", "Sánchez", "Ramírez", "Torres", "Díaz", "Vargas", "Castro", "Rojas", "Moreno", "Muñoz", "Ortiz", "Jiménez", "Álvarez", "Ruiz", "Herrera", "Medina", "Silva", "Reyes", "Cárdenas", "Navarro", "Mendoza"];
            const serviceNames = [...demoServices, ...expandedServiceCatalog].map(service => service.name);
            const existingDocuments = new Set(currentPatients.map(patient => String(patient.document || "")));
            let candidate = 1;
            while (currentPatients.length < 520) {
                const n = candidate++;
                const document = String(900000000 + n);
                if (existingDocuments.has(document)) continue;
                existingDocuments.add(document);
                const first = firstNames[(n * 7) % firstNames.length];
                const surname1 = surnames[(n * 3) % surnames.length];
                const surname2 = surnames[(n * 11 + 5) % surnames.length];
                const month = String(((n - 1) % 9) + 1).padStart(2, "0");
                const day = String(((n * 7) % 28) + 1).padStart(2, "0");
                currentPatients.push({
                    id: `PD${String(n).padStart(4, "0")}`,
                    document,
                    name: `${first} ${surname1} ${surname2}`,
                    age: 1 + ((n * 13) % 88),
                    service: serviceNames[(n * 5) % serviceNames.length],
                    status: n % 13 === 0 ? "Inactivo" : "Activo",
                    createdAt: `2026-${month}-${day}`,
                    demoRecord: true
                });
            }
            saveData(STORAGE.patients, currentPatients);
        }

        const currentServices = getServices();
        const serviceCodes = new Set(currentServices.map(service => String(service.code || "").toUpperCase()));
        expandedServiceCatalog.forEach((service, index) => {
            if (!serviceCodes.has(service.code)) {
                currentServices.push({ id: `SD${String(index + 1).padStart(3, "0")}`, ...service, status: "Activo" });
                serviceCodes.add(service.code);
            }
        });
        saveData(STORAGE.services, currentServices);

        const currentInventory = getInventory();
        const inventoryCodes = new Set(currentInventory.map(item => String(item.code || "").toUpperCase()));
        expandedInventoryCatalog.forEach((item, index) => {
            const [code, name, category, unit, price] = item;
            if (!inventoryCodes.has(code)) {
                const stock = 35 + ((index * 17) % 240);
                const minStock = 15 + ((index * 7) % 45);
                const month = String((index % 12) + 1).padStart(2, "0");
                const day = String((index * 3 % 27) + 1).padStart(2, "0");
                currentInventory.push({
                    id: `ID${String(index + 1).padStart(3, "0")}`,
                    code, name, category, unit, stock, minStock,
                    expiry: category === "Equipos e instrumentos" ? "" : `2027-${month}-${day}`,
                    price,
                    status: "Activo",
                    demoRecord: true
                });
                inventoryCodes.add(code);
            }
        });
        saveData(STORAGE.inventory, currentInventory);
    }

    function calculateOperationalProjection() {
        const patients = getPatients();
        const services = getServices();
        const inventory = getInventory();
        const activeServices = services.filter(service => service.status === "Activo");
        const inventoryValue = inventory.reduce((sum, item) => sum + (Math.max(0, Number(item.stock) || 0) * Math.max(0, Number(item.price) || 0)), 0);
        const patientDemandCost = patients.length * 35000;
        const serviceReadinessCost = activeServices.length * 500000;
        return {
            patients: patients.length,
            activeServices: activeServices.length,
            inventoryUnits: inventory.reduce((sum, item) => sum + (Number(item.stock) || 0), 0),
            inventoryValue,
            patientDemandCost,
            serviceReadinessCost,
            total: Math.round(patientDemandCost + serviceReadinessCost + inventoryValue)
        };
    }

    function syncOperationalBudgetProjection() {
        const metrics = calculateOperationalProjection();
        const budget = getBudget();
        const concept = "Proyección operativa según pacientes, servicios e inventario";
        const projection = {
            id: "SALUDPREDICT-OPERATIONAL-PROJECTION",
            concept,
            category: "Proyección operativa",
            amount: metrics.total,
            status: "Programado",
            isSystemProjection: true
        };
        const index = budget.findIndex(item => item.id === projection.id || item.concept === concept);
        if (index >= 0) budget[index] = projection;
        else budget.push(projection);
        saveData(STORAGE.budget, budget);
        return metrics;
    }

    expandAcademicDemoData();
    syncOperationalBudgetProjection();


    /* =================================================
       NAVEGACIÓN
    ================================================= */

    const sections =
        document.querySelectorAll(".section");

    const navItems =
        document.querySelectorAll(".nav-item");

    const sidebar =
        document.getElementById("sidebar");

    const menuBtn =
        document.getElementById("menuBtn");


    function showSection(sectionId) {

        sections.forEach(section => {

            section.classList.toggle(
                "active",
                section.id === sectionId
            );

        });


        navItems.forEach(item => {

            item.classList.toggle(
                "active",
                item.dataset.section === sectionId
            );

        });


        if (sidebar) {

            sidebar.classList.remove("open");

        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    navItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                showSection(
                    item.dataset.section
                );

            }
        );

    });


    document
        .querySelectorAll("[data-go]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showSection(
                        button.dataset.go
                    );

                }
            );

        });


    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle(
                    "open"
                );

            }
        );

    }


    /* =================================================
       DASHBOARD
    ================================================= */

    function renderDashboard() {

        const patients =
            getPatients();

        const services =
            getServices();

        const inventory =
            getInventory();

        const budget =
            getBudget();


        const activeServices =
            services.filter(
                s => s.status === "Activo"
            );


        const lowStock =
            inventory.filter(
                item =>
                    item.stock <= item.minStock
            );


        const expiring =
            inventory.filter(
                item =>
                    daysUntil(item.expiry) <= 60
                    &&
                    daysUntil(item.expiry) >= 0
            );


        const executed =
            budget
                .filter(
                    item =>
                        item.status === "Ejecutado"
                )
                .reduce(
                    (sum, item) =>
                        sum + Number(item.amount || 0),
                    0
                );


        const budgetPercentage =
            Math.min(
                100,
                Math.round(
                    (
                        executed /
                        BUDGET_APPROVED_VALUE
                    ) * 100
                )
            );


        document.getElementById(
            "dashboardPatients"
        ).textContent =
            formatNumber(
                patients.length
            );


        document.getElementById(
            "dashboardServices"
        ).textContent =
            formatNumber(
                activeServices.length
            );


        const inventoryHealth =
            inventory.length === 0
                ? 0
                : Math.max(
                    0,
                    Math.round(
                        (
                            (
                                inventory.length -
                                lowStock.length
                            ) /
                            inventory.length
                        ) * 100
                    )
                );


        document.getElementById(
            "dashboardInventory"
        ).textContent =
            inventoryHealth + "%";


        document.getElementById(
            "dashboardBudget"
        ).textContent =
            budgetPercentage + "%";


        const alerts =
            generateAlerts();


        document.getElementById(
            "dashboardAlertCount"
        ).textContent =
            alerts.length;


        document.getElementById(
            "dashboardBudgetPercentage"
        ).textContent =
            budgetPercentage + "%";


        document.getElementById(
            "dashboardBudgetBar"
        ).style.width =
            budgetPercentage + "%";


        document.getElementById(
            "dashboardBudgetExecuted"
        ).textContent =
            formatCurrency(
                executed
            );


        document.getElementById(
            "dashboardBudgetTotal"
        ).textContent =
            formatCurrency(
                BUDGET_APPROVED_VALUE
            );

        const dashboardProjection = document.getElementById("dashboardOperationalProjection");
        if (dashboardProjection) {
            const operationalProjection = budget.find(item => item.isSystemProjection || item.id === "SALUDPREDICT-OPERATIONAL-PROJECTION");
            dashboardProjection.textContent = formatCurrency(operationalProjection ? operationalProjection.amount : calculateOperationalProjection().total);
        }

        renderDashboardDemand();

        renderDashboardAlerts();

        renderSystemSummary();

        renderInventorySummary();

    }


    function renderDashboardDemand() {

        const container =
            document.getElementById(
                "dashboardServiceDemand"
            );


        const data = [

            ["Ene", 48],
            ["Feb", 58],
            ["Mar", 55],
            ["Abr", 68],
            ["May", 82],
            ["Jun", 74],
            ["Jul", 79],
            ["Ago", 86],
            ["Sep", 91],
            ["Oct", 88]

        ];


        container.innerHTML =
            data.map(
                ([month, value]) => `

                    <div class="chart-bar-item">

                        <div
                            class="chart-bar"
                            style="height:${value * 2}px">

                            <span
                                class="chart-bar-value">
                                ${value}%
                            </span>

                        </div>

                        <span
                            class="chart-bar-label">
                            ${month}
                        </span>

                    </div>

                `
            ).join("");

    }


    function renderDashboardAlerts() {

        const container =
            document.getElementById(
                "dashboardAlerts"
            );


        const alerts =
            generateAlerts()
                .slice(0, 4);


        if (alerts.length === 0) {

            container.innerHTML = `
                <div class="alert-item normal">
                    <span class="alert-item-icon">✓</span>
                    <div>
                        <strong>Sin alertas</strong>
                        <p>
                            No se identificaron situaciones
                            que requieran atención.
                        </p>
                    </div>
                </div>
            `;

            return;

        }


        container.innerHTML =
            alerts.map(
                alert => `

                    <div class="alert-item ${alert.level}">

                        <span class="alert-item-icon">
                            ${alert.icon}
                        </span>

                        <div>

                            <strong>
                                ${escapeHtml(alert.title)}
                            </strong>

                            <p>
                                ${escapeHtml(alert.message)}
                            </p>

                        </div>

                    </div>

                `
            ).join("");

    }


    function renderSystemSummary() {

        const patients =
            getPatients();

        const services =
            getServices();

        const inventory =
            getInventory();


        const activePatients =
            patients.filter(
                p => p.status === "Activo"
            ).length;


        const activeServices =
            services.filter(
                s => s.status === "Activo"
            ).length;


        const lowStock =
            inventory.filter(
                item =>
                    item.stock <= item.minStock
            ).length;


        document.getElementById(
            "dashboardSystemSummary"
        ).innerHTML = `

            <div class="summary-row">
                <span>Pacientes activos</span>
                <strong>${formatNumber(activePatients)}</strong>
            </div>

            <div class="summary-row">
                <span>Servicios disponibles</span>
                <strong>${formatNumber(activeServices)}</strong>
            </div>

            <div class="summary-row">
                <span>Productos registrados</span>
                <strong>${formatNumber(inventory.length)}</strong>
            </div>

            <div class="summary-row">
                <span>Productos bajo mínimo</span>
                <strong>${formatNumber(lowStock)}</strong>
            </div>

        `;

    }


    function renderInventorySummary() {

        const inventory =
            getInventory();


        const low =
            inventory.filter(
                item =>
                    item.stock <= item.minStock
            );


        const expiring =
            inventory.filter(
                item => {

                    const days =
                        daysUntil(item.expiry);

                    return (
                        days >= 0 &&
                        days <= 60
                    );

                }
            );


        document.getElementById(
            "dashboardInventorySummary"
        ).innerHTML = `

            <div class="summary-row">
                <span>Total productos</span>
                <strong>${inventory.length}</strong>
            </div>

            <div class="summary-row">
                <span>Stock bajo</span>
                <strong>${low.length}</strong>
            </div>

            <div class="summary-row">
                <span>Próximos a vencer</span>
                <strong>${expiring.length}</strong>
            </div>

            <div class="summary-row">
                <span>Productos activos</span>
                <strong>
                    ${
                        inventory.filter(
                            item =>
                                item.status === "Activo"
                        ).length
                    }
                </strong>
            </div>

        `;

    }


    /* =================================================
       PACIENTES
    ================================================= */

    function renderPatients(filter = "") {

        const patients =
            getPatients();


        const search =
            filter.toLowerCase().trim();


        const filtered =
            patients.filter(
                patient => {

                    const text =
                        `${patient.document}
                        ${patient.name}
                        ${patient.service}`.toLowerCase();

                    return text.includes(search);

                }
            );


        const tbody =
            document.getElementById(
                "patientsTable"
            );


        if (filtered.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td
                        colspan="6"
                        class="empty-row">
                        No se encontraron pacientes.
                    </td>
                </tr>
            `;

            return;

        }


        tbody.innerHTML =
            filtered.map(
                patient => `

                    <tr>

                        <td>
                            ${escapeHtml(patient.document)}
                        </td>

                        <td>
                            <strong>
                                ${escapeHtml(patient.name)}
                            </strong>
                        </td>

                        <td>
                            ${patient.age} años
                        </td>

                        <td>
                            ${escapeHtml(patient.service)}
                        </td>

                        <td>
                            ${statusBadge(patient.status)}
                        </td>

                        <td>

                            <button
                                class="btn btn-secondary btn-small"
                                onclick="editPatient('${patient.id}')">
                                Editar
                            </button>

                            <button
                                class="btn btn-danger btn-small"
                                onclick="deletePatient('${patient.id}')">
                                Eliminar
                            </button>

                        </td>

                    </tr>

                `
            ).join("");


        updatePatientStats();

    }


    function updatePatientStats() {

        const patients =
            getPatients();


        const active =
            patients.filter(
                p =>
                    p.status === "Activo"
            ).length;


        const currentMonth =
            new Date().getMonth();


        const currentYear =
            new Date().getFullYear();


        const newPatients =
            patients.filter(
                p => {

                    const date =
                        new Date(
                            p.createdAt ||
                            "2000-01-01"
                        );

                    return (
                        date.getMonth() ===
                        currentMonth &&
                        date.getFullYear() ===
                        currentYear
                    );

                }
            ).length;


        document.getElementById(
            "totalPatients"
        ).textContent =
            patients.length;


        document.getElementById(
            "activePatients"
        ).textContent =
            active;


        document.getElementById(
            "newPatients"
        ).textContent =
            newPatients;

    }


    function fillPatientServices() {

        const select =
            document.getElementById(
                "service"
            );


        const services =
            getServices();


        select.innerHTML =
            services
                .filter(
                    s =>
                        s.status === "Activo"
                )
                .map(
                    service => `
                        <option value="${escapeHtml(service.name)}">
                            ${escapeHtml(service.name)}
                        </option>
                    `
                )
                .join("");

    }


    window.editPatient =
        function(id) {

            const patient =
                getPatients()
                    .find(
                        p => p.id === id
                    );


            if (!patient) return;


            fillPatientServices();


            document.getElementById(
                "modalTitle"
            ).textContent =
                "Editar paciente";


            document.getElementById(
                "patientId"
            ).value =
                patient.id;


            document.getElementById(
                "document"
            ).value =
                patient.document;


            document.getElementById(
                "name"
            ).value =
                patient.name;


            document.getElementById(
                "age"
            ).value =
                patient.age;


            document.getElementById(
                "service"
            ).value =
                patient.service;


            document.getElementById(
                "status"
            ).value =
                patient.status;


            openModal(
                "patientModal"
            );

        };


    window.deletePatient =
        function(id) {

            if (
                !confirm(
                    "¿Desea eliminar este paciente?"
                )
            ) {
                return;
            }


            const patients =
                getPatients()
                    .filter(
                        p => p.id !== id
                    );


            saveData(
                STORAGE.patients,
                patients
            );


            renderAll();

        };


    document.getElementById(
        "newPatientBtn"
    ).addEventListener(
        "click",
        () => {

            document.getElementById(
                "modalTitle"
            ).textContent =
                "Nuevo paciente";


            document.getElementById(
                "patientForm"
            ).reset();


            document.getElementById(
                "patientId"
            ).value = "";


            fillPatientServices();


            openModal(
                "patientModal"
            );

        }
    );


    document.getElementById(
        "patientForm"
    ).addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const patients =
                getPatients();


            const id =
                document.getElementById(
                    "patientId"
                ).value;


            const patient = {

                id:
                    id ||
                    generateId("P"),

                document:
                    document.getElementById(
                        "document"
                    ).value.trim(),

                name:
                    document.getElementById(
                        "name"
                    ).value.trim(),

                age:
                    Number(
                        document.getElementById(
                            "age"
                        ).value
                    ),

                service:
                    document.getElementById(
                        "service"
                    ).value,

                status:
                    document.getElementById(
                        "status"
                    ).value,

                createdAt:
                    id
                        ? (
                            patients.find(
                                p => p.id === id
                            )?.createdAt ||
                            new Date()
                                .toISOString()
                                .slice(0,10)
                        )
                        :
                        new Date()
                            .toISOString()
                            .slice(0,10)

            };


            if (id) {

                const index =
                    patients.findIndex(
                        p => p.id === id
                    );

                patients[index] =
                    patient;

            } else {

                patients.push(
                    patient
                );

            }


            saveData(
                STORAGE.patients,
                patients
            );


            closeModal(
                "patientModal"
            );


            renderAll();

        }
    );


    document.getElementById(
        "patientSearch"
    ).addEventListener(
        "input",
        event => {

            renderPatients(
                event.target.value
            );

        }
    );


    /* =================================================
       SERVICIOS
    ================================================= */

    function renderServices(filter = "") {

        const services =
            getServices();


        const search =
            filter.toLowerCase().trim();


        const filtered =
            services.filter(
                service => {

                    const text =
                        `${service.code}
                        ${service.name}
                        ${service.category}`.toLowerCase();

                    return text.includes(search);

                }
            );


        const tbody =
            document.getElementById(
                "servicesTable"
            );


        if (filtered.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td
                        colspan="7"
                        class="empty-row">
                        No se encontraron servicios.
                    </td>
                </tr>
            `;

            return;

        }


        tbody.innerHTML =
            filtered.map(
                service => `

                    <tr>

                        <td>
                            <strong>
                                ${escapeHtml(service.code)}
                            </strong>
                        </td>

                        <td>
                            ${escapeHtml(service.name)}
                        </td>

                        <td>
                            ${escapeHtml(service.category)}
                        </td>

                        <td>
                            ${escapeHtml(service.duration)}
                        </td>

                        <td>
                            ${formatCurrency(service.price)}
                        </td>

                        <td>
                            ${statusBadge(service.status)}
                        </td>

                        <td>

                            <button
                                class="btn btn-secondary btn-small"
                                onclick="editService('${service.id}')">
                                Editar
                            </button>

                            <button
                                class="btn btn-danger btn-small"
                                onclick="deleteService('${service.id}')">
                                Eliminar
                            </button>

                        </td>

                    </tr>

                `
            ).join("");


        updateServiceStats();

    }


    function updateServiceStats() {

        const services =
            getServices();


        const active =
            services.filter(
                s =>
                    s.status === "Activo"
            );


        const average =
            active.length === 0
                ? 0
                :
                active.reduce(
                    (sum, service) =>
                        sum +
                        Number(service.price || 0),
                    0
                ) / active.length;


        document.getElementById(
            "totalServices"
        ).textContent =
            services.length;


        document.getElementById(
            "activeServices"
        ).textContent =
            active.length;


        document.getElementById(
            "averageServicePrice"
        ).textContent =
            formatCurrency(
                average
            );

    }


    window.editService =
        function(id) {

            const service =
                getServices()
                    .find(
                        s => s.id === id
                    );


            if (!service) return;


            document.getElementById(
                "serviceModalTitle"
            ).textContent =
                "Editar servicio";


            document.getElementById(
                "serviceId"
            ).value =
                service.id;


            document.getElementById(
                "serviceCode"
            ).value =
                service.code;


            document.getElementById(
                "serviceName"
            ).value =
                service.name;


            document.getElementById(
                "serviceCategory"
            ).value =
                service.category;


            document.getElementById(
                "serviceDuration"
            ).value =
                service.duration;


            document.getElementById(
                "servicePrice"
            ).value =
                service.price;


            document.getElementById(
                "serviceStatus"
            ).value =
                service.status;


            openModal(
                "serviceModal"
            );

        };


    window.deleteService =
        function(id) {

            if (
                !confirm(
                    "¿Desea eliminar este servicio?"
                )
            ) {
                return;
            }


            const services =
                getServices()
                    .filter(
                        s => s.id !== id
                    );


            saveData(
                STORAGE.services,
                services
            );


            renderAll();

        };


    document.getElementById(
        "newServiceBtn"
    ).addEventListener(
        "click",
        () => {

            document.getElementById(
                "serviceModalTitle"
            ).textContent =
                "Nuevo servicio";


            document.getElementById(
                "serviceForm"
            ).reset();


            document.getElementById(
                "serviceId"
            ).value = "";


            openModal(
                "serviceModal"
            );

        }
    );


    document.getElementById(
        "serviceForm"
    ).addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const services =
                getServices();


            const id =
                document.getElementById(
                    "serviceId"
                ).value;


            const service = {

                id:
                    id ||
                    generateId("S"),

                code:
                    document.getElementById(
                        "serviceCode"
                    ).value.trim(),

                name:
                    document.getElementById(
                        "serviceName"
                    ).value.trim(),

                category:
                    document.getElementById(
                        "serviceCategory"
                    ).value,

                duration:
                    document.getElementById(
                        "serviceDuration"
                    ).value.trim(),

                price:
                    Number(
                        document.getElementById(
                            "servicePrice"
                        ).value
                    ),

                status:
                    document.getElementById(
                        "serviceStatus"
                    ).value

            };


            if (id) {

                const index =
                    services.findIndex(
                        s => s.id === id
                    );

                services[index] =
                    service;

            } else {

                services.push(
                    service
                );

            }


            saveData(
                STORAGE.services,
                services
            );


            closeModal(
                "serviceModal"
            );


            renderAll();

        }
    );


    document.getElementById(
        "serviceSearch"
    ).addEventListener(
        "input",
        event => {

            renderServices(
                event.target.value
            );

        }
    );


    /* =================================================
       INVENTARIO
    ================================================= */

    function renderInventory(filter = "") {

        const inventory =
            getInventory();


        const search =
            filter.toLowerCase().trim();


        const filtered =
            inventory.filter(
                item => {

                    const text =
                        `${item.code}
                        ${item.name}
                        ${item.category}`.toLowerCase();

                    return text.includes(search);

                }
            );


        const tbody =
            document.getElementById(
                "inventoryTable"
            );


        if (filtered.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td
                        colspan="10"
                        class="empty-row">
                        No se encontraron productos.
                    </td>
                </tr>
            `;

            return;

        }


        tbody.innerHTML =
            filtered.map(
                item => {

                    const low =
                        item.stock <=
                        item.minStock;


                    const days =
                        daysUntil(
                            item.expiry
                        );


                    const expiring =
                        days >= 0 &&
                        days <= 60;


                    let stockBadge =
                        statusBadge(
                            item.status
                        );


                    if (low) {

                        stockBadge = `
                            <span class="badge badge-danger">
                                Stock bajo
                            </span>
                        `;

                    } else if (expiring) {

                        stockBadge = `
                            <span class="badge badge-warning">
                                Próximo a vencer
                            </span>
                        `;

                    }


                    return `

                        <tr>

                            <td>
                                <strong>
                                    ${escapeHtml(item.code)}
                                </strong>
                            </td>

                            <td>
                                ${escapeHtml(item.name)}
                            </td>

                            <td>
                                ${escapeHtml(item.category)}
                            </td>

                            <td>
                                ${escapeHtml(item.unit)}
                            </td>

                            <td>
                                <strong>
                                    ${formatNumber(item.stock)}
                                </strong>
                            </td>

                            <td>
                                ${formatNumber(item.minStock)}
                            </td>

                            <td>
                                ${
                                    item.expiry
                                        ? escapeHtml(item.expiry)
                                        : "—"
                                }
                            </td>

                            <td>
                                ${formatCurrency(item.price)}
                            </td>

                            <td>
                                ${stockBadge}
                            </td>

                            <td>

                                <button
                                    class="btn btn-secondary btn-small"
                                    onclick="editInventory('${item.id}')">
                                    Editar
                                </button>

                                <button
                                    class="btn btn-danger btn-small"
                                    onclick="deleteInventory('${item.id}')">
                                    Eliminar
                                </button>

                            </td>

                        </tr>

                    `;

                }
            ).join("");


        updateInventoryStats();

    }


    function updateInventoryStats() {

        const inventory =
            getInventory();


        const low =
            inventory.filter(
                item =>
                    item.stock <= item.minStock
            );


        const expiring =
            inventory.filter(
                item => {

                    const days =
                        daysUntil(item.expiry);

                    return (
                        days >= 0 &&
                        days <= 60
                    );

                }
            );


        document.getElementById(
            "totalInventory"
        ).textContent =
            inventory.length;


        document.getElementById(
            "lowStockInventory"
        ).textContent =
            low.length;


        document.getElementById(
            "expiringInventory"
        ).textContent =
            expiring.length;


        document.getElementById(
            "analysisInventory"
        ).textContent =
            inventory.length;


        document.getElementById(
            "analysisLowStock"
        ).textContent =
            low.length;

    }


    window.editInventory =
        function(id) {

            const item =
                getInventory()
                    .find(
                        i => i.id === id
                    );


            if (!item) return;


            document.getElementById(
                "inventoryModalTitle"
            ).textContent =
                "Editar producto";


            document.getElementById(
                "inventoryId"
            ).value =
                item.id;


            document.getElementById(
                "inventoryCode"
            ).value =
                item.code;


            document.getElementById(
                "inventoryName"
            ).value =
                item.name;


            document.getElementById(
                "inventoryCategory"
            ).value =
                item.category;


            document.getElementById(
                "inventoryUnit"
            ).value =
                item.unit;


            document.getElementById(
                "inventoryStock"
            ).value =
                item.stock;


            document.getElementById(
                "inventoryMinStock"
            ).value =
                item.minStock;


            document.getElementById(
                "inventoryExpiry"
            ).value =
                item.expiry;


            document.getElementById(
                "inventoryPrice"
            ).value =
                item.price;


            document.getElementById(
                "inventoryStatus"
            ).value =
                item.status;


            openModal(
                "inventoryModal"
            );

        };


    window.deleteInventory =
        function(id) {

            if (
                !confirm(
                    "¿Desea eliminar este producto?"
                )
            ) {
                return;
            }


            const inventory =
                getInventory()
                    .filter(
                        item =>
                            item.id !== id
                    );


            saveData(
                STORAGE.inventory,
                inventory
            );


            renderAll();

        };


    document.getElementById(
        "newInventoryBtn"
    ).addEventListener(
        "click",
        () => {

            document.getElementById(
                "inventoryModalTitle"
            ).textContent =
                "Nuevo producto";


            document.getElementById(
                "inventoryForm"
            ).reset();


            document.getElementById(
                "inventoryId"
            ).value = "";


            openModal(
                "inventoryModal"
            );

        }
    );


    document.getElementById(
        "inventoryForm"
    ).addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const inventory =
                getInventory();


            const id =
                document.getElementById(
                    "inventoryId"
                ).value;


            const item = {

                id:
                    id ||
                    generateId("I"),

                code:
                    document.getElementById(
                        "inventoryCode"
                    ).value.trim(),

                name:
                    document.getElementById(
                        "inventoryName"
                    ).value.trim(),

                category:
                    document.getElementById(
                        "inventoryCategory"
                    ).value,

                unit:
                    document.getElementById(
                        "inventoryUnit"
                    ).value.trim(),

                stock:
                    Number(
                        document.getElementById(
                            "inventoryStock"
                        ).value
                    ),

                minStock:
                    Number(
                        document.getElementById(
                            "inventoryMinStock"
                        ).value
                    ),

                expiry:
                    document.getElementById(
                        "inventoryExpiry"
                    ).value,

                price:
                    Number(
                        document.getElementById(
                            "inventoryPrice"
                        ).value
                    ),

                status:
                    document.getElementById(
                        "inventoryStatus"
                    ).value

            };


            if (id) {

                const index =
                    inventory.findIndex(
                        i => i.id === id
                    );

                inventory[index] =
                    item;

            } else {

                inventory.push(
                    item
                );

            }


            saveData(
                STORAGE.inventory,
                inventory
            );


            closeModal(
                "inventoryModal"
            );


            renderAll();

        }
    );


    document.getElementById(
        "inventorySearch"
    ).addEventListener(
        "input",
        event => {

            renderInventory(
                event.target.value
            );

        }
    );


    /* =================================================
       PRESUPUESTO
    ================================================= */

    function renderBudget(filter = "") {

        const budget =
            getBudget();


        const search =
            filter.toLowerCase().trim();


        const filtered =
            budget.filter(
                item => {

                    const text =
                        `${item.concept}
                        ${item.category}`.toLowerCase();

                    return text.includes(search);

                }
            );


        const tbody =
            document.getElementById(
                "budgetTable"
            );


        if (filtered.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td
                        colspan="5"
                        class="empty-row">
                        No se encontraron movimientos.
                    </td>
                </tr>
            `;

            return;

        }


        tbody.innerHTML =
            filtered.map(
                item => `

                    <tr>

                        <td>
                            <strong>
                                ${escapeHtml(item.concept)}
                            </strong>
                        </td>

                        <td>
                            ${escapeHtml(item.category)}
                        </td>

                        <td>
                            ${formatCurrency(item.amount)}
                        </td>

                        <td>
                            ${statusBadge(item.status)}
                        </td>

                        <td>

                            <button
                                class="btn btn-secondary btn-small"
                                onclick="editBudget('${item.id}')">
                                Editar
                            </button>

                            <button
                                class="btn btn-danger btn-small"
                                onclick="deleteBudget('${item.id}')">
                                Eliminar
                            </button>

                        </td>

                    </tr>

                `
            ).join("");


        updateBudgetStats();

    }


    function updateBudgetStats() {

        const budget =
            getBudget();


        const executed =
            budget
                .filter(
                    item =>
                        item.status === "Ejecutado"
                )
                .reduce(
                    (sum, item) =>
                        sum +
                        Number(item.amount || 0),
                    0
                );


        const available =
            Math.max(
                0,
                BUDGET_APPROVED_VALUE -
                executed
            );


        const percentage =
            Math.round(
                (
                    executed /
                    BUDGET_APPROVED_VALUE
                ) * 100
            );


        document.getElementById(
            "budgetApproved"
        ).textContent =
            formatCurrency(
                BUDGET_APPROVED_VALUE
            );


        document.getElementById(
            "budgetExecuted"
        ).textContent =
            formatCurrency(
                executed
            );


        document.getElementById(
            "budgetAvailable"
        ).textContent =
            formatCurrency(
                available
            );


        document.getElementById(
            "budgetPercentage"
        ).textContent =
            percentage + "%";

        const projectionCard = document.getElementById("budgetProjection");
        if (projectionCard) {
            const projection = budget.find(item => item.isSystemProjection || item.id === "SALUDPREDICT-OPERATIONAL-PROJECTION");
            projectionCard.textContent = formatCurrency(projection ? projection.amount : 0);
        }

    }


    window.editBudget =
        function(id) {

            const item =
                getBudget()
                    .find(
                        b => b.id === id
                    );


            if (!item) return;


            document.getElementById(
                "budgetModalTitle"
            ).textContent =
                "Editar movimiento";


            document.getElementById(
                "budgetId"
            ).value =
                item.id;


            document.getElementById(
                "budgetConcept"
            ).value =
                item.concept;


            document.getElementById(
                "budgetCategory"
            ).value =
                item.category;


            document.getElementById(
                "budgetAmount"
            ).value =
                item.amount;


            document.getElementById(
                "budgetStatus"
            ).value =
                item.status;


            openModal(
                "budgetModal"
            );

        };


    window.deleteBudget =
        function(id) {

            if (
                !confirm(
                    "¿Desea eliminar este movimiento?"
                )
            ) {
                return;
            }


            const budget =
                getBudget()
                    .filter(
                        b => b.id !== id
                    );


            saveData(
                STORAGE.budget,
                budget
            );


            renderAll();

        };


    document.getElementById(
        "newBudgetBtn"
    ).addEventListener(
        "click",
        () => {

            document.getElementById(
                "budgetModalTitle"
            ).textContent =
                "Nuevo movimiento";


            document.getElementById(
                "budgetForm"
            ).reset();


            document.getElementById(
                "budgetId"
            ).value = "";


            openModal(
                "budgetModal"
            );

        }
    );


    document.getElementById(
        "budgetForm"
    ).addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const budget =
                getBudget();


            const id =
                document.getElementById(
                    "budgetId"
                ).value;


            const item = {

                id:
                    id ||
                    generateId("B"),

                concept:
                    document.getElementById(
                        "budgetConcept"
                    ).value.trim(),

                category:
                    document.getElementById(
                        "budgetCategory"
                    ).value.trim(),

                amount:
                    Number(
                        document.getElementById(
                            "budgetAmount"
                        ).value
                    ),

                status:
                    document.getElementById(
                        "budgetStatus"
                    ).value

            };


            if (id) {

                const index =
                    budget.findIndex(
                        b => b.id === id
                    );

                budget[index] =
                    item;

            } else {

                budget.push(
                    item
                );

            }


            saveData(
                STORAGE.budget,
                budget
            );


            closeModal(
                "budgetModal"
            );


            renderAll();

        }
    );


    document.getElementById(
        "budgetSearch"
    ).addEventListener(
        "input",
        event => {

            renderBudget(
                event.target.value
            );

        }
    );


    /* =================================================
       ANÁLISIS
    ================================================= */

    function renderAnalysis() {

        const patients =
            getPatients();

        const services =
            getServices();

        const inventory =
            getInventory();


        document.getElementById(
            "analysisPatients"
        ).textContent =
            patients.length;


        document.getElementById(
            "analysisServices"
        ).textContent =
            services.filter(
                s =>
                    s.status === "Activo"
            ).length;


        document.getElementById(
            "analysisInventory"
        ).textContent =
            inventory.length;


        const low =
            inventory.filter(
                i =>
                    i.stock <= i.minStock
            ).length;


        document.getElementById(
            "analysisLowStock"
        ).textContent =
            low;


        renderPatientsAnalysis(
            patients
        );


        renderInventoryAnalysis(
            inventory
        );


        renderFinancialAnalysis();

    }


    function renderPatientsAnalysis(patients) {

        const container =
            document.getElementById(
                "patientsAnalysisChart"
            );


        const groups = {};


        patients.forEach(
            patient => {

                groups[patient.service] =
                    (
                        groups[patient.service] ||
                        0
                    ) + 1;

            }
        );


        const entries =
            Object.entries(groups)
                .sort(
                    (a,b) =>
                        b[1] - a[1]
                );


        const max =
            Math.max(
                ...entries.map(
                    item => item[1]
                ),
                1
            );


        container.innerHTML =
            entries.map(
                ([name, value]) => `

                    <div class="analysis-row">

                        <label>
                            ${escapeHtml(name)}
                        </label>

                        <div class="analysis-track">

                            <div
                                class="analysis-fill"
                                style="width:${(value / max) * 100}%">
                            </div>

                        </div>

                        <strong>
                            ${value}
                        </strong>

                    </div>

                `
            ).join("");

    }


    function renderInventoryAnalysis(inventory) {

        const container =
            document.getElementById(
                "inventoryAnalysisChart"
            );


        const groups = {};


        inventory.forEach(
            item => {

                groups[item.category] =
                    (
                        groups[item.category] ||
                        0
                    ) + 1;

            }
        );


        const entries =
            Object.entries(groups)
                .sort(
                    (a,b) =>
                        b[1] - a[1]
                );


        const max =
            Math.max(
                ...entries.map(
                    item => item[1]
                ),
                1
            );


        container.innerHTML =
            entries.map(
                ([name, value]) => `

                    <div class="analysis-row">

                        <label>
                            ${escapeHtml(name)}
                        </label>

                        <div class="analysis-track">

                            <div
                                class="analysis-fill"
                                style="width:${(value / max) * 100}%">
                            </div>

                        </div>

                        <strong>
                            ${value}
                        </strong>

                    </div>

                `
            ).join("");

    }


    function renderFinancialAnalysis() {

        const budget =
            getBudget();


        const groups = {};


        budget.forEach(
            item => {

                groups[item.category] =
                    (
                        groups[item.category] ||
                        0
                    ) +
                    Number(item.amount || 0);

            }
        );


        const entries =
            Object.entries(groups)
                .sort(
                    (a,b) =>
                        b[1] - a[1]
                );


        const max =
            Math.max(
                ...entries.map(
                    item => item[1]
                ),
                1
            );


        const container =
            document.getElementById(
                "financialAnalysis"
            );


        container.innerHTML =
            entries.map(
                ([name, value]) => `

                    <div class="analysis-row">

                        <label>
                            ${escapeHtml(name)}
                        </label>

                        <div class="analysis-track">

                            <div
                                class="analysis-fill"
                                style="width:${(value / max) * 100}%">
                            </div>

                        </div>

                        <strong>
                            ${formatCurrency(value)}
                        </strong>

                    </div>

                `
            ).join("");

    }


    /* =================================================
       PREDICCIONES
    ================================================= */

    function fillPredictionServices() {

        const select =
            document.getElementById(
                "predictionService"
            );


        const services =
            getServices();


        select.innerHTML = `

            <option value="all">
                Todos los servicios
            </option>

            ${
                services
                    .filter(
                        s =>
                            s.status === "Activo"
                    )
                    .map(
                        s => `
                            <option
                                value="${escapeHtml(s.name)}">
                                ${escapeHtml(s.name)}
                            </option>
                        `
                    )
                    .join("")
            }

        `;

    }


    function generatePrediction() {

        const selectedService =
            document.getElementById(
                "predictionService"
            ).value;


        const period =
            Number(
                document.getElementById(
                    "predictionPeriod"
                ).value
            );


        const patients =
            getPatients();


        let base;


        if (
            selectedService ===
            "all"
        ) {

            base =
                patients.length;

        } else {

            base =
                patients.filter(
                    p =>
                        p.service ===
                        selectedService
                ).length;

        }


        const historicalAverage =
            Math.max(
                1,
                base
            );


        const monthlyFactor =
            period / 30;


        const growth =
            1.08;


        const estimated =
            Math.round(
                historicalAverage *
                monthlyFactor *
                growth
            );


        const variation =
            Math.round(
                (
                    (
                        estimated -
                        historicalAverage *
                        monthlyFactor
                    ) /
                    (
                        historicalAverage *
                        monthlyFactor
                    )
                ) * 100
            );


        document.getElementById(
            "historicalAverage"
        ).textContent =
            formatNumber(
                historicalAverage
            );


        document.getElementById(
            "estimatedDemand"
        ).textContent =
            formatNumber(
                estimated
            );


        document.getElementById(
            "predictionVariation"
        ).textContent =
            "+" + variation + "%";


        document.getElementById(
            "predictionWarning"
        ).innerHTML = `

            ℹ️ Para ${
                selectedService === "all"
                    ? "todos los servicios"
                    : escapeHtml(selectedService)
            },
            el sistema estima aproximadamente
            <strong>${formatNumber(estimated)}</strong>
            registros durante los próximos
            <strong>${period} días</strong>.
            Esta proyección utiliza los datos actuales
            y un factor de crecimiento demostrativo.

        `;

    }


    document.getElementById(
        "generatePredictionBtn"
    ).addEventListener(
        "click",
        generatePrediction
    );


    /* =================================================
       ALERTAS
    ================================================= */

    function generateAlerts() {

        const alerts = [];


        const inventory =
            getInventory();


        const services =
            getServices();


        const budget =
            getBudget();


        const lowStock =
            inventory.filter(
                item =>
                    item.stock <= item.minStock
            );


        lowStock.forEach(
            item => {

                alerts.push({

                    level: "critical",

                    icon: "🚨",

                    title:
                        "Stock bajo: " +
                        item.name,

                    message:
                        `El stock actual es ${item.stock}
                         y el mínimo configurado es
                         ${item.minStock}.`

                });

            }
        );


        const expiring =
            inventory.filter(
                item => {

                    const days =
                        daysUntil(
                            item.expiry
                        );

                    return (
                        days >= 0 &&
                        days <= 60
                    );

                }
            );


        expiring.forEach(
            item => {

                const days =
                    daysUntil(
                        item.expiry
                    );


                alerts.push({

                    level:
                        days <= 30
                            ? "critical"
                            : "attention",

                    icon: "⏰",

                    title:
                        "Próximo vencimiento: " +
                        item.name,

                    message:
                        `El producto vence en
                        ${days} días
                        (${item.expiry}).`

                });

            }
        );


        const inactiveServices =
            services.filter(
                service =>
                    service.status ===
                    "Inactivo"
            );


        inactiveServices.forEach(
            service => {

                alerts.push({

                    level: "attention",

                    icon: "⚠️",

                    title:
                        "Servicio inactivo",

                    message:
                        `${service.name}
                        se encuentra actualmente
                        inactivo.`

                });

            }
        );


        const executed =
            budget
                .filter(
                    item =>
                        item.status ===
                        "Ejecutado"
                )
                .reduce(
                    (sum, item) =>
                        sum +
                        Number(item.amount || 0),
                    0
                );


        const budgetPercentage =
            (
                executed /
                BUDGET_APPROVED_VALUE
            ) * 100;


        if (
            budgetPercentage >= 85
        ) {

            alerts.push({

                level: "critical",

                icon: "💰",

                title:
                    "Alta ejecución presupuestal",

                message:
                    `La ejecución presupuestal
                    alcanza el
                    ${Math.round(budgetPercentage)}%.`

            });

        } else if (
            budgetPercentage >= 75
        ) {

            alerts.push({

                level: "attention",

                icon: "💰",

                title:
                    "Seguimiento presupuestal",

                message:
                    `La ejecución presupuestal
                    alcanza el
                    ${Math.round(budgetPercentage)}%.`

            });

        }


        return alerts;

    }


    function renderAlerts() {

        const alerts =
            generateAlerts();


        const critical =
            alerts.filter(
                a =>
                    a.level === "critical"
            ).length;


        const attention =
            alerts.filter(
                a =>
                    a.level === "attention"
            ).length;


        const normal =
            alerts.filter(
                a =>
                    a.level === "normal"
            ).length;


        document.getElementById(
            "totalAlerts"
        ).textContent =
            alerts.length;


        document.getElementById(
            "attentionAlerts"
        ).textContent =
            attention;


        document.getElementById(
            "criticalAlerts"
        ).textContent =
            critical;


        document.getElementById(
            "normalAlerts"
        ).textContent =
            normal;


        const container =
            document.getElementById(
                "alertsContainer"
            );


        if (alerts.length === 0) {

            container.innerHTML = `

                <div class="alert-card normal">

                    <div class="alert-card-header">

                        <h3>
                            Sistema estable
                        </h3>

                        <span>
                            ✓
                        </span>

                    </div>

                    <p>
                        No se identificaron
                        alertas activas en los
                        datos registrados.
                    </p>

                </div>

            `;

            return;

        }


        container.innerHTML =
            alerts.map(
                alert => `

                    <div
                        class="alert-card
                        ${alert.level}">

                        <div
                            class="alert-card-header">

                            <h3>
                                ${alert.icon}
                                ${escapeHtml(alert.title)}
                            </h3>

                            <span class="badge
                                ${
                                    alert.level ===
                                    "critical"
                                        ? "badge-danger"
                                        : "badge-warning"
                                }">

                                ${
                                    alert.level ===
                                    "critical"
                                        ? "Crítica"
                                        : "Atención"
                                }

                            </span>

                        </div>

                        <p>
                            ${escapeHtml(alert.message)}
                        </p>

                        <small>
                            Generada automáticamente
                            por SALUDPREDICT.
                        </small>

                    </div>

                `
            ).join("");

    }


    document.getElementById(
        "refreshAlertsBtn"
    ).addEventListener(
        "click",
        () => {

            renderAlerts();

            renderDashboard();

        }
    );


    /* =================================================
       REPORTES
    ================================================= */

    function openReport(type) {

        const patients =
            getPatients();

        const services =
            getServices();

        const inventory =
            getInventory();

        const budget =
            getBudget();


        let title =
            "Reporte SALUDPREDICT";

        let content = "";


        if (type === "demand") {

            title =
                "Reporte de demanda y servicios";


            const activePatients =
                patients.filter(
                    p =>
                        p.status === "Activo"
                ).length;


            const activeServices =
                services.filter(
                    s =>
                        s.status === "Activo"
                ).length;


            content = `

                <div class="report-header">

                    <h3>
                        Demanda institucional
                    </h3>

                    <p>
                        Información consolidada
                        de pacientes y servicios.
                    </p>

                </div>


                <div class="report-summary-grid">

                    <div class="report-summary">
                        <span>Total pacientes</span>
                        <strong>${patients.length}</strong>
                    </div>

                    <div class="report-summary">
                        <span>Pacientes activos</span>
                        <strong>${activePatients}</strong>
                    </div>

                    <div class="report-summary">
                        <span>Servicios activos</span>
                        <strong>${activeServices}</strong>
                    </div>

                </div>


                <table>

                    <thead>

                        <tr>
                            <th>Servicio</th>
                            <th>Pacientes</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${
                            Object.entries(
                                patients.reduce(
                                    (acc, p) => {

                                        acc[p.service] =
                                            (
                                                acc[p.service] ||
                                                0
                                            ) + 1;

                                        return acc;

                                    },
                                    {}
                                )
                            )
                            .sort(
                                (a,b) =>
                                    b[1] - a[1]
                            )
                            .map(
                                ([service, count]) => `

                                    <tr>

                                        <td>
                                            ${escapeHtml(service)}
                                        </td>

                                        <td>
                                            ${count}
                                        </td>

                                    </tr>

                                `
                            )
                            .join("")
                        }

                    </tbody>

                </table>

            `;

        }


        if (type === "inventory") {

            title =
                "Reporte de inventario";


            const low =
                inventory.filter(
                    i =>
                        i.stock <= i.minStock
                );


            const expiring =
                inventory.filter(
                    i => {

                        const days =
                            daysUntil(i.expiry);

                        return (
                            days >= 0 &&
                            days <= 60
                        );

                    }
                );


            content = `

                <div class="report-header">

                    <h3>
                        Estado del inventario
                    </h3>

                    <p>
                        Control de existencias,
                        mínimos y vencimientos.
                    </p>

                </div>


                <div class="report-summary-grid">

                    <div class="report-summary">
                        <span>Productos</span>
                        <strong>${inventory.length}</strong>
                    </div>

                    <div class="report-summary">
                        <span>Stock bajo</span>
                        <strong>${low.length}</strong>
                    </div>

                    <div class="report-summary">
                        <span>Próximos a vencer</span>
                        <strong>${expiring.length}</strong>
                    </div>

                </div>


                <table>

                    <thead>

                        <tr>
                            <th>Producto</th>
                            <th>Stock</th>
                            <th>Mínimo</th>
                            <th>Estado</th>
                        </tr>

                    </thead>

                    <tbody>

                        ${
                            inventory.map(
                                item => {

                                    const isLow =
                                        item.stock <=
                                        item.minStock;

                                    const isExpiring =
                                        daysUntil(
                                            item.expiry
                                        ) <= 60 &&
                                        daysUntil(
                                            item.expiry
                                        ) >= 0;


                                    let state =
                                        "Normal";


                                    if (isLow) {
                                        state =
                                            "Stock bajo";
                                    } else if (
                                        isExpiring
                                    ) {
                                        state =
                                            "Próximo a vencer";
                                    }


                                    return `

                                        <tr>

                                            <td>
                                                ${escapeHtml(item.name)}
                                            </td>

                                            <td>
                                                ${item.stock}
                                            </td>

                                            <td>
                                                ${item.minStock}
                                            </td>

                                            <td>
                                                ${state}
                                            </td>

                                        </tr>

                                    `;

                                }
                            ).join("")
                        }

                    </tbody>

                </table>

            `;

        }


        if (type === "budget") {

            title =
                "Reporte financiero";


            const executed =
                budget
                    .filter(
                        item =>
                            item.status ===
                            "Ejecutado"
                    )
                    .reduce(
                        (sum, item) =>
                            sum +
                            Number(item.amount || 0),
                        0
                    );


            const available =
                BUDGET_APPROVED_VALUE -
                executed;


            const percentage =
                Math.round(
                    (
                        executed /
                        BUDGET_APPROVED_VALUE
                    ) * 100
                );


            content = `

                <div class="report-header">

                    <h3>
                        Ejecución presupuestal
                    </h3>

                    <p>
                        Información financiera
                        consolidada.
                    </p>

                </div>


                <div class="report-summary-grid">

                    <div class="report-summary">
                        <span>Presupuesto aprobado</span>
                        <strong>
                            ${formatCurrency(
                                BUDGET_APPROVED_VALUE
                            )}
                        </strong>
                    </div>

                    <div class="report-summary">
                        <span>Ejecutado</span>
                        <strong>
                            ${formatCurrency(executed)}
                        </strong>
                    </div>

                    <div class="report-summary">
                        <span>Disponible</span>
                        <strong>
                            ${formatCurrency(available)}
                        </strong>
                    </div>

                </div>


                <div class="info-box">

                    Ejecución presupuestal:
                    <strong>
                        ${percentage}%
                    </strong>

                </div>

            `;

        }


        if (type === "general") {

            title =
                "Reporte general SALUDPREDICT";


            const alerts =
                generateAlerts();


            const executed =
                budget
                    .filter(
                        item =>
                            item.status ===
                            "Ejecutado"
                    )
                    .reduce(
                        (sum, item) =>
                            sum +
                            Number(item.amount || 0),
                        0
                    );


            content = `

                <div class="report-header">

                    <h3>
                        Resumen institucional
                    </h3>

                    <p>
                        Reporte general generado
                        automáticamente por
                        SALUDPREDICT.
                    </p>

                </div>


                <div class="report-summary-grid">

                    <div class="report-summary">
                        <span>Pacientes</span>
                        <strong>${patients.length}</strong>
                    </div>

                    <div class="report-summary">
                        <span>Servicios</span>
                        <strong>
                            ${
                                services.filter(
                                    s =>
                                        s.status ===
                                        "Activo"
                                ).length
                            }
                        </strong>
                    </div>

                    <div class="report-summary">
                        <span>Productos</span>
                        <strong>${inventory.length}</strong>
                    </div>

                    <div class="report-summary">
                        <span>Alertas</span>
                        <strong>${alerts.length}</strong>
                    </div>

                    <div class="report-summary">
                        <span>Ejecutado</span>
                        <strong>
                            ${formatCurrency(executed)}
                        </strong>
                    </div>

                    <div class="report-summary">
                        <span>Ejecución</span>
                        <strong>
                            ${
                                Math.round(
                                    (
                                        executed /
                                        BUDGET_APPROVED_VALUE
                                    ) * 100
                                )
                            }%
                        </strong>
                    </div>

                </div>


                <div class="info-box">

                    El sistema integra información
                    de pacientes, servicios,
                    inventario y presupuesto
                    para apoyar el análisis,
                    la generación de alertas y
                    la toma de decisiones.

                </div>

            `;

        }


        document.getElementById(
            "reportModalTitle"
        ).textContent =
            title;


        document.getElementById(
            "reportModalContent"
        ).innerHTML =
            content;


        openModal(
            "reportModal"
        );

    }


    document.getElementById(
        "reportDemandBtn"
    ).addEventListener(
        "click",
        () => openReport("demand")
    );


    document.getElementById(
        "reportInventoryBtn"
    ).addEventListener(
        "click",
        () => openReport("inventory")
    );


    document.getElementById(
        "reportBudgetBtn"
    ).addEventListener(
        "click",
        () => openReport("budget")
    );


    document.getElementById(
        "reportGeneralBtn"
    ).addEventListener(
        "click",
        () => openReport("general")
    );


    document.getElementById(
        "printReportBtn"
    ).addEventListener(
        "click",
        () => {

            window.print();

        }
    );


    /* =================================================
       MODALES
    ================================================= */

    function openModal(id) {

        const modal =
            document.getElementById(id);


        if (modal) {

            modal.classList.add(
                "show"
            );

        }

    }


    function closeModal(id) {

        const modal =
            document.getElementById(id);


        if (modal) {

            modal.classList.remove(
                "show"
            );

        }

    }


    document.getElementById(
        "closeModal"
    ).addEventListener(
        "click",
        () => closeModal("patientModal")
    );


    document.getElementById(
        "cancelModal"
    ).addEventListener(
        "click",
        () => closeModal("patientModal")
    );


    document.getElementById(
        "closeServiceModal"
    ).addEventListener(
        "click",
        () => closeModal("serviceModal")
    );


    document.getElementById(
        "cancelServiceBtn"
    ).addEventListener(
        "click",
        () => closeModal("serviceModal")
    );


    document.getElementById(
        "closeInventoryModal"
    ).addEventListener(
        "click",
        () => closeModal("inventoryModal")
    );


    document.getElementById(
        "cancelInventoryModal"
    ).addEventListener(
        "click",
        () => closeModal("inventoryModal")
    );


    document.getElementById(
        "closeBudgetModal"
    ).addEventListener(
        "click",
        () => closeModal("budgetModal")
    );


    document.getElementById(
        "cancelBudgetModal"
    ).addEventListener(
        "click",
        () => closeModal("budgetModal")
    );


    document.getElementById(
        "closeReportModal"
    ).addEventListener(
        "click",
        () => closeModal("reportModal")
    );


    document.getElementById(
        "cancelReportBtn"
    ).addEventListener(
        "click",
        () => closeModal("reportModal")
    );


    document
        .querySelectorAll(".modal")
        .forEach(modal => {

            modal.addEventListener(
                "click",
                event => {

                    if (
                        event.target ===
                        modal
                    ) {

                        modal.classList.remove(
                            "show"
                        );

                    }

                }
            );

        });


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                document
                    .querySelectorAll(
                        ".modal.show"
                    )
                    .forEach(
                        modal =>
                            modal.classList.remove(
                                "show"
                            )
                    );

            }

        }
    );


    /* =================================================
       BOTÓN DATOS DEMO
    ================================================= */

    document.getElementById(
        "loadDemoDataBtn"
    ).addEventListener(
        "click",
        () => {

            const confirmation =
                confirm(
                    "Esto reemplazará los datos actuales por los datos de demostración. ¿Desea continuar?"
                );


            if (!confirmation) {
                return;
            }


            saveData(
                STORAGE.patients,
                demoPatients
            );

            saveData(
                STORAGE.services,
                demoServices
            );

            saveData(
                STORAGE.inventory,
                demoInventory
            );

            saveData(
                STORAGE.budget,
                demoBudget
            );

            expandAcademicDemoData();
            syncOperationalBudgetProjection();

            renderAll();


            alert(
                "Datos de demostración cargados correctamente."
            );

        }
    );


    /* =================================================
       IMPORTACIÓN DE EXCEL
       Agrega datos nuevos y conserva los registros actuales.
    ================================================= */

    const excelTarget = document.getElementById("excelTarget");
    const excelFile = document.getElementById("excelFile");
    const excelColumnHelp = document.getElementById("excelColumnHelp");
    const excelFileStatus = document.getElementById("excelFileStatus");
    const excelPreviewWrap = document.getElementById("excelPreviewWrap");
    const excelPreviewHead = document.getElementById("excelPreviewHead");
    const excelPreviewBody = document.getElementById("excelPreviewBody");
    const excelPreviewCount = document.getElementById("excelPreviewCount");
    const confirmExcelImportBtn = document.getElementById("confirmExcelImportBtn");
    const cancelExcelImportBtn = document.getElementById("cancelExcelImportBtn");

    let pendingExcelRows = [];
    let pendingExcelHeaders = [];
    let pendingExcelFileName = "";

    const excelColumnGuidance = {
        patients: "<strong>Columnas recomendadas para Pacientes:</strong> Documento, Nombre, Edad, Servicio, Estado, Fecha de registro.",
        services: "<strong>Columnas recomendadas para Servicios:</strong> Código, Nombre o Servicio, Categoría, Duración, Precio o Valor, Estado.",
        inventory: "<strong>Columnas recomendadas para Inventario:</strong> Código, Nombre o Producto, Categoría, Unidad, Stock, Stock mínimo, Vencimiento, Precio o Valor, Estado.",
        budget: "<strong>Columnas recomendadas para Presupuesto:</strong> Concepto, Categoría, Valor o Monto, Estado. Los estados reconocidos son Ejecutado y Programado."
    };

    function setExcelStatus(message, type = "") {
        if (!excelFileStatus) return;
        excelFileStatus.className = "excel-status" + (type ? " " + type : "");
        excelFileStatus.textContent = message;
    }

    function normalizeExcelHeader(value) {
        return String(value ?? "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");
    }

    function excelValue(row, aliases) {
        const keys = Object.keys(row || {});
        for (const alias of aliases) {
            const expected = normalizeExcelHeader(alias);
            const found = keys.find(key => normalizeExcelHeader(key) === expected);
            if (found !== undefined && String(row[found] ?? "").trim() !== "") {
                return row[found];
            }
        }
        return "";
    }

    function excelNumber(value, fallback = 0) {
        if (typeof value === "number" && Number.isFinite(value)) return value;
        let text = String(value ?? "").trim().replace(/\s/g, "").replace(/\$/g, "");
        if (!text) return fallback;
        // Soporta formatos frecuentes: 85000, 85.000 y 85.000,50.
        if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(text)) {
            text = text.replace(/\./g, "").replace(",", ".");
        } else if (/^-?\d+(,\d+)$/.test(text)) {
            text = text.replace(",", ".");
        } else {
            text = text.replace(/,/g, "");
        }
        const number = Number(text);
        return Number.isFinite(number) ? number : fallback;
    }

    function normalizeExcelStatus(value, fallback = "Activo") {
        const status = String(value ?? "").trim().toLowerCase();
        if (["inactivo", "inactiva", "inactive", "no", "0"].includes(status)) return "Inactivo";
        if (["programado", "programada", "pendiente", "programmed"].includes(status)) return "Programado";
        if (["ejecutado", "ejecutada", "realizado", "realizada", "pagado"].includes(status)) return "Ejecutado";
        if (["activo", "activa", "active", "si", "sí", "1"].includes(status)) return "Activo";
        return fallback;
    }

    function normalizeExcelDate(value) {
        if (!value) return "";
        if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10);
        const text = String(value).trim();
        if (/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0, 10);
        const match = text.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
        if (match) return `${match[3]}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`;
        return text;
    }

    function mapExcelRow(row, target) {
        if (target === "patients") {
            const document = String(excelValue(row, ["documento", "document", "identificacion", "identificación", "numero de documento", "cedula", "cédula"])).trim();
            const name = String(excelValue(row, ["nombre", "name", "nombre completo", "paciente"])).trim();
            if (!document || !name) return null;
            return {
                id: generateId("P"), document, name,
                age: Math.max(0, excelNumber(excelValue(row, ["edad", "age"]), 0)),
                service: String(excelValue(row, ["servicio", "service", "especialidad"])).trim() || "Sin especificar",
                status: normalizeExcelStatus(excelValue(row, ["estado", "status"]), "Activo"),
                createdAt: normalizeExcelDate(excelValue(row, ["fecha de registro", "fecha registro", "fecha", "createdat"])) || new Date().toISOString().slice(0, 10)
            };
        }
        if (target === "services") {
            const code = String(excelValue(row, ["codigo", "código", "code", "codigo servicio", "codigoservicio"])).trim();
            const name = String(excelValue(row, ["nombre", "name", "servicio", "nombre servicio"])).trim();
            if (!code || !name) return null;
            return {
                id: generateId("S"), code, name,
                category: String(excelValue(row, ["categoria", "category", "tipo"])).trim() || "Consulta",
                duration: String(excelValue(row, ["duracion", "duración", "duration", "tiempo"])).trim() || "30 min",
                price: Math.max(0, excelNumber(excelValue(row, ["valor", "precio", "price", "tarifa", "costo"]), 0)),
                status: normalizeExcelStatus(excelValue(row, ["estado", "status"]), "Activo")
            };
        }
        if (target === "inventory") {
            const code = String(excelValue(row, ["codigo", "código", "code", "codigo producto", "referencia"])).trim();
            const name = String(excelValue(row, ["nombre", "name", "producto", "medicamento", "insumo"])).trim();
            if (!code || !name) return null;
            return {
                id: generateId("I"), code, name,
                category: String(excelValue(row, ["categoria", "category", "tipo"])).trim() || "General",
                unit: String(excelValue(row, ["unidad", "unit", "unidad de medida"])).trim() || "Unidad",
                stock: Math.max(0, excelNumber(excelValue(row, ["stock", "existencias", "cantidad"]), 0)),
                minStock: Math.max(0, excelNumber(excelValue(row, ["stock minimo", "minimo", "minstock", "stock minimo requerido"]), 0)),
                expiry: normalizeExcelDate(excelValue(row, ["vencimiento", "fecha de vencimiento", "expiry", "fecha vencimiento"])),
                price: Math.max(0, excelNumber(excelValue(row, ["precio", "valor", "costo", "costo unitario", "price"]), 0)),
                status: normalizeExcelStatus(excelValue(row, ["estado", "status"]), "Activo")
            };
        }
        if (target === "budget") {
            const concept = String(excelValue(row, ["concepto", "concept", "descripcion", "descripción", "movimiento", "rubro"])).trim();
            if (!concept) return null;
            return {
                id: generateId("B"), concept,
                category: String(excelValue(row, ["categoria", "category", "rubro presupuestal"])).trim() || "General",
                amount: Math.max(0, excelNumber(excelValue(row, ["valor", "monto", "importe", "amount", "presupuesto"]), 0)),
                status: normalizeExcelStatus(excelValue(row, ["estado", "status"]), "Programado")
            };
        }
        return null;
    }

    function getExcelExistingRecords(target) {
        if (target === "patients") return getPatients();
        if (target === "services") return getServices();
        if (target === "inventory") return getInventory();
        return getBudget();
    }

    function saveExcelRecords(target, records) {
        const key = STORAGE[target];
        saveData(key, records);
    }

    function excelDuplicateKey(record, target) {
        if (target === "patients") return String(record.document || "").trim().toLowerCase();
        if (target === "services" || target === "inventory") return String(record.code || "").trim().toLowerCase();
        return `${String(record.concept || "").trim().toLowerCase()}|${String(record.category || "").trim().toLowerCase()}|${Number(record.amount || 0)}`;
    }

    function renderExcelPreview(rows, headers) {
        excelPreviewHead.innerHTML = `<tr>${headers.map(header => `<th>${escapeHtml(header)}</th>`).join("")}</tr>`;
        excelPreviewBody.innerHTML = rows.slice(0, 8).map(row => `<tr>${headers.map(header => `<td>${escapeHtml(row[header] ?? "")}</td>`).join("")}</tr>`).join("");
        excelPreviewCount.textContent = `${rows.length} fila(s) detectada(s); vista previa de ${Math.min(rows.length, 8)}`;
        excelPreviewWrap.hidden = false;
    }

    if (excelTarget) {
        excelTarget.addEventListener("change", () => {
            excelColumnHelp.innerHTML = excelColumnGuidance[excelTarget.value];
            if (pendingExcelRows.length) {
                const valid = pendingExcelRows.filter(row => mapExcelRow(row, excelTarget.value));
                confirmExcelImportBtn.disabled = valid.length === 0;
                setExcelStatus(`${valid.length} fila(s) parecen válidas para ${excelTarget.options[excelTarget.selectedIndex].text}. Revisa la vista previa antes de importar.`, valid.length ? "success" : "warning");
            }
        });
    }

    if (excelFile) {
        excelFile.addEventListener("change", async event => {
            const file = event.target.files && event.target.files[0];
            pendingExcelRows = [];
            pendingExcelHeaders = [];
            pendingExcelFileName = file ? file.name : "";
            confirmExcelImportBtn.disabled = true;
            excelPreviewWrap.hidden = true;
            excelPreviewHead.innerHTML = "";
            excelPreviewBody.innerHTML = "";
            if (!file) {
                setExcelStatus("Selecciona un archivo para revisar sus datos antes de importarlos.");
                return;
            }
            if (!window.XLSX) {
                setExcelStatus("No se pudo cargar el lector de Excel. Comprueba tu conexión a internet y vuelve a cargar la página.", "error");
                return;
            }
            try {
                const buffer = await file.arrayBuffer();
                const workbook = XLSX.read(buffer, { type: "array", cellDates: true });
                const firstSheetName = workbook.SheetNames[0];
                if (!firstSheetName) throw new Error("El archivo no contiene hojas de cálculo.");
                const worksheet = workbook.Sheets[firstSheetName];
                const rows = XLSX.utils.sheet_to_json(worksheet, { defval: "", raw: false });
                if (!rows.length) throw new Error("La primera hoja está vacía o solo contiene encabezados.");
                pendingExcelRows = rows;
                pendingExcelHeaders = Object.keys(rows[0]);
                renderExcelPreview(rows, pendingExcelHeaders);
                const valid = rows.filter(row => mapExcelRow(row, excelTarget.value));
                confirmExcelImportBtn.disabled = valid.length === 0;
                setExcelStatus(`${file.name}: ${rows.length} fila(s) leída(s) en la hoja “${firstSheetName}”. ${valid.length} fila(s) cumplen los campos principales para ${excelTarget.options[excelTarget.selectedIndex].text}.`, valid.length ? "success" : "warning");
            } catch (error) {
                setExcelStatus(error.message || "No fue posible leer el archivo. Revisa el formato y los encabezados.", "error");
                pendingExcelRows = [];
                excelPreviewWrap.hidden = true;
            }
        });
    }

    if (confirmExcelImportBtn) {
        confirmExcelImportBtn.addEventListener("click", () => {
            if (!pendingExcelRows.length) {
                setExcelStatus("Primero selecciona y revisa un archivo.", "warning");
                return;
            }
            const target = excelTarget.value;
            const mapped = pendingExcelRows.map(row => mapExcelRow(row, target)).filter(Boolean);
            if (!mapped.length) {
                setExcelStatus("No hay filas válidas. Revisa los nombres de las columnas y los campos obligatorios.", "error");
                return;
            }
            const current = getExcelExistingRecords(target);
            const known = new Set(current.map(record => excelDuplicateKey(record, target)));
            const toAdd = [];
            let duplicates = 0;
            mapped.forEach(record => {
                const key = excelDuplicateKey(record, target);
                if (known.has(key)) {
                    duplicates++;
                    return;
                }
                known.add(key);
                toAdd.push(record);
            });
            if (!toAdd.length) {
                setExcelStatus(`No se agregaron registros: las ${duplicates} fila(s) válidas ya existen o son duplicadas. No se modificaron los datos actuales.`, "warning");
                return;
            }
            try {
                saveExcelRecords(target, current.concat(toAdd));
                renderAll();
                const moduleName = excelTarget.options[excelTarget.selectedIndex].text;
                setExcelStatus(`Importación completada en ${moduleName}. Se agregaron ${toAdd.length} registro(s), se omitieron ${duplicates} duplicado(s) y se descartaron ${pendingExcelRows.length - mapped.length} fila(s) incompletas. Los datos actuales se conservaron.`, "success");
                confirmExcelImportBtn.disabled = true;
                excelFile.value = "";
                pendingExcelRows = [];
                pendingExcelHeaders = [];
                pendingExcelFileName = "";
                excelPreviewCount.textContent = "Importación finalizada";
            } catch (error) {
                setExcelStatus("No fue posible guardar la importación. El almacenamiento del navegador puede estar lleno.", "error");
            }
        });
    }

    if (cancelExcelImportBtn) {
        cancelExcelImportBtn.addEventListener("click", () => {
            excelFile.value = "";
            pendingExcelRows = [];
            pendingExcelHeaders = [];
            pendingExcelFileName = "";
            confirmExcelImportBtn.disabled = true;
            excelPreviewWrap.hidden = true;
            excelPreviewHead.innerHTML = "";
            excelPreviewBody.innerHTML = "";
            setExcelStatus("Importación cancelada. No se modificaron los datos actuales.");
        });
    }


    /* =================================================
       RENDER GENERAL
    ================================================= */

    function renderAll() {

        syncOperationalBudgetProjection();

        renderDashboard();

        renderPatients(
            document.getElementById(
                "patientSearch"
            )?.value || ""
        );

        renderServices(
            document.getElementById(
                "serviceSearch"
            )?.value || ""
        );

        renderInventory(
            document.getElementById(
                "inventorySearch"
            )?.value || ""
        );

        renderBudget(
            document.getElementById(
                "budgetSearch"
            )?.value || ""
        );

        updateServiceStats();

        updateInventoryStats();

        updateBudgetStats();

        renderAnalysis();

        renderAlerts();

        fillPatientServices();

        fillPredictionServices();

    }


    /* =================================================
       INICIAR SISTEMA
    ================================================= */

    renderAll();


});
