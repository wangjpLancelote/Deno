<template>
  <el-dialog
    :visible.sync="dialogInfo"
    :show-close="true"
    :close-on-click-modal="false"
    :title="title"
    width="40%"
  >
    <div class="box">
      <div class="flex box_outer">
        <el-input
          v-model="searchCondition"
          placeholder="输入标题或UID"
          style="width:90%;"
          clearable
          @clear="query"
          @keyup.enter.native="query"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            type="primary"
            @click="query"
          />
        </el-input>
        <div class="table_box">
          <el-pagination
            :page-size="30"
            :total="resourceNum"
            layout="prev, pager, next"
            background
            @current-change="handleCurrentChange"
          />
          <el-table
            v-loading="listLoading"
            ref="table"
            :data="data"
            :key="tableKey"
            border
            fit
            stripe
            highlight-current-row
            style="width: 100%; height:400px;  overflow: auto; cursor: pointer;"
          >
            <el-table-column
              :label="label"
              align="center"
              min-width="100"
            >
              <template slot-scope="scope">
                <div
                  style="height:40px;line-height:40px;cursor:pointer;"
                  @click.stop="defSelect(scope.row)"
                >
                  <span v-if="scope.row[field]">{{
                    scope.row[field] + " --"
                  }}</span>
                  <span style="min-width: 100px;">{{
                    scope.row.uid
                  }}</span>
                  <i
                    v-if="checked === scope.row.uid"
                    class="el-icon-success"
                    style="color: red;position:absolute;right:10px;top:15px;font-size:24px;"
                  />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="overHide">
        <el-tag
          v-if="cache.hasOwnProperty('uid')"
          closable
          hit
          @close="filter"
        ><span><i class="el-icon-paperclip" style="font-size:14px;margin-right:3px;"/>{{ cache.name || cache.title || cache.uid }}</span></el-tag
        >
      </div>
      <div class="flex flex_end box_end">
        <el-button
          style="margin-right:10px;"
          @click="closeDialog"
        >取消</el-button
        >
        <el-button type="primary" @click="ensure">确定</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    title: String, // 弹窗的标题
    label: String, // 表格列的label
    data: Array, // 表格显示分页数据
    basicParams: Object, // table查询基础参数(offset, limit)
    extraParams: Object, // table查询额外参数 (id | name | title)
    funcName: Function, // 父级请求table数据的方法名 | 是否有该参数
    resourceNum: Number,
    field: {
      type: String,
      default: 'name'
    },
    canFilter: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogInfo: false,
      checked: -1, // 选中的行
      searchCondition: '', // 查询的关键字
      tableKey: 0,
      listLoading: false,
      cache: {} // 单个选中的缓存
    };
  },
  mounted() {},
  methods: {
    show(checkedData) {
      if (checkedData) {
        checkedData = checkedData.hasOwnProperty('uid')
          ? checkedData.uid
          : checkedData;
        this.checked = checkedData || -1;
        this.cache = {
          uid: checkedData
        };
      } else {
        this.checked = -1;
        this.cache = {};
      }
      this.dialogInfo = true;
    },
    closeDialog() {
      this.dialogInfo = false;
    },
    ensure() {
      if (~this.checked) {
        let catchData = this.data.find(
          item => item.uid === this.checked
        );
        /** 选中的数据，父组件的接收方法 */
        this.cache = catchData;
        this.$emit('catchDialogData', catchData);
      } else {
        return this.$message({
          message: '未选中',
          type: 'error'
        });
      }
      this.dialogInfo = false;
    },
    /** 表格行选中时的方法 */
    defSelect(data) {
      /** 选了相同的行，则取消 */
      if (~this.checked && this.checked === data.uid) {
        this.checked = -1;
        this.cache = {};
        return;
      }
      this.checked = data.uid;

      this.cache = data;
    },
    /** 关键字搜索 */
    query() {
      this.basicParams.offset = 0;
      this.basicParams.limit = 30;
      for (let i in this.extraParams) this.extraParams[i] = void '';
      if (!this.searchCondition) {
        return this.getDialogData();
      } else {
        for (let key in this.extraParams) {
          if (Number(this.searchCondition)) {
            if (['uid', 'id', 'uids'].includes(key)) {
              if (this.multiple) {
                this.extraParams[key] = this.searchCondition.split(/,|，/).map(Number);
              } else {
                this.extraParams[key] = Number(this.searchCondition);
              }
              break;
            } else {
              continue;
            }
          } else {
            if (!['uid', 'id', 'uids'].includes(key)) {
              this.extraParams[key] = this.searchCondition;
              break;
            } else {
              continue;
            }
          }
        }
        return this.getDialogData();
      }
    },
    /** 表格翻页触发方法 */
    handleCurrentChange(val) {
      this.listLoading = true;
      this.basicParams.offset = val - 1;

      this.getDialogData();
    },
    getDialogData() {
      /** 父级组件请求数据的方法名 */
      if (this.funcName) return this.funcName();
      return this.$parent.getDialogTableData();
    },
    filter() {
      if (!this.canFilter) return;
      this.cache = {};
      this.checked = -1;
    }
  }
};
</script>
<style lang="less" scoped>
.table_box {
    width: 90%;
    min-height: 400px;
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
}
.overHide {
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    margin-top: 10px;
}
.margin_top {
    margin-top: 5px;
}
</style>
