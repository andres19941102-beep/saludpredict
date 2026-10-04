/* =========================================================
   SALUDPREDICT
   Sistema de gestión inteligente en salud
========================================================= */


/* =========================================================
   CONFIGURACIÓN GENERAL
========================================================= */

const STORAGE = {
    patients: "saludpredict_patients",
    services: "saludpredict_services",
    inventory: "saludpredict_inventory",
    budget: "saludpredict_budget"
};


const BUDGET_APPROVED_VALUE = 1000000000;


/* =========================================================
   FUNCIONES GENERALES
========================================================= */

function getData(key, fallback = []) {

    try {

        const data = localStorage.getItem(key);

        if (!data) {
            return fallback;
        }

        return JSON.parse(data);

    } catch (error) {

        console.error("Error leyendo localStorage:", error);

        return fallback;
    }
}


function saveData(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );
}


function createId(prefix = "id") {

    return (
        prefix +
        "_" +
        Date.now() +
        "_" +
        Math.random()
            .toString(36)
            .substring(2, 8)
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
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


function todayString() {

    const date = new Date();

    return date.toISOString().split("T")[0];
}


function daysUntil(dateString) {

    if (!dateString) {
        return Infinity;
    }

    const today = new Date();
    const target = new Date(dateString);

    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    return Math.ceil(
        (target - today) /
        (1000 * 60 * 60 * 24)
    );
}


/* =========================================================
   DATOS INICIALES
========================================================= */

const DEFAULT_PATIENTS = [

    {
        id: "pat-001",
        document: "10234567",
        name: "Juan Pérez",
        age: 42,
        service: "Medicina general",
        status: "Activo"
    },

    {
        id: "pat-002",
        document: "52345678",
        name: "María Gómez",
        age: 35,
        service: "Consulta externa",
        status: "Activo"
    },

    {
        id: "pat-003",
        document: "80123456",
        name: "Carlos Rodríguez",
        age: 58,
        service: "Urgencias",
        status: "Activo"
    },

    {
        id: "pat-004",
        document: "107890123",
        name: "Laura Martínez",
        age: 29,
        service: "Odontología",
        status: "Inactivo"
    }

];


const DEFAULT_SERVICES = [

    {
        id: "ser-001",
        code: "SER-001",
        name: "Medicina general",
        category: "Consulta",
        duration: "30 min",
        price: 85000,
        status: "Activo"
    },

    {
        id: "ser-002",
        code: "SER-002",
        name: "Consulta externa",
        category: "Consulta",
        duration: "30 min",
        price: 75000,
        status: "Activo"
    },

    {
        id: "ser-003",
        code: "SER-003",
        name: "Atención de urgencias",
        category: "Urgencias",
        duration: "60 min",
        price: 120000,
        status: "Activo"
    },

    {
        id: "ser-004",
        code: "SER-004",
        name: "Hospitalización",
        category: "Hospitalización",
        duration: "24 horas",
        price: 350000,
        status: "Activo"
    },

    {
        id: "ser-005",
        code: "SER-005",
        name: "Odontología general",
        category: "Odontología",
        duration: "45 min",
        price: 90000,
        status: "Activo"
    },

    {
        id: "ser-006",
        code: "SER-006",
        name: "Laboratorio clínico",
        category: "Diagnóstico",
        duration: "20 min",
        price: 45000,
        status: "Activo"
    }

];


const DEFAULT_INVENTORY = [

    {
        id: "inv-001",
        code: "MED-001",
        name: "Acetaminofén 500 mg",
        category: "Medicamentos",
        unit: "Unidades",
        stock: 250,
        minStock: 50,
        expiry: "2027-06-30",
        price: 850,
        status: "Activo"
    },

    {
        id: "inv-002",
        code: "MED-002",
        name: "Ibuprofeno 400 mg",
        category: "Medicamentos",
        unit: "Unidades",
        stock: 120,
        minStock: 30,
        expiry: "2027-03-15",
        price: 1200,
        status: "Activo"
    },

    {
        id: "inv-003",
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
        id: "inv-004",
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
        id: "inv-005",
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
        id: "inv-006",
        code: "MAT-001",
        name: "Gasas estériles",
        category: "Material quirúrgico",
        unit: "Paquetes",
        stock: 25,
        minStock: 30,
        expiry: "2027-08-10",
        price: 600,
        status: "Activo"
    }

];


const DEFAULT_BUDGET = [

    {
        id: "bud-001",
        concept: "Personal",
        category: "Personal",
        amount: 280000000,
        date: "2026-01-15",
        status: "Ejecutado"
    },

    {
        id: "bud-002",
        concept: "Medicamentos",
        category: "Medicamentos",
        amount: 95000000,
        date: "2026-02-10",
        status: "Ejecutado"
    },

    {
        id: "bud-003",
        concept: "Insumos médicos",
        category: "Insumos",
        amount: 75000000,
        date: "2026-03-05",
        status: "Ejecutado"
    },

    {
        id: "bud-004",
        concept: "Mantenimiento",
        category: "Mantenimiento",
        amount: 45000000,
        date: "2026-04-12",
        status: "Ejecutado"
    },

    {
        id: "bud-005",
        concept: "Tecnología",
        category: "Tecnología",
        amount: 35000000,
        date: "2026-05-20",
        status: "Ejecutado"
    }

];


/* =========================================================
   INICIALIZAR DATOS
========================================================= */

function initializeStorage() {

    if (!localStorage.getItem(STORAGE.patients)) {

        saveData(
            STORAGE.patients,
            DEFAULT_PATIENTS
        );

    }


    if (!localStorage.getItem(STORAGE.services)) {

        saveData(
            STORAGE.services,
            DEFAULT_SERVICES
        );

    }


    if (!localStorage.getItem(STORAGE.inventory)) {

        saveData(
            STORAGE.inventory,
            DEFAULT_INVENTORY
        );

    }


    if (!localStorage.getItem(STORAGE.budget)) {

        saveData(
            STORAGE.budget,
            DEFAULT_BUDGET
        );

    }


    normalizeInventoryData();
}


function normalizeInventoryData() {

    const inventory = getData(
        STORAGE.inventory,
        []
    );


    const normalized = inventory.map(item => {

        return {

            id: item.id || createId("inv"),

            code: item.code || "",

            name: item.name || "",

            category: item.category || "Otros",

            unit: item.unit || "Unidades",

            stock: Number(item.stock) || 0,

            minStock: Number(item.minStock) || 0,

            expiry: item.expiry || "",

            price: Number(
                item.price ??
                item.unitCost ??
                0
            ),

            status: item.status || "Activo"

        };

    });


    saveData(
        STORAGE.inventory,
        normalized
    );
}


/* =========================================================
   NAVEGACIÓN
========================================================= */

function showSection(sectionId) {

    document.querySelectorAll(".section")
        .forEach(section => {

            section.classList.remove("active");

        });


    const section = document.getElementById(
        sectionId
    );


    if (section) {

        section.classList.add("active");

    }


    document.querySelectorAll(".nav-item")
        .forEach(button => {

            button.classList.toggle(
                "active",
                button.dataset.section === sectionId
            );

        });


    const sidebar = document.getElementById("sidebar");

    if (sidebar) {
        sidebar.classList.remove("show");
    }


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
        generateAlerts();
    }
}


function initializeNavigation() {

    document.querySelectorAll(".nav-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showSection(
                        button.dataset.section
                    );

                }
            );

        });


    document.querySelectorAll("[data-go]")
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


    const menuBtn =
        document.getElementById("menuBtn");


    const sidebar =
        document.getElementById("sidebar");


    if (menuBtn && sidebar) {

        menuBtn.addEventListener(
            "click",
            () => {

                sidebar.classList.toggle("show");

            }
        );

    }

}


