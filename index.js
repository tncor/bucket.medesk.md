'use strict';

let httpProxy = require('http-proxy')
let url = require('url')

const TARGET_URL = process.env.TARGET_URL
const PORT = process.env.PORT || 3000

if(!TARGET_URL){
  throw new Error('runtime: TARGET_URL is required')
}

let proxy = httpProxy.createProxyServer({
  target: TARGET_URL,
  changeOrigin: true,
})

proxy.on('proxyRes', function(proxyRes, req, res){
  let method = req.method
  let status = res.statusCode
  let path = url.parse(req.url).pathname
  console.log(`[${status}] ${method} ${path}`)
})

proxy.listen(PORT)
