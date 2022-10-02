import axios from 'axios';
import { host, profileId } from './../../../Env';

const postCreateChat = async (internalProfileId, contactId, content, resetFunction) => {
    debugger
    const response = await fetch(
        `${host}/Chat/PostCreateChat?profileId=${internalProfileId}&chatId=${contactId}&content=${content}`,
        { method: "POST" }
    )

    if (response.status === 200) 
        resetFunction(await response.json());
}



// procesamiento de los mensajes para poder verlos
const _indice = {
    start: 0,
    end: 100
};

const getChatListPage = async (contactId, isReset) => {
    const response = await axios.get(`${host}/Chat/GetListOfLastChats?profileId2=${contactId}&profileId=${profileId.value}&min=${_indice.start}&max=${_indice.end}`);

    let groupDays = {};

    for (const item of response.data) {
        groupDays[item[0].day] = item;
    }


    if (isReset) {
        _indice.start = 0;
        _indice.end = 100;
    }  

    else {
        _indice.start = _indice.end;
        _indice.end = _indice.end + 100;
    }


    return groupDays;
};


export {
    postCreateChat,
    getChatListPage
}