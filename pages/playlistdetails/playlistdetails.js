const innerAudioContext = wx.createInnerAudioContext()
// 获取全局应用程序实例对象
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'playlist/detail',
    item: {},
    currentTime: '',
    urlid: '',
    isplay: false,
    downurl: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '拼命加载中...'
    })
    app.wangyi.detail(this.data.type, options.id).then(
      (r) => {
        wx.hideLoading()
        console.log(r.data.playlist)
        this.setData({
          item: r.data.playlist
        })
      }
    )
    innerAudioContext.onTimeUpdate(
      () => {
        let currentTime = innerAudioContext.currentTime
        this.setData({
          currentTime: currentTime
        })
      }
    )
  },
  playMusic(r) {
    console.log(r)
    try {
      wx.setStorageSync('picurl', r.currentTarget.dataset.picurl)
    } catch (e) {}
    if (this.data.isplay == false) {
      app.wangyi.songurl('song/url', r.target.id).then(
        (r) => {
          innerAudioContext.autoplay = true
          innerAudioContext.src = r.data.data[0].url
          this.setData({
            urlid: r.data.data[0].id,
            isplay: true
          })
        },

      )
    } else {
      app.wangyi.songurl('song/url', r.target.id).then(
        (r) => {
          if (this.data.urlid == r.data.data[0].id) {
            wx.navigateTo({
              url: `../play/play?currentTime=${this.data.currentTime}&url=${r.data.data[0].url}`
            })
            innerAudioContext.destroy()
          } else {
            innerAudioContext.src = r.data.data[0].url
            this.setData({
              urlid: r.data.data[0].id,
              isplay: true
            })
          }
        }
      )
    }
  },
  moreBtn(e) {
    console.log(e)
    app.wangyi.songurl('song/url', e.currentTarget.dataset.id).then(
      (r) => {
        console.log(r)
        this.setData({
          downurl: r.data.data[0].url
        })
        wx.showActionSheet({
          itemList: ['下载'],
          success(res) {
            if (res.tapIndex == 0) {
              
            }
          },
          fail(res) {
            console.log('取消')
          }
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