/* =========================================================
   PACIENTES
========================================================= */

function getPatients() {

    return getData(
        STORAGE.patients,
        []
    );
}


function updatePatientStats() {

    const patients = getPatients();


    const total = patients.length;


    const active = patients.filter(
        patient => patient.status === "Activo"
    ).length;


    const newPatients = patients.filter(
        patient => {

            return String(patient.id)
                .includes("pat-");

        }
    ).length;


    const totalElement =
        document.getElementById("totalPatients");

    const activeElement =
        document.getElementById("activePatients");

    const newElement =
        document.getElementById("newPatients");


    if (totalElement) {
        totalElement.textContent = total;
    }


    if (activeElement) {
        activeElement.textContent = active;
    }


    if (newElement) {
        newElement.textContent = newPatients;
    }
}


function populatePatientServices() {

    const select =
        document.getElementById("service");


    if (!select) {
        return;
    }


    const services = getData(
        STORAGE.services,
        []
    );


    const currentValue =
        select.value;


    select.innerHTML = "";


    services.forEach(service => {

        if (service.status !== "Activo") {
            return;
        }


        const option =
            document.createElement("option");

        option.value = service.name;

        option.textContent = service.name;

        select.appendChild(option);

    });


    if (currentValue) {
        select.value = currentValue;
    }
}


function renderPatients(filter = "") {

    const tbody =
        document.getElementById("patientsTable");


    if (!tbody) {
        return;
    }


    const patients = getPatients();


    const search =
        filter.trim().toLowerCase();


    const filtered =
        patients.filter(patient => {

            const text = [

                patient.document,

                patient.name,

                patient.service,

                patient.status

            ]
                .join(" ")
                .toLowerCase();


            return text.includes(search);

        });


    tbody.innerHTML = "";


    if (!filtered.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-table">
                    No se encontraron pacientes.
                </td>
            </tr>
        `;

        return;
    }


    filtered.forEach(patient => {

        const tr =
            document.createElement("tr");


        tr.innerHTML = `

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

                <span class="status ${
                    patient.status === "Activo"
                        ? "active"
                        : "inactive"
                }">

                    ${escapeHtml(patient.status)}

                </span>

            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn edit-btn"
                        data-edit-patient="${patient.id}"
                    >
                        Editar
                    </button>

                    <button
                        class="action-btn delete-btn"
                        data-delete-patient="${patient.id}"
                    >
                        Eliminar
                    </button>

                </div>

            </td>
        `;


        tbody.appendChild(tr);

    });


    tbody.querySelectorAll(
        "[data-edit-patient]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                editPatient(
                    button.dataset.editPatient
                );

            }
        );

    });


    tbody.querySelectorAll(
        "[data-delete-patient]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                deletePatient(
                    button.dataset.deletePatient
                );

            }
        );

    });
}


function openPatientModal(id = "") {

    const modal =
        document.getElementById("patientModal");

    const form =
        document.getElementById("patientForm");

    const title =
        document.getElementById("modalTitle");


    if (!modal || !form) {
        return;
    }


    form.reset();


    document.getElementById(
        "patientId"
    ).value = "";


    populatePatientServices();


    if (id) {

        const patient =
            getPatients().find(
                item => item.id === id
            );


        if (!patient) {
            return;
        }


        title.textContent =
            "Editar paciente";


        document.getElementById(
            "patientId"
        ).value = patient.id;


        document.getElementById(
            "document"
        ).value = patient.document;


        document.getElementById(
            "name"
        ).value = patient.name;


        document.getElementById(
            "age"
        ).value = patient.age;


        document.getElementById(
            "service"
        ).value = patient.service;


        document.getElementById(
            "status"
        ).value = patient.status;

    } else {

        title.textContent =
            "Nuevo paciente";

    }


    modal.classList.add("show");
}


function closePatientModal() {

    const modal =
        document.getElementById("patientModal");


    if (modal) {
        modal.classList.remove("show");
    }

}


function savePatient(event) {

    event.preventDefault();


    const patients = getPatients();


    const id =
        document.getElementById("patientId").value;


    const patient = {

        id: id || createId("pat"),

        document:
            document.getElementById("document").value.trim(),

        name:
            document.getElementById("name").value.trim(),

        age:
            Number(
                document.getElementById("age").value
            ),

        service:
            document.getElementById("service").value,

        status:
            document.getElementById("status").value

    };


    if (!patient.document || !patient.name) {

        alert(
            "Por favor complete los campos obligatorios."
        );

        return;
    }


    if (id) {

        const index =
            patients.findIndex(
                item => item.id === id
            );


        if (index !== -1) {

            patients[index] = patient;

        }

    } else {

        patients.push(patient);

    }


    saveData(
        STORAGE.patients,
        patients
    );


    closePatientModal();


    renderPatients();


    updatePatientStats();


    updateDashboard();


    updateAnalysis();

}


function editPatient(id) {

    openPatientModal(id);

}


function deletePatient(id) {

    const patient =
        getPatients().find(
            item => item.id === id
        );


    if (!patient) {
        return;
    }


    if (!confirm(
        `¿Desea eliminar al paciente ${patient.name}?`
    )) {

        return;

    }


    const patients =
        getPatients().filter(
            item => item.id !== id
        );


    saveData(
        STORAGE.patients,
        patients
    );


    renderPatients();

    updatePatientStats();

    updateDashboard();

    updateAnalysis();

}


/* =========================================================
   SERVICIOS
========================================================= */

function getServices() {

    return getData(
        STORAGE.services,
        []
    );
}


function updateServiceStats() {

    const services = getServices();


    const active =
        services.filter(
            service => service.status === "Activo"
        );


    const average =
        active.length
            ? active.reduce(
                (sum, service) =>
                    sum + Number(service.price || 0),
                0
            ) / active.length
            : 0;


    document.getElementById(
        "totalServices"
    ).textContent = services.length;


    document.getElementById(
        "activeServices"
    ).textContent = active.length;


    document.getElementById(
        "averageServicePrice"
    ).textContent =
        formatCurrency(average);
}


function renderServices(filter = "") {

    const tbody =
        document.getElementById("servicesTable");


    if (!tbody) {
        return;
    }


    const search =
        filter.trim().toLowerCase();


    const services =
        getServices().filter(service => {

            const text = [

                service.code,

                service.name,

                service.category,

                service.duration,

                service.status

            ]
                .join(" ")
                .toLowerCase();


            return text.includes(search);

        });


    tbody.innerHTML = "";


    if (!services.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="empty-table">
                    No se encontraron servicios.
                </td>
            </tr>
        `;

        return;
    }


    services.forEach(service => {

        const tr =
            document.createElement("tr");


        tr.innerHTML = `

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

                <span class="status ${
                    service.status === "Activo"
                        ? "active"
                        : "inactive"
                }">

                    ${escapeHtml(service.status)}

                </span>

            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn edit-btn"
                        data-edit-service="${service.id}"
                    >
                        Editar
                    </button>

                    <button
                        class="action-btn delete-btn"
                        data-delete-service="${service.id}"
                    >
                        Eliminar
                    </button>

                </div>

            </td>

        `;


        tbody.appendChild(tr);

    });


    tbody.querySelectorAll(
        "[data-edit-service]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                editService(
                    button.dataset.editService
                );

            }
        );

    });


    tbody.querySelectorAll(
        "[data-delete-service]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                deleteService(
                    button.dataset.deleteService
                );

            }
        );

    });

}


