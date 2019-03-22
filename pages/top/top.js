// pages/top/top.js
// 获取全局应用程序实例对象
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'top/list',
    oflists:[
      {key:0},
      {key:1},
      {key:2},
      {key:3},
      {key:4}
    ],
    gllists:[
      {key:5},
      {key:6},
      {key:7},
      {key:8},
      {key:9},
      {key:10}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '拼命加载中...' })
    const tasks = this.data.oflists.map(rsp=>{
      return app.wangyi.top(this.data.type,rsp.key)
      .then(r=>{
        rsp=r.data.playlist
        return rsp
      })
    })
    Promise.all(tasks).then(r=>{
      this.setData({
        oflists:r
      })
      console.log(this.data.oflists)
      wx.hideLoading()
    })

    const tasks2 = this.data.gllists.map(rsp=>{
      return app.wangyi.top('top/list',rsp.key)
      .then(r=>{
        rsp=r.data.playlist
        return rsp
      })
    })
    Promise.all(tasks2).then(r=>{
      this.setData({
        gllists:r
      })
      wx.hideLoading()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})