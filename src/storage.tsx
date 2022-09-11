export function setItem(key: string, value: any) {
  try {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.log(error);
  }
}

export function getItem(key: string) {
  try {
    const item = window.sessionStorage.getItem(key);

    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.log(error);

    return null;
  }
}