function openServiceModal(id = "") {

    const modal =
        document.getElementById("serviceModal");

    const form =
        document.getElementById("serviceForm");

    const title =
        document.getElementById("serviceModalTitle");


    form.reset();

    document.getElementById(
        "serviceId"
    ).value = "";


    if (id) {

        const service =
            getServices().find(
                item => item.id === id
            );


        if (!service) {
            return;
        }


        title.textContent =
            "Editar servicio";


        document.getElementById(
            "serviceId"
        ).value = service.id;


        document.getElementById(
            "serviceCode"
        ).value = service.code;


        document.getElementById(
            "serviceName"
        ).value = service.name;


        document.getElementById(
            "serviceCategory"
        ).value = service.category;


        document.getElementById(
            "serviceDuration"
        ).value = service.duration;


        document.getElementById(
            "servicePrice"
        ).value = service.price;


        document.getElementById(
            "serviceStatus"
        ).value = service.status;

    } else {

        title.textContent =
            "Nuevo servicio";

    }


    modal.classList.add("show");
}


function closeServiceModal() {

    document.getElementById(
        "serviceModal"
    ).classList.remove("show");

}


function saveService(event) {

    event.preventDefault();


    const services = getServices();


    const id =
        document.getElementById(
            "serviceId"
        ).value;


    const service = {

        id: id || createId("ser"),

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
            ) || 0,

        status:
            document.getElementById(
                "serviceStatus"
            ).value

    };


    if (!service.code || !service.name) {

        alert(
            "Complete el código y el nombre del servicio."
        );

        return;
    }


    if (id) {

        const index =
            services.findIndex(
                item => item.id === id
            );


        if (index !== -1) {

            services[index] = service;

        }

    } else {

        services.push(service);

    }


    saveData(
        STORAGE.services,
        services
    );


    closeServiceModal();


    renderServices();

    updateServiceStats();

    populatePatientServices();

    populatePredictionServices();

    updateDashboard();

    updateAnalysis();

}


function editService(id) {

    openServiceModal(id);

}


function deleteService(id) {

    const service =
        getServices().find(
            item => item.id === id
        );


    if (!service) {
        return;
    }


    if (!confirm(
        `¿Desea eliminar el servicio ${service.name}?`
    )) {

        return;

    }


    const services =
        getServices().filter(
            item => item.id !== id
        );


    saveData(
        STORAGE.services,
        services
    );


    renderServices();

    updateServiceStats();

    populatePatientServices();

    populatePredictionServices();

    updateDashboard();

    updateAnalysis();

}


/* =========================================================
   INVENTARIO
========================================================= */

function getInventory() {

    return getData(
        STORAGE.inventory,
        []
    );
}


function updateInventoryStats() {

    const inventory =
        getInventory();


    const lowStock =
        inventory.filter(
            item =>
                Number(item.stock) <=
                Number(item.minStock)
        ).length;


    const expiring =
        inventory.filter(
            item => {

                const days =
                    daysUntil(item.expiry);

                return days >= 0 && days <= 90;

            }
        ).length;


    document.getElementById(
        "totalInventory"
    ).textContent =
        inventory.length;


    document.getElementById(
        "lowStockInventory"
    ).textContent =
        lowStock;


    document.getElementById(
        "expiringInventory"
    ).textContent =
        expiring;

}


