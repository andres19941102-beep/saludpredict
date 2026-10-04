/* =====================================================
   SALUDPREDICT
   JAVASCRIPT PRINCIPAL
===================================================== */


/* =====================================================
   CONFIGURACIÓN
===================================================== */

const STORAGE = {

    patients: "saludpredict_patients",
    services: "saludpredict_services",
    inventory: "saludpredict_inventory",
    budget: "saludpredict_budget"

};


const BUDGET_APPROVED_VALUE = 1000000000;


/* =====================================================
   FUNCIONES GENERALES
===================================================== */

function getData(key, fallback = []) {

    try {

        const data = localStorage.getItem(key);

        if (!data) return fallback;

        const parsed = JSON.parse(data);

        return Array.isArray(parsed) ? parsed : fallback;

    } catch (error) {

        console.error("Error leyendo:", key, error);

        return fallback;
    }
}


function saveData(key, data) {

    localStorage.setItem(key, JSON.stringify(data));

}


function formatCurrency(value) {

    return new Intl.NumberFormat("es-CO", {

        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0

    }).format(Number(value) || 0);

}


function escapeHTML(value) {

    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


function generateId(prefix = "id") {

    return prefix + "-" + Date.now() + "-" +
        Math.random().toString(36).substring(2, 7);

}


function todayISO() {

    return new Date().toISOString().split("T")[0];

}


function daysUntil(dateString) {

    if (!dateString) return Infinity;

    const today = new Date();
    const date = new Date(dateString);

    const difference = date - today;

    return Math.ceil(difference / (1000 * 60 * 60 * 24));

}


/* =====================================================
   DATOS DE DEMOSTRACIÓN
===================================================== */

const DEMO_PATIENTS = [

    {
        id: "p001",
        document: "1001001001",
        name: "Laura Martínez",
        age: 29,
        service: "Medicina general",
        status: "Activo"
    },

    {
        id: "p002",
        document: "1002002002",
        name: "Carlos Rodríguez",
        age: 58,
        service: "Cardiología",
        status: "Activo"
    },

    {
        id: "p003",
        document: "1003003003",
        name: "María González",
        age: 41,
        service: "Ginecología",
        status: "Activo"
    },

    {
        id: "p004",
        document: "1004004004",
        name: "Andrés Herrera",
        age: 36,
        service: "Consulta externa",
        status: "Activo"
    },

    {
        id: "p005",
        document: "1005005005",
        name: "Patricia Torres",
        age: 67,
        service: "Gastroenterología",
        status: "Activo"
    },

    {
        id: "p006",
        document: "1006006006",
        name: "Jorge Ramírez",
        age: 52,
        service: "Urgencias",
        status: "Activo"
    },

    {
        id: "p007",
        document: "1007007007",
        name: "Sofía Castro",
        age: 24,
        service: "Odontología general",
        status: "Activo"
    },

    {
        id: "p008",
        document: "1008008008",
        name: "Daniel Moreno",
        age: 45,
        service: "Imágenes diagnósticas",
        status: "Activo"
    },

    {
        id: "p009",
        document: "1009009009",
        name: "Natalia Vargas",
        age: 33,
        service: "Medicina general",
        status: "Activo"
    },

    {
        id: "p010",
        document: "1010001010",
        name: "Felipe Sánchez",
        age: 61,
        service: "Laboratorio clínico",
        status: "Activo"
    },

    {
        id: "p011",
        document: "1011001111",
        name: "Camila Pérez",
        age: 27,
        service: "Consulta externa",
        status: "Activo"
    },

    {
        id: "p012",
        document: "1012001212",
        name: "Ricardo Molina",
        age: 70,
        service: "Cardiología",
        status: "Activo"
    },

    {
        id: "p013",
        document: "1013001313",
        name: "Valentina Rojas",
        age: 31,
        service: "Ginecología",
        status: "Inactivo"
    },

    {
        id: "p014",
        document: "1014001414",
        name: "Mauricio León",
        age: 49,
        service: "Urgencias",
        status: "Activo"
    },

    {
        id: "p015",
        document: "1015001515",
        name: "Diana Morales",
        age: 55,
        service: "Gastroenterología",
        status: "Activo"
    }

];


const DEMO_SERVICES = [

    {
        id: "s001",
        code: "SER-001",
        name: "Medicina general",
        category: "Consulta",
        duration: "30 min",
        price: 85000,
        status: "Activo"
    },

    {
        id: "s002",
        code: "SER-002",
        name: "Consulta externa",
        category: "Consulta",
        duration: "30 min",
        price: 75000,
        status: "Activo"
    },

    {
        id: "s003",
        code: "SER-003",
        name: "Atención de urgencias",
        category: "Urgencias",
        duration: "60 min",
        price: 120000,
        status: "Activo"
    },

    {
        id: "s004",
        code: "SER-004",
        name: "Hospitalización",
        category: "Hospitalización",
        duration: "24 horas",
        price: 350000,
        status: "Activo"
    },

    {
        id: "s005",
        code: "SER-005",
        name: "Odontología general",
        category: "Odontología",
        duration: "45 min",
        price: 90000,
        status: "Activo"
    },

    {
        id: "s006",
        code: "SER-006",
        name: "Laboratorio clínico",
        category: "Diagnóstico",
        duration: "20 min",
        price: 45000,
        status: "Activo"
    },

    {
        id: "s007",
        code: "SER-007",
        name: "Cardiología",
        category: "Consulta",
        duration: "40 min",
        price: 150000,
        status: "Activo"
    },

    {
        id: "s008",
        code: "SER-008",
        name: "Ginecología",
        category: "Consulta",
        duration: "40 min",
        price: 140000,
        status: "Activo"
    },

    {
        id: "s009",
        code: "SER-009",
        name: "Imágenes diagnósticas",
        category: "Diagnóstico",
        duration: "45 min",
        price: 180000,
        status: "Activo"
    },

    {
        id: "s010",
        code: "SER-010",
        name: "Promoción y prevención",
        category: "Promoción y prevención",
        duration: "30 min",
        price: 60000,
        status: "Activo"
    }

];


const DEMO_INVENTORY = [

    {
        id: "i001",
        code: "MED-001",
        name: "Acetaminofén 500 mg",
        category: "Medicamentos",
        unit: "Tabletas",
        stock: 250,
        minStock: 50,
        expiry: "2027-06-30",
        price: 850,
        status: "Activo"
    },

    {
        id: "i002",
        code: "MED-002",
        name: "Ibuprofeno 400 mg",
        category: "Medicamentos",
        unit: "Tabletas",
        stock: 120,
        minStock: 30,
        expiry: "2027-03-15",
        price: 1200,
        status: "Activo"
    },

    {
        id: "i003",
        code: "MED-003",
        name: "Amoxicilina 500 mg",
        category: "Medicamentos",
        unit: "Cápsulas",
        stock: 24,
        minStock: 40,
        expiry: "2026-12-20",
        price: 1800,
        status: "Activo"
    },

    {
        id: "i004",
        code: "MED-004",
        name: "Loratadina 10 mg",
        category: "Medicamentos",
        unit: "Tabletas",
        stock: 85,
        minStock: 25,
        expiry: "2026-11-18",
        price: 900,
        status: "Activo"
    },

    {
        id: "i005",
        code: "INS-001",
        name: "Guantes de nitrilo",
        category: "Insumos médicos",
        unit: "Cajas",
        stock: 500,
        minStock: 100,
        expiry: "",
        price: 450,
        status: "Activo"
    },

    {
        id: "i006",
        code: "INS-002",
        name: "Jeringas 5 ml",
        category: "Insumos médicos",
        unit: "Unidades",
        stock: 35,
        minStock: 50,
        expiry: "2028-01-20",
        price: 700,
        status: "Activo"
    },

    {
        id: "i007",
        code: "INS-003",
        name: "Tapabocas quirúrgicos",
        category: "Elementos de protección",
        unit: "Cajas",
        stock: 75,
        minStock: 80,
        expiry: "2027-02-15",
        price: 650,
        status: "Activo"
    },

    {
        id: "i008",
        code: "LAB-001",
        name: "Tubos de ensayo",
        category: "Laboratorio",
        unit: "Unidades",
        stock: 180,
        minStock: 40,
        expiry: "",
        price: 950,
        status: "Activo"
    },

    {
        id: "i009",
        code: "LAB-002",
        name: "Reactivo hematología",
        category: "Laboratorio",
        unit: "Frascos",
        stock: 18,
        minStock: 15,
        expiry: "2026-10-28",
        price: 18500,
        status: "Activo"
    },

    {
        id: "i010",
        code: "MAT-001",
        name: "Gasas estériles",
        category: "Material quirúrgico",
        unit: "Paquetes",
        stock: 25,
        minStock: 30,
        expiry: "2027-08-10",
        price: 600,
        status: "Activo"
    },

    {
        id: "i011",
        code: "MAT-002",
        name: "Suturas quirúrgicas",
        category: "Material quirúrgico",
        unit: "Unidades",
        stock: 65,
        minStock: 20,
        expiry: "2027-09-05",
        price: 4200,
        status: "Activo"
    },

    {
        id: "i012",
        code: "INS-004",
        name: "Alcohol antiséptico",
        category: "Insumos médicos",
        unit: "Frascos",
        stock: 40,
        minStock: 25,
        expiry: "2026-11-05",
        price: 3500,
        status: "Activo"
    }

];


const DEMO_BUDGET = [

    {
        id: "b001",
        category: "Personal",
        concept: "Contratación de personal asistencial",
        value: 280000000,
        date: "2026-01-15",
        status: "Ejecutado"
    },

    {
        id: "b002",
        category: "Medicamentos",
        concept: "Compra de medicamentos",
        value: 95000000,
        date: "2026-02-10",
        status: "Ejecutado"
    },

    {
        id: "b003",
        category: "Insumos",
        concept: "Material médico y quirúrgico",
        value: 75000000,
        date: "2026-03-05",
        status: "Ejecutado"
    },

    {
        id: "b004",
        category: "Mantenimiento",
        concept: "Mantenimiento de equipos",
        value: 45000000,
        date: "2026-03-20",
        status: "Ejecutado"
    },

    {
        id: "b005",
        category: "Tecnología",
        concept: "Actualización de infraestructura tecnológica",
        value: 35000000,
        date: "2026-04-12",
        status: "Ejecutado"
    },

    {
        id: "b006",
        category: "Equipos biomédicos",
        concept: "Mantenimiento preventivo de equipos",
        value: 55000000,
        date: "2026-05-18",
        status: "Ejecutado"
    },

    {
        id: "b007",
        category: "Infraestructura",
        concept: "Adecuación de áreas asistenciales",
        value: 42000000,
        date: "2026-06-07",
        status: "Ejecutado"
    },

    {
        id: "b008",
        category: "Capacitación",
        concept: "Capacitación del talento humano",
        value: 18000000,
        date: "2026-07-15",
        status: "Ejecutado"
    }

];


/* =====================================================
   CARGAR DATOS DEMO SIN BORRAR INFORMACIÓN DEL USUARIO
===================================================== */

function initializeData() {

    if (!localStorage.getItem(STORAGE.patients)) {
        saveData(STORAGE.patients, DEMO_PATIENTS);
    }

    if (!localStorage.getItem(STORAGE.services)) {
        saveData(STORAGE.services, DEMO_SERVICES);
    }

    if (!localStorage.getItem(STORAGE.inventory)) {
        saveData(STORAGE.inventory, DEMO_INVENTORY);
    }

    if (!localStorage.getItem(STORAGE.budget)) {
        saveData(STORAGE.budget, DEMO_BUDGET);
    }

}


/* =====================================================
   DATOS
===================================================== */

function getPatients() {

    return getData(STORAGE.patients, DEMO_PATIENTS);

}


function getServices() {

    return getData(STORAGE.services, DEMO_SERVICES);

}


function getInventory() {

    const data = getData(STORAGE.inventory, DEMO_INVENTORY);

    return data.map(item => ({

        ...item,

        unit: item.unit || "Unidades",

        price: Number(
            item.price ??
            item.unitCost ??
            0
        )

    }));

}


function getBudget() {

    return getData(STORAGE.budget, DEMO_BUDGET);

}


/* =====================================================
   NAVEGACIÓN
===================================================== */

function showSection(sectionId) {

    document.querySelectorAll(".section").forEach(section => {

        section.classList.remove("active");

    });


    const target = document.getElementById(sectionId);

    if (!target) return;

    target.classList.add("active");


    document.querySelectorAll(".nav-item").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.section === sectionId
        );

    });


    document.getElementById("sidebar")?.classList.remove("open");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    if (sectionId === "dashboard") {
        updateDashboard();
    }

    if (sectionId === "analisis") {
        updateAnalysis();
    }

    if (sectionId === "predicciones") {
        populatePredictionServices();
    }

    if (sectionId === "alertas") {
        renderAlerts();
    }

}


