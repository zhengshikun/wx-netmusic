//抓取远端API的结构
module.exports = function (api, path, params) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${api}/${path}`,
        data: Object.assign({}, params),
        header: { 'Content-Type': 'json' },
        success: resolve,
        fail: reject
      })
    })
  }