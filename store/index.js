import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";
import app from "./modules/app";
import user from "./modules/user";
import market from "./modules/market";
import {WS_URL} from '../config/app.js'
import Socket from '@/api/wsapi/ws'

let socket =  new Socket(WS_URL)
socket.on('message',(evt)=>{
  if(JSON.parse(evt.data).action=='ping'){
       let pingMessage = {
           action: "ping"
    }
    socket.send(pingMessage)
  }
})

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
	state:{
	  ws:socket,
	},
    actions,
    getters,
    modules: {
        app,
        user,
        market,
    },
    strict: false,
    // plugins: debug ? [createLogger()] : []
});
