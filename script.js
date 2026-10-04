/* =====================================
   SALUDPREDICT
   JAVASCRIPT PRINCIPAL
===================================== */


/* =====================================
   DATOS INICIALES
===================================== */

const defaultPatients = [

    {
        id: 1,
        document: "10234567",
        name: "Juan Pérez",
        age: 42,
        service: "Medicina general",
        status: "Activo"
    },

    {
        id: 2,
        document: "52345678",
        name: "María Gómez",
        age: 35,
        service: "Consulta externa",
        status: "Activo"
    },

    {
        id: 3,
        document: "80123456",
        name: "Carlos Rodríguez",
        age: 58,
        service: "Urgencias",
        status: "Activo"
    },

    {
        id: 4,
        document: "107890123",
        name: "Laura Martínez",
        age: 29,
        service: "Odontología",
        status: "Inactivo"
    }

];


/* =====================================
   CARGAR PACIENTES
===================================== */

let patients = JSON.parse(
    localStorage.getItem("saludpredict_patients")
);

if (!patients || !Array.isArray(patients)) {

    patients = defaultPatients;

    savePatients();

}


/* =====================================
   GUARDAR PACIENTES
===================================== */

function savePatients() {

    localStorage.setItem(
        "saludpredict_patients",
        JSON.stringify(patients)
    );

}


/* =====================================
   ELEMENTOS DEL DOM
===================================== */

const navItems =
    document.querySelectorAll(".nav-item");

const sections =
    document.querySelectorAll(".section");

const sidebar =
    document.getElementById("sidebar");

const menuBtn =
    document.getElementById("menuBtn");


/* =====================================
   NAVEGACIÓN
===================================== */

navItems.forEach(button => {

    button.addEventListener("click", () => {

        const sectionId =
            button.dataset.section;


        /* Quitar activo de todos */

        navItems.forEach(item => {

            item.classList.remove("active");

        });


        /* Activar botón */

        button.classList.add("active");


        /* Ocultar secciones */

        sections.forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


        /* Mostrar sección seleccionada */

        const selectedSection =
            document.getElementById(sectionId);


        if (selectedSection) {

            selectedSection.classList.add(
                "active-section"
            );

        }


        /* Cerrar menú móvil */

        sidebar.classList.remove("show");

    });

});


/* =====================================
   MENÚ MÓVIL
===================================== */

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("show");

    });

}


/* =====================================
   ELEMENTOS DEL MÓDULO PACIENTES
===================================== */

const patientsTable =
    document.getElementById("patientsTable");

const patientSearch =
    document.getElementById("patientSearch");

const totalPatients =
    document.getElementById("totalPatients");

const activePatients =
    document.getElementById("activePatients");

const newPatients =
    document.getElementById("newPatients");

const dashboardPatients =
    document.getElementById("dashboardPatients");


const patientModal =
    document.getElementById("patientModal");

const newPatientBtn =
    document.getElementById("newPatientBtn");

const closeModal =
    document.getElementById("closeModal");

const cancelModal =
    document.getElementById("cancelModal");

const patientForm =
    document.getElementById("patientForm");

const modalTitle =
    document.getElementById("modalTitle");


/* =====================================
   CAMPOS DEL FORMULARIO
===================================== */

const patientId =
    document.getElementById("patientId");

const documentInput =
    document.getElementById("document");

const nameInput =
    document.getElementById("name");

const ageInput =
    document.getElementById("age");

const serviceInput =
    document.getElementById("service");

const statusInput =
    document.getElementById("status");


/* =====================================
   MOSTRAR PACIENTES
===================================== */

