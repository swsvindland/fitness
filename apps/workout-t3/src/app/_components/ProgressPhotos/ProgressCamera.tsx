'use client';

import { FC, Fragment, useRef, useState } from 'react';
import { Button } from '../Buttons/Button';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import { useQueryClient } from '@tanstack/react-query';
import { LoadingSpinner } from '../Loading/LoadingSpinner';
import { MinusSolid } from '../Icons/MinusSolid';
import { useRouter } from 'next/navigation';
import { useUploadThing } from '~/utils/uploadthing';
import { Dialog, Transition } from '@headlessui/react';
import { XSolid } from '~/app/_components/Icons/XSolid';
import { Camera, CameraType } from 'react-camera-pro';
import { v4 as uuidv4 } from 'uuid';
import { api } from '~/trpc/react';

const base64ToFile = (data: string, filename: string) => {
    const arr = data.split(',');
    const mime = arr[0]?.match(/:(.*?);/)![1];
    const bstr = atob(arr[1] ?? '');
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
};

export const ProgressCamera: FC = () => {
    const [uploading, setUploading] = useState(false);
    const camera = useRef<CameraType | null>(null);
    const [open, setOpen] = useState(false);
    const [photos, setPhotos] = useState<any[]>([]);
    const router = useRouter();
    const queryClient = useQueryClient();

    const uploadPhotosMutation =
        api.progressPhotos.uploadProgressPhotos.useMutation();

    const { startUpload } = useUploadThing('imageUploader', {
        onClientUploadComplete: (out) => {
            console.log(out);
        },
    });

    const removePhotos = (index: number) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        setUploading(true);
        const files = photos.map((photo) =>
            base64ToFile(photo, `${uuidv4()}.jpg`)
        );

        await startUpload(files);

        await uploadPhotosMutation.mutateAsync({
            photos: files.map((file) => file.name.split('.')[0] ?? '') ?? [],
        });
        setUploading(false);

        await queryClient.invalidateQueries(['ProgressPhotos']);
        router.back();
    };

    return (
        <>
            <div className="flex flex-col p-4">
                <div className="mb-4">
                    {uploading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <Button
                                className="mr-2"
                                onClick={() => setOpen(true)}
                            >
                                Add Photo
                            </Button>
                            <SecondaryButton onClick={handleUpload}>
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
                                <img src={photo} alt="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="bg-card relative transform overflow-hidden rounded-lg px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                                        <button
                                            type="button"
                                            className="focus:ring-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="sr-only">
                                                Close
                                            </span>
                                            <XSolid
                                                className="fill-ternary h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </div>
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <div>
                                                <div className="mt-2 h-96">
                                                    <Camera
                                                        facingMode="environment"
                                                        ref={camera}
                                                        errorMessages={{
                                                            noCameraAccessible:
                                                                'No camera device accessible. Please connect your camera or try a different browser.',
                                                            permissionDenied:
                                                                'Permission denied. Please refresh and give camera permission.',
                                                            switchCamera:
                                                                'It is not possible to switch camera to different one because there is only one video device accessible.',
                                                            canvas: 'Canvas is not supported.',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        className="relative bottom-0 left-0 flex w-full justify-center text-center"
                                        onClick={() =>
                                            setPhotos([
                                                ...photos,
                                                camera.current?.takePhoto(),
                                            ])
                                        }
                                    >
                                        Take photo
                                    </Button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};
