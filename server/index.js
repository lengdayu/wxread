// 加载Express模块
const express = require("express");
// 加载MySql模块
const mysql = require("mysql");
// 加载BodyParse模块
const bodyParser = require("body-parser");

// 创建MySQL连接池
const pool = mysql.createPool({
  host: "127.0.0.1", //MySql数据库地址
  port: 3306, //MySql数据库端口号
  user: "root", //数据库用户的用户名
  password: "", //数据库用户的用户密码
  database: "weixinread", //数据库名称
  connectionLimit: 20, //最大连接数
  charset: "utf8", //数据库服务器的编码方式
});

//创建服务器
const server = express();

// server.use(bodyParser.json());
server.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// 指定服务器对象监听的端口号
server.listen(3000, () => {
  console.log("server is running...");
});

//加载cors模块
const cors = require("cors");
// 使用CORS中间件
server.use(
  cors({
    origin: ["http://localhost:8080", "http://127.0.0.1:3000"],
  })
);

//*************预留路由接口位置*****************

//***********首页路由接口***************
//首页  导航栏    用户信息请求路由
server.get("/home/user", (req, res) => {
  var sql = "select * from user";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    result.length ? res.send(result) : res.send({ msg: "请求错误" });
  });
});

//首页  我的书架  书籍信息请求路由
server.get("/home/bookshelf", (req, res) => {
  let uid = req.query.uid;
  if (uid) {
    let sql =
      "select author,bname,pic from bookdetails where bid in(select bid from shujia where uid= ? )";
    pool.query(sql, [uid], (err, result) => {
      if (err) throw err;
      result.length
        ? res.send({ code: 200, result, msg: "请求成功" })
        : res.send({ code: 201, msg: "请求失败" });
    });
  }
});
//添加书籍到书架
server.post("/shujiaadd", (req, res) => {
  let data = req.body;
  let sql = "insert into shujia set?";
  pool.query(sql, [data], (err, result) => {
    if (err) throw err;
    result.affectedRows
      ? res.send({ code: 200, msg: "请求成功" })
      : res.send({ code: 201, msg: "请求失败" });
  });
});

//首页  排行榜   飙升榜  书籍信息请求路由
server.get("/home/topfast", (req, res) => {
  var sql =
    "select author,bname,pic from bookdetails where fid=1 or fid=2 or fid=3 order by recommended desc";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    result.length ? res.send(result) : res.send({ msg: "请求错误" });
  });
});

//首页  排行榜   新书榜  书籍信息请求路由
server.get("/home/topnew", (req, res) => {
  var sql =
    "select author,bname,pic from bookdetails where fid=12 or fid=13 or fid=14 order by recommended desc";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    result.length ? res.send(result) : res.send({ msg: "请求错误" });
  });
});

//首页  排行榜   总榜  书籍信息请求路由
server.get("/home/topall", (req, res) => {
  var sql =
    "select author,bname,pic from bookdetails order by recommended desc";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    result.length ? res.send(result) : res.send({ msg: "请求错误" });
  });
});

//首页  排行榜   男生榜  书籍信息请求路由
server.get("/home/topman", (req, res) => {
  var sql =
    "select author,bname,pic from bookdetails where fid=2 or fid=13 or fid=4 order by recommended desc";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    result.length ? res.send(result) : res.send({ msg: "请求错误" });
  });
});
//首页  排行榜分类    榜单分类信息请求路由
server.get("/home/toptitle", (req, res) => {
  var sql = "select * from bookfamilys";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    result.length ? res.send(result) : res.send({ msg: "请求错误" });
  });
});

//***********登录注册路由接口***************
//注册页   用户名查重    路由接口
server.get("/regist/checkuname", (req, res) => {
  var uname = req.query.uname;
  var sql = "select uname from user where uname = ?";
  pool.query(sql, [uname], (err, result) => {
    if (err) throw err;
    result.length
      ? res.send({ code: 201, msg: "查询失败" })
      : res.send({ code: 200, msg: "查询成功" });
  });
});

