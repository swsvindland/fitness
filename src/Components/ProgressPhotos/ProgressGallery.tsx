import { useQuery } from '@tanstack/react-query';
import { CDN_URL, getProgressPhotos } from '../../api';
import { FC } from 'react';
import { format } from 'date-fns';
import { useShowBackButton } from '../Navigation/headerHooks';

export const ProgressGallery: FC = () => {
    useShowBackButton();
    const photosQuery = useQuery(['ProgressPhotos'], getProgressPhotos);
    const photos = photosQuery.data?.data;
    const dates = Array.from(new Set(photos?.map((photo) => photo.created)));

    return (
        <div className="max-w-2xl w-full grid grid-cols-1">
            {dates.map((date) => (
                <div>
                    <h2 className="text-lg text-secondary my-2">
                        {format(new Date(date), 'PP')}
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        {photos
                            ?.filter((item) => item.created === date)
                            .map((photo) => (
                                <img
                                    className="rounded shadow"
                                    src={`${CDN_URL}${photo.filename}`}
                                    alt=""
                                />
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};
