create database seccomp;

create table subscribers(
	ID integer not null auto_increment,
	`Name` varchar(255) not null,
    Phone varchar(30),
    MessageReciever tinyint not null default 1,

    unique key (Phone),
    primary key(ID)
);

drop table subscribers;