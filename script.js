/* =========================================================
   SALUDPREDICT
   SCRIPT PRINCIPAL
   Dashboard + Pacientes + Servicios + Inventario
========================================================= */


/* =========================================================
   CONFIGURACIÓN GENERAL
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    iniciarNavegacion();
    iniciarPacientes();
    iniciarServicios();
    iniciarInventario();

    actualizarDashboard();

});


/* =========================================================
   FUNCIONES GENERALES
========================================================= */

function obtenerDatos(key, datosPorDefecto) {

    try {

        const datos = localStorage.getItem(key);

        if (datos) {
            return JSON.parse(datos);
        }

    } catch (error) {

        console.error(
            `Error leyendo ${key}:`,
            error
        );

    }

    localStorage.setItem(
        key,
        JSON.stringify(datosPorDefecto)
    );

    return datosPorDefecto;
}


function guardarDatos(key, datos) {

    localStorage.setItem(
        key,
        JSON.stringify(datos)
    );
}


function generarId(prefijo) {

    return (
        prefijo +
        "-" +
        Date.now() +
        "-" +
        Math.floor(Math.random() * 1000)
    );
}


function escaparHTML(valor) {

    if (valor === null || valor === undefined) {
        return "";
    }

    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   NAVEGACIÓN
========================================================= */

function iniciarNavegacion() {

    const navItems =
        document.querySelectorAll(".nav-item");

    const sections =
        document.querySelectorAll(".section");

    const menuBtn =
        document.getElementById("menuBtn");

    const sidebar =
        document.getElementById("sidebar");


    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const sectionId =
                item.dataset.section;

            if (!sectionId) {
                return;
            }


            navItems.forEach(nav => {

                nav.classList.remove("active");

            });


            item.classList.add("active");


            sections.forEach(section => {

                section.classList.remove(
                    "active-section"
                );

            });


            const section =
                document.getElementById(sectionId);

            if (section) {

                section.classList.add(
                    "active-section"
                );

            }


            if (sidebar) {

                sidebar.classList.remove("show");

            }

        });

    });


    if (menuBtn && sidebar) {

        menuBtn.addEventListener("click", () => {

            sidebar.classList.toggle("show");

        });

    }

}


/* =========================================================
   DASHBOARD
========================================================= */

function actualizarDashboard() {

    const pacientes =
        obtenerDatos(
            "saludpredict_patients",
            []
        );

    const servicios =
        obtenerDatos(
            "saludpredict_services",
            []
        );

    const inventario =
        obtenerDatos(
            "saludpredict_inventory",
            []
        );


    const dashboardPatients =
        document.getElementById(
            "dashboardPatients"
        );

    if (dashboardPatients) {

        dashboardPatients.textContent =
            pacientes.length.toLocaleString(
                "es-CO"
            );

    }


    const inventarioActivo =
        inventario.filter(
            item => item.status === "Activo"
        );


    const totalStock =
        inventarioActivo.reduce(
            (total, item) =>
                total + Number(item.stock || 0),
            0
        );


    const stockBajo =
        inventarioActivo.filter(
            item =>
                Number(item.stock || 0) <=
                Number(item.minStock || 0)
        ).length;


    let porcentajeInventario = 100;


    if (inventarioActivo.length > 0) {

        porcentajeInventario =
            Math.round(
                (
                    (inventarioActivo.length -
                        stockBajo) /
                    inventarioActivo.length
                ) * 100
            );

    }


    const inventoryDashboard =
        document.querySelector(
            ".stat-card:nth-child(3) strong"
        );


    if (inventoryDashboard) {

        inventoryDashboard.textContent =
            `${porcentajeInventario}%`;

    }


    /* Evitar advertencias si todavía no
       utilizamos servicios */

    void servicios;
    void totalStock;

}


/* =========================================================
   PACIENTES
========================================================= */

