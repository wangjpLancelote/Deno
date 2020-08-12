<template>
  <div class="container page_container">
    <el-button type="primary">
      test element-ui 测试按钮
    </el-button>
    this is component
    <span>{{ msg }}</span>
  </div>
</template>
<script>
//  import { Button } from 'element-ui'
import { testArr } from './test';
export default {
  name: 'TestCom',
  props: {
    msg: {
      type: String,
      default: '1'
    }
  },
  // components: {
  //   'el-button': Button
  // },
  data() {
    return {
      case: 'add',
      form: {}
    };
  },
  created() {},
  activated() {},
  mounted() {
    if (this.$route && this.$route.query.case) {
      this.case = this.$route.query.case;
    }
    this.initData();
  },
  methods: {
    initData() {
      if (this.$route && this.$route.query.id) {
        let data = {};
        if (this.$route.params.data) {
          data = this.$route.params.data;
        } else {
          /** */
        }
      }
    },
    cancel() {
      this.$router.go(-1, 'cancel');
    },
    ensure() {
      this.$router.go(-1);
    },
    open () {
      console.log('========>>>dddd', testArr);
    }
  }
};
</script>
<style>
@import '~element-ui/lib/theme-chalk/button.css';
.header {
    padding: 10px 10px;
    font-size: 20px;
    font-weight: bold;
    box-sizing: border-box;
}
.main_content {
    margin-top: 80px;
    border: 1px solid #ccc;
    padding: 20px;
    margin-left: 20px;
    margin-right: 20px;
}
.page_container {
    background: #f0f2f5;
}
.box_model_context {
    max-height: 900px;
    overflow: scroll;
}
.box_model {
    border: 1px solid #ccc;
    padding: 20px;
    margin-top: 20px;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}
.head_moc {
    background: #fff;
}
.header {
    padding: 10px 10px;
    font-size: 20px;
    font-weight: bold;
    box-sizing: border-box;
}
.footer_btn {
    margin-right: 10px;
}
</style>