function initializeNavigation() {

    document.querySelectorAll(".nav-item").forEach(button => {

        button.addEventListener("click", () => {

            showSection(button.dataset.section);

        });

    });


    document.querySelectorAll("[data-go]").forEach(element => {

        element.addEventListener("click", () => {

            showSection(element.dataset.go);

        });

    });


    document.getElementById("menuBtn")
        ?.addEventListener("click", () => {

            document.getElementById("sidebar")
                ?.classList.toggle("open");

        });

}


/* =====================================================
   FECHA
===================================================== */

function showCurrentDate() {

    const element = document.getElementById("currentDate");

    if (!element) return;

    element.textContent = new Intl.DateTimeFormat(
        "es-CO",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    ).format(new Date());

}


/* =====================================================
   PACIENTES
===================================================== */

function renderPatients(filter = "") {

    const table = document.getElementById("patientsTable");

    if (!table) return;

    const search = filter.toLowerCase();

    const patients = getPatients().filter(patient => {

        return [

            patient.document,
            patient.name,
            patient.service,
            patient.status

        ].some(value =>
            String(value).toLowerCase().includes(search)
        );

    });


    table.innerHTML = patients.map(patient => `

        <tr>

            <td>${escapeHTML(patient.document)}</td>

            <td>
                <strong>${escapeHTML(patient.name)}</strong>
            </td>

            <td>${patient.age} años</td>

            <td>${escapeHTML(patient.service)}</td>

            <td>
                <span class="badge ${
                    patient.status === "Activo"
                    ? "badge-active"
                    : "badge-inactive"
                }">
                    ${escapeHTML(patient.status)}
                </span>
            </td>

            <td>

                <div class="actions">

                    <button
                        class="action-btn edit-btn"
                        onclick="editPatient('${patient.id}')">
                        ✏️
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deletePatient('${patient.id}')">
                        🗑️
                    </button>

                </div>

            </td>

        </tr>

    `).join("");


    updatePatientStats();

}


