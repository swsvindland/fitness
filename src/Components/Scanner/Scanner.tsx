import { type FC, useEffect, useState } from 'react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { useHistory } from 'react-router-dom';
import { Button } from '../Buttons/Button';

export const Scanner: FC = () => {
    const [err, setErr] = useState<string>();
    const history = useHistory();

    const stopScan = async () => {
        await BarcodeScanner.showBackground();
        document.body.style.backgroundColor = '#0D3140'; // return background to default
        await BarcodeScanner.stopScan();
    };

    const clickStopScan = () => {
        stopScan().catch((error) => console.error(error));
        history.goBack();
    };

    useEffect(() => {
        const checkPermission = async () => {
            try {
                const status = await BarcodeScanner.checkPermission({
                    force: true,
                });

                return !!status.granted;
            } catch (error) {
                setErr('Unknown Error');

                return false;
            }
        };

        const startScan = async () => {
            await BarcodeScanner.hideBackground(); // make background of WebView transparent
            document.body.style.backgroundColor = 'transparent'; // make background of body transparent

            const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
            await stopScan();

            // if the result has content
            if (result.hasContent) {
                history.push(`/eat/scan/${result.content}`);
            }
        };

        checkPermission().catch((error) => console.error(error));
        startScan().catch((error) => console.error(error));

        return () => {
            stopScan().catch((error) => console.error(error));
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stopScan]);

    return (
        <div className="z-50 flex min-h-screen flex-col items-center justify-center p-4">
            <hr className="border-secondary w-full border-y" />
            <span>{err}</span>
            <Button className="fixed bottom-24" onClick={clickStopScan}>
                Stop Scan
            </Button>
        </div>
    );
};