const defaultPatients = [

    {
        id: "pac-001",
        document: "10234567",
        name: "Juan Pérez",
        age: 42,
        service: "Medicina general",
        status: "Activo"
    },

    {
        id: "pac-002",
        document: "52345678",
        name: "María Gómez",
        age: 35,
        service: "Consulta externa",
        status: "Activo"
    },

    {
        id: "pac-003",
        document: "80123456",
        name: "Carlos Rodríguez",
        age: 58,
        service: "Urgencias",
        status: "Activo"
    },

    {
        id: "pac-004",
        document: "107890123",
        name: "Laura Martínez",
        age: 29,
        service: "Odontología",
        status: "Inactivo"
    }

];


let patients =
    obtenerDatos(
        "saludpredict_patients",
        defaultPatients
    );


function iniciarPacientes() {

    renderPatients();
    updatePatientStatistics();


    const search =
        document.getElementById(
            "patientSearch"
        );

    if (search) {

        search.addEventListener(
            "input",
            () => {

                renderPatients(
                    search.value
                );

            }
        );

    }


    const newButton =
        document.getElementById(
            "newPatientBtn"
        );

    if (newButton) {

        newButton.addEventListener(
            "click",
            openNewPatientModal
        );

    }


    const patientForm =
        document.getElementById(
            "patientForm"
        );

    if (patientForm) {

        patientForm.addEventListener(
            "submit",
            savePatient
        );

    }


    const closeButton =
        document.getElementById(
            "closeModal"
        );

    const cancelButton =
        document.getElementById(
            "cancelModal"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closePatientModal
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            closePatientModal
        );

    }


    const modal =
        document.getElementById(
            "patientModal"
        );


    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closePatientModal();

                }

            }
        );

    }

}


/* =========================================================
   RENDER PACIENTES
========================================================= */

