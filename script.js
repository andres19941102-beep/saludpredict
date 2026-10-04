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

/* =========================================================
   SALUDPREDICT
   JAVASCRIPT PRINCIPAL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       CONFIGURACIÓN
    ====================================================== */

    const STORAGE = {

        patients: "saludpredict_patients",

        services: "saludpredict_services",

        inventory: "saludpredict_inventory",

        budget: "saludpredict_budget"

    };


    const BUDGET_APPROVED_VALUE = 1000000000;


    /* =====================================================
       DATOS DE DEMOSTRACIÓN
    ====================================================== */

    const DEMO_PATIENTS = [

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
            createdAt: "2026-10-01"
        },

        {
            id: "P003",
            document: "80123456",
            name: "Carlos Rodríguez",
            age: 58,
            service: "Urgencias",
            status: "Activo",
            createdAt: "2026-09-15"
        },

        {
            id: "P004",
            document: "107890123",
            name: "Laura Martínez",
            age: 29,
            service: "Odontología general",
            status: "Inactivo",
            createdAt: "2026-08-20"
        },

        {
            id: "P005",
            document: "45678123",
            name: "Andrés Torres",
            age: 51,
            service: "Cardiología",
            status: "Activo",
            createdAt: "2026-10-03"
        },

        {
            id: "P006",
            document: "23456789",
            name: "Diana Ramírez",
            age: 46,
            service: "Ginecología",
            status: "Activo",
            createdAt: "2026-09-20"
        },

        {
            id: "P007",
            document: "34567890",
            name: "Felipe Moreno",
            age: 63,
            service: "Gastroenterología",
            status: "Activo",
            createdAt: "2026-09-05"
        },

        {
            id: "P008",
            document: "56789012",
            name: "Natalia Castro",
            age: 31,
            service: "Laboratorio clínico",
            status: "Activo",
            createdAt: "2026-10-04"
        },

        {
            id: "P009",
            document: "67890123",
            name: "Sergio Herrera",
            age: 55,
            service: "Imágenes diagnósticas",
            status: "Activo",
            createdAt: "2026-08-28"
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
            createdAt: "2026-07-14"
        },

        {
            id: "P012",
            document: "90123456",
            name: "Camila Suárez",
            age: 39,
            service: "Medicina general",
            status: "Activo",
            createdAt: "2026-09-30"
        }

    ];


    const DEMO_SERVICES = [

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


    const DEMO_INVENTORY = [

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


    const DEMO_BUDGET = [

        {
            id: "B001",
            concept: "Personal",
            category: "Personal",
            amount: 280000000,
            status: "Ejecutado"
        },

        {
            id: "B002",
            concept: "Compra de medicamentos",
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
            concept: "Capacitación del personal",
            category: "Capacitación",
            amount: 22000000,
            status: "Ejecutado"
        },

        {
            id: "B009",
            concept: "Software y licencias",
            category: "Software y licencias",
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


    /* =====================================================
       FUNCIONES GENERALES
    ====================================================== */

    function clone(data) {

        return JSON.parse(
            JSON.stringify(data)
        );

    }


    function loadData(key, fallback) {

        const stored =
            localStorage.getItem(key);

        if (!stored) {

            const data = clone(fallback);

            localStorage.setItem(
                key,
                JSON.stringify(data)
            );

            return data;
        }

        try {

            const data = JSON.parse(stored);

            if (!Array.isArray(data)) {

                return clone(fallback);

            }

            return data;

        } catch (error) {

            return clone(fallback);

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
            DEMO_PATIENTS
        );

    }


    function getServices() {

        return loadData(
            STORAGE.services,
            DEMO_SERVICES
        );

    }


    function getInventory() {

        const data = loadData(
            STORAGE.inventory,
            DEMO_INVENTORY
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
                Number(item.stock ?? 0),

            minStock:
                Number(item.minStock ?? 0)

        }));

    }


    function getBudget() {

        return loadData(
            STORAGE.budget,
            DEMO_BUDGET
        );

    }


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


    function getToday() {

        const date = new Date();

        return date
            .toISOString()
            .split("T")[0];

    }


    function getDaysUntil(dateString) {

        if (!dateString) {
            return Infinity;
        }

        const today =
            new Date();

        today.setHours(
            0, 0, 0, 0
        );

        const expiry =
            new Date(dateString);

        expiry.setHours(
            0, 0, 0, 0
        );

        return Math.ceil(
            (
                expiry - today
            ) /
            (1000 * 60 * 60 * 24)
        );

    }


    /* =====================================================
       DATOS INICIALES
    ====================================================== */

    function initializeData() {

        const keys = [
            STORAGE.patients,
            STORAGE.services,
            STORAGE.inventory,
            STORAGE.budget
        ];

        const hasAnyData =
            keys.some(key => {

                const raw =
                    localStorage.getItem(key);

                if (!raw) {
                    return false;
                }

                try {

                    const parsed =
                        JSON.parse(raw);

                    return Array.isArray(parsed) &&
                           parsed.length > 0;

                } catch {

                    return false;

                }

            });


        if (!hasAnyData) {

            saveData(
                STORAGE.patients,
                clone(DEMO_PATIENTS)
            );

            saveData(
                STORAGE.services,
                clone(DEMO_SERVICES)
            );

            saveData(
                STORAGE.inventory,
                clone(DEMO_INVENTORY)
            );

            saveData(
                STORAGE.budget,
                clone(DEMO_BUDGET)
            );

        }

    }


    /* =====================================================
       NAVEGACIÓN
    ====================================================== */

    function showSection(sectionId) {

        document
            .querySelectorAll(".section")
            .forEach(section => {

                section.classList.toggle(
                    "active",
                    section.id === sectionId
                );

            });


        document
            .querySelectorAll(".nav-item")
            .forEach(item => {

                item.classList.toggle(
                    "active",
                    item.dataset.section === sectionId
                );

            });


        const sidebar =
            document.getElementById("sidebar");

        if (sidebar) {
            sidebar.classList.remove("open");
        }


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }


    document
        .querySelectorAll(".nav-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    showSection(
                        this.dataset.section
                    );

                }
            );

        });


    document
        .querySelectorAll("[data-go]")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    showSection(
                        this.dataset.go
                    );

                }
            );

        });


    const menuBtn =
        document.getElementById("menuBtn");

    if (menuBtn) {

        menuBtn.addEventListener(
            "click",
            function () {

                document
                    .getElementById("sidebar")
                    .classList.toggle("open");

            }
        );

    }


    /* =====================================================
       RENDER DASHBOARD
    ====================================================== */

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
                item => item.status === "Activo"
            );


        const lowStock =
            inventory.filter(
                item =>
                    item.stock <= item.minStock
            );


        const expiring =
            inventory.filter(
                item => {

                    const days =
                        getDaysUntil(
                            item.expiry
                        );

                    return days >= 0 &&
                           days <= 60;

                }
            );


        const executed =
            budget
                .filter(
                    item =>
                        item.status === "Ejecutado"
                )
                .reduce(
                    (
                        total,
                        item
                    ) =>
                        total +
                        Number(item.amount || 0),
                    0
                );


        const percentage =
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


        const inventoryAvailable =
            inventory.length === 0
                ? 0
                : Math.round(
                    (
                        (
                            inventory.length -
                            lowStock.length
                        ) /
                        inventory.length
                    ) * 100
                );


        document.getElementById(
            "dashboardInventory"
        ).textContent =
            inventoryAvailable + "%";


        document.getElementById(
            "dashboardBudget"
        ).textContent =
            percentage + "%";


        const totalAlerts =
            lowStock.length +
            expiring.length +
            services.filter(
                item =>
                    item.status === "Inactivo"
            ).length;


        document.getElementById(
            "dashboardAlertCount"
        ).textContent =
            formatNumber(
                totalAlerts
            );


        document.getElementById(
            "dashboardBudgetPercentage"
        ).textContent =
            percentage + "%";


        document.getElementById(
            "dashboardBudgetBar"
        ).style.width =
            percentage + "%";


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


        renderDashboardAlerts(
            lowStock,
            expiring,
            services
        );


        renderInventorySummary(
            inventory,
            lowStock,
            expiring
        );


        document.getElementById(
            "dashboardSystemSummary"
        ).innerHTML = `

            <div class="summary-list">

                <div class="summary-row">
                    <span>Pacientes registrados</span>
                    <strong>${formatNumber(patients.length)}</strong>
                </div>

                <div class="summary-row">
                    <span>Servicios activos</span>
                    <strong>${formatNumber(activeServices.length)}</strong>
                </div>

                <div class="summary-row">
                    <span>Productos inventario</span>
                    <strong>${formatNumber(inventory.length)}</strong>
                </div>

                <div class="summary-row">
                    <span>Presupuesto ejecutado</span>
                    <strong>${percentage}%</strong>
                </div>

            </div>

        `;

    }


    function renderDashboardAlerts(
        lowStock,
        expiring,
        services
    ) {

        const container =
            document.getElementById(
                "dashboardAlerts"
            );


        const alerts = [];


        lowStock
            .slice(0, 2)
            .forEach(item => {

                alerts.push({

                    type: "danger",

                    title: "Inventario bajo",

                    text:
                        `${item.name} tiene ` +
                        `${item.stock} ${item.unit} ` +
                        `disponibles.`

                });

            });


        expiring
            .slice(0, 2)
            .forEach(item => {

                alerts.push({

                    type: "warning",

                    title: "Próximo vencimiento",

                    text:
                        `${item.name} vence el ` +
                        `${item.expiry}.`

                });

            });


        const inactive =
            services.filter(
                item =>
                    item.status === "Inactivo"
            );


        if (inactive.length > 0) {

            alerts.push({

                type: "warning",

                title: "Servicio inactivo",

                text:
                    `${inactive.length} servicio(s) ` +
                    `se encuentran inactivos.`

            });

        }


        if (alerts.length === 0) {

            alerts.push({

                type: "success",

                title: "Operación estable",

                text:
                    "No se identifican alertas prioritarias."

            });

        }


        container.innerHTML =
            alerts
                .slice(0, 5)
                .map(alert => `

                    <div class="alert-item">

                        <div class="alert-item-icon ${alert.type}">
                            ${alert.type === "danger" ? "!" : alert.type === "warning" ? "⚠" : "✓"}
                        </div>

                        <div>
                            <strong>
                                ${escapeHtml(alert.title)}
                            </strong>

                            <p>
                                ${escapeHtml(alert.text)}
                            </p>
                        </div>

                    </div>

                `)
                .join("");

    }


    function renderInventorySummary(
        inventory,
        lowStock,
        expiring
    ) {

        const normal =
            inventory.length -
            lowStock.length -
            expiring.length;


        document.getElementById(
            "dashboardInventorySummary"
        ).innerHTML = `

            <div class="inventory-summary">

                <div class="inventory-summary-row">

                    <div class="inventory-summary-label">
                        <span class="inventory-dot green"></span>
                        <span>Stock adecuado</span>
                    </div>

                    <strong>
                        ${Math.max(normal, 0)}
                    </strong>

                </div>

                <div class="inventory-summary-row">

                    <div class="inventory-summary-label">
                        <span class="inventory-dot yellow"></span>
                        <span>Próximo vencimiento</span>
                    </div>

                    <strong>
                        ${expiring.length}
                    </strong>

                </div>

                <div class="inventory-summary-row">

                    <div class="inventory-summary-label">
                        <span class="inventory-dot red"></span>
                        <span>Stock bajo</span>
                    </div>

                    <strong>
                        ${lowStock.length}
                    </strong>

                </div>

            </div>

        `;

    }


    /* =====================================================
       PACIENTES
    ====================================================== */

    function populatePatientServices() {

        const select =
            document.getElementById(
                "service"
            );

        if (!select) {
            return;
        }


        const services =
            getServices()
                .filter(
                    item =>
                        item.status === "Activo"
                );


        select.innerHTML = services
            .map(
                service => `

                    <option value="${escapeHtml(service.name)}">
                        ${escapeHtml(service.name)}
                    </option>

                `
            )
            .join("");

    }


    function renderPatients(
        search = ""
    ) {

        const patients =
            getPatients();


        const normalizedSearch =
            search
                .trim()
                .toLowerCase();


        const filtered =
            patients.filter(
                patient => {

                    const content =
                        `${patient.document} ` +
                        `${patient.name} ` +
                        `${patient.service}`
                            .toLowerCase();

                    return content.includes(
                        normalizedSearch
                    );

                }
            );


        const table =
            document.getElementById(
                "patientsTable"
            );


        if (filtered.length === 0) {

            table.innerHTML = `

                <tr>
                    <td colspan="6">

                        <div class="empty-state">

                            <strong>
                                No hay pacientes
                            </strong>

                            <span>
                                Registra un nuevo paciente
                                para comenzar.
                            </span>

                        </div>

                    </td>
                </tr>

            `;

            return;

        }


        table.innerHTML =
            filtered
                .map(patient => `

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
                            ${escapeHtml(patient.age)}
                        </td>

                        <td>
                            ${escapeHtml(patient.service)}
                        </td>

                        <td>

                            <span class="badge ${
                                patient.status === "Activo"
                                    ? "active"
                                    : "inactive"
                            }">

                                ${escapeHtml(patient.status)}

                            </span>

                        </td>

                        <td>

                            <div class="actions">

                                <button
                                    class="btn btn-secondary btn-small"
                                    data-edit-patient="${patient.id}"
                                >
                                    Editar
                                </button>

                                <button
                                    class="btn btn-danger btn-small"
                                    data-delete-patient="${patient.id}"
                                >
                                    Eliminar
                                </button>

                            </div>

                        </td>

                    </tr>

                `)
                .join("");


        updatePatientStats(
            patients
        );

    }


    function updatePatientStats(
        patients
    ) {

        const active =
            patients.filter(
                item =>
                    item.status === "Activo"
            ).length;


        const now =
            new Date();


        const newPatients =
            patients.filter(
                item => {

                    if (!item.createdAt) {
                        return false;
                    }

                    const date =
                        new Date(
                            item.createdAt
                        );

                    return (
                        date.getMonth() ===
                        now.getMonth()
                    ) &&
                    (
                        date.getFullYear() ===
                        now.getFullYear()
                    );

                }
            ).length;


        document.getElementById(
            "totalPatients"
        ).textContent =
            formatNumber(
                patients.length
            );


        document.getElementById(
            "activePatients"
        ).textContent =
            formatNumber(
                active
            );


        document.getElementById(
            "newPatients"
        ).textContent =
            formatNumber(
                newPatients
            );

    }


    /* =====================================================
       MODAL PACIENTES
    ====================================================== */

    function openPatientModal(
        patient = null
    ) {

        const modal =
            document.getElementById(
                "patientModal"
            );


        const form =
            document.getElementById(
                "patientForm"
            );


        form.reset();


        document.getElementById(
            "patientId"
        ).value =
            patient
                ? patient.id
                : "";


        document.getElementById(
            "modalTitle"
        ).textContent =
            patient
                ? "Editar paciente"
                : "Nuevo paciente";


        populatePatientServices();


        if (patient) {

            document.getElementById(
                "document"
            ).value =
                patient.document || "";


            document.getElementById(
                "name"
            ).value =
                patient.name || "";


            document.getElementById(
                "age"
            ).value =
                patient.age || "";


            document.getElementById(
                "service"
            ).value =
                patient.service || "";


            document.getElementById(
                "status"
            ).value =
                patient.status || "Activo";

        }


        modal.classList.add("show");

    }


    function closePatientModal() {

        document
            .getElementById(
                "patientModal"
            )
            .classList.remove("show");

    }


    document
        .getElementById("newPatientBtn")
        .addEventListener(
            "click",
            () => openPatientModal()
        );


    document
        .getElementById("closeModal")
        .addEventListener(
            "click",
            closePatientModal
        );


    document
        .getElementById("cancelModal")
        .addEventListener(
            "click",
            closePatientModal
        );


    document
        .getElementById("patientForm")
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const patients =
                    getPatients();


                const id =
                    document.getElementById(
                        "patientId"
                    ).value;


                const patientData = {

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
                                    item =>
                                        item.id === id
                                )?.createdAt ||
                                getToday()
                            )
                            : getToday()

                };


                const index =
                    patients.findIndex(
                        item =>
                            item.id === id
                    );


                if (index >= 0) {

                    patients[index] =
                        patientData;

                } else {

                    patients.push(
                        patientData
                    );

                }


                saveData(
                    STORAGE.patients,
                    patients
                );


                closePatientModal();

                renderAll();

            }
        );


    document
        .getElementById("patientSearch")
        .addEventListener(
            "input",
            function () {

                renderPatients(
                    this.value
                );

            }
        );


    document.addEventListener(
        "click",
        function (event) {

            const editButton =
                event.target.closest(
                    "[data-edit-patient]"
                );


            if (editButton) {

                const patients =
                    getPatients();

                const patient =
                    patients.find(
                        item =>
                            item.id ===
                            editButton.dataset
                                .editPatient
                    );

                if (patient) {
                    openPatientModal(
                        patient
                    );
                }

            }


            const deleteButton =
                event.target.closest(
                    "[data-delete-patient]"
                );


            if (deleteButton) {

                if (
                    !confirm(
                        "¿Deseas eliminar este paciente?"
                    )
                ) {
                    return;
                }


                const patients =
                    getPatients()
                        .filter(
                            item =>
                                item.id !==
                                deleteButton.dataset
                                    .deletePatient
                        );


                saveData(
                    STORAGE.patients,
                    patients
                );


                renderAll();

            }

        }
    );


    /* =====================================================
       SERVICIOS
    ====================================================== */

    function renderServices(
        search = ""
    ) {

        const services =
            getServices();


        const term =
            search
                .trim()
                .toLowerCase();


        const filtered =
            services.filter(
                item => {

                    const content =
                        `${item.code} ` +
                        `${item.name} ` +
                        `${item.category}`
                            .toLowerCase();

                    return content.includes(
                        term
                    );

                }
            );


        const table =
            document.getElementById(
                "servicesTable"
            );


        if (filtered.length === 0) {

            table.innerHTML = `

                <tr>
                    <td colspan="7">

                        <div class="empty-state">

                            <strong>
                                No hay servicios
                            </strong>

                            <span>
                                Registra un servicio
                                para comenzar.
                            </span>

                        </div>

                    </td>
                </tr>

            `;

        } else {

            table.innerHTML =
                filtered
                    .map(service => `

                        <tr>

                            <td>
                                ${escapeHtml(service.code)}
                            </td>

                            <td>
                                <strong>
                                    ${escapeHtml(service.name)}
                                </strong>
                            </td>

                            <td>
                                ${escapeHtml(service.category)}
                            </td>

                            <td>
                                ${escapeHtml(service.duration)}
                            </td>

                            <td>
                                ${formatCurrency(
                                    service.price
                                )}
                            </td>

                            <td>

                                <span class="badge ${
                                    service.status === "Activo"
                                        ? "active"
                                        : "inactive"
                                }">

                                    ${escapeHtml(
                                        service.status
                                    )}

                                </span>

                            </td>

                            <td>

                                <div class="actions">

                                    <button
                                        class="btn btn-secondary btn-small"
                                        data-edit-service="${service.id}"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        class="btn btn-danger btn-small"
                                        data-delete-service="${service.id}"
                                    >
                                        Eliminar
                                    </button>

                                </div>

                            </td>

                        </tr>

                    `)
                    .join("");

        }


        const active =
            services.filter(
                item =>
                    item.status === "Activo"
            );


        const average =
            services.length
                ? services.reduce(
                    (
                        total,
                        item
                    ) =>
                        total +
                        Number(item.price || 0),
                    0
                ) / services.length
                : 0;


        document.getElementById(
            "totalServices"
        ).textContent =
            formatNumber(
                services.length
            );


        document.getElementById(
            "activeServices"
        ).textContent =
            formatNumber(
                active.length
            );


        document.getElementById(
            "averageServicePrice"
        ).textContent =
            formatCurrency(
                average
            );

    }


    function openServiceModal(
        service = null
    ) {

        const modal =
            document.getElementById(
                "serviceModal"
            );


        document
            .getElementById("serviceForm")
            .reset();


        document.getElementById(
            "serviceId"
        ).value =
            service
                ? service.id
                : "";


        document.getElementById(
            "serviceModalTitle"
        ).textContent =
            service
                ? "Editar servicio"
                : "Nuevo servicio";


        if (service) {

            document.getElementById(
                "serviceCode"
            ).value =
                service.code || "";


            document.getElementById(
                "serviceName"
            ).value =
                service.name || "";


            document.getElementById(
                "serviceCategory"
            ).value =
                service.category || "Consulta";


            document.getElementById(
                "serviceDuration"
            ).value =
                service.duration || "";


            document.getElementById(
                "servicePrice"
            ).value =
                service.price || 0;


            document.getElementById(
                "serviceStatus"
            ).value =
                service.status || "Activo";

        }


        modal.classList.add("show");

    }


    function closeServiceModal() {

        document
            .getElementById(
                "serviceModal"
            )
            .classList.remove("show");

    }


    document
        .getElementById("newServiceBtn")
        .addEventListener(
            "click",
            () => openServiceModal()
        );


    document
        .getElementById("closeServiceModal")
        .addEventListener(
            "click",
            closeServiceModal
        );


    document
        .getElementById("cancelServiceBtn")
        .addEventListener(
            "click",
            closeServiceModal
        );


    document
        .getElementById("serviceForm")
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const services =
                    getServices();


                const id =
                    document.getElementById(
                        "serviceId"
                    ).value;


                const data = {

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


                const index =
                    services.findIndex(
                        item =>
                            item.id === id
                    );


                if (index >= 0) {

                    services[index] =
                        data;

                } else {

                    services.push(
                        data
                    );

                }


                saveData(
                    STORAGE.services,
                    services
                );


                closeServiceModal();

                renderAll();

            }
        );


    document
        .getElementById("serviceSearch")
        .addEventListener(
            "input",
            function () {

                renderServices(
                    this.value
                );

            }
        );


    document.addEventListener(
        "click",
        function (event) {

            const edit =
                event.target.closest(
                    "[data-edit-service]"
                );


            if (edit) {

                const service =
                    getServices().find(
                        item =>
                            item.id ===
                            edit.dataset
                                .editService
                    );

                if (service) {

                    openServiceModal(
                        service
                    );

                }

            }


            const del =
                event.target.closest(
                    "[data-delete-service]"
                );


            if (del) {

                if (
                    !confirm(
                        "¿Deseas eliminar este servicio?"
                    )
                ) {
                    return;
                }


                const services =
                    getServices()
                        .filter(
                            item =>
                                item.id !==
                                del.dataset
                                    .deleteService
                        );


                saveData(
                    STORAGE.services,
                    services
                );


                renderAll();

            }

        }
    );


    /* =====================================================
       INVENTARIO
    ====================================================== */

    function renderInventory(
        search = ""
    ) {

        const inventory =
            getInventory();


        const term =
            search
                .trim()
                .toLowerCase();


        const filtered =
            inventory.filter(
                item => {

                    const content =
                        `${item.code} ` +
                        `${item.name} ` +
                        `${item.category}`
                            .toLowerCase();

                    return content.includes(
                        term
                    );

                }
            );


        const table =
            document.getElementById(
                "inventoryTable"
            );


        if (filtered.length === 0) {

            table.innerHTML = `

                <tr>
                    <td colspan="9">

                        <div class="empty-state">

                            <strong>
                                No hay productos
                            </strong>

                            <span>
                                Registra un producto
                                para comenzar.
                            </span>

                        </div>

                    </td>
                </tr>

            `;

        } else {

            table.innerHTML =
                filtered
                    .map(item => {

                        const low =
                            item.stock <=
                            item.minStock;


                        const days =
                            getDaysUntil(
                                item.expiry
                            );


                        const expiring =
                            days >= 0 &&
                            days <= 60;


                        let statusBadge =
                            "success";

                        let statusText =
                            "Disponible";


                        if (low) {

                            statusBadge =
                                "danger";

                            statusText =
                                "Stock bajo";

                        } else if (expiring) {

                            statusBadge =
                                "warning";

                            statusText =
                                "Próximo a vencer";

                        }


                        return `

                            <tr>

                                <td>
                                    ${escapeHtml(item.code)}
                                </td>

                                <td>
                                    <strong>
                                        ${escapeHtml(item.name)}
                                    </strong>
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
                                            ? escapeHtml(
                                                item.expiry
                                            )
                                            : "No aplica"
                                    }
                                </td>

                                <td>

                                    <span class="badge ${statusBadge}">
                                        ${statusText}
                                    </span>

                                </td>

                                <td>

                                    <div class="actions">

                                        <button
                                            class="btn btn-secondary btn-small"
                                            data-edit-inventory="${item.id}"
                                        >
                                            Editar
                                        </button>

                                        <button
                                            class="btn btn-danger btn-small"
                                            data-delete-inventory="${item.id}"
                                        >
                                            Eliminar
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        `;

                    })
                    .join("");

        }


        const lowStock =
            inventory.filter(
                item =>
                    item.stock <= item.minStock
            );


        const expiring =
            inventory.filter(
                item => {

                    const days =
                        getDaysUntil(
                            item.expiry
                        );

                    return days >= 0 &&
                           days <= 60;

                }
            );


        document.getElementById(
            "totalInventory"
        ).textContent =
            formatNumber(
                inventory.length
            );


        document.getElementById(
            "lowStockInventory"
        ).textContent =
            formatNumber(
                lowStock.length
            );


        document.getElementById(
            "expiringInventory"
        ).textContent =
            formatNumber(
                expiring.length
            );

    }


    function openInventoryModal(
        item = null
    ) {

        const modal =
            document.getElementById(
                "inventoryModal"
            );


        document
            .getElementById("inventoryForm")
            .reset();


        document.getElementById(
            "inventoryId"
        ).value =
            item
                ? item.id
                : "";


        document.getElementById(
            "inventoryModalTitle"
        ).textContent =
            item
                ? "Editar producto"
                : "Nuevo producto";


        if (item) {

            document.getElementById(
                "inventoryCode"
            ).value =
                item.code || "";


            document.getElementById(
                "inventoryName"
            ).value =
                item.name || "";


            document.getElementById(
                "inventoryCategory"
            ).value =
                item.category ||
                "Medicamentos";


            document.getElementById(
                "inventoryUnit"
            ).value =
                item.unit ||
                "Unidad";


            document.getElementById(
                "inventoryStock"
            ).value =
                item.stock || 0;


            document.getElementById(
                "inventoryMinStock"
            ).value =
                item.minStock || 0;


            document.getElementById(
                "inventoryExpiry"
            ).value =
                item.expiry || "";


            document.getElementById(
                "inventoryPrice"
            ).value =
                item.price || 0;


            document.getElementById(
                "inventoryStatus"
            ).value =
                item.status || "Activo";

        }


        modal.classList.add("show");

    }


    function closeInventoryModal() {

        document
            .getElementById(
                "inventoryModal"
            )
            .classList.remove("show");

    }


    document
        .getElementById("newInventoryBtn")
        .addEventListener(
            "click",
            () => openInventoryModal()
        );


    document
        .getElementById("closeInventoryModal")
        .addEventListener(
            "click",
            closeInventoryModal
        );


    document
        .getElementById("cancelInventoryModal")
        .addEventListener(
            "click",
            closeInventoryModal
        );


    document
        .getElementById("inventoryForm")
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const inventory =
                    getInventory();


                const id =
                    document.getElementById(
                        "inventoryId"
                    ).value;


                const data = {

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


                const index =
                    inventory.findIndex(
                        item =>
                            item.id === id
                    );


                if (index >= 0) {

                    inventory[index] =
                        data;

                } else {

                    inventory.push(
                        data
                    );

                }


                saveData(
                    STORAGE.inventory,
                    inventory
                );


                closeInventoryModal();

                renderAll();

            }
        );


    document
        .getElementById("inventorySearch")
        .addEventListener(
            "input",
            function () {

                renderInventory(
                    this.value
                );

            }
        );


    document.addEventListener(
        "click",
        function (event) {

            const edit =
                event.target.closest(
                    "[data-edit-inventory]"
                );


            if (edit) {

                const item =
                    getInventory().find(
                        product =>
                            product.id ===
                            edit.dataset
                                .editInventory
                    );


                if (item) {

                    openInventoryModal(
                        item
                    );

                }

            }


            const del =
                event.target.closest(
                    "[data-delete-inventory]"
                );


            if (del) {

                if (
                    !confirm(
                        "¿Deseas eliminar este producto?"
                    )
                ) {
                    return;
                }


                const inventory =
                    getInventory()
                        .filter(
                            item =>
                                item.id !==
                                del.dataset
                                    .deleteInventory
                        );


                saveData(
                    STORAGE.inventory,
                    inventory
                );


                renderAll();

            }

        }
    );


    /* =====================================================
       PRESUPUESTO
    ====================================================== */

    function renderBudget(
        search = ""
    ) {

        const budget =
            getBudget();


        const term =
            search
                .trim()
                .toLowerCase();


        const filtered =
            budget.filter(
                item => {

                    const content =
                        `${item.concept} ` +
                        `${item.category}`
                            .toLowerCase();

                    return content.includes(
                        term
                    );

                }
            );


        const table =
            document.getElementById(
                "budgetTable"
            );


        table.innerHTML =
            filtered.length
                ? filtered
                    .map(item => `

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

                                <span class="badge ${
                                    item.status === "Ejecutado"
                                        ? "active"
                                        : "warning"
                                }">

                                    ${escapeHtml(item.status)}

                                </span>

                            </td>

                            <td>

                                <div class="actions">

                                    <button
                                        class="btn btn-secondary btn-small"
                                        data-edit-budget="${item.id}"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        class="btn btn-danger btn-small"
                                        data-delete-budget="${item.id}"
                                    >
                                        Eliminar
                                    </button>

                                </div>

                            </td>

                        </tr>

                    `)
                    .join("")
                : `

                    <tr>
                        <td colspan="5">

                            <div class="empty-state">

                                <strong>
                                    No hay movimientos
                                </strong>

                                <span>
                                    Registra un movimiento
                                    presupuestal.
                                </span>

                            </div>

                        </td>
                    </tr>

                `;


        const executed =
            budget
                .filter(
                    item =>
                        item.status ===
                        "Ejecutado"
                )
                .reduce(
                    (
                        total,
                        item
                    ) =>
                        total +
                        Number(item.amount || 0),
                    0
                );


        const available =
            Math.max(
                BUDGET_APPROVED_VALUE -
                executed,
                0
            );


        const percentage =
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

    }


    function openBudgetModal(
        item = null
    ) {

        document
            .getElementById("budgetForm")
            .reset();


        document.getElementById(
            "budgetId"
        ).value =
            item
                ? item.id
                : "";


        document.getElementById(
            "budgetModalTitle"
        ).textContent =
            item
                ? "Editar movimiento"
                : "Nuevo movimiento";


        if (item) {

            document.getElementById(
                "budgetConcept"
            ).value =
                item.concept || "";


            document.getElementById(
                "budgetCategory"
            ).value =
                item.category || "Personal";


            document.getElementById(
                "budgetAmount"
            ).value =
                item.amount || 0;


            document.getElementById(
                "budgetStatus"
            ).value =
                item.status || "Ejecutado";

        }


        document
            .getElementById(
                "budgetModal"
            )
            .classList.add("show");

    }


    function closeBudgetModal() {

        document
            .getElementById(
                "budgetModal"
            )
            .classList.remove("show");

    }


    document
        .getElementById("newBudgetBtn")
        .addEventListener(
            "click",
            () => openBudgetModal()
        );


    document
        .getElementById("closeBudgetModal")
        .addEventListener(
            "click",
            closeBudgetModal
        );


    document
        .getElementById("cancelBudgetModal")
        .addEventListener(
            "click",
            closeBudgetModal
        );


    document
        .getElementById("budgetForm")
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const budget =
                    getBudget();


                const id =
                    document.getElementById(
                        "budgetId"
                    ).value;


                const data = {

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
                        ).value,

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


                const index =
                    budget.findIndex(
                        item =>
                            item.id === id
                    );


                if (index >= 0) {

                    budget[index] =
                        data;

                } else {

                    budget.push(
                        data
                    );

                }


                saveData(
                    STORAGE.budget,
                    budget
                );


                closeBudgetModal();

                renderAll();

            }
        );


    document
        .getElementById("budgetSearch")
        .addEventListener(
            "input",
            function () {

                renderBudget(
                    this.value
                );

            }
        );


    document.addEventListener(
        "click",
        function (event) {

            const edit =
                event.target.closest(
                    "[data-edit-budget]"
                );


            if (edit) {

                const item =
                    getBudget().find(
                        budget =>
                            budget.id ===
                            edit.dataset
                                .editBudget
                    );


                if (item) {

                    openBudgetModal(
                        item
                    );

                }

            }


            const del =
                event.target.closest(
                    "[data-delete-budget]"
                );


            if (del) {

                if (
                    !confirm(
                        "¿Deseas eliminar este movimiento?"
                    )
                ) {
                    return;
                }


                const budget =
                    getBudget()
                        .filter(
                            item =>
                                item.id !==
                                del.dataset
                                    .deleteBudget
                        );


                saveData(
                    STORAGE.budget,
                    budget
                );


                renderAll();

            }

        }
    );


    /* =====================================================
       ANÁLISIS
    ====================================================== */

    function renderAnalysis() {

        const patients =
            getPatients();

        const services =
            getServices();

        const inventory =
            getInventory();

        const budget =
            getBudget();


        const lowStock =
            inventory.filter(
                item =>
                    item.stock <=
                    item.minStock
            );


        document.getElementById(
            "analysisPatients"
        ).textContent =
            formatNumber(
                patients.length
            );


        document.getElementById(
            "analysisServices"
        ).textContent =
            formatNumber(
                services.filter(
                    item =>
                        item.status === "Activo"
                ).length
            );


        document.getElementById(
            "analysisInventory"
        ).textContent =
            formatNumber(
                inventory.length
            );


        document.getElementById(
            "analysisLowStock"
        ).textContent =
            formatNumber(
                lowStock.length
            );


        renderPatientAnalysis(
            patients
        );


        renderInventoryAnalysis(
            inventory
        );


        renderFinancialAnalysis(
            budget
        );

    }


    function renderPatientAnalysis(
        patients
    ) {

        const counts = {};


        patients.forEach(
            patient => {

                counts[patient.service] =
                    (
                        counts[patient.service] ||
                        0
                    ) + 1;

            }
        );


        const sorted =
            Object.entries(counts)
                .sort(
                    (
                        a,
                        b
                    ) =>
                        b[1] - a[1]
                )
                .slice(0, 8);


        const max =
            sorted.length
                ? sorted[0][1]
                : 1;


        document.getElementById(
            "patientsAnalysisChart"
        ).innerHTML =
            sorted.length
                ? sorted.map(
                    ([name, value]) => `

                        <div class="horizontal-row">

                            <span
                                class="horizontal-label"
                                title="${escapeHtml(name)}"
                            >
                                ${escapeHtml(name)}
                            </span>

                            <div class="horizontal-track">

                                <div
                                    class="horizontal-fill"
                                    style="width:${(
                                        value / max
                                    ) * 100}%"
                                ></div>

                            </div>

                            <strong class="horizontal-value">
                                ${value}
                            </strong>

                        </div>

                    `
                ).join("")
                : `

                    <div class="empty-state">
                        No hay información disponible.
                    </div>

                `;

    }


    function renderInventoryAnalysis(
        inventory
    ) {

        const counts = {};


        inventory.forEach(
            item => {

                counts[item.category] =
                    (
                        counts[item.category] ||
                        0
                    ) + 1;

            }
        );


        const sorted =
            Object.entries(counts)
                .sort(
                    (
                        a,
                        b
                    ) =>
                        b[1] - a[1]
                );


        const max =
            sorted.length
                ? sorted[0][1]
                : 1;


        document.getElementById(
            "inventoryAnalysisChart"
        ).innerHTML =
            sorted.map(
                ([name, value]) => `

                    <div class="horizontal-row">

                        <span
                            class="horizontal-label"
                            title="${escapeHtml(name)}"
                        >
                            ${escapeHtml(name)}
                        </span>

                        <div class="horizontal-track">

                            <div
                                class="horizontal-fill"
                                style="width:${(
                                    value / max
                                ) * 100}%"
                            ></div>

                        </div>

                        <strong class="horizontal-value">
                            ${value}
                        </strong>

                    </div>

                `
            ).join("");

    }


    function renderFinancialAnalysis(
        budget
    ) {

        const categories = {};


        budget.forEach(
            item => {

                categories[item.category] =
                    (
                        categories[item.category] ||
                        0
                    ) +
                    Number(
                        item.amount || 0
                    );

            }
        );


        const sorted =
            Object.entries(categories)
                .sort(
                    (
                        a,
                        b
                    ) =>
                        b[1] - a[1]
                );


        document.getElementById(
            "financialAnalysis"
        ).innerHTML =
            sorted.map(
                ([name, value]) => `

                    <div class="financial-row">

                        <span>
                            ${escapeHtml(name)}
                        </span>

                        <strong>
                            ${formatCurrency(value)}
                        </strong>

                    </div>

                `
            ).join("");

    }


    /* =====================================================
       PREDICCIONES
    ====================================================== */

    function populatePredictionServices() {

        const select =
            document.getElementById(
                "predictionService"
            );


        const services =
            getServices()
                .filter(
                    item =>
                        item.status === "Activo"
                );


        select.innerHTML = `

            <option value="">
                Selecciona un servicio
            </option>

        ` +
        services
            .map(
                service => `

                    <option value="${escapeHtml(service.name)}">
                        ${escapeHtml(service.name)}
                    </option>

                `
            )
            .join("");

    }


    function generatePrediction() {

        const serviceName =
            document.getElementById(
                "predictionService"
            ).value;


        const period =
            Number(
                document.getElementById(
                    "predictionPeriod"
                ).value
            );


        if (!serviceName) {

            alert(
                "Selecciona un servicio."
            );

            return;

        }


        const patients =
            getPatients();


        const servicePatients =
            patients.filter(
                patient =>
                    patient.service ===
                    serviceName
            ).length;


        const base =
            Math.max(
                servicePatients,
                1
            );


        const dailyAverage =
            base / 30;


        const estimated =
            Math.max(
                1,
                Math.round(
                    dailyAverage *
                    period *
                    1.12
                )
            );


        const variation =
            12;


        document.getElementById(
            "predictionResult"
        ).innerHTML = `

            <div class="prediction-cards">

                <div class="prediction-card">

                    <span>
                        Demanda histórica registrada
                    </span>

                    <strong>
                        ${base}
                    </strong>

                </div>

                <div class="prediction-card">

                    <span>
                        Demanda estimada
                    </span>

                    <strong>
                        ${estimated}
                    </strong>

                </div>

                <div class="prediction-card">

                    <span>
                        Variación estimada
                    </span>

                    <strong>
                        +${variation}%
                    </strong>

                </div>

            </div>

            <div class="info-note" style="margin-top:18px;">

                Para <strong>
                    ${escapeHtml(serviceName)}
                </strong>,
                SALUDPREDICT estima aproximadamente
                <strong>
                    ${estimated}
                </strong>
                atenciones durante los próximos
                <strong>
                    ${period} días
                </strong>,
                tomando como referencia los registros
                actuales disponibles.

            </div>

        `;

    }


    document
        .getElementById(
            "generatePredictionBtn"
        )
        .addEventListener(
            "click",
            generatePrediction
        );


    /* =====================================================
       ALERTAS
    ====================================================== */

    function generateAlerts() {

        const inventory =
            getInventory();

        const services =
            getServices();

        const budget =
            getBudget();


        const alerts = [];


        inventory
            .filter(
                item =>
                    item.stock <=
                    item.minStock
            )
            .forEach(
                item => {

                    alerts.push({

                        level: "critical",

                        title:
                            "Stock bajo",

                        description:
                            `${item.name} tiene ` +
                            `${item.stock} ${item.unit} ` +
                            `y el mínimo establecido es ` +
                            `${item.minStock}.`

                    });

                }
            );


        inventory
            .filter(
                item => {

                    const days =
                        getDaysUntil(
                            item.expiry
                        );

                    return days >= 0 &&
                           days <= 60;

                }
            )
            .forEach(
                item => {

                    alerts.push({

                        level: "attention",

                        title:
                            "Producto próximo a vencer",

                        description:
                            `${item.name} tiene fecha ` +
                            `de vencimiento ${item.expiry}.`

                    });

                }
            );


        services
            .filter(
                item =>
                    item.status ===
                    "Inactivo"
            )
            .forEach(
                item => {

                    alerts.push({

                        level: "attention",

                        title:
                            "Servicio inactivo",

                        description:
                            `El servicio ${item.name} ` +
                            `se encuentra inactivo.`

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
                    (
                        total,
                        item
                    ) =>
                        total +
                        Number(item.amount || 0),
                    0
                );


        const percentage =
            (
                executed /
                BUDGET_APPROVED_VALUE
            ) * 100;


        if (percentage >= 85) {

            alerts.push({

                level: "critical",

                title:
                    "Ejecución presupuestal elevada",

                description:
                    `La ejecución presupuestal ` +
                    `alcanza el ${percentage.toFixed(1)}%.`

            });

        } else {

            alerts.push({

                level: "normal",

                title:
                    "Ejecución presupuestal controlada",

                description:
                    `La ejecución presupuestal ` +
                    `actual es del ${percentage.toFixed(1)}%.`

            });

        }


        renderAlerts(
            alerts
        );

    }


    function renderAlerts(
        alerts
    ) {

        const critical =
            alerts.filter(
                item =>
                    item.level ===
                    "critical"
            ).length;


        const attention =
            alerts.filter(
                item =>
                    item.level ===
                    "attention"
            ).length;


        const normal =
            alerts.filter(
                item =>
                    item.level ===
                    "normal"
            ).length;


        document.getElementById(
            "totalAlerts"
        ).textContent =
            formatNumber(
                alerts.length
            );


        document.getElementById(
            "criticalAlerts"
        ).textContent =
            formatNumber(
                critical
            );


        document.getElementById(
            "attentionAlerts"
        ).textContent =
            formatNumber(
                attention
            );


        document.getElementById(
            "normalAlerts"
        ).textContent =
            formatNumber(
                normal
            );


        const container =
            document.getElementById(
                "alertsContainer"
            );


        container.innerHTML =
            alerts.map(
                alert => `

                    <div class="full-alert ${alert.level}">

                        <div class="full-alert-icon">

                            ${
                                alert.level === "critical"
                                    ? "!"
                                    : alert.level === "attention"
                                        ? "⚠"
                                        : "✓"
                            }

                        </div>

                        <div class="full-alert-content">

                            <h3>
                                ${escapeHtml(
                                    alert.title
                                )}
                            </h3>

                            <p>
                                ${escapeHtml(
                                    alert.description
                                )}
                            </p>

                        </div>

                    </div>

                `
            ).join("");

    }


    document
        .getElementById(
            "refreshAlertsBtn"
        )
        .addEventListener(
            "click",
            generateAlerts
        );


    /* =====================================================
       REPORTES
    ====================================================== */

    function openReport(
        type
    ) {

        const patients =
            getPatients();

        const services =
            getServices();

        const inventory =
            getInventory();

        const budget =
            getBudget();


        let title =
            "Reporte institucional";

        let content = "";


        if (type === "patients") {

            title =
                "Reporte de pacientes";


            const active =
                patients.filter(
                    item =>
                        item.status ===
                        "Activo"
                ).length;


            content = `

                <div class="report-summary">

                    <div class="report-summary-card">
                        <span>Total pacientes</span>
                        <strong>${patients.length}</strong>
                    </div>

                    <div class="report-summary-card">
                        <span>Activos</span>
                        <strong>${active}</strong>
                    </div>

                    <div class="report-summary-card">
                        <span>Inactivos</span>
                        <strong>${patients.length - active}</strong>
                    </div>

                </div>

                <div class="table-container">

                    <table class="report-table">

                        <thead>
                            <tr>
                                <th>Documento</th>
                                <th>Nombre</th>
                                <th>Edad</th>
                                <th>Servicio</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody>

                            ${patients.map(
                                patient => `

                                    <tr>

                                        <td>
                                            ${escapeHtml(patient.document)}
                                        </td>

                                        <td>
                                            ${escapeHtml(patient.name)}
                                        </td>

                                        <td>
                                            ${patient.age}
                                        </td>

                                        <td>
                                            ${escapeHtml(patient.service)}
                                        </td>

                                        <td>
                                            ${escapeHtml(patient.status)}
                                        </td>

                                    </tr>

                                `
                            ).join("")}

                        </tbody>

                    </table>

                </div>

            `;

        }


        if (type === "services") {

            title =
                "Reporte de servicios";


            const active =
                services.filter(
                    item =>
                        item.status ===
                        "Activo"
                ).length;


            content = `

                <div class="report-summary">

                    <div class="report-summary-card">
                        <span>Total servicios</span>
                        <strong>${services.length}</strong>
                    </div>

                    <div class="report-summary-card">
                        <span>Activos</span>
                        <strong>${active}</strong>
                    </div>

                    <div class="report-summary-card">
                        <span>Inactivos</span>
                        <strong>${services.length - active}</strong>
                    </div>

                </div>

                <div class="table-container">

                    <table class="report-table">

                        <thead>

                            <tr>
                                <th>Código</th>
                                <th>Servicio</th>
                                <th>Categoría</th>
                                <th>Valor</th>
                                <th>Estado</th>
                            </tr>

                        </thead>

                        <tbody>

                            ${services.map(
                                service => `

                                    <tr>

                                        <td>
                                            ${escapeHtml(service.code)}
                                        </td>

                                        <td>
                                            ${escapeHtml(service.name)}
                                        </td>

                                        <td>
                                            ${escapeHtml(service.category)}
                                        </td>

                                        <td>
                                            ${formatCurrency(service.price)}
                                        </td>

                                        <td>
                                            ${escapeHtml(service.status)}
                                        </td>

                                    </tr>

                                `
                            ).join("")}

                        </tbody>

                    </table>

                </div>

            `;

        }


        if (type === "inventory") {

            title =
                "Reporte de inventario";


            const low =
                inventory.filter(
                    item =>
                        item.stock <=
                        item.minStock
                ).length;


            const expiring =
                inventory.filter(
                    item => {

                        const days =
                            getDaysUntil(
                                item.expiry
                            );

                        return days >= 0 &&
                               days <= 60;

                    }
                ).length;


            content = `

                <div class="report-summary">

                    <div class="report-summary-card">
                        <span>Productos</span>
                        <strong>${inventory.length}</strong>
                    </div>

                    <div class="report-summary-card">
                        <span>Stock bajo</span>
                        <strong>${low}</strong>
                    </div>

                    <div class="report-summary-card">
                        <span>Por vencer</span>
                        <strong>${expiring}</strong>
                    </div>

                </div>

                <div class="table-container">

                    <table class="report-table">

                        <thead>

                            <tr>
                                <th>Código</th>
                                <th>Producto</th>
                                <th>Stock</th>
                                <th>Mínimo</th>
                                <th>Vencimiento</th>
                            </tr>

                        </thead>

                        <tbody>

                            ${inventory.map(
                                item => `

                                    <tr>

                                        <td>
                                            ${escapeHtml(item.code)}
                                        </td>

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
                                            ${
                                                item.expiry ||
                                                "No aplica"
                                            }
                                        </td>

                                    </tr>

                                `
                            ).join("")}

                        </tbody>

                    </table>

                </div>

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
                        (
                            total,
                            item
                        ) =>
                            total +
                            Number(
                                item.amount || 0
                            ),
                        0
                    );


            const available =
                Math.max(
                    BUDGET_APPROVED_VALUE -
                    executed,
                    0
                );


            const percentage =
                (
                    executed /
                    BUDGET_APPROVED_VALUE
                ) * 100;


            content = `

                <div class="report-summary">

                    <div class="report-summary-card">
                        <span>Aprobado</span>
                        <strong>
                            ${formatCurrency(
                                BUDGET_APPROVED_VALUE
                            )}
                        </strong>
                    </div>

                    <div class="report-summary-card">
                        <span>Ejecutado</span>
                        <strong>
                            ${formatCurrency(
                                executed
                            )}
                        </strong>
                    </div>

                    <div class="report-summary-card">
                        <span>Ejecución</span>
                        <strong>
                            ${percentage.toFixed(1)}%
                        </strong>
                    </div>

                </div>

                <div class="panel">

                    <div class="summary-list">

                        <div class="summary-row">
                            <span>Presupuesto aprobado</span>
                            <strong>
                                ${formatCurrency(
                                    BUDGET_APPROVED_VALUE
                                )}
                            </strong>
                        </div>

                        <div class="summary-row">
                            <span>Total ejecutado</span>
                            <strong>
                                ${formatCurrency(executed)}
                            </strong>
                        </div>

                        <div class="summary-row">
                            <span>Saldo disponible</span>
                            <strong>
                                ${formatCurrency(available)}
                            </strong>
                        </div>

                        <div class="summary-row">
                            <span>Porcentaje ejecutado</span>
                            <strong>
                                ${percentage.toFixed(1)}%
                            </strong>
                        </div>

                    </div>

                </div>

            `;

        }


        if (type === "general") {

            title =
                "Reporte institucional";


            const activePatients =
                patients.filter(
                    item =>
                        item.status ===
                        "Activo"
                ).length;


            const activeServices =
                services.filter(
                    item =>
                        item.status ===
                        "Activo"
                ).length;


            const lowStock =
                inventory.filter(
                    item =>
                        item.stock <=
                        item.minStock
                ).length;


            const executed =
                budget
                    .filter(
                        item =>
                            item.status ===
                            "Ejecutado"
                    )
                    .reduce(
                        (
                            total,
                            item
                        ) =>
                            total +
                            Number(
                                item.amount || 0
                            ),
                        0
                    );


            const budgetPercentage =
                (
                    executed /
                    BUDGET_APPROVED_VALUE
                ) * 100;


            content = `

                <div class="report-summary">

                    <div class="report-summary-card">
                        <span>Pacientes</span>
                        <strong>${patients.length}</strong>
                    </div>

                    <div class="report-summary-card">
                        <span>Servicios activos</span>
                        <strong>${activeServices}</strong>
                    </div>

                    <div class="report-summary-card">
                        <span>Inventario</span>
                        <strong>${inventory.length}</strong>
                    </div>

                </div>


                <div class="panel">

                    <div class="summary-list">

                        <div class="summary-row">
                            <span>Pacientes activos</span>
                            <strong>
                                ${activePatients}
                            </strong>
                        </div>

                        <div class="summary-row">
                            <span>Servicios activos</span>
                            <strong>
                                ${activeServices}
                            </strong>
                        </div>

                        <div class="summary-row">
                            <span>Productos con stock bajo</span>
                            <strong>
                                ${lowStock}
                            </strong>
                        </div>

                        <div class="summary-row">
                            <span>Ejecución presupuestal</span>
                            <strong>
                                ${budgetPercentage.toFixed(1)}%
                            </strong>
                        </div>

                        <div class="summary-row">
                            <span>Presupuesto ejecutado</span>
                            <strong>
                                ${formatCurrency(executed)}
                            </strong>
                        </div>

                    </div>

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


        document
            .getElementById(
                "reportModal"
            )
            .classList.add("show");

    }


    document
        .querySelectorAll(".report-btn")
        .forEach(button => {

            button.addEventListener(
                "click",
                function () {

                    openReport(
                        this.dataset.report
                    );

                }
            );

        });


    function closeReportModal() {

        document
            .getElementById(
                "reportModal"
            )
            .classList.remove("show");

    }


    document
        .getElementById(
            "closeReportModal"
        )
        .addEventListener(
            "click",
            closeReportModal
        );


    document
        .getElementById(
            "closeReportBtn"
        )
        .addEventListener(
            "click",
            closeReportModal
        );


    document
        .getElementById(
            "printModalReportBtn"
        )
        .addEventListener(
            "click",
            function () {

                window.print();

            }
        );


    document
        .getElementById(
            "printReportBtn"
        )
        .addEventListener(
            "click",
            function () {

                window.print();

            }
        );


    /* =====================================================
       CARGAR DATOS DEMO
    ====================================================== */

    document
        .getElementById(
            "loadDemoDataBtn"
        )
        .addEventListener(
            "click",
            function () {

                const confirmed =
                    confirm(
                        "Esto reemplazará los datos actuales por los datos de demostración. ¿Deseas continuar?"
                    );


                if (!confirmed) {
                    return;
                }


                saveData(
                    STORAGE.patients,
                    clone(DEMO_PATIENTS)
                );


                saveData(
                    STORAGE.services,
                    clone(DEMO_SERVICES)
                );


                saveData(
                    STORAGE.inventory,
                    clone(DEMO_INVENTORY)
                );


                saveData(
                    STORAGE.budget,
                    clone(DEMO_BUDGET)
                );


                renderAll();


                alert(
                    "Datos de demostración cargados correctamente."
                );

            }
        );


    /* =====================================================
       CERRAR MODALES AL HACER CLICK AFUERA
    ====================================================== */

    document
        .querySelectorAll(".modal")
        .forEach(modal => {

            modal.addEventListener(
                "click",
                function (event) {

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


    /* =====================================================
       RENDER GENERAL
    ====================================================== */

    function renderAll() {

        renderDashboard();

        renderPatients();

        renderServices();

        renderInventory();

        renderBudget();

        renderAnalysis();

        populatePatientServices();

        populatePredictionServices();

        generateAlerts();

    }


    /* =====================================================
       INICIALIZACIÓN
    ====================================================== */

    initializeData();

    renderAll();

});
