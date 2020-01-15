<template>
  <div class="container page_container">
    <div
      class="flex"
      style="justify-content:space-between;"
    >
      <div class="header ">{{ this.case === 'add' ? '新建熏陶课程' : '编辑熏陶课程' }}</div>
      <div class="container footer_btn flex flex_end">
        <el-button
          style="margin-right:10px;"
          @click="cancel"
        >取消</el-button>
        <el-button
          type="primary"
          @click="ensure"
        >确定</el-button>
      </div>
    </div>
    <div class="box_model_context">

      <div class="container main_content box_model">
        <el-form
          :model="form"
          label-position="left"
          label-width="100px"
        >
          <el-form-item label="标题:">
            <el-input
              v-model="form.name"
              style="width: 300px;"
            />
          </el-form-item>
          <!-- <el-form-item label="作者:">
                    <el-button type="primary" size="mini">选择</el-button>
                </el-form-item> -->
          <el-form-item label="机构ID:">
            <el-button
              type="primary"
              size="mini"
              @click="openOrga"
            >设置</el-button>
            <el-tag
              v-if="form.organizationId"
              type="primary"
              size="mini"
              closable
              @close="delOrga"
            >{{ form.organizationId }}</el-tag>
          </el-form-item>
          <!-- <el-form-item label="状态:">
          <el-radio-group v-model="form.status">
            <el-radio :label="true">开启</el-radio>
            <el-radio :label="false">关闭</el-radio>
          </el-radio-group>
        </el-form-item> -->
          <el-form-item label="权限:">
            <el-select
              v-model="form.rights"
              style="width: 300px;"
            >
              <el-option
                value="internal"
                label="隐藏"
              />
              <el-option
                value="normal"
                label="显示"
              />
              <el-option
                value="deleted"
                label="删除"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="销售价:">
            <el-input
              v-model="form.payDetail.price"
              style="width: 300px;"
              type="number"
            />
          </el-form-item>
          <el-form-item label="市场价:">
            <el-input
              v-model="form.payDetail.originPrice"
              style="width: 300px;"
              type="number"
            />
          </el-form-item>
          <el-form-item label="排序:">
            <el-input
              v-model="form.sort"
              style="width: 300px;"
              type="number"
            />
          </el-form-item>
          <el-form-item label="是否允许搜索:">
            <el-checkbox v-model="form.canSearch">是否搜索</el-checkbox>
          </el-form-item>
          <el-form-item label="标签:">
            <el-select
              v-model="form.label"
              style="width: 300px;"
              multiple
              filterable
              allow-create
              default-first-option
            >
              <el-option
                v-for="(item, index) in form.label"
                :key="index"
                value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="熏陶分类:">
            <el-button
              type="primary"
              size="mini"
              @click="openCategory"
            >设置</el-button>
            <el-tag
              v-for="(item, index) in form.category"
              :key="index"
              closable
              style="margin-right:5px;margin-top:5px;"
              @close="delCate(index)"
            >{{ item }}</el-tag>
          </el-form-item>
          <el-form-item label="资源权益:">
            <el-button
              type="primary"
              size="mini"
              @click="openPrivilege"
            >设置</el-button>
            <el-tag
              v-for="(item, index) in form.resourceRights"
              :key="index"
              closable
              style="margin-right:5px;margin-top:5px;"
              @close="delRight(index)"
            >{{ item }}</el-tag>
          </el-form-item>
          <el-form-item label="年龄:">
            <el-input
              v-model="form.age.min"
              style="width: 100px;"
            />
            &nbsp;至&nbsp;
            <el-input
              v-model="form.age.max"
              style="width: 100px;"
            />
          </el-form-item>
          <el-form-item label="角标:">
            <el-button
              type="primary"
              size="mini"
              @click="openMask"
            >设置</el-button>
            <el-tag
              v-if="form.mask && form.mask.length"
              closable
              @close="delMask"
            >{{ form.mask[0].content }}</el-tag>
          </el-form-item>
          <el-form-item label="文章:">
            <el-button
              type="primary"
              size="mini"
              @click="openArticle"
            >设置</el-button>
            <el-tag
              v-if="form.essayId"
              type="info"
              closable
              @close="delArticle"
            >{{ form.essayId }}</el-tag>
          </el-form-item>
          <el-form-item label="广告条:">
            <el-button
              type="primary"
              size="mini"
              @click="openLineAd"
            >设置</el-button>
            <el-tag
              v-if="form.lineAd"
              type="primary"
              size="mini"
              closable
              @close="delLineAd"
            >{{
              form.lineAd
            }}</el-tag>
          </el-form-item>
          <el-form-item label="背景色:">
            <el-color-picker v-model="form.bgColor" />
          </el-form-item>
          <el-form-item label="课程介绍:">
            <!-- <el-button type="primary" size="mini">设置</el-button> -->
            <el-input
              :rows="4"
              v-model="form.courseInfo"
              type="textarea"
              placeholder="请输入课程介绍"
              style="width: 300px;"
            />
          </el-form-item>

          <el-form-item label="图片:">
            <div class="flex">
              <!-- <imageUpload
                issue="方封面"
                style="margin-right: 10px;"
                @getImageData="getImageData"
              /> -->
              <div class="flex flex_style_image imageBase">
                <el-upload
                  :data="uploadToken"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="successUpload"
                  :before-upload="beforeAvatarUpload"
                  class="avatar-uploader-head"
                >
                  <span>
                    <img
                      v-if="form.cover && !form.cover.startsWith('http://img.benewtech.cn')"
                      :src="'http://img.benewtech.cn/' + form.cover + '?2/2/w/100'"
                      class="avatar"
                    >
                    <img
                      v-else-if="form.cover && form.cover.startsWith('http://img.benewtech.cn')"
                      :src="form.cover"
                      class="avatar"
                    >
                    <i
                      v-else
                      class="iconUpload el-icon-plus"
                    />
                    <div
                      v-if="!form.cover"
                      class="el-upload__text"
                    >
                      <em>方封面</em>
                    </div>
                  </span>
                </el-upload>
                <el-button
                  v-if="form.cover"
                  icon="el-icon-close"
                  class="closeButton"
                  circle
                  type="info"
                  @click="deletePicture"
                />
              </div>
              <!-- <imageUpload
                issue="长封面"
                @getImageData="getImageDataLong"
              /> -->
              <div
                class="flex flex_style_image imageBase"
                style="margin-left: 10px;"
              >
                <el-upload
                  :data="uploadToken"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="successLongUpload"
                  :before-upload="beforeAvatarUpload"
                  class="avatar-uploader-head"
                >
                  <span>
                    <img
                      v-if="form.longCover && !form.longCover.startsWith('http://img.benewtech.cn')"
                      :src="'http://img.benewtech.cn/' + form.longCover + '?2/2/w/100'"
                      class="avatar"
                    >
                    <img
                      v-else-if="form.longCover && form.longCover.startsWith('http://img.benewtech.cn')"
                      :src="form.longCover"
                      class="avatar"
                    >
                    <i
                      v-else
                      class="iconUpload el-icon-plus"
                    />
                    <div
                      v-if="!form.longCover"
                      class="el-upload__text"
                    >
                      <em>长封面</em>
                    </div>
                  </span>
                </el-upload>
                <el-button
                  v-if="form.longCover"
                  icon="el-icon-close"
                  class="closeButton"
                  circle
                  type="info"
                  @click="deleteLong"
                />
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="container main_content box_model">
        <el-form
          :modal="form"
          label-position="left"
          label-width="100px"
        >
          <el-form-item label="熏陶专辑:">
            <el-select
              v-model="form.albumIds"
              multiple
              filterable
              allow-create
              default-first-option
              style="width: 300px;"
              @change="pick"
            >
              <el-option value="" />
            </el-select>

            <div
              v-for="(item, index) in form.edifyAlbum"
              :key="index"
              class="flex algor"
              style="align-items:center;"
            >
              <div style="margin-right: 10px;width: 50px;">
                {{ item.uid }}:
              </div>
              <el-select v-model="item.algorithm">
                <el-option
                  value="Sequence"
                  label="顺序"
                />
                <el-option
                  value="SuperEbbinghaus"
                  label="艾宾浩斯"
                />
              </el-select>
              <div
                v-if="item.algorithm === 'SuperEbbinghaus'"
                style="margin-left: 10px;"
                class="flex"
              >
                每日新学数量:
                <el-input
                  v-model="item.learnNewCnt"
                  style="width: 200px;margin-left: 10px;"
                />
                新学日：
                <el-select
                  v-model="item.learnNewDays"
                  multiple
                  style="width: 200px;margin-left:10px;"
                >
                  <el-option
                    v-for="(date, idx) in 7"
                    :key="idx"
                    :value="date - 1"
                    :label="labelFilter(date - 1)"
                  />
                </el-select>
              </div>
              <div
                v-else
                style="margin-left: 10px;"
                class="flex"
              >
                总体循环:
                <el-input
                  v-model="item.cycle"
                  style="width: 200px;"
                  type="number"
                />
                单体循环:
                <el-input
                  v-model="item.repeat"
                  style="width: 200px;margin-left:10px;"
                  type="number"
                />
              </div>
              <i
                class="el-icon-delete-solid"
                style="font-size:26px;margin-left: 10px;cursor:pointer;color:#F56C6C;"
                @click="delEdifyAlbum(index)"
              />
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="container main_content box_model">
        <el-form
          :modal="form"
          label-position="left"
          label-width="100px"
        >
          <el-form-item label="熏陶课表:">
            <div
              class="flex"
              style="flex-direction: column;align-items:flex-start;"
            >
              <el-select
                v-model.number="courseTableObj.albumId"
                placeholder="请选择专辑"
              >
                <el-option
                  v-for="(item, index) in form.albumIds"
                  :key="index"
                  :value="item"
                  :label="item"
                />
              </el-select>
              <div style="margin-top: 10px;">
                <el-select
                  v-model="courseTableObjDays"
                  placeholder="请选择课表日期"
                  multiple
                >
                  <el-option
                    v-for="(item, index) in 7"
                    :value="item - 1"
                    :key="index"
                    :label="dateFilter(item - 1)"
                  />
                </el-select>
                &nbsp;开始时间:
                <el-time-picker
                  v-model="courseTableObj.startTime"
                  value-format="HH:mm"
                  placeholder="选择时间"
                />
                &nbsp;时长:
                <el-input
                  v-model.number="courseTableObj.duration"
                  style="width: 200px;"
                  type="number"
                />
              </div>
              <el-button
                type="primary"
                size="mini"
                style="margin-top: 10px;"
                @click="saveCalendar"
              >保存课表</el-button>
            </div>
          </el-form-item>
          <el-form-item
            v-if="form.calendar.length"
            label="课程表:"
          >
            <el-tag
              v-for="(item, index) in form.calendar"
              :key="index"
              closable
              style="width: 150px;height: 100px;margin-right: 10px;margin-bottom:10px;"
              @close="delCalender(index)"
            >
              <div style="">
                <span> 专辑: {{ item.albumId }}</span><br>
                <span>{{ dateFilter(item.day) }}</span><br>
                <span>开始时间: {{ item.startTime }}</span>
                <span>时长: {{ item.duration }}</span>
              </div>
            </el-tag>
          </el-form-item>
        </el-form>
      </div>
      <setMask
        ref="setMask"
        @getMaskData="getMaskData"
      />
      <dialogTable
        ref="articleTable"
        :data="articleList"
        :basic-params="articleBasic"
        :extra-params="articleExtra"
        :func-name="getArticleList"
        :resource-num="articleNum"
        title="文章列表"
        label="文章"
        field="title"
        @catchDialogData="getArticleData"
      />
      <dialogTable
        ref="orgaOrLineAd"
        :title="showTitle"
        :label="showLabel"
        :data="showList"
        :basic-params="showBasic"
        :extra-params="showExtra"
        :func-name="articleDef"
        :resource-num="showNum"
        :field="fieldName"
        @catchDialogData="getShowData"
      />
      <dialogTableMulti
        ref="dialogTableMulti"
        :data="categoryList"
        :basic-params="categoryBasic"
        :extra-params="categoryExtra"
        :func-name="getCategoryList"
        :resource-num="categoryNum"
        title="熏陶分类列表"
        label="选择熏陶分类"
        @catchDialogData="getCateaData"
      />
      <dialogTableMulti
        ref="rightsMulti"
        :data="resourceList"
        :basic-params="categoryBasic"
        :extra-params="categoryExtra"
        :func-name="getCategoryList"
        :resource-num="resourceNum"
        title="资源权益列表"
        label="选择权益"
        @catchDialogData="getSource"
      />
    </div>
  </div>

