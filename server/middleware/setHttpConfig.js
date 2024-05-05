


module.exports ={
    setHeader:async(ctx,next)=>{
        ctx.set('AAA','cccc')
       
        ctx.set('Content-Type','application/json;charset=utf-8')
        ctx.set('Access-Control-Allow-Origin','*')
        ctx.set('Access-Control-Allow-Methods','OPTIONS,GET,PUT,POST,DELETE')
        await next()
    }
}