const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "text/css": "css",
  "text/csv": "cvs",
  "image/vnd.microsoft.icon": "ico",
  "application/pdf": "pdf",
  "font/otf": "otf",
  "application/rtf": "rtf",
  "text/plain": "txt",
  "image/tiff": "tif",
  "image/tiff": "tiff",
  "font/ttf": ".ttf",
  "image/webp": "webp",
  "font/woff": "woff",
  "font/woff2": "woff2",
  "application/xml": "xml",
  "text/xml": "xml",
  "application/epub+zip": "epub",
  "application/photoshop": "psd",
  "application/illustrator": "ai",
  "image/vnd.dwg": "dwg",
  "image/x-dwg": "dwg",
  "application/acad": "dwg",
  "application/x-acad": "dwg",
  "application/autocad_dwg": "dwg",
  "application/dwg": "dwg",
  "application/x-dwg": "dwg",
  "application/x-autocad": "dwg",
  "drawing/dwg": "dwg",
  "application/msword": "doc",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "docx",
  "application/vnd.ms-powerpoint": "ppt",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "pptx",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
  "image/svg+xml": "svg",
  "application/vnd.amazon.ebook": "azw",
};
const MIME_TYPE_MAP_for_profile_pic = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
  "image/svg+xml": "svg",
};

module.exports = {
  MIME_TYPE_MAP,
  MIME_TYPE_MAP_for_profile_pic,
};
