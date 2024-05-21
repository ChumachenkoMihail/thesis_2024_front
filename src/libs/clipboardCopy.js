import { toast } from "sonner";

function fallbackCopyTextToClipboard(text, message = "") {
  let textArea = document.createElement("textarea");
  textArea.value = text;
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  textArea.style.zIndex = "0";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    let successful = document.execCommand("copy");
    let msg = successful ? "успешно" : "не успешно";
    toast.info(`${message} cкопировано ${msg}`);
  } catch (err) {
    toast.error(`Fallback: Oops, unable to copy: ${err}`);
  }

  document.body.removeChild(textArea);
}
export const copyToTextClipboard = (text, message) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text, message);
    return;
  }

  navigator.clipboard.writeText(text).then(
    function () {
      toast.info(`${message} успешно скопировано`);
    },
    function (err) {
      toast.error(`Async: Could not copy text: ${err}`);
    },
  );
};
