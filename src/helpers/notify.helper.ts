import { Notify } from 'quasar';

export function notifySuccessFeedback(message: string) {
  Notify.create({ type: 'positive', message });
}