function renderInventory(filter = "") {

    const tbody =
        document.getElementById(
            "inventoryTable"
        );


    if (!tbody) {
        return;
    }


    const search =
        filter.trim().toLowerCase();


    const inventory =
        getInventory().filter(item => {

            const text = [

                item.code,

                item.name,

                item.category,

                item.unit,

                item.status

            ]
                .join(" ")
                .toLowerCase();


            return text.includes(search);

        });


    tbody.innerHTML = "";


    if (!inventory.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="10" class="empty-table">
                    No se encontraron productos.
                </td>
            </tr>
        `;

        return;
    }


    inventory.forEach(item => {

        const lowStock =
            Number(item.stock) <=
            Number(item.minStock);


        const days =
            daysUntil(item.expiry);


        const expiring =
            days >= 0 && days <= 90;


        let statusClass =
            item.status === "Activo"
                ? "active"
                : "inactive";


        let statusText =
            item.status;


        if (lowStock) {

            statusClass = "danger";

            statusText = "Stock bajo";

        } else if (expiring) {

            statusClass = "warning";

            statusText = "Por vencer";

        }


        const tr =
            document.createElement("tr");


        tr.innerHTML = `

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
                        ? item.expiry
                        : "No aplica"
                }
            </td>

            <td>
                ${formatCurrency(item.price)}
            </td>

            <td>

                <span class="status ${statusClass}">
                    ${escapeHtml(statusText)}
                </span>

            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn edit-btn"
                        data-edit-inventory="${item.id}"
                    >
                        Editar
                    </button>

                    <button
                        class="action-btn delete-btn"
                        data-delete-inventory="${item.id}"
                    >
                        Eliminar
                    </button>

                </div>

            </td>

        `;


        tbody.appendChild(tr);

    });


    tbody.querySelectorAll(
        "[data-edit-inventory]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                editInventory(
                    button.dataset.editInventory
                );

            }
        );

    });


    tbody.querySelectorAll(
        "[data-delete-inventory]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                deleteInventory(
                    button.dataset.deleteInventory
                );

            }
        );

    });

}


function openInventoryModal(id = "") {

    const modal =
        document.getElementById(
            "inventoryModal"
        );


    const form =
        document.getElementById(
            "inventoryForm"
        );


    form.reset();


    document.getElementById(
        "inventoryId"
    ).value = "";


    document.getElementById(
        "inventoryUnit"
    ).value = "Unidades";


    if (id) {

        const item =
            getInventory().find(
                inventoryItem =>
                    inventoryItem.id === id
            );


        if (!item) {
            return;
        }


        document.getElementById(
            "inventoryModalTitle"
        ).textContent =
            "Editar producto";


        document.getElementById(
            "inventoryId"
        ).value = item.id;


        document.getElementById(
            "inventoryCode"
        ).value = item.code;


        document.getElementById(
            "inventoryName"
        ).value = item.name;


        document.getElementById(
            "inventoryCategory"
        ).value = item.category;


        document.getElementById(
            "inventoryUnit"
        ).value = item.unit;


        document.getElementById(
            "inventoryStock"
        ).value = item.stock;


        document.getElementById(
            "inventoryMinStock"
        ).value = item.minStock;


        document.getElementById(
            "inventoryExpiry"
        ).value = item.expiry;


        document.getElementById(
            "inventoryPrice"
        ).value = item.price;


        document.getElementById(
            "inventoryStatus"
        ).value = item.status;

    } else {

        document.getElementById(
            "inventoryModalTitle"
        ).textContent =
            "Nuevo producto";

    }


    modal.classList.add("show");
}


function closeInventoryModal() {

    document.getElementById(
        "inventoryModal"
    ).classList.remove("show");

}


function saveInventory(event) {

    event.preventDefault();


    const inventory =
        getInventory();


    const id =
        document.getElementById(
            "inventoryId"
        ).value;


    const item = {

        id: id || createId("inv"),

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
            ) || 0,

        minStock:
            Number(
                document.getElementById(
                    "inventoryMinStock"
                ).value
            ) || 0,

        expiry:
            document.getElementById(
                "inventoryExpiry"
            ).value,

        price:
            Number(
                document.getElementById(
                    "inventoryPrice"
                ).value
            ) || 0,

        status:
            document.getElementById(
                "inventoryStatus"
            ).value

    };


    if (!item.code || !item.name) {

        alert(
            "Complete el código y el nombre del producto."
        );

        return;
    }


    if (id) {

        const index =
            inventory.findIndex(
                inventoryItem =>
                    inventoryItem.id === id
            );


        if (index !== -1) {

            inventory[index] = item;

        }

    } else {

        inventory.push(item);

    }


    saveData(
        STORAGE.inventory,
        inventory
    );


    closeInventoryModal();


    renderInventory();

    updateInventoryStats();

    updateDashboard();

    updateAnalysis();

    generateAlerts();

}


function editInventory(id) {

    openInventoryModal(id);

}


function deleteInventory(id) {

    const item =
        getInventory().find(
            inventoryItem =>
                inventoryItem.id === id
        );


    if (!item) {
        return;
    }


    if (!confirm(
        `¿Desea eliminar ${item.name}?`
    )) {

        return;

    }


    const inventory =
        getInventory().filter(
            inventoryItem =>
                inventoryItem.id !== id
        );


    saveData(
        STORAGE.inventory,
        inventory
    );


    renderInventory();

    updateInventoryStats();

    updateDashboard();

    updateAnalysis();

    generateAlerts();

}


/* =========================================================
   PRESUPUESTO
========================================================= */

function getBudget() {

    return getData(
        STORAGE.budget,
        []
    );
}


function updateBudgetSummary() {

    const budget =
        getBudget();


    const executed =
        budget.reduce(
            (sum, item) =>
                sum + Number(item.amount || 0),
            0
        );


    const available =
        Math.max(
            BUDGET_APPROVED_VALUE -
            executed,
            0
        );


    const percentage =
        BUDGET_APPROVED_VALUE > 0
            ? (
                executed /
                BUDGET_APPROVED_VALUE
            ) * 100
            : 0;


    document.getElementById(
        "budgetApproved"
    ).textContent =
        formatCurrency(
            BUDGET_APPROVED_VALUE
        );


    document.getElementById(
        "budgetExecuted"
    ).textContent =
        formatCurrency(executed);


    document.getElementById(
        "budgetAvailable"
    ).textContent =
        formatCurrency(available);


    document.getElementById(
        "budgetPercentage"
    ).textContent =
        `${Math.round(percentage)}%`;
}


function renderBudget(filter = "") {

    const tbody =
        document.getElementById(
            "budgetTable"
        );


    if (!tbody) {
        return;
    }


    const search =
        filter.trim().toLowerCase();


    const budget =
        getBudget().filter(item => {

            const text = [

                item.concept,

                item.category,

                item.status,

                item.date

            ]
                .join(" ")
                .toLowerCase();


            return text.includes(search);

        });


    tbody.innerHTML = "";


    if (!budget.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-table">
                    No se encontraron movimientos.
                </td>
            </tr>
        `;

        return;
    }


    budget.forEach(item => {

        const tr =
            document.createElement("tr");


        tr.innerHTML = `

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
                ${escapeHtml(item.date)}
            </td>

            <td>

                <span class="status active">
                    ${escapeHtml(item.status)}
                </span>

            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn delete-btn"
                        data-delete-budget="${item.id}"
                    >
                        Eliminar
                    </button>

                </div>

            </td>

        `;


        tbody.appendChild(tr);

    });


    tbody.querySelectorAll(
        "[data-delete-budget]"
    ).forEach(button => {

        button.addEventListener(
            "click",
            () => {

                deleteBudget(
                    button.dataset.deleteBudget
                );

            }
        );

    });

}


function openBudgetModal() {

    const modal =
        document.getElementById(
            "budgetModal"
        );


    document.getElementById(
        "budgetForm"
    ).reset();


    document.getElementById(
        "budgetDate"
    ).value =
        todayString();


    modal.classList.add("show");
}


