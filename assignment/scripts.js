document.getElementById('fileInput').addEventListener('change', handleFileSelection);

function handleFileSelection(event) {
    const files = event.target.files;

    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = function (readerEvent) {
            const imageElement = document.createElement('img');
            imageElement.src = readerEvent.target.result;
            imageElement.alt = 'Selected Image';
            const imageContainer = document.getElementById('imgcontainer');
            imageContainer.innerHTML = '';
            imageContainer.appendChild(imageElement);

            convertToBuffer(imageElement.src)
                .then(buffer => recognizeText(buffer))
                .then(result => {
                    console.log(result);
                })
                .catch(error => {
                    console.error(error);
                });
        };
        reader.readAsDataURL(file);
    }
}

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

async function recognizeText(buffer) {
    const { data } = await Tesseract.recognize(buffer);
    console.log(data.text);
    return data.text;
}
 