const fs = require("fs");
const path = require('path');
const isImage = require('is-image');


export function getImagesInFolder(folder){
    let filesArr = [];
    fs.readdirSync(folder).forEach(file => {
        if(isImage(path.resolve(folder, file)) && !(file.startsWith("."))){
            filesArr.push(file);
        }
    });
    return filesArr;
}

export function getSiblingImages(filePath){
    const onlyPath = path.dirname(filePath);
    return getImagesInFolder(onlyPath);
}

export function getFilename(filepath){
    return path.basename(filepath);
}

export function changeImage(store, isUp){
    const filePath = store.filePath;
    if(filePath){
        const onlyPath = path.dirname(filePath);
        const siblingImages = getImagesInFolder(onlyPath);
        let position = 0;
        for(let i = 0; i < siblingImages.length; i++){
            if(getFilename(filePath) === siblingImages[i]){
                position = i;
                break;
            }
        }
        let newImageFilePath = filePath;
        if(isUp && position !== siblingImages.length - 1){
            newImageFilePath = path.resolve(onlyPath, siblingImages[position + 1]);
        }
        if(!isUp && position !== 0){
            newImageFilePath = path.resolve(onlyPath, siblingImages[position -1]);
        }
        store.filePath = newImageFilePath;
    }
}