import { FC, useCallback, useEffect } from 'react';
import {
    AdMob,
    AdMobBannerSize,
    BannerAdOptions,
    BannerAdPluginEvents,
    BannerAdPosition,
    BannerAdSize,
} from '@capacitor-community/admob';
import { isPlatform } from '@ionic/react';

export const BannerAd: FC = () => {
    const androidTestBannerId = 'ca-app-pub-3940256099942544/6300978111';
    const iosTestBannerId = 'ca-app-pub-3940256099942544/2934735716';
    const androidBannerId = 'ca-app-pub-7533750599105635/4186833075';
    const iosBannerId = 'ca-app-pub-7533750599105635/3179713363';

    const mapPlatformToBannerId = () => {
        if (isPlatform('mobileweb')) {
            return '';
        }
        if (process.env.NODE_ENV === 'development') {
            if (isPlatform('android')) {
                return androidTestBannerId;
            }
            if (isPlatform('ios')) {
                return iosTestBannerId;
            }
        }
        if (isPlatform('android')) {
            return androidBannerId;
        }
        if (isPlatform('ios')) {
            return iosBannerId;
        }
        return '';
    };
    console.log(mapPlatformToBannerId());

    const loadAd = useCallback(async () => {
        AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
            // Subscribe Banner Event Listener
        });

        AdMob.addListener(
            BannerAdPluginEvents.SizeChanged,
            (size: AdMobBannerSize) => {
                // Subscribe Change Banner Size
            }
        );

        const options: BannerAdOptions = {
            adId: mapPlatformToBannerId(),
            adSize: BannerAdSize.BANNER,
            position: BannerAdPosition.TOP_CENTER,
            margin: 8,
            // isTesting: true
            // npa: true,
        };
        AdMob.showBanner(options);
    }, []);

    useEffect(() => {
        loadAd();
    }, [loadAd]);

    return <div className="banner-ad" />;
};
