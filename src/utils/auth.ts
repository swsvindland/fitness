import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

export const getCurrentUser = async () => {
    const result = await FirebaseAuthentication.getCurrentUser();
    return result.user;
};

export const getIdToken = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return;
    }
    const result = await FirebaseAuthentication.getIdToken();
    return result.token;
};

export const signInWithApple = async () => {
    const result = await FirebaseAuthentication.signInWithApple();
    return result.user;
};

export const signInWithGoogle = async () => {
    const result = await FirebaseAuthentication.signInWithGoogle();
    return result.user;
};

export const signOut = async () => {
    await FirebaseAuthentication.signOut();
};