function closeBudgetModal() {

    document.getElementById(
        "budgetModal"
    ).classList.remove("show");
}


function saveBudget(event) {

    event.preventDefault();


    const budget =
        getBudget();


    const movement = {

        id: createId("bud"),

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
            ) || 0,

        date:
            document.getElementById(
                "budgetDate"
            ).value,

        status: "Ejecutado"

    };


    if (!movement.concept ||
        movement.amount <= 0) {

        alert(
            "Ingrese un concepto y un valor válido."
        );

        return;
    }


    budget.push(movement);


    saveData(
        STORAGE.budget,
        budget
    );


    closeBudgetModal();


    renderBudget();

    updateBudgetSummary();

    updateDashboard();

    updateAnalysis();

    generateAlerts();

}


function deleteBudget(id) {

    if (!confirm(
        "¿Desea eliminar este movimiento?"
    )) {

        return;

    }


    const budget =
        getBudget().filter(
            item => item.id !== id
        );


    saveData(
        STORAGE.budget,
        budget
    );


    renderBudget();

    updateBudgetSummary();

    updateDashboard();

    updateAnalysis();

}


/* =========================================================
   ANALISIS
========================================================= */

function updateAnalysis() {

    const patients =
        getPatients();

    const services =
        getServices();

    const inventory =
        getInventory();


    const lowStock =
        inventory.filter(
            item =>
                Number(item.stock) <=
                Number(item.minStock)
        );


    document.getElementById(
        "analysisPatients"
    ).textContent =
        patients.length;


    document.getElementById(
        "analysisServices"
    ).textContent =
        services.length;


    document.getElementById(
        "analysisInventory"
    ).textContent =
        inventory.length;


    document.getElementById(
        "analysisLowStock"
    ).textContent =
        lowStock.length;


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


    if (!container) {
        return;
    }


    const counts = {};


    patients.forEach(patient => {

        const service =
            patient.service || "Sin servicio";


        counts[service] =
            (counts[service] || 0) + 1;

    });


    const entries =
        Object.entries(counts)
            .sort(
                (a, b) => b[1] - a[1]
            );


    if (!entries.length) {

        container.innerHTML =
            `<p class="empty-message">
                No hay pacientes registrados.
            </p>`;

        return;
    }


    const max =
        Math.max(
            ...entries.map(item => item[1])
        );


    container.innerHTML =
        entries.map(
            ([name, value]) => `

                <div class="demand-row">

                    <span class="demand-name">
                        ${escapeHtml(name)}
                    </span>

                    <div class="demand-track">

                        <div
                            class="demand-fill"
                            style="width:${(value / max) * 100}%"
                        ></div>

                    </div>

                    <span class="demand-value">
                        ${value}
                    </span>

                </div>

            `
        ).join("");
}


function renderInventoryAnalysis(inventory) {

    const container =
        document.getElementById(
            "inventoryAnalysisChart"
        );


    if (!container) {
        return;
    }


    const total =
        inventory.length;


    const low =
        inventory.filter(
            item =>
                Number(item.stock) <=
                Number(item.minStock)
        ).length;


    const available =
        total - low;


    if (!total) {

        container.innerHTML =
            `<p class="empty-message">
                No hay productos registrados.
            </p>`;

        return;
    }


    const percentage =
        Math.round(
            (available / total) * 100
        );


    container.innerHTML = `

        <div class="inventory-summary">

            <div class="inventory-summary-card">

                <strong>
                    ${total}
                </strong>

                <span>
                    Total productos
                </span>

            </div>


            <div class="inventory-summary-card">

                <strong>
                    ${available}
                </strong>

                <span>
                    Disponibles
                </span>

            </div>


            <div class="inventory-summary-card">

                <strong>
                    ${percentage}%
                </strong>

                <span>
                    Disponibilidad
                </span>

            </div>

        </div>

    `;
}


function renderFinancialAnalysis() {

    const container =
        document.getElementById(
            "financialAnalysis"
        );


    if (!container) {
        return;
    }


    const budget =
        getBudget();


    const totals = {};


    budget.forEach(item => {

        totals[item.category] =
            (totals[item.category] || 0) +
            Number(item.amount || 0);

    });


    const rows =
        Object.entries(totals);


    container.innerHTML = `

        <div class="panel-header">

            <div>

                <h3>
                    Distribución presupuestal
                </h3>

                <p>
                    Ejecución por categoría
                </p>

            </div>

        </div>


        <div class="summary-list">

            ${
                rows.length
                    ? rows.map(
                        ([category, amount]) => `

                            <div class="summary-row">

                                <span>
                                    ${escapeHtml(category)}
                                </span>

                                <strong>
                                    ${formatCurrency(amount)}
                                </strong>

                            </div>

                        `
                    ).join("")
                    : `
                        <p class="empty-message">
                            No hay movimientos presupuestales.
                        </p>
                    `
            }

        </div>
    `;
}


/* =========================================================
   PREDICCIONES
========================================================= */

function populatePredictionServices() {

    const select =
        document.getElementById(
            "predictionService"
        );


    if (!select) {
        return;
    }


    const services =
        getServices().filter(
            service =>
                service.status === "Activo"
        );


    const current =
        select.value;


    select.innerHTML = `

        <option value="">
            Seleccione un servicio
        </option>

    `;


    services.forEach(service => {

        const option =
            document.createElement("option");


        option.value =
            service.name;


        option.textContent =
            service.name;


        select.appendChild(option);

    });


    if (current) {
        select.value = current;
    }
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
            "Seleccione un servicio."
        );

        return;
    }


    const patients =
        getPatients();


    const historicalAverage =
        patients.filter(
            patient =>
                patient.service === serviceName
        ).length;


    const base =
        historicalAverage || 1;


    const growth =
        period === 1
            ? 0.08
            : period === 3
                ? 0.12
                : 0.18;


    const estimated =
        Math.round(
            base * (1 + growth)
        );


    document.getElementById(
        "historicalAverage"
    ).textContent =
        historicalAverage;


    document.getElementById(
        "estimatedDemand"
    ).textContent =
        estimated;


    document.getElementById(
        "predictionVariation"
    ).textContent =
        `${Math.round(growth * 100)}%`;


    document.getElementById(
        "predictionWarning"
    ).textContent =
        "Estimación";


    document.getElementById(
        "predictionResult"
    ).innerHTML = `

        <h3>
            Resultado de la predicción
        </h3>

        <div class="prediction-highlight">

            <strong>
                ${formatNumber(estimated)}
            </strong>

            <span>
                demanda estimada para
                ${escapeHtml(serviceName)}
                en el periodo seleccionado.
            </span>

        </div>

        <p style="margin-top:15px;">
            Esta es una estimación inicial basada en los
            registros actuales de SALUDPREDICT. A medida
            que se incorporen más datos históricos, el
            sistema podrá mejorar sus proyecciones.
        </p>

    `;
}


