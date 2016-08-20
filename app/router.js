const router = require('koa-router')();
const request = require('request');

// Main page.
router.get('/', async ctx => {
  await ctx.render('entry.ejs');
});

router.get('/home', async ctx => {
  await ctx.render('home.ejs');
});

router.get('/about', async ctx => {
  await ctx.render('about.ejs');
});

router.get('/test', async ctx => {
  ctx.body = await requestApi(options);
});

router.get('/chart', async ctx => {
  await ctx.render('chart.ejs');
});

router.get('/app', async ctx => {
  await ctx.render('app.ejs');
});

module.exports = router;
