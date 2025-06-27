
/**
 * Normalise une chaîne de caractères en supprimant les accents et diacritiques.
 *
 * @param str - La chaîne à normaliser.
 * @returns La chaîne normalisée.
 */
export function normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Réduit un mot à sa forme de base en retirant les suffixes pluriels courants.
 *
 * @param word - Le mot à stemmer.
 * @returns Le mot stemmé.
 */
export function stem(word: string): string {
    // Retire les suffixes pluriels français courants
    if (word.endsWith('es') && word.length > 2) {
        return word.slice(0, -2);
    } else if (word.endsWith('s') && word.length > 1) {
        return word.slice(0, -1);
    }
    return word;
}

/**
 * Applique le stemming à un tableau de mots.
 *
 * @param words - Le tableau de mots à stemmer.
 * @returns Un tableau de mots stemmés.
 */
export function stemArray(words: string[]): string[] {
    return words.map(word => stem(word));
}

/**
 * Convertit une chaîne de caractères en un tableau de mots.
 *
 * @param str - La chaîne à convertir.
 * @returns Un tableau de mots.
 */
export function stringToArray(str: string): string[] {
    return str.trim().split(/\s+/);
}

/**
 * Sanitize les termes de recherche en les convertissant en minuscules.
 *
 * @param terms - Les termes à sanitiser.
 * @returns Un tableau de termes sanitizés.
 */
export function sanitize(terms: string[]): string[] {
    return terms.map(term => normalizeString(term.toLowerCase()));
}

/**
 * Implémentation de l'algorithme Double Metaphone en TypeScript.
 *
 * @param word - Le mot à encoder phonétiquement.
 * @returns Un tuple contenant les codes phonétiques primaire et secondaire.
 */
