import {autorun, observable} from 'mobx';
const ipc = require('electron').ipcRenderer;

class Store {
    @observable filePath = null;
    @observable position= null;
    @observable siblingImages = null;
}

let store = window.store = new Store;

export default store;

// update via ipc
ipc.on('store', function(event, json) {
   for(let key in json){
       store[key] = json[key];
   }
});

// init ipc connection
ipc.send('init');

autorun(()=>{
});