
#drop database db_filmes_20261_b;

#Permite criar um database
create database db_filmes_20261_b;

#Permite visulizar todos os databases existentes
show databases;

#Permite escolher o database a ser utilizado
use db_filmes_20261_b;


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

#É diferente de inteiro? , põe "aspas", é inteiro(int), não põe "aspas"


#select * from tbl_filme order by id desc;
#select * from tbl_filme where id = 35;

#Um dos comandos mais perigosos, tendo em vista que apenas o update muda tudo na tabela do banco de dados, ELE PRECISA DE UM CRITÉRIO DE BUSCA == WHERE id = 33 (exemplo)
#update tbl_filme set
#	nome = 'Filme 01 - teste de atualização',
#    sinopse = 'Testando a atualização do filme',
#    capa = 'teste',
#    data_lancamento = '2026/04/29',
#    duracao = '02:30:00',
#    valor = '10',
#    avaliacao = '2'
#where id = 35;

#delete from tbl_filme where id > 0;

create table tbl_sexo (
	id 		int not null auto_increment primary key,
	sigla	varchar(3) not null,
    sexo 	varchar(15) not null
);

create table tbl_cargo (
	id 		int not null auto_increment primary key,
	cargo	varchar(50) not null
);

create table tbl_classificacao (
	id 				int not null auto_increment primary key,
	nome			varchar(20) not null,
    idade_limite	int not null,
    sigla 			varchar(5) not null,
    icon_url 		varchar(255) not null,
    descricao 		text
);

create table tbl_genero (
	id 					int not null auto_increment primary key, 
    tipo_genero			varchar(50) not null
);

create table tbl_nacionalidade (
	id 					int not null auto_increment primary key,
	nome_nacionalidade 	varchar(30) not null
);

create table tbl_profissional (
	id 					int not null auto_increment primary key,
    nome 				varchar(80) not null,
    data_nascimento 	date not null,
    foto_url 			varchar(255) not null,
    biografia			text not null,
    pais_origem			varchar(60) not null,
	id_sexo				int not null,
    
    constraint 			FK__PROFISSIONAL_SEXO
    foreign key 		(id_sexo)
    references 			tbl_sexo(id)
);

create table tbl_nacionalidade_profissional (
	id 					int not null auto_increment primary key,
    id_nacionalidade 	int not null,
    id_profissional		int not null,
    
	constraint 			FK_NACIONALIDADEPROFISSIONAL_NACIONALIDADE
    foreign key 		(id_nacionalidade)
    references 			tbl_nacionalidade(id),
    
    constraint 			FK_NACIONALIDADEPROFISSIONAL_PROFISSIONAL
    foreign key 		(id_profissional)
    references 			tbl_profissional(id)
);

create table tbl_filme_genero (
	id 					int not null auto_increment primary key,
    id_genero			int not null,
    id_filme			int not null,
    
    constraint			FK_GENEROFILME_GENERO
    foreign key 		(id_genero)
    references 			tbl_genero(id),
    
    constraint			FK_GENEROFILME_FILME
    foreign key 		(id_filme)
    references 			tbl_filme(id)
);

create table tbl_filme_profissional_cargo (
	id 						int not null auto_increment primary key,
    id_filme			 	int not null,
    id_profissional			int not null,
    id_cargo				int not null,
    
    constraint			FK_FILMEPROFISSIONAL_FILME
    foreign key 		(id_filme)
    references 			tbl_filme(id),
    
    constraint			FK_FILMEPROFISSIONAL_PROFISSIONAL
    foreign key 		(id_profissional)
    references 			tbl_profissional(id),
    
	constraint			FK_FILMEPROFISSIONAL_CARGO
    foreign key 		(id_cargo)
    references 			tbl_cargo(id)
    
);

#Permite visualizar todas as tabelas existentes dentro do database
show tables;