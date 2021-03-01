import io from 'socket.io-client';
import { SOCKET_URL } from '@/store/GlobalVariable';
import { ref, reactive } from 'vue';


export class SocketStore {
  private sockets: { [key: string]: SocketIOClient.Socket } = reactive({});
  private disconnect = reactive({});
  private onlineList = ref('');
  private newChat = ref(null);

  onDisconnect(socket: any) {
    return () => {
        socket.emit('disconnect', () => {
        console.log('연결종료');
      });
    }
  }

  private disconnected(workspace: string, disconnect: any) {
    if(workspace && this.sockets[workspace]) {      
      disconnect = this.sockets[workspace].disconnect();
      // disconnect = this.onDisconnect(this.sockets[workspace]);
      console.log(disconnect);
      delete this.sockets[workspace];
    }
  }

  getSockets() {
    return this.sockets;
  }

  getDisconnect() {
    return this.disconnect;
  }
  getOnlineList() {
    return this.onlineList;
  }

  getSocketsAndDisconnect(workspace: string) {
    return [this.sockets[workspace], this.disconnect];
  }

  getNewChat() {
    return this.newChat;
  }

  useSocket(workspace: string): [SocketIOClient.Socket | undefined, any] {
    if(!workspace) return [undefined, this.disconnect];
    this.disconnected(workspace, this.disconnect);

    if(!this.sockets[workspace]) {
      console.log("여기오니??");
      
      this.sockets[workspace] = io.connect(`${SOCKET_URL}/ws-${workspace}`, {
        transports: ['websocket']
      });
    }    
    return [this.sockets[workspace], this.disconnect];
  }; 


  emitLoginUser(socket: any, data:any) {
    socket.emit('login', data);
  }

  onOnlineList(socket: any) {
    if(!socket) return;
    socket.on('onlineList', (data: any) => {
      this.onlineList.value = data.reduce((acc: string | any[], curr: any) => acc.includes(curr) ? acc : [...acc, curr], []);
    });
    
    return () => { 
      socket.off('onlineList');
    }
  }

  onM() {
    console.log('onM');
    
  }
  onMessage(socket: any) {
    console.log('???', socket);
    if(!socket) return;
    socket.on('dm', (data: any) =>{
      console.log('data', data);
      this.newChat.value = data;
    });
    return () => {
      socket.off('dm');
    }
  }
  // onMessageT(socket: any, id: any, userid: any, chatDatas: any) {
  //   console.log('???',socket);
    
  //   if(!socket) return;
  //   socket.on('dm', (data: any) => {
  //     this.onTrigger(data, id, userid, chatDatas)
  //   });
  //   return () => {
  //     socket.off('dm');
  //   }
  // }
  // onTrigger(data: any, id: any, userid: any, chatDatas: any) {
  //   console.log(data.SenderId, id, userid);
  //   if (data.SenderId !== Number(id) || userid === Number(id)) return;
  //   chatDatas.value.unshift(data);
  //   console.log(chatDatas.value[0]);
  // }
}

const socketStore = new SocketStore();
export default socketStore;