function updatePatientStats() {

    const patients = getPatients();

    const active = patients.filter(
        p => p.status === "Activo"
    ).length;


    document.getElementById("totalPatients").textContent =
        patients.length;

    document.getElementById("activePatients").textContent =
        active;

    document.getElementById("newPatients").textContent =
        Math.min(6, patients.length);

}


function populatePatientServices() {

    const select = document.getElementById("service");

    if (!select) return;

    select.innerHTML = getServices()
        .map(service => `
            <option value="${escapeHTML(service.name)}">
                ${escapeHTML(service.name)}
            </option>
        `)
        .join("");

}


function openPatientModal(patient = null) {

    const modal = document.getElementById("patientModal");

    document.getElementById("modalTitle").textContent =
        patient ? "Editar paciente" : "Nuevo paciente";

    document.getElementById("patientId").value =
        patient?.id || "";

    document.getElementById("document").value =
        patient?.document || "";

    document.getElementById("name").value =
        patient?.name || "";

    document.getElementById("age").value =
        patient?.age || "";

    document.getElementById("service").value =
        patient?.service || "";

    document.getElementById("status").value =
        patient?.status || "Activo";

    modal.classList.add("show");

}


function closePatientModal() {

    document.getElementById("patientModal")
        ?.classList.remove("show");

}


function editPatient(id) {

    const patient = getPatients()
        .find(item => item.id === id);

    if (patient) {
        openPatientModal(patient);
    }

}


function deletePatient(id) {

    if (!confirm("¿Deseas eliminar este paciente?")) {
        return;
    }

    const patients = getPatients()
        .filter(patient => patient.id !== id);

    saveData(STORAGE.patients, patients);

    renderPatients();

    updateDashboard();

}


function initializePatients() {

    populatePatientServices();

    renderPatients();


    document.getElementById("patientSearch")
        ?.addEventListener("input", event => {

            renderPatients(event.target.value);

        });


    document.getElementById("newPatientBtn")
        ?.addEventListener("click", () => {

            populatePatientServices();

            openPatientModal();

        });


    document.getElementById("closeModal")
        ?.addEventListener("click", closePatientModal);


    document.getElementById("cancelModal")
        ?.addEventListener("click", closePatientModal);


    document.getElementById("patientForm")
        ?.addEventListener("submit", event => {

            event.preventDefault();

            const id =
                document.getElementById("patientId").value ||
                generateId("p");


            const patient = {

                id,

                document:
                    document.getElementById("document").value.trim(),

                name:
                    document.getElementById("name").value.trim(),

                age:
                    Number(document.getElementById("age").value),

                service:
                    document.getElementById("service").value,

                status:
                    document.getElementById("status").value

            };


            const patients = getPatients();

            const existingIndex =
                patients.findIndex(item => item.id === id);


            if (existingIndex >= 0) {

                patients[existingIndex] = patient;

            } else {

                patients.push(patient);

            }


            saveData(STORAGE.patients, patients);

            closePatientModal();

            renderPatients();

            updateDashboard();

        });

}


/* =====================================================
   SERVICIOS
===================================================== */

function renderServices(filter = "") {

    const table = document.getElementById("servicesTable");

    if (!table) return;

    const search = filter.toLowerCase();

    const services = getServices().filter(service => {

        return [

            service.code,
            service.name,
            service.category,
            service.status

        ].some(value =>
            String(value).toLowerCase().includes(search)
        );

    });


    table.innerHTML = services.map(service => `

        <tr>

            <td>
                <strong>${escapeHTML(service.code)}</strong>
            </td>

            <td>${escapeHTML(service.name)}</td>

            <td>${escapeHTML(service.category)}</td>

            <td>${escapeHTML(service.duration)}</td>

            <td>${formatCurrency(service.price)}</td>

            <td>

                <span class="badge ${
                    service.status === "Activo"
                    ? "badge-active"
                    : "badge-inactive"
                }">
                    ${escapeHTML(service.status)}
                </span>

            </td>

            <td>

                <div class="actions">

                    <button
                        class="action-btn edit-btn"
                        onclick="editService('${service.id}')">
                        ✏️
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteService('${service.id}')">
                        🗑️
                    </button>

                </div>

            </td>

        </tr>

    `).join("");


    updateServiceStats();

}


