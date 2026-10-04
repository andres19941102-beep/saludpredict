```javascript
/* =====================================================
   SALUDPREDICT
   Gestión inteligente en salud
   JavaScript principal
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       NAVEGACIÓN
    ===================================================== */

    const navButtons = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".section");
    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menuBtn");

    navButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const sectionId = button.dataset.section;

            navButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            sections.forEach(function (section) {
                section.classList.remove("active-section");
            });

            const selectedSection = document.getElementById(sectionId);

            if (selectedSection) {
                selectedSection.classList.add("active-section");
            }

            if (sidebar) {
                sidebar.classList.remove("open");
            }

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    if (menuBtn && sidebar) {

        menuBtn.addEventListener("click", function () {
            sidebar.classList.toggle("open");
        });

    }


    /* =====================================================
       DATOS DE PACIENTES
    ===================================================== */

    let patients = JSON.parse(
        localStorage.getItem("saludpredict_patients")
    ) || [];


    const patientsTable = document.getElementById("patientsTable");
    const patientSearch = document.getElementById("patientSearch");

    const totalPatients = document.getElementById("totalPatients");
    const activePatients = document.getElementById("activePatients");
    const newPatients = document.getElementById("newPatients");
    const dashboardPatients = document.getElementById("dashboardPatients");


    function savePatients() {

        localStorage.setItem(
            "saludpredict_patients",
            JSON.stringify(patients)
        );

    }


    function updatePatientStats() {

        if (totalPatients) {
            totalPatients.textContent = patients.length;
        }

        const active = patients.filter(function (patient) {
            return patient.status === "Activo";
        }).length;

        if (activePatients) {
            activePatients.textContent = active;
        }

        /*
            Nuevos pacientes:
            para esta versión se cuentan los pacientes
            registrados durante la sesión/datos actuales.
        */
        if (newPatients) {
            newPatients.textContent = patients.length;
        }

        if (dashboardPatients) {

            const basePatients = 823;

            dashboardPatients.textContent =
                basePatients + patients.length;

        }

    }


    function renderPatients(searchTerm = "") {

        if (!patientsTable) {
            return;
        }

        const term = searchTerm.toLowerCase().trim();

        const filteredPatients = patients.filter(function (patient) {

            return (
                patient.document.toLowerCase().includes(term) ||
                patient.name.toLowerCase().includes(term) ||
                patient.service.toLowerCase().includes(term)
            );

        });


        patientsTable.innerHTML = "";


        if (filteredPatients.length === 0) {

            patientsTable.innerHTML = `
                <tr>
                    <td colspan="6" class="empty-row">
                        No hay pacientes registrados.
                    </td>
                </tr>
            `;

            return;
        }


        filteredPatients.forEach(function (patient) {

            const row = document.createElement("tr");

            const statusClass =
                patient.status === "Activo"
                    ? "status-active"
                    : "status-inactive";


            row.innerHTML = `

                <td>${escapeHTML(patient.document)}</td>

                <td>
                    <strong>${escapeHTML(patient.name)}</strong>
                </td>

                <td>${escapeHTML(patient.age)}</td>

                <td>${escapeHTML(patient.service)}</td>

                <td>
                    <span class="status ${statusClass}">
                        ${escapeHTML(patient.status)}
                    </span>
                </td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="action-btn"
                            onclick="editPatient('${patient.id}')"
                            title="Editar"
                        >
                            ✏️
                        </button>

                        <button
                            class="action-btn delete"
                            onclick="deletePatient('${patient.id}')"
                            title="Eliminar"
                        >
                            🗑️
                        </button>

                    </div>

                </td>

            `;

            patientsTable.appendChild(row);

        });

    }


    if (patientSearch) {

        patientSearch.addEventListener("input", function () {

            renderPatients(patientSearch.value);

        });

    }


    /* =====================================================
       MODAL PACIENTES
    ===================================================== */

    const patientModal = document.getElementById("patientModal");
    const newPatientBtn = document.getElementById("newPatientBtn");
    const closePatientModal =
        document.getElementById("closePatientModal");

    const cancelPatientBtn =
        document.getElementById("cancelPatientBtn");

    const patientForm =
        document.getElementById("patientForm");


    function openPatientModal() {

        if (!patientModal) {
            return;
        }

        patientModal.classList.add("show");

    }


    function closePatientModalFunction() {

        if (!patientModal) {
            return;
        }

        patientModal.classList.remove("show");

    }


    if (newPatientBtn) {

        newPatientBtn.addEventListener("click", function () {

            patientForm.reset();

            document.getElementById("patientId").value = "";

            document.getElementById("modalTitle").textContent =
                "Nuevo paciente";

            openPatientModal();

        });

    }


    if (closePatientModal) {

        closePatientModal.addEventListener(
            "click",
            closePatientModalFunction
        );

    }


    if (cancelPatientBtn) {

        cancelPatientBtn.addEventListener(
            "click",
            closePatientModalFunction
        );

    }


    if (patientForm) {

        patientForm.addEventListener("submit", function (event) {

            event.preventDefault();


            const id =
                document.getElementById("patientId").value ||
                Date.now().toString();


            const patient = {

                id: id,

                document:
                    document.getElementById("patientDocument").value
                    .trim(),

                name:
                    document.getElementById("patientName").value
                    .trim(),

                age:
                    document.getElementById("patientAge").value,

                service:
                    document.getElementById("patientService").value,

                status:
                    document.getElementById("patientStatus").value

            };


            const existingIndex = patients.findIndex(function (item) {
                return item.id === id;
            });


            if (existingIndex >= 0) {

                patients[existingIndex] = patient;

            } else {

                patients.push(patient);

            }


            savePatients();
            renderPatients();
            updatePatientStats();

            closePatientModalFunction();

            patientForm.reset();

        });

    }


    window.editPatient = function (id) {

        const patient = patients.find(function (item) {
            return item.id === id;
        });

        if (!patient) {
            return;
        }


        document.getElementById("patientId").value =
            patient.id;

        document.getElementById("patientDocument").value =
            patient.document;

        document.getElementById("patientName").value =
            patient.name;

        document.getElementById("patientAge").value =
            patient.age;

        document.getElementById("patientService").value =
            patient.service;

        document.getElementById("patientStatus").value =
            patient.status;

        document.getElementById("modalTitle").textContent =
            "Editar paciente";


        openPatientModal();

    };


    window.deletePatient = function (id) {

        const patient = patients.find(function (item) {
            return item.id === id;
        });

        if (!patient) {
            return;
        }


        const confirmed = confirm(
            "¿Deseas eliminar al paciente " +
            patient.name +
            "?"
        );


        if (!confirmed) {
            return;
        }


        patients = patients.filter(function (item) {
            return item.id !== id;
        });


        savePatients();
        renderPatients();
        updatePatientStats();

    };


    /* =====================================================
       DATOS DE SERVICIOS
    ===================================================== */

    let services = JSON.parse(
        localStorage.getItem("saludpredict_services")
    ) || [];


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


    function saveServices() {

        localStorage.setItem(
            "saludpredict_services",
            JSON.stringify(services)
        );

    }


    function formatCurrency(value) {

        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0
        }).format(Number(value) || 0);

    }


    function updateServiceStats() {

        if (totalServices) {

            totalServices.textContent =
                services.length;

        }


        const active = services.filter(function (service) {

            return service.status === "Activo";

        }).length;


        if (activeServices) {

            activeServices.textContent = active;

        }


        const totalValue = services.reduce(
            function (sum, service) {

                return sum + Number(service.price || 0);

            },
            0
        );


        const average =
            services.length > 0
                ? totalValue / services.length
                : 0;


        if (averageServicePrice) {

            averageServicePrice.textContent =
                formatCurrency(average);

        }

    }


    function renderServices(searchTerm = "") {

        if (!servicesTable) {
            return;
        }


        const term =
            searchTerm.toLowerCase().trim();


        const filteredServices =
            services.filter(function (service) {

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


        servicesTable.innerHTML = "";


        if (filteredServices.length === 0) {

            servicesTable.innerHTML = `

                <tr>

                    <td colspan="7" class="empty-row">

                        No hay servicios registrados.
                        Haz clic en "+ Nuevo servicio"
                        para agregar el primero.

                    </td>

                </tr>

            `;

            return;

        }


        filteredServices.forEach(function (service) {

            const row =
                document.createElement("tr");


            const statusClass =
                service.status === "Activo"
                    ? "status-active"
                    : "status-inactive";


            row.innerHTML = `

                <td>
                    <strong>
                        ${escapeHTML(service.code)}
                    </strong>
                </td>

                <td>
                    ${escapeHTML(service.name)}
                </td>

                <td>
                    ${escapeHTML(service.category)}
                </td>

                <td>
                    ${escapeHTML(service.duration)}
                </td>

                <td>
                    ${formatCurrency(service.price)}
                </td>

                <td>

                    <span class="status ${statusClass}">
                        ${escapeHTML(service.status)}
                    </span>

                </td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="action-btn"
                            onclick="editService('${service.id}')"
                            title="Editar servicio"
                        >
                            ✏️
                        </button>

                        <button
                            class="action-btn delete"
                            onclick="deleteService('${service.id}')"
                            title="Eliminar servicio"
                        >
                            🗑️
                        </button>

                    </div>

                </td>

            `;


            servicesTable.appendChild(row);

        });

    }


    if (serviceSearch) {

        serviceSearch.addEventListener(
            "input",
            function () {

                renderServices(
                    serviceSearch.value
                );

            }
        );

    }


    /* =====================================================
       MODAL SERVICIOS
    ===================================================== */

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


    function openServiceModal() {

        if (!serviceModal) {
            return;
        }

        serviceModal.classList.add("show");

    }


    function closeServiceModalFunction() {

        if (!serviceModal) {
            return;
        }

        serviceModal.classList.remove("show");

    }


    if (newServiceBtn) {

        newServiceBtn.addEventListener(
            "click",
            function () {

                serviceForm.reset();

                document.getElementById(
                    "serviceId"
                ).value = "";

                document.getElementById(
                    "serviceModalTitle"
                ).textContent =
                    "Nuevo servicio";


                document.getElementById(
                    "serviceStatus"
                ).value = "Activo";


                openServiceModal();

            }
        );

    }


    if (closeServiceModal) {

        closeServiceModal.addEventListener(
            "click",
            closeServiceModalFunction
        );

    }


    if (cancelServiceBtn) {

        cancelServiceBtn.addEventListener(
            "click",
            closeServiceModalFunction
        );

    }


    if (serviceForm) {

        serviceForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const id =
                    document.getElementById(
                        "serviceId"
                    ).value ||
                    Date.now().toString();


                const service = {

                    id: id,

                    code:
                        document.getElementById(
                            "serviceCode"
                        ).value
                        .trim()
                        .toUpperCase(),

                    name:
                        document.getElementById(
                            "serviceName"
                        ).value
                        .trim(),

                    category:
                        document.getElementById(
                            "serviceCategory"
                        ).value,

                    duration:
                        document.getElementById(
                            "serviceDuration"
                        ).value
                        .trim(),

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


                const duplicateCode =
                    services.some(function (item) {

                        return (
                            item.code === service.code &&
                            item.id !== service.id
                        );

                    });


                if (duplicateCode) {

                    alert(
                        "Ya existe un servicio con ese código."
                    );

                    return;

                }


                const existingIndex =
                    services.findIndex(
                        function (item) {

                            return item.id === id;

                        }
                    );


                if (existingIndex >= 0) {

                    services[existingIndex] =
                        service;

                } else {

                    services.push(service);

                }


                saveServices();
                renderServices();
                updateServiceStats();

                closeServiceModalFunction();

                serviceForm.reset();

            }
        );

    }


    window.editService = function (id) {

        const service =
            services.find(function (item) {

                return item.id === id;

            });


        if (!service) {
            return;
        }


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


        document.getElementById(
            "serviceModalTitle"
        ).textContent =
            "Editar servicio";


        openServiceModal();

    };


    window.deleteService = function (id) {

        const service =
            services.find(function (item) {

                return item.id === id;

            });


        if (!service) {
            return;
        }


        const confirmed =
            confirm(
                "¿Deseas eliminar el servicio " +
                service.name +
                "?"
            );


        if (!confirmed) {
            return;
        }


        services =
            services.filter(function (item) {

                return item.id !== id;

            });


        saveServices();
        renderServices();
        updateServiceStats();

    };


    /* =====================================================
       CERRAR MODALES AL HACER CLIC AFUERA
    ===================================================== */

    window.addEventListener(
        "click",
        function (event) {

            if (
                event.target === patientModal
            ) {

                closePatientModalFunction();

            }


            if (
                event.target === serviceModal
            ) {

                closeServiceModalFunction();

            }

        }
    );


    /* =====================================================
       FUNCIÓN DE SEGURIDAD PARA TEXTO HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       INICIALIZACIÓN
    ===================================================== */

    renderPatients();
    updatePatientStats();

    renderServices();
    updateServiceStats();


    console.log(
        "SALUDPREDICT cargado correctamente."
    );

});
```

