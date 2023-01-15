import { FC, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CDN_URL, getProgressPhotos } from '../../api';
import { LinkButton } from '../Buttons/LinkButton';
import { LinkSecondaryButton } from '../Buttons/LinkSecondaryButton';
import { AuthContext } from '../Auth/Auth';
import { Button } from '../Buttons/Button';

export const ProgressPhotos: FC = () => {
    const { user, setOpenPurchase } = useContext(AuthContext);
    const photosQuery = useQuery(['ProgressPhotos'], getProgressPhotos);

    if (!user?.paid) {
        return (
            <div className="max-w-2xl w-full card p-4 mb-2">
                <h2 className="text-lg text-secondary my-4">Progress Photos</h2>
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

    return (
        <div className="card p-4 w-full">
            <h2 className="text-lg text-secondary my-4">Progress Photos</h2>
            <div className="flex flex-row">
                <LinkButton to="body/progress" className="mr-2">
                    See All
                </LinkButton>
                <LinkSecondaryButton to="body/progress/upload">
                    Upload
                </LinkSecondaryButton>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-2">
                {photosQuery.data?.data.slice(0, 4).map((photo) => (
                    <img
                        className="rounded shadow"
                        src={`${CDN_URL}${photo.filename}`}
                        alt=""
                        width={150}
                    />
                ))}
            </div>
        </div>
    );
};
