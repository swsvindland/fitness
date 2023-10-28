import { FC, useState } from 'react';
import {
    Camera,
    CameraDirection,
    CameraResultType,
    CameraSource,
    Photo,
} from '@capacitor/camera';
import { useHistory } from 'react-router-dom';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProgressPhoto } from '@fitness/api';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { Filesystem } from '@capacitor/filesystem';
import { useShowBackButton } from '../Navigation/headerHooks';
import { MinusSolid } from '../Icons/MinusSolid';

const b64toBlob = (base64: string, type = 'image/jpeg') =>
    fetch(`data:${type};base64,${base64}`).then((res) => res.blob());

export const ProgressCamera: FC = () => {
    useShowBackButton();
    const [photos, setPhotos] = useState<Photo[]>([]);
    const history = useHistory();
    const queryClient = useQueryClient();

    const takePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            direction: CameraDirection.Front,
        });
        // image.webPath will contain a path that can be set as an image src.
        // You can access the original file using image.path, which can be
        // passed to the Filesystem API to read the raw data of the image,
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
        // Can be set to the src of an image now
        setPhotos([...photos, image]);
    };

    const uploadPhotosMutation = useMutation(addProgressPhoto, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['ProgressPhotos']);
            history.push('/body');
        },
    });

    const removePhotos = (index: number) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col p-4">
            <div className="mb-4">
                {uploadPhotosMutation.isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <Button className="mr-2" onClick={takePicture}>
                            Add Photo
                        </Button>
                        <SecondaryButton
                            className=""
                            onClick={async () => {
                                const readFilePath = async (path: string) => {
                                    // Here's an example of reading a file with a full file path. Use this to
                                    // read binary data (base64 encoded) from plugins that return File URIs, such as
                                    // the Camera.
                                    const contents = await Filesystem.readFile({
                                        path,
                                    });

                                    return contents.data.toString();
                                };

                                const blobs = await Promise.all(
                                    photos
                                        .filter((item) => item.path)
                                        .map(async (photo) => {
                                            return await b64toBlob(
                                                await readFilePath(photo.path!)
                                            );
                                        })
                                );
                                uploadPhotosMutation.mutate(blobs);
                            }}
                        >
                            Upload Photos
                        </SecondaryButton>
                    </>
                )}
            </div>
            <div>
                <span className="text-secondary mb-2 text-lg">
                    Photos {photos.length} / 10
                </span>
                <div className="grid grid-cols-3 gap-2">
                    {photos.map((photo, index) => (
                        <div>
                            <button
                                className="border-ternary float-right my-2 rounded-full border"
                                onClick={() => removePhotos(index)}
                            >
                                <MinusSolid className="fill-ternary h-4 w-4" />
                            </button>
                            <img src={photo.webPath} alt="" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
