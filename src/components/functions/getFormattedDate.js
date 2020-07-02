// if multiple languages were enabled, date format would be tied to chosen language
export function getFormattedDate(date) {
    const splits = date.split("-");
    return splits[2] + ". " + splits[1] + ". " + splits[0];
}