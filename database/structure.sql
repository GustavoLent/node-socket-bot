create database seccomp;

create table subscribers(
	ID integer not null auto_increment,
    Phone varchar(30),
    MessageReciever tinyint not null default 1,

    unique key (Phone),
    primary key(ID)
);

drop table subscribers;