import { getUser } from '/main';
import { Timestamp } from 'firebase/firestore';

function timestampToDate(firebase_timestamp) {
    return new Intl.DateTimeFormat(navigator.language, {
        dateStyle: "medium",
    }).format(new Date(firebase_timestamp))
}

function timestampToTime(firebase_timestamp) {
    return new Intl.DateTimeFormat(navigator.language, {
        timeStyle: "long",
    }).format(new Date(firebase_timestamp))
}

export function generateMessageHtmlTemplate(message) {

}
