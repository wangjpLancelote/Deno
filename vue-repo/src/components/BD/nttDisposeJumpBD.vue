<template>
  <el-dialog
    :visible.sync="dialogInfo"
    :show-close="true"
    :close-on-click-modal="false"
    title="添加跳转链接"
    width="40%"
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
          class="flex extraParams"
        >
          <div
            v-if="item.type === 'input'"
            style="display:flex;"
          >
            <span style="min-width: 80px;margin-right: 10px;">{{ item.name }}:</span>

            <el-input
              v-if="item.metaData === 'Number'"
              v-model.number="item.value"
              style="width: 200px;"
            />
            <el-input
              v-else
              v-model="item.value"
              style="width: 200px;"
            />
          </div>
          <div
            v-if="item.type === 'select'"
            style="margin-bottom:10px;display:flex;"
          >
            <span style="min-width: 80px;margin-right: 10px;">{{ item.name }}:</span>
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
          size="small"
          style="margin-right:10px;"
          @click="cancelCreative"
        >
          取消
        </el-button>
        <el-button
          type="primary"
          size="small"
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
  filters: {
    jumpTypeFilters(val) {
      let res = this.tagOptions.find(item => {
        return item.tag === val;
      });
      return res.label;
    }
  },
  props: {
    apiParamer: Object
  },
  data() {
    return {
      dialogInfo: false,
      form: {
        name: '',
        type: '',
        content: '',
        title: '',
        params: {}
      },
      options: [],
      switchShowLabel: '',
      selectData: '',
      action: 'add',
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
            this.selectData = res.sourceField;
            this.form.title = res.label;
          }

          if (res && res.params) {
            let isVipOrScan = ['QrcodeScanHome', 'VIPHome'].includes(data.tag);
            let keys = Object.keys(res.params);
            for (let k of keys) {
              let rt = {
                key: k,
                value: isVipOrScan ? data[k] : (data.params && data.params[k] !== undefined ? (res.params[k].metaData === 'Number' ? Number(data.params[k]) : data.params[k]) : res.params[k].metaData === 'String' ? '' : 0),
                name: res.params[k].name,
                type: res.params[k].type,
                data: res.params[k].data,
                metaData: res.params[k].metaData
              };
              this.extParams.push(rt);
            }
          } else {
            this.extParams = [];
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
      let isVipOrScan = ['QrcodeScanHome', 'VIPHome'].includes(this.form.type); // 是VIP或扫一扫
      modified = {
        jump: {
          tag: this.form.type,
          title: this.form.title
        }
      };
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
      modified.jump.type = this.selectData;
      if (this.extParams && this.extParams.length) {
        if (isVipOrScan) {
          delete modified.jump.params;
        } else {
          modified.jump.params = {};
        }
      } else {
        delete modified.jump.params;
      }
      for (let item of this.extParams) { // 额外参数params
        if (isVipOrScan) {
          modified.jump[item.key] = item.value;
        } else {
          modified.jump.needParams = true; // 需要params参数的跳转需添加的字段
          modified.jump.params[item.key] = item.value;
          modified.jump.params['uid'] = this.form.content ? this.form.content : void 0;
        }
      }
      if (this.form.title === '网页内容') { // 网页内容不设标题
        this.form.title = '';
      }
      this.$emit('getData', modified, this.identify);
      this.closeDialog();
    },
    editCreative() {
      let modified = {};
      modified.value.content = {
        jump: {
          tag: this.form.type,
          title: this.form.title
        }
      };
      if (this.selectData && this.selectData === 'link') {
        modified.value.content.jump.link = this.form.content;
      } else {
        delete modified.value.content.jump['link'];
      }
      if (this.selectData && this.selectData === 'typeId') {
        modified.value.content.jump.typeId = this.form.content;
      } else {
        delete modified.value.content.jump['typeId'];
      }
      modified.value.content.jump.type = this.selectData;
      this.apiParamer.modified = modified;
      this.apiParamer.dbEditQuery = {
        _id: this.rowData._id
      };
      this.$parent.editCreative();
      this.dialogInfo = false;
      this.clear();
      return;
    },
    addCreative() {
      let modified = {};
      modified.field = 'body';
      modified.value = {};
      modified.value.name = this.form.name;
      modified.value.content = {
        jump: {
          tag: this.form.type,
          title: this.form.title
        }
      };
      if (this.selectData && this.selectData === 'link') {
        modified.value.content.jump.link = this.form.content;
      } else {
        delete modified.value.content.jump['link'];
      }
      if (this.selectData && this.selectData === 'typeId') {
        modified.value.content.jump.typeId = this.form.content;
      } else {
        delete modified.value.content.jump['typeId'];
      }
      modified.value.content.jump.type = this.selectData;
      this.apiParamer.modified = modified;
      this.$parent.createCreatives();
      this.dialogInfo = false;
      this.clear();
      return;
    },
    cancelCreative() {
      this.dialogInfo = false;
      this.clear();
    },
    selectType() {
      this.$forceUpdate();
      this.extParams = [];
      if (this.form.type && this.tagOptions) {
        let res = this.tagOptions.find(item => {
          return item.tag === this.form.type;
        });
        this.selectData = res.sourceField;
        this.form.title = res.label;
        if (res.hasOwnProperty('params')) {
          let paramsData = res.params;
          let keys = Object.keys(paramsData);
          for (let k of keys) {
            let rt = {
              key: k,
              value: paramsData[k].metaData === 'String' ? '' : 0,
              name: paramsData[k].name,
              type: paramsData[k].type,
              data: paramsData[k].data,
              metaData: res.params[k].metaData
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
        if (i === 'params') {
          this.form[i] = {};
          continue;
        }
        this.form[i] = '';
      }
    }
  }
};
</script>
<style lang="less">
.extraParams {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}
</style>
