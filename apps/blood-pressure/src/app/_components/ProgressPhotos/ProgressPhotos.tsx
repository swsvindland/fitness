'use client';

import { FC, useState } from 'react';
import { LinkButton } from '../Buttons/LinkButton';
import { LinkSecondaryButton } from '../Buttons/LinkSecondaryButton';
import { Viewer } from './Viewer';
import { LoadingCard } from '../Loading/LoadingCard';
import { api } from '~/trpc/react';
import { CDN_URL } from '~/utils/constants';

export const ProgressPhotos: FC = () => {
    const [open, setOpen] = useState(false);
    const [openedImage, setOpenedImage] = useState<string>('');
    const photosQuery = api.progressPhotos.getProgressPhotos.useQuery();

    if (photosQuery.isLoading) {
        return <LoadingCard isLoading />;
    }

    return (
        <>
            <div className="card p-4">
                <h2 className="text-secondary my-4 text-lg">Progress Photos</h2>
                <div className="flex flex-row">
                    <LinkButton to="body/progress" className="mr-2">
                        See All
                    </LinkButton>
                    <LinkSecondaryButton to="body/progress/upload">
                        Upload
                    </LinkSecondaryButton>
                </div>
                <div className="mt-2 grid grid-cols-4 gap-4">
                    {photosQuery.data?.slice(0, 4).map((photo) => (
                        <button
                            key={photo.Id}
                            onClick={() => {
                                setOpen(true);
                                setOpenedImage(`${CDN_URL}/${photo.Filename}`);
                            }}
                        >
                            <img
                                className="rounded shadow"
                                src={`${CDN_URL}/${photo.Filename}`}
                                alt=""
                                width={150}
                                loading="lazy"
                            />
                        </button>
                    ))}
                </div>
            </div>
            <Viewer open={open} setOpen={setOpen} image={openedImage} />
        </>
    );
};
