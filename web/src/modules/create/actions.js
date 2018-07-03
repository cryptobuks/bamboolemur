export const GENERATE_SESSION_ID = 'GENERATE_SESSION_ID';
export const INIT_CONN_TO_MESS_BROKER = 'INIT_CONN_TO_MESS_BROKER';
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';

export const generateSessionId = () => ({
  type: GENERATE_SESSION_ID
});

export const initConnToMessBroker = () => ({
  type: INIT_CONN_TO_MESS_BROKER
});

export const messageRecieved = (topic, message) => ({
  type: MESSAGE_RECEIVED,
  topic,
  message
});
