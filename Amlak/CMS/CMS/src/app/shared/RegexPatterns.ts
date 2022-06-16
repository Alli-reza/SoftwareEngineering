export const EmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const UrlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
export const PersianCharactersPattern = /^[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651-\u0655-\u067E-\u0686-\u0698-\u06A9-\u06AF-\u06BE-\u06CC-\u060C-\u061B-\u061F-\u0640-\u066A-\u066B-\u066C\s]+$/;
export const MobilePattern = /^9|0\d{10}$/;
export const TelephonePattern = /^\d{12}$/;
export const PersianNationalCode = /^\d{10}$/;
export const ShebaBankNumber = /^\d{24}$/;
export const ZipCode = /^\d{10}$/;
export const GetPrice = /^0*([1-8][0-9]{4}|9[0-8][0-9]{3}|99[0-8][0-9]{2}|999[0-8][0-9]|9999[0-9]|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-9]|[1-8][0-9]{6}|9[0-8][0-9]{5}|99[0-8][0-9]{4}|999[0-8][0-9]{3}|9999[0-8][0-9]{2}|99999[0-8][0-9]|999999[0-9]|10000000)$/;
export const TransferPrice = /^0*([1-8][0-9]{4}|9[0-8][0-9]{3}|99[0-8][0-9]{2}|999[0-8][0-9]|9999[0-9]|[1-8][0-9]{5}|9[0-8][0-9]{4}|99[0-8][0-9]{3}|999[0-8][0-9]{2}|9999[0-8][0-9]|99999[0-9]|[1-8][0-9]{6}|9[0-8][0-9]{5}|99[0-8][0-9]{4}|999[0-8][0-9]{3}|9999[0-8][0-9]{2}|99999[0-8][0-9]|999999[0-9]|[1-8][0-9]{7}|9[0-8][0-9]{6}|99[0-8][0-9]{5}|999[0-8][0-9]{4}|9999[0-8][0-9]{3}|99999[0-8][0-9]{2}|999999[0-8][0-9]|9999999[0-9]|100000000)$/;
export const IsIEOrEdge = /msie\s|trident\//i.test(
  window.navigator.userAgent
);
export const TrueFileFormats = /^.*\.(jpg|JPG|jpeg|JPEG|ico|ICO|png|PNG|tiff|TIFF|pjp|PJP|jfif|JFIF|svg|SVG|bmp|BMP|webp|WEBP|svgz|SVGZ|xbm|XBM|dib|DIB|tif|TIF|pjpeg|PJPEG|avif|AVIF|gif|GIF|doc|DOC|docx|DOCX|pdf|PDF)$/;
export const JustNumber = /^\d+$/;
export const imageFormats = ["jpg", "png", "jpeg"];