/* =========================================================
   ALERTAS
========================================================= */

function generateAlerts() {

    const inventory =
        getInventory();


    const budget =
        getBudget();


    const alerts = [];


    inventory.forEach(item => {

        if (
            Number(item.stock) <=
            Number(item.minStock)
        ) {

            alerts.push({

                level: "critical",

                icon: "🚨",

                title: "Stock bajo",

                message:
                    `${item.name} tiene ${item.stock} unidades, ` +
                    `por debajo o igual al mínimo de ${item.minStock}.`

            });

        }


        const days =
            daysUntil(item.expiry);


        if (
            days >= 0 &&
            days <= 90
        ) {

            alerts.push({

                level: "warning",

                icon: "⚠️",

                title: "Próximo vencimiento",

                message:
                    `${item.name} vence en ${days} días.`

            });

        }

    });


    const executed =
        budget.reduce(
            (sum, item) =>
                sum + Number(item.amount || 0),
            0
        );


    const percentage =
        (
            executed /
            BUDGET_APPROVED_VALUE
        ) * 100;


    if (percentage >= 80) {

        alerts.push({

            level: "critical",

            icon: "💰",

            title: "Ejecución presupuestal elevada",

            message:
                `La ejecución presupuestal alcanza ` +
                `${Math.round(percentage)}%.`

        });

    }


    renderAlerts(alerts);

    updateDashboardAlerts(alerts);
}


function renderAlerts(alerts) {

    const container =
        document.getElementById(
            "alertsContainer"
        );


    if (!container) {
        return;
    }


    const total =
        document.getElementById(
            "totalAlerts"
        );


    const attention =
        document.getElementById(
            "attentionAlerts"
        );


    const critical =
        document.getElementById(
            "criticalAlerts"
        );


    const normal =
        document.getElementById(
            "normalAlerts"
        );


    if (total) {
        total.textContent =
            alerts.length;
    }


    if (attention) {
        attention.textContent =
            alerts.filter(
                item =>
                    item.level === "warning" ||
                    item.level === "critical"
            ).length;
    }


    if (critical) {
        critical.textContent =
            alerts.filter(
                item =>
                    item.level === "critical"
            ).length;
    }


    if (normal) {
        normal.textContent =
            alerts.filter(
                item =>
                    item.level === "normal"
            ).length;
    }


    if (!alerts.length) {

        container.innerHTML = `

            <div class="panel">

                <h3>
                    ✓ Sistema estable
                </h3>

                <p>
                    No se han identificado situaciones
                    que requieran atención.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML =
        alerts.map(
            alert => `

                <div class="system-alert ${alert.level}">

                    <div class="system-alert-header">

                        <h3>
                            ${alert.icon}
                            ${escapeHtml(alert.title)}
                        </h3>

                        <span class="status ${
                            alert.level === "critical"
                                ? "danger"
                                : "warning"
                        }">

                            ${
                                alert.level === "critical"
                                    ? "Crítica"
                                    : "Atención"
                            }

                        </span>

                    </div>

                    <p>
                        ${escapeHtml(alert.message)}
                    </p>

                </div>

            `
        ).join("");
}


/* =========================================================
   DASHBOARD
========================================================= */

function updateDashboard() {

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
            service =>
                service.status === "Activo"
        ).length;


    const availableInventory =
        inventory.filter(
            item =>
                Number(item.stock) >
                Number(item.minStock)
        ).length;


    const inventoryPercentage =
        inventory.length
            ? Math.round(
                (
                    availableInventory /
                    inventory.length
                ) * 100
            )
            : 0;


    const executed =
        budget.reduce(
            (sum, item) =>
                sum + Number(item.amount || 0),
            0
        );


    const budgetPercentage =
        BUDGET_APPROVED_VALUE
            ? Math.min(
                Math.round(
                    (
                        executed /
                        BUDGET_APPROVED_VALUE
                    ) * 100
                ),
                100
            )
            : 0;


    document.getElementById(
        "dashboardPatients"
    ).textContent =
        patients.length;


    document.getElementById(
        "dashboardServices"
    ).textContent =
        activeServices;


    document.getElementById(
        "dashboardInventory"
    ).textContent =
        `${inventoryPercentage}%`;


    document.getElementById(
        "dashboardBudget"
    ).textContent =
        `${budgetPercentage}%`;


    document.getElementById(
        "dashboardBudgetPercentage"
    ).textContent =
        `${budgetPercentage}%`;


    document.getElementById(
        "dashboardBudgetBar"
    ).style.width =
        `${budgetPercentage}%`;


    document.getElementById(
        "dashboardBudgetExecuted"
    ).textContent =
        formatCurrency(executed);


    document.getElementById(
        "dashboardBudgetTotal"
    ).textContent =
        formatCurrency(
            BUDGET_APPROVED_VALUE
        );


    updateDashboardSummary(
        patients,
        services,
        inventory,
        budget
    );


    updateDashboardServiceDemand(
        patients,
        services
    );


    updateDashboardInventory(
        inventory
    );


    generateAlerts();
}


function updateDashboardSummary(
    patients,
    services,
    inventory,
    budget
) {

    const container =
        document.getElementById(
            "dashboardSystemSummary"
        );


    if (!container) {
        return;
    }


    const activePatients =
        patients.filter(
            patient =>
                patient.status === "Activo"
        ).length;


    const activeServices =
        services.filter(
            service =>
                service.status === "Activo"
        ).length;


    const lowStock =
        inventory.filter(
            item =>
                Number(item.stock) <=
                Number(item.minStock)
        ).length;


    const executed =
        budget.reduce(
            (sum, item) =>
                sum + Number(item.amount || 0),
            0
        );


    container.innerHTML = `

        <div class="summary-row">

            <span>
                Pacientes activos
            </span>

            <strong>
                ${activePatients}
            </strong>

        </div>


        <div class="summary-row">

            <span>
                Servicios activos
            </span>

            <strong>
                ${activeServices}
            </strong>

        </div>


        <div class="summary-row">

            <span>
                Productos con stock bajo
            </span>

            <strong>
                ${lowStock}
            </strong>

        </div>


        <div class="summary-row">

            <span>
                Ejecución acumulada
            </span>

            <strong>
                ${formatCurrency(executed)}
            </strong>

        </div>

    `;
}


function updateDashboardServiceDemand(
    patients,
    services
) {

    const container =
        document.getElementById(
            "dashboardServiceDemand"
        );


    if (!container) {
        return;
    }


    const counts = {};


    patients.forEach(patient => {

        const service =
            patient.service ||
            "Sin servicio";


        counts[service] =
            (counts[service] || 0) + 1;

    });


    const entries =
        Object.entries(counts)
            .sort(
                (a, b) => b[1] - a[1]
            );


    if (!entries.length) {

        container.innerHTML = `

            <p class="empty-message">
                Registra pacientes para visualizar
                la demanda de servicios.
            </p>

        `;

        return;
    }


    const max =
        Math.max(
            ...entries.map(
                item => item[1]
            )
        );


    container.innerHTML =
        entries.map(
            ([name, value]) => `

                <div class="demand-row">

                    <span class="demand-name">
                        ${escapeHtml(name)}
                    </span>

                    <div class="demand-track">

                        <div
                            class="demand-fill"
                            style="width:${
                                max
                                    ? (value / max) * 100
                                    : 0
                            }%"
                        ></div>

                    </div>

                    <span class="demand-value">
                        ${value}
                    </span>

                </div>

            `
        ).join("");
}


function updateDashboardInventory(
    inventory
) {

    const container =
        document.getElementById(
            "dashboardInventorySummary"
        );


    if (!container) {
        return;
    }


    const total =
        inventory.length;


    const low =
        inventory.filter(
            item =>
                Number(item.stock) <=
                Number(item.minStock)
        ).length;


    const expiring =
        inventory.filter(
            item => {

                const days =
                    daysUntil(item.expiry);

                return days >= 0 && days <= 90;

            }
        ).length;


    const available =
        total - low;


    container.innerHTML = `

        <div class="inventory-summary-card">

            <strong>
                ${total}
            </strong>

            <span>
                Total productos
            </span>

        </div>


        <div class="inventory-summary-card">

            <strong>
                ${available}
            </strong>

            <span>
                Disponibles
            </span>

        </div>


        <div class="inventory-summary-card">

            <strong>
                ${low}
            </strong>

            <span>
                Stock bajo
            </span>

        </div>


        <div class="inventory-summary-card">

            <strong>
                ${expiring}
            </strong>

            <span>
                Próximos a vencer
            </span>

        </div>

    `;
}


function updateDashboardAlerts(
    alerts
) {

    const container =
        document.getElementById(
            "dashboardAlerts"
        );


    const count =
        document.getElementById(
            "dashboardAlertCount"
        );


    if (!container) {
        return;
    }


    if (count) {
        count.textContent =
            alerts.length;
    }


    if (!alerts.length) {

        container.innerHTML = `

            <p class="empty-message">
                ✓ No existen alertas actualmente.
            </p>

        `;

        return;
    }


    const visible =
        alerts.slice(0, 4);


    container.innerHTML =
        visible.map(
            alert => `

                <div class="alert-item ${
                    alert.level
                }">

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