//注册页   用户注册    路由接口
server.post("/regist", (req, res) => {
  let obj = req.body;
  // console.log(obj);
  var sql = "insert into user set?";
  pool.query(sql, [obj], (err, result) => {
    if (err) throw err;
    if (result.affectedRows) {
      var sql = "select uid from user order by uid desc";
      pool.query(sql, (err, result) => {
        if (err) throw err;
        let uid = result[0].uid;
        var sql = "update user set shelfid=? where uid= ?";
        pool.query(sql, [uid, uid], (err, result) => {
          if (err) throw err;
          if (result.affectedRows) {
            let bsid = uid;
            var sql = "insert into shujia values(?,?,'')";
            pool.query(sql, [bsid, uid], (err, result) => {
              if (err) throw err;
              result.affectedRows
                ? res.send({ code: 200, msg: "注册成功" })
                : res.send({ code: 201, msg: "注册失败" });
            });
          }
        });
      });
    }
  });
});

//登录页   用户登录    路由接口
server.get("/login", (req, res) => {
  let uname = req.query.uname;
  let upwd = req.query.upwd;
  let sql = "select * from user where uname=? and upwd=?";
  pool.query(sql, [uname, upwd], (err, result) => {
    if (err) throw err;
    result.length
      ? res.send({ code: 200, result, msg: "查询成功" })
      : res.send({ code: 201, msg: "查无此人" });
  });
});

//***********排行榜详情页路由接口***************
//排行榜 书籍类别信息 路由接口
server.get("/topclass", (req, res) => {
  let sql = "select * from bookfamilys";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    result.length
      ? res.send({ code: 200, result, msg: "请求成功" })
      : res.send({ code: 201, msg: "请求失败" });
  });
});

//排行榜 书籍详情信息 路由接口
server.get("/bookdatails", (req, res) => {
  let bookfamily = req.query.tname;
  // console.log(bookfamily)
  var sql = "select fid from bookfamilys where tname=?";
  pool.query(sql, [bookfamily], (err, result) => {
    if (err) throw err;
    if (result.length) {
      let fid = result[0].fid;
      // console.log(fid);
      //再次向书籍详情表请求信息
      var sql = "select * from bookdetails where fid=?";
      pool.query(sql, [fid], (err, result) => {
        if (err) throw err;
        result.length
          ? res.send({ code: 200, result, msg: "请求成功" })
          : res.send({ code: 201, msg: "请求失败" });
      });
    } else {
      res.send({ code: 201, msg: "请求失败" });
    }
  });
});

////***********书籍详情页路由接口***************
//书籍详情页   路由接口
server.get("/bookdetails/details", (req, res) => {
  let bname = req.query.bname;
  let sql = "select * from bookdetails where bname=?";
  pool.query(sql, [bname], (err, result) => {
    if (err) throw err;
    result.length
      ? res.send({ code: 200, result: result, msg: "请求成功" })
      : res.send({ code: 201, result: result, msg: "请求失败" });
  });
});

//书籍热力值修改接口
server.put("/bookdetails/recommended", (req, res) => {
  let recommended = req.body.recommended;
  let bid = req.body.bid;
  let sql = "update bookdetails set recommended=? where bid=?";
  pool.query(sql, [recommended, bid], (err, result) => {
    if (err) throw err;
    result.affectedRows
      ? res.send({ code: 200, msg: "更新成功" })
      : res.send({ code: 201, msg: "更新失败" });
  });
});

//输入框搜索书籍信息接口
server.get("/bookdetails", (req, res) => {
  let input = req.query.searchinput;
  // console.log(input);
  let sql = "select * from bookdetails where bname like ? or author like ?";
  pool.query(sql, [input, input], (err, result) => {
    if (err) throw err;
    result.length
      ? res.send({ code: 200, result, msg: "查询成功" })
      : res.send({ code: 201, msg: "查询失败" });
  });
});

//出版详情路由接口
server.get("/publish", (req, res) => {
  let bid = req.query.bid;
  let sql = "select * from publish where bid=?";
  pool.query(sql, [bid], (err, result) => {
    if (err) throw err;
    result.length
      ? res.send({ code: 200, result, msg: "请求成功" })
      : res.send({ code: 201, msg: "请求失败" });
  });
});

//阅读页详情路由接口
server.get("/readdetails", (req, res) => {
  let sql = "select * from bookcontain";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    result.length
      ? res.send({ code: 200, result, msg: "请求成功" })
      : res.send({ code: 201, msg: "请求失败" });
  });
});

//作者详情页路由接口
//作者作品信息查询
server.get("/authordetails", (req, res) => {
  let author = req.query.author;
  // console.log(author);
  let sql = "select * from bookdetails where author=?";
  pool.query(sql, [author], (err, result) => {
    if (err) throw err;
    result.length
      ? res.send({ code: 200, result, msg: "请求成功" })
      : res.send({ code: 201, msg: "请求失败" });
  });
});

