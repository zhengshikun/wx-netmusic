// pages/playlist/playlist.js
const innerAudioContext = wx.createInnerAudioContext()
// 获取全局应用程序实例对象
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'top/playlist/highquality',
    grids: [],
    updateTime:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '拼命加载中...' })
    app.wangyi.playlist(this.data.type).then(
      (r)=>{
        wx.hideLoading()
        this.setData({
          grids:r.data.playlists
        })
      }
      )
  },
  onMore(){
    let that = this.data.grids
    console.log(that)
    let before = that.pop()
    console.log(before.updateTime)
    app.wangyi.playlistmore(this.data.type, before.updateTime).then(
      (r)=>{
        console.log(r.data.playlists)
        let arr = this.data.grids.concat(r.data.playlists)
        this.setData({
          grids:arr
        })
      }
    )
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
    this.onMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})