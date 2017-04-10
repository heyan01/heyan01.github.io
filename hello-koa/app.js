const Koa=require('koa');
const app=new Koa();
const router = require('koa-router')();

//遇到yield next语句时,KOa暂停了该中间件;继续执行下一个中间件;最后执行完了符合条件的中间件,在把控制权逆序返回给以前经过的中间件;
//app.use(function) 为应用添加中间件
app.use(function *(next) {
    var start=new Date;
    yield next;
    var ms=new Date-start;
    console.log('x-response-time',ms+'ms');
})

app.use(function *(next) {
    var start=new Date;
    yield next;
    var ms=new Date-start;
    console.log('logger',ms+'ms');
})
// KOA将request和response对象封装到ctx单独的对象中,ctx既是上下文,每次发起请求时创建一个,在中间件中通过this来取得;
app.use(function *(next){
    console.log(this);
    this.body = 'Hello World';
});
//监听错误事件
app.on('error', function(err){
    log.error('server error', err);
});
app.key=['im a newer secret', 'i like apple'];
//this.cookies.set('name', 'heyan', { signed: true });
app.listen(3000);
app.listen(3004);





