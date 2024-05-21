import { toast } from "sonner";

export const convertImageToBase64 = async (url) => {
  try {
    if (url.startsWith("http")) {
      const response = await fetch(url);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            const base64Data = reader.result.split(",")[1]; // Remove the data URI prefix
            resolve(base64Data);
          } else {
            reject(new Error("Failed to read the image."));
          }
        };
        reader.readAsDataURL(blob);
      });
    }
  } catch (error) {
    toast.error("Ошибка конвертации фото", {
      description: "Возможно фото не доступно из за CORS",
    });
  }
};
