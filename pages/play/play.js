// pages/play/play.js
const innerAudioContext = wx.createInnerAudioContext()
// 获取全局应用程序实例对象
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    isplay: false,
    min: 0,
    max: 0,
    value: 0,
    recordIndex: '1',
    rotate: '2',
    picurl: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    try {
      const value = wx.getStorageSync('picurl')
      if (value) {
        // Do something with return value
        console.log(value)
        this.setData({
          picurl:value
        })
      }
    } catch (e) {
      // Do something when catch error
    }
    innerAudioContext.startTime = Number(options.currentTime)
    innerAudioContext.autoplay = true
    innerAudioContext.src = options.url
    //监听音频播放进度更新事件
    innerAudioContext.onTimeUpdate(
      () => {
        this.setData({
          isplay: true,
          rotate: '1',
          max: innerAudioContext.duration,
          value: innerAudioContext.currentTime
        })
      }
    )

    //监听音频完成跳转操作的事件
    innerAudioContext.onSeeked(
      () => {
        let currentTime = innerAudioContext.currentTime
        this.setData({
          value: currentTime
        })
      }
    )
  },
  onHide: function () {
    console.log('切换后台')
    innerAudioContext.destroy()
  },
  //播放
  play: function () {
    innerAudioContext.play()
    this.setData({
      isplay: true,
      rotate: '1'
    })
  },
  //暂停
  stop: function () {
    innerAudioContext.pause()
    this.setData({
      isplay: false,
      rotate: '2'
    })
  },
  sliderchange: function (e) {
    innerAudioContext.seek(e.detail.value)
  }
})