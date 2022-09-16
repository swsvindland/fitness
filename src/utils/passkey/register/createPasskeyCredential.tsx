export const CreatePassKeyCredential = async (
    username: string,
    challengeBufferString: string,
    userId: string
) => {
    /*
    The challenge is a buffer of randomly generated bytes with a minimum of 16 bytes.
    This is generated on the server using a cryptographically secure random number generator.
    By generating the challenge on the server we can prevent "replay attacks".
    The authenticator will sign this along with other data.
  */
    const challengeBuffer = Uint8Array.from(
        challengeBufferString as string,
        (c) => c.charCodeAt(0)
    );

    const userIdBuffer = Uint8Array.from(userId, (c) => c.charCodeAt(0));

    const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions =
        {
            challenge: challengeBuffer,
            rp: {
                name: process.env.REACT_APP_RP_NAME as string,
                id: process.env.REACT_APP_DOMAIN,
            },
            user: {
                id: userIdBuffer,
                name: username,
                displayName: username,
            },
            // SUPPORT ALL PASSKEYS
            pubKeyCredParams: [
                {
                    type: 'public-key',
                    alg: -7,
                },
                {
                    type: 'public-key',
                    alg: -35,
                },
                {
                    type: 'public-key',
                    alg: -36,
                },
                {
                    type: 'public-key',
                    alg: -257,
                },
                {
                    type: 'public-key',
                    alg: -258,
                },
                {
                    type: 'public-key',
                    alg: -259,
                },
                {
                    type: 'public-key',
                    alg: -37,
                },
                {
                    type: 'public-key',
                    alg: -38,
                },
                {
                    type: 'public-key',
                    alg: -39,
                },
                {
                    type: 'public-key',
                    alg: -8,
                },
            ],
            timeout: 15000,
            attestation: 'direct',
        };

    console.log(
        '✅  publicKeyCredentialCreationOptions : ',
        publicKeyCredentialCreationOptions
    );

    return await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
    });
};
