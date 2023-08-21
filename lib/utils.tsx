export function truncateStringToWords(str, numWords) {
    const words = str.split(' ');

    if (words.length <= numWords) {
        return str;
    } else {
        const truncatedWords = words.slice(0, numWords);
        return truncatedWords.join(' ') + '...';
    }
}