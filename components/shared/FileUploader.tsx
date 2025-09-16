"use client";

import { UploadButton } from "@/lib/uploadthing";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type FileUploaderProps = {
  onFileChange?: (files: File[]) => void;
  imageUrl?: string;
  setFiles?: Dispatch<SetStateAction<File[]>>; 
}
export default function FileUploader({onFileChange, imageUrl,setFiles}:FileUploaderProps) {
  return (
    <main className="flex h-[72px] w-full bg-gray-50 rounded-2xl  items-center justify-center p-24 overflow-hidden">
      {imageUrl ? <Image src={imageUrl} width={400} height={72}  alt="dsd"/> : 
         <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          const url = res[0].ufsUrl;
          res && setFiles?.(url as unknown as File[]);
          onFileChange?.(url as unknown as File[]);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />}
   
    </main>
  );
}
