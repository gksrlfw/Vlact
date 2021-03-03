- 모달, layoutside 공통 함수 빼내기

- 소켓: 이벤트를 한번 걸었으면 해제해주어야 한다

- reactive로 할때, const a = reactive({});, a = 'a' 이런식으로 하면 a는 일반변수가 된다
- reactive.a = 'a' 로 하든지 그냥 ref.value를 사용하자

- DM의 경우, 소켓을 연결, 해제하는 부분이 이상해서 'dm' 이벤트로 값을 받지 못함

- channel에서 메세지를 보낸 후에 서버에서 전체 데이터를 다시 요청받는거는 너무 느리다
  -> globalChannel이 변경되었을떄 chatDatas를 바꾸어 프론트에서 해결하려고 했는데
  -> 이상하게 watch가 chatDatas의 변경을 감지하지 못한다.. 그냥 getChatData로 chatDatas를 바꾸면 감지함.. 왜지?

======================

1. 현재
   채널에 초대되지 않았더라도 같은 워크스페이스 안에 있으면 해당 채팅을 볼수있다...
   -> 채널에 초대되지 않으면 못보게... -> 아니면 채널이 안보이게..

2. 모달 공통부분 빼내기

===============================

- absolute: 부모중 relative, (static 빼고)를 기준으로 top, bot ... 가능해진다
- display: table, table-cell 한 뒤에 vertical-align 하자

* https://github.com/mercs600/vue3-perfect-scrollbar
* SOCKET.IO.CLIENT