function renderPatients(searchTerm = "") {

    const table =
        document.getElementById(
            "patientsTable"
        );

    if (!table) {
        return;
    }


    const term =
        searchTerm
            .toLowerCase()
            .trim();


    const filtered =
        patients.filter(patient => {

            return (

                String(
                    patient.document
                )
                    .toLowerCase()
                    .includes(term)

                ||

                patient.name
                    .toLowerCase()
                    .includes(term)

                ||

                patient.service
                    .toLowerCase()
                    .includes(term)

            );

        });


    if (filtered.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="6"
                    style="text-align:center;padding:30px;">
                    No se encontraron pacientes.
                </td>
            </tr>
        `;

        return;

    }


    table.innerHTML =
        filtered.map(patient => `

            <tr>

                <td>
                    ${escaparHTML(
                        patient.document
                    )}
                </td>

                <td>
                    ${escaparHTML(
                        patient.name
                    )}
                </td>

                <td>
                    ${escaparHTML(
                        patient.age
                    )}
                </td>

                <td>
                    ${escaparHTML(
                        patient.service
                    )}
                </td>

                <td>
                    <span class="status ${
                        patient.status === "Activo"
                            ? "active"
                            : "inactive"
                    }">
                        ${escaparHTML(
                            patient.status
                        )}
                    </span>
                </td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="action-btn edit-btn"
                            onclick="editPatient('${patient.id}')">
                            Editar
                        </button>

                        <button
                            class="action-btn delete-btn"
                            onclick="deletePatient('${patient.id}')">
                            Eliminar
                        </button>

                    </div>

                </td>

            </tr>

        `).join("");

}


/* =========================================================
   ESTADÍSTICAS PACIENTES
========================================================= */

function updatePatientStatistics() {

    const total =
        document.getElementById(
            "totalPatients"
        );

    const active =
        document.getElementById(
            "activePatients"
        );

    const newPatients =
        document.getElementById(
            "newPatients"
        );


    const activeCount =
        patients.filter(
            patient =>
                patient.status === "Activo"
        ).length;


    if (total) {

        total.textContent =
            patients.length;

    }


    if (active) {

        active.textContent =
            activeCount;

    }


    if (newPatients) {

        newPatients.textContent =
            patients.length;

    }


    const dashboardPatients =
        document.getElementById(
            "dashboardPatients"
        );


    if (dashboardPatients) {

        dashboardPatients.textContent =
            patients.length.toLocaleString(
                "es-CO"
            );

    }

}


/* =========================================================
   OPCIONES DE SERVICIOS PARA PACIENTES
========================================================= */

function updatePatientServiceOptions(
    currentService = ""
) {

    const select =
        document.getElementById(
            "service"
        );

    if (!select) {
        return;
    }


    const activeServices =
        services.filter(
            service =>
                service.status === "Activo"
        );


    select.innerHTML = `
        <option value="">
            Seleccione un servicio
        </option>
    `;


    activeServices.forEach(service => {

        const option =
            document.createElement("option");

        option.value =
            service.name;

        option.textContent =
            service.name;

        select.appendChild(option);

    });


    if (
        currentService &&
        !activeServices.some(
            service =>
                service.name === currentService
        )
    ) {

        const option =
            document.createElement("option");

        option.value =
            currentService;

        option.textContent =
            `${currentService} (actual)`;

        select.appendChild(option);

    }


    if (currentService) {

        select.value =
            currentService;

    }

}


/* =========================================================
   MODAL NUEVO PACIENTE
========================================================= */

function openNewPatientModal() {

    const modal =
        document.getElementById(
            "patientModal"
        );

    const form =
        document.getElementById(
            "patientForm"
        );

    const title =
        document.getElementById(
            "modalTitle"
        );


    if (!modal || !form) {
        return;
    }


    form.reset();


    const id =
        document.getElementById(
            "patientId"
        );

    if (id) {
        id.value = "";
    }


    if (title) {

        title.textContent =
            "Nuevo paciente";

    }


    updatePatientServiceOptions();


    modal.classList.add("show");

}


/* =========================================================
   EDITAR PACIENTE
========================================================= */

function editPatient(id) {

    const patient =
        patients.find(
            item => item.id === id
        );


    if (!patient) {
        return;
    }


    const modal =
        document.getElementById(
            "patientModal"
        );

    const title =
        document.getElementById(
            "modalTitle"
        );


    if (!modal) {
        return;
    }


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
        "status"
    ).value = patient.status;


    updatePatientServiceOptions(
        patient.service
    );


    if (title) {

        title.textContent =
            "Editar paciente";

    }


    modal.classList.add("show");

}


/* =========================================================
   GUARDAR PACIENTE
========================================================= */

function savePatient(event) {

    event.preventDefault();


    const id =
        document.getElementById(
            "patientId"
        ).value.trim();


    const documentNumber =
        document.getElementById(
            "document"
        ).value.trim();


    const name =
        document.getElementById(
            "name"
        ).value.trim();


    const age =
        document.getElementById(
            "age"
        ).value;


    const service =
        document.getElementById(
            "service"
        ).value;


    const status =
        document.getElementById(
            "status"
        ).value;


    if (
        !documentNumber ||
        !name ||
        !age ||
        !service ||
        !status
    ) {

        alert(
            "Por favor complete todos los campos."
        );

        return;

    }


    const duplicate =
        patients.find(
            patient =>
                patient.document ===
                    documentNumber &&
                patient.id !== id
        );


    if (duplicate) {

        alert(
            "Ya existe un paciente con ese documento."
        );

        return;

    }


    const patientData = {

        id:
            id ||
            generarId("pac"),

        document:
            documentNumber,

        name:
            name,

        age:
            Number(age),

        service:
            service,

        status:
            status

    };


    if (id) {

        const index =
            patients.findIndex(
                patient =>
                    patient.id === id
            );


        if (index !== -1) {

            patients[index] =
                patientData;

        }

    } else {

        patients.push(
            patientData
        );

    }


    guardarDatos(
        "saludpredict_patients",
        patients
    );


    renderPatients();

    updatePatientStatistics();

    actualizarDashboard();

    closePatientModal();

}


/* =========================================================
   ELIMINAR PACIENTE
========================================================= */

function deletePatient(id) {

    const patient =
        patients.find(
            item => item.id === id
        );


    if (!patient) {
        return;
    }


    const confirmDelete =
        confirm(
            `¿Desea eliminar al paciente ${patient.name}?`
        );


    if (!confirmDelete) {
        return;
    }


    patients =
        patients.filter(
            item => item.id !== id
        );


    guardarDatos(
        "saludpredict_patients",
        patients
    );


    renderPatients();

    updatePatientStatistics();

    actualizarDashboard();

}


/* =========================================================
   CERRAR MODAL PACIENTES
========================================================= */

function closePatientModal() {

    const modal =
        document.getElementById(
            "patientModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   SERVICIOS
========================================================= */

const defaultServices = [

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


let services =
    obtenerDatos(
        "saludpredict_services",
        defaultServices
    );


/* =========================================================
   INICIAR SERVICIOS
========================================================= */

function iniciarServicios() {

    renderServices();

    updateServiceStatistics();


    const search =
        document.getElementById(
            "serviceSearch"
        );


    if (search) {

        search.addEventListener(
            "input",
            () => {

                renderServices(
                    search.value
                );

            }
        );

    }


    const newButton =
        document.getElementById(
            "newServiceBtn"
        );


    if (newButton) {

        newButton.addEventListener(
            "click",
            openNewServiceModal
        );

    }


    const form =
        document.getElementById(
            "serviceForm"
        );


    if (form) {

        form.addEventListener(
            "submit",
            saveService
        );

    }


    const closeButton =
        document.getElementById(
            "closeServiceModal"
        );


    const cancelButton =
        document.getElementById(
            "cancelServiceBtn"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeServiceModal
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            closeServiceModal
        );

    }


    const modal =
        document.getElementById(
            "serviceModal"
        );


    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeServiceModal();

                }

            }
        );

    }

}


/* =========================================================
   RENDER SERVICIOS
========================================================= */

function renderServices(
    searchTerm = ""
) {

    const table =
        document.getElementById(
            "servicesTable"
        );


    if (!table) {
        return;
    }


    const term =
        searchTerm
            .toLowerCase()
            .trim();


    const filtered =
        services.filter(service => {

            return (

                service.code
                    .toLowerCase()
                    .includes(term)

                ||

                service.name
                    .toLowerCase()
                    .includes(term)

                ||

                service.category
                    .toLowerCase()
                    .includes(term)

            );

        });


    if (filtered.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="7"
                    style="text-align:center;padding:30px;">
                    No se encontraron servicios.
                </td>
            </tr>
        `;

        return;

    }


    table.innerHTML =
        filtered.map(service => `

            <tr>

                <td>
                    ${escaparHTML(
                        service.code
                    )}
                </td>

                <td>
                    ${escaparHTML(
                        service.name
                    )}
                </td>

                <td>
                    ${escaparHTML(
                        service.category
                    )}
                </td>

                <td>
                    ${escaparHTML(
                        service.duration
                    )}
                </td>

                <td>
                    ${formatCurrency(
                        service.price
                    )}
                </td>

                <td>

                    <span class="status ${
                        service.status === "Activo"
                            ? "active"
                            : "inactive"
                    }">

                        ${escaparHTML(
                            service.status
                        )}

                    </span>

                </td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="action-btn edit-btn"
                            onclick="editService('${service.id}')">
                            Editar
                        </button>

                        <button
                            class="action-btn delete-btn"
                            onclick="deleteService('${service.id}')">
                            Eliminar
                        </button>

                    </div>

                </td>

            </tr>

        `).join("");

}


