import io from 'socket.io-client'
import store from '../store/store'
import Vue from 'vue'
import { IOEvent } from 'shared/util/consts'


class GameSocket {
    constructor(store){
        var socket = io("http://localhost:8888")
        socket.on(IOEvent.Choose, result => {
            var callback = this.callbacks[IOEvent.Choose]
            callback && callback(result)
        })

        var updateGame =  info => {
            this.store.commit('updateGame',info)
        }
        socket.on(IOEvent.Update,updateGame)

        this.callbacks = []
        this.socket = socket 
        this.store = store
    }
    choose(choice,callback) {
        this.socket.emit(IOEvent.Choose,choice)
        this.callbacks[IOEvent.Choose] = callback
    }
}

 

var SocketPlugin = {
    install:function(){
        
        Vue.prototype.socket = new GameSocket(store)
    }
}

export default SocketPlugin