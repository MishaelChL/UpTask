import axios from "axios";
import Swal from "sweetalert2";
import {actualizarAvance} from "../funciones/avance";

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

                        actualizarAvance();
                    }
                });
        }
        if(event.target.classList.contains("fa-trash")){
            // console.log("Eliminando...");
            // console.log(event.target); /* parentElement sirve para ir al padre del elemento html te encuentres */
            const tareaHTML = event.target.parentElement.parentElement;
            const idTarea = tareaHTML.dataset.tarea;
            // console.log(tareaHTML);
            // console.log(idTarea);
            Swal.fire({
                title: "Deseas borrar esta Tarea?",
                text: "Una tarea eliminado no se puede recuperar!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, borrar",
                cancelButtonText: "No, cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    // console.log("Eliminando...");
                    const url = `${location.origin}/tareas/${idTarea}`;
                    axios.delete(url, { params: { idTarea } })
                        .then(function(respuesta){
                            // console.log(respuesta);
                            if(respuesta.status === 200){
                                //Eliminar el nodo
                                tareaHTML.parentElement.removeChild(tareaHTML);

                                //Opcional una alerta
                                Swal.fire(
                                    "Tarea Eliminada",
                                    respuesta.data,
                                    "success"
                                );

                                actualizarAvance();
                            }
                        });
                }
            });
        }
    });
}

export default tareas;