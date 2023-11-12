"use client";
import { FC, Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XSolid } from "~/app/_components/Icons/XSolid";
import { BarcodeScannerComponent } from "./BarcodeScannerComponent";
import { SecondaryButton } from "~/app/_components/Buttons/SecondaryButton";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Scanner: FC<Props> = ({ open, setOpen }) => {
  const [data, setData] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (data && data.length > 6) {
      console.log("data", data);

      setOpen(false);
      router.push(`/eat/scan-food/${data}`);
    }
  }, [data]);

  return (
    <>
      <SecondaryButton
        className="flex w-full justify-center"
        onClick={() => setOpen(true)}
      >
        Scan Barcode
      </SecondaryButton>
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
                      <div className="mt-2">
                        <BarcodeScannerComponent
                          width={500}
                          height={500}
                          facingMode={"environment"}
                          onUpdate={(err, result) => {
                            if (result) setData(result.text);
                            else setData("");
                          }}
                        />
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