/* =========================================================
   FORMATO MONEDA
========================================================= */

function formatCurrency(value) {

    return new Intl.NumberFormat(
        "es-CO",
        {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0
        }
    ).format(
        Number(value || 0)
    );

}


/* =========================================================
   ESTADÍSTICAS SERVICIOS
========================================================= */

function updateServiceStatistics() {

    const total =
        document.getElementById(
            "totalServices"
        );


    const active =
        document.getElementById(
            "activeServices"
        );


    const average =
        document.getElementById(
            "averageServicePrice"
        );


    const activeServices =
        services.filter(
            service =>
                service.status === "Activo"
        );


    const averagePrice =
        activeServices.length > 0

            ?

            activeServices.reduce(
                (sum, service) =>
                    sum +
                    Number(
                        service.price || 0
                    ),
                0
            ) /
            activeServices.length

            :

            0;


    if (total) {

        total.textContent =
            services.length;

    }


    if (active) {

        active.textContent =
            activeServices.length;

    }


    if (average) {

        average.textContent =
            formatCurrency(
                averagePrice
            );

    }

}


/* =========================================================
   NUEVO SERVICIO
========================================================= */

function openNewServiceModal() {

    const modal =
        document.getElementById(
            "serviceModal"
        );


    const form =
        document.getElementById(
            "serviceForm"
        );


    const title =
        document.getElementById(
            "serviceModalTitle"
        );


    if (!modal || !form) {
        return;
    }


    form.reset();


    document.getElementById(
        "serviceId"
    ).value = "";


    if (title) {

        title.textContent =
            "Nuevo servicio";

    }


    modal.classList.add("show");

}