function renderPatients(searchTerm = "") {

    patientsTable.innerHTML = "";


    const term =
        searchTerm.toLowerCase().trim();


    const filteredPatients =
        patients.filter(patient => {

            return (

                patient.document
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


    if (filteredPatients.length === 0) {

        patientsTable.innerHTML = `

            <tr>

                <td colspan="6"
                    style="text-align:center;padding:30px;color:#6b7280;">

                    No se encontraron pacientes.

                </td>

            </tr>

        `;

        return;

    }


    filteredPatients.forEach(patient => {

        const row =
            document.createElement("tr");


        const statusClass =
            patient.status === "Activo"
                ? "active"
                : "inactive";


        row.innerHTML = `

            <td>
                ${patient.document}
            </td>

            <td>
                <strong>
                    ${patient.name}
                </strong>
            </td>

            <td>
                ${patient.age}
            </td>

            <td>
                ${patient.service}
            </td>

            <td>

                <span class="status ${statusClass}">
                    ${patient.status}
                </span>

            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn edit-btn"
                        onclick="editPatient(${patient.id})"
                    >
                        ✏️ Editar
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deletePatient(${patient.id})"
                    >
                        🗑️
                    </button>

                </div>

            </td>

        `;


        patientsTable.appendChild(row);

    });


    updateStatistics();

}


/* =====================================
   ACTUALIZAR ESTADÍSTICAS
===================================== */

function updateStatistics() {

    const total =
        patients.length;


    const active =
        patients.filter(
            patient => patient.status === "Activo"
        ).length;


    totalPatients.textContent =
        total;


    activePatients.textContent =
        active;


    newPatients.textContent =
        total;


    dashboardPatients.textContent =
        total;

}


/* =====================================
   ABRIR MODAL NUEVO PACIENTE
===================================== */

function openNewPatientModal() {

    patientForm.reset();

    patientId.value = "";

    modalTitle.textContent =
        "Nuevo paciente";

    patientModal.classList.add("show");

}


/* =====================================
   CERRAR MODAL
===================================== */

function closePatientModal() {

    patientModal.classList.remove("show");

    patientForm.reset();

    patientId.value = "";

}


/* =====================================
   BOTÓN NUEVO PACIENTE
===================================== */

newPatientBtn.addEventListener(
    "click",
    openNewPatientModal
);


/* =====================================
   BOTONES CERRAR
===================================== */

closeModal.addEventListener(
    "click",
    closePatientModal
);


cancelModal.addEventListener(
    "click",
    closePatientModal
);


/* =====================================
   CERRAR MODAL AL HACER CLIC AFUERA
===================================== */

patientModal.addEventListener(
    "click",
    event => {

        if (event.target === patientModal) {

            closePatientModal();

        }

    }
);


/* =====================================
   GUARDAR PACIENTE
===================================== */

patientForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const id =
            patientId.value;


        const newPatient = {

            id: id
                ? Number(id)
                : Date.now(),

            document:
                documentInput.value.trim(),

            name:
                nameInput.value.trim(),

            age:
                Number(ageInput.value),

            service:
                serviceInput.value,

            status:
                statusInput.value

        };


        /* Validar documento */

        if (!newPatient.document) {

            alert(
                "Por favor ingrese el documento."
            );

            return;

        }


        /* EDITAR */

        if (id) {

            const index =
                patients.findIndex(
                    patient =>
                        patient.id === Number(id)
                );


            if (index !== -1) {

                patients[index] =
                    newPatient;

            }

        }


        /* CREAR */

        else {

            patients.push(newPatient);

        }


        savePatients();

        renderPatients();

        closePatientModal();


        alert(
            "Paciente guardado correctamente."
        );

    }
);


/* =====================================
   EDITAR PACIENTE
===================================== */

function editPatient(id) {

    const patient =
        patients.find(
            item => item.id === id
        );


    if (!patient) {

        return;

    }


    patientId.value =
        patient.id;

    documentInput.value =
        patient.document;

    nameInput.value =
        patient.name;

    ageInput.value =
        patient.age;

    serviceInput.value =
        patient.service;

    statusInput.value =
        patient.status;


    modalTitle.textContent =
        "Editar paciente";


    patientModal.classList.add("show");

}


/* =====================================
   ELIMINAR PACIENTE
===================================== */

function deletePatient(id) {

    const patient =
        patients.find(
            item => item.id === id
        );


    if (!patient) {

        return;

    }


    const confirmation =
        confirm(
            `¿Está seguro de eliminar al paciente ${patient.name}?`
        );


    if (!confirmation) {

        return;

    }


    patients =
        patients.filter(
            item => item.id !== id
        );


    savePatients();

    renderPatients();


    alert(
        "Paciente eliminado correctamente."
    );

}


/* =====================================
   BUSCADOR
===================================== */

patientSearch.addEventListener(
    "input",
    () => {

        renderPatients(
            patientSearch.value
        );

    }
);


/* =====================================
   INICIALIZAR
===================================== */

renderPatients();

updateStatistics();
/* =====================================
   SALUDPREDICT
   MÓDULO DE SERVICIOS
===================================== */


/* =====================================
   SERVICIOS INICIALES
===================================== */

const defaultServices = [

    {
        id: 1,
        code: "SER-001",
        name: "Medicina general",
        category: "Consulta",
        duration: "30 min",
        price: 85000,
        status: "Activo"
    },

    {
        id: 2,
        code: "SER-002",
        name: "Consulta externa",
        category: "Consulta",
        duration: "30 min",
        price: 75000,
        status: "Activo"
    },

    {
        id: 3,
        code: "SER-003",
        name: "Atención de urgencias",
        category: "Urgencias",
        duration: "60 min",
        price: 120000,
        status: "Activo"
    },

    {
        id: 4,
        code: "SER-004",
        name: "Hospitalización",
        category: "Hospitalización",
        duration: "24 horas",
        price: 350000,
        status: "Activo"
    },

    {
        id: 5,
        code: "SER-005",
        name: "Odontología general",
        category: "Odontología",
        duration: "45 min",
        price: 90000,
        status: "Activo"
    },

    {
        id: 6,
        code: "SER-006",
        name: "Laboratorio clínico",
        category: "Diagnóstico",
        duration: "20 min",
        price: 45000,
        status: "Activo"
    }

];


/* =====================================
   CARGAR SERVICIOS
===================================== */

let services = JSON.parse(
    localStorage.getItem("saludpredict_services")
);


if (!services || !Array.isArray(services)) {

    services = defaultServices;

    saveServices();

}


/* =====================================
   GUARDAR SERVICIOS
===================================== */

function saveServices() {

    localStorage.setItem(
        "saludpredict_services",
        JSON.stringify(services)
    );

}


/* =====================================
   ELEMENTOS DEL DOM
===================================== */

const servicesTable =
    document.getElementById("servicesTable");

const serviceSearch =
    document.getElementById("serviceSearch");

const totalServices =
    document.getElementById("totalServices");

const activeServices =
    document.getElementById("activeServices");

const averageServicePrice =
    document.getElementById("averageServicePrice");

const serviceModal =
    document.getElementById("serviceModal");

const newServiceBtn =
    document.getElementById("newServiceBtn");

const closeServiceModal =
    document.getElementById("closeServiceModal");

const cancelServiceBtn =
    document.getElementById("cancelServiceBtn");

const serviceForm =
    document.getElementById("serviceForm");

const serviceModalTitle =
    document.getElementById("serviceModalTitle");


/* =====================================
   CAMPOS DEL FORMULARIO
===================================== */

const serviceId =
    document.getElementById("serviceId");

const serviceCode =
    document.getElementById("serviceCode");

const serviceName =
    document.getElementById("serviceName");

const serviceCategory =
    document.getElementById("serviceCategory");

const serviceDuration =
    document.getElementById("serviceDuration");

const servicePrice =
    document.getElementById("servicePrice");

const serviceStatus =
    document.getElementById("serviceStatus");


/* =====================================
   FORMATO MONEDA
===================================== */

function formatCurrency(value) {

    return new Intl.NumberFormat(
        "es-CO",
        {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0
        }
    ).format(value);

}


/* =====================================
   MOSTRAR SERVICIOS
===================================== */

function renderServices(searchTerm = "") {

    if (!servicesTable) {
        return;
    }


    servicesTable.innerHTML = "";


    const term =
        searchTerm.toLowerCase().trim();


    const filteredServices =
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


    if (filteredServices.length === 0) {

        servicesTable.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    style="
                        text-align:center;
                        padding:30px;
                        color:#6b7280;
                    "
                >

                    No se encontraron servicios.

                </td>

            </tr>

        `;

        return;

    }


    filteredServices.forEach(service => {

        const row =
            document.createElement("tr");


        const statusClass =
            service.status === "Activo"
                ? "active"
                : "inactive";


        row.innerHTML = `

            <td>
                <strong>
                    ${service.code}
                </strong>
            </td>

            <td>
                ${service.name}
            </td>

            <td>
                ${service.category}
            </td>

            <td>
                ${service.duration}
            </td>

            <td>
                ${formatCurrency(service.price)}
            </td>

            <td>

                <span class="status ${statusClass}">
                    ${service.status}
                </span>

            </td>

            <td>

                <div class="action-buttons">

                    <button
                        class="action-btn edit-btn"
                        onclick="editService(${service.id})"
                    >
                        ✏️ Editar
                    </button>

                    <button
                        class="action-btn delete-btn"
                        onclick="deleteService(${service.id})"
                    >
                        🗑️
                    </button>

                </div>

            </td>

        `;


        servicesTable.appendChild(row);

    });


    updateServiceStatistics();

}


/* =====================================
   ESTADÍSTICAS
===================================== */

function updateServiceStatistics() {

    if (!totalServices) {
        return;
    }


    const total =
        services.length;


    const active =
        services.filter(
            service => service.status === "Activo"
        ).length;


    const totalPrice =
        services.reduce(
            (sum, service) =>
                sum + Number(service.price || 0),
            0
        );


    const average =
        total > 0
            ? totalPrice / total
            : 0;


    totalServices.textContent =
        total;


    activeServices.textContent =
        active;


    averageServicePrice.textContent =
        formatCurrency(average);

}


/* =====================================
   ABRIR NUEVO SERVICIO
===================================== */

function openNewServiceModal() {

    serviceForm.reset();

    serviceId.value = "";

    serviceModalTitle.textContent =
        "Nuevo servicio";

    serviceStatus.value =
        "Activo";

    serviceModal.classList.add("show");

}


/* =====================================
   CERRAR MODAL
===================================== */

function closeServiceFormModal() {

    serviceModal.classList.remove("show");

    serviceForm.reset();

    serviceId.value = "";

}


/* =====================================
   EDITAR SERVICIO
===================================== */

function editService(id) {

    const service =
        services.find(
            item => item.id === id
        );


    if (!service) {
        return;
    }


    serviceId.value =
        service.id;

    serviceCode.value =
        service.code;

    serviceName.value =
        service.name;

    serviceCategory.value =
        service.category;

    serviceDuration.value =
        service.duration;

    servicePrice.value =
        service.price;

    serviceStatus.value =
        service.status;


    serviceModalTitle.textContent =
        "Editar servicio";


    serviceModal.classList.add("show");

}


/* =====================================
   ELIMINAR SERVICIO
===================================== */

function deleteService(id) {

    const service =
        services.find(
            item => item.id === id
        );


    if (!service) {
        return;
    }


    const confirmation =
        confirm(
            `¿Está seguro de eliminar el servicio "${service.name}"?`
        );


    if (!confirmation) {
        return;
    }


    services =
        services.filter(
            item => item.id !== id
        );


    saveServices();

    renderServices();


    alert(
        "Servicio eliminado correctamente."
    );

}


/* =====================================
   GUARDAR SERVICIO
===================================== */

if (serviceForm) {

    serviceForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const id =
                serviceId.value;


            const code =
                serviceCode.value
                    .trim()
                    .toUpperCase();


            const name =
                serviceName.value
                    .trim();


            const category =
                serviceCategory.value;


            const duration =
                serviceDuration.value
                    .trim();


            const price =
                Number(servicePrice.value);


            const status =
                serviceStatus.value;


            if (
                !code ||
                !name ||
                !category ||
                !duration ||
                price < 0
            ) {

                alert(
                    "Por favor complete todos los campos."
                );

                return;

            }


            const duplicated =
                services.find(
                    service =>
                        service.code.toUpperCase() === code
                        &&
                        String(service.id) !== String(id)
                );


            if (duplicated) {

                alert(
                    "Ya existe un servicio con ese código."
                );

                return;

            }


            if (id) {

                const index =
                    services.findIndex(
                        service =>
                            String(service.id) === String(id)
                    );


                if (index !== -1) {

                    services[index] = {

                        ...services[index],

                        code,
                        name,
                        category,
                        duration,
                        price,
                        status

                    };

                }

            } else {

                const newId =
                    services.length > 0
                        ? Math.max(
                            ...services.map(
                                service => Number(service.id)
                            )
                        ) + 1
                        : 1;


                services.push({

                    id: newId,
                    code,
                    name,
                    category,
                    duration,
                    price,
                    status

                });

            }


            saveServices();

            renderServices();

            closeServiceFormModal();


            alert(
                id
                    ? "Servicio actualizado correctamente."
                    : "Servicio creado correctamente."
            );

        }
    );

}


/* =====================================
   BOTÓN NUEVO SERVICIO
===================================== */

if (newServiceBtn) {

    newServiceBtn.addEventListener(
        "click",
        openNewServiceModal
    );

}


/* =====================================
   BOTONES CERRAR / CANCELAR
===================================== */

if (closeServiceModal) {

    closeServiceModal.addEventListener(
        "click",
        closeServiceFormModal
    );

}


if (cancelServiceBtn) {

    cancelServiceBtn.addEventListener(
        "click",
        closeServiceFormModal
    );

}


/* =====================================
   CERRAR AL HACER CLIC AFUERA
===================================== */

if (serviceModal) {

    serviceModal.addEventListener(
        "click",
        function(event) {

            if (event.target === serviceModal) {

                closeServiceFormModal();

            }

        }
    );

}


/* =====================================
   BUSCADOR DE SERVICIOS
===================================== */

if (serviceSearch) {

    serviceSearch.addEventListener(
        "input",
        function() {

            renderServices(
                serviceSearch.value
            );

        }
    );

}


/* =====================================
   INICIALIZAR SERVICIOS
===================================== */

renderServices();

updateServiceStatistics();
/* =====================================
   CONECTAR SERVICIOS CON PACIENTES
===================================== */

function updatePatientServiceOptions(currentService = "") {

    if (!serviceInput) {
        return;
    }

    serviceInput.innerHTML = `
        <option value="">
            Seleccione un servicio...
        </option>
    `;

    /*
       Obtener servicios activos
    */

    const activeServices = services.filter(
        service => service.status === "Activo"
    );

    /*
       Crear las opciones
    */

    activeServices.forEach(service => {

        const option =
            document.createElement("option");

        option.value =
            service.name;

        option.textContent =
            service.name;

        serviceInput.appendChild(option);

    });

    /*
       Si estamos editando un paciente
       cuyo servicio ya no está activo,
       conservamos temporalmente su servicio.
    */

    if (
        currentService &&
        !activeServices.some(
            service =>
                service.name === currentService
        )
    ) {

        const oldOption =
            document.createElement("option");

        oldOption.value =
            currentService;

        oldOption.textContent =
            currentService +
            " (servicio anterior)";

        serviceInput.appendChild(oldOption);

    }

    /*
       Seleccionar el servicio actual
    */

    if (currentService) {

        serviceInput.value =
            currentService;

    }

}


/* =====================================
   ACTUALIZAR SERVICIOS AL ABRIR PACIENTES
===================================== */

const originalOpenNewPatientModal =
    openNewPatientModal;

openNewPatientModal = function () {

    updatePatientServiceOptions();

    originalOpenNewPatientModal();

};


/* =====================================
   ACTUALIZAR SERVICIOS AL EDITAR
===================================== */

const originalEditPatient =
    editPatient;

editPatient = function (id) {

    const patient =
        patients.find(
            item => item.id === id
        );

    if (!patient) {
        return;
    }

    updatePatientServiceOptions(
        patient.service
    );

    originalEditPatient(id);

};


/* =====================================
   ACTUALIZAR SERVICIOS DESPUÉS DE
   CAMBIOS EN EL MÓDULO SERVICIOS
===================================== */

if (typeof renderServices === "function") {

    renderServices();

    updateServiceStatistics();

}


/* =====================================
   INICIALIZAR SELECTOR DE SERVICIOS
===================================== */

updatePatientServiceOptions();
