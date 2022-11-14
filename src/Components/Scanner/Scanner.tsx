import { FC, useEffect, useState } from 'react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { useHistory } from 'react-router-dom';
import { Button } from '../Buttons/Button';

export const Scanner: FC = () => {
    const [err, setErr] = useState<string>();
    const history = useHistory();

    const stopScan = () => {
        BarcodeScanner.showBackground();
        document.body.style.backgroundColor = '#0D3140'; // return background to default
        BarcodeScanner.stopScan();
    };

    const clickStopScan = () => {
        stopScan();
        history.goBack();
    };

    useEffect(() => {
        const checkPermission = async () => {
            try {
                const status = await BarcodeScanner.checkPermission({
                    force: true,
                });

                return !!status.granted;
            } catch (error: any) {
                setErr(error.message);
                console.error(error.message);
            }
        };

        const startScan = async () => {
            BarcodeScanner.hideBackground(); // make background of WebView transparent
            document.body.style.backgroundColor = 'transparent'; // make background of body transparent

            const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
            stopScan();

            // if the result has content
            if (result.hasContent) {
                history.push(`/eat/scan/${result.content}`);
            }
        };

        checkPermission();
        startScan();

        return () => {};

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stopScan]);

    return (
        <div className="flex flex-col justify-center items-center z-50 min-h-screen p-4">
            <hr className="w-full border-y border-secondary" />
            <span>{err}</span>
            <Button className="fixed bottom-24" onClick={clickStopScan}>
                Stop Scan
            </Button>
        </div>
    );
};
