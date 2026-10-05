const PLATFORME = ["pc", "playstation", "xbox"];

const jocuri = [
    { id: 1, title: "Elden Ring", completed: false, platform: "pc" },
    { id: 2, title: "Resident Evil Requiem", completed: true, platform: "xbox" },
    { id: 3, title: "Assetto Corsa Competizione", completed: false, platform: "pc" }
];

function listeazaTitluri(lista) {
    return lista.map((joc) => joc.title);
}

function numaraActive(lista) {
    return lista.filter((joc) => !joc.completed).length;
}

function cautaDupaTitlu(lista, text) {
    const termen = text.trim().toLowerCase();
    return lista.filter((joc) => joc.title.toLowerCase().includes(termen));
}

function valideazaJoc(title, platform) {
    if (typeof title !== "string" || title.trim() === "") {
        throw new Error("Titlul jocului este obligatoriu.");
    }
    if (title.trim().length > 100) {
        throw new Error("Titlul jocului nu poate depasi 100 de caractere.");
    }
    if (!PLATFORME.includes(platform)) {
        throw new Error(`Platforma invalida. Foloseste: ${PLATFORME.join(", ")}.`);
    }
}

function adaugaJoc(lista, title, platform) {
    valideazaJoc(title, platform);

    const idNou = lista.reduce(
        (maxId, joc) => Math.max(maxId, joc.id),
        0
    ) + 1;

    return [
        ...lista,
        { id: idNou, title: title.trim(), completed: false, platform }
    ];
}

function comutaCompletarea(lista, id) {
    if (!lista.find((joc) => joc.id === id)) {
        throw new Error(`Nu exista niciun joc cu id-ul ${id}.`);
    }

    return lista.map((joc) => (
        joc.id === id
            ? { ...joc, completed: !joc.completed }
            : joc
    ));
}

function stergeJoc(lista, id) {
    return lista.filter((joc) => joc.id !== id);
}

console.log("--- Citire ---");
console.log("Titluri:", listeazaTitluri(jocuri).join(", "));
console.log("Active:", numaraActive(jocuri));
console.log(
    "Cautare 'ring':",
    listeazaTitluri(cautaDupaTitlu(jocuri, "ring")).join(", ")
);

console.log("--- Adaugare ---");
const listaCuJocNou = adaugaJoc(jocuri, "Hades II", "pc");
console.log("Lista noua:", listaCuJocNou.length, "jocuri");
console.log("Originalul a ramas cu:", jocuri.length, "jocuri");

console.log("--- Modificare si stergere ---");
const listaComutata = comutaCompletarea(listaCuJocNou, 1);
console.log("Dupa comutarea jocului 1, active:", numaraActive(listaComutata));
const listaFaraJoc = stergeJoc(listaComutata, 3);
console.log(
    "Dupa stergerea jocului 3:",
    listeazaTitluri(listaFaraJoc).join(", ")
);

console.log("--- Validare ---");
try {
    adaugaJoc(jocuri, "", "pc");
} catch (eroare) {
    console.error(eroare.message);
}

try {
    adaugaJoc(jocuri, "Joc invalid", "nintendo");
} catch (eroare) {
    console.error(eroare.message);
}
