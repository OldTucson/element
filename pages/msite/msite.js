// pages/msite/msite.js
const app = getApp()

Page({

  data: {
    foodTypes: [],
    indicatorDots: false,
    autoplay: false,
    interval: 2000,
    duration: 1000,
    position:[],
    restaurants:[],
    flag:true,
    page:1
  },

  formatFoodTypes(data) {
    const arr = []
    for (let i = 0, n = 8; i < data.length; i += n) {
      arr.push(data.slice(i, n + i))
    }
    return arr
  },
  
  setShopInfo (e) {
    
    wx.setStorage({
      key: 'shopInfo',
      data: e.currentTarget.dataset.shopinfo,
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showNavigationBarLoading()
    
    

    /*获取食品类型 */
    app.request.get('http://ele.kassing.cn/v2/index_entry').then(res => {
      const foodTypes = this.formatFoodTypes(res.data)
      this.setData({
        foodTypes
      })

    })



    

    wx.getStorage({
      key: 'geohash',
      success: (res) => {
        this.setData({
          position:res.data.split(',')
        })

        /*获取商家列表 */
        // const position = app.globalData.geohash.split(',')
        app.request.get('http://elm.cangdu.org/shopping/restaurants', {
          latitude: this.data.position[0],
          longitude: this.data.position[1]
        }).then(res => {
          
          this.setData({
            restaurants: res.data
          })
        })

        /*设置导航标题 */
        app.request.get('http://ele.kassing.cn/v2/pois/' + this.data.position.join(',')).then(res => {
          wx.setNavigationBarTitle({
            title: res.data.name,
          })
          wx.hideNavigationBarLoading()
        })

      },
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
    
    if (this.data.flag) {
      let page = this.data.page
      page++
      this.setData({
        page,
        flag:false
      })
      app.request.get('http://elm.cangdu.org/shopping/restaurants',{
        latitude:this.data.position[0],
        longitude:this.data.position[1],
        offset:(page - 1) * 20
      }).then(res => {
        const data = [...this.data.restaurants,...res.data]
        this.setData({
          restaurants:data,
          flag:true
        })
      })
    }

    

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})