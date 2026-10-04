/* =====================================================
   SALUDPREDICT
   JAVASCRIPT PRINCIPAL
===================================================== */

"use strict";


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
   DATOS DE DEMOSTRACIÓN
   SON DATOS FICTICIOS
===================================================== */

const DEMO_PATIENTS = [
    {
        id: "p001",
        document: "1001001001",
        name: "Ana María Torres",
        age: 34,
        service: "Medicina general",
        status: "Activo"
    },
    {
        id: "p002",
        document: "1002002002",
        name: "Carlos Andrés Gómez",
        age: 52,
        service: "Cardiología",
        status: "Activo"
    },
    {
        id: "p003",
        document: "1003003003",
        name: "Laura Marcela Rojas",
        age: 29,
        service: "Ginecología",
        status: "Activo"
    },
    {
        id: "p004",
        document: "1004004004",
        name: "Jorge Eduardo Pérez",
        age: 67,
        service: "Medicina general",
        status: "Activo"
    },
    {
        id: "p005",
        document: "1005005005",
        name: "María Fernanda López",
        age: 41,
        service: "Gastroenterología",
        status: "Activo"
    },
    {
        id: "p006",
        document: "1006006006",
        name: "Diego Alejandro Castro",
        age: 38,
        service: "Odontología",
        status: "Activo"
    },
    {
        id: "p007",
        document: "1007007007",
        name: "Sofía Valentina Ruiz",
        age: 24,
        service: "Laboratorio clínico",
        status: "Activo"
    },
    {
        id: "p008",
        document: "1008008008",
        name: "Ricardo Antonio Díaz",
        age: 61,
        service: "Urgencias",
        status: "Activo"
    },
    {
        id: "p009",
        document: "1009009009",
        name: "Natalia Andrea Moreno",
        age: 32,
        service: "Imágenes diagnósticas",
        status: "Activo"
    },
    {
        id: "p010",
        document: "1010001010",
        name: "Felipe Santiago Vargas",
        age: 46,
        service: "Consulta externa",
        status: "Activo"
    },
    {
        id: "p011",
        document: "1011001111",
        name: "Claudia Patricia Méndez",
        age: 57,
        service: "Cardiología",
        status: "Inactivo"
    },
    {
        id: "p012",
        document: "1012001212",
        name: "Andrés Felipe Herrera",
        age: 36,
        service: "Urgencias",
        status: "Activo"
    },
    {
        id: "p013",
        document: "1013001313",
        name: "Paula Andrea Sánchez",
        age: 27,
        service: "Ginecología",
        status: "Activo"
    },
    {
        id: "p014",
        document: "1014001414",
        name: "Mauricio Esteban León",
        age: 49,
        service: "Consulta externa",
        status: "Activo"
    },
    {
        id: "p015",
        document: "1015001515",
        name: "Valentina Cruz",
        age: 22,
        service: "Odontología",
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
        duration: "45 min",
        price: 150000,
        status: "Activo"
    },
    {
        id: "s008",
        code: "SER-008",
        name: "Ginecología",
        category: "Consulta",
        duration: "40 min",
        price: 135000,
        status: "Activo"
    },
    {
        id: "s009",
        code: "SER-009",
        name: "Gastroenterología",
        category: "Consulta",
        duration: "45 min",
        price: 145000,
        status: "Activo"
    },
    {
        id: "s010",
        code: "SER-010",
        name: "Imágenes diagnósticas",
        category: "Diagnóstico",
        duration: "60 min",
        price: 180000,
        status: "Activo"
    },
    {
        id: "s011",
        code: "SER-011",
        name: "Promoción y prevención",
        category: "Promoción y prevención",
        duration: "30 min",
        price: 55000,
        status: "Activo"
    },
    {
        id: "s012",
        code: "SER-012",
        name: "Procedimientos menores",
        category: "Procedimiento",
        duration: "60 min",
        price: 210000,
        status: "Inactivo"
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
        stock: 42,
        minStock: 60,
        expiry: "2026-10-25",
        price: 1850,
        status: "Activo"
    },
    {
        id: "i004",
        code: "MED-004",
        name: "Losartán 50 mg",
        category: "Medicamentos",
        unit: "Tabletas",
        stock: 95,
        minStock: 40,
        expiry: "2027-08-20",
        price: 1100,
        status: "Activo"
    },
    {
        id: "i005",
        code: "INS-001",
        name: "Guantes de nitrilo",
        category: "Elementos de protección",
        unit: "Cajas",
        stock: 500,
        minStock: 100,
        expiry: "",
        price: 45000,
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
        stock: 85,
        minStock: 100,
        expiry: "2028-04-15",
        price: 18000,
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
        minStock: 20,
        expiry: "2026-11-15",
        price: 85000,
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
        expiry: "2027-05-12",
        price: 4500,
        status: "Activo"
    },
    {
        id: "i012",
        code: "EQ-001",
        name: "Tensiómetro digital",
        category: "Equipos",
        unit: "Unidades",
        stock: 14,
        minStock: 5,
        expiry: "",
        price: 185000,
        status: "Activo"
    }
];


const DEMO_BUDGET = [
    {
        id: "b001",
        category: "Personal",
        description: "Nómina y honorarios profesionales",
        amount: 280000000,
        date: "2026-01-30",
        status: "Ejecutado"
    },
    {
        id: "b002",
        category: "Medicamentos",
        description: "Adquisición de medicamentos",
        amount: 95000000,
        date: "2026-02-15",
        status: "Ejecutado"
    },
    {
        id: "b003",
        category: "Insumos médicos",
        description: "Compra de insumos asistenciales",
        amount: 75000000,
        date: "2026-03-10",
        status: "Ejecutado"
    },
    {
        id: "b004",
        category: "Mantenimiento",
        description: "Mantenimiento preventivo",
        amount: 45000000,
        date: "2026-03-25",
        status: "Ejecutado"
    },
    {
        id: "b005",
        category: "Tecnología",
        description: "Actualización de equipos tecnológicos",
        amount: 35000000,
        date: "2026-04-20",
        status: "Ejecutado"
    },
    {
        id: "b006",
        category: "Equipos biomédicos",
        description: "Adquisición de equipos",
        amount: 65000000,
        date: "2026-05-12",
        status: "Ejecutado"
    },
    {
        id: "b007",
        category: "Infraestructura",
        description: "Adecuación de áreas asistenciales",
        amount: 55000000,
        date: "2026-06-18",
        status: "Ejecutado"
    },
    {
        id: "b008",
        category: "Capacitación",
        description: "Formación del talento humano",
        amount: 22000000,
        date: "2026-07-08",
        status: "Ejecutado"
    },
    {
        id: "b009",
        category: "Software",
        description: "Licencias y sistemas institucionales",
        amount: 18000000,
        date: "2026-08-14",
        status: "Programado"
    }
];


