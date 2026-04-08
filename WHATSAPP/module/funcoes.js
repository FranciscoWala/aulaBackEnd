/*****************************************************************************
 * Projeto: Criar funções capaz de trabalhar em conjunto com arquivo .json 
 * de contatos para futuramente criar API.
 * Autor: Francisco Wala
 * Data:08/04/26
 * Versão:1.0
 *****************************************************************************/

const contatosWhatsapp = require('./contatos')
const contatos = contatosWhatsapp.contatos
const ERROR_NOT_FIND = { STATUS: false, STATUS_CODE: 404, DESENVOLVEDOR: 'Francisco_Wala' }

/*
Listar todos os dados de usuário independente do número  
(Retornar todos os dados)
*/
//'whats-users'
function getUserData() {

    let listUsers = { STATUS: true, STATUS_CODE: 200, DESENVOLVEDOR: 'Francisco_Wala', users: [] }

    contatos['whats-users'].forEach(function (itemUserList) {

        listUsers.users.push(
            {
                id: itemUserList.id,
                account: itemUserList.account,
                nickname: itemUserList.nickname,
                number: itemUserList.number,
                image_user: itemUserList['profile-image'],
                create_since_start: itemUserList['created-since'].start,
                create_since_end: itemUserList['created-since'].end,
                background: itemUserList.background,
                contacts: itemUserList.contacts.map(function (userContact) {
                    return {
                        name: userContact.name,
                        description: userContact.description,
                        image: userContact.image,
                        messages: userContact.messages.map(function (userMessages) {
                            return {
                                sender: userMessages.sender,
                                content: userMessages.content,
                                time: userMessages.time
                            }
                        })
                    }
                })
            }
        )

    })

    if (listUsers.users.length > 0) {
        return listUsers
    }
    return ERROR_NOT_FIND

}
// console.log(getUserData())
/**
    Listar dados da conta do profile do usuário  
    (Todos os dados do profile que podem ser alterados como nome,“nick”, 
    foto, número, imagem, cor de fundo e dados da conta como criação e 
    encerramento,  etc)
 */
function getListDataProfile(contactNumber) {
    let answer = { STATUS: true, STATUS_CODE: 200, DESENVOLVEDOR: 'Francisco_Wala', user: [] }
    const userDatas = getUserData()
    userDatas.users.forEach(function (userInfo) {
        if (userInfo.number == contactNumber) {
            answer.user.push(userInfo)
        }
    })
    if(answer.user.length>0){
        return answer
    }
    ERROR_NOT_FIND
}
console.log(getListDataProfile('11987876567'))