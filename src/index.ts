import { doubleMetaphone, normalizeString, stem } from './metaphone';
import { people } from './people';

const input = document.getElementById('search') as HTMLInputElement;
const output = document.getElementById('result') as HTMLPreElement;

function matchField(field: string, inputPhonetics: [string, string][]) {
    const norm = normalizeString(field.toLowerCase());
    const [primary, secondary] = doubleMetaphone(norm);

    return inputPhonetics.some(([inPrim, inSec]) =>
        inPrim === primary || inPrim === secondary || inSec === primary || inSec === secondary
    );
}

input.addEventListener('input', () => {
    const raw = input.value.trim();
    if (!raw) {
        output.textContent = 'Tape un nom et/ou prénom (ex: "Jean Gonzales")';
        return;
    }
    const words = raw.split(/\s+/).map(w => normalizeString(w.toLowerCase()));
    const inputPhonetics = words.map(word => doubleMetaphone(word));

    const matches = people.filter(({ prenom, nom }) => {
        const fields = [prenom, nom];
        // Chaque mot doit matcher soit sur le prénom soit sur le nom
        return inputPhonetics.every(([inPrim, inSec]) =>
            fields.some(field => {
                const norm = normalizeString(field.toLowerCase());
                const [primary, secondary] = doubleMetaphone(norm);
                return (
                    inPrim === primary || inPrim === secondary || inSec === primary || inSec === secondary
                );
            })
        );
    });

    output.textContent = `
        🔍 Recherche : ${raw}
        Mots analysés : ${words.join(', ')}
        
        ✅ Résultats similaires :
${matches.length ? matches.map(p => `${p.prenom} ${p.nom}`).join('\n') : 'Aucun résultat trouvé.'}
`.trim();
});