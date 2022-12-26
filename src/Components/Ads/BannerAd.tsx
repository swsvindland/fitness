import { FC, useCallback, useContext, useEffect, useState } from 'react';
import { AdMobPlus, BannerAd as Banner } from '@admob-plus/capacitor';
import { isPlatform } from '@ionic/react';
import { AuthContext } from '../Auth/Auth';

export const BannerAd: FC = () => {
    const { user } = useContext(AuthContext);
    const androidTestBannerId = 'ca-app-pub-3940256099942544/6300978111';
    const iosTestBannerId = 'ca-app-pub-3940256099942544/2934735716';
    const androidBannerId = 'ca-app-pub-7533750599105635/4186833075';
    const iosBannerId = 'ca-app-pub-7533750599105635/3179713363';

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

    const banner = new Banner({
        adUnitId: mapPlatformToBannerId(),
        position: 'top',
    });

    const loadAd = useCallback(async () => {
        if (user?.paid) return null;
        if (mapPlatformToBannerId() === '') return null;

        if (!showingAd) {
            await AdMobPlus.requestTrackingAuthorization();
            await banner.show();
            setShowingAd(true);
        }
    }, [banner, showingAd, user?.paid]);

    const hideAd = useCallback(async () => {
        await banner.hide();
    }, [banner]);

    useEffect(() => {
        loadAd();
    }, [loadAd]);

    useEffect(() => {
        console.log('paid', user?.paid);
        if (user?.paid) {
            hideAd();
        }
    }, [banner, hideAd, user?.paid]);

    useEffect(() => {
        return () => {
            hideAd();
        };
        // disabling, because we want to hide the ad when the component unmounts
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div className="banner-ad" />;
};
