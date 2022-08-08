import {v4 as uuidv4} from "uuid";
import User from "@/store/User";
//引入UUID

export const GetUuid = () => {
    let uerToken = localStorage.getItem("USERTOKEN")
    //获取UUID
    let uuid_token = localStorage.getItem("UUIDTOKEN");
    //判断是否存在，存在获取不存在设置UUID
    if (!uuid_token&&!uerToken) {
        uuid_token = uuidv4();
        localStorage.setItem("UUIDTOKEN", uuid_token);
    }
    return uuid_token;
}

export const UserToken = () => {
    let uerToken = User.state.token;
    if (uerToken) {
        localStorage.setItem("USERTOKEN", User.state.token);
        localStorage.removeItem("UUIDTOKEN");
    }
}

