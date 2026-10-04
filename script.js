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
/* ============================================================
   SALUDPREDICT
   MÓDULOS: PRESUPUESTO - ANÁLISIS - PREDICCIONES - ALERTAS - REPORTES
============================================================ */


/* ============================================================
   CONFIGURACIÓN GENERAL
============================================================ */

const BUDGET_APPROVED_VALUE = 1000000000;

const budgetCategories = [
    "Personal",
    "Medicamentos",
    "Insumos",
    "Servicios",
    "Mantenimiento",
    "Administración",
    "Tecnología",
    "Otros"
];


/* ============================================================
   FUNCIONES AUXILIARES
============================================================ */

function advancedCurrency(value) {

    return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
    }).format(Number(value) || 0);

}


function advancedEscape(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function advancedDate(date) {

    if (!date) return "-";

    const parts = String(date).split("-");

    if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    return date;

}


function getAdvancedPatients() {

    try {

        return JSON.parse(
            localStorage.getItem("saludpredict_patients")
        ) || [];

    } catch (error) {

        return [];

    }

}


function getAdvancedServices() {

    try {

        return JSON.parse(
            localStorage.getItem("saludpredict_services")
        ) || [];

    } catch (error) {

        return [];

    }

}


function getAdvancedInventory() {

    try {

        return JSON.parse(
            localStorage.getItem("saludpredict_inventory")
        ) || [];

    } catch (error) {

        return [];

    }

}


/* ============================================================
   PRESUPUESTO
============================================================ */

const defaultBudgetMovements = [

    {
        id: "pres-001",
        date: "2026-01-10",
        type: "Gasto",
        category: "Personal",
        description: "Nómina personal asistencial",
        value: 280000000,
        responsible: "Administración",
        costCenter: "CC-001"
    },

    {
        id: "pres-002",
        date: "2026-01-18",
        type: "Gasto",
        category: "Medicamentos",
        description: "Compra de medicamentos",
        value: 95000000,
        responsible: "Farmacia",
        costCenter: "CC-002"
    },

    {
        id: "pres-003",
        date: "2026-02-05",
        type: "Gasto",
        category: "Insumos",
        description: "Compra de insumos médicos",
        value: 75000000,
        responsible: "Almacén",
        costCenter: "CC-003"
    },

    {
        id: "pres-004",
        date: "2026-02-20",
        type: "Gasto",
        category: "Mantenimiento",
        description: "Mantenimiento de equipos",
        value: 45000000,
        responsible: "Mantenimiento",
        costCenter: "CC-004"
    },

    {
        id: "pres-005",
        date: "2026-03-02",
        type: "Gasto",
        category: "Tecnología",
        description: "Licencias y equipos tecnológicos",
        value: 35000000,
        responsible: "Sistemas",
        costCenter: "CC-005"
    }

];


let budgetMovements = [];


function loadBudgetData() {

    const saved = localStorage.getItem(
        "saludpredict_budget"
    );

    if (saved) {

        try {

            budgetMovements = JSON.parse(saved);

        } catch (error) {

            budgetMovements = [...defaultBudgetMovements];

        }

    } else {

        budgetMovements = [...defaultBudgetMovements];

        localStorage.setItem(
            "saludpredict_budget",
            JSON.stringify(budgetMovements)
        );

    }

}


function saveBudgetData() {

    localStorage.setItem(
        "saludpredict_budget",
        JSON.stringify(budgetMovements)
    );

}


function updateBudgetSummary() {

    const executed = budgetMovements
        .filter(item => item.type === "Gasto")
        .reduce(
            (total, item) =>
                total + Number(item.value || 0),
            0
        );

    const income = budgetMovements
        .filter(item => item.type === "Ingreso")
        .reduce(
            (total, item) =>
                total + Number(item.value || 0),
            0
        );

    const available =
        BUDGET_APPROVED_VALUE -
        executed +
        income;

    const percentage =
        BUDGET_APPROVED_VALUE > 0
            ? (executed / BUDGET_APPROVED_VALUE) * 100
            : 0;


    const approvedElement =
        document.getElementById("budgetApproved");

    const executedElement =
        document.getElementById("budgetExecuted");

    const availableElement =
        document.getElementById("budgetAvailable");

    const percentageElement =
        document.getElementById("budgetPercentage");


    if (approvedElement) {

        approvedElement.textContent =
            advancedCurrency(BUDGET_APPROVED_VALUE);

    }

    if (executedElement) {

        executedElement.textContent =
            advancedCurrency(executed);

    }

    if (availableElement) {

        availableElement.textContent =
            advancedCurrency(available);

    }

    if (percentageElement) {

        percentageElement.textContent =
            `${percentage.toFixed(1)}%`;

    }


    return {
        executed,
        income,
        available,
        percentage
    };

}


function renderBudget(search = "") {

    const table =
        document.getElementById("budgetTable");

    if (!table) return;


    const text =
        search.toLowerCase().trim();


    const filtered =
        budgetMovements.filter(item => {

            return [

                item.date,
                item.type,
                item.category,
                item.description,
                item.responsible,
                item.costCenter

            ]
            .join(" ")
            .toLowerCase()
            .includes(text);

        });


    if (!filtered.length) {

        table.innerHTML = `
            <tr>
                <td colspan="8">
                    No hay movimientos presupuestales.
                </td>
            </tr>
        `;

        return;

    }


    table.innerHTML = filtered.map(item => `

        <tr>

            <td>${advancedDate(item.date)}</td>

            <td>
                <span class="status ${
                    item.type === "Ingreso"
                        ? "active"
                        : "inactive"
                }">
                    ${advancedEscape(item.type)}
                </span>
            </td>

            <td>${advancedEscape(item.category)}</td>

            <td>${advancedEscape(item.description)}</td>

            <td>
                ${advancedCurrency(item.value)}
            </td>

            <td>${advancedEscape(item.responsible)}</td>

            <td>${advancedEscape(item.costCenter)}</td>

            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteBudgetMovement('${item.id}')"
                    >
                        Eliminar
                    </button>

                </div>

            </td>

        </tr>

    `).join("");

}


function createBudgetMovement() {

    const date =
        prompt(
            "Fecha (AAAA-MM-DD):",
            new Date().toISOString().slice(0, 10)
        );

    if (!date) return;


    const type =
        prompt(
            "Tipo: escriba Ingreso o Gasto",
            "Gasto"
        );

    if (!type) return;


    const category =
        prompt(
            "Categoría:\n" +
            budgetCategories.join(", "),
            "Insumos"
        );

    if (!category) return;


    const description =
        prompt(
            "Descripción del movimiento:"
        );

    if (!description) return;


    const value =
        Number(
            prompt(
                "Valor:",
                "100000"
            )
        );


    if (!value || value <= 0) {

        alert("Ingrese un valor válido.");

        return;

    }


    const responsible =
        prompt(
            "Responsable:",
            "Administración"
        ) || "Administración";


    const costCenter =
        prompt(
            "Centro de costo:",
            "CC-001"
        ) || "CC-001";


    budgetMovements.push({

        id: `pres-${Date.now()}`,

        date,

        type:
            type.toLowerCase().includes("ingreso")
                ? "Ingreso"
                : "Gasto",

        category,

        description,

        value,

        responsible,

        costCenter

    });


    saveBudgetData();

    renderBudget();

    updateBudgetSummary();

    refreshAdvancedModules();

}


function deleteBudgetMovement(id) {

    const confirmed =
        confirm(
            "¿Desea eliminar este movimiento?"
        );

    if (!confirmed) return;


    budgetMovements =
        budgetMovements.filter(
            item => item.id !== id
        );


    saveBudgetData();

    renderBudget();

    updateBudgetSummary();

    refreshAdvancedModules();

}


/* ============================================================
   ANÁLISIS
============================================================ */

function updateAnalysis() {

    const patients =
        getAdvancedPatients();

    const services =
        getAdvancedServices();

    const inventory =
        getAdvancedInventory();


    const activeServices =
        services.filter(
            item =>
                item.status === "Activo"
        );


    const lowStock =
        inventory.filter(item =>
            Number(item.stock) <=
            Number(item.minStock)
        );


    const patientElement =
        document.getElementById(
            "analysisPatients"
        );

    const servicesElement =
        document.getElementById(
            "analysisServices"
        );

    const inventoryElement =
        document.getElementById(
            "analysisInventory"
        );

    const lowStockElement =
        document.getElementById(
            "analysisLowStock"
        );


    if (patientElement)
        patientElement.textContent =
            patients.length;

    if (servicesElement)
        servicesElement.textContent =
            activeServices.length;

    if (inventoryElement)
        inventoryElement.textContent =
            inventory.length;

    if (lowStockElement)
        lowStockElement.textContent =
            lowStock.length;


    renderPatientsAnalysis(patients);

    renderInventoryAnalysis(inventory);

    renderFinancialAnalysis();

}


function renderPatientsAnalysis(patients) {

    const container =
        document.getElementById(
            "patientsAnalysisChart"
        );

    if (!container) return;


    if (!patients.length) {

        container.innerHTML =
            "<p>No hay pacientes registrados.</p>";

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


    const max =
        Math.max(
            ...Object.values(counts)
        );


    container.innerHTML =
        Object.entries(counts)
            .map(([name, count]) => {

                const width =
                    max > 0
                        ? (count / max) * 100
                        : 0;

                return `

                    <div style="
                        margin:15px 0;
                    ">

                        <div style="
                            display:flex;
                            justify-content:space-between;
                            margin-bottom:5px;
                        ">

                            <span>
                                ${advancedEscape(name)}
                            </span>

                            <strong>
                                ${count}
                            </strong>

                        </div>

                        <div style="
                            background:#e5e7eb;
                            border-radius:10px;
                            height:12px;
                            overflow:hidden;
                        ">

                            <div style="
                                width:${width}%;
                                height:100%;
                                background:#20c6d7;
                                border-radius:10px;
                            "></div>

                        </div>

                    </div>

                `;

            })
            .join("");

}


function renderInventoryAnalysis(inventory) {

    const container =
        document.getElementById(
            "inventoryAnalysisChart"
        );

    if (!container) return;


    if (!inventory.length) {

        container.innerHTML =
            "<p>No hay productos registrados.</p>";

        return;

    }


    const total =
        inventory.reduce(
            (sum, item) =>
                sum + Number(item.stock || 0),
            0
        );


    const low =
        inventory.filter(item =>
            Number(item.stock) <=
            Number(item.minStock)
        ).length;


    const available =
        inventory.length - low;


    container.innerHTML = `

        <div style="
            margin:20px 0;
        ">

            <p>
                Productos disponibles:
                <strong>${available}</strong>
            </p>

            <p>
                Productos con stock bajo:
                <strong>${low}</strong>
            </p>

            <p>
                Unidades totales:
                <strong>${total}</strong>
            </p>

        </div>

    `;

}


function renderFinancialAnalysis() {

    const container =
        document.getElementById(
            "financialAnalysis"
        );

    if (!container) return;


    const summary =
        updateBudgetSummary();


    container.innerHTML = `

        <div style="
            display:grid;
            grid-template-columns:
            repeat(auto-fit,minmax(180px,1fr));
            gap:15px;
        ">

            <div>
                <strong>Presupuesto</strong>
                <p>
                    ${advancedCurrency(
                        BUDGET_APPROVED_VALUE
                    )}
                </p>
            </div>

            <div>
                <strong>Ejecutado</strong>
                <p>
                    ${advancedCurrency(
                        summary.executed
                    )}
                </p>
            </div>

            <div>
                <strong>Disponible</strong>
                <p>
                    ${advancedCurrency(
                        summary.available
                    )}
                </p>
            </div>

            <div>
                <strong>Ejecución</strong>
                <p>
                    ${summary.percentage.toFixed(1)}%
                </p>
            </div>

        </div>

    `;

}


/* ============================================================
   PREDICCIONES
============================================================ */

function populatePredictionServices() {

    const select =
        document.getElementById(
            "predictionService"
        );

    if (!select) return;


    const services =
        getAdvancedServices()
            .filter(
                item => item.status === "Activo"
            );


    select.innerHTML = `
        <option value="all">
            Todos los servicios
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

}


function generatePrediction() {

    const patients =
        getAdvancedPatients();


    const serviceSelect =
        document.getElementById(
            "predictionService"
        );

    const periodSelect =
        document.getElementById(
            "predictionPeriod"
        );


    const selectedService =
        serviceSelect
            ? serviceSelect.value
            : "all";


    const months =
        periodSelect
            ? Number(periodSelect.value)
            : 1;


    let historicalPatients =
        patients;


    if (
        selectedService !== "all"
    ) {

        historicalPatients =
            patients.filter(
                patient =>
                    patient.service ===
                    selectedService
            );

    }


    const historicalAverage =
        historicalPatients.length;


    /*
       Como SALUDPREDICT todavía no tiene
       una serie histórica real de meses,
       utilizamos una estimación inicial
       basada en los registros actuales.

       Esto se mostrará como ESTIMACIÓN,
       no como una predicción estadística real.
    */

    const estimatedDemand =
        Math.round(
            historicalAverage *
            (1 + (0.05 * months))
        );


    const variation =
        historicalAverage > 0
            ? (
                (
                    estimatedDemand -
                    historicalAverage
                ) /
                historicalAverage
            ) * 100
            : 0;


    let warning = "Normal";


    if (variation >= 20) {

        warning = "Crítico";

    } else if (variation >= 10) {

        warning = "Atención";

    }


    const averageElement =
        document.getElementById(
            "historicalAverage"
        );

    const demandElement =
        document.getElementById(
            "estimatedDemand"
        );

    const variationElement =
        document.getElementById(
            "predictionVariation"
        );

    const warningElement =
        document.getElementById(
            "predictionWarning"
        );


    if (averageElement)
        averageElement.textContent =
            historicalAverage;


    if (demandElement)
        demandElement.textContent =
            estimatedDemand;


    if (variationElement)
        variationElement.textContent =
            `${variation.toFixed(1)}%`;


    if (warningElement)
        warningElement.textContent =
            warning;


    const result =
        document.getElementById(
            "predictionResult"
        );


    if (result) {

        result.innerHTML = `

            <div style="
                padding:20px;
                border-radius:10px;
                background:#f4f7f9;
            ">

                <h4>
                    Proyección generada
                </h4>

                <p>
                    Servicio:
                    <strong>
                        ${
                            selectedService === "all"
                                ? "Todos los servicios"
                                : advancedEscape(
                                    selectedService
                                )
                        }
                    </strong>
                </p>

                <p>
                    Período:
                    <strong>
                        ${
                            months === 1
                                ? "Próximo mes"
                                : `Próximos ${months} meses`
                        }
                    </strong>
                </p>

                <p>
                    Registros actuales:
                    <strong>
                        ${historicalAverage}
                    </strong>
                </p>

                <p>
                    Demanda estimada:
                    <strong>
                        ${estimatedDemand}
                    </strong>
                </p>

                <p>
                    Variación estimada:
                    <strong>
                        ${variation.toFixed(1)}%
                    </strong>
                </p>

                <p>
                    Nivel:
                    <strong>
                        ${warning}
                    </strong>
                </p>

                <small>
                    Esta proyección es una estimación
                    inicial basada en los datos disponibles
                    en SALUDPREDICT.
                </small>

            </div>

        `;

    }

}


/* ============================================================
   ALERTAS AUTOMÁTICAS
============================================================ */

function generateAlerts() {

    const alerts = [];

    const inventory =
        getAdvancedInventory();

    const patients =
        getAdvancedPatients();

    const services =
        getAdvancedServices();

    const budget =
        updateBudgetSummary();


    /* STOCK BAJO */

    inventory.forEach(item => {

        const stock =
            Number(item.stock || 0);

        const minimum =
            Number(item.minStock || 0);


        if (stock <= minimum) {

            alerts.push({

                type: "critical",

                title: "Inventario bajo",

                message:
                    `${item.name}: ` +
                    `stock actual ${stock}, ` +
                    `mínimo ${minimum}.`

            });

        }

    });


    /* VENCIMIENTOS */

    const today =
        new Date();

    const limit =
        new Date();

    limit.setDate(
        today.getDate() + 30
    );


    inventory.forEach(item => {

        if (!item.expiry) return;


        const expiry =
            new Date(
                `${item.expiry}T00:00:00`
            );


        if (
            expiry >= today &&
            expiry <= limit
        ) {

            alerts.push({

                type: "attention",

                title:
                    "Próximo vencimiento",

                message:
                    `${item.name} vence el ` +
                    `${advancedDate(item.expiry)}.`

            });

        }

    });


    /* PRESUPUESTO */

    if (budget.percentage >= 90) {

        alerts.push({

            type: "critical",

            title:
                "Ejecución presupuestal elevada",

            message:
                `La ejecución presupuestal ` +
                `alcanzó ${budget.percentage.toFixed(1)}%.`

        });

    } else if (budget.percentage >= 75) {

        alerts.push({

            type: "attention",

            title:
                "Ejecución presupuestal",

            message:
                `La ejecución alcanzó ` +
                `${budget.percentage.toFixed(1)}%.`

        });

    }


    /* SERVICIOS */

    const activeServices =
        services.filter(
            item =>
                item.status === "Activo"
        );


    if (activeServices.length === 0) {

        alerts.push({

            type: "critical",

            title:
                "Sin servicios activos",

            message:
                "No existen servicios activos registrados."

        });

    }


    /* PACIENTES */

    if (patients.length === 0) {

        alerts.push({

            type: "attention",

            title:
                "Sin pacientes registrados",

            message:
                "El sistema todavía no tiene pacientes registrados."

        });

    }


    return alerts;

}


function renderAlerts() {

    const container =
        document.getElementById(
            "alertsContainer"
        );

    if (!container) return;


    const alerts =
        generateAlerts();


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


    const attentionCount =
        alerts.filter(
            item =>
                item.type === "attention"
        ).length;


    const criticalCount =
        alerts.filter(
            item =>
                item.type === "critical"
        ).length;


    if (total)
        total.textContent =
            alerts.length;

    if (attention)
        attention.textContent =
            attentionCount;

    if (critical)
        critical.textContent =
            criticalCount;

    if (normal)
        normal.textContent =
            Math.max(
                0,
                5 - alerts.length
            );


    if (!alerts.length) {

        container.innerHTML = `

            <div style="
                padding:25px;
                text-align:center;
            ">

                <h3>
                    ✓ Todo está en orden
                </h3>

                <p>
                    No se detectaron alertas
                    en este momento.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        alerts.map(alert => {

            const icon =
                alert.type === "critical"
                    ? "🔴"
                    : "🟡";


            return `

                <div style="
                    padding:18px;
                    margin-bottom:12px;
                    border-left:5px solid ${
                        alert.type === "critical"
                            ? "#dc3545"
                            : "#f0ad4e"
                    };
                    background:#f8fafb;
                    border-radius:8px;
                ">

                    <h4>
                        ${icon}
                        ${advancedEscape(
                            alert.title
                        )}
                    </h4>

                    <p>
                        ${advancedEscape(
                            alert.message
                        )}
                    </p>

                </div>

            `;

        }).join("");

}


/* ============================================================
   REPORTES
============================================================ */

function openReport(title, content) {

    const reportWindow =
        window.open(
            "",
            "_blank"
        );


    if (!reportWindow) {

        alert(
            "El navegador bloqueó la ventana del reporte."
        );

        return;

    }


    reportWindow.document.write(`

        <!DOCTYPE html>

        <html lang="es">

        <head>

            <meta charset="UTF-8">

            <title>
                ${advancedEscape(title)}
            </title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    margin: 40px;
                    color: #17212b;
                }

                h1 {
                    color: #0b1724;
                }

                h2 {
                    margin-top: 30px;
                    color: #183246;
                }

                table {
                    width:100%;
                    border-collapse:collapse;
                    margin-top:20px;
                }

                th,
                td {
                    border:1px solid #dce3e8;
                    padding:10px;
                    text-align:left;
                }

                th {
                    background:#eef2f5;
                }

                .header {
                    border-bottom:3px solid #c9a24d;
                    padding-bottom:15px;
                    margin-bottom:25px;
                }

                .print {
                    padding:10px 18px;
                    border:0;
                    border-radius:6px;
                    cursor:pointer;
                    background:#0b1724;
                    color:white;
                    margin-bottom:20px;
                }

                @media print {

                    .print {
                        display:none;
                    }

                    body {
                        margin:20px;
                    }

                }

            </style>

        </head>

        <body>

            <button
                class="print"
                onclick="window.print()"
            >
                Imprimir / Guardar PDF
            </button>

            <div class="header">

                <h1>
                    SALUDPREDICT
                </h1>

                <p>
                    Gestión inteligente en salud
                </p>

                <h2>
                    ${advancedEscape(title)}
                </h2>

                <p>
                    Fecha:
                    ${new Date().toLocaleDateString("es-CO")}
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
        getAdvancedPatients();

    const services =
        getAdvancedServices();


    const rows =
        patients.map(patient => `

            <tr>

                <td>
                    ${advancedEscape(
                        patient.document
                    )}
                </td>

                <td>
                    ${advancedEscape(
                        patient.name
                    )}
                </td>

                <td>
                    ${advancedEscape(
                        patient.service
                    )}
                </td>

                <td>
                    ${advancedEscape(
                        patient.status
                    )}
                </td>

            </tr>

        `).join("");


    openReport(

        "Reporte de demanda y atención",

        `

        <p>
            Total de pacientes:
            <strong>${patients.length}</strong>
        </p>

        <p>
            Servicios registrados:
            <strong>${services.length}</strong>
        </p>

        <h2>
            Pacientes
        </h2>

        <table>

            <thead>

                <tr>
                    <th>Documento</th>
                    <th>Nombre</th>
                    <th>Servicio</th>
                    <th>Estado</th>
                </tr>

            </thead>

            <tbody>
                ${rows}
            </tbody>

        </table>

        `

    );

}


function generateInventoryReport() {

    const inventory =
        getAdvancedInventory();


    const rows =
        inventory.map(item => `

            <tr>

                <td>
                    ${advancedEscape(item.code)}
                </td>

                <td>
                    ${advancedEscape(item.name)}
                </td>

                <td>
                    ${advancedEscape(item.category)}
                </td>

                <td>
                    ${advancedEscape(item.unit)}
                </td>

                <td>
                    ${item.stock}
                </td>

                <td>
                    ${item.minStock}
                </td>

                <td>
                    ${advancedDate(item.expiry)}
                </td>

                <td>
                    ${advancedCurrency(item.price)}
                </td>

            </tr>

        `).join("");


    openReport(

        "Reporte de inventario",

        `

        <p>
            Productos registrados:
            <strong>${inventory.length}</strong>
        </p>

        <h2>
            Existencias
        </h2>

        <table>

            <thead>

                <tr>

                    <th>Código</th>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Unidad</th>
                    <th>Stock</th>
                    <th>Mínimo</th>
                    <th>Vencimiento</th>
                    <th>Precio</th>

                </tr>

            </thead>

            <tbody>
                ${rows}
            </tbody>

        </table>

        `

    );

}


function generateBudgetReport() {

    const summary =
        updateBudgetSummary();


    const rows =
        budgetMovements.map(item => `

            <tr>

                <td>
                    ${advancedDate(item.date)}
                </td>

                <td>
                    ${advancedEscape(item.type)}
                </td>

                <td>
                    ${advancedEscape(item.category)}
                </td>

                <td>
                    ${advancedEscape(item.description)}
                </td>

                <td>
                    ${advancedCurrency(item.value)}
                </td>

            </tr>

        `).join("");


    openReport(

        "Reporte presupuestal",

        `

        <h2>
            Resumen
        </h2>

        <p>
            Presupuesto aprobado:
            <strong>
                ${advancedCurrency(
                    BUDGET_APPROVED_VALUE
                )}
            </strong>
        </p>

        <p>
            Ejecutado:
            <strong>
                ${advancedCurrency(
                    summary.executed
                )}
            </strong>
        </p>

        <p>
            Disponible:
            <strong>
                ${advancedCurrency(
                    summary.available
                )}
            </strong>
        </p>

        <p>
            Ejecución:
            <strong>
                ${summary.percentage.toFixed(1)}%
            </strong>
        </p>

        <h2>
            Movimientos
        </h2>

        <table>

            <thead>

                <tr>

                    <th>Fecha</th>
                    <th>Tipo</th>
                    <th>Categoría</th>
                    <th>Descripción</th>
                    <th>Valor</th>

                </tr>

            </thead>

            <tbody>
                ${rows}
            </tbody>

        </table>

        `

    );

}


function generateGeneralReport() {

    const patients =
        getAdvancedPatients();

    const services =
        getAdvancedServices();

    const inventory =
        getAdvancedInventory();

    const alerts =
        generateAlerts();

    const summary =
        updateBudgetSummary();


    openReport(

        "Reporte institucional general",

        `

        <h2>
            Resumen institucional
        </h2>

        <table>

            <tr>
                <th>Indicador</th>
                <th>Resultado</th>
            </tr>

            <tr>
                <td>Pacientes</td>
                <td>${patients.length}</td>
            </tr>

            <tr>
                <td>Servicios</td>
                <td>${services.length}</td>
            </tr>

            <tr>
                <td>Productos de inventario</td>
                <td>${inventory.length}</td>
            </tr>

            <tr>
                <td>Alertas</td>
                <td>${alerts.length}</td>
            </tr>

            <tr>
                <td>Presupuesto aprobado</td>
                <td>
                    ${advancedCurrency(
                        BUDGET_APPROVED_VALUE
                    )}
                </td>
            </tr>

            <tr>
                <td>Presupuesto ejecutado</td>
                <td>
                    ${advancedCurrency(
                        summary.executed
                    )}
                </td>
            </tr>

            <tr>
                <td>Ejecución presupuestal</td>
                <td>
                    ${summary.percentage.toFixed(1)}%
                </td>
            </tr>

        </table>

        <h2>
            Alertas actuales
        </h2>

        ${
            alerts.length
                ? alerts.map(alert => `
                    <p>
                        <strong>
                            ${advancedEscape(
                                alert.title
                            )}
                        </strong>:
                        ${advancedEscape(
                            alert.message
                        )}
                    </p>
                `).join("")
                : "<p>No existen alertas.</p>"
        }

        `

    );

}


/* ============================================================
   ACTUALIZAR TODO
============================================================ */

function refreshAdvancedModules() {

    updateBudgetSummary();

    updateAnalysis();

    populatePredictionServices();

    renderAlerts();

}


/* ============================================================
   EVENTOS
============================================================ */

function initAdvancedModules() {

    loadBudgetData();

    renderBudget();

    updateBudgetSummary();

    updateAnalysis();

    populatePredictionServices();

    renderAlerts();


    const newBudgetBtn =
        document.getElementById(
            "newBudgetBtn"
        );

    if (newBudgetBtn) {

        newBudgetBtn.addEventListener(
            "click",
            createBudgetMovement
        );

    }


    const budgetSearch =
        document.getElementById(
            "budgetSearch"
        );

    if (budgetSearch) {

        budgetSearch.addEventListener(
            "input",
            event => {

                renderBudget(
                    event.target.value
                );

            }
        );

    }


    const predictionBtn =
        document.getElementById(
            "generatePredictionBtn"
        );

    if (predictionBtn) {

        predictionBtn.addEventListener(
            "click",
            generatePrediction
        );

    }


    const refreshAlertsBtn =
        document.getElementById(
            "refreshAlertsBtn"
        );

    if (refreshAlertsBtn) {

        refreshAlertsBtn.addEventListener(
            "click",
            renderAlerts
        );

    }


    const reportDemandBtn =
        document.getElementById(
            "reportDemandBtn"
        );

    if (reportDemandBtn) {

        reportDemandBtn.addEventListener(
            "click",
            generateDemandReport
        );

    }


    const reportInventoryBtn =
        document.getElementById(
            "reportInventoryBtn"
        );

    if (reportInventoryBtn) {

        reportInventoryBtn.addEventListener(
            "click",
            generateInventoryReport
        );

    }


    const reportBudgetBtn =
        document.getElementById(
            "reportBudgetBtn"
        );

    if (reportBudgetBtn) {

        reportBudgetBtn.addEventListener(
            "click",
            generateBudgetReport
        );

    }


    const reportGeneralBtn =
        document.getElementById(
            "reportGeneralBtn"
        );

    if (reportGeneralBtn) {

        reportGeneralBtn.addEventListener(
            "click",
            generateGeneralReport
        );

    }

}


/* ============================================================
   INICIAR MÓDULOS
============================================================ */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initAdvancedModules
    );

} else {

    initAdvancedModules();

}
/* ============================================================
   DASHBOARD DINÁMICO
============================================================ */


/* ============================================================
   FORMATO DE MONEDA
============================================================ */

function dashboardCurrency(value) {

    return new Intl.NumberFormat("es-CO", {

        style: "currency",

        currency: "COP",

        maximumFractionDigits: 0

    }).format(
        Number(value) || 0
    );

}


/* ============================================================
   OBTENER DATOS
============================================================ */

function dashboardGetPatients() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "saludpredict_patients"
            )
        ) || [];

    } catch {

        return [];

    }

}


function dashboardGetServices() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "saludpredict_services"
            )
        ) || [];

    } catch {

        return [];

    }

}


function dashboardGetInventory() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "saludpredict_inventory"
            )
        ) || [];

    } catch {

        return [];

    }

}


function dashboardGetBudget() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "saludpredict_budget"
            )
        ) || [];

    } catch {

        return [];

    }

}


/* ============================================================
   ACTUALIZAR INDICADORES
============================================================ */

function updateDashboardIndicators() {


    const patients =
        dashboardGetPatients();


    const services =
        dashboardGetServices();


    const inventory =
        dashboardGetInventory();


    const budget =
        dashboardGetBudget();


    /* =========================
       PACIENTES
    ========================== */

    const dashboardPatients =
        document.getElementById(
            "dashboardPatients"
        );


    if (dashboardPatients) {

        dashboardPatients.textContent =
            patients.length;

    }


    /* =========================
       SERVICIOS ACTIVOS
    ========================== */

    const activeServices =
        services.filter(
            service =>
                service.status === "Activo"
        );


    const dashboardServices =
        document.getElementById(
            "dashboardServices"
        );


    if (dashboardServices) {

        dashboardServices.textContent =
            activeServices.length;

    }


    /* =========================
       INVENTARIO
    ========================== */

    let inventoryPercentage = 0;


    if (inventory.length > 0) {

        const available =
            inventory.filter(item => {

                return Number(item.stock) >
                    Number(item.minStock);

            }).length;


        inventoryPercentage =
            Math.round(
                (
                    available /
                    inventory.length
                ) * 100
            );

    }


    const dashboardInventory =
        document.getElementById(
            "dashboardInventory"
        );


    if (dashboardInventory) {

        dashboardInventory.textContent =
            `${inventoryPercentage}%`;

    }


    /* =========================
       PRESUPUESTO
    ========================== */

    const approved =
        1000000000;


    const executed =
        budget

            .filter(
                item =>
                    item.type === "Gasto"
            )

            .reduce(
                (total, item) =>
                    total +
                    Number(item.value || 0),

                0
            );


    let budgetPercentage = 0;


    if (approved > 0) {

        budgetPercentage =
            (
                executed /
                approved
            ) * 100;

    }


    const dashboardBudget =
        document.getElementById(
            "dashboardBudget"
        );


    if (dashboardBudget) {

        dashboardBudget.textContent =
            `${budgetPercentage.toFixed(1)}%`;

    }


    const dashboardBudgetPercentage =
        document.getElementById(
            "dashboardBudgetPercentage"
        );


    if (dashboardBudgetPercentage) {

        dashboardBudgetPercentage.textContent =
            `${budgetPercentage.toFixed(1)}%`;

    }


    const dashboardBudgetBar =
        document.getElementById(
            "dashboardBudgetBar"
        );


    if (dashboardBudgetBar) {

        dashboardBudgetBar.style.width =
            `${Math.min(
                budgetPercentage,
                100
            )}%`;

    }


    const dashboardBudgetExecuted =
        document.getElementById(
            "dashboardBudgetExecuted"
        );


    if (dashboardBudgetExecuted) {

        dashboardBudgetExecuted.textContent =
            dashboardCurrency(executed);

    }


    const dashboardBudgetTotal =
        document.getElementById(
            "dashboardBudgetTotal"
        );


    if (dashboardBudgetTotal) {

        dashboardBudgetTotal.textContent =
            dashboardCurrency(
                approved
            );

    }


    /* =========================
       OTROS ELEMENTOS
    ========================== */

    updateDashboardAlerts();

    updateDashboardSummary();

    updateDashboardServiceDemand();

    updateDashboardInventory();

}


/* ============================================================
   ALERTAS DEL DASHBOARD
============================================================ */

function updateDashboardAlerts() {

    const container =
        document.getElementById(
            "dashboardAlerts"
        );


    const counter =
        document.getElementById(
            "dashboardAlertCount"
        );


    if (!container) return;


    const inventory =
        dashboardGetInventory();


    const budget =
        dashboardGetBudget();


    const alerts = [];


    /* STOCK BAJO */

    inventory.forEach(item => {

        if (
            Number(item.stock) <=
            Number(item.minStock)
        ) {

            alerts.push({

                type: "warning",

                icon: "⚠️",

                title:
                    "Inventario bajo",

                message:
                    `${item.name}: ` +
                    `stock ${item.stock}, ` +
                    `mínimo ${item.minStock}.`

            });

        }

    });


    /* VENCIMIENTOS */

    const today =
        new Date();


    const limit =
        new Date();


    limit.setDate(
        today.getDate() + 30
    );


    inventory.forEach(item => {

        if (!item.expiry) return;


        const expiry =
            new Date(
                `${item.expiry}T00:00:00`
            );


        if (
            expiry >= today &&
            expiry <= limit
        ) {

            alerts.push({

                type: "danger",

                icon: "🚨",

                title:
                    "Próximo vencimiento",

                message:
                    `${item.name} vence el ` +
                    `${item.expiry}.`

            });

        }

    });


    /* PRESUPUESTO */

    const approved =
        1000000000;


    const executed =
        budget

            .filter(
                item =>
                    item.type === "Gasto"
            )

            .reduce(
                (total, item) =>
                    total +
                    Number(item.value || 0),

                0
            );


    const percentage =
        approved > 0
            ? (executed / approved) * 100
            : 0;


    if (percentage >= 90) {

        alerts.push({

            type: "danger",

            icon: "🚨",

            title:
                "Presupuesto crítico",

            message:
                `La ejecución presupuestal ` +
                `está en ${percentage.toFixed(1)}%.`

        });

    }

    else if (percentage >= 75) {

        alerts.push({

            type: "warning",

            icon: "⚠️",

            title:
                "Presupuesto elevado",

            message:
                `La ejecución presupuestal ` +
                `está en ${percentage.toFixed(1)}%.`

        });

    }


    /* CONTENIDO */

    if (counter) {

        counter.textContent =
            alerts.length;

    }


    if (!alerts.length) {

        container.innerHTML = `

            <div class="alert-item info">

                <span>✓</span>

                <div>

                    <strong>
                        Sistema estable
                    </strong>

                    <p>
                        No existen alertas
                        críticas actualmente.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    container.innerHTML =
        alerts
            .slice(0, 5)
            .map(alert => `

                <div class="alert-item ${alert.type}">

                    <span>
                        ${alert.icon}
                    </span>

                    <div>

                        <strong>
                            ${alert.title}
                        </strong>

                        <p>
                            ${alert.message}
                        </p>

                    </div>

                </div>

            `)
            .join("");

}


/* ============================================================
   RESUMEN INSTITUCIONAL
============================================================ */

function updateDashboardSummary() {

    const container =
        document.getElementById(
            "dashboardSystemSummary"
        );


    if (!container) return;


    const patients =
        dashboardGetPatients();


    const services =
        dashboardGetServices();


    const inventory =
        dashboardGetInventory();


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


    container.innerHTML = `

        <div style="
            display:grid;
            gap:12px;
        ">

            <p>
                👥
                <strong>
                    ${patients.length}
                </strong>
                pacientes registrados.
            </p>

            <p>
                ✓
                <strong>
                    ${activePatients}
                </strong>
                pacientes activos.
            </p>

            <p>
                🏥
                <strong>
                    ${activeServices}
                </strong>
                servicios activos.
            </p>

            <p>
                📦
                <strong>
                    ${inventory.length}
                </strong>
                productos en inventario.
            </p>

            <p>
                ⚠️
                <strong>
                    ${lowStock}
                </strong>
                productos requieren reposición.
            </p>

        </div>

    `;

}


/* ============================================================
   DEMANDA POR SERVICIO
============================================================ */

function updateDashboardServiceDemand() {

    const container =
        document.getElementById(
            "dashboardServiceDemand"
        );


    if (!container) return;


    const patients =
        dashboardGetPatients();


    if (!patients.length) {

        container.innerHTML = `

            <p>
                Todavía no hay pacientes registrados.
            </p>

        `;

        return;

    }


    const serviceCount = {};


    patients.forEach(patient => {

        const service =
            patient.service ||
            "Sin servicio";


        serviceCount[service] =
            (
                serviceCount[service] ||
                0
            ) + 1;

    });


    const ordered =
        Object.entries(
            serviceCount
        )
        .sort(
            (a, b) =>
                b[1] - a[1]
        );


    const max =
        ordered.length
            ? ordered[0][1]
            : 1;


    container.innerHTML =
        ordered
            .map(
                ([service, count]) => {

                    const width =
                        (
                            count /
                            max
                        ) * 100;


                    return `

                        <div style="
                            width:100%;
                            margin:10px 0;
                        ">

                            <div style="
                                display:flex;
                                justify-content:space-between;
                                margin-bottom:5px;
                            ">

                                <span>
                                    ${service}
                                </span>

                                <strong>
                                    ${count}
                                </strong>

                            </div>


                            <div style="
                                width:100%;
                                height:12px;
                                background:#e5e7eb;
                                border-radius:10px;
                                overflow:hidden;
                            ">

                                <div style="
                                    width:${width}%;
                                    height:100%;
                                    background:#20c6d7;
                                    border-radius:10px;
                                "></div>

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}


/* ============================================================
   RESUMEN INVENTARIO
============================================================ */

function updateDashboardInventory() {

    const container =
        document.getElementById(
            "dashboardInventorySummary"
        );


    if (!container) return;


    const inventory =
        dashboardGetInventory();


    if (!inventory.length) {

        container.innerHTML = `

            <p>
                No hay productos registrados.
            </p>

        `;

        return;

    }


    const lowStock =
        inventory.filter(
            item =>
                Number(item.stock) <=
                Number(item.minStock)
        );


    const normalStock =
        inventory.length -
        lowStock.length;


    const totalUnits =
        inventory.reduce(
            (total, item) =>
                total +
                Number(item.stock || 0),

            0
        );


    container.innerHTML = `

        <div style="
            display:grid;
            grid-template-columns:
            repeat(auto-fit,minmax(180px,1fr));
            gap:15px;
        ">

            <div>

                <strong>
                    Productos
                </strong>

                <p>
                    ${inventory.length}
                </p>

            </div>


            <div>

                <strong>
                    Stock normal
                </strong>

                <p>
                    ${normalStock}
                </p>

            </div>


            <div>

                <strong>
                    Stock bajo
                </strong>

                <p>
                    ${lowStock.length}
                </p>

            </div>


            <div>

                <strong>
                    Unidades totales
                </strong>

                <p>
                    ${totalUnits}
                </p>

            </div>

        </div>

    `;

}


/* ============================================================
   INICIALIZAR DASHBOARD
============================================================ */

function initializeDynamicDashboard() {

    updateDashboardIndicators();

}


/* ============================================================
   ACTUALIZACIÓN AUTOMÁTICA
============================================================ */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeDynamicDashboard
    );

} else {

    initializeDynamicDashboard();

}
