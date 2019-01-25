// pages/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    guessCity:'',
    hotCities:[],
    cities:null
  },

  

  getCity:(type) => {
    return app.request.get('http://ele.kassing.cn/v1/cities',{type})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  formatCity:(cities) => {
    const arr = []
    for (let key in cities){
      arr.push([key,cities[key]])
    }
    return arr.sort((a,b) => {
      if(a[0] > b[0]) {
        return 1
      }
      if (a[0] < b[0]) {
        return -1
      }
    })
  },

  




  getData () {
    Promise.all([this.getCity('guess'), this.getCity('hot'), this.getCity('group')]).then(res => {

      this.setData({
        guessCity: res[0].data.name,
        hotCities: res[1].data,
        cities: this.formatCity(res[2].data)
      }, () => {
        wx.hideLoading()
        // console.log(this.data.cities)
      })
    }).catch(err => {
      wx.hideLoading()
      wx.showModal({
        title: '请求超时',
        success:(res) => {
          this.getData()
        }
      })
    })
  },


  


  onLoad: function (options) {
    const geohash = wx.getStorageSync('geohash')
    if (geohash) {
      wx.switchTab({
        url: '/pages/msite/msite',
      })
    } else {
      wx.showLoading({
        title: '正在加载',
      })
      this.getData()
    }


    




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