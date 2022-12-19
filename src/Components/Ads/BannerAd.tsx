import { FC, useEffect } from 'react';
import { Admob, AdmobOptions } from '@awesome-cordova-plugins/admob';

// TODO: finish implementing banner ads for 1.1.0
export const BannerAd: FC = () => {
    useEffect(() => {
        const admobOptions: AdmobOptions = {
            bannerAdId: 'ca-app-pub-3940256099942544/6300978111',
            isTesting: true,
            autoShowBanner: false,
            autoShowInterstitial: false,
            autoShowRewarded: false,
            adSize: Admob.AD_SIZE.BANNER,
        };

        // Set admob options
        Admob.setOptions(admobOptions)
            .then(() => console.log('Admob options have been successfully set'))
            .catch((err) => console.error('Error setting admob options:', err));
    }, []);

    useEffect(() => {
        // Show banner ad (createBannerView must be called before and onAdLoaded() event raised)
        Admob.onAdLoaded().subscribe((ad) => {
            if (ad.adType === Admob.AD_TYPE.BANNER) {
                Admob.showBannerAd()
                    .then(() => console.log('Banner ad shown'))
                    .catch((err) =>
                        console.error('Error showing banner ad:', err)
                    );
            }
        });
    });

    return <div className="banner-ad" />;
};
