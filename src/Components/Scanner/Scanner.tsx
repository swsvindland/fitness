import { FC, useEffect, useState } from 'react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { useHistory } from 'react-router';
import { Button } from '../Buttons/Button';

export const Scanner: FC = () => {
    const [err, setErr] = useState<string>();
    const history = useHistory();

    const stopScan = () => {
        BarcodeScanner.showBackground();
        BarcodeScanner.stopScan();
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
                console.log(error.message);
            }
        };

        const startScan = async () => {
            BarcodeScanner.hideBackground(); // make background of WebView transparent

            const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
            stopScan();

            // if the result has content
            if (result.hasContent) {
                console.log(result.content);
                history.replace(`/eat/scan/${result.content}`);
                // present(result.content!, [{ text: 'OK', role: 'cancel' }]);
                // log the raw scanned content
            }
        };

        checkPermission();
        startScan();

        return () => {};
    }, [history]);

    return (
        <div className="flex flex-col justify-center items-center z-50">
            <hr />
            <Button onClick={stopScan}>Stop Scan</Button>
        </div>
    );
};