function updateServiceStats() {

    const services = getServices();

    const active = services.filter(
        service => service.status === "Activo"
    );


    const average = active.length

        ? active.reduce(
            (sum, service) => sum + Number(service.price || 0),
            0
        ) / active.length

        : 0;


    document.getElementById("totalServices").textContent =
        services.length;

    document.getElementById("activeServices").textContent =
        active.length;

    document.getElementById("averageServicePrice").textContent =
        formatCurrency(average);

}


function openServiceModal(service = null) {

    document.getElementById("serviceModalTitle").textContent =
        service ? "Editar servicio" : "Nuevo servicio";

    document.getElementById("serviceId").value =
        service?.id || "";

    document.getElementById("serviceCode").value =
        service?.code || "";

    document.getElementById("serviceName").value =
        service?.name || "";

    document.getElementById("serviceCategory").value =
        service?.category || "Consulta";

    document.getElementById("serviceDuration").value =
        service?.duration || "";

    document.getElementById("servicePrice").value =
        service?.price || "";

    document.getElementById("serviceStatus").value =
        service?.status || "Activo";

    document.getElementById("serviceModal")
        .classList.add("show");

}


function closeServiceModal() {

    document.getElementById("serviceModal")
        ?.classList.remove("show");

}


function editService(id) {

    const service = getServices()
        .find(item => item.id === id);

    if (service) {
        openServiceModal(service);
    }

}


function deleteService(id) {

    if (!confirm("¿Deseas eliminar este servicio?")) {
        return;
    }

    const services = getServices()
        .filter(service => service.id !== id);

    saveData(STORAGE.services, services);

    renderServices();

    populatePatientServices();

    populatePredictionServices();

    updateDashboard();

}


function initializeServices() {

    renderServices();


    document.getElementById("serviceSearch")
        ?.addEventListener("input", event => {

            renderServices(event.target.value);

        });


    document.getElementById("newServiceBtn")
        ?.addEventListener("click", () => {

            openServiceModal();

        });


    document.getElementById("closeServiceModal")
        ?.addEventListener("click", closeServiceModal);


    document.getElementById("cancelServiceBtn")
        ?.addEventListener("click", closeServiceModal);


    document.getElementById("serviceForm")
        ?.addEventListener("submit", event => {

            event.preventDefault();

            const id =
                document.getElementById("serviceId").value ||
                generateId("s");


            const service = {

                id,

                code:
                    document.getElementById("serviceCode").value.trim(),

                name:
                    document.getElementById("serviceName").value.trim(),

                category:
                    document.getElementById("serviceCategory").value,

                duration:
                    document.getElementById("serviceDuration").value.trim(),

                price:
                    Number(document.getElementById("servicePrice").value),

                status:
                    document.getElementById("serviceStatus").value

            };


            const services = getServices();

            const index =
                services.findIndex(item => item.id === id);


            if (index >= 0) {

                services[index] = service;

            } else {

                services.push(service);

            }


            saveData(STORAGE.services, services);

            closeServiceModal();

            renderServices();

            populatePatientServices();

            populatePredictionServices();

            updateDashboard();

        });

}


/* =====================================================
   INVENTARIO
===================================================== */

function isLowStock(item) {

    return Number(item.stock) <= Number(item.minStock);

}


function isExpiring(item) {

    const days = daysUntil(item.expiry);

    return days >= 0 && days <= 60;

}


function renderInventory(filter = "") {

    const table = document.getElementById("inventoryTable");

    if (!table) return;

    const search = filter.toLowerCase();

    const inventory = getInventory().filter(item => {

        return [

            item.code,
            item.name,
            item.category,
            item.unit,
            item.status

        ].some(value =>
            String(value).toLowerCase().includes(search)
        );

    });


    table.innerHTML = inventory.map(item => {

        let stockBadge = "badge-active";

        if (isLowStock(item)) {
            stockBadge = "badge-danger";
        }

        let expiryText = item.expiry || "No aplica";

        if (isExpiring(item)) {
            expiryText += " ⚠️";
        }


        return `

        <tr>

            <td>
                <strong>${escapeHTML(item.code)}</strong>
            </td>

            <td>${escapeHTML(item.name)}</td>

            <td>${escapeHTML(item.category)}</td>

            <td>${escapeHTML(item.unit)}</td>

            <td>

                <span class="badge ${stockBadge}">
                    ${item.stock}
                </span>

            </td>

            <td>${item.minStock}</td>

            <td>${escapeHTML(expiryText)}</td>

            <td>${formatCurrency(item.price)}</td>

            <td>

                <span class="badge ${
                    item.status === "Activo"
                    ? "badge-active"
                    : "badge-inactive"
                }">
                    ${escapeHTML(item.status)}
                </span>

            </td>

            <td>

                <div class="actions">

                    <button
                        class="action-btn edit-btn"
                        onclick="editInventory('${item.id}')">
                        ✏️
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteInventory('${item.id}')">
                        🗑️
                    </button>

                </div>

            </td>

        </tr>

        `;

    }).join("");


    updateInventoryStats();

}


function updateInventoryStats() {

    const inventory = getInventory();

    const lowStock = inventory.filter(isLowStock);

    const expiring = inventory.filter(isExpiring);


    document.getElementById("totalInventory").textContent =
        inventory.length;

    document.getElementById("lowStockInventory").textContent =
        lowStock.length;

    document.getElementById("expiringInventory").textContent =
        expiring.length;

}


