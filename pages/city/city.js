// pages/city/city.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:{
      city_id:1,
      keyword:''
    },
    addr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  sendGeohash:function (e) {
        // console.log(e)
        // app.globalData.geohash = e.currentTarget.dataset.geohash
        wx.setStorage({
          key: 'geohash',
          data: e.currentTarget.dataset.geohash,
          success: () => {
            wx.switchTab({
              url: '/pages/msite/msite',
            })
          }
        })
        
      // app.globalData.geohash = e
   
  },


  changeValue:function (e) {
    this.setData({
      'city.keyword':e.detail.value
    })
  },


  

  search:function (){
    wx.showLoading({
      title: '搜索中',
    })
    app.request.get('http://ele.kassing.cn/v1/pois',this.data.city).then(res => {
      this.setData({
        addr:res.data
      },function () {
        wx.hideLoading()
      })
    })
  },


  

  onLoad: function (options) {
    this.setData({
      'city.city_id':options.id
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