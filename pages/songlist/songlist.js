
const innerAudioContext = wx.createInnerAudioContext()
// 获取全局应用程序实例对象
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'personalized/newsong',
    songlist:[
      {img:'../../images/路飞2.png',name:'这里是歌曲内容'},
      {img:'../../images/路飞2.png',name:'这里是歌曲内容'},
      {img:'../../images/路飞2.png',name:'这里是歌曲内容'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    innerAudioContext.autoplay = false
    innerAudioContext.src = 'http://m10.music.126.net/20190313163947/6ed87e58e323fe32070c4fd995a51369/ymusic/5159/520c/0f0b/f361663f9befd55bb7fa8a3d6c663cad.mp3'
    wx.showLoading({ title: '拼命加载中...' })
    app.wangyi.fetchApi(this.data.type).then(
    (r)=>{
      console.log(r.data.result)
      wx.hideLoading()
      this.setData({
        songlist:r.data.result
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})