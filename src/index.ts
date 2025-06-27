import { doubleMetaphone, normalizeString, stem } from './metaphone';
import { people } from './people';

const input = document.getElementById('search') as HTMLInputElement;
const output = document.getElementById('result') as HTMLPreElement;
const peopleList = document.getElementById('people-list') as HTMLUListElement;

function getPhonetics(word: string): [string, string] {
    return doubleMetaphone(normalizeString(word.toLowerCase()));
}

function getScore(inputPhonetics: [string, string][], prenom: string, nom: string): number {
    const fields = [prenom, nom].map(f => getPhonetics(f));
    return inputPhonetics.reduce((score, [inPrim, inSec]) => {
        const matched = fields.some(([prim, sec]) =>
            inPrim === prim || inPrim === sec || inSec === prim || inSec === sec
        );
        return score + (matched ? 1 : 0);
    }, 0);
}

function renderFullList() {
    peopleList.innerHTML = '';
    people.forEach(p => {
        const li = document.createElement('li');
        li.textContent = `${p.prenom} ${p.nom}`;
        peopleList.appendChild(li);
    });
}


input.addEventListener('input', () => {
    const raw = input.value.trim();
    if (!raw) {
        output.textContent = 'Tape un nom et/ou prénom (ex: "Jean Gonzales")';
        return;
    }
    const words = raw.split(/\s+/).map(getPhonetics);

    const scored = people
        .map(p => ({
            ...p,
            score: getScore(words, p.prenom, p.nom)
        }))
        .filter(p => p.score > 0)
        .sort((a, b) => b.score - a.score);

    output.textContent = `
        🔍 Recherche : ${raw}
        Mots analysés : ${raw.split(/\s+/).join(', ')}
        
        ✅ Résultats similaires :
             ${scored.length ? scored.map(p => `(${p.score}/2) ${p.prenom} ${p.nom}`).join('\n') : 'Aucun résultat trouvé.'}
    `.trim();
});

// Initialisation
renderFullList();
