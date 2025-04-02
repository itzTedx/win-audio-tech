import { type FileRouter, createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("file url", file.ufsUrl);

    return { filename: file.name };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
