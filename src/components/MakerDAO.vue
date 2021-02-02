<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="Compund" name="first">
        <el-row>
          <el-button>默认按钮</el-button>
          <el-button type="primary" @click="getTokenList">token列表</el-button>
          <el-button type="success" @click="getBalance">地址余额</el-button>
          <el-button type="info" @click="getMarketRate">市场利率</el-button>
          <el-button type="warning" @click="approve">Approve授权</el-button>
          <el-button type="danger" @click="supplyBorrowRate">借贷利率</el-button>
          <el-button type="primary" @click="execute">执行</el-button>
        </el-row>
        <div></div>
        <el-divider></el-divider>
        <div>
          <span>支持的币种:</span></br>
						<span>币种数量:</span></br>
						<span>币种列表:</span></br>
        </div>
         <el-divider></el-divider>
        <div>
          <span>账户余额:</span></br>
						<span>ETH余额: </span></br>
						<span>cETH余额: </span></br>
						<span>cDAI余额: </span></br>
        </div>
         <el-divider></el-divider>
        <div>
          <span>借贷利率:</span></br>
						<span>ETH存储利率</span></br>
						<span>ETH借贷利率</span></br>
        </div>
         <el-divider></el-divider>
        <div>
          <span>币种的借贷利率:</span></br>
						<span>币名</span></br>
						<span>数量</span></br>
						<span>借贷上限</span></br>
            <span>借贷利率</span></br>
            <span>流动性</span></br>
            <span>当前借贷因子%</span></br>
        </div>
         <el-divider></el-divider>
        <div>
          <span>执行结果:</span></br>
						<span>交易Hash</span></br>
            <span>换贷币种</span></br>
            <span>借贷数量</span></br>
            <span>待换币数量</span></br>
        </div>
         <el-divider></el-divider>
        <div>
          <span>还贷结果</span></br>
					<span>交易Hash</span></br>
            <span>换贷币种</span></br>
            <span>还DAI数量</span></br>
        </div>
         <el-divider></el-divider>
        <div>
          <span>抵押DAI借ETH:</span></br>
						<span>币种名字</span></br>
            <span>抵押DAI数量</span></br>
            <span>借贷ETH数量</span></br>
        </div>
        </br>
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 8 }"
          placeholder="调用结果"
          v-model="textarea1"
        >
        </el-input>
      </el-tab-pane>

      <el-tab-pane label="Makerdao" name="second">
        <el-row>
          <el-button type="warning" @click="getBalance">账户余额</el-button>
					<el-button type="primary" @click="getSystemData">系统信息: </el-button>
					<el-button type="success" @click="createVault">抵押ETH借贷: </el-button>
					<el-button type="info" @click="closeVault">还DAI关闭CDP: </el-button>
					<el-button type="warning" @click="getSavingRate">存储利率市场: </el-button>
        </el-row>

        <el-divider></el-divider>
        <div>
          <span>账户信息结果</span></br>
						<span>当前区块高度: {{}}</span></br>
						<span>地址: {{}}</span></br>
						<span>ETH余额: {{}}</span></br>
        </div>
             <el-divider></el-divider>
        <div>
          <span>市场系统信息</span></br>
						<span>基准利率: {{}}</span></br>
						<span>系统借贷上限: {{}}</span></br>
						<span>借贷系统是否关闭: {{}}</span></br>
        </div>
             <el-divider></el-divider>
        <div>
          <span>创建债仓</span></br>
						<span>CDP-ID: {{}}</span></br>
						<span>CDP-类型: {{}}</span></br>
						<span>抵押ETH数量: {{}}</span></br>
            <span>生成DAI数量: {{}}</span></br>
        </div>
             <el-divider></el-divider>
        <div>
          <span>关闭债仓</span></br>
						<span>交易Hash: {{}}</span></br>
        </div>
             <el-divider></el-divider>
        <div>
          <span>利率市场</span></br>
						<span>地址: {{}}</span></br>
						<span>ETH余额: {{}}</span></br>
						<span>锁定的DAI: {{}}</span></br>
            	<span>锁定的DAI: {{}}</span></br>
        </div>
        </br>
        <el-input
          type="textarea"
          :autosize="{ minRows: 6, maxRows: 8 }"
          placeholder="调用结果: "
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
      account:{
        blockNumber: 0,
        owner:"",
        ETH:""
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    getTokenList() {
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
    getBalance() {
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
    getMarketRate() {
      var _this = this;
      _this.textarea1 = "";
      axios
        .get("http://127.0.0.1:7001/api/compound/getApyByToken")
        .then(function (response) {
          _this.textarea1 = JSON.stringify(response.data.data);
        });
    },
    approve() {
      var _this = this;
      _this.textarea1 = "";
      axios
        .get("http://127.0.0.1:7001/api/compound/borrowERC20ByETH")
        .then(function (response) {
          _this.textarea1 = JSON.stringify(response.data.data);
        });
    },

    supplyBorrowRate() {
      var _this = this;
      _this.textarea1 = "";
      axios
        .get("http://127.0.0.1:7001/api/compound/borrowRate")
        .then(function (response) {
          _this.textarea1 = JSON.stringify(response.data.data);
        });
    },

    execute() {
      var _this = this;
      _this.textarea1 = "";
      axios
        .get("http://127.0.0.1:7001/api/compound/borrowExecute")
        .then(function (response) {
          _this.textarea1 = JSON.stringify(response.data.data);
        });
    },

    getBalance() {
      var _this = this;
      _this.textarea2 = "";
      axios
        .get("http://127.0.0.1:7001/api/makerdao/accountInfo")
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
          }
        });
    },
    getSystemData() {
      var _this = this;
      _this.textarea2 = "";
      axios
        .get("http://127.0.0.1:7001/api/makerdao/mcdSystemData")
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
          }
        });
    },
    createVault() {
      var _this = this;
      _this.textarea2 = "";
      axios
        .get("http://127.0.0.1:7001/api/makerdao/createVault")
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
          }
        });
    },
    closeVault() {
      var _this = this;
      _this.textarea2 = "";
      axios
        .get("http://127.0.0.1:7001/api/makerdao/accountInfo")
        .then(function (response) {
          if (response.data.status === 200) {
            _this.textarea2 = JSON.stringify(response.data.data);
          }
        });
    },
    getSavingRate() {
      var _this = this;
      _this.textarea2 = "";
      axios
        .get("http://127.0.0.1:7001/api/makerdao/mcdSaving")
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
