import _ from 'lodash';
export const tagOptions = [
  {
    tag: 'message',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '不跳转'
  },
  {
    tag: 'CreateBabyHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '创建宝宝'
  },
  {
    tag: 'SearchContentHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '全局搜索页'
  },
  {
    tag: 'AlbumDetail',
    inputReg: (/[^\d]+/),
    messageField: 'albumId',
    sourceField: 'typeId',
    label: '专辑详情',
    getValue: (input) => {
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/albums/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'EveryDayAlbumDetail',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '每日必听专辑'
  },
  {
    tag: 'AlbumList',
    inputReg: (/[^\d]+/),
    messageField: 'typeId',
    sourceField: 'typeId',
    label: '专辑卡片详情',
    getValue: (input) => {
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/pagecards/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'TrackDetail',
    inputReg: (/[^\d]+/),
    messageField: 'trackId',
    sourceField: 'typeId',
    label: '音频详情',
    getValue: (input) => {
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
    }
  },

  {
    tag: 'VIPContentArea',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '会员内容专区'
  },
  {
    tag: 'EdifyPlanDetail',
    inputReg: (/[^\d]+/),
    messageField: 'edifyId',
    sourceField: 'typeId',
    label: '熏陶课程详情',
    getValue: (input) => {
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/edifies/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'CartoonbookDetail',
    inputReg: (/[^\d]+/),
    messageField: 'typeId',
    sourceField: 'typeId',
    label: '绘本详情',
    getValue: (input) => {
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <tag>{tag[key]}</tag>;
    }
  },
  {
    tag: 'SubjectClass',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '专题分类'
  },
  {
    tag: 'BroadcasterList',
    inputReg: (/[^\d]+/),
    messageField: 'typeId',
    sourceField: 'typeId',
    label: '主播卡片详情',
    getValue: (input) => {
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/pagecards/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'BroadcasterDetail',
    inputReg: (/[^\d]+/),
    messageField: 'announcerId',
    sourceField: 'typeId',
    label: '主播详情',
    getValue: (input) => {
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/users/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'AlbumClass',
    inputReg: (/[^\d]+/),
    messageField: 'categoryId',
    sourceField: 'typeId',
    label: '专辑分类',
    getValue: (input) => {
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/albumcategories/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'GroupHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '打卡主页'
  },
  {
    tag: 'GroupPlan',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '打卡计划'
  },
  {
    tag: 'GroupDetail',
    inputReg: (/[^\d]+/),
    messageField: 'categoryId',
    sourceField: 'typeId',
    label: '打卡小组详情',
    getValue: (input) => {
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <tag>{tag[key]}</tag>;
    }
  },
  {
    tag: 'CourseDetail',
    inputReg: (/[^\d|,]+/),
    messageField: 'typeId',
    sourceField: 'typeId',
    label: '打卡课程详情',
    getValue: (input) => {
      return input;
    },
    judgeValue: (value) => {
      return String(value).split(',').length > 2;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <tag>{tag[key]}</tag>;
    }
  },
  {
    tag: 'GroupVoteComment',
    inputReg: (/[^\d|,]+/),
    messageField: 'typeId',
    sourceField: 'typeId',
    label: '话题的想法的评论(groupId,topicId,ideaId,commentId)(commentId可选)',
    getValue: (input) => {
      return input;
    },
    judgeValue: (value) => {
      return String(value).split(',').length > 2;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <tag>{tag[key]}</tag>;
    }
  },
  {
    tag: 'CourseHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '课表'
  },
  {
    tag: 'SubscribeHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '订阅'
  },
  {
    tag: 'MySubscribeHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '我的订阅'
  },
  {
    tag: 'MineFavoriteHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '我的收藏'
  },
  {
    tag: 'SubjectMain',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '成长地图--英语'
  },
  {
    tag: 'SubjectPictureBook',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '成长地图--绘本'
  },
  {
    tag: 'SpeechMain',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '语音技能'
  },
  {
    tag: 'ChitChatMessage',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '亲子聊天'
  },
  {
    tag: 'YouzanStoreHome',
    inputReg: null,
    messageField: 'link',
    sourceField: 'link',
    label: '有赞商城',
    judgeValue: (value) => {
      return _.isString(value) && value.trim() != '';
    },
    getUrl: (tag, key) => {
      if (!tag || !_.isString(tag[key]) || tag[key].trim() == '') {
        return '';
      }
      return <a href={tag[key]} target='_blank'>{'跳转'}</a>;
    }
  },
  {
    tag: 'CoinHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '我的任务'
  },
  {
    tag: 'MedalMain',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '我的勋章'
  },
  {
    tag: 'MedalDetail',
    inputReg: (/[^\d]+/),
    messageField: 'typeId',
    sourceField: 'typeId',
    label: '勋章详情',
    getValue: (input) => {
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <tag>{tag[key]}</tag>;
    }
  },
  {
    tag: 'MineCloudStorageHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '我的云盘'
  },
  {
    tag: 'AccountMineFamily',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '我的家庭'
  },
  {
    tag: 'SubjectOral',
    inputReg: (/[^\d]+/),
    messageField: 'typeId',
    sourceField: 'typeId',
    label: '口语练习',
    getValue: (input) => {
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <tag>{tag[key]}</tag>;
    }
  },
  {
    tag: 'BookrackHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '我的书架'
  },
  {
    tag: 'EvaluationHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '评测'
  },
  {
    tag: 'Notification',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '消息列表'
  },
  {
    tag: 'QiYuService',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '七鱼客服'
  },
  {
    tag: 'QrcodeScanHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '扫一扫进入绘本页',
    params: { // 额外参数
      type: {
        metaData: 'String',
        type: 'select',
        name: '类型',
        data: [{ label: '仅扫一扫', key: null }, { key: 'applyInputBook', label: '申请绘本录入' }, { key: 'groupNfcReplace', label: '小组换绑NFC' }, { key: 'bookrackReadBook', label: '书架' }, { key: 'groupBindNFC', label: '小组绑定' }]
      },
      canReplace: {
        metaData: 'String',
        type: 'select',
        name: '是否换绑',
        data: [{ key: true, label: '是' }, { key: false, label: '否' }]
      }
    }
  },
  {
    tag: 'VIPHome',
    inputReg: null,
    messageField: 'link',
    sourceField: 'link',
    label: '会员',
    params: { // 额外参数
      vipType: {
        metaData: 'String',
        type: 'select',
        name: '会员类型',
        data: [{ key: 'vip', label: '会员' }, { key: 'svip', label: '超级会员' }]
      },
      duration: {
        metaData: 'Number',
        type: 'input',
        name: '时长(天)',
        data: null
      }
    },
    judgeValue: (value) => {
      return _.isString(value) && value.trim() != '';
    },
    getUrl: (tag, key) => {
      if (!tag || !_.isString(tag[key]) || tag[key].trim() == '') {
        return '';
      }
      return <a href={tag[key]} target='_blank'>{'跳转'}</a>;
    }
  },
  {
    tag: 'MallHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '牛币商城'
  },
  {
    tag: 'RechargeHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '牛币充值页面(RN)'
  },
  {
    tag: 'AppActiveH5Home',
    inputReg: null,
    messageField: 'link',
    sourceField: 'link',
    label: '网页内容',
    params: { // 额外参数
      openNew: {
        metaData: 'String',
        type: 'select',
        name: '是否新页面打开',
        data: [{ key: false, label: '否', default: true }, { key: true, label: '是' }]
      },
      actionBarGone: {
        metaData: 'String',
        type: 'select',
        name: '隐藏默认导航栏',
        data: [{ key: false, label: '否', default: true }, { key: true, label: '是' }]
      }
    },
    judgeValue: (value) => {
      return _.isString(value) && value.trim() != '';
    },
    getUrl: (tag, key) => {
      if (!tag || !_.isString(tag[key]) || tag[key].trim() == '') {
        return '';
      }
      return <a href={tag[key]} target='_blank'>{'跳转'}</a>;
    }
  },
  {
    tag: 'OpenTaobaoApp',
    inputReg: null,
    messageField: 'link',
    sourceField: 'link',
    label: '打开淘宝',
    judgeValue: (value) => {
      return _.isString(value) && value.trim() != '';
    },
    getUrl: (tag, key) => {
      if (!tag || !_.isString(tag[key]) || tag[key].trim() == '') {
        return '';
      }
      return <a href={tag[key]} target='_blank'>{'跳转'}</a>;
    }
  },
  {
    tag: 'OpenJDApp',
    inputReg: null,
    messageField: 'link',
    sourceField: 'link',
    label: '打开京东',
    judgeValue: (value) => {
      return _.isString(value) && value.trim() != '';
    },
    getUrl: (tag, key) => {
      if (!tag || !_.isString(tag[key]) || tag[key].trim() == '') {
        return '';
      }
      return <a href={tag[key]} target='_blank'>{'跳转'}</a>;
    }
  },
  {
    tag: 'OpenWechatMiniProgram',
    inputReg: null,
    messageField: 'link',
    sourceField: 'link',
    label: '打开微信小程序',
    judgeValue: (value) => {
      return _.isString(value) && value.trim() != '';
    },
    getUrl: (tag, key) => {
      if (!tag || !_.isString(tag[key]) || tag[key].trim() == '') {
        return '';
      }
      return <a href={tag[key]} target='_blank'>{'跳转'}</a>;
    }
  },
  {
    tag: 'EdifyAlbumList',
    inputReg: (/[^\d]+/),
    messageField: 'typeId',
    sourceField: 'typeId',
    label: '熏陶卡片详情',
    getValue: (input) => {
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/pagecards/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'AlbumCatHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '首页分类'
  },
  {
    tag: 'ReStartApp',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '重启APP进入首页'
  },
  {
    tag: 'EdifyHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '熏陶广场'
  },
  {
    tag: 'AnnouncerHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '金牌主播'
  },
  {
    tag: 'PsychHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '儿童成长'
  },
  {
    tag: 'LoginHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '登录'
  },
  {
    tag: 'TrackList',
    inputReg: (/[^\d]+/),
    messageField: 'typeId',
    sourceField: 'typeId',
    label: '音频卡片详情',
    getValue: (input) => {
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/pagecards/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },

  {
    tag: 'AlbumCombineDetail',
    inputReg: (/[^\d]+/),
    messageField: 'albumCombineId',
    sourceField: 'typeId',
    label: '专辑合集详情',
    getValue: (input) => {
      return (getNumArrayValue(input))[0];
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/albumcombines/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'UpgradeAppVersion',
    inputReg: null,
    messageField: 'link',
    sourceField: 'link',
    label: 'App版本升级',
    judgeValue: (value) => {
      return _.isString(value) && value.trim() != '';
    },
    getUrl: (tag, key) => {
      if (!tag || !_.isString(tag[key]) || tag[key].trim() == '') {
        return '';
      }
      return <a href={tag[key]} target='_blank'>{'跳转'}</a>;
    }
  },
  {
    tag: 'UpgradeDeviceVersion',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '设备版本升级'
  },
  {
    tag: 'MissionScoreAllTask',
    inputReg: (/[^\d]+/),
    messageField: 'newbieTaskId',
    sourceField: 'typeId',
    label: '新手任务',
    getValue: (input) => {
      return (getNumArrayValue(input))[0];
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/newbietasks/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'LatestCreatedAlbum',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '专辑更新'
  },
  {
    tag: 'CouponHome',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '我的优惠券'
  },
  {
    tag: 'CommodityDetail',
    inputReg: (/[^\d]+/),
    messageField: 'servicePkgId',
    sourceField: 'typeId',
    label: '商品详情',
    getValue: (input) => {
      return (getNumArrayValue(input))[0];
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/servicepackages/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'BookStudyDay',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '每日阅读报告'
  },
  {
    tag: 'BookWishList',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '书单心愿'
  },
  {
    tag: 'BookClassify',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '绘本分类'
  },
  {
    tag: 'BookCategory',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '书单'
  },
  {
    tag: 'BookSeriesReal',
    inputReg: (/[^\d]+/),
    messageField: 'bookCategoryId',
    sourceField: 'typeId',
    label: '绘本系列详情',
    getValue: (input) => {
      return (getNumArrayValue(input))[0];
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/bookcategories/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'BookSeriesSets',
    inputReg: (/[^\d]+/),
    messageField: 'groupId',
    sourceField: 'typeId',
    label: '绘本套系',
    getValue: (input) => {
      return (getNumArrayValue(input))[0];
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/bookcategories/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'BookSeriesList',
    inputReg: null,
    messageField: 'bookCardId',
    sourceField: 'typeId',
    label: '绘本系列全部(绘本系列卡片ID)',
    getValue: (input) => {
      return (getNumArrayValue(input))[0];
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/bookcategories/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'EdifyPlanList',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '熏陶计划'
  },
  {
    tag: 'EdifyAddListAlbum',
    inputReg: null,
    messageField: null,
    sourceField: null,
    label: '熏陶列表(专辑)'
  },
  {
    tag: 'EdifyAddListCourse',
    inputReg: (/[^\d]+/),
    messageField: 'edifyType',
    sourceField: null,
    label: '熏陶列表(课程)'
  },
  {
    tag: 'EdifyCourseDetail',
    inputReg: (/[^\d]+/),
    messageField: 'edifyType',
    sourceField: 'typeId',
    label: '熏陶课程包详情页',
    getValue: (input) => {
      return (getNumArrayValue(input))[0];
    },
    judgeValue: (value) => {
      return value > 0;
    }
  },
  {
    tag: 'CommodityPayAlbum',
    inputReg: (/[^\d]+/),
    messageField: 'servicePkgId',
    sourceField: 'typeId',
    label: '专辑支付页',
    getValue: (input) => {
      return (getNumArrayValue(input))[0];
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/servicepackages/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'CommodityGroup',
    inputReg: (/[^\d]+/),
    messageField: 'servicePkgId',
    sourceField: 'typeId',
    label: '打卡小组支付页',
    getValue: (input) => {
      return (getNumArrayValue(input))[0];
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/servicepackages/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'CommodityPayAlbumCombine',
    inputReg: (/[^\d]+/),
    messageField: 'servicePkgId',
    sourceField: 'typeId',
    label: '专辑合集支付页',
    getValue: (input) => {
      return (getNumArrayValue(input))[0];
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/servicepackages/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'CommodityPayService',
    inputReg: (/[^\d]+/),
    messageField: 'servicePkgId',
    sourceField: 'typeId',
    label: '服务包支付页',
    getValue: (input) => {
      return (getNumArrayValue(input))[0];
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/servicepackages/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'BindDeviceHome',
    inputReg: (/[^\d]+/),
    messageField: 'null',
    sourceField: null,
    label: '设备配网入口'
  },
  {
    tag: 'DevicePlayHistoryRecordHome',
    inputReg: (/[^\d]+/),
    messageField: 'null',
    sourceField: null,
    label: '设备播放历史记录'
  },
  {
    tag: 'LetterCard',
    inputReg: (/[^\d]+/),
    messageField: 'null',
    sourceField: null,
    label: '字母卡详情'
  },
  {
    tag: 'PayRecord',
    inputReg: (/[^\d]+/),
    messageField: 'null',
    sourceField: null,
    label: '我的购买'
  },
  {
    tag: 'MineAlbumHome',
    inputReg: (/[^\d]+/),
    messageField: 'null',
    sourceField: null,
    label: '我的专辑收藏'
  },
  {
    tag: 'DynamicCardHome',
    inputReg: (/[^\d]+/),
    messageField: 'null',
    sourceField: null,
    label: '可视化卡片',
    params: { // 额外参数
      pageCode: {
        metaData: 'String',
        type: 'input',
        name: '页面code(必填)',
        data: null
      },
      cardId: {
        metaData: 'Number',
        type: 'input',
        name: '卡片ID',
        data: null
      }
    }
  },
  {
    tag: 'DynamicCard',
    inputReg: (/[^\d]+/),
    messageField: 'null',
    sourceField: null,
    label: '可视化卡片(RN)',
    params: { // 额外参数
      pageCode: {
        metaData: 'String',
        type: 'input',
        name: '页面code(必填)',
        data: null
      },
      cardId: {
        metaData: 'Number',
        type: 'input',
        name: '卡片ID',
        data: null
      }
    }
  },
  {
    tag: 'RadioCategories',
    inputReg: (/[^\d]+/),
    messageField: 'null',
    sourceField: null,
    label: '叫早哄睡'
  },
  {
    tag: 'ETClassify',
    inputReg: (/[^\d]+/),
    messageField: 'null',
    sourceField: null,
    label: '自然拼读分级'
  },
  {
    tag: 'GroupCourseDetail',
    inputReg: null,
    messageField: 'typeId',
    sourceField: 'typeId',
    label: '打卡课程(新)详情',
    needParams: true, // 需要
    params: { // 额外参数
      scheduleId: {
        metaData: 'Number',
        type: 'input',
        name: '排期ID',
        data: null
      }
    },
    judgeValue: (value) => {
      return _.isString(value) && value.trim() != '';
    },
    getUrl: (tag, key) => {
      if (!tag || !_.isString(tag[key]) || tag[key].trim() == '') {
        return '';
      }
      return <a href={tag[key]} target='_blank'>{'跳转'}</a>;
    }
  },
  {
    tag: 'GroupPromoteDetail',
    inputReg: (/[^\d]+/),
    messageField: 'typeId',
    sourceField: 'typeId',
    label: '打卡活动详情',
    getValue: (input) => {
      return (getNumArrayValue(input))[0];
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/servicepackages/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'GroupDayDetail',
    inputReg: (/[^\d]+/),
    messageField: 'typeId',
    sourceField: 'typeId',
    label: '打卡日课详情',
    getValue: (input) => {
      return (getNumArrayValue(input))[0];
    },
    judgeValue: (value) => {
      return value > 0;
    },
    getUrl: (tag, key) => {
      if (!tag || !(tag[key] > 0)) {
        return '';
      }
      return <a href={`/servicepackages/${tag[key]}`} target='_blank'>{tag[key]}</a>;
    }
  },
  {
    tag: 'GroupList',
    inputReg: (/[^\d]+/),
    messageField: 'null',
    sourceField: null,
    label: '我的打卡列表'
  },
  {
    tag: 'AccountMyAward',
    inputReg: (/[^\d]+/),
    messageField: 'null',
    sourceField: null,
    label: '我的奖品'
  }
  //   {
  //     tag: 'CommodityPay',
  //     inputReg: (/[^\d]+/),
  //     messageField: 'service',
  //     // sourceField: 'typeId',
  //     sourceField: null,
  //     label: '支付页',
  //     params: {
  //       type: {
  //         metaData: 'String',
  //         type: 'select',
  //         name: '服务包类型',
  //         data: [{ key: 'album', label: '专辑' }, { key: 'group', label: '打卡小组' }, { key: 'albumCombine', label: '专辑合集' }, { key: 'service', label: '服务包' }]
  //       },
  //       typeId: {
  //         metaData: 'Number',
  //         type: 'input',
  //         name: '服务包ID',
  //         data: null
  //       }
  //     },
  //     getValue: (input) => {
  //     },
  //     // judgeValue: (value) => {
  //     //   return value > 0
  //     // },
  //     getUrl: (tag, key) => {
  //       if (!tag || !(tag[key] > 0)) {
  //         return ''
  //       }
  //     }
  //   }

  //   {
  //     tag: 'CommodityPayAlbum',
  //     inputReg: (/[^\d]+/),
  //     messageField: 'servicePkgId',
  //     sourceField: 'typeId',
  //     label: '专辑支付页',
  //     getValue: (input) => {
  //       return (getNumArrayValue(input))[0]
  //     },
  //     judgeValue: (value) => {
  //       return value > 0
  //     },
  //     getUrl: (tag, key) => {
  //       if (!tag || !(tag[key] > 0)) {
  //         return ''
  //       }
  //       return <a href={`/servicepackages/${tag[key]}`} target='_blank'>{tag[key]}</a>
  //     }
  //   },
  //   {
  //     tag: 'CommodityGroup',
  //     inputReg: (/[^\d]+/),
  //     messageField: 'servicePkgId',
  //     sourceField: 'typeId',
  //     label: '打卡小组支付页',
  //     getValue: (input) => {
  //       return (getNumArrayValue(input))[0]
  //     },
  //     judgeValue: (value) => {
  //       return value > 0
  //     },
  //     getUrl: (tag, key) => {
  //       if (!tag || !(tag[key] > 0)) {
  //         return ''
  //       }
  //       return <a href={`/servicepackages/${tag[key]}`} target='_blank'>{tag[key]}</a>
  //     }
  //   },
  //   {
  //     tag: 'CommodityPayAlbumCombine',
  //     inputReg: (/[^\d]+/),
  //     messageField: 'servicePkgId',
  //     sourceField: 'typeId',
  //     label: '专辑合集支付页',
  //     getValue: (input) => {
  //       return (getNumArrayValue(input))[0]
  //     },
  //     judgeValue: (value) => {
  //       return value > 0
  //     },
  //     getUrl: (tag, key) => {
  //       if (!tag || !(tag[key] > 0)) {
  //         return ''
  //       }
  //       return <a href={`/servicepackages/${tag[key]}`} target='_blank'>{tag[key]}</a>
  //     }
  //   },
  //   {
  //     tag: 'CommodityPayService',
  //     inputReg: (/[^\d]+/),
  //     messageField: 'servicePkgId',
  //     sourceField: 'typeId',
  //     label: '服务包支付页',
  //     getValue: (input) => {
  //       return (getNumArrayValue(input))[0]
  //     },
  //     judgeValue: (value) => {
  //       return value > 0
  //     },
  //     getUrl: (tag, key) => {
  //       if (!tag || !(tag[key] > 0)) {
  //         return ''
  //       }
  //       return <a href={`/servicepackages/${tag[key]}`} target='_blank'>{tag[key]}</a>
  //     }
  //   }

  //   {
  //     tag: 'CommodityPay',
  //     inputReg: (/[^\d]+/),
  //     messageField: 'service',
  //     // sourceField: 'typeId',
  //     sourceField: null,
  //     label: '支付页',
  //     params: {
  //       type: {
  //         metaData: 'String',
  //         type: 'select',
  //         name: '服务包类型',
  //         data: [{ key: 'album', label: '专辑' }, { key: 'group', label: '打卡小组' }, { key: 'albumCombine', label: '专辑合集' }, { key: 'service', label: '服务包' }]
  //       },
  //       typeId: {
  //         metaData: 'Number',
  //         type: 'input',
  //         name: '服务包ID',
  //         data: null
  //       }
  //     },
  //     getValue: (input) => {
  //     },
  //     // judgeValue: (value) => {
  //     //   return value > 0
  //     // },
  //     getUrl: (tag, key) => {
  //       if (!tag || !(tag[key] > 0)) {
  //         return ''
  //       }
  //     }
  //   }

];

let getArrayValue = (input) => {
  let arrayTmp = input.split(/,|，/);
  _.remove(arrayTmp, function (o) {
    return o.trim() == '';
  });
  return arrayTmp;
};

let getNumArrayValue = (input) => {
  let arrayTmp = getArrayValue(input);
  arrayTmp = _.map(arrayTmp, (o) => {
    return Number(o);
  });
  _.remove(arrayTmp, (o) => {
    return _.isNaN(o);
  });
  return arrayTmp;
};