function openInventoryModal(item = null) {

    document.getElementById("inventoryModalTitle").textContent =
        item ? "Editar producto" : "Nuevo producto";

    document.getElementById("inventoryId").value =
        item?.id || "";

    document.getElementById("inventoryCode").value =
        item?.code || "";

    document.getElementById("inventoryName").value =
        item?.name || "";

    document.getElementById("inventoryCategory").value =
        item?.category || "Medicamentos";

    document.getElementById("inventoryUnit").value =
        item?.unit || "Unidades";

    document.getElementById("inventoryStock").value =
        item?.stock ?? "";

    document.getElementById("inventoryMinStock").value =
        item?.minStock ?? "";

    document.getElementById("inventoryExpiry").value =
        item?.expiry || "";

    document.getElementById("inventoryPrice").value =
        item?.price || "";

    document.getElementById("inventoryStatus").value =
        item?.status || "Activo";


    document.getElementById("inventoryModal")
        .classList.add("show");

}


function closeInventoryModal() {

    document.getElementById("inventoryModal")
        ?.classList.remove("show");

}


function editInventory(id) {

    const item = getInventory()
        .find(product => product.id === id);

    if (item) {
        openInventoryModal(item);
    }

}


function deleteInventory(id) {

    if (!confirm("¿Deseas eliminar este producto?")) {
        return;
    }

    const inventory = getInventory()
        .filter(item => item.id !== id);

    saveData(STORAGE.inventory, inventory);

    renderInventory();

    updateDashboard();

    renderAlerts();

}


function initializeInventory() {

    renderInventory();


    document.getElementById("inventorySearch")
        ?.addEventListener("input", event => {

            renderInventory(event.target.value);

        });


    document.getElementById("newInventoryBtn")
        ?.addEventListener("click", () => {

            openInventoryModal();

        });


    document.getElementById("closeInventoryModal")
        ?.addEventListener("click", closeInventoryModal);


    document.getElementById("cancelInventoryModal")
        ?.addEventListener("click", closeInventoryModal);


    document.getElementById("inventoryForm")
        ?.addEventListener("submit", event => {

            event.preventDefault();

            const id =
                document.getElementById("inventoryId").value ||
                generateId("i");


            const item = {

                id,

                code:
                    document.getElementById("inventoryCode").value.trim(),

                name:
                    document.getElementById("inventoryName").value.trim(),

                category:
                    document.getElementById("inventoryCategory").value,

                unit:
                    document.getElementById("inventoryUnit").value.trim(),

                stock:
                    Number(document.getElementById("inventoryStock").value),

                minStock:
                    Number(document.getElementById("inventoryMinStock").value),

                expiry:
                    document.getElementById("inventoryExpiry").value,

                price:
                    Number(document.getElementById("inventoryPrice").value),

                status:
                    document.getElementById("inventoryStatus").value

            };


            const inventory = getInventory();

            const index =
                inventory.findIndex(product => product.id === id);


            if (index >= 0) {

                inventory[index] = item;

            } else {

                inventory.push(item);

            }


            saveData(STORAGE.inventory, inventory);

            closeInventoryModal();

            renderInventory();

            updateDashboard();

            renderAlerts();

        });

}


/* =====================================================
   PRESUPUESTO
===================================================== */

function getBudgetExecuted() {

    return getBudget().reduce(
        (sum, item) => sum + Number(item.value || 0),
        0
    );

}


function updateBudgetSummary() {

    const executed = getBudgetExecuted();

    const available =
        Math.max(0, BUDGET_APPROVED_VALUE - executed);

    const percentage =
        Math.min(
            100,
            (executed / BUDGET_APPROVED_VALUE) * 100
        );


    document.getElementById("budgetApproved").textContent =
        formatCurrency(BUDGET_APPROVED_VALUE);

    document.getElementById("budgetExecuted").textContent =
        formatCurrency(executed);

    document.getElementById("budgetAvailable").textContent =
        formatCurrency(available);

    document.getElementById("budgetPercentage").textContent =
        percentage.toFixed(1) + "%";

}


function renderBudget(filter = "") {

    const table = document.getElementById("budgetTable");

    if (!table) return;

    const search = filter.toLowerCase();

    const budget = getBudget().filter(item => {

        return [

            item.category,
            item.concept,
            item.status

        ].some(value =>
            String(value).toLowerCase().includes(search)
        );

    });


    table.innerHTML = budget.map(item => `

        <tr>

            <td>${escapeHTML(item.category)}</td>

            <td>${escapeHTML(item.concept)}</td>

            <td>${formatCurrency(item.value)}</td>

            <td>${escapeHTML(item.date)}</td>

            <td>
                <span class="badge badge-active">
                    ${escapeHTML(item.status)}
                </span>
            </td>

            <td>

                <button
                    class="action-btn delete-btn"
                    onclick="deleteBudget('${item.id}')">
                    🗑️
                </button>

            </td>

        </tr>

    `).join("");


    updateBudgetSummary();

}


function deleteBudget(id) {

    if (!confirm("¿Eliminar este movimiento presupuestal?")) {
        return;
    }

    const budget = getBudget()
        .filter(item => item.id !== id);

    saveData(STORAGE.budget, budget);

    renderBudget();

    updateDashboard();

}


function initializeBudget() {

    renderBudget();


    document.getElementById("budgetSearch")
        ?.addEventListener("input", event => {

            renderBudget(event.target.value);

        });


    document.getElementById("newBudgetBtn")
        ?.addEventListener("click", () => {

            document.getElementById("budgetDate").value =
                todayISO();

            document.getElementById("budgetModal")
                .classList.add("show");

        });


    document.getElementById("closeBudgetModal")
        ?.addEventListener("click", () => {

            document.getElementById("budgetModal")
                .classList.remove("show");

        });


    document.getElementById("cancelBudgetBtn")
        ?.addEventListener("click", () => {

            document.getElementById("budgetModal")
                .classList.remove("show");

        });


    document.getElementById("budgetForm")
        ?.addEventListener("submit", event => {

            event.preventDefault();

            const budget = getBudget();

            budget.push({

                id: generateId("b"),

                category:
                    document.getElementById("budgetCategory").value,

                concept:
                    document.getElementById("budgetConcept").value.trim(),

                value:
                    Number(document.getElementById("budgetValue").value),

                date:
                    document.getElementById("budgetDate").value,

                status: "Ejecutado"

            });


            saveData(STORAGE.budget, budget);


            document.getElementById("budgetModal")
                .classList.remove("show");


            document.getElementById("budgetForm")
                .reset();


            renderBudget();

            updateDashboard();

        });

}


