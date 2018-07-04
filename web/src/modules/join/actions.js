export const GENERATE_USER_ID = 'GENERATE_USER_ID';
export const INIT_CONN_TO_MESS_BROKER = 'INIT_CONN_TO_MESS_BROKER';
export const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
export const USER_JOINING = 'USER_JOINING';
export const SDP_ANSWER = 'SDP_ANSWER';
export const SET_SESSION_ID = 'SET_SESSION_ID';
export const RESPOND_TO_OFFER = 'RESPOND_TO_OFFER';

export const generateUserId = () => ({
  type: GENERATE_USER_ID
});

export const initConnToMessBroker = () => ({
  type: INIT_CONN_TO_MESS_BROKER
});

export const messageRecieved = (topic, message) => ({
  type: MESSAGE_RECEIVED,
  topic,
  message
});

export const userJoining = (sessionId, senderId) => ({
  type: USER_JOINING,
  sessionId,
  senderId
});

export const sdpAnswer = (sessionId, senderId, recipientId, sdpAnswer) => ({
  type: SDP_ANSWER,
  sessionId,
  senderId,
  recipientId,
  sdpAnswer
});

export const respondToOffer = (sessionId, senderId, recipientId, offer) => ({
  type: RESPOND_TO_OFFER,
  sessionId,
  senderId,
  recipientId,
  offer
});

export const setSessionId = (sessionId) => ({
  type: SET_SESSION_ID,
  sessionId
})