</template>
<script>
import imageUpload from "@/components/Upload/imageUpload";
import setMask from "@/components/Setmask/index";
import dialogTable from "@/components/dialogTable/dialogTable";
import dialogTableMulti from "@/components/dialogTable/dialogTableMulti";
import {
  apiGetEdifyPlanList,
  apiAddEdify,
  apiEditEdify
} from "@/api/edify/edify";
import moment from "moment";
import { apiGetArticleList } from "@/api/albums/repository";
import { apiGetOrgan } from "@/api/punchCard/courseOrgan.js";
import { apiGetLineAdList } from "@/api/newCard/lineAd.js";
import { apiGetEdifyCategoryList } from "@/api/edify/edify";
import { apiPostImgToken } from "@/api/common";
import { apiGetSourcePrivilege } from "@/api/sourcePrivilege/index";

export default {
  name: "",
  components: {
    imageUpload,
    setMask,
    dialogTable,
    dialogTableMulti
  },
  data() {
    return {
      case: "add",
      uploadToken: {
        token: ""
      },
      form: {
        name: "", // 标题
        author: "", // 作者
        status: "", // 状态
        categoryIds: 0, // 机构IDs
        organizationId: void 0, // 机构ID
        rights: "", // 权限
        payDetail: {
          price: 0, // 销售价
          originPrice: 0, // 市场价
          valid: true,
          publicizeId: void 0 // 收费
        },
        sort: 0, // 排序
        label: [], // 标签
        category: [], // 分类
        // age: 0, // 年龄
        age: {
          min: -1,
          max: -1
        },
        mask: [], // 角标
        lineAd: "", // 广告条
        bgColor: "#409EFF", // 背景色
        courseInfo: "", // 课程介绍
        essayId: void 0, // 文章ID
        edifyAlbum: [], // 熏陶专辑
        albumIds: [], // 熏陶专辑ids
        edifyAlbumDetail: {
          uid: void 0,
          algorithm: "Sequence",
          learnNewCnt: void 0, // 每日新学数量
          learnNewDays: [], // 新学日
          cycle: void 0, // 总体循环次数
          repeat: void 0 // 单体循环次数
        }, // 熏陶专辑详情内容
        calendar: [], // 熏陶日程课表
        resourceRights: [], // 资源权益
        cover: "", // 方图
        longCover: "", // 长图
        canSearch: false // 是否搜索
      },
      articleList: [],
      articleNum: 0,
      articleBasic: {
        offset: 0,
        limit: 30
      },
      articleDef: new Function(),
      articleExtra: {
        title: void "",
        uid: void 0
      },
      showTitle: "机构列表",
      showLabel: "机构",
      showList: [],
      showNum: 0,
      showBasic: {
        offset: 0,
        limit: 30
      },
      showExtra: {
        uid: void 0
      },
      categoryList: [],
      categoryNum: 0,
      categoryBasic: {
        offset: 0,
        limit: 30
      },
      categoryExtra: {
        uid: void 0,
        name: void ""
      },
      courseTableObj: {
        // 课表
        albumId: void 0,
        day: 0,
        startTime: "",
        duration: 0
      },
      courseTableObjDays: [],
      fieldName: "name",
      resourceList: [],
      resourceNum: 0
    };
  },
  created() {
    this.getArticleList();
    this.getCategoryList();
    this.getResourceList();
  },
  activated() {},
  mounted() {
    if (this.$route.query.case) this.case = this.$route.query.case;
    this.initData();
    this.moment = moment;
  },
  methods: {
    async initData() {
      if (this.$route.query.courseId) {
        let data = {};
        if (this.$route.params.data) {
          data = this.$route.params.data;
        } else {
          let rt = await apiGetEdifyPlanList({
            offset: 0,
            limit: 1,
            buildQuery: {
              uid: Number(this.$route.query.courseId)
            }
          });
          data = rt.data.data[0];
        }
        this.form.name = data.name;
        this.form.organizationId = data.organizationId;
        this.form.category = data.categoryId;
        this.form.payDetail = data.payDetail;
        this.form.status = data.access;
        this.form.rights = data.access;
        this.form.mask = data.mask;
        this.form.label = data.tags;
        this.form.lineAd = data.lineAdId;
        this.form.essayId = data.essayId;
        this.form.edifyAlbum = data.albums;
        this.form.albumIds = data.albums.map(item => {
          item = item.uid;
          return item;
        });
        if (data.calendar) {
          this.form.calendar = data.calendar.map(v => {
            v.startTime = v.start;
            delete v.start;
            delete v._id;
            v.startTime = moment(v.startTime).format("HH:mm");
            return v;
          });
        } else {
          this.form.calendar = [];
        }
        this.form.resourceRights = data.resourceRights;
        this.form.courseInfo = data.info;
        this.form.cover = data.cover;
        this.form.longCover = data.longCover;
        this.form.bgColor = data.bgColor;
        this.form.sort = data.order;
        this.form.age = data.age ? data.age : { min: -1, max: -1 };
        this.form.canSearch = data.canSearch;
      }
    },
    successUpload(res, file) {
      this.form.cover = `http://img.benewtech.cn/${res.key}?2/2/w/100`;
      // this.$emit("getImageData", res.key);
    },
    successLongUpload(res, file) {
      this.form.longCover = `http://img.benewtech.cn/${res.key}?2/2/w/100`;
    },
    deletePicture() {
      this.form.cover = "";
    },
    deleteLong() {
      this.form.longCover = "";
    },

    async beforeAvatarUpload(file) {
      const res = await apiPostImgToken();
      this.uploadToken.token = res.data.imgTokens[0].uptoken;

      const isJPG = [
        "image/jpeg",
        "image/png",
        "image/JPG",
        "image/mpeg",
        "image/gif"
      ].includes(file.type);

      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG|PNG|JPEG|GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      if (isJPG && isLt2M) {
        return isJPG && isLt2M;
      } else {
        return Promise.reject(isJPG && isLt2M);
      }
    },
    async getResourceList() {
      let rt = await apiGetSourcePrivilege({
        offset: this.categoryBasic.offset * this.categoryBasic.limit,
        limit: this.categoryBasic.limit,
        buildQuery: {
          ...this.categoryExtra
        }
      });
      this.resourceList = rt.data.data.map(item => item.target === "edifyPlan");
      this.resourceNum = rt.data.count;
    },
    async getArticleList() {
      let rt = await apiGetArticleList(
        this.articleBasic.offset,
        this.articleBasic.limit,
        undefined,
        { dbLoadQuery: { ...this.articleExtra } }
      );
      this.articleList = rt.data.data;
      this.articleNum = rt.data.cnt;
    },
    getImageData(key) {
      this.form.cover = key;
    },
    getImageDataLong(key) {
      this.form.longCover = key;
    },
    getMaskData(maskData) {
      this.form.mask = [maskData];
    },
    openMask() {
      this.$refs.setMask.openDialog(this.form.mask);
    },
    cancel() {
      this.$router.go(-1);
    },
    pick() {
      if (!this.form.albumIds.length) {
        this.form.edifyAlbum = [];
      } else {
        for (let c of this.form.albumIds) {
          let findID = this.form.edifyAlbum.find(v => v.uid === c);
          if (findID) continue;
          let temp = this.deepCopy(this.form.edifyAlbumDetail);
          temp.uid = c;
          this.form.edifyAlbum.push(temp);
        }
      }
    },
    deepCopy(obj) {
      let res = {};
      for (let k in obj) {
        if (Object.prototype.toString.call(obj[k]) === "[object Array]") {
          res[k] = obj[k].slice();
        } else {
          res[k] = obj[k];
        }
      }
      return res;
    },
    labelFilter(date) {
      return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][date];
    },
    openArticle() {
      this.$refs.articleTable.show(this.form.essayId);
    },
    getArticleData(data) {
      this.form.essayId = data.uid;
    },
    delArticle() {
      this.form.essayId = void 0;
    },
    /** 获取机构或广告条 list */
    getShowData(data) {
      if (this.articleDef === this.getOrgaList) {
        this.form.organizationId = data.uid;
      } else {
        this.form.lineAd = data.uid;
      }
    },
    dateFilter(date) {
      return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][date];
    },
    openOrga() {
      this.fieldName = "name";
      this.$refs.orgaOrLineAd.listLoading = true;
      this.articleDef = this.getOrgaList;
      this.showList = [];
      this.showNum = 0;
      this.showBasic = {
        offset: 0,
        limit: 30
      };
      this.showExtra = {
        uid: void 0
      };
      this.showTitle = "机构列表";
      this.showLabel = "选择机构";
      this.getOrgaList();
      this.$refs.orgaOrLineAd.show(this.form.organizationId);
    },
    openLineAd() {
      this.fieldName = "explain";
      this.$refs.orgaOrLineAd.listLoading = true;
      this.articleDef = this.getLineAdList;
      this.showList = [];
      this.showNum = 0;
      this.showBasic = {
        offset: 0,
        limit: 30
      };
      this.showExtra = {
        uid: void 0
      };
      this.showTitle = "广告行列表";
      this.showLabel = "选择广告";
      this.getLineAdList();
      this.$refs.orgaOrLineAd.show(this.form.lineAd);
    },
    async getOrgaList() {
      let rt = await apiGetOrgan({
        offset: this.showBasic.offset * this.showBasic.limit,
        limit: this.showBasic.limit,
        buildQuery: {
          ...this.showExtra
        }
      });
      this.$refs.orgaOrLineAd.listLoading = false;
      this.showList = rt.data.data;
      this.showNum = rt.data.count;
    },
    async getLineAdList() {
      let rt = await apiGetLineAdList({
        offset: this.showBasic.offset * this.showBasic.limit,
        limit: this.showBasic.limit,
        buildQuery: {
          ...this.showExtra
        }
      });
      this.$refs.orgaOrLineAd.listLoading = false;
      this.showList = rt.data.data;
      this.showNum = rt.data.count;
    },
    async getCategoryList() {
      let rt = await apiGetEdifyCategoryList({
        offset: this.categoryBasic.offset * this.categoryBasic.limit,
        limit: this.categoryBasic.limit,
        buildQuery: {
          ...this.categoryExtra
        }
      });
      this.categoryList = rt.data.data;
      this.categoryNum = rt.data.count;
    },
    openCategory() {
      this.$refs.dialogTableMulti.show(this.form.category);
    },
    delOrga() {
      this.form.organizationId = void 0;
    },
    delLineAd() {
      this.form.lineAd = void 0;
    },
    /** 获取熏陶分类数据 */
    getCateaData(data) {
      this.form.category = data.map(item => {
        item = item.uid;
        return item;
      });
    },
    delCate(idx) {
      this.form.category.splice(idx, 1);
    },
    async ensure() {
      let paramsVo = {
        name: this.form.name,
        organizationId: this.form.organizationId,
        categoryId: this.form.category,
        // price: this.form.sellPrice,
        // originPrice: this.form.marketPrice,
        access: this.form.rights,
        mask: this.form.mask.map(item => {
          delete item._id;
          return item;
        }),
        payDetail: this.form.payDetail,
        order: this.form.sort,
        age: this.form.age,
        bgColor: this.form.bgColor,
        tags: this.form.label,
        lineAdId: this.form.lineAd,
        essayId: this.form.essayId,
        albums: this.form.edifyAlbum.map(item => {
          delete item._id;
          return item;
        }),
        calendar: this.form.calendar,
        resourceRights: this.form.resourceRights,
        cover: this.form.cover,
        longCover: this.form.longCover
      };
      if (this.case === "edit") {
        paramsVo.uid = this.$route.query.courseId;
        await apiEditEdify(paramsVo);
      } else {
        delete paramsVo.uid;
        await apiAddEdify(paramsVo);
      }
      this.$router.go(-1);
    },
    /** 保存课表 */
    saveCalendar() {
      if (this.courseTableObjDays.length) {
        let res = [];
        for (let d of this.courseTableObjDays) {
          let temp = this.deepCopy(this.courseTableObj);
          temp.day = d;
          res.push(temp);
        }
        this.form.calendar = [...this.form.calendar, ...res];
      } else {
        return this.$message({
          message: "课表至少选择一天",
          type: "error"
        });
      }
      if (
        !this.courseTableObj.startTime ||
        this.courseTableObj.duration === ""
      ) {
        return this.$message({
          message: "缺少课程具体时间",
          type: "error"
        });
      }
      //   this.form.calendar.push(this.deepCopy(this.courseTableObj))
      this.courseTableObj = {
        albumId: void 0,
        day: 0,
        startTime: "",
        duration: 0
      };
      this.courseTableObjDays = [];
    },
    delCalender(idx) {
      this.form.calendar.splice(idx, 1);
    },
    delMask() {
      this.form.mask = [];
    },
    delEdifyAlbum(idx) {
      let target = this.form.edifyAlbum[idx].uid;
      this.form.albumIds = this.form.albumIds.filter(item => item === target);
      this.form.edifyAlbum.splice(idx);
    },
    delRight(idx) {
      this.form.resourceRights.splice(idx, 1);
    },
    getSource(data) {
      this.form.resourceRights = data.map(item => {
        item = item.uid;
        return item;
      });
    },
    openPrivilege() {
      this.categoryBasic = {
        offset: 0,
        limit: 30
      };
      this.categoryExtra = {
        uid: void 0,
        name: void ""
      };
      this.$refs.rightsMulti.show(this.form.resourceRights);
    }
  }
};
</script>
<style scoped="less">
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
.fixedBtn {
  position: fixed;
  top: 100px;
  right: 50px;
}
.edifyAlbumArea {
  width: 400px;
  height: 200px;
  background: #ebeef5;
  border-radius: 3px;
}
.algor {
  padding-left: 10px;
  margin-top: 10px;
  min-height: 60px;
  background: #e4e7ed;
}
.avatar-uploader-head {
  border: 1px dashed #d9d9d9;
  width: 100px;
  height: 100px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
  position: relative;
}
.closeButton {
  position: absolute;
  top: 0px;
  left: 63px;
  z-index: 1000;
}
.imageBase {
  position: relative;
}
</style>