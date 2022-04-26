CREATE DATABASE IF NOT EXISTS topbike;
USE topbike;

CREATE TABLE user(
    id int not null auto_increment,
    name varchar(50) not null,
    email varchar(50) unique not null,
    password varchar(50) not null,
    picture varchar(50) not null,
    primary key(id)
);

CREATE TABLE category(
    id int not null auto_increment,
    name varchar(50) not null,
    primary key(id)
);

CREATE TABLE product(
    id int not null auto_increment,
    name varchar(50) not null,
    price float unsigned NOT NULL DEFAULT '0',
    discount int not null DEFAULT '0',
    id_category int not null,
    primary key(id),
    foreign key(id_category) references category(id)
);

CREATE TABLE cart(
    id int not null,
    id_user int not null,
    id_product int not null,
    quantity int not null,
    primary key(id),
    foreign key(id_user) references user(id),
    foreign key(id_product) references product(id)
);