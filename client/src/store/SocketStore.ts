import io from 'socket.io-client';
import { globalChatDatas, SOCKET_URL } from '@/store/GlobalVariable';
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

  onMessage(socket: any) {
    if(!socket) return;
    socket.on('dm', (data: any) =>{
      this.newChat.value = data;
    });
    return () => {
      socket.off('dm');
    }
  }

  onMessageChannel(socket: any) {
    if(!socket) return;
    socket.on('message', (data: never) => {
      globalChatDatas.value = data;      
    });
    return () => {
      socket.off('message');
    }
  }
}

const socketStore = new SocketStore();
export default socketStore;
