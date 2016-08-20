const router = require('koa-router')();
const request = require('request');

// Main page.
router.get('/', async ctx => {
  await ctx.render('entry.ejs');
});

router.get('/chart', async ctx => {
  await ctx.render('chart.ejs');
});

module.exports = router;
