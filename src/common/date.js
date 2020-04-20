export const ONE_DAY = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

export function daysBetween(d0, d1) {
    return Math.round(Math.abs((d0 - d1) / ONE_DAY));
}

export function formatDate(date) {
    let month = '' + (date.getMonth() + 1)
    let day = '' + date.getDate()
    let year = date.getFullYear()

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [day, month, year].join('/');
}

export function addDays(date, days) {
    var dt = new Date(date.valueOf());
    dt.setDate(dt.getDate() + days);
    return dt;
}

export function toTimestamp(strDate){
    var datum = Date.parse(strDate);
    return datum/1000;
 }