/* =====================================================
   UTILIDADES
===================================================== */

function getData(key, defaults) {

    try {

        const saved = localStorage.getItem(key);

        if (!saved) {
            localStorage.setItem(key, JSON.stringify(defaults));
            return [...defaults];
        }

        const parsed = JSON.parse(saved);

        if (!Array.isArray(parsed)) {
            localStorage.setItem(key, JSON.stringify(defaults));
            return [...defaults];
        }

        return parsed;

    } catch (error) {

        console.error(error);

        return [...defaults];
    }
}


function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}


function currency(value) {

    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(Number(value) || 0);
}


function number(value) {

    return new Intl.NumberFormat("es-CO").format(Number(value) || 0);
}


function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function todayISO() {

    const date = new Date();

    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function formatDate(dateString) {

    if (!dateString) {
        return "No aplica";
    }

    const parts = dateString.split("-");

    if (parts.length !== 3) {
        return dateString;
    }

    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}


function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


function generateId(prefix) {

    return prefix + Date.now() + Math.floor(Math.random() * 1000);
}


/* =====================================================
   DATOS
===================================================== */

let patients = getData(STORAGE.patients, DEMO_PATIENTS);

let services = getData(STORAGE.services, DEMO_SERVICES);

let inventory = getData(STORAGE.inventory, DEMO_INVENTORY);

let budget = getData(STORAGE.budget, DEMO_BUDGET);


/* =====================================================
   NAVEGACIÓN
===================================================== */

function showSection(sectionId) {

    document.querySelectorAll(".section").forEach(section => {
        section.classList.remove("active");
    });


    const target = document.getElementById(sectionId);

    if (!target) {
        return;
    }


    target.classList.add("active");


    document.querySelectorAll(".nav-item").forEach(item => {

        item.classList.toggle(
            "active",
            item.dataset.section === sectionId
        );

    });


    document.getElementById("sidebar")?.classList.remove("open");


    if (sectionId === "dashboard") {
        updateDashboard();
    }

    if (sectionId === "analisis") {
        updateAnalysis();
    }

    if (sectionId === "alertas") {
        renderAlerts();
    }

    if (sectionId === "predicciones") {
        populatePredictionServices();
    }
}


document.querySelectorAll(".nav-item").forEach(button => {

    button.addEventListener("click", () => {

        showSection(button.dataset.section);

    });

});


document.querySelectorAll(".flow-node[data-go]").forEach(node => {

    node.addEventListener("click", () => {

        showSection(node.dataset.go);

    });

});


/* =====================================================
   MENÚ MÓVIL
===================================================== */

const menuBtn = document.getElementById("menuBtn");

const sidebar = document.getElementById("sidebar");


menuBtn?.addEventListener("click", () => {

    sidebar?.classList.toggle("open");

});


/* =====================================================
   FECHA ACTUAL
===================================================== */

function renderCurrentDate() {

    const element = document.getElementById("currentDate");

    if (!element) {
        return;
    }

    element.textContent = new Intl.DateTimeFormat(
        "es-CO",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    ).format(new Date());
}


/* =====================================================
   PACIENTES
===================================================== */

function renderPatients(search = "") {

    const table = document.getElementById("patientsTable");

    if (!table) {
        return;
    }


    const query = search.toLowerCase().trim();


    const filtered = patients.filter(patient => {

        const text = [
            patient.document,
            patient.name,
            patient.service,
            patient.status
        ]
        .join(" ")
        .toLowerCase();

        return text.includes(query);

    });


    if (!filtered.length) {

        table.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="empty-state">
                        <span>👥</span>
                        <h2>No se encontraron pacientes</h2>
                        <p>Prueba con otro término de búsqueda.</p>
                    </div>
                </td>
            </tr>
        `;

        return;
    }


    table.innerHTML = filtered.map(patient => `

        <tr>

            <td>
                <strong>${escapeHTML(patient.document)}</strong>
            </td>

            <td>${escapeHTML(patient.name)}</td>

            <td>${number(patient.age)} años</td>

            <td>${escapeHTML(patient.service)}</td>

            <td>
                <span class="status ${patient.status}">
                    ${escapeHTML(patient.status)}
                </span>
            </td>

            <td>

                <div class="actions">

                    <button
                        class="action-btn edit"
                        onclick="editPatient('${patient.id}')">
                        Editar
                    </button>

                    <button
                        class="action-btn delete"
                        onclick="deletePatient('${patient.id}')">
                        Eliminar
                    </button>

                </div>

            </td>

        </tr>

    `).join("");


    updatePatientStats();
}


function updatePatientStats() {

    const total = patients.length;

    const active = patients.filter(
        p => p.status === "Activo"
    ).length;


    document.getElementById("totalPatients").textContent =
        number(total);

    document.getElementById("activePatients").textContent =
        number(active);

    document.getElementById("newPatients").textContent =
        number(Math.min(6, total));


    document.getElementById("dashboardPatients").textContent =
        number(active);
}


function openPatientModal(patient = null) {

    const modal = document.getElementById("patientModal");

    const form = document.getElementById("patientForm");

    form.reset();


    if (patient) {

        document.getElementById("modalTitle").textContent =
            "Editar paciente";

        document.getElementById("patientId").value =
            patient.id;

        document.getElementById("document").value =
            patient.document;

        document.getElementById("name").value =
            patient.name;

        document.getElementById("age").value =
            patient.age;

        document.getElementById("service").value =
            patient.service;

        document.getElementById("status").value =
            patient.status;

    } else {

        document.getElementById("modalTitle").textContent =
            "Nuevo paciente";

        document.getElementById("patientId").value = "";

    }


    modal.classList.add("show");
}


function closePatientModal() {

    document.getElementById("patientModal")
        ?.classList.remove("show");

}


function editPatient(id) {

    const patient = patients.find(
        p => p.id === id
    );

    if (patient) {
        openPatientModal(patient);
    }
}


function deletePatient(id) {

    const patient = patients.find(
        p => p.id === id
    );

    if (!patient) {
        return;
    }


    if (!confirm(`¿Eliminar a ${patient.name}?`)) {
        return;
    }


    patients = patients.filter(
        p => p.id !== id
    );


    saveData(STORAGE.patients, patients);

    renderPatients(
        document.getElementById("patientSearch")?.value || ""
    );

    updateDashboard();

    showToast("Paciente eliminado correctamente");
}


function populatePatientServices() {

    const select = document.getElementById("service");

    if (!select) {
        return;
    }


    select.innerHTML = `
        <option value="">Seleccione un servicio</option>
        ${
            services.map(service => `
                <option value="${escapeHTML(service.name)}">
                    ${escapeHTML(service.name)}
                </option>
            `).join("")
        }
    `;
}


document.getElementById("patientForm")
    ?.addEventListener("submit", event => {

        event.preventDefault();


        const id =
            document.getElementById("patientId").value;


        const patientData = {

            id: id || generateId("p"),

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


        if (id) {

            patients = patients.map(patient =>
                patient.id === id
                    ? patientData
                    : patient
            );

            showToast("Paciente actualizado");

        } else {

            patients.push(patientData);

            showToast("Paciente registrado");

        }


        saveData(STORAGE.patients, patients);

        renderPatients();

        updateDashboard();

        closePatientModal();

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


document.getElementById("patientSearch")
    ?.addEventListener("input", event => {

        renderPatients(event.target.value);

    });


/* =====================================================
   SERVICIOS
===================================================== */

function renderServices(search = "") {

    const table = document.getElementById("servicesTable");

    if (!table) {
        return;
    }


    const query = search.toLowerCase().trim();


    const filtered = services.filter(service => {

        const text = [
            service.code,
            service.name,
            service.category,
            service.duration,
            service.status
        ]
        .join(" ")
        .toLowerCase();

        return text.includes(query);

    });


    if (!filtered.length) {

        table.innerHTML = `
            <tr>
                <td colspan="7">
                    <div class="empty-state">
                        <span>🏥</span>
                        <h2>No hay servicios</h2>
                        <p>No se encontraron registros.</p>
                    </div>
                </td>
            </tr>
        `;

        return;
    }


    table.innerHTML = filtered.map(service => `

        <tr>

            <td>
                <strong>${escapeHTML(service.code)}</strong>
            </td>

            <td>${escapeHTML(service.name)}</td>

            <td>${escapeHTML(service.category)}</td>

            <td>${escapeHTML(service.duration)}</td>

            <td>${currency(service.price)}</td>

            <td>
                <span class="status ${service.status}">
                    ${escapeHTML(service.status)}
                </span>
            </td>

            <td>

                <div class="actions">

                    <button
                        class="action-btn edit"
                        onclick="editService('${service.id}')">
                        Editar
                    </button>

                    <button
                        class="action-btn delete"
                        onclick="deleteService('${service.id}')">
                        Eliminar
                    </button>

                </div>

            </td>

        </tr>

    `).join("");


    updateServiceStats();
}


function updateServiceStats() {

    const total = services.length;

    const active = services.filter(
        s => s.status === "Activo"
    ).length;


    const prices = services
        .filter(s => Number(s.price) > 0)
        .map(s => Number(s.price));


    const average = prices.length
        ? prices.reduce((a, b) => a + b, 0) / prices.length
        : 0;


    document.getElementById("totalServices").textContent =
        number(total);

    document.getElementById("activeServices").textContent =
        number(active);

    document.getElementById("averageServicePrice").textContent =
        currency(average);

    document.getElementById("dashboardServices").textContent =
        number(active);
}


function openServiceModal(service = null) {

    const modal = document.getElementById("serviceModal");

    document.getElementById("serviceForm").reset();


    if (service) {

        document.getElementById("serviceModalTitle").textContent =
            "Editar servicio";

        document.getElementById("serviceId").value =
            service.id;

        document.getElementById("serviceCode").value =
            service.code;

        document.getElementById("serviceName").value =
            service.name;

        document.getElementById("serviceCategory").value =
            service.category;

        document.getElementById("serviceDuration").value =
            service.duration;

        document.getElementById("servicePrice").value =
            service.price;

        document.getElementById("serviceStatus").value =
            service.status;

    } else {

        document.getElementById("serviceModalTitle").textContent =
            "Nuevo servicio";

        document.getElementById("serviceId").value = "";

    }


    modal.classList.add("show");
}


function closeServiceModal() {

    document.getElementById("serviceModal")
        ?.classList.remove("show");

}


function editService(id) {

    const service = services.find(
        s => s.id === id
    );

    if (service) {
        openServiceModal(service);
    }
}


function deleteService(id) {

    const service = services.find(
        s => s.id === id
    );

    if (!service) {
        return;
    }


    if (!confirm(`¿Eliminar el servicio ${service.name}?`)) {
        return;
    }


    services = services.filter(
        s => s.id !== id
    );


    saveData(STORAGE.services, services);

    renderServices(
        document.getElementById("serviceSearch")?.value || ""
    );

    populatePatientServices();

    populatePredictionServices();

    updateDashboard();

    showToast("Servicio eliminado");

}


document.getElementById("serviceForm")
    ?.addEventListener("submit", event => {

        event.preventDefault();


        const id =
            document.getElementById("serviceId").value;


        const data = {

            id: id || generateId("s"),

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


        if (id) {

            services = services.map(service =>
                service.id === id
                    ? data
                    : service
            );

            showToast("Servicio actualizado");

        } else {

            services.push(data);

            showToast("Servicio registrado");

        }


        saveData(STORAGE.services, services);

        renderServices();

        populatePatientServices();

        populatePredictionServices();

        updateDashboard();

        closeServiceModal();

    });


document.getElementById("newServiceBtn")
    ?.addEventListener("click", () => {

        openServiceModal();

    });


document.getElementById("closeServiceModal")
    ?.addEventListener("click", closeServiceModal);


document.getElementById("cancelServiceBtn")
    ?.addEventListener("click", closeServiceModal);


document.getElementById("serviceSearch")
    ?.addEventListener("input", event => {

        renderServices(event.target.value);

    });


/* =====================================================
   INVENTARIO
===================================================== */

function isLowStock(item) {

    return Number(item.stock) <= Number(item.minStock);

}


function isExpiringSoon(item) {

    if (!item.expiry) {
        return false;
    }


    const expiry = new Date(item.expiry + "T23:59:59");

    const today = new Date();

    const difference =
        expiry.getTime() - today.getTime();

    const days =
        difference / (1000 * 60 * 60 * 24);


    return days >= 0 && days <= 60;
}


function renderInventory(search = "") {

    const table =
        document.getElementById("inventoryTable");

    if (!table) {
        return;
    }


    const query = search.toLowerCase().trim();


    const filtered = inventory.filter(item => {

        const text = [
            item.code,
            item.name,
            item.category,
            item.unit,
            item.status
        ]
        .join(" ")
        .toLowerCase();

        return text.includes(query);

    });


    if (!filtered.length) {

        table.innerHTML = `
            <tr>
                <td colspan="10">
                    <div class="empty-state">
                        <span>📦</span>
                        <h2>No hay productos</h2>
                        <p>No se encontraron registros.</p>
                    </div>
                </td>
            </tr>
        `;

        return;
    }


    table.innerHTML = filtered.map(item => {

        let stockClass = "active";

        if (isLowStock(item)) {
            stockClass = "critical";
        }

        else if (Number(item.stock) <= Number(item.minStock) * 1.5) {
            stockClass = "warning";
        }


        let expiryClass = "";

        if (isExpiringSoon(item)) {
            expiryClass = "critical";
        }


        return `

            <tr>

                <td>
                    <strong>${escapeHTML(item.code)}</strong>
                </td>

                <td>${escapeHTML(item.name)}</td>

                <td>${escapeHTML(item.category)}</td>

                <td>${escapeHTML(item.unit || "Unidades")}</td>

                <td>
                    <span class="status ${stockClass}">
                        ${number(item.stock)}
                    </span>
                </td>

                <td>${number(item.minStock)}</td>

                <td>
                    <span class="${expiryClass}">
                        ${formatDate(item.expiry)}
                    </span>
                </td>

                <td>${currency(item.price)}</td>

                <td>
                    <span class="status ${item.status}">
                        ${escapeHTML(item.status)}
                    </span>
                </td>

                <td>

                    <div class="actions">

                        <button
                            class="action-btn edit"
                            onclick="editInventory('${item.id}')">
                            Editar
                        </button>

                        <button
                            class="action-btn delete"
                            onclick="deleteInventory('${item.id}')">
                            Eliminar
                        </button>

                    </div>

                </td>

            </tr>

        `;

    }).join("");


    updateInventoryStats();
}


function updateInventoryStats() {

    const total = inventory.length;

    const lowStock =
        inventory.filter(isLowStock).length;

    const expiring =
        inventory.filter(isExpiringSoon).length;


    document.getElementById("totalInventory").textContent =
        number(total);

    document.getElementById("lowStockInventory").textContent =
        number(lowStock);

    document.getElementById("expiringInventory").textContent =
        number(expiring);
}


function openInventoryModal(item = null) {

    const modal =
        document.getElementById("inventoryModal");

    document.getElementById("inventoryForm").reset();


    if (item) {

        document.getElementById("inventoryModalTitle").textContent =
            "Editar producto";

        document.getElementById("inventoryId").value =
            item.id;

        document.getElementById("inventoryCode").value =
            item.code;

        document.getElementById("inventoryName").value =
            item.name;

        document.getElementById("inventoryCategory").value =
            item.category;

        document.getElementById("inventoryUnit").value =
            item.unit || "Unidades";

        document.getElementById("inventoryStock").value =
            item.stock;

        document.getElementById("inventoryMinStock").value =
            item.minStock;

        document.getElementById("inventoryExpiry").value =
            item.expiry || "";

        document.getElementById("inventoryPrice").value =
            item.price ?? item.unitCost ?? 0;

        document.getElementById("inventoryStatus").value =
            item.status;

    } else {

        document.getElementById("inventoryModalTitle").textContent =
            "Nuevo producto";

        document.getElementById("inventoryId").value = "";

    }


    modal.classList.add("show");
}


function closeInventoryModal() {

    document.getElementById("inventoryModal")
        ?.classList.remove("show");

}


function editInventory(id) {

    const item = inventory.find(
        i => i.id === id
    );

    if (item) {
        openInventoryModal(item);
    }
}


function deleteInventory(id) {

    const item = inventory.find(
        i => i.id === id
    );

    if (!item) {
        return;
    }


    if (!confirm(`¿Eliminar ${item.name}?`)) {
        return;
    }


    inventory = inventory.filter(
        i => i.id !== id
    );


    saveData(STORAGE.inventory, inventory);

    renderInventory(
        document.getElementById("inventorySearch")?.value || ""
    );

    updateDashboard();

    renderAlerts();

    showToast("Producto eliminado");

}


document.getElementById("inventoryForm")
    ?.addEventListener("submit", event => {

        event.preventDefault();


        const id =
            document.getElementById("inventoryId").value;


        const data = {

            id: id || generateId("i"),

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


        if (id) {

            inventory = inventory.map(item =>
                item.id === id
                    ? data
                    : item
            );

            showToast("Producto actualizado");

        } else {

            inventory.push(data);

            showToast("Producto registrado");

        }


        saveData(STORAGE.inventory, inventory);

        renderInventory();

        updateDashboard();

        renderAlerts();

        closeInventoryModal();

    });


document.getElementById("newInventoryBtn")
    ?.addEventListener("click", () => {

        openInventoryModal();

    });


document.getElementById("closeInventoryModal")
    ?.addEventListener("click", closeInventoryModal);


document.getElementById("cancelInventoryModal")
    ?.addEventListener("click", closeInventoryModal);


document.getElementById("inventorySearch")
    ?.addEventListener("input", event => {

        renderInventory(event.target.value);

    });


/* =====================================================
   PRESUPUESTO
===================================================== */

function getExecutedBudget() {

    return budget
        .filter(item => item.status === "Ejecutado")
        .reduce(
            (sum, item) => sum + Number(item.amount),
            0
        );
}


function updateBudgetSummary() {

    const approved =
        BUDGET_APPROVED_VALUE;

    const executed =
        getExecutedBudget();

    const available =
        Math.max(approved - executed, 0);

    const percentage =
        approved
            ? Math.round((executed / approved) * 100)
            : 0;


    document.getElementById("budgetApproved").textContent =
        currency(approved);

    document.getElementById("budgetExecuted").textContent =
        currency(executed);

    document.getElementById("budgetAvailable").textContent =
        currency(available);

    document.getElementById("budgetPercentage").textContent =
        `${percentage}%`;

}


function renderBudget(search = "") {

    const table =
        document.getElementById("budgetTable");

    if (!table) {
        return;
    }


    const query =
        search.toLowerCase().trim();


    const filtered =
        budget.filter(item => {

            const text = [
                item.category,
                item.description,
                item.status
            ]
            .join(" ")
            .toLowerCase();

            return text.includes(query);

        });


    if (!filtered.length) {

        table.innerHTML = `
            <tr>
                <td colspan="6">
                    <div class="empty-state">
                        <span>💰</span>
                        <h2>No hay movimientos</h2>
                        <p>No se encontraron registros.</p>
                    </div>
                </td>
            </tr>
        `;

        return;
    }


    table.innerHTML = filtered.map(item => `

        <tr>

            <td>
                <strong>${escapeHTML(item.category)}</strong>
            </td>

            <td>${escapeHTML(item.description)}</td>

            <td>${currency(item.amount)}</td>

            <td>${formatDate(item.date)}</td>

            <td>
                <span class="status ${
                    item.status === "Ejecutado"
                        ? "active"
                        : "warning"
                }">
                    ${escapeHTML(item.status)}
                </span>
            </td>

            <td>

                <button
                    class="action-btn delete"
                    onclick="deleteBudget('${item.id}')">
                    Eliminar
                </button>

            </td>

        </tr>

    `).join("");


    updateBudgetSummary();
}


function openBudgetModal() {

    document.getElementById("budgetForm").reset();

    document.getElementById("budgetDate").value =
        todayISO();

    document.getElementById("budgetModal")
        .classList.add("show");

}


function closeBudgetModal() {

    document.getElementById("budgetModal")
        ?.classList.remove("show");

}


function deleteBudget(id) {

    if (!confirm("¿Eliminar este movimiento presupuestal?")) {
        return;
    }


    budget = budget.filter(
        item => item.id !== id
    );


    saveData(STORAGE.budget, budget);

    renderBudget();

    updateDashboard();

    showToast("Movimiento eliminado");

}


document.getElementById("budgetForm")
    ?.addEventListener("submit", event => {

        event.preventDefault();


        const data = {

            id: generateId("b"),

            category:
                document.getElementById("budgetCategoryInput").value.trim(),

            description:
                document.getElementById("budgetDescription").value.trim(),

            amount:
                Number(document.getElementById("budgetAmount").value),

            date:
                document.getElementById("budgetDate").value,

            status:
                document.getElementById("budgetStatusInput").value

        };


        budget.push(data);

        saveData(STORAGE.budget, budget);

        renderBudget();

        updateDashboard();

        closeBudgetModal();

        showToast("Movimiento presupuestal registrado");

    });


document.getElementById("newBudgetBtn")
    ?.addEventListener("click", openBudgetModal);


document.getElementById("closeBudgetModal")
    ?.addEventListener("click", closeBudgetModal);


document.getElementById("cancelBudgetBtn")
    ?.addEventListener("click", closeBudgetModal);


document.getElementById("budgetSearch")
    ?.addEventListener("input", event => {

        renderBudget(event.target.value);

    });


/* =====================================================
   DASHBOARD
===================================================== */

function updateDashboard() {

    updatePatientStats();

    updateServiceStats();

    updateInventoryStats();

    updateBudgetSummary();

    updateDashboardInventory();

    updateDashboardDemand();

    updateDashboardAlerts();

    updateDashboardSummary();

    updateDashboardBudget();

}


function updateDashboardBudget() {

    const executed =
        getExecutedBudget();

    const percentage =
        Math.round(
            (executed / BUDGET_APPROVED_VALUE) * 100
        );


    document.getElementById("dashboardBudget").textContent =
        `${percentage}%`;

    document.getElementById("dashboardBudgetPercentage").textContent =
        `${percentage}%`;

    document.getElementById("dashboardBudgetExecuted").textContent =
        currency(executed);

    document.getElementById("dashboardBudgetTotal").textContent =
        currency(BUDGET_APPROVED_VALUE);


    document.getElementById("dashboardBudgetBar").style.width =
        `${Math.min(percentage, 100)}%`;
}


function updateDashboardInventory() {

    const total =
        inventory.length;

    const low =
        inventory.filter(isLowStock).length;

    const expiring =
        inventory.filter(isExpiringSoon).length;


    const healthy =
        Math.max(total - low - expiring, 0);


    const percentage =
        total
            ? Math.round(
                (healthy / total) * 100
            )
            : 0;


    document.getElementById("dashboardInventory").textContent =
        `${percentage}%`;


    document.getElementById("dashboardInventorySummary").innerHTML = `

        <div class="inventory-line">
            <div>
                <strong>Productos registrados</strong>
                <span>Total de referencias</span>
            </div>

            <strong class="inventory-number">
                ${number(total)}
            </strong>
        </div>

        <div class="inventory-line">
            <div>
                <strong>Stock bajo</strong>
                <span>Requieren reposición</span>
            </div>

            <strong class="inventory-number">
                ${number(low)}
            </strong>
        </div>

        <div class="inventory-line">
            <div>
                <strong>Próximos a vencer</strong>
                <span>Revisión requerida</span>
            </div>

            <strong class="inventory-number">
                ${number(expiring)}
            </strong>
        </div>

    `;
}


function updateDashboardDemand() {

    const chart =
        document.getElementById("dashboardServiceDemand");

    if (!chart) {
        return;
    }


    const monthly = [
        ["Ene", 58],
        ["Feb", 66],
        ["Mar", 61],
        ["Abr", 74],
        ["May", 82],
        ["Jun", 76],
        ["Jul", 87],
        ["Ago", 79],
        ["Sep", 91],
        ["Oct", 86],
        ["Nov", 72],
        ["Dic", 68]
    ];


    chart.innerHTML =
        monthly.map(([month, value]) => `

            <div class="bar-item">

                <span class="bar-value">
                    ${value}%
                </span>

                <div
                    class="bar"
                    style="height:${value}%">
                </div>

                <span class="bar-label">
                    ${month}
                </span>

            </div>

        `).join("");
}


function generateAlerts() {

    const alerts = [];


    const lowStock =
        inventory.filter(isLowStock);


    lowStock.forEach(item => {

        alerts.push({

            type: "critical",

            icon: "🚨",

            title: "Stock bajo",

            message:
                `${item.name} tiene ${item.stock} unidades y el mínimo establecido es ${item.minStock}.`

        });

    });


    const expiring =
        inventory.filter(isExpiringSoon);


    expiring.forEach(item => {

        alerts.push({

            type: "warning",

            icon: "⚠️",

            title: "Próximo vencimiento",

            message:
                `${item.name} tiene vencimiento el ${formatDate(item.expiry)}.`

        });

    });


    const percentage =
        Math.round(
            (getExecutedBudget() / BUDGET_APPROVED_VALUE) * 100
        );


    if (percentage >= 70) {

        alerts.push({

            type: "warning",

            icon: "💰",

            title: "Ejecución presupuestal elevada",

            message:
                `La ejecución presupuestal alcanza el ${percentage}% del presupuesto aprobado.`

        });

    }


    alerts.push({

        type: "info",

        icon: "📊",

        title: "Demanda institucional",

        message:
            "Se observa una tendencia creciente en varios servicios durante el periodo analizado."

    });


    return alerts;

}


function updateDashboardAlerts() {

    const container =
        document.getElementById("dashboardAlerts");

    if (!container) {
        return;
    }


    const alerts =
        generateAlerts();


    document.getElementById("dashboardAlertCount").textContent =
        number(alerts.length);


    container.innerHTML =
        alerts.slice(0, 4).map(alert => `

            <div class="mini-alert ${alert.type}">

                <div class="mini-alert-icon">
                    ${alert.icon}
                </div>

                <div>

                    <strong>
                        ${escapeHTML(alert.title)}
                    </strong>

                    <p>
                        ${escapeHTML(alert.message)}
                    </p>

                </div>

            </div>

        `).join("");
}


function updateDashboardSummary() {

    const element =
        document.getElementById("dashboardSystemSummary");

    if (!element) {
        return;
    }


    const activePatients =
        patients.filter(p => p.status === "Activo").length;


    const activeServices =
        services.filter(s => s.status === "Activo").length;


    const lowStock =
        inventory.filter(isLowStock).length;


    const executed =
        getExecutedBudget();


    element.innerHTML = `

        <div class="summary-item">
            <span>Pacientes activos</span>
            <strong>${number(activePatients)}</strong>
        </div>

        <div class="summary-item">
            <span>Servicios activos</span>
            <strong>${number(activeServices)}</strong>
        </div>

        <div class="summary-item">
            <span>Productos con stock bajo</span>
            <strong>${number(lowStock)}</strong>
        </div>

        <div class="summary-item">
            <span>Recursos ejecutados</span>
            <strong>${currency(executed)}</strong>
        </div>

    `;
}


/* =====================================================
   ANÁLISIS
===================================================== */

function updateAnalysis() {

    const activePatients =
        patients.filter(
            p => p.status === "Activo"
        ).length;


    const activeServices =
        services.filter(
            s => s.status === "Activo"
        ).length;


    const lowStock =
        inventory.filter(isLowStock).length;


    document.getElementById("analysisPatients").textContent =
        number(activePatients);

    document.getElementById("analysisServices").textContent =
        number(activeServices);

    document.getElementById("analysisInventory").textContent =
        number(inventory.length);

    document.getElementById("analysisLowStock").textContent =
        number(lowStock);


    renderPatientsAnalysis();

    renderInventoryAnalysis();

    renderFinancialAnalysis();
}


function renderPatientsAnalysis() {

    const container =
        document.getElementById("patientsAnalysisChart");

    if (!container) {
        return;
    }


    const counts = {};


    patients.forEach(patient => {

        counts[patient.service] =
            (counts[patient.service] || 0) + 1;

    });


    const data =
        Object.entries(counts)
            .sort((a, b) => b[1] - a[1]);


    const max =
        Math.max(...data.map(item => item[1]), 1);


    container.innerHTML =
        data.map(([service, count]) => `

            <div class="horizontal-item">

                <span class="horizontal-label">
                    ${escapeHTML(service)}
                </span>

                <div class="horizontal-track">

                    <div
                        class="horizontal-fill"
                        style="width:${(count / max) * 100}%">
                    </div>

                </div>

                <span class="horizontal-value">
                    ${count}
                </span>

            </div>

        `).join("");
}


function renderInventoryAnalysis() {

    const container =
        document.getElementById("inventoryAnalysisChart");

    if (!container) {
        return;
    }


    const total =
        inventory.length;

    const low =
        inventory.filter(isLowStock).length;

    const expiring =
        inventory.filter(isExpiringSoon).length;

    const normal =
        Math.max(total - low, 0);


    container.innerHTML = `

        <div class="analysis-row">
            <span>Total de productos</span>
            <strong>${number(total)}</strong>
        </div>

        <div class="analysis-row">
            <span>Stock adecuado</span>
            <strong>${number(normal)}</strong>
        </div>

        <div class="analysis-row">
            <span>Stock bajo</span>
            <strong>${number(low)}</strong>
        </div>

        <div class="analysis-row">
            <span>Próximos a vencer</span>
            <strong>${number(expiring)}</strong>
        </div>

    `;
}


function renderFinancialAnalysis() {

    const container =
        document.getElementById("financialAnalysis");

    if (!container) {
        return;
    }


    const executed =
        getExecutedBudget();


    const available =
        Math.max(
            BUDGET_APPROVED_VALUE - executed,
            0
        );


    const percentage =
        Math.round(
            (executed / BUDGET_APPROVED_VALUE) * 100
        );


    container.innerHTML = `

        <div class="financial-box">
            <span>Presupuesto aprobado</span>
            <strong>${currency(BUDGET_APPROVED_VALUE)}</strong>
        </div>

        <div class="financial-box">
            <span>Presupuesto ejecutado</span>
            <strong>${currency(executed)}</strong>
        </div>

        <div class="financial-box">
            <span>Porcentaje de ejecución</span>
            <strong>${percentage}%</strong>
        </div>

        <div class="financial-box">
            <span>Disponible</span>
            <strong>${currency(available)}</strong>
        </div>

    `;
}


/* =====================================================
   PREDICCIONES
===================================================== */

function populatePredictionServices() {

    const select =
        document.getElementById("predictionService");

    if (!select) {
        return;
    }


    const current =
        select.value;


    select.innerHTML = `

        <option value="">
            Seleccione un servicio
        </option>

        ${
            services
                .filter(s => s.status === "Activo")
                .map(service => `
                    <option value="${escapeHTML(service.name)}">
                        ${escapeHTML(service.name)}
                    </option>
                `)
                .join("")
        }

    `;


    if (
        current &&
        services.some(
            s => s.name === current
        )
    ) {
        select.value = current;
    }
}


function generatePrediction() {

    const serviceName =
        document.getElementById("predictionService").value;


    const period =
        Number(
            document.getElementById("predictionPeriod").value
        );


    const result =
        document.getElementById("predictionResult");


    if (!serviceName) {

        showToast("Seleccione un servicio");

        return;
    }


    const patientCount =
        patients.filter(
            p => p.service === serviceName
        ).length;


    const activePatientCount =
        patients.filter(
            p =>
                p.service === serviceName &&
                p.status === "Activo"
        ).length;


    const base =
        Math.max(
            activePatientCount * 8,
            20
        );


    const estimated =
        Math.round(
            base * (1 + (period * 0.06))
        );


    const variation =
        Math.round(
            ((estimated - base) / base) * 100
        );


    result.innerHTML = `

        <div class="prediction-card">

            <h2>
                🔮 Predicción: ${escapeHTML(serviceName)}
            </h2>

            <p>
                Estimación inicial basada en los registros
                disponibles actualmente en SALUDPREDICT.
            </p>


            <div class="prediction-metrics">

                <div class="prediction-metric">

                    <span>
                        Registros actuales
                    </span>

                    <strong>
                        ${number(patientCount)}
                    </strong>

                </div>


                <div class="prediction-metric">

                    <span>
                        Demanda estimada
                    </span>

                    <strong>
                        ${number(estimated)}
                    </strong>

                </div>


                <div class="prediction-metric">

                    <span>
                        Variación estimada
                    </span>

                    <strong>
                        +${variation}%
                    </strong>

                </div>

            </div>


            <div class="prediction-note">

                💡 Esta es una estimación demostrativa.
                Para una predicción institucional avanzada,
                el sistema podría incorporar históricos mensuales,
                estacionalidad, regresión y modelos de inteligencia
                artificial.

            </div>

        </div>

    `;
}


document.getElementById("generatePredictionBtn")
    ?.addEventListener("click", generatePrediction);


/* =====================================================
   ALERTAS
===================================================== */

function renderAlerts() {

    const container =
        document.getElementById("alertsContainer");

    if (!container) {
        return;
    }


    const alerts =
        generateAlerts();


    const critical =
        alerts.filter(
            a => a.type === "critical"
        ).length;


    const attention =
        alerts.filter(
            a =>
                a.type === "critical" ||
                a.type === "warning"
        ).length;


    const normal =
        alerts.filter(
            a => a.type === "info"
        ).length;


    document.getElementById("totalAlerts").textContent =
        number(alerts.length);

    document.getElementById("attentionAlerts").textContent =
        number(attention);

    document.getElementById("criticalAlerts").textContent =
        number(critical);

    document.getElementById("normalAlerts").textContent =
        number(normal);


    if (!alerts.length) {

        container.innerHTML = `

            <div class="card">
                <div class="empty-state">
                    <span>✓</span>
                    <h2>No hay alertas</h2>
                    <p>La institución se encuentra sin situaciones pendientes.</p>
                </div>
            </div>

        `;

        return;
    }


    container.innerHTML =
        alerts.map(alert => `

            <div class="alert-item ${alert.type}">

                <div class="alert-icon">
                    ${alert.icon}
                </div>

                <div class="alert-content">

                    <h3>
                        ${escapeHTML(alert.title)}
                    </h3>

                    <p>
                        ${escapeHTML(alert.message)}
                    </p>

                    <div class="alert-meta">
                        Generada automáticamente por SALUDPREDICT
                    </div>

                </div>

            </div>

        `).join("");
}


document.getElementById("refreshAlertsBtn")
    ?.addEventListener("click", () => {

        renderAlerts();

        updateDashboard();

        showToast("Alertas actualizadas");

    });


/* =====================================================
   REPORTES
===================================================== */

function openReport(title, content) {

    const output =
        document.getElementById("reportOutput");


    output.innerHTML = `

        <div class="report-document">

            <h2>${escapeHTML(title)}</h2>

            <div class="report-date">
                Generado el ${formatDate(todayISO())}
                por SALUDPREDICT
            </div>

            ${content}

        </div>

    `;


    showSection("reportes");

}


function generateDemandReport() {

    const activePatients =
        patients.filter(
            p => p.status === "Activo"
        ).length;


    const activeServices =
        services.filter(
            s => s.status === "Activo"
        ).length;


    const serviceCounts = {};


    patients.forEach(patient => {

        serviceCounts[patient.service] =
            (serviceCounts[patient.service] || 0) + 1;

    });


    const mostRequested =
        Object.entries(serviceCounts)
            .sort((a, b) => b[1] - a[1])[0];


    openReport(
        "Reporte de demanda asistencial",
        `

        <div class="report-kpis">

            <div class="report-kpi">
                <span>Pacientes activos</span>
                <strong>${number(activePatients)}</strong>
            </div>

            <div class="report-kpi">
                <span>Servicios activos</span>
                <strong>${number(activeServices)}</strong>
            </div>

            <div class="report-kpi">
                <span>Servicio con mayor demanda</span>
                <strong>
                    ${mostRequested
                        ? escapeHTML(mostRequested[0])
                        : "N/A"}
                </strong>
            </div>

            <div class="report-kpi">
                <span>Registros analizados</span>
                <strong>${number(patients.length)}</strong>
            </div>

        </div>

        <p class="report-text">
            El análisis de demostración muestra la distribución
            de los pacientes registrados entre los diferentes
            servicios de la institución. Esta información puede
            utilizarse para orientar la planeación de talento
            humano, capacidad instalada y recursos.
        </p>

        `
    );
}


function generateInventoryReport() {

    const low =
        inventory.filter(isLowStock);

    const expiring =
        inventory.filter(isExpiringSoon);


    const totalValue =
        inventory.reduce(
            (sum, item) =>
                sum +
                Number(item.stock) *
                Number(item.price),
            0
        );


    openReport(
        "Reporte de inventario",
        `

        <div class="report-kpis">

            <div class="report-kpi">
                <span>Productos</span>
                <strong>${number(inventory.length)}</strong>
            </div>

            <div class="report-kpi">
                <span>Stock bajo</span>
                <strong>${number(low.length)}</strong>
            </div>

            <div class="report-kpi">
                <span>Próximos a vencer</span>
                <strong>${number(expiring.length)}</strong>
            </div>

            <div class="report-kpi">
                <span>Valor estimado</span>
                <strong>${currency(totalValue)}</strong>
            </div>

        </div>

        <p class="report-text">
            El inventario presenta ${low.length} productos
            que requieren revisión por nivel de existencias
            y ${expiring.length} productos próximos a vencer.
            Se recomienda priorizar las compras de reposición
            y realizar seguimiento a los lotes próximos a
            vencimiento.
        </p>

        `
    );
}


function generateBudgetReport() {

    const executed =
        getExecutedBudget();


    const available =
        BUDGET_APPROVED_VALUE - executed;


    const percentage =
        Math.round(
            executed /
            BUDGET_APPROVED_VALUE *
            100
        );


    openReport(
        "Reporte de ejecución presupuestal",
        `

        <div class="report-kpis">

            <div class="report-kpi">
                <span>Aprobado</span>
                <strong>${currency(BUDGET_APPROVED_VALUE)}</strong>
            </div>

            <div class="report-kpi">
                <span>Ejecutado</span>
                <strong>${currency(executed)}</strong>
            </div>

            <div class="report-kpi">
                <span>Disponible</span>
                <strong>${currency(available)}</strong>
            </div>

            <div class="report-kpi">
                <span>Ejecución</span>
                <strong>${percentage}%</strong>
            </div>

        </div>

        <p class="report-text">
            La ejecución presupuestal acumulada representa
            el ${percentage}% del presupuesto aprobado.
            El saldo disponible corresponde a los recursos
            que aún pueden ser asignados a las diferentes
            necesidades institucionales.
        </p>

        `
    );
}


function generateGeneralReport() {

    const activePatients =
        patients.filter(
            p => p.status === "Activo"
        ).length;


    const activeServices =
        services.filter(
            s => s.status === "Activo"
        ).length;


    const lowStock =
        inventory.filter(isLowStock).length;


    const alerts =
        generateAlerts().length;


    const executed =
        getExecutedBudget();


    openReport(
        "Reporte general SALUDPREDICT",
        `

        <div class="report-kpis">

            <div class="report-kpi">
                <span>Pacientes activos</span>
                <strong>${number(activePatients)}</strong>
            </div>

            <div class="report-kpi">
                <span>Servicios activos</span>
                <strong>${number(activeServices)}</strong>
            </div>

            <div class="report-kpi">
                <span>Alertas</span>
                <strong>${number(alerts)}</strong>
            </div>

            <div class="report-kpi">
                <span>Presupuesto ejecutado</span>
                <strong>${currency(executed)}</strong>
            </div>

        </div>

        <p class="report-text">
            SALUDPREDICT consolida información de pacientes,
            servicios, inventario y presupuesto para apoyar
            la gestión institucional. Los indicadores
            permiten visualizar el comportamiento operativo,
            identificar situaciones que requieren atención y
            generar estimaciones de demanda.
        </p>

        <p class="report-text">
            En el escenario de demostración se identifican
            ${lowStock} productos con stock bajo y
            ${alerts} alertas generadas automáticamente.
            Estos resultados pueden utilizarse como base para
            implementar posteriormente modelos predictivos
            avanzados.
        </p>

        `
    );
}


document.getElementById("reportDemandBtn")
    ?.addEventListener("click", generateDemandReport);


document.getElementById("reportInventoryBtn")
    ?.addEventListener("click", generateInventoryReport);


document.getElementById("reportBudgetBtn")
    ?.addEventListener("click", generateBudgetReport);


document.getElementById("reportGeneralBtn")
    ?.addEventListener("click", generateGeneralReport);


/* =====================================================
   CIERRE DE MODALES AL HACER CLIC AFUERA
===================================================== */

document.querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener("click", event => {

            if (event.target === modal) {

                modal.classList.remove("show");

            }

        });

    });


/* =====================================================
   INICIALIZACIÓN
===================================================== */

function initializeApp() {

    renderCurrentDate();

    populatePatientServices();

    populatePredictionServices();

    renderPatients();

    renderServices();

    renderInventory();

    renderBudget();

    updateDashboard();

    updateAnalysis();

    renderAlerts();

}


initializeApp();


/* =====================================================
   EXPONER FUNCIONES PARA BOTONES HTML
===================================================== */

window.editPatient = editPatient;
window.deletePatient = deletePatient;

window.editService = editService;
window.deleteService = deleteService;

window.editInventory = editInventory;
window.deleteInventory = deleteInventory;

window.deleteBudget = deleteBudget;
