async function generateThumbnail(file, maxSize = 400) {
  return new Promise((resolve) => {
    if (file.type.startsWith('image/')) {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let w = img.width;
        let h = img.height;
        if (w > h) {
          if (w > maxSize) { h = h * maxSize / w; w = maxSize; }
        } else {
          if (h > maxSize) { w = w * maxSize / h; h = maxSize; }
        }
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        canvas.toBlob((blob) => {
          URL.revokeObjectURL(url);
          resolve(blob);
        }, 'image/jpeg', 0.8);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };
      img.src = url;
    } else if (file.type.startsWith('video/')) {
      const video = document.createElement('video');
      const url = URL.createObjectURL(file);
      video.muted = true;
      video.playsInline = true;
      video.preload = 'metadata';
      video.onloadeddata = () => {
        video.currentTime = 0.1;
      };
      video.onseeked = () => {
        const canvas = document.createElement('canvas');
        let w = video.videoWidth;
        let h = video.videoHeight;
        if (w > h) {
          if (w > maxSize) { h = h * maxSize / w; w = maxSize; }
        } else {
          if (h > maxSize) { w = w * maxSize / h; h = maxSize; }
        }
        canvas.width = w || 200;
        canvas.height = h || 200;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          URL.revokeObjectURL(url);
          resolve(blob);
        }, 'image/jpeg', 0.8);
      };
      video.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(null);
      };
      video.src = url;
    } else {
      resolve(null);
    }
  });
}

function formatDuration(seconds) {
  if (!seconds || isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

async function getVideoDuration(file) {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    const url = URL.createObjectURL(file);
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve(video.duration);
    };
    video.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(0);
    };
    video.src = url;
  });
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

window.mediaUtils = {
  generateThumbnail,
  formatDuration,
  getVideoDuration,
  uid
};
