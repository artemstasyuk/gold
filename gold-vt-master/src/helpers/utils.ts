import { FILE_MANAGER_MEDIA_URL } from '@/consts/filemanager';

export const isValue = (value: any) => {
  return typeof value !== 'undefined' && value !== '' && value !== null;
};

export const getFilesFromDragEvent = (e: DragEvent): Array<File> => {
  if (e.dataTransfer && e.dataTransfer.files) {
    const files = e.dataTransfer.files;
    return [...Array.from({ length: files.length })]
      .map((v, i) => {
        return files.item(i);
      })
      .filter(i => i) as Array<File>;
  }
  return [];
};

export const buildMediaUrl = (path: string): string => {
  return `${FILE_MANAGER_MEDIA_URL}${path}`;
};

const getAspectRatioSize = (srcWidth: number, srcHeight: number, width: number, height: number) => {
  const widthRatio = width ? width / srcWidth : 1;
  const heightRation = height ? height / srcHeight : 1;
  /* Get size for image, scale to fit width and height args */
  const ratio = Math.min(widthRatio, heightRation);
  let scale = { width: srcWidth * ratio, height: srcHeight * ratio };
  if (scale.width < width) {
    const fitToWidth = width / scale.width;
    scale = { width, height: scale.height * fitToWidth };
  }

  if (scale.height < height) {
    const fitToHeight = height / scale.height;
    scale = { width: scale.width * fitToHeight, height };
  }

  return scale;
};

const cropImageFile = (blob: Blob, options: Record<string, any>) => {
  return new Promise((resolve, reject) => {
    /* Crop scaled image */
    const cropImage = new Image();
    const canvasCrop = document.createElement('canvas');
    canvasCrop.width = options.width;
    canvasCrop.height = options.height;
    cropImage.src = URL.createObjectURL(blob);
    cropImage.addEventListener('load', () => {
      const cropCtx = canvasCrop.getContext('2d');
      /* Crop shape from center of scaled image */
      const sx = Math.max((cropImage.width - options.width) / 2, 0);
      const sy = Math.max((cropImage.height - options.height) / 2, 0);
      if (cropCtx) {
        cropCtx.drawImage(cropImage, sx, sy, options.width, options.height, 0, 0, options.width, options.height);
        cropCtx.canvas.toBlob((croppedBlob) => {
          if (croppedBlob) {
            resolve(croppedBlob);
          } else {
            reject(new Error('Error when convert cropped to blob'));
          }
        }, options.type, 1);
      } else {
        reject(new Error('Error create 2D context for crop'));
      }
    });
  });
};

export const resizeAndCropImageFile = (file: File, options: Record<string, any>) => {
  const reader = new FileReader();
  const withCrop = options.crop && options.width && options.height;

  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.addEventListener('load', (e: any) => {
      const img = new Image();
      if (e && e.target) {
        img.src = e.target.result;
        img.addEventListener('load', () => {
          /* Scale image first */
          const scaleSize = getAspectRatioSize(img.width, img.height, options.width, options.height);
          const canvas = document.createElement('canvas');
          canvas.width = scaleSize.width;
          canvas.height = scaleSize.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, scaleSize.width, scaleSize.height);
            ctx.canvas.toBlob(async (blob) => {
              if (blob) {
                if (withCrop) {
                  blob = await cropImageFile(blob, { type: file.type, ...options }) as Blob;
                }

                /* Resolve resized image */
                const newFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now()
                });
                resolve(newFile);
              } else {
                reject(new Error('Error when convert to blob'));
              }
            }, file.type, 1);
          } else {
            reject(new Error('Error create 2D context for scale'));
          }
        });
      } else {
        reject(new Error('Error when file read'));
      }
    });
    reader.addEventListener('error', e => {
      reject(e);
    });
  });
};

export function readFileAsync (file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      resolve(reader.result);
    });

    reader.addEventListener('error', reject);

    reader.readAsDataURL(file);
  });
}