/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboard() {

    const patients = getPatients();

    const services = getServices();

    const inventory = getInventory();

    const budgetExecuted = getBudgetExecuted();

    const budgetPercentage =
        Math.min(
            100,
            (budgetExecuted / BUDGET_APPROVED_VALUE) * 100
        );


    const lowStock =
        inventory.filter(isLowStock);

    const expiring =
        inventory.filter(isExpiring);


    const inventoryHealth = inventory.length

        ? Math.round(
            ((inventory.length - lowStock.length)
            / inventory.length) * 100
        )

        : 0;


    document.getElementById("dashboardPatients").textContent =
        patients.length;

    document.getElementById("dashboardServices").textContent =
        services.filter(s => s.status === "Activo").length;

    document.getElementById("dashboardInventory").textContent =
        inventoryHealth + "%";

    document.getElementById("dashboardBudget").textContent =
        budgetPercentage.toFixed(0) + "%";


    const alertCount =
        lowStock.length + expiring.length;

    document.getElementById("dashboardAlertCount").textContent =
        alertCount;


    document.getElementById("dashboardBudgetPercentage").textContent =
        budgetPercentage.toFixed(1) + "%";

    document.getElementById("dashboardBudgetBar").style.width =
        budgetPercentage + "%";

    document.getElementById("dashboardBudgetExecuted").textContent =
        formatCurrency(budgetExecuted);

    document.getElementById("dashboardBudgetTotal").textContent =
        formatCurrency(BUDGET_APPROVED_VALUE);


    updateDashboardAlerts();

    updateDashboardSummary();

    updateDashboardServiceDemand();

    updateDashboardInventory();

}


function updateDashboardAlerts() {

    const container =
        document.getElementById("dashboardAlerts");

    if (!container) return;

    const inventory = getInventory();

    const alerts = [];


    inventory
        .filter(isLowStock)
        .slice(0, 3)
        .forEach(item => {

            alerts.push({

                title: "Inventario bajo",

                description:
                    `${item.name}: ${item.stock} disponibles.`

            });

        });


    inventory
        .filter(isExpiring)
        .slice(0, 3)
        .forEach(item => {

            alerts.push({

                title: "Próximo vencimiento",

                description:
                    `${item.name}: vence ${item.expiry}.`

            });

        });


    if (!alerts.length) {

        container.innerHTML = `
            <div class="mini-alert">
                <strong>Sin alertas</strong>
                <small>No hay situaciones pendientes.</small>
            </div>
        `;

        return;
    }


    container.innerHTML = alerts
        .slice(0, 5)
        .map(alert => `

            <div class="mini-alert">

                <strong>⚠️ ${escapeHTML(alert.title)}</strong>

                <small>
                    ${escapeHTML(alert.description)}
                </small>

            </div>

        `)
        .join("");

}


function updateDashboardSummary() {

    const container =
        document.getElementById("dashboardSystemSummary");

    if (!container) return;


    const patients = getPatients();

    const services = getServices();

    const inventory = getInventory();


    const activePatients =
        patients.filter(p => p.status === "Activo").length;

    const activeServices =
        services.filter(s => s.status === "Activo").length;

    const inventoryValue =
        inventory.reduce(
            (sum, item) =>
                sum + (Number(item.stock) * Number(item.price)),
            0
        );


    container.innerHTML = `

        <div class="summary-row">
            <span>Pacientes activos</span>
            <strong>${activePatients}</strong>
        </div>

        <div class="summary-row">
            <span>Servicios activos</span>
            <strong>${activeServices}</strong>
        </div>

        <div class="summary-row">
            <span>Valor del inventario</span>
            <strong>${formatCurrency(inventoryValue)}</strong>
        </div>

        <div class="summary-row">
            <span>Registros del sistema</span>
            <strong>${
                patients.length +
                services.length +
                inventory.length
            }</strong>
        </div>

    `;

}


function updateDashboardServiceDemand() {

    const container =
        document.getElementById("dashboardServiceDemand");

    if (!container) return;


    const values = [

        ["Ene", 58],
        ["Feb", 64],
        ["Mar", 61],
        ["Abr", 74],
        ["May", 82],
        ["Jun", 77],
        ["Jul", 86],
        ["Ago", 91],
        ["Sep", 88],
        ["Oct", 94]

    ];


    container.innerHTML = values.map(([month, value]) => `

        <div class="chart-bar-wrapper">

            <div
                class="chart-bar"
                style="height:${value}%"
                title="${value}%"
            ></div>

            <span class="chart-label">${month}</span>

        </div>

    `).join("");

}


function updateDashboardInventory() {

    const container =
        document.getElementById("dashboardInventorySummary");

    if (!container) return;


    const inventory = getInventory();

    const low = inventory.filter(isLowStock).length;

    const expiring = inventory.filter(isExpiring).length;

    const normal =
        Math.max(0, inventory.length - low);


    container.innerHTML = `

        <div class="inventory-box">
            <strong>${normal}</strong>
            <span>Productos disponibles</span>
        </div>

        <div class="inventory-box">
            <strong>${low}</strong>
            <span>Productos con stock bajo</span>
        </div>

        <div class="inventory-box">
            <strong>${expiring}</strong>
            <span>Próximos a vencer</span>
        </div>

    `;

}


/* =====================================================
   ANÁLISIS
===================================================== */

function updateAnalysis() {

    const patients = getPatients();

    const services = getServices();

    const inventory = getInventory();


    document.getElementById("analysisPatients").textContent =
        patients.length;

    document.getElementById("analysisServices").textContent =
        services.length;

    document.getElementById("analysisInventory").textContent =
        inventory.length;

    document.getElementById("analysisLowStock").textContent =
        inventory.filter(isLowStock).length;


    renderPatientsAnalysis();

    renderInventoryAnalysis();

    renderFinancialAnalysis();

}


