const tareas = document.querySelector(".listado-pendientes");

if(tareas){
    tareas.addEventListener("click", event => {
        // console.log(event.target.classList);
        if(event.target.classList.contains("fa-check-circle")){
            // console.log("Actualizando...");
            const icono = event.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;
            console.log(idTarea);
        }
    });
}

export default tareas;