import * as signalR from "@microsoft/signalr";
import { host, profileId } from "../Env";

const connection = new signalR.HubConnectionBuilder().withUrl(`${host}/chatHub`).build();


connection.start()
    .then(function () {
        console.log("connection start");
    })
    .catch(function (err) {
        return console.error(err.toString());
    });


export {
    connection
}