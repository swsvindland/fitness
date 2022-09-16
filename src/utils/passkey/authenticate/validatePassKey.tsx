export const validatePassKey = (
    storedChallenge: string,
    clientChallenge: string
) => {
    return storedChallenge === clientChallenge;
};