export function doubleMetaphone(word: string): [string, string] {
    word = normalizeString(word).toUpperCase();
    const length = word.length;
    let index = 0;
    let primary = '';
    let secondary = '';

    const isVowel = (ch: string) => 'AEIOUY'.includes(ch);
    const charAt = (str: string, pos: number) => (pos < str.length ? str.charAt(pos) : '');

    // Traitement des préfixes silencieux
    const prefixes = ['GN', 'KN', 'PN', 'WR', 'PS'];
    for (const prefix of prefixes) {
        if (word.startsWith(prefix)) {
            index += 1;
            break;
        }
    }

    while ((primary.length < 4 || secondary.length < 4) && index < length) {
        const char = word.charAt(index);

        // Gestion des doublons
        if (index > 0 && char === word.charAt(index - 1) && char !== 'C') {
            index += 1;
            continue;
        }

        switch (char) {
            case 'A':
            case 'E':
            case 'I':
            case 'O':
            case 'U':
            case 'Y':
                if (index === 0) {
                    primary += char;
                    secondary += char;
                }
                index += 1;
                break;

            case 'B':
                primary += 'P';
                secondary += 'P';
                if (charAt(word, index + 1) === 'B') {
                    index += 2;
                } else {
                    index += 1;
                }
                break;

            case 'Ç':
                primary += 'S';
                secondary += 'S';
                index += 1;
                break;

            case 'C':
                if (charAt(word, index + 1) === 'I' && charAt(word, index + 2) === 'A') {
                    primary += 'X';
                    secondary += 'X';
                    index += 3;
                } else if (charAt(word, index + 1) === 'H') {
                    primary += 'X';
                    secondary += 'X';
                    index += 2;
                } else if (['I', 'E', 'Y'].includes(charAt(word, index + 1))) {
                    primary += 'S';
                    secondary += 'S';
                    index += 2;
                } else {
                    primary += 'K';
                    secondary += 'K';
                    if (charAt(word, index + 1) === 'C') {
                        index += 2;
                    } else {
                        index += 1;
                    }
                }
                break;

            case 'D':
                if (charAt(word, index + 1) === 'G' && ['I', 'E', 'Y'].includes(charAt(word, index + 2))) {
                    primary += 'J';
                    secondary += 'J';
                    index += 3;
                } else {
                    primary += 'T';
                    secondary += 'T';
                    if (charAt(word, index + 1) === 'D') {
                        index += 2;
                    } else {
                        index += 1;
                    }
                }
                break;

            case 'F':
                primary += 'F';
                secondary += 'F';
                if (charAt(word, index + 1) === 'F') {
                    index += 2;
                } else {
                    index += 1;
                }
                break;

            case 'G':
                if (charAt(word, index + 1) === 'H') {
                    if (index > 0 && !isVowel(word.charAt(index - 1))) {
                        primary += 'K';
                        secondary += 'K';
                        index += 2;
                    } else {
                        primary += 'F';
                        secondary += 'F';
                        index += 2;
                    }
                } else if (charAt(word, index + 1) === 'N') {
                    primary += 'KN';
                    secondary += 'N';
                    index += 2;
                } else if (['I', 'E', 'Y'].includes(charAt(word, index + 1))) {
                    primary += 'J';
                    secondary += 'J';
                    index += 2;
                } else {
                    primary += 'K';
                    secondary += 'K';
                    if (charAt(word, index + 1) === 'G') {
                        index += 2;
                    } else {
                        index += 1;
                    }
                }
                break;

            case 'H':
                if (isVowel(charAt(word, index - 1)) && isVowel(charAt(word, index + 1))) {
                    primary += 'H';
                    secondary += 'H';
                    index += 2;
                } else {
                    index += 1;
                }
                break;

            case 'J':
                primary += 'J';
                secondary += 'J';
                if (word.startsWith('JOSE') || word.startsWith('SAN JOSE')) {
                    primary += 'H';
                    secondary += 'H';
                }
                if (charAt(word, index + 1) === 'J') {
                    index += 2;
                } else {
                    index += 1;
                }
                break;

            case 'K':
                primary += 'K';
                secondary += 'K';
                if (charAt(word, index + 1) === 'K') {
                    index += 2;
                } else {
                    index += 1;
                }
                break;

            case 'L':
                primary += 'L';
                secondary += 'L';
                if (charAt(word, index + 1) === 'L') {
                    index += 2;
                } else {
                    index += 1;
                }
                break;

            case 'M':
                primary += 'M';
                secondary += 'M';
                if (['M', 'N'].includes(charAt(word, index + 1))) {
                    index += 2;
                } else {
                    index += 1;
                }
                break;

            case 'N':
                primary += 'N';
                secondary += 'N';
                if (charAt(word, index + 1) === 'N') {
                    index += 2;
                } else {
                    index += 1;
                }
                break;

            case 'P':
                if (charAt(word, index + 1) === 'H') {
                    primary += 'F';
                    secondary += 'F';
                    index += 2;
                } else {
                    primary += 'P';
                    secondary += 'P';
                    if (charAt(word, index + 1) === 'P') {
                        index += 2;
                    } else {
                        index += 1;
                    }
                }
                break;

            case 'Q':
                primary += 'K';
                secondary += 'K';
                if (charAt(word, index + 1) === 'Q') {
                    index += 2;
                } else {
                    index += 1;
                }
                break;

            case 'R':
                primary += 'R';
                secondary += 'R';
                if (charAt(word, index + 1) === 'R') {
                    index += 2;
                } else {
                    index += 1;
                }
                break;

            case 'S':
                if (word.startsWith('SH') || word.startsWith('SIO') || word.startsWith('SIA')) {
                    primary += 'X';
                    secondary += 'X';
                    index += 2;
                } else if (word.startsWith('SC')) {
                    if (['I', 'E', 'Y'].includes(charAt(word, index + 2))) {
                        primary += 'S';
                        secondary += 'S';
                        index += 3;
                    } else {
                        primary += 'SK';
                        secondary += 'SK';
                        index += 3;
                    }
                } else {
                    primary += 'S';
                    secondary += 'S';
                    if (charAt(word, index + 1) === 'S') {
                        index += 2;
                    } else {
                        index += 1;
                    }
                }
                break;

            case 'T':
                if (word.startsWith('TION') || word.startsWith('TIA')) {
                    primary += 'X';
                    secondary += 'X';
                    index += 3;
                } else if (word.startsWith('TH') || word.startsWith('TTH')) {
                    primary += '0';
                    secondary += 'T';
                    index += 2;
                } else if (word.startsWith('TCH')) {
                    index += 3;
                } else {
                    primary += 'T';
                    secondary += 'T';
                    if (['T', 'D'].includes(charAt(word, index + 1))) {
                        index += 2;
                    } else {
                        index += 1;
                    }
                }
                break;

            case 'V':
                primary += 'F';
                secondary += 'F';
                if (charAt(word, index + 1) === 'V') {
                    index += 2;
                } else {
                    index += 1;
                }
                break;

            case 'W':
            case 'Y':
                if (isVowel(charAt(word, index + 1))) {
                    primary += char;
                    secondary += char;
                    index += 2;
                } else {
                    index += 1;
                }
                break;

            case 'X':
                primary += 'KS';
                secondary += 'KS';
                index += 1;
                break;

            case 'Z':
                primary += 'S';
                secondary += 'S';
                if (word.startsWith('ZH')) {
                    primary += 'X';
                    secondary += 'X';
                    index += 2;
                } else {
                    index += 1;
                }
                break;

            default:
                index += 1;
                break;
        }
    }

    return [primary, secondary];
}
