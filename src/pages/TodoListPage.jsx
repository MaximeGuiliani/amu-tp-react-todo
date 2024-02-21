// src/pages/TodoListPage.js

import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import TodoList from "../components/TodoList";
import { useEffect } from "react";


import { addTaskToApi, loadTasksFromApi,toggleTaskInApi} from "../api/http";


const TodoListPage = () => {

  const [state, setState] = useState([]);

  useEffect(() => {
    // Appel HTTP vers Supabase
    loadTasksFromApi().then((items) => {
      // On remplace la valeur actuel de state
      // par le tableau d'items venant de l'API
      setState(items);
    });
  }, []);

  const toggle = (id) => {
    // Récupérons l'index de la tâche concernée
    const idx = state.findIndex((task) => task.id === id);

    // Créons une copie de la tâche concernée
    const item = { ...state[idx] };

    // Appel HTTP en PATCH pour modifier la tâche
    toggleTaskInApi(id, !item.done).then(() => {
      // Lorsque le serveur a pris en compte la demande et nous a répond
      // Nous modifions notre copie de tâche :
      item.done = !item.done;

      // Créons une copie du tableau d'origine
      const stateCopy = [...state];
      // Enfin remplaçons la tâche originale par la copie :
      stateCopy[idx] = item;
      // Et faisons évoluer le state : l'ancien tableau sera
      // remplacé par le nouveau, et le rendu sera déclenché à nouveau
      setState(stateCopy);
    });
  };
  const addNewTask = (text) => {
    // Créons une nouvelle tâche avec le text tapé dans l'input
    const task = {
      text: text,
      done: false,
    };

    addTaskToApi(task).then((savedTask) => {
      // Remplaçons le tableau de tâches actuel par une copie
      // qui contiendra en plus la nouvelle tâche :
      setState([...state, savedTask]);
    });
  };

  return (
    <>
      <TodoList tasks={state} onTaskToggle={toggle} />
      <TaskForm onTaskAdded={addNewTask} />
    </>
  );
};

export default TodoListPage;
