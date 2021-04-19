import axios from "axios";

const tareas = document.querySelector(".listado-pendientes");

if(tareas){
    tareas.addEventListener("click", event => {
        // console.log(event.target.classList);
        if(event.target.classList.contains("fa-check-circle")){
            // console.log("Actualizando...");
            const icono = event.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;
            // console.log(idTarea);

            //request hacia /tareas/:id
            const url = `${location.origin}/tareas/${idTarea}`;
            // console.log(url);

            axios.patch(url, { idTarea })
                .then(function(respuesta){
                    // console.log(respuesta);
                    if(respuesta.status === 200){
                        icono.classList.toggle("completo");
                    }
                });
        }
    });
}

export default tareas;