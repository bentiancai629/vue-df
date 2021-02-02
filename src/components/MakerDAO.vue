<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Compund" name="first">
        <el-row>
          <el-button>默认按钮</el-button>
          <el-button type="primary" @click="onSubmit1">token列表</el-button>
          <el-button type="success" @click="onSubmit2">地址余额</el-button>
          <el-button type="info" @click="onSubmit3">市场利率</el-button>
          <el-button type="warning" @click="onSubmit4">Approve授权</el-button>
          <el-button type="danger" @click="onSubmit5">借贷利率</el-button>
          <el-button type="primary" @click="onSubmit6">执行</el-button>
        </el-row>
        <div></div>
        <el-divider></el-divider>

        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 8 }"
          placeholder="结果:"
          v-model="textarea1"
        >
        </el-input>
      </el-tab-pane>

      <el-tab-pane label="Makerdao" name="second">
        <el-row>
          <el-button @click="onSubmit7">地址信息</el-button>
					<el-button type="primary" @click="onSubmit8">系统信息</el-button>
					<el-button type="success" @click="onSubmit9">抵押ETH借贷</el-button>
					<el-button type="info" @click="onSubmit10">还DAI关闭CDP</el-button>
					<el-button type="warning" @click="onSubmit11">存储利率市场</el-button>
        </el-row>

        <el-divider></el-divider>
        <div>
          <span>结果7:</span></br>
						<span></span></br>
						<span></span></br>
						<span></span></br>
        </div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 8 }"
          placeholder="结果:"
          v-model="textarea2"
        >
        </el-input>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  // el: '#app',
  // name: "MakerDAO",
  data() {
    return {
      activeName: "first",
      textarea2: "",
      textarea1: "",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    onSubmit1() {
      var _this = this;
      _this.textarea1 = "";
      axios
        .get("http://127.0.0.1:7001/api/compound/getOverview")
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea1 = JSON.stringify(response.data.data);
          }
        });
    },
    onSubmit2() {
      var _this = this;
      _this.textarea1 = "";
      axios
        .get("http://127.0.0.1:7001/api/compound/getBalance")
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea1 = JSON.stringify(response.data.data);
          }
        });
    },
    onSubmit3() {
      var _this = this;
      _this.textarea1 = "";
      axios
        .get("http://127.0.0.1:7001/api/compound/getApyByToken")
        .then(function (response) {
          _this.textarea1 = JSON.stringify(response.data.data);
        });
    },
    onSubmit4() {
      var _this = this;
      _this.textarea1 = "";
      axios
        .get("http://127.0.0.1:7001/api/compound/borrowERC20ByETH")
        .then(function (response) {
          _this.textarea1 = JSON.stringify(response.data.data);
        });
    },
    onSubmit5() {
      var _this = this;
      _this.textarea1 = "";
      axios
        .get("http://127.0.0.1:7001/api/compound/borrowRate")
        .then(function (response) {
          _this.textarea1 = JSON.stringify(response.data.data);
        });
    },
    onSubmit6() {
      var _this = this;
      _this.textarea1 = "";
      axios
        .get("http://127.0.0.1:7001/api/compound/borrowExecute")
        .then(function (response) {
          _this.textarea1 = JSON.stringify(response.data.data);
        });
    },
    onSubmit7() {
      var _this = this;
      _this.textarea2 = "";
      axios
        .get("http://113.31.105.58:7001/api/makerdao/accountInfo")
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
          }
        });
    },
    onSubmit8() {
      var _this = this;
      _this.textarea2 = "";
      axios
        .get("http://113.31.105.58:7001/api/makerdao/mcdSystemData")
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
          }
        });
    },
    onSubmit9() {
      var _this = this;
      _this.textarea2 = "";
      axios
        .get("http://113.31.105.58:7001/api/makerdao/createVault")
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
          }
        });
    },
    onSubmit10() {
      var _this = this;
      _this.textarea2 = "";
      axios
        .get("http://113.31.105.58:7001/api/makerdao/accountInfo")
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
          }
        });
    },
    onSubmit11() {
      var _this = this;
      _this.textarea2 = "";
      axios
        .get("http://113.31.105.58:7001/api/makerdao/mcdSaving")
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
          }
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
</style>
