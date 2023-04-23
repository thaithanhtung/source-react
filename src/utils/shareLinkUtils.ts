// get hash params from url
export const getHashParams = (): { [key: string]: string } => {
  if (!window) return;

  let e: any;
  const hashParams = {};
  const a = /\+/g; // Regex for replacing addition symbol with a space
  const r = /([^&;=]+)=?([^&;]*)/g;
  const d = (s: string) => decodeURIComponent(s.replace(a, ' '));
  const q = window.location.hash.substring(1);

  // eslint-disable-next-line no-cond-assign
  while ((e = r.exec(q))) hashParams[d(e[1])] = d(e[2]);

  return hashParams;
};

export const buildHashUrl = (hashParams: { [key: string]: string }): void => {
  // create params array
  const params = [];
  Object.keys(hashParams).forEach((k) => {
    params.push(`${k}=${hashParams[k]}`);
  });

  // create hash path
  window.location.hash = params.join('&');
};

export const checkValidUrl = (url: string): boolean => {
  /* eslint-disable no-useless-escape */
  const regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/y;
  if (regex.test(url)) {
    return true;
  }
  return false;
};
