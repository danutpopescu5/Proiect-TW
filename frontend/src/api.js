// Toate cererile HTTP stau aici; componentele nu apelează fetch direct.
export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

// Funcție comună: trimite JSON și aruncă eroare dacă răspunsul nu este 2xx
async function request(path, options = {}) {
    const res = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: { "Content-Type": "application/json", ...options.headers },
    });
    if (!res.ok) {
        throw new Error(`Eroare server: ${res.status}`);
    }
    // 204 No Content nu are corp
    return res.status === 204 ? null : res.json();
}

export function fetchProiecte() {
    return request("/proiecte");
}

export function fetchProiect(id) {
    return request(`/proiecte/${id}`);
}

export function createProiect(proiect) {
    return request("/proiecte", {
        method: "POST",
        body: JSON.stringify(proiect),
    });
}

export function updateProiect(id, changes) {
    return request(`/proiecte/${id}`, {
        method: "PATCH",
        body: JSON.stringify(changes),
    });
}

export function deleteProiect(id) {
    return request(`/proiecte/${id}`, { method: "DELETE" });
}

// Aliasuri generice pentru compatibilitate
export {
    fetchProiecte as fetchTasks,
    fetchProiect as fetchTask,
    createProiect as createTask,
    updateProiect as updateTask,
    deleteProiect as deleteTask,
};
