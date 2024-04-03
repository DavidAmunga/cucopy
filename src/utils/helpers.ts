export function getLastQueryParamValueFromUrl(url: string): string | null {
  const urlParams = new URLSearchParams(url);
  const keys = Array.from(urlParams.keys());
  const lastKey = keys[keys.length - 1];
  return urlParams.get(lastKey);
}
export function shareViaWhatsApp(text: string): void {
  const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(text)}`;

  if (navigator.share) {
    navigator
      .share({ title: "Share via WhatsApp", text: text, url: whatsappUrl })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.error("Error sharing:", error));
  } else {
    window.open(whatsappUrl, "_blank");
  }
}

export function shareViaEmail(
  subject: string,
  body: string,
  recipients: string[] = []
): void {
  const emailUrl = `mailto:${recipients.join(",")}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  if (navigator.share) {
    navigator
      .share({ title: "Share via Email", text: body, url: emailUrl })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.error("Error sharing:", error));
  } else {
    window.open(emailUrl, "_blank");
  }
}
