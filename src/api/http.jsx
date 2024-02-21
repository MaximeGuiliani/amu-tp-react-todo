const SUPABASE_URL = "https://owxvghipttsumolkqwmf.supabase.co/rest/v1/todos";
const SUPABASE_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im93eHZnaGlwdHRzdW1vbGtxd21mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzNTE0MDgsImV4cCI6MjAyMzkyNzQwOH0.vnBMSn8pf8lJH8oGisLy3hTx73CmnwCRc3v0zQavczc";

/**
 * Permet de modifier le statut de la tâche dans l'API
 * @param {number} id
 * @param {boolean} status
 * @returns Promise<{id: number, done: boolean, text: string}>
 */
const toggleTaskInApi = (id, status) => {
  return fetch(`${SUPABASE_URL}?id=eq.${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      apiKey: SUPABASE_API_KEY,
      Prefer: "return=representation",
    },
    body: JSON.stringify({ done: status }),
  });
};

/**
 * Ajoute une tâche dans l'API
 * @param {{text: string, done: boolean}} task
 * @returns Promise<{id: number, text: string, done: boolean}>
 */
const addTaskToApi = (task) => {
  return fetch(SUPABASE_URL, {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      "Content-Type": "application/json",
      apiKey: SUPABASE_API_KEY,
      Prefer: "return=representation",
    },
  })
    .then((response) => response.json())
    .then((items) => items[0]);
};

/**
 * Récupère les donnes des tâches à partir de l'API
 * @returns Promise<Array<{id: number, text: string, done: boolean}>>
 */
const loadTasksFromApi = () => {
  return fetch(`${SUPABASE_URL}?order=created_at`, {
    headers: {
      apiKey: SUPABASE_API_KEY,
    },
  }).then((response) => response.json());
};


 const loadTaskFromApi = (id) => {
  return fetch(`${SUPABASE_URL}?id=eq.${id}`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          apiKey: SUPABASE_API_KEY,
          Prefer: "return=representation",
      }
  })
      .then(response => response.json())
      // La réponse contenant un tableau des tâches correspondantes
      // Nous ne retournons que la première (et la seule)
      .then(tasks => tasks[0]);
}
export default toggleTaskInApi;
export { addTaskToApi, loadTasksFromApi, toggleTaskInApi,loadTaskFromApi };
