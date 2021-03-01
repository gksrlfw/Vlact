import { IDM } from "@/interfaces/Server/db";
import dayjs from "dayjs";


export default function divideSection(chatList: IDM[]) {
  const sections: { [key:string]: IDM[] } = {};
  chatList.forEach((chat: IDM) => {
    const monthDate = dayjs(chat.createdAt).format('YYYY-MM-DD');
    if(Array.isArray(sections[monthDate])) sections[monthDate].push(chat);
    else sections[monthDate] = [chat];
  });
  return sections;
}

// function brResult(data) {
//   return regexifyString({
//     input: data.content,
//     pattern: /\n/g,
//     decorator(match, index) {
//       return <br key="{index}" />;
//     },
//   });
// }