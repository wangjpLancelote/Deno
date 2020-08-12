<template>
  <el-dialog
    :visible.sync="dialogInfo"
    :show-close="true"
    :close-on-click-modal="false"
    title="添加跳转链接"
    width="45%"
  >
    <el-form
      :model="form"
      class="demo-dynamic"
    >
      <el-form-item
        :rules="[{ required: true }]"
        label="跳转类型:"
      >
        <el-select
          v-model="form.type"
          placeholder="请选择跳转类型"
          style="width:100%;"
          filterable
          @change="selectType"
        >
          <el-option
            v-for="(item, index) in tagOptions"
            :key="index"
            :value="item.tag"
            :label="item.label"
          >
            {{ item.label }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="switchShow()"
        :rules="[{ required: true }]"
        label="跳转内容:"
      >
        <el-input
          v-model="form.content"
          autocomplete="on"
          placeholder="请填写跳转内容"
        />
      </el-form-item>
      <el-form-item v-if="switchTick()">
        <div
          v-for="(item, index) in extParams"
          :key="index"
          style="margin-bottom:10px;"
        >
          <div
            v-if="item.type === 'input'"
            style="display:flex;"
          >
            <span style="min-width: 100px;">{{ item.name }}:</span>
            <el-input
              v-model="item.value"
              style="width: 200px;"
            />
          </div>
          <div
            v-if="item.type === 'select'"
            style="margin-bottom:10px;display:flex;"
          >
            <span style="min-width: 100px;">{{ item.name }}:</span>
            <el-select v-model="item.value">
              <el-option
                v-for="(o, j) in item.data"
                :key="j"
                :value="o.key"
                :label="o.label"
              />
            </el-select>
          </div>
        </div>
      </el-form-item>
      <el-form-item
        :rules="[{ required: true }]"
        label="页面标题:"
      >
        <el-input
          v-model="form.title"
          autocomplete="on"
          placeholder="请填写页面标题"
        />
      </el-form-item>

      <el-form-item class="flex flex_end">
        <el-button
          size="mini"
          style="margin-right:10px;"
          @click="cancelCreative"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          size="mini"
          @click="translate"
        >
          保存
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { tagOptions } from './jumpTagOption';
export default {
  data() {
    return {
      dialogInfo: false,
      form: {
        name: '',
        type: '',
        content: '',
        title: '',
        params: ''
      },
      options: [],
      selectData: '',
      rowData: {},
      extParams: [],
      identify: null
    };
  },
  created() {},
  beforeMount() {
    this.tagOptions = tagOptions;
  },
  mounted() {
    this.tagOptions = tagOptions;
  },
  methods: {
    openDialog(data, identify) {
      if (identify) this.identify = identify;
      if (data) {
        this.rowData = data;
        this.extParams = [];
        this.form.type = data.tag || '';
        this.form.title = data.title || '';
        if (data.hasOwnProperty('link') || data.hasOwnProperty('typeId')) {
          this.form.content = data['link'] ? data['link'] : data['typeId'];
        }
        if (this.tagOptions) {
          let res = this.tagOptions.find(c => {
            return c.tag === this.form.type;
          });
          if (res) {
            if (res.params) {
              let keys = Object.keys(res.params);
              for (let k of keys) {
                if (data.hasOwnProperty(k)) {
                  let rt = {
                    key: k,
                    value: data[k],
                    name: res.params[k].name,
                    type: res.params[k].type,
                    data: res.params[k].data
                  };
                  this.extParams.push(rt);
                }
              }
            } else {
              this.extParams = [];
            }
            this.selectData = res.sourceField;
            this.form.title = res.label;
          }
        }
      } else {
        this.clear();
      }
      this.dialogInfo = true;
    },
    switchShow() {
      if (this.form.type) {
        let findTag = this.tagOptions.find(item => item.tag === this.form.type);
        if (findTag) return findTag.hasOwnProperty('judgeValue');
        return false;
      }
    },
    switchParams() {
      if (this.form.type) {
        let findTag = this.tagOptions.find(item => item.tag === this.form.type);
        if (findTag) return findTag.hasOwnProperty('multi');
        return false;
      }
    },
    switchTick() {
      if (this.form.type) {
        let findTag = this.tagOptions.find(item => item.tag === this.form.type);
        if (findTag) return findTag.hasOwnProperty('params');
        return false;
      }
    },
    getOptions() {
      let rt = this.tagOptions.find(item => {
        return item.tag === this.form.type;
      });
      this.options = rt.multiOptions || [];
    },

    closeDialog() {
      this.dialogInfo = false;
    },
    translate() {
      let modified = {};
      modified = {
        jump: {
          tag: this.form.type,
          title: this.form.title
        }
      };
      let isPickType = this.switchParams();
      if (this.selectData && this.selectData === 'link') {
        modified.jump.link = this.form.content;
      } else {
        delete modified.jump['link'];
      }
      if (this.selectData && this.selectData === 'typeId') {
        modified.jump.typeId = this.form.content;
      } else {
        delete modified.jump['typeId'];
      }
      if (isPickType) {
        // 跳转参数
        modified.jump.params = this.form.type;
      } else {
        delete modified.jump['params'];
      }
      modified.jump.type = this.selectData;
      for (let item of this.extParams) {
        modified.jump[item.key] = item.value;
      }
      if (!this.form.title) {
        return window.Vue.prototype.$message({
          message: '未填写跳转标题',
          type: 'error'
        });
      }
      this.$emit('getData', modified, this.identify);
      this.closeDialog();
    },
    cancelCreative() {
      this.dialogInfo = false;
      this.clear();
    },
    selectType() {
      this.extParams = [];
      if (this.form.type && this.tagOptions) {
        let res = this.tagOptions.find(item => {
          return item.tag === this.form.type;
        });
        this.selectData = res.sourceField;
        this.form.title = res.label;
        this.form.content = '';
        if (res.hasOwnProperty('params')) {
          let paramsData = res.params;
          let keys = Object.keys(paramsData);
          for (let k of keys) {
            let rt = {
              key: k,
              value: paramsData[k].metaData === 'String' ? '' : 0,
              name: paramsData[k].name,
              type: paramsData[k].type,
              data: paramsData[k].data
            };
            this.extParams.push(rt);
          }
        } else {
          this.extParams = [];
        }
      }
      this.getOptions();
    },
    clear() {
      for (let i in this.form) {
        this.form[i] = '';
      }
    }
  }
};
</script>
<style></style>
