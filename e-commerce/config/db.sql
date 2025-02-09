create database ecommerce;

create table categories
(
    category_id int auto_increment
        primary key,
    name        varchar(100)                         not null,
    description text                                 null,
    parent_id   int                                  null,
    created_at  datetime default current_timestamp() not null,
    updated_at  datetime                             null on update current_timestamp(),
    constraint categories_ibfk_1
        foreign key (parent_id) references categories (category_id)
            on update cascade on delete set null
);

create index parent_id
    on categories (parent_id);

create table products
(
    product_id  int auto_increment
        primary key,
    category_id int                                  not null,
    name        varchar(255)                         not null,
    description text                                 null,
    price       decimal(10, 2)                       not null,
    sku         varchar(100)                         null,
    stock       int      default 0                   not null,
    created_at  datetime default current_timestamp() not null,
    updated_at  datetime                             null on update current_timestamp(),
    constraint sku
        unique (sku),
    constraint products_ibfk_1
        foreign key (category_id) references categories (category_id)
            on update cascade on delete cascade
);

create index category_id
    on products (category_id);

create table users
(
    user_id       int auto_increment
        primary key,
    email         varchar(255)                                           not null,
    password_hash varchar(255)                                           not null,
    first_name    varchar(100)                                           not null,
    last_name     varchar(100)                                           not null,
    phone_number  varchar(20)                                            null,
    role          enum ('customer', 'admin') default 'customer'          not null,
    created_at    datetime                   default current_timestamp() not null,
    updated_at    datetime                                               null on update current_timestamp(),
    constraint email
        unique (email)
);

create table addresses
(
    address_id   int auto_increment
        primary key,
    user_id      int                                                      not null,
    street       varchar(255)                                             not null,
    city         varchar(100)                                             not null,
    postal_code  varchar(20)                                              not null,
    country      varchar(100)                                             not null,
    address_type enum ('billing', 'shipping') default 'shipping'          not null,
    created_at   datetime                     default current_timestamp() not null,
    updated_at   datetime                                                 null on update current_timestamp(),
    constraint addresses_ibfk_1
        foreign key (user_id) references users (user_id)
            on update cascade on delete cascade
);

create index user_id
    on addresses (user_id);

create table orders
(
    order_id       int auto_increment
        primary key,
    user_id        int                                                                                       not null,
    total_amount   decimal(10, 2)                                                                            not null,
    status         enum ('pending', 'paid', 'shipped', 'delivered', 'cancelled') default 'pending'           not null,
    payment_method varchar(50)                                                                               not null,
    created_at     datetime                                                      default current_timestamp() not null,
    updated_at     datetime                                                                                  null on update current_timestamp(),
    constraint orders_ibfk_1
        foreign key (user_id) references users (user_id)
            on update cascade on delete cascade
);

create table order_addresses
(
    order_address_id int auto_increment
        primary key,
    order_id         int                                             not null,
    street           varchar(255)                                    not null,
    city             varchar(100)                                    not null,
    postal_code      varchar(20)                                     not null,
    country          varchar(100)                                    not null,
    address_type     enum ('billing', 'shipping') default 'shipping' not null,
    constraint order_addresses_ibfk_1
        foreign key (order_id) references orders (order_id)
            on update cascade on delete cascade
);

create index order_id
    on order_addresses (order_id);

create table order_items
(
    order_item_id int auto_increment
        primary key,
    order_id      int            not null,
    product_id    int            not null,
    quantity      int default 1  not null,
    price_each    decimal(10, 2) not null,
    constraint order_items_ibfk_1
        foreign key (order_id) references orders (order_id)
            on update cascade on delete cascade,
    constraint order_items_ibfk_2
        foreign key (product_id) references products (product_id)
            on update cascade
);

create index order_id
    on order_items (order_id);

create index product_id
    on order_items (product_id);

create index user_id
    on orders (user_id);


