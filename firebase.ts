// Firebase setup was declined by the user. 
// This file remains as a placeholder for potential future integration.

export const auth = {
  currentUser: null,
  signOut: async () => {},
};

export const signIn = async () => {
  console.log("Firebase Auth is disabled.");
  alert("Authentication is currently disabled as Firebase setup was not completed.");
};

export const signOut = async () => {
  console.log("Firebase Auth is disabled.");
};

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  console.error('Firestore Error (Disabled): ', error);
}