/* =========================================================
   REPORTES
========================================================= */

function openReport(type) {

    let content = "";


    if (type === "demand") {

        content =
            generateDemandReport();

    }


    if (type === "inventory") {

        content =
            generateInventoryReport();

    }


    if (type === "budget") {

        content =
            generateBudgetReport();

    }


    if (type === "general") {

        content =
            generateGeneralReport();

    }


    const reportWindow =
        window.open(
            "",
            "_blank"
        );


    if (!reportWindow) {

        alert(
            "El navegador bloqueó la ventana del reporte. Permite ventanas emergentes."
        );

        return;
    }


    reportWindow.document.write(`

        <!DOCTYPE html>

        <html lang="es">

        <head>

            <meta charset="UTF-8">

            <title>Reporte SALUDPREDICT</title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    color: #17212b;
                    line-height: 1.6;
                }

                h1 {
                    color: #0b1724;
                }

                h2 {
                    margin-top: 30px;
                    color: #183246;
                }

                .header {
                    border-bottom: 3px solid #20c6d7;
                    padding-bottom: 15px;
                    margin-bottom: 25px;
                }

                .box {
                    background: #f4f7f8;
                    padding: 15px;
                    margin: 10px 0;
                    border-radius: 8px;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 15px;
                }

                th, td {
                    border: 1px solid #dce3e8;
                    padding: 9px;
                    text-align: left;
                }

                th {
                    background: #eef2f5;
                }

                .print {
                    padding: 10px 16px;
                    background: #20c6d7;
                    border: 0;
                    border-radius: 7px;
                    cursor: pointer;
                    font-weight: bold;
                }

                @media print {
                    .print {
                        display: none;
                    }
                }

            </style>

        </head>

        <body>

            <button
                class="print"
                onclick="window.print()"
            >
                🖨️ Imprimir / Guardar PDF
            </button>

            <div class="header">

                <h1>
                    SALUDPREDICT
                </h1>

                <p>
                    Gestión inteligente en salud
                </p>

            </div>

            ${content}

        </body>

        </html>

    `);


    reportWindow.document.close();
}


function generateDemandReport() {

    const patients =
        getPatients();


    const services =
        getServices();


    return `

        <h2>
            Reporte de demanda
        </h2>

        <div class="box">
            Total de pacientes:
            <strong>${patients.length}</strong>
        </div>

        <div class="box">
            Servicios registrados:
            <strong>${services.length}</strong>
        </div>

        <h2>
            Pacientes por servicio
        </h2>

        ${generatePatientServiceTable()}

    `;
}


function generatePatientServiceTable() {

    const patients =
        getPatients();


    const counts = {};


    patients.forEach(patient => {

        const service =
            patient.service ||
            "Sin servicio";


        counts[service] =
            (counts[service] || 0) + 1;

    });


    return `

        <table>

            <thead>

                <tr>
                    <th>Servicio</th>
                    <th>Pacientes</th>
                </tr>

            </thead>

            <tbody>

                ${
                    Object.entries(counts)
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


function generateInventoryReport() {

    const inventory =
        getInventory();


    const low =
        inventory.filter(
            item =>
                Number(item.stock) <=
                Number(item.minStock)
        );


    const expiring =
        inventory.filter(
            item => {

                const days =
                    daysUntil(item.expiry);

                return days >= 0 && days <= 90;

            }
        );


    return `

        <h2>
            Reporte de inventario
        </h2>

        <div class="box">
            Total productos:
            <strong>${inventory.length}</strong>
        </div>

        <div class="box">
            Productos con stock bajo:
            <strong>${low.length}</strong>
        </div>

        <div class="box">
            Productos próximos a vencer:
            <strong>${expiring.length}</strong>
        </div>

        <h2>
            Detalle
        </h2>

        <table>

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

                ${
                    inventory.map(
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
                                    ${item.expiry || "No aplica"}
                                </td>

                            </tr>

                        `
                    ).join("")
                }

            </tbody>

        </table>

    `;
}


function generateBudgetReport() {

    const budget =
        getBudget();


    const executed =
        budget.reduce(
            (sum, item) =>
                sum + Number(item.amount || 0),
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


    return `

        <h2>
            Reporte presupuestal
        </h2>

        <div class="box">
            Presupuesto aprobado:
            <strong>
                ${formatCurrency(
                    BUDGET_APPROVED_VALUE
                )}
            </strong>
        </div>

        <div class="box">
            Ejecutado:
            <strong>
                ${formatCurrency(executed)}
            </strong>
        </div>

        <div class="box">
            Disponible:
            <strong>
                ${formatCurrency(available)}
            </strong>
        </div>

        <div class="box">
            Ejecución:
            <strong>
                ${Math.round(percentage)}%
            </strong>
        </div>

        <h2>
            Movimientos
        </h2>

        <table>

            <thead>

                <tr>

                    <th>Concepto</th>
                    <th>Categoría</th>
                    <th>Valor</th>
                    <th>Fecha</th>

                </tr>

            </thead>

            <tbody>

                ${
                    budget.map(
                        item => `

                            <tr>

                                <td>
                                    ${escapeHtml(item.concept)}
                                </td>

                                <td>
                                    ${escapeHtml(item.category)}
                                </td>

                                <td>
                                    ${formatCurrency(item.amount)}
                                </td>

                                <td>
                                    ${escapeHtml(item.date)}
                                </td>

                            </tr>

                        `
                    ).join("")
                }

            </tbody>

        </table>

    `;
}


function generateGeneralReport() {

    const patients =
        getPatients();


    const services =
        getServices();


    const inventory =
        getInventory();


    const budget =
        getBudget();


    return `

        <h2>
            Reporte general institucional
        </h2>

        <div class="box">
            Pacientes registrados:
            <strong>${patients.length}</strong>
        </div>

        <div class="box">
            Servicios registrados:
            <strong>${services.length}</strong>
        </div>

        <div class="box">
            Productos de inventario:
            <strong>${inventory.length}</strong>
        </div>

        <div class="box">
            Movimientos presupuestales:
            <strong>${budget.length}</strong>
        </div>

        ${generateDemandReport()}

        ${generateInventoryReport()}

        ${generateBudgetReport()}

    `;
}


/* =========================================================
   EVENTOS
========================================================= */

function initializeEvents() {

    /* Pacientes */

    document.getElementById(
        "newPatientBtn"
    ).addEventListener(
        "click",
        () => openPatientModal()
    );


    document.getElementById(
        "closeModal"
    ).addEventListener(
        "click",
        closePatientModal
    );


    document.getElementById(
        "cancelModal"
    ).addEventListener(
        "click",
        closePatientModal
    );


    document.getElementById(
        "patientForm"
    ).addEventListener(
        "submit",
        savePatient
    );


    document.getElementById(
        "patientSearch"
    ).addEventListener(
        "input",
        event =>
            renderPatients(
                event.target.value
            )
    );


    /* Servicios */

    document.getElementById(
        "newServiceBtn"
    ).addEventListener(
        "click",
        () => openServiceModal()
    );


    document.getElementById(
        "closeServiceModal"
    ).addEventListener(
        "click",
        closeServiceModal
    );


    document.getElementById(
        "cancelServiceBtn"
    ).addEventListener(
        "click",
        closeServiceModal
    );


    document.getElementById(
        "serviceForm"
    ).addEventListener(
        "submit",
        saveService
    );


    document.getElementById(
        "serviceSearch"
    ).addEventListener(
        "input",
        event =>
            renderServices(
                event.target.value
            )
    );


    /* Inventario */

    document.getElementById(
        "newInventoryBtn"
    ).addEventListener(
        "click",
        () => openInventoryModal()
    );


    document.getElementById(
        "closeInventoryModal"
    ).addEventListener(
        "click",
        closeInventoryModal
    );


    document.getElementById(
        "cancelInventoryModal"
    ).addEventListener(
        "click",
        closeInventoryModal
    );


    document.getElementById(
        "inventoryForm"
    ).addEventListener(
        "submit",
        saveInventory
    );


    document.getElementById(
        "inventorySearch"
    ).addEventListener(
        "input",
        event =>
            renderInventory(
                event.target.value
            )
    );


    /* Presupuesto */

    document.getElementById(
        "newBudgetBtn"
    ).addEventListener(
        "click",
        openBudgetModal
    );


    document.getElementById(
        "closeBudgetModal"
    ).addEventListener(
        "click",
        closeBudgetModal
    );


    document.getElementById(
        "cancelBudgetBtn"
    ).addEventListener(
        "click",
        closeBudgetModal
    );


    document.getElementById(
        "budgetForm"
    ).addEventListener(
        "submit",
        saveBudget
    );


    document.getElementById(
        "budgetSearch"
    ).addEventListener(
        "input",
        event =>
            renderBudget(
                event.target.value
            )
    );


    /* Predicciones */

    document.getElementById(
        "generatePredictionBtn"
    ).addEventListener(
        "click",
        generatePrediction
    );


    /* Alertas */

    document.getElementById(
        "refreshAlertsBtn"
    ).addEventListener(
        "click",
        generateAlerts
    );


    /* Reportes */

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


    /* Cerrar modales al hacer clic fuera */

    document.querySelectorAll(".modal")
        .forEach(modal => {

            modal.addEventListener(
                "click",
                event => {

                    if (
                        event.target === modal
                    ) {

                        modal.classList.remove(
                            "show"
                        );

                    }

                }
            );

        });

}


/* =========================================================
   INICIALIZACIÓN
========================================================= */

function initializeApplication() {

    initializeStorage();

    initializeNavigation();

    initializeEvents();


    /* Pacientes */

    populatePatientServices();

    renderPatients();

    updatePatientStats();


    /* Servicios */

    renderServices();

    updateServiceStats();


    /* Inventario */

    renderInventory();

    updateInventoryStats();


    /* Presupuesto */

    renderBudget();

    updateBudgetSummary();


    /* Predicciones */

    populatePredictionServices();


    /* Dashboard */

    updateDashboard();


    /* Análisis */

    updateAnalysis();


    /* Alertas */

    generateAlerts();


    /* Vista inicial */

    showSection("dashboard");

}


document.addEventListener(
    "DOMContentLoaded",
    initializeApplication
);