/* =========================================================
   EDITAR SERVICIO
========================================================= */

function editService(id) {

    const service =
        services.find(
            item => item.id === id
        );


    if (!service) {
        return;
    }


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


    const title =
        document.getElementById(
            "serviceModalTitle"
        );


    if (title) {

        title.textContent =
            "Editar servicio";

    }


    const modal =
        document.getElementById(
            "serviceModal"
        );


    if (modal) {

        modal.classList.add("show");

    }

}


/* =========================================================
   GUARDAR SERVICIO
========================================================= */

function saveService(event) {

    event.preventDefault();


    const id =
        document.getElementById(
            "serviceId"
        ).value.trim();


    const code =
        document.getElementById(
            "serviceCode"
        ).value.trim()
        .toUpperCase();


    const name =
        document.getElementById(
            "serviceName"
        ).value.trim();


    const category =
        document.getElementById(
            "serviceCategory"
        ).value;


    const duration =
        document.getElementById(
            "serviceDuration"
        ).value.trim();


    const price =
        Number(
            document.getElementById(
                "servicePrice"
            ).value
        );


    const status =
        document.getElementById(
            "serviceStatus"
        ).value;


    if (
        !code ||
        !name ||
        !category ||
        !duration ||
        !price ||
        price < 0 ||
        !status
    ) {

        alert(
            "Por favor complete correctamente todos los campos."
        );

        return;

    }


    const duplicate =
        services.find(
            service =>
                service.code.toUpperCase() ===
                    code &&
                service.id !== id
        );


    if (duplicate) {

        alert(
            "Ya existe un servicio con ese código."
        );

        return;

    }


    const serviceData = {

        id:
            id ||
            generarId("ser"),

        code:
            code,

        name:
            name,

        category:
            category,

        duration:
            duration,

        price:
            price,

        status:
            status

    };


    if (id) {

        const index =
            services.findIndex(
                service =>
                    service.id === id
            );


        if (index !== -1) {

            services[index] =
                serviceData;

        }

    } else {

        services.push(
            serviceData
        );

    }


    guardarDatos(
        "saludpredict_services",
        services
    );


    renderServices();

    updateServiceStatistics();

    updatePatientServiceOptions();

    actualizarDashboard();

    closeServiceModal();

}


