export function query(queryString: string) {
  return document.querySelector(queryString);
}

export function queryAll(queryString: string) {
  return document.querySelectorAll(queryString);
}
