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
    const isMyMessage = getUser() && getUser().uid === message.author.uid;
    const dateTime = message.timestamp !== null ? message.timestamp.toMillis() : Timestamp.now().toMillis();

    return `
      <div class="chat chat-${isMyMessage ? 'end' : 'start'}">
        <div class="chat-header">
        ${message.author.displayName}
        </div>
        <div class="chat-bubble chat-bubble-${isMyMessage ? 'error' : 'info'}">
          ${message.content}
        </div>
        <div class="chat-footer opacity-50">
          <time class="text-xs opacity-50">
            ${timestampToDate(dateTime)} - ${timestampToTime(dateTime)}
          </time>
        </div>
      </div>
    `
}
