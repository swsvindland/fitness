import { FC, useCallback, useContext, useEffect, useState } from 'react';
import {
    AdMob,
    AdMobBannerSize,
    BannerAdOptions,
    BannerAdPluginEvents,
    BannerAdPosition,
    BannerAdSize,
} from '@capacitor-community/admob';
import { AuthContext } from '../Auth/Auth';
import { isPlatform } from '@ionic/react';

export const BannerAd: FC = () => {
    const { user } = useContext(AuthContext);
    const androidTestBannerId = 'ca-app-pub-3940256099942544/6300978111';
    const iosTestBannerId = 'ca-app-pub-3940256099942544/2934735716';
    const androidBannerId = 'ca-app-pub-7533750599105635/4186833075';
    const iosBannerId = 'ca-app-pub-7533750599105635/8864374874';

    const mapPlatformToBannerId = () => {
        if (isPlatform('mobileweb') || isPlatform('desktop')) {
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

    const [showingAd, setShowingAd] = useState(false);

    const loadAd = useCallback(async () => {
        if (user?.paid) return null;
        if (mapPlatformToBannerId() === '') return null;

        if (!showingAd) {
            await AdMob.initialize({
                requestTrackingAuthorization: true,
                testingDevices: [mapPlatformToBannerId()],
                initializeForTesting: true,
            });

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
                margin: 0,
            };
            await AdMob.showBanner(options);

            setShowingAd(true);
        }
    }, [showingAd, user?.paid]);

    useEffect(() => {
        loadAd();
    }, [loadAd]);

    if (user?.paid) return null;

    return <div className="banner-ad mb-12" />;
};
