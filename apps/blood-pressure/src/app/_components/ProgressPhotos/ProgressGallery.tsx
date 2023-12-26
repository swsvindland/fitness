'use client';

import { FC, useState } from 'react';
import { format } from 'date-fns';
import { Viewer } from './Viewer';
import { api } from '~/trpc/react';
import { CDN_URL } from '~/utils/constants';

export const ProgressGallery: FC = () => {
    const photosQuery = api.progressPhotos.getProgressPhotos.useQuery();
    const photos = photosQuery.data;
    const dates = Array.from(new Set(photos?.map((photo) => photo.Created)));
    const [open, setOpen] = useState(false);
    const [openedImage, setOpenedImage] = useState<string>('');

    return (
        <>
            <div className="grid w-full max-w-2xl grid-cols-1">
                {dates.map((date) => (
                    <div key={date.toISOString()}>
                        <h2 className="text-secondary my-2 text-lg">
                            {format(new Date(date), 'PP')}
                        </h2>
                        <div className="grid grid-cols-3 gap-4">
                            {photos
                                ?.filter((item) => item.Created === date)
                                .map((photo) => (
                                    <button
                                        key={photo.Id}
                                        onClick={() => {
                                            setOpen(true);
                                            setOpenedImage(
                                                `${CDN_URL}/${photo.Filename}`
                                            );
                                        }}
                                    >
                                        <img
                                            className="rounded shadow"
                                            src={`${CDN_URL}/${photo.Filename}`}
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
