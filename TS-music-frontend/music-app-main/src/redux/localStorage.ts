// utils/localStorage.ts

export const loadState = <T>(key: string) => {
  try {
    if (typeof window === "undefined") {
      return undefined; // or some default value
    }

    const serializedState = localStorage.getItem(key);
    console.log(localStorage);
    console.log(key);
    console.log("load setat");
    console.log(serializedState);
    if (
      !serializedState ||
      serializedState === "undefined" ||
      serializedState === "null" ||
      serializedState.trim() === ""
    ) {
      console.log("masuk");
      return undefined;
    }
    console.log("lewat");
    return JSON.parse(serializedState);
  } catch (err) {
    console.log("disini");
    console.error(`Failed to load state for key "${key}":`, err);
    return undefined; // Return undefined if there is no state
  }
};

export const saveState = <T>(key: string, state: T): void => {
  try {
    console.log("save setat");
    console.log(state);
    const serializedState = JSON.stringify(state);
    console.log(serializedState);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.error(`Could not save state for key "${key}":`, err);
  }
};
