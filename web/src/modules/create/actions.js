export const SHOW_TEXT = 'SHOW_TEXT';
export const GENERATE_SESSION_ID = 'GENERATE_SESSION_ID';

export const showText = text => ({
  type: SHOW_TEXT,
  text
});

export const generateSessionId = () => ({
  type: GENERATE_SESSION_ID
});
