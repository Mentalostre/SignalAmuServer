# signal AMU server



route description :
- ```GET /``` : send error 404

- ```GET /api``` : send ***"Signal'AMU server API."*** response


## Database

```mariadb
create table signalamu.tag
(
id       int auto_increment
primary key,
tag_name varchar(255) not null,
constraint tag_tag_name_uindex
unique (tag_name)
);

create table signalamu.user
(
id               int auto_increment
primary key,
user_email       varchar(255)         not null,
password         varchar(255)         not null,
first_name       varchar(255)         not null,
last_name        varchar(255)         not null,
is_verified      tinyint(1) default 0 null,
key_verification int                  not null,
constraint user_user_email_uindex
unique (user_email)
);

create table signalamu.consumer
(
id      int auto_increment
primary key,
user_id int null,
constraint consumer_user_id_fk
foreign key (user_id) references signalamu.user (id)
);

create table signalamu.info
(
id          int auto_increment
primary key,
tel         varchar(255) null,
info_email  varchar(255) null,
info_desc   varchar(512) null,
consumer_id int          not null,
bat         varchar(255) null,
constraint info_consumer_id_fk
unique (consumer_id),
constraint info_consumer_id_fk
foreign key (consumer_id) references signalamu.consumer (id)
);

create table signalamu.producer
(
id      int auto_increment
primary key,
user_id int null,
constraint producer_user_id_fk
foreign key (user_id) references signalamu.user (id)
on delete cascade
);

create table signalamu.report
(
id            int auto_increment
primary key,
report_desc   varchar(512)         null,
report_level  int                  not null,
report_date   mediumtext           null,
location_lat  mediumtext           null,
location_long mediumtext           null,
status        tinyint(1) default 0 not null,
tag_name      varchar(255)         null,
producer_id   int                  null,
consumer_id   int                  null,
constraint report_consumer_id_fk
foreign key (consumer_id) references signalamu.consumer (id),
constraint report_producer_id_fk
foreign key (producer_id) references signalamu.producer (id)
);

create table signalamu.image
(
id          int auto_increment
primary key,
image_name  varchar(255) not null,
report_id   int          null,
producer_id int          null,
constraint image_producer_id_fk
foreign key (producer_id) references signalamu.producer (id),
constraint image_report_id_fk
foreign key (report_id) references signalamu.report (id)
);

create index report_status_id_fk
on signalamu.report (status);

create index report_tag_id_fk
on signalamu.report (tag_name);

create table signalamu.vote
(
id          int auto_increment
primary key,
vote_value  tinyint(1) not null,
producer_id int        not null,
report_id   int        not null,
constraint vote_producer_id_fk
foreign key (producer_id) references signalamu.producer (id),
constraint vote_report_id_fk
foreign key (report_id) references signalamu.report (id)
);

create
definer = admin@`%` function signalamu.getVote(report_id int) returns int
BEGIN
DECLARE pos int;
DECLARE neg int;
SELECT COUNT(vote_value) into pos FROM vote WHERE vote.vote_value = 1 AND vote.report_id = report_id;
SELECT COUNT(vote_value) into neg FROM vote WHERE vote.vote_value = 0 AND vote.report_id = report_id;
IF pos IS NULL THEN
BEGIN
SET pos = 0;
end;
end if;
IF neg IS NULL THEN
BEGIN
SET neg = 0;
end;
end if;
RETURN pos - neg;
end;

create
definer = admin@`%` procedure signalamu.insert_info(IN tel_in varchar(255), IN info_email_in varchar(255),
IN info_desc_in varchar(255), IN mail varchar(255))
BEGIN
DECLARE c_id INT;
SELECT id INTO c_id FROM consumer WHERE user_id = (SELECT id FROM user WHERE user_email=mail);
IF (SELECT count(*) FROM info WHERE consumer_id = c_id) = 1 THEN
BEGIN
UPDATE info SET
info.tel = tel_in,
info.info_email = info_email_in,
info.info_desc = info_desc_in
WHERE info.consumer_id = c_id;
end;
ELSE
BEGIN
INSERT INTO info (tel, info_email, info_desc, consumer_id) VALUES (tel_in, info_email_in, info_desc_in, c_id);
end;

        end IF;
    end;

create
definer = admin@`%` procedure signalamu.insert_vote(IN vote_value_in int, IN report_id_in int, IN mail varchar(255))
BEGIN
DECLARE p_id INT;
SELECT id INTO p_id FROM producer WHERE user_id = (SELECT id FROM user WHERE user_email=mail);
IF (SELECT count(*) FROM vote WHERE producer_id = p_id AND report_id = report_id_in) = 1 THEN
BEGIN
UPDATE vote SET
vote.vote_value = vote_value_in
WHERE vote.report_id = report_id_in AND vote.producer_id = p_id;
end;
ELSE
BEGIN
INSERT INTO vote (vote_value, producer_id, report_id) VALUES (vote_value_in, p_id, report_id_in);
end;

        end IF;
    end;
```

