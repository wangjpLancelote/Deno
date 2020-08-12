<template>
  <el-dialog
    :visible.sync="dialogInfo"
    :show-close="true"
    :close-on-click-modal="false"
    title="图片列表"
    width="800px"
    top="30px"
  >
    <div class="main_box">
      <div class="flex flex_space">
        <el-upload
          ref="upload"
          :data="uploadToken"
          :on-success="onUploadSuccess"
          :action="uploadUrl"
          :before-upload="beforeAvatarUpload"
          :limit="1"
          class="upload-demo"
        >
          <el-button size="medium" type="primary">上传图片</el-button>
        </el-upload>
        <el-input v-model="searchQuery.uid" class="search_icon" placeholder="输入UID" clearable @keyup.enter.native="search" @clear="search">
          <i
            slot="suffix"
            class="el-icon-search el-input__icon"
            @click="search"/>
        </el-input>
      </div>

      <div class="flex main_inner_box">
        <div ref="scrollList" class="category" @scroll="scollDef">
          <div :style="{'background-color': selectUid === 0 ? '#FFFFFF' : '#E4E7ED' }" class="categoryItem" @click="selectCategory(0)">
            <el-tooltip content="未分组" placement="right-start">
              <span class="categoryTitle">全部图片</span>
            </el-tooltip>
            <span class="categoryCnt">{{ count }}</span>
          </div>
          <div v-for="(item, index) in categoryList" :key="index" :style="{'background-color': selectUid === item.uid ? '#FFFFFF' : '#E4E7ED' }" class="categoryItem" @click="selectCategory(item.uid)">
            <el-tooltip :content="item.title" placement="right-start">
              <span class="categoryTitle">{{ index + '-' + item.title }}</span>
            </el-tooltip>
            <span class="categoryCnt">{{ item.pictureCnt }}</span>
          </div>
        </div>
        <div v-loading="listLoading" :style="toastStyle" class="picture_box">
          <div v-for="(item, index) in data" :key="index" :style="{border: `1px solid ${checked.includes(item.uid) ? '#F56C6C' : '#ccc'}`}" class="picture_item" @click="pickImage(item)">
            <el-image ref="elImage" :class="checked.includes(item.uid) ? 'image' : 'image'" :src="item.qiniuKeyUrl" fit="fill"/>
            <div style="display:flex; justify-content: space-between;align-items:center;">
              <span class="picture_text">{{ item.info }}</span>
              <el-image :preview-src-list="[item.qiniuKeyUrl]" :src="item.qiniuKeyUrl" style="width:20px;height:20px;margin-bottom:5px;margin-right:2px;">
                <div
                  slot="placeholder"
                  class="image-slot">
                  <i class="el-icon-full-screen"/>
                </div>
              </el-image>
            </div>
            <i v-if="checked.includes(item.uid)" class="el-icon-success picture_icon"/>
          </div>
        </div>
      </div>
      <div class="footer">
        <el-pagination
          :total="count"
          :page-size="30"
          background
          layout="prev, pager, next"
          @current-change="handleCurrentChange"/>
      </div>
    </div>
    <div class="flex flex_end box_end ">
      <el-button
        style="margin-right:10px;"
        size="mini"
        @click="closeDialog"
      >
        取消
      </el-button>
      <el-button type="primary" size="mini" @click="ensure">
        确定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    url: { // 图片列表URL
      type: String,
      default: 'http://newcms-demo.benewtech.cn/api/resources-admin/resources/picture/page'
    },
    uploadTokenUrl: { // 获取tokenURL
      type: String,
      default: 'http://newcms-demo.benewtech.cn/api/resources-admin/resources/picture/getToken'
    },
    addPictrueUrl: { // 添加图片URL
      type: String,
      default: 'http://newcms-demo.benewtech.cn/api/resources-admin/resources/picture/add'
    },
    categoryUrl: { // 图片分类URL
      type: String,
      default: 'http://newcms-demo.benewtech.cn/api/resources-admin/resources/picturecatalog/page'
    },
    method: {
      type: String,
      default: 'post'
    },
    uploadLimit: { // 选择数量限制
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      dialogInfo: false,
      checked: [], // 选中的图片uid
      cache: [],
      listLoading: false,
      toastStyle: {
        overflow: 'auto'
      },
      uploadToken: {
        token: ''
      },
      uploadFileName: '',
      searchQuery: {
        uid: ''
      },
      categoryList: [],
      categoryCount: 0,
      selectUid: 0,
      data: [],
      count: 0,
      offset: 0,
      limit: 30,
      axios: null
    };
  },
  methods: {
    openDialog (data) {
      if (!window.axios) {
        return window.Vue.prototype.$message({
          message: '请先安装 Axios 插件',
          type: 'error'
        });
      } else {
        this.axios = window.axios;
      }
      if (!window.Cookies) {
        return window.Vue.prototype.$message({
          message: '请先安装 js-cookie 插件',
          type: 'error'
        });
      }

      if (!this.uploadLimit) {
        return window.Vue.prototype.$message({
          message: 'uploadLimit 参数错误',
          type: 'error'
        });
      }
      this.getContextData();
      this.getCategory();

      this.checked = [];
      this.cache = [];
      if (data && data.length) {
        this.checked = data.map(v => {
          if (v && v.uid) v = v.uid;
          return v;
        });
        this.cache = data;
      }
      this.dialogInfo = true;
    },
    closeDialog () {
      this.dialogInfo = false;
    },
    ensure () {
      this.$emit('getImage', this.cache);
      this.dialogInfo = false;
    },
    async getContextData () {
      this.listLoading = true;
      this.toastStyle.overflow = 'hidden';
      let indexUrl = this.url + '?' + `offset=${this.offset * this.limit}&limit=${this.limit}&order=-created`;
      if (this.searchQuery.uid) {
        this.searchQuery.uid = this.searchQuery.uid.split(',').map(Number);
      } else {
        this.searchQuery.uid = void 0;
      }
      if (this.selectUid) {
        this.searchQuery.catalogId = [Number(this.selectUid)];
      } else {
        delete this.searchQuery.catalogId;
      }
      let rt = await this.apiExecFunc(indexUrl, this.searchQuery);
      if (rt) {
        this.listLoading = false;
        this.data = rt.data.datas;
        this.count = rt.data.count;
        this.toastStyle.overflow = 'auto';
      }
    },
    async getCategory () {
      let service = this.requestServiceDef();
      let rt = await service.post(this.categoryUrl + '?' + `offset=${0}&limit=${300}&order=-created`, { });
      this.categoryList = rt.data.datas;
      this.categoryCount = rt.data.count;
    },
    selectCategory (uid) {
      this.offset = 0;
      this.selectUid = uid;
      this.getContextData();
    },
    apiExecFunc (url, body) {
      let service = this.requestServiceDef();
      return service[this.method](url, body);
    },
    apiExecUploadFunc () {
      let service = this.requestServiceDef();
      return service.get(this.uploadTokenUrl);
    },
    apiExecAddPicture (body) {
      let service = this.requestServiceDef();
      return service.post(this.addPictrueUrl, body);
    },
    requestServiceDef () {
      this.axios.defaults.withCredentials = true;
      const service = this.axios.create({
        baseURL: 'https://newcms.benewtech.cn/api/',
        timeout: 20000
      });
      service.interceptors.request.use(
        config => {
          config.headers['X-Token'] = this.getToken();
          return config;
        },
        error => {
          Promise.reject(error);
        }
      );
      service.interceptors.response.use(function(response) {
        if (response.data.code === 100) {
          window.Vue.prototype.$message({
            message: response.data.msg,
            type: 'error',
            showClose: true,
            duration: 2500
          });
        }
        return response;
      },
      error => {
        let message = null;
        switch (error.response.status) {
          case 401:
            message = error.response.data.message || error.response.data.detail;
            break;
          case 403:
            message = error.response.data.detail;
            break;
          case 502:
            message = '服务器出错,请稍后再试';
            break;
          default:
            message = error.response.data.message || '请求服务器错误,请联系管理员';
        }
        window.Vue.prototype.$message({
          message,
          type: 'error',
          showClose: true,
          duration: 2500
        });

        return Promise.reject(error);
      }
      );
      return service;
    },
    getToken () {
      let token = window.Cookies.get('msid');
      return token;
    },
    async beforeAvatarUpload (file) {
      let rt = await this.apiExecUploadFunc();
      this.uploadToken.token = rt.data.data.uptoken;
      this.uploadFileName = file.name;
    },
    pickImage (data) {
      if (this.checked.includes(data.uid)) {
        if (this.uploadLimit > 1) {
          let idx = this.checked.indexOf(data.uid);
          this.checked.splice(idx, 1);
          this.cache = this.cache.filter(v => {
            if (v.uid !== data.uid) return true;
            return false;
          });
        } else {
          this.checked = [];
          this.cache = [];
        }
      } else {
        if (this.uploadLimit > 1) {
          if (this.checked.length >= this.uploadLimit) return;
          this.checked.push(data.uid);
          this.cache.push(data);
        } else {
          this.checked = [data.uid];
          this.cache = [data];
        }
      }
    },
    async onUploadSuccess (file) {
      let body = {
        qiniuKey: file.key,
        info: file.info,
        originalName: this.uploadFileName,
        fileSize: file.fsize
      };
      let rt = await this.apiExecAddPicture(body);
      if (rt && rt.data.code === 200) {
        this.offset = 0;
        this.getContextData();
      }
    },
    handleCurrentChange (val) {
      this.offset = val - 1;
      this.getContextData();
    },
    search () {
      this.offset = 0;
      this.getContextData();
    },
    scollDef () {
    }
  }
};
</script>
<style lang="less">
.main_box {
    height: 650px;
}
.main_inner_box {
    height: 550px;
}
.footer {
    height: 50px;
    display: flex;
    justify-content: flex-end;
}
.picture_content {
    flex:1 ;
    height: 100%;
    border: 1px solid #ccc;
}
.picture_box {
    width: 90%;
    height: 100%;
    padding-top:10px ;
    padding-bottom: 10px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    flex-wrap: wrap;
    overflow: scroll;
}
.picture_item {
    width: 90px;
    height: 120px;
    margin-left: 11px;
    margin-bottom: 5px;
    cursor: pointer;
    position: relative;
}
.image {
    width: 88px;
    height: 90px;
}
.image_back {
    width: 88px;
    height: 90px;
    opacity: 0.7;
    filter: alpha(opacity=60);
}
.picture_text {
    width: 90px;
    height: 30px;
    line-height: 30px;
    border-top: 1px solid #ccc;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
}
.picture_icon {
    position: absolute;
    right: 20px;
    bottom: 0px;
    font-size: 20px;
    color: #F56C6C;
}
.el-pagination {
    padding-top: 5px;
}
.search_icon {
    width: 200px;
    margin-bottom: 5px;
}
.category {
    width: 130px;
    height: 100%;
    background: #E4E7ED;
    margin-right: 10px;
    overflow: scroll;
}
.categoryItem {
    width: 100%;
    height: 55px;
    border-bottom: 1px solid #C0C4CC;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 5px;
    cursor: pointer;
}
.categoryTitle {
  display: inline-block;
  white-space: nowrap;
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
}
.categoryCnt {
    width: 30px;
    height: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    color: #606266;
}
</style>
