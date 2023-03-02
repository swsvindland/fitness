import React, { FC, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CDN_URL, getProgressPhotos } from '../../api';
import { LinkButton } from '../Buttons/LinkButton';
import { LinkSecondaryButton } from '../Buttons/LinkSecondaryButton';
import { AuthContext } from '../Auth/Auth';
import { Button } from '../Buttons/Button';
import { Viewer } from './Viewer';
import { LoadingCard } from '../Loading/LoadingCard';

export const ProgressPhotos: FC = () => {
    const { user, setOpenPurchase } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [openedImage, setOpenedImage] = useState<string>('');
    const photosQuery = useQuery(['ProgressPhotos'], getProgressPhotos);

    if (!user?.paid) {
        return (
            <div className="card mb-2 p-4">
                <h2 className="my-4 text-lg text-secondary">Progress Photos</h2>
                <p className="text-secondary">
                    You must be a paid member to view and upload progress
                    photos.
                </p>
                <Button className="mt-4" onClick={() => setOpenPurchase(true)}>
                    Upgrade to Premium
                </Button>
            </div>
        );
    }

    if (photosQuery.isLoading) {
        return <LoadingCard isLoading />;
    }

    return (
        <>
            <div className="card p-4">
                <h2 className="my-4 text-lg text-secondary">Progress Photos</h2>
                <div className="flex flex-row">
                    <LinkButton to="body/progress" className="mr-2">
                        See All
                    </LinkButton>
                    <LinkSecondaryButton to="body/progress/upload">
                        Upload
                    </LinkSecondaryButton>
                </div>
                <div className="mt-2 grid grid-cols-4 gap-4">
                    {photosQuery.data?.data.slice(0, 4).map((photo) => (
                        <button
                            onClick={() => {
                                setOpen(true);
                                setOpenedImage(`${CDN_URL}${photo.filename}`);
                            }}
                        >
                            <img
                                className="rounded shadow"
                                src={`${CDN_URL}${photo.filename}`}
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
