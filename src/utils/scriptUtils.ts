// import { UserContactTypes } from '../types';

type loadLeadformScriptType = {
  userContact?: any; // UserContactTypes;
  language?: string;
  contactFormId?: string;
  isOpen?: boolean;
};

type loadWebRotateScriptType = {
  code?: string;
  language?: string;
  webRotateId?: string;
};

export const loadLeadformScript = (props: loadLeadformScriptType): void => {
  const { userContact, language, contactFormId, isOpen = false } = props;
  if (!userContact) return;

  const domain = process.env.REACT_APP_LEADFORM_DOMAIN;
  if (!domain) return;

  const t = document.createElement("script");
  t.id = userContact.code;

  t.src = `${domain}/contact.js?token=${userContact.token}${
    contactFormId ? `&contactFormId=${contactFormId}` : ""
  }&language=${language}${isOpen ? `&isOpen=${isOpen}` : ""}
`;
  if (!document.getElementById(userContact.code)) {
    document.head.appendChild(t);
  }
};

export const loadWebRotateScript = (props: loadWebRotateScriptType): void => {
  const { code, language, webRotateId } = props;
  if (!code) return;
  const domain = process.env.REACT_APP_WEBROTATE_DOMAIN;
  if (!domain) return;

  const t = document.createElement("script");
  t.id = code;

  t.src = `${domain}/mainClik.js?code=${code}${
    webRotateId ? `&webRotateId=${webRotateId}` : ""
  }&language=${language}
`;
  if (!document.getElementById(code)) {
    document.head.appendChild(t);
  }
};
