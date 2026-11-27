// Validare pe server: datele de la client nu sunt niciodată de încredere.
export const ETICHETE = ["Formula Student", "Drift", "Private"];
const TITLU_MAX = 100;
const CAMPURI_OPTIONALE = ["descriere", "locatie", "data"];

// partial = true pentru PATCH (se verifică doar câmpurile trimise)
export function valideazaProiect(body, { partial = false } = {}) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      erori: ["Corpul cererii trebuie să fie un obiect JSON valid"],
      date: {},
    };
  }

  const erori = [];
  const date = {};

  if (!partial || body.titlu !== undefined) {
    if (typeof body.titlu !== "string" || body.titlu.trim() === "") {
      erori.push("titlu este obligatoriu");
    } else if (body.titlu.trim().length > TITLU_MAX) {
      erori.push(`titlu are maximum ${TITLU_MAX} de caractere`);
    } else {
      date.titlu = body.titlu.trim();
    }
  }

  if (!partial || body.eticheta !== undefined) {
    const eticheta = body.eticheta ?? ETICHETE[0];
    if (!ETICHETE.includes(eticheta)) {
      erori.push(`eticheta trebuie să fie una din: ${ETICHETE.join(", ")}`);
    } else {
      date.eticheta = eticheta;
    }
  }

  if (body.gata !== undefined) {
    if (typeof body.gata !== "boolean") {
      erori.push("gata trebuie să fie true sau false");
    } else {
      date.gata = body.gata;
    }
  } else if (!partial) {
    date.gata = false;
  }

  // Câmpuri opționale afișate pe pagina de detaliu (lista albă)
  for (const camp of CAMPURI_OPTIONALE) {
    if (body[camp] !== undefined) {
      if (typeof body[camp] !== "string") {
        erori.push(`${camp} trebuie să fie text`);
      } else {
        date[camp] = body[camp].trim();
      }
    }
  }

  return { erori, date };
}

// Id-urile din adresă vin ca text; se acceptă doar numere întregi pozitive
export function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}
