<template>
  <div class="page">
    <div class="search-wrap" ref="searchBar">
      <input
        type="text"
        class="search"
        v-model.trim="keyword"
        placeholder="Search..."
        @input="handleSearch"
      />
      <i class="icon"></i>
    </div>
    <!--头部推荐-->
    <div class="top-record" ref="topRecord">
      <span class="top-re-word">Recommend</span>
      <div class="top-wrap">
        <div class="top-item" v-for="item in topRecordList" :key="item.id">
          <img class="i-img" :src="item.image" />
          <span class="i-tit">{{ item.name }}</span>
          <span class="i-cat">{{ item.category }}</span>
        </div>
      </div>
    </div>
    <div class="mid-record">
      <div class="mid-wrap" ref="midContent">
        <div
          class="mid-item"
          v-for="(item, idx) in keyword.length > 0
            ? searchList
            : freeApplications"
          :key="item.id"
        >
          <span class="mid-idx">{{ idx + 1 }}</span>
          <img
            class="mid-img"
            :class="{ 'mid-rect': idx % 2 == 0, 'mid-round': idx % 2 == 1 }"
            :src="item.image"
          />
          <div class="mid-right">
            <span>{{ item.name }}</span>
            <span>{{ item.category }}</span>
            <div class="rate">
              <van-rate
                v-model="item.starRate"
                :size="12"
                allow-half
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
              />
              <span>({{ item.downloadCount }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getTopRecommend,
  getMidRecommend,
  searchBykeyWord,
} from "../../http/api";
export default {
  data() {
    return {
      topRecordList: [],
      freeApplications: [],
      midRecordList: [],
      ids: [],
      keyword: "",
      searchList: [],
    };
  },
  created() {
    this.getTopList(10);
    this.getMidList(100);
  },
  mounted() {
    this.$nextTick(() => {
      let clientHeight = document.body.clientHeight;
      let topRecordHeight = this.$refs.topRecord.offsetHeight;
      let searchBarHeight = this.$refs.searchBar.offsetHeight;
      this.$refs.midContent.style.height =
        clientHeight - searchBarHeight - topRecordHeight + "px";
    });
  },
  methods: {
    //获取顶部推荐数据，10条
    async getTopList(limit) {
      let res = await getTopRecommend(limit);
      this.topRecordList = (res && res.feed && res.feed.entry) || [];
      this.topRecordList.map((item) => {
        item.id = item.id.attributes["im:id"];
        item.name = item["im:name"].label;
        item.image = item["im:image"][0].label;
        item.category = item.category.attributes.label;
      });
    },
    //获取中间部分推荐数据，100条
    async getMidList(limit) {
      let res = await getMidRecommend(limit);
      this.midRecordList = (res && res.feed && res.feed.entry) || [];
      this.midRecordList.map((item) => {
        item.id = item.id.attributes["im:id"];
        item.name = item["im:name"].label;
        item.image = item["im:image"][0].label;
        item.category = item.category.attributes.label;
        item.author = item["im:artist"].label;
        item.summary = item.summary.label;
        item.starRate = 0;
        item.downloadCount = 0;
      });
      this.ids = this.midRecordList.map((item) => {
        return item.id;
      });
      this.searchBykeyWord(this.ids.toString());
    },
    //获取评分和下载量
    async searchBykeyWord(ids) {
      let res = await searchBykeyWord(ids);
      if (res && res.results) {
        for (const item of res.results) {
          this.midRecordList.map((x) => {
            if (x.id === item.trackId.toString()) {
              x.starRate = item.averageUserRating;
              x.downloadCount = item.userRatingCount;
            }
          });
        }
        this.freeApplications = this.midRecordList;
      }
    },
    //搜索
    handleSearch() {
      let word = this.keyword;
      this.searchList = this.freeApplications.filter(
        (item) =>
          item.name.includes(word) ||
          item.author.includes(word) ||
          item.summary.includes(word)
      );
    },
  },
};
</script>

<style lang="less" scoped>
.search-wrap {
  display: flex;
  position: relative;
}
.search {
  flex: 1;
  border: none;
  outline: 0;
  background: #f4f4f4;
  border-radius: 30px;
  padding: 15px 0 15px 60px;
  box-sizing: border-box;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  margin: 10px 15px;
  font-size: 16px;
  color: #333333;
}
.icon {
  position: absolute;
  background: url("../../images/icon-search.png") no-repeat;
  width: 32px;
  height: 32px;
  background-size: 100% 100%;
  top: 24px;
  left: 30px;
}
.top-record {
  width: 100%;
  padding: 15px 0;
  border-top: 2px solid #cccccc;
  border-bottom: 2px solid #cccccc;
  .top-re-word {
    font-size: 28px;
    font-weight: 500;
    margin-left: 17px;
    margin-bottom: 8px;
  }
  .top-wrap {
    display: flex;
    overflow: scroll;
    .top-item {
      display: flex;
      flex-direction: column;
      width: 150px;
      justify-content: center;
      align-content: center;
      margin-left: 17px;
      .i-img {
        width: 150px;
        border-radius: 20px;
      }
      .i-tit {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 16px;
        color: #333333;
        margin-top: 8px;
      }
      .i-cat {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        align-self: center;
        font-size: 14px;
        color: #636060;
        margin-top: 5px;
      }
      &:last-child {
        margin-right: 17px;
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.mid-record {
  .mid-wrap {
    display: flex;
    overflow: scroll;
    flex-direction: column;
    .mid-item {
      margin-left: 15px;
      border-bottom: 1px solid #cccccc;
      display: flex;
      align-items: center;
      padding: 20px 0px;
      .mid-idx {
        display: flex;
        font-size: 14px;
        margin-right: 15px;
        align-self: center;
        justify-content: center;
      }
      .mid-round {
        border-radius: 50%;
      }
      .mid-rect {
        border-radius: 15px;
      }
      .mid-img {
        width: 108px;
        height: 108px;
        margin-right: 12px;
      }
      .mid-right {
        display: flex;
        flex: 1;
        flex-direction: column;
        span:nth-child(1) {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 16px;
          color: #333333;
        }
        span:nth-child(2) {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 14px;
          color: #636060;
          margin-top: 5px;
        }
        .rate {
          font-size: 14px;
          margin-top: 6px;
          span:nth-child(2) {
            margin-left: 3px;
          }
        }
      }
      &:last-child {
        margin-bottom: 20px;
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>