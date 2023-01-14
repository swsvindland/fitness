import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CDN_URL, getProgressPhotos } from '../../api';
import { LinkButton } from '../Buttons/LinkButton';
import { LinkSecondaryButton } from '../Buttons/LinkSecondaryButton';

export const ProgressPhotos: FC = () => {
    const photosQuery = useQuery(['ProgressPhotos'], getProgressPhotos);

    return (
        <div className="card p-4 w-full">
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
