set names utf8;
drop database if exists blog;
create database if not exists blog charset = utf8;
use blog;
-- 用户
create table if not exists user(
    uid int primary key auto_increment,
    state varchar(64), -- 个性签名
    recommend text,     -- 自我介绍
    prodession varchar(64),-- 职业
    emain varchar(64),  -- 联系邮件
    icon varchar(64),-- 图片地址
    pwd varchar(24)  -- 登入密码
);

-- 标签
-- create table if not exists label(
--     lid int primary key auto_increment, 
--     name varchar(32)               -- 标题名字
-- );
-- 博客
create table if not exists blogs(
    bid int primary key auto_increment,
    btitle varchar(60),               -- 标题
    bcontent text,                    -- 内容
    btiem datetime,                   -- 时间
    labelId int,                      -- 标签id
    bclick int                     -- 点击量   
    -- btype  int     1是个人博客 2是网页设计心得
);

-- 首页轮播图
create table if not exists   carousel (
    cid int primary key auto_increment, -- 轮播图片
    pic varchar(64),                   -- 图片路劲
    blogId int  ,
    orderId int ,
    foreign key(blogId) references  blogs(bid)                  -- 对应的文章
);

-- 博客推荐
create table if not exists ecommend_blogs(
    eid int primary key auto_increment, 
    blogId int  ,                  -- 对应博客                 
    orderId int ,                    -- 排序id
    foreign key(blogId) references blogs(bid)
);

-- 同标签中推荐文章
create table if not exists ecommend_label(
    eid int primary key auto_increment,
    blogId int  ,          -- 对应博客 
    orderId int ,            -- 排序
    labelId int ,           -- 对应的标签
    foreign key(blogId)  references blogs(bid)
    -- foreign key(labelId) references label(lid)
);

-- 置顶文章
create table if not  exists stick(
    sid int primary key auto_increment,
    blogId int      -- 博客id
);

-- 上传记录表
create table if not exists filemap(
    sid int primary key auto_increment,
    blogId int ,            -- 博客id
    foreign key(blogId)  references blogs(bid),
    localStr varchar(255)
);
-- 收藏
create table if not exists  shoucang(
    sid int primary key auto_increment,
    uid int,
    bid int 
)