function renderPatientsAnalysis() {

    const container =
        document.getElementById("patientsAnalysisChart");

    if (!container) return;


    const patients = getPatients();

    const distribution = {};


    patients.forEach(patient => {

        distribution[patient.service] =
            (distribution[patient.service] || 0) + 1;

    });


    const values =
        Object.entries(distribution)
            .sort((a, b) => b[1] - a[1]);


    const max =
        Math.max(...values.map(item => item[1]), 1);


    container.innerHTML = values.map(([name, value]) => `

        <div class="horizontal-row">

            <span>${escapeHTML(name)}</span>

            <div class="horizontal-bar-bg">

                <div
                    class="horizontal-bar"
                    style="width:${(value / max) * 100}%">
                </div>

            </div>

            <strong>${value}</strong>

        </div>

    `).join("");

}


function renderInventoryAnalysis() {

    const container =
        document.getElementById("inventoryAnalysisChart");

    if (!container) return;


    const inventory = getInventory();

    const distribution = {};


    inventory.forEach(item => {

        distribution[item.category] =
            (distribution[item.category] || 0) + 1;

    });


    const values =
        Object.entries(distribution)
            .sort((a, b) => b[1] - a[1]);


    const max =
        Math.max(...values.map(item => item[1]), 1);


    container.innerHTML = values.map(([name, value]) => `

        <div class="horizontal-row">

            <span>${escapeHTML(name)}</span>

            <div class="horizontal-bar-bg">

                <div
                    class="horizontal-bar"
                    style="width:${(value / max) * 100}%">
                </div>

            </div>

            <strong>${value}</strong>

        </div>

    `).join("");

}


function renderFinancialAnalysis() {

    const container =
        document.getElementById("financialAnalysis");

    if (!container) return;


    const budget = getBudget();

    const total = getBudgetExecuted();


    const categories = {};


    budget.forEach(item => {

        categories[item.category] =
            (categories[item.category] || 0) +
            Number(item.value || 0);

    });


    container.innerHTML = `

        <div class="panel-header">

            <div>
                <h2>Análisis financiero</h2>
                <p>Distribución de la ejecución presupuestal</p>
            </div>

            <strong>${formatCurrency(total)}</strong>

        </div>

        <div class="horizontal-chart">

            ${
                Object.entries(categories)
                    .sort((a,b) => b[1] - a[1])
                    .map(([category, value]) => `

                    <div class="horizontal-row">

                        <span>${escapeHTML(category)}</span>

                        <div class="horizontal-bar-bg">

                            <div
                                class="horizontal-bar"
                                style="
                                width:${Math.min(
                                    100,
                                    (value / total) * 100
                                )}%
                                ">
                            </div>

                        </div>

                        <strong>
                            ${Math.round((value / total) * 100)}%
                        </strong>

                    </div>

                `).join("")
            }

        </div>

    `;

}


/* =====================================================
   PREDICCIONES
===================================================== */

function populatePredictionServices() {

    const select =
        document.getElementById("predictionService");

    if (!select) return;


    const services = getServices();

    const current = select.value;


    select.innerHTML = `

        <option value="Todos">
            Todos los servicios
        </option>

        ${services.map(service => `

            <option value="${escapeHTML(service.name)}">
                ${escapeHTML(service.name)}
            </option>

        `).join("")}

    `;


    if (current) {
        select.value = current;
    }

}


function generatePrediction() {

    const selected =
        document.getElementById("predictionService").value;

    const months =
        Number(document.getElementById("predictionPeriod").value);


    const patients = getPatients();


    let historicalAverage;


    if (selected === "Todos") {

        historicalAverage =
            Math.max(20, Math.round(patients.length * 1.8));

    } else {

        const count =
            patients.filter(
                p => p.service === selected
            ).length;

        historicalAverage =
            Math.max(10, count * 12);

    }


    const variation =
        8 + Math.round(Math.random() * 12);


    const estimated =
        Math.round(
            historicalAverage *
            (1 + variation / 100) *
            months
        );


    document.getElementById("historicalAverage").textContent =
        historicalAverage;

    document.getElementById("estimatedDemand").textContent =
        estimated;

    document.getElementById("predictionVariation").textContent =
        "+" + variation + "%";


    document.getElementById("predictionWarning").innerHTML = `

        <strong>📌 Estimación inicial:</strong>

        Para <strong>${escapeHTML(selected)}</strong>,
        el sistema proyecta aproximadamente
        <strong>${estimated}</strong> atenciones para el periodo seleccionado.

        <br><br>

        Esta función corresponde a un modelo demostrativo.
        Para una implementación institucional real deberá
        conectarse a datos históricos y modelos estadísticos
        o de aprendizaje automático.

    `;

}


/* =====================================================
   ALERTAS
===================================================== */

function generateAlerts() {

    const inventory = getInventory();

    const alerts = [];


    inventory
        .filter(isLowStock)
        .forEach(item => {

            alerts.push({

                type: "critical",

                title: "Stock bajo",

                message:
                    `${item.name} tiene ${item.stock} ${item.unit}. ` +
                    `El mínimo configurado es ${item.minStock}.`,

                date: "Inventario"

            });

        });


    inventory
        .filter(isExpiring)
        .forEach(item => {

            alerts.push({

                type: "warning",

                title: "Producto próximo a vencer",

                message:
                    `${item.name} tiene fecha de vencimiento ` +
                    `${item.expiry}.`,

                date: "Inventario"

            });

        });


    const budgetPercentage =
        (getBudgetExecuted() / BUDGET_APPROVED_VALUE) * 100;


    if (budgetPercentage >= 80) {

        alerts.push({

            type: "warning",

            title: "Alta ejecución presupuestal",

            message:
                `La ejecución presupuestal se encuentra en ` +
                `${budgetPercentage.toFixed(1)}%.`,

            date: "Presupuesto"

        });

    }


    if (!alerts.length) {

        alerts.push({

            type: "info",

            title: "Sistema estable",

            message:
                "No se identificaron situaciones pendientes.",

            date: "Sistema"

        });

    }


    return alerts;

}


function renderAlerts() {

    const alerts = generateAlerts();

    const container =
        document.getElementById("alertsContainer");


    if (!container) return;


    const critical =
        alerts.filter(a => a.type === "critical").length;

    const warning =
        alerts.filter(a => a.type === "warning").length;

    const info =
        alerts.filter(a => a.type === "info").length;


    document.getElementById("totalAlerts").textContent =
        alerts.length;

    document.getElementById("attentionAlerts").textContent =
        warning;

    document.getElementById("criticalAlerts").textContent =
        critical;

    document.getElementById("normalAlerts").textContent =
        info;


    container.innerHTML = alerts.map(alert => `

        <div class="alert-card ${alert.type}">

            <h3>
                ${
                    alert.type === "critical"
                    ? "🔴"
                    : alert.type === "warning"
                    ? "⚠️"
                    : "ℹ️"
                }

                ${escapeHTML(alert.title)}
            </h3>

            <p>${escapeHTML(alert.message)}</p>

            <small>
                Fuente: ${escapeHTML(alert.date)}
            </small>

        </div>

    `).join("");

}


