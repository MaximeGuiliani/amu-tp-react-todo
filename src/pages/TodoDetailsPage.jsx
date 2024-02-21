import React, { useEffect, useState } from "react";
import { loadTaskFromApi } from "../api/http";
import { Link, useParams } from "react-router-dom";

const TodoDetailsPage = () => {
    const [task, setTask] = useState(null);


    const params = useParams();

    const id = +params.id;


    useEffect(() => {

        loadTaskFromApi(id)
            .then(apiTask => setTask(apiTask));
    }, [id])
    return task ?
        <>
            <h2>{task.text}</h2>
            <strong>Statut : </strong>
            {task.done ? "Fait" : "Pas fait"}
            <br />
            <Link to="/">Retour aux tâches</Link>
        </>
        :
        <p>Chargement en cours</p>
}

export default TodoDetailsPage;