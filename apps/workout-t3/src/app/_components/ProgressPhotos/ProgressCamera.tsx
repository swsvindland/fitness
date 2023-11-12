"use client";

import { FC, Fragment, useRef, useState } from "react";
import { Button } from "../Buttons/Button";
import { SecondaryButton } from "../Buttons/SecondaryButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProgressPhoto } from "@fitness/api-legacy";
import { LoadingSpinner } from "../Loading/LoadingSpinner";
import { MinusSolid } from "../Icons/MinusSolid";
import { useRouter } from "next/navigation";
import { useUploadThing } from "~/utils/uploadthing";
import { Dialog, Transition } from "@headlessui/react";
import { XSolid } from "~/app/_components/Icons/XSolid";
import { Camera, CameraType } from "react-camera-pro";

const b64toBlob = (base64: string, type = "image/jpeg") =>
  fetch(`data:${type};base64,${base64}`).then((res) => res.blob());

export const ProgressCamera: FC = () => {
  const camera = useRef<CameraType | null>(null);
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState<any[]>([]);
  const router = useRouter();
  const queryClient = useQueryClient();

  const takePicture = async () => {
    // const image = await Camera.getPhoto({
    //     quality: 90,
    //     allowEditing: false,
    //     resultType: CameraResultType.Uri,
    //     source: CameraSource.Camera,
    //     direction: CameraDirection.Front,
    // });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    // Can be set to the src of an image now
    setPhotos([...photos]);
  };

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      alert("upload has begun");
    },
  });

  const uploadPhotosMutation = useMutation(addProgressPhoto, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["ProgressPhotos"]);
      router.push("/body");
    },
  });

  const removePhotos = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="flex flex-col p-4">
        <div className="mb-4">
          {uploadPhotosMutation.isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Button className="mr-2" onClick={() => setOpen(true)}>
                Add Photo
              </Button>
              <SecondaryButton onClick={() => startUpload(photos)}>
                Upload Photos
              </SecondaryButton>
            </>
          )}
        </div>
        <div>
          <span className="mb-2 text-lg text-secondary">
            Photos {photos.length} / 10
          </span>
          <div className="grid grid-cols-3 gap-2">
            {photos.map((photo, index) => (
              <div>
                <button
                  className="float-right my-2 rounded-full border border-ternary"
                  onClick={() => removePhotos(index)}
                >
                  <MinusSolid className="h-4 w-4 fill-ternary" />
                </button>
                <img src={photo.webPath} alt="" />
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-card px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XSolid
                        className="h-6 w-6 fill-ternary"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <div className="mt-2 h-96 w-96">
                        <Camera
                          facingMode="environment"
                          ref={camera}
                          errorMessages={{
                            noCameraAccessible:
                              "No camera device accessible. Please connect your camera or try a different browser.",
                            permissionDenied:
                              "Permission denied. Please refresh and give camera permission.",
                            switchCamera:
                              "It is not possible to switch camera to different one because there is only one video device accessible.",
                            canvas: "Canvas is not supported.",
                          }}
                        />
                        <button
                          onClick={() =>
                            setPhotos([...photos, camera.current?.takePhoto()])
                          }
                        >
                          Take photo
                        </button>
                        {/*<img src={image} alt="Taken photo" />*/}
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};