/* =====================================================
   REPORTES
===================================================== */

function openReport(title, content) {

    const container =
        document.getElementById("reportOutput");

    container.innerHTML = `

        <div class="panel report-content">

            <div class="panel-header">

                <div>
                    <h2>${escapeHTML(title)}</h2>
                    <p>Reporte generado por SALUDPREDICT</p>
                </div>

                <button
                    class="btn btn-secondary"
                    onclick="window.print()">
                    🖨️ Imprimir
                </button>

            </div>

            ${content}

        </div>

    `;

}


function generateDemandReport() {

    const patients = getPatients();

    const services = getServices();


    const distribution = {};


    patients.forEach(patient => {

        distribution[patient.service] =
            (distribution[patient.service] || 0) + 1;

    });


    const list =
        Object.entries(distribution)
            .sort((a,b) => b[1] - a[1]);


    openReport(
        "Reporte de demanda",
        `

        <ul>

            <li>
                Total de pacientes:
                <strong>${patients.length}</strong>
            </li>

            <li>
                Servicios disponibles:
                <strong>${services.length}</strong>
            </li>

            ${list.map(([service, count]) => `

                <li>
                    ${escapeHTML(service)}:
                    <strong>${count} pacientes</strong>
                </li>

            `).join("")}

        </ul>

        `
    );

}


function generateInventoryReport() {

    const inventory = getInventory();

    const low = inventory.filter(isLowStock);

    const expiring = inventory.filter(isExpiring);


    openReport(
        "Reporte de inventario",
        `

        <ul>

            <li>
                Total de productos:
                <strong>${inventory.length}</strong>
            </li>

            <li>
                Productos con stock bajo:
                <strong>${low.length}</strong>
            </li>

            <li>
                Productos próximos a vencer:
                <strong>${expiring.length}</strong>
            </li>

            <li>
                Valor estimado del inventario:
                <strong>
                    ${formatCurrency(
                        inventory.reduce(
                            (sum, item) =>
                                sum +
                                Number(item.stock) *
                                Number(item.price),
                            0
                        )
                    )}
                </strong>
            </li>

        </ul>

        <h3 style="margin-top:20px">
            Productos que requieren atención
        </h3>

        <ul>

            ${low.map(item => `

                <li>
                    ${escapeHTML(item.name)}
                    — stock ${item.stock}
                </li>

            `).join("")}

        </ul>

        `
    );

}


function generateBudgetReport() {

    const budget = getBudget();

    const executed = getBudgetExecuted();

    const percentage =
        (executed / BUDGET_APPROVED_VALUE) * 100;


    openReport(
        "Reporte financiero",
        `

        <ul>

            <li>
                Presupuesto aprobado:
                <strong>
                    ${formatCurrency(BUDGET_APPROVED_VALUE)}
                </strong>
            </li>

            <li>
                Presupuesto ejecutado:
                <strong>
                    ${formatCurrency(executed)}
                </strong>
            </li>

            <li>
                Saldo disponible:
                <strong>
                    ${formatCurrency(
                        BUDGET_APPROVED_VALUE - executed
                    )}
                </strong>
            </li>

            <li>
                Porcentaje de ejecución:
                <strong>
                    ${percentage.toFixed(1)}%
                </strong>
            </li>

            <li>
                Movimientos registrados:
                <strong>${budget.length}</strong>
            </li>

        </ul>

        `
    );

}


function generateGeneralReport() {

    const patients = getPatients();

    const services = getServices();

    const inventory = getInventory();

    const budget = getBudget();

    const alerts = generateAlerts();


    openReport(
        "Reporte general institucional",
        `

        <ul>

            <li>
                Pacientes registrados:
                <strong>${patients.length}</strong>
            </li>

            <li>
                Servicios:
                <strong>${services.length}</strong>
            </li>

            <li>
                Productos de inventario:
                <strong>${inventory.length}</strong>
            </li>

            <li>
                Movimientos presupuestales:
                <strong>${budget.length}</strong>
            </li>

            <li>
                Alertas identificadas:
                <strong>${alerts.length}</strong>
            </li>

            <li>
                Fecha del reporte:
                <strong>${todayISO()}</strong>
            </li>

        </ul>

        <h3 style="margin-top:20px">
            Resumen
        </h3>

        <p style="margin-top:10px;line-height:1.7;color:#52606d">

            SALUDPREDICT integra la gestión de pacientes,
            servicios, inventario, presupuesto, análisis,
            predicciones, alertas y reportes en una misma
            plataforma para apoyar la gestión institucional.

        </p>

        `
    );

}


/* =====================================================
   INICIALIZACIÓN
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeData();

    initializeNavigation();

    showCurrentDate();

    initializePatients();

    initializeServices();

    initializeInventory();

    initializeBudget();

    populatePredictionServices();

    updateDashboard();

    updateAnalysis();

    renderAlerts();


    document.getElementById("generatePredictionBtn")
        ?.addEventListener("click", generatePrediction);


    document.getElementById("refreshAlertsBtn")
        ?.addEventListener("click", () => {

            renderAlerts();

            updateDashboard();

        });


    document.getElementById("reportDemandBtn")
        ?.addEventListener("click", generateDemandReport);


    document.getElementById("reportInventoryBtn")
        ?.addEventListener("click", generateInventoryReport);


    document.getElementById("reportBudgetBtn")
        ?.addEventListener("click", generateBudgetReport);


    document.getElementById("reportGeneralBtn")
        ?.addEventListener("click", generateGeneralReport);

});


/* =====================================================
   CERRAR MODALES HACIENDO CLICK AFUERA
===================================================== */

document.addEventListener("click", event => {

    if (event.target.classList.contains("modal")) {

        event.target.classList.remove("show");

    }

});
