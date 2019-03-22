
// 获取全局应用程序实例对象
const app = getApp()
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    search:"",
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    imgUrls: [],
    navbar: [{
        img: '../../images/fm.png',
        item: '私人FM',
        url: ''
      },
      {
        img: '../../images/songlist.png',
        item: '每日推荐',
        url: '../songlist/songlist'
      },
      {
        img: '../../images/playlist.png',
        item: '歌单',
        url: '../playlist/playlist'
      },
      {
        img: '../../images/top.png',
        item: '排行榜',
        url: '../top/top'
      }
    ],
    boards: [
      {
      title: '推荐歌单',
      key: 'personalized'
      }
  ],
    grids: [],
    isplay: false
  },
  onLoad: function () {
    wx.showLoading({title: '拼命加载中...'})
    let personalized = this.data.boards[0].key
    app.wangyi.fetchApi(personalized).then(
      (r) => {
        wx.hideLoading()
        this.setData({
          grids: r.data.result
        })
      }
    )
    app.wangyi.fetchApi('banner').then(
      (r) => {
        this.setData({
          imgUrls: r.data.banners
        })
      }
    )
  },
  playMusic(r){
    console.log(r)
    try {
      wx.setStorageSync('picurl', r.currentTarget.dataset.picurl)

    } catch (e) { }
    app.wangyi.songurl('song/url', r.currentTarget.id).then(
      (r)=>{
        console.log(r)
        wx.navigateTo({
          url: `../play/play?currentTime=0&url=${r.data.data[0].url}`
        })
      }
    )
  },
  onHide(){
    console.log('进入后台')
  },
  onShow(){
    console.log('进入前台')
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    app.wangyi.search('search', e.detail.value).then(
      (r) => {
        this.setData({
          search:r.data.result.songs
        })
        console.log(r.data.result)
      },
    )
    this.setData({
      inputVal: e.detail.value
    })
  }
});