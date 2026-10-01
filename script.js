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
