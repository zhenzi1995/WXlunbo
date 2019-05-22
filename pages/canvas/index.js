// pages/canvas/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // this.util();
    this.getHeight();
  },
  util: function(obj) {
    var continueTime = (parseInt(obj.list / obj.container)) * 10000;
    var setIntervalTime = 5000;

    var animation = wx.createAnimation({
      duration: 200, //动画时长
      timingFunction: "linear", //线性
      delay: 0 //0则不延迟
    });
    this.animation = animation;
    animation.translateY(-obj.container).step({
      duration: 50,
      timingFunction: 'step-start'
    }).translateY(obj.list).step({
      duration: continueTime
    });
    this.setData({
      animationData: animation.export()
    })
    setInterval(() => {
      animation.translateY(-obj.container).step({
        duration: 50,
        timingFunction: 'step-start'
      }).translateY(obj.list).step({
        duration: continueTime
      });
      this.setData({
        animationData: animation.export()
      })
    }, setIntervalTime)

  },
  getHeight() {
    var obj = new Object();
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.select('.container').boundingClientRect()
    query.select('.list').boundingClientRect()
    query.exec((res) => {
      obj.container = res[0].height; // 框的height
      obj.list = res[1].height; // list的height
      // return obj;
      this.util(obj);
      console.log(res[1].height)
    })
  }
})