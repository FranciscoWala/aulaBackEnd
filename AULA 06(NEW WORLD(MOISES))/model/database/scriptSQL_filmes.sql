
#Permite criar um database
create database db_filmes_20261_b;

#Permite visulizar todos os databases existentes
show databases;

#Permite escolher o database a ser utilizado
use db_filmes_20261_b;

#Permite visualizar todas as tabelas existentes dentro do database
show tables;

create table tbl_filme (
	id 					int not null auto_increment primary key,
    nome 				varchar(80) not null,
    sinopse 			text not null,
    capa 				varchar(255) not null,
    data_lancamento 	date not null,
    duracao 			time not null,
    valor 				decimal(5,2) default 0,
    avaliacao 			decimal(3,2) default null
);

#São comandos que devem ser rodados apenas em caso específico, e com muita atenção
#drop table tbl_filme;
#drop  database db_filmes_20261_b
#Rollback servirá para correr atrás do prejuízo de ter apagado um banco de dados ou tabela, e etc
#RollBack

#É !inteiro, põe "aspas", é inteiro(int), não põe "aspas"
insert into tbl_filme (
	nome,
    sinopse,
    capa,
    data_lancamento,
    duracao,
    valor,
    avaliacao
) values (
	'Super Mario Galaxy: O Filme',
    'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
    'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg',
    '2026-04-02',
    '01:39:00',
    '50.60',
    '3'
);

select * from tbl_filme order by id desc;
select * from tbl_filme where id = 35;

#Um dos comandos mais perigosos, tendo em vista que apenas o update muda tudo na tabela do banco de dados, ELE PRECISA DE UM CRITÉRIO DE BUSCA == WHERE id = 33 (exemplo)
update tbl_filme set
	nome = 'Filme 01 - teste de atualização',
    sinopse = 'Testando a atualização do filme',
    capa = 'teste',
    data_lancamento = '2026/04/29',
    duracao = '02:30:00',
    valor = '10',
    avaliacao = '2'
where id = 35;

#delete from tbl_filme where id > 0;