/* =========================================================
   ELIMINAR SERVICIO
========================================================= */

function deleteService(id) {

    const service =
        services.find(
            item => item.id === id
        );


    if (!service) {
        return;
    }


    const patientsUsingService =
        patients.filter(
            patient =>
                patient.service ===
                service.name
        );


    let message =
        `¿Desea eliminar el servicio "${service.name}"?`;


    if (patientsUsingService.length > 0) {

        message +=
            `\n\nHay ${patientsUsingService.length} paciente(s) asociados a este servicio.`;

    }


    if (!confirm(message)) {
        return;
    }


    services =
        services.filter(
            item =>
                item.id !== id
        );


    guardarDatos(
        "saludpredict_services",
        services
    );


    renderServices();

    updateServiceStatistics();

    updatePatientServiceOptions();

    actualizarDashboard();

}


/* =========================================================
   CERRAR MODAL SERVICIOS
========================================================= */

function closeServiceModal() {

    const modal =
        document.getElementById(
            "serviceModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   INVENTARIO
========================================================= */

const defaultInventory = [

    {
        id: "inv-001",
        code: "MED-001",
        name: "Acetaminofén 500 mg",
        category: "Medicamentos",
        unit: "Tableta",
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
        unit: "Tableta",
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
        unit: "Caja",
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
        unit: "Unidad",
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
        unit: "Caja",
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
        unit: "Paquete",
        stock: 25,
        minStock: 30,
        expiry: "2027-08-10",
        price: 600,
        status: "Activo"
    }

];


let inventory =
    obtenerDatos(
        "saludpredict_inventory",
        defaultInventory
    );


/* =========================================================
   INICIAR INVENTARIO
========================================================= */

function iniciarInventario() {

    renderInventory();

    updateInventoryStatistics();


    const search =
        document.getElementById(
            "inventorySearch"
        );


    if (search) {

        search.addEventListener(
            "input",
            () => {

                renderInventory(
                    search.value
                );

            }
        );

    }


    const newButton =
        document.getElementById(
            "newInventoryBtn"
        );


    if (newButton) {

        newButton.addEventListener(
            "click",
            openNewInventoryModal
        );

    }


    const form =
        document.getElementById(
            "inventoryForm"
        );


    if (form) {

        form.addEventListener(
            "submit",
            saveInventoryItem
        );

    }


    const closeButton =
        document.getElementById(
            "closeInventoryModal"
        );


    const cancelButton =
        document.getElementById(
            "cancelInventoryModal"
        );


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeInventoryModal
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            closeInventoryModal
        );

    }


    const modal =
        document.getElementById(
            "inventoryModal"
        );


    if (modal) {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeInventoryModal();

                }

            }
        );

    }

}


/* =========================================================
   RENDER INVENTARIO
========================================================= */

