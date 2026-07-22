#create database db_filmes_20261_b;

use db_filmes_20261_b;

show tables;

insert into tbl_filme (
	nome,
    sinopse,
    capa,
    data_lancamento,
    duracao,
    valor,
    avaliacao
) values (
	'Malhação',
    'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
    'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg',
    '2026-04-02',
    '01:39:00',
    '50.60',
    '3'
);

#select * from tbl_filme order by id desc;

insert into tbl_sexo (
	sigla,
    sexo
) values (
	'F',
    'Feminino'
);

#delete from tbl_sexo where id = 2 or id = 3;

insert into tbl_cargo (
    cargo
) values (
	'Diretor'
);

#select * from tbl_cargo;

insert tbl_classificacao (
	nome,
    idade_limite,
    sigla,
    icon_url ,
    descricao
) values (
	'Livre',
    '0',
    'L',
	'akdfjf.com.br',
    'Disponível para maior de 18 anos'
);

#select * from tbl_classificacao;

insert into tbl_genero (
	tipo_genero
) value (
	'Romance'
);

#select * from tbl_genero;

insert into tbl_nacionalidade (
	nome_nacionalidade
) values ('Africana');

#select * from tbl_nacionalidade;

insert into tbl_profissional (
	nome,
    data_nascimento,
    foto_url,
    biografia,
    pais_origem,
    id_sexo
) values (
	'João',
	'2001-11-20',
    'asdfkjl.com.br',
    'Um homem pipipipopopo',
    'Brasil',
    2
);

#select * from tbl_profissional;

insert into tbl_nacionalidade_profissional (
	id_nacionalidade,
    id_profissional
) values (
	1,
    2
);

#select * from tbl_nacionalidade_profissional;

insert into tbl_genero_filme (
	id_genero,
    id_filme
) values (
	1,
    1
);

#select * from tbl_genero_filme;

insert into tbl_filme_profissional_cargo (
	id_filme,
    id_profissional,
    id_cargo
) values (
	2,
    2,
    2
);

#select * from tbl_filme_profissional_cargo;