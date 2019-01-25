// pages/shop/shop.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    types:[],
    foods:[],
    active:0,
    scroll_id:'type-2307',
    shopinfo:{},
    total:0,
    cart:[]
  },
  changeActive (e) {
    this.setData({
      active:e.currentTarget.dataset.index,
      scroll_id:e.currentTarget.dataset.id
    })
    
  },
  add (e) {
    const data = e.currentTarget.dataset
    const item_id = data.item_id
    const item = this.data.cart.find(i => i.id === item_id)

    if(!item) {
      this.setData({
        cart:[...this.data.cart,{id:item_id,name:data.name,price:data.price,num:1}]
      })
    } else {
      
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*获取商铺信息 */
    wx.getStorage({
      key: 'shopInfo',
      success: function(res) {
        console.log('商铺信息shopInfo',res.data)
      },
    })
    /*获取食品信息 */
    app.request.get('http://elm.cangdu.org/shopping/v2/menu?restaurant_id=' + options.id).then(res => {
      console.log('食物信息',res.data)
      const types = res.data.map(type => (
        {
          name:type.name,
          id:type.id
        }
      ))
      this.setData({
        types,
        foods:res.data
      })
    })
    /*获取用户评论 */
    app.request.get('http://elm.cangdu.org/ugc/v2/restaurants/'+options.id+'/ratings?has_content=true&offset=0&limit=10&tag_name=').then(res => {
      console.log('用户评论',res.data)
    })

    /*获取商铺评分 */
    app.request.get('http://elm.cangdu.org/ugc/v2/restaurants/' +options.id+'/ratings/scores').then(res => {
      console.log('商铺评分', res.data)
    })

    /*获取商铺标签 */
    app.request.get('http://elm.cangdu.org/ugc/v2/restaurants/'+ options.id +'/ratings/tags').then(res => {
      console.log('商铺标签', res.data)
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