function renderInventory(
    searchTerm = ""
) {

    const table =
        document.getElementById(
            "inventoryTable"
        );


    if (!table) {
        return;
    }


    const term =
        searchTerm
            .toLowerCase()
            .trim();


    const filtered =
        inventory.filter(item => {

            return (

                item.code
                    .toLowerCase()
                    .includes(term)

                ||

                item.name
                    .toLowerCase()
                    .includes(term)

                ||

                item.category
                    .toLowerCase()
                    .includes(term)

            );

        });


    if (filtered.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="10"
                    style="text-align:center;padding:30px;">
                    No se encontraron productos.
                </td>
            </tr>
        `;

        return;

    }


    table.innerHTML =
        filtered.map(item => `

            <tr>

                <!-- Código -->

                <td>
                    ${escaparHTML(
                        item.code
                    )}
                </td>


                <!-- Producto -->

                <td>
                    ${escaparHTML(
                        item.name
                    )}
                </td>


                <!-- Categoría -->

                <td>
                    ${escaparHTML(
                        item.category
                    )}
                </td>


                <!-- Unidad -->

                <td>
                    ${escaparHTML(
                        item.unit || "-"
                    )}
                </td>


                <!-- Stock -->

                <td>
                    ${Number(
                        item.stock || 0
                    ).toLocaleString(
                        "es-CO"
                    )}
                </td>


                <!-- Mínimo -->

                <td>
                    ${Number(
                        item.minStock || 0
                    ).toLocaleString(
                        "es-CO"
                    )}
                </td>


                <!-- Vencimiento -->

                <td>
                    ${
                        item.expiry
                            ? formatInventoryDate(
                                item.expiry
                            )
                            : "Sin fecha"
                    }
                </td>


                <!-- Precio -->

                <td>
                    ${formatInventoryCurrency(
                        item.price
                    )}
                </td>


                <!-- Estado -->

                <td>

                    <span class="status ${
                        item.status === "Activo"
                            ? "active"
                            : "inactive"
                    }">

                        ${escaparHTML(
                            item.status
                        )}

                    </span>

                </td>


                <!-- Acciones -->

                <td>

                    <div class="action-buttons">

                        <button
                            class="action-btn edit-btn"
                            onclick="editInventory('${item.id}')">
                            Editar
                        </button>

                        <button
                            class="action-btn delete-btn"
                            onclick="deleteInventory('${item.id}')">
                            Eliminar
                        </button>

                    </div>

                </td>

            </tr>

        `).join("");

}


/* =========================================================
   MONEDA INVENTARIO
========================================================= */

function formatInventoryCurrency(
    value
) {

    return new Intl.NumberFormat(
        "es-CO",
        {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0
        }
    ).format(
        Number(value || 0)
    );

}


/* =========================================================
   FECHA INVENTARIO
========================================================= */

function formatInventoryDate(
    date
) {

    if (!date) {
        return "Sin fecha";
    }


    const parts =
        date.split("-");


    if (parts.length !== 3) {
        return date;
    }


    return `${parts[2]}/${parts[1]}/${parts[0]}`;

}


/* =========================================================
   PRODUCTOS PRÓXIMOS A VENCER
   30 DÍAS
========================================================= */

function isInventoryExpiringSoon(
    date
) {

    if (!date) {
        return false;
    }


    const expiryDate =
        new Date(
            `${date}T00:00:00`
        );


    const today =
        new Date();


    today.setHours(
        0,
        0,
        0,
        0
    );


    const difference =
        expiryDate.getTime() -
        today.getTime();


    const days =
        difference /
        (
            1000 *
            60 *
            60 *
            24
        );


    return (
        days >= 0 &&
        days <= 30
    );

}


/* =========================================================
   ESTADÍSTICAS INVENTARIO
========================================================= */

function updateInventoryStatistics() {

    const total =
        document.getElementById(
            "totalInventory"
        );


    const lowStock =
        document.getElementById(
            "lowStockInventory"
        );


    const expiring =
        document.getElementById(
            "expiringInventory"
        );


    const activeInventory =
        inventory.filter(
            item =>
                item.status === "Activo"
        );


    const lowStockItems =
        activeInventory.filter(
            item =>
                Number(item.stock || 0) <=
                Number(item.minStock || 0)
        );


    const expiringItems =
        activeInventory.filter(
            item =>
                isInventoryExpiringSoon(
                    item.expiry
                )
        );


    if (total) {

        total.textContent =
            activeInventory.length;

    }


    if (lowStock) {

        lowStock.textContent =
            lowStockItems.length;

    }


    if (expiring) {

        expiring.textContent =
            expiringItems.length;

    }

}


/* =========================================================
   NUEVO PRODUCTO INVENTARIO
========================================================= */

function openNewInventoryModal() {

    const modal =
        document.getElementById(
            "inventoryModal"
        );


    const form =
        document.getElementById(
            "inventoryForm"
        );


    if (!modal || !form) {
        return;
    }


    form.reset();


    document.getElementById(
        "inventoryId"
    ).value = "";


    modal.classList.add(
        "show"
    );

}


/* =========================================================
   EDITAR INVENTARIO
========================================================= */

function editInventory(id) {

    const item =
        inventory.find(
            product =>
                product.id === id
        );


    if (!item) {
        return;
    }


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
        item.unit || "";


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
        item.expiry || "";


    document.getElementById(
        "inventoryPrice"
    ).value =
        item.price;


    document.getElementById(
        "inventoryStatus"
    ).value =
        item.status;


    const modal =
        document.getElementById(
            "inventoryModal"
        );


    if (modal) {

        modal.classList.add(
            "show"
        );

    }

}


/* =========================================================
   GUARDAR INVENTARIO
========================================================= */

function saveInventoryItem(event) {

    event.preventDefault();


    const id =
        document.getElementById(
            "inventoryId"
        ).value.trim();


    const code =
        document.getElementById(
            "inventoryCode"
        ).value.trim()
        .toUpperCase();


    const name =
        document.getElementById(
            "inventoryName"
        ).value.trim();


    const category =
        document.getElementById(
            "inventoryCategory"
        ).value;


    const unit =
        document.getElementById(
            "inventoryUnit"
        ).value.trim();


    const stock =
        Number(
            document.getElementById(
                "inventoryStock"
            ).value
        );


    const minStock =
        Number(
            document.getElementById(
                "inventoryMinStock"
            ).value
        );


    const expiry =
        document.getElementById(
            "inventoryExpiry"
        ).value;


    const price =
        Number(
            document.getElementById(
                "inventoryPrice"
            ).value
        );


    const status =
        document.getElementById(
            "inventoryStatus"
        ).value;


    if (
        !code ||
        !name ||
        !category ||
        !unit ||
        stock < 0 ||
        minStock < 0 ||
        price < 0 ||
        !status
    ) {

        alert(
            "Por favor complete correctamente todos los campos."
        );

        return;

    }


    const duplicate =
        inventory.find(
            item =>
                item.code.toUpperCase() ===
                    code &&
                item.id !== id
        );


    if (duplicate) {

        alert(
            "Ya existe un producto con ese código."
        );

        return;

    }


    const inventoryData = {

        id:
            id ||
            generarId("inv"),

        code:
            code,

        name:
            name,

        category:
            category,

        unit:
            unit,

        stock:
            stock,

        minStock:
            minStock,

        expiry:
            expiry,

        price:
            price,

        status:
            status

    };


    if (id) {

        const index =
            inventory.findIndex(
                item =>
                    item.id === id
            );


        if (index !== -1) {

            inventory[index] =
                inventoryData;

        }

    } else {

        inventory.push(
            inventoryData
        );

    }


    guardarDatos(
        "saludpredict_inventory",
        inventory
    );


    renderInventory();

    updateInventoryStatistics();

    actualizarDashboard();

    closeInventoryModal();

}


/* =========================================================
   ELIMINAR PRODUCTO INVENTARIO
========================================================= */

function deleteInventory(id) {

    const item =
        inventory.find(
            product =>
                product.id === id
        );


    if (!item) {
        return;
    }


    const confirmDelete =
        confirm(
            `¿Desea eliminar "${item.name}" del inventario?`
        );


    if (!confirmDelete) {
        return;
    }


    inventory =
        inventory.filter(
            product =>
                product.id !== id
        );


    guardarDatos(
        "saludpredict_inventory",
        inventory
    );


    renderInventory();

    updateInventoryStatistics();

    actualizarDashboard();

}


/* =========================================================
   CERRAR MODAL INVENTARIO
========================================================= */

function closeInventoryModal() {

    const modal =
        document.getElementById(
            "inventoryModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   CERRAR MODALES CON ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        closePatientModal();

        closeServiceModal();

        closeInventoryModal();

    }
);
