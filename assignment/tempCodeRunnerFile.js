function convertToBuffer(dataURL) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);
            canvas.toBlob(function (blob) {
                const reader = new FileReader();
                reader.onloadend = function () {
                    resolve(new Uint8Array(reader.result));
                };
                reader.onerror = function (error) {
                    reject(error);
                };
                reader.readAsArrayBuffer(blob);
            }, 'image/jpeg');
        };
        image.onerror = function (error) {
            reject(error);
        };
        image.src = dataURL;
    });
}