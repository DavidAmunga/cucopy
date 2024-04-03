export function getLastQueryParamValueFromUrl(url: string): string | null {
  const urlParams = new URLSearchParams(url);
  const keys = Array.from(urlParams.keys());
  const lastKey = keys[keys.length - 1];
  return urlParams.get(lastKey);
}
export function shareViaWhatsApp(text: string, url: string): void {
  const whatsappBaseUrl = "https://api.whatsapp.com/send";
  const encodedShareText = encodeURIComponent(text);
  const encodedShareUrl = encodeURIComponent(url);

  const whatsappShareLink = `${whatsappBaseUrl}?text=${encodedShareText}%20${encodedShareUrl}`;

  window.open(whatsappShareLink, "_blank");
}

export function shareViaEmail(
  subject: string,
  body: string,
  recipients: string[] = [],
): void {
  const emailUrl = `mailto:${recipients.join(",")}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  window.open(emailUrl, "_blank");
}
