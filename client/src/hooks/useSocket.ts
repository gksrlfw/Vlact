import { SOCKET_URL } from '@/store/GlobalVariable';
import io from 'socket.io-client';
import { ref, reactive } from 'vue';

// emit: c to s
// on: s to c 
// const sockets: { [key: string]: SocketIOClient.Socket } = {};
const sockets: { [key: string]: SocketIOClient.Socket } = reactive({});
function disconnected(workspace: string, disconnect: any) {
  if(workspace && sockets[workspace]) {
    disconnect.value = sockets[workspace].disconnect;
    delete sockets[workspace];
  }
}

export function useSocket(workspace: string): [SocketIOClient.Socket | undefined, any] {
  console.log(`${SOCKET_URL}/ws-${workspace}`);
  
  const disconnect = ref('');
  if(!workspace) return [undefined, disconnect];
  disconnected(workspace, disconnect);
  console.log(workspace);
  if(!sockets[workspace]) {
    sockets[workspace] = io.connect(`${SOCKET_URL}/ws-${workspace}`, {
      transports: ['websocket']
    });
    console.log('created!!!!');
    
  }
  
  sockets[workspace].emit('hello', 'world');

  return [sockets[workspace], disconnect];
}; 
