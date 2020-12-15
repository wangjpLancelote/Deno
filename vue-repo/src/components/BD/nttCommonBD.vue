<template>
  <el-dialog
    :visible.sync="dialogInfo"
    :show-close="true"
    :close-on-click-modal="false"
    :title="title"
    width="60%"
    top="30px"
  >
    <div class="box">
      <div class="flex box_outer">
        <div class="flex" style="width:98%;justify-content:space-between;">
          <el-input
            v-model="searchCondition.uid"
            :placeholder="holder || '输入UID, 按Enter键搜索'"
            style="width:45%;"
            clearable
            @keyup.enter.native="search"
            @clear="search"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              type="primary"
              @click="search"
            >
              UID
            </el-button>
          </el-input>
          <el-input
            v-model="searchCondition.name"
            :placeholder="holder || '输入名称, 按Enter键搜索'"
            style="width:45%;"
            clearable
            @keyup.enter.native="search"
            @clear="search"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              type="primary"
              @click="search"
            >
              标题
            </el-button>
          </el-input>
          <el-checkbox v-model="pickAllItem" border size="small" @change="pickAll">
            全选
          </el-checkbox>
        </div>

        <div class="table_box infinite-list-wrapper" style="overflow:auto;">
          <div
            v-infinite-scroll="loadScroll"
            :infinite-scroll-immediate="false"
            :infinite-scroll-disabled="disabled"
            infinite-scroll-distance="200"
          >
            <div v-for="(item, index) in data" :key="index" class="flex list box_inner">
              <div class="flex" style="padding-left:10px;flex:3;justify-content:flex-start;">
                <el-image
                  v-if="showImage"
                  :src="item[imageField]"
                  :preview-src-list="[item[imageField]]"
                  style="width: 40px; height: 40px;"
                >
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture" style="font-size:30px;" />
                  </div>
                </el-image>
                <span v-if="showUid" style="margin-left:30px;">
                  {{ item[field] + '(' + item.uid + ')' }}
                </span>
                <span v-else style="margin-left:30px;">{{ item[field] }}</span>
              </div>
              <div class="flex" style="width:100%;height:40px;align-items:center;flex:1;justify-content:center;">
                <el-checkbox v-model="item.lock" @change="pickData(item)">
                  选择
                </el-checkbox>
              </div>
            </div>
          </div>
          <div class="flex" style="justify-content:center;color:#909399;">
            <p v-if="listLoading">
              加载中...
            </p>
            <p v-if="noMore">
              ——————这是我的底线——————
            </p>
          </div>
        </div>
      </div>
      <div v-if="cache.length" class="overHide margin_top tagsCall">
        <el-tag
          v-for="(item, index) in cache"
          :key="index"
          closable
          hit
          type="warning"
          style="margin-right:5px;margin-top:3px;"
          @close="exclude(index, item)"
        >
          <span><i class="el-icon-paperclip" style="font-size:14px;margin-right:3px;" /> {{
            item[field] ? item[field] : item.uid ? item.uid : item
          }}</span>
        </el-tag>
      </div>
      <slot />
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
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '列表标题'
    },
    holder: String,
    label: {
      type: String,
      default: '表头'
    },
    /** 请求方式 */
    method: {
      type: String,
      default: 'post'
    },
    /** 标题字段 */
    field: {
      type: String,
      default: 'name'
    },
    /** 字段是否显示UID */
    showUid: {
      type: Boolean,
      default: false
    },
    showImage: {
      type: Boolean,
      default: false
    },
    imageField: {
      type: String,
      default: 'imageUrl'
    },
    cookieDomain: {
      type: String,
      default: 'msid'
    },
    params: {
      type: Object,
      default: () => {}
    },
    url: String
  },

  data() {
    return {
      dialogInfo: false,
      searchCondition: {
        uid: '',
        name: ''
      },
      listLoading: false,
      checked: [],
      cache: [],

      data: [],
      offset: 0,
      limit: 30,
      noMore: false,
      queryParams: {
        uid: void [],
        name: void ''
      },
      axios: null,
      pickAllItem: false
    };
  },
  computed: {
    disabled () {
      return this.listLoading || this.noMore;
    }
  },
  mounted () {},
  methods: {
    async openDialog(data) {
      this.reset();
      if (!window.axios) {
        return this.$message({
          message: '请先安装 Axios 插件',
          type: 'error'
        });
      } else {
        this.axios = window.axios;
      }
      if (!window.Cookies) {
        return this.$message({
          message: '请先安装 js-cookie 插件',
          type: 'error'
        });
      }
      if (data) {
        this.checked = data.map(v => {
          if (v && v.uid) v = v.uid;
          return v;
        });
      }

      await this.getContextData();

      if (data) {
        this.cache = data.map(v => {
          let currentItem = this.data.find(m => m.uid === v);
          if (v && Number(v) && currentItem) {
            v = currentItem;
          }
          return v;
        });
      }
      this.dialogInfo = true;
    },
    reset () {
      this.checked = [];
      this.cache = [];
      this.data = [];
      this.noMore = true;
      this.checked = [];
      this.offset = 0;
      this.queryParams = {
        uid: void [],
        name: void ''
      };
      this.searchCondition = {
        uid: '',
        name: ''
      };
    },
    closeDialog() {
      this.dialogInfo = false;
    },
    loadScroll () {
      if (this.noMore) return;
      this.getContextData();
    },
    /** 获取列表数据 */
    async getContextData () {
      this.listLoading = true;
      let basic = { offset: this.offset, limit: this.limit };
      try {
        let rt = await this.serviceFunc(basic);
        if (rt) {
          this.listLoading = false;
          if (rt.data.data.length < this.limit) {
            this.noMore = true;
          } else {
            this.noMore = false;
          }
          let rtData = rt.data.data.map(v => {
            if (this.checked.includes(v.uid)) {
              v.lock = true;
            } else {
              v.lock = false;
            }
            return v;
          });
          if (!this.offset) {
            this.data = rtData;
          } else {
            this.data = this.data.concat(rtData);
          }
          if (this.data.some(v => !v.lock)) this.pickAllItem = false;

          this.offset = this.data.length;
          this.listLoading = false;
        }
      } catch (e) {
        this.noMore = true;
      } finally {
        this.listLoading = false;
      }
    },
    serviceFunc (basic) {
      let service = this.requestServiceDef();
      let body = { ...this.queryParams, ...this.params };
      if (this.method === 'post') {
        return service[this.method](this.url + (~this.url.indexOf('?') ? '&' : '?') + `offset=${basic.offset}&limit=${basic.limit}`, body);
      } else if (this.method === 'get') {
        return service[this.method](this.url + (~this.url.indexOf('?') ? '&' : '?') + `offset=${basic.offset}&limit=${basic.limit}`, { params: body });
      } else { // POST | DELETE
        return service[this.method](this.url, { ...basic, ...body });
      }
    },
    /** 配置请求的request */
    requestServiceDef () {
      this.axios.defaults.withCredentials = true;
      const service = this.axios.create({
        baseURL: 'http://newcms-demo.benewtech.cn/api/resources-admin/resource/selector/find/',
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
      let token = window.Cookies.get(this.cookieDomain);
      return token;
    },
    search () {
      this.offset = 0;
      this.data = [];
      for (let key in this.queryParams) {
        this.queryParams[key] = void Object;
      }

      let guards = this.searchParamsGuards();
      if (!guards) return;
      this.getContextData();
    },
    searchParamsGuards () {
      if (!this.searchCondition.uid) {
        this.$set(this.searchCondition, 'uid', undefined);
      } else {
        this.queryParams.uid = this.searchCondition.uid.replace('，', ',').split(',').map(Number);
      }
      if (this.queryParams.uid && this.queryParams.uid.length && this.queryParams.uid.some(v => isNaN(v))) {
        window.Vue.prototype.$message({
          message: 'UID有误',
          type: 'error'
        });
        return false;
      }
      if (!this.searchCondition.name) {
        this.$set(this.searchCondition, 'name', undefined);
      } else {
        this.queryParams.name = this.searchCondition.name;
      }
      return true;
    },
    handleCurrentChange (val) {
      this.offset = val - 1;
      this.getContextData();
    },
    pickData (rowData) {
      if (!this.checked.includes(rowData.uid)) {
        this.checked.push(rowData.uid);
        this.cache.push(rowData);
        return;
      } else {
        if (this.pickAllItem) this.pickAllItem = false;
        this.checked = this.checked.filter(v => v !== rowData.uid);
        this.cache = this.cache.filter(b => b.uid !== rowData.uid);
        return;
      }
    },
    /** 全选 当前页数据 */
    pickAll () {
      this.data = this.data.map(v => {
        v.lock = this.pickAllItem;
        return v;
      });
      let canPickData = this.data.filter(c => c.lock); // 需要选中的数据
      if (canPickData.length) { // 全选
        this.checked = this.uniq(this.checked.concat(this.mapUid(this.data)));
        this.cache = [...this.cache, ...this.uniqByCache(this.cache, this.data.filter(c => c.lock))];
      } else { // 全不选
        this.checked = this.checked.filter(v => !(this.mapUid(this.data)).includes(v));
        this.cache = this.cache.filter(v => {
          if (v && Number(v)) { // cache 是UID的情况
            if (this.mapUid(this.data).includes(v)) {
              return false;
            }
          } else {
            if (this.mapUid(this.data).includes(v.uid)) {
              return false;
            }
          }
          return true;
        });
      }
    },
    /** 去重 */
    uniq (source) {
      return Array.from(new Set(source));
    },
    /** 去重 cache */
    uniqByCache (source, target) {
      let res = [];
      for (let item of target) {
        if (source.some(v => Number(v))) { // 传入的cache 可能是UID的情况
          if (!source.includes(item.uid)) res.push(item);
        } else {
          if (!this.mapUid(source).includes(item.uid)) res.push(item);
        }
      }
      return res;
    },
    mapUid (source) {
      return source.map(v => {
        if (v && v.uid) return v.uid;
        return v;
      });
    },
    exclude (idx, item) {
      let targetUid = item.uid ? item.uid : item;
      this.checked = this.checked.filter(v => v !== targetUid);
      if (this.data.find(v => v.uid === targetUid)) this.data.find(v => v.uid === targetUid).lock = false;
      this.cache.splice(idx, 1);
    },
    ensure() {
      this.$emit('getResource', this.cache);
      this.closeDialog();
    }
  }
};
</script>
<style lang="less" scoped>
.table_box {
    width: 98%;
    height: 60vh;
    border: 1px solid #ccc;
    margin-top: 10px;
}
.box_end {
    margin-top: 10px;
}
.box_outer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #fff;
}
.overHide {
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}
.margin_top {
    margin-top: 5px;
}
.tagsCall {
    height: 100px;
    overflow: scroll;
    padding: 10px;
}
.headerRowClass {
    background: #ccc;
}
.box_inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height:55px;
    border-bottom: 1px solid #cccccc;
}
</style>
