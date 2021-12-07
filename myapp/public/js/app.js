
let url = window.location.href + 'api/';
console.log(url);

let selectedRow = null;

class Empleado {
    constructor(idEmpleado, nombreCompleto, cargo, departamento) {
        this.idEmpleado = idEmpleado;
        this.nombreCompleto = nombreCompleto;
        this.cargo = cargo;
        this.departamento = departamento;
    }
}

class UI {

    static displayemployee() {

        fetch(url+'listar', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }}).then(response => {

            if (response.status !== 200) {
                console.log('Problema en el código: ' + response.status);
                return;
            }

            response.json().then(function(response) {

                const employee = response.data;
                employee.forEach((book) => UI.AddEmployeeToList(book));
            });
        })
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
    }

    static AddEmployeeToList(employee) {

        const list = document.querySelector("#employee-list");
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.idEmpleado}</td>
            <td>${employee.nombreCompleto}</td>
            <td>${employee.cargo}</td>
            <td>${employee.departamento}</td>
            <td><a href="#" class="btn btn-success btn-sm edit">Editar</a></td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Borrar</a></td>
        `;
        list.appendChild(row);
    }

    // Proceso de Guardar
    static editEmployeeToList(employee) {

        selectedRow.children[1].textContent = employee.nombreCompleto;
        selectedRow.children[2].textContent = employee.cargo;
        selectedRow.children[3].textContent = employee.departamento;

        document.querySelector(".sumbit_btn").value = "Guardar";
        document.querySelector(".sumbit_btn").classList ="btn btn-success btn-block add-btn sumbit_btn";
    }

    //Proceso de Borrar
    static deleteEmpyee(el) {

        const idEmpleado = el.parentElement.parentElement.getElementsByTagName('td')[0].innerText;

        let id = {
            idEmpleado : idEmpleado
        };

        if (el.classList.contains("delete")) {

            fetch(url+'eliminar', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(id)
            }).then(response => {

                response.json().then(function(response) {

                    console.log(response);

                    if(response.status){
                        el.parentElement.parentElement.remove();
                        UI.showAlert("Empleado Eliminado", "danger");
                    }
                });
            })
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
        }
        else {
            null;
        }
    }

    // Mostar en los inpus
    static editEmployee(el) {

        if (el.classList.contains("edit")) {

            //Selecciono el registro padre
            selectedRow = el.parentElement.parentElement;
            document.querySelector("#idemp").value = selectedRow.children[0].textContent;
            document.querySelector("#nombcomp").value = selectedRow.children[1].textContent;
            document.querySelector("#cargo").value = selectedRow.children[2].textContent;
            document.querySelector("#depto").value = selectedRow.children[3].textContent;

            document.querySelector(".sumbit_btn").value = "Actualizar";
            document.querySelector(".sumbit_btn").classList = "btn btn-primary btn-block add-btn sumbit_btn";
        } else {
            null;
        }
    }

    // Mensaje Toast
    static showAlert(message, className) {

        const div = document.createElement("div");
        div.className = `alert alert-${className} animate__animated animate__bounce`;

        div.appendChild(document.createTextNode(message));

        const container = document.querySelector(".container");
        const main = document.querySelector(".main");

        container.insertBefore(div, container.firstElementChild);
        div.style.position = "absolute";
        div.style.top = "30px";
        div.style.left = "90%";
        setTimeout(() => document.querySelector(".alert").remove(), 2000);
    }

    // Limpiar Campos
    static clearFields() {
        document.querySelector("#idemp").value = "";
        document.querySelector("#nombcomp").value = "";
        document.querySelector("#cargo").value = "";
        document.querySelector("#depto").value = "";
    }
}
//  fin de UI CLASS

document.addEventListener("DOMContentLoaded", UI.displayemployee);

// Proceso Guardar Empleado
document.querySelector("#employee-form").addEventListener("submit", (e) => {

    e.preventDefault();

    const idEmpleado = document.querySelector("#idemp").value;
    const nombreCompleto = document.querySelector("#nombcomp").value;
    const cargo = document.querySelector("#cargo").value;
    const departamento = document.querySelector("#depto").value;

    if (nombreCompleto === "" || cargo === "" || departamento === "") {
        UI.showAlert("Por favor, rellene todos los campos", "danger");
    }
    else {

        const employee = new Empleado(idEmpleado, nombreCompleto, cargo, departamento);

        // Si procede a insertar
        if (selectedRow == null) {

            // Una posible solución
            const list = document.querySelector("#employee-list");
            list.innerHTML = "";

            fetch(url+'insertar', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            }).then(response => {

                UI.displayemployee();
                //response.json().then(function(response) {
                    //UI.ClearEmployeeToList();

                    //UI.AddEmployeeToList(response.data);
                    selectedRow = null;
                    UI.showAlert("Empeado Añadido", "success");
                //});
            })
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
        }
        // Si procede a actualizar
        else {

            fetch(url+'actualizar', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(employee)
            }).then(response => {

                UI.editEmployeeToList(employee);
                selectedRow = null;
                UI.showAlert("Empleado Editado", "info");
            })
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });

        }
        UI.clearFields();
    }
});

//Ejecuto el final de los eventos click
document.querySelector("#employee-list").addEventListener("click", (e) => {

    e.preventDefault();
    UI.editEmployee(e.target);
    UI.deleteEmpyee(e.target);

    console.log(e.target);
});