//作者个人信息查询
server.get("/authorinfo", (req, res) => {
  let author = req.query.author;
  // console.log(author);
  let sql = "select * from anthorintro where auname=?";
  pool.query(sql, [author], (err, result) => {
    if (err) throw err;
    result.length
      ? res.send({ code: 200, result, msg: "请求成功" })
      : res.send({ code: 201, msg: "请求失败" });
  });
});

//*************评论详情页路由接口***************
//评论详情页  页面挂载  数据请求接口
server.get("/comment", (req, res) => {
  let bid = req.query.bid;
  let sql = "select * from comment where bid=?";
  pool.query(sql, [bid], (err, result) => {
    if (err) throw err;
    // console.log(result);
    result.length
      ? res.send({ code: 200, result, msg: "请求成功" })
      : res.send({ code: 201, msg: "请求失败" });
  });
});
//评论详情页   发表个人评论  数据添加接口
server.post("/comment/send", (req, res) => {
  let comment = req.body;
  // console.log(comment);
  let sql = "insert into comment set?";
  pool.query(sql, [comment], (err, result) => {
    if (err) throw err;
    result.affectedRows
      ? res.send({ code: 200, msg: "添加成功" })
      : res.send({ code: 201, msg: "添加失败" });
  });
});
//评论详情页  根据用户id  请求评论的id   验证接口
server.get("/comment/getcommentid", (req, res) => {
  let uid = req.query.uid;
  let sql = "select pid from comment where uid=?";
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err;
    // console.log(result);
    result.length
      ? res.send({ code: 200, result, msg: "请求成功" })
      : res.send({ code: 201, msg: "请求失败" });
  });
});

//评论详情页  根据评论的id   删除接口
server.delete("/comment/delcomment", (req, res) => {
  let pid = req.query.nowpid;
  console.log(req.query);
  let sql = "delete  from comment where pid=?";
  pool.query(sql, [pid], (err, result) => {
    if (err) throw err;
    console.log(result);
    result.affectedRows
      ? res.send({ code: 200, result, msg: "请求成功" })
      : res.send({ code: 201, msg: "请求失败" });
  });
});

//*********************管理员页面****************************
//管理员账号登录检查
server.get("/adminlogin", (req, res) => {
  let uname = req.query.uname;
  let upwd = req.query.upwd;
  let sql = "select * from user where uname=? and upwd=?";
  pool.query(sql, [uname, upwd], (err, result) => {
    if (err) throw err;
    result.length
      ? res.send({ code: 200, result, msg: "请求成功" })
      : res.send({ code: 201, msg: "请求失败" });
  });
});
//请求页面初载数据
server.get("/admin", (req, res) => {
  let uid = req.query.uid;
  let sql = "select * from comment";
  if (uid == 1) {
    pool.query(sql, (err, result) => {
      if (err) throw err;
      result.length
        ? res.send({ code: 200, result, msg: "请求成功" })
        : res.send({ code: 201, msg: "请求失败" });
    });
  }
});
//管理员删除评论
server.delete("/admin/comdel", (req, res) => {
  let pid = req.query.pid;
  let sql = "delete from comment where pid=?";
  pool.query(sql, [pid], (err, result) => {
    if (err) throw err;
    result.affectedRows
      ? res.send({ code: 200, msg: "删除成功" })
      : res.send({ code: 201, msg: "删除失败" });
  });
});
//根据检索查询评论
server.get("/admin/searchall", (req, res) => {
  let uname = req.query.uname;
  let uid = req.query.uid;
  let sql = "select * from comment where uname=? and uid=?";
  pool.query(sql, [uname, uid], (err, result) => {
    if (err) throw err;
    result.length
      ? res.send({ code: 200, result, msg: "请求成功" })
      : res.send({ code: 201, msg: "请求失败" });
  });
});
//根据用户名查询评论
server.get("/admin/searchuname", (req, res) => {
  let uname = req.query.uname;
  let sql = "select * from comment where uname=?";
  pool.query(sql, [uname], (err, result) => {
    if (err) throw err;
    result.length
      ? res.send({ code: 200, result, msg: "请求成功" })
      : res.send({ code: 201, msg: "请求失败" });
  });
});
//根据用户ID查询评论
server.get("/admin/searchuid", (req, res) => {
  let uid = req.query.uid;
  let sql = "select * from comment where uid=?";
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err;
    result.length
      ? res.send({ code: 200, result, msg: "请求成功" })
      : res.send({ code: 201, msg: "请求失败" });
  });
});
