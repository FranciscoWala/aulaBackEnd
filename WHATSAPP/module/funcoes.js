/*****************************************************************************
 * Projeto: Criar funções capaz de trabalhar em conjunto com arquivo .json 
 * de contatos para futuramente criar API.
 * Autor: Francisco Wala
 * Data:08/04/26
 * Versão:1.0
 *****************************************************************************/

const contatosWhatsapp = require('./contatos')
const contatos = contatosWhatsapp.contatos

/*
Listar todos os dados de usuário independente do número  
(Retornar todos os dados)
*/

//'whats-users'

function listarUsuarios() {

    let listUsers = { STATUS: true, STATUS_CODE: 200, DESENVOLVEDOR: 'Francisco_Wala', users: [], contacts: [] }

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
    return listUsers

}
console.log(listarUsuarios())