// if multiple languages were enabled, date format would be tied to chosen language
export function getFormattedDate(date) {
    const splits = date.split("-");
    // casting to number and back removes leading zeros
    return Number(splits[2]).toString() + ". " + Number(splits[1]).toString() + ". " + splits[0];
}