import { useQuery } from '@tanstack/react-query';
import { CDN_URL, getProgressPhotos } from '../../api';
import { type FC, useState } from 'react';
import { format } from 'date-fns';
import { useShowBackButton } from '../Navigation/headerHooks';
import { Viewer } from './Viewer';

export const ProgressGallery: FC = () => {
    useShowBackButton();
    const photosQuery = useQuery(['ProgressPhotos'], getProgressPhotos);
    const photos = photosQuery.data?.data;
    const dates = Array.from(new Set(photos?.map((photo) => photo.created)));
    const [open, setOpen] = useState(false);
    const [openedImage, setOpenedImage] = useState<string>('');

    return (
        <>
            <div className="grid w-full max-w-2xl grid-cols-1">
                {dates.map((date) => (
                    <div key={date}>
                        <h2 className="my-2 text-lg text-secondary">
                            {format(new Date(date), 'PP')}
                        </h2>
                        <div className="grid grid-cols-3 gap-4">
                            {photos
                                ?.filter((item) => item.created === date)
                                .map((photo) => (
                                    <button
                                        key={photo.id}
                                        onClick={() => {
                                            setOpen(true);
                                            setOpenedImage(
                                                `${CDN_URL}${photo.filename}`
                                            );
                                        }}
                                    >
                                        <img
                                            className="rounded shadow"
                                            src={`${CDN_URL}${photo.filename}`}
                                            alt=""
                                        />
                                    </button>
                                ))}
                        </div>
                    </div>
                ))}
            </div>
            <Viewer open={open} setOpen={setOpen} image={openedImage} />
        </>
    );
};
