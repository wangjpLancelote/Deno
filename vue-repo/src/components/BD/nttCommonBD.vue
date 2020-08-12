<template>
  <el-dialog
    :visible.sync="dialogInfo"
    :show-close="true"
    :close-on-click-modal="false"
    :title="title"
    width="50%"
    top="30px"
  >
    <div class="box">
      <div class="flex box_outer">
        <el-input
          v-model="searchCondition"
          :placeholder="holder || '输入名称或UID, 按Enter键搜索'"
          style="width:98%;"
          clearable
          @keyup.enter.native="search"
          @clear="search"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            type="primary"
            @click="search"
          />
        </el-input>
        <div class="table_box">
          <el-pagination
            :page-size="30"
            :total="count"
            layout="prev, pager, next"
            background
            @current-change="handleCurrentChange"
          />
          <el-table
            ref="table"
            :key="tableKey"
            v-loading="listLoading"
            :data="data"
            :style="toastStyle"
            height="650"
            fit
            stripe
            highlight-current-row
            header-row-class-name="headerRowClass"
            class="table_in"
          >
            <el-table-column
              :label="label"
              align="center"
              prop="province"
              min-width="120"
            >
              <template slot-scope="scope">
                <div class="flex" style="padding-left:10px;">
                  <el-image
                    v-if="showImage"
                    :src="scope.row.coverUrl"
                    :preview-src-list="[scope.row.coverUrl]"
                    style="width: 40px; height: 40px;"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture" style="font-size:30px;" />
                    </div>
                  </el-image>
                  <span v-if="showUid" style="margin-left:30px;">
                    {{ scope.row[field] + '(' + scope.row.uid + ')' }}
                  </span>
                  <span v-else style="margin-left:30px;">{{ scope.row[field] }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="city"
              label="操作"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <div class="flex" style="width:100%;height:40px;align-items:center;">
                  <el-checkbox v-model="scope.row.lock" @change="pickData(scope.row)">
                    选择
                  </el-checkbox>
                </div>
              </template>
            </el-table-column>
          </el-table>
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
          @close="exclude(index, item.uid)"
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
      default: 'coverUrl'
    },
    cookieDomain: {
      type: String,
      default: 'msid'
    },
    params: {
      type: Object,
      default: () => {}
    },
    url: String // 请求url
  },

  data() {
    return {
      dialogInfo: false,
      searchCondition: '',
      listLoading: false,
      toastStyle: {
        overflow: 'auto'
      },
      tableKey: 0,
      checked: [],
      cache: [],

      data: [],
      count: 0,
      offset: 0,
      limit: 20,
      queryParams: {
        uid: void 0,
        name: void ''
      },
      axios: null
    };
  },
  mounted () {},
  methods: {
    openDialog(data) {
      this.checked = [];
      this.cache = [];
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
      this.getContextData();
      if (data) {
        this.checked = data.map(v => {
          if (v && v.uid) v = v.uid;
          return v;
        })
        this.cache = data;
      }
      this.dialogInfo = true;
    },
    closeDialog() {
      this.dialogInfo = false;
    },
    /** 获取列表数据 */
    async getContextData () {
      this.listLoading = true;
      let body = { offset: this.offset * this.limit, limit: this.limit, buildQuery: { ...this.queryParams }};
      this.toastStyle.overflow = 'hidden';
      let rt = await this.serviceFunc(body);
      if (rt) {
        this.listLoading = false;
        this.data = rt.data.data.map(v => {
          if (this.checked.includes(v.uid)) {
            v.lock = true;
          } else {
            v.lock = false;
          }
          return v;
        });
        this.count = rt.data.count;
        this.toastStyle.overflow = 'auto';
      }
    },
    serviceFunc (body) {
      let service = this.requestServiceDef();
      if (this.method === 'post') {
        if (body.hasOwnProperty('buildQuery')) {
          body.buildQuery = { ...body.buildQuery, ...this.params };
        } else {
          body = { ...body, ...this.params };
        }
        return service[this.method](this.url, body);
      } else if (this.method === 'get') {
        return service[this.method](this.url, { params: { ...body, ...this.params }});
      } else {
        return service[this.method](this.url, body);
      }
    },
    /** 配置请求的request */
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
      let token = window.Cookies.get(this.cookieDomain);
      return token;
    },
    search () {
      for (let key in this.queryParams) {
        this.queryParams[key] = void Object;
      }
      if (this.searchCondition) {
        let target = this.searchCondition.replace('，', ',').split(',');
        if (target.some(v => Number(v))) {
          this.queryParams.uid = target.map(Number);
        } else {
          this.queryParams.name = this.searchCondition;
        }
      }
      this.offset = 0;
      return this.getContextData();
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
        this.checked = this.checked.filter(v => v !== rowData.uid);
        this.cache = this.cache.filter(b => b.uid !== rowData.uid);
        return;
      }
    },
    exclude (idx, uid) {
      this.checked = this.checked.filter(v => v !== uid);
      this.data.find(v => v.uid === uid).lock = false;
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
.table_in {
    width: 100%;
    height:500px;
    overflow: auto;
    cursor: pointer;border-top:1px solid #C0C4CC;
}
.table_box {
    width: 98%;
    min-height: 500px;
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